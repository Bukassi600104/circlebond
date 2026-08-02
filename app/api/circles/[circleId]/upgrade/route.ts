import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { pricingErrorResponse } from "@/server/pricing/http";
import { requireActivationPaymentProvider } from "@/server/pricing/provider";
import {
  PricingRuleError,
  entitlementContextForStoredCircle,
  upgradePriceMinor,
} from "@/server/pricing";
import {
  createCircleActivationAttempt,
  loadCirclePricingState,
} from "@/server/repositories/pricing";
import {
  PAID_CIRCLE_PRICING_TIERS,
  formatMinorNaira,
  pricingForCircle,
  type PaidCirclePricingPlan,
} from "@/lib/circle-pricing";
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
        { error: "Only the circle creator can upgrade this circle." },
        { status: 403 },
      );
    }
    if (circle.activationStatus !== "active") {
      throw new PricingRuleError(
        "Activate this circle before requesting an upgrade.",
        "ACTIVATION_REQUIRED",
      );
    }
    const body = (await request.json()) as { targetPlan?: string };
    if (
      !PAID_CIRCLE_PRICING_TIERS.includes(
        body.targetPlan as PaidCirclePricingPlan,
      )
    ) {
      throw new PricingRuleError(
        "Choose a valid higher paid plan.",
        "INVALID_PLAN_UPGRADE",
      );
    }
    const targetPlan = body.targetPlan as PaidCirclePricingPlan;
    const latestSuccessfulActivation = circle.activations.find(
      ({ status }) => status === "succeeded",
    );
    if (!latestSuccessfulActivation) {
      throw new PricingRuleError(
        "The active plan has no verified activation record.",
        "INVALID_PLAN_UPGRADE",
      );
    }
    const amountDueMinor = upgradePriceMinor(
      entitlementContextForStoredCircle({
        type: circle.type,
        pricingPlan: circle.pricingPlan,
        pricingModelVersion: circle.pricingModelVersion,
        memberLimit: circle.memberLimit,
      }),
      targetPlan,
      latestSuccessfulActivation.listPriceMinor,
    );
    const target = pricingForCircle(circle.type, targetPlan);
    const provider = requireActivationPaymentProvider();
    const origin = new URL(request.url).origin;
    const activationId = randomUUID();
    const checkout = await provider.createCheckout({
      activationId,
      circleId,
      creatorId: session.uid,
      amountMinor: amountDueMinor,
      currency: "NGN",
      description: `${circle.type} circle upgrade to ${targetPlan} (${formatMinorNaira(amountDueMinor)})`,
      returnUrl: `${origin}/account/circles/${encodeURIComponent(circleId)}?upgrade=return`,
    });
    await createCircleActivationAttempt({
      activationId,
      circleId,
      creatorId: session.uid,
      planDefinitionId: target.id,
      activationType: "upgrade",
      circleType: circle.type,
      tier: targetPlan,
      listPriceMinor: target.priceMinor,
      amountDueMinor,
      provider: checkout.provider,
      providerReference: checkout.providerReference,
      previousActivationId: latestSuccessfulActivation.id,
    });
    await recordPricingOutcome({
      eventType: "upgrade_checkout",
      outcome: "started",
      circleId,
    });
    return NextResponse.json({
      status: "pending_payment",
      targetPlan,
      targetPlanDefinitionId: target.id,
      amountDueMinor,
      checkoutUrl: checkout.checkoutUrl,
    });
  } catch (error) {
    await recordPricingOutcome({
      eventType: "upgrade_checkout",
      outcome: "blocked",
      circleId: metricCircleId,
      reasonCode:
        error instanceof PricingRuleError ? error.code : "upgrade_error",
    });
    return pricingErrorResponse(error, "Unable to start the circle upgrade.");
  }
}
