"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { ScrollFadeText } from "@/components/scroll-fade-text";
import { CtaLink } from "@/components/cta-link";
import { HeroVideo } from "@/components/hero-video";
import { MicroSeasonFeature } from "@/components/micro-season-feature";
import { StripReveal } from "@/components/strip-reveal";
import { VideoMoment } from "@/components/video-moment";
import { Footer } from "@/components/footer";
import { STAGGER } from "@/lib/motion";

/*
  /demo-home — proposed upgrades to the live homepage.

  What's new vs. /:
  1. Intro paragraph isolates the brand promise word ("Kokoro") at display
     scale, embedded in the run — the "phrase highlight" pattern.
  2. A 心 kanji-mask reveal section: a portrait photograph is revealed
     through the silhouette of the kanji at half-page scale. One quiet
     SOTD-grade moment per page.
  3. The four-pillar module is replaced with sequential cinematic
     narrative beats (Book → Store → App → Journal). Each pillar gets
     a full editorial spread with eyebrow, large heading, framing prose,
     and a CTA. Inspired by /demo-book's NarrativeBeat treatment.
  4. The "What we're making" trio is removed (it's redundant with the
     new pillar beats above).
  5. Two-up articles becomes asymmetric (one larger, one smaller) so the
     grid breathes more like a magazine.
*/

const pillars: {
  num: string;
  label: string;
  href: string;
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
  image: string;
  align: "left" | "right";
}[] = [
  {
    num: "01",
    label: "Book",
    href: "/book",
    eyebrow: "An illustrated story",
    heading: "A small luminous being.",
    body: "Auwa is also a character. A book, ten years in the making, by Eko Maeda. The first chapter is finished. The second is at sea.",
    cta: "Open the book",
    image: "/pillars/book.jpg",
    align: "right",
  },
  {
    num: "02",
    label: "Store",
    href: "/store",
    eyebrow: "Lifetime objects",
    heading: "Made by hand. Made to keep.",
    body: "A quiet marketplace of Japanese craftsman objects, alongside our own small editions. Knives, ceramics, washi, textiles. Things that grow more themselves over time.",
    cta: "Visit the store",
    image: "/pillars/store.jpg",
    align: "left",
  },
  {
    num: "03",
    label: "App",
    href: "/app",
    eyebrow: "A daily practice",
    heading: "Awareness, daily.",
    body: "A short, quiet meeting with how you feel. Auwa reflects it back through a Yamato-language framework, paired with a Kokoro card you can keep. No advice. No streaks.",
    cta: "Join the waitlist",
    image: "/pillars/app.jpg",
    align: "right",
  },
  {
    num: "04",
    label: "Journal",
    href: "/journal",
    eyebrow: "Essays from Japan",
    heading: "A way of seeing.",
    body: "Articles on craftsmen, seasons, philosophy, and slow travel. The everyday Japan that tourist guides miss. Photographed and written by us, on the road.",
    cta: "Read the journal",
    image: "/journal/washi-paper/washi-paper-hero.jpg",
    align: "left",
  },
];

const journalStrip = [
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

function Separator() {
  return (
    <div className="px-6 md:px-12 lg:px-20 xl:px-28">
      <div className="w-full h-[1px] bg-sumi/10" />
    </div>
  );
}

export default function DemoHomePage() {
  return (
    <>
      <main>
        <HeroVideo />

        {/* ── Intro: keyword-led, with phrase highlight on "Kokoro" ── */}
        <section
          id="intro"
          className="relative scroll-mt-16 md:scroll-mt-20 px-6 md:px-12 lg:px-20 xl:px-28 space-section"
        >
          <span
            aria-hidden="true"
            className="hidden lg:block pointer-events-none select-none absolute top-1/2 -translate-y-1/2 lg:right-12 xl:right-20 font-jp-serif leading-none text-sumi/[0.03]"
            style={{ fontSize: "clamp(16rem, 38vw, 30rem)" }}
          >
            心
          </span>
          <div className="relative max-w-[920px]">
            <FadeIn>
              <h1 className="block font-sans text-[12px] tracking-[0.18em] uppercase text-sumi/45 m-0 font-normal">
                Japanese Lifestyle Brand
              </h1>
            </FadeIn>

            {/* Headline-style paragraph with one isolated word at display
                scale ("Kokoro" gets the typographic spotlight). */}
            <FadeIn delay={120}>
              <p className="mt-8 md:mt-10 font-display text-[22px] md:text-[28px] lg:text-[32px] leading-[1.4] tracking-[0.005em] text-sumi">
                Auwa. A Japanese lifestyle brand built on a single, ancient
                idea: that a life force, a{" "}
                <span className="font-display italic text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[0.9] tracking-[0.005em] align-baseline">
                  Kokoro
                </span>
                {", "}resides in all things. In a river, a handmade bowl, the wind
                through bamboo at dusk. A way of noticing again, in a world that
                rarely pauses. Auwa brings this to life through four ways in: a
                journal from Japan, a daily awareness practice, a store of
                objects made with care, and an illustrated world you can step into.
              </p>
            </FadeIn>

            <FadeIn delay={240}>
              <div className="mt-10 md:mt-14">
                <CtaLink href="/journal/the-beginning" variant="primary">
                  The Story
                </CtaLink>
              </div>
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* ── Pullquote 1 ── */}
        <section className="px-10 md:px-12 lg:px-20 xl:px-28 space-breathing">
          <div className="max-w-[1100px] mx-auto text-center">
            <ScrollFadeText
              as="p"
              className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.05] tracking-[0.003em] text-sumi"
              finishAt={0.4}
            >
              &ldquo;What you pay attention to, whether a river or a feeling, you begin to love. What you love, you care for.&rdquo;
            </ScrollFadeText>
          </div>
        </section>

        <Separator />

        {/* ── Kanji mask reveal — the signature SOTD-grade moment ──
            A landscape photograph is masked through the silhouette of 心
            (Kokoro). The kanji is rendered as an SVG with an embedded
            <image> element clipped by the glyph path. */}
        <KanjiMaskReveal />

        <Separator />

        {/* ── Four pillars as cinematic narrative beats (replaces
              EditorialFrames + PillarParade). Each pillar gets a full
              editorial spread alternating sides. ── */}
        <section className="space-section">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 mb-14 md:mb-20">
            <FadeIn>
              <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-sumi/45">
                Four ways in
              </p>
            </FadeIn>
            <FadeIn delay={150}>
              <h2 className="mt-6 max-w-[780px] font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-[0.005em] text-sumi">
                One philosophy, written down four times.
              </h2>
            </FadeIn>
          </div>

          <div className="flex flex-col gap-20 md:gap-32">
            {pillars.map((p) => (
              <PillarBeat key={p.label} {...p} />
            ))}
          </div>
        </section>

        <Separator />

        {/* ── Journal strip ── */}
        <section className="space-section">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 flex items-baseline justify-between gap-6 mb-10 md:mb-14">
            <FadeIn>
              <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi">
                The Journal
              </h2>
            </FadeIn>
            <FadeIn delay={120}>
              <Link
                href="/journal"
                className="group relative inline-flex overflow-hidden font-sans text-[12px] tracking-[0.14em] uppercase text-sumi/50 hover:text-sumi transition-colors duration-500 ease-text-roll"
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
            {journalStrip.map((article) => (
              <Link
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="group block"
                data-cursor="Read"
              >
                <div className="aspect-[4/5] overflow-hidden relative">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 260px, (max-width: 1024px) 280px, 300px"
                    className="object-cover"
                    loading="eager"
                  />
                </div>
                <div className="mt-4 max-w-[90%]">
                  <span className="font-sans text-[12px] tracking-[0.08em] uppercase text-sumi/45">
                    {article.category}
                  </span>
                  <h3 className="mt-1 font-display text-[18px] md:text-[20px] leading-[1.25] tracking-[0.01em] text-sumi">
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

        <Separator />

        <MicroSeasonFeature />

        {/* ── Pullquote 2 ── */}
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

        {/* ── Asymmetric two-up articles (large + small) ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-section">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6 lg:gap-8">
            <FadeIn variant="reveal" revealDistance={40} className="md:col-span-8">
              <Link
                href="/journal/the-onsen-lesson"
                className="group block"
                data-cursor="Read"
              >
                <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden">
                  <Image
                    src="/journal/onsen-lesson/onsen-lesson-hero.jpg"
                    alt="The Onsen Lesson"
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sumi/45 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-10">
                    <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-white/75">
                      Featured essay
                    </p>
                    <h3 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05] tracking-[0.005em] text-white">
                      The Onsen Lesson.
                    </h3>
                  </div>
                </div>
              </Link>
            </FadeIn>
            <FadeIn
              variant="reveal"
              revealDistance={40}
              delay={STAGGER.grid}
              className="md:col-span-4"
            >
              <Link
                href="/journal/nozawa-fire-festival"
                className="group block"
                data-cursor="Read"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/journal/nozawa-festival/nozawa-festival-hero.jpg"
                    alt="Nozawa Fire Festival"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sumi/45 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6 md:p-8">
                    <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-white/75">
                      Seasons
                    </p>
                    <h3 className="mt-3 font-display text-[24px] md:text-[28px] leading-[1.1] tracking-[0.005em] text-white">
                      Nozawa Fire.
                    </h3>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>

        <VideoMoment />

        <div className="h-16 md:h-24" aria-hidden="true" />
      </main>
      <Footer />
    </>
  );
}

/* ── Pillar narrative beat ── */
function PillarBeat({
  num,
  label,
  href,
  eyebrow,
  heading,
  body,
  cta,
  image,
  align,
}: {
  num: string;
  label: string;
  href: string;
  eyebrow: string;
  heading: string;
  body: string;
  cta: string;
  image: string;
  align: "left" | "right";
}) {
  const imageOnLeft = align === "right";
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-20 items-center">
        <FadeIn
          variant="reveal"
          revealDistance={40}
          className={`${imageOnLeft ? "md:order-1 md:col-span-7" : "md:order-2 md:col-span-7"} relative aspect-[5/4] md:aspect-[4/3] overflow-hidden`}
        >
          <Link href={href} className="group block w-full h-full" data-cursor="Open">
            <Image
              src={image}
              alt={label}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </Link>
        </FadeIn>
        <div className={imageOnLeft ? "md:order-2 md:col-span-5" : "md:order-1 md:col-span-5"}>
          <FadeIn>
            <div className="flex items-baseline gap-4">
              <span className="font-sans tabular-nums text-[12px] tracking-[0.18em] uppercase text-sumi/45">
                {num}
              </span>
              <span className="font-sans text-[12px] tracking-[0.22em] uppercase text-sumi/55">
                {eyebrow}
              </span>
            </div>
          </FadeIn>
          <TextReveal
            as="h3"
            className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[0.005em] text-sumi"
            stagger={90}
          >
            {heading}
          </TextReveal>
          <FadeIn delay={400}>
            <p className="mt-8 font-display text-[18px] md:text-[19px] leading-[1.7] text-sumi/70 max-w-[440px]">
              {body}
            </p>
          </FadeIn>
          <FadeIn delay={550}>
            <div className="mt-10">
              <CtaLink href={href} variant="secondary">
                {cta}
              </CtaLink>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── Kanji mask reveal: a photograph clipped through the silhouette of
   心. SVG <text> with a font, used as a mask for an embedded <image>.
   The kanji silhouette acts as a window onto the photograph beneath. */
function KanjiMaskReveal() {
  return (
    <section className="relative px-6 md:px-12 lg:px-20 xl:px-28 space-breathing overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          <FadeIn className="md:col-span-7">
            <div className="relative w-full aspect-[1/1] md:aspect-[5/4]">
              <svg
                viewBox="0 0 1000 800"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  <mask id="kanji-mask">
                    <rect width="1000" height="800" fill="black" />
                    <text
                      x="500"
                      y="640"
                      textAnchor="middle"
                      fontFamily="var(--font-jp-serif)"
                      fontWeight="600"
                      fontSize="900"
                      fill="white"
                    >
                      心
                    </text>
                  </mask>
                </defs>
                <image
                  href="/journal/koya-san/koya-san-hero.jpg"
                  width="1000"
                  height="800"
                  preserveAspectRatio="xMidYMid slice"
                  mask="url(#kanji-mask)"
                />
              </svg>
            </div>
          </FadeIn>
          <div className="md:col-span-5">
            <FadeIn>
              <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-sumi/45">
                心 / Kokoro
              </p>
            </FadeIn>
            <TextReveal
              as="h2"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] tracking-[0.005em] text-sumi"
              stagger={90}
            >
              The word that holds it all.
            </TextReveal>
            <FadeIn delay={400}>
              <p className="mt-8 font-display text-[18px] md:text-[19px] leading-[1.7] text-sumi/70 max-w-[440px]">
                Where English splits the inner life into heart, mind, soul and spirit, Japanese binds them in one word. Kokoro: the felt centre of a person, an object, a place. The thing you sense before you can name.
              </p>
            </FadeIn>
            <FadeIn delay={550}>
              <div className="mt-10">
                <CtaLink href="/journal/yaoyorozu-no-kami" variant="plain">
                  The philosophy
                </CtaLink>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
