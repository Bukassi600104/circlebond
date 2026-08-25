import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { communicationErrorResponse } from "@/server/communication/http";
import { moderateComment } from "@/server/repositories/communication";

export async function POST(
  request: Request,
  context: { params: Promise<{ circleId: string; commentId: string }> },
) {
  try {
    const session = await authenticatePrincipal(request);
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    await assertTrustedMutation(request, session);
    const { circleId, commentId } = await context.params;
    const body = (await request.json()) as { reason?: string };
    await moderateComment({
      circleId,
      commentId,
      actorId: session.uid,
      reason: String(body.reason ?? ""),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return communicationErrorResponse(error, "Unable to moderate comment.");
  }
}
