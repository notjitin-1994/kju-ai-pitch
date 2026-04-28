import React from 'react';
import { ChevronLeft, ChevronRight, Mic } from 'lucide-react';

interface NavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onToggleNotes: () => void;
  onTogglePresent: () => void;
  showNotes: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onToggleNotes,
  onTogglePresent,
  showNotes,
}) => {
  return (
    <footer className="px-8 py-6 flex justify-between items-center z-10 shrink-0 border-t border-[#142433]">
      <div className="flex items-center gap-4">
        <span className="text-[#b0c5c6] font-bold text-lg whitespace-nowrap min-w-[100px]">
          {currentSlide + 1} <span className="text-[#142433] mx-1">/</span> <span className="text-sm font-normal text-[#b0c5c6]">{totalSlides}</span>
        </span>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={onPrev}
          disabled={currentSlide === 0}
          className="p-3 rounded-full bg-[#142433] text-white hover:bg-[#A7DADB] hover:text-[#020C1B] disabled:opacity-30 disabled:hover:bg-[#142433] disabled:hover:text-white transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className="p-3 rounded-full bg-[#A7DADB] text-white hover:bg-[#A7DADB]/80 disabled:opacity-30 transition-colors shadow-[0_0_15px_rgba(79,70,229,0.4)]"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={onTogglePresent}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-bold bg-[#142433] text-[#b0c5c6] hover:text-white transition-colors"
          title="Full Screen Presentation"
        >
          <span className="hidden md:inline">Present</span>
        </button>
        <button 
          onClick={onToggleNotes}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold transition-colors ${
            showNotes ? 'bg-[#A7DADB] text-[#020C1B]' : 'bg-[#142433] text-[#b0c5c6] hover:text-white'
          }`}
          title="Press 'N' to toggle"
        >
          <Mic size={18} />
          <span className="hidden md:inline">{showNotes ? 'Hide Notes' : 'Speaker Notes'}</span>
        </button>
      </div>
    </footer>
  );
};
