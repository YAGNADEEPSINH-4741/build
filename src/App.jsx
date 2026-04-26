import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/ui/Navbar';
import Loader from './components/ui/Loader';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Manifesto from './components/sections/Manifesto';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Gallery from './components/sections/Gallery';
import Contact from './components/sections/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      return;
    }
    
    document.body.style.overflow = '';

    // Reveal animations on scroll (excluding the manifesto which has its own GSAP pin logic)
    const sections = document.querySelectorAll('section:not(#manifesto)');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );
    });

    // Refresh ScrollTrigger after loader is gone to ensure correct layout calculations
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className={`relative w-full bg-[#050814] selection:bg-[#00f6ff]/30 text-gray-200 ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar />
        <main className="flex flex-col gap-24 lg:gap-32 pb-32">
          <Hero />
          <About />
          <Manifesto />
          <Skills />
          <Projects />
          <Gallery />
          <Contact />
        </main>
      </div>
    </>
  );
}

export default App;
