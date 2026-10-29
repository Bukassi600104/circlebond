import nodemailer from "nodemailer";

export type EmailOtpDelivery = "development" | "sent";

export async function sendEmailOtp({
  code,
  email,
}: {
  code: string;
  email: string;
}): Promise<EmailOtpDelivery> {
  if (process.env.NODE_ENV !== "production") return "development";

  const smtpUrl = process.env.AUTH_EMAIL_SMTP_URL;
  const from = process.env.AUTH_EMAIL_FROM;
  if (process.env.AUTH_EMAIL_OTP_MODE !== "production" || !smtpUrl || !from) {
    throw new Error("Email delivery is not configured.");
  }

  const transport = nodemailer.createTransport(smtpUrl, {
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
  await transport.sendMail({
    from,
    to: email,
    subject: "Your BondCircle verification code",
    text: [
      `Your BondCircle verification code is ${code}.`,
      "",
      "This code expires in 10 minutes and can be used only once.",
      "If you did not request this code, you can ignore this email.",
    ].join("\n"),
  });
  return "sent";
}
