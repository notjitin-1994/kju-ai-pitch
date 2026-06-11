import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  /** Max tilt in degrees */
  strength?: number;
}

/**
 * 3D tilt-on-hover card. Tilt only engages on hover-capable fine pointers
 * and is disabled entirely under prefers-reduced-motion — on touch devices
 * the card renders static instead of jumping to the last tap position.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  style,
  onClick,
  strength = 4,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setCanHover(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const tiltEnabled = canHover && !reduce;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tiltEnabled) return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const halfW = rect.width / 2;
    const halfH = rect.height / 2;
    rotateY.set(((e.clientX - rect.left - halfW) / halfW) * strength);
    rotateX.set(-((e.clientY - rect.top - halfH) / halfH) * strength);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="perspective-1000 h-full">
      <motion.div
        ref={cardRef}
        className={className}
        style={{ ...style, rotateX: springX, rotateY: springY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {children}
      </motion.div>
    </div>
  );
};
