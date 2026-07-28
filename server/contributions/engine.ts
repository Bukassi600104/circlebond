export type CircleMemberRole = "creator" | "co_admin" | "member" | string;

export function canReviewReceipts(role: CircleMemberRole | null) {
  return role === "creator" || role === "co_admin";
}

export function canViewReceipt(
  uploaderId: string,
  viewerId: string,
  viewerRole: CircleMemberRole | null,
) {
  return uploaderId === viewerId || canReviewReceipts(viewerRole);
}

export function receiptSubmissionStatus(
  expectedAmount: number,
  confirmedAmount: number,
  submittedAmount: number,
) {
  const overpaymentAmount = Math.max(
    0,
    confirmedAmount + submittedAmount - expectedAmount,
  );
  return {
    status:
      overpaymentAmount > 0 ? "overpayment_review" : "awaiting_confirmation",
    overpaymentAmount,
  };
}

export function reviewOutcome(
  expectedAmount: number,
  confirmedAmount: number,
  approvedAmount: number,
) {
  const nextConfirmedAmount = confirmedAmount + approvedAmount;
  const overpaymentAmount = Math.max(0, nextConfirmedAmount - expectedAmount);
  return {
    nextConfirmedAmount,
    remainingAmount: Math.max(0, expectedAmount - nextConfirmedAmount),
    contributionStatus:
      nextConfirmedAmount >= expectedAmount ? "paid" : "part_paid",
    overpaymentAmount,
  };
}

export function contributionSummary(
  expectedAmount: number,
  confirmedAmount: number,
  pendingAmount: number,
) {
  const accountedAmount = confirmedAmount + pendingAmount;
  const overpaymentAmount = Math.max(0, accountedAmount - expectedAmount);
  let status = confirmedAmount >= expectedAmount ? "paid" : "joined";
  if (pendingAmount > 0) {
    status =
      overpaymentAmount > 0 ? "overpayment_review" : "awaiting_confirmation";
  } else if (confirmedAmount > 0) {
    status = "part_paid";
  }
  return {
    expectedAmount,
    confirmedAmount,
    pendingAmount,
    remainingAmount: Math.max(0, expectedAmount - accountedAmount),
    overpaymentAmount,
    status,
  };
}
