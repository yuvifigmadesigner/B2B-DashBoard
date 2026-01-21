import React, { useEffect, useState } from 'react';

export const LoadingScreen = ({ onFinished }: { onFinished: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [loadingText, setLoadingText] = useState("Initializing...");

  // Random text updates for "technical" feel
  useEffect(() => {
    const texts = [
      "Loading CargoPulse...",
      "Connecting OBD-II Sensors...",
      "Syncing GPS Data...",
      "Analyzing Fleet Metrics...",
      "Generating Control Tower...",
      "System Ready"
    ];
    
    // Change text based on progress milestones
    if (progress < 20) setLoadingText(texts[0]);
    else if (progress < 40) setLoadingText(texts[1]);
    else if (progress < 60) setLoadingText(texts[2]);
    else if (progress < 80) setLoadingText(texts[3]);
    else if (progress < 100) setLoadingText(texts[4]);
    else setLoadingText(texts[5]);

  }, [progress]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.random() * 2 + 0.5; // Slower, smoother increment
        const next = Math.min(prev + increment, 100);
        
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsExiting(true), 800); // Wait a bit at 100%
          return 100;
        }
        return next;
      });
    }, 30); // Faster tick rate for smoother animation

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${isExiting ? 'opacity-0 translate-y-[-100%]' : 'opacity-100'}`}
      onTransitionEnd={() => {
        if (isExiting) onFinished();
      }}
    >
      {/* Background Grid Pattern - Static Base */}
      <div className="absolute inset-0 pointer-events-none opacity-10" 
           style={{
             backgroundImage: 'linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)',
             backgroundSize: '4rem 4rem',
             maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
           }}
      />

      {/* Dynamic Background Scanning Lines */}
      <div className={`absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* Vertical Scanner 1 - Primary (Bright) */}
        <div 
            className="absolute top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent animate-scan-right"
            style={{ 
                animationDuration: '4s',
                boxShadow: '0 0 15px 1px rgba(255, 255, 255, 0.05)'
            }} 
        />
        
        {/* Vertical Scanner 2 - Secondary (Subtle/Slow) */}
        <div 
            className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-zinc-600/10 to-transparent animate-scan-right" 
            style={{ 
                animationDuration: '8s', 
                animationDelay: '1.5s' 
            }}
        />

        {/* Horizontal Scanner 1 - Primary (Bright) */}
        <div 
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent animate-scan-down" 
            style={{ 
                animationDuration: '5s',
                animationDelay: '0.8s',
                boxShadow: '0 0 15px 1px rgba(255, 255, 255, 0.05)'
            }}
        />

         {/* Horizontal Scanner 2 - Secondary (Fast Echo) */}
         <div 
            className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent animate-scan-down" 
            style={{ 
                animationDuration: '3s',
                animationDelay: '2.5s' 
            }}
        />
      </div>

      <div className="relative z-10 w-full max-w-lg px-8 flex flex-col items-center">
        {/* Logo Area */}
        <div className="mb-12 relative text-center">
             <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tighter text-white mix-blend-difference leading-tight">
                CargoPulse<br />Case Study
             </h1>
        </div>

        {/* Main Progress Line Container */}
        <div className="w-full relative py-4">
            {/* Top Bracket Line */}
            <div className="absolute top-0 left-0 w-full h-px bg-line"></div>
            <div className="absolute top-0 left-0 h-2 w-px bg-line"></div>
            <div className="absolute top-0 right-0 h-2 w-px bg-line"></div>

            {/* The Actual Progress Bar */}
            <div className="relative h-0.5 bg-zinc-900 w-full overflow-hidden my-4">
                <div 
                    className="absolute left-0 top-0 h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-75 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Bottom Bracket Line */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-line"></div>
            <div className="absolute bottom-0 left-0 h-2 w-px bg-line"></div>
            <div className="absolute bottom-0 right-0 h-2 w-px bg-line"></div>
        </div>

        {/* Info / Metadata */}
        <div className="w-full flex justify-between items-end mt-2 font-mono text-[10px] md:text-xs uppercase tracking-widest text-zinc-500">
            <div className="flex flex-col gap-1">
                <span>Status: <span className="text-zinc-300">{loadingText}</span></span>
                <span>Mem: <span className="text-zinc-300">{Math.floor(progress * 12.4)} MB</span></span>
            </div>
            <div className="text-4xl md:text-5xl font-light text-white tabular-nums leading-none">
                {Math.round(progress).toString().padStart(3, '0')}
            </div>
        </div>
      </div>
    </div>
  );
};