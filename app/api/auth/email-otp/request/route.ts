import { NextResponse } from "next/server";
import { clientKey } from "@/server/auth/request";
import {
  createEmailOtpChallenge,
  enforceRateLimit,
  normalizeDisplayName,
  validateEmailAddress,
  OTP_ATTEMPTS_COOKIE,
  sealOtpAttempts,
} from "@/server/auth/security";
import { sendEmailOtp } from "@/server/auth/email";
import { recordAuthAudit } from "@/server/audit";

export async function POST(request: Request) {
  try {
    if (
      !(await enforceRateLimit(
        clientKey(request, "otp-request"),
        120,
        15 * 60_000,
      ))
    ) {
      return NextResponse.json(
        { error: "Too many requests. Try again shortly." },
        { status: 429, headers: { "Retry-After": "900" } },
      );
    }
    const input = (await request.json()) as {
      email?: string;
      purpose?: "register" | "sign-in" | "recovery";
      displayName?: string;
      termsAccepted?: boolean;
      privacyAccepted?: boolean;
    };
    if (!["register", "sign-in", "recovery"].includes(input.purpose ?? ""))
      throw new Error("Invalid purpose.");
    const developmentMode = process.env.NODE_ENV !== "production";
    const email = await validateEmailAddress(input.email ?? "", {
      allowTestDomains: developmentMode,
      checkDomain: !developmentMode,
    });
    if (!(await enforceRateLimit(`otp-address:${email}`, 5, 15 * 60_000))) {
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
      (input.termsAccepted !== true || input.privacyAccepted !== true)
    ) {
      throw new Error("Legal acceptance required.");
    }

    const { challenge, challengeToken, code } = createEmailOtpChallenge({
      email,
      purpose: input.purpose!,
      displayName,
      termsAcceptedAt:
        input.purpose === "register" && input.termsAccepted === true
          ? now
          : undefined,
      privacyAcceptedAt:
        input.purpose === "register" && input.privacyAccepted === true
          ? now
          : undefined,
    });

    const delivery = await sendEmailOtp({ code, email });

    const response = NextResponse.json(
      {
        challengeId: challengeToken,
        expiresAt: challenge.expiresAt,
        message: "If the address can be used, a code will arrive shortly.",
        delivery,
        ...(developmentMode && delivery === "development"
          ? { developmentCode: code }
          : {}),
      },
      { status: 202 },
    );
    response.cookies.set(
      OTP_ATTEMPTS_COOKIE,
      sealOtpAttempts(challenge.id, 0),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/api/auth/email-otp",
        maxAge: 10 * 60,
      },
    );
    return response;
  } catch {
    recordAuthAudit({
      event: "verification",
      outcome: "failure",
      channel: "email",
    });
    return NextResponse.json(
      { error: "Unable to send a code. Check the details and try again." },
      { status: 400 },
    );
  }
}
