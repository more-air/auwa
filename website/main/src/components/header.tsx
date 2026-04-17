"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const navItems = [
  { label: "Journal", href: "/journal" },
  { label: "Store", href: "/store" },
  { label: "App", href: "/app" },
  { label: "Book", href: "/book" },
  { label: "About", href: "/about" },
];

interface HeaderProps {
  disableFlipbookStick?: boolean;
  transparent?: boolean;
}

export function Header({ disableFlipbookStick = false, transparent = false }: HeaderProps = {}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [mounted, setMounted] = useState(false);
  // Flips to true ~400ms after the menu opens — the point at which the
  // overlay has mostly faded in. Used to delay the logo swap on the
  // transparent homepage so the white-logo-on-video doesn't flip to
  // dark-logo-on-video BEFORE the overlay has had a chance to cover it.
  const [overlayCovers, setOverlayCovers] = useState(false);
  const lastScrollY = useRef(0);
  const atTopRef = useRef(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      const t = setTimeout(() => setOverlayCovers(true), 400);
      return () => clearTimeout(t);
    }
    // On close, flip back immediately so the logo starts transitioning
    // white while the overlay fades out — both end together.
    setOverlayCovers(false);
  }, [menuOpen]);

  // Close the menu when the route actually changes. We don't close it on
  // link click — PageTransition intercepts internal links and delays the
  // route change by ~440ms. Keeping the menu open through that window lets
  // it crossfade with the page transition instead of flashing the old page
  // between menu-fade-out and page-fade-out.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Hide on scroll down, show on scroll up.
  // Stay visible when a flipbook hero is active (data-flipbook-active on body).
  //
  // atTop uses a deliberately wide range (up to 400px) with hysteresis. This
  // matters on the transparent homepage header: if atTop flipped off at a
  // small threshold (y=40) but the header didn't hide until y=80, the user
  // would see a flash of solid-white header in the 40-80 dead zone before it
  // slid away. Keeping atTop true well past the hide threshold lets the
  // header slide up WHILE still transparent, so there's no flash.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      const flipbookActive = !disableFlipbookStick && document.body.hasAttribute("data-flipbook-active");

      const prevAtTop = atTopRef.current;
      const nextAtTop = prevAtTop ? y <= 400 : y <= 100;
      if (nextAtTop !== prevAtTop) {
        atTopRef.current = nextAtTop;
        setAtTop(nextAtTop);
      }

      if (flipbookActive || y <= 10) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [disableFlipbookStick]);

  // Header "transparent" mode holds while at top of a hero page AND the
  // overlay isn't covering. Using `overlayCovers` (delayed) instead of
  // `menuOpen` avoids a flash of solid-white header (or dark-logo-on-video)
  // before the overlay has had time to fade in over the hero.
  const isTransparent = transparent && atTop && !overlayCovers;
  // The menu button flips to dark as soon as the menu opens so the X stays
  // readable on the incoming white overlay — even before the overlay has
  // fully faded in.
  const buttonIsLight = transparent && atTop && !menuOpen;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const mobileMenu = (
    <div
      className={`fixed inset-0 z-[90] bg-surface md:hidden ${
        menuOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      style={{
        opacity: menuOpen ? 1 : 0,
        transition: "opacity 500ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Spacer mirrors the header row so the nav starts below the logo/button */}
      <div className="h-16" />

      <div className="flex flex-col justify-center h-[calc(100%-4rem)] px-6">
        <nav>
          <ul className="space-y-1">
            {navItems.map((item, i) => (
              <li
                key={item.href}
                className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: menuOpen ? `${100 + i * 60}ms` : "0ms" }}
              >
                {/*
                  No onClick={setMenuOpen(false)} here. PageTransition
                  intercepts internal links and delays navigation. We close
                  the menu on the pathname useEffect above, which fires when
                  the route actually changes — this keeps the menu visible
                  during the page transition's leave phase.
                */}
                <Link
                  href={item.href}
                  className={`block font-display text-[2.5rem] leading-[1.3] tracking-[0.01em] transition-colors duration-300 ${
                    pathname === item.href ? "text-void" : "text-void/50 hover:text-void"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={`mt-16 flex gap-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{ transitionDelay: menuOpen ? `${100 + navItems.length * 60 + 60}ms` : "0ms" }}
        >
          <a
            href="https://instagram.com/auwa.life"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-void hover:text-void/60 transition-colors duration-300"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
            className="text-void hover:text-void/60 transition-colors duration-300"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={`sticky top-0 z-[100] will-change-transform ${
          isTransparent ? "bg-transparent" : "bg-surface"
        } ${
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
        }`}
        style={{
          // Tailwind 4 uses the `translate` CSS property (not `transform`)
          // for translate-y utilities, so the transition must target that.
          transition: "translate 500ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms ease-out",
        }}
      >
        <div className="px-6 md:px-12 lg:px-20 xl:px-28">
          <nav className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="block relative z-[60]">
              <img
                src="/auwa-logo.svg"
                alt="AUWA"
                className="h-[20px] md:h-[22px] w-auto transition-[filter] duration-300 ease-out"
                style={isTransparent ? { filter: "invert(1) brightness(2)" } : undefined}
              />
            </Link>

            <ul className="hidden md:flex items-center gap-8 lg:gap-10">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative inline-flex overflow-hidden font-sans text-[12px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                        isTransparent
                          ? "text-white"
                          : active
                            ? "text-void"
                            : "text-void hover:text-void/55"
                      }`}
                    >
                      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-full">
                        {item.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 flex items-center justify-center translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-y-0"
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/*
              Single menu button that morphs between hamburger and X. Lives in
              the header (z-[100]) so it sits above the overlay (z-[90]) and
              the logo stays visible while the menu is open. Color flips on
              menuOpen directly (not delayed) so the X is visible against the
              overlay as soon as it starts fading in.
            */}
            <button
              className="md:hidden p-2 -mr-2 relative z-[60] cursor-pointer"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                color: buttonIsLight ? "#ffffff" : "oklch(0.08 0.025 250)",
                transition: "color 300ms ease-out",
              }}
            >
              {/*
                Lines offset 1px from top/bottom edges of the container so
                iOS doesn't render the top line thicker than the others —
                an edge-rendering quirk when a 2px span sits flush at top:0.
                All three spans also carry an explicit transform so they
                share a rasterisation path and anti-alias identically.
              */}
              <div className="w-[24px] h-[16px] relative">
                <span
                  className="absolute left-0 w-full h-[2px] bg-current"
                  style={{
                    top: menuOpen ? "7px" : "1px",
                    transform: menuOpen ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "top 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
                <span
                  className="absolute left-0 top-[7px] w-full h-[2px] bg-current"
                  style={{
                    opacity: menuOpen ? 0 : 1,
                    transform: "rotate(0deg)",
                    transition: "opacity 200ms ease-out",
                  }}
                />
                <span
                  className="absolute left-0 w-full h-[2px] bg-current"
                  style={{
                    top: menuOpen ? "7px" : "13px",
                    transform: menuOpen ? "rotate(-45deg)" : "rotate(0deg)",
                    transition: "top 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                />
              </div>
            </button>
          </nav>
        </div>
      </header>

      {/*
        Mobile menu is portalled to document.body so the page-transition
        wrapper's transform doesn't clip it. Without this, `fixed inset-0`
        is relative to the transformed ancestor and the overlay ends up
        off-screen on small viewports.
      */}
      {mounted ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
