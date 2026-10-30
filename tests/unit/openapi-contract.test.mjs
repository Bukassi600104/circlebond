import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import YAML from "yaml";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

const specification = YAML.parse(
  await readFile(new URL("../../docs/openapi.yaml", import.meta.url), "utf8"),
);
const pricing = await loadTypescriptModule("lib/circle-pricing.ts", {});
const { CIRCLE_STATES } = await loadTypescriptModule(
  "server/circles/engine.ts",
  { "../../lib/circle-pricing.ts": pricing },
);
const { apiJson } = await loadTypescriptModule("app/api/v1/_response.ts", {
  "next/server": { NextResponse: Response },
});

test("list and detail lifecycle responses conform to the documented status enum", async () => {
  const circles = CIRCLE_STATES.map((status, index) => ({
    id: `00000000-0000-4000-8000-${String(index + 1).padStart(12, "0")}`,
    name: "Synthetic circle",
    type: "gift",
    status,
    memberCount: 1,
    memberLimit: 3,
    role: "creator",
    createdByCurrentUser: true,
    createdAt: "2026-10-29T12:00:00.000Z",
    targetAmount: 10000,
    contributedAmount: 0,
  }));
  const dependencies = {
    "next/server": { NextResponse: Response },
    "@/app/api/v1/_response": { apiJson },
    "@/lib/logger": { logger: { error() {} } },
    "@/server/auth/native": {
      authenticateNativeRequest: async () => ({
        state: "authenticated",
        principal: { uid: "synthetic-owner" },
      }),
    },
    "@/server/repositories/dashboard": {
      loadDashboardCircles: async () => circles,
    },
  };
  const list = await loadTypescriptModule(
    "app/api/v1/circles/route.ts",
    dependencies,
  );
  const detail = await loadTypescriptModule(
    "app/api/v1/circles/[id]/route.ts",
    dependencies,
  );
  const allowed =
    specification.components.schemas.CircleSummary.properties.status.enum;
  const listed = await (
    await list.GET(new Request("https://example.test/api/v1/circles?limit=50"))
  ).json();
  assert.equal(listed.circles.length, CIRCLE_STATES.length);
  for (const circle of listed.circles) {
    assert.ok(
      allowed.includes(circle.status),
      `Undocumented list status: ${circle.status}`,
    );
    const response = await detail.GET(
      new Request(`https://example.test/api/v1/circles/${circle.id}`),
      { params: Promise.resolve({ id: circle.id }) },
    );
    const payload = await response.json();
    assert.ok(
      allowed.includes(payload.circle.status),
      `Undocumented detail status: ${payload.circle.status}`,
    );
  }
});

async function requestOtp({ limited = false, purpose = "sign-in" } = {}) {
  let sent = 0;
  const route = await loadTypescriptModule(
    "app/api/v1/auth/email-otp/request/route.ts",
    {
      "next/server": { NextResponse: Response },
      "@/app/api/v1/_response": { apiJson },
      "@/server/auth/request": { clientKey: () => "synthetic-ip" },
      "@/server/auth/security": {
        enforceRateLimit: async (key) =>
          !(limited && key.startsWith("otp-address:")),
        validateEmailAddress: async (value) => value,
        normalizeDisplayName: (value) => value,
        createEmailOtpChallenge: () => ({
          challenge: { id: "synthetic-id", expiresAt: Date.now() + 600000 },
          challengeToken: "synthetic-sealed-challenge",
          code: "123456",
        }),
      },
      "@/server/auth/email": {
        sendEmailOtp: async () => {
          sent++;
          return "sent";
        },
      },
      "@/server/audit": { recordAuthAudit() {} },
    },
    {
      process: {
        env: { NODE_ENV: "production", AUTH_EMAIL_OTP_MODE: "production" },
      },
    },
  );
  const response = await route.POST(
    new Request("https://example.test/api/v1/auth/email-otp/request", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "synthetic@example.test", purpose }),
    }),
  );
  return { response, payload: await response.json(), sent };
}

test("issued OTP expiry is documented as integer Unix milliseconds", async () => {
  const { response, payload, sent } = await requestOtp();
  assert.equal(response.status, 202);
  assert.equal(sent, 1);
  assert.equal(Number.isSafeInteger(payload.expiresAt), true);
  assert.equal(
    specification.components.schemas.EmailOtpResponse.properties.expiresAt.type,
    "integer",
  );
  assert.equal(payload.developmentCode, undefined);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("throttled OTP202 response satisfies its schema without fabricating a delivery", async () => {
  const { response, payload, sent } = await requestOtp({ limited: true });
  assert.equal(response.status, 202);
  assert.equal(sent, 0);
  assert.equal(payload.challengeId, undefined);
  assert.equal(payload.expiresAt, undefined);
  for (const required of specification.components.schemas.EmailOtpResponse
    .required) {
    assert.ok(
      Object.hasOwn(payload, required),
      `Throttled202 lacks required field: ${required}`,
    );
  }
});

test("OTP request rejects an undocumented purpose before generating or delivering a code", async () => {
  const { response, sent } = await requestOtp({
    purpose: "unsupported-purpose",
  });
  assert.equal(response.status, 400);
  assert.equal(sent, 0);
});
