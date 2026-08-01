const args = new Map();
for (let index = 2; index < process.argv.length; index += 1) {
  const key = process.argv[index];
  if (!key?.startsWith("--")) continue;
  args.set(key.slice(2), process.argv[index + 1]);
  index += 1;
}

const baseUrl = new URL(
  args.get("base-url") ??
    process.env.PRODUCTION_BASE_URL ??
    "https://www.bondcircles.com",
);
const storageBucket =
  args.get("storage-bucket") ??
  process.env.FIREBASE_STORAGE_BUCKET ??
  "bond-circle.firebasestorage.app";

if (baseUrl.protocol !== "https:") {
  throw new Error("Production verification requires an HTTPS base URL.");
}

const results = [];

async function check(name, operation) {
  try {
    await operation();
    results.push({ name, passed: true });
  } catch (error) {
    results.push({
      name,
      passed: false,
      reason: error instanceof Error ? error.message : "Unknown failure",
    });
  }
}

function requireValue(condition, message) {
  if (!condition) throw new Error(message);
}

async function get(path, init = {}) {
  const response = await fetch(new URL(path, baseUrl), {
    redirect: "follow",
    signal: AbortSignal.timeout(15_000),
    ...init,
  });
  requireValue(response.ok, `${path} returned HTTP ${response.status}`);
  return response;
}

await check("HTTPS canonical origin", async () => {
  const response = await fetch(
    new URL(baseUrl.pathname, `http://${baseUrl.host}`),
    { redirect: "follow", signal: AbortSignal.timeout(15_000) },
  );
  requireValue(response.ok, `HTTP redirect ended with ${response.status}`);
  requireValue(
    new URL(response.url).protocol === "https:",
    "HTTP origin did not redirect to HTTPS",
  );
});

await check("Health and production dependencies", async () => {
  const response = await get("/api/health");
  const body = await response.json();
  requireValue(body.status === "ok", `health status is ${body.status}`);
  requireValue(body.firebase === "configured", "Firebase is not configured");
  requireValue(
    body.sqlConnect === "configured",
    "Firebase Data Connect is not configured",
  );
  requireValue(
    body.environment === "production",
    `runtime environment is ${body.environment}`,
  );
});

await check("Browser security headers", async () => {
  const response = await get("/sign-in");
  const requiredHeaders = [
    "Strict-Transport-Security",
    "Content-Security-Policy",
    "X-Content-Type-Options",
    "X-Frame-Options",
    "Referrer-Policy",
    "Permissions-Policy",
  ];
  for (const header of requiredHeaders) {
    requireValue(response.headers.get(header), `${header} is missing`);
  }
  requireValue(
    response.headers.get("x-frame-options") === "DENY",
    "X-Frame-Options must be DENY",
  );
});

await check("PWA manifest and service worker", async () => {
  const [manifestResponse, serviceWorker] = await Promise.all([
    get("/manifest.webmanifest"),
    get("/sw.js"),
  ]);
  const manifest = await manifestResponse.json();
  requireValue(manifest.display === "standalone", "PWA is not standalone");
  requireValue(
    manifest.icons?.some((icon) => icon.sizes === "192x192"),
    "192px PWA icon is missing",
  );
  requireValue(
    manifest.icons?.some((icon) => icon.sizes === "512x512"),
    "512px PWA icon is missing",
  );
  requireValue(
    serviceWorker.headers.get("service-worker-allowed") === "/",
    "service worker scope header is missing",
  );
});

await check("Crawler metadata", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([
    get("/robots.txt"),
    get("/sitemap.xml"),
  ]);
  const robots = await robotsResponse.text();
  const sitemap = await sitemapResponse.text();
  for (const privatePath of ["/account/", "/owner/", "/api/", "/invite/"]) {
    requireValue(
      robots.includes(`Disallow: ${privatePath}`),
      `${privatePath} is not disallowed in robots.txt`,
    );
  }
  requireValue(
    sitemap.includes("/legal/terms") && sitemap.includes("/legal/privacy"),
    "legal URLs are missing from sitemap.xml",
  );
});

await check("Published legal documents are final", async () => {
  const responses = await Promise.all([
    get("/legal/terms"),
    get("/legal/privacy"),
  ]);
  const expectedPaths = ["/legal/terms", "/legal/privacy"];
  responses.forEach((response, index) => {
    requireValue(
      new URL(response.url).pathname === expectedPaths[index],
      `${expectedPaths[index]} redirected to ${new URL(response.url).pathname}`,
    );
  });
  const text = (await Promise.all(responses.map((response) => response.text())))
    .join(" ")
    .toLowerCase();
  for (const placeholder of [
    "draft dated",
    "must be inserted before public launch",
    "pre-launch details required",
  ]) {
    requireValue(
      !text.includes(placeholder),
      `legal documents still contain: ${placeholder}`,
    );
  }
});

await check("Development-only secrets are absent", async () => {
  const pages = await Promise.all([get("/sign-in"), get("/register")]);
  const html = (await Promise.all(pages.map((page) => page.text()))).join(" ");
  requireValue(
    !/local development code|developmentCode|replace-with-production/i.test(
      html,
    ),
    "a development-only secret or placeholder is exposed",
  );
});

await check("Firebase production Storage bucket", async () => {
  const response = await fetch(
    `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(storageBucket)}`,
    { signal: AbortSignal.timeout(15_000) },
  );
  requireValue(
    response.ok,
    `Storage bucket ${storageBucket} returned HTTP ${response.status}`,
  );
});

for (const result of results) {
  if (result.passed) {
    console.log(`PASS  ${result.name}`);
  } else {
    console.error(`FAIL  ${result.name}: ${result.reason}`);
  }
}

const failures = results.filter((result) => !result.passed);
console.log(
  `\n${results.length - failures.length}/${results.length} checks passed.`,
);
if (failures.length) process.exitCode = 1;
