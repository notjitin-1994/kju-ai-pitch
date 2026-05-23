import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

const NARRATION_SRC = '/audio/narration.mp3';

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

interface PlayNarrationButtonProps {
  /** When true, narration auto-pauses; when toggled back to false, it auto-resumes (unless the user manually paused). */
  externallyPaused?: boolean;
}

export const PlayNarrationButton: React.FC<PlayNarrationButtonProps> = ({
  externallyPaused = false,
}) => {
  // Lazy-init audio element. useRef survives React.StrictMode double-mount, so we
  // get exactly one HTMLAudioElement across both mounts in dev.
  const audioRef = useRef<HTMLAudioElement | null>(null);
  if (audioRef.current === null) {
    audioRef.current = new Audio(NARRATION_SRC);
    audioRef.current.preload = 'auto';
  }

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const wasPlayingBeforeExternalPause = useRef(false);
  const userPausedRef = useRef(false);
  // Keep externallyPaused readable by the gesture-listener closure without rebinding the listener.
  const externallyPausedRef = useRef(externallyPaused);
  useEffect(() => {
    externallyPausedRef.current = externallyPaused;
  }, [externallyPaused]);

  useEffect(() => {
    const el = audioRef.current!;

    const onLoaded = () => setDuration(el.duration);
    const onTime = () => setCurrentTime(el.currentTime);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      el.currentTime = 0;
      setCurrentTime(0);
    };

    el.addEventListener('loadedmetadata', onLoaded);
    el.addEventListener('timeupdate', onTime);
    el.addEventListener('play', onPlay);
    el.addEventListener('pause', onPause);
    el.addEventListener('ended', onEnded);

    // Re-sync state with the element on (re-)mount.
    if (!isNaN(el.duration)) setDuration(el.duration);
    setCurrentTime(el.currentTime);
    setIsPlaying(!el.paused);

    // Optimistic autoplay attempt — most browsers reject this for audio-with-sound
    // on first page visit, but it costs nothing if it succeeds.
    el.play().catch(() => {
      /* swallow — fallback below handles it */
    });

    // Gesture-fallback: listeners attach immediately (not inside a .catch) so any
    // click/scroll/keypress that happens while the autoplay promise is still
    // pending will still trigger playback.
    const armAndPlay = () => {
      if (el.paused && !userPausedRef.current && !externallyPausedRef.current) {
        el.play().catch(() => {});
      }
    };
    const passive: AddEventListenerOptions = { passive: true };
    document.addEventListener('click', armAndPlay, passive);
    document.addEventListener('keydown', armAndPlay);
    document.addEventListener('scroll', armAndPlay, passive);
    document.addEventListener('touchstart', armAndPlay, passive);
    document.addEventListener('pointerdown', armAndPlay, passive);

    return () => {
      el.removeEventListener('loadedmetadata', onLoaded);
      el.removeEventListener('timeupdate', onTime);
      el.removeEventListener('play', onPlay);
      el.removeEventListener('pause', onPause);
      el.removeEventListener('ended', onEnded);
      document.removeEventListener('click', armAndPlay);
      document.removeEventListener('keydown', armAndPlay);
      document.removeEventListener('scroll', armAndPlay);
      document.removeEventListener('touchstart', armAndPlay);
      document.removeEventListener('pointerdown', armAndPlay);
    };
  }, []);

  // Coordinate with external pause signal (e.g. video dialog open).
  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    if (externallyPaused) {
      wasPlayingBeforeExternalPause.current = !el.paused;
      if (!el.paused) el.pause();
    } else if (wasPlayingBeforeExternalPause.current && !userPausedRef.current) {
      el.play().catch(() => {});
      wasPlayingBeforeExternalPause.current = false;
    }
  }, [externallyPaused]);

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (isPlaying) {
      el.pause();
      userPausedRef.current = true;
    } else {
      userPausedRef.current = false;
      el.play().catch(() => {});
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="inline-flex max-w-full items-center gap-3 sm:gap-4 rounded-full border border-white/[0.08] bg-white/[0.04] backdrop-blur-md px-2 py-2 pr-4 sm:pr-5">
      <button
        type="button"
        onClick={toggle}
        aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
        className="press-scale group flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#A7DADB] text-[#020C1B]"
        style={{
          boxShadow:
            '0 8px 22px -8px rgba(167,218,219,0.55), inset 0 1px 0 rgba(255,255,255,0.4)',
          transition:
            'transform 160ms var(--ease-out-expo), box-shadow 220ms var(--ease-out-expo)',
        }}
      >
        {isPlaying ? (
          <Pause className="h-4 w-4" strokeWidth={2.5} fill="currentColor" />
        ) : (
          <Play
            className="h-4 w-4 translate-x-[1px]"
            strokeWidth={2.5}
            fill="currentColor"
          />
        )}
      </button>

      <div className="flex flex-col gap-1.5 min-w-0 flex-1 sm:min-w-[150px] sm:flex-initial">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <span className="font-display text-[9.5px] sm:text-[10px] tracking-[0.28em] sm:tracking-[0.35em] uppercase text-[#b0c5c6]/85 font-bold truncate">
            {isPlaying ? 'Narrating' : 'Listen to the brief'}
          </span>
          <span className="font-mono text-[9.5px] sm:text-[10px] tabular-nums text-[#b0c5c6]/65 shrink-0">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/[0.08]">
          <div
            className="absolute inset-y-0 left-0 bg-[#A7DADB]"
            style={{
              width: `${progress}%`,
              transition: 'width 200ms linear',
            }}
          />
        </div>
      </div>
    </div>
  );
};
