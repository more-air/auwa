import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { MicroSeason } from "@/components/micro-season";
import Link from "next/link";

/* ─── Placeholder data (will come from Sanity CMS) ─── */

const featuredArticle = {
  title: "The Beginning",
  subtitle: "On the story that took years to find its form.",
  slug: "the-beginning",
  category: "Philosophy",
  image: "/journal/auwa-book/auwa-book-hero.jpg",
};

const pillars = [
  { label: "Book", description: "The illustrated universe", href: "/book", image: "/pillars/book.jpg" },
  { label: "Store", description: "Objects with kokoro", href: "/store", image: "/pillars/store.jpg" },
  { label: "App", description: "A daily awareness ritual", href: "/app", image: "/pillars/app.jpg" },
];

const latestArticles: { title: string; excerpt: string; category: string; issue: string; slug: string; image?: string }[] = [
  { title: "The Beginning", excerpt: "On the story that took years to find its form.", category: "Philosophy", issue: "Issue 11", slug: "the-beginning", image: "/journal/auwa-book/auwa-book-hero.jpg" },
  { title: "Yaoyorozu no Kami", excerpt: "Eight million spirits live in everything. You already know they\u2019re there.", category: "Philosophy", issue: "Issue 10", slug: "yaoyorozu-no-kami", image: "/journal/yaoyorozu-no-kami/yaoyorozu-no-kami-hero.jpg" },
  { title: "Nozawa Fire Festival", excerpt: "On the night an entire village tried to burn down a shrine.", category: "Seasons", issue: "Issue 09", slug: "nozawa-fire-festival", image: "/journal/nozawa-fire-festival/nozawa-fire-festival-hero.jpg" },
  { title: "Shigefusa", excerpt: "On waiting two years for a knife, and what arrived.", category: "Craft", issue: "Issue 08", slug: "shigefusa-knife", image: "/journal/shigefusa/shigefusa-hero.jpg" },
  { title: "Oroku-gushi", excerpt: "Made from wood that breaks axes. Named after a girl it healed.", category: "Craft", issue: "Issue 07", slug: "oroku-gushi", image: "/journal/oroko/oroko-hero.jpg" },
  { title: "Koya-san", excerpt: "The same prayers have been chanted on this mountain for 1,200 years.", category: "Travel", issue: "Issue 06", slug: "koya-san", image: "/journal/koya-san/koya-san-hero.jpg" },
  { title: "72 Seasons", excerpt: "Japan didn\u2019t invent the seasons. It just refused to stop counting.", category: "Seasons", issue: "Issue 05", slug: "72-seasons", image: "/journal/72-seasons/72-seasons-hero.jpg" },
  { title: "The Onsen Lesson", excerpt: "What hot water and strangers teach you about being alive.", category: "Philosophy", issue: "Issue 04", slug: "the-onsen-lesson", image: "/journal/the-onsen-lesson/the-onsen-lesson-hero.jpg" },
  { title: "Making Washi", excerpt: "Cold water, mulberry bark, and a gesture repeated for a thousand years.", category: "Craft", issue: "Issue 03", slug: "making-washi", image: "/journal/washi/washi-hero.jpg" },
  { title: "Narai in Snow", excerpt: "Four hundred years of the same street. Nobody thought to change it.", category: "Travel", issue: "Issue 02", slug: "narai-juku", image: "/journal/narai-juku/narai-juku-hero.jpg" },
  { title: "Yakushima", excerpt: "On the island where the trees have been alive longer than history.", category: "Travel", issue: "Issue 01", slug: "yakushima-island", image: "/journal/yakushima-island/yakushima-island-hero.jpg" },
];

const secondFeature = {
  title: "Japan didn\u2019t invent the seasons. It just refused to stop counting.",
  slug: "72-seasons",
  image: "/journal/72-seasons/72-seasons-hero.jpg",
};

const twoUpArticles = [
  { title: "The Onsen Lesson", excerpt: "What hot water and strangers teach you about being alive.", slug: "the-onsen-lesson", image: "/journal/the-onsen-lesson/the-onsen-lesson-hero.jpg" },
  { title: "Nozawa Fire Festival", excerpt: "On the night an entire village tried to burn down a shrine.", slug: "nozawa-fire-festival", image: "/journal/nozawa-fire-festival/nozawa-fire-festival-hero.jpg" },
];

/* ─── Page ─── */

export default function Home() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero headline ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pt-12 md:pt-16 pb-10 md:pb-16">
          <FadeIn>
            <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void max-w-[680px] pr-12 md:pr-0">
              Everything has<br />Kokoro.
            </h1>
          </FadeIn>
          <FadeIn delay={150}>
            <Link
              href="/journal/yaoyorozu-no-kami"
              className="inline-block mt-6 md:mt-8 font-sans text-[14px] tracking-[0.04em] text-void/45 hover:text-void/70 transition-colors duration-300"
            >
              Begin here &rarr;
            </Link>
          </FadeIn>
        </section>

        {/* ── Featured article ── */}
        <section className="pb-16 md:pb-24">
          <FadeIn delay={100}>
            <Link href={`/journal/${featuredArticle.slug}`} className="group block">
              <div className="relative aspect-[4/5] bg-surface-raised overflow-hidden">
                {featuredArticle.image ? (
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100 to-surface-raised" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-12 lg:p-20 xl:px-28 xl:pb-14 max-w-[700px]">
                  <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] text-white">
                    {featuredArticle.title}:
                  </h2>
                  <p className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.15] text-white mt-2">
                    {featuredArticle.subtitle}
                  </p>
                </div>
              </div>
            </Link>
          </FadeIn>
        </section>

        {/* ── Three pillars ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {pillars.map((pillar, i) => (
              <FadeIn key={pillar.label} delay={i * 80}>
                <Link href={pillar.href} className="group block">
                  <div className="relative aspect-[4/5] bg-surface-raised overflow-hidden">
                    {pillar.image ? (
                      <img
                        src={pillar.image}
                        alt={pillar.label}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/60 to-surface-raised" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-void/40 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 md:p-6">
                      <h3 className="font-display text-[20px] md:text-[22px] tracking-[0.01em] text-white">
                        {pillar.label}
                      </h3>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── Latest articles (horizontal scroll) ── */}
        <section className="pb-16 md:pb-24">
          <div className="flex gap-5 md:gap-6 lg:gap-8 overflow-x-auto pb-4 px-6 md:px-12 lg:px-20 xl:px-28 scrollbar-hide">
            {latestArticles.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 60} className="flex-shrink-0 w-[260px] md:w-[280px] lg:w-[300px]">
                <Link href={`/journal/${article.slug}`} className="group block">
                  <div className="aspect-[4/5] bg-surface-raised overflow-hidden relative">
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

        {/* ── Second feature image ── */}
        <section className="pb-16 md:pb-24">
          <FadeIn>
            <Link href={`/journal/${secondFeature.slug}`} className="group block">
              <div className="relative aspect-[4/5] bg-surface-raised overflow-hidden">
                {secondFeature.image ? (
                  <img
                    src={secondFeature.image}
                    alt={secondFeature.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100 to-surface-raised" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-void/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-12 lg:p-20 xl:px-28 xl:pb-14 max-w-[700px]">
                  <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] text-white">
                    72 Seasons:
                  </h2>
                  <p className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.15] text-white mt-2">
                    {secondFeature.title}
                  </p>
                </div>
              </div>
            </Link>
          </FadeIn>
        </section>

        {/* ── Micro-season ── */}
        <MicroSeason />

        {/* ── Two-up articles ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
            {twoUpArticles.map((article, i) => (
              <FadeIn key={article.slug} delay={i * 100}>
                <Link href={`/journal/${article.slug}`} className="group block">
                  <div className="relative aspect-[4/5] bg-surface-raised overflow-hidden">
                    {article.image ? (
                      <img
                        src={article.image}
                        alt={article.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
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

      </main>
      <Footer />
    </>
  );
}
