/*
  Motif library — placeholder.

  The spec calls for 16-21 illustrated motifs across four soft
  categories (creatures, places, elements, objects), drawn by Rieko.
  Each motif also gets a layered illustration that sits on the Kokoro
  silhouette so the accumulation reads visually.

  For v1 testing, motifs are represented by their key + label. The
  PlaceholderAsset component visualises them as labelled rectangles.
  When Rieko's batch lands, motif data becomes { key, label, svg }.

  One additional motif, "noticed", is reserved for the first-gift
  beat (§2.1 step 4) — Auwa "notices" it on the Kokoro before the
  user does anything. It's never in the personalisation grid.
*/

export type MotifCategory = "creatures" | "places" | "elements" | "objects";

export type Motif = {
  key: string;
  label: string;
  category: MotifCategory;
};

export const MOTIFS: Motif[] = [
  { key: "dog", label: "Dog", category: "creatures" },
  { key: "cat", label: "Cat", category: "creatures" },
  { key: "bird", label: "Bird", category: "creatures" },
  { key: "fish", label: "Fish", category: "creatures" },
  { key: "deer", label: "Deer", category: "creatures" },
  { key: "fox", label: "Fox", category: "creatures" },

  { key: "mountain", label: "Mountain", category: "places" },
  { key: "sea", label: "Sea", category: "places" },
  { key: "forest", label: "Forest", category: "places" },
  { key: "river", label: "River", category: "places" },
  { key: "garden", label: "Garden", category: "places" },

  { key: "rain", label: "Rain", category: "elements" },
  { key: "snow", label: "Snow", category: "elements" },
  { key: "sun", label: "Sun", category: "elements" },
  { key: "moon", label: "Moon", category: "elements" },
  { key: "mist", label: "Mist", category: "elements" },

  { key: "book", label: "Book", category: "objects" },
  { key: "cup", label: "Cup", category: "objects" },
  { key: "candle", label: "Candle", category: "objects" },
  { key: "brush", label: "Brush", category: "objects" },
  { key: "lantern", label: "Lantern", category: "objects" },
];

/** Reserved motif Auwa "notices" on the user during the first-gift
 *  beat (§2.1 step 4). Drawn by Rieko specifically for this moment,
 *  never appears in the personalisation grid. */
export const FIRST_GIFT_MOTIF: Motif = {
  key: "noticed",
  label: "Noticed",
  category: "objects",
};

export function getMotif(key: string): Motif | undefined {
  if (key === FIRST_GIFT_MOTIF.key) return FIRST_GIFT_MOTIF;
  return MOTIFS.find((m) => m.key === key);
}
