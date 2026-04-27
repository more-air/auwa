import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const REPO_ROOT = path.resolve(process.cwd(), "..", "..");
export const SOCIAL_ROOT = path.join(REPO_ROOT, "social", "instagram");
const SCHEDULE_FILE = path.join(SOCIAL_ROOT, "_schedule.txt");

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;
const VIDEO_EXT = /\.(mp4|mov|webm)$/i;

export type PostType = "editorial" | "reel" | "single" | "carousel" | "unknown";

export type Pillar = "Craft" | "Travel" | "Philosophy" | "Seasons" | "Book" | null;

export type Warning = {
  kind: "run-pillar" | "run-type" | "echo-pillar";
  message: string;
};

export type Candidate = {
  name: string;
  url: string;
  isVideo: boolean;
};

export type PostTile = {
  slug: string;
  exists: boolean;
  type: PostType;
  cover: string | null;
  isVideo: boolean;
  title: string;
  pillar: Pillar;
  scheduled: string | null;
  files: string[];
  warnings: Warning[];
  candidates: Candidate[];
  coverIndex: number;
};

// URL-slug -> article metadata. Mirrors the journal articles object
// (kept inline to avoid pulling 800 lines of article content into this route).
const ARTICLE_META: Record<string, { title: string; category: Pillar }> = {
  "yakushima-island": { title: "Yakushima", category: "Travel" },
  "koya-san": { title: "Koya-san", category: "Travel" },
  "nozawa-fire-festival": { title: "Nozawa Fire Festival", category: "Seasons" },
  "making-washi": { title: "Making Washi", category: "Craft" },
  "oroku-gushi": { title: "Oroku-gushi", category: "Craft" },
  "72-seasons": { title: "72 Seasons", category: "Seasons" },
  "the-onsen-lesson": { title: "The Onsen Lesson", category: "Philosophy" },
  "shigefusa-knife": { title: "Shigefusa", category: "Craft" },
  "narai-juku": { title: "Narai in Snow", category: "Travel" },
  "yaoyorozu-no-kami": { title: "Yaoyorozu no Kami", category: "Philosophy" },
  "the-beginning": { title: "The Beginning", category: "Philosophy" },
};

function detectType(files: string[]): PostType {
  const hasPost = files.includes("_post.txt");
  const images = files.filter((f) => IMAGE_EXT.test(f));
  const videos = files.filter((f) => VIDEO_EXT.test(f));
  const editorialImages = images.filter((f) => /^image-/i.test(f));
  const textFrames = images.filter((f) => /^text-/i.test(f));

  if (hasPost && editorialImages.length > 0 && textFrames.length > 0) return "editorial";
  if (videos.length > 0) return "reel";
  if (images.length === 1 && textFrames.length === 0) return "single";
  if (images.length > 1 && textFrames.length === 0) return "carousel";
  return "unknown";
}

function buildCandidates(folder: string, files: string[], type: PostType): { candidates: Candidate[]; coverIndex: number } {
  const enc = (f: string) => `/api/social-media/${encodeURIComponent(folder)}/${encodeURIComponent(f)}`;

  // Hero candidates: every image (excluding text-* slide frames) plus any
  // video files. Sorted so order is stable across renders.
  const images = files
    .filter((f) => IMAGE_EXT.test(f) && !/^text-/i.test(f))
    .sort();
  const videos = files.filter((f) => VIDEO_EXT.test(f)).sort();

  const candidates: Candidate[] = [];

  // Default cover goes first so the initial visible image matches the
  // type heuristic (image-hero for editorial, video for reel, etc.).
  if (type === "editorial") {
    const hero = images.find((f) => /^image-hero\.(jpe?g|png|webp)$/i.test(f));
    if (hero) candidates.push({ name: hero, url: enc(hero), isVideo: false });
  } else if (type === "reel" && videos.length > 0) {
    const v = videos[0];
    candidates.push({ name: v, url: enc(v), isVideo: true });
  }

  for (const img of images) {
    if (!candidates.some((c) => c.name === img)) {
      candidates.push({ name: img, url: enc(img), isVideo: false });
    }
  }
  for (const v of videos) {
    if (!candidates.some((c) => c.name === v)) {
      candidates.push({ name: v, url: enc(v), isVideo: true });
    }
  }

  return { candidates, coverIndex: 0 };
}

function parsePost(text: string): { sourceSlug: string | null; pillarOverride: Pillar; scheduled: string | null; titleHint: string | null } {
  const lines = text.split(/\r?\n/);
  let sourceSlug: string | null = null;
  let pillarOverride: Pillar = null;
  let scheduled: string | null = null;
  let titleHint: string | null = null;

  for (const line of lines) {
    const m = line.match(/^Source:\s*(.+)$/i);
    if (m) {
      const url = m[1].trim();
      const slugMatch = url.match(/\/journal\/([a-z0-9-]+)/i);
      if (slugMatch) sourceSlug = slugMatch[1];
    }
    const p = line.match(/^Pillar:\s*(Craft|Travel|Philosophy|Seasons|Book)\b/i);
    if (p) {
      const v = p[1].toLowerCase();
      pillarOverride = (v.charAt(0).toUpperCase() + v.slice(1)) as Pillar;
    }
    const s = line.match(/^Scheduled:\s*(.+)$/i);
    if (s) scheduled = s[1].trim();

    // First non-blank line that isn't a "Key: value" header is treated as a
    // potential title hint (e.g. "The Beginning | AUWA Journal").
    if (!titleHint && line.trim() && !line.includes(":") && !/^[=-]+$/.test(line.trim())) {
      titleHint = line.trim();
    }
  }
  return { sourceSlug, pillarOverride, scheduled, titleHint };
}

async function readScheduleOrder(): Promise<string[]> {
  try {
    const text = await readFile(SCHEDULE_FILE, "utf8");
    return text
      .split(/\r?\n/)
      .map((l) => l.trim())
      .filter((l) => l && !l.startsWith("#"));
  } catch {
    return [];
  }
}

async function readPostFile(folder: string): Promise<string | null> {
  try {
    return await readFile(path.join(SOCIAL_ROOT, folder, "_post.txt"), "utf8");
  } catch {
    return null;
  }
}

function humaniseSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

async function buildTile(slug: string): Promise<PostTile> {
  const dir = path.join(SOCIAL_ROOT, slug);
  let entries: string[] = [];
  try {
    const dirents = await readdir(dir, { withFileTypes: true });
    entries = dirents.filter((d) => d.isFile()).map((d) => d.name);
  } catch {
    return {
      slug,
      exists: false,
      type: "unknown",
      cover: null,
      isVideo: false,
      title: humaniseSlug(slug),
      pillar: null,
      scheduled: null,
      files: [],
      warnings: [],
      candidates: [],
      coverIndex: 0,
    };
  }

  const type = detectType(entries);
  const { candidates, coverIndex } = buildCandidates(slug, entries, type);
  const cover = candidates[coverIndex]?.url ?? null;
  const isVideo = candidates[coverIndex]?.isVideo ?? false;

  let title = humaniseSlug(slug);
  let pillar: Pillar = null;
  let scheduled: string | null = null;

  const postText = await readPostFile(slug);
  if (postText) {
    const parsed = parsePost(postText);
    if (parsed.sourceSlug && ARTICLE_META[parsed.sourceSlug]) {
      title = ARTICLE_META[parsed.sourceSlug].title;
      pillar = ARTICLE_META[parsed.sourceSlug].category;
    } else if (parsed.titleHint) {
      const cleaned = parsed.titleHint.replace(/\s*\|\s*AUWA.*$/i, "").trim();
      if (cleaned) title = cleaned;
    }
    if (parsed.pillarOverride) pillar = parsed.pillarOverride;
    if (parsed.scheduled && parsed.scheduled.toUpperCase() !== "TBD") scheduled = parsed.scheduled;
  }

  return {
    slug,
    exists: true,
    type,
    cover,
    isVideo,
    title,
    pillar,
    scheduled,
    files: entries,
    warnings: [],
    candidates,
    coverIndex,
  };
}

function annotateWarnings(tiles: PostTile[]): void {
  for (let i = 0; i < tiles.length; i++) {
    const tile = tiles[i];

    // Run of 3: same pillar three slots in a row
    if (i >= 2 && tile.pillar) {
      const a = tiles[i - 2].pillar;
      const b = tiles[i - 1].pillar;
      if (a === tile.pillar && b === tile.pillar) {
        tile.warnings.push({ kind: "run-pillar", message: `3 ${tile.pillar} in a row` });
      }
    }

    // Run of 3: same content type three slots in a row
    if (i >= 2 && tile.type !== "unknown") {
      const a = tiles[i - 2].type;
      const b = tiles[i - 1].type;
      if (a === tile.type && b === tile.type) {
        tile.warnings.push({ kind: "run-type", message: `3 ${tile.type} in a row` });
      }
    }

    // Echo: same pillar within last 4 slots. Skip if run-pillar already
    // fired on this tile (don't double-warn for the same problem).
    const hasRunPillar = tile.warnings.some((w) => w.kind === "run-pillar");
    if (tile.pillar && !hasRunPillar) {
      for (let lookback = 1; lookback <= 4; lookback++) {
        const j = i - lookback;
        if (j < 0) break;
        if (tiles[j].pillar === tile.pillar) {
          const label = lookback === 1 ? "1 post ago" : `${lookback} posts ago`;
          tile.warnings.push({ kind: "echo-pillar", message: `${tile.pillar} ${label}` });
          break;
        }
      }
    }
  }
}

export type PlanData = {
  scheduled: PostTile[];
  backlog: PostTile[];
  totalFolders: number;
};

export async function loadPlan(): Promise<PlanData> {
  const order = await readScheduleOrder();

  let allFolders: string[] = [];
  try {
    const dirents = await readdir(SOCIAL_ROOT, { withFileTypes: true });
    allFolders = dirents
      .filter((d) => d.isDirectory() && !d.name.startsWith("_") && !d.name.startsWith("."))
      .map((d) => d.name);
  } catch {
    allFolders = [];
  }

  const scheduledSet = new Set(order);
  const scheduled = await Promise.all(order.map(buildTile));
  annotateWarnings(scheduled);
  const backlogSlugs = allFolders.filter((f) => !scheduledSet.has(f)).sort();
  const backlog = await Promise.all(backlogSlugs.map(buildTile));

  return {
    scheduled,
    backlog,
    totalFolders: allFolders.length,
  };
}
