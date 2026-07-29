import "server-only";

import {
  createCircleInvitation,
  loadInvitationByToken,
  markInvitationSent,
} from "@/server/repositories/invitations";
import { logger } from "@/lib/logger";
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

export type CircleCreationShare = {
  id: string;
  link: string;
  shareMessage: string;
};

export type CircleCreationShareResult = {
  share: CircleCreationShare | null;
  shareStatus: "ready" | "full" | "unavailable";
};

async function shareForInvitation(token: string, origin: string) {
  const details = await loadInvitationByToken(token);
  if (!details) throw new Error("Unable to prepare a secure invitation.");
  const deepLink = `/invite/${encodeURIComponent(token)}`;
  const link = `${origin.replace(/\/$/, "")}${deepLink}`;
  return {
    deepLink,
    link,
    shareMessage: buildInvitationShareMessage({
      inviterName: details.invitedBy.displayName,
      circleName: details.circle.name,
      circleType: details.circle.type,
      reason: details.circle.description,
      link,
    }),
  };
}

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
    const origin =
      process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
      "https://www.bondcircles.com";
    const share = await shareForInvitation(invitation.token, origin);
    await emitNewInvitation({
      circleId: input.circleId,
      recipientEmail: invitee.email,
      invitationId: invitation.id,
      deepLink: share.deepLink,
      message: share.shareMessage,
    });
    await markInvitationSent(invitation.id, input.circleId, input.creatorId);
  }
}

export async function createInitialShareInvitation(input: {
  circleId: string;
  creatorId: string;
  maxUses: number;
  origin: string;
}): Promise<CircleCreationShareResult> {
  if (input.maxUses < 1) {
    return { share: null, shareStatus: "full" };
  }

  try {
    const invitation = await createCircleInvitation(
      input.circleId,
      input.creatorId,
      {
        mode: "open",
        maxUses: input.maxUses,
        expiresInDays: 7,
      },
    );
    const share = await shareForInvitation(invitation.token, input.origin);
    return {
      share: {
        id: invitation.id,
        link: share.link,
        shareMessage: share.shareMessage,
      },
      shareStatus: "ready",
    };
  } catch (error) {
    logger.error("initial_circle_share_invitation_failed", {
      circleId: input.circleId,
      creatorId: input.creatorId,
      error: error instanceof Error ? error.message : "unknown_error",
    });
    return { share: null, shareStatus: "unavailable" };
  }
}
