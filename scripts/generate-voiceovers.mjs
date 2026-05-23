#!/usr/bin/env node
/**
 * Generate section voiceovers via ElevenLabs TTS.
 * Saves output to public/audio/<sectionId>.mp3
 *
 * Usage:
 *   ELEVENLABS_API_KEY=sk-... node scripts/generate-voiceovers.mjs
 *   ELEVENLABS_API_KEY=sk-... node scripts/generate-voiceovers.mjs --section hero
 *   ELEVENLABS_API_KEY=sk-... node scripts/generate-voiceovers.mjs --voice Nicole
 *
 * Voice options (ElevenLabs premade):
 *   Adam   — warm baritone, gravitas
 *   Nicole — poised mezzo, documentary tone
 *
 * Requires: ffmpeg in PATH (for 96kbps mono re-encode)
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const AUDIO_DIR = path.join(ROOT, 'public', 'audio');

// ── Voice IDs ────────────────────────────────────────────────────────────────
//   IndianMale — user-selected library voice, natural Indian English accent
//   Adam / Nicole — ElevenLabs premade (free-tier fallbacks)
const VOICE_IDS = {
  IndianMale: 'hCJyCwSNQETUpWKHnj2n',
  Adam: 'pNInz6obpgDQGcFmaJgB',
  Nicole: 'piTKgcLEGmPE4e6mEKli',
};

// ── Scripts ──────────────────────────────────────────────────────────────────
const SCRIPTS = {
  hero: {
    text: `An era is being written.

Right now, at universities across India, your students are using AI — with or without your guidance. They aren't waiting for permission. They're building habits, forming dependencies, and arriving at outcomes you didn't design.

The question isn't whether AI reaches Kristhoo Jayenthi. It already has.

The question is whether Kristhoo Jayenthi shapes what that looks like — or inherits someone else's answer.`,
  },
  problem: {
    text: `Your faculty spend four to six hours a day on tasks a system could handle in minutes. That's not inefficiency. That's infrastructure debt, compounding every semester — pulling your best people away from the work only they can do.

Fifty percent of your students are already using AI tools you didn't authorize. They're not rogue. They're adaptive. But without structure, they're building on sand.

The chasm isn't a future threat. You're standing in it.

Every week you wait, the gap between where you are and where the institution needs to be gets wider. The cost of staying isn't zero. It's compounding.`,
  },
  solution: {
    text: `Smartslate isn't software you buy and deploy. It's a transformation you architect — and then you own it.

Three pillars. Polaris re-engineers how your institution operates: admissions, faculty load, compliance — automated, auditable, running in the background while your people focus forward.

Nova rebuilds how your faculty teach. AI-augmented curriculum design. Adaptive delivery. Assessment that actually reflects mastery.

Constellation makes every student's learning path personal — and measurable — for the first time.

This isn't a feature list. It's a new operating model for a university that intends to lead.`,
  },
  outcomes: {
    text: `Here's what the numbers say — and you can hold us to these.

Seventy percent of your operational overhead: automated. That's not a rounding-error improvement. That's your institution running on a fundamentally different cost structure.

Two hundred hours per faculty member, recovered every year. Not saved. Returned. To curriculum. To mentorship. To the craft of teaching that drew your people to this work in the first place.

Eighty percent of your graduating students, AI-certified. Not participants in a workshop — genuinely certified. Before they leave your campus.

Nine months to full return on investment. At the realistic scenario, we're guaranteeing it.

These aren't projections from a sales deck. This is the contract we're willing to sign.`,
  },
  cta: {
    text: `The infrastructure is ready. The playbook is proven. The team is here.

Institutions that move this year set the standard for AI-native higher education in India. That standard becomes the benchmark every institution that follows will be measured against.

Institutions that wait don't stand still. They fall behind a standard they had no hand in writing.

Kristhoo Jayenthi has always been first. This is that moment.

The window is open. Begin the conversation.`,
  },
};

// ── CLI args ──────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const sectionIdx = args.indexOf('--section');
const voiceIdx = args.indexOf('--voice');
const sectionArg = sectionIdx >= 0 ? args[sectionIdx + 1] : undefined;
const voiceArg = voiceIdx >= 0 ? args[voiceIdx + 1] : 'IndianMale';
const sections = sectionArg ? [sectionArg] : Object.keys(SCRIPTS);

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error('Error: ELEVENLABS_API_KEY environment variable is required.');
  process.exit(1);
}

const VOICE_ID = VOICE_IDS[voiceArg];
if (!VOICE_ID) {
  console.error(`Error: Unknown voice "${voiceArg}". Options: ${Object.keys(VOICE_IDS).join(', ')}`);
  process.exit(1);
}

if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR, { recursive: true });

// ── Generate ──────────────────────────────────────────────────────────────────
for (const sectionId of sections) {
  const script = SCRIPTS[sectionId];
  if (!script) {
    console.warn(`Warning: Unknown section "${sectionId}", skipping.`);
    continue;
  }

  console.log(`\n▶ Generating ${sectionId} (voice: ${voiceArg})…`);

  const rawPath = path.join(AUDIO_DIR, `${sectionId}_raw.mp3`);
  const outPath = path.join(AUDIO_DIR, `${sectionId}.mp3`);

  // POST to ElevenLabs TTS API
  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        Accept: 'audio/mpeg',
      },
      body: JSON.stringify({
        text: script.text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.42,
          similarity_boost: 0.8,
          style: 0.35,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error(`  ✗ API error (${response.status}): ${err}`);
    continue;
  }

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(rawPath, Buffer.from(buffer));
  console.log(`  ✓ Raw audio saved (${(buffer.byteLength / 1024).toFixed(0)} KB)`);

  // Re-encode to mono 96 kbps via ffmpeg
  try {
    execSync(
      `ffmpeg -y -i "${rawPath}" -ac 1 -b:a 96k "${outPath}"`,
      { stdio: 'inherit' }
    );
    fs.unlinkSync(rawPath);
    const finalStat = fs.statSync(outPath);
    console.log(`  ✓ Encoded: ${outPath} (${(finalStat.size / 1024).toFixed(0)} KB, mono 96kbps)`);
  } catch {
    console.warn(`  ⚠ ffmpeg not found or failed — keeping raw file at ${rawPath}`);
    if (fs.existsSync(rawPath)) fs.renameSync(rawPath, outPath);
  }
}

console.log('\n✅ Generation complete.');
