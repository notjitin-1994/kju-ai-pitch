import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, GraduationCap, ArrowRight } from 'lucide-react';

const pillars = [
  {
    id: "01",
    title: "AI-Enabled Campus",
    sub: "Operations & Management",
    icon: Building2,
    img: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800",
    detail: "Intelligent concierge, success modeling, and unified institutional knowledge data layer."
  },
  {
    id: "02",
    title: "AI-Augmented Faculty",
    sub: "Teaching & Efficiency",
    icon: Users,
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
    detail: "Masterclasses, specialized pedagogy, and AI-assisted task flows for lesson planning."
  },
  {
    id: "03",
    title: "AI-First Students",
    sub: "Learning & Outcomes",
    icon: GraduationCap,
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
    detail: "Mandatory literacy, project-based models, and direct enterprise lab experience."
  }
];

export const SolutionPillars = () => {
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
            The <span className="text-[#A7DADB] italic font-serif">3-Pillar Model</span>
          </motion.h2>
          <motion.p
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 0.6, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="text-xl text-[#b0c5c6] font-body font-light max-w-2xl text-left"
          >
            A comprehensive institutional architecture designed to move the college from adaptation to dominance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="relative group h-[600px] rounded-[40px] border border-[#A7DADB]/20 bg-[#142433]/40 backdrop-blur-xl overflow-hidden transition-all duration-700 hover:border-[#A7DADB]/50 shadow-2xl"
            >
              <img 
                src={pillar.img} 
                alt={pillar.title}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 brightness-[0.3] group-hover:scale-110 group-hover:opacity-40 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020C1B] via-transparent to-transparent z-10" />
              
              <div className="relative z-20 h-full p-12 flex flex-col justify-between items-start text-left">
                <div className="flex justify-between items-start w-full">
                  <div className="p-5 rounded-2xl bg-[#A7DADB]/10 border border-[#A7DADB]/20 group-hover:bg-[#A7DADB] group-hover:border-[#A7DADB]/40 transition-all duration-500 transform group-hover:-translate-y-1">
                    <pillar.icon size={32} className="text-[#A7DADB] group-hover:text-[#020C1B]" />
                  </div>
                  <span className="text-6xl font-serif italic text-[#A7DADB]/10 group-hover:text-[#A7DADB]/30 transition-colors duration-700">
                    {pillar.id}
                  </span>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-tight text-left">
                      {pillar.title}
                    </h3>
                    <div className="h-1 w-12 bg-[#A7DADB] group-hover:w-24 transition-all duration-700" />
                    <p className="text-[#A7DADB] font-mono text-sm tracking-widest uppercase opacity-70">
                      {pillar.sub}
                    </p>
                  </div>
                  <p className="text-lg md:text-xl text-[#b0c5c6] font-body font-light leading-relaxed">
                    {pillar.detail}
                  </p>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-[#A7DADB] font-display font-bold text-sm uppercase tracking-widest cursor-pointer group/link"
                  >
                    Explore Pillar <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
