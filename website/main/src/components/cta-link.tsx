import Link from "next/link";

type Props = {
  href: string;
  children: string;
  className?: string;
  /**
   * - "primary" (default) — bordered, Sumi text, floods to solid Sumi
   *   on hover. The site-wide editorial CTA.
   * - "secondary" — identical to primary. Kept because call sites use
   *   both names.
   * - "solid" — INVERTED: solid Sumi at rest with Surface text, floods
   *   back to Surface on hover. Use it for a commerce action ("Order
   *   now"), or to lead a PAIR of CTAs where one has to outrank the
   *   other — solid leads, primary follows. The rule is one per
   *   viewport, not one per page: two solids visible at once cancel
   *   each other out and the emphasis stops meaning anything.
   * - "plain" — no border, just text. Quietest option. Don't put it
   *   next to a bordered CTA; it reads as a stray text link rather
   *   than as the second of two buttons.
   *
   * Legacy `"bordered"` maps to `"secondary"` for backwards compatibility.
   */
  variant?: "primary" | "secondary" | "solid" | "plain" | "bordered";
  /** "light" (default) renders void text on light surfaces; "dark"
   *  renders washi text on Yoru / void surfaces. */
  theme?: "light" | "dark";
};

/**
 * Auwa CTA link with a text-roll hover: the label lifts up and is
 * replaced by the same label rising from below. Three style variants.
 */
export function CtaLink({
  href,
  children,
  className = "",
  variant = "primary",
  theme = "light",
}: Props) {
  const base =
    "group relative inline-flex items-center justify-center font-sans text-[12px] tracking-[0.16em] uppercase";

  // `bordered` stays as a legacy alias for the now-standard `secondary`.
  const resolved = variant === "bordered" ? "secondary" : variant;

  const isDark = theme === "dark";
  // Primary / secondary: bordered button that FLOODS up with a solid
  // colour on hover (a coloured pane translates from below to cover the
  // button), with the text flipping to the contrasting tone in sync.
  // Reads more decisive than a background-colour fade.
  const primary = isDark
    ? "text-washi border border-washi/25 px-6 py-3 transition-[color,border-color] duration-500 ease-text-roll hover:text-yoru hover:border-washi"
    : "text-sumi border border-sumi/20 px-6 py-3 transition-[color,border-color] duration-500 ease-text-roll hover:text-surface hover:border-sumi";
  const secondary = primary;
  // Solid is primary run backwards: the fill starts ON, and the flood
  // that rises on hover is the LIGHT tone rather than the dark one.
  //
  // The hovered border lands on exactly the tone primary uses AT REST
  // (sumi/20 light, washi/25 dark), so the two variants resolve to the
  // same outline. A full-strength border on the flooded state read as a
  // heavy dark box around a light button, louder than any resting
  // button on the site.
  //
  // `bg-clip-padding` is load-bearing, not tidying. Backgrounds paint
  // to the BORDER box by default, while the flood pane covers only the
  // PADDING box (it's `absolute inset-0` inside a positioned parent).
  // Without the clip, the solid dark background stays painted underneath
  // the border on hover, so a 20%-opacity border composites over solid
  // Sumi and still renders black — the computed value is correct and
  // the pixels are wrong. Clipping the fill to the padding box lets the
  // page Surface sit behind the hovered border, which is what makes it
  // match primary. Don't remove it.
  const solid = isDark
    ? "bg-washi bg-clip-padding text-yoru border border-washi px-6 py-3 transition-colors duration-500 ease-text-roll hover:text-washi hover:border-washi/25"
    : "bg-sumi bg-clip-padding text-surface border border-sumi px-6 py-3 transition-colors duration-500 ease-text-roll hover:text-sumi hover:border-sumi/20";
  const plain = isDark
    ? "text-washi/55 transition-colors duration-500 ease-text-roll hover:text-washi"
    : "text-sumi/50 transition-colors duration-500 ease-text-roll hover:text-sumi";

  const variantClasses =
    resolved === "solid"
      ? solid
      : resolved === "primary"
      ? primary
      : resolved === "plain"
      ? plain
      : secondary;

  const isFilled =
    resolved === "primary" || resolved === "secondary" || resolved === "solid";
  // Solid inverts the flood: rising Surface over a Sumi ground, rather
  // than rising Sumi over the page.
  const floodColour =
    resolved === "solid"
      ? isDark
        ? "bg-yoru"
        : "bg-surface"
      : isDark
      ? "bg-washi"
      : "bg-sumi";

  return (
    <Link
      href={href}
      className={`${base} ${variantClasses} ${className}`}
    >
      {/* Solid flood — sits BEHIND the text in a CLIPPED wrapper.
          The wrapper carries overflow-hidden (not the Link itself —
          border + overflow-hidden + descendant transform causes the
          top border to clip on iOS WebKit during hover).

          We use scaleY from the BOTTOM as the flood mechanic rather
          than translateY. translateY(100%→0) needs the pane to be
          taller than the button to avoid a sub-pixel rounding gap
          at the bottom mid-transition (Chrome inside the
          EditorialFrames opacity-crossfaded parent shows it as a
          white line). scaleY anchors at transform-origin and grows
          to exactly fill the wrapper — no rounding gap possible. */}
      {isFilled && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Flood extends 1px beyond the wrapper on left and right.
              The wrapper's overflow-hidden clips the overhang invisibly,
              but it guarantees the visible interior fills fully even
              when the parent CtaLink sits at sub-pixel coordinates —
              which happens in text-center contexts (MicroSeasonFeature,
              the home page closing prompt) where the centering algorithm
              produces fractional offsets. Without the overshoot, Chrome's
              compositor rounds the clip box to integer pixels but the
              flood's transform rounds independently, producing a 1px
              white sliver on one side during the rise. */}
          <span
            className={`absolute inset-y-0 -inset-x-px ${floodColour} origin-bottom scale-y-0 transition-transform duration-500 ease-text-roll group-hover:scale-y-100`}
          />
        </span>
      )}
      {/*
        Inner mask carries overflow-hidden, not the Link itself. On iOS
        WebKit (including DuckDuckGo), border + overflow-hidden + descendant
        transform caused the top border to briefly clip during the tap-
        triggered hover transition. Keeping the border on a non-clipped
        element avoids that class of compositor artefact.
      */}
      <span className="relative inline-flex overflow-hidden">
        <span className="block transition-transform duration-500 ease-text-roll group-hover:-translate-y-[140%]">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center translate-y-[140%] transition-transform duration-500 ease-text-roll group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
    </Link>
  );
}
