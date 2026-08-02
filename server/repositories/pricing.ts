import "server-only";

import { randomUUID } from "node:crypto";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import {
  PricingRuleError,
  assertTrialAvailable,
} from "@/server/pricing/entitlements";
import type {
  CirclePricingMode,
  CirclePricingPlan,
} from "@/lib/circle-pricing";
import { safelyEmitNotification } from "@/server/repositories/notifications";
import { recordPricingOutcome } from "@/server/repositories/operational-events";

type TrialUsageQuery = {
  creatorTrialUsage?: {
    usedAt: string;
    circle: { id: string };
  } | null;
};

export async function creatorHasUsedTrial(creatorId: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    TrialUsageQuery,
    { creatorId: string }
  >("GetCreatorTrialUsage", { creatorId });
  return Boolean(response.data.creatorTrialUsage);
}

export async function claimTrialAndPublishCircle(input: {
  creatorId: string;
  circleId: string;
  circleType: CirclePricingMode;
  planDefinitionId: string;
}) {
  assertTrialAvailable(await creatorHasUsedTrial(input.creatorId));
  const activatedAt = new Date().toISOString();
  try {
    await getBondCircleDataConnect().executeMutation(
      "ClaimTrialAndPublishCircle",
      {
        activationId: randomUUID(),
        creatorId: input.creatorId,
        circleId: input.circleId,
        circleEntityId: input.circleId,
        planDefinitionId: input.planDefinitionId,
        circleType: input.circleType,
        activatedAt,
      },
    );
  } catch (error) {
    // The creator relation is the primary key, so concurrent claims fail
    // closed even if both requests passed the initial eligibility read.
    if (await creatorHasUsedTrial(input.creatorId)) {
      throw new PricingRuleError(
        "The one-time first-circle trial has already been used by this account.",
        "TRIAL_ALREADY_USED",
      );
    }
    throw error;
  }
  await safelyEmitNotification({
    circleId: input.circleId,
    type: "circle_trial_activated",
    entityId: input.circleId,
    recipientIds: [input.creatorId],
  });
  await recordPricingOutcome({
    eventType: "trial_activation",
    outcome: "succeeded",
    circleId: input.circleId,
  });
  return { activatedAt };
}

export type CirclePricingState = {
  id: string;
  creatorId: string;
  type: CirclePricingMode;
  pricingPlan: CirclePricingPlan | "legacy" | "free";
  pricingModelVersion: string;
  pricingPlanDefinitionId: string | null;
  memberLimit: number;
  activationStatus: string;
  activationPriceMinor: number;
  activatedAt: string | null;
  status: string;
  activations: Array<{
    id: string;
    activationType: string;
    tier: string;
    listPriceMinor: number;
    amountDueMinor: number;
    pricePaidMinor: number;
    status: string;
    provider: string | null;
    providerReference: string | null;
    createdAt: string;
    paidAt: string | null;
    activatedAt: string | null;
  }>;
};

type CirclePricingStateQuery = {
  circle?: {
    id: string;
    creator: { id: string };
    type: string;
    pricingPlan: string;
    pricingModelVersion: string;
    pricingPlanDefinitionId?: string | null;
    memberLimit: number;
    activationStatus: string;
    activationPriceMinor: number;
    activatedAt?: string | null;
    status: string;
  } | null;
  circleActivations: Array<{
    id: string;
    activationType: string;
    tier: string;
    listPriceMinor: number;
    amountDueMinor: number;
    pricePaidMinor: number;
    status: string;
    provider?: string | null;
    providerReference?: string | null;
    createdAt: string;
    paidAt?: string | null;
    activatedAt?: string | null;
  }>;
};

export async function loadCirclePricingState(
  circleId: string,
): Promise<CirclePricingState | null> {
  const response = await getBondCircleDataConnect().executeQuery<
    CirclePricingStateQuery,
    { circleId: string }
  >("GetCirclePricingState", { circleId });
  const circle = response.data.circle;
  if (!circle) return null;
  return {
    id: circle.id,
    creatorId: circle.creator.id,
    type: circle.type as CirclePricingMode,
    pricingPlan: circle.pricingPlan as CirclePricingState["pricingPlan"],
    pricingModelVersion: circle.pricingModelVersion,
    pricingPlanDefinitionId: circle.pricingPlanDefinitionId ?? null,
    memberLimit: circle.memberLimit,
    activationStatus: circle.activationStatus,
    activationPriceMinor: circle.activationPriceMinor,
    activatedAt: circle.activatedAt ?? null,
    status: circle.status,
    activations: response.data.circleActivations.map((activation) => ({
      ...activation,
      provider: activation.provider ?? null,
      providerReference: activation.providerReference ?? null,
      paidAt: activation.paidAt ?? null,
      activatedAt: activation.activatedAt ?? null,
    })),
  };
}

export async function createCircleActivationAttempt(input: {
  activationId: string;
  circleId: string;
  creatorId: string;
  planDefinitionId: string;
  activationType: "paid" | "upgrade";
  circleType: CirclePricingMode;
  tier: CirclePricingPlan;
  listPriceMinor: number;
  amountDueMinor: number;
  provider: string;
  providerReference: string;
  previousActivationId?: string | null;
}) {
  await getBondCircleDataConnect().executeMutation(
    "CreateCircleActivationAttempt",
    {
      ...input,
      previousActivationId: input.previousActivationId ?? null,
      createdAt: new Date().toISOString(),
    },
  );
}

export async function failCircleActivationAttempt(input: {
  activationId: string;
  circleId: string;
  failureCode: string;
}) {
  await getBondCircleDataConnect().executeMutation(
    "FailCircleActivationAttempt",
    { ...input, failedAt: new Date().toISOString() },
  );
  const circle = await loadCirclePricingState(input.circleId);
  if (circle) {
    await safelyEmitNotification({
      circleId: input.circleId,
      type: "circle_activation_failed",
      entityId: input.activationId,
      recipientIds: [circle.creatorId],
      important: true,
    });
  }
}

export async function completePaidCircleActivation(input: {
  activationId: string;
  circleId: string;
  creatorId: string;
  pricePaidMinor: number;
}) {
  await getBondCircleDataConnect().executeMutation(
    "CompletePaidCircleActivation",
    { ...input, activatedAt: new Date().toISOString() },
  );
  await safelyEmitNotification({
    circleId: input.circleId,
    type: "circle_activation_succeeded",
    entityId: input.activationId,
    recipientIds: [input.creatorId],
  });
  await recordPricingOutcome({
    eventType: "activation_completed",
    outcome: "succeeded",
    circleId: input.circleId,
  });
}

export async function completeCirclePlanUpgrade(input: {
  activationId: string;
  circleId: string;
  creatorId: string;
  targetPlan: CirclePricingPlan;
  targetPlanDefinitionId: string;
  targetMemberLimit: number;
  targetActivationPriceMinor: number;
  pricePaidMinor: number;
}) {
  await getBondCircleDataConnect().executeMutation(
    "CompleteCirclePlanUpgrade",
    {
      ...input,
      targetActivationPrice: input.targetActivationPriceMinor / 100,
      activatedAt: new Date().toISOString(),
    },
  );
  await safelyEmitNotification({
    circleId: input.circleId,
    type: "circle_upgraded",
    entityId: input.activationId,
    recipientIds: [input.creatorId],
  });
  await recordPricingOutcome({
    eventType: "upgrade_completed",
    outcome: "succeeded",
    circleId: input.circleId,
  });
}
