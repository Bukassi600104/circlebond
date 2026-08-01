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

test("approved production telemetry stays off locally and strips sensitive URL data", async () => {
  const [layout, observability, privacy] = await Promise.all([
    source("app/layout.tsx"),
    source("components/observability/ProductionObservability.tsx"),
    source("components/legal/legalDocuments.ts"),
  ]);

  assert.match(layout, /<ProductionObservability\s*\/>/);
  assert.match(observability, /NODE_ENV === "production"/);
  assert.match(observability, /<Analytics/);
  assert.match(observability, /<SpeedInsights/);
  assert.match(observability, /url\.search = ""/);
  assert.match(observability, /url\.hash = ""/);
  assert.match(observability, /\/invite\/\[token\]/);
  assert.match(observability, /\/account\/circles\/\[circleId\]/);
  assert.match(privacy, /Vercel Web Analytics and Speed Insights/);
  assert.match(privacy, /removes query strings, URL fragments/);
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

test("Milestone 18 records live monitoring, critical defects and honest completion gates", async () => {
  const postLaunch = await source("docs/POST_LAUNCH_VERIFICATION_M18.md");

  for (const signal of [
    "Registration completion",
    "Circle creation",
    "Invitation acceptance",
    "Receipt submission",
    "Notification delivery",
    "Page performance",
    "Retention and backups",
    "User-reported confusion",
  ]) {
    assert.match(postLaunch, new RegExp(signal, "i"));
  }
  assert.match(postLaunch, /empty Gift Circle profile slot/i);
  assert.match(postLaunch, /Firebase production Storage bucket returns `404`/i);
  assert.match(postLaunch, /must not be marked complete/i);
  assert.match(postLaunch, /Version 1\.1/i);
});

test("Milestones 17 and 18 have a published release ledger with explicit external gates", async () => {
  const [readme, ledger] = await Promise.all([
    source("README.md"),
    source("docs/RELEASE_CLOSEOUT_M17_M18.md"),
  ]);

  assert.match(readme, /Milestones 17–18 closeout ledger/);
  assert.match(ledger, /87f6170da1504f38cc52fd53b839456fd8175e10/);
  assert.match(ledger, /GR84PGhLeYHpK5UNyyHuiQoQeGyx/);
  assert.match(ledger, /One Google billing dependency/);
  assert.match(ledger, /owner acceptance still required/i);
  assert.match(
    ledger,
    /Only then may the 18-milestone goal be marked achieved/i,
  );
});
