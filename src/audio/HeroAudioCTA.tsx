import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headphones, Pause, Play, RotateCcw } from 'lucide-react';
import { useAudio } from './AudioProvider';

const easeOut = [0.16, 1, 0.3, 1] as const;

export const HeroAudioCTA: React.FC = () => {
  const { isOptedIn, activeSection, playbackState, optIn, pause, resume, play } = useAudio();

  const isHeroActive = activeSection === 'hero';
  const isHeroPlaying = isHeroActive && playbackState === 'playing';
  const isLoading = playbackState === 'loading';

  const handleClick = async () => {
    if (!isOptedIn) {
      await optIn();
      play('hero');
      return;
    }
    if (isHeroPlaying) {
      pause();
      return;
    }
    if (isHeroActive && playbackState === 'paused') {
      resume();
      return;
    }
    // Return visitor or re-launch
    play('hero');
  };

  const wasOptedIn = isOptedIn && !isHeroActive && playbackState !== 'loading';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.45, ease: easeOut }}
      className="mt-5"
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 border border-[#A7DADB]/25 bg-[#A7DADB]/[0.06] backdrop-blur-sm"
          >
            <span className="h-3.5 w-3.5 rounded-full border-2 border-[#A7DADB]/40 border-t-[#A7DADB] animate-spin" />
            <span className="font-display text-[11px] tracking-[0.3em] uppercase text-[#A7DADB]/75 font-bold">
              Loading narration…
            </span>
          </motion.div>
        ) : isHeroActive ? (
          <motion.button
            key="narrating"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onClick={handleClick}
            type="button"
            className="group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 border border-[#A7DADB]/30 bg-[#A7DADB]/[0.08] backdrop-blur-sm hover:bg-[#A7DADB]/[0.13] press-scale"
            style={{ transition: 'background-color 200ms var(--ease-out-expo)' }}
            aria-label={isHeroPlaying ? 'Pause narration' : 'Resume narration'}
          >
            <span
              className="relative flex h-6 w-6 items-center justify-center rounded-full bg-[#A7DADB]/20"
              aria-hidden
            >
              {isHeroPlaying ? (
                <Pause className="h-2.5 w-2.5 fill-[#A7DADB] text-[#A7DADB]" strokeWidth={0} />
              ) : (
                <Play className="h-2.5 w-2.5 fill-[#A7DADB] text-[#A7DADB] translate-x-[0.5px]" strokeWidth={0} />
              )}
              {isHeroPlaying && (
                <span className="absolute inset-0 rounded-full animate-ping bg-[#A7DADB]/20" />
              )}
            </span>
            <span className="font-display text-[11px] tracking-[0.3em] uppercase text-[#A7DADB] font-bold">
              {isHeroPlaying ? 'Narrating' : 'Paused'}
            </span>
            {/* Live amplitude bars — pure CSS using the CSS variable */}
            {isHeroPlaying && (
              <span aria-hidden className="flex items-end gap-[2px] h-3">
                {[0.4, 0.7, 1, 0.6, 0.85].map((h, i) => (
                  <span
                    key={i}
                    className="w-[2px] rounded-full bg-[#A7DADB]/70"
                    style={{
                      height: `calc(${h * 12}px * (0.4 + 0.6 * var(--audio-amplitude, 0.5)))`,
                      transition: 'height 80ms ease',
                    }}
                  />
                ))}
              </span>
            )}
          </motion.button>
        ) : wasOptedIn ? (
          <motion.button
            key="resume"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClick}
            type="button"
            className="group inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-[#A7DADB]/25 hover:bg-[#A7DADB]/[0.06] press-scale"
            style={{ transition: 'background-color 200ms var(--ease-out-expo), border-color 200ms var(--ease-out-expo)' }}
            aria-label="Resume narrated tour"
          >
            <RotateCcw className="h-3 w-3 text-[#A7DADB]/70" strokeWidth={2} />
            <span className="font-display text-[11px] tracking-[0.3em] uppercase text-[#b0c5c6] font-bold">
              Resume narration
            </span>
          </motion.button>
        ) : (
          <motion.button
            key="opt-in"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClick}
            type="button"
            className="group inline-flex items-center gap-3 rounded-full px-5 py-2.5 border border-[#A7DADB]/20 bg-[#A7DADB]/[0.05] backdrop-blur-sm hover:border-[#A7DADB]/35 hover:bg-[#A7DADB]/[0.10] press-scale"
            style={{ transition: 'background-color 220ms var(--ease-out-expo), border-color 220ms var(--ease-out-expo)' }}
            aria-label="Take the narrated tour, approximately 4 minutes"
          >
            <Headphones className="h-3.5 w-3.5 text-[#A7DADB]" strokeWidth={2} />
            <span className="font-display text-[11px] tracking-[0.3em] uppercase text-[#A7DADB]/85 font-bold group-hover:text-[#A7DADB]"
              style={{ transition: 'color 200ms var(--ease-out-expo)' }}>
              Take the narrated tour
            </span>
            <span className="font-mono text-[10px] text-[#b0c5c6]/55 tabular-nums tracking-wider">
              ~4 min
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
