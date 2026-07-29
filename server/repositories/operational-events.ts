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
