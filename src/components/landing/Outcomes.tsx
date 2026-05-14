import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Clock, Target, Rocket } from 'lucide-react';

const metrics = [
  {
    value: "70%",
    label: "Efficiency Surge",
    sub: "Operational Benchmarking",
    icon: Gauge,
    color: "#A7DADB"
  },
  {
    value: "40-60%",
    label: "Time Reclaimed",
    sub: "Faculty Administrative Recovery",
    icon: Clock,
    color: "#A7DADB"
  },
  {
    value: "100%",
    label: "Core Upgrade",
    sub: "Institutional Ecosystem Status",
    icon: Target,
    color: "#A7DADB"
  }
];

export const Outcomes = () => {
  return (
    <section className="relative py-32 px-8 md:px-24 bg-[#020C1B]">
      <div className="relative z-10 max-w-7xl mx-auto space-y-24">
        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight text-left"
          >
            The <span className="text-[#A7DADB] italic font-serif">Cognitive Surge</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 0.6, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-xl text-[#b0c5c6] font-body font-light max-w-2xl text-left"
          >
            Quantifiable impact across every layer of the institutional footprint.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {metrics.map((metric, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative p-12 rounded-[50px] bg-[#142433]/60 backdrop-blur-2xl border border-white/10 overflow-hidden group hover:border-[#A7DADB]/40 transition-all duration-700 h-[500px] flex flex-col justify-center items-start text-left"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 -mr-24 -mt-24 w-64 h-64 bg-[#A7DADB]/10 blur-[80px] group-hover:bg-[#A7DADB]/20 transition-all duration-1000" />
              
              <div className="relative z-10 space-y-8">
                <div className="p-4 rounded-2xl bg-[#A7DADB]/10 border border-[#A7DADB]/20 w-fit">
                  <metric.icon size={32} className="text-[#A7DADB]" />
                </div>
                
                <div className="space-y-2">
                  <motion.span 
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 + idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-7xl md:text-8xl font-display font-bold text-white block leading-none tracking-tighter"
                  >
                    {metric.value}
                  </motion.span>
                  <h4 className="text-2xl md:text-3xl font-display font-bold text-[#A7DADB] uppercase tracking-wider">
                    {metric.label}
                  </h4>
                </div>

                <p className="text-lg text-[#b0c5c6] font-body font-light uppercase tracking-widest opacity-60">
                  {metric.sub}
                </p>
              </div>

              {/* Decorative HUD Lines */}
              <div className="absolute bottom-8 left-12 right-12 h-px bg-white/5" />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="p-16 rounded-[60px] bg-gradient-to-br from-[#142433] to-[#020C1B] border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="space-y-4 max-w-2xl text-left">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white text-left">
              Ready to redefine the <span className="text-[#A7DADB] italic font-serif">standard?</span>
            </h3>
            <p className="text-xl text-[#b0c5c6] font-body font-light text-left">
              Kristu Jayanti has the choice to lead the next era of Indian higher education. 
              The infrastructure is ready. The playbook is proven.
            </p>
          </div>
          <div className="p-8 rounded-full bg-[#A7DADB]/10 border border-[#A7DADB]/20 animate-pulse">
            <Rocket size={48} className="text-[#A7DADB]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
