import assert from "node:assert/strict";
import test from "node:test";
import {
  MODEL_SPECIFIC_PRICING,
  calculateUpgradePriceMinor,
  formatMinorNaira,
  planForMemberCount,
  pricingForCircle,
} from "../../lib/circle-pricing.ts";
import {
  PricingRuleError,
  assertAsoEbiTierCapacity,
  assertCoAdminCapacity,
  assertEntitlement,
  assertMemberCapacity,
  assertTrialAvailable,
  entitlementProfile,
  entitlementContextForStoredCircle,
  upgradePriceMinor,
} from "../../server/pricing/entitlements.ts";

test("approved prices are model-specific and stored in NGN minor units", () => {
  assert.deepEqual(
    Object.fromEntries(
      Object.entries(MODEL_SPECIFIC_PRICING).map(([mode, plans]) => [
        mode,
        Object.fromEntries(
          Object.entries(plans).map(([tier, plan]) => [tier, plan.priceMinor]),
        ),
      ]),
    ),
    {
      gift: {
        trial: 0,
        starter: 150_000,
        standard: 350_000,
        premium: 750_000,
      },
      "aso-ebi": {
        trial: 0,
        starter: 350_000,
        standard: 750_000,
        premium: 1_500_000,
      },
      support: {
        trial: 0,
        starter: 100_000,
        standard: 250_000,
        premium: 500_000,
      },
    },
  );
  assert.equal(formatMinorNaira(1_500_000), "₦15,000");
});

test("member and co-admin limits match each mode and plan", () => {
  const cases = [
    ["gift", "starter", 10, 0],
    ["gift", "standard", 30, 1],
    ["gift", "premium", 100, 3],
    ["aso-ebi", "starter", 10, 0],
    ["aso-ebi", "standard", 30, 1],
    ["aso-ebi", "premium", 100, 4],
    ["support", "starter", 10, 0],
    ["support", "standard", 30, 1],
    ["support", "premium", 100, 3],
  ];
  for (const [mode, plan, members, coAdmins] of cases) {
    const profile = entitlementProfile({ mode, plan });
    assert.equal(profile.memberLimit, members);
    assert.equal(profile.coAdminLimit, coAdmins);
    assert.doesNotThrow(() => assertMemberCapacity({ mode, plan }, members, 0));
    assert.throws(
      () => assertMemberCapacity({ mode, plan }, members, 1),
      (error) => error.code === "MEMBER_LIMIT_REACHED",
    );
    assert.doesNotThrow(() =>
      assertCoAdminCapacity({ mode, plan }, coAdmins, 0),
    );
    assert.throws(
      () => assertCoAdminCapacity({ mode, plan }, coAdmins, 1),
      (error) => error.code === "CO_ADMIN_LIMIT_REACHED",
    );
  }
});

test("Aso-Ebi tier limits are 1, 3 and 8", () => {
  assert.doesNotThrow(() =>
    assertAsoEbiTierCapacity({ mode: "aso-ebi", plan: "starter" }, 1),
  );
  assert.doesNotThrow(() =>
    assertAsoEbiTierCapacity({ mode: "aso-ebi", plan: "standard" }, 3),
  );
  assert.doesNotThrow(() =>
    assertAsoEbiTierCapacity({ mode: "aso-ebi", plan: "premium" }, 8),
  );
  assert.throws(
    () => assertAsoEbiTierCapacity({ mode: "aso-ebi", plan: "standard" }, 4),
    (error) => error.code === "ASO_EBI_TIER_LIMIT_REACHED",
  );
});

test("feature gates differ by mode and plan", () => {
  assert.throws(
    () =>
      assertEntitlement(
        { mode: "gift", plan: "starter" },
        "custom_contributions",
      ),
    (error) => error.code === "FEATURE_NOT_INCLUDED",
  );
  assert.doesNotThrow(() =>
    assertEntitlement(
      { mode: "gift", plan: "standard" },
      "custom_contributions",
    ),
  );
  assert.throws(() =>
    assertEntitlement(
      { mode: "support", plan: "starter" },
      "support_approval_required_membership",
    ),
  );
  assert.doesNotThrow(() =>
    assertEntitlement(
      { mode: "support", plan: "standard" },
      "support_approval_required_membership",
    ),
  );
  assert.doesNotThrow(() =>
    assertEntitlement(
      { mode: "support", plan: "premium" },
      "support_public_progress",
    ),
  );
});

test("one-time trial and capacity rules are explicit", () => {
  assert.equal(planForMemberCount("gift", 3), "trial");
  assert.equal(planForMemberCount("gift", 3, false), "starter");
  assert.doesNotThrow(() => assertTrialAvailable(false));
  assert.throws(
    () => assertTrialAvailable(true),
    (error) =>
      error instanceof PricingRuleError && error.code === "TRIAL_ALREADY_USED",
  );
});

test("upgrades charge only the approved same-mode difference", () => {
  assert.equal(
    calculateUpgradePriceMinor("gift", "starter", "standard"),
    200_000,
  );
  assert.equal(
    calculateUpgradePriceMinor("support", "trial", "premium"),
    500_000,
  );
  assert.equal(
    upgradePriceMinor({ mode: "aso-ebi", plan: "standard" }, "premium"),
    750_000,
  );
  assert.equal(
    upgradePriceMinor({ mode: "gift", plan: "standard" }, "premium", 300_000),
    450_000,
  );
  assert.throws(
    () => calculateUpgradePriceMinor("gift", "premium", "standard"),
    /higher plan/i,
  );
});

test("grandfathered circles retain their stored capacity and existing features", () => {
  const legacy = entitlementProfile({
    mode: "aso-ebi",
    plan: "legacy",
    memberLimit: 30,
  });
  assert.equal(legacy.memberLimit, 30);
  assert.equal(legacy.asoEbiTierLimit, 20);
  assert.equal(legacy.grandfathered, true);
  assert.doesNotThrow(() =>
    assertEntitlement(
      { mode: "aso-ebi", plan: "legacy", memberLimit: 30 },
      "aso_ebi_member_export",
    ),
  );
});

test("stored legacy circles cannot be mistaken for the retired universal price", () => {
  assert.deepEqual(
    entitlementContextForStoredCircle({
      type: "gift",
      pricingPlan: "free",
      pricingModelVersion: "legacy_universal_v1",
      memberLimit: 3,
    }),
    { mode: "gift", plan: "legacy", memberLimit: 3 },
  );
  assert.deepEqual(
    entitlementContextForStoredCircle({
      type: "support",
      pricingPlan: "standard",
      pricingModelVersion: "model_specific_v1",
      memberLimit: 30,
    }),
    { mode: "support", plan: "standard" },
  );
});

test("contributors are not assigned an activation charge", () => {
  for (const mode of ["gift", "aso-ebi", "support"]) {
    for (const plan of ["trial", "starter", "standard", "premium"]) {
      const definition = pricingForCircle(mode, plan);
      assert.ok(definition.priceMinor >= 0);
    }
  }
});
