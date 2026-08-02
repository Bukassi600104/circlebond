import "server-only";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import {
  supportAmountVisibility,
  validateSupportPledge,
} from "@/server/circles/support";
import {
  assertEntitlement,
  entitlementContextForStoredCircle,
  hasEntitlement,
} from "@/server/pricing";

export type SupportCircleMember = {
  id: string;
  displayName: string;
  email: string | null;
  profileImage: string | null;
  role: string;
  membershipStatus: string;
  contributionStatus: string;
  expectedAmount: number | null;
  pledgedAmount: number | null;
  confirmedAmount: number | null;
};

export type SupportCircleUpdate = {
  id: string;
  body: string;
  createdAt: string;
  authorId: string;
  authorName: string;
};

export type SupportCircleDetail = {
  id: string;
  name: string;
  type: string;
  description: string;
  imageUrl: string | null;
  imageStoragePath: string | null;
  supportType: string;
  beneficiaryName: string | null;
  beneficiaryRelationship: string | null;
  showBeneficiaryName: boolean;
  showTargetToMembers: boolean;
  showConfirmedTotalToMembers: boolean;
  hideIndividualAmounts: boolean;
  requireCreatorApproval: boolean;
  completionType: string | null;
  contributionMode: "equal" | "custom";
  paymentBankName: string | null;
  paymentAccountName: string | null;
  paymentAccountNumber: string | null;
  targetAmount: number | null;
  contributedAmount: number | null;
  memberLimit: number;
  deadline: string | null;
  status: string;
  creatorId: string;
  viewerCanManage: boolean;
  canPublishMultipleUpdates: boolean;
  members: SupportCircleMember[];
  updates: SupportCircleUpdate[];
};

type SupportQuery = {
  circle?: {
    id: string;
    name: string;
    type: string;
    description: string;
    imageUrl?: string | null;
    imageStoragePath?: string | null;
    supportType?: string | null;
    beneficiaryName?: string | null;
    beneficiaryRelationship?: string | null;
    showBeneficiaryName: boolean;
    showTargetToMembers: boolean;
    showConfirmedTotalToMembers: boolean;
    hideIndividualAmounts: boolean;
    requireCreatorApproval: boolean;
    completionType?: string | null;
    contributionMode?: string | null;
    paymentBankName?: string | null;
    paymentAccountName?: string | null;
    paymentAccountNumber?: string | null;
    targetAmount: number;
    contributedAmount: number;
    memberLimit: number;
    pricingPlan: string;
    pricingModelVersion: string;
    deadline?: string | null;
    status: string;
    creator: { id: string };
  };
  circleMemberships: Array<{
    role: string;
    membershipStatus: string;
    contributionStatus: string;
    expectedAmount: number;
    pledgedAmount: number;
    confirmedAmount: number;
    user: {
      id: string;
      displayName: string;
      email?: string | null;
      profileImage?: string | null;
    };
  }>;
  supportUpdates: Array<{
    id: string;
    body: string;
    createdAt: string;
    author: { id: string; displayName: string };
  }>;
};

async function querySupport(circleId: string) {
  return getBondCircleDataConnect().executeQuery<
    SupportQuery,
    { circleId: string }
  >("GetSupportCircleDetail", { circleId });
}

export async function configureSupportCircle(input: {
  circleId: string;
  actorId: string;
  supportType: string;
  beneficiaryName: string;
  beneficiaryRelationship: string | null;
  contributionMode: string;
  showBeneficiaryName: boolean;
  showTargetToMembers: boolean;
  showConfirmedTotalToMembers: boolean;
  hideIndividualAmounts: boolean;
  requireCreatorApproval: boolean;
  paymentBankName: string;
  paymentAccountName: string;
  paymentAccountNumber: string;
  imageUrl: string;
  imageStoragePath: string;
}) {
  await getBondCircleDataConnect().executeMutation("ConfigureSupportCircle", {
    ...input,
    updatedAt: new Date().toISOString(),
  });
}

export async function setSupportMemberAllocation(input: {
  circleId: string;
  memberId: string;
  expectedAmount: number;
  contributionStatus: string;
}) {
  await getBondCircleDataConnect().executeMutation(
    "SetSupportMemberAllocation",
    input,
  );
}

export async function loadSupportCircle(
  circleId: string,
  viewerId: string,
): Promise<SupportCircleDetail | null> {
  const response = await querySupport(circleId);
  const circle = response.data.circle;
  if (!circle || circle.type !== "support") return null;
  const viewerMembership = response.data.circleMemberships.find(
    (membership) =>
      membership.user.id === viewerId &&
      membership.membershipStatus === "joined",
  );
  if (!viewerMembership) return null;
  const viewerCanManage =
    circle.creator.id === viewerId || viewerMembership.role === "co_admin";
  const pricingContext = entitlementContextForStoredCircle(circle);
  return {
    ...circle,
    imageUrl: circle.imageUrl ?? null,
    imageStoragePath: circle.imageStoragePath ?? null,
    supportType: circle.supportType ?? "other",
    beneficiaryName:
      viewerCanManage || circle.showBeneficiaryName
        ? (circle.beneficiaryName ?? null)
        : null,
    beneficiaryRelationship:
      viewerCanManage || circle.showBeneficiaryName
        ? (circle.beneficiaryRelationship ?? null)
        : null,
    completionType: circle.completionType ?? null,
    contributionMode: circle.contributionMode === "custom" ? "custom" : "equal",
    paymentBankName: circle.paymentBankName ?? null,
    paymentAccountName: circle.paymentAccountName ?? null,
    paymentAccountNumber: circle.paymentAccountNumber ?? null,
    targetAmount:
      viewerCanManage || circle.showTargetToMembers
        ? circle.targetAmount
        : null,
    contributedAmount:
      viewerCanManage || circle.showConfirmedTotalToMembers
        ? circle.contributedAmount
        : null,
    deadline: circle.deadline ?? null,
    creatorId: circle.creator.id,
    viewerCanManage,
    canPublishMultipleUpdates: hasEntitlement(
      pricingContext,
      "support_multiple_beneficiary_updates",
    ),
    members: response.data.circleMemberships
      .filter((membership) => membership.membershipStatus === "joined")
      .map((membership) => {
        const visibility = supportAmountVisibility({
          isManager: viewerCanManage,
          isSelf: membership.user.id === viewerId,
          showTargetToMembers: circle.showTargetToMembers,
          showConfirmedTotalToMembers: circle.showConfirmedTotalToMembers,
          hideIndividualAmounts: circle.hideIndividualAmounts,
        });
        return {
          id: membership.user.id,
          displayName: membership.user.displayName,
          email: membership.user.email ?? null,
          profileImage: membership.user.profileImage ?? null,
          role: membership.role,
          membershipStatus: membership.membershipStatus,
          contributionStatus: membership.contributionStatus,
          expectedAmount: visibility.individualAmount
            ? membership.expectedAmount
            : null,
          pledgedAmount: visibility.individualAmount
            ? membership.pledgedAmount
            : null,
          confirmedAmount: visibility.individualAmount
            ? membership.confirmedAmount
            : null,
        };
      }),
    updates: response.data.supportUpdates.map((update) => ({
      id: update.id,
      body: update.body,
      createdAt: update.createdAt,
      authorId: update.author.id,
      authorName: update.author.displayName,
    })),
  };
}

export async function recordSupportPledge(input: {
  circleId: string;
  memberId: string;
  amount: number;
}) {
  const amount = validateSupportPledge(input.amount);
  const response = await querySupport(input.circleId);
  const circle = response.data.circle;
  const membership = response.data.circleMemberships.find(
    (candidate) => candidate.user.id === input.memberId,
  );
  if (!circle || circle.type !== "support" || !membership) {
    throw new Error("Support Circle membership was not found.");
  }
  if (!["published", "active"].includes(circle.status)) {
    throw new Error("Support pledges are closed for this circle.");
  }
  await getBondCircleDataConnect().executeMutation("RecordSupportPledge", {
    circleId: input.circleId,
    memberId: input.memberId,
    amount,
    updatedAt: new Date().toISOString(),
  });
}

export async function createSupportUpdate(input: {
  circleId: string;
  authorId: string;
  body: string;
}) {
  const body = input.body.trim();
  if (!body || body.length > 1000) {
    throw new Error("Write an update of up to 1,000 characters.");
  }
  const response = await querySupport(input.circleId);
  const circle = response.data.circle;
  const author = response.data.circleMemberships.find(
    (candidate) => candidate.user.id === input.authorId,
  );
  if (!circle || circle.type !== "support" || !author) {
    throw new Error("Support Circle membership was not found.");
  }
  if (circle.creator.id !== input.authorId && author.role !== "co_admin") {
    throw new Error("Only the creator or a co-admin can publish updates.");
  }
  if (["completed", "cancelled", "archived"].includes(circle.status)) {
    throw new Error("Updates are read-only for this circle.");
  }
  if (response.data.supportUpdates.length > 0) {
    assertEntitlement(
      entitlementContextForStoredCircle(circle),
      "support_multiple_beneficiary_updates",
    );
  }
  await getBondCircleDataConnect().executeMutation("CreateSupportUpdate", {
    circleId: input.circleId,
    authorId: input.authorId,
    body,
    createdAt: new Date().toISOString(),
  });
}

export async function setSupportCompletionType(input: {
  circleId: string;
  actorId: string;
  completionType: "support_delivered";
}) {
  await getBondCircleDataConnect().executeMutation("SetSupportCompletionType", {
    ...input,
    updatedAt: new Date().toISOString(),
  });
}
