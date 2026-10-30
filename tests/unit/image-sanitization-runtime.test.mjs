import assert from "node:assert/strict";
import test from "node:test";
import sharp from "sharp";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

class ValidationError extends Error {}
const { sanitizeUploadedImage, MAX_IMAGE_UPLOAD_BYTES } =
  await loadTypescriptModule("server/uploads/images.ts", {
    "server-only": {},
    sharp: { default: sharp },
    "@/server/public-errors": { RequestValidationError: ValidationError },
  });

for (const [format, mime, extension] of [
  ["jpeg", "image/jpeg", "jpg"],
  ["png", "image/png", "png"],
  ["webp", "image/webp", "webp"],
]) {
  test(`the installed Sharp binary decodes and sanitizes real ${format} uploads`, async () => {
    const input = await sharp({
      create: {
        width: 24,
        height: 16,
        channels: 4,
        background: { r: 12, g: 80, b: 72, alpha: 0.5 },
      },
    })
      .toFormat(format)
      .toBuffer();
    const result = await sanitizeUploadedImage(
      new File([input], `photo.${extension}`, { type: mime }),
    );
    const metadata = await sharp(result.bytes).metadata();
    assert.equal(result.contentType, mime);
    assert.equal(result.extension, extension);
    assert.equal(metadata.format, format);
    assert.equal(metadata.width, 24);
    assert.equal(metadata.height, 16);
    if (format !== "jpeg") assert.equal(metadata.hasAlpha, true);
    assert.equal(metadata.exif, undefined);
  });
}

test("receipt orientation is applied and EXIF metadata is removed", async () => {
  const input = await sharp({
    create: { width: 30, height: 20, channels: 3, background: "teal" },
  })
    .jpeg()
    .withMetadata({ orientation: 6 })
    .toBuffer();
  const result = await sanitizeUploadedImage(
    new File([input], "rotated.jpg", { type: "image/jpeg" }),
  );
  const metadata = await sharp(result.bytes).metadata();
  assert.equal(metadata.width, 20);
  assert.equal(metadata.height, 30);
  assert.equal(metadata.orientation, undefined);
  assert.equal(metadata.exif, undefined);
});

test("the approved five-million-byte boundary is accepted and overflow rejected", async () => {
  const jpeg = await sharp({
    create: { width: 8, height: 8, channels: 3, background: "teal" },
  })
    .jpeg()
    .toBuffer();
  const exact = Buffer.concat([
    jpeg,
    Buffer.alloc(MAX_IMAGE_UPLOAD_BYTES - jpeg.length),
  ]);
  const result = await sanitizeUploadedImage(
    new File([exact], "exact.jpg", { type: "image/jpeg" }),
  );
  assert.ok(
    result.bytes.length > 0 && result.bytes.length <= MAX_IMAGE_UPLOAD_BYTES,
  );
  await assert.rejects(
    sanitizeUploadedImage(
      new File([exact, new Uint8Array(1)], "overflow.jpg", {
        type: "image/jpeg",
      }),
    ),
    (error) => error instanceof ValidationError,
  );
  await assert.rejects(
    sanitizeUploadedImage(
      new File([jpeg], "disguised.png", { type: "image/png" }),
    ),
    (error) => error instanceof ValidationError,
  );
});
