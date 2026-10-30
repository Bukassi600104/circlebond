import assert from "node:assert/strict";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

const rules = await loadTypescriptModule("server/contributions/engine.ts", {});
async function fixture({
  targetAmount = 987654321,
  contributedAmount = 876543210,
} = {}) {
  const metadata = {
    circle: {
      id: "circle",
      name: "Private support",
      type: "support",
      status: "active",
      targetAmount,
      contributedAmount,
      showTargetToMembers: false,
      showConfirmedTotalToMembers: false,
      creator: { id: "creator" },
    },
    circleMemberships: [
      {
        user: { id: "creator", displayName: "Creator" },
        role: "creator",
        membershipStatus: "joined",
        expectedAmount: 1000,
        confirmedAmount: 0,
      },
      {
        user: { id: "self", displayName: "Member" },
        role: "member",
        membershipStatus: "joined",
        expectedAmount: 1000,
        confirmedAmount: 0,
      },
    ],
  };
  const receipt = {
    id: "receipt",
    amount: 500,
    imageUrl: "/private-image",
    imageStoragePath: "circles/circle/receipts/private-object",
    contentType: "image/jpeg",
    status: "awaiting_confirmation",
    overpaymentAmount: 0,
    submittedAt: "2026-10-30",
    uploadedBy: { id: "self", displayName: "Member" },
  };
  const mutations = [];
  const audit = [];
  const db = {
    executeQuery: async (operation, variables) => {
      assert.equal(variables.circleId, "circle");
      if (operation === "GetContributionWorkspaceMetadata")
        return { data: metadata };
      assert.equal(operation, "GetContributionReceiptsPage");
      return { data: { receipts: [receipt] } };
    },
    executeMutation: async (operation, variables) =>
      mutations.push({ operation, variables }),
  };
  const pages = await loadTypescriptModule("server/repositories/pages.ts", {
    "server-only": {},
    "@/server/firebase/data-connect": { getBondCircleDataConnect: () => db },
  });
  const repo = await loadTypescriptModule(
    "server/repositories/contributions.ts",
    {
      "server-only": {},
      "@/server/firebase/data-connect": { getBondCircleDataConnect: () => db },
      "@/server/repositories/pages": pages,
      "@/server/repositories/communication": {
        recordSystemActivity: async (entry) => audit.push(entry),
      },
      "@/server/repositories/notifications": {
        safelyEmitNotification: async () => {},
      },
      "@/server/contributions/engine": rules,
      "@/server/uploads/private-access": {
        createPrivateFileAccess: () => "synthetic-access",
      },
    },
  );
  return { repo, mutations, audit, receipt };
}

test("shared rendered workspace and receipt GET omit hidden totals and raw storage paths", async () => {
  const f = await fixture();
  const workspace = await f.repo.loadContributionWorkspace("circle", "self");
  assert.equal(workspace.viewer.pendingAmount, 500);
  assert.equal(workspace.canReview, false);
  assert.equal(workspace.circle, undefined);
  assert.equal(workspace.receipts[0].imageStoragePath, undefined);
  const route = await loadTypescriptModule(
    "app/api/circles/[circleId]/receipts/route.ts",
    {
      "@/server/public-errors": {},
      "node:crypto": {},
      "next/server": { NextResponse: Response },
      "@/server/auth": { readSession: async () => ({ uid: "self" }) },
      "@/server/auth/request": {},
      "@/server/firebase/admin": {},
      "@/server/repositories/contributions": f.repo,
      "@/server/repositories/operational-events": {},
      "@/server/auth/security": {},
      "@/server/uploads/images": {},
    },
  );
  const response = await route.GET(new Request("https://example.test"), {
    params: Promise.resolve({ circleId: "circle" }),
  });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.circle, undefined);
  assert.equal(body.viewer.pendingAmount, 500);
  assert.doesNotMatch(
    JSON.stringify(body),
    /987654321|876543210|private-object|imageStoragePath/,
  );
});

test("server-only receipt review retains correct totals and immutable financial audit details", async () => {
  const f = await fixture({ targetAmount: 1000, contributedAmount: 700 });
  await f.repo.reviewContributionReceipt({
    circleId: "circle",
    receiptId: "receipt",
    reviewerId: "creator",
    decision: "approve",
  });
  assert.equal(f.mutations[0].operation, "ReviewReceiptWithAudit");
  assert.equal(f.mutations[0].variables.nextCircleContributedAmount, 1200);
  assert.equal(
    JSON.parse(f.mutations[0].variables.materialChanges).amount,
    500,
  );
  assert.equal(f.audit[0].type, "target_reached");
  assert.equal(f.audit[0].metadata.targetAmount, 1000);
  assert.equal(f.audit[0].metadata.contributedAmount, 1200);
});

test("private receipt image route still authorizes and reads its server-only storage path", async () => {
  const f = await fixture();
  const paths = [];
  const route = await loadTypescriptModule(
    "app/api/circles/[circleId]/receipts/[receiptId]/image/route.ts",
    {
      "next/server": { NextResponse: Response },
      "@/server/auth": { readSession: async () => ({ uid: "self" }) },
      "@/server/contributions/engine": rules,
      "@/server/repositories/contributions": f.repo,
      "@/server/uploads/private-access": {
        verifyPrivateFileAccess: () => true,
      },
      "@/server/firebase/admin": {
        getFirebaseAdminStorage: () => ({
          bucket: () => ({
            file: (path) => {
              paths.push(path);
              return { download: async () => [new Uint8Array([1, 2, 3])] };
            },
          }),
        }),
      },
    },
  );
  const response = await route.GET(
    new Request("https://example.test?access=synthetic"),
    { params: Promise.resolve({ circleId: "circle", receiptId: "receipt" }) },
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.deepEqual(paths, [f.receipt.imageStoragePath]);
});
