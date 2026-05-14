import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ShimmerButton } from '../ui/shimmer-button';
import { HeroVideoDialog } from '../ui/hero-video-dialog';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-24 py-32 overflow-hidden bg-[#020C1B]">
      {/* Atmospheric Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[1000px] h-[1000px] rounded-full bg-[#A7DADB]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-[#6366f1]/5 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
            <div className="p-2 rounded-lg bg-[#A7DADB]/10 border border-[#A7DADB]/20">
              <Sparkles size={20} className="text-[#A7DADB]" />
            </div>
            <span className="text-[#A7DADB] font-display font-bold uppercase tracking-[0.3em] text-sm">
              Project: Institutional Intelligence
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-8xl font-display font-bold text-white leading-[1] tracking-tighter text-left"
          >
            The AI <br />
            <span className="italic font-serif text-[#A7DADB]">Transformation</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-xl text-[#b0c5c6] font-body font-light max-w-xl leading-relaxed text-left"
          >
            Deploying a world-class cognitive ecosystem at Kristu Jayanti College. 
            Defining the future of intelligence in higher education through the 3-Pillar Model.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="pt-8"
          >
            <ShimmerButton className="shadow-2xl" background="#6366f1">
              <span className="whitespace-pre-wrap text-center text-sm font-bold uppercase tracking-[0.1em] text-white lg:text-lg py-2 px-4">
                Reach Out
              </span>
            </ShimmerButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
        >
          <div className="absolute -inset-4 bg-gradient-to-tr from-[#A7DADB]/20 to-transparent blur-2xl rounded-[40px] opacity-50" />
          <HeroVideoDialog
            videoSrc="https://hxxvxsmengeoazuywpjm.supabase.co/storage/v1/object/public/brand-assets/kju-intro-video.mp4"
            thumbnailSrc="https://images.unsplash.com/photo-1620712943543-bcc4628c9759?auto=format&fit=crop&q=80&w=1280"
            thumbnailAlt="KJU AI Transformation Video"
            animationStyle="from-center"
          />
        </motion.div>
      </div>

      {/* Decorative HUD Element */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.5, delay: 1, ease: "circOut" }}
        className="absolute bottom-24 left-8 md:left-24 right-8 md:right-24 h-px bg-gradient-to-r from-transparent via-[#A7DADB]/20 to-transparent"
      />
    </section>
  );
};
