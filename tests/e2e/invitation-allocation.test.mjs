import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import { getApps, initializeApp } from "firebase-admin/app";
import { getDataConnect } from "firebase-admin/data-connect";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";
import * as engine from "../../server/circles/engine.ts";
import * as gift from "../../server/circles/gift.ts";
import * as pricing from "../../server/pricing/entitlements.ts";
import * as catalogue from "../../lib/circle-pricing.ts";
import * as rules from "../../server/invitations/rules.ts";

assert.match(
  process.env.DATA_CONNECT_EMULATOR_HOST ?? "",
  /^127\.0\.0\.1:\d+$/,
  "Invitation allocation tests require an explicit loopback Data Connect emulator.",
);
const app =
  getApps().find((item) => item.name === "invitation-allocation-e2e") ??
  initializeApp({ projectId: "bond-circle" }, "invitation-allocation-e2e");
const database = getDataConnect(
  {
    location: "europe-west2",
    serviceId: "bondcircle-service",
    connector: "bondcircle",
  },
  app,
);

async function repository(beforeMutation = async () => {}) {
  const connection = {
    executeQuery: (...args) => database.executeQuery(...args),
    executeMutation: async (operation, variables) => {
      await beforeMutation(operation);
      return database.executeMutation(operation, variables);
    },
  };
  const dataDependency = { getBondCircleDataConnect: () => connection };
  const legal = await loadTypescriptModule("server/auth/legal.ts", {
    "server-only": {},
    "@/server/firebase/data-connect": dataDependency,
  });
  const pages = await loadTypescriptModule("server/repositories/pages.ts", {
    "server-only": {},
    "@/server/firebase/data-connect": dataDependency,
  });
  const circles = await loadTypescriptModule("server/repositories/circles.ts", {
    "server-only": {},
    "@/server/firebase/data-connect": dataDependency,
    "@/server/auth/legal": legal,
    "@/lib/circle-pricing": catalogue,
  });
  return loadTypescriptModule("server/repositories/invitations.ts", {
    "server-only": {},
    "@/server/firebase/data-connect": dataDependency,
    "@/server/repositories/pages": pages,
    "@/server/auth/legal": legal,
    "@/server/circles/engine": engine,
    "@/server/circles/gift": gift,
    "@/server/repositories/circles": circles,
    "@/server/invitations/rules": rules,
    "@/server/pricing": pricing,
    // Delivery is a separate provider gate; every database/permission operation stays real.
    "@/server/repositories/notifications": {
      safelyEmitNotification: async () => {},
    },
  });
}

async function user(label) {
  const id = `allocation-${label}-${randomUUID()}`;
  const email = `${id}@example.test`;
  const acceptedAt = new Date().toISOString();
  await database.upsert("user", {
    id,
    email,
    displayName: "Synthetic allocation member",
    accountStatus: "active",
    termsAcceptedAt: acceptedAt,
    privacyAcceptedAt: acceptedAt,
  });
  return { id, email, phone: null };
}

async function circle({
  target = 3000,
  capacity = 3,
  mode = "equal",
  type = "gift",
  creatorAmount,
} = {}) {
  const creator = await user("creator");
  const id = randomUUID();
  await database.upsert("circle", {
    id,
    creatorId: creator.id,
    name: "Synthetic invitation allocation",
    type,
    targetAmount: target,
    contributionMode: mode,
    memberLimit: capacity,
    memberCount: 1,
    status: "active",
    visibility: "private",
    pricingPlan: mode === "custom" ? "standard" : "starter",
    pricingModelVersion: "model_specific_v1",
    activationStatus: "active",
    requireCreatorApproval: false,
  });
  await database.upsert("circleMembership", {
    circleId: id,
    userId: creator.id,
    role: "creator",
    membershipStatus: "joined",
    contributionStatus: "joined",
    expectedAmount:
      creatorAmount ??
      (type === "gift" && mode === "equal"
        ? gift.calculateEqualSlotAllocations(target, capacity)[0]
        : 0),
  });
  return { id, creator };
}

async function invitation(repo, fixture, options = {}) {
  const created = await repo.createCircleInvitation(
    fixture.id,
    fixture.creator.id,
    { mode: "open", maxUses: 1, ...options },
  );
  return {
    ...created,
    detail: await repo.loadInvitationByToken(created.token),
  };
}

async function members(circleId) {
  const response = await database.executeQuery("GetGiftCircleDetail", {
    circleId,
  });
  return response.data.circleMemberships;
}

async function accept(repo, created, member) {
  const detail = await repo.loadInvitationByToken(created.token);
  assert.ok(detail);
  return repo.respondToInvitation(detail, member, "accept");
}

function mutationBarrier(operation) {
  let count = 0;
  let release;
  let reject;
  let timer;
  const gate = new Promise((resolve, fail) => {
    release = resolve;
    reject = fail;
  });
  return {
    async before(actualOperation) {
      if (actualOperation !== operation) return;
      if (++count === 1)
        timer = setTimeout(
          () =>
            reject(
              new Error(
                "Two valid operations did not reach the database write boundary.",
              ),
            ),
          10000,
        );
      if (count === 2) {
        clearTimeout(timer);
        release();
      }
      await gate;
    },
    close() {
      clearTimeout(timer);
    },
  };
}

for (const target of [3000, 100]) {
  test(`real repository equal Gift acceptance allocates planned slots for target ${target}`, async () => {
    const repo = await repository();
    const fixture = await circle({ target });
    const created = await invitation(repo, fixture, { maxUses: 2 });
    const joined = [fixture.creator];
    for (let index = 0; index < 2; index++) {
      const member = await user("equal");
      assert.equal((await accept(repo, created, member)).status, "joined");
      joined.push(member);
    }
    const stored = await members(fixture.id);
    const expected = gift.calculateEqualSlotAllocations(target, 3);
    assert.deepEqual(
      joined.map(
        ({ id }) => stored.find((row) => row.user.id === id).expectedAmount,
      ),
      expected,
    );
    assert.equal(
      stored.reduce((sum, row) => sum + row.expectedAmount, 0),
      target,
    );
  });

  test(`real repository approval allocates planned equal Gift slots for target ${target}`, async () => {
    const repo = await repository();
    const fixture = await circle({ target });
    const created = await invitation(repo, fixture, {
      maxUses: 2,
      requireApproval: true,
    });
    const joined = [fixture.creator];
    for (let index = 0; index < 2; index++) {
      const member = await user("approval");
      assert.equal(
        (await accept(repo, created, member)).status,
        "approval_pending",
      );
      assert.equal(
        (await members(fixture.id)).some((row) => row.user.id === member.id),
        false,
      );
      await repo.approveInvitationMembership(
        fixture.id,
        created.id,
        member.id,
        fixture.creator.id,
      );
      joined.push(member);
    }
    const stored = await members(fixture.id);
    assert.deepEqual(
      joined.map(
        ({ id }) => stored.find((row) => row.user.id === id).expectedAmount,
      ),
      gift.calculateEqualSlotAllocations(target, 3),
    );
  });
}

test("real equal replacement reuses the unassigned remainder slot without rewriting joined shares", async () => {
  const repo = await repository();
  const fixture = await circle({ target: 101 });
  const remaining = await user("remaining");
  const removed = await user("removed");
  for (const [member, expectedAmount, membershipStatus] of [
    [remaining, 33, "joined"],
    [removed, 34, "removed"],
  ])
    await database.upsert("circleMembership", {
      circleId: fixture.id,
      userId: member.id,
      role: "member",
      membershipStatus,
      contributionStatus: membershipStatus,
      expectedAmount,
    });
  await database.upsert("circle", { id: fixture.id, memberCount: 2 });
  const created = await invitation(repo, fixture);
  const replacement = await user("replacement");
  await accept(repo, created, replacement);
  const stored = await members(fixture.id);
  assert.equal(
    stored.find((row) => row.user.id === replacement.id).expectedAmount,
    34,
  );
  assert.equal(
    stored.find((row) => row.user.id === remaining.id).expectedAmount,
    33,
  );
  assert.equal(
    stored.find((row) => row.user.id === fixture.creator.id).expectedAmount,
    34,
  );
});

test("real custom Gift and Support invitations preserve their existing specified amounts", async () => {
  for (const [type, mode, amount] of [
    ["gift", "custom", 777],
    ["support", "equal", 456],
    ["support", "equal", 0],
  ]) {
    const repo = await repository();
    const fixture = await circle({
      type,
      mode,
      creatorAmount: type === "gift" ? 2223 : 0,
    });
    const member = await user("other-mode");
    const created = await invitation(repo, fixture, {
      mode: "named",
      recipientEmail: member.email,
      expectedAmount: amount,
    });
    await accept(repo, created, member);
    assert.equal(
      (await members(fixture.id)).find((row) => row.user.id === member.id)
        .expectedAmount,
      amount,
    );
  }
});

test("real inconsistent legacy equal rows fail closed without rewriting historical shares", async () => {
  const repo = await repository();
  const fixture = await circle({ target: 100 });
  const legacy = await user("legacy");
  await database.upsert("circleMembership", {
    circleId: fixture.id,
    userId: legacy.id,
    role: "member",
    membershipStatus: "joined",
    contributionStatus: "joined",
    expectedAmount: 0,
  });
  await database.upsert("circle", { id: fixture.id, memberCount: 2 });
  const created = await invitation(repo, fixture);
  const member = await user("legacy-next");
  const result = await Promise.allSettled([accept(repo, created, member)]);
  const stored = await members(fixture.id);
  assert.equal(result[0].status, "rejected");
  assert.equal(stored.length, 2);
  assert.equal(
    stored.find((row) => row.user.id === legacy.id).expectedAmount,
    0,
  );
  assert.equal(
    stored.find((row) => row.user.id === member.id),
    undefined,
  );
});

for (const [approval, capacity] of [
  [false, 2],
  [false, 3],
  [true, 2],
  [true, 3],
]) {
  test(`real prechecked ${approval ? "approvals" : "accepts"} cannot exceed capacity ${capacity} or one invitation use`, async () => {
    const setup = await repository();
    const fixture = await circle({ target: 3000, capacity });
    const created = await invitation(setup, fixture, {
      requireApproval: approval,
    });
    const candidates = [await user("race-a"), await user("race-b")];
    if (approval)
      for (const member of candidates)
        assert.equal(
          (await accept(setup, created, member)).status,
          "approval_pending",
        );
    const barrier = mutationBarrier(
      approval
        ? "ApproveInvitationMembership"
        : "AcceptInvitationWithMembership",
    );
    try {
      const repo = await repository(barrier.before);
      const results = await Promise.allSettled(
        candidates.map((member) =>
          approval
            ? repo.approveInvitationMembership(
                fixture.id,
                created.id,
                member.id,
                fixture.creator.id,
              )
            : accept(repo, created, member),
        ),
      );
      const detail = await setup.loadInvitationByToken(created.token);
      const stored = await members(fixture.id);
      const observed = {
        successfulMutations: results.filter((row) => row.status === "fulfilled")
          .length,
        joinedMembers: stored.length,
        memberCount: detail.circle.memberCount,
        acceptedUsers: detail.acceptances.filter(
          (row) => row.status === "accepted",
        ).length,
        useCount: detail.useCount,
      };
      assert.deepEqual(observed, {
        successfulMutations: 1,
        joinedMembers: 2,
        memberCount: 2,
        acceptedUsers: 1,
        useCount: 1,
      });
    } finally {
      barrier.close();
    }
  });
}
