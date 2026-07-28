import {
  createCipheriv,
  createDecipheriv,
  createHash,
  createHmac,
  randomBytes,
  randomInt,
  randomUUID,
  timingSafeEqual,
} from "node:crypto";
import { resolve4, resolve6, resolveMx } from "node:dns/promises";

export const OTP_TTL_MS = 10 * 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;
export const SESSION_MAX_AGE_MS = 8 * 60 * 60 * 1000;
export const OTP_ATTEMPTS_COOKIE = "bc_otp_attempts";

type OtpPurpose = "register" | "sign-in" | "recovery";

export type EmailOtpChallenge = {
  id: string;
  email: string;
  codeHash: string;
  purpose: OtpPurpose;
  displayName?: string;
  termsAcceptedAt?: string;
  privacyAcceptedAt?: string;
  attempts: number;
  expiresAt: number;
};

const requestWindows = new Map<string, number[]>();

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function challengeKey() {
  const configured = process.env.AUTH_CHALLENGE_SECRET;
  if (process.env.NODE_ENV === "production" && !configured) {
    throw new Error("AUTH_CHALLENGE_SECRET is required in production.");
  }
  return createHash("sha256")
    .update(
      configured ??
        `bondcircle-local:${process.env.FIREBASE_PROJECT_ID ?? "development"}`,
    )
    .digest();
}

function seal(payload: object) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", challengeKey(), iv);
  const ciphertext = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);
  return Buffer.concat([iv, cipher.getAuthTag(), ciphertext]).toString(
    "base64url",
  );
}

function open<T>(token: string): T | null {
  try {
    const packed = Buffer.from(token, "base64url");
    const iv = packed.subarray(0, 12);
    const tag = packed.subarray(12, 28);
    const ciphertext = packed.subarray(28);
    const decipher = createDecipheriv("aes-256-gcm", challengeKey(), iv);
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]).toString("utf8");
    return JSON.parse(plaintext) as T;
  } catch {
    return null;
  }
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

function withTimeout<T>(operation: Promise<T>, timeoutMs = 2500) {
  return Promise.race([
    operation,
    new Promise<never>((_, reject) => {
      const timer = setTimeout(
        () => reject(new Error("Email-domain lookup timed out.")),
        timeoutMs,
      );
      timer.unref();
    }),
  ]);
}

export async function validateEmailAddress(
  value: string,
  {
    allowTestDomains = false,
    checkDomain = true,
  }: { allowTestDomains?: boolean; checkDomain?: boolean } = {},
) {
  const email = normalizeEmail(value);
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address.");
  }

  const [local, domain, ...extra] = email.split("@");
  if (
    extra.length ||
    !local ||
    local.length > 64 ||
    local.startsWith(".") ||
    local.endsWith(".") ||
    local.includes("..") ||
    !domain
  ) {
    throw new Error("Invalid email address.");
  }

  if (
    allowTestDomains &&
    (domain === "example.test" || domain.endsWith(".test"))
  ) {
    return email;
  }
  if (!checkDomain) return email;

  try {
    const mx = await withTimeout(resolveMx(domain));
    if (mx.length > 0) return email;
  } catch {
    // RFC-compatible mail delivery may fall back to an address record.
  }

  try {
    const addresses = await withTimeout(
      Promise.any([resolve4(domain), resolve6(domain)]),
    );
    if (addresses.length > 0) return email;
  } catch {
    // The generic error below avoids disclosing lookup details.
  }

  throw new Error("Email domain cannot receive mail.");
}

export function normalizePhone(value: string) {
  const compact = value.replace(/[\s().-]/g, "");
  if (!/^\+[1-9]\d{7,14}$/.test(compact)) {
    throw new Error("Enter a phone number with its country code.");
  }
  return compact;
}

export function normalizeDisplayName(value: string) {
  const normalized = value.trim().replace(/\s+/g, " ");
  if (normalized.length < 2 || normalized.length > 80) {
    throw new Error("Display name must be between 2 and 80 characters.");
  }
  return normalized;
}

export function enforceRateLimit(key: string, limit = 6, windowMs = 60_000) {
  const now = Date.now();
  const existing = requestWindows.get(hash(key)) ?? [];
  const active = existing.filter((timestamp) => now - timestamp < windowMs);
  if (active.length >= limit) {
    return false;
  }
  active.push(now);
  requestWindows.set(hash(key), active);
  return true;
}

export function createEmailOtpChallenge(input: {
  email: string;
  purpose: OtpPurpose;
  displayName?: string;
  termsAcceptedAt?: string;
  privacyAcceptedAt?: string;
}) {
  const code = randomInt(100_000, 1_000_000).toString();
  const challenge: EmailOtpChallenge = {
    id: randomUUID(),
    email: normalizeEmail(input.email),
    codeHash: hash(code),
    purpose: input.purpose,
    displayName: input.displayName,
    termsAcceptedAt: input.termsAcceptedAt,
    privacyAcceptedAt: input.privacyAcceptedAt,
    attempts: 0,
    expiresAt: Date.now() + OTP_TTL_MS,
  };
  return { challenge, challengeToken: seal(challenge), code };
}

export function verifyEmailOtp(
  challengeToken: string,
  code: string,
  attempts: number,
) {
  const challenge = open<EmailOtpChallenge>(challengeToken);
  if (!challenge || challenge.expiresAt <= Date.now()) {
    return { ok: false as const, reason: "expired" as const };
  }
  if (attempts >= OTP_MAX_ATTEMPTS) {
    return { ok: false as const, reason: "attempts" as const };
  }
  const providedHash = Buffer.from(hash(code));
  const expectedHash = Buffer.from(challenge.codeHash);
  if (
    providedHash.length !== expectedHash.length ||
    !timingSafeEqual(providedHash, expectedHash)
  ) {
    return {
      ok: false as const,
      reason: "invalid" as const,
      nextAttempts: attempts + 1,
      challengeId: challenge.id,
    };
  }
  return { ok: true as const, challenge };
}

export function sealOtpAttempts(challengeId: string, attempts: number) {
  const body = `${challengeId}.${attempts}`;
  const signature = createHmac("sha256", challengeKey())
    .update(body)
    .digest("base64url");
  return `${body}.${signature}`;
}

export function readOtpAttempts(
  value: string | undefined,
  challengeToken: string,
) {
  const challenge = open<EmailOtpChallenge>(challengeToken);
  if (!challenge) return OTP_MAX_ATTEMPTS;
  const challengeId = challenge.id;
  if (!value) return 0;
  const [storedId, attemptsText, signature] = value.split(".");
  const body = `${storedId}.${attemptsText}`;
  const expected = createHmac("sha256", challengeKey()).update(body).digest();
  const provided = Buffer.from(signature ?? "", "base64url");
  if (
    storedId !== challengeId ||
    expected.length !== provided.length ||
    !timingSafeEqual(expected, provided)
  ) {
    return OTP_MAX_ATTEMPTS;
  }
  const attempts = Number(attemptsText);
  return Number.isInteger(attempts) && attempts >= 0
    ? attempts
    : OTP_MAX_ATTEMPTS;
}

export function clearAuthSecurityStateForTests() {
  requestWindows.clear();
}
