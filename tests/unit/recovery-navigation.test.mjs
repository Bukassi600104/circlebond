import assert from "node:assert/strict";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

for (const [next, expected, blockedStorage] of [
  ["/invite/demo-token?source=whatsapp", "/invite/demo-token?source=whatsapp"],
  ["https://external.example", "/account"],
  ["//external.example", "/account"],
  ["/\\external.example", "/account"],
  ["/invite/storage-denied", "/invite/storage-denied", true],
]) {
  test(`account recovery retains only an internal continuation (${JSON.stringify(next)})`, async () => {
    let index = 0;
    const navigated = [];
    const jsx = (type, props) => ({ type, props });
    const { RecoveryForm } = await loadTypescriptModule(
      "features/auth/components.tsx",
      {
        "react/jsx-runtime": { jsx, jsxs: jsx },
        react: {
          useState: (initial) => [
            index++ === 0 ? "recovery@example.com" : initial,
            () => {},
          ],
        },
        "next/navigation": {
          useRouter: () => ({ push: (path) => navigated.push(path) }),
          useSearchParams: () => new URLSearchParams({ next }),
        },
        "next/link": { default: () => null },
        "lucide-react": {},
        "@/components/ui": { Button: () => null },
        "@/components/legal/LegalModal": {},
        "@/components/forms": { EmailInput: () => null },
        "./client": {},
      },
      {
        Error,
        AbortController,
        DOMException,
        window: { setTimeout, clearTimeout },
        sessionStorage: {
          setItem() {
            if (blockedStorage) throw new Error("Storage denied");
          },
          getItem() {
            return null;
          },
          removeItem() {},
        },
        fetch: async () =>
          Response.json({
            challengeId: "synthetic-challenge",
            expiresAt: Date.now() + 600000,
          }),
      },
    );
    const form = RecoveryForm();
    await form.props.onSubmit({ preventDefault() {} });
    assert.equal(navigated.length, 1);
    const destination = new URL(navigated[0], "https://example.test");
    assert.equal(destination.pathname, "/verify");
    assert.equal(destination.searchParams.get("purpose"), "recovery");
    assert.equal(destination.searchParams.get("next"), expected);
    const back = form.props.children.find((node) => node?.props?.href);
    assert.equal(
      new URL(back.props.href, "https://example.test").searchParams.get("next"),
      expected,
    );
  });
}

test("optional Google redirect storage cannot crash email or phone sign-in", async () => {
  const client = await loadTypescriptModule(
    "features/auth/client.ts",
    {
      "firebase/auth": {},
      "@/lib/firebase/client": {},
    },
    {
      window: {
        get sessionStorage() {
          throw new Error("Storage denied");
        },
      },
    },
  );
  assert.equal(client.hasPendingGoogleRedirect(), false);
});
