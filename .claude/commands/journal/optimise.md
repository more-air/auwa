---
name: Optimise
description: Audit and improve existing auwa.life journal articles for SEO performance and subscriber capture. Keyword research, wording suggestions, internal linking, then re-index in Google Search Console.
---

## Purpose

Improve the journal articles that are ALREADY published so they rank higher, attract more of the right strangers, and convert those strangers into email subscribers. This is the highest-ROI SEO work available (see `context/pillar/journal.md` Section 8): the pages already exist and already rank, so small on-page improvements compound across earning pages.

This command is for EXISTING articles. For writing NEW articles, use `/journal:article` (its Step 1b now bakes in keyword research).

**Load first:** `context/pillar/journal.md` (esp. Section 8 organic strategy, Section 4 metadata spec) and `context/brand/brand.md`. The global CLAUDE.md writing rules apply strictly to any reworded prose (no em dashes, no AI vocabulary).

**The golden rule:** never sacrifice the quality of the prose for keywords. Auwa's writing is the moat. SEO changes the meta fields, the exact words used for real things (place names, craft terms), internal links, and where the sign-up sits. It does NOT keyword-stuff the essay or make it read like marketing.

## Scope options (ask the user first)

Ask: "All articles, or a specific one? And do you have a Google Search Console Performance export I can use?"

- **All articles** — full sweep, one article at a time, most-visited first (use Vercel Analytics / GSC to order by current traffic so the biggest wins come first).
- **One article** — jump straight to Step 3 for that slug.

The current published set lives in `website/main/src/app/journal/[slug]/page.tsx` (the `articles` object). List them from there; don't assume the count.

## Step 1: Inventory

Read the `articles` object in `website/main/src/app/journal/[slug]/page.tsx` and list every published article with its current `title`, `subtitle`, `description`, and `category`. Confirm the list with the user.

## Step 2: Pull performance data (the best keyword source is Auwa's own)

Auwa's own Google Search Console data is more valuable than any third-party tool, because it shows the queries Google *already* associates with each page.

Ask the user to export or screenshot, from https://search.google.com/search-console → **Performance** → last 3 months:
- **Queries** tab (which search terms bring impressions/clicks), and
- **Pages** tab (per-URL impressions, clicks, average position).

For each article, the two gold signals:
1. **Near-miss queries** — terms where the page ranks position ~8-20 with real impressions but few clicks. Small on-page work can push these onto page 1. Highest priority.
2. **Queries the page gets impressions for but doesn't target in its copy** — Google thinks the page is relevant; make that explicit in the title/description/body and it climbs.

If the user has no GSC export, proceed with WebSearch-only research (Step 3), and note that GSC data would sharpen it.

## Step 3: Per-article research and gap analysis

For each article, one at a time:

1. **Read the live article** (its entry in the `articles` object) — current title, subtitle, description, body copy, headings, pullquote, image alt text.
2. **Keyword research:**
   - **WebSearch** the article's primary topic plus variations. Capture Google's "People also ask" and related searches — real phrasings in users' words.
   - Cross-reference the GSC near-miss queries from Step 2.
   - Assess competition on the target terms: thin/generic results = winnable with Auwa's first-hand content and photos; strong/authoritative = harder, note it.
3. **Identify the gap:** where does the current copy use poetic/vague wording where a searchable term would also fit? (e.g. an article that says only "the knife" throughout when "Shigefusa knife" / "wa-gyuto" are the searched terms.) Where is the primary keyword missing from title, description, or first paragraph?

## Step 4: Propose changes (show the user, get approval per article)

Present a clear before/after for each article covering:

1. **`title`** — the searchable topic phrase, concise. Page title renders as `"{title} | Auwa Journal"`, so keep the whole string under ~60 chars or Google truncates it.
2. **`description`** (100-155 chars) — keyword-rich meta description, MUST contain "Japanese" where natural plus the primary keyword. This is what shows in Google results; make it earn the click. Distinct from `subtitle` (which stays poetic and on-page).
3. **Body first paragraph** — ensure the primary keyword appears naturally within the first paragraph. Suggest the minimal rewording; keep the scene-first opening.
4. **In-body terms** — swap 1-3 vague references for the searched term where it reads naturally (place name, craft term). Prefer specific Japanese terms (washi, wa-gyuto, kitaeji) which rank AND feel editorial.
5. **One quotable definition sentence** near the top of concept articles (wabi-sabi, Yaoyorozu, mono no aware) — wins featured snippets and gets cited in AI answers.
6. **Internal links** — propose 1-2 links to sibling articles in the same territory (craft ↔ craft, travel ↔ travel, philosophy ↔ philosophy). Builds topical authority. Note which article links to which.
7. **Subscriber capture** — confirm the article carries the Quiet Letter sign-up gracefully in-context (see instagram.md "The capture loop" for the canonical copy: `72 seasons a year, drawn by Rieko. A quiet letter, and a chance to win our first-edition figure.`). If it's missing or buried, this is the single most valuable change on the page — flag it prominently. High-intent strangers already land here; a page that ranks but doesn't capture is leaking the best free traffic Auwa gets.
8. **Image alt text** — ensure the hero alt identifies Japan / the specific Japanese subject within the first ten words; prefer place names and Japanese craft terms over generic English (see article.md Step 6 alt rules).

Get explicit approval per article before touching files. Present one article at a time so the user can judge each on its merits.

## Step 5: Apply the approved edits

For each approved article:
- Edit the fields in the `articles` object in `website/main/src/app/journal/[slug]/page.tsx`.
- Apply any reworded body/heading/pullquote/alt changes there too.
- Add the approved internal links.
- Add or reposition the Quiet Letter capture if that was agreed (match how capture is implemented elsewhere on the site; don't invent a new component without checking `website/main/src`).
- Do NOT change the slug. Changing a slug breaks the ranking URL and the sitemap. If a slug is genuinely wrong, that's a separate, deliberate decision with a redirect, not part of this pass.
- After edits, verify the build compiles: `cd website/main && npm run build`.

## Step 6: Deploy

Run `/website:deploy` (commit + push + Vercel) once the user is happy with the batch. Don't deploy article-by-article; batch the approved set.

## Step 7: Request re-indexing (yes, it's worth it)

Google re-crawls on its own schedule (can be weeks). Requesting re-indexing makes the new titles/descriptions show in results in ~1-3 days. For each changed URL:

1. https://search.google.com/search-console → select `auwa.life`
2. Paste `https://auwa.life/journal/[slug]` into the top URL Inspection bar → Enter
3. Wait for it to load → click **Request Indexing** → "added to priority crawl queue"

Then resubmit the sitemap once for the batch: GSC → **Sitemaps** → remove `sitemap.xml` → re-add `sitemap.xml` → Submit.

## Step 8: Record and measure

- Note in `context/pillar/journal.md` (or a short changelog the user prefers) which articles were optimised, the target keyword per article, and the date, so the next pass can measure movement.
- Tell the user to check GSC Performance again in ~3-4 weeks: look for the target queries moving up in average position and impressions/clicks rising. That's the proof the pass worked. If a term didn't move, the competition was stronger than it looked, or the page needs more than on-page work (a backlink, more depth) — note it for the backlink layer in journal.md Section 8.
