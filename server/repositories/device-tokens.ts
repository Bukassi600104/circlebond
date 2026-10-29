import "server-only";

import { createHash } from "node:crypto";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";

function tokenId(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function registerDeviceToken(
  userId: string,
  token: string,
  platform: "android" | "ios" | "web",
) {
  await getBondCircleDataConnect().executeMutation(
    "RegisterDeviceRegistration",
    {
      tokenId: tokenId(token),
      userId,
      token,
      platform,
      updatedAt: new Date().toISOString(),
    },
  );
}

export async function removeDeviceTokens(userId: string, token?: string) {
  await getBondCircleDataConnect().executeMutation(
    token ? "DeleteDeviceRegistration" : "DeleteUserDeviceRegistrations",
    { userId, ...(token ? { tokenId: tokenId(token) } : {}) },
  );
}

export async function loadDeviceRegistrationMetadata(userId: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    { deviceRegistrations: Array<{ platform: string; updatedAt: string }> },
    { userId: string }
  >("GetUserDeviceRegistrations", { userId });
  return response.data.deviceRegistrations;
}
