import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { communicationErrorResponse } from "@/server/communication/http";
import { createComment } from "@/server/repositories/communication";
import { clientKey } from "@/server/auth/request";
import { enforceRateLimit } from "@/server/auth/security";

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
    if (
      !(await enforceRateLimit(
        clientKey(request, `comment:${session.uid}:${circleId}`),
        12,
        5 * 60_000,
      ))
    ) {
      return NextResponse.json(
        { error: "You are commenting too quickly. Try again shortly." },
        { status: 429 },
      );
    }
    const body = (await request.json()) as {
      body?: string;
      announcementId?: string | null;
      parentCommentId?: string | null;
    };
    const result = await createComment({
      circleId,
      authorId: session.uid,
      body: String(body.body ?? ""),
      announcementId: body.announcementId ?? null,
      parentCommentId: body.parentCommentId ?? null,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return communicationErrorResponse(error, "Unable to post comment.");
  }
}
