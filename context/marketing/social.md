# Auwa Social

*Last updated: 23 April 2026*

The full status of Auwa's social media footprint after consolidation from the early account grab phase. All handles, logins, and current state in one place.

---

## HANDLE CONVENTION

One brand name, three handle variants by necessity:

- `@auwalife` — default across almost all platforms
- `@auwa.life` — used on platforms where dots are permitted and match the domain (TikTok, Bluesky)
- `@auwa` — pure brand name, used only where already owned (LinkedIn)

The variants exist because no single handle is available everywhere. All read as "Auwa" at a glance, so brand consistency holds.

---

## LIVE ACCOUNTS

| Platform | Handle | Login / Email | Notes |
|---|---|---|---|
| Instagram | @auwalife | social@auwa.life | Inside Auwa Limited Meta portfolio. |
| Facebook | @auwalife | social@auwa.life | Inside Auwa Limited Meta portfolio. |
| Threads | @auwalife | social@auwa.life | Inside Auwa Limited Meta portfolio. |
| YouTube | @auwalife | auwa.world@gmail.com → forwards to social@auwa.life | Brand Account. Tom + Rieko managers. |
| LinkedIn | @auwa | Via Tom's LinkedIn | Pre-existing, left as pure brand name. |
| Bluesky | @auwa.life | social@auwa.life | Domain-verified via DNS. |
| Pinterest | @auwalife | social@auwa.life | Business account. |
| Discord | @auwalife | social@auwa.life | |
| Twitch | @auwalife | social@auwa.life | |
| Reddit (user) | u/auwalife | social@auwa.life | |
| Reddit (subreddit) | r/auwalife | — | Restricted. Parked for future community. |
| Medium | @auwa | social@auwa.life | First article published: Yaoyorozu no Kami. |
| Spotify (Creators) | Auwa | social@auwa.life | Verified. Awaiting first episode upload. |

---

## PENDING EMAIL VERIFICATION

All verifications pointing to social@auwa.life. Expected delays relate to today's DNS changes propagating.

| Platform | Handle | Waiting on |
|---|---|---|
| TikTok | @auwa.life | Email change verification |
| X | @auwalife | Email change verification |
| Substack | @auwalife | Signup verification |

If any haven't arrived by tomorrow morning, check: Resend dashboard for bounce/deferred logs, spam folder in social@auwa.life, and whether DMARC is silently dropping.

---

## DELIBERATELY SKIPPED

- **GitHub** — no open-source plans. Revisit if the app or design system ever goes public.
- **Mastodon, Snapchat, WhatsApp Business, Telegram** — audience-irrelevant.

---

## OPTIONAL, WORTH GRABBING LATER

- **Apple Podcasts** — follows automatically once Spotify publishes (same RSS feed, 24–72h Apple review).
- **Vimeo** — useful if longer-form video ever happens (brand film, craftsman documentaries).
- **Are.na** — small but culturally relevant audience (designers, writers, the Kinfolk-adjacent crowd).

---

## OUTSTANDING NEXT STEPS

1. **Spotify first episode.** Record 60-second placeholder (phone mic fine). Upload via Spotify for Creators. Once live, set custom URL slug to `auwalife` under Settings → Public profile. Then submit RSS feed to Apple Podcasts at podcastsconnect.apple.com.
2. **Medium article two.** Import a second strong journal article via medium.com/p/import. Confirm canonical URL auto-set to auwa.life. Add 5 tags, publish.
3. **Pinterest Rich Pins.** Enable domain verification and Rich Pins in Pinterest settings. Takes one DNS TXT record plus meta tags on auwa.life article pages.
4. **DMARC monitoring.** Currently `p=none`. Add `rua=mailto:dmarc@auwa.life` to the DMARC record and monitor via a free tool (Postmark, dmarcian) for 4–6 weeks, then tighten to `p=quarantine` and eventually `p=reject`.
5. **Reddit subreddit content.** Once Auwa has an active audience, open r/auwalife from Restricted to Public and seed the sidebar with links to auwa.life and the app.

---

## PLATFORM-SPECIFIC NOTES

**YouTube.** The Gmail (auwa.world@gmail.com) is credential-only. All notifications forward to social@auwa.life via a Gmail filter on `noreply@youtube.com OR notify@youtube.com OR no-reply@youtube.com`. Both Tom and Rieko are managers on the Brand Account.

**Facebook / Meta.** The Auwa Page and Instagram account both sit inside the Auwa Limited business portfolio in Meta Business Suite. This is the correct structure for running ads, adding the pixel, and (eventually) connecting a product catalog for the store.

**Bluesky.** The `@auwa.life` handle is domain-verified via DNS, which means it displays in the app as the verified domain rather than a bsky.social subdomain. Nicest-looking handle anywhere.

**TikTok.** Kept `@auwa.life` because `@auwalife` was taken. Reads fine on TikTok — dots are the platform norm there.

**LinkedIn.** Uses `@auwa` (pure brand name) because it was available. Don't downgrade to `@auwalife` for consistency — owning the pure name on one platform is a win.

**Medium.** Canonical URLs auto-set by the Import tool, so articles republished there point Google back to the auwa.life original. Treat Medium as passive syndication, not an active channel. Import 2–4 best articles per year, don't write natively there.

**Reddit.** The subreddit `r/auwalife` is held on Restricted (public can view, only approved users post). Keeps it quiet until there's a real community to open up to.
