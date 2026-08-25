import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { setCircleNotificationMute } from "@/server/repositories/notifications";

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
    const body = (await request.json()) as { muted?: unknown };
    if (typeof body.muted !== "boolean") {
      throw new Error("Mute preference must be true or false.");
    }
    await setCircleNotificationMute(circleId, session.uid, body.muted);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update this circle.",
      },
      { status: 400 },
    );
  }
}
