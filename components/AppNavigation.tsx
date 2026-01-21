import React, { useState, useEffect } from 'react';
import { Home, Layers, Search, Palette, Sparkles } from 'lucide-react';

const SECTIONS = [
    { id: 'intro', label: 'Overview', icon: Home },
    { id: 'solutions', label: 'Solution', icon: Layers },
    { id: 'research', label: 'Research', icon: Search },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'conclusion', label: 'Future', icon: Sparkles },
];

export const AppNavigation = () => {
    const [activeSection, setActiveSection] = useState('intro');

    useEffect(() => {
        const handleScroll = () => {
            const triggerLine = window.innerHeight / 2;

            let current = '';
            let minDistance = Infinity;
            let closest = '';

            // Check all sections
            SECTIONS.forEach(({ id }) => {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();

                    // 1. Precise Check: Does this section contain the middle line?
                    if (rect.top <= triggerLine && rect.bottom >= triggerLine) {
                        current = id;
                    }

                    // 2. Fallback Tracking: Calculate distance to center
                    const center = rect.top + (rect.height / 2);
                    const dist = Math.abs(center - triggerLine);
                    if (dist < minDistance) {
                        minDistance = dist;
                        closest = id;
                    }
                }
            });

            // Prefer the containing section, strictly fallback to closest if mostly empty/gap
            const target = current || closest;

            if (target && target !== activeSection) {
                setActiveSection(target);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check

        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection]); // Re-bind if state changes (acceptable for low freq updates) or remove dependency if using ref

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <>
            {/* Side Navigation - Desktop & Tablet Landscape (lg: 1024px+) */}
            <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-6 mix-blend-difference pointer-events-none">
                <div className="flex flex-col items-end gap-6 pointer-events-auto">
                    {SECTIONS.map(({ id, label }) => (
                        <button
                            key={id}
                            onClick={() => scrollTo(id)}
                            className="group flex items-center gap-4 focus:outline-none relative py-2"
                            aria-label={`Scroll to ${label}`}
                        >
                            <span
                                className={`absolute right-8 text-[10px] font-mono uppercase tracking-widest whitespace-nowrap transition-all duration-300 origin-right ${activeSection === id
                                        ? 'text-white opacity-100 translate-x-0'
                                        : 'text-zinc-500 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'
                                    }`}
                            >
                                {label}
                            </span>

                            <div className="relative flex items-center justify-center w-3 h-3">
                                <div
                                    className={`absolute inset-0 rounded-full border border-white transition-all duration-500 ${activeSection === id ? 'scale-150 opacity-100' : 'scale-0 opacity-0'
                                        }`}
                                />
                                <div
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeSection === id
                                            ? 'bg-white'
                                            : 'bg-zinc-600 group-hover:bg-zinc-400'
                                        }`}
                                />
                            </div>
                        </button>
                    ))}
                    {/* Visual Vertical Line */}
                    <div className="absolute top-2 bottom-2 right-[5px] w-px bg-gradient-to-b from-transparent via-zinc-800 to-transparent -z-10" />
                </div>
            </nav>

            {/* Bottom Dock - Mobile & Tablet Portrait (< 1024px) */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 lg:hidden w-auto animate-fade-in-up">
                <nav className="flex items-center gap-1 p-2 bg-[#050505]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl ring-1 ring-white/5">
                    {SECTIONS.map(({ id, label, icon: Icon }) => {
                        const isActive = activeSection === id;
                        return (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className={`
                                    relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500 ease-out group
                                    ${isActive ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105' : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/10'}
                                `}
                                aria-label={label}
                            >
                                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                            </button>
                        )
                    })}
                </nav>
            </div>
        </>
    );
};
