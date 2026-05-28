"use client";

import { useLayoutEffect } from "react";

/**
 * Opts the current route into the cosmic surface (see globals.css
 * `html[data-page-theme="cosmic"]`). Mount once at the top of an app
 * page; the attribute is set on `<html>` synchronously BEFORE the
 * first paint of the new route, and removed when the page unmounts.
 *
 * Mirrors DarkPageTheme. `useLayoutEffect` (not `useEffect`) is
 * deliberate: navigating from a light editorial page to /app/pwa with
 * `useEffect` would set the attribute after the first paint, leaving
 * one frame where the cosmic surface shows the warm Surface body bg
 * underneath. `useLayoutEffect` runs synchronously between commit and
 * paint, so the attribute is already in place when the browser draws
 * the first frame.
 */
export function CosmicPageTheme() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    const previous = html.getAttribute("data-page-theme");
    html.setAttribute("data-page-theme", "cosmic");
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
