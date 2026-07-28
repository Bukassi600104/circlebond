import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { getFirebaseAdminStorage } from "@/server/firebase/admin";
import { loadAsoEbiCircle } from "@/server/repositories/aso-ebi-circles";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ circleId: string }> },
) {
  const session = await readSession();
  if (!session) return new NextResponse(null, { status: 401 });
  const { circleId } = await context.params;
  const circle = await loadAsoEbiCircle(circleId, session.uid);
  if (!circle) return new NextResponse(null, { status: 404 });
  const url = new URL(request.url);
  const asset = url.searchParams.get("asset");
  const tierId = url.searchParams.get("tierId");
  let storagePath = asset === "event" ? circle.imageStoragePath : null;
  if (asset !== "event" && tierId) {
    const tier = circle.tiers.find((candidate) => candidate.id === tierId);
    storagePath =
      asset === "fabric"
        ? (tier?.fabricImageStoragePath ?? null)
        : asset === "gift"
          ? (tier?.appreciationGiftImageStoragePath ?? null)
          : null;
  }
  if (!storagePath) return new NextResponse(null, { status: 404 });
  const file = getFirebaseAdminStorage().bucket().file(storagePath);
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
