import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import test from "node:test";
import { startSmtpSink } from "../helpers/smtp-sink.mjs";

const port = 3101;
const baseUrl = `http://127.0.0.1:${port}`;
const cookies = new Map();
assert.match(
  process.env.DATA_CONNECT_EMULATOR_HOST ?? "",
  /^(127\.0\.0\.1|localhost):\d+$/,
  "Authentication E2E may only access a loopback database emulator",
);

function absorbCookies(response) {
  for (const header of response.headers.getSetCookie()) {
    const [pair] = header.split(";", 1);
    const separator = pair.indexOf("=");
    const name = pair.slice(0, separator);
    const value = pair.slice(separator + 1);
    if (value) cookies.set(name, value);
    else cookies.delete(name);
  }
}

function cookieHeader() {
  return [...cookies].map(([name, value]) => `${name}=${value}`).join("; ");
}

async function waitForServer(timeoutMs = 25_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${baseUrl}/sign-in`);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error("Authentication E2E server did not become ready.");
}

async function csrf() {
  const response = await fetch(`${baseUrl}/api/auth/csrf`, {
    headers: { Cookie: cookieHeader() },
  });
  absorbCookies(response);
  assert.equal(response.status, 200);
  return (await response.json()).csrfToken;
}

test("Firebase email OTP creates a revocable protected session", async () => {
  const smtp = await startSmtpSink();
  const server = spawn(
    process.execPath,
    ["node_modules/next/dist/bin/next", "start", "-p", String(port)],
    {
      cwd: new URL("../../", import.meta.url),
      stdio: "ignore",
      env: {
        ...process.env,
        NODE_ENV: "production",
        FIREBASE_AUTH_EMULATOR_HOST: "127.0.0.1:9099",
        AUTH_EMAIL_OTP_MODE: "production",
        AUTH_EMAIL_SMTP_URL: smtp.url,
        AUTH_EMAIL_FROM: "BondCircle Test <no-reply@example.test>",
        AUTH_CHALLENGE_SECRET:
          "bondcircle-e2e-only-secret-with-more-than-thirty-two-bytes",
      },
    },
  );

  try {
    await waitForServer();
    const email = `e2e-${Date.now()}@example.com`;
    const requestCode = await fetch(`${baseUrl}/api/auth/email-otp/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader(),
      },
      body: JSON.stringify({
        email,
        purpose: "register",
        displayName: "Amara Okafor",
        termsAccepted: true,
        privacyAccepted: true,
      }),
    });
    absorbCookies(requestCode);
    assert.equal(requestCode.status, 202);
    const challenge = await requestCode.json();
    assert.equal(challenge.developmentCode, undefined);
    const code = smtp.takeCode(email);

    const verify = await fetch(`${baseUrl}/api/auth/email-otp/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader(),
      },
      body: JSON.stringify({
        challengeId: challenge.challengeId,
        code,
      }),
    });
    absorbCookies(verify);
    assert.equal(verify.status, 200);
    const { customToken } = await verify.json();
    assert.ok(customToken);

    const firebaseSignIn = await fetch(
      "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake-api-key",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: customToken, returnSecureToken: true }),
      },
    );
    assert.equal(firebaseSignIn.status, 200);
    const { idToken } = await firebaseSignIn.json();
    assert.ok(idToken);

    const directProfileWrite = await fetch(
      `http://${process.env.DATA_CONNECT_EMULATOR_HOST}/v1/projects/bond-circle/locations/europe-west2/services/bondcircle-service/connectors/bondcircle:executeMutation`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${idToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          operationName: "UpsertCurrentUser",
          variables: {
            displayName: "Untrusted direct writer",
            email: "another@example.com",
            termsAcceptedAt: new Date().toISOString(),
            privacyAcceptedAt: new Date().toISOString(),
          },
        }),
      },
    );
    assert.equal(directProfileWrite.status, 403);

    const csrfToken = await csrf();
    const session = await fetch(`${baseUrl}/api/auth/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader(),
        Host: `127.0.0.1:${port}`,
        Origin: baseUrl,
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ idToken }),
    });
    absorbCookies(session);
    assert.equal(session.status, 200);

    const protectedPage = await fetch(`${baseUrl}/account`, {
      headers: { Cookie: cookieHeader() },
      redirect: "manual",
    });
    assert.equal(protectedPage.status, 200);
    assert.match(await protectedPage.text(), /Welcome,[\s\S]*Amara Okafor/);

    const deleteTemporaryAuthUser = await fetch(
      "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:delete?key=fake-api-key",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      },
    );
    assert.equal(deleteTemporaryAuthUser.status, 200);

    const requestRecoveryCode = await fetch(
      `${baseUrl}/api/auth/email-otp/request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader(),
        },
        body: JSON.stringify({ email, purpose: "sign-in" }),
      },
    );
    absorbCookies(requestRecoveryCode);
    assert.equal(requestRecoveryCode.status, 202);
    const recoveryChallenge = await requestRecoveryCode.json();
    const restoreEmulatorUser = await fetch(
      `${baseUrl}/api/auth/email-otp/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader(),
        },
        body: JSON.stringify({
          challengeId: recoveryChallenge.challengeId,
          code: smtp.takeCode(email),
        }),
      },
    );
    assert.equal(restoreEmulatorUser.status, 200);
    assert.ok((await restoreEmulatorUser.json()).customToken);

    const unknownEmail = `new-sign-in-${Date.now()}@example.com`;
    const requestUnknownCode = await fetch(
      `${baseUrl}/api/auth/email-otp/request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader(),
        },
        body: JSON.stringify({ email: unknownEmail, purpose: "sign-in" }),
      },
    );
    absorbCookies(requestUnknownCode);
    assert.equal(requestUnknownCode.status, 202);
    const unknownChallenge = await requestUnknownCode.json();
    const verifyUnknownUser = await fetch(
      `${baseUrl}/api/auth/email-otp/verify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader(),
        },
        body: JSON.stringify({
          challengeId: unknownChallenge.challengeId,
          code: smtp.takeCode(unknownEmail),
        }),
      },
    );
    assert.equal(verifyUnknownUser.status, 200);
    const unknownCustomToken = (await verifyUnknownUser.json()).customToken;
    assert.ok(unknownCustomToken);
    const unknownFirebaseSignIn = await fetch(
      "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=fake-api-key",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: unknownCustomToken,
          returnSecureToken: true,
        }),
      },
    );
    assert.equal(unknownFirebaseSignIn.status, 200);
    const unknownIdToken = (await unknownFirebaseSignIn.json()).idToken;
    const unknownCsrf = await csrf();
    const unknownSession = await fetch(`${baseUrl}/api/auth/session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader(),
        Host: `127.0.0.1:${port}`,
        Origin: baseUrl,
        "X-CSRF-Token": unknownCsrf,
      },
      body: JSON.stringify({ idToken: unknownIdToken }),
    });
    absorbCookies(unknownSession);
    assert.equal(unknownSession.status, 200);
    assert.equal((await unknownSession.json()).needsLegalAcceptance, true);

    const logoutCsrf = await csrf();
    const logout = await fetch(`${baseUrl}/api/auth/session`, {
      method: "DELETE",
      headers: {
        Cookie: cookieHeader(),
        Host: `127.0.0.1:${port}`,
        Origin: baseUrl,
        "X-CSRF-Token": logoutCsrf,
      },
    });
    absorbCookies(logout);
    assert.equal(logout.status, 200);

    const rejected = await fetch(`${baseUrl}/account`, {
      headers: { Cookie: cookieHeader() },
      redirect: "manual",
    });
    assert.equal(rejected.status, 307);
    assert.match(rejected.headers.get("location") ?? "", /\/sign-in/);
  } finally {
    server.kill();
    await smtp.close();
  }
});
