import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';
import { slidesData } from './constants/slides';
import { Slide } from './components/Slide';
import { Navigation } from './components/Navigation';
import { Notes } from './components/Notes';
import { Logo } from './components/Logo';
import { ScalingContainer } from './components/ScalingContainer';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [[slideIndex, direction], setSlide] = useState([0, 0]);
  const [showNotes, setShowNotes] = useState(false);
  const [isPresentMode, setIsPresentMode] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  const paginate = (newDirection: number) => {
    const nextIndex = currentSlide + newDirection;
    if (nextIndex >= 0 && nextIndex < slidesData.length) {
      setCurrentSlide(nextIndex);
      setSlide([nextIndex, newDirection]);
    }
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await fullscreenRef.current?.requestFullscreen();
        setIsPresentMode(true);
      } catch (err) {
        console.error(`Error attempting to enable fullscreen: ${err}`);
      }
    } else {
      document.exitFullscreen();
    }
  };

  // Sync state with browser fullscreen changes (e.g. Esc key)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsPresentMode(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'n') {
        setShowNotes(prev => !prev);
      } else if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        setIsPresentMode(false);
      } else if (e.key === 'f' || e.key === 'p') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = slidesData[currentSlide];
  const progress = ((currentSlide + 1) / slidesData.length) * 100;

  return (
    <LazyMotion features={domAnimation}>
      <div 
        ref={fullscreenRef}
        className={`bg-[#020C1B] text-white font-body h-[100dvh] w-full flex flex-col overflow-hidden selection:bg-[#A7DADB]/30 fixed inset-0 ${isPresentMode ? 'z-[100]' : ''}`}
      >
      {/* Dynamic Font Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&family=Quicksand:wght@400;500;700&display=swap');
        .font-display { font-family: 'Quicksand', sans-serif; }
        .font-body { font-family: 'Lato', sans-serif; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 12px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #A7DADB; border-radius: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #A7DADB; }

        /* Ensure no scroll on root */
        #root { height: 100%; width: 100%; overflow: hidden; position: fixed; inset: 0; }

        /* Hide UI in native fullscreen */
        div:fullscreen .hide-in-fullscreen { display: none; }
      `}</style>

      {/* Progress Bar - Hidden in Present Mode */}
      {!isPresentMode && (
        <div className="h-1.5 w-full bg-[#142433] absolute top-0 left-0 z-50 hide-in-fullscreen">
          <div 
            className="h-full bg-[#A7DADB] transition-all duration-500 ease-out shadow-[0_0_20px_#A7DADB]" 
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Header - Hidden in Present Mode */}
      {!isPresentMode && (
        <header className="h-20 flex justify-between items-center px-12 py-4 z-10 shrink-0 border-b border-[#142433] hide-in-fullscreen">
          <Logo />
          <div className="text-[#b0c5c6] font-display text-lg tracking-widest uppercase bg-[#142433] px-6 py-2 rounded-full border border-[#A7DADB]/10">
            {slide.tag}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className={`flex-grow flex items-center justify-center relative overflow-hidden ${isPresentMode ? 'h-full w-full' : ''}`}>
        {/* Decorative ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[#A7DADB]/10 rounded-full blur-[180px] pointer-events-none"></div>
        
        <ScalingContainer>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <Slide key={currentSlide} slide={slide} direction={direction} />
          </AnimatePresence>
        </ScalingContainer>

        <Notes 
          notes={slide.notes} 
          isVisible={showNotes} 
          onClose={() => setShowNotes(false)} 
        />
      </main>

      {/* Navigation Footer - Hidden in Present Mode */}
      {!isPresentMode && (
        <div className="h-24 shrink-0 bg-[#020C1B] hide-in-fullscreen">
          <Navigation 
            currentSlide={currentSlide}
            totalSlides={slidesData.length}
            onPrev={() => paginate(-1)}
            onNext={() => paginate(1)}
            onToggleNotes={() => setShowNotes(!showNotes)}
            onTogglePresent={toggleFullscreen}
            showNotes={showNotes}
          />
        </div>
      )}
    </div>
    </LazyMotion>
  );
}
