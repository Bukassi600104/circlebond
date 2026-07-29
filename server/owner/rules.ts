export const ADMIN_PURPOSES = [
  "support",
  "fraud",
  "security",
  "legal",
] as const;

export type AdminPurpose = (typeof ADMIN_PURPOSES)[number];

export const SUSPENSION_REASONS = [
  "abuse",
  "fraud_risk",
  "security_compromise",
  "legal_requirement",
] as const;

export type SuspensionReason = (typeof SUSPENSION_REASONS)[number];

export const OPERATIONAL_REPORTS = [
  "platform_summary",
  "abuse_operations",
  "retention_operations",
] as const;

export type OperationalReport = (typeof OPERATIONAL_REPORTS)[number];

export function assertAdminPurpose(
  value: unknown,
): asserts value is AdminPurpose {
  if (
    typeof value !== "string" ||
    !(ADMIN_PURPOSES as readonly string[]).includes(value)
  ) {
    throw new Error("Choose an approved administrative purpose.");
  }
}

export function assertSuspensionReason(
  value: unknown,
): asserts value is SuspensionReason {
  if (
    typeof value !== "string" ||
    !(SUSPENSION_REASONS as readonly string[]).includes(value)
  ) {
    throw new Error("Choose a valid account-suspension reason.");
  }
}

export function assertOperationalReport(
  value: unknown,
): asserts value is OperationalReport {
  if (
    typeof value !== "string" ||
    !(OPERATIONAL_REPORTS as readonly string[]).includes(value)
  ) {
    throw new Error("Choose an approved operational report.");
  }
}

export function safeAuditMetadata(
  metadata: Record<string, string | number | boolean | null>,
) {
  const entries = Object.entries(metadata).slice(0, 12);
  return JSON.stringify(Object.fromEntries(entries)).slice(0, 1000);
}

export function csvCell(value: unknown) {
  let text = value == null ? "" : String(value);
  if (/^[=+\-@]/.test(text)) text = `'${text}`;
  return `"${text.replaceAll('"', '""').replaceAll(/\r?\n/g, " ")}"`;
}

export function csvDocument(rows: unknown[][]) {
  return `\uFEFF${rows.map((row) => row.map(csvCell).join(",")).join("\r\n")}\r\n`;
}

export function operationalReasonCode(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  if (message.includes("size") || message.includes("5 mb")) {
    return "size_rejected";
  }
  if (
    message.includes("jpg") ||
    message.includes("png") ||
    message.includes("webp") ||
    message.includes("valid image")
  ) {
    return "format_rejected";
  }
  if (message.includes("sign in")) return "unauthenticated";
  if (message.includes("permission") || message.includes("authorised")) {
    return "permission_rejected";
  }
  return "processing_failed";
}
