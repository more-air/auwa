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
specifically. "Who was the craftspeople trip in the 2016 studio, and how did you find her?" gets a
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

**Work from `2 favourite` only. This is a decision, not a limitation** (Tom, 8 September 2026):
he has already filtered that folder down to his best images, so surveying `1 original` means
re-doing his edit and wading through several thousand frames to find worse ones. Do not survey
`1 original` unless Tom asks.

One consequence to keep straight: `2 favourite` is still a *selection* (1,645 Japan photos against
~3,693 in `1 original`, and it holds no 2008 or 2010 trip at all). So "we have run out of photos
for subject X" is only ever a statement about the curated folder, and should be phrased that way
rather than as a claim about the whole archive.

*Correction, same day: an earlier version of this file said the published Koya-san hero
`IMG_1833.jpg` was absent from `2 favourite`, and used that as the example. It is there. The
manifest cross-reference that produced the claim was matching filenames case-sensitively against a
stale listing. The point about `2 favourite` being a subset stands; that particular evidence for it
did not.*

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

**The craftspeople trip (2016, `IMG_6747`–`IMG_6851`).** A Japanese maker photographed on tatami
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

**`scripts/journal-manifest.json` is the authority.** It maps source filename to
`article/name` for every published image, and it is the only tracked file in
`Dropbox/3 venture/auwa/journal/`. Check it first, always.

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

**Leave the hero room to be cropped (added 8 Sep 2026, from the Fin DAC hero).** The hero panel
is `object-cover` in a box whose ratio *changes with the reader's window*: a fixed 4:5 on mobile,
but `50vw / 100svh` on desktop, which measures 0.800 at 1440x900, 0.770-0.774 on the two
MacBooks, and **0.889 on a 16:9 monitor**. So no single aspect ratio avoids cropping everywhere,
and a 3:4 frame loses about 9% off the top and bottom on a 16:9 display.

What actually works is margin, not ratio. **A hero with a subject running the full height of the
frame needs roughly 8% empty space above and below it.** That absorbs the 5% worst-case crop at
every common window. The Fin DAC hero was re-exported twice: first padded at the sides to 4:5,
which still clipped because there was only 2.8% below her feet, then with the figure repositioned
inside the same frame to give 11.7% above and 7.4% below. Fixed.

Two corollaries. A full-length figure or an object photographed end to end is a demanding hero;
check the margins before choosing it. And do not reach for `object-contain` or a per-article fit
override to rescue a tight frame — that was tried and reverted, because a re-export solves it with
no code at all.

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
`Dropbox/3 venture/auwa/journal/[slug]/image/2-edited/`. When Claude is selecting from the archive instead, the job
splits in two, because image processing needs Lightroom output that does not exist yet.

**Phase 1 — Claude, before Tom touches anything**

1. Run `scripts/photo-survey.py` over the relevant trip folders.
2. Shortlist, look at the actual frames, choose a hero and a sequence.
3. `mkdir -p `Dropbox/3 venture/auwa/journal/[slug]/image/1-original/` and copy the selected originals in. All media
   under `Dropbox/3 venture/auwa/journal/` is gitignored, so this costs the repo nothing — only
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

## ARTICLE BACKLOG — WITH THE EXACT FOLDER AND FRAMES FOR EACH

**A fresh session does not have to re-survey the archive to start an article.** This table says
where the photographs are. Run `scripts/photo-survey.py` on the named folder to confirm nothing has
since been published, then look at the frames.

All paths are relative to `/Users/admin/Dropbox/4 media/photo/tom/2 favourite/`.
The Polarr edits (`2 polarr/`) are the fullest set for 2018; 2022 is all in `1 pixel/`.

| # | Article | Folder | Frames | Note |
| --- | --- | --- | --- | --- |
| 1 | ~~**Fin DAC / Rieko**~~ | — | — | **PUBLISHED 9 Sep 2026** as *Musubi*, auwa.life/journal/findac. |
| 2 | **Kumano Kodo** | already in `Dropbox/3 venture/auwa/journal/kumano-kodo/image/1-original/` | 15 selected | Brief written. Needs Tom's memory notes. |
| 3 | **Kokoro** | `2022 Japan/1 pixel/` | the 4–6 Nov Kyoto/Ohara set: `original_04cbcf2b…061228073` (hero, a tatami room framing maples), `PXL_20221106_091906762` (tokonoma), plus the ceramics from 25 Oct (`PXL_20221025_0918…`, `_0919…`, `_0934…`) | 72 Seasons already used the engawa, veranda and tsukubai from this same afternoon — check the manifest and decide whether a second Ohara piece reads as house style or thin sourcing. |
| 4 | **Mount Aso** | `2018 Japan/2 polarr/` | `IMG_5021`–`IMG_5025` (Kusasenri grassland, azaleas), `IMG_0585`, `IMG_0594` (caldera, winding road), `IMG_0764` (red poppies) | Same trip as Kumano. GPS-confirmed 11–12 May 2018 at 32.89, 131.06. iPhone frames `IMG_2031`–`IMG_2051` carry real timestamps. |
| 5 | **Narai-juku in summer** | `2016 Japan/` | `IMG_5409`–`IMG_5415` (a six-frame swallow-nest sequence), `IMG_5307` (hanging straw), `IMG_5390` (leaves in a ceramic dish), plus the lattice-facade street frames | Second piece on a subject Auwa already ranks for and is cited by AI Overview on. The published Narai article is winter; this is the same town in summer. |
| 6 | **Swallows return (玄鳥至)** | `2016 Japan/` | `IMG_5409`–`IMG_5415` | One of the 72 micro-seasons, early April. Shares photos with #5 — pick one article or split the sequence, do not run both on the same frames. |
| 7 | **The woodcarver** | `2016 Japan/` | `IMG_6747`, `IMG_6750`, `IMG_6765`, `IMG_6768`, `IMG_6835`, `IMG_6837`, `IMG_6851` | Needs Rieko's Japanese-language contact and the maker's consent. Doubles as collab groundwork. |
| 8 | **Ma (間)** | `2022 Japan/1 pixel/` + `2018 Japan/2 polarr/tom/` | 2022: `PXL_20221106_091906762` (tokonoma), the raked-gravel frames, temple corridors. 2018: `IMG_0104`, `IMG_0106` (rooms framing mountains) | Second philosophy piece. |
| 9 | **Naoshima** | `2014 Japan/` | Kusama pumpkin, Ando concrete, Seto ferries | Weakest Auwa fit — contemporary art rather than craft or philosophy. 2014 has only one unused portrait frame, so check carefully. |

Regenerate a full shortlist for any of these with `scripts/photo-survey.py` rather than hunting for
an old file.

---

## THE PHILOSOPHY CLUSTER, AND THE BETH KEMPTON PROBLEM

Auwa wants authority on Japanese philosophical concepts. Two things to know before planning that
cluster (researched 8 September 2026):

**Beth Kempton occupies the two biggest terms.** She wrote *Wabi Sabi: Japanese Wisdom for a
Perfectly Imperfect Life* (a bestseller, translated into 24 languages, covered by TIME, Vogue, the
Telegraph and Sunday Times Style) and has followed it with **KOKORO: Japanese Wisdom for a Life
Well Lived**. She has two degrees in Japanese and has lived and worked there for years.

That is not a reason to avoid Kokoro. It is a reason to be honest about the terms:

- **"wabi sabi" is effectively closed.** Her book, its publisher pages, Amazon and Goodreads own
  it. Do not build an article around that term.
- **"kokoro" just got much harder** and will keep getting harder as her book sells. Auwa should
  still write it, because Auwa cannot claim the word as its own vocabulary while having no page
  for it, but expect the traffic to be modest and judge the piece on brand depth rather than rank.
- **Auwa's real differentiator is authorship, not expertise.** Kempton is a British writer who
  studied Japanese. Rieko is Japanese and grew up inside these ideas in Kansai. Write from lived
  experience and let that be the difference; do not try to out-explain someone with two degrees in
  the subject.
- **The winnable terms are the ones she has not made famous:** mono no aware, ma (間), mottainai,
  yugen, kuyō (memorial services for worn-out objects), shinrin-yoku. These are lower volume, far
  thinner competition, and closer to what Auwa actually is.

**So the philosophy cluster should be built from the edges inward**, not from the head term out:
publish two or three of the specific concepts first, interlink them, then let the Kokoro piece sit
at the centre as the anchor once the cluster gives it something to anchor.

---

*Confidential. Auwa Limited. All rights reserved.*
