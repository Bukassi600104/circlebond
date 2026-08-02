import { NextResponse } from "next/server";
import { PricingRuleError } from "./entitlements.ts";

export function pricingErrorResponse(error: unknown, fallback: string) {
  if (error instanceof PricingRuleError) {
    return NextResponse.json(
      { error: error.message, code: error.code },
      { status: error.status },
    );
  }
  return NextResponse.json(
    { error: error instanceof Error ? error.message : fallback },
    { status: 400 },
  );
}
