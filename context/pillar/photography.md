# Photography — the archive, and how articles get made from it

*Created 8 September 2026, at the end of a session that surveyed the whole Japan photo
archive and rebuilt the journal's SEO. Written so the next session starts where this one
finished instead of re-deriving it. Pairs with `journal.md` (voice, structure, SEO) and
the `/journal:article` command (the actual production steps).*

---

## THE ONE THING THAT MATTERS MOST

**Claude can select the photographs and structure the article. Claude cannot supply the
memory, and must never fake it.**

The journal's entire advantage is first-hand experience. Section 8 of `journal.md` records
why the articles rank at all: Google's helpful-content and E-E-A-T systems reward genuine
first-hand experience, original photography and specificity nobody else has. On 8 September
2026 Google's AI Overview for Narai-juku cited auwa.life as a source, with no backlink
campaign, because the writing came from someone who had actually stood there.

An article written from photographs alone reads as competent travel writing and contains
nothing a hundred other sites do not already have. It would be exactly the commodity content
that AI search devalues, and publishing it erodes the thing that makes the rest work.

**So every article needs a few minutes of real memory from Tom or Rieko before it is
written.** Not a brief, not an outline: what it smelled like, what someone said, what went
wrong, what surprised them. Five minutes of voice note is enough. Step 1 of
`/journal:article` already asks for "specific memories or details" — treat that as a hard
gate, not a nicety.

To make it cheap, **draft the questions from the selected photographs** and ask them
specifically. "Who was the woodcarver in the 2016 studio, and how did you find her?" gets a
usable answer. "Tell me about the trip" does not.

The division of labour that follows:

| Claude | Tom / Rieko |
| --- | --- |
| Survey the archive, shortlist, sequence, pick the hero | Supply the memory (5 min per article) |
| Keyword research, title, description, alt text | Lightroom edit into `2-edited/` |
| Draft the article in house voice | Read, correct, approve |
| IG cover fit, quote selection, caption | Post |

Claude is the editor. Tom and Rieko are the correspondents, and the byline is theirs. That
distinction is what keeps the E-E-A-T claim honest.

---

## THE ARCHIVE

Two folders under `/Users/admin/Dropbox/4 media/photo/tom/`:

- **`1 original/`** — the full library. ~3,693 Japan photos across 2008, 2009, 2010, 2012,
  2013, 2014, 2015, 2016, 2018, 2022.
- **`2 favourite/`** — a curated subset, 1,645 Japan photos across 2009-2022 (no 2008 or
  2010). This is where the September 2026 survey was done.

**`2 favourite` is a selection, not the whole library.** The Koya-san hero (`IMG_1833.jpg`)
is published on the site and does not exist in `2 favourite` at all. So "the archive is
exhausted for subject X" is only ever a statement about the curated folder. Check
`1 original` before concluding anything is used up. 2016 in particular is 402 photos in
`2 favourite` and 1,158 in `1 original`.

There are also later trips (2025 photos appear in the manifest) not yet filed into either
Japan folder.

### What is in each trip

| Trip | Locations | Notes |
| --- | --- | --- |
| 2009 | Kyoto | 16 photos in `2 favourite`, low resolution |
| 2012 | Kyoto, Beppu | Temizuya ladles already used on Onsen |
| 2013 | Kyoto, Niseko/Hokkaido, Tokyo | Mt Yotei in snow; Arashiyama bamboo; sakura |
| 2014 | Naoshima, Seto islands, **Koya-san in snow**, Tokyo | New Year shrine visit (ema, omikuji). Koya-san frames largely published |
| 2015 | Hiroshima/Miyajima, macro nature | Spider web already used on Yakushima |
| 2016 | **Narai-juku in summer**, Kamikochi, Matsumoto, Kanazawa, Fushimi Inari, Osaka | The richest craft trip: **a woodcarver's studio**, craftsmen at work, Kanazawa gold leaf |
| 2018 | **Mount Aso**, **Kumano Kodo**, Nachi, Himeji, Kyushu onsen | The strongest single article seam in the archive |
| 2022 | Tokyo, **Ishigaki/Yaeyama**, **Kyoto + Ohara**, Kakogawa | All Google Pixel phone, 377 of 491 native portrait. Ohara partly used by 72 Seasons |

### Two finds worth acting on beyond the journal

**The woodcarver (2016, `IMG_6747`–`IMG_6851`).** A Japanese maker photographed on tatami
beside a carved wooden character figure with a pale face, on a rough-hewn wooden base. That
is the Auwa figure's exact register, made by a Japanese hand, and Tom and Rieko have already
met her. Given the collab programme runs on form crafts and on pitching with a photograph
rather than a written proposal (`context/business/figure.md`), this relationship may be worth
more than any photograph in the archive. Tom knows who she is.

**Craft workshops already visited (2016, 2022).** A lacquerware maker (Yamada Heiando),
a tea-caddy workshop with shelves of caddies ageing differently in each metal, hammered
copper kettles, Kanazawa gold leaf. Three of those are named collab targets in the root
`CLAUDE.md`. These are article subjects and door-openers at the same time.

---

## NEVER REUSE A PUBLISHED PHOTO

This was got wrong once, on 8 September 2026: six of forty-nine shortlisted photos were
already live, including a monk at Okunoin that had been the hero recommendation.

**`photography/_manifest.json` is the authority.** It maps source filename to
`article/name` for every published image, and it is the only tracked file in
`photography/`. Check it first, always.

**A perceptual hash backstops it**, because some published images were re-exported through
Topaz and no longer carry their original filename (`*_topaz.jpg` in the manifest).

Both checks are wired into **`scripts/photo-survey.py`**. Run it before recommending
anything:

```bash
python3 scripts/photo-survey.py "/Users/admin/Dropbox/4 media/photo/tom/2 favourite/2018 Japan" --top 40
```

It reports, per folder: total images, which are already published and where, which are
portrait and hero-capable, and an IG-cover-fit score. It narrows the field. It does not
judge photographs — always look at the shortlist before recommending.

---

## WHAT THE SITE NEEDS FROM A PHOTOGRAPH

**Portrait, always.** Every one of the eleven published heroes is portrait at 2400px tall,
mostly 3:4 (1807x2400), some 2:3 (1600x2400). Tom's reasoning: portrait reads better on
mobile and transfers straight to social. A landscape frame can sometimes be cropped, but
only when the crop does not destroy the composition — a symmetrical framed-window shot dies
when you crop it to portrait.

In `2 favourite`, 842 of 1,645 Japan photos are native portrait and 1,119 are hero-capable
(portrait, or landscape tall enough to crop to 3:4 at 2400).

**It must also survive the Instagram cover.** `/instagram:post` renders a 1-2 word EB
Garamond title in Washi (`#EFE9DD`), centred, top at 570px of a 1080x1350 canvas, over a 10%
black wash, with the AUWA wordmark 120px from the top. That means:

- the band roughly a third to two-thirds down the frame should be **mid-to-dark**, because
  the type is light. A blown-out sky there kills it.
- that band should be **calm**. Busy detail shreds large serif type.
- the top strip should be quiet too, for the wordmark.
- the subject should sit low or to the edges, not dead centre.
- the topic must reduce to **1-2 words**. Place names and single concepts work
  (*Nozawa*, *Yakushima*, *Kokoro*). Multi-word abstractions do not.

`scripts/photo-survey.py` scores this automatically. Prefer a hero that works both ways;
where nothing does, the IG command can fall back to a clean untitled hero
(`image-hero.jpg`), so a superb photograph is never rejected for scoring badly.

---

## THE WORKFLOW, WHEN CLAUDE SOURCES THE PHOTOS

The standard path in `/journal:article` assumes Tom has already dropped edited photos into
`photography/[slug]/2-edited/`. When Claude is selecting from the archive instead, the job
splits in two, because image processing needs Lightroom output that does not exist yet.

**Phase 1 — Claude, before Tom touches anything**

1. Run `scripts/photo-survey.py` over the relevant trip folders.
2. Shortlist, look at the actual frames, choose a hero and a sequence.
3. `mkdir -p photography/[slug]/1-original` and copy the selected originals in. All media
   under `photography/` is gitignored, so this costs the repo nothing — only
   `_manifest.json` is tracked.
4. Ask the memory questions, drawn from the selected photographs.
5. Do Step 1b keyword research and agree the angle.
6. Write the article and hold it.

**Phase 2 — Tom**

7. Lightroom import from `1-original/`, apply the matching Auwa preset, export to
   `2-edited/`.
8. Read and correct the draft.

**Phase 3 — Claude**

9. Resume `/journal:article` from Step 2 (image processing) with the real edited files.
10. Add the `_manifest.json` entry so the photos are permanently marked as used.
11. Steps 6-8 as normal: site entry, deploy, request indexing.

Do not skip step 10. The manifest is what stops the next session recommending a photo that
is already on the site.

---

## ARTICLE BACKLOG, WITH ITS PHOTOGRAPHY ALREADY IDENTIFIED

Ordered by strength. Every one of these is already photographed.

1. **Kokoro** — the philosophy cluster's anchor, and the biggest gap in the whole SEO
   picture: Auwa has no page for the concept it most wants to be known for. Competition on
   "kokoro meaning" is thin content farms, with only Quartz and Japan House Illinois holding
   real ground. Hero: the Ohara doorway, `2022 Japan/1 pixel/original_04cbcf2b…061228073.jpg`,
   native 3:4 portrait, a dark still room opening onto a lit garden. **Caveat:** the 72
   Seasons article already draws on the same Ohara afternoon (engawa, veranda, tsukubai), so
   decide deliberately whether a second article from one temple reads as house style or thin
   sourcing.
2. **Kumano Kodo** — a complete article already shot: Nachi waterfall alone and with the
   pagoda, moss-covered stone steps, cedar trunks, the Hongu gate with imperial chrysanthemum
   curtains, a stone waymarker. Real search demand, mostly tour-operator competition.
3. **Mount Aso** — the caldera, Kusasenri grassland, Miyama Kirishima azaleas.
4. **Narai-juku in summer** — a second piece on a subject Auwa already ranks for and is
   cited by AI Overview on. Swallows nesting under the eaves (a six-frame sequence),
   hanging straw, lattice facades in green light. Cheapest ranking available.
5. **Swallows return (玄鳥至)** — one of the 72 micro-seasons, early April, with the
   photographs to carry it. A micro-season piece with a real subject rather than an abstract
   essay, linking straight into the 72 Seasons article.
6. **The woodcarver** — needs Rieko's Japanese-language contact and the maker's consent.
   Doubles as collab groundwork.
7. **Ma (間)** — second philosophy piece. Tokonoma with a scroll and one flower, raked
   gravel, temple corridors, rooms framing mountains.
8. **Naoshima** — high demand, right register for Kinfolk/Monocle readers, but contemporary
   art rather than craft or philosophy, so weakest on Auwa fit.

A working shortlist with full paths, dimensions and per-photo notes was produced on
8 September 2026 and lives in the session scratchpad. Regenerate it with
`scripts/photo-survey.py` rather than hunting for that file.

---

*Confidential. Auwa Limited. All rights reserved.*
