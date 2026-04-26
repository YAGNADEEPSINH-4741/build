import React, { useState } from 'react';
import { ImageTrail } from '../ui/ImageTrail';
import { Award, Zap } from 'lucide-react';

export default function Gallery() {
  const [variant, setVariant] = useState(2);

  // Curated premium images representing Coding, Teams, Hackathons, Tech
  const images = [
    'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1523800503107-5bc3ba2a6f81?auto=format&fit=crop&w=600&q=80'
  ];

  const variants = [
    { id: 1, name: 'Classic' },
    { id: 2, name: 'Luminous Bloom' },
    { id: 3, name: 'Upward Drift' },
    { id: 8, name: '3D Space' },
  ];

  return (
    <section id="gallery" className="relative py-24 z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold tracking-widest text-[#00f6ff] uppercase mb-2 flex items-center justify-center gap-2">
          <Award className="w-4 h-4" /> Achievements & Visuals
        </h2>
        <h3 className="font-display text-4xl md:text-5xl font-bold text-white">
          Visual <span className="text-white/40">Journey</span>
        </h3>
        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Hover inside the frame below to reveal a dynamic visual timeline of my coding environments, hackathons, and certifications.
        </p>
      </div>

      <div className="w-full flex flex-col items-center">
        {/* Main Canvas Container */}
        <div className="relative w-full max-w-5xl aspect-[3/4] md:aspect-video rounded-3xl overflow-hidden glass-card shadow-[0_0_50px_rgba(0,246,255,0.05)] border border-white/10 cursor-crosshair group flex items-center justify-center">
          
          {/* Instruction overlay when idle */}
          <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none">
             <div className="px-6 py-3 bg-surface/50 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-3">
               <Zap className="w-4 h-4 text-[#00f6ff]" />
               <span className="font-mono text-sm tracking-wider text-gray-300">WAVE CURSOR HERE</span>
             </div>
          </div>
          
          <ImageTrail items={images} variant={variant} threshold={60} />
          
        </div>

        {/* Variant Controls */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setVariant(v.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                variant === v.id
                  ? 'bg-white text-[#0a0f1c] shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                  : 'bg-surface border border-white/10 text-gray-400 hover:text-white hover:border-white/30'
              }`}
            >
              {v.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
