import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  motion, AnimatePresence, useScroll, useSpring,
  useMotionValue, useInView, useReducedMotion,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight, ArrowLeft, Check, Mail, X as XIcon,
  Users, Shield, Cpu, BookOpen, Activity,
  Cloud, Server, Database, ChevronDown,
  Clock, Coins, Gauge, Megaphone, Newspaper,
  TrendingUp, GraduationCap, Wallet, Sparkles,
  Menu, ArrowRight, ShieldCheck, FileSignature, AlertTriangle,
  type LucideIcon,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { MeshGradient, Vignette, GrainOverlay } from '../components/ui/atmosphere';
import { FlickeringGrid } from '../components/ui/flickering-grid';
import { CursorSpotlight } from '../components/ui/CursorSpotlight';
import { BackgroundVideo, FOOTAGE } from '../components/ui/BackgroundVideo';

const easeOut = [0.16, 1, 0.3, 1] as const;
// Spring preset — used for modals and cards that should feel alive
const springModal = { type: 'spring' as const, duration: 0.45, bounce: 0.18 };
const springCard  = { type: 'spring' as const, duration: 0.35, bounce: 0.1 };

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

type PhaseDeliverable = { item: string; dueLabel: string };
const phaseDeliverables: Record<string, PhaseDeliverable[]> = {
  '1': [
    { item: 'AI Readiness Assessment Report',                      dueLabel: 'Week 2' },
    { item: 'Infrastructure Audit & Gap Analysis',                 dueLabel: 'Week 2' },
    { item: 'Stakeholder Workshop & Findings Report',              dueLabel: 'Week 3' },
    { item: 'Institutional Frontier Map (vs. top AI universities)',dueLabel: 'Week 3' },
    { item: 'Department Priority Matrix',                          dueLabel: 'Week 4' },
    { item: 'Custom 12-Month AI Transformation Roadmap',          dueLabel: 'Week 4' },
    { item: 'KPI Baseline Measurement & Documentation',            dueLabel: 'Week 4' },
  ],
  '2': [
    { item: 'AI Governance Framework & Data Policy',               dueLabel: 'Week 6'  },
    { item: 'AI Platform Live (Student Concierge + Faculty Tools)', dueLabel: 'Week 6'  },
    { item: 'Unified Knowledge Base — 3-Department Pilot',         dueLabel: 'Week 7'  },
    { item: 'Predictive Success Dashboard (Beta)',                  dueLabel: 'Week 8'  },
    { item: 'Mid-Programme Adoption Rate Report',                  dueLabel: 'Week 8'  },
    { item: 'Subject Playbook: Arts',                              dueLabel: 'Week 10' },
    { item: 'Subject Playbook: Commerce',                          dueLabel: 'Week 10' },
    { item: 'Subject Playbook: Science',                           dueLabel: 'Week 11' },
    { item: 'Faculty Training Programme — 3 Departments Complete', dueLabel: 'Week 12' },
    { item: 'First ROI Report vs. KPI Baseline',                   dueLabel: 'Week 12' },
  ],
  '3': [
    { item: 'Institution-Wide Platform Rollout (All Departments)', dueLabel: 'Month 4'  },
    { item: 'Unified Knowledge Base (Institution-Wide)',           dueLabel: 'Month 4'  },
    { item: 'Student AI Literacy Curriculum Integration',          dueLabel: 'Month 5'  },
    { item: 'National Media Activation & PR Campaign Launch',      dueLabel: 'Month 5'  },
    { item: 'Predictive Success Dashboard — Full Deployment',      dueLabel: 'Month 5'  },
    { item: 'All-Faculty AI Training Programme (Complete)',        dueLabel: 'Month 6'  },
    { item: 'Enterprise AI Lab Setup (Infosys / Deloitte Standard)',dueLabel: 'Month 6' },
    { item: 'Quarterly Business Review #1',                        dueLabel: 'Month 6'  },
    { item: 'AI-Native Campus Certification Launch',               dueLabel: 'Month 7'  },
    { item: 'Institutional AI Credential Programme',               dueLabel: 'Month 8'  },
    { item: 'All-Student AI Competency Assessment',                dueLabel: 'Month 10' },
    { item: 'Annual ROI Report & Renewal Recommendations',         dueLabel: 'Month 12' },
  ],
};

const commitmentPillars = [
  {
    clause: '§01',
    Icon: FileSignature,
    title: 'Contractually Defined',
    body: 'Every deliverable, KPI, and timeline written into the contract. No ambiguity.',
    tag: 'Contract KJU/STM-2026',
    accent: '#A7DADB',
  },
  {
    clause: '§02',
    Icon: Activity,
    title: 'Data-Backed Reporting',
    body: 'Quarterly business reviews with full adoption data and uplift evidence provided to KJU leadership.',
    tag: 'Quarterly Cadence',
    accent: '#A7DADB',
  },
  {
    clause: '§03',
    Icon: ShieldCheck,
    title: 'No Technology Markup',
    body: 'KJU pays tech vendors directly. Smartslate fees are professional services only.',
    tag: 'Zero Markup Guarantee',
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
    accent: '#A7DADB',
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

type KpiMetric = {
  id: string;
  ref: string;
  pillar: string;
  // Number display (ticker)
  prefix?: string;
  value: number;
  rangeUpper?: number;
  suffix?: string;
  // Copy
  label: string;
  detail: string;
  // Binding terms (replaces the generic 4-up card grid)
  binding: {
    method: string;
    cadence: string;
    trigger: string;
  };
  // Evidence ledger — hairline-divided data row
  evidence: { label: string; value: string }[];
};

const kpiMetrics: readonly KpiMetric[] = [
  {
    id: '01',
    ref: 'KJU/STM-2026/KPI-01',
    pillar: 'Operations',
    prefix: '≥',
    value: 70,
    suffix: '%',
    label: 'Admin overhead reduction',
    detail:
      'Routine student queries — schedules, fees, hostel, registrations — resolved autonomously in <30 seconds, 24/7. Staff redirected to high-value student interactions.',
    binding: {
      method: 'Ticket-volume delta vs. pre-deployment baseline, 12-week rolling.',
      cadence: 'Weekly internal · Quarterly to KJU leadership.',
      trigger: '14-day remediation plan if <60% sustained for 4 weeks.',
    },
    evidence: [
      { label: 'Autonomous resolution', value: '>90%' },
      { label: 'Response time', value: '<30 sec' },
      { label: 'Staff hours redirected', value: '~60%' },
      { label: 'Measured from', value: 'Day 1' },
    ],
  },
  {
    id: '02',
    ref: 'KJU/STM-2026/KPI-02',
    pillar: 'Faculty',
    prefix: '',
    value: 40,
    rangeUpper: 60,
    suffix: '%',
    label: 'Faculty preparation time saved',
    detail:
      'Measured weekly against a pre-deployment baseline. Lesson plans generated in <20 minutes vs 2–3 hours pre-deployment. Reclaimed hours go directly back to student mentorship.',
    binding: {
      method: 'Self-reported timesheets, cross-checked against platform telemetry.',
      cadence: 'Weekly internal · Quarterly to KJU Dean of Faculty.',
      trigger: 'Remediation plan if cohort median falls below 30% for 6 weeks.',
    },
    evidence: [
      { label: 'Lesson plan time', value: '<20 min' },
      { label: 'Pre-deployment baseline', value: '2–3 hrs' },
      { label: 'Annual hours reclaimed', value: '~200 hrs' },
      { label: 'Time value per faculty', value: '₹1.2L/yr' },
    ],
  },
  {
    id: '03',
    ref: 'KJU/STM-2026/KPI-03',
    pillar: 'Students',
    prefix: '>',
    value: 80,
    suffix: '%',
    label: 'Students AI-certified institution-wide',
    detail:
      'AI literacy embedded across all streams — not an elective. Every student builds a verifiable, institutionally-issued credential that differentiates KJU alumni in every hiring cycle.',
    binding: {
      method: 'Institutional credential issuance per cohort, all streams, all years.',
      cadence: 'Per academic term · Annual ROI report.',
      trigger: 'Curriculum review triggered if cohort certification <65% by Month 10.',
    },
    evidence: [
      { label: 'Curriculum coverage', value: 'All streams' },
      { label: 'Credential type', value: 'Institutional' },
      { label: 'Industry alignment', value: 'Infosys / Deloitte' },
      { label: 'Target cohort', value: 'All graduates' },
    ],
  },
];

const programmePillars = [
  {
    Icon: Cpu,
    num: '01',
    photo: '/pricing-pillar-campus.jpg',
    video: FOOTAGE.campusTimelapse,
    pillar: 'Operations & Management',
    name: 'AI-Enabled Campus',
    headline: 'Every routine query answered autonomously, in under 30 seconds, around the clock.',
    stat: { value: '≥70%', label: 'Admin overhead reduction — contractual KPI, measured from Day 1' },
    items: [
      { title: '24/7 Student Concierge', detail: '>90% of queries resolved autonomously — schedules, fees, hostel, registrations — with no staff involvement required.' },
      { title: 'Predictive Success Dashboard', detail: 'At-risk students flagged within 72 hours of early indicators. Proactive intervention, not reactive fire-fighting.' },
      { title: 'Unified Knowledge Base', detail: 'All institutional data — policies, calendars, courses, ordinances — in one AI-queryable layer, accessible to everyone.' },
      { title: '≥70% Overhead Reduction', detail: 'Contractually measured from Day 1. Staff redirected from repetitive queries to high-value student interactions.' },
    ],
  },
  {
    Icon: Users,
    num: '02',
    photo: '/pricing-pillar-faculty.jpg',
    video: FOOTAGE.professorSmartboard,
    pillar: 'Teaching & Efficiency',
    name: 'AI-Augmented Faculty',
    headline: 'Lesson prep drops from 3 hours to 20 minutes. Every faculty member, every week.',
    stat: { value: '40–60%', label: 'Preparation time saved — measured weekly against a pre-deployment baseline' },
    items: [
      { title: '8-Week Training Programme', detail: 'Subject-specific AI mastery for each department — not generic workshops. Built around what faculty actually teach.' },
      { title: 'Three Subject Playbooks', detail: 'Tailored AI implementation guides for Arts, Commerce, and Science — ready to use from Week 8 onwards.' },
      { title: 'AI-Assisted Preparation', detail: 'Lesson plans in <20 min. Assessments drafted in seconds. Research compressed from days to minutes.' },
      { title: '~200 Hours Returned / Year', detail: 'Per faculty member — a contractual baseline. Reclaimed hours go directly back to mentorship, research, and student outcomes.' },
    ],
  },
  {
    Icon: BookOpen,
    num: '03',
    photo: '/pricing-pillar-students.jpg',
    video: FOOTAGE.studentsOutdoorMNIT,
    pillar: 'Learning & Outcomes',
    name: 'AI-First Students',
    headline: 'Every KJU graduate leaves with a verifiable, industry-aligned AI credential at graduation.',
    stat: { value: '>80%', label: 'Students AI-certified institution-wide — all streams, all years' },
    items: [
      { title: 'Mandatory AI Literacy Curriculum', detail: 'Embedded across all streams — not an elective. AI becomes a core competency of every KJU degree programme.' },
      { title: 'AI-Augmented Assignments', detail: 'Applied problem-solving, not shortcuts. Students build real capability and critical judgment, not AI dependency.' },
      { title: 'Enterprise-Grade AI Lab', detail: 'Infosys and Deloitte standard. Students graduate fully ready for the AI-native workforce they\'ll enter from day one.' },
      { title: 'Institutional AI Credential', detail: 'A verifiable, KJU-issued certification that differentiates every graduate in every hiring cycle — permanently.' },
    ],
  },
  {
    Icon: Shield,
    num: '04',
    photo: '/pricing-pillar-partner.jpg',
    video: FOOTAGE.partnershipMeeting,
    pillar: 'Partnership Continuity',
    name: 'Annual Retainer',
    headline: 'The programme evolves as AI evolves — no renegotiation, no gaps, no institutional drift.',
    stat: { value: '₹44L / yr', label: 'Annual retainer fee — Year 2 onwards, covering all four continuity pillars' },
    items: [
      { title: 'Continuous AI Model Updates', detail: 'As frontier models improve, KJU\'s platform updates automatically — no redeployment or additional retraining required.' },
      { title: 'New Faculty Cohort Onboarding', detail: 'Every incoming faculty cohort trained to Year 1 standard. Zero drift in AI capability across the institution over time.' },
      { title: 'Quarterly Business Reviews', detail: 'Full adoption data, KPI performance, and forward-looking strategic recommendations delivered every quarter.' },
      { title: 'Priority Support & Advisory', detail: 'Direct line to Smartslate leadership. Rapid-response SLA for anything that surfaces in a live institutional deployment.' },
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

// ─── NumberTicker — count-up that triggers on viewport entry ─────────────────
// Adapted from Magic UI: https://magicui.design/docs/components/number-ticker
const NumberTicker: React.FC<{
  value: number;
  className?: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
}> = ({ value, className, prefix = '', suffix = '', delay = 0 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(0);
  // High damping + low stiffness = smooth decel into the target
  const springValue = useSpring(motionValue, { damping: 42, stiffness: 80 });

  useEffect(() => {
    if (!isInView) return;
    if (reduce) {
      motionValue.set(value);
      return;
    }
    const t = setTimeout(() => motionValue.set(value), delay * 1000);
    return () => clearTimeout(t);
  }, [isInView, motionValue, value, delay, reduce]);

  useEffect(() => {
    const unsub = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.round(latest)}${suffix}`;
      }
    });
    return unsub;
  }, [springValue, prefix, suffix]);

  return (
    <span ref={ref} className={className}>{`${prefix}0${suffix}`}</span>
  );
};

// ─── BindingSeal — once-through border-beam (the "sealing" moment) ───────────
// Adapted from Magic UI BorderBeam. Brand-tuned and non-infinite so it doesn't
// become visual noise. Triggers on mount; renders only when expanded.
const BindingSeal: React.FC<{ size?: number; duration?: number; borderRadius?: number }> = ({
  size = 180,
  duration = 2.4,
  borderRadius = 24,
}) => {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ borderRadius }}
    >
      <motion.div
        className="absolute"
        style={{
          width: size,
          aspectRatio: '1',
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          background:
            'linear-gradient(to left, transparent, rgba(167,218,219,0.85), rgba(232,199,137,0.5), transparent)',
          filter: 'blur(0.5px)',
        }}
        initial={{ offsetDistance: '0%', opacity: 0 }}
        animate={{ offsetDistance: '100%', opacity: [0, 1, 1, 0] }}
        transition={{ duration, ease: 'linear', times: [0, 0.08, 0.92, 1] }}
      />
    </div>
  );
};

// ─── useMagnetic — subtle spring-based pull toward the cursor ────────────────
// Returns motion-value style {x, y} for premium "alive" interactions on
// numbers and icons. Never re-renders the React tree (motion values bypass it).
const useMagnetic = (strength = 0.08) => {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 170, damping: 18, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 170, damping: 18, mass: 0.45 });
  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduce) return;
      const r = e.currentTarget.getBoundingClientRect();
      x.set((e.clientX - r.left - r.width / 2) * strength);
      y.set((e.clientY - r.top - r.height / 2) * strength);
    },
    [x, y, strength, reduce]
  );
  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);
  return { x: sx, y: sy, onMove, onLeave };
};

// ─── Per-row cursor spotlight — soft teal radial follow inside a row ─────────
const useRowSpotlight = () => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--rx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--ry', `${e.clientY - r.top}px`);
  }, []);
  return { ref, onMove };
};

// ─── Scroll Progress ─────────────────────────────────────────────────────────
const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[95] bg-gradient-to-r from-[#A7DADB]/0 via-[#A7DADB] to-[#A7DADB]/70"
    />
  );
};

// ─── Navbar ──────────────────────────────────────────────────────────────────
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

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
        className={`flex items-center justify-between px-5 md:px-12 lg:px-24 h-16 md:h-[88px] border-b ${scrolled || menuOpen ? 'border-white/[0.06] bg-[#020C1B]/85 backdrop-blur-2xl' : 'border-transparent bg-transparent backdrop-blur-0'}`}
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
        <div className="flex items-center gap-2.5 md:gap-5">
          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="press-scale lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md text-white"
            style={{ transition: 'background-color 200ms, border-color 200ms' }}
          >
            <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.3, ease: easeOut }}>
              {menuOpen ? <XIcon className="h-4 w-4" strokeWidth={2.25} /> : <Menu className="h-4 w-4" strokeWidth={2.25} />}
            </motion.div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.32, ease: easeOut }}
            className="lg:hidden bg-[#020C1B]/95 backdrop-blur-2xl border-b border-white/[0.06]"
          >
            <div className="px-5 py-6 flex flex-col gap-1">
              {links.map((l, i) => {
                const inner = (
                  <span className="flex items-center justify-between w-full py-3.5 border-b border-white/[0.04]">
                    <span className="font-display text-[13px] tracking-[0.3em] uppercase font-bold text-white">{l.label}</span>
                    <span className="font-display text-[10px] tabular-nums text-[#A7DADB]/55 font-bold">0{i + 1}</span>
                  </span>
                );
                return l.route
                  ? <Link key={l.href} to={l.href} onClick={() => setMenuOpen(false)}>{inner}</Link>
                  : <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{inner}</a>;
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const PricingHero: React.FC = () => (
  <section className="relative min-h-[100dvh] flex items-center px-5 md:px-12 lg:px-24 overflow-hidden pt-20 md:pt-24">
    <MeshGradient intensity="med" />
    <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_65%_50%,rgba(0,0,0,0.55)_0%,transparent_68%)]">
      <FlickeringGrid color="rgb(167,218,219)" squareSize={3} gridGap={11} flickerChance={0.09} maxOpacity={0.1} />
    </div>
    <Vignette strength={0.5} />

    {/* Background — Aerial view of Bangalore cityscape */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <BackgroundVideo
        src={FOOTAGE.bangaloreAerial}
        poster="/pricing-campus.jpg"
        className="opacity-35"
        style={{ filter: 'contrast(1.1) saturate(0.7) brightness(0.55)' }}
      />
    </div>

    <div className="relative z-10 max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12 py-20">
      <div className="lg:col-span-7">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
            Part 2 · Investment & Pricing
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.1, ease: easeOut }}
          className="mt-8 md:mt-10 font-display font-bold text-white leading-[0.94] tracking-[-0.03em] text-[clamp(2.8rem,7.5vw,8rem)]"
        >
          The Economics
          <br />
          <span className="font-serif-display italic font-normal text-[#A7DADB]">of Intelligence.</span>
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
          className="rounded-[20px] md:rounded-[24px] border border-white/[0.08] bg-[#0a1729]/80 backdrop-blur-xl glass-refract p-6 md:p-8 space-y-6 md:space-y-8"
        >
          {[
            { v: '₹88L', sub: 'Year 1 Smartslate service fee — all three implementation options', accent: '#A7DADB' },
            { v: '6 months', sub: 'Phase 1 through Phase 3: Week 1 to Month 12+ full campus deployment', accent: '#A7DADB' },
            { v: '~10,000', sub: 'Users at KJU scale: students, faculty, and administrative staff', accent: '#A7DADB' },
          ].map((s, i) => (
            <div key={i} className={`flex gap-4 ${i > 0 ? 'pt-8 border-t border-white/[0.06]' : ''}`}>
              {/* Left-edge accent bar — editorial detail */}
              <div className="w-[3px] rounded-full shrink-0 mt-1" style={{ background: 'rgba(167,218,219,0.22)', alignSelf: 'stretch' }} aria-hidden />
              <div>
                <span className="font-display font-bold tabular-nums tracking-tight text-[2.4rem] leading-none" style={{ color: s.accent }}>
                  {s.v}
                </span>
                <p className="mt-2 font-body font-light text-[#b0c5c6] text-sm leading-[1.55]">{s.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── Binding Ledger Row ──────────────────────────────────────────────────────
// One KPI presented as a row in a notarized institutional ledger.
// Magnetic count-up · per-row cursor spotlight · ATTESTED status pulse ·
// click to reveal Binding Terms (method · cadence · trigger) and a
// hairline-divided evidence ledger (no card boxes — distill principle).
const BindingLedgerRow: React.FC<{
  metric: KpiMetric;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}> = ({ metric, index, isOpen, onToggle }) => {
  const numberMag = useMagnetic(0.05);
  const chipMag = useMagnetic(0.18);
  const spot = useRowSpotlight();
  const tickerDelay = 0.18 + index * 0.05;

  return (
    <motion.article
      ref={spot.ref}
      onMouseMove={spot.onMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: easeOut }}
      className="relative group border-t border-white/[0.07]"
    >
      {/* Per-row cursor spotlight (opacity-gated, mutates a CSS var only) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(440px circle at var(--rx, -200px) var(--ry, -200px), rgba(167,218,219,0.055), transparent 62%)',
          transition: 'opacity 320ms var(--ease-out-expo)',
        }}
      />

      {/* Top hairline — full sweep when open */}
      <span
        aria-hidden
        className="absolute top-0 left-0 h-px w-full bg-[#A7DADB] origin-left scale-x-from-left"
        style={{
          transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
          opacity: isOpen ? 0.55 : 0,
          transition: 'transform 650ms var(--ease-out-expo), opacity 350ms',
        }}
      />

      {/* Corner tick marks — technical document detail (hover only) */}
      <span
        aria-hidden
        className="absolute -top-px left-0 w-3 h-3 pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          borderLeft: '1px solid rgba(167,218,219,0.5)',
          borderTop: '1px solid rgba(167,218,219,0.5)',
          transition: 'opacity 320ms var(--ease-out-expo)',
        }}
      />
      <span
        aria-hidden
        className="absolute -top-px right-0 w-3 h-3 pointer-events-none opacity-0 group-hover:opacity-100"
        style={{
          borderRight: '1px solid rgba(167,218,219,0.5)',
          borderTop: '1px solid rgba(167,218,219,0.5)',
          transition: 'opacity 320ms var(--ease-out-expo)',
        }}
      />

      <motion.button
        type="button"
        onClick={onToggle}
        className="relative w-full text-left py-10 md:py-16 cursor-pointer"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} binding terms for ${metric.label}`}
        whileTap={{ scale: 0.997 }}
        transition={springCard}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-y-8 gap-x-10 items-center">
          {/* ─── Zone 1: Magnetic count-up + ref + ATTESTED ─── */}
          <div
            className="lg:col-span-5"
            onMouseMove={numberMag.onMove}
            onMouseLeave={numberMag.onLeave}
          >
            <div className="flex items-end justify-between lg:justify-start gap-4">
              <motion.div
                style={{ x: numberMag.x, y: numberMag.y }}
                className="flex items-end leading-[0.82]"
              >
                {metric.rangeUpper != null ? (
                  <>
                    <NumberTicker
                      value={metric.value}
                      delay={tickerDelay}
                      className="font-display font-bold tabular-nums tracking-[-0.045em] text-[clamp(3.5rem,12vw,11rem)] text-[#A7DADB]"
                    />
                    <span className="font-display font-bold tabular-nums tracking-[-0.045em] text-[clamp(3.5rem,12vw,11rem)] text-[#A7DADB]/55 mx-[0.04em]">
                      –
                    </span>
                    <NumberTicker
                      value={metric.rangeUpper}
                      suffix={metric.suffix}
                      delay={tickerDelay + 0.12}
                      className="font-display font-bold tabular-nums tracking-[-0.045em] text-[clamp(3.5rem,12vw,11rem)] text-[#A7DADB]"
                    />
                  </>
                ) : (
                  <NumberTicker
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    delay={tickerDelay}
                    className="font-display font-bold tabular-nums tracking-[-0.045em] text-[clamp(3.5rem,12vw,11rem)] text-[#A7DADB]"
                  />
                )}
              </motion.div>

              {/* Mobile expand chevron */}
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.4, ease: easeOut }}
                className="lg:hidden h-10 w-10 rounded-full border border-[#A7DADB]/25 bg-[#A7DADB]/[0.06] flex items-center justify-center shrink-0 mb-2"
              >
                <ChevronDown className="h-4 w-4 text-[#A7DADB]" strokeWidth={2} />
              </motion.div>
            </div>

            {/* KPI ref + ATTESTED · LIVE badge */}
            <div className="mt-5 flex items-center gap-3 flex-wrap">
              <span className="font-mono text-[11px] tabular-nums tracking-tight text-[#b0c5c6]/55">
                {metric.ref}
              </span>
              <span aria-hidden className="h-px w-6 bg-white/[0.08]" />
              <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#A7DADB]/[0.06] border border-[#A7DADB]/15">
                <span className="relative inline-flex h-1.5 w-1.5">
                  <span aria-hidden className="absolute inset-0 rounded-full bg-[#A7DADB] opacity-70 animate-ping" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-[#A7DADB]" />
                </span>
                <span className="font-display text-[9px] tracking-[0.32em] uppercase font-bold text-[#A7DADB]/85">
                  Attested · Live
                </span>
              </span>
            </div>
          </div>

          {/* ─── Zone 2: Pillar tag + Title + Description ─── */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="font-display text-[10px] tracking-[0.42em] uppercase font-bold text-[#b0c5c6]/40">
              {String(index + 1).padStart(2, '0')} · {metric.pillar}
            </span>
            <h3 className="mt-3 font-display font-bold text-white text-xl md:text-[28px] tracking-tight leading-[1.1]">
              {metric.label}
            </h3>
            <p className="mt-4 font-body font-light text-[#b0c5c6] text-[15px] md:text-base leading-[1.65] max-w-[52ch]">
              {metric.detail}
            </p>
          </div>

          {/* ─── Zone 3: View Binding magnetic chip (desktop only) ─── */}
          <div className="hidden lg:flex lg:col-span-2 items-center justify-end">
            <motion.div
              onMouseMove={chipMag.onMove}
              onMouseLeave={chipMag.onLeave}
              style={{
                x: chipMag.x,
                y: chipMag.y,
                transition:
                  'background-color 280ms var(--ease-out-expo), border-color 280ms var(--ease-out-expo)',
              }}
              className="inline-flex items-center gap-3 px-4 py-3 rounded-full border border-[#A7DADB]/18 bg-[#A7DADB]/[0.04] group-hover:bg-[#A7DADB]/[0.09] group-hover:border-[#A7DADB]/35"
            >
              <span className="font-display text-[9px] tracking-[0.35em] uppercase font-bold text-[#A7DADB]/80">
                {isOpen ? 'Collapse' : 'View Binding'}
              </span>
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="h-7 w-7 rounded-full border border-[#A7DADB]/25 bg-[#A7DADB]/[0.07] flex items-center justify-center"
              >
                <ChevronDown className="h-3.5 w-3.5 text-[#A7DADB]" strokeWidth={2.2} />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.button>

      {/* ─── Expanded Binding Terms panel ─── */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="binding-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
            className="overflow-hidden"
          >
            <div className="pb-14 md:pb-20 pt-2">
              <div className="relative rounded-[20px] md:rounded-[24px] border border-[#A7DADB]/14 bg-[#0a1729]/55 backdrop-blur-xl glass-refract overflow-hidden">
                {/* Border-beam seal — runs once on open */}
                <BindingSeal size={220} duration={2.4} borderRadius={24} />

                {/* Panel header */}
                <div className="relative flex items-center justify-between gap-4 px-6 md:px-8 py-5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3 min-w-0">
                    <FileSignature className="h-4 w-4 text-[#A7DADB]/75 shrink-0" strokeWidth={1.75} />
                    <span className="font-display text-[10px] tracking-[0.45em] uppercase font-bold text-[#A7DADB]/85 truncate">
                      Binding Terms
                    </span>
                    <span aria-hidden className="h-px w-6 bg-white/[0.08] shrink-0 hidden sm:block" />
                    <span className="font-mono text-[11px] tabular-nums text-[#b0c5c6]/45 truncate">
                      {metric.ref}
                    </span>
                  </div>
                  {/* ATTESTED stamp — overshoot spring entry */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: -4 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 11, delay: 0.5 }}
                    className="shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#e8c789]/45 bg-[#e8c789]/[0.06]"
                  >
                    <ShieldCheck className="h-3 w-3 text-[#e8c789]" strokeWidth={2.25} />
                    <span className="font-display text-[9px] tracking-[0.42em] uppercase font-bold text-[#e8c789]/90">
                      Attested
                    </span>
                  </motion.div>
                </div>

                {/* 3-column binding terms (Method · Cadence · Trigger) */}
                <div className="relative grid grid-cols-1 md:grid-cols-3">
                  {[
                    { Icon: Gauge,          k: 'Method',  v: metric.binding.method,  accent: '#A7DADB' },
                    { Icon: Clock,          k: 'Cadence', v: metric.binding.cadence, accent: '#A7DADB' },
                    { Icon: AlertTriangle,  k: 'Trigger', v: metric.binding.trigger, accent: '#e8c789' },
                  ].map((b, bi) => (
                    <motion.div
                      key={b.k}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.18 + bi * 0.08, ease: easeOut }}
                      className={`px-6 md:px-8 py-7 ${
                        bi > 0 ? 'md:border-l border-t md:border-t-0 border-white/[0.05]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-3">
                        <b.Icon
                          className="h-3.5 w-3.5 shrink-0"
                          style={{ color: b.accent, opacity: 0.85 }}
                          strokeWidth={2}
                        />
                        <span
                          className="font-display text-[10px] tracking-[0.42em] uppercase font-bold"
                          style={{ color: b.accent, opacity: 0.78 }}
                        >
                          {b.k}
                        </span>
                      </div>
                      <p className="font-body font-light text-[#b0c5c6] text-[13.5px] leading-[1.6]">
                        {b.v}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Evidence ledger — hairline-divided data points (no card boxes) */}
                <div className="relative border-t border-white/[0.06] bg-[#020C1B]/40 px-6 md:px-8 py-5">
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="h-1 w-1 rounded-full bg-[#A7DADB]/55" />
                    <span className="font-display text-[10px] tracking-[0.45em] uppercase font-bold text-[#b0c5c6]/45">
                      Evidence ledger
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5">
                    {metric.evidence.map((e, ei) => (
                      <motion.div
                        key={e.label}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.42 + ei * 0.05, ease: easeOut }}
                        className={`flex flex-col gap-1.5 ${
                          ei > 0 ? 'md:border-l md:border-white/[0.06] md:pl-6' : ''
                        } ${ei < metric.evidence.length - 1 ? 'md:pr-6' : ''}`}
                      >
                        <span className="font-display font-bold text-[#A7DADB] text-xl md:text-2xl tabular-nums tracking-tight leading-none">
                          {e.value}
                        </span>
                        <span className="font-body font-light text-[#b0c5c6]/60 text-[11px] leading-snug">
                          {e.label}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Contract footer line */}
                <div className="relative border-t border-white/[0.05] px-6 md:px-8 py-4 flex items-center justify-between gap-4 flex-wrap">
                  <span className="font-mono text-[10px] tabular-nums text-[#b0c5c6]/40 tracking-wide">
                    EFFECTIVE: DAY 01 · VERIFIED BY: KJU PROGRAMME OFFICE
                  </span>
                  <span className="font-mono text-[10px] tabular-nums text-[#A7DADB]/45 tracking-wide">
                    {metric.ref}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

// ─── Contractual KPIs (Binding Commitments — document-grade ledger) ──────────
const ContractualKPIs: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="relative py-20 md:py-40 px-5 md:px-12 lg:px-24 overflow-hidden">
      <MeshGradient intensity="low" />
      {/* Subtle Bangalore footage — right-side atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute right-0 top-0 h-full w-[55%]">
          <BackgroundVideo
            src={FOOTAGE.bangaloreAerial}
            poster="/pricing-campus.jpg"
            objectPosition="left center"
            style={{ opacity: 0.22, filter: 'saturate(0.35) brightness(0.6) contrast(1.2)' }}
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, #020C1B 0%, rgba(2,12,27,0.85) 30%, rgba(2,12,27,0.2) 65%, transparent 100%)' }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* ─── Document-grade section header ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 gap-x-12 mb-20 md:mb-24">
          <div className="lg:col-span-5">
            {/* Eyebrow with concentric "stamp" pulse */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="flex items-center gap-4"
            >
              <span className="relative inline-flex h-3 w-3 items-center justify-center">
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[#A7DADB]/30"
                  animate={{ scale: [0.7, 1.9], opacity: [0.7, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
                />
                <motion.span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[#A7DADB]/22"
                  animate={{ scale: [0.7, 1.9], opacity: [0.6, 0] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: 1.3 }}
                />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#A7DADB] shadow-[0_0_10px_rgba(167,218,219,0.9)]" />
              </span>
              <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
                Binding Commitments
              </span>
              <span aria-hidden className="hidden md:inline-block h-px w-14 bg-gradient-to-r from-[#A7DADB]/35 to-transparent" />
            </motion.div>

            {/* Subhead — keeps the editorial "Not aspirational" line, extends with serif italic */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
              className="mt-6 font-display text-2xl md:text-3xl text-white tracking-tight"
            >
              Not aspirational.{' '}
              <span className="font-serif-display italic text-[#A7DADB]/70 font-normal">Notarized.</span>
            </motion.p>

            {/* Contract metadata strip — feels like a real document header */}
            <motion.dl
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: 0.2, ease: easeOut }}
              className="mt-10 grid grid-cols-3 max-w-[460px] border-t border-white/[0.07]"
            >
              {[
                { k: 'Contract',     v: 'KJU/STM-2026' },
                { k: 'Cadence',      v: 'Quarterly' },
                { k: 'Jurisdiction', v: 'Karnataka' },
              ].map((row, ri) => (
                <div
                  key={row.k}
                  className={`flex flex-col gap-1.5 pt-5 ${ri > 0 ? 'border-l border-white/[0.05] pl-5' : ''}`}
                >
                  <dt className="font-display text-[9px] tracking-[0.35em] uppercase text-[#b0c5c6]/45 font-bold">
                    {row.k}
                  </dt>
                  <dd className="font-mono text-[12px] tabular-nums text-[#A7DADB]/90 tracking-tight">
                    {row.v}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <div className="lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.85, ease: easeOut }}
              className="font-display font-bold text-white leading-[1] tracking-[-0.025em] text-[clamp(2.5rem,5vw,5rem)]"
            >
              Contractual KPIs.
              <br />
              <span className="font-serif-display italic font-normal text-[#A7DADB]">Reported every quarter.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
              className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
            >
              Every KPI is measured from deployment Day 1. If a target drifts off track, Smartslate flags it proactively and delivers a remediation plan within 14 days.
            </motion.p>

            {/* Subtle interactivity hint */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: 0.24, ease: easeOut }}
              className="mt-8 inline-flex items-center gap-2.5"
            >
              <span className="font-display text-[10px] tracking-[0.45em] uppercase text-[#A7DADB]/55 font-bold">
                Inspect binding terms
              </span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight className="h-3 w-3 text-[#A7DADB]/55" strokeWidth={2} />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ─── Binding ledger rows ─── */}
        <div className="space-y-0">
          {kpiMetrics.map((m, i) => (
            <BindingLedgerRow
              key={m.id}
              metric={m}
              index={i}
              isOpen={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
          {/* End-of-ledger closing strip */}
          <div className="border-t border-white/[0.07] pt-6 flex items-center justify-between gap-4 flex-wrap">
            <span className="font-mono text-[10px] tabular-nums text-[#b0c5c6]/35 tracking-wide">
              END OF LEDGER · 3 OF 3 KPIs ATTESTED
            </span>
            <span className="font-mono text-[10px] tabular-nums text-[#A7DADB]/40 tracking-wide">
              KJU/STM-2026 · v1.0
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── Phase Deliverables Modal ─────────────────────────────────────────────────
const PhaseModal: React.FC<{ phaseId: string; onClose: () => void }> = ({ phaseId, onClose }) => {
  const ph = phases.find(p => p.id === phaseId)!;
  const delivs = phaseDeliverables[phaseId] ?? [];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: easeOut }}
      className="fixed inset-0 z-[199] bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.97 }}
        transition={springModal}
        className="relative w-full max-w-[640px] max-h-[88dvh] overflow-y-auto custom-scrollbar rounded-[28px] border border-[#A7DADB]/22 bg-[#060f1e]"
        style={{ boxShadow: '0 60px 120px -24px rgba(0,0,0,0.95), inset 0 1px 0 rgba(167,218,219,0.12), 0 0 0 1px rgba(167,218,219,0.08)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 px-7 pt-7 pb-6 border-b border-white/[0.06] bg-[#060f1e]/95 backdrop-blur-2xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
                <span className="font-display text-[10px] tracking-[0.45em] uppercase text-[#A7DADB]/70 font-bold">
                  Phase {ph.id} · {ph.timeline}
                </span>
              </div>
              <h3 className="font-display font-bold text-white text-2xl md:text-3xl tracking-tight leading-tight">
                {ph.name}
              </h3>
              <p className="mt-1.5 font-display font-bold text-[#A7DADB] text-xl tabular-nums">{ph.fee}</p>
            </div>
            <motion.button
              type="button"
              onClick={onClose}
              aria-label="Close"
              whileTap={{ scale: 0.95 }}
              transition={springCard}
              className="shrink-0 press-scale inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] px-4 py-2 text-white/60 hover:text-white"
              style={{ transition: 'background-color 180ms, color 180ms' }}
            >
              <XIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span className="font-display text-[9px] tracking-[0.35em] uppercase font-bold">Close</span>
            </motion.button>
          </div>
        </div>

        {/* Deliverables list */}
        <div className="px-7 pt-6 pb-4">
          <p className="font-display text-[10px] tracking-[0.42em] uppercase text-[#b0c5c6]/45 font-bold mb-5">
            Deliverables & Milestones
          </p>
          <div className="space-y-0">
            {delivs.map((d, i) => (
              <motion.div
                key={d.item}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.38, delay: 0.08 + i * 0.04, ease: easeOut }}
                className="flex items-center gap-4 py-4 border-b border-white/[0.045] last:border-0"
              >
                <div className="shrink-0 h-5 w-5 rounded-full border border-[#A7DADB]/30 bg-[#A7DADB]/[0.08] flex items-center justify-center">
                  <Check className="h-2.5 w-2.5 text-[#A7DADB]" strokeWidth={2.5} />
                </div>
                <p className="flex-1 min-w-0 font-body text-white/82 text-sm leading-snug">{d.item}</p>
                <span className="shrink-0 inline-flex items-center px-2.5 py-1 rounded-full bg-[#A7DADB]/[0.07] border border-[#A7DADB]/15">
                  <span className="font-display text-[10px] tracking-[0.25em] uppercase text-[#A7DADB]/75 font-bold tabular-nums">
                    {d.dueLabel}
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="px-7 pb-7">
          <div className="rounded-[14px] bg-[#A7DADB]/[0.04] border border-[#A7DADB]/12 px-5 py-4">
            <p className="font-body text-[#b0c5c6]/55 text-xs leading-relaxed">
              All deliverables are contractually binding and included in the Phase {ph.id} service fee of{' '}
              <span className="text-[#A7DADB] font-bold">{ph.fee}</span>. Dates are measured from programme start date.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Fee Schedule ─────────────────────────────────────────────────────────────
const FeeSchedule: React.FC = () => {
  const [openPhaseId, setOpenPhaseId] = useState<string | null>(null);

  useEffect(() => {
    if (!openPhaseId) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenPhaseId(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [openPhaseId]);

  useEffect(() => {
    document.body.style.overflow = openPhaseId ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openPhaseId]);

  return (
    <>
      <section id="fee-structure" className="relative py-20 md:py-40 px-5 md:px-12 lg:px-24 overflow-hidden">
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
                Smartslate service fees are fixed per phase across all three implementation options. Your choice of Cloud, Hybrid, or On-Prem determines only the underlying technology costs — which KJU pays directly to vendors at zero markup.{' '}
                <span className="text-[#A7DADB]/70 text-base">Click each phase to see every deliverable.</span>
              </motion.p>
            </div>
          </div>

          {/* Commitment pillars — unified document panel */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: easeOut }}
            className="relative mb-16"
          >
            {/* Document seal line — sweeps left-to-right on viewport entry */}
            <motion.div
              aria-hidden
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease: easeOut, delay: 0.2 }}
              className="absolute top-0 left-0 right-0 h-px origin-left z-10 pointer-events-none"
              style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(167,218,219,0.65) 20%, rgba(167,218,219,0.65) 80%, transparent 100%)' }}
            />

            {/* Unified panel — gap-px creates hairline teal column dividers */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-[24px] overflow-hidden"
              style={{ background: 'rgba(167,218,219,0.07)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {commitmentPillars.map((p, pi) => {
                const PIcon = p.Icon;
                return (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.55, delay: pi * 0.12, ease: easeOut }}
                    className="group relative flex flex-col overflow-hidden"
                    style={{ background: 'rgb(8,18,35)' }}
                  >
                    {/* Hover: radial teal wash from top-center */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                      style={{
                        background: 'radial-gradient(75% 50% at 50% 0%, rgba(167,218,219,0.055) 0%, transparent 100%)',
                        transition: 'opacity 450ms var(--ease-out-expo)',
                      }}
                    />

                    <div className="relative flex flex-col gap-7 p-8 md:p-10 h-full">
                      {/* §clause watermark — Playfair italic, very muted */}
                      <span
                        aria-hidden
                        className="absolute top-0 right-4 font-serif-display italic font-normal leading-none pointer-events-none select-none"
                        style={{ fontSize: 'clamp(4.5rem, 7vw, 6.5rem)', color: 'rgba(167,218,219,0.05)', lineHeight: 1.1 }}
                      >
                        {p.clause}
                      </span>

                      {/* Header: icon (left) + clause ref (right) */}
                      <div className="flex items-center justify-between">
                        <div
                          className="h-12 w-12 rounded-xl flex items-center justify-center"
                          style={{
                            border: '1px solid rgba(167,218,219,0.2)',
                            background: 'rgba(167,218,219,0.07)',
                            transition: 'border-color 350ms var(--ease-out-expo), background-color 350ms var(--ease-out-expo)',
                          }}
                          onMouseEnter={e => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(167,218,219,0.42)';
                            (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(167,218,219,0.13)';
                          }}
                          onMouseLeave={e => {
                            (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(167,218,219,0.2)';
                            (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(167,218,219,0.07)';
                          }}
                        >
                          <PIcon className="h-5 w-5 text-[#A7DADB]" strokeWidth={1.75} />
                        </div>
                        <span
                          className="font-mono text-[11px] tabular-nums tracking-widest"
                          style={{ color: 'rgba(167,218,219,0.28)' }}
                        >
                          {p.clause}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-4 flex-1">
                        <h3 className="font-display font-bold text-white text-xl md:text-2xl tracking-tight leading-[1.1]">
                          {p.title}
                        </h3>
                        {/* Teal rule — tapers right */}
                        <div
                          className="h-px w-10"
                          style={{ background: 'linear-gradient(90deg, rgba(167,218,219,0.55) 0%, transparent 100%)' }}
                        />
                        <p className="font-body font-light text-[#b0c5c6] text-[15px] leading-[1.65]">
                          {p.body}
                        </p>
                      </div>

                      {/* Footer tag */}
                      <div
                        className="flex items-center gap-2.5 pt-5 border-t"
                        style={{ borderColor: 'rgba(255,255,255,0.055)' }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: 'rgba(167,218,219,0.4)' }} />
                        <span
                          className="font-display text-[9px] tracking-[0.42em] uppercase font-bold"
                          style={{ color: 'rgba(167,218,219,0.45)' }}
                        >
                          {p.tag}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
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
            <div className="lg:col-span-7 rounded-[20px] md:rounded-[24px] border border-[#A7DADB]/18 bg-[#0a1729]/70 backdrop-blur-xl glass-refract overflow-hidden">
              {/* Table header */}
              <div className="px-5 sm:px-8 py-5 border-b border-white/[0.06] flex items-center justify-between gap-4">
                <span className="font-display text-[10px] tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
                  Smartslate Service Fees — Fixed per Phase
                </span>
                <span className="shrink-0 inline-flex items-center gap-1.5 opacity-60">
                  <span className="h-1 w-1 rounded-full bg-[#A7DADB] animate-soft-pulse" />
                  <span className="font-display text-[9px] tracking-[0.3em] uppercase text-[#A7DADB]/70 font-bold hidden sm:block">
                    Click a phase
                  </span>
                </span>
              </div>

              {/* Clickable phase rows */}
              <div className="divide-y divide-white/[0.05]">
                {phases.map((ph, i) => (
                  <motion.button
                    key={ph.id}
                    type="button"
                    onClick={() => setOpenPhaseId(ph.id)}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.45, delay: i * 0.07, ease: easeOut }}
                    whileTap={{ scale: 0.99 }}
                    className="group relative w-full text-left flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 px-5 sm:px-8 py-5 sm:py-6 sm:items-center cursor-pointer hover:bg-[#A7DADB]/[0.06]"
                    style={{ transition: 'background-color 200ms var(--ease-out-expo)' }}
                    aria-label={`View ${ph.name} deliverables`}
                  >
                    {/* Left edge bar — grows in on hover */}
                    <span
                      aria-hidden
                      className="absolute left-0 top-[15%] bottom-[15%] w-[2px] bg-[#A7DADB]/55 rounded-full origin-center scale-y-0 group-hover:scale-y-100"
                      style={{ transition: 'transform 380ms var(--ease-out-expo)' }}
                    />

                    {/* Phase + timeline */}
                    <div className="sm:col-span-2 flex items-center justify-between sm:block">
                      <span className="font-display text-[11px] tracking-[0.35em] uppercase text-[#b0c5c6]/45 font-bold">
                        Phase {ph.id}
                      </span>
                      <p className="mt-0 sm:mt-1 font-display text-[10px] tracking-[0.25em] uppercase text-[#b0c5c6]/30 font-bold">
                        {ph.timeline}
                      </p>
                    </div>

                    {/* Name + description + hover chip */}
                    <div
                      className="sm:col-span-7"
                      style={{ transform: 'translateX(0)', transition: 'transform 220ms var(--ease-out-expo)' }}
                    >
                      <p
                        className="font-display font-bold text-white text-base tracking-tight group-hover:text-[#A7DADB]"
                        style={{ transition: 'color 200ms var(--ease-out-expo)' }}
                      >
                        {ph.name}
                      </p>
                      <p className="mt-1 font-body font-light text-[#b0c5c6]/70 text-sm leading-snug">{ph.includes}</p>
                      <div
                        className="mt-2.5 hidden sm:inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 pointer-events-none"
                        style={{ transition: 'opacity 250ms var(--ease-out-expo), transform 250ms var(--ease-out-expo)' }}
                      >
                        <span className="h-[5px] w-[5px] rounded-full bg-[#A7DADB]/60" />
                        <span className="font-display text-[9px] tracking-[0.32em] uppercase text-[#A7DADB]/65 font-bold">
                          View deliverables
                        </span>
                      </div>
                    </div>

                    {/* Fee + arrow icon */}
                    <div className="sm:col-span-3 flex items-center justify-between sm:justify-end gap-3">
                      <span className="font-display font-bold text-[#A7DADB] text-xl tabular-nums">{ph.fee}</span>
                      <div
                        className="h-8 w-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center group-hover:border-[#A7DADB]/35 group-hover:bg-[#A7DADB]/[0.09]"
                        style={{ transition: 'border-color 280ms, background-color 280ms' }}
                      >
                        <ArrowUpRight
                          className="h-3.5 w-3.5 text-white/25 group-hover:text-[#A7DADB]"
                          strokeWidth={2}
                          style={{ transition: 'color 280ms var(--ease-out-expo)' }}
                        />
                      </div>
                    </div>
                  </motion.button>
                ))}

                {/* Year 1 total */}
                <div className="flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 px-5 sm:px-8 py-5 sm:items-center bg-[#A7DADB]/[0.05] border-t border-[#A7DADB]/18">
                  <div className="sm:col-span-2">
                    <span className="font-display text-[11px] tracking-[0.35em] uppercase text-[#A7DADB]/70 font-bold">
                      Year 1
                    </span>
                  </div>
                  <div className="sm:col-span-7">
                    <p className="font-display font-bold text-white text-base tracking-tight">Complete Transformation Programme</p>
                    <p className="mt-0.5 font-body text-[#b0c5c6]/55 text-sm">6 months · Phases 1 through 3</p>
                  </div>
                  <div className="sm:col-span-3 flex justify-between sm:justify-end items-baseline sm:items-center gap-2">
                    <span className="sm:hidden font-display text-[10px] tracking-[0.3em] uppercase text-[#b0c5c6]/55 font-bold">Total</span>
                    <span className="font-display font-bold text-[#A7DADB] text-2xl tabular-nums">₹88L</span>
                  </div>
                </div>

                {/* Retainer */}
                <div className="flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 px-5 sm:px-8 py-5 sm:items-center">
                  <div className="sm:col-span-2 flex items-center justify-between sm:block">
                    <span className="font-display text-[11px] tracking-[0.35em] uppercase text-[#b0c5c6]/45 font-bold">
                      Annual
                    </span>
                    <p className="mt-0 sm:mt-1 font-display text-[10px] tracking-[0.25em] uppercase text-[#b0c5c6]/30 font-bold">Year 2+</p>
                  </div>
                  <div className="sm:col-span-7">
                    <p className="font-display font-bold text-white text-base tracking-tight">Partnership Retainer</p>
                    <p className="mt-1 font-body font-light text-[#b0c5c6]/70 text-sm leading-snug">
                      Updates, new faculty onboarding, QBRs, advisory, playbook revisions
                    </p>
                  </div>
                  <div className="sm:col-span-3 flex justify-between sm:justify-end items-baseline sm:items-center gap-2">
                    <span className="sm:hidden font-display text-[10px] tracking-[0.3em] uppercase text-[#b0c5c6]/55 font-bold">Retainer</span>
                    <span className="font-display font-bold text-white/75 text-xl tabular-nums">₹44L / yr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* KJU direct tech costs */}
            <div className="lg:col-span-5 rounded-[20px] md:rounded-[24px] border border-white/[0.07] bg-[#0a1729]/50 backdrop-blur-xl glass-refract overflow-hidden">
              <div className="px-5 sm:px-7 py-5 border-b border-white/[0.06]">
                <span className="font-display text-[10px] tracking-[0.45em] uppercase text-[#b0c5c6]/55 font-bold">
                  KJU Direct Technology Costs
                </span>
                <p className="mt-2 font-body text-[#b0c5c6]/45 text-xs leading-relaxed">
                  Paid by KJU directly to technology vendors. Smartslate charges no markup.
                </p>
              </div>
              <div className="px-5 sm:px-7 py-6 space-y-4">
                {directTechItems.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1.5 h-1 w-3 bg-[#b0c5c6]/25 shrink-0 rounded-full" />
                    <span className="font-body text-[#b0c5c6]/60 text-sm leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mx-5 sm:mx-7 mb-7 rounded-[14px] border border-[#A7DADB]/18 bg-[#A7DADB]/[0.04] px-5 py-4">
                <p className="font-display text-[10px] tracking-[0.35em] uppercase text-[#A7DADB]/70 font-bold mb-2">
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

      {/* Phase deliverables modal — portal to escape any CSS-transform containing blocks */}
      {createPortal(
        <AnimatePresence>
          {openPhaseId && (
            <PhaseModal key={openPhaseId} phaseId={openPhaseId} onClose={() => setOpenPhaseId(null)} />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

// ─── Implementation Paths (year-tab selector) ─────────────────────────────────
const ImplementationPaths: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('1');

  return (
    <section id="paths" className="relative py-20 md:py-40 px-5 md:px-12 lg:px-24 overflow-hidden">
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

        {/* Year tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="flex items-stretch sm:items-center gap-1.5 sm:gap-2 mb-10 p-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md w-full sm:w-fit"
        >
          {paths.map((p) => (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              whileTap={{ scale: 0.97 }}
              transition={springCard}
              className="relative flex-1 sm:flex-initial rounded-full px-2 sm:px-5 py-2 sm:py-2.5 font-display text-[10px] sm:text-xs tracking-[0.18em] sm:tracking-[0.25em] uppercase font-bold text-center whitespace-nowrap"
              style={{
                color: activeId === p.id ? '#020C1B' : 'rgba(176,197,198,0.7)',
                transition: 'color 350ms var(--ease-out-expo)',
              }}
            >
              {activeId === p.id && (
                <motion.span
                  layoutId="path-tab-bg"
                  className="absolute inset-0 rounded-full bg-[#A7DADB]"
                  transition={{ duration: 0.35, ease: easeOut }}
                />
              )}
              <span className="relative z-10">{p.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Path cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {paths.map((path, i) => {
            const { Icon } = path;
            const isActive = activeId === path.id;
            return (
              <motion.article
                key={path.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: easeOut }}
                onClick={() => setActiveId(path.id)}
                whileTap={{ scale: 0.985 }}
                className="group relative isolate overflow-hidden rounded-[28px] bg-[#0a1729]/70 backdrop-blur-xl glass-refract flex flex-col cursor-pointer"
                style={{
                  border: isActive
                    ? '1px solid rgba(167,218,219,0.38)'
                    : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: isActive
                    ? 'inset 0 1px 0 rgba(255,255,255,0.07), 0 0 0 1px rgba(167,218,219,0.12), 0 0 80px -16px rgba(167,218,219,0.3), 0 30px 60px -24px rgba(0,0,0,0.7)'
                    : 'inset 0 1px 0 rgba(255,255,255,0.04), 0 30px 60px -24px rgba(0,0,0,0.5)',
                  transition: 'border-color 350ms var(--ease-out-expo), box-shadow 350ms var(--ease-out-expo)',
                }}
              >
                <div className="flex flex-col gap-6 p-6 md:p-9 flex-1">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="inline-flex items-center justify-center h-11 w-11 rounded-xl"
                      style={{
                        border: `1px solid ${isActive ? 'rgba(167,218,219,0.4)' : 'rgba(167,218,219,0.2)'}`,
                        background: `rgba(167,218,219,${isActive ? '0.15' : '0.07'})`,
                        transition: 'background 400ms, border-color 400ms',
                      }}
                    >
                      <Icon className="h-5 w-5 text-[#A7DADB]" strokeWidth={1.5} />
                    </div>
                    {path.featured ? (
                      <span
                        className="inline-flex items-center rounded-full px-3 py-1 font-display text-[9px] tracking-[0.35em] uppercase font-bold text-[#A7DADB]"
                        style={{ background: 'rgba(167,218,219,0.1)', border: '1px solid rgba(167,218,219,0.28)' }}
                      >
                        Recommended
                      </span>
                    ) : (
                      <span
                        className="font-display text-[10px] tracking-[0.3em] uppercase font-bold px-3 py-1 rounded-full text-[#A7DADB]/60"
                        style={{ border: 'rgba(167,218,219,0.2)', background: 'rgba(167,218,219,0.06)' }}
                      >
                        Path {path.id}
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="font-display text-[10px] tracking-[0.4em] uppercase font-bold mb-2 text-[#A7DADB]/75">
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
                      <span className="font-display font-bold tabular-nums text-lg text-[#A7DADB]">{path.yearOneTotal}</span>
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: easeOut }}
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
                  {(['Cloud Only', 'Phased Hybrid', 'On-Premise'] as const).map((col) => (
                    <th key={col} className="py-4 px-5 text-right">
                      <span className="font-display text-[11px] tracking-[0.3em] uppercase font-bold text-[#A7DADB]">
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
                    className="border-t border-white/[0.04]"
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
                          className={`font-display tabular-nums ${row.bold ? 'font-bold text-lg text-[#A7DADB]' : 'font-bold text-sm text-white/75'}`}
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
};

// ─── Programme Pillars ────────────────────────────────────────────────────────
const ProgrammePillars: React.FC = () => {
  const [desktopIdx, setDesktopIdx] = useState(0);
  const [mobileIdx, setMobileIdx] = useState<number | null>(null);
  const active = programmePillars[desktopIdx];
  const ActiveIcon = active.Icon;

  return (
    <section id="programme" className="relative py-20 md:py-40 px-5 md:px-12 lg:px-24 overflow-hidden">
      <MeshGradient intensity="low" />
      <div className="relative z-10 max-w-[1440px] mx-auto">

        {/* ── Section header ── */}
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

        {/* ── Desktop: left-nav + right panel ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="hidden lg:grid lg:grid-cols-12 gap-6 items-start"
        >
          {/* Left: pillar selector */}
          <nav className="lg:col-span-4 rounded-[24px] overflow-hidden border border-white/[0.07] bg-[#0a1729]/50 backdrop-blur-xl glass-refract">
            {programmePillars.map((p, i) => {
              const isActive = desktopIdx === i;
              return (
                <motion.button
                  key={p.num}
                  type="button"
                  onClick={() => setDesktopIdx(i)}
                  whileTap={{ scale: 0.99 }}
                  transition={springCard}
                  className={`group relative w-full text-left px-7 py-6 cursor-pointer ${i < programmePillars.length - 1 ? 'border-b border-white/[0.05]' : ''}`}
                  style={{
                    backgroundColor: isActive ? 'rgba(167,218,219,0.06)' : 'transparent',
                    transition: 'background-color 250ms var(--ease-out-expo)',
                  }}
                >
                  {/* Active left border */}
                  <span
                    aria-hidden
                    className="absolute left-0 inset-y-[14%] w-[2.5px] bg-[#A7DADB] rounded-r-full"
                    style={{ opacity: isActive ? 1 : 0, transition: 'opacity 250ms var(--ease-out-expo)' }}
                  />

                  <div className="flex items-start gap-4">
                    {/* Large number */}
                    <span
                      className="font-display font-bold tabular-nums leading-none shrink-0 mt-1 text-[2rem]"
                      style={{
                        color: isActive ? 'rgba(167,218,219,0.85)' : 'rgba(176,197,198,0.18)',
                        transition: 'color 250ms var(--ease-out-expo)',
                      }}
                    >
                      {p.num}
                    </span>

                    <div className="flex-1 min-w-0">
                      <p
                        className="font-display text-[9.5px] tracking-[0.4em] uppercase font-bold leading-none"
                        style={{ color: isActive ? 'rgba(167,218,219,0.65)' : 'rgba(176,197,198,0.35)', transition: 'color 250ms' }}
                      >
                        {p.pillar}
                      </p>
                      <h3
                        className="mt-1 font-display font-bold text-[1.05rem] tracking-tight leading-tight"
                        style={{ color: isActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.45)', transition: 'color 250ms var(--ease-out-expo)' }}
                      >
                        {p.name}
                      </h3>
                      {/* Stat preview — AnimatePresence for spring-interruptible height (replaces max-height hack) */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="stat-preview"
                            initial={{ height: 0, opacity: 0, marginTop: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginTop: '0.5rem' }}
                            exit={{ height: 0, opacity: 0, marginTop: 0 }}
                            transition={{ duration: 0.35, ease: easeOut }}
                            className="overflow-hidden"
                          >
                            <span className="font-display font-bold text-[#A7DADB] text-xl tabular-nums">{p.stat.value}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </nav>

          {/* Right: animated content panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={desktopIdx}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.42, ease: easeOut }}
                className="rounded-[28px] border border-white/[0.07] bg-[#0a1729]/60 backdrop-blur-xl glass-refract overflow-hidden"
              >
                {/* Panel top: icon + name + headline */}
                <div className="relative px-8 pt-8 pb-7 border-b border-white/[0.05] overflow-hidden">
                  {/* Contextual footage — right-side magazine blend */}
                  <div className="absolute top-0 right-0 h-full w-[52%] pointer-events-none">
                    <BackgroundVideo
                      src={active.video}
                      poster={active.photo}
                      style={{ opacity: 0.5, filter: 'saturate(0.5) brightness(0.55) contrast(1.1)' }}
                    />
                  </div>
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(105deg, #0a1729 22%, rgba(10,23,41,0.85) 40%, rgba(10,23,41,0.3) 65%, rgba(10,23,41,0.5) 100%)' }}
                  />
                  {/* Decorative glow */}
                  <div
                    aria-hidden
                    className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-[#A7DADB] pointer-events-none"
                    style={{ filter: 'blur(72px)', opacity: 0.07 }}
                  />
                  <div className="relative flex items-start gap-5">
                    <div className="shrink-0 h-14 w-14 rounded-2xl border border-[#A7DADB]/22 bg-[#A7DADB]/[0.08] flex items-center justify-center">
                      <ActiveIcon className="h-6 w-6 text-[#A7DADB]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="font-display text-[10px] tracking-[0.42em] uppercase text-[#A7DADB] font-bold">{active.pillar}</span>
                      <h3 className="mt-0.5 font-display font-bold text-white leading-tight tracking-tight text-2xl md:text-[1.7rem]">
                        {active.name}
                      </h3>
                    </div>
                  </div>
                  <p className="relative mt-5 font-body font-light text-[#b0c5c6] text-base md:text-[17px] leading-[1.65] max-w-[52ch]">
                    {active.headline}
                  </p>
                </div>

                {/* Stat callout */}
                <div className="px-8 py-5 flex items-center gap-5 border-b border-white/[0.05] bg-[#A7DADB]/[0.025]">
                  <span
                    className="font-display font-bold tabular-nums text-[#A7DADB] leading-none shrink-0"
                    style={{ fontSize: 'clamp(2.6rem, 4.5vw, 3.75rem)' }}
                  >
                    {active.stat.value}
                  </span>
                  <div className="h-10 w-px bg-[#A7DADB]/18 shrink-0" />
                  <p className="font-body font-light text-[#b0c5c6]/70 text-sm leading-snug max-w-[34ch]">
                    {active.stat.label}
                  </p>
                </div>

                {/* Feature card grid */}
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {active.items.map((item, ii) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.38, delay: 0.12 + ii * 0.07, ease: easeOut }}
                        className="rounded-[16px] border border-white/[0.06] bg-white/[0.025] p-5"
                        style={{ transition: 'background-color 200ms, border-color 200ms' }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.04)';
                          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(167,218,219,0.14)';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLDivElement).style.backgroundColor = 'rgba(255,255,255,0.025)';
                          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.06)';
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="shrink-0 mt-0.5 h-[18px] w-[18px] rounded-full border border-[#A7DADB]/30 bg-[#A7DADB]/[0.09] flex items-center justify-center">
                            <Check className="h-2 w-2 text-[#A7DADB]" strokeWidth={3} />
                          </div>
                          <div>
                            <p className="font-display font-bold text-white text-[0.8rem] tracking-tight leading-snug">
                              {item.title}
                            </p>
                            <p className="mt-1.5 font-body font-light text-[#b0c5c6]/60 text-[0.72rem] leading-relaxed">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Mobile: enhanced accordion ── */}
        <div className="lg:hidden space-y-0">
          {programmePillars.map((p, i) => {
            const isOpen = mobileIdx === i;
            const PIcon = p.Icon;
            return (
              <motion.article
                key={p.num}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, delay: i * 0.07, ease: easeOut }}
                className="relative border-t border-white/[0.07]"
              >
                {/* Teal rule that stretches when open */}
                {/* scaleX from left — avoids layout thrash caused by animating width */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-px w-full bg-[#A7DADB] origin-left scale-x-from-left"
                  style={{
                    transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
                    opacity: isOpen ? 0.55 : 0,
                    transition: 'transform 600ms var(--ease-out-expo), opacity 350ms',
                  }}
                />

                <motion.button
                  type="button"
                  onClick={() => setMobileIdx(isOpen ? null : i)}
                  className="w-full text-left py-8 cursor-pointer"
                  aria-expanded={isOpen}
                  whileTap={{ scale: 0.99 }}
                  transition={springCard}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="shrink-0 h-11 w-11 rounded-xl border flex items-center justify-center"
                        style={{
                          borderColor: isOpen ? 'rgba(167,218,219,0.3)' : 'rgba(167,218,219,0.12)',
                          backgroundColor: isOpen ? 'rgba(167,218,219,0.1)' : 'rgba(167,218,219,0.05)',
                          transition: 'border-color 280ms, background-color 280ms',
                        }}
                      >
                        <PIcon className="h-5 w-5 text-[#A7DADB]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p
                          className="font-display text-[10px] tracking-[0.38em] uppercase font-bold"
                          style={{ color: isOpen ? 'rgba(167,218,219,0.7)' : 'rgba(167,218,219,0.45)', transition: 'color 280ms' }}
                        >
                          {p.pillar}
                        </p>
                        <h3
                          className="mt-0.5 font-display font-bold text-xl tracking-tight"
                          style={{ color: isOpen ? '#fff' : 'rgba(255,255,255,0.75)', transition: 'color 280ms' }}
                        >
                          {p.name}
                        </h3>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.38, ease: easeOut }}
                      className="shrink-0 h-8 w-8 rounded-full border border-[#A7DADB]/22 bg-[#A7DADB]/[0.06] flex items-center justify-center"
                    >
                      <ChevronDown className="h-3.5 w-3.5 text-[#A7DADB]" strokeWidth={2} />
                    </motion.div>
                  </div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="mobile-expand"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.48, ease: easeOut }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10">
                        {/* Footage strip */}
                        <div className="relative mb-5 rounded-[16px] overflow-hidden h-36">
                          <BackgroundVideo
                            src={p.video}
                            poster={p.photo}
                            style={{ filter: 'saturate(0.7) brightness(0.7) contrast(1.05)' }}
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0"
                            style={{ background: 'linear-gradient(180deg, transparent 20%, rgba(2,12,27,0.85) 100%)' }}
                          />
                          <div className="absolute bottom-3 left-4">
                            <span className="font-display text-[9px] tracking-[0.4em] uppercase text-[#A7DADB]/65 font-bold">{p.pillar}</span>
                          </div>
                        </div>
                        {/* Headline */}
                        <p className="mb-5 font-body font-light text-[#b0c5c6] text-sm leading-relaxed">{p.headline}</p>

                        {/* Stat chip */}
                        <div className="mb-6 inline-flex items-center gap-4 rounded-[14px] border border-[#A7DADB]/15 bg-[#A7DADB]/[0.05] px-5 py-3">
                          <span className="font-display font-bold text-[#A7DADB] text-[1.85rem] tabular-nums leading-none">{p.stat.value}</span>
                          <div className="h-8 w-px bg-[#A7DADB]/18" />
                          <p className="font-body text-[#b0c5c6]/60 text-xs leading-snug max-w-[18ch]">{p.stat.label}</p>
                        </div>

                        {/* Items list */}
                        <div className="space-y-3">
                          {p.items.map((item) => (
                            <div
                              key={item.title}
                              className="flex items-start gap-3 rounded-[14px] border border-white/[0.05] bg-white/[0.02] p-4"
                            >
                              <div className="shrink-0 mt-0.5 h-[18px] w-[18px] rounded-full border border-[#A7DADB]/28 bg-[#A7DADB]/[0.08] flex items-center justify-center">
                                <Check className="h-2 w-2 text-[#A7DADB]" strokeWidth={3} />
                              </div>
                              <div>
                                <p className="font-display font-bold text-white text-sm tracking-tight">{item.title}</p>
                                <p className="mt-1 font-body text-[#b0c5c6]/60 text-xs leading-relaxed">{item.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// ─── ROI Calculator ───────────────────────────────────────────────────────────

const ROI_PATHS = [
  { id: 'cloud',  label: 'Cloud',   sub: 'Year 1 Start',   invest: 91.3, investLabel: '₹91.3L' },
  { id: 'hybrid', label: 'Hybrid',  sub: 'Year 2 Migrate', invest: 97.3, investLabel: '₹97.3L' },
  { id: 'onprem', label: 'On-Prem', sub: 'Year 3 Own',     invest: 136,  investLabel: '₹1.36Cr' },
] as const;
type RoiPathId = (typeof ROI_PATHS)[number]['id'];

type RoiIcon = LucideIcon;

const ROI_METHOD: { k: string; v: string }[] = [
  { k: 'Faculty time reclaimed', v: 'A contractual KPI — 200 teaching hours returned per faculty member each year, valued at ₹600/hr (₹1.2L/year). Measured weekly against a pre-deployment baseline.' },
  { k: 'Administrative capacity', v: 'The 24/7 concierge resolves ≥70% of routine query load autonomously. Modelled at 220 support hours redirected per staff member per year, valued at ₹300/hr.' },
  { k: 'Earned media value', v: 'Advertising Value Equivalent (AVE) of regional and national education-vertical coverage generated by a first-mover announcement. Visitor-set; the default sits at the conservative low end.' },
  { k: 'Enquiry-to-admission rate', v: 'A deliberately conservative 20% funnel conversion — incremental enquiries are shown as 5× incremental admissions.' },
  { k: 'Admissions uplift', v: 'The share of annual intake attributable to AI-native brand positioning and national visibility. Visitor-set; the 3% default is a conservative floor.' },
  { k: 'Cohort lifetime value', v: 'Incremental admissions × average annual tuition × 3.5 years average degree duration.' },
  { k: 'Year 1 investment', v: 'Total Year 1 cost for the selected path — Cloud ₹91.3L, Hybrid ₹97.3L, On-Prem ₹1.36 Cr — from the AI Transformation Programme Proposal.' },
  { k: 'Why it compounds', v: 'Operational efficiency and admissions revenue recur every year. Year 1 is the floor of the return, not its ceiling.' },
];

const AnimatedValue: React.FC<{ value: string; className?: string; style?: React.CSSProperties }> = ({ value, className, style }) => (
  <AnimatePresence mode="wait" initial={false}>
    <motion.span
      key={value}
      initial={{ opacity: 0, y: 5, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -5, filter: 'blur(4px)' }}
      transition={{ duration: 0.22, ease: easeOut }}
      className={className}
      style={style}
    >
      {value}
    </motion.span>
  </AnimatePresence>
);

const RoiSlider: React.FC<{
  label: string; value: number; min: number; max: number; step: number;
  display: string; minLabel: string; maxLabel: string; onChange: (v: number) => void;
}> = ({ label, value, min, max, step, display, minLabel, maxLabel, onChange }) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-4">
        <label className="font-display text-[10.5px] tracking-[0.26em] uppercase text-[#A7DADB] font-bold leading-snug">{label}</label>
        <span className="font-display font-bold text-white text-xl tabular-nums shrink-0">{display}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="pricing-range w-full cursor-pointer"
        style={{ background: `linear-gradient(to right, #A7DADB ${pct}%, rgba(255,255,255,0.12) ${pct}%)` }}
      />
      <div className="flex justify-between mt-2">
        <span className="font-display text-[10px] text-[#b0c5c6]/35 font-bold">{minLabel}</span>
        <span className="font-display text-[10px] text-[#b0c5c6]/35 font-bold">{maxLabel}</span>
      </div>
    </div>
  );
};

const RoiMetric: React.FC<{ Icon: RoiIcon; label: string; value: string; unit: string }> = ({ Icon, label, value, unit }) => (
  <motion.div
    whileHover={{ y: -3, transition: springCard }}
    className="rounded-[18px] border border-white/[0.08] hover:border-[#A7DADB]/16 bg-[#0a1729]/60 hover:bg-[#0a1729]/80 backdrop-blur-xl glass-refract p-6 flex flex-col justify-between min-h-[160px]"
    style={{ transition: 'border-color 220ms var(--ease-out-expo), background-color 220ms var(--ease-out-expo)' }}
  >
    <div className="flex items-center gap-2.5">
      <Icon className="h-4 w-4 text-[#A7DADB]/70" strokeWidth={1.75} />
      <span className="font-display text-[9.5px] tracking-[0.24em] uppercase font-bold text-[#A7DADB]/60">{label}</span>
    </div>
    <div className="mt-4">
      <AnimatedValue
        value={value}
        className="block font-display font-bold tabular-nums tracking-tight leading-none text-[#A7DADB]"
        style={{ fontSize: 'clamp(1.7rem,3.2vw,2.4rem)' }}
      />
      <span className="mt-1.5 block font-body text-[#b0c5c6]/50 text-sm leading-snug">{unit}</span>
    </div>
  </motion.div>
);

const RoiStream: React.FC<{
  index: string; Icon: RoiIcon; title: string; body: string; children: React.ReactNode; delay?: number;
}> = ({ index, Icon, title, body, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 26 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-70px' }}
    transition={{ duration: 0.75, delay, ease: easeOut }}
  >
    <div className="flex items-start gap-5 mb-7">
      <div className="shrink-0 flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#A7DADB]/20 bg-[#A7DADB]/[0.06]">
        <Icon className="h-5 w-5 text-[#A7DADB]" strokeWidth={1.75} />
      </div>
      <div>
        <div className="flex items-center gap-3">
          <span className="font-serif-display italic text-[#A7DADB]/40 text-lg leading-none">{index}</span>
          <h3 className="font-display font-bold text-white text-xl md:text-2xl tracking-tight">{title}</h3>
        </div>
        <p className="mt-2 font-body font-light text-[#b0c5c6]/70 text-sm md:text-[15px] leading-relaxed max-w-[64ch]">{body}</p>
      </div>
    </div>
    {children}
  </motion.div>
);

const ROICalculator: React.FC = () => {
  const [faculty, setFaculty] = useState(200);
  const [adminStaff, setAdminStaff] = useState(180);
  const [admissions, setAdmissions] = useState(5000);
  const [tuition, setTuition] = useState(1.0);
  const [pathId, setPathId] = useState<RoiPathId>('cloud');
  const [uplift, setUplift] = useState(3);
  const [mediaValue, setMediaValue] = useState(50);
  const [showMethod, setShowMethod] = useState(false);

  const path = ROI_PATHS.find((p) => p.id === pathId) ?? ROI_PATHS[0];
  const invest = path.invest;

  // Stream 01 — Operational efficiency (recurring, annual)
  const facultyHours = faculty * 200;
  const facultyValue = faculty * 1.2;
  const adminHours = adminStaff * 220;
  const adminValue = adminStaff * 0.66;
  const operationalValue = facultyValue + adminValue;

  // Stream 03 — Admissions pipeline (Year 1)
  const incrAdmissions = Math.round(admissions * (uplift / 100));
  const incrEnquiries = incrAdmissions * 5;
  const newRevenue = incrAdmissions * tuition;
  const cohortLTV = incrAdmissions * tuition * 3.5;

  // Bottom line
  const totalValue = operationalValue + mediaValue + newRevenue;
  const netReturn = totalValue - invest;
  const roiMultiple = totalValue / invest;
  const paybackMonths = (invest / totalValue) * 12;
  const cashPaybackMonths = newRevenue > 0 ? (invest / newRevenue) * 12 : 0;

  const opPct = (operationalValue / totalValue) * 100;
  const mediaPct = (mediaValue / totalValue) * 100;
  const revPct = (newRevenue / totalValue) * 100;

  const fmtMonths = (m: number) => (m < 1 ? '<1' : m < 10 ? m.toFixed(1) : String(Math.round(m)));
  const fmtSigned = (l: number) => (l < 0 ? `−${formatINR(-l)}` : formatINR(l));

  const heroStats = [
    { label: 'Total Value Created', value: formatINR(totalValue) },
    { label: 'Year 1 Investment', value: path.investLabel },
    { label: 'Net Year 1 Return', value: fmtSigned(netReturn) },
    { label: 'Payback Period', value: `~${fmtMonths(paybackMonths)} mo` },
  ];

  return (
    <section id="roi" className="relative py-20 md:py-40 px-5 md:px-12 lg:px-24 overflow-hidden">
      <MeshGradient intensity="med" />
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_72%_28%,rgba(0,0,0,0.4)_0%,transparent_70%)]">
        <FlickeringGrid color="rgb(167,218,219)" squareSize={3} gridGap={11} flickerChance={0.07} maxOpacity={0.08} />
      </div>
      <Vignette strength={0.4} />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-16">
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
                ROI Projection
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
              className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
            >
              Three return streams
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
              The return on
              <br />
              <span className="font-serif-display italic font-normal text-[#A7DADB]">institutional intelligence.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeOut }}
              className="mt-7 font-body font-light text-[#b0c5c6] text-base md:text-lg leading-[1.65] max-w-[68ch]"
            >
              One investment, three compounding returns — the operational hours your staff reclaim, the earned
              media the AI-native designation generates, and the admissions revenue national visibility drives.
              Move the inputs to match your institution; every figure recomputes live against contractual KPIs
              and conservative, fully-disclosed assumptions.
            </motion.p>
          </div>
        </div>

        {/* Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* ── Controls ─────────────────────────── */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              {/* Institution inputs */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: easeOut }}
                className="rounded-[20px] md:rounded-[28px] border border-white/[0.08] bg-[#0a1729]/80 backdrop-blur-xl glass-refract p-6 md:p-8"
              >
                <div className="flex items-center gap-2.5 mb-8">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB]" />
                  <span className="font-display text-[10px] tracking-[0.4em] uppercase text-white/85 font-bold">Your Institution</span>
                </div>
                <div className="flex flex-col gap-9">
                  <RoiSlider
                    label="Faculty Size" value={faculty} min={50} max={500} step={10}
                    display={String(faculty)} minLabel="50" maxLabel="500" onChange={setFaculty}
                  />
                  <RoiSlider
                    label="Administrative & Support Staff" value={adminStaff} min={50} max={600} step={10}
                    display={String(adminStaff)} minLabel="50" maxLabel="600" onChange={setAdminStaff}
                  />
                  <RoiSlider
                    label="Annual New Admissions" value={admissions} min={1000} max={10000} step={250}
                    display={admissions.toLocaleString('en-IN')} minLabel="1,000" maxLabel="10,000" onChange={setAdmissions}
                  />
                  <RoiSlider
                    label="Average Annual Tuition" value={tuition} min={0.4} max={2.5} step={0.1}
                    display={`₹${tuition.toFixed(1)}L`} minLabel="₹0.4L" maxLabel="₹2.5L" onChange={setTuition}
                  />
                </div>
              </motion.div>

              {/* Path + assumptions */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: 0.08, ease: easeOut }}
                className="rounded-[20px] md:rounded-[28px] border border-white/[0.08] bg-[#0a1729]/80 backdrop-blur-xl glass-refract p-6 md:p-8"
              >
                <div className="flex items-center gap-2.5 mb-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB]" />
                  <span className="font-display text-[10px] tracking-[0.4em] uppercase text-white/85 font-bold">Implementation Path</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5">
                  {ROI_PATHS.map((p) => {
                    const active = p.id === pathId;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPathId(p.id)}
                        className="press-scale rounded-[12px] sm:rounded-[14px] border px-2 sm:px-3 py-3 sm:py-3.5 text-left min-w-0"
                        style={{
                          borderColor: active ? 'rgba(167,218,219,0.55)' : 'rgba(255,255,255,0.08)',
                          background: active ? 'rgba(167,218,219,0.12)' : 'rgba(255,255,255,0.02)',
                          transition: 'background-color 200ms var(--ease-out-expo), border-color 200ms var(--ease-out-expo), transform 160ms var(--ease-out-expo)',
                        }}
                      >
                        <span className={`block font-display font-bold text-[12px] sm:text-[13px] ${active ? 'text-white' : 'text-[#b0c5c6]'}`}>{p.label}</span>
                        <span className="block mt-0.5 font-display text-[8px] sm:text-[8.5px] tracking-[0.08em] sm:tracking-[0.1em] uppercase text-[#b0c5c6]/45 font-bold truncate">{p.sub}</span>
                        <span className={`block mt-1.5 font-display font-bold text-[12px] sm:text-[13px] tabular-nums ${active ? 'text-[#A7DADB]' : 'text-[#b0c5c6]/55'}`}>{p.investLabel}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="my-7 h-px bg-white/[0.07]" />

                <div className="flex items-center gap-2.5 mb-7">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB]" />
                  <span className="font-display text-[10px] tracking-[0.4em] uppercase text-white/85 font-bold">Projection Assumptions</span>
                </div>
                <div className="flex flex-col gap-9">
                  <RoiSlider
                    label="Admissions Uplift from AI-Native Positioning" value={uplift} min={1} max={8} step={0.5}
                    display={`${uplift}%`} minLabel="1%" maxLabel="8%" onChange={setUplift}
                  />
                  <RoiSlider
                    label="Earned Media Value (AVE)" value={mediaValue} min={20} max={150} step={5}
                    display={formatINR(mediaValue)} minLabel="₹20L" maxLabel="₹1.5Cr" onChange={setMediaValue}
                  />
                </div>
                <p className="mt-7 font-body text-[#b0c5c6]/45 text-[13px] leading-relaxed">
                  Defaults are calibrated to conservative, comparable benchmarks. Adjust any input — the
                  projection recomputes instantly.
                </p>
              </motion.div>
            </div>
          </div>

          {/* ── Results ──────────────────────────── */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            {/* Bottom-line hero */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: easeOut }}
              className="relative rounded-[20px] md:rounded-[28px] border border-[#A7DADB]/25 overflow-hidden p-6 sm:p-8 md:p-10"
              style={{
                background: 'linear-gradient(135deg, rgba(167,218,219,0.11) 0%, rgba(10,23,41,0.85) 58%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 30px 70px -30px rgba(167,218,219,0.28)',
              }}
            >
              <div className="flex items-center gap-2.5 mb-8">
                <Sparkles className="h-4 w-4 text-[#A7DADB]" strokeWidth={1.75} />
                <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">Projected Year 1 Return</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-6 items-center">
                <div className="sm:col-span-5">
                  <div className="flex items-baseline gap-1">
                    <AnimatedValue
                      value={roiMultiple.toFixed(1)}
                      className="font-display font-bold text-white tracking-[-0.04em] leading-none"
                      style={{ fontSize: 'clamp(4rem,9vw,7rem)' }}
                    />
                    <span className="font-display font-bold text-[#A7DADB] leading-none" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>×</span>
                  </div>
                  <p className="mt-4 font-body text-[#b0c5c6]/70 text-sm leading-relaxed max-w-[36ch]">
                    Value created for every rupee of the {path.investLabel} Year 1 investment.
                  </p>
                </div>
                <div className="sm:col-span-7 grid grid-cols-2 gap-x-6 gap-y-6">
                  {heroStats.map((s) => (
                    <div key={s.label}>
                      <span className="font-display text-[9px] tracking-[0.22em] uppercase text-[#A7DADB]/55 font-bold">{s.label}</span>
                      <AnimatedValue
                        value={s.value}
                        className="mt-1.5 block font-display font-bold text-white tabular-nums tracking-tight"
                        style={{ fontSize: 'clamp(1.4rem,2.6vw,2rem)' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Value-stack bar */}
              <div className="mt-9 pt-7 border-t border-white/[0.08]">
                <span className="font-display text-[9.5px] tracking-[0.3em] uppercase text-[#b0c5c6]/50 font-bold">Where the value comes from</span>
                <div className="mt-3.5 flex h-2.5 rounded-full overflow-hidden bg-white/[0.05]">
                  <div style={{ width: `${opPct}%`, background: '#A7DADB', transition: 'width 400ms var(--ease-out-expo)' }} />
                  <div style={{ width: `${mediaPct}%`, background: 'rgba(167,218,219,0.5)', transition: 'width 400ms var(--ease-out-expo)' }} />
                  <div style={{ width: `${revPct}%`, background: 'rgba(255,255,255,0.72)', transition: 'width 400ms var(--ease-out-expo)' }} />
                </div>
                <div className="mt-3.5 flex flex-wrap gap-x-7 gap-y-2">
                  {[
                    { c: '#A7DADB', k: 'Operational efficiency', v: formatINR(operationalValue) },
                    { c: 'rgba(167,218,219,0.5)', k: 'Earned media', v: formatINR(mediaValue) },
                    { c: 'rgba(255,255,255,0.72)', k: 'Admissions revenue', v: formatINR(newRevenue) },
                  ].map((l) => (
                    <div key={l.k} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: l.c }} />
                      <span className="font-body text-[#b0c5c6]/70 text-[13px]">{l.k}</span>
                      <span className="font-display font-bold text-white text-[13px] tabular-nums">{l.v}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 font-body text-[#b0c5c6]/55 text-[13px] leading-relaxed">
                  Conservative floor — on{' '}
                  <span className="text-[#A7DADB]">{formatINR(newRevenue)}</span> of new tuition revenue alone,
                  excluding every rupee of efficiency and media value, the programme still pays back in{' '}
                  <span className="text-white">~{fmtMonths(cashPaybackMonths)} months</span>.
                </p>
              </div>
            </motion.div>

            {/* Stream 01 — Operational */}
            <RoiStream
              index="01"
              Icon={Clock}
              title="Time & Money Reclaimed"
              body="Hours your faculty and staff get back — and what those hours are worth. These are contractual KPIs, measured weekly against a pre-deployment baseline and written into the engagement SLA."
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { Icon: Clock,  label: 'Faculty Hours Reclaimed', value: facultyHours.toLocaleString('en-IN'), unit: 'teaching hours returned / year' },
                  { Icon: Coins,  label: 'Value of Faculty Time',    value: formatINR(facultyValue),              unit: 'reclaimed prep-time value / year' },
                  { Icon: Users,  label: 'Admin Hours Redirected',   value: adminHours.toLocaleString('en-IN'),   unit: 'support hours freed / year' },
                  { Icon: Gauge,  label: 'Value of Admin Capacity',  value: formatINR(adminValue),                unit: 'capacity recovered / year' },
                ].map((m, mi) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: mi * 0.06, ease: easeOut }}
                  >
                    <RoiMetric Icon={m.Icon} label={m.label} value={m.value} unit={m.unit} />
                  </motion.div>
                ))}
              </div>
            </RoiStream>

            {/* Stream 02 — Brand & Media */}
            <RoiStream
              index="02"
              Icon={Megaphone}
              title="Brand & National Media Attention"
              body="The 'AI-Native Cognitive Campus' designation is a press story. First-mover institutions earn regional and national education-vertical coverage that paid media cannot easily buy — and it is this visibility that drives the admissions uplift below."
              delay={0.05}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { type: 'metric' as const, Icon: Megaphone, label: 'Earned Media Value', value: formatINR(mediaValue), unit: 'advertising-equivalent value / Year 1' },
                  { type: 'callout' as const },
                ].map((item, mi) => (
                  <motion.div
                    key={mi}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: mi * 0.07, ease: easeOut }}
                  >
                    {item.type === 'metric' ? (
                      <RoiMetric Icon={item.Icon!} label={item.label!} value={item.value!} unit={item.unit!} />
                    ) : (
                      <motion.div
                        whileHover={{ y: -3, transition: springCard }}
                        className="rounded-[18px] border border-white/[0.08] hover:border-[#A7DADB]/16 bg-[#0a1729]/60 hover:bg-[#0a1729]/80 backdrop-blur-xl glass-refract p-6 flex flex-col justify-between min-h-[160px]"
                        style={{ transition: 'border-color 220ms var(--ease-out-expo), background-color 220ms var(--ease-out-expo)' }}
                      >
                        <div className="flex items-center gap-2.5">
                          <Newspaper className="h-4 w-4 text-[#A7DADB]/70" strokeWidth={1.75} />
                          <span className="font-display text-[9.5px] tracking-[0.24em] uppercase font-bold text-[#A7DADB]/60">National Positioning</span>
                        </div>
                        <div className="mt-4">
                          <span className="block font-display font-bold text-white text-[17px] leading-snug tracking-tight">
                            The first AI-Native Cognitive Campus in its tier.
                          </span>
                          <span className="mt-2 block font-body text-[#b0c5c6]/55 text-[13px] leading-relaxed">
                            A claim no competitor can make second — compounding into rankings, recruiter interest and applicant trust.
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </RoiStream>

            {/* Stream 03 — Admissions */}
            <RoiStream
              index="03"
              Icon={TrendingUp}
              title="Admission Enquiries & New Revenue"
              body="National visibility converts. Heightened brand salience lifts prospectus enquiries — and a conservative share of those enquiries become admissions and tuition revenue that recurs across the full degree."
              delay={0.1}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { Icon: TrendingUp,    label: 'Incremental Enquiries',   value: incrEnquiries.toLocaleString('en-IN'), unit: 'additional prospectus enquiries / year' },
                  { Icon: GraduationCap, label: 'Incremental Admissions',  value: incrAdmissions.toLocaleString('en-IN'), unit: 'additional enrolments / year' },
                  { Icon: Coins,         label: 'New Tuition Revenue',      value: formatINR(newRevenue),                  unit: 'added fee income, Year 1' },
                  { Icon: Wallet,        label: 'Cohort Lifetime Value',    value: formatINR(cohortLTV),                   unit: 'full-degree value of one cohort' },
                ].map((m, mi) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: mi * 0.06, ease: easeOut }}
                  >
                    <RoiMetric Icon={m.Icon} label={m.label} value={m.value} unit={m.unit} />
                  </motion.div>
                ))}
              </div>
            </RoiStream>

            {/* Methodology */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: easeOut }}
            >
              <button
                type="button"
                onClick={() => setShowMethod((v) => !v)}
                className="w-full flex items-center justify-between gap-4 rounded-[20px] border border-white/[0.08] bg-[#0a1729]/55 backdrop-blur-xl glass-refract px-7 py-5"
                style={{ transition: 'background-color 200ms var(--ease-out-expo), border-color 200ms var(--ease-out-expo)' }}
              >
                <span className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
                  <span className="font-display text-[11px] tracking-[0.3em] uppercase text-white font-bold text-left">
                    How every number is calculated
                  </span>
                </span>
                <ChevronDown
                  className="h-4 w-4 text-[#A7DADB] shrink-0"
                  strokeWidth={2}
                  style={{ transform: showMethod ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 350ms var(--ease-out-expo)' }}
                />
              </button>
              <AnimatePresence initial={false}>
                {showMethod && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: easeOut }}
                    className="overflow-hidden"
                  >
                    <dl className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6 px-1">
                      {ROI_METHOD.map((m) => (
                        <div key={m.k}>
                          <dt className="font-display text-[10.5px] tracking-[0.16em] uppercase text-[#A7DADB] font-bold">{m.k}</dt>
                          <dd className="mt-1.5 font-body font-light text-[#b0c5c6]/65 text-sm leading-relaxed">{m.v}</dd>
                        </div>
                      ))}
                    </dl>
                    <p className="mt-7 px-1 font-body text-[#b0c5c6]/45 text-[13px] leading-relaxed">
                      Operational KPIs are contractually guaranteed. Brand, media and admissions figures are
                      forward-looking projections — not guarantees — calibrated to conservative, comparable
                      benchmarks and disclosed in full so they can be independently verified.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── CTA ──────────────────────────────────────────────────────────────────────
const PricingCTA: React.FC = () => (
  <section className="relative py-24 md:py-52 px-5 md:px-12 lg:px-24 overflow-hidden">
    <MeshGradient intensity="med" />
    {/* Aspirational background — Vibrant University Campus Life in India */}
    <div className="absolute inset-0 z-0 pointer-events-none">
      <BackgroundVideo
        src={FOOTAGE.campusVibrantLife}
        poster="/pricing-cta.jpg"
        className="opacity-[0.32]"
        style={{ filter: 'saturate(0.65) brightness(0.55) contrast(1.1)' }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 80%, transparent 0%, rgba(2,12,27,0.7) 55%, #020C1B 100%)' }}
      />
    </div>
    <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_0%,transparent_75%)]">
      <FlickeringGrid color="rgb(167,218,219)" squareSize={3} gridGap={9} flickerChance={0.12} maxOpacity={0.16} />
    </div>
    <Vignette strength={0.6} />

    <div className="relative z-10 max-w-[1440px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.55, ease: easeOut }}
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
        transition={{ duration: 0.75, ease: easeOut }}
        className="mt-8 md:mt-10 font-display font-bold text-white leading-[0.94] tracking-[-0.03em] text-[clamp(2.6rem,8.5vw,9rem)] max-w-[18ch]"
      >
        Will you{' '}
        <span className="font-serif-display italic font-normal text-[#A7DADB]">lead the era?</span>
      </motion.h2>

      {/* 3-step next steps */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px]">
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
        ].map((s, si) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: si * 0.09, ease: easeOut }}
            whileHover={{ y: -4, transition: springCard }}
            className="group rounded-[20px] border border-white/[0.07] hover:border-[#A7DADB]/20 bg-[#0a1729]/50 hover:bg-[#0a1729]/75 backdrop-blur-xl glass-refract p-7"
            style={{ transition: 'border-color 250ms var(--ease-out-expo), background-color 250ms var(--ease-out-expo)' }}
          >
            <span className="font-serif-display italic font-normal text-[5rem] leading-none" style={{ color: 'rgba(167,218,219,0.12)' }}>
              {s.step}
            </span>
            <h3 className="mt-3 font-display font-bold text-white text-lg tracking-tight group-hover:text-[#A7DADB]" style={{ transition: 'color 250ms var(--ease-out-expo)' }}>{s.title}</h3>
            <p className="mt-3 font-body font-light text-[#b0c5c6]/70 text-sm leading-relaxed">{s.body}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.65, delay: 0.22, ease: easeOut }}
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
        transition={{ duration: 0.75, delay: 0.32, ease: easeOut }}
        className="mt-16 md:mt-24 inline-flex items-center gap-4 sm:gap-7 rounded-full px-5 sm:px-7 py-3 sm:py-4 border border-[#A7DADB]/20 bg-white/[0.03] backdrop-blur-md glass-refract max-w-full"
      >
        <img src="/logo.png" alt="Smartslate" className="h-6 sm:h-7 w-auto shrink-0" style={{ filter: 'drop-shadow(0 2px 10px rgba(167,218,219,0.35))' }} />
        <div aria-hidden className="h-6 sm:h-7 w-px bg-[#A7DADB]/30 shrink-0" />
        <img src="/kjc-logo.png" alt="Kristu Jayanti University" className="h-7 sm:h-9 w-auto shrink-0" style={{ filter: 'drop-shadow(0 2px 10px rgba(255,255,255,0.15))' }} />
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
    <CursorSpotlight />
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
