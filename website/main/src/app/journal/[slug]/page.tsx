import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import Link from "next/link";

/* ─── Article data (will come from Sanity CMS) ─── */

type ContentBlock =
  | { type: "text"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "pullquote"; text: string };

const articles: Record<
  string,
  {
    title: string;
    subtitle: string;
    category: string;
    issue: string;
    author: string;
    photographer: string;
    publishedAt: string;
    heroImage: string | null;
    content: ContentBlock[];
  }
> = {
  "shigefusa-knife": {
    title: "Shigefusa",
    subtitle: "On waiting two years for a knife, and what arrived.",
    category: "Craft",
    issue: "Issue 01",
    author: "Tom Vining",
    photographer: "Tom Vining",
    publishedAt: "2026-04-09",
    heroImage: "/journal/shigefusa/shigefusa-hero.jpg",
    content: [
      {
        type: "text",
        text: "The knife arrived on a Tuesday in June, two years after we ordered it. No tracking number, no shipping notification. Just a card from the shop in Niigata saying it was ready, and then a box at the door wrapped in brown paper with that particular Japanese precision — every fold exact, every edge aligned.",
      },
      {
        type: "text",
        text: "Inside, a kiri wood box. Paulownia, the same timber used to store kimonos and samurai swords, chosen because it breathes with the seasons — expanding in humidity, contracting in dry air — protecting what's inside without suffocating it. On the lid, five characters brushed in sumi ink: 御和牛刀庖丁. Honourable wa-gyuto kitchen knife. The formality of it. As though the box itself understood what it was carrying.",
      },
      {
        type: "image",
        src: "/journal/shigefusa/shigefusa-box.jpg",
        alt: "Shigefusa kitaeji wa-gyuto in its kiri wood presentation box, viewed from above",
        caption: "Kiri wood box with hand-brushed calligraphy. The paulownia timber breathes with the seasons.",
      },
      {
        type: "text",
        text: "We lifted the lid and there it was. A Shigefusa kitaeji wa-gyuto, 210 millimetres of hand-forged Swedish carbon steel, resting on wooden supports. The blade coated in a thin film of tsubaki oil — camellia — applied by hand at the workshop to protect it during its journey. No plastic. No foam. Just wood cradling steel, and the faint scent of the oil.",
      },
      {
        type: "text",
        text: "You notice things when you've waited this long. The way the light catches the kitaeji pattern — layers of different steels forge-welded together, folded, hammered, and ground until they form a flowing, smoke-like grain across the surface. Every Shigefusa blade has a different pattern. Not by design, but by nature. The same way no two pieces of wood have the same grain. The steel remembers every strike of the hammer.",
      },
      {
        type: "image",
        src: "/journal/shigefusa/shigefusa-blade.jpg",
        alt: "Close-up of the Shigefusa blade showing kitaeji damascus pattern and hand-chiseled kanji",
        caption: "Kitaeji patterning — layers of forge-welded steel, each blade unique. The kanji reads 重房作: made by Shigefusa.",
      },
      {
        type: "text",
        text: "Shigefusa is the working name of a single bladesmith in Sanjo, Niigata prefecture, a region that has produced metalwork for over four hundred years. He doesn't have a website. He doesn't take custom orders. He makes what he makes — gyutos, nakiris, petty knives — in the quantities his hands and his days allow, and when they're finished, they go to a handful of shops in Japan. Waitlists run one to three years. There is no way to expedite.",
      },
      {
        type: "text",
        text: "In a world that has optimised almost everything else, this pace feels radical. Not as a statement. Shigefusa isn't making a point about slow living or mindful consumption. He's simply making knives the way he knows how to make them, at the speed the process requires. The radicalism is ours — we're the ones who've forgotten that some things take the time they take.",
      },
      {
        type: "pullquote",
        text: "The steel remembers every strike of the hammer.",
      },
      {
        type: "text",
        text: "Look closely at the spine and you can see where it's been shaped by hand — not machine-ground to a uniform thickness, but worked with files and stones until the taper feels right under the fingers. The choil, where blade meets handle, is finished clean and smooth. The buffalo horn ferrule sits flush against the ho wood handle with no gap, no glue marks, no imperfection in the joint. These are small details. They are also the entire point.",
      },
      {
        type: "image",
        src: "/journal/shigefusa/shigefusa-tip.jpg",
        alt: "Close-up of the Shigefusa blade tip showing flowing kitaeji steel pattern",
        caption: "The blade tip. The flowing pattern in the steel is a record of the forging — no two are alike.",
      },
      {
        type: "text",
        text: "On the face of the blade, two characters chiseled — not laser-etched, not stamped, but cut into the steel by hand: 重房作. Made by Shigefusa. Centred, precise, permanent. A maker's mark that has appeared on blades from this workshop for generations.",
      },
      {
        type: "text",
        text: "The Japanese have a word for the spirit that lives in things: kokoro. In the Shinto understanding of yaoyorozu no kami, everything possesses it — not just living beings but rivers, mountains, and objects made with enough care and accumulated skill. A mass-produced knife has no kokoro. It can't. It was made by a machine that doesn't know what a knife is for. But a blade that a single person spent days forging, shaping, polishing, and signing — that blade carries something of the person who made it into the life of the person who uses it.",
      },
      {
        type: "text",
        text: "We haven't used ours yet. It sits in its kiri box, coated in camellia oil, in a drawer in our kitchen. We will use it — it was made to be used, and keeping it behind glass would miss the point. But for now, we're still in the early stage of the relationship. Still noticing. Still holding it up to the window to watch the light move across those layered patterns in the steel.",
      },
      {
        type: "text",
        text: "Two years is a long time to wait for a knife. It's also, it turns out, exactly the right amount of time. Long enough to forget about it, then remember. Long enough to wonder if it will ever come, then stop wondering. Long enough that when the box finally arrives on a Tuesday in June, you open it slowly. You pay attention. You notice the oil, the wood, the weight, the grain in the steel, the chiseled name of the man who made it. You notice everything.",
      },
      {
        type: "text",
        text: "Which might be the most valuable thing a knife can teach you.",
      },
    ],
  },
};

/* ─── Fallback article for unknown slugs ─── */
const fallbackArticle = {
  title: "The knife maker of Seki",
  subtitle: "A lifetime spent perfecting a single blade.",
  category: "Craft",
  issue: "Issue 02",
  author: "Tom Vining",
  photographer: "Rieko Vining",
  publishedAt: "2026-04-09",
  heroImage: null,
  content: [
    { type: "text" as const, text: "Many of the world's great craftsmen have transformed making from an act of production to something that leans closer to the spiritual. In the workshops of Seki, a small city in Gifu prefecture long known as Japan's capital of bladesmithing, the air carries the scent of steel and charcoal." },
    { type: "text" as const, text: "The sound of hammers against anvils has echoed through these streets for seven hundred years." },
  ],
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug] || fallbackArticle;

  return (
    <>
      <Header />
      <main>

        {/* ── Hero: split layout ── */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-[4/5] md:aspect-auto md:h-[75vh] bg-surface-raised overflow-hidden">
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
            <div className="flex flex-col justify-center px-6 md:px-10 lg:px-14 py-10 md:py-16">
              <FadeIn>
                <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void">
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
        <article className="py-12 md:py-20">
          {article.content.map((block, i) => {
            if (block.type === "text") {
              return (
                <FadeIn key={i} delay={Math.min(i * 30, 200)}>
                  <p className="mx-auto max-w-[680px] px-6 md:px-10 font-display text-[17px] md:text-[18px] leading-[1.75] text-void/85 mb-6 md:mb-8">
                    {block.text}
                  </p>
                </FadeIn>
              );
            }

            if (block.type === "image") {
              return (
                <FadeIn key={i} delay={Math.min(i * 30, 200)}>
                  <figure className="my-12 md:my-20 mx-auto max-w-[820px] px-6 md:px-10">
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        src={block.src}
                        alt={block.alt}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="mt-4 font-sans text-[12px] leading-[1.6] text-void/40">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                </FadeIn>
              );
            }

            if (block.type === "pullquote") {
              return (
                <FadeIn key={i} delay={Math.min(i * 30, 200)}>
                  <blockquote className="my-12 md:my-20 mx-auto max-w-[680px] px-6 md:px-10">
                    <p className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.3] tracking-[0.01em] text-void/70 italic">
                      {block.text}
                    </p>
                  </blockquote>
                </FadeIn>
              );
            }

            return null;
          })}
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
              { title: "Objects with kokoro", category: "Craft", slug: "objects-with-kokoro" },
              { title: "Temple mornings", category: "Travel", slug: "temple-mornings" },
              { title: "Everything has kokoro", category: "Philosophy", slug: "everything-has-kokoro" },
            ].map((related) => (
              <Link
                key={related.title}
                href={`/journal/${related.slug}`}
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
