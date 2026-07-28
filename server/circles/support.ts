export const SUPPORT_TYPES = [
  "burial_support",
  "medical_support",
  "emergency_support",
  "charity",
  "community_support",
  "family_support",
  "other",
] as const;

export type SupportType = (typeof SUPPORT_TYPES)[number];

export function assertSupportType(value: string): asserts value is SupportType {
  if (!SUPPORT_TYPES.includes(value as SupportType)) {
    throw new Error("Choose a valid support type.");
  }
}

export function validateSupportPledge(value: number) {
  if (!Number.isInteger(value) || value < 1 || value > 2_000_000_000) {
    throw new Error("Enter a valid support amount.");
  }
  return value;
}

export function supportAmountVisibility(input: {
  isManager: boolean;
  isSelf: boolean;
  showTargetToMembers: boolean;
  showConfirmedTotalToMembers: boolean;
  hideIndividualAmounts: boolean;
}) {
  return {
    target: input.isManager || input.showTargetToMembers,
    confirmedTotal: input.isManager || input.showConfirmedTotalToMembers,
    individualAmount:
      input.isManager || input.isSelf || !input.hideIndividualAmounts,
  };
}
