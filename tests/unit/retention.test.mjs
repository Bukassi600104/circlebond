import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  COMPLETION_TYPES,
  RETENTION_DAYS,
  assertCompletionType,
  assertPrivateStoragePath,
  isRetentionEligible,
  retentionDaysRemaining,
  retentionDueAt,
} from "../../server/retention/rules.ts";

test("Milestone 13 exposes only the prescribed completion outcomes", () => {
  assert.deepEqual(COMPLETION_TYPES, {
    gift: ["gift_purchased", "gift_delivered"],
    "aso-ebi": [
      "fabric_distributed",
      "fabric_collected",
      "deliveries_completed",
    ],
    support: ["support_delivered", "campaign_completed"],
  });
  assert.doesNotThrow(() => assertCompletionType("gift", "gift_delivered"));
  assert.throws(
    () => assertCompletionType("gift", "campaign_completed"),
    /valid completion outcome/i,
  );
});

test("completion starts an exact 30-day retention window", () => {
  const completedAt = new Date("2026-07-29T12:00:00.000Z");
  const dueAt = retentionDueAt(completedAt);
  assert.equal(RETENTION_DAYS, 30);
  assert.equal(dueAt, "2026-08-28T12:00:00.000Z");
  assert.equal(retentionDaysRemaining(dueAt, completedAt), 30);
  assert.equal(
    isRetentionEligible(
      "completed",
      dueAt,
      null,
      new Date("2026-08-28T12:00:00.000Z"),
    ),
    true,
  );
  assert.equal(
    isRetentionEligible(
      "active",
      dueAt,
      null,
      new Date("2026-08-29T12:00:00.000Z"),
    ),
    false,
  );
  assert.equal(
    isRetentionEligible(
      "archived",
      dueAt,
      "2026-08-28T12:00:01.000Z",
      new Date("2026-08-29T12:00:00.000Z"),
    ),
    false,
  );
});

test("retention deletion accepts only private circle storage paths", () => {
  assert.equal(
    assertPrivateStoragePath("receipts/circle-1/member/receipt.png"),
    "receipts/circle-1/member/receipt.png",
  );
  assert.equal(
    assertPrivateStoragePath("circles/circle-1/aso-ebi/fabric.jpg"),
    "circles/circle-1/aso-ebi/fabric.jpg",
  );
  for (const unsafe of [
    "profile-images/user-1/avatar.png",
    "../receipts/circle-1/file.png",
    "circles/circle-1/../../profile.png",
    "/receipts/circle-1/file.png",
  ]) {
    assert.throws(() => assertPrivateStoragePath(unsafe), /unsafe/i);
  }
});

test("completion, archive, read-only UI and retention countdown are connected", async () => {
  const lifecycle = await readFile("server/repositories/lifecycle.ts", "utf8");
  const route = await readFile(
    "app/api/circles/[circleId]/lifecycle/route.ts",
    "utf8",
  );
  const panel = await readFile(
    "components/lifecycle/CircleLifecyclePanel.tsx",
    "utf8",
  );
  const contributionWorkspace = await readFile(
    "components/contributions/ContributionWorkspace.tsx",
    "utf8",
  );
  const gift = await readFile(
    "components/gift-circles/GiftCircleView.tsx",
    "utf8",
  );
  const asoEbi = await readFile(
    "components/aso-ebi/AsoEbiCircleView.tsx",
    "utf8",
  );
  const support = await readFile(
    "components/support-circles/SupportCircleView.tsx",
    "utf8",
  );

  assert.match(lifecycle, /Only the circle creator can complete/);
  assert.match(lifecycle, /assertCompletionType/);
  assert.match(lifecycle, /Only the circle creator can archive/);
  assert.match(route, /readSession/);
  assert.match(route, /assertTrustedMutation/);
  assert.match(panel, /30-day retention countdown/);
  assert.match(panel, /Create new circle/);
  assert.match(panel, /Historical archive/);
  assert.match(contributionWorkspace, /readOnly/);
  for (const view of [gift, asoEbi, support]) {
    assert.match(view, /readOnly/);
    assert.match(view, /ContributionWorkspace/);
  }
});

test("purge persistence, shared-file protection, retries, alerts and cron are wired", async () => {
  const schema = await readFile("dataconnect/schema/schema.gql", "utf8");
  const operations = await readFile(
    "dataconnect/bondcircle/queries.gql",
    "utf8",
  );
  const repository = await readFile("server/repositories/retention.ts", "utf8");
  const cronRoute = await readFile("app/api/jobs/retention/route.ts", "utf8");
  const vercel = JSON.parse(await readFile("vercel.json", "utf8"));

  assert.match(schema, /retentionDueAt: Timestamp/);
  assert.match(schema, /type RetentionPurgeAttempt @table/);
  for (const operation of [
    "GetRetentionCandidates",
    "GetCircleRetentionPayload",
    "GetStoragePathReferences",
    "CreateRetentionPurgeAttempt",
    "CompleteRetentionPurgeAttempt",
    "PurgeCircleSensitiveData",
  ]) {
    assert.match(operations, new RegExp(operation));
  }
  for (const privateRecord of [
    "commentReport_deleteMany",
    "comment_deleteMany",
    "announcement_deleteMany",
    "supportUpdate_deleteMany",
    "receipt_deleteMany",
    "invitation_deleteMany",
    "notification_deleteMany",
    "circleMembership_deleteMany",
  ]) {
    assert.match(operations, new RegExp(privateRecord));
  }
  assert.match(repository, /isSharedStoragePath/);
  assert.match(repository, /ignoreNotFound: true/);
  assert.match(repository, /file\.exists\(\)/);
  assert.match(repository, /retention_purge_alert/);
  assert.match(repository, /RETENTION_RETRY_MS/);
  assert.doesNotMatch(repository, /profileImage/);
  assert.match(cronRoute, /CRON_SECRET/);
  assert.match(cronRoute, /timingSafeEqual/);
  assert.deepEqual(vercel.crons, [
    { path: "/api/jobs/retention", schedule: "0 3 * * *" },
  ]);
});
