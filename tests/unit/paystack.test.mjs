import assert from "node:assert/strict";
import { createHmac, randomUUID } from "node:crypto";
import test from "node:test";
import {
  PaystackTestProvider,
  paystackTestConfiguration,
  validPaystackSignature,
  assertVerifiedPaystackTransaction,
} from "../../server/pricing/paystack.ts";

const secret = "sk_test_unit_fixture_not_a_real_key";
const id = randomUUID();
const input = {
  activationId: id,
  circleId: randomUUID(),
  creatorId: "test-creator",
  email: "organizer@example.test",
  amountMinor: 150000,
  currency: "NGN",
  description: "Gift activation",
  returnUrl: "https://staging.example.test/account/circles/test",
};
const attempt = {
  id,
  circleId: input.circleId,
  creatorId: input.creatorId,
  amountDueMinor: input.amountMinor,
  currency: "NGN",
  providerReference: `bc-${id}`,
};
const transaction = {
  domain: "test",
  status: "success",
  reference: attempt.providerReference,
  amount: input.amountMinor,
  currency: "NGN",
  metadata: {
    activationId: id,
    circleId: input.circleId,
    creatorId: input.creatorId,
  },
};

test("Paystack requires explicit test opt-in and an isolated backend", () => {
  const env = {
    ACTIVATION_PAYMENT_PROVIDER: "paystack_test",
    PAYSTACK_SECRET_KEY: secret,
    FIREBASE_PROJECT_ID: "bondcircle-sandbox",
    PAYSTACK_TEST_BACKEND_PROJECT_ID: "bondcircle-sandbox",
  };
  assert.equal(paystackTestConfiguration(env), secret);
  for (const override of [
    { VERCEL_ENV: "production" },
    {
      FIREBASE_PROJECT_ID: "bond-circle",
      PAYSTACK_TEST_BACKEND_PROJECT_ID: "bond-circle",
    },
    { PAYSTACK_SECRET_KEY: "sk_live_unit_fixture_not_a_real_key" },
    { ACTIVATION_PAYMENT_PROVIDER: "paystack" },
    { PAYSTACK_TEST_BACKEND_PROJECT_ID: "different-project" },
  ])
    assert.equal(paystackTestConfiguration({ ...env, ...override }), null);
  assert.equal(
    paystackTestConfiguration({
      ACTIVATION_PAYMENT_PROVIDER: "paystack_test",
      PAYSTACK_SECRET_KEY: secret,
      DATA_CONNECT_EMULATOR_HOST: "127.0.0.1:9499",
      FIREBASE_AUTH_EMULATOR_HOST: "127.0.0.1:9099",
    }),
    secret,
  );
  assert.equal(
    paystackTestConfiguration({
      ACTIVATION_PAYMENT_PROVIDER: "paystack_test",
      PAYSTACK_SECRET_KEY: secret,
      DATA_CONNECT_EMULATOR_HOST: "remote.example:9499",
      FIREBASE_AUTH_EMULATOR_HOST: "127.0.0.1:9099",
    }),
    null,
  );
});

test("webhook signatures bind the exact raw bytes and reject malformed headers", () => {
  const body = Buffer.from('{"event":"charge.success"}');
  const signature = createHmac("sha512", secret).update(body).digest("hex");
  assert.equal(validPaystackSignature(body, signature, secret), true);
  for (const header of [null, "", "00", "g".repeat(128), "0".repeat(128)])
    assert.equal(validPaystackSignature(body, header, secret), false);
  assert.equal(
    validPaystackSignature(Buffer.from(`${body} `), signature, secret),
    false,
  );
  assert.equal(
    validPaystackSignature(body, signature, "sk_test_other_fixture"),
    false,
  );
});

test("verification binds exact amount, NGN, test domain, reference, circle, and creator", () => {
  assert.doesNotThrow(() =>
    assertVerifiedPaystackTransaction(transaction, attempt),
  );
  for (const override of [
    { domain: "live" },
    { amount: 149999 },
    { amount: "150000" },
    { amount: NaN },
    { currency: "USD" },
    { reference: `bc-${randomUUID()}` },
    { metadata: { ...transaction.metadata, activationId: randomUUID() } },
    { metadata: { ...transaction.metadata, circleId: randomUUID() } },
    { metadata: { ...transaction.metadata, creatorId: "other-creator" } },
    { metadata: null },
  ])
    assert.throws(
      () =>
        assertVerifiedPaystackTransaction(
          { ...transaction, ...override },
          attempt,
        ),
      { code: "PAYMENT_VERIFICATION_FAILED" },
    );
});

test("checkout uses integer minor units and deterministic metadata without trusting provider redirects", async (t) => {
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    calls.push({ url, options });
    return Response.json({
      status: true,
      data: {
        reference: `bc-${id}`,
        authorization_url: "https://checkout.paystack.com/test-fixture",
      },
    });
  });
  const provider = new PaystackTestProvider(secret);
  const checkout = await provider.createCheckout(input);
  assert.equal(checkout.providerReference, `bc-${id}`);
  assert.equal(
    checkout.checkoutUrl,
    "https://checkout.paystack.com/test-fixture",
  );
  assert.equal(calls[0].url, "https://api.paystack.co/transaction/initialize");
  const sent = JSON.parse(calls[0].options.body);
  assert.equal(sent.amount, 150000);
  assert.equal(sent.currency, "NGN");
  assert.deepEqual(sent.metadata, transaction.metadata);
  assert.equal(calls[0].options.cache, "no-store");
  assert.equal(calls[0].options.redirect, "error");
  assert.equal(
    provider.referenceForActivation(id),
    provider.referenceForActivation(id),
  );
});

test("checkout rejects invalid input before network and live secrets", async (t) => {
  let called = false;
  t.mock.method(globalThis, "fetch", async () => {
    called = true;
    throw new Error("must not call");
  });
  const provider = new PaystackTestProvider(secret);
  for (const override of [
    { email: undefined },
    { email: "invalid" },
    { amountMinor: 1.5 },
    { amountMinor: 0 },
    { amountMinor: -1 },
    { currency: "USD" },
    { returnUrl: "http://example.test/callback" },
  ])
    await assert.rejects(provider.createCheckout({ ...input, ...override }));
  assert.equal(called, false);
  assert.throws(
    () => new PaystackTestProvider("sk_live_fixture"),
    /test credentials/,
  );
});

test("checkout rejects foreign, insecure, or mismatched provider URLs", async (t) => {
  for (const authorization_url of [
    "http://checkout.paystack.com/x",
    "https://evil.example/x",
    "https://checkout.paystack.com.evil.example/x",
    "https://user:pass@checkout.paystack.com/x",
    "https://checkout.paystack.com:444/x",
  ]) {
    t.mock.method(globalThis, "fetch", async () =>
      Response.json({
        status: true,
        data: { reference: `bc-${id}`, authorization_url },
      }),
    );
    await assert.rejects(
      new PaystackTestProvider(secret).createCheckout(input),
      { code: "PAYMENT_VERIFICATION_FAILED" },
    );
    t.mock.restoreAll();
  }
});

test("provider failures expose only a safe retry message", async (t) => {
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("sensitive provider detail");
  });
  await assert.rejects(
    new PaystackTestProvider(secret).createCheckout(input),
    (error) =>
      error.code === "PAYMENT_PROVIDER_UNAVAILABLE" &&
      !error.message.includes("sensitive"),
  );
});

test("server verification returns provider status without manufacturing success", async (t) => {
  for (const status of [
    "failed",
    "pending",
    "abandoned",
    "reversed",
    "success",
  ]) {
    t.mock.method(globalThis, "fetch", async (url) => {
      assert.equal(url, `https://api.paystack.co/transaction/verify/bc-${id}`);
      return Response.json({ status: true, data: { ...transaction, status } });
    });
    assert.equal(
      (await new PaystackTestProvider(secret).verifyTransaction(`bc-${id}`))
        .status,
      status,
    );
    t.mock.restoreAll();
  }
});
