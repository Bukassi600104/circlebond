import assert from "node:assert/strict";
import { timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const route = await readFile(
  new URL(
    "../../app/api/jobs/notifications/deadlines/route.ts",
    import.meta.url,
  ),
  "utf8",
);

function loadRoute(secret, processDeadlineNotifications) {
  const logged = [];
  const exports = {};
  const dependencies = {
    "node:crypto": { timingSafeEqual },
    "next/server": { NextResponse: Response },
    "@/lib/logger": { logger: { error: (...args) => logged.push(args) } },
    "@/server/repositories/notifications": { processDeadlineNotifications },
  };
  const { outputText } = ts.transpileModule(route, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  runInNewContext(outputText, {
    exports,
    require: (id) => {
      assert.ok(Object.hasOwn(dependencies, id), `Unexpected import: ${id}`);
      return dependencies[id];
    },
    process: { env: { CRON_SECRET: secret } },
    Buffer,
  });
  return { GET: exports.GET, logged };
}

test("deadline job rejects missing, incorrect and unconfigured secrets before processing", async () => {
  let calls = 0;
  for (const [secret, authorization] of [
    [undefined, "Bearer secret"],
    ["secret", undefined],
    ["secret", "Bearer wrong"],
    ["secret", "Bearer longer-wrong-secret"],
    ["secret", "Basic secret"],
  ]) {
    const { GET } = loadRoute(secret, async () => calls++);
    const headers = authorization ? { authorization } : {};
    const response = await GET(
      new Request("https://example.test/job", { headers }),
    );
    assert.equal(response.status, 401);
  }
  assert.equal(calls, 0);
});

test("authorized deadline job returns the actual processing result", async () => {
  let calls = 0;
  const { GET } = loadRoute("secret", async () => {
    calls++;
    return { processed: 3 };
  });
  const response = await GET(
    new Request("https://example.test/job", {
      headers: { authorization: "Bearer secret" },
    }),
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { processed: 3 });
  assert.equal(calls, 1);
});

test("deadline failure returns a retryable failure and logs no provider or customer details", async () => {
  const { GET, logged } = loadRoute("secret", async () => {
    throw new Error("sensitive provider or customer detail");
  });
  const response = await GET(
    new Request("https://example.test/job", {
      headers: { authorization: "Bearer secret" },
    }),
  );
  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), {
    error: "Deadline notifications could not be processed.",
  });
  assert.deepEqual(logged, [["deadline_notification_job_failed"]]);
});
