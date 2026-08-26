"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { EASING } from "@/lib/motion";
import { usePageReady } from "@/components/page-transition";

/*
  Product gallery — fills its parent, portrait frames, dots overlaid.

  Built to drop into the SAME grid the journal article hero uses
  (`grid-cols-1 lg:grid-cols-2 lg:h-[100svh]`, image side
  `aspect-[4/5] lg:aspect-auto`). That grid is already tuned around 4:5
  portrait photography, and it is worth knowing why it works: at a
  typical laptop width, half the viewport is close to 4:5 exactly
  (1440/2 = 720 wide against 900 tall = 0.8), so a portrait frame fills
  the column with almost nothing cropped. One shoot serves the product
  page, the journal and Instagram.

  Deliberately NOT StoreCharacterCarousel. That one is ambient and
  auto-advances every eight seconds, which is right for a teaser and
  wrong here: a product gallery must not change under someone who is
  reading a price and deciding whether to spend £180. Advance is
  manual only.
*/

export type Frame = { src: string; alt: string };

export function FigureGallery({ frames }: { frames: Frame[] }) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() => frames.map(() => false));
  const ready = usePageReady();
  const rootRef = useRef<HTMLDivElement>(null);

  const next = () => setActive((i) => (i + 1) % frames.length);

  // Arrow keys move through the gallery once it has focus, so the page
  // works without a mouse. Wrapping is deliberate: a small set of
  // images is a loop, not a filmstrip with ends.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % frames.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i - 1 + frames.length) % frames.length);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [frames.length]);

  const markLoaded = (i: number) =>
    setLoaded((prev) => {
      if (prev[i]) return prev;
      const copy = [...prev];
      copy[i] = true;
      return copy;
    });

  // Cached-image guard. If the browser already holds a frame in cache
  // — true on every revisit, and true here for the first frame because
  // `priority` starts the fetch before React attaches handlers — the
  // <img> arrives `complete` and `onLoad` never fires, so the frame
  // sits at opacity 0 forever. Same trap patterns.md documents for
  // ImageFade. Sweep once on mount and mark anything already painted.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const imgs = el.querySelectorAll("img");
    const already: number[] = [];
    imgs.forEach((img, i) => {
      if (img.complete && img.naturalWidth > 0) already.push(i);
    });
    if (already.length === 0) return;
    setLoaded((prev) => {
      const copy = [...prev];
      already.forEach((i) => (copy[i] = true));
      return copy;
    });
  }, []);

  return (
    <div
      ref={rootRef}
      role="button"
      tabIndex={0}
      aria-label="Next image"
      onClick={next}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          next();
        }
      }}
      className="absolute inset-0 cursor-pointer outline-none"
      data-cursor="Next"
    >
      {frames.map((f, i) => (
        <Image
          key={f.src}
          src={f.src}
          alt={f.alt}
          fill
          quality={95}
          // The first frame is the page's LCP element, so it loads
          // eagerly; the rest wait their turn.
          priority={i === 0}
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          onLoad={() => markLoaded(i)}
          style={{
            opacity: i === active && ready && loaded[i] ? 1 : 0,
            transition: `opacity 900ms ${EASING.inOut}`,
          }}
        />
      ))}

      {/* Dots, overlaid at the foot of the image. They earn their place
          here in a way they don't on the ambient carousel: a buyer wants
          to know how many views of the object exist before deciding they
          have seen enough.

          Surface, not Washi, for the active dot — the locked rule for a
          light foreground sitting over photography, where Washi's warmth
          disappears into highlights. */}
      <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-1.5 md:bottom-8">
        {frames.map((f, i) => (
          <button
            key={f.src}
            type="button"
            aria-label={`View ${i + 1} of ${frames.length}`}
            aria-current={i === active}
            onClick={(e) => {
              e.stopPropagation();
              setActive(i);
            }}
            className="cursor-pointer p-2"
          >
            <span
              aria-hidden="true"
              className="block h-[6px] w-[6px] rounded-full transition-opacity duration-300"
              style={{
                backgroundColor: "var(--color-surface)",
                opacity: i === active ? 1 : 0.45,
                boxShadow: "0 0 6px rgba(0,0,0,0.18)",
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
