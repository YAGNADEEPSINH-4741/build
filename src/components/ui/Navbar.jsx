import { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Terminal className="text-primary w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-display font-bold text-xl tracking-wider text-white">YAGNA<span className="text-primary">.DEV</span></span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors tracking-wide">
              {link.name}
            </a>
          ))}
          <a href="/resume.pdf" download className="px-5 py-2 rounded-full border border-primary/50 text-primary hover:bg-primary/10 transition-all duration-300 text-sm font-medium glow-box">
            Resume
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-gray-300" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass flex flex-col items-center py-6 gap-6 border-b border-white/10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setMenuOpen(false)} className="text-base font-medium text-gray-300 hover:text-primary">
              {link.name}
            </a>
          ))}
          <a href="/resume.pdf" download onClick={() => setMenuOpen(false)} className="px-6 py-2 rounded-full bg-primary/10 border border-primary/50 text-primary glow-box">
            Download Resume
          </a>
        </div>
      )}
    </nav>
  );
}
