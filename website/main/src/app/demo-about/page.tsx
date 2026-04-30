"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { ScrollFadeText } from "@/components/scroll-fade-text";
import { ImageFade } from "@/components/image-fade";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import { Footer } from "@/components/footer";

/*
  /demo-about — proposed upgrades to the live /about.

  What's new vs. /about:
  1. Hero with あうわ as a giant background lockup (the typographic art
     moment recommended for SOTD craft). Sits behind the title at very
     low opacity, scales with viewport.
  2. The name section becomes a kinetic letter breakdown: あ う わ
     each treated as its own block, with a gloss line beneath.
  3. Founders move from text-only bios into editorial spreads — image
     left/right, name and bio alongside, like a magazine profile. Uses
     the washi-paper-rieko photo for Rieko (real, in workshop) and a
     Japan landscape (Tom's photography) as a stand-in until a portrait
     exists.
  4. A timeline beat: "Ten years of becoming" — three small moments
     (drawing, story, brand) tied to dates.
*/

const timeline = [
  {
    year: "2016",
    title: "A drawing",
    body: "Rieko draws a small luminous being. It has no name. It will, eventually, change the rest of her career.",
  },
  {
    year: "2020",
    title: "A story",
    body: "A signal from Earth. Seven stars. A blue flower in a quiet forest. The shape of the first book begins to settle.",
  },
  {
    year: "2026",
    title: "A brand",
    body: "Tom and Rieko commit Auwa to public daylight. Four ways in: app, store, journal, book. One philosophy carried across.",
  },
];

const founders = [
  {
    id: "rieko",
    role: "Co-founder · Creator · Eshi",
    name: "Rieko Maeda",
    nameJp: "前田　恵子",
    image: "/journal/washi-paper/washi-paper-rieko.jpg",
    align: "left" as const,
    body: (
      <>
        Japanese illustrator and designer, also known by her artist name Eko. Creator of the Auwa illustrated universe: years of quiet devotion to stories about a character who reveals the Kokoro in all things. She tells how it came to her in <Link href="/journal/the-beginning" className="underline underline-offset-4 decoration-sumi/30 hover:decoration-sumi/70 transition-colors duration-300">The Beginning</Link>. Raised in Japan, where Kokoro is lived rather than studied. Co-founder of design studio <a href="https://moreair.co" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-sumi/30 hover:decoration-sumi/70 transition-colors duration-300">More Air</a>, and the Japanese voice behind Auwa&rsquo;s store, working with craftsmen across Japan.
      </>
    ),
  },
  {
    id: "tom",
    role: "Co-founder · Producer · Hanmoto",
    name: "Tom Vining",
    nameJp: "トム・ヴァイニング",
    image: "/journal/koya-san/koya-san-hero.jpg",
    align: "right" as const,
    body: (
      <>
        British designer, strategist, and photographer. Twenty years building products in the design and tech industries. Fifteen years of photographing Japan; his images have appeared in Cond&eacute; Nast Traveler, Vogue, Time Out, and across this site. Co-founder of design studio <a href="https://moreair.co" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-sumi/30 hover:decoration-sumi/70 transition-colors duration-300">More Air</a>, leading brand, strategy, and product. For Auwa, he produces the brand, the systems, and co-creates the products that bring Rieko&rsquo;s world to life.
      </>
    ),
  },
];

export default function DemoAboutPage() {
  return (
    <>
      <main>
      {/* ── Hero with あうわ background lockup ── */}
      <section className="relative px-6 md:px-12 lg:px-20 xl:px-28 pt-12 md:pt-20 pb-20 md:pb-32 overflow-hidden">
        {/* Giant あうわ as quiet background. Vertical-rl on desktop for
            a more compositional break. */}
        <span
          aria-hidden="true"
          className="hidden md:block pointer-events-none select-none absolute -right-[6vw] top-[6vh] font-jp-serif leading-[0.8] text-sumi/[0.05] whitespace-nowrap"
          style={{
            fontSize: "clamp(18rem, 32vw, 40rem)",
            writingMode: "vertical-rl",
            textOrientation: "upright",
          }}
        >
          あうわ
        </span>
        <div className="relative max-w-[1100px]">
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-sumi/45">
              About
            </p>
          </FadeIn>
          <h1 className="mt-6 md:mt-8 font-display text-[clamp(3rem,7vw,5.5rem)] leading-[1.0] tracking-[0.005em] text-sumi max-w-[820px]">
            <TextReveal as="span" className="block" stagger={90}>
              The architecture
            </TextReveal>
            <TextReveal as="span" className="block" stagger={90} delay={180}>
              of Kokoro.
            </TextReveal>
          </h1>
          <FadeIn delay={650}>
            <p className="mt-10 md:mt-14 font-display italic text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.5] text-sumi/70 max-w-[640px]">
              A Japanese lifestyle brand made by two people. One drew the world. The other photographs it, writes it, ships it.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Philosophy ── */}
      <section className="mx-auto max-w-[760px] px-6 md:px-10 pb-16 md:pb-24">
        <FadeIn>
          <p className="font-display text-[19px] md:text-[21px] leading-[1.7] text-sumi/85">
            Since ancient times, the Japanese have believed a life force resides in all things. It lives not just in people, but in rivers, handmade bowls, and the shifting light of a season. We call this quality Kokoro (心): a holistic word uniting heart, mind, soul, and spirit. It is felt before it is understood.
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="mt-8 font-display text-[19px] md:text-[21px] leading-[1.7] text-sumi/85">
            Auwa is built on this philosophy. In a culture of speed and disposability, we cultivate awareness of how you feel, the things you live with, and your connection to the world. True abundance is not material. It is a quality of attention.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="mt-8 font-display text-[19px] md:text-[21px] leading-[1.7] text-sumi/85">
            We bring this to life through four things: a journal from Japan, a daily awareness practice, a curated store of craftsman objects, and illustrated stories.
          </p>
        </FadeIn>
      </section>

      {/* ── The name: あ う わ as kinetic letter breakdown ── */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-24 md:py-40">
        <div className="max-w-[1300px] mx-auto">
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-sumi/45">
              The name
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-[0.005em] text-sumi max-w-[700px] mb-14 md:mb-20">
              Three syllables, in an order that matters.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10 lg:gap-16">
            {[
              { kana: "あ", romaji: "A", gloss: "The unseen.", body: "The source of all things. The world before it has shape." },
              { kana: "う", romaji: "U", gloss: "The bringing.", body: "The act of carrying one into the other. Awareness in motion." },
              { kana: "わ", romaji: "WA", gloss: "The seen.", body: "The physical world we inhabit. The thing now in your hand." },
            ].map((k, i) => (
              <FadeIn key={k.kana} delay={i * 180} variant="reveal" revealDistance={40}>
                <div>
                  <p
                    aria-hidden="true"
                    className="font-jp-serif leading-[0.85] text-sumi"
                    style={{ fontSize: "clamp(7rem, 14vw, 11rem)" }}
                  >
                    {k.kana}
                  </p>
                  <p className="mt-4 font-sans text-[12px] tracking-[0.22em] uppercase text-sumi/45">
                    {k.romaji} · {k.gloss}
                  </p>
                  <p className="mt-3 font-display text-[17px] md:text-[18px] leading-[1.6] text-sumi/70">
                    {k.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={650}>
            <p className="mt-16 md:mt-24 font-display text-[19px] md:text-[21px] leading-[1.7] text-sumi/80 max-w-[760px]">
              Auwa is the quiet act between the unseen and the seen. It also sounds, to an English ear, like &ldquo;our.&rdquo; Our life. Our world. Our awareness. Both readings are correct.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Pullquote — the brand thesis ── */}
      <section className="px-10 md:px-12 lg:px-20 xl:px-28 py-24 md:py-44">
        <div className="max-w-[1100px] mx-auto text-center">
          <ScrollFadeText
            as="p"
            className="font-display text-[clamp(2rem,5.5vw,4.25rem)] leading-[1.1] tracking-[0.003em] text-sumi"
            finishAt={0.45}
          >
            &ldquo;Real abundance is not material. It is a quality of attention.&rdquo;
          </ScrollFadeText>
        </div>
      </section>

      {/* ── Timeline: ten years of becoming ── */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-32">
        <div className="max-w-[1300px] mx-auto">
          <div className="md:grid md:grid-cols-12 md:gap-12">
            <div className="md:col-span-4 mb-12 md:mb-0">
              <FadeIn>
                <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-sumi/45">
                  Ten years
                </p>
              </FadeIn>
              <FadeIn delay={150}>
                <h2 className="mt-6 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi">
                  Ten years of becoming.
                </h2>
              </FadeIn>
              <FadeIn delay={300}>
                <p className="mt-6 font-display text-[17px] md:text-[18px] leading-[1.65] text-sumi/65 max-w-[340px]">
                  Auwa didn&rsquo;t arrive. It accreted. Three quiet moments along the way.
                </p>
              </FadeIn>
            </div>
            <div className="md:col-span-8">
              <ol className="border-t border-sumi/10">
                {timeline.map((t, i) => (
                  <FadeIn key={t.year} delay={i * 180}>
                    <li className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-10 py-8 md:py-12 border-b border-sumi/10">
                      <p className="font-sans tabular-nums text-[16px] tracking-[0.06em] text-sumi/65">
                        {t.year}
                      </p>
                      <div>
                        <h3 className="font-display text-[22px] md:text-[26px] leading-[1.2] tracking-[0.005em] text-sumi">
                          {t.title}.
                        </h3>
                        <p className="mt-3 font-display text-[17px] md:text-[18px] leading-[1.65] text-sumi/65 max-w-[520px]">
                          {t.body}
                        </p>
                      </div>
                    </li>
                  </FadeIn>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── The creators — editorial spreads ── */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-24 md:py-32">
        <div className="max-w-[1300px] mx-auto mb-14 md:mb-24">
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-sumi/45">
              The creators
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-[0.005em] text-sumi max-w-[760px]">
              Two designers. Twenty years. One offering.
            </h2>
          </FadeIn>
        </div>
        <div className="flex flex-col gap-20 md:gap-28">
          {founders.map((f) => (
            <FounderSpread key={f.id} {...f} />
          ))}
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="mx-auto max-w-[760px] px-6 md:px-10 py-20 md:py-32">
        <FadeIn>
          <h2 className="font-display text-[28px] md:text-[36px] leading-[1.15] tracking-[0.005em] text-sumi mb-8">
            Get in touch.
          </h2>
        </FadeIn>
        <FadeIn delay={120}>
          <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-sumi/80 max-w-[560px]">
            For collaborations, press, craftsman partnerships, or just to say hello: <ObfuscatedEmail user="hello" domain="auwa.life" />.
          </p>
        </FadeIn>
      </section>

      </main>
      <Footer />
    </>
  );
}

function FounderSpread({
  id,
  role,
  name,
  nameJp,
  image,
  body,
  align,
}: {
  id: string;
  role: string;
  name: string;
  nameJp: string;
  image: string;
  body: React.ReactNode;
  align: "left" | "right";
}) {
  const imageOnLeft = align === "left";
  return (
    <div id={id} className="scroll-mt-24 md:scroll-mt-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-20 items-center">
        <FadeIn
          variant="reveal"
          revealDistance={40}
          className={`${
            imageOnLeft ? "md:order-1 md:col-span-6" : "md:order-2 md:col-span-6"
          } relative aspect-[4/5] overflow-hidden`}
        >
          <ImageFade
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </FadeIn>
        <div className={imageOnLeft ? "md:order-2 md:col-span-6" : "md:order-1 md:col-span-6"}>
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-sumi/45">
              {role}
            </p>
          </FadeIn>
          <div className="mt-6 flex items-baseline gap-5 flex-wrap">
            <TextReveal
              as="h3"
              className="font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.05] tracking-[0.005em] text-sumi"
              stagger={90}
            >
              {name}
            </TextReveal>
            <FadeIn delay={400}>
              <span className="font-jp-serif text-[20px] md:text-[24px] tracking-[0.04em] text-sumi/45">
                {nameJp}
              </span>
            </FadeIn>
          </div>
          <FadeIn delay={500}>
            <p className="mt-8 font-display text-[18px] md:text-[19px] leading-[1.7] text-sumi/80 max-w-[480px]">
              {body}
            </p>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
