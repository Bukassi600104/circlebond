import { timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { processRetentionBatch } from "@/server/repositories/retention";

export const runtime = "nodejs";
export const maxDuration = 300;

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
  const result = await processRetentionBatch();
  if (result.failed) {
    return NextResponse.json(
      { error: "One or more retention purges require retry." },
      { status: 503 },
    );
  }
  return NextResponse.json(result);
}
