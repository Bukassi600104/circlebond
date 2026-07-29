import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import {
  dismissNotification,
  markNotificationRead,
} from "@/server/repositories/notifications";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ notificationId: string }> },
) {
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    const { notificationId } = await context.params;
    const body = (await request.json()) as { action?: string };
    if (body.action === "read") {
      await markNotificationRead(notificationId, session.uid);
    } else if (body.action === "dismiss") {
      await dismissNotification(notificationId, session.uid);
    } else {
      throw new Error("Choose read or dismiss.");
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update notification.",
      },
      { status: 400 },
    );
  }
}
