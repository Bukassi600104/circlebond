export const CIRCLE_PRICING_MODES = ["gift", "aso-ebi", "support"] as const;
export const CIRCLE_PRICING_TIERS = [
  "trial",
  "starter",
  "standard",
  "premium",
] as const;
export const PAID_CIRCLE_PRICING_TIERS = [
  "starter",
  "standard",
  "premium",
] as const;

export type CirclePricingMode = (typeof CIRCLE_PRICING_MODES)[number];
export type CirclePricingPlan = (typeof CIRCLE_PRICING_TIERS)[number];
export type PaidCirclePricingPlan = (typeof PAID_CIRCLE_PRICING_TIERS)[number];

export const PRICING_CURRENCY = "NGN" as const;
export const PRICING_MINOR_UNIT_SCALE = 100 as const;
export const PRICING_MODEL_VERSION = "model_specific_v1" as const;
export const PRICING_EFFECTIVE_AT = "2026-08-02T00:00:00.000Z" as const;

export const PRICING_FEATURES = [
  "custom_contributions",
  "bulk_invitations",
  "bulk_reminders",
  "downloadable_summary",
  "advanced_reports",
  "circle_duplication",
  "custom_invitation_message",
  "multiple_reminder_schedules",
  "expanded_announcement_controls",
  "basic_member_filtering",
  "advanced_member_filtering",
  "expanded_operational_controls",
  "aso_ebi_tier_gifts",
  "aso_ebi_quantity_tracking",
  "aso_ebi_delivery_lists",
  "aso_ebi_member_export",
  "aso_ebi_fulfilment_report",
  "aso_ebi_batch_delivery",
  "aso_ebi_custom_member_fields",
  "aso_ebi_reconciliation_report",
  "aso_ebi_branded_invitation",
  "support_approval_required_membership",
  "support_hidden_individual_amounts",
  "support_expanded_privacy",
  "support_public_progress",
  "support_multiple_beneficiary_updates",
  "support_enhanced_moderation",
  "priority_support",
] as const;

export type PricingFeature = (typeof PRICING_FEATURES)[number];

export type CirclePlanDefinition = {
  id: string;
  mode: CirclePricingMode;
  tier: CirclePricingPlan;
  currency: typeof PRICING_CURRENCY;
  priceMinor: number;
  memberLimit: number;
  coAdminLimit: number;
  asoEbiTierLimit: number;
  entitlements: ReadonlySet<PricingFeature>;
  inclusions: readonly string[];
  exclusions: readonly string[];
};

const featureSet = (...features: PricingFeature[]) =>
  new Set<PricingFeature>(features);

const trial = (
  mode: CirclePricingMode,
  id: string,
  inclusions: readonly string[],
): CirclePlanDefinition => ({
  id,
  mode,
  tier: "trial",
  currency: PRICING_CURRENCY,
  priceMinor: 0,
  memberLimit: 3,
  coAdminLimit: 0,
  asoEbiTierLimit: mode === "aso-ebi" ? 1 : 0,
  entitlements: featureSet(),
  inclusions,
  exclusions: [
    "Available once per creator account",
    "No co-admins",
    "No advanced, bulk, reporting or duplication features",
  ],
});

export const MODEL_SPECIFIC_PRICING: Readonly<
  Record<
    CirclePricingMode,
    Readonly<Record<CirclePricingPlan, CirclePlanDefinition>>
  >
> = {
  gift: {
    trial: trial("gift", "gift_trial_v1_2026_08_02", [
      "One free first circle",
      "Up to 3 total members",
      "Gift details, secure invitations and receipts",
      "Equal contribution split and basic reminders",
    ]),
    starter: {
      id: "gift_starter_v1_2026_08_02",
      mode: "gift",
      tier: "starter",
      currency: PRICING_CURRENCY,
      priceMinor: 150_000,
      memberLimit: 10,
      coAdminLimit: 0,
      asoEbiTierLimit: 0,
      entitlements: featureSet(),
      inclusions: [
        "Up to 10 total members",
        "Equal contribution split",
        "Secure invitations and receipt review",
        "Partial tracking, basic reminders and communication",
      ],
      exclusions: [
        "Custom contribution amounts",
        "Co-admins, bulk tools, reports and duplication",
        "Advanced filtering and custom invitation messages",
      ],
    },
    standard: {
      id: "gift_standard_v1_2026_08_02",
      mode: "gift",
      tier: "standard",
      currency: PRICING_CURRENCY,
      priceMinor: 350_000,
      memberLimit: 30,
      coAdminLimit: 1,
      asoEbiTierLimit: 0,
      entitlements: featureSet(
        "custom_contributions",
        "bulk_invitations",
        "bulk_reminders",
        "downloadable_summary",
        "expanded_announcement_controls",
        "basic_member_filtering",
        "custom_invitation_message",
      ),
      inclusions: [
        "Up to 30 total members and 1 co-admin",
        "Custom contribution amounts",
        "Bulk invitations and reminders",
        "Completion summary, filtering and custom invite message",
      ],
      exclusions: [
        "Advanced reporting and filtering",
        "Multiple reminder schedules",
        "Circle duplication and expanded operational controls",
      ],
    },
    premium: {
      id: "gift_premium_v1_2026_08_02",
      mode: "gift",
      tier: "premium",
      currency: PRICING_CURRENCY,
      priceMinor: 750_000,
      memberLimit: 100,
      coAdminLimit: 3,
      asoEbiTierLimit: 0,
      entitlements: featureSet(
        "custom_contributions",
        "bulk_invitations",
        "bulk_reminders",
        "downloadable_summary",
        "advanced_reports",
        "circle_duplication",
        "custom_invitation_message",
        "multiple_reminder_schedules",
        "expanded_announcement_controls",
        "basic_member_filtering",
        "advanced_member_filtering",
        "expanded_operational_controls",
        "priority_support",
      ),
      inclusions: [
        "Up to 100 total members and 3 co-admins",
        "Advanced filtering and detailed reports",
        "Multiple reminder schedules and circle duplication",
        "Expanded operational controls and priority support",
      ],
      exclusions: [],
    },
  },
  "aso-ebi": {
    trial: trial("aso-ebi", "aso_ebi_trial_v1_2026_08_02", [
      "One free first circle",
      "Up to 3 total members and 1 Aso-Ebi tier",
      "Fabric, price, appreciation gift and receipt tracking",
      "Basic delivery status, reminders and communication",
    ]),
    starter: {
      id: "aso_ebi_starter_v1_2026_08_02",
      mode: "aso-ebi",
      tier: "starter",
      currency: PRICING_CURRENCY,
      priceMinor: 350_000,
      memberLimit: 10,
      coAdminLimit: 0,
      asoEbiTierLimit: 1,
      entitlements: featureSet(),
      inclusions: [
        "Up to 10 total members and 1 Aso-Ebi tier",
        "Fabric image, description, price and appreciation gift",
        "Receipts, partial payments and creator review",
        "Basic delivery status, reminders and communication",
      ],
      exclusions: [
        "Additional tiers and co-admins",
        "Quantity tracking, exports, reports and batch delivery",
        "Custom member fields and branded invitation page",
      ],
    },
    standard: {
      id: "aso_ebi_standard_v1_2026_08_02",
      mode: "aso-ebi",
      tier: "standard",
      currency: PRICING_CURRENCY,
      priceMinor: 750_000,
      memberLimit: 30,
      coAdminLimit: 1,
      asoEbiTierLimit: 3,
      entitlements: featureSet(
        "bulk_reminders",
        "aso_ebi_tier_gifts",
        "aso_ebi_quantity_tracking",
        "aso_ebi_delivery_lists",
        "aso_ebi_member_export",
        "aso_ebi_fulfilment_report",
      ),
      inclusions: [
        "Up to 30 total members, 3 tiers and 1 co-admin",
        "Different appreciation gifts per tier",
        "Quantity tracking, bulk reminders and delivery lists",
        "Member export and basic fulfilment report",
      ],
      exclusions: [
        "Batch delivery and advanced reconciliation",
        "Custom member fields and branded invitation page",
        "Priority support",
      ],
    },
    premium: {
      id: "aso_ebi_premium_v1_2026_08_02",
      mode: "aso-ebi",
      tier: "premium",
      currency: PRICING_CURRENCY,
      priceMinor: 1_500_000,
      memberLimit: 100,
      coAdminLimit: 4,
      asoEbiTierLimit: 8,
      entitlements: featureSet(
        "bulk_reminders",
        "advanced_reports",
        "aso_ebi_tier_gifts",
        "aso_ebi_quantity_tracking",
        "aso_ebi_delivery_lists",
        "aso_ebi_member_export",
        "aso_ebi_fulfilment_report",
        "aso_ebi_batch_delivery",
        "aso_ebi_custom_member_fields",
        "aso_ebi_reconciliation_report",
        "aso_ebi_branded_invitation",
        "priority_support",
      ),
      inclusions: [
        "Up to 100 total members, 8 tiers and 4 co-admins",
        "Batch delivery and custom member fields",
        "Advanced reports and downloadable reconciliation",
        "Custom-branded invitation page and priority support",
      ],
      exclusions: [],
    },
  },
  support: {
    trial: trial("support", "support_trial_v1_2026_08_02", [
      "One free first circle",
      "Up to 3 total members",
      "Support and beneficiary details with receipt review",
      "Basic privacy, reminders and communication",
    ]),
    starter: {
      id: "support_starter_v1_2026_08_02",
      mode: "support",
      tier: "starter",
      currency: PRICING_CURRENCY,
      priceMinor: 100_000,
      memberLimit: 10,
      coAdminLimit: 0,
      asoEbiTierLimit: 0,
      entitlements: featureSet(),
      inclusions: [
        "Up to 10 total members",
        "Support, beneficiary, target and deadline details",
        "Receipt confirmation and basic privacy",
        "Reminders, communication, completion and retention",
      ],
      exclusions: [
        "Co-admins and approval-required membership",
        "Custom amounts, hidden individual amounts and bulk reminders",
        "Reports, advanced privacy and public progress",
      ],
    },
    standard: {
      id: "support_standard_v1_2026_08_02",
      mode: "support",
      tier: "standard",
      currency: PRICING_CURRENCY,
      priceMinor: 250_000,
      memberLimit: 30,
      coAdminLimit: 1,
      asoEbiTierLimit: 0,
      entitlements: featureSet(
        "custom_contributions",
        "bulk_reminders",
        "downloadable_summary",
        "support_approval_required_membership",
        "support_hidden_individual_amounts",
        "support_expanded_privacy",
      ),
      inclusions: [
        "Up to 30 total members and 1 co-admin",
        "Approval-required membership and custom amounts",
        "Hidden individual amounts and expanded privacy",
        "Bulk reminders, moderation and downloadable summary",
      ],
      exclusions: [
        "Privacy-safe public progress page",
        "Detailed reporting and multiple beneficiary updates",
        "Enhanced moderation and priority support",
      ],
    },
    premium: {
      id: "support_premium_v1_2026_08_02",
      mode: "support",
      tier: "premium",
      currency: PRICING_CURRENCY,
      priceMinor: 500_000,
      memberLimit: 100,
      coAdminLimit: 3,
      asoEbiTierLimit: 0,
      entitlements: featureSet(
        "custom_contributions",
        "bulk_reminders",
        "downloadable_summary",
        "advanced_reports",
        "support_approval_required_membership",
        "support_hidden_individual_amounts",
        "support_expanded_privacy",
        "support_public_progress",
        "support_multiple_beneficiary_updates",
        "support_enhanced_moderation",
        "priority_support",
      ),
      inclusions: [
        "Up to 100 total members and 3 co-admins",
        "Advanced privacy and optional privacy-safe public progress",
        "Detailed reports and multiple beneficiary updates",
        "Enhanced moderation and priority support",
      ],
      exclusions: [],
    },
  },
} as const;

export function isCirclePricingMode(value: string): value is CirclePricingMode {
  return CIRCLE_PRICING_MODES.includes(value as CirclePricingMode);
}

export function isCirclePricingPlan(value: string): value is CirclePricingPlan {
  return CIRCLE_PRICING_TIERS.includes(value as CirclePricingPlan);
}

export function pricingForCircle(
  mode: CirclePricingMode,
  tier: CirclePricingPlan,
): CirclePlanDefinition {
  return MODEL_SPECIFIC_PRICING[mode][tier];
}

export function plansForCircle(mode: CirclePricingMode) {
  return MODEL_SPECIFIC_PRICING[mode];
}

export function planForMemberCount(
  mode: CirclePricingMode,
  memberCount: number,
  includeTrial = true,
): CirclePricingPlan {
  if (!Number.isInteger(memberCount) || memberCount < 2 || memberCount > 100) {
    throw new Error("Circle size must be between 2 and 100 people.");
  }
  const tiers = includeTrial ? CIRCLE_PRICING_TIERS : PAID_CIRCLE_PRICING_TIERS;
  const match = tiers.find(
    (tier) => memberCount <= pricingForCircle(mode, tier).memberLimit,
  );
  if (!match) throw new Error("No pricing plan supports that circle size.");
  return match;
}

export function formatMinorNaira(priceMinor: number) {
  if (!Number.isInteger(priceMinor) || priceMinor < 0) {
    throw new Error("A price must be a non-negative integer in minor units.");
  }
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: PRICING_CURRENCY,
    maximumFractionDigits: 0,
  }).format(priceMinor / PRICING_MINOR_UNIT_SCALE);
}

export function calculateUpgradePriceMinor(
  mode: CirclePricingMode,
  currentTier: CirclePricingPlan,
  targetTier: PaidCirclePricingPlan,
) {
  const target = pricingForCircle(mode, targetTier);
  if (currentTier === "trial") return target.priceMinor;
  const current = pricingForCircle(mode, currentTier);
  const order = CIRCLE_PRICING_TIERS;
  if (order.indexOf(targetTier) <= order.indexOf(currentTier)) {
    throw new Error("Active circles can only upgrade to a higher plan.");
  }
  return target.priceMinor - current.priceMinor;
}
