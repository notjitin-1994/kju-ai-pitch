import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, ArrowLeft, Check, Mail,
  Users, Shield, Cpu, BookOpen, Activity,
  Cloud, Server, Database,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { MeshGradient, Vignette, GrainOverlay } from '../components/ui/atmosphere';
import { FlickeringGrid } from '../components/ui/flickering-grid';

const easeOut = [0.16, 1, 0.3, 1] as const;

// ─── Data (all figures from AI Transformation Programme Proposal, May 2026) ──

const phases = [
  {
    id: '1',
    name: 'Deep Discovery',
    timeline: 'Weeks 1–4',
    fee: '₹15L',
    includes: 'Readiness report, frontier map, custom roadmap, KPI baseline',
  },
  {
    id: '2',
    name: 'The Vanguard',
    timeline: 'Weeks 4–12',
    fee: '₹33L',
    includes: 'Platform live, 3-dept training, 3 playbooks, ROI report',
  },
  {
    id: '3',
    name: 'Full Scale Deployment',
    timeline: 'Months 4–12+',
    fee: '₹40L',
    includes: 'Institution-wide rollout, all-faculty training, literacy programme',
  },
] as const;

const commitmentPillars = [
  {
    title: 'Contractually Defined',
    body: 'Every deliverable, KPI, and timeline written into the contract. No ambiguity.',
    accent: '#A7DADB',
  },
  {
    title: 'Data-Backed Reporting',
    body: 'Quarterly business reviews with full adoption data and uplift evidence provided to KJU leadership.',
    accent: '#e8c789',
  },
  {
    title: 'No Technology Markup',
    body: 'KJU pays tech vendors directly. Smartslate fees are professional services only.',
    accent: '#A7DADB',
  },
] as const;

const directTechItems = [
  'Claude API — AI inference (Anthropic)',
  'AWS India — application hosting',
  'Indian cloud GPU instances — Hybrid Phase B only',
  'On-campus RTX 5090 cluster — On-Prem only',
  'Annual electricity + maintenance — On-Prem only',
] as const;

const paths = [
  {
    id: '1',
    Icon: Cloud,
    name: 'Cloud Only',
    badge: 'Year 1 · Recommended Start',
    description:
      'Zero capital expenditure. Live in 3–5 days. All AI inference via Claude API (Haiku for concierge, Sonnet for faculty tools). Application on AWS India. The fastest path to a live, measurable transformation.',
    glance: [
      { label: 'Time to Live', value: '14–21 Days' },
      { label: 'KJU Capital Outlay', value: '₹0' },
      { label: 'Data Location', value: 'AWS India' },
      { label: '5-Year Tech TCO', value: '~₹28L' },
    ],
    smartslateFee: '~₹88L',
    techNote: 'Claude API + AWS Hosting: ₹3.3L / year (Year 1), grows with adoption',
    yearOneTotal: '₹91.3L',
    featured: true,
    accent: '#A7DADB',
  },
  {
    id: '2',
    Icon: Server,
    name: 'Phased Hybrid',
    badge: 'Year 2 · Data Sovereignty Migration',
    description:
      'Migrate from cloud to Indian cloud GPU (AceCloud A100) when usage triggers cost crossover. Full India data residency from Phase B. Builds on the Year 1 cloud foundation with zero additional CapEx.',
    glance: [
      { label: 'Time to Live', value: '14–21 Days' },
      { label: 'KJU Capital Outlay', value: '₹0' },
      { label: 'Data Location', value: 'Full India (Phase B+)' },
      { label: '5-Year Tech TCO', value: '₹44.6L' },
    ],
    smartslateFee: '~₹94L',
    techNote: 'Cloud API Phase A: ₹3.3L / year → AceCloud GPU Phase B: ~₹9L by Year 3',
    yearOneTotal: '₹97.3L',
    featured: false,
    accent: '#e8c789',
  },
  {
    id: '3',
    Icon: Database,
    name: 'On-Prem Infrastructure',
    badge: 'Year 3+ · Full Institutional Ownership',
    description:
      '4× RTX 5090 GPU cluster at KJU campus. All models run locally — data never leaves the institution. Permanent capital asset built after the programme is proven and embedded at scale.',
    glance: [
      { label: 'Time to Live', value: '4–5 Weeks' },
      { label: 'KJU Capital Outlay', value: '₹35L (to vendors)' },
      { label: 'Data Location', value: 'Full On-Campus' },
      { label: '5-Year Tech TCO', value: '₹72.6L (stable)' },
    ],
    smartslateFee: '~₹98L',
    techNote: 'Hardware: ₹35L CapEx · Elec + AMC: ₹3.1–4.2L / yr · Software: ₹0 (open source)',
    yearOneTotal: '₹1.36 Cr',
    featured: false,
    accent: '#A7DADB',
  },
] as const;

const kpiMetrics = [
  {
    num: '≥70%',
    label: 'Admin overhead reduction',
    detail:
      'Routine student queries — schedules, fees, hostel, registrations — resolved autonomously in <30 seconds, 24/7. Staff redirected to high-value student interactions.',
    accent: '#A7DADB',
  },
  {
    num: '40–60%',
    label: 'Faculty preparation time saved',
    detail:
      'Measured weekly against a pre-deployment baseline. Lesson plans generated in <20 minutes vs 2–3 hours pre-deployment. Reclaimed hours go directly back to student mentorship.',
    accent: '#e8c789',
  },
  {
    num: '>80%',
    label: 'Students AI-certified institution-wide',
    detail:
      'AI literacy embedded across all streams — not an elective. Every student builds a verifiable, institutionally-issued credential that differentiates KJU alumni in every hiring cycle.',
    accent: '#A7DADB',
  },
] as const;

const programmePillars = [
  {
    Icon: Cpu,
    pillar: 'Operations & Management',
    name: 'AI-Enabled Campus',
    items: [
      '24/7 Student Concierge (>90% autonomous resolution)',
      'Predictive Success Dashboard (<72hr at-risk flagging)',
      'Unified Institutional Knowledge Base',
      '≥70% admin overhead reduction',
    ],
  },
  {
    Icon: Users,
    pillar: 'Teaching & Efficiency',
    name: 'AI-Augmented Faculty',
    items: [
      '8-Week Subject-Specific Training Programme',
      'Subject Playbooks: Arts, Commerce & Science',
      'AI-Assisted Preparation (<20 min vs 2–3 hrs)',
      '40–60% Preparation Time Saved',
    ],
  },
  {
    Icon: BookOpen,
    pillar: 'Learning & Outcomes',
    name: 'AI-First Students',
    items: [
      'Mandatory AI Literacy Curriculum (all streams)',
      'AI-Augmented Assignments: applied skills, not shortcuts',
      'Enterprise-Grade AI Lab (Infosys / Deloitte standard)',
      'Certified AI Competency Credential at graduation',
    ],
  },
  {
    Icon: Shield,
    pillar: 'Partnership Continuity',
    name: 'Annual Retainer (Year 2+)',
    items: [
      'Continuous AI Model Updates',
      'New Faculty Cohort Onboarding',
      'Quarterly Business Reviews',
      'Priority Support & Advisory',
    ],
  },
] as const;

const finRows = [
  { label: 'Year 1 Smartslate Service Fee', cloud: '₹88L',   hybrid: '₹94L',   onprem: '₹98L',              bold: false },
  { label: 'Year 1 KJU Direct Tech Costs',  cloud: '₹3.3L',  hybrid: '₹3.3L',  onprem: '₹38.1L (incl. HW)', bold: false },
  { label: 'Year 1 Total Investment',        cloud: '₹91.3L', hybrid: '₹97.3L', onprem: '₹1.36 Cr',          bold: true  },
  { label: 'Year 2 Smartslate Retainer',    cloud: '₹44L',   hybrid: '₹44L',   onprem: '₹44L',              bold: false },
  { label: 'Year 2 KJU Tech Costs',         cloud: '₹4.3L',  hybrid: '₹9.1L',  onprem: '₹3.6L',             bold: false },
  { label: 'Year 3 Smartslate Retainer',    cloud: '₹44L',   hybrid: '₹44L',   onprem: '₹44L',              bold: false },
  { label: 'Year 3 KJU Tech Costs',         cloud: '₹5.6L',  hybrid: '₹13.0L', onprem: '₹4.2L',             bold: false },
  { label: '5-Year Technology TCO (KJU direct)', cloud: '₹27.7L', hybrid: '₹44.6L', onprem: '₹72.6L',       bold: false },
] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatINR = (lakhs: number): string => {
  if (lakhs >= 100) return `₹${(lakhs / 100).toFixed(1)} Cr`;
  return `₹${Math.round(lakhs)} L`;
};

// ─── Scroll Progress ─────────────────────────────────────────────────────────
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[95] bg-gradient-to-r from-[#A7DADB]/0 via-[#A7DADB] to-[#e8c789]"
    />
  );
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '/', label: 'Home', route: true },
    { href: '/#problem', label: 'Premise', route: false },
    { href: '/#solution', label: 'Solution', route: false },
    { href: '/#outcomes', label: 'Outcomes', route: false },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[90]"
      style={{ transition: 'background-color 350ms var(--ease-out-expo), backdrop-filter 350ms var(--ease-out-expo)' }}
    >
      <div
        className={`flex items-center justify-between px-6 md:px-12 lg:px-24 h-20 md:h-[88px] border-b ${scrolled ? 'border-white/[0.06] bg-[#020C1B]/75 backdrop-blur-2xl' : 'border-transparent bg-transparent backdrop-blur-0'}`}
        style={{ transition: 'inherit' }}
      >
        <Link to="/" aria-label="Smartslate home" className="flex items-center gap-3">
          <Logo />
        </Link>
        <div className="hidden lg:flex items-center gap-10">
          {links.map((l) => {
            const cls = 'group relative font-display text-xs tracking-[0.3em] uppercase font-bold text-[#b0c5c6]/85 hover:text-white';
            const sty = { transition: 'color 200ms var(--ease-out-expo)' };
            const bar = (
              <span aria-hidden className="absolute -bottom-2 left-0 right-0 h-px bg-[#A7DADB] origin-left scale-x-0 group-hover:scale-x-100" style={{ transition: 'transform 350ms var(--ease-out-expo)' }} />
            );
            return l.route
              ? <Link key={l.href} to={l.href} className={cls} style={sty}>{l.label}{bar}</Link>
              : <a key={l.href} href={l.href} className={cls} style={sty}>{l.label}{bar}</a>;
          })}
        </div>
        <a
          href="mailto:hello@smartslate.io?subject=AI%20Transformation%20Programme%20Enquiry"
          className="press-scale inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[#A7DADB] text-[#020C1B] font-display text-xs tracking-[0.22em] uppercase font-bold"
          style={{ boxShadow: '0 8px 22px -8px rgba(167,218,219,0.55), inset 0 1px 0 rgba(255,255,255,0.4)', transition: 'transform 160ms var(--ease-out-expo), box-shadow 220ms var(--ease-out-expo)' }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#020C1B]/80 animate-soft-pulse" />
          Reach Out
        </a>
      </div>
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const PricingHero: React.FC = () => (
  <section className="relative min-h-[100dvh] flex items-center px-6 md:px-12 lg:px-24 overflow-hidden pt-24">
    <MeshGradient intensity="med" />
    <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_65%_50%,rgba(0,0,0,0.55)_0%,transparent_68%)]">
      <FlickeringGrid color="rgb(232,199,137)" squareSize={3} gridGap={11} flickerChance={0.09} maxOpacity={0.1} />
    </div>
    <Vignette strength={0.5} />

    <div className="relative z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12 py-20">
      <div className="lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#e8c789] animate-soft-pulse" />
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#e8c789] font-bold">
            Part 2 · Investment & Pricing
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.1, ease: easeOut }}
          className="mt-10 font-display font-bold text-white leading-[0.94] tracking-[-0.03em] text-[clamp(3.5rem,7.5vw,8rem)]"
        >
          The Economics
          <br />
          <span className="font-serif-display italic font-normal text-[#e8c789]">of Intelligence.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.22, ease: easeOut }}
          className="mt-10 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[58ch]"
        >
          Three implementation options. One service fee structure. Every deliverable, KPI, and timeline contractually defined. No ambiguity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.34, ease: easeOut }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <a
            href="#fee-structure"
            className="press-scale group inline-flex items-center gap-3 rounded-full px-7 py-4 bg-[#A7DADB] text-[#020C1B] font-display font-bold text-sm tracking-[0.18em] uppercase"
            style={{ boxShadow: '0 12px 32px -10px rgba(167,218,219,0.55), inset 0 1px 0 rgba(255,255,255,0.4)', transition: 'transform 160ms var(--ease-out-expo), box-shadow 250ms var(--ease-out-expo)' }}
          >
            View Fee Structure
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </a>
          <a
            href="#roi"
            className="press-scale inline-flex items-center gap-3 rounded-full px-7 py-4 border border-white/15 bg-white/[0.04] text-white font-display font-bold text-sm tracking-[0.18em] uppercase backdrop-blur-md"
            style={{ transition: 'background-color 220ms var(--ease-out-expo), border-color 220ms var(--ease-out-expo), transform 160ms var(--ease-out-expo)' }}
          >
            <Activity className="h-4 w-4 text-[#A7DADB]" strokeWidth={2} />
            Calculate Your ROI
          </a>
        </motion.div>
      </div>

      {/* Stats card — all figures from PDF */}
      <div className="lg:col-span-4 lg:col-start-9 lg:self-center">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.95, delay: 0.28, ease: easeOut }}
          className="rounded-[24px] border border-white/[0.08] bg-[#0a1729]/80 backdrop-blur-xl glass-refract p-8 space-y-8"
        >
          {[
            { v: '₹88L', sub: 'Year 1 Smartslate service fee — all three implementation options', accent: '#e8c789' },
            { v: '6 months', sub: 'Phase 1 through Phase 3: Week 1 to Month 12+ full campus deployment', accent: '#A7DADB' },
            { v: '~10,000', sub: 'Users at KJU scale: students, faculty, and administrative staff', accent: '#A7DADB' },
          ].map((s, i) => (
            <div key={i} className={i > 0 ? 'pt-8 border-t border-white/[0.06]' : ''}>
              <span className="font-display font-bold tabular-nums tracking-tight text-[2.4rem] leading-none" style={{ color: s.accent }}>
                {s.v}
              </span>
              <p className="mt-2 font-body font-light text-[#b0c5c6] text-sm leading-[1.55]">{s.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Contractual KPIs ─────────────────────────────────────────────────────────
const ContractualKPIs: React.FC = () => (
  <section className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
    <MeshGradient intensity="low" />
    <div className="relative z-10 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-20 md:mb-28">
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#e8c789] animate-soft-pulse" />
            <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#e8c789] font-bold">
              Binding Commitments
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
            className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
          >
            Not aspirational
          </motion.p>
        </div>
        <div className="lg:col-span-9">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: easeOut }}
            className="font-display font-bold text-white leading-[1] tracking-[-0.025em] text-[clamp(2.5rem,5vw,5rem)]"
          >
            Contractual KPIs.
            <br />
            <span className="font-serif-display italic font-normal text-[#e8c789]">Reported every quarter.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
            className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
          >
            Every KPI is measured from deployment Day 1. If a target is not on track, Smartslate flags it proactively and delivers a remediation plan within 14 days.
          </motion.p>
        </div>
      </div>

      <div className="space-y-2">
        {kpiMetrics.map((m, i) => (
          <motion.article
            key={m.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: i * 0.08, ease: easeOut }}
            className="relative grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-10 py-14 md:py-20 border-t border-white/[0.07] group"
          >
            <span
              aria-hidden
              className="absolute top-0 left-0 h-px w-0 group-hover:w-full"
              style={{ background: m.accent, opacity: 0.65, transition: 'width 800ms var(--ease-out-expo)' }}
            />
            <div className="lg:col-span-4 flex items-center">
              <span
                className="font-display font-bold tabular-nums tracking-[-0.04em] leading-[0.85] text-[clamp(5.5rem,13vw,12rem)]"
                style={{ color: m.accent }}
              >
                {m.num}
              </span>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 flex flex-col justify-center">
              <h3 className="font-display font-bold text-white text-2xl md:text-3xl tracking-tight">
                {m.label}
              </h3>
              <p className="mt-4 font-body font-light text-[#b0c5c6] text-base md:text-[17px] leading-[1.65] max-w-[52ch]">
                {m.detail}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

// ─── Fee Schedule ─────────────────────────────────────────────────────────────
const FeeSchedule: React.FC = () => (
  <section id="fee-structure" className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
    <MeshGradient intensity="low" />
    <div className="relative z-10 max-w-[1440px] mx-auto">

      {/* Section header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-20 md:mb-28">
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
            <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
              The Fee Structure
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
            className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
          >
            One structure, all options
          </motion.p>
        </div>
        <div className="lg:col-span-9">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: easeOut }}
            className="font-display font-bold text-white leading-[1] tracking-[-0.025em] text-[clamp(2.5rem,5vw,5rem)]"
          >
            Phase-by-phase.
            <br />
            <span className="font-serif-display italic font-normal text-[#A7DADB]">Fixed and transparent.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
            className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
          >
            Smartslate service fees are fixed per phase across all three implementation options. Your choice of Cloud, Hybrid, or On-Prem determines only the underlying technology costs — which KJU pays directly to vendors at zero markup.
          </motion.p>
        </div>
      </div>

      {/* Commitment pillars */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.85, ease: easeOut }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        {commitmentPillars.map((p, i) => (
          <div
            key={p.title}
            className="rounded-[20px] border border-white/[0.07] bg-[#0a1729]/60 backdrop-blur-xl glass-refract p-7"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
              <span className="font-display text-[10px] tracking-[0.4em] uppercase font-bold" style={{ color: p.accent }}>
                {p.title}
              </span>
            </div>
            <p className="font-body font-light text-[#b0c5c6] text-sm leading-[1.65]">{p.body}</p>
          </div>
        ))}
      </motion.div>

      {/* Phase fee table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: easeOut }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        {/* Smartslate service fees */}
        <div className="lg:col-span-7 rounded-[24px] border border-[#A7DADB]/18 bg-[#0a1729]/70 backdrop-blur-xl glass-refract overflow-hidden">
          <div className="px-8 py-5 border-b border-white/[0.06]">
            <span className="font-display text-[10px] tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
              Smartslate Service Fees — Paid to Smartslate, Fixed per Phase
            </span>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {phases.map((ph) => (
              <div key={ph.id} className="grid grid-cols-12 gap-4 px-8 py-5 items-start group hover:bg-white/[0.02] transition-colors duration-200">
                <div className="col-span-2">
                  <span className="font-display text-[11px] tracking-[0.35em] uppercase text-[#b0c5c6]/45 font-bold">
                    Phase {ph.id}
                  </span>
                  <p className="mt-1 font-display text-[10px] tracking-[0.25em] uppercase text-[#b0c5c6]/30 font-bold">
                    {ph.timeline}
                  </p>
                </div>
                <div className="col-span-7">
                  <p className="font-display font-bold text-white text-base tracking-tight">{ph.name}</p>
                  <p className="mt-1 font-body font-light text-[#b0c5c6]/70 text-sm leading-snug">{ph.includes}</p>
                </div>
                <div className="col-span-3 text-right">
                  <span className="font-display font-bold text-[#A7DADB] text-xl tabular-nums">{ph.fee}</span>
                </div>
              </div>
            ))}

            {/* Year 1 total */}
            <div className="grid grid-cols-12 gap-4 px-8 py-5 items-center bg-[#A7DADB]/[0.05] border-t border-[#A7DADB]/18">
              <div className="col-span-2">
                <span className="font-display text-[11px] tracking-[0.35em] uppercase text-[#A7DADB]/70 font-bold">
                  Year 1
                </span>
              </div>
              <div className="col-span-7">
                <p className="font-display font-bold text-white text-base tracking-tight">Complete Transformation Programme</p>
                <p className="mt-0.5 font-body text-[#b0c5c6]/55 text-sm">6 months · Phases 1 through 3</p>
              </div>
              <div className="col-span-3 text-right">
                <span className="font-display font-bold text-[#A7DADB] text-2xl tabular-nums">₹88L</span>
              </div>
            </div>

            {/* Retainer */}
            <div className="grid grid-cols-12 gap-4 px-8 py-5 items-center">
              <div className="col-span-2">
                <span className="font-display text-[11px] tracking-[0.35em] uppercase text-[#b0c5c6]/45 font-bold">
                  Annual
                </span>
                <p className="mt-1 font-display text-[10px] tracking-[0.25em] uppercase text-[#b0c5c6]/30 font-bold">Year 2+</p>
              </div>
              <div className="col-span-7">
                <p className="font-display font-bold text-white text-base tracking-tight">Partnership Retainer</p>
                <p className="mt-1 font-body font-light text-[#b0c5c6]/70 text-sm leading-snug">
                  Updates, new faculty onboarding, QBRs, advisory, playbook revisions
                </p>
              </div>
              <div className="col-span-3 text-right">
                <span className="font-display font-bold text-white/75 text-xl tabular-nums">₹44L / yr</span>
              </div>
            </div>
          </div>
        </div>

        {/* KJU direct tech costs */}
        <div className="lg:col-span-5 rounded-[24px] border border-white/[0.07] bg-[#0a1729]/50 backdrop-blur-xl glass-refract overflow-hidden">
          <div className="px-7 py-5 border-b border-white/[0.06]">
            <span className="font-display text-[10px] tracking-[0.45em] uppercase text-[#b0c5c6]/55 font-bold">
              KJU Direct Technology Costs
            </span>
            <p className="mt-2 font-body text-[#b0c5c6]/45 text-xs leading-relaxed">
              Paid by KJU directly to technology vendors. Smartslate charges no markup.
            </p>
          </div>
          <div className="px-7 py-6 space-y-4">
            {directTechItems.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="mt-1.5 h-1 w-3 bg-[#b0c5c6]/25 shrink-0 rounded-full" />
                <span className="font-body text-[#b0c5c6]/60 text-sm leading-snug">{item}</span>
              </div>
            ))}
          </div>
          <div className="mx-7 mb-7 rounded-[14px] border border-[#e8c789]/18 bg-[#e8c789]/[0.04] px-5 py-4">
            <p className="font-display text-[10px] tracking-[0.35em] uppercase text-[#e8c789]/70 font-bold mb-2">
              Example (Cloud Only)
            </p>
            <p className="font-body text-[#b0c5c6]/55 text-sm leading-relaxed">
              Claude API + AWS Hosting: <span className="text-white/75 font-bold">₹3.3L / year</span> in Year 1, scaling to <span className="text-white/75 font-bold">~₹10L / year</span> by Year 3 as usage grows.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Implementation Paths ─────────────────────────────────────────────────────
const ImplementationPaths: React.FC = () => (
  <section id="paths" className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
    <MeshGradient intensity="low" />
    <div className="relative z-10 max-w-[1440px] mx-auto">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-20 md:mb-28">
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
            <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
              Implementation Paths
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
            className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
          >
            Cloud → Hybrid → On-Prem
          </motion.p>
        </div>
        <div className="lg:col-span-9">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: easeOut }}
            className="font-display font-bold text-white leading-[1] tracking-[-0.025em] text-[clamp(2.5rem,5vw,5rem)]"
          >
            A three-year
            <br />
            <span className="font-serif-display italic font-normal text-[#A7DADB]">infrastructure journey.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
            className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
          >
            Start on cloud in Year 1 for the fastest live deployment. Migrate to Indian cloud GPU in Year 2 for full data sovereignty. Graduate to on-campus infrastructure in Year 3+ as a permanent institutional asset. Smartslate service fees are identical at every stage.
          </motion.p>
        </div>
      </div>

      {/* Path cards — equal thirds */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
        {paths.map((path, i) => {
          const { Icon } = path;
          return (
            <motion.article
              key={path.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, delay: i * 0.09, ease: easeOut }}
              className="group relative isolate overflow-hidden rounded-[28px] bg-[#0a1729]/70 backdrop-blur-xl glass-refract flex flex-col"
              style={{
                border: path.featured ? '1px solid rgba(232,199,137,0.28)' : '1px solid rgba(255,255,255,0.08)',
                boxShadow: path.featured ? 'inset 0 1px 0 rgba(255,255,255,0.06), 0 0 80px -24px rgba(232,199,137,0.12)' : undefined,
              }}
            >
              <div className="flex flex-col gap-6 p-8 md:p-9 flex-1">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="inline-flex items-center justify-center h-11 w-11 rounded-xl"
                    style={{ border: `1px solid ${path.accent}33`, background: `${path.accent}11` }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} style={{ color: path.accent }} />
                  </div>
                  {path.featured ? (
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 font-display text-[9px] tracking-[0.35em] uppercase font-bold text-[#e8c789]"
                      style={{ background: 'rgba(232,199,137,0.08)', border: '1px solid rgba(232,199,137,0.22)' }}
                    >
                      Recommended
                    </span>
                  ) : (
                    <span
                      className="font-display text-[10px] tracking-[0.3em] uppercase font-bold px-3 py-1 rounded-full"
                      style={{ color: `${path.accent}99`, border: `1px solid ${path.accent}22`, background: `${path.accent}08` }}
                    >
                      Path {path.id}
                    </span>
                  )}
                </div>

                <div>
                  <p className="font-display text-[10px] tracking-[0.4em] uppercase font-bold mb-2" style={{ color: `${path.accent}aa` }}>
                    {path.badge}
                  </p>
                  <h3 className="font-display font-bold text-white text-2xl tracking-tight">{path.name}</h3>
                  <p className="mt-3 font-body font-light text-[#b0c5c6] text-sm leading-[1.65]">{path.description}</p>
                </div>

                {/* Glance rows */}
                <div className="space-y-2.5">
                  {path.glance.map((g) => (
                    <div key={g.label} className="flex items-center justify-between gap-4 py-2.5 border-t border-white/[0.05]">
                      <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[#b0c5c6]/50 font-bold">{g.label}</span>
                      <span className="font-display font-bold text-white text-sm tabular-nums">{g.value}</span>
                    </div>
                  ))}
                </div>

                {/* Fee summary */}
                <div className="mt-auto pt-5 border-t border-white/[0.07] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[#b0c5c6]/50 font-bold">Smartslate Year 1 Fee</span>
                    <span className="font-display font-bold text-white tabular-nums">{path.smartslateFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[#b0c5c6]/50 font-bold">Year 1 Total</span>
                    <span className="font-display font-bold tabular-nums text-lg" style={{ color: path.accent }}>{path.yearOneTotal}</span>
                  </div>
                  <p className="font-body text-[#b0c5c6]/40 text-[11px] leading-relaxed pt-1">{path.techNote}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* 5-Year Financial Summary */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: easeOut }}
      >
        <div className="mb-8">
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#b0c5c6]/55 font-bold">
            5-Year Financial Summary · All figures INR · Smartslate fees identical across all options
          </span>
        </div>
        <div className="overflow-x-auto rounded-[20px] border border-white/[0.07] bg-[#0a1729]/60 backdrop-blur-xl">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.07]">
                <th className="py-4 px-7 text-left w-[44%]">
                  <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/35 font-bold">Line Item</span>
                </th>
                {(['Cloud Only', 'Phased Hybrid', 'On-Premise'] as const).map((col, ci) => (
                  <th key={col} className="py-4 px-5 text-right">
                    <span
                      className="font-display text-[11px] tracking-[0.3em] uppercase font-bold"
                      style={{ color: ci === 1 ? '#e8c789' : '#A7DADB' }}
                    >
                      {col}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {finRows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-t border-white/[0.04] group"
                  style={{ background: row.bold ? 'rgba(167,218,219,0.04)' : undefined }}
                >
                  <td className="py-4 px-7">
                    <span className={`font-display text-sm tracking-tight ${row.bold ? 'font-bold text-white' : 'font-bold text-white/55'}`}>
                      {row.label}
                    </span>
                  </td>
                  {[row.cloud, row.hybrid, row.onprem].map((val, ci) => (
                    <td key={ci} className="py-4 px-5 text-right">
                      <span
                        className={`font-display tabular-nums ${row.bold ? 'font-bold text-lg' : 'font-bold text-sm text-white/75'}`}
                        style={row.bold ? { color: ci === 1 ? '#e8c789' : '#A7DADB' } : undefined}
                      >
                        {val}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  </section>
);

// ─── Programme Pillars ────────────────────────────────────────────────────────
const ProgrammePillars: React.FC = () => (
  <section id="programme" className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
    <MeshGradient intensity="low" />
    <div className="relative z-10 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-20 md:mb-28">
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="flex items-center gap-3"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
            <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
              What Is Included
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
            className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
          >
            Three pillars, one retainer
          </motion.p>
        </div>
        <div className="lg:col-span-9">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, ease: easeOut }}
            className="font-display font-bold text-white leading-[1] tracking-[-0.025em] text-[clamp(2.5rem,5vw,5rem)]"
          >
            Campus. Faculty. Students.
            <br />
            <span className="font-serif-display italic font-normal text-[#A7DADB]">All three, together.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
            className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
          >
            Every deliverable is designed to produce measurable outcomes within Year 1. Nothing is aspirational. Everything is contractually defined.
          </motion.p>
        </div>
      </div>

      <div className="space-y-2">
        {programmePillars.map((pillar, i) => {
          const { Icon } = pillar;
          return (
            <motion.article
              key={pillar.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: easeOut }}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-10 py-12 md:py-16 border-t border-white/[0.07] group"
            >
              <span
                aria-hidden
                className="absolute top-0 left-0 h-px bg-[#A7DADB]/70 w-0 group-hover:w-full"
                style={{ transition: 'width 800ms var(--ease-out-expo)' }}
              />
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl border border-[#A7DADB]/20 bg-[#A7DADB]/[0.07]">
                  <Icon className="h-5 w-5 text-[#A7DADB]" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-display text-[11px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">{pillar.pillar}</p>
                  <h3 className="mt-1 font-display font-bold text-white text-2xl md:text-3xl tracking-tight">{pillar.name}</h3>
                </div>
              </div>
              <div className="lg:col-span-8 lg:col-start-5 flex items-center">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 w-full">
                  {pillar.items.map((item, ii) => (
                    <li key={ii} className="flex items-center gap-3">
                      <span className="h-px w-4 bg-[#A7DADB]/40 shrink-0" />
                      <span className="font-body text-[#b0c5c6] text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── ROI Calculator ───────────────────────────────────────────────────────────
const ROICalculator: React.FC = () => {
  const [faculty, setFaculty] = useState(200);
  const [students, setStudents] = useState(8000);

  // 40-60% prep time saved (PDF KPI). 50% midpoint × 10 hrs/week × 40 academic weeks = 200 hrs/faculty/year
  const hoursReclaimed = faculty * 200;
  // >80% AI literacy certification rate institution-wide (PDF KPI)
  const aiCertStudents = Math.round(students * 0.80);
  // Faculty time value: 200 hrs × ₹600/hr avg = ₹1.2L per faculty
  const valueInLakhs = Math.round(faculty * 1.2);
  // Payback on Year 1 Cloud path total (₹91.3L) vs annual faculty time value
  const paybackMonths = Math.min(Math.round((91.3 / (faculty * 1.2)) * 12), 48);

  const outputs = [
    { label: 'Faculty Prep Hours Reclaimed', value: hoursReclaimed.toLocaleString('en-IN'), unit: 'hours per year', accent: '#A7DADB' },
    { label: 'Annual Value of Reclaimed Hours', value: formatINR(valueInLakhs), unit: 'in faculty time value', accent: '#e8c789' },
    { label: 'Students Reaching AI Certification', value: aiCertStudents.toLocaleString('en-IN'), unit: 'graduates per year', accent: '#A7DADB' },
    { label: 'Estimated Payback Period', value: paybackMonths <= 12 ? `~${paybackMonths}` : `~${paybackMonths}`, unit: paybackMonths <= 12 ? 'months on faculty value alone' : 'months (scale up for faster return)', accent: '#e8c789' },
  ];

  return (
    <section id="roi" className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
      <MeshGradient intensity="med" />
      <Vignette strength={0.35} />
      <div className="relative z-10 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-20">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8c789] animate-soft-pulse" />
              <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#e8c789] font-bold">
                ROI Calculator
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
              className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
            >
              Your numbers
            </motion.p>
          </div>
          <div className="lg:col-span-9">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.85, ease: easeOut }}
              className="font-display font-bold text-white leading-[1] tracking-[-0.025em] text-[clamp(2.5rem,5vw,5rem)]"
            >
              See what you would
              <br />
              <span className="font-serif-display italic font-normal text-[#e8c789]">reclaim.</span>
            </motion.h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
        >
          {/* Controls */}
          <div className="lg:col-span-4 rounded-[28px] border border-white/[0.08] bg-[#0a1729]/80 backdrop-blur-xl glass-refract p-8 md:p-10 flex flex-col gap-10">
            <div>
              <div className="flex items-end justify-between mb-5">
                <label className="font-display text-[11px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">Faculty Size</label>
                <span className="font-display font-bold text-white text-2xl tabular-nums">{faculty}</span>
              </div>
              <input
                type="range" min={50} max={500} step={10} value={faculty}
                onChange={(e) => setFaculty(Number(e.target.value))}
                className="pricing-range w-full cursor-pointer"
                style={{ background: `linear-gradient(to right, #A7DADB ${((faculty - 50) / 450) * 100}%, rgba(255,255,255,0.12) ${((faculty - 50) / 450) * 100}%)` }}
              />
              <div className="flex justify-between mt-2.5">
                <span className="font-display text-[10px] text-[#b0c5c6]/35 font-bold">50</span>
                <span className="font-display text-[10px] text-[#b0c5c6]/35 font-bold">500</span>
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between mb-5">
                <label className="font-display text-[11px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">Student Intake</label>
                <span className="font-display font-bold text-white text-2xl tabular-nums">{students.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range" min={1000} max={15000} step={500} value={students}
                onChange={(e) => setStudents(Number(e.target.value))}
                className="pricing-range w-full cursor-pointer"
                style={{ background: `linear-gradient(to right, #A7DADB ${((students - 1000) / 14000) * 100}%, rgba(255,255,255,0.12) ${((students - 1000) / 14000) * 100}%)` }}
              />
              <div className="flex justify-between mt-2.5">
                <span className="font-display text-[10px] text-[#b0c5c6]/35 font-bold">1,000</span>
                <span className="font-display text-[10px] text-[#b0c5c6]/35 font-bold">15,000</span>
              </div>
            </div>

            <p className="font-body text-[#b0c5c6]/45 text-sm leading-relaxed">
              Based on contractual KPIs: 40–60% faculty prep time saved (PDF baseline), {'>'}{80}% AI literacy certification rate, faculty time valued at ₹600/hr. Payback calculated against Year 1 Cloud path total (₹91.3L).
            </p>
          </div>

          {/* Outputs */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {outputs.map((o) => (
              <div
                key={o.label}
                className="rounded-[20px] border border-white/[0.08] bg-[#0a1729]/60 backdrop-blur-xl glass-refract p-7 md:p-8 flex flex-col justify-between min-h-[170px]"
              >
                <span className="font-display text-[10px] tracking-[0.4em] uppercase font-bold" style={{ color: `${o.accent}88` }}>
                  {o.label}
                </span>
                <div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={o.value}
                      initial={{ opacity: 0.5, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: easeOut }}
                      className="block font-display font-bold tabular-nums tracking-tight leading-none"
                      style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', color: o.accent }}
                    >
                      {o.value}
                    </motion.span>
                  </AnimatePresence>
                  <span className="mt-1.5 block font-body text-[#b0c5c6]/50 text-sm">{o.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ─── CTA ──────────────────────────────────────────────────────────────────────
const PricingCTA: React.FC = () => (
  <section className="relative py-40 md:py-52 px-6 md:px-12 lg:px-24 overflow-hidden">
    <MeshGradient intensity="med" />
    <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_0%,transparent_75%)]">
      <FlickeringGrid color="rgb(232,199,137)" squareSize={3} gridGap={9} flickerChance={0.12} maxOpacity={0.16} />
    </div>
    <Vignette strength={0.6} />

    <div className="relative z-10 max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="flex items-center gap-3"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
        <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
          Recommended Next Steps
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.95, ease: easeOut }}
        className="mt-10 font-display font-bold text-white leading-[0.94] tracking-[-0.03em] text-[clamp(3rem,8.5vw,9rem)] max-w-[18ch]"
      >
        Will you{' '}
        <span className="font-serif-display italic font-normal text-[#A7DADB]">lead the era?</span>
      </motion.h2>

      {/* 3-step next steps from PDF */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px]"
      >
        {[
          {
            step: '01',
            title: 'Select Your Option',
            body: 'Choose Cloud, Phased Hybrid, or On-Prem based on budget, timeline, and data sovereignty. All include the same transformation programme.',
          },
          {
            step: '02',
            title: 'Sign Partnership Agreement',
            body: 'Smartslate issues a full SLA and engagement contract within 48 hours of a decision. KJU legal review typically takes 5–10 business days.',
          },
          {
            step: '03',
            title: 'KJU Goes AI-First',
            body: 'Phase 1 begins on contract signing day. The window to be the first AI-native institution in your tier is open now.',
          },
        ].map((s, i) => (
          <div key={s.step} className="rounded-[20px] border border-white/[0.07] bg-[#0a1729]/50 backdrop-blur-xl glass-refract p-7">
            <span className="font-serif-display italic font-normal text-[5rem] leading-none" style={{ color: 'rgba(167,218,219,0.12)' }}>
              {s.step}
            </span>
            <h3 className="mt-3 font-display font-bold text-white text-lg tracking-tight">{s.title}</h3>
            <p className="mt-3 font-body font-light text-[#b0c5c6]/70 text-sm leading-relaxed">{s.body}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.85, delay: 0.22, ease: easeOut }}
        className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-5"
      >
        <a
          href="mailto:hello@smartslate.io?subject=AI%20Transformation%20Programme%20-%20KJU%20Enquiry"
          className="press-scale group inline-flex items-center gap-3 rounded-full px-7 py-4 bg-[#A7DADB] text-[#020C1B] font-display font-bold text-sm tracking-[0.18em] uppercase"
          style={{ boxShadow: '0 12px 32px -10px rgba(167,218,219,0.55), inset 0 1px 0 rgba(255,255,255,0.4)', transition: 'transform 160ms var(--ease-out-expo), box-shadow 250ms var(--ease-out-expo)' }}
        >
          <Mail className="h-4 w-4" strokeWidth={2} />
          Request Engagement Proposal
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </a>
        <Link
          to="/"
          className="press-scale inline-flex items-center gap-3 rounded-full px-7 py-4 border border-white/15 bg-white/[0.04] text-white font-display font-bold text-sm tracking-[0.18em] uppercase backdrop-blur-md"
          style={{ transition: 'background-color 220ms var(--ease-out-expo), border-color 220ms var(--ease-out-expo), transform 160ms var(--ease-out-expo)' }}
        >
          <ArrowLeft className="h-4 w-4 text-[#A7DADB]" strokeWidth={2} />
          Back to Overview
        </Link>
      </motion.div>

      {/* Brand pill */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.95, delay: 0.32, ease: easeOut }}
        className="mt-24 inline-flex items-center gap-7 rounded-full px-7 py-4 border border-[#A7DADB]/20 bg-white/[0.03] backdrop-blur-md glass-refract"
      >
        <img src="/logo.png" alt="Smartslate" className="h-7 w-auto" style={{ filter: 'drop-shadow(0 2px 10px rgba(167,218,219,0.35))' }} />
        <div aria-hidden className="h-7 w-px bg-[#A7DADB]/30" />
        <img src="/kjc-logo.png" alt="Kristu Jayanti University" className="h-9 w-auto" style={{ filter: 'drop-shadow(0 2px 10px rgba(255,255,255,0.15))' }} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.1, delay: 0.5, ease: easeOut }}
        className="mt-32 pt-10 border-t border-white/[0.07] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-white/85 font-bold">Investment & Pricing</span>
          </div>
          <div aria-hidden className="h-4 w-px bg-white/10" />
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold">
            Confidential · May 2026
          </span>
        </div>
        <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold tabular-nums">
          KJU_AI_PROPOSAL_V1.0
        </span>
      </motion.div>
    </div>
  </section>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const PricingPage: React.FC = () => (
  <div className="relative bg-[#020C1B] min-h-screen selection:bg-[#A7DADB]/30 selection:text-[#A7DADB]">
    <ScrollProgress />
    <Navbar />
    <main>
      <PricingHero />
      <ContractualKPIs />
      <FeeSchedule />
      <ImplementationPaths />
      <ProgrammePillars />
      <ROICalculator />
      <PricingCTA />
    </main>
    <GrainOverlay opacity={0.06} />
  </div>
);

export default PricingPage;
