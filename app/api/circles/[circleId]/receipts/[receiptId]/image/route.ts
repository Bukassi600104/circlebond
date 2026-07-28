import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { canViewReceipt } from "@/server/contributions/engine";
import { getFirebaseAdminStorage } from "@/server/firebase/admin";
import { loadContributionWorkspace } from "@/server/repositories/contributions";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: {
    params: Promise<{ circleId: string; receiptId: string }>;
  },
) {
  const session = await readSession();
  if (!session) return new NextResponse(null, { status: 401 });
  const { circleId, receiptId } = await context.params;
  const workspace = await loadContributionWorkspace(circleId, session.uid);
  if (!workspace) return new NextResponse(null, { status: 404 });
  const receipt = [...workspace.receipts, ...workspace.reviewQueue].find(
    (candidate) => candidate.id === receiptId,
  );
  if (
    !receipt ||
    !canViewReceipt(receipt.uploaderId, session.uid, workspace.viewer.role)
  ) {
    return new NextResponse(null, { status: 404 });
  }
  const file = getFirebaseAdminStorage()
    .bucket()
    .file(receipt.imageStoragePath);
  const [bytes] = await file.download();
  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": receipt.contentType,
      "Cache-Control": "private, no-store",
      "Content-Security-Policy": "default-src 'none'; sandbox",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
