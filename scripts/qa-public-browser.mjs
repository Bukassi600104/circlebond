import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const base = new URL(process.env.BONDCIRCLE_QA_URL ?? "http://127.0.0.1:3100");
assert.ok(
  ["localhost", "127.0.0.1", "[::1]"].includes(base.hostname),
  "This QA script only accepts a local server.",
);
assert.ok(!base.username && !base.password && !base.search && !base.hash);
const modulePath = process.env.BONDCIRCLE_PLAYWRIGHT_PATH;
assert.ok(
  modulePath,
  "Set BONDCIRCLE_PLAYWRIGHT_PATH to installed Playwright.",
);
const { chromium } = await import(pathToFileURL(resolve(modulePath)).href);
const output = resolve("tmp/launch-evidence/public-browser");
await mkdir(output, { recursive: true });
const git = (...args) =>
  execFileSync("git", args, { encoding: "utf8", windowsHide: true }).trim();
const report = {
  measuredAt: new Date().toISOString(),
  commit: git("rev-parse", "HEAD"),
  trackedClean: git("diff", "--name-only", "HEAD") === "",
  baseUrl: base.origin,
  scope:
    "Local Chromium public pages and explicitly mocked OTP delivery. No real provider, authenticated customer journey, physical device or field performance result.",
  budgets: { lcpMs: 2500, cls: 0.1, interactionMs: 200, warmApiP95Ms: 800 },
  checks: [],
  layouts: [],
  performance: [],
  blockedExternalRequestCount: 0,
};
const browser = await chromium.launch({
  executablePath:
    process.env.BONDCIRCLE_BROWSER_EXECUTABLE ?? chromium.executablePath(),
  headless: true,
});
report.browserVersion = browser.version();
async function localContext(options) {
  const context = await browser.newContext(options);
  await context.route("**/*", (route) => {
    const url = new URL(route.request().url());
    if (
      ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) ||
      !url.protocol.startsWith("http")
    )
      return route.continue();
    report.blockedExternalRequestCount++;
    return route.abort();
  });
  return context;
}
async function check(name, run) {
  try {
    await run();
    report.checks.push({ name, status: "PASS" });
  } catch (error) {
    report.checks.push({
      name,
      status: "FAIL",
      // Assertions contain only synthetic public-page values.
      error: String(error.message).slice(0, 700),
    });
  }
}
async function ready(page, path) {
  const response = await page.goto(new URL(path, base).href, {
    waitUntil: "load",
    timeout: 30_000,
  });
  assert.ok(response?.ok(), `Public page returned ${response?.status()}`);
  await page.locator("main").waitFor();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise((done) =>
      requestAnimationFrame(() => requestAnimationFrame(done)),
    );
  });
}

try {
  await check("candidate has no tracked changes", () =>
    assert.equal(report.trackedClean, true),
  );
  const paths = [
    "/onboarding",
    "/sign-in",
    "/register",
    "/account-recovery",
    "/legal/terms",
    "/legal/privacy",
  ];
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 768, height: 1024 },
    { width: 1280, height: 900 },
    { width: 844, height: 390 },
  ]) {
    const context = await localContext({
      viewport,
      reducedMotion: "reduce",
      serviceWorkers: "block",
    });
    const page = await context.newPage();
    for (const path of paths) {
      await check(
        `${viewport.width}x${viewport.height} ${path} layout`,
        async () => {
          await ready(page, path);
          const state = await page.evaluate(() => ({
            width: innerWidth,
            documentWidth: document.documentElement.scrollWidth,
            mainCount: document.querySelectorAll("main").length,
            headingCount: document.querySelectorAll("h1").length,
          }));
          const screenshot = `${path.slice(1).replaceAll("/", "-")}-${viewport.width}x${viewport.height}.png`;
          await page.screenshot({
            path: resolve(output, screenshot),
            fullPage: true,
          });
          report.layouts.push({ path, viewport, ...state, screenshot });
          assert.ok(
            state.documentWidth <= state.width + 1,
            "Horizontal page overflow",
          );
          assert.equal(state.mainCount, 1, "Expected one main landmark");
          assert.equal(state.headingCount, 1, "Expected one primary heading");
        },
      );
    }
    await context.close();
  }

  const context = await localContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
    serviceWorkers: "block",
  });
  const page = await context.newPage();
  await check(
    "onboarding advances through three approved modes and returns",
    async () => {
      await ready(page, "/onboarding");
      await page.getByRole("button", { name: "Next", exact: true }).click();
      await page
        .getByRole("heading", { name: "Organize Aso-Ebi", exact: true })
        .waitFor();
      await page.getByRole("button", { name: "Next", exact: true }).click();
      await page
        .getByRole("heading", { name: "Support that feels human", exact: true })
        .waitFor();
      await page.getByRole("button", { name: "Back", exact: true }).click();
      await page
        .getByRole("heading", { name: "Organize Aso-Ebi", exact: true })
        .waitFor();
      await page.getByRole("button", { name: "Skip", exact: true }).click();
      await page.waitForURL("**/sign-in");
      assert.equal(
        await page.evaluate(() =>
          localStorage.getItem("bc-onboarding-complete"),
        ),
        "true",
      );
    },
  );
  await check(
    "legal dialog traps keyboard focus, closes with Escape and restores focus",
    async () => {
      await ready(page, "/register");
      const trigger = page.getByRole("button", {
        name: "Terms of Service",
        exact: true,
      });
      await trigger.click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor();
      assert.equal(
        await dialog.evaluate((element) => element.matches(":modal")),
        true,
      );
      const backgroundField = page.getByRole("textbox", {
        name: "Display name",
        exact: true,
      });
      await backgroundField.evaluate((element) => element.focus());
      assert.equal(
        await backgroundField.evaluate(
          (element) => element === document.activeElement,
        ),
        false,
      );
      // Native dialogs can move focus to browser chrome; background DOM controls remain inert.
      for (let index = 0; index < 18; index++) {
        await page.keyboard.press("Tab");
        assert.equal(
          await dialog.evaluate(
            (element) =>
              element.contains(document.activeElement) || !document.hasFocus(),
          ),
          true,
        );
      }
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "hidden" });
      await page.waitForFunction(
        (element) => element === document.activeElement,
        await trigger.elementHandle(),
        { timeout: 2000 },
      );
      assert.equal(
        await trigger.evaluate((element) => element === document.activeElement),
        true,
      );
    },
  );
  await check(
    "registration rejects absent consent before a network mutation",
    async () => {
      await ready(page, "/register");
      let mutations = 0;
      const handler = async (route) => {
        mutations++;
        await route.abort();
      };
      await page.route("**/api/auth/email-otp/request", handler);
      await page
        .getByRole("textbox", { name: "Display name", exact: true })
        .fill("Synthetic Organizer");
      await page
        .getByRole("textbox", { name: "Email address", exact: true })
        .fill("synthetic@example.test");
      await page
        .getByRole("button", { name: "Create account", exact: true })
        .click();
      await page
        .getByRole("alert")
        .filter({ hasText: "Accept the Terms and Privacy Policy to continue." })
        .waitFor();
      assert.equal(mutations, 0);
      await page.unroute("**/api/auth/email-otp/request", handler);
    },
  );
  await check(
    "email delivery error preserves input and allows correction",
    async () => {
      await ready(page, "/sign-in");
      const handler = (route) =>
        route.fulfill({
          status: 503,
          contentType: "application/json",
          body: JSON.stringify({
            error: "Synthetic delivery outage. Try again.",
          }),
        });
      await page.route("**/api/auth/email-otp/request", handler);
      const email = page.getByRole("textbox", {
        name: "Email address",
        exact: true,
      });
      await email.fill("synthetic@example.test");
      await page.getByRole("button", { name: "Continue", exact: true }).click();
      await page
        .getByRole("alert")
        .filter({ hasText: "Synthetic delivery outage. Try again." })
        .waitFor();
      assert.equal(await email.inputValue(), "synthetic@example.test");
      assert.equal(new URL(page.url()).pathname, "/sign-in");
      assert.equal(
        await page
          .getByRole("button", { name: "Continue", exact: true })
          .isEnabled(),
        true,
      );
      await page.unroute("**/api/auth/email-otp/request", handler);
    },
  );
  await check(
    "invitation continuation survives sign-in and registration links",
    async () => {
      const next = "/invite/synthetic-only-token";
      await ready(page, `/sign-in?next=${encodeURIComponent(next)}`);
      await page.getByRole("link", { name: "Create one", exact: true }).click();
      await page.waitForURL("**/register?**");
      assert.equal(new URL(page.url()).searchParams.get("next"), next);
      await page.getByRole("link", { name: "Sign in", exact: true }).click();
      await page.waitForURL("**/sign-in?**");
      assert.equal(new URL(page.url()).searchParams.get("next"), next);
    },
  );
  await check(
    "invitation continuation survives account recovery to verification (mock delivery)",
    async () => {
      const next = "/invite/synthetic-only-token";
      await ready(page, `/sign-in?next=${encodeURIComponent(next)}`);
      await page
        .getByRole("link", { name: "Recover account", exact: true })
        .click();
      await page.waitForURL("**/account-recovery?**");
      const handler = (route) =>
        route.fulfill({
          status: 202,
          contentType: "application/json",
          body: JSON.stringify({
            challengeId: "synthetic-challenge",
            expiresAt: Date.now() + 600000,
          }),
        });
      await page.route("**/api/auth/email-otp/request", handler);
      await page
        .getByRole("textbox", { name: "Email address", exact: true })
        .fill("synthetic@example.test");
      await page
        .getByRole("button", { name: "Send recovery code", exact: true })
        .click();
      await page.waitForURL("**/verify?**");
      assert.equal(new URL(page.url()).searchParams.get("next"), next);
      await page.unroute("**/api/auth/email-otp/request", handler);
    },
  );
  await check(
    "unauthenticated account and owner routes return to sign-in",
    async () => {
      for (const path of ["/account", "/owner"]) {
        await page.goto(new URL(path, base).href, { waitUntil: "load" });
        assert.equal(new URL(page.url()).pathname, "/sign-in");
      }
    },
  );
  await context.close();

  // These are three controlled local lab samples per public route, not field p75.
  for (const path of ["/sign-in", "/onboarding"]) {
    for (let sample = 1; sample <= 3; sample++) {
      const perfContext = await localContext({
        viewport: { width: 390, height: 844 },
        serviceWorkers: "block",
      });
      const perfPage = await perfContext.newPage();
      const cdp = await perfContext.newCDPSession(perfPage);
      await cdp.send("Network.enable");
      await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 150,
        downloadThroughput: 1_600_000 / 8,
        uploadThroughput: 750_000 / 8,
      });
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      await perfPage.addInitScript(() => {
        window.__bondcircleLab = { lcpMs: null, cls: 0 };
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries())
            window.__bondcircleLab.lcpMs = entry.startTime;
        }).observe({ type: "largest-contentful-paint", buffered: true });
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries())
            if (!entry.hadRecentInput)
              window.__bondcircleLab.cls += entry.value;
        }).observe({ type: "layout-shift", buffered: true });
      });
      await check(`${path} slow-network lab sample ${sample}`, async () => {
        await ready(perfPage, path);
        const metrics = await perfPage.evaluate(() => ({
          ...window.__bondcircleLab,
          durationMs: performance.now(),
        }));
        if (path === "/onboarding") {
          metrics.interactionMs = await perfPage.evaluate(
            () =>
              new Promise((done, reject) => {
                const start = performance.now();
                const heading = document.querySelector("h1");
                const observer = new MutationObserver(() => {
                  if (heading.textContent === "Organize Aso-Ebi") {
                    observer.disconnect();
                    requestAnimationFrame(() =>
                      requestAnimationFrame(() =>
                        done(performance.now() - start),
                      ),
                    );
                  }
                });
                observer.observe(heading, {
                  childList: true,
                  characterData: true,
                  subtree: true,
                });
                [...document.querySelectorAll("button")]
                  .find((button) => button.textContent === "Next")
                  .click();
                setTimeout(() => {
                  observer.disconnect();
                  reject(new Error("Onboarding did not respond within 2s"));
                }, 2000);
              }),
          );
        }
        report.performance.push({
          path,
          sample,
          profile: "150ms/1.6Mbps down/750kbps up/4x CPU",
          ...metrics,
        });
        assert.ok(metrics.lcpMs !== null, "LCP measurement unavailable");
        assert.ok(
          metrics.lcpMs <= report.budgets.lcpMs,
          `LCP ${metrics.lcpMs.toFixed(1)}ms exceeds budget`,
        );
        assert.ok(
          metrics.cls <= report.budgets.cls,
          `CLS ${metrics.cls} exceeds budget`,
        );
        if (metrics.interactionMs !== undefined)
          assert.ok(
            metrics.interactionMs <= report.budgets.interactionMs,
            `Controlled next-screen latency ${metrics.interactionMs.toFixed(1)}ms exceeds budget`,
          );
      });
      await perfContext.close();
    }
  }
  await check("unauthenticated session GET warm local API p95", async () => {
    const samples = [];
    for (let index = 0; index < 21; index++) {
      const started = performance.now();
      const response = await fetch(new URL("/api/auth/session", base));
      assert.equal(response.status, 401);
      await response.arrayBuffer();
      if (index > 0) samples.push(performance.now() - started);
    }
    samples.sort((a, b) => a - b);
    const p95Ms = samples[Math.ceil(samples.length * 0.95) - 1];
    report.performance.push({
      path: "/api/auth/session",
      auth: "unauthenticated",
      samples: samples.length,
      p95Ms,
    });
    assert.ok(
      p95Ms <= report.budgets.warmApiP95Ms,
      `p95 ${p95Ms.toFixed(1)}ms exceeds budget`,
    );
  });
} catch (error) {
  report.checks.push({
    name: "browser QA harness completed",
    status: "FAIL",
    error: String(error.message).slice(0, 700),
  });
} finally {
  await browser.close();
  report.result = report.checks.some((entry) => entry.status === "FAIL")
    ? "FAIL"
    : "PASS";
  await writeFile(
    resolve(output, "report.json"),
    `${JSON.stringify(report, null, 2)}\n`,
  );
  console.log(
    JSON.stringify(
      {
        commit: report.commit,
        trackedClean: report.trackedClean,
        browser: report.browserVersion,
        result: report.result,
        passed: report.checks.filter((entry) => entry.status === "PASS").length,
        failed: report.checks.filter((entry) => entry.status === "FAIL").length,
        evidence: resolve(output, "report.json"),
      },
      null,
      2,
    ),
  );
  if (report.result === "FAIL") process.exitCode = 1;
}
