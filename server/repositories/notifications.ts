import "server-only";

import { randomUUID } from "node:crypto";
import type {
  NotificationWorkspace,
  UserNotification,
} from "@/features/notifications";
import { logger } from "@/lib/logger";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import { sendCriticalNotificationEmail } from "@/server/notifications/email";
import {
  DEFAULT_NOTIFICATION_PREFERENCES,
  REMINDER_COOLDOWN_MS,
  isNotificationAllowed,
  maskEmail,
  notificationCopy,
  safeDeepLink,
  shouldSendEmail,
  type NotificationPreferences,
  type NotificationType,
} from "@/server/notifications/rules";

type Recipient = {
  id: string;
  displayName: string;
  email?: string | null;
  emailNotifications: boolean;
  commentNotifications: boolean;
  contributionReminders: boolean;
  circleUpdateNotifications: boolean;
};

type NotificationContext = {
  circle?: {
    id: string;
    name: string;
    type: string;
    status: string;
    deadline?: string | null;
    creator: Recipient;
  };
  circleMemberships: Array<{
    role: string;
    notificationsMuted: boolean;
    expectedAmount: number;
    confirmedAmount: number;
    user: Recipient;
  }>;
};

function preferencesFor(
  recipient: Recipient,
  overrides: Partial<NotificationPreferences> = {},
): NotificationPreferences {
  return {
    ...DEFAULT_NOTIFICATION_PREFERENCES,
    emailNotifications: recipient.emailNotifications,
    commentNotifications: recipient.commentNotifications,
    contributionReminders: recipient.contributionReminders,
    circleUpdateNotifications: recipient.circleUpdateNotifications,
    ...overrides,
  };
}

async function contextFor(circleId: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    NotificationContext,
    { circleId: string }
  >("GetNotificationContext", { circleId });
  if (!response.data.circle) throw new Error("Circle not found.");
  return {
    circle: response.data.circle,
    memberships: response.data.circleMemberships,
  };
}

async function recordEmailDelivery(input: {
  notificationId: string | null;
  recipientId: string | null;
  eventType: NotificationType;
  email: string;
  status: "sent" | "failed";
  providerMessageId?: string | null;
  failureReason?: string | null;
}) {
  const createdAt = new Date().toISOString();
  await getBondCircleDataConnect().executeMutation("CreateEmailDelivery", {
    deliveryId: randomUUID(),
    notificationId: input.notificationId,
    recipientId: input.recipientId,
    eventType: input.eventType,
    destinationMasked: maskEmail(input.email),
    status: input.status,
    providerMessageId: input.providerMessageId ?? null,
    failureReason: input.failureReason?.slice(0, 500) ?? null,
    createdAt,
  });
}

async function sendAndLogEmail(input: {
  notificationId: string | null;
  recipientId: string | null;
  email: string;
  type: NotificationType;
  title: string;
  body: string;
  deepLink: string;
  dedupeKey: string;
}) {
  try {
    const delivery = await sendCriticalNotificationEmail({
      to: input.email,
      type: input.type,
      title: input.title,
      body: input.body,
      deepLink: input.deepLink,
      idempotencyKey: input.dedupeKey,
    });
    await recordEmailDelivery({
      ...input,
      eventType: input.type,
      status: "sent",
      providerMessageId: delivery.messageId,
    });
  } catch (error) {
    const failureReason =
      error instanceof Error ? error.message : "Unknown email delivery error";
    logger.error("notification_email_failed", {
      type: input.type,
      recipientId: input.recipientId,
      failureReason,
    });
    await recordEmailDelivery({
      ...input,
      eventType: input.type,
      status: "failed",
      failureReason,
    }).catch((loggingError) => {
      logger.error("notification_delivery_log_failed", {
        type: input.type,
        error: loggingError instanceof Error ? loggingError.message : "unknown",
      });
    });
  }
}

async function createForRecipient(input: {
  recipient: Recipient;
  circleId: string | null;
  circleName: string;
  type: NotificationType;
  deepLink: string;
  dedupeKey: string;
  muted?: boolean;
  important?: boolean;
}) {
  const preferences = preferencesFor(input.recipient);
  if (input.muted || !isNotificationAllowed(input.type, preferences)) {
    return null;
  }
  const existing = await getBondCircleDataConnect().executeQuery<
    { notifications: Array<{ id: string }> },
    { recipientId: string; dedupeKey: string }
  >("GetNotificationDedupe", {
    recipientId: input.recipient.id,
    dedupeKey: input.dedupeKey,
  });
  if (existing.data.notifications.length) {
    return existing.data.notifications[0].id;
  }

  const copy = notificationCopy(input.type, input.circleName);
  const notificationId = randomUUID();
  const deepLink = safeDeepLink(input.deepLink);
  try {
    await getBondCircleDataConnect().executeMutation("CreateNotification", {
      notificationId,
      recipientId: input.recipient.id,
      circleId: input.circleId,
      type: input.type,
      title: copy.title,
      body: copy.body,
      deepLink,
      dedupeKey: input.dedupeKey,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    const duplicate = await getBondCircleDataConnect().executeQuery<
      { notifications: Array<{ id: string }> },
      { recipientId: string; dedupeKey: string }
    >("GetNotificationDedupe", {
      recipientId: input.recipient.id,
      dedupeKey: input.dedupeKey,
    });
    if (duplicate.data.notifications[0]) {
      return duplicate.data.notifications[0].id;
    }
    throw error;
  }

  if (
    input.recipient.email &&
    shouldSendEmail(input.type, preferences, input.important)
  ) {
    await sendAndLogEmail({
      notificationId,
      recipientId: input.recipient.id,
      email: input.recipient.email,
      type: input.type,
      title: copy.title,
      body: copy.body,
      deepLink,
      dedupeKey: input.dedupeKey,
    });
  }
  return notificationId;
}

export async function emitCircleNotification(input: {
  circleId: string;
  type: Exclude<NotificationType, "invitation_received">;
  entityId: string;
  actorId?: string | null;
  recipientIds?: string[];
  important?: boolean;
}) {
  const { circle, memberships } = await contextFor(input.circleId);
  let recipients = memberships;
  if (input.recipientIds) {
    const selected = new Set(input.recipientIds);
    recipients = recipients.filter(({ user }) => selected.has(user.id));
  } else if (input.type === "invitation_accepted") {
    recipients = recipients.filter(({ user }) => user.id === circle.creator.id);
  } else if (input.type === "receipt_submitted") {
    recipients = recipients.filter(({ role }) =>
      ["creator", "co_admin"].includes(role),
    );
  }
  recipients = recipients.filter(({ user }) => user.id !== input.actorId);

  const deepLink = `/account/circles/${circle.id}`;
  await Promise.all(
    recipients.map(({ user, notificationsMuted }) =>
      createForRecipient({
        recipient: user,
        circleId: circle.id,
        circleName: circle.name,
        type: input.type,
        deepLink,
        dedupeKey: `${input.type}:${input.entityId}:${user.id}`,
        muted: notificationsMuted,
        important: input.important,
      }),
    ),
  );
}

export async function emitNewInvitation(input: {
  circleId: string;
  recipientEmail: string;
  invitationId: string;
  deepLink: string;
  message?: string;
}) {
  const email = input.recipientEmail.trim().toLowerCase();
  const { circle } = await contextFor(input.circleId);
  const response = await getBondCircleDataConnect().executeQuery<
    { users: Recipient[] },
    { email: string }
  >("FindNotificationRecipientByEmail", { email });
  const recipient = response.data.users[0];
  const copy = notificationCopy("invitation_received", circle.name);
  const dedupeKey = `invitation_received:${input.invitationId}`;
  if (recipient) {
    await createForRecipient({
      recipient,
      circleId: circle.id,
      circleName: circle.name,
      type: "invitation_received",
      deepLink: input.deepLink,
      dedupeKey,
    });
    return;
  }
  await sendAndLogEmail({
    notificationId: null,
    recipientId: null,
    email,
    type: "invitation_received",
    title: copy.title,
    body: input.message ?? copy.body,
    deepLink: safeDeepLink(input.deepLink),
    dedupeKey,
  });
}

type NotificationsQuery = {
  user?: NotificationPreferences & { id: string };
  notifications: Array<{
    id: string;
    type: string;
    title: string;
    body: string;
    deepLink: string;
    readAt?: string | null;
    createdAt: string;
    circle?: { id: string; name: string; type: string } | null;
  }>;
  circleMemberships: Array<{
    notificationsMuted: boolean;
    membershipStatus: string;
    circle: { id: string; name: string; type: string };
  }>;
};

export async function loadNotificationWorkspace(
  userId: string,
): Promise<NotificationWorkspace> {
  await processUserDeadlineNotifications(userId);
  const response = await getBondCircleDataConnect().executeQuery<
    NotificationsQuery,
    { userId: string }
  >("GetUserNotifications", { userId });
  const preferences = response.data.user
    ? {
        emailNotifications: response.data.user.emailNotifications,
        browserPushNotifications: response.data.user.browserPushNotifications,
        commentNotifications: response.data.user.commentNotifications,
        contributionReminders: response.data.user.contributionReminders,
        circleUpdateNotifications: response.data.user.circleUpdateNotifications,
        marketingCommunication: response.data.user.marketingCommunication,
      }
    : DEFAULT_NOTIFICATION_PREFERENCES;
  const notifications = response.data.notifications.map(
    (notification): UserNotification => ({
      id: notification.id,
      type: notification.type as NotificationType,
      title: notification.title,
      body: notification.body,
      deepLink: safeDeepLink(notification.deepLink),
      readAt: notification.readAt ?? null,
      createdAt: notification.createdAt,
      circleId: notification.circle?.id ?? null,
      circleName: notification.circle?.name ?? null,
      circleType: notification.circle?.type ?? null,
    }),
  );
  return {
    notifications,
    preferences,
    unreadCount: notifications.filter((notification) => !notification.readAt)
      .length,
    mutedCircles: response.data.circleMemberships
      .filter((membership) => membership.membershipStatus === "joined")
      .map((membership) => ({
        id: membership.circle.id,
        name: membership.circle.name,
        type: membership.circle.type,
        muted: membership.notificationsMuted,
      })),
  };
}

async function processUserDeadlineNotifications(userId: string) {
  try {
    const today = new Date();
    const from = today.toISOString().slice(0, 10);
    const toDate = new Date(today);
    toDate.setUTCDate(toDate.getUTCDate() + 3);
    const to = toDate.toISOString().slice(0, 10);
    const response = await getBondCircleDataConnect().executeQuery<
      {
        circleMemberships: Array<{
          circle: {
            id: string;
            status: string;
            deadline?: string | null;
          };
        }>;
      },
      { userId: string }
    >("GetUserDeadlineNotificationCandidates", { userId });
    const openStates = new Set([
      "published",
      "active",
      "target_reached",
      "fulfilment",
    ]);
    for (const { circle } of response.data.circleMemberships) {
      if (
        circle.deadline &&
        circle.deadline >= from &&
        circle.deadline <= to &&
        openStates.has(circle.status)
      ) {
        await safelyEmitNotification({
          circleId: circle.id,
          type: "deadline_approaching",
          entityId: circle.deadline,
          recipientIds: [userId],
        });
      }
    }
  } catch (error) {
    logger.error("user_deadline_notification_failed", {
      userId,
      error: error instanceof Error ? error.message : "unknown",
    });
  }
}

export async function markNotificationRead(
  notificationId: string,
  userId: string,
) {
  await getBondCircleDataConnect().executeMutation("MarkNotificationRead", {
    notificationId,
    recipientId: userId,
    readAt: new Date().toISOString(),
  });
}

export async function dismissNotification(
  notificationId: string,
  userId: string,
) {
  const dismissedAt = new Date().toISOString();
  await getBondCircleDataConnect().executeMutation("DismissNotification", {
    notificationId,
    recipientId: userId,
    dismissedAt,
  });
}

export async function markAllNotificationsRead(userId: string) {
  await getBondCircleDataConnect().executeMutation("MarkAllNotificationsRead", {
    recipientId: userId,
    readAt: new Date().toISOString(),
  });
}

export async function updateNotificationPreferences(
  userId: string,
  preferences: NotificationPreferences,
) {
  await getBondCircleDataConnect().executeMutation(
    "UpdateNotificationPreferences",
    { userId, ...preferences },
  );
}

export async function setCircleNotificationMute(
  circleId: string,
  userId: string,
  notificationsMuted: boolean,
) {
  const { memberships } = await contextFor(circleId);
  if (!memberships.some(({ user }) => user.id === userId)) {
    throw new Error("You are not a member of this circle.");
  }
  await getBondCircleDataConnect().executeMutation(
    "SetCircleNotificationMute",
    { circleId, userId, notificationsMuted },
  );
}

export async function sendContributionReminders(input: {
  circleId: string;
  actorId: string;
  recipientIds: string[];
}) {
  const { circle, memberships } = await contextFor(input.circleId);
  const actor = memberships.find(({ user }) => user.id === input.actorId);
  if (!actor || !["creator", "co_admin"].includes(actor.role)) {
    throw new Error("Only the creator or a co-admin can send reminders.");
  }
  if (!["published", "active"].includes(circle.status)) {
    throw new Error("Reminders are closed for this circle.");
  }
  const selected = memberships.filter(
    ({ user, expectedAmount, confirmedAmount }) =>
      input.recipientIds.includes(user.id) &&
      user.id !== input.actorId &&
      confirmedAmount < expectedAmount,
  );
  if (selected.length !== new Set(input.recipientIds).size) {
    throw new Error("Select joined members who still have a contribution due.");
  }
  const since = new Date(Date.now() - REMINDER_COOLDOWN_MS).toISOString();
  for (const membership of selected) {
    const recent = await getBondCircleDataConnect().executeQuery<
      { notifications: Array<{ id: string }> },
      { circleId: string; recipientId: string; since: string }
    >("GetRecentReminderNotifications", {
      circleId: circle.id,
      recipientId: membership.user.id,
      since,
    });
    if (recent.data.notifications.length) {
      throw new Error(
        `${membership.user.displayName} was reminded within the last 24 hours.`,
      );
    }
  }
  const batchId = randomUUID();
  await emitCircleNotification({
    circleId: circle.id,
    type: "contribution_reminder",
    entityId: batchId,
    actorId: input.actorId,
    recipientIds: input.recipientIds,
  });
  await getBondCircleDataConnect().executeMutation("RecordSystemActivity", {
    activityId: randomUUID(),
    circleId: circle.id,
    actorId: input.actorId,
    eventType: "reminder_sent",
    entityId: batchId,
    metadata: JSON.stringify({ recipientCount: selected.length }),
    createdAt: new Date().toISOString(),
  });
  return { sent: selected.length };
}

export async function processDeadlineNotifications(today = new Date()) {
  const from = today.toISOString().slice(0, 10);
  const toDate = new Date(today);
  toDate.setUTCDate(toDate.getUTCDate() + 3);
  const to = toDate.toISOString().slice(0, 10);
  const response = await getBondCircleDataConnect().executeQuery<
    {
      circles: Array<{
        id: string;
        name: string;
        type: string;
        deadline?: string | null;
      }>;
    },
    { from: string; to: string }
  >("GetDeadlineNotificationCandidates", { from, to });
  for (const circle of response.data.circles) {
    await emitCircleNotification({
      circleId: circle.id,
      type: "deadline_approaching",
      entityId: circle.deadline ?? to,
    });
  }
  return { processed: response.data.circles.length };
}

export async function safelyEmitNotification(
  input: Parameters<typeof emitCircleNotification>[0],
) {
  try {
    await emitCircleNotification(input);
  } catch (error) {
    logger.error("notification_emit_failed", {
      circleId: input.circleId,
      type: input.type,
      error: error instanceof Error ? error.message : "unknown",
    });
  }
}
