import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { ObfuscatedEmail } from "@/components/obfuscated-email";
import { STAGGER } from "@/lib/motion";

export const metadata = {
  title: "About Auwa | A Japanese Lifestyle Brand",
  description: "Rieko Maeda and Tom Vining on founding Auwa, a Japanese lifestyle brand rooted in the ancient belief that a life force, a Kokoro, resides in all things.",
  openGraph: {
    title: "About Auwa | A Japanese Lifestyle Brand",
    description: "Rieko Maeda and Tom Vining on founding Auwa, a Japanese lifestyle brand rooted in the ancient belief that a life force, a Kokoro, resides in all things.",
    url: "https://auwa.life/about",
    siteName: "Auwa",
    locale: "en_GB",
    type: "website",
    images: [{ url: "/og/about.jpg", width: 1200, height: 630, alt: "About Auwa - a Japanese lifestyle brand founded by Rieko Maeda and Tom Vining" }],
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "About Auwa | A Japanese Lifestyle Brand",
    description: "Rieko Maeda and Tom Vining on founding Auwa.",
    images: ["/og/about.jpg"],
  },
};

const kana = [
  { char: "あ", romaji: "A", gloss: "The unseen.", body: "The source of all things. The world before it has shape." },
  { char: "う", romaji: "U", gloss: "The bringing.", body: "The act of carrying one into the other. Awareness in motion." },
  { char: "わ", romaji: "WA", gloss: "The seen.", body: "The physical world we inhabit. The thing now in your hand." },
];

const pillars = [
  { label: "Book", href: "/book", image: "/pillars/book.jpg" },
  { label: "Journal", href: "/journal", image: "/journal/washi-paper/washi-paper-hero.jpg" },
  { label: "App", href: "/app", image: "/pillars/app.jpg" },
  { label: "Store", href: "/store", image: "/pillars/store.jpg" },
];

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Auwa | A Japanese Lifestyle Brand",
    description: "Rieko Maeda and Tom Vining on founding Auwa, a Japanese lifestyle brand rooted in the ancient belief that a life force, a Kokoro, resides in all things.",
    url: "https://auwa.life/about",
    mainEntity: {
      "@type": "Organization",
      name: "Auwa",
      url: "https://auwa.life",
      logo: "https://auwa.life/auwa-logo.svg",
      description: "A Japanese lifestyle brand rooted in the philosophy that everything has Kokoro.",
      founder: [
        {
          "@type": "Person",
          name: "Rieko Maeda",
          jobTitle: "Creator",
          nationality: "Japanese",
          url: "https://auwa.life/about#rieko",
        },
        {
          "@type": "Person",
          name: "Tom Vining",
          jobTitle: "Producer",
          nationality: "British",
          url: "https://auwa.life/about#tom",
        },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>

        {/* ── Hero + Philosophy share the watermark.
            The 心 sits absolutely positioned within this wrapper with its
            top aligned to the H1's top (i.e. matching the hero's pt-12 md:pt-16). */}
        <div className="relative overflow-hidden">
          {/* Watermark fade-in is gated on usePageReady inside FadeIn,
              so the entrance starts only AFTER the page-transition wipe
              completes — the user actually sees the fade rather than
              catching the tail of an already-running CSS animation. */}
          <FadeIn
            className="hidden lg:block pointer-events-none select-none absolute top-12 md:top-16 lg:right-12 xl:right-20"
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

          {/* ── Hero ── */}
          <section className="relative px-6 md:px-12 lg:px-20 xl:px-28 space-page-hero space-flow">
            <h1 className="font-display text-[clamp(2.75rem,5vw,3.75rem)] leading-[1.08] tracking-[0.01em] text-sumi max-w-[700px] pr-12 md:pr-0">
              <TextReveal as="span" className="block" stagger={90}>
                The architecture
              </TextReveal>
              <TextReveal as="span" className="block" stagger={90} delay={180}>
                of Kokoro.
              </TextReveal>
            </h1>
          </section>

          {/* ── Philosophy ── */}
          <section className="relative space-flow">
            <div className="relative mx-auto max-w-[760px] px-6 md:px-10">
              <FadeIn>
                <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-sumi/80">
                  Since ancient times, the Japanese have believed a life force resides in all things. It lives not just in people, but in rivers, handmade bowls, and the shifting light of a season. We call this quality Kokoro (心): a holistic word uniting heart, mind, soul, and spirit. It is felt before it is understood.
                </p>
              </FadeIn>
              <FadeIn delay={100}>
                <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.7] text-sumi/80">
                  Auwa is built on this philosophy. In a culture of speed and disposability, we cultivate awareness of how you feel, the things you live with, and your connection to the world. True abundance is not material. It is a quality of attention. You don&rsquo;t need a mountain temple to practice this. It is a way of moving through the world, shaping what you choose and what you pass on.
                </p>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.7] text-sumi/80">
                  We bring this perspective to life through four paths: a journal that shifts how you see everyday moments, a daily awareness practice, a store of objects made with care, and an illustrated world you can step into.
                </p>
              </FadeIn>
            </div>
          </section>
        </div>

        {/* ── Four pillars ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 space-flow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {pillars.map((pillar, i) => (
              <FadeIn
                key={pillar.label}
                delay={i * STAGGER.grid}
                variant="reveal"
                revealDistance={40}
              >
                <Link
                  href={pillar.href}
                  className="group block"
                  data-cursor={pillar.href === "/journal" ? "Read" : "Open"}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                    <Image
                      src={pillar.image}
                      alt={pillar.label}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sumi/40 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4 md:p-6">
                      <h3 className="font-display text-[20px] md:text-[28px] tracking-[0.01em] text-surface">
                        {pillar.label}
                      </h3>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── The name (あ・う・わ kinetic breakdown) ── */}
        <section className="mx-auto max-w-[760px] px-6 md:px-10 space-flow">
          <FadeIn>
            <h2 className="font-display text-[28px] md:text-[32px] leading-[1.15] tracking-[0.01em] text-sumi mb-6 md:mb-8">
              Auwa, the name.
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-sumi/80">
              Auwa is the quiet act between the unseen and the seen. It also sounds, to an English ear, like &ldquo;our.&rdquo; Our life. Our world. Our awareness. Both readings are correct.
            </p>
          </FadeIn>
          <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-10">
            {kana.map((k, i) => (
              <FadeIn key={k.char} delay={i * STAGGER.grid} translateY={32}>
                <div>
                  <p
                    aria-hidden="true"
                    className="font-jp-serif leading-[0.85] text-sumi"
                    style={{ fontSize: "clamp(4.5rem, 8vw, 6rem)" }}
                  >
                    {k.char}
                  </p>
                  <p className="mt-6 md:mt-8 font-sans text-[12px] tracking-[0.16em] uppercase text-sumi/45">
                    {k.romaji} &middot; {k.gloss}
                  </p>
                  <p className="mt-3 font-display text-[18px] md:text-[20px] leading-[1.7] text-sumi/80">
                    {k.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── The creators ── */}
        <section className="mx-auto max-w-[760px] px-6 md:px-10 space-flow">
          <FadeIn>
            <h2 className="font-display text-[28px] md:text-[32px] leading-[1.15] tracking-[0.01em] text-sumi mb-8">
              The creators.
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-sumi/80">
              Auwa is made by two people: a Japanese designer who created the world, and a British designer who brings it to life. Twenty years working together across design, technology, and travelling Japan. They have always wanted their work to be of use to other people. Auwa is their offering: illustration, photography, writing, product design, gathered in service of an idea they believe in.
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <div id="rieko" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <p className="font-sans text-[12px] tracking-[0.16em] text-sumi/45 uppercase mb-2">
                Co-founder
              </p>
              <h3 className="font-display text-[22px] md:text-[24px] tracking-[0.01em] text-sumi mb-4">
                Rieko Maeda
              </h3>
              <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-sumi/80">
                Japanese illustrator and designer, also known by her artist name Eko. Creator of the Auwa illustrated universe: years of quiet devotion to stories about a character who reveals the Kokoro in all things. She tells how it came to her in <Link href="/journal/the-beginning" className="underline underline-offset-4 decoration-sumi/30 hover:decoration-sumi/70 transition-colors duration-300">The Beginning</Link>. Raised in Japan, where Kokoro is lived rather than studied. Co-founder of design studio <a href="https://moreair.co" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-sumi/30 hover:decoration-sumi/70 transition-colors duration-300">More Air</a>, and the Japanese voice behind Auwa&rsquo;s store, working with craftsmen across Japan.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div id="tom" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <p className="font-sans text-[12px] tracking-[0.16em] text-sumi/45 uppercase mb-2">
                Co-founder
              </p>
              <h3 className="font-display text-[22px] md:text-[24px] tracking-[0.01em] text-sumi mb-4">
                Tom Vining
              </h3>
              <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-sumi/80">
                British designer, strategist, and photographer. Twenty years building products in the design and tech industries. Fifteen years of photographing Japan; his images have appeared in Cond&eacute; Nast Traveler, Vogue, Time Out, and across this site. Co-founder of design studio <a href="https://moreair.co" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 decoration-sumi/30 hover:decoration-sumi/70 transition-colors duration-300">More Air</a>, leading brand, strategy, and product. For Auwa, he produces the brand, the systems, and co-creates the products that bring Rieko&rsquo;s world to life.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* ── Contact ── */}
        <section className="mx-auto max-w-[760px] px-6 md:px-10 space-flow">
          <FadeIn>
            <h2 className="font-display text-[28px] md:text-[32px] leading-[1.15] tracking-[0.01em] text-sumi mb-8">
              Get in touch.
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="font-display text-[18px] md:text-[20px] leading-[1.7] text-sumi/80">
              For collaborations, press, craftsman partnerships, or just to say hello: <ObfuscatedEmail user="hello" domain="auwa.life" />.
            </p>
          </FadeIn>
        </section>

      </main>
      <Footer />
    </>
  );
}
