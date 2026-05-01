"use client";

/*
  Sentinel-based header tone.

  Pages drop <HeaderTone tone="surface|sumi|washi" /> inside a section
  to declare what colour the header (logo + menu trigger + sound bars)
  should be while that section sits beneath the floating header band.

  How it works:
  - The sentinel is an absolutely-positioned 1px-tall element pinned to
    the TOP of its parent container. Its data-header-tone attribute
    carries the declared tone.
  - A single document-level IntersectionObserver watches every
    [data-header-tone] element using a rootMargin that shrinks the
    viewport to just the top header band (the 80px zone where the
    floating logo + trigger sit).
  - The most recently entered sentinel "wins" — its tone is the active
    one. As the user scrolls, sentinels enter and exit the band and
    the active tone updates accordingly.
  - For split-layout heroes (article: image left / text right) two
    sentinels can sit at the same Y position with different sides
    declared via the `side` prop ("left" | "right" | "both").
  - The Header component reads activeTone via the useHeaderTone hook.
    panelTheme and menuColorActive overrides still take precedence.

  Why not pixel-sample the area under the header? Sampling reads the
  composited canvas live and is expensive; sentinels are declarative,
  cheap, and deterministic.
*/

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type Tone = "surface" | "sumi" | "washi";
export type Side = "left" | "right" | "both";

interface ActiveTones {
  left: Tone | null;
  right: Tone | null;
}

const HeaderToneContext = createContext<ActiveTones>({
  left: null,
  right: null,
});

export function useHeaderTone() {
  return useContext(HeaderToneContext);
}

/**
 * Drop inside a section. The sentinel spans the FULL height of its
 * parent (which must be `position: relative` or another positioned
 * context) so it intersects the header band as long as any part of
 * the parent is near the top of the viewport — not just the very
 * top edge. Tones are declarative — the header observes them.
 */
export function HeaderTone({
  tone,
  side = "both",
}: {
  tone: Tone;
  side?: Side;
}) {
  return (
    <div
      aria-hidden="true"
      data-header-tone={tone}
      data-header-tone-side={side}
      // The sentinel has no content/bg/border so it's already invisible.
      // Crucially, NO `visibility: hidden` here — Chromium's
      // IntersectionObserver treats `visibility: hidden` elements as
      // not intersecting, which would silently break the whole tone
      // system after the first observe (sentinels appear "outside" the
      // header band even when their rect IS inside it).
      className="absolute inset-0 pointer-events-none"
    />
  );
}

/**
 * Provides activeTone for the header. Mount once near the top of the
 * tree (in layout.tsx). Watches every [data-header-tone] sentinel via
 * a single IO — sentinels can be added/removed dynamically (route
 * change, conditional rendering) and the IO picks them up via a
 * MutationObserver.
 */
export function HeaderToneProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tones, setTones] = useState<ActiveTones>({ left: null, right: null });
  const intersectingRef = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    // Recompute the active left + right tone from the set of currently
    // intersecting sentinels. For each sentinel, check if its rect
    // covers the left half / right half of the viewport. The sentinel
    // declared LATEST in DOM order wins (later sections override).
    const recompute = () => {
      let leftTone: Tone | null = null;
      let rightTone: Tone | null = null;
      const ordered = Array.from(intersectingRef.current).sort((a, b) => {
        const pos = a.compareDocumentPosition(b);
        if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
        if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
        return 0;
      });
      const vw = window.innerWidth;
      const halfway = vw / 2;
      // Tolerance: a sentinel must extend at least 5% of viewport width
      // INTO each half to be counted. Without this, a 50/50 grid where
      // the right column's left edge sits a few px short of `halfway`
      // (sub-pixel rounding, grid gap, or border) lets the right
      // sentinel technically "cover" the left half by 3px — overriding
      // the left sentinel's tone and breaking split-layout headers
      // (teaser pages: the logo flips to surface and disappears on the
      // white text-side bg).
      const tolerance = vw * 0.05;
      for (const el of ordered) {
        const tone = el.dataset.headerTone as Tone | undefined;
        const side = (el.dataset.headerToneSide as Side) || "both";
        if (!tone) continue;
        const rect = el.getBoundingClientRect();
        const coversLeft =
          rect.left < halfway - tolerance && rect.right > 0;
        const coversRight =
          rect.right > halfway + tolerance && rect.left < vw;
        if ((side === "both" || side === "left") && coversLeft) leftTone = tone;
        if ((side === "both" || side === "right") && coversRight)
          rightTone = tone;
      }
      setTones((prev) =>
        prev.left === leftTone && prev.right === rightTone
          ? prev
          : { left: leftTone, right: rightTone }
      );
    };

    // The header band: top 80px of the viewport. A sentinel is "in
    // band" when its rect intersects this strip. rootMargin syntax is
    // top right bottom left; `-(viewport - 80)px` on the bottom shrinks
    // the root to a 80px-tall band glued to the top.
    const headerBand = 80;

    // Track the active IO via a holder so the resize handler can swap
    // it AND the MutationObserver's observe() always reaches the
    // current live observer (not a disconnected closure capture).
    const ioHolder: { current: IntersectionObserver | null } = { current: null };

    const buildIO = () =>
      new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) intersectingRef.current.add(el);
            else intersectingRef.current.delete(el);
          }
          recompute();
        },
        {
          rootMargin: `0px 0px -${Math.max(0, window.innerHeight - headerBand)}px 0px`,
          threshold: 0,
        }
      );

    ioHolder.current = buildIO();
    const observed = new Set<HTMLElement>();
    const observe = (el: Element) => {
      if (!(el instanceof HTMLElement)) return;
      if (observed.has(el)) return;
      observed.add(el);
      ioHolder.current?.observe(el);
    };
    document.querySelectorAll("[data-header-tone]").forEach(observe);

    // Pick up sentinels mounted later (route changes, conditional
    // rendering inside dynamic components).
    const mo = new MutationObserver((records) => {
      for (const rec of records) {
        rec.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches?.("[data-header-tone]")) observe(node);
          node.querySelectorAll?.("[data-header-tone]").forEach(observe);
        });
        rec.removedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches?.("[data-header-tone]")) {
            intersectingRef.current.delete(node);
          }
          node
            .querySelectorAll?.("[data-header-tone]")
            .forEach((el) =>
              intersectingRef.current.delete(el as HTMLElement)
            );
        });
      }
    });
    mo.observe(document.body, { subtree: true, childList: true });

    // Recompute on resize — the band rootMargin depends on innerHeight
    // and the left/right split depends on innerWidth. We rebuild the IO
    // (rootMargin can't be mutated in place) and swap it via ioHolder so
    // observe() always reaches the live observer.
    const onResize = () => {
      ioHolder.current?.disconnect();
      ioHolder.current = buildIO();
      document
        .querySelectorAll("[data-header-tone]")
        .forEach((el) => ioHolder.current?.observe(el));
      // Recompute once after rebuild — the new IO will fire its own
      // intersection callbacks for the elements it just observed, but
      // forcing a recompute here means the tones reflect the post-resize
      // viewport split immediately, before the IO callbacks land.
      recompute();
    };
    window.addEventListener("resize", onResize);

    return () => {
      ioHolder.current?.disconnect();
      mo.disconnect();
      window.removeEventListener("resize", onResize);
      intersectingRef.current.clear();
    };
  }, []);

  return (
    <HeaderToneContext.Provider value={tones}>
      {children}
    </HeaderToneContext.Provider>
  );
}
