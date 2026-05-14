import React from 'react';
import { motion } from 'framer-motion';
import { MeshGradient } from '../ui/atmosphere';

const easeOut = [0.16, 1, 0.3, 1] as const;

const failures = [
  {
    num: '01',
    label: 'Students',
    status: 'Unguided adoption.',
    body: 'A generation using artificial intelligence in the shadows. Without guidance. Without ethical framing. Without the practitioner skill that industry now demands at the entry rung.',
    align: 'left' as const,
  },
  {
    num: '02',
    label: 'Faculty',
    status: 'Held back.',
    body: 'Educators ready to lead, buried by yesterday’s tooling. Manual preparation, static pedagogy, and assessment debt drain the very hours that compound into pedagogical mastery.',
    align: 'right' as const,
  },
  {
    num: '03',
    label: 'Institutions',
    status: 'Velocity mismatch.',
    body: 'Change measured in years, while industry moves in months. The compounding gap erodes brand and legacy every single semester it remains unaddressed.',
    align: 'left' as const,
  },
];

export const ProblemMatrix = () => {
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
              unaddressed.
            </motion.p>
          </div>
        </div>

        {/* Editorial failure rows */}
        <div className="space-y-2">
          {failures.map((f, i) => {
            const isLeft = f.align === 'left';
            return (
              <motion.article
                key={f.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.9, delay: i * 0.08, ease: easeOut }}
                className="relative grid grid-cols-1 lg:grid-cols-12 gap-y-6 gap-x-10 py-14 md:py-20 border-t border-white/[0.07] group"
              >
                {/* Hover accent line */}
                <span
                  aria-hidden
                  className="absolute top-0 left-0 h-px bg-[#A7DADB]/70 w-0 group-hover:w-full"
                  style={{ transition: 'width 800ms var(--ease-out-expo)' }}
                />

                {/* Numeral */}
                <div
                  className={`${
                    isLeft ? 'lg:col-span-4 lg:col-start-1' : 'lg:col-span-4 lg:col-start-9'
                  } flex flex-col gap-3`}
                >
                  <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#A7DADB]/80 font-bold">
                    Failure
                  </span>
                  <span className="font-serif-display italic text-white/95 leading-none text-[clamp(7rem,16vw,12rem)] tracking-[-0.04em]">
                    {f.num}
                  </span>
                </div>

                {/* Content */}
                <div
                  className={`${
                    isLeft ? 'lg:col-span-7 lg:col-start-6' : 'lg:col-span-7 lg:col-start-1 lg:row-start-1'
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
