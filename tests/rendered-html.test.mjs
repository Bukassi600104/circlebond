import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";

const port = 3099;
const baseUrl = `http://127.0.0.1:${port}`;

async function waitForServer(timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("BondCircle production server did not become ready in time.");
}

test("production server renders authentication screens, component library, and health contract", async () => {
  const server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", String(port)],
    {
      cwd: new URL("../", import.meta.url),
      stdio: "ignore",
      env: { ...process.env, NODE_ENV: "production" },
    },
  );

  try {
    await waitForServer();

    const page = await fetch(`${baseUrl}/sign-in`);
    assert.equal(page.status, 200);
    assert.match(page.headers.get("content-type") ?? "", /^text\/html\b/i);
    const html = await page.text();
    assert.match(html, /Sign in to your account/i);
    assert.match(html, /Continue with Google/i);
    assert.match(html, /Email address/i);
    assert.match(html, /Recover account/i);
    assert.match(html, /Stronger together/i);
    assert.doesNotMatch(html, /gender|bank details|payment-card/i);

    const register = await fetch(`${baseUrl}/register`);
    assert.equal(register.status, 200);
    const registerHtml = await register.text();
    assert.match(registerHtml, /Create your account/i);
    assert.match(registerHtml, /Display name/i);
    assert.match(registerHtml, /Terms of Service/i);
    assert.match(registerHtml, /Privacy Policy/i);
    assert.match(registerHtml, /profile image \(optional\)/i);

    const verify = await fetch(`${baseUrl}/verify`);
    assert.equal(verify.status, 200);
    const verifyHtml = await verify.text();
    assert.match(verifyHtml, /Verify your account/i);
    assert.match(verifyHtml, /Preparing verification/i);

    const protectedPage = await fetch(`${baseUrl}/account`, {
      redirect: "manual",
    });
    assert.equal(protectedPage.status, 307);
    assert.match(protectedPage.headers.get("location") ?? "", /\/sign-in/);

    const designSystem = await fetch(`${baseUrl}/design-system`);
    assert.equal(designSystem.status, 200);
    const designHtml = await designSystem.text();
    assert.match(designHtml, /Warm, trustworthy components/i);
    assert.match(designHtml, /Typography and actions/i);
    assert.match(designHtml, /Inputs and uploads/i);
    assert.match(designHtml, /Cards, members, and progress/i);
    assert.match(designHtml, /Communication and feedback/i);
    assert.match(designHtml, /Overlays and system states/i);
    assert.match(designHtml, /Responsive navigation/i);
    assert.match(designHtml, /aria-label="Primary navigation"/i);
    assert.match(designHtml, /role="progressbar"/i);
    assert.doesNotMatch(designHtml, /Your site is taking shape|codex-preview/i);

    const health = await fetch(`${baseUrl}/api/health`);
    const body = await health.json();
    assert.equal(body.application, "ok");
    if (body.firebase === "configured") {
      assert.equal(health.status, 200);
      assert.equal(body.sqlConnect, "configured");
    } else {
      assert.equal(health.status, 503);
      assert.equal(body.firebase, "not_configured");
      assert.equal(body.sqlConnect, "not_configured");
    }
  } finally {
    server.kill();
  }
});
