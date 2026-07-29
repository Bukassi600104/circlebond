import "server-only";

import {
  createCircleInvitation,
  loadInvitationByToken,
  markInvitationSent,
} from "@/server/repositories/invitations";
import { findUserByEmail } from "@/server/repositories/gift-circles";
import { emitNewInvitation } from "@/server/repositories/notifications";
import { buildInvitationShareMessage } from "@/server/invitations/rules";

export type InitialInviteInput = {
  email: string;
  amount?: number;
};

export type InitialInvitee = InitialInviteInput & {
  email: string;
  user: Awaited<ReturnType<typeof findUserByEmail>>;
};

export async function resolveInitialInvitees(
  invites: InitialInviteInput[],
  creatorId: string,
) {
  const unique = [
    ...new Map(
      invites
        .map((invite) => ({
          ...invite,
          email: invite.email.trim().toLowerCase(),
        }))
        .filter((invite) => invite.email)
        .map((invite) => [invite.email, invite]),
    ).values(),
  ];
  for (const invite of unique) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(invite.email)) {
      throw new Error(`Enter a valid email address for ${invite.email}.`);
    }
  }

  const resolved: InitialInvitee[] = [];
  for (const invite of unique) {
    const user = await findUserByEmail(invite.email);
    if (user?.id === creatorId) continue;
    resolved.push({ ...invite, user });
  }
  return resolved;
}

export async function sendInitialInvitations(input: {
  circleId: string;
  creatorId: string;
  invitees: InitialInvitee[];
  expectedAmountFor?: (invitee: InitialInvitee, index: number) => number;
}) {
  for (const [index, invitee] of input.invitees.entries()) {
    if (invitee.user) continue;
    const invitation = await createCircleInvitation(
      input.circleId,
      input.creatorId,
      {
        mode: "named",
        recipientEmail: invitee.email,
        expectedAmount:
          input.expectedAmountFor?.(invitee, index) ??
          Number(invitee.amount ?? 0),
        expiresInDays: 7,
      },
    );
    const details = await loadInvitationByToken(invitation.token);
    if (!details) throw new Error("Unable to prepare a secure invitation.");
    const deepLink = `/invite/${encodeURIComponent(invitation.token)}`;
    const origin =
      process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
      "https://www.bondcircles.com";
    const shareMessage = buildInvitationShareMessage({
      inviterName: details.invitedBy.displayName,
      circleName: details.circle.name,
      circleType: details.circle.type,
      reason: details.circle.description,
      link: `${origin}${deepLink}`,
    });
    await emitNewInvitation({
      circleId: input.circleId,
      recipientEmail: invitee.email,
      invitationId: invitation.id,
      deepLink,
      message: shareMessage,
    });
    await markInvitationSent(invitation.id, input.circleId, input.creatorId);
  }
}
