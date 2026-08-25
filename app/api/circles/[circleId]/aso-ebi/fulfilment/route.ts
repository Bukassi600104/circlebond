import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import {
  ASO_EBI_FULFILMENT_STATUSES,
  type AsoEbiFulfilmentStatus,
} from "@/server/circles/aso-ebi";
import { updateAsoEbiFulfilment } from "@/server/repositories/aso-ebi-circles";

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
      memberId?: string;
      status?: string;
    };
    if (
      !body.memberId ||
      !ASO_EBI_FULFILMENT_STATUSES.includes(
        body.status as AsoEbiFulfilmentStatus,
      )
    ) {
      throw new Error("Choose a valid member and delivery status.");
    }
    await updateAsoEbiFulfilment({
      circleId,
      actorId: session.uid,
      memberId: body.memberId,
      status: body.status as AsoEbiFulfilmentStatus,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update fulfilment.",
      },
      { status: 400 },
    );
  }
}
