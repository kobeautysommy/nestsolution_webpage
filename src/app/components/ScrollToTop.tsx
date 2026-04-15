import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { BLUE } from '../utils/colors';

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="맨 위로 이동"
      style={{
        position: 'fixed', bottom: '2rem', right: '1.5rem', zIndex: 50,
        width: '2.8rem', height: '2.8rem',
        background: `linear-gradient(135deg, ${BLUE._500}, ${BLUE._400})`,
        color: '#FFFFFF', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '50%',
        boxShadow: '0 4px 18px rgba(37,99,235,0.45)',
        transition: 'opacity 0.3s, transform 0.3s',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <ArrowUp size={18} />
    </button>
  );
}