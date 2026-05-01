#!/usr/bin/env node
/**
 * One-off processor for the Auwa character variants (calm + glow).
 * Source: share/auwa-character/auwa-{front,up,down,left,right}{,-glow}.png
 *         (3000×3000 PNG with alpha — 2.8MB calm, 11MB glow)
 * Output: website/main/public/book/character/auwa-{...}.webp
 *         (1440×1440 WebP with alpha — typically 100-300KB)
 *
 * Why WebP: alpha support, ~5-10x smaller than PNG for transparent
 * illustrations. The character displays at max ~620px on screen, so
 * 1440px source covers retina up to 2.3x. Quality 88, alphaQuality 92,
 * effort 6 (slowest, smallest).
 */

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = "/Users/admin/Github/auwa/share/auwa-character";
const DST = path.join(__dirname, "..", "public", "book", "character");

const variants = [
  "auwa-front",
  "auwa-up",
  "auwa-down",
  "auwa-left",
  "auwa-right",
  "auwa-front-glow",
  "auwa-up-glow",
  "auwa-down-glow",
  "auwa-left-glow",
  "auwa-right-glow",
];

(async () => {
  fs.mkdirSync(DST, { recursive: true });
  for (const name of variants) {
    const isGlow = name.endsWith("-glow");
    const inFile = path.join(SRC, `${name}.png`);
    const outFile = path.join(DST, `${name}.webp`);
    // Calm variants get the higher resolution + quality (the user
    // looks AT them). Glow variants are atmospheric overlays — softer
    // tolerance for compression because the soft halo edge naturally
    // hides artefacts. 1080 covers ~1.7x retina at the 620px max display.
    await sharp(inFile)
      .resize(isGlow ? 1080 : 1440, isGlow ? 1080 : 1440, {
        fit: "inside",
        kernel: "lanczos3",
      })
      .webp({
        quality: isGlow ? 80 : 88,
        alphaQuality: isGlow ? 85 : 92,
        effort: 6,
      })
      .toFile(outFile);
    const size = fs.statSync(outFile).size;
    console.log(`${name}.webp  ${(size / 1024).toFixed(0)}KB`);
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
