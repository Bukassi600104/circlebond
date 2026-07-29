import "server-only";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import { recordSystemActivity } from "@/server/repositories/communication";
import { safelyEmitNotification } from "@/server/repositories/notifications";
import {
  canReviewReceipts,
  canViewReceipt,
  contributionSummary,
  receiptSubmissionStatus,
  reviewOutcome,
} from "@/server/contributions/engine";

export type ContributionReceipt = {
  id: string;
  uploaderId: string;
  uploaderName: string;
  amount: number;
  note: string | null;
  imageUrl: string;
  imageStoragePath: string;
  contentType: string;
  status: string;
  overpaymentAmount: number;
  replacementOfId: string | null;
  rejectionReason: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  reviewerName: string | null;
};

type WorkspaceQuery = {
  circle?: {
    id: string;
    name: string;
    type: string;
    targetAmount: number;
    contributedAmount: number;
    status: string;
    creator: { id: string };
  };
  circleMemberships: Array<{
    role: string;
    membershipStatus: string;
    contributionStatus: string;
    expectedAmount: number;
    confirmedAmount: number;
    user: { id: string; displayName: string; profileImage?: string | null };
  }>;
  receipts: Array<{
    id: string;
    amount: number;
    note?: string | null;
    imageUrl: string;
    imageStoragePath: string;
    contentType: string;
    status: string;
    overpaymentAmount: number;
    replacementOfId?: string | null;
    rejectionReason?: string | null;
    submittedAt: string;
    reviewedAt?: string | null;
    uploadedBy: { id: string; displayName: string };
    reviewedBy?: { id: string; displayName: string } | null;
  }>;
};

function mapReceipt(
  receipt: WorkspaceQuery["receipts"][number],
): ContributionReceipt {
  return {
    id: receipt.id,
    uploaderId: receipt.uploadedBy.id,
    uploaderName: receipt.uploadedBy.displayName,
    amount: receipt.amount,
    note: receipt.note ?? null,
    imageUrl: receipt.imageUrl,
    imageStoragePath: receipt.imageStoragePath,
    contentType: receipt.contentType,
    status: receipt.status,
    overpaymentAmount: receipt.overpaymentAmount,
    replacementOfId: receipt.replacementOfId ?? null,
    rejectionReason: receipt.rejectionReason ?? null,
    submittedAt: receipt.submittedAt,
    reviewedAt: receipt.reviewedAt ?? null,
    reviewerName: receipt.reviewedBy?.displayName ?? null,
  };
}

export async function loadContributionWorkspace(
  circleId: string,
  viewerId: string,
) {
  const response = await getBondCircleDataConnect().executeQuery<
    WorkspaceQuery,
    { circleId: string }
  >("GetContributionWorkspace", { circleId });
  const circle = response.data.circle;
  const viewer = response.data.circleMemberships.find(
    (membership) =>
      membership.user.id === viewerId &&
      membership.membershipStatus === "joined",
  );
  if (!circle || !viewer) return null;

  const canReview = canReviewReceipts(viewer.role);
  const visibleReceipts = response.data.receipts
    .filter((receipt) =>
      canViewReceipt(receipt.uploadedBy.id, viewerId, viewer.role),
    )
    .map(mapReceipt);
  const ownPending = response.data.receipts
    .filter(
      (receipt) =>
        receipt.uploadedBy.id === viewerId &&
        ["awaiting_confirmation", "overpayment_review"].includes(
          receipt.status,
        ),
    )
    .reduce((total, receipt) => total + receipt.amount, 0);

  return {
    circle,
    viewer: {
      id: viewer.user.id,
      displayName: viewer.user.displayName,
      role: viewer.role,
      contributionStatus: viewer.contributionStatus,
      ...contributionSummary(
        viewer.expectedAmount,
        viewer.confirmedAmount,
        ownPending,
      ),
    },
    receipts: visibleReceipts.filter(
      (receipt) => receipt.uploaderId === viewerId,
    ),
    reviewQueue: canReview
      ? visibleReceipts.filter((receipt) =>
          ["awaiting_confirmation", "overpayment_review"].includes(
            receipt.status,
          ),
        )
      : [],
    canReview,
  };
}

export async function submitContributionReceipt(input: {
  receiptId: string;
  circleId: string;
  uploaderId: string;
  amount: number;
  note: string | null;
  imageUrl: string;
  imageStoragePath: string;
  contentType: string;
  replacementOfId?: string | null;
}) {
  const workspace = await loadContributionWorkspace(
    input.circleId,
    input.uploaderId,
  );
  if (!workspace) throw new Error("You are not a member of this circle.");
  if (!["active", "published"].includes(workspace.circle.status)) {
    throw new Error("This circle is not accepting contributions.");
  }
  if (!Number.isInteger(input.amount) || input.amount < 1) {
    throw new Error("Enter a valid amount paid.");
  }
  if (input.note && input.note.length > 500) {
    throw new Error("Keep the receipt note within 500 characters.");
  }

  if (input.replacementOfId) {
    const replaced = workspace.receipts.find(
      (receipt) => receipt.id === input.replacementOfId,
    );
    if (
      !replaced ||
      replaced.uploaderId !== input.uploaderId ||
      replaced.status !== "rejected"
    ) {
      throw new Error("Only your rejected receipt can be replaced.");
    }
  }

  const submission = receiptSubmissionStatus(
    workspace.viewer.expectedAmount,
    workspace.viewer.confirmedAmount,
    input.amount,
  );
  const submittedAt = new Date().toISOString();
  const variables = {
    ...input,
    status: submission.status,
    overpaymentAmount: submission.overpaymentAmount,
    submittedAt,
  };
  await getBondCircleDataConnect().executeMutation(
    input.replacementOfId
      ? "ReplaceReceiptWithAudit"
      : "SubmitReceiptWithAudit",
    input.replacementOfId
      ? { ...variables, replacedReceiptId: input.replacementOfId }
      : variables,
  );
  await safelyEmitNotification({
    circleId: input.circleId,
    type: "receipt_submitted",
    entityId: input.receiptId,
    actorId: input.uploaderId,
  });
  return { ...submission, submittedAt };
}

export async function reviewContributionReceipt(input: {
  circleId: string;
  receiptId: string;
  reviewerId: string;
  decision: "approve" | "reject";
  rejectionReason?: string | null;
}) {
  const workspace = await loadContributionWorkspace(
    input.circleId,
    input.reviewerId,
  );
  if (!workspace?.canReview) {
    throw new Error("Only the creator or an authorised co-admin can review.");
  }
  if (!["active", "published"].includes(workspace.circle.status)) {
    throw new Error("Receipt review is closed for this circle.");
  }
  const receipt = workspace.reviewQueue.find(
    (candidate) => candidate.id === input.receiptId,
  );
  if (!receipt) throw new Error("This receipt is no longer awaiting review.");
  const member = (
    await getBondCircleDataConnect().executeQuery<
      WorkspaceQuery,
      { circleId: string }
    >("GetContributionWorkspace", { circleId: input.circleId })
  ).data.circleMemberships.find(
    (membership) => membership.user.id === receipt.uploaderId,
  );
  if (!member) throw new Error("The contributor is no longer in this circle.");

  const reason = input.rejectionReason?.trim() ?? "";
  if (input.decision === "reject" && reason.length < 3) {
    throw new Error("A rejection reason is required.");
  }
  if (reason.length > 500) {
    throw new Error("Keep the rejection reason within 500 characters.");
  }

  const outcome =
    input.decision === "approve"
      ? reviewOutcome(
          member.expectedAmount,
          member.confirmedAmount,
          receipt.amount,
        )
      : null;
  const reviewedAt = new Date().toISOString();
  const nextConfirmedAmount =
    outcome?.nextConfirmedAmount ?? member.confirmedAmount;
  const membershipStatus =
    outcome?.contributionStatus ??
    (member.confirmedAmount > 0 ? "part_paid" : "rejected");
  const receiptStatus = input.decision === "approve" ? "confirmed" : "rejected";
  const nextCircleContributedAmount =
    workspace.circle.contributedAmount +
    (input.decision === "approve" ? receipt.amount : 0);

  await getBondCircleDataConnect().executeMutation("ReviewReceiptWithAudit", {
    receiptId: receipt.id,
    circleId: input.circleId,
    uploaderId: receipt.uploaderId,
    reviewerId: input.reviewerId,
    receiptStatus,
    rejectionReason: input.decision === "reject" ? reason : null,
    reviewedAt,
    membershipStatus,
    nextConfirmedAmount,
    nextCircleContributedAmount,
    auditAction:
      input.decision === "approve" ? "receipt_confirmed" : "receipt_rejected",
    materialChanges: JSON.stringify({
      receiptId: receipt.id,
      amount: receipt.amount,
      fromConfirmedAmount: member.confirmedAmount,
      toConfirmedAmount: nextConfirmedAmount,
      rejectionReason: input.decision === "reject" ? reason : null,
    }),
  });
  await safelyEmitNotification({
    circleId: input.circleId,
    type:
      input.decision === "approve" ? "receipt_confirmed" : "receipt_rejected",
    entityId: receipt.id,
    actorId: input.reviewerId,
    recipientIds: [receipt.uploaderId],
  });
  if (
    input.decision === "approve" &&
    workspace.circle.targetAmount > 0 &&
    workspace.circle.contributedAmount < workspace.circle.targetAmount &&
    nextCircleContributedAmount >= workspace.circle.targetAmount
  ) {
    await recordSystemActivity({
      circleId: input.circleId,
      actorId: input.reviewerId,
      type: "target_reached",
      entityId: input.circleId,
      metadata: {
        targetAmount: workspace.circle.targetAmount,
        contributedAmount: nextCircleContributedAmount,
      },
    });
    await safelyEmitNotification({
      circleId: input.circleId,
      type: "target_reached",
      entityId: input.circleId,
      actorId: input.reviewerId,
    });
  }
  return { receiptStatus, membershipStatus, reviewedAt };
}
