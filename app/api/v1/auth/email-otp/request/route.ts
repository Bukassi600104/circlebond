import { NextResponse } from "next/server";
import { clientKey } from "@/server/auth/request";
import {
  createEmailOtpChallenge,
  enforceRateLimit,
  normalizeDisplayName,
  validateEmailAddress,
} from "@/server/auth/security";
import { sendEmailOtp } from "@/server/auth/email";
import { recordAuthAudit } from "@/server/audit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as {
      email?: string;
      purpose?: "register" | "sign-in" | "recovery";
      displayName?: string;
      termsAccepted?: boolean;
      privacyAccepted?: boolean;
    };

    const developmentMode =
      process.env.AUTH_EMAIL_OTP_MODE === "development" ||
      process.env.NODE_ENV !== "production";

    const email = await validateEmailAddress(input.email ?? "", {
      allowTestDomains: developmentMode,
      checkDomain: !developmentMode,
    });

    if (!input.purpose) {
      return NextResponse.json({ error: "Invalid purpose." }, { status: 400 });
    }

    if (!(await enforceRateLimit(clientKey(request, email), 5, 15 * 60_000))) {
      return NextResponse.json(
        { message: "If the address can be used, a code will arrive shortly." },
        { status: 202 },
      );
    }

    const now = new Date().toISOString();
    const displayName =
      input.purpose === "register"
        ? normalizeDisplayName(input.displayName ?? "")
        : undefined;

    if (
      input.purpose === "register" &&
      (!input.termsAccepted || !input.privacyAccepted)
    ) {
      return NextResponse.json(
        { error: "Legal acceptance required." },
        { status: 400 },
      );
    }

    const { challenge, challengeToken, code } = createEmailOtpChallenge({
      email,
      purpose: input.purpose,
      displayName,
      termsAcceptedAt: input.termsAccepted ? now : undefined,
      privacyAcceptedAt: input.privacyAccepted ? now : undefined,
    });

    const delivery = await sendEmailOtp({ code, email });

    return NextResponse.json(
      {
        challengeId: challengeToken,
        expiresAt: challenge.expiresAt,
        message: "If the address can be used, a code will arrive shortly.",
        delivery,
        ...(delivery === "development" ? { developmentCode: code } : {}),
      },
      { status: 202 },
    );
  } catch (error) {
    recordAuthAudit({
      event: "verification",
      outcome: "failure",
      channel: "email",
    });
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to send a code. Check the details and try again.",
      },
      { status: 400 },
    );
  }
}
