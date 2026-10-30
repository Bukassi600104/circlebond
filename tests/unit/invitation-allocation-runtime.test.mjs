import assert from "node:assert/strict";
import test from "node:test";
import * as circleRules from "../../server/circles/engine.ts";
import * as giftRules from "../../server/circles/gift.ts";
import * as invitationRules from "../../server/invitations/rules.ts";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

async function fixture({
  type = "gift",
  contributionMode = "equal",
  targetAmount = 3000,
  memberLimit = 3,
  currentMembers = 1,
  expectedAmount = 0,
  existingAllocations,
} = {}) {
  const circle = {
    id: "allocation-circle",
    creatorId: "creator",
    type,
    contributionMode,
    targetAmount,
    memberLimit,
    status: "active",
    title: "Synthetic allocation fixture",
    pricingPlan: "starter",
  };
  const validConfiguration =
    Number.isInteger(targetAmount) &&
    targetAmount > 0 &&
    Number.isInteger(memberLimit) &&
    memberLimit > 0 &&
    memberLimit <= 100;
  const configured = validConfiguration
    ? giftRules.calculateEqualSlotAllocations(targetAmount, memberLimit)
    : [];
  const joinedAmounts =
    existingAllocations ??
    Array.from(
      { length: currentMembers },
      (_, index) => configured[index] ?? 1000,
    );
  currentMembers = joinedAmounts.length;
  const joined = joinedAmounts.map((amount, index) => ({
    expectedAmount: amount,
    role: index === 0 ? "creator" : "member",
    membershipStatus: "joined",
    user: { id: index === 0 ? "creator" : `existing-${index}` },
  }));
  const roles = new Map([["creator", "creator"]]);
  const pending = new Set();
  const mutations = [];
  const notifications = [];
  const invitation = {
    id: "allocation-invitation",
    mode: "open",
    expectedAmount,
    requireApproval: false,
    state: "sent",
    effectiveState: "sent",
    maxUses: 3,
    useCount: 0,
    expiresAt: "2099-01-01T00:00:00.000Z",
    createdAt: "2026-10-30T00:00:00.000Z",
    updatedAt: "2026-10-30T00:00:00.000Z",
    acceptances: [],
    invitedBy: { id: "creator", displayName: "Creator fixture" },
    circle: {
      ...circle,
      name: circle.title,
      description: "Synthetic invitation, no network or customer data",
      memberCount: currentMembers,
      requireCreatorApproval: false,
      creator: { id: "creator", displayName: "Creator fixture" },
    },
  };
  const db = {
    async executeQuery(operation, variables) {
      assert.equal(variables.circleId, circle.id);
      if (operation === "GetCircleEngineRecord") {
        return {
          data: {
            circle: {
              ...circle,
              name: circle.title,
              creator: { id: "creator" },
            },
            circleMemberships: joined,
          },
        };
      }
      assert.equal(variables.offset, 0);
      if (operation === "GetCircleInvitationsPage") {
        return { data: { invitations: [invitation] } };
      }
      assert.equal(operation, "GetCircleInvitationAcceptancesPage");
      return {
        data: {
          invitationAcceptances: [...pending].map((userId) => ({
            invitation: { id: invitation.id },
            user: { id: userId, displayName: "Pending fixture" },
            status: "pending",
            createdAt: "2026-10-30T00:00:00.000Z",
          })),
        },
      };
    },
    async executeMutation(operation, variables) {
      mutations.push({ operation, variables });
      if (
        operation === "AcceptInvitationWithMembership" ||
        operation === "ApproveInvitationMembership"
      ) {
        currentMembers = variables.nextMemberCount;
        invitation.useCount = variables.nextUseCount;
        roles.set(variables.userId, "member");
        joined.push({
          expectedAmount: variables.expectedAmount,
          role: "member",
          membershipStatus: "joined",
          user: { id: variables.userId },
        });
        pending.delete(variables.userId);
      }
      return { data: {} };
    },
  };
  const dataConnect = { getBondCircleDataConnect: () => db };
  const pages = await loadTypescriptModule("server/repositories/pages.ts", {
    "server-only": {},
    "@/server/firebase/data-connect": dataConnect,
  });
  const repo = await loadTypescriptModule(
    "server/repositories/invitations.ts",
    {
      "server-only": {},
      "@/server/firebase/data-connect": dataConnect,
      "@/server/repositories/pages": pages,
      "@/server/auth/legal": { assertLegalAcceptance: async () => {} },
      "@/server/circles/engine": circleRules,
      "@/server/circles/gift": giftRules,
      "@/server/invitations/rules": invitationRules,
      "@/server/repositories/circles": {
        firebaseCircleStore: {
          findById: async () => circle,
          memberCount: async () => currentMembers,
          roleFor: async (_circleId, userId) => roles.get(userId) ?? null,
        },
      },
      "@/server/repositories/notifications": {
        safelyEmitNotification: async (entry) => notifications.push(entry),
      },
      "@/server/pricing": {},
    },
  );
  return {
    circle,
    invitation,
    mutations,
    notifications,
    async join(userId, approval = false) {
      if (approval) {
        pending.add(userId);
        return repo.approveInvitationMembership(
          circle.id,
          invitation.id,
          userId,
          "creator",
        );
      }
      return repo.respondToInvitation(
        invitation,
        { id: userId, email: null, phone: null },
        "accept",
      );
    },
  };
}

for (const approval of [false, true]) {
  const path = approval ? "approved" : "direct";

  test(`equal Gift ${path} joins ignore zero and forged invitation amounts`, async () => {
    for (const expectedAmount of [0, 999999]) {
      const f = await fixture({ expectedAmount });
      await f.join("member-one", approval);
      assert.equal(f.mutations.length, 1);
      assert.equal(
        f.mutations[0].operation,
        approval
          ? "ApproveInvitationMembership"
          : "AcceptInvitationWithMembership",
      );
      assert.equal(f.mutations[0].variables.expectedAmount, 1000);
      assert.equal(f.mutations[0].variables.nextMemberCount, 2);
      assert.equal(f.notifications.length, 1);
    }
  });

  test(`equal Gift ${path} sequential joins conserve the rounded target`, async () => {
    const f = await fixture({ targetAmount: 100, expectedAmount: 0 });
    const configured = giftRules.calculateEqualSlotAllocations(100, 3);
    assert.deepEqual(configured, [34, 33, 33]);
    await f.join("member-one", approval);
    await f.join("member-two", approval);
    const actual = [
      configured[0],
      ...f.mutations.map((entry) => entry.variables.expectedAmount),
    ];
    assert.deepEqual(actual, [34, 33, 33]);
    assert.equal(
      actual.reduce((sum, value) => sum + value, 0),
      100,
    );
  });

  test(`equal Gift ${path} multi-use joins consume both rounded allocation values`, async () => {
    const f = await fixture({ targetAmount: 101 });
    await f.join("member-one", approval);
    await f.join("member-two", approval);
    assert.deepEqual(
      [34, ...f.mutations.map((entry) => entry.variables.expectedAmount)],
      [34, 34, 33],
    );
  });

  test(`equal Gift ${path} replacement fills the removed allocation instead of its count index`, async () => {
    const f = await fixture({
      targetAmount: 101,
      existingAllocations: [34, 33],
    });
    await f.join("replacement-member", approval);
    assert.equal(f.mutations.length, 1);
    assert.equal(f.mutations[0].variables.expectedAmount, 34);
    assert.equal(34 + 33 + f.mutations[0].variables.expectedAmount, 101);
  });

  test(`equal Support ${path} joins ignore zero and forged invitation amounts`, async () => {
    for (const expectedAmount of [0, 999999]) {
      const f = await fixture({ type: "support", expectedAmount });
      await f.join("member-one", approval);
      assert.equal(f.mutations.length, 1);
      assert.equal(f.mutations[0].variables.expectedAmount, 1000);
      assert.equal(f.mutations[0].variables.nextMemberCount, 2);
      assert.equal(f.notifications.length, 1);
    }
  });

  test(`equal Support ${path} joins conserve rounded allocations and fill a removed share`, async () => {
    for (const targetAmount of [100, 101]) {
      const f = await fixture({ type: "support", targetAmount });
      await f.join("member-one", approval);
      await f.join("member-two", approval);
      const actual = [
        34,
        ...f.mutations.map((entry) => entry.variables.expectedAmount),
      ];
      assert.deepEqual(
        actual,
        targetAmount === 100 ? [34, 33, 33] : [34, 34, 33],
      );
      assert.equal(
        actual.reduce((sum, value) => sum + value, 0),
        targetAmount,
      );
    }
    const replacement = await fixture({
      type: "support",
      targetAmount: 101,
      existingAllocations: [34, 33],
    });
    await replacement.join("replacement-member", approval);
    assert.equal(replacement.mutations.length, 1);
    assert.equal(replacement.mutations[0].variables.expectedAmount, 34);
  });

  test(`legacy missing contribution mode defaults to equal for Gift and Support ${path} joins`, async () => {
    for (const type of ["gift", "support"]) {
      for (const mode of [null, undefined]) {
        const f = await fixture({ type, contributionMode: null });
        f.circle.contributionMode = mode;
        f.invitation.circle.contributionMode = mode;
        await f.join("member-one", approval);
        assert.equal(f.mutations.length, 1);
        assert.equal(f.mutations[0].variables.expectedAmount, 1000);
      }
    }
  });

  test(`custom Gift, Custom Support and Aso-Ebi ${path} joins preserve their invitation amount`, async () => {
    // Support creation accepts equal/custom and seeds equal creator allocations
    // with the actual Gift allocator. Only Custom Support belongs in this case.
    for (const options of [
      { type: "gift", contributionMode: "custom" },
      { type: "support", contributionMode: "custom" },
      { type: "aso-ebi", contributionMode: null },
    ]) {
      const f = await fixture({ ...options, expectedAmount: 725 });
      await f.join("member-one", approval);
      assert.equal(f.mutations.length, 1);
      assert.equal(f.mutations[0].variables.expectedAmount, 725);
    }
  });

  test(`a full circle rejects ${path} membership without writes`, async () => {
    const f = await fixture({ currentMembers: 3 });
    await assert.rejects(f.join("member-one", approval), /capacity/i);
    assert.equal(f.mutations.length, 0);
    assert.equal(f.notifications.length, 0);
  });

  test(`malformed equal Gift configuration rejects ${path} membership without writes`, async () => {
    for (const options of [
      { targetAmount: 0 },
      { targetAmount: -1 },
      { targetAmount: 100.5 },
      { targetAmount: Number.NaN },
      { memberLimit: 2.5 },
      { memberLimit: 101 },
    ]) {
      const f = await fixture(options);
      await assert.rejects(f.join("member-one", approval));
      assert.equal(f.mutations.length, 0);
      assert.equal(f.notifications.length, 0);
    }
  });

  test(`inconsistent historical equal allocations reject ${path} membership without rewriting members`, async () => {
    for (const existingAllocations of [[0], [999999], [34, 34]]) {
      const f = await fixture({ targetAmount: 100, existingAllocations });
      await assert.rejects(f.join("member-one", approval));
      assert.equal(f.mutations.length, 0);
      assert.equal(f.notifications.length, 0);
    }
  });
}
