import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { runInNewContext } from "node:vm";

const source = await readFile(
  new URL("../../public/sw.js", import.meta.url),
  "utf8",
);

function worker(network = async () => new Response("network")) {
  const handlers = {};
  const writes = [];
  const deleted = [];
  let installed = [];
  let claimed = false;
  const fallback = new Response("offline");
  runInNewContext(source, {
    URL,
    Response,
    self: {
      location: { origin: "https://example.test" },
      addEventListener: (type, handler) => {
        handlers[type] = handler;
      },
      skipWaiting: async () => {},
      clients: {
        claim: async () => {
          claimed = true;
        },
      },
    },
    fetch: network,
    caches: {
      open: async () => ({
        addAll: async (paths) => {
          installed = Array.from(paths);
        },
        put: async (request) => {
          writes.push(request.url);
        },
      }),
      match: async (request) =>
        request === "/offline.html" ? fallback : undefined,
      keys: async () => [
        "bondcircle-shell-v1",
        "bondcircle-shell-v2",
        "unrelated-cache",
      ],
      delete: async (key) => {
        deleted.push(key);
      },
    },
  });
  async function lifecycle(type) {
    let work;
    handlers[type]({
      waitUntil: (promise) => {
        work = promise;
      },
    });
    await work;
  }
  async function request(path, { mode = "navigate", method = "GET" } = {}) {
    let response;
    const pending = [];
    handlers.fetch({
      request: {
        url: new URL(path, "https://example.test").href,
        mode,
        method,
      },
      respondWith: (promise) => {
        response = promise;
      },
      waitUntil: (promise) => pending.push(promise),
    });
    const result = await response;
    await Promise.all(pending);
    return result;
  }
  return {
    lifecycle,
    request,
    writes,
    deleted,
    get installed() {
      return installed;
    },
    get claimed() {
      return claimed;
    },
  };
}

test("installation caches only public installation assets and a generic offline page", async () => {
  const sw = worker();
  await sw.lifecycle("install");
  assert.deepEqual(sw.installed, [
    "/manifest.webmanifest",
    "/brand/icon-192.png",
    "/brand/icon-512.png",
    "/brand/icon-maskable-512.png",
    "/offline.html",
  ]);
});

test("activation removes only obsolete BondCircle caches and claims clients", async () => {
  const sw = worker();
  await sw.lifecycle("activate");
  assert.deepEqual(sw.deleted, ["bondcircle-shell-v1"]);
  assert.equal(sw.claimed, true);
});

test("offline navigation shows a generic fallback without storing private pages", async () => {
  const sw = worker(async () => {
    throw new TypeError("offline");
  });
  assert.equal(
    await (await sw.request("/account/circles/private-id")).text(),
    "offline",
  );
  assert.deepEqual(sw.writes, []);
});

test("online navigation always uses the network and never caches its response", async () => {
  const sw = worker();
  assert.equal(await (await sw.request("/account")).text(), "network");
  assert.deepEqual(sw.writes, []);
});

test("API, authentication, cross-origin and mutation requests are not intercepted", async () => {
  const sw = worker(() => {
    throw new Error("Must not fetch");
  });
  for (const path of [
    "/api/receipts/private",
    "/api/payments/paystack/webhook",
    "/__/auth/handler",
    "https://other.test/account",
  ]) {
    assert.equal(await sw.request(path), undefined);
  }
  assert.equal(await sw.request("/account", { method: "POST" }), undefined);
  assert.equal(await sw.request("/api/v1/me", { mode: "cors" }), undefined);
});

test("only allow-listed public assets refresh their cached content", async () => {
  const sw = worker();
  assert.equal(
    await (await sw.request("/brand/icon-192.png", { mode: "cors" })).text(),
    "network",
  );
  assert.deepEqual(sw.writes, ["https://example.test/brand/icon-192.png"]);
  assert.equal(
    await sw.request("/private/receipt.png", { mode: "cors" }),
    undefined,
  );
});
