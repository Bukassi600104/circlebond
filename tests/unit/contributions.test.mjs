import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  contributionSummary,
  receiptSubmissionStatus,
  reviewOutcome,
  canReviewReceipts,
  canViewReceipt,
} from "../../server/contributions/engine.ts";

test("partial approved receipts accumulate without exceeding the expected amount", () => {
  assert.deepEqual(contributionSummary(100_000, 35_000, 15_000), {
    expectedAmount: 100_000,
    confirmedAmount: 35_000,
    pendingAmount: 15_000,
    remainingAmount: 50_000,
    overpaymentAmount: 0,
    status: "awaiting_confirmation",
  });
  assert.deepEqual(reviewOutcome(100_000, 35_000, 25_000), {
    nextConfirmedAmount: 60_000,
    remainingAmount: 40_000,
    contributionStatus: "part_paid",
    overpaymentAmount: 0,
  });
});

test("a complete payment becomes paid and overpayments stay flagged for review", () => {
  assert.equal(
    reviewOutcome(100_000, 40_000, 60_000).contributionStatus,
    "paid",
  );
  assert.deepEqual(receiptSubmissionStatus(100_000, 90_000, 15_000), {
    status: "overpayment_review",
    overpaymentAmount: 5_000,
  });
  assert.deepEqual(reviewOutcome(100_000, 90_000, 15_000), {
    nextConfirmedAmount: 105_000,
    remainingAmount: 0,
    contributionStatus: "paid",
    overpaymentAmount: 5_000,
  });
});

test("only the uploader and authorised reviewers may view a receipt", () => {
  assert.equal(canViewReceipt("member-a", "member-a", "member"), true);
  assert.equal(canViewReceipt("member-a", "creator", "creator"), true);
  assert.equal(canViewReceipt("member-a", "admin", "co_admin"), true);
  assert.equal(canViewReceipt("member-a", "member-b", "member"), false);
  assert.equal(canReviewReceipts("creator"), true);
  assert.equal(canReviewReceipts("co_admin"), true);
  assert.equal(canReviewReceipts("member"), false);
});

test("milestone 10 schema and API preserve receipt privacy and audit requirements", async () => {
  const schema = await readFile("dataconnect/schema/schema.gql", "utf8");
  const operations = await readFile(
    "dataconnect/bondcircle/queries.gql",
    "utf8",
  );
  const uploadRoute = await readFile(
    "app/api/circles/[circleId]/receipts/route.ts",
    "utf8",
  );
  const reviewRoute = await readFile(
    "app/api/circles/[circleId]/receipts/[receiptId]/review/route.ts",
    "utf8",
  );
  const imageRoute = await readFile(
    "app/api/circles/[circleId]/receipts/[receiptId]/image/route.ts",
    "utf8",
  );

  assert.match(schema, /type Receipt @table/);
  assert.match(schema, /replacementOfId: UUID/);
  assert.match(
    operations,
    /mutation SubmitReceiptWithAudit[\s\S]*@transaction/,
  );
  assert.match(
    operations,
    /mutation ReviewReceiptWithAudit[\s\S]*@transaction/,
  );
  assert.match(uploadRoute, /session\.uid/);
  assert.doesNotMatch(uploadRoute, /uploadedById/);
  assert.match(reviewRoute, /rejection reason/i);
  assert.match(imageRoute, /canViewReceipt/);
});
