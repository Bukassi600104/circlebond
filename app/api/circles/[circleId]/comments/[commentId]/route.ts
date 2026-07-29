import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { communicationErrorResponse } from "@/server/communication/http";
import { deleteOwnComment } from "@/server/repositories/communication";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ circleId: string; commentId: string }> },
) {
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    const { circleId, commentId } = await context.params;
    await deleteOwnComment({ circleId, commentId, actorId: session.uid });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return communicationErrorResponse(error, "Unable to delete comment.");
  }
}
