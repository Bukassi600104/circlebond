import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../", import.meta.url);
const source = (path) => readFile(new URL(path, root), "utf8");

test("production exposes deliberate crawler metadata without indexing private routes", async () => {
  const [robots, sitemap, layout] = await Promise.all([
    source("app/robots.ts"),
    source("app/sitemap.ts"),
    source("app/layout.tsx"),
  ]);

  assert.match(robots, /disallow:[\s\S]*"\/account\/"/);
  assert.match(robots, /disallow:[\s\S]*"\/owner\/"/);
  assert.match(robots, /disallow:[\s\S]*"\/api\/"/);
  assert.match(robots, /sitemap:/);
  assert.match(sitemap, /\/legal\/terms/);
  assert.match(sitemap, /\/legal\/privacy/);
  assert.match(layout, /metadataBase/);
});

test("production telemetry is opt-in and strips sensitive URL data", async () => {
  const [layout, observability, environment] = await Promise.all([
    source("app/layout.tsx"),
    source("components/observability/ProductionObservability.tsx"),
    source(".env.production.example"),
  ]);

  assert.match(layout, /<ProductionObservability\s*\/>/);
  assert.match(observability, /NEXT_PUBLIC_ENABLE_ANALYTICS === "true"/);
  assert.match(observability, /NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS === "true"/);
  assert.match(observability, /url\.search = ""/);
  assert.match(observability, /url\.hash = ""/);
  assert.match(observability, /\/invite\/\[token\]/);
  assert.match(observability, /\/account\/circles\/\[circleId\]/);
  assert.match(environment, /NEXT_PUBLIC_ENABLE_ANALYTICS=false/);
  assert.match(environment, /NEXT_PUBLIC_ENABLE_SPEED_INSIGHTS=false/);
});

test("unhandled server errors are logged without messages, stacks, or raw request paths", async () => {
  const instrumentation = await source("instrumentation.ts");

  assert.match(instrumentation, /onRequestError/);
  assert.match(instrumentation, /errorContext\.routePath/);
  assert.doesNotMatch(instrumentation, /errorRequest\.path/);
  assert.doesNotMatch(instrumentation, /error\.message|error\.stack/);
});

test("public legal URLs render the reviewed document surface rather than redirecting registration", async () => {
  const [terms, privacy] = await Promise.all([
    source("app/legal/terms/page.tsx"),
    source("app/legal/privacy/page.tsx"),
  ]);

  for (const page of [terms, privacy]) {
    assert.match(page, /LegalDocumentPage/);
    assert.doesNotMatch(page, /redirect\(/);
  }
});

test("Milestone 17 has a repeatable live verification command and incident runbook", async () => {
  const [packageJson, verifier, runbook] = await Promise.all([
    source("package.json"),
    source("scripts/verify-production.mjs"),
    source("docs/PRODUCTION_RUNBOOK_M17.md"),
  ]);

  assert.match(packageJson, /"verify:production"/);
  assert.match(verifier, /\/api\/health/);
  assert.match(verifier, /Strict-Transport-Security/i);
  assert.match(verifier, /Content-Security-Policy/i);
  assert.match(verifier, /storage\/v1\/b/);
  assert.match(runbook, /backup/i);
  assert.match(runbook, /rollback/i);
  assert.match(runbook, /incident/i);
  assert.match(runbook, /must be supplied by the owner/i);
});
