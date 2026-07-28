"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  UserRoundCheck,
  Users,
  XCircle,
} from "lucide-react";

type InvitationPreview = {
  circleId: string;
  circleName: string;
  circleType: string;
  circleDescription: string;
  circleImageUrl: string | null;
  creatorName: string;
  inviterName: string;
  recipientName: string | null;
  expiresAt: string;
  memberCount: number;
  memberLimit: number;
  requireApproval: boolean;
  state: string;
};

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to start a secure request.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

function circleTypeLabel(type: string) {
  if (type === "aso-ebi") return "Aso-Ebi Circle";
  if (type === "support") return "Support Circle";
  return "Gift Circle";
}

export function InvitationDetails({
  invitation,
  token,
}: {
  invitation: InvitationPreview;
  token: string;
}) {
  const router = useRouter();
  const opened = useRef(false);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [outcome, setOutcome] = useState(
    ["approval_pending", "accepted", "declined"].includes(invitation.state)
      ? invitation.state
      : "",
  );

  const respond = useCallback(
    async (action: "open" | "accept" | "decline") => {
      const csrf = await csrfToken();
      const response = await fetch(
        `/api/invitations/${encodeURIComponent(token)}/respond`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrf,
          },
          body: JSON.stringify({ action }),
        },
      );
      const data = (await response.json()) as {
        status?: string;
        circleId?: string;
        error?: string;
      };
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to respond to this invitation.");
      }
      return data;
    },
    [token],
  );

  useEffect(() => {
    if (opened.current || outcome) return;
    opened.current = true;
    void respond("open").catch(() => {
      // Opening is an audit signal; response controls remain available if it
      // cannot be recorded because the invitation changed concurrently.
    });
  }, [outcome, respond]);

  async function choose(action: "accept" | "decline") {
    setBusy(action);
    setError("");
    try {
      const result = await respond(action);
      if (result.status === "joined" && result.circleId) {
        router.replace(`/account/circles/${result.circleId}`);
        router.refresh();
        return;
      }
      if (result.status === "approval_pending") {
        setOutcome("approval_pending");
      } else {
        setOutcome("declined");
      }
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
    } finally {
      setBusy("");
    }
  }

  if (outcome === "approval_pending") {
    return (
      <InvitationOutcome
        icon={<Clock3 size={25} aria-hidden="true" />}
        title="Approval requested"
        message={`Your request to join ${invitation.circleName} is waiting for the circle creator. You will only receive circle access after approval.`}
      />
    );
  }

  if (outcome === "accepted") {
    return (
      <main className="bc-invitation-page">
        <section className="bc-invitation-outcome">
          <span>
            <CheckCircle2 size={25} aria-hidden="true" />
          </span>
          <h1>Invitation accepted</h1>
          <p>You are already a member of {invitation.circleName}.</p>
          <Link href={`/account/circles/${invitation.circleId}`}>
            Open circle <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </section>
      </main>
    );
  }

  if (outcome === "declined") {
    return (
      <InvitationOutcome
        icon={<XCircle size={25} aria-hidden="true" />}
        title="Invitation declined"
        message="Your response has been recorded. You have not joined this circle."
      />
    );
  }

  return (
    <main className="bc-invitation-page">
      <section className="bc-invitation-card">
        <div className="bc-invitation-card__media">
          {invitation.circleImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={invitation.circleImageUrl} alt="" />
          ) : (
            <UserRoundCheck size={42} aria-hidden="true" />
          )}
        </div>
        <div className="bc-invitation-card__content">
          <span className="bc-invitation-card__eyebrow">
            <ShieldCheck size={14} aria-hidden="true" />
            Secure circle invitation
          </span>
          <p>
            {invitation.recipientName
              ? `${invitation.recipientName}, you’re invited`
              : "You’re invited"}
          </p>
          <h1>{invitation.circleName}</h1>
          <strong>{circleTypeLabel(invitation.circleType)}</strong>
          <p>{invitation.circleDescription}</p>

          <dl>
            <div>
              <dt>Organized by</dt>
              <dd>{invitation.creatorName}</dd>
            </div>
            <div>
              <dt>
                <Users size={14} aria-hidden="true" /> Capacity
              </dt>
              <dd>
                {invitation.memberCount} of {invitation.memberLimit} members
              </dd>
            </div>
            <div>
              <dt>
                <CalendarClock size={14} aria-hidden="true" /> Link expires
              </dt>
              <dd>
                {new Intl.DateTimeFormat("en-NG", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(new Date(invitation.expiresAt))}
              </dd>
            </div>
          </dl>

          {invitation.requireApproval ? (
            <aside>
              <Clock3 size={15} aria-hidden="true" />
              The creator must approve your membership before circle access is
              granted.
            </aside>
          ) : null}

          {error ? (
            <p className="bc-gift-create__error" role="alert">
              {error}
            </p>
          ) : null}

          <footer>
            <button
              type="button"
              disabled={Boolean(busy)}
              onClick={() => void choose("decline")}
            >
              {busy === "decline" ? "Declining…" : "Decline"}
            </button>
            <button
              type="button"
              disabled={Boolean(busy)}
              onClick={() => void choose("accept")}
            >
              {busy === "accept"
                ? "Joining…"
                : invitation.requireApproval
                  ? "Request to join"
                  : "Accept and join"}
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </footer>
        </div>
      </section>
    </main>
  );
}

function InvitationOutcome({
  icon,
  message,
  title,
}: {
  icon: React.ReactNode;
  message: string;
  title: string;
}) {
  return (
    <main className="bc-invitation-page">
      <section className="bc-invitation-outcome">
        <span>{icon}</span>
        <h1>{title}</h1>
        <p>{message}</p>
        <Link href="/account">
          Return to dashboard <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}

export function ExpiredInvitation({
  circleName,
  token,
}: {
  circleName: string;
  token: string;
}) {
  const [busy, setBusy] = useState(false);
  const [requested, setRequested] = useState(false);
  const [error, setError] = useState("");

  async function requestNewLink() {
    setBusy(true);
    setError("");
    try {
      const csrf = await csrfToken();
      const response = await fetch(
        `/api/invitations/${encodeURIComponent(token)}/respond`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrf,
          },
          body: JSON.stringify({ action: "request_new" }),
        },
      );
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to request a new link.");
      }
      setRequested(true);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="bc-invitation-page">
      <section className="bc-invitation-outcome">
        <span>
          <CalendarClock size={25} aria-hidden="true" />
        </span>
        <h1>Invitation unavailable</h1>
        <p>
          This invitation to {circleName} has expired or was revoked. It cannot
          be reused.
        </p>
        {requested ? (
          <p role="status">
            <CheckCircle2 size={15} aria-hidden="true" /> Your request for a new
            invitation has been recorded.
          </p>
        ) : (
          <button type="button" disabled={busy} onClick={requestNewLink}>
            {busy ? "Requesting…" : "Request a new invitation"}
          </button>
        )}
        {error ? (
          <p className="bc-gift-create__error" role="alert">
            {error}
          </p>
        ) : null}
        <Link href="/account">Return to dashboard</Link>
      </section>
    </main>
  );
}

export function InvalidInvitation() {
  return (
    <main className="bc-invitation-page">
      <section className="bc-invitation-outcome">
        <span>
          <XCircle size={25} aria-hidden="true" />
        </span>
        <h1>Invalid invitation link</h1>
        <p>This link is incomplete or is not a BondCircle invitation.</p>
        <Link href="/account">Return to dashboard</Link>
      </section>
    </main>
  );
}
