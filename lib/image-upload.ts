const MAX_IMAGE_BYTES = 5_000_000;
const MAX_IMAGE_PIXELS = 25_000_000;
// Leave room below Vercel's 4.5 MB limit; this is a transport budget, not the input file allowance.
export const MAX_MULTIPART_BYTES = 4_300_000;
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function dimensions(bytes: Uint8Array, type: string) {
  const data = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const text = (offset: number, length: number) =>
    String.fromCharCode(...bytes.subarray(offset, offset + length));
  if (
    type === "image/png" &&
    bytes.length >= 33 &&
    text(0, 8) === "\x89PNG\r\n\x1a\n" &&
    text(12, 4) === "IHDR"
  )
    return [data.getUint32(16), data.getUint32(20)];
  if (
    type === "image/jpeg" &&
    data.byteLength >= 4 &&
    data.getUint16(0) === 0xffd8
  ) {
    let offset = 2;
    while (offset + 4 <= bytes.length) {
      if (bytes[offset++] !== 0xff) break;
      while (bytes[offset] === 0xff) offset++;
      const marker = bytes[offset++];
      if (marker === 0xda || marker === 0xd9) break;
      if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) continue;
      if (offset + 2 > bytes.length) break;
      const length = data.getUint16(offset);
      if (length < 2 || offset + length > bytes.length) break;
      if (
        [
          0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd,
          0xce, 0xcf,
        ].includes(marker) &&
        length >= 7
      ) {
        return [data.getUint16(offset + 5), data.getUint16(offset + 3)];
      }
      offset += length;
    }
  }
  if (type === "image/webp" && text(0, 4) === "RIFF" && text(8, 4) === "WEBP") {
    for (let offset = 12; offset + 8 <= bytes.length; ) {
      const kind = text(offset, 4);
      const length = data.getUint32(offset + 4, true);
      const start = offset + 8;
      if (start + length > bytes.length) break;
      if (kind === "VP8X" && length >= 10) {
        const uint24 = (at: number) =>
          bytes[at] + (bytes[at + 1] << 8) + (bytes[at + 2] << 16);
        return [uint24(start + 4) + 1, uint24(start + 7) + 1];
      }
      if (kind === "VP8L" && length >= 5 && bytes[start] === 0x2f) {
        const packed = data.getUint32(start + 1, true);
        return [(packed & 0x3fff) + 1, ((packed >>> 14) & 0x3fff) + 1];
      }
      if (
        kind === "VP8 " &&
        length >= 10 &&
        text(start + 3, 3) === "\x9d\x01\x2a"
      ) {
        return [
          data.getUint16(start + 6, true) & 0x3fff,
          data.getUint16(start + 8, true) & 0x3fff,
        ];
      }
      offset = start + length + (length & 1);
    }
  }
  throw new Error(
    "The image is damaged or its format does not match. Choose a JPG, PNG or WebP image.",
  );
}

async function encode(entries: Array<[string, FormDataEntryValue]>) {
  const form = new FormData();
  for (const [name, value] of entries) form.append(name, value);
  const response = new Response(form);
  // Blob.type lowercases the boundary; retain the original case-sensitive header.
  const contentType = response.headers.get("content-type")!;
  return { body: await response.blob(), contentType };
}

export async function prepareImageUpload(
  form: FormData,
): Promise<{ body: Blob; contentType: string }> {
  const entries = Array.from(form.entries());
  const images: Array<{ index: number; file: File }> = [];
  for (const [index, [, value]] of entries.entries()) {
    if (!(value instanceof File) || (value.size === 0 && !value.name)) continue;
    if (
      value.size < 1 ||
      value.size > MAX_IMAGE_BYTES ||
      !IMAGE_TYPES.has(value.type)
    ) {
      throw new Error(
        "Choose a JPG, PNG or WebP image up to 5 MB. Export HEIC photos to one of these formats first.",
      );
    }
    const [width, height] = dimensions(
      new Uint8Array(await value.arrayBuffer()),
      value.type,
    );
    if (!width || !height || width * height > MAX_IMAGE_PIXELS) {
      throw new Error("Choose an image with no more than 25 million pixels.");
    }
    images.push({ index, file: value });
  }
  let payload = await encode(entries);
  for (const { index, file } of images.sort(
    (a, b) => b.file.size - a.file.size,
  )) {
    const image = new Image();
    const url = URL.createObjectURL(file);
    let canvas: HTMLCanvasElement | undefined;
    try {
      image.src = url;
      await image.decode();
      if (
        !image.naturalWidth ||
        !image.naturalHeight ||
        image.naturalWidth * image.naturalHeight > MAX_IMAGE_PIXELS
      ) {
        throw new Error("Invalid image dimensions.");
      }
      if (payload.body.size <= MAX_MULTIPART_BYTES) continue;
      canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Image preparation is unavailable.");
      context.drawImage(image, 0, 0);
      const compressed = await new Promise<Blob | null>((resolve) =>
        canvas!.toBlob(resolve, "image/webp", 0.92),
      );
      if (!compressed || !IMAGE_TYPES.has(compressed.type))
        throw new Error("Image preparation is unavailable.");
      if (compressed.size < file.size) {
        const extension =
          compressed.type === "image/webp"
            ? "webp"
            : compressed.type === "image/png"
              ? "png"
              : "jpg";
        entries[index][1] = new File(
          [compressed],
          `${file.name.replace(/\.[^.]*$/, "") || "image"}.${extension}`,
          { type: compressed.type },
        );
        payload = await encode(entries);
      }
    } catch {
      throw new Error(
        "This image could not be prepared in your browser. Choose a valid JPG, PNG or WebP copy and try again.",
      );
    } finally {
      image.src = "";
      URL.revokeObjectURL(url);
      if (canvas) canvas.width = canvas.height = 0;
    }
  }
  if (payload.body.size > MAX_MULTIPART_BYTES) {
    throw new Error(
      "These images cannot fit in one request without reducing their detail. Choose smaller copies or fewer images and try again. Your selections have not been submitted.",
    );
  }
  return payload;
}
