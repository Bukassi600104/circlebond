import "server-only";

import { randomUUID } from "node:crypto";
import type { ActivityEvent } from "@/features/activity";
import type { Announcement } from "@/features/announcements";
import type { CircleComment } from "@/features/comments";
import type { CircleRole, CircleState } from "@/server/circles/engine";
import {
  activityFilterFor,
  assertCommentRateLimit,
  assertCommentsOpen,
  assertCommunicationManager,
  assertCommunicationWritable,
  canManageCommunication,
  validateAnnouncement,
  validateComment,
  validateReportReason,
  type ActivityType,
} from "@/server/communication/rules";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import {
  assertEntitlement,
  entitlementContextForStoredCircle,
  hasEntitlement,
} from "@/server/pricing";
import { loadDashboardCircles } from "@/server/repositories/dashboard";
import { safelyEmitNotification } from "@/server/repositories/notifications";

type CommunicationQuery = {
  circle?: {
    id: string;
    name: string;
    type: string;
    status: string;
    commentsEnabled: boolean;
    memberLimit: number;
    pricingPlan: string;
    pricingModelVersion: string;
    creator: { id: string };
  };
  circleMemberships: Array<{
    role: string;
    membershipStatus: string;
    expectedAmount: number;
    confirmedAmount: number;
    user: {
      id: string;
      displayName: string;
      profileImage?: string | null;
    };
  }>;
  announcements: Array<{
    id: string;
    title: string;
    body: string;
    pinned: boolean;
    important: boolean;
    commentsEnabled: boolean;
    createdAt: string;
    updatedAt: string;
    author: { id: string; displayName: string };
  }>;
  comments: Array<{
    id: string;
    announcementId?: string | null;
    parentCommentId?: string | null;
    body: string;
    status: string;
    deletionReason?: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    author: {
      id: string;
      displayName: string;
      profileImage?: string | null;
    };
  }>;
  commentReports: Array<{
    id: string;
    reason: string;
    status: string;
    createdAt: string;
    comment: { id: string };
    reporter: { id: string; displayName: string };
  }>;
  activityLogs: Array<{
    id: string;
    eventType: string;
    entityId: string;
    metadata: string;
    createdAt: string;
    actor?: { id: string; displayName: string } | null;
  }>;
};

type ActivityRows = {
  activityLogs: Array<{
    id: string;
    eventType: string;
    entityId: string;
    metadata: string;
    createdAt: string;
    circle: { id: string; name: string; type: string };
    actor?: { id: string; displayName: string } | null;
  }>;
};

export type CommentReport = {
  id: string;
  commentId: string;
  reporterId: string;
  reporterName: string;
  reason: string;
  createdAt: string;
};

export type CircleCommunication = {
  circleId: string;
  circleName: string;
  circleType: string;
  circleStatus: CircleState;
  commentsEnabled: boolean;
  pricingPlan: string;
  pricingModelVersion: string;
  memberLimit: number;
  canUseExpandedAnnouncementControls: boolean;
  viewerId: string;
  viewerRole: CircleRole;
  viewerCanManage: boolean;
  announcements: Announcement[];
  comments: CircleComment[];
  reports: CommentReport[];
  activity: ActivityEvent[];
  reminderCandidates: Array<{
    id: string;
    name: string;
    expectedAmount: number;
    confirmedAmount: number;
  }>;
};

function safeMetadata(value: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(value) as unknown;
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : {};
  } catch {
    return {};
  }
}

function isActivityType(value: string): value is ActivityType {
  return [
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
  ].includes(value);
}

function normalizeActivityType(value: string): ActivityType | null {
  const aliases: Record<string, ActivityType> = {
    completed: "circle_completed",
    cancelled: "circle_cancelled",
    confirmed: "receipt_confirmed",
    rejected: "receipt_rejected",
  };
  const normalized = aliases[value] ?? value;
  return isActivityType(normalized) ? normalized : null;
}

function mapActivity(
  row: CommunicationQuery["activityLogs"][number],
  circle: { id: string; name: string; type: string },
): ActivityEvent | null {
  const type = normalizeActivityType(row.eventType);
  if (!type) return null;
  return {
    id: row.id,
    circleId: circle.id,
    circleName: circle.name,
    circleType: circle.type,
    type,
    actorId: row.actor?.id ?? null,
    actorName: row.actor?.displayName ?? null,
    metadata: safeMetadata(row.metadata),
    createdAt: row.createdAt,
    filter: activityFilterFor(type),
  };
}

async function queryCommunication(circleId: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    CommunicationQuery,
    { circleId: string }
  >("GetCircleCommunication", { circleId });
  return response.data;
}

export async function loadCircleCommunication(
  circleId: string,
  viewerId: string,
): Promise<CircleCommunication | null> {
  const data = await queryCommunication(circleId);
  const circle = data.circle;
  const viewer = data.circleMemberships.find(
    (membership) =>
      membership.user.id === viewerId &&
      membership.membershipStatus === "joined",
  );
  if (!circle || !viewer) return null;

  const viewerRole = viewer.role as CircleRole;
  const viewerCanManage = canManageCommunication(viewerRole);
  const pricingContext = entitlementContextForStoredCircle(circle);
  return {
    circleId: circle.id,
    circleName: circle.name,
    circleType: circle.type,
    circleStatus: circle.status as CircleState,
    commentsEnabled: circle.commentsEnabled,
    pricingPlan: circle.pricingPlan,
    pricingModelVersion: circle.pricingModelVersion,
    memberLimit: circle.memberLimit,
    canUseExpandedAnnouncementControls: hasEntitlement(
      pricingContext,
      "expanded_announcement_controls",
    ),
    viewerId,
    viewerRole,
    viewerCanManage,
    announcements: data.announcements.map((announcement) => ({
      id: announcement.id,
      title: announcement.title,
      body: announcement.body,
      pinned: announcement.pinned,
      important: announcement.important,
      commentsEnabled: announcement.commentsEnabled,
      authorId: announcement.author.id,
      authorName: announcement.author.displayName,
      createdAt: announcement.createdAt,
      updatedAt: announcement.updatedAt,
    })),
    comments: data.comments.map((comment) => ({
      id: comment.id,
      announcementId: comment.announcementId ?? null,
      parentCommentId: comment.parentCommentId ?? null,
      authorId: comment.author.id,
      authorName: comment.author.displayName,
      authorImage: comment.author.profileImage ?? null,
      body: comment.status === "visible" ? comment.body : null,
      status: comment.status as CircleComment["status"],
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    })),
    reports: viewerCanManage
      ? data.commentReports.map((report) => ({
          id: report.id,
          commentId: report.comment.id,
          reporterId: report.reporter.id,
          reporterName: report.reporter.displayName,
          reason: report.reason,
          createdAt: report.createdAt,
        }))
      : [],
    reminderCandidates: viewerCanManage
      ? data.circleMemberships
          .filter(
            (membership) =>
              membership.membershipStatus === "joined" &&
              membership.user.id !== viewerId &&
              membership.expectedAmount > membership.confirmedAmount,
          )
          .map((membership) => ({
            id: membership.user.id,
            name: membership.user.displayName,
            expectedAmount: membership.expectedAmount,
            confirmedAmount: membership.confirmedAmount,
          }))
      : [],
    activity: data.activityLogs
      .map((row) => mapActivity(row, circle))
      .filter((row): row is ActivityEvent => Boolean(row)),
  };
}

async function requireCommunicationMember(circleId: string, viewerId: string) {
  const workspace = await loadCircleCommunication(circleId, viewerId);
  if (!workspace) throw new Error("You are not a member of this circle.");
  return workspace;
}

export async function createAnnouncement(input: {
  circleId: string;
  authorId: string;
  title: string;
  body: string;
  pinned: boolean;
  important: boolean;
  commentsEnabled: boolean;
}) {
  const workspace = await requireCommunicationMember(
    input.circleId,
    input.authorId,
  );
  assertCommunicationManager(workspace.viewerRole);
  assertCommunicationWritable(workspace.circleStatus);
  if (input.pinned || input.important || !input.commentsEnabled) {
    assertEntitlement(
      entitlementContextForStoredCircle({
        type: workspace.circleType,
        pricingPlan: workspace.pricingPlan,
        pricingModelVersion: workspace.pricingModelVersion,
        memberLimit: workspace.memberLimit,
      }),
      "expanded_announcement_controls",
    );
  }
  const content = validateAnnouncement(input);
  const announcementId = randomUUID();
  const createdAt = new Date().toISOString();
  await getBondCircleDataConnect().executeMutation(
    "CreateAnnouncementWithActivity",
    {
      announcementId,
      announcementEntityId: announcementId,
      activityId: randomUUID(),
      circleId: input.circleId,
      authorId: input.authorId,
      ...content,
      pinned: input.pinned,
      important: input.important,
      commentsEnabled: input.commentsEnabled,
      createdAt,
    },
  );
  await safelyEmitNotification({
    circleId: input.circleId,
    type: "announcement_posted",
    entityId: announcementId,
    actorId: input.authorId,
    important: input.important,
  });
  return { id: announcementId, createdAt };
}

export async function updateAnnouncement(input: {
  circleId: string;
  announcementId: string;
  actorId: string;
  title?: string;
  body?: string;
  pinned?: boolean;
  important?: boolean;
  commentsEnabled?: boolean;
}) {
  const workspace = await requireCommunicationMember(
    input.circleId,
    input.actorId,
  );
  assertCommunicationManager(workspace.viewerRole);
  assertCommunicationWritable(workspace.circleStatus);
  const announcement = workspace.announcements.find(
    (item) => item.id === input.announcementId,
  );
  if (!announcement) throw new Error("Announcement not found.");
  const content = validateAnnouncement({
    title: input.title ?? announcement.title,
    body: input.body ?? announcement.body,
  });
  const pinned = input.pinned ?? announcement.pinned;
  const important = input.important ?? announcement.important;
  const commentsEnabled = input.commentsEnabled ?? announcement.commentsEnabled;
  if (pinned || important || !commentsEnabled) {
    assertEntitlement(
      entitlementContextForStoredCircle({
        type: workspace.circleType,
        pricingPlan: workspace.pricingPlan,
        pricingModelVersion: workspace.pricingModelVersion,
        memberLimit: workspace.memberLimit,
      }),
      "expanded_announcement_controls",
    );
  }
  const updatedAt = new Date().toISOString();
  await getBondCircleDataConnect().executeMutation(
    "UpdateAnnouncementWithAudit",
    {
      announcementId: announcement.id,
      circleId: input.circleId,
      actorId: input.actorId,
      ...content,
      pinned,
      important,
      commentsEnabled,
      updatedAt,
      materialChanges: JSON.stringify({
        titleChanged: content.title !== announcement.title,
        bodyChanged: content.body !== announcement.body,
        pinned,
        important,
        commentsEnabled,
      }),
    },
  );
  return { updatedAt };
}

export async function deleteAnnouncement(input: {
  circleId: string;
  announcementId: string;
  actorId: string;
}) {
  const workspace = await requireCommunicationMember(
    input.circleId,
    input.actorId,
  );
  assertCommunicationManager(workspace.viewerRole);
  assertCommunicationWritable(workspace.circleStatus);
  if (
    !workspace.announcements.some(
      (announcement) => announcement.id === input.announcementId,
    )
  ) {
    throw new Error("Announcement not found.");
  }
  const deletedAt = new Date().toISOString();
  await getBondCircleDataConnect().executeMutation(
    "DeleteAnnouncementWithAudit",
    {
      announcementId: input.announcementId,
      announcementEntityId: input.announcementId,
      circleId: input.circleId,
      actorId: input.actorId,
      deletedAt,
    },
  );
}

export async function setCircleComments(input: {
  circleId: string;
  actorId: string;
  commentsEnabled: boolean;
}) {
  const workspace = await requireCommunicationMember(
    input.circleId,
    input.actorId,
  );
  assertCommunicationManager(workspace.viewerRole);
  assertCommunicationWritable(workspace.circleStatus);
  const updatedAt = new Date().toISOString();
  await getBondCircleDataConnect().executeMutation(
    "SetCircleCommentsWithAudit",
    {
      circleId: input.circleId,
      actorId: input.actorId,
      commentsEnabled: input.commentsEnabled,
      materialChanges: JSON.stringify({
        commentsEnabled: input.commentsEnabled,
      }),
      updatedAt,
    },
  );
}

export async function createComment(input: {
  circleId: string;
  authorId: string;
  announcementId?: string | null;
  parentCommentId?: string | null;
  body: string;
}) {
  const workspace = await requireCommunicationMember(
    input.circleId,
    input.authorId,
  );
  assertCommunicationWritable(workspace.circleStatus);
  const announcement = input.announcementId
    ? workspace.announcements.find((item) => item.id === input.announcementId)
    : null;
  if (input.announcementId && !announcement) {
    throw new Error("Announcement not found.");
  }
  assertCommentsOpen(
    workspace.commentsEnabled,
    announcement?.commentsEnabled ?? true,
  );

  const parent = input.parentCommentId
    ? workspace.comments.find(
        (comment) =>
          comment.id === input.parentCommentId && comment.status === "visible",
      )
    : null;
  if (input.parentCommentId && !parent) {
    throw new Error("The comment you are replying to is unavailable.");
  }
  if ((parent?.announcementId ?? null) !== (input.announcementId ?? null)) {
    throw new Error("Replies must stay in the same discussion.");
  }

  const since = new Date(Date.now() - 60_000).toISOString();
  const rateResponse = await getBondCircleDataConnect().executeQuery<
    { comments: Array<{ createdAt: string }> },
    { circleId: string; authorId: string; since: string }
  >("GetRecentCommentsByAuthor", {
    circleId: input.circleId,
    authorId: input.authorId,
    since,
  });
  assertCommentRateLimit(
    rateResponse.data.comments.map((comment) => comment.createdAt),
  );

  const commentId = randomUUID();
  const createdAt = new Date().toISOString();
  await getBondCircleDataConnect().executeMutation(
    "CreateCommentWithActivity",
    {
      commentId,
      commentEntityId: commentId,
      activityId: randomUUID(),
      circleId: input.circleId,
      authorId: input.authorId,
      announcementId: input.announcementId ?? null,
      parentCommentId: parent?.parentCommentId ?? parent?.id ?? null,
      body: validateComment(input.body),
      createdAt,
    },
  );
  if (parent && parent.authorId !== input.authorId) {
    await safelyEmitNotification({
      circleId: input.circleId,
      type: "comment_reply",
      entityId: commentId,
      actorId: input.authorId,
      recipientIds: [parent.authorId],
    });
  }
  return { id: commentId, createdAt };
}

export async function deleteOwnComment(input: {
  circleId: string;
  commentId: string;
  actorId: string;
}) {
  const workspace = await requireCommunicationMember(
    input.circleId,
    input.actorId,
  );
  assertCommunicationWritable(workspace.circleStatus);
  const comment = workspace.comments.find(
    (item) => item.id === input.commentId,
  );
  if (!comment || comment.status !== "visible") {
    throw new Error("Comment not found.");
  }
  if (comment.authorId !== input.actorId) {
    throw new Error("You can delete only your own comment.");
  }
  await getBondCircleDataConnect().executeMutation(
    "DeleteOwnCommentWithAudit",
    {
      commentId: comment.id,
      commentEntityId: comment.id,
      circleId: input.circleId,
      actorId: input.actorId,
      deletedAt: new Date().toISOString(),
    },
  );
}

export async function moderateComment(input: {
  circleId: string;
  commentId: string;
  actorId: string;
  reason: string;
}) {
  const workspace = await requireCommunicationMember(
    input.circleId,
    input.actorId,
  );
  assertCommunicationManager(workspace.viewerRole);
  assertCommunicationWritable(workspace.circleStatus);
  const comment = workspace.comments.find(
    (item) => item.id === input.commentId,
  );
  if (!comment || comment.status !== "visible") {
    throw new Error("Comment not found.");
  }
  await getBondCircleDataConnect().executeMutation("ModerateCommentWithAudit", {
    commentId: comment.id,
    circleId: input.circleId,
    actorId: input.actorId,
    reason: validateReportReason(input.reason),
    moderatedAt: new Date().toISOString(),
  });
}

export async function reportComment(input: {
  circleId: string;
  commentId: string;
  reporterId: string;
  reason: string;
}) {
  const workspace = await requireCommunicationMember(
    input.circleId,
    input.reporterId,
  );
  assertCommunicationWritable(workspace.circleStatus);
  const comment = workspace.comments.find(
    (item) => item.id === input.commentId,
  );
  if (!comment || comment.status !== "visible") {
    throw new Error("Comment not found.");
  }
  if (comment.authorId === input.reporterId) {
    throw new Error("You cannot report your own comment.");
  }
  const existingReport = await getBondCircleDataConnect().executeQuery<
    { commentReports: Array<{ id: string }> },
    { commentId: string; reporterId: string }
  >("GetOpenCommentReportsByReporter", {
    commentId: comment.id,
    reporterId: input.reporterId,
  });
  if (existingReport.data.commentReports.length) {
    throw new Error("You have already reported this comment.");
  }
  const reportId = randomUUID();
  await getBondCircleDataConnect().executeMutation("ReportCommentWithAudit", {
    reportId,
    commentId: comment.id,
    commentEntityId: comment.id,
    circleId: input.circleId,
    reporterId: input.reporterId,
    reason: validateReportReason(input.reason),
    createdAt: new Date().toISOString(),
  });
  return { id: reportId };
}

export async function recordSystemActivity(input: {
  circleId: string;
  actorId: string;
  type: ActivityType;
  entityId: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
}) {
  await getBondCircleDataConnect().executeMutation("RecordSystemActivity", {
    activityId: randomUUID(),
    circleId: input.circleId,
    actorId: input.actorId,
    eventType: input.type,
    entityId: input.entityId,
    metadata: JSON.stringify(input.metadata ?? {}),
    createdAt: input.createdAt ?? new Date().toISOString(),
  });
}

export async function loadUserActivity(userId: string) {
  const circles = await loadDashboardCircles(userId);
  if (!circles.length) return [];
  const response = await getBondCircleDataConnect().executeQuery<
    ActivityRows,
    { circleIds: string[] }
  >("GetActivityLogsForCircles", {
    circleIds: circles.map((circle) => circle.id),
  });
  return response.data.activityLogs
    .map((row) => mapActivity(row, row.circle))
    .filter((row): row is ActivityEvent => Boolean(row));
}
