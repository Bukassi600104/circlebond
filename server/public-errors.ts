import { CircleRuleError } from "@/server/circles/engine";
import { CommunicationRuleError } from "@/server/communication/rules";
import { PricingRuleError } from "@/server/pricing/entitlements";

export class RequestValidationError extends Error {}

export function isPublicError(error: unknown): error is Error {
  return (
    error instanceof RequestValidationError ||
    error instanceof CircleRuleError ||
    error instanceof CommunicationRuleError ||
    error instanceof PricingRuleError
  );
}
