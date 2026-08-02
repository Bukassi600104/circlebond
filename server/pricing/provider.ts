import "server-only";

import { PricingRuleError } from "./entitlements.ts";

export type ActivationCheckoutInput = {
  activationId: string;
  circleId: string;
  creatorId: string;
  amountMinor: number;
  currency: "NGN";
  description: string;
  returnUrl: string;
};

export type ActivationCheckout = {
  provider: string;
  providerReference: string;
  checkoutUrl: string;
};

export interface ActivationPaymentProvider {
  readonly name: string;
  createCheckout(input: ActivationCheckoutInput): Promise<ActivationCheckout>;
}

/**
 * Provider-neutral boundary for the one-time creator activation charge.
 * A production provider is deliberately not inferred: enabling one requires
 * an approved provider contract, credentials, signed webhook verification and
 * a refund/reconciliation decision. Until then, production fails closed.
 */
export function getActivationPaymentProvider(): ActivationPaymentProvider | null {
  return null;
}

export function requireActivationPaymentProvider() {
  const provider = getActivationPaymentProvider();
  if (!provider) {
    throw new PricingRuleError(
      "Circle activation payments are temporarily unavailable. Your draft is safe and has not been charged or published.",
      "PAYMENT_PROVIDER_UNAVAILABLE",
      503,
    );
  }
  return provider;
}
