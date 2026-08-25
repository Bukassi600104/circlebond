import { NextResponse } from "next/server";
import { authenticatePrincipal, readSession } from "@/server/auth";
import { assertTrustedMutation, clientKey } from "@/server/auth/request";
import { enforceRateLimit } from "@/server/auth/security";
import { getFirebaseAdminAuth } from "@/server/firebase/admin";
import { updatePersistedDisplayName } from "@/server/repositories/users";

export const runtime = "nodejs";

export async function PATCH(request: Request) {
  try {
    const session = await authenticatePrincipal(request);
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    await assertTrustedMutation(request, session);

    if (
      !(await enforceRateLimit(
        clientKey(request, `profile:${session.uid}`),
        10,
        60 * 60_000,
      ))
    ) {
      return NextResponse.json(
        { error: "Too many profile changes. Try again later." },
        { status: 429 },
      );
    }
    const input = (await request.json()) as { displayName?: string };
    const displayName = String(input.displayName ?? "")
      .trim()
      .replace(/\s+/g, " ");
    if (displayName.length < 2 || displayName.length > 80) {
      throw new Error("Display name must be between 2 and 80 characters.");
    }
    if (!/[\p{L}\p{N}]/u.test(displayName)) {
      throw new Error("Enter a valid display name.");
    }
    await getFirebaseAdminAuth().updateUser(session.uid, { displayName });
    await updatePersistedDisplayName(session.uid, displayName);
    return NextResponse.json({ displayName });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to update profile.",
      },
      { status: 400 },
    );
  }
}
