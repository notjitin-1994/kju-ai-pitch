import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gauge, Clock, Trophy, ChevronDown } from 'lucide-react';
import { NumberTicker } from '../ui/number-ticker';
import { MeshGradient } from '../ui/atmosphere';

const easeOut = [0.16, 1, 0.3, 1] as const;

type Metric = {
  display: 'number' | 'range' | 'ordinal';
  value: number;
  prefix?: string;
  suffix?: string;
  rangeFrom?: number;
  rangeTo?: number;
  ordinal?: { lead: string; tail: string };
  label: string;
  detail: string;
  icon: typeof Gauge;
  expanded: {
    heading: string;
    stats: { label: string; value: string }[];
    note: string;
  };
};

const metrics: Metric[] = [
  {
    display: 'number',
    value: 70,
    suffix: '%',
    label: 'Operational Lift',
    detail: 'Efficiency gained across institutional operations through the AI-Enabled Campus stack.',
    icon: Gauge,
    expanded: {
      heading: 'What 70% lift means in practice',
      stats: [
        { label: 'Student queries resolved autonomously', value: '>90%' },
        { label: 'Average response time', value: '<30 sec' },
        { label: 'At-risk student flagging', value: '<72 hrs' },
        { label: 'Admin staff hours redirected', value: '~60%' },
      ],
      note: 'Contractually measured against pre-deployment baseline from Week 1 of Phase 2.',
    },
  },
  {
    display: 'range',
    value: 60,
    rangeFrom: 40,
    rangeTo: 60,
    suffix: '%',
    label: 'Time Reclaimed',
    detail: 'Faculty preparation hours redirected from administrative burden to high-value teaching.',
    icon: Clock,
    expanded: {
      heading: 'Where faculty hours go next',
      stats: [
        { label: 'Lesson plan generation time', value: '<20 min' },
        { label: 'Pre-deployment prep time', value: '2–3 hrs' },
        { label: 'Hours reclaimed per faculty/year', value: '~200 hrs' },
        { label: 'Faculty time value (₹600/hr)', value: '₹1.2L/yr' },
      ],
      note: 'Measured weekly against a pre-deployment baseline across all three subject streams.',
    },
  },
  {
    display: 'ordinal',
    value: 1,
    ordinal: { lead: '1', tail: 'st' },
    label: 'AI-Native Institution',
    detail: 'A first-mover position no competitor can purchase after the fact. The brand weight of the era.',
    icon: Trophy,
    expanded: {
      heading: 'What first-mover means long term',
      stats: [
        { label: 'Students AI-certified per cohort', value: '>80%' },
        { label: 'Accreditation uplift', value: 'NAAC / NBA' },
        { label: 'Graduate employer differentiation', value: 'Certified' },
        { label: 'Competitive moat window', value: '2024–2026' },
      ],
      note: 'Institutional positioning is permanent. The brand weight of being first cannot be replicated after the window closes.',
    },
  },
];

const MetricNumber: React.FC<{ m: Metric }> = ({ m }) => {
  if (m.display === 'number') {
    return (
      <span className="font-display font-bold text-white tabular-nums tracking-[-0.04em] leading-[0.85] text-[clamp(7rem,16vw,15rem)]">
        <NumberTicker value={m.value} />
        <span className="text-[#A7DADB] text-[0.55em] align-top translate-y-2">{m.suffix}</span>
      </span>
    );
  }
  if (m.display === 'range') {
    return (
      <span className="font-display font-bold text-white tabular-nums tracking-[-0.04em] leading-[0.85] text-[clamp(6rem,13vw,12rem)]">
        {m.rangeFrom}
        <span className="text-[#A7DADB]/50 mx-2 font-thin">/</span>
        {m.rangeTo}
        <span className="text-[#A7DADB] text-[0.55em] align-top translate-y-2">{m.suffix}</span>
      </span>
    );
  }
  return (
    <span className="font-display font-bold text-white leading-[0.85] tracking-[-0.04em] text-[clamp(7rem,16vw,15rem)]">
      {m.ordinal!.lead}
      <span className="font-serif-display italic font-normal text-[#A7DADB] text-[0.5em]">
        {m.ordinal!.tail}
      </span>
    </span>
  );
};

export const Outcomes = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="outcomes"
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <MeshGradient intensity="low" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Chapter header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-20 md:mb-28">
          <div className="lg:col-span-3 lg:col-start-1">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
              <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
                Chapter 04
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
              className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
            >
              By the Numbers
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
              Measurable.
              <br />
              <span className="font-serif-display italic font-normal text-[#A7DADB]">
                Guaranteed.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
              className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
            >
              Three numbers carry the weight of the case. They land in operational performance,
              faculty capacity, and institutional positioning.{' '}
              <span className="text-[#A7DADB]/70 text-sm">Click each to explore the data.</span>
            </motion.p>
          </div>
        </div>

        {/* Editorial metric rows */}
        <div className="space-y-0">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            const isOpen = openIdx === i;
            return (
              <motion.article
                key={m.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: easeOut }}
                className="relative border-t border-white/[0.07]"
              >
                {/* Accent top line */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-px bg-[#A7DADB]"
                  style={{
                    width: isOpen ? '100%' : '0%',
                    opacity: isOpen ? 0.6 : 0,
                    transition: 'width 800ms var(--ease-out-expo), opacity 400ms',
                  }}
                />

                {/* Clickable header */}
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left py-14 md:py-20 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-10">
                    {/* Numeral */}
                    <div className="lg:col-span-7 lg:col-start-1 flex items-center">
                      <MetricNumber m={m} />
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-center max-w-[44ch]">
                      <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-[#A7DADB]/20 bg-[#A7DADB]/[0.07] mb-5">
                        <Icon className="h-4 w-4 text-[#A7DADB]" strokeWidth={1.5} />
                      </div>
                      <p className="font-display text-[11px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">
                        Metric 0{i + 1}
                      </p>
                      <h3 className="mt-2 font-display font-bold text-white text-2xl md:text-3xl tracking-tight">
                        {m.label}
                      </h3>
                      <p className="mt-4 font-body font-light text-[#b0c5c6] text-base md:text-[17px] leading-[1.65]">
                        {m.detail}
                      </p>
                    </div>

                    {/* Expand indicator */}
                    <div className="lg:col-span-1 lg:col-start-12 flex items-center justify-end">
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.4, ease: easeOut }}
                        className="h-9 w-9 rounded-full border border-[#A7DADB]/25 bg-[#A7DADB]/[0.06] flex items-center justify-center shrink-0"
                      >
                        <ChevronDown className="h-4 w-4 text-[#A7DADB]" strokeWidth={2} />
                      </motion.div>
                    </div>
                  </div>
                </button>

                {/* Expanded detail */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="expand"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: easeOut }}
                      className="overflow-hidden"
                    >
                      <div className="pb-14 md:pb-20">
                        <p className="font-display text-[10px] tracking-[0.4em] uppercase text-[#A7DADB]/70 font-bold mb-8">
                          {m.expanded.heading}
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                          {m.expanded.stats.map((s) => (
                            <div
                              key={s.label}
                              className="rounded-[16px] border border-[#A7DADB]/12 bg-[#A7DADB]/[0.04] p-5"
                            >
                              <span className="block font-display font-bold text-[#A7DADB] text-2xl md:text-3xl tabular-nums tracking-tight leading-none">
                                {s.value}
                              </span>
                              <span className="mt-2 block font-body font-light text-[#b0c5c6]/70 text-xs leading-snug">
                                {s.label}
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="font-body font-light text-[#b0c5c6]/55 text-sm leading-relaxed max-w-[70ch] border-l-2 border-[#A7DADB]/25 pl-5 italic">
                          {m.expanded.note}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        {/* Closing pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mt-24 md:mt-32 pt-12 border-t border-white/[0.07] grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-10"
        >
          <span
            aria-hidden
            className="lg:col-span-1 lg:col-start-1 font-serif-display italic text-[#A7DADB]/60 leading-none -translate-y-2"
            style={{ fontSize: 'clamp(4rem,7vw,6rem)' }}
          >
            "
          </span>
          <p className="lg:col-span-9 lg:col-start-2 font-serif-display italic text-white text-2xl md:text-4xl leading-[1.25] tracking-tight max-w-[40ch]">
            Not progress.{' '}
            <span className="text-[#A7DADB]">
              Positioning that no competitor can purchase after the fact.
            </span>
          </p>
          <span className="lg:col-span-2 lg:col-start-11 self-end font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold whitespace-nowrap">
            Section 04 / 04
          </span>
        </motion.div>
      </div>
    </section>
  );
};
