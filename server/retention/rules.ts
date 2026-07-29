import type { CircleState, CircleType } from "@/server/circles/engine";

export const RETENTION_DAYS = 30;
export const RETENTION_RETRY_MS = 6 * 60 * 60 * 1000;

export const COMPLETION_TYPES = {
  gift: ["gift_purchased", "gift_delivered"],
  "aso-ebi": ["fabric_distributed", "fabric_collected", "deliveries_completed"],
  support: ["support_delivered", "campaign_completed"],
} as const satisfies Record<CircleType, readonly string[]>;

export type CompletionType =
  (typeof COMPLETION_TYPES)[keyof typeof COMPLETION_TYPES][number];

export function completionLabel(value: CompletionType) {
  const labels: Record<CompletionType, string> = {
    gift_purchased: "Gift purchased",
    gift_delivered: "Gift delivered",
    fabric_distributed: "Fabric distributed",
    fabric_collected: "Fabric collected",
    deliveries_completed: "Deliveries completed",
    support_delivered: "Support delivered",
    campaign_completed: "Campaign completed",
  };
  return labels[value];
}

export function assertCompletionType(
  circleType: CircleType,
  value: unknown,
): asserts value is CompletionType {
  if (
    typeof value !== "string" ||
    !(COMPLETION_TYPES[circleType] as readonly string[]).includes(value)
  ) {
    throw new Error("Choose a valid completion outcome for this circle.");
  }
}

export function retentionDueAt(from = new Date()) {
  const due = new Date(from);
  due.setUTCDate(due.getUTCDate() + RETENTION_DAYS);
  return due.toISOString();
}

export function retentionDaysRemaining(dueAt: string | null, now = new Date()) {
  if (!dueAt) return null;
  const remaining = new Date(dueAt).getTime() - now.getTime();
  return Math.max(0, Math.ceil(remaining / 86_400_000));
}

export function isRetentionEligible(
  status: CircleState,
  dueAt: string | null,
  purgeAt: string | null,
  now = new Date(),
) {
  return (
    ["completed", "cancelled", "archived"].includes(status) &&
    Boolean(dueAt) &&
    !purgeAt &&
    new Date(dueAt as string).getTime() <= now.getTime()
  );
}

export function assertPrivateStoragePath(path: string) {
  if (
    !/^(receipts|circles)\/[A-Za-z0-9_-]+\/[A-Za-z0-9_./-]+$/.test(path) ||
    path.includes("..")
  ) {
    throw new Error("Unsafe retention storage path.");
  }
  return path;
}
