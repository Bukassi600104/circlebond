import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { DecodedIdToken } from "firebase-admin/auth";
import { getFirebaseAdminAuth } from "@/server/firebase/admin";
import { SESSION_MAX_AGE_MS } from "./security";

export const SESSION_COOKIE = "__session";
export const CSRF_COOKIE = "bc_csrf";

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
    return await getFirebaseAdminAuth().verifySessionCookie(session, true);
  } catch {
    return null;
  }
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
