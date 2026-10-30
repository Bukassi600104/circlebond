import assert from "node:assert/strict";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

const circleId = "00000000-0000-4000-8000-000000000001";
const cases = [
  [
    "CircleActivationPanel",
    {
      circleId,
      planLabel: "Starter",
      priceLabel: "₦1,500",
      status: "pending_payment",
    },
    "activation",
  ],
  [
    "CircleUpgradePanel",
    {
      circleId,
      options: [
        {
          plan: "standard",
          priceLabel: "₦2,000",
          memberLimit: 30,
          coAdminLimit: 1,
        },
      ],
    },
    "upgrade",
  ],
  ["VerifyActivationPayment", { circleId }, "activation/verify"],
];

function findButton(node) {
  if (Array.isArray(node)) return node.map(findButton).find(Boolean);
  if (!node || typeof node !== "object") return undefined;
  if (node.type === "button") return node;
  return findButton(node.props?.children);
}

async function clickControl(name, props, tokenStatus = 200) {
  const calls = [];
  const messages = [];
  const done = Promise.withResolvers();
  let stateIndex = 0;
  const fetch = async (path, options) => {
    calls.push({ path, options });
    return path === "/api/auth/csrf"
      ? Response.json({ csrfToken: "csrf-fixture" }, { status: tokenStatus })
      : Response.json({
          status: "pending",
          checkoutUrl: "https://checkout.paystack.com/test-only",
        });
  };
  const auth = await loadTypescriptModule(
    "features/auth/client.ts",
    {
      "firebase/auth": {},
      "@/lib/firebase/client": {},
    },
    { fetch, Error },
  );
  const jsx = (type, props) => ({ type, props });
  const component = await loadTypescriptModule(
    `components/pricing/${name}.tsx`,
    {
      "react/jsx-runtime": { jsx, jsxs: jsx },
      react: {
        useState: (initial) => {
          const index = stateIndex++;
          return [
            initial,
            (value) => {
              if (index === 0 && (value === false || value === ""))
                done.resolve();
              if (index === 1) messages.push(value);
            },
          ];
        },
      },
      "next/navigation": { useRouter: () => ({ refresh() {} }) },
      "@/features/auth/client": { csrfToken: auth.csrfToken },
      "./VerifyActivationPayment": { VerifyActivationPayment: () => null },
    },
    { fetch, window: { location: { assign() {} } }, Error },
  );
  const button = findButton(component[name](props));
  assert.ok(button, "Payment control must render a working action");
  button.props.onClick();
  await done.promise;
  return { calls, messages };
}

for (const [name, props, suffix] of cases) {
  test(
    `${name} obtains CSRF before posting its actual payment action`,
    { timeout: 10_000 },
    async () => {
      const { calls } = await clickControl(name, props);
      assert.equal(calls.length, 2);
      assert.equal(calls[0].path, "/api/auth/csrf");
      assert.equal(calls[0].options.cache, "no-store");
      assert.equal(calls[1].path, `/api/circles/${circleId}/${suffix}`);
      assert.equal(calls[1].options.method, "POST");
      assert.equal(calls[1].options.headers["X-CSRF-Token"], "csrf-fixture");
    },
  );
  test(
    `${name} cannot post when the CSRF request fails`,
    { timeout: 10_000 },
    async () => {
      const { calls, messages } = await clickControl(name, props, 503);
      assert.equal(calls.length, 1);
      assert.ok(messages.some((message) => /secure session/i.test(message)));
    },
  );
}
