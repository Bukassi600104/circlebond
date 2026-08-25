import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { getFirebaseAdminStorage } from "@/server/firebase/admin";
import { loadSupportCircle } from "@/server/repositories/support-circles";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ circleId: string }> },
) {
  const session = await authenticatePrincipal(request);
  if (!session) return new NextResponse(null, { status: 401 });
  const { circleId } = await context.params;
  const circle = await loadSupportCircle(circleId, session.uid);
  if (!circle?.imageStoragePath) {
    return new NextResponse(null, { status: 404 });
  }
  const file = getFirebaseAdminStorage().bucket().file(circle.imageStoragePath);
  const [metadata] = await file.getMetadata();
  const [bytes] = await file.download();
  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": metadata.contentType ?? "image/jpeg",
      "Cache-Control": "private, max-age=3600",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
