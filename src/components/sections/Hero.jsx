import { ArrowRight, Download, Github } from 'lucide-react';
import TubesBackground from '../3d/TubesBackground';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* 3D Tubes Background */}
      <div className="absolute inset-0 z-0">
        <TubesBackground />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pointer-events-none">
        <div className="max-w-3xl glass-card p-8 md:p-12 lg:p-16 border-t border-l border-white/20 background-blur-xl bg-surface/40 rounded-3xl animate-slide-up shadow-2xl relative overflow-hidden pointer-events-auto">
          
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-[100px] pointer-events-none"></div>

          <p className="text-primary font-medium tracking-widest text-sm md:text-base uppercase mb-4 opacity-90">
            Welcome to my digital space
          </p>
          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl mb-6 text-white leading-tight">
            I'm <span className="text-gradient glow-text block mt-2">Yagnadeepsinh.<br/>C Vaghela</span>
          </h1>
          <h2 className="text-xl md:text-3xl text-gray-300 font-medium mb-8 max-w-2xl leading-relaxed">
            Software Developer <span className="text-primary opacity-50">|</span> Full Stack Enthusiast <span className="text-primary opacity-50">|</span> BCA Final Year
          </h2>
          
          <p className="text-gray-400 text-base md:text-lg max-w-xl mb-12 leading-relaxed">
            Building scalable, user-centric products with modern web technologies. Passionate about writing clean code and solving real-world problems.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#projects" className="group flex items-center gap-2 bg-white text-surface px-8 py-4 rounded-full font-bold hover:bg-primary hover:text-surface transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-[0_0_30px_rgba(0,246,255,0.4)]">
              View Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a href="/resume.pdf" download className="group flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:border-primary hover:bg-primary/10 transition-all duration-300">
              <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              Download Resume
            </a>
          </div>
          
          <p className="text-xs text-white/30 uppercase mt-8 font-mono tracking-widest animate-pulse pointer-events-none">
            * Click the background to randomize tubes
          </p>
        </div>
      </div>
    </section>
  );
}
