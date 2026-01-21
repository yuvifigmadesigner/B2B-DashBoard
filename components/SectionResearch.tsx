import React, { useState } from 'react';
import { Target, Frown, Lightbulb } from 'lucide-react';

// --- Visual Components ---

const UserPersona = () => (
    <div className="w-full bg-surface border border-line rounded-xl mt-2 relative overflow-hidden group transition-all hover:border-accent/30 flex flex-col md:flex-row min-h-[420px]">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>

        {/* Left Column: Identity (30-35%) */}
        <div className="w-full md:w-[35%] border-b md:border-b-0 md:border-r border-line p-8 flex flex-col items-center justify-center text-center bg-black/20 relative">
            <div className="relative w-40 h-40 mb-6 group-hover:scale-105 transition-transform duration-700 ease-out">
                <div className="absolute inset-0 rounded-full border-2 border-surfaceHighlight shadow-2xl z-10"></div>
                <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                        src="/arjun.png"
                        alt="Arjun"
                        className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 scale-125"
                    />
                </div>
                {/* Status Dot */}
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-red-500 rounded-full border-4 border-surface z-20" title="High Stress"></div>
            </div>

            <h3 className="text-3xl font-display font-medium text-white mb-2">Arjun</h3>
            <p className="text-accent font-mono text-xs uppercase tracking-widest mb-8">Operations Manager</p>

            {/* Mini Stats Grid */}
            <div className="grid grid-cols-2 gap-4 w-full border-t border-line pt-6">
                <div className="text-center">
                    <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wide">Age</div>
                    <div className="text-white font-medium">35</div>
                </div>
                <div className="text-center border-l border-line">
                    <div className="text-xs text-zinc-500 mb-1 uppercase tracking-wide">Tech</div>
                    <div className="text-white font-medium">Desktop</div>
                </div>
            </div>
        </div>

        {/* Right Column: Narrative (65-70%) */}
        <div className="w-full md:w-[65%] p-8 flex flex-col justify-between">

            {/* Top: Context Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-accent">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                        <span className="text-xs font-mono uppercase tracking-widest">Context</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        Manages a busy logistics hub. Oversees a fleet of <strong className="text-white">20+ active vehicles</strong> and ~100 daily deliveries.
                    </p>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-accent">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                        <span className="text-xs font-mono uppercase tracking-widest">Behavior</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed">
                        Doesn't "watch" the screen 24/7. Glances to check health, only diving deep when things go wrong.
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-line mb-8"></div>

            {/* Bottom: Voice / Quotes */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1 rounded bg-surfaceHighlight border border-line text-zinc-400">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2-2z"></path></svg>
                    </div>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Frustrations</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Main Quote */}
                    <div className="col-span-1 md:col-span-2 p-4 rounded-lg bg-surfaceHighlight/50 border border-line hover:border-accent/40 transition-colors">
                        <p className="text-white italic mb-1">"Where is my driver?"</p>
                        <p className="text-[11px] text-zinc-500 uppercase tracking-wide">The Context Switch Problem</p>
                    </div>

                    {/* Secondary Pain Points */}
                    <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5 group/alert">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider">Alert Fatigue</span>
                            <Frown size={14} className="text-red-500/50 group-hover/alert:text-red-500 transition-colors" />
                        </div>
                        <p className="text-xs text-zinc-400 leading-snug">"Getting notifications for everything creates noise."</p>
                    </div>

                    <div className="p-4 rounded-lg border border-yellow-500/20 bg-yellow-500/5 group/warn">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider">Ambiguity</span>
                            <Lightbulb size={14} className="text-yellow-500/50 group-hover/warn:text-yellow-500 transition-colors" />
                        </div>
                        <p className="text-xs text-zinc-400 leading-snug">"Orders stuck 'In Progress' for hours with no reason."</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const MoSCoWBoard = () => {
    const categories = [
        {
            title: "Must Have",
            subtitle: "Non-negotiable for MVP",
            color: "bg-red-500/10 text-red-200 border-red-500/20",
            iconColor: "text-red-500",
            items: ["Live Fleet Map", "Unified Order Table", "Status Badges & Filters", "Critical Alert System", "Order Progress Bar"]
        },
        {
            title: "Should Have",
            subtitle: "Important but not vital",
            color: "bg-blue-500/10 text-blue-200 border-blue-500/20",
            iconColor: "text-blue-500",
            items: ["Vehicle Telematics Integration", "Driver Profile Quick-View", "Manual 'Re-assign' Action", "Order List View"]
        },
        {
            title: "Could Have",
            subtitle: "Desirable features",
            color: "bg-orange-500/10 text-orange-200 border-orange-500/20",
            iconColor: "text-orange-500",
            items: ["Smart Route Suggestions", "Driver Chat/Call Module", "Global Search Bar"]
        },
        {
            title: "Won't Have",
            subtitle: "Out of scope for now",
            color: "bg-zinc-800/50 text-zinc-400 border-zinc-700",
            iconColor: "text-zinc-500",
            items: ["Historical Playback", "Bulk Assign Actions"]
        }
    ];

    return (
        <div className="bg-[#18181b] p-6 rounded-xl border border-white/10 min-h-[500px] flex flex-col justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 h-full">
                {categories.map((cat, i) => (
                    <div key={i} className={`p-5 rounded-xl border ${cat.color} backdrop-blur-sm flex flex-col transition-transform hover:scale-[1.01]`}>
                        <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-2">
                            <div>
                                <h4 className={`font-display font-medium text-sm uppercase tracking-widest ${cat.iconColor}`}>{cat.title}</h4>
                                <span className="text-[10px] text-zinc-500 font-mono">{cat.subtitle}</span>
                            </div>
                            <div className={`w-2 h-2 rounded-full ${cat.iconColor.replace('text', 'bg')}`}></div>
                        </div>

                        <div className="flex-1 flex flex-wrap content-start gap-2">
                            {cat.items.map((item, j) => (
                                <div key={j} className="flex items-center gap-2 w-full bg-black/20 px-3 py-2 rounded text-xs font-medium border border-white/5 hover:bg-black/40 transition-colors">
                                    <div className={`w-1 h-1 rounded-full ${cat.iconColor.replace('text', 'bg')}`}></div>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const EmpathyMap = () => {
    const phases = [
        {
            phase: "Monitor Health",
            goal: "Be informed immediately when a delivery is late or vehicle breaks down.",
            pain: "Alert Fatigue: Phones ringing and generic system beeps happen simultaneously.",
            opp: "System categorizes alerts by severity. Only critical issues (e.g., Breakdown) trigger a forceful notification."
        },
        {
            phase: "Spot Exceptions",
            goal: "Locate the specific truck or order ID within the system that triggered the alert.",
            pain: "The Context Switch: Minimize alert, open spreadsheet, find ID, switch to map tab.",
            opp: "Clicking a notification instantly filters the main view to that specific Order + Driver pair."
        },
        {
            phase: "Diagnose Root Cause",
            goal: "Understand the cause of the delay (Traffic, Breakdown, Driver Issue).",
            pain: "Information Black Box: Status just says 'Delayed'. Must call driver to ask why.",
            opp: "Dashboard pulls real-time data (Traffic API, OBD-II) to display the reason automatically."
        },
        {
            phase: "Resolve Issue",
            goal: "Manually intervene: Reroute driver or call customer to reschedule.",
            pain: "Helplessness: Once a truck is out, the system is read-only. Fixing requires offline work.",
            opp: "System-suggested actions (e.g., 'Reassign to nearby Driver B') to update route instantly."
        }
    ];

    return (
        <div className="bg-[#18181b] p-6 rounded-xl border border-white/10 min-h-[500px] flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-end mb-6 border-b border-zinc-800 pb-4">
                <h3 className="text-lg font-medium text-white">Workflow Analysis & Friction Points</h3>
                <div className="flex gap-4 text-[10px] uppercase tracking-widest text-zinc-500">
                    <span className="flex items-center gap-1"><Target size={12} className="text-yellow-500" /> Goal</span>
                    <span className="flex items-center gap-1"><Frown size={12} className="text-red-500" /> Pain</span>
                    <span className="flex items-center gap-1"><Lightbulb size={12} className="text-green-500" /> Opportunity</span>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto custom-scrollbar pb-2">
                <div className="min-w-[900px] grid grid-cols-4 gap-4 h-full">
                    {phases.map((p, i) => (
                        <div key={i} className="flex flex-col gap-3 h-full group">
                            {/* Phase Header */}
                            <div className="p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-center mb-2 shadow-lg">
                                <h4 className="text-white font-display font-medium text-sm">{p.phase}</h4>
                            </div>

                            {/* Goal Card */}
                            <div className="p-4 bg-[#fef3c7]/5 border border-yellow-500/20 rounded-lg flex-1 hover:bg-[#fef3c7]/10 transition-colors flex flex-col gap-2">
                                <div className="text-[10px] text-yellow-500 uppercase tracking-wider font-bold opacity-70">User Goal</div>
                                <p className="text-zinc-300 text-xs leading-relaxed">{p.goal}</p>
                            </div>

                            {/* Pain Card */}
                            <div className="p-4 bg-[#fee2e2]/5 border border-red-500/20 rounded-lg flex-1 hover:bg-[#fee2e2]/10 transition-colors flex flex-col gap-2">
                                <div className="text-[10px] text-red-500 uppercase tracking-wider font-bold opacity-70">Frustration</div>
                                <p className="text-zinc-300 text-xs leading-relaxed">{p.pain}</p>
                            </div>

                            {/* Opportunity Card */}
                            <div className="p-4 bg-[#dcfce7]/5 border border-green-500/20 rounded-lg flex-1 hover:bg-[#dcfce7]/10 transition-colors flex flex-col gap-2 bg-gradient-to-b from-green-500/5 to-transparent">
                                <div className="text-[10px] text-green-500 uppercase tracking-wider font-bold opacity-70">Opportunity</div>
                                <p className="text-zinc-300 text-xs leading-relaxed">{p.opp}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const ResearchVisuals = () => {
    const [activeTab, setActiveTab] = useState<'moscow' | 'empathy'>('moscow');

    return (
        <div className="w-full mt-8">
            <div className="flex gap-2 mb-4 bg-zinc-900/50 p-1 rounded-lg w-fit border border-line">
                <button
                    onClick={() => setActiveTab('moscow')}
                    className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-300 ${activeTab === 'moscow' ? 'bg-zinc-800 text-white shadow-lg border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300 border border-transparent'}`}
                >
                    MoSCoW Method
                </button>
                <button
                    onClick={() => setActiveTab('empathy')}
                    className={`px-4 py-2 rounded-md text-xs font-medium transition-all duration-300 ${activeTab === 'empathy' ? 'bg-zinc-800 text-white shadow-lg border border-zinc-700' : 'text-zinc-500 hover:text-zinc-300 border border-transparent'}`}
                >
                    Empathy Mapping
                </button>
            </div>

            <div className="animate-fade-in relative group">
                <div className="relative">
                    {activeTab === 'moscow' ? <MoSCoWBoard /> : <EmpathyMap />}
                </div>
            </div>
        </div>
    )
}


// --- Main Component ---

const TimelineItem = ({ label, title, desc, tags, children }: { label: string; title?: string; desc?: React.ReactNode; tags: string[], children?: React.ReactNode }) => (
    <div className="group relative grid grid-cols-1 md:grid-cols-12 border-x border-b border-line bg-background/60 backdrop-blur-sm hover:bg-surfaceHighlight/30 transition-colors">

        {/* Left Column (Metadata) - Reduced width */}
        <div className="md:col-span-3 p-8 md:p-12 md:border-r border-line flex flex-col justify-start">
            <div className="flex items-center gap-3 mb-2">
                {/* Standardized Active State Color */}
                <div className="w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent">{label}</span>
            </div>
        </div>

        {/* Right Column (Content) - Increased width */}
        <div className="md:col-span-9 p-8 md:p-12">
            {title && <h3 className="text-xl md:text-2xl font-display font-medium text-white mb-6">{title}</h3>}

            {/* Description allows for React Nodes now */}
            {desc && <div className="text-secondary leading-relaxed mb-8 max-w-2xl">
                {desc}
            </div>}

            {/* Tags - Now conditionally rendered */}
            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-6">
                    {tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 rounded-full border border-line bg-surface text-xs text-zinc-400">
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Visual Attachment Slot */}
            {children}
        </div>
    </div>
);

export const SectionResearch = () => {
    return (
        <section id="research" className="bg-transparent border-b border-line">
            <div className="max-w-7xl mx-auto relative z-10 w-full">

                {/* Section Header */}
                <div className="px-6 py-12 md:py-20 border-t border-x border-b border-line bg-background/50 backdrop-blur-sm">
                    <div className="max-w-3xl">
                        <div className="flex items-baseline gap-4 mb-6">
                            <span className="text-sm font-mono text-accent opacity-80">[03]</span>
                            <h2 className="text-4xl md:text-5xl font-display font-medium">Design Thinking</h2>
                        </div>
                        <p className="text-lg text-zinc-400">
                            How might we create a centralized "Control Tower" that bubbles up critical issues immediately while keeping routine operations running smoothly?
                        </p>
                    </div>
                </div>

                {/* Timeline Layout */}
                <div className="flex flex-col">

                    <TimelineItem
                        label="Define & Discovery"
                        title="Ensure on-time delivery, Vehicle Telematics data, and resolve delays quickly."
                        desc="Information overload, difficulty spotting delayed orders in a long list, fragmented communication with drivers."
                        tags={['Alerting', 'Desktop Only', 'Real-time tracking']}
                    />

                    <TimelineItem
                        label="Insights & Constraints"
                        tags={[]} // Tags removed
                    >
                        <div className="flex flex-col gap-10">
                            <UserPersona />

                            {/* Restored Constraints */}
                            <div>
                                <h4 className="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-6">Key Constraints</h4>
                                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <li className="bg-surface border border-line p-5 rounded-lg group hover:border-accent/30 transition-colors">
                                        <span className="text-accent font-mono text-xs block mb-2">01. Environment</span>
                                        <p className="text-sm text-zinc-300">
                                            <strong className="text-white block mb-1">Desktop First</strong>
                                            Designed for high-density information usage in a noisy office setting.
                                        </p>
                                    </li>
                                    <li className="bg-surface border border-line p-5 rounded-lg group hover:border-accent/30 transition-colors">
                                        <span className="text-accent font-mono text-xs block mb-2">02. Scope</span>
                                        <p className="text-sm text-zinc-300">
                                            <strong className="text-white block mb-1">Operational Focus</strong>
                                            No bulk actions or financials. Purely real-time fleet operations.
                                        </p>
                                    </li>
                                    <li className="bg-surface border border-line p-5 rounded-lg group hover:border-accent/30 transition-colors">
                                        <span className="text-accent font-mono text-xs block mb-2">03. Tech</span>
                                        <p className="text-sm text-zinc-300">
                                            <strong className="text-white block mb-1">Hardware</strong>
                                            Assumes standard OBD-II sensors and real-time GPS are available.
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </TimelineItem>

                    <TimelineItem
                        label="FINDINGS & CONCLUDE"
                        title="Research to the Solution"
                        desc="The research phase finalized that the primary pain point was not a lack of information, but 'Information Blindness' caused by fragmented data. So discovered that dispatchers were losing critical time switching between three separate tabs to connect a vehicle's mechanical health with its delivery status."
                        tags={['1-3-1 Compartmentalization', 'Semantic Status System', 'Rustic Charm Dark Mode & legible typography']}
                    >
                        {/* Visuals now attached here for flow */}
                        <div className="mt-8">
                            <ResearchVisuals />
                        </div>
                    </TimelineItem>

                </div>
            </div>
        </section>
    );
};