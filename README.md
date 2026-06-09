# Smartslate × Acharya — Project: Institutional Intelligence

The pitch site for Smartslate's AI-transformation proposal to the **Acharya Group of
Institutions**, Bengaluru. Built to be hosted at **acharya.smartslate.io**.

A cinematic, single-page React experience plus a presenter pitch deck, pricing/ROI page,
and terms — Smartslate brand system (teal on deep slate) with the Acharya logo in the
co-brand lockups.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (design tokens in `tailwind.config.js` / `src/theme/branding.ts`)
- **Framer Motion** for motion
- **React Router** for the deck / pricing / terms routes

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build
npm run preview  # preview the build
```

## Routes

| Route | Page |
|---|---|
| `/` | Landing page (Hero · Problem · Solution Pillars · Outcomes · CTA) |
| `/pitch-deck` | Presenter pitch deck |
| `/pricing` | Pricing & ROI |
| `/terms` | Terms |
| `/transcript` | Narration transcript |

## Key docs

- `VISION.md` — the strategic north-star (the repurposed Cognitive Campus Network proposal).
- `docs/acharya-repurpose-strategy.md` — research + brainstorm on repurposing the proposal for Acharya, and the list of assets still to produce.

## Assets still to swap for Acharya

The codebase has been fully re-pointed from Kristu Jayanti → Acharya in copy and identifiers.
A few **media** assets are KJU-specific and need new production (see the strategy doc §5):

- `public/acharya-logo.svg` — **placeholder** wordmark; replace with the official Acharya logo.
- Hero film (`kju-intro-v2.mp4`) — needs an Acharya/neutral cut.
- `public/audio/*.mp3` — narration still voiced for KJU; scripts are updated, regenerate via `scripts/`.
- `public/og-image.png` — re-export for Acharya social sharing.

## Deployment

Configured for static hosting (SPA rewrites in `vercel.json`). Point `acharya.smartslate.io`
at the deployment and set the canonical/OG URLs (already set in `index.html`).
