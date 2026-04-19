"use client";

/* ─── Book 2: Umi (The Ocean) — Review Mockup ─── */

/*
  Full-screen snap-scroll viewer. Each page fills the viewport.
  Scroll or arrow-key to move between pages.

  TEXT OVERLAY SYSTEM:
  When copy changes are requested, add overlay entries to a page's
  `overlays` array. Each overlay positions styled HTML text on top
  of the page image, covering the original baked-in text.

  IMAGE SWAPS:
  To swap an illustration, replace the relevant page-XX.jpg in
  /public/book/2/ and the change is immediate.
*/

import { useEffect } from "react";

interface TextOverlay {
  x: string;
  y: string;
  w: string;
  text: string;
  style?: React.CSSProperties;
}

interface PageData {
  id: number;
  src: string;
  title: string;
  overlays?: TextOverlay[];
}

const bookPages: PageData[] = [
  { id: 1, src: "/book/2/page-01.jpg", title: "Copyright" },
  { id: 2, src: "/book/2/page-02.jpg", title: "AUWA flies over ocean" },
  { id: 3, src: "/book/2/page-03.jpg", title: "AUWA descends into the sea" },
  { id: 4, src: "/book/2/page-04.jpg", title: "Red fish on ocean floor" },
  { id: 5, src: "/book/2/page-05.jpg", title: "Fish leads to broken coral" },
  { id: 6, src: "/book/2/page-06.jpg", title: "Light shower \u2014 Key and Lady" },
  { id: 7, src: "/book/2/page-07.jpg", title: "Rai the turtle arrives" },
  { id: 8, src: "/book/2/page-08.jpg", title: "Pollution and ghost nets" },
  { id: 9, src: "/book/2/page-09.jpg", title: "Ghost net encounter" },
  { id: 10, src: "/book/2/page-10.jpg", title: "Sea restored" },
  { id: 11, src: "/book/2/page-11.jpg", title: "Entering Coral Paradise" },
  { id: 12, src: "/book/2/page-12.jpg", title: "Coral Paradise panorama" },
  { id: 13, src: "/book/2/page-13.jpg", title: "Farewell to Rai" },
  { id: 14, src: "/book/2/page-14.jpg", title: "Red coral light shower" },
  { id: 15, src: "/book/2/page-15.jpg", title: "Reco\u2019s Kokoro appears" },
  { id: 16, src: "/book/2/page-16.jpg", title: "Reco speaks" },
  { id: 17, src: "/book/2/page-17.jpg", title: "Ocean problems explained" },
  { id: 18, src: "/book/2/page-18.jpg", title: "Go find Amo" },
  { id: 19, src: "/book/2/page-19.jpg", title: "AUWA focuses on signal" },
  { id: 20, src: "/book/2/page-20.jpg", title: "Amo and Yuki appear" },
  { id: 21, src: "/book/2/page-21.jpg", title: "Amo\u2019s eyes glow" },
  { id: 22, src: "/book/2/page-22.jpg", title: "Amo and Yuki Kokoro" },
  { id: 23, src: "/book/2/page-23.jpg", title: "Sea creatures gather" },
  { id: 24, src: "/book/2/page-24.jpg", title: "Dolphin\u2019s story" },
  { id: 25, src: "/book/2/page-25.jpg", title: "Dolphin\u2019s memory" },
  { id: 26, src: "/book/2/page-26.jpg", title: "Machines on ocean floor" },
  { id: 27, src: "/book/2/page-27.jpg", title: "Go to the Toshi" },
  { id: 28, src: "/book/2/page-28.jpg", title: "Farewell from Amo" },
  { id: 29, src: "/book/2/page-29.jpg", title: "AUWA flies on" },
  { id: 30, src: "/book/2/page-30.jpg", title: "Copyright (back)" },
];

function Overlays({ overlays }: { overlays?: TextOverlay[] }) {
  if (!overlays?.length) return null;
  return (
    <>
      {overlays.map((o, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: o.x,
            top: o.y,
            width: o.w,
            ...o.style,
          }}
        >
          {o.text}
        </div>
      ))}
    </>
  );
}

export default function Book2Page() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const container = document.getElementById("book-scroll");
        if (!container) return;
        container.scrollTo({ top: container.scrollTop + container.clientHeight, behavior: "smooth" });
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const container = document.getElementById("book-scroll");
        if (!container) return;
        container.scrollTo({ top: container.scrollTop - container.clientHeight, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#0a0a0c] overflow-hidden">
      <div
        id="book-scroll"
        className="h-full w-full overflow-y-scroll"
        style={{
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
        }}
      >
        {bookPages.map((page) => (
          <section
            key={page.id}
            className="h-screen w-screen flex items-center justify-center bg-[#0a0a0c] relative"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="relative h-full w-full flex items-center justify-center p-4">
              <img
                src={page.src}
                alt={page.title}
                className="max-h-full max-w-full object-contain"
                style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.5)" }}
              />
              <Overlays overlays={page.overlays} />
            </div>
            <span
              className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-white/15 font-mono"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              {page.id} / {bookPages.length}
            </span>
          </section>
        ))}
      </div>

      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 pointer-events-none"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        <span className="text-[12px] tracking-[0.2em] text-white/20">
          AUWA — BOOK 2: UMI (OLD VERSION)
        </span>
        <span className="text-[11px] tracking-[0.1em] text-white/15">
          REVIEW MOCKUP
        </span>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap");
        #book-scroll::-webkit-scrollbar { display: none; }
        #book-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
