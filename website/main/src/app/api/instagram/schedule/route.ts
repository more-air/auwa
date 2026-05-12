import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const REPO_ROOT = path.resolve(process.cwd(), "..", "..");
const SCHEDULE_FILE = path.join(REPO_ROOT, "social", "instagram", "_scripts", "schedule.txt");

// Slugs are <pillar>/<post-name>, e.g. journal/koya-san. Single-segment
// slugs are no longer accepted — every post must live under a pillar dir.
const SLUG_RX = /^[a-z0-9][a-z0-9-]*\/[a-z0-9][a-z0-9-]*$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const order = (body as { order?: unknown })?.order;
  if (!Array.isArray(order) || order.some((s) => typeof s !== "string" || !SLUG_RX.test(s))) {
    return NextResponse.json({ error: "Order must be an array of slug strings" }, { status: 400 });
  }

  // Preserve any leading comment header from the existing file so the
  // human-readable instructions don't get wiped on save.
  let header = "";
  try {
    const existing = await readFile(SCHEDULE_FILE, "utf8");
    const lines = existing.split(/\r?\n/);
    const headerLines: string[] = [];
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith("#") || trimmed === "") {
        headerLines.push(line);
        continue;
      }
      break;
    }
    if (headerLines.length > 0) {
      header = headerLines.join("\n").replace(/\n+$/, "") + "\n\n";
    }
  } catch {
    // No existing file; that's fine.
  }

  const next = header + (order as string[]).join("\n") + "\n";
  await writeFile(SCHEDULE_FILE, next, "utf8");

  return NextResponse.json({ ok: true, count: (order as string[]).length });
}
