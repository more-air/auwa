#!/usr/bin/env python3
"""
Survey a photo library for Auwa journal use.

Answers the three questions that cost a whole session to work out by hand
in September 2026, and that every future article selection needs again:

  1. Is this photo ALREADY published?  (photography/_manifest.json is the
     authority; it maps source filename -> article/name. A perceptual hash
     backstops it, because a few published images were re-exported through
     Topaz and no longer carry their original filename.)
  2. Can it be a hero?  (auwa.life heroes are portrait, 2400px tall, ~3:4.)
  3. Will it survive the Instagram cover treatment?  (a 1-2 word EB Garamond
     title in Washi sits centred over the upper-middle of a 1080x1350 crop,
     with the AUWA wordmark 120px from the top. Bright or busy in that band
     and the text disappears.)

Usage
  python3 scripts/photo-survey.py "/path/to/photo/folder" [--json out.json]
  python3 scripts/photo-survey.py "…/2 favourite/2018 Japan" --top 40

Needs Pillow only (already present on both Macs).
"""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps, ImageStat
except ImportError:
    sys.exit("Pillow is required:  pip3 install Pillow")

REPO = Path(__file__).resolve().parent.parent
MANIFEST = REPO / "photography" / "_manifest.json"
PUBLISHED_DIR = REPO / "website" / "main" / "public" / "journal"
EXT = {".jpg", ".jpeg", ".heic", ".png", ".tif", ".tiff"}

# Site convention, measured off the 11 published heroes: all portrait, all exactly
# 2400 tall, at either 3:4 (0.753) or 2:3 (0.667). Koya-san and Yakushima are the
# 2:3 pair, so the floor MUST sit below 0.667 or every DSLR portrait frame — which
# is natively 2:3 — gets rejected. An earlier 0.70 threshold silently discarded 344
# of 346 photos in the 2018 trip.
HERO_MIN_HEIGHT = 2400
HERO_MIN_RATIO = 0.66  # width / height; 3:4 is 0.753, 2:3 is 0.667


def published_filenames() -> dict[str, list[str]]:
    """Source filenames the manifest says are already published."""
    if not MANIFEST.exists():
        return {}
    data = json.loads(MANIFEST.read_text())
    out: dict[str, list[str]] = {}
    for slug, entry in data.get("articles", {}).items():
        for name, fn in entry.get("images", {}).items():
            out.setdefault(fn.lower(), []).append(f"{slug}/{name}")
    return out


def dhash(path: Path, size: int = 16) -> int | None:
    """Orientation-normalised difference hash. Survives resize and re-encode."""
    try:
        with Image.open(path) as im:
            im = ImageOps.exif_transpose(im).convert("L")
            im = im.resize((size + 1, size), Image.LANCZOS)
            px = list(im.getdata())
    except Exception:
        return None
    bits = 0
    for r in range(size):
        row = px[r * (size + 1) : (r + 1) * (size + 1)]
        for c in range(size):
            bits = (bits << 1) | (1 if row[c] > row[c + 1] else 0)
    return bits


def published_hashes() -> list[tuple[str, int]]:
    out = []
    for p in sorted(PUBLISHED_DIR.glob("*/*.jpg")):
        h = dhash(p)
        if h is not None:
            out.append((str(p.relative_to(PUBLISHED_DIR)), h))
    return out


def ig_cover_score(path: Path) -> tuple[int, str]:
    """
    0-100 for how well a photo carries the IG cover treatment.

    The cover renders a light (Washi #EFE9DD) 1-2 word title over a 10% black
    wash, centred, with its top at 570/1350 of the canvas, and the wordmark at
    120/1350. So we want the band behind the text to be reasonably DARK and
    reasonably CALM. Bright blows out light text; busy detail shreds it.
    """
    try:
        with Image.open(path) as im:
            im = ImageOps.exif_transpose(im).convert("L")
            # emulate the 4:5 centre crop IG will get
            w, h = im.size
            target = w * 5 / 4
            if h > target:
                top = (h - target) / 2
                im = im.crop((0, int(top), w, int(top + target)))
            im = im.resize((216, 270), Image.LANCZOS)  # 1080x1350 / 5
            text_band = im.crop((0, 90, 216, 190))     # ~450-950px of 1350
            top_band = im.crop((0, 14, 216, 46))       # wordmark strip
    except Exception:
        return 0, "unreadable"

    lum = ImageStat.Stat(text_band).mean[0]          # 0-255
    busy = ImageStat.Stat(text_band).stddev[0]       # local contrast
    top_lum = ImageStat.Stat(top_band).mean[0]

    # Dark-to-mid is ideal for light text: peak around 60-120.
    if lum <= 120:
        lum_score = 100 - abs(lum - 90) * 0.6
    else:
        lum_score = max(0, 100 - (lum - 120) * 1.1)
    # Calm is better. stddev under ~35 reads clean; over ~70 is noise.
    busy_score = max(0, 100 - max(0, busy - 30) * 1.8)
    top_score = 100 if top_lum <= 150 else max(0, 100 - (top_lum - 150) * 1.2)

    score = int(round(lum_score * 0.45 + busy_score * 0.40 + top_score * 0.15))
    notes = []
    if lum > 150:
        notes.append("bright behind title")
    if busy > 60:
        notes.append("busy behind title")
    if top_lum > 170:
        notes.append("bright under wordmark")
    return max(0, min(100, score)), ", ".join(notes) or "clean"


def survey(folder: Path, hash_check: bool) -> list[dict]:
    used = published_filenames()
    pub = published_hashes() if hash_check else []
    rows = []
    for path in sorted(folder.rglob("*")):
        if path.suffix.lower() not in EXT or not path.is_file():
            continue
        try:
            with Image.open(path) as im:
                im = ImageOps.exif_transpose(im)
                w, h = im.size
        except Exception:
            continue

        why_used = used.get(path.name.lower())
        if not why_used and pub:
            hv = dhash(path)
            if hv is not None:
                for name, h2 in pub:
                    if bin(hv ^ h2).count("1") <= 15:
                        why_used = [f"{name} (hash match)"]
                        break

        portrait = h > w * 1.05
        hero_ok = h >= HERO_MIN_HEIGHT and w >= h * HERO_MIN_RATIO
        score, notes = ig_cover_score(path)
        rows.append(
            {
                "path": str(path),
                "name": path.name,
                "w": w,
                "h": h,
                "portrait": portrait,
                "hero_ok": hero_ok,
                "published_as": why_used or None,
                "ig_cover_score": score,
                "ig_notes": notes,
            }
        )
    return rows


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("folder", help="photo library folder to survey (recursive)")
    ap.add_argument("--json", help="write full results to this JSON file")
    ap.add_argument("--top", type=int, default=25, help="how many candidates to print")
    ap.add_argument("--no-hash", action="store_true", help="skip the perceptual backstop (faster)")
    args = ap.parse_args()

    folder = Path(args.folder).expanduser()
    if not folder.is_dir():
        sys.exit(f"not a folder: {folder}")

    rows = survey(folder, hash_check=not args.no_hash)
    if args.json:
        Path(args.json).write_text(json.dumps(rows, indent=2))

    total = len(rows)
    already = [r for r in rows if r["published_as"]]
    free = [r for r in rows if not r["published_as"]]
    heroes = [r for r in free if r["hero_ok"] and r["portrait"]]
    heroes.sort(key=lambda r: -r["ig_cover_score"])

    print(f"\n{folder}")
    print(f"  {total} images   {len(already)} already published   {len(free)} available")
    print(f"  {len(heroes)} portrait + hero-capable and unpublished\n")

    if already:
        print("Already published (do not reuse):")
        for r in already:
            print(f"  {r['name']:<44} -> {', '.join(r['published_as'])}")
        print()

    print(f"Best unpublished hero candidates (ranked by IG cover fit):")
    print(f"  {'score':>5}  {'size':<11} {'notes':<26} name")
    for r in heroes[: args.top]:
        print(f"  {r['ig_cover_score']:>5}  {r['w']}x{r['h']:<5} {r['ig_notes']:<26} {r['name']}")
    print("\n  Score is IG-cover fit only, not photographic quality. Always look at the")
    print("  shortlist before recommending; this narrows the field, it does not judge.\n")


if __name__ == "__main__":
    main()
