#!/usr/bin/env node
/**
 * Generate section voiceovers via Google Cloud Text-to-Speech.
 * Uses en-IN-Neural2 voices — natural Indian English accent, correct
 * pronunciation of names like Kristu Jayanti.
 *
 * Setup:
 *   1. Go to https://console.cloud.google.com/
 *   2. Create a project (or use an existing one)
 *   3. Enable "Cloud Text-to-Speech API"
 *      → APIs & Services → Enable APIs → search "Text-to-Speech"
 *   4. Create an API key
 *      → APIs & Services → Credentials → Create Credentials → API Key
 *   5. Run:
 *        GOOGLE_TTS_API_KEY=AIza... node scripts/generate-voiceovers-google.mjs
 *
 * Voice options:
 *   en-IN-Neural2-B   — male, authoritative, clear  (default)
 *   en-IN-Neural2-C   — male, warm, narrative tone
 *
 * Usage:
 *   node scripts/generate-voiceovers-google.mjs
 *   node scripts/generate-voiceovers-google.mjs --section hero
 *   node scripts/generate-voiceovers-google.mjs --voice en-IN-Neural2-C
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const AUDIO_DIR = path.join(ROOT, 'public', 'audio');

const API_KEY = process.env.GOOGLE_TTS_API_KEY;
if (!API_KEY) {
  console.error('Error: GOOGLE_TTS_API_KEY environment variable is required.');
  console.error('\nSetup: https://console.cloud.google.com/ → APIs & Services → Credentials → API Key');
  process.exit(1);
}

const args = process.argv.slice(2);
const sectionArg = args[args.indexOf('--section') + 1];
const voiceName = args[args.indexOf('--voice') + 1] ?? 'en-IN-Neural2-B';

// ── SSML scripts — Indian English, documentary editorial, second-person ────────
// Phoneme markup for Indian name pronunciation:
//   Kristu  → "Kris-thoo"  (dental th, long 'u' — Kannada/South Indian)
//   Jayanti → "Jayan-thi"  (dental th — Kannada/South Indian)
// SSML <break> tags add natural pauses at paragraph boundaries.
// speakingRate 0.91 gives deliberate, documentary gravitas.
const SCRIPTS = {
  hero: `<speak>
An era is being written.
<break time="600ms"/>
Right now, at universities across India, your students are using AI — with or without your guidance. They are not waiting for permission. They are building habits, forming dependencies, and arriving at outcomes you did not design.
<break time="500ms"/>
The question is not whether AI reaches <phoneme alphabet="ipa" ph="ˈkrɪstʰuː">Kristu</phoneme> <phoneme alphabet="ipa" ph="dʒəˈjɑːntɪ">Jayanti</phoneme>. It already has.
<break time="400ms"/>
The question is whether <phoneme alphabet="ipa" ph="ˈkrɪstʰuː">Kristu</phoneme> <phoneme alphabet="ipa" ph="dʒəˈjɑːntɪ">Jayanti</phoneme> shapes what that looks like — or inherits someone else's answer.
</speak>`,

  problem: `<speak>
Your faculty spend four to six hours a day on tasks a system could handle in minutes. That is not inefficiency.
<break time="400ms"/>
That is infrastructure debt, compounding every semester — pulling your best people away from the work only they can do.
<break time="600ms"/>
Fifty percent of your students are already using AI tools you did not authorise. They are not rogue. They are adaptive. But without structure, they are building on sand.
<break time="600ms"/>
The chasm is not a future threat. You are standing in it.
<break time="500ms"/>
Every week you wait, the gap between where you are and where the institution needs to be gets wider. Not slightly wider — structurally wider.
<break time="400ms"/>
The cost of staying is not zero. It is compounding.
</speak>`,

  solution: `<speak>
<phoneme alphabet="ipa" ph="smɑːrtˈsleɪt">Smartslate</phoneme> is not software you buy and deploy. It is a transformation you architect — and then you own it.
<break time="600ms"/>
Three pillars.
<break time="300ms"/>
Nehemiah re-engineers how your institution operates: admissions, faculty load, compliance — automated, auditable, running in the background while your people focus forward.
<break time="500ms"/>
Elijah rebuilds how your faculty teach. AI-augmented curriculum design. Adaptive delivery. Assessment that actually reflects mastery.
<break time="500ms"/>
Daniel makes every student's learning path personal — and measurable — for the first time.
<break time="600ms"/>
This is not a feature list. It is a new operating model for a university that intends to lead.
</speak>`,

  nehemiah_naming: `<speak>
Nehemiah was one of the most trusted administrators in the ancient world — a man the king of Persia trusted with his life.
<break time="400ms"/>
He arrived at a broken institution, conducted a silent night audit before anyone knew his plans, and rebuilt it — systematically, accountably, on time.
<break time="400ms"/>
He restored compliance, unified records, reorganised governance — all while everyone else focused forward.
<break time="500ms"/>
That is not a metaphor. That is the job description.
<break time="400ms"/>
We named your operations layer Nehemiah because that is exactly what it does — and because this institution, of all institutions, knows what it means to build something that lasts.
</speak>`,

  elijah_naming: `<speak>
Elijah is the spiritual patriarch of the Carmelite tradition — the prophet on Mount Carmel from whom your congregation draws its identity.
<break time="400ms"/>
His greatest act was not calling fire from heaven. It was what came after.
<break time="300ms"/>
Exhausted, restored, and sent back — more powerful than before.
<break time="400ms"/>
He passed his mantle to Elisha, who received a double portion of his spirit.
<break time="500ms"/>
That is what this pillar does for your faculty. Not a tool. A transfer.
<break time="400ms"/>
Your educators leave with something they did not walk in with.
<break time="400ms"/>
We named it Elijah because <phoneme alphabet="ipa" ph="ˈkrɪstʰuː">Kristu</phoneme> <phoneme alphabet="ipa" ph="dʒəˈjɑːntɪ">Jayanti</phoneme>, of all institutions, understands exactly what that name carries.
</speak>`,

  daniel_naming: `<speak>
Daniel was enrolled as a student in the most powerful institution of the ancient world.
<break time="400ms"/>
Trained alongside the empire's best minds — and assessed.
<break time="300ms"/>
He was found ten times sharper than all of them.
<break time="500ms"/>
He never surrendered what he was formed to be.
<break time="500ms"/>
Your institution's own words say it: faith in God is the beginning of true wisdom.
<break time="400ms"/>
Daniel lived that before anyone wrote it down.
<break time="500ms"/>
He is not just a name for your student platform.
<break time="300ms"/>
He is the graduate <phoneme alphabet="ipa" ph="ˈkrɪstʰuː">Kristu</phoneme> <phoneme alphabet="ipa" ph="dʒəˈjɑːntɪ">Jayanti</phoneme> has always been trying to produce.
<break time="300ms"/>
Now you have a system designed to deliver him.
</speak>`,

  outcomes: `<speak>
Here is what the numbers say — and you can hold us to these.
<break time="600ms"/>
Seventy percent of your operational overhead: automated. That is not a rounding-error improvement. That is your institution running on a fundamentally different cost structure.
<break time="600ms"/>
Two hundred hours per faculty member, recovered every year. Not saved — returned. To curriculum. To mentorship. To the craft of teaching that drew your people to this work in the first place.
<break time="600ms"/>
Eighty percent of your graduating students, AI-certified. Not participants in a workshop — genuinely certified. Before they leave your campus.
<break time="600ms"/>
Nine months to full return on investment. At the realistic scenario, we are guaranteeing it.
<break time="500ms"/>
These are not projections from a sales deck. This is the contract we are willing to sign.
</speak>`,

  cta: `<speak>
The infrastructure is ready. The playbook is proven. The team is here.
<break time="600ms"/>
Institutions that move this year set the standard for AI-native higher education in India. That standard becomes the benchmark every institution that follows will be measured against.
<break time="500ms"/>
Institutions that wait do not stand still. They fall behind a standard they had no hand in writing.
<break time="600ms"/>
<phoneme alphabet="ipa" ph="ˈkrɪstʰuː">Kristu</phoneme> <phoneme alphabet="ipa" ph="dʒəˈjɑːntɪ">Jayanti</phoneme> has always been first.
<break time="300ms"/>
This is that moment.
<break time="600ms"/>
The window is open. Begin the conversation.
</speak>`,
};

const SECTION_ORDER = ['hero', 'problem', 'solution', 'outcomes', 'cta', 'nehemiah_naming', 'elijah_naming', 'daniel_naming'];
const sections = sectionArg ? [sectionArg] : SECTION_ORDER;

if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR, { recursive: true });

for (const sectionId of sections) {
  const ssml = SCRIPTS[sectionId];
  if (!ssml) {
    console.warn(`Warning: Unknown section "${sectionId}", skipping.`);
    continue;
  }

  console.log(`\n▶ Generating ${sectionId} (voice: ${voiceName})…`);

  const response = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: { ssml },
        voice: {
          languageCode: 'en-IN',
          name: voiceName,
          ssmlGender: 'MALE',
        },
        audioConfig: {
          audioEncoding: 'MP3',
          speakingRate: 0.91,
          pitch: -2.0,
          sampleRateHertz: 24000,
          effectsProfileId: ['large-home-entertainment-class-device'],
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error(`  ✗ API error (${response.status}): ${err}`);
    continue;
  }

  const json = await response.json();
  const audioBuffer = Buffer.from(json.audioContent, 'base64');
  const outPath = path.join(AUDIO_DIR, `${sectionId}.mp3`);
  fs.writeFileSync(outPath, audioBuffer);
  console.log(`  ✓ Saved: ${outPath} (${(audioBuffer.length / 1024).toFixed(0)} KB)`);
}

console.log('\n✅ Generation complete. Files saved to public/audio/');
