import React from 'react';
import { motion } from 'framer-motion';
import { ShimmerButton } from '../ui/shimmer-button';
import { Network, Globe, Activity } from 'lucide-react';

export const CTA = () => {
  return (
    <section className="relative py-48 px-8 md:px-24 bg-[#020C1B] overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full bg-[#6366f1]/10 blur-[200px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#A7DADB_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03] pointer-events-none" />
      
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-start text-left space-y-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-6"
        >
          <div className="p-4 rounded-3xl bg-[#6366f1]/20 border border-[#6366f1]/40 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
            <Network size={32} className="text-[#6366f1]" />
          </div>
          <span className="font-mono text-[#6366f1] text-sm md:text-base uppercase tracking-[0.5em] font-bold">
            Protocol: Institutional_Upgrade
          </span>
        </motion.div>

        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-[100px] font-display font-bold text-white leading-[0.9] tracking-tighter text-left"
          >
            Ready to <span className="text-[#A7DADB] italic font-serif">Orchestrate</span> <br />
            Your Learning Future?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-[#b0c5c6] font-body font-light max-w-3xl leading-relaxed text-left"
          >
            The transformation begins with a single decision. Deploy the Cognitive Campus 
            framework at Kristu Jayanti College and lead the next era.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center gap-12"
        >
          <ShimmerButton className="shadow-2xl" background="#6366f1">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-[0.1em] text-white dark:from-white dark:to-slate-900/10 lg:text-2xl font-display uppercase font-bold py-2 px-6">
              Reach Out
            </span>
          </ShimmerButton>

          <div className="flex items-center gap-8 opacity-40">
            <div className="flex flex-col items-start gap-1">
               <span className="text-[10px] text-[#b0c5c6] uppercase tracking-[0.3em] font-display">System Status</span>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-[#A7DADB] animate-pulse" />
                 <span className="text-white font-mono text-xs tracking-widest uppercase">Stable // Ready</span>
               </div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex flex-col items-start gap-1">
               <span className="text-[10px] text-[#b0c5c6] uppercase tracking-[0.3em] font-display">Uplink</span>
               <div className="flex items-center gap-2">
                 <Globe size={12} className="text-white/60" />
                 <span className="text-white font-mono text-xs tracking-widest uppercase">Global_Standard</span>
               </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-12 left-8 md:left-24 right-8 md:right-24 flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-white/5 opacity-20">
        <div className="flex items-center gap-6">
          <img src="/kjc-logo.png" alt="KJC" className="h-10 w-auto grayscale" />
          <div className="h-6 w-px bg-white/40" />
          <span className="text-white font-display text-sm tracking-widest uppercase font-bold">KJU_COGNITIVE_V1.0</span>
        </div>
        <div className="flex items-center gap-3">
          <Activity size={16} className="text-[#A7DADB]" />
          <span className="text-white font-mono text-[10px] tracking-[0.4em] uppercase">Academic Excellence // 2026</span>
        </div>
      </div>
    </section>
  );
};
