import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AmbientGlowProps {
  active: boolean;
}

export const AmbientGlow: React.FC<AmbientGlowProps> = ({ active }) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          aria-hidden
          key="ambient-glow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            // Uses --audio-amplitude CSS variable written each RAF frame by AudioProvider.
            // calc() reads the live value directly — no JS re-render needed.
            boxShadow:
              'inset 0 0 calc(60px + 80px * var(--audio-amplitude, 0)) rgba(167, 218, 219, calc(0.08 + 0.18 * var(--audio-amplitude, 0)))',
            borderRadius: 'inherit',
          }}
        />
      )}
    </AnimatePresence>
  );
};
