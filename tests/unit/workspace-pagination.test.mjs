import assert from "node:assert/strict";
import * as crypto from "node:crypto";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

async function pagesFor(db) {
  return loadTypescriptModule("server/repositories/pages.ts", {
    "server-only": {},
    "@/server/firebase/data-connect": { getBondCircleDataConnect: () => db },
  });
}
const contributionRules = await loadTypescriptModule(
  "server/contributions/engine.ts",
  {},
);
const receipt = (id, user, status = "confirmed") => ({
  id,
  amount: 500,
  imageUrl: "/private-receipt",
  imageStoragePath: "synthetic/path",
  contentType: "image/jpeg",
  status,
  overpaymentAmount: 0,
  submittedAt: "2026-10-30",
  uploadedBy: { id: user, displayName: "Synthetic member" },
});

async function contributions(rows, failLater = false) {
  const mutations = [];
  const db = {
    executeQuery: async (operation, variables) => {
      if (operation === "GetContributionWorkspaceMetadata")
        return {
          data: {
            circle: {
              id: "circle",
              status: "active",
              targetAmount: 10000,
              contributedAmount: 0,
              creator: { id: "creator" },
            },
            circleMemberships: [
              {
                user: { id: "self", displayName: "Member" },
                role: "member",
                membershipStatus: "joined",
                expectedAmount: 2000,
                confirmedAmount: 0,
                contributionStatus: "pending",
              },
            ],
          },
        };
      assert.equal(operation, "GetContributionReceiptsPage");
      assert.equal(variables.circleId, "circle");
      if (failLater && variables.offset)
        throw new Error("later page unavailable");
      return {
        data: {
          receipts: rows.slice(variables.offset, variables.offset + 200),
        },
      };
    },
    executeMutation: async (operation, variables) => {
      mutations.push({ operation, variables });
    },
  };
  const repo = await loadTypescriptModule(
    "server/repositories/contributions.ts",
    {
      "server-only": {},
      "@/server/firebase/data-connect": { getBondCircleDataConnect: () => db },
      "@/server/repositories/pages": await pagesFor(db),
      "@/server/repositories/communication": {},
      "@/server/repositories/notifications": {
        safelyEmitNotification: async () => {},
      },
      "@/server/contributions/engine": contributionRules,
      "@/server/uploads/private-access": {
        createPrivateFileAccess: () => "synthetic-access",
      },
    },
  );
  return { repo, mutations };
}

test("older own receipts remain visible and contribute to pending totals after200 newer receipts", async () => {
  const rows = [
    ...Array.from({ length: 201 }, (_, i) => receipt(`other-${i}`, "other")),
    receipt("own-pending", "self", "awaiting_confirmation"),
    receipt("own-rejected", "self", "rejected"),
  ];
  const { repo, mutations } = await contributions(rows);
  const workspace = await repo.loadContributionWorkspace("circle", "self");
  assert.equal(workspace.receipts.length, 2);
  assert.equal(workspace.viewer.pendingAmount, 500);
  assert.equal(workspace.reviewQueue.length, 0);
  await repo.submitContributionReceipt({
    receiptId: "replacement",
    circleId: "circle",
    uploaderId: "self",
    amount: 500,
    note: null,
    imageUrl: "/private",
    imageStoragePath: "synthetic/replacement",
    contentType: "image/jpeg",
    replacementOfId: "own-rejected",
  });
  assert.equal(mutations[0].operation, "ReplaceReceiptWithAudit");
  assert.equal(mutations[0].variables.replacedReceiptId, "own-rejected");
});

test("later receipt page failure cannot authorize a replacement from a partial workspace", async () => {
  const { repo, mutations } = await contributions(
    Array.from({ length: 201 }, (_, i) =>
      receipt(`receipt-${i}`, "self", "rejected"),
    ),
    true,
  );
  await assert.rejects(
    repo.submitContributionReceipt({
      circleId: "circle",
      uploaderId: "self",
      receiptId: "new",
      replacementOfId: "receipt-0",
      amount: 500,
    }),
  );
  assert.equal(mutations.length, 0);
});

const invitationRules = await loadTypescriptModule(
  "server/invitations/rules.ts",
  { "node:crypto": crypto },
);
async function invitations(failLater = false) {
  const mutations = [];
  const circle = {
    id: "circle",
    creatorId: "creator",
    memberLimit: 100,
    status: "active",
  };
  const live = {
    id: "old-live",
    mode: "open",
    state: "sent",
    maxUses: 2,
    useCount: 0,
    expiresAt: "2099-01-01",
    createdAt: "2026-01-01",
    circle: { ...circle, creator: { id: "creator", displayName: "Creator" } },
    invitedBy: { id: "creator", displayName: "Creator" },
  };
  const rows = [
    ...Array.from({ length: 201 }, (_, i) => ({
      ...live,
      id: `revoked-${i}`,
      state: "revoked",
    })),
    live,
  ];
  const acceptances = Array.from({ length: 201 }, (_, i) => ({
    invitation: { id: live.id },
    status: i === 200 ? "pending" : "declined",
    createdAt: "2026-10-30",
    user: { id: `user-${i}`, displayName: "Synthetic user" },
  }));
  const db = {
    executeQuery: async (operation, variables) => {
      if (operation === "GetInvitationByTokenHash")
        return { data: { invitations: [live] } };
      if (failLater && variables.offset)
        throw new Error("later page unavailable");
      if (operation === "GetCircleInvitationsPage")
        return {
          data: {
            invitations: rows.slice(variables.offset, variables.offset + 200),
          },
        };
      assert.ok(
        [
          "GetCircleInvitationAcceptancesPage",
          "GetInvitationAcceptancesPage",
        ].includes(operation),
      );
      return {
        data: {
          invitationAcceptances: acceptances.slice(
            variables.offset,
            variables.offset + 200,
          ),
        },
      };
    },
    executeMutation: async (operation, variables) =>
      mutations.push({ operation, variables }),
  };
  const repo = await loadTypescriptModule(
    "server/repositories/invitations.ts",
    {
      "server-only": {},
      "@/server/firebase/data-connect": { getBondCircleDataConnect: () => db },
      "@/server/repositories/pages": await pagesFor(db),
      "@/server/auth/legal": {},
      "@/server/circles/engine": {
        assertPermission: (role) => assert.equal(role, "creator"),
      },
      "@/server/repositories/circles": {
        firebaseCircleStore: { findById: async () => circle },
      },
      "@/server/invitations/rules": invitationRules,
      "@/server/repositories/notifications": {},
      "@/server/pricing": {},
    },
  );
  return { repo, mutations };
}

test("old live invitations and all acceptance history remain manageable", async () => {
  const { repo, mutations } = await invitations();
  const rows = await repo.listCircleInvitations("circle");
  assert.equal(rows.length, 202);
  assert.equal(
    rows.find((row) => row.id === "old-live").acceptances.length,
    201,
  );
  assert.equal(
    (await repo.loadInvitationByToken("a".repeat(64))).acceptances.length,
    201,
  );
  await repo.revokeInvitation("old-live", "circle", "creator");
  assert.equal(mutations[0].operation, "UpdateInvitationState");
  assert.equal(mutations[0].variables.invitationId, "old-live");
  assert.equal(mutations[0].variables.state, "revoked");
});

test("incomplete invitation history cannot cause a state mutation", async () => {
  const { repo, mutations } = await invitations(true);
  await assert.rejects(repo.revokeInvitation("revoked-0", "circle", "creator"));
  assert.equal(mutations.length, 0);
});

test("failed payment history cannot hide the successful activation used for upgrade credit", async () => {
  const history = [
    ...Array.from({ length: 201 }, (_, i) => ({
      id: `failed-${i}`,
      status: "failed",
      pricePaidMinor: 0,
    })),
    { id: "paid-old", status: "succeeded", pricePaidMinor: 150000 },
  ];
  const db = {
    executeQuery: async (operation, variables) =>
      operation === "GetCirclePricingState"
        ? {
            data: {
              circle: {
                id: "circle",
                creator: { id: "creator" },
                type: "gift",
                pricingPlan: "starter",
                memberLimit: 10,
                status: "active",
              },
              circleActivations: history.slice(0, 100),
            },
          }
        : {
            data: {
              circleActivations: history.slice(
                variables.offset,
                variables.offset + 200,
              ),
            },
          },
  };
  const repo = await loadTypescriptModule("server/repositories/pricing.ts", {
    "server-only": {},
    "node:crypto": crypto,
    "@/server/firebase/data-connect": { getBondCircleDataConnect: () => db },
    "@/server/repositories/pages": await pagesFor(db),
    "@/server/pricing/entitlements": {},
    "@/server/repositories/notifications": {},
    "@/server/repositories/operational-events": {},
  });
  const state = await repo.loadCirclePricingState("circle");
  assert.equal(state.activations.length, 202);
  assert.equal(
    state.activations.find((row) => row.status === "succeeded").pricePaidMinor,
    150000,
  );
});
