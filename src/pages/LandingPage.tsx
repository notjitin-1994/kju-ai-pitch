import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Logo } from '../components/Logo';
import { Hero } from '../components/landing/Hero';
import { ProblemMatrix } from '../components/landing/ProblemMatrix';
import { SolutionPillars } from '../components/landing/SolutionPillars';
import { Outcomes } from '../components/landing/Outcomes';
import { CTA } from '../components/landing/CTA';
import { GrainOverlay } from '../components/ui/atmosphere';
import { CursorSpotlight } from '../components/ui/CursorSpotlight';
import { AudioProvider } from '../audio/AudioProvider';
import { MiniPlayer } from '../audio/MiniPlayer';

const navLinks: { href: string; label: string; route?: boolean }[] = [
  { href: '#problem', label: 'Premise' },
  { href: '#solution', label: 'Solution' },
  { href: '#outcomes', label: 'Outcomes' },
  { href: '/pricing', label: 'Pricing', route: true },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[90]"
      style={{
        transition: 'background-color 350ms var(--ease-out-expo), backdrop-filter 350ms var(--ease-out-expo), border-color 350ms var(--ease-out-expo)',
      }}
    >
      <div
        className={`flex items-center justify-between px-6 md:px-12 lg:px-24 h-20 md:h-[88px] border-b ${
          scrolled
            ? 'border-white/[0.06] bg-[#020C1B]/75 backdrop-blur-2xl'
            : 'border-transparent bg-transparent backdrop-blur-0'
        }`}
        style={{ transition: 'inherit' }}
      >
        <a href="#hero" aria-label="Smartslate home" className="flex items-center gap-3">
          <Logo />
        </a>

        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((l) =>
            l.route ? (
              <Link
                key={l.href}
                to={l.href}
                className="group relative font-display text-xs tracking-[0.3em] uppercase font-bold text-[#b0c5c6]/85 hover:text-white"
                style={{ transition: 'color 200ms var(--ease-out-expo)' }}
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 right-0 h-px bg-[#A7DADB] origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ transition: 'transform 350ms var(--ease-out-expo)' }}
                />
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="group relative font-display text-xs tracking-[0.3em] uppercase font-bold text-[#b0c5c6]/85 hover:text-white"
                style={{ transition: 'color 200ms var(--ease-out-expo)' }}
              >
                {l.label}
                <span
                  aria-hidden
                  className="absolute -bottom-2 left-0 right-0 h-px bg-[#A7DADB] origin-left scale-x-0 group-hover:scale-x-100"
                  style={{ transition: 'transform 350ms var(--ease-out-expo)' }}
                />
              </a>
            )
          )}
        </div>

        <div className="flex items-center gap-5">
          <a
            href="#contact"
            className="press-scale inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-[#A7DADB] text-[#020C1B] font-display text-xs tracking-[0.22em] uppercase font-bold"
            style={{
              boxShadow:
                '0 8px 22px -8px rgba(167,218,219,0.55), inset 0 1px 0 rgba(255,255,255,0.4)',
              transition: 'transform 160ms var(--ease-out-expo), box-shadow 220ms var(--ease-out-expo)',
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#020C1B]/80 animate-soft-pulse" />
            Reach Out
          </a>
        </div>
      </div>
    </nav>
  );
};

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 130, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX: x, transformOrigin: 'left' }}
      className="fixed top-0 left-0 right-0 h-[2px] z-[95] bg-gradient-to-r from-[#A7DADB]/0 via-[#A7DADB] to-[#A7DADB]/70"
    />
  );
};

const LandingPage: React.FC = () => {
  return (
    <AudioProvider>
      <div className="relative bg-[#020C1B] min-h-screen selection:bg-[#A7DADB]/30 selection:text-[#A7DADB]">
        <CursorSpotlight />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <ProblemMatrix />
          <SolutionPillars />
          <Outcomes />
          <CTA />
        </main>
        <GrainOverlay opacity={0.06} />
        <MiniPlayer />
      </div>
    </AudioProvider>
  );
};

export default LandingPage;
