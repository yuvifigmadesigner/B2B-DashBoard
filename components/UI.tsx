import React, { ReactNode } from 'react';

// A wrapper that uses gap to create the line effect
export const GridContainer = ({ children, className = '', cols = 12 }: { children?: ReactNode; className?: string; cols?: number }) => {
  const gridCols = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    12: 'md:grid-cols-12',
  }[cols] || 'md:grid-cols-12';

  return (
    <div className={`grid grid-cols-1 ${gridCols} bg-line gap-px border border-line ${className}`}>
      {children}
    </div>
  );
};

// Standard cell within the grid
export const GridCell = ({ 
  children, 
  colSpan = 1, 
  className = '',
  transparent = false
}: { 
  children?: ReactNode; 
  colSpan?: number; 
  className?: string;
  transparent?: boolean;
}) => {
  const colSpanClass = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
  }[colSpan] || 'md:col-span-1';

  return (
    <div className={`${colSpanClass} ${transparent ? 'bg-transparent' : 'bg-background'} ${className}`}>
      {children}
    </div>
  );
};

export const SectionTitle = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-baseline space-x-4 mb-12 px-6 pt-10">
    <span className="text-sm font-mono text-accent opacity-80">[{number}]</span>
    <h2 className="text-4xl md:text-5xl font-display font-medium text-primary tracking-tight">{title}</h2>
  </div>
);

export const Badge = ({ children }: { children?: ReactNode }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surfaceHighlight text-secondary border border-line">
    {children}
  </span>
);

export const FloatingImage = ({ src, alt, className = "" }: { src: string; alt: string; className?: string }) => {
  return (
    <div className={`relative rounded-xl overflow-hidden border border-line shadow-2xl shadow-black/50 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent pointer-events-none mix-blend-overlay" />
        <img src={src} alt={alt} className="w-full h-auto object-cover" />
    </div>
  );
};