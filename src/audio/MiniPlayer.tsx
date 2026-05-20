import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  X,
  Volume2,
  VolumeX,
  FileText,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAudio } from './AudioProvider';
import { SCRIPTS, SECTION_ORDER } from './scripts';

const AUTO_HIDE_MS = 4000;
const easeOut = [0.16, 1, 0.3, 1] as const;

export const MiniPlayer: React.FC = () => {
  const {
    isOptedIn,
    activeSection,
    playbackState,
    pause,
    resume,
    next,
    prev,
    exit,
    volume,
    setVolume,
    currentTime,
    duration,
  } = useAudio();

  const [hidden, setHidden] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  const resetHideTimer = useCallback(() => {
    setHidden(false);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setHidden(true), AUTO_HIDE_MS);
  }, []);

  useEffect(() => {
    if (!isOptedIn || !activeSection) return;
    const onMove = () => resetHideTimer();
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchstart', onMove, { passive: true });
    resetHideTimer();
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchstart', onMove);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isOptedIn, activeSection, resetHideTimer]);

  // Keyboard controls
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!activeSection) return;
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        playbackState === 'playing' ? pause() : resume();
        resetHideTimer();
      } else if (e.key === 'ArrowRight') {
        next();
        resetHideTimer();
      } else if (e.key === 'ArrowLeft') {
        prev();
        resetHideTimer();
      } else if (e.key === 'Escape') {
        exit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeSection, playbackState, pause, resume, next, prev, exit, resetHideTimer]);

  const isVisible =
    isOptedIn &&
    activeSection !== null &&
    activeSection !== 'hero';

  const script = activeSection ? SCRIPTS[activeSection] : null;
  const currentIdx = activeSection ? SECTION_ORDER.indexOf(activeSection) : -1;
  const hasPrev = currentIdx > 0;
  const hasNext = currentIdx < SECTION_ORDER.length - 1;

  const progress = duration > 0 ? Math.min(1, currentTime / duration) : 0;

  const isTourDone = playbackState === 'ended' && activeSection === 'cta';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="mini-player"
          ref={playerRef}
          role="region"
          aria-label="Narration player"
          tabIndex={-1}
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: hidden ? 64 : 0, opacity: hidden ? 0 : 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.35, ease: easeOut }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[min(480px,calc(100vw-32px))]"
          onMouseEnter={resetHideTimer}
        >
          {/* Glass pill */}
          <div
            className="relative flex flex-col rounded-2xl border border-white/10 bg-[#020C1B]/80 backdrop-blur-2xl overflow-hidden"
            style={{
              boxShadow:
                '0 8px 32px -4px rgba(0,0,0,0.6), 0 0 0 1px rgba(167,218,219,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            {/* Progress bar */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.06]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#A7DADB]/60 to-[#A7DADB]"
                style={{ scaleX: progress, transformOrigin: 'left' }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="flex items-center gap-3 px-4 py-3 pt-4">
              {/* Section info */}
              <div className="flex-1 min-w-0">
                {isTourDone ? (
                  <div className="flex items-center gap-2">
                    <span className="font-display text-[10px] tracking-[0.3em] uppercase text-[#A7DADB] font-bold">
                      Tour complete
                    </span>
                    <button
                      type="button"
                      onClick={() => { next(); }}
                      className="font-display text-[10px] tracking-[0.25em] uppercase text-[#b0c5c6]/60 hover:text-[#A7DADB] underline underline-offset-2"
                      aria-label="Replay tour from beginning"
                    >
                      Replay?
                    </button>
                  </div>
                ) : (
                  <>
                    <p className="font-display text-[10px] tracking-[0.35em] uppercase text-[#A7DADB] font-bold truncate">
                      {script?.title ?? ''}
                    </p>
                    {playbackState !== 'playing' && playbackState !== 'paused' && (
                      <p className="font-display text-[9px] tracking-[0.25em] uppercase text-[#b0c5c6]/45 font-bold mt-0.5">
                        ▷ Scroll to trigger
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1">
                {/* Volume toggle */}
                <button
                  type="button"
                  onClick={() => setShowVolume((v) => !v)}
                  className="p-1.5 rounded-lg text-[#b0c5c6]/60 hover:text-[#A7DADB] hover:bg-white/[0.06]"
                  style={{ transition: 'color 150ms, background 150ms' }}
                  aria-label={volume === 0 ? 'Unmute' : 'Mute'}
                >
                  {volume === 0 ? (
                    <VolumeX className="h-3.5 w-3.5" strokeWidth={2} />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5" strokeWidth={2} />
                  )}
                </button>

                {/* Prev */}
                <button
                  type="button"
                  onClick={prev}
                  disabled={!hasPrev}
                  className="p-1.5 rounded-lg text-[#b0c5c6]/60 hover:text-white hover:bg-white/[0.06] disabled:opacity-25 disabled:cursor-not-allowed"
                  style={{ transition: 'color 150ms, background 150ms' }}
                  aria-label="Previous chapter"
                >
                  <SkipBack className="h-3.5 w-3.5" strokeWidth={2} />
                </button>

                {/* Play/Pause */}
                <button
                  type="button"
                  onClick={playbackState === 'playing' ? pause : resume}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#A7DADB]/15 hover:bg-[#A7DADB]/25 text-[#A7DADB] press-scale"
                  style={{ transition: 'background 150ms, transform 160ms var(--ease-out-expo)' }}
                  aria-label={playbackState === 'playing' ? 'Pause' : 'Play'}
                >
                  {playbackState === 'playing' ? (
                    <Pause className="h-3.5 w-3.5 fill-[#A7DADB]" strokeWidth={0} />
                  ) : (
                    <Play className="h-3.5 w-3.5 fill-[#A7DADB] translate-x-[1px]" strokeWidth={0} />
                  )}
                </button>

                {/* Next */}
                <button
                  type="button"
                  onClick={next}
                  disabled={!hasNext}
                  className="p-1.5 rounded-lg text-[#b0c5c6]/60 hover:text-white hover:bg-white/[0.06] disabled:opacity-25 disabled:cursor-not-allowed"
                  style={{ transition: 'color 150ms, background 150ms' }}
                  aria-label="Next chapter"
                >
                  <SkipForward className="h-3.5 w-3.5" strokeWidth={2} />
                </button>

                {/* Transcript */}
                <Link
                  to="/transcript"
                  className="p-1.5 rounded-lg text-[#b0c5c6]/60 hover:text-white hover:bg-white/[0.06]"
                  style={{ transition: 'color 150ms, background 150ms' }}
                  aria-label="View transcript"
                  title="View transcript (accessibility)"
                >
                  <FileText className="h-3.5 w-3.5" strokeWidth={2} />
                </Link>

                {/* Exit */}
                <button
                  type="button"
                  onClick={exit}
                  className="p-1.5 rounded-lg text-[#b0c5c6]/45 hover:text-white hover:bg-white/[0.06]"
                  style={{ transition: 'color 150ms, background 150ms' }}
                  aria-label="Exit narration mode"
                >
                  <X className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Volume slider (popover) */}
            <AnimatePresence>
              {showVolume && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  className="overflow-hidden border-t border-white/[0.06]"
                >
                  <div className="flex items-center gap-3 px-4 py-2.5">
                    <VolumeX className="h-3 w-3 text-[#b0c5c6]/40 flex-shrink-0" strokeWidth={2} />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="flex-1 h-1 appearance-none rounded-full bg-white/10 cursor-pointer accent-[#A7DADB]"
                      aria-label="Volume"
                    />
                    <Volume2 className="h-3 w-3 text-[#b0c5c6]/40 flex-shrink-0" strokeWidth={2} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Screen-reader live region for active section */}
          <div aria-live="polite" aria-atomic className="sr-only">
            {script ? `Now playing: ${script.title}` : ''}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
