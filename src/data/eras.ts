export interface EraEvent {
  title: string;
  detail: string;
}

export type EmblemId =
  | "ankh"
  | "laurel"
  | "eagle"
  | "seal"
  | "cathedral"
  | "raven"
  | "press"
  | "prism"
  | "cannon"
  | "trench"
  | "atom"
  | "wall"
  | "ring"
  | "persia"
  | "radar"
  | "pin"
  | "relativity"
  | "bookburn";

export type GroupId = "antiquity" | "medieval" | "enlighten" | "modern" | "future";

export interface Era {
  id: string;
  year: number; // negative = BCE
  yearLabel: string;
  short: string; // compact label for the dial
  name: string;
  group: GroupId;
  epoch: string;
  location: string;
  tagline: string;
  description: string;
  status: string;
  fonts: { display: string; body: string };
  palette: {
    bg: string;
    bg2: string;
    ink: string;
    accent: string;
    accent2: string;
    muted: string;
  };
  particle: { color: string; drift: "up" | "down" };
  danger: 1 | 2 | 3 | 4 | 5;
  figure?: { name: string; role: string; note: string };
  memorial?: boolean;
  events: EraEvent[];
  facts: string[];
  stats: { label: string; value: string }[];
  image?: string;
  backdrop?: string;
  emblem: EmblemId;
  signal: string; // viewport telemetry quality
  confidence: string;
}

export const GROUPS: { id: GroupId; label: string }[] = [
  { id: "antiquity", label: "Antiquity" },
  { id: "medieval", label: "Medieval" },
  { id: "enlighten", label: "Renaissance & Reason" },
  { id: "modern", label: "Modern" },
  { id: "future", label: "Beyond" },
];

const GARAMOND = '"EB Garamond", Georgia, serif';
const GROTESK = '"Space Grotesk", system-ui, sans-serif';
const CINZEL = '"Cinzel", serif';
const MARCELLUS = '"Marcellus", serif';
const PLAYFAIR = '"Playfair Display", Georgia, serif';

export const ERAS: Era[] = [
  /* ------------------------------- ANTIQUITY ------------------------------- */
  {
    id: "egypt",
    year: -3000,
    yearLabel: "3000 BCE",
    short: "3000 BC",
    name: "The First Kingdoms",
    group: "antiquity",
    epoch: "Bronze Age · Nile Valley",
    location: "Memphis, Egypt",
    tagline: "Where time itself got paperwork.",
    description:
      "You materialize on the banks of the Nile as the first pharaohs stitch two lands into a single kingdom. Scribes are pressing reeds into clay to count the harvest — and in doing so, they quietly invent history.",
    status: "Sunblock not yet invented",
    fonts: { display: CINZEL, body: GARAMOND },
    palette: { bg: "#171008", bg2: "#241a0d", ink: "#efe3c2", accent: "#d9a441", accent2: "#4a77c4", muted: "#93805a" },
    particle: { color: "#e8c877", drift: "down" },
    danger: 1,
    events: [
      { title: "Two crowns become one", detail: "Narmer's successors rule a newly unified Egypt from Memphis — the largest city on Earth, home to some 30,000 people." },
      { title: "Writing is born", detail: "Scribes in Sumer and Egypt turn pictures into script. Bureaucracy arrives, and with it, everything we will ever know about anyone." },
      { title: "The wheel gets a job", detail: "Mesopotamian potters have been spinning it for centuries. Within a few hundred years it will move chariots — and empires." },
    ],
    facts: [
      "Beer was currency, breakfast, and medicine — all three before noon.",
      "The Great Pyramid is still about 450 years away. Patience.",
      "Doctors specialized: there was already a 'shepherd of the anus'.",
    ],
    stats: [
      { label: "World population", value: "≈ 14 million" },
      { label: "Dominant tech", value: "Copper · sail · script" },
      { label: "Local time", value: "Rising of Sopdet" },
    ],
    image: "images/era-egypt.jpg",
    emblem: "ankh",
    signal: "Optical feed nominal",
    confidence: "Historical record: solid",
  },
  {
    id: "persia",
    year: -539,
    yearLabel: "539 BCE",
    short: "539 BC",
    name: "The King of Kings",
    group: "antiquity",
    epoch: "Achaemenid Empire · Persia",
    location: "Babylon, on the Euphrates",
    tagline: "An empire the size of a continent, run by mail.",
    description:
      "October 539 BCE: the gates of Babylon open without a battle, and Cyrus the Great rides in. He will send exiled peoples home, issue the clay cylinder scholars still debate as an early charter of rights, and bind an empire from the Indus to the Aegean with a road so fast its couriers become legend.",
    status: "Royal courier passing — step aside",
    fonts: { display: '"Cinzel", serif', body: GARAMOND },
    palette: { bg: "#120f07", bg2: "#1e1a0e", ink: "#f2e8cf", accent: "#e0b24c", accent2: "#2fa8a0", muted: "#8a7f5c" },
    particle: { color: "#58c4b8", drift: "up" },
    danger: 2,
    figure: {
      name: "Cyrus the Great",
      role: "King of Kings · founder of the Achaemenid Empire",
      note: "Took Babylon without a siege, freed the exiled peoples held there, and left behind a clay cylinder that is still argued over as one of the earliest statements of tolerant rule. He governs the largest empire the world has yet seen, largely by leaving people's gods alone.",
    },
    events: [
      { title: "Babylon opens its gates", detail: "The Neo-Babylonian empire falls almost bloodlessly. Cyrus's cylinder decree — restoring temples and returning exiled peoples — will be argued over for 2,500 years." },
      { title: "The world's first superhighway", detail: "The Royal Road runs 2,700 km from Susa to Sardis with 111 relay stations. Herodotus: 'Neither snow nor rain nor heat nor gloom of night stays these couriers.'" },
      { title: "An empire of many gods", detail: "Unlike the Assyrians before him, Cyrus lets subject peoples keep their temples and their gods. The exiled Jews return to Jerusalem under his edict." },
    ],
    facts: [
      "The gold daric becomes the first coin accepted from India to Greece.",
      "On foot, Susa to Sardis took 90 days. The royal post did it in seven.",
      "Persepolis doesn't exist yet — Darius starts it around 518 BCE.",
    ],
    stats: [
      { label: "World population", value: "≈ 100 million" },
      { label: "Dominant tech", value: "Qanats · Royal Road · coinage" },
      { label: "Local time", value: "Sun over Babylon" },
    ],
    image: "https://images.pexels.com/photos/7760097/pexels-photo-7760097.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    emblem: "persia",
    signal: "Optical feed nominal",
    confidence: "Historical record: solid",
  },
  {
    id: "rome",
    year: -44,
    yearLabel: "44 BCE",
    short: "44 BC",
    name: "The Ides of March",
    group: "antiquity",
    epoch: "Late Republic · Roma",
    location: "Forum Romanum, Rome",
    tagline: "The most dangerous senate meeting in history.",
    description:
      "Marble scaffolding, a million-person city, and a dictator for life. Arrive in early March and you can watch the senators sharpen their smiles — Julius Caesar has roughly sixty days left.",
    status: "Political climate: stabby",
    fonts: { display: MARCELLUS, body: GARAMOND },
    palette: { bg: "#150b0a", bg2: "#231110", ink: "#ead9c8", accent: "#c04a35", accent2: "#c9a86a", muted: "#8d7260" },
    particle: { color: "#d98f6e", drift: "down" },
    danger: 4,
    events: [
      { title: "A dictator for life", detail: "The Senate crowns Julius Caesar dictator perpetuo. The Republic wheezes; monarchists and republicans both reach for their daggers." },
      { title: "The Ides approach", detail: "A conspiracy of some sixty senators is quietly counting blades. On March 15, the Theatre of Pompey will echo with twenty-three wounds." },
      { title: "Cleopatra on the Tiber", detail: "The queen of Egypt holds court in Caesar's villa across the river, and Rome cannot stop gossiping about her golden barge." },
    ],
    facts: [
      "Traffic was so bad that daytime carts were banned inside the walls.",
      "Around 200,000 citizens lived on the free grain dole.",
      "Latin only — bring a tutor or a very confident shrug.",
    ],
    stats: [
      { label: "City population", value: "≈ 1 million" },
      { label: "Dominant tech", value: "Aqueducts · concrete · legions" },
      { label: "Local time", value: "Sixth hour, by sundial" },
    ],
    image: "images/era-rome.jpg",
    emblem: "laurel",
    signal: "Optical feed nominal",
    confidence: "Historical record: solid",
  },
  {
    id: "fall",
    year: 476,
    yearLabel: "476",
    short: "476",
    name: "The Long Dusk",
    group: "antiquity",
    epoch: "Late Antiquity · Italia",
    location: "Ravenna, Western Empire",
    tagline: "An empire ends not with a bang, but with a resignation letter.",
    description:
      "No trumpets, no final battle worth the name. A teenage emperor named Romulus Augustulus is pensioned off, the imperial regalia are shipped east to Constantinople, and the Roman West simply stops answering the door.",
    status: "Imperial switchboard unattended",
    fonts: { display: MARCELLUS, body: GARAMOND },
    palette: { bg: "#100d12", bg2: "#1b161f", ink: "#e4dbd0", accent: "#a8763f", accent2: "#6b6f9c", muted: "#7c7382" },
    particle: { color: "#c19a63", drift: "down" },
    danger: 4,
    events: [
      { title: "The last western emperor", detail: "September 4: Odoacer deposes Romulus Augustulus and declines the purple for himself. He rules Italy as king instead — the title was the only thing that died." },
      { title: "Regalia shipped east", detail: "The imperial insignia travel to Constantinople. The Eastern Empire will carry the name 'Roman' for another 977 years." },
      { title: "Kingdoms fill the map", detail: "Franks, Visigoths and Vandals carve out the successor states whose borders still faintly haunt Europe's maps." },
    ],
    facts: [
      "Nobody alive called it 'the fall'. Life mostly continued, with worse roads.",
      "Latin is fracturing into the dialects that will become French and Spanish.",
      "Ravenna's mosaics are being laid right now, and they still glitter today.",
    ],
    stats: [
      { label: "World population", value: "≈ 200 million" },
      { label: "Dominant tech", value: "Watermill · stirrup · mosaic" },
      { label: "Local time", value: "Bells of the basilica" },
    ],
    emblem: "eagle",
    image: "https://images.pexels.com/photos/12825635/pexels-photo-12825635.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    signal: "Optical feed nominal · archival",
    confidence: "Historical record: solid",
  },

  /* -------------------------------- MEDIEVAL -------------------------------- */
  {
    id: "magna",
    year: 1215,
    yearLabel: "1215",
    short: "1215",
    name: "The Great Charter",
    group: "medieval",
    epoch: "High Middle Ages · England",
    location: "Runnymede meadow, Surrey",
    tagline: "Sixty-three clauses that put a king under the law.",
    description:
      "A damp meadow beside the Thames, a furious king, and a ring of armored barons who have run out of patience. The document they force John to seal will be annulled within ten weeks — and outlive every one of them by eight centuries.",
    status: "Royal mood: extremely poor",
    fonts: { display: '"Pirata One", serif', body: GARAMOND },
    palette: { bg: "#0f1216", bg2: "#191e24", ink: "#e6e2d4", accent: "#c9a227", accent2: "#7b2f34", muted: "#7b8390" },
    particle: { color: "#dcbb4f", drift: "down" },
    danger: 3,
    events: [
      { title: "Magna Carta sealed", detail: "June 15: King John presses his seal into wax at Runnymede. Clause 39 — no free man imprisoned but by lawful judgment — never really goes away." },
      { title: "Annulled by the Pope", detail: "Innocent III voids the charter in August, calling it shameful. Civil war follows; the charter is reissued anyway, again and again." },
      { title: "The Fourth Lateran Council", detail: "In Rome, 1,200 clergy reshape the medieval church — confession becomes annual, and doctrine hardens across Europe." },
    ],
    facts: [
      "Only four original 1215 copies survive today.",
      "John never signed it — he sealed it. He may not have written well.",
      "Three clauses remain on the UK statute books to this day.",
    ],
    stats: [
      { label: "World population", value: "≈ 380 million" },
      { label: "Dominant tech", value: "Castle · crossbow · charter" },
      { label: "Local time", value: "Terce, by monastery bell" },
    ],
    emblem: "seal",
    image: "https://images.pexels.com/photos/18690576/pexels-photo-18690576.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    signal: "Optical feed nominal · archival",
    confidence: "Historical record: solid",
  },
  {
    id: "medieval",
    year: 1254,
    yearLabel: "1254",
    short: "1254",
    name: "Age of Faith & Steel",
    group: "medieval",
    epoch: "High Middle Ages · Europe",
    location: "Île de la Cité, Paris",
    tagline: "Cathedrals rising, Mongols riding, a boy named Marco is born.",
    description:
      "Paris smells of woodsmoke, ink, and ambition. Notre-Dame is still climbing into the sky, Thomas Aquinas is arguing in the schools, and far to the east the Mongol tide is about to turn the map inside out.",
    status: "Plague-free for 93 more years",
    fonts: { display: '"Pirata One", serif', body: GARAMOND },
    palette: { bg: "#0e1410", bg2: "#182019", ink: "#e8e0c8", accent: "#e2b13d", accent2: "#b04a3a", muted: "#7d8570" },
    particle: { color: "#f0c05e", drift: "up" },
    danger: 3,
    events: [
      { title: "Marco Polo is born", detail: "Venice welcomes the boy who will one day walk to China, serve a khan, and come home with the story that bends Europe's imagination." },
      { title: "Notre-Dame keeps climbing", detail: "Construction is 91 years old and the western towers are finally nearing completion. Flying buttresses are the cutting edge." },
      { title: "The Mongols turn west", detail: "Hulagu Khan marches on Baghdad with the largest Mongol army ever assembled. The caliphate has about four years left." },
    ],
    facts: [
      "A knight's full kit cost roughly the price of a small farm.",
      "University students debated in Latin while dodging chamber pots.",
      "Nobody in Europe had ever seen a potato. Sit with that.",
    ],
    stats: [
      { label: "World population", value: "≈ 400 million" },
      { label: "Dominant tech", value: "Longbow · windmill · Gothic vault" },
      { label: "Local time", value: "Vespers, by church bell" },
    ],
    image: "images/era-medieval.jpg",
    emblem: "cathedral",
    signal: "Optical feed nominal",
    confidence: "Historical record: solid",
  },
  {
    id: "plague",
    year: 1347,
    yearLabel: "1347",
    short: "1347",
    name: "The Great Mortality",
    group: "medieval",
    epoch: "Late Middle Ages · Mediterranean",
    location: "Harbour of Messina, Sicily",
    tagline: "Twelve galleys dock. Nobody should have let them in.",
    description:
      "October, Messina. Ships arrive from the Black Sea with crews already dying at the oars. Within four years the pestilence will take somewhere between a third and half of Europe — and reshape wages, faith and art forever.",
    status: "DO NOT DISEMBARK",
    fonts: { display: '"Pirata One", serif', body: GARAMOND },
    palette: { bg: "#0c0e0d", bg2: "#161a18", ink: "#ddd8cc", accent: "#8f9a5b", accent2: "#a33f33", muted: "#6e7570" },
    particle: { color: "#9aa86a", drift: "down" },
    danger: 5,
    events: [
      { title: "The galleys reach Messina", detail: "October: plague ships from Caffa unload cargo, rats and Yersinia pestis. The port expels them within days. It is already far too late." },
      { title: "Quarantine invented", detail: "Ragusa and Venice will soon impose a forty-day isolation — quaranta giorni — giving us both the practice and the word." },
      { title: "A labour shortage remakes Europe", detail: "With so many dead, surviving workers can finally bargain. Serfdom begins its long, grinding collapse." },
    ],
    facts: [
      "Physicians blamed bad air; the beaked masks come a while later.",
      "Some towns lost 60% of their people in a single summer.",
      "Boccaccio wrote the Decameron about Florentines fleeing this exact year.",
    ],
    stats: [
      { label: "World population", value: "≈ 440 million, falling fast" },
      { label: "Dominant tech", value: "Galley · quarantine · prayer" },
      { label: "Local time", value: "Compline, if anyone rings it" },
    ],
    emblem: "raven",
    image: "https://images.pexels.com/photos/4311150/pexels-photo-4311150.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    signal: "Optical feed nominal · archival",
    confidence: "Historical record: solid",
  },

  /* ------------------------- RENAISSANCE & REASON -------------------------- */
  {
    id: "press",
    year: 1450,
    yearLabel: "1450",
    short: "1450",
    name: "The Printing Press",
    group: "enlighten",
    epoch: "Renaissance · Rhineland",
    location: "Gutenberg's workshop, Mainz",
    tagline: "A goldsmith is about to make ideas uncontainable.",
    description:
      "In a rented Mainz workshop, Johannes Gutenberg is casting metal type in a hand mould and mixing an oil-based ink that will actually stick to it. Within fifty years, Europe will print twenty million books.",
    status: "Ink everywhere. Everywhere.",
    figure: {
      name: "Johannes Gutenberg",
      role: "Goldsmith · inventor of movable metal type",
      note: "His real breakthrough isn't the press — it's the adjustable hand mould that casts thousands of identical letters cheaply. He will be sued by his investor Johann Fust, lose the workshop and the Bibles, and die with almost nothing while his invention remakes the world.",
    },
    fonts: { display: '"Italiana", serif', body: GARAMOND },
    palette: { bg: "#12100c", bg2: "#1e1a14", ink: "#ece3d0", accent: "#b98f45", accent2: "#5a6b52", muted: "#8b8067" },
    particle: { color: "#cda75c", drift: "down" },
    danger: 1,
    events: [
      { title: "Movable type in metal", detail: "Gutenberg's real invention isn't the press — it's the adjustable hand mould that casts identical letters by the thousand, cheaply and fast." },
      { title: "The 42-line Bible begins", detail: "Around 180 copies are planned. Forty-nine survive today, and each is worth more than the building it sits in." },
      { title: "Constantinople's last years", detail: "Three years from now the city falls, and Greek scholars flee west with their libraries — straight into the arms of the Renaissance." },
    ],
    facts: [
      "A hand-copied Bible took a scribe over a year. The press did 180.",
      "Gutenberg was sued by his investor and lost his own workshop.",
      "Early printers imitated handwriting so buyers wouldn't feel cheated.",
    ],
    stats: [
      { label: "World population", value: "≈ 450 million" },
      { label: "Dominant tech", value: "Movable type · oil ink · rag paper" },
      { label: "Local time", value: "Guild bell, dawn shift" },
    ],
    emblem: "press",
    image: "https://images.pexels.com/photos/9017615/pexels-photo-9017615.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    signal: "Optical feed nominal · archival",
    confidence: "Historical record: solid",
  },
  {
    id: "renaissance",
    year: 1503,
    yearLabel: "1503",
    short: "1503",
    name: "The Rebirth",
    group: "enlighten",
    epoch: "High Renaissance · Florence",
    location: "A bottega, Firenze",
    tagline: "A Florentine has just started painting a certain smile.",
    description:
      "Florence runs on wool, gold, and nerve. Leonardo drags a poplar panel into his workshop to begin the Mona Lisa, Michelangelo has just finished David, and genius is treated as a contact sport.",
    status: "Genius density: critical",
    figure: {
      name: "Leonardo da Vinci",
      role: "Painter, engineer, anatomist · age 51",
      note: "Begins the portrait of Lisa del Giocondo this year and never quite finishes it — he carries the panel around for sixteen years, still adding glazes. His notebooks this decade include flying machines, heart valves, and a reminder to 'describe the tongue of the woodpecker'.",
    },
    fonts: { display: '"Italiana", serif', body: GARAMOND },
    palette: { bg: "#161009", bg2: "#231a10", ink: "#f0e6d0", accent: "#c99b3f", accent2: "#a04552", muted: "#93815f" },
    particle: { color: "#dcb56a", drift: "down" },
    danger: 2,
    events: [
      { title: "La Gioconda begins", detail: "Leonardo lays the first near-transparent glazes on a portrait of Lisa del Giocondo. He will keep tweaking it for sixteen years." },
      { title: "David stands guard", detail: "Michelangelo's four-ton marble giant is hauled to the Palazzo Vecchio and turns to glare at Rome. Florence approves." },
      { title: "A new St. Peter's", detail: "In Rome, Bramante unrolls his plan for a church so vast it will take 120 years and several popes to finish." },
    ],
    facts: [
      "Workshops smelled of egg yolk — that's the binder in tempera.",
      "Leonardo's to-do list included 'describe the tongue of the woodpecker'.",
      "One gold florin bought roughly a month of skilled labor.",
    ],
    stats: [
      { label: "World population", value: "≈ 460 million" },
      { label: "Dominant tech", value: "Oil glaze · press · perspective" },
      { label: "Local time", value: "Ave Maria bells" },
    ],
    image: "images/era-renaissance.jpg",
    emblem: "prism",
    signal: "Optical feed nominal",
    confidence: "Historical record: solid",
  },
  {
    id: "principia",
    year: 1687,
    yearLabel: "1687",
    short: "1687",
    name: "The Clockwork Cosmos",
    group: "enlighten",
    epoch: "Scientific Revolution · England",
    location: "Trinity College, Cambridge",
    tagline: "Three laws, one equation, and the sky stops being a mystery.",
    description:
      "A reclusive, difficult, brilliant man publishes Philosophiæ Naturalis Principia Mathematica. Apples, moons and comets turn out to obey the same rule — and for the first time, the universe becomes something you can calculate.",
    status: "Do not discuss alchemy with the author",
    figure: {
      name: "Isaac Newton",
      role: "Lucasian Professor of Mathematics, Cambridge",
      note: "Publishes the Principia this year — three laws and one equation that make the heavens calculable. Edmond Halley paid the printing costs personally. Newton writes more about alchemy and biblical chronology than about physics, and dislikes being contradicted about any of it.",
    },
    fonts: { display: PLAYFAIR, body: GARAMOND },
    palette: { bg: "#0b1014", bg2: "#141c22", ink: "#e5e6e2", accent: "#c8b273", accent2: "#4c7f8c", muted: "#74838c" },
    particle: { color: "#d9c489", drift: "up" },
    danger: 1,
    events: [
      { title: "The Principia is published", detail: "July: Newton lays out universal gravitation and the three laws of motion. Halley paid for the printing out of his own pocket." },
      { title: "Halley bets on a comet", detail: "Using Newton's maths, Halley predicts a comet's return in 1758. It arrives on schedule, sixteen years after he dies." },
      { title: "The age of instruments", detail: "Telescopes, barometers, pendulum clocks and microscopes are turning philosophy into measurement across Europe." },
    ],
    facts: [
      "Newton wrote more about alchemy and theology than about physics.",
      "The Principia is in Latin, and deliberately hard, to deter amateurs.",
      "His reflecting telescope was six inches long and beat metre-long rivals.",
    ],
    stats: [
      { label: "World population", value: "≈ 600 million" },
      { label: "Dominant tech", value: "Telescope · calculus · clock" },
      { label: "Local time", value: "Pendulum clock, ±10s a day" },
    ],
    emblem: "prism",
    image: "https://images.pexels.com/photos/11720316/pexels-photo-11720316.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    signal: "Optical feed nominal · archival",
    confidence: "Historical record: solid",
  },
  {
    id: "revolution",
    year: 1789,
    yearLabel: "1789",
    short: "1789",
    name: "The Revolution",
    group: "enlighten",
    epoch: "Age of Revolution · Paris",
    location: "Rue Saint-Antoine, Paris",
    tagline: "Liberty, equality, and a very bad year for bastilles.",
    description:
      "Bread is scarce, pamphlets are everywhere, and the summer air is electric. On July 14 a crowd will tear a fortress down stone by stone — and the modern world will arrive ahead of schedule.",
    status: "Mind your head. Literally.",
    fonts: { display: PLAYFAIR, body: GARAMOND },
    palette: { bg: "#0d1220", bg2: "#161d33", ink: "#ece4d4", accent: "#d3b251", accent2: "#c03a2e", muted: "#7c86a6" },
    particle: { color: "#c8b06a", drift: "down" },
    danger: 5,
    events: [
      { title: "Storming of the Bastille", detail: "July 14: the fortress-prison falls in a single afternoon of fury. Its stones will be carved into miniature replicas as souvenirs." },
      { title: "The Rights of Man", detail: "August 26: liberty, property, and resistance to oppression — written down, in public, for everyone. Monarchs everywhere feel a draft." },
      { title: "A new world next door", detail: "Across the Atlantic, George Washington takes the oath as the first U.S. president. Two revolutions, one loud year." },
    ],
    facts: [
      "In July, a loaf of bread cost close to a full day's wage.",
      "Blue-and-red cockades for Paris, white for the crown — soon tricolore.",
      "Dr. Guillotin's humane machine is still only a proposal. Breathe easy.",
    ],
    stats: [
      { label: "World population", value: "≈ 800 million" },
      { label: "Dominant tech", value: "Balloon · steam engine · press" },
      { label: "Local time", value: "Palais-Royal cannon, noon" },
    ],
    image: "images/era-revolution.jpg",
    emblem: "cannon",
    signal: "Optical feed nominal",
    confidence: "Historical record: solid",
  },

  /* --------------------------------- MODERN --------------------------------- */
  {
    id: "expo",
    year: 1889,
    yearLabel: "1889",
    short: "1889",
    name: "The Machine Age",
    group: "modern",
    epoch: "Belle Époque · Paris",
    location: "Champ de Mars, Paris",
    tagline: "A 300-metre iron tower just became the tallest thing ever built.",
    description:
      "Steam, gaslight, and swagger. The Exposition Universelle opens beneath Gustave Eiffel's impossible tower, Van Gogh paints a swirling sky in Provence, and the century audibly changes gears.",
    status: "Tower paint fumes: acceptable",
    fonts: { display: '"Abril Fatface", serif', body: GARAMOND },
    palette: { bg: "#130e08", bg2: "#1f1810", ink: "#f2e7cd", accent: "#e39b2d", accent2: "#2f8f83", muted: "#8f7d5e" },
    particle: { color: "#e9b45e", drift: "up" },
    danger: 1,
    events: [
      { title: "The Eiffel Tower opens", detail: "March 31: Gustave Eiffel climbs 1,710 steps to plant the tricolore at 300 metres. Parisians who called it a 'hollow candlestick' fall silent." },
      { title: "The world shows up", detail: "The Exposition Universelle draws 32 million visitors in six months — and Thomas Edison's phonograph parlours take their nickels." },
      { title: "A swirling sky", detail: "In June, from an asylum window in Saint-Rémy, Van Gogh paints The Starry Night. It sells for nothing. It is priceless." },
    ],
    facts: [
      "The tower was permitted to stand for only 20 years. Radio saved it.",
      "Edison's phonograph: five cents per listen, wonder included.",
      "Parisians nicknamed it 'the asparagus of sheet iron'.",
    ],
    stats: [
      { label: "World population", value: "≈ 1.6 billion" },
      { label: "Dominant tech", value: "Electric light · telephone · steel" },
      { label: "Local time", value: "Greenwich, spreading" },
    ],
    image: "images/era-1889.jpg",
    emblem: "prism",
    signal: "Optical feed nominal",
    confidence: "Historical record: solid",
  },
  {
    id: "einstein",
    year: 1905,
    yearLabel: "1905",
    short: "1905",
    name: "Einstein's Miracle Year",
    group: "modern",
    epoch: "Annus Mirabilis · Albert Einstein",
    location: "Federal Patent Office, Bern",
    tagline: "Albert Einstein, age 26, rewrites the universe on his lunch break.",
    description:
      "Albert Einstein has no academic post, no laboratory and no supervisor. He is a third-class examiner at the Swiss patent office, reviewing applications for electrical devices, and he has been rejected from every university job he ever applied for. In his spare hours across this single year he publishes four papers: one proves atoms are physically real, one shows light arrives in packets, one abolishes absolute time — and one, barely three pages long, notes almost in passing that E = mc². Physics never recovers.",
    status: "Do not distract the clerk at desk four",
    figure: {
      name: "Albert Einstein",
      role: "Patent examiner, third class · age 26",
      note: "Unemployed in academia, married to Mileva Marić, and about to publish the four papers that split physics into before and after. The Nobel comes sixteen years later — for the photoelectric effect, not relativity, which the committee still considered too radical to honour.",
    },
    fonts: { display: PLAYFAIR, body: GARAMOND },
    palette: { bg: "#0a0f1c", bg2: "#131b2e", ink: "#eef2fa", accent: "#e8c46a", accent2: "#6aa8e8", muted: "#6d7d99" },
    particle: { color: "#dbc98a", drift: "down" },
    danger: 1,
    events: [
      { title: "Special relativity", detail: "June: 'On the Electrodynamics of Moving Bodies' dissolves absolute time and space. It contains no citations — he wasn't following the literature, he was reasoning it out from first principles." },
      { title: "E = mc²", detail: "September: a three-page afterthought asks whether a body's inertia depends on its energy content. It does. Mass and energy turn out to be the same thing wearing different clothes." },
      { title: "Light comes in packets", detail: "March: the photoelectric effect paper proposes light behaves as quanta. This is the one that wins him the Nobel Prize in 1921 — relativity was still considered too radical to honour." },
    ],
    facts: [
      "He was rejected for every academic post he applied to. Every single one.",
      "Paper two, on Brownian motion, finally proved atoms physically exist.",
      "Max Planck read the relativity paper and became its first champion.",
    ],
    stats: [
      { label: "World population", value: "≈ 1.7 billion" },
      { label: "Author's age", value: "26 · patent clerk, third class" },
      { label: "Dominant tech", value: "Radio · X-ray · combustion engine" },
      { label: "Papers published", value: "4 — each one field-defining" },
    ],
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg",
    backdrop: "https://images.pexels.com/photos/6256066/pexels-photo-6256066.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    emblem: "relativity",
    signal: "Optical feed nominal · archival",
    confidence: "Historical record: solid",
  },
  {
    id: "greatwar",
    year: 1914,
    yearLabel: "1914",
    short: "1914",
    name: "The Lamps Go Out",
    group: "modern",
    epoch: "Great War · Europe",
    location: "Flanders, Western Front",
    tagline: "Home before the leaves fall, they said, in August.",
    description:
      "A wrong turn in Sarajevo, six weeks of telegrams, and a continent of railway timetables locks into war. By December, four hundred miles of trench run from the Channel to Switzerland — and on Christmas Eve, in places, the shooting stops for carols.",
    status: "Do not go over the top",
    fonts: { display: PLAYFAIR, body: GROTESK },
    palette: { bg: "#0e100e", bg2: "#181b18", ink: "#e0ded4", accent: "#b8443c", accent2: "#8b8f6a", muted: "#767a72" },
    particle: { color: "#b6b08a", drift: "down" },
    danger: 5,
    events: [
      { title: "Sarajevo, 28 June", detail: "A sandwich shop, a wrong turn, and two shots. Franz Ferdinand's death sets off alliance clauses drafted decades earlier." },
      { title: "The trenches are dug", detail: "After the Marne halts the German advance, both armies dig in. The line they scratch this autumn barely moves for three years." },
      { title: "The Christmas truce", detail: "December 25: men climb out unarmed, swap cigarettes and bury the dead between the wires. The generals make sure it never repeats." },
    ],
    facts: [
      "Wristwatches replaced pocket watches — you need both hands in a trench.",
      "Horses were still shipped to the front in the millions.",
      "Zips, stainless steel and blood banks all come out of this war.",
    ],
    stats: [
      { label: "World population", value: "≈ 1.8 billion" },
      { label: "Dominant tech", value: "Machine gun · aeroplane · radio" },
      { label: "Local time", value: "Zero hour, synchronised" },
    ],
    emblem: "trench",
    image: "https://images.pexels.com/photos/38872276/pexels-photo-38872276.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    signal: "Optical feed nominal · archival",
    confidence: "Historical record: solid",
  },
  {
    id: "reichstag",
    year: 1933,
    yearLabel: "1933",
    short: "1933",
    name: "Hitler's Fifty-Two Days",
    group: "modern",
    epoch: "Machtergreifung · Adolf Hitler",
    location: "The Reichstag, Berlin",
    tagline: "It did not arrive with tanks. It arrived with paperwork.",
    description:
      "The Authority keeps this stop open for one reason: to show the mechanism. In fifty-two days Adolf Hitler converts the office of Chancellor into a dictatorship — legally, on paper, through a parliament that votes away its own existence. His party never won a majority in a free election and never does. It does not need to. By May, books burn in Bebelplatz; among them are Albert Einstein's, who left in January and will never come home.",
    status: "Memorial stop · observe only · interference prohibited",
    figure: {
      name: "Adolf Hitler",
      role: "Chancellor from 30 January 1933 · appointed, not elected",
      note: "Handed power by President Hindenburg in a backroom deal brokered by conservatives who were certain they could control him. His party's best free-election result was 37.3%, and it had just lost seats. Within eight weeks he governs alone. Within twelve years he is responsible for the Holocaust and a war that kills sixty to eighty million people.",
    },
    fonts: { display: PLAYFAIR, body: GROTESK },
    palette: { bg: "#0c0b0d", bg2: "#16151a", ink: "#dedbd6", accent: "#b83a2e", accent2: "#7d8288", muted: "#63646a" },
    particle: { color: "#8e8b86", drift: "down" },
    danger: 5,
    events: [
      { title: "January 30 — Hitler is appointed", detail: "Hindenburg makes Hitler Chancellor through a backroom deal. Vice-Chancellor von Papen assures allies: 'In two months we'll have pushed him so far into a corner that he'll squeak.' Von Papen is wrong." },
      { title: "February 27 — the fire and the decree", detail: "The Reichstag burns. The next morning an emergency decree suspends free speech, free press, privacy and habeas corpus as a 'temporary' measure. It remains in force for twelve years." },
      { title: "March 23 — parliament abolishes itself", detail: "The Enabling Act passes 441 to 84, handing one man the power to write law alone. Only the Social Democrats vote against, in a chamber lined with armed paramilitaries. Dachau had opened the day before." },
    ],
    facts: [
      "May 10: some 25,000 books burn in this square — Einstein's among them.",
      "Einstein was lecturing abroad in January and renounced his citizenship in March.",
      "The memorial here today is a window in the ground, looking down at empty white shelves.",
    ],
    stats: [
      { label: "Days to dismantle a democracy", value: "52" },
      { label: "Nazi peak in a free vote", value: "37.3% · July 1932" },
      { label: "Enabling Act result", value: "441 for · 84 against" },
      { label: "Local time", value: "Curfew approaching" },
    ],
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/1938%20portrait%20photograph%20of%20Adolf%20Hitler.jpg?width=1900",
    backdrop: "https://images.pexels.com/photos/3054154/pexels-photo-3054154.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    memorial: true,
    emblem: "bookburn",
    signal: "Memorial feed · archival",
    confidence: "Historical record: solid",
  },
  {
    id: "worldwar2",
    year: 1939,
    yearLabel: "1939",
    short: "1939",
    name: "The Darkest Hour",
    group: "modern",
    epoch: "World War II · Global",
    location: "Warsaw, September 1",
    tagline: "Some years are not destinations. They are warnings.",
    description:
      "Dawn over Warsaw, and a war begins that will take sixty to eighty million lives — the deadliest conflict humanity has ever had. This stop is maintained by the Authority as a memorial, not an excursion: it is where hatred, industrialized, shows what the twentieth century was capable of. And where, in occupied cities and hidden rooms, ordinary people kept choosing courage anyway.",
    status: "Historical warning in effect — observe, do not interfere",
    fonts: { display: '"Playfair Display", Georgia, serif', body: GROTESK },
    palette: { bg: "#101014", bg2: "#191a20", ink: "#e4e2da", accent: "#c2372e", accent2: "#8a8f98", muted: "#6d7076" },
    particle: { color: "#9a9da4", drift: "down" },
    danger: 5,
    events: [
      { title: "September 1: Poland invaded", detail: "German forces cross the border at 4:45 a.m.; Britain and France declare war two days later. Within five weeks, a nation is partitioned and the old rules of war are gone." },
      { title: "The machinery of atrocity begins", detail: "Within years, the Holocaust will murder six million Jews and millions of Roma, disabled people and political prisoners in camps and shooting sites. Remembering this — precisely, and without flinching — is why this year is on the board." },
      { title: "And still, resistance", detail: "Teachers run underground schools, farmers hide their neighbours, pilots fly out of occupied Europe. The Warsaw Ghetto uprising is four years away, but the refusal to consent starts now." },
    ],
    facts: [
      "Radar and penicillin both scale up during this war — technology is never neutral.",
      "Codebreakers at Bletchley Park will shorten the war by years, in secret.",
      "By 1945 the war spans every continent except Antarctica.",
    ],
    stats: [
      { label: "World population", value: "≈ 2.3 billion" },
      { label: "Nations at war", value: "6 — and climbing fast" },
      { label: "Dominant tech", value: "Radar · Enigma · aircraft" },
      { label: "Local time", value: "Air-raid time" },
    ],
    image: "https://images.pexels.com/photos/36755827/pexels-photo-36755827.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    memorial: true,
    emblem: "radar",
    signal: "Memorial feed · archival",
    confidence: "Historical record: solid",
  },
  {
    id: "atomic",
    year: 1945,
    yearLabel: "1945",
    short: "1945",
    name: "The Atomic Dawn",
    group: "modern",
    epoch: "Year Zero · Global",
    location: "Jornada del Muerto, New Mexico",
    tagline: "5:29 a.m. The desert turns brighter than the sun.",
    description:
      "The longest war in history ends and a new kind of fear begins in the same summer. At Trinity the sky goes white; by autumn the United Nations has a charter and the world has a countdown it can never quite switch off.",
    status: "Radiological caution advised",
    fonts: { display: '"Righteous", sans-serif', body: GROTESK },
    palette: { bg: "#0a0c11", bg2: "#141821", ink: "#e8e9ee", accent: "#e0a13a", accent2: "#8c9fb5", muted: "#767f8f" },
    particle: { color: "#e6b45f", drift: "up" },
    danger: 5,
    events: [
      { title: "Trinity test", detail: "July 16: the first nuclear detonation lights the New Mexico desert. Oppenheimer later recalls a line from the Bhagavad Gita." },
      { title: "The war ends", detail: "May in Europe, August in the Pacific. Sixty to eighty million people are dead — the deadliest conflict humanity has ever had." },
      { title: "The United Nations is founded", detail: "October 24: fifty-one nations sign a charter written by people who had just watched the alternative." },
    ],
    facts: [
      "ENIAC, the first general-purpose computer, is being wired right now.",
      "Steel smelted before this year is still prized — it isn't irradiated.",
      "Penicillin production scaled from grams to tonnes in four years.",
    ],
    stats: [
      { label: "World population", value: "≈ 2.3 billion" },
      { label: "Dominant tech", value: "Fission · radar · jet engine" },
      { label: "Local time", value: "War time, one hour ahead" },
    ],
    emblem: "atom",
    image: "https://images.pexels.com/photos/12356447/pexels-photo-12356447.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    signal: "Optical feed nominal · archival",
    confidence: "Historical record: solid",
  },
  {
    id: "space",
    year: 1965,
    yearLabel: "1965",
    short: "1965",
    name: "The Space Age",
    group: "modern",
    epoch: "Mid-Century · Earth Orbit",
    location: "Low Earth Orbit",
    tagline: "A man just stepped outside his spacecraft. Nobody is sure it's safe.",
    description:
      "Transistors, tailfins, and a rocket on every magazine cover. Alexei Leonov floats outside Voskhod 2 on the first spacewalk, the Beatles record Rubber Soul, and the future feels like it will arrive on schedule.",
    status: "Orbital debris: negligible",
    fonts: { display: '"Righteous", sans-serif', body: GROTESK },
    palette: { bg: "#0b2027", bg2: "#12303a", ink: "#f4ead0", accent: "#e8702a", accent2: "#e5b93c", muted: "#6f8f96" },
    particle: { color: "#f0954e", drift: "up" },
    danger: 2,
    events: [
      { title: "First spacewalk", detail: "March 18: Alexei Leonov spends twelve minutes tethered to the void outside Voskhod 2. His suit balloons so much he barely fits back in." },
      { title: "Gemini races ahead", detail: "NASA stacks rendezvous on rendezvous in orbit. The Moon stops being a poem and becomes an engineering problem." },
      { title: "Rubber Soul sessions", detail: "In October, four lads from Liverpool push pop music past its edges. Your great-grandkids will still know the words." },
    ],
    facts: [
      "A computer's memory weighed more than you do.",
      "TV dinners were considered peak futurism.",
      "A 3-minute call to London cost about $10 — roughly $95 today.",
    ],
    stats: [
      { label: "World population", value: "≈ 3.3 billion" },
      { label: "Dominant tech", value: "Transistor · laser · Titan II" },
      { label: "Local time", value: "Network evening news" },
    ],
    image: "images/era-1965.jpg",
    emblem: "atom",
    signal: "Optical feed nominal",
    confidence: "Historical record: solid",
  },
  {
    id: "moon",
    year: 1969,
    yearLabel: "1969",
    short: "1969",
    name: "One Small Step",
    group: "modern",
    epoch: "Apollo Program · Mare Tranquillitatis",
    location: "Sea of Tranquility, the Moon",
    tagline: "Six hundred million people watch a man climb down a ladder.",
    description:
      "July 20. A computer with less memory than a birthday card guides two men to the lunar surface with seconds of fuel left. For a few hours, essentially everyone alive is looking at the same thing at the same time.",
    status: "Gravity: one sixth. Enjoy.",
    fonts: { display: '"Orbitron", sans-serif', body: GROTESK },
    palette: { bg: "#070809", bg2: "#121417", ink: "#eef1f3", accent: "#d8dde2", accent2: "#4d8de0", muted: "#767d86" },
    particle: { color: "#c8d2da", drift: "up" },
    danger: 3,
    events: [
      { title: "Eagle has landed", detail: "20:17 UTC: Armstrong flies past a boulder field manually and sets down with about 25 seconds of fuel remaining." },
      { title: "The 1202 alarm", detail: "The guidance computer flags an overload during descent. A 26-year-old in Houston says 'go' — because the software was built to shed low-priority tasks." },
      { title: "Woodstock and the ARPANET", detail: "Same year: half a million people in a muddy field, and the first message sent between two networked computers. It crashed after 'LO'." },
    ],
    facts: [
      "The flags, footprints and descent stages are all still up there.",
      "Nixon had a speech ready in case they couldn't get back off.",
      "The Apollo Guidance Computer ran at about 0.043 MHz.",
    ],
    stats: [
      { label: "World population", value: "≈ 3.6 billion" },
      { label: "Dominant tech", value: "Saturn V · integrated circuit" },
      { label: "Local time", value: "Mission elapsed time" },
    ],
    image: "images/era-moon.jpg",
    emblem: "atom",
    signal: "Optical feed nominal",
    confidence: "Historical record: solid",
  },
  {
    id: "wall",
    year: 1989,
    yearLabel: "1989",
    short: "1989",
    name: "The Year the Wall Fell",
    group: "modern",
    epoch: "End of the Cold War · Berlin",
    location: "Bornholmer Straße crossing, Berlin",
    tagline: "A press conference misread, and a border simply opens.",
    description:
      "November 9. A spokesman fumbles a question about travel rules and says the change applies 'immediately, without delay'. Thousands walk to the checkpoints. The guards, with no orders, lift the barriers — and the twentieth century turns a corner.",
    status: "Bring a hammer. Everyone else did.",
    fonts: { display: '"Space Grotesk", sans-serif', body: GROTESK },
    palette: { bg: "#0c1013", bg2: "#151b20", ink: "#e9edef", accent: "#f0592b", accent2: "#43b0c9", muted: "#77858c" },
    particle: { color: "#f0784e", drift: "up" },
    danger: 2,
    events: [
      { title: "The Wall opens", detail: "Bornholmer Straße lifts its barrier at 23:30. Within hours, people are dancing on concrete that had killed to cross for 28 years." },
      { title: "The Web is proposed", detail: "March: at CERN, Tim Berners-Lee submits a memo on information management. His boss writes 'vague but exciting' on the cover." },
      { title: "Voyager 2 passes Neptune", detail: "August: the last planetary encounter of the Grand Tour. Nothing built by us has been closer since." },
    ],
    facts: [
      "Chunks of the wall were sold as souvenirs within the week.",
      "There were about 100,000 websites — no, wait, zero. Not yet.",
      "The Game Boy launched this year and outlived the Cold War by decades.",
    ],
    stats: [
      { label: "World population", value: "≈ 5.2 billion" },
      { label: "Dominant tech", value: "PC · fax · satellite TV" },
      { label: "Local time", value: "CET, broadcast live" },
    ],
    emblem: "wall",
    image: "https://images.pexels.com/photos/12996469/pexels-photo-12996469.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    signal: "Optical feed nominal · archival",
    confidence: "Historical record: solid",
  },
  {
    id: "home",
    year: 2026,
    yearLabel: "2026",
    short: "2026",
    name: "Home — The Present",
    group: "modern",
    epoch: "Your anchor · Sol-3",
    location: "Exactly where you are sitting",
    tagline: "The strangest era of all: the one you're from.",
    description:
      "You can't really visit the present — you're standing in it — but the console keeps it on the board for perspective. 8.2 billion people, all convinced this is the normal year. It is the era of smartphones, mRNA vaccines, machines that write back, and the warmest decade in 125,000 years. Historians of 3123 will find it quaint, terrifying, and very, very busy.",
    status: "You live here. Act natural.",
    fonts: { display: '"Space Grotesk", sans-serif', body: GROTESK },
    palette: { bg: "#e9ece7", bg2: "#f5f7f2", ink: "#1a2522", accent: "#0e7a6d", accent2: "#2456a6", muted: "#6d7c76" },
    particle: { color: "#8fa8a0", drift: "down" },
    danger: 1,
    events: [
      { title: "8.2 billion, mostly online", detail: "More than two-thirds of humanity carries a connected computer. The sum of human knowledge fits in a pocket, along with the sum of human arguing." },
      { title: "The warmest years on record", detail: "The last decade is the hottest in 125,000 years. The decisions made in this exact era determine which of the next three stops — 2049, 2150, 3123 — you actually get." },
      { title: "Machines that write back", detail: "Generative AI drafts the emails, the laws and the love letters. Nobody has decided yet whether this is a tool, a colleague, or something else." },
    ],
    facts: [
      "Your phone has ~100,000× the compute of the Apollo 11 guidance computer.",
      "Everyone is from here. That's what makes it strange.",
      "Return tickets honored. You have one already.",
    ],
    stats: [
      { label: "World population", value: "≈ 8.2 billion" },
      { label: "Dominant tech", value: "Smartphone · LLM · mRNA" },
      { label: "Local time", value: "Your timezone, right now" },
    ],
    image: "https://images.pexels.com/photos/1269791/pexels-photo-1269791.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    emblem: "pin",
    signal: "Live feed · this is real",
    confidence: "Historical record: you are inside it",
  },

  /* --------------------------------- BEYOND --------------------------------- */
  {
    id: "near",
    year: 2049,
    yearLabel: "2049",
    short: "2049",
    name: "The Near Tomorrow",
    group: "future",
    epoch: "Projected · based on current trajectories",
    location: "Greater Rotterdam · North Sea Barrier Zone",
    tagline: "The hardest engineering project isn't fusion. It's keeping the ocean out.",
    description:
      "Twenty-three years from your anchor. Artemis Base Camp on the Moon has been permanently crewed since 2035. ITER's successor tokamak in France achieved net-positive fusion in 2040 and the first commercial plants are feeding coastal megacities. The global population has plateaued near 9.7 billion. Self-driving electric fleets replaced most private cars a decade ago. The big story isn't space — it's water: Rotterdam-class adaptive sea barriers now protect 23 delta cities, and climate migration has redrawn national borders you'd recognize.",
    status: "Sea level +38 cm since 2026",
    fonts: { display: '"Orbitron", sans-serif', body: GROTESK },
    palette: { bg: "#070d12", bg2: "#0e1820", ink: "#e6f2ee", accent: "#2fd6c3", accent2: "#f2e9d8", muted: "#5f7d86" },
    particle: { color: "#5ee8d6", drift: "up" },
    danger: 2,
    events: [
      { title: "Fusion breaks even, then profits", detail: "ITER proved the physics in 2035. By 2049 a dozen commercial tokamaks feed coastal grids — clean, dense power, but still expensive. Coal plants are museums." },
      { title: "Artemis Base Camp, year 14", detail: "A permanent crew of twelve rotates through a pressurized lunar-south-pole habitat. The first child conceived off-Earth was born here in 2046 — she's three." },
      { title: "The Great Retreat begins", detail: "Jakarta, Miami, and Lagos have each relocated millions inland. Adaptive barriers hold Rotterdam, Shanghai, and New York — for now. Climate migration is the defining political issue." },
    ],
    facts: [
      "Most people under 30 have never driven a car manually.",
      "AI drafts legislation, but a human still has to press 'enact'.",
      "Coffee is a luxury — arabica's viable range shrank 40% since your time.",
    ],
    stats: [
      { label: "World population", value: "≈ 9.7 billion (plateau)" },
      { label: "Global temp.", value: "+2.1 °C above pre-industrial" },
      { label: "Dominant tech", value: "Fusion · autonomous EV · CRISPR-3" },
      { label: "Mars status", value: "Crewed outpost, 6 rotational crew" },
    ],
    image: "https://images.pexels.com/photos/32660202/pexels-photo-32660202.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    emblem: "ring",
    signal: "Predictive model · 88% confidence",
    confidence: "Projection: 88%",
  },
  {
    id: "mid",
    year: 2150,
    yearLabel: "2150",
    short: "2150",
    name: "The Orbital Century",
    group: "future",
    epoch: "Extrapolated · based on trend analysis",
    location: "O'Neill Station 'Kepler' · Earth-Moon L5",
    tagline: "The first generation that thinks of Earth as a place you visit.",
    description:
      "A century and a quarter from your anchor. Fusion is cheap and ubiquitous. The first O'Neill cylinder habitats — kilometre-long rotating drums with artificial gravity, soil, weather, and rivers — orbit at the Earth-Moon Lagrange points. Population pressure on Earth has eased as roughly 400,000 people live off-world between the Moon, Mars, and the cylinders. Earth's climate has stabilized at +1.6 °C thanks to orbital solar shades and sixty years of aggressive carbon capture. The planet is slowly rewilding, but the politics of who owns orbital space dominate the century.",
    status: "Spin-gravity: 0.94 g · nominal",
    fonts: { display: '"Orbitron", sans-serif', body: GROTESK },
    palette: { bg: "#06090e", bg2: "#0d1320", ink: "#e8ecf4", accent: "#6b8cff", accent2: "#f0d76a", muted: "#5e6e8a" },
    particle: { color: "#7b9eff", drift: "up" },
    danger: 2,
    events: [
      { title: "O'Neill cylinders operational", detail: "Station 'Kepler', 1.2 km long, houses 12,000 residents in a rotating drum with soil, a river, and a 14-hour day-night cycle. Three more are under construction." },
      { title: "Mars declares self-governance", detail: "The Ares Compact — a constitutional framework drafted by 2,400 Martian residents — is ratified. Earth recognises it reluctantly. Trade tariffs follow." },
      { title: "Earth's climate stabilises", detail: "Orbital solar shades at L1, plus 60 years of industrial carbon capture, bring the global temperature back below +1.7 °C. Coral reefs are being re-seeded." },
    ],
    facts: [
      "Martian children are taller and weaker-boned — 0.38 g does that.",
      "O'Neill residents can see the opposite side of their world by looking up.",
      "The longest-lived human is 148. She still complains about the weather.",
    ],
    stats: [
      { label: "Earth population", value: "≈ 8.8 billion (declining)" },
      { label: "Off-world population", value: "≈ 400,000" },
      { label: "Dominant tech", value: "O'Neill hab · solar shade · AI gov" },
      { label: "Global temp.", value: "+1.6 °C (stabilised)" },
    ],
    image: "https://images.pexels.com/photos/7671972/pexels-photo-7671972.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    emblem: "ring",
    signal: "Extrapolated model · 54% confidence",
    confidence: "Extrapolation: 54%",
  },
  {
    id: "deep",
    year: 3123,
    yearLabel: "3123",
    short: "3123",
    name: "The Deep Future",
    group: "future",
    epoch: "Speculative · beyond reliable modelling",
    location: "Ring Habitat 'Meridian' · equatorial orbit",
    tagline: "History is a thousand years longer than you remember, and it still rhymes.",
    description:
      "Eleven centuries from your anchor — further than Rome is behind you. Any prediction this far out is fiction with footnotes, but the physics allows it: a Dyson swarm of solar collectors surrounds the inner system, powering thousands of O'Neill habitats. Earth's surface is mostly parkland, managed by autonomous rewilding systems. The 'planet' most humans identify with is whichever cylinder they were born in. Language, biology, and governance have all drifted into forms you would barely recognise — but they still argue about taxes and raise children who refuse to clean their rooms.",
    status: "Atmospheric composition: selectable",
    fonts: { display: '"Syncopate", sans-serif', body: GROTESK },
    palette: { bg: "#040a08", bg2: "#0a1712", ink: "#eafff1", accent: "#57e389", accent2: "#c9d98a", muted: "#4e7a63" },
    particle: { color: "#7deda8", drift: "up" },
    danger: 1,
    events: [
      { title: "The Dyson swarm at 60%", detail: "Automated mining of Mercury — proposed in theory as early as the 2020s — has converted roughly 18% of the planet's mass into solar collectors. The swarm captures 60% of the Sun's output." },
      { title: "Earth as heritage site", detail: "The planet's population is under 500 million by choice. Megacities have been deconstructed; forests, wetlands and grasslands have returned. Wolves patrol the ruins of old suburbs." },
      { title: "The Long Archive", detail: "Every text, image, genome and audio recording ever produced is stored in crystalline DNA vaults at Lagrange point 2 — a library designed to outlast the Sun." },
    ],
    facts: [
      "Baseline human lifespan is roughly 300 years, with opt-in senescence.",
      "Children still refuse to tidy their rooms. Some constants survive.",
      "The most popular sport involves zero-gravity acrobatics in a spinning drum.",
    ],
    stats: [
      { label: "Total human population", value: "≈ 14 billion, 90% off-world" },
      { label: "Earth surface pop.", value: "≈ 500 million (by choice)" },
      { label: "Dominant tech", value: "Dyson swarm · DNA vaults · hab rings" },
      { label: "Confidence", value: "Physics: plausible · sociology: unknown" },
    ],
    image: "https://images.pexels.com/photos/38777900/pexels-photo-38777900.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1600",
    emblem: "ring",
    signal: "Speculative render · 12% confidence",
    confidence: "Speculation: 12%",
  },
];

export const PRESENT_YEAR = 2026;

export const DANGER_LABELS = ["", "Stroll", "Curious", "Guarded", "Volatile", "Critical"];

export function formatYear(year: number): string {
  return year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;
}

/** Log-ish scale position (0–1) so the dial isn't 90% empty medieval space. */
export function dialPosition(index: number): number {
  return index / (ERAS.length - 1);
}
