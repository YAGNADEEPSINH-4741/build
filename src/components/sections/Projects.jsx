import { ExternalLink, Github, FolderGit2, CheckCircle2 } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: "TalkPrivate",
      subtitle: "Real-Time Chat Application",
      status: "Production Deployed Full Stack App",
      techStack: ["JavaScript", "HTML5", "CSS3", "Supabase", "PostgreSQL", "Vercel"],
      features: [
        "Architected complete full-stack real-time chat with near-zero latency.",
        "Implemented live bi-directional messaging using Supabase Realtime.",
        "Designed secure user authentication (email/password, sessions).",
        "Built fully responsive mobile-first UI with pure HTML/CSS.",
        "Configured persistent message storage using PostgreSQL.",
        "Automated CI/CD pipeline via Vercel for zero-downtime deployments.",
        "Maintained structured Git workflow and professional version control."
      ],
      link: "#",
    }
  ];

  return (
    <section id="projects" className="relative py-24 z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">My Work</h2>
        <h3 className="font-display text-4xl md:text-5xl font-bold text-white">Featured <span className="text-white/40">Projects</span></h3>
      </div>

      <div className="flex flex-col gap-12">
        {projects.map((project, idx) => (
          <div key={idx} className="glass-card overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Project Info */}
              <div className="lg:col-span-7 p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <FolderGit2 className="w-8 h-8 text-primary" />
                  <h4 className="font-display text-3xl font-bold text-white">{project.title}</h4>
                </div>
                
                <h5 className="text-xl text-gray-300 font-medium mb-2">{project.subtitle}</h5>
                <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-sm font-medium rounded-lg mb-8">
                  {project.status}
                </span>

                <div className="space-y-4 mb-8">
                  {project.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex gap-3 items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary/70 shrink-0 mt-0.5" />
                      <p className="text-gray-400 leading-relaxed">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.map((tech, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 bg-surface border border-white/5 rounded-full text-xs text-gray-300 font-mono">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <a href={project.link} className="flex items-center gap-2 px-6 py-3 bg-white text-surface rounded-lg font-bold hover:bg-primary transition-colors">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a href="#" className="flex items-center gap-2 px-6 py-3 bg-surface/50 text-white rounded-lg font-bold hover:bg-surface border border-white/10 transition-colors">
                    <Github className="w-4 h-4" />
                    Source Code
                  </a>
                </div>
              </div>

              {/* Project Visual / Abstract 3D placeholder */}
              <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-surface/30 flex items-center justify-center p-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50"></div>
                <div className="relative w-full aspect-video bg-surface border border-white/10 rounded-2xl shadow-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                  {/* Abstract Code Visualization Representation */}
                  <div className="absolute inset-4 border border-white/5 rounded-xl bg-[#090b14] overflow-hidden flex flex-col">
                    <div className="h-8 bg-surface border-b border-white/5 flex items-center px-4 gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                       <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                       <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="p-4 flex-1 opacity-50 font-mono text-xs text-primary leading-loose">
                      <p>import {'{ createClient }'} from '@supabase/supabase-js';</p>
                      <p className="mt-2 pl-4">const supabase = createClient(URL, KEY);</p>
                      <p className="mt-2 pl-4">channel.on('postgres_changes', payload =&gt; {'{'}</p>
                      <p className="mt-2 pl-8">updateUI(payload.new);</p>
                      <p className="mt-2 pl-4">{'}'}).subscribe();</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
