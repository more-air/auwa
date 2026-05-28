/*
  KokoroSilhouette — the user's accumulating self-portrait.

  Translated from the book canon: Auwa reveals a being's Kokoro, and
  the Kokoro takes an Auwa-shape with personal items expressing who
  that being is. In the app, the user is the being, and the Kokoro
  hovers on every revelation, archive entry, and share card.

  This v1 implementation is a placeholder. Rieko draws:
    - the base silhouette (an Auwa-shape personalised at signup with
      5-7 motifs picked from the personalisation grid)
    - per-motif illustrations that layer onto the silhouette over
      time (emotional weather, threshold markers, the first-gift)

  Until those land, this renders as a labelled circle in the cosmic-
  tinted tone the final asset will sit in. The label describes what
  the asset needs to be so a tester can mentally compose the scene.

  Sizes:
    sm  — 96px. Archive list markers, share card thumbnails.
    md  — 220px. Arrival, sanctuary.
    lg  — 320px. Revelation hero (the spec calls 280-360px on mobile).
*/

import { PlaceholderAsset } from "./placeholder-asset";

const SIZES = {
  sm: "w-24 h-24",
  md: "w-[220px] h-[220px]",
  lg: "w-[320px] h-[320px]",
} as const;

export type KokoroSilhouetteProps = {
  size?: keyof typeof SIZES;
  /** Optional descriptor of what motifs the Kokoro is carrying — for
   *  the placeholder, this surfaces below the asset's main label so
   *  testers see what the final composition should communicate. */
  motifsLabel?: string;
  className?: string;
};

export function KokoroSilhouette({
  size = "md",
  motifsLabel,
  className = "",
}: KokoroSilhouetteProps) {
  return (
    <div className={[SIZES[size], "relative", className].join(" ")}>
      <PlaceholderAsset
        label="Kokoro"
        subLabel={motifsLabel ?? "user silhouette + accumulated motifs"}
        tone="void-ring"
        rounded
      />
    </div>
  );
}
