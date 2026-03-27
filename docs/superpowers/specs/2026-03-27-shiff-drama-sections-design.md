# SHIFF Website — Drama Sections Design

**Date:** 2026-03-27
**Goal:** Add three new sections to the SHIFF pitch site to increase emotional impact and narrative stakes for network/streaming executives and investors.

---

## Overview

Three new sections are inserted into the existing single-page scroll, each targeting a different kind of gut punch: abstract injustice (stats), narrative arc (timeline), and personal betrayal (split panel). All three use the existing Pirates gold/dark color system and Framer Motion entrance animations.

---

## New Sections

### 1. Impact Stats — "The Injustice in Numbers"

**Position:** Between "The Show" (`the-show`) and "The Era" (`the-era`).
**Section ID:** `the-numbers`
**Sidebar label:** "The Numbers"

**Layout:** Full-width dark panel (`bg-surface`). Two rows in a 2-column grid with no gaps between cells (flush edges, `gap-[2px]`).

- **Top-left cell:** `bg-surface` — number `111`, label "Federal drug trafficking counts against Dale Shiffman — one fan"
- **Top-right cell:** `bg-surface` — number `20+`, label "MLB players called to testify under oath at federal trial"
- **Bottom cell (full width, gold):** `bg-gold` — number `0` in black, label "Player suspensions handed down" in black bold, right-aligned italic quote in black: *"The players walked. The fans went to prison."*

Numbers are large (`text-6xl md:text-7xl`) and bold. Top-row numbers are gold (`111`) and white (`20+`). The gold bottom cell is the visual centerpiece — the asymmetry of zero punishments vs. decades of prison time is the point.

Framer Motion: fade+slide up on `useInView`, staggered per cell.

---

### 2. Timeline — "The Arc: 1979–1985"

**Position:** Between "The Era" (`the-era`) and "The Characters" (`the-characters`).
**Section ID:** `the-arc`
**Sidebar label:** "The Arc"

**Layout:** Vertical center spine, alternating left/right entries. Five milestone events. The spine is a single vertical line that fades from gold at top to red at the bottom using a CSS gradient — the color shift telegraphs descent before the reader reads a word.

**Milestones:**

| Year | Side | Dot color | Event |
|------|------|-----------|-------|
| 1979 | Left | Gold | Pirates win the World Series. Kevin Koch debuts as the first-ever Pirate Parrot. |
| 1980 | Right | White/dim | The first gram changes hands. Dale Shiffman finds his way into the inner circle. |
| 1983 | Left | White/dim | Connelly arrives in Miami with $40,000 cash. Two keys. The operation goes national. |
| 1984 | Right | White/dim | Rod Scurry collapses in the bullpen from cocaine psychosis. The FBI opens its investigation. |
| 1985 | Left | Red | Kevin wears the wire. Dale is arrested. The trial begins. Baseball holds its breath. |

Each entry: year as large heading (gold for 1979, white for middle years, red for 1985), short prose below. Framer Motion: entries stagger in as user scrolls, left entries slide from the left, right entries slide from the right.

Section has a stamp label "The Arc" and `h2` heading: "RISE AND<br/><span gold>FALL</span>".

---

### 3. The Betrayal — "The Wire"

**Position:** Between "The Characters" (`the-characters`) and "The Players" (`the-players`).
**Section ID:** `the-betrayal`
**Sidebar label:** "The Betrayal"

**Layout:** Two parts stacked vertically.

**Top — split photo panel:** Two equal columns, side by side, fixed height (~300px on desktop). Each panel uses the actual character photos (`/images/koch.jpg` and `/images/shiffman.jpg`) as full-bleed `next/image` backgrounds with a dark gradient overlay fading to black at the bottom. Labels sit at the bottom of each panel over the gradient:

- Left (Kevin): gold label "Kevin Koch", muted subtext "Wore the wire. Testified for the FBI."
- Right (Dale): dim white label "Dale Shiffman", muted subtext "111 federal counts. Didn't know until arrest."

A thin black divider separates the two panels.

**Bottom — prose block:** Dark background, centered max-width container, two lines of copy:

- Large heading: "The worst day of Dale's life was his arrest."
- Gold subheading: "The next day was worse."
- Body paragraph: "When he found out it was Kevin who wore the wire — Kevin who gave the testimony that sealed his fate — his best friend since childhood. They hadn't spoken for decades. Until the cameras started rolling."

Framer Motion: split panel fades in, then prose block slides up with a short delay.

---

## Sidebar Updates

Three new entries added to `SECTIONS` in `lib/data.ts`, inserted at the correct positions:

```typescript
{ id: "the-numbers", label: "The Numbers" },  // after the-show
{ id: "the-arc", label: "The Arc" },           // after the-era
{ id: "the-betrayal", label: "The Betrayal" }, // after the-characters
```

The sidebar scroll spy picks these up automatically via the existing `IntersectionObserver` logic.

---

## Files

| File | Action |
|------|--------|
| `lib/data.ts` | Add 3 entries to `SECTIONS` |
| `components/sections/the-numbers.tsx` | Create |
| `components/sections/the-arc.tsx` | Create |
| `components/sections/the-betrayal.tsx` | Create |
| `app/page.tsx` | Import and insert 3 new sections in correct positions |

---

## Done Criteria

- Impact Stats section renders with correct layout: 2 cells top, 1 gold full-width bottom
- Zero (`0`) is the visual focal point of the stats section
- Timeline spine fades from gold to red; 1985 entry has red dot and red year text
- Timeline entries alternate left/right and stagger in on scroll
- Betrayal split panel shows both character photos with gradient overlays and labels
- All 3 sections appear in sidebar nav and scroll spy tracks them correctly
- `npm run build` passes with no errors
