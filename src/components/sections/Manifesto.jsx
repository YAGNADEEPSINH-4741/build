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
      // Text reveal on scroll timeline
      gsap.fromTo(
        textRef.current.children,
        { opacity: 0.1, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative py-24 md:py-48 flex items-center justify-center bg-[#050814] border-y border-white/5"
    >
      <div
        ref={textRef}
        className="flex flex-wrap justify-center items-center gap-6 md:gap-x-12 md:gap-y-8 px-6 md:px-24 max-w-7xl mx-auto text-center"
      >
        <span className="text-4xl md:text-7xl lg:text-[7rem] font-display font-light text-white tracking-tight">
          I don't just write code
        </span>

        <Sparkles className="w-12 h-12 md:w-24 md:h-24 text-[#00f6ff] flex-shrink-0 animate-pulse" />

        <span className="text-4xl md:text-7xl lg:text-[7rem] font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00f6ff] to-[#8A2BE2] tracking-tighter shadow-sm w-full lg:w-auto">
          I design experiences.
        </span>

        <span className="text-2xl md:text-5xl lg:text-[5rem] font-sans font-medium text-gray-500 italic lowercase w-full mt-8 md:mt-12">
          crafting systems that scale,
        </span>

        <div className="w-full flex justify-center my-4 md:my-8">
          <svg
            className="w-24 h-12 md:w-48 md:h-24 stroke-[#8A2BE2]"
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
        </div>

        <span className="text-4xl md:text-7xl lg:text-[7rem] font-display font-light text-white uppercase tracking-widest">
          Where Logic
        </span>

        <span className="text-4xl md:text-7xl lg:text-[7rem] font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
          Meets Magic
        </span>

        <div className="w-full flex justify-center my-8 md:my-12">
          <Zap className="w-16 h-16 md:w-32 md:h-32 text-[#ff008a] drop-shadow-[0_0_20px_rgba(255,0,138,0.5)]" />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-12 w-full">
          <span
            className="text-4xl md:text-7xl lg:text-[7rem] font-display font-black outline-text text-transparent tracking-tighter"
            style={{ WebkitTextStroke: "2px #00f6ff" }}
          >
            Pixels
          </span>

          <div className="hidden md:block w-3 h-3 md:w-6 md:h-6 bg-[#00f6ff] rounded-full shadow-[0_0_20px_#00f6ff]"></div>

          <span
            className="text-4xl md:text-7xl lg:text-[7rem] font-display font-black outline-text text-transparent tracking-tighter"
            style={{ WebkitTextStroke: "2px #8A2BE2" }}
          >
            Performance
          </span>

          <div className="hidden md:block w-3 h-3 md:w-6 md:h-6 bg-[#8A2BE2] rounded-full shadow-[0_0_20px_#8A2BE2]"></div>

          <span className="text-4xl md:text-7xl lg:text-[7rem] font-display font-black text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Perfection.
          </span>
        </div>

        <div className="w-full flex justify-center items-center flex-wrap gap-6 md:gap-12 mt-12 md:mt-24">
          <Code2 className="w-12 h-12 md:w-24 md:h-24 text-[#00f6ff]" />

          <span className="text-3xl md:text-5xl lg:text-[6rem] font-display font-light text-gray-400 underline decoration-[#8A2BE2] decoration-4 md:decoration-8 underline-offset-[10px] md:underline-offset-[20px]">
            Welcome to the edge of the web.
          </span>
        </div>
      </div>
    </section>
  );
}
