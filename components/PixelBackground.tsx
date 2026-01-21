import React, { useEffect, useRef } from 'react';

export const PixelBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Configuration
    const gap = 24; // Pixel density (lower = more dots)
    const radius = 1; // Dot size
    const spotlightRadius = 400; // Interaction radius
    
    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        // Handle high DPI displays
        const dpr = window.devicePixelRatio || 1;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();

    const draw = () => {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        const cols = Math.ceil(width / gap);
        const rows = Math.ceil(height / gap);
        
        // Base color for dots (very subtle white)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                const x = i * gap + (gap / 2);
                const y = j * gap + (gap / 2);
                
                const dx = mouseX - x;
                const dy = mouseY - y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                let alpha = 0.03; // Base alpha
                
                // Spotlight logic
                if (dist < spotlightRadius) {
                    const highlight = 1 - (dist / spotlightRadius);
                    // Boost alpha based on proximity
                    alpha = 0.03 + (highlight * 0.15); 
                }

                ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        requestAnimationFrame(draw);
    };

    const animationId = requestAnimationFrame(draw);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} />
    </div>
  );
};