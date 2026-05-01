#!/usr/bin/env node
/**
 * Re-process every article in the manifest through the sharp pipeline.
 * Useful when the AUWA Lightroom presets change and you've re-exported all
 * 2-edited/ folders, OR when the sharpening / sizing settings in
 * process-image.js change.
 *
 * Usage:
 *   cd website/main && node scripts/process-all.js          # all articles
 *   cd website/main && node scripts/process-all.js [slug]   # single article
 *
 * The slug arg is the photo folder name (which equals the image folder name),
 * not the URL slug. e.g. "auwa-book" not "the-beginning".
 *
 * Reads mappings from auwa/photography/_manifest.json. To add a new article,
 * append an entry there OR run /journal:article which will update it.
 */

const path = require("path");
const { execSync } = require("child_process");
const fs = require("fs");

const REPO_ROOT = path.resolve(__dirname, "../../..");
const MANIFEST_PATH = path.join(REPO_ROOT, "photography/_manifest.json");
const PHOTOGRAPHY_DIR = path.join(REPO_ROOT, "photography");
const PUBLIC_JOURNAL = path.join(REPO_ROOT, "website/main/public/journal");
const SOCIAL_IG = path.join(REPO_ROOT, "social/instagram");
const PROCESS_IMAGE = path.join(__dirname, "process-image.js");

const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"));
const targetSlug = process.argv[2];

const articles = targetSlug
  ? { [targetSlug]: manifest.articles[targetSlug] }
  : manifest.articles;

if (targetSlug && !manifest.articles[targetSlug]) {
  console.error(`Unknown slug: ${targetSlug}. Known: ${Object.keys(manifest.articles).join(", ")}`);
  process.exit(1);
}

function run(input, output, mode) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  execSync(`node "${PROCESS_IMAGE}" "${input}" "${output}" ${mode}`, { stdio: "inherit" });
}

for (const [photoSlug, article] of Object.entries(articles)) {
  console.log(`\n=== ${photoSlug} (URL: /journal/${article.url_slug}) ===`);
  const sourceDir = path.join(PHOTOGRAPHY_DIR, photoSlug, "2-edited");
  const webDir = path.join(PUBLIC_JOURNAL, photoSlug);
  const igDir = path.join(SOCIAL_IG, photoSlug);

  for (const [name, sourceFile] of Object.entries(article.images)) {
    const source = path.join(sourceDir, sourceFile);
    if (!fs.existsSync(source)) {
      console.error(`  MISSING: ${source}`);
      continue;
    }
    // Hero is shown half-width on desktop split layout; on a 4K retina
    // monitor that's a 1280-logical-px column = 2560 source px needed.
    // `pillar` (2400px) covers it without forcing next/image to upscale.
    // Body images use `web` (1800px) since they cap at ~900 CSS px.
    const mode = name === "hero" ? "pillar" : "web";
    run(source, path.join(webDir, `${photoSlug}-${name}.jpg`), mode);
    run(source, path.join(igDir, `image-${name}.jpg`), "ig");
  }

  const heroSource = path.join(sourceDir, article.hero);
  if (fs.existsSync(heroSource)) {
    run(heroSource, path.join(webDir, `${photoSlug}-og.jpg`), "og");
  }
}

console.log("\nDone.");
