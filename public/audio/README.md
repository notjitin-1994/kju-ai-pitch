# Audio Assets

Pre-rendered voiceover MP3 files for the narrated tour.

## Files

- `hero.mp3` — Chapter 01: The Opening (~30s)
- `problem.mp3` — Chapter 02: The Chasm (~50s)
- `solution.mp3` — Chapter 03: The Architecture (~50s)
- `outcomes.mp3` — Chapter 04: By the Numbers (~65s)
- `cta.mp3` — Chapter 05: The Decision (~50s)

## Generation

Run the following to generate all files (requires `ELEVENLABS_API_KEY` and `ffmpeg`):

```bash
ELEVENLABS_API_KEY=sk-... node scripts/generate-voiceovers.mjs
```

Generate a specific section only:

```bash
ELEVENLABS_API_KEY=sk-... node scripts/generate-voiceovers.mjs --section hero
```

Generate with a specific voice (Adam or Nicole):

```bash
ELEVENLABS_API_KEY=sk-... node scripts/generate-voiceovers.mjs --voice Nicole
```

See `scripts/generate-voiceovers.mjs` for full documentation.
