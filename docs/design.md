# SHIFF — Website Design Document
**Date:** 2026-03-26
**Status:** Approved by client

---

## Overview

SHIFF is a single-page pitch website replacing a PDF deck for a scripted limited series about the Pittsburgh Pirates cocaine scandal of the late 70s and early 80s. The site is aimed at network/streaming executives and investors. It tells the story of Kevin Koch (the first-ever Pirate Parrot mascot) and his best friend Dale Shiffman, two blue-collar Pittsburgh guys who became drug suppliers for MLB stars — until betrayal, federal prosecution, and ultimately, redemption.

The working title is **SHIFF**, named after Dale Shiffman.

---

## Audience

- Network and streaming executives
- Investors
- Sent as a direct link to replace a PDF pitch deck

---

## Tone and First Impression

The site must communicate **era and scandal** within 5 seconds of landing. The feeling should be: gritty, cinematic, real. Like stumbling onto a classified FBI case file about something that actually happened — because it did.

---

## Visual Design

### Aesthetic Direction

**Primary: Dossier/Case File** — FBI evidence folder meets vintage Pittsburgh newspaper. Grain texture, mugshot-style photo grids, bold headline typography, redacted-stamp callouts.

**Layered with: Editorial Magazine polish** — clean readable body type, generous spacing, large photography, prestige-TV feel. Think The Ringer longform meets a crime documentary title sequence.

### Color Palette

| Role | Value |
|------|-------|
| Background | `#0a0a0a` (near-black) |
| Primary accent | `#FDB827` (Pittsburgh Pirates gold) |
| Text primary | `#ffffff` |
| Text secondary | `#b0a88a` (muted cream, captions) |
| Surface/card | `#141414` |
| Border/divider | `#2a2a2a` |

### Typography

- **Headlines:** Bold slab-serif (e.g. Roboto Slab, Zilla Slab, or similar) — evokes vintage sports signage and newspaper headlines
- **Body:** Clean sans-serif (e.g. Inter or IBM Plex Sans) — editorial readability
- **Accent labels:** All-caps tracking, gold, small — used for section stamps, evidence labels, character role titles

### Texture and Effects

- Subtle paper grain overlay on background (CSS or SVG noise texture)
- Photography treated high-contrast, slightly desaturated — old newsprint feel
- Selective use of "stamp" or "redacted" style callouts (e.g. EVIDENCE, CLASSIFIED, CASE NO.)
- Gold rule dividers between sections
- Scroll-triggered fade-in reveals for section content

### Image Sources

All images extracted from the two pitch deck PDFs:
- 1979 Pirates World Series celebration photos
- Pirate Parrot in costume
- Kevin Koch and Dale Shiffman photos
- Pittsburgh Cocaine Seven mugshot grid
- Baseball card photos: Dave Parker, Rod Scurry, Dale Berra, John Milner
- 20+ other MLB players named in the trials
- Dale Shiffman arrest photo (1985)
- Koch and Shiffman reunion photo
- Film/show comparable posters (Boogie Nights, Moneyball, Wolf of Wall Street, American Crime Story)
- Creator/producer headshots: Algee Smith, Jake Shiffman

Note: Film poster images may need to be sourced at higher resolution from the web if PDF extractions are too small.

---

## Layout

### Sidebar

- Fixed to the left edge
- Collapsed by default: thin gold strip (~48px) with a hamburger/arrow toggle button
- Expanded width: ~240px
- Contains: "SHIFF" wordmark at top, section jump links listed vertically
- Active section highlights link in gold
- Smooth open/close animation

### Page Structure

Single scrolling page. All sections stack vertically. Sidebar jumps are anchor-linked.

---

## Sections

### 1. Hero
- Full viewport height
- Background: 1979 Pirates celebration photo, darkened with gold-tinted overlay
- Center: "SHIFF" in massive gold slab-serif headline
- Below title: logline — "The true story of the Pittsburgh Cocaine Seven"
- Below logline: hook question fades in — "How far would you go to hang out with your heroes?"
- Subtle grain overlay
- Scroll indicator at bottom

### 2. The Show
- Dark panel, full-width
- Left-aligned editorial layout
- Heading: "THE SHOW"
- Body: Series premise — limited scripted series, late 70s/early 80s, dawn of the mascot era, cocaine's grip on America, fans turned drug pawns, trial, betrayal, redemption
- Pull quote highlighted in gold: "It's a tale of friendship, betrayal, crime and baseball"

### 3. The Era
- Split layout: text left, archival photo collage right
- Heading: "THE BACKDROP"
- Subheading in gold: "70s & 80s Era Sports, Drugs & Nightlife of Major League Baseball's Worst Scandal"
- Body: sets the cultural context — pre-internet sports, untouchable star athletes, Steel City euphoria
- Photo collage: celebration photos, newspaper clippings, Pirate Parrot imagery

### 4. The Characters
- Heading: "THE PARROT & THE PHOTOGRAPHER" then "THE COCAINE SEVEN"
- Kevin Koch: photo + full character bio
- Dale Shiffman: photo + full character bio
- Below: card grid for the rest of the Cocaine Seven
  - Kevin Connelly & Tommy Balzer
  - Shelby Greer
  - Curtis Strong
  - Robert "Rav" McCue
  - Jeffry Mosco
- Each card: mugshot-style photo, name in gold, short bio, sentence counts where applicable

### 5. The Players
- Heading: "THE PITTSBURGH PIRATE PLAYERS"
- Intro: "The 1979 World Champions were gods-among-men. Their fans gladly broke the law for a taste of that life."
- Card grid — baseball card aesthetic:
  - Dave Parker
  - Rod Scurry
  - Dale Berra
  - John Milner
- Below: collapsible or scrollable row of the 20+ other MLB players named in the trials, shown as baseball card thumbnails

### 6. Comparables
- Heading: "SHOW CROSS"
- 4 film/show posters in a row: Boogie Nights, Moneyball, Wolf of Wall Street, American Crime Story
- Each with title and year label in gold
- Tagline: "In the spirit of these highly stylized, wildly popular titles — SHIFF is fueled by authenticity."

### 7. Media & Source Material
- Heading: "MEDIA / PRESS COVERAGE"
- Clean list layout, each item on its own row:
  - HBO Real Sports with Bryant Gumbel (Season 12, Ep 9) — Part 1 & Part 2 (external links)
  - Dale Shiffman on the 700 Club (external link)
  - Dale Shiffman on Q Sports (external link)
  - VICE: "Throwback Thursday: The Pittsburgh Drug Trials Bring War to MLB" (external link)
  - ESPN 30 for 30: "The Pittsburgh Drug Trials" (external link)
  - Narratively: "The Cocaine Kings of the Pittsburgh Pirates" (external link)
  - Book by Aaron Skirball: "The Pittsburgh Cocaine Seven" (external link)
- All links open in new tab

### 8. Creators & Producers
- Heading: "SHOW CREATORS & EXECUTIVE PRODUCERS"
- 2-column grid, each person gets: photo, name in gold, role label, bio paragraph
  - Algee Smith (Creator/Actor)
  - Jake Shiffman (Creator/Producer)
  - Brian Leavell (Executive Producer)
  - Noah Rosenberg (Executive Producer, Narratively)

### 9. Contact
- Minimal, near-black panel
- Centered: "SHIFF" wordmark
- One line: "For inquiries:" with gold mailto link — jakeshiffman@gmail.com
- Optional: small Extension 94 logo if provided

---

## Technical Approach

- **Framework:** Next.js (App Router)
- **UI Components:** shadcn/ui — use shadcn primitives where appropriate (Sheet for sidebar, Card for character/player cards, etc.)
- **Styling:** Tailwind CSS with custom theme tokens for Pirates color palette
- **Design quality:** taste-skill and shadcn skill applied during implementation
- **Images:** Extracted from PDFs, placed in `/public/images/`, served via Next.js `<Image>` component
- **Animations:** Framer Motion for scroll-triggered reveals and sidebar transitions
- **Scroll spy:** IntersectionObserver for active sidebar link tracking
- **Deployment:** Vercel (zero-config with Next.js)
- **Fully responsive:** sidebar collapses to bottom nav or hamburger on mobile

---

## File Structure

```
SHIFF/
  app/
    page.tsx           # single page, all sections
    layout.tsx
    globals.css
  components/
    Sidebar.tsx
    sections/
      Hero.tsx
      TheShow.tsx
      TheEra.tsx
      TheCharacters.tsx
      ThePlayers.tsx
      Comparables.tsx
      Media.tsx
      Creators.tsx
      Contact.tsx
    ui/                # shadcn components
  public/
    images/            # extracted from PDFs
  lib/
    data.ts            # all content (bios, names, links) as typed data
  docs/
    design.md          # this file
```

---

## Contact

Jake Shiffman: jakeshiffman@gmail.com
