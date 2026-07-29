import "server-only";
import sharp from "sharp";

const APPROVED_IMAGE_TYPES = new Map([
  ["image/jpeg", { format: "jpeg", extension: "jpg" }],
  ["image/png", { format: "png", extension: "png" }],
  ["image/webp", { format: "webp", extension: "webp" }],
] as const);

export const MAX_IMAGE_UPLOAD_BYTES = 5_000_000;
const MAX_IMAGE_PIXELS = 25_000_000;

export type SanitizedImage = {
  bytes: Buffer;
  contentType: "image/jpeg" | "image/png" | "image/webp";
  extension: "jpg" | "png" | "webp";
};

export async function sanitizeUploadedImage(
  file: File,
  message = "Add a JPG, PNG or WebP image up to 5 MB.",
): Promise<SanitizedImage> {
  const approved = APPROVED_IMAGE_TYPES.get(
    file.type as "image/jpeg" | "image/png" | "image/webp",
  );
  if (file.size < 1 || file.size > MAX_IMAGE_UPLOAD_BYTES || !approved) {
    throw new Error(message);
  }

  try {
    const source = Buffer.from(await file.arrayBuffer());
    const pipeline = sharp(source, {
      failOn: "warning",
      limitInputPixels: MAX_IMAGE_PIXELS,
      sequentialRead: true,
    });
    const metadata = await pipeline.metadata();
    if (
      metadata.format !== approved.format ||
      !metadata.width ||
      !metadata.height
    ) {
      throw new Error("Image signature does not match its declared format.");
    }

    // Re-encoding strips EXIF/comments and rejects executable or disguised data.
    const oriented = pipeline.rotate();
    const bytes =
      approved.format === "jpeg"
        ? await oriented.jpeg({ quality: 88, mozjpeg: true }).toBuffer()
        : approved.format === "png"
          ? await oriented.png({ compressionLevel: 9 }).toBuffer()
          : await oriented.webp({ quality: 88 }).toBuffer();
    if (bytes.length < 1 || bytes.length > MAX_IMAGE_UPLOAD_BYTES) {
      throw new Error("Sanitized image exceeds the upload limit.");
    }

    return {
      bytes,
      contentType: file.type as SanitizedImage["contentType"],
      extension: approved.extension,
    };
  } catch {
    throw new Error(message);
  }
}
