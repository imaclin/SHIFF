# SHIFF Drama Sections Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add three new sections to the SHIFF pitch site — Impact Stats, Timeline, and The Betrayal — to dramatically increase emotional stakes for streaming execs and investors.

**Architecture:** Three new `components/sections/` files following the exact pattern of existing sections (Framer Motion `useInView` entrance animation, CSS variable colors, `section-anchor` class). Data layer change is minimal: three new entries in `SECTIONS` in `lib/data.ts`. `app/page.tsx` imports and inserts each at the correct position.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, CSS custom properties (`var(--color-*)`)

---

## File Map

| File | Action |
|------|--------|
| `lib/data.ts` | Add 3 entries to `SECTIONS` array |
| `components/sections/the-numbers.tsx` | Create — Impact Stats section |
| `components/sections/the-arc.tsx` | Create — Timeline 1979–1985 |
| `components/sections/the-betrayal.tsx` | Create — The Wire split panel |
| `app/page.tsx` | Import and insert 3 new sections |

---

## Task 1: Add New Sections to Data

**Files:**
- Modify: `lib/data.ts`

- [ ] **Step 1: Insert the 3 new section IDs into `SECTIONS`**

Open `lib/data.ts`. Replace the `SECTIONS` array with:

```typescript
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
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd ~/Documents/GitHub/SHIFF && npx tsc --noEmit
```

Expected: no errors. The `SectionId` type is derived from the array so it updates automatically.

- [ ] **Step 3: Commit**

```bash
git add lib/data.ts
git commit -m "feat: add the-numbers, the-arc, the-betrayal to SECTIONS"
```

---

## Task 2: Impact Stats Section

**Files:**
- Create: `components/sections/the-numbers.tsx`

- [ ] **Step 1: Create the component**

```typescript
// components/sections/the-numbers.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function TheNumbers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-numbers" className="section-anchor py-24 bg-[var(--color-surface)]">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp mb-10 block w-fit">The Injustice in Numbers</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {/* Top left — 111 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[var(--color-background)] p-10"
            >
              <div className="font-heading text-7xl md:text-8xl font-bold text-[var(--color-gold)] leading-none mb-4">
                111
              </div>
              <div className="text-[var(--color-foreground)]/50 text-xs uppercase tracking-widest leading-relaxed">
                Federal drug trafficking counts<br />against Dale Shiffman — one fan
              </div>
            </motion.div>

            {/* Top right — 20+ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[var(--color-background)] p-10"
            >
              <div className="font-heading text-7xl md:text-8xl font-bold text-[var(--color-foreground)] leading-none mb-4">
                20+
              </div>
              <div className="text-[var(--color-foreground)]/50 text-xs uppercase tracking-widest leading-relaxed">
                MLB players called to testify<br />under oath at federal trial
              </div>
            </motion.div>

            {/* Bottom full-width — 0 in gold */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="md:col-span-2 bg-[var(--color-gold)] p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div>
                <div className="font-heading text-7xl md:text-8xl font-bold text-black leading-none mb-4">
                  0
                </div>
                <div className="text-black/70 text-xs uppercase tracking-widest font-bold">
                  Player suspensions handed down
                </div>
              </div>
              <p className="text-black/80 text-lg md:text-xl italic font-body md:text-right md:max-w-xs leading-relaxed">
                &ldquo;The players walked.<br />The fans went to prison.&rdquo;
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd ~/Documents/GitHub/SHIFF && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/the-numbers.tsx
git commit -m "feat: add Impact Stats section (the-numbers)"
```

---

## Task 3: Timeline Section

**Files:**
- Create: `components/sections/the-arc.tsx`

- [ ] **Step 1: Create the component**

```typescript
// components/sections/the-arc.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MILESTONES = [
  {
    year: "1979",
    side: "left" as const,
    dotColor: "bg-[var(--color-gold)]",
    yearColor: "text-[var(--color-gold)]",
    event: "Pirates win the World Series. Kevin Koch debuts as the first-ever Pirate Parrot, transforming overnight into a Steel City celebrity.",
  },
  {
    year: "1980",
    side: "right" as const,
    dotColor: "bg-[var(--color-foreground)]/30",
    yearColor: "text-[var(--color-foreground)]",
    event: "The first gram changes hands. Dale Shiffman finds his way into the Pirates' inner circle — and discovers a faster route to stay there.",
  },
  {
    year: "1983",
    side: "left" as const,
    dotColor: "bg-[var(--color-foreground)]/30",
    yearColor: "text-[var(--color-foreground)]",
    event: "Kevin Connelly arrives in Miami with $40,000 cash. Two kilos. What started as backstage access has gone fully national.",
  },
  {
    year: "1984",
    side: "right" as const,
    dotColor: "bg-[var(--color-foreground)]/30",
    yearColor: "text-[var(--color-foreground)]",
    event: "Rod Scurry collapses in the bullpen from cocaine-induced psychosis. The FBI opens its investigation into the Pittsburgh drug ring.",
  },
  {
    year: "1985",
    side: "left" as const,
    dotColor: "bg-red-600",
    yearColor: "text-red-500",
    event: "Kevin wears the wire. Dale is arrested. The trial begins — 20+ players called to testify, the sports world paralyzed. Seven fans pay the price.",
  },
] as const;

export function TheArc() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-arc" className="section-anchor py-24 px-8 md:px-16 max-w-5xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="stamp mb-6 block w-fit">The Arc</span>
        <h2 className="font-heading text-5xl md:text-6xl font-bold text-[var(--color-foreground)] mb-16 leading-tight">
          RISE AND<br />
          <span className="text-[var(--color-gold)]">FALL</span>
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Spine — fades from gold to red */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, #FDB827 0%, #888 50%, #dc2626 100%)",
            }}
          />

          <div className="space-y-12">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: m.side === "left" ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className={`relative flex ${m.side === "left" ? "justify-end pr-[calc(50%+28px)]" : "justify-start pl-[calc(50%+28px)]"}`}
              >
                {/* Dot on spine */}
                <div
                  className={`absolute top-1.5 w-3 h-3 rounded-full ${m.dotColor} border-2 border-[var(--color-background)]`}
                  style={{ left: "calc(50% - 6px)" }}
                />

                <div className={m.side === "left" ? "text-right" : "text-left"}>
                  <div className={`font-heading text-2xl font-bold ${m.yearColor} mb-1`}>
                    {m.year}
                  </div>
                  <p className="text-[var(--color-foreground)]/65 text-sm leading-relaxed font-body max-w-xs">
                    {m.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd ~/Documents/GitHub/SHIFF && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/the-arc.tsx
git commit -m "feat: add Timeline section (the-arc)"
```

---

## Task 4: The Betrayal Section

**Files:**
- Create: `components/sections/the-betrayal.tsx`

- [ ] **Step 1: Create the component**

```typescript
// components/sections/the-betrayal.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function TheBetrayal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-betrayal" className="section-anchor bg-[var(--color-background)]">
      {/* Split photo panel */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 h-64 md:h-96"
      >
        {/* Kevin — left */}
        <div className="relative overflow-hidden">
          <Image
            src="/images/koch.jpg"
            alt="Kevin Koch"
            fill
            className="object-cover object-top"
            style={{ filter: "grayscale(0.2) contrast(1.1)" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
          {/* Divider */}
          <div className="absolute top-0 right-0 bottom-0 w-px bg-black" />
          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            <p className="font-heading text-[var(--color-gold)] font-bold text-base mb-1">Kevin Koch</p>
            <p className="text-[var(--color-foreground)]/60 text-xs uppercase tracking-widest leading-relaxed">
              Wore the wire.<br />Testified for the FBI.
            </p>
          </div>
        </div>

        {/* Dale — right */}
        <div className="relative overflow-hidden">
          <Image
            src="/images/shiffman.jpg"
            alt="Dale Shiffman"
            fill
            className="object-cover object-top"
            style={{ filter: "grayscale(0.5) contrast(0.9) brightness(0.7)" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            <p className="font-heading text-[var(--color-foreground)]/70 font-bold text-base mb-1">Dale Shiffman</p>
            <p className="text-[var(--color-foreground)]/40 text-xs uppercase tracking-widest leading-relaxed">
              111 federal counts.<br />Didn&apos;t know until arrest.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Prose block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-3xl mx-auto px-8 md:px-16 py-16 md:py-24"
      >
        <span className="stamp mb-8 block w-fit">The Wire</span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4 leading-tight">
          The worst day of Dale&apos;s life<br />was his arrest.
        </h2>
        <p className="text-[var(--color-gold)] font-heading font-bold text-2xl md:text-3xl mb-8">
          The next day was worse.
        </p>
        <p className="text-[var(--color-foreground)]/65 text-lg leading-relaxed font-body max-w-2xl">
          When he found out it was Kevin who wore the wire — Kevin who gave the testimony that sealed his fate — his best friend since childhood. They hadn&apos;t spoken for decades. Until the cameras started rolling.
        </p>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd ~/Documents/GitHub/SHIFF && npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/the-betrayal.tsx
git commit -m "feat: add Betrayal section (the-betrayal)"
```

---

## Task 5: Wire Up page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx` with the updated version**

```typescript
// app/page.tsx
import { Sidebar } from "@/components/sidebar";
import { Hero } from "@/components/sections/hero";
import { TheShow } from "@/components/sections/the-show";
import { TheNumbers } from "@/components/sections/the-numbers";
import { TheEra } from "@/components/sections/the-era";
import { TheArc } from "@/components/sections/the-arc";
import { TheCharacters } from "@/components/sections/the-characters";
import { TheBetrayal } from "@/components/sections/the-betrayal";
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

      <main className="flex-1 ml-12">
        <Hero />
        <TheShow />
        <TheNumbers />
        <TheEra />
        <TheArc />
        <TheCharacters characters={CHARACTERS} />
        <TheBetrayal />
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

- [ ] **Step 2: Run full production build**

```bash
cd ~/Documents/GitHub/SHIFF && npm run build
```

Expected: build completes with no errors. One warning about `metadataBase` is acceptable — it was present before this change.

- [ ] **Step 3: Spot check in dev server**

```bash
npm run dev
```

Open `http://localhost:3000`. Scroll through and verify:
- After "The Show": stats panel appears, gold `0` cell spans full width
- After "The Era": timeline appears, spine fades from gold at top to red at bottom, 1985 is in red
- Between "The Characters" and "The Players": split photo panel with Kevin (gold label) and Dale (dim label), prose block below with gold subheading

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire up the-numbers, the-arc, the-betrayal in page.tsx"
```
