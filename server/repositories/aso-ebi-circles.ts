import "server-only";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import {
  assertFulfilmentTransition,
  type AsoEbiFulfilmentStatus,
} from "@/server/circles/aso-ebi";

export type AsoEbiTier = {
  id: string;
  name: string;
  price: number;
  fabricDescription: string;
  fabricImageUrl: string | null;
  fabricImageStoragePath: string | null;
  appreciationGiftName: string | null;
  appreciationGiftImageUrl: string | null;
  appreciationGiftImageStoragePath: string | null;
  availabilityNote: string | null;
  deliveryDetails: string | null;
  sortOrder: number;
};

export type AsoEbiMember = {
  id: string;
  displayName: string;
  email: string | null;
  profileImage: string | null;
  role: string;
  membershipStatus: string;
  contributionStatus: string;
  fulfilmentStatus: AsoEbiFulfilmentStatus;
  expectedAmount: number;
  confirmedAmount: number;
  selectedTier: { id: string; name: string; price: number } | null;
};

export type AsoEbiCircleDetail = {
  id: string;
  name: string;
  type: string;
  description: string;
  imageUrl: string | null;
  imageStoragePath: string | null;
  eventType: string;
  organizerName: string;
  paymentBankName: string | null;
  paymentAccountName: string | null;
  paymentAccountNumber: string | null;
  memberLimit: number;
  contributedAmount: number;
  eventDate: string | null;
  status: string;
  creatorId: string;
  tiers: AsoEbiTier[];
  members: AsoEbiMember[];
};

type DetailQuery = {
  circle?: {
    id: string;
    name: string;
    type: string;
    description: string;
    imageUrl?: string | null;
    imageStoragePath?: string | null;
    eventType?: string | null;
    organizerName?: string | null;
    paymentBankName?: string | null;
    paymentAccountName?: string | null;
    paymentAccountNumber?: string | null;
    memberLimit: number;
    contributedAmount: number;
    eventDate?: string | null;
    status: string;
    creator: { id: string };
  };
  asoEbiTiers: Array<{
    id: string;
    name: string;
    price: number;
    fabricDescription: string;
    fabricImageUrl?: string | null;
    fabricImageStoragePath?: string | null;
    appreciationGiftName?: string | null;
    appreciationGiftImageUrl?: string | null;
    appreciationGiftImageStoragePath?: string | null;
    availabilityNote?: string | null;
    deliveryDetails?: string | null;
    sortOrder: number;
  }>;
  circleMemberships: Array<{
    role: string;
    membershipStatus: string;
    contributionStatus: string;
    fulfilmentStatus: string;
    expectedAmount: number;
    confirmedAmount: number;
    selectedAsoEbiTier?: { id: string; name: string; price: number } | null;
    user: {
      id: string;
      displayName: string;
      email?: string | null;
      profileImage?: string | null;
    };
  }>;
};

async function queryDetail(circleId: string) {
  return getBondCircleDataConnect().executeQuery<
    DetailQuery,
    { circleId: string }
  >("GetAsoEbiCircleDetail", { circleId });
}

export async function configureAsoEbiCircle(input: {
  circleId: string;
  actorId: string;
  eventType: string;
  organizerName: string;
  paymentBankName: string;
  paymentAccountName: string;
  paymentAccountNumber: string;
  imageUrl: string;
  imageStoragePath: string;
}) {
  await getBondCircleDataConnect().executeMutation("ConfigureAsoEbiCircle", {
    ...input,
    updatedAt: new Date().toISOString(),
  });
}

export async function createAsoEbiTier(input: {
  tierId: string;
  circleId: string;
  name: string;
  price: number;
  fabricDescription: string;
  fabricImageUrl: string | null;
  fabricImageStoragePath: string | null;
  appreciationGiftName: string | null;
  appreciationGiftImageUrl: string | null;
  appreciationGiftImageStoragePath: string | null;
  availabilityNote: string | null;
  deliveryDetails: string | null;
  sortOrder: number;
}) {
  await getBondCircleDataConnect().executeMutation("CreateAsoEbiTier", {
    ...input,
    createdAt: new Date().toISOString(),
  });
}

export async function loadAsoEbiCircle(
  circleId: string,
  viewerId: string,
): Promise<AsoEbiCircleDetail | null> {
  const response = await queryDetail(circleId);
  const circle = response.data.circle;
  if (!circle || circle.type !== "aso-ebi") return null;
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
    eventType: circle.eventType ?? "other",
    organizerName: circle.organizerName ?? "Organizer",
    paymentBankName: circle.paymentBankName ?? null,
    paymentAccountName: circle.paymentAccountName ?? null,
    paymentAccountNumber: circle.paymentAccountNumber ?? null,
    eventDate: circle.eventDate ?? null,
    creatorId: circle.creator.id,
    tiers: response.data.asoEbiTiers.map((tier) => ({
      ...tier,
      fabricImageUrl: tier.fabricImageUrl ?? null,
      fabricImageStoragePath: tier.fabricImageStoragePath ?? null,
      appreciationGiftName: tier.appreciationGiftName ?? null,
      appreciationGiftImageUrl: tier.appreciationGiftImageUrl ?? null,
      appreciationGiftImageStoragePath:
        tier.appreciationGiftImageStoragePath ?? null,
      availabilityNote: tier.availabilityNote ?? null,
      deliveryDetails: tier.deliveryDetails ?? null,
    })),
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
        fulfilmentStatus: membership.fulfilmentStatus as AsoEbiFulfilmentStatus,
        expectedAmount: membership.expectedAmount,
        confirmedAmount: membership.confirmedAmount,
        selectedTier: membership.selectedAsoEbiTier ?? null,
      })),
  };
}

export async function selectAsoEbiTier(input: {
  circleId: string;
  memberId: string;
  tierId: string;
}) {
  const response = await queryDetail(input.circleId);
  const tier = response.data.asoEbiTiers.find(
    (candidate) => candidate.id === input.tierId,
  );
  const membership = response.data.circleMemberships.find(
    (candidate) => candidate.user.id === input.memberId,
  );
  if (!response.data.circle || !tier || !membership) {
    throw new Error("The tier or circle membership was not found.");
  }
  if (response.data.circle.type !== "aso-ebi") {
    throw new Error("Tier selection is available only in an Aso-Ebi Circle.");
  }
  if (
    ["cancelled", "completed", "archived"].includes(response.data.circle.status)
  ) {
    throw new Error("Tier selection is closed for this circle.");
  }
  await getBondCircleDataConnect().executeMutation("SelectAsoEbiTier", {
    circleId: input.circleId,
    memberId: input.memberId,
    tierId: input.tierId,
    expectedAmount: tier.price,
    updatedAt: new Date().toISOString(),
  });
}

export async function updateAsoEbiFulfilment(input: {
  circleId: string;
  actorId: string;
  memberId: string;
  status: AsoEbiFulfilmentStatus;
}) {
  const response = await queryDetail(input.circleId);
  const circle = response.data.circle;
  const actor = response.data.circleMemberships.find(
    (candidate) => candidate.user.id === input.actorId,
  );
  const member = response.data.circleMemberships.find(
    (candidate) => candidate.user.id === input.memberId,
  );
  if (!circle || !actor || !member) throw new Error("Circle member not found.");
  if (circle.type !== "aso-ebi") {
    throw new Error(
      "Delivery tracking is available only in an Aso-Ebi Circle.",
    );
  }
  if (["cancelled", "completed", "archived"].includes(circle.status)) {
    throw new Error("Delivery updates are closed for this circle.");
  }
  if (circle.creator.id !== input.actorId && actor.role !== "co_admin") {
    throw new Error("Only the creator or a co-admin can update delivery.");
  }
  assertFulfilmentTransition(
    member.fulfilmentStatus as AsoEbiFulfilmentStatus,
    input.status,
  );
  await getBondCircleDataConnect().executeMutation("UpdateAsoEbiFulfilment", {
    circleId: input.circleId,
    actorId: input.actorId,
    memberId: input.memberId,
    status: input.status,
    updatedAt: new Date().toISOString(),
  });
}
