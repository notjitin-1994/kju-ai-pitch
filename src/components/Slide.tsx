import React from 'react';
import { motion } from 'framer-motion';
import { Slide as SlideType } from '../constants/slides';

interface SlideProps {
  slide: SlideType;
  direction: number;
}

export const Slide: React.FC<SlideProps> = ({ slide, direction }) => {
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1200 : -1200,
      opacity: 0,
      filter: "blur(10px)",
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1200 : -1200,
      opacity: 0,
      filter: "blur(10px)",
    }),
  };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden bg-[#020C1B] rounded-[60px] shadow-2xl border border-[#A7DADB]/10 group">
      {/* 1. Cinematic Background Image Layer - True Full Bleed (Behind Everything) */}
      {slide.bgImage && (
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src={slide.bgImage} 
            className="w-full h-full object-cover brightness-[0.4] contrast-110" 
            alt=""
          />
          {/* Overlay Color with Blur */}
          {slide.overlayColor && (
            <div 
              className="absolute inset-0 z-10 backdrop-blur-[2px]" 
              style={{ backgroundColor: slide.overlayColor }}
            />
          )}
          {/* Permanent Master Gradient for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#020C1B]/90 via-[#020C1B]/40 to-[#020C1B]/90 z-20" />
        </div>
      )}

      {/* 2. Atmospheric Lighting Leaks (Global Consistency) */}
      <div className="absolute top-1/4 -right-20 w-[800px] h-[800px] bg-[#4F46E5]/15 blur-[150px] rounded-full pointer-events-none z-10" />
      <div className="absolute bottom-1/4 -left-20 w-[600px] h-[600px] bg-[#A7DADB]/10 blur-[120px] rounded-full pointer-events-none z-10" />

      {/* 3. Content Layer */}
      <motion.div
        key={slide.id}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 200, damping: 30 },
          opacity: { duration: 0.4 },
          filter: { duration: 0.4 }
        }}
        className={`relative z-30 flex flex-col h-full ${slide.fullBleed ? 'p-0' : 'p-24'}`}
      >
        {/* Slide Metadata/Tag */}
        {!slide.hideTitle && (
          <div className="mb-12 shrink-0">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 mb-4"
              style={{ color: slide.tagColor || '#A7DADB' }}
            >
              <div className="h-px w-12 bg-current opacity-40" />
              <span className="font-display font-medium tracking-[0.4em] text-sm uppercase">{slide.tag}</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[100px] font-display font-bold tracking-tighter leading-none"
              style={{ color: slide.titleColor || '#FFFFFF' }}
            >
              {slide.title}
            </motion.h2>
          </div>
        )}
        
        {/* Dynamic Slide Content */}
        <div className={`flex-grow relative ${slide.fullBleed ? '' : 'overflow-hidden'}`}>
           {slide.content}
        </div>
      </motion.div>

      {/* Subtle UI Accents */}
      <div className="absolute top-12 right-12 text-[#b0c5c6]/30 text-[10px] font-mono tracking-[0.3em] uppercase pointer-events-none">
        Smartslate Intelligence v2.04
      </div>
    </div>
  );
};
