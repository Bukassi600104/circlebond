import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  CIRCLE_STATES,
  PRICING_PLANS,
  assertActivityAllowed,
  assertMemberLimit,
  assertPermission,
  getActivationCharge,
  transitionCircle,
} from "../../server/circles/engine.ts";

const root = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("all approved circle states are represented", () => {
  assert.deepEqual(CIRCLE_STATES, [
    "draft",
    "published",
    "active",
    "target_reached",
    "fulfilment",
    "completed",
    "cancelled",
    "archived",
    "purged",
  ]);
});

test("the shared lifecycle permits only approved forward transitions", () => {
  assert.equal(transitionCircle("draft", "published"), "published");
  assert.equal(transitionCircle("published", "active"), "active");
  assert.equal(transitionCircle("active", "target_reached"), "target_reached");
  assert.equal(transitionCircle("target_reached", "fulfilment"), "fulfilment");
  assert.equal(transitionCircle("fulfilment", "completed"), "completed");
  assert.equal(transitionCircle("completed", "archived"), "archived");
  assert.equal(transitionCircle("cancelled", "archived"), "archived");
  assert.equal(transitionCircle("archived", "purged"), "purged");
  assert.throws(
    () => transitionCircle("draft", "completed"),
    /Invalid circle state transition/,
  );
  assert.throws(
    () => transitionCircle("purged", "active"),
    /Invalid circle state transition/,
  );
});

test("creator-only state controls and limited co-admin permissions are enforced", () => {
  for (const action of ["publish", "complete", "cancel", "archive", "purge"]) {
    assert.doesNotThrow(() => assertPermission("creator", action));
    assert.throws(() => assertPermission("co_admin", action), /permission/i);
    assert.throws(() => assertPermission("member", action), /permission/i);
  }

  assert.doesNotThrow(() => assertPermission("co_admin", "manage_members"));
  assert.doesNotThrow(() => assertPermission("co_admin", "record_activity"));
  assert.throws(
    () => assertPermission("co_admin", "edit_configuration"),
    /permission/i,
  );
  assert.throws(
    () => assertPermission("member", "edit_configuration"),
    /permission/i,
  );
});

test("pricing and member limits match the approved tiers", () => {
  const expectedPrices = {
    gift: { trial: 0, starter: 150_000, standard: 350_000, premium: 750_000 },
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
  };

  for (const [mode, plans] of Object.entries(PRICING_PLANS)) {
    for (const [plan, rules] of Object.entries(plans)) {
      assert.equal(rules.priceMinor, expectedPrices[mode][plan]);
      assert.equal(
        getActivationCharge(mode, plan, "creator"),
        rules.priceMinor,
      );
      assert.equal(getActivationCharge(mode, plan, "member"), 0);
      assert.doesNotThrow(() =>
        assertMemberLimit(mode, plan, rules.memberLimit - 1, 1),
      );
      assert.throws(
        () => assertMemberLimit(mode, plan, rules.memberLimit, 1),
        /member limit/i,
      );
    }
  }
});

test("cancelled circles reject all new activity", () => {
  assert.throws(() => assertActivityAllowed("cancelled"), /cannot accept/i);
  assert.doesNotThrow(() => assertActivityAllowed("active"));
});

test("Firebase persistence includes shared fields and transactional audits", async () => {
  const schema = await source("dataconnect/schema/schema.gql");
  const operations = await source("dataconnect/bondcircle/queries.gql");
  const repository = await source("server/repositories/circles.ts");

  for (const field of [
    "description",
    "pricingPlan",
    "memberLimit",
    "activationPrice",
    "activationPriceMinor",
    "pricingModelVersion",
    "activationStatus",
    "visibility",
    "completedAt",
    "archiveAt",
    "purgeAt",
  ]) {
    assert.match(schema, new RegExp(`${field}:`));
  }
  assert.match(schema, /type CircleAuditEntry @table/);
  assert.match(schema, /type PricingPlanDefinition @table/);
  assert.match(schema, /type CircleActivation @table/);
  assert.match(schema, /type CreatorTrialUsage @table/);
  assert.match(operations, /mutation CreateCircleDraft[\s\S]*@transaction/);
  assert.match(
    operations,
    /mutation UpdateCircleConfigurationWithAudit[\s\S]*@transaction/,
  );
  assert.match(
    operations,
    /mutation TransitionCircleWithAudit[\s\S]*@transaction/,
  );
  assert.match(
    operations,
    /mutation AddCircleMemberWithAudit[\s\S]*@transaction/,
  );
  assert.match(repository, /executeMutation/);
  assert.doesNotMatch(repository, /mock|fixture|sample/i);
});
