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
};

/**
 * AUWA CTA link with a text-roll hover: the label lifts up and is
 * replaced by the same label rising from below. Three style variants.
 */
export function CtaLink({ href, children, className = "", variant = "secondary" }: Props) {
  const base =
    "group relative inline-flex items-center justify-center font-sans text-[13px] tracking-[0.08em] uppercase transition-colors duration-500 ease-[cubic-bezier(0.7,0,0.3,1)]";

  // `bordered` stays as a legacy alias for the now-standard `secondary`.
  const resolved = variant === "bordered" ? "secondary" : variant;

  // Warm biscuit / muted amber — a quiet, late-afternoon-light tone
  // that picks up the Hare (radiant) family from the brand palette
  // without the saturation. Sits warmly on white, doesn't shout.
  const primary =
    "bg-[oklch(0.9_0.045_78)] text-void px-7 py-3.5 hover:bg-[oklch(0.85_0.07_78)]";
  const secondary =
    "text-void/50 border border-void/15 px-6 py-3 hover:text-void hover:border-void/40";
  const plain = "text-void/50 hover:text-void";

  const variantClasses =
    resolved === "primary" ? primary : resolved === "plain" ? plain : secondary;

  return (
    <Link href={href} className={`${base} ${variantClasses} ${className}`}>
      {/*
        Inner mask carries overflow-hidden, not the Link itself. On iOS
        WebKit (including DuckDuckGo), border + overflow-hidden + descendant
        transform caused the top border to briefly clip during the tap-
        triggered hover transition. Keeping the border on a non-clipped
        element avoids that class of compositor artefact.
      */}
      <span className="relative inline-flex overflow-hidden">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:-translate-y-[140%]">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center translate-y-[140%] transition-transform duration-500 ease-[cubic-bezier(0.7,0,0.3,1)] group-hover:translate-y-0"
        >
          {children}
        </span>
      </span>
    </Link>
  );
}
