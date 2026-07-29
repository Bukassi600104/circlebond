import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { processDeadlineNotifications } from "@/server/repositories/notifications";

export const runtime = "nodejs";

function authorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  const header = request.headers.get("authorization");
  if (!secret || !header?.startsWith("Bearer ")) return false;
  const received = Buffer.from(header.slice(7));
  const expected = Buffer.from(secret);
  return (
    received.length === expected.length && timingSafeEqual(received, expected)
  );
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }
  try {
    return NextResponse.json(await processDeadlineNotifications());
  } catch {
    return NextResponse.json(
      { error: "Deadline notifications could not be processed." },
      { status: 500 },
    );
  }
}
