import assert from "node:assert/strict";
import * as crypto from "node:crypto";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

class CookieResponse extends Response {
  cookies = { set() {} };
  static json(body, init) {
    const response = Response.json(body, init);
    return new CookieResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });
  }
}

const { clientKey } = await loadTypescriptModule("server/auth/request.ts", {
  "node:crypto": crypto,
  "next/headers": { cookies: async () => ({ get() {} }) },
  "@/server/auth": { CSRF_COOKIE: "synthetic-csrf" },
});
const prefixes = ["app/api/auth/email-otp/", "app/api/v1/auth/email-otp/"];
const request = (body, ip = "198.51.100.1") =>
  new Request("https://example.test/otp", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-vercel-forwarded-for": ip,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

function budget() {
  const uses = new Map();
  return async (key, limit) => {
    const count = uses.get(key) ?? 0;
    if (count >= limit) return false;
    uses.set(key, count + 1);
    return true;
  };
}

async function issuers() {
  let sent = 0;
  let validated = 0;
  const challenges = [];
  const enforceRateLimit = budget();
  const dependencies = {
    "next/server": { NextResponse: CookieResponse },
    "@/app/api/v1/_response": { apiJson: CookieResponse.json },
    "@/server/auth/request": { clientKey },
    "@/server/auth/security": {
      enforceRateLimit,
      validateEmailAddress: async (email) => {
        validated++;
        return email.trim().toLowerCase();
      },
      normalizeDisplayName: (name) => name,
      createEmailOtpChallenge: (input) => {
        challenges.push(input);
        return {
          challenge: { id: "synthetic-id", expiresAt: Date.now() + 600000 },
          challengeToken: "synthetic-challenge",
          code: "123456",
        };
      },
      OTP_ATTEMPTS_COOKIE: "synthetic-attempts",
      sealOtpAttempts: () => "synthetic-counter",
    },
    "@/server/auth/email": {
      sendEmailOtp: async () => {
        sent++;
        return "sent";
      },
    },
    "@/server/audit": { recordAuthAudit() {} },
  };
  const routes = await Promise.all(
    prefixes.map((prefix) =>
      loadTypescriptModule(`${prefix}request/route.ts`, dependencies, {
        process: {
          env: { NODE_ENV: "production", AUTH_EMAIL_OTP_MODE: "production" },
        },
      }),
    ),
  );
  return {
    routes,
    challenges,
    get sent() {
      return sent;
    },
    get validated() {
      return validated;
    },
  };
}

test("OTP address quota survives IP rotation, email normalization and switching web/native routes", async () => {
  const fixture = await issuers();
  let response;
  for (let index = 0; index < 6; index++) {
    response = await fixture.routes[index % 2].POST(
      request(
        {
          email:
            index % 2 ? "SYNTHETIC@EXAMPLE.TEST" : "synthetic@example.test",
          purpose: "sign-in",
        },
        `198.51.100.${index + 1}`,
      ),
    );
  }
  assert.equal(fixture.sent, 5);
  assert.equal(response.status, 202);
  assert.equal((await response.json()).challengeId, undefined);
});

test("aggregate issuance quota survives changing recipients and rejects before parsing or DNS", async () => {
  const fixture = await issuers();
  for (let index = 0; index < 120; index++) {
    const response = await fixture.routes[index % 2].POST(
      request({ email: `synthetic-${index}@example.test`, purpose: "sign-in" }),
    );
    assert.equal(response.status, 202);
  }
  const blocked = await fixture.routes[0].POST(request("not JSON"));
  assert.equal(blocked.status, 429);
  assert.equal(fixture.sent, 120);
  assert.equal(fixture.validated, 120);
});

for (const [index, name] of ["web", "native"].entries()) {
  test(`${name} OTP rejects unknown purpose and nonliteral registration consent`, async () => {
    const fixture = await issuers();
    for (const input of [
      { purpose: "unsupported-purpose" },
      { purpose: "register", termsAccepted: "true", privacyAccepted: true },
      { purpose: "register", termsAccepted: true, privacyAccepted: "true" },
      { purpose: "register", termsAccepted: false, privacyAccepted: true },
    ]) {
      const response = await fixture.routes[index].POST(
        request({
          email: "synthetic@example.test",
          displayName: "Synthetic User",
          ...input,
        }),
      );
      assert.equal(response.status, 400);
    }
    assert.equal(fixture.sent, 0);
    assert.equal(fixture.challenges.length, 0);
  });
  test(`${name} sign-in and recovery cannot stamp legal acceptance`, async () => {
    const fixture = await issuers();
    for (const purpose of ["sign-in", "recovery"]) {
      const response = await fixture.routes[index].POST(
        request({
          email: "synthetic@example.test",
          purpose,
          termsAccepted: true,
          privacyAccepted: true,
        }),
      );
      assert.equal(response.status, 202);
    }
    assert.equal(fixture.sent, 2);
    for (const challenge of fixture.challenges) {
      assert.equal(challenge.termsAcceptedAt, undefined);
      assert.equal(challenge.privacyAcceptedAt, undefined);
    }
  });
}

async function verifiers({
  accepted = false,
  purpose = "register",
  emailVerified = true,
} = {}) {
  const enforceRateLimit = budget();
  const events = [];
  const claims = [];
  let verified = 0;
  const auth = {
    getUserByEmail: async () => ({
      uid: "synthetic-user",
      emailVerified,
      customClaims: { owner: true, unrelated: "preserve-me" },
    }),
    updateUser: async (_uid, fields) => {
      if (fields.emailVerified === true) events.push("verified-email");
      return { uid: "synthetic-user", emailVerified: true };
    },
    setCustomUserClaims: async (_uid, value) => {
      claims.push(value);
    },
    createCustomToken: async () => {
      events.push("custom-token");
      return "synthetic-token";
    },
  };
  const dependencies = {
    "next/server": { NextResponse: CookieResponse },
    "@/app/api/v1/_response": { apiJson: CookieResponse.json },
    "next/headers": {
      cookies: async () => ({ get: () => ({ value: "old-signed-cookie" }) }),
    },
    "@/server/firebase/admin": { getFirebaseAdminAuth: () => auth },
    "@/server/auth/security": {
      enforceRateLimit,
      authChallengeFingerprint: (challenge) =>
        crypto.createHash("sha256").update(challenge).digest("hex"),
      OTP_MAX_ATTEMPTS: 5,
      OTP_TTL_MS: 600000,
      OTP_ATTEMPTS_COOKIE: "synthetic-attempts",
      readOtpAttempts: () => 0,
      sealOtpAttempts: () => "synthetic-counter",
      verifyEmailOtp: () => {
        verified++;
        return accepted
          ? {
              ok: true,
              challenge: {
                email: "synthetic@example.test",
                purpose,
                displayName: "Synthetic User",
                termsAcceptedAt: "2026-10-30T00:00:00.000Z",
                privacyAcceptedAt: "2026-10-30T00:00:00.000Z",
              },
            }
          : { ok: false, reason: "expired" };
      },
      consumeAuthChallenge: async () => true,
    },
    "@/server/auth/request": { clientKey },
    "@/server/audit": { recordAuthAudit() {} },
    "@/server/repositories/users": {
      persistUserProfile: async () => {},
      findPersistedUserByEmail: async () => null,
    },
  };
  const routes = await Promise.all(
    prefixes.map((prefix) =>
      loadTypescriptModule(`${prefix}verify/route.ts`, dependencies, {
        process: { env: { NODE_ENV: "production" } },
      }),
    ),
  );
  return {
    routes,
    events,
    claims,
    get verified() {
      return verified;
    },
  };
}

test("aggregate verification quota survives changing challenges and web/native endpoint", async () => {
  const fixture = await verifiers();
  for (let index = 0; index < 300; index++) {
    await fixture.routes[index % 2].POST(
      request({ challengeId: `synthetic-${index}`, code: "123456" }),
    );
  }
  const blocked = await fixture.routes[0].POST(request("not JSON"));
  assert.equal(blocked.status, 429);
  assert.equal(fixture.verified, 300);
  assert.equal(fixture.events.length, 0);
});

test("one challenge budget survives rotating IPs, endpoint changes and replayed attempts cookie", async () => {
  const fixture = await verifiers();
  let response;
  for (let index = 0; index < 6; index++) {
    response = await fixture.routes[index % 2].POST(
      request(
        { challengeId: "same-synthetic-challenge", code: "123456" },
        `198.51.100.${index + 1}`,
      ),
    );
  }
  assert.equal(response.status, 429);
  assert.equal(fixture.verified, 5);
  assert.equal(fixture.events.length, 0);
});

for (const [index, name] of ["web", "native"].entries()) {
  test(`${name} registration preserves unrelated verified custom claims`, async () => {
    const fixture = await verifiers({ accepted: true });
    const response = await fixture.routes[index].POST(
      request({ challengeId: "synthetic-challenge", code: "123456" }),
    );
    assert.equal(response.status, 200);
    assert.equal(fixture.claims.length, 1);
    assert.equal(fixture.claims[0].owner, true);
    assert.equal(fixture.claims[0].unrelated, "preserve-me");
    assert.equal(fixture.claims[0].termsAcceptedAt, "2026-10-30T00:00:00.000Z");
    assert.equal(
      fixture.claims[0].privacyAcceptedAt,
      "2026-10-30T00:00:00.000Z",
    );
  });
  test(`${name} sign-in OTP verifies an existing unverified mailbox before minting credentials`, async () => {
    const fixture = await verifiers({
      accepted: true,
      purpose: "sign-in",
      emailVerified: false,
    });
    const response = await fixture.routes[index].POST(
      request({ challengeId: "synthetic-challenge", code: "123456" }),
    );
    assert.equal(response.status, 200);
    assert.ok(fixture.events.includes("verified-email"));
    assert.ok(
      fixture.events.indexOf("verified-email") <
        fixture.events.indexOf("custom-token"),
    );
    assert.equal(fixture.claims.length, 0);
  });
}
