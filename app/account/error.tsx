"use client";

import { AlertCircle } from "lucide-react";

export default function AccountError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bc-dashboard-error" role="alert">
      <span>
        <AlertCircle size={22} aria-hidden="true" />
      </span>
      <h1>We couldn&apos;t load your circles</h1>
      <p>
        Check your connection and try again. Your account information is safe.
      </p>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </section>
  );
}
