/*
  Yamato Emotional Framework (Ha-Ta-A-Yu-Wa).

  Rieko's proprietary framework based on ancient Yamato language
  (大和言葉). Five core states, each with poetic sub-expressions.

  Users never see this as a taxonomy. They tap a character variant and
  feel the precision through the reflection that follows.

  Source of truth: context/pillar/app.md §4.

  UI presentation rule (Section 4): English label leads, Yamato sits
  underneath in smaller subtext. The spec presents Japanese-first as
  the canonical internal reference; this file mirrors that order
  (kanji, romaji, english) so engineers read it as the brand reads it.
*/

export type YamatoState =
  | "hare"
  | "takaburi"
  | "aware"
  | "yuragi"
  | "nagomi";

export type YamatoStateDef = {
  key: YamatoState;
  kanji: string;
  romaji: string;
  english: string;
  description: string;
  subExpressions: SubExpression[];
};

export type SubExpression = {
  key: string;
  kanji: string;
  romaji: string;
  english: string;
};

export const YAMATO_STATES: YamatoStateDef[] = [
  {
    key: "hare",
    kanji: "晴",
    romaji: "Hare",
    english: "Radiant",
    description: "Positive, high energy. Affirmation of self and situation.",
    subExpressions: [
      { key: "hareyaka", kanji: "晴れやか", romaji: "Hareyaka", english: "Clear" },
      { key: "kokoro-odoru", kanji: "心躍る", romaji: "Kokoro-odoru", english: "Exhilarated" },
      { key: "hokorashii", kanji: "誇らしい", romaji: "Hokorashii", english: "Proud" },
      { key: "arigatai", kanji: "ありがたい", romaji: "Arigatai", english: "Grateful" },
    ],
  },
  {
    key: "takaburi",
    kanji: "昂",
    romaji: "Takaburi",
    english: "Intense",
    description: "Negative, high energy. Energy from conflict, rejection, or friction.",
    subExpressions: [
      { key: "ikidoori", kanji: "憤り", romaji: "Ikidoori", english: "Indignant" },
      { key: "kusuburu", kanji: "燻る", romaji: "Kusuburu", english: "Smoldering" },
      { key: "netamashii", kanji: "妬ましい", romaji: "Netamashii", english: "Envious" },
      { key: "utomashii", kanji: "疎ましい", romaji: "Utomashii", english: "Averse" },
      { key: "araburu", kanji: "荒ぶる", romaji: "Araburu", english: "Turbulent" },
      { key: "itowashii", kanji: "いとわしい", romaji: "Itowashii", english: "Disagreeable" },
      { key: "modokashii", kanji: "もどかしい", romaji: "Modokashii", english: "Frustrated" },
    ],
  },
  {
    key: "aware",
    kanji: "哀",
    romaji: "Aware",
    english: "Reflective",
    description: "Negative, low energy. Sense of loss, resonance, deep inward reflection.",
    subExpressions: [
      { key: "setsunai", kanji: "切ない", romaji: "Setsunai", english: "Poignant" },
      { key: "nasakenai", kanji: "情けない", romaji: "Nasakenai", english: "Ashamed" },
      { key: "yarusenai", kanji: "やるせない", romaji: "Yarusenai", english: "Helpless" },
      { key: "hakanai", kanji: "儚い", romaji: "Hakanai", english: "Fleeting" },
      { key: "shimeyaka", kanji: "しめやか", romaji: "Shimeyaka", english: "Somber" },
      { key: "kiokure", kanji: "気後れ", romaji: "Kiokure", english: "Timid" },
      { key: "ushirometai", kanji: "後ろめたい", romaji: "Ushirometai", english: "Guilty" },
    ],
  },
  {
    key: "yuragi",
    kanji: "揺",
    romaji: "Yuragi",
    english: "Unsettled",
    description: "Anxiety, shock, the unpredictable.",
    subExpressions: [
      { key: "sewashinai", kanji: "せわしない", romaji: "Sewashinai", english: "Restless" },
      { key: "kokorobosoi", kanji: "心細い", romaji: "Kokorobosoi", english: "Insecure" },
      { key: "madou", kanji: "惑う", romaji: "Madou", english: "Bewildered" },
      { key: "ononoki", kanji: "おののき", romaji: "Ononoki", english: "Awe-struck" },
      { key: "akke-ni-torareru", kanji: "あっけにとられる", romaji: "Akke-ni-torareru", english: "Dumbfounded" },
      { key: "kokoromotonai", kanji: "心もとない", romaji: "Kokoromotonai", english: "Uneasy" },
      { key: "itatamarenai", kanji: "いたたまれない", romaji: "Itatamarenai", english: "Awkward" },
    ],
  },
  {
    key: "nagomi",
    kanji: "和",
    romaji: "Nagomi",
    english: "Serene",
    description: "Positive, low energy. Fulfilment, tranquility, release of tension.",
    subExpressions: [
      { key: "nagomu", kanji: "和む", romaji: "Nagomu", english: "Serene" },
      { key: "kutsurogi", kanji: "寛ぎ", romaji: "Kutsurogi", english: "Relaxed" },
      { key: "sukoyaka", kanji: "健やか", romaji: "Sukoyaka", english: "Centred" },
      { key: "michitariru", kanji: "満ち足りる", romaji: "Michitariru", english: "Content" },
      { key: "itsukushimi", kanji: "慈しみ", romaji: "Itsukushimi", english: "Compassionate" },
      { key: "yasuragu", kanji: "安らぐ", romaji: "Yasuragu", english: "Relieved" },
    ],
  },
];

export function getYamatoState(key: YamatoState): YamatoStateDef {
  const found = YAMATO_STATES.find((s) => s.key === key);
  if (!found) throw new Error(`Unknown Yamato state: ${key}`);
  return found;
}
