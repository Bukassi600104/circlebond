import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation } from "@/server/auth/request";
import { createSupportUpdate } from "@/server/repositories/support-circles";

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
    const { body } = (await request.json()) as { body?: string };
    await createSupportUpdate({
      circleId,
      authorId: session.uid,
      body: String(body ?? ""),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to publish update.",
      },
      { status: 400 },
    );
  }
}
