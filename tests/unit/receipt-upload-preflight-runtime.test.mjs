import assert from "node:assert/strict";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

const circleId = "12345678123442348234123456789abc";
const receiptId = "abcdef12abcd4abc8abc123456789abc";
const userId = "synthetic-member";
const active = {
  circle: { status: "active" },
  receipts: [
    { id: receiptId, uploaderId: userId, status: "rejected" },
    {
      id: "11111111111141118111111111111111",
      uploaderId: "other",
      status: "rejected",
    },
    {
      id: "22222222222242228222222222222222",
      uploaderId: userId,
      status: "confirmed",
    },
  ],
};

async function upload({
  workspace = active,
  amount = "100",
  note = "",
  replacementOfId = "",
  rejectAfterSave = false,
} = {}) {
  const counts = {
    preflights: 0,
    parsed: 0,
    decoded: 0,
    saves: 0,
    deletes: 0,
    submissions: 0,
  };
  const submitted = [];
  class RequestValidationError extends Error {}
  const route = await loadTypescriptModule(
    "app/api/circles/[circleId]/receipts/route.ts",
    {
      "@/server/public-errors": {
        RequestValidationError,
        isPublicError: (error) => error instanceof RequestValidationError,
      },
      "node:crypto": {
        randomUUID: () => "33333333-3333-4333-8333-333333333333",
      },
      "next/server": { NextResponse: Response },
      "@/server/auth": { readSession: async () => ({ uid: userId }) },
      "@/server/auth/request": {
        assertTrustedMutation: async () => {},
        clientKey: () => "synthetic-ip",
      },
      "@/server/auth/security": { enforceRateLimit: async () => true },
      "@/server/firebase/admin": {
        getFirebaseAdminStorage: () => ({
          bucket: () => ({
            file: () => ({
              save: async () => {
                counts.saves++;
              },
              delete: async () => {
                counts.deletes++;
              },
            }),
          }),
        }),
      },
      "@/server/repositories/contributions": {
        loadContributionWorkspace: async () => workspace,
        loadPrivateContributionWorkspace: async () => {
          counts.preflights++;
          return workspace;
        },
        submitContributionReceipt: async (input) => {
          counts.submissions++;
          submitted.push(input);
          if (rejectAfterSave)
            throw new Error("Membership changed after upload.");
          return { receiptStatus: "awaiting_confirmation" };
        },
      },
      "@/server/repositories/operational-events": {
        recordUploadOutcome: async () => {},
      },
      "@/server/uploads/images": {
        sanitizeUploadedImage: async () => {
          counts.decoded++;
          return {
            bytes: Buffer.from("synthetic-image"),
            extension: "jpg",
            contentType: "image/jpeg",
          };
        },
      },
    },
    { File },
  );
  const form = new FormData();
  form.set(
    "receiptImage",
    new File(["synthetic-image"], "receipt.jpg", { type: "image/jpeg" }),
  );
  form.set("amount", amount);
  form.set("note", note);
  if (replacementOfId) form.set("replacementOfId", replacementOfId);
  const request = new Request(
    "https://example.test/api/circles/" + circleId + "/receipts",
    { method: "POST", body: form },
  );
  const parse = request.formData.bind(request);
  request.formData = () => {
    counts.parsed++;
    return parse();
  };
  const response = await route.POST(request, {
    params: Promise.resolve({ circleId }),
  });
  return { counts, submitted, response, body: await response.json() };
}

for (const scenario of [
  { name: "non-member", workspace: null, status: 404 },
  {
    name: "closed circle",
    workspace: { ...active, circle: { status: "completed" } },
    status: 409,
  },
]) {
  test(
    "receipt preflight rejects " +
      scenario.name +
      " before reading or storing an image",
    async () => {
      const result = await upload({
        workspace: scenario.workspace,
        rejectAfterSave: true,
      });
      assert.equal(result.response.status, scenario.status);
      assert.equal(result.counts.preflights, 1);
      assert.equal(result.counts.parsed, 0);
      assert.equal(result.counts.decoded, 0);
      assert.equal(result.counts.saves, 0);
      assert.equal(result.counts.deletes, 0);
      assert.equal(result.counts.submissions, 0);
    },
  );
}

for (const scenario of [
  { name: "zero amount", amount: "0" },
  { name: "fractional amount", amount: "1.5" },
  { name: "long note", note: "x".repeat(501) },
  { name: "another member's receipt", replacementOfId: active.receipts[1].id },
  { name: "confirmed receipt", replacementOfId: active.receipts[2].id },
]) {
  test(
    "receipt input rejects " + scenario.name + " before decode or storage",
    async () => {
      const result = await upload({ ...scenario, rejectAfterSave: true });
      assert.equal(result.response.status, 400);
      assert.equal(result.counts.decoded, 0);
      assert.equal(result.counts.saves, 0);
      assert.equal(result.counts.deletes, 0);
      assert.equal(result.counts.submissions, 0);
    },
  );
}

test("joined active member retains a valid upload and own rejected replacement", async () => {
  const result = await upload({ replacementOfId: receiptId });
  assert.equal(result.response.status, 201);
  assert.equal(result.counts.preflights, 1);
  assert.equal(result.counts.saves, 1);
  assert.equal(result.counts.submissions, 1);
  assert.equal(result.counts.deletes, 0);
  assert.equal(result.submitted[0].replacementOfId, receiptId);
  assert.equal(result.body.receiptStatus, "awaiting_confirmation");
});

test("post-upload membership race still rejects and cleans up the saved file", async () => {
  const result = await upload({ rejectAfterSave: true });
  assert.equal(result.response.status, 400);
  assert.equal(result.counts.preflights, 1);
  assert.equal(result.counts.saves, 1);
  assert.equal(result.counts.submissions, 1);
  assert.equal(result.counts.deletes, 1);
});
