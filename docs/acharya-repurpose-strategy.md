# Repurposing the Cognitive Campus Proposal for the Acharya Group of Institutions
### A working brainstorm + research brief — Smartslate, June 2026

This document is the thinking behind the rebrand. It answers one question: **what actually
changes when we move the "Project: Institutional Intelligence" proposal from a single university
(Kristu Jayanti) to a multi-institution group (Acharya)?** The honest answer is: the *spine* of
the pitch is unchanged, but three structural facts about Acharya let us tell a bigger, harder-to-
refuse story.

---

## 1. What we know about Acharya (researched)

> ⚠️ **Verify before client-facing use.** These figures were gathered from public web sources
> (Wikipedia, Acharya's own site copy quoted in search results, college-aggregator sites). They
> vary by source and year. Confirm with Acharya's official fact sheet before printing them in a
> deck or contract.

| Fact | Value | Confidence | Source type |
|---|---|---|---|
| Founded | 1990, by Sri B. Premnath Reddy, under JMJ Educational Society | High | Wikipedia + aggregators |
| Campus | ~120 acres, Soldevanahalli / Hessarghatta Main Road, Bengaluru | High | Multiple |
| Institutions in the group | 11 | Medium | Acharya site copy |
| Programmes / streams | 100+ programmes across ~50 streams | Medium | Acharya site copy |
| Students | 15,000+ (some sources say 12,000+) | Medium | Aggregators vary |
| International reach | Students from 75+ countries | Medium | Multiple |
| Flagships | AIT (engineering, est. 2000, VTU), AIGS (graduate studies), ABBS (B-School), Acharya Polytechnic, + nursing / pharmacy / design / hotel mgmt / law | High | Multiple |
| Accreditation | NAAC-accredited (one source cites B++ for AIT), AICTE-approved, NBA-accredited programmes, VTU-affiliated | Medium | Aggregators |
| Vision statement | *"…a fountainhead of innovative human enterprise, with inspirational initiatives for Academic Excellence."* | High | Acharya site |

**Open data questions to close with the client:**
- Exact current NAAC grade and cycle, and any NIRF ranking band.
- Current total student headcount and faculty headcount (we use 15,000+ / 1,000+ as placeholders).
- The precise list and names of the 11 institutions.
- Placement stats (one source: ~85% placement, ₹6 LPA avg, ₹65 LPA high, ~550 recruiters) — confirm.

---

## 2. The single biggest repositioning move: **Campus → Network**

KJU was one university. Acharya is a **composite group of 11 institutions on one campus**. That is
not a cosmetic difference — it is the core of the new narrative:

- **Old:** "Architect the Cognitive *Campus*."
- **New:** "Architect the Cognitive *Campus Network* — one intelligence layer, eleven institutions."

Why it lands harder:
1. **Leverage.** One deployment compounds across 11 institutions. The flywheel turns for everyone at once. This makes the ROI math *better*, not just bigger.
2. **Moat.** No regional competitor has 11 institutions on one campus to unify. "One layer, eleven institutions" is a claim only Acharya can make.
3. **Data gravity.** A unified group data layer spanning engineering → management → health sciences → design is a richer training and decision substrate than any single college can assemble.

**Tagline candidates** (replace KJU's "redefine the regional standard"):
- "One layer. Eleven institutions. One era."
- "The first AI-native campus *network* in India."
- "Eleven institutions, one intelligence."

---

## 3. Three Acharya-specific advantages to weave through every section

1. **An engineering flagship as the lighthouse (AIT).**
   KJU's pilot was generic. Acharya has AIT — a VTU engineering college with technical faculty and
   students who adopt AI fastest. *Recommendation:* make AIT the named Phase-2 "Vanguard" pilot.
   Fast, credible proof, then radiate outward to management, design, health sciences.

2. **Stream breadth = a richer Pillar 3.**
   KJU's stream story was Arts / Commerce / Science. Acharya adds **engineering, design, health
   sciences, hospitality, and law**. The stream-specific AI playbook becomes the most comprehensive
   in the region — a genuine selling point, not filler. (See the expanded Pillar-3 table in VISION.md.)

3. **75+ countries = international concierge as a hero feature.**
   Reframe the 24/7 AI Concierge (Pillar 1) as **multilingual and international-admissions-grade**.
   For a campus drawing students from 75 countries, this is a revenue lever (yield on international
   applicants), not a support cost-saver.

---

## 4. Section-by-section redraft guide

| Asset | KJU version | Acharya redraft |
|---|---|---|
| Hero subhead | "…partnership with Kristu Jayanti University…" | "…partnership with the Acharya Group of Institutions…" ✅ done |
| Identifier | `KJU_COGNITIVE_V1.0` | `ACHARYA_COGNITIVE_V1.0` ✅ done |
| Problem / "Innovation Gap" | Single-institution framing | Add the "eleven institutions, one standard" coordination-cost angle |
| Solution / Pillars | "Cognitive Campus" | "Cognitive Campus *Network*"; expand Pillar-3 streams; multilingual concierge in Pillar 1 |
| Roadmap Phase 2 | Generic "3 lead departments" | Name **AIT** as the lighthouse pilot |
| Roadmap Phase 3 | "all departments" | "all eleven institutions" |
| Pricing / scale line | "~10,000 users at KJU scale" | Re-scope to ~15,000+ students + 1,000+ faculty across the group (re-model the seat math) |
| Outcomes / ROI | Admissions + placement | Add *international* admissions yield + *group-wide* operational savings |
| Co-brand lockup | KJU logo | Acharya logo ✅ wired (placeholder — swap official asset) |
| Vision doc | KJU vision | Rewritten ✅ (`VISION.md`) |

---

## 5. What must still be produced (cannot be auto-generated here)

These are KJU-specific media assets that the find-and-replace **cannot** fix. They need new production:

- **Hero film** — currently `kju-intro-v2.mp4` (KJU-branded). Needs an Acharya cut, or a neutral
  campus film, or remove the video dialog. The player is wired; only the source needs swapping.
- **Narration audio** (`public/audio/*.mp3`) — scripted/voiced for KJU. The *scripts* (`src/audio/
  scripts.ts`) have been text-replaced to "Acharya", but the MP3s still say "Kristu Jayanti." Regenerate
  with the TTS pipeline in `scripts/` once the new copy is locked.
- **Official Acharya logo** — placeholder SVG at `public/acharya-logo.svg`. Replace with the real asset.
- **OG/social image** (`public/og-image.png`) — still KJU-branded. Re-export for Acharya.
- **Pricing model numbers** (`src/pages/PricingPage.tsx`) — re-scope seat counts and TCO to group scale.

---

## 6. Risks & sensitivities

- **Don't over-claim accreditation.** Get the current NAAC grade right; mis-stating it in a pitch is
  a credibility own-goal.
- **Respect the multi-institution politics.** A "group" pitch touches multiple principals/deans.
  The Phase-1 Discovery framing (institution-by-institution audit) is the right de-risking posture.
- **Founder-led decision velocity.** Acharya is founder/society-led — frame the close around decisive
  leadership and legacy, which suits that structure.
- **Brand color.** Acharya's own identity skews to a red/maroon palette; this site deliberately keeps
  the **Smartslate teal** as the design system (per brief), using the Acharya logo only in the
  co-brand lockup. If the client wants their palette echoed, that's a follow-up theming pass.

---

## 7. Recommended next actions

1. Confirm the Section-1 facts with Acharya's official fact sheet.
2. Lock the "Campus Network" positioning and the AIT-lighthouse roadmap.
3. Swap in the official logo, OG image, hero film, and re-recorded narration.
4. Re-model the pricing seat math for ~15,000+ students / 1,000+ faculty.
5. Redraft the full pitch deck (`src/constants/slides.tsx`) using the section guide above — the text
   has been name-swapped, but the *story* should be re-pointed to the network/stream/lighthouse angles.
