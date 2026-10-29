"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { VerifyActivationPayment } from "./VerifyActivationPayment";

type Props = {
  circleId: string;
  planLabel: string;
  priceLabel: string;
  status: string;
};

export function CircleActivationPanel({
  circleId,
  planLabel,
  priceLabel,
  status,
}: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [billingEmail, setBillingEmail] = useState("");

  if (status === "active" || status === "grandfathered") return null;

  async function activate() {
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch(
        `/api/circles/${encodeURIComponent(circleId)}/activation`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ billingEmail }),
        },
      );
      const payload = (await response.json()) as {
        error?: string;
        checkoutUrl?: string;
        status?: string;
      };
      if (!response.ok) throw new Error(payload.error ?? "Activation failed.");
      if (payload.checkoutUrl) {
        window.location.assign(payload.checkoutUrl);
        return;
      }
      if (payload.status === "active") router.refresh();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to start circle activation.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <aside className="bc-activation-panel" aria-labelledby="activation-title">
      <div>
        <span>ACTIVATION REQUIRED</span>
        <h2 id="activation-title">Your circle draft is safely saved</h2>
        <p>
          Activate the {planLabel} plan for {priceLabel} once to publish this
          circle. Members and invitees are never charged by BondCircle.
        </p>
        {message ? (
          <p className="bc-activation-panel__error" role="alert">
            {message}
          </p>
        ) : null}
      </div>
      <label>
        Checkout email (if you registered by phone)
        <input
          type="email"
          autoComplete="email"
          maxLength={254}
          value={billingEmail}
          onChange={(event) => setBillingEmail(event.target.value)}
        />
      </label>
      <button type="button" onClick={activate} disabled={busy}>
        {busy ? "Preparing secure checkout…" : `Activate for ${priceLabel}`}
      </button>
      <VerifyActivationPayment circleId={circleId} />
    </aside>
  );
}
