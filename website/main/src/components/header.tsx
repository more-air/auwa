"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AuwaLogo } from "./auwa-logo";

const navItems = [
  { label: "Journal", href: "/journal" },
  { label: "Store", href: "/store" },
  { label: "App", href: "/app" },
  { label: "Book", href: "/book" },
  { label: "About", href: "/about" },
];

/*
  Header — wordmark left, hamburger right, same on every viewport.

  The inline desktop-nav that shipped originally is archived at
  `components/_archive/header-desktop-nav.tsx`. We kept the data
  (`navItems`) so restoring it is a copy-paste away.

  The menu overlay is full-screen, centred, with links sized by clamp
  so it reads cleanly from iPhone to 4K.
*/
export function Header() {
  const pathname = usePathname();
  // Homepage + the /home-1 flipbook archive both sit over the full-bleed
  // video hero, so they share the transparent header treatment. Every
  // other page has a solid-white header.
  const transparent = pathname === "/" || pathname === "/home-1";
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [mounted, setMounted] = useState(false);
  // Track the last pathname we rendered for. When it changes, we reset
  // state during render itself (see below) so the new page's FIRST render
  // already has the correct header state — no old-state frame paints.
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  const lastScrollY = useRef(0);
  const atTopRef = useRef(true);

  // Adjust state during render on pathname change. This is a documented
  // React pattern for "adjusting state while rendering" — calling setState
  // during render causes React to discard the current render output and
  // immediately re-render with the new state. The commit (and browser
  // paint) only reflects the final state, so the old page's hidden state
  // never leaks into the new page's first frame.
  //
  // This replaces an earlier useLayoutEffect + direct-DOM transition
  // suppression approach that still animated on Safari, because the first
  // render committed with the OLD hidden=true state (className
  // `-translate-y-full`) before the effect could run. The new page's
  // subsequent class change to `translate-y-0` fired the 500ms transition
  // regardless of any inline style manipulation.
  if (renderedPathname !== pathname) {
    setRenderedPathname(pathname);
    setMenuOpen(false);
    setHidden(false);
    setAtTop(true);
    atTopRef.current = true;
    lastScrollY.current = 0;
  }

  useEffect(() => {
    setMounted(true);
  }, []);


  // Hide on scroll down, show on scroll up. atTop has hysteresis so the
  // transparent homepage header can slide up WHILE still transparent
  // (no flash of solid white between transparent and hidden).
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;

      const prevAtTop = atTopRef.current;
      const nextAtTop = prevAtTop ? y <= 400 : y <= 100;
      if (nextAtTop !== prevAtTop) {
        atTopRef.current = nextAtTop;
        setAtTop(nextAtTop);
      }

      const isScrollJump = Math.abs(delta) > 200;
      if (y <= 10) {
        setHidden(false);
      } else if (!isScrollJump && delta > 4) {
        setHidden(true);
      } else if (!isScrollJump && delta < -4) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // iOS Safari bfcache: when the tab is reopened, React state is restored
    // from before backgrounding, which can leave `hidden` stuck true even
    // though the scroll position has reset to the top of the hero. Pageshow
    // + visibilitychange re-sync against the actual scrollY on return.
    const resync = () => {
      const y = window.scrollY;
      lastScrollY.current = y;
      if (y <= 10) {
        setHidden(false);
        if (!atTopRef.current) {
          atTopRef.current = true;
          setAtTop(true);
        }
      }
    };
    window.addEventListener("pageshow", resync);
    document.addEventListener("visibilitychange", resync);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pageshow", resync);
      document.removeEventListener("visibilitychange", resync);
    };
  }, []);

  // Header bg + logo styling driven purely by scroll position. The menu
  // overlay (portalled to body) provides the white covering when the
  // menu is open — the header itself stays transparent to avoid a flash
  // of solid-white background before the overlay has faded in.
  const isTransparent = transparent && atTop;
  const buttonIsLight = transparent && atTop && !menuOpen;

  // No body scroll-lock. Both `body.style.overflow = "hidden"` and
  // `body.style.position = "fixed"` triggered a visible vertical jump
  // on mobile iOS when the menu opened (overflow caused the URL bar to
  // re-show and shift the layout viewport; position-fixed caused a
  // one-frame content shift before the negative-top compensation
  // applied). Since the menu overlay is full-screen opaque and its BG
  // fades in within 80ms, the underlying page is covered before any
  // scroll would be visible. The overlay itself uses
  // `overscroll-behavior: contain` so touch scrolls on the overlay
  // don't propagate to the body beneath.

  const menuOverlay = (
    <div
      className={`fixed inset-0 z-[90] ${
        menuOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      // The overlay has two layers: an opaque white BG that snaps on
      // almost instantly when the menu opens, and the inner content that
      // cascades in over 500ms. The fast BG is essential on mobile — it
      // covers the page before any scroll/URL-bar activity could be
      // seen. `overscroll-behavior: contain` stops touch scrolls on the
      // overlay from propagating to the body beneath, and
      // `touch-action: manipulation` preserves taps while disabling
      // gesture-scroll chaining.
      style={{
        overscrollBehavior: "contain",
        touchAction: "manipulation",
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-surface"
        style={{
          opacity: menuOpen ? 1 : 0,
          // Asymmetric: open is 700ms (fast enough to cover the page
          // instantly on mobile) and close is 1100ms (a slower exhale —
          // the menu lingers as it releases). Same easing in both
          // directions so the feel is consistent.
          transition: menuOpen
            ? "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "opacity 1100ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      {/* Spacer matches the header row so the nav starts below the logo/button */}
      <div className="relative h-16 md:h-20" />

      <div className="relative flex flex-col justify-center h-[calc(100%-4rem)] md:h-[calc(100%-5rem)] px-6 md:px-12 lg:px-20 xl:px-28">
        <nav className="max-w-[600px]">
          <ul className="flex flex-col">
            {navItems.map((item, i) => (
              <li
                key={item.href}
                className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                // Open: 500ms with a per-item stagger.
                // Close: 300ms, no stagger — items fade out quickly together
                // so the text is fully gone before the background finishes
                // its slower exhale (1100ms). Without this, the new page
                // starts appearing through the fading background while the
                // menu text is still partially visible — looks like the
                // text is momentarily sitting on top of page content.
                style={{
                  transitionDuration: menuOpen ? "500ms" : "300ms",
                  transitionDelay: menuOpen ? `${80 + i * 60}ms` : "0ms",
                }}
              >
                <Link
                  href={item.href}
                  className={`group relative inline-block font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.08] tracking-[0.005em] transition-colors duration-300 ${
                    pathname === item.href ? "text-void" : "text-void/40 hover:text-void"
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

          <div
            className={`mt-8 md:mt-10 flex items-center gap-7 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
              menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDuration: menuOpen ? "500ms" : "300ms",
              transitionDelay: menuOpen ? `${80 + navItems.length * 60 + 60}ms` : "0ms",
            }}
          >
            <a
              href="https://instagram.com/auwa.life"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-void/70 hover:text-void transition-colors duration-300"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href="https://x.com/auwalife"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-void/70 hover:text-void transition-colors duration-300"
            >
              <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`sticky top-0 inset-x-0 z-[100] will-change-transform ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          transition: "translate 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/*
          Background as a separate layer underneath the nav. Fading the
          opacity of a solid white layer (rather than transitioning the
          header's own background-color between bg-transparent and
          bg-surface) avoids the "white veil" frames that produce a
          subtle flicker when the homepage scrolls back to the top.
        */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-surface pointer-events-none"
          style={{
            opacity: isTransparent ? 0 : 1,
            transition: "opacity 260ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
        <div className="relative px-6 md:px-12 lg:px-20 xl:px-28">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/*
              Logo fades out when the menu opens so the open menu is
              clean (nav items + X, no logo).
            */}
            <Link
              href="/"
              className="block relative z-[60]"
              aria-hidden={menuOpen ? true : undefined}
              tabIndex={menuOpen ? -1 : undefined}
              style={{
                opacity: menuOpen ? 0 : 1,
                pointerEvents: menuOpen ? "none" : undefined,
                transition: "opacity 300ms ease-out",
              }}
            >
              <span className="sr-only">AUWA</span>
              <AuwaLogo
                className="block h-[20px] md:h-[22px] w-auto"
                style={{
                  color: isTransparent
                    ? "#ffffff"
                    : "oklch(0.08 0.025 250)",
                  transition: "color 300ms ease-out",
                }}
              />
            </Link>

            {/*
              Hamburger-to-X menu button. Shown at every viewport — the
              inline desktop nav that used to sit here is archived at
              `_archive/header-desktop-nav.tsx`.
            */}
            <button
              className="p-2 -mr-2 relative z-[60] cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                color: buttonIsLight ? "#ffffff" : "oklch(0.08 0.025 250)",
                transition: "color 300ms ease-out",
              }}
            >
              {/*
                Container h-[22px] with lines at y=2, 10, 18. Visible
                span is ~18px, sized to feel like the AUWA logo (20px
                mobile / 22px desktop) beside it. All three spans carry
                identical transform + rendering hints so iOS anti-aliases
                them the same way.
              */}
              <div className="w-[28px] h-[22px] relative">
                <span
                  className="absolute left-0 w-full h-[2px] bg-current"
                  style={{
                    top: menuOpen ? "10px" : "2px",
                    transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)",
                    willChange: "top, transform",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transition: "top 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
                <span
                  className="absolute left-0 top-[10px] w-full h-[2px] bg-current"
                  style={{
                    opacity: menuOpen ? 0 : 1,
                    transform: "rotate(0deg)",
                    willChange: "opacity, transform",
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
                    willChange: "top, transform",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transition: "top 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/*
        Menu is portalled to document.body so the page-transition wrapper's
        transform doesn't clip it. Without this, `fixed inset-0` is relative
        to the transformed ancestor and the overlay ends up off-screen.
      */}
      {mounted ? createPortal(menuOverlay, document.body) : null}
    </>
  );
}
