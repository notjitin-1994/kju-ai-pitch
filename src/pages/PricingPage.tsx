import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, ArrowLeft, Check, X, Minus, Mail,
  Building2, Users, Zap, Shield, TrendingUp, Cpu, BookOpen, Activity,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { MeshGradient, Vignette, GrainOverlay } from '../components/ui/atmosphere';
import { FlickeringGrid } from '../components/ui/flickering-grid';

const easeOut = [0.16, 1, 0.3, 1] as const;

// ─── Types ───────────────────────────────────────────────────────────────────
type CellValue =
  | { type: 'check' }
  | { type: 'cross' }
  | { type: 'partial' }
  | { type: 'text'; text: string };

type ComparisonRow = {
  label: string;
  cells: readonly [CellValue, CellValue, CellValue, CellValue];
};

// ─── Data ────────────────────────────────────────────────────────────────────
const tiers = [
  {
    id: '01',
    name: 'Foundation',
    tag: 'Begin the Transformation',
    icon: Building2,
    description:
      'Start with the highest-leverage pillar: the AI-Enabled Campus. Core cognitive concierge, unified data layer, and one faculty stream integration deployed in 90 days.',
    deployment: '90 days',
    highlights: [
      'AI Campus Cognitive Concierge',
      'Unified Institutional Data Layer',
      'At-Risk Student Early-Warning System',
      'One Faculty Department AI Integration',
      'AI Literacy Core Curriculum',
    ],
    span: 'lg:col-span-5',
    featured: false,
    horizontal: false,
    accent: '#A7DADB',
  },
  {
    id: '02',
    name: 'Full Transformation',
    tag: 'The Complete 3-Pillar Deployment',
    icon: Zap,
    description:
      'All three pillars. Every faculty department. The full student practitioner programme. The enterprise AI lab. 180-day deployment of the complete cognitive campus operating system.',
    deployment: '180 days',
    highlights: [
      'Everything in Foundation',
      'All Faculty Departments Integrated',
      'AI Masterclass Suite across all streams',
      'Full Student Practitioner Curriculum',
      'Enterprise AI Lab Setup',
      'Assessment Redesign Engine',
      'Continuous Content Update Ecosystem',
    ],
    span: 'lg:col-span-7',
    featured: true,
    horizontal: false,
    accent: '#e8c789',
  },
  {
    id: '03',
    name: 'Cognitive Campus',
    tag: 'Sustained Intelligence Leadership',
    icon: Shield,
    description:
      'The perpetual model. Full Transformation plus ongoing ecosystem updates, a dedicated AI curriculum team, and annual programme renewal. The institution that never stops advancing.',
    deployment: 'Ongoing',
    highlights: [
      'Everything in Full Transformation',
      'Dedicated AI Curriculum Team',
      'Annual Programme Renewal',
      'Quarterly AI Ecosystem Updates',
      'First-Mover Brand Positioning Support',
      'Industry Partnership Facilitation',
    ],
    span: 'lg:col-span-12',
    featured: false,
    horizontal: true,
    accent: '#A7DADB',
  },
] as const;

const comparisonRows: ComparisonRow[] = [
  {
    label: 'Deployment Timeline',
    cells: [
      { type: 'text', text: 'None' },
      { type: 'text', text: '24–36 months' },
      { type: 'text', text: '90 days' },
      { type: 'text', text: '180 days' },
    ],
  },
  {
    label: 'Faculty Time Reclaimed',
    cells: [
      { type: 'text', text: '0%' },
      { type: 'text', text: '~10%' },
      { type: 'text', text: '40%' },
      { type: 'text', text: '40–60%' },
    ],
  },
  {
    label: 'Student AI Literacy',
    cells: [
      { type: 'text', text: 'Unguided (~12%)' },
      { type: 'text', text: 'Experimental' },
      { type: 'text', text: 'Structured' },
      { type: 'text', text: 'Practitioner grade' },
    ],
  },
  {
    label: 'Operational Lift',
    cells: [
      { type: 'cross' },
      { type: 'partial' },
      { type: 'text', text: 'Core campus ops' },
      { type: 'text', text: '70% uplift' },
    ],
  },
  {
    label: 'Implementation Risk',
    cells: [
      { type: 'text', text: 'High (inaction)' },
      { type: 'text', text: 'Very High' },
      { type: 'text', text: 'Low' },
      { type: 'text', text: 'Low' },
    ],
  },
  {
    label: 'Outcome Guarantee',
    cells: [{ type: 'cross' }, { type: 'cross' }, { type: 'check' }, { type: 'check' }],
  },
  {
    label: 'First-Mover Advantage',
    cells: [
      { type: 'cross' },
      { type: 'partial' },
      { type: 'partial' },
      { type: 'check' },
    ],
  },
  {
    label: 'Internal Build Required',
    cells: [
      { type: 'cross' },
      { type: 'text', text: 'Full team needed' },
      { type: 'check' },
      { type: 'check' },
    ],
  },
];

const stackLayers = [
  {
    icon: Cpu,
    name: 'AI Campus Brain',
    sub: 'Operations and Intelligence',
    items: ['24/7 Cognitive Concierge', 'Unified Institutional Data Layer', 'At-Risk Student Modelling', 'Admin Automation Suite'],
  },
  {
    icon: Users,
    name: 'Faculty Intelligence Suite',
    sub: 'Teaching and Efficiency',
    items: ['Subject-Specific AI Masterclasses', 'AI-Designed Assessment Cycles', 'Content Refresh Automation', 'Pedagogical Analytics Dashboard'],
  },
  {
    icon: BookOpen,
    name: 'Student Practitioner Platform',
    sub: 'Learning and Outcomes',
    items: ['Mandatory AI Literacy Curriculum', 'AI-Augmented Real-World Assignments', 'Enterprise AI Lab Access', 'Industry-Grade Tooling Training'],
  },
  {
    icon: TrendingUp,
    name: 'Ecosystem Update Engine',
    sub: 'Continuity and Leadership',
    items: ['Quarterly AI Advancement Cycles', 'Curriculum Modernisation Layer', 'Dedicated Success Partnership', 'Benchmark Reporting Suite'],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatINR = (lakhs: number): string => {
  if (lakhs >= 100) return `₹${(lakhs / 100).toFixed(1)} Cr`;
  return `₹${Math.round(lakhs)} L`;
};

const CellDisplay: React.FC<{ cell: CellValue }> = ({ cell }) => {
  if (cell.type === 'check')
    return <Check className="h-4 w-4 text-[#A7DADB] mx-auto" strokeWidth={2.5} />;
  if (cell.type === 'cross')
    return <X className="h-4 w-4 text-white/20 mx-auto" strokeWidth={2} />;
  if (cell.type === 'partial')
    return <Minus className="h-4 w-4 text-[#e8c789]/60 mx-auto" strokeWidth={2} />;
  return (
    <span className="font-display text-sm font-bold text-white">{cell.text}</span>
  );
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
      style={{ transition: 'background-color 350ms var(--ease-out-expo), backdrop-filter 350ms var(--ease-out-expo), border-color 350ms var(--ease-out-expo)' }}
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
            const cls =
              'group relative font-display text-xs tracking-[0.3em] uppercase font-bold text-[#b0c5c6]/85 hover:text-white';
            const linkStyle = { transition: 'color 200ms var(--ease-out-expo)' };
            const inner = (
              <>
                {l.label}
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 right-0 h-px bg-[#A7DADB] origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ transition: 'transform 350ms var(--ease-out-expo)' }}
                />
              </>
            );
            return l.route ? (
              <Link key={l.href} to={l.href} className={cls} style={linkStyle}>
                {inner}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className={cls} style={linkStyle}>
                {inner}
              </a>
            );
          })}
        </div>

        <a
          href="mailto:hello@smartslate.io?subject=Project%20Institutional%20Intelligence"
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
      <FlickeringGrid
        color="rgb(232,199,137)"
        squareSize={3}
        gridGap={11}
        flickerChance={0.09}
        maxOpacity={0.1}
      />
    </div>
    <Vignette strength={0.5} />

    <div className="relative z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12 py-20">
      {/* Left: editorial heading */}
      <div className="lg:col-span-7 lg:col-start-1">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#e8c789] animate-soft-pulse" />
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#e8c789] font-bold">
            Chapter 06 · Investment Case
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
          <span className="font-serif-display italic font-normal text-[#e8c789]">
            of Intelligence.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.22, ease: easeOut }}
          className="mt-10 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[58ch]"
        >
          Every semester without transformation carries a compounding cost. Not the cost of the programme. The cost of staying still.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.34, ease: easeOut }}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <a
            href="#tiers"
            className="press-scale group inline-flex items-center gap-3 rounded-full px-7 py-4 bg-[#A7DADB] text-[#020C1B] font-display font-bold text-sm tracking-[0.18em] uppercase"
            style={{ boxShadow: '0 12px 32px -10px rgba(167,218,219,0.55), inset 0 1px 0 rgba(255,255,255,0.4)', transition: 'transform 160ms var(--ease-out-expo), box-shadow 250ms var(--ease-out-expo)' }}
          >
            View Investment Tiers
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

      {/* Right: quick stats card */}
      <div className="lg:col-span-4 lg:col-start-9 lg:self-center">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.95, delay: 0.28, ease: easeOut }}
          className="rounded-[24px] border border-white/[0.08] bg-[#0a1729]/80 backdrop-blur-xl glass-refract p-8 space-y-8"
        >
          {[
            { v: '₹2.4 Cr+', sub: 'Estimated annual overhead from faculty prep time alone in a 200-faculty institution', accent: '#e8c789' },
            { v: '18 months', sub: 'Average first-mover lead that competitors cannot close after the fact', accent: '#A7DADB' },
            { v: '73%', sub: 'Employers now list AI literacy as a baseline hiring criterion at entry level', accent: '#A7DADB' },
          ].map((s, i) => (
            <div key={i} className={i > 0 ? 'pt-8 border-t border-white/[0.06]' : ''}>
              <span
                className="font-display font-bold tabular-nums tracking-tight text-[2.4rem] leading-none"
                style={{ color: s.accent }}
              >
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

// ─── Cost of Inaction ─────────────────────────────────────────────────────────
const costMetrics = [
  {
    num: '40–60%',
    label: 'Faculty hours consumed by manual preparation',
    detail:
      'Without AI assistance, faculty at a 200-person institution spend an estimated 40–60% of working hours on administrative content preparation. That time does not compound. It is consumed.',
    accent: '#e8c789',
  },
  {
    num: '4–6×',
    label: 'More expensive to build AI infrastructure in-house',
    detail:
      'Internal AI infrastructure development costs 4 to 6 times more than a proven partnership model. Engineering talent, infrastructure, curriculum design, and iteration cycles all carry hidden compounding costs that are rarely budgeted.',
    accent: '#A7DADB',
  },
  {
    num: '∞',
    label: 'The cost of the second-mover position',
    detail:
      'First-mover advantage in institutional AI cannot be purchased after the fact. Once a competitor establishes it, brand equity compounds in their favour permanently. There is no catch-up purchase available.',
    accent: '#e8c789',
  },
];

const CostOfInaction: React.FC = () => (
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
              The Hidden Cost
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
            className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
          >
            What inaction costs
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
            Every semester is
            <br />
            <span className="font-serif-display italic font-normal text-[#e8c789]">
              a decision.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
            className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
          >
            The question is never whether to invest. It is what you are paying by waiting. These three numbers make that visible.
          </motion.p>
        </div>
      </div>

      <div className="space-y-2">
        {costMetrics.map((m, i) => (
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
            <div className="lg:col-span-5 flex items-center">
              <span
                className="font-display font-bold tabular-nums tracking-[-0.04em] leading-[0.85] text-[clamp(5.5rem,13vw,12rem)]"
                style={{ color: m.accent }}
              >
                {m.num}
              </span>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center">
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

// ─── Investment Tiers ─────────────────────────────────────────────────────────
const InvestmentTiers: React.FC = () => (
  <section id="tiers" className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
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
              Investment Tiers
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
            className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
          >
            Choose your scope
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
            Three levels.
            <br />
            <span className="font-serif-display italic font-normal text-[#A7DADB]">
              One operating system.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
            className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
          >
            Every tier is a complete deployment. Investment is structured as a custom institutional partnership based on faculty size, student intake, and programme scope. All proposals are confidential.
          </motion.p>
        </div>
      </div>

      {/* Asymmetric bento: 5/7 top row + 12 bottom */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {tiers.map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.85, delay: i * 0.09, ease: easeOut }}
              className={`${t.span} group relative isolate overflow-hidden rounded-[28px] bg-[#0a1729]/70 backdrop-blur-xl glass-refract`}
              style={{
                border: t.featured
                  ? '1px solid rgba(232,199,137,0.28)'
                  : '1px solid rgba(255,255,255,0.08)',
                boxShadow: t.featured
                  ? 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.4), 0 0 80px -24px rgba(232,199,137,0.15), 0 30px 60px -20px rgba(0,0,0,0.6)'
                  : undefined,
              }}
            >
              <div
                className={`relative z-10 ${
                  t.horizontal
                    ? 'grid lg:grid-cols-2 gap-10 p-10 md:p-14'
                    : `flex flex-col gap-7 p-8 md:p-10 ${t.featured ? 'min-h-[560px]' : 'min-h-[520px]'}`
                }`}
              >
                {/* Top row */}
                <div className={t.horizontal ? 'flex flex-col gap-6' : 'flex flex-col gap-7 flex-1'}>
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="inline-flex items-center justify-center h-12 w-12 rounded-xl"
                      style={{ border: `1px solid ${t.accent}33`, background: `${t.accent}11` }}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.5} style={{ color: t.accent }} />
                    </div>
                    {t.featured ? (
                      <span
                        className="inline-flex items-center rounded-full px-3 py-1 font-display text-[10px] tracking-[0.35em] uppercase font-bold text-[#e8c789]"
                        style={{ background: 'rgba(232,199,137,0.08)', border: '1px solid rgba(232,199,137,0.22)' }}
                      >
                        Recommended
                      </span>
                    ) : (
                      <span
                        className="font-serif-display italic leading-none tracking-tighter text-[5rem] md:text-[5.5rem] group-hover:opacity-40 transition-opacity duration-700"
                        style={{ color: `${t.accent}1A` }}
                      >
                        {t.id}
                      </span>
                    )}
                  </div>

                  <div className={t.horizontal ? '' : 'flex-1 flex flex-col justify-end'}>
                    <p
                      className="font-display text-[11px] tracking-[0.4em] uppercase font-bold"
                      style={{ color: t.accent }}
                    >
                      {t.tag}
                    </p>
                    <h3 className="mt-3 font-display font-bold text-white text-3xl md:text-4xl tracking-tight uppercase">
                      {t.name}
                    </h3>
                    <p className="mt-5 font-body font-light text-[#b0c5c6] text-base md:text-[17px] leading-[1.6] max-w-[48ch]">
                      {t.description}
                    </p>
                  </div>
                </div>

                {/* Features + CTA */}
                <div className={`flex flex-col ${t.horizontal ? 'justify-between' : 'justify-end gap-7'}`}>
                  <ul className="space-y-3">
                    {t.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-3">
                        <Check
                          className="h-4 w-4 mt-0.5 shrink-0"
                          strokeWidth={2.5}
                          style={{ color: t.accent }}
                        />
                        <span className="font-body text-[#b0c5c6] text-sm leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div
                    className={`${t.horizontal ? 'mt-8' : ''} pt-6 border-t border-white/[0.06] flex items-center justify-between gap-4`}
                  >
                    <div>
                      <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold">
                        Deployment
                      </span>
                      <p className="mt-1 font-display font-bold text-white text-xl tracking-tight">
                        {t.deployment}
                      </p>
                    </div>
                    <a
                      href="mailto:hello@smartslate.io?subject=Programme%20Investment%20Enquiry"
                      className="press-scale inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] uppercase font-bold"
                      style={{ color: t.accent, transition: 'transform 160ms var(--ease-out-expo)' }}
                    >
                      Request Quote
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
);

// ─── Comparison Matrix ────────────────────────────────────────────────────────
const colHeaders = ['Status Quo', 'DIY Build', 'Foundation', 'Full Transformation'];
const colAccents = [
  'rgba(255,255,255,0.35)',
  'rgba(255,255,255,0.35)',
  '#A7DADB',
  '#e8c789',
];
const colBg = [
  'rgba(255,255,255,0.02)',
  'rgba(255,255,255,0.02)',
  'rgba(167,218,219,0.04)',
  'rgba(232,199,137,0.05)',
];
const colBorder = [
  'rgba(255,255,255,0)',
  'rgba(255,255,255,0)',
  'rgba(167,218,219,0.18)',
  'rgba(232,199,137,0.22)',
];

const ComparisonMatrix: React.FC = () => (
  <section id="compare" className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
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
              The Comparison
            </span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
            className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
          >
            Every path, laid bare
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
            Four paths.
            <br />
            <span className="font-serif-display italic font-normal text-[#A7DADB]">
              One right answer.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
            className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
          >
            Compare what each path actually delivers across the dimensions that matter to an institution.
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: easeOut }}
        className="overflow-x-auto"
      >
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr>
              <th className="pb-4 pr-6 text-left w-[28%]">
                <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/40 font-bold">
                  Dimension
                </span>
              </th>
              {colHeaders.map((col, ci) => (
                <th
                  key={col}
                  className="pb-0 px-5 text-center"
                  style={{ width: `${72 / 4}%` }}
                >
                  <div
                    className="rounded-t-xl py-4 px-2"
                    style={{
                      background: colBg[ci],
                      border: `1px solid ${colBorder[ci]}`,
                      borderBottom: 'none',
                    }}
                  >
                    <span
                      className="font-display text-[11px] tracking-[0.3em] uppercase font-bold"
                      style={{ color: colAccents[ci] }}
                    >
                      {col}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, ri) => (
              <tr key={ri} className="group">
                <td className="py-4 pr-6 border-t border-white/[0.06]">
                  <span className="font-display text-sm font-bold text-white/65 tracking-tight">
                    {row.label}
                  </span>
                </td>
                {row.cells.map((cell, ci) => (
                  <td
                    key={ci}
                    className="py-4 px-5 border-t border-white/[0.04] text-center"
                    style={{
                      background: colBg[ci],
                      borderLeft: `1px solid ${colBorder[ci]}`,
                      borderRight: `1px solid ${colBorder[ci]}`,
                    }}
                  >
                    <CellDisplay cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
            {/* bottom cap row */}
            <tr>
              <td />
              {colHeaders.map((_, ci) => (
                <td
                  key={ci}
                  className="h-3 rounded-b-xl"
                  style={{
                    background: colBg[ci],
                    border: `1px solid ${colBorder[ci]}`,
                    borderTop: 'none',
                  }}
                />
              ))}
            </tr>
          </tbody>
        </table>
      </motion.div>
    </div>
  </section>
);

// ─── Infrastructure Stack ─────────────────────────────────────────────────────
const InfrastructureStack: React.FC = () => (
  <section id="infrastructure" className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden">
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
            The full stack
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
            Four integrated
            <br />
            <span className="font-serif-display italic font-normal text-[#A7DADB]">
              intelligence layers.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
            className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
          >
            Smartslate is not a tool. It is an operating system for institutional intelligence. Each layer compounds the value of the others.
          </motion.p>
        </div>
      </div>

      <div className="space-y-2">
        {stackLayers.map((layer, i) => {
          const Icon = layer.icon;
          return (
            <motion.article
              key={layer.name}
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
                  <p className="font-display text-[11px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">
                    {layer.sub}
                  </p>
                  <h3 className="mt-1 font-display font-bold text-white text-2xl md:text-3xl tracking-tight">
                    {layer.name}
                  </h3>
                </div>
              </div>
              <div className="lg:col-span-8 lg:col-start-5 flex items-center">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 w-full">
                  {layer.items.map((item, ii) => (
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
  const [faculty, setFaculty] = useState(150);
  const [students, setStudents] = useState(5000);

  const hoursReclaimed = Math.round(faculty * 160);
  const valueInLakhs = Math.round(faculty * 1.28);
  const aiReadyStudents = Math.round(students * 0.94);

  const outputs = [
    {
      label: 'Faculty Hours Reclaimed',
      value: hoursReclaimed.toLocaleString('en-IN'),
      unit: 'hours per year',
      accent: '#A7DADB',
    },
    {
      label: 'Equivalent Value Created',
      value: formatINR(valueInLakhs),
      unit: 'annually',
      accent: '#e8c789',
    },
    {
      label: 'Students Reaching AI Practitioner Level',
      value: aiReadyStudents.toLocaleString('en-IN'),
      unit: 'graduates per year',
      accent: '#A7DADB',
    },
    {
      label: 'Estimated Payback Period',
      value: '12–18',
      unit: 'months',
      accent: '#e8c789',
    },
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
              <span className="font-serif-display italic font-normal text-[#e8c789]">
                reclaim.
              </span>
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
            {/* Faculty slider */}
            <div>
              <div className="flex items-end justify-between mb-5">
                <label className="font-display text-[11px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">
                  Faculty Size
                </label>
                <span className="font-display font-bold text-white text-2xl tabular-nums">
                  {faculty}
                </span>
              </div>
              <input
                type="range"
                min={50}
                max={500}
                step={10}
                value={faculty}
                onChange={(e) => setFaculty(Number(e.target.value))}
                className="pricing-range w-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #A7DADB ${((faculty - 50) / 450) * 100}%, rgba(255,255,255,0.12) ${((faculty - 50) / 450) * 100}%)`,
                }}
              />
              <div className="flex justify-between mt-2.5">
                <span className="font-display text-[10px] text-[#b0c5c6]/35 font-bold">50</span>
                <span className="font-display text-[10px] text-[#b0c5c6]/35 font-bold">500</span>
              </div>
            </div>

            {/* Students slider */}
            <div>
              <div className="flex items-end justify-between mb-5">
                <label className="font-display text-[11px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">
                  Student Intake
                </label>
                <span className="font-display font-bold text-white text-2xl tabular-nums">
                  {students.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min={1000}
                max={25000}
                step={500}
                value={students}
                onChange={(e) => setStudents(Number(e.target.value))}
                className="pricing-range w-full cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #A7DADB ${((students - 1000) / 24000) * 100}%, rgba(255,255,255,0.12) ${((students - 1000) / 24000) * 100}%)`,
                }}
              />
              <div className="flex justify-between mt-2.5">
                <span className="font-display text-[10px] text-[#b0c5c6]/35 font-bold">1,000</span>
                <span className="font-display text-[10px] text-[#b0c5c6]/35 font-bold">25,000</span>
              </div>
            </div>

            <p className="font-body text-[#b0c5c6]/45 text-sm leading-relaxed">
              Estimates based on industry benchmarks: 160 hrs reclaimed per faculty per year at 50% prep reduction. 94% AI literacy adoption rate with a structured programme.
            </p>
          </div>

          {/* Outputs grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {outputs.map((o, oi) => (
              <div
                key={o.label}
                className="rounded-[20px] border border-white/[0.08] bg-[#0a1729]/60 backdrop-blur-xl glass-refract p-7 md:p-8 flex flex-col justify-between min-h-[170px]"
              >
                <span
                  className="font-display text-[10px] tracking-[0.4em] uppercase font-bold"
                  style={{ color: `${o.accent}88` }}
                >
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
                      className="block font-display font-bold text-white tabular-nums tracking-tight leading-none"
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
      <FlickeringGrid
        color="rgb(232,199,137)"
        squareSize={3}
        gridGap={9}
        flickerChance={0.12}
        maxOpacity={0.16}
      />
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
          Begin the Conversation
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.95, ease: easeOut }}
        className="mt-10 font-display font-bold text-white leading-[0.94] tracking-[-0.03em] text-[clamp(3rem,8.5vw,9rem)] max-w-[18ch]"
      >
        Ready to{' '}
        <span className="font-serif-display italic font-normal text-[#A7DADB]">
          invest?
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
        className="mt-10 font-body font-light text-[#b0c5c6] text-lg md:text-2xl leading-[1.55] max-w-[62ch]"
      >
        All programme investments are structured as custom institutional partnerships. Share your institution's profile and we will build the investment case together.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.85, delay: 0.22, ease: easeOut }}
        className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-5"
      >
        <a
          href="mailto:hello@smartslate.io?subject=Investment%20Enquiry%20-%20KJU%20AI%20Programme"
          className="press-scale group inline-flex items-center gap-3 rounded-full px-7 py-4 bg-[#A7DADB] text-[#020C1B] font-display font-bold text-sm tracking-[0.18em] uppercase"
          style={{ boxShadow: '0 12px 32px -10px rgba(167,218,219,0.55), inset 0 1px 0 rgba(255,255,255,0.4)', transition: 'transform 160ms var(--ease-out-expo), box-shadow 250ms var(--ease-out-expo)' }}
        >
          <Mail className="h-4 w-4" strokeWidth={2} />
          Request Investment Proposal
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
        <img
          src="/logo.png"
          alt="Smartslate"
          className="h-7 w-auto"
          style={{ filter: 'drop-shadow(0 2px 10px rgba(167,218,219,0.35))' }}
        />
        <div aria-hidden className="h-7 w-px bg-[#A7DADB]/30" />
        <img
          src="/kjc-logo.png"
          alt="Kristu Jayanti University"
          className="h-9 w-auto"
          style={{ filter: 'drop-shadow(0 2px 10px rgba(255,255,255,0.15))' }}
        />
      </motion.div>

      {/* Footer row */}
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
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-white/85 font-bold">
              Pricing Intelligence
            </span>
          </div>
          <div aria-hidden className="h-4 w-px bg-white/10" />
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold">
            Academic Excellence · 2026
          </span>
        </div>
        <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold tabular-nums">
          KJU_INVEST_V1.0
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
      <CostOfInaction />
      <InvestmentTiers />
      <ComparisonMatrix />
      <InfrastructureStack />
      <ROICalculator />
      <PricingCTA />
    </main>
    <GrainOverlay opacity={0.06} />
  </div>
);

export default PricingPage;
