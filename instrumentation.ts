import type { Instrumentation } from "next";
import { logger } from "@/lib/logger";

function errorIdentity(error: unknown) {
  if (!(error instanceof Error)) return { errorName: "UnknownError" };
  const digest = (error as Error & { digest?: unknown }).digest;
  return {
    errorName: error.name.slice(0, 80),
    ...(typeof digest === "string" ? { digest: digest.slice(0, 128) } : {}),
  };
}

export const onRequestError: Instrumentation.onRequestError = (
  error,
  errorRequest,
  errorContext,
) => {
  logger.error("unhandled_request_error", {
    ...errorIdentity(error),
    method: errorRequest.method.slice(0, 12),
    route: errorContext.routePath,
    routeType: errorContext.routeType,
  });
};
