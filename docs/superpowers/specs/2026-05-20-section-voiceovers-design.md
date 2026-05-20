# Section Voiceovers — Design Spec

**Date:** 2026-05-20
**Status:** Draft — awaiting user review
**Project:** kju-ai-pitch (Kristu Jayanti College pitch deck, Vite + React 18)
**Target surface:** `src/pages/LandingPage.tsx` and its 5 child sections (Hero, ProblemMatrix, SolutionPillars, Outcomes, CTA)

---

## 1. Summary

Add cinematic, opt-in voiceover narration to each section of the landing page. A single editorial narrator walks the visitor through the pitch in five short audio chapters that play automatically as the visitor dwells on each section. The experience is delivered by pre-rendered MP3 files (no runtime TTS API), a bottom-center floating mini-player, and an audio-reactive ambient glow on the active section.

## 2. Goal

A visitor who opts in from the Hero gets a 4-minute guided audio tour of the pitch. The narration feels like a Netflix documentary, not a corporate explainer. The visual experience is preserved end-to-end — audio amplifies the visual story without competing with it.

**Success criteria:**

1. Opt-in conversion (% of visitors who click the Hero CTA tile) ≥ 25%.
2. Of opted-in visitors, average sections-with-completed-narration ≥ 3 (out of 5).
3. Zero impact on initial LCP and CLS scores (audio files lazy-loaded only after opt-in).
4. Lighthouse Accessibility score on the page stays ≥ 95.

## 3. Non-goals (v1)

- **Multi-language narration.** English only. (Hindi / Malayalam variants are a v2 conversation.)
- **Real-time TTS.** Audio is pre-rendered and committed as static assets.
- **Captions / subtitles overlay.** Explicitly skipped. A static transcript link in the mini-player is the WCAG accommodation.
- **Recorded human voice.** Documentary-editorial AI VO via ElevenLabs is the production source.
- **Word-level highlighting / lyrics-style.** Out of scope.
- **Analytics / telemetry.** No event tracking in v1.

## 4. Locked decisions (from brainstorm)

| Decision | Choice |
|---|---|
| Generation pipeline | ElevenLabs, **pre-rendered** to `public/audio/*.mp3` at build/author time |
| Anchoring | Section-anchored — one audio track per section |
| Trigger | **Hybrid dwell** — track starts when ≥60% of the section's own height is visible in the viewport, sustained for ≥1.5s (1.0s on mobile) |
| Opt-in surface | **Hero CTA tile** ("🎧 Take the narrated tour · ~4 min") in the Hero section |
| Narrator persona | **Documentary editorial** — single polished English voice (final voice pick via A/B preview: *Adam* warm baritone vs *Nicole* poised mezzo) |
| Captions | **None** (v1) — transcript link only |
| Active-section visual | **Ambient glow** — Smart Teal halo on active section, RMS-amplitude-reactive via Web Audio API |
| Scroll-away behavior | **Cut on exit** — fade out in 250ms, no resume; new section starts from beginning on dwell |
| Natural completion behavior | Soft 2-second "▸ next chapter" hint at section's bottom-right, then fades |
| Script perspective | **Second-person, urgent, present-tense** ("Your students are using AI without you...") |
| Script length | Hero ~30s, body sections ~50s, Outcomes ~65s. Total ~4 min. |
| Mini-player chrome | **Bottom-center pill** — glass surface, auto-hide on inactivity, suppressed in Hero section |

## 5. User experience walkthrough

1. **First load** — Page renders exactly as it does today. The Hero section gains a single new element: a small pill near the bottom of the fold, *"🎧 Take the narrated tour · ~4 min."* Audio is fully off; no `<audio>` elements mounted.
2. **Opt-in click** — User clicks the Hero CTA tile. The tile morphs into a "Loading narration…" state for ~500ms while all five MP3 files are fetched in parallel. An `AudioContext` is created (browser autoplay gesture satisfied). `localStorage.audioOptIn = "1"` persists the choice.
3. **Hero VO plays** — The Hero section's track plays immediately. The Hero's eyebrow glows softly (ambient halo) and pulses with the RMS amplitude. The Hero CTA tile morphs into a compact "Narrating · ▮▮ pause" control sitting in the same spot — this is the Hero's local control surface, so the floating mini-player stays suppressed while the user is still inside the Hero.
4. **Scroll begins** — As the user scrolls into ProblemMatrix, the floating bottom-center pill slides up from the viewport edge (350ms ease-out). It shows: *"Chapter 02 · The Chasm"*, a thin progress line, and four controls: pause, prev, next, exit. The Hero halo fades; the Hero audio cuts to silence at ~250ms once Hero is <40% in view.
5. **ProblemMatrix dwells** — Once ProblemMatrix is ≥60% in view for ≥1.5s, its VO starts. ProblemMatrix's eyebrow gains the halo.
6. **User scrolls fast** — They never dwell on SolutionPillars. No VO triggers for that section. The mini-player updates its label *"Chapter 03 · ..."* while in view but does not start playback (visible badge: "▷ click to play").
7. **Outcomes finishes naturally** — VO completes its full 65s. Halo dims. A small "▸ next chapter" hint appears at the section's bottom-right for 2s, then fades.
8. **CTA reached** — Final VO plays. After completion, the mini-player shows a single "✓ Tour complete · Replay?" state. Mute / replay / dismiss controls.
9. **User scrolls back up** — The current track cuts; sections behave as in step 5 going backward. Each replay starts from the beginning.
10. **Return visit** — `localStorage.audioOptIn === "1"` is read on mount. The Hero CTA tile is replaced by a smaller *"🎧 Resume narration"* affordance; the mini-player does not auto-appear without the user re-confirming (per browser autoplay policy on cold loads).

## 6. Architecture overview

Centralized React context + a small set of headless hooks. Each section opts into audio via a hook, not via prop drilling.

```
┌─────────────────────────────────────────────────────┐
│ <AudioProvider> wraps <LandingPage />               │
│                                                     │
│  state:                                             │
│    • isOptedIn  (boolean)                           │
│    • activeSection  (SectionId | null)              │
│    • playbackState  ('idle' | 'playing' | 'ended')  │
│    • amplitude  (0..1, animation-frame stream)      │
│                                                     │
│  refs:                                              │
│    • audioElements: Map<SectionId, HTMLAudioElement>│
│    • audioContext: AudioContext                     │
│    • analyser: AnalyserNode                         │
│                                                     │
│  methods:                                           │
│    • optIn()                                        │
│    • play(sectionId)                                │
│    • pause()                                        │
│    • next() / prev()                                │
│    • exit()                                         │
└────────┬────────────────────────────────────────────┘
         │
         ├─► <Hero>       useSectionAudio('hero')
         │                  + renders HeroAudioCTA
         │
         ├─► <ProblemMatrix>   useSectionAudio('problem')
         ├─► <SolutionPillars> useSectionAudio('solution')
         ├─► <Outcomes>        useSectionAudio('outcomes')
         ├─► <CTA>             useSectionAudio('cta')
         │
         └─► <MiniPlayer />  consumes context, renders bottom-center pill
```

**Why a context, not a Redux/Zustand store:** All audio state is local to a single page session and never needs to be serialized, time-traveled, or shared across routes. React context is the right primitive.

**Why one shared `AudioContext` + `AnalyserNode`:** Web Audio's AudioContext is expensive and browser-rate-limited; one global instance pipes through all five audio elements via dynamic `MediaElementAudioSourceNode` swap on each play.

## 7. Component breakdown

### 7.1 `src/audio/AudioProvider.tsx` (new, ~250 LOC)
- React context provider.
- Owns the `Map<SectionId, HTMLAudioElement>` and the shared `AudioContext`.
- Handles opt-in flow: lazy-instantiates the `AudioContext`, preloads all 5 MP3 files, sets `localStorage`.
- Drives a `requestAnimationFrame` loop while playing — computes RMS amplitude from the analyser node, writes it to a CSS variable `--audio-amplitude` on `document.documentElement` (rounded to 2 decimals to avoid layout thrash).
- Honors `prefers-reduced-motion: reduce` by skipping the amplitude loop (sets `--audio-amplitude` to a static `0.5`).

### 7.2 `src/audio/useSectionAudio.ts` (new, ~60 LOC)
- Hook each section calls with its `SectionId`.
- Internally uses `IntersectionObserver` (threshold `[0, 0.4, 0.6]`) to track dwell.
- Calls `context.play(sectionId)` after 1.5s sustained ≥60% visibility.
- Calls `context.exit()` when section drops below 40% in view.
- Returns `{ isActive, isPlaying }` so the section can conditionally render the ambient halo.

### 7.3 `src/audio/MiniPlayer.tsx` (new, ~180 LOC)
- The floating bottom-center pill.
- Subscribes to context state.
- Auto-hides after 4s of no mouse movement; reappears on `mousemove`.
- Hidden entirely when `activeSection === 'hero'` (Hero has its own inline CTA).
- Controls: pause/play, prev, next, exit (closes audio mode entirely), volume (popover), transcript link.
- Uses framer-motion `AnimatePresence` for slide-up/down on mount/unmount.

### 7.4 `src/audio/HeroAudioCTA.tsx` (new, ~80 LOC)
- The Hero-section CTA tile (initial state) and its narrating-badge / replay states.
- Three visual states: `pre-opt-in` (large CTA), `loading` (~500ms shimmer), `narrating` (compact badge with pause).

### 7.5 `src/audio/AmbientGlow.tsx` (new, ~50 LOC)
- A presentational component each section optionally renders.
- Reads the CSS variable `--audio-amplitude`.
- Renders a soft `box-shadow` halo whose opacity and blur scale with amplitude: `box-shadow: 0 0 calc(40px + 40px * var(--audio-amplitude)) rgba(167, 218, 219, calc(0.15 + 0.25 * var(--audio-amplitude)))`.
- Pure CSS animation; no JS per frame.

### 7.6 `src/audio/scripts.ts` (new, ~30 LOC)
- Strongly-typed registry mapping `SectionId` → `{ title, audioUrl, transcript, durationSec }`.
- The single source of truth for script content and audio file paths.
- Imported by `AudioProvider`, `MiniPlayer`, and the standalone transcript page.

### 7.7 `src/pages/TranscriptPage.tsx` (new, ~80 LOC)
- A simple page at `/transcript` rendering the full text of all 5 section scripts.
- Linked from the mini-player.
- Same dark editorial styling as the rest of the site.

### 7.8 Existing-section modifications
Each of `Hero.tsx`, `ProblemMatrix.tsx`, `SolutionPillars.tsx`, `Outcomes.tsx`, `CTA.tsx` gets:
- One `useSectionAudio()` call.
- Conditional rendering of `<AmbientGlow />` when the section `isActive`.
- ~5 lines per file. Total: ~25 LOC added across these.

## 8. Data model

### 8.1 `scripts.ts` shape

```ts
export type SectionId = 'hero' | 'problem' | 'solution' | 'outcomes' | 'cta';

export interface SectionScript {
  id: SectionId;
  title: string;           // shown in MiniPlayer, e.g., "Chapter 04 · By the Numbers"
  audioUrl: string;        // "/audio/outcomes.mp3"
  transcript: string;      // for /transcript page + WCAG accommodation
  durationSec: number;     // hard-coded for progress bar pre-load (refined post-render)
}

export const SCRIPTS: SectionScript[] = [
  {
    id: 'hero',
    title: 'Chapter 01 · The Opening',
    audioUrl: '/audio/hero.mp3',
    durationSec: 32,
    transcript: '...',
  },
  // ...
];
```

### 8.2 LocalStorage keys
- `kju.audio.optIn` — `"1"` once user has opted in.
- `kju.audio.volume` — `"0"`–`"1"` user volume preference (default `"0.75"`).
- `kju.audio.lastVisit` — ISO timestamp, used to decide whether to re-prompt opt-in on returns >30 days old. (Optional v1.5.)

## 9. Production pipeline (how audio gets made)

Authored once, committed as static assets. No runtime API.

1. **Write scripts.** A new file `docs/scripts/voiceovers.md` holds all 5 scripts as plain text, one section per heading. Iterative editing happens here.
2. **Generate audio.** A small Node script `scripts/generate-voiceovers.mjs`:
   - Reads `docs/scripts/voiceovers.md`.
   - For each section, POSTs to ElevenLabs TTS API (env var `ELEVENLABS_API_KEY`).
   - Saves the response stream to `public/audio/<sectionId>.mp3`.
   - Re-encodes to mono 96 kbps via `ffmpeg` (sub-process call) — keeps each file under 200 KB.
3. **Commit audio.** MP3s go into the repo at `public/audio/`. Each is ~150-300 KB; total ~1 MB. Acceptable for git.
4. **Refresh durations.** A second script `scripts/refresh-durations.mjs` reads each MP3's metadata and updates `durationSec` in `scripts.ts`.
5. **Voice A/B.** Before final commit, generate `hero.mp3` with both *Adam* and *Nicole*. User picks. Commit only the winner.

## 10. Accessibility

- **Transcript link** in the mini-player → `/transcript` page. Satisfies WCAG 2.1 SC 1.2.1 (Audio-only) — equivalent text alternative provided.
- **Mini-player ARIA** — `role="region"` with `aria-label="Narration player"`. Each control button has explicit `aria-label`. Active section announced via `aria-live="polite"` text node.
- **Keyboard support** — Spacebar toggles play/pause when mini-player has focus; arrow keys nudge prev/next; Escape exits audio mode.
- **Focus management** — On opt-in, focus moves to the mini-player so screen-reader users can immediately interact.
- **No audio over 3s without controls** (WCAG SC 1.4.2) — satisfied by the always-accessible mini-player.
- **Reduced motion** — `prefers-reduced-motion: reduce` disables the RMS amplitude animation (halo becomes static at 50% intensity); audio still plays.

## 11. Performance budget

| Metric | Target | Rationale |
|---|---|---|
| Initial bundle delta | ≤ +6 KB gzipped on initial load | Only `AudioProvider` shell (state + opt-in detection) ships on initial render. Heavy modules (`MiniPlayer`, `AmbientGlow`, audio file fetches, `AudioContext` instantiation) are dynamic-import'd on opt-in click. |
| Audio asset total | ≤ 1.0 MB across all 5 MP3s | 96 kbps mono × 4 min ≈ 2.8 MB raw; we target sub-1 MB via shortening any silence padding and tight encoding |
| Initial LCP impact | ≈ 0 ms | The provider's only first-render work is reading `localStorage` and rendering the Hero CTA tile. No network, no Web Audio. |
| CLS impact | 0 | Mini-player uses `position: fixed`; ambient glow is `box-shadow` only |
| RMS amplitude loop | <0.3 ms / frame | One `getByteTimeDomainData()` call + one CSS variable write per RAF |

## 12. Browser & device support

- **Desktop:** Chrome 120+, Safari 17+, Firefox 120+, Edge 120+. All support `AudioContext`, `MediaElementAudioSourceNode`, `AnalyserNode`.
- **Mobile:** iOS Safari 16+, Chrome Android. Audio plays cleanly; bottom-center mini-player adapts to a slimmer profile under 480px width. Dwell threshold is 1.0s on mobile (faster scroll velocity).
- **Older browsers (no `AudioContext`):** Detected via `typeof window.AudioContext === 'undefined'`. The ambient glow falls back to a static halo (no amplitude reactivity); audio still plays via plain `<audio>`.

## 13. Industry-standard defaults assumed

For decisions not explicitly raised in brainstorm:

- **Audio format:** MP3 96 kbps mono. (Opus would be smaller but Safari support for `<audio src="*.opus">` is recent and inconsistent.)
- **Preloading:** All 5 files fetched in parallel immediately after opt-in. Total ~1 MB; trivial on any non-2G connection.
- **Default volume:** 75%.
- **Skip behavior:** Mini-player's "Next" both jumps audio to next section AND scrolls the page there (smooth scroll, ~600ms). Same for "Prev."
- **Replay:** After the final CTA narration ends, the mini-player shows a single "Tour complete · Replay?" affordance that restarts from Hero.
- **Crash safety:** If an audio file fails to load (404, network error), the section behaves as if audio mode is off for that section only; the rest of the tour continues. No user-visible error UI.
- **Voice file naming:** `<sectionId>.mp3` (e.g., `hero.mp3`, `outcomes.mp3`). No versioning in filenames — cache-busted via Vite's build-time asset hashing.

## 14. Open questions

1. **Final voice pick.** *Adam* (warm baritone, gravitas) vs *Nicole* (poised mezzo, modern documentary). Need A/B preview after first generation pass. User decides.
2. **Hero CTA copy.** Current draft: *"🎧 Take the narrated tour · ~4 min."* Alternatives worth considering: *"🎧 Hear the pitch · 4 min"*, *"🔊 Walk through with audio."* Decide during implementation.
3. **What happens during the `loading` state of the Hero CTA?** Spinner, shimmer, or no chrome? Default plan: 500ms shimmer matching `shimmer-button` aesthetic.
4. **Does the transcript page need its own navbar / route?** Or is it a modal? Default plan: dedicated route at `/transcript`, mirrors the LandingPage navbar.

## 15. Sequencing (proposed implementation milestones)

These will be formalized into a plan in the next step, but rough breakdown:

1. **Foundation** — AudioProvider + scripts.ts + script generation pipeline. Generate Hero+CTA placeholder MP3s. (Demoable: opt-in flow works on Hero alone.)
2. **Section integration** — useSectionAudio hook + integrate into all 5 sections. Generate all 5 MP3s. (Demoable: full tour plays cleanly.)
3. **Polish** — MiniPlayer auto-hide, AmbientGlow amplitude reactivity, transcript page, reduced-motion fallback, mobile tuning.
4. **A11y + perf pass** — Lighthouse audit, keyboard nav, screen-reader test, file-size verification.

---

## Reviewer checklist (please confirm before we move to writing-plans)

- [ ] Goal + success criteria match what you want
- [ ] Locked decisions (§4) accurately reflect what we agreed
- [ ] Component breakdown (§7) is appropriately scoped — nothing missing, nothing over-engineered
- [ ] Production pipeline (§9) is acceptable (committing MP3s to repo, ElevenLabs as source)
- [ ] Industry-standard defaults (§13) are sensible
- [ ] Open questions (§14) are the right open questions
