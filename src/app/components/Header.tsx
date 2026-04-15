import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'NEST', href: '#home' },
  { label: 'Brand marketing', href: '#brand-marketing' },
  { label: 'Program', href: '#programs' },
  { label: 'Associate vendor', href: '#associate-vendor' },
  { label: 'Contact us', href: '#contact' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: '-60px 0px 0px 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between md:justify-center">
        {/* Mobile: Brand name on left */}
        <span
          className="text-white text-xl md:hidden"
          style={{ fontFamily: "'Carter One', cursive" }}
        >
          NEST
        </span>

        {/* Desktop nav */}
        <ul
          className="hidden md:flex items-center justify-center gap-8 text-white"
          style={{ fontFamily: "'Carter One', cursive" }}
        >
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`relative transition-colors text-[20px] pb-1 group ${
                    isActive ? 'text-white' : 'text-white/60 hover:text-white/90'
                  }`}
                >
                  {item.label}
                  {/* underline indicator */}
                  <span
                    className={`absolute left-0 -bottom-0.5 h-[2px] bg-white rounded-full transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile: Hamburger button */}
        <button
          className="md:hidden text-white p-2 rounded-md focus:outline-none"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="메뉴 열기/닫기"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul
          className="bg-black/90 backdrop-blur-sm flex flex-col items-center gap-0 pb-4"
          style={{ fontFamily: "'Carter One', cursive" }}
        >
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <li key={item.label} className="w-full">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`block text-[18px] text-center py-3 transition-colors ${
                    isActive
                      ? 'text-white bg-white/15'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </header>
  );
}