import { NextResponse } from "next/server";
import { readSession } from "@/server/auth";
import { assertTrustedMutation, clientKey } from "@/server/auth/request";
import { enforceRateLimit } from "@/server/auth/security";
import {
  getFirebaseAdminAuth,
  getFirebaseAdminStorage,
} from "@/server/firebase/admin";
import { persistUserProfile } from "@/server/repositories/users";
import { sanitizeUploadedImage } from "@/server/uploads/images";

export const runtime = "nodejs";

function isMissingBucketError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const candidate = error as { code?: number | string; message?: string };
  return (
    candidate.code === 404 ||
    candidate.code === "404" ||
    /specified bucket does not exist|not found/i.test(candidate.message ?? "")
  );
}

async function profilePhotoStorageAvailable() {
  try {
    const [exists] = await getFirebaseAdminStorage().bucket().exists();
    return exists;
  } catch (error) {
    if (isMissingBucketError(error)) return false;
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    await assertTrustedMutation(request);
    const session = await readSession();
    if (!session) {
      return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    }
    if (
      !(await enforceRateLimit(
        clientKey(request, `profile-photo:${session.uid}`),
        8,
        60 * 60_000,
      ))
    ) {
      return NextResponse.json(
        { error: "Photo update limit reached. Try again later." },
        { status: 429 },
      );
    }
    if (!(await profilePhotoStorageAvailable())) {
      return NextResponse.json(
        {
          error:
            "Profile photo storage is not enabled yet. Your account was not changed.",
        },
        { status: 503 },
      );
    }

    const form = await request.formData();
    const photo = form.get("photo");
    if (!(photo instanceof File)) {
      throw new Error("Choose a profile photo to upload.");
    }
    const sanitized = await sanitizeUploadedImage(
      photo,
      "Choose a valid JPG, PNG or WebP image up to 5 MB.",
    );
    const storagePath = `users/${session.uid}/profile/photo`;
    await getFirebaseAdminStorage()
      .bucket()
      .file(storagePath)
      .save(sanitized.bytes, {
        contentType: sanitized.contentType,
        resumable: false,
        metadata: { cacheControl: "private, max-age=3600" },
      });

    const version = Date.now();
    const relativeImageUrl = `/api/users/${encodeURIComponent(session.uid)}/profile-image?v=${version}`;
    const absoluteImageUrl = new URL(relativeImageUrl, request.url).toString();
    const auth = getFirebaseAdminAuth();
    const user = await auth.getUser(session.uid);
    await auth.updateUser(session.uid, { photoURL: absoluteImageUrl });
    await persistUserProfile(
      {
        id: session.uid,
        displayName:
          user.displayName ??
          user.email?.split("@")[0] ??
          user.phoneNumber ??
          "BondCircle member",
        email: user.email ?? null,
        phone: user.phoneNumber ?? null,
        profileImage: relativeImageUrl,
        termsAcceptedAt:
          typeof user.customClaims?.termsAcceptedAt === "string"
            ? user.customClaims.termsAcceptedAt
            : null,
        privacyAcceptedAt:
          typeof user.customClaims?.privacyAcceptedAt === "string"
            ? user.customClaims.privacyAcceptedAt
            : null,
      },
      { strict: true },
    );

    return NextResponse.json({ profileImage: relativeImageUrl });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update your profile photo.",
      },
      { status: 400 },
    );
  }
}
