"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Card } from "@/components/ui";
import { LogoutButton } from "@/features/auth/components";
import type { PrivacyRequest } from "@/server/repositories/account-privacy";

const dateTime = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeZone: "Africa/Lagos",
});

async function csrf() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok)
    throw new Error("Unable to start a secure request. Refresh and try again.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

async function readRequests(): Promise<PrivacyRequest[]> {
  const response = await fetch("/api/account/privacy-requests", {
    cache: "no-store",
  });
  const result = await response.json();
  if (!response.ok)
    throw new Error(result.error ?? "Unable to load request status.");
  return result.requests;
}

export function AccountSettings() {
  const [requests, setRequests] = useState<PrivacyRequest[]>([]);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    void readRequests()
      .then(setRequests)
      .catch(() =>
        setError(
          "Request status is unavailable. Retry to check before submitting again.",
        ),
      );
  }, []);

  async function perform(action: string, task: () => Promise<void>) {
    setBusy(action);
    setError("");
    setMessage("");
    try {
      await task();
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Connection unavailable. Please try again.",
      );
    } finally {
      setBusy("");
    }
  }

  async function download() {
    await perform("download", async () => {
      const response = await fetch("/api/account/export", {
        cache: "no-store",
      });
      if (!response.ok)
        throw new Error(
          (await response.json()).error ?? "Unable to prepare your export.",
        );
      const url = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = url;
      link.download = "bondcircle-account.json";
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setMessage(
        "Your structured account export is ready. Store it somewhere private.",
      );
    });
  }

  async function request(kind: "export" | "deletion") {
    await perform(kind, async () => {
      const response = await fetch("/api/account/privacy-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": await csrf(),
        },
        body: JSON.stringify({ kind }),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error ?? "Unable to record your request.");
      setRequests((items) => [
        ...items.filter((item) => item.kind !== kind),
        result.request,
      ]);
      setMessage(result.message);
    });
  }

  const deletion = requests.find((item) => item.kind === "deletion");
  return (
    <div className="bc-account-settings">
      <Card>
        <h2>Preferences and account access</h2>
        <nav aria-label="Account settings links">
          <Link href="/account/notifications">
            Notification preferences and muted circles
          </Link>
          <Link href="/account/profile">
            Profile and verified contact details
          </Link>
          <Link href="/account-recovery">Recover account access</Link>
          <Link href="/legal/terms">Terms of Service</Link>
          <Link href="/legal/privacy">Privacy Notice</Link>
        </nav>
      </Card>
      <Card>
        <h2>Your account data</h2>
        <p>
          Download your profile, contribution records and authored content as
          JSON. Private receipt images, credentials and other participants’
          personal records are excluded.
        </p>
        <Button
          type="button"
          onClick={download}
          disabled={Boolean(busy)}
          loading={busy === "download"}
        >
          Download account data
        </Button>
        <p>
          For image copies or an export that needs assistance, record a data
          export request.
        </p>
        <Button
          type="button"
          variant="secondary"
          disabled={
            Boolean(busy) || requests.some((item) => item.kind === "export")
          }
          loading={busy === "export"}
          onClick={() => request("export")}
        >
          Request assisted export
        </Button>
      </Card>
      <Card>
        <h2>Request account deletion</h2>
        <p>
          This starts a privacy review. Your account stays active while
          identity, shared circle records and applicable retention obligations
          are reviewed. Submitting a request does not erase your account or
          cancel circles.
        </p>
        {deletion ? (
          <p role="status">
            Deletion request{" "}
            {deletion.status === "processing" ? "under review" : "received"} on{" "}
            {dateTime.format(new Date(deletion.createdAt))}.
          </p>
        ) : (
          <>
            <label className="bc-account-settings__confirmation">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(event) => setConfirmed(event.target.checked)}
              />
              I understand this requests a review and does not immediately
              delete my account.
            </label>
            <Button
              type="button"
              variant="danger"
              disabled={!confirmed || Boolean(busy)}
              loading={busy === "deletion"}
              onClick={() => request("deletion")}
            >
              Request account deletion
            </Button>
          </>
        )}
      </Card>
      {requests.length > 0 && (
        <Card>
          <h2>Privacy request status</h2>
          <ul>
            {requests.map((item) => (
              <li key={item.id}>
                {item.kind === "export"
                  ? "Assisted export"
                  : "Account deletion"}
                : {item.status === "processing" ? "under review" : "received"} —{" "}
                {dateTime.format(new Date(item.createdAt))}
              </li>
            ))}
          </ul>
        </Card>
      )}
      {message && <p role="status">{message}</p>}
      {error && (
        <div role="alert">
          <p>{error}</p>
          <Button
            type="button"
            variant="secondary"
            disabled={Boolean(busy)}
            onClick={() =>
              perform("retry", async () => setRequests(await readRequests()))
            }
          >
            Retry request status
          </Button>
        </div>
      )}
      <Card>
        <h2>Sign out</h2>
        <p>End your secure session and revoke existing sign-in sessions.</p>
        <LogoutButton />
      </Card>
    </div>
  );
}
