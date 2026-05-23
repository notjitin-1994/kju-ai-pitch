#!/usr/bin/env node
/**
 * Build the single combined narration track.
 *
 * Pipeline:
 *   1. Concat hero → problem → solution → outcomes → cta with 1.2s gaps
 *   2. Loop BGM to match narration length
 *   3. Mix: narration full volume, BGM ducked to ~-22dB and side-chain compressed
 *      under narration so dialogue stays clear
 *   4. Output to public/audio/narration.mp3
 *
 * Run:
 *   node scripts/build-narration.mjs
 */

import { execFileSync, spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ffmpegPath from 'ffmpeg-static';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const AUDIO_DIR = path.join(ROOT, 'public', 'audio');

const SECTIONS = ['hero', 'problem', 'solution', 'outcomes', 'cta'];
const GAP_SECONDS = 1.2;
const BGM_VOLUME = 0.18;      // ~-15dB relative to narration
const FADE_IN = 2.5;
const FADE_OUT = 3.5;

const inputs = SECTIONS.map((id) => path.join(AUDIO_DIR, `${id}.mp3`));
for (const f of inputs) {
  if (!fs.existsSync(f)) {
    console.error(`Missing: ${f}`);
    process.exit(1);
  }
}

const bgmPath = path.join(AUDIO_DIR, 'bgm-raw.mp3');
if (!fs.existsSync(bgmPath)) {
  console.error(`Missing BGM: ${bgmPath}`);
  process.exit(1);
}

const outPath = path.join(AUDIO_DIR, 'narration.mp3');
const concatPath = path.join(AUDIO_DIR, '_concat.mp3');
const silencePath = path.join(AUDIO_DIR, '_silence.mp3');

console.log('▶ Step 1: Generate silence gap');
execFileSync(ffmpegPath, [
  '-y',
  '-f', 'lavfi',
  '-i', `anullsrc=channel_layout=mono:sample_rate=44100`,
  '-t', String(GAP_SECONDS),
  '-q:a', '9',
  '-acodec', 'libmp3lame',
  silencePath,
], { stdio: ['ignore', 'ignore', 'inherit'] });

console.log('▶ Step 2: Concat narration sections with gaps');
const concatList = path.join(AUDIO_DIR, '_concat.txt');
const lines = [];
inputs.forEach((f, i) => {
  lines.push(`file '${f.replace(/\\/g, '/')}'`);
  if (i < inputs.length - 1) lines.push(`file '${silencePath.replace(/\\/g, '/')}'`);
});
fs.writeFileSync(concatList, lines.join('\n'));

execFileSync(ffmpegPath, [
  '-y',
  '-f', 'concat',
  '-safe', '0',
  '-i', concatList,
  '-c:a', 'libmp3lame',
  '-b:a', '128k',
  '-ac', '1',
  concatPath,
], { stdio: ['ignore', 'ignore', 'inherit'] });

console.log('▶ Step 3: Probe narration duration');
const probe = spawnSync(ffmpegPath, ['-i', concatPath, '-f', 'null', '-'], {
  encoding: 'utf8',
});
const probeStderr = probe.stderr || '';
const durMatch = probeStderr.match(/Duration:\s*(\d+):(\d+):(\d+\.\d+)/);
if (!durMatch) {
  console.error('Could not detect narration duration');
  process.exit(1);
}
const hours = parseInt(durMatch[1]);
const minutes = parseInt(durMatch[2]);
const seconds = parseFloat(durMatch[3]);
const totalSeconds = hours * 3600 + minutes * 60 + seconds;
console.log(`   Narration length: ${totalSeconds.toFixed(2)}s`);

console.log('▶ Step 4: Mix narration + BGM (BGM looped, ducked, faded)');
// filter_complex breakdown:
//   [1:a] aloop, atrim, afade (BGM prep)
//   [0:a] anull (narration passthrough)
//   sidechaincompress: BGM ducks when narration plays
//   amix: final blend
execFileSync(ffmpegPath, [
  '-y',
  '-i', concatPath,
  '-stream_loop', '-1',
  '-i', bgmPath,
  '-filter_complex',
    `[1:a]volume=${BGM_VOLUME},atrim=0:${totalSeconds + 0.5},` +
    `afade=t=in:st=0:d=${FADE_IN},afade=t=out:st=${totalSeconds - FADE_OUT}:d=${FADE_OUT},` +
    `aformat=channel_layouts=mono[bgm];` +
    `[0:a]aformat=channel_layouts=mono,asplit=2[narr1][narr2];` +
    `[bgm][narr1]sidechaincompress=threshold=0.05:ratio=8:attack=5:release=400[ducked];` +
    `[narr2][ducked]amix=inputs=2:duration=first:dropout_transition=0:normalize=0[mix]`,
  '-map', '[mix]',
  '-c:a', 'libmp3lame',
  '-b:a', '128k',
  '-ac', '1',
  outPath,
], { stdio: ['ignore', 'ignore', 'inherit'] });

console.log('▶ Step 5: Cleanup intermediates');
fs.unlinkSync(silencePath);
fs.unlinkSync(concatPath);
fs.unlinkSync(concatList);

const stat = fs.statSync(outPath);
console.log(`\n✅ Built: ${outPath} (${(stat.size / 1024).toFixed(0)} KB, ~${totalSeconds.toFixed(0)}s)`);
