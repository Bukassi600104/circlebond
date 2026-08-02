import {
  PRICING_MODEL_VERSION,
  PRICING_FEATURES,
  calculateUpgradePriceMinor,
  pricingForCircle,
  type CirclePricingMode,
  type CirclePricingPlan,
  type PaidCirclePricingPlan,
  type PricingFeature,
} from "../../lib/circle-pricing.ts";

export const PRICING_ERROR_CODES = [
  "PLAN_UPGRADE_REQUIRED",
  "MEMBER_LIMIT_REACHED",
  "CO_ADMIN_LIMIT_REACHED",
  "ASO_EBI_TIER_LIMIT_REACHED",
  "FEATURE_NOT_INCLUDED",
  "TRIAL_ALREADY_USED",
  "INVALID_PLAN_UPGRADE",
  "ACTIVATION_REQUIRED",
  "PAYMENT_PROVIDER_UNAVAILABLE",
] as const;

export type PricingErrorCode = (typeof PRICING_ERROR_CODES)[number];

export class PricingRuleError extends Error {
  readonly code: PricingErrorCode;
  readonly status: number;

  constructor(message: string, code: PricingErrorCode, status = 409) {
    super(message);
    this.name = "PricingRuleError";
    this.code = code;
    this.status = status;
  }
}

export type CircleEntitlementContext = {
  mode: CirclePricingMode;
  plan: CirclePricingPlan | "legacy";
  memberLimit?: number;
};

export function entitlementContextForStoredCircle(circle: {
  type: string;
  pricingPlan: string;
  pricingModelVersion: string;
  memberLimit: number;
}): CircleEntitlementContext {
  if (
    !(["gift", "aso-ebi", "support"] as const).includes(
      circle.type as CirclePricingMode,
    )
  ) {
    throw new Error("Unsupported circle type.");
  }
  if (circle.pricingModelVersion !== PRICING_MODEL_VERSION) {
    return {
      mode: circle.type as CirclePricingMode,
      plan: "legacy",
      memberLimit: circle.memberLimit,
    };
  }
  if (
    !(["trial", "starter", "standard", "premium"] as const).includes(
      circle.pricingPlan as CirclePricingPlan,
    )
  ) {
    throw new Error("The circle has an invalid model-specific pricing plan.");
  }
  return {
    mode: circle.type as CirclePricingMode,
    plan: circle.pricingPlan as CirclePricingPlan,
  };
}

export type CircleEntitlementProfile = {
  mode: CirclePricingMode;
  plan: CirclePricingPlan | "legacy";
  memberLimit: number;
  coAdminLimit: number;
  asoEbiTierLimit: number;
  features: ReadonlySet<PricingFeature>;
  grandfathered: boolean;
};

const LEGACY_FEATURES = new Set<PricingFeature>(PRICING_FEATURES);

export function entitlementProfile(
  context: CircleEntitlementContext,
): CircleEntitlementProfile {
  if (context.plan === "legacy") {
    if (
      !Number.isInteger(context.memberLimit) ||
      (context.memberLimit ?? 0) < 1 ||
      (context.memberLimit ?? 0) > 100
    ) {
      throw new Error(
        "A grandfathered circle requires its stored member limit.",
      );
    }
    return {
      mode: context.mode,
      plan: "legacy",
      memberLimit: context.memberLimit as number,
      // Existing circles retain the pre-migration behavior rather than being
      // locked by a newly introduced limit.
      coAdminLimit: Number.MAX_SAFE_INTEGER,
      asoEbiTierLimit: context.mode === "aso-ebi" ? 20 : 0,
      features: LEGACY_FEATURES,
      grandfathered: true,
    };
  }

  const definition = pricingForCircle(context.mode, context.plan);
  return {
    mode: context.mode,
    plan: context.plan,
    memberLimit: definition.memberLimit,
    coAdminLimit: definition.coAdminLimit,
    asoEbiTierLimit: definition.asoEbiTierLimit,
    features: definition.entitlements,
    grandfathered: false,
  };
}

export function hasEntitlement(
  context: CircleEntitlementContext,
  feature: PricingFeature,
) {
  return entitlementProfile(context).features.has(feature);
}

export function assertEntitlement(
  context: CircleEntitlementContext,
  feature: PricingFeature,
) {
  if (!hasEntitlement(context, feature)) {
    throw new PricingRuleError(
      "This feature is not included in the circle's current plan.",
      "FEATURE_NOT_INCLUDED",
    );
  }
}

export function assertMemberCapacity(
  context: CircleEntitlementContext,
  currentMembers: number,
  additions = 1,
) {
  const { memberLimit } = entitlementProfile(context);
  if (
    !Number.isInteger(currentMembers) ||
    !Number.isInteger(additions) ||
    currentMembers < 0 ||
    additions < 0 ||
    currentMembers + additions > memberLimit
  ) {
    throw new PricingRuleError(
      `This plan supports up to ${memberLimit} total members.`,
      "MEMBER_LIMIT_REACHED",
    );
  }
}

export function assertCoAdminCapacity(
  context: CircleEntitlementContext,
  currentCoAdmins: number,
  additions = 1,
) {
  const { coAdminLimit } = entitlementProfile(context);
  if (
    !Number.isInteger(currentCoAdmins) ||
    !Number.isInteger(additions) ||
    currentCoAdmins < 0 ||
    additions < 0 ||
    currentCoAdmins + additions > coAdminLimit
  ) {
    throw new PricingRuleError(
      coAdminLimit === 0
        ? "Co-admins are not included in this plan."
        : `This plan supports up to ${coAdminLimit} co-admins.`,
      "CO_ADMIN_LIMIT_REACHED",
    );
  }
}

export function assertAsoEbiTierCapacity(
  context: CircleEntitlementContext,
  tierCount: number,
) {
  const { asoEbiTierLimit } = entitlementProfile(context);
  if (
    context.mode !== "aso-ebi" ||
    !Number.isInteger(tierCount) ||
    tierCount < 1 ||
    tierCount > asoEbiTierLimit
  ) {
    throw new PricingRuleError(
      `This Aso-Ebi plan supports up to ${asoEbiTierLimit} tiers.`,
      "ASO_EBI_TIER_LIMIT_REACHED",
    );
  }
}

export function assertTrialAvailable(alreadyUsed: boolean) {
  if (alreadyUsed) {
    throw new PricingRuleError(
      "The one-time first-circle trial has already been used by this account.",
      "TRIAL_ALREADY_USED",
    );
  }
}

export function upgradePriceMinor(
  context: CircleEntitlementContext,
  targetPlan: PaidCirclePricingPlan,
  currentActivatedListPriceMinor?: number,
) {
  if (context.plan === "legacy") {
    throw new PricingRuleError(
      "A grandfathered circle cannot be repriced automatically.",
      "INVALID_PLAN_UPGRADE",
    );
  }
  try {
    const catalogDifference = calculateUpgradePriceMinor(
      context.mode,
      context.plan,
      targetPlan,
    );
    if (currentActivatedListPriceMinor === undefined) return catalogDifference;
    if (
      !Number.isInteger(currentActivatedListPriceMinor) ||
      currentActivatedListPriceMinor < 0
    ) {
      throw new Error("The historical activation price is invalid.");
    }
    const targetPriceMinor = pricingForCircle(
      context.mode,
      targetPlan,
    ).priceMinor;
    const amountDueMinor = targetPriceMinor - currentActivatedListPriceMinor;
    if (amountDueMinor <= 0) {
      throw new Error("The target plan must cost more than the active plan.");
    }
    return amountDueMinor;
  } catch (error) {
    throw new PricingRuleError(
      error instanceof Error ? error.message : "Choose a valid higher plan.",
      "INVALID_PLAN_UPGRADE",
    );
  }
}
