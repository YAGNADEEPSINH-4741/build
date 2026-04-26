import { useState, useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/ui/Navbar';
import Loader from './components/ui/Loader';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Manifesto from './components/sections/Manifesto';

// Lazy load below-the-fold sections
const Skills    = lazy(() => import('./components/sections/Skills'));
const Projects  = lazy(() => import('./components/sections/Projects'));
const Gallery   = lazy(() => import('./components/sections/Gallery'));
const Contact   = lazy(() => import('./components/sections/Contact'));

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = '';

    const sections = document.querySelectorAll('section:not(#manifesto)');
    sections.forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 80%' } }
      );
    });

    setTimeout(() => { ScrollTrigger.refresh(); }, 100);
  }, [isLoading]);

  return (
    <>
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <div className={`relative w-full bg-[#050814] selection:bg-[#00f6ff]/30 text-gray-200 ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar />
        <main className="pb-32 section-container">
          <Hero />
          <About />
          <Manifesto />
          <Suspense fallback={null}>
            <Skills />
            <Projects />
            <Gallery />
            <Contact />
          </Suspense>
        </main>
      </div>
    </>
  );
}

export default App;
