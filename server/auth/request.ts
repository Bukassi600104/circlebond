import { timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { CSRF_COOKIE } from "@/server/auth";

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function assertTrustedMutation(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    throw new Error("Untrusted request origin.");
  }

  const cookieToken = (await cookies()).get(CSRF_COOKIE)?.value;
  const headerToken = request.headers.get("x-csrf-token");
  if (!cookieToken || !headerToken || !safeEqual(cookieToken, headerToken)) {
    throw new Error("Invalid CSRF token.");
  }
}

export function clientKey(request: Request, identifier = "") {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0];
  return `${forwarded ?? "local"}:${identifier}`;
}
