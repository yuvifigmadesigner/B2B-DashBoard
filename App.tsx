import React, { useState, useEffect } from 'react';
import { SectionIntro } from './components/SectionIntro';
import { SectionSolutions } from './components/SectionSolutions';
import { SectionResearch } from './components/SectionResearch';
import { SectionDesign } from './components/SectionDesign';
import { SectionConclusion } from './components/SectionConclusion';
import { LoadingScreen } from './components/LoadingScreen';
import { PixelBackground } from './components/PixelBackground';

import { AppNavigation } from './components/AppNavigation';

export default function App() {
  const [loading, setLoading] = useState(true);

  const emailSubject = encodeURIComponent("Project Inquiry");
  const emailBody = encodeURIComponent("Hi Yuvraj,\n\nI came across your portfolio and I'm interested in your services. Can we schedule a meeting?\n\nRegards,\n[Name]");
  const mailtoLink = `mailto:Yuvrajkumar0221@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <>
      {loading && <LoadingScreen onFinished={() => setLoading(false)} />}

      <div className={`min-h-screen bg-background text-primary selection:bg-zinc-700 selection:text-white font-sans overflow-x-hidden ${loading ? 'h-screen overflow-hidden' : ''}`}>

        <PixelBackground />

        <AppNavigation />

        <main className="relative z-10">
          <SectionIntro />
          <SectionSolutions />
          <SectionResearch />
          <SectionDesign />
          <SectionConclusion />
        </main>

        <footer className="relative z-10 border-t border-line bg-background pb-24 lg:pb-12">
          <div className="max-w-7xl mx-auto border-x border-line px-4 py-12 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-sm">
            <p>© 2026 CargoPulse Case Study.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://www.linkedin.com/in/yuvrajgupta0221" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://www.upwork.com/freelancers/~01f2a01dd44b738e84?mp_source=share" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Upwork</a>
              <a href={mailtoLink} className="hover:text-white transition-colors">Email</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}