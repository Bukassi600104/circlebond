export type PaymentAccountInput = {
  bankName: string;
  accountName: string;
  accountNumber: string;
};

export function validatePaymentAccountInput(
  input: PaymentAccountInput,
): PaymentAccountInput {
  const bankName = input.bankName.trim().replace(/\s+/g, " ");
  const accountName = input.accountName.trim().replace(/\s+/g, " ");
  const accountNumber = input.accountNumber.trim();
  if (
    bankName.length < 2 ||
    bankName.length > 80 ||
    accountName.length < 2 ||
    accountName.length > 100 ||
    !/^\d{10}$/.test(accountNumber)
  ) {
    throw new Error(
      "Add a bank name, account name and valid 10-digit account number.",
    );
  }
  if (/^(\d)\1{9}$/.test(accountNumber)) {
    throw new Error("Enter a real bank account number.");
  }
  if (
    /\b(test|dummy|fictitious|example)\b/i.test(`${bankName} ${accountName}`)
  ) {
    throw new Error("Test or placeholder payment details are not accepted.");
  }
  if (!/[\p{L}\p{N}]/u.test(bankName) || !/[\p{L}\p{N}]/u.test(accountName)) {
    throw new Error("Enter valid payment account details.");
  }
  return { bankName, accountName, accountNumber };
}
