import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

async function load(path, dependencies) {
  const source = await readFile(
    new URL(`../../${path}`, import.meta.url),
    "utf8",
  );
  const exports = {};
  runInNewContext(
    ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
      },
    }).outputText,
    {
      exports,
      require: (id) => {
        assert.ok(Object.hasOwn(dependencies, id), id);
        return dependencies[id];
      },
      Error,
      Response,
      Buffer,
    },
  );
  return exports;
}

const emptyPage = () => ({
  user: { id: "self", displayName: "Member" },
  memberships: [],
  receipts: [],
  comments: [],
  announcements: [],
  supportUpdates: [],
  notifications: [],
  activations: [],
  authEvents: [],
});

test("account export paginates self-scoped records and never silently returns a truncated page", async () => {
  const calls = [];
  const privacy = await load("server/repositories/account-privacy.ts", {
    "server-only": {},
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => ({
        executeQuery: async (operation, variables) => {
          calls.push({ operation, ...variables });
          assert.equal(variables.userId, "self");
          if (operation === "GetAccountPrivacyRequests")
            return { data: { accountPrivacyRequests: [] } };
          const page = emptyPage();
          page.receipts = Array.from(
            { length: variables.offset === 0 ? 100 : 1 },
            (_, i) => ({ id: `receipt-${variables.offset + i}`, amount: 100 }),
          );
          return { data: page };
        },
      }),
    },
  });
  const result = await privacy.exportAccountData("self");
  assert.equal(result.profile.id, "self");
  assert.equal(result.receipts.length, 101);
  assert.deepEqual(
    calls
      .filter((call) => call.operation === "GetAccountExportPage")
      .map((call) => call.offset),
    [0, 100],
  );
  assert.match(result.excluded.join(" "), /credentials.*device tokens/);
});

test("export fails closed on unavailable, cross-account or oversized records", async () => {
  for (const scenario of ["missing", "another-user", "oversized", "outage"]) {
    const privacy = await load("server/repositories/account-privacy.ts", {
      "server-only": {},
      "@/server/firebase/data-connect": {
        getBondCircleDataConnect: () => ({
          executeQuery: async (operation) => {
            if (operation === "GetAccountPrivacyRequests")
              return { data: { accountPrivacyRequests: [] } };
            if (scenario === "outage")
              throw new Error("private database failure");
            const page = emptyPage();
            if (scenario === "missing") delete page.user;
            if (scenario === "another-user") page.user.id = "other";
            if (scenario === "oversized")
              page.comments = [{ body: "x".repeat(4_000_001) }];
            return { data: page };
          },
        }),
      },
    });
    await assert.rejects(privacy.exportAccountData("self"));
  }
});

for (const [scenario, counts] of [
  ["exactly 10,000 related records", { receipts: 10_000 }],
  [
    "10,400 records across collections",
    {
      memberships: 1300,
      receipts: 1300,
      comments: 1300,
      announcements: 1300,
      supportUpdates: 1300,
      notifications: 1300,
      activations: 1300,
      authEvents: 1300,
    },
  ],
]) {
  test(`export enforces the aggregate boundary for ${scenario}`, async () => {
    const offsets = [];
    const privacy = await load("server/repositories/account-privacy.ts", {
      "server-only": {},
      "@/server/firebase/data-connect": {
        getBondCircleDataConnect: () => ({
          executeQuery: async (operation, { offset }) => {
            if (operation === "GetAccountPrivacyRequests")
              return { data: { accountPrivacyRequests: [] } };
            offsets.push(offset);
            const page = emptyPage();
            for (const [name, count] of Object.entries(counts)) {
              page[name] = Array.from(
                { length: Math.min(100, Math.max(0, count - offset)) },
                (_, index) => ({ id: `${name}-${offset + index}` }),
              );
            }
            return { data: page };
          },
        }),
      },
    });
    if (counts.receipts === 10_000) {
      assert.equal(
        (await privacy.exportAccountData("self")).receipts.length,
        10_000,
      );
      assert.equal(offsets.at(-1), 10_000);
    } else {
      await assert.rejects(
        privacy.exportAccountData("self"),
        privacy.AccountExportLimitError,
      );
    }
  });
}

test("privacy requests are persisted idempotently and do not delete accounts or circle data", async () => {
  let stored;
  const writes = [];
  const privacy = await load("server/repositories/account-privacy.ts", {
    "server-only": {},
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => ({
        executeQuery: async (_, variables) => {
          assert.equal(variables.userId, "self");
          return { data: { accountPrivacyRequests: stored ? [stored] : [] } };
        },
        executeMutation: async (operation, variables) => {
          writes.push(operation);
          assert.equal(variables.id, "self:deletion");
          stored = {
            id: variables.id,
            kind: variables.kind,
            status: "requested",
          };
        },
      }),
    },
  });
  assert.equal(
    (await privacy.createPrivacyRequest("self", "deletion")).status,
    "requested",
  );
  assert.equal(
    (await privacy.createPrivacyRequest("self", "deletion")).status,
    "requested",
  );
  assert.deepEqual(writes, ["CreateAccountPrivacyRequest"]);
});

test("concurrent privacy request insertion returns persisted winner and database failure never claims success", async () => {
  for (const concurrent of [true, false]) {
    let stored;
    const privacy = await load("server/repositories/account-privacy.ts", {
      "server-only": {},
      "@/server/firebase/data-connect": {
        getBondCircleDataConnect: () => ({
          executeQuery: async () => ({
            data: { accountPrivacyRequests: stored ? [stored] : [] },
          }),
          executeMutation: async () => {
            if (concurrent)
              stored = {
                id: "self:deletion",
                kind: "deletion",
                status: "requested",
              };
            throw new Error("insert failed");
          },
        }),
      },
    });
    if (concurrent)
      assert.equal(
        (await privacy.createPrivacyRequest("self", "deletion")).id,
        "self:deletion",
      );
    else
      await assert.rejects(
        privacy.createPrivacyRequest("self", "deletion"),
        /insert failed/,
      );
  }
});

test("export HTTP route binds identity to authentication, sets private headers and hides infrastructure errors", async () => {
  let principal = null;
  let outage = false;
  const called = [];
  class LimitError extends Error {}
  const route = await load("app/api/account/export/route.ts", {
    "@/server/auth": { authenticatePrincipal: async () => principal },
    "@/server/auth/request": { clientKey: () => "self" },
    "@/server/auth/security": { enforceRateLimit: async () => true },
    "@/server/repositories/account-privacy": {
      AccountExportLimitError: LimitError,
      exportAccountData: async (uid) => {
        called.push(uid);
        if (outage) throw new Error("private provider details");
        return { profile: { id: uid } };
      },
    },
  });
  const request = new Request(
    "https://example.test/api/account/export?userId=other",
  );
  assert.equal((await route.GET(request)).status, 401);
  principal = { uid: "self" };
  const response = await route.GET(request);
  assert.equal(response.status, 200);
  assert.match(response.headers.get("cache-control"), /private, no-store/);
  assert.deepEqual(called, ["self"]);
  outage = true;
  const failed = await route.GET(request);
  assert.equal(failed.status, 503);
  assert.doesNotMatch(await failed.text(), /private provider/);
});

test("privacy mutation requires authentication, CSRF, known kind and verified user ownership", async () => {
  let principal = null;
  let trusted = false;
  let calls = 0;
  const route = await load("app/api/account/privacy-requests/route.ts", {
    "@/server/auth": { authenticatePrincipal: async () => principal },
    "@/server/auth/request": {
      clientKey: () => "test",
      assertTrustedMutation: async () => {
        if (!trusted) throw new Error("CSRF");
      },
    },
    "@/server/auth/security": { enforceRateLimit: async () => true },
    "@/server/repositories/account-privacy": {
      createPrivacyRequest: async (uid, kind) => {
        calls++;
        assert.equal(uid, "self");
        return { id: "self:deletion", kind, status: "requested" };
      },
    },
  });
  const req = (kind) =>
    new Request("https://example.test", {
      method: "POST",
      body: JSON.stringify({ kind, userId: "other" }),
    });
  assert.equal((await route.POST(req("deletion"))).status, 401);
  principal = { uid: "self", scheme: "session" };
  assert.equal((await route.POST(req("deletion"))).status, 403);
  trusted = true;
  assert.equal((await route.POST(req("erase-all-data"))).status, 400);
  const result = await route.POST(req("deletion"));
  assert.equal(result.status, 202);
  assert.match((await result.json()).message, /account remains active/);
  assert.equal(calls, 1);
});

test("privacy operator endpoint rejects non-owners and only acknowledges review", async () => {
  let owner = null;
  const calls = [];
  const route = await load("app/api/owner/privacy-requests/route.ts", {
    "@/server/owner/auth": { readOwnerSession: async () => owner },
    "@/server/auth/request": { assertTrustedMutation: async () => {} },
    "@/server/repositories/account-privacy": {
      acknowledgePrivacyRequest: async (...args) => calls.push(args),
    },
  });
  const req = () =>
    new Request("https://example.test", {
      method: "POST",
      body: JSON.stringify({ id: "self:deletion", status: "deleted" }),
    });
  assert.equal((await route.POST(req())).status, 403);
  owner = { session: { uid: "owner" } };
  const response = await route.POST(req());
  assert.deepEqual(await response.json(), { status: "processing" });
  assert.deepEqual(calls, [["self:deletion", "owner"]]);
});
