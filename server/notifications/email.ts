import "server-only";

import nodemailer from "nodemailer";
import type { NotificationType } from "@/server/notifications/rules";

export async function sendCriticalNotificationEmail(input: {
  to: string;
  type: NotificationType;
  title: string;
  body: string;
  deepLink: string;
  idempotencyKey: string;
}) {
  if (
    process.env.AUTH_EMAIL_OTP_MODE === "development" ||
    process.env.NODE_ENV !== "production"
  ) {
    return { messageId: `development:${input.idempotencyKey}` };
  }
  const smtpUrl = process.env.AUTH_EMAIL_SMTP_URL;
  const from = process.env.AUTH_EMAIL_FROM;
  if (!smtpUrl || !from) throw new Error("Email delivery is not configured.");

  const origin =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
    "https://www.bondcircles.com";
  const url = new URL(input.deepLink, origin).toString();
  const transport = nodemailer.createTransport(smtpUrl);
  const result = await transport.sendMail({
    from,
    to: input.to,
    subject: `${input.title} · BondCircle`,
    text: [
      input.body,
      "",
      `Open BondCircle securely: ${url}`,
      "",
      "For your privacy, sensitive payment details are never included in notification emails.",
    ].join("\n"),
    headers: { "X-BondCircle-Idempotency-Key": input.idempotencyKey },
  });
  return { messageId: result.messageId };
}
