import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { assertTrustedMutation, clientKey } from "@/server/auth/request";
import {
  assertCanManageInvitations,
  createCircleInvitation,
  listCircleInvitations,
  loadInvitationByToken,
} from "@/server/repositories/invitations";
import { emitNewInvitation } from "@/server/repositories/notifications";
import { enforceRateLimit } from "@/server/auth/security";
import { buildInvitationShareMessage } from "@/server/invitations/rules";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ circleId: string }> },
) {
  try {
    const session = await authenticatePrincipal(request);
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    const { circleId } = await context.params;
    await assertCanManageInvitations(circleId, session.uid);
    const invitations = await listCircleInvitations(circleId);
    return NextResponse.json({ invitations });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to load invitations.",
      },
      { status: 403 },
    );
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ circleId: string }> },
) {
  try {
    const session = await authenticatePrincipal(request);
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    await assertTrustedMutation(request, session);
    const { circleId } = await context.params;
    if (
      !(await enforceRateLimit(
        clientKey(request, `invite:${session.uid}:${circleId}`),
        20,
        60 * 60_000,
      ))
    ) {
      return NextResponse.json(
        { error: "Invitation limit reached. Try again later." },
        { status: 429 },
      );
    }
    const input = (await request.json()) as {
      mode?: "named" | "open";
      recipientName?: string;
      recipientEmail?: string;
      recipientPhone?: string;
      expectedAmount?: number;
      requireApproval?: boolean;
      maxUses?: number;
      expiresInDays?: number;
    };
    const invitation = await createCircleInvitation(circleId, session.uid, {
      ...input,
      mode: input.mode === "open" ? "open" : "named",
    });
    const origin = new URL(request.url).origin;
    const deepLink = `/invite/${encodeURIComponent(invitation.token)}`;
    const link = `${origin}${deepLink}`;
    const details = await loadInvitationByToken(invitation.token);
    if (!details) throw new Error("Unable to prepare the invitation.");
    const shareMessage = buildInvitationShareMessage({
      inviterName: details.invitedBy.displayName,
      circleName: details.circle.name,
      circleType: details.circle.type,
      reason: details.circle.description,
      link,
    });
    if (input.mode !== "open" && input.recipientEmail) {
      await emitNewInvitation({
        circleId,
        recipientEmail: input.recipientEmail,
        invitationId: invitation.id,
        deepLink,
        message: shareMessage,
      });
    }
    return NextResponse.json(
      {
        id: invitation.id,
        link,
        shareMessage,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to create invitation.",
      },
      { status: 400 },
    );
  }
}
