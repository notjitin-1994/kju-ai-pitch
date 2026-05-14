import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { MeshGradient } from '../ui/atmosphere';

const easeOut = [0.16, 1, 0.3, 1] as const;

const failures = [
  {
    num: '01',
    label: 'Students',
    status: 'Unguided adoption.',
    body: 'A generation using artificial intelligence in the shadows. Without guidance. Without ethical framing. Without the practitioner skill that industry now demands at the entry rung.',
    img: '/problem-students.jpg',
    imgAlt: 'Indian university students in a crowded lecture hall',
    details: [
      'AI used without institutional framework or ethical guardrails',
      'No verifiable credential to differentiate graduates',
      'Employers increasingly require practitioner-level AI fluency',
      'Peer institutions are building certification programmes now',
    ],
    align: 'left' as const,
  },
  {
    num: '02',
    label: 'Faculty',
    status: 'Held back.',
    body: "Educators ready to lead, buried by yesterday’s tooling. Manual preparation, static pedagogy, and assessment debt drain the very hours that compound into pedagogical mastery.",
    img: '/problem-faculty.jpg',
    imgAlt: 'Overworked Indian teacher managing paperwork',
    details: [
      '40–60% of weekly preparation time consumed by manual tasks',
      'No AI-assisted content generation or assessment design tools',
      "Professional development budgets don't reach frontier tools",
      'Faculty motivation erodes when tooling lags behind students',
    ],
    align: 'right' as const,
  },
  {
    num: '03',
    label: 'Institutions',
    status: 'Velocity mismatch.',
    body: 'Change measured in years, while industry moves in months. The compounding gap erodes brand and legacy every single semester it remains unaddressed.',
    img: '/problem-institution.jpg',
    imgAlt: 'Traditional Indian college campus exterior',
    details: [
      'Accreditation bodies moving to AI-readiness as a metric by 2027',
      'Employer hiring criteria shifting to AI-competency baseline',
      'First-mover positioning cannot be purchased after the fact',
      'Compounding semester-on-semester brand erosion is silent but terminal',
    ],
    align: 'left' as const,
  },
];

export const ProblemMatrix = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section
      id="problem"
      className="relative py-32 md:py-40 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      <MeshGradient intensity="low" />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Chapter header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 gap-x-12 mb-24 md:mb-32">
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
                Chapter 02
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
              className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
            >
              The Innovation Gap
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
              Three forces.
              <br />
              <span className="font-serif-display italic font-normal text-[#A7DADB]">
                One systemic moment of truth.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
              className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
            >
              Across every campus in India, three failures are converging. They are not separate
              problems. They are facets of one systemic moment, compounding every semester it goes
              unaddressed.{' '}
              <span className="text-[#A7DADB]/70 text-sm">Click each to explore.</span>
            </motion.p>
          </div>
        </div>

        {/* Editorial failure rows */}
        <div className="space-y-0">
          {failures.map((f, i) => {
            const isLeft = f.align === 'left';
            const isOpen = openIdx === i;
            return (
              <motion.article
                key={f.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: easeOut }}
                className="relative border-t border-white/[0.07]"
              >
                {/* Hover + active accent line */}
                <span
                  aria-hidden
                  className={`absolute top-0 left-0 h-px bg-[#A7DADB] transition-all duration-700 ${isOpen ? 'w-full opacity-60' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-60'}`}
                  style={{ transition: 'width 800ms var(--ease-out-expo), opacity 400ms' }}
                />

                {/* Clickable header row */}
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full text-left group py-14 md:py-20 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-10">
                    {/* Numeral */}
                    <div
                      className={`${
                        isLeft ? 'lg:col-span-4 lg:col-start-1' : 'lg:col-span-4 lg:col-start-9'
                      } flex flex-col gap-3`}
                    >
                      <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#A7DADB]/80 font-bold">
                        Failure
                      </span>
                      <span
                        className="font-serif-display italic text-white/95 leading-none tracking-[-0.04em]"
                        style={{
                          fontSize: 'clamp(7rem,16vw,12rem)',
                          transition: 'color 400ms var(--ease-out-expo)',
                          color: isOpen ? '#A7DADB' : undefined,
                        }}
                      >
                        {f.num}
                      </span>
                    </div>

                    {/* Content */}
                    <div
                      className={`${
                        isLeft
                          ? 'lg:col-span-7 lg:col-start-6'
                          : 'lg:col-span-7 lg:col-start-1 lg:row-start-1'
                      } flex flex-col justify-center max-w-[58ch]`}
                    >
                      <h3 className="font-display font-bold text-white text-3xl md:text-5xl tracking-tight uppercase">
                        {f.label}
                      </h3>
                      <p className="mt-2 font-serif-display italic text-[#A7DADB] text-xl md:text-2xl">
                        {f.status}
                      </p>
                      <p className="mt-6 font-body font-light text-[#b0c5c6] text-base md:text-lg leading-[1.65]">
                        {f.body}
                      </p>
                    </div>

                    {/* Expand toggle indicator */}
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

                {/* Expanded detail panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: easeOut }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-14 md:pb-20">
                        {/* Detail bullets */}
                        <div className="flex flex-col gap-5">
                          <p className="font-display text-[10px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold mb-1">
                            The specific failure
                          </p>
                          <ul className="space-y-4">
                            {f.details.map((d) => (
                              <li key={d} className="flex items-start gap-3">
                                <span className="mt-[7px] h-px w-5 bg-[#A7DADB]/50 shrink-0" />
                                <span className="font-body font-light text-[#b0c5c6] text-base leading-[1.6]">
                                  {d}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Image */}
                        <div className="relative rounded-[20px] overflow-hidden bg-[#0a1729] min-h-[220px] lg:min-h-0">
                          <img
                            src={f.img}
                            alt={f.imgAlt}
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{
                              filter: 'contrast(1.08) saturate(0.8) brightness(0.55)',
                            }}
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                          />
                          <div
                            aria-hidden
                            className="absolute inset-0"
                            style={{
                              background:
                                'linear-gradient(135deg, rgba(2,12,27,0.3) 0%, rgba(10,23,41,0.85) 100%)',
                            }}
                          />
                          <div className="absolute bottom-6 left-6">
                            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#A7DADB]/70 font-bold">
                              Failure {f.num} · {f.label}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>

        {/* Closing line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: easeOut }}
          className="mt-24 md:mt-32 pt-12 border-t border-white/[0.07] flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
        >
          <p className="font-display text-2xl md:text-4xl text-white max-w-[28ch] leading-[1.15] tracking-tight">
            Three failures.{' '}
            <span className="font-serif-display italic text-[#A7DADB]">One moment of truth.</span>
          </p>
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold whitespace-nowrap">
            Section 02 / 04
          </span>
        </motion.div>
      </div>
    </section>
  );
};
