import assert from "node:assert/strict";
import {
  createHash,
  createHmac,
  timingSafeEqual,
  randomUUID,
} from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { runInNewContext } from "node:vm";
import ts from "typescript";

async function loadModule(path, dependencies, env = {}) {
  const source = await readFile(
    new URL(`../../${path}`, import.meta.url),
    "utf8",
  );
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  });
  const exports = {};
  const logs = [];
  runInNewContext(outputText, {
    exports,
    require(id) {
      assert.ok(Object.hasOwn(dependencies, id), `Unexpected import: ${id}`);
      return dependencies[id];
    },
    process: { env },
    Buffer,
    Error,
    URL,
    console: { info: (...args) => logs.push(args) },
  });
  return { exports, logs };
}

async function mutationGuard() {
  const { exports } = await loadModule("server/auth/request.ts", {
    "node:crypto": { timingSafeEqual },
    "next/headers": {
      cookies: async () => ({ get: () => ({ value: "csrf" }) }),
    },
    "@/server/auth": { CSRF_COOKIE: "bc_csrf" },
  });
  return exports.assertTrustedMutation;
}

test("an unverified Bearer header cannot bypass session mutation protection", async () => {
  const assertTrustedMutation = await mutationGuard();
  const request = new Request("https://example.test/api/circles/gift", {
    headers: { authorization: "Bearer unverified" },
  });
  await assert.rejects(
    assertTrustedMutation(request),
    /Missing request origin/,
  );
  await assert.rejects(
    assertTrustedMutation(request, { scheme: "session", uid: "member" }),
    /Missing request origin/,
  );
  await assertTrustedMutation(request, { scheme: "bearer", uid: "member" });
});

test("web mutations require both a same-origin request and a matching CSRF token", async () => {
  const assertTrustedMutation = await mutationGuard();
  const headers = {
    origin: "https://example.test",
    host: "example.test",
    "sec-fetch-site": "same-origin",
    "x-csrf-token": "csrf",
  };
  await assertTrustedMutation(new Request("https://example.test", { headers }));
  for (const change of [
    { origin: "https://other.test" },
    { "sec-fetch-site": "cross-site" },
    { "x-csrf-token": "wrong" },
  ]) {
    await assert.rejects(
      assertTrustedMutation(
        new Request("https://example.test", {
          headers: { ...headers, ...change },
        }),
      ),
    );
  }
});

test("production OTP misconfiguration fails closed without sending or logging a code", async () => {
  let sent = 0;
  const { exports, logs } = await loadModule(
    "server/auth/email.ts",
    {
      nodemailer: {
        createTransport: () => ({ sendMail: async () => sent++ }),
      },
    },
    {
      NODE_ENV: "production",
      AUTH_EMAIL_OTP_MODE: "development",
      AUTH_EMAIL_SMTP_URL: "smtp://example.test",
      AUTH_EMAIL_FROM: "test@example.test",
    },
  );
  await assert.rejects(
    exports.sendEmailOtp({ email: "test@example.test", code: "123456" }),
    /not configured/,
  );
  assert.equal(sent, 0);
  assert.deepEqual(logs, []);
});

test("local OTP preview preserves its development response without credential logs", async () => {
  const { exports, logs } = await loadModule(
    "server/auth/email.ts",
    { nodemailer: {} },
    { NODE_ENV: "development", AUTH_EMAIL_OTP_MODE: "development" },
  );
  assert.equal(
    await exports.sendEmailOtp({ email: "test@example.test", code: "123456" }),
    "development",
  );
  assert.deepEqual(logs, []);
});

test("explicit production OTP configuration sends through the transport without logging credentials", async () => {
  let sent = 0;
  const { exports, logs } = await loadModule(
    "server/auth/email.ts",
    {
      nodemailer: { createTransport: () => ({ sendMail: async () => sent++ }) },
    },
    {
      NODE_ENV: "production",
      AUTH_EMAIL_OTP_MODE: "production",
      AUTH_EMAIL_SMTP_URL: "smtp://example.test",
      AUTH_EMAIL_FROM: "test@example.test",
    },
  );
  assert.equal(
    await exports.sendEmailOtp({ email: "test@example.test", code: "123456" }),
    "sent",
  );
  assert.equal(sent, 1);
  assert.deepEqual(logs, []);
});

test("private receipt access cannot cross viewer, circle, resource or expiry boundaries", async () => {
  const { exports } = await loadModule("server/uploads/private-access.ts", {
    "server-only": {},
    "node:crypto": { createHash, createHmac, timingSafeEqual },
  });
  const expected = {
    circleId: "circle",
    resourceId: "receipt",
    viewerId: "owner",
  };
  const token = exports.createPrivateFileAccess({ ...expected, now: 1_000 });
  assert.equal(exports.verifyPrivateFileAccess(token, expected, 1_001), true);
  for (const change of [
    { viewerId: "other-member" },
    { circleId: "other-circle" },
    { resourceId: "other-receipt" },
  ]) {
    assert.equal(
      exports.verifyPrivateFileAccess(token, { ...expected, ...change }, 1_001),
      false,
    );
  }
  assert.equal(
    exports.verifyPrivateFileAccess(token, expected, 301_000),
    false,
  );
  assert.equal(
    exports.verifyPrivateFileAccess(`${token}tampered`, expected, 1_001),
    false,
  );
});

test("contributors cannot review or view another member's receipt", async () => {
  const { exports } = await loadModule("server/contributions/engine.ts", {});
  assert.equal(exports.canReviewReceipts("member"), false);
  assert.equal(exports.canReviewReceipts("creator"), true);
  assert.equal(exports.canReviewReceipts("co_admin"), true);
  assert.equal(
    exports.canViewReceipt("uploader", "other-member", "member"),
    false,
  );
  assert.equal(exports.canViewReceipt("uploader", "uploader", "member"), true);
});

const nextResponse = {
  json(body, init) {
    const response = Response.json(body, init);
    response.cookies = { set() {} };
    return response;
  },
};

for (const [path, create] of [
  [
    "server/auth/security.ts",
    (exports) =>
      exports.createEmailOtpChallenge({
        email: "test@example.test",
        purpose: "sign-in",
      }),
  ],
  [
    "server/uploads/private-access.ts",
    (exports) =>
      exports.createPrivateFileAccess({
        circleId: "circle",
        resourceId: "receipt",
        viewerId: "member",
      }),
  ],
]) {
  test(`${path} requires 32 secret bytes in production and preserves local emulation`, async () => {
    const dependencies = {
      "server-only": {},
      "node:crypto": await import("node:crypto"),
      "node:dns/promises": {},
      "@/server/firebase/data-connect": {},
    };
    for (const secret of [undefined, "short", "é".repeat(15)]) {
      const { exports } = await loadModule(path, dependencies, {
        NODE_ENV: "production",
        AUTH_CHALLENGE_SECRET: secret,
      });
      assert.throws(() => create(exports), /at least 32 bytes/);
    }
    const { exports: production } = await loadModule(path, dependencies, {
      NODE_ENV: "production",
      AUTH_CHALLENGE_SECRET: "é".repeat(16),
    });
    assert.doesNotThrow(() => create(production));
    const { exports: development } = await loadModule(path, dependencies, {
      NODE_ENV: "development",
    });
    assert.doesNotThrow(() => create(development));
  });
}

test("an explicit weak private-file secret cannot fall back to a stronger auth secret", async () => {
  const { exports } = await loadModule(
    "server/uploads/private-access.ts",
    {
      "server-only": {},
      "node:crypto": { createHash, createHmac, timingSafeEqual },
    },
    {
      NODE_ENV: "production",
      PRIVATE_FILE_ACCESS_SECRET: "short",
      AUTH_CHALLENGE_SECRET: "x".repeat(32),
    },
  );
  assert.throws(
    () =>
      exports.createPrivateFileAccess({
        circleId: "circle",
        resourceId: "receipt",
        viewerId: "member",
      }),
    /at least 32 bytes/,
  );
});

for (const path of [
  "app/api/auth/email-otp/request/route.ts",
  "app/api/v1/auth/email-otp/request/route.ts",
]) {
  test(`${path} never publishes a development code in production`, async () => {
    let validation;
    const { exports } = await loadModule(
      path,
      {
        "next/server": { NextResponse: nextResponse },
        "@/server/auth/request": { clientKey: () => "test" },
        "@/server/auth/security": {
          validateEmailAddress: async (email, options) => {
            validation = options;
            return email;
          },
          normalizeDisplayName: (name) => name,
          enforceRateLimit: async () => true,
          createEmailOtpChallenge: () => ({
            challenge: { id: "test", expiresAt: 1 },
            challengeToken: "fixture",
            code: "123456",
          }),
          OTP_ATTEMPTS_COOKIE: "attempts",
          sealOtpAttempts: () => "fixture",
        },
        "@/server/auth/email": { sendEmailOtp: async () => "development" },
        "@/server/audit": { recordAuthAudit() {} },
      },
      { NODE_ENV: "production", AUTH_EMAIL_OTP_MODE: "development" },
    );
    const response = await exports.POST(
      new Request("https://example.test", {
        method: "POST",
        body: JSON.stringify({
          email: "test@example.test",
          purpose: "sign-in",
        }),
      }),
    );
    assert.equal(response.status, 202);
    assert.equal((await response.json()).developmentCode, undefined);
    assert.equal(validation.allowTestDomains, false);
    assert.equal(validation.checkDomain, true);
  });
}

test("SMTP exceptions are neither logged nor persisted as personal/provider detail", async () => {
  const logs = [];
  const writes = [];
  const recipient = {
    id: "member",
    displayName: "Member",
    email: "private@example.test",
    emailNotifications: true,
  };
  const { exports } = await loadModule("server/repositories/notifications.ts", {
    "server-only": {},
    "node:crypto": { randomUUID },
    "@/lib/logger": { logger: { error: (...args) => logs.push(args) } },
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => ({
        executeQuery: async (operation) => ({
          data:
            operation === "GetNotificationContext"
              ? {
                  circle: { id: "circle", name: "Circle", creator: recipient },
                  circleMemberships: [{ user: recipient, role: "member" }],
                }
              : { notifications: [] },
        }),
        executeMutation: async (operation, variables) => {
          writes.push({ operation, variables });
        },
      }),
    },
    "@/server/notifications/email": {
      sendCriticalNotificationEmail: async () => {
        throw new Error("SMTP private@example.test provider-secret 123456");
      },
    },
    "@/lib/circle-pricing": {},
    "@/server/pricing": {},
    "@/server/notifications/rules": {
      DEFAULT_NOTIFICATION_PREFERENCES: {},
      isNotificationAllowed: () => true,
      notificationCopy: () => ({ title: "Reminder", body: "Open the app" }),
      safeDeepLink: (path) => path,
      shouldSendEmail: () => true,
      maskEmail: () => "p***@example.test",
    },
  });
  await exports.emitCircleNotification({
    circleId: "circle",
    type: "deadline_approaching",
    entityId: "deadline",
  });
  const delivery = writes.find(
    ({ operation }) => operation === "CreateEmailDelivery",
  );
  assert.equal(delivery.variables.status, "failed");
  assert.equal(delivery.variables.failureReason, "EMAIL_DELIVERY_FAILED");
  assert.doesNotMatch(
    JSON.stringify({ logs, writes }),
    /private@example|provider-secret|123456/,
  );
});
