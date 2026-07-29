import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import {
  assertCanManageInvitations,
  createCircleInvitation,
  listCircleInvitations,
} from "@/server/repositories/invitations";
import { emitNewInvitation } from "@/server/repositories/notifications";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ circleId: string }> },
) {
  try {
    const session = await readSession();
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
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    const { circleId } = await context.params;
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
    if (input.mode !== "open" && input.recipientEmail) {
      await emitNewInvitation({
        circleId,
        recipientEmail: input.recipientEmail,
        invitationId: invitation.id,
        deepLink,
      });
    }
    return NextResponse.json(
      {
        id: invitation.id,
        link: `${origin}${deepLink}`,
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
