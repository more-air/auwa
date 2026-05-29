/*
  Daily Light prompts — SCAFFOLD ONLY.

  v1 scaffold of ~25 prompts. The full library will be ~365 prompts,
  written by Tom and Claude in Rieko's voice direction, engineered for
  non-repetition through at least a year of daily use, with morning-
  and evening-leaning variants (§8.8 of context/pillar/app.md).

  Voice: short, specific, concrete. Asks for a small ephemeral
  noticing the user would otherwise have lost — not a durable item
  (family, health, home) that loses meaning through repetition.
*/

export type DailyLightPrompt = {
  id: string;
  question: string;
  lean?: "morning" | "evening";
};

export const DAILY_LIGHT_PROMPTS: DailyLightPrompt[] = [
  { id: "p1", question: "What made you smile first thing today?", lean: "morning" },
  { id: "p2", question: "Who made your day a little easier?" },
  { id: "p3", question: "What did you taste today that was good?" },
  { id: "p4", question: "What sound stayed with you?" },
  { id: "p5", question: "What colour caught your eye first?", lean: "morning" },
  { id: "p6", question: "What small kindness did you notice from a stranger?" },
  { id: "p7", question: "What is something you saw out a window?" },
  { id: "p8", question: "What did you touch today that felt good?" },
  { id: "p9", question: "What made you laugh, even briefly?" },
  { id: "p10", question: "What surprised you today?" },
  { id: "p11", question: "What smelled good today?" },
  { id: "p12", question: "What is one quiet thing you did for yourself?", lean: "evening" },
  { id: "p13", question: "Who do you feel quietly grateful for today?" },
  { id: "p14", question: "What did the sky do today?" },
  { id: "p15", question: "What did you eat that you actually noticed?" },
  { id: "p16", question: "What small task felt good to finish?" },
  { id: "p17", question: "What did you read today that stayed?" },
  { id: "p18", question: "What kept you company while you worked?" },
  { id: "p19", question: "What did you walk past that you usually wouldn't notice?" },
  { id: "p20", question: "What made today feel like itself?", lean: "evening" },
  { id: "p21", question: "Where did you feel the light today?" },
  { id: "p22", question: "What did you make space for?" },
  { id: "p23", question: "What is one small thing that worked out?" },
  { id: "p24", question: "What did the wind feel like?" },
  { id: "p25", question: "What is one good thing you almost missed today?", lean: "evening" },
];

/** Pick a prompt for today. v1 uses a date-based deterministic index
 *  so the same day returns the same prompt (refreshes at midnight
 *  local). The real library will use weighted recency to avoid
 *  repetition through a year. */
export function pickDailyLightPrompt(date: Date = new Date()): DailyLightPrompt {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  return DAILY_LIGHT_PROMPTS[dayOfYear % DAILY_LIGHT_PROMPTS.length];
}
