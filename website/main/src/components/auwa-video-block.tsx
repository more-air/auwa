"use client";

import { useEffect, useRef, useState } from "react";

/*
  Full-width AUWA face video block.
  Landscape on desktop (shows the shadow patterns), square crop on mobile (tight on the face).
  Rounded corners. Auto-plays when visible, pauses when not.
  Pure atmosphere — no text overlay.
*/

export function AuwaVideoBlock() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="px-6 md:px-12 lg:px-20 xl:px-28 pb-16 md:pb-24"
    >
      {/* Square on mobile, ~16:9 on desktop — links to store */}
      <a href="/store" className="block relative aspect-square md:aspect-[16/9] w-full rounded-xl overflow-hidden bg-surface-raised">
        <img
          src="/hero/poster-auwa.jpg"
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
          poster="/hero/poster-auwa.jpg"
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source src="/hero/landscape-auwa.mp4" type="video/mp4" />
        </video>
      </a>
    </section>
  );
}
