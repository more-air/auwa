#!/usr/bin/env python3
"""
Write an article's copy out as plain text, into the shared Dropbox journal folder.

WHY THIS EXISTS

Until September 2026 the only way Rieko could review an article was for Tom to
paste it into an email, or for the two of them to sit side by side at the laptop
and edit line by line. That was slow, it made the review a scheduling problem,
and it meant she saw the prose but never the captions, the alt text or where the
photographs actually sat in the piece.

Now every article has a text/ folder next to its image/ folder, and the review is
a set of numbered files people work through at their own pace:

    0-brief.md    the plan: angle, photo selection, open questions   (Claude)
    1-draft.txt   the first written draft                            (Claude)
    2-rieko.txt   Rieko's edit: detail, corrections, Japanese        (Rieko)
    3-tom.txt     Tom's final pass, ready to go live                 (Tom)
    4-live.txt    exactly what is on the website right now           (Claude)

Claude writes 0, 1 and 4, and never touches 2 or 3. `4-live.txt` is regenerated
after each deploy, so it doubles as a backup and as the thing to diff against
when someone asks what changed.

The output is .txt rather than .md on purpose: Tom and Rieko read these in the
Dropbox app on Android, which renders markdown as raw ** and # characters. Same
reason `_post.txt` is plain text.

Usage
  python3 scripts/article-text.py findac              # one article
  python3 scripts/article-text.py --all               # every live article
  python3 scripts/article-text.py findac --slot 1     # write 1-draft.txt instead
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
ARTICLES_TSX = REPO / "website/main/src/app/journal/[slug]/page.tsx"
MANIFEST = REPO / "scripts/journal-manifest.json"
SLOTS = {0: "0-brief.md", 1: "1-draft.txt", 4: "4-live.txt"}


def journal_root() -> Path:
    env = REPO / "website/main/.env.local"
    if env.exists():
        for line in env.read_text().splitlines():
            if line.startswith("AUWA_JOURNAL_ROOT="):
                return Path(line.split("=", 1)[1].strip().strip('"'))
    sys.exit("AUWA_JOURNAL_ROOT not set in website/main/.env.local.")


def decode(t: str) -> str:
    """TSX stores curly punctuation as \\uXXXX escapes; render them for humans."""
    t = re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), t)
    t = re.sub(r'<a href="[^"]*">([^<]*)</a>', r"\1", t)   # keep link text, drop markup
    return re.sub(r"<[^>]+>", "", t).replace('\\"', '"')


def articles() -> dict[str, str]:
    src = ARTICLES_TSX.read_text()
    parts = re.split(r'\n  "([a-z0-9-]+)": \{\n', src)
    return {parts[i]: parts[i + 1] for i in range(1, len(parts), 2)}


def field(body: str, name: str) -> str | None:
    m = re.search(rf'^    {name}: "((?:[^"\\]|\\.)*)"', body, re.M)
    return decode(m.group(1)) if m else None


def render(slug: str, body: str) -> str:
    """The article as a person would read it, images and captions in place."""
    out: list[str] = []
    title = field(body, "title") or slug
    out.append(title.upper())
    out.append("=" * len(title))
    out.append("")
    for label, key in [("Subtitle", "subtitle"), ("Category", "category"),
                       ("Words by", "author"), ("Photos by", "photographer"),
                       ("Published", "publishedAt")]:
        v = field(body, key)
        if v:
            out.append(f"{label}: {v}")
    out.append(f"URL: auwa.life/journal/{slug}")
    out.append("")
    out.append("-" * 70)
    out.append("SEARCH METADATA (not shown on the page, but it is still copy)")
    out.append("-" * 70)
    for label, key in [("Google title", "seoTitle"), ("Meta description", "description"),
                       ("Hero image alt", "heroAlt")]:
        v = field(body, key)
        if v:
            out.append(f"\n{label}:\n  {v}")
    out.append("")
    out.append("-" * 70)
    out.append("ARTICLE")
    out.append("-" * 70)
    out.append("")

    # Walk the content array in order so images sit where they actually sit.
    pattern = (r'type: "(text|pullquote|image|image-pair)"'
               r'(?:,\n        text: "((?:[^"\\]|\\.)*)")?'
               r'(?:,\n        src: "([^"]*)",\n        alt: "((?:[^"\\]|\\.)*)"'
               r'(?:,\n        caption: "((?:[^"\\]|\\.)*)")?)?')
    for m in re.finditer(pattern, body):
        kind, text, src, alt, cap = m.groups()
        if kind == "text":
            out.append(decode(text)); out.append("")
        elif kind == "pullquote":
            out.append(f'    " {decode(text)} "'); out.append("")
        elif kind == "image":
            name = Path(src).name
            out.append(f"[ PHOTO: {name} ]")
            if cap: out.append(f"    caption: {decode(cap)}")
            out.append(f"    alt:     {decode(alt)}")
            out.append("")
        else:
            pair = re.search(r'images: \[\n(.*?)\n        \],', body[m.start():], re.S)
            out.append("[ PHOTO PAIR, side by side ]")
            if pair:
                for s2, a2, c2 in re.findall(
                        r'\{ src: "([^"]*)", alt: "((?:[^"\\]|\\.)*)", caption: "((?:[^"\\]|\\.)*)" \}',
                        pair.group(1)):
                    out.append(f"    {Path(s2).name}")
                    out.append(f"        caption: {decode(c2)}")
                    out.append(f"        alt:     {decode(a2)}")
            out.append("")

    out.append("-" * 70)
    out.append("PHOTOGRAPHS USED, in order, from image/2-edited/")
    out.append("-" * 70)
    man = json.loads(MANIFEST.read_text())["articles"]
    entry = next((v for v in man.values() if v.get("url_slug") == slug), None)
    if entry:
        for name, source in entry["images"].items():
            out.append(f"  {name:<18} {source}")
    out.append("")
    return "\n".join(out)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("slug", nargs="?")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--slot", type=int, default=4, choices=[1, 4])
    a = ap.parse_args()

    root, arts, man = journal_root(), articles(), json.loads(MANIFEST.read_text())["articles"]
    url_to_photo = {v["url_slug"]: k for k, v in man.items()}

    targets = list(arts) if a.all else [a.slug]
    if not a.all and not a.slug:
        sys.exit("Give an article slug, or --all. Known: " + ", ".join(arts))

    for slug in targets:
        if slug not in arts:
            print(f"  unknown slug {slug}"); continue
        photo_slug = url_to_photo.get(slug, slug)
        # Dropbox folder can be renamed independently of the frozen web slug.
        folder = man.get(photo_slug, {}).get("journal_folder", photo_slug)
        d = root / folder / "text"
        if not d.parent.exists():
            print(f"  no journal folder for {folder}, skipped"); continue
        d.mkdir(parents=True, exist_ok=True)
        out = d / SLOTS[a.slot]
        out.write_text(render(slug, arts[slug]))
        print(f"  {folder}/text/{SLOTS[a.slot]}  ({len(out.read_text().split())} words)")


if __name__ == "__main__":
    main()
