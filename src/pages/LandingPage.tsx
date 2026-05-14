import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { Hero } from '../components/landing/Hero';
import { ProblemMatrix } from '../components/landing/ProblemMatrix';
import { SolutionPillars } from '../components/landing/SolutionPillars';
import { Outcomes } from '../components/landing/Outcomes';
import { CTA } from '../components/landing/CTA';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-24 flex justify-between items-center px-8 md:px-24 z-[100] backdrop-blur-xl border-b border-white/5 bg-[#020C1B]/80">
      <Logo />
      <div className="flex items-center gap-12">
        <Link 
          to="/pitch-deck" 
          className="text-[#b0c5c6] hover:text-[#A7DADB] font-display text-sm font-bold uppercase tracking-[0.2em] transition-colors"
        >
          Pitch Deck
        </Link>
        <Link 
          to="/terms" 
          className="text-[#b0c5c6] hover:text-[#A7DADB] font-display text-sm font-bold uppercase tracking-[0.2em] transition-colors"
        >
          Terms
        </Link>
      </div>
    </nav>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="bg-[#020C1B] min-h-screen selection:bg-[#A7DADB]/30 selection:text-[#A7DADB]">
      <Navbar />
      <Hero />
      <ProblemMatrix />
      <SolutionPillars />
      <Outcomes />
      <CTA />
    </div>
  );
};

export default LandingPage;
