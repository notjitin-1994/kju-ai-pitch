import React, { useEffect, useRef, useState } from 'react';

export const CursorSpotlight: React.FC<{ color?: string }> = ({
  color = 'rgba(167, 218, 219, 0.055)',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setEnabled(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const move = (e: MouseEvent) => {
      el.style.setProperty('--cx', `${e.clientX}px`);
      el.style.setProperty('--cy', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[40]"
      style={{
        background: `radial-gradient(500px circle at var(--cx, -999px) var(--cy, -999px), ${color}, transparent 40%)`,
      }}
    />
  );
};
