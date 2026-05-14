import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, GraduationCap, ArrowUpRight } from 'lucide-react';
import { MeshGradient, Vignette } from '../ui/atmosphere';

const easeOut = [0.16, 1, 0.3, 1] as const;

const pillars = [
  {
    id: '01',
    title: 'AI-Enabled Campus',
    sub: 'Operations & Management',
    icon: Building2,
    img: '/v2-pillar-1.jpg',
    body: 'A 24/7 cognitive concierge, at-risk student modelling, and a unified institutional data layer. The campus runs on intelligence, not paperwork.',
    metric: { k: 'Operational Lift', v: '70%' },
    span: 'lg:col-span-7',
    feature: true,
  },
  {
    id: '02',
    title: 'AI-Augmented Faculty',
    sub: 'Teaching & Efficiency',
    icon: Users,
    img: '/v2-pillar-2.jpg',
    body: 'Subject-specific masterclasses, AI-designed assessment cycles, and a continuous update ecosystem. The hours buried in prep return to the craft of teaching.',
    metric: { k: 'Time Reclaimed', v: '40–60%' },
    span: 'lg:col-span-5',
    feature: false,
  },
  {
    id: '03',
    title: 'AI-First Students',
    sub: 'Learning & Outcomes',
    icon: GraduationCap,
    img: '/v2-pillar-3.jpg',
    body: 'Mandatory AI literacy across every stream, real-world AI-augmented assignments, and an enterprise lab with industry-grade tooling. Graduates do not use AI; they practise it.',
    metric: { k: 'Outcome', v: 'Practitioners' },
    span: 'lg:col-span-12',
    feature: false,
    horizontal: true,
  },
];

export const SolutionPillars = () => {
  return (
    <section
      id="solution"
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
                Chapter 03
              </span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.06, ease: easeOut }}
              className="mt-5 font-display text-2xl md:text-3xl text-white tracking-tight"
            >
              The 3-Pillar Model
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
              Architect the
              <br />
              <span className="font-serif-display italic font-normal text-[#A7DADB]">
                Cognitive Campus.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
              className="mt-8 font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.6] max-w-[60ch]"
            >
              Three interconnected pillars. One operating system. Intelligence is no longer a
              subject on the timetable, it is the substrate the institution runs on.
            </motion.p>
          </div>
        </div>

        {/* Asymmetric bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            const isHorizontal = p.horizontal;
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.85, delay: i * 0.08, ease: easeOut }}
                className={`${p.span} group relative isolate overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a1729]/70 backdrop-blur-xl glass-refract`}
              >
                {/* Image layer */}
                <div className={`${isHorizontal ? 'lg:absolute lg:inset-y-0 lg:left-0 lg:w-5/12' : 'absolute inset-0'} overflow-hidden`}>
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-full w-full object-cover scale-100 group-hover:scale-[1.04]"
                    style={{
                      filter: 'contrast(1.1) saturate(0.85) brightness(0.55)',
                      transition: 'transform 1200ms var(--ease-out-expo), filter 700ms var(--ease-out-expo)',
                    }}
                  />
                  {/* Gradient cap */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: isHorizontal
                        ? 'linear-gradient(90deg, rgba(10,23,41,0.3) 0%, rgba(10,23,41,0.95) 90%)'
                        : 'linear-gradient(180deg, rgba(10,23,41,0.25) 0%, rgba(10,23,41,0.92) 75%, rgba(10,23,41,1) 100%)',
                    }}
                  />
                </div>
                <Vignette strength={0.4} />

                {/* Content */}
                <div
                  className={`relative z-10 ${
                    isHorizontal
                      ? 'lg:ml-[41.6667%] p-10 md:p-14 lg:py-16'
                      : 'p-8 md:p-10'
                  } flex flex-col ${isHorizontal ? 'gap-6' : 'gap-8'} ${
                    p.feature ? 'min-h-[480px] md:min-h-[560px]' : isHorizontal ? '' : 'min-h-[480px] md:min-h-[560px]'
                  }`}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-6">
                    <div
                      className="inline-flex items-center justify-center h-12 w-12 rounded-xl border border-[#A7DADB]/20 bg-[#A7DADB]/[0.07]"
                      style={{ transition: 'background-color 350ms var(--ease-out-expo), border-color 350ms var(--ease-out-expo)' }}
                    >
                      <Icon className="h-5 w-5 text-[#A7DADB]" strokeWidth={1.5} />
                    </div>
                    <span className="font-serif-display italic text-[#A7DADB]/15 text-[5rem] md:text-[6rem] leading-none tracking-tighter group-hover:text-[#A7DADB]/30"
                      style={{ transition: 'color 700ms var(--ease-out-expo)' }}
                    >
                      {p.id}
                    </span>
                  </div>

                  {/* Middle: title + body */}
                  <div className={`flex-1 flex flex-col ${isHorizontal ? '' : 'justify-end'}`}>
                    <p className="font-display text-[11px] tracking-[0.4em] uppercase text-[#A7DADB] font-bold">
                      {p.sub}
                    </p>
                    <h3 className="mt-3 font-display font-bold text-white text-3xl md:text-4xl tracking-tight uppercase">
                      {p.title}
                    </h3>
                    <p className="mt-5 font-body font-light text-[#b0c5c6] text-base md:text-[17px] leading-[1.6] max-w-[48ch]">
                      {p.body}
                    </p>
                  </div>

                  {/* Bottom: metric + link */}
                  <div className="flex items-end justify-between gap-6 pt-6 border-t border-white/[0.06]">
                    <div className="flex flex-col">
                      <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold">
                        {p.metric.k}
                      </span>
                      <span className="mt-1.5 font-display text-2xl md:text-3xl text-white tabular-nums tracking-tight">
                        {p.metric.v}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 font-display text-xs tracking-[0.3em] uppercase font-bold text-[#A7DADB] press-scale">
                      Detail
                      <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </div>
                </div>

              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
