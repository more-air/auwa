# Auwa — Project Context

*Last Updated: 11 August 2026 — book publishing route decided and opened (see CURRENT PHASE item 2 and `context/pillar/book.md`), WIPO filing done. Major revision 5 August 2026: the pillar framing is gone entirely; the Kokoro Mirror app is parked; the store became Auwa-owned goods plus a collaboration programme. See THE PIVOT below before proposing any work.*

---

## WORKING WITH THIS REPO — SAFETY RULES (READ FIRST)

These rules are non-negotiable, including in `--dangerously-skip-permissions` / "bypass permissions" mode. They exist because of a real incident on 1 May 2026 in which a session ran `git checkout HEAD -- <files>` to "revert the working tree", silently wiping multiple sessions of uncommitted work. The work was eventually reconstructed from session transcripts; assume the next time will not be recoverable.

**Never run a destructive git command without first asking the user.**

Specifically: do NOT run any of the following without an explicit, in-conversation confirmation that names the actual files / branches involved AND describes what will be lost:

- `git checkout HEAD -- <path>`, `git checkout -- <path>`, `git checkout <ref> -- <path>`
- `git restore <path>`, `git restore --source=… <path>`
- `git reset --hard`, `git reset --merge`
- `git clean -fd`, `git clean -fdx`
- `git rm` against tracked files with uncommitted changes
- `git stash drop`, `git stash clear`
- `git branch -D`, `git push --force`, `git push --force-with-lease`
- `git rebase -i`, `git rebase --onto …` against branches with uncommitted work
- `rm -rf` against the repo or any subdirectory containing uncommitted work
- `cp <source> <dest>` or `Write` over a file with uncommitted changes from a different on-disk source (HEAD, another branch, a backup)

Before running ANY of these:

1. State plainly what the command will do. Example: *"This runs `git checkout HEAD -- src/app/book/page.tsx` which will wipe the uncommitted changes shown in `git diff` for that file. The lost work cannot be recovered from git."*
2. Show the user the current `git status` and `git diff --stat` for the affected paths.
3. Wait for an explicit OK that names the files (e.g., "yes, revert book/page.tsx").
4. Only then run the command.

**If the user asks for a "working tree revert" or "undo my changes" or similar, treat it as ambiguous.** Do not assume they mean `git checkout HEAD --`. Ask: *"Do you want to discard these specific changes permanently, or stash them, or commit them to a throwaway branch first?"* The default answer is to PRESERVE work, not discard it.

**Don't propose `git checkout HEAD --` as a fix for build/runtime errors.** The fix is in the source code, not in throwing away local changes. If reverting feels like the simplest path, the user can revert in their editor file-by-file and keep what they want.

**Recovery is not free.** Reconstructing wiped work from `~/.claude/projects/<project>/*.jsonl` transcripts is possible but slow, brittle, and only works if the bad command happened recently enough that the relevant sessions are still on disk. Treat that path as last-resort, not a safety net that justifies casual destructive commands.

### If you ever DO need to recover from a destructive command

A documented recovery walkthrough exists. The high-level shape:

1. List sessions in `/Users/admin/.claude/projects/-Users-admin-Github-auwa/*.jsonl` by mtime; identify the disaster session and the sessions whose work needs recovering (typically: everything after the last deploy through to the moment of the destructive command).
2. In the disaster session, locate the FIRST destructive command's timestamp — that's the cutoff.
3. For every file in `src/`, `public/`, `context/`, `scripts/`, or the project root that was Edit/Write-touched in that window, replay the events: take the most recent full Read result before the cutoff (strip the `<num>\t` cat-n prefix), then apply each subsequent Edit's old/new replacement and each Write in chronological order. Skip partial Reads (offset/limit set) — they shouldn't replace `current_content`.
4. Diff each reconstructed file against current on-disk; present diffs one at a time for explicit apply/skip approval. Apply via `Edit` or `Write` tools. **Never** via `git checkout`, `git restore`, or any other destructive primitive.
5. Files that need bootstrap content (no full Read in window) can be initialised from `git show HEAD:<path>` — flag clearly that this is a bootstrap.

The full session that did this on 1 May 2026 is preserved in the transcripts and can be referenced as a worked example if it happens again. Don't try to skip steps; the partial-Read trap and the IO ref bug will both bite a careless replay.

### Routine commits to GitHub + Vercel

The simplest preventive habit is to commit + deploy at the end of every meaningful session — that way a destructive command can only wipe one session's worth of work, not many. The `/website:deploy` slash command runs the full flow (commit, push, deploy to Vercel). Use it.

---

## What Auwa is

Auwa is influenced by the ancient Japanese belief that a life force resides in all things. Not just people and animals, but rivers, mountains, a handmade bowl, a well-worn knife, the changing light of a season you almost didn't notice. Auwa uses the word Kokoro (心) as its own expression of this idea. Unlike English, which separates heart, mind, soul, and spirit into distinct concepts, Kokoro holds them as a single, undivided whole. In a culture of speed, distraction, and disposability, Auwa builds awareness: of how you feel, of the objects you live with, of the world you move through, and of your connection to the people and nature around you.

Where Western wellness centres on the self, Auwa draws from Japanese collectivist philosophy. Awareness isn't just inward. It extends to the craftsman who spent decades mastering a single knife, to the micro-season shifting outside your window, to the stranger whose day you can change by paying attention. This is "Japanese philosophical awareness applied to modern life."

**Auwa is a character and a philosophy.** Character IP at the centre, a small shelf of things Auwa owns outright, and an editorial and relationship practice in Japan that feeds both.

The split that governs all public copy:

- **What Auwa IS** — a character and a philosophy. Nothing else belongs in this sentence.
- **What Auwa MAKES** — the book (the illustrated stories), the figure (sold through the store, alongside Auwa-owned goods and collaboration editions), and the journal (editorial from Japan).

The journal sits in "what we make" and never in "what Auwa is." That's what demotes it from pillar status without costing it any visibility, which matters because it's still the only thing bringing strangers to the site.

Public-facing copy uses **"What we make."** and never a count.

*Revised 5 August 2026, twice in one day. Was four pillars including a daily-awareness app (Kokoro Mirror), then briefly three. The counting is now gone entirely. Every "N ways in" framing invites the question "why that N" and breaks the moment the business changes; Auwa recounted three times in four months. A brand that describes itself as a character and what that character means never has to recount. The app is parked, not cancelled: see THE PIVOT below.*

Auwa is also a character — a luminous being who reveals the Kokoro in everything through a magical light shower. The character is the embodiment of the philosophy, created by Japanese illustrator Rieko Maeda over a decade of development. It is no longer reserved for the books alone: since August 2026 the character is the centre of the business, appearing in the stories, as the figure, and as the form that collaborating artists and craftsmen interpret. The journal and the overall brand identity still express the philosophy through design, editorial, and craft without needing the character present.

---

## THE PIVOT (5 August 2026)

The single most important context in this repo. Read before proposing any work.

**What changed.** The Kokoro Mirror app is parked. Auwa is now a character IP business with a Japan practice attached, not a four-pillar lifestyle brand with an app as its flagship.

**Why.** Tom's own reasoning, in his words: he would not use the app himself in a world where he already has AI; it needs sustained marketing effort and continuous competitive development to stay strong; it is a different kind of thing from the book and figure; the revenue is poor even in success; apps are becoming trivial to replicate; and after two decades in the industry, building one no longer excites him. The More Air case-study value is already banked by having built it — it does not require release. Structurally the app was always going to be brutally hard as the *first* product, because it had to win attention for a character nobody knows. As the fourth thing, behind books people own and a character people love, it becomes easy. **The app was in the wrong position in the sequence, not wrong in itself.**

**What replaces it.** Everything Auwa sells is something Auwa owns outright: books (print-on-demand plus a pre-order-funded first edition), figures made in small hand-finished drops, prints and paper goods, and collaboration editions where the collaborator manufactures and holds stock. No third-party inventory, no warehouse, no customs desk. Japan is an editorial and relationship practice (journal, craftsman relationships, photography, one annual trip, journeys later), not a retail supply chain.

**What this means for future sessions.** Do not propose app work, app features, or app releases. Do not propose a multi-vendor marketplace or buying craftsman stock for resale. Do not propose white-labelling other people's goods with Auwa branding. If a request seems to drift back toward any of these, flag it and ask.

**Standing lesson.** The previous plan sat in these context files for months and every session optimised inside it rather than questioning it. A decision written into a context file is still a decision, not terrain. When something in here is load-bearing and looks wrong, say so.

---

## WHAT AUWA MAKES

*Not pillars. Not doors. Not ways in. These are the three things Auwa makes; what Auwa IS sits above, and is a character and a philosophy. Don't reintroduce a count, in this file or in public copy.*

### The Book (auwa.life/book)
The illustrated story universe and the canonical home of the character. **Called "the Book", not "the Story"** (Tom, 5 Aug 2026) — it's the concrete object a reader buys and a bookshop stocks, and "Story" reads abstract next to "Store" and "Journal". Books 1 (The Beginning) and 2 (Umi) are finished and at print test, releasing as a set. The WAWA origin, the philosophy, creator bios. This is the foundation everything else rests on: the character has to become known for the rest of the business to work, which makes publishing the highest-leverage single act available.

### The Store (auwa.life/store)
A clean, simple Shopify shelf for Auwa-owned goods only: the books, the figure (hand-printed, hand-finished, balsa box, ribbon, hand-written Rieko card, signed and numbered), limited-edition prints, and paper goods including the 72 micro-seasons print set. Plus **collaboration editions**, the growth engine (see THE COLLAB PROGRAMME below). No curated third-party catalogue, no marketplace, no held stock beyond Auwa's own items. *Revised May 2026 from multi-vendor marketplace to first-party; revised again 5 Aug 2026 to remove curated resale entirely.*

### The Journal (auwa.life/journal)
Editorial from Japan. Craftsman profiles, places, travel, seasonal living, philosophy in practice. Written by Tom and Rieko from their own experience. Its job has shifted: it is no longer primarily an SEO engine, it is **the calling card used to approach Japanese makers**. Weight it toward makers and places over general seasonal essays. Roughly one article a month.

**Seasonal Journeys** remain a programme, not a fourth pillar. See `context/marketing/arrival.md`.

---

## THE COLLAB PROGRAMME

The engine of the new plan, and the answer to the "what connects a cosmic character to a hand-forged knife" problem. **Rieko's concept:** a blank-canvas Auwa figure that a collaborator decorates or produces in their own medium. The collaborator's work *is* the light shower. The object literally performs the mechanic of the books, so the character and the craft become the same subject rather than an asserted connection.

**Two lines, different jobs. Do not judge them on the same terms.**

**Artist collabs — the commercial line.** Frequent, repeatable, cash-generating. Send a blank, get it back painted. Same-audience logic (the collaborator's collectors and Auwa's audience overlap), so they sell. ~£150-400. Include Japanese artists and illustrators from early on, not just Western ones — an easier yes than a craftsman, same simplicity, genuine Japanese authorship. **Fin DAC is first** (warm, friends, already painted Rieko, already has an Auwa stencil, 96K IG). His own wish for visible Japanese collaboration and his frustration at appropriation accusations make a Japanese-authored programme a genuinely good offer to him, not just an ask.

**Craft collabs — the prestige line.** One or two a year, slow, aimed at authority, editorial and *exhibitability* rather than sell-through. The honest buyer analysis: a knife collector mostly doesn't want a figure, and an Auwa fan mostly doesn't know the maker's name, so unit sales are not the return. The return is the only thing that makes "Japanese" true rather than decorative, plus press, institutional doors and the maker relationships. Structure so the maker manufactures, holds and sells domestically; Auwa takes a small Western allocation. No inventory risk.

**Where the collaborator's signature lives determines the format.** This taxonomy is the operating detail Rieko works from:

- **Surface crafts** (lacquer/maki-e, gold leaf, dyeing, sashiko and textiles, painting) — the true blank-canvas case. Supply a blank, they reveal it. Fin DAC sits here.
- **Form crafts** (kokeshi, woodturning, ceramics, bamboo, glass, cast metal) — nobody decorates anything. They make the *whole* Auwa in their medium from Rieko's master form; the hand shows in glaze, grain, throw, firing. Probably where most collabs land.
- **Function crafts** (knives, tools, joinery) — the blank fails. Either they forge an Auwa in their signature material (the lamination line, hamon, kasumi finish *is* the signature), or Auwa becomes the subject of a functional piece (a kiridashi with an Auwa terminal). Also: a knife is made by several hands — the togishi, handle maker and saya maker are far more reachable than a backordered smith.

**Order of approach.** Start with crafts whose output is already decorative and already collected, where nobody needs convincing the object is a thing you'd own. **Kokeshi first** — it is the Japanese blank-figure tradition, regional schools with distinct forms and painting hands, two centuries of collected wooden figures. Bearbrick, two hundred years early. Then daruma (Gunma painters), lacquer and maki-e, Kanazawa gold leaf, ceramics, textile. Knives and functional crafts are a year-three conversation if ever; their better use is editorial (a Shigefusa film needs no product attached).

**Kintsugi is explicitly ruled out** (Tom, 5 Aug 2026).

**Production note.** A 3D-printed PLA blank will not take glaze, urushi or firing. Collab figures are made entirely in Japan from Rieko's master form. Auwa's home printer serves only the Auwa-made edition. Two independent production lines, no shared bottleneck.

**You cannot pitch this in words.** A written proposal describing a character figure decorated by artisans reads in Japanese uncomfortably close to a licensing solicitation, and the default answer is a polite no. Pitch it with a photograph of one that already exists — which is what Fin DAC produces. And frame it in the register the National Crafts Museum used for Pokémon × Kogei: an art commission, a challenge to the maker's skill, one-of-a-kind or a small numbered edition, exhibited rather than racked. Same object, entirely different conversation.

**Long arc.** Enough craft pieces to exhibit. Ladder: London Craft Week or a small foundation show first, then Daiwa Anglo-Japanese Foundation / Japan Foundation London spaces, then Japan House as a year four or five destination approached with a track record. UK-Japan cultural grant bodies (Daiwa, Great Britain Sasakawa, Japan Foundation) fund exactly this kind of project and a held grant is itself a credential. See `context/business/japan.md`.

---

## THE BRAND PHILOSOPHY

Auwa is influenced by the ancient Japanese belief that a life force resides in all things. No divide between sacred and ordinary, between thinking and feeling. This belief is expressed in concepts like Yaoyorozu no Kami (八百万の神, "countless spirits") and in the folk tradition that objects used with care accumulate a kind of soul. Auwa uses the word Kokoro (心) as its own expression of this idea: the holistic Japanese concept that unifies what English separates into heart, mind, soul, and spirit. This runs through everything Auwa makes: the stories show Auwa revealing Kokoro in nature, the store sells objects that carry Kokoro (and, in the collab editions, objects where the maker's own Kokoro is what gets revealed), the journal shares the world where Kokoro lives. Auwa's creator grew up within this philosophy in Kansai — it is not a marketing angle, it is lived experience.

Two additional Japanese frameworks sit underneath:

**72 Micro-Seasons (Shichijūni-kō)** — Ambient philosophy, not user-facing taxonomy. Powers the content calendar (72 posts/year, refreshing every 5 days), the journal rhythm, and the 72-piece print set / calendar product. Rieko draws one illustration or short video every five days and enjoys the rhythm.

**Yamato Emotional Framework (Ha-Ta-A-Yu-Wa)** — Rieko's proprietary framework of five emotional states based on ancient Yamato language: Hare (晴/Radiant), Takaburi (昂/Intense), Aware (哀/Reflective), Yuragi (揺/Unsettled), Nagomi (和/Serene). Built for the app and *dormant with it* since 5 Aug 2026. It remains valuable owned IP — the five states and their colour system are usable in prints, editions and future work — but it is no longer an active part of the plan.

---

## VISION & VALUES

**MTP:** To show the world that a more aware, more intentional life is possible, guided by Japanese philosophy that has practised it for centuries. Short form: *Restore awareness to a distracted world.* (Robin Sharma)

**Vision:** A world where people live with deeper awareness: of their emotions, of the objects they share their lives with, of the natural world around them, and of their connection to other people. Real abundance is not material. It is the abundance of the heart.

**Mission:** To apply Japanese philosophical awareness to modern life through an illustrated character and the things it takes form as: illustrated stories, objects made and co-made with Japanese hands, and editorial storytelling from Japan, all rooted in the ancient Japanese belief that a life force resides in all things.

**Core values:** Awareness over autopilot. Kokoro over commerce. Connection over individualism. Depth over surface. Respect over consumption. Authenticity over algorithm. Seasonal wisdom over hustle culture. Clarity over clutter.

**Structural precedents (revised 5 Aug 2026):** Moomin (illustrated character IP → books → licensed goods → craft collaborations → shops and cafés; now far bigger in Japan than Finland — the endgame shape). Bearbrick / Medicom (a deliberately simple blank figure as a platform for 25 years of artist and brand collaborations). Karel Capek (Tokyo illustrator Utako Yamada's own children's-book world extended into six tea shops and a Sanrio licence — an illustrator's IP becoming a retail lifestyle brand). Niwaki (Jake and Keiko Hobson, husband and wife, ~20 years from one imported product to a Marylebone shop, own-brand plus Japanese-made goods, a book as the authority layer, editorial from real Japan trips — the operating model). Mjölk (John Baker and Juli Daoust, curated Japanese/Nordic craft plus own commissioned collections and a gallery programme — the commissioner model). Plus Kinfolk and Monocle for editorial-into-retail, and Hodinkee for the craft-appreciation thesis. **The pattern:** businesses where character IP leads and goods follow are more valuable and more passive; businesses where goods lead stay small and hands-on. Auwa sequences character first, commissioned goods second, curated goods never.

---

## What Auwa is not

- Not a weather app (micro-seasons are philosophy, not forecasts)
- Not advice-giving (Auwa reveals, period)
- Not an app company (the app is parked — see THE PIVOT)
- Not a shop with a mascot (if Auwa ever reads as "a Japanese homewares store with a character on it," something has gone wrong; the character leads, the goods follow)
- Not a reseller (no curated third-party catalogue, no held stock but Auwa's own)
- Not white-label (an Auwa logo on someone else's ceramic is the weakest version of everything: low margin, needs stock, dilutes the IP)
- Not a merch brand (paper goods and prints suit the work; print-on-demand apparel mostly doesn't)
- Not founder-fronted (the public face is the character, never Tom or Rieko on camera on a schedule)
- Not exoticising Japan (philosophy-forward, not Orientalism)

---

## CURRENT PHASE (August 2026)

**Where things actually stand.** Website live and Awwwards Honorable Mention. ~8 journal articles. 2,667 Instagram followers. Books 1 and 2 finished and at print test. Figure at prototype (Blender file done, several sizes printed, bio-filament testing next). App built and craft-passed but never released, now parked. Trademarks filed across UK + Madrid (JP/US/EU/CN). ~100 email subscribers. **Zero revenue to date.**

**The diagnosis that drove the pivot:** craft work is on or ahead of plan; capture, activation and *shipping* have repeatedly deferred behind craft. The two books are the worst possible case of this — 100% finished, 0% released.

**Priority order now:**

1. ~~Pay WIPO before 15 August.~~ **DONE.** Both marks certified by UKIPO and transmitted to WIPO (wordmark 29 Jul, figurative 30 Jul 2026). MM18 forms filed alongside the MM2s, so the US designation is safe. Nothing to do until WIPO raises an irregularity: classification responses go back via UKIPO, fee irregularities are paid direct to WIPO. Papers in `Dropbox/3 venture/auwa/admin/trademark/4 global expansion/application/`.
2. **Books: publisher route decided and opened, 11 Aug 2026.** Try a publisher properly, on a deadline of **31 January 2027**, with IngramSpark plus Amazon KDP as the fallback that needs nobody's permission. Approaches sent to Dominic Brendon (cousin, ex-UK Sales Director, Simon & Schuster), Colin Midson (book PR, ex-S&S) and Piers Brendon (cousin, historian, for an agent introduction). Jay Elwes and Damien Lewis held until there's a specific ask. Book 2 is titled **Umi**. **Read `context/pillar/book.md` → PUBLISHING ROUTE before proposing anything about how the books reach readers**; it covers why publisher-first beats self-publishing-first for picture books specifically, why the IP fear is overstated, the blurb plan, and the steps in order. Do not propose a pre-order-funded signed edition or premium book pricing; both were considered and dropped on 11 Aug.
3. Figure finished: bio-filament, finish, packaging, price. **First edition 25-50 units, not 100** — a 12-15cm print plus finishing plus hand-packing is weeks of physical labour, and "never reissued" makes a small first edition a feature.
4. Simple Shopify shelf for Auwa-owned goods only.
5. Fin DAC collab opened this autumn. It produces the photograph that every later collab is pitched with.
6. Journal back to ~1/month, weighted toward makers and places.
7. Craftsman outreach opens *once the books are printed* — the printed book is the calling card, and a maker who spent forty years on one craft will take a beautiful book seriously and a URL not at all.
8. ~~Website: remove the app pillar and move to three doors.~~ **DONE 5 Aug 2026.** Shipped further than planned: rather than three doors, the counting was removed entirely. Homepage intro rewritten, "The character." moved above the product module, "Four ways in." became "What we make." with three frames (Book / Store / Journal), the redundant pillar-card section cut. Store, About and `/brand` copy off "curated Japanese craftsman objects". `/app` parked as a quiet page ("Set aside."), noindexed, `SoftwareApplication` schema removed, dropped from the sitemap. "The Beginning" article's two four-pillar paragraphs rewritten. `/demo-about` now 404s in production. Sitewide meta and the welcome email no longer mention the app. Also fixed: copy said "the ancient idea that a life force, or Kokoro, resides in all things", which attributes the *word* to the tradition — Yaoyorozu no Kami calls it Kami. Now split into the belief (Japanese, ancient) and the naming (Auwa's own): "In Auwa, we call it Kokoro (心)".

**Constraint to respect:** Tuesday-Friday, 10am-6pm, no work Monday. One Japan trip a year (the dog). That one trip must do craftsman relationships, journal photography, journey recon and collab conversations together, not as four competing ambitions.

---

## KEY DECISIONS MADE

**Brand architecture:**
- Single domain: auwa.life with /app, /store, /journal, /book. All variants (auwalife.com, www.auwalife.com, www.auwa.life) 301 redirect to auwa.life. Google Search Console verified, sitemap submitted.
- Auwa wordmark logo (serif typeface) — the character is not the logo, but since Aug 2026 it is the centre of the business: stories, figure, and the form collaborators interpret
- **Brand name in writing:** always "Auwa" in body copy, captions, alt text, articles, hashtags, headings — never "AUWA". The all-caps form belongs to the wordmark/logo treatment only, not to prose. Hashtags are always lowercase (`#auwa`, `#kokoro`).
- Premium, refined aesthetic — serif type has that ancient, crafted feel

**App (PARKED 5 Aug 2026):**
- Built, craft-passed, live at auwa.app, never released. Leave it live, don't maintain it, don't release it.
- Keep the domain and trademark class 9. Revisit 2027-2028 only if the character audience becomes real, at which point it's a companion to a known character rather than a product fighting for attention.
- The Yamato framework and its colour system remain owned IP and are reusable outside the app.
- More Air case-study value is already banked. Write the case study without shipping it.

**Store:**
- **Auwa-owned goods only.** Books, figure, prints, paper goods, 72-seasons print set. No curated third-party catalogue. *(Was multi-vendor marketplace → first-party + collab, May 2026 → own goods + collab only, Aug 2026.)*
- Standard Shopify. No multi-vendor app, no Stripe Connect, no held stock but Auwa's own.
- Figures self-produced on BambuLab. First edition 25-50, hand-finished, numbered, signed, never reissued.
- **Collab editions are the growth engine**, split into an artist line (commercial, frequent) and a craft line (prestige, slow, exhibition-aimed). Collaborators manufacture and hold stock. See THE COLLAB PROGRAMME.
- Kintsugi ruled out as a collab craft (Tom, 5 Aug 2026).
- Never white-label. The rung between "article" and "collab edition" is a second article, not a branded product.

**Social & marketing:**
- Instagram-only until 5K followers (then expand to TikTok reposts + YouTube depth content)
- 4 content pillars: Kokoro Reveal, Japanese Wisdom, Behind the Kokoro, Seasonal Living
- £2K Year 1 Instagram ad budget, content-first growth
- Fin DAC collaboration (96K followers, existing Auwa stencil — warm lead)

**Email:**
- Resend fully integrated: contacts API + email sending
- Welcome emails auto-fire on signup (4 variants per source)
- No double opt-in (friction not worth it at this scale)
- Newsletter sends via `/marketing:newsletter` command or API endpoint
- Sending domain `auwa.life` must be verified in Resend before emails deliver
- React Email (`@react-email/components`) for all templates
- 3 Resend segments (free plan limit): App Waitlist, Store Waitlist, Book Waitlist
- Newsletter subscribers go to audience without a segment

**Timing:**
- Hotel B2B and white-label EQ licensing: retired with the app, not merely deferred
- Press/podcast outreach after the books are published, not gated on follower count
- YouTube gated on the Shigefusa film existing, not on 5K followers
- Retreats, workshops, Seasonal Journeys: Year 2+ (earned by results)
- Institutional exhibition route: London Craft Week / small foundation show ~2028, Japan House year 4-5

---

## THE KOKORO MIRROR — PARKED

The app's core UX, spec and design system are preserved in `context/pillar/app.md` and `context/app/`. Parked 5 August 2026; live but unmaintained at auwa.app. Don't propose work on it. The one-line summary, kept for reference: arrival → user types freely → light shower → Kokoro revelation → optional journal → shareable card → Kokoro Archive.

---

## TEAM MODEL (ESHI + HANMOTO)

Following the traditional Japanese ukiyo-e model (artist + publisher as equal partnership).

**Rieko (Creator/Eshi):** Illustrations and the books, seasonal content (72-season cadence), figure design and the collab blank/master form, creative direction, **all Japanese-language outreach to artists, craftsmen, galleries and institutions** — which since Aug 2026 is the pillar the whole Japan practice runs on, not a side task.
**Tom (Producer/Hanmoto):** Brand, publishing route, store platform and operations, figure production and packaging, business development, marketing, photography, project oversight.

**Working pattern:** Tuesday-Friday (3-4 day week, 10am-6pm). Auwa gets 60%, More Air 25%, ventures 10%. No work Monday. Health and relationship come before any deadline.

---

## THE HIERARCHY OF VALUE

1. **Permanent, uncopyable:** Rieko's original art + manuscripts, the illustrated stories, the Auwa character and its master form, the Auwa name and etymology (あうわ), Yaoyorozu no Kami foundation, Rieko's identity as a Japanese creator, and the craftsman and artist relationships once they exist
2. **Valuable, adaptable:** Illustration library, character variants, the 72-season content system, brand identity, the Yamato framework and its colour system, the trademark portfolio
3. **Useful today, potentially commoditised tomorrow:** The app and its tech stack, the AI reflection engine, the website, the Shopify shelf

*Note the shift (Aug 2026): the character used to sit behind the app in practical priority. It is now tier one and the centre of everything. The single most valuable act available is making it known — which is why publishing the books properly outranks almost anything else.*

---

## ILLUSTRATION PRINCIPLE

Rieko's original art is the source of truth. AI (MidJourney) refreshes and scales her vision for digital formats — it doesn't replace it. Always credit Rieko as creator. The human fingerprint must always be visible. The illustration style — influenced by Forsythe, Jeffers, Klassen, Watanabe — looks like "children's book" but reaches adults because it disarms and bypasses cynicism. Precedents: Charlie Mackesy (7M copies), Studio Ghibli, Moomin. The format is a Trojan horse for philosophy.

---

## MARKET POSITION

The Japanese awareness/lifestyle space is structurally unoccupied. Books sell millions (ikigai: 5-7M copies) but no brand owns the space. Japanese craft exporters (Nalata Nalata, Analogue Life, Tortoise, Rikumo) sell products but have no character universe, no story, and no IP of their own — and after a decade each is still small, which tells you the ceiling of pure curation. Art-toy platforms (Bearbrick, KAWS) have the collaboration engine but no cultural depth and no narrative. Character IP houses (Moomin, Sonny Angel) have the story but rarely reach into traditional Japanese craft. **The unoccupied position is the join: an illustrated character with a decade of story behind it, authored by a Japanese creator, interpreted by Japanese makers.** Pokémon × Kogei proved the Japanese craft establishment will engage seriously with character IP when it is framed as art commission rather than merchandise; nobody has built a standing brand on that join.

Interest in Japan is at an all-time high (42.7M visitors in 2025, anime market $37.7B, Pinterest Japanese aesthetic searches up 405%). The weak yen makes Japanese craft products 30-40% more accessible than 5 years ago. And in the same way Hodinkee proved that a digital-age audience would develop deep appreciation for hand-crafted mechanical watches, Auwa bets that AI acceleration makes people more — not less — hungry for objects made by human hands with centuries of tradition behind them. The timing is right.

---

## CONTEXT FILES

These files are NOT auto-loaded. Only read them when you need deeper context on a specific topic. Ask which file is relevant before loading, to conserve tokens.

**Shortcut phrases.** When the user's first message contains any of these phrases, load the listed files together without asking:

- *"app session"*, *"app build"*, *"app work"* etc. → **the app is parked (5 Aug 2026). Say so and confirm before doing anything.** If Tom confirms he genuinely wants app work, then load `context/app/app.md` + `context/app/patterns.md` + `context/pillar/app.md` + `context/brand/brand.md` and launch the local preview (`name: "auwa-app"`, port 3004, `.claude/launch.json`) at mobile viewport (375x812).
- *"collab"*, *"craftsman"*, *"artist collab"*, *"Fin DAC"*, *"exhibition"* → load `context/business/business.md` + `context/business/japan.md` + `context/marketing/arrival.md`.
- *"figure"*, *"figure drop"*, *"packaging"* → load `context/business/business.md` + `context/brand/reference.md` + `context/brand/brand.md`.
- *"book route"*, *"publisher"*, *"print"* → load `context/pillar/book.md` + `context/business/business.md`.
- *"website session"*, *"website updates"*, *"website work"*, *"website tweak"*, *"website fix"*, *"website bug"* → load `context/website/website.md` + `context/website/patterns.md` + `context/brand/brand.md`.
- *"newsletter send"*, *"send newsletter"* → load `context/marketing/newsletter.md` + `context/pillar/journal.md` + `context/brand/brand.md`.
- *"social session"*, *"instagram"*, *"social post"* → load `context/marketing/instagram.md` + `context/brand/brand.md` + `context/marketing/arrival.md`.
- *"article"*, *"journal article"*, *"write article"* → load `context/pillar/journal.md` + `context/website/patterns.md` + `context/brand/brand.md`.

Whenever `context/app/app.md` is loaded, `context/app/patterns.md` is paired. Same for `context/website/website.md` + `context/website/patterns.md` on implementation work.

**Pillars (`context/pillar/`):**

- `context/pillar/app.md` — **PARKED (5 Aug 2026).** Kokoro Mirror app specification: core UX flow (input → light shower → revelation → journal → share → archive), AI reflection principles and voice, sub-expression definitions, vague input handling, screen-by-screen detail, technical architecture (Next.js, Claude API, Vercel Postgres, Sanity, Stripe), data model, API routes, build phases, design principles, colour system, FigJam flow reference.
- `context/pillar/book.md` — The four-book illustrated universe: status of each book (Book 1 complete at 18 pages, Book 2 in revision, Books 3 and 4 TBC), what the Book 1 revision achieved (two-thirds word reduction, atmospheric over narrated), revision principles as a template, canonical source of the Auwa character and story mythology.
- `context/pillar/journal.md` — Journal pillar and editorial writing guide: voice and style rules, article structure (content block types and layout engine), production workflow (brief to published article), image preparation, the four content territories (Seasons, Craft, Philosophy, Travel), launch article plan. (Was `editorial.md` pre-restructure.)

**Brand (`context/brand/`):**

- `context/brand/brand.md` — Brand guidelines: logo/wordmark specs, typography system (EB Garamond + Instrument Sans + Noto Sans/Serif JP), colour system (OKLCH cosmic palette + emotional state colours), light/dark theme specs, photography direction, illustration integration, social content templates, motion principles, cross-site consistency (auwa.life subpaths).
- `context/brand/manifesto.md` — The seven reasons for building Auwa, what Tom and Rieko each bring, success/failure/slow-burner scenarios, motivation for when you hit a wall.
- `context/brand/reference.md` — Illustration workflow (MidJourney + Rieko), archival/authentication strategy, collectible figure rules, store precedents (Monolise + Japanese merchant platform history), Fin DAC relationship, Nokia Animaru precedent, strategic lessons (KAWS, Labubu, Goop, Snow Peak, Hodinkee).

**Business (`context/business/`):**

- `context/business/business.md` — Master business plan: executive summary, brand philosophy (Yaoyorozu no Kami), vision/values, Auwa name/origin, products (Kokoro Mirror app, Auwa Store, Auwa Journal, Auwa Book, figures, Year 2+), market analysis, go-to-market phases, content engine, customer acquisition, financial projections, corporate/legal, team, risk analysis, strategic priorities.
- `context/business/competitors.md` — Competitor analysis: AI journaling (Reflection, Rosebud, Mindsera, Stoic), mood tracking (Daylio, Reflectly, Moodnotes), wellness (Headspace, Calm, Wysa), Japanese cultural products (72 Seasons, Pentad), collectibles (Labubu, KAWS, Sonny Angel), multi-category lifestyle brands (Goop, Snow Peak, Rapha, Monocle, School of Life), Japanese craft exporters (Nalata Nalata, Analogue Life, Rikumo, Tortoise, Kinto). Competitive matrix, features to adopt/avoid, signals to monitor.
- `context/business/japan.md` — Japan market analysis: tourism stats (42.7M visitors, ¥9.5T spending), cultural export growth (anime $37.7B), yen dynamics, Japandi trend (405% Pinterest growth), ikigai/wellness crossover (5-7M books sold), the structurally unoccupied EQ/wellness gap, multi-category lifestyle brand precedents with revenue data.
- `context/business/structure.md` — Business structure, IP & legal: corporate entities (Auwa Limited + More Air Limited), directors, shareholders, ownership chain, all trademark filings (word mark UK00004341028 + UK00004373944, design mark UK00004373930), 7 Nice classes, Madrid Protocol deadline (15 Aug 2026), copyright, licensing agreements, domains, costs, key dates, open actions. (Social handles live in `context/marketing/social.md`.)

**App (`context/app/`):**

- `context/app/app.md` — **PARKED (5 Aug 2026).** auwa.app build status + design language: state of the Kokoro Mirror PWA, full type system + opacity ladder + spacing + Yamato gradient tokens, component primitive inventory, Mobbin + Finch references. Preserved so the work isn't lost, not so it gets resumed.
- `context/app/patterns.md` — **PARKED (5 Aug 2026).** auwa.app BUILD PATTERNS: deployment workflow, file structure, design tokens, localStorage state, Tailwind 4 gotchas, component patterns, character asset mapping. Only load if Tom explicitly confirms app work.

**Website (`context/website/`):**

- `context/website/website.md` — Website SPECIFICATION for auwa.life: Kinfolk-inspired editorial site structure, page layouts, Sanity CMS content model, responsive design, serif typography, motion principles, v0/Stitch prompt ideas, reference websites, article preparation plan, design system tokens (type scale, colour opacities, spacing, grid gaps, content widths, motion specs), component library, API routes, email templates, SEO infrastructure. **Load for website design/planning sessions.**
- `context/website/patterns.md` — Website BUILD PATTERNS, Tailwind 4 gotchas, iOS fixes, Vercel deployment command, page-level architecture lessons, mobile menu patterns, article share icons, and the full Awwwards-readiness checklist. **Load only for website implementation sessions** (component tweaks, bug fixes, deployment). Not needed for social/strategy/copy/brand work.

**Marketing (`context/marketing/`):**

- `context/marketing/arrival.md` — Arrival strategy (the 12-month brand launch): why "arrival" not "launch," the four phases (Quiet Debut / Selective Amplification / App Soft Launch / Store Prep), the next 30 days priority list, full channel strategy (IG primary, LinkedIn secondary, Awwwards, guest articles, link-building, press, newsletter), £2-3K marketing budget allocation, first Instagram post spec, the three forks (app vs store, book timing, character exclusivity), Year 1 and Year 2 success pictures.
- `context/marketing/instagram.md` — Instagram strategy: specs/dimensions (Reels 1080x1920, Feed 1080x1350), algorithm priorities (sends/shares #1), 5 content pillars, weekly posting cadence, growth plan (700→5K), £2K paid budget split, collaboration tactics (Fin DAC), email capture, profile setup, best UK posting times, photo editing workflow.
- `context/marketing/newsletter.md` — Newsletter system: welcome email templates (auto-sent per source), newsletter template (manual send via API), sending workflow, email design principles, subject line format, Resend configuration, cadence guidance.
- `context/marketing/social.md` — Social account map: all live handles and logins across Instagram, Facebook, Threads, YouTube, LinkedIn, Bluesky, Pinterest, Discord, Twitch, Reddit, Medium, Spotify; pending email verifications; deliberately skipped platforms; outstanding next steps. Single source of truth for the social footprint.

**Tooling (`context/tooling/`):**

- `context/tooling/pdf.md` — PDF generation pipeline: the md-to-pdf recipe plus the `context/<folder>/<file>.md` → `documents/Auwa-*.pdf` filename mapping. **Load whenever the user asks for a PDF to be generated from any context file**, regardless of session topic. Future tooling files (image pipeline, audio prep) sit alongside in this folder.

---
