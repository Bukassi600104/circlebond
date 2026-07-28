import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { invitationMatchesUser } from "@/server/invitations/rules";
import {
  loadInvitationByToken,
  markInvitationOpened,
  requestReplacementInvitation,
  respondToInvitation,
} from "@/server/repositories/invitations";

export const runtime = "nodejs";

export async function POST(
  request: Request,
  context: { params: Promise<{ token: string }> },
) {
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    const { token } = await context.params;
    const invitation = await loadInvitationByToken(token);
    if (!invitation) {
      return NextResponse.json(
        { error: "This invitation link is invalid." },
        { status: 404 },
      );
    }
    const user = {
      id: session.uid,
      email: session.email ?? null,
      phone: session.phone_number ?? null,
    };
    if (!invitationMatchesUser(invitation, user)) {
      return NextResponse.json(
        { error: "This invitation belongs to another verified contact." },
        { status: 403 },
      );
    }
    const { action } = (await request.json()) as {
      action?: "open" | "accept" | "decline" | "request_new";
    };
    if (action === "request_new") {
      await requestReplacementInvitation(invitation, user);
      return NextResponse.json({ status: "replacement_requested" });
    }
    if (action === "open") {
      await markInvitationOpened(invitation, session.uid);
      return NextResponse.json({ status: "opened" });
    }
    if (action !== "accept" && action !== "decline") {
      throw new Error("Choose whether to accept or decline this invitation.");
    }
    const result = await respondToInvitation(invitation, user, action);
    return NextResponse.json({
      ...result,
      circleId: invitation.circle.id,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to respond to this invitation.",
      },
      { status: 400 },
    );
  }
}
