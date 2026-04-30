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
    "group relative inline-flex items-center justify-center font-sans text-[13px] tracking-[0.08em] uppercase transition-colors duration-500 ease-text-roll";

  // `bordered` stays as a legacy alias for the now-standard `secondary`.
  const resolved = variant === "bordered" ? "secondary" : variant;

  const isDark = theme === "dark";
  const primary = isDark
    ? "text-washi border border-washi/20 px-6 py-3 hover:border-washi/45"
    : "text-sumi border border-sumi/15 px-6 py-3 hover:border-sumi/40";
  const secondary = primary;
  const plain = isDark
    ? "text-washi/55 hover:text-washi"
    : "text-sumi/50 hover:text-sumi";

  const variantClasses =
    resolved === "primary" ? primary : resolved === "plain" ? plain : secondary;

  return (
    <Link
      href={href}
      className={`${base} ${variantClasses} ${className}`}
    >
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
