import type { DecodedIdToken } from "firebase-admin/auth";

export function withVerifiedContact(
  decoded: DecodedIdToken,
): DecodedIdToken | null {
  const email = decoded.email_verified === true ? decoded.email : undefined;
  if (!email && !decoded.phone_number) return null;
  return { ...decoded, email };
}
