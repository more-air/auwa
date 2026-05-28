/*
  Placeholder reflection library — SCAFFOLD ONLY.

  Three entries per Yamato state for the daily revelation spine,
  written quickly to give the prototype something to surface during
  testing. None of these are Rieko-voiced. They will be replaced in
  Stage 6 by the real library (~750 entries, ~25 per sub-expression,
  authored by Tom and Claude in Rieko's voice direction, signed off
  in batches by Rieko).

  Voice rules during real authoring (§4 of context/pillar/app.md):
    - Auwa speaks as a being, gentle and observant, never clinical
    - 2-3 sentences, every word earns its place
    - Reflects what is named, never advises
    - Natural metaphors from light, water, weather, hands, breath
    - No emoji, no exclamation marks

  The scaffold copy below approximates the shape; treat as throwaway.
*/

import type { YamatoState } from "./yamato";

export const PLACEHOLDER_REFLECTIONS: Record<YamatoState, string[]> = {
  hare: [
    "Something opens. The brightness in you is its own quiet weather.",
    "A small clear feeling. Let it carry the morning a little.",
    "What sits in you now is light. There is nothing to do with it.",
  ],
  takaburi: [
    "Heat rises and you know its shape. It will not stay forever.",
    "Something pressed against you, and you pressed back. Both are true.",
    "The friction is real. It is asking for attention, not for action.",
  ],
  aware: [
    "Something you carry is heavier today. That is the season of it.",
    "A quiet weight. You are noticing what most people do not pause for.",
    "It moves through you the way rain moves through a garden.",
  ],
  yuragi: [
    "The ground is moving. Notice your hands, your breath, what is still.",
    "Something has shifted that you did not choose. Sit a moment with that.",
    "The unknown has arrived. You do not need to greet it yet.",
  ],
  nagomi: [
    "A settled feeling. The kind that asks for nothing back from you.",
    "Something quiet has gathered. Stay where you are for a little while.",
    "The water is still. You can see the shape of yourself in it.",
  ],
};

/**
 * Pick a placeholder reflection for the given state. v1 picks a
 * pseudo-random entry; the real library will use weighted recency
 * (avoid the same entry twice for the same user) and time-of-day
 * morning/evening leaning.
 */
export function pickPlaceholderReflection(state: YamatoState): string {
  const pool = PLACEHOLDER_REFLECTIONS[state];
  return pool[Math.floor(Math.random() * pool.length)];
}
