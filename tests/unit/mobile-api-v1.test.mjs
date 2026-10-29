import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

const { apiJson } = await loadTypescriptModule("app/api/v1/_response.ts", {
  "next/server": { NextResponse: Response },
});
const principal = {
  uid: "verified-user",
  scheme: "bearer",
  decoded: { name: "Verified" },
};
const authenticated = { state: "authenticated", principal };

async function route(
  path,
  { outcome = authenticated, dependencies = {} } = {},
) {
  const logged = [];
  const loaded = await loadTypescriptModule(path, {
    "@/app/api/v1/_response": { apiJson },
    "@/server/auth/native": { authenticateNativeRequest: async () => outcome },
    "@/lib/logger": { logger: { error: (...args) => logged.push(args) } },
    ...dependencies,
  });
  return { ...loaded, logged };
}

test("native private responses prevent caching and provide stable error codes", async () => {
  const response = apiJson({ error: "Not found." }, { status: 404 });
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), {
    error: "Not found.",
    code: "NOT_FOUND",
  });
});

test("profile requires authentication and suspension checks before loading private data", async () => {
  for (const [state, status] of [
    ["unauthenticated", 401],
    ["suspended", 403],
  ]) {
    const { GET } = await route("app/api/v1/me/route.ts", {
      outcome: { state },
      dependencies: {
        "@/server/repositories/users": {
          fetchUserBootstrapProfile: () => {
            throw new Error("must not load");
          },
        },
      },
    });
    assert.equal(
      (await GET(new Request("https://example.test/api/v1/me"))).status,
      status,
    );
  }
});

test("profile uses verified identity and returns persisted preferences and legal acceptance", async () => {
  const { GET } = await route("app/api/v1/me/route.ts", {
    dependencies: {
      "@/server/repositories/users": {
        fetchUserBootstrapProfile: async (uid) => {
          assert.equal(uid, principal.uid);
          return {
            id: uid,
            displayName: "Persisted",
            termsAcceptedAt: "2026-01-01",
            privacyAcceptedAt: "2026-01-01",
            emailNotifications: false,
            browserPushNotifications: false,
            marketingCommunication: false,
          };
        },
      },
    },
  });
  const response = await GET(
    new Request("https://example.test/api/v1/me?userId=another-user"),
  );
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.user.id, principal.uid);
  assert.equal(body.user.displayName, "Persisted");
  assert.equal(body.user.preferences.emailNotifications, false);
  assert.equal(body.user.termsAcceptedAt, "2026-01-01");
});

test("repository outages return a generic profile error without disclosing internal details", async () => {
  const { GET, logged } = await route("app/api/v1/me/route.ts", {
    dependencies: {
      "@/server/repositories/users": {
        fetchUserBootstrapProfile: async () => {
          throw new Error("private connection detail");
        },
      },
    },
  });
  const response = await GET(new Request("https://example.test/api/v1/me"));
  assert.equal(response.status, 500);
  assert.doesNotMatch(
    JSON.stringify(await response.json()),
    /private connection/,
  );
  assert.deepEqual(logged, [["native_profile_failed"]]);
});

const circle = (id, createdAt, extra = {}) => ({
  id,
  name: id,
  createdAt,
  type: "support",
  status: "active",
  role: "member",
  memberCount: 3,
  memberLimit: 10,
  targetAmount: null,
  contributedAmount: null,
  ...extra,
});

test("circle listing preserves privacy redaction and deterministic pagination", async () => {
  const { GET } = await route("app/api/v1/circles/route.ts", {
    dependencies: {
      "@/server/repositories/dashboard": {
        loadDashboardCircles: async (uid) => {
          assert.equal(uid, principal.uid);
          return [
            circle("b", "2026-01-01"),
            circle("a", "2026-01-01"),
            circle("c", "2026-02-01"),
          ];
        },
      },
    },
  });
  const response = await GET(
    new Request("https://example.test/api/v1/circles?limit=1&cursor=1"),
  );
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.circles[0].id, "a");
  assert.equal(body.circles[0].currentAmount, null);
  assert.equal(body.circles[0].targetAmount, null);
  assert.equal(body.nextCursor, "2");
});

test("circle query rejects fractional, partially parsed and unsafe numeric pagination", async () => {
  const { GET } = await route("app/api/v1/circles/route.ts", {
    dependencies: {
      "@/server/repositories/dashboard": {
        loadDashboardCircles: () => {
          throw new Error("must not query");
        },
      },
    },
  });
  for (const query of [
    "limit=1.5",
    "limit=2abc",
    "limit=0",
    "limit=9007199254740992",
    "cursor=-1",
    "cursor=1e2",
    "cursor=3abc",
  ]) {
    assert.equal(
      (await GET(new Request(`https://example.test/api/v1/circles?${query}`)))
        .status,
      400,
      query,
    );
  }
});

test("circle detail denies cross-user IDs and preserves hidden totals", async () => {
  const { GET } = await route("app/api/v1/circles/[id]/route.ts", {
    dependencies: {
      "@/server/repositories/dashboard": {
        loadDashboardCircles: async (uid) => {
          assert.equal(uid, principal.uid);
          return [circle("own-circle", "2026-01-01")];
        },
      },
    },
  });
  const request = new Request(
    "https://example.test/api/v1/circles/other-circle",
  );
  assert.equal(
    (await GET(request, { params: Promise.resolve({ id: "other-circle" }) }))
      .status,
    404,
  );
  const own = await GET(request, {
    params: Promise.resolve({ id: "own-circle" }),
  });
  assert.equal((await own.json()).circle.currentAmount, null);
});

async function deviceRoute(options = {}) {
  const stored = [];
  const removed = [];
  const trusted = [];
  const loaded = await route("app/api/v1/devices/push-token/route.ts", {
    outcome: options.outcome,
    dependencies: {
      "@/server/auth/request": {
        assertTrustedMutation: async (request, user) => {
          trusted.push(user);
          if (options.csrfFailure) throw new Error("invalid csrf");
        },
      },
      "@/server/auth/security": {
        enforceRateLimit: async () => options.allowed !== false,
      },
      "@/server/repositories/device-tokens": {
        registerDeviceToken: async (...args) => {
          if (options.storageFailure) throw new Error("private storage error");
          stored.push(args);
        },
        removeDeviceTokens: async (...args) => {
          removed.push(args);
        },
      },
    },
  });
  return { ...loaded, stored, removed, trusted };
}

const deviceRequest = (body, method = "POST") =>
  new Request("https://example.test/api/v1/devices/push-token", {
    method,
    ...(body === undefined
      ? {}
      : { body: typeof body === "string" ? body : JSON.stringify(body) }),
  });
const token = "test-fcm-registration-token";

async function otpRoute(options = {}) {
  const audits = [];
  const verified = [];
  const limits = new Map();
  const budgets = [];
  const dependencies = {
    "@/server/auth/request": {
      clientKey: (request) =>
        request.headers.get("x-forwarded-for") ?? "test-client",
    },
    "@/server/auth/security": {
      authChallengeFingerprint: () => "test-hash",
      consumeAuthChallenge: async () => options.consumed !== true,
      OTP_MAX_ATTEMPTS: 5,
      OTP_TTL_MS: 600000,
      enforceRateLimit: async (key, limit, ttl) => {
        budgets.push({ key, limit, ttl });
        if (!options.enforceBudget) return options.allowed !== false;
        const count = (limits.get(key) ?? 0) + 1;
        limits.set(key, count);
        return count <= limit;
      },
      verifyEmailOtp: (...args) => {
        verified.push(args);
        return options.result ?? { ok: false, reason: "expired" };
      },
    },
    "@/server/firebase/admin": {
      getFirebaseAdminAuth: () => {
        if (options.failure) throw new Error("private provider failure");
        return {
          getUserByEmail: async () => ({ uid: "verified-user" }),
          createCustomToken: async (uid) => {
            assert.equal(uid, "verified-user");
            return "test-custom-token";
          },
        };
      },
    },
    "@/server/audit": { recordAuthAudit: (event) => audits.push(event) },
    "@/server/repositories/users": {},
  };
  const loaded = await route("app/api/v1/auth/email-otp/verify/route.ts", {
    dependencies,
  });
  return { ...loaded, audits, verified, budgets };
}

const otpRequest = (body) =>
  new Request("https://example.test/api/v1/auth/email-otp/verify", {
    method: "POST",
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

test("OTP verification rejects malformed JSON and incorrect types before verification", async () => {
  const r = await otpRoute();
  for (const body of [
    "{",
    "null",
    { challengeId: 1, code: "123456" },
    { challengeId: "challenge", code: 123456 },
    { challengeId: "challenge", code: "123" },
  ]) {
    assert.equal((await r.POST(otpRequest(body))).status, 400);
  }
  assert.equal(r.verified.length, 0);
});

test("OTP expiration, rate limiting and challenge replay never return credentials", async () => {
  const success = {
    ok: true,
    challenge: { email: "test@example.test", purpose: "sign-in" },
  };
  for (const [options, status] of [
    [{}, 400],
    [{ allowed: false }, 429],
    [{ result: success, consumed: true }, 409],
  ]) {
    const r = await otpRoute(options);
    const response = await r.POST(
      otpRequest({ challengeId: "challenge", code: "123456" }),
    );
    assert.equal(response.status, status);
    assert.equal((await response.json()).customToken, undefined);
  }
});

test("OTP per-challenge attempt budget cannot reset through IP rotation or signed-cookie replay", async () => {
  const r = await otpRoute({ enforceBudget: true });
  for (let attempt = 0; attempt < 6; attempt++) {
    const request = otpRequest({
      challengeId: "same-challenge",
      code: "123456",
    });
    request.headers.set("x-forwarded-for", `192.0.2.${attempt + 1}`);
    request.headers.set("cookie", "old-signed-attempts-cookie");
    const response = await r.POST(request);
    assert.equal(response.status, attempt < 5 ? 400 : 429);
  }
  assert.equal(r.verified.length, 5);
  const challengeBudgets = r.budgets.filter(({ key }) =>
    key.startsWith("otp-challenge:"),
  );
  assert.equal(challengeBudgets.length, 6);
  assert.ok(
    challengeBudgets.every(
      ({ key, limit, ttl }) =>
        key === "otp-challenge:test-hash" && limit === 5 && ttl === 600000,
    ),
  );
});

test("OTP exchange returns no-store credentials only after single-use consumption", async () => {
  const result = {
    ok: true,
    challenge: { email: "test@example.test", purpose: "sign-in" },
  };
  const r = await otpRoute({ result });
  const response = await r.POST(
    otpRequest({ challengeId: "challenge", code: "123456" }),
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal((await response.json()).customToken, "test-custom-token");
  assert.deepEqual(
    r.audits.map((event) => event.outcome),
    ["success"],
  );
});

test("OTP provider errors remain generic and record only an audit outcome", async () => {
  const r = await otpRoute({
    failure: true,
    result: {
      ok: true,
      challenge: { email: "test@example.test", purpose: "sign-in" },
    },
  });
  const response = await r.POST(
    otpRequest({ challengeId: "challenge", code: "123456" }),
  );
  assert.equal(response.status, 500);
  assert.doesNotMatch(
    JSON.stringify(await response.json()),
    /private provider/,
  );
  assert.deepEqual(
    r.audits.map((event) => event.outcome),
    ["failure"],
  );
});

test("device registration persists only verified ownership before acknowledging success", async () => {
  const r = await deviceRoute();
  const response = await r.POST(
    deviceRequest({ token, platform: "ios", userId: "another-user" }),
  );
  assert.equal(response.status, 200);
  assert.deepEqual(r.stored, [[principal.uid, token, "ios"]]);
  assert.equal(r.trusted[0], principal);
  assert.doesNotMatch(JSON.stringify(r.logged), /test-fcm/);
});

test("device registration rejects invalid JSON, token types, platforms and anonymous/suspended users", async () => {
  const r = await deviceRoute();
  for (const body of [
    "{",
    "null",
    "[]",
    { token: 42 },
    { token: "short" },
    { token, platform: "unknown" },
    { token, platform: ["android"] },
  ]) {
    assert.equal((await r.POST(deviceRequest(body))).status, 400);
  }
  assert.equal(r.stored.length, 0);
  for (const [state, status] of [
    ["unauthenticated", 401],
    ["suspended", 403],
  ]) {
    const denied = await deviceRoute({ outcome: { state } });
    assert.equal((await denied.POST(deviceRequest({ token }))).status, status);
    assert.equal(denied.trusted.length, 0);
    assert.equal(denied.stored.length, 0);
  }
});

test("device CSRF, rate and persistence failures never acknowledge success", async () => {
  for (const [options, status] of [
    [{ csrfFailure: true }, 403],
    [{ allowed: false }, 429],
    [{ storageFailure: true }, 500],
  ]) {
    const r = await deviceRoute(options);
    const response = await r.POST(deviceRequest({ token }));
    assert.equal(response.status, status);
    assert.doesNotMatch(
      JSON.stringify(await response.json()),
      /private storage/,
    );
    assert.equal(r.stored.length, 0);
  }
});

test("device removal scopes individual or all-token deletion to verified owner", async () => {
  const r = await deviceRoute();
  assert.equal(
    (await r.DELETE(deviceRequest({ token, userId: "another-user" }, "DELETE")))
      .status,
    200,
  );
  assert.equal(
    (await r.DELETE(deviceRequest(undefined, "DELETE"))).status,
    200,
  );
  assert.deepEqual(r.removed, [
    [principal.uid, token],
    [principal.uid, undefined],
  ]);
});

test("device repository makes registration idempotent by token hash and deletion owner-scoped", async () => {
  const mutations = [];
  const repository = await loadTypescriptModule(
    "server/repositories/device-tokens.ts",
    {
      "server-only": {},
      "node:crypto": { createHash },
      "@/server/firebase/data-connect": {
        getBondCircleDataConnect: () => ({
          executeMutation: async (operation, variables) => {
            mutations.push({ operation, variables });
          },
        }),
      },
    },
  );
  await repository.registerDeviceToken(principal.uid, token, "android");
  await repository.registerDeviceToken(principal.uid, token, "android");
  await repository.removeDeviceTokens(principal.uid, token);
  await repository.removeDeviceTokens(principal.uid);
  assert.equal(mutations[0].variables.tokenId, mutations[1].variables.tokenId);
  assert.equal(
    mutations[0].variables.tokenId,
    createHash("sha256").update(token).digest("hex"),
  );
  assert.equal(mutations[2].variables.userId, principal.uid);
  assert.equal(mutations[3].operation, "DeleteUserDeviceRegistrations");
  assert.deepEqual(Object.keys(mutations[3].variables), ["userId"]);
});
