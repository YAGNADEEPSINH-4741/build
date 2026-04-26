import BallpitSkills from '../3d/BallpitSkills';

export default function Skills() {
  const allSkills = [
    "C", "C++", "Python", "Java", "JavaScript", 
    "HTML5", "CSS3", "PHP", "ASP.NET", 
    "SQL", "PL/SQL", "Supabase", "PostgreSQL", 
    "OOP", "DSA", "Git", "GitHub", "VS Code", "Vercel", "CI/CD"
  ];

  return (
    <section id="skills" className="relative py-24 z-10 w-full">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="text-center mb-16 relative z-10 pointer-events-none">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">My Arsenal</h2>
        <h3 className="font-display text-4xl md:text-5xl font-bold text-white">Technical <span className="text-white/40">Skills</span></h3>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm pointer-events-none">
          Interact with the physics environment below! My core skills are fully dynamic.
        </p>
      </div>

      <div className="relative z-20 max-w-6xl mx-auto px-4 md:px-8 h-[600px] md:h-[700px] w-full">
        <div className="w-full h-full glass-card border border-primary/20 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-3xl relative p-1 touch-none">
           {/* The Interactive Physics Ballpit Canvas */}
           <BallpitSkills 
              labels={allSkills}
              followCursor={true}
              gravity={0.4}
              friction={0.998}
              wallBounce={0.8}    
              colors={['#050814', '#02040a', '#080d20', '#0a0f25']}
              lightColor="#00f6ff"
              lightIntensity={300}
              minSize={0.6}
              maxSize={1.1}
              className="rounded-[22px]" /* keep border radius neat inside the card */
           />
        </div>
      </div>
    </section>
  );
}
