/*
  Letters from Auwa — scaffold of one launch letter for v1.

  Spec (§2.3.1 + §5.12): once a week, on a quiet day, a short letter
  from Auwa appears on the arrival screen. Three or four sentences,
  written by Tom and Claude in Rieko's voice direction, signed off in
  batches by Rieko. The weekly cadence keeps it sacred.

  Production cost is roughly 50 letters per year, written quarterly.
  For v1 testing, one letter is enough.
*/

export type Letter = {
  id: string;
  /** ISO date the letter becomes available */
  publishedAt: string;
  body: string[];
};

export const LETTERS: Letter[] = [
  {
    id: "launch-1",
    publishedAt: "2026-05-28",
    body: [
      "Plum blossoms have come and gone, and the bamboo grass is putting out its summer leaves.",
      "Everything that lives is in a hurry to be itself this week.",
      "When you next sit down, sit a moment longer than you mean to. Auwa will be here.",
    ],
  },
];

/** Pick the most recent letter the user has not yet seen. v1 always
 *  returns the latest published letter. */
export function pickCurrentLetter(): Letter | null {
  if (LETTERS.length === 0) return null;
  return LETTERS[LETTERS.length - 1];
}
