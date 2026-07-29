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
  assert.doesNotMatch(splash, /bond-circle-wordmark\.png/);
  assert.doesNotMatch(splash, /Celebrate|Support|Together|<p>/);
  assert.match(styles, /@keyframes bc-splash-gather/);
  assert.match(styles, /@keyframes bc-splash-reveal/);
  assert.match(styles, /prefers-reduced-motion/);
});

test("onboarding artwork sits on a subtle multi-brand gradient canvas", async () => {
  const styles = await source("app/auth.css");

  assert.match(
    styles,
    /\.bc-onboarding[\s\S]*radial-gradient[\s\S]*--color-coral[\s\S]*--color-gold/,
  );
  assert.match(
    styles,
    /\.bc-onboarding__art img[\s\S]*mix-blend-mode:\s*multiply/,
  );
  assert.doesNotMatch(
    styles,
    /\.bc-onboarding\s*\{[^}]*background:\s*var\(--color-cream\)/,
  );
});

test("onboarding navigation stays separated from the slide indicators", async () => {
  const styles = await source("app/auth.css");

  assert.match(
    styles,
    /\.bc-onboarding footer\s*\{[\s\S]*margin-top:\s*var\(--space-6\)/,
  );
  assert.match(
    styles,
    /@media \(min-width: 48rem\) and \(max-height: 50rem\)[\s\S]*\.bc-onboarding__art[\s\S]*width:\s*min\(68vh, 30rem\)/,
  );
});

test("mobile app chrome accounts for device safe areas", async () => {
  const globals = await source("app/globals.css");
  const dashboard = await source("app/dashboard.css");

  assert.match(globals, /env\(safe-area-inset-top\)/);
  assert.match(dashboard, /env\(safe-area-inset-bottom\)/);
});
