import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("BondCircle is installable as a standalone mobile web app", async () => {
  const manifest = await source("app/manifest.ts");
  const layout = await source("app/layout.tsx");
  const serviceWorker = await source("public/sw.js");
  const installPrompt = await source("components/pwa/InstallPrompt.tsx");

  assert.match(manifest, /display:\s*"standalone"/);
  assert.match(manifest, /start_url:\s*"\/"/);
  assert.match(manifest, /192x192/);
  assert.match(manifest, /512x512/);
  assert.match(layout, /appleWebApp/);
  assert.match(layout, /viewportFit:\s*"cover"/);
  assert.match(layout, /<InstallPrompt\s*\/>/);
  assert.match(serviceWorker, /addEventListener\("fetch"/);
  assert.match(installPrompt, /beforeinstallprompt/);
  assert.match(installPrompt, /Add to Home Screen/);
  assert.match(installPrompt, /navigator\.serviceWorker\.register/);
  assert.match(installPrompt, /display-mode:\s*standalone/);
});

test("splash screen introduces the installed app with locked brand assets", async () => {
  const splash = await source("app/page.tsx");
  const styles = await source("app/auth.css");

  assert.match(splash, /bond-circle-mark\.png/);
  assert.match(splash, /bond-circle-wordmark\.png/);
  assert.match(splash, /Celebrate/);
  assert.match(splash, /Support/);
  assert.match(splash, /Together/);
  assert.match(styles, /prefers-reduced-motion/);
});

test("mobile app chrome accounts for device safe areas", async () => {
  const globals = await source("app/globals.css");
  const dashboard = await source("app/dashboard.css");

  assert.match(globals, /env\(safe-area-inset-top\)/);
  assert.match(dashboard, /env\(safe-area-inset-bottom\)/);
});
