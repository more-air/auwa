"use client";

import { useState, type PointerEvent } from "react";
import type { PostTile, PostType } from "./lib";

function TypeIcon({ type, isVideo }: { type: PostType; isVideo: boolean }) {
  const baseClass = "absolute top-2 right-2 w-6 h-6 rounded-full bg-sumi/70 flex items-center justify-center text-white pointer-events-none";

  if (type === "reel" || isVideo) {
    return (
      <div className={baseClass} title="Reel">
        <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </div>
    );
  }
  if (type === "carousel") {
    return (
      <div className={baseClass} title="Carousel">
        <svg className="w-[14px] h-[14px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="7" width="13" height="13" rx="1.5"/><path d="M4 16V5a1 1 0 0 1 1-1h11"/></svg>
      </div>
    );
  }
  if (type === "editorial") {
    return (
      <div className={baseClass} title="Editorial slideshow">
        <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 6h16M4 12h16M4 18h10"/></svg>
      </div>
    );
  }
  if (type === "single") {
    return (
      <div className={baseClass} title="Single image">
        <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="1.5"/></svg>
      </div>
    );
  }
  return (
    <div className={baseClass} title="Unknown">
      <span className="text-[11px] font-medium">?</span>
    </div>
  );
}

// Stop pointer/click propagation so the dnd-kit drag handler on the
// parent doesn't treat arrow taps as drag starts.
function stop(e: PointerEvent | React.MouseEvent) {
  e.stopPropagation();
}

export function TileContent({ tile, position, dimmed, dragging }: { tile: PostTile; position: number; dimmed?: boolean; dragging?: boolean }) {
  const candidates = tile.candidates;
  const total = candidates.length;
  const [index, setIndex] = useState(tile.coverIndex);
  const safeIndex = total > 0 ? Math.min(index, total - 1) : 0;
  const current = total > 0 ? candidates[safeIndex] : null;

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (total < 2) return;
    setIndex((i) => (i + 1) % total);
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (total < 2) return;
    setIndex((i) => (i - 1 + total) % total);
  };

  const isVideo = current?.isVideo ?? false;
  const url = current?.url ?? null;

  return (
    <div className={`relative aspect-[3/4] overflow-hidden bg-[#efefef] group ${dimmed ? "opacity-60" : ""} ${dragging ? "ring-2 ring-[#c44a2a] ring-offset-2 ring-offset-white" : ""}`}>
      {tile.exists && url ? (
        isVideo ? (
          <video
            key={url}
            src={url}
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={url}
            src={url}
            alt={tile.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200 group-hover:opacity-90 pointer-events-none"
            loading="lazy"
            draggable={false}
          />
        )
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-sumi/45 p-3 text-center pointer-events-none">
          <svg className="w-6 h-6 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 8v4M12 16h.01"/>
          </svg>
          <span className="font-sans text-[11px] uppercase tracking-[0.14em]">Planned, no folder</span>
        </div>
      )}

      <TypeIcon type={tile.type} isVideo={isVideo} />

      {total > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={prev}
            onPointerDown={stop}
            onMouseDown={stop}
            className="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={next}
            onPointerDown={stop}
            onMouseDown={stop}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 6l6 6-6 6"/></svg>
          </button>
          <div className="absolute top-10 right-2 px-1.5 py-0.5 rounded-sm bg-black/60 text-white font-sans text-[9px] tracking-[0.04em] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {safeIndex + 1}/{total}
          </div>
        </>
      )}

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="text-white font-sans text-[11px] leading-tight">
          <div className="font-medium truncate">{tile.title}</div>
          <div className="text-white/70 text-[10px] truncate">
            {current ? current.name : tile.slug}
            {tile.scheduled ? ` · ${tile.scheduled}` : ""}
          </div>
        </div>
      </div>

      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-sumi/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <span className="font-sans text-[11px] text-white font-medium">{position}</span>
      </div>
    </div>
  );
}
