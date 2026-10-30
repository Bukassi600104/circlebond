import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { createWriteStream, existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createConnection } from "node:net";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

// Run only after the owner of the completed build hands off this checkout.
const root = process.cwd();
for (const name of [
  ".env",
  ".env.local",
  ".env.production",
  ".env.production.local",
]) {
  assert.equal(
    existsSync(resolve(root, name)),
    false,
    "Use a clean QA checkout without environment files",
  );
}
const base = new URL(process.env.BONDCIRCLE_QA_URL ?? "http://127.0.0.1:3100");
assert.ok(["127.0.0.1", "localhost"].includes(base.hostname));
assert.equal(base.protocol, "http:");
assert.ok(!base.username && !base.password && !base.search && !base.hash);
const dc = process.env.DATA_CONNECT_EMULATOR_HOST;
assert.match(dc ?? "", /^127\.0\.0\.1:\d+$/);
assert.equal(process.env.FIREBASE_AUTH_EMULATOR_HOST, "127.0.0.1:9099");
const portOpen = (port) =>
  new Promise((done) => {
    const socket = createConnection({ host: "127.0.0.1", port });
    socket.once("connect", () => {
      socket.destroy();
      done(true);
    });
    socket.once("error", () => done(false));
  });
assert.equal(
  await portOpen(Number(base.port)),
  false,
  "Refusing to replace another server",
);
assert.equal(
  await portOpen(9099),
  true,
  "Explicit local Auth emulator required",
);
assert.equal(
  await portOpen(Number(dc.split(":")[1])),
  true,
  "Explicit local Data Connect emulator required",
);
const { chromium } = await import(
  pathToFileURL(resolve(process.env.BONDCIRCLE_PLAYWRIGHT_PATH)).href
);
const { startSmtpSink } = await import(
  pathToFileURL(resolve(root, "tests/helpers/smtp-sink.mjs"))
);
const evidence = resolve(root, "tmp/launch-evidence/authenticated-browser");
await mkdir(evidence, { recursive: true });
const report = {
  commit: execFileSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf8",
  }).trim(),
  startedAt: new Date().toISOString(),
  scope:
    "Synthetic loopback Auth/DataConnect/SMTP, actual UI OTP exchange; no Storage/provider/device acceptance",
  checks: [],
};
const secrets = new Set();
function safe(message) {
  let value = String(message);
  for (const secret of secrets)
    if (secret) value = value.replaceAll(secret, "[redacted]");
  return value
    .replace(/\/invite\/[A-Za-z0-9_%.-]+/g, "/invite/[redacted]")
    .replace(/\b\d{6}\b/g, "[redacted]")
    .slice(0, 1200);
}
async function check(name, action) {
  try {
    await action();
    report.checks.push({ name, status: "PASS" });
    console.log(`PASS ${name}`);
  } catch (error) {
    report.checks.push({ name, status: "FAIL", error: safe(error.message) });
    throw error;
  }
}
const smtp = await startSmtpSink();
const env = {
  ...process.env,
  NODE_ENV: "production",
  FIREBASE_PROJECT_ID: "bond-circle",
  NEXT_PUBLIC_APP_URL: base.origin,
  AUTH_EMAIL_OTP_MODE: "production",
  AUTH_EMAIL_SMTP_URL: smtp.url,
  AUTH_EMAIL_FROM: "BondCircle QA <synthetic@example.test>",
  AUTH_CHALLENGE_SECRET:
    "local-qa-synthetic-only-secret-more-than-thirty-two-bytes",
  ACTIVATION_PAYMENT_PROVIDER: "",
};
for (const name of [
  "FIREBASE_PRIVATE_KEY",
  "FIREBASE_CLIENT_EMAIL",
  "GOOGLE_APPLICATION_CREDENTIALS",
  "FIREBASE_TOKEN",
  "PAYSTACK_SECRET_KEY",
])
  delete env[name];
const log = createWriteStream(resolve(evidence, "server.log"));
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "-p",
    base.port,
  ],
  { cwd: root, env, windowsHide: true },
);
server.stdout.pipe(log);
server.stderr.pipe(log);
let browser;
async function csrf(page) {
  const response = await page.request.get(new URL("/api/auth/csrf", base).href);
  assert.equal(response.status(), 200);
  const token = (await response.json()).csrfToken;
  secrets.add(token);
  return token;
}
async function post(page, path, data) {
  return page.request.post(new URL(path, base).href, {
    headers: { Origin: base.origin, "X-CSRF-Token": await csrf(page) },
    data,
  });
}
async function seed(email) {
  const response = await fetch(
    "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-api-key",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password: "Synthetic-local-password-123!",
        returnSecureToken: true,
      }),
    },
  );
  assert.equal(response.status, 200);
  const account = await response.json();
  secrets.add(account.idToken);
  secrets.add(account.refreshToken);
  return account.localId;
}
async function signIn(page, email, next, fromInvitation = false) {
  await seed(email);
  await page.goto(
    new URL(
      fromInvitation ? next : `/sign-in?next=${encodeURIComponent(next)}`,
      base,
    ).href,
  );
  if (fromInvitation) {
    await page.waitForURL("**/register?**");
    await page.getByRole("link", { name: "Sign in", exact: true }).click();
  }
  await page.getByLabel("Email address", { exact: true }).fill(email);
  const issued = page.waitForResponse(
    (response) =>
      response.url().endsWith("/api/auth/email-otp/request") &&
      response.request().method() === "POST",
  );
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  const response = await issued;
  assert.equal(response.status(), 202);
  const challenge = await response.json();
  secrets.add(challenge.challengeId);
  assert.equal(challenge.developmentCode, undefined);
  const code = smtp.takeCode(email);
  secrets.add(code);
  await page.waitForURL("**/verify?**");
  for (let index = 0; index < 6; index++)
    await page
      .getByLabel(`Digit ${index + 1} of 6`, { exact: true })
      .fill(code[index]);
  await page.waitForURL("**/legal/accept?**", { timeout: 30000 });
  assert.equal(new URL(page.url()).searchParams.get("next"), next);
  const before = await post(page, "/api/circles/gift", {});
  assert.equal(
    before.status(),
    403,
    "Persisted legal gate must precede circle creation",
  );
  await page.locator("#existing-terms-accepted").check();
  await page.locator("#existing-privacy-accepted").check();
  await page
    .getByRole("button", { name: "Accept & continue", exact: true })
    .click();
  await page.waitForURL((url) => url.pathname + url.search === next);
  const session = await page.request.get(
    new URL("/api/auth/session", base).href,
  );
  assert.equal(session.status(), 200);
  return (await session.json()).user.uid;
}

try {
  for (let attempt = 0; ; attempt++) {
    assert.ok(attempt < 120, "Local server readiness timed out");
    try {
      if ((await fetch(new URL("/sign-in", base))).ok) break;
    } catch {}
    await new Promise((done) => setTimeout(done, 250));
  }
  if (process.env.BONDCIRCLE_PUBLIC_HARNESS_PATH) {
    const child = spawn(
      process.execPath,
      [process.env.BONDCIRCLE_PUBLIC_HARNESS_PATH],
      {
        cwd: root,
        env: { ...env, BONDCIRCLE_QA_URL: base.href },
        windowsHide: true,
        stdio: "inherit",
      },
    );
    const exit = await new Promise((done, reject) => {
      child.once("error", reject);
      child.once("exit", (code) => done(code ?? 1));
    });
    report.checks.push({
      name: "separate public browser acceptance and lab harness",
      status: exit === 0 ? "PASS" : "FAIL",
    });
  }
  browser = await chromium.launch({
    executablePath:
      process.env.BONDCIRCLE_BROWSER_EXECUTABLE ?? chromium.executablePath(),
    headless: true,
  });
  report.browserVersion = browser.version();
  const organizer = await browser.newContext({
    viewport: { width: 390, height: 844 },
    serviceWorkers: "block",
    reducedMotion: "reduce",
    acceptDownloads: true,
  });
  const member = await browser.newContext({
    viewport: { width: 390, height: 844 },
    serviceWorkers: "block",
    reducedMotion: "reduce",
  });
  for (const context of [organizer, member])
    await context.route("**/*", (route) => {
      const url = new URL(route.request().url());
      return ["127.0.0.1", "localhost"].includes(url.hostname) ||
        !url.protocol.startsWith("http")
        ? route.continue()
        : route.abort();
    });
  const ownerPage = await organizer.newPage();
  const memberPage = await member.newPage();
  const suffix = Date.now();
  let ownerId;
  let memberId;
  let circleId;
  let invitationPath;
  await check(
    "fresh OTP sign-in requires persisted consent and preserves create continuation",
    async () => {
      ownerId = await signIn(
        ownerPage,
        `qa-organizer-${suffix}@example.com`,
        "/account/create?type=gift",
      );
      await ownerPage
        .getByRole("heading", { name: "Create a shared gift", exact: true })
        .waitFor();
    },
  );
  await check(
    "organizer creates and reloads a real Gift trial draft",
    async () => {
      const fields = {
        circleName: "Synthetic browser coordination",
        giftTitle: "Synthetic shared gift",
        targetAmount: "3000",
        deadline: new Date(Date.now() + 30 * 86400000)
          .toISOString()
          .slice(0, 10),
        memberCapacity: "3",
        description: "Synthetic local browser acceptance only.",
        paymentBankName: "Local Test Bank",
        paymentAccountName: "Synthetic Organizer",
        paymentAccountNumber: "0123456789",
      };
      for (const [name, value] of Object.entries(fields))
        await ownerPage.locator(`[name="${name}"]`).fill(value);
      await ownerPage
        .getByRole("button", { name: "Create Gift Circle", exact: true })
        .click();
      await ownerPage.waitForURL(/\/account\/circles\/[a-f0-9-]+/);
      circleId = new URL(ownerPage.url()).pathname.split("/").at(-1);
      await ownerPage
        .getByRole("heading", {
          name: "Your circle draft is safely saved",
          exact: true,
        })
        .waitFor();
      await ownerPage.reload();
      await ownerPage
        .getByText("Synthetic browser coordination", { exact: true })
        .first()
        .waitFor();
      await ownerPage.screenshot({
        path: resolve(evidence, "organizer-draft-390.png"),
        fullPage: true,
      });
    },
  );
  await check(
    "free trial activates through creator controls without a payment provider",
    async () => {
      const activated = ownerPage.waitForResponse(
        (response) =>
          response.url().endsWith(`/api/circles/${circleId}/activation`) &&
          response.request().method() === "POST",
      );
      await ownerPage.getByRole("button", { name: /^Activate for/ }).click();
      assert.equal((await activated).status(), 200);
      await ownerPage
        .getByRole("heading", {
          name: "Your circle draft is safely saved",
          exact: true,
        })
        .waitFor({ state: "hidden" });
      const invitation = await post(
        ownerPage,
        `/api/circles/${circleId}/invitations`,
        { mode: "open", maxUses: 1, expiresInDays: 7, requireApproval: false },
      );
      assert.equal(invitation.status(), 201);
      const link = (await invitation.json()).link;
      invitationPath = new URL(link).pathname;
      secrets.add(link);
      secrets.add(invitationPath.split("/").at(-1));
    },
  );
  await check(
    "new member preserves invitation through OTP and consent, then joins in browser",
    async () => {
      memberId = await signIn(
        memberPage,
        `qa-member-${suffix}@example.com`,
        invitationPath,
        true,
      );
      const privateBeforeJoin = await memberPage.request.get(
        new URL(`/api/v1/circles/${circleId}`, base).href,
      );
      assert.equal(privateBeforeJoin.status(), 404);
      await memberPage
        .getByRole("button", { name: "Accept and join", exact: true })
        .click();
      await memberPage.waitForURL(`**/account/circles/${circleId}`);
      await memberPage
        .getByText("Synthetic browser coordination", { exact: true })
        .first()
        .waitFor();
      assert.equal(
        (
          await memberPage.request.get(
            new URL(`/api/v1/circles/${circleId}`, base).href,
          )
        ).status(),
        200,
      );
      await memberPage.screenshot({
        path: resolve(evidence, "member-circle-390.png"),
        fullPage: true,
      });
    },
  );
  await check(
    "member cannot administer invitations or obtain organizer controls",
    async () => {
      const before = await ownerPage.request.get(
        new URL(`/api/circles/${circleId}/invitations`, base).href,
      );
      const count = (await before.json()).invitations.length;
      const denied = await post(
        memberPage,
        `/api/circles/${circleId}/invitations`,
        { mode: "open", maxUses: 1, expiresInDays: 7 },
      );
      assert.ok(denied.status() >= 400);
      const after = await ownerPage.request.get(
        new URL(`/api/circles/${circleId}/invitations`, base).href,
      );
      assert.equal((await after.json()).invitations.length, count);
      assert.equal(
        await memberPage
          .getByRole("heading", {
            name: "Your circle draft is safely saved",
            exact: true,
          })
          .count(),
        0,
      );
    },
  );
  await check(
    "profile updates persist and settings download only the caller's structured export",
    async () => {
      await ownerPage.goto(new URL("/account/profile", base).href);
      await ownerPage
        .getByLabel("Display name", { exact: true })
        .fill("Synthetic Browser Organizer");
      await ownerPage
        .getByRole("button", { name: "Save display name", exact: true })
        .click();
      await ownerPage
        .getByText("Display name updated.", { exact: true })
        .waitFor();
      await ownerPage.reload();
      assert.equal(
        await ownerPage
          .getByLabel("Display name", { exact: true })
          .inputValue(),
        "Synthetic Browser Organizer",
      );
      await ownerPage.goto(new URL("/account/settings", base).href);
      const pending = ownerPage.waitForEvent("download");
      await ownerPage
        .getByRole("button", { name: "Download account data", exact: true })
        .click();
      const download = await pending;
      const exported = JSON.parse(
        await readFile(await download.path(), "utf8"),
      );
      assert.equal(exported.format, "bondcircle-account-v1");
      assert.equal(exported.profile.id, ownerId);
      await download.delete();
      const selfScoped = await ownerPage.request.get(
        new URL(`/api/account/export?userId=${memberId}`, base).href,
      );
      assert.equal(selfScoped.status(), 200);
      assert.equal((await selfScoped.json()).profile.id, ownerId);
      await ownerPage.screenshot({
        path: resolve(evidence, "account-settings-390.png"),
        fullPage: true,
      });
    },
  );
  await check(
    "authenticated mobile screens do not overflow and logout ends the session",
    async () => {
      for (const page of [ownerPage, memberPage])
        assert.equal(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth + 1,
          ),
          true,
        );
      await ownerPage.goto(new URL("/account/profile", base).href);
      await ownerPage
        .getByRole("button", { name: "Log out", exact: true })
        .click();
      await ownerPage.waitForURL("**/sign-in");
      assert.equal(
        (
          await ownerPage.request.get(new URL("/api/auth/session", base).href)
        ).status(),
        401,
      );
    },
  );
} catch (error) {
  if (!report.checks.some((entry) => entry.status === "FAIL"))
    report.checks.push({
      name: "authenticated browser harness",
      status: "FAIL",
      error: safe(error.message),
    });
} finally {
  if (browser) await browser.close();
  const stopped = new Promise((done) => server.once("exit", done));
  server.kill();
  await Promise.race([stopped, new Promise((done) => setTimeout(done, 5000))]);
  await smtp.close();
  log.end();
  report.completedAt = new Date().toISOString();
  report.result = report.checks.some((entry) => entry.status === "FAIL")
    ? "FAIL"
    : "PASS";
  await writeFile(
    resolve(evidence, "report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  console.log(
    JSON.stringify({
      commit: report.commit,
      browser: report.browserVersion,
      result: report.result,
      passed: report.checks.filter((entry) => entry.status === "PASS").length,
      failed: report.checks.filter((entry) => entry.status === "FAIL").length,
      evidence: resolve(evidence, "report.json"),
    }),
  );
  if (report.result === "FAIL") process.exitCode = 1;
}
