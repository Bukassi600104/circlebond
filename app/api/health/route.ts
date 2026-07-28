import { NextResponse } from "next/server";
import { getFoundationConfigStatus } from "@/lib/env";

export async function GET() {
  const { firebaseConfigured, sqlConnectConfigured } =
    getFoundationConfigStatus();
  const healthy = firebaseConfigured && sqlConnectConfigured;

  return NextResponse.json(
    {
      status: healthy ? "ok" : "degraded",
      application: "ok",
      firebase: firebaseConfigured ? "configured" : "not_configured",
      sqlConnect: sqlConnectConfigured ? "configured" : "not_configured",
      environment: process.env.NODE_ENV ?? "development",
      timestamp: new Date().toISOString(),
    },
    { status: healthy ? 200 : 503 },
  );
}
