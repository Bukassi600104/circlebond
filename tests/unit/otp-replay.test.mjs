import assert from "node:assert/strict";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

for (const file of [
  "app/api/auth/email-otp/verify/route.ts",
  "app/api/v1/auth/email-otp/verify/route.ts",
]) {
  test(`${file}: a consumed valid registration challenge cannot mutate the account or mint a token`, async () => {
    let authAccess = 0;
    let profileWrites = 0;
    const route = await loadTypescriptModule(file, {
      "next/server": { NextResponse: Response },
      "next/headers": { cookies: async () => ({ get: () => undefined }) },
      "@/app/api/v1/_response": { apiJson: Response.json },
      "@/server/firebase/admin": {
        getFirebaseAdminAuth: () => {
          authAccess++;
          throw new Error("must not reach provider");
        },
      },
      "@/server/auth/security": {
        OTP_MAX_ATTEMPTS: 5,
        OTP_TTL_MS: 600000,
        enforceRateLimit: async () => true,
        authChallengeFingerprint: () => "fingerprint",
        readOtpAttempts: () => 0,
        verifyEmailOtp: () => ({
          ok: true,
          challenge: {
            purpose: "register",
            email: "member@example.test",
            displayName: "Old name",
            termsAcceptedAt: "old",
            privacyAcceptedAt: "old",
          },
        }),
        consumeAuthChallenge: async () => false,
      },
      "@/server/auth/request": { clientKey: () => "test" },
      "@/server/audit": { recordAuthAudit() {} },
      "@/server/repositories/users": {
        persistUserProfile: async () => profileWrites++,
      },
    });
    const response = await route.POST(
      new Request("https://example.test", {
        method: "POST",
        body: JSON.stringify({
          challengeId: "valid-but-consumed",
          code: "123456",
        }),
      }),
    );
    assert.equal(response.status, 409);
    assert.match((await response.json()).error, /already been used/);
    assert.equal(authAccess, 0);
    assert.equal(profileWrites, 0);
  });
}
