// lib/data.ts

export const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "the-show", label: "The Show" },
  { id: "the-numbers", label: "The Numbers" },
  { id: "the-era", label: "The Era" },
  { id: "the-arc", label: "The Arc" },
  { id: "the-characters", label: "The Characters" },
  { id: "the-betrayal", label: "The Betrayal" },
  { id: "the-players", label: "The Players" },
  { id: "comparables", label: "Comparables" },
  { id: "media", label: "Media" },
  { id: "creators", label: "Creators" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = typeof SECTIONS[number]["id"];

export const CHARACTERS = [
  {
    name: "Kevin Koch",
    role: "The Parrot",
    image: "/images/koch.jpg",
    bio: "To his friends he was a wild man. Handsome, hilarious and athletic, Kevin dreamed of becoming a big leaguer. In 1979 he found another road to the majors: as the first-ever Pirate Parrot. His dance routines transformed him into a local celebrity over the '79 championship season, hosting contests, team events, private parties. But as the narcotics flowed freely through the locker room, Kevin's wild ride crashed when he found himself at the center of the drug ring — and was forced to make a decision that would haunt him for the rest of his life.",
  },
  {
    name: "Dale Shiffman",
    role: "The Photographer",
    image: "/images/shiffman.jpg",
    bio: "Kevin's lifelong best friend. Trying to find his niche after Vietnam, Dale became a photographer and rode Kevin's coattails into Pittsburgh's inner circle. But Shiffman discovered a faster route into the Pirates' sanctum: buying and distributing cocaine to players who wanted it, using Kevin as courier. Four years of small-time deals added up to 111 federal counts of drug trafficking. The worst day of his life was his arrest. The next day was worse: when he learned his best friend Kevin had worn the wire that sealed his fate.",
  },
  {
    name: "Kevin Connelly & Tommy Balzer",
    role: "The Repairmen",
    image: "/images/cocaine-seven-grid.jpg",
    bio: "Two air conditioning repairmen from Garfield, PA. Diehard fans who wanted proximity to their heroes. After Connelly met Rod Scurry on a double date, gram buys became quarter kilos. By 1983, Connelly was on the streets of Miami with $40k in cash closing deals for two keys. His greatest regret was bringing Balzer down with him.",
  },
  {
    name: "Shelby Greer",
    role: "The Trader",
    image: null,
    bio: "An oil and gas trader from Denver who met Dave Parker in first class on a flight to Miami. Soon Greer was Parker's go-to for cocaine, riding the team plane to visiting games. He carried himself like a high roller — but behind the scenes could barely pay rent on his one-bedroom apartment.",
  },
  {
    name: "Curtis Strong",
    role: "The Chef",
    image: null,
    bio: "A Philadelphia caterer whose cooking business became a front for east coast coke supply. Keith Hernandez and Lonnie Smith were among his highest-profile buyers. The only member of the Cocaine Seven who fought the charges in federal court.",
  },
  {
    name: 'Robert "Rav" McCue',
    role: "The Accountant / DJ",
    image: null,
    bio: 'Accountant by day, "DJ Ravishing Rob" by night. McCue always knew where to find blow and gladly supplied it to ballplayers. His reputation as the local connection landed him a ten-year federal sentence.',
  },
  {
    name: "Jeffry Mosco",
    role: "The Bartender",
    image: null,
    bio: "Bartender at Michael J's Sports Bar. Sold to players like Scurry and Milner from behind the counter or by delivery. Served four years for his involvement.",
  },
];

export const PLAYERS = [
  {
    name: "Dave Parker",
    number: "39",
    image: "/images/dave-parker.jpg",
    bio: "The 1978 National League MVP and dominant force of the Pittsburgh lumber company. Flamboyant and feared. Parker utilized his celebrity status to access cocaine freely. His involvement tainted a Hall of Fame career and kept him from Cooperstown.",
  },
  {
    name: "Rod Scurry",
    number: "P",
    image: "/images/rod-scurry.jpg",
    bio: "A soft-spoken left-handed phenom with one of the most devastating curveballs in baseball. His cocaine addiction spiraled from recreational use to in-game benders, passing out in the bullpen, and drug-induced paranoid psychosis. His tragic free-fall sparked the full FBI investigation.",
  },
  {
    name: "Dale Berra",
    number: "3B",
    image: "/images/dale-berra.jpg",
    bio: "Son of Hall-of-Fame legend Yogi Berra. Big personality, sports celebrity armor. Quick to bring out fans who could supply his habit, slow to reimburse them. His hard-partying ways brought public shame for his central role in the scandal.",
  },
  {
    name: "John Milner",
    number: "34",
    image: "/images/john-milner.jpg",
    bio: "A feared pinch hitter who hit 16 home runs and 60 RBIs off the bench in the '79 championship season. After meeting Curtis Strong in the clubhouse in 1980, Milner became a regular buyer. A local hero whose FBI role haunted his career forever.",
  },
];

export const COMPARABLES = [
  {
    title: "Boogie Nights",
    year: "1997",
    type: "Film",
    image: "/images/poster-boogie-nights.jpg",
  },
  {
    title: "Moneyball",
    year: "2011",
    type: "Film",
    image: "/images/poster-moneyball.jpg",
  },
  {
    title: "The Wolf of Wall Street",
    year: "2013",
    type: "Film",
    image: "/images/poster-wolf.jpg",
  },
  {
    title: "American Crime Story",
    year: "2016",
    type: "Series",
    image: "/images/poster-acs.jpg",
  },
];

export const MEDIA_LINKS = [
  {
    source: "HBO Real Sports with Bryant Gumbel",
    label: "Season 12, Episode 9 — Part 1",
    url: "https://www.youtube.com/watch?v=PbkCLFkhWls",
  },
  {
    source: "HBO Real Sports with Bryant Gumbel",
    label: "Season 12, Episode 9 — Part 2",
    url: "https://www.youtube.com/watch?v=WI8OfvGpUZg",
  },
  {
    source: "700 Club",
    label: "Dale Shiffman Interview",
    url: "https://www1.cbn.com/700club/dale-shiffman-got-caught-and-got-free",
  },
  {
    source: "Q Sports",
    label: "Dale Shiffman Feature",
    url: "https://www.youtube.com/watch?v=Qfzp8q0_abQ",
  },
  {
    source: "VICE",
    label: "Throwback Thursday: The Pittsburgh Drug Trials Bring War to MLB",
    url: "https://www.vice.com/en/article/the-pittsburgh-drug-trials",
  },
  {
    source: "ESPN 30 for 30",
    label: "The Pittsburgh Drug Trials",
    url: "https://www.imdb.com/title/tt2429054/",
  },
  {
    source: "Narratively",
    label: "The Cocaine Kings of the Pittsburgh Pirates",
    url: "https://narratively.com/the-cocaine-kings-of-the-pittsburgh-pirates/",
  },
  {
    source: "Book — Aaron Skirball",
    label: "The Pittsburgh Cocaine Seven: How a Ragtag Group of Fans Took the Fall for Major League Baseball",
    url: "https://www.amazon.com/Pittsburgh-Cocaine-Seven-Ragtag-Baseball/dp/1613749864",
  },
];

export const CREATORS = [
  {
    name: "Jake Shiffman",
    role: "Creator / Producer",
    image: "/images/jake-shiffman.jpg",
    bio: "Jake Shiffman is a producer and connector whose work spans SXSW, Coachella, and NBA All-Star Weekend, as well as commercial campaigns for brands including Body Armor. His lifelong mission: bringing to screen the story of his father, Dale Shiffman, from the Pittsburgh/MLB Drug Trials.",
  },
];
