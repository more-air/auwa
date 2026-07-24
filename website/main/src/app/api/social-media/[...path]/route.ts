import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { SOCIAL_ROOT } from "@/lib/social-root";

// SOCIAL_ROOT is the pillar-containing folder (repo social/instagram, or the
// Dropbox `social` folder when AUWA_SOCIAL_ROOT is set). URL parts are
// <pillar>/<post>/<file> — the `instagram/` segment was dropped so the same
// paths resolve under either layout.

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".webm": "video/webm",
  ".txt": "text/plain; charset=utf-8",
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: parts } = await params;
  if (!parts || parts.length === 0) {
    return new NextResponse("Not found", { status: 404 });
  }

  const requested = path.join(SOCIAL_ROOT, ...parts);
  const resolved = path.resolve(requested);
  if (!resolved.startsWith(SOCIAL_ROOT + path.sep) && resolved !== SOCIAL_ROOT) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  try {
    const info = await stat(resolved);
    if (!info.isFile()) {
      return new NextResponse("Not found", { status: 404 });
    }
    const data = await readFile(resolved);
    const ext = path.extname(resolved).toLowerCase();
    const type = MIME[ext] ?? "application/octet-stream";
    return new NextResponse(new Uint8Array(data), {
      status: 200,
      headers: {
        "Content-Type": type,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
