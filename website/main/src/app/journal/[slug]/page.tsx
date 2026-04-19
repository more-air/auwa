import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { FadeIn } from "@/components/fade-in";
import { TextReveal } from "@/components/text-reveal";
import Link from "next/link";

/* ─── Article data (will come from Sanity CMS) ─── */

type ContentBlock =
  | { type: "text"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "image-pair"; images: [{ src: string; alt: string; caption?: string }, { src: string; alt: string; caption?: string }] }
  | { type: "pullquote"; text: string }
  | { type: "cta"; text: string; href: string; label: string };

const articles: Record<
  string,
  {
    title: string;
    subtitle: string;
    category: string;
    issue: string;
    author: string;
    photographer: string;
    publishedAt: string;
    heroImage: string | null;
    content: ContentBlock[];
  }
> = {
  "yakushima-island": {
    title: "Yakushima",
    subtitle: "On the island where the trees outlived history.",
    category: "Travel",
    issue: "Issue 08",
    author: "Tom Vining",
    photographer: "Tom Vining",
    publishedAt: "2026-04-09",
    heroImage: "/journal/yakushima-island/yakushima-island-hero.jpg",
    content: [
      {
        type: "text",
        text: "The forest floor was breathing. Not metaphorically. The moss covering every surface, every rock and root and fallen trunk, was so thick and so saturated with rain that the whole landscape seemed to rise and fall with a rhythm of its own. Water dripped from branches overhead. Water ran between the boulders at our feet. Water hung in the air as mist, diffusing the light until there were no shadows at all, just a soft green glow that came from everywhere and nowhere.",
      },
      {
        type: "text",
        text: "We had been walking for two hours along the Shiratani Unsuikyo trail. The path, such as it was, moved between granite boulders wrapped in moss so deep it looked like upholstery. Roots crossed the trail in thick tangles, some of them exposed and polished smooth by decades of hikers, others hidden beneath the moss layer, waiting to catch a boot. Rieko walked ahead. She had not spoken in some time. There was nothing to say that the forest was not already saying.",
      },
      {
        type: "text",
        text: "Yakushima sits 60 kilometres off the southern tip of Kyushu. A small, nearly round island, roughly 500 square kilometres, most of it mountainous and almost all of it covered in forest. The interior peaks reach nearly 2,000 metres, high enough to create their own weather. Yakushima receives between four and ten metres of rainfall per year, depending on altitude. The locals say it rains 35 days a month. They are not entirely joking.",
      },
      {
        type: "image",
        src: "/journal/yakushima-island/yakushima-island-moss-forest.jpg",
        alt: "Moss-covered boulders and twisted tree roots on the forest floor of Yakushima's Shiratani Unsuikyo ravine, every surface a deep saturated green",
        caption: "The forest floor of Shiratani Unsuikyo. Every surface wrapped in moss so deep it looks like upholstery.",
      },
      {
        type: "text",
        text: "This rain is why the cedars grew here. And kept growing. The oldest of them, Jomon Sugi, is estimated to be between 2,170 and 7,200 years old. The range is that wide because the interior of the trunk has rotted away, making precise dating impossible. It does not matter. Whether the tree was a sapling when the pyramids were being built or when the first Jomon people were firing clay pots, the scale is the same. It was here before recorded history, and it is still here, and it does not care that you came to look at it.",
      },
      {
        type: "text",
        text: "The yakusugi (the name given to any Yakushima cedar over a thousand years old) do not look like other trees. Their trunks twist and bulge and fold in on themselves, the grain spiralling in patterns that suggest geological time more than biological growth. Bark gives way to exposed wood, the surface worn smooth and silver-grey, shaped by centuries of wind and rain into forms that look sculpted. Younger trees grow from the trunks of older ones. Moss and ferns sprout from every crevice. A single tree becomes an ecosystem, hosting dozens of other species in its canopy and on its bark, each one depending on the structure the cedar provides.",
      },
      {
        type: "text",
        text: "This is what Hayao Miyazaki saw.",
      },
      {
        type: "text",
        text: "The Shiratani Unsuikyo ravine is the forest that inspired the landscapes of Princess Mononoke. Miyazaki visited in the 1990s, sketching the moss-covered boulders and the tangled canopy, and the connection is immediate. Walking through it feels like walking into a frame of the film. The same green saturation. The same sense of a forest that is not a backdrop but a character. The same feeling that you are being watched, not by anything hostile, but by something very old that is simply aware of your presence.",
      },
      {
        type: "text",
        text: "In the ancient Japanese understanding, Yakushima\u2019s cedars are not sacred because someone designated them. They are sacred because they are inhabited. Yaoyorozu no kami, the belief that spirit exists in all things, is not an abstract concept on this island. It is obvious. You stand in front of a tree that has been alive for three thousand years, its roots gripping granite, its branches holding an entire aerial garden of ferns and orchids, and the idea that it possesses spirit requires no argument at all. The tree makes the case itself.",
      },
      {
        type: "pullquote",
        text: "A web that lasts a day, strung between branches of a tree that has lasted millennia.",
      },
      {
        type: "image-pair",
        images: [
          { src: "/journal/yakushima-island/yakushima-island-cedar-grain.jpg", alt: "Close-up of an ancient yakusugi cedar trunk showing swirling silver-grey grain patterns shaped by centuries of wind and rain", caption: "The grain of a yakusugi. Centuries of wind and rain have shaped the wood into something closer to sculpture than bark." },
          { src: "/journal/yakushima-island/yakushima-island-spider-web.jpg", alt: "A spider web beaded with water droplets strung between moss-covered branches in the Yakushima forest", caption: "A web between branches. It will not survive the evening rain. The branches will outlast us all." },
        ],
      },
      {
        type: "text",
        text: "We reached a clearing where two boulders, each the size of a small car, leaned against one another with a gap between them just wide enough to pass through. The moss on their surfaces was six inches deep, a dozen shades of green depending on exposure and moisture. A spider had built a web between two branches at the entrance, the silk beaded with water droplets so fine they caught the diffused light like a string of tiny lenses. It must have taken hours to build. The rain would destroy it by evening.",
      },
      {
        type: "text",
        text: "That contrast stayed with me. A web that lasts a day, strung between branches of a tree that has lasted millennia. Both of them doing exactly the same thing: being alive, in this place, for as long as their nature allows. The spider does not know the tree is ancient. The tree does not know the spider is ephemeral. Only we stand here assigning meaning to the difference, measuring one lifespan against another, calling one permanent and the other fragile. The forest makes no such distinction. Everything in it is simply present.",
      },
      {
        type: "text",
        text: "The trail climbed. The mist thickened. At higher elevations the cedars were larger but fewer, their trunks spaced further apart, each one occupying enough ground for a small building. The silence up there was not empty. Water moved constantly, over rock, through moss, down the channels cut into the granite over thousands of years. Birds called from somewhere above the canopy. The occasional crack of a branch falling. These sounds did not break the silence so much as give it texture.",
      },
      {
        type: "text",
        text: "We stopped at a viewpoint where a gap in the canopy opened onto a valley filled with cloud. The tops of the cedars below us rose through the mist like islands. She sat on a rock and pulled out her sketchbook. I stood and watched the cloud move through the valley, slow and purposeful, filling one gap between the trees and then the next, the way water fills a vessel.",
      },
      {
        type: "text",
        text: "There is a particular quality to time on Yakushima. It does not slow down, exactly. It widens. You become aware of how many things are happening at the pace of centuries rather than minutes. The moss growing a millimetre per year. The cedar adding another ring. The granite wearing down under the rain, imperceptibly, a process that will continue long after the tree itself has fallen and returned to the soil that grew it.",
      },
      {
        type: "text",
        text: "We walked back down as the afternoon light softened. The trail was quieter now, most hikers already heading for the bus. At the trailhead, the sound of the road and the bus engine and a vending machine humming felt like re-entry from somewhere very far away. She closed her sketchbook. Her pages were full of roots.",
      },
    ],
  },
  "koya-san": {
    title: "Koya-san",
    subtitle: "Prayers chanted on this mountain for 1,200 years.",
    category: "Travel",
    issue: "Issue 06",
    author: "Tom Vining",
    photographer: "Tom Vining",
    publishedAt: "2026-04-09",
    heroImage: "/journal/koya-san/koya-san-hero.jpg",
    content: [
      {
        type: "text",
        text: "The alarm went off at four-thirty. Not a hotel alarm, not a phone. A wooden clapper struck three times somewhere in the corridor, followed by the shuffle of feet on tatami. We were in a shukubo, a temple lodging on Mount Koya, and morning prayers started at five regardless of whether anyone felt ready for them.",
      },
      {
        type: "text",
        text: "The room was cold. The futon was warm. Leaving one for the other required a kind of commitment that felt unreasonable at that hour. But we had come here for this. You don\u2019t stay on a mountain at 800 metres above the Kii Peninsula, in a temple founded in 816 by the monk Kukai, for the sleep.",
      },
      {
        type: "text",
        text: "The prayer hall was lit by candles and the low glow of a few overhead lamps turned down to almost nothing. The monks were already seated. We took our places at the back, on thin cushions, knees on cold wood. The chanting began without introduction. Low, resonant, rhythmic. Sanskrit syllables that have been recited in this hall for centuries, the sound rising into the wooden ceiling and hanging there.",
      },
      {
        type: "text",
        text: "You don\u2019t understand the words. That\u2019s not the point. The chanting is not a message. It is a frequency. You sit in it the way you sit in weather. After ten minutes, the cold in your knees stopped registering. After twenty, I wasn\u2019t thinking about anything at all. Not in a meditative way, not through effort. The sound simply filled the space where thought normally is.",
      },
      {
        type: "image",
        src: "/journal/koya-san/koya-san-cemetery-steps.jpg",
        alt: "Misty stone steps rising between ancient cedar trunks and moss-covered grave markers at Okunoin cemetery, Koya-san",
        caption: "The path through Okunoin. Over 200,000 graves line the route, some of them a thousand years old.",
      },
      {
        type: "text",
        text: "Koya-san is a town of 117 temples on a plateau in the mountains of Wakayama Prefecture. Kukai, the founder of Shingon Buddhism, established it as a monastic centre in the early ninth century. Twelve hundred years later, the mountain still operates on his terms. Monks walk between temples in wooden geta. Incense smoke drifts from every doorway. The food is shojin ryori, the vegetarian cuisine of the monasteries, served on lacquer trays in the quiet of your room.",
      },
      {
        type: "text",
        text: "We ate dinner cross-legged on the tatami the night before. Sesame tofu, pickled daikon, simmered vegetables in a light dashi, rice, miso. Small dishes, precisely arranged. No protein except the tofu. No alcohol. The meal was not restrictive. It was clarifying. Like the mountain itself, it removed options until what remained had your full attention.",
      },
      {
        type: "text",
        text: "After morning prayers, we walked to Okunoin.",
      },
      {
        type: "text",
        text: "The path begins at Ichinohashi bridge and runs for two kilometres through the largest cemetery in Japan. Over 200,000 graves line the route, some of them a thousand years old, all of them set among Japanese cedars so tall the canopy closes above the path and filters the light to a grey-green haze. Moss covers everything. The stone markers, the lanterns, the steps, the carved Buddha figures wearing hand-knitted red caps and bibs placed there by the living.",
      },
      {
        type: "pullquote",
        text: "You walk through Okunoin and something in your breathing changes. Not because you decided it should. Because the mountain has been doing this longer than you, and it is patient.",
      },
      {
        type: "image",
        src: "/journal/koya-san/koya-san-monk.jpg",
        alt: "A monk in orange kesa and black robes walking with a clear umbrella through Okunoin cemetery in light rain, stone lanterns and cedars on either side",
        caption: "A monk on the Okunoin path. His pace was deliberate, unhurried. The walk of someone for whom this is a daily practice.",
      },
      {
        type: "text",
        text: "The silence was not empty. It was occupied. Birdsong, water dripping from branches, the distant percussion of a wooden bell from somewhere deeper in the cemetery. Our footsteps on the gravel path sounded like the loudest thing on the mountain. I slowed down without meaning to. Everyone does.",
      },
      {
        type: "text",
        text: "Halfway along the path, we passed a monk walking in the opposite direction. Orange kesa over black robes, a clear umbrella held against the fine rain that had started falling. He didn\u2019t look at us. He didn\u2019t need to. His pace was deliberate, unhurried, the walk of someone for whom this path is not a destination but a daily practice. He passed between the graves and the cedars the way a thread passes through fabric, belonging to it completely.",
      },
      {
        type: "image-pair",
        images: [
          { src: "/journal/koya-san/koya-san-jizo.jpg", alt: "A stone Jizo statue wearing a hand-knitted red cap and bib, hands pressed together in prayer, snow and graves behind", caption: "Jizo at Okunoin. The red cap and bib are placed by the living, renewed with the seasons." },
          { src: "/journal/koya-san/koya-san-robed-statue.jpg", alt: "A stone statue dressed in an orange cap, pink bib, and floral kimono, holding a staff among the cedars and graves of Okunoin", caption: "Another figure dressed by visitors. The floral kimono is recent. The stone beneath it is not." },
        ],
      },
      {
        type: "text",
        text: "There are graves here for samurai, for emperors, for corporate founders. Panasonic, Nissan, and Kirin all have memorials along the path. There is no hierarchy to the arrangement. A feudal lord\u2019s monument stands beside a family marker no larger than a shoebox. The cedars don\u2019t discriminate. The moss covers everything equally.",
      },
      {
        type: "text",
        text: "At the end of the path, beyond a small bridge that marks the boundary of the innermost sanctuary, is the Torodo, the Hall of Lanterns. Over 10,000 lanterns burn inside, two of which are said to have been lit for over 900 years. Behind the hall is the mausoleum of Kukai himself. In Shingon belief, Kukai is not dead. He entered eternal meditation in 835, and the monks still bring him meals twice a day. Every morning, every evening, for 1,200 years.",
      },
      {
        type: "text",
        text: "Whether you accept that literally does not matter. What matters is that people have been walking this path, tending these graves, chanting these sutras, and carrying those meals without interruption for longer than most nations have existed. The awareness on this mountain is not a concept. It is a practice so deeply embedded in the place that you absorb it by proximity.",
      },
      {
        type: "text",
        text: "We caught the cable car back down in the early afternoon. The funicular dropped steeply through bare winter forest, the trees close on both sides, snow on the tracks. At the bottom station we changed to a local train. The driver sat upright in his cab, uniformed, focused, calling out each stop. The Kii Peninsula spread out below as the train wound down through the valleys.",
      },
      {
        type: "text",
        text: "Neither of us spoke much. There is a particular kind of quiet that follows sustained attention. Not tired, not reflective exactly. More like the pause after a long exhale. The mountain was behind us. Already settling into the kind of memory that changes shape slowly over years. Rieko leaned against the window and closed her eyes. Outside, winter light arrived late in the mountains, grey and soft and undemanding. We had a long way back to Osaka. There was no reason to hurry.",
      },
    ],
  },
  "nozawa-fire-festival": {
    title: "Nozawa Fire Festival",
    subtitle: "On the night a village tried to burn down a shrine.",
    category: "Seasons",
    issue: "Issue 09",
    author: "Tom Vining",
    photographer: "Tom Vining",
    publishedAt: "2026-01-15",
    heroImage: "/journal/nozawa-fire-festival/nozawa-fire-festival-hero.jpg",
    content: [
      {
        type: "text",
        text: "The shaden stood in the snow like something from a different century. Fifteen metres of stacked timber, branches, and straw, a handmade wooden shrine topped with live pine trees, rising from a slope above the village of Nozawa Onsen. Around its base, men in brown uniforms lined up in rows. Their breath fogged in the January air. Nobody spoke. A Shinto priest in grey ceremonial robes walked across the snow, blessing the structure that would be destroyed within hours.",
      },
      {
        type: "text",
        text: "This is the Dosojin Matsuri. Every year on 15 January, the men of Nozawa Onsen build a shrine, dedicate it to the dosojin (the protective spirits of the village), and then fight over whether it burns. The 42-year-olds defend the roof, the 25-year-olds defend the base. Everyone else attacks. The whole village watches, drinks, and participates in a ritual that has been repeated for over three hundred years.",
      },
      {
        type: "text",
        text: "There is no audience at the Dosojin Matsuri. There are participants. The distinction matters.",
      },
      {
        type: "image",
        src: "/journal/nozawa-fire-festival/nozawa-fire-festival-priest.jpg",
        alt: "A Shinto priest in grey ceremonial robes walking across the snow at Nozawa Onsen, the wooden shaden shrine rising behind him",
        caption: "The priest crosses the snow after blessing the shaden. Within hours, the structure behind him will be on fire.",
      },
      {
        type: "text",
        text: "By late afternoon the shrine had been blessed, the group photographs taken, sake poured for the spirits and for the men who would defend them. The priest walked back across the snow alone, his formal robes dark against the white hillside. Behind him, the shaden waited. Straw-wrapped, timber-braced, impossibly tall. A thing built to be beautiful and then to be burned.",
      },
      {
        type: "text",
        text: "Night fell fast. The temperature dropped with it, and the village filled from the edges. Families carried children on their shoulders. Old women stood in doorways with cups of amazake. At the base of the slope, fire stations had been prepared: massive bonfires fed with cedar branches, their heat pushing back the cold in shifting waves. Torches were distributed. Long bundles of straw bound tight, lit from the communal fires, carried uphill toward the shaden by anyone who wanted one.",
      },
      {
        type: "text",
        text: "The attack began without signal. Men rushed the base of the shrine with burning torches, pressing fire against the straw and timber. From above, the defenders kicked the torches away, stamped out flames with their boots, hauled up burning bundles and threw them back. The crowd surged. Sparks rose in spiralling columns. The heat was immediate and total. You could feel it on your face from thirty metres away.",
      },
      {
        type: "pullquote",
        text: "You could feel the heat on your face from thirty metres away. The defenders crouched on top of the shaden, watching the fire climb toward them through the logs.",
      },
      {
        type: "image-pair",
        images: [
          { src: "/journal/nozawa-fire-festival/nozawa-fire-festival-torches.jpg", alt: "Men carrying burning straw torches press toward the base of the wooden shaden at Nozawa Onsen's Dosojin Matsuri", caption: "Attackers press fire against the base. The straw catches fast, the timber slower." },
          { src: "/journal/nozawa-fire-festival/nozawa-fire-festival-assault.jpg", alt: "Close-up of villagers wielding torches beneath kanji-painted banners at the Dosojin Matsuri fire festival", caption: "Banners and torches. The kanji reads prayers for the year ahead." },
        ],
      },
      {
        type: "text",
        text: "What struck me was the calm on the defenders' faces. Six men crouched on top of the shaden, silhouetted against the smoke, watching the fire climb toward them through the logs. They were not performing bravery. They were doing something their fathers had done, and their grandfathers before that. Sitting in the smoke, watching the sparks, waiting.",
      },
      {
        type: "text",
        text: "The fighting lasted hours. Waves of attackers with fresh torches, the defenders always outnumbered, always retreating slightly, always holding. Sake flowed in both directions. Men who had been grappling over a burning torch shared a cup minutes later. There was no animosity in any of it. The violence was real (clothes caught fire, eyebrows singed, skin reddened from heat and contact) but the spirit was communal. This was not competition. It was participation.",
      },
      {
        type: "text",
        text: "Dosojin are the boundary spirits of Japanese villages. They protect the community from disease, disaster, and evil spirits. They guard crossroads and borders. In the ancient Japanese understanding of yaoyorozu no kami, these are not abstract concepts. The dosojin are present. They inhabit the stone markers at the edges of the village, and once a year the village renews its relationship with them through fire.",
      },
      {
        type: "text",
        text: "The burning is not destruction. It is renewal. The old year's impurities are consumed. The protective spirits are honoured through the offering. The young men prove their commitment to the village by defending the shrine, and the village proves its collective strength by eventually, inevitably, burning it down. By midnight the shaden was a column of flame, forty feet of fire against the black Nagano sky, and every face in the crowd was lit orange.",
      },
      {
        type: "text",
        text: "Nobody left when it fell. They stood in the heat and the smoke and the snow and they watched it burn to nothing. Then they walked home through the village, past the stone dosojin markers at every intersection, past the onsen steam rising from the bathhouses, past the darkened ski rental shops and the closed restaurants. The streets smelled of woodsmoke and sulphur. In the morning, the snow where the shaden had stood would be black. By February, fresh snow would cover even that. By next January, they would build it again.",
      },
    ],
  },
  "making-washi": {
    title: "Making Washi",
    subtitle: "Cold water, mulberry bark, a thousand-year gesture.",
    category: "Craft",
    issue: "Issue 03",
    author: "Tom Vining",
    photographer: "Tom Vining",
    publishedAt: "2026-04-09",
    heroImage: "/journal/washi/washi-hero.jpg",
    content: [
      {
        type: "text",
        text: "The workshop smelled of water and wood. Cold, mineral water from the Takase River, and the faint sweetness of mulberry bark that had been soaking for days in a stone trough near the entrance.",
      },
      {
        type: "text",
        text: "We had taken the train north from Matsumoto into the mountains of Omachi, Nagano, then from the station we followed directions to Shinshu Matsuzaki Japanese Paper. The building sat on a quiet road, very calm, with a nice atmosphere. Inside, the air was cool and fresh.",
      },
      {
        type: "text",
        text: "Matsuzaki-san met us in the main workshop. He explained the process the way someone explains breathing: simply, because it is simple, and because he has done it every day for decades. Washi begins as kozo, the inner bark of the mulberry tree. The fibres are stripped, soaked, boiled with wood ash, rinsed in river water, then beaten by hand until they separate into a cloudy pulp suspended in a vat of water. The vat in front of us was waist-high, wide as a dining table.",
      },
      {
        type: "image",
        src: "/journal/washi/washi-rieko.jpg",
        alt: "Dipping a wooden sugeta frame into the vat of mulberry pulp at Shinshu Matsuzaki workshop",
        caption: "Rieko at the vat. The A4 sized frame for the full course, the same motion the workshop has practised since 1042.",
      },
      {
        type: "text",
        text: "He picked up the sugeta, a wooden frame with a fine bamboo screen stretched across it, and dipped it into the vat. One smooth motion forward, a pause, then back. The pulp settled across the screen in a thin, even layer. He tilted the frame to drain, rocked it gently side to side. Then he turned the screen over onto a stack of freshly formed sheets, peeled the frame away, and the paper was there. Wet, translucent, alive.",
      },
      {
        type: "text",
        text: "The whole thing took perhaps twenty seconds. He has been doing it since he was young. The tradition in this valley goes back to 1042, when shrine attendants at the Nishina Shinmei Shrine first made paper from wild mulberry for sacred offerings. Matsuzaki\u2019s own workshop is younger, roughly ninety years, but the gesture is the same one those attendants practised nearly a thousand years ago: dip, settle, drain, turn.",
      },
      {
        type: "text",
        text: "Then it was our turn. Rieko stepped up to a smaller vat with an A4 sized frame. The motion looks simple when Matsuzaki-san does it. It is not simple. The pulp has a weight and a will. Dip too fast and it floods the screen unevenly. Too slow and it settles in clumps. The wrist has to find a rhythm, a tempo that lets the fibres distribute themselves. She found it after a few attempts.",
      },
      {
        type: "text",
        text: "What surprised me was how physical it felt. Your hands in cold water, your forearms bracing the frame, your whole body leaning into the motion. There is no abstraction in papermaking. You are standing in a cold room, hands wet, making something one sheet at a time. The process does not scale. It is not designed to.",
      },
      {
        type: "pullquote",
        text: "There is no abstraction in papermaking. You are standing in a cold room, hands wet, making something one sheet at a time.",
      },
      {
        type: "image-pair",
        images: [
          { src: "/journal/washi/washi-press.jpg", alt: "Matsuzaki-san operating the heavy wooden screw press to squeeze water from freshly formed washi sheets", caption: "The wooden screw press. Sheets are stacked and pressed to remove water before drying." },
          { src: "/journal/washi/washi-workshop.jpg", alt: "Wooden buckets and iron cauldron used for boiling mulberry bark in the Matsuzaki workshop", caption: "Wooden buckets and the iron cauldron for boiling bark. Everything worn smooth by use." },
        ],
      },
      {
        type: "text",
        text: "After forming, each sheet is stacked, pressed under a heavy wooden screw press to squeeze out the water, then separated and brushed onto heated drying boards one at a time. Matsuzaki-san showed us the press, a beautiful piece of old equipment. Beside it, the wooden buckets and iron cauldrons used for boiling the bark. Everything worn smooth by use. Nothing decorative, nothing replaced that still worked.",
      },
      {
        type: "text",
        text: "We placed leaves and flowers into our sheets before pressing. Small maple leaves, dried petals, thin grasses. They sank into the wet pulp and became part of the paper. Not printed on, not glued. Held within the fibres themselves. When the paper dried, you could see them through it, suspended like insects in amber. Light passed through the sheet differently where a leaf sat, casting a faint green shadow.",
      },
      {
        type: "text",
        text: "Matsuzaki-san wants to pass this on. He said so plainly, without sentimentality. The tradition matters to him, and fewer people carry it each year. The spread of Western paper and wartime disruption reduced Omachi's papermakers from many to almost none. He opens his workshop to visitors not as a tourist attraction but as a form of continuity. Every person who dips a frame into that vat and feels the weight of the pulp settling onto the screen understands something about washi that reading cannot give them.",
      },
      {
        type: "image",
        src: "/journal/washi/washi-mulberry.jpg",
        alt: "Strips of dried kozo mulberry bark fibre on a worn wooden surface in the workshop",
        caption: "Kozo, the inner bark of the mulberry tree. Stripped, soaked, boiled, beaten, and suspended in water to become washi.",
      },
      {
        type: "text",
        text: "We left with our own handmade washi paper drying flat in a paper envelope. They are not perfect. But they are, without question, the most beautiful pieces of paper we own. You can feel the fibres when you run a finger across the surface. You can see where the mulberry bark, stripped and soaked and beaten and suspended in mountain river water, became something new without losing what it was.",
      },
      {
        type: "text",
        text: "There is a particular quiet that follows making something with your hands, especially something that took your full attention. When we got back to our hotel we dried them on our window following Matsuzaki-san's instructions. The afternoon light came through the window and hit the paper where we could see the leaves inside, held there in the fibres, going nowhere. Absolutely beautiful. By late the next day, the paper was completely dry and ready for our journey home.",
      },
    ],
  },
  "oroku-gushi": {
    title: "Oroku-gushi",
    subtitle: "Made from wood that breaks axes. Named after a girl.",
    category: "Craft",
    issue: "Issue 07",
    author: "Tom Vining",
    photographer: "Tom Vining",
    publishedAt: "2026-04-09",
    heroImage: "/journal/oroko/oroko-hero.jpg",
    content: [
      {
        type: "text",
        text: "We bought it from a small shop in Japan. The owner was a craftsman himself, responsible for the final polishing stage of every comb that left the workshop. Before wrapping ours, he brought out a comb his ancestor had made during the Edo period and used for years. The wood had darkened to a deep amber, the teeth still perfectly intact, the whole object radiating a quiet authority that only comes from centuries of use. He held it like you would hold a family photograph. Then he slid ours into its cloth pouch and, before handing it over, talked us through how to care for it. He took his time. Store it in the pouch when not in use. Never leave it in a wet bathroom. Oil it with tsubaki every few months, working the oil into the teeth with your fingers. He spoke the way someone speaks about a living thing, with real attention to what it needs. The comb will last a lifetime, he said. Longer, if you treat it well.",
      },
      {
        type: "text",
        text: "On the train back to our hotel, I slid it from the pouch again. Pale, dense wood, fine teeth cut so close together they looked like the lines on a ruler. The body curved gently, shaped to sit in the palm. Through the window, the countryside moved past, but I kept turning the comb in my hands, running a thumb along the teeth, feeling where each one had been polished smooth.",
      },
      {
        type: "text",
        text: "This is an oroku-gushi, a traditional fine-toothed comb from Yabuhara in the Kiso Valley, Nagano Prefecture. The craft is roughly three hundred years old, rooted in the Edo period, and named after a girl called Oroku. The story goes that Oroku suffered from terrible headaches. She visited Gokoku Daigongen Shrine to pray for relief and received a message: comb your hair every day with a comb made from the minebari tree. She did, and the headaches stopped. The combs have carried her name ever since.",
      },
      {
        type: "image",
        src: "/journal/oroko/oroko-teeth.jpg",
        alt: "Close-up of an oroku-gushi comb showing finely cut minebari wood teeth emerging from its asanoha-patterned cotton pouch",
        caption: "Minebari teeth, cut by hand and polished until there are no edges left to catch. The asanoha pouch is cotton, printed with one of Japan\u2019s oldest geometric patterns.",
      },
      {
        type: "text",
        text: "Minebari (Onoore Kanba) is an extraordinary wood. Its Japanese name translates roughly as \"the tree that breaks axes,\" which tells you everything about its density. It sinks in water. It has a natural bitterness and antibacterial properties that the old craft families believe contribute to the comb\u2019s reputation for healing. The wood is dried for thirteen years before a craftsman touches it. Thirteen years of waiting, just for the raw material to be ready. After that, the making begins.",
      },
      {
        type: "text",
        text: "A standard oroku-gushi is about ten centimetres wide, with seventy to a hundred teeth packed into that small space. Master-level combs push further: over a hundred and forty teeth in just eight centimetres, each spaced at intervals of roughly 0.6 millimetres. The teeth are cut one by one using more than twenty specialised tools, then hand-finished and polished until every edge is smooth enough to pass through hair without catching a single strand. The density of the teeth eliminates static and distributes natural oils evenly. After a few weeks of use, your hair changes. It becomes smoother, shinier. The comb is doing something a plastic comb cannot.",
      },
      {
        type: "text",
        text: "The number of craftsmen who can make oroku-gushi is declining. Plastic combs arrived in the late 1940s and the industry contracted sharply. Some makers left the craft entirely, returning only decades later. The Kiso Village Orokugushi Comb Association now runs training programmes in local schools, trying to develop successors. It is a familiar story in Japanese craft: a tradition sustained by fewer hands each generation, each pair of hands carrying more weight.",
      },
      {
        type: "text",
        text: "The comb came in a drawstring pouch of cotton fabric printed with asanoha, the hemp leaf pattern that appears across Japanese craft and textiles. Asanoha is one of the oldest geometric patterns in Japan, associated with growth and good health. For daily use, the pouch is enough. But for long-term storage, the shop owner told us, place the comb in a container with a soft cloth and a little tsubaki oil. The wood stays nourished, the teeth stay smooth, and the comb keeps aging the way it should.",
      },
      {
        type: "pullquote",
        text: "A comb is the most ordinary object in the world. Everybody owns one. Nobody thinks about it. Which is precisely what makes a good one so startling.",
      },
      {
        type: "image-pair",
        images: [
          { src: "/journal/oroko/oroko-teeth.jpg", alt: "Detail of the oroku-gushi comb\u2019s fine minebari wood teeth against the red and white asanoha fabric", caption: "The teeth are so closely spaced they catch light like the lines on a ruled page." },
          { src: "/journal/oroko/oroko-stamp.jpg", alt: "Close-up of the craftsman\u2019s stamp pressed into the minebari wood, with the asanoha pouch behind", caption: "The craftsman\u2019s mark, pressed into the minebari. Small, deliberate, permanent." },
        ],
      },
      {
        type: "text",
        text: "Minebari changes over time. The natural oils from your hair and scalp absorb into the grain, darkening it gradually from pale straw to a deep, warm amber. A comb that has been used for twenty years looks completely different from a new one. The wood remembers. It carries a record of use that no other material can replicate. Plastic stays the same forever. Minebari becomes yours.",
      },
      {
        type: "text",
        text: "There is an ancient Japanese belief that objects used with care accumulate a kind of spirit. Not just mountains and rivers, but bowls, knives, brooms, and combs. An object made with enough skill, from the right material, used with enough attention, becomes more than what it was when it left the workshop.",
      },
      {
        type: "text",
        text: "Rieko uses it most mornings. Sure enough, her hair looks shinier and healthier than it ever did. I\u2019m envious. Next time we\u2019re in Nagano, I\u2019m buying one for myself.",
      },
    ],
  },
  "72-seasons": {
    title: "72 Seasons",
    subtitle: "Five-day seasons, each one worth noticing.",
    category: "Seasons",
    issue: "Issue 05",
    author: "Tom Vining",
    photographer: "Tom Vining",
    publishedAt: "2026-04-09",
    heroImage: "/journal/72-seasons/72-seasons-hero.jpg",
    content: [
      {
        type: "text",
        text: "The plum blossoms opened on a Thursday. Not all of them. Three branches on the tree outside the ryokan in Hakone, the lower ones that caught the most sun. By Saturday the rest had followed, and by the following week the petals were already falling, collecting in the stone gutter that ran along the path to the bath. The whole thing lasted ten days. If you weren\u2019t paying attention, you\u2019d have missed it entirely.",
      },
      {
        type: "text",
        text: "In the old Japanese calendar, this moment has a name. Ume hajimete hiraku. Plum blossoms begin to open. It marks a five-day window around the middle of February, one of seventy-two micro-seasons (shichijuni-k\u014d) that divide the Japanese year into increments so fine they feel less like a calendar and more like a practice of observation.",
      },
      {
        type: "text",
        text: "The system dates to 1685, adapted from an earlier Chinese model by the shogunate astronomer Shibukawa Shunkai. Where the Chinese version described egrets and millet, Shibukawa rewrote the entries to match what a person would actually see in Japan. Hawks learning to fly. The first distant thunder. Warm winds melting the ice. Each k\u014d lasts roughly five days. Each one names something specific, something you could verify by walking outside and looking.",
      },
      {
        type: "image",
        src: "/journal/72-seasons/72-seasons-tsukubai.jpg",
        alt: "A stone tsukubai water basin with fallen red maple leaves floating on the surface, moss covering the bamboo ladle rest",
        caption: "Fallen maple leaves in a temple tsukubai. The basin collects whatever the season is doing.",
      },
      {
        type: "text",
        text: "That specificity is the point. The seventy-two k\u014d are not poetry (though they read like it). They are instructions. Go outside. Look at what is happening right now. Not last week, not next month. Now. The paulownia tree is flowering. The fireflies are out. The soil is moist and warm. Every five days, the calendar redirects your attention to whatever the natural world is doing in this particular window, and by the time you\u2019ve noticed it, the window has moved on.",
      },
      {
        type: "text",
        text: "We first encountered the system on a trip to Kyoto in autumn. A small printed card at a teahouse listed the current k\u014d: kirigirisu togane ni aru. Crickets chirp on doorsteps. It was late October, and that evening, walking back through Higashiyama, we heard them. Not because they hadn\u2019t been there before. Because nobody had told us to listen.",
      },
      {
        type: "text",
        text: "That\u2019s the shift. Not learning something new about nature, but paying a different quality of attention to what was already there. You already know the seasons change. You already notice when the leaves turn, when the first frost arrives, when the evenings get longer. The seventy-two k\u014d simply ask you to notice more often, and with greater precision.",
      },
      {
        type: "pullquote",
        text: "You already know the seasons change. The seventy-two k\u014d simply ask you to notice more often, and with greater precision.",
      },
      {
        type: "text",
        text: "Five days is an interesting unit of time. Short enough to feel urgent. Long enough to observe something develop. A bud opens. The rain changes character. A particular bird arrives or departs. In five days the light shifts, measurably, and if you\u2019re watching for it you can feel the axis of the year tilting underneath everything else.",
      },
      {
        type: "image-pair",
        images: [
          { src: "/journal/72-seasons/72-seasons-veranda.jpg", alt: "A temple veranda with red felt over tatami mats, afternoon sunlight casting geometric shadows, an autumn garden beyond", caption: "Afternoon light on the veranda. The red felt, the tatami, the garden turning. A room built for looking outward." },
          { src: "/journal/72-seasons/72-seasons-engawa.jpg", alt: "A father and son sitting on a wooden engawa looking out at bamboo and autumn foliage in a temple garden", caption: "A father and son on the engawa. Paying attention is not a solo practice." },
        ],
      },
      {
        type: "text",
        text: "Most of us run on two calendars: the monthly grid and the weekly cycle. Both are administrative. They tell you when things are due, not what is happening. The seventy-two k\u014d offer a third calendar, one that tracks the world rather than your obligations. It doesn\u2019t replace the other two. It runs underneath them, quietly, like a river under a road.",
      },
      {
        type: "text",
        text: "In Japan, this awareness is woven into daily life in ways that don\u2019t announce themselves. The wagashi at a tea ceremony changes with the k\u014d. Kaiseki menus shift every five days. Flower arrangements follow what is blooming now, not what looks best in general. There is no special effort involved. The culture simply never stopped paying attention to what most modern societies filtered out when they moved indoors.",
      },
      {
        type: "text",
        text: "AUWA\u2019s journal follows this rhythm. Not as a rigid system, and not as a history lesson. As a prompt. Every five days, the season offers something worth noticing. A shift in light. A sound at dusk. A particular quality in the morning air that wasn\u2019t there last week and won\u2019t be there next week. The seventy-two k\u014d are not an almanac. They are an invitation to treat the year as something that is happening to you, around you, right now.",
      },
      {
        type: "text",
        text: "Spring rain moistens the soil. That\u2019s the k\u014d for early April. Step outside and check.",
      },
    ],
  },
  "the-onsen-lesson": {
    title: "The Onsen Lesson",
    subtitle: "What hot water and strangers teach about being alive.",
    category: "Philosophy",
    issue: "Issue 04",
    author: "Tom Vining",
    photographer: "Tom Vining",
    publishedAt: "2026-04-09",
    heroImage: "/journal/the-onsen-lesson/the-onsen-lesson-hero.jpg",
    content: [
      {
        type: "text",
        text: "The first time I entered a Japanese onsen, I had been told the rules. Wash before you get in. Small towel on your head, not in the water. Keep your voice low. Rieko had walked me through it, and I followed every step. None of that prepared me for how good it felt.",
      },
      {
        type: "text",
        text: "It was a small public bathhouse, the kind you find in any onsen town. No ticket booth. No attendant. Just a wooden door, a changing area, and water so hot it turns your skin pink in seconds.",
      },
      {
        type: "text",
        text: "You take off everything. Clothes, watch, phone. You wash at a low stool, rinse thoroughly, and lower yourself in. And what surprised me was not the heat, or the nakedness, or the fact that I was sitting with complete strangers. It was how natural it felt. Nobody stared. Nobody looked away awkwardly. People just sat in the water, breathing, quiet, sometimes releasing a long, satisfying sigh of relaxation. It felt like the most ordinary thing in the world, which is exactly what made it extraordinary.",
      },
      {
        type: "image",
        src: "/journal/the-onsen-lesson/the-onsen-lesson-bath.jpg",
        alt: "Yunomine Onsen, a historic hot spring town in Wakayama Prefecture",
        caption: "Yunomine Onsen, located in Hongucho, Tanabe, Wakayama Prefecture, is a historic, UNESCO-listed hot spring town.",
      },
      {
        type: "text",
        text: "The heat is the first thing. It arrives all at once, a kind of pressure that starts at your shins and moves upward as you sink. Your breathing changes. Your shoulders, which you did not know were raised, drop. For the first minute you are aware of nothing except temperature. Then the temperature becomes normal, and you become aware of everything else.",
      },
      {
        type: "text",
        text: "The silence. The steam. The other bodies in the water, each one as bare and undefended as yours. There is no eye contact to speak of, no conversation beyond the occasional murmured greeting. People sit. They close their eyes. They breathe. The room smells of sulphur and cedar and wet stone.",
      },
      {
        type: "text",
        text: "This is what the onsen teaches, if you let it. Not relaxation (though that comes). Not wellness (though the minerals are real). The onsen teaches you what remains when you remove everything you normally hide behind.",
      },
      {
        type: "text",
        text: "In daily life, we carry layers. Clothes signal who we are. Phones signal how busy we are. Conversation signals how clever we are. The onsen strips all of it. You sit in hot water with strangers and you are, for a few minutes, simply a body among bodies. Vulnerable, equal, warm.",
      },
      {
        type: "text",
        text: "The Japanese word hadaka (裸) means naked, but it carries a secondary meaning closer to \"without pretence.\" Hadaka no tsukiai, the practice of \"naked socialising,\" is an old concept. Business deals were once sealed in the bathhouse because the logic was sound: a person without clothes, without armour, without the props of their professional life, is harder to deceive and easier to trust. Not because nakedness reveals character. Because it removes the things that obscure it.",
      },
      {
        type: "pullquote",
        text: "When you have nothing to protect, you stop scanning for threats. When you stop scanning, you start noticing.",
      },
      {
        type: "image-pair",
        images: [
          { src: "/journal/the-onsen-lesson/the-onsen-lesson-ladles.jpg", alt: "Wooden ladles and a metal basin at an onsen drinking water station, steam rising, bamboo wall behind", caption: "A drinking water station at a public soto-yu. The sign reads: half a ladle is the right amount." },
          { src: "/journal/the-onsen-lesson/the-onsen-lesson-town.jpg", alt: "The narrow streets of an onsen town in winter, traditional wooden buildings and the entrance to a public bathhouse", caption: "The entrance to a public bathhouse. The noren hangs year-round. Entry is free." },
        ],
      },
      {
        type: "text",
        text: "I have thought about this often since that first visit. We went back many times, to different towns, different bathhouses. Each visit, the same ritual: undress, wash, enter, sit, breathe. And each time, the same small revelation. How little you actually need. How quickly the mind quiets when the body has nowhere to go and nothing to do except be present in hot water.",
      },
      {
        type: "text",
        text: "There is an outdoor bath at one of the soto-yu where you can see the mountains. In winter, snow sits on the wooden fence and steam rises so thick it obscures the view for seconds at a time. Then the wind shifts and the mountains reappear, white and sharp against the sky. You sit in water that comes from deep beneath those mountains, and for a moment the distance between you and the landscape disappears. Not metaphorically. Physically. The same mineral water that carved the valley is now touching your skin. You are in the geology.",
      },
      {
        type: "text",
        text: "Rieko grew up with this. Not as ordinary life, but as something her family treasured. Her father worked long hours, and the rhythm of daily life left little room for stillness. But from time to time, the family would travel to an onsen town. A hot spring trip. She remembers those visits with a warmth that has nothing to do with temperature.",
      },
      {
        type: "text",
        text: "The awareness that comes from an onsen experience is quiet and specific. You notice the temperature of the air on your wet shoulders when you step out. You notice the weight of the wooden bucket as you pour cold water over your head. You notice the sound of water moving when someone else enters the bath. Small, physical, present. The opposite of the awareness that comes from thinking about yourself.",
      },
      {
        type: "text",
        text: "Western wellness has a version of this. Float tanks, sound baths, breathwork classes. Each one removes a sense or adds a stimulus to push you toward presence. The onsen does less. It just puts you in hot water with nothing between you and the world. The simplicity is the point.",
      },
      {
        type: "text",
        text: "We do not think of vulnerability as something to practise. We think of it as something to survive. But the onsen makes a case for voluntary vulnerability as a form of attention. When you have nothing to protect, you stop scanning for threats. When you stop scanning, you start noticing. The grain of the stone beneath your feet. The particular blue of the sky through steam. The fact that the stranger across from you has closed his eyes and looks, for the first time today, like he is not carrying anything at all.",
      },
      {
        type: "text",
        text: "The bathwater cools eventually. You step out, dry off, dress. The layers return. But something stays different for a while. A looseness in the chest, a wider peripheral vision, a willingness to let the next thing happen without already planning for the thing after that. Walking back through the town afterwards, steam still rising from the drains, your skin flushed and cooling in the night air, you understand why people have been doing this for centuries. And why they will keep doing it long after you are gone.",
      },
    ],
  },
  "shigefusa-knife": {
    title: "Shigefusa",
    subtitle: "On waiting two years for a knife, and what arrived.",
    category: "Craft",
    issue: "Issue 01",
    author: "Tom Vining",
    photographer: "Tom Vining",
    publishedAt: "2026-04-09",
    heroImage: "/journal/shigefusa/shigefusa-hero.jpg",
    content: [
      {
        type: "text",
        text: "We ordered the knife in a small hardware store in Japan. We'd been drawn in by its friendly owner and the shelves full of interesting little bits and pieces. Not one of the larger, fancier knife shops. It had a more authentic feel. As it turned out, the owner had a direct connection to Shigefusa. We asked if it would be possible to place an order. Years, possibly, came the reply. But as the conversation continued, the owner agreed to put our names down on a waitlist. A couple of years later, back in the UK, we received word that the knife was ready for collection. On our next visit to Japan, we picked it up in person. A box wrapped in brown paper with that particular Japanese precision. Every fold exact, every edge aligned.",
      },
      {
        type: "text",
        text: "Inside, a kiri wood box. Paulownia, the same timber used to store kimonos and samurai swords, chosen because it breathes with the seasons. Expanding in humidity, contracting in dry air, protecting what's inside without suffocating it. On the lid, five characters brushed in sumi ink: 御和牛刀庖丁. Honourable wa-gyuto kitchen knife. The formality of it. As though the box itself understood what it was carrying.",
      },
      {
        type: "image",
        src: "/journal/shigefusa/shigefusa-box.jpg",
        alt: "Shigefusa kitaeji wa-gyuto in its kiri wood presentation box, viewed from above",
        caption: "Kiri wood box with hand-brushed calligraphy. The paulownia timber breathes with the seasons.",
      },
      {
        type: "text",
        text: "We lifted the lid and there it was. A Shigefusa kitaeji wa-gyuto, 210 millimetres of hand-forged Swedish carbon steel, resting on wooden supports. The blade coated in a thin film of tsubaki oil, camellia, applied by hand at the workshop to protect it during its journey. No plastic. No foam. Just wood cradling steel, and the faint scent of the oil.",
      },
      {
        type: "text",
        text: "You notice things when you've waited this long. The way the light catches the kitaeji pattern, layers of different steels forge-welded together, folded, hammered, and ground until they form a flowing, smoke-like grain across the surface. Every Shigefusa blade has a different pattern. Not by design, but by nature. The same way no two pieces of wood have the same grain. The steel remembers every strike of the hammer.",
      },
      {
        type: "text",
        text: "Shigefusa is the working name of Tokifusa Iizuka, a bladesmith in Sanjo, Niigata prefecture, who works alongside his two sons in a family workshop in a region that has produced metalwork for over four hundred years. They don't have a website. They don't take custom orders. They make what they make (gyutos, nakiris, petty knives) in the quantities their hands and their days allow, and when the knives are finished, they go to a handful of shops in Japan. Waitlists run one to three years. There is no way to expedite.",
      },
      {
        type: "text",
        text: "In a world that has optimised almost everything else, this pace feels radical. Not as a statement. Shigefusa isn't making a point about slow living or mindful consumption. He's simply making knives the way he knows how to make them, at the speed the process requires. The radicalism is ours. We're the ones who've forgotten that some things take the time they take.",
      },
      {
        type: "pullquote",
        text: "The steel remembers every strike of the hammer.",
      },
      {
        type: "text",
        text: "On the face of the blade, two characters chiseled. Not laser-etched, not stamped, but cut into the steel by hand: 重房作. Made by Shigefusa. Centred, precise, permanent. A maker's mark that has appeared on blades from this workshop for generations.",
      },
      {
        type: "text",
        text: "Look closely at the spine and you can see where it's been shaped by hand. Not machine-ground to a uniform thickness, but worked with files and stones until the taper feels right under the fingers. The choil, where blade meets handle, is finished clean and smooth. The buffalo horn ferrule sits flush against the ho wood handle with no gap, no glue marks, no imperfection in the joint. These are small details. They are also the entire point.",
      },
      {
        type: "image-pair",
        images: [
          { src: "/journal/shigefusa/shigefusa-blade.jpg", alt: "Close-up of the Shigefusa blade showing kitaeji damascus pattern and hand-chiseled kanji", caption: "Kitaeji patterning: layers of forge-welded steel, each blade unique. The kanji reads 重房作, made by Shigefusa." },
          { src: "/journal/shigefusa/shigefusa-tip.jpg", alt: "Close-up of the Shigefusa blade tip showing flowing kitaeji steel pattern", caption: "The blade tip. The flowing pattern in the steel is a record of the forging. No two are alike." },
        ],
      },
      {
        type: "text",
        text: "Since ancient times, the Japanese have believed that a life force resides in all things. Yaoyorozu no kami: the understanding that spirit inhabits everything, not just living beings but rivers, mountains, and objects made with enough care and accumulated skill. A mass-produced knife carries nothing of its maker. It was made by a machine that doesn't know what a knife is for. But a blade that a single person spent days forging, shaping, polishing, and signing carries something of the person who made it into the life of the person who uses it.",
      },
      {
        type: "text",
        text: "We haven't used ours yet. It sits in its kiri box, coated in camellia oil, and we're still in the admiring stage. Still holding it up to the window to watch the light move across those layered patterns in the steel. Still marvelling at the artistry. When we collected it, the shop owner reminded us that Shigefusa wants his blades to be used, not kept for display. We will. But not quite yet.",
      },
      {
        type: "text",
        text: "Two years is a long time to wait for a knife. It's also, it turns out, exactly the right amount of time. Long enough to forget about it, then remember. Long enough to wonder if it will ever come, then stop wondering. Long enough that when you finally collect it from that same small shop, you open it slowly. You pay attention. You notice the oil, the wood, the weight, the grain in the steel, the chiseled name of the man who made it. You notice everything.",
      },
      {
        type: "text",
        text: "Which might be the most valuable thing a knife can teach you.",
      },
    ],
  },
  "narai-juku": {
    title: "Narai in Snow",
    subtitle: "Four hundred years of the same street, unchanged.",
    category: "Travel",
    issue: "Issue 02",
    author: "Tom Vining",
    photographer: "Tom Vining",
    publishedAt: "2026-04-09",
    heroImage: "/journal/narai-juku/narai-juku-hero.jpg",
    content: [
      {
        type: "text",
        text: "The snow had been falling for hours when we arrived. Not the heavy, committed snow of a storm, but the fine, silent kind that doesn\u2019t seem to accumulate until you look down and realise the road has disappeared. Narai-juku sat in it like a photograph of itself. Dark wooden buildings on both sides of a single street, a kilometre long, the mountains behind them dissolving into white. Minus ten, and dropping.",
      },
      {
        type: "text",
        text: "Almost nobody was there. A few figures in the distance, moving slowly between buildings, but the street itself belonged to the snow. Not surprisingly, given the temperature.",
      },
      {
        type: "text",
        text: "Narai is the longest of the sixty-nine post towns along the Nakasendo, the mountain route that connected Edo to Kyoto through the interior of Honshu. Travellers stopped here during the feudal period to rest, eat, and prepare for the Torii Pass. The buildings they slept in are still standing. Not reconstructed, not preserved behind glass. Still standing because nobody tore them down. The latticed facades, the overhanging second floors, the indigo noren hanging in doorways of shops that may or may not be open. Four hundred years of continuous use, worn smooth by time the way a wooden step is worn smooth by feet.",
      },
      {
        type: "image",
        src: "/journal/narai-juku/narai-juku-facade.jpg",
        alt: "A latticed wooden facade with indigo noren curtains and snow falling against dark timber in Narai-juku",
        caption: "The lattice work on these facades has survived four centuries. The noren are replaced with the seasons.",
      },
      {
        type: "text",
        text: "We walked the length of the town silently, quite in awe, as if we were in a dream or something. Snow collected on the eaves and on the carved wooden signs. A pine tree, trained flat against a building, held its branches perfectly still. Somewhere, water ran beneath the road in the channels that have carried it since the Edo period. You could hear it under the silence, a faint continuous sound like a building breathing.",
      },
      {
        type: "text",
        text: "Halfway along the street, a framed ukiyo-e print sat in a glass case above a wooden letterbox on the front of a house. A small landscape: mountains, travellers, a bridge. It could have been a scene from this exact road, painted two centuries ago by someone who stood where I was standing and saw roughly what I was seeing. The print was not in a museum. It was not labelled or lit. It was simply there, in the place where someone had put it, part of the fabric of the building the way the lattice and the letterbox were part of it.",
      },
      {
        type: "text",
        text: "This is what Narai does. It removes the boundary between the historical and the ordinary. No entrance fee. No audio guide explaining what you are looking at. The town is not performing its own past. It is simply continuing it.",
      },
      {
        type: "pullquote",
        text: "In a place with no noise and no agenda, time becomes unreliable.",
      },
      {
        type: "image",
        src: "/journal/narai-juku/narai-juku-snowfall.jpg",
        alt: "A lone figure walking through heavy snowfall past dark wooden buildings and a pine tree in Narai-juku",
        caption: "A single figure on the main street. They passed without a word and the town returned to its previous silence.",
      },
      {
        type: "text",
        text: "The snow thickened. The mountains behind the roofline faded to grey outlines. A figure appeared at the far end of the street, walking slowly, coat pulled close. They passed us without a word and turned a corner. A minute later, it was as if they had never been there.",
      },
      {
        type: "text",
        text: "I stopped in front of a shopfront with a round wooden sign and dark noren. The bench outside was dusted with snow. The door was closed. I stood there for what might have been two minutes or ten. In a place with no noise and no agenda, time becomes unreliable. Not in a mystical sense. In the plain sense that your internal clock, which usually calibrates itself against conversations and notifications and the rhythm of other people\u2019s movement, has nothing to calibrate against. You are left with the snow and the wood and the sound of water you can hear but not see.",
      },
      {
        type: "text",
        text: "At some point, standing still in the middle of the street, I watched the snow being blown sideways across the rooftops. The dark wood, the white sky, the silence, the cold on my face. And something happened that I didn\u2019t expect. My eyes filled with tears. Not from sadness, not from the wind. From something closer to joy, though that word doesn\u2019t quite cover it. Complete absorption. No distance between me and what I was looking at. For a few seconds, there was no observer and no scene. Just the snow and the wood and the cold and the fact of being there.",
      },
      {
        type: "text",
        text: "There is a tendency, when writing about places like this, to reach for large claims. To say that the place teaches you something, or changes you, or reveals a truth about the way we live now. Narai doesn\u2019t do any of that. It is a street with old buildings and, on the day we visited, a lot of snow. What it offers is not a lesson but a duration. An hour, maybe two, in which nothing happens and nothing needs to. The buildings stand. The snow falls. The water runs. You walk, or you stop walking. Both are fine.",
      },
      {
        type: "image-pair",
        images: [
          { src: "/journal/narai-juku/narai-juku-ukiyoe.jpg", alt: "A framed ukiyo-e print displayed in a glass case above a wooden letterbox on the front of a traditional building in Narai-juku", caption: "An ukiyo-e print on a house front. Not in a museum, not labelled. Just part of the street." },
          { src: "/journal/narai-juku/narai-juku-shopfront.jpg", alt: "A traditional shopfront with a round wooden sign, dark noren curtains, and a weathered bench in Narai-juku", caption: "A shopfront with a bench nobody was sitting on. The sign reads Echigoya." },
        ],
      },
      {
        type: "text",
        text: "We had four hours before our train back to Matsumoto. At minus ten, four hours is not something your body lets you forget. Twice we took refuge. First in a small tea house, where a woman brought us matcha in ceramic bowls and we sat by the window watching the snow pile up on the street outside. Then, later, in a soba restaurant, where the noodles arrived in a hot broth that made the cold feel like a distant rumour. Both times, the warmth did something physical. Circulation returning to fingers and feet, the particular pleasure of thawing that only exists because you were frozen first. You don\u2019t appreciate a warm room the same way if you haven\u2019t earned it.",
      },
      {
        type: "text",
        text: "We walked the street twice in the end, once in each direction. It looked different on the return. The same facades, the same snow, but the light had shifted and the mountains on this side had reappeared briefly before the next band of cloud arrived. Our footprints from earlier were already filling in.",
      },
      {
        type: "text",
        text: "On the train back, the Kiso Valley opened up below us, the river grey-green and fast, the hills covered in hinoki. We were both quiet, still thawing. Narai is not a place that performs its own history for visitors. It has simply continued on its own terms for so long that the question of what it is for has stopped being relevant. It is for the people who live there. If you happen to walk through it on a January afternoon, that is incidental.",
      },
    ],
  },
  "the-beginning": {
    title: "The Beginning",
    subtitle: "Light in a dark forest. A dream that wouldn't let go.",
    category: "Philosophy",
    issue: "Issue 11",
    author: "Rieko Maeda",
    photographer: "Rieko Maeda",
    publishedAt: "2026-04-10",
    heroImage: "/journal/auwa-book/auwa-book-hero.jpg",
    content: [
      {
        type: "text",
        text: "I drew the character before I knew what it was. A small, glowing shape with two dark eyes, sitting in the middle of a blank page in a sketchbook I kept by the sofa in our home. It did not look like anything I had drawn before. It looked like something that had been waiting for me to find it. That was several years ago.",
      },
      {
        type: "text",
        text: "I kept drawing it. Every few days, sometimes every day, the same figure appearing in different settings: floating above a forest, standing beside a flower, surrounded by tiny creatures in the dark. I did not plan these scenes. They arrived, fully formed, the way certain dreams do. My partner would ask me what the character was, what it wanted, where it came from. I could not answer in words. I could only show him the next drawing.",
      },
      {
        type: "image",
        src: "/journal/auwa-book/auwa-book-sketches.jpg",
        alt: "Pencil sketches of AUWA character scenes laid out on a wooden desk with a MONO eraser, mechanical pencil, and brass pencil case",
        caption: "Early sketches. Pencil on paper, working out how AUWA moves through the forest.",
      },
      {
        type: "text",
        text: "The stories took shape slowly, across notebooks and loose sheets and conversations that stretched over years. Four stories. Each one following this being of light as it encounters a different part of the natural world and reveals the kokoro within it. Kokoro (心) is the Japanese word for what English divides into heart, mind, soul, and spirit. In Japanese, these are not separate things. Kokoro is holistic: emotion, thought, and essence held together as one. It lives in the chest, not the head. It is felt before it is understood.",
      },
      {
        type: "text",
        text: "The character came from a dream. A being of light, arriving from somewhere far away, landing in a dark forest on Earth. The image was so vivid it stayed with me for days. I could see the glow against the trees, the stillness of the forest floor, this small figure standing in the middle of it all. I did not know what it meant yet. But I knew I had to follow it.",
      },
      {
        type: "text",
        text: "The meaning arrived later, through a question I could not stop asking. In Japanese culture there is a concept called <a href=\"/journal/yaoyorozu-no-kami\">Yaoyorozu no Kami</a>: the understanding that a god, a spirit, exists in all things. Not only in people and animals, but in rivers, stones, an old wooden gate, the wind moving through bamboo at dusk. This is where the idea took root. If a spirit lives in all things, what if we could actually see it?",
      },
      {
        type: "text",
        text: "That is what AUWA does. It arrives from the stars carrying a gentle light, and when that light reaches something, the kokoro within it becomes visible. A flower. A forest. A handful of soil. Things we walk past every day without noticing. AUWA notices. And in noticing, changes how you see them too.",
      },
      {
        type: "pullquote",
        text: "You would not throw something away if you could see its kokoro.",
      },
      {
        type: "text",
        text: "If we lived in that kind of world, where the soul in all things was visible, I think it would be a much kinder place. You would not throw something away if you could see its kokoro. You would not ignore a person, or a river, or a forest, if you could see what lived inside it. The stories are not really about a character with magical powers. They are about paying attention. About the awareness that everything around us is alive, and connected, and worth caring for. That is what we want to bring into the world with this book.",
      },
      {
        type: "image-pair",
        images: [
          { src: "/journal/auwa-book/auwa-book-cosmic.jpg", alt: "AUWA, a small luminous being with two dark eyes, glowing with soft rainbow light against a deep cosmic background of teal, purple, and gold", caption: "One of AUWA's many magical moments." },
          { src: "/journal/auwa-book/auwa-book-procreate.jpg", alt: "Drawing AUWA in Procreate on an iPad Pro with Apple Pencil, the original gold canvas painting of the character visible on the desk behind", caption: "From paper to Procreate. An early canvas painting watches over its digital self." },
        ],
      },
      {
        type: "text",
        text: "The illustration style is simple on purpose. Soft palette, gentle compositions, a character with no mouth and two dark eyes. I drew the first sketch nearly ten years ago, and the simplicity has never changed because it was never a constraint. It is the method. It looks like a children\u2019s book. That is the point. Adults build defences around ideas about the soul. They want evidence, argument, logic. A picture book walks straight past all of that. Charlie Mackesy understood this. Miyazaki has understood it for decades. Simplicity is not a limitation. It is the way in.",
      },
      {
        type: "image",
        src: "/journal/auwa-book/auwa-book-canvas.jpg",
        alt: "Original acrylic painting of AUWA on gold canvas, propped on a wooden desk beside a plant in a blue and white ceramic pot",
        caption: "An early quick acrylic on gold canvas, painted years before the book took shape.",
      },
      {
        type: "text",
        text: "The sketches came first, always in pencil. Then I moved to Procreate on the iPad, drawing every scene with the Apple Pencil, building up the colour and light layer by layer the way I would with paint. Some of my original iterations of AUWA were on canvas. I wanted to paint, so that I would not forget, while working on client projects, to properly start this. Procreate let me carry that warmth into the digital illustrations while working at the scale and detail the book needed.",
      },
      {
        type: "text",
        text: "The first book is complete and will be released later this year. I am currently working on the remaining stories. There are four so far, each taking AUWA somewhere new: the ocean, the city, the stars where AUWA is from. How many there will be in the end, I do not know yet. The character has a way of deciding that for me.",
      },
      {
        type: "cta" as const,
        text: "AUWA: The Beginning will be published later this year. If you\u2019d like to know when it arrives, sign up below and we\u2019ll write to you once it\u2019s released.",
        href: "/book",
        label: "Sign up",
      },
    ],
  },
  "yaoyorozu-no-kami": {
    title: "Yaoyorozu no Kami",
    subtitle: "Eight million gods. Even in things you overlook.",
    category: "Philosophy",
    issue: "Issue 10",
    author: "Tom Vining",
    photographer: "Tom Vining",
    publishedAt: "2026-04-09",
    heroImage: "/journal/yaoyorozu-no-kami/yaoyorozu-no-kami-hero.jpg",
    content: [
      {
        type: "text",
        text: "The worldview has a name: Yaoyorozu no Kami. Literally, \u201Ceight million gods,\u201D though the number is not a count. It means something closer to \u201Can uncountable multitude.\u201D Spirits in all things. Not in some things, not in special things. All things. The rock. The river. The kitchen table. The belief has been absorbed into Shinto, but it is older than Shinto as an organised practice. It predates theology. It is pre-verbal, almost. An instinct before it was ever an idea.",
      },
      {
        type: "text",
        text: "What lives within these things is kami: spirit, presence, a quality of aliveness that does not require consciousness or intention. A tree has it. A stone has it. A river has it. The rock in the garden that has sat in the same position for four hundred years has it. Not because someone decided it was sacred, but because it is alive in the way that all things are alive when you pay attention. This is the belief that AUWA draws from.",
      },
      {
        type: "image",
        src: "/journal/yaoyorozu-no-kami/yaoyorozu-no-kami-shimenawa.jpg",
        alt: "Close-up of a shimenawa sacred rope of twisted rice straw with shide paper streamers tied around the ancient bark of a cedar tree at Togakushi Shrine",
        caption: "A shimenawa marks the cedar as inhabited. The rope does not create the spirit. It acknowledges what is already there.",
      },
      {
        type: "text",
        text: "At Togakushi Shrine, in the mountains above Nagano, a shimenawa (a sacred rope of twisted rice straw) is tied around a cedar tree. The rope marks the tree as inhabited by kami, a spirit. But the rope does not create the spirit. It only acknowledges what is already there. This is the critical distinction. Yaoyorozu no Kami is not an act of consecration. It is an act of recognition. The tree was alive with kami before anyone tied a rope around it. The rope is simply a way of saying: we noticed. It also marks a sacred place, where gods reside, and serves as a barrier to prevent impure things from entering.",
      },
      {
        type: "text",
        text: "The cedar avenue at Togakushi runs for several hundred metres through deep snow. The trees on either side are enormous, their trunks rising like columns, the canopy closing overhead to filter the winter light into something grey and still. Some of these trees have been standing for four hundred years. You walk between them and something shifts in your chest. Not reverence exactly, not awe in the way that word gets used. Something quieter. The recognition that these trees are not scenery. They are present in a way that makes your own presence feel temporary and small.",
      },
      {
        type: "pullquote",
        text: "The rope does not create the spirit. It only acknowledges what is already there.",
      },
      {
        type: "text",
        text: "We tend to frame this as a Japanese concept, something culturally specific. But I think that is only half true. The cultural specificity is in the naming, the acknowledgement, the practice of tying ropes and placing offerings and bowing to a waterfall. The feeling itself is universal. Every child has talked to a stuffed animal and meant it. Every cook has a favourite knife that is, rationally, identical to three others in the drawer but is not. Every person who has lived in a house long enough has felt the moment when it stopped being a building and became something with character, with moods, with a way of holding light in the afternoon that felt like an expression of something.",
      },
      {
        type: "image-pair",
        images: [
          { src: "/journal/yaoyorozu-no-kami/yaoyorozu-no-kami-gate.jpg", alt: "The red zuijinmon gate of Togakushi Shrine with shimenawa rope, framing a snow-covered path lined with ancient cedar trees receding into the distance", caption: "The gate at Togakushi. Beyond it, the cedar avenue where four centuries of trees stand in deep snow." },
          { src: "/journal/yaoyorozu-no-kami/yaoyorozu-no-kami-prayer.jpg", alt: "Rieko in a dark coat and white hat standing in prayer at a wooden shrine building with shimenawa rope and shide streamers, snow on the ground and ancient cedars behind", caption: "Rieko at the shrine. Not performing. Participating in something passed down through generations." },
        ],
      },
      {
        type: "text",
        text: "What modern Western culture lost is not the feeling. It is the permission to take the feeling seriously. Somewhere between the Enlightenment and the Industrial Revolution, the idea that a river or a mountain or a well-made tool might possess something like spirit became childish, primitive, embarrassing. We replaced it with nothing. We just stopped talking about it.",
      },
      {
        type: "text",
        text: "Japan never stopped. This awareness runs through daily life in ways that have nothing to do with shrines or ceremonies. The way you treat your tools. The way you handle food. The custom of kuy\u014D, memorial services held for objects that have completed their service: needles, dolls, brushes, even spectacles. You do not throw away a thing that served you faithfully. You thank it. This is not sentimentality. It is a coherent relationship with the material world, one that produces less waste, more care, and a fundamentally different experience of being surrounded by objects.",
      },
      {
        type: "text",
        text: "You do not arrive at Yaoyorozu no Kami through study. You arrive by paying attention long enough that the boundary between alive and not alive stops feeling useful. The tree, the stone, the bowl, the river. You already knew. You just stopped saying it out loud.",
      },
    ],
  },
};

/* ─── Fallback article for unknown slugs ─── */
const fallbackArticle = {
  title: "The knife maker of Seki",
  subtitle: "A lifetime spent perfecting a single blade.",
  category: "Craft",
  issue: "Issue 02",
  author: "Tom Vining",
  photographer: "Tom Vining",
  publishedAt: "2026-04-09",
  heroImage: null,
  content: [
    { type: "text" as const, text: "Many of the world's great craftsmen have transformed making from an act of production to something that leans closer to the spiritual. In the workshops of Seki, a small city in Gifu prefecture long known as Japan's capital of bladesmithing, the air carries the scent of steel and charcoal." },
    { type: "text" as const, text: "The sound of hammers against anvils has echoed through these streets for seven hundred years." },
  ],
};

/* ─── Group content blocks into layout sections ─── */
type Section =
  | { kind: "text-only"; blocks: ContentBlock[] }
  | { kind: "image-beside"; image: { src: string; alt: string; caption?: string }; blocks: ContentBlock[] }
  | { kind: "image-pair"; images: [{ src: string; alt: string; caption?: string }, { src: string; alt: string; caption?: string }] };

function groupIntoSections(content: ContentBlock[]): Section[] {
  const sections: Section[] = [];
  let currentBlocks: ContentBlock[] = [];

  for (const block of content) {
    if (block.type === "image") {
      // Flush accumulated text
      if (currentBlocks.length > 0) {
        sections.push({ kind: "text-only", blocks: currentBlocks });
        currentBlocks = [];
      }
      // Image left, following text right
      sections.push({
        kind: "image-beside",
        image: { src: block.src, alt: block.alt, caption: block.caption },
        blocks: [],
      });
    } else if (block.type === "image-pair") {
      if (currentBlocks.length > 0) {
        sections.push({ kind: "text-only", blocks: currentBlocks });
        currentBlocks = [];
      }
      sections.push({ kind: "image-pair", images: block.images });
    } else {
      // Text or pullquote — add to current beside section or accumulate
      const lastSection = sections[sections.length - 1];
      if (lastSection && lastSection.kind === "image-beside") {
        lastSection.blocks.push(block);
      } else {
        currentBlocks.push(block);
      }
    }
  }

  if (currentBlocks.length > 0) {
    sections.push({ kind: "text-only", blocks: currentBlocks });
  }

  return sections;
}

/* ─── Shared text/pullquote rendering ─── */
function renderTextBlock(block: ContentBlock, i: number) {
  if (block.type === "text") {
    const hasHtml = /<[a-z][\s\S]*>/i.test(block.text);
    return (
      <FadeIn key={i} delay={Math.min(i * 30, 200)}>
        {hasHtml ? (
          <p className="font-display text-[18px] md:text-[19px] leading-[1.85] tracking-[0.005em] text-void mb-8 md:mb-10 [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-void/30 hover:[&_a]:decoration-void/60 [&_a]:transition-colors" dangerouslySetInnerHTML={{ __html: block.text }} />
        ) : (
          <p className="font-display text-[18px] md:text-[19px] leading-[1.85] tracking-[0.005em] text-void mb-8 md:mb-10">
            {block.text}
          </p>
        )}
      </FadeIn>
    );
  }
  if (block.type === "pullquote") {
    return (
      <FadeIn key={i} delay={Math.min(i * 30, 200)}>
        <blockquote className="my-12 md:my-16">
          <p className="font-display text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.3] tracking-[0.005em] text-void">
            &ldquo;{block.text}&rdquo;
          </p>
        </blockquote>
      </FadeIn>
    );
  }
  if (block.type === "cta") {
    return (
      <FadeIn key={i} delay={Math.min(i * 30, 200)}>
        <div className="mt-12 md:mt-16 pt-10 md:pt-12 border-t border-void/10">
          <p className="font-display text-[18px] md:text-[19px] leading-[1.85] tracking-[0.005em] text-void/55 mb-8">
            {block.text}
          </p>
          <Link
            href={block.href}
            className="inline-block font-sans text-[13px] tracking-[0.06em] uppercase text-void/50 border border-void/15 px-8 py-3.5 hover:text-void hover:border-void/40 transition-all duration-300"
          >
            {block.label}
          </Link>
        </div>
      </FadeIn>
    );
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return { title: "Article | AUWA" };
  }

  const title = `${article.title} | AUWA`;
  const description = article.subtitle;
  const url = `https://auwa.life/journal/${slug}`;
  const ogImage = article.heroImage?.replace(/-hero\.jpg$/, "-og.jpg") ?? null;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: article.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug] || fallbackArticle;
  const sections = groupIntoSections(article.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.subtitle,
    author: { "@type": "Person", name: article.author },
    datePublished: article.publishedAt,
    publisher: { "@type": "Organization", name: "AUWA", url: "https://auwa.life" },
    url: `https://auwa.life/journal/${slug}`,
    ...(article.heroImage && { image: `https://auwa.life${article.heroImage}` }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>

        {/* ── Hero: split layout, viewport height ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:h-[calc(100dvh-5rem)]">
          <div className="relative aspect-[4/5] md:aspect-auto bg-surface-raised overflow-hidden">
            {article.heroImage ? (
              <img
                src={article.heroImage}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100 to-surface-raised" />
            )}
          </div>

          <div className="flex flex-col justify-end px-6 md:px-10 lg:px-14 py-10 md:pb-16 lg:pb-20">
            <TextReveal
              as="h1"
              className="font-display text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.08] tracking-[0.01em] text-void"
              stagger={70}
            >
              {article.title}
            </TextReveal>
            <FadeIn delay={400}>
              <p className="mt-4 md:mt-6 font-display text-[clamp(1.2rem,2vw,1.5rem)] leading-[1.35] text-void/60">
                {article.subtitle}
              </p>
            </FadeIn>
          </div>
        </div>

        {/* ── Meta row ── */}
        <FadeIn delay={200}>
          <div className="px-6 md:px-12 lg:px-20 xl:px-28 py-6 md:py-8 border-b border-void/8">
            <div className="flex flex-wrap items-center justify-between gap-4 text-void/40">
              <div className="flex flex-wrap items-center">
                <Link href="/journal" className="font-sans text-[12px] tracking-[0.08em] uppercase hover:text-void transition-colors duration-300">
                  Journal
                </Link>
                <span className="font-sans text-[12px] tracking-[0.08em] uppercase mx-2">/</span>
                <Link href={`/journal?category=${article.category.toLowerCase()}`} className="font-sans text-[12px] tracking-[0.08em] uppercase hover:text-void transition-colors duration-300">
                  {article.category}
                </Link>
              </div>
              <div className="flex items-center gap-5">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://auwa.life/journal/${slug}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="hover:text-void transition-colors duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(`https://auwa.life/journal/${slug}`)}&description=${encodeURIComponent(article.title + ': ' + article.subtitle)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Pinterest" className="hover:text-void transition-colors duration-300">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                </a>
                <a href={`https://x.com/intent/tweet?url=${encodeURIComponent(`https://auwa.life/journal/${slug}`)}&text=${encodeURIComponent(article.title + ': ' + article.subtitle)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X" className="hover:text-void transition-colors duration-300">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── Article body — text always on right half ── */}
        <article className="py-16 md:py-24">
          {sections.map((section, si) => {

            {/* Text-only: right half */}
            if (section.kind === "text-only") {
              return (
                <div key={si} className="px-6 md:ml-[50%] md:px-10 lg:px-14 md:pr-12 lg:pr-20 xl:pr-28 max-w-full">
                  {section.blocks.map((block, bi) => renderTextBlock(block, si * 10 + bi))}
                </div>
              );
            }

            {/* Image pair: two side-by-side, full width, each with own caption */}
            if (section.kind === "image-pair") {
              return (
                <FadeIn key={si} delay={100}>
                  <div className="my-12 md:my-20 px-6 md:px-12 lg:px-20 xl:px-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {section.images.map((img, j) => (
                        <figure key={j}>
                          <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                            <img src={img.src} alt={img.alt} className="absolute inset-0 w-full h-full object-cover" />
                          </div>
                          {img.caption && (
                            <figcaption className="mt-4 mb-8 md:mb-12 font-sans text-[13px] leading-[1.6] text-void/50 max-w-[90%]">
                              {img.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              );
            }

            {/* Image beside: image left, text right */}
            if (section.kind === "image-beside") {
              return (
                <div key={si} className="md:grid md:grid-cols-2 my-10 md:my-16">
                  <div className="px-6 md:pl-12 lg:pl-20 xl:pl-28 md:pr-16 lg:pr-24 xl:pr-32 mb-8 md:mb-0">
                    <FadeIn delay={100}>
                      <figure>
                        <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
                          <img
                            src={section.image.src}
                            alt={section.image.alt}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                        {section.image.caption && (
                          <figcaption className="mt-4 mb-8 md:mb-12 font-sans text-[13px] leading-[1.6] text-void/50 max-w-[90%]">
                            {section.image.caption}
                          </figcaption>
                        )}
                      </figure>
                    </FadeIn>
                  </div>

                  <div className="px-6 md:px-10 lg:px-14 md:pr-12 lg:pr-20 xl:pr-28 md:pt-0">
                    {section.blocks.map((block, bi) => renderTextBlock(block, si * 10 + bi))}
                  </div>
                </div>
              );
            }

            return null;
          })}
        </article>

        {/* ── Byline ── */}
        <FadeIn>
          <div className="px-6 md:ml-[50%] md:px-10 lg:px-14 md:pr-12 lg:pr-20 xl:pr-28 pb-16 md:pb-24">
            <div className="pt-8 border-t border-void/8 max-w-[90%]">
              {(() => {
                const credit = (name: string) => {
                  const isRieko = name === "Rieko Maeda";
                  return {
                    href: isRieko ? "/about#rieko" : "/about#tom",
                    role: "Co-Founder, AUWA",
                  };
                };
                const author = credit(article.author);
                const photographer = credit(article.photographer);
                const samePerson = article.author === article.photographer;

                return samePerson ? (
                  <div>
                    <p className="font-sans text-[11px] tracking-[0.14em] uppercase text-void/40 mb-2">
                      Words &amp; photos
                    </p>
                    <Link href={author.href} className="block font-sans text-[13px] tracking-[0.08em] uppercase text-void hover:text-void/60 transition-colors duration-300">
                      {article.author}
                    </Link>
                    <p className="mt-1 font-display italic text-[14px] leading-[1.5] text-void/45">
                      {author.role}
                    </p>
                  </div>
                ) : (
                  <div className="flex gap-10 md:gap-14">
                    <div>
                      <p className="font-sans text-[11px] tracking-[0.14em] uppercase text-void/40 mb-2">
                        Words
                      </p>
                      <Link href={author.href} className="block font-sans text-[13px] tracking-[0.08em] uppercase text-void hover:text-void/60 transition-colors duration-300">
                        {article.author}
                      </Link>
                      <p className="mt-1 font-display italic text-[14px] leading-[1.5] text-void/45">
                        {author.role}
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-[11px] tracking-[0.14em] uppercase text-void/40 mb-2">
                        Photos
                      </p>
                      <Link href={photographer.href} className="block font-sans text-[13px] tracking-[0.08em] uppercase text-void hover:text-void/60 transition-colors duration-300">
                        {article.photographer}
                      </Link>
                      <p className="mt-1 font-display italic text-[14px] leading-[1.5] text-void/45">
                        {photographer.role}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </FadeIn>

        {/* ── Divider ── */}
        <div className="px-6 md:px-12 lg:px-20 xl:px-28">
          <div className="border-t border-void/8" />
        </div>

        {/* ── Related articles ── */}
        <section className="px-6 md:px-12 lg:px-20 xl:px-28 py-16 md:py-24">
          <h2 className="font-display text-[28px] md:text-[32px] tracking-[0.01em] text-void mb-8 md:mb-12">
            Continue reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-8 gap-x-6 md:gap-x-8">
            {(() => {
              const allSlugs = Object.keys(articles);
              const currentSlug = slug;
              const otherSlugs = allSlugs.filter((s) => s !== currentSlug);
              const selected = otherSlugs.slice(0, 3);
              return selected.map((s) => {
                const a = articles[s];
                return { title: a.title, category: a.category, slug: s, image: a.heroImage };
              });
            })().map((related, i) => (
              <FadeIn key={related.title} delay={i * 150} variant="reveal">
              <Link
                href={`/journal/${related.slug}`}
                className="group block"
              >
                <div className="aspect-[4/5] bg-surface-raised rounded-xl overflow-hidden relative">
                  {related.image ? (
                    <img
                      src={related.image}
                      alt={related.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-cosmic-100/40 to-surface-raised" />
                  )}
                </div>
                <div className="mt-4 max-w-[90%]">
                  <span className="font-sans text-[12px] tracking-[0.08em] uppercase text-void/40">
                    {related.category}
                  </span>
                  <h3 className="mt-1.5 font-display text-[18px] md:text-[20px] leading-[1.25] text-void group-hover:text-void/70 transition-colors duration-300">
                    {related.title}
                  </h3>
                </div>
              </Link>
              </FadeIn>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
