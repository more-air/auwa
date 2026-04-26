import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { MicroSeasonFeature } from "@/components/micro-season-feature";
import { HeroFlipbook } from "@/components/hero-flipbook";
import { VideoMoment } from "@/components/video-moment";
import { HeroVideo } from "@/components/hero-video";
import { ScrollFadeText } from "@/components/scroll-fade-text";
import { CtaLink } from "@/components/cta-link";
import Link from "next/link";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/*
  Archive of the scroll-driven stacked-card flipbook homepage.
  Kept at /home-1 so the original flipbook hero can still be referenced
  if we want to revisit it. The live root homepage (/) uses the Editorial
  Frames + Pillar Parade hybrid instead — less prone to the iOS jitter
  this module has historically suffered from.
*/

const pillars = [
  { label: "Book", description: "Illustrated stories", href: "/book", image: "/pillars/book.jpg" },
  { label: "Store", description: "Craftsman objects", href: "/store", image: "/pillars/store.jpg" },
  { label: "App", description: "Daily awareness", href: "/app", image: "/pillars/app.jpg" },
];

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
      <div className="w-full h-[1px] bg-void/10" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <main>

        <HeroVideo />

        <section id="intro" className="relative scroll-mt-16 md:scroll-mt-20 px-6 md:px-12 lg:px-20 xl:px-28 pt-16 md:pt-28 pb-20 md:pb-32">
          <span
            aria-hidden="true"
            className="hidden lg:block pointer-events-none select-none absolute top-1/2 -translate-y-1/2 lg:right-12 xl:right-20 font-jp-serif leading-none text-void/[0.03]"
            style={{ fontSize: "clamp(16rem, 38vw, 30rem)" }}
          >
            心
          </span>
          <div className="relative max-w-[880px]">
            <FadeIn>
              <span className="block font-sans text-[12px] tracking-[0.18em] uppercase text-void/40">
                Our philosophy
              </span>
            </FadeIn>
            <ScrollFadeText
              as="p"
              className="mt-6 md:mt-10 font-display text-[22px] md:text-[28px] lg:text-[32px] leading-[1.35] tracking-[0.005em] text-void"
            >
              AUWA. A character, a philosophy, a world. A quiet return to the Japanese belief that a life force, a Kokoro, resides in all things. In a river, a handmade bowl, the wind through bamboo at dusk. A way of noticing again, in a world that rarely pauses. AUWA brings this to life through four expressions: a journal that shifts how you see everyday moments, a daily awareness practice, a store of objects made with care, and an illustrated world you can step into.
            </ScrollFadeText>
            <FadeIn delay={200}>
              <div className="mt-10 md:mt-14">
                <CtaLink href="/journal/the-beginning">The Story</CtaLink>
              </div>
            </FadeIn>
          </div>
        </section>

        <Separator />

        <section className="px-10 md:px-12 lg:px-20 xl:px-28 py-28 md:py-44">
          <div className="max-w-[1100px] mx-auto text-center">
            <ScrollFadeText
              as="p"
              className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.05] tracking-[0.003em] text-void"
              finishAt={0.4}
            >
              &ldquo;What you pay attention to, whether a river or a feeling, you begin to love. What you love, you care for.&rdquo;
            </ScrollFadeText>
          </div>
        </section>

        <Separator />

        {/* ── Stacked-card flipbook hero (archived here) ── */}
        <HeroFlipbook fullHeight />

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
                className="group relative inline-flex overflow-hidden font-sans text-[12px] tracking-[0.14em] uppercase text-void/50 hover:text-void transition-colors duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]"
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
                  <div className="aspect-[4/5] rounded-xl overflow-hidden relative">
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

        <section className="pt-16 md:pt-24 pb-16 md:pb-24">
          <div className="px-6 md:px-12 lg:px-20 xl:px-28">
            <div className="w-full h-[1px] bg-void/10" />
          </div>
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 mt-8 md:mt-10 mb-10 md:mb-14">
            <FadeIn>
              <h2 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-void">
                What we&rsquo;re making
              </h2>
            </FadeIn>
          </div>
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.label} delay={i * 150} variant="reveal">
                <Link href={pillar.href} className="group block" data-cursor="Open">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
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

        <section className="px-10 md:px-12 lg:px-20 xl:px-28 py-28 md:py-44">
          <div className="max-w-[1100px] mx-auto text-center">
            <ScrollFadeText
              as="p"
              className="font-display text-[clamp(2.25rem,6vw,4.75rem)] leading-[1.05] tracking-[0.003em] text-void"
              finishAt={0.5}
            >
              &ldquo;In every handmade bowl, in every river, in every person you pass, a Kokoro is waiting to be seen.&rdquo;
            </ScrollFadeText>
          </div>
        </section>

        <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
            {twoUpArticles.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 150} variant="reveal">
                <Link href={`/journal/${article.slug}`} className="group block" data-cursor="Read">
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
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
                      <p className="mt-3">
                        <span className="relative inline-flex overflow-hidden font-sans text-[13px] tracking-[0.08em] uppercase text-white">
                          <span className="block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full">
                            Read the essay
                          </span>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 flex items-center translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-y-0"
                          >
                            Read the essay
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

        <VideoMoment />

        <div className="h-16 md:h-24" />

      </main>
      <Footer />
    </>
  );
}
