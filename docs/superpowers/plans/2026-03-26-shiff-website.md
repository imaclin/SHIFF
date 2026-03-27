# SHIFF Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Design skills to apply:** Invoke `frontend-design:frontend-design`, `taste-skill`, and `shadcn` skills during implementation for visual quality.

**Goal:** Build a single-page Next.js pitch website for "SHIFF" — a scripted TV limited series about the Pittsburgh Pirates cocaine scandal — targeting network/streaming executives and investors.

**Architecture:** Single scrolling page (`app/page.tsx`) composed of 9 section components. A fixed collapsible sidebar provides jump navigation. All content is typed in `lib/data.ts`. Images are extracted from the pitch deck PDFs and served from `public/images/`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Vercel deployment

---

## File Map

| File | Responsibility |
|------|---------------|
| `app/layout.tsx` | Root layout, font loading, metadata |
| `app/globals.css` | CSS variables (Pirates color tokens), grain texture, base resets |
| `app/page.tsx` | Composes all section components, passes data |
| `lib/data.ts` | All content as typed constants: characters, players, creators, media links |
| `components/sidebar.tsx` | Collapsible fixed-left sidebar with jump links and scroll spy |
| `components/sections/hero.tsx` | Full-viewport hero with title, logline, hook question |
| `components/sections/the-show.tsx` | Series premise, pull quote |
| `components/sections/the-era.tsx` | Split layout: text + archival photo collage |
| `components/sections/the-characters.tsx` | Kevin/Dale bios + Cocaine Seven card grid |
| `components/sections/the-players.tsx` | MLB stars cards + collapsible extended roster |
| `components/sections/comparables.tsx` | 4 comparable film/show posters |
| `components/sections/media.tsx` | Source material link list |
| `components/sections/creators.tsx` | Creator/producer photo + bio grid |
| `components/sections/contact.tsx` | Minimal contact with email link |
| `public/images/` | All images extracted from PDFs |

---

## Task 1: Extract Images from PDFs

**Files:**
- Create: `public/images/` (populated with extracted images)

- [ ] **Step 1: Extract all images from both PDFs**

```bash
cd ~/Downloads
mkdir -p shiff-images

# Extract from Powdered Dreams deck
pdfimages -all "Powdered Dreams Pitch Deck 02-2024.pdf" shiff-images/pd

# Extract from KOSC deck
pdfimages -all "KOSC pitch deck.pdf" shiff-images/kosc
```

If `pdfimages` is not installed:
```bash
brew install poppler
```

- [ ] **Step 2: Review extracted images, keep the best versions**

```bash
open shiff-images/
```

Review and rename the keepers. Target images:
- `hero-celebration.jpg` — 1979 Pirates celebration (full spread)
- `parrot-crowd.jpg` — Pirate Parrot with crowd
- `koch.jpg` — Kevin Koch portrait
- `shiffman.jpg` — Dale Shiffman portrait (Vietnam era)
- `cocaine-seven-grid.jpg` — mugshot newspaper grid
- `shiffman-arrest.jpg` — Dale Shiffman arrest 1985
- `koch-shiffman-reunion.jpg` — Koch and Shiffman together (recent)
- `dave-parker.jpg` — baseball card/photo
- `rod-scurry.jpg`
- `dale-berra.jpg`
- `john-milner.jpg`
- `poster-boogie-nights.jpg`
- `poster-moneyball.jpg`
- `poster-wolf.jpg`
- `poster-acs.jpg`
- `algee-smith.jpg`
- `jake-shiffman.jpg`
- `cocaine-home-plate.jpg` — the gold-toned home plate cocaine image

- [ ] **Step 3: Copy renamed images to project**

```bash
cp shiff-images/[selected files] ~/Documents/GitHub/SHIFF/public/images/
```

- [ ] **Step 4: Commit**

```bash
cd ~/Documents/GitHub/SHIFF
git add public/images/
git commit -m "feat: add extracted pitch deck images"
```

---

## Task 2: Initialize Next.js Project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`

- [ ] **Step 1: Initialize Next.js with TypeScript and Tailwind**

```bash
cd ~/Documents/GitHub/SHIFF
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=no --import-alias="@/*" --yes
```

If prompted about existing files, choose to merge/keep existing.

- [ ] **Step 2: Initialize shadcn**

```bash
npx shadcn@latest init
```

When prompted:
- Style: Default
- Base color: Neutral
- CSS variables: Yes

- [ ] **Step 3: Install Framer Motion**

```bash
npm install framer-motion
```

- [ ] **Step 4: Add required shadcn components**

```bash
npx shadcn@latest add sheet card separator badge
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```

Open `http://localhost:3000` — should see default Next.js page. No errors in terminal.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: initialize Next.js project with shadcn and Framer Motion"
```

---

## Task 3: Theme Tokens and Global Styles

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Set CSS variables in globals.css**

Replace the contents of `app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 10 10 10;           /* #0a0a0a */
    --foreground: 255 255 255;        /* #ffffff */
    --gold: 253 184 39;               /* #FDB827 Pittsburgh Pirates gold */
    --cream: 176 168 138;             /* #b0a88a muted cream */
    --surface: 20 20 20;             /* #141414 */
    --border: 42 42 42;              /* #2a2a2a */
    --sidebar-width: 240px;
    --sidebar-collapsed: 48px;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: rgb(var(--background));
    color: rgb(var(--foreground));
    font-family: var(--font-body);
    overflow-x: hidden;
  }

  /* Grain texture overlay */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 128px 128px;
  }
}

/* Stamp / evidence label style */
.stamp {
  @apply inline-block uppercase tracking-widest text-xs font-bold px-2 py-1 border;
  color: rgb(var(--gold));
  border-color: rgb(var(--gold));
  opacity: 0.85;
}

/* Section anchor offset for sidebar nav */
.section-anchor {
  scroll-margin-top: 2rem;
}
```

- [ ] **Step 2: Extend Tailwind config with custom tokens**

Replace `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        gold: "rgb(var(--gold) / <alpha-value>)",
        cream: "rgb(var(--cream) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

- [ ] **Step 3: Configure fonts in layout.tsx**

```typescript
// app/layout.tsx
import type { Metadata } from "next";
import { Zilla_Slab, Inter } from "next/font/google";
import "./globals.css";

const heading = Zilla_Slab({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-heading",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "SHIFF",
  description: "The story of the Pittsburgh Cocaine Seven. A scripted limited series.",
  openGraph: {
    title: "SHIFF",
    description: "The true story of the Pittsburgh Cocaine Seven.",
    images: ["/images/hero-celebration.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${heading.variable} ${body.variable} bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify no build errors**

```bash
npm run dev
```

Expected: compiles without errors, page loads.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add Pirates color theme tokens and fonts"
```

---

## Task 4: Content Data File

**Files:**
- Create: `lib/data.ts`

- [ ] **Step 1: Create the content data file**

```typescript
// lib/data.ts

export const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "the-show", label: "The Show" },
  { id: "the-era", label: "The Era" },
  { id: "the-characters", label: "The Characters" },
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
    bio: "To his friends he was a wild man. Handsome, hilarious and athletic, Kevin dreamed of becoming a big leaguer. In 1979 he found another road to the majors: as the first-ever Pirate Parrot. His dance routines transformed him into a local celebrity over the '79 championship season. But as the narcotics flowed freely through the locker room, Kevin's wild ride crashed when he found himself at the center of the drug ring — and was forced to make a decision that would haunt him for the rest of his life.",
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
    name: "Algee Smith",
    role: "Creator",
    image: "/images/algee-smith.jpg",
    bio: "Algee Smith can be seen in HBO's Euphoria opposite Zendaya. He relocated from Atlanta to Los Angeles in 2016 and within 30 days booked the role of Ralph Tresvant in BET's highest-rated miniseries, The New Edition Story. That role led to Detroit, earning him an NAACP Best Actor nomination, and roles in The Hate U Give and Judas and the Black Messiah opposite Daniel Kaluuya and Lakeith Stanfield.",
  },
  {
    name: "Jake Shiffman",
    role: "Creator / Producer",
    image: "/images/jake-shiffman.jpg",
    bio: "Jake Shiffman is a producer and connector whose work spans SXSW, Coachella, and NBA All-Star Weekend, as well as commercial campaigns for brands including Body Armor. His lifelong mission: bringing to screen the story of his father, Dale Shiffman, from the Pittsburgh/MLB Drug Trials.",
  },
  {
    name: "Brian Leavell",
    role: "Executive Producer",
    image: null,
    bio: "Writer/director and head writer on A&E's Duck Dynasty, with additional credits for Discovery and Red Bull TV. After securing the rights to The Pittsburgh Cocaine Seven book, Brian spent months conducting over 20 hours of interviews with Kevin Koch and Dale Shiffman. Currently prepping his feature directorial debut, Dogs of Nowhere. Represented by The Gersh Agency.",
  },
  {
    name: "Noah Rosenberg",
    role: "Executive Producer",
    image: null,
    bio: "Founder of Narratively, an award-winning storytelling platform and production company. A recipient of TIME's 50 Best Websites, winner of multiple Webbys and Tellys. Narratively produces scripted and unscripted TV series and feature films with leading partners across Hollywood.",
  },
];
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add all content data for SHIFF site"
```

---

## Task 5: Sidebar Component

**Files:**
- Create: `components/sidebar.tsx`

- [ ] **Step 1: Create the sidebar**

```typescript
// components/sidebar.tsx
"use client";

import { useState, useEffect } from "react";
import { SECTIONS, SectionId } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id as SectionId);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* Backdrop on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <motion.aside
        animate={{ width: open ? 240 : 48 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full z-40 flex flex-col border-r border-border bg-surface overflow-hidden"
      >
        {/* Toggle button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center h-12 w-12 flex-shrink-0 text-gold hover:bg-white/5 transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        {/* Wordmark */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 pb-4 font-heading text-gold text-xl font-bold tracking-widest uppercase"
            >
              SHIFF
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gold rule */}
        <div className="mx-3 border-t border-gold/30" />

        {/* Nav links */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors whitespace-nowrap ${
                active === id
                  ? "text-gold"
                  : "text-cream/70 hover:text-foreground"
              }`}
            >
              {/* Active indicator dot */}
              <span
                className={`flex-shrink-0 w-1.5 h-1.5 rounded-full transition-colors ${
                  active === id ? "bg-gold" : "bg-transparent"
                }`}
              />
              <AnimatePresence>
                {open && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
```

- [ ] **Step 2: Verify no TypeScript errors**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sidebar.tsx
git commit -m "feat: add collapsible sidebar with scroll spy"
```

---

## Task 6: Page Shell and Scroll Offset

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Create the page shell**

```typescript
// app/page.tsx
import { Sidebar } from "@/components/sidebar";
import { Hero } from "@/components/sections/hero";
import { TheShow } from "@/components/sections/the-show";
import { TheEra } from "@/components/sections/the-era";
import { TheCharacters } from "@/components/sections/the-characters";
import { ThePlayers } from "@/components/sections/the-players";
import { Comparables } from "@/components/sections/comparables";
import { Media } from "@/components/sections/media";
import { Creators } from "@/components/sections/creators";
import { Contact } from "@/components/sections/contact";
import {
  CHARACTERS,
  PLAYERS,
  COMPARABLES,
  MEDIA_LINKS,
  CREATORS,
} from "@/lib/data";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main content offset by collapsed sidebar width */}
      <main className="flex-1 ml-12">
        <Hero />
        <TheShow />
        <TheEra />
        <TheCharacters characters={CHARACTERS} />
        <ThePlayers players={PLAYERS} />
        <Comparables comparables={COMPARABLES} />
        <Media links={MEDIA_LINKS} />
        <Creators creators={CREATORS} />
        <Contact />
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Create stub components for all sections so the page compiles**

For each of these files, create a minimal stub:

```typescript
// components/sections/hero.tsx
export function Hero() {
  return <section id="hero" className="section-anchor min-h-screen bg-background" />;
}
```

Repeat this stub pattern for: `the-show.tsx`, `the-era.tsx`, `the-characters.tsx`, `the-players.tsx`, `comparables.tsx`, `media.tsx`, `creators.tsx`, `contact.tsx` — each with their respective `id` matching `SECTIONS`.

- [ ] **Step 3: Verify dev server loads without errors**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: dark page, sidebar visible on left, no console errors.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx components/sections/
git commit -m "feat: add page shell with section stubs"
```

---

## Task 7: Hero Section

**Files:**
- Modify: `components/sections/hero.tsx`

- [ ] **Step 1: Implement Hero**

```typescript
// components/sections/hero.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section
      id="hero"
      className="section-anchor relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-celebration.jpg"
          alt="1979 Pittsburgh Pirates World Series celebration"
          fill
          priority
          className="object-cover object-center"
          style={{ filter: "brightness(0.35) sepia(0.3)" }}
        />
        {/* Gold tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="stamp mb-6 inline-block">A Scripted Limited Series</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-heading text-[12vw] md:text-[10rem] font-bold leading-none text-gold tracking-tight mb-4"
        >
          SHIFF
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-cream/80 text-lg md:text-xl uppercase tracking-widest mb-8"
        >
          The Story of the Pittsburgh Cocaine Seven
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-foreground/60 text-xl md:text-2xl italic font-body"
        >
          "How far would you go to hang out with your heroes?"
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

```bash
npm run dev
```

Open `http://localhost:3000`. Expected: full-viewport hero with darkened baseball photo, gold "SHIFF" title, logline, hook quote, scroll indicator.

- [ ] **Step 3: Commit**

```bash
git add components/sections/hero.tsx
git commit -m "feat: implement Hero section"
```

---

## Task 8: The Show Section

**Files:**
- Modify: `components/sections/the-show.tsx`

- [ ] **Step 1: Implement The Show**

```typescript
// components/sections/the-show.tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function TheShow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-show" className="section-anchor py-24 px-8 md:px-16 max-w-5xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="stamp mb-6 block w-fit">The Show</span>

        <h2 className="font-heading text-5xl md:text-7xl font-bold text-foreground mb-10 leading-tight">
          POWDERED<br />
          <span className="text-gold">DREAMS</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 text-foreground/80 text-lg leading-relaxed font-body">
          <div className="space-y-5">
            <p>
              <strong className="text-gold">SHIFF</strong> is a scripted limited series that tells the true story of Kevin Koch and his best friend Dale Shiffman — two blue-collar Pittsburgh guys whose lives were transformed by their proximity to the city's biggest baseball heroes.
            </p>
            <p>
              Set in the late '70s and early '80s, at the dawn of the mascot era in sports and the height of cocaine's grip on America, this series examines how Dale and Kevin and their fellow <strong className="text-foreground">"Pittsburgh Cocaine Seven"</strong> became drug-supplying pawns for celebrity athletes up and down the eastern seaboard.
            </p>
          </div>
          <div className="space-y-5">
            <p>
              Until the whole scheme blew up amid a shocking betrayal from within — resulting in a criminal trial that nearly paralyzed the sports world, and turned these local fans into collateral damage.
            </p>
            <blockquote className="border-l-2 border-gold pl-6 text-gold italic text-xl">
              "It's a tale of friendship, betrayal, crime and baseball. At its core, a story about fandom."
            </blockquote>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Scroll down past hero. Expected: dark editorial section with gold accents, two-column layout, pull quote.

- [ ] **Step 3: Commit**

```bash
git add components/sections/the-show.tsx
git commit -m "feat: implement The Show section"
```

---

## Task 9: The Era Section

**Files:**
- Modify: `components/sections/the-era.tsx`

- [ ] **Step 1: Implement The Era**

```typescript
// components/sections/the-era.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function TheEra() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-era" className="section-anchor py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Text */}
          <div>
            <span className="stamp mb-6 block w-fit">The Backdrop</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              70s &amp; 80s Era Sports,<br />
              <span className="text-gold">Drugs &amp; Nightlife</span><br />
              of Baseball's Worst Scandal
            </h2>
            <div className="space-y-4 text-foreground/75 text-lg leading-relaxed font-body">
              <p>
                The 1979 World Champion Pittsburgh Pirates were gods-among-men to the adoring fans of Steel City. In the pre-internet era, star players were cloaked in impenetrable coolness and mystery. To get into their inner circle meant to walk among titans.
              </p>
              <p>
                And thus, their fans gladly broke the law for a taste of that life.
              </p>
              <p>
                What began as backstage access would spiral into a federal drug conspiracy stretching from Pittsburgh to Miami — and a criminal trial that rocked the foundation of American sports forever.
              </p>
            </div>
          </div>

          {/* Photo collage */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-square rounded overflow-hidden col-span-2">
              <Image
                src="/images/hero-celebration.jpg"
                alt="1979 Pirates World Series celebration"
                fill
                className="object-cover object-center"
                style={{ filter: "grayscale(0.4) contrast(1.1)" }}
              />
            </div>
            <div className="relative aspect-square rounded overflow-hidden">
              <Image
                src="/images/parrot-crowd.jpg"
                alt="Pirate Parrot with crowd"
                fill
                className="object-cover"
                style={{ filter: "grayscale(0.3)" }}
              />
            </div>
            <div className="relative aspect-square rounded overflow-hidden">
              <Image
                src="/images/cocaine-home-plate.jpg"
                alt="Evidence"
                fill
                className="object-cover"
                style={{ filter: "sepia(0.5) contrast(1.2)" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Expected: split section, text left, photo grid right, gold headline accents.

- [ ] **Step 3: Commit**

```bash
git add components/sections/the-era.tsx
git commit -m "feat: implement The Era section"
```

---

## Task 10: The Characters Section

**Files:**
- Modify: `components/sections/the-characters.tsx`

- [ ] **Step 1: Implement The Characters**

```typescript
// components/sections/the-characters.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type Character = {
  name: string;
  role: string;
  image: string | null;
  bio: string;
};

export function TheCharacters({ characters }: { characters: Character[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [kevin, dale, ...rest] = characters;

  return (
    <section id="the-characters" className="section-anchor py-24 px-8 md:px-16 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="stamp mb-6 block w-fit">The Characters</span>
        <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-16 leading-tight">
          THE PARROT &amp;<br />
          <span className="text-gold">THE PHOTOGRAPHER</span>
        </h2>

        {/* Kevin and Dale — featured */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          {[kevin, dale].map((char) => (
            <div key={char.name} className="flex gap-6">
              {char.image && (
                <div className="relative w-24 h-32 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    className="object-cover object-top"
                    style={{ filter: "grayscale(0.3) contrast(1.1)" }}
                  />
                </div>
              )}
              <div>
                <p className="font-heading text-gold font-bold text-xl mb-1">{char.name}</p>
                <p className="text-cream/60 text-xs uppercase tracking-widest mb-3">{char.role}</p>
                <p className="text-foreground/70 text-sm leading-relaxed font-body">{char.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cocaine Seven */}
        <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-10">
          THE <span className="text-gold">COCAINE SEVEN</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((char, i) => (
            <motion.div
              key={char.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="bg-surface border-border hover:border-gold/40 transition-colors h-full">
                <CardContent className="p-5">
                  <p className="font-heading text-gold font-bold text-lg mb-1">{char.name}</p>
                  <p className="text-cream/50 text-xs uppercase tracking-widest mb-3">{char.role}</p>
                  <p className="text-foreground/65 text-sm leading-relaxed font-body">{char.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Expected: featured Kevin/Dale bios with photos, card grid for the other five.

- [ ] **Step 3: Commit**

```bash
git add components/sections/the-characters.tsx
git commit -m "feat: implement The Characters section"
```

---

## Task 11: The Players Section

**Files:**
- Modify: `components/sections/the-players.tsx`

- [ ] **Step 1: Implement The Players**

```typescript
// components/sections/the-players.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type Player = {
  name: string;
  number: string;
  image: string | null;
  bio: string;
};

export function ThePlayers({ players }: { players: Player[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-players" className="section-anchor py-24 bg-surface">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp mb-6 block w-fit">The Players</span>
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
            THE PITTSBURGH<br />
            <span className="text-gold">PIRATE PLAYERS</span>
          </h2>
          <p className="text-foreground/60 text-lg mb-16 font-body max-w-2xl">
            The 1979 World Champions were gods-among-men to the adoring fans of Steel City. Their fans gladly <strong className="text-foreground">broke the law</strong> for a taste of that life.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {players.map((player, i) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-background border-border hover:border-gold/40 transition-colors overflow-hidden">
                  {player.image && (
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        className="object-cover object-top"
                        style={{ filter: "grayscale(0.2) contrast(1.1) sepia(0.1)" }}
                      />
                      {/* Baseball card number badge */}
                      <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                        <span className="text-black font-heading font-bold text-xs">{player.number}</span>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-4">
                    <p className="font-heading text-gold font-bold text-base mb-2">{player.name}</p>
                    <p className="text-foreground/65 text-xs leading-relaxed font-body">{player.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <p className="text-cream/50 text-sm font-body">
            During the trial, <strong className="text-foreground/70">over 20 professional baseball players</strong> were called to testify. Not a single game suspension was handed to any player. The seven fans received over 30 years collectively in federal prison.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Expected: 4-column player card grid, baseball card aesthetic with gold number badges, stat note at bottom.

- [ ] **Step 3: Commit**

```bash
git add components/sections/the-players.tsx
git commit -m "feat: implement The Players section"
```

---

## Task 12: Comparables Section

**Files:**
- Modify: `components/sections/comparables.tsx`

- [ ] **Step 1: Implement Comparables**

```typescript
// components/sections/comparables.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type Comparable = {
  title: string;
  year: string;
  type: string;
  image: string;
};

export function Comparables({ comparables }: { comparables: Comparable[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="comparables" className="section-anchor py-24 px-8 md:px-16 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="stamp mb-6 block w-fit">Show Cross</span>
        <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4 leading-tight">
          IN THE SPIRIT OF
        </h2>
        <p className="text-foreground/60 text-lg mb-16 font-body max-w-2xl">
          Highly stylized, wildly popular. SHIFF is fueled by the same authenticity — a true story bigger than anything Hollywood could invent.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {comparables.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[2/3] rounded overflow-hidden mb-3 border border-border group-hover:border-gold/50 transition-colors">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="font-heading text-gold font-bold text-sm">{item.title}</p>
              <p className="text-cream/50 text-xs uppercase tracking-widest">{item.type} | {item.year}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Expected: 4 poster cards, hover zoom effect, gold labels.

- [ ] **Step 3: Commit**

```bash
git add components/sections/comparables.tsx
git commit -m "feat: implement Comparables section"
```

---

## Task 13: Media Section

**Files:**
- Modify: `components/sections/media.tsx`

- [ ] **Step 1: Implement Media**

```typescript
// components/sections/media.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

type MediaLink = {
  source: string;
  label: string;
  url: string;
};

export function Media({ links }: { links: MediaLink[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="media" className="section-anchor py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-8 md:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp mb-6 block w-fit">Source Material</span>
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-16 leading-tight">
            MEDIA &amp;<br />
            <span className="text-gold">PRESS COVERAGE</span>
          </h2>

          <div className="divide-y divide-border">
            {links.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex items-start justify-between gap-6 py-5 hover:bg-white/[0.02] -mx-4 px-4 rounded transition-colors"
              >
                <div>
                  <p className="text-cream/50 text-xs uppercase tracking-widest mb-1">{link.source}</p>
                  <p className="text-foreground/85 font-body group-hover:text-gold transition-colors">{link.label}</p>
                </div>
                <ExternalLink size={16} className="flex-shrink-0 text-cream/30 group-hover:text-gold transition-colors mt-1" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Expected: clean divided list, each row links externally, gold hover state.

- [ ] **Step 3: Commit**

```bash
git add components/sections/media.tsx
git commit -m "feat: implement Media section"
```

---

## Task 14: Creators Section

**Files:**
- Modify: `components/sections/creators.tsx`

- [ ] **Step 1: Implement Creators**

```typescript
// components/sections/creators.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type Creator = {
  name: string;
  role: string;
  image: string | null;
  bio: string;
};

export function Creators({ creators }: { creators: Creator[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="creators" className="section-anchor py-24 px-8 md:px-16 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="stamp mb-6 block w-fit">The Team</span>
        <h2 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-16 leading-tight">
          CREATORS &amp;<br />
          <span className="text-gold">PRODUCERS</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {creators.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                {person.image ? (
                  <div className="relative w-20 h-20 rounded overflow-hidden">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover object-top"
                      style={{ filter: "grayscale(0.2)" }}
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded bg-surface border border-border flex items-center justify-center">
                    <span className="font-heading text-gold text-2xl font-bold">
                      {person.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="font-heading text-gold font-bold text-xl mb-1">{person.name}</p>
                <p className="text-cream/50 text-xs uppercase tracking-widest mb-3">{person.role}</p>
                <p className="text-foreground/65 text-sm leading-relaxed font-body">{person.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Expected: 2-column grid, photo or initial fallback, name in gold, role label, bio.

- [ ] **Step 3: Commit**

```bash
git add components/sections/creators.tsx
git commit -m "feat: implement Creators section"
```

---

## Task 15: Contact Section

**Files:**
- Modify: `components/sections/contact.tsx`

- [ ] **Step 1: Implement Contact**

```typescript
// components/sections/contact.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-anchor py-32 bg-surface border-t border-border">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto px-8 text-center"
      >
        <h2 className="font-heading text-6xl md:text-8xl font-bold text-gold mb-6 tracking-tight">
          SHIFF
        </h2>
        <p className="text-cream/50 uppercase tracking-widest text-sm mb-8">
          A Scripted Limited Series
        </p>
        <div className="border-t border-border pt-8">
          <p className="text-foreground/50 text-sm mb-3">For inquiries</p>
          <a
            href="mailto:jakeshiffman@gmail.com"
            className="font-heading text-gold text-xl hover:text-foreground transition-colors"
          >
            jakeshiffman@gmail.com
          </a>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify in browser**

Expected: minimal centered contact block, gold email link.

- [ ] **Step 3: Commit**

```bash
git add components/sections/contact.tsx
git commit -m "feat: implement Contact section"
```

---

## Task 16: Polish, Responsive, and Final QA

**Files:**
- Modify: `app/globals.css`, various section components as needed

- [ ] **Step 1: Mobile sidebar**

In `components/sidebar.tsx`, ensure on small screens the sidebar starts closed and the toggle is accessible. Verify on 375px viewport width.

- [ ] **Step 2: Main content mobile padding**

In `app/page.tsx`, update `ml-12` to account for sidebar on mobile. Verify no horizontal overflow on iPhone-sized viewport.

- [ ] **Step 3: Run full visual review**

```bash
npm run dev
```

Walk through every section at desktop (1440px) and mobile (375px). Check:
- No content overflow
- All images load (or gracefully fail with alt text)
- Sidebar opens/closes smoothly
- Jump links scroll to correct sections
- Active sidebar link tracks scroll position
- All external media links open in new tab
- Email link in contact opens mail client

- [ ] **Step 4: Run build**

```bash
npm run build
```

Expected: build completes with no errors. Note any warnings and fix TypeScript or missing image errors.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: polish, responsive fixes, final QA"
```

---

## Task 17: Deploy to Vercel

**Files:**
- No code changes required

- [ ] **Step 1: Push to GitHub**

```bash
git remote add origin https://github.com/<your-org>/SHIFF.git
git push -u origin main
```

- [ ] **Step 2: Deploy via Vercel MCP or CLI**

Option A — via Vercel MCP (if configured in session):
Use the `deploy_to_vercel` tool pointing at `~/Documents/GitHub/SHIFF`.

Option B — via CLI:
```bash
npx vercel --prod
```

Follow prompts: link to existing or new project, set root directory to `.`, confirm Next.js auto-detected.

- [ ] **Step 3: Verify live URL**

Open the deployed URL. Confirm:
- Hero loads with background image
- Sidebar visible and functional
- All sections render
- No console errors

- [ ] **Step 4: Commit deployment config if Vercel created `vercel.json`**

```bash
git add vercel.json 2>/dev/null || true
git commit -m "chore: add Vercel deployment config" 2>/dev/null || echo "nothing to commit"
git push
```

---

## Notes

- **No automated test suite** is included. This is a static pitch website with no logic to unit test. Visual QA in the browser at each step is the verification method.
- **Images with `null` in data.ts** fall back to an initial-letter placeholder. Replace with real images as they become available.
- **Media link URLs** in `lib/data.ts` are best-guess URLs from the pitch deck references. Verify each link is live before final deployment and update any that are broken.
- **taste-skill and shadcn skill** should be invoked during implementation for visual refinement beyond this baseline.
