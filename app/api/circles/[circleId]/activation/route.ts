import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { requireActivationPaymentProvider } from "@/server/pricing/provider";
import { pricingErrorResponse } from "@/server/pricing/http";
import {
  createCircleActivationAttempt,
  loadCirclePricingState,
} from "@/server/repositories/pricing";
import { formatMinorNaira, isCirclePricingPlan } from "@/lib/circle-pricing";
import { PricingRuleError } from "@/server/pricing/entitlements";
import { recordPricingOutcome } from "@/server/repositories/operational-events";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  context: { params: Promise<{ circleId: string }> },
) {
  let metricCircleId: string | null = null;
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    const { circleId } = await context.params;
    metricCircleId = circleId;
    const circle = await loadCirclePricingState(circleId);
    if (!circle) {
      return NextResponse.json({ error: "Circle not found." }, { status: 404 });
    }
    if (circle.creatorId !== session.uid) {
      return NextResponse.json(
        { error: "Only the circle creator can pay the activation fee." },
        { status: 403 },
      );
    }
    if (circle.pricingModelVersion !== "model_specific_v1") {
      throw new PricingRuleError(
        "Grandfathered circles do not require a new activation payment.",
        "ACTIVATION_REQUIRED",
      );
    }
    if (circle.pricingPlan === "trial") {
      throw new PricingRuleError(
        "Trial circles use the one-time trial activation flow.",
        "ACTIVATION_REQUIRED",
      );
    }
    if (
      !isCirclePricingPlan(circle.pricingPlan) ||
      !circle.pricingPlanDefinitionId
    ) {
      throw new PricingRuleError(
        "This draft does not have a valid activation price definition.",
        "ACTIVATION_REQUIRED",
      );
    }
    if (circle.activationStatus === "active") {
      return NextResponse.json({ status: "active" });
    }

    const provider = requireActivationPaymentProvider();
    const activationId = randomUUID();
    const origin = new URL(request.url).origin;
    const checkout = await provider.createCheckout({
      activationId,
      circleId,
      creatorId: session.uid,
      amountMinor: circle.activationPriceMinor,
      currency: "NGN",
      description: `${circle.type} circle activation (${formatMinorNaira(circle.activationPriceMinor)})`,
      returnUrl: `${origin}/account/circles/${encodeURIComponent(circleId)}?activation=return`,
    });
    await createCircleActivationAttempt({
      activationId,
      circleId,
      creatorId: session.uid,
      planDefinitionId: circle.pricingPlanDefinitionId,
      activationType: "paid",
      circleType: circle.type,
      tier: circle.pricingPlan,
      listPriceMinor: circle.activationPriceMinor,
      amountDueMinor: circle.activationPriceMinor,
      provider: checkout.provider,
      providerReference: checkout.providerReference,
    });
    await recordPricingOutcome({
      eventType: "activation_checkout",
      outcome: "started",
      circleId,
    });

    return NextResponse.json({
      status: "pending_payment",
      checkoutUrl: checkout.checkoutUrl,
    });
  } catch (error) {
    await recordPricingOutcome({
      eventType: "activation_checkout",
      outcome: "blocked",
      circleId: metricCircleId,
      reasonCode:
        error instanceof PricingRuleError ? error.code : "activation_error",
    });
    return pricingErrorResponse(error, "Unable to start circle activation.");
  }
}
