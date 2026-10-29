# Image transport and orientation follow-up

Date: 30 October 2026 (Africa/Lagos). Agent E. Status: **PENDING REVIEW** by a non-author.

## Confirmed hosting mismatch

The server accepts each original JPEG, PNG or WebP up to `5_000_000` bytes and limits raster input to 25 million pixels. [Vercel's documented request-body limit](https://vercel.com/docs/functions/limitations#request-body-size) is 4.5 MB for the entire function request. A permitted single file, or several individually permitted Aso-Ebi files, can therefore be rejected before the server's Sharp validation runs. The [payload-error guidance](https://vercel.com/docs/errors/function_payload_too_large) identifies the hosting error; no live upload was performed here.

## Bounded implementation

- Added `lib/image-upload.ts`, used by profile photos, receipt submission/replacement, Gift creation, Support creation and Aso-Ebi creation including all named tier images.
- Original selected files retain the 5 MB allowance. Header dimensions are checked before raster decoding, with the same 25 MP ceiling. Native decoding adds malformed-image validation; authoritative server Sharp/MIME validation and metadata stripping remain unchanged.
- The complete encoded multipart body is measured, including all strings, duplicate fields, file names and framing. A 4,300,000-byte transport budget leaves headroom below the hosting cap.
- Small permitted files remain byte-identical. Only an oversized aggregate request triggers full-resolution native Canvas re-encoding, at fixed WebP quality 0.92. There is no resizing, progressive quality reduction, dropped image, storage/cache persistence or background replay.
- Browser orientation handling is retained in the decoded pixels; Canvas preserves alpha. Blob URLs are revoked, decoded image sources released and Canvas backing dimensions cleared after use or failure.
- The helper returns the exact encoded Blob and its original multipart Content-Type. Actual Chromium testing showed that `Blob.type` lowercases the boundary value; callers therefore set the original case-sensitive header explicitly. The measured Blob is the body sent by `fetch`, rather than a second FormData serialization.
- Preparation precedes CSRF retrieval and upload requests. On failure, all five actual submit handlers retain selections/current form state and show their existing error UI. No contribution, photo or circle success is fabricated.

## Browser evidence

Command: `node --test --test-reporter=tap tests/browser/image-upload.test.mjs`, using the existing bundled Playwright through `NODE_PATH` and `BONDCIRCLE_BROWSER_EXECUTABLE` pointing to the installed desktop Edge executable. No dependency or browser was installed by this change.

Full browser run: **9 tests passed, 0 failed**, exit 0. The JPEG orientation fixture was then strengthened to exactly 5,000,000 bytes and its focused test rerun passed (1/1); the other cases and product code were unchanged. Actual Chromium DOM, image decoder, Canvas, File, FormData and Request APIs were used. The five submit functions were extracted from the actual TSX modules and executed against native browser forms, with request counters replacing network calls for the negative-path check. These are browser/module fixtures, not Firebase/provider end-to-end acceptance.

| Case                                                     | Actual result                                                                                                          |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Single permitted large PNG with synthetic receipt detail | Original 4,913,387 bytes; complete prepared multipart 2,323,458 bytes; sent-byte count equals measured-byte count      |
| Multiple Aso-Ebi image fields                            | Original multipart 4,881,137 bytes; prepared 4,027,740 bytes; names, duplicate notes and tiers JSON retained           |
| Pixel dimensions and alpha                               | Large PNG dimensions unchanged at 1400 × 875; transparent, half-transparent and opaque samples preserved               |
| Synthetic receipt text                                   | Captured before/after detail remains visually legible; this is not an OCR or real-receipt guarantee                    |
| Small image and empty optional input                     | Original small image bytes/name/type unchanged; empty optional input retained; no unreleased Blob URLs                 |
| Compressed Canvas resources                              | Backing dimensions cleared after use                                                                                   |
| EXIF orientation                                         | Actual 5,000,000-byte JPEG with orientation 6 decodes to 60 × 90 and remains 60 × 90 after preparation                 |
| WebP variants                                            | Actual VP8, VP8X alpha and VP8L lossless fixtures decode and retain 4 × 3 dimensions                                   |
| Invalid inputs                                           | Malformed, over 5 MB, mismatched MIME, SVG, HEIC and excessive-pixel input rejected before raster decode/request       |
| Unfit aggregate                                          | Five dense originals do not fit at the fixed quality/full resolution; error returned, all original selections retained |
| Five caller failure paths                                | Each performs zero CSRF/upload requests when preparation fails; selected files and upload surface remain intact        |

Screenshot: [original and prepared synthetic receipt detail](evidence/upload-detail-before-after.png). No customer image or payment evidence was used. Harness wall times are not application performance benchmarks.

Validation: isolated new-helper TypeScript check passed using ES2017 and DOM/DOM-iterable libraries; targeted ESLint and formatting passed. Full integrated app TypeScript, build and CI remain parent release gates. No server validation, pricing, permissions, legal/privacy behavior, provider or production configuration was changed.

## Remaining contract and device gates

This change does **not** establish that every collection of valid 5 MB originals can fit a 4.5 MB request without further quality or resolution loss. Dense multi-image sets can still exceed the transport budget. They now fail safely with actionable recovery, rather than receiving an unexplained hosting 413 or silently losing files. Universal support for every maximum-size combination remains **BLOCKED** pending an approved transport strategy and staging infrastructure/security verification. A direct-to-Storage flow was not invented or enabled here.

Native HEIC conversion was not added. Unsupported inputs receive explicit JPG/PNG/WebP instructions. Safari encoder behavior, native photo-picker conversion, low-memory handling, actual receipt readability and interrupted uploads still require supported physical devices and approved staging Storage. None is claimed PASS from desktop simulation.

## Orientation correction requested by independent QA

Changed the manifest from `portrait-primary` to `any`: BondCircle's coordination functions do not need one fixed orientation. This follows the [W3C orientation accessibility guidance](https://www.w3.org/WAI/WCAG22/Understanding/orientation.html), without claiming overall WCAG conformance.

The actual manifest function is checked by a new runtime assertion. PWA focused run: **21 tests passed, 0 failed**. The existing real-worker browser fixture also passed at 844 × 390 landscape: document width 844, viewport width 844, Retry usable; [landscape screenshot](evidence/pwa-offline-landscape.png). Physical installed-PWA rotation and full application landscape acceptance remain **BLOCKED** pending devices and the integrated candidate.

No deployment, live data mutation, real charge, paid service or new backend was performed.
