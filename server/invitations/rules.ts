import { createHash, randomBytes } from "node:crypto";

export const INVITATION_STATES = [
  "created",
  "sent",
  "opened",
  "approval_pending",
  "accepted",
  "declined",
  "expired",
  "revoked",
] as const;

export type InvitationState = (typeof INVITATION_STATES)[number];
export type InvitationMode = "named" | "open";

const transitions: Record<InvitationState, readonly InvitationState[]> = {
  created: ["sent", "opened", "declined", "revoked", "expired"],
  sent: [
    "opened",
    "approval_pending",
    "accepted",
    "declined",
    "revoked",
    "expired",
  ],
  opened: ["approval_pending", "accepted", "declined", "revoked", "expired"],
  approval_pending: ["accepted", "declined", "revoked", "expired"],
  accepted: [],
  declined: [],
  expired: [],
  revoked: [],
};

export function hashInvitationToken(token: string) {
  return createHash("sha256").update(token, "utf8").digest("hex");
}

export function createSecureInvitationToken(existingToken?: string) {
  const token = existingToken ?? randomBytes(32).toString("base64url");
  return { token, tokenHash: hashInvitationToken(token) };
}

export function invitationExpiry(days = 7) {
  if (!Number.isInteger(days) || days < 1 || days > 30) {
    throw new Error("Invitation expiry must be between 1 and 30 days.");
  }
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

export function normalizeInvitationEmail(value: string | null | undefined) {
  return value?.trim().toLowerCase() || null;
}

export function normalizeInvitationPhone(value: string | null | undefined) {
  const normalized = value?.trim().replace(/[\s()-]/g, "") || null;
  if (normalized && !/^\+[1-9]\d{7,14}$/.test(normalized)) {
    throw new Error("Enter a valid phone number with its country code.");
  }
  return normalized;
}

export function invitationMatchesUser(
  invitation: {
    mode: InvitationMode;
    recipientEmail?: string | null;
    recipientPhone?: string | null;
  },
  user: { email: string | null; phone: string | null },
) {
  if (invitation.mode === "open") return true;
  const recipientEmail = normalizeInvitationEmail(invitation.recipientEmail);
  const userEmail = normalizeInvitationEmail(user.email);
  const recipientPhone = normalizeInvitationPhone(invitation.recipientPhone);
  const userPhone = normalizeInvitationPhone(user.phone);
  return Boolean(
    (recipientEmail && userEmail === recipientEmail) ||
      (recipientPhone && userPhone === recipientPhone),
  );
}

export function assertInvitationTransition(
  current: InvitationState,
  next: InvitationState,
) {
  if (!transitions[current]?.includes(next)) {
    throw new Error(`Invitation cannot move from ${current} to ${next}.`);
  }
}

export function assertInvitationCapacity(
  currentMembers: number,
  memberLimit: number,
  useCount: number,
  maxUses: number,
  seats = 1,
) {
  if (useCount >= maxUses) {
    throw new Error("This restricted invitation has already been used.");
  }
  if (currentMembers + seats > memberLimit) {
    throw new Error("This circle has reached its membership capacity.");
  }
}

export function isInvitationExpired(expiresAt: string) {
  return Date.parse(expiresAt) <= Date.now();
}
