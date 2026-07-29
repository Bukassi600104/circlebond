import type { CircleRole, CircleState } from "../circles/engine.ts";

export const COMMENT_RATE_LIMIT = {
  windowMs: 60_000,
  maximum: 5,
  minimumIntervalMs: 2_000,
} as const;

export const ACTIVITY_TYPES = [
  "circle_created",
  "member_invited",
  "member_joined",
  "tier_selected",
  "receipt_submitted",
  "receipt_confirmed",
  "receipt_rejected",
  "reminder_sent",
  "announcement_posted",
  "comment_posted",
  "delivery_updated",
  "target_reached",
  "circle_completed",
  "circle_cancelled",
] as const;

export type ActivityType = (typeof ACTIVITY_TYPES)[number];
export type ActivityFilter = "all" | "payments" | "comments" | "reminders";

const MANAGER_ROLES = new Set<CircleRole>(["creator", "co_admin"]);
const READ_ONLY_STATES = new Set<CircleState>([
  "completed",
  "cancelled",
  "archived",
  "purged",
]);

export class CommunicationRuleError extends Error {
  readonly code:
    | "PERMISSION_DENIED"
    | "COMMUNICATION_LOCKED"
    | "INVALID_CONTENT"
    | "COMMENTS_CLOSED"
    | "RATE_LIMITED";

  constructor(
    message: string,
    code:
      | "PERMISSION_DENIED"
      | "COMMUNICATION_LOCKED"
      | "INVALID_CONTENT"
      | "COMMENTS_CLOSED"
      | "RATE_LIMITED",
  ) {
    super(message);
    this.name = "CommunicationRuleError";
    this.code = code;
  }
}

export function canManageCommunication(role: CircleRole) {
  return MANAGER_ROLES.has(role);
}

export function assertCommunicationManager(role: CircleRole) {
  if (!canManageCommunication(role)) {
    throw new CommunicationRuleError(
      "Only the creator or an authorised co-admin can manage announcements.",
      "PERMISSION_DENIED",
    );
  }
}

export function assertCommunicationWritable(status: CircleState) {
  if (READ_ONLY_STATES.has(status)) {
    throw new CommunicationRuleError(
      "Communication is read-only for this circle.",
      "COMMUNICATION_LOCKED",
    );
  }
}

function plainText(
  value: string,
  label: string,
  minimum: number,
  maximum: number,
) {
  const normalized = value
    .replace(/\r\n?/g, "\n")
    .replace(/\u0000/g, "")
    .trim();
  if (normalized.length < minimum || normalized.length > maximum) {
    throw new CommunicationRuleError(
      `${label} must be between ${minimum} and ${maximum} characters.`,
      "INVALID_CONTENT",
    );
  }
  return normalized;
}

export function validateAnnouncement(input: { title: string; body: string }) {
  return {
    title: plainText(input.title, "Announcement title", 3, 100),
    body: plainText(input.body, "Announcement message", 1, 2_000),
  };
}

export function validateComment(body: string) {
  return plainText(body, "Comment", 1, 1_000);
}

export function validateReportReason(reason: string) {
  return plainText(reason, "Report reason", 3, 500);
}

export function assertCommentsOpen(
  circleCommentsEnabled: boolean,
  announcementCommentsEnabled = true,
) {
  if (!circleCommentsEnabled || !announcementCommentsEnabled) {
    throw new CommunicationRuleError(
      "Comments are closed for this discussion.",
      "COMMENTS_CLOSED",
    );
  }
}

export function assertCommentRateLimit(
  recentCommentTimes: readonly string[],
  now = Date.now(),
) {
  const validTimes = recentCommentTimes
    .map((value) => Date.parse(value))
    .filter((value) => Number.isFinite(value))
    .sort((left, right) => right - left);
  const inWindow = validTimes.filter(
    (value) => now - value < COMMENT_RATE_LIMIT.windowMs,
  );

  if (
    inWindow.length >= COMMENT_RATE_LIMIT.maximum ||
    (inWindow[0] !== undefined &&
      now - inWindow[0] < COMMENT_RATE_LIMIT.minimumIntervalMs)
  ) {
    throw new CommunicationRuleError(
      "You are commenting too quickly. Please wait a moment and try again.",
      "RATE_LIMITED",
    );
  }
}

export function activityFilterFor(type: ActivityType): ActivityFilter {
  if (
    [
      "receipt_submitted",
      "receipt_confirmed",
      "receipt_rejected",
      "target_reached",
    ].includes(type)
  ) {
    return "payments";
  }
  if (["announcement_posted", "comment_posted"].includes(type)) {
    return "comments";
  }
  if (type === "reminder_sent") return "reminders";
  return "all";
}
