import React from 'react';
import { SectionTitle, Badge } from './UI';
import { ArrowRight, Briefcase, Linkedin, Mail } from 'lucide-react';
import ColorBends from './ColorBends';

export const SectionConclusion = () => {
  const emailSubject = encodeURIComponent("Project Inquiry");
  const emailBody = encodeURIComponent("Hi Yuvraj,\n\nI came across your portfolio and I'm interested in your services. Can we schedule a meeting?\n\nRegards,\n[Name]");
  const mailtoLink = `mailto:Yuvrajkumar0221@gmail.com?subject=${emailSubject}&body=${emailBody}`;

  return (
    <section id="conclusion" className="bg-transparent border-t border-line relative">
      <div className="max-w-7xl mx-auto border-x border-line py-20 px-4 relative z-10 w-full">
        <SectionTitle number="05" title="Conclusion" />

        <div className="mb-24">
            <div className="bg-background/50 backdrop-blur-sm p-8 md:p-10 rounded-xl border border-line">
                <p className="text-xl text-secondary leading-relaxed mb-8 max-w-4xl">
                    CargoPulse transforms fleet management from a passive monitoring task into a proactive intervention strategy. By consolidating fragmented data into a single "Control Tower" view, the dashboard empowers managers like Arjun to solve complex disruptions with speed and geographic context, directly improving on-time delivery rates.
                </p>
                <div className="flex flex-wrap gap-2">
                    <Badge>Proactive Re-assignment Bridge</Badge>
                    <Badge>Telematics-to-Action Logic</Badge>
                    <Badge>Exception-Based Triage</Badge>
                </div>
            </div>
        </div>

        {/* Final CTA / Contact */}
        <div 
            className="relative rounded-2xl overflow-hidden bg-surface border border-line p-12 md:p-24 text-center group"
        >
             {/* Interactive Color Bends Background */}
             <div className="absolute inset-0 z-0">
                <ColorBends
                  colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
                  rotation={0}
                  speed={0.2}
                  scale={1}
                  frequency={1}
                  warpStrength={1}
                  mouseInfluence={1}
                  parallax={0.5}
                  noise={0.1}
                  transparent
                  autoRotate={0}
                />
             </div>

             {/* Static Ambient Glow (Base State) */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent pointer-events-none opacity-50 z-0"></div>
             
             <div className="relative z-10 pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-white">Thanks for reading.</h2>
                <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
                    I'm currently open to new opportunities in Product Design.
                </p>
             </div>
             
             <div className="relative z-10">
                 <a 
                    href={mailtoLink}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors"
                 >
                     Get in Touch <ArrowRight size={18} />
                 </a>

                 <div className="mt-16 flex justify-center gap-8">
                     <a 
                        href="https://www.linkedin.com/in/yuvrajgupta0221" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-zinc-500 hover:text-white transition-colors"
                        aria-label="LinkedIn"
                     >
                        <Linkedin />
                     </a>
                     <a 
                        href="https://www.upwork.com/freelancers/~01f2a01dd44b738e84?mp_source=share" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-zinc-500 hover:text-white transition-colors"
                        aria-label="Upwork"
                     >
                        <Briefcase />
                     </a>
                     <a 
                        href={mailtoLink}
                        className="text-zinc-500 hover:text-white transition-colors"
                        aria-label="Email"
                     >
                        <Mail />
                     </a>
                 </div>
             </div>
        </div>
      </div>
    </section>
  );
};