# TEMPORA — Chronological Transit Authority

> One click, and you are in 1254, 1965, 3000 BCE or 3123 CE.

TEMPORA is an interactive **time-travel console** built with React, TypeScript, Vite and Tailwind CSS v4. It re-skins the entire interface — palette, typography, atmosphere and history — for each of **24 verified coordinates** spanning **3000 BCE → 3123 CE**, and turns browsing into a guided tour of human civilization.

It is a pure front-end experience: all data is local, all audio is synthesized on the fly, and the whole app compiles down to a single self-contained HTML file.

---

## Highlights

- **24 eras, 5 epochs** — from Bronze-Age Egypt to a Dyson-swarm future, grouped into *Antiquity · Medieval · Renaissance & Reason · Modern · Beyond*.
- **Chronometric dial** — drag, scrub, or use `◄` / `►` keys to lock a destination, then watch the year roll over a flip-digit **odometer** (with proper BCE/CE handling).
- **Full-skin theming per era** — every stop carries its own fonts, color palette, particle drift, backdrop photograph and engraved archive-plate scene.
- **Synthesized chrono-audio** — directional warp whoosh (rising future-ward, falling retrograde), arrival chime and passport-stamp "thunk", all generated with the Web Audio API, zero assets.
- **Traveler's passport** — collecting every era stamps your passport; progress and stamps persist in `localStorage`.
- **Immersive narrative layers** — arrival report, overheard quotes, survival field manual ("how to survive the visit"), verified on-the-year events, poster-style field notes and a full chronicle timeline spine.
- **Memorial treatment** — eras of atrocity (e.g. Berlin 1933) are framed as archival record with explicit documentary warnings, marked **never to celebrate**.
- **Accessibility & polish** — `prefers-reduced-motion` support, keyboard navigation, Ken Burns viewports, scramble-text reveals, scroll-triggered animations and a paradox easter egg.

## The line

| Group | Stops |
| --- | --- |
| Antiquity (4) | 3000 BCE Egypt · 539 BCE Persia · 44 BCE Rome · 476 CE Ravenna |
| Medieval (3) | 1215 Runnymede · 1254 Paris · 1348 Messina |
| Renaissance & Reason (5) | 1455 Mainz · 1452 Florence · 1687 London · 1789 Paris · 1889 Paris |
| Modern (9) | 1905 Bern · 1914 Europe · 1933 Berlin · 1940 London · 1945 Los Alamos · 1961 orbit · 1969 Luna · 1989 Berlin · 2026 Home |
| Beyond (3) | 2049 Rotterdam · 2150 L5 (O'Neill Station) · 3123 Ring Habitat |

## Tech stack

- **React 19** + **TypeScript 5** (strict mode)
- **Vite 7** with `vite-plugin-singlefile` — the production build is one HTML file
- **Tailwind CSS 4** (`@tailwindcss/vite`) + custom CSS design system
- **Web Audio API** for procedural sound
- Google Fonts: Cinzel, EB Garamond, Marcellus, Space Grotesk, Orbitron, Syncopate, Playfair Display, Abril Fatface, IBM Plex Mono and more

## Getting started

```bash
npm install          # install dependencies
npm run dev          # start the dev server
npm run build        # production build (single-file HTML)
npm run preview      # preview the built output
```

## Project structure

```
public/images/            Photography used for era viewports
src/
  main.tsx                React entry point
  App.tsx                 The console: dial, viewport, nav, all sections
  index.css               Tailwind + the TEMPORA design system
  components/
    EraVisual.tsx         Photo feed or engraved archive plate per era
    EraBackdrop.tsx       Full-page per-era backdrop with drift
    Odometer.tsx          Flip-digit year readout (BCE/CE)
    Scramble.tsx          Text-decodes-through-static reveal
    Warp.tsx              Full-screen displacement overlay
    Reveal.tsx            Scroll-triggered reveal wrapper
    scenes/index.tsx      Wide-aspect SVG line-art scenes (currentColor)
  data/
    eras.ts               All 24 eras + groups, palettes, fonts, events
    quotes.ts             Overheard quotes + survival field-manual lines
  lib/
    audio.ts              Procedural chrono-audio engine
    hooks.ts              useReducedMotion, useNow
  utils/cn.ts             clsx + tailwind-merge helper
```

## Data model

Each era in `src/data/eras.ts` is a self-contained bundle:

```ts
{
  id: "persia",
  year: -539, yearLabel: "539 BCE", short: "539 BC",
  name: "The King of Kings",
  group: "antiquity",
  epoch: "Achaemenid Empire · Persia",
  location: "Babylon, on the Euphrates",
  tagline: "An empire the size of a continent, run by mail.",
  description: "...",
  status: "Royal courier passing — step aside",
  fonts: { display: '"Cinzel", serif', body: '"EB Garamond", serif' },
  palette: { bg, bg2, ink, accent, accent2, muted },
  particle: { color, drift: "up" | "down" },
  danger: 1..5,
  figure?, memorial?, events[], facts[], stats[],
  image?, backdrop?, emblem, signal, confidence,
}
```

Adding a stop is just appending one object (plus a quote in `quotes.ts`); the console, dial, chronicle, destinations grid and passport all pick it up automatically.

## Notes

- **No backend, no tracking.** Everything runs locally; visited stamps and sound preference live in `localStorage`.
- **Memorial eras** are rendered desaturated and authoritatively captioned, with a red prohibition mark over regime symbolism — a record for study, not endorsement.
- **Future eras degrade honestly**: 2049 (88%), 2150 (54%), 3123 (12%) — clearly labelled projections, not forecasts.