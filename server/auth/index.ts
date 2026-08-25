import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { DecodedIdToken } from "firebase-admin/auth";
import { getFirebaseAdminAuth } from "@/server/firebase/admin";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import { SESSION_MAX_AGE_MS } from "./security";

export const SESSION_COOKIE = "__session";
export const CSRF_COOKIE = "bc_csrf";

export type AuthScheme = "session" | "bearer";

/** Principal shape returned by authenticatePrincipal */
export interface AuthenticatedPrincipal {
  uid: string;
  email?: string;
  phone?: string;
  scheme: AuthScheme;
  decoded: DecodedIdToken;
}

export async function createSessionCookie(idToken: string) {
  const auth = getFirebaseAdminAuth();
  const decoded = await auth.verifyIdToken(idToken);
  const signedInAt = Number(decoded.auth_time) * 1000;
  if (!signedInAt || Date.now() - signedInAt > 5 * 60 * 1000) {
    throw new Error("Recent sign-in required.");
  }
  return auth.createSessionCookie(idToken, { expiresIn: SESSION_MAX_AGE_MS });
}

export async function readSession(): Promise<DecodedIdToken | null> {
  const session = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!session) return null;
  try {
    // Keep revocation checking explicit: suspended/disabled Firebase sessions must fail.
    // prettier-ignore
    const decoded = await getFirebaseAdminAuth().verifySessionCookie(session, true);
    const response = await getBondCircleDataConnect().executeQuery<
      { user?: { accountStatus: string } },
      { userId: string }
    >("GetUserAccountStatus", { userId: decoded.uid });
    if (response.data.user && response.data.user.accountStatus !== "active") {
      return null;
    }
    return decoded;
  } catch {
    return null;
  }
}

/**
 * Dual-auth principal resolver for mobile (Bearer) and web (session cookie).
 *
 * 1. If `Authorization: Bearer <idToken>` is present, verifies the Firebase ID token
 *    with revocation check and returns a principal with `scheme: "bearer"`.
 * 2. Otherwise falls back to the existing `readSession()` cookie path and returns
 *    a principal with `scheme: "session"`.
 * 3. Returns `null` if neither path yields a valid principal.
 */
export async function authenticatePrincipal(
  request?: Request,
): Promise<AuthenticatedPrincipal | null> {
  // --- Bearer path (mobile / API clients) ---
  const authHeader = request?.headers.get("authorization");
  if (authHeader?.toLowerCase().startsWith("bearer ")) {
    const idToken = authHeader.slice(7).trim();
    if (!idToken) return null;
    try {
      const auth = getFirebaseAdminAuth();
      const decoded = await auth.verifyIdToken(idToken, true);
      // Check account status
      const response = await getBondCircleDataConnect().executeQuery<
        { user?: { accountStatus: string } },
        { userId: string }
      >("GetUserAccountStatus", { userId: decoded.uid });
      if (response.data.user && response.data.user.accountStatus !== "active") {
        return null;
      }
      return {
        uid: decoded.uid,
        email: decoded.email,
        phone: decoded.phone_number,
        scheme: "bearer",
        decoded,
      };
    } catch {
      return null;
    }
  }

  // --- Session cookie path (web) ---
  const decoded = await readSession();
  if (!decoded) return null;
  return {
    uid: decoded.uid,
    email: decoded.email,
    phone: decoded.phone_number,
    scheme: "session",
    decoded,
  };
}

export async function requireSession(nextPath = "/account") {
  const session = await readSession();
  const safeNext =
    nextPath.startsWith("/") && !nextPath.startsWith("//")
      ? nextPath
      : "/account";
  if (!session) redirect(`/sign-in?next=${encodeURIComponent(safeNext)}`);
  return session;
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE_MS / 1000,
  };
}

