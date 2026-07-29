import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

test("state-changing requests require same-origin metadata and CSRF equality", async () => {
  const request = await source("server/auth/request.ts");
  assert.match(request, /sec-fetch-site/);
  assert.match(request, /x-forwarded-host/);
  assert.match(request, /Missing request origin/);
  assert.match(request, /x-csrf-token/);
  assert.match(request, /timingSafeEqual/);
});

test("abuse controls are durable and cover all high-risk public actions", async () => {
  const [
    security,
    schema,
    operations,
    session,
    otp,
    verify,
    invitations,
    receipts,
    comments,
  ] = await Promise.all([
    source("server/auth/security.ts"),
    source("dataconnect/schema/schema.gql"),
    source("dataconnect/bondcircle/queries.gql"),
    source("app/api/auth/session/route.ts"),
    source("app/api/auth/email-otp/request/route.ts"),
    source("app/api/auth/email-otp/verify/route.ts"),
    source("app/api/circles/[circleId]/invitations/route.ts"),
    source("app/api/circles/[circleId]/receipts/route.ts"),
    source("app/api/circles/[circleId]/comments/route.ts"),
  ]);
  assert.match(schema, /type AbuseAttempt @table/);
  assert.match(operations, /query GetRecentAbuseAttempts/);
  assert.match(operations, /mutation RecordAbuseAttempt/);
  assert.match(security, /executeQuery[\s\S]*GetRecentAbuseAttempts/);
  assert.doesNotMatch(security, /new Map<string, number\[\]>/);
  for (const route of [session, otp, verify, invitations, receipts, comments]) {
    assert.match(route, /await enforceRateLimit/);
  }
});

test("OTP challenges are encrypted, attempt-limited, and single-use", async () => {
  const [security, schema, operations, verify] = await Promise.all([
    source("server/auth/security.ts"),
    source("dataconnect/schema/schema.gql"),
    source("dataconnect/bondcircle/queries.gql"),
    source("app/api/auth/email-otp/verify/route.ts"),
  ]);
  assert.match(security, /aes-256-gcm/);
  assert.match(security, /timingSafeEqual/);
  assert.match(schema, /type ConsumedAuthChallenge @table/);
  assert.match(operations, /mutation ConsumeAuthChallenge/);
  assert.match(verify, /await consumeAuthChallenge/);
});

test("uploaded images are decoded, re-encoded, metadata-stripped, and bounded", async () => {
  const sanitizer = await source("server/uploads/images.ts");
  assert.match(sanitizer, /sharp/);
  assert.match(sanitizer, /limitInputPixels/);
  assert.match(sanitizer, /metadata\.format !== approved\.format/);
  assert.match(sanitizer, /\.rotate\(\)/);
  assert.match(sanitizer, /MAX_IMAGE_UPLOAD_BYTES/);
  assert.doesNotMatch(sanitizer, /keepMetadata|withMetadata/);
});

test("private receipt URLs expire and are bound to circle, resource, and viewer", async () => {
  const [access, repository, imageRoute, storageRules] = await Promise.all([
    source("server/uploads/private-access.ts"),
    source("server/repositories/contributions.ts"),
    source("app/api/circles/[circleId]/receipts/[receiptId]/image/route.ts"),
    source("storage.rules"),
  ]);
  assert.match(access, /5 \* 60 \* 1000/);
  assert.match(access, /createHmac/);
  assert.match(access, /timingSafeEqual/);
  assert.match(access, /payload\.viewerId === expected\.viewerId/);
  assert.match(repository, /createPrivateFileAccess/);
  assert.match(imageRoute, /verifyPrivateFileAccess/);
  assert.match(imageRoute, /status: 404/);
  assert.match(storageRules, /allow read, write: if false/);
});

test("production responses carry browser hardening headers", async () => {
  const config = await source("next.config.ts");
  for (const header of [
    "Content-Security-Policy",
    "Strict-Transport-Security",
    "Cross-Origin-Opener-Policy",
    "Cross-Origin-Resource-Policy",
    "X-Content-Type-Options",
    "Referrer-Policy",
  ]) {
    assert.match(config, new RegExp(header));
  }
  assert.match(config, /frame-ancestors 'none'/);
  assert.match(config, /object-src 'none'/);
});
