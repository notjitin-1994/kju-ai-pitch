import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Building2, ShieldAlert, Zap, Target } from 'lucide-react';

const problems = [
  {
    category: "Students",
    icon: Brain,
    items: [
      { title: "Skill Mismatch", desc: "Theoretical learning disconnected from AI reality.", icon: ShieldAlert },
      { title: "Zero AI Exposure", desc: "Producing graduates unequipped for the modern toolset.", icon: Zap },
      { title: "Brand Erosion", desc: "Decreased student marketability in high-stakes roles.", icon: Target }
    ]
  },
  {
    category: "Faculty",
    icon: Users,
    items: [
      { title: "Manual Preparation", desc: "Curriculum velocity stalled by legacy administrative debt.", icon: ShieldAlert },
      { title: "Assessment Debt", desc: "Manual grading cycles draining high-value faculty time.", icon: Zap },
      { title: "Static Pedagogy", desc: "Traditional methods failing to bridge the applied AI gap.", icon: Target }
    ]
  },
  {
    category: "Brand",
    icon: Building2,
    items: [
      { title: "Legacy Drift", desc: "Institutional reputation lagging behind industry innovation.", icon: ShieldAlert },
      { title: "Market Gap", desc: "Risk of brand stagnation in a rapidly evolving market.", icon: Zap },
      { title: "Opportunity Cost", desc: "The cost of delayed transition to AI-native models.", icon: Target }
    ]
  }
];

export const ProblemMatrix = () => {
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
            The <span className="text-[#A7DADB] italic font-serif">Innovation Gap</span>
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-[#A7DADB]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {problems.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="space-y-12"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-[#A7DADB]/10 border border-[#A7DADB]/20 shadow-[0_0_20px_rgba(167,218,219,0.1)]">
                  <group.icon size={32} className="text-[#A7DADB]" />
                </div>
                <h3 className="text-3xl font-display font-bold text-white uppercase tracking-widest">{group.category}</h3>
              </div>

              <div className="space-y-8">
                {group.items.map((item, itemIdx) => (
                  <motion.div
                    key={itemIdx}
                    whileHover={{ x: 10 }}
                    className="p-8 rounded-[32px] bg-[#142433]/40 backdrop-blur-xl border border-white/5 hover:border-[#A7DADB]/30 transition-all group"
                  >
                    <div className="flex gap-6 items-start">
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                        <item.icon size={20} />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-display font-bold text-white uppercase tracking-tight">{item.title}</h4>
                        <p className="text-[#b0c5c6] font-body font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-radial-gradient from-[#A7DADB]/5 to-transparent pointer-events-none" />
    </section>
  );
};
