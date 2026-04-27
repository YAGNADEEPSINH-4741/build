import { Terminal } from 'lucide-react';
import BubbleMenu from './BubbleMenu';

export default function Navbar() {
  const navItems = [
    {
      label: 'home',
      href: '#',
      ariaLabel: 'Home',
      rotation: -6,
      hoverStyles: { bgColor: '#00f6ff', textColor: '#050814' }
    },
    {
      label: 'about',
      href: '#about',
      ariaLabel: 'About',
      rotation: 4,
      hoverStyles: { bgColor: '#8A2BE2', textColor: '#ffffff' }
    },
    {
      label: 'skills',
      href: '#skills',
      ariaLabel: 'Skills',
      rotation: -4,
      hoverStyles: { bgColor: '#00f6ff', textColor: '#050814' }
    },
    {
      label: 'projects',
      href: '#projects',
      ariaLabel: 'Projects',
      rotation: 6,
      hoverStyles: { bgColor: '#8A2BE2', textColor: '#ffffff' }
    },
    {
      label: 'contact',
      href: '#contact',
      ariaLabel: 'Contact',
      rotation: -6,
      hoverStyles: { bgColor: '#00f6ff', textColor: '#050814' }
    }
  ];

  const logo = (
    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
      <Terminal className="text-[#00f6ff] w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      <span className="font-display font-bold text-lg tracking-wider text-white">YAGNA<span className="text-[#00f6ff]">.DEV</span></span>
    </div>
  );

  return (
    <BubbleMenu
      logo={logo}
      items={navItems}
      menuBg="rgba(20, 20, 20, 0.7)"
      menuContentColor="#ffffff"
      useFixedPosition={true}
      className="max-w-7xl mx-auto top-6 lg:top-8"
    />
  );
}
