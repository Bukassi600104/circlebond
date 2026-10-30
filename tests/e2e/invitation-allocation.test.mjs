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
      await beforeMutation(operation, variables);
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
  plan,
} = {}) {
  const creator = await user("creator");
  const id = randomUUID();
  const record = {
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
    pricingPlan: plan ?? (mode === "custom" ? "standard" : "starter"),
    pricingModelVersion: "model_specific_v1",
    activationStatus: "active",
    requireCreatorApproval: false,
  };
  await database.upsert("circle", record);
  await database.upsert("circleMembership", {
    circleId: id,
    userId: creator.id,
    role: "creator",
    membershipStatus: "joined",
    contributionStatus: "joined",
    expectedAmount:
      creatorAmount ??
      (["gift", "support"].includes(type) && mode === "equal"
        ? gift.calculateEqualSlotAllocations(target, capacity)[0]
        : 0),
  });
  return { id, creator, record };
}

async function writeCircle(fixture, changes) {
  await database.upsert("circle", { ...fixture.record, ...changes });
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
  await writeCircle(fixture, { memberCount: 2 });
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
    ["support", "custom", 456],
    ["support", "custom", 0],
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
  await writeCircle(fixture, { memberCount: 2 });
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

for (const approval of [false, true]) {
  test(`real equal Support ${approval ? "approval" : "acceptance"} assigns the existing planned shares`, async () => {
    const repo = await repository();
    const fixture = await circle({ type: "support", plan: "premium" });
    const created = await invitation(repo, fixture, {
      maxUses: 2,
      requireApproval: approval,
    });
    const joined = [fixture.creator];
    for (let index = 0; index < 2; index++) {
      const member = await user("support-equal");
      const outcome = await accept(repo, created, member);
      assert.equal(outcome.status, approval ? "approval_pending" : "joined");
      if (approval)
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
      [1000, 1000, 1000],
    );
  });
}

async function expireInvitation(
  fixture,
  created,
  detail,
  expiresAt = new Date(Date.now() - 1000).toISOString(),
) {
  await database.upsert("invitation", {
    id: created.id,
    circleId: fixture.id,
    invitedById: fixture.creator.id,
    tokenHash: rules.createSecureInvitationToken(created.token).tokenHash,
    mode: detail.mode,
    expectedAmount: detail.expectedAmount,
    requireApproval: detail.requireApproval,
    state: detail.state,
    maxUses: detail.maxUses,
    useCount: detail.useCount,
    expiresAt,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  });
}

for (const approval of [false, true]) {
  for (const state of ["completed", "revoked", "expired"]) {
    test(`real prechecked ${approval ? "approval" : "acceptance"} rejects a newly ${state} transaction state`, async () => {
      const setup = await repository();
      const fixture = await circle();
      const created = await invitation(setup, fixture, {
        requireApproval: approval,
      });
      const member = await user("closed-state");
      if (approval)
        assert.equal(
          (await accept(setup, created, member)).status,
          "approval_pending",
        );
      let changed = false;
      const repo = await repository(async (operation) => {
        if (
          operation !==
            (approval
              ? "ApproveInvitationMembership"
              : "AcceptInvitationWithMembership") ||
          changed
        )
          return;
        changed = true;
        if (state === "completed")
          await writeCircle(fixture, {
            status: "completed",
            completedAt: new Date().toISOString(),
          });
        if (state === "revoked")
          await setup.revokeInvitation(
            created.id,
            fixture.id,
            fixture.creator.id,
          );
        if (state === "expired")
          await expireInvitation(
            fixture,
            created,
            await setup.loadInvitationByToken(created.token),
          );
      });
      const result = await Promise.allSettled([
        approval
          ? repo.approveInvitationMembership(
              fixture.id,
              created.id,
              member.id,
              fixture.creator.id,
            )
          : accept(repo, created, member),
      ]);
      assert.equal(
        changed,
        true,
        "The state change must occur after real prechecks and before the actual mutation.",
      );
      const detail = await setup.loadInvitationByToken(created.token);
      assert.deepEqual(
        {
          outcome: result[0].status,
          joinedMembers: (await members(fixture.id)).length,
          state: detail.state,
          useCount: detail.useCount,
        },
        {
          outcome: "rejected",
          joinedMembers: 1,
          state:
            state === "revoked"
              ? "revoked"
              : approval
                ? "approval_pending"
                : "created",
          useCount: 0,
        },
      );
    });
  }

  test(`real ${approval ? "approval" : "acceptance"} cannot join an unpaid draft while invitation preparation stays available`, async () => {
    const repo = await repository();
    const fixture = await circle();
    await writeCircle(fixture, {
      status: "draft",
      activationStatus: "pending_payment",
    });
    const created = await invitation(repo, fixture, {
      requireApproval: approval,
    });
    assert.ok(created.id, "Preparing the invitation must remain available.");
    const member = await user("unpaid-draft");
    if (approval) {
      // A pre-existing pending request must not bypass publication on approval.
      await database.upsert("invitationAcceptance", {
        invitationId: created.id,
        userId: member.id,
        status: "pending",
        respondedAt: new Date().toISOString(),
      });
    }
    const result = await Promise.allSettled([
      approval
        ? repo.approveInvitationMembership(
            fixture.id,
            created.id,
            member.id,
            fixture.creator.id,
          )
        : accept(repo, created, member),
    ]);
    const detail = await repo.loadInvitationByToken(created.token);
    assert.deepEqual(
      {
        outcome: result[0].status,
        joinedMembers: (await members(fixture.id)).length,
        useCount: detail.useCount,
      },
      { outcome: "rejected", joinedMembers: 1, useCount: 0 },
    );
  });
}

test("real active grandfathered circles retain valid invitation membership", async () => {
  const repo = await repository();
  const fixture = await circle();
  await writeCircle(fixture, {
    pricingPlan: "free",
    pricingModelVersion: "legacy",
    activationStatus: "grandfathered",
  });
  const created = await invitation(repo, fixture);
  const member = await user("grandfathered");
  assert.equal((await accept(repo, created, member)).status, "joined");
  assert.equal((await members(fixture.id)).length, 2);
});

for (const approval of [false, true]) {
  test(`real prechecked ${approval ? "approval" : "acceptance"} uses transaction time for expiry after respondedAt`, async (context) => {
    const setup = await repository();
    const fixture = await circle();
    const created = await invitation(setup, fixture, {
      requireApproval: approval,
    });
    const member = await user("expiry-window");
    if (approval)
      assert.equal(
        (await accept(setup, created, member)).status,
        "approval_pending",
      );
    let timing;
    const repo = await repository(async (operation, variables) => {
      if (
        operation !==
        (approval
          ? "ApproveInvitationMembership"
          : "AcceptInvitationWithMembership")
      )
        return;
      const respondedAt = Date.parse(variables.respondedAt);
      const expiry = respondedAt + 1;
      await expireInvitation(
        fixture,
        created,
        await setup.loadInvitationByToken(created.token),
        new Date(expiry).toISOString(),
      );
      const mutationCall = Date.now();
      assert.ok(
        respondedAt < expiry && expiry < mutationCall,
        "The actual database fixture must prove respondedAt < expiry < mutation call.",
      );
      timing = {
        respondedToExpiryMs: expiry - respondedAt,
        expiryToMutationCallMs: mutationCall - expiry,
      };
    });
    const result = await Promise.allSettled([
      approval
        ? repo.approveInvitationMembership(
            fixture.id,
            created.id,
            member.id,
            fixture.creator.id,
          )
        : accept(repo, created, member),
    ]);
    assert.ok(
      timing,
      "The expiry change must occur at the real write boundary.",
    );
    context.diagnostic(JSON.stringify(timing));
    const detail = await setup.loadInvitationByToken(created.token);
    assert.deepEqual(
      {
        outcome: result[0].status,
        joinedMembers: (await members(fixture.id)).length,
        useCount: detail.useCount,
      },
      { outcome: "rejected", joinedMembers: 1, useCount: 0 },
    );
  });
}

test("real stored capacity upgrade permits joining with allocation policy unasserted", async (context) => {
  const repo = await repository();
  const fixture = await circle({ target: 3000, capacity: 3 });
  const before = await members(fixture.id);
  // Represent an already-upgraded stored circle; this fixture makes no provider
  // or payment-settlement assertion. The new member's share policy is undecided.
  await writeCircle(fixture, { memberLimit: 10, pricingPlan: "standard" });
  const created = await invitation(repo, fixture);
  const member = await user("capacity-upgrade");
  const result = await Promise.allSettled([accept(repo, created, member)]);
  const after = await members(fixture.id);
  context.diagnostic(
    JSON.stringify({
      beforeAmounts: before.map((row) => row.expectedAmount),
      afterAmounts: after.map((row) => row.expectedAmount),
      outcome: result[0].status,
      rejectionCode:
        result[0].status === "rejected" ? result[0].reason.code : null,
    }),
  );
  assert.equal(result[0].status, "fulfilled");
  assert.equal(result[0].value.status, "joined");
  assert.equal(after.length, before.length + 1);
  for (const existing of before)
    assert.ok(
      after.some((row) => row.user.id === existing.user.id),
      "Previously joined members must remain members after the new join.",
    );
});
