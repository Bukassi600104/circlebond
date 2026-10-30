import { logger } from "@/lib/logger";

export interface PlayIntegrityVerdict {
  appRecognitionVerdict:
    | "PLAY_RECOGNIZED"
    | "UNRECOGNIZED_VERSION"
    | "UNEVALUATED";
  deviceRecognitionVerdict: string[];
  accountDetails?: {
    appLicensingVerdict: "LICENSED" | "UNLICENSED" | "UNEVALUATED";
  };
}

export async function evaluatePlayIntegrity(
  integrityToken?: string | null,
): Promise<{ passed: boolean; verdict?: string }> {
  if (process.env.NODE_ENV !== "production") {
    return { passed: true, verdict: "DEVELOPMENT_BYPASS" };
  }
  if (process.env.PLAY_INTEGRITY_ENABLED !== "true") {
    return { passed: false, verdict: "NOT_CONFIGURED" };
  }

  if (!integrityToken || typeof integrityToken !== "string") {
    logger.warn("play_integrity_missing_token");
    return { passed: false, verdict: "MISSING_TOKEN" };
  }

  logger.warn("play_integrity_verification_unavailable");
  return { passed: false, verdict: "VERIFICATION_UNAVAILABLE" };
}
