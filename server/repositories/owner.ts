import "server-only";

import { getFoundationConfigStatus } from "@/lib/env";
import { getFirebaseAdminAuth } from "@/server/firebase/admin";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import {
  csvDocument,
  safeAuditMetadata,
  type AdminPurpose,
  type OperationalReport,
  type SuspensionReason,
} from "@/server/owner/rules";
import { MODEL_SPECIFIC_PRICING } from "@/lib/circle-pricing";

type CountRow = { _count: number };
type GroupedCount = CountRow & Record<string, string>;

type OwnerRecord = {
  role: string;
  status: string;
  user: {
    id: string;
    displayName: string;
    email?: string | null;
    accountStatus: string;
  };
};

type RetentionAttempt = {
  id: string;
  status: string;
  attemptNumber: number;
  deletedFileCount: number;
  skippedSharedFileCount: number;
  failureReason?: string | null;
  nextRetryAt?: string | null;
  startedAt: string;
  completedAt?: string | null;
  circle: {
    id: string;
    type: string;
    status: string;
    retentionDueAt?: string | null;
  };
};

type ReportSummary = {
  id: string;
  reason: string;
  status: string;
  createdAt: string;
  reporter: { id: string; displayName: string };
  comment: {
    id: string;
    status: string;
    author: { id: string; displayName: string; accountStatus: string };
  };
  circle: { id: string; name: string; type: string };
};

type InvitationSummary = {
  id: string;
  mode: string;
  state: string;
  useCount: number;
  maxUses: number;
  expiresAt: string;
  createdAt: string;
  circle: { id: string; name: string; type: string };
  invitedBy: { id: string; displayName: string };
};

type AdminAction = {
  id: string;
  action: string;
  targetType: string;
  targetId: string;
  purpose: string;
  outcome: string;
  metadata: string;
  createdAt: string;
  actor: { id: string; displayName: string };
};

type OverviewQuery = {
  totalUsers: CountRow[];
  usersByStatus: GroupedCount[];
  totalCircles: CountRow[];
  circlesByType: GroupedCount[];
  circlesByStatus: GroupedCount[];
  circlesByPlan: GroupedCount[];
  trialUsageTotals: CountRow[];
  pricingDefinitions: Array<{
    id: string;
    circleType: string;
    tier: string;
    version: number;
    currency: string;
    priceMinor: number;
    memberLimit: number;
    coAdminLimit: number;
    asoEbiTierLimit: number;
    effectiveAt: string;
    retiredAt?: string | null;
  }>;
  circleActivations: Array<{
    id: string;
    activationType: string;
    circleType: string;
    tier: string;
    currency: string;
    listPriceMinor: number;
    amountDueMinor: number;
    pricePaidMinor: number;
    status: string;
    provider?: string | null;
    createdAt: string;
    paidAt?: string | null;
  }>;
  pricingChangeAudits: Array<{
    id: string;
    action: string;
    effectiveAt: string;
    createdAt: string;
    planDefinition: {
      id: string;
      circleType: string;
      tier: string;
      priceMinor: number;
    };
    actor: { id: string; displayName: string };
  }>;
  invitationTotals: Array<CountRow & { acceptedAt_count: number }>;
  uploadOutcomes: GroupedCount[];
  reportStatuses: GroupedCount[];
  authOutcomes: GroupedCount[];
  emailOutcomes: GroupedCount[];
  retentionCandidates: CountRow[];
  retentionAttempts: RetentionAttempt[];
  reportedComments: ReportSummary[];
  activeInvitations: InvitationSummary[];
  recentAdminActions: AdminAction[];
};

function firstCount(rows: CountRow[]) {
  return rows[0]?._count ?? 0;
}

function grouped(rows: GroupedCount[], field: string) {
  return Object.fromEntries(
    rows.map((row) => [String(row[field] ?? "unknown"), row._count]),
  );
}

function percentage(numerator: number, denominator: number) {
  return denominator ? Math.round((numerator / denominator) * 1000) / 10 : 0;
}

function maskEmail(email?: string | null) {
  if (!email?.includes("@")) return null;
  const [local, domain] = email.split("@");
  return `${local.slice(0, 2)}***@${domain}`;
}

export async function getOwnerAdministrator(userId: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    { ownerAdministrators: OwnerRecord[] },
    { userId: string }
  >("GetOwnerAdministrator", { userId });
  const owner = response.data.ownerAdministrators[0] ?? null;
  if (!owner || owner.user.accountStatus !== "active") return null;
  return owner;
}

export async function getUserAccountStatus(userId: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    { user?: { id: string; accountStatus: string } },
    { userId: string }
  >("GetUserAccountStatus", { userId });
  return response.data.user?.accountStatus ?? null;
}

export async function recordOwnerAudit(input: {
  actorId: string;
  action: string;
  targetType: string;
  targetId: string;
  purpose: AdminPurpose;
  outcome: "succeeded" | "failed";
  metadata?: Record<string, string | number | boolean | null>;
}) {
  await getBondCircleDataConnect().executeMutation("RecordOwnerAdminAudit", {
    actorId: input.actorId,
    action: input.action,
    targetType: input.targetType,
    targetId: input.targetId,
    purpose: input.purpose,
    outcome: input.outcome,
    metadata: safeAuditMetadata(input.metadata ?? {}),
    createdAt: new Date().toISOString(),
  });
}

export async function loadOwnerOverview(actorId: string) {
  const owner = await getOwnerAdministrator(actorId);
  if (!owner) return null;
  const response = await getBondCircleDataConnect().executeQuery<OverviewQuery>(
    "GetOwnerPlatformOverview",
  );
  const data = response.data;
  const invitationTotals = data.invitationTotals[0] ?? {
    _count: 0,
    acceptedAt_count: 0,
  };
  const uploads = grouped(data.uploadOutcomes, "outcome");
  const uploadAttempts = Object.values(uploads).reduce(
    (sum, value) => sum + value,
    0,
  );
  const { firebaseConfigured, sqlConnectConfigured } =
    getFoundationConfigStatus();
  const successfulActivations = data.circleActivations.filter(
    ({ status }) => status === "succeeded",
  );
  const revenueByModeTier = successfulActivations.reduce<
    Record<string, number>
  >((summary, activation) => {
    const key = `${activation.circleType}:${activation.tier}`;
    summary[key] = (summary[key] ?? 0) + activation.pricePaidMinor;
    return summary;
  }, {});
  const currentPricing = Object.values(MODEL_SPECIFIC_PRICING).flatMap(
    (plans) =>
      Object.values(plans).map((plan) => ({
        id: plan.id,
        mode: plan.mode,
        tier: plan.tier,
        currency: plan.currency,
        priceMinor: plan.priceMinor,
        memberLimit: plan.memberLimit,
        coAdminLimit: plan.coAdminLimit,
        asoEbiTierLimit: plan.asoEbiTierLimit,
        entitlements: [...plan.entitlements],
        inclusions: [...plan.inclusions],
        exclusions: [...plan.exclusions],
      })),
  );

  return {
    owner: {
      displayName: owner.user.displayName,
      role: owner.role,
    },
    metrics: {
      users: firstCount(data.totalUsers),
      userStatuses: grouped(data.usersByStatus, "accountStatus"),
      circles: firstCount(data.totalCircles),
      circleTypes: grouped(data.circlesByType, "type"),
      circleStatuses: grouped(data.circlesByStatus, "status"),
      pricingPlans: grouped(data.circlesByPlan, "pricingPlan"),
      invitationAcceptanceRate: percentage(
        invitationTotals.acceptedAt_count,
        invitationTotals._count,
      ),
      uploadFailureRate: percentage(uploads.failed ?? 0, uploadAttempts),
      reportStatuses: grouped(data.reportStatuses, "status"),
    },
    health: {
      application: "operational",
      firebase: firebaseConfigured ? "configured" : "degraded",
      sqlConnect: sqlConnectConfigured ? "operational" : "degraded",
      storage: process.env.FIREBASE_STORAGE_BUCKET ? "configured" : "degraded",
      authOutcomes: grouped(data.authOutcomes, "outcome"),
      emailOutcomes: grouped(data.emailOutcomes, "status"),
      retentionPending: firstCount(data.retentionCandidates),
      latestRetentionStatus: data.retentionAttempts[0]?.status ?? "not_run_yet",
    },
    pricing: {
      current: currentPricing,
      definitions: data.pricingDefinitions,
      recentActivations: data.circleActivations.slice(0, 50),
      recentChanges: data.pricingChangeAudits,
      trialCreators: firstCount(data.trialUsageTotals),
      activationCount: successfulActivations.length,
      upgradeCount: successfulActivations.filter(
        ({ activationType }) => activationType === "upgrade",
      ).length,
      revenueMinor: successfulActivations.reduce(
        (sum, activation) => sum + activation.pricePaidMinor,
        0,
      ),
      revenueByModeTier,
    },
    retentionAttempts: data.retentionAttempts,
    reports: data.reportedComments,
    invitations: data.activeInvitations,
    auditTrail: data.recentAdminActions,
  };
}

export async function revealReportedComment(input: {
  actorId: string;
  reportId: string;
  purpose: AdminPurpose;
}) {
  const response = await getBondCircleDataConnect().executeQuery<
    {
      commentReport?: {
        id: string;
        reason: string;
        status: string;
        createdAt: string;
        reporter: { id: string; displayName: string };
        comment: {
          id: string;
          body: string;
          status: string;
          createdAt: string;
          author: { id: string; displayName: string; accountStatus: string };
        };
        circle: { id: string; name: string; type: string };
      };
    },
    { reportId: string }
  >("GetOwnerReportReview", { reportId: input.reportId });
  const report = response.data.commentReport;
  if (!report) throw new Error("Abuse report not found.");
  await recordOwnerAudit({
    actorId: input.actorId,
    action: "sensitive_comment_reviewed",
    targetType: "comment_report",
    targetId: report.id,
    purpose: input.purpose,
    outcome: "succeeded",
    metadata: { commentId: report.comment.id },
  });
  return report;
}

export async function resolveReportedComment(input: {
  actorId: string;
  reportId: string;
  action: "dismiss" | "hide_comment";
  purpose: AdminPurpose;
}) {
  const response = await getBondCircleDataConnect().executeQuery<
    {
      commentReport?: { id: string; comment: { id: string } };
    },
    { reportId: string }
  >("GetOwnerReportReview", { reportId: input.reportId });
  const report = response.data.commentReport;
  if (!report) throw new Error("Abuse report not found.");

  if (input.action === "dismiss") {
    await getBondCircleDataConnect().executeMutation(
      "DismissOwnerCommentReport",
      { reportId: input.reportId },
    );
  } else {
    await getBondCircleDataConnect().executeMutation(
      "ResolveOwnerCommentReport",
      {
        reportId: input.reportId,
        reportStatus: "actioned",
        commentId: report.comment.id,
        commentStatus: "moderated",
        deletionReason: "Removed after owner abuse review.",
        updatedAt: new Date().toISOString(),
      },
    );
  }
  await recordOwnerAudit({
    actorId: input.actorId,
    action:
      input.action === "dismiss"
        ? "comment_report_dismissed"
        : "reported_comment_hidden",
    targetType: "comment_report",
    targetId: input.reportId,
    purpose: input.purpose,
    outcome: "succeeded",
  });
}

export async function searchOwnerUser(identifier: string) {
  const value = identifier.trim();
  if (!value || value.length > 254) {
    throw new Error("Enter an exact user ID or email address.");
  }
  const response = await getBondCircleDataConnect().executeQuery<
    {
      userById?: {
        id: string;
        displayName: string;
        email?: string | null;
        accountStatus: string;
        suspendedAt?: string | null;
      };
      usersByEmail: Array<{
        id: string;
        displayName: string;
        email?: string | null;
        accountStatus: string;
        suspendedAt?: string | null;
      }>;
    },
    { userId: string; email: string }
  >("GetOwnerUserByIdentifier", {
    userId: value,
    email: value.toLowerCase(),
  });
  const user = response.data.userById ?? response.data.usersByEmail[0] ?? null;
  if (!user) return null;
  return {
    id: user.id,
    displayName: user.displayName,
    email: maskEmail(user.email),
    accountStatus: user.accountStatus,
    suspendedAt: user.suspendedAt ?? null,
  };
}

export async function suspendOwnerTarget(input: {
  actorId: string;
  userId: string;
  reason: SuspensionReason;
  purpose: AdminPurpose;
}) {
  if (input.userId === input.actorId) {
    throw new Error("The active owner account cannot suspend itself.");
  }
  if (await getOwnerAdministrator(input.userId)) {
    throw new Error("Another active owner administrator cannot be suspended.");
  }
  const target = await searchOwnerUser(input.userId);
  if (!target) throw new Error("User account not found.");
  if (target.accountStatus === "suspended") {
    throw new Error("This account is already suspended.");
  }
  const suspendedAt = new Date().toISOString();
  await getBondCircleDataConnect().executeMutation("SuspendOwnerTargetUser", {
    userId: input.userId,
    reasonCode: input.reason,
    suspendedAt,
  });
  await getFirebaseAdminAuth().updateUser(input.userId, { disabled: true });
  await getFirebaseAdminAuth().revokeRefreshTokens(input.userId);
  await recordOwnerAudit({
    actorId: input.actorId,
    action: "account_suspended",
    targetType: "user",
    targetId: input.userId,
    purpose: input.purpose,
    outcome: "succeeded",
    metadata: { reasonCode: input.reason },
  });
}

export async function revokeCompromisedInvite(input: {
  actorId: string;
  invitationId: string;
  purpose: AdminPurpose;
}) {
  const response = await getBondCircleDataConnect().executeQuery<
    {
      invitation?: {
        id: string;
        state: string;
        expiresAt: string;
        circle: { id: string };
      };
    },
    { invitationId: string }
  >("GetOwnerInvitation", { invitationId: input.invitationId });
  const invitation = response.data.invitation;
  if (!invitation) throw new Error("Invitation not found.");
  if (!["sent", "opened"].includes(invitation.state)) {
    throw new Error("Only an active invitation can be revoked.");
  }
  await getBondCircleDataConnect().executeMutation(
    "RevokeCompromisedInvitation",
    {
      invitationId: input.invitationId,
      revokedAt: new Date().toISOString(),
    },
  );
  await recordOwnerAudit({
    actorId: input.actorId,
    action: "compromised_invitation_revoked",
    targetType: "invitation",
    targetId: input.invitationId,
    purpose: input.purpose,
    outcome: "succeeded",
  });
}

type ExportQuery = {
  circles: Array<Record<string, unknown>>;
  commentReports: Array<{
    id: string;
    reason: string;
    status: string;
    createdAt: string;
    circle: { id: string; type: string };
  }>;
  retentionPurgeAttempts: Array<{
    id: string;
    status: string;
    attemptNumber: number;
    deletedFileCount: number;
    skippedSharedFileCount: number;
    failureReason?: string | null;
    startedAt: string;
    completedAt?: string | null;
    circle: { id: string; type: string };
  }>;
};

export async function createOperationalReport(input: {
  actorId: string;
  report: OperationalReport;
  purpose: AdminPurpose;
}) {
  const response = await getBondCircleDataConnect().executeQuery<ExportQuery>(
    "GetOwnerOperationalExport",
  );
  let rows: unknown[][];
  if (input.report === "platform_summary") {
    rows = [
      [
        "circle_id",
        "circle_type",
        "status",
        "pricing_plan",
        "member_count",
        "created_at",
        "completed_at",
        "retention_due_at",
        "purged_at",
      ],
      ...response.data.circles.map((circle) => [
        circle.id,
        circle.type,
        circle.status,
        circle.pricingPlan,
        circle.memberCount,
        circle.createdAt,
        circle.completedAt,
        circle.retentionDueAt,
        circle.purgeAt,
      ]),
    ];
  } else if (input.report === "abuse_operations") {
    rows = [
      [
        "report_id",
        "circle_id",
        "circle_type",
        "reason",
        "status",
        "created_at",
      ],
      ...response.data.commentReports.map((report) => [
        report.id,
        report.circle.id,
        report.circle.type,
        report.reason,
        report.status,
        report.createdAt,
      ]),
    ];
  } else {
    rows = [
      [
        "attempt_id",
        "circle_id",
        "circle_type",
        "status",
        "attempt_number",
        "deleted_files",
        "shared_files_skipped",
        "failure_reason",
        "started_at",
        "completed_at",
      ],
      ...response.data.retentionPurgeAttempts.map((attempt) => [
        attempt.id,
        attempt.circle.id,
        attempt.circle.type,
        attempt.status,
        attempt.attemptNumber,
        attempt.deletedFileCount,
        attempt.skippedSharedFileCount,
        attempt.failureReason,
        attempt.startedAt,
        attempt.completedAt,
      ]),
    ];
  }
  await recordOwnerAudit({
    actorId: input.actorId,
    action: "operational_report_exported",
    targetType: "report",
    targetId: input.report,
    purpose: input.purpose,
    outcome: "succeeded",
    metadata: { rowCount: Math.max(0, rows.length - 1) },
  });
  return csvDocument(rows);
}
