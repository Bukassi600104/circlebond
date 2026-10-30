import "server-only";
import {
  PaystackTestProvider,
  assertVerifiedPaystackTransaction,
} from "./paystack";
import { PricingRuleError } from "./entitlements";
import {
  completeCirclePlanUpgrade,
  completePaidCircleActivation,
  failCircleActivationAttempt,
  loadCircleActivationAttempt,
} from "@/server/repositories/pricing";

export async function settlePaystackActivation(
  provider: PaystackTestProvider,
  activationId: string,
) {
  const attempt = await loadCircleActivationAttempt(activationId);
  if (
    !attempt ||
    attempt.provider !== provider.name ||
    !attempt.providerReference
  ) {
    throw new PricingRuleError(
      "Activation payment not found.",
      "PAYMENT_VERIFICATION_FAILED",
      404,
    );
  }
  const transaction = await provider.verifyTransaction(
    attempt.providerReference,
  );
  assertVerifiedPaystackTransaction(transaction, {
    ...attempt,
    circleId: attempt.circle.id,
    creatorId: attempt.creator.id,
  });
  if (transaction.status !== "success") {
    if (attempt.status === "pending" && transaction.status === "failed") {
      await failCircleActivationAttempt({
        activationId,
        circleId: attempt.circle.id,
        failureCode: `paystack_${transaction.status}`,
      });
      return { status: "failed" };
    }
    // Reversals/refunds require owner reconciliation; never downgrade or invent a refund.
    return {
      status:
        transaction.status === "reversed"
          ? "reconciliation_required"
          : "pending_payment",
    };
  }
  if (attempt.status === "succeeded") return { status: "active" };
  if (attempt.status !== "pending") {
    throw new PricingRuleError(
      "This activation requires reconciliation.",
      "PAYMENT_VERIFICATION_FAILED",
      409,
    );
  }
  try {
    const input = {
      activationId,
      circleId: attempt.circle.id,
      creatorId: attempt.creator.id,
      pricePaidMinor: transaction.amount,
    };
    if (attempt.activationType === "paid") {
      await completePaidCircleActivation(input);
    } else if (attempt.activationType === "upgrade" && attempt.planDefinition) {
      await completeCirclePlanUpgrade({
        ...input,
        targetPlan: attempt.tier,
        targetPlanDefinitionId: attempt.planDefinition.id,
        targetMemberLimit: attempt.planDefinition.memberLimit,
        targetActivationPriceMinor: attempt.listPriceMinor,
      });
    } else {
      throw new PricingRuleError(
        "Invalid activation type.",
        "PAYMENT_VERIFICATION_FAILED",
        409,
      );
    }
  } catch (error) {
    // A concurrent signed webhook or owner verification may have completed first.
    if (
      (await loadCircleActivationAttempt(activationId))?.status !== "succeeded"
    )
      throw error;
  }
  return { status: "active" };
}
