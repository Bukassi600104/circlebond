import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { selectAsoEbiTier } from "@/server/repositories/aso-ebi-circles";

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
    const { tierId } = (await request.json()) as { tierId?: string };
    if (!tierId) throw new Error("Choose a tier.");
    await selectAsoEbiTier({
      circleId,
      memberId: session.uid,
      tierId,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to select tier.",
      },
      { status: 400 },
    );
  }
}
