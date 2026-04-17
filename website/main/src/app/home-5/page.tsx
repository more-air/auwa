import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { MicroSeasonFeature } from "@/components/micro-season-feature";
import { HeroFlipbookV4b } from "@/components/hero-flipbook-v4b";
import { VideoMoment } from "@/components/video-moment";
import { HeroVideoIntroV2 } from "@/components/hero-video-intro-v2";
import { ScrollFadeText } from "@/components/scroll-fade-text";
import { CtaLink } from "@/components/cta-link";
import Link from "next/link";

/* ─── Placeholder data (will come from Sanity CMS) ─── */

const pillars = [
  { label: "Book", description: "Illustrated stories", href: "/book", image: "/pillars/book.jpg" },
  { label: "Store", description: "Craftsman objects", href: "/store", image: "/pillars/store.jpg" },
  { label: "App", description: "Daily awareness", href: "/app", image: "/pillars/app.jpg" },
];

const latestArticles: { title: string; excerpt: string; category: string; issue: string; slug: string; image?: string }[] = [
  { title: "The Beginning", excerpt: "Light in a dark forest. A dream that wouldn't let go.", category: "Philosophy", issue: "Issue 11", slug: "the-beginning", image: "/journal/auwa-book/auwa-book-hero.jpg" },
  { title: "Yaoyorozu no Kami", excerpt: "Eight million gods. Even in things you overlook.", category: "Philosophy", issue: "Issue 10", slug: "yaoyorozu-no-kami", image: "/journal/yaoyorozu-no-kami/yaoyorozu-no-kami-hero.jpg" },
  { title: "Nozawa Fire Festival", excerpt: "On the night a village burned a shrine.", category: "Seasons", issue: "Issue 09", slug: "nozawa-fire-festival", image: "/journal/nozawa-fire-festival/nozawa-fire-festival-hero.jpg" },
  { title: "Shigefusa", excerpt: "Waiting two years for a knife, and what arrived.", category: "Craft", issue: "Issue 08", slug: "shigefusa-knife", image: "/journal/shigefusa/shigefusa-hero.jpg" },
  { title: "Oroku-gushi", excerpt: "Wood that breaks axes. Named after a girl.", category: "Craft", issue: "Issue 07", slug: "oroku-gushi", image: "/journal/oroko/oroko-hero.jpg" },
  { title: "Koya-san", excerpt: "Prayers chanted on this mountain for 1,200 years.", category: "Travel", issue: "Issue 06", slug: "koya-san", image: "/journal/koya-san/koya-san-hero.jpg" },
  { title: "72 Seasons", excerpt: "The calendar nobody follows. The world forgot.", category: "Seasons", issue: "Issue 05", slug: "72-seasons", image: "/journal/72-seasons/72-seasons-hero.jpg" },
  { title: "The Onsen Lesson", excerpt: "What hot water teaches about being alive.", category: "Philosophy", issue: "Issue 04", slug: "the-onsen-lesson", image: "/journal/the-onsen-lesson/the-onsen-lesson-hero.jpg" },
  { title: "Making Washi", excerpt: "Mulberry bark, cold water. A thousand-year gesture.", category: "Craft", issue: "Issue 03", slug: "making-washi", image: "/journal/washi/washi-hero.jpg" },
  { title: "Narai in Snow", excerpt: "Four hundred years. The same street, unchanged.", category: "Travel", issue: "Issue 02", slug: "narai-juku", image: "/journal/narai-juku/narai-juku-hero.jpg" },
  { title: "Yakushima", excerpt: "The island where the trees outlived history.", category: "Travel", issue: "Issue 01", slug: "yakushima-island", image: "/journal/yakushima-island/yakushima-island-hero.jpg" },
];

const twoUpArticles = [
  { title: "The Onsen Lesson", excerpt: "What hot water teaches about being alive.", slug: "the-onsen-lesson", image: "/journal/the-onsen-lesson/the-onsen-lesson-hero.jpg" },
  { title: "Nozawa Fire Festival", excerpt: "On the night a village burned a shrine.", slug: "nozawa-fire-festival", image: "/journal/nozawa-fire-festival/nozawa-fire-festival-hero.jpg" },
];

function Separator() {
  return (
    <div className="px-6 md:px-12 lg:px-20 xl:px-28">
      <div className="w-full h-[1px] bg-void/10" />
    </div>
  );
}

export default function Home5() {
  return (
    <>
      <Header disableFlipbookStick transparent />
      <main>

        {/* ── Full-bleed AUWA face video (mobile full-height, chevron) ── */}
        <HeroVideoIntroV2 />

        {/* ── Revised intro block — left-aligned eyebrow + larger paragraph, no CTA ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pt-16 md:pt-28 pb-20 md:pb-32">
          <div className="max-w-[880px]">
            <FadeIn>
              <span className="block font-sans text-[12px] tracking-[0.18em] uppercase text-void/40">
                Our philosophy
              </span>
            </FadeIn>
            <ScrollFadeText
              as="p"
              className="mt-6 md:mt-10 font-display text-[22px] md:text-[28px] lg:text-[32px] leading-[1.35] tracking-[0.005em] text-void"
            >
              AUWA is a quiet return to the Japanese belief that a life force, a kokoro, resides in all things. Not only in people, but in a river, a handmade bowl, the wind through bamboo at dusk. Four doors into one world: craftsman objects, stories, editorial from Japan, and a daily practice for paying attention.
            </ScrollFadeText>
          </div>
        </section>

        <Separator />

        {/* ── Big pullquote block ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-28 md:py-44">
          <div className="max-w-[1100px] mx-auto text-center">
            <ScrollFadeText
              as="p"
              className="font-display text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.15] tracking-[0.005em] text-void"
              finishAt={0.4}
            >
              &ldquo;If we lived in a world where the soul in all things was visible, it would be a much kinder place.&rdquo;
            </ScrollFadeText>
          </div>
        </section>

        <Separator />

        {/* ── Stacked-card flipbook hero ── */}
        <HeroFlipbookV4b fullHeight />

        {/* ── Latest from the Journal ── */}
        <section className="pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28">
            <div className="w-full h-[1px] bg-void/10" />
          </div>
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 flex items-baseline justify-between gap-6 mt-8 md:mt-10 mb-10 md:mb-14">
            <FadeIn>
              <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-void">
                The Journal
              </h2>
            </FadeIn>
            <FadeIn delay={120}>
              <Link
                href="/journal"
                className="group relative inline-flex overflow-hidden font-sans text-[12px] tracking-[0.14em] uppercase text-void/50 hover:text-void transition-colors duration-500"
              >
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full">
                  View all
                </span>
                <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-y-0">
                  View all
                </span>
              </Link>
            </FadeIn>
          </div>
          <div className="flex gap-5 md:gap-6 lg:gap-8 overflow-x-auto pb-4 px-6 md:px-12 lg:px-20 xl:px-28 scrollbar-hide">
            {latestArticles.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 60} variant="reveal" className="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px]">
                <Link href={`/journal/${article.slug}`} className="group block" data-cursor="Read">
                  <div className="aspect-[4/5] bg-surface-raised rounded-xl overflow-hidden relative">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/40 to-surface-raised" />
                    )}
                  </div>
                  <div className="mt-4 max-w-[90%]">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40">
                        {article.category}
                      </span>
                    </div>
                    <h3 className="font-display text-[18px] md:text-[20px] leading-[1.25] tracking-[0.01em] text-void">
                      {article.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-[14px] leading-[1.5] text-void/55 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        <Separator />

        <MicroSeasonFeature />

        <Separator />

        {/* ── Three pillars ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.label} delay={i * 150} variant="reveal">
                <Link href={pillar.href} className="group block" data-cursor="Explore">
                  <div className="relative aspect-[4/5] bg-surface-raised rounded-xl overflow-hidden">
                    {pillar.image ? (
                      <img
                        src={pillar.image}
                        alt={pillar.label}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/60 to-surface-raised" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-void/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                      <h3 className="font-display text-[32px] md:text-[40px] leading-[1.05] tracking-[0.005em] text-white">
                        {pillar.label}
                      </h3>
                      <p className="mt-2 font-sans text-[14px] md:text-[15px] tracking-[0.01em] text-white">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Breather: mid-page pullquote + CTA ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-28 md:py-44">
          <div className="max-w-[1100px] mx-auto text-center">
            <ScrollFadeText
              as="p"
              className="font-display text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.2] tracking-[0.005em] text-void"
              finishAt={0.5}
            >
              &ldquo;In every handmade bowl, in every river, in every person you pass, a kokoro is waiting to be seen.&rdquo;
            </ScrollFadeText>
            <FadeIn delay={200}>
              <div className="mt-12 md:mt-16 inline-block">
                <CtaLink href="/about">Our philosophy</CtaLink>
              </div>
            </FadeIn>
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
            {twoUpArticles.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 150} variant="reveal">
                <Link href={`/journal/${article.slug}`} className="group block" data-cursor="Read">
                  <div className="relative aspect-[4/5] bg-surface-raised rounded-xl overflow-hidden">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/60 to-surface-raised" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-void/10 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                      <h3 className="font-display text-[32px] md:text-[40px] leading-[1.05] tracking-[0.005em] text-white">
                        {article.title}
                      </h3>
                      <p className="mt-3 font-sans text-[13px] tracking-[0.08em] uppercase text-white">
                        Read the essay
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        <VideoMoment />

        <div className="h-16 md:h-24" />

      </main>
      <Footer />
    </>
  );
}
