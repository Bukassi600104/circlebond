import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const { chromium } = createRequire(import.meta.url)("playwright");
const root = new URL("../../", import.meta.url);
let browser;
let server;
let page;

before(async () => {
  server = createServer((_request, response) =>
    response.end("<!doctype html><title>Upload fixture</title>"),
  );
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  browser = await chromium.launch({
    headless: true,
    executablePath: process.env.BONDCIRCLE_BROWSER_EXECUTABLE,
  });
  page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  const source = await readFile(new URL("lib/image-upload.ts", root), "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  await page.addScriptTag({
    content: `var exports = {}; ${compiled}; window.prepareImageUpload = exports.prepareImageUpload;`,
  });
  await page.evaluate(() => {
    window.noiseImage = async (width, height, name) => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      const pixels = context.createImageData(width, height);
      let seed = 123456789;
      for (let i = 0; i < pixels.data.length; i++) {
        seed ^= seed << 13;
        seed ^= seed >>> 17;
        seed ^= seed << 5;
        pixels.data[i] = seed & 255;
      }
      pixels.data[3] = 0;
      pixels.data[7] = 128;
      pixels.data[11] = 255;
      context.putImageData(pixels, 0, 0);
      if (name === "receipt.png") {
        context.fillStyle = "white";
        context.fillRect(20, 20, 120, 18);
        context.fillStyle = "black";
        context.font = "12px monospace";
        context.fillText("Receipt 25000", 24, 33);
      }
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );
      canvas.width = canvas.height = 0;
      return new File([blob], name, { type: "image/png" });
    };
    window.imageInfo = async (blob) => {
      const image = new Image();
      const url = URL.createObjectURL(blob);
      const canvas = document.createElement("canvas");
      try {
        image.src = url;
        await image.decode();
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        const sample = context.getImageData(0, 0, 3, 1).data;
        return {
          width: image.naturalWidth,
          height: image.naturalHeight,
          alpha: [sample[3], sample[7], sample[11]],
        };
      } finally {
        image.src = "";
        URL.revokeObjectURL(url);
        canvas.width = canvas.height = 0;
      }
    };
  });
});

after(async () => {
  if (browser) await browser.close();
  if (server) {
    server.closeAllConnections();
    await new Promise((resolve) => server.close(resolve));
  }
});

test("prepared multipart retains its case-sensitive boundary header", async () => {
  const result = await page.evaluate(async () => {
    const form = new FormData();
    form.append("note", "fixture");
    const prepared = await window.prepareImageUpload(form);
    const request = new Request(location.origin + "/upload", {
      method: "POST",
      body: prepared.body,
      headers: { "Content-Type": prepared.contentType },
    });
    return {
      note: (await request.clone().formData()).get("note"),
      bytes: (await request.arrayBuffer()).byteLength,
      measured: prepared.body.size,
    };
  });
  assert.equal(result.note, "fixture");
  assert.equal(result.bytes, result.measured);
});

test("a real 4.9 MB PNG fits the measured multipart transport without changing dimensions or alpha", async () => {
  const result = await page.evaluate(async () => {
    const original = await window.noiseImage(1400, 875, "receipt.png");
    const form = new FormData();
    form.append("receiptImage", original);
    form.append("amount", "25000");
    const canvases = [];
    const create = document.createElement;
    document.createElement = function (...args) {
      const element = create.apply(this, args);
      if (args[0] === "canvas") canvases.push(element);
      return element;
    };
    let payload;
    try {
      payload = await window.prepareImageUpload(form);
    } finally {
      document.createElement = create;
    }
    const { body, contentType } = payload;
    const request = new Request(location.origin + "/upload", {
      method: "POST",
      body,
      headers: { "Content-Type": contentType },
    });
    const parsed = await request.clone().formData();
    const prepared = parsed.get("receiptImage");
    const preview = document.createElement("canvas");
    preview.width = 960;
    preview.height = 100;
    const context = preview.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, 960, 100);
    for (const [offset, blob] of [
      [0, original],
      [480, prepared],
    ]) {
      const image = new Image();
      const url = URL.createObjectURL(blob);
      try {
        image.src = url;
        await image.decode();
        context.drawImage(image, 20, 20, 120, 18, offset, 0, 480, 72);
      } finally {
        image.src = "";
        URL.revokeObjectURL(url);
      }
    }
    context.fillStyle = "black";
    context.font = "16px sans-serif";
    context.fillText("Original synthetic detail", 8, 94);
    context.fillText("Prepared synthetic detail", 488, 94);
    document.body.replaceChildren(preview);
    return {
      original: original.size,
      body: body.size,
      sent: (await request.arrayBuffer()).byteLength,
      type: request.headers.get("content-type"),
      amount: parsed.get("amount"),
      canvasesReleased:
        canvases.length > 0 &&
        canvases.every((canvas) => canvas.width === 0 && canvas.height === 0),
      before: await window.imageInfo(original),
      after: await window.imageInfo(prepared),
    };
  });
  assert.ok(result.original >= 4_900_000 && result.original <= 5_000_000);
  assert.ok(result.body <= 4_300_000);
  assert.equal(result.body, result.sent);
  assert.match(result.type, /^multipart\/form-data; boundary=/);
  assert.equal(result.amount, "25000");
  assert.equal(result.canvasesReleased, true);
  assert.deepEqual(result.after, result.before);
  await page.screenshot({
    path: fileURLToPath(
      new URL("docs/launch/evidence/upload-detail-before-after.png", root),
    ),
  });
  console.log(
    `4.9MB fixture: original=${result.original}, encoded multipart=${result.body}`,
  );
});

test("aggregate Aso-Ebi files, duplicate fields and field names survive preparation", async () => {
  const result = await page.evaluate(async () => {
    const form = new FormData();
    for (const name of [
      "fabricImage",
      "tierFabricImage:one",
      "tierGiftImage:one",
    ])
      form.append(name, await window.noiseImage(900, 450, `${name}.png`));
    form.append("note", "first");
    form.append("note", "second");
    form.append("tiers", '[{"id":"one"}]');
    const before = (await new Response(form).blob()).size;
    const { body, contentType } = await window.prepareImageUpload(form);
    const parsed = await new Request(location.origin + "/upload", {
      method: "POST",
      body,
      headers: { "Content-Type": contentType },
    }).formData();
    return {
      before,
      after: body.size,
      names: [...parsed.keys()],
      notes: parsed.getAll("note"),
      tiers: parsed.get("tiers"),
      dimensions: await Promise.all(
        ["fabricImage", "tierFabricImage:one", "tierGiftImage:one"].map(
          (name) => window.imageInfo(parsed.get(name)),
        ),
      ),
    };
  });
  assert.ok(result.before > 4_500_000);
  assert.ok(result.after <= 4_300_000);
  assert.deepEqual(result.names, [
    "fabricImage",
    "tierFabricImage:one",
    "tierGiftImage:one",
    "note",
    "note",
    "tiers",
  ]);
  assert.deepEqual(result.notes, ["first", "second"]);
  assert.equal(result.tiers, '[{"id":"one"}]');
  assert.ok(
    result.dimensions.every(
      (image) => image.width === 900 && image.height === 450,
    ),
  );
  console.log(
    `Aggregate fixture: original multipart=${result.before}, prepared=${result.after}`,
  );
});

test("small valid images remain byte-identical and temporary resources are released", async () => {
  const result = await page.evaluate(async () => {
    const original = await window.noiseImage(30, 20, "small.png");
    const form = new FormData();
    form.append("photo", original);
    form.append("emptyOptional", new File([], ""));
    const pending = new Set();
    const create = URL.createObjectURL;
    const revoke = URL.revokeObjectURL;
    URL.createObjectURL = (value) => {
      const url = create(value);
      pending.add(url);
      return url;
    };
    URL.revokeObjectURL = (url) => {
      pending.delete(url);
      revoke(url);
    };
    try {
      const { body, contentType } = await window.prepareImageUpload(form);
      const parsed = await new Request(location.origin + "/upload", {
        method: "POST",
        body,
        headers: { "Content-Type": contentType },
      }).formData();
      const photo = parsed.get("photo");
      return {
        name: photo.name,
        type: photo.type,
        before: [...new Uint8Array(await original.arrayBuffer())],
        after: [...new Uint8Array(await photo.arrayBuffer())],
        pending: pending.size,
        empty: parsed.get("emptyOptional").size,
      };
    } finally {
      URL.createObjectURL = create;
      URL.revokeObjectURL = revoke;
    }
  });
  assert.deepEqual(result.after, result.before);
  assert.equal(result.name, "small.png");
  assert.equal(result.type, "image/png");
  assert.equal(result.pending, 0);
  assert.equal(result.empty, 0);
});

test("EXIF orientation is retained when a maximum-size 5 MB JPEG is re-encoded", async () => {
  const result = await page.evaluate(async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 90;
    canvas.height = 60;
    canvas.getContext("2d").fillRect(0, 0, 45, 60);
    const base = new Uint8Array(
      await (
        await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/jpeg", 0.95),
        )
      ).arrayBuffer(),
    );
    canvas.width = canvas.height = 0;
    const exif = new Uint8Array([
      255, 225, 0, 34, 69, 120, 105, 102, 0, 0, 73, 73, 42, 0, 8, 0, 0, 0, 1, 0,
      18, 1, 3, 0, 1, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0,
    ]);
    const padding = [];
    let left = 5_000_000 - base.length - exif.length;
    while (left) {
      const remainingChunks = Math.ceil(left / 65537);
      const size = Math.min(65537, left - 4 * (remainingChunks - 1));
      const chunk = new Uint8Array(size);
      chunk[0] = 255;
      chunk[1] = 239;
      new DataView(chunk.buffer).setUint16(2, size - 2);
      padding.push(chunk);
      left -= size;
    }
    const original = new File(
      [base.slice(0, 2), exif, ...padding, base.slice(2)],
      "rotated.jpg",
      { type: "image/jpeg" },
    );
    const form = new FormData();
    form.append("receiptImage", original);
    const prepared = await window.prepareImageUpload(form);
    const parsed = await new Request(location.origin + "/upload", {
      method: "POST",
      body: prepared.body,
      headers: { "Content-Type": prepared.contentType },
    }).formData();
    return {
      before: await window.imageInfo(original),
      after: await window.imageInfo(parsed.get("receiptImage")),
      original: original.size,
    };
  });
  assert.equal(result.original, 5_000_000);
  assert.equal(result.before.width, 60);
  assert.equal(result.before.height, 90);
  assert.deepEqual(result.after, result.before);
});

test("valid lossy, extended-alpha and lossless WebP inputs retain their dimensions", async () => {
  const fixtures = [
    "5249464640000000574542505650382034000000d001009d012a0400030000800e25a00274ba01f80003b000fefd09c7ffe14d7c485f8535ff0a6bff7c09f7813ef027fb6c000000",
    "524946466400000057454250565038580a00000010000000030000020000414c50480a000000010750c088084444ff035650382034000000d001009d012a0400030000800e25a00274ba01f80003b000fefd09c7ffe14d7c485f8535ff0a6bff7c09f7813ef027fb6c000000",
    "524946461e000000574542505650384c110000002f038000100750a82ad4b2808188e87f0000",
  ];
  const results = await page.evaluate(async (fixtures) => {
    const results = [];
    for (const hex of fixtures) {
      const bytes = Uint8Array.from(hex.match(/../g), (pair) =>
        parseInt(pair, 16),
      );
      const form = new FormData();
      form.append(
        "photo",
        new File([bytes], "image.webp", { type: "image/webp" }),
      );
      const prepared = await window.prepareImageUpload(form);
      const parsed = await new Request(location.origin + "/upload", {
        method: "POST",
        body: prepared.body,
        headers: { "Content-Type": prepared.contentType },
      }).formData();
      results.push(await window.imageInfo(parsed.get("photo")));
    }
    return results;
  }, fixtures);
  assert.equal(results.length, 3);
  assert.ok(results.every((image) => image.width === 4 && image.height === 3));
});

test("invalid, oversized, mismatched, unsupported and excessive-pixel images fail before raster decoding", async () => {
  const result = await page.evaluate(async () => {
    const png = await window.noiseImage(2, 2, "valid.png");
    const huge = new Uint8Array(await png.arrayBuffer());
    new DataView(huge.buffer).setUint32(16, 100000);
    new DataView(huge.buffer).setUint32(20, 100000);
    const files = [
      new File(["not an image"], "bad.png", { type: "image/png" }),
      new File([new Uint8Array(5_000_001)], "large.jpg", {
        type: "image/jpeg",
      }),
      new File(["<svg/>"], "bad.svg", { type: "image/svg+xml" }),
      new File([png], "spoof.jpg", { type: "image/jpeg" }),
      new File([huge], "huge.png", { type: "image/png" }),
      new File(["unsupported"], "photo.heic", { type: "image/heic" }),
    ];
    let decoded = 0;
    const OriginalImage = window.Image;
    window.Image = class extends OriginalImage {
      constructor() {
        super();
        decoded++;
      }
    };
    const errors = [];
    try {
      for (const file of files) {
        const form = new FormData();
        form.append("image", file);
        try {
          await window.prepareImageUpload(form);
          errors.push(null);
        } catch (error) {
          errors.push(error.message);
        }
      }
    } finally {
      window.Image = OriginalImage;
    }
    return { errors, decoded };
  });
  assert.equal(result.errors.length, 6);
  assert.ok(result.errors.every(Boolean));
  assert.equal(result.decoded, 0);
});

test("a form that cannot fit at full resolution fails without mutating selections", async () => {
  const result = await page.evaluate(async () => {
    const image = await window.noiseImage(1400, 875, "original.png");
    const form = new FormData();
    for (let i = 0; i < 5; i++) form.append(`image:${i}`, image);
    try {
      await window.prepareImageUpload(form);
      return { error: null };
    } catch (error) {
      return {
        error: error.message,
        count: [...form.keys()].length,
        unchanged: [...form.values()].every(
          (file) => file.size === image.size && file.type === image.type,
        ),
      };
    }
  });
  assert.match(result.error, /without reducing their detail/);
  assert.equal(result.count, 5);
  assert.equal(result.unchanged, true);
});

test("all five actual upload handlers prepare before any CSRF or upload request", async () => {
  const callers = [
    ["components/profile/ProfileSettings.tsx", "uploadPhoto", "photo"],
    ["components/gift-circles/GiftCircleForm.tsx", "submit", "giftImage"],
    [
      "components/support-circles/SupportCircleForm.tsx",
      "submit",
      "supportingImage",
    ],
    [
      "components/aso-ebi/AsoEbiCircleForm.tsx",
      "submit",
      "tierFabricImage:one",
    ],
    [
      "components/contributions/ContributionWorkspace.tsx",
      "submitReceipt",
      "receiptImage",
    ],
  ];
  for (const [file, name, field] of callers) {
    const source = ts.createSourceFile(
      file,
      await readFile(new URL(file, root), "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TSX,
    );
    let handler;
    function visit(node) {
      if (ts.isFunctionDeclaration(node) && node.name?.text === name)
        handler = node.getText(source);
      ts.forEachChild(node, visit);
    }
    visit(source);
    assert.ok(handler, `${file} handler exists`);
    const code = ts.transpileModule(handler, {
      compilerOptions: { target: ts.ScriptTarget.ES2022 },
    }).outputText;
    const result = await page.evaluate(
      async ({ code, name, field }) => {
        let requests = 0;
        let cleared = false;
        const messages = [];
        const bad = new File(["<svg/>"], "bad.svg", { type: "image/svg+xml" });
        const form = document.createElement("form");
        const input = document.createElement("input");
        input.type = "file";
        input.name = field;
        const transfer = new DataTransfer();
        transfer.items.add(bad);
        input.files = transfer.files;
        form.append(input);
        const noop = () => {};
        const bindings = {
          prepareImageUpload: window.prepareImageUpload,
          selectedFile: bad,
          loading: false,
          tiers: [{ id: "one", price: "100" }],
          replacementOfId: null,
          circleId: "fixture",
          csrfToken: async () => {
            requests++;
            return "fixture";
          },
          fetch: async () => {
            requests++;
            throw new Error("Must not fetch");
          },
          setError: (message) => messages.push(message),
          setLoading: noop,
          setBusy: noop,
          setSuccess: noop,
          selectPhoto: () => {
            cleared = true;
          },
          setCurrentImage: noop,
          router: { push: noop, refresh: noop },
          setUploadOpen: () => {
            cleared = true;
          },
          setReplacementOfId: noop,
          refresh: noop,
        };
        const submit = new Function(
          ...Object.keys(bindings),
          `${code}; return ${name};`,
        )(...Object.values(bindings));
        await submit({ preventDefault() {}, currentTarget: form });
        return {
          requests,
          cleared,
          error: messages.at(-1),
          files: input.files.length,
        };
      },
      { code, name, field },
    );
    assert.equal(result.requests, 0, file);
    assert.equal(result.cleared, false, file);
    assert.equal(result.files, 1, file);
    assert.match(
      result.error,
      /Choose a JPG, PNG or WebP image up to 5 MB/,
      file,
    );
  }
});
