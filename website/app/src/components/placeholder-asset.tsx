/*
  PlaceholderAsset.

  Labelled rectangle that stands in for any Rieko-authored asset (the
  five Auwa character variants, motifs, Kokoro silhouette, gradient
  illustrations) while her batch lands. The label says what the asset
  needs to be; the tone matches the surface the final asset will sit
  in, so the layout reads correctly during testing.

  Swap target: every consumer of PlaceholderAsset becomes a one-line
  replacement when the real asset lands. Each usage names what it
  represents in the `label` prop, so a future swap pass can grep for
  PlaceholderAsset and resolve each instance.
*/

type Tone = "void" | "cosmic-900" | "cosmic-800" | "void-ring";

const TONES: Record<Tone, string> = {
  void: "bg-[var(--color-void)] border border-cosmic-50/8",
  "cosmic-900": "bg-cosmic-900 border border-cosmic-50/10",
  "cosmic-800": "bg-cosmic-800 border border-cosmic-50/12",
  // Subtle ring on void — used where the asset is "atmospheric" and
  // shouldn't read as a solid rectangle (e.g. ambient orb position).
  "void-ring":
    "bg-[var(--color-void)] border border-dashed border-cosmic-50/15",
};

export type PlaceholderAssetProps = {
  label: string;
  tone?: Tone;
  className?: string;
  /** When true, the rectangle is rendered as a circle. Useful for
   *  the Kokoro silhouette, the orb, motif markers. */
  rounded?: boolean;
  /** Optional sub-label rendered in smaller text below the main label.
   *  Use for variant disambiguation ("Hare variant", "Motif: lantern"). */
  subLabel?: string;
};

export function PlaceholderAsset({
  label,
  tone = "cosmic-900",
  className = "",
  rounded = false,
  subLabel,
}: PlaceholderAssetProps) {
  return (
    <div
      className={[
        "w-full h-full flex flex-col items-center justify-center p-3 text-center",
        TONES[tone],
        rounded ? "rounded-full" : "rounded-card",
        className,
      ].join(" ")}
      role="img"
      aria-label={label}
    >
      <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-cosmic-50/55 leading-tight">
        {label}
      </span>
      {subLabel ? (
        <span className="font-sans text-[9px] tracking-[0.16em] uppercase text-cosmic-50/30 mt-1 leading-tight">
          {subLabel}
        </span>
      ) : null}
    </div>
  );
}
