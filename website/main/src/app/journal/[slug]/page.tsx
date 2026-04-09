import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import Link from "next/link";

/* Placeholder article data — will come from Sanity */
const article = {
  title: "The knife maker of Seki",
  subtitle: "A lifetime spent perfecting a single blade.",
  category: "Arts & Culture",
  issue: "Issue 59, Clean",
  author: "Selena Takigawa Hoy",
  photographer: "Ju Yeon Lee",
  publishedAt: "2026-04-07",
  heroImage: null as string | null,
  body: [
    "Many of the world's great craftsmen have transformed making from an act of production to something that leans closer to the spiritual. In the workshops of Seki, a small city in Gifu prefecture long known as Japan's capital of bladesmithing, the air carries the scent of steel and charcoal. The sound of hammers against anvils has echoed through these streets for seven hundred years.",
    "Takeshi Saji is one of fewer than thirty master bladesmiths still working in Seki. His knives take weeks to make. Each blade is hand-forged from layers of carbon steel, folded and hammered until the metal achieves a pattern as unique as a fingerprint. He learned from his father, who learned from his father before him. The lineage stretches back to an era when swordsmiths served feudal lords.",
    "\"A knife is not a tool,\" Saji says, turning a finished gyuto in the light of his workshop window. \"It is a relationship. Between the steel and the fire, between the maker and the user, between the hand and the food it prepares. Every time someone uses my knife, they are completing something I started.\"",
    "That is the question at the heart of Japanese craft: not how to make something faster or cheaper, but how to make something that carries the spirit of its maker into the life of its owner. The Japanese word for this is kokoro — heart, soul, spirit — and in the Shinto tradition, it lives within all things. Not just people and animals, but objects. A knife forged with decades of accumulated skill and attention does not merely cut. It participates.",
    "But whether objects made by hand in an age of mass production can sustain their makers has historically been a difficult question. Many of Seki's workshops have closed in the past two decades, unable to compete with factory production. The young people leave for Nagoya or Tokyo. The masters grow older.",
    "Saji is pragmatic about this. \"I don't make knives because the market demands them. I make them because this is what I know how to do, and because stopping would mean losing something that cannot be recovered once it's gone. A seven-hundred-year tradition doesn't pause. It either continues or it ends.\"",
    "Those who have used a Saji knife describe the experience in terms that sound almost absurd when applied to a kitchen implement. The weight. The way it finds the grain of a vegetable without being guided. The sound it makes against a hinoki cutting board — not a thud but a whisper. These are not marketing claims. They are the accumulated observations of people who pay attention to the objects they live with.",
    "There is something instructive in this for anyone navigating a world that moves faster each year. The knife maker of Seki does not optimise. He does not scale. He does not pivot. He makes one thing, as well as he possibly can, and trusts that the world contains enough people who can tell the difference.",
  ],
};

export default function ArticlePage() {
  return (
    <>
      <Header />
      <main className="pt-16 md:pt-20">

        {/* ── Hero: split layout ── */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[70vh] bg-surface-raised overflow-hidden">
              {article.heroImage ? (
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100 to-surface-raised" />
              )}
            </div>

            {/* Title */}
            <div className="flex flex-col justify-end px-6 md:px-10 lg:px-14 py-10 md:py-16">
              <FadeIn>
                <h1 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] tracking-[0.01em] text-void">
                  {article.title}
                </h1>
              </FadeIn>
              <FadeIn delay={100}>
                <p className="mt-4 md:mt-6 font-display text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.35] text-void/60">
                  {article.subtitle}
                </p>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* ── Meta row ── */}
        <FadeIn delay={200}>
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 py-6 md:py-8 border-b border-void/8">
            <div className="flex flex-wrap items-center justify-between gap-4 text-void/40">
              <div className="flex flex-wrap items-center gap-6 md:gap-10">
                <span className="font-sans text-[11px] tracking-[0.08em] uppercase">
                  {article.issue}
                </span>
                <span className="font-sans text-[11px] tracking-[0.08em] uppercase">
                  {article.category}
                </span>
                <span className="font-sans text-[11px] tracking-[0.02em]">
                  Words {article.author.toUpperCase()}
                  <br className="md:hidden" />
                  <span className="hidden md:inline">&emsp;</span>
                  Photos {article.photographer.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-sans text-[11px] tracking-[0.06em] uppercase">Share</span>
                {["FB", "PN", "X"].map((platform) => (
                  <button
                    key={platform}
                    className="font-sans text-[11px] tracking-[0.02em] hover:text-void transition-colors duration-300"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Article body ── */}
        <article className="mx-auto max-w-[680px] px-6 md:px-10 py-12 md:py-20">
          {article.body.map((paragraph, i) => (
            <FadeIn key={i} delay={Math.min(i * 50, 300)}>
              <p className="font-display text-[17px] md:text-[18px] leading-[1.75] text-void/85 mb-6 md:mb-8">
                {paragraph}
              </p>
            </FadeIn>
          ))}
        </article>

        {/* ── Author ── */}
        <div className="mx-auto max-w-[680px] px-6 md:px-10 pb-12 md:pb-16 border-b border-void/8">
          <p className="font-sans text-[12px] tracking-[0.06em] text-void/35 uppercase">
            Words by {article.author}
          </p>
        </div>

        {/* ── Related articles ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24">
          <h2 className="font-display text-[20px] md:text-[22px] text-void/50 mb-8 md:mb-12">
            Continue reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: "Objects with kokoro", category: "Craft" },
              { title: "Temple mornings", category: "Travel" },
              { title: "Everything has kokoro", category: "Philosophy" },
            ].map((related) => (
              <Link
                key={related.title}
                href={`/journal/${related.title.toLowerCase().replace(/ /g, "-")}`}
                className="group block"
              >
                <div className="aspect-[4/5] bg-surface-raised rounded-sm overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/40 to-surface-raised" />
                </div>
                <div className="mt-4">
                  <span className="font-sans text-[11px] tracking-[0.08em] uppercase text-void/40">
                    {related.category}
                  </span>
                  <h3 className="mt-1.5 font-display text-[18px] md:text-[20px] leading-[1.25] text-void group-hover:text-void/70 transition-colors duration-300">
                    {related.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Newsletter ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24">
          <div className="max-w-[480px] mx-auto text-center">
            <h2 className="font-display text-[28px] md:text-[32px] tracking-[0.01em] text-void">
              Stay close.
            </h2>
            <form className="mt-8 max-w-[400px] mx-auto">
              <div className="flex items-center gap-4 border-b border-void/20 pb-3 focus-within:border-void/50 transition-colors duration-300">
                <input
                  type="email"
                  placeholder="Your email address"
                  required
                  className="flex-1 bg-transparent font-sans text-[14px] text-void placeholder:text-void/35 outline-none text-center"
                />
                <button
                  type="submit"
                  className="font-sans text-[13px] tracking-[0.02em] text-void hover:text-void/70 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
