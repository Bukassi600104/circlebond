import "server-only";

import { logger } from "@/lib/logger";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import { operationalReasonCode } from "@/server/owner/rules";

export async function recordUploadOutcome(input: {
  kind: "receipt" | "gift_image" | "aso_ebi_image" | "support_image";
  outcome: "succeeded" | "failed";
  circleId?: string | null;
  error?: unknown;
}) {
  try {
    await getBondCircleDataConnect().executeMutation("RecordOperationalEvent", {
      category: "upload",
      eventType: input.kind,
      outcome: input.outcome,
      reasonCode:
        input.outcome === "failed" ? operationalReasonCode(input.error) : null,
      circleId: input.circleId ?? null,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    logger.error("operational_event_write_failed", {
      category: "upload",
      eventType: input.kind,
      error: error instanceof Error ? error.message : "unknown",
    });
  }
}

export async function recordPricingOutcome(input: {
  eventType:
    | "trial_activation"
    | "activation_checkout"
    | "activation_completed"
    | "upgrade_checkout"
    | "upgrade_completed"
    | "member_limit"
    | "co_admin_limit"
    | "aso_ebi_tier_limit"
    | "feature_gate";
  outcome: "started" | "succeeded" | "failed" | "blocked";
  circleId?: string | null;
  reasonCode?: string | null;
}) {
  try {
    await getBondCircleDataConnect().executeMutation("RecordOperationalEvent", {
      category: "pricing",
      eventType: input.eventType,
      outcome: input.outcome,
      reasonCode: input.reasonCode?.slice(0, 80) ?? null,
      circleId: input.circleId ?? null,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    logger.error("operational_event_write_failed", {
      category: "pricing",
      eventType: input.eventType,
      error: error instanceof Error ? error.message : "unknown",
    });
  }
}
