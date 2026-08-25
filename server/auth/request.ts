import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { CSRF_COOKIE } from "@/server/auth";
import type { AuthenticatedPrincipal } from "@/server/auth";

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Validates that a mutation request comes from a trusted origin.
 *
 * - If the principal authenticated via Bearer token (mobile), CSRF and origin
 *   checks are skipped since native clients don't use cookies.
 * - If the request carries an Authorization: Bearer header (even without a
 *   resolved principal), CSRF checks are also skipped.
 * - Otherwise, full CSRF cookie + origin validation is enforced for web sessions.
 */
export async function assertTrustedMutation(
  request: Request,
  principal?: AuthenticatedPrincipal | null,
) {
  // Bearer-authenticated clients bypass CSRF entirely
  if (principal?.scheme === "bearer") return;

  const authHeader = request.headers.get("authorization");
  if (authHeader?.toLowerCase().startsWith("bearer ")) return;

  // Cookie-based session: enforce origin + CSRF
  const origin = request.headers.get("origin");
  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && !["same-origin", "none"].includes(fetchSite)) {
    throw new Error("Untrusted request origin.");
  }
  if (!origin || !host) throw new Error("Missing request origin.");
  try {
    if (new URL(origin).host !== host.split(",")[0].trim()) {
      throw new Error("Untrusted request origin.");
    }
  } catch {
    throw new Error("Untrusted request origin.");
  }

  const cookieToken = (await cookies()).get(CSRF_COOKIE)?.value;
  const headerToken = request.headers.get("x-csrf-token");
  if (!cookieToken || !headerToken || !safeEqual(cookieToken, headerToken)) {
    throw new Error("Invalid CSRF token.");
  }
}

export function clientKey(request: Request, identifier = "") {
  const forwarded =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for");
  const address = forwarded?.split(",")[0]?.trim() || "local";
  return `${address.slice(0, 64)}:${identifier.slice(0, 254)}`;
}

