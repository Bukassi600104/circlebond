import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const principal = await authenticatePrincipal(request);
    if (!principal) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 },
      );
    }

    const body = (await request.json()) as { token?: string; platform?: string };
    const token = body.token?.trim();
    if (!token || token.length < 10 || token.length > 500) {
      return NextResponse.json(
        { error: "Valid FCM device token is required." },
        { status: 400 },
      );
    }

    logger.info("fcm_device_token_registered", {
      userId: principal.uid,
      platform: body.platform ?? "android",
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to register push token.",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const principal = await authenticatePrincipal(request);
    if (!principal) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401 },
      );
    }

    logger.info("fcm_device_token_removed", {
      userId: principal.uid,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to remove push token.",
      },
      { status: 500 },
    );
  }
}
