import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  activityFilterFor,
  assertCommentRateLimit,
  assertCommentsOpen,
  assertCommunicationManager,
  assertCommunicationWritable,
  canManageCommunication,
  validateAnnouncement,
  validateComment,
} from "../../server/communication/rules.ts";

test("official announcement permissions are limited to circle managers", () => {
  assert.equal(canManageCommunication("creator"), true);
  assert.equal(canManageCommunication("co_admin"), true);
  assert.equal(canManageCommunication("member"), false);
  assert.doesNotThrow(() => assertCommunicationManager("creator"));
  assert.throws(
    () => assertCommunicationManager("member"),
    /creator|co-admin/i,
  );
});

test("completed and archived circles keep communication read-only", () => {
  assert.doesNotThrow(() => assertCommunicationWritable("active"));
  for (const status of ["completed", "cancelled", "archived", "purged"]) {
    assert.throws(() => assertCommunicationWritable(status), /read-only/i);
  }
});

test("plain-text announcements and comments enforce production limits", () => {
  assert.deepEqual(
    validateAnnouncement({
      title: "  Delivery update  ",
      body: "Fabric collection starts Friday.\r\nBring your receipt.",
    }),
    {
      title: "Delivery update",
      body: "Fabric collection starts Friday.\nBring your receipt.",
    },
  );
  assert.equal(validateComment("  Thank you!  "), "Thank you!");
  assert.throws(() => validateAnnouncement({ title: "No", body: "Body" }));
  assert.throws(() => validateComment(" ".repeat(10)));
  assert.throws(() => validateComment("x".repeat(1_001)));
});

test("circle and announcement comment switches are both enforced", () => {
  assert.doesNotThrow(() => assertCommentsOpen(true, true));
  assert.throws(() => assertCommentsOpen(false, true), /closed/i);
  assert.throws(() => assertCommentsOpen(true, false), /closed/i);
});

test("comment throttling prevents bursts and sustained spam", () => {
  const now = Date.parse("2026-07-29T12:00:00.000Z");
  assert.doesNotThrow(() =>
    assertCommentRateLimit(["2026-07-29T11:59:55.000Z"], now),
  );
  assert.throws(
    () => assertCommentRateLimit(["2026-07-29T11:59:59.000Z"], now),
    /quickly/i,
  );
  assert.throws(
    () =>
      assertCommentRateLimit(
        [
          "2026-07-29T11:59:50.000Z",
          "2026-07-29T11:59:40.000Z",
          "2026-07-29T11:59:30.000Z",
          "2026-07-29T11:59:20.000Z",
          "2026-07-29T11:59:10.000Z",
        ],
        now,
      ),
    /quickly/i,
  );
});

test("activity filters are derived from immutable system event types", () => {
  assert.equal(activityFilterFor("receipt_confirmed"), "payments");
  assert.equal(activityFilterFor("comment_posted"), "comments");
  assert.equal(activityFilterFor("reminder_sent"), "reminders");
  assert.equal(activityFilterFor("member_joined"), "all");
});

test("Milestone 11 persistence, APIs, moderation and activity surfaces are wired", async () => {
  const schema = await readFile("dataconnect/schema/schema.gql", "utf8");
  const operations = await readFile(
    "dataconnect/bondcircle/queries.gql",
    "utf8",
  );
  const repository = await readFile(
    "server/repositories/communication.ts",
    "utf8",
  );
  const interfaceSource = await readFile(
    "components/communication/CircleCommunication.tsx",
    "utf8",
  );
  const activityPage = await readFile("app/account/[section]/page.tsx", "utf8");

  for (const model of [
    "type Announcement @table",
    "type Comment @table",
    "type CommentReport @table",
    "type ActivityLog @table",
  ]) {
    assert.match(schema, new RegExp(model));
  }
  assert.match(
    operations,
    /mutation CreateAnnouncementWithActivity[\s\S]*@transaction/,
  );
  assert.match(
    operations,
    /mutation ModerateCommentWithAudit[\s\S]*@transaction/,
  );
  assert.match(repository, /assertCommentRateLimit/);
  assert.match(repository, /assertCommunicationManager/);
  assert.match(interfaceSource, /Announcements/);
  assert.match(interfaceSource, /Comments/);
  assert.match(interfaceSource, /Activity/);
  assert.match(interfaceSource, /Report/);
  assert.match(activityPage, /loadUserActivity/);
  assert.doesNotMatch(operations, /activityLog_(?:update|delete)/);
});
