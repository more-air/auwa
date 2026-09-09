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
// Journal articles produce IG carousels — they live under the journal pillar.
// Social content moved out of the repo into the shared Dropbox folder, so the
// root comes from AUWA_SOCIAL_ROOT in website/main/.env.local. Pillars sit
// directly under it (no instagram/ level). Without this the script silently
// recreated a dead social/ tree inside the repo.
const SOCIAL_ROOT = (() => {
  const envFile = path.join(REPO_ROOT, "website/main/.env.local");
  const line = fs.existsSync(envFile)
    ? fs.readFileSync(envFile, "utf8").split("\n").find((l) => l.startsWith("AUWA_SOCIAL_ROOT="))
    : null;
  if (!line) {
    console.error("AUWA_SOCIAL_ROOT not found in website/main/.env.local — cannot write IG images.");
    process.exit(1);
  }
  return line.slice("AUWA_SOCIAL_ROOT=".length).trim().replace(/^"|"$/g, "");
})();
const SOCIAL_IG = path.join(SOCIAL_ROOT, "3-journal");
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

function run(input, output, mode, position) {
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const pos = position ? ` ${position}` : "";
  execSync(`node "${PROCESS_IMAGE}" "${input}" "${output}" ${mode}${pos}`, { stdio: "inherit" });
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
    // The 1200x630 OG crop is a thin horizontal band. On a tall portrait hero
    // the default centre crop lands on the middle of the body and cuts the
    // face off entirely, which is what a link preview shows. Set
    // `og_position` in the manifest ("top", "bottom", ...) for those.
    run(heroSource, path.join(webDir, `${photoSlug}-og.jpg`), "og", article.og_position);
  }
}

console.log("\nDone.");
