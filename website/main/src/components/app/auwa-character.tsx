/*
  AuwaCharacter — placeholder for the five Yamato variants Rieko will
  illustrate. Each variant is the Auwa character in one of the five
  emotional states (Hare, Takaburi, Aware, Yuragi, Nagomi), with
  posture, gesture, and palette tuned to that state.

  Today this renders a labelled circle naming the state. When Rieko's
  batch lands, this component swaps to <Image src="/app/character/{state}.png"/>
  with the same prop signature — no consumer needs to change.

  Sizes match the use cases in the spec:
    sm  — 64px. State arc tap targets on the arrival screen.
    md  — 120px. Sub-expression refinement preview.
    lg  — 280px. Inside the revelation's gradient bloom (when the
                 character is the surface, not the Kokoro).
*/

import { PlaceholderAsset } from "./placeholder-asset";
import type { YamatoState } from "@/lib/yamato";

const SIZES = {
  sm: "w-16 h-16",
  md: "w-[120px] h-[120px]",
  lg: "w-[280px] h-[280px]",
} as const;

const STATE_LABELS: Record<YamatoState, string> = {
  hare: "Hare variant",
  takaburi: "Takaburi variant",
  aware: "Aware variant",
  yuragi: "Yuragi variant",
  nagomi: "Nagomi variant",
};

export type AuwaCharacterProps = {
  state: YamatoState;
  size?: keyof typeof SIZES;
  className?: string;
};

export function AuwaCharacter({
  state,
  size = "sm",
  className = "",
}: AuwaCharacterProps) {
  return (
    <div className={[SIZES[size], className].join(" ")}>
      <PlaceholderAsset
        label="Auwa"
        subLabel={STATE_LABELS[state]}
        tone="cosmic-800"
        rounded
      />
    </div>
  );
}
