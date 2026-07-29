import "server-only";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import { assertPermission, type CircleRole } from "@/server/circles/engine";
import { firebaseCircleStore } from "@/server/repositories/circles";
import {
  assertInvitationCapacity,
  assertInvitationTransition,
  createSecureInvitationToken,
  invitationExpiry,
  invitationMatchesUser,
  isInvitationExpired,
  normalizeInvitationEmail,
  normalizeInvitationPhone,
  type InvitationMode,
  type InvitationState,
} from "@/server/invitations/rules";
import { safelyEmitNotification } from "@/server/repositories/notifications";

type InvitationRow = {
  id: string;
  tokenHash?: string;
  mode: InvitationMode;
  recipientName?: string | null;
  recipientEmail?: string | null;
  recipientPhone?: string | null;
  expectedAmount: number;
  requireApproval: boolean;
  state: InvitationState;
  maxUses: number;
  useCount: number;
  expiresAt: string;
  openedAt?: string | null;
  acceptedAt?: string | null;
  revokedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  circle?: {
    id: string;
    name: string;
    type: string;
    description: string;
    imageUrl?: string | null;
    memberCount: number;
    memberLimit: number;
    status: string;
    requireCreatorApproval: boolean;
    contributionMode?: string | null;
    targetAmount: number;
    creator: { id: string; displayName: string };
  };
  invitedBy?: { id: string; displayName: string };
  acceptedBy?: { id: string } | null;
};

export type InvitationAcceptance = {
  status: string;
  createdAt: string;
  respondedAt?: string | null;
  user: {
    id: string;
    displayName: string;
    email?: string | null;
    phone?: string | null;
    profileImage?: string | null;
  };
};

export type InvitationDetail = Omit<InvitationRow, "tokenHash"> & {
  circle: NonNullable<InvitationRow["circle"]>;
  invitedBy: NonNullable<InvitationRow["invitedBy"]>;
  acceptances: InvitationAcceptance[];
  effectiveState: InvitationState;
};

export type CreateInvitationInput = {
  mode: InvitationMode;
  recipientName?: string;
  recipientEmail?: string;
  recipientPhone?: string;
  expectedAmount?: number;
  requireApproval?: boolean;
  maxUses?: number;
  expiresInDays?: number;
};

const activeInvitationStates = new Set<InvitationState>([
  "created",
  "sent",
  "opened",
  "approval_pending",
]);

async function acceptancesFor(invitationId: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    { invitationAcceptances: InvitationAcceptance[] },
    { invitationId: string }
  >("GetInvitationAcceptances", { invitationId });
  return response.data.invitationAcceptances;
}

export async function loadInvitationByToken(
  token: string,
): Promise<InvitationDetail | null> {
  if (!/^[A-Za-z0-9_-]{40,128}$/.test(token)) return null;
  const { tokenHash } = createSecureInvitationToken(token);
  const response = await getBondCircleDataConnect().executeQuery<
    { invitations: InvitationRow[] },
    { tokenHash: string }
  >("GetInvitationByTokenHash", { tokenHash });
  const invitation = response.data.invitations[0];
  if (!invitation?.circle || !invitation.invitedBy) return null;
  const acceptances = await acceptancesFor(invitation.id);
  const { tokenHash: _tokenHash, ...safeInvitation } = invitation;
  void _tokenHash;
  return {
    ...safeInvitation,
    circle: invitation.circle,
    invitedBy: invitation.invitedBy,
    acceptances,
    effectiveState: isInvitationExpired(invitation.expiresAt)
      ? "expired"
      : invitation.state,
  };
}

export async function listCircleInvitations(circleId: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    { invitations: InvitationRow[] },
    { circleId: string }
  >("GetCircleInvitations", { circleId });
  return Promise.all(
    response.data.invitations.map(async (invitation) => ({
      ...invitation,
      effectiveState: isInvitationExpired(invitation.expiresAt)
        ? ("expired" as const)
        : invitation.state,
      acceptances: await acceptancesFor(invitation.id),
    })),
  );
}

export async function assertCanManageInvitations(
  circleId: string,
  userId: string,
) {
  const circle = await firebaseCircleStore.findById(circleId);
  if (!circle) throw new Error("Circle not found.");
  const role: CircleRole =
    circle.creatorId === userId
      ? "creator"
      : ((await firebaseCircleStore.roleFor(circleId, userId)) ?? "member");
  assertPermission(role, "manage_members");
  return { circle, role };
}

export async function createCircleInvitation(
  circleId: string,
  actorId: string,
  input: CreateInvitationInput,
) {
  const { circle } = await assertCanManageInvitations(circleId, actorId);
  if (
    ["cancelled", "completed", "archived", "purged"].includes(circle.status)
  ) {
    throw new Error("Invitations are closed for this circle.");
  }

  const mode: InvitationMode = input.mode === "open" ? "open" : "named";
  const recipientEmail = normalizeInvitationEmail(input.recipientEmail);
  const recipientPhone = normalizeInvitationPhone(input.recipientPhone);
  if (recipientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail)) {
    throw new Error("Enter a valid email address.");
  }
  if (mode === "named" && !recipientEmail && !recipientPhone) {
    throw new Error(
      "A named invitation needs an email address or phone number.",
    );
  }

  const maxUses = mode === "named" ? 1 : Number(input.maxUses ?? 1);
  if (!Number.isInteger(maxUses) || maxUses < 1) {
    throw new Error("Open-link capacity must be at least one.");
  }
  const currentMembers = await firebaseCircleStore.memberCount(circleId);
  const existingInvitations = await listCircleInvitations(circleId);
  const reservedSeats = existingInvitations
    .filter((invitation) =>
      activeInvitationStates.has(invitation.effectiveState),
    )
    .reduce(
      (sum, invitation) =>
        sum + Math.max(0, invitation.maxUses - invitation.useCount),
      0,
    );
  assertInvitationCapacity(
    currentMembers + reservedSeats,
    circle.memberLimit,
    0,
    1,
    maxUses,
  );

  const expectedAmount = Number(input.expectedAmount ?? 0);
  if (!Number.isInteger(expectedAmount) || expectedAmount < 0) {
    throw new Error("Expected contribution must be a whole positive amount.");
  }
  const createdAt = new Date().toISOString();
  const { token, tokenHash } = createSecureInvitationToken();
  const response = (await getBondCircleDataConnect().executeMutation(
    "CreateInvitation",
    {
      circleId,
      invitedById: actorId,
      tokenHash,
      mode,
      recipientName: input.recipientName?.trim() || null,
      recipientEmail,
      recipientPhone,
      expectedAmount,
      requireApproval: Boolean(input.requireApproval),
      maxUses,
      expiresAt: invitationExpiry(Number(input.expiresInDays ?? 7)),
      createdAt,
    },
  )) as { data: { invitation_insert: { id: string } } };
  return { id: response.data.invitation_insert.id, token };
}

export async function markInvitationSent(
  invitationId: string,
  circleId: string,
  actorId: string,
) {
  const invitations = await listCircleInvitations(circleId);
  const invitation = invitations.find((item) => item.id === invitationId);
  if (!invitation) throw new Error("Invitation not found.");
  await assertCanManageInvitations(circleId, actorId);
  if (invitation.state === "created") {
    assertInvitationTransition(invitation.state, "sent");
    await updateInvitationState(
      { ...invitation, circle: { id: circleId } },
      actorId,
      "sent",
    );
  }
}

export async function markInvitationOpened(
  invitation: InvitationDetail,
  actorId: string,
) {
  if (!["created", "sent"].includes(invitation.state)) return;
  assertInvitationTransition(invitation.state, "opened");
  await updateInvitationState(invitation, actorId, "opened", {
    openedAt: new Date().toISOString(),
  });
}

export async function revokeInvitation(
  invitationId: string,
  circleId: string,
  actorId: string,
) {
  await assertCanManageInvitations(circleId, actorId);
  const invitation = (await listCircleInvitations(circleId)).find(
    (item) => item.id === invitationId,
  );
  if (!invitation) throw new Error("Invitation not found.");
  assertInvitationTransition(invitation.state, "revoked");
  await updateInvitationState(
    { ...invitation, circle: { id: circleId } },
    actorId,
    "revoked",
    { revokedAt: new Date().toISOString() },
  );
}

async function updateInvitationState(
  invitation: Pick<InvitationRow, "id" | "state"> & {
    circle?: { id: string };
  },
  actorId: string,
  state: InvitationState,
  timestamps: { openedAt?: string; revokedAt?: string } = {},
) {
  const circleId = invitation.circle?.id;
  if (!circleId) throw new Error("Invitation circle not found.");
  await getBondCircleDataConnect().executeMutation("UpdateInvitationState", {
    invitationId: invitation.id,
    actorId,
    circleId,
    state,
    openedAt: timestamps.openedAt ?? null,
    revokedAt: timestamps.revokedAt ?? null,
    updatedAt: new Date().toISOString(),
  });
}

export async function respondToInvitation(
  invitation: InvitationDetail,
  user: { id: string; email: string | null; phone: string | null },
  response: "accept" | "decline",
) {
  if (invitation.effectiveState === "expired") {
    throw new Error("This invitation has expired.");
  }
  if (["revoked", "accepted", "declined"].includes(invitation.state)) {
    throw new Error(`This invitation is ${invitation.state}.`);
  }
  if (!invitationMatchesUser(invitation, user)) {
    throw new Error(
      "This named invitation belongs to another verified contact.",
    );
  }
  if (invitation.acceptances.some((item) => item.user.id === user.id)) {
    throw new Error("You have already responded to this invitation.");
  }

  const respondedAt = new Date().toISOString();
  if (response === "decline") {
    const state = invitation.mode === "named" ? "declined" : invitation.state;
    await getBondCircleDataConnect().executeMutation("DeclineInvitation", {
      invitationId: invitation.id,
      circleId: invitation.circle.id,
      userId: user.id,
      state,
      respondedAt,
    });
    return { status: "declined" as const };
  }

  const currentMembers = await firebaseCircleStore.memberCount(
    invitation.circle.id,
  );
  assertInvitationCapacity(
    currentMembers,
    invitation.circle.memberLimit,
    invitation.useCount,
    invitation.maxUses,
  );
  if (await firebaseCircleStore.roleFor(invitation.circle.id, user.id)) {
    throw new Error("You are already a member of this circle.");
  }

  if (invitation.requireApproval || invitation.circle.requireCreatorApproval) {
    await getBondCircleDataConnect().executeMutation(
      "RequestInvitationApproval",
      {
        invitationId: invitation.id,
        circleId: invitation.circle.id,
        userId: user.id,
        respondedAt,
      },
    );
    return { status: "approval_pending" as const };
  }

  const nextUseCount = invitation.useCount + 1;
  const nextInvitationState =
    nextUseCount >= invitation.maxUses ? "accepted" : "sent";
  await getBondCircleDataConnect().executeMutation(
    "AcceptInvitationWithMembership",
    {
      invitationId: invitation.id,
      circleId: invitation.circle.id,
      userId: user.id,
      role: "member",
      expectedAmount: invitation.expectedAmount,
      nextMemberCount: currentMembers + 1,
      nextInvitationState,
      nextUseCount,
      respondedAt,
    },
  );
  await safelyEmitNotification({
    circleId: invitation.circle.id,
    type: "invitation_accepted",
    entityId: invitation.id,
    actorId: user.id,
  });
  return { status: "joined" as const };
}

export async function approveInvitationMembership(
  circleId: string,
  invitationId: string,
  userId: string,
  actorId: string,
) {
  await assertCanManageInvitations(circleId, actorId);
  const invitation = (await listCircleInvitations(circleId)).find(
    (item) => item.id === invitationId,
  );
  if (!invitation) throw new Error("Invitation not found.");
  const acceptance = invitation.acceptances.find(
    (item) => item.user.id === userId && item.status === "pending",
  );
  if (!acceptance) throw new Error("Membership request not found.");
  const currentMembers = await firebaseCircleStore.memberCount(circleId);
  assertInvitationCapacity(
    currentMembers,
    (await firebaseCircleStore.findById(circleId))?.memberLimit ?? 0,
    invitation.useCount,
    invitation.maxUses,
  );
  const nextUseCount = invitation.useCount + 1;
  await getBondCircleDataConnect().executeMutation(
    "ApproveInvitationMembership",
    {
      invitationId,
      circleId,
      actorId,
      userId,
      role: "member",
      expectedAmount: invitation.expectedAmount,
      nextMemberCount: currentMembers + 1,
      nextInvitationState:
        nextUseCount >= invitation.maxUses ? "accepted" : "sent",
      nextUseCount,
      respondedAt: new Date().toISOString(),
    },
  );
  await safelyEmitNotification({
    circleId,
    type: "invitation_accepted",
    entityId: invitationId,
    actorId: userId,
  });
}

export async function requestReplacementInvitation(
  invitation: InvitationDetail,
  user: { id: string; email: string | null; phone: string | null },
) {
  if (!["expired", "revoked"].includes(invitation.effectiveState)) {
    throw new Error("This invitation does not need a replacement.");
  }
  if (!invitationMatchesUser(invitation, user)) {
    throw new Error(
      "This named invitation belongs to another verified contact.",
    );
  }
  await getBondCircleDataConnect().executeMutation(
    "RequestReplacementInvitation",
    {
      invitationId: invitation.id,
      circleId: invitation.circle.id,
      actorId: user.id,
      requestedAt: new Date().toISOString(),
    },
  );
}
