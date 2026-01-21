import React from 'react';
import { Badge } from './UI';
import { Command } from 'lucide-react';

const StatCard = ({ label, value }: { label: string; value: string }) => (
  <div className="h-full p-8 flex flex-col justify-between bg-background hover:bg-surfaceHighlight/30 transition-all duration-300 group relative hover:scale-[1.03] hover:shadow-2xl hover:z-10">
    <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-green-500 transition-all duration-300 group-hover:bg-green-400 group-hover:shadow-[0_0_15px_rgba(74,222,128,0.8)]"></div>
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">{label}</span>
    </div>
    <div>
        <div className="text-3xl md:text-4xl font-display font-medium mb-1 group-hover:text-white transition-colors">{value}</div>
    </div>
  </div>
);

export const SectionIntro = () => {
  return (
    <section id="intro" className="min-h-screen flex flex-col pt-20 md:pt-0 border-b border-line relative overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto border-x border-line px-4 w-full mb-12 md:mb-0 text-center relative z-10">
         
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-line mb-8 animate-fade-in-up">
            <Badge>B2B SaaS Case Study</Badge>
            <span className="text-xs text-zinc-400">CargoPulse Design System</span>
         </div>

         <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tighter text-white mb-8 leading-[1.1] max-w-5xl">
            CargoPulse:<br />Fleet Control Tower
         </h1>

         <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Empowering warehouse managers with a centralized dashboard to identify "at-risk" deliveries, monitor telematics, and resolve critical delays in real-time.
         </p>

         {/* Role/Reading Time Bar */}
         <div className="w-full max-w-xl mx-auto relative group mb-12 md:mb-24">
            <div className="absolute -inset-1 bg-gradient-to-r from-zinc-700 to-zinc-800 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <div className="relative bg-[#0A0A0A] border border-white/10 rounded-2xl flex flex-col md:flex-row items-stretch shadow-2xl overflow-hidden">
                {/* Beam Effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-scan-right blur-sm"></div>
                </div>

                {/* Left Section: Role */}
                <div className="flex-1 flex items-center gap-5 px-6 py-4 md:border-r border-white/5 relative z-10 hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                         <Command className="text-zinc-500" size={18} />
                    </div>
                    <div className="text-left">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-1">Role</div>
                        <div className="text-sm font-medium text-white">Product Designer</div>
                    </div>
                </div>

                {/* Right Section: Reading Time */}
                <div className="flex-1 flex items-center gap-5 px-6 py-4 border-t md:border-t-0 border-white/5 relative z-10 hover:bg-white/5 transition-colors">
                     {/* Placeholder to align text with the left column's text start position */}
                     <div className="w-10 h-10 shrink-0 hidden md:block"></div> 
                    <div className="text-left">
                        <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-1">Reading Time</div>
                        <div className="text-sm font-medium text-white">7 Min</div>
                    </div>
                </div>
            </div>
         </div>
      </div>

      {/* Grid Layout Cards */}
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 bg-line gap-px border-t border-x border-line relative z-0">
             <div className="bg-background">
                 <StatCard label="Operational Efficiency" value="40% Faster" />
             </div>
             <div className="bg-background">
                 <StatCard label="User Cognition" value="Instant" />
             </div>
             <div className="bg-background">
                 <StatCard label="Reliability" value="98%" />
             </div>
        </div>
      </div>
    </section>
  );
};