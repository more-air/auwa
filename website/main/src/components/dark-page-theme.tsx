"use client";

import { useLayoutEffect } from "react";

/**
 * Opts the current route into the dark Yoru surface (see globals.css
 * `html[data-page-theme="dark"]`). Mount once at the top of a dark
 * page; the attribute is set on `<html>` synchronously BEFORE the
 * first paint of the new route, and removed when the page unmounts.
 *
 * `useLayoutEffect` (not `useEffect`) is deliberate: when navigating
 * from a light page (e.g. /app, /journal) to a dark page (/book),
 * `useEffect` would set the attribute AFTER the first paint, leaving
 * one frame where the new page's body is white and its header bg is
 * white — a brief flash before darkPage propagates. `useLayoutEffect`
 * runs synchronously between commit and paint, so the attribute is
 * already in place when the browser draws the first frame.
 *
 * (The page-transition flash in the OPPOSITE direction — dark page
 *  to home — is handled separately, by HeroVideo setting body bg to
 *  Yoru on mount.)
 */
export function DarkPageTheme() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const previous = html.getAttribute("data-page-theme");
    html.setAttribute("data-page-theme", "dark");
    return () => {
      if (previous === null) {
        html.removeAttribute("data-page-theme");
      } else {
        html.setAttribute("data-page-theme", previous);
      }
    };
  }, []);
  return null;
}
