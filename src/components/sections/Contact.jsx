import { Mail, Phone, MapPin, Github, Send, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
      <div className="text-center mb-16">
        <h2 className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Get In Touch</h2>
        <h3 className="font-display text-4xl md:text-5xl font-bold text-white">Contact <span className="text-white/40">Me</span></h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="flex flex-col gap-6">
          <div className="glass-card p-8">
            <h4 className="font-display text-2xl font-bold text-white mb-6">Let's Connect</h4>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>

            <div className="space-y-6">
              <ContactItem icon={<MapPin />} label="Location" value="Bhavnagar, Gujarat, India" />
            </div>

            <div className="mt-12 flex gap-4">
              <SocialLink icon={<Github />} href="https://github.com/YAGNADEEPSINH-4741" />
              <SocialLink icon={<Linkedin />} href="https://www.linkedin.com/in/vaghelayagnadeepsinh/" />
              <SocialLink 
                icon={
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                } 
                href="https://wa.me/919687180288?text=hello%20Yagnadeepsinh%20just%20saw%20your%20portforilo%20can%20lets%20connect" 
                target="_blank"
              />
              <SocialLink icon={<Mail className="w-5 h-5" />} href="mailto:yagnadeepsinh.4741@gmail.com" />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="glass-card p-8">
          <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Your Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Your Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Subject</label>
              <input 
                type="text" 
                placeholder="Job Opportunity"
                className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
              <textarea 
                rows="5"
                placeholder="Hello Yagnadeepsinh..."
                className="bg-surface/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-gray-600 resize-none"
              ></textarea>
            </div>

            <button type="submit" className="group flex justify-center items-center gap-2 w-full mt-4 bg-primary text-surface font-bold py-4 rounded-xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(0,246,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
              Send Message
              <Send className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-white/10 text-center">
        <p className="text-gray-500 text-sm tracking-wide">
          &copy; 2026 Yagnadeepsinh C Vaghela. All rights reserved. <br/>
          <span className="text-gray-600 mt-2 block">Bhavnagar, Gujarat</span>
        </p>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value, link }) {
  const content = (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-12 rounded-xl bg-surface/50 border border-white/5 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:border-primary/30 transition-all duration-300 shadow-lg">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">{label}</p>
        <p className="text-gray-200 group-hover:text-white transition-colors font-medium">{value}</p>
      </div>
    </div>
  );

  return link ? <a href={link}>{content}</a> : <div>{content}</div>;
}

function SocialLink({ icon, href, target }) {
  return (
    <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className="w-12 h-12 rounded-xl bg-surface/50 border border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
      {icon}
    </a>
  );
}
