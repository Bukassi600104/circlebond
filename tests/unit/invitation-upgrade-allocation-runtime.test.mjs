import assert from "node:assert/strict";
import test from "node:test";
import * as circleRules from "../../server/circles/engine.ts";
import * as giftRules from "../../server/circles/gift.ts";
import * as invitationRules from "../../server/invitations/rules.ts";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

async function upgradedFixture(type) {
  const circle = {
    id: "upgraded-allocation-circle",
    creatorId: "creator",
    creator: { id: "creator" },
    type,
    contributionMode: "equal",
    targetAmount: 3000,
    memberLimit: 10,
    pricingPlan: "starter",
    activationStatus: "active",
    status: "active",
  };
  const existingMembers = [
    {
      id: "historical-creator-membership",
      user: { id: "creator" },
      role: "creator",
      membershipStatus: "joined",
      expectedAmount: 1000,
      confirmedAmount: 400,
    },
  ];
  const beforeMembers = structuredClone(existingMembers);
  const pending = new Set();
  const roles = new Map([["creator", "creator"]]);
  const invitation = {
    id: "upgraded-allocation-invitation",
    mode: "open",
    expectedAmount: 0,
    requireApproval: false,
    state: "sent",
    effectiveState: "sent",
    maxUses: 9,
    useCount: 0,
    expiresAt: "2099-01-01T00:00:00.000Z",
    createdAt: "2026-10-30T00:00:00.000Z",
    updatedAt: "2026-10-30T00:00:00.000Z",
    acceptances: [],
    invitedBy: { id: "creator", displayName: "Creator fixture" },
    circle: { ...circle, requireCreatorApproval: false },
  };
  const mutations = [];
  const db = {
    async executeQuery(operation, variables) {
      assert.equal(variables.circleId, circle.id);
      if (operation === "GetCircleEngineRecord") {
        return { data: { circle, circleMemberships: existingMembers } };
      }
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
        [
          "AcceptInvitationWithMembership",
          "ApproveInvitationMembership",
        ].includes(operation)
      ) {
        existingMembers.push({
          id: `membership-${variables.userId}`,
          user: { id: variables.userId },
          role: "member",
          membershipStatus: "joined",
          expectedAmount: variables.expectedAmount,
          confirmedAmount: 0,
        });
        invitation.useCount = variables.nextUseCount;
        roles.set(variables.userId, "member");
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
          memberCount: async () => existingMembers.length,
          roleFor: async (_circleId, userId) => roles.get(userId) ?? null,
        },
      },
      "@/server/repositories/notifications": {
        safelyEmitNotification: async () => {},
      },
      "@/server/pricing": {},
    },
  );
  return {
    circle,
    invitation,
    repo,
    mutations,
    existingMembers,
    beforeMembers,
    async join(userId, approval) {
      if (approval) {
        pending.add(userId);
        await repo.approveInvitationMembership(
          circle.id,
          invitation.id,
          userId,
          "creator",
        );
      } else {
        const result = await repo.respondToInvitation(
          invitation,
          { id: userId, email: null, phone: null },
          "accept",
        );
        assert.equal(result.status, "joined");
      }
    },
  };
}

function membershipHistory(members) {
  return members.map(
    ({ id, user, role, membershipStatus, confirmedAmount }) => ({
      id,
      userId: user.id,
      role,
      membershipStatus,
      confirmedAmount,
    }),
  );
}

function allocationObservations(members) {
  return members.map(({ id, expectedAmount, confirmedAmount }) => ({
    id,
    expectedAmount,
    unpaidAmount: Math.max(0, expectedAmount - confirmedAmount),
  }));
}

// Owner-approved policy: keep every existing assigned/confirmed amount, then
// split only the remaining target across unfilled places for new members.
for (const type of ["gift", "support"]) {
  for (const approval of [false, true]) {
    const path = approval ? "approved" : "direct";
    test(`upgraded equal ${type} ${path} joins split the remaining target and preserve assigned/confirmed history`, async (t) => {
      const f = await upgradedFixture(type);
      try {
        for (let index = 0; index < 9; index++) {
          await f.join(`new-member-${index}`, approval);
        }
        const joins = f.mutations.filter((entry) =>
          [
            "ApproveInvitationMembership",
            "AcceptInvitationWithMembership",
          ].includes(entry.operation),
        );
        assert.equal(joins.length, 9);
        assert.deepEqual(
          joins.map((m) => m.variables.expectedAmount),
          [223, 223, 222, 222, 222, 222, 222, 222, 222],
        );
        for (let index = 0; index < joins.length; index++) {
          assert.equal(
            joins[index].operation,
            approval
              ? "ApproveInvitationMembership"
              : "AcceptInvitationWithMembership",
          );
          assert.equal(joins[index].variables.userId, `new-member-${index}`);
          assert.equal(joins[index].variables.nextMemberCount, index + 2);
        }
        assert.equal(
          f.existingMembers.reduce((sum, m) => sum + m.expectedAmount, 0),
          3000,
        );
        assert.deepEqual(
          f.existingMembers.slice(0, f.beforeMembers.length),
          f.beforeMembers,
        );
        assert.deepEqual(
          membershipHistory(f.existingMembers.slice(0, f.beforeMembers.length)),
          membershipHistory(f.beforeMembers),
        );
      } finally {
        t.diagnostic(
          `Unpaid allocation observations: ${JSON.stringify({
            before: allocationObservations(f.beforeMembers),
            after: allocationObservations(
              f.existingMembers.slice(0, f.beforeMembers.length),
            ),
          })}`,
        );
      }
    });
  }
}
