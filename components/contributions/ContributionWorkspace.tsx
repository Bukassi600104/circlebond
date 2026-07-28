"use client";

import {
  AlertTriangle,
  Check,
  Clock3,
  Eye,
  FileImage,
  ReceiptText,
  RefreshCw,
  ShieldCheck,
  Upload,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Receipt = {
  id: string;
  uploaderId: string;
  uploaderName: string;
  amount: number;
  note: string | null;
  imageUrl: string;
  status: string;
  overpaymentAmount: number;
  replacementOfId: string | null;
  rejectionReason: string | null;
  submittedAt: string;
  reviewedAt: string | null;
  reviewerName: string | null;
};

type Workspace = {
  viewer: {
    displayName: string;
    role: string;
    expectedAmount: number;
    confirmedAmount: number;
    pendingAmount: number;
    remainingAmount: number;
    overpaymentAmount: number;
    status: string;
  };
  receipts: Receipt[];
  reviewQueue: Receipt[];
  canReview: boolean;
};

const money = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});
const dateTime = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
});

function label(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to secure this request.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

function ReceiptHistory({
  receipts,
  onReplace,
}: {
  receipts: Receipt[];
  onReplace: (receiptId: string) => void;
}) {
  if (!receipts.length) {
    return (
      <div className="bc-contribution-empty">
        <ReceiptText size={20} aria-hidden="true" />
        <p>No receipts submitted yet.</p>
      </div>
    );
  }
  return (
    <div className="bc-receipt-history">
      {receipts.map((receipt) => (
        <article key={receipt.id}>
          <span className={`is-${receipt.status}`}>
            {label(receipt.status)}
          </span>
          <div>
            <strong>{money.format(receipt.amount)}</strong>
            <small>{dateTime.format(new Date(receipt.submittedAt))}</small>
          </div>
          {receipt.note ? <p>{receipt.note}</p> : null}
          {receipt.rejectionReason ? (
            <p className="bc-receipt-history__reason">
              <AlertTriangle size={13} aria-hidden="true" />
              {receipt.rejectionReason}
            </p>
          ) : null}
          <footer>
            <a href={receipt.imageUrl} target="_blank" rel="noreferrer">
              <Eye size={13} aria-hidden="true" /> View receipt
            </a>
            {receipt.status === "rejected" ? (
              <button type="button" onClick={() => onReplace(receipt.id)}>
                <RefreshCw size={13} aria-hidden="true" /> Replace
              </button>
            ) : null}
          </footer>
        </article>
      ))}
    </div>
  );
}

export function ContributionWorkspace({
  circleId,
  heading = "Your contribution",
}: {
  circleId: string;
  heading?: string;
}) {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [replacementOfId, setReplacementOfId] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [rejectingId, setRejectingId] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const response = await fetch(`/api/circles/${circleId}/receipts`, {
      cache: "no-store",
    });
    const body = (await response.json()) as Workspace & { error?: string };
    if (!response.ok) throw new Error(body.error ?? "Unable to load receipts.");
    setWorkspace(body);
  }, [circleId]);

  useEffect(() => {
    let current = true;
    async function load() {
      try {
        const response = await fetch(`/api/circles/${circleId}/receipts`, {
          cache: "no-store",
        });
        const body = (await response.json()) as Workspace & { error?: string };
        if (!response.ok) {
          throw new Error(body.error ?? "Unable to load receipts.");
        }
        if (current) setWorkspace(body);
      } catch (loadError) {
        if (current) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Unable to load receipts.",
          );
        }
      } finally {
        if (current) setLoading(false);
      }
    }
    void load();
    return () => {
      current = false;
    };
  }, [circleId]);

  useEffect(() => {
    if (!uploadOpen && !rejectingId) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setUploadOpen(false);
        setRejectingId(null);
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [rejectingId, uploadOpen]);

  function openUpload(receiptId: string | null = null) {
    setReplacementOfId(receiptId);
    setUploadOpen(true);
    setError("");
  }

  async function submitReceipt(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("upload");
    setError("");
    try {
      const form = new FormData(event.currentTarget);
      if (replacementOfId) form.set("replacementOfId", replacementOfId);
      const response = await fetch(`/api/circles/${circleId}/receipts`, {
        method: "POST",
        headers: { "x-csrf-token": await csrfToken() },
        body: form,
      });
      const body = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(body.error ?? "Unable to submit.");
      setUploadOpen(false);
      setReplacementOfId(null);
      await refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit this receipt.",
      );
    } finally {
      setBusy(null);
    }
  }

  async function review(
    receiptId: string,
    decision: "approve" | "reject",
    rejectionReason = "",
  ) {
    setBusy(`review:${receiptId}`);
    setError("");
    try {
      const response = await fetch(
        `/api/circles/${circleId}/receipts/${receiptId}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-csrf-token": await csrfToken(),
          },
          body: JSON.stringify({ decision, rejectionReason }),
        },
      );
      const body = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(body.error ?? "Unable to review.");
      setRejectingId(null);
      await refresh();
    } catch (reviewError) {
      setError(
        reviewError instanceof Error
          ? reviewError.message
          : "Unable to review this receipt.",
      );
    } finally {
      setBusy(null);
    }
  }

  if (loading) {
    return (
      <section
        className="bc-contribution-workspace is-loading"
        aria-busy="true"
      >
        Loading contribution details…
      </section>
    );
  }
  if (!workspace) {
    return error ? (
      <p className="bc-contribution-error" role="alert">
        {error}
      </p>
    ) : null;
  }

  return (
    <section className="bc-contribution-workspace">
      <header>
        <div>
          <span>PRIVATE CONTRIBUTION</span>
          <h2>{heading}</h2>
          <p>Visible only to you and authorised circle managers.</p>
        </div>
        <span className={`is-${workspace.viewer.status}`}>
          {label(workspace.viewer.status)}
        </span>
      </header>
      <dl className="bc-contribution-totals">
        <div>
          <dt>Expected</dt>
          <dd>{money.format(workspace.viewer.expectedAmount)}</dd>
        </div>
        <div>
          <dt>Confirmed</dt>
          <dd>{money.format(workspace.viewer.confirmedAmount)}</dd>
        </div>
        <div>
          <dt>Pending</dt>
          <dd>{money.format(workspace.viewer.pendingAmount)}</dd>
        </div>
        <div>
          <dt>Remaining</dt>
          <dd>{money.format(workspace.viewer.remainingAmount)}</dd>
        </div>
      </dl>
      {workspace.viewer.overpaymentAmount > 0 ? (
        <p className="bc-contribution-warning">
          <AlertTriangle size={15} aria-hidden="true" />
          {money.format(workspace.viewer.overpaymentAmount)} is above your
          expected amount and has been flagged for review.
        </p>
      ) : null}
      {error ? (
        <p className="bc-contribution-error" role="alert">
          {error}
        </p>
      ) : null}
      <div className="bc-contribution-actions">
        <button type="button" onClick={() => openUpload()}>
          <Upload size={15} aria-hidden="true" />
          Upload receipt / record partial
        </button>
      </div>
      <section className="bc-contribution-history">
        <h3>Submitted receipts</h3>
        <ReceiptHistory receipts={workspace.receipts} onReplace={openUpload} />
      </section>

      {workspace.canReview ? (
        <section className="bc-review-queue">
          <header>
            <ShieldCheck size={17} aria-hidden="true" />
            <div>
              <h3>Pending receipt review</h3>
              <p>Private to creators and authorised co-admins.</p>
            </div>
            <span>{workspace.reviewQueue.length}</span>
          </header>
          {workspace.reviewQueue.length ? (
            <div>
              {workspace.reviewQueue.map((receipt) => (
                <article key={receipt.id}>
                  <div>
                    <strong>{receipt.uploaderName}</strong>
                    <small>
                      {dateTime.format(new Date(receipt.submittedAt))}
                    </small>
                  </div>
                  <strong>{money.format(receipt.amount)}</strong>
                  {receipt.overpaymentAmount > 0 ? (
                    <span className="bc-review-queue__flag">
                      +{money.format(receipt.overpaymentAmount)} over expected
                    </span>
                  ) : null}
                  <a href={receipt.imageUrl} target="_blank" rel="noreferrer">
                    <FileImage size={14} aria-hidden="true" /> View proof
                  </a>
                  <footer>
                    <button
                      type="button"
                      disabled={Boolean(busy)}
                      onClick={() => void review(receipt.id, "approve")}
                    >
                      <Check size={14} aria-hidden="true" />
                      {busy === `review:${receipt.id}`
                        ? "Reviewing…"
                        : "Confirm"}
                    </button>
                    <button
                      type="button"
                      className="is-reject"
                      disabled={Boolean(busy)}
                      onClick={() => setRejectingId(receipt.id)}
                    >
                      <X size={14} aria-hidden="true" /> Reject
                    </button>
                  </footer>
                </article>
              ))}
            </div>
          ) : (
            <p className="bc-review-queue__empty">
              <Clock3 size={16} aria-hidden="true" />
              No receipts are waiting for review.
            </p>
          )}
        </section>
      ) : null}

      {uploadOpen ? (
        <div
          className="bc-contribution-modal"
          role="presentation"
          onMouseDown={() => setUploadOpen(false)}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="receipt-upload-title"
            onMouseDown={(event) => event.stopPropagation()}
            onSubmit={submitReceipt}
          >
            <header>
              <div>
                <span>PAYMENT PROOF</span>
                <h3 id="receipt-upload-title">
                  {replacementOfId ? "Replace receipt" : "Upload receipt"}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close receipt upload"
                onClick={() => setUploadOpen(false)}
              >
                <X size={17} aria-hidden="true" />
              </button>
            </header>
            <label>
              Receipt image
              <input
                name="receiptImage"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                required
              />
              <small>JPG, PNG or WebP. Maximum 5 MB.</small>
            </label>
            <label>
              Amount paid (₦)
              <input
                name="amount"
                type="number"
                min="1"
                max="2000000000"
                step="1"
                required
              />
            </label>
            <label>
              Note <small>(optional)</small>
              <textarea name="note" rows={3} maxLength={500} />
            </label>
            <p>
              <ShieldCheck size={14} aria-hidden="true" />
              Only you, the circle creator and authorised co-admins can view
              this receipt.
            </p>
            <button type="submit" disabled={busy === "upload"}>
              {busy === "upload" ? "Submitting…" : "Submit for review"}
            </button>
          </form>
        </div>
      ) : null}

      {rejectingId ? (
        <div
          className="bc-contribution-modal"
          role="presentation"
          onMouseDown={() => setRejectingId(null)}
        >
          <form
            role="dialog"
            aria-modal="true"
            aria-labelledby="receipt-reject-title"
            onMouseDown={(event) => event.stopPropagation()}
            onSubmit={(event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              void review(
                rejectingId,
                "reject",
                String(form.get("rejectionReason") ?? ""),
              );
            }}
          >
            <header>
              <div>
                <span>REVIEW DECISION</span>
                <h3 id="receipt-reject-title">Reject receipt</h3>
              </div>
              <button
                type="button"
                aria-label="Close rejection form"
                onClick={() => setRejectingId(null)}
              >
                <X size={17} aria-hidden="true" />
              </button>
            </header>
            <label>
              Reason for rejection
              <textarea
                name="rejectionReason"
                rows={4}
                minLength={3}
                maxLength={500}
                required
                autoFocus
              />
            </label>
            <p>
              The contributor will see this reason and can upload a replacement.
            </p>
            <button type="submit" disabled={Boolean(busy)}>
              {busy ? "Rejecting…" : "Reject receipt"}
            </button>
          </form>
        </div>
      ) : null}
    </section>
  );
}
