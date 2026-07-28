import { logger } from "@/lib/logger";
import { persistAuthAudit } from "@/server/repositories/users";

export type AuthAuditEvent = "login" | "logout" | "verification" | "recovery";

export function recordAuthAudit(input: {
  event: AuthAuditEvent;
  outcome: "success" | "failure";
  channel?: "email" | "phone" | "google";
  userId?: string;
  reason?: string;
}) {
  logger.info("auth_audit", {
    ...input,
    occurredAt: new Date().toISOString(),
  });
  void persistAuthAudit(input);
}
