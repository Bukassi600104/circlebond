import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import {
  approveInvitationMembership,
  markInvitationSent,
  revokeInvitation,
} from "@/server/repositories/invitations";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ circleId: string; invitationId: string }>;
  },
) {
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    const { circleId, invitationId } = await context.params;
    const body = (await request.json()) as {
      action?: "sent" | "revoke" | "approve";
      userId?: string;
    };
    if (body.action === "sent") {
      await markInvitationSent(invitationId, circleId, session.uid);
    } else if (body.action === "revoke") {
      await revokeInvitation(invitationId, circleId, session.uid);
    } else if (body.action === "approve" && body.userId) {
      await approveInvitationMembership(
        circleId,
        invitationId,
        body.userId,
        session.uid,
      );
    } else {
      throw new Error("Choose a valid invitation action.");
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update invitation.",
      },
      { status: 400 },
    );
  }
}
