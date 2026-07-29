import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  CRITICAL_EMAIL_TYPES,
  DEFAULT_NOTIFICATION_PREFERENCES,
  NOTIFICATION_TYPES,
  REMINDER_COOLDOWN_MS,
  assertReminderRecipients,
  isNotificationAllowed,
  maskEmail,
  notificationCopy,
  safeDeepLink,
  shouldSendEmail,
} from "../../server/notifications/rules.ts";

test("Milestone 12 supports every prescribed in-app notification event", () => {
  assert.deepEqual(NOTIFICATION_TYPES, [
    "invitation_received",
    "invitation_accepted",
    "announcement_posted",
    "comment_reply",
    "contribution_reminder",
    "receipt_submitted",
    "receipt_confirmed",
    "receipt_rejected",
    "target_reached",
    "deadline_approaching",
    "delivery_updated",
    "circle_completed",
    "circle_cancelled",
  ]);
});

test("critical email delivery respects the user's master email preference", () => {
  for (const type of [
    "invitation_received",
    "receipt_rejected",
    "deadline_approaching",
    "circle_completed",
  ]) {
    assert.equal(CRITICAL_EMAIL_TYPES.has(type), true);
    assert.equal(shouldSendEmail(type, DEFAULT_NOTIFICATION_PREFERENCES), true);
    assert.equal(
      shouldSendEmail(type, {
        ...DEFAULT_NOTIFICATION_PREFERENCES,
        emailNotifications: false,
      }),
      false,
    );
  }
  assert.equal(
    shouldSendEmail(
      "announcement_posted",
      DEFAULT_NOTIFICATION_PREFERENCES,
      true,
    ),
    true,
  );
  assert.equal(
    shouldSendEmail("announcement_posted", DEFAULT_NOTIFICATION_PREFERENCES),
    false,
  );
});

test("category preferences suppress comments, reminders, and circle updates", () => {
  assert.equal(
    isNotificationAllowed("comment_reply", {
      ...DEFAULT_NOTIFICATION_PREFERENCES,
      commentNotifications: false,
    }),
    false,
  );
  assert.equal(
    isNotificationAllowed("contribution_reminder", {
      ...DEFAULT_NOTIFICATION_PREFERENCES,
      contributionReminders: false,
    }),
    false,
  );
  assert.equal(
    isNotificationAllowed("delivery_updated", {
      ...DEFAULT_NOTIFICATION_PREFERENCES,
      circleUpdateNotifications: false,
    }),
    false,
  );
  assert.equal(
    isNotificationAllowed(
      "receipt_confirmed",
      DEFAULT_NOTIFICATION_PREFERENCES,
    ),
    true,
  );
});

test("notification previews and links do not expose unsafe data", () => {
  const copy = notificationCopy("receipt_rejected", "Ada's Birthday");
  assert.match(copy.body, /securely for details/i);
  assert.doesNotMatch(copy.body, /amount|bank|account|reason|image/i);
  assert.equal(
    safeDeepLink("/account/circles/circle-1"),
    "/account/circles/circle-1",
  );
  assert.equal(safeDeepLink("https://attacker.example"), "/account");
  assert.equal(safeDeepLink("//attacker.example"), "/account");
  assert.equal(maskEmail("bukassi@example.com"), "bu***@example.com");
});

test("reminder protection enforces recipient limits and a 24-hour cooldown", () => {
  assert.equal(REMINDER_COOLDOWN_MS, 86_400_000);
  assert.deepEqual(assertReminderRecipients(["a", "a", " b "]), ["a", "b"]);
  assert.throws(() => assertReminderRecipients([]), /between 1 and 100/i);
  assert.throws(
    () =>
      assertReminderRecipients(Array.from({ length: 101 }, (_, i) => `${i}`)),
    /between 1 and 100/i,
  );
});

test("notification persistence, protected APIs, deep links, preferences and email logs are wired", async () => {
  const schema = await readFile("dataconnect/schema/schema.gql", "utf8");
  const operations = await readFile(
    "dataconnect/bondcircle/queries.gql",
    "utf8",
  );
  const repository = await readFile(
    "server/repositories/notifications.ts",
    "utf8",
  );
  const center = await readFile(
    "components/notifications/NotificationCenter.tsx",
    "utf8",
  );
  const notificationRoute = await readFile(
    "app/api/notifications/[notificationId]/route.ts",
    "utf8",
  );
  const preferencesRoute = await readFile(
    "app/api/notifications/preferences/route.ts",
    "utf8",
  );
  const cronRoute = await readFile(
    "app/api/jobs/notifications/deadlines/route.ts",
    "utf8",
  );

  for (const model of ["type Notification", "type EmailDelivery"]) {
    assert.match(schema, new RegExp(model));
  }
  for (const operation of [
    "GetUserNotifications",
    "CreateNotification",
    "MarkNotificationRead",
    "DismissNotification",
    "MarkAllNotificationsRead",
    "UpdateNotificationPreferences",
    "SetCircleNotificationMute",
    "CreateEmailDelivery",
  ]) {
    assert.match(operations, new RegExp(operation));
  }
  assert.match(repository, /notification_email_failed/);
  assert.match(repository, /notificationsMuted/);
  assert.match(repository, /GetRecentReminderNotifications/);
  assert.match(center, /Today/);
  assert.match(center, /Yesterday/);
  assert.match(center, /Earlier/);
  assert.match(center, /Mark all read/);
  assert.match(center, /Notification previews never include private/);
  for (const route of [notificationRoute, preferencesRoute]) {
    assert.match(route, /readSession/);
    assert.match(route, /assertTrustedMutation/);
  }
  assert.match(cronRoute, /CRON_SECRET/);
  assert.match(cronRoute, /timingSafeEqual/);
});
