"use client";

/* ─── Book 1: The Beginning — Review Mockup ─── */

/*
  Full-screen snap-scroll viewer. Each page fills the viewport.
  Scroll or arrow-key to move between pages.

  TEXT OVERLAY SYSTEM:
  When copy changes are requested, add overlay entries to a page's
  `overlays` array. Each overlay positions styled HTML text on top
  of the page image, covering the original baked-in text.

  IMAGE SWAPS:
  To swap an illustration, replace the relevant page-XX.jpg in
  /public/book/1/ and the change is immediate.
*/

import { useEffect } from "react";

interface TextOverlay {
  x: string; // CSS left position (e.g. "5%")
  y: string; // CSS top position
  w: string; // CSS width
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
  { id: 1, src: "/book/1/page-01.jpg", title: "Cover" },
  { id: 2, src: "/book/1/page-02.jpg", title: "Galaxy" },
  { id: 3, src: "/book/1/page-03.jpg", title: "WAWA answers" },
  { id: 4, src: "/book/1/page-04.jpg", title: "AUWA born" },
  { id: 5, src: "/book/1/page-05.jpg", title: "Meets Earth" },
  { id: 6, src: "/book/1/page-06.jpg", title: "Purple sunset" },
  { id: 7, src: "/book/1/page-07.jpg", title: "Forest" },
  { id: 8, src: "/book/1/page-08.jpg", title: "Finding Bluu" },
  { id: 9, src: "/book/1/page-09.jpg", title: "Kokoro reveal" },
  { id: 10, src: "/book/1/page-10.jpg", title: "Bluu\u2019s story" },
  { id: 11, src: "/book/1/page-11.jpg", title: "Loneliness" },
  { id: 12, src: "/book/1/page-12.jpg", title: "Climax" },
  { id: 13, src: "/book/1/page-13.jpg", title: "Restoration" },
  { id: 14, src: "/book/1/page-14.jpg", title: "Microbes intro" },
  { id: 15, src: "/book/1/page-15.jpg", title: "Connected" },
  { id: 16, src: "/book/1/page-16.jpg", title: "Root network" },
  { id: 17, src: "/book/1/page-17.jpg", title: "Singing" },
  { id: 18, src: "/book/1/page-18.jpg", title: "Ending" },
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

export default function Book1Page() {
  // Arrow key navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const container = document.getElementById("book-scroll");
        if (!container) return;
        const currentScroll = container.scrollTop;
        const pageHeight = container.clientHeight;
        container.scrollTo({ top: currentScroll + pageHeight, behavior: "smooth" });
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const container = document.getElementById("book-scroll");
        if (!container) return;
        const currentScroll = container.scrollTop;
        const pageHeight = container.clientHeight;
        container.scrollTo({ top: currentScroll - pageHeight, behavior: "smooth" });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#0a0a0c] overflow-hidden">
      {/* Snap-scroll container */}
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
            {/* Page image — contained within viewport */}
            <div className="relative h-full w-full flex items-center justify-center p-4">
              <img
                src={page.src}
                alt={page.title}
                className="max-h-full max-w-full object-contain"
                style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.5)" }}
              />
              {/* Overlays sit on top of the image */}
              <Overlays overlays={page.overlays} />
            </div>

            {/* Page number */}
            <span
              className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] text-white/15 font-mono"
              style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
            >
              {page.id} / {bookPages.length}
            </span>
          </section>
        ))}
      </div>

      {/* Minimal title overlay */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 pointer-events-none"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        <span className="text-[12px] tracking-[0.2em] text-white/20">
          AUWA — BOOK 1: THE BEGINNING
        </span>
        <span className="text-[11px] tracking-[0.1em] text-white/15">
          REVIEW MOCKUP
        </span>
      </div>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&display=swap");
        /* Hide scrollbar */
        #book-scroll::-webkit-scrollbar { display: none; }
        #book-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
