# Auwa Store — Build Brief

*Created 12 August 2026. The spec for the Auwa store, starting with a single product page for the figure. **Load this together with `context/website/website.md` + `context/website/patterns.md` + `context/brand/brand.md`** (the same set a "website session" loads), plus `context/business/business.md` §6.2 and §6.2a for product and collab context.*

*Shortcut phrases that should load this file: "store session", "store build", "product page", "figure page", "shopify".*

---

## WHO YOU NEED TO BE FOR THIS SESSION

Two things at once, and the second one is easy to skip and shouldn't be.

**An exceptional web designer and front-end developer** working inside an existing, award-recognised system. auwa.life won an Awwwards Honorable Mention. Do not invent new patterns. Read `patterns.md` and reuse the existing primitives (`FadeIn`, `TextReveal`, `StripReveal`, `ImageFade`, `HeaderTone`, `PageTransition`, `CtaLink`, `SignupForm`, the type scale, the motion tokens, the content widths). If you find yourself writing a bespoke component, first check whether one already exists. Match the existing comment density and idiom in `src/app/store/page.tsx` and `src/app/book/page.tsx`.

**An expert in the art-toy and designer-figure market**, because this is not a generic e-commerce page and the buyer is specific. Section "The buyer and the market" below is your grounding. If Tom proposes something that would read wrong to that buyer, say so.

Tom's working style, from `context/app/app.md` and still accurate: show, don't ask. He responds to screenshots far faster than to descriptions. Be confident with design judgements and don't hedge. When he pushes back, redirect immediately rather than re-explaining. Use the preview tools and put images in front of him.

---

## WHAT WE ARE BUILDING

A product page for the first Auwa figure edition, built as a **demo page first** (a separate route, not linked in nav), populated with real content as the figure is finished and photographed, and then **permanently replacing the current `/store` page**, which is currently a signup-only teaser (`src/app/store/page.tsx`, 83 lines).

**Phase 1 (this build):** one product, the figure, with two colourways (light and dark) and possibly a base/stand variant. Buyable.
**Phase 2 (soon after):** the books added.
**Phase 3 (later):** art prints, paper goods, and collab editions.

It must look outstanding with **one product on it**. That is the hard part and the whole design problem. A store that only looks good once it has twelve products is a failed design here.

---

## DECISIONS ALREADY MADE — DO NOT RELITIGATE

These were settled across a long strategy session on 5 and 12 August 2026. Reopening them wastes Tom's time.

- **Shopify** is the commerce backend. Not Stripe, not Big Cartel, not WooCommerce. Chosen because the shop will run mixed VAT rates (books zero-rated, everything else 20%), because More Air is VAT registered so VAT applies from the first sale, and because inventory that decrements atomically matters on a numbered limited edition. Reasoning in `business.md` §6.2.
- **The front end is ours, not Shopify's.** The page is built in Next.js on auwa.life inside the existing design system. No Shopify theme. The only visible seam is the checkout handoff.
- **Shopify Buy Button for phase 1, not the Storefront API.** One product does not justify managing cart state. Buy Button is a script, half a day, far less to break. Structure the code so the Storefront API can replace it later without a rewrite (see "Technical approach").
- **Navigation continuity is non-negotiable.** Header, footer, type, motion, cursor and page transitions all continue. Someone deciding whether to spend £150 must not feel they have left the site.
- **`auwa.store` 301s to `auwa.life/store`.** The store does not live on a separate root domain. Shopify's own primary domain should be a subdomain of auwa.life (for example `store.auwa.life`) so the checkout URL stays on the brand's domain rather than jumping to myshopify.com. It cannot be `auwa.life/store` because Vercel owns that path.
- **Collab editions will be separate products in a collection, not variants of the base figure.** Variants imply substitutability at the same price; a Fin DAC piece is a different object, price and edition size. Build the data model with that in mind now.
- **Not a store, a product page.** No collections, filters, cart page, account pages, search, wishlist, reviews or related-products carousel. One product, a variant selector, a buy button, and a "books coming" block. Everything else earns its way in later.

---

## THE REFERENCE: 1X NEO, AND WHAT TO TAKE FROM IT

Tom's reference is [1x.tech/order](https://www.1x.tech/order). Take its **restraint**, not its structure.

**Take:** the quiet full-bleed image sequence that lets the object carry the page, the discipline of a single CTA repeating rather than many competing ones, the generous scroll, the confidence to say very little.

**Leave:** the two pricing tiers, the tabbed feature sections, the hardware spec tables, the long FAQ. Roughly half of that page is anxiety-reduction architecture, because they are asking a stranger for $20,000 for an unfamiliar machine. A £150 art object is bought on feeling. Spec tables would actively cheapen it.

**The trap to avoid:** every section you design is a content commitment. A page built for thirty images blocks on thirty images, each of which has to justify £150. **Design a page that needs six outstanding photographs, not thirty adequate ones.**

Better mental references for this object: a gallery print edition page, a Medicom drop page, Aesop's product pages, and Niwaki's own product pages.

---

## PAGE STRUCTURE

A proposal, not a straitjacket. Argue with it if you have something better.

1. **The object, full-bleed, no text.** Hero. The figure, beautifully lit. This is the entire first impression.
2. **One line of what it is.** Serif, generous space. Not a headline in the marketing sense.
3. **The buy block.** Variant selector (light / dark, and base/stand if it happens), price, edition position ("Edition of 30" or "1 of 30"), and the buy button. This is the only place with a transactional feel, and it should still look like Auwa.
4. **Scroll into the making.** Rieko's hand, the printing, the finishing. Two or three images with very little text.
5. **The material card.** See below — this is a specific ask from Tom and deserves its own designed module.
6. **The packaging.** Balsa box, ribbon, eco insert, hand-written card from Rieko. This is a significant part of what the buyer is paying for and it photographs well.
7. **The character, briefly, with a link out.** A short passage on who Auwa is, linking to the journal article ["The Beginning"](https://auwa.life/journal) (Rieko's origin essay) and to `/book`. Do not retell the whole philosophy here; the site already does that well elsewhere.
8. **The practical facts.** Dimensions, material, edition size, signed and numbered, shipping, delivery timing. Plain type, not a table.
9. **Books coming.** A quiet block with the existing `SignupForm` (source-tagged appropriately). This is what replaces the current store page's job.

Then stop. Resist adding an FAQ, testimonials, or a "why Auwa" section.

### The material card

Tom specifically wants this. The figure is either a wood/plastic composite filament or a 100% biodegradable fermented material with zero plastic. That is a genuine brand-ethos fit and worth a small designed module: a card with a short passage and one or two images, sitting inside the scroll rather than bolted on.

Write it in the Auwa voice, which means concrete and sensory rather than eco-marketing. "The blade coated in a thin film of camellia oil," not "sustainably sourced." Say what the material actually is and what it does, and let the reader draw the conclusion. **Do not use the words "eco-friendly", "sustainable", "planet", or "journey".** Check the writing rules in the global CLAUDE.md before drafting: no em dashes, no fragment-stacking, no "it's not just X, it's Y."

Get the final material from Tom before writing this. Do not guess between the two options.

---

## VARIANTS

Light and dark, possibly plus a base/stand option.

**Numbering.** Number within each colourway rather than across the whole edition. "Light, 1 of 15" is cleaner than a shared sequence, and it gives two sell-out moments instead of one.

**The undecorated figure is philosophically the hero.** In the books, Auwa's light shower reveals the Kokoro inside things, and the whole collaboration programme rests on a blank Auwa that an artist or craftsperson reveals. So the plain form is the canonical one, and the design should treat it that way rather than as one of two equal options.

**Later variant axis, for context.** The Yamato five-state colour system (Hare, Takaburi, Aware, Yuragi, Nagomi) is dormant owned IP with a full OKLCH palette in `brand.md`. It is a much richer axis for future editions than light/dark. Not phase 1, but do not architect anything that would make five colourways awkward.

---

## PRICING AND VAT — GET THIS RIGHT BEFORE ANY PRICE IS PUBLISHED

Trading entity is **More Air Limited**, which is VAT registered. So:

- **20% VAT applies to the figure from the first UK sale.** There is no threshold to hide under. At a £150 shelf price you net £125. To net £150 you price at £180. **Prices must be set VAT-inclusive.**
- **Printed books are zero-rated** in the UK. Prints and paper goods are standard-rated at 20%. The shop runs mixed rates, so use Shopify's per-product tax overrides.
- **Exports outside the UK are zero-rated.** Configure tax regions so a US customer is not charged UK VAT.
- **EU / IOSS is an open decision.** Consignments under €150 into the EU need either an IOSS registration (a UK seller needs an EU intermediary post-Brexit) or the customer gets a handling fee demand from the courier on delivery, which is a poor experience on a gift-wrapped £150 object. Ask Tom whether the EU is in scope at launch or whether phase 1 is UK plus US only.

If Tom has not settled the final price when you build, use a placeholder and flag it clearly rather than guessing.

---

## SELLING MODEL

**A timed drop, not an always-on product.** Announce a date, build the list against it, open, sell out. That is how every art-toy edition works and it is what makes "never reissued" mean anything. The figure lottery already live on the site's bottom strip feeds into it.

That means the page needs at least three states, and they should all be designed rather than improvised:

- **Before the drop:** the object, the story, a date, and a notify-me capture. This is the state the page will live in longest, so it has to be beautiful without a buy button.
- **Live:** buyable, with remaining stock visible or implied.
- **Sold out:** dignified, not apologetic. "Edition of 30, all claimed." Plus a capture for the next edition.

**Made-to-order is under consideration.** Tom may print against paid orders rather than making 30 on spec, which flips the cash flow and removes weeks of labour before any revenue. If so, the page must state the lead time plainly (two to three weeks is normal and nobody minds for a hand-finished piece). Confirm with him.

**First edition is 25-50 units, not 100.** Settled 5 Aug 2026.

---

## THE BUYER AND THE MARKET

Context you need to design well, and the part a generic e-commerce build would miss.

**Who buys this.** Overlapping with, but not identical to, the Auwa audience. Three groups: design-conscious Japan-interested people who follow the illustration work and want an object from a world they like; art-toy and designer-figure collectors who already buy Bearbrick, Sonny Angel, KAWS and independent resin makers; and a small number of people buying a gift. The first group is warm and already on the mailing list. The second group is the one the page has to convince, and they have specific expectations.

**What that collector expects, and judges you on.** Edition size stated plainly and honestly. Numbering, visibly, on the piece or the certificate. Artist signature. Packaging treated as part of the object rather than as shipping protection. Photography that shows the actual piece from multiple angles including the base and the back, not renders. A clear statement that it will not be reissued, and then honouring it. Provenance and documentation, because these things get resold and a well-documented edition holds value.

**What reads as amateur to them.** Stock-photo styling. Renders passed off as photographs. Vague edition language ("limited edition" with no number). A "buy now" urgency banner or countdown timer. Discount codes on a numbered edition. Reviews and star ratings. Anything that makes it feel like dropshipped merchandise.

**Price context.** £150-180 sits above blind-box territory (Pop Mart, Sonny Angel, £12-20) and below serious art-toy pieces (KAWS editions, large Bearbricks, £400-several thousand). It is roughly where an independent resin artist's small hand-finished run sits, and the market is used to it. What justifies it is: hand-finished, signed by the artist, tiny edition, real packaging, a character with a decade of narrative behind it. The page has to make all five visible without listing them like features.

**The narrative advantage nobody else in this category has.** Bearbrick's bear means nothing, deliberately, which is why anything can be projected onto it. Auwa means something specific, drawn from a decade of illustrated stories. The page should let a collector who has never heard of Auwa understand, quickly and without a lecture, that this object comes from somewhere. That is the job of section 7 and the link to "The Beginning."

**Do not mention Pop Mart, mass production, or future licensing anywhere on the page.** A possible art-toy licensing conversation exists but is a 2028 matter and would undercut the scarcity story entirely.

---

## TECHNICAL APPROACH

**Phase 1: Shopify Buy Button.** Shopify's embedded Buy Button SDK, dropped into the Next.js page. No cart state, no API integration, no server-side commerce logic. Checkout opens Shopify's hosted checkout.

Wrap it. Do not scatter Shopify calls through the page. Put the product data (price, variants, inventory, availability) behind a single small module with a typed interface, so that swapping to the Storefront API later is one file rather than a rewrite. Something like:

```
src/lib/commerce/
  index.ts        // typed interface the page consumes
  buy-button.ts   // phase 1 implementation
```

The page should never know which implementation is behind it.

**Phase 2 and beyond: Shopify Storefront API.** Once there are books, prints and collab editions, move to the Storefront API for a proper cart. Because the page consumes the typed interface, this is contained.

**Things to get right regardless.**

- The Buy Button script is third-party and loads client-side. Keep `"use client"` on the smallest component that needs it, per the global build patterns, and do not let it block LCP. The site fought hard to get LCP from ~5.1s to ~2s (see `patterns.md`); do not give that back.
- Sold-out and pre-order states must be handled in the UI, not left to Shopify's default button text.
- Structured data: the page should carry `Product` schema with offers, price, availability and currency. The current store page carries `Store` schema; that will need revisiting.
- The current page's metadata (in `src/app/store/page.tsx`) was rewritten in Aug 2026 and its title rules still apply: under 60 characters, still carries "Japanese". Adapt rather than replace wholesale.
- Keep the demo route noindexed while it is a demo (`robots: { index: false, follow: false }` plus an entry in `robots.ts`), consistent with how `/home-1`, `/brand` and `/instagram` are handled.

---

## SHOPIFY SETUP — WHAT TOM NEEDS TO DO

The new session should walk Tom through this explicitly and in order, because it is the part Claude cannot do for him. Rough shape, to be expanded in-session:

1. Create the Shopify account in **More Air Limited's** name, with More Air's registered address and VAT number. Basic plan.
2. Set the store's primary domain to a subdomain of auwa.life (for example `store.auwa.life`) and add the DNS record. This is what keeps the checkout URL on-brand.
3. Enter business details: legal entity, VAT number, registered address. These appear on invoices and are a consumer-law requirement.
4. Configure tax: UK VAT at 20% standard, per-product override to zero-rate books, exports zero-rated. Decide EU/IOSS.
5. Create the product with its variants, set inventory to the true edition size, and enable "continue selling when out of stock" **off** so it cannot oversell.
6. Shipping profiles and rates: UK, US, and EU if in scope. Enable customs information for international so CN22/CN23 data is generated.
7. Payments: Shopify Payments, plus Apple Pay and Shop Pay enabled.
8. Generate the Buy Button embed code and hand the product ID and storefront access token to Claude.
9. Notification emails: adapt the order confirmation to the brand voice rather than shipping Shopify's default.
10. Test a real transaction with a real card, then refund it.

---

## SCOPE DISCIPLINE

The single realest risk in this project, documented repeatedly: **craft beats shipping.** The app was built and never released. Two finished books sat unreleased for months. A beautiful product page is exactly the kind of absorbing work that has swallowed months before.

So: give the build a **hard three days**. The page itself is one to two days inside an existing design system. The Shopify plumbing is roughly one. If it is not working at the end of day three, buy a Shopify theme, spend a day on fonts and colours, and ship it. Say this to Tom if it starts drifting.

**Build order that keeps nothing idle:** Shopify setup and the plumbing first, this week, because that is where the genuine unknowns live (tax, shipping, the checkout handoff feel). Get a test product flowing end to end with a real card while the figure is still being finalised. Then build the page with placeholder images so structure and motion are settled. Then drop in real photography when the figure is final.

**The photography is the long pole, not the code.** It cannot happen until the figure is finished, and it is the entire sales argument for a hand-finished object bought sight unseen. Six outstanding shots: hero, two angles showing finish and material, the box open with ribbon and card, a scale reference (it is 12-15cm and people will misjudge that), and one in-situ on a shelf.

---

## WHAT TOM WILL BRING TO THE SESSION

Photographs of the current prototype, the material decision (wood/plastic composite or 100% biodegradable fermented, zero plastic), the finish, the packaging concept, and pricing thinking. Ask for whatever is missing rather than assuming.
