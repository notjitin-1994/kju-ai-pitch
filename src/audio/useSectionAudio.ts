import { useCallback, useEffect, useRef, useState } from 'react';
import { useAudio } from './AudioProvider';
import type { SectionId } from './scripts';

interface SectionAudioResult {
  ref: React.RefObject<HTMLElement>;
  isActive: boolean;
  isPlaying: boolean;
  showNextHint: boolean;
}

const DWELL_MS_DESKTOP = 1500;
const DWELL_MS_MOBILE = 1000;
const VISIBILITY_PLAY = 0.6;
const VISIBILITY_STOP = 0.4;

export function useSectionAudio(sectionId: SectionId): SectionAudioResult {
  const { isOptedIn, activeSection, playbackState, play } = useAudio();
  const ref = useRef<HTMLElement>(null);
  const dwellTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [showNextHint, setShowNextHint] = useState(false);

  const isActive = activeSection === sectionId;
  const isPlaying = isActive && playbackState === 'playing';

  // Show "next chapter" hint when this section's VO ends naturally
  useEffect(() => {
    if (isActive && playbackState === 'ended') {
      setShowNextHint(true);
      const t = setTimeout(() => setShowNextHint(false), 2000);
      return () => clearTimeout(t);
    }
    setShowNextHint(false);
  }, [isActive, playbackState]);

  const clearDwell = useCallback(() => {
    if (dwellTimer.current !== null) {
      clearTimeout(dwellTimer.current);
      dwellTimer.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isOptedIn) return;
    const el = ref.current;
    if (!el) return;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const dwellMs = isMobile ? DWELL_MS_MOBILE : DWELL_MS_DESKTOP;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const ratio = entry.intersectionRatio;

        if (ratio >= VISIBILITY_PLAY) {
          if (dwellTimer.current === null) {
            dwellTimer.current = setTimeout(() => {
              dwellTimer.current = null;
              if (activeSection !== sectionId) {
                play(sectionId);
              }
            }, dwellMs);
          }
        } else {
          clearDwell();
          // "cut on exit" is handled by AudioProvider when a new section plays.
          // We only need to stop the dwell timer here.
        }
      },
      { threshold: [0, VISIBILITY_STOP, VISIBILITY_PLAY] }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearDwell();
    };
  }, [isOptedIn, sectionId, activeSection, play, clearDwell]);

  return { ref: ref as React.RefObject<HTMLElement>, isActive, isPlaying, showNextHint };
}
