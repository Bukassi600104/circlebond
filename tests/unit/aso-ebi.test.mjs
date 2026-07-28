import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  ASO_EBI_EVENT_TYPES,
  ASO_EBI_FULFILMENT_STATUSES,
  assertAsoEbiTiers,
  assertFulfilmentTransition,
} from "../../server/circles/aso-ebi.ts";

const root = new URL("../../", import.meta.url);

test("Aso-Ebi supports every approved event and fulfilment status", () => {
  assert.deepEqual(ASO_EBI_EVENT_TYPES, [
    "wedding",
    "burial",
    "birthday",
    "anniversary",
    "thanksgiving",
    "naming_ceremony",
    "religious_event",
    "other",
  ]);
  assert.deepEqual(ASO_EBI_FULFILMENT_STATUSES, [
    "invited",
    "joined",
    "tier_selected",
    "receipt_submitted",
    "awaiting_confirmation",
    "part_paid",
    "paid",
    "preparing",
    "ready_for_collection",
    "dispatched",
    "delivered",
    "collected",
    "cancelled",
  ]);
});

test("Aso-Ebi accepts one or many custom tiers and rejects invalid tiers", () => {
  assert.deepEqual(
    assertAsoEbiTiers([
      {
        name: "Family",
        price: 25000,
        fabricDescription: "Emerald brocade",
      },
    ]),
    [
      {
        name: "Family",
        price: 25000,
        fabricDescription: "Emerald brocade",
      },
    ],
  );
  assert.equal(
    assertAsoEbiTiers(
      Array.from({ length: 6 }, (_, index) => ({
        name: `Group ${index + 1}`,
        price: 10000 + index,
        fabricDescription: "Custom fabric",
      })),
    ).length,
    6,
  );
  assert.throws(() => assertAsoEbiTiers([]), /at least one tier/i);
  assert.throws(
    () => assertAsoEbiTiers([{ name: "", price: 0, fabricDescription: "" }]),
    /valid tier/i,
  );
});

test("Aso-Ebi delivery transitions are controlled", () => {
  assert.equal(assertFulfilmentTransition("paid", "preparing"), "preparing");
  assert.equal(
    assertFulfilmentTransition("preparing", "ready_for_collection"),
    "ready_for_collection",
  );
  assert.equal(
    assertFulfilmentTransition("dispatched", "delivered"),
    "delivered",
  );
  assert.throws(
    () => assertFulfilmentTransition("invited", "delivered"),
    /cannot move/i,
  );
});

test("Aso-Ebi persistence, creation, tier selection and fulfilment controls are wired", async () => {
  const schema = await readFile(
    new URL("dataconnect/schema/schema.gql", root),
    "utf8",
  );
  const operations = await readFile(
    new URL("dataconnect/bondcircle/queries.gql", root),
    "utf8",
  );
  const form = await readFile(
    new URL("components/aso-ebi/AsoEbiCircleForm.tsx", root),
    "utf8",
  );
  const view = await readFile(
    new URL("components/aso-ebi/AsoEbiCircleView.tsx", root),
    "utf8",
  );
  const createRoute = await readFile(
    new URL("app/api/circles/aso-ebi/route.ts", root),
    "utf8",
  );
  const tierRoute = await readFile(
    new URL("app/api/circles/[circleId]/aso-ebi/tier/route.ts", root),
    "utf8",
  );
  const fulfilmentRoute = await readFile(
    new URL("app/api/circles/[circleId]/aso-ebi/fulfilment/route.ts", root),
    "utf8",
  );

  for (const field of [
    "eventType",
    "organizerName",
    "fulfilmentStatus",
    "selectedAsoEbiTier",
    "type AsoEbiTier",
    "appreciationGiftName",
    "deliveryDetails",
  ]) {
    assert.match(schema, new RegExp(field));
  }
  assert.match(operations, /query GetAsoEbiCircleDetail/);
  assert.match(operations, /mutation ConfigureAsoEbiCircle/);
  assert.match(operations, /mutation CreateAsoEbiTier/);
  assert.match(operations, /mutation SelectAsoEbiTier/);
  assert.match(operations, /mutation UpdateAsoEbiFulfilment/);
  assert.match(form, /Add another tier/i);
  assert.match(form, /name="eventType"/);
  assert.match(form, /name="pricingPlan"/);
  assert.match(form, /name="memberCapacity"/);
  assert.match(view, /Choose this tier/i);
  assert.match(view, /Update delivery status/i);
  assert.match(createRoute, /assertAsoEbiTiers/);
  assert.match(tierRoute, /selectAsoEbiTier/);
  assert.match(fulfilmentRoute, /updateAsoEbiFulfilment/);
});
