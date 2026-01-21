import React, { useState, useRef, useEffect } from 'react';
import { Check, X, ChevronDown, Circle, Layout, Layers, Map, Truck, Package, Search, Filter, User, FileText, Settings, MoreHorizontal, Calendar, Bell, AlertCircle, TrendingUp, Navigation, BarChart3, Clock, Fuel, Wrench, Type, Palette, ArrowRight, CornerDownRight, RotateCcw } from 'lucide-react';
import { SectionTitle } from './UI';

// --- Types & Data ---

interface FlowNode {
  id: string;
  label: string;
  icon?: React.ElementType;
  next?: string[]; 
}

const flowData: Record<string, FlowNode> = {
  // Root
  'root': { id: 'root', label: 'CargoPulse IA', icon: Layout, next: ['dashboard', 'shipments', 'fleet'] },

  // Level 1: Main Pillars
  'dashboard': { id: 'dashboard', label: 'Dashboard', icon: Layers, next: ['dash_controls', 'dash_stats', 'dash_orders', 'dash_updates', 'dash_map'] },
  'shipments': { id: 'shipments', label: 'Shipment Management', icon: Package, next: ['ship_controls', 'ship_list', 'ship_detail'] },
  'fleet': { id: 'fleet', label: 'Fleet Management', icon: Truck, next: ['fleet_controls', 'fleet_grid'] },

  // --- Dashboard Branch ---
  'dash_controls': { id: 'dash_controls', label: 'Header & Controls', icon: Settings, next: ['dc_search', 'dc_filter', 'dc_date', 'dc_csv'] },
  'dc_search': { id: 'dc_search', label: 'Search', icon: Search, next: [] },
  'dc_filter': { id: 'dc_filter', label: 'Global Filter', icon: Filter, next: [] },
  'dc_date': { id: 'dc_date', label: 'Date Picker', icon: Calendar, next: [] },
  'dc_csv': { id: 'dc_csv', label: 'Download CSV', icon: FileText, next: [] },

  'dash_stats': { id: 'dash_stats', label: 'Key Metrics', icon: TrendingUp, next: ['ds_active', 'ds_delayed', 'ds_otr', 'ds_avail'] },
  'ds_active': { id: 'ds_active', label: 'Active Shipment', next: [] },
  'ds_delayed': { id: 'ds_delayed', label: 'Delayed Count', next: [] },
  'ds_otr': { id: 'ds_otr', label: 'On Time Rate', next: [] },
  'ds_avail': { id: 'ds_avail', label: 'Fleet Availability', next: [] },

  'dash_orders': { id: 'dash_orders', label: 'Shipment List', icon: Package, next: ['do_tabs', 'do_card'] },
  'do_tabs': { id: 'do_tabs', label: 'Tabs', next: [] },
  'do_card': { id: 'do_card', label: 'Order Card', icon: Layout, next: ['doc_header', 'doc_route', 'doc_status'] },
  'doc_header': { id: 'doc_header', label: 'Company & ID', next: [] },
  'doc_route': { id: 'doc_route', label: 'Route', next: [] },
  'doc_status': { id: 'doc_status', label: 'Status Badge', next: [] },

  'dash_updates': { id: 'dash_updates', label: 'Updates Panel', icon: Bell, next: ['du_urgent', 'du_recent'] },
  'du_urgent': { id: 'du_urgent', label: 'Urgent Alerts', icon: AlertCircle, next: [] },
  'du_recent': { id: 'du_recent', label: 'Recent Activity', next: [] },

  'dash_map': { id: 'dash_map', label: 'Live Tracking', icon: Map, next: ['dm_view', 'dm_driver'] },
  'dm_view': { id: 'dm_view', label: 'Map Vis', next: [] },
  'dm_driver': { id: 'dm_driver', label: 'Driver Overlay', icon: User, next: [] },


  // --- Shipments Branch ---
  'ship_controls': { id: 'ship_controls', label: 'Actions', icon: Settings, next: ['sc_add', 'sc_search'] },
  'sc_add': { id: 'sc_add', label: 'Add Order', next: [] },
  'sc_search': { id: 'sc_search', label: 'Global Search', icon: Search, next: [] },

  'ship_list': { id: 'ship_list', label: 'Order List', icon: Layout, next: ['sl_tabs', 'sl_cards'] },
  'sl_tabs': { id: 'sl_tabs', label: 'Status Tabs', next: [] },
  'sl_cards': { id: 'sl_cards', label: 'Order Cards', next: ['slc_id', 'slc_status', 'slc_route'] },
  'slc_id': { id: 'slc_id', label: 'Company Name', next: [] },
  'slc_status': { id: 'slc_status', label: 'Risk Badge', next: [] },
  'slc_route': { id: 'slc_route', label: 'Route Dates', next: [] },

  'ship_detail': { id: 'ship_detail', label: 'Details View', icon: FileText, next: ['sd_header', 'sd_actions', 'sd_tabs'] },
  
  'sd_header': { id: 'sd_header', label: 'Primary Info', next: ['sdh_meta', 'sdh_vehicle'] },
  'sdh_meta': { id: 'sdh_meta', label: 'Order #', next: [] },
  'sdh_vehicle': { id: 'sdh_vehicle', label: 'Vehicle Info', next: [] },

  'sd_actions': { id: 'sd_actions', label: 'Quick Actions', icon: Settings, next: ['sda_contact', 'sda_doc'] },
  'sda_contact': { id: 'sda_contact', label: 'Call / Alert', next: [] },
  'sda_doc': { id: 'sda_doc', label: 'Upload Doc', next: [] },

  'sd_tabs': { id: 'sd_tabs', label: 'View Modes', icon: Layout, next: ['sdt_track', 'sdt_det', 'sdt_ana'] },
  'sdt_det': { id: 'sdt_det', label: 'Details Tab', next: [] },
  'sdt_ana': { id: 'sdt_ana', label: 'Analytics Tab', next: [] },
  'sdt_track': { id: 'sdt_track', label: 'Track Order', next: ['trk_timeline', 'trk_steps'] },
  
  'trk_timeline': { id: 'trk_timeline', label: 'Timeline', icon: Clock, next: ['tt_chart'] },
  'tt_chart': { id: 'tt_chart', label: 'Status Bar', next: [] },
  
  'trk_steps': { id: 'trk_steps', label: 'Milestones', icon: Navigation, next: ['ts_past', 'ts_current', 'ts_future'] },
  'ts_past': { id: 'ts_past', label: 'Departure', next: [] },
  'ts_current': { id: 'ts_current', label: 'Live Loc', next: [] },
  'ts_future': { id: 'ts_future', label: 'Arrival', next: [] },


  // --- Fleet Branch ---
  'fleet_controls': { id: 'fleet_controls', label: 'Controls', icon: Settings, next: ['fc_add', 'fc_filters'] },
  'fc_add': { id: 'fc_add', label: 'Add Fleet', next: [] },
  'fc_filters': { id: 'fc_filters', label: 'View Toggle', icon: Layout, next: [] },

  'fleet_grid': { id: 'fleet_grid', label: 'Vehicle Grid', icon: Layout, next: ['fg_card'] },
  'fg_card': { id: 'fg_card', label: 'Vehicle Card', icon: Truck, next: ['fgc_header', 'fgc_driver', 'fgc_load', 'fgc_maint'] },
  
  'fgc_header': { id: 'fgc_header', label: 'ID', next: ['id_name', 'id_status'] },
  'id_name': { id: 'id_name', label: 'Reg & Model', next: [] },
  'id_status': { id: 'id_status', label: 'Status', next: [] },

  'fgc_driver': { id: 'fgc_driver', label: 'Driver', icon: User, next: ['dr_info', 'dr_action'] },
  'dr_info': { id: 'dr_info', label: 'Hours', next: [] },
  'dr_action': { id: 'dr_action', label: 'Call', next: [] },

  'fgc_load': { id: 'fgc_load', label: 'Capacity', icon: BarChart3, next: ['ld_bar'] },
  'ld_bar': { id: 'ld_bar', label: 'Tonnage Bar', next: [] },

  'fgc_maint': { id: 'fgc_maint', label: 'Health', icon: Wrench, next: ['mt_service', 'mt_fuel'] },
  'mt_service': { id: 'mt_service', label: 'Service Days', next: [] },
  'mt_fuel': { id: 'mt_fuel', label: 'Fuel', icon: Fuel, next: [] },
};

// --- Interactive Tree Component ---

const InteractiveTree = () => {
    const [path, setPath] = useState<string[]>(['root']);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleNodeClick = (nodeId: string) => {
        const existingIndex = path.indexOf(nodeId);
        
        if (existingIndex !== -1) {
            // If clicking an existing ancestor, truncate path back to it
            setPath(path.slice(0, existingIndex + 1));
        } else {
            const leafId = path[path.length - 1];
            const leaf = flowData[leafId];

            if (leaf && leaf.next?.includes(nodeId)) {
                setPath([...path, nodeId]);
                return;
            }

            // Check if sibling (changing branches)
            for (let i = path.length - 2; i >= 0; i--) {
                const parentId = path[i];
                const parent = flowData[parentId];
                if (parent.next?.includes(nodeId)) {
                    const newPath = path.slice(0, i + 1);
                    newPath.push(nodeId);
                    setPath(newPath);
                    return;
                }
            }
        }
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            setTimeout(() => {
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }, [path]);

    const resetTree = () => setPath(['root']);

    return (
        <div className="w-full relative group">
             {/* Header with Reset */}
             <div className="absolute top-4 right-4 z-20">
                <button 
                    onClick={resetTree}
                    className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors border border-white/5 shadow-lg"
                    title="Reset Flow"
                >
                    <RotateCcw size={16} />
                </button>
             </div>

             {/* Main Scroll Container */}
             <div 
                ref={scrollContainerRef}
                className="flex flex-col items-center py-16 px-4 h-[600px] bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-y-auto relative custom-scrollbar shadow-2xl"
             >
                 {/* Tech Grid Background */}
                 <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                      style={{ 
                          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                          backgroundSize: '32px 32px'
                      }} 
                 />

                 {/* Render Path Nodes */}
                 {path.map((nodeId, index) => {
                     const node = flowData[nodeId];
                     const isLast = index === path.length - 1;
                     const Icon = node.icon || Circle;
                     
                     // Styling for Path Nodes
                     const nodeBaseClasses = "flex items-center gap-3 px-6 py-3 rounded-lg border backdrop-blur-md transition-all duration-300 relative z-10 w-64 justify-center";
                     const activeClasses = "bg-surface border-accent text-white shadow-[0_0_15px_rgba(59,130,246,0.3)] ring-1 ring-accent/50 scale-105 font-medium";
                     const inactiveClasses = "bg-zinc-900/90 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 cursor-pointer";

                     return (
                         <div key={nodeId} className="flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                             
                             {/* Connector Line Above */}
                             {index > 0 && (
                                <div className="h-8 w-px bg-zinc-800"></div>
                             )}

                             {/* Node Card */}
                             <div 
                                onClick={() => handleNodeClick(nodeId)}
                                className={`${nodeBaseClasses} ${isLast ? activeClasses : inactiveClasses}`}
                             >
                                 <Icon size={16} className={isLast ? 'text-accent' : 'text-zinc-600'} />
                                 <span className="tracking-tight text-sm">{node.label}</span>
                                 
                                 {/* Active Indicator Dot */}
                                 {isLast && (
                                     <div className="absolute -right-1 -top-1 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_#3B82F6]"></div>
                                 )}
                             </div>
                         </div>
                     );
                 })}

                 {/* Render Next Options (Branches) */}
                 {(() => {
                     const lastNodeId = path[path.length - 1];
                     const lastNode = flowData[lastNodeId];
                     
                     if (lastNode && lastNode.next && lastNode.next.length > 0) {
                         return (
                             <div className="flex flex-col items-center w-full animate-fade-in">
                                {/* Vertical Stem from Parent */}
                                <div className="h-8 w-px bg-zinc-800"></div>
                                
                                {/* Branch Container */}
                                <div className="relative pt-6 px-4 w-full flex justify-center">
                                    {/* Horizontal Connector Line (Bracket) */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-zinc-800"></div>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-6 bg-zinc-800"></div>

                                    {/* Options Grid */}
                                    <div className="flex flex-wrap justify-center gap-4 max-w-4xl relative z-10">
                                        {lastNode.next.map((nextId, i) => {
                                            const nextNode = flowData[nextId];
                                            const Icon = nextNode.icon || Circle;
                                            return (
                                                <div 
                                                    key={nextId}
                                                    onClick={() => handleNodeClick(nextId)}
                                                    className={`
                                                        group relative flex flex-col items-center gap-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 
                                                        hover:bg-zinc-800 hover:border-zinc-600 hover:shadow-lg cursor-pointer transition-all duration-200
                                                        w-32 md:w-40 text-center
                                                    `}
                                                    style={{ animationDelay: `${i * 30}ms` }}
                                                >
                                                    {/* Top Connector stub */}
                                                    <div className="absolute -top-6 left-1/2 w-px h-6 bg-zinc-800 group-hover:bg-zinc-600 transition-colors"></div>
                                                    
                                                    <div className="w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center group-hover:border-zinc-600 transition-colors">
                                                        <Icon size={14} className="text-zinc-500 group-hover:text-white transition-colors" />
                                                    </div>
                                                    <span className="text-xs text-zinc-400 group-hover:text-white font-medium leading-tight">
                                                        {nextNode.label}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                             </div>
                         )
                     }
                     
                     // End of Branch Indicator
                     if (lastNode && (!lastNode.next || lastNode.next.length === 0)) {
                         return (
                             <div className="flex flex-col items-center gap-2 mt-4 opacity-50">
                                 <div className="w-px h-8 bg-zinc-800"></div>
                                 <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                             </div>
                         )
                     }
                 })()}
                 
                 {/* Bottom Padding */}
                 <div className="h-32 flex-shrink-0" />
             </div>
             
             {/* Interaction Hint */}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-zinc-400 text-[10px] font-mono uppercase tracking-widest bg-black/90 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-2xl flex items-center gap-2">
                    <CornerDownRight size={12} className="text-accent"/>
                    Select a node to expand
                </p>
            </div>
        </div>
    );
};


// --- Section Design Component ---

export const SectionDesign = () => {
  return (
    <section id="design" className="bg-transparent border-b border-line">
      <div className="max-w-7xl mx-auto border-x border-line py-20 px-4 w-full relative z-10">
        
        {/* Architecture Section */}
        <SectionTitle number="04" title="Information Architecture" />

        <div className="flex flex-col gap-12 mb-20">
             <div className="md:w-3/4 px-6">
                 <p className="text-lg text-secondary">
                     A simplified top-down mind map of the CargoPulse system. This structure ensures users can access critical fleet data within 2 clicks from the dashboard.
                 </p>
             </div>
             
             {/* Interactive Flow Container */}
             <div className="w-full">
                <InteractiveTree />
             </div>
        </div>

        <h3 className="text-2xl font-display font-medium mb-8">Design Decisions</h3>
        
        {/* Design Decisions Grid (Styles + Outcomes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-line gap-px border border-line">
            
            {/* 1. Typography Card */}
            <div className="bg-background p-10 flex flex-col h-full relative group overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Type size={120} />
                 </div>
                 <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div className="p-1.5 bg-surface rounded border border-line"><Type size={16} className="text-white"/></div>
                    <h4 className="font-mono text-sm uppercase tracking-wide text-secondary">Typography</h4>
                </div>
                
                <div className="space-y-8 relative z-10 flex-1 flex flex-col justify-center">
                    <div className="border-l-2 border-line pl-4">
                        <span className="text-secondary text-xs font-mono mb-1 block uppercase tracking-wider">Primary</span>
                        <div className="font-sans text-4xl md:text-5xl text-primary tracking-tight font-bold">Inter</div>
                        <div className="text-secondary text-sm mt-2 font-sans">The quick brown fox jumps over the lazy dog.</div>
                    </div>
                    <div className="border-l-2 border-line pl-4">
                        <span className="text-secondary text-xs font-mono mb-1 block uppercase tracking-wider">Secondary / Numbers</span>
                        <div className="font-mono text-2xl md:text-3xl text-primary">JetBrains Mono</div>
                        <div className="text-secondary text-sm mt-2 font-mono">123,456,789.00</div>
                    </div>
                </div>
            </div>

            {/* 2. Colors Card - Updated with Status Colors */}
            <div className="bg-background p-10 flex flex-col h-full relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Palette size={120} />
                 </div>
                <div className="flex items-center gap-3 mb-8 relative z-10">
                    <div className="p-1.5 bg-surface rounded border border-line"><Palette size={16} className="text-white"/></div>
                    <h4 className="font-mono text-sm uppercase tracking-wide text-secondary">Rustic Charm</h4>
                </div>

                <div className="relative z-10 flex-1 flex flex-col justify-center gap-8">
                     {/* Visual Swatches - Matching the 5-bar image */}
                     <div className="flex w-full h-32 rounded-lg overflow-hidden ring-1 ring-white/10 shadow-2xl">
                        <div className="flex-1 bg-[#FFFCF2] flex flex-col justify-end p-2 group/c">
                             <span className="text-[8px] font-mono text-black/40 opacity-0 group-hover/c:opacity-100 uppercase -rotate-90 origin-bottom-left translate-x-2 mb-1">Cream</span>
                        </div>
                        <div className="flex-1 bg-[#CCC5B9] flex flex-col justify-end p-2 group/c">
                             <span className="text-[8px] font-mono text-black/40 opacity-0 group-hover/c:opacity-100 uppercase -rotate-90 origin-bottom-left translate-x-2 mb-1">Beige</span>
                        </div>
                        <div className="flex-1 bg-[#403D39] flex flex-col justify-end p-2 group/c">
                             <span className="text-[8px] font-mono text-white/40 opacity-0 group-hover/c:opacity-100 uppercase -rotate-90 origin-bottom-left translate-x-2 mb-1">Olive</span>
                        </div>
                        <div className="flex-1 bg-[#252422] flex flex-col justify-end p-2 group/c">
                             <span className="text-[8px] font-mono text-white/40 opacity-0 group-hover/c:opacity-100 uppercase -rotate-90 origin-bottom-left translate-x-2 mb-1">Black</span>
                        </div>
                        <div className="flex-1 bg-[#EB5E28] flex flex-col justify-end p-2 group/c">
                             <span className="text-[8px] font-mono text-white/60 opacity-0 group-hover/c:opacity-100 uppercase -rotate-90 origin-bottom-left translate-x-2 mb-1">Flame</span>
                        </div>
                     </div>

                     {/* Hex Data */}
                     <div className="space-y-2">
                         {/* Border */}
                         <div className="flex justify-between items-center text-xs font-mono border-b border-line pb-1">
                             <span className="text-zinc-500">Border</span>
                             <div className="flex items-center gap-2">
                                 <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: '#CCC5B9', opacity: 0.15 }}></div>
                                 <span className="text-zinc-400">#CCC5B9 (15%)</span>
                             </div>
                         </div>
                         {/* In Transit */}
                         <div className="flex justify-between items-center text-xs font-mono border-b border-line pb-1">
                             <span className="text-zinc-500">In Transit</span>
                             <div className="flex items-center gap-2">
                                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#3B82F6' }}></div>
                                 <span className="text-zinc-300">#3B82F6</span>
                             </div>
                         </div>
                         {/* Pending */}
                         <div className="flex justify-between items-center text-xs font-mono border-b border-line pb-1">
                             <span className="text-zinc-500">Pending</span>
                             <div className="flex items-center gap-2">
                                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }}></div>
                                 <span className="text-zinc-300">#F59E0B</span>
                             </div>
                         </div>
                         {/* Delay */}
                         <div className="flex justify-between items-center text-xs font-mono border-b border-line pb-1">
                             <span className="text-zinc-500">Delay</span>
                             <div className="flex items-center gap-2">
                                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#6E0000' }}></div>
                                 <span className="text-zinc-300">#6E0000</span>
                             </div>
                         </div>
                         {/* Alerts */}
                         <div className="flex justify-between items-center text-xs font-mono border-b border-line pb-1">
                             <span className="text-zinc-500">Alerts</span>
                             <div className="flex items-center gap-2">
                                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF5253' }}></div>
                                 <span className="text-zinc-300">#FF5253</span>
                             </div>
                         </div>
                         {/* Completed */}
                         <div className="flex justify-between items-center text-xs font-mono pb-1">
                             <span className="text-zinc-500">Completed</span>
                             <div className="flex items-center gap-2">
                                 <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10B981' }}></div>
                                 <span className="text-zinc-300">#10B981</span>
                             </div>
                         </div>
                     </div>
                </div>
            </div>

            {/* 3. Before (Friction Points) */}
            <div className="bg-background p-10">
                <div className="flex items-center gap-3 mb-6 text-red-400">
                    <div className="p-1.5 bg-red-500/10 rounded border border-red-500/20"><X size={16} /></div>
                    <h4 className="font-mono text-sm uppercase tracking-wide">Friction Points</h4>
                </div>
                <ul className="space-y-6">
                    <li className="flex gap-4 text-secondary">
                        <span className="font-mono text-red-500/50">01</span>
                        <p className="text-sm">Spreadsheet-based tracking forced dispatchers to manually cross-reference driver locations with order destinations.</p>
                    </li>
                    <li className="flex gap-4 text-secondary">
                        <span className="font-mono text-red-500/50">02</span>
                        <p className="text-sm">Fragmented communication via phone and WhatsApp led to delayed issue resolution and missed updates.</p>
                    </li>
                    <li className="flex gap-4 text-secondary">
                        <span className="font-mono text-red-500/50">03</span>
                        <p className="text-sm">Lack of live telematics data meant reacting to vehicle breakdowns instead of preventing them proactively.</p>
                    </li>
                    <li className="flex gap-4 text-secondary">
                        <span className="font-mono text-red-500/50">04</span>
                        <p className="text-sm">Low-contrast text and inconsistent color coding resulted in eye fatigue and missed critical alerts during long shifts.</p>
                    </li>
                </ul>
            </div>

            {/* 4. After (Improvements) */}
            <div className="bg-background p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="flex items-center gap-3 mb-6 text-green-400">
                     <div className="p-1.5 bg-green-500/10 rounded border border-green-500/20"><Check size={16} /></div>
                    <h4 className="font-mono text-sm uppercase tracking-wide">Improvements</h4>
                </div>
                <ul className="space-y-6 relative z-10">
                    <li className="flex gap-4 text-secondary">
                        <span className="font-mono text-green-500/50">01</span>
                        <p className="text-sm">Centralized 'Control Tower' dashboard highlights exceptions immediately, removing the need for manual checks.</p>
                    </li>
                    <li className="flex gap-4 text-secondary">
                        <span className="font-mono text-green-500/50">02</span>
                        <p className="text-sm">Integrated driver communication contextually linked to orders ensures seamless info flow.</p>
                    </li>
                    <li className="flex gap-4 text-secondary">
                        <span className="font-mono text-green-500/50">03</span>
                        <p className="text-sm">Real-time OBD-II sensor integration provides instant vehicle health alerts, reducing downtime.</p>
                    </li>
                    <li className="flex gap-4 text-secondary">
                        <span className="font-mono text-green-500/50">04</span>
                        <p className="text-sm">Semantic status colors and legible Inter typography allow dispatchers to scan risk levels in under 2 seconds.</p>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </section>
  );
}