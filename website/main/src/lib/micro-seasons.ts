/**
 * Japan's 72 Micro-Seasons (七十二候 / Shichijūni-kō)
 *
 * Each entry: [month, day, kanji, romanji, english]
 * The date marks the start of each ~5-day period.
 */

type MicroSeason = {
  kanji: string;
  romaji: string;
  translation: string;
  startMonth: number;
  startDay: number;
};

const seasons: MicroSeason[] = [
  // SPRING — Risshun (立春)
  { startMonth: 2, startDay: 4, kanji: "東風解凍", romaji: "Harukaze kōri o toku", translation: "East wind melts the ice" },
  { startMonth: 2, startDay: 9, kanji: "黄鶯睍睆", romaji: "Kōō kenkan su", translation: "Bush warblers sing in the mountains" },
  { startMonth: 2, startDay: 14, kanji: "魚上氷", romaji: "Uo kōri o izuru", translation: "Fish emerge from the ice" },
  // Usui (雨水)
  { startMonth: 2, startDay: 19, kanji: "土脉潤起", romaji: "Tsuchi no shō uruoi okoru", translation: "Rain moistens the soil" },
  { startMonth: 2, startDay: 24, kanji: "霞始靆", romaji: "Kasumi hajimete tanabiku", translation: "Mist starts to linger" },
  { startMonth: 3, startDay: 1, kanji: "草木萌動", romaji: "Sōmoku mebae izuru", translation: "Grass sprouts, trees bud" },
  // Keichitsu (啓蟄)
  { startMonth: 3, startDay: 6, kanji: "蟄虫啓戸", romaji: "Sugomori mushi to o hiraku", translation: "Hibernating insects surface" },
  { startMonth: 3, startDay: 11, kanji: "桃始笑", romaji: "Momo hajimete saku", translation: "First peach blossoms" },
  { startMonth: 3, startDay: 16, kanji: "菜虫化蝶", romaji: "Namushi chō to naru", translation: "Caterpillars become butterflies" },
  // Shunbun (春分)
  { startMonth: 3, startDay: 21, kanji: "雀始巣", romaji: "Suzume hajimete sukū", translation: "Sparrows start to nest" },
  { startMonth: 3, startDay: 26, kanji: "櫻始開", romaji: "Sakura hajimete saku", translation: "First cherry blossoms" },
  { startMonth: 3, startDay: 31, kanji: "雷乃発声", romaji: "Kaminari sunawachi koe o hassu", translation: "Distant thunder" },
  // Seimei (清明)
  { startMonth: 4, startDay: 5, kanji: "玄鳥至", romaji: "Tsubame kitaru", translation: "Swallows return" },
  { startMonth: 4, startDay: 10, kanji: "鴻雁北", romaji: "Kōgan kaeru", translation: "Wild geese fly north" },
  { startMonth: 4, startDay: 15, kanji: "虹始見", romaji: "Niji hajimete arawaru", translation: "First rainbows" },
  // Kokuu (穀雨)
  { startMonth: 4, startDay: 20, kanji: "葭始生", romaji: "Ashi hajimete shōzu", translation: "First reeds sprout" },
  { startMonth: 4, startDay: 25, kanji: "霜止出苗", romaji: "Shimo yamite nae izuru", translation: "Last frost, rice seedlings grow" },
  { startMonth: 4, startDay: 30, kanji: "牡丹華", romaji: "Botan hana saku", translation: "Peonies bloom" },

  // SUMMER — Rikka (立夏)
  { startMonth: 5, startDay: 5, kanji: "蛙始鳴", romaji: "Kawazu hajimete naku", translation: "Frogs start singing" },
  { startMonth: 5, startDay: 10, kanji: "蚯蚓出", romaji: "Mimizu izuru", translation: "Worms surface" },
  { startMonth: 5, startDay: 15, kanji: "竹笋生", romaji: "Takenoko shōzu", translation: "Bamboo shoots sprout" },
  // Shōman (小満)
  { startMonth: 5, startDay: 21, kanji: "蚕起食桑", romaji: "Kaiko okite kuwa o hamu", translation: "Silkworms feast on mulberry" },
  { startMonth: 5, startDay: 26, kanji: "紅花栄", romaji: "Benibana sakau", translation: "Safflowers bloom" },
  { startMonth: 5, startDay: 31, kanji: "麦秋至", romaji: "Mugi no toki itaru", translation: "Wheat ripens" },
  // Bōshu (芒種)
  { startMonth: 6, startDay: 6, kanji: "蟷螂生", romaji: "Kamakiri shōzu", translation: "Praying mantises hatch" },
  { startMonth: 6, startDay: 11, kanji: "腐草為蛍", romaji: "Kusaretaru kusa hotaru to naru", translation: "Fireflies emerge" },
  { startMonth: 6, startDay: 16, kanji: "梅子黄", romaji: "Ume no mi kibamu", translation: "Plums turn yellow" },
  // Geshi (夏至)
  { startMonth: 6, startDay: 21, kanji: "乃東枯", romaji: "Natsukarekusa karuru", translation: "Self-heal withers" },
  { startMonth: 6, startDay: 27, kanji: "菖蒲華", romaji: "Ayame hana saku", translation: "Irises bloom" },
  { startMonth: 7, startDay: 2, kanji: "半夏生", romaji: "Hange shōzu", translation: "Crow-dipper sprouts" },
  // Shōsho (小暑)
  { startMonth: 7, startDay: 7, kanji: "温風至", romaji: "Atsukaze itaru", translation: "Warm winds blow" },
  { startMonth: 7, startDay: 12, kanji: "蓮始開", romaji: "Hasu hajimete hiraku", translation: "First lotus blossoms" },
  { startMonth: 7, startDay: 17, kanji: "鷹乃学習", romaji: "Taka sunawachi waza o narau", translation: "Hawks learn to fly" },
  // Taisho (大暑)
  { startMonth: 7, startDay: 23, kanji: "桐始結花", romaji: "Kiri hajimete hana o musubu", translation: "Paulownia trees bear fruit" },
  { startMonth: 7, startDay: 28, kanji: "土潤溽暑", romaji: "Tsuchi uruōte mushi atsushi", translation: "Earth is damp, air is humid" },
  { startMonth: 8, startDay: 2, kanji: "大雨時行", romaji: "Taiu tokidoki furu", translation: "Great rains sometimes fall" },

  // AUTUMN — Risshū (立秋)
  { startMonth: 8, startDay: 7, kanji: "涼風至", romaji: "Suzukaze itaru", translation: "Cool winds blow" },
  { startMonth: 8, startDay: 13, kanji: "寒蝉鳴", romaji: "Higurashi naku", translation: "Evening cicadas sing" },
  { startMonth: 8, startDay: 18, kanji: "蒙霧升降", romaji: "Fukaki kiri matō", translation: "Thick fog descends" },
  // Shosho (処暑)
  { startMonth: 8, startDay: 23, kanji: "綿柎開", romaji: "Wata no hana shibe hiraku", translation: "Cotton flowers bloom" },
  { startMonth: 8, startDay: 28, kanji: "天地始粛", romaji: "Tenchi hajimete samushi", translation: "Heat starts to die" },
  { startMonth: 9, startDay: 2, kanji: "禾乃登", romaji: "Kokumono sunawachi minoru", translation: "Rice ripens" },
  // Hakuro (白露)
  { startMonth: 9, startDay: 8, kanji: "草露白", romaji: "Kusa no tsuyu shiroshi", translation: "Dew glistens white on grass" },
  { startMonth: 9, startDay: 13, kanji: "鶺鴒鳴", romaji: "Sekirei naku", translation: "Wagtails sing" },
  { startMonth: 9, startDay: 18, kanji: "玄鳥去", romaji: "Tsubame saru", translation: "Swallows leave" },
  // Shūbun (秋分)
  { startMonth: 9, startDay: 23, kanji: "雷乃収声", romaji: "Kaminari sunawachi koe o osamu", translation: "Thunder ceases" },
  { startMonth: 9, startDay: 28, kanji: "蟄虫坏戸", romaji: "Mushi kakurete to o fusagu", translation: "Insects seal their doors" },
  { startMonth: 10, startDay: 3, kanji: "水始涸", romaji: "Mizu hajimete karuru", translation: "Farmers drain fields" },
  // Kanro (寒露)
  { startMonth: 10, startDay: 8, kanji: "鴻雁来", romaji: "Kōgan kitaru", translation: "Wild geese return" },
  { startMonth: 10, startDay: 13, kanji: "菊花開", romaji: "Kiku no hana hiraku", translation: "Chrysanthemums bloom" },
  { startMonth: 10, startDay: 18, kanji: "蟋蟀在戸", romaji: "Kirigirisu to ni ari", translation: "Crickets chirp at the door" },
  // Sōkō (霜降)
  { startMonth: 10, startDay: 23, kanji: "霜始降", romaji: "Shimo hajimete furu", translation: "First frost falls" },
  { startMonth: 10, startDay: 28, kanji: "霎時施", romaji: "Kosame tokidoki furu", translation: "Light rains sometimes fall" },
  { startMonth: 11, startDay: 2, kanji: "楓蔦黄", romaji: "Momiji tsuta kibamu", translation: "Maples and ivy turn yellow" },

  // WINTER — Rittō (立冬)
  { startMonth: 11, startDay: 7, kanji: "山茶始開", romaji: "Tsubaki hajimete hiraku", translation: "Camellias bloom" },
  { startMonth: 11, startDay: 12, kanji: "地始凍", romaji: "Chi hajimete kōru", translation: "Land starts to freeze" },
  { startMonth: 11, startDay: 17, kanji: "金盞香", romaji: "Kinsenka saku", translation: "Daffodils bloom" },
  // Shōsetsu (小雪)
  { startMonth: 11, startDay: 22, kanji: "虹蔵不見", romaji: "Niji kakurete miezu", translation: "Rainbows hide" },
  { startMonth: 11, startDay: 27, kanji: "朔風払葉", romaji: "Kitakaze konoha o harau", translation: "North wind blows the leaves" },
  { startMonth: 12, startDay: 2, kanji: "橘始黄", romaji: "Tachibana hajimete kibamu", translation: "Citrus fruit begins to yellow" },
  // Taisetsu (大雪)
  { startMonth: 12, startDay: 7, kanji: "閉塞成冬", romaji: "Sora samuku fuyu to naru", translation: "Cold sets in, winter begins" },
  { startMonth: 12, startDay: 12, kanji: "熊蟄穴", romaji: "Kuma ana ni komoru", translation: "Bears retreat to their dens" },
  { startMonth: 12, startDay: 17, kanji: "鱖魚群", romaji: "Sake no uo muragaru", translation: "Salmon gather and swim upstream" },
  // Tōji (冬至)
  { startMonth: 12, startDay: 22, kanji: "乃東生", romaji: "Natsukarekusa shōzu", translation: "Self-heal sprouts" },
  { startMonth: 12, startDay: 27, kanji: "麋角解", romaji: "Sawashika no tsuno otsuru", translation: "Deer shed their antlers" },
  { startMonth: 1, startDay: 1, kanji: "雪下出麦", romaji: "Yuki watarite mugi nobiru", translation: "Wheat sprouts under snow" },
  // Shōkan (小寒)
  { startMonth: 1, startDay: 6, kanji: "芹乃栄", romaji: "Seri sunawachi sakau", translation: "Parsley flourishes" },
  { startMonth: 1, startDay: 10, kanji: "水泉動", romaji: "Shimizu atataka o fukumu", translation: "Springs thaw" },
  { startMonth: 1, startDay: 15, kanji: "雉始雊", romaji: "Kiji hajimete naku", translation: "Pheasants start to call" },
  // Daikan (大寒)
  { startMonth: 1, startDay: 20, kanji: "款冬華", romaji: "Fukinotō hanasaku", translation: "Butterburs bud" },
  { startMonth: 1, startDay: 25, kanji: "水沢腹堅", romaji: "Sawamizu kōri tsumeru", translation: "Ice thickens on streams" },
  { startMonth: 1, startDay: 30, kanji: "鶏始乳", romaji: "Niwatori hajimete toya ni tsuku", translation: "Hens start laying eggs" },
];

/**
 * Returns the current micro-season based on today's date.
 *
 * The array starts at Feb 4 (Risshun) and ends with late January entries.
 * We sort by calendar year: Feb–Dec first, then Jan entries treated as
 * belonging to the following year cycle.
 */
export function getCurrentMicroSeason(): MicroSeason {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  // Normalise to a sortable value where Feb 1 = 201, Jan 31 = 1331
  // This puts Jan after Dec so the calendar wraps correctly
  function toSortable(m: number, d: number): number {
    return m >= 2 ? m * 100 + d : (m + 12) * 100 + d;
  }

  const current = toSortable(month, day);

  // Walk backwards through the array to find the most recent season that has started
  let best = seasons[0];
  let bestVal = 0;

  for (const s of seasons) {
    const val = toSortable(s.startMonth, s.startDay);
    if (val <= current && val >= bestVal) {
      best = s;
      bestVal = val;
    }
  }

  return best;
}
