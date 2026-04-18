# Kokoro Mirror — App Specification

*Created: April 2026. The build reference for the Kokoro Mirror app at auwa.life.*
*Load when working on app design, development, or UX decisions.*

---

## 1. What the App Is

A daily awareness practice disguised as a beautiful emotional experience. User shares how they feel in natural language, AUWA's AI identifies their kokoro and reflects it back poetically alongside the AUWA character, a light shower animation, and a calligraphic micro-season stamp. Kokoro (心) is holistic: it holds emotion, thought, and spirit as a single undivided whole, located in the chest and gut rather than the head. The app honours this by asking how you *feel*, not what you *think*. The result is saved to a visual archive and optionally journaled and shared.

Five minutes. Once a day (or whenever you need it). No streaks, no badges, no push notifications. AUWA is pull, not push.

**The AI reflection quality is the product.** Everything else — design, animation, archive, shareable cards — supports that single moment when AUWA says something that makes you pause.

---

## 2. Core User Flow

### 2.1 First Visit (No Account)

1. **Arrival** — Dark, calm screen. Soft ambient glow. The AUWA orb pulses gently at centre. A single prompt: "How are you feeling right now?" No signup wall. No onboarding carousel. No explanations. Just the question.

2. **Input** — User types freely (up to 200 words). Minimal UI: just the text area and the pulsing orb above. No character selector, no mood wheel, no category picker. Natural language is the interface.

3. **Light Shower** — User submits. The orb brightens. Aurora-coloured light cascades across the screen (3-5 seconds). Subtle atmospheric audio. This is the transition from the user's world into AUWA's world — a deliberate pause before the revelation.

4. **Kokoro Revelation** — The hero screen. Four visual elements compose together:
   - **Gradient background** — one of 5 colour families mapped to the Yamato emotional states (Radiant: warm gold/amber, Intense: deep red/crimson, Reflective: cool blue/indigo, Unsettled: shifting violet/grey, Serene: soft green/sage)
   - **AUWA character variant** — hand-illustrated versions by Rieko, each expressing the detected emotional state
   - **Calligraphic kō stamp** — the current micro-season, rendered as a subtle atmospheric element (tappable for the curious — reveals the season name and its meaning)
   - **AI-generated poetic reflection** — 2-4 sentences. The core product. See Section 4 for reflection principles.

5. **Post-Revelation Options** (all optional, none forced):
   - **Journal** — If user's input was rich, AUWA pre-populates a suggested journal entry. One tap to save. If sparse, open prompt: "Would you like to add a few words about today?"
   - **Share** — Generate a shareable kokoro card (9:16 for Stories, 1:1 for feed). The card contains: gradient background, AUWA character, the reflection text, the kō stamp, and subtle AUWA branding. Journal content is never included on shareable cards.
   - **Save** — Auto-saved to Kokoro Archive regardless of other choices.

6. **Signup Prompt** — After experiencing the full flow once, gentle prompt: "Create an account to keep your kokoro safe." Email + password or social auth. Never before the first experience.

### 2.2 Returning User (Logged In)

1. **Arrival** — Same calm screen, but AUWA remembers: "Your last visit, you carried [Aware — Mono no Aware]." Displayed softly, not as a clinical reminder.

2. **Flow** — Same as above: input → light shower → revelation → journal → share → save.

3. **Kokoro Archive** — Accessible from main navigation. Visual timeline of all past revelations as coloured cards (5 emotional state colours). Tap any card to expand: full revelation, journal entry, date. After 10+ revelations, simple observations surface: "You've visited AUWA 12 times. Reflective states have been most present. The last 3 visits shifted toward Serene." Observations, not advice. Noticing, not prescribing.

### 2.3 Free vs Paid

**Free tier (no account required for first use, account required to save):**
- 3 revelations per month
- Basic archive (list view)
- Journal

**Paid tier (£6.99/month or £49.99/year):**
- Unlimited revelations
- Full Kokoro Archive with pattern insights
- Shareable kokoro cards (premium designs)
- Story unlocks (narrative segments from AUWA's series of illustrated stories)
- Early access to figure drops
- Year in Kokoro review (annual)

**Paywall philosophy:** Free tier gives you enough to feel the value. Paid unlocks depth, not access. The first experience is always free, always complete, always beautiful.

---

## 3. Handling Vague Input

Most emotional input will be vague ("I feel crap," "not great," "meh," "tired"). This is the hardest UX challenge and the most important one to get right.

**Approach:** AUWA doesn't ask the user to pick from a menu. Instead, AUWA acknowledges the vagueness and offers a gentle refinement — poetic, not clinical:

> "I hear you. Is this the weight of something lost, something blocked, or something you've been carrying too long?"

The user taps one of 2-3 poetic options. AUWA uses their choice to refine the emotional classification and generate a more precise reflection. The act of choosing IS emotional self-perception — the foundation of awareness.

If the user doesn't want to refine (dismisses or says "I don't know"), AUWA proceeds with a gentler, more open reflection. Never forces precision. Never makes the user feel they've done it wrong.

---

## 4. AI Reflection Principles

The reflection is the product. Everything else serves it.

### Voice
- AUWA speaks as a being, not a bot. Gentle, observant, slightly cosmic. Never clinical, never cheerful, never prescriptive.
- Short: 2-4 sentences maximum. Poetic but not purple. Every word earns its place.
- Reflects what the user shared — never adds assumptions, advice, or "have you tried..."
- Uses natural metaphors drawn from seasons, nature, light, water, sky. Never forced.

### What AUWA never does
- Gives advice ("Try taking a walk")
- Diagnoses ("This sounds like anxiety")
- Reframes ("Look on the bright side")
- Questions therapeutically ("Why do you think that is?")
- Forces micro-season references into the text
- Uses emoji, exclamation marks, or false warmth

### What AUWA always does
- Names the feeling precisely (using the Yamato emotional framework internally)
- Reflects it back in a way that makes the user feel seen
- Connects the emotion to something natural (not forced, but present)
- Leaves space — the reflection ends, and the user sits with it

### The Yamato Emotional Framework (Ha-Ta-A-Yu-Wa)

Rieko's proprietary framework based on ancient Yamato language (大和言葉). Five core emotional states, each containing nuanced sub-expressions described through poetic Japanese words. Replaces the earlier Kido Airaku (4-emotion) framework with something richer, more nuanced, and uniquely AUWA's own. Users never see the taxonomy — they feel the precision.

**晴 Hare (Radiant)** — Positive, high energy. Affirmation of self and situation, with outward-facing energy.
- 晴れやか Hareyaka (Clear) — A clear and unclouded mind, free from any psychological obstruction
- 心躍る Kokoro-odoru (Exhilarated) — Heart pounding with anticipation and excitement
- 誇らしい Hokorashii (Proud) — Affirmation of one's own existence and achievements
- ありがたい Arigatai (Grateful) — Appreciation for life and the blessings received

**昂 Takaburi (Intense)** — Negative, high energy. Energy arising from strong conflict, rejection, or friction with others.
- 憤り Ikidoori (Indignant) — Strong resistance against injustice or unreasonableness
- 燻る Kusuburu (Smoldering) — Unresolved frustration burning continuously within
- 妬ましい Netamashii (Envious) — Desiring what others have and feeling one's own lack
- 疎ましい Utomashii (Averse) — Physiological disgust and the urge to distance oneself
- 荒ぶる Araburu (Turbulent) — Violently fluctuating emotions that are difficult to control
- いとわしい Itowashii (Disagreeable) — Finding something detestable and wanting to keep away
- もどかしい Modokashii (Frustrated) — Irritation and impatience when things do not go as desired

**哀 Aware (Reflective)** — Negative, low energy. Sense of loss, resonance, and deep inward reflection.
- 切ない Setsunai (Poignant) — A heart-wrenching, unbearable sorrow
- 情けない Nasakenai (Ashamed) — Feeling shame and disgust at one's own inadequacy
- やるせない Yarusenai (Helpless) — A sunken feeling of having no way to resolve one's heavy thoughts
- 儚い Hakanai (Fleeting) — A sense of impermanence and emptiness toward transient things
- しめやか Shimeyaka (Somber) — A quiet, deeply reflective sadness
- 気後れ Kiokure (Timid) — Shrinking back and losing confidence in front of others
- 後ろめたい Ushirometai (Guilty) — Feeling a sense of guilt toward others or norms

**揺 Yuragi (Unsettled)** — Anxiety, shock, the unpredictable. Vigilance toward the unknown or agitation caused by change.
- せわしない Sewashinai (Restless) — Feeling rushed and unable to settle down
- 心細い Kokorobosoi (Insecure) — Anxiety about an uncertain future with nothing to rely on
- 惑う Madou (Bewildered) — Mind scattered, unable to make a clear judgment
- おののき Ononoki (Awe-struck) — Shock and awe in the face of the unknown or overwhelming
- あっけにとられる Akke-ni-torareru (Dumbfounded) — Completely taken aback by the unexpected
- 心もとない Kokoromotonai (Uneasy) — Lacking certainty, feeling something is off
- いたたまれない Itatamarenai (Awkward) — Unbearable discomfort in the current situation

**和 Nagomi (Serene)** — Positive, low energy. Fulfilment, tranquility, release of tension.
- 和む Nagomu (Serene) — Harmonised with oneself and surroundings, all sharp edges smoothed
- 寛ぎ Kutsurogi (Relaxed) — Physical and mental tension completely released
- 健やか Sukoyaka (Centred) — Solidly aligned, with no stagnation in mind or body
- 満ち足りる Michitariru (Content) — Complete satisfaction, feeling everything is sufficient as it is
- 慈しみ Itsukushimi (Compassionate) — Deep affection and care for oneself or others
- 安らぐ Yasuragu (Relieved) — Tension suddenly lifting, enveloped in a sense of safety

### AI Memory

The system prompt includes the user's last 2-3 revelations (emotion, sub-expression, date). This allows AUWA to notice patterns without the user having to state them:

> "You've visited three times this week. Each time, Sorrow was present — but today it's shifted. There's something lighter here. Like ice beginning to thin at the edges."

Memory is observation, not therapy. Never: "Last time you were sad — are you feeling better?"

### Technical Implementation

- **Model:** Claude Haiku 4.5 as default (~£0.002/revelation). Sonnet 4.5 as quality ceiling for paid users or when input complexity warrants it (~£0.008-0.015/revelation).
- **System prompt:** Encodes AUWA's voice, Yamato emotional framework, sub-expression definitions, current micro-season (for ambient kō stamp, NOT for forcing into text), user's recent history, and strict guardrails (no advice, no diagnosis, no reframing).
- **Structured output:** AI returns JSON with: emotional_state, sub_expression, reflection_text, gradient_key, character_variant_key. The app assembles the visual revelation from these structured outputs.
- **Fallback:** If AI returns unexpected output, show a safe default reflection and log the error.

---

## 5. Key Screens

### 5.1 Home / Input
- Dark background, minimal
- Pulsing orb (centre, subtle breathing animation)
- Text input area below orb
- For returning users: soft reminder of last emotion above input
- No visible navigation during input (archive accessible after revelation or from subtle menu)

### 5.2 Light Shower
- Full-screen animation (3-5 seconds)
- Orb expands, aurora light cascades
- Subtle audio (ambient tone, optional)
- No interaction possible — this is AUWA's moment

### 5.3 Kokoro Revelation
- Gradient background fills screen
- AUWA character variant (centred or offset depending on text length)
- Calligraphic kō stamp (corner, atmospheric)
- Reflection text (below character, serif typeface)
- Action buttons at bottom: Journal / Share / Continue
- Tap kō stamp to reveal micro-season name and meaning

### 5.4 Journal
- Pre-populated suggestion (if input was rich) or open prompt
- Simple text area
- Save button
- Skip option (never guilted into journaling)

### 5.5 Shareable Card
- Preview of the card as it will appear on Instagram Stories (9:16) or feed (1:1)
- Toggle between formats
- Download to camera roll
- Direct share to Instagram Stories (via Web Share API where supported)
- Card contains: gradient, character, reflection text, kō stamp, subtle "auwa.life" branding
- Journal content NEVER appears on shareable cards

### 5.6 Kokoro Archive
- Visual grid/timeline of past revelation cards
- Colour-coded by emotional state (5 colour families)
- Tap to expand any card (full revelation, journal, date)
- Filter by emotion, date range
- Pattern observations (after 10+ revelations): simple, non-prescriptive insights
- "Year in Kokoro" annual review (paid tier, Month 6+ feature)

### 5.7 Story Unlocks
- Narrative segments from AUWA's series of illustrated stories
- Unlocked through continued engagement (5th revelation: Story 1, Chapter 1; etc.)
- Full-screen illustrated reading experience
- Paid tier only

### 5.8 Settings / Account
- Profile (name, email, password)
- Subscription management (Stripe Customer Portal)
- Notification preferences (default: off — AUWA is pull, not push)
- Data export
- Delete account

---

## 6. Technical Architecture

### 6.1 Stack

The app extends the existing teaser page at `/Users/admin/Github/auwa/website/app/` which is already:
- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS 4** (with OKLCH colour system already defined)
- **Framer Motion** (animations)
- **Resend** (email capture — already working)

Additional for the full app:
- **Claude API** (AI reflections via Anthropic SDK)
- **Vercel Postgres** (user data: accounts, check-ins, journal entries, archive)
- **Sanity CMS** (editorial content: emotion definitions, sub-expressions, micro-season data, story content, calligraphic stamp assets)
- **Stripe** (subscription billing)
- **NextAuth.js or Auth.js** (authentication: email/password + social)
- **Vercel** (hosting, edge functions, Postgres)
- **Capacitor** (native wrapping, post-launch Month 3-4)

### 6.2 Data Model

**Users table:**
- id, email, name, created_at, subscription_tier (free/paid), stripe_customer_id, last_revelation_at

**Revelations table:**
- id, user_id, created_at, user_input, emotional_state, sub_expression, reflection_text, gradient_key, character_key, micro_season_id

**Journal table:**
- id, revelation_id, user_id, content, created_at

**Micro-seasons (Sanity CMS):**
- id, name_en, name_jp, kanji, description, start_date, end_date, calligraphic_stamp_url

**Sub-expressions (Sanity CMS):**
- id, name_jp, name_en, emotional_state_parent, description

**Stories (Sanity CMS):**
- id, title, chapter, content_blocks (rich text + images), unlock_threshold (revelation count)

### 6.3 API Routes

- `POST /api/revelation` — Takes user input, calls Claude API, returns structured revelation data (emotional state, sub-expression, reflection text, gradient key, character key). Checks user's revelation count against tier limits.
- `POST /api/journal` — Saves journal entry linked to a revelation
- `GET /api/archive` — Returns user's revelation history (paginated)
- `GET /api/archive/insights` — Returns pattern observations (if 10+ revelations)
- `POST /api/signup` — Existing email capture (Resend)
- `POST /api/auth/*` — Authentication endpoints (NextAuth)
- `POST /api/stripe/checkout` — Creates Stripe checkout session
- `POST /api/stripe/webhook` — Handles Stripe subscription events
- `GET /api/share/[id]` — Generates shareable card image (og:image for social sharing)
- `GET /api/season/current` — Returns current micro-season data from Sanity

### 6.4 Key Technical Decisions

**PWA first:** Service worker for offline capability (at minimum: cache the last revelation for re-viewing). Add to Home Screen support. Web Share API for card sharing.

**Pre-designed visuals, not AI-generated images:** The character variants and 5 gradient families are pre-designed assets by Rieko, stored in the project. AI generates only text via Claude API. This keeps costs marginal and quality consistent.

**Structured AI output:** Claude returns JSON, not free text. The app assembles the visual revelation from structured data. This prevents layout-breaking responses and allows the app to independently select gradients, characters, and stamps.

**Rate limiting:** Free tier: 3 revelations/month (tracked by user_id or anonymous session). Paid tier: unlimited but soft-capped at 10/day to prevent abuse. API cost at Haiku 4.5: ~£0.002/revelation — even at scale, costs are marginal.

**Edge rendering:** Revelation pages render on the edge (Vercel Edge Functions) for speed. The light shower animation must feel instant after submission — no loading spinners.

---

## 7. Build Phases

### Phase 1: Core Flow MVP (Weeks 1-3)
Build the complete input → light shower → revelation flow. Hardcoded character images and gradients. Real Claude API integration. No accounts, no archive, no journal. Deploy to auwa.life (replacing/extending current teaser).

**Success criteria:** The flow feels beautiful and the AI reflections feel meaningful. Test with 5-10 people.

### Phase 2: Accounts + Archive + Journal (Weeks 4-5)
Add authentication (email/password). Vercel Postgres for storing revelations. Kokoro Archive (basic grid view). Journal with pre-population. Returning user memory (last 2-3 revelations in system prompt).

**Success criteria:** Users can create accounts, see their history, and AUWA remembers them.

### Phase 3: Shareable Cards + Polish (Weeks 6-7)
Card generation (9:16 + 1:1). Sharing to Instagram. Micro-season stamp integration (Sanity CMS). Vague input refinement flow. Responsive polish across devices.

**Success criteria:** Users share cards on Instagram without being asked to.

### Phase 4: Payments + Launch (Weeks 8-9)
Stripe integration. Free/paid tier gating. Soft launch to waitlist. Monitor first real users.

**Success criteria:** Paid conversions happen. Completion rate >60%.

### Phase 5: Depth Features (Post-Launch)
Story unlocks. Year in Kokoro. Pattern insights. Activity correlation. Morning/evening toggle. Capacitor native wrapping.

---

## 8. Design Principles

- **Dark by default.** The app lives in darkness. Light comes from AUWA. This isn't aesthetic preference — it's philosophy: the kokoro is revealed from darkness into light.
- **Serif for AUWA's voice, sans-serif for UI.** The reflection text uses the brand serif (Cormorant or similar). Navigation, buttons, input fields use the functional sans-serif (Instrument Sans).
- **Minimal UI during the experience.** When the user is typing, when the light shower plays, when the revelation appears — no visible navigation, no hamburger menus, no footer. Just the moment. UI chrome appears after the moment passes.
- **The orb is the anchor.** The pulsing orb is the only constant through the flow. It's the first thing you see, it transforms during the light shower, and it reappears subtly in the archive. It's AUWA's presence before the character appears.
- **Space over density.** Every screen should feel like it has room to breathe. Large margins. Generous line-height on reflection text. White space (or rather, dark space) is not waste — it's the ma (間) that gives the content meaning.
- **No skeleton screens or loading spinners.** The light shower IS the loading state. Design the animation to cover the API call time gracefully. If the API is slow, the light shower extends elegantly.

---

## 9. Fonts (Already Established)

From the existing teaser page:
- **Cormorant** — Serif display. Used for AUWA wordmark, headline text, reflection text. Elegant, ancient-feeling, readable at small sizes.
- **Instrument Sans** — Functional sans-serif. Used for UI elements, buttons, body text, navigation.
- **Noto Sans JP** — Japanese text support.

---

## 10. Colour System (Already Established)

The teaser page uses OKLCH colour space. Extend with 5 gradient families mapped to the Yamato emotional states:

- **Hare (Radiant):** Warm gold → amber → soft peach
- **Takaburi (Intense):** Deep crimson → burnt orange → dark rust
- **Aware (Reflective):** Cool indigo → steel blue → soft grey-blue
- **Yuragi (Unsettled):** Shifting violet → muted grey → cool lavender
- **Nagomi (Serene):** Sage green → warm olive → soft earth

Each gradient family has 3-4 stops for the revelation background. The specific values should be designed in Figma and exported as CSS custom properties.

---

## 11. What the User Never Sees

- The number 72 (micro-seasons)
- Micro-season names forced into AI reflections
- Sub-expression taxonomy or labels
- The emotional framework as a visible system (they feel the emotions through colour and character, they don't study a taxonomy)
- Advice, coping strategies, or "try this" suggestions
- Streaks, badges, points, gamification of any kind
- Push notifications (unless explicitly opted in, and even then: rare)
- Clinical language (CBT, anxiety, depression, diagnosis)

---

## 12. FigJam Flow Reference

Recommended structure for mapping the full UX flow in FigJam:

**Swim lanes (left to right):**
1. New User (Anonymous) → First Experience → Signup Prompt → Account Creation
2. Free User (Logged In) → Daily Flow → 3/month Limit → Upgrade Prompt
3. Paid User → Full Flow with Archive + Journal + Stories + Cards
4. Edge Cases → Vague Input Refinement, Error States, Offline, Returning After Long Absence

**Key decision points to map:**
- First visit vs returning visit
- Vague input → refinement flow vs clear input → direct revelation
- Journal: pre-populated vs open prompt vs skip
- Share: Stories format vs feed format vs skip
- Free tier limit reached → upgrade prompt
- Story unlock thresholds

---

## 13. Prototype Strategy

Skip Lovable. The existing teaser page (Next.js 16 + Tailwind 4 + Framer Motion) is already the foundation. Build the prototype as a new route within the same project, extending the existing design system. This means prototype → production is evolution, not migration.

**Prototype scope:** Input screen → light shower animation → static revelation screen (hardcoded emotion, hardcoded reflection text, real character image, real gradient). No AI, no accounts, no database. Just the feel.

**Then iterate:** Add Claude API → add vague input handling → add accounts → add archive → add journal → add payments → add sharing.

Each step is a deployable, testable increment on Vercel.

---

*Confidential. AUWA Limited. All rights reserved.*
