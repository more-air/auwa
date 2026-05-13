"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AuwaLogo } from "./auwa-logo";
import { useHeaderTone, type Tone } from "./header-tone";
import { useTransitionPanelTheme } from "./page-transition";
import { SoundToggle } from "./sound-toggle";

// Main menu — only fully-developed sections. /app and /store are signup
// teasers; the home page surfaces them via the four-pillar module + the
// three-pillar cards, so they don't earn a top-level menu slot until
// they're real destinations.
//
// Order: Book, Store, Journal, About. Book leads because it's the most
// developed pillar (illustrated story, character, seven stars), the thing
// first-time visitors are most likely to be drawn into. Store sits second
// now that it carries the signed Auwa figure editions — a real product
// hook, not just a teaser.
const navItems = [
  { label: "Book", href: "/book" },
  { label: "Store", href: "/store" },
  { label: "Journal", href: "/journal" },
  { label: "About", href: "/about" },
];

/*
  Header — edge-pinned bare elements (Awwwards-style).

  Rather than a full-width sticky bar that hides on scroll, the wordmark
  sits at top-left and the menu trigger sits at top-right as independent
  fixed elements. Both are always visible (no hide-on-scroll), with
  SOLID colour (light or dark) chosen per route + per element based on
  the surface that sits beneath it. Reference: Aman, Aesop, current
  Awwwards SOTD pattern.

  Why not `mix-blend-mode: difference`? It pixel-inverts against the
  underlying content, which produces inverted-hue artefacts over
  photographic mid-tones (a blueish/grey wash on the homepage's pale
  Auwa hero, etc.). Solid colour reads cleaner.

  Colour rules:
  • Menu open  → sumi (surface overlay covers the page).
  • Over photographic hero (home / book / article hero / teaser image
    side) → surface (the locked tone for light foreground on imagery).
  • Past hero on dark page (/book) → washi.
  • Past hero on light page (article past hero, teaser scrolled) → sumi.
  • Default light page → sumi.
*/

// Routes whose top-of-page is a full-bleed photographic hero. While in
// view, both header elements sit on imagery → Surface tone. Once
// scrolled past, each element switches to the page theme.
function hasPhotographicHero(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/book" ||
    (pathname.startsWith("/journal/") && pathname !== "/journal")
  );
}

export function Header() {
  const pathname = usePathname();
  const hideHeader = pathname === "/instagram";

  // Synchronous list of dark-themed routes for first-paint correctness;
  // MutationObserver is the runtime safety net for any future dynamic
  // dark surface that toggles `data-page-theme` on <html>.
  const KNOWN_DARK_ROUTES = ["/book"];
  const isKnownDarkRoute = KNOWN_DARK_ROUTES.includes(pathname);
  const [darkPage, setDarkPage] = useState(isKnownDarkRoute);
  useEffect(() => {
    const html = document.documentElement;
    const sync = () => setDarkPage(html.dataset.pageTheme === "dark");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(html, {
      attributes: true,
      attributeFilter: ["data-page-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  // `closing` is set synchronously during render the moment menuOpen
  // flips false (via the renderedMenuOpen pattern below). Without this
  // flag, items would briefly use the "rest" class (translate-y-4) for
  // one render frame before the useEffect could correct them — visible
  // as a slide-down on click. Cleared 1800ms after close completes.
  const [closing, setClosing] = useState(false);
  const [renderedMenuOpen, setRenderedMenuOpen] = useState(menuOpen);
  // menuColorActive flips ~1500ms after the menu opens — once the
  // panel has reached the top of the viewport (1800ms slide). Without
  // the delay the header would briefly sit invisible (Sumi over a
  // dark hero) during the panel's upward rise.
  const [menuColorActive, setMenuColorActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [renderedPathname, setRenderedPathname] = useState(pathname);

  // Track scroll past hero on hero pages.
  const [pastHero, setPastHero] = useState(false);
  const pastHeroRef = useRef(false);

  // Track viewport breakpoints for per-element split-layout decisions.
  const [isMdUp, setIsMdUp] = useState(false);
  const [isLgUp, setIsLgUp] = useState(false);

  // Reset state on pathname change (synchronous render-time pattern).
  if (renderedPathname !== pathname) {
    setRenderedPathname(pathname);
    setMenuOpen(false);
    setPastHero(false);
    pastHeroRef.current = false;
    setDarkPage(isKnownDarkRoute);
  }

  // Synchronously derive `closing` from menuOpen during render. React's
  // recommended pattern for state that must update before paint, so
  // items use the correct class on the very first render after a
  // close — no frame of slide-down.
  if (renderedMenuOpen !== menuOpen) {
    setRenderedMenuOpen(menuOpen);
    setClosing(!menuOpen);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  // Drive menuColorActive + clear `closing` from menuOpen.
  useEffect(() => {
    if (menuOpen) {
      // Header colour flips early — at 200ms the panel has already
      // descended enough (with the ease-in-out curve) to cover the
      // logo + menu trigger area, so the colour change happens
      // before the panel fully completes its 700ms slide. Together
      // with the shorter 180ms colour transition this feels snappy
      // rather than laggy.
      const tColor = window.setTimeout(() => setMenuColorActive(true), 200);
      return () => clearTimeout(tColor);
    }
    if (closing) {
      // Hold the menu colour active until the panel is approaching
      // the header band on its ascent — then flip the colour so the
      // 180ms transition LANDS on destination tone exactly as the
      // panel uncovers the header. With the panel ascend taking 700ms
      // and starting at t=150ms (after the 150ms items-fade), the
      // panel's bottom edge passes the header band (~10vh from the
      // viewport top) at roughly t=780ms (Y reaches -90% near the
      // end of the eased ascent). Flipping at 600ms means the 180ms
      // colour transition completes at ~780ms — by the moment the
      // user can see the destination page's header band, the logo +
      // menu icon are already in the destination tone. Earlier flips
      // (e.g. immediate on click) showed the destination tone while
      // the panel was still covering — read as "the colour changed
      // inside the menu". Later flips (e.g. 900ms after close started)
      // showed the menu tone briefly against the destination page.
      // 600ms is the handoff sweet spot.
      const tColorOff = window.setTimeout(
        () => setMenuColorActive(false),
        600
      );
      // Clear the closing flag after the close cycle settles
      // (~150ms items fade + 250ms delay + 700ms panel ascend = 1100ms,
      // plus a small buffer so items can re-set their pre-open
      // translate invisibly).
      const tClear = window.setTimeout(() => setClosing(false), 1300);
      return () => {
        clearTimeout(tColorOff);
        clearTimeout(tClear);
      };
    }
    // Not open and not closing (initial mount): make sure colour is off.
    setMenuColorActive(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen]);

  // ESC closes the menu. bfcache resync — if the user opens the menu,
  // backgrounds the tab, then returns, iOS Safari can restore React
  // state from before background while the visible page no longer
  // matches; close defensively on visibilitychange + pageshow.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResync = () => setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("pageshow", onResync);
    document.addEventListener("visibilitychange", onResync);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("pageshow", onResync);
      document.removeEventListener("visibilitychange", onResync);
    };
  }, [menuOpen]);

  useEffect(() => {
    const md = window.matchMedia("(min-width: 768px)");
    const lg = window.matchMedia("(min-width: 1024px)");
    const updateMd = () => setIsMdUp(md.matches);
    const updateLg = () => setIsLgUp(lg.matches);
    updateMd();
    updateLg();
    md.addEventListener("change", updateMd);
    lg.addEventListener("change", updateLg);
    return () => {
      md.removeEventListener("change", updateMd);
      lg.removeEventListener("change", updateLg);
    };
  }, []);

  // pastHero: ref-gated scroll listener (only re-renders on actual
  // boundary crossing, not every scroll frame).
  useEffect(() => {
    if (!hasPhotographicHero(pathname)) {
      pastHeroRef.current = false;
      setPastHero(false);
      return;
    }
    const onScroll = () => {
      // Switch tone the moment the floating elements (top-6 = 24px
      // from viewport top) cross out of the hero. Heroes are 100svh
      // tall, so the boundary is at scroll = vh - 24px (i.e., scroll
      // by which the floating element TOP has reached the hero's
      // bottom edge in document space). The 300ms colour transition
      // smooths the swap so it doesn't look like a hard switch.
      const threshold = window.innerHeight - 24;
      const next = window.scrollY > threshold;
      if (next !== pastHeroRef.current) {
        pastHeroRef.current = next;
        setPastHero(next);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // bfcache resync — when tab reopens, scroll may be at top while
    // React state thinks we're past the hero.
    const resync = () => {
      pastHeroRef.current = false;
      setPastHero(false);
      onScroll();
    };
    window.addEventListener("pageshow", resync);
    document.addEventListener("visibilitychange", resync);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", resync);
      document.removeEventListener("visibilitychange", resync);
    };
  }, [pathname]);

  const isArticleHero =
    pathname.startsWith("/journal/") &&
    pathname !== "/journal" &&
    !pastHero;
  const isTeaser = pathname === "/app" || pathname === "/store";

  // While the page-transition panel is rising, we colour the floating
  // elements against the PANEL, not the leaving page. Dark panel →
  // light text (washi). Light panel → dark text (sumi). This is what
  // makes the logo flip white during the dark wipe en route to /book.
  const panelTheme = useTransitionPanelTheme();
  // Sentinel-based tone — sections drop <HeaderTone tone="surface|
  // sumi|washi" /> to declare what colour the header should be while
  // they sit beneath the floating header band. The provider returns
  // null per side when no sentinel is in band; we fall back to the
  // existing per-route logic in that case so pages without sentinels
  // continue to behave correctly.
  const tones = useHeaderTone();
  const tokenFor = (t: Tone) =>
    t === "surface"
      ? "var(--color-surface)"
      : t === "washi"
      ? "var(--color-washi)"
      : "var(--color-sumi)";

  function pickColour(side: "left" | "right"): string {
    // During the page-transition wipe, the leaving content is
    // overlaid with a Yoru darkening wash. Both elements go Washi
    // regardless of destination — the header reads against the dark.
    if (panelTheme !== null) return "var(--color-washi)";
    if (menuColorActive) return "var(--color-sumi)";

    // Sentinel tone — wins over per-route logic when present.
    const sentinelTone = side === "left" ? tones.left : tones.right;
    if (sentinelTone) return tokenFor(sentinelTone);

    // Fallback per-route logic for sections without sentinels.
    if (pathname === "/" || pathname === "/book") {
      if (pastHero)
        return darkPage ? "var(--color-washi)" : "var(--color-sumi)";
      return "var(--color-surface)";
    }
    if (isArticleHero) {
      if (!isMdUp) return "var(--color-surface)";
      return side === "left"
        ? "var(--color-surface)"
        : "var(--color-sumi)";
    }
    if (isTeaser) {
      if (!isLgUp) return "var(--color-sumi)";
      return side === "left"
        ? "var(--color-sumi)"
        : "var(--color-surface)";
    }
    return darkPage ? "var(--color-washi)" : "var(--color-sumi)";
  }
  const logoColour = pickColour("left");
  const menuColour = pickColour("right");

  /*
    Menu choreography — drops down from above and ascends back above
    (the menu trigger lives top-right, so the panel arrives FROM where
    the user clicked).

    Open:
    • Panel descends from translateY(-100%) → 0 over 700ms with
      expo.inOut.
    • Items fade in starting at 500ms (per-item 60ms stagger), so the
      cascade overlaps the panel arrival.

    Close:
    • Items fade out FIRST (150ms unstaggered).
    • Panel ascends back: translateY 0 → -100%, 700ms, delayed 150ms
      so items leave first. Panel fully out at ~850ms.
  */
  const MENU_EASE = "cubic-bezier(0.87, 0, 0.13, 1)";
  // Menus need to feel responsive — 700ms is snappy without sacrificing
  // the same expo.inOut curve used elsewhere on the site.
  const MENU_MS = 700;
  // Panel: open ends at translate(0,0); closed sits at translate(0,
  // -100%) (above the viewport, behind where the menu trigger lives).
  const menuPanelTransform = menuOpen
    ? "translate3d(0, 0, 0)"
    : "translate3d(0, -100%, 0)";
  // Open: no delay, panel descends immediately.
  // Close: 150ms delay so items finish fading out before panel ascends.
  const menuPanelTransition = menuOpen
    ? `transform ${MENU_MS}ms ${MENU_EASE}`
    : `transform ${MENU_MS}ms ${MENU_EASE} 150ms`;
  const menuItemActive = menuOpen;

  const menuOverlay = (
    <div
      className={`fixed inset-0 z-[90] ${
        menuOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{
        overscrollBehavior: "contain",
        touchAction: "manipulation",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-paper"
        style={{
          transform: menuPanelTransform,
          transition: menuPanelTransition,
        }}
      />
      {/* Nav block — vertically and horizontally centred in the overlay
          so the user's cursor / thumb has the shortest path from the
          menu trigger (top-right) to any nav item. */}
      <div className="relative flex flex-col items-center justify-center h-full px-6 md:px-12 lg:px-20 xl:px-28">
        <nav className="text-center">
          <ul className="flex flex-col items-center">
            {navItems.map((item, i) => (
              <li
                key={item.href}
                className={`transition-all ease-out-expo ${
                  menuItemActive
                    ? "opacity-100 translate-y-0"
                    : closing
                    ? // Closing: fade only, no slide. Items must leave
                      // gracefully without the slide-down "running
                      // away" feel. `closing` is set synchronously
                      // during render so this class lands on the very
                      // first frame after the click — no slide-down
                      // gets played.
                      "opacity-0 translate-y-0"
                    : // Rest (initial paint / after close-cycle clears):
                      // pre-set the translate so the next open animates
                      // a rise. Invisible because opacity is 0.
                      "opacity-0 translate-y-4"
                }`}
                style={{
                  // Open: items rise once the panel has covered. Panel
                  // covers at 700ms; items start at 500ms with 60ms
                  // stagger so the cascade overlaps the panel arrival.
                  // Close: 150ms fade-out (unstaggered), so items are
                  // gone before the panel ascends at the 150ms delay.
                  transitionDuration: menuOpen ? "500ms" : "150ms",
                  transitionDelay: menuOpen ? `${500 + i * 60}ms` : "0ms",
                }}
              >
                <Link
                  href={item.href}
                  // Skip the visual page-transition wipe — the menu's
                  // own close motion is the visual transition.
                  // PageTransition still gates revealReady=false on
                  // this navigation, so the destination page's
                  // FadeIn / TextReveal elements wait until ~180ms
                  // after the menu close finishes before cascading in.
                  data-skip-transition="true"
                  onClick={() => {
                    // Don't close the menu here for cross-page clicks.
                    // PageTransition's click handler calls router.push
                    // immediately, but the new page doesn't mount
                    // synchronously — there's a window (variable, up to
                    // a few hundred ms) before the route commits. If
                    // the panel starts ascending in that window, the
                    // OLD page is still mounted underneath and the user
                    // sees a flash of it through the bottom of the
                    // rising panel. Instead, let the pathname-change
                    // reset above call setMenuOpen(false) once the new
                    // page has actually mounted — by then the page
                    // below the panel is the destination page, so the
                    // ascent reveals it cleanly. Same-page clicks won't
                    // trigger a pathname change, so close manually.
                    // The colour-flip useEffect (keyed on menuOpen)
                    // schedules itself relative to that close event,
                    // so the destination tone still lands as the panel
                    // uncovers the header.
                    if (pathname === item.href) {
                      setMenuOpen(false);
                    }
                  }}
                  className={`group relative inline-block font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.08] tracking-[0.005em] transition-colors duration-300 ${
                    pathname === item.href
                      ? "text-sumi"
                      : "text-sumi/45 hover:text-sumi"
                  }`}
                >
                  <span className="relative inline-block overflow-hidden pb-[0.12em]">
                    <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-[110%]">
                      {item.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 translate-y-[110%] transition-transform duration-500 ease-text-roll group-hover:translate-y-0"
                    >
                      {item.label}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Hairline separator — sits in the same delayed-reveal block
              as the Instagram link, so it cascades in together. Matches
              the dividers used elsewhere on the site (sumi at 10%).
              Tightened from mt-10/mt-12 to mt-6/mt-8 in May 2026 after
              /app and /store were removed from the menu — the original
              spacing was proportional to a 5-item stack and read as a
              void below About in the 3-item version. */}
          <div
            aria-hidden="true"
            className={`mt-4 mx-auto h-px w-10 bg-sumi/15 transition-all ease-out-expo ${
              menuItemActive
                ? "opacity-100 translate-y-0"
                : closing
                ? "opacity-0 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDuration: menuOpen ? "500ms" : "150ms",
              transitionDelay: menuOpen
                ? `${500 + navItems.length * 60 + 80}ms`
                : "0ms",
            }}
          />
          <div
            className={`mt-7 flex items-center justify-center gap-7 transition-all ease-out-expo ${
              menuItemActive
                ? "opacity-100 translate-y-0"
                : closing
                ? "opacity-0 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              // Open: arrives last, after the nav cascade finishes.
              // Close: 150ms unstaggered exit, same as the nav items.
              transitionDuration: menuOpen ? "500ms" : "150ms",
              transitionDelay: menuOpen
                ? `${500 + navItems.length * 60 + 80}ms`
                : "0ms",
            }}
          >
            <a
              href="https://instagram.com/auwalife"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Auwa on Instagram"
              className="inline-block text-sumi/45 hover:text-sumi transition-colors duration-300"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );

  if (hideHeader) return null;

  return (
    <>
      {/* Edge-pinned wordmark — fixed top-left, no bar.
          Position aligns with the page gutter (px-6 md:px-12 lg:px-20
          xl:px-28) so the wordmark's left edge lines up with body content
          on every viewport.
          Fades out when the menu opens so the open menu reads as nav + X. */}
      <Link
        href="/"
        onClick={() => {
          // Mirrors the menu-link behaviour. For cross-page navigation
          // (user on /journal clicks logo), let the pathname-change
          // reset in render close the menu once the destination has
          // mounted — otherwise the panel ascends before the new page
          // commits and the user sees a flash of the old page through
          // the bottom of the rising panel. For same-page click (user
          // already on /), no pathname change will fire, so close
          // explicitly here.
          if (menuOpen && pathname === "/") {
            setMenuOpen(false);
          }
        }}
        // When clicked WITH menu open, skip the page-transition wipe —
        // the menu's own close motion is the visual transition, same
        // pattern as the nav items below. Without this, the user saw
        // a "double transition" (menu closing + dark wash + light
        // panel rising). When the menu is closed, the logo is just a
        // normal home link and the full page transition runs as
        // designed.
        {...(menuOpen ? { "data-skip-transition": "true" } : {})}
        className="fixed top-6 left-6 md:top-8 md:left-12 lg:top-10 lg:left-20 xl:top-12 xl:left-28 z-[100] block"
        style={{
          // Logo stays visible (and clickable, navigates home) while
          // the menu is open — same treatment as the menu trigger.
          // pickColour flips it to Sumi when menuColorActive turns
          // true; 180ms is snappy without snapping outright.
          transition: "color 180ms ease-out",
          color: logoColour,
        }}
      >
        <span className="sr-only">Auwa</span>
        <AuwaLogo className="block h-[20px] md:h-[22px] w-auto" />
      </Link>

      {/* Sound toggle — sits to the LEFT of the menu trigger and
          shares its colour stream so the two read as one cluster.
          Stays visible (and clickable) while the menu is open so the
          user can still toggle ambient sound without leaving the
          menu. Gap to the menu trigger: 24px (44px button width +
          24px breathing). */}
      <SoundToggle
        className="fixed top-[calc(1.5rem-0.5rem)] right-[calc(1.5rem-0.5rem+44px+24px)] md:top-[calc(2rem-0.5rem)] md:right-[calc(3rem-0.5rem+44px+24px)] lg:top-[calc(2.5rem-0.5rem)] lg:right-[calc(5rem-0.5rem+44px+24px)] xl:top-[calc(3rem-0.5rem)] xl:right-[calc(7rem-0.5rem+44px+24px)] z-[100]"
        style={{
          color: menuColour,
          transition: "color 180ms ease-out",
        }}
      />

      {/* Edge-pinned menu trigger — fixed top-right, no bar.
          Position aligns with the page gutter so the trigger's right edge
          lines up with body content on every viewport. Always visible.
          Morphs hamburger ↔ X on toggle. Sits at z-[100] above the
          overlay (z-[90]) so the X is readable when the menu is open. */}
      <button
        type="button"
        // Right offsets are 8px (p-2) larger than the page gutter so the
        // VISUAL right edge of the hamburger lines up with the right
        // edge of body content. The button's tap target extends 8px past
        // that for accessibility.
        className="fixed top-[calc(1.5rem-0.5rem)] right-[calc(1.5rem-0.5rem)] md:top-[calc(2rem-0.5rem)] md:right-[calc(3rem-0.5rem)] lg:top-[calc(2.5rem-0.5rem)] lg:right-[calc(5rem-0.5rem)] xl:top-[calc(3rem-0.5rem)] xl:right-[calc(7rem-0.5rem)] z-[100] p-2 cursor-pointer"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        style={{
          color: menuColour,
          transition: "color 180ms ease-out",
        }}
      >
        {/* Hamburger geometry preserved from the previous header.
            Container 28×22, lines at top 2/10/18 with 2px height.
            Visible span ~18px, sized to feel like the wordmark beside it.
            All three spans share IDENTICAL rendering hints (willChange,
            backfaceVisibility, transform always set, transformOrigin
            centred) so iOS Safari assigns them the same compositor
            layer and rasterises each line at the same thickness. The
            middle span's transition list only animates opacity but
            still declares `top, transform` in willChange so its layer
            properties match the outer two — without that match, iOS
            renders it visibly thinner than its siblings. Same fix as
            patterns.md "Tailwind 4 gotchas / Explicit transform and
            rendering hints on sibling animated elements". */}
        <div className="w-[28px] h-[22px] relative">
          <span
            className="absolute left-0 w-full h-[2px] bg-current"
            style={{
              top: menuOpen ? "10px" : "2px",
              transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)",
              transformOrigin: "50% 50%",
              willChange: "top, transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transition:
                "top 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
          <span
            className="absolute left-0 top-[10px] w-full h-[2px] bg-current"
            style={{
              opacity: menuOpen ? 0 : 1,
              transform: "rotate(0deg)",
              transformOrigin: "50% 50%",
              willChange: "top, transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transition: "opacity 200ms ease-out",
            }}
          />
          <span
            className="absolute left-0 w-full h-[2px] bg-current"
            style={{
              top: menuOpen ? "10px" : "18px",
              transform: menuOpen ? "rotate(-45deg)" : "rotate(0deg)",
              transformOrigin: "50% 50%",
              willChange: "top, transform",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transition:
                "top 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      </button>

      {/* Menu overlay portalled to body so the page-transition wrapper's
          stacking context can't clip it. */}
      {mounted ? createPortal(menuOverlay, document.body) : null}
    </>
  );
}
