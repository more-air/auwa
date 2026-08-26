import Image from "next/image";
import { Footer } from "@/components/footer";
import { CtaLink } from "@/components/cta-link";
import { FadeIn } from "@/components/fade-in";
import { HeaderTone } from "@/components/header-tone";
import { ImageFade } from "@/components/image-fade";
import { ScrollFadeText } from "@/components/scroll-fade-text";
import { TextReveal } from "@/components/text-reveal";
import { FigureGallery, type Frame } from "@/components/store/figure-gallery";
import { DropStateDemo } from "@/components/store/drop-state-demo";
import { commerce, formatPrice, remaining } from "@/lib/commerce";

/*
  ─────────────────────────────────────────────────────────────────────
  FIGURE PRODUCT PAGE — DEMO ROUTE
  ─────────────────────────────────────────────────────────────────────

  Not linked from anywhere and noindexed (see robots.ts), same handling
  as /brand and /instagram. When it's approved and the figure is
  photographed, this replaces src/app/store/page.tsx wholesale.

  Spec: context/website/store.md.

  WHAT IS REAL HERE
  Structure, motion, type, spacing, the three drop states, and the
  commerce interface underneath the buy block.

  WHAT IS PLACEHOLDER
  • Every photograph. These are the existing /store carousel renders,
    standing in so the layout can be judged. They CANNOT ship: the
    art-toy market treats renders-passed-off-as-photographs as the
    clearest amateur tell there is (store.md, "The buyer and the
    market"). Six real shots replace them — hero, two finish/material
    angles, the open box, a scale reference, and one on a shelf.
  • Price, edition size, dimensions, drop date. All flagged in
    src/lib/commerce/mock.ts.
  • The material card copy is written for the wood composite. If the
    allPHA test wins, that passage gets rewritten — and note it is a
    bioplastic, so it can be described as grown rather than drilled,
    but never as "no plastic".

  ON NOT NAMING THE PRINTER
  Nothing here says "printed", "3D printed" or "printer", and that is a
  decision rather than an oversight. The method is real and we don't
  hide it — ask and we answer straight — but leading with it invites the
  one association that would sink a £180 edition in this market: that
  the object is a file anyone could run off. What actually justifies the
  price is the hand-work, the edition size and the signature, so the
  copy leads with those. The hard line: never claim it is carved, thrown
  or hand-shaped from solid. "Formed", "made" and "worked by hand" are
  all true. Anything implying it was shaped by hand from raw material is
  not, and would be the kind of thing a collector discovers and never
  forgives.

  THREE DEVIATIONS FROM THE BRIEF, ALL DELIBERATE
  1. NO FULL-BLEED HERO. The brief opens with "the object, full-bleed,
     no text". Built that way first and it was wrong twice over: it
     repeated the homepage's own full-bleed opening (which is the
     homepage's differentiator and should stay unique to it), and it
     forced the hero to be shot LANDSCAPE, which would have split the
     shoot away from the 4:5 portrait every other surface uses,
     Instagram included.

     Instead the page opens on the journal article hero's split —
     `grid-cols-1 lg:grid-cols-2 lg:h-[100svh]`, image side
     `aspect-[4/5] lg:aspect-auto` — with the gallery on the left and
     an orderable panel on the right. Two things fall out of that:
     a visitor can tell within a second that they have landed
     somewhere they can buy something, and every photograph on the
     page is portrait.

  2. Section 9 ("Books coming") carries no email form. The panel
     already captures in two of its three states and the footer
     captures on every page; a third form on one screen reads as a
     site that wants your address more than it wants to sell you
     anything. It's a quiet note pointing at /book instead.

  3. The buy action is a plain link to a Shopify cart permalink rather
     than the embedded Buy Button script. Same Shopify backend, same
     half-day of work, but no third-party script on the critical path
     (the site fought LCP down from ~5.1s to ~2s and shouldn't give it
     back) and our own CTA styling instead of Shopify's. The commerce
     interface hides which one is used, so this is reversible.
*/

/*
  The six shots the page needs, all 4:5 portrait. Placeholders for now
  (see the note above). What the real set has to cover:
    1. the object, clean, three-quarter    4. the open box, ribbon and card
    2. surface and material, close         5. a scale reference in a hand
    3. the base, the number and signature  6. one in situ on a shelf
*/
const GALLERY: Frame[] = [
  { src: "/store/insitu-1.jpg", alt: "An Auwa figure on a stone disc, a hand resting beside it" },
  { src: "/store/insitu-5.jpg", alt: "An Auwa figure on a wooden table beside handmade paper" },
  { src: "/store/insitu-3.jpg", alt: "An Auwa figure on a wooden counter beside a ceramic bowl" },
  { src: "/store/insitu-4a.jpg", alt: "An Auwa figure presented in a case" },
  { src: "/store/insitu-2.jpg", alt: "An Auwa figure on a stone counter" },
  { src: "/store/insitu-6.jpg", alt: "Four Auwa figures gathered together in afternoon light" },
];

export const metadata = {
  title: "Figure preview | Auwa",
  description: "Internal preview of the Auwa figure product page.",
  robots: { index: false, follow: false },
};

export default async function StorePreviewPage() {
  const figure = await commerce.getFigure();
  const lead = figure.colourways[0];
  const editionTotal = figure.colourways.reduce(
    (n, c) => n + c.editionSize,
    0
  );

  // Product schema. The live page needs this for rich results; on the
  // demo it's here so the shape is settled rather than bolted on at
  // the end. Availability tracks the drop state.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Auwa Figure",
    description:
      "A hand-finished Auwa figure in a small numbered edition, signed by the artist.",
    brand: { "@type": "Brand", name: "Auwa" },
    image: "https://auwa.life/store/insitu-1.jpg",
    offers: figure.colourways.map((c) => ({
      "@type": "Offer",
      name: c.label,
      price: c.price,
      priceCurrency: "GBP",
      availability:
        figure.state === "live" && remaining(c) > 0
          ? "https://schema.org/InStock"
          : figure.state === "upcoming"
          ? "https://schema.org/PreOrder"
          : "https://schema.org/SoldOut",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>

        {/* ── 1. The split: gallery left, orderable panel right ────
            Same grid as the journal article hero, deliberately. It is
            already tuned for 4:5 portrait photography, it already
            handles the stacked-to-split breakpoint, and reusing it
            means the store reads as the same publication rather than
            as a bolted-on shop.

            Below lg the two stack, image first — which is the layout
            Neo uses on mobile too.

            Header tone sentinels mirror the article hero: Surface on
            the image side (light foreground over photography), Sumi
            on the panel side (dark text on the Surface page ground). */}
        <div className="grid grid-cols-1 lg:h-[100svh] lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto">
            <HeaderTone tone="surface" />
            <FigureGallery frames={GALLERY} />
          </div>

          <div className="relative flex flex-col justify-center px-6 py-12 md:px-12 md:py-16 lg:px-14 lg:py-0">
            <HeaderTone tone="sumi" />
            <FadeIn>
              <DropStateDemo figure={figure} />
            </FadeIn>
          </div>
        </div>

        {/* ── 2. One line of what it is ───────────────────────────────
            The first beat of the scroll rather than the top of the
            page. After a dense panel it works as a breath, and it hands
            the reader from "here is the thing and its price" into "here
            is how it is made".

            Uses the homepage's PULLQUOTE token, not its intro token.
            The intro token was the first choice and it read too small:
            that scale is built for a long multi-line paragraph filling
            a column, and it goes thin under a single short sentence
            sitting alone. Structurally this is a pullquote — one line,
            alone, in a space-breathing section — so it takes the
            pullquote's geometry: same clamp, leading, tracking, gutters
            and max-width as the two on the homepage. */}
        <section className="px-10 md:px-12 lg:px-20 xl:px-28 space-breathing">
          <div className="max-w-[1100px] mx-auto text-center">
            <ScrollFadeText
              as="p"
              className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.05] tracking-[0.003em] text-sumi"
              finishAt={0.4}
            >
              An Auwa small enough to hold, made one at a time and worked by
              hand until the surface takes the light.
            </ScrollFadeText>
          </div>
        </section>

        <Separator />

        {/* ── 4. Into the making ──────────────────────────────────────
            Text block first, then two equal 4:5 plates.

            Two earlier attempts were wrong in different ways. The first
            staggered the images at different sizes with the paragraph
            wedged under the shorter one. The second made the plates
            equal but left the paragraph hanging below them at
            max-w-[52ch], hugging the left edge with half the row empty
            — it read as a caption that had lost its image.

            The real problem underneath both: this was the only module
            on the page with body copy and no heading, while the two
            sections after it both run eyebrow → h2 → body. Giving it
            the same anatomy resolves the balance, and leading with the
            text means the whitespace beside it reads as a lead-in
            rather than as something left over. The pair then closes the
            section at full container width.

            SHOOT: these two are Rieko's hands, mid-work — sanding with
            the dust visible, and waxing. No faces, and no shot of the
            printer: the page never names the machine (see the copy note
            at the top of this file), so the photography shouldn't
            either. */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
          <div className="mx-auto max-w-[1100px]">
            <FadeIn>
              <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-sumi/45">
                The making
              </p>
            </FadeIn>
            <TextReveal
              as="h2"
              stagger={80}
              className="mt-5 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi"
            >
              Sanded, waxed, buffed back.
            </TextReveal>
            <FadeIn delay={240}>
              <p className="mt-6 max-w-[52ch] font-display text-[18px] leading-[1.65] text-sumi/80 md:text-[19px]">
                Each one is formed as a single piece, then spends far longer in
                the hand than it did in the making, until the surface has lost
                every trace of how it was made and the grain underneath comes
                up.
              </p>
            </FadeIn>

            <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
              <FadeIn variant="reveal" revealDistance={40}>
                <Plate
                  src="/store/insitu-3.jpg"
                  alt="An Auwa figure on a wooden counter beside a ceramic bowl"
                  ratio="aspect-[4/5]"
                />
              </FadeIn>
              <FadeIn variant="reveal" revealDistance={40} delay={120}>
                <Plate
                  src="/store/insitu-2.jpg"
                  alt="An Auwa figure on a stone counter"
                  ratio="aspect-[4/5]"
                />
              </FadeIn>
            </div>
          </div>
        </section>

        <Separator />

        {/* ── 5. The material card ────────────────────────────────────
            A specific ask from Tom, and it earns its own module rather
            than a paragraph. Raised on Paper so it reads as a card set
            into the scroll.

            Copy discipline (store.md): concrete and sensory, never eco
            marketing. No "sustainable", no "eco-friendly", no "planet".
            And no end-of-life claim on the wood composite, because a
            plant-derived polymer is not the same as one that breaks
            down in a garden, and that distinction is exactly what a
            sceptical reader would check.

            IMAGE RATIO: the image cell is 4:5, like every other frame
            on the page. It was a `min-h` box filled with object-cover,
            which is fine for a landscape photograph and crops a
            portrait one to a letterbox — the whole top and bottom of
            the frame thrown away. Since the shoot is portrait
            throughout (one set of images serving the site, the journal
            and Instagram), the cell has to be 4:5 and the card takes
            whatever height that implies. At the 1100px container that
            lands the card at roughly the same height as the two plates
            in the making section above, so the page keeps its rhythm. */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
          <FadeIn variant="reveal" revealDistance={40}>
            <div className="mx-auto grid max-w-[1100px] grid-cols-1 overflow-hidden rounded-md bg-paper md:grid-cols-2">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/store/insitu-5.jpg"
                  alt="Detail of the figure's surface beside handmade paper"
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center px-8 py-12 md:px-14 md:py-16">
                <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-sumi/45">
                  The material
                </p>
                <TextReveal
                  as="h2"
                  stagger={80}
                  className="mt-5 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi"
                >
                  Closer to a turned bowl.
                </TextReveal>
                <p className="mt-6 max-w-[46ch] font-display text-[18px] leading-[1.65] text-sumi/80 md:text-[19px]">
                  Fine wood fibre held in a plant-based polymer. It sands like
                  timber rather than like plastic and takes stain the same way,
                  which is why the grain rises as the finish goes on. In the
                  hand it is warm and slightly soft, and it marks the way wood
                  marks.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        <Separator />

        {/* ── 6. The packaging ────────────────────────────────────────
            A real part of what is being paid for, and the thing that
            most separates a £180 edition from a £20 figure. It also
            photographs better than the figure alone.

            SHOOT: the box closed with its washi band, and the box open
            with the card on top and the piece in its cloth. Two shots.

            Copy updated 26 Aug 2026: the box is a kiribako (Japanese
            paulownia), not balsa, and it is banded in washi rather than
            tied with ribbon. The figure lies down in the box and the
            buyer seats it on its base themselves, so don't write copy
            implying it arrives standing. See context/business/figure.md
            → PACKAGING. */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
          <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
            <div className="order-2 md:order-1">
              <FadeIn>
                <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-sumi/45">
                  How it arrives
                </p>
              </FadeIn>
              <FadeIn delay={120}>
                <h2 className="mt-5 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi">
                  In a paulownia box, banded in washi.
                </h2>
              </FadeIn>
              <FadeIn delay={240}>
                <p className="mt-6 max-w-[46ch] font-display text-[18px] leading-[1.65] text-sumi/80 md:text-[19px]">
                  Lift the lid and the first thing you find is a card written
                  out by Rieko, one for each figure. The piece lies beneath it
                  in cloth with its base below, so the last thing you do is set
                  it standing yourself. Your number appears three times over:
                  pressed into the figure, written on the base in Rieko&rsquo;s
                  hand, and on the card.
                </p>
              </FadeIn>
            </div>
            <FadeIn variant="reveal" revealDistance={40} className="order-1 md:order-2">
              <Plate
                src="/store/insitu-4a.jpg"
                alt="An Auwa figure presented in a case"
                ratio="aspect-[4/5]"
              />
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* ── 7. The character, briefly ───────────────────────────────
            For the collector who has never heard of Auwa. Enough to
            establish that this object comes from somewhere, then a way
            out to the full story. Deliberately short: the site tells
            this properly in two other places and retelling it here
            would make the page a brochure. */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
          <div className="mx-auto max-w-[720px] text-center">
            <FadeIn>
              <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-sumi/45">
                Who this is
              </p>
            </FadeIn>
            <FadeIn delay={120}>
              <p className="mt-8 font-display text-[20px] leading-[1.6] text-sumi md:text-[22px]">
                Auwa is a character Rieko Maeda has been drawing for ten years,
                a small being who moves through the world revealing the Kokoro
                in things: in a river, in a handmade bowl, in a person passing.
                The figure is that character made solid, and left blank, the
                way it appears before the light finds it.
              </p>
            </FadeIn>
            <FadeIn delay={280}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
                {/* Paired CTAs get an explicit hierarchy: solid leads,
                    bordered follows. "plain" was used here before and
                    read as a stray text link beside a real button. */}
                <CtaLink href="/journal/the-beginning" variant="solid">
                  Read the story
                </CtaLink>
                <CtaLink href="/book" variant="primary">
                  The book
                </CtaLink>
              </div>
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* ── 8. The practical facts ──────────────────────────────────
            Plain type, not a table. A spec table would cheapen a £180
            art object; a quiet list of true things does the opposite,
            because every line is one of the five things that justify
            the price. */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
          <div className="mx-auto max-w-[720px]">
            <FadeIn>
              <h2 className="font-sans text-[12px] uppercase tracking-[0.16em] text-sumi/45">
                The facts
              </h2>
            </FadeIn>
            <dl className="mt-10">
              {[
                ["Size", figure.dimensions],
                ["Material", figure.material],
                [
                  "Edition",
                  `${editionTotal} in total, ${lead.editionSize} in each finish. Numbered within its finish and never reissued.`,
                ],
                ["Marks", "Signed by Rieko. Numbered in the figure and on the base."],
                [
                  "Made",
                  `To order, ${figure.leadTimeWeeks[0]} to ${figure.leadTimeWeeks[1]} weeks, made and finished in London.`,
                ],
                [
                  "Shipping",
                  "United Kingdom and United States. Price includes UK VAT; orders outside the UK are charged without it.",
                ],
                ["Price", `${formatPrice(lead.price)}, including VAT.`],
              ].map(([term, detail], i) => (
                <FadeIn key={term} delay={Math.min(i * 120, 480)}>
                  <div className="grid grid-cols-1 gap-1 border-t border-sumi/10 py-5 md:grid-cols-[160px_1fr] md:gap-8">
                    <dt className="font-sans text-[12px] uppercase tracking-[0.16em] text-sumi/45">
                      {term}
                    </dt>
                    <dd className="font-display text-[18px] leading-[1.6] text-sumi/80 md:text-[19px]">
                      {detail}
                    </dd>
                  </div>
                </FadeIn>
              ))}
            </dl>
          </div>
        </section>

        <Separator />

        {/* ── 9. The books ────────────────────────────────────────────
            No form here. See the deviation note at the top of the
            file. A quiet pointer, and then the page stops: no FAQ, no
            testimonials, no "why Auwa", no related products. */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-breathing">
          <div className="mx-auto max-w-[720px] text-center">
            <TextReveal
              as="h2"
              className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi"
            >
              The stories come next.
            </TextReveal>
            <FadeIn delay={400}>
              <p className="mx-auto mt-8 max-w-[52ch] font-display text-[18px] leading-[1.65] text-sumi/80 md:text-[19px]">
                Two illustrated books are finished. They are where the
                character comes from, and they will be here when they are
                printed.
              </p>
            </FadeIn>
            <FadeIn delay={600}>
              <div className="mt-10">
                {/* Alone, so it takes the site's standard bordered
                    treatment rather than the solid one. */}
                <CtaLink href="/book" variant="primary">
                  See the book
                </CtaLink>
              </div>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

/* ─── Local primitives ─── */

/**
 * Section rule. Same markup as the homepage's own `Separator` (see
 * src/app/page.tsx, used seven times there) — page gutters wrapping a
 * full-width sumi/10 hairline. Kept in sync with that one deliberately;
 * if the homepage's changes, change this too.
 */
function Separator() {
  return (
    <div className="px-6 md:px-12 lg:px-20 xl:px-28">
      <div className="w-full h-[1px] bg-sumi/10" />
    </div>
  );
}


/** Standard image plate: site-wide rounded-md, gentle load fade. */
function Plate({
  src,
  alt,
  ratio,
}: {
  src: string;
  alt: string;
  ratio: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-md ${ratio}`}>
      <ImageFade
        src={src}
        alt={alt}
        fill
        quality={95}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
      />
    </div>
  );
}
