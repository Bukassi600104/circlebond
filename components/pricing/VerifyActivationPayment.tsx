"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function VerifyActivationPayment({ circleId }: { circleId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function verify() {
    setBusy(true);
    try {
      const response = await fetch(
        `/api/circles/${encodeURIComponent(circleId)}/activation/verify`,
        { method: "POST" },
      );
      const payload = await response.json();
      if (!response.ok)
        throw new Error(payload.error ?? "Payment verification unavailable.");
      if (payload.status === "active") {
        setMessage("Payment verified. Your circle is active.");
        router.refresh();
      } else {
        setMessage(
          payload.status === "no_pending_payment"
            ? "There is no pending checkout to verify. Refresh to view your current plan."
            : payload.status === "failed"
              ? "The payment did not complete. You can start checkout again."
              : payload.status === "reconciliation_required"
                ? "The payment needs organizer support. Your existing plan has been preserved."
                : "No successful payment has been verified. Retry after completing checkout.",
        );
      }
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to verify payment.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <div>
      <button type="button" onClick={verify} disabled={busy}>
        {busy ? "Verifying payment…" : "Already paid? Verify payment"}
      </button>
      <p role="status">{message}</p>
    </div>
  );
}
