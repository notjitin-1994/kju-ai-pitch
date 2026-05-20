import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PitchDeck from './pages/PitchDeck';
import SmartslateTerms from './pages/TermsPage';
import PricingPage from './pages/PricingPage';
import TranscriptPage from './pages/TranscriptPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pitch-deck" element={<PitchDeck />} />
      <Route path="/terms" element={<SmartslateTerms />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/transcript" element={<TranscriptPage />} />
    </Routes>
  );
}
