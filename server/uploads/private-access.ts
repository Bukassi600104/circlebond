import "server-only";
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

const PRIVATE_URL_TTL_MS = 5 * 60 * 1000;

type PrivateAccessPayload = {
  v: 1;
  circleId: string;
  resourceId: string;
  viewerId: string;
  expiresAt: number;
};

function signingKey() {
  const configured =
    process.env.PRIVATE_FILE_ACCESS_SECRET ?? process.env.AUTH_CHALLENGE_SECRET;
  if (process.env.NODE_ENV === "production" && !configured) {
    throw new Error("A private file access secret is required in production.");
  }
  return createHash("sha256")
    .update(`bondcircle-private-files:${configured ?? "local-development"}`)
    .digest();
}

function sign(encoded: string) {
  return createHmac("sha256", signingKey()).update(encoded).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function createPrivateFileAccess(input: {
  circleId: string;
  resourceId: string;
  viewerId: string;
  now?: number;
}) {
  const payload: PrivateAccessPayload = {
    v: 1,
    circleId: input.circleId,
    resourceId: input.resourceId,
    viewerId: input.viewerId,
    expiresAt: (input.now ?? Date.now()) + PRIVATE_URL_TTL_MS,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function verifyPrivateFileAccess(
  token: string | null,
  expected: Omit<PrivateAccessPayload, "v" | "expiresAt">,
  now = Date.now(),
) {
  if (!token || token.length > 2_048) return false;
  const [encoded, signature, extra] = token.split(".");
  if (!encoded || !signature || extra || !safeEqual(sign(encoded), signature)) {
    return false;
  }
  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as PrivateAccessPayload;
    return (
      payload.v === 1 &&
      payload.expiresAt > now &&
      payload.expiresAt <= now + PRIVATE_URL_TTL_MS &&
      payload.circleId === expected.circleId &&
      payload.resourceId === expected.resourceId &&
      payload.viewerId === expected.viewerId
    );
  } catch {
    return false;
  }
}
