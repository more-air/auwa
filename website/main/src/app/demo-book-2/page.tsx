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
import { STAGGER } from "@/lib/motion";

/*
  /demo-book-2 — Version B: object-led editorial.

  Hero is the book on a wooden table (same /pillars/book.jpg used in the
  home-page book pillar card), so a click from the home page lands on the
  exact image the visitor just touched. From that physical anchor the page
  opens outward into the world inside the book — Bluu, the Kokoro reveal,
  the four-book series — and ends at the signup. Less narrative arc than
  Version A; more "book as object" presentation.
*/

const previewSpreads = [
  { src: "/book/1/page-01.jpg", alt: "Auwa Book One — title spread" },
  { src: "/book/1/page-02.jpg", alt: "A small blue planet was waiting" },
  { src: "/book/1/page-04.jpg", alt: "Their light merged into Auwa" },
  { src: "/book/1/page-07.jpg", alt: "Below lay a deep, quiet forest" },
  { src: "/book/1/page-08.jpg", alt: "Auwa meets Bluu the blue flower" },
  { src: "/book/1/page-09.jpg", alt: "Bluu's Kokoro appears" },
  { src: "/book/1/page-10.jpg", alt: "Her name was Bluu" },
  { src: "/book/1/page-12.jpg", alt: "Auwa holds Bluu's happiest memory" },
  { src: "/book/1/page-15.jpg", alt: "The microbes greet Auwa" },
  { src: "/book/1/page-18.jpg", alt: "Auwa returns to the night sky" },
];

const futureBooks = [
  { num: "01", title: "The Beginning", cover: "/demo-book/cover-1.jpg", status: "Available first", note: "Earth, a blue flower, a light." },
  { num: "02", title: "Ocean", cover: "/demo-book/cover-2.jpg", status: "Coming next", note: "Auwa below the surface." },
  { num: "03", title: "Human", cover: "/demo-book/cover-3.jpg", status: "In progress", note: "The strangest beings of all." },
  { num: "04", title: "Lioma", cover: "/demo-book/cover-4.jpg", status: "In progress", note: "The longest way home." },
];

export default function DemoBookTwoPage() {
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
      {/* ── HERO: book on table, two-column with title alongside ── */}
      <section className="-mt-16 md:-mt-20 relative">
        <div className="min-h-[100svh] md:min-h-[100svh] grid grid-cols-1 md:grid-cols-2 items-center pt-24 md:pt-0">
          {/* Left — copy */}
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 py-12 md:py-0 order-2 md:order-1">
            <FadeIn>
              <p className="font-sans text-[11px] md:text-[12px] tracking-[0.32em] uppercase text-[#EFE9DD]/60">
                Auwa · Book one
              </p>
            </FadeIn>
            <TextReveal
              as="h1"
              className="mt-6 md:mt-8 font-display text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.98] tracking-[0.005em] text-[#EFE9DD]"
              stagger={100}
              delay={120}
            >
              The Beginning.
            </TextReveal>
            <FadeIn delay={700}>
              <p className="mt-8 md:mt-10 font-display italic text-[clamp(1.1rem,1.6vw,1.4rem)] leading-[1.45] text-[#EFE9DD]/80 max-w-[440px]">
                An illustrated story by Eko Maeda. Ten years in the making, eighteen spreads, three hundred and eighty quiet words.
              </p>
            </FadeIn>
            <FadeIn delay={900}>
              <p className="mt-8 font-display text-[16px] md:text-[17px] leading-[1.7] text-[#EFE9DD]/55 max-w-[440px]">
                A small luminous being arrives on Earth. It finds a flower no one has seen for a long time. The world begins to glow.
              </p>
            </FadeIn>
          </div>
          {/* Right — book on table */}
          <div className="relative order-1 md:order-2 h-[60svh] md:h-[100svh]">
            <ImageFade
              src="/pillars/book.jpg"
              alt="Auwa Book One on a wooden table"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            {/* warm wash to integrate with the dark page */}
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(31,42,46,0.75) 0%, rgba(31,42,46,0) 25%, rgba(31,42,46,0) 100%)",
              }}
            />
          </div>
        </div>
      </section>

      {/* ── OPENING LINE pullquote ── */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-28 md:py-40">
        <div className="max-w-[1200px] mx-auto text-center">
          <FadeIn>
            <p className="font-sans text-[11px] tracking-[0.32em] uppercase text-[#EFE9DD]/45">
              The book opens
            </p>
          </FadeIn>
          <ScrollFadeText
            as="p"
            className="mt-12 font-display italic text-[clamp(2rem,5.5vw,4.25rem)] leading-[1.15] tracking-[0.005em] text-[#EFE9DD]"
            from={0.16}
            finishAt={0.45}
          >
            &ldquo;In one of countless galaxies, a small blue planet was waiting.&rdquo;
          </ScrollFadeText>
        </div>
      </section>

      {/* ── HERO SPREAD: full-bleed atmospheric Bluu moment ── */}
      <section className="relative">
        <div className="relative aspect-[16/10] md:aspect-[16/8] overflow-hidden bg-[#1F2A2E]">
          <Image
            src="/book/1/page-08.jpg"
            alt="Auwa finds Bluu, the last blue flower in a quiet forest"
            fill
            sizes="100vw"
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
          <div className="absolute inset-y-0 right-0 flex items-center px-6 md:px-12 lg:px-20 xl:px-28">
            <div className="max-w-[440px] text-right md:text-left">
              <FadeIn delay={200}>
                <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-[#EFE9DD]/60">
                  Her name was Bluu
                </p>
              </FadeIn>
              <FadeIn delay={400}>
                <p className="mt-6 font-display italic text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.25] text-[#EFE9DD]">
                  &ldquo;I feel so lonely.&rdquo;
                </p>
              </FadeIn>
              <FadeIn delay={600}>
                <p className="mt-6 font-sans text-[13px] tracking-[0.04em] text-[#EFE9DD]/55 leading-[1.55]">
                  The forest was quiet and still. Auwa reached out with a gentle light.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLICK THROUGH ── */}
      <section className="py-24 md:py-40">
        <div className="px-6 md:px-12 lg:px-20 xl:px-28 mb-10 md:mb-14">
          <div className="max-w-[1400px] mx-auto">
            <FadeIn>
              <p className="font-sans text-[12px] tracking-[0.22em] uppercase text-[#EFE9DD]/55">
                Open the book
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[0.005em] text-[#EFE9DD] max-w-[720px]">
                A book that says less than you expect, and more than it shows.
              </h2>
            </FadeIn>
            <FadeIn delay={350}>
              <p className="mt-6 font-display text-[17px] md:text-[18px] leading-[1.6] text-[#EFE9DD]/65 max-w-[480px]">
                Drag, swipe, or use the arrows. Ten spreads from eighteen.
              </p>
            </FadeIn>
          </div>
        </div>
        <FadeIn delay={500}>
          <BookPreview spreads={previewSpreads} theme="dark" />
        </FadeIn>
      </section>

      {/* ── PHILOSOPHY pullquote ── */}
      <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-32 md:py-48">
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

      {/* ── CREATOR ── */}
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

      {/* ── SIGNUP CTA ── */}
      <section className="relative px-6 md:px-12 lg:px-20 xl:px-28 py-32 md:py-48 overflow-hidden">
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

      <div className="h-12 md:h-20" aria-hidden="true" />
    </div>
  );
}
