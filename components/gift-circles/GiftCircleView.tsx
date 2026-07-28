"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Check,
  ChevronDown,
  ChevronUp,
  Clock3,
  Crown,
  MailPlus,
  MessageCircle,
  Megaphone,
  Plus,
  ReceiptText,
  ShieldCheck,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import type {
  GiftCircleDetail,
  GiftCircleMember,
} from "@/server/repositories/gift-circles";
import { InvitationManager } from "@/components/invitations/InvitationManager";

const tabs = [
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "comments", label: "Comments", icon: MessageCircle },
  { id: "activity", label: "Activity", icon: Zap },
] as const;

function money(value: number) {
  return `₦${new Intl.NumberFormat("en-NG").format(value)}`;
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function statusLabel(status: string) {
  return status.replaceAll("_", " ");
}

function MemberAvatar({
  creator,
  member,
  onSelect,
  self,
}: {
  creator: boolean;
  member: GiftCircleMember;
  onSelect: () => void;
  self: boolean;
}) {
  return (
    <button
      type="button"
      className="bc-gift-member"
      onClick={onSelect}
      aria-label={`${member.displayName}, ${statusLabel(member.contributionStatus)}`}
    >
      <span className="bc-gift-member__avatar">
        {member.profileImage ? (
          <Image
            src={member.profileImage}
            alt=""
            fill
            sizes="64px"
            unoptimized
          />
        ) : (
          initials(member.displayName)
        )}
      </span>
      <strong>
        {member.displayName}
        {self ? " (You)" : ""}
      </strong>
      {creator && <Crown size={12} aria-label="Creator" />}
      <small className={`is-${member.contributionStatus}`}>
        {statusLabel(member.contributionStatus)}
      </small>
    </button>
  );
}

type InviteRow = { email: string; amount: string };

function InviteMembersModal({
  circle,
  onClose,
  onComplete,
}: {
  circle: GiftCircleDetail;
  onClose: () => void;
  onComplete: () => void;
}) {
  const openSlots = circle.memberLimit - circle.members.length;
  const [rows, setRows] = useState<InviteRow[]>([{ email: "", amount: "" }]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function sendInvites(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const csrfResponse = await fetch("/api/auth/csrf", {
        cache: "no-store",
      });
      if (!csrfResponse.ok)
        throw new Error("Unable to start a secure request.");
      const { csrfToken } = (await csrfResponse.json()) as {
        csrfToken: string;
      };
      const response = await fetch(`/api/circles/${circle.id}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({
          invites: rows.map(({ email, amount }) => ({
            email,
            amount: Number(amount || "0"),
          })),
        }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to send invitations.");
      }
      onComplete();
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to send invitations.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="bc-gift-panel-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        className="bc-gift-invite-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="gift-invite-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <div>
            <span>CREATOR CONTROLS</span>
            <h2 id="gift-invite-title">Add people to the circle</h2>
            <p>
              {openSlots} open {openSlots === 1 ? "slot" : "slots"}. Invite
              existing BondCircle members by email.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close invitations"
          >
            <X size={17} aria-hidden="true" />
          </button>
        </header>
        <form onSubmit={sendInvites}>
          <div className="bc-gift-invite-modal__rows">
            {rows.map((row, index) => (
              <div key={index}>
                <label>
                  Member email
                  <input
                    type="email"
                    required
                    value={row.email}
                    onChange={(event) =>
                      setRows((current) =>
                        current.map((item, itemIndex) =>
                          itemIndex === index
                            ? { ...item, email: event.target.value }
                            : item,
                        ),
                      )
                    }
                  />
                </label>
                {circle.contributionMode === "custom" && (
                  <label>
                    Amount (₦)
                    <input
                      type="number"
                      min="0"
                      step="1"
                      required
                      value={row.amount}
                      onChange={(event) =>
                        setRows((current) =>
                          current.map((item, itemIndex) =>
                            itemIndex === index
                              ? { ...item, amount: event.target.value }
                              : item,
                          ),
                        )
                      }
                    />
                  </label>
                )}
                {rows.length > 1 && (
                  <button
                    type="button"
                    aria-label={`Remove invite ${index + 1}`}
                    onClick={() =>
                      setRows((current) =>
                        current.filter((_, itemIndex) => itemIndex !== index),
                      )
                    }
                  >
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {rows.length < openSlots && (
            <button
              type="button"
              className="bc-gift-invite-modal__add"
              onClick={() =>
                setRows((current) => [...current, { email: "", amount: "" }])
              }
            >
              <Plus size={14} aria-hidden="true" />
              Add another
            </button>
          )}
          {error && (
            <p className="bc-gift-create__error" role="alert">
              {error}
            </p>
          )}
          <footer>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={busy}>
              <MailPlus size={15} aria-hidden="true" />
              {busy ? "Sending…" : "Send invites"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

function PaymentAccountDetails({ circle }: { circle: GiftCircleDetail }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const hasDetails = Boolean(
    circle.paymentBankName &&
      circle.paymentAccountName &&
      circle.paymentAccountNumber,
  );

  useEffect(() => {
    if (!sheetOpen) return;
    const timer = window.setTimeout(() => setSheetOpen(false), 8_000);
    return () => window.clearTimeout(timer);
  }, [sheetOpen]);

  const details = hasDetails ? (
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
        <dd className="bc-gift-payment__number">
          {circle.paymentAccountNumber}
        </dd>
      </div>
    </dl>
  ) : (
    <p>Payment account details have not been added to this circle.</p>
  );

  return (
    <>
      <section className="bc-gift-payment-card" aria-label="Payment account">
        <header>
          <span>
            <Building2 size={16} aria-hidden="true" />
          </span>
          <div>
            <small>PAY CONTRIBUTIONS TO</small>
            <h2>Payment account</h2>
          </div>
        </header>
        {details}
        <footer>BondCircle does not hold or process this money.</footer>
      </section>

      <button
        type="button"
        className="bc-gift-payment-trigger"
        aria-expanded={sheetOpen}
        onClick={() => setSheetOpen((current) => !current)}
      >
        <span>
          <Building2 size={17} aria-hidden="true" />
          <span>
            <strong>Payment account</strong>
            <small>{hasDetails ? circle.paymentBankName : "Not added"}</small>
          </span>
        </span>
        {sheetOpen ? (
          <ChevronDown size={17} aria-hidden="true" />
        ) : (
          <ChevronUp size={17} aria-hidden="true" />
        )}
      </button>

      {sheetOpen && (
        <div
          className="bc-gift-payment-sheet-backdrop"
          role="presentation"
          onMouseDown={() => setSheetOpen(false)}
        >
          <section
            className="bc-gift-payment-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-sheet-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <span />
            <header>
              <div>
                <small>PAY CONTRIBUTIONS TO</small>
                <h2 id="payment-sheet-title">Payment account</h2>
              </div>
              <button
                type="button"
                aria-label="Close payment account"
                onClick={() => setSheetOpen(false)}
              >
                <X size={17} aria-hidden="true" />
              </button>
            </header>
            {details}
            <footer>
              Pay the account directly. BondCircle does not hold the money.
            </footer>
          </section>
        </div>
      )}
    </>
  );
}

export function GiftCircleView({
  circle,
  viewerId,
}: {
  circle: GiftCircleDetail;
  viewerId: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("announcements");
  const [selected, setSelected] = useState<GiftCircleMember | null>(null);
  const [inviting, setInviting] = useState(false);
  const confirmed = circle.members.reduce(
    (sum, member) => sum + member.confirmedAmount,
    0,
  );
  const progress =
    circle.targetAmount > 0
      ? Math.min(100, Math.round((confirmed / circle.targetAmount) * 100))
      : 0;
  const creator = circle.creatorId === viewerId;
  const slots = Array.from(
    { length: circle.memberLimit },
    (_, index) => circle.members[index] ?? null,
  );
  const reviewQueue = creator
    ? circle.members.filter(
        (member) =>
          member.contributionStatus === "receipt_submitted" ||
          member.contributionStatus === "awaiting_confirmation",
      )
    : [];

  useEffect(() => {
    if (!selected) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selected]);

  return (
    <section className="bc-gift-view">
      <header className="bc-gift-view__header">
        <Link href="/account">
          <ArrowLeft size={15} aria-hidden="true" />
          Dashboard
        </Link>
        <div>
          <span>GIFT CIRCLE</span>
          <h1>{circle.name}</h1>
          <p>{circle.description}</p>
        </div>
        <small className={`is-${circle.status}`}>{circle.status}</small>
      </header>

      <div className="bc-gift-view__layout">
        <section className="bc-gift-stage">
          <div
            className="bc-gift-stage__ring"
            aria-label="Circle members"
            data-compact={circle.memberLimit > 12 ? "true" : "false"}
          >
            <span className="bc-gift-stage__orbit" aria-hidden="true" />
            {slots.map((member, index) => (
              <div
                className="bc-gift-stage__member"
                style={
                  {
                    "--member-index": index,
                    "--member-count": circle.memberLimit,
                  } as React.CSSProperties
                }
                key={member?.id ?? `open-${index}`}
              >
                {member ? (
                  <MemberAvatar
                    member={member}
                    creator={member.id === circle.creatorId}
                    self={member.id === viewerId}
                    onSelect={() => setSelected(member)}
                  />
                ) : (
                  <button
                    type="button"
                    className="bc-gift-member bc-gift-member--open"
                    disabled={!creator}
                    aria-label={`Open member slot ${index + 1}`}
                  >
                    <span className="bc-gift-member__avatar">
                      <Plus size={15} aria-hidden="true" />
                    </span>
                    <strong>Open</strong>
                    <small>invite</small>
                  </button>
                )}
              </div>
            ))}
            <article className="bc-gift-stage__gift">
              <div>
                {circle.imageUrl ? (
                  <Image
                    src={circle.imageUrl}
                    alt={circle.giftTitle}
                    fill
                    sizes="(max-width: 640px) 180px, 230px"
                    priority
                    unoptimized
                  />
                ) : null}
              </div>
              <h2>{circle.giftTitle}</h2>
              <span>Target amount</span>
              <strong>{money(circle.targetAmount)}</strong>
            </article>
          </div>

          <div className="bc-gift-progress">
            <div>
              <span>
                Confirmed
                <strong>{money(confirmed)}</strong>
              </span>
              <span className="bc-gift-progress__ring">{progress}%</span>
              <span>
                Deadline
                <strong>
                  {circle.deadline
                    ? new Intl.DateTimeFormat("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(`${circle.deadline}T00:00:00`))
                    : "Open"}
                </strong>
              </span>
            </div>
            <span>
              <i style={{ width: `${progress}%` }} />
            </span>
            <small>
              {circle.contributionMode === "equal"
                ? "Equal contribution split"
                : "Custom contribution amounts"}
            </small>
          </div>
        </section>

        <div className="bc-gift-sidebar">
          <PaymentAccountDetails circle={circle} />
          <aside className="bc-gift-members">
            <header>
              <div>
                <span>
                  {circle.members.length}/{circle.memberLimit}
                </span>
                <h2>Members</h2>
              </div>
              {creator && circle.members.length < circle.memberLimit ? (
                <InvitationManager
                  circleId={circle.id}
                  contributionMode={circle.contributionMode}
                  openSlots={circle.memberLimit - circle.members.length}
                />
              ) : (
                creator && (
                  <ShieldCheck size={20} aria-label="Creator controls" />
                )
              )}
            </header>
            <div>
              {circle.members.map((member) => (
                <button
                  type="button"
                  onClick={() => setSelected(member)}
                  key={member.id}
                >
                  <span>{initials(member.displayName)}</span>
                  <span>
                    <strong>{member.displayName}</strong>
                    <small>{money(member.expectedAmount)} expected</small>
                  </span>
                  <em className={`is-${member.contributionStatus}`}>
                    {statusLabel(member.contributionStatus)}
                  </em>
                </button>
              ))}
              {circle.members.length < circle.memberLimit && (
                <p className="bc-gift-members__open">
                  {circle.memberLimit - circle.members.length} open{" "}
                  {circle.memberLimit - circle.members.length === 1
                    ? "place"
                    : "places"}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>

      {creator && (
        <section className="bc-gift-review">
          <header>
            <ReceiptText size={18} aria-hidden="true" />
            <div>
              <h2>Review queue</h2>
              <p>Only creators and authorised reviewers can see this queue.</p>
            </div>
            <span>{reviewQueue.length}</span>
          </header>
          {reviewQueue.length ? (
            reviewQueue.map((member) => (
              <p key={member.id}>
                {member.displayName} · {money(member.pledgedAmount)}
              </p>
            ))
          ) : (
            <p>No payment proofs are waiting for review.</p>
          )}
        </section>
      )}

      <section className="bc-gift-tabs">
        <nav aria-label="Circle updates">
          {tabs.map(({ icon: Icon, id, label }) => (
            <button
              type="button"
              className={tab === id ? "is-active" : ""}
              onClick={() => setTab(id)}
              key={id}
            >
              <Icon size={15} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>
        <div>
          {tab === "announcements" && (
            <>
              <Megaphone size={22} aria-hidden="true" />
              <h2>No announcements yet</h2>
              <p>Important creator updates will appear here.</p>
            </>
          )}
          {tab === "comments" && (
            <>
              <MessageCircle size={22} aria-hidden="true" />
              <h2>No comments yet</h2>
              <p>Circle conversation will appear here.</p>
            </>
          )}
          {tab === "activity" && (
            <>
              <Zap size={22} aria-hidden="true" />
              <h2>Circle created</h2>
              <p>The Gift Circle is active and ready for contributions.</p>
            </>
          )}
        </div>
      </section>

      {selected && (
        <div
          className="bc-gift-panel-backdrop"
          role="presentation"
          onMouseDown={() => setSelected(null)}
        >
          <aside
            className="bc-gift-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gift-member-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close member panel"
            >
              <X size={18} aria-hidden="true" />
            </button>
            <span>{initials(selected.displayName)}</span>
            <h2 id="gift-member-title">{selected.displayName}</h2>
            <em className={`is-${selected.contributionStatus}`}>
              {statusLabel(selected.contributionStatus)}
            </em>
            <dl>
              <div>
                <dt>Expected</dt>
                <dd>{money(selected.expectedAmount)}</dd>
              </div>
              <div>
                <dt>Confirmed</dt>
                <dd>{money(selected.confirmedAmount)}</dd>
              </div>
            </dl>
            {selected.id === viewerId ? (
              <div className="bc-gift-panel__self">
                <Check size={16} aria-hidden="true" />
                <p>
                  This is your private contribution panel. Payment proof upload
                  becomes available in the contribution milestone.
                </p>
              </div>
            ) : (
              <div className="bc-gift-panel__private">
                <Clock3 size={16} aria-hidden="true" />
                <p>
                  Private payment-proof details are visible only to the member
                  and authorised reviewers.
                </p>
              </div>
            )}
          </aside>
        </div>
      )}
      {inviting && creator && circle.members.length < circle.memberLimit && (
        <InviteMembersModal
          circle={circle}
          onClose={() => setInviting(false)}
          onComplete={() => {
            setInviting(false);
            router.replace(`/account/circles/${circle.id}`);
            router.refresh();
          }}
        />
      )}
    </section>
  );
}
