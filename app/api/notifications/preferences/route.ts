import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { updateNotificationPreferences } from "@/server/repositories/notifications";

const preferenceKeys = [
  "emailNotifications",
  "browserPushNotifications",
  "commentNotifications",
  "contributionReminders",
  "circleUpdateNotifications",
  "marketingCommunication",
] as const;

export async function PATCH(request: Request) {
  try {
    const session = await authenticatePrincipal(request);
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    await assertTrustedMutation(request, session);
    const body = (await request.json()) as Record<string, unknown>;
    if (preferenceKeys.some((key) => typeof body[key] !== "boolean")) {
      throw new Error("Every notification preference must be true or false.");
    }
    await updateNotificationPreferences(session.uid, {
      emailNotifications: body.emailNotifications as boolean,
      browserPushNotifications: body.browserPushNotifications as boolean,
      commentNotifications: body.commentNotifications as boolean,
      contributionReminders: body.contributionReminders as boolean,
      circleUpdateNotifications: body.circleUpdateNotifications as boolean,
      marketingCommunication: body.marketingCommunication as boolean,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to save notification preferences.",
      },
      { status: 400 },
    );
  }
}
