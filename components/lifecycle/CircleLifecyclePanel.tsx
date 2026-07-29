"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Archive,
  CalendarClock,
  CheckCircle2,
  LockKeyhole,
  PackageCheck,
  Plus,
  ShieldCheck,
  X,
  XCircle,
} from "lucide-react";
import type { CircleLifecycleSummary } from "@/server/repositories/lifecycle";
import {
  COMPLETION_TYPES,
  completionLabel,
  retentionDaysRemaining,
  type CompletionType,
} from "@/server/retention/rules";

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to start a secure request.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

const date = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "Africa/Lagos",
});

function eventLabel(value: string) {
  const labels: Record<string, string> = {
    completed: "Circle completed",
    archived: "Circle archived",
    cancelled: "Circle cancelled",
    fulfilment: "Fulfilment started",
    target_reached: "Target reached",
    active: "Contributions opened",
    published: "Circle published",
    circle_created: "Circle created",
  };
  return labels[value] ?? value.replaceAll("_", " ");
}

export function CircleLifecyclePanel({
  summary,
}: {
  summary: CircleLifecycleSummary;
}) {
  const router = useRouter();
  const [dialog, setDialog] = useState<
    "complete" | "archive" | "cancel" | null
  >(null);
  const [completionType, setCompletionType] = useState<CompletionType | "">(
    summary.completionType ?? "",
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const closed = ["completed", "cancelled", "archived", "purged"].includes(
    summary.status,
  );
  const remaining = retentionDaysRemaining(summary.retentionDueAt);
  const completionOptions = COMPLETION_TYPES[summary.type];

  async function submit(action: "complete" | "archive" | "cancel") {
    setBusy(true);
    setError("");
    try {
      const csrf = await csrfToken();
      const response = await fetch(`/api/circles/${summary.id}/lifecycle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify({ action, completionType }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error ?? "Unable to update this circle.");
      }
      setDialog(null);
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section
      className={`bc-lifecycle ${closed ? "is-closed" : ""}`}
      aria-label="Circle lifecycle"
    >
      <header>
        <div>
          <span>
            {closed ? (
              <LockKeyhole size={16} aria-hidden="true" />
            ) : (
              <ShieldCheck size={16} aria-hidden="true" />
            )}
          </span>
          <div>
            <small>CIRCLE LIFECYCLE</small>
            <h2>
              {summary.status === "completed"
                ? "Circle completed"
                : summary.status === "archived"
                  ? "Historical archive"
                  : summary.status === "cancelled"
                    ? "Circle cancelled"
                    : "Completion and archive"}
            </h2>
          </div>
        </div>
        <strong className={`is-${summary.status}`}>
          {summary.status.replaceAll("_", " ")}
        </strong>
      </header>

      {closed ? (
        <>
          <div className="bc-lifecycle-summary">
            <div>
              <span>
                <PackageCheck size={17} aria-hidden="true" />
              </span>
              <small>Outcome</small>
              <strong>
                {summary.completionType
                  ? completionLabel(summary.completionType)
                  : summary.status === "cancelled"
                    ? "Circle cancelled"
                    : "Completed"}
              </strong>
            </div>
            <div>
              <span>
                <CheckCircle2 size={17} aria-hidden="true" />
              </span>
              <small>Contributors</small>
              <strong>{summary.memberCount} members</strong>
            </div>
            <div>
              <span>
                <ShieldCheck size={17} aria-hidden="true" />
              </span>
              <small>Pricing plan</small>
              <strong>{summary.pricingPlan.replaceAll("_", " ")}</strong>
            </div>
            <div>
              <span>
                <CalendarClock size={17} aria-hidden="true" />
              </span>
              <small>Private-data retention</small>
              <strong>
                {summary.purgeAt
                  ? "Sensitive data purged"
                  : remaining === null
                    ? "Not scheduled"
                    : `${remaining} day${remaining === 1 ? "" : "s"} remaining`}
              </strong>
            </div>
          </div>

          {summary.retentionDueAt && !summary.purgeAt ? (
            <p className="bc-lifecycle-retention">
              Receipt files and temporary circle communication are scheduled for
              secure deletion on{" "}
              <strong>{date.format(new Date(summary.retentionDueAt))}</strong>.
              Profile images remain with their owners.
            </p>
          ) : null}

          <section className="bc-lifecycle-timeline">
            <h3>Timeline</h3>
            <ol>
              {summary.timeline.slice(0, 8).map((event) => (
                <li key={event.id}>
                  <span />
                  <div>
                    <strong>{eventLabel(event.eventType)}</strong>
                    <small>
                      {event.actorName ? `${event.actorName} · ` : ""}
                      {date.format(new Date(event.createdAt))}
                    </small>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </>
      ) : (
        <p>
          When the creator records the final outcome, contributions, membership
          changes and communication lock immediately.
        </p>
      )}

      <footer>
        <Link href="/account/create">
          <Plus size={14} aria-hidden="true" /> Create new circle
        </Link>
        {summary.viewerIsCreator &&
        (!closed ||
          (summary.status === "completed" && !summary.completionType)) ? (
          <>
            {!closed ? (
              <button type="button" onClick={() => setDialog("cancel")}>
                <XCircle size={14} aria-hidden="true" /> Cancel circle
              </button>
            ) : null}
            <button
              className="is-primary"
              type="button"
              onClick={() => setDialog("complete")}
            >
              <CheckCircle2 size={14} aria-hidden="true" /> Complete circle
            </button>
          </>
        ) : null}
        {summary.viewerIsCreator &&
        ["completed", "cancelled"].includes(summary.status) ? (
          <button
            className="is-primary"
            type="button"
            onClick={() => setDialog("archive")}
          >
            <Archive size={14} aria-hidden="true" /> Archive circle
          </button>
        ) : null}
      </footer>

      {dialog ? (
        <div
          className="bc-lifecycle-dialog"
          role="presentation"
          onMouseDown={() => !busy && setDialog(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="lifecycle-dialog-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              className="bc-lifecycle-dialog__close"
              type="button"
              aria-label="Close"
              disabled={busy}
              onClick={() => setDialog(null)}
            >
              <X size={15} aria-hidden="true" />
            </button>
            <h2 id="lifecycle-dialog-title">
              {dialog === "complete"
                ? "Complete this circle"
                : dialog === "archive"
                  ? "Archive this circle"
                  : "Cancel this circle"}
            </h2>
            {dialog === "complete" ? (
              <>
                <p>
                  Choose the final outcome. This immediately makes the circle
                  read-only and starts the 30-day retention countdown.
                </p>
                <fieldset>
                  <legend>Completion outcome</legend>
                  {completionOptions.map((value) => (
                    <label key={value}>
                      <input
                        type="radio"
                        name="completionType"
                        value={value}
                        checked={completionType === value}
                        onChange={() => setCompletionType(value)}
                      />
                      {completionLabel(value)}
                    </label>
                  ))}
                </fieldset>
              </>
            ) : (
              <p>
                {dialog === "archive"
                  ? "The historical summary remains visible, but no editing or new activity will be allowed."
                  : "Cancellation locks this circle and starts the same 30-day private-data retention period."}
              </p>
            )}
            {error ? (
              <p className="bc-lifecycle-error" role="alert">
                {error}
              </p>
            ) : null}
            <footer>
              <button
                type="button"
                disabled={busy}
                onClick={() => setDialog(null)}
              >
                Go back
              </button>
              <button
                className={dialog === "cancel" ? "is-danger" : "is-primary"}
                type="button"
                disabled={busy || (dialog === "complete" && !completionType)}
                onClick={() => void submit(dialog)}
              >
                {busy
                  ? "Updating…"
                  : dialog === "complete"
                    ? "Confirm completion"
                    : dialog === "archive"
                      ? "Confirm archive"
                      : "Confirm cancellation"}
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </section>
  );
}
