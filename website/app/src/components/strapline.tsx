"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const variants: Record<string, { headline: string; subtitle: string }> = {
  a: {
    headline: "Japanese philosophy for the age of AI",
    subtitle: "A daily practice that builds the one intelligence AI cannot replace",
  },
  b: {
    headline: "Born from Japanese philosophy.\nBuilt for the age of AI.",
    subtitle: "The daily EQ practice the world is missing",
  },
  c: {
    headline: "EQ for the age of AI",
    subtitle: "Rooted in a thousand years of Japanese philosophy",
  },
  d: {
    headline: "EQ for the age of AI",
    subtitle: "A daily EQ practice inspired by Japanese philosophy that builds the one intelligence AI cannot replace",
  },
};

const defaultCopy = variants.a;

function StraplineInner() {
  const searchParams = useSearchParams();
  const variant = searchParams.get("v") || "a";
  const copy = variants[variant] || defaultCopy;

  return <StraplineDisplay headline={copy.headline} subtitle={copy.subtitle} />;
}

function StraplineDisplay({
  headline,
  subtitle,
}: {
  headline: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center gap-5 text-center max-w-xl px-2">
      <h1 className="font-display text-4xl md:text-6xl font-light leading-tight tracking-wide text-cosmic-100 whitespace-pre-line">
        {headline}
      </h1>
      <p className="font-display text-lg md:text-xl font-light text-cosmic-400 tracking-wide leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

export function Strapline() {
  return (
    <Suspense
      fallback={
        <StraplineDisplay
          headline={defaultCopy.headline}
          subtitle={defaultCopy.subtitle}
        />
      }
    >
      <StraplineInner />
    </Suspense>
  );
}
