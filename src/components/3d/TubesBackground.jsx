import React, { useEffect, useRef, useState } from 'react';

// Helper for random colors
const randomColors = (count) => {
  return new Array(count)
    .fill(0)
    .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'));
};

function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

export function TubesBackground({ 
  children, 
  className,
  enableClickInteraction = true 
}) {
  const canvasRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const tubesRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let cleanup;

    const initTubes = async () => {
      if (!canvasRef.current) return;

      try {
        const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
        const TubesCursor = module.default;

        if (!mounted) return;

        // Custom styling for a futuristic neon theme
        const app = TubesCursor(canvasRef.current, {
          tubes: {
            colors: ["#00f6ff", "#8A2BE2", "#1a1b41"],
            lights: {
              intensity: 300,
              colors: ["#00f6ff", "#8A2BE2", "#ff008a", "#60aed5"]
            }
          }
        });

        tubesRef.current = app;
        setIsLoaded(true);

        const handleResize = () => {};

        window.addEventListener('resize', handleResize);
        
        cleanup = () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (error) {
        console.error("Failed to load TubesCursor:", error);
      }
    };

    initTubes();

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, []);

  const handleClick = () => {
    if (!enableClickInteraction || !tubesRef.current) return;
    
    // Generate new random colors or swap fixed palettes
    const colors = randomColors(3);
    const lightsColors = randomColors(4);
    
    tubesRef.current.tubes.setColors(colors);
    tubesRef.current.tubes.setLightsColors(lightsColors);
  };

  return (
    <div 
      className={cn("absolute inset-0 w-full h-full overflow-hidden bg-[#050814]", className)}
      onClick={handleClick}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block"
        style={{ touchAction: 'none' }}
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default TubesBackground;
