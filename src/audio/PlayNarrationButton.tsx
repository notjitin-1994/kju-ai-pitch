import React from 'react';
import { Play, Pause } from 'lucide-react';
import { useNarration } from './NarrationContext';

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export const PlayNarrationButton: React.FC = () => {
  const { isPlaying, currentTime, duration, toggle } = useNarration();
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
