import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import {
  archiveCircle,
  cancelCircle,
  completeCircle,
} from "@/server/repositories/lifecycle";

export const runtime = "nodejs";

export async function POST(
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
    const body = (await request.json()) as {
      action?: unknown;
      completionType?: unknown;
    };
    if (body.action === "complete") {
      await completeCircle({
        circleId,
        actorId: session.uid,
        completionType: body.completionType,
      });
    } else if (body.action === "archive") {
      await archiveCircle(circleId, session.uid);
    } else if (body.action === "cancel") {
      await cancelCircle(circleId, session.uid);
    } else {
      throw new Error("Choose a valid lifecycle action.");
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update circle lifecycle.",
      },
      { status: 400 },
    );
  }
}
