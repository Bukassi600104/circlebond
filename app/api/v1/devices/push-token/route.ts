import { apiJson } from "@/app/api/v1/_response";
import { authenticateNativeRequest } from "@/server/auth/native";
import { assertTrustedMutation } from "@/server/auth/request";
import { enforceRateLimit } from "@/server/auth/security";
import {
  registerDeviceToken,
  removeDeviceTokens,
} from "@/server/repositories/device-tokens";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";

function validToken(token: unknown): token is string {
  return (
    typeof token === "string" &&
    token.length >= 10 &&
    token.length <= 500 &&
    !/\s/.test(token)
  );
}

async function mutate(request: Request, removing: boolean) {
  try {
    const outcome = await authenticateNativeRequest(request);
    if (outcome.state === "unauthenticated") {
      return apiJson({ error: "Authentication required." }, { status: 401 });
    }
    if (outcome.state === "suspended") {
      return apiJson({ error: "Account suspended." }, { status: 403 });
    }
    const { principal } = outcome;
    try {
      await assertTrustedMutation(request, principal);
    } catch {
      return apiJson(
        { error: "Request verification failed." },
        { status: 403 },
      );
    }

    const text = await request.text();
    let body: unknown;
    try {
      body = text ? JSON.parse(text) : {};
    } catch {
      return apiJson(
        { error: "A valid JSON request is required." },
        { status: 400 },
      );
    }
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return apiJson(
        { error: "A valid JSON object is required." },
        { status: 400 },
      );
    }
    const { token, platform = "android" } = body as Record<string, unknown>;
    if ((!removing || token !== undefined) && !validToken(token)) {
      return apiJson(
        { error: "Valid FCM device token is required." },
        { status: 400 },
      );
    }
    if (
      !removing &&
      (typeof platform !== "string" ||
        !["android", "ios", "web"].includes(platform))
    ) {
      return apiJson(
        { error: "Platform must be android, ios or web." },
        { status: 400 },
      );
    }
    if (
      !(await enforceRateLimit(
        `device-token:${principal.uid}`,
        30,
        15 * 60_000,
      ))
    ) {
      return apiJson(
        { error: "Too many device registration requests." },
        { status: 429 },
      );
    }

    if (removing) {
      await removeDeviceTokens(principal.uid, token as string | undefined);
    } else {
      await registerDeviceToken(
        principal.uid,
        token as string,
        platform as "android" | "ios" | "web",
      );
    }
    return apiJson({ success: true }, { status: 200 });
  } catch {
    logger.error("native_device_registration_failed");
    return apiJson(
      { error: "Device registration is temporarily unavailable." },
      { status: 500 },
    );
  }
}

export function POST(request: Request) {
  return mutate(request, false);
}

export function DELETE(request: Request) {
  return mutate(request, true);
}
