import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  createSessionCookie,
  CSRF_COOKIE,
  readSession,
  SESSION_COOKIE,
  sessionCookieOptions,
} from "@/server/auth";
import { assertTrustedMutation, clientKey } from "@/server/auth/request";
import { enforceRateLimit } from "@/server/auth/security";
import { recordAuthAudit } from "@/server/audit";
import { getFirebaseAdminAuth } from "@/server/firebase/admin";
import { persistUserProfile } from "@/server/repositories/users";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json(
    {
      authenticated: true,
      user: {
        uid: session.uid,
        displayName: session.name ?? null,
        email: session.email ?? null,
        phone: session.phone_number ?? null,
      },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: Request) {
  try {
    await assertTrustedMutation(request);
    if (!(await enforceRateLimit(clientKey(request, "login"), 10, 60_000))) {
      return NextResponse.json(
        { error: "Please wait before trying again." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    }
    const { idToken } = (await request.json()) as { idToken?: string };
    if (!idToken || idToken.length > 10_000) throw new Error("Invalid token.");

    const sessionCookie = await createSessionCookie(idToken);
    const decoded = await getFirebaseAdminAuth().verifyIdToken(idToken);
    await persistUserProfile({
      id: decoded.uid,
      displayName:
        decoded.name ??
        decoded.email?.split("@")[0] ??
        decoded.phone_number ??
        "BondCircle member",
      email: decoded.email ?? null,
      phone: decoded.phone_number ?? null,
      profileImage: decoded.picture ?? null,
      termsAcceptedAt:
        typeof decoded.termsAcceptedAt === "string"
          ? decoded.termsAcceptedAt
          : null,
      privacyAcceptedAt:
        typeof decoded.privacyAcceptedAt === "string"
          ? decoded.privacyAcceptedAt
          : null,
    });

    const needsLegalAcceptance = !(
      typeof decoded.termsAcceptedAt === "string" &&
      typeof decoded.privacyAcceptedAt === "string"
    );
    const response = NextResponse.json({
      authenticated: true,
      needsLegalAcceptance,
    });
    response.cookies.set(SESSION_COOKIE, sessionCookie, sessionCookieOptions());
    recordAuthAudit({
      event: "login",
      outcome: "success",
      userId: decoded.uid,
    });
    return response;
  } catch {
    recordAuthAudit({ event: "login", outcome: "failure" });
    return NextResponse.json(
      { error: "Unable to sign in with those details." },
      { status: 401 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await assertTrustedMutation(request);
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;
    let userId: string | undefined;
    if (sessionCookie) {
      try {
        const decoded =
          await getFirebaseAdminAuth().verifySessionCookie(sessionCookie);
        userId = decoded.uid;
        await getFirebaseAdminAuth().revokeRefreshTokens(decoded.uid);
      } catch {
        // The same outward result prevents session-validity enumeration.
      }
    }
    const response = NextResponse.json({ authenticated: false });
    response.cookies.set(SESSION_COOKIE, "", {
      ...sessionCookieOptions(),
      maxAge: 0,
    });
    response.cookies.set(CSRF_COOKIE, "", {
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    recordAuthAudit({ event: "logout", outcome: "success", userId });
    return response;
  } catch {
    return NextResponse.json({ error: "Unable to sign out." }, { status: 400 });
  }
}
