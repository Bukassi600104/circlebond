import { NextResponse } from "next/server";
import { LegalAcceptanceError } from "@/server/auth/legal";
import { PricingRuleError } from "./entitlements.ts";

export function pricingErrorResponse(error: unknown, fallback: string) {
  if (
    error instanceof PricingRuleError ||
    error instanceof LegalAcceptanceError
  ) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.status },
    );
  }
  return NextResponse.json({ error: fallback }, { status: 400 });
}
