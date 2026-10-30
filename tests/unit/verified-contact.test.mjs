import assert from "node:assert/strict";
import * as crypto from "node:crypto";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

const contacts = await loadTypescriptModule(
  "server/auth/verified-contact.ts",
  {},
);
const invitations = await loadTypescriptModule("server/invitations/rules.ts", {
  "node:crypto": crypto,
});

async function authentication(claims, accountStatus = "active") {
  const decoded = {
    uid: "contact-test-user",
    auth_time: Math.floor(Date.now() / 1000),
    ...claims,
  };
  let cookiesCreated = 0;
  let databaseReads = 0;
  const auth = {
    verifyIdToken: async () => decoded,
    verifySessionCookie: async () => decoded,
    createSessionCookie: async () => {
      cookiesCreated++;
      return "synthetic-session";
    },
  };
  const dependencies = {
    "@/server/firebase/admin": { getFirebaseAdminAuth: () => auth },
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => ({
        executeQuery: async () => {
          databaseReads++;
          return { data: { user: { accountStatus } } };
        },
      }),
    },
    "./verified-contact": contacts,
  };
  const index = await loadTypescriptModule("server/auth/index.ts", {
    ...dependencies,
    "next/headers": {
      cookies: async () => ({ get: () => ({ value: "synthetic-session" }) }),
    },
    "next/navigation": {
      redirect: () => {
        throw new Error("Redirected");
      },
    },
    "./security": { SESSION_MAX_AGE_MS: 8 * 60 * 60 * 1000 },
  });
  const native = await loadTypescriptModule("server/auth/native.ts", {
    ...dependencies,
    "server-only": {},
    "./index": index,
  });
  return {
    index,
    native,
    get cookiesCreated() {
      return cookiesCreated;
    },
    get databaseReads() {
      return databaseReads;
    },
  };
}

const request = () =>
  new Request("https://example.test", {
    headers: { authorization: "Bearer synthetic-id-token" },
  });

test("unverified email cannot create or restore a session or either bearer principal", async () => {
  for (const claims of [
    { email: "unverified@example.test", email_verified: false },
    { email: "unverified@example.test" },
    { email_verified: true },
  ]) {
    const boundary = await authentication(claims);
    await assert.rejects(
      boundary.index.createSessionCookie("synthetic-id-token"),
      /Verified contact required/,
    );
    assert.equal(await boundary.index.readSession(), null);
    assert.equal(await boundary.index.authenticatePrincipal(request()), null);
    assert.equal(
      (await boundary.native.authenticateNativeRequest(request())).state,
      "unauthenticated",
    );
    assert.equal(boundary.cookiesCreated, 0);
    assert.equal(boundary.databaseReads, 0);
  }
});

test("verified email and verified phone identities retain all authentication paths", async () => {
  for (const claims of [
    { email: "verified@example.test", email_verified: true },
    { phone_number: "+2348012345678" },
  ]) {
    const boundary = await authentication(claims);
    assert.equal(
      await boundary.index.createSessionCookie("synthetic-id-token"),
      "synthetic-session",
    );
    assert.equal((await boundary.index.readSession()).uid, "contact-test-user");
    assert.equal(
      (await boundary.index.authenticatePrincipal(request())).uid,
      "contact-test-user",
    );
    assert.equal(
      (await boundary.native.authenticateNativeRequest(request())).state,
      "authenticated",
    );
    assert.equal(boundary.cookiesCreated, 1);
  }
});

test("a phone-authenticated user's unverified email cannot claim a named email invitation", async () => {
  const boundary = await authentication({
    email: "unverified@example.test",
    email_verified: false,
    phone_number: "+2348012345678",
  });
  const session = await boundary.index.readSession();
  const bearer = await boundary.index.authenticatePrincipal(request());
  const native = await boundary.native.authenticateNativeRequest(request());
  for (const identity of [session, bearer, native.principal]) {
    assert.equal(identity.email, undefined);
    const user = {
      email: identity.email ?? null,
      phone: identity.phone_number ?? identity.phone ?? null,
    };
    assert.equal(
      invitations.invitationMatchesUser(
        { mode: "named", recipientEmail: "unverified@example.test" },
        user,
      ),
      false,
    );
    assert.equal(
      invitations.invitationMatchesUser(
        { mode: "named", recipientPhone: "+2348012345678" },
        user,
      ),
      true,
    );
  }
});

test("verified contact does not bypass account suspension", async () => {
  const boundary = await authentication(
    { email: "verified@example.test", email_verified: true },
    "suspended",
  );
  assert.equal(await boundary.index.readSession(), null);
  assert.equal(await boundary.index.authenticatePrincipal(request()), null);
  assert.equal(
    (await boundary.native.authenticateNativeRequest(request())).state,
    "suspended",
  );
});
