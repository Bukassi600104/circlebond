import assert from "node:assert/strict";
import * as crypto from "node:crypto";
import * as dns from "node:dns/promises";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const source = await readFile(
  new URL("../../server/auth/security.ts", import.meta.url),
  "utf8",
);

function limiter({ legacy = [], unavailable = false, corrupt = false } = {}) {
  const buckets = new Map();
  const logged = [];
  const db = {
    async executeQuery(operation, variables) {
      await new Promise((resolve) => setImmediate(resolve));
      if (unavailable) throw new Error("Database unavailable");
      if (operation === "GetRecentAbuseAttempts")
        return {
          data: {
            abuseAttempts: legacy.map((time) => ({
              occurredAt: new Date(time).toISOString(),
            })),
          },
        };
      assert.equal(operation, "GetRateLimitBucket");
      const bucket = buckets.get(variables.bucketKey);
      return { data: { rateLimitBucket: bucket ? { ...bucket } : null } };
    },
    async executeMutation(operation, variables) {
      await new Promise((resolve) => setImmediate(resolve));
      if (operation === "CreateRateLimitBucket") {
        if (buckets.has(variables.bucketKey))
          throw new Error("Duplicate bucket");
        buckets.set(variables.bucketKey, {
          revision: 0,
          attemptsJson: corrupt ? "bad JSON" : variables.attemptsJson,
        });
      } else if (operation === "CompareAndSetRateLimitBucket") {
        const bucket = buckets.get(variables.bucketKey);
        if (bucket.revision !== variables.revision)
          return { data: { updated: 0 } };
        buckets.set(variables.bucketKey, {
          revision: variables.nextRevision,
          attemptsJson: variables.attemptsJson,
        });
        return { data: { updated: 1 } };
      } else {
        assert.equal(operation, "RecordAbuseAttempt");
        logged.push(variables);
      }
      return { data: {} };
    },
  };
  const exports = {};
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  runInNewContext(outputText, {
    exports,
    require(id) {
      if (id === "node:crypto") return crypto;
      if (id === "node:dns/promises") return dns;
      assert.equal(id, "@/server/firebase/data-connect");
      return { getBondCircleDataConnect: () => db };
    },
    Buffer,
    process: { env: {} },
    setTimeout,
  });
  return { enforce: exports.enforceRateLimit, buckets, logged };
}

test("parallel requests cannot overrun a shared sliding-window budget", async () => {
  const { enforce, logged } = limiter();
  const accepted = await Promise.all(
    Array.from({ length: 20 }, () => enforce("same-client", 5, 60_000)),
  );
  assert.equal(accepted.filter(Boolean).length, 5);
  assert.equal(logged.length, 5);
  assert.equal(await enforce("same-client", 5, 60_000), false);
  assert.equal(await enforce("different-client", 5, 60_000), true);
});

test("first rollout retains the existing unexpired abuse-attempt budget", async () => {
  const { enforce } = limiter({ legacy: Array(5).fill(Date.now()) });
  assert.equal(await enforce("existing-client", 5, 60_000), false);
});

test("expired attempts leave room in the sliding window", async () => {
  const { enforce } = limiter({ legacy: Array(5).fill(Date.now() - 120_000) });
  assert.equal(await enforce("existing-client", 5, 60_000), true);
});

test("database outages and corrupt state fail closed", async () => {
  await assert.rejects(
    limiter({ unavailable: true }).enforce("client"),
    /Database unavailable/,
  );
  await assert.rejects(limiter({ corrupt: true }).enforce("client"));
});
