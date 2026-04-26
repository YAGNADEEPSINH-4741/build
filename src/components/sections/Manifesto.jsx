import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Code2, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Manifesto() {
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Fade in the background only when reaching the #about section
      gsap.fromTo(
        "#manifesto-background",
        { opacity: 0 },
        {
          opacity: 0.12, // Increased visibility
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        }
      );

      // The horizontal scroll timeline mapped from #about to the ENTIRE document bottom
      gsap.to(textRef.current, {
        xPercent: -100,
        x: () => window.innerWidth,
        ease: "none",
        scrollTrigger: {
          trigger: "#about",
          start: "top bottom",
          endTrigger: document.body,
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });

    const fontRefresher = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1500);

    return () => {
      clearTimeout(fontRefresher);
      ctx.revert();
    };
  }, []);

  return (
    <div
      id="manifesto-background"
      className="fixed inset-0 z-[1] pointer-events-none flex items-center overflow-hidden opacity-0"
    >
      <div
        ref={textRef}
        className="flex items-center gap-12 md:gap-32 px-12 md:px-24 whitespace-nowrap will-change-transform"
      >
        <span className="text-7xl md:text-9xl lg:text-[18rem] font-display font-bold text-white tracking-tight">
          I don't just write code
        </span>

        <Sparkles className="w-24 h-24 md:w-48 md:h-48 text-white flex-shrink-0" />

        <span className="text-7xl md:text-9xl lg:text-[18rem] font-display font-black text-white tracking-tighter">
          I design experiences.
        </span>

        <div className="w-[10vw] flex-shrink-0"></div>

        <span className="text-5xl md:text-7xl lg:text-[12rem] font-sans font-medium text-white italic lowercase">
          crafting systems that scale,
        </span>

        <svg
          className="w-48 h-24 md:w-96 md:h-48 flex-shrink-0 stroke-white"
          viewBox="0 0 200 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,50 C50,100 150,0 200,50"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="10 15"
          />
        </svg>

        <span className="text-7xl md:text-9xl lg:text-[18rem] font-display font-light text-white uppercase tracking-widest">
          Where Logic
        </span>

        <span className="text-7xl md:text-9xl lg:text-[18rem] font-display font-black text-white">
          Meets Magic
        </span>

        <div className="w-[15vw] flex-shrink-0"></div>

        <Zap className="w-32 h-32 md:w-64 md:h-64 text-white flex-shrink-0" />

        <span
          className="text-7xl md:text-9xl lg:text-[18rem] font-display font-black outline-text text-transparent tracking-tighter"
          style={{ WebkitTextStroke: "4px white" }}
        >
          Pixels
        </span>

        <div className="w-8 h-8 md:w-16 md:h-16 bg-white rounded-full flex-shrink-0"></div>

        <span
          className="text-7xl md:text-9xl lg:text-[18rem] font-display font-black outline-text text-transparent tracking-tighter"
          style={{ WebkitTextStroke: "4px white" }}
        >
          Performance
        </span>

        <div className="w-8 h-8 md:w-16 md:h-16 bg-white rounded-full flex-shrink-0"></div>

        <span className="text-7xl md:text-9xl lg:text-[18rem] font-display font-black text-white tracking-tighter">
          Perfection.
        </span>

        <div className="w-[20vw] flex-shrink-0"></div>

        <Code2 className="w-24 h-24 md:w-48 md:h-48 text-white flex-shrink-0" />

        <span className="text-6xl md:text-8xl lg:text-[15rem] font-display font-bold text-white underline decoration-white decoration-8 underline-offset-[20px]">
          Welcome to the edge of the web.
        </span>

        <div className="w-[20vw] flex-shrink-0"></div>
      </div>
    </div>
  );
}
