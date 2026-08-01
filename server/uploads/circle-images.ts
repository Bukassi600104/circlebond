import { getFirebaseAdminStorage } from "@/server/firebase/admin";
import type { SanitizedImage } from "@/server/uploads/images";

function isMissingBucketError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const candidate = error as {
    code?: number | string;
    message?: string;
    errors?: Array<{ reason?: string }>;
  };
  return (
    candidate.code === 404 ||
    candidate.code === "404" ||
    /specified bucket does not exist|not found/i.test(
      candidate.message ?? "",
    ) ||
    candidate.errors?.some((item) => item.reason === "notFound") === true
  );
}

export async function circleImageStorageAvailable() {
  const bucket = getFirebaseAdminStorage().bucket();
  try {
    const [exists] = await bucket.exists();
    return exists;
  } catch (error) {
    if (isMissingBucketError(error)) return false;
    throw error;
  }
}

export async function saveCircleImage(
  image: SanitizedImage,
  storagePath: string,
) {
  await getFirebaseAdminStorage()
    .bucket()
    .file(storagePath)
    .save(image.bytes, {
      contentType: image.contentType,
      resumable: false,
      metadata: { cacheControl: "private, max-age=3600" },
    });
}

export const CIRCLE_IMAGE_STORAGE_WARNING =
  "The circle was created without its optional image because image storage is not enabled.";
