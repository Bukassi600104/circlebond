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
      user: { id: "creator" },
      role: "creator",
      membershipStatus: "joined",
      expectedAmount: 1000,
    },
  ];
  const beforeMembers = structuredClone(existingMembers);
  const invitation = {
    id: "upgraded-allocation-invitation",
    mode: "open",
    expectedAmount: 0,
    requireApproval: false,
    state: "sent",
    effectiveState: "sent",
    maxUses: 1,
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
          invitationAcceptances: [
            {
              invitation: { id: invitation.id },
              user: { id: "new-member", displayName: "Pending fixture" },
              status: "pending",
              createdAt: "2026-10-30T00:00:00.000Z",
            },
          ],
        },
      };
    },
    async executeMutation(operation, variables) {
      mutations.push({ operation, variables });
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
          roleFor: async (_circleId, userId) =>
            userId === "creator" ? "creator" : null,
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
  };
}

// Increasing capacity from 3 to 10 preserves the creator's historical 1000
// allocation. This compatibility check intentionally does not choose a new
// member's share: that business policy requires an owner decision.
for (const type of ["gift", "support"]) {
  for (const approval of [false, true]) {
    const path = approval ? "approved" : "direct";
    test(`upgraded equal ${type} permits ${path} joining without rewriting historical allocations`, async () => {
      const f = await upgradedFixture(type);
      if (approval) {
        await f.repo.approveInvitationMembership(
          f.circle.id,
          f.invitation.id,
          "new-member",
          "creator",
        );
      } else {
        const result = await f.repo.respondToInvitation(
          f.invitation,
          { id: "new-member", email: null, phone: null },
          "accept",
        );
        assert.equal(result.status, "joined");
      }
      assert.equal(f.mutations.length, 1);
      assert.equal(
        f.mutations[0].operation,
        approval
          ? "ApproveInvitationMembership"
          : "AcceptInvitationWithMembership",
      );
      assert.equal(f.mutations[0].variables.userId, "new-member");
      assert.equal(f.mutations[0].variables.nextMemberCount, 2);
      assert.deepEqual(f.existingMembers, f.beforeMembers);
    });
  }
}
