import { NextResponse } from "next/server";
import { authenticatePrincipal } from "@/server/auth";
import { getFirebaseAdminStorage } from "@/server/firebase/admin";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  context: { params: Promise<{ userId: string }> },
) {
  const session = await authenticatePrincipal(request);
  if (!session) return new NextResponse(null, { status: 401 });
  const { userId } = await context.params;
  if (!/^[A-Za-z0-9:_-]{1,128}$/.test(userId)) {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const file = getFirebaseAdminStorage()
      .bucket()
      .file(`users/${userId}/profile/photo`);
    const [metadata] = await file.getMetadata();
    const [bytes] = await file.download();
    return new NextResponse(new Uint8Array(bytes), {
      headers: {
        "Content-Type": metadata.contentType ?? "image/jpeg",
        "Cache-Control": "private, max-age=3600",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse(null, { status: 404 });
  }
}
