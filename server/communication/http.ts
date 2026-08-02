import { NextResponse } from "next/server";
import { CommunicationRuleError } from "@/server/communication/rules";
import { PricingRuleError } from "@/server/pricing";

export function communicationErrorResponse(error: unknown, fallback: string) {
  if (error instanceof PricingRuleError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.status },
    );
  }
  const message = error instanceof Error ? error.message : fallback;
  let status = 400;
  if (error instanceof CommunicationRuleError) {
    if (error.code === "PERMISSION_DENIED") status = 403;
    if (
      error.code === "COMMUNICATION_LOCKED" ||
      error.code === "COMMENTS_CLOSED"
    ) {
      status = 409;
    }
    if (error.code === "RATE_LIMITED") status = 429;
  }
  return NextResponse.json({ error: message }, { status });
}
