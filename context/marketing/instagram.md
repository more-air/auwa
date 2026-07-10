# Auwa Instagram

*Updated: May 2026. Living document.*
*Load when working on social media content, Instagram ads, or audience growth.*

---

## Where we are

Account: **@auwalife** at instagram.com/auwalife. Five posts live as of the May 2026 restart, ~31 more prepared and queued in `social/instagram/_scripts/schedule.txt`. Roughly 10 weeks of content ready to go at the planned three-posts-per-week rhythm.

Content folders live under `social/instagram/<pillar>/<post>/` with the pillar prefixes `0-brand`, `1-book`, `2-store`, `3-journal`, `4-app`. Each post folder contains an `_post.txt` brief (caption, alt text, hashtags, notes) plus the images. The planning view at auwa.life/instagram (dev: localhost:3003/instagram) renders the schedule live from disk.

---

## Strategy in one paragraph

Build an audience that joins for the **world** (philosophy, character, craft, Japan), not for the product. Sales come as a side-effect of trust, never as the headline. Post three times per week, mix Reels and carousels, hold pace for a year. Single-platform focus on Instagram until 5,000 followers; expand to TikTok reposts and YouTube depth content only after that bar is cleared.

---

## The Gift Ethos

Everything Auwa posts should feel like a gift, not a sale. Brands that behave like businesses plateau on Instagram; brands that behave like contributions compound. Every post gives the reader something — a new word, a moment of beauty, a piece of craft knowledge, a reflection they want to hold. The commercial messaging (teaser signups, product launches, store openings) appears rarely and quietly, as a natural consequence of trust already built, never as the driver of content.

Touchstones: Kinfolk, The Marginalian, School of Life, Blackbird Spyplane. All gave freely for years before monetising lightly.

Tension to manage: "gift" is a feeling, not an identity. Auwa *is* a business. The posture is **a brand that behaves like a gift, and occasionally invites you to buy something we've made.** Giving sets the default. Selling is an exception earned by giving first.

---

## Pillar priority (May 2026)

In order of weight in the current schedule and the next 10 weeks of posts:

1. **Book** (`1-book`) — the illustrated story universe. Heaviest pillar. Character animations from Rieko, book inside-N teasers, sketchbook process, book-as-object lifestyle shots, the four-book series statement.
2. **Store** (`2-store`) — Auwa figures. First-edition launch is the year's commercial moment. Figure-in-setting shots, the edition reveal, the Blender process Reel.
3. **Journal** (`3-journal`) — editorial carousels from auwa.life/journal articles. Rieko writes one article per fortnight, which yields one editorial slideshow for Instagram.
4. **Brand** (`0-brand`) — atmospheric character pieces (kokoro, magical, face). Sparingly placed for tonal breath.
5. **App** (`4-app`) — **deprioritised.** Two teasers already in the queue, but app promotion is held until the book/store audience is built. Don't add more app content for now.

---

## Three posts per week

A sustainable rhythm that wins by consistency, not volume. Five-a-week for three months underperforms three-a-week for fifty-two weeks. The algorithm punishes inconsistency more than it punishes low frequency.

Suggested weekly shape (adjust to the queue and the moment):

- **Mid-week Reel** (Tue/Wed) — character animation from Rieko, or process Reel (e.g. `figure-blender`). The growth driver.
- **Weekend slideshow** (Fri/Sat) — editorial carousel from a journal article, or a book teaser, or a store figure shot. Drives saves and DM-shares.
- **Sunday post** (atmospheric photo or single image) — quiet close to the week.

Plus **daily Stories** (1–3 slides). Stories are separate from the feed. Use interactive stickers (polls, sliders, question boxes) at least twice a week.

---

## Content production rates

What's being produced on an ongoing basis:

| Stream | Rate | What it yields |
|---|---|---|
| Editorial articles | 1 per fortnight | 1 editorial IG slideshow + 1 Story share |
| Character Reels | 1 per week from Rieko | 1 Reel (the growth driver) |
| Behind-the-scenes | Ongoing as it happens | Mostly Stories; the strongest get promoted to feed |
| Figure / book lifestyle shots | As assets are produced | Single-image feed posts |

That's ~6 new pieces a month from these streams, comfortably feeding the 3-per-week cadence with material to spare. The queue currently has more than 10 weeks of content prepared, so the production rate above represents the **replenishment**, not the launch volume.

---

## Algorithm priorities (2026)

In order of impact on reach:

1. **Sends/shares via DM** — the #1 ranking signal. Content people send to friends gets dramatically more reach.
2. **Watch-through rate on Reels** — watched to completion or replayed = major boost.
3. **Caption keywords** — IG's 2026 search reads captions semantically. Put words like *Auwa, Kokoro, Eko Maeda, picture book, Japanese awareness, illustrated story* naturally into prose.
4. **Carousels rival Reels for reach** — IG re-serves slides 2+ to users who didn't engage first time.

Hashtags increasingly behave as topic classifiers rather than discovery channels of their own. Three to five sharp tags outperform ten mixed ones. Don't repeat identical hashtag sets across many posts — the algorithm reads that as bot-pattern.

---

## Image & Video Specs

**Reels** — 1080 × 1920 (9:16). 30–60s sweet spot for retention. MP4 H.264 30fps min. Cover crops to 1080 × 1350 in the feed grid, so design the cover with both crops in mind.

**Stories** — 1080 × 1920. 5–7 slides per sequence performs well; drop-off accelerates after slide 7. Interactive stickers heavily weighted.

**Feed singles** — 1080 × 1350 (4:5 portrait). Maximum screen real estate.

**Feed carousels** — 1080 × 1350. Up to 20 slides. All slides must be the same aspect ratio.

**Profile photo** — 500 × 500 minimum, circular crop. Auwa character (see Profile Setup below).

---

## Editorial slideshow format

For each Journal article, a companion Instagram carousel turns editorial writing into swipeable grid content.

**Template (5+ slides):**

1. **Hero cover** — per-post decision:
   - Lead with `image-hero.jpg` (clean photo) when the **image** is the hook — atmospheric landscape, human moment, beautiful object. Examples: Yakushima cedars, Koya-san stone bridge, Shigefusa blade, washi maker's hands.
   - Lead with `image-hero-text.jpg` (typeset title) when the **concept** is the hook — an unfamiliar word or unique idea the reader needs to see named. Examples: Kokoro / Yaoyorozu no Kami, 72 Seasons.
   - Default: clean photo. Use the `Cover:` field in `_post.txt` to override per post.
2. **Pull quote** (`text-quote-dark` or `text-quote-light`) — short phrase, large serif. Make the viewer pause.
3. **Body photo** — one of the article's `image-*.jpg` body images.
4. **Pull quote** or additional body photo — varied typographic treatment from slide 2 if both are quotes.
5. **Close** (`text-close-dark` or `text-close-light`) — "Continue reading at auwa.life/journal/[slug]". Quiet CTA.

Slides 3 to N-1 can mix body photos and pull quotes in whatever order serves the article. Up to 20 slides total; the strongest articles deserve 6–8.

**Typography note:** the typeset cover treatment (serif title centred, AUWA wordmark masthead-style above, Japanese underneath in lighter weight) sits at Cereal Magazine / Casa BRUTUS tier. Not the Pinterest-infographic style that gets devalued.

Each article generates one slideshow. With one article per fortnight, that's ~25 slideshows per year.

---

## Content ideas (vault + ongoing)

### Ready to deploy now (existing vault)
- Japan photography (15+ years of trips)
- Rieko's illustrations and Auwa animations
- Fin DAC Auwa stencil session
- Craftsman photography from Monolise research trips
- Auwa story scenes from the books in progress
- Rieko drawing process time-lapses
- Sketchbook pages (the early-ideas set)

### Ongoing production
- Auwa character animations (Runway, After Effects)
- Craft ASMR clips (artisan hands, making processes)
- Japan travel teases (temples, paths, seasonal moments)
- Stories/polls ("Which emotion resonates today?")
- Collaborations (Fin DAC collab post, Japanese culture accounts)
- Kokoro quotes (text over illustration)
- App demos and shareable card reveals (post-launch)
- Store unboxing and craftsman spotlights (post-store launch)
- Artisan spotlights (craftsman meets, workshop visits)
- Silent walks (ambient video, no voiceover)
- Seasonal rituals and wellness content

---

## Growth plan: 700 → 5,000

### Phase 1 — Establish (weeks 1–4, posts 6–17)

Profile depth is the goal. Build the grid so a first-time visitor scans 9–12 tiles and understands what Auwa is.

- **Content focus:** universe-establishing posts first — `1-book/series`, the character Reel `0-brand/kokoro`, the first figure reveal `2-store/figure-1`. Sprinkle behind-the-scenes (`1-book/sketches`, `2-store/figure-blender`).
- **Paid:** No follower-growth boosts yet — profile too sparse to convert. Optional Lead Form ads (£10/day) for store waitlist; small retargeting (£3–5/day) for past auwa.life visitors.
- **Engagement:** Reply to every comment. Engage genuinely on 10–15 relevant accounts daily (Japanese art, illustration, slow living, design culture, emotional intelligence).
- **Target:** 700 → 1,500 followers, 100–200 email signups.

### Phase 2 — Amplify (weeks 5–8, posts 18–29)

Grid is deep enough. Start paid awareness on proven organic performers.

- **Content focus:** the story-led book moments (`inside-9` Kokoro reveal, `inside-10` Bluu memory). More figure shots. Continue 1 Reel/week from Rieko. Two editorial articles in this window.
- **Paid (~£800):** boost `1-book/series` (£200), `2-store/figure-1` (£200), `0-brand/kokoro` (£150), `1-book/sketches` (£150), `4-app/teaser-2` (£100).
- **Engagement:** Fin DAC collab post (warm lead). Reach out to 5–10 complementary accounts (5K–50K followers) for collab posts.
- **Target:** 1,500 → 3,000 followers.

### Phase 3 — Convert (weeks 9–12+, posts 30+)

Audience is built. Drive to product moments.

- **Content focus:** climactic book posts (`inside-16` connection, `inside-17` song). Figure edition reveal (`figure-6`). First product launches (book first edition + figure drop).
- **Paid (~£700–1,200):** boost `1-book/inside-9`, `inside-16`, `2-store/figure-4` (vitrine), `2-store/figure-6` (edition). Retargeting for waitlist non-converters.
- **Target:** 3,000 → 5,000+ followers.

### Expected outcome at £2,000 paid spend
1,500–3,000 new quality followers from paid, plus organic growth of another 1,000–2,000 via content + collabs. **Realistic Year 1 finish: 4,000–5,000 followers.** Paid amplifies the floor, not the ceiling — content quality, the Fin DAC collab, daily Stories, and community DMs do the heaviest lifting.

---

## Paid advertising (£2,000 Year 1 Budget)

### When to start boosting

**Wait until the profile has 12+ posts on the grid before running follower-growth boosts.** With a sparse profile, ad-clicked visitors scroll for 3–7 seconds, see thin content, and leave. Same £100 typically converts at 10–25 followers on a 5-post account vs. 50–100 on a 15-post account.

What can run earlier than 12 posts:

- **Lead Form ads** — convert on the post + native IG form, not on profile depth. Add emails to the list. Anytime.
- **Retargeting** — past website visitors. Anytime, £3–5/day.

### Budget pacing
£15–25/day over 2–3 months. Algorithm needs time to optimise. Avoid £50/day for one month.

### Boost shortlist
See Phase 2 and Phase 3 above for the specific posts and allocation. In short: lean on `series`, `figure-1`, `kokoro`, `sketches`, `inside-9`, `figure-4`, `figure-6`, `inside-16`. **Don't boost** `figure-7` (the meditating maybe-variant) — that post earns its value from comment-volume signal, which paid would distort.

### Check organic before boosting
Always look at a post's organic performance at 48–72 hours before deciding to boost it:

- >500 reach + >5% engagement → strong boost candidate
- 100–500 reach + 2–4% engagement → moderate; boost the best of these
- <100 reach + <1% engagement → don't boost. The post is the problem; reallocate.

### Quality signal
Cost-per-follower under £1 + cost-per-signup under £2 = working. 3–5× higher = stop and reallocate. Don't try to rescue a non-converting boost.

---

## Profile setup

- **Name field:** "Auwa | Japanese Awareness Practice" (searchable, keyword-rich)
- **Bio:** Lead with what it IS. "Japanese philosophical awareness applied to modern life. Illustrated stories, an awareness practice app, and a craftsman store. auwa.life launching 2026." Minimal emoji.
- **Category:** Art / Health & Beauty
- **Profile photo:** **Auwa character**, not the wordmark. At 110px circular crop, the character (luminous form, two black eyes) is instantly identifiable; the "A" wordmark reads as any boutique brand. The character is the strongest recognition signal in every IG discovery surface. The "A" wordmark belongs on the website header and project labels, not the IG avatar. Revisit at ~50K+ followers if a confident-minimal switch ever feels earned.
- **Highlights (4–6):** Universe, Kokoro, Seasons, Process, Press — custom covers in brand colours.
- **Link:** native 5-link feature pointing to auwa.life and selected sub-paths (/book, /store, /journal).

---

## Hashtag strategy

**3–5 highly relevant tags per post**, not 10 mixed. The 2026 algorithm reads caption keywords semantically; hashtags are topic classifiers, not discovery channels in themselves.

Per post:
- 1–2 broad (500K–5M posts): #japanesephilosophy, #emotionalintelligence
- 1–2 mid-range (50K–500K): #picturebooks, #designertoy, #japaneseart
- 1–2 niche / branded: #auwa, #kokoro

Avoid:
- Identical hashtag sets across posts (algorithm flags this as spam pattern)
- Generic mood tags alone (#vibes, #aesthetic)
- Banned or restricted tags (check before using)
- Competitor brand tags (#kaws, #labubu) — reads opportunistic and may suppress reach

Caption keywords matter more than hashtags. Let *Auwa, Kokoro, Eko Maeda, picture book, Japanese awareness, illustrated story* appear naturally in the prose.

---

## Best posting times (UK)

- **Weekdays:** 7:00–8:30 AM (morning scroll), 12:00–1:00 PM (lunch), 7:00–9:00 PM (evening)
- **Sunday:** 10:00 AM–12:00 PM (lifestyle/wellness performs well)
- **Japan overlap:** 7–8 AM UK = 3–4 PM Japan. Morning posts hit both audiences.
- Refine with Instagram Insights once audience data accumulates.

---

## Key metrics to track

- **Follower growth rate** (weekly)
- **Reach per post** (especially non-follower reach)
- **Shares/sends via DM** (the #1 algorithm signal)
- **Saves** (high-value content indicator)
- **Email signups from Instagram** (waitlist conversions)
- **Engagement rate** (likes + comments + saves + shares / reach)
- **Cost-per-follower and cost-per-signup** on boosted posts

---

## Photography & image workflow

**Tom's credentials:** Published photographer. Japan photography has 17M+ views on Unsplash and has been used by Condé Nast Traveler, Vogue, WEF, Travel + Leisure, TimeOut, and Culture Trip. 15+ years of Japan photography provides a deep content vault.

**Pipeline:**
- Japan travel catalogue (temples, seasonal landscapes, street scenes, food culture) → Seasonal Living pillar
- Craftsman photography from Monolise research trips → Behind the Kokoro / store spotlights
- Rieko's illustration process captures → Behind the Kokoro pillar
- AI-assisted image standardisation for store products (Remove.bg, Claude Vision → consistent white backgrounds)
- MidJourney + Rieko refinement for Auwa character content → Kokoro Reveal pillar

**Tools:** Lightroom for photography. Remove.bg or Claude Vision for product background removal. Figma for card layouts, carousel templates, and Story templates. Canva as fallback for quick social graphics.

---

## Expansion (post-5K)

- **TikTok:** Repurpose best-performing Instagram Reels. Same content, different platform. Low effort.
- **YouTube:** Original depth content. Craftsman making videos (30–45 min ASMR), Japan travel, philosophy deep-dives, interviews. Bi-weekly uploads. The long-term authority-building channel.
- **Podcast appearances:** Pitch wellness, Japan culture, design, and EQ podcasts after 5K as social proof.
- **App promotion:** Once book + store audience is established (potentially Q3 2026 or later), reintroduce app teasers and reveals.

---

## Quick-reference checklist

For the next 12 weeks of launch:

1. **Cadence:** 3 posts per week. Don't deviate up or down for at least a year.
2. **Pillar weighting:** Book + Store + Journal. App on hold.
3. **Boost timing:** Wait until 12+ posts before growth boosts. Lead Form and retargeting ads can run earlier.
4. **Cover treatment:** Per-post decision via `Cover:` field. Default: clean photo. Use typeset title when the concept is the hook.
5. **Hashtags:** 3–5 sharp tags per post. Vary the tail; don't repeat identical sets.
6. **Avatar:** Auwa character, not the wordmark.
7. **First comment:** always within 5 minutes of publishing.
8. **Check organic performance** at 48–72h before boosting any post.
9. **No app posts** in the schedule for now.
10. **Single-platform:** Instagram only until 5K. No TikTok cross-posting yet.
