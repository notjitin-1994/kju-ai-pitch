import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
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

  const paginate = (newDirection: number) => {
    const nextIndex = currentSlide + newDirection;
    if (nextIndex >= 0 && nextIndex < slidesData.length) {
      setCurrentSlide(nextIndex);
      setSlide([nextIndex, newDirection]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'n') {
        setShowNotes(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = slidesData[currentSlide];
  const progress = ((currentSlide + 1) / slidesData.length) * 100;

  return (
    <div className="bg-[#020C1B] text-white font-body h-screen flex flex-col overflow-hidden selection:bg-[#4F46E5]/30">
      {/* Dynamic Font Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&family=Quicksand:wght@400;500;700&display=swap');
        .font-display { font-family: 'Quicksand', sans-serif; }
        .font-body { font-family: 'Lato', sans-serif; }
        
        .custom-scrollbar::-webkit-scrollbar { width: 12px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4F46E5; border-radius: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #A7DADB; }
      `}</style>

      {/* Progress Bar */}
      <div className="h-1.5 w-full bg-[#142433] absolute top-0 left-0 z-50">
        <div 
          className="h-full bg-[#A7DADB] transition-all duration-500 ease-out shadow-[0_0_20px_#A7DADB]" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Header */}
      <header className="h-20 flex justify-between items-center px-12 py-4 z-10 shrink-0 border-b border-[#142433]">
        <Logo />
        <div className="text-[#b0c5c6] font-display text-lg tracking-widest uppercase bg-[#142433] px-6 py-2 rounded-full border border-[#A7DADB]/10">
          {slide.tag}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center relative overflow-hidden">
        {/* Decorative ambient light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-[#4F46E5]/10 rounded-full blur-[180px] pointer-events-none"></div>
        
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

      {/* Navigation Footer */}
      <div className="h-24 shrink-0 bg-[#020C1B]">
        <Navigation 
          currentSlide={currentSlide}
          totalSlides={slidesData.length}
          onPrev={() => paginate(-1)}
          onNext={() => paginate(1)}
          onToggleNotes={() => setShowNotes(!showNotes)}
          showNotes={showNotes}
        />
      </div>
    </div>
  );
}
