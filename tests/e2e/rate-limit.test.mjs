import assert from "node:assert/strict";
import * as crypto from "node:crypto";
import * as dns from "node:dns/promises";
import { getApps, initializeApp } from "firebase-admin/app";
import { getDataConnect } from "firebase-admin/data-connect";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

assert.match(
  process.env.DATA_CONNECT_EMULATOR_HOST ?? "",
  /^(127\.0\.0\.1|localhost):\d+$/,
  "Rate-limit E2E may only access a loopback emulator",
);
const app =
  getApps().find((candidate) => candidate.name === "rate-limit-e2e") ??
  initializeApp({ projectId: "bond-circle" }, "rate-limit-e2e");
const dataConnect = getDataConnect(
  {
    location: "europe-west2",
    serviceId: "bondcircle-service",
    connector: "bondcircle",
  },
  app,
);
const { enforceRateLimit } = await loadTypescriptModule(
  "server/auth/security.ts",
  {
    "node:crypto": crypto,
    "node:dns/promises": dns,
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => dataConnect,
    },
  },
);

test("actual database CAS permits only the configured parallel request budget", async () => {
  const key = `rate-e2e-${crypto.randomUUID()}`;
  const outcomes = await Promise.all(
    Array.from({ length: 12 }, () => enforceRateLimit(key, 3, 60_000)),
  );
  assert.equal(outcomes.filter(Boolean).length, 3);
  assert.equal(await enforceRateLimit(key, 3, 60_000), false);
  const bucketKey = crypto.createHash("sha256").update(key).digest("hex");
  const result = await dataConnect.executeQuery("GetRateLimitBucket", {
    bucketKey,
  });
  assert.equal(JSON.parse(result.data.rateLimitBucket.attemptsJson).length, 3);
  const history = await dataConnect.executeQuery("GetRecentAbuseAttempts", {
    bucketKey,
    since: new Date(Date.now() - 60_000).toISOString(),
  });
  assert.equal(history.data.abuseAttempts.length, 3);
});

test("existing abuse attempts remain enforced when the new bucket is first created", async () => {
  const key = `rate-migration-${crypto.randomUUID()}`;
  const bucketKey = crypto.createHash("sha256").update(key).digest("hex");
  for (let index = 0; index < 3; index++) {
    await dataConnect.executeMutation("RecordAbuseAttempt", {
      id: crypto.randomUUID(),
      bucketKey,
      occurredAt: new Date().toISOString(),
    });
  }
  assert.equal(await enforceRateLimit(key, 3, 60_000), false);
});
