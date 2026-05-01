import Link from "next/link";

type Props = {
  href: string;
  children: string;
  className?: string;
  /**
   * - "primary" — solid void (near-black) background with white text.
   *   Reserved for the single most important CTA on a page (homepage
   *   intro, key editorial moments).
   * - "secondary" (default) — bordered, text-only. Used everywhere else.
   * - "plain" — no border, just text. Quietest option.
   *
   * Legacy `"bordered"` maps to `"secondary"` for backwards compatibility.
   */
  variant?: "primary" | "secondary" | "plain" | "bordered";
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
    "group relative inline-flex items-center justify-center font-sans text-[13px] tracking-[0.14em] uppercase";

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
  const plain = isDark
    ? "text-washi/55 transition-colors duration-500 ease-text-roll hover:text-washi"
    : "text-sumi/50 transition-colors duration-500 ease-text-roll hover:text-sumi";

  const variantClasses =
    resolved === "primary" ? primary : resolved === "plain" ? plain : secondary;

  const isFilled = resolved === "primary" || resolved === "secondary";
  const floodColour = isDark ? "bg-washi" : "bg-sumi";

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
          <span
            className={`absolute inset-0 ${floodColour} origin-bottom scale-y-0 transition-transform duration-500 ease-text-roll group-hover:scale-y-100`}
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
