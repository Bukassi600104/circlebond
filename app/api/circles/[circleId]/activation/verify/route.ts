import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { enforceRateLimit } from "@/server/auth/security";
import { requireActivationPaymentProvider } from "@/server/pricing/provider";
import { PaystackTestProvider } from "@/server/pricing/paystack";
import { settlePaystackActivation } from "@/server/pricing/settlement";
import { pricingErrorResponse } from "@/server/pricing/http";
import {
  loadCirclePricingState,
  loadCirclePaymentCheckout,
} from "@/server/repositories/pricing";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  context: { params: Promise<{ circleId: string }> },
) {
  try {
    const session = await authenticatePrincipal(request);
    if (!session)
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    await assertTrustedMutation(request, session);
    const { circleId } = await context.params;
    const circle = await loadCirclePricingState(circleId);
    if (!circle || circle.creatorId !== session.uid)
      return NextResponse.json({ error: "Circle not found." }, { status: 404 });
    const pending = await loadCirclePaymentCheckout(circleId);
    if (!pending) return NextResponse.json({ status: "no_pending_payment" });
    if (
      !(await enforceRateLimit(
        `payment:verify:${session.uid}:${circleId}`,
        15,
        15 * 60_000,
      ))
    ) {
      return NextResponse.json(
        { error: "Too many verification attempts. Try again shortly." },
        { status: 429 },
      );
    }
    const provider = requireActivationPaymentProvider();
    if (!(provider instanceof PaystackTestProvider))
      throw new Error("Unsupported payment provider.");
    return NextResponse.json(
      await settlePaystackActivation(provider, pending.activation.id),
    );
  } catch (error) {
    return pricingErrorResponse(
      error,
      "Unable to verify this activation payment.",
    );
  }
}
