import "server-only";
import type { DecodedIdToken } from "firebase-admin/auth";
import { getFirebaseAdminAuth } from "@/server/firebase/admin";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import {
  authenticatePrincipal,
  type AuthenticatedPrincipal,
} from "./index";

/**
 * Outcome of authenticating a native-client API request.
 *
 * Distinguishes "no valid credentials presented" (HTTP 401) from
 * "credentials are valid but the account is not active" (HTTP 403),
 * as required by the mobile API contract (docs/openapi.yaml).
 */
export type NativeAuthOutcome =
  | { state: "authenticated"; principal: AuthenticatedPrincipal }
  | { state: "suspended" }
  | { state: "unauthenticated" };

async function loadAccountStatus(userId: string): Promise<string | null> {
  const response = await getBondCircleDataConnect().executeQuery<
    { user?: { accountStatus: string } },
    { userId: string }
  >("GetUserAccountStatus", { userId });
  return response.data.user?.accountStatus ?? null;
}

/**
 * Dual-auth resolver for the versioned `/api/v1/*` endpoints.
 *
 * 1. `Authorization: Bearer <Firebase ID token>` (native clients): the ID token
 *    is verified with firebase-admin including the revocation/disabled check,
 *    mirroring `readSession()` semantics. A Data Connect lookup then enforces
 *    `accountStatus === "active"`; anything else yields `{ state: "suspended" }`.
 * 2. Otherwise falls back to the existing web `__session` cookie verification
 *    via `authenticatePrincipal()` (which collapses suspension into `null`,
 *    surfacing as 401 exactly like every other web route).
 *
 * The uid is always taken from the verified token/session — never from the
 * client payload. Token-verification failures map to `unauthenticated`;
 * infrastructure errors (e.g. Data Connect outages) propagate so route
 * handlers can log them and answer 500.
 */
export async function authenticateNativeRequest(
  request: Request,
): Promise<NativeAuthOutcome> {
  const authHeader = request.headers.get("authorization");

  // --- Bearer path (Android / API clients) ---
  if (authHeader?.toLowerCase().startsWith("bearer ")) {
    const idToken = authHeader.slice(7).trim();
    if (!idToken) return { state: "unauthenticated" };

    let decoded: DecodedIdToken;
    try {
      decoded = await getFirebaseAdminAuth().verifyIdToken(idToken, true);
    } catch {
      return { state: "unauthenticated" };
    }

    const accountStatus = await loadAccountStatus(decoded.uid);
    if (accountStatus && accountStatus !== "active") {
      return { state: "suspended" };
    }

    return {
      state: "authenticated",
      principal: {
        uid: decoded.uid,
        email: decoded.email,
        phone: decoded.phone_number,
        scheme: "bearer",
        decoded,
      },
    };
  }

  // --- Session-cookie path (web callers of the same endpoints) ---
  const principal = await authenticatePrincipal(request);
  if (!principal) return { state: "unauthenticated" };
  return { state: "authenticated", principal };
}
