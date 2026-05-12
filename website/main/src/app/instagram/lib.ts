import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const REPO_ROOT = path.resolve(process.cwd(), "..", "..");
export const SOCIAL_ROOT = path.join(REPO_ROOT, "social", "instagram");
const SCHEDULE_FILE = path.join(SOCIAL_ROOT, "_scripts", "schedule.txt");

const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;
const VIDEO_EXT = /\.(mp4|mov|webm)$/i;

export type PostType = "editorial" | "reel" | "single" | "carousel" | "unknown";

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
  scheduled: string | null;
  files: string[];
  candidates: Candidate[];
  coverIndex: number;
};

// URL-slug -> article metadata. Mirrors the journal articles object
// (kept inline to avoid pulling 800 lines of article content into this route).
const ARTICLE_TITLES: Record<string, string> = {
  "yakushima-island": "Yakushima",
  "koya-san": "Koya-san",
  "nozawa-fire-festival": "Nozawa Fire Festival",
  "making-washi": "Making Washi",
  "oroku-gushi": "Oroku-gushi",
  "72-seasons": "72 Seasons",
  "the-onsen-lesson": "The Onsen Lesson",
  "shigefusa-knife": "Shigefusa",
  "narai-juku": "Narai in Snow",
  "yaoyorozu-no-kami": "Yaoyorozu no Kami",
  "the-beginning": "The Beginning",
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
  const enc = (f: string) => {
    const segments = folder.split("/").map(encodeURIComponent).join("/");
    return `/api/social-media/instagram/${segments}/${encodeURIComponent(f)}`;
  };

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
    const hero =
      images.find((f) => /^image-hero-text\.(jpe?g|png|webp)$/i.test(f)) ||
      images.find((f) => /^image-hero\.(jpe?g|png|webp)$/i.test(f));
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

function parsePost(text: string): { sourceSlug: string | null; scheduled: string | null; titleHint: string | null } {
  const lines = text.split(/\r?\n/);
  let sourceSlug: string | null = null;
  let scheduled: string | null = null;
  let titleHint: string | null = null;

  for (const line of lines) {
    const m = line.match(/^Source:\s*(.+)$/i);
    if (m) {
      const url = m[1].trim();
      const slugMatch = url.match(/\/journal\/([a-z0-9-]+)/i);
      if (slugMatch) sourceSlug = slugMatch[1];
    }
    const s = line.match(/^Scheduled:\s*(.+)$/i);
    if (s) scheduled = s[1].trim();

    // First non-blank line that isn't a "Key: value" header is treated as a
    // potential title hint (e.g. "The Beginning | Auwa Journal").
    if (!titleHint && line.trim() && !line.includes(":") && !/^[=-]+$/.test(line.trim())) {
      titleHint = line.trim();
    }
  }
  return { sourceSlug, scheduled, titleHint };
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
  // For nested slugs (pillar/post), humanise only the leaf segment so the
  // tile title is "Koya San" not "Journal Koya San".
  const leaf = slug.includes("/") ? slug.slice(slug.lastIndexOf("/") + 1) : slug;
  return leaf
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
      scheduled: null,
      files: [],
      candidates: [],
      coverIndex: 0,
    };
  }

  const type = detectType(entries);
  const { candidates, coverIndex } = buildCandidates(slug, entries, type);
  const cover = candidates[coverIndex]?.url ?? null;
  const isVideo = candidates[coverIndex]?.isVideo ?? false;

  let title = humaniseSlug(slug);
  let scheduled: string | null = null;

  const postText = await readPostFile(slug);
  if (postText) {
    const parsed = parsePost(postText);
    if (parsed.sourceSlug && ARTICLE_TITLES[parsed.sourceSlug]) {
      title = ARTICLE_TITLES[parsed.sourceSlug];
    } else if (parsed.titleHint) {
      const cleaned = parsed.titleHint.replace(/\s*\|\s*Auwa.*$/i, "").trim();
      if (cleaned) title = cleaned;
    }
    if (parsed.scheduled && parsed.scheduled.toUpperCase() !== "TBD") scheduled = parsed.scheduled;
  }

  return {
    slug,
    exists: true,
    type,
    cover,
    isVideo,
    title,
    scheduled,
    files: entries,
    candidates,
    coverIndex,
  };
}

export type PlanData = {
  scheduled: PostTile[];
  backlog: PostTile[];
  totalFolders: number;
};

export async function loadPlan(): Promise<PlanData> {
  const order = await readScheduleOrder();
  const allFolders = await discoverFolders();

  const scheduledSet = new Set(order);
  const scheduled = await Promise.all(order.map(buildTile));
  const backlogSlugs = allFolders.filter((f) => !scheduledSet.has(f)).sort();
  const backlog = await Promise.all(backlogSlugs.map(buildTile));

  return {
    scheduled,
    backlog,
    totalFolders: allFolders.length,
  };
}

// Discover folders two levels deep — pillar/post-name. Top-level dirs that
// start with "_" or "." are reserved (e.g. _resize, _scripts, _assets).
async function discoverFolders(): Promise<string[]> {
  const out: string[] = [];
  let pillars: { name: string; isDirectory: () => boolean }[] = [];
  try {
    pillars = await readdir(SOCIAL_ROOT, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const p of pillars) {
    if (!p.isDirectory() || p.name.startsWith("_") || p.name.startsWith(".")) continue;
    try {
      const posts = await readdir(path.join(SOCIAL_ROOT, p.name), { withFileTypes: true });
      for (const post of posts) {
        if (post.isDirectory() && !post.name.startsWith("_") && !post.name.startsWith(".")) {
          out.push(`${p.name}/${post.name}`);
        }
      }
    } catch {
      // Skip unreadable pillar dirs.
    }
  }
  return out;
}
