import { createHmac, timingSafeEqual } from "node:crypto";
import { PricingRuleError } from "./entitlements.ts";
import type {
  ActivationCheckoutInput,
  ActivationPaymentProvider,
} from "./provider.ts";

export function paystackTestConfiguration(env: NodeJS.ProcessEnv) {
  const emulator =
    /^127\.0\.0\.1:\d+$/.test(env.DATA_CONNECT_EMULATOR_HOST ?? "") &&
    /^127\.0\.0\.1:\d+$/.test(env.FIREBASE_AUTH_EMULATOR_HOST ?? "");
  const staging =
    Boolean(env.PAYSTACK_TEST_BACKEND_PROJECT_ID) &&
    env.PAYSTACK_TEST_BACKEND_PROJECT_ID === env.FIREBASE_PROJECT_ID &&
    env.FIREBASE_PROJECT_ID !== "bond-circle";
  return env.ACTIVATION_PAYMENT_PROVIDER === "paystack_test" &&
    env.PAYSTACK_SECRET_KEY?.startsWith("sk_test_") &&
    env.VERCEL_ENV !== "production" &&
    (emulator || staging)
    ? env.PAYSTACK_SECRET_KEY
    : null;
}

export type PaystackTransaction = {
  domain: string;
  status: string;
  reference: string;
  amount: number;
  currency: string;
  metadata: {
    activationId?: string;
    circleId?: string;
    creatorId?: string;
  };
};

export function validPaystackSignature(
  body: Uint8Array,
  signature: string | null,
  secret: string,
) {
  if (!signature || !/^[a-f0-9]{128}$/i.test(signature)) return false;
  const expected = createHmac("sha512", secret).update(body).digest();
  return timingSafeEqual(expected, Buffer.from(signature, "hex"));
}

// SQL Connect emits compact UUIDs; checkout references and metadata may retain Node UUID dashes.
function uuidIdentity(value: unknown): string | null {
  return typeof value === "string" &&
    /^(?:[a-f0-9]{32}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/i.test(
      value,
    )
    ? value.replaceAll("-", "").toLowerCase()
    : null;
}

export function parsePaystackActivationReference(
  reference: unknown,
): string | null {
  if (typeof reference !== "string" || !reference.startsWith("bc-"))
    return null;
  const activationId = reference.slice(3);
  return uuidIdentity(activationId) ? activationId : null;
}

export function assertVerifiedPaystackTransaction(
  transaction: PaystackTransaction,
  attempt: {
    id: string;
    circleId: string;
    creatorId: string;
    amountDueMinor: number;
    currency: string;
    providerReference: string | null;
  },
) {
  const activationId = uuidIdentity(attempt.id);
  const circleId = uuidIdentity(attempt.circleId);
  if (
    !activationId ||
    !circleId ||
    transaction.domain !== "test" ||
    transaction.reference !== attempt.providerReference ||
    uuidIdentity(parsePaystackActivationReference(transaction.reference)) !==
      activationId ||
    !Number.isSafeInteger(transaction.amount) ||
    transaction.amount !== attempt.amountDueMinor ||
    transaction.currency !== "NGN" ||
    transaction.currency !== attempt.currency ||
    uuidIdentity(transaction.metadata?.activationId) !== activationId ||
    uuidIdentity(transaction.metadata?.circleId) !== circleId ||
    transaction.metadata?.creatorId !== attempt.creatorId
  ) {
    throw new PricingRuleError(
      "Payment verification did not match this activation. Your circle has not been changed.",
      "PAYMENT_VERIFICATION_FAILED",
      409,
    );
  }
}

export class PaystackTestProvider implements ActivationPaymentProvider {
  readonly name = "paystack_test";
  private readonly secret: string;

  constructor(secret: string) {
    if (!secret.startsWith("sk_test_")) {
      throw new Error("Only Paystack test credentials are supported.");
    }
    this.secret = secret;
  }

  referenceForActivation(activationId: string) {
    if (!uuidIdentity(activationId)) {
      throw new PricingRuleError(
        "Invalid activation payment reference.",
        "PAYMENT_VERIFICATION_FAILED",
        400,
      );
    }
    return `bc-${activationId}`;
  }

  private async request(path: string, body?: Record<string, unknown>) {
    try {
      const response = await fetch(`https://api.paystack.co${path}`, {
        method: body ? "POST" : "GET",
        headers: {
          Authorization: `Bearer ${this.secret}`,
          "Content-Type": "application/json",
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(15_000),
      });
      const result = await response.json();
      if (!response.ok || result.status !== true || !result.data) {
        throw new Error("Provider request failed.");
      }
      return result.data;
    } catch {
      throw new PricingRuleError(
        "Payment confirmation is temporarily unavailable. Your draft and payment reference are safe; retry verification before starting another payment.",
        "PAYMENT_PROVIDER_UNAVAILABLE",
        503,
      );
    }
  }

  validateCheckout(input: ActivationCheckoutInput) {
    const returnUrl = new URL(input.returnUrl);
    if (
      !input.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email) ||
      input.email.length > 254
    ) {
      throw new PricingRuleError(
        "Add an email address to your account before starting secure checkout.",
        "PAYMENT_EMAIL_REQUIRED",
        409,
      );
    }
    if (
      !uuidIdentity(input.activationId) ||
      !uuidIdentity(input.circleId) ||
      !Number.isSafeInteger(input.amountMinor) ||
      input.amountMinor <= 0 ||
      input.currency !== "NGN" ||
      (returnUrl.protocol !== "https:" &&
        !(returnUrl.protocol === "http:" && returnUrl.hostname === "127.0.0.1"))
    ) {
      throw new PricingRuleError(
        "This activation does not have a valid checkout amount or return address.",
        "PAYMENT_VERIFICATION_FAILED",
        400,
      );
    }
  }

  async createCheckout(input: ActivationCheckoutInput) {
    this.validateCheckout(input);
    const reference = this.referenceForActivation(input.activationId);
    const data = await this.request("/transaction/initialize", {
      email: input.email,
      amount: input.amountMinor,
      currency: input.currency,
      reference,
      callback_url: input.returnUrl,
      metadata: {
        activationId: input.activationId,
        circleId: input.circleId,
        creatorId: input.creatorId,
      },
    });
    const checkoutUrl = new URL(data.authorization_url);
    if (
      data.reference !== reference ||
      checkoutUrl.protocol !== "https:" ||
      checkoutUrl.hostname !== "checkout.paystack.com" ||
      checkoutUrl.username ||
      checkoutUrl.password ||
      checkoutUrl.port
    ) {
      throw new PricingRuleError(
        "The payment provider returned an invalid checkout response.",
        "PAYMENT_VERIFICATION_FAILED",
        502,
      );
    }
    return {
      provider: this.name,
      providerReference: reference,
      checkoutUrl: checkoutUrl.href,
    };
  }

  async verifyTransaction(reference: string): Promise<PaystackTransaction> {
    if (!parsePaystackActivationReference(reference)) {
      throw new PricingRuleError(
        "Invalid activation payment reference.",
        "PAYMENT_VERIFICATION_FAILED",
        400,
      );
    }
    return this.request(`/transaction/verify/${encodeURIComponent(reference)}`);
  }
}
