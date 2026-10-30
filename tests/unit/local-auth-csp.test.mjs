import assert from "node:assert/strict";
import test from "node:test";
import { localAuthCsp, LOCAL_AUTH_ORIGIN } from "../helpers/local-auth-csp.mjs";

const policy =
  "default-src 'self'; script-src 'self' 'nonce-synthetic'; connect-src 'self' https://identitytoolkit.googleapis.com; frame-src 'self'; frame-ancestors 'none'; object-src 'none'";

test("local browser fixture adds only exact Auth origin while preserving every other directive", () => {
  const adjusted = localAuthCsp(policy, "http://127.0.0.1:3100");
  assert.equal(
    adjusted,
    policy.replace(
      "https://identitytoolkit.googleapis.com",
      `https://identitytoolkit.googleapis.com ${LOCAL_AUTH_ORIGIN}`,
    ),
  );
  assert.equal(localAuthCsp(adjusted, "http://127.0.0.1:3100"), adjusted);
});

test("local CSP fixture refuses public, authenticated or non-origin document URLs", () => {
  for (const origin of [
    "https://www.bondcircles.com",
    "http://example.com:3100",
    "http://user@127.0.0.1:3100",
    "http://127.0.0.1:3100/path",
    "http://127.0.0.1:3100?query=1",
    "https://127.0.0.1:3100",
  ])
    assert.throws(() => localAuthCsp(policy, origin));
});

test("local fixture never invents or broadens missing, duplicate or deny-all connect policies", () => {
  for (const value of [
    null,
    "",
    "default-src 'self'",
    "connect-src",
    "connect-src 'none'",
    "connect-src 'self'; connect-src https:",
  ])
    assert.throws(() => localAuthCsp(value, "http://127.0.0.1:3100"));
});
