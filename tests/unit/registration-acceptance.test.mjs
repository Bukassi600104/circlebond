import assert from "node:assert/strict";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

for (const path of [
  "app/api/auth/email-otp/request/route.ts",
  "app/api/v1/auth/email-otp/request/route.ts",
]) {
  test(`${path} requires literal consent before issuing any registration challenge`, async () => {
    let issued = 0;
    const { POST } = await loadTypescriptModule(
      path,
      {
        "next/server": { NextResponse: Response },
        "@/server/auth/request": { clientKey: () => "test" },
        "@/server/auth/security": {
          validateEmailAddress: async (email) => email,
          normalizeDisplayName: (value) => value,
          enforceRateLimit: async () => true,
          createEmailOtpChallenge: () => {
            issued++;
            throw new Error("Should not issue challenge");
          },
        },
        "@/server/auth/email": {
          sendEmailOtp: async () => {
            throw new Error("Must not send");
          },
        },
        "@/server/audit": { recordAuthAudit() {} },
      },
      { process: { env: { NODE_ENV: "production" } } },
    );
    for (const flags of [
      [false, true],
      [true, false],
      ["false", "false"],
      [1, 1],
      [null, true],
    ]) {
      const response = await POST(
        new Request("https://example.test", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            email: "member@example.com",
            purpose: "register",
            displayName: "Ada Okafor",
            termsAccepted: flags[0],
            privacyAccepted: flags[1],
          }),
        }),
      );
      assert.equal(response.status, 400);
    }
    assert.equal(issued, 0);
  });
}

test("production integrity cannot report recognition without a verifier", async () => {
  const logs = [];
  for (const enabled of [undefined, "false", "true"]) {
    const { evaluatePlayIntegrity } = await loadTypescriptModule(
      "server/auth/integrity.ts",
      {
        "@/lib/logger": { logger: { warn: (...values) => logs.push(values) } },
      },
      {
        process: {
          env: { NODE_ENV: "production", PLAY_INTEGRITY_ENABLED: enabled },
        },
      },
    );
    const verdict = await evaluatePlayIntegrity("arbitrary-unverified-token");
    assert.equal(verdict.passed, false);
    assert.notEqual(verdict.verdict, "PLAY_RECOGNIZED");
  }
  assert.doesNotMatch(JSON.stringify(logs), /arbitrary-unverified-token/);
});

test("production critical notifications cannot fabricate a development delivery", async () => {
  let calls = 0;
  const { sendCriticalNotificationEmail } = await loadTypescriptModule(
    "server/notifications/email.ts",
    {
      "server-only": {},
      nodemailer: {
        default: {
          createTransport: () => {
            calls++;
            throw new Error("Must not create transport");
          },
        },
      },
    },
    {
      process: {
        env: { NODE_ENV: "production", AUTH_EMAIL_OTP_MODE: "development" },
      },
    },
  );
  await assert.rejects(
    sendCriticalNotificationEmail({
      to: "member@example.com",
      type: "receipt_submitted",
      title: "Receipt submitted",
      body: "An organizer can review it.",
      deepLink: "/account",
      idempotencyKey: "test",
    }),
    /not configured/,
  );
  assert.equal(calls, 0);
});
