import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { communicationErrorResponse } from "@/server/communication/http";
import { setCircleComments } from "@/server/repositories/communication";

export async function PATCH(
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
    const body = (await request.json()) as { commentsEnabled?: boolean };
    if (typeof body.commentsEnabled !== "boolean") {
      throw new Error("Choose whether circle comments are enabled.");
    }
    await setCircleComments({
      circleId,
      actorId: session.uid,
      commentsEnabled: body.commentsEnabled,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return communicationErrorResponse(
      error,
      "Unable to update comment settings.",
    );
  }
}
