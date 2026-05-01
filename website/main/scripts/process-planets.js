#!/usr/bin/env node
/**
 * One-off processor for the seven-stars planet/kokoro assets.
 * Source: share/auwa-planets/{N}_{Name}_{Planet|Kokoro}.png (3000×3000 with alpha)
 * Output: website/main/public/book/planets/{n}-{name}-{planet|kokoro}.webp (720×720 with alpha)
 */

const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const SRC = "/Users/admin/Github/auwa/share/auwa-planets";
const DST = path.join(__dirname, "..", "public", "book", "planets");

const planets = [
  { num: 1, name: "Wakon" },
  { num: 2, name: "Koto" },
  { num: 3, name: "Mako" },
  { num: 4, name: "Kamuwa" },
  { num: 5, name: "Kiala" },
  { num: 6, name: "Lioma" },
  { num: 7, name: "Toamu" },
];

(async () => {
  fs.mkdirSync(DST, { recursive: true });
  for (const p of planets) {
    for (const variant of ["Planet", "Kokoro"]) {
      const inFile = path.join(SRC, `${p.num}_${p.name}_${variant}.png`);
      const outFile = path.join(
        DST,
        `${p.num}-${p.name.toLowerCase()}-${variant.toLowerCase()}.webp`
      );
      await sharp(inFile)
        .resize(720, 720, { fit: "inside", kernel: "lanczos3" })
        .webp({ quality: 82, alphaQuality: 90, effort: 6 })
        .toFile(outFile);
      const size = fs.statSync(outFile).size;
      console.log(`${path.basename(outFile)} ${(size / 1024).toFixed(0)}KB`);
    }
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
