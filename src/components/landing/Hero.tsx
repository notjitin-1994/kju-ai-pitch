import React, { useState, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Play, ArrowUpRight } from 'lucide-react';
import { HeroVideoDialog } from '../ui/hero-video-dialog';
import { FlickeringGrid } from '../ui/flickering-grid';
import { MeshGradient } from '../ui/atmosphere';
import { PlayNarrationButton } from '../../audio/PlayNarrationButton';
import { useNarration } from '../../audio/NarrationContext';

const easeOut = [0.16, 1, 0.3, 1] as const;

export const Hero = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const { pauseForVideo, resumeFromVideo } = useNarration();

  // Coordinate narration with the video dialog — pause when video opens,
  // restore to pre-video state when it closes.
  useEffect(() => {
    if (videoOpen) {
      pauseForVideo();
    } else {
      resumeFromVideo();
    }
  }, [videoOpen]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 24 });

  // Compose the parallax as a single GPU-composited transform. The x/y
  // shorthands render on the main thread (requestAnimationFrame), which
  // stutters under the hero's animated canvas + grain; translate3d forces
  // a dedicated compositor layer so the motion stays smooth.
  const parallax = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * 18);
      mouseY.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * 12);
    },
    [mouseX, mouseY]
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
      <div className="absolute inset-0 pointer-events-none [mask-image:linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.18)_55%,transparent_100%)]">
        <FlickeringGrid
          color="rgb(167, 218, 219)"
          squareSize={3}
          gridGap={8}
          flickerChance={0.15}
          maxOpacity={0.18}
        />
      </div>

      {/* Asymmetric 7/5 grid */}
      <div className="relative z-10 max-w-[1440px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-y-12 md:gap-y-16 gap-x-12 lg:gap-x-20 items-center">
        {/* Left: editorial copy */}
        <div className="lg:col-span-7 space-y-7 md:space-y-9">
          {/* Overline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="flex items-center gap-3"
          >
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#A7DADB] animate-soft-pulse" />
            <span className="font-display text-[11px] md:text-xs tracking-[0.45em] uppercase text-[#A7DADB] font-bold">
              01  ·  A Strategic Partnership
            </span>
            <span aria-hidden className="hidden md:inline-block h-px w-12 bg-gradient-to-r from-[#A7DADB]/40 to-transparent" />
          </motion.div>

          {/* Editorial display heading */}
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

          {/* Sub copy */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: easeOut }}
            className="font-body font-light text-[#b0c5c6] text-lg md:text-xl leading-[1.55] max-w-[58ch]"
          >
            Smartslate, in partnership with{" "}
            <span className="text-white font-normal">Kristu Jayanti University</span>, presents a three-pillar architecture for the AI-native campus.
          </motion.p>

          {/* CTA cluster */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: easeOut }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2"
          >
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="group relative inline-flex items-center gap-3 rounded-full px-5 md:px-6 py-3 md:py-3.5 bg-[#A7DADB] text-[#020C1B] press-scale font-display font-bold text-[13px] md:text-sm tracking-[0.16em] md:tracking-[0.18em] uppercase"
              style={{
                boxShadow: "0 12px 30px -10px rgba(167,218,219,0.55), inset 0 1px 0 rgba(255,255,255,0.4)",
                transition: "transform 160ms var(--ease-out-expo), box-shadow 200ms var(--ease-out-expo)",
              }}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#020C1B]/90">
                <Play className="h-3 w-3 fill-[#A7DADB] text-[#A7DADB] translate-x-[0.5px]" strokeWidth={0} />
              </span>
              <span>Watch the Film</span>
              <span className="hidden sm:inline ml-2 font-mono text-[11px] tabular-nums opacity-70 tracking-wider">03:50</span>
            </button>

            <a
              href="#problem"
              className="group inline-flex items-center gap-2 font-display font-bold text-sm tracking-[0.18em] uppercase text-[#b0c5c6] hover:text-white"
              style={{ transition: "color 200ms var(--ease-out-expo)" }}
            >
              <span>Read the proposal</span>
              <ArrowUpRight
                className="h-4 w-4"
                strokeWidth={2}
                style={{ transition: "transform 220ms var(--ease-out-expo)" }}
              />
            </a>
          </motion.div>

          {/* Audio narration */}
          <PlayNarrationButton />

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: easeOut }}
            className="pt-10 md:pt-12 mt-2 border-t border-white/[0.06] grid grid-cols-3 gap-x-3 sm:gap-x-6 max-w-xl"
          >
            {[
              { k: "Pillars", v: "03" },
              { k: "Efficiency", v: "70%" },
              { k: "Era", v: "2026" },
            ].map((m) => (
              <div key={m.k} className="flex flex-col gap-1.5 pt-5">
                <span className="font-display text-[9px] sm:text-[10px] tracking-[0.28em] sm:tracking-[0.35em] uppercase text-[#b0c5c6]/60 font-bold">
                  {m.k}
                </span>
                <span className="font-display text-xl sm:text-2xl md:text-3xl text-white tabular-nums tracking-tight">
                  {m.v}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: video as cinematic still.
            Outer layer owns the one-shot entry animation; inner layer owns the
            continuous mouse parallax as a composited translate3d. Keeping these
            on separate elements stops the two from fighting over the transform's
            y-axis (which caused the jitter). */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.18, ease: easeOut }}
          className="lg:col-span-5 relative"
        >
          <motion.div
            style={{ transform: parallax, willChange: "transform", backfaceVisibility: "hidden" }}
            className="relative"
          >
            {/* Soft halo */}
            <div
              aria-hidden
              className="absolute -inset-12 -z-10 blur-3xl opacity-60"
              style={{
                background:
                  "radial-gradient(circle at 70% 30%, rgba(167,218,219,0.18) 0%, transparent 55%), radial-gradient(circle at 30% 80%, rgba(167,218,219,0.10) 0%, transparent 55%)",
              }}
            />
            <HeroVideoDialog
              videoSrc="https://hxxvxsmengeoazuywpjm.supabase.co/storage/v1/object/public/brand-assets/kju-intro-v2.mp4"
              thumbnailSrc="/video-thumbnail.jpg"
              thumbnailAlt="Project Institutional Intelligence  ·  Watch the film"
              durationLabel="03:50"
              externallyOpen={videoOpen}
              onOpenChange={setVideoOpen}
            />

            {/* Caption */}
            <div className="mt-6 flex items-center justify-between text-[10px] md:text-[11px] tracking-[0.32em] uppercase text-[#b0c5c6]/70 font-display font-bold">
              <span>Smartslate × KJU</span>
              <span className="tabular-nums">KJU_COGNITIVE_V1.0</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom HUD line */}
      <motion.div
        initial={{ scaleX: 0, transformOrigin: "left" }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.6, delay: 0.6, ease: easeOut }}
        className="absolute bottom-12 left-6 md:left-12 lg:left-24 right-6 md:right-12 lg:right-24 h-px bg-gradient-to-r from-transparent via-[#A7DADB]/25 to-transparent"
      />
    </section>
  );
};
