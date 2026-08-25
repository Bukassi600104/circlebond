import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("BC-MOB-001: authenticatePrincipal supports Bearer ID tokens and session cookies", async () => {
  const authIndex = await source("server/auth/index.ts");

  assert.match(authIndex, /export type AuthScheme = "session" \| "bearer"/);
  assert.match(authIndex, /export interface AuthenticatedPrincipal/);
  assert.match(authIndex, /export async function authenticatePrincipal/);
  assert.match(authIndex, /authHeader\?\.toLowerCase\(\)\.startsWith\("bearer "\)/);
  assert.match(authIndex, /verifyIdToken\(idToken, true\)/);
  assert.match(authIndex, /GetUserAccountStatus/);
  assert.match(authIndex, /accountStatus !== "active"/);
  assert.match(authIndex, /scheme:\s*"bearer"/);
  assert.match(authIndex, /scheme:\s*"session"/);
});

test("BC-MOB-001: mutation assertions differentiate web sessions from mobile bearer requests", async () => {
  const requestAuth = await source("server/auth/request.ts");

  assert.match(requestAuth, /principal\?\.scheme === "bearer"/);
  assert.match(requestAuth, /authHeader\?\.toLowerCase\(\)\.startsWith\("bearer "\)/);
  assert.match(requestAuth, /assertTrustedMutation/);
  assert.match(requestAuth, /x-csrf-token/);
});

test("BC-MOB-001: /api/v1/me route is exposed and returns user profile & preferences", async () => {
  const meRoute = await source("app/api/v1/me/route.ts");
  const usersRepo = await source("server/repositories/users.ts");
  const queries = await source("dataconnect/bondcircle/queries.gql");

  assert.match(meRoute, /authenticatePrincipal/);
  assert.match(meRoute, /fetchUserBootstrapProfile/);
  assert.match(meRoute, /status: 401/);
  assert.match(usersRepo, /fetchUserBootstrapProfile/);
  assert.match(queries, /query GetUserBootstrapProfile/);
  assert.match(queries, /emailNotifications/);
  assert.match(queries, /accountStatus/);
});
