import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight, Mail, Calendar } from 'lucide-react';
import { MeshGradient, Vignette } from '../ui/atmosphere';
import { FlickeringGrid } from '../ui/flickering-grid';

const easeOut = [0.16, 1, 0.3, 1] as const;

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  strength?: number;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  href,
  children,
  className,
  style,
  strength = 0.32,
}) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 18, restDelta: 0.3 });
  const springY = useSpring(y, { stiffness: 160, damping: 18, restDelta: 0.3 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div ref={wrapRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.a
        href={href}
        className={className}
        style={{ ...style, x: springX, y: springY, display: 'inline-flex' }}
      >
        {children}
      </motion.a>
    </div>
  );
};

export const CTA = () => {
  return (
    <section
      id="contact"
      className="relative py-40 md:py-52 px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background campus image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/cta-campus.jpg"
          alt="KJU campus"
          className="w-full h-full object-cover"
          style={{ filter: 'contrast(1.05) saturate(0.7) brightness(0.35)' }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = 'none';
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(2,12,27,0.55) 0%, rgba(2,12,27,0.7) 50%, rgba(2,12,27,0.9) 100%)',
          }}
        />
      </div>

      <MeshGradient intensity="med" />
      <div className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,rgba(0,0,0,0.7)_0%,transparent_75%)]">
        <FlickeringGrid
          color="rgb(167, 218, 219)"
          squareSize={3}
          gridGap={9}
          flickerChance={0.12}
          maxOpacity={0.16}
        />
      </div>
      <Vignette strength={0.6} />

      <div className="relative z-10 max-w-[1440px] mx-auto">
        {/* Chapter mark */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
          <span className="font-display text-[11px] tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
            Chapter 05  ·  The Decision
          </span>
        </motion.div>

        {/* Hero question */}
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.95, ease: easeOut }}
          className="mt-10 font-display font-bold text-white leading-[0.94] tracking-[-0.03em] text-[clamp(3rem,8.5vw,9rem)] max-w-[18ch]"
        >
          Will you{' '}
          <span className="font-serif-display italic font-normal text-[#A7DADB]">
            lead the era?
          </span>
        </motion.h2>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.85, delay: 0.12, ease: easeOut }}
          className="mt-10 font-body font-light text-[#b0c5c6] text-lg md:text-2xl leading-[1.55] max-w-[62ch]"
        >
          The infrastructure is ready. The playbook is proven. The window is open, but only for
          those willing to step through it. Begin the conversation.
        </motion.p>

        {/* CTA cluster — primary is magnetic */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.85, delay: 0.22, ease: easeOut }}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <MagneticButton
            href="mailto:hello@smartslate.io?subject=Project%20Institutional%20Intelligence"
            className="group items-center gap-3 rounded-full px-7 py-4 bg-[#A7DADB] text-[#020C1B] press-scale font-display font-bold text-sm tracking-[0.18em] uppercase"
            style={{
              boxShadow:
                '0 12px 32px -10px rgba(167,218,219,0.55), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            <Mail className="h-4 w-4 inline mr-2" strokeWidth={2} />
            <span>Begin the Conversation</span>
            <ArrowUpRight
              className="h-4 w-4 inline ml-2"
              strokeWidth={2}
            />
          </MagneticButton>

          <a
            href="#hero"
            className="group inline-flex items-center gap-3 rounded-full px-7 py-4 border border-white/15 bg-white/[0.04] text-white press-scale font-display font-bold text-sm tracking-[0.18em] uppercase backdrop-blur-md"
            style={{
              transition:
                'background-color 220ms var(--ease-out-expo), border-color 220ms var(--ease-out-expo), transform 160ms var(--ease-out-expo)',
            }}
          >
            <Calendar className="h-4 w-4 text-[#A7DADB]" strokeWidth={2} />
            <span>Watch the Film</span>
          </a>
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

        {/* Footer status row */}
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
                Stable  ·  Ready
              </span>
            </div>
            <div aria-hidden className="h-4 w-px bg-white/10" />
            <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold">
              Academic Excellence  ·  2026
            </span>
          </div>
          <span className="font-display text-[10px] tracking-[0.4em] uppercase text-[#b0c5c6]/55 font-bold tabular-nums">
            KJU_COGNITIVE_V1.0
          </span>
        </motion.div>
      </div>
    </section>
  );
};
