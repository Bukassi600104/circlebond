import "server-only";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";

export type GiftCircleMember = {
  id: string;
  displayName: string;
  email: string | null;
  profileImage: string | null;
  role: string;
  membershipStatus: string;
  contributionStatus: string;
  expectedAmount: number;
  pledgedAmount: number;
  confirmedAmount: number;
  receiptSubmittedAt: string | null;
};

export type GiftCircleDetail = {
  id: string;
  name: string;
  type: string;
  description: string;
  imageUrl: string | null;
  imageStoragePath: string | null;
  giftTitle: string;
  contributionMode: "equal" | "custom";
  paymentBankName: string | null;
  paymentAccountName: string | null;
  paymentAccountNumber: string | null;
  targetAmount: number;
  contributedAmount: number;
  memberLimit: number;
  deadline: string | null;
  status: string;
  creatorId: string;
  members: GiftCircleMember[];
};

type GiftQuery = {
  circle?: {
    id: string;
    name: string;
    type: string;
    description: string;
    imageUrl?: string | null;
    imageStoragePath?: string | null;
    giftTitle?: string | null;
    contributionMode?: string | null;
    paymentBankName?: string | null;
    paymentAccountName?: string | null;
    paymentAccountNumber?: string | null;
    targetAmount: number;
    contributedAmount: number;
    memberLimit: number;
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
    receiptSubmittedAt?: string | null;
    user: {
      id: string;
      displayName: string;
      email?: string | null;
      profileImage?: string | null;
    };
  }>;
};

export async function findUserByEmail(email: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    {
      users: Array<{
        id: string;
        displayName: string;
        email?: string | null;
        profileImage?: string | null;
      }>;
    },
    { email: string }
  >("FindUserByEmail", { email: email.trim().toLowerCase() });
  return response.data.users[0] ?? null;
}

export async function configureGiftCircle(input: {
  circleId: string;
  actorId: string;
  giftTitle: string;
  contributionMode: string;
  paymentBankName: string;
  paymentAccountName: string;
  paymentAccountNumber: string;
  imageUrl: string;
  imageStoragePath: string;
}) {
  await getBondCircleDataConnect().executeMutation("ConfigureGiftCircle", {
    ...input,
    updatedAt: new Date().toISOString(),
  });
}

export async function setGiftMemberAllocation(input: {
  circleId: string;
  memberId: string;
  expectedAmount: number;
  contributionStatus: string;
}) {
  await getBondCircleDataConnect().executeMutation(
    "SetGiftMemberAllocation",
    input,
  );
}

export async function loadGiftCircle(
  circleId: string,
  viewerId: string,
): Promise<GiftCircleDetail | null> {
  const response = await getBondCircleDataConnect().executeQuery<
    GiftQuery,
    { circleId: string }
  >("GetGiftCircleDetail", { circleId });
  const circle = response.data.circle;
  if (!circle || circle.type !== "gift") return null;
  if (
    !response.data.circleMemberships.some(
      (membership) =>
        membership.user.id === viewerId &&
        membership.membershipStatus === "joined",
    )
  ) {
    return null;
  }
  return {
    ...circle,
    imageUrl: circle.imageUrl ?? null,
    imageStoragePath: circle.imageStoragePath ?? null,
    giftTitle: circle.giftTitle ?? "Shared gift",
    contributionMode: circle.contributionMode === "custom" ? "custom" : "equal",
    paymentBankName: circle.paymentBankName ?? null,
    paymentAccountName: circle.paymentAccountName ?? null,
    paymentAccountNumber: circle.paymentAccountNumber ?? null,
    deadline: circle.deadline ?? null,
    creatorId: circle.creator.id,
    members: response.data.circleMemberships
      .filter((membership) => membership.membershipStatus === "joined")
      .map((membership) => ({
        id: membership.user.id,
        displayName: membership.user.displayName,
        email: membership.user.email ?? null,
        profileImage: membership.user.profileImage ?? null,
        role: membership.role,
        membershipStatus: membership.membershipStatus,
        contributionStatus: membership.contributionStatus,
        expectedAmount: membership.expectedAmount,
        pledgedAmount: membership.pledgedAmount,
        confirmedAmount: membership.confirmedAmount,
        receiptSubmittedAt: membership.receiptSubmittedAt ?? null,
      })),
  };
}
