import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { communicationErrorResponse } from "@/server/communication/http";
import { createAnnouncement } from "@/server/repositories/communication";

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
      title?: string;
      body?: string;
      pinned?: boolean;
      commentsEnabled?: boolean;
    };
    const result = await createAnnouncement({
      circleId,
      authorId: session.uid,
      title: String(body.title ?? ""),
      body: String(body.body ?? ""),
      pinned: body.pinned === true,
      commentsEnabled: body.commentsEnabled !== false,
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return communicationErrorResponse(error, "Unable to post announcement.");
  }
}
