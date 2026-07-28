import { NextResponse } from "next/server";
import { assertTrustedMutation } from "@/server/auth/request";
import { readSession } from "@/server/auth";
import { getFirebaseAdminAuth } from "@/server/firebase/admin";
import { persistUserProfile } from "@/server/repositories/users";

export async function POST(request: Request) {
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) throw new Error("Authentication required.");
    const input = (await request.json()) as {
      termsAccepted?: boolean;
      privacyAccepted?: boolean;
      displayName?: string;
    };
    if (!input.termsAccepted || !input.privacyAccepted) {
      throw new Error("Both policies must be accepted.");
    }
    const acceptedAt = new Date().toISOString();
    const displayName =
      input.displayName?.trim().replace(/\s+/g, " ") ||
      session.name ||
      session.email?.split("@")[0] ||
      "BondCircle member";
    if (displayName.length < 2 || displayName.length > 80) {
      throw new Error("Invalid display name.");
    }
    await getFirebaseAdminAuth().updateUser(session.uid, { displayName });
    await getFirebaseAdminAuth().setCustomUserClaims(session.uid, {
      termsAcceptedAt: acceptedAt,
      privacyAcceptedAt: acceptedAt,
    });
    await persistUserProfile({
      id: session.uid,
      displayName,
      email: session.email ?? null,
      phone: session.phone_number ?? null,
      profileImage: session.picture ?? null,
      termsAcceptedAt: acceptedAt,
      privacyAcceptedAt: acceptedAt,
    });
    return NextResponse.json({ acceptedAt });
  } catch {
    return NextResponse.json(
      { error: "Unable to record acceptance." },
      { status: 400 },
    );
  }
}
