import assert from "node:assert/strict";
import test from "node:test";
import sharp from "sharp";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

const pricing = await loadTypescriptModule("lib/circle-pricing.ts", {});
const engine = await loadTypescriptModule("server/circles/engine.ts", {
  "../../lib/circle-pricing.ts": pricing,
});
const communication = await loadTypescriptModule(
  "server/communication/rules.ts",
  {},
);
const entitlements = await loadTypescriptModule(
  "server/pricing/entitlements.ts",
  { "../../lib/circle-pricing.ts": pricing },
);
const legal = await loadTypescriptModule("server/auth/legal.ts", {
  "server-only": {},
  "@/server/firebase/data-connect": {},
});
const publicErrors = await loadTypescriptModule("server/public-errors.ts", {
  "@/server/auth/legal": legal,
  "@/server/circles/engine": engine,
  "@/server/communication/rules": communication,
  "@/server/pricing/entitlements": entitlements,
});

test("only checked domain and validation errors may expose messages to callers", () => {
  assert.equal(
    publicErrors.isPublicError(
      new engine.CircleRuleError(
        "Member limit reached",
        "MEMBER_LIMIT_REACHED",
      ),
    ),
    true,
  );
  assert.equal(
    publicErrors.isPublicError(
      new entitlements.PricingRuleError(
        "Choose a higher plan",
        "PLAN_UPGRADE_REQUIRED",
        403,
      ),
    ),
    true,
  );
  assert.equal(
    publicErrors.isPublicError(
      new publicErrors.RequestValidationError("Choose a valid image"),
    ),
    true,
  );
  assert.equal(
    publicErrors.isPublicError(new legal.LegalAcceptanceError()),
    true,
  );
  const unexpected = new Error("private provider details");
  unexpected.name = "CircleRuleError";
  assert.equal(publicErrors.isPublicError(unexpected), false);
  assert.equal(
    publicErrors.isPublicError({
      message: "private details",
      code: "auth/internal-error",
    }),
    false,
  );
});

async function profileRoute(updateUser) {
  return loadTypescriptModule(
    "app/api/profile/route.ts",
    {
      "@/server/public-errors": publicErrors,
      "next/server": { NextResponse: Response },
      "@/server/auth": {
        authenticatePrincipal: async () => ({ uid: "self", scheme: "session" }),
      },
      "@/server/auth/request": {
        assertTrustedMutation: async () => {},
        clientKey: () => "test",
      },
      "@/server/auth/security": { enforceRateLimit: async () => true },
      "@/server/firebase/admin": {
        getFirebaseAdminAuth: () => ({ updateUser }),
      },
      "@/server/repositories/users": {
        updatePersistedDisplayName: async () => {},
      },
    },
    { SyntaxError },
  );
}

test("profile provider errors return a generic failure without internal details", async () => {
  const route = await profileRoute(async () => {
    throw new Error("secret provider response and customer details");
  });
  const response = await route.PATCH(
    new Request("https://example.test/api/profile", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ displayName: "Ada Okafor" }),
    }),
  );
  assert.equal(response.status, 500);
  assert.deepEqual(await response.json(), {
    error: "Unable to update profile.",
  });
});

test("profile validation remains helpful and rejects coerced object input", async () => {
  let writes = 0;
  const route = await profileRoute(async () => {
    writes++;
  });
  for (const displayName of ["A", {}]) {
    const response = await route.PATCH(
      new Request("https://example.test/api/profile", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ displayName }),
      }),
    );
    assert.equal(response.status, 400);
    assert.match((await response.json()).error, /display name/i);
  }
  assert.equal(writes, 0);
});

test("upload rejection remains a caller-safe validation error without decoder details", async () => {
  const { sanitizeUploadedImage } = await loadTypescriptModule(
    "server/uploads/images.ts",
    {
      "server-only": {},
      sharp: { default: sharp },
      "@/server/public-errors": publicErrors,
    },
  );
  for (const file of [
    new File(["image"], "photo.heic", { type: "image/heic" }),
    new File(["private decoder data"], "receipt.png", { type: "image/png" }),
  ]) {
    await assert.rejects(sanitizeUploadedImage(file), (error) => {
      assert.equal(publicErrors.isPublicError(error), true);
      assert.equal(error.message, "Add a JPG, PNG or WebP image up to 5 MB.");
      return true;
    });
  }
});

test("circle creation preserves the legal refusal status and hides unknown failures", async () => {
  const { pricingErrorResponse } = await loadTypescriptModule(
    "server/pricing/http.ts",
    {
      "next/server": { NextResponse: Response },
      "./entitlements.ts": entitlements,
      "@/server/auth/legal": legal,
    },
  );
  const denied = pricingErrorResponse(
    new legal.LegalAcceptanceError(),
    "Unable to create circle.",
  );
  assert.equal(denied.status, 403);
  assert.equal((await denied.json()).code, "LEGAL_ACCEPTANCE_REQUIRED");
  const unknown = pricingErrorResponse(
    new Error("private infrastructure detail"),
    "Unable to create circle.",
  );
  assert.deepEqual(await unknown.json(), { error: "Unable to create circle." });
});
