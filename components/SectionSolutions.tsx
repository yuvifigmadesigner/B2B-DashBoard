import React, { useState, useEffect, useRef } from 'react';
import { GridContainer, GridCell, SectionTitle, Badge } from './UI';
import {
    BarChart3,
    Zap, Map, Truck, Navigation,
    Layout, Layers, Package, Settings, Bell, Search,
    ChevronLeft, ChevronRight, Monitor, PlayCircle, MoreHorizontal, TrendingUp,
    AlertTriangle, Phone, FileText, CheckCircle, Clock
} from 'lucide-react';

// --- Desktop Frame Component ---
const DesktopFrame = ({ children }: { children?: React.ReactNode }) => (
    <div className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-background rounded-xl md:rounded-2xl border border-line shadow-2xl overflow-hidden flex flex-col transition-all duration-500">
        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden bg-background">
            {children}
        </div>
    </div>
);

// --- Layout Base (Sidebar + Content) ---
const DesktopLayout = ({ children, activeNav = 'dashboard', isWireframe = false }: { children?: React.ReactNode, activeNav?: string, isWireframe?: boolean }) => {
    const navItems = [
        { id: 'dashboard', icon: Layers, label: 'Dashboard' },
        { id: 'analytics', icon: BarChart3, label: 'Analytics' },
        { id: 'fleet', icon: Truck, label: 'Fleet' },
        { id: 'shipments', icon: Package, label: 'Shipments' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className={`flex h-full w-full ${isWireframe ? 'font-mono' : 'font-sans'}`}>
            {/* Sidebar */}
            <div className={`w-16 md:w-64 border-r flex flex-col p-4 gap-2 flex-shrink-0 transition-colors duration-500 ${isWireframe ? 'bg-zinc-900 border-zinc-700' : 'bg-surface border-line'}`}>
                {/* Logo Area */}
                <div className="flex items-center gap-3 mb-8 px-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isWireframe ? 'bg-zinc-800 border border-zinc-600' : 'bg-accent'}`}>
                        {isWireframe ? <div className="w-4 h-4 bg-zinc-600 rounded-sm" /> : <Truck size={18} className="text-white" />}
                    </div>
                    <span className={`hidden md:block font-bold text-lg ${isWireframe ? 'text-zinc-500' : 'text-primary'}`}>Pulse</span>
                </div>

                {/* Nav */}
                {navItems.map((item) => {
                    const isActive = activeNav === item.id;
                    return (
                        <div
                            key={item.id}
                            className={`
                                flex items-center gap-3 p-2 md:px-4 md:py-3 rounded-lg transition-all
                                ${isActive
                                    ? (isWireframe ? 'bg-zinc-800 text-zinc-300 border border-zinc-600' : 'bg-white/10 text-white')
                                    : (isWireframe ? 'text-zinc-600 hover:bg-zinc-800/50' : 'text-secondary hover:text-white')
                                }
                            `}
                        >
                            <item.icon size={20} strokeWidth={isWireframe ? 1.5 : 2} />
                            <span className="hidden md:block text-sm font-medium">{item.label}</span>
                        </div>
                    );
                })}

                {/* Bottom User Profile */}
                <div className="mt-auto pt-4 border-t border-line hidden md:flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${isWireframe ? 'bg-zinc-800 border border-zinc-600' : 'bg-surfaceHighlight'}`}></div>
                    <div className="flex-1">
                        <div className={`h-2.5 w-20 mb-1.5 rounded ${isWireframe ? 'bg-zinc-800' : 'bg-line'}`}></div>
                        <div className={`h-2 w-12 rounded ${isWireframe ? 'bg-zinc-800' : 'bg-line'}`}></div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 relative flex flex-col min-w-0">
                {/* Header */}
                <div className={`h-16 border-b flex items-center justify-between px-6 md:px-8 flex-shrink-0 ${isWireframe ? 'bg-zinc-900 border-zinc-700' : 'bg-surface border-line'}`}>
                    <div className="flex items-center gap-4 text-secondary">
                        <span className="text-sm">Overview</span>
                        <span className="text-zinc-600">/</span>
                        <span className={`text-sm capitalize ${isWireframe ? 'text-zinc-400' : 'text-primary'}`}>{activeNav}</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Search size={20} className="text-zinc-500" />
                        <Bell size={20} className="text-zinc-500" />
                    </div>
                </div>

                {/* Scrollable Canvas */}
                <div className={`flex-1 overflow-hidden relative p-6 md:p-8 ${isWireframe ? 'bg-zinc-950' : 'bg-background'}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

// --- Screen 1: Dashboard (Control Tower) ---
const DashboardContent = () => {
    return (
        <div className="w-full h-full flex flex-col gap-6 animate-fade-in font-mono">
            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-shrink-0">
                {[
                    { label: 'Active Fleet', val: '24' },
                    { label: 'Delayed', val: '3' },
                    { label: 'On Time', val: '98%' },
                    { label: 'Issues', val: '1' }
                ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-xl border bg-zinc-900 border-zinc-700">
                        <div className="text-xs uppercase tracking-wide mb-2 text-zinc-500">{stat.label}</div>
                        <div className="text-2xl font-medium text-zinc-300">{stat.val}</div>
                    </div>
                ))}
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-0">
                {/* Map Area */}
                <div className="md:col-span-2 rounded-xl border bg-zinc-900 border-zinc-700 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-zinc-950">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #333 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <Map size={48} className="text-zinc-800 mb-2" />
                            <span className="text-xs text-zinc-700 uppercase tracking-widest">Map View</span>
                        </div>
                        {/* Wireframe Map Markers */}
                        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-zinc-700 rounded-full border border-zinc-500"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-zinc-700 rounded-full border border-zinc-500"></div>
                        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-zinc-500 rounded-full border border-zinc-300 animate-pulse"></div>
                    </div>
                </div>

                {/* List/Updates */}
                <div className="rounded-xl border p-4 bg-zinc-900 border-zinc-700 overflow-y-auto custom-scrollbar">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-medium text-zinc-400">Recent Activity</span>
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className="flex gap-3 items-start p-2 rounded hover:bg-zinc-800 transition-colors">
                                <div className="w-2 h-2 mt-1.5 rounded-full flex-shrink-0 bg-zinc-600"></div>
                                <div className="flex-1 space-y-1">
                                    <div className="text-xs text-zinc-500">Vehicle {100 + i} arrived at destination</div>
                                    <div className="text-[10px] text-zinc-700">2 mins ago</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- Screen 2: Fleet Map (Tracking) ---
const FleetContent = () => {
    return (
        <div className="w-full h-full flex gap-6 animate-fade-in font-mono">
            {/* Left List */}
            <div className="w-1/3 rounded-xl border flex flex-col bg-zinc-900 border-zinc-700">
                <div className="p-4 border-b border-zinc-800 flex gap-2">
                    <div className="flex-1 h-8 rounded bg-zinc-800 border border-zinc-700"></div>
                    <div className="w-8 h-8 rounded bg-zinc-800 border border-zinc-700"></div>
                </div>
                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className={`p-3 rounded-lg border flex items-center justify-between border-transparent hover:bg-zinc-800/50`}>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-zinc-800">
                                    <Truck size={14} className="text-zinc-500" />
                                </div>
                                <div>
                                    <div className="text-sm font-medium text-zinc-400">VH-{200 + i}</div>
                                    <div className="text-[10px] text-zinc-600">Route A{i} • {i === 2 ? 'Delayed' : 'On Track'}</div>
                                </div>
                            </div>
                            {i === 2 && <AlertTriangle size={14} className="text-zinc-500" />}
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Map */}
            <div className="flex-1 rounded-xl border bg-zinc-900 border-zinc-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-zinc-950">
                    {/* Simplified Map UI */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    {/* Route Line */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <path d="M 100 300 Q 250 100 500 250 T 800 200" fill="none" stroke="#333" strokeWidth="2" strokeDasharray="5,5" />
                    </svg>

                    {/* Vehicle Marker */}
                    <div className="absolute top-[250px] left-[500px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                        <div className="px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-[10px] text-zinc-500 whitespace-nowrap">
                            VH-202 (+45m Delay)
                        </div>
                        <div className="w-4 h-4 rounded-full bg-zinc-700 border-2 border-zinc-500 ring-4 ring-zinc-800"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- Screen 3: Issue Resolution ---
const ResolutionContent = () => {
    return (
        <div className="w-full h-full flex flex-col animate-fade-in font-mono">
            {/* Header Alert */}
            <div className="p-4 rounded-xl border mb-6 flex items-start gap-4 bg-zinc-900 border-zinc-700">
                <div className="p-2 rounded-lg bg-zinc-800">
                    <AlertTriangle className="text-zinc-500" size={24} />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-medium mb-1 text-zinc-300">Shipment #4920 - Delayed Breakdown</h3>
                    <p className="text-sm text-zinc-500">Vehicle VH-202 reported engine failure at Exit 42. Delivery currently at risk.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 rounded text-sm border border-zinc-700 text-zinc-500 hover:bg-zinc-800">Dismiss</button>
                    <button className="px-3 py-1.5 rounded text-sm bg-zinc-800 text-zinc-300 border border-zinc-700 hover:bg-zinc-700">Take Action</button>
                </div>
            </div>

            {/* Detail Grid */}
            <div className="grid grid-cols-3 gap-6 flex-1">
                {/* Left: Info */}
                <div className="col-span-2 rounded-xl border p-6 bg-zinc-900 border-zinc-700">
                    <h4 className="text-sm uppercase tracking-wider text-zinc-500 mb-6">Shipment Timeline</h4>
                    <div className="relative pl-4 border-l border-zinc-800 space-y-8">
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-zinc-700 border border-zinc-500"></div>
                            <div className="text-sm text-zinc-300">Departure from Warehouse A</div>
                            <div className="text-xs text-zinc-500">08:00 AM</div>
                        </div>
                        <div className="relative">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-zinc-600 animate-pulse border border-zinc-400"></div>
                            <div className="text-sm text-zinc-300 font-medium">Engine Alert (OBD-II)</div>
                            <div className="text-xs text-zinc-500">10:42 AM • Current Status</div>
                        </div>
                        <div className="relative opacity-50">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-zinc-800 border border-zinc-700"></div>
                            <div className="text-sm text-zinc-500">Expected Arrival</div>
                            <div className="text-xs text-zinc-600">01:30 PM (Est. +2h)</div>
                        </div>
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col gap-4">
                    <div className="flex-1 rounded-xl border p-4 bg-zinc-900 border-zinc-700">
                        <h4 className="text-xs uppercase tracking-wider text-zinc-500 mb-4">Recommended Actions</h4>
                        <div className="space-y-2">
                            <button className="w-full p-3 rounded-lg border text-left text-sm flex items-center gap-3 transition-colors border-zinc-800 hover:bg-zinc-800/50 group">
                                <Truck size={16} className="text-zinc-600 group-hover:text-zinc-400" />
                                <span className="text-zinc-400">Re-assign to nearby Driver</span>
                            </button>
                            <button className="w-full p-3 rounded-lg border text-left text-sm flex items-center gap-3 transition-colors border-zinc-800 hover:bg-zinc-800/50 group">
                                <Phone size={16} className="text-zinc-600 group-hover:text-zinc-400" />
                                <span className="text-zinc-400">Call Driver (Arjun)</span>
                            </button>
                            <button className="w-full p-3 rounded-lg border text-left text-sm flex items-center gap-3 transition-colors border-zinc-800 hover:bg-zinc-800/50 group">
                                <FileText size={16} className="text-zinc-600 group-hover:text-zinc-400" />
                                <span className="text-zinc-400">Log Incident Report</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// --- Main Section Component ---

const slides = [
    { id: 0, component: DashboardContent, nav: 'dashboard', title: "Dashboard", desc: "A unified view of fleet health and KPIs.", image: "/DASHBOARD.svg", wireframe: "/dashboard.png" },
    { id: 1, component: ResolutionContent, nav: 'shipments', title: "Shipment", desc: "Real-time location with Vehicle timeline status.", image: "/SHIPMENT.svg", wireframe: "/shipment.png" },
    { id: 2, component: FleetContent, nav: 'fleet', title: "Fleet Management", desc: "All In One Control of Fleet in Warehouse.", image: "/FLEET_MANAGEMENT.svg", wireframe: "/fleet.png" }
];

export const SectionSolutions = () => {
    const [activeTab, setActiveTab] = useState<'wireframe' | 'fidelity'>('fidelity');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Auto-play logic
    useEffect(() => {
        if (isPaused) return;

        autoPlayRef.current = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
    }, [isPaused]);

    const handleManualChange = (direction: 'next' | 'prev') => {
        setIsPaused(true); // Pause on manual interaction
        if (direction === 'next') {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        } else {
            setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        }
        // Resume after 10s of inactivity if desired, or just stay paused
    };

    const ActiveComponent = slides[currentSlide].component;

    return (
        <section id="solutions" className="bg-transparent border-b border-line relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto border-x border-line w-full relative z-10">

                <SectionTitle number="02" title="The Solution" />

                {/* Controls Header */}
                <div className="px-6 md:px-12 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-2xl">
                        <p className="text-lg text-secondary mb-4">
                            A high-density "Command Center" that merges real-time vehicle telematics with logistics management into a 1-3-1 vertical layout.
                        </p>
                        {/* Slide Indicators / Title */}
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-accent font-mono uppercase tracking-widest">{slides[currentSlide].title}</span>
                            <span className="text-zinc-600">/</span>
                            <span className="text-zinc-500">{slides[currentSlide].desc}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Tab Toggle */}
                        <div className="bg-surface border border-line p-1 rounded-lg flex items-center">
                            <button
                                onClick={() => setActiveTab('fidelity')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'fidelity' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                High Fidelity
                            </button>
                            <button
                                onClick={() => setActiveTab('wireframe')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'wireframe' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                Wireframe
                            </button>
                        </div>

                        {/* Arrow Controls */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleManualChange('prev')}
                                className="w-10 h-10 rounded-full border border-line bg-surface flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                            >
                                <ChevronLeft size={18} />
                            </button>
                            <button
                                onClick={() => handleManualChange('next')}
                                className="w-10 h-10 rounded-full border border-line bg-surface flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Interactive Preview */}
                <div className="border-t border-line bg-surface/30 backdrop-blur-sm p-4 md:p-8 lg:p-12 relative group">

                    <DesktopFrame>
                        <div className="w-full h-full bg-black relative">
                            <img
                                src={activeTab === 'fidelity' ? slides[currentSlide].image : slides[currentSlide].wireframe}
                                alt={slides[currentSlide].title}
                                className="w-full h-full object-fill"
                            />
                        </div>
                    </DesktopFrame>

                    {/* Pagination Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {slides.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => { setIsPaused(true); setCurrentSlide(idx); }}
                                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${idx === currentSlide ? 'bg-accent w-6' : 'bg-zinc-700 hover:bg-zinc-500'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-t border-line">
                    <div className={`p-8 md:p-12 border-b md:border-b-0 border-line bg-background hover:bg-surface transition-colors group ${currentSlide === 1 ? 'bg-surfaceHighlight/20' : ''}`} onClick={() => { setIsPaused(true); setCurrentSlide(1); }}>
                        <div className="w-12 h-12 rounded-lg bg-surfaceHighlight border border-line flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Package className="text-accent" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-3">Shipment Tracking</h3>
                        <p className="text-secondary text-sm leading-relaxed">
                            Real-time location with Vehicle timeline status and contextual updates.
                        </p>
                    </div>

                    <div className={`p-8 md:p-12 border-b md:border-b-0 md:border-l border-line bg-background hover:bg-surface transition-colors group ${currentSlide === 2 ? 'bg-surfaceHighlight/20' : ''}`} onClick={() => { setIsPaused(true); setCurrentSlide(2); }}>
                        <div className="w-12 h-12 rounded-lg bg-surfaceHighlight border border-line flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Truck className="text-yellow-500" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-3">Fleet Management</h3>
                        <p className="text-secondary text-sm leading-relaxed">
                            All In One Control of Fleet in Warehouse with predictive status monitoring.
                        </p>
                    </div>

                    <div className={`p-8 md:p-12 md:border-l border-line bg-background hover:bg-surface transition-colors group ${currentSlide === 0 ? 'bg-surfaceHighlight/20' : ''}`} onClick={() => { setIsPaused(true); setCurrentSlide(0); }}>
                        <div className="w-12 h-12 rounded-lg bg-surfaceHighlight border border-line flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Layout className="text-green-500" />
                        </div>
                        <h3 className="text-xl font-medium text-white mb-3">Unified Dashboard</h3>
                        <p className="text-secondary text-sm leading-relaxed">
                            Aggregates real-time metrics, fleet status, and critical alerts into a single, actionable dashboard.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};