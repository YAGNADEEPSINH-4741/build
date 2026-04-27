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
    <div ref={loaderRef} className="fixed inset-0 z-[9999] bg-[#050814] overflow-hidden flex flex-col justify-between p-6 md:p-12">
      
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00f6ff]/5 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top Bar Skeleton */}
      <div className="flex justify-between items-center w-full relative z-10">
        {/* Logo skeleton */}
        <div className="w-12 h-12 bg-white/5 rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.05)] border border-white/10"></div>
        
        {/* Nav links skeleton */}
        <div className="hidden md:flex gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-20 h-4 bg-white/5 rounded animate-pulse border border-white/10" style={{ animationDelay: `${i * 0.15}s` }}></div>
          ))}
        </div>
        
        {/* Mobile menu / right action skeleton */}
        <div className="w-32 h-10 bg-white/5 rounded-full animate-pulse border border-white/10"></div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full gap-6 mt-16 md:mt-0 relative z-10">
        <div className="w-40 h-6 bg-gradient-to-r from-[#00f6ff]/20 to-transparent rounded animate-pulse mb-4"></div>
        <div className="w-4/5 md:w-3/5 h-16 md:h-24 bg-white/5 rounded-lg animate-pulse border border-white/5" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3/4 md:w-2/5 h-16 md:h-24 bg-white/5 rounded-lg animate-pulse border border-white/5" style={{ animationDelay: '0.4s' }}></div>
        <div className="w-full md:w-1/3 h-20 md:h-32 bg-white/5 rounded-lg animate-pulse mt-8 border border-white/5" style={{ animationDelay: '0.6s' }}></div>
        
        <div className="flex gap-4 mt-8">
           <div className="w-32 h-12 bg-[#00f6ff]/10 rounded-full animate-pulse border border-[#00f6ff]/20" style={{ animationDelay: '0.8s' }}></div>
           <div className="w-32 h-12 bg-white/5 rounded-full animate-pulse border border-white/10" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* 3D Object Skeleton placeholder */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite] opacity-30 pointer-events-none mix-blend-screen">
        <div className="absolute inset-10 border border-[#00f6ff]/20 rounded-full border-dashed animate-[spin_15s_linear_infinite_reverse]"></div>
        <div className="absolute inset-32 border border-[#8A2BE2]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#00f6ff]/5 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Bottom section with progress */}
      <div className="w-full flex flex-col md:flex-row justify-between items-end gap-6 relative z-10">
        <div className="flex flex-col gap-3 w-full md:w-1/3">
          <div className="flex justify-between items-center text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase">
            <span className="text-gray-500 animate-pulse">Initializing Environment</span>
            <span className="text-[#00f6ff] font-bold">{displayProgress}%</span>
          </div>
          {/* Progress bar */}
          <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00f6ff] to-[#8A2BE2] shadow-[0_0_15px_rgba(0,246,255,0.8)] relative" 
              style={{ width: `${displayProgress}%`, transition: 'width 0.1s linear' }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-10 bg-white/50 blur-[2px]"></div>
            </div>
          </div>
        </div>

        {/* Decorative corner */}
        <div className="text-[10px] uppercase font-mono tracking-[0.2em] text-white/20 hidden md:block text-right">
          SYS.LOAD // 2026<br/>
          AWAITING . . .
        </div>
      </div>
    </div>
  );
}
