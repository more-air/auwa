import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { HeaderTone } from "@/components/header-tone";
import { MicroSeasonFeature } from "@/components/micro-season-feature";
import { EditorialFrames } from "@/components/editorial-frames";
import { PillarParade } from "@/components/pillar-parade";
import { StripReveal } from "@/components/strip-reveal";
import { TextReveal } from "@/components/text-reveal";
import { EditorialFeature } from "@/components/editorial-feature";
import { BookHeroCard } from "@/components/book-hero-card";
import { HeroVideo } from "@/components/hero-video";
import { ScrollFadeText } from "@/components/scroll-fade-text";
import { CtaLink } from "@/components/cta-link";
import { STAGGER } from "@/lib/motion";
import Image from "next/image";
import Link from "next/link";

/* ─── Placeholder data (will come from Sanity CMS) ─── */

const latestArticles: { title: string; excerpt: string; category: string; slug: string; image?: string }[] = [
  { title: "Yaoyorozu no Kami", excerpt: "Eight million gods live in the world around you.", category: "Philosophy", slug: "yaoyorozu-no-kami", image: "/journal/yaoyorozu-no-kami/yaoyorozu-no-kami-hero.jpg" },
  { title: "Nozawa Fire Festival", excerpt: "A fire rite to honour guardian spirits.", category: "Seasons", slug: "nozawa-fire-festival", image: "/journal/nozawa-festival/nozawa-festival-hero.jpg" },
  { title: "Shigefusa", excerpt: "Waiting over a year for a knife, and what arrived.", category: "Craft", slug: "shigefusa-knife", image: "/journal/shigefusa-knife/shigefusa-knife-hero.jpg" },
  { title: "Oroku-gushi", excerpt: "Wood that breaks axes. Named after a girl.", category: "Craft", slug: "oroku-gushi", image: "/journal/oroku-gushi/oroku-gushi-hero.jpg" },
  { title: "Koya-san", excerpt: "Prayers chanted on this mountain for 1,200 years.", category: "Travel", slug: "koya-san", image: "/journal/koya-san/koya-san-hero.jpg" },
  { title: "72 Seasons", excerpt: "Five-day seasons, each one worth noticing.", category: "Seasons", slug: "72-seasons", image: "/journal/72-seasons/72-seasons-hero.jpg" },
  { title: "The Onsen Lesson", excerpt: "What hot water teaches about being alive.", category: "Philosophy", slug: "the-onsen-lesson", image: "/journal/onsen-lesson/onsen-lesson-hero.jpg" },
  { title: "Making Washi", excerpt: "Mulberry bark, cold water. A thousand-year gesture.", category: "Craft", slug: "making-washi", image: "/journal/washi-paper/washi-paper-hero.jpg" },
  { title: "Narai in Snow", excerpt: "Four hundred years. The same street, unchanged.", category: "Travel", slug: "narai-juku", image: "/journal/narai-juku/narai-juku-hero.jpg" },
  { title: "Yakushima", excerpt: "The island where the trees outlived history.", category: "Travel", slug: "yakushima-island", image: "/journal/yakushima-island/yakushima-island-hero.jpg" },
  { title: "The Beginning", excerpt: "Light in a dark forest. A dream that wouldn't let go.", category: "Philosophy", slug: "the-beginning", image: "/journal/auwa-book/auwa-book-hero.jpg" },
];

const twoUpArticles = [
  { title: "The Onsen Lesson", excerpt: "What hot water teaches about being alive.", slug: "the-onsen-lesson", image: "/journal/onsen-lesson/onsen-lesson-hero.jpg" },
  { title: "Nozawa Fire Festival", excerpt: "A fire rite to honour guardian spirits.", slug: "nozawa-fire-festival", image: "/journal/nozawa-festival/nozawa-festival-hero.jpg" },
];

function Separator() {
  return (
    <div className="px-6 md:px-12 lg:px-20 xl:px-28">
      <div className="w-full h-[1px] bg-sumi/10" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <main>

        {/* ── Full-bleed Auwa face video (mobile full-height, chevron) ── */}
        <HeroVideo />

        {/*
          Cover layer. The rest of the page sits inside this z-10 bg-surface
          wrapper so that, as the user scrolls, the page content slides up
          and over the (now sticky) hero rather than the hero scrolling
          away. Mirrors the footer-parallax pattern at the top of the page:
          HeroVideo is sticky top-0 z-0; this wrapper is relative z-10
          bg-surface; their relationship reproduces main+footer in the
          opposite direction. Makes the scroll-driven frost a lot more
          visible because the image stays put while the page glides
          across it.
        */}
        <div className="relative z-10 bg-surface">
        {/* Header tone — overrides the HeroVideo's "surface" sentinel
            once the user scrolls into the page content. The hero is
            position:sticky and never exits the IO band, so this
            later-in-DOM sentinel takes precedence the moment the
            content section reaches the header band. */}
        <HeaderTone tone="sumi" />

        {/* ── Intro block: eyebrow + scroll-fade paragraph + CTA ── */}
        <section id="intro" className="relative scroll-mt-16 md:scroll-mt-20 px-6 md:px-12 lg:px-20 xl:px-28 space-section">
          {/*
            心 — Kokoro watermark. A quiet acknowledgement, within the first
            scroll, that this site's worldview is rooted in Japanese
            philosophy. Desktop only, 3% alpha — atmospheric texture, never
            competes with the paragraph.
          */}
          {/* Watermark fade-in is gated on usePageReady inside FadeIn so
              the entrance only starts AFTER the page-transition wipe
              completes — same pattern as /about. */}
          <FadeIn
            className="hidden lg:block pointer-events-none select-none absolute top-1/2 -translate-y-1/2 lg:right-12 xl:right-20"
            duration={1800}
            translateY={0}
          >
            <span
              aria-hidden="true"
              className="font-jp-serif leading-none text-sumi/3"
              style={{ fontSize: "clamp(16rem, 38vw, 30rem)" }}
            >
              心
            </span>
          </FadeIn>
          <div className="relative max-w-[880px]">
            <FadeIn>
              <h1 className="block font-sans text-[12px] tracking-[0.16em] uppercase text-sumi/45 m-0 font-normal">
                Japanese Philosophy of Kokoro
              </h1>
            </FadeIn>
            <ScrollFadeText
              as="p"
              className="mt-6 md:mt-10 font-display text-[22px] md:text-[28px] lg:text-[32px] leading-[1.35] tracking-[0.005em] text-sumi"
            >
              Auwa: a character and a philosophy. Since ancient times, the Japanese have believed a life force resides in all things: a river, a handmade bowl, the wind through bamboo at dusk. In Auwa, we call it Kokoro (心). Auwa is an invitation to notice again. The stories are illustrated, the character is made by hand, and the journal is written slowly.
            </ScrollFadeText>
            <FadeIn delay={200}>
              <div className="mt-10 md:mt-14">
                <CtaLink href="/journal/the-beginning" variant="primary">Our Story</CtaLink>
              </div>
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* ── Big pullquote block ── */}
        <section className="px-10 md:px-12 lg:px-20 xl:px-28 space-breathing">
          <div className="max-w-[1100px] mx-auto text-center">
            <ScrollFadeText
              as="p"
              className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.05] tracking-[0.003em] text-sumi"
              finishAt={0.4}
            >
              &ldquo;There is a quieter way to live, and the Japanese have been practising it for centuries. It begins with what you stop to notice.&rdquo;
            </ScrollFadeText>
          </div>
        </section>

        <Separator />

        {/* ── Book hero card: full-width feature for the Auwa character ──
            Sits BEFORE the "What we make" module (Aug 2026). Auwa is a
            character and a philosophy first; the book, figure and journal
            are what that character takes form as. Introducing the
            character ahead of the things it appears in states that
            hierarchy in page order rather than in copy. */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
          <FadeIn>
            <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi mb-10 md:mb-14">
              The character.
            </h2>
          </FadeIn>
          <FadeIn translateY={32}>
            <BookHeroCard />
          </FadeIn>
        </section>

        <Separator />

        {/* ── "What we make" module ──
            Desktop (md+): Editorial Frames tab gallery with crossfade +
            staggered reveals — tab-driven, no scroll-hijacking.
            Mobile (<md): Pillar Parade horizontal scroll-snap row —
            native swipe, fits the viewport.

            Three frames (Book / Store / Journal). Was four ("Four ways
            in.") until Aug 2026, when the app was parked and the pillar
            framing was dropped entirely — Auwa IS a character and a
            philosophy, and this module lists what it MAKES. No count in
            the heading, so the copy survives the next change to the
            product line.

            The h2 is hoisted here (rather than living inside each
            variant) so the page renders exactly one canonical "What we
            make." heading regardless of viewport. Previously both
            EditorialFrames and PillarParade owned their own h2, which
            put two identical headings into the SSR HTML — display:none
            hid one from sight, but crawlers and inactive viewports
            still saw the duplicate. */}
        <section className="space-section">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 mb-10 md:mb-14 max-w-[720px]">
            <TextReveal
              as="h2"
              stagger={80}
              className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi"
            >
              What we make.
            </TextReveal>
          </div>
          <div className="hidden md:block">
            <EditorialFrames />
          </div>
          <div className="md:hidden">
            <PillarParade />
          </div>
        </section>

        <Separator />

        <MicroSeasonFeature />

        <Separator />

        {/* ── Latest from the Journal ──
            Moved here (Aug 2026) from its old slot above the micro-season
            module, taking the place of the retired "What we're making"
            pillar cards. Those cards showed Book / Store / App; with the
            app parked they'd have shown the same three things as the
            "What we make" module higher up the page, so the module was
            cut rather than re-pointed. The journal keeps its full
            prominence — it's no longer framed as a pillar, but it's the
            only part of Auwa a visitor can read today. */}
        <section className="space-section">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 flex items-baseline justify-between gap-6 mb-10 md:mb-14">
            <FadeIn>
              <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi">
                Our Journal.
              </h2>
            </FadeIn>
            <FadeIn delay={120}>
              <Link
                href="/journal"
                className="group relative inline-flex overflow-hidden font-sans text-[12px] tracking-[0.16em] uppercase text-sumi/50 hover:text-sumi transition-colors duration-500 ease-text-roll"
              >
                <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-full">
                  View all
                </span>
                <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-text-roll group-hover:translate-y-0">
                  View all
                </span>
              </Link>
            </FadeIn>
          </div>
          <StripReveal
            className="flex gap-5 md:gap-6 lg:gap-8 overflow-x-auto pb-4 px-6 md:px-12 lg:px-20 xl:px-28 scrollbar-hide"
            itemClassName="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px]"
          >
            {latestArticles.map((article, i) => (
              <Link key={article.slug} href={`/journal/${article.slug}`} className="group block" data-cursor="Read">
                <div className="aspect-[4/5] overflow-hidden rounded-md relative">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 260px, (max-width: 1024px) 280px, 300px"
                      className="object-cover"
                      loading="eager"
                      // Priority on the first three cards so the
                      // browser fetches them at high priority on first
                      // paint — otherwise the first card's image was
                      // intermittently still streaming when the
                      // StripReveal cascade fired, leaving an empty
                      // box.
                      priority={i < 3}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/40 to-surface-raised" />
                  )}
                </div>
                <div className="mt-4 max-w-[90%]">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-sans text-[12px] tracking-[0.16em] uppercase text-sumi/45">
                      {article.category}
                    </span>
                  </div>
                  <h3 className="font-display text-[18px] md:text-[20px] leading-[1.25] tracking-[0.01em] text-sumi">
                    {article.title}
                  </h3>
                  <p className="mt-1.5 font-sans text-[14px] leading-[1.5] text-sumi/55 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </StripReveal>
        </section>

        {/* ── Breather: mid-page pullquote ── */}
        <section className="px-10 md:px-12 lg:px-20 xl:px-28 space-breathing">
          <div className="max-w-[1100px] mx-auto text-center">
            <ScrollFadeText
              as="p"
              className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.05] tracking-[0.003em] text-sumi"
              finishAt={0.5}
            >
              &ldquo;In every handmade bowl, in every river, in every person you pass, a Kokoro is waiting to be seen.&rdquo;
            </ScrollFadeText>
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 lg:gap-12">
            {twoUpArticles.map((article, i) => (
              <FadeIn key={article.slug} delay={i * STAGGER.grid} variant="reveal" revealDistance={40}>
                <Link href={`/journal/${article.slug}`} className="group block" data-cursor="Read">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                    {article.image ? (
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/60 to-surface-raised" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-sumi/40 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                      <h3 className="font-display text-[32px] md:text-[40px] leading-[1.05] tracking-[0.005em] text-surface">
                        {article.title}
                      </h3>
                      <p className="mt-3">
                        <span className="relative inline-flex overflow-hidden font-sans text-[12px] tracking-[0.16em] uppercase text-surface">
                          <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-full">
                            Read essay &rarr;
                          </span>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 flex items-center translate-y-full transition-transform duration-500 ease-text-roll group-hover:translate-y-0"
                          >
                            Read essay &rarr;
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        <Separator />

        <EditorialFeature
          eyebrow="Meet Auwa"
          heading="Kokoro lives in every quiet, ordinary thing."
          cta={{ label: "Explore world", href: "/book" }}
          body="Auwa, a character from our illustrated stories who reveals what the world has been too busy to notice. Auwa also takes form as a figure."
          // Portrait video on every viewport — Auwa revealing the
          // Kokoro in living things. Same footage used in the book
          // page's "What Auwa does" module. The warm-tint wash is
          // disabled (the footage already sits in the right palette,
          // and a tint over moving pixels reads as a colour shift).
          aspectClassName="aspect-[9/16] md:aspect-[2/3]"
          warmTint={false}
          mediaMaxWidth="md:max-w-[480px]"
          image={{
            src: "/book/character/auwa-kokoro.mp4",
            alt: "Auwa revealing the Kokoro in living things",
            href: "/book",
            video: {
              poster: "/book/character/auwa-kokoro-poster.jpg",
              objectPosition: "bottom",
            },
          }}
        />

        <Separator />

        {/* Closing invitation. The Meet Auwa block above handles the
            atmospheric setup (video + descriptive body); this is the
            action beat — a final weighted call into /book before the
            footer. CTA uses CtaLink (the site-wide bordered button) to
            stay consistent with the "Our Story" CTA up at the intro.
            Padding is one-off: bigger than space-breathing (the
            pullquote token at 112/176px) because this is a final
            declaration before the footer rather than a mid-page rest,
            and it wants visible separation from the Meet Auwa block
            above and the dark Yoru footer below.
            A soft radial glow pulses behind the heading + button —
            colour palette echoes Auwa's character halo (warm cream
            through soft amber with a whisper of cosmic violet at the
            edge), connecting this moment to the /book hero visually
            without re-using its imagery literally. The pulse is slow
            (5s, ease-in-out) so it reads as breathing, not flashing. */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-64 md:py-80 relative overflow-hidden">
          <FadeIn className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div
              aria-hidden="true"
              className="book-closing-glow"
              style={{
                width: "min(800px, 90%)",
                aspectRatio: "1 / 1",
                background: "radial-gradient(circle at center, rgba(255,240,200,0.55) 0%, rgba(250,220,180,0.4) 18%, rgba(230,200,220,0.25) 42%, rgba(200,195,230,0.14) 62%, transparent 80%)",
                filter: "blur(20px)",
              }}
            />
          </FadeIn>
          <div className="max-w-[1100px] mx-auto text-center relative">
            {/* Heading cascades word-by-word (TextReveal). With default
                80ms stagger and 4 words, the last word fires at ~240ms;
                each word fades in over DURATION.enter (800ms), so the
                full cascade completes around 1040ms. Button delay 650ms
                so it begins fading in while the last word is settling —
                heading lands, button arrives just behind it. */}
            <TextReveal
              as="h2"
              className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[0.005em] text-sumi"
            >
              Ready to step in?
            </TextReveal>
            <FadeIn delay={650} className="mt-10 md:mt-12">
              <CtaLink href="/book" variant="primary">Open book</CtaLink>
            </FadeIn>
          </div>
        </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
