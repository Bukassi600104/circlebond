import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { createSupportUpdate } from "@/server/repositories/support-circles";
import { pricingErrorResponse } from "@/server/pricing/http";

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
    const { body } = (await request.json()) as { body?: string };
    await createSupportUpdate({
      circleId,
      authorId: session.uid,
      body: String(body ?? ""),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return pricingErrorResponse(error, "Unable to publish update.");
  }
}
