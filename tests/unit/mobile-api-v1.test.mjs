import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("Phase 1: /api/v1 endpoints provide mobile parity with authorization & redaction", async () => {
  const circlesRoute = await source("app/api/v1/circles/route.ts");
  const meRoute = await source("app/api/v1/me/route.ts");
  const pushRoute = await source("app/api/v1/devices/push-token/route.ts");
  const otpRequestRoute = await source("app/api/v1/auth/email-otp/request/route.ts");
  const otpVerifyRoute = await source("app/api/v1/auth/email-otp/verify/route.ts");

  assert.match(circlesRoute, /authenticatePrincipal/);
  assert.match(circlesRoute, /loadDashboardCircles/);
  assert.match(meRoute, /authenticatePrincipal/);
  assert.match(meRoute, /fetchUserBootstrapProfile/);
  assert.match(pushRoute, /authenticatePrincipal/);
  assert.match(pushRoute, /fcm_device_token_registered/);
  assert.match(otpRequestRoute, /createEmailOtpChallenge/);
  assert.match(otpVerifyRoute, /createCustomToken/);
});
