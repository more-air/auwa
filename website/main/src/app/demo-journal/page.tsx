"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { ScrollFadeText } from "@/components/scroll-fade-text";
import { ImageFade } from "@/components/image-fade";
import { Footer } from "@/components/footer";
import { STAGGER } from "@/lib/motion";

/*
  /demo-journal — proposed upgrades to the live /journal index.

  What's new vs. /journal:
  1. Editorial intro section: explains what the journal is and why,
     before the grid. Right now /journal is title + filters + grid;
     visitors landing fresh have no context.
  2. Featured article hero: a full-bleed magazine spread for the
     canonical/most recent piece. Sets the tonal benchmark.
  3. Broken grid: instead of a uniform 3-column, the article list mixes
     a 2-up large row with the standard grid, plus a typographic
     interlude (a 心 lockup with a quote) midway. Kinfolk / Cereal
     rhythm.
  4. Filter chips kept, with a slightly more editorial styling.
*/

const categories = ["All", "Seasons", "Craft", "Philosophy", "Travel"];

const allArticles: { title: string; excerpt: string; category: string; slug: string; image: string }[] = [
  { title: "Yaoyorozu no Kami", excerpt: "Eight million gods live in the world around you.", category: "Philosophy", slug: "yaoyorozu-no-kami", image: "/journal/yaoyorozu-no-kami/yaoyorozu-no-kami-hero.jpg" },
  { title: "Shigefusa", excerpt: "On waiting over a year for a knife, and what arrived.", category: "Craft", slug: "shigefusa-knife", image: "/journal/shigefusa-knife/shigefusa-knife-hero.jpg" },
  { title: "Nozawa Fire Festival", excerpt: "A village renews its bond with its guardian spirits.", category: "Seasons", slug: "nozawa-fire-festival", image: "/journal/nozawa-festival/nozawa-festival-hero.jpg" },
  { title: "Oroku-gushi", excerpt: "Made from wood that breaks axes. Named after a girl.", category: "Craft", slug: "oroku-gushi", image: "/journal/oroku-gushi/oroku-gushi-hero.jpg" },
  { title: "Koya-san", excerpt: "Prayers chanted on this mountain for 1,200 years.", category: "Travel", slug: "koya-san", image: "/journal/koya-san/koya-san-hero.jpg" },
  { title: "72 Seasons", excerpt: "Five-day seasons, each one worth noticing.", category: "Seasons", slug: "72-seasons", image: "/journal/72-seasons/72-seasons-hero.jpg" },
  { title: "The Onsen Lesson", excerpt: "What hot water and strangers teach about being alive.", category: "Philosophy", slug: "the-onsen-lesson", image: "/journal/onsen-lesson/onsen-lesson-hero.jpg" },
  { title: "Making Washi", excerpt: "Cold water, mulberry bark, a thousand-year gesture.", category: "Craft", slug: "making-washi", image: "/journal/washi-paper/washi-paper-hero.jpg" },
  { title: "Narai in Snow", excerpt: "Four hundred years of the same street, unchanged.", category: "Travel", slug: "narai-juku", image: "/journal/narai-juku/narai-juku-hero.jpg" },
  { title: "Yakushima", excerpt: "On the island where the trees outlived history.", category: "Travel", slug: "yakushima-island", image: "/journal/yakushima-island/yakushima-island-hero.jpg" },
  { title: "The Beginning", excerpt: "Light in a dark forest. A dream that wouldn't let go.", category: "Philosophy", slug: "the-beginning", image: "/journal/auwa-book/auwa-book-hero.jpg" },
];

export default function DemoJournalPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All"
    ? allArticles
    : allArticles.filter((a) => a.category === activeCategory);

  // Featured = first article. Two-up = next two. Rest goes into the
  // grid, with a typographic interlude inserted after row 2.
  const [featured, ...rest] = filtered;
  const twoUp = rest.slice(0, 2);
  const beforeInterlude = rest.slice(2, 6);
  const afterInterlude = rest.slice(6);

  return (
    <>
      <main>
      {/* ── Hero with intro ── */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 pt-12 md:pt-16 pb-16 md:pb-24">
        <div className="max-w-[1300px] mx-auto">
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-sumi/45">
              Essays from Japan
            </p>
          </FadeIn>
          <TextReveal
            as="h1"
            className="mt-6 font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.98] tracking-[0.005em] text-sumi"
            stagger={90}
          >
            The Journal.
          </TextReveal>
          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
            <FadeIn delay={250} className="md:col-span-7">
              <p className="font-display text-[19px] md:text-[22px] leading-[1.65] text-sumi/80">
                Quiet writing on Japanese philosophy, craft, the seasons, and the long way around. Tom photographs and writes; Rieko adds the cultural ear that keeps it honest. New essays land on a slow rhythm — three or four a month, sometimes fewer.
              </p>
            </FadeIn>
            <FadeIn delay={400} className="md:col-span-5">
              <p className="font-display text-[16px] md:text-[17px] leading-[1.7] text-sumi/55">
                A place to read in between things. To pause for a minute, somewhere quiet, and step into a country that the tourist guides miss. We&rsquo;d rather have ten people read closely than a thousand pass through.
              </p>
            </FadeIn>
          </div>

          {/* Filters */}
          <FadeIn delay={550}>
            <div className="mt-12 md:mt-16 flex flex-wrap gap-x-7 md:gap-x-10 gap-y-4 border-t border-b border-sumi/10 py-5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`group relative inline-flex font-sans text-[13px] tracking-[0.16em] uppercase transition-colors duration-300 cursor-pointer ${
                    cat === activeCategory ? "text-sumi" : "text-sumi/45 hover:text-sumi"
                  }`}
                >
                  <span className="relative inline-block">
                    {cat}
                    {cat === activeCategory && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-2 left-0 right-0 h-[1.5px] bg-sumi"
                      />
                    )}
                  </span>
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Featured spread ── */}
      {featured && (
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 mb-20 md:mb-32">
          <div className="max-w-[1300px] mx-auto">
            <FadeIn>
              <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-sumi/45 mb-6 md:mb-8">
                Featured essay
              </p>
            </FadeIn>
            <FadeIn variant="reveal" revealDistance={40}>
              <Link
                href={`/journal/${featured.slug}`}
                className="group block"
                data-cursor="Read"
              >
                <div className="relative aspect-[16/10] md:aspect-[16/8] overflow-hidden">
                  <ImageFade
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 1300px"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sumi/55 via-sumi/15 to-transparent" />
                  <div className="absolute inset-0 flex items-end">
                    <div className="p-6 md:p-12 lg:p-16 max-w-[800px]">
                      <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-white/80">
                        {featured.category}
                      </p>
                      <h2 className="mt-4 md:mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.0] tracking-[0.005em] text-white">
                        {featured.title}.
                      </h2>
                      <p className="mt-5 md:mt-7 font-display italic text-[clamp(1.05rem,1.6vw,1.4rem)] leading-[1.5] text-white/85 max-w-[480px]">
                        {featured.excerpt}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── Two-up large row ── */}
      {twoUp.length === 2 && (
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 mb-20 md:mb-32">
          <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {twoUp.map((a, i) => (
              <ArticleCard key={a.slug} article={a} size="large" delay={i * STAGGER.grid} />
            ))}
          </div>
        </section>
      )}

      {/* ── Standard grid (first batch) ── */}
      {beforeInterlude.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 mb-20 md:mb-32">
          <div className="max-w-[1300px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16">
            {beforeInterlude.map((a, i) => (
              <ArticleCard key={a.slug} article={a} delay={Math.min(i * STAGGER.grid, 360)} />
            ))}
          </div>
        </section>
      )}

      {/* ── Typographic interlude: 心 lockup + quote ── */}
      <section className="relative px-6 md:px-12 lg:px-20 xl:px-28 py-24 md:py-44 overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, oklch(0.95 0.005 250 / 0.5) 50%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div className="relative max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 items-center gap-10">
          <div className="md:col-span-7 relative leading-none">
            <FadeIn>
              <span
                aria-hidden="true"
                className="block font-jp-serif text-sumi leading-[0.85]"
                style={{ fontSize: "clamp(12rem, 32vw, 28rem)" }}
              >
                心
              </span>
            </FadeIn>
          </div>
          <div className="md:col-span-5">
            <FadeIn>
              <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-sumi/45">
                A note on Kokoro
              </p>
            </FadeIn>
            <ScrollFadeText
              as="p"
              className="mt-6 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.4] tracking-[0.005em] text-sumi"
              from={0.2}
              finishAt={0.45}
            >
              Every essay below is a small attempt to point at the same thing. Kokoro is what makes a forest feel alive at dawn, what makes a knife outlast the maker, what passes between strangers in a hot bath at midnight without a word.
            </ScrollFadeText>
          </div>
        </div>
      </section>

      {/* ── Standard grid (second batch) ── */}
      {afterInterlude.length > 0 && (
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pt-20 md:pt-32 pb-16 md:pb-24">
          <div className="max-w-[1300px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-16">
            {afterInterlude.map((a, i) => (
              <ArticleCard key={a.slug} article={a} delay={Math.min(i * STAGGER.grid, 360)} />
            ))}
          </div>
        </section>
      )}

      </main>
      <Footer />
    </>
  );
}

function ArticleCard({
  article,
  size = "default",
  delay = 0,
}: {
  article: { title: string; excerpt: string; category: string; slug: string; image: string };
  size?: "default" | "large";
  delay?: number;
}) {
  return (
    <FadeIn delay={delay} variant="reveal" revealDistance={40}>
      <Link href={`/journal/${article.slug}`} className="group block" data-cursor="Read">
        <div className={`overflow-hidden relative ${size === "large" ? "aspect-[5/4]" : "aspect-[4/5]"}`}>
          <ImageFade
            src={article.image}
            alt={article.title}
            fill
            sizes={size === "large" ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 33vw"}
            className="object-cover"
          />
        </div>
        <div className="mt-3 md:mt-4 max-w-[90%]">
          <span className="font-sans text-[11px] md:text-[12px] tracking-[0.08em] uppercase text-sumi/45">
            {article.category}
          </span>
          <h2
            className={`mt-1 md:mt-1.5 font-display ${
              size === "large" ? "text-[22px] md:text-[28px]" : "text-[18px] md:text-[22px]"
            } leading-[1.2] tracking-[0.01em] text-sumi group-hover:text-sumi/70 transition-colors duration-300`}
          >
            {article.title}
          </h2>
          <p className="mt-1 md:mt-1.5 font-sans text-[13px] md:text-[14px] leading-[1.4] md:leading-[1.5] text-sumi/50 line-clamp-2">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </FadeIn>
  );
}
