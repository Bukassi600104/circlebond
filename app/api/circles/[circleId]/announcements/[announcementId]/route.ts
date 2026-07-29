import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { communicationErrorResponse } from "@/server/communication/http";
import {
  deleteAnnouncement,
  updateAnnouncement,
} from "@/server/repositories/communication";

type RouteContext = {
  params: Promise<{ circleId: string; announcementId: string }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    const { circleId, announcementId } = await context.params;
    const body = (await request.json()) as {
      title?: string;
      body?: string;
      pinned?: boolean;
      commentsEnabled?: boolean;
    };
    const result = await updateAnnouncement({
      circleId,
      announcementId,
      actorId: session.uid,
      title: typeof body.title === "string" ? body.title : undefined,
      body: typeof body.body === "string" ? body.body : undefined,
      pinned: typeof body.pinned === "boolean" ? body.pinned : undefined,
      commentsEnabled:
        typeof body.commentsEnabled === "boolean"
          ? body.commentsEnabled
          : undefined,
    });
    return NextResponse.json(result);
  } catch (error) {
    return communicationErrorResponse(error, "Unable to update announcement.");
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    const { circleId, announcementId } = await context.params;
    await deleteAnnouncement({
      circleId,
      announcementId,
      actorId: session.uid,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return communicationErrorResponse(error, "Unable to delete announcement.");
  }
}
