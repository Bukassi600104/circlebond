export const MUTATION_TIMEOUT_MS = 20_000;

export function mutationTimeoutSignal() {
  return AbortSignal.timeout(MUTATION_TIMEOUT_MS);
}

export function mutationErrorMessage(error: unknown, fallback: string) {
  if (error instanceof DOMException && error.name === "TimeoutError") {
    return "This is taking longer than expected. Check your connection and try again; do not repeat the action if it already appears in your activity.";
  }
  return error instanceof Error ? error.message : fallback;
}
