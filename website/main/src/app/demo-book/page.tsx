"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import { ScrollFadeText } from "@/components/scroll-fade-text";
import { ImageFade } from "@/components/image-fade";
import { BookPreview } from "@/components/book-preview";
import { SignupForm } from "@/components/signup-form";
import { STAGGER, DURATION, EASING } from "@/lib/motion";

/*
  /demo-book — Version A: cinematic narrative scroll for Book 1.

  Dark editorial canvas (#1F2A2E "Yoru"). Hero is the cosmic Auwa bokeh
  from the original Auwa World assets, then a slow narrative descent
  through the story beats of Book 1: arrival, meeting Bluu, the light
  shower, the deeper truth, and the four-book series tease.

  Visual continuity: the home-page book pillar card uses /pillars/book.jpg
  (book on a wooden table). That same image lands as "An object made
  from a story" near the end, so a click from the home page resolves
  visually before the signup CTA.
*/

const previewSpreads = [
  { src: "/book/1/page-01.jpg", alt: "Auwa Book One — title spread" },
  { src: "/book/1/page-02.jpg", alt: "A small blue planet was waiting" },
  { src: "/book/1/page-04.jpg", alt: "Their light merged into Auwa" },
  { src: "/book/1/page-07.jpg", alt: "Below lay a deep, quiet forest" },
  { src: "/book/1/page-08.jpg", alt: "Auwa meets Bluu the blue flower" },
  { src: "/book/1/page-09.jpg", alt: "Bluu's Kokoro appears" },
  { src: "/book/1/page-10.jpg", alt: "Her name was Bluu — the forest hums again" },
  { src: "/book/1/page-12.jpg", alt: "Auwa holds Bluu's happiest memory" },
  { src: "/book/1/page-15.jpg", alt: "The microbes greet Auwa" },
  { src: "/book/1/page-18.jpg", alt: "Auwa returns to the night sky" },
];

const futureBooks = [
  { num: "01", title: "The Beginning", cover: "/demo-book/cover-1.jpg", status: "First chapter", note: "A blue flower. A dying forest. A light." },
  { num: "02", title: "Ocean", cover: "/demo-book/cover-2.jpg", status: "Coming next", note: "Auwa descends below the surface." },
  { num: "03", title: "Human", cover: "/demo-book/cover-3.jpg", status: "In progress", note: "The strangest beings of all." },
  { num: "04", title: "Lioma", cover: "/demo-book/cover-4.jpg", status: "In progress", note: "The longest way home." },
];

export default function DemoBookPage() {
  // Override main + body backgrounds to the warm Yoru dark while this
  // page is mounted. Reset on unmount so the rest of the site stays on
  // its default white surface. This is the lightest-weight way to scope
  // a dark theme to a single route without touching globals.css or the
  // root layout.
  useEffect(() => {
    const main = document.querySelector("main");
    const html = document.documentElement;
    const bodyPrev = document.body.style.backgroundColor;
    const mainPrev = main?.style.backgroundColor ?? "";
    const htmlPrev = html.style.backgroundColor;
    const colorPrev = document.body.style.color;
    document.body.style.backgroundColor = "#1F2A2E";
    document.body.style.color = "#EFE9DD";
    html.style.backgroundColor = "#1F2A2E";
    if (main) main.style.backgroundColor = "#1F2A2E";
    return () => {
      document.body.style.backgroundColor = bodyPrev;
      document.body.style.color = colorPrev;
      html.style.backgroundColor = htmlPrev;
      if (main) main.style.backgroundColor = mainPrev;
    };
  }, []);

  return (
    <div
      className="relative"
      style={{ backgroundColor: "#1F2A2E", color: "#EFE9DD" }}
    >
      {/* ── HERO: cosmic Auwa, full-bleed ── */}
      <DemoHero />

      {/* ── INTRO: clarify the character ── */}
      <section className="relative px-6 md:px-12 lg:px-20 xl:px-28 pt-24 md:pt-40 pb-20 md:pb-32">
        <div className="max-w-[1100px] mx-auto">
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-[#EFE9DD]/55">
              An illustrated story
            </p>
          </FadeIn>
          <ScrollFadeText
            as="p"
            className="mt-8 md:mt-10 font-display text-[clamp(1.5rem,3.4vw,2.6rem)] leading-[1.3] tracking-[0.005em] text-[#EFE9DD]"
            from={0.18}
            finishAt={0.4}
          >
            Auwa is the brand. Auwa is also a small luminous being who arrives in the first illustrated book by Eko Maeda. The same name, in two places. One philosophy, written down twice: once for the world we live in, and once for a world drawn by hand.
          </ScrollFadeText>
        </div>
      </section>

      {/* ── ATMOSPHERIC PULLQUOTE 1 ── */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-28 md:py-44">
        <div className="max-w-[1200px] mx-auto text-center">
          <ScrollFadeText
            as="p"
            className="font-display italic text-[clamp(2rem,5.5vw,4.25rem)] leading-[1.15] tracking-[0.005em] text-[#EFE9DD]"
            from={0.16}
            finishAt={0.45}
          >
            &ldquo;In one of countless galaxies, a small blue planet was waiting.&rdquo;
          </ScrollFadeText>
          <FadeIn delay={400}>
            <p className="mt-10 font-sans text-[12px] tracking-[0.18em] uppercase text-[#EFE9DD]/45">
              The first line of the book
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── BEAT 1: ARRIVAL ── */}
      <NarrativeBeat
        eyebrow="Chapter one"
        heading="A signal, a name."
        body="The book opens with a galaxy and a question. Seven stars answer. Three pages later Auwa exists, and exists for a reason."
        image="/book/1/page-04.jpg"
        imageAlt="The seven stars merge into Auwa"
        align="right"
      />

      {/* ── BEAT 2: BLUU (the heart of the book) ── */}
      <section className="relative px-6 md:px-12 lg:px-20 xl:px-28 py-24 md:py-44">
        <div className="max-w-[1300px] mx-auto">
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-[#EFE9DD]/55 text-center">
              Chapter two
            </p>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="mt-14 md:mt-20 relative aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-[#1F2A2E]">
              <Image
                src="/book/1/page-08.jpg"
                alt="Auwa finds Bluu, the last blue flower in a quiet forest"
                fill
                sizes="(max-width: 1024px) 100vw, 1300px"
                className="object-cover scale-[1.5] md:scale-[1.4] origin-left"
                style={{ objectPosition: "left center" }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, rgba(31,42,46,0) 35%, rgba(31,42,46,1) 70%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-end p-8 md:p-16">
                <div className="max-w-[420px] text-right">
                  <FadeIn delay={500}>
                    <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-[#EFE9DD]/55">
                      Her name was Bluu
                    </p>
                  </FadeIn>
                  <FadeIn delay={700}>
                    <p className="mt-4 font-display italic text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.35] text-[#EFE9DD]">
                      &ldquo;I feel so lonely.&rdquo;
                    </p>
                  </FadeIn>
                </div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={300}>
            <p className="mt-10 md:mt-14 max-w-[640px] mx-auto text-center font-display text-[18px] md:text-[20px] leading-[1.65] text-[#EFE9DD]/70">
              The forest was quiet and still. Most of its life had long since faded. But at the foot of an old tree, one small blue flower was still here. Auwa reached out with a gentle light.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── BEAT 3: KOKORO REVEALED ── */}
      <NarrativeBeat
        eyebrow="Chapter three"
        heading="The book's still centre."
        body="One spread, two short paragraphs, and the entire philosophy of Auwa fits inside them. Every page either earns its way to this moment, or its way out of it."
        image="/book/1/page-09.jpg"
        imageAlt="Bluu's Kokoro is revealed in the forest"
        align="left"
      />

      {/* ── PULLQUOTE 2: THE PHILOSOPHY ── */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-28 md:py-48">
        <div className="max-w-[1300px] mx-auto text-center">
          <ScrollFadeText
            as="p"
            className="font-display text-[clamp(2.25rem,6.5vw,5rem)] leading-[1.1] tracking-[0.003em] text-[#EFE9DD]"
            from={0.18}
            finishAt={0.45}
          >
            &ldquo;We are all connected, though you cannot see it.&rdquo;
          </ScrollFadeText>
          <FadeIn delay={500}>
            <p className="mt-10 font-sans text-[12px] tracking-[0.18em] uppercase text-[#EFE9DD]/45">
              From the soil microbes
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── FLICK THROUGH ── */}
      <section className="py-20 md:py-32">
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 mb-10 md:mb-14">
          <div className="max-w-[1300px] mx-auto">
            <FadeIn>
              <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-[#EFE9DD]/55">
                Open the book
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[0.005em] text-[#EFE9DD] max-w-[760px]">
                Ten spreads from a story of eighteen.
              </h2>
            </FadeIn>
            <FadeIn delay={350}>
              <p className="mt-6 font-display text-[17px] md:text-[18px] leading-[1.6] text-[#EFE9DD]/65 max-w-[480px]">
                Drag, swipe, or use the arrows. The rest is for the book.
              </p>
            </FadeIn>
          </div>
        </div>
        <FadeIn delay={500}>
          <BookPreview spreads={previewSpreads} theme="dark" />
        </FadeIn>
      </section>

      {/* ── THE OBJECT — book on table (continuity from home page) ── */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-24 md:py-44">
        <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <FadeIn variant="reveal" revealDistance={40}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <ImageFade
                src="/pillars/book.jpg"
                alt="Auwa Book One on a wooden table"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </FadeIn>
          <div>
            <FadeIn>
              <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-[#EFE9DD]/55">
                The book itself
              </p>
            </FadeIn>
            <TextReveal
              as="h2"
              className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-[0.005em] text-[#EFE9DD]"
              stagger={90}
            >
              An object, made from a story.
            </TextReveal>
            <FadeIn delay={400}>
              <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.7] text-[#EFE9DD]/70 max-w-[440px]">
                Eight by ten inches. Cream paper. Eighteen spreads, each one earned. Printed slowly, in a short first edition, signed by Eko Maeda.
              </p>
            </FadeIn>
            <FadeIn delay={550}>
              <p className="mt-6 font-sans text-[14px] leading-[1.65] text-[#EFE9DD]/55 max-w-[420px]">
                A book to keep on a table. To open in slow weather. To hand to someone you love.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── THE CREATOR ── */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-32">
        <div className="max-w-[760px] mx-auto text-center">
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-[#EFE9DD]/55">
              By Eko Maeda
            </p>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-8 font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[1.5] text-[#EFE9DD]/85">
              Born and raised in Kansai, within the philosophy that life resides in everything. Auwa began as a single drawing, ten years ago. The world grew quietly around it.
            </p>
          </FadeIn>
          <FadeIn delay={350}>
            <p className="mt-8 font-jp-serif text-[26px] md:text-[32px] tracking-[0.04em] text-[#EFE9DD]/60">
              前田　恵子
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── THE FOUR BOOKS ── */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-24 md:py-40">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-baseline justify-between gap-6 mb-12 md:mb-16">
            <FadeIn>
              <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-[#EFE9DD]/55">
                The series
              </p>
            </FadeIn>
            <FadeIn delay={120}>
              <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-[#EFE9DD]/45">
                Four books · One world
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={200}>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.1] tracking-[0.005em] text-[#EFE9DD] max-w-[700px] mb-14 md:mb-20">
              Earth, ocean, human, and the long way home.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
            {futureBooks.map((b, i) => (
              <FadeIn key={b.num} delay={i * STAGGER.grid} variant="reveal" revealDistance={40}>
                <div className="group">
                  <div
                    className="relative aspect-[4/3] overflow-hidden"
                    style={{ backgroundColor: "#0f1518" }}
                  >
                    <Image
                      src={b.cover}
                      alt={`Auwa Book ${b.num} cover — ${b.title}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                      loading="eager"
                      priority={i === 0}
                      style={{
                        opacity: i === 0 ? 1 : 0.65,
                        transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
                      }}
                    />
                  </div>
                  <div className="mt-4 md:mt-5">
                    <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-[#EFE9DD]/45">
                      {b.num} · {b.status}
                    </p>
                    <h3 className="mt-2 font-display text-[18px] md:text-[20px] leading-[1.25] tracking-[0.005em] text-[#EFE9DD]">
                      {b.title}
                    </h3>
                    <p className="mt-1.5 font-sans text-[13px] leading-[1.5] text-[#EFE9DD]/55">
                      {b.note}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIGNUP CTA ── */}
      <section className="relative px-6 md:px-12 lg:px-20 xl:px-28 py-32 md:py-48 overflow-hidden">
        {/* atmospheric bokeh wash behind the form */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(218,205,170,0.08) 0%, rgba(31,42,46,0) 70%)",
          }}
        />
        <div className="relative max-w-[640px] mx-auto text-center">
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-[#EFE9DD]/55">
              The first arrival
            </p>
          </FadeIn>
          <TextReveal
            as="h2"
            className="mt-8 font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.08] tracking-[0.005em] text-[#EFE9DD]"
            stagger={90}
          >
            Be there when it lands.
          </TextReveal>
          <FadeIn delay={500}>
            <p className="mt-8 font-display text-[18px] md:text-[20px] leading-[1.65] text-[#EFE9DD]/70 max-w-[440px] mx-auto">
              We&rsquo;ll send a quiet note when the first book is ready. No louder than that.
            </p>
          </FadeIn>
          <FadeIn delay={700}>
            <div className="mt-12 md:mt-14 mx-auto max-w-[440px]">
              <SignupForm
                source="book-waitlist"
                buttonText="Notify me"
                theme="dark"
                successMessage="You&rsquo;re on the list. We&rsquo;ll find you when it&rsquo;s time."
              />
            </div>
          </FadeIn>
          <FadeIn delay={900}>
            <p className="mt-16 font-sans text-[12px] tracking-[0.18em] uppercase text-[#EFE9DD]/40">
              <Link href="/" className="hover:text-[#EFE9DD]/80 transition-colors duration-300">
                Return to Auwa
              </Link>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* trailing breathing room before the footer (no Footer rendered for
          this single-flow page — it carries its own ending). */}
      <div className="h-12 md:h-20" aria-hidden="true" />
    </div>
  );
}

/* ── Hero: cosmic Auwa bokeh, full-bleed ── */
function DemoHero() {
  return (
    <section className="-mt-16 md:-mt-20 relative">
      <div className="relative h-[100svh] w-full overflow-hidden">
        <Image
          src="/demo-book/hero-cosmic.jpg"
          alt="Auwa, a luminous being, in the cosmic light"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "center center" }}
        />
        {/* darken edges for legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0) 35%, rgba(0,0,0,0.4) 100%)",
          }}
        />
        {/* top gradient — keeps header legible */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-black/35 to-transparent z-[5]"
        />
        {/* bottom gradient — supports text */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] z-[5]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(31,42,46,0) 0%, rgba(31,42,46,0.8) 100%)",
          }}
        />
        {/* hero copy */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 md:px-12 lg:px-20 xl:px-28 pb-36 md:pb-44">
          <div className="max-w-[1300px] mx-auto">
            <FadeIn>
              <p className="font-sans text-[11px] md:text-[12px] tracking-[0.32em] uppercase text-white/70">
                Book one — An illustrated story
              </p>
            </FadeIn>
            <TextReveal
              as="h1"
              className="mt-6 md:mt-8 font-display text-[clamp(3.25rem,10vw,8rem)] leading-[0.96] tracking-[0.005em] text-white"
              stagger={100}
              delay={150}
            >
              The Beginning.
            </TextReveal>
            <FadeIn delay={900}>
              <p className="mt-6 md:mt-8 font-display italic text-[clamp(1.05rem,1.7vw,1.4rem)] leading-[1.4] text-white/85 max-w-[520px]">
                A small luminous being. A signal from Earth. The first chapter of the Auwa universe, ten years in the making.
              </p>
            </FadeIn>
          </div>
        </div>
        {/* scroll cue */}
        <ScrollCue />
      </div>
    </section>
  );
}

function ScrollCue() {
  return (
    <button
      type="button"
      onClick={() => {
        const headerOffset = window.matchMedia("(min-width: 768px)").matches
          ? 80
          : 64;
        const target =
          document.querySelector("section + section") as HTMLElement | null;
        if (!target) return;
        const y = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }}
      aria-label="Scroll to introduction"
      className="group absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-5 md:gap-6 cursor-pointer p-2"
      style={{
        opacity: 1,
        transition: `opacity ${DURATION.hover}ms ${EASING.outExpo}`,
      }}
    >
      <span className="relative inline-flex overflow-hidden font-sans text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-white/85">
        <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-full">
          Begin
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 ease-text-roll group-hover:translate-y-0"
        >
          Begin
        </span>
      </span>
      <span
        aria-hidden="true"
        className="scroll-cue-line block w-px h-8 md:h-10 bg-white/70 origin-top"
      />
    </button>
  );
}

/* ── Reusable narrative beat: full spread at native 5:3 ratio + text ──
   The spread is shown as a designed unit (image + cream text panel as
   they appear in the book), embedded into the dark canvas like a page
   placed gently on a desk. The ambient cream of the text panel becomes
   a textural counterweight to the dark page. */
function NarrativeBeat({
  eyebrow,
  heading,
  body,
  image,
  imageAlt,
  align = "right",
}: {
  eyebrow: string;
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
  objectPosition?: string;
  align?: "left" | "right";
}) {
  const imageOnLeft = align === "right"; // text on right => image on left
  return (
    <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-20 md:py-32">
      <div className="max-w-[1300px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center">
        <FadeIn
          variant="reveal"
          revealDistance={40}
          className={`${
            imageOnLeft ? "md:order-1 md:col-span-7" : "md:order-2 md:col-span-7"
          } relative aspect-[5/3] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] bg-[#fdfaf2]`}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover"
          />
        </FadeIn>
        <div
          className={
            imageOnLeft ? "md:order-2 md:col-span-5" : "md:order-1 md:col-span-5"
          }
        >
          <FadeIn>
            <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-[#EFE9DD]/55">
              {eyebrow}
            </p>
          </FadeIn>
          <TextReveal
            as="h2"
            className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] leading-[1.08] tracking-[0.005em] text-[#EFE9DD]"
            stagger={90}
          >
            {heading}
          </TextReveal>
          <FadeIn delay={400}>
            <p className="mt-8 font-display text-[17px] md:text-[18px] leading-[1.7] text-[#EFE9DD]/70 max-w-[440px]">
              {body}
            </p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
