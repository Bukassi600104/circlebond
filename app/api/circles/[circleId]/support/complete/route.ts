import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { transitionCircleState } from "@/server/circles/service";
import { firebaseCircleStore } from "@/server/repositories/circles";
import {
  loadSupportCircle,
  setSupportCompletionType,
} from "@/server/repositories/support-circles";
import { safelyEmitNotification } from "@/server/repositories/notifications";

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
    const circle = await loadSupportCircle(circleId, session.uid);
    if (!circle || circle.creatorId !== session.uid) {
      throw new Error("Only the creator can record support delivery.");
    }
    let status = circle.status;
    const nextStatus: Record<
      string,
      "target_reached" | "fulfilment" | "completed"
    > = {
      active: "target_reached",
      target_reached: "fulfilment",
      fulfilment: "completed",
    };
    while (status in nextStatus) {
      const updated = await transitionCircleState(
        session.uid,
        circleId,
        nextStatus[status],
        firebaseCircleStore,
      );
      status = updated.status;
    }
    if (status !== "completed") {
      throw new Error(
        "This circle cannot be completed from its current state.",
      );
    }
    await setSupportCompletionType({
      circleId,
      actorId: session.uid,
      completionType: "support_delivered",
    });
    await safelyEmitNotification({
      circleId,
      type: "circle_completed",
      entityId: circleId,
      actorId: session.uid,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to complete circle.",
      },
      { status: 400 },
    );
  }
}
