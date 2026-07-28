import nodemailer from "nodemailer";

export type EmailOtpDelivery = "development" | "sent";

export async function sendEmailOtp({
  code,
  email,
}: {
  code: string;
  email: string;
}): Promise<EmailOtpDelivery> {
  if (
    process.env.AUTH_EMAIL_OTP_MODE === "development" ||
    process.env.NODE_ENV !== "production"
  ) {
    console.info(
      JSON.stringify({
        level: "info",
        message: "development_email_otp",
        email,
        code,
      }),
    );
    return "development";
  }

  const smtpUrl = process.env.AUTH_EMAIL_SMTP_URL;
  const from = process.env.AUTH_EMAIL_FROM;
  if (!smtpUrl || !from) {
    throw new Error("Email delivery is not configured.");
  }

  const transport = nodemailer.createTransport(smtpUrl);
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
