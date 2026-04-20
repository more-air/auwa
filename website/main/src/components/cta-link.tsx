import Link from "next/link";

type Props = {
  href: string;
  children: string;
  className?: string;
  variant?: "bordered" | "plain";
};

/**
 * Bordered CTA with a text-roll hover: the label lifts up and is replaced
 * by the same label rising from below. Keeps the quiet AUWA tone, adds a
 * small moment of delight on interaction.
 */
export function CtaLink({ href, children, className = "", variant = "bordered" }: Props) {
  const base =
    "group relative inline-flex items-center justify-center font-sans text-[13px] tracking-[0.08em] uppercase transition-colors duration-500";
  const bordered =
    "text-void/50 border border-void/15 px-6 py-3 hover:text-void hover:border-void/40";
  const plain = "text-void/50 hover:text-void";

  return (
    <Link href={href} className={`${base} ${variant === "bordered" ? bordered : plain} ${className}`}>
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
