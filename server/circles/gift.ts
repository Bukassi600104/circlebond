export const GIFT_CONTRIBUTION_MODES = ["equal", "custom"] as const;
export type GiftContributionMode = (typeof GIFT_CONTRIBUTION_MODES)[number];

export const GIFT_MEMBER_STATUSES = [
  "invited",
  "joined",
  "pledged",
  "receipt_submitted",
  "awaiting_confirmation",
  "part_paid",
  "paid",
  "declined",
  "removed",
] as const;

export function pricingPlanForCapacity(capacity: number) {
  return planForMemberCount("gift", capacity);
}

export function calculateEqualSlotAllocations(
  targetAmount: number,
  capacity: number,
) {
  pricingPlanForCapacity(capacity);
  return calculateEqualAllocations(
    targetAmount,
    Array.from({ length: capacity }, (_, index) => `slot-${index + 1}`),
  ).map(({ expectedAmount }) => expectedAmount);
}

export function calculateEqualAllocations(
  targetAmount: number,
  memberIds: string[],
) {
  if (!Number.isInteger(targetAmount) || targetAmount < 1) {
    throw new Error("Target amount must be a positive whole number.");
  }
  if (memberIds.length < 1) throw new Error("A creator is required.");
  const base = Math.floor(targetAmount / memberIds.length);
  let remainder = targetAmount % memberIds.length;
  return memberIds.map((memberId) => ({
    memberId,
    expectedAmount: base + (remainder-- > 0 ? 1 : 0),
  }));
}

export function validateCustomAllocations(
  targetAmount: number,
  allocations: Array<{ memberId: string; expectedAmount: number }>,
) {
  if (
    allocations.some(
      ({ expectedAmount }) =>
        !Number.isInteger(expectedAmount) || expectedAmount < 0,
    )
  ) {
    throw new Error("Custom contributions must be whole positive amounts.");
  }
  const total = allocations.reduce(
    (sum, allocation) => sum + allocation.expectedAmount,
    0,
  );
  if (total !== targetAmount) {
    throw new Error("Custom contributions must add up to the target amount.");
  }
  return allocations;
}
import { planForMemberCount } from "../../lib/circle-pricing.ts";
