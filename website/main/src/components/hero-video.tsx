"use client";

import { useEffect, useRef, useState } from "react";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

function VideoPanel({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlaying = () => setPlaying(true);
    video.addEventListener("playing", onPlaying);
    video.play().catch(() => {});

    return () => video.removeEventListener("playing", onPlaying);
  }, []);

  return (
    <div className={className}>
      {/* Poster shows instantly, hides once video plays */}
      <img
        src={poster}
        alt="AUWA"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          playing ? "opacity-0" : "opacity-100"
        }`}
      />
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          playing ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Gradient + text */}
      <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-void/10 to-transparent z-10" />
    </div>
  );
}

export function HeroVideo() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // On first render (SSR/hydration), default to showing poster via img only
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Container with correct aspect ratio per breakpoint */}
      <div className="relative aspect-[9/16] max-h-[90vh] md:aspect-[16/9] md:max-h-[85vh] w-full bg-surface-raised">
        {mounted ? (
          isDesktop ? (
            <VideoPanel
              src="/hero/landscape.mp4"
              poster="/hero/poster-landscape.jpg"
              className="absolute inset-0"
            />
          ) : (
            <VideoPanel
              src="/hero/portrait.mp4"
              poster="/hero/poster-portrait.jpg"
              className="absolute inset-0"
            />
          )
        ) : (
          /* SSR fallback: poster image only, no video element */
          <>
            <img
              src="/hero/poster-landscape.jpg"
              alt="AUWA"
              className="hidden md:block absolute inset-0 w-full h-full object-cover"
            />
            <img
              src="/hero/poster-portrait.jpg"
              alt="AUWA"
              className="md:hidden absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-void/10 to-transparent z-10" />
          </>
        )}

        {/* Text overlay — always visible immediately */}
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-10 md:p-12 lg:p-20 xl:px-28 xl:pb-14 z-20">
          <h1 className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-white max-w-[680px] pr-12 md:pr-0">
            Everything has Kokoro.
          </h1>
          <a
            href="/journal/yaoyorozu-no-kami"
            className="inline-block mt-6 md:mt-8 font-sans text-[14px] tracking-[0.04em] text-white/50 hover:text-white/80 transition-colors duration-300"
          >
            Begin here &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
