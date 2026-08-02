"use client";

import { useState } from "react";

type UpgradeOption = {
  plan: "starter" | "standard" | "premium";
  priceLabel: string;
  memberLimit: number;
  coAdminLimit: number;
};

export function CircleUpgradePanel({
  circleId,
  options,
}: {
  circleId: string;
  options: UpgradeOption[];
}) {
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  if (!options.length) return null;

  async function upgrade(option: UpgradeOption) {
    setBusy(option.plan);
    setMessage("");
    try {
      const response = await fetch(
        `/api/circles/${encodeURIComponent(circleId)}/upgrade`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ targetPlan: option.plan }),
        },
      );
      const payload = (await response.json()) as {
        error?: string;
        checkoutUrl?: string;
      };
      if (!response.ok) throw new Error(payload.error ?? "Upgrade failed.");
      if (!payload.checkoutUrl) throw new Error("Checkout is unavailable.");
      window.location.assign(payload.checkoutUrl);
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to start the upgrade.",
      );
    } finally {
      setBusy("");
    }
  }

  return (
    <details className="bc-upgrade-panel">
      <summary>View upgrade options</summary>
      <p>
        Upgrade only within this circle type. Your existing members, activity
        and records remain unchanged.
      </p>
      <div>
        {options.map((option) => (
          <button
            key={option.plan}
            type="button"
            disabled={Boolean(busy)}
            onClick={() => void upgrade(option)}
          >
            <span>{option.plan}</span>
            <strong>{option.priceLabel} difference</strong>
            <small>
              {option.memberLimit} members · {option.coAdminLimit} co-admins
            </small>
            <em>{busy === option.plan ? "Preparing…" : "Upgrade"}</em>
          </button>
        ))}
      </div>
      {message ? <p className="bc-upgrade-panel__error">{message}</p> : null}
    </details>
  );
}
