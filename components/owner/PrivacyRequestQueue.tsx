"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card } from "@/components/ui";
import type { OwnerPrivacyRequest } from "@/server/repositories/account-privacy";

export function PrivacyRequestQueue({
  requests,
}: {
  requests: OwnerPrivacyRequest[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  async function acknowledge(id: string) {
    setBusy(id);
    setError("");
    try {
      const csrf = await fetch("/api/auth/csrf", { cache: "no-store" });
      if (!csrf.ok) throw new Error("Unable to start a secure request.");
      const response = await fetch("/api/owner/privacy-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": (await csrf.json()).csrfToken,
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok)
        throw new Error(
          (await response.json()).error ?? "Unable to update request.",
        );
      router.refresh();
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "Unable to update request.",
      );
    } finally {
      setBusy("");
    }
  }
  return (
    <div className="bc-account-settings">
      {error && <p role="alert">{error}</p>}
      {!requests.length && <p>No privacy requests on this page.</p>}
      {requests.map((request) => (
        <Card key={request.id}>
          <h2>
            {request.kind === "deletion"
              ? "Account deletion"
              : "Assisted export"}
          </h2>
          <p>
            {request.user.displayName} —{" "}
            {request.user.email ?? request.user.phone ?? request.user.id}
          </p>
          <p>Reference: {request.id}</p>
          <p>Status: {request.status}</p>
          <p>
            Received:{" "}
            {new Intl.DateTimeFormat("en-NG", {
              dateStyle: "medium",
              timeStyle: "short",
              timeZone: "Africa/Lagos",
            }).format(new Date(request.createdAt))}
          </p>
          {request.status === "requested" && (
            <Button
              type="button"
              disabled={Boolean(busy)}
              loading={busy === request.id}
              onClick={() => acknowledge(request.id)}
            >
              Acknowledge review
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
}
