import assert from "node:assert/strict";
import test from "node:test";
import { validatePaymentAccountInput } from "../../server/payments/account-rules.ts";

test("obvious placeholder payment destinations fail closed", () => {
  assert.throws(
    () =>
      validatePaymentAccountInput({
        bankName: "Test Bank",
        accountName: "BondCircle QA Test",
        accountNumber: "0000000000",
      }),
    /real|test|placeholder/i,
  );
  assert.throws(() =>
    validatePaymentAccountInput({
      bankName: "Example Bank",
      accountName: "Ada Okafor",
      accountNumber: "0123456789",
    }),
  );
});

test("payment input normalization never claims provider verification", () => {
  assert.deepEqual(
    validatePaymentAccountInput({
      bankName: "  Exampleless Commercial Bank  ",
      accountName: "  Ada   Okafor ",
      accountNumber: "0123456789",
    }),
    {
      bankName: "Exampleless Commercial Bank",
      accountName: "Ada Okafor",
      accountNumber: "0123456789",
    },
  );
});
