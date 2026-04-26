import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Code2, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // The horizontal scroll timeline using xPercent for bulletproof width calculation
      gsap.to(textRef.current, {
        xPercent: -100,
        x: () => window.innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          pin: true,
          scrub: 1,
          end: () => "+=" + (textRef.current ? textRef.current.scrollWidth : window.innerWidth * 3),
          invalidateOnRefresh: true, // Handle window resizing accurately
        },
      });
    }, containerRef);

    // Refresh ScrollTrigger when all custom fonts finish loading
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });

    // Also observe the text container for any late width changes
    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });
    
    if (textRef.current) {
      resizeObserver.observe(textRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative h-screen flex items-center bg-[#050814] overflow-hidden border-y border-white/5"
    >
      <div
        ref={textRef}
        className="flex w-max items-center gap-12 md:gap-24 px-12 md:px-24 whitespace-nowrap will-change-transform"
      >
        <span className="text-6xl md:text-8xl lg:text-[10rem] font-display font-light text-white tracking-tight">
          I don't just write code
        </span>

        <Sparkles className="w-16 h-16 md:w-32 md:h-32 text-[#00f6ff] flex-shrink-0 animate-pulse" />

        <span className="text-6xl md:text-8xl lg:text-[10rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f6ff] to-[#8A2BE2] tracking-tighter shadow-sm">
          I design experiences.
        </span>

        {/* Variable gap */}
        <div className="w-[10vw] flex-shrink-0"></div>

        <span className="text-4xl md:text-6xl lg:text-[8rem] font-sans font-medium text-gray-500 italic lowercase">
          crafting systems that scale,
        </span>

        {/* Inline SVG acting as punctuation */}
        <svg
          className="w-32 h-16 md:w-64 md:h-32 flex-shrink-0 stroke-[#8A2BE2]"
          viewBox="0 0 200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,50 C50,100 150,0 200,50"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="10 15"
          />
        </svg>

        <span className="text-6xl md:text-8xl lg:text-[10rem] font-display font-light text-white uppercase tracking-widest">
          Where Logic
        </span>

        <span className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
          Meets Magic.
        </span>

        <div className="w-[15vw] flex-shrink-0"></div>

        <Zap className="w-24 h-24 md:w-48 md:h-48 text-[#ff008a] flex-shrink-0 drop-shadow-[0_0_20px_rgba(255,0,138,0.5)]" />

        <span
          className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black outline-text text-transparent tracking-tighter"
          style={{ WebkitTextStroke: "2px #00f6ff" }}
        >
          Pixels
        </span>

        <div className="w-4 h-4 md:w-8 md:h-8 bg-[#00f6ff] rounded-full flex-shrink-0 shadow-[0_0_20px_#00f6ff]"></div>

        <span
          className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black outline-text text-transparent tracking-tighter"
          style={{ WebkitTextStroke: "2px #8A2BE2" }}
        >
          Performance
        </span>

        <div className="w-4 h-4 md:w-8 md:h-8 bg-[#8A2BE2] rounded-full flex-shrink-0 shadow-[0_0_20px_#8A2BE2]"></div>

        <span className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
          Perfection.
        </span>

        <div className="w-[20vw] flex-shrink-0"></div>

        <Code2 className="w-16 h-16 md:w-32 md:h-32 text-[#00f6ff] flex-shrink-0" />

        <span className="text-5xl md:text-7xl lg:text-[9rem] font-display font-light text-gray-400 underline decoration-[#8A2BE2] decoration-4 underline-offset-[20px]">
          Welcome to the edge of the web.
        </span>

        {/* Buffer block so the animation ends smoothly with text in the middle of screen */}
        <div className="w-[50vw] flex-shrink-0"></div>
      </div>
    </section>
  );
}
