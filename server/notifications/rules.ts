export const NOTIFICATION_TYPES = [
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
  "circle_trial_activated",
  "circle_activation_pending",
  "circle_activation_succeeded",
  "circle_activation_failed",
  "circle_upgraded",
  "circle_limit_approaching",
  "circle_limit_reached",
  "circle_tier_limit_reached",
] as const;

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];

export type NotificationPreferences = {
  emailNotifications: boolean;
  browserPushNotifications: boolean;
  commentNotifications: boolean;
  contributionReminders: boolean;
  circleUpdateNotifications: boolean;
  marketingCommunication: boolean;
};

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  emailNotifications: true,
  browserPushNotifications: false,
  commentNotifications: true,
  contributionReminders: true,
  circleUpdateNotifications: true,
  marketingCommunication: false,
};

export const CRITICAL_EMAIL_TYPES = new Set<NotificationType>([
  "invitation_received",
  "receipt_rejected",
  "deadline_approaching",
  "circle_completed",
  "circle_activation_failed",
]);

export const REMINDER_COOLDOWN_MS = 24 * 60 * 60 * 1000;

export function isNotificationAllowed(
  type: NotificationType,
  preferences: NotificationPreferences,
) {
  if (type === "comment_reply") return preferences.commentNotifications;
  if (type === "contribution_reminder") {
    return preferences.contributionReminders;
  }
  if (
    [
      "announcement_posted",
      "target_reached",
      "deadline_approaching",
      "delivery_updated",
      "circle_completed",
      "circle_cancelled",
      "circle_trial_activated",
      "circle_activation_pending",
      "circle_activation_succeeded",
      "circle_activation_failed",
      "circle_upgraded",
      "circle_limit_approaching",
      "circle_limit_reached",
      "circle_tier_limit_reached",
    ].includes(type)
  ) {
    return preferences.circleUpdateNotifications;
  }
  return true;
}

export function shouldSendEmail(
  type: NotificationType,
  preferences: NotificationPreferences,
  important = false,
) {
  return (
    preferences.emailNotifications &&
    (CRITICAL_EMAIL_TYPES.has(type) ||
      (type === "announcement_posted" && important))
  );
}

export function safeDeepLink(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return "/account";
  return path;
}

export function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "hidden";
  return `${local.slice(0, 2)}***@${domain}`;
}

export function notificationCopy(type: NotificationType, circleName: string) {
  const copies: Record<NotificationType, { title: string; body: string }> = {
    invitation_received: {
      title: "New circle invitation",
      body: `You have been invited to ${circleName}.`,
    },
    invitation_accepted: {
      title: "Invitation accepted",
      body: `A new member joined ${circleName}.`,
    },
    announcement_posted: {
      title: "New announcement",
      body: `${circleName} has an official update.`,
    },
    comment_reply: {
      title: "New reply",
      body: `Someone replied to your comment in ${circleName}.`,
    },
    contribution_reminder: {
      title: "Contribution reminder",
      body: `There is a contribution reminder for ${circleName}.`,
    },
    receipt_submitted: {
      title: "Receipt awaiting review",
      body: `A member submitted payment proof in ${circleName}.`,
    },
    receipt_confirmed: {
      title: "Receipt confirmed",
      body: `Your payment proof in ${circleName} was confirmed.`,
    },
    receipt_rejected: {
      title: "Receipt needs attention",
      body: `Your payment proof in ${circleName} needs your attention. Open the circle securely for details.`,
    },
    target_reached: {
      title: "Target reached",
      body: `${circleName} reached its contribution target.`,
    },
    deadline_approaching: {
      title: "Deadline approaching",
      body: `${circleName} has an approaching deadline.`,
    },
    delivery_updated: {
      title: "Delivery updated",
      body: `Your delivery status changed in ${circleName}.`,
    },
    circle_completed: {
      title: "Circle completed",
      body: `${circleName} has been completed.`,
    },
    circle_cancelled: {
      title: "Circle cancelled",
      body: `${circleName} has been cancelled.`,
    },
    circle_trial_activated: {
      title: "Trial circle activated",
      body: `${circleName} is using this account's one-time trial.`,
    },
    circle_activation_pending: {
      title: "Activation payment pending",
      body: `The activation payment for ${circleName} is still pending.`,
    },
    circle_activation_succeeded: {
      title: "Circle activated",
      body: `${circleName} has been activated and published.`,
    },
    circle_activation_failed: {
      title: "Activation payment failed",
      body: `${circleName} was not charged or published. Open the draft to try again.`,
    },
    circle_upgraded: {
      title: "Circle plan upgraded",
      body: `${circleName} now has its upgraded limits and features.`,
    },
    circle_limit_approaching: {
      title: "Circle limit approaching",
      body: `${circleName} is close to its current plan limit.`,
    },
    circle_limit_reached: {
      title: "Circle limit reached",
      body: `${circleName} has reached its current member limit.`,
    },
    circle_tier_limit_reached: {
      title: "Aso-Ebi tier limit reached",
      body: `${circleName} has reached its current Aso-Ebi tier limit.`,
    },
  };
  return copies[type];
}

export function assertReminderRecipients(ids: unknown) {
  if (!Array.isArray(ids) || ids.length < 1 || ids.length > 100) {
    throw new Error("Select between 1 and 100 circle members.");
  }
  const normalized = [
    ...new Set(
      ids
        .filter((id): id is string => typeof id === "string")
        .map((id) => id.trim())
        .filter(Boolean),
    ),
  ];
  if (!normalized.length) throw new Error("Select at least one member.");
  return normalized;
}
