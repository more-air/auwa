#!/usr/bin/env node
/**
 * Sharp-based image processor for AUWA articles.
 * Replaces `sips` in the article pipeline because sips downsamples without
 * output sharpening, producing soft results on screen. Sharp does proper
 * Lanczos3 resize + unsharp mask + MozJPEG encoding.
 *
 * Usage:
 *   node scripts/process-image.js <input> <output> <mode>
 *
 * Modes:
 *   web    - resize to 1800px max long edge (article images, 4:5 portrait → 1440×1800)
 *   pillar - resize to 2400px max long edge (homepage / teaser pillars, shown at near-full-viewport)
 *   hero   - resize to 3840px max long edge (full-bleed heroes used with
 *            <Image fill sizes="100vw">. Next.js's default deviceSizes go
 *            up to 3840, so anything smaller forces a runtime upscale on
 *            retina viewports — that's the blur.)
 *   ig     - resize+crop to 1080×1350 (4:5 portrait, centred)
 *   og     - resize+crop to 1200×630 (16:9-ish landscape, centred)
 */

const sharp = require("sharp");
const path = require("path");

const [, , input, output, mode] = process.argv;

if (!input || !output || !mode) {
  console.error("Usage: node process-image.js <input> <output> <web|ig|og>");
  process.exit(1);
}

(async () => {
  let pipeline = sharp(input).withMetadata();

  if (mode === "web") {
    pipeline = pipeline
      .resize(1800, 1800, { fit: "inside", kernel: "lanczos3" })
      .sharpen({ sigma: 0.7, m1: 0.5, m2: 2.5, x1: 2, y2: 10, y3: 20 });
  } else if (mode === "pillar") {
    pipeline = pipeline
      .resize(2400, 2400, { fit: "inside", kernel: "lanczos3" })
      .sharpen({ sigma: 0.7, m1: 0.5, m2: 2.5, x1: 2, y2: 10, y3: 20 });
  } else if (mode === "hero") {
    pipeline = pipeline
      .resize(3840, 3840, { fit: "inside", kernel: "lanczos3", withoutEnlargement: true })
      .sharpen({ sigma: 0.7, m1: 0.5, m2: 2.5, x1: 2, y2: 10, y3: 20 });
  } else if (mode === "ig") {
    pipeline = pipeline
      .resize(1080, 1350, { fit: "cover", kernel: "lanczos3", position: "centre" })
      .sharpen({ sigma: 0.7, m1: 0.5, m2: 2.5, x1: 2, y2: 10, y3: 20 });
  } else if (mode === "og") {
    pipeline = pipeline
      .resize(1200, 630, { fit: "cover", kernel: "lanczos3", position: "centre" })
      .sharpen({ sigma: 0.6, m1: 0.4, m2: 2.0 });
  } else {
    console.error(`Unknown mode: ${mode}. Use web, pillar, hero, ig, or og.`);
    process.exit(1);
  }

  await pipeline.jpeg({ quality: 85, mozjpeg: true, chromaSubsampling: "4:4:4" }).toFile(output);

  const meta = await sharp(output).metadata();
  const fs = require("fs");
  const size = fs.statSync(output).size;
  console.log(`${mode}: ${path.basename(output)} ${meta.width}×${meta.height} ${(size / 1024).toFixed(0)}KB`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
