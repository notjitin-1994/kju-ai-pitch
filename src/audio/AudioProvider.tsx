import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { SCRIPTS, SECTION_ORDER, type SectionId } from './scripts';

export type PlaybackState = 'idle' | 'loading' | 'playing' | 'paused' | 'ended';

interface AudioContextValue {
  isOptedIn: boolean;
  activeSection: SectionId | null;
  playbackState: PlaybackState;
  optIn: () => Promise<void>;
  play: (sectionId: SectionId) => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  prev: () => void;
  exit: () => void;
  volume: number;
  setVolume: (v: number) => void;
  currentTime: number;
  duration: number;
}

const AudioCtx = createContext<AudioContextValue | null>(null);

const LS_OPT_IN = 'kju.audio.optIn';
const LS_VOLUME = 'kju.audio.volume';

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOptedIn, setIsOptedIn] = useState(() => localStorage.getItem(LS_OPT_IN) === '1');
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [playbackState, setPlaybackState] = useState<PlaybackState>('idle');
  const [volume, setVolumeState] = useState<number>(() => {
    const stored = localStorage.getItem(LS_VOLUME);
    return stored ? parseFloat(stored) : 0.75;
  });
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioEls = useRef<Map<SectionId, HTMLAudioElement>>(new Map());
  const webAudioCtx = useRef<AudioContext | null>(null);
  const analyserNode = useRef<AnalyserNode | null>(null);
  const sourceNode = useRef<MediaElementAudioSourceNode | null>(null);
  const rafId = useRef<number | null>(null);
  const fadeRafId = useRef<number | null>(null);
  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const stopAmplitudeLoop = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    document.documentElement.style.setProperty('--audio-amplitude', '0');
  }, []);

  const startAmplitudeLoop = useCallback(() => {
    if (reducedMotion.current) {
      document.documentElement.style.setProperty('--audio-amplitude', '0.5');
      return;
    }
    const analyser = analyserNode.current;
    if (!analyser) return;
    const buf = new Uint8Array(analyser.fftSize);

    const tick = () => {
      analyser.getByteTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) {
        const norm = (buf[i] - 128) / 128;
        sum += norm * norm;
      }
      const rms = Math.sqrt(sum / buf.length);
      document.documentElement.style.setProperty(
        '--audio-amplitude',
        Math.min(1, rms * 4).toFixed(2)
      );
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
  }, []);

  const fadeOutActive = useCallback((onDone?: () => void) => {
    const section = activeSection;
    if (!section) { onDone?.(); return; }
    const el = audioEls.current.get(section);
    if (!el) { onDone?.(); return; }

    const startVol = el.volume;
    const start = performance.now();
    const dur = 250;

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      el.volume = startVol * (1 - t);
      if (t < 1) {
        fadeRafId.current = requestAnimationFrame(step);
      } else {
        el.pause();
        el.currentTime = 0;
        el.volume = startVol;
        onDone?.();
      }
    };
    if (fadeRafId.current !== null) cancelAnimationFrame(fadeRafId.current);
    fadeRafId.current = requestAnimationFrame(step);
  }, [activeSection]);

  const preloadAudio = useCallback(() => {
    const vol = parseFloat(localStorage.getItem(LS_VOLUME) ?? '0.75');
    SECTION_ORDER.forEach((id) => {
      if (audioEls.current.has(id)) return;
      const el = new Audio(SCRIPTS[id].audioUrl);
      el.preload = 'auto';
      el.volume = vol;
      el.onended = () => {
        setPlaybackState('ended');
        stopAmplitudeLoop();
      };
      el.ontimeupdate = () => {
        setCurrentTime(el.currentTime);
      };
      el.onloadedmetadata = () => {
        if (el.duration && isFinite(el.duration)) setDuration(el.duration);
      };
      audioEls.current.set(id, el);
    });
  }, [stopAmplitudeLoop]);

  const optIn = useCallback(async () => {
    setPlaybackState('loading');

    // Create / resume AudioContext on user gesture
    if (!webAudioCtx.current) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (Ctx) {
        webAudioCtx.current = new Ctx();
        analyserNode.current = webAudioCtx.current.createAnalyser();
        analyserNode.current.fftSize = 256;
        analyserNode.current.connect(webAudioCtx.current.destination);
      }
    }
    if (webAudioCtx.current?.state === 'suspended') {
      await webAudioCtx.current.resume();
    }

    preloadAudio();
    localStorage.setItem(LS_OPT_IN, '1');
    setIsOptedIn(true);
    setPlaybackState('idle');
  }, [preloadAudio]);

  const connectSourceNode = useCallback((el: HTMLAudioElement) => {
    const ctx = webAudioCtx.current;
    const analyser = analyserNode.current;
    if (!ctx || !analyser) return;
    if (sourceNode.current) {
      try { sourceNode.current.disconnect(); } catch (_) { /* already disconnected */ }
    }
    sourceNode.current = ctx.createMediaElementSource(el);
    sourceNode.current.connect(analyser);
  }, []);

  const play = useCallback((sectionId: SectionId) => {
    const newEl = audioEls.current.get(sectionId);
    if (!newEl) return;

    fadeOutActive(() => {
      stopAmplitudeLoop();
      setActiveSection(sectionId);
      newEl.currentTime = 0;
      newEl.volume = parseFloat(localStorage.getItem(LS_VOLUME) ?? '0.75');
      connectSourceNode(newEl);
      const playPromise = newEl.play();
      if (playPromise) {
        playPromise
          .then(() => {
            setPlaybackState('playing');
            setDuration(newEl.duration || SCRIPTS[sectionId].durationSec);
            startAmplitudeLoop();
          })
          .catch(() => {
            setPlaybackState('paused');
          });
      }
    });
  }, [fadeOutActive, stopAmplitudeLoop, connectSourceNode, startAmplitudeLoop]);

  const pause = useCallback(() => {
    const el = activeSection ? audioEls.current.get(activeSection) : null;
    if (el) el.pause();
    stopAmplitudeLoop();
    setPlaybackState('paused');
  }, [activeSection, stopAmplitudeLoop]);

  const resume = useCallback(() => {
    const el = activeSection ? audioEls.current.get(activeSection) : null;
    if (!el) return;
    el.play().then(() => {
      setPlaybackState('playing');
      startAmplitudeLoop();
    }).catch(() => {});
  }, [activeSection, startAmplitudeLoop]);

  const next = useCallback(() => {
    if (!activeSection) return;
    const idx = SECTION_ORDER.indexOf(activeSection);
    const nextId = SECTION_ORDER[idx + 1];
    if (nextId) {
      play(nextId);
      // Scroll to next section
      const el = document.getElementById(nextId === 'problem' ? 'problem' : nextId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSection, play]);

  const prev = useCallback(() => {
    if (!activeSection) return;
    const idx = SECTION_ORDER.indexOf(activeSection);
    const prevId = SECTION_ORDER[idx - 1];
    if (prevId) {
      play(prevId);
      const el = document.getElementById(prevId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeSection, play]);

  const exit = useCallback(() => {
    fadeOutActive(() => {
      stopAmplitudeLoop();
      setActiveSection(null);
      setPlaybackState('idle');
    });
  }, [fadeOutActive, stopAmplitudeLoop]);

  const setVolume = useCallback((v: number) => {
    const clamped = Math.max(0, Math.min(1, v));
    setVolumeState(clamped);
    localStorage.setItem(LS_VOLUME, clamped.toString());
    audioEls.current.forEach((el) => { el.volume = clamped; });
  }, []);

  // If returning visitor, preload silently (no AudioContext yet — that requires gesture)
  useEffect(() => {
    if (isOptedIn) {
      preloadAudio();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAmplitudeLoop();
      audioEls.current.forEach((el) => { el.pause(); el.src = ''; });
      webAudioCtx.current?.close();
    };
  }, [stopAmplitudeLoop]);

  return (
    <AudioCtx.Provider
      value={{
        isOptedIn,
        activeSection,
        playbackState,
        optIn,
        play,
        pause,
        resume,
        next,
        prev,
        exit,
        volume,
        setVolume,
        currentTime,
        duration,
      }}
    >
      {children}
    </AudioCtx.Provider>
  );
};

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioCtx);
  if (!ctx) throw new Error('useAudio must be used inside <AudioProvider>');
  return ctx;
}
