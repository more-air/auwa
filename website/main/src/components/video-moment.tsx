"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/*
  Meet AUWA video moment.
  Portrait video in a rounded card with text alongside (desktop) or stacked
  (mobile). A poster image sits behind the <video>; it fades out only once
  the video fires its `playing` event, which prevents the momentary "flash"
  of the raw video element's first frame on slower connections.
*/

const VIDEO_SRC = "/hero/portrait.mp4";
const POSTER_SRC = "/hero/poster-portrait.jpg";
const ARTICLE_HREF = "/journal/the-beginning";

export function VideoMoment() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    [desktopVideoRef.current, mobileVideoRef.current].forEach((video) => {
      if (!video) return;
      if (isVisible) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Desktop: video card left, text right */}
        <div className="hidden md:grid grid-cols-2 gap-12 lg:gap-20 items-center">
          <Link
            href={ARTICLE_HREF}
            className="block relative aspect-[9/16] max-h-[70vh] mx-auto w-full max-w-[380px] rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
          >
            <img
              src={POSTER_SRC}
              alt="AUWA"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                playing ? "opacity-0" : "opacity-100"
              }`}
            />
            <video
              ref={desktopVideoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                playing ? "opacity-100" : "opacity-0"
              }`}
              loop
              muted
              playsInline
              preload="metadata"
              onPlaying={() => setPlaying(true)}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          </Link>

          <div className="flex flex-col justify-center">
            <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-void/35">
              Meet AUWA
            </span>
            <div className="mt-3 w-8 h-[1px] bg-void/12" />
            <Link href={ARTICLE_HREF} className="block group/heading">
              <h2 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[0.01em] text-void group-hover/heading:text-void/70 transition-colors duration-300">
                The soul in all things.
              </h2>
            </Link>
            <p className="mt-4 font-display text-[18px] md:text-[19px] leading-[1.65] text-void/50 max-w-[380px]">
              A character from our illustrated stories who reveals what the world has been too busy to notice. AUWA appears in the stories and the app.
            </p>
            <Link
              href={ARTICLE_HREF}
              className="self-start inline-block mt-8 font-sans text-[13px] tracking-[0.08em] uppercase text-void/50 border border-void/15 px-6 py-3 hover:text-void hover:border-void/30 transition-all duration-300"
            >
              The Story
            </Link>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col items-center">
          <Link
            href={ARTICLE_HREF}
            className="block relative aspect-[9/16] w-full max-w-[300px] rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
          >
            <img
              src={POSTER_SRC}
              alt="AUWA"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                playing ? "opacity-0" : "opacity-100"
              }`}
            />
            <video
              ref={mobileVideoRef}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                playing ? "opacity-100" : "opacity-0"
              }`}
              loop
              muted
              playsInline
              preload="metadata"
              onPlaying={() => setPlaying(true)}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
          </Link>

          <div className="mt-8 text-center">
            <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-void/35">
              Meet AUWA
            </span>
            <Link href={ARTICLE_HREF} className="block">
              <h2 className="mt-3 font-display text-[clamp(1.4rem,5vw,1.8rem)] leading-[1.15] tracking-[0.01em] text-void">
                The soul in all things.
              </h2>
            </Link>
            <Link
              href={ARTICLE_HREF}
              className="inline-block mt-5 font-sans text-[13px] tracking-[0.08em] uppercase text-void/50 border border-void/15 px-6 py-3 hover:text-void hover:border-void/30 transition-all duration-300"
            >
              The Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
