#!/usr/bin/env python3
"""
Measure a journal article's prose against the way Tom and Rieko actually write.

READ THIS BEFORE TRUSTING ANY NUMBER IT PRINTS.

The first version of this script was wrong, and wrong in an instructive way. It
measured a draft against the eleven articles already published on auwa.life and
called that "the house style". But Claude drafted most of those eleven, so the
corpus mostly measures Claude's own habits. Its most striking feature, that
28-53% of sentences run to eight words or fewer, is not a style anyone chose. It
is the short-declarative tic that the global CLAUDE.md names as the single most
recognisable AI tell, sitting in the corpus and being mistaken for a standard.

Acting on it, Claude chopped Tom's long sentences into short ones to "match the
house style", which made the piece read less like him, not more. Tom pushed back:
"AI tends to write in these super short sentences, which isn't my style at all."
He was right.

So the baseline here is Tom's own hand-written prose, measured off the paragraphs
he wrote for the Fin DAC article in September 2026:

    mean sentence      17.7 words
    median             16.5 words
    <= 8 words          7% of sentences
    >= 20 words        39% of sentences
    range              6 to 31 words

He writes LONG, joining clauses with commas and "and". The published corpus runs
a mean of 10-13. That gap is the measure of how far Claude's drafting pulls away
from the client's voice.

The bands below are therefore built around Tom's numbers, and the flags point the
other way from the first version: SHORT sentences and a low mean are the warning,
not long ones.

Usage
  python3 scripts/prose-check.py findac
  python3 scripts/prose-check.py findac --sentences
  python3 scripts/prose-check.py --all
"""
from __future__ import annotations

import argparse
import re
import statistics as st
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
ARTICLES = REPO / "website/main/src/app/journal/[slug]/page.tsx"

# Built around Tom's hand-written baseline (mean 17.7, median 16.5, 7% short,
# 39% long), with room either side. A draft that lands under the floor on
# `sent_mean` or over the ceiling on `short_pct` has been chopped into Claude
# rhythm and needs its clauses joining back up.
BANDS = {
    "sent_mean": (14.0, 20.0, "mean sentence length, words          (Tom writes 17.7)"),
    "sent_med":  (13.0, 19.0, "median sentence length, words        (Tom writes 16.5)"),
    "short_pct": (0,    18,   "sentences of 8 words or fewer, %     (Tom writes 7)"),
    "long_pct":  (25,   55,   "sentences of 20 words or more, %     (Tom writes 39)"),
    "para_w":    (60,   110,  "words per paragraph"),
    "paras":     (8,    15,   "paragraphs"),
    "words":     (650,  1200, "total words"),
    "run3":      (0,    1,    "runs of 3+ sentences all under 9 words (the AI tell)"),
    # Warmth is deliberate in Rieko's voice: 14 of the 17 in the Fin DAC article
    # are Tom's own words. This is a soft flag for a draft that has gone gushing,
    # not a target to write down to.
    "intens":    (0,    22,   "intensifiers: very/really/so/such/amazing/wonderful/lovely"),
}

INTENSIFIERS = r"(?i)\b(very|really|so|such|amazing|wonderful|lovely|beautiful)\b"


def decode(t: str) -> str:
    t = re.sub(r"\\u([0-9a-fA-F]{4})", lambda m: chr(int(m.group(1), 16)), t)
    return re.sub(r"<[^>]+>", "", t).replace('\\"', '"')


def articles() -> dict[str, dict]:
    src = ARTICLES.read_text()
    parts = re.split(r'\n  "([a-z0-9-]+)": \{\n', src)
    out = {}
    for i in range(1, len(parts), 2):
        slug, body = parts[i], parts[i + 1]
        paras = [decode(t) for t in re.findall(
            r'type: "text",\n        text: "((?:[^"\\]|\\.)*)"', body)]
        if not paras:
            continue
        a = re.search(r'author: "([^"]+)"', body)
        out[slug] = {"author": a.group(1) if a else "?", "paras": paras}
    return out


def measure(paras: list[str]) -> dict:
    prose = " ".join(paras)
    sents = [x.strip() for x in re.split(r"(?<=[.!?”]) +", prose) if x.strip()]
    lens = [len(x.split()) for x in sents]

    # Runs are counted WITHIN a paragraph, never across a paragraph break: a
    # break resets the rhythm on the page, so three short sentences either side
    # of one do not read as a stack. Measuring the joined prose produced three
    # false positives on the first run.
    run3 = 0
    for para in paras:
        run = 0
        for x in re.split(r"(?<=[.!?”]) +", para):
            if not x.strip():
                continue
            run = run + 1 if len(x.split()) < 9 else 0
            run3 += run == 3
    return {
        "words":     len(prose.split()),
        "paras":     len(paras),
        "para_w":    round(st.mean(len(p.split()) for p in paras)),
        "sent_mean": round(st.mean(lens), 1),
        "sent_med":  round(st.median(lens), 1),
        "short_pct": round(100 * sum(1 for x in lens if x <= 8) / len(lens)),
        "long_pct":  round(100 * sum(1 for x in lens if x >= 20) / len(lens)),
        "run3":      run3,
        "intens":    len(re.findall(INTENSIFIERS, prose)),
        "_sents":    sents,
    }


def report(slug: str, author: str, m: dict, show: bool) -> int:
    print(f"\n{slug}  ({author})")
    print("-" * 78)
    fails = 0
    for key, (lo, hi, label) in BANDS.items():
        v, ok = m[key], lo <= m[key] <= hi
        fails += not ok
        print(f" [{'  ok ' if ok else ' OUT '}] {label:<54} {v:>6}   ok {lo}-{hi}")
    print(f"\n {fails or 'No'} measure(s) outside range."
          if fails else "\n Everything in range.")
    if m["run3"]:
        print(" Runs of three-plus short sentences are the AI tell. Join them back up.")
    if show:
        print("\n Shortest sentences (chopped prose usually shows up here):")
        for x in sorted(m["_sents"], key=lambda s: len(s.split()))[:8]:
            print(f"   [{len(x.split()):>2}w] {x[:105]}")
    return fails


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("slug", nargs="?")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--sentences", action="store_true")
    a = ap.parse_args()
    arts = articles()

    if a.all:
        hdr = (f"{'article':<21}{'author':<13}{'words':>6}{'par':>4}"
               f"{'mean':>6}{'med':>6}{'<=8w%':>7}{'>=20w%':>7}{'run3':>6}{'intens':>7}")
        print(hdr + "\n" + "-" * len(hdr))
        for slug, art in arts.items():
            m = measure(art["paras"])
            print(f"{slug:<21}{art['author']:<13}{m['words']:>6}{m['paras']:>4}"
                  f"{m['sent_mean']:>6}{m['sent_med']:>6}{m['short_pct']:>7}"
                  f"{m['long_pct']:>7}{m['run3']:>6}{m['intens']:>7}")
        print("\nNote: the pre-Sept-2026 articles were drafted by Claude. Their low means and")
        print("high short-sentence counts are Claude's habit, not a target. See the docstring.")
        return

    if not a.slug or a.slug not in arts:
        sys.exit("Give a known slug or --all. Known: " + ", ".join(arts))
    art = arts[a.slug]
    sys.exit(1 if report(a.slug, art["author"], measure(art["paras"]), a.sentences) else 0)


if __name__ == "__main__":
    main()
