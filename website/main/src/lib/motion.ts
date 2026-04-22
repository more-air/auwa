/**
 * Motion tokens — single source of truth for every animation on the site.
 *
 * Components import from here instead of hardcoding ms values. Changing a
 * value in this file propagates to every FadeIn, TextReveal, hover state,
 * and page transition automatically.
 *
 * Matches the CSS duration tokens in `src/app/globals.css` (--duration-*).
 * Keep both in sync if a value changes.
 */

export const DURATION = {
  /** FadeIn default and TextReveal — text and general reveals */
  enter: 800,
  /** FadeIn reveal variant — image cards and visual moments */
  reveal: 1200,
  /** Hover and state transitions */
  hover: 300,
  /** PageTransition crossfade */
  page: 500,
} as const;

export const STAGGER = {
  /** Horizontal scrollers — Journal strip, PillarParade */
  strip: 60,
  /** Grid cascades — pillar cards, continue reading */
  grid: 120,
  /** Display-type cascades — multi-line TextReveal, hero headings */
  hero: 180,
} as const;

export const EASING = {
  /** Brand default — fast departure, gentle arrival. "Like a breath out." */
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** Symmetric ease-in-out — image crossfades, slow ambient transitions */
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  /** Text-roll: punchier "snap into place" curve used on hover rollovers
   *  (CTAs, nav items, scroll label). Sharper than outExpo. */
  textRoll: "cubic-bezier(0.7, 0, 0.3, 1)",
} as const;
