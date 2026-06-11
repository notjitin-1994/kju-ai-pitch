import React, { useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { Mail, ArrowUpRight, ArrowDown } from 'lucide-react';
import { HeroVideoDialog } from '../ui/hero-video-dialog';
import { FlickeringGrid } from '../ui/flickering-grid';
import { MeshGradient } from '../ui/atmosphere';
import { PlayNarrationButton } from '../../audio/PlayNarrationButton';
import { useNarration } from '../../audio/NarrationContext';

const easeOut = [0.16, 1, 0.3, 1] as const;
const springDefault = { type: 'spring' as const, duration: 0.35, bounce: 0.15 };

export const Hero = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const { pauseForVideo, resumeFromVideo } = useNarration();

  useEffect(() => {
    if (videoOpen) {
      pauseForVideo();
    } else {
      resumeFromVideo();
    }
  }, [videoOpen, pauseForVideo, resumeFromVideo]);

  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 24 });

  const parallax = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reduce) return;
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 12);
      mouseY.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * 8);
    },
    [mouseX, mouseY, reduce]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center px-5 md:px-12 lg:px-24 pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Atmosphere */}
      <MeshGradient intensity="med" />
      <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.12)_50%,transparent_100%)]">
        <FlickeringGrid
          color="rgb(167, 218, 219)"
          squareSize={3}
          gridGap={8}
          flickerChance={0.12}
          maxOpacity={0.12}
        />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-14 md:gap-y-16 gap-x-12 lg:gap-x-20 items-center max-w-[1440px] w-full mx-auto relative z-10">
        {/* Left: text-first layout */}
        <div className="lg:col-span-7 space-y-8 md:space-y-9">
          {/* Overline badge — encircled dot, partnership naming */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[#A7DADB]/20 bg-[#A7DADB]/[0.06] pl-2 pr-4 py-1.5 backdrop-blur-sm">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#A7DADB]/[0.12] border border-[#A7DADB]/20">
                <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
              </span>
              <span className="font-display text-[10px] md:text-[11px] tracking-[0.42em] uppercase text-[#A7DADB] font-bold whitespace-nowrap">
                A Strategic Partnership
              </span>
            </span>
          </motion.div>

          {/* Headline — serif-italic signature + opening narrative */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: easeOut }}
            className="font-display font-bold text-white leading-[0.94] tracking-[-0.025em] text-[clamp(2.6rem,7vw,7.25rem)]"
          >
            An era is
            <br />
            <span className="font-serif-display italic font-normal text-[#A7DADB]">
              being written.
            </span>
          </motion.h1>

          {/* Subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: easeOut }}
            className="font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.55] max-w-[58ch]"
          >
            Smartslate, in partnership with <span className="text-white font-normal">Kristu Jayanti University</span>, presents a three-pillar architecture for the AI-native campus.
          </motion.p>

          {/* CTA cluster */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.26, ease: easeOut }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2"
          >
            {/* Primary CTA */}
            <motion.a
              href="mailto:hello@smartslate.io?subject=KJU%20AI%20Transformation%20Programme%20Enquiry"
              className="group inline-flex items-center gap-3 rounded-full px-6 md:px-7 py-3.5 bg-[#A7DADB] text-[#020C1B] font-display font-bold text-[13px] md:text-sm tracking-[0.16em] uppercase"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={springDefault}
              style={{ boxShadow: '0 14px 36px -10px rgba(167,218,219,0.5), inset 0 1px 0 rgba(255,255,255,0.4)' }}
            >
              <Mail className="h-4 w-4" strokeWidth={2} />
              <span>Begin Partnership</span>
              <ArrowUpRight
                className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
                style={{ transition: 'transform 250ms var(--ease-out-expo)' }}
              />
            </motion.a>

            {/* Secondary CTA */}
            <motion.a
              href="#problem"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/[0.22] backdrop-blur-sm px-6 py-3.5 font-display font-bold text-[12px] md:text-[13px] tracking-[0.18em] uppercase text-[#b0c5c6] hover:text-white"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={springDefault}
              style={{ transition: 'background-color 220ms var(--ease-out-expo), border-color 220ms var(--ease-out-expo), color 220ms var(--ease-out-expo)' }}
            >
              <span>Read the Proposal</span>
              <ArrowDown
                className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-y-0.5"
                strokeWidth={2}
                style={{ transition: 'opacity 200ms, transform 250ms var(--ease-out-expo)' }}
              />
            </motion.a>
          </motion.div>

          {/* Narration control */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.34, ease: easeOut }}
          >
            <PlayNarrationButton />
          </motion.div>

          {/* Trust strip — guaranteed floor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.48, ease: easeOut }}
            className="pt-10 md:pt-12 border-t border-white/[0.07] max-w-2xl"
          >
            <div className="flex items-center gap-3">
              <p className="font-display text-[9px] tracking-[0.4em] uppercase text-[#b0c5c6]/50 font-bold whitespace-nowrap">
                The Guaranteed Floor
              </p>
              <span aria-hidden className="flex-1 h-px bg-gradient-to-r from-[#A7DADB]/20 to-transparent" />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-x-4 sm:gap-x-6">
              {[
                { value: '70', suffix: '%', label: 'Operational Lift' },
                { value: '200', suffix: 'hrs/yr', label: 'Faculty Time Reclaimed' },
                { value: '>80', suffix: '%', label: 'Cohort Certified' },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.56 + i * 0.06, ease: easeOut }}
                  className={i > 0 ? 'border-l border-white/[0.06] pl-4 sm:pl-6' : ''}
                >
                  <p className="flex items-baseline font-display font-bold text-white tabular-nums tracking-[-0.02em] leading-none text-2xl sm:text-3xl">
                    {m.value}
                    <span className="ml-1 text-[#A7DADB] text-[0.55em] font-bold">{m.suffix}</span>
                  </p>
                  <p className="mt-2 font-body font-light text-[11px] sm:text-xs text-[#b0c5c6]/60 leading-snug">{m.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: video presentation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.15, ease: easeOut }}
          className="lg:col-span-5 relative"
        >
          {/*
            Two-layer split: the outer motion.div owns the entrance animation,
            the inner motion.div owns the live mouse-parallax transform. Keeping
            them separate prevents the spring transform from fighting the
            entrance tween.
          */}
          <motion.div
            style={{ transform: parallax, willChange: 'transform', backfaceVisibility: 'hidden' }}
            className="relative"
          >
            {/* Glow halo */}
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 blur-3xl opacity-50"
              style={{
                background: 'radial-gradient(circle at 65% 35%, rgba(167,218,219,0.18) 0%, transparent 52%), radial-gradient(circle at 35% 75%, rgba(167,218,219,0.10) 0%, transparent 50%)',
              }}
            />

            {/* Gallery-mat frame — 6px mat, concentric radius 30px outer vs dialog's 24px inner */}
            <div
              className="group relative rounded-[30px] p-1.5 border border-[#A7DADB]/15 hover:border-[#A7DADB]/30 bg-[#0a1729]/40 backdrop-blur-sm"
              style={{ transition: 'border-color 400ms var(--ease-out-expo)' }}
            >
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#A7DADB]/30 to-transparent pointer-events-none" />
              <HeroVideoDialog
                videoSrc="https://hxxvxsmengeoazuywpjm.supabase.co/storage/v1/object/public/brand-assets/kju-intro-v2.mp4"
                thumbnailSrc="/video-thumbnail.jpg"
                thumbnailAlt="Project Institutional Intelligence — Watch the film"
                durationLabel="03:50"
                externallyOpen={videoOpen}
                onOpenChange={setVideoOpen}
              />
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#A7DADB]/20 to-transparent pointer-events-none" />
            </div>

            {/* Caption row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: easeOut }}
              className="mt-6 flex items-center justify-between text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-[#b0c5c6]/60 font-display font-bold"
            >
              <span className="flex items-center gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#A7DADB]/60" />
                Smartslate × KJU
              </span>
              <span className="tabular-nums text-[#A7DADB]/50">KJU_COGNITIVE_V1.0</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom hairline */}
      <motion.div
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.7, ease: easeOut }}
        className="absolute bottom-12 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 h-px bg-gradient-to-r from-transparent via-[#A7DADB]/25 to-transparent"
      />
    </section>
  );
};
