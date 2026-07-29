import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { communicationErrorResponse } from "@/server/communication/http";
import { createComment } from "@/server/repositories/communication";

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
