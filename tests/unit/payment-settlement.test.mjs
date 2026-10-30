import assert from "node:assert/strict";
import { createHmac, randomUUID } from "node:crypto";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";
import { PricingRuleError } from "../../server/pricing/entitlements.ts";
import {
  PaystackTestProvider,
  parsePaystackActivationReference,
  assertVerifiedPaystackTransaction,
  validPaystackSignature,
} from "../../server/pricing/paystack.ts";

const secret = "sk_test_settlement_fixture_not_a_real_key";

async function settlementHarness(
  overrides = {},
  transactionOverrides = {},
  concurrent = false,
  compactIds = false,
) {
  const id = randomUUID();
  const circleId = randomUUID();
  const attempt = {
    id: compactIds ? id.replaceAll("-", "") : id,
    circle: { id: compactIds ? circleId.replaceAll("-", "") : circleId },
    creator: { id: "payment-test-creator" },
    planDefinition: {
      id: "gift_starter_v1_2026_08_02",
      memberLimit: 10,
      priceMinor: 150000,
    },
    activationType: "paid",
    tier: "starter",
    circleType: "gift",
    amountDueMinor: 150000,
    listPriceMinor: 150000,
    pricePaidMinor: 0,
    currency: "NGN",
    provider: "paystack_test",
    providerReference: `bc-${id}`,
    status: "pending",
    ...overrides,
  };
  const transaction = {
    domain: "test",
    status: "success",
    reference: attempt.providerReference,
    currency: "NGN",
    amount: attempt.amountDueMinor,
    metadata: {
      activationId: id,
      circleId: compactIds ? circleId : attempt.circle.id,
      creatorId: attempt.creator.id,
    },
    ...transactionOverrides,
  };
  const writes = [];
  const verifiedReferences = [];
  const provider = {
    name: "paystack_test",
    verifyTransaction: async (reference) => {
      verifiedReferences.push(reference);
      return transaction;
    },
  };
  const complete = (kind) => async (input) => {
    writes.push({ kind, input });
    attempt.status = "succeeded";
    if (concurrent) throw new Error("Another settlement completed first");
  };
  const loadedModule = await loadTypescriptModule(
    "server/pricing/settlement.ts",
    {
      "server-only": {},
      "./paystack": { PaystackTestProvider, assertVerifiedPaystackTransaction },
      "./entitlements": { PricingRuleError },
      "@/server/repositories/pricing": {
        loadCircleActivationAttempt: async () => structuredClone(attempt),
        completePaidCircleActivation: complete("paid"),
        completeCirclePlanUpgrade: complete("upgrade"),
        failCircleActivationAttempt: async (input) => {
          writes.push({ kind: "failed", input });
          attempt.status = "failed";
        },
      },
    },
  );
  return {
    attempt,
    writes,
    verifiedReferences,
    settle: () => loadedModule.settlePaystackActivation(provider, id),
  };
}

test("actual settlement activates only the stored verified paid attempt", async () => {
  const h = await settlementHarness();
  assert.equal((await h.settle()).status, "active");
  assert.equal(h.writes.length, 1);
  assert.equal(h.writes[0].kind, "paid");
  assert.equal(h.writes[0].input.circleId, h.attempt.circle.id);
  assert.equal(h.writes[0].input.creatorId, h.attempt.creator.id);
  assert.equal(h.writes[0].input.pricePaidMinor, 150000);
});

test("pending and abandoned transactions preserve checkout without publishing or creating a new payment", async () => {
  for (const status of [
    "pending",
    "abandoned",
    "ongoing",
    "processing",
    "queued",
    "unknown",
  ]) {
    const h = await settlementHarness({}, { status });
    assert.equal((await h.settle()).status, "pending_payment");
    assert.equal(h.writes.length, 0);
    assert.equal(h.attempt.status, "pending");
  }
});

test("verified failure records failure rather than activation", async () => {
  const h = await settlementHarness({}, { status: "failed" });
  assert.equal((await h.settle()).status, "failed");
  assert.equal(h.writes.length, 1);
  assert.equal(h.writes[0].kind, "failed");
  assert.equal(h.writes[0].input.failureCode, "paystack_failed");
});

test("reversed payments require reconciliation without automatic downgrade or refund", async () => {
  const h = await settlementHarness({}, { status: "reversed" });
  assert.equal((await h.settle()).status, "reconciliation_required");
  assert.equal(h.writes.length, 0);
});

test("duplicate and concurrent settlement do not apply value again", async () => {
  const duplicate = await settlementHarness({ status: "succeeded" });
  assert.equal((await duplicate.settle()).status, "active");
  assert.equal(duplicate.writes.length, 0);
  const concurrent = await settlementHarness({}, {}, true);
  assert.equal((await concurrent.settle()).status, "active");
  assert.equal(concurrent.writes.length, 1);
});

test("mismatched amount, live domain, or creator cannot reach completion", async () => {
  for (const override of [
    { amount: 1 },
    { domain: "live" },
    { metadata: { creatorId: "other" } },
  ]) {
    const h = await settlementHarness({}, override);
    await assert.rejects(h.settle(), { code: "PAYMENT_VERIFICATION_FAILED" });
    assert.equal(h.writes.length, 0);
  }
});

test("a previously failed attempt cannot be activated by a later callback", async () => {
  const h = await settlementHarness({ status: "failed" });
  await assert.rejects(h.settle(), { code: "PAYMENT_VERIFICATION_FAILED" });
  assert.equal(h.writes.length, 0);
});

test("upgrade settlement uses the persisted target and amount rather than current catalogue prices", async () => {
  const h = await settlementHarness({
    activationType: "upgrade",
    tier: "standard",
    listPriceMinor: 350000,
    amountDueMinor: 200000,
    planDefinition: {
      id: "gift_standard_v1_2026_08_02",
      memberLimit: 30,
      priceMinor: 350000,
    },
  });
  assert.equal((await h.settle()).status, "active");
  assert.equal(h.writes[0].kind, "upgrade");
  assert.equal(h.writes[0].input.targetMemberLimit, 30);
  assert.equal(h.writes[0].input.targetActivationPriceMinor, 350000);
  assert.equal(h.writes[0].input.pricePaidMinor, 200000);
});

async function webhookHarness(recorded = true) {
  const settlements = [];
  let records = 0;
  const provider = new PaystackTestProvider(secret);
  const loadedModule = await loadTypescriptModule(
    "app/api/payments/paystack/webhook/route.ts",
    {
      "next/server": {
        NextResponse: { json: (body, init) => Response.json(body, init) },
      },
      "@/server/pricing/provider": {
        getActivationPaymentProvider: () => provider,
      },
      "@/server/pricing/paystack": {
        PaystackTestProvider,
        parsePaystackActivationReference,
        paystackTestConfiguration: () => secret,
        validPaystackSignature,
      },
      "@/server/pricing/settlement": {
        settlePaystackActivation: async (...args) => {
          settlements.push(args);
          return { status: "active" };
        },
      },
      "@/server/repositories/operational-events": {
        recordPricingOutcome: async () => {
          records++;
          return recorded;
        },
      },
    },
  );
  return { post: loadedModule.POST, settlements, records: () => records };
}

function webhookRequest(body, signature) {
  return new Request(
    "https://staging.example.test/api/payments/paystack/webhook",
    {
      method: "POST",
      body,
      headers: {
        "x-paystack-signature":
          signature ?? createHmac("sha512", secret).update(body).digest("hex"),
      },
    },
  );
}

test("actual webhook rejects forged signatures and oversized bodies before settlement", async () => {
  const h = await webhookHarness();
  assert.equal(
    (
      await h.post(
        webhookRequest(
          JSON.stringify({ event: "charge.success" }),
          "0".repeat(128),
        ),
      )
    ).status,
    401,
  );
  assert.equal((await h.post(webhookRequest("x".repeat(65537)))).status, 413);
  assert.equal(h.settlements.length, 0);
});

test("actual signed success webhook invokes server verification with the bound activation ID", async () => {
  const h = await webhookHarness();
  const id = randomUUID();
  const response = await h.post(
    webhookRequest(
      JSON.stringify({
        event: "charge.success",
        data: { reference: `bc-${id}` },
      }),
    ),
  );
  assert.equal(response.status, 200);
  assert.equal(h.settlements.length, 1);
  assert.equal(h.settlements[0][1], id);
});

test("refund notifications require a durable reconciliation signal before acknowledgement", async () => {
  const body = JSON.stringify({ event: "refund.processed", data: {} });
  const healthy = await webhookHarness(true);
  assert.equal((await healthy.post(webhookRequest(body))).status, 200);
  assert.equal(healthy.records(), 1);
  assert.equal(healthy.settlements.length, 0);
  const failed = await webhookHarness(false);
  assert.equal((await failed.post(webhookRequest(body))).status, 503);
});

test("actual compact-record settlement verifies the persisted reference and remains idempotent", async () => {
  const h = await settlementHarness({}, {}, false, true);
  assert.equal((await h.settle()).status, "active");
  assert.equal(h.verifiedReferences[0], h.attempt.providerReference);
  assert.notEqual(h.verifiedReferences[0], "bc-" + h.attempt.id);
  assert.equal(h.writes.length, 1);
  assert.equal((await h.settle()).status, "active");
  assert.equal(h.writes.length, 1);
});

test("signed webhook accepts compact references and rejects malformed UUIDs before settlement", async () => {
  const h = await webhookHarness();
  const id = randomUUID().replaceAll("-", "");
  const accepted = await h.post(
    webhookRequest(
      JSON.stringify({
        event: "charge.success",
        data: { reference: "bc-" + id },
      }),
    ),
  );
  assert.equal(accepted.status, 200);
  assert.equal(h.settlements.length, 1);
  assert.equal(h.settlements[0][1], id);
  for (const reference of [
    "bc-" + "-".repeat(36),
    "bc-not-a-uuid",
    "bc-" + id + "extra",
  ]) {
    const denied = await h.post(
      webhookRequest(
        JSON.stringify({ event: "charge.success", data: { reference } }),
      ),
    );
    assert.equal(denied.status, 400);
  }
  assert.equal(h.settlements.length, 1);
});
