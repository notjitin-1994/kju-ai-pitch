# Landing Page Redesign & Pitch Deck Migration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the current pitch deck to `/pitch-deck` and create a premium, brand-style compliant landing page at `/` using data from the pitch slides and styling from `smartslate-final`.

**Architecture:** 
- Implement React Router for navigation.
- Extract pitch deck logic from `App.tsx` into `src/pages/PitchDeck.tsx`.
- Create `src/pages/LandingPage.tsx` using Magic UI and shadcn components.
- Centralize brand colors (Teal accent, Indigo CTAs) and typography (Quicksand/Lato).

**Tech Stack:** React, TypeScript, Tailwind CSS, Framer Motion, React Router, Magic UI, Lucide React.

---

### Task 1: Setup Routing & Migration

**Files:**
- Create: `src/pages/PitchDeck.tsx`
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

- [ ] **Step 1: Extract Pitch Deck to `src/pages/PitchDeck.tsx`**
  Move all state and slide logic from `App.tsx` to this new file.

- [ ] **Step 2: Update `src/main.tsx` with `BrowserRouter`**
  Wrap the `App` component with `BrowserRouter`.

- [ ] **Step 3: Refactor `src/App.tsx` to use `Routes`**
  Define routes for `/` (LandingPage) and `/pitch-deck`.

---

### Task 2: Create Brand-Compliant Landing Page

**Files:**
- Create: `src/pages/LandingPage.tsx`
- Create: `src/components/landing/Hero.tsx`
- Create: `src/components/landing/ProblemMatrix.tsx`
- Create: `src/components/landing/SolutionPillars.tsx`
- Create: `src/components/landing/Outcomes.tsx`
- Create: `src/components/landing/CTA.tsx`

- [ ] **Step 1: Scaffolding `LandingPage.tsx`**
  Implement the main layout with a fixed header and sections.

- [ ] **Step 2: Implement Hero Section**
  Use data from Slide 1. Focus on "The AI Transformation" and "Institutional Intelligence".
  Apply atmospheric lighting and large typography.

- [ ] **Step 3: Implement Problem Matrix**
  Use data from Slides 5, 6, 7. Staggered reveals for Student/Faculty/Brand issues.
  Left-aligned text, Teal accents.

- [ ] **Step 4: Implement Solution Pillars**
  Use data from Slide 9 (3-Pillar Model). Use `MagicCard` or similar premium cards.
  Ensure Brand Teal is the primary accent.

- [ ] **Step 5: Implement Outcomes & ROI**
  Use data from Slide 10 (70% surge) and Slide 12 (40-60% time reclaimed).
  Add animated counters or gauges.

- [ ] **Step 6: Implement CTA Section**
  Large, high-impact section with "Reach Out" button using Indigo (`#4F46E5`).

---

### Task 3: Global Styling & Polish

**Files:**
- Modify: `src/index.css`
- Modify: `tailwind.config.js`

- [ ] **Step 1: Centralize Theme Variables**
  Ensure Teal and Indigo are correctly mapped to Tailwind config.

- [ ] **Step 2: Global Left Alignment**
  Ensure all text containers follow the left-aligned mandate.

- [ ] **Step 3: Premium Animations**
  Apply Framer Motion staggered entry for all sections.
  Use `emil-design-eng` principles for snappy yet elegant transitions.

- [ ] **Step 4: Magic UI Integration**
  Add `Marquee`, `Border Beam`, or `Shimmer Button` to enhance the premium feel.

---

### Task 4: Verification

- [ ] **Step 1: Test Navigation**
  Verify `/` and `/pitch-deck` load correctly.

- [ ] **Step 2: Brand Audit**
  Verify colors: Teal for accents, Indigo for CTAs.
  Verify alignment: All text left-aligned.
  Verify typography: Quicksand/Lato usage.

- [ ] **Step 3: Performance Check**
  Ensure animations don't drop frames (only animate transform/opacity).
