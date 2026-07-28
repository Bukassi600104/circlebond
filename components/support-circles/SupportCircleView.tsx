"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Banknote,
  CalendarDays,
  CheckCircle2,
  EyeOff,
  HeartHandshake,
  LockKeyhole,
  Megaphone,
  Send,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import type {
  SupportCircleDetail,
  SupportCircleMember,
} from "@/server/repositories/support-circles";
import { InvitationManager } from "@/components/invitations/InvitationManager";
import { ContributionWorkspace } from "@/components/contributions/ContributionWorkspace";

const naira = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const dateFormat = new Intl.DateTimeFormat("en-NG", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function label(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to start a secure request.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

function Avatar({ member }: { member: SupportCircleMember }) {
  return member.profileImage ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={member.profileImage} alt="" />
  ) : (
    <span>{member.displayName.charAt(0).toUpperCase()}</span>
  );
}

export function SupportCircleView({
  circle,
  viewerId,
}: {
  circle: SupportCircleDetail;
  viewerId: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [confirmCompletion, setConfirmCompletion] = useState(false);
  const viewer = circle.members.find((member) => member.id === viewerId);
  const completed = circle.status === "completed";
  const progress =
    circle.targetAmount && circle.contributedAmount !== null
      ? Math.min(
          100,
          Math.round((circle.contributedAmount / circle.targetAmount) * 100),
        )
      : null;

  async function submitJson(path: string, body: object, busyKey: string) {
    setBusy(busyKey);
    setError("");
    try {
      const csrf = await csrfToken();
      const response = await fetch(path, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify(body),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error ?? "Please try again.");
      router.refresh();
      return true;
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
      return false;
    } finally {
      setBusy("");
    }
  }

  async function recordPledge(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const ok = await submitJson(
      `/api/circles/${circle.id}/support/pledge`,
      { amount: Number(form.get("amount")) },
      "pledge",
    );
    if (ok) event.currentTarget.reset();
  }

  async function publishUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const ok = await submitJson(
      `/api/circles/${circle.id}/support/updates`,
      { body: String(form.get("body") ?? "") },
      "update",
    );
    if (ok) event.currentTarget.reset();
  }

  async function completeCircle() {
    const ok = await submitJson(
      `/api/circles/${circle.id}/support/complete`,
      {},
      "complete",
    );
    if (ok) setConfirmCompletion(false);
  }

  return (
    <section className="bc-support-view">
      <Link href="/account">
        <ArrowLeft size={15} aria-hidden="true" />
        Dashboard
      </Link>

      <header className="bc-support-hero">
        {circle.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={circle.imageUrl} alt="" />
        ) : null}
        <div>
          <span>SUPPORT CIRCLE · {label(circle.supportType)}</span>
          <h1>{circle.name}</h1>
          <p>{circle.description}</p>
          <dl>
            <div>
              <dt>Beneficiary</dt>
              <dd>
                {circle.beneficiaryName ?? (
                  <span>
                    <LockKeyhole size={13} aria-hidden="true" />
                    Private beneficiary
                  </span>
                )}
              </dd>
            </div>
            {circle.beneficiaryRelationship ? (
              <div>
                <dt>Relationship</dt>
                <dd>{circle.beneficiaryRelationship}</dd>
              </div>
            ) : null}
            <div>
              <dt>
                <CalendarDays size={13} aria-hidden="true" /> Deadline
              </dt>
              <dd>
                {circle.deadline
                  ? dateFormat.format(new Date(`${circle.deadline}T12:00:00`))
                  : "Not set"}
              </dd>
            </div>
          </dl>
          {completed ? (
            <strong className="bc-support-completed">
              <CheckCircle2 size={16} aria-hidden="true" />
              Support delivered
            </strong>
          ) : null}
        </div>
      </header>

      {error ? (
        <p className="bc-gift-create__error" role="alert">
          {error}
        </p>
      ) : null}

      <section className="bc-support-progress">
        <div>
          <span>Target</span>
          <strong>
            {circle.targetAmount !== null
              ? naira.format(circle.targetAmount)
              : "Private"}
          </strong>
        </div>
        <div>
          <span>Confirmed support</span>
          <strong>
            {circle.contributedAmount !== null
              ? naira.format(circle.contributedAmount)
              : "Private"}
          </strong>
        </div>
        <div>
          <span>Progress</span>
          <strong>{progress !== null ? `${progress}%` : "Private"}</strong>
        </div>
        {progress !== null ? (
          <span aria-label={`${progress}% confirmed`}>
            <i style={{ width: `${progress}%` }} />
          </span>
        ) : null}
      </section>

      <div className="bc-support-view__layout">
        <main>
          <section className="bc-support-self">
            <header>
              <div>
                <span>
                  <HeartHandshake size={18} aria-hidden="true" />
                </span>
                <div>
                  <h2>Your support</h2>
                  <p>
                    Only you and authorized circle managers see this detail.
                  </p>
                </div>
              </div>
              <small>{label(viewer?.contributionStatus ?? "joined")}</small>
            </header>
            <dl>
              <div>
                <dt>Expected</dt>
                <dd>
                  {viewer?.expectedAmount !== null &&
                  viewer?.expectedAmount !== undefined
                    ? naira.format(viewer.expectedAmount)
                    : "Not set"}
                </dd>
              </div>
              <div>
                <dt>Pledged</dt>
                <dd>{naira.format(viewer?.pledgedAmount ?? 0)}</dd>
              </div>
              <div>
                <dt>Confirmed</dt>
                <dd>{naira.format(viewer?.confirmedAmount ?? 0)}</dd>
              </div>
            </dl>
            {!completed ? (
              <form onSubmit={recordPledge}>
                <label>
                  Support amount (₦)
                  <input
                    name="amount"
                    type="number"
                    min="1"
                    max="2000000000"
                    step="1"
                    required
                  />
                </label>
                <button type="submit" disabled={Boolean(busy)}>
                  {busy === "pledge" ? "Recording…" : "Record support pledge"}
                </button>
              </form>
            ) : null}
            <small>
              A pledge records your intention. Payment confirmation follows the
              approved receipt-review process.
            </small>
          </section>

          <ContributionWorkspace
            circleId={circle.id}
            heading="Your support contribution"
          />

          <section className="bc-support-members">
            <header>
              <div>
                <Users size={18} aria-hidden="true" />
                <h2>Members</h2>
              </div>
              <div className="bc-circle-member-actions">
                <small>
                  {circle.members.length}/{circle.memberLimit}
                </small>
                {circle.viewerCanManage ? (
                  <InvitationManager
                    circleId={circle.id}
                    contributionMode={circle.contributionMode}
                    openSlots={circle.memberLimit - circle.members.length}
                    requireApproval={circle.requireCreatorApproval}
                  />
                ) : null}
              </div>
            </header>
            <div>
              {circle.members.map((member) => (
                <article key={member.id}>
                  <div className="bc-support-avatar">
                    <Avatar member={member} />
                  </div>
                  <div>
                    <strong>
                      {member.displayName}
                      {member.id === viewerId ? " (You)" : ""}
                    </strong>
                    <small>{label(member.contributionStatus)}</small>
                  </div>
                  {member.pledgedAmount !== null ? (
                    <span>{naira.format(member.pledgedAmount)}</span>
                  ) : (
                    <span title="Individual amount is private">
                      <EyeOff size={14} aria-hidden="true" /> Private
                    </span>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="bc-support-updates">
            <header>
              <div>
                <Megaphone size={18} aria-hidden="true" />
                <h2>Updates</h2>
              </div>
            </header>
            {circle.viewerCanManage && !completed ? (
              <form onSubmit={publishUpdate}>
                <label>
                  Share an official update
                  <textarea name="body" rows={3} maxLength={1000} required />
                </label>
                <button type="submit" disabled={Boolean(busy)}>
                  <Send size={14} aria-hidden="true" />
                  {busy === "update" ? "Publishing…" : "Publish update"}
                </button>
              </form>
            ) : null}
            {circle.updates.length ? (
              <div>
                {circle.updates.map((update) => (
                  <article key={update.id}>
                    <p>{update.body}</p>
                    <footer>
                      <strong>{update.authorName}</strong>
                      <time dateTime={update.createdAt}>
                        {dateFormat.format(new Date(update.createdAt))}
                      </time>
                    </footer>
                  </article>
                ))}
              </div>
            ) : (
              <p>No updates have been published yet.</p>
            )}
          </section>
        </main>

        <aside className="bc-support-sidebar">
          <section>
            <header>
              <Banknote size={17} aria-hidden="true" />
              <div>
                <small>PAY CONTRIBUTIONS TO</small>
                <h2>Payment account</h2>
              </div>
            </header>
            {circle.paymentAccountNumber ? (
              <dl>
                <div>
                  <dt>Bank</dt>
                  <dd>{circle.paymentBankName}</dd>
                </div>
                <div>
                  <dt>Account name</dt>
                  <dd>{circle.paymentAccountName}</dd>
                </div>
                <div>
                  <dt>Account number</dt>
                  <dd>{circle.paymentAccountNumber}</dd>
                </div>
              </dl>
            ) : (
              <p>Payment account details have not been added.</p>
            )}
            <footer>BondCircle does not hold or process this money.</footer>
          </section>

          <section className="bc-support-privacy-summary">
            <header>
              <ShieldCheck size={17} aria-hidden="true" />
              <h2>Circle privacy</h2>
            </header>
            <ul>
              <li>
                Beneficiary:{" "}
                {circle.showBeneficiaryName ? "visible" : "private"}
              </li>
              <li>
                Individual amounts:{" "}
                {circle.hideIndividualAmounts ? "private" : "visible"}
              </li>
              <li>
                Membership:{" "}
                {circle.requireCreatorApproval
                  ? "approval required"
                  : "invitation"}
              </li>
            </ul>
          </section>

          {circle.creatorId === viewerId && !completed ? (
            <button
              className="bc-support-complete-button"
              type="button"
              onClick={() => setConfirmCompletion(true)}
            >
              <CheckCircle2 size={16} aria-hidden="true" />
              Record support delivered
            </button>
          ) : null}
        </aside>
      </div>

      {confirmCompletion ? (
        <div
          className="bc-support-confirm"
          role="presentation"
          onMouseDown={() => setConfirmCompletion(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-completion-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close completion confirmation"
              onClick={() => setConfirmCompletion(false)}
            >
              <X size={16} aria-hidden="true" />
            </button>
            <CheckCircle2 size={24} aria-hidden="true" />
            <h2 id="support-completion-title">Confirm support delivered</h2>
            <p>
              This completes and locks the Support Circle. Existing records
              remain available according to the retention policy.
            </p>
            <footer>
              <button type="button" onClick={() => setConfirmCompletion(false)}>
                Not yet
              </button>
              <button
                type="button"
                disabled={Boolean(busy)}
                onClick={() => void completeCircle()}
              >
                {busy === "complete"
                  ? "Completing…"
                  : "Confirm support delivered"}
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </section>
  );
}
