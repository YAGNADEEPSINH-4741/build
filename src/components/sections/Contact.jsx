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
              <ContactItem icon={<Mail />} label="Email" value="yagnadeepsinh.4741@gmail.com" link="mailto:yagnadeepsinh.4741@gmail.com" />
              <ContactItem icon={<Phone />} label="Phone" value="+91 9687180288" link="tel:+919687180288" />
              <ContactItem icon={<MapPin />} label="Location" value="Bhavnagar, Gujarat, India" />
            </div>

            <div className="mt-12 flex gap-4">
              <SocialLink icon={<Github />} href="#" />
              <SocialLink icon={<Linkedin />} href="#" />
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

function SocialLink({ icon, href }) {
  return (
    <a href={href} className="w-12 h-12 rounded-xl bg-surface/50 border border-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
      {icon}
    </a>
  );
}
