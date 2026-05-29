# Auwa App

*Updated 29 May 2026 (after the build's full craft pass — see `context/app/app.md` for the realised design system). Three structural decisions Tom approved this session, recorded here so spec and build stay aligned: (1) **The Firefly Trove is now a view inside the Light section, not a separate destination.** `/light` toggles between Capture (Daily Light) and Trove (a dot-grid: collected fireflies glow among faint placeholder dots, One Year / Not Boring Habits style). The bottom bar is FOUR tabs — Home, Light, Rest, Senshin — so the "quiet entries" wording in §5.3 is superseded by tabs. (2) **Onboarding companion model, locked with Rieko:** the simple Auwa character (plain silhouette) accompanies every onboarding step, like Finch's bird; the user's Kokoro (Auwa-shape + their motifs + eventual background illustration) is the reveal at the end — mirroring the book, where Auwa helps a being reveal its Kokoro. (3) **The Share card (§5.10) is now a dedicated preview screen** with a Story (9:16) / Feed (1:1) format toggle, reached from the revelation's Share action. The rest of this spec stands.*

*Updated 28 May 2026 (Stage 1 morning, after Tom and Rieko aligned on the flow in FigJam). Expands Section 2.1 onboarding from 5 screens to 11, with the new structure (what brings you, first-gift celebrated beat, when does Auwa fit, trait micro-layer, source attribution, breath interlude, closing line). Updates Section 5.3 to add the *light* quiet entry alongside rest/trove/senshin (Daily Light dual placement: parallel from home arc plus natural follow-on after revelation). Updates Section 16.7 to specify the first-gift motif as a celebrated full-screen beat rather than a quiet annotation. Adds App Store rollout strategy to Section 10 (PWA → Capacitor → Apple/Google submission, 6-8 weeks total to public). Adds honest build pace discussion. Adds FigJam as visual source of truth (file key bsT5waEFwTkrjZVDjjonCs, in More Air → Auwa project). Ready for Stage 2 build in a fresh session.*

*Updated 27 May 2026 (late evening revision). Adds Section 9 (Senshin): the paper-first cognitive-distancing practice with two-tier storage and end-to-end encryption for the Senshin tier, drawn from Tom's Mind Wash journal and anchored culturally in the chōzubachi temple-purification metaphor. Categorisation plus emotion plus paper-first guidance plus atmospheric closure plus optional Sanctuary handoff. Look Back audit surface generates user-driven pattern data with no NLP, no theme detection. Conservation commitment of 5% remains as per Section 8. Adds screens 5.17 (Senshin Entry) and 5.18 (Senshin Look Back); Settings renumbered to 5.19. Adds a UI presentation rule for Yamato terms: English label leads, Yamato underneath as subtext (Rieko, this session). Sections 9-15 renumbered to 10-16.*

*Updated 27 May 2026 (evening revision). Adds Section 8: the Daily Light and Firefly Trove mechanic, with the conservation commitment (5% of subscription revenue to firefly habitat conservation, from first paid subscriber). Adds screens 5.14 (Daily Light) and 5.15 (Firefly Trove). Deepens the paid tier in Section 2.4. Updates the retention pulls in Section 7 from eight to nine.*

*Updated 27 May 2026 (afternoon revision). Adds Sanctuary mode (Rieko's instinct: the app as a place of rest as well as a practice). Strengthens the share card framing as Auwa's primary organic growth surface. Adds the Finch lessons section, including a refinement to the illustration brief (first-gift motif) and a trait micro-layer suggestion for Rieko.*

*Previous revision (26 May 2026). Primary input switched from text to tap-the-character. The 72 micro-seasons / kō stamp removed from the app surface (they live in the journal and on IG). Context/correlations layer added. Reflection library is Rieko-written, never AI-generated at runtime. Kokoro Avatar mechanic specified (one-time personalisation plus accumulated motifs). Hand-painted custom figures dropped; printed Kokoro portrait retained as the realistic premium artefact.*

*Load when working on app design, development, or UX decisions.*

---

## 1. What the App Is

A daily awareness practice. The user taps the Auwa character variant that resonates with how they feel right now, optionally refines with a sub-expression and notes what they were doing beforehand, and receives a curated poetic reflection alongside their own Kokoro avatar. The Kokoro accumulates small illustrated motifs over time, becoming a unique self-portrait drawn by attention.

Two to three minutes a day. The design target is daily use, earned by experience quality rather than streak compulsion. No streaks, no badges, no notifications. Pull, not push. Auwa is here to reveal what's there. The user receives it and goes.

**The reflection quality is the product.** Everything else (design, animation, archive, shareable cards) supports the single moment Auwa names what's present.

---

## 2. Core User Flow

### 2.1 First Visit (one-time onboarding, 11 screens)

*Expanded from the original 5-screen version on 28 May 2026 after a careful re-review of Finch's onboarding. The expansion adds investment moments (what brings you, trait micro-layer), tailoring inputs (when does Auwa fit), the source attribution (cheap, useful), the first-gift moment as a celebrated beat (not a quiet annotation), and two breath interludes for pacing. The orb or Kokoro is present on most screens, so the user feels accompanied rather than processed through a form.*

1. **Welcome.** A small Auwa orb breathes on a dark cosmic screen. Three lines: *Auwa reveals what's there in you. Choose a few things you love. Your Kokoro starts here.* Single Begin button.

2. **What brings you to Auwa?** A small atmospheric screen with the orb still breathing. Four tap options: *Curiosity. A restlessness. A recent change. Something else.* Single tap. The choice is referenced gently in the first revelation (*Many begin with curiosity. You are in good company*) and biases the first few Daily Light prompts toward that frame. Then never asked again. Feels like an invitation, not a survey.

3. **Personalisation.** A grid of 16-21 illustrated motifs across four soft categories: creatures (dog, cat, bird, fish, deer, fox), places (mountain, sea, forest, city, river, garden), elements (rain, snow, sun, moon, mist, fire), objects (book, cup, candle, brush, key, lantern). User picks 5-7. The Kokoro silhouette appears at the top of the screen and each picked motif lands on it visibly. The Kokoro reads as personal from session one. This is Rieko's recommendation and the front-loading mechanic that makes the curiosity-pull work from the first visit.

4. **First-gift moment.** A celebrated full-screen atmospheric beat. The Kokoro from step 3 sits centred against a soft gradient. The orb of Auwa pulses above. A single motif (one Rieko draws specifically for this purpose, drawn from the same library but reserved) arrives from above, drifts down, and settles on the Kokoro. The line appears below: *Auwa noticed something else in you.* Five seconds, ambient track underneath, no chrome, no skip. The user proceeds with a tap when ready. This is the equivalent of Finch's *Look what's already here!* day-zero gift moment, in Auwa's voice.

5. **When does Auwa fit your day?** *Morning. Evening. Both.* Two tap selection (single or both). Used to bias reflection selection toward morning-leaning or evening-leaning entries from the library. Real impact on the felt experience, no notifications, no nagging.

6. **Pick a quality your Kokoro carries.** *Quiet. Curious. Steadfast. Open.* Single tap. Affects nothing mechanically in v1 but surfaces gently in the archive at six months (*Your Kokoro has carried Quiet for half a year. That has shaped what it sees*). The trait-without-gamification version of Finch's trait pick.

7. **Where did you find Auwa?** Source attribution. Six to eight tap options: *Instagram, TikTok, a friend, a podcast, a journal article, an App Store search, somewhere else*. Single tap. Cheap to collect, real value for growth analytics. Placed after the felt-investment phase so it does not feel transactional.

8. **Breath interlude.** Single line on a dark screen with the orb pulsing: *In a moment, you will see Auwa for the first time.* Tap to proceed.

9. **First daily flow.** The full daily revelation runs (Section 2.2): arrival shows the personalised Kokoro, state tap, optional sub-expression refinement, optional context tap, light shower, revelation with reflection. The first revelation text references the user's *what brings you* answer from step 2.

10. **Closing.** After the revelation, before the signup prompt, a single quiet screen: *Auwa will be here when you return.* Ambient orb, soft gradient, tap to continue. This is the closure beat that says *you have started something*, without celebration or numbers.

11. **Signup prompt.** Three options surfaced clearly:
    - *Continue with Apple* (one-tap, native sheet on iOS)
    - *Continue with Google* (one-tap, native sheet on Android, web fallback)
    - *Continue with email* (enter email + password)
    - Below these, a quiet link: *Or continue as a guest. Your Kokoro will live only on this device.*
    
    Copy in Rieko's voice: *Your Kokoro is yours. To carry it across devices, across time, across small forgettings, give Auwa a way to find you again.* Skippable; the guest path is honoured properly (Kokoro lives in local storage on the device until the user later creates an account, at which point the data migrates).

**Total: 11 screens.** Roughly a third of Finch's onboarding length. Each screen does one investment job: ownership (3, 4, 6), tailoring (2, 5), analytics (7), pacing (1, 8, 10), or the practice itself (9, 11). The orb or the Kokoro is on screen for at least 9 of the 11 screens, so the user feels accompanied throughout.

**On dropping out.** Users can skip from screen 7 onward (everything after personalisation and the first-gift moment is non-essential to begin). The first revelation always works without an account; the signup prompt is the last screen and is skippable.

### 2.2 Returning User

Identical flow without onboarding or personalisation. *Your last visit, you carried Aware* shown softly above the state tap on return. No clinical tracker, no push to do better today.

The Kokoro accumulates new motifs over time (see Section 7). After 10+ revelations, gentle pattern observations surface in the archive.

### 2.3 Sanctuary (secondary surface)

Auwa is a daily practice, and it is also a place. The user opens the app sometimes not to log a feeling but to sit inside its atmosphere. After a long day. On the train home. In a quiet ten minutes between things. Rieko's framing for this is sanctuary, and it belongs in the spec as a distinct surface, not as an extension of the daily flow.

Sanctuary opens to a slow gradient bloom in the user's current emotional weather (or a neutral cosmic dark if they have not yet revealed today), an ambient Suno-generated track playing softly, the breathing orb of Auwa as a slow pulse, and the user's Kokoro hovering quietly. No prompts. No timer. No state tap. No reflection text. The user stays for thirty seconds or thirty minutes and taps anywhere to leave. Nothing is recorded.

This is the rain-sound version of the app, not the guided-meditation version. No voice, no instructions, no script. Crucially it requires no new content production from Rieko beyond what we have already built: the orb, the five gradient families, the ambient audio track already used on the teaser page, and the character. Sanctuary composes them into a place.

The entry to sanctuary is a quiet word (*rest*) beside the state arc on the arrival screen. Tappable, never required, never highlighted. The user who needs it finds it. The user who doesn't never notices it is there.

This is the eighth retention pull (see Section 7) and the most distinctively Auwa one. Finch has guided audio that tells you what to do. Calm has rain sounds with no app context. Sanctuary is the brand-shaped middle: a place with our character in it, no instruction, no measurement.

### 2.3.1 Additional sanctuary surfaces

The base sanctuary above is the v1 surface and the most important one. Five additional sanctuary-shaped features extend the principle into different rhythms and times of day. Each gives the user a reason to open the app that is not the daily flow. The diversification of reasons to open is itself a retention strategy: each user develops their own rhythm with Auwa without any of them being told to.

**The letter (v1).** Once a week, on a quiet day, a short letter from Auwa appears on the arrival screen. Three or four sentences. A small reflection on the season, a thought, an observation. Written by Tom and Claude in Rieko's voice direction, signed off by her in batches. The user opens the app to see if there is a letter waiting. The weekly cadence keeps it sacred. Production cost is roughly 50 letters per year, written quarterly. See Section 5.12 for the screen spec.

**The sound library (v1, minimal).** Three to five ambient Suno-generated tracks named atmospherically: *Moss*, *Rain on stones*, *Bell at dawn*, *Snowfall*, *Pine in wind* (final names locked by Rieko). Tap a name to switch. No play/pause UI, no recommendation engine, no podcasts, no recorded voices. Track plays as long as the user is in sanctuary or the lantern. Lowest production cost on the list. See Section 5.13.

**The garden (Phase 4).** The Kokoro hovers on a small patch that changes with the actual season. Cherry blossom in April, folded leaf and pale moss in October, frost in January. No tending, no decoration mechanic, no friends visiting. Somewhere to visit. This is also where the 72 micro-seasons can finally live inside the app: as a quiet seasonal mark refreshing every five days, not as a label or a stamp.

**The lantern (Phase 4).** Between sunset and night, computed from the user's local time, the app's surface changes. The Kokoro carries a small lantern, the gradient warms at the edges, a single line of text settles in: *The day is finishing. Sit with what it was.* A day-closing ritual. Pairs naturally with the base sanctuary.

**The noticing (Phase 5, or folded into the letter).** A single observation about the world (not the user) appearing every few days. *The plum tree is in its third day of flowering. The bamboo grass is putting out its summer leaves.* Tied to the 72 micro-seasons but framed as Auwa's noticing, not a calendar. May fold into the letter rather than being a separate surface.

**The breathing companionship (deferred, evaluate in user testing).** A surface where the orb of Auwa breathes and the user sits alongside. No instruction to breathe (we are not Calm). Two presences sitting together. The most experimental of the six. Hold until we see whether the simpler sanctuary surfaces are landing.

**For v1 (friends release in 4-6 weeks)** Auwa ships the base sanctuary, the letter (first four weeks of letters written ahead of release), and three named sound tracks. The garden, lantern, noticing, and breathing companionship are scoped for Phase 4 and beyond.

### 2.4 Free vs Paid

**Free tier (no account required for first revelation, account required to save):**
- 3 revelations per month
- 3 fireflies captured per month (Daily Light, Section 8)
- Basic archive (list view)
- Trove view limited to the most recent 30 fireflies
- Photo attachment to fireflies included
- Weekly letter from Auwa
- Base sanctuary surface with 2 sound tracks
- Standard share cards

**Paid tier (£6.99/month or £49.99/year):**
- Unlimited revelations
- Unlimited fireflies (Daily Light)
- Full Kokoro Archive with pattern observations
- Full Firefly Trove (all years, all periods, monthly digest)
- Monthly long letter from Auwa (200-300 word piece, paid-tier exclusive)
- Sanctuary with 5 sound tracks (plus lantern surface when shipped in Phase 4)
- Premium share cards
- Story unlocks (segments from Rieko's illustrated books)
- Early access to figure drops
- Year-end Firefly Year document (digital PDF; printable book on hand-pressed Japanese paper £30-40 as add-on)
- Annual digital export of the Kokoro portrait
- Printed Kokoro portrait available as add-on (£30-40)

**Conservation commitment.** Five percent of every subscription supports firefly habitat conservation, from the first paid subscriber. Not a paid-tier feature; a brand commitment that applies to all revenue. See Section 8.7.

**Paywall philosophy.** Free tier is genuinely complete. Paid unlocks depth, not access. The first experience is always free, always whole, always beautiful.

---

## 3. Context & Correlations

The context layer is the bridge between Auwa's reveal-only stance and the user's actual life shape. The user tags what they were doing before the reveal. Over many revelations, the archive surfaces gentle correlations, never advice:

> Nagomi has visited 11 times this season. 8 of those were after time outside.

> Aware has clustered after late work this month.

> Mornings have brought Hare more often than evenings.

Observations, never advice. The user draws their own conclusions about what to do, or not do, with the pattern. Auwa shows what's there. The user decides.

### Context options (v1)

A small fixed set, broad enough to be useful for pattern detection without overwhelming the tap surface:

- Working
- With people
- Alone
- Outside
- Moving
- Eating
- Online
- In transit
- Something else (small text input)

Context is always skippable. Skipping doesn't change the reflection; it just means that revelation isn't included in correlation observations. The system never asks twice.

### Why this matters

The context tap is the single feature that gives the user a reason to come back daily over many months. Each new tag enriches the correlation engine. Three months in, the user starts seeing themselves more clearly. That's the practice. Not the daily reflection alone, but the slow accumulation of self-knowledge across many of them.

This is not gamification. The user gets nothing for tagging. The correlation observations are intrinsically valuable, not extrinsically rewarded.

---

## 4. The Reflection Library

The reflection is the product. Every line is written in Rieko's voice direction, with cultural authenticity anchored by her. Tom and Claude carry the drafting volume; Rieko sets the brief (vocabulary, examples, vetoes), reviews voice on early batches, and signs off at milestones. Rieko herself focuses on illustration; her writing time is reserved for the brief and for spot-checks, not for line-by-line authoring. Nothing is AI-generated at runtime. This is the most important architectural decision in the entire build.

### Library scale

- ~25 reflections per sub-expression
- ~30 sub-expressions
- ~750 reflections at launch
- Library refreshed quarterly. Tom and Claude draft new entries and retire stale ones; Rieko approves voice at batch level

### How a response is selected

1. Claude Haiku reads the user's structured input (state + sub-expression + optional context + recent history) and returns a classification confirmation.
2. App queries the library, filters by state and sub-expression, weights by recency (avoid repetition for the same user).
3. Returns one reflection from the candidate set.
4. No generation at runtime. No drift. No regulatory exposure to AI-authored emotional content.

### Voice

- Auwa speaks as a being, not a bot. Gentle, observant, slightly cosmic. Never clinical, never cheerful, never prescriptive.
- 2-3 sentences in the revelation (deliberately tighter than earlier drafts, since the character is now the hero and the text is supporting). Poetic but not purple. Every word earns its place.
- Reflects what's named. Never adds assumptions, advice, or "have you tried..."
- Natural metaphors drawn from light, water, weather, hands, breath. Never forced.

### Time-of-day weighting

Each sub-expression's 25 reflections include morning-leaning and evening-leaning variants. Selection logic prefers one or the other based on the local time of the user's visit. Same state, different texture at 8am vs 9pm. This is how we keep the experience feeling fresh for a daily user without doubling the library size: morning reflections lean toward beginnings, openness, light arriving; evening reflections lean toward settling, weight, light receding. The same sub-expression (Setsunai, say) gets different colour at different hours.

The same logic could later extend to day-of-week or seasonal subtle shifts, but only inside the selection logic, never as a visible label on the surface.

### What Auwa never does

- Gives advice ("Try taking a walk")
- Diagnoses ("This sounds like anxiety")
- Reframes ("Look on the bright side")
- Questions therapeutically ("Why do you think that is?")
- Uses emoji, exclamation marks, or false warmth
- References the 72 micro-seasons inside the reflection text

### What Auwa always does

- Names the feeling precisely (using the Yamato emotional framework underneath)
- Reflects it back in a way that makes the user feel seen
- Connects the emotion to something natural (not forced, but present)
- Leaves space. The reflection ends, and the user sits with it.

### The Yamato Emotional Framework (Ha-Ta-A-Yu-Wa)

Rieko's proprietary framework based on ancient Yamato language (大和言葉). Five core emotional states, each containing nuanced sub-expressions described through poetic Japanese words. Users never see the taxonomy as a list. They tap a character variant that feels like the right one and feel the precision through the response.

**UI presentation rule for Yamato terms (locked 27 May 2026).** Wherever Yamato terms appear to the user — state names beside character variants, sub-expression refinement labels, emotion taps inside Senshin, any future surface — the **English translation leads** as the primary label and the **Yamato word sits underneath in smaller subtext**. *Reflective* large, *Aware* small below it. *Poignant* large, *Setsunai* small below it. The Yamato anchors the brand culturally and gradually exposes the user to the vocabulary; the English ensures the meaning is never opaque. This is Rieko's call: Auwa is not a language-learning app, and the user should never feel they have failed to understand because they cannot remember which Yamato word means what. The spec below presents Japanese-first as the canonical internal reference (so developers and writers treat Japanese as the source of truth); the implementation flips this for user display.

**晴 Hare (Radiant)** — Positive, high energy. Affirmation of self and situation.
- 晴れやか Hareyaka (Clear), 心躍る Kokoro-odoru (Exhilarated), 誇らしい Hokorashii (Proud), ありがたい Arigatai (Grateful)

**昂 Takaburi (Intense)** — Negative, high energy. Energy from conflict, rejection, or friction.
- 憤り Ikidoori (Indignant), 燻る Kusuburu (Smoldering), 妬ましい Netamashii (Envious), 疎ましい Utomashii (Averse), 荒ぶる Araburu (Turbulent), いとわしい Itowashii (Disagreeable), もどかしい Modokashii (Frustrated)

**哀 Aware (Reflective)** — Negative, low energy. Sense of loss, resonance, deep inward reflection.
- 切ない Setsunai (Poignant), 情けない Nasakenai (Ashamed), やるせない Yarusenai (Helpless), 儚い Hakanai (Fleeting), しめやか Shimeyaka (Somber), 気後れ Kiokure (Timid), 後ろめたい Ushirometai (Guilty)

**揺 Yuragi (Unsettled)** — Anxiety, shock, the unpredictable.
- せわしない Sewashinai (Restless), 心細い Kokorobosoi (Insecure), 惑う Madou (Bewildered), おののき Ononoki (Awe-struck), あっけにとられる Akke-ni-torareru (Dumbfounded), 心もとない Kokoromotonai (Uneasy), いたたまれない Itatamarenai (Awkward)

**和 Nagomi (Serene)** — Positive, low energy. Fulfilment, tranquility, release of tension.
- 和む Nagomu (Serene), 寛ぎ Kutsurogi (Relaxed), 健やか Sukoyaka (Centred), 満ち足りる Michitariru (Content), 慈しみ Itsukushimi (Compassionate), 安らぐ Yasuragu (Relieved)

### Technical implementation

- **Model:** Claude Haiku 4.5 for classification only. Very cheap (~£0.0005 per call). No text generation at runtime.
- **System prompt:** Encodes the Yamato framework and returns structured JSON: `{state, sub_expression, confidence}`. Optional input includes the user's recent state history for soft pattern detection (e.g. "they've leaned Aware lately, so this Hare reading is a shift").
- **Library access:** Reflection text served from Sanity CMS via the edge, with a CDN cache.
- **Fallback:** If classification confidence is low, default to the user's last state and serve a soft, open library response. Never error visibly.

---

## 5. Key Screens

### 5.1 Welcome (one-time)
Dark screen, small Auwa orb breathing. Three lines of welcome copy. Single "Begin" button. No skip.

### 5.2 Personalisation (one-time)
12-15 illustrated motifs in a 4x4 grid, organised by soft category. User picks 3-5. A small preview of their Kokoro updates as they pick, items appearing on the silhouette. Continue button enabled once 3+ are selected.

### 5.3 Arrival (the daily home)
Dark cosmic background. The user's Kokoro (their unique accumulation) hovers in the upper third. Five small Auwa character variants below in a gentle arc, one per Yamato state. Above the arc: *How are you feeling right now?* (with each variant's English-primary label visible on tap or focus, Yamato as subtext per Section 4). For returning users, a small line above: *Your last visit, you carried [English state name]*.

Below the state arc, four small quiet entries in a row, each one word, each never highlighted: *light* (opens Daily Light directly, 5.14), *rest* (opens Sanctuary, 5.11), *trove* (opens Firefly Trove, 5.15), *senshin* (opens Senshin Entry, 5.17). The user who needs each one finds it; the user who does not never notices it is there. The four quiet entries are typographically subordinated to the state arc, never the same size or weight.

A folded-paper mark appears beside these entries when a Letter from Auwa is unread (5.12). It disappears once read.

**On the Daily Light dual placement.** The Daily Light is reachable two ways: as a direct entry from this home arc (the *light* word) for users who want to capture a moment standalone, and as a natural follow-on after the daily revelation (D7c in the flow diagram) for users in the sequenced practice. Both paths exist deliberately. The sequenced path is the default expected flow; the standalone path serves the user who opens the app at lunchtime specifically to capture something small they noticed at breakfast.

### 5.4 Sub-expression Refinement (optional)
A small row of 3-4 sub-expression labels appears under the selected variant, following the UI presentation rule from Section 4 (English leads, Yamato as subtext beneath). Tap one to refine, or tap the variant again to proceed without refinement.

### 5.5 Context Tap (optional)
*What were you up to?* in EB Garamond at the top. 8 broad labels in a 4x2 grid below, each a small tappable card. *Something else* tile opens a small text field. Skip is a quiet text link at the bottom.

### 5.6 Light Shower
3-4 seconds. Orb scales up, gradient blooms, character emerges. No interaction possible.

### 5.7 Revelation
Full-bleed gradient. The user's Kokoro is the hero: large, centred, 280-360px on mobile, with a soft halo. The reflection text sits BELOW the character as supporting copy, smaller than expected (16-18px EB Garamond), 2-3 short lines, centred. The Animaru layout instinct: the character carries the visual weight, the text supports.

This inversion serves three goals. The moment of revelation is visually about the character, not the words, which matches "Auwa reveals" more cleanly than a wall of text. The share card becomes much stronger because a character-dominant card is what spreads on Instagram (the text isn't the thumbnail). And every screenshot, every share, every press shot becomes Auwa's face, which is brand distribution by design.

Quiet *tap to continue* at the bottom. Action chrome (Save / Share / Continue) appears on tap.

### 5.8 Archive
Vertical stack of gradient cards. Each card: date, Yamato state Japanese character, opening line of reflection, small context icon if tagged. Tap to expand for full revelation.

After 10+ revelations, a quiet "Observations" section at the top: 1-2 sentences naming correlations. Updates weekly. Never prescriptive.

### 5.9 Kokoro View
Dedicated screen showing the user's current Kokoro at large scale. Tap items to learn what they represent ("From your 18 May visit during Aware. Tap to revisit."). Print order available here for paid users.

### 5.10 Share Card
9:16 (Stories) and 1:1 (Feed) preview. Card contains: gradient bg, the user's Kokoro, reflection text, small *Revealed by Auwa* wordmark at the bottom. Save to camera roll or share to Instagram. Journal content never appears on share cards.

**Why the share card is strategically central.** The share card is Auwa's primary organic growth surface. Every shared card is a piece of marketing the user opted into making. Founders of social-native apps including BeReal, Lapse, Pi, and Co-Star have publicly attributed their early growth to in-app sharing surfaces outperforming paid acquisition, often by an order of magnitude. The card design therefore optimises for screenshot-worthiness: character-dominant composition, gradient that pops in a feed, the wordmark quiet enough that the card never reads as an ad. The reflection text remains legible at thumbnail size. Cards are designed for Instagram first (Stories and Feed), with TikTok and Pinterest dimensions added in Phase 4. The user shares because the card is beautiful, not because we prompted them to.

The implication for the build: every revelation must produce a card that someone would post without prompting, every time. This raises the bar on composition, gradient quality, and the Kokoro silhouette in a way that ripples back into Rieko's brief. A character variant that reads well on a phone home screen may not read well at 1080x1350. The share card is the test.

### 5.11 Sanctuary
Full-bleed gradient in the user's current emotional weather, or neutral cosmic dark if no revelation today. The Kokoro hovers small at centre, breathing. Ambient Suno track plays softly. The orb of Auwa pulses slowly above. No interaction prompts, no timer, no state tap, no reflection text. Tap anywhere to leave. Nothing logged. Entry is a quiet *rest* beside the state arc on the arrival screen. See Section 2.3 for the full rationale.

### 5.12 Letter
Once a week, on a quiet day, a short letter from Auwa appears on the arrival screen. Subtle entry: a small folded-paper mark beside the state arc, with a soft glow when unread. Tap to open. Full-bleed atmospheric gradient (matched to current season or the user's recent emotional weather), Auwa's orb at the top, three or four sentences in EB Garamond centred, signed *Auwa*. Tap anywhere to close. The letter persists in the archive under a separate Letters section. Not pushed, not notified. The user finds it on their next visit. See Section 2.3.1 for the rationale.

### 5.13 Sound Library
Accessed from inside the sanctuary surface as a small row of named tracks at the bottom. Three to five ambient Suno-generated tracks: *Moss*, *Rain on stones*, *Bell at dawn*, *Snowfall*, *Pine in wind*. Tap a name to switch; current track is underlined. No play/pause control, no volume slider (uses the phone's volume), no timer. Track loops as long as the user is in sanctuary or the lantern surface. Default track on first sanctuary open is *Bell at dawn*. Final names locked by Rieko.

### 5.14 Daily Light
Optional second screen after the daily revelation. Above the fold: *Auwa noticed a small light today.* Below: a single question pulled from a library of around 365 prompts written by Tom and Claude in Rieko's voice direction. Examples: *What made you smile first thing today? Who made your day a little easier? What did you taste today that was good? What sound stayed with you? What color caught your eye first? What small kindness did you notice from a stranger?*

The user answers with a short text (capped at ~15 words, soft enforcement) and optionally taps a small camera icon to attach a photo from their library or take one fresh. One tap to capture, one tap to skip entirely. Skipping does not record anything. Capturing creates a firefly that joins the trove (see 5.15).

The question rotates each day; the library is engineered for non-repetition through at least a year of daily use. Time-of-day weighting applies the same way it does to reflections (morning prompts lean toward beginnings, evening prompts toward settling).

### 5.15 Firefly Trove
Dedicated screen, accessible from the home arc (a small *trove* word beside the state and sanctuary entries) and from the archive. Dark cosmic gradient background. All captured fireflies drift in slow constellations, each with its own pulse rate (1.4-2.1s cycles), drift path (noise-driven), slight size variation (5-15%) and slight warmth variation. The visual identity is dark-magical-forest: small living lights in a deep cosmic space.

Tap any firefly to inspect. Surrounding fireflies dim slightly to hold attention on the chosen one. Date, the user's answer text, and the attached photo (if any) appear below. Tap again to release.

Toggle at the top: *This week | This month | This year | All*. Switching periods triggers a soft flocking transition (Boids-style cohesion / separation / alignment in JS, no external library). Counts visible at each period (*87 fireflies this year*) because these are abundance numbers, not progress numbers. The user is meant to feel rich.

Weekly reflection: on a quiet evening (Sunday by default, user-configurable), a small line appears on the arrival screen: *5 fireflies this week. Tap to revisit.* The user opens the trove and sees the week's catch.

Monthly reflection: on the first of the month, the trove home shows a brief moment: *Last month, you noticed 23 fireflies. They began with...* opening a scrollable month view of the previous month.

Empty state: a single Auwa orb at centre, waiting. *Your trove is empty. What did you notice today?*

### 5.16 About Senshin
A small *About this practice* link on the Senshin entry screen opens this short page. Cultural anchor (chōzubachi, Senshin as Japanese practice, not clinical intervention). Three to five *Further reading* links to publicly available research the user may find interesting: an NHS or APA introduction to cognitive distancing, a summary of Pennebaker's expressive writing research, the Mueller & Oppenheimer 2014 study on handwriting versus typing (the principled reason for paper-first), Lieberman's affect labelling work (the principled reason for the emotion tap). Framed throughout as related public research, never as *Auwa is doing this*. The credentialing is the research, not us.

### 5.17 Senshin Entry
The Mind Wash entry surface. Five steps, each its own small screen.

**5.17.1 Breathing intermediate.** Dark gradient. The breathing orb. *Take a breath. What needs washing?* Tap to proceed. Sets intent, prevents casual use.

**5.17.2 Categorisation.** A small grid of category taps: *Work, Money, Family, Friend, Relationship, Health, Grief, Self, Future, Something else.* Multi-tap soft-allowed for crossed categories. *Something else* opens a short capped text field. The user's selection is the audit data over time.

**5.17.3 Emotion.** *How does this feel right now?* The five Yamato character variants from the daily revelation appear in a small arc. Single tap, optional sub-expression underneath. **English leads, Yamato as subtext** per Section 4 UI rule.

**5.17.4 Guidance.** *Now reach for your notebook. Write the worry through, then write what is actually true. Often, when we write it down, we see it differently. What facts would your future self want you to remember? When you are finished, you do not need to return here.* Below: small *Type here instead* link for users who prefer the in-app option (opens 5.17.5). Persistent crisis link at the bottom of this screen: *If this is heavier than the page can hold, find someone to talk to.*

**5.17.5 In-app two-column write (fallback).** For users who chose *Type here instead*. Two text areas, vertically stacked. Top: *The worry.* Free text, no character limit. Optional reframe prompt between columns: *Often, when we write it down, we see it differently. What facts would your future self want you to remember?* Bottom: *The reality.* Free text, no character limit. Save. End-to-end encrypted per Section 9.

**5.17.6 Closure moment.** Atmospheric only. Soft wash of warm light, the orb pulsing once, a single line: *Held. Go gently.* Five seconds, ambient Suno track underneath, no chrome, no badge, no number. Fires immediately for in-app users, fires on the optional confirmation prompt for paper users (off by default; see Section 9.4).

**5.17.7 Optional Sanctuary handoff.** *Would you like a moment to settle?* Tap yes to enter the standard Sanctuary surface (5.11). Tap no or wait to close the app.

### 5.18 Senshin Look Back
Accessed from the archive (and, once the user has 5+ entries spanning 30+ days, from a quiet *Look back* link at the top of the Firefly Trove). Three views, all driven by data the user generated:

**By status.** List of past worry labels with dates. Beside each: *still on my mind* / *settled*. Tap to mark. Count line at top: *11 worries washed. 8 settled. 1 still on my mind. 2 unmarked.*

**By category.** Counts by category: *Work 4, Family 3, Money 2, Health 1.* User reads, develops their own pattern recognition. No interpretation.

**By emotion.** Counts by Yamato state with English-primary labels (*Reflective 5, Unsettled 4, Intense 2*). Plus the cross-reference: *Work-category worries have most often felt Intense. Family-category worries have most often felt Reflective.*

No badge, no streak, no score. Just user-generated facts.

### 5.19 Settings / Account
Profile, subscription management, notification preferences (default off), data export, delete account, print order history, Senshin recovery key generation, Senshin archive export, *Remind me about unfinished Senshin practices on my next visit* toggle (off by default).

---

## 6. Technical Architecture

### 6.1 Stack

Extends the existing auwa.life Next.js codebase. No new framework introduced.

- Next.js 15 (App Router, RSC)
- Tailwind CSS 4 (OKLCH tokens)
- Framer Motion (animations)
- Anthropic SDK (Claude Haiku classification only)
- Vercel Postgres (user accounts, revelations, Kokoro state)
- Sanity CMS (reflection library, motif library, sub-expression definitions)
- Stripe (subscription billing)
- Auth.js (email + social auth)
- Capacitor (native wrap, Phase 4+)

### 6.2 Data Model

**Users**
- id, email, name, created_at, subscription_tier, stripe_customer_id, kokoro_motifs (array of motif IDs)

**Revelations**
- id, user_id, created_at, state, sub_expression, context (nullable), reflection_id, reflection_text (denormalised for export reliability)

**Motifs (Sanity CMS)**
- id, name_en, illustration_svg, category, source (personalisation | seasonal | weather | threshold | noticing)

**Reflections (Sanity CMS)**
- id, state, sub_expression, text, author (defaults to Rieko)

**Context tags (Sanity CMS)**
- id, label, icon_svg

### 6.3 API Routes

- `POST /api/classify` — Takes structured tap input, returns state + sub-expression
- `POST /api/revelation` — Creates a revelation, fetches a reflection, returns full revelation data
- `GET /api/archive` — Paginated revelations for current user
- `GET /api/archive/observations` — Pattern observations (correlations) for users with 10+ revelations
- `GET /api/kokoro` — Current Kokoro state for user (motifs, history)
- `POST /api/auth/*` — Auth endpoints
- `POST /api/stripe/checkout` — Subscription checkout
- `POST /api/stripe/webhook` — Subscription events
- `POST /api/print/order` — Submit a print order to fulfilment partner
- `GET /api/share/[id]` — Share card image (og:image style)

### 6.4 Key technical decisions

- **PWA first.** Service worker, manifest, add-to-home-screen, Web Share API for cards.
- **Pre-designed visuals.** All character variants, motifs, gradient families, and Kokoro composition rules are designed by Rieko, stored as illustrated SVG/PNG. AI never generates images.
- **Classification only.** Claude reads the user's tap input and returns structured JSON. The library serves the text. No generation at runtime.
- **Edge rendering** for the revelation flow so the light shower covers any API latency.
- **Rate limiting.** Free 3/month. Paid soft-capped at 10/day to deter abuse but unlimited in practice.

---

## 7. The Kokoro Avatar Mechanic

Translated from the book canon. In the books, Auwa reveals a being's Kokoro, and the Kokoro takes an Auwa-shape with personal items expressing who that being is. In the app, the user IS the being. Their Kokoro is what they see on every revelation. Auwa is the implicit revealer, felt in the orb on arrival and in the light shower, but not shown beside the Kokoro on the hero screen.

### Where the Kokoro appears

- Arrival screen (above the state tap arc)
- Revelation screen (the figure receiving the reflection)
- Archive screen (small marker at the top, "your Kokoro this season")
- Kokoro view (dedicated screen, large)
- Share cards (the figure on the card)
- Print product (the artefact)

### How motifs accumulate

Three sources for v1, deliberately different cadences so the avatar feels alive without becoming noisy. Items don't appear because the user *earned* them. They appear because Auwa *noticed* something.

1. **Personalisation seeds (one-time, at signup).** 5-7 motifs from the curated first-run grid of 15-20 options. Permanent. These make the Kokoro recognisably the user's from the first revelation. This is the front-loading mechanic: without it, new users in month one don't see enough motif accumulation to feel the curiosity-pull, and the strongest retention thread in the stack collapses.

2. **Emotional weather (monthly).** Based on the Yamato state the user's visits cluster around in a given period, a slightly larger motif appears. A small flame for Nagomi-heavy months. A folded leaf for Aware. A current-thread for Yuragi. These shift over months as the user's weather shifts, layering rather than replacing.

3. **Threshold markers (occasional, silent).** Quiet additions at meaningful counts. After your 50th revelation, a small mark you might not notice. After your first year, something at the shoulders. The user only notices them in retrospect.

A fourth source, **noticing items** based on language patterns in the user's "something else" inputs, is deferred to Phase 5+. Hard to author well; needs scale.

Note on what's deliberately absent: there are no seasonal motifs on the Kokoro. Seasonal content lives in the journal and on IG, not in the app. Without the kō stamp on the revelation surface, there's no anchor to hang seasonal accumulation on, and the alternative (invisible background accumulation) becomes decoration the user can't engage with. Dropped.

### What it never becomes

It never has slots, unlockable cosmetic packs, or a wardrobe screen. No progress bar, no completion percentage, no "next level" indicator. No leaderboard. No "you have 8 of 30 seasonal markers" display. The Kokoro accumulates quietly because the user showed up.

### The print product

At year-end (or any milestone), the user can order a printed portrait of their accumulated Kokoro on hand-pressed Japanese paper. A4, numbered, with Rieko's mark. £30-40 via the store. Digital export of the same portrait included with paid tier; physical print is the add-on.

Hand-painted custom figures (one-off per user) are not in scope. Operationally unrealistic against Rieko's hand-finishing time. The print product is the realistic premium artefact.

### Why this is Auwa's glue (the retention argument)

Finch's pull is care-for-the-pet, borrowed from Tamagotchi, validated across thirty years of consumer psychology. Auwa can't replicate it; guilt-driven return is incompatible with awareness practice. So the glue can't be one strong mechanic. It's a stack of gentler ones, working together. The compound effect is comparable, but each piece has to do its job.

The nine pulls, in rough order of strength:

1. **The accumulating Kokoro itself.** Curiosity instead of guilt. The user opens the app because their self-portrait is slowly forming, not because something will suffer if they don't. This is the strongest pull and the closest analogue to Finch's bird. Front-loaded personalisation makes this work from session one.

2. **The Firefly Trove (Daily Light).** The user opens the app to capture a small noticed moment from their day. The trove fills with glowing fireflies, each one a small light the user would otherwise have lost. Visible compounding from session one (not session thirty), specific anti-repetition prompt design, optional photo attachment, year-end Firefly Year document. Directly addresses the negative-bias pattern (perfectionists, achievers, anyone with a tendency to under-attend small good moments). The strongest felt-practice mechanic in the app. See Section 8.

3. **The reflection being right.** When Auwa names what you're feeling in a way you didn't have language for, you remember. Depends entirely on the writing being excellent. Tom and Claude draft in Rieko's voice direction, with Rieko signing off on batches. If the library reads as generic, this pull collapses and the whole stack slackens. Library size and quarterly refresh protect this.

4. **The archive deepens.** Correlation observations after 10-20 revelations. Each visit invests in self-knowledge that compounds. Users in month four see things about themselves they couldn't in month one. Non-substitutable: no other app has their data shape.

5. **Sanctuary.** The user returns not to do the daily flow but to rest in the app's atmosphere. Ambient sound, gradient bloom, the breathing orb, the Kokoro hovering. Thirty seconds on the train home from work, or longer when the day has been heavier. Distinct from the daily revelation: no input, no record, no reflection. Rieko's instinct, and the most natural extension of the brand's promise to be a place of awareness rather than a tool for managing it. This is also the pull that closes the gap with Calm and Headspace without putting Auwa into a guided-content arms race we cannot and should not win.

6. **Time-of-day texture.** Morning reflections and evening reflections feel different even within the same sub-expression. The library doesn't double, the selection logic gets smarter. A daily user senses freshness without it being announced.

7. **Story unlocks.** Paid-tier segments of Rieko's illustrated books drip in over time. Genuine narrative the user can't read anywhere else.

8. **The light shower.** Sensorial. People come back for the moment of being bathed in colour the same way they come back to candles or hot baths. Soft, but real.

9. **The print artefacts.** Year-end Kokoro portrait and Firefly Year book arriving in the post. Long arc, but real: users return through the year partly because they're slowly authoring something they'll hold in their hands.

The honest trade-off: Finch users open Finch on a daily-streak compulsion. Auwa users open Auwa because the experience is consistently worth two minutes. The design target is daily for both, but Auwa's daily comes from quality, not guilt. The risk this stance carries is that if any of the nine pulls is weak (especially the writing in pull 3), there's no compulsion mechanism to cover for it. Finch forgives a lot of mediocrity. Auwa cannot.

The mitigation isn't a mechanic. It's craft. The reflections have to be excellent, the Kokoro evolution has to be visually interesting in the first three months, and the archive observations have to feel insightful from the first one surfaced.

And one layer above all of this: Auwa lives across four pillars. A user who lapses on the app can still read the journal, see IG, buy a figure, gift a book. The character is the constant across surfaces. Lapse-recovery is built into the brand architecture, not engineered into the app's compulsion loops.

---

## 8. Daily Light & Firefly Trove

A second daily mechanic alongside the revelation, designed to address a specific human pattern: negative bias. Most people, especially perfectionists and high-functioning achievers, naturally over-attend to what is wrong and under-attend to what is small and good. The Daily Light is Auwa's intervention. The Firefly Trove is the visible accumulation of that intervention over time.

This is the answer to the Gemini-Kinder World analysis (see Section 15 in `context/business/business.md`): it gives Auwa the felt-practice dimension that pure ritual apps need, the visible session-one compounding that pulls users back, and a second viral hook beyond the share card. It also closes the loop on the brand metaphor (Auwa is a luminous being; the user collects small luminous beings they noticed in their own life).

### 8.1 The psychology, briefly

Seligman's "three good things" study (Penn Positive Psychology Center, 2005) is the foundational positive psychology result: participants who wrote down three specific good things from each day, for one week, showed measurable depression-score improvements that persisted for six months. The mechanism is that *active, specific noticing* trains the brain to attend differently. Generic gratitude lists fail because they default to durable items (family, health, home) that lose meaning through repetition. The Daily Light is engineered around the opposite principle: a different specific prompt each day, asking for a small ephemeral noticing the user would otherwise have lost.

### 8.2 The mechanic

After the daily revelation, the user is shown one optional second screen: *Auwa noticed a small light today.* A single question from the library follows: *What made you smile first thing today? Who made your day a little easier? What did you taste today that was good? What sound stayed with you?*

The user answers with a short text (capped at around 15 words, soft enforcement). Optionally they attach a single photo from their library or take one fresh. They can skip the entire surface in one tap; skipping records nothing.

If they capture, a single firefly appears at the centre of the screen, breathes once at full size, glows brighter for a beat, then drifts upward and out of frame toward a small trove icon. One word of confirmation: *Captured.* Then the screen returns.

### 8.3 The photo attachment

A real and specific problem in modern life: meaningful small moments captured on phones (the bee on the flower, the morning light through a curtain, the stranger's smile) get buried under thousands of other camera-roll images. The Daily Light lets the user surface and contextualise these moments. The photo is attached to the firefly, visible only when the user taps that firefly to inspect.

Photos compress on upload (1080px max width, ~200-400KB), store in Vercel Blob, and are user-private by default. They never appear on share cards unless the user explicitly chooses to share a single firefly with photo, in which case they get a preview and confirm. The Year-End Trove document (paid tier, Section 8.6) becomes far richer with photos: each firefly with its text and image, organised by month.

Photos are free for all users from day one. The mechanic is too important to gate.

### 8.4 The trove

The collected fireflies live in a dedicated screen (5.15). Dark cosmic background. Each firefly has its own pulse rate, drift path, slight size variation, slight warmth variation, so the swarm reads as alive rather than mechanical. Tap any firefly to inspect: date, the user's answer, the photo if attached.

Toggle at top: *This week | This month | This year | All*. Counts visible because abundance numbers, not progress numbers. *87 fireflies this year* is meant to feel rich, not measured.

Period transitions use Boids-style flocking logic (cohesion, separation, alignment) in pure JS, no external library. At density (300+ fireflies) the swarm clusters softly; at low counts (3-5) each firefly sits spaced out and clearly readable. Same physics, different emotional read at different scales.

### 8.5 Why fireflies year-round

Fireflies were chosen as the single year-round motif for four reasons that outweigh the cultural-accuracy concern around their May-June season:

1. The dark cosmic palette only works with one motif. Fireflies glow *in* the dark; they were born to live on Auwa's existing palette. Petals on dark read funereal; snowflakes read stock-Christmas; leaves read Halloween. Fireflies read magical and alive.
2. Ownability. A single motif gives Auwa a visual territory it owns. Multi-seasonal motifs share territory with countless Japanese aesthetic brands.
3. The conservation commitment (Section 8.7) is clean and ownable around one species. Four motifs would muddy the cause.
4. The permanence of captured fireflies in the trove is itself a *mono no aware* reading: real fireflies live one to two weeks, the captured firefly lives for years. The act of capture transforms impermanence into something held.

Rieko's cultural concern is honoured in the app's About copy: *Auwa uses the firefly the way Japanese art has always used it. As a symbol of small light caught in darkness, not as a calendar marker. The symbol outlives the season.* This is consistent with established Japanese symbolic use of fireflies year-round (Hokusai, kimono motifs, brand iconography, literature).

Seasonal motifs (petals in spring, leaves in autumn, snowflakes in winter alongside summer fireflies) remain documented as a v2 or v3 option (Section 15), should we later want to add variety. Not the v1 direction.

### 8.6 Free vs paid

- **Free:** 3 fireflies per month captured (matches the 3-revelations limit). Trove view limited to most recent 30 fireflies. Weekly reflection. Photo attachment included from day one.
- **Paid:** unlimited fireflies. Full trove (all years). Monthly digest. Year-end Firefly Year document (digital PDF for all paid users; printable book on hand-pressed Japanese paper as an add-on, £30-40 via the store, joined with the Kokoro portrait as a single annual artefact or available separately).

The Firefly Year alone justifies a year of subscription for many users. A 200-firefly year is a 200-page personal book with photos. No other app on the market produces an equivalent artefact.

### 8.7 Conservation commitment

Real fireflies are disappearing. They need clean water, dark skies, healthy habitat. Some scientists describe the current cohort as the last generation that will reliably witness them in many regions.

Auwa commits five percent of every subscription to firefly habitat conservation, from the first paid subscriber, not from profitability. The commitment is published on the app's about page, on auwa.life/app, and reaffirmed in an annual impact report sent to all subscribers.

Partner organisations are identified by Rieko's Japan network, starting with one or two of: the Tatsuno Firefly Conservation Society (Nagano), the Moriyama Hotaru Festival's conservation arm (Shiga), the Itoshima Hotaru Network (Fukuoka), and internationally the Xerces Society for Invertebrate Conservation (US). Final selection in Stage 6 of the build (content engine + friends release).

The conservation commitment is also part of Auwa's defensive moat: a weekend-built Claude-wrapper competitor can copy the UI; it cannot easily ship a real conservation programme with named partners and annual impact reporting. The commitment compounds the brand over time.

See `context/business/business.md` Section 6 for the financial model and Section 15 for the AI-disruption mitigation framing.

### 8.8 Implementation notes

- **Library size:** ~365 daily prompts in Rieko's voice direction, written by Tom and Claude in batches before friends release.
- **Photo storage:** Vercel Blob, ~£15/month at 1000 users with 365 photos each.
- **Motion:** SVG + Framer Motion for breathing and capture; Canvas + Boids for trove flocking. Estimated 300 LOC total across both screens.
- **Data model:** A new `daily_lights` table (id, user_id, question_id, answer_text, photo_url nullable, created_at) and a new `daily_light_prompts` collection in Sanity CMS.
- **Edge cases:** if the user opens the app late at night and answers a morning prompt, soft acceptance (no scolding). Multiple captures per day allowed (paid only); free users cap at 3 per month total across days.

---

## 9. Senshin (Mind Wash)

The third secondary surface in the app, alongside Sanctuary and the Firefly Trove. A structured cognitive-distancing practice for the specific moments when a worry, concern, or persistent thought is generating spiralling anxiety that the daily revelation alone cannot resolve.

The direct inspiration is Tom's personal Mind Wash journal (documented in `~/Github/personal/health/context/tom/mind.md` and `audit.md`). The audit pattern (most worries resolve as predicted; the act of writing produces cognitive distance; recurring grooves emerge over time) translates cleanly into a small principled feature inside Auwa.

The cultural anchor is the chōzubachi (手水鉢, temple purification basin) where visitors wash their hands and mouth before entering a shrine. *Senshin* (洗心) means *washing the heart*. The metaphor is the same gesture at a different scale, applied to what the heart carries. The framing stays strictly cultural and philosophical, never clinical, never therapy-language, never claiming to treat anxiety or depression.

### 9.1 The principle: paper first

Senshin works best on paper. The research on handwriting versus typing (Mueller & Oppenheimer 2014, Van der Meer et al. 2017) consistently shows that slow physical writing produces deeper cognitive engagement than typing. The Pennebaker expressive writing tradition (1980s onward, seventy-plus replications) was developed primarily on paper. For a practice designed around slowing down and gaining distance from a worry, the physical instrument matters.

The app therefore encourages paper as the primary medium, with an in-app full-text fallback for users who cannot or prefer not to write physically. The app's role is to provide the ritual frame (categorisation, emotional labelling, guidance, closure) rather than to absorb the writing itself. This is also the principled answer to the privacy question: the most painful content the user might write never enters the app at all when they use the paper-first path. The app holds only the structured metadata that powers the audit over time.

### 9.2 The flow

Full screen specs in Section 5.17. The shape:

1. **Entry.** User taps *senshin* on the home arc.
2. **Breathing intermediate.** *Take a breath. What needs washing?* One tap to proceed.
3. **Categorisation.** A small grid of category taps (Work, Money, Family, Friend, Relationship, Health, Grief, Self, Future, Something else). Multi-tap allowed.
4. **Emotion.** *How does this feel right now?* The five Yamato character variants from the daily revelation. Single tap, optional sub-expression. English-primary labels, Yamato subtext (Section 4 rule).
5. **Guidance.** Encouragement to use a physical notebook, with the framing prompt and an in-app *Type here instead* fallback.
6. **Closure moment.** Atmospheric. *Held. Go gently.* Five seconds. No badge.
7. **Optional Sanctuary handoff.** *Would you like a moment to settle?* One tap into the standard Sanctuary surface.

Steps 1-4 take under thirty seconds. Step 5 (paper or in-app) takes as long as the user needs. Steps 6-7 land the closure.

### 9.3 Why categorisation, not summary

An early version of this feature asked the user to write a short summary after their paper work. Rieko caught the problem (no one wants to return to an app to recap something they already washed on paper) and proposed structured categorisation up front instead.

The categorisation step is not a summary. It is a single labelling tap that happens *before* the writing. The user names the kind of thing they are about to wash (Work, Family, etc) and that label becomes the audit data over time. The deep work happens on paper and stays on paper. The app captures only the structured metadata.

This solves three problems at once. The user is never asked to do the work twice. The most sensitive content never enters the app. The audit over time still works because category data is sufficient for pattern recognition. *Of my 11 senshin this year, 4 were about work and 3 about family* is a powerful sentence even without the underlying entries.

### 9.4 The optional return prompt (off by default)

For paper users, the closure moment (step 6) only fires if they return to the app. The app does not require a return. But for users who want the loop closed, an optional setting (*Remind me about unfinished practices on my next visit*, off by default) surfaces a single small line on the next natural app visit: *On Tuesday you opened a senshin. Did you complete it?* Tap *yes* to mark and trigger the closure moment. Tap *no* or *x* to dismiss permanently. Auto-expires after seven days. Never accumulates beyond one prompt at a time. Never a push notification. Never fires on the entry screen of any practice; only on the home arrival surface and only when the user is already in the app for something else.

### 9.5 Look Back: the user-driven audit

A surface (5.18) accessed from the archive (and, after the user has five entries spanning thirty days, from a quiet *Look back* link at the top of the Firefly Trove). Three views, all driven by data the user generated themselves:

- **By status.** List of past worries with dates and user-marked status (*still on my mind* / *settled* / unmarked). Count summary at top.
- **By category.** Counts by category. *Work 4, Family 3, Money 2.*
- **By emotion.** Counts by Yamato state, English-primary. Plus the cross-reference layer: *Work-category worries have most often felt Intense. Family-category worries have most often felt Reflective.*

No badge, no streak, no score. No NLP, no theme detection, no inference. Auwa is the keeper of the record; the user is the auditor.

The medicine over time is the same medicine Tom gets from his Mind Wash audit (`audit.md`): the count of *settled* versus *still on my mind* is durable evidence that catches the next spiral. *I have washed nine worries and seven settled as I predicted* is the sentence that changes the relationship to the tenth worry.

### 9.6 Storage: two-tier with end-to-end encryption

Auwa stores app data in two tiers with different protections.

**Tier one: standard private storage.** Reflections, fireflies and their answer text, photo attachments, Kokoro state, archive observations, user account info. Vercel Postgres and Vercel Blob, encrypted at rest by the underlying infrastructure, private access controls, normal backups. Industry-standard for sensitive but not painful personal data.

**Tier two: end-to-end encrypted storage.** Senshin entries only (categories, emotion tags, statuses, and the in-app two-column text where used). Encrypted on the user's device using a key derived from their password (Argon2id with appropriate parameters). The encrypted blob is sent to our database; what we store is mathematically unreadable to us. Even if Auwa were breached, even if served a subpoena, even if a future Auwa employee with bad intentions wanted to peek, the data is noise without the user's password. Same architecture used by Signal, ProtonMail, Standard Notes, 1Password.

The line between the two tiers is exactly the line of intent. Tier one is content the user chose to make. Tier two is content the user took out of their head to wash.

**Recovery key.** Offered at signup as an optional safeguard. A long random string generated on-device, shown once, never stored by us. Users can save it (print, screenshot, password manager) as the only way to recover Senshin entries if they forget their password.

**Account deletion.** Hard-deletes the encrypted Senshin blobs immediately. No soft delete, no thirty-day retention, no backup. Gone.

**Export.** At any time from settings, the user can export their entire Senshin archive (entries plus categories plus emotions plus statuses) as plain text or PDF. Provided as decrypted output to the user's device; never transmitted unencrypted off-device.

### 9.7 Crisis support

A small, persistent, never-pushy link on the Senshin entry screens at all times: *If this is heavier than the page can hold, find someone to talk to.* Tapping opens a screen listing regional crisis support services (Samaritans UK, 988 Suicide and Crisis Lifeline US, Lifeline Australia, TELL Japan, etc), clearly framed as independent organisations not affiliated with Auwa.

No detection. No intervention. No telemetry on whether the link was tapped. Always-available door, never crisis-triggered. Auwa never decides for the user that they need help; the help is one tap away if they decide for themselves.

### 9.8 What Auwa will never do with Senshin entries

Committed verbatim in the privacy policy:

- Auwa cannot read your Senshin entries. The encryption makes this technically impossible from our side.
- Senshin entries are never used to train AI, classified by NLP, or analysed in any way on our side.
- Senshin entries are never shared with third parties for any purpose.
- If you forget your password and have no recovery key, the entries cannot be retrieved. This is the cost of true privacy.
- When you delete your account, your encrypted Senshin entries are deleted immediately. We keep nothing.

### 9.9 Free vs paid

All of Senshin is free, for everyone, with no usage cap. Entry, categorisation, emotion tagging, guidance, closure moment, Sanctuary handoff, Look Back, export, About. Mental-health-adjacent material should never be gated by subscription, both for principled reasons (the user who most needs this should not hit a paywall) and for brand reasons (the conservation commitment, the no-AI commitment, the end-to-end encryption commitment are all part of an overall positioning that depends on principled choices like this one).

### 9.10 Why this is part of the moat

The Senshin design is structurally hard to replicate by a weekend-built competitor. A Claude wrapper can copy the UI shape but cannot easily ship end-to-end encryption with proper key management, a culturally accurate framing, a thoughtful crisis link, a paper-first principle that contradicts the standard *more engagement equals more revenue* app design, and a free-forever commitment for mental-health-adjacent material. The whole feature is a series of principled choices that compound with the conservation commitment, the no-AI-generated-content commitment, and the Yamato framework. Each one alone is replicable; the combination is not.

See `context/business/business.md` Section 15 for the AI-disruption framing of why this matters strategically.

### 9.11 Implementation notes

- End-to-end encryption is the main engineering investment. Pattern is well-established; libraries include libsodium-wrappers and TweetNaCl.js. Estimated 4-6 engineering days for the secure crypto layer with appropriate testing.
- Categories stored as enum on the user's encrypted record. The *Something else* free text is also encrypted.
- Emotion stored using the same Yamato schema as the daily flow, encrypted identically.
- Look Back computation happens on-device after decryption. Server never sees the decrypted data.
- Recovery key generated on-device using a CSPRNG, presented once at signup as downloadable text with explicit acknowledgement of what losing it means.
- Crisis link list hardcoded, reviewed quarterly, localised by user's stored locale.

---

## 10. Build Stages

*Updated 27 May 2026. Compressed from the original 9-11 week phased plan to a 4-6 week stage plan ending at friends release. Public launch follows 2-3 weeks after friends release with paywall, polish, and library scale-up.*

This is the stages model rather than a feature-by-feature waterfall. Rieko's illustration work and the writing of the reflection library run continuously in parallel from week one. Most stages overlap; the calendar weeks are sequential but the work inside each one is concurrent.

The shift from traditional design flow (Figma every screen, Maze prototype, iterate, hand off to developers) compresses dramatically because the prototype IS the production app, built in the same Next.js codebase. Figma reappears in Stage 5 as a visual polish tool, not a screen-design tool.

### Stage 1 — UX alignment (this week, 2 working days)

Three-way chat through every screen: arrival, state tap, sub-expression, context, light shower, revelation, share card, archive, Kokoro view, sanctuary, the letter, sound library, signup, paywall. Agreement on interaction shape, what is placeholder for v0, what is real. Outcome: a one-page UX brief that locks the structure before the build starts.

### Stage 2 — Working prototype on auwa.life/app (1 week)

Built in Next.js inside the existing repo, extending what is already there. Placeholder character variants (simple silhouettes) where Rieko's batch is not ready. Placeholder reflection library at ~50 entries (Tom and Claude write the first batch in 2-3 hours, in Rieko's voice direction). Real Claude Haiku classification, real share card generation, real Kokoro composition logic, base sanctuary surface live. PWA installable on phones. Vercel preview URL on every commit. Tom and Rieko use it daily and feed notes back.

### Stage 3 — Structural iteration (1 week)

Iterate on the flow until it feels right. Timing on the light shower, button wording, sub-expression refinement gesture, sanctuary entry, the letter surface. Test with 3-5 friends-release testers who do not know the spec. Set a hard end-date for the stage so we do not iterate forever. Outcome: structural UX locked.

### Stage 4 — Rieko's first illustration batch (parallel with Stages 2-3, 2-3 weeks)

Five character variants for the five Yamato states first (the load-bearing assets). Then 8-10 personalisation motifs to test the layering system. The variants land in the prototype as Rieko finishes them. The prototype starts looking like Auwa instead of a stock UI.

### Stage 5 — Visual polish loop (1 week)

For each core screen, Tom screenshots the prototype, polishes in Figma (typography, spacing, motion notes, illustration positioning, micro-interactions), drops the PNG in a shared folder. Claude updates the live component to match. Iterate per screen until pixel-matched. Figma functions as a visual brief tool, not a screen design tool. Motion is locked in this stage: light shower breathing, Kokoro emergence, sanctuary opening, share card animation, letter unfolding.

### Stage 6 — Content engine + friends release (1 week)

Reflection library scaled to ~200 entries (enough variance for daily use through the friends-release window). First four letters written. Sanctuary sound tracks generated and named. First-gift motif drawn. Sanity CMS populated. 15-25 friends invited via auwa.life/app, accounts and persistence live, share cards live, archive working. We watch organic sharing as the first real test of the growth engine.

### Stage 7 — Polish, paywall, public (2-3 weeks, after friends release)

Stripe integration, paywall flow, account management, bug fixes from friends feedback, reflection library scaled toward 500 entries, marketing site updated at auwa.life. Public launch.

### Stage 8 — Depth features (post-launch, ongoing)

Story unlocks (book segments via paid tier), Year in Kokoro digital export, the noticing motif source, the garden surface, the lantern surface, Capacitor native wrapping, printed Kokoro portrait fulfilment.

### Honest build pace (added 28 May 2026)

Pure code-generation time for the v1 build (everything Stage 2 through Stage 7) is honestly only about a week of focused engineering if I worked alone with no waits. The 3-4 week calendar estimate is realistic because most of the build work is not code generation. The actual rate-limiters in order of impact:

1. **Tom's availability for decisions.** Every screen surfaces small design questions (button placement, exact copy, animation timing, edge cases). Dozens of small decisions, each one requiring a few minutes of focused attention.
2. **Reflection library writing.** 200 entries minimum for friends release. Even at 15-20 entries per focused hour, ten to fifteen hours of authoring time distributed across the build. Front-loading this in dedicated writing sessions in week 1 is the discipline.
3. **Rieko's content delivery cadence.** First illustration batch in week 2-3; Suno track generation; copy review at each library batch. All on Rieko's clock.
4. **Senshin E2EE specifically.** The crypto code is small; the UX around it (recovery key, password reset, account migration, every edge case) is real. Three to four focused days even with AI speed.
5. **Testing and iteration on real phones.** You install, find issues, send feedback, I fix. The cycle is fast but it is multiple cycles.

Compressed pace (intensive sessions four to five days a week, batch-written content, no mid-build scope additions): **2-3 weeks to friends release**.
Sustainable pace (Tom's normal 3-4 day week with More Air running alongside): **3-4 weeks to friends release**.
Either is fine. The lever is your time, not my speed.

### App Store rollout strategy (added 28 May 2026)

The app is built as a Next.js Progressive Web App (PWA) at auwa.life/app from day one. From there, the rollout is three layers:

**Layer 1: PWA for friends release.** Installable on any phone via Safari (*Share → Add to Home Screen*) or Chrome (*Install app*). Once installed, behaves like a native app: full-screen, own icon, no browser chrome, offline capability via service worker. No app stores, no review delays, no 30% fee, instant updates via Vercel deploys. **This is the friends release vehicle.** 25 testers get the auwa.life/app link; they install on their phones; we iterate.

**Layer 2: Capacitor wrap (before public launch).** Capacitor (from the Ionic team) wraps the existing PWA into native iOS and Android shells without rewriting code. The same React components, same brand tokens, same everything. Engineering effort: 3-5 days total to add Capacitor, configure both platforms, handle native-shell specifics (status bar, splash screen, deep links, share sheet integration). This was originally scoped as Phase 5; we now pull it forward to happen after friends release but before public launch.

**Layer 3: App Store submission.**

*Apple App Store.* $99/year developer account. Review typically 24-48 hours (sometimes longer for wellness apps). Privacy nutrition labels required (our position is strong: E2EE Senshin, minimal collection, no AI on user content). Apple Sign In is required if we offer any other social sign-in (Google), so we implement it. In-app purchases for digital goods must use Apple IAP rather than Stripe; Apple takes 15-30%. We support both Stripe (web) and Apple IAP (iOS native) via a single subscription abstraction.

*Google Play Store.* $25 one-time developer fee. Review typically 1-3 days. Google Play Billing for digital goods on Android native, 15-30%. More lenient review than Apple.

**Suggested rollout timeline:**

- Stage A (weeks 1-4): PWA build to friends release. 25 testers via auwa.life/app.
- Stage B (weeks 5-6): Capacitor wrap. Add Apple IAP and Google Play Billing alongside Stripe. About a week of work.
- Stage C (weeks 6-8): Submit to both stores. Handle any review feedback. Public launch when both reviews pass. PWA stays live at auwa.life/app as a third install path.

**Total from sign-off on UX to public launch on stores: 6-8 weeks.**

### Apple review cautions for wellness apps

Worth knowing in advance so we don't get rejected and have to resubmit:

- Never claim to treat anxiety, depression, or any condition. The spec already holds this line; we just need to maintain it in App Store copy and privacy disclosures.
- The always-available crisis support link is exactly the pattern Apple looks for; lean into it.
- Subscription pricing must be clear, no countdown pressure, no dark patterns. Our soft paywall (4th revelation of the month for free users) is the right shape.
- The app must function meaningfully without forcing account creation. The continue-as-guest path handles this.
- Privacy nutrition labels must be accurate. Our position (encrypted-at-rest tier one, E2EE tier two for Senshin, no data sale, no AI training) reads strong to reviewers.

### Risks and discipline

The biggest risk is content quality. The reflection library and the five character variants are the load-bearing pieces of the whole product. Rieko on character variants from week one. Tom and Claude on reflection writing from week one, before the build asks for it.

The second risk is over-iteration on the prototype. Hold the line: structural lock at end of Stage 3, no flow changes after that point. Polish lands on top of a locked structure, not into a moving one.

The third risk is scope creep. Every two weeks one of us will be tempted to add something. The Finch review (Section 16) is the standing reminder to hold the line on v1. Garden, lantern, breathing companionship, story unlocks all wait for Phase 4 and beyond.

### The FigJam as visual source of truth

The flow architecture is documented in two places that must stay in sync: this markdown spec (`context/pillar/app.md`) for textual canon, and the Auwa-App FigJam (file key `bsT5waEFwTkrjZVDjjonCs`, in the More Air → Auwa project) for visual canon. The FigJam contains two diagrams: *v1 Detailed User Flow* (everything Stage 2-7 will build) and *v2+ Roadmap* (deferred items grouped by phase plus explicitly-removed decisions). When the spec changes, the FigJam updates via the Figma MCP tools. See `context/tooling/figma.md` for the working details.

---

## 11. Design Principles

- **Dark by default.** App lives in cosmic dark. Light comes from Auwa's revealing.
- **Serif for content, sans-serif for chrome.** Reflection text and headings in EB Garamond. UI labels and buttons in Instrument Sans.
- **Minimal UI during the experience.** No navigation, no menus, no footer during input, shower, or revelation.
- **The orb is Auwa's presence before the character appears.** Constant subtle anchor.
- **Space over density.** Ma (間), the breath between elements. Every screen has room.
- **No loading spinners.** The light shower covers all API latency. If the API is slow, the shower extends elegantly.
- **The user controls the moment.** No timers on the revelation. The user decides when it ends with a tap.

---

## 12. Fonts

- **EB Garamond** — Serif display. Headlines and reflection text.
- **Instrument Sans** — Sans-serif. UI labels, buttons, captions.
- **Noto Sans JP / Noto Serif JP** — Japanese sub-expression labels where shown.

---

## 13. Colour System

OKLCH-based, extending the brand tokens already locked in globals.css. Five gradient families mapped to the Yamato states:

- **Hare (Radiant):** Warm gold → amber → soft peach
- **Takaburi (Intense):** Deep crimson → burnt orange → dark rust
- **Aware (Reflective):** Cool indigo → steel blue → soft grey-blue
- **Yuragi (Unsettled):** Amber → ochre → bronze
- **Nagomi (Serene):** Sage → warm olive → soft earth

Each gradient has 3 stops, defined as CSS custom properties.

---

## 14. What the User Never Sees

- The number 72 (micro-seasons live in the journal, never surfaced in the app)
- Sub-expression taxonomy as a system (they tap one, they don't see all 30)
- A Yamato word presented as a primary label without its English meaning beside or beneath it (English-primary rule, Section 4)
- Streaks, badges, points, completion meters
- Push notifications (unless explicitly opted in)
- Advice, "try this", coping strategies
- Clinical language (anxiety, depression, therapy)
- The motif sources labelled as such (no "seasonal" / "emotional weather" labels)
- A "collect them all" screen
- Other users' Kokoros, anywhere, ever
- Their progress as a number
- Senshin entries on any surface other than their own private archive (never on share cards, never on social, never on any user's screen but the author's)

---

## 15. What's Out of Scope (For Clarity)

- 72 micro-seasons rendered on any app surface. They power the seasonal motifs invisibly, but never appear as a kanji stamp, a calendar, or named text. Seasonal content lives in the journal and on IG.
- Real-time AI-generated reflection text. Rieko-authored library only.
- Hand-painted custom figures per user. Print product yes, hand-painted figures no.
- Live community, friend-comparison, leaderboards.
- Push notifications by default.
- Customisable wardrobe or cosmetic shop for the Kokoro.
- Text input as the primary input modality. Tap is the default; "something else" is the only text field, and it's optional context only.
- Seasonal motifs in the Firefly Trove (deferred to v2 or v3). Considered and documented (see Section 8.5): the alternative would be petals in spring, fireflies in summer, leaves in autumn, snowflakes in winter, all held together in the trove across a year. Decided against for v1 in favour of fireflies year-round because (a) the dark cosmic palette only works with one motif, (b) ownability is higher with a single visual territory, (c) the conservation commitment is clean around one species, and (d) the permanence of captured fireflies is itself a *mono no aware* reading. Kept on the table as a future direction should we want to add variety later.

---

## 16. Lessons from the Finch App

Notes from a screen-by-screen review of Finch (May 2026), with explicit positions on what Auwa should learn, deliberately avoid, and refine in its own spec. Finch is the dominant product in the cute-mascot-plus-self-care space (2M daily users, $30M ARR, 4.95 across 550K+ reviews, no VC funding, four years post-launch). It is the natural comparison for any character-centred awareness app, including ours. Worth being unsentimental about what is and isn't transferable.

### 16.1 Where Finch began

Finch launched on 12 May 2021, the ninth attempt by founders Stephanie Yuan and Thomas Aquinas Nugraha Budi. The original concept was darker: the bird faced daily survival obstacles (eagles, ghosts, storms) and the user's self-care kept it alive. Tested poorly with mental-health-fragile users. They pivoted before launch to "your bird grows as you show up for yourself" and removed the death mechanic entirely. Year one was incremental: community on Facebook from June 2021, the addition of immortal birds, a Plus subscription added voluntarily even though core content stayed free. By year four they had accumulated roughly 30 distinct features across seven tabs.

The lesson is structural and worth repeating: a small, honest, complete v1 plus four years of careful additions is what built Finch's audience. They did not launch with a Swiss Army knife. Auwa should not either.

### 16.2 The structural difference: Finch is guided, Auwa is revealed

The cleanest articulation of why Auwa cannot just be a more elegant Finch is the difference between *guided* and *revealed*. Finch's Self-Care and Quests tabs are full of guided audio sessions (Guided Calm, Guided Connection, Guided Gratitude, each with a stack of micro-practices) and goal-completion mechanics (brush teeth, drink water, make your bed). The app tells the user what to do next. Auwa names what is already there. Both are valid stances. They produce different apps, attract different audiences, and live on different rails.

The implication: Auwa should not build a guided-audio library, a goal-completion engine, or a self-care areas surface. Sanctuary is the only sound-and-atmosphere surface Auwa needs, and it is intentionally ambient, not instructional. We do not produce content that tells the user how to feel or what to do.

### 16.3 What the Finch onboarding revealed

The full Finch onboarding runs to roughly 18-22 screens before the user reaches the home view. Egg select, hatch, pronouns, name, trait pick, then a gamified trait reward (Tomuchan gained +3.2 Compassion), a notification preview, an age and gender block, a prior-use question, an energy and activity block, a mental-health questionnaire (Bipolar, Depression, Anxiety, ADHD, PTSD, OCD), a support-network adequacy probe, a support-areas selector, a source-attribution tile (TikTok, Instagram, friends, podcast), a trial offer with a 48-hour countdown, a Plus pitch, a first-gift moment (items already in the user's bag), a first-day "1 day streak" milestone, a goal commitment, and a home-screen widget prompt.

Two things to absorb from this. First, Finch front-loads ownership to an almost extreme degree, and it works: by the time the user reaches the home view, the bird is theirs in fifteen distinct ways. Second, much of what Finch asks (mental health conditions, age, gender, sleep hours) Auwa should never ask. The signup data Finch collects is appropriate for an app that positions as therapy-adjacent. Auwa is not therapy-adjacent and the questions would change the brand.

### 16.4 The Quests tab validates Auwa's input architecture

Inside Finch's Quests tab is an emotion-tracking flow that is structurally almost identical to Auwa's planned daily flow: pause and notice what you're feeling, tap a category (Pleasant / Neutral / Unpleasant), refine with a sub-expression (Content, Fulfilled, Joyful, Calm, Mellow, Relieved), tag the context, optional free text. The architectural pattern is the same one we landed on independently. The difference is everything else: their vocabulary is everyday English, ours is Yamato; their result feeds a streak counter, ours feeds the Kokoro and the archive.

Two implications. The input architecture (tap-refine-tag) is well-validated, which is good. And because the input shape is familiar to anyone who has used Finch, Auwa's job is not to invent a different input. It is to make the same input feel like a different *kind* of practice on the other side of it. The vocabulary, the character, the reflection text, the gradient, the share card all have to do that work.

### 16.5 What to learn

1. **Slow accretion beats a feature-rich v1.** Finch shipped small and added four years of depth. Auwa follows the same pattern. v1 ships revelation, archive, share card, sanctuary, light shower. Mood tracking, store integration, breathing exercises, journaling and similar layer one or two per quarter as the audience grows.

2. **The pet-leaves-house mechanic is gold.** Finch's home screen leads with "Tomuchan is growing up in 41m" and "Bonus adventures started!", giving the user a reason to return that is engineered into the curiosity layer rather than the guilt layer. Auwa's equivalent is more ambient: *while you were away, your Kokoro carried Aware for a moment*, surfaced softly when the user returns. Not a countdown. A small thing noticed for them. Worth scoping for Phase 3.

3. **Onboarding personalisation is the highest-leverage UX.** Finch invests 18-22 screens. Auwa should not match the length, but the principle (every onboarding screen layers ownership) is solid. Target 5-7 screens that each do one investment job.

4. **Auto-suggest with shuffle.** Where Auwa has a text field, pre-fill it and offer a shuffle. The "Pickles" pattern Finch uses for naming is friction-elimination at its best.

5. **Inclusive design as signal.** Pronoun selection at signup is a credibility tell for Finch's audience. Auwa makes equivalent quiet signals through copy that avoids gendered defaults, lifestyle assumptions, and Western-default cultural references where avoidable.

6. **The Plus tier earns voluntary support.** Finch Plus is around $40/year. The free tier is genuinely complete and people upgrade to support the team. Auwa's £6.99/month with a complete free tier can work the same way. The "Become a Guardian" feature (users sponsoring other users' Plus) is a clever extension worth filing for Year 2.

7. **Pause mode as a stance.** Finch's Pause mode ("take a break and preserve your progress") is buried in settings. Auwa is built this way by default. Worth naming once in marketing copy: *Nothing to keep up with. Nothing to fall behind on.*

8. **Source attribution at signup.** "How did you hear about us?" as a tile selector is cheap to add and produces genuinely useful growth data. Place it after the first revelation, not before, so it doesn't feel transactional.

9. **Day-zero gift.** Finch's "Look what's already here!" moment puts items in the user's bag before they have done anything. Auwa's softer version: one motif on the Kokoro the user did not pick, noticed for them by Auwa. See Section 16.7 for the brief refinement.

10. **A home-screen widget.** A widget showing the user's current Kokoro on their phone home screen is ambient presence without notification. On-brand. The most natural retention surface we have. Scope for Phase 4 or 5.

### 16.6 What to deliberately avoid

1. **The bright pastel aesthetic.** Finch's brand, not ours. Audience overlap is partial. Auwa is editorial-dark and contemplative.

2. **The in-app currency economy.** Rainbow stones, virtual shops, paid outfits, microtransactions. Tamagotchi-grade gamification we have explicitly opted out of.

3. **The completion-based goal loop.** Finch users brush teeth, complete it, get stones. Auwa has no user goals to complete. Don't drift here under pressure.

4. **The infantilising tone.** "Baby birb", "your birb's pronouns", "Tomuchan cares about". Correct for Finch, lethal for Auwa. Our copy is quietly literary, never cute.

5. **The breadth in v1.** Don't try to ship mood tracker plus journaling plus breathing plus soundscapes in v1. That is three years of Finch's work compressed.

6. **Pokédex-style collection counters.** Profile screens like "Food 1/122" and "Locations 1/7" are pure completionism. Auwa's Kokoro accumulation never shows a number or a total.

7. **The mental-health questionnaire at signup.** Finch asks explicitly about Bipolar, Depression, Anxiety, ADHD, PTSD, OCD. This positions the app as therapy-adjacent and pulls them into a regulatory zone that has burned competitors (Replika, Woebot). Auwa never asks. We are awareness, not screening.

8. **The friends layer.** Visit their birdhouse, see their progress, send good vibes. Soft social comparison is still social comparison. Auwa's only sharing surface is the public share card (Section 5.10), never a friend graph, leaderboard, or visit-their-place flow.

9. **Guided audio content.** Finch's Calm, Connection, and Gratitude libraries are well done but they are *guided*, not *revelatory*. Sanctuary is Auwa's only sound-and-atmosphere surface, and it is deliberately ambient. We do not build a meditation library.

10. **The trial countdown.** Aggressive offer pressure at signup (48-hour countdowns, percentage-off banners) works for Finch but would feel wrong on Auwa. The subscription pitch is calm, single-screen, no countdown, no urgency. The free tier is genuinely complete; the upgrade is for depth.

### 16.7 Refinements to the illustration brief

Two refinements after seeing the full Finch onboarding, both small.

**First-gift motif as a celebrated beat.** Updated 28 May 2026 after re-reviewing Finch's day-zero gift moment in detail. The original spec had this as a quiet annotation on the personalisation step; the revised version makes it a proper full-screen atmospheric beat (now step 4 of onboarding in Section 2.1). The Kokoro from personalisation sits centred against a soft gradient; the orb of Auwa pulses above; a reserved motif arrives from above, drifts down, settles on the Kokoro; the line *Auwa noticed something else in you* appears below. Five seconds, ambient track underneath, no chrome.

The total illustration ask is one additional motif beyond the personalisation set (so 16-21 total instead of 15-20), with the visual handling of the *arrival* of the motif being motion design rather than a separate asset. Half a day of Rieko's time for the extra motif; the motion is mine to build. The effect is to land the front-loaded ownership as a moment the user remembers, rather than as a small detail they may or may not notice. It also seeds the long-running narrative that Auwa notices things for the user, which is the same logic that justifies the "while you were away" pull (Section 16.5, item 2).

**Trait micro-layer.** Finch's six traits (Curiosity, Resilience, Compassion, Logic, Confidence, Security) are picked at signup and accumulate when goals are completed. Auwa should not do trait accumulation. But a single "what does your Kokoro carry" tap at signup, with three or four warm qualities (for example Quiet, Curious, Steadfast, Open), would deepen the ownership beyond motif selection. The pick affects nothing mechanically. It surfaces once, in the archive, six months in: *Your Kokoro has carried Quiet for half a year. That has shaped what it sees.* Worth raising with Rieko in the next creative session as a small addition to the brief.

### 16.8 The blunt summary

Finch's v1 was a hatching bird, a daily goals list, basic journaling, and Plus subscription. Everything else accreted over four years. The breadth is staggering and almost all of it is built on top of one mechanic (care-for-the-pet) borrowed from Tamagotchi.

Auwa cannot and should not replicate the breadth or the mechanic. The eight Auwa pulls (Section 7) replace one strong pull with a stack of gentler ones. The compound effect is what we are betting on. The full Finch review makes clear how much harder Auwa is choosing to make its job, and also why the bet is worth taking: Finch's audience exists because Tamagotchi's mechanic works; Auwa's audience exists because that mechanic has run its course for the people who are tired of being optimised at.

What we have to get right has not changed. The reflection library quality, the five character variants, the share card composition, the daily loop being honest about its smallness, and now also sanctuary as a place worth returning to. The Finch review reinforces the spec rather than reshaping it.

---

*Confidential. Auwa Limited. All rights reserved.*
