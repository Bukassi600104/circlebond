import assert from "node:assert/strict";
import { execFileSync, spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { createWriteStream, existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createConnection } from "node:net";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  localAuthCsp,
  LOCAL_AUTH_ORIGIN,
} from "../tests/helpers/local-auth-csp.mjs";

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
const { startDnsSink, E2E_EMAIL_DOMAIN } = await import(
  pathToFileURL(resolve(root, "tests/helpers/dns-sink.mjs"))
);
const evidence = resolve(root, "tmp/launch-evidence/authenticated-browser");
await mkdir(evidence, { recursive: true });
const report = {
  commit: execFileSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf8",
  }).trim(),
  startedAt: new Date().toISOString(),
  scope:
    "Synthetic loopback Auth/DataConnect/SMTP/DNS, actual UI OTP exchange; no Storage/provider/device acceptance",
  checks: [],
  authNetwork: [],
  browserSecurity: [],
  createFormReadiness: [],
  localNetworkFixture: {
    permission: "local-network-access",
    origin: base.origin,
    scope:
      "Temporary authenticated browser contexts only; external requests remain blocked",
  },
  cspFixture: {
    scope:
      "Authenticated loopback document response headers only; production policy is unchanged and unaccepted by this fixture",
    addedConnectOrigin: LOCAL_AUTH_ORIGIN,
    modifiedDocuments: 0,
    redirectDocumentRefreshes: 0,
    originalPolicyHashes: [],
  },
};
const secrets = new Set();
function safe(message) {
  let value = String(message);
  for (const secret of secrets)
    if (secret) value = value.replaceAll(secret, "[redacted]");
  return value
    .replace(/https?:\/\/[^\s<>"')]+/g, (reference) => {
      try {
        const url = new URL(reference);
        return `${url.origin}${url.pathname}`;
      } catch {
        return "[url]";
      }
    })
    .replace(/\/invite\/[A-Za-z0-9_%.-]+/g, "/invite/[redacted]")
    .replace(
      /\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g,
      "[redacted-token]",
    )
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
const dns = await startDnsSink();
const env = {
  ...process.env,
  NODE_ENV: "production",
  FIREBASE_PROJECT_ID: "bond-circle",
  NEXT_PUBLIC_APP_URL: base.origin,
  AUTH_EMAIL_OTP_MODE: "production",
  AUTH_EMAIL_SMTP_URL: smtp.url,
  AUTH_EMAIL_FROM: `BondCircle QA <synthetic@${E2E_EMAIL_DOMAIN}>`,
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
    "--import",
    dns.preload,
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
function giftFields(title) {
  return {
    circleName: title,
    giftTitle: "Synthetic shared gift",
    targetAmount: "3000",
    deadline: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    memberCapacity: "3",
    description: "Synthetic local browser acceptance only.",
    paymentBankName: "Local Test Bank",
    paymentAccountName: "Synthetic Organizer",
    paymentAccountNumber: "0123456789",
  };
}
async function browserApi(page, path, options = {}) {
  const url = new URL(path, base);
  assert.equal(url.origin, base.origin);
  const result = await page.evaluate(
    async ({ path, options }) => {
      const headers = { ...options.headers };
      let body;
      if (options.multipart) {
        body = new FormData();
        for (const [key, value] of Object.entries(options.multipart))
          body.append(key, String(value));
      } else if (Object.hasOwn(options, "data")) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(options.data);
      }
      const response = await fetch(path, {
        method: options.method ?? "GET",
        headers,
        body,
        credentials: "same-origin",
        cache: "no-store",
      });
      return { status: response.status, body: await response.json() };
    },
    { path: url.pathname + url.search, options },
  );
  // Preserve the existing assertions while returning only actual browser HTTP values.
  return { status: () => result.status, json: async () => result.body };
}
async function csrf(page) {
  const response = await browserApi(page, "/api/auth/csrf");
  assert.equal(response.status(), 200);
  const token = (await response.json()).csrfToken;
  secrets.add(token);
  return token;
}
async function post(page, path, data) {
  return browserApi(page, path, {
    method: "POST",
    headers: { "X-CSRF-Token": await csrf(page) },
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
    await page.waitForURL(
      (url) =>
        url.pathname === "/sign-in" && url.searchParams.get("next") === next,
    );
    await page
      .getByRole("button", { name: "Continue", exact: true })
      .waitFor({ state: "visible" });
    assert.equal(new URL(page.url()).pathname, "/sign-in");
    assert.equal(new URL(page.url()).searchParams.get("next"), next);
    // Playwright routes only the first redirect URL; refresh this verified document for the local CSP fixture.
    const document = await page.reload();
    assert.equal(document.status(), 200);
    const connectPolicy = (await document.allHeaders())[
      "content-security-policy"
    ]
      .split(";")
      .find((directive) => /^\s*connect-src\s/.test(directive));
    assert.equal(
      connectPolicy.trim().split(/\s+/).includes(LOCAL_AUTH_ORIGIN),
      true,
    );
    assert.equal(new URL(page.url()).pathname, "/sign-in");
    assert.equal(new URL(page.url()).searchParams.get("next"), next);
    report.cspFixture.redirectDocumentRefreshes++;
  }
  await page
    .getByRole("button", { name: "Continue", exact: true })
    .waitFor({ state: "visible" });
  await page
    .getByRole("textbox", { name: "Email address", exact: true })
    .fill(email);
  const issued = page.waitForResponse(
    (response) =>
      response.url().endsWith("/api/auth/email-otp/request") &&
      response.request().method() === "POST",
  );
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  const response = await issued;
  assert.equal(response.status(), 202);
  assert.ok(
    dns.queries.some(
      ({ name, type }) => name === E2E_EMAIL_DOMAIN && type === 15,
    ),
  );
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
  const beforeCircles = await browserApi(
    page,
    new URL("/api/v1/circles", base).href,
  );
  if (!report.cookieTransportComparison) {
    const apiRequest = await page.request.get(
      new URL("/api/v1/circles", base).href,
    );
    report.cookieTransportComparison = {
      scope:
        "Read-only diagnostic; functional assertions use actual same-origin browser fetch",
      apiRequestStatus: apiRequest.status(),
      browserStatus: beforeCircles.status(),
    };
  }
  assert.equal(beforeCircles.status(), 200);
  const originalCircles = (await beforeCircles.json()).circles;
  assert.deepEqual(originalCircles, []);
  const before = await browserApi(
    page,
    new URL("/api/circles/gift", base).href,
    {
      method: "POST",
      headers: { "X-CSRF-Token": await csrf(page) },
      multipart: {
        ...giftFields("Consent gate negative"),
        pricingPlan: "starter",
        contributionMode: "equal",
      },
    },
  );
  assert.equal(
    before.status(),
    403,
    "Persisted legal gate must precede circle creation",
  );
  assert.equal((await before.json()).code, "LEGAL_ACCEPTANCE_REQUIRED");
  const afterCircles = await browserApi(
    page,
    new URL("/api/v1/circles", base).href,
  );
  assert.equal(afterCircles.status(), 200);
  assert.deepEqual((await afterCircles.json()).circles, originalCircles);
  await page.locator("#existing-terms-accepted").check();
  await page.locator("#existing-privacy-accepted").check();
  await page
    .getByRole("button", { name: "Accept & continue", exact: true })
    .click();
  await page.waitForURL((url) => url.pathname + url.search === next);
  const session = await browserApi(
    page,
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
  for (const context of [organizer, member]) {
    await context.grantPermissions(["local-network-access"], {
      origin: base.origin,
    });
    context.on("page", (page) => {
      page.on("console", (message) => {
        const value = message.text();
        if (
          /content security policy|cors|cross-origin|mixed content|local network|private network|net::ERR_/i.test(
            value,
          )
        )
          report.browserSecurity.push({
            type: message.type(),
            reason: safe(value),
          });
      });
    });
    context.on("response", (response) => {
      const url = new URL(response.url());
      if (url.pathname.startsWith("/api/auth/") || url.port === "9099")
        report.authNetwork.push({
          path: safe(url.pathname),
          host: url.host,
          status: response.status(),
        });
    });
    context.on("requestfailed", (request) => {
      const url = new URL(request.url());
      if (url.protocol.startsWith("http"))
        report.authNetwork.push({
          path: safe(url.pathname),
          host: url.host,
          failed: safe(request.failure()?.errorText ?? "request failed"),
        });
    });
    await context.route("**/*", async (route) => {
      const url = new URL(route.request().url());
      if (
        !["127.0.0.1", "localhost"].includes(url.hostname) &&
        url.protocol.startsWith("http")
      )
        return route.abort();
      if (route.request().isNavigationRequest() && url.origin === base.origin) {
        const response = await route.fetch({ maxRedirects: 0 });
        const headers = response.headers();
        const original = headers["content-security-policy"];
        const adjusted = localAuthCsp(original, base.origin);
        const hash = createHash("sha256").update(original).digest("hex");
        if (!report.cspFixture.originalPolicyHashes.includes(hash))
          report.cspFixture.originalPolicyHashes.push(hash);
        report.cspFixture.modifiedDocuments++;
        return route.fulfill({
          response,
          headers: { ...headers, "content-security-policy": adjusted },
        });
      }
      return route.continue();
    });
  }
  const ownerPage = await organizer.newPage();
  const memberPage = await member.newPage();
  const suffix = Date.now();
  let ownerId;
  let memberId;
  let circleId;
  let invitationPath;
  async function createGift(plan, title) {
    await ownerPage.goto(new URL("/account/create?type=gift", base).href);
    const form = ownerPage.locator("form").filter({
      has: ownerPage.getByRole("button", {
        name: "Create Gift Circle",
        exact: true,
      }),
    });
    const readiness = {
      plan,
      path: new URL(ownerPage.url()).pathname,
      type: new URL(ownerPage.url()).searchParams.get("type"),
      initialFormCount: await form.count(),
    };
    report.createFormReadiness.push(readiness);
    await form.waitFor({ state: "visible", timeout: 30000 });
    readiness.visibleFormCount = await form.count();
    assert.equal(readiness.visibleFormCount, 1);
    await form
      .locator(`label:has(input[name="pricingPlan"][value="${plan}"])`)
      .click();
    assert.equal(
      await form
        .locator(`input[name="pricingPlan"][value="${plan}"]`)
        .isChecked(),
      true,
    );
    const fields = giftFields(title);
    for (const [name, value] of Object.entries(fields))
      await form.locator(`[name="${name}"]`).fill(value);
    const pending = ownerPage.waitForResponse(
      (response) =>
        response.url().endsWith("/api/circles/gift") &&
        response.request().method() === "POST",
    );
    await form
      .getByRole("button", { name: "Create Gift Circle", exact: true })
      .click();
    const response = await pending;
    assert.equal(response.status(), 201);
    const created = await response.json();
    await ownerPage.waitForURL(`**/account/circles/${created.circleId}`);
    return created;
  }
  await check(
    "fresh OTP sign-in requires persisted consent and preserves create continuation",
    async () => {
      ownerId = await signIn(
        ownerPage,
        `qa-organizer-${suffix}@${E2E_EMAIL_DOMAIN}`,
        "/account/create?type=gift",
      );
      await ownerPage
        .getByRole("heading", { name: "Create a shared gift", exact: true })
        .waitFor();
    },
  );
  await check(
    "organizer saves and reloads a paid-tier Gift draft without starting checkout",
    async () => {
      const created = await createGift("starter", "Synthetic saved draft");
      assert.equal(created.activationStatus, "pending_payment");
      await ownerPage
        .getByRole("heading", {
          name: "Your circle draft is safely saved",
          exact: true,
        })
        .waitFor();
      await ownerPage.reload();
      await ownerPage
        .getByText("Synthetic saved draft", { exact: true })
        .first()
        .waitFor();
      await ownerPage.screenshot({
        path: resolve(evidence, "organizer-draft-390.png"),
        fullPage: true,
      });
    },
  );
  await check(
    "eligible free trial publishes through UI creation without a payment provider",
    async () => {
      const created = await createGift(
        "trial",
        "Synthetic browser coordination",
      );
      assert.equal(created.activationStatus, "active");
      circleId = created.circleId;
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
        `qa-member-${suffix}@${E2E_EMAIL_DOMAIN}`,
        invitationPath,
        true,
      );
      const privateBeforeJoin = await browserApi(
        memberPage,
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
          await browserApi(
            memberPage,
            new URL(`/api/v1/circles/${circleId}`, base).href,
          )
        ).status(),
        200,
      );
      await memberPage.screenshot({
        path: resolve(evidence, "member-circle-390.png"),
        fullPage: true,
      });
      const joinedMember = memberPage
        .locator(".bc-gift-members button")
        .filter({ hasText: `qa-member-${suffix}` });
      await joinedMember.waitFor({ state: "visible" });
      assert.match(
        await joinedMember.locator("small").textContent(),
        /^\s*₦\s*1,000\s+expected\s*$/,
        "Joined equal Gift members must receive their server-derived planned share.",
      );
      const retainedCreator = memberPage
        .locator(".bc-gift-members button")
        .filter({ hasText: `qa-organizer-${suffix}` });
      await retainedCreator.waitFor({ state: "visible" });
      assert.match(
        await retainedCreator.locator("small").textContent(),
        /^\s*₦\s*1,000\s+expected\s*$/,
        "The ordinary unupgraded Gift creator must retain the original planned share.",
      );
      report.equalGiftShares = {
        target: 3000,
        plannedCapacity: 3,
        joinedMemberExpected: 1000,
        retainedCreatorExpected: 1000,
        invitationAmountSupplied: false,
      };
    },
  );
  await check(
    "member cannot administer invitations or obtain organizer controls",
    async () => {
      const before = await browserApi(
        ownerPage,
        new URL(`/api/circles/${circleId}/invitations`, base).href,
      );
      const count = (await before.json()).invitations.length;
      const denied = await post(
        memberPage,
        `/api/circles/${circleId}/invitations`,
        { mode: "open", maxUses: 1, expiresInDays: 7 },
      );
      assert.equal(denied.status(), 400);
      const deniedRead = await browserApi(
        memberPage,
        new URL(`/api/circles/${circleId}/invitations`, base).href,
      );
      assert.equal(deniedRead.status(), 403);
      const after = await browserApi(
        ownerPage,
        new URL(`/api/circles/${circleId}/invitations`, base).href,
      );
      assert.equal((await after.json()).invitations.length, count);
      assert.equal(await memberPage.locator(".bc-invite-trigger").count(), 0);
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
        .getByRole("textbox", { name: "Display name", exact: true })
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
          .getByRole("textbox", { name: "Display name", exact: true })
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
      const selfScoped = await browserApi(
        ownerPage,
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
          await browserApi(ownerPage, new URL("/api/auth/session", base).href)
        ).status(),
        401,
      );
    },
  );
} catch (error) {
  if (browser) {
    report.failurePages = await Promise.all(
      browser
        .contexts()
        .flatMap((context) => context.pages())
        .map(async (page) => ({
          path: safe(new URL(page.url()).pathname),
          headings: (await page.locator("main h1").allTextContents()).map(safe),
          signInEmailHasValue:
            new URL(page.url()).pathname === "/sign-in"
              ? (
                  await page
                    .getByRole("textbox", {
                      name: "Email address",
                      exact: true,
                    })
                    .inputValue()
                ).length > 0
              : null,
          alerts: (await page.locator('[role="alert"]').allTextContents()).map(
            safe,
          ),
        })),
    );
  }
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
  await dns.close();
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
