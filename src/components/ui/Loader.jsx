import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useProgress } from '@react-three/drei';

export default function Loader({ onComplete }) {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const loaderRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Ensures the window scrolls to top before loading finishes
    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    // Fake minimum progress to show animation even if cache is fast
    let obj = { val: 0 };
    const minLoadTween = gsap.to(obj, {
      val: 80, // Go up to 80% automatically over 2 seconds
      duration: 2,
      ease: "power1.inOut",
      onUpdate: () => {
        setDisplayProgress((prev) => Math.max(prev, Math.round(obj.val)));
      }
    });

    return () => {
      minLoadTween.kill();
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    // Real progress from Three.js
    const targetProgress = (!active && progress === 0) ? 100 : progress;
    
    if (targetProgress > displayProgress) {
      let obj = { val: displayProgress };
      gsap.to(obj, {
        val: targetProgress,
        duration: 0.5,
        onUpdate: () => setDisplayProgress(Math.max(displayProgress, Math.round(obj.val)))
      });
    }
  }, [progress, active]);

  useEffect(() => {
    if (displayProgress >= 100 && !isComplete) {
      setIsComplete(true);
      // Small delay at 100% before sliding up
      setTimeout(() => {
        gsap.to(loaderRef.current, {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
          onComplete: () => {
            if (onComplete) onComplete();
          }
        });
      }, 400);
    }
  }, [displayProgress, isComplete, onComplete]);

  return (
    <div ref={loaderRef} className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050814] text-white overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00f6ff]/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Animated Orbs */}
        <div className="relative w-24 h-24 mb-4 flex items-center justify-center">
          <div className="absolute inset-0 border-t-2 border-[#00f6ff] rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
          <div className="absolute inset-2 border-r-2 border-[#8A2BE2] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          <div className="absolute inset-4 border-b-2 border-white rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
          
          <div className="w-2 h-2 bg-[#00f6ff] rounded-full shadow-[0_0_15px_#00f6ff]"></div>
        </div>
        
        {/* Percentage Counter */}
        <div className="font-display text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f6ff] to-[#8A2BE2]">
          {displayProgress}%
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-64 md:w-80 h-1.5 bg-white/10 rounded-full overflow-hidden mt-2 relative">
          <div 
            className="h-full bg-gradient-to-r from-[#00f6ff] to-[#8A2BE2] shadow-[0_0_20px_rgba(0,246,255,0.6)]" 
            style={{ width: `${displayProgress}%`, transition: 'width 0.1s linear' }}
          ></div>
        </div>
        
        <p className="text-gray-500 font-mono text-xs md:text-sm tracking-[0.4em] uppercase mt-4 animate-pulse">
          Initializing Environment ...
        </p>
      </div>

      {/* Decorative corners */}
      <div className="absolute bottom-10 left-10 text-[10px] uppercase font-mono tracking-widest text-white/20">
        SYS.LOAD // 2026<br/>
        NO. 00-11
      </div>
    </div>
  );
}
