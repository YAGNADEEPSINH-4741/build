import { GraduationCap, Award, MapPin, Calendar, Languages } from 'lucide-react';

export default function About() {
  const education = [
    { degree: "BCA – Sem 6 (Ongoing)", institution: "Shree Swaminarayan College of Computer Science", year: "2023–26", score: "79.53%" },
    { degree: "12th – Commerce", institution: "Christ School, Chitra", year: "2023", score: "75.00%" },
    { degree: "10th – SSC", institution: "Christ School, Chitra", year: "2021", score: "69.17%" },
  ];

  return (
    <section id="about" className="relative py-24 z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">My Journey</h2>
        <h3 className="font-display text-4xl md:text-5xl font-bold text-white">About <span className="text-white/40">Me</span></h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Story / Objective */}
        <div className="glass-card p-8 md:p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <TerminalIcon className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-display text-2xl font-bold text-white">Career Objective</h4>
          </div>
          <p className="text-gray-400 leading-relaxed text-lg mb-8">
            Motivated and detail-oriented Software Developer with a solid foundation in full-stack web development, object-oriented programming, and database management. 
            Seeking an entry-level role or internship where I can apply my skills in JavaScript, Python, and modern web technologies to build scalable, user-centric products.
            I bring a passion for writing clean code, solving real-world problems, and growing continuously within a collaborative engineering environment.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <InfoItem icon={<MapPin className="w-5 h-5" />} label="Location" value="Bhavnagar, Gujarat" />
            <InfoItem icon={<Calendar className="w-5 h-5" />} label="Age" value="14 August 2005" />
            <InfoItem icon={<Languages className="w-5 h-5" />} label="Languages" value="English, Hindi, Gujarati" />
            <InfoItem icon={<Award className="w-5 h-5" />} label="Achievement" value="AI4DEV Finalist" />
          </div>
        </div>

        {/* Education Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-4 bottom-4 w-px bg-gradient-to-b from-primary/50 via-primary/10 to-transparent"></div>

          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-surface border border-white/10 flex items-center justify-center shadow-xl">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-display text-2xl font-bold text-white">Education</h4>
            </div>

            {education.map((edu, idx) => (
              <div key={idx} className="relative pl-24 group">
                {/* Timeline Dot */}
                <div className="absolute left-[30px] top-6 w-3 h-3 rounded-full bg-primary ring-4 ring-primary/20 group-hover:ring-primary/50 group-hover:scale-125 transition-all duration-300"></div>
                
                <div className="glass p-6 rounded-2xl group-hover:border-primary/30 transition-colors duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-bold text-xl text-white">{edu.degree}</h5>
                    <span className="text-primary font-mono bg-primary/10 px-3 py-1 rounded-full text-sm">{edu.year}</span>
                  </div>
                  <p className="text-gray-400 font-medium mb-3">{edu.institution}</p>
                  <p className="text-sm font-bold text-gray-300 bg-white/5 inline-block px-3 py-1 rounded-lg">Score: {edu.score}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TerminalIcon({ className }) {
  return (
    <svg xmlns="http://www.w0.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="4 17 10 11 4 5"></polyline>
      <line x1="12" y1="19" x2="20" y2="19"></line>
    </svg>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-surface/50 p-4 rounded-xl border border-white/5">
      <div className="text-primary">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{label}</p>
        <p className="text-sm text-gray-200 font-medium">{value}</p>
      </div>
    </div>
  );
}
