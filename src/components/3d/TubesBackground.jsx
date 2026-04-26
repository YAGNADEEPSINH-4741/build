import React, { useEffect, useRef, useState } from 'react';

const randomColors = (count) =>
  new Array(count).fill(0).map(() => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));

function cn(...inputs) { return inputs.filter(Boolean).join(' '); }

export function TubesBackground({ children, className, enableClickInteraction = true }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const tubesRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    let mounted = true;
    let cleanup;
    const container = containerRef.current;
    if (!container) return;

    // Only load the heavy CDN script once the hero is in view
    const io = new IntersectionObserver(async ([entry]) => {
      isVisibleRef.current = entry.isIntersecting;
      if (entry.isIntersecting && !tubesRef.current && canvasRef.current) {
        try {
          const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
          if (!mounted) return;
          const TubesCursor = module.default;
          const app = TubesCursor(canvasRef.current, {
            tubes: {
              colors: ['#00f6ff', '#8A2BE2', '#1a1b41'],
              lights: { intensity: 200, colors: ['#00f6ff', '#8A2BE2', '#ff008a', '#60aed5'] }
            }
          });
          tubesRef.current = app;
          setIsLoaded(true);
        } catch (e) {
          console.error('Failed to load TubesCursor:', e);
        }
      }
    }, { threshold: 0.1 });
    io.observe(container);

    cleanup = () => { io.disconnect(); };
    return () => { mounted = false; if (cleanup) cleanup(); };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;
    tubesRef.current.tubes.setColors(randomColors(3));
    tubesRef.current.tubes.setLightsColors(randomColors(4));
  };

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 w-full h-full overflow-hidden bg-[#050814]', className)}
      onClick={handleClick}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" style={{ touchAction: 'none' }} />
      <div className="relative z-10 w-full h-full pointer-events-none">{children}</div>
    </div>
  );
}

export default TubesBackground;
