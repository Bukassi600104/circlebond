import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

async function load(path, dependencies, globals = {}) {
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
        jsx: ts.JsxEmit.ReactJSX,
      },
    }).outputText,
    {
      exports,
      require: (id) => {
        assert.ok(Object.hasOwn(dependencies, id), id);
        return dependencies[id];
      },
      Error,
      ...globals,
    },
  );
  return exports;
}

const nextResponse = {
  json(body, init) {
    const response = Response.json(body, init);
    response.cookies = { set() {} };
    return response;
  },
};

test("onboarding can continue when the browser blocks local storage", async () => {
  let target;
  const { default: OnboardingPage } = await load(
    "app/onboarding/page.tsx",
    {
      react: { useState: () => [0, () => {}] },
      "react/jsx-runtime": {
        jsx: (type, props) => ({ type, props }),
        jsxs: (type, props) => ({ type, props }),
      },
      "next/image": {},
      "@/components/layout": {},
      "@/components/ui": {},
      "next/navigation": {
        useRouter: () => ({
          push: (path) => {
            target = path;
          },
        }),
      },
    },
    {
      localStorage: {
        setItem: () => {
          throw new Error("storage blocked");
        },
      },
    },
  );
  const tree = OnboardingPage();
  tree.props.children[0].props.children[1].props.onClick();
  assert.equal(target, "/sign-in");
});

test("policy acceptance preserves unrelated claims and cannot acknowledge failed persistence", async () => {
  for (const failed of [false, true]) {
    const claims = [];
    const route = await load("app/api/auth/legal/route.ts", {
      "next/server": { NextResponse: nextResponse },
      "@/server/auth/request": { assertTrustedMutation: async () => {} },
      "@/server/auth": {
        authenticatePrincipal: async () => ({
          uid: "self",
          decoded: { name: "Member" },
        }),
      },
      "@/server/firebase/admin": {
        getFirebaseAdminAuth: () => ({
          getUser: async () => ({ customClaims: { owner: true } }),
          updateUser: async () => {},
          setCustomUserClaims: async (_, value) => claims.push(value),
        }),
      },
      "@/server/repositories/users": {
        persistUserProfile: async (profile, options) => {
          assert.equal(profile.id, "self");
          assert.equal(options.strict, true);
          if (failed) throw new Error("database unavailable");
        },
      },
    });
    const response = await route.POST(
      new Request("https://example.test", {
        method: "POST",
        body: JSON.stringify({ termsAccepted: true, privacyAccepted: true }),
      }),
    );
    assert.equal(response.status, failed ? 400 : 200);
    if (failed) assert.equal(claims.length, 0);
    else {
      assert.equal(claims[0].owner, true);
      assert.ok(claims[0].termsAcceptedAt);
      assert.ok(claims[0].privacyAcceptedAt);
    }
    const before = claims.length;
    for (const termsAccepted of [false, "false", 1]) {
      const invalid = await route.POST(
        new Request("https://example.test", {
          method: "POST",
          body: JSON.stringify({ termsAccepted, privacyAccepted: true }),
        }),
      );
      assert.equal(invalid.status, 400);
    }
    assert.equal(claims.length, before);
  }
});

test("session recreation preserves persisted acceptance when ID token claims are stale", async () => {
  let saved;
  const route = await load("app/api/auth/session/route.ts", {
    "next/headers": {},
    "next/server": { NextResponse: nextResponse },
    "@/server/auth": {
      createSessionCookie: async () => "fixture",
      sessionCookieOptions: () => ({}),
    },
    "@/server/auth/request": {
      assertTrustedMutation: async () => {},
      clientKey: () => "test",
    },
    "@/server/auth/security": { enforceRateLimit: async () => true },
    "@/server/auth/verified-contact": await load(
      "server/auth/verified-contact.ts",
      {},
    ),
    "@/server/audit": { recordAuthAudit() {} },
    "@/server/firebase/admin": {
      getFirebaseAdminAuth: () => ({
        verifyIdToken: async () => ({
          uid: "self",
          name: "Stale name",
          email: "member@example.test",
          email_verified: true,
        }),
      }),
    },
    "@/server/repositories/users": {
      persistUserProfile: async (profile) => {
        saved = profile;
      },
    },
    "@/server/auth/legal": {
      loadLegalAcceptance: async () => ({
        displayName: "Updated member",
        termsAcceptedAt: "2026-10-29T12:00:00Z",
        privacyAcceptedAt: "2026-10-29T12:00:00Z",
      }),
    },
  });
  const response = await route.POST(
    new Request("https://example.test", {
      method: "POST",
      body: JSON.stringify({ idToken: "test-token" }),
    }),
  );
  assert.equal(response.status, 200);
  assert.equal((await response.json()).needsLegalAcceptance, false);
  assert.equal(saved.termsAcceptedAt, "2026-10-29T12:00:00Z");
  assert.equal(saved.privacyAcceptedAt, "2026-10-29T12:00:00Z");
  assert.equal(saved.displayName, "Updated member");
});

test("dialog overlay uses native modal isolation, backdrop/Escape dismissal and cleanup", async () => {
  let effect;
  let opened = 0;
  let closed = 0;
  let dismissed = 0;
  let prevented = 0;
  const document = { body: { style: { overflow: "scroll" } } };
  const { DialogOverlay } = await load(
    "components/ui/DialogOverlay.tsx",
    {
      react: {
        useRef: () => ({
          current: { showModal: () => opened++, close: () => closed++ },
        }),
        useEffect: (callback) => {
          effect = callback;
        },
      },
      "react/jsx-runtime": { jsx: (type, props) => ({ type, props }) },
    },
    { document },
  );
  const element = DialogOverlay({
    children: "Content",
    className: "test",
    labelledBy: "title",
    onClose: () => dismissed++,
  });
  assert.equal(element.type, "dialog");
  const cleanup = effect();
  assert.equal(opened, 1);
  assert.equal(document.body.style.overflow, "hidden");
  element.props.onMouseDown({ target: "content", currentTarget: "backdrop" });
  assert.equal(dismissed, 0);
  element.props.onMouseDown({ target: "backdrop", currentTarget: "backdrop" });
  element.props.onCancel({ preventDefault: () => prevented++ });
  assert.equal(dismissed, 2);
  assert.equal(prevented, 1);
  cleanup();
  assert.equal(closed, 1);
  assert.equal(document.body.style.overflow, "scroll");
});

test("persisted policy acceptance fails closed for missing, incomplete, suspended and unavailable accounts", async () => {
  let user;
  let outage = false;
  const legal = await load("server/auth/legal.ts", {
    "server-only": {},
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => ({
        executeQuery: async (name, input) => {
          assert.equal(name, "GetUserBootstrapProfile");
          assert.equal(input.userId, "member");
          if (outage) throw new Error("database unavailable");
          return { data: { user } };
        },
      }),
    },
  });
  for (user of [
    undefined,
    { accountStatus: "active" },
    { accountStatus: "active", termsAcceptedAt: "2026-10-29" },
    {
      accountStatus: "suspended",
      termsAcceptedAt: "2026-10-29",
      privacyAcceptedAt: "2026-10-29",
    },
  ]) {
    await assert.rejects(
      legal.assertLegalAcceptance("member"),
      (error) =>
        error.code === "LEGAL_ACCEPTANCE_REQUIRED" && error.status === 403,
    );
  }
  user = {
    accountStatus: "active",
    termsAcceptedAt: "2026-10-29",
    privacyAcceptedAt: "2026-10-29",
  };
  await legal.assertLegalAcceptance("member");
  outage = true;
  await assert.rejects(
    legal.assertLegalAcceptance("member"),
    /database unavailable/,
  );
});

test("shared circle creation and membership writes cannot bypass legal acceptance", async () => {
  let writes = 0;
  const checked = [];
  const { FirebaseCircleStore } = await load("server/repositories/circles.ts", {
    "server-only": {},
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => ({
        executeMutation: async () => {
          writes++;
        },
      }),
    },
    "@/server/auth/legal": {
      assertLegalAcceptance: async (userId) => {
        checked.push(userId);
        throw new Error("acceptance required");
      },
    },
    "@/lib/circle-pricing": {},
  });
  const store = new FirebaseCircleStore();
  await assert.rejects(store.createDraft({}, "creator"), /acceptance required/);
  await assert.rejects(
    store.addMember({}, "creator", "member", "member"),
    /acceptance required/,
  );
  assert.deepEqual(checked, ["creator", "member"]);
  assert.equal(writes, 0);
});

test("invitation acceptance requires persisted acceptance before admitting membership", async () => {
  let writes = 0;
  const invitations = await load("server/repositories/invitations.ts", {
    "@/server/repositories/pages": {},
    "server-only": {},
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => ({
        executeMutation: async () => {
          writes++;
        },
      }),
    },
    "@/server/auth/legal": {
      assertLegalAcceptance: async () => {
        throw new Error("acceptance required");
      },
    },
    "@/server/circles/engine": {},
    "@/server/repositories/circles": {
      firebaseCircleStore: { memberCount: async () => 1 },
    },
    "@/server/invitations/rules": { invitationMatchesUser: () => true },
    "@/server/repositories/notifications": {},
    "@/server/pricing": {},
  });
  await assert.rejects(
    invitations.respondToInvitation(
      {
        effectiveState: "sent",
        state: "sent",
        acceptances: [],
        circle: { id: "circle" },
      },
      { id: "member" },
      "accept",
    ),
    /acceptance required/,
  );
  assert.equal(writes, 0);
});

test("returning and reduced-motion splash navigation skips the decorative wait even if storage is unavailable", async () => {
  const source = await readFile(
    new URL("../../app/page.tsx", import.meta.url),
    "utf8",
  );
  for (const scenario of [
    { returning: true, reduced: false, delay: 0, target: "/account" },
    { returning: false, reduced: true, delay: 0, target: "/onboarding" },
    { throws: true, reduced: false, delay: 3200, target: "/onboarding" },
  ]) {
    let effect;
    let delay;
    let target;
    const dependencies = {
      "react/jsx-runtime": { jsx: () => ({}), jsxs: () => ({}) },
      react: {
        useEffect: (fn) => {
          effect = fn;
        },
      },
      "next/navigation": {
        useRouter: () => ({
          replace: (path) => {
            target = path;
          },
        }),
      },
      "next/link": {},
      "next/image": {},
    };
    const exports = {};
    runInNewContext(
      ts.transpileModule(source, {
        compilerOptions: {
          module: ts.ModuleKind.CommonJS,
          jsx: ts.JsxEmit.ReactJSX,
          esModuleInterop: true,
        },
      }).outputText,
      {
        exports,
        require: (id) => dependencies[id],
        localStorage: {
          getItem: () => {
            if (scenario.throws) throw new Error("blocked storage");
            return scenario.returning ? "true" : null;
          },
        },
        window: {
          matchMedia: () => ({ matches: scenario.reduced }),
          setTimeout: (fn, ms) => {
            delay = ms;
            fn();
          },
          clearTimeout() {},
        },
      },
    );
    exports.default();
    effect();
    assert.equal(delay, scenario.delay);
    assert.equal(target, scenario.target);
  }
});
