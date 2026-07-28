export const CIRCLE_PRICING_PLANS = {
  free: {
    activationPrice: 0,
    memberLimit: 3,
  },
  starter: {
    activationPrice: 1_000,
    memberLimit: 10,
  },
  standard: {
    activationPrice: 2_000,
    memberLimit: 30,
  },
  premium: {
    activationPrice: 3_500,
    memberLimit: 100,
  },
} as const;

export type CirclePricingPlan = keyof typeof CIRCLE_PRICING_PLANS;

export function planForMemberCount(memberCount: number) {
  if (!Number.isInteger(memberCount) || memberCount < 2 || memberCount > 100) {
    throw new Error("Circle size must be between 2 and 100 people.");
  }
  return Object.entries(CIRCLE_PRICING_PLANS).find(
    ([, plan]) => memberCount <= plan.memberLimit,
  )?.[0] as CirclePricingPlan;
}
