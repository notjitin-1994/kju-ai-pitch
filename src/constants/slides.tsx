import React from 'react';
import { 
  Building2, GraduationCap, Users, Lightbulb, Zap, Target, Layers, Rocket, CheckCircle2, X,
  ArrowRight, Brain, Globe, TrendingUp, Shield, Award, Briefcase, Sparkles, Binary,
  Compass, PieChart, MessageSquare, Cpu, Search, Database, BarChart3, Presentation,
  ShieldAlert, LibraryBig, RefreshCw, Gauge, Clock, Palette, Repeat, Wrench, Fingerprint,
  BookOpen, FlaskConical, EyeOff, Activity, Network, ChevronRight
} from 'lucide-react';
import { m } from 'framer-motion';
import { theme } from '../theme/branding';
import { FlipCard } from '../components/FlipCard';

import { useSlideStep } from '../context/SlideStepContext';
import { NeonGradientCard } from '../components/ui/neon-gradient-card';

const RevealCard: React.FC<{ step: number; children: React.ReactNode }> = ({ step, children }) => {
  const { subStep } = useSlideStep();
  const isVisible = subStep >= step;
  
  return (
    <m.div
      initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20,
        filter: isVisible ? 'blur(0px)' : 'blur(10px)',
      }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      className="h-full w-full"
    >
      {children}
    </m.div>
  );
};

const ShiftRejection = () => {
  const { subStep } = useSlideStep();
  return (
    <m.div
      initial={{ scale: 1, opacity: 0 }}
      animate={{ 
        opacity: subStep >= 2 ? 0.2 : 1,
        scale: subStep >= 2 ? 0.9 : 1,
        filter: subStep >= 2 ? 'blur(8px)' : 'blur(0px)',
      }}
      transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
      className="relative"
    >
      <div className="absolute -inset-8 bg-red-500/5 blur-3xl rounded-full opacity-50" />
      <div className="relative border border-white/5 bg-[#142433]/40 backdrop-blur-xl px-16 py-8 rounded-[40px] shadow-2xl">
        <span className="text-[32px] md:text-[48px] text-white/40 font-display line-through decoration-red-500/60 decoration-[8px] uppercase tracking-[0.4em] font-black italic">
          Don't launch "AI Courses"
        </span>
      </div>
    </m.div>
  );
};

const ShiftRevelation = () => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Structural HUD Lines */}
      <m.div 
        initial={{ width: 0 }}
        animate={{ width: '100vw' }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-screen h-px bg-gradient-to-r from-transparent via-[#A7DADB]/20 to-transparent pointer-events-none" 
      />
      
      <div className="relative z-10 py-12 px-20">
        {/* Glow Anchor */}
        <div className="absolute inset-0 bg-[#A7DADB]/5 blur-[120px] rounded-full" />
        
        <m.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[120px] md:text-[160px] font-display font-black text-white leading-[0.8] tracking-tighter text-center"
        >
          <span className="font-serif italic font-light text-[#A7DADB] block mb-10 text-[50px] md:text-[70px] tracking-normal">Architect a</span>
          <span className="text-white uppercase block drop-shadow-[0_0_50px_rgba(167,218,219,0.2)]">
            Cognitive <br />
            <span className="text-[#A7DADB]">Campus.</span>
          </span>
        </m.h1>
      </div>

      {/* Identity // Infrastructure Label */}
      <m.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-12 flex items-center gap-10"
      >
        <div className="h-px w-24 bg-[#A7DADB]/30" />
        <span className="font-mono text-sm tracking-[0.8em] uppercase text-[#A7DADB]/60 font-bold">Identity <span className="text-white/20 mx-4 font-light">|</span> Infrastructure</span>
        <div className="h-px w-24 bg-[#A7DADB]/30" />
      </m.div>
    </div>
  );
};

export interface Slide {
  id: number;
  tag: string;
  title: string;
  content: React.ReactNode;
  notes: string;
  bgImage?: string;
  overlayColor?: string;
  tagColor?: string;
  titleColor?: string;
  hideTitle?: boolean;
  fullBleed?: boolean;
}

export const slidesData: Slide[] = [
  {
    id: 1,
    tag: "The Vision",
    title: "Project: Institutional Intelligence",
    bgImage: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1200",
    overlayColor: "rgba(2, 12, 27, 0.2)",
    content: (
      <div className="relative h-full flex flex-col justify-center">
        <div className="relative z-20 space-y-12 max-w-5xl text-left">
          <m.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center gap-6"
          >
            <img src="/kjc-logo.png" alt="KJC" className="h-24 w-auto" />
            <div className="h-16 w-px bg-white" />
            <div className="flex flex-col">
              <span className="text-xl tracking-[0.4em] font-display uppercase font-bold text-[#A7DADB]">Strategic</span>
              <span className="text-xl tracking-[0.4em] font-display uppercase font-bold text-white">Partnership</span>
            </div>
          </m.div>
          <div className="space-y-4">
            <m.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8 }}
              className="text-[140px] font-display font-bold text-white leading-[0.9] tracking-tighter text-left"
            >
              The AI <br /><span className="italic font-serif text-[#A7DADB]">Transformation</span>
            </m.h1>
          </div>
          <m.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1.0 }}
            className="text-4xl text-[#b0c5c6] font-light max-w-none leading-relaxed text-left whitespace-nowrap"
          >
            Deploying a world-class cognitive ecosystem at Kristu Jayanti College.
          </m.p>
        </div>
      </div>
    ),
    notes: "[OPEN WITH SILENCE. Three full seconds. Make eye contact with the most senior person in the room. Then:] \"There's a moment — and every institution feels it — where the ground shifts. Where what made you great stops being enough. Where the playbook you've run for twenty years starts producing diminishing returns, and you feel it, but you haven't yet said it out loud.\" [Pause. Let them lean in.] \"That moment, for higher education in India, is happening right now. And it's not coming. It's already here.\" \"My name is [Your Name], and for the next twenty minutes, I want to show you what it looks like when Kristu Jayanti College doesn't just respond to this moment — but defines it.\" \"This is not a pitch about technology. This is a conversation about legacy. About whether, ten years from now, the story of Indian higher education was written with KJU's name at the top — or whether you were in the footnotes.\" \"We call it Project Institutional Intelligence. And today, we start the clock.\" *[Let the title slide breathe for a full beat before advancing.]"
  },
  {
    id: 2,
    tag: "The Core Premise",
    title: "The Success Metric",
    content: (
      <div className="grid grid-cols-2 gap-24 h-full items-center">
        <div className="space-y-12 relative z-20">
          <div className="bg-[#142433]/60 backdrop-blur-2xl p-16 rounded-[60px] border border-white/10 shadow-2xl">
            <div className="flex items-center gap-6 mb-12">
               <div className="p-6 bg-[#A7DADB]/10 rounded-3xl border border-[#A7DADB]/30">
                  <GraduationCap size={80} className="text-[#A7DADB]" />
               </div>
               <div className="h-20 w-px bg-white/20" />
               <h4 className="text-2xl font-display font-bold text-[#A7DADB] uppercase tracking-[0.4em]">Evaluation</h4>
            </div>
            <p className="text-[64px] font-display font-medium leading-[1.2] text-white">
              Graduates will be judged by how <span className="text-[#A7DADB] font-bold italic font-serif underline decoration-white decoration-[4.8px]">effectively</span> they work with AI.
            </p>
          </div>
        </div>
        <div className="relative h-full rounded-[80px] overflow-hidden border border-white/10 shadow-2xl group min-h-[500px]">
          <img 
            src="https://images.unsplash.com/photo-1543269664-76bc3997d9ea?auto=format&fit=crop&q=80&w=1200" 
            className="w-full h-full object-cover brightness-[0.9] contrast-110 group-hover:scale-110 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020C1B]/60 via-transparent to-transparent z-10" />
          <div className="absolute bottom-12 left-12 flex items-center gap-4 z-20">
             <div className="w-3 h-3 rounded-full bg-[#A7DADB] animate-pulse" />
             <span className="text-xl font-mono text-[#A7DADB] uppercase tracking-[0.4em]">Campus Insight</span>
          </div>
        </div>
      </div>
    ),
    notes: "\"Let me ask you something. When your most recent batch graduated — what did recruitment teams care about? Grades? Probably. Projects? Partially. But increasingly, here's what they're asking: can this person work with AI? Can they use it to move faster, think bigger, produce more?\" [Pause.] \"This is not a future prediction. This is a current reality. McKinsey, Infosys, Accenture, Deloitte — the top hiring floors have already changed their evaluation criteria. The degree gets a student in the room. But their ability to leverage intelligence — artificial and their own — is what gets them the offer.\" \"What does this mean for Kristu Jayanti? It means your placement rates, your alumni reputation, your admissions yield — all of it now depends on a single question: Are your graduates AI-effective?\" [Pause. Let the weight of that settle.] \"So that you can send every graduating batch into the market not just qualified, but competitive — we need to build that into the institution itself. Not as a module. As a mindset.\""
  },
  {
    id: 3,
    tag: "Market Reality",
    title: "The Innovation Gap",
    content: (
      <div className="grid grid-cols-3 gap-10 h-full items-center">
        {[
          { 
            icon: Brain, 
            label: "Students", 
            status: "Unguided Usage", 
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
            detail: "Students are already leveraging AI tools in the 'shadows', using them to complete assignments without institutional guidance or ethical frameworks."
          },
          { 
            icon: Users, 
            label: "Faculty", 
            status: "Limited Access", 
            img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
            detail: "Educators recognize the potential but lack subject-specific training and enterprise-grade tools to integrate AI meaningfully into their pedagogy."
          },
          { 
            icon: Building2, 
            label: "Institutions", 
            status: "Scaling Barrier", 
            img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
            detail: "Traditional institutional structures are moving slower than industry velocity, creating a strategic rift that risks brand stagnation."
          }
        ].map((item, i) => (
          <RevealCard key={i} step={i + 1}>
            <FlipCard 
              id={`flip-card-slide-3-${i}`}
              front={
                <div className="relative h-full w-full rounded-[60px] overflow-hidden border border-white/5 shadow-2xl">
                  <div className="absolute inset-0 z-0">
                    <img src={item.img} className="w-full h-full object-cover grayscale brightness-[0.4]" alt="" />
                    <div className="absolute inset-0 bg-[#020C1B]/40 backdrop-blur-[6px]" />
                  </div>
                  <div className="relative z-10 p-12 h-full flex flex-col justify-between text-left">
                    <div className="p-8 bg-[#A7DADB]/20 rounded-[40px] w-fit border border-[#A7DADB]/30">
                      <item.icon size={64} className="text-[#A7DADB]" />
                    </div>
                    <div className="space-y-6">
                      <h3 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">{item.label}</h3>
                      <p className="text-3xl text-[#A7DADB] font-serif italic">{item.status}</p>
                    </div>
                  </div>
                </div>
              }
              back={
                <div className="relative h-full w-full rounded-[60px] overflow-hidden border border-[#A7DADB]/30 bg-[#142433] shadow-2xl p-16 flex flex-col justify-center items-start text-left space-y-10">
                  <div className="absolute -right-32 -bottom-32 text-[#A7DADB] opacity-[0.03] pointer-events-none">
                    <item.icon size={500} />
                  </div>
                  <div className="space-y-4 relative z-10">
                    <h3 className="text-4xl font-display font-bold text-white uppercase tracking-widest text-left">The Truth</h3>
                    <p className="text-4xl text-[#b0c5c6] font-light leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                  <div className="pt-8 text-[#A7DADB] font-mono text-sm uppercase tracking-[0.4em] relative z-10 drop-shadow-[0_0_8px_rgba(167,218,219,0.5)]">
                    Click to return
                  </div>
                </div>
              }
            />
          </RevealCard>
        ))}
      </div>
    ),
    notes: "\"Here's the thing nobody wants to say out loud. AI is already on your campus. Right now. Today.\" \"Your students are using ChatGPT to draft assignments. Your faculty know it's happening. And your administration is trying to figure out whether to ban it, regulate it, or ignore it.\" [Beat.] \"That's the wrong conversation.\" \"Let me show you what's actually happening across these three groups — and why the current trajectory leads nowhere good.\" [On Students:] \"Students are the earliest adopters, and the most unsupported. They're using AI tools in the shadows — no framework, no ethics, no skill-building. Just copying outputs and hoping no one notices. What we're producing is a generation that knows of AI, but can't work with it. That's not a skill. That's a liability.\" [On Faculty:] \"Educators are caught in the middle. They see the potential. Many are curious. But they have no subject-specific training, no enterprise-grade tools, and no institutional permission to experiment. So they teach the way they always have — and the gap between what they know and what their students need keeps widening.\""
  },
  {
    id: 4,
    tag: "Strategic Gap",
    title: "Lead or Fall Behind",
    bgImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000",
    content: (
      <div className="h-full flex flex-col justify-center text-left">
        <div className="space-y-12 max-w-5xl">
          <p className="text-[52px] text-[#b0c5c6] font-body font-light leading-tight whitespace-nowrap">
            This disconnect creates a <span className="text-white font-normal italic font-serif">massive gap</span> in the ecosystem.
          </p>
          <div className="space-y-8">
            <h1 className="text-[120px] font-display font-bold text-white leading-none tracking-tighter flex flex-col gap-6 text-left">
              <span className="text-[#A7DADB] font-serif italic tracking-normal">Innovate...</span>
              <span>Or become history.</span>
            </h1>
            <div className="h-2 w-48 bg-[#A7DADB]" />
          </div>
        </div>
      </div>
    ),
    notes: "[On Institutions:] \"And at the top, the structural reality is this: institutional change cycles are measured in years. Industry cycles are measured in months. That gap — between how fast the world is moving and how fast institutions can adapt — is the threat. And it compounds every semester you wait.\" \"So that you can close this gap before it becomes a crisis — we need to address all three layers, simultaneously. That's exactly what Smartslate is built to do.\""
  },
  {
    id: 5,
    tag: "Problem Matrix",
    title: "Student Obsolescence",
    tagColor: "#ef4444",
    titleColor: "#FFFFFF",
    bgImage: "https://images.unsplash.com/photo-1507679799987-c7377f5da5b2?auto=format&fit=crop&q=80&w=1200",
    content: (
      <div className="grid grid-cols-2 gap-24 h-full items-center">
        <RevealCard step={1}>
          <div className="relative h-full flex flex-col justify-center text-left">
            <div className="bg-[#142433]/80 backdrop-blur-2xl p-16 rounded-[80px] border border-white/10 shadow-2xl relative overflow-hidden group text-left">
              <div className="absolute inset-0 z-0">
                 <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale brightness-[0.2] blur-[3px] group-hover:scale-110 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-br from-[#020C1B]/80 to-transparent" />
              </div>
              <div className="absolute -right-20 -top-20 text-[#A7DADB]/5 group-hover:text-[#A7DADB]/10 transition-colors duration-1000">
                 <TrendingUp size={400} />
              </div>
              <div className="relative z-10 space-y-12">
                 <div className="space-y-4">
                   <h4 className="text-2xl font-display font-bold text-[#A7DADB] uppercase tracking-[0.4em]">Placement Impact</h4>
                   <h3 className="text-[120px] font-display font-bold text-white leading-none tracking-tighter text-left uppercase">LOSS</h3>
                 </div>
                 <p className="text-4xl text-[#b0c5c6] font-light leading-relaxed">
                   Traditional graduates face <span className="text-white font-medium italic font-serif">zero differentiation</span> in competitive recruitment cycles.
                 </p>
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <m.div initial={{ width: "0%" }} whileInView={{ width: "20%" }} className="h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" transition={{ delay: 0.5, duration: 1.5 }} />
                 </div>
                 <p className="text-xl font-mono text-red-400 uppercase tracking-widest">Confidence Index: Critical Low</p>
              </div>
            </div>
          </div>
        </RevealCard>

        <div className="space-y-16 text-left">
          <div className="space-y-12">
            {[
              { icon: ShieldAlert, title: "Skill Mismatch", desc: "Theoretical learning disconnected from AI reality." },
              { icon: Zap, title: "Zero AI Exposure", desc: "Producing graduates unequipped for the modern toolset." },
              { icon: Target, title: "Brand Erosion", desc: "Decreased student marketability in high-stakes roles." }
            ].map((item, i) => (
              <RevealCard key={i} step={i + 2}>
                <div className="flex gap-10 items-start group text-left">
                  <div className="bg-red-600 p-6 rounded-3xl border border-red-500 flex items-center justify-center transition-transform group-hover:scale-105 shadow-xl text-white">
                    <item.icon size={40} />
                  </div>
                  <div className="space-y-3 pt-1">
                    <h4 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">{item.title}</h4>
                    <p className="text-2xl text-[#b0c5c6] font-light leading-relaxed max-w-2xl">{item.desc}</p>
                  </div>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </div>
    ),
    notes: "\"Let's get specific about the student problem. Because this isn't abstract. This is happening to your graduates right now.\" \"Traditional graduates — brilliant, hardworking, well-intentioned — are walking into interviews against candidates who can do in two hours what they can do in two days. Not because those candidates are smarter. Because they've been trained to use intelligence as a multiplier.\" [On Skill Mismatch:] \"The coursework is disconnected from the AI reality of the jobs they're entering. A commerce student learning accounting theory is entering a world where AI already does the routine audit. If they don't know how to supervise that AI — how to interpret its output, how to catch its errors, how to push it further — they are starting their career behind.\" [On Zero AI Exposure:] \"Exposure isn't optional anymore. It's a baseline competency. We are, right now, producing graduates who are qualified on paper and unequipped in practice. That's not a small problem. That's an existential one.\" [On Brand Erosion:] \"And here's what that costs KJU directly: placement metrics slip. Alumni return rates drop. Word spreads — slowly at first, then fast — that KJU graduates aren't making the jump into top-tier roles. Your brand loses altitude.\" \"So that you can reverse this — so that your students become the candidates that every leading firm wants, that every recruiter fights for — we need to equip them not just with degrees, but with applied AI capability. Starting now.\""
  },
  {
    id: 6,
    tag: "Problem Matrix",
    title: "Faculty Efficiency Drain",
    tagColor: "#f97316",
    titleColor: "#FFFFFF",
    bgImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200",
    content: (
      <div className="grid grid-cols-2 gap-24 h-full items-center">
        <div className="space-y-16 text-left">
          <div className="space-y-12">
            {[
              { icon: Layers, title: "Manual Preparation", desc: "Curriculum velocity stalled by legacy administrative debt." },
              { icon: Target, title: "Assessment Debt", desc: "Manual grading cycles draining high-value faculty time." },
              { icon: Compass, title: "Static Pedagogy", desc: "Traditional methods failing to bridge the applied AI gap." }
            ].map((item, i) => (
              <RevealCard key={i} step={i + 2}>
                <div className="flex gap-10 items-start group text-left">
                  <div className="bg-orange-600 p-6 rounded-3xl border border-orange-500 flex items-center justify-center transition-transform group-hover:scale-105 shadow-xl text-white">
                    <item.icon size={40} />
                  </div>
                  <div className="space-y-3 pt-1">
                    <h4 className="text-4xl font-display font-bold text-white uppercase tracking-tighter">{item.title}</h4>
                    <p className="text-2xl text-[#b0c5c6] font-light leading-relaxed max-w-2xl">{item.desc}</p>
                  </div>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
        <RevealCard step={1}>
          <div className="relative h-full flex flex-col justify-center text-left">
            <div className="bg-[#142433]/80 backdrop-blur-2xl p-16 rounded-[80px] border border-white/10 shadow-2xl relative overflow-hidden group text-left">
              <div className="absolute inset-0 z-0">
                 <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale brightness-[0.2] blur-[3px] group-hover:scale-110 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-br from-[#020C1B]/80 to-transparent" />
              </div>
              <div className="absolute -right-20 -top-20 text-orange-500/10 group-hover:text-orange-500/20 transition-colors duration-1000">
                 <Presentation size={400} />
              </div>
              <div className="relative z-10 space-y-12 text-left">
                 <div className="space-y-4 text-left">
                   <h4 className="text-2xl font-display font-bold text-orange-400 uppercase tracking-[0.4em]">Pedagogical Impact</h4>
                   <h3 className="text-[120px] font-display font-bold text-white leading-none tracking-tighter uppercase text-left">Barrier</h3>
                 </div>
                 <p className="text-4xl text-[#b0c5c6] font-light leading-relaxed">
                   Educators face a <span className="text-white font-medium italic font-serif text-left">structural ceiling</span> in productivity without AI enablement.
                 </p>
                 <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                   <m.div initial={{ width: "0%" }} whileInView={{ width: "85%" }} className="h-full bg-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]" transition={{ delay: 0.5, duration: 1.5 }} />
                 </div>
                 <p className="text-xl font-mono text-orange-400 uppercase tracking-widest">Effort Index: Dangerously High</p>
              </div>
            </div>
          </div>
        </RevealCard>
      </div>
    ),
    notes: "\"Now let's talk about your faculty. Because they are the engine of this institution, and right now, they're running on the wrong fuel.\" [On Manual Preparation:] \"Your best educators — the ones with fifteen, twenty years of subject mastery — are spending hours every week doing things that shouldn't require them. Building lesson plans from scratch. Researching examples they've researched before. Formatting rubrics. All of it manually. All of it taking time that should go to students.\" [On Assessment Debt:] \"Grading is the hidden tax on your faculty's time. Baseline assessments, short-answer evaluations, first-draft reviews — these are cognitive tasks that AI can handle with precision, freeing your educators to focus on the feedback that actually requires a human being: the nuanced, the complex, the deeply personal.\" \"Effort Index: Dangerously High. That's not a metaphor. That's where your faculty are operating right now. High effort, constrained output, growing frustration.\" [On Static Pedagogy:] \"And the pedagogy hasn't evolved. Not because your faculty don't want to evolve. But because no one has given them the tools, the training, or the institutional permission to do so.\" \"So that you can unlock the full potential of every educator on your campus — so that they stop burning time on process and start spending it on people — we need to give them AI as a professional amplifier. And we know exactly how to do that.\""
  },
  {
    id: 7,
    tag: "Problem Matrix",
    title: "The Brand Attrition",
    tagColor: "#ef4444",
    titleColor: "#FFFFFF",
    bgImage: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200",
    content: (
      <div className="grid grid-cols-2 gap-24 h-full items-center">
        <RevealCard step={1}>
          <div className="relative h-full flex flex-col justify-center text-left">
            <div className="bg-[#A7DADB]/40 backdrop-blur-2xl p-20 rounded-[100px] border border-white/10 shadow-2xl relative overflow-hidden group text-left">
              <div className="absolute inset-0 z-0">
                 <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale brightness-[0.25] blur-[3px] group-hover:scale-110 transition-transform duration-1000" />
                 <div className="absolute inset-0 bg-gradient-to-br from-[#020C1B]/80 to-transparent" />
              </div>
              <div className="absolute -right-48 -bottom-48 text-white/10 group-hover:rotate-12 transition-transform duration-1000">
                 <Target size={500} />
              </div>
              <div className="relative z-10 space-y-12">
                 <div className="space-y-4 text-left">
                   <h4 className="text-2xl font-display font-bold text-[#A7DADB] uppercase tracking-[0.4em]">Strategic Roadmap</h4>
                   <h3 className="text-[90px] font-display font-bold text-white leading-none tracking-tighter uppercase text-left">Pioneer</h3>
                 </div>
                 <p className="text-4xl text-white font-medium italic font-serif leading-relaxed text-left">
                   Kristu Jayanti has the choice to redefine the regional <span className="text-[#A7DADB] underline decoration-white decoration-8">standard.</span>
                 </p>
              </div>
            </div>
          </div>
        </RevealCard>
        <div className="space-y-16 text-left">
          <div className="space-y-12">
            {[
              { icon: ShieldAlert, title: "Legacy Drift", desc: "Institutional reputation lagging behind industry innovation velocity.", color: "text-red-500", bg: "bg-red-600" },
              { icon: Sparkles, title: "Market Leader", desc: "The opportunity to define the next era of Indian higher education.", color: "text-[#A7DADB]", bg: "bg-[#142433]" }
            ].map((item, i) => (
              <RevealCard key={i} step={i + 2}>
                <div className="flex gap-10 items-start group text-left">
                  <div className={`${item.bg} p-8 rounded-[40px] flex items-center justify-center transition-transform group-hover:scale-105 shadow-2xl border border-white/5`}>
                    <item.icon size={56} className="text-white" />
                  </div>
                  <div className="space-y-4 pt-4 text-left">
                    <h4 className={`text-6xl font-display font-bold text-white uppercase tracking-tighter`}>{item.title}</h4>
                    <p className="text-3xl text-[#b0c5c6] font-light leading-relaxed max-w-2xl text-left">{item.desc}</p>
                  </div>
                </div>
              </RevealCard>
            ))}
          </div>
        </div>
      </div>
    ),
    notes: "\"This slide is about KJU as a brand. Because ultimately, every problem we've discussed — student obsolescence, faculty drain — flows back here.\" [On Legacy Drift:] \"Institutional reputations are not built in a day. They're built over decades. But they can erode faster than they were built. All it takes is for a competitor — one college in your tier, in your city — to make the move you didn't. To tell a story you couldn't. To recruit the batch you lost.\" [Pause.] \"That's the threat. Not a catastrophic failure. A slow drift. A quiet loss of altitude that you don't notice until it matters.\" [On Pioneer — the other side of the story:] \"But Kristu Jayanti has something most institutions don't: the size, the reputation, and the institutional will to move decisively. You have the credibility that makes a bold move credible. You have the alumni network that amplifies a great story. You have the student intake that makes an AI transformation meaningful at scale.\" \"So that you can be the college that every prospective student in South India thinks of first when they think of a forward-looking, outcomes-driven education — the only thing you need is the decision to lead.\" \"That decision is what we're here to help you make.\""
  },
  {
    id: 8,
    tag: "The Shift",
    title: "A New Foundation",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    content: (
      <div className="relative w-full h-full flex flex-col items-center justify-center px-12 text-center">
        <div className="relative z-10 w-full flex flex-col items-center gap-12">
          
          <RevealCard step={1}>
            <ShiftRejection />
          </RevealCard>

          <RevealCard step={2}>
            <ShiftRevelation />
          </RevealCard>

        </div>
      </div>
    ),
    notes: "[This is the pivot. Shift your energy. Become energised.] \"So what's the answer? I'll tell you what the answer is not.\" \"It's not a 'Prompt Engineering 101' elective. It's not a weekend faculty workshop. It's not a new AI certificate your students can put on their LinkedIn.\" [Pause for effect.] \"Those are band-aids on a structural wound.\" \"The real question is not: 'How do we teach students about AI?' The real question is: 'How do we build an institution that runs on AI?'\" \"There is a profound difference between those two things. One is a feature. The other is an identity.\" \"We are not here to add AI to your curriculum. We are here to architect what we call a Cognitive Campus — an institution where intelligence is embedded in how the administration operates, how faculty teach, and how students learn. Where AI is not a subject. It's an infrastructure.\" \"So that you can tell every stakeholder — students, parents, recruiters, accreditation bodies, ranking committees — that Kristu Jayanti is not adapting to the AI era. Kristu Jayanti is the AI era.\""
  },
  {
    id: 9,
    tag: "The Solution",
    title: "The 3-Pillar Model",
    content: (
      <div className="grid grid-cols-3 gap-10 h-full items-center py-4">
        {[
          { 
            id: "01", 
            icon: Building2, 
            title: "AI-Enabled Campus", 
            sub: "Operations & Management", 
            image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800"
          },
          { 
            id: "02", 
            icon: Users, 
            title: "AI-Augmented Faculty", 
            sub: "Teaching & Efficiency", 
            image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800"
          },
          { 
            id: "03", 
            icon: GraduationCap, 
            title: "AI-First Students", 
            sub: "Learning & Outcomes", 
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800"
          }
        ].map((item, i) => (
          <RevealCard key={i} step={i + 1}>
            <div className="relative group h-[600px] rounded-[2.5rem] border-2 border-[#A7DADB]/30 bg-[#142433]/40 backdrop-blur-xl overflow-hidden transition-all duration-700 hover:border-[#A7DADB]/80 hover:shadow-[0_0_50px_-12px_rgba(167,218,219,0.2)]">
              <img 
                src={item.image} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 brightness-[0.3] group-hover:scale-110 group-hover:opacity-50 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020C1B] via-[#020C1B]/40 to-transparent z-10" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#A7DADB] rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
              <div className="relative z-20 h-full p-10 flex flex-col justify-between text-left">
                <div className="flex justify-between items-start">
                  <div className="p-4 rounded-2xl bg-[#A7DADB]/20 border border-[#A7DADB]/20 group-hover:bg-[#A7DADB] group-hover:border-[#A7DADB]/40 transition-all duration-500 transform group-hover:-translate-y-1">
                    <item.icon size={36} className="text-[#A7DADB] group-hover:text-[#020C1B]" />
                  </div>
                  <span className="text-6xl font-serif italic text-[#A7DADB]/20 group-hover:text-[#A7DADB]/40 transition-colors duration-700 drop-shadow-[0_0_15px_rgba(167,218,219,0.3)]">
                    {item.id}
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-4xl font-display font-bold text-white tracking-tight uppercase text-left">
                      {item.title}
                    </h3>
                    <div className="h-1 w-12 bg-[#A7DADB] group-hover:w-24 transition-all duration-700" />
                  </div>
                  <p className="text-xl font-body font-light text-[#b0c5c6] leading-relaxed max-w-[240px]">
                    {item.sub}
                  </p>
                </div>
              </div>
            </div>
          </RevealCard>
        ))}
      </div>
    ),
    notes: "\"We achieve this through three pillars. Not one. Not two. Three — because a transformation that only touches one part of the institution will eventually collapse under the weight of the parts that didn't change.\" [Pillar 01 — AI-Enabled Campus:] \"Your operations, your administrative layer, your management systems. We make them intelligent.\" [Pillar 02 — AI-Augmented Faculty:] \"We don't replace your educators. We give them superpowers. We make every educator a high-leverage version of who they already are.\" [Pillar 03 — AI-First Students:] \"We move your students from passive consumers of AI to active practitioners who can build with it, direct it, and deploy it.\" \"These three pillars work together. The campus pillar frees up resources and generates data. The faculty pillar converts that data into better teaching. The student pillar converts that teaching into outcomes. It's a flywheel — and once it spins, it accelerates.\" \"So that you can build an institution that self-reinforces — that gets smarter and more effective every semester — this is the architecture. Let's walk through each one.\""
  },
  {
    id: 10,
    tag: "Pillar 1",
    title: "AI-Enabled Campus",
    content: (
      <div className="grid grid-cols-12 gap-16 h-full items-center relative py-4 text-left">
        <div className="col-span-7 space-y-10 pr-8 text-left">
          <h2 className="text-[72px] text-white font-display font-bold leading-[1] tracking-tighter text-left">
            Optimizing the <br />
            <span className="text-[#A7DADB] font-serif italic font-normal text-[84px]">Institutional Footprint.</span>
          </h2>
          <div className="space-y-4 text-left">
            {[
              { icon: Zap, title: "24/7 Concierge", detail: "Automated student resolution." },
              { icon: Target, title: "Success Modeling", detail: "Real-time engagement risk." },
              { icon: Database, title: "Data Layer", detail: "Unified knowledge access." }
            ].map((item, i) => (
              <div key={i} className="flex gap-8 items-center p-8 bg-[#142433] rounded-[32px] border border-white/10 hover:border-[#A7DADB]/40 transition-all duration-500 group text-left">
                <div className="bg-[#A7DADB] p-6 rounded-[24px] group-hover:scale-105 transition-transform duration-500">
                  <item.icon size={40} className="text-white" strokeWidth={1.5} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-4xl font-bold text-white font-display tracking-tight uppercase leading-none text-left">{item.title}</h3>
                  <p className="text-2xl text-[#b0c5c6] font-body font-light text-left">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-5 h-[680px] relative group overflow-hidden rounded-[60px] border border-white/10 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80" 
            alt="Institutional Architecture"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-[3s] ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#020C1B] via-[#020C1B]/60 to-transparent" />
          <div className="absolute inset-0 bg-[#142433]/30 backdrop-blur-xl" />
          <RevealCard step={1}>
            <div className="relative h-full flex flex-col items-center justify-center p-12 text-center">
              <div className="mb-4 inline-block px-5 py-1.5 rounded-full border border-[#A7DADB]/30 bg-[#A7DADB]/10 text-[#A7DADB] font-display text-lg uppercase tracking-[0.3em]">
                Benchmark
              </div>
              <div className="text-[180px] font-display font-bold text-white leading-none tracking-tighter">
                70%
              </div>
              <p className="text-4xl text-[#A7DADB] font-bold uppercase tracking-[0.2em] mt-2 font-display">
                Efficiency Surge
              </p>
              <div className="mt-12 w-24 h-1.5 bg-[#A7DADB] rounded-full shadow-[0_0_15px_rgba(79,70,229,0.8)] mx-auto" />
            </div>
          </RevealCard>
        </div>
      </div>
    ),
    notes: "\"Pillar One starts where most people don't look: operations.\" \"Think about what your administrative staff handle every day. Student queries about deadlines, fee structures, hostel availability, academic schedules. Library access. Event registrations. Complaint routing. These are not complex problems. But they consume enormous amounts of human time.\" [On 24/7 Concierge:] \"We deploy an AI-powered concierge — available around the clock — that handles the high volume, low complexity interactions so your people can focus on the high complexity, high value ones. A student at 11pm anxious about their semester registration? Handled instantly. No wait. No frustration. No human required.\" [On Success Modeling:] \"But here's where it gets powerful. We don't just automate. We predict. Our success modeling layer analyses attendance patterns, assignment submission rates, engagement indicators — and flags at-risk students before they become dropout statistics. So that your counsellors can intervene early, when it still matters, and not after the damage is done.\" [On Data Layer:] \"And underneath it all, we build a unified institutional knowledge layer. One source of truth for everything from academic records to infrastructure utilisation. So that your leadership can make decisions based on data, not instinct.\" \"Seventy percent. That is the operational efficiency gain our institutional implementations consistently produce. So that your campus runs not just better — but fundamentally differently. Intelligently.\""
  },
  {
    id: 11,
    tag: "Pillar 2",
    title: "AI-Augmented Faculty",
    bgImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
    content: (
      <div className="flex flex-col h-full justify-center space-y-12 py-4 text-left">
        <m.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.6, y: 0 }}
          className="text-4xl text-[#A7DADB] font-display italic font-light text-left pl-2"
        >
          Turning every teacher into a high-leverage educator.
        </m.p>
        <div className="grid grid-cols-3 gap-8 h-full items-center">
          {[
            { 
              title: "AI Training", 
              detail: "Deep dive masterclasses into ChatGPT, Copilot, and specialized academic tools.", 
              icon: Brain,
              img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
            },
            { 
              title: "Pedagogy 2.0", 
              detail: "Advanced prompt engineering specifically tailored for university educators.", 
              icon: Compass,
              img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1200"
            },
            { 
              title: "Task Flow", 
              detail: "AI-assisted creation of lesson plans, complex rubrics, and grading.", 
              icon: Target,
              img: "https://images.unsplash.com/photo-1510074377623-8cf13fb86c08?auto=format&fit=crop&q=80&w=800"
            }
          ].map((item, i) => (
            <RevealCard key={i} step={i + 1}>
              <div className="relative group h-[600px] rounded-[2.5rem] border-2 border-[#A7DADB]/30 bg-[#142433]/60 backdrop-blur-xl overflow-hidden transition-all duration-700 shadow-2xl">
                <img src={item.img} className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 brightness-[0.3] blur-[8px]" />
                <div className="absolute inset-0 bg-[#020C1B]/40 backdrop-blur-md z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020C1B] via-transparent to-transparent z-20" />
                <div className="relative z-20 h-full p-10 flex flex-col gap-8 text-left">
                  <div className="flex items-center gap-6 p-6 rounded-3xl bg-[#A7DADB] border border-[#A7DADB]/40 shadow-lg text-left">
                    <item.icon size={44} className="text-[#020C1B]" />
                    <h3 className="text-4xl font-display font-bold text-[#020C1B] uppercase tracking-tighter leading-none text-left">{item.title}</h3>
                  </div>
                  <p className="text-2xl text-[#b0c5c6] font-body font-light leading-relaxed px-2 text-left">{item.detail}</p>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    ),
    notes: "\"Pillar Two is about your educators. And I want to be very direct about what we mean by AI-augmented.\" \"We are not here to automate your faculty. We are here to amplify them.\" [On AI Training:] \"We begin with deep-dive training — not generic AI literacy sessions, but subject-matter-specific masterclasses. A commerce faculty member learns to use AI for financial modelling simulations. A science department head learns to use it for research hypothesis generation. The training is tailored to their world, not a generic world someone else designed.\" [On Pedagogy 2.0:] \"Then we go deeper. We train educators in advanced prompt engineering designed specifically for academic contexts. How to use AI to design better assessments. How to generate varied examples, case studies, discussion prompts in minutes instead of hours. How to make a forty-minute lecture do the cognitive work of two hours. That's Pedagogy 2.0.\" [On Task Flow:] \"And then we build their workflow. Lesson plans, rubric creation, first-pass grading, student feedback drafts — we build AI into the task structure so that efficiency isn't something they have to think about. It's just how things work.\" \"So that you can give every educator on your campus the leverage to teach at the level they were always capable of — without the administrative weight that's been holding them back.\""
  },
  {
    id: 12,
    tag: "Pillar 2 Outcomes",
    title: "Efficiency & Impact",
    bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000",
    content: (
      <div className="grid grid-cols-12 gap-12 items-center h-full w-full text-left">
        <div className="col-span-7 space-y-12 text-left">
          <p className="text-4xl text-[#A7DADB] font-display italic font-light text-left leading-relaxed text-left">
            How we deliver <span className="text-white font-normal not-italic">Transformation</span>
          </p>
          <div className="space-y-6 pt-4 text-left">
            {[
              { icon: <Layers size={36} />, title: "Structured Workshops", desc: "From Beginner → Advanced technical proficiency" },
              { icon: <LibraryBig size={36} />, title: "Use-Case Playbooks", desc: "Subject-specific implementation guides" },
              { icon: <RefreshCw size={36} />, title: "AI Update Ecosystem", desc: "Continuous software and methodology evolution" }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-10 group transition-all duration-500 text-left">
                <div className="p-6 rounded-[32px] bg-[#A7DADB] text-white border border-[#A7DADB]/40 shadow-xl group-hover:scale-105 transition-all">
                  {item.icon}
                </div>
                <div className="space-y-1 text-left">
                  <h4 className="text-4xl font-display font-bold text-white tracking-tight uppercase leading-none text-left">{item.title}</h4>
                  <p className="text-2xl text-[#b0c5c6] font-body font-light leading-relaxed text-left">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-5 text-left">
          <div className="relative p-12 rounded-[80px] bg-[#142433]/80 border border-white/10 backdrop-blur-3xl overflow-hidden group shadow-2xl h-[700px] flex flex-col items-center justify-center text-left">
            <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-[#A7DADB]/15 blur-[120px] rounded-full group-hover:bg-[#A7DADB]/25 transition-all duration-1000" />
            <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-80 h-80 bg-[#A7DADB]/10 blur-[100px] rounded-full" />
            <div className="relative z-10 w-full flex flex-col items-center text-center">
              <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 flex items-center gap-3 text-center">
                <Gauge className="w-5 h-5 text-[#A7DADB]" />
                <span className="text-[#A7DADB] font-display text-sm uppercase tracking-[0.4em] opacity-70 text-center">Efficiency Quotient</span>
              </m.div>
              <div className="relative mb-16 text-center">
                <svg className="w-80 h-80 transform -rotate-90">
                  <circle cx="160" cy="160" r="145" stroke="currentColor" strokeWidth="1" fill="transparent" className="text-white/10" />
                  <circle cx="160" cy="160" r="130" stroke="currentColor" strokeWidth="20" fill="transparent" className="text-[#142433]" />
                  <m.circle cx="160" cy="160" r="130" stroke="#A7DADB" strokeWidth="20" strokeLinecap="round" fill="transparent" strokeDasharray={2 * Math.PI * 130} initial={{ strokeDashoffset: 2 * Math.PI * 130 }} whileInView={{ strokeDashoffset: (2 * Math.PI * 130) * (1 - 0.55) }} transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }} className="filter drop-shadow-[0_0_12px_rgba(167,218,219,0.3)]" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <m.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ delay: 1, duration: 0.8 }}>
                    <span className="text-7xl font-display font-bold text-white tracking-tighter text-center">40-60</span>
                    <span className="text-3xl font-display font-light text-[#A7DADB] ml-1 text-center">%</span>
                    <p className="text-[#b0c5c6] font-body text-sm uppercase tracking-widest mt-2 text-center text-center">Time Reclaimed</p>
                  </m.div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 w-full max-w-3xl px-4 text-center">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10"><Clock className="w-6 h-6 text-[#A7DADB]" /></div>
                  <div className="text-center"><p className="text-white font-display text-lg font-medium text-center text-center">Administrative</p><p className="text-[#b0c5c6] font-body text-xs uppercase tracking-tighter opacity-60 text-center text-center">Recovery Mode</p></div>
                </div>
                <div className="flex flex-col items-center text-center space-y-3 text-center">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10"><Target className="w-6 h-6 text-[#A7DADB]" /></div>
                  <div className="text-center"><p className="text-white font-display text-lg font-medium text-center text-center">Pedagogical</p><p className="text-[#b0c5c6] font-body text-xs uppercase tracking-tighter opacity-60 text-center text-center">Strategic Focus</p></div>
                </div>
              </div>
              <div className="mt-12 text-center text-center">
                <span className="text-white font-serif italic text-3xl opacity-90 text-center">Cognitive Surge</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    notes: "\"Let me show you what this actually produces.\" \"Forty to sixty percent of faculty preparation time — reclaimed. Not through shortcuts. Through intelligence.\" [On Structured Workshops:] \"The journey starts with structured workshops. We take educators from baseline AI literacy to advanced technical proficiency. Not in theory. In practice. Using their actual subject matter. Producing actual usable outputs from day one.\" [On Use-Case Playbooks:] \"Every department walks away with a subject-specific AI playbook. Not a generic guide. A document that says: 'Here is how a BCom professor uses AI to teach financial analysis. Here is the exact prompt structure. Here is the workflow.' Immediately actionable. No translation required.\" [On AI Update Ecosystem:] \"And because AI evolves faster than any static curriculum can track, we provide a continuous update ecosystem. Methodology updates, software changes, new tool integrations — your faculty never fall behind, because we don't let them.\" \"So that you can put forty to sixty percent of your educators' most valuable resource — their time — back into the hands of students, where it generates the most impact. That's the Cognitive Surge. And it compounds every semester.\""
  },
  {
    id: 13,
    tag: "Pillar 3",
    title: "AI-First Students",
    content: (
      <div className="grid grid-cols-2 gap-20 h-full items-center text-left">
        <RevealCard step={1}>
          <div className="space-y-16 text-left">
            {[
              { title: "Literacy", desc: "Mandatory baseline AI proficiency for all streams.", icon: Brain },
              { title: "Assignments", desc: "AI-augmented project-based learning models.", icon: Target },
              { title: "Enterprise Lab", desc: "Direct delivery in enterprise-grade sandboxes.", icon: Cpu }
            ].map((item, i) => (
              <div key={i} className="flex gap-10 items-start group text-left text-left">
                <div className="bg-[#A7DADB] p-6 rounded-3xl group-hover:bg-[#A7DADB] group-hover:text-white transition-all border border-white/5 shadow-xl text-[#020C1B]">
                  <item.icon size={48} />
                </div>
                <div className="space-y-4 text-left">
                  <h3 className="text-6xl font-display font-bold text-white tracking-tighter uppercase leading-none text-left">{item.title}</h3>
                  <p className="text-3xl text-[#b0c5c6] font-light leading-relaxed text-left text-left">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </RevealCard>
        <div className="relative h-full min-h-[700px] bg-[#142433]/60 backdrop-blur-2xl rounded-[100px] overflow-hidden border border-[#A7DADB]/20 shadow-2xl group flex flex-col justify-center items-center text-center p-20 text-left">
           <div className="absolute inset-0 z-0 text-left">
             <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale opacity-20" />
             <div className="absolute inset-0 bg-gradient-to-br from-[#020C1B]/90 via-[#020C1B]/40 to-transparent" />
           </div>
           <div className="relative z-10 space-y-12 text-center">
             <Rocket size={150} className="text-[#A7DADB] mx-auto" />
             <h2 className="text-[100px] font-display font-bold text-white leading-[0.85] tracking-tighter uppercase text-center">
                PRACTITIONER <br /><span className="italic font-serif text-[#A7DADB]">NOT</span> USER
             </h2>
             <p className="text-3xl text-[#b0c5c6] font-light italic px-12 text-center text-center">Equipping students with the intelligence to architect solutions.</p>
           </div>
        </div>
      </div>
    ),
    notes: "\"Pillar Three is where the transformation becomes visible to the world.\" [On Literacy:] \"We begin with mandatory AI literacy across all streams. Not optional. Not for the engineering students only. Every student — arts, commerce, science — builds a baseline proficiency. They learn what AI can and cannot do. They learn how to direct it. They learn how to verify it. This is the new foundational skill, and it belongs in every stream.\" [On Assignments:] \"Then we embed AI into the assignments they already have. We don't add new coursework. We upgrade existing coursework. A case study becomes an AI-augmented case study. A research project includes an AI-generated hypothesis that the student must validate or challenge. The learning doesn't change. The leverage does.\" [On Enterprise Lab:] \"And for students ready to go further, we build an enterprise lab. A sandboxed environment running the same AI tooling used in India's top companies. So that when your students walk into a Deloitte or a Wipro interview and they're asked about AI experience, your students don't have to imagine it. They've done it.\" \"Practitioner. Not user. Your competitors are producing users. We are going to help you produce practitioners. People who don't just consume AI outputs — but who architect the prompts, interpret the results, and build on top of them.\" \"So that you can send KJU graduates into the market as the candidates every firm fights to hire — not just the ones they consider.\""
  },
  {
    id: 14,
    tag: "Pillar 3 Outcomes",
    title: "Subject Mastery",
    bgImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=2000",
    overlayColor: "rgba(2, 12, 27, 0.75)",
    content: (
      <div className="relative h-full w-full flex flex-col justify-center py-10 text-left">
        {/* Background Atmosphere Layer */}
        <div className="absolute inset-0 backdrop-blur-[6px] z-0 pointer-events-none" />
        
        {/* Elite Technical Background Grid */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-10" style={{ backgroundImage: 'radial-gradient(#A7DADB 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
        
        <div className="grid grid-cols-3 gap-12 relative z-30">
          {[
            { 
              icon: Palette, 
              stream: "Arts", 
              impact: "Generative Expression", 
              detail: "AI as a creative catalyst for digital humanities, media synthesis, and the evolution of human-centric storytelling."
            },
            { 
              icon: PieChart, 
              stream: "Commerce", 
              impact: "Predictive Intelligence", 
              detail: "Algorithmic financial auditing, real-time market forecasting, and AI-driven consumer behavioral modeling."
            },
            { 
              icon: Binary, 
              stream: "Science", 
              impact: "Algorithmic Insight", 
              detail: "Accelerating research through automated hypothesis generation, complex simulations, and neural pattern recognition."
            }
          ].map((item, i) => (
            <RevealCard key={i} step={i + 1}>
              <div className="relative group h-[720px] text-left">
                {/* Frosted Crystal Base with Subtle Internal Blur */}
                <div className="absolute inset-0 bg-[#142433]/50 backdrop-blur-3xl rounded-[60px] border border-white/10 shadow-2xl transition-all duration-700 group-hover:bg-[#142433]/70 group-hover:border-[#A7DADB]/30" />
                
                {/* Secondary Technical Layer */}
                <div className="absolute inset-4 border border-white/5 rounded-[45px] pointer-events-none overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" style={{ backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(167, 218, 219, .5) 25%, rgba(167, 218, 219, .5) 26%, transparent 27%, transparent 74%, rgba(167, 218, 219, .5) 75%, rgba(167, 218, 219, .5) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(167, 218, 219, .5) 25%, rgba(167, 218, 219, .5) 26%, transparent 27%, transparent 74%, rgba(167, 218, 219, .5) 75%, rgba(167, 218, 219, .5) 76%, transparent 77%, transparent)', backgroundSize: '50px 50px' }} />
                </div>

                <div className="relative h-full p-16 flex flex-col justify-between text-left">
                  {/* Header Node */}
                  <div className="space-y-10 w-full text-center">
                    <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
                      <div className="absolute inset-0 bg-[#A7DADB]/20 blur-3xl rounded-full scale-150 animate-pulse" />
                      <div className="relative z-10 p-8 bg-[#020C1B] rounded-[35px] border border-white/10 shadow-2xl group-hover:scale-110 transition-transform duration-700">
                        <item.icon size={60} className="text-[#A7DADB]" />
                      </div>
                    </div>

                    <div className="space-y-3 text-center">
                      <h3 className="text-3xl font-display font-bold text-white uppercase tracking-[0.4em] text-center">{item.stream}</h3>
                    </div>
                  </div>

                  {/* Impact Statement (Subtitle) - Fixed to one line */}
                  <div className="space-y-8 text-left">
                    <h4 className="text-3xl font-serif italic text-[#A7DADB] leading-tight tracking-tight text-left uppercase opacity-90 whitespace-nowrap">
                      {item.impact}
                    </h4>
                    <p className="text-4xl text-[#b0c5c6] font-body font-light leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity duration-700 text-left">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>
      </div>
    ),
    notes: "\"Let me be specific about what this looks like by stream, because I want every faculty head in this room to see themselves in this.\" [On Arts — Generative Expression:] \"For your Arts and Humanities students, AI becomes a creative catalyst. Imagine a journalism student who synthesises data from five hundred news sources in the time it used to take them to read fifty. Imagine a design student who uses generative AI to prototype visual concepts, then applies their own critical eye to elevate them. We are not replacing creativity. We are dramatically expanding its surface area.\" [On Commerce — Predictive Intelligence:] \"For your Commerce students, this is the most direct employability play available. Algorithmic financial auditing, real-time market forecasting, consumer behaviour modelling — these are live tools in every finance and consulting firm right now. Your Commerce graduates who can use these tools don't need to learn on the job. They arrive ready to contribute from week one.\" [On Science — Algorithmic Insight:] \"For your Science students, the research acceleration is extraordinary. Automated hypothesis generation. Complex simulation environments. Pattern recognition at scale. A final-year physics or biotech student who has worked with AI research tools is not just a better candidate — they are a more capable scientist. Full stop.\" \"So that you can claim, with evidence, that a KJU degree now means subject mastery and AI fluency — a combination no other institution in your tier can currently offer.\""
  },
  {
    id: 15,
    tag: "The Differentiator",
    title: "Us vs. The Status Quo",
    content: (
      <div className="h-full flex flex-col justify-center relative px-12 py-8 text-left">
        {/* Atmospheric Light Leaks */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#A7DADB]/10 blur-[120px] rounded-full text-left" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#A7DADB]/10 blur-[120px] rounded-full text-left text-left" />

        <div className="relative grid grid-cols-2 gap-20 w-full h-full items-center text-left text-left text-left">
          
          {/* Central Divider Pulse */}
          <div className="absolute left-1/2 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-[#A7DADB]/20 to-transparent z-10 text-left text-left">
            <m.div 
              animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute w-[3px] h-20 -left-[1px] bg-[#A7DADB] shadow-[0_0_15px_#A7DADB] text-left text-left"
            />
          </div>

          {/* Left Side: Status Quo */}
          <div className="space-y-16 text-left">
            <div className="space-y-4 text-left">
              <h3 className="font-display text-5xl uppercase tracking-[0.4em] text-[#b0c5c6]/40 text-left text-left">Status Quo</h3>
              <p className="font-serif italic text-3xl text-[#b0c5c6]/30 text-left text-left">The Legacy Approach</p>
            </div>

            <div className="space-y-12 text-left text-left">
              {[
                { icon: <Clock size={40} />, label: "One-time weekend workshop" },
                { icon: <Wrench size={40} />, label: "Generic AI tools training" },
                { icon: <BookOpen size={40} />, label: "Theoretical learning" },
                { icon: <EyeOff size={40} />, label: "No tracking or analytics" },
              ].map((item, idx) => (
                <m.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 0.4, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={idx} 
                  className="flex items-center gap-10 text-[#b0c5c6] grayscale text-left"
                >
                  <div className="p-5 rounded-2xl border border-white/5 bg-white/5 text-left text-left">
                    {item.icon}
                  </div>
                  <span className="text-4xl font-light font-body text-left leading-tight text-left">{item.label}</span>
                </m.div>
              ))}
            </div>
          </div>

          {/* Right Side: Smartslate Future */}
          <div className="space-y-16 relative text-left pl-12 text-left text-left">
            <div className="space-y-4 text-left">
              <h3 className="font-display text-5xl uppercase tracking-[0.4em] text-[#A7DADB] font-bold text-left text-left text-left">The Pivot</h3>
              <p className="font-serif italic text-3xl text-white/60 text-left text-left text-left">Our Approach @ Kristu Jayanti</p>
            </div>

            <div className="space-y-12 text-left">
              {[
                { icon: <Repeat size={40} />, label: "Continuous learning ecosystem", highlight: "Enduring Impact" },
                { icon: <Fingerprint size={40} />, label: "Role & subject-based implementation", highlight: "Custom Tailored" },
                { icon: <FlaskConical size={40} />, label: "Applied & embedded AI labs", highlight: "Directly Integrated" },
                { icon: <BarChart3 size={40} />, label: "Measurable, data-backed outcomes", highlight: "Guaranteed ROI" },
              ].map((item, idx) => (
                <m.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1), type: "spring", stiffness: 100 }}
                  key={idx} 
                  className="group flex items-center gap-10 text-left"
                >
                  <div className="p-5 rounded-2xl border border-[#A7DADB]/30 bg-[#A7DADB]/20 text-[#A7DADB] shadow-[0_0_15px_rgba(167,218,219,0.1)] group-hover:shadow-[0_0_25px_rgba(167,218,219,0.2)] transition-all text-left">
                    {item.icon}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-4xl font-medium text-white font-body text-left leading-tight text-left">{item.label}</span>
                    <span className="text-xl font-display uppercase tracking-widest text-[#A7DADB]/60 text-left mt-1 text-left">{item.highlight}</span>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    notes: "\"Now I want to be direct, because you'll be comparing us to other options. And you should. So let me make the comparison easy.\" [On Status Quo — speak plainly, not arrogantly:] \"You will get calls from vendors offering one-time workshops. A Saturday and Sunday, a certificate, a photo op, and a bill. Generic AI tools training that has nothing to do with how a KJU faculty member actually teaches, or how a KJU student actually learns. No follow-up. No measurement. No accountability for outcomes.\" \"That's the legacy approach. It makes for a good press release. It produces almost nothing else.\" [On Smartslate — speak with conviction:] \"Here is what we offer instead. A continuous learning ecosystem — not a one-time event, but a living programme that evolves as AI evolves. Role and subject-based implementation — because a Chemistry professor and a History professor need completely different toolkits. Applied and embedded AI labs — not theoretical exposure, but live, hands-on practice with enterprise-grade tools. And measurable, data-backed outcomes — because we don't ask you to trust us. We show you the numbers.\" \"Enduring Impact. Custom Tailored. Directly Integrated. Guaranteed ROI.\" \"So that you can make a decision today with full confidence that what you're investing in will produce a return you can see, measure, and report — not just feel good about.\""
  },
  {
    id: 16,
    tag: "The Roadmap",
    title: "Execution Phase: [Initialization]",
    bgImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000",
    overlayColor: "rgba(2, 12, 27, 0.96)",
    content: (
      <div className="relative h-full w-full flex flex-col justify-center overflow-hidden">
        {/* HUD Aesthetic Micro-Details */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-12 left-12 border-l border-t border-white/20 w-32 h-32" />
          <div className="absolute bottom-12 right-12 border-r border-b border-white/20 w-32 h-32" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[80%] bg-gradient-to-b from-transparent via-[#A7DADB]/30 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col gap-0 w-full">
          {/* NODE 01: DISCOVERY */}
          <m.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-12 group self-start max-w-4xl"
          >
            <div className="relative shrink-0 text-left">
              <span className="font-display text-[120px] text-[#A7DADB]/30 block select-none leading-none font-bold">01</span>
            </div>
            <div className="pt-0 space-y-3 flex-grow text-left">
              <div className="flex items-center gap-6">
                <span className="font-mono text-xl text-[#A7DADB] font-bold tracking-[0.5em] uppercase">Phase 1 // Weeks 1-3</span>
                <div className="h-px flex-grow bg-white/10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-7xl font-bold text-white tracking-tighter">Deep Discovery</h3>
                <p className="font-serif italic text-[#A7DADB] text-3xl">Mapping Institutional DNA</p>
              </div>
              <p className="font-body font-light text-[#b0c5c6] text-4xl leading-tight max-w-3xl border-l-2 border-[#A7DADB]/40 pl-8 text-left">
                Full-spectrum infrastructure audit and subject-matter frontier identification across core streams.
              </p>
            </div>
          </m.div>

          {/* NODE 02: VANGUARD */}
          <m.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row-reverse items-start gap-12 group self-end text-right max-w-4xl"
          >
            <div className="relative shrink-0 text-right">
              <span className="font-display text-[120px] text-[#A7DADB]/30 block select-none leading-none font-bold">02</span>
            </div>
            <div className="pt-0 space-y-3 flex-grow flex flex-col items-end text-right">
              <div className="flex items-center gap-4 flex-row-reverse w-full">
                <span className="font-mono text-xl text-[#A7DADB] font-bold tracking-[0.5em] uppercase">Phase 2 // Weeks 4-11</span>
                <div className="h-px flex-grow bg-white/10" />
              </div>
              <div className="space-y-2">
                <h3 className="font-display text-7xl font-bold text-white tracking-tighter">The Vanguard</h3>
                <p className="font-serif italic text-[#A7DADB] text-3xl">Proof-of-Value Launch</p>
              </div>
              <p className="font-body font-light text-[#b0c5c6] text-4xl leading-tight max-w-3xl border-r-2 border-[#A7DADB]/40 pr-8 text-right">
                Deployment in 3 lead departments to establish ROI metrics and core adoption baselines.
              </p>
            </div>
          </m.div>
        </div>
      </div>
    ),
    notes: "\"Let's talk execution. Because a great vision without a credible plan is just a great presentation.\" [Phase 1 — Deep Discovery, Weeks 1-3:] \"This is not us walking in with pre-built answers. This is us mapping the unique DNA of Kristu Jayanti — your departmental structures, your faculty profiles, your existing technology infrastructure, your student population, your academic calendar. We identify the subject-matter frontiers: where is the highest impact AI use in each stream? Where are the quick wins? Where are the long-game plays?\" \"We do not build a generic implementation. We build your implementation.\" [Phase 2 — The Vanguard, Weeks 4-11:] \"We don't go institution-wide on day one. We go deep in three lead departments. We establish proof. We measure adoption. We track time savings, student engagement changes, faculty confidence levels. We build the ROI baseline that justifies the full scale.\" \"This is how you eliminate institutional risk. Not by moving slowly — but by moving precisely.\" \"So that you can walk into the full institutional roll-out with evidence already in hand — data that proves this works, inside your own walls, with your own people.\""
  },
  {
    id: 17,
    tag: "The Roadmap",
    title: "Execution Phase: [Dominance]",
    bgImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000",
    overlayColor: "rgba(2, 12, 27, 0.95)",
    content: (
      <div className="relative h-full w-full flex flex-col justify-center overflow-hidden">
        {/* HUD Aesthetic Micro-Details */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[80%] bg-gradient-to-b from-transparent via-[#A7DADB]/30 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col gap-0 w-full">
          {/* NODE 03: FULL SCALE */}
          <m.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start gap-12 group self-start max-w-4xl"
          >
            <div className="relative shrink-0 text-left">
              <span className="font-display text-[120px] text-[#A7DADB]/20 block select-none leading-none font-bold">03</span>
            </div>
            <div className="pt-0 space-y-3 flex-grow text-left">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xl text-[#A7DADB] font-bold tracking-[0.4em] uppercase">Phase 3 // Months 3-6</span>
                <div className="h-px flex-grow bg-white/10" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-7xl font-bold text-white tracking-tighter">Full Scale</h3>
                <p className="font-serif italic text-[#A7DADB] text-3xl">Institutional Integration</p>
              </div>
              <p className="font-body font-light text-[#b0c5c6] text-4xl leading-tight max-w-3xl border-l-2 border-[#A7DADB]/40 pl-8 text-left">
                Seamless expansion of successful AI frameworks across all institutional departments and administrative student services.
              </p>
            </div>
          </m.div>

          {/* NODE 04: MARKET LEADER */}
          <m.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-row-reverse items-start gap-12 group self-end text-right max-w-4xl"
          >
            <div className="relative shrink-0 text-right">
              <span className="font-display text-[120px] text-[#A7DADB]/20 block select-none leading-none font-bold">04</span>
            </div>
            <div className="pt-0 space-y-3 flex-grow flex flex-col items-end text-right">
              <div className="flex items-center gap-4 flex-row-reverse w-full">
                <span className="font-mono text-xl text-[#A7DADB] font-bold tracking-[0.4em] uppercase">Phase 4 // Continuous</span>
                <div className="h-px flex-grow bg-white/10" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-7xl font-bold text-white tracking-tighter">Market Leader</h3>
                <p className="font-serif italic text-[#A7DADB] text-3xl">Defining the Standard</p>
              </div>
              <p className="font-body font-light text-[#b0c5c6] text-4xl leading-tight max-w-3xl border-r-2 border-[#A7DADB]/40 pr-8 text-right">
                Solidifying Kristu Jayanti as the definitive AI-native institution, leading the era of Indian higher education prestige.
              </p>
            </div>
          </m.div>
        </div>

      </div>
    ),
    notes: "[Phase 3 — Full Scale, Months 3-6:] \"We take everything that worked in the Vanguard departments and we scale it across the institution. Every department. Every function. Administrative services, academic delivery, student support — all of it running on the same intelligent framework. The campus doesn't just have AI. The campus is AI-enabled.\" [Phase 4 — Market Leader, Continuous:] \"Phase Four is continuous. It doesn't end. Because the AI landscape doesn't end.\" \"But here's what Phase Four really represents: it's the point where the transformation becomes part of the institutional identity. Where Kristu Jayanti is not described as 'one of the colleges using AI.' Where KJU is described as the AI-native institution in South Indian higher education.\" \"Where rankings committees, accreditation bodies, and national media are pointing to you as the benchmark.\" \"So that you can stop reacting to what the education sector is doing and start being what the education sector aspires to — the market leader, the standard-setter, the institution that defined the era.\""
  },
  {
    id: 18,
    tag: "The Case",
    title: "The ROI Story",
    content: (
      <div className="grid grid-cols-2 gap-10 h-full py-4 text-left">
        {/* TANGIBLE ROI - DATA & GROWTH AESTHETIC */}
        <RevealCard step={1}>
          <div className="relative group overflow-hidden rounded-[70px] border border-white/10 bg-[#142433]/60 backdrop-blur-3xl shadow-2xl text-left h-full">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale brightness-[0.4] group-hover:scale-110 transition-transform duration-[5s] text-left"
              alt="Growth Metrics"
            />
          <div className="absolute inset-0 bg-gradient-to-br from-[#A7DADB]/20 via-transparent to-transparent z-10 text-left" />
          
          <div className="relative z-20 p-16 h-full flex flex-col justify-between text-left">
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-6 text-left">
                <div className="h-px w-20 bg-[#A7DADB] shadow-[0_0_15px_#A7DADB] text-left" />
                <h3 className="text-7xl font-display font-bold text-white uppercase tracking-tighter text-left">Tangible</h3>
              </div>
              <p className="text-lg text-[#A7DADB] font-serif italic opacity-80 text-left">Direct Fiscal & Operational Impact</p>
            </div>

            <div className="space-y-12 text-left">
              {[ 
                { icon: TrendingUp, text: "Admission Growth", sub: "Quantifiable yield increases" }, 
                { icon: Briefcase, text: "Placement Premium", sub: "Higher tier recruitment" }, 
                { icon: Zap, text: "Admin Velocity", sub: "Operational overhead reduction" } 
              ].map((item, i) => (
                <m.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.15) }}
                  className="flex gap-10 items-center group/item text-left"
                >
                  <div className="p-6 bg-[#A7DADB]/10 rounded-3xl border border-[#A7DADB]/30 text-[#A7DADB] group-hover/item:bg-[#A7DADB] group-hover/item:text-[#020C1B] transition-all duration-500 shadow-xl text-left">
                    <item.icon size={44} />
                  </div>
                  <div className="space-y-1 text-left">
                    <span className="text-lg text-white font-display font-bold uppercase tracking-tight block group-hover/item:translate-x-2 transition-transform duration-500 text-left">{item.text}</span>
                    <span className="text-sm text-[#b0c5c6] font-body font-light block opacity-70 text-left">{item.sub}</span>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
        </RevealCard>

        {/* INTANGIBLE ROI - LEGACY & PRESTIGE AESTHETIC */}
        <RevealCard step={2}>
          <div className="relative group overflow-hidden rounded-[70px] border border-white/10 bg-[#142433]/60 backdrop-blur-3xl shadow-2xl text-left h-full">
            <img 
              src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 grayscale brightness-[0.4] group-hover:scale-110 transition-transform duration-[5s] text-left"
              alt="Institutional Prestige"
            />
          <div className="absolute inset-0 bg-gradient-to-bl from-[#A7DADB]/20 via-transparent to-transparent z-10 text-left" />

          <div className="relative z-20 p-16 h-full flex flex-col justify-between text-left">
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-6 text-left">
                <div className="h-px w-20 bg-[#A7DADB] shadow-[0_0_15px_#A7DADB] text-left" />
                <h3 className="text-7xl font-display font-bold text-white uppercase tracking-tighter text-left">Intangible</h3>
              </div>
              <p className="text-lg text-[#A7DADB] font-serif italic opacity-80 text-left">Strategic Positioning & Legacy</p>
            </div>

            <div className="space-y-12 text-left">
              {[ 
                { icon: Shield, text: "Market Leadership", sub: "Defining regional excellence" }, 
                { icon: Globe, text: "Academic Legacy", sub: "Future-proof institutional brand" }, 
                { icon: Sparkles, text: "Digital Frontier", sub: "Technological prestige" } 
              ].map((item, i) => (
                <m.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + (i * 0.15) }}
                  className="flex gap-10 items-center group/item text-left"
                >
                  <div className="p-6 bg-[#A7DADB]/10 rounded-3xl border border-[#A7DADB]/30 text-[#A7DADB] group-hover/item:bg-[#A7DADB] group-hover/item:text-[#020C1B] transition-all duration-500 shadow-xl text-left">
                    <item.icon size={44} />
                  </div>
                  <div className="space-y-1 text-left">
                    <span className="text-lg text-white font-display font-bold uppercase tracking-tight block group-hover/item:translate-x-2 transition-transform duration-500 text-left">{item.text}</span>
                    <span className="text-sm text-[#b0c5c6] font-body font-light block opacity-70 text-left">{item.sub}</span>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
        </RevealCard>
      </div>
    ),
    notes: "\"Let's talk about return on investment. Because this is not a CSR initiative. This is not a vanity project. This is a strategic capital deployment — and it pays back on two levels.\" [Tangible ROI:] \"Admission Growth: when your application materials, your campus tours, your social presence, and your alumni stories all carry the message 'KJU is AI-first,' you attract a different quality of applicant. And a larger volume. Because ambitious students go where the future is. So that you can grow your incoming class size and the quality ceiling of your applicant pool simultaneously.\" \"Placement Premium: when your students walk into recruitment interviews with documented AI competency — not theoretical, but applied — the offers change. The firms change. The salary brackets change. Your placement report for the next academic cycle becomes your strongest admissions marketing tool. So that every outcome your students achieve becomes a story that sells the next batch.\" \"Administrative Velocity: operational efficiency gains from Pillar One reduce overhead costs. Fewer manual processes. Faster resolution times. Higher staff satisfaction. This is real money, redirected to real priorities. So that you do more with what you already have.\" [Intangible ROI — speak slowly; these resonate deepest:] \"Market Leadership: in your tier, in your region, there is a positioning available right now that has no price tag — being first. So that your brand carries the weight of a pioneer, not a follower.\" \"Academic Legacy: fifteen years from now, the alumni of this institution will be in positions of influence. When they tell their story — when they say where they learned to think with AI — that story will either include KJU, or it won't. This decision determines which. So that your legacy is written by your choices, not by what you failed to choose.\" \"So that you can invest in something that pays both this quarter and for the next twenty-five years — because the Tangible and the Intangible compound together, and the compounding starts on the day you say yes.\""
  },
  {
    id: 19,
    tag: "Decision",
    title: "Lead or Adapt.",
    content: (
      <div className="relative w-full h-full bg-[#020C1B] overflow-hidden flex items-center justify-center p-20 text-left">
        <div className="grid grid-cols-2 gap-16 w-full max-w-[1400px] h-[560px] relative z-10 text-left">
          
          {/* LEAD PANE (Left - The Winner) */}
          <RevealCard step={1}>
            <div
              className="relative group flex flex-col justify-between p-6 overflow-hidden bg-[#142433]/40 backdrop-blur-2xl border-2 border-[#A7DADB] shadow-[0_0_50px_rgba(167,218,219,0.2)] rounded-[40px] text-left h-[560px]"
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0 text-left">
                <div className="absolute inset-0 bg-gradient-to-b from-[#020C1B] via-transparent to-[#020C1B] z-10 text-left" />
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" 
                  className="w-full h-full object-cover opacity-40 mix-blend-luminosity text-left"
                  alt="AI Laboratory"
                />
              </div>

              {/* HUD Accents */}
              <div className="relative z-10 flex justify-between items-start font-mono text-[10px] tracking-[0.3em] text-[#A7DADB] text-left">
                <div className="flex gap-4 items-center text-left">
                  <Target className="w-4 h-4" />
                  <span>STRATEGIC_DOMINANCE_INITIATED</span>
                </div>
                <div className="text-right">
                  <div>[ COORDINATES: 12.97 / 77.59 ]</div>
                  <div>SEC_ALPHA // PROTOCOL_01</div>
                </div>
              </div>

              <div className="relative z-10 text-left">
                <span 
                  className="font-body italic text-[#A7DADB]/80 text-5xl mb-4 block text-left"
                >
                  One Led.
                </span>
                <h2 className="text-7xl font-display font-bold text-white leading-none tracking-tighter uppercase text-left">
                  Became <br />
                  <span className="text-[#A7DADB]">AI-First.</span>
                </h2>
              </div>

              <div className="relative z-10 flex justify-between items-end text-left">
                <div className="flex gap-2 text-left">
                  {[1, 2, 3, 4].map(i => (
                    <m.div 
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                      className="w-1 h-8 bg-[#A7DADB]/30"
                    />
                  ))}
                </div>
                <div className="font-mono text-[10px] text-[#A7DADB]/50 text-right">
                  <p>INSTITUTIONAL_CORE_UPGRADE: 100%</p>
                  <p>ECOSYSTEM_STATUS: EVOLVED</p>
                </div>
              </div>
            </div>
          </RevealCard>

          {/* ADAPT PANE (Right - The Lagger) */}
          <RevealCard step={2}>
            <div
              className="relative flex flex-col justify-between p-6 overflow-hidden bg-black/40 backdrop-blur-xl border border-white/20 rounded-[40px] grayscale text-left h-[560px]"
            >
              {/* Background Image Layer */}
              <div className="absolute inset-0 z-0 text-left">
                <div className="absolute inset-0 bg-black/60 z-10 text-left" />
                <img 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000" 
                  className="w-full h-full object-cover opacity-50 mix-blend-luminosity text-left"
                  alt="Traditional Classroom"
                />
              </div>

              {/* HUD Accents */}
              <div className="relative z-10 flex justify-between items-start font-mono text-[10px] tracking-[0.3em] text-white text-left">
                <div className="flex gap-4 items-center text-left">
                  <Activity className="w-4 h-4" />
                  <span>LEGACY_MAINTENANCE_MODE</span>
                </div>
                <div className="text-right">
                  <div>[ SYSTEM_LOAD: STATIC ]</div>
                  <div>SEC_BETA // TRADITION_V3</div>
                </div>
              </div>

              <div className="relative z-10 text-left">
                <span className="font-body italic text-white text-5xl mb-4 block text-left">
                  One Adapted.
                </span>
                <h2 className="text-7xl font-display font-medium text-white leading-none tracking-tighter uppercase text-left">
                  Added AI <br />
                  <span>Courses.</span>
                </h2>
              </div>

              <div className="relative z-10 flex justify-between items-end text-left">
                <div className="flex gap-1 text-left">
                  <div className="w-12 h-1 bg-white" />
                  <div className="w-4 h-1 bg-white" />
                </div>
              </div>
            </div>
          </RevealCard>

        </div>

        {/* Global Technical Underlay */}
        <div className="absolute inset-0 pointer-events-none text-left">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent text-left" />
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent text-left" />
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/5 -translate-x-1/2 text-left" />
        </div>
      </div>
    ),
    notes: "[This is the penultimate slide. Speak with quiet certainty. No rush.] \"Three years from now, when we look back at this moment in Indian higher education, we will see two types of institutions.\" [On the AI-First institution — speak with warmth and aspiration:] \"One type made a decision. They didn't wait for the sector to validate it. They didn't form a committee to study it for a year. They looked at the evidence, they understood the window, and they moved. They became AI-first — not because they were told to, but because they saw the future clearly and chose to build it. Their graduates are hired faster, at higher levels, by better firms. Their faculty are energised, not exhausted. Their campus runs on intelligence. And they're known for it.\" [On the adaptive institution — speak without judgment, but with finality:] \"The other type adapted. They added courses. They responded. They caught up — eventually — to where the leaders already were. They're not failures. They're followers. And there's nothing wrong with being a follower — unless you had the opportunity to lead.\" [Direct pause.] \"KJU has the opportunity to lead.\" \"You have the reputation. You have the student body. You have the faculty depth. You have the institutional will — I've seen it in this room. What you haven't had until today is the right partner with the right playbook to make it real.\" \"So that you can be the institution your students brag about, that recruiters benchmark against, that the education press writes about — the question isn't whether to do this. The question is whether you do it now, while the first-mover advantage is still yours to claim.\""
  },
  {
    id: 20,
    tag: "Final",
    title: "Shape the Future.",
    hideTitle: true,
    fullBleed: true,
    bgImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2000",
    content: (
      <div className="relative w-full h-full overflow-hidden flex flex-col items-center justify-center select-none text-center">
        {/* ATMOSPHERIC BACKGROUND LAYERS */}
        <div className="absolute inset-0 z-0 text-center">
          <div className="absolute inset-0 backdrop-blur-md bg-[#020C1B]/40 text-center" />
          <div className="absolute top-[-10%] left-[-10%] w-[1200px] h-[1200px] rounded-full bg-[#A7DADB]/15 blur-[200px] text-center" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] rounded-full bg-[#A7DADB]/10 blur-[180px] text-center" />
        </div>

        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, staggerChildren: 0.2 }}
          className="relative z-10 w-full max-w-6xl flex flex-col items-center text-center"
        >
          {/* NORTH STAR LOGO SECTION - LARGE & PROMINENT */}
          <m.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-14 group text-center"
          >
            <div className="relative flex items-center justify-center gap-16 transition-all duration-1000 group-hover:scale-105 text-center">
              <img 
                src="/kjc-logo.png" 
                alt="KJC" 
                className="h-44 w-auto object-contain relative z-10 drop-shadow-[0_0_40px_rgba(167,218,219,0.4)]" 
              />
              <div className="h-24 w-[2px] bg-[#A7DADB] relative z-10" />
              <img 
                src="/logo.png" 
                alt="Smartslate" 
                className="h-36 w-auto object-contain relative z-10 drop-shadow-[0_0_40px_rgba(79,70,229,0.4)]" 
              />
            </div>
          </m.div>

          {/* CINEMATIC TYPOGRAPHY */}
          <RevealCard step={1}>
            <div className="space-y-4 text-center">
              <div className="relative inline-block text-center">
                <h1 className="font-display font-bold text-[110px] leading-[0.9] tracking-tighter text-[#A7DADB] text-center">
                  Will you lead the era?
                </h1>
              </div>
            </div>
          </RevealCard>
        </m.div>

        {/* PERSISTENT FOOTER METRICS */}
        <m.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="absolute bottom-10 left-12 right-12 flex justify-between items-end border-t border-white/10 pt-8 text-left"
        >
          <div className="flex gap-20 text-left">
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] text-[#b0c5c6]/40 uppercase tracking-[0.4em] font-display text-left">Institutional readiness</span>
              <span className="text-[#A7DADB] font-mono text-base tracking-widest text-left">[CRITICAL_PATH_SUCCESS]</span>
            </div>
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[10px] text-[#b0c5c6]/40 uppercase tracking-[0.4em] font-display text-left">Strategic deployment</span>
              <span className="text-white font-mono text-base tracking-widest text-left">KJU_COGNITIVE_V1.0</span>
            </div>
          </div>
          <div className="flex items-center gap-6 text-[#b0c5c6]/40 text-[11px] tracking-[0.5em] uppercase font-mono text-left">
            <Globe className="w-4 h-4 opacity-40 animate-spin-slow" />
            <span>Academic Excellence // 2026</span>
          </div>
        </m.div>
      </div>
    ),
    notes: "[This is the close. Slow down completely. Let the visual — both logos together — hold for a long, charged moment before speaking.] \"I want to leave you with a single question.\" \"Every era of Indian education was defined by a small number of institutions willing to move when others were still deciding. The colleges that built research infrastructure before it was required. The colleges that introduced international curriculum before it was expected. The colleges that made placement a priority before the market demanded it.\" \"Every time, the story is the same: someone moved first. Someone took the vision seriously. Someone decided that their institution's legacy was worth more than their institutional inertia.\" [Pause. Look at the decision maker directly.] \"Will you lead the era?\" \"Not 'should you consider participating in the AI movement.' Not 'should you form a working group to evaluate the landscape.' I'm asking something simpler — and more important. Will you lead?\" \"Because from where I'm standing, looking at what you've built here, looking at the quality of the people in this room — the answer seems obvious. Kristu Jayanti was built to lead. This is the next frontier.\" [Final beat. Quiet. Confident.] \"So that you can look back at this day as the day everything changed — we are ready to begin. The question is: are you?\" After the Final Slide — The Close: Don't rush into Q&A. Let the silence hold for two to three full seconds. Let it be slightly uncomfortable. Then say, simply:\"I'd love to hear your thoughts. And I'd love to talk about what Phase One looks like specifically for KJU — because I already have some hypotheses about where we start.\" This signals readiness, specificity, and momentum. It moves the conversation from 'if' to 'how' — and that's where deals close. Smartslate — Deploying a world-class cognitive ecosystem at Kristu Jayanti College. KJU_COGNITIVE_V1.0 // Academic Excellence 2026"
  },
  {
    id: 21,
    tag: "Finale",
    title: "Q&A",
    bgImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2000",
    content: (
      <div className="relative w-full h-full flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 bg-[#020C1B]/60 backdrop-blur-3xl z-0" />
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#A7DADB 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <m.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col items-center gap-16"
        >
          <div className="space-y-6">
            <m.div
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-1.5 bg-[#A7DADB] mx-auto rounded-full"
            />
            <h1 className="text-[180px] font-display font-black text-white tracking-tighter leading-none uppercase">
              Questions<span className="text-[#A7DADB]">?</span>
            </h1>
            <p className="text-4xl text-[#b0c5c6] font-display font-light uppercase tracking-[0.5em] opacity-60">
              Session <span className="text-white font-bold">Open</span> // Uplink Stable
            </p>
          </div>

          <div className="grid grid-cols-3 gap-12 mt-8">
            {[
              { icon: MessageSquare, label: "Interactive Dialogue" },
              { icon: Cpu, label: "Technical Scoping" },
              { icon: Building2, label: "Phase One Planning" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-6 group">
                <div className="p-8 rounded-[35px] bg-[#142433] border border-white/10 group-hover:border-[#A7DADB]/40 transition-all duration-700 shadow-xl transform group-hover:-translate-y-2">
                  <item.icon size={44} className="text-[#A7DADB]" />
                </div>
                <span className="text-xl font-mono text-white/30 uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </div>
        </m.div>

        <div className="absolute bottom-12 flex items-center gap-10 opacity-30">
          <span className="text-sm font-mono tracking-widest uppercase text-white/40">Ready to Architect</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[#A7DADB] animate-pulse" />
          <span className="text-sm font-mono tracking-widest uppercase text-white/40">KJU_COGNITIVE_V1.0</span>
        </div>
      </div>
    ),
    notes: "Transition to Q&A. This slide provides a stable, professional backdrop for discussion. Be ready to pivot to specific technical or strategic questions."
  }
];

