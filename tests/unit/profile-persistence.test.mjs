import assert from "node:assert/strict";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

async function repository(upsert) {
  const logs = [];
  const repo = await loadTypescriptModule(
    "server/repositories/users.ts",
    {
      "@/server/firebase/data-connect": {
        getBondCircleDataConnect: () => ({ upsert }),
      },
      "@/lib/logger": { logger: { warn: (...args) => logs.push(args) } },
    },
    { process: { env: {} } },
  );
  return { ...repo, logs };
}

test("partial profile writes preserve omitted contact, photo and legal fields", async () => {
  const stored = {
    phone: "+2348000000000",
    profileImage: "/private-photo",
    termsAcceptedAt: "2026-10-29",
    privacyAcceptedAt: "2026-10-29",
  };
  const repo = await repository(async (table, fields) => {
    assert.equal(table, "User");
    assert.equal(Object.values(fields).includes(undefined), false);
    Object.assign(stored, fields);
  });
  await repo.persistUserProfile({
    id: "self",
    displayName: "Ada",
    email: "ada@example.test",
    phone: undefined,
  });
  assert.equal(stored.phone, "+2348000000000");
  assert.equal(stored.profileImage, "/private-photo");
  assert.equal(stored.termsAcceptedAt, "2026-10-29");
  assert.equal(stored.privacyAcceptedAt, "2026-10-29");
  await repo.persistUserProfile({
    id: "self",
    displayName: "Ada",
    profileImage: null,
  });
  assert.equal(stored.profileImage, null);
});

test("profile writes report persistence failures without logging provider details", async () => {
  const repo = await repository(async () => {
    throw new Error("private database details");
  });
  await assert.rejects(
    repo.updatePersistedDisplayName("self", "Ada"),
    /private database details/,
  );
  await assert.rejects(
    repo.persistUserProfile(
      { id: "self", displayName: "Ada" },
      { strict: true },
    ),
  );
  assert.doesNotMatch(JSON.stringify(repo.logs), /private database details/);
});

test("sign-in, registration and policy pages reject external continuation tricks", async () => {
  for (const file of [
    "app/sign-in/page.tsx",
    "app/register/page.tsx",
    "app/legal/accept/page.tsx",
  ]) {
    const page = await loadTypescriptModule(file, {
      "react/jsx-runtime": { jsx: (type, props) => ({ type, props }) },
      "@/components/auth/AuthShell": { AuthShell: "shell" },
      "@/features/auth/components": {
        SignInForm: "form",
        RegisterForm: "form",
        LegalAcceptanceForm: "form",
      },
      "@/server/auth": { requireSession: async () => ({ uid: "self" }) },
    });
    for (const [next, expected] of [
      ["/invite/test", "/invite/test"],
      ["//external.test", "/account"],
      ["/\\external.test", "/account"],
      ["/\nexternal.test", "/account"],
    ]) {
      const element = await page.default({
        searchParams: Promise.resolve({ next }),
      });
      assert.equal(
        element.props.children.props.nextPath,
        expected,
        `${file}: ${JSON.stringify(next)}`,
      );
    }
  }
});
