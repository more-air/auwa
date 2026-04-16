import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { MicroSeasonFeature } from "@/components/micro-season-feature";
import { HeroFlipbookV4b } from "@/components/hero-flipbook-v4b";
import { VideoMoment } from "@/components/video-moment";
import { EmailCapture } from "@/components/email-capture";
import { HeroVideoIntro } from "@/components/hero-video-intro";
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

/* ─── Separator ─── */

function Separator() {
  return (
    <div className="px-6 md:px-12 lg:px-20 xl:px-28">
      <div className="w-full h-[1px] bg-void/10" />
    </div>
  );
}

/* ─── Page ─── */

export default function Home() {
  return (
    <>
      <Header disableFlipbookStick transparent />
      <main>

        {/* ── Full-bleed AUWA face video ── */}
        <HeroVideoIntro />

        {/* ── Brand intro module ── */}
        <section className="px-12 md:px-16 lg:px-20 xl:px-28 py-16 md:py-24">
          <div className="max-w-[560px] mx-auto text-center">
            <FadeIn>
              <h2 className="font-display text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] tracking-[0.01em] text-void">
                Meet AUWA.
              </h2>
            </FadeIn>
            <FadeIn delay={150}>
              <p className="mt-6 md:mt-8 font-display text-[18px] md:text-[19px] leading-[1.65] text-void/55">
                A character born from the Japanese belief that a life force resides in all things. Craftsman objects, editorials from Japan, a daily awareness app, and illustrated stories for the quietly curious.
              </p>
            </FadeIn>
            <FadeIn delay={300}>
              <Link
                href="/about"
                className="inline-block mt-8 md:mt-10 font-sans text-[13px] tracking-[0.08em] uppercase text-void/50 border border-void/15 px-6 py-3 hover:text-void hover:border-void/30 transition-all duration-300"
              >
                Our story
              </Link>
            </FadeIn>
          </div>
        </section>

        <Separator />

        {/* ── Stacked-card flipbook hero ── */}
        <HeroFlipbookV4b fullHeight />

        <div className="h-16 md:h-24" />
        <Separator />

        {/* ── Latest articles (horizontal scroll) ── */}
        <section className="py-16 md:py-24">
          <div className="flex gap-5 md:gap-6 lg:gap-8 overflow-x-auto pb-4 px-6 md:px-12 lg:px-20 xl:px-28 scrollbar-hide">
            {latestArticles.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 60} className="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px]">
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

        {/* ── Micro-season ── */}
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
                        className="absolute inset-0 w-full h-full object-cover "
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/60 to-surface-raised" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 md:p-6">
                      <h3 className="font-display text-[20px] md:text-[22px] tracking-[0.01em] text-white">
                        {pillar.label}
                      </h3>
                      <p className="mt-1 font-sans text-[13px] text-white/60">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        <Separator />

        {/* ── Email capture ── */}
        <EmailCapture />

        <Separator />

        {/* ── Two-up articles (Onsen + Nozawa) ── */}
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
                        className="absolute inset-0 w-full h-full object-cover "
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/60 to-surface-raised" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6 md:p-8">
                      <h3 className="font-display text-[22px] md:text-[26px] leading-[1.2] text-white">
                        {article.title}
                      </h3>
                      <p className="mt-2 font-sans text-[14px] text-white/70 group-hover:text-white/90 transition-colors duration-300">
                        Read the essay
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        <Separator />

        {/* ── Video moment: Meet AUWA ── */}
        <VideoMoment />

      </main>
      <Footer />
    </>
  );
}
