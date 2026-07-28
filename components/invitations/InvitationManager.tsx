"use client";

import { useState } from "react";
import {
  Check,
  Clipboard,
  ContactRound,
  Link2,
  Mail,
  MessageCircle,
  Share2,
  ShieldCheck,
  Smartphone,
  UserPlus,
  Users,
  X,
} from "lucide-react";

declare global {
  interface Navigator {
    contacts?: {
      select(
        properties: Array<"name" | "email" | "tel">,
        options: { multiple: boolean },
      ): Promise<Array<{ name?: string[]; email?: string[]; tel?: string[] }>>;
    };
  }
}

type Acceptance = {
  status: string;
  user: {
    id: string;
    displayName: string;
    email?: string | null;
    phone?: string | null;
  };
};

type InvitationSummary = {
  id: string;
  mode: "named" | "open";
  recipientName?: string | null;
  recipientEmail?: string | null;
  recipientPhone?: string | null;
  state: string;
  effectiveState: string;
  maxUses: number;
  useCount: number;
  expiresAt: string;
  acceptances: Acceptance[];
};

type GeneratedInvitation = {
  id: string;
  link: string;
  recipientEmail: string;
  recipientPhone: string;
};

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to start a secure request.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

export function InvitationManager({
  circleId,
  contributionMode,
  openSlots,
  requireApproval = false,
}: {
  circleId: string;
  contributionMode?: string | null;
  openSlots: number;
  requireApproval?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"named" | "open">("named");
  const [channel, setChannel] = useState<"email" | "phone">("email");
  const [recipientName, setRecipientName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [expectedAmount, setExpectedAmount] = useState("");
  const [maxUses, setMaxUses] = useState("1");
  const [expiryDays, setExpiryDays] = useState("7");
  const [approval, setApproval] = useState(requireApproval);
  const [generated, setGenerated] = useState<GeneratedInvitation | null>(null);
  const [invitations, setInvitations] = useState<InvitationSummary[]>([]);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");

  async function loadInvitations() {
    const response = await fetch(`/api/circles/${circleId}/invitations`, {
      cache: "no-store",
    });
    const data = (await response.json()) as {
      invitations?: InvitationSummary[];
      error?: string;
    };
    if (!response.ok) {
      throw new Error(data.error ?? "Unable to load invitations.");
    }
    setInvitations(data.invitations ?? []);
  }

  function openManager() {
    setOpen(true);
    setError("");
    void loadInvitations().catch((caught) =>
      setError(caught instanceof Error ? caught.message : "Please try again."),
    );
  }

  async function createInvitation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy("create");
    setError("");
    setGenerated(null);
    try {
      const csrf = await csrfToken();
      const response = await fetch(`/api/circles/${circleId}/invitations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify({
          mode,
          recipientName: mode === "named" ? recipientName : undefined,
          recipientEmail:
            mode === "named" && channel === "email" ? recipient : undefined,
          recipientPhone:
            mode === "named" && channel === "phone" ? recipient : undefined,
          expectedAmount: Number(expectedAmount || "0"),
          requireApproval: approval,
          maxUses: mode === "open" ? Number(maxUses) : 1,
          expiresInDays: Number(expiryDays),
        }),
      });
      const data = (await response.json()) as {
        id?: string;
        link?: string;
        error?: string;
      };
      if (!response.ok || !data.id || !data.link) {
        throw new Error(data.error ?? "Unable to create invitation.");
      }
      setGenerated({
        id: data.id,
        link: data.link,
        recipientEmail: channel === "email" ? recipient : "",
        recipientPhone: channel === "phone" ? recipient : "",
      });
      await loadInvitations();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
    } finally {
      setBusy("");
    }
  }

  async function markSent(invitationId: string) {
    try {
      const csrf = await csrfToken();
      await fetch(`/api/circles/${circleId}/invitations/${invitationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrf,
        },
        body: JSON.stringify({ action: "sent" }),
      });
    } catch {
      // Sharing still succeeds if the non-critical audit update cannot finish.
    }
  }

  async function copyLink() {
    if (!generated) return;
    await navigator.clipboard.writeText(generated.link);
    setBusy("copied");
    await markSent(generated.id);
    window.setTimeout(() => setBusy(""), 1500);
  }

  async function shareNative() {
    if (!generated || !navigator.share) return;
    await navigator.share({
      title: "BondCircle invitation",
      text: "You’re invited to join my BondCircle.",
      url: generated.link,
    });
    await markSent(generated.id);
  }

  async function chooseContact() {
    if (!navigator.contacts) {
      setError(
        "Contact selection is not available in this browser. Enter the contact manually.",
      );
      return;
    }
    try {
      const contacts = await navigator.contacts.select(
        ["name", "email", "tel"],
        { multiple: false },
      );
      const contact = contacts[0];
      if (!contact) return;
      setRecipientName(contact.name?.[0] ?? "");
      if (contact.email?.[0]) {
        setChannel("email");
        setRecipient(contact.email[0]);
      } else if (contact.tel?.[0]) {
        setChannel("phone");
        setRecipient(contact.tel[0]);
      }
    } catch {
      setError("The contact was not selected.");
    }
  }

  async function updateInvitation(
    invitationId: string,
    action: "revoke" | "approve",
    userId?: string,
  ) {
    setBusy(`${action}:${invitationId}:${userId ?? ""}`);
    setError("");
    try {
      const csrf = await csrfToken();
      const response = await fetch(
        `/api/circles/${circleId}/invitations/${invitationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrf,
          },
          body: JSON.stringify({ action, userId }),
        },
      );
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to update invitation.");
      }
      await loadInvitations();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
    } finally {
      setBusy("");
    }
  }

  return (
    <>
      <button
        type="button"
        className="bc-invite-trigger"
        disabled={openSlots < 1}
        onClick={openManager}
      >
        <UserPlus size={15} aria-hidden="true" />
        {openSlots > 0 ? "Invite people" : "Circle full"}
      </button>

      {open ? (
        <div
          className="bc-invite-backdrop"
          role="presentation"
          onMouseDown={() => setOpen(false)}
        >
          <section
            className="bc-invite-manager"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-manager-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header>
              <div>
                <span>SECURE INVITATIONS</span>
                <h2 id="invite-manager-title">Invite people</h2>
                <p>{openSlots} membership places are currently available.</p>
              </div>
              <button
                type="button"
                aria-label="Close invitation manager"
                onClick={() => setOpen(false)}
              >
                <X size={17} aria-hidden="true" />
              </button>
            </header>

            <nav aria-label="Invitation mode">
              <button
                type="button"
                className={mode === "named" ? "is-active" : ""}
                onClick={() => {
                  setMode("named");
                  setGenerated(null);
                }}
              >
                <ContactRound size={14} aria-hidden="true" /> Named invite
              </button>
              <button
                type="button"
                className={mode === "open" ? "is-active" : ""}
                onClick={() => {
                  setMode("open");
                  setGenerated(null);
                }}
              >
                <Link2 size={14} aria-hidden="true" /> Open link
              </button>
            </nav>

            <form onSubmit={createInvitation}>
              {mode === "named" ? (
                <>
                  <button
                    type="button"
                    className="bc-invite-contact"
                    onClick={chooseContact}
                  >
                    <ContactRound size={14} aria-hidden="true" />
                    Add from contacts
                  </button>
                  <label>
                    Name (optional)
                    <input
                      value={recipientName}
                      maxLength={80}
                      onChange={(event) => setRecipientName(event.target.value)}
                    />
                  </label>
                  <div className="bc-invite-channel">
                    <button
                      type="button"
                      className={channel === "email" ? "is-active" : ""}
                      onClick={() => {
                        setChannel("email");
                        setRecipient("");
                      }}
                    >
                      <Mail size={13} aria-hidden="true" /> Email
                    </button>
                    <button
                      type="button"
                      className={channel === "phone" ? "is-active" : ""}
                      onClick={() => {
                        setChannel("phone");
                        setRecipient("");
                      }}
                    >
                      <Smartphone size={13} aria-hidden="true" /> Phone
                    </button>
                  </div>
                  <label>
                    {channel === "email" ? "Email address" : "Phone number"}
                    <input
                      type={channel === "email" ? "email" : "tel"}
                      placeholder={
                        channel === "email"
                          ? "person@example.com"
                          : "+234 801 234 5678"
                      }
                      required
                      value={recipient}
                      onChange={(event) => setRecipient(event.target.value)}
                    />
                  </label>
                </>
              ) : (
                <label>
                  Link capacity
                  <input
                    type="number"
                    min="1"
                    max={openSlots}
                    required
                    value={maxUses}
                    onChange={(event) => setMaxUses(event.target.value)}
                  />
                  <small>Maximum people who can join through this link.</small>
                </label>
              )}

              {contributionMode === "custom" && mode === "named" ? (
                <label>
                  Expected contribution (₦)
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={expectedAmount}
                    onChange={(event) => setExpectedAmount(event.target.value)}
                  />
                </label>
              ) : null}

              <div className="bc-invite-options">
                <label>
                  Expires after
                  <select
                    value={expiryDays}
                    onChange={(event) => setExpiryDays(event.target.value)}
                  >
                    <option value="1">1 day</option>
                    <option value="3">3 days</option>
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                  </select>
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={approval}
                    disabled={requireApproval}
                    onChange={(event) => setApproval(event.target.checked)}
                  />
                  Creator approval required
                </label>
              </div>

              {error ? (
                <p className="bc-gift-create__error" role="alert">
                  {error}
                </p>
              ) : null}

              <button type="submit" disabled={busy === "create"}>
                <ShieldCheck size={14} aria-hidden="true" />
                {busy === "create" ? "Creating…" : "Create secure invitation"}
              </button>
            </form>

            {generated ? (
              <section className="bc-invite-share">
                <div>
                  <Check size={16} aria-hidden="true" />
                  <span>
                    <strong>Secure link ready</strong>
                    <small>The full token is shown only in this session.</small>
                  </span>
                </div>
                <input
                  aria-label="Secure invitation link"
                  readOnly
                  value={generated.link}
                />
                <div>
                  <button type="button" onClick={copyLink}>
                    <Clipboard size={13} aria-hidden="true" />
                    {busy === "copied" ? "Copied" : "Copy"}
                  </button>
                  {typeof (navigator as Partial<Navigator>).share ===
                  "function" ? (
                    <button type="button" onClick={shareNative}>
                      <Share2 size={13} aria-hidden="true" /> Share
                    </button>
                  ) : null}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Join my BondCircle: ${generated.link}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => void markSent(generated.id)}
                  >
                    <MessageCircle size={13} aria-hidden="true" /> WhatsApp
                  </a>
                  <a
                    href={`sms:${generated.recipientPhone}?body=${encodeURIComponent(`Join my BondCircle: ${generated.link}`)}`}
                    onClick={() => void markSent(generated.id)}
                  >
                    <Smartphone size={13} aria-hidden="true" /> SMS
                  </a>
                  <a
                    href={`mailto:${generated.recipientEmail}?subject=${encodeURIComponent("Your BondCircle invitation")}&body=${encodeURIComponent(`Join my BondCircle: ${generated.link}`)}`}
                    onClick={() => void markSent(generated.id)}
                  >
                    <Mail size={13} aria-hidden="true" /> Email
                  </a>
                </div>
              </section>
            ) : null}

            <section className="bc-invite-list">
              <header>
                <Users size={15} aria-hidden="true" />
                <h3>Invitation activity</h3>
              </header>
              {invitations.length ? (
                invitations.map((invitation) => (
                  <article key={invitation.id}>
                    <div>
                      <strong>
                        {invitation.recipientName ||
                          invitation.recipientEmail ||
                          invitation.recipientPhone ||
                          "Open invitation link"}
                      </strong>
                      <small>
                        {invitation.effectiveState.replaceAll("_", " ")} ·{" "}
                        {invitation.useCount}/{invitation.maxUses} joined
                      </small>
                    </div>
                    {invitation.acceptances
                      .filter((item) => item.status === "pending")
                      .map((item) => (
                        <button
                          type="button"
                          key={item.user.id}
                          disabled={busy.startsWith("approve:")}
                          onClick={() =>
                            void updateInvitation(
                              invitation.id,
                              "approve",
                              item.user.id,
                            )
                          }
                        >
                          Approve {item.user.displayName}
                        </button>
                      ))}
                    {["created", "sent", "opened", "approval_pending"].includes(
                      invitation.effectiveState,
                    ) ? (
                      <button
                        type="button"
                        disabled={busy.startsWith("revoke:")}
                        onClick={() =>
                          void updateInvitation(invitation.id, "revoke")
                        }
                      >
                        Revoke
                      </button>
                    ) : null}
                  </article>
                ))
              ) : (
                <p>No secure invitations have been created yet.</p>
              )}
            </section>
          </section>
        </div>
      ) : null}
    </>
  );
}
