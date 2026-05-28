/*
  GradientField — full-bleed radial gradient for one of the five
  Yamato emotional states.

  Consumed by the Revelation screen as the background that blooms out
  of Void during the light shower. Each gradient is composed of three
  CSS custom properties (mid → deep → edge) defined in globals.css.
  Tune any stop there; every revelation surface follows.

  The "edge" stop deliberately fades into Void so the bloom dissolves
  rather than ending — the character is the hero of the revelation,
  not the colour.

  Props:
    state  — which of the five Yamato states
    intent — "full" renders a screen-fill radial; "soft" tints the
             surface gently for the Sanctuary "current weather" mode.
*/

import type { YamatoState } from "@/lib/yamato";

export type GradientFieldProps = {
  state: YamatoState;
  intent?: "full" | "soft";
  className?: string;
};

export function GradientField({
  state,
  intent = "full",
  className = "",
}: GradientFieldProps) {
  // Pull tokens by state. CSS custom properties don't interpolate
  // through CSS variables alone, so we name them per-state here.
  const mid = `var(--gradient-${state}-mid)`;
  const deep = `var(--gradient-${state}-deep)`;
  const edge = `var(--gradient-${state}-edge)`;
  const voidColor = "var(--color-void)";

  // Full = the revelation surface. Bright core, deep shoulder, edge
  // fading into void. Roughly 70vh radius at 50% 38% so the Kokoro
  // sits in the bright zone with the reflection text in the deep
  // shoulder below.
  //
  // Soft = sanctuary "current emotional weather" mode. Same colour
  // family, lower intensity, so the user can sit inside the bloom
  // without it feeling like a revelation.
  const background =
    intent === "full"
      ? `radial-gradient(ellipse 90% 70% at 50% 38%, ${mid} 0%, ${deep} 40%, ${edge} 75%, ${voidColor} 100%)`
      : `radial-gradient(ellipse 120% 100% at 50% 50%, ${deep} 0%, ${edge} 55%, ${voidColor} 100%)`;

  return (
    <div
      className={["absolute inset-0 pointer-events-none", className].join(" ")}
      style={{ background }}
      aria-hidden="true"
    />
  );
}
