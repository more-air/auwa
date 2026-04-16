"use client";

import { useEffect, useRef, useState } from "react";

/*
  A standalone cinematic video moment.
  Portrait video centred in a rounded card frame with text alongside.
  Used as a mid-page section to bring the AUWA character to life.
*/

export function VideoMoment() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [playing, setPlaying] = useState(false);

  // Play/pause based on visibility
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Desktop: video card left, text right */}
        <div className="hidden md:grid grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Video card — links to the article */}
          <a href="/journal/the-beginning" className="block relative aspect-[9/16] max-h-[70vh] mx-auto w-full max-w-[380px] rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <img
              src="/hero/poster-portrait.jpg"
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
              poster="/hero/poster-portrait.jpg"
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="/hero/portrait.mp4" type="video/mp4" />
            </video>
          </a>

          {/* Text */}
          <div className="flex flex-col justify-center">
            <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-void/35">
              Meet AUWA
            </span>
            <div className="mt-3 w-8 h-[1px] bg-void/12" />
            <a href="/journal/the-beginning" className="block group/heading">
              <h2 className="mt-6 font-display text-[clamp(1.8rem,3vw,2.8rem)] leading-[1.12] tracking-[0.01em] text-void group-hover/heading:text-void/70 transition-colors duration-300">
                A luminous being who reveals<br />the kokoro in all things.
              </h2>
            </a>
            <p className="mt-4 font-display text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.6] text-void/50 max-w-[380px]">
              A character from four illustrated stories who reveals what the world has been too busy to notice. AUWA appears in the stories and the app.
            </p>
            <a
              href="/about"
              className="inline-block mt-8 font-sans text-[13px] tracking-[0.04em] text-void/40 hover:text-void/70 transition-colors duration-300"
            >
              The story behind AUWA &rarr;
            </a>
          </div>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col items-center">
          {/* Video card — links to article */}
          <a href="/journal/the-beginning" className="block relative aspect-[9/16] w-full max-w-[300px] rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.08)]">
            <img
              src="/hero/poster-portrait.jpg"
              alt="AUWA"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                playing ? "opacity-0" : "opacity-100"
              }`}
            />
            <video
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                playing ? "opacity-100" : "opacity-0"
              }`}
              poster="/hero/poster-portrait.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="/hero/portrait.mp4" type="video/mp4" />
            </video>
          </a>

          {/* Text below */}
          <div className="mt-8 text-center">
            <span className="font-sans text-[11px] tracking-[0.12em] uppercase text-void/35">
              Meet AUWA
            </span>
            <a href="/journal/the-beginning" className="block">
              <h2 className="mt-3 font-display text-[clamp(1.4rem,5vw,1.8rem)] leading-[1.15] tracking-[0.01em] text-void">
                A luminous being who reveals<br />the kokoro in all things.
              </h2>
            </a>
            <a
              href="/about"
              className="inline-block mt-5 font-sans text-[13px] tracking-[0.04em] text-void/40 hover:text-void/70 transition-colors duration-300"
            >
              The story behind AUWA &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
