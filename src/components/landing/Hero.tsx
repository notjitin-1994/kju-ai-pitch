import React, { useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useReducedMotion } from 'framer-motion';
import { Mail, ArrowUpRight, Play } from 'lucide-react';
import { HeroVideoDialog } from '../ui/hero-video-dialog';
import { FlickeringGrid } from '../ui/flickering-grid';
import { MeshGradient } from '../ui/atmosphere';
import { PlayNarrationButton } from '../../audio/PlayNarrationButton';
import { useNarration } from '../../audio/NarrationContext';

const easeOut = [0.16, 1, 0.3, 1] as const;
const springDefault = { type: 'spring' as const, duration: 0.45, bounce: 0.18 };

export const Hero = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoHover, setVideoHover] = useState(false);
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
      className="relative min-h-[100dvh] flex items-center px-5 md:px-12 lg:px-24 pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden"
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

      {/* Content grid — generous spacing for editorial feel */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-16 md:gap-y-20 gap-x-16 lg:gap-x-24 items-center">
        {/* Left: text-first layout */}
        <div className="lg:col-span-5 space-y-10 md:space-y-12">
          {/* Overline — refined badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="inline-block"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#A7DADB]/25 bg-[#A7DADB]/[0.05] px-3.5 py-2 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse shrink-0" />
              <span className="font-display text-[9px] md:text-[10px] tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
                AI Transformation
              </span>
            </span>
          </motion.div>

          {/* Headline — confident, clean typography */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, delay: 0.12, ease: easeOut }}
            className="font-display font-bold text-white leading-[0.98] tracking-[-0.03em] text-[clamp(2.8rem,8vw,7.5rem)]"
          >
            Lead the era.
            <br />
            <span className="bg-gradient-to-r from-[#A7DADB] via-[#A7DADB] to-[#8AC8C9] bg-clip-text text-transparent">
              Start now.
            </span>
          </motion.h1>

          {/* Subheadline — more breathing room */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.24, ease: easeOut }}
            className="font-body font-light text-[#b0c5c6] text-base md:text-lg leading-[1.7] max-w-[52ch]"
          >
            Smartslate partners with institutional leaders to architect AI-native operations that compound every semester.
          </motion.p>

          {/* CTA cluster — refined with spring interactions */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.36, ease: easeOut }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-4"
          >
            {/* Primary CTA — more premium treatment */}
            <motion.a
              href="mailto:hello@smartslate.io?subject=KJU%20AI%20Transformation%20Programme%20Enquiry"
              className="group inline-flex items-center gap-3 rounded-lg px-6 py-3.5 bg-[#A7DADB] text-[#020C1B] font-display font-bold text-sm tracking-[0.16em] uppercase"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={springDefault}
              style={{
                boxShadow: '0 16px 40px -10px rgba(167,218,219,0.4), inset 0 1px 0 rgba(255,255,255,0.35)',
              }}
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
              className="group inline-flex items-center gap-2.5 rounded-lg border border-white/[0.15] bg-white/[0.04] backdrop-blur-sm px-6 py-3.5 font-display font-bold text-sm tracking-[0.16em] uppercase text-[#b0c5c6] hover:text-white"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={springDefault}
              style={{
                transition: 'background-color 220ms var(--ease-out-expo), border-color 220ms var(--ease-out-expo)',
              }}
            >
              <span>Discover the Proposal</span>
              <ArrowUpRight className="h-4 w-4 opacity-65 group-hover:opacity-100" strokeWidth={2} />
            </motion.a>
          </motion.div>

          {/* Narration control */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.48, ease: easeOut }}
          >
            <PlayNarrationButton />
          </motion.div>

          {/* Metrics strip — refined and intentional */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: easeOut }}
            className="pt-12 border-t border-white/[0.08] space-y-6"
          >
            <p className="font-display text-[9px] tracking-[0.45em] uppercase text-[#b0c5c6]/50 font-bold">
              Guaranteed Floor
            </p>
            <div className="grid grid-cols-3 gap-8">
              {[
                { label: 'Operational Lift', value: '70%' },
                { label: 'Time Reclaimed', value: '200 hrs' },
                { label: 'Certified', value: '80%+' },
              ].map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.72 + i * 0.06, ease: easeOut }}
                  className="space-y-1.5"
                >
                  <span className="font-display text-sm md:text-base text-[#A7DADB] font-bold tabular-nums">
                    {m.value}
                  </span>
                  <p className="font-body text-[11px] md:text-xs text-[#b0c5c6]/60 leading-tight">
                    {m.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: premium video presentation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2, ease: easeOut }}
          className="lg:col-span-7 relative"
        >
          <motion.div
            style={{ transform: parallax, willChange: 'transform', backfaceVisibility: 'hidden' }}
            className="relative"
          >
            {/* Glow halo — more subtle, refined */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 blur-3xl opacity-40"
              style={{
                background:
                  'radial-gradient(circle at 60% 40%, rgba(167,218,219,0.2) 0%, transparent 50%), radial-gradient(circle at 40% 70%, rgba(167,218,219,0.12) 0%, transparent 45%)',
              }}
            />

            {/* Premium frame container */}
            <motion.div
              onMouseEnter={() => setVideoHover(true)}
              onMouseLeave={() => setVideoHover(false)}
              className="relative group rounded-[24px] md:rounded-[32px] overflow-hidden border border-[#A7DADB]/15 bg-[#0a1729]/40 backdrop-blur-sm"
              whileHover={{
                borderColor: 'rgba(167, 218, 219, 0.3)',
              }}
              transition={{ duration: 0.4, ease: easeOut }}
              style={{
                transition: 'border-color 400ms var(--ease-out-expo)',
              }}
            >
              {/* Top accent line — premium detail */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A7DADB]/30 to-transparent pointer-events-none z-10" />

              {/* Video component */}
              <HeroVideoDialog
                videoSrc="https://hxxvxsmengeoazuywpjm.supabase.co/storage/v1/object/public/brand-assets/kju-intro-v2.mp4"
                thumbnailSrc="/video-thumbnail.jpg"
                thumbnailAlt="AI Transformation Programme — Watch the vision"
                durationLabel="03:50"
                externallyOpen={videoOpen}
                onOpenChange={setVideoOpen}
              />

              {/* Play overlay — appears on hover, premium treatment */}
              {!videoOpen && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: videoHover ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ scale: videoHover ? 1.1 : 1 }}
                    transition={springDefault}
                    className="flex items-center justify-center h-16 w-16 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
                  >
                    <Play className="h-6 w-6 text-white fill-white ml-0.5" />
                  </motion.div>
                </motion.div>
              )}

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A7DADB]/20 to-transparent pointer-events-none" />
            </motion.div>

            {/* Video metadata */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: easeOut }}
              className="mt-6 flex items-center justify-between text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-[#b0c5c6]/60 font-display font-bold"
            >
              <span className="flex items-center gap-2">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#A7DADB]/60" />
                Smartslate × KJU Partnership
              </span>
              <span className="tabular-nums text-[#A7DADB]/50">KJU_COGNITIVE_V1.0</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom divider — refined */}
      <motion.div
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, delay: 0.7, ease: easeOut }}
        className="absolute bottom-0 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 h-px bg-gradient-to-r from-transparent via-[#A7DADB]/20 to-transparent"
      />
    </section>
  );
};
