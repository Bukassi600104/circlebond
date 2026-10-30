import assert from "node:assert/strict";
import { timingSafeEqual } from "node:crypto";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

const verifiedContact = await loadTypescriptModule(
  "server/auth/verified-contact.ts",
  {},
);

test("native authentication verifies revocation and takes identity only from the verified token", async () => {
  const auth = await loadTypescriptModule("server/auth/native.ts", {
    "server-only": {},
    "@/server/firebase/admin": {
      getFirebaseAdminAuth: () => ({
        verifyIdToken: async (token, revoked) => {
          assert.equal(token, "signed-token");
          assert.equal(revoked, true);
          return {
            uid: "verified-user",
            email: "verified@example.test",
            email_verified: true,
          };
        },
      }),
    },
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => ({
        executeQuery: async (operation, variables) => {
          assert.equal(operation, "GetUserAccountStatus");
          assert.equal(variables.userId, "verified-user");
          return { data: { user: { accountStatus: "active" } } };
        },
      }),
    },
    "./verified-contact": verifiedContact,
    "./index": {
      authenticatePrincipal: () => {
        throw new Error("Bearer must not fall back to cookies");
      },
    },
  });
  const result = await auth.authenticateNativeRequest(
    new Request("https://example.test/api/v1/me?uid=other-user", {
      headers: { authorization: "Bearer signed-token" },
    }),
  );
  assert.equal(result.state, "authenticated");
  assert.equal(result.principal.uid, "verified-user");
  assert.equal(result.principal.scheme, "bearer");
});

test("invalid bearer tokens cannot fall back to a valid browser session", async () => {
  const auth = await loadTypescriptModule("server/auth/native.ts", {
    "server-only": {},
    "@/server/firebase/admin": {
      getFirebaseAdminAuth: () => ({
        verifyIdToken: async () => {
          throw new Error("revoked");
        },
      }),
    },
    "@/server/firebase/data-connect": {},
    "./verified-contact": verifiedContact,
    "./index": {
      authenticatePrincipal: () => {
        throw new Error("must not use browser session");
      },
    },
  });
  const result = await auth.authenticateNativeRequest(
    new Request("https://example.test/api/v1/me", {
      headers: { authorization: "Bearer invalid" },
    }),
  );
  assert.equal(result.state, "unauthenticated");
});

test("native authentication denies suspended users and propagates database outages", async () => {
  let outage = false;
  const auth = await loadTypescriptModule("server/auth/native.ts", {
    "server-only": {},
    "@/server/firebase/admin": {
      getFirebaseAdminAuth: () => ({
        verifyIdToken: async () => ({
          uid: "user",
          email: "verified@example.test",
          email_verified: true,
        }),
      }),
    },
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => ({
        executeQuery: async () => {
          if (outage) throw new Error("database offline");
          return { data: { user: { accountStatus: "suspended" } } };
        },
      }),
    },
    "./verified-contact": verifiedContact,
    "./index": {},
  });
  const request = new Request("https://example.test", {
    headers: { authorization: "Bearer token" },
  });
  assert.equal(
    (await auth.authenticateNativeRequest(request)).state,
    "suspended",
  );
  outage = true;
  await assert.rejects(
    auth.authenticateNativeRequest(request),
    /database offline/,
  );
});

test("native authentication can restore a verified web session", async () => {
  const principal = { uid: "session-user", scheme: "session" };
  const auth = await loadTypescriptModule("server/auth/native.ts", {
    "server-only": {},
    "@/server/firebase/admin": {},
    "@/server/firebase/data-connect": {},
    "./verified-contact": verifiedContact,
    "./index": { authenticatePrincipal: async () => principal },
  });
  assert.equal(
    (await auth.authenticateNativeRequest(new Request("https://example.test")))
      .principal,
    principal,
  );
});

test("session mutation rejects an unverified Bearer header but accepts verified bearer principals", async () => {
  const { assertTrustedMutation } = await loadTypescriptModule(
    "server/auth/request.ts",
    {
      "node:crypto": { timingSafeEqual },
      "next/headers": {
        cookies: async () => ({ get: () => ({ value: "csrf" }) }),
      },
      "@/server/auth": { CSRF_COOKIE: "bc_csrf" },
    },
  );
  const untrusted = new Request("https://example.test", {
    method: "POST",
    headers: {
      authorization: "Bearer unverified",
      origin: "https://other.test",
      host: "example.test",
      "sec-fetch-site": "cross-site",
    },
  });
  await assert.rejects(assertTrustedMutation(untrusted));
  await assertTrustedMutation(untrusted, { uid: "user", scheme: "bearer" });
  await assertTrustedMutation(
    new Request("https://example.test", {
      method: "POST",
      headers: {
        origin: "https://example.test",
        host: "example.test",
        "x-csrf-token": "csrf",
      },
    }),
    { uid: "user", scheme: "session" },
  );
});

test("profile bootstrap repository does not turn a persistence outage into a synthetic account", async () => {
  const { fetchUserBootstrapProfile } = await loadTypescriptModule(
    "server/repositories/users.ts",
    {
      "@/lib/logger": { logger: { warn() {} } },
      "@/server/firebase/data-connect": {
        getBondCircleDataConnect: () => ({
          executeQuery: async () => {
            throw new Error("database unavailable");
          },
        }),
      },
    },
    { process: { env: {} } },
  );
  await assert.rejects(
    fetchUserBootstrapProfile("user"),
    /database unavailable/,
  );
});
