import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { BLUE, TEXT, BORDER, F, DARK } from '../utils/colors';
import { Menu, X } from 'lucide-react';
import logoImg from 'figma:asset/e62d0c0eb70f7e416137072101b312f32e6e19db.png';

/* ─── Brand Mark ───────────────────────────────────────────────────────── */
function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>
      <img 
        src={logoImg} 
        alt="Nests Solution" 
        style={{ 
          height: '48px',
          width: 'auto',
          display: 'block'
        }} 
      />
    </Link>
  );
}

const navLinks = [
  { label: '고민',        to: '/pain' },
  { label: '서비스',      to: '/services' },
  { label: '컨설팅 과정', to: '/process' },
  { label: '성공 사례',   to: '/cases' },
  { label: '대표 소개',   to: '/about' },
];

export function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled
        ? 'rgba(238, 245, 255, 0.97)'
        : 'rgba(238, 245, 255, 0.90)',
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${BORDER.light}`,
      transition: 'background 0.3s',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '0 5vw',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        <Logo dark />

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', alignItems: 'center', gap: 0 }}>
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} style={{
                  color: pathname === l.to ? BLUE._500 : TEXT.onLight,
                  textDecoration: 'none',
                  fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
                  letterSpacing: '0.05em',
                  padding: '0.5rem 1rem',
                  display: 'block',
                  fontFamily: F.sans,
                  transition: 'color 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = BLUE._500; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = pathname === l.to ? BLUE._500 : TEXT.onLight; }}
                >{l.label}</Link>
              </li>
            ))}
            <li>
              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center',
                background: `linear-gradient(135deg, ${BLUE._500}, ${BLUE._400})`,
                color: '#FFFFFF',
                fontWeight: 700,
                marginLeft: '0.8rem',
                padding: '0.48rem 1.4rem',
                fontSize: 'clamp(0.7rem, 1.8vw, 0.82rem)',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                fontFamily: F.sans,
                borderRadius: '4px',
                transition: 'opacity 0.2s, transform 0.2s',
                boxShadow: `0 2px 12px rgba(37,99,235,0.35)`,
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; (e.currentTarget as HTMLElement).style.transform = 'none'; }}
              >무료 상담</Link>
            </li>
          </ul>
        )}

        {/* Mobile hamburger */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            style={{ background: 'none', border: 'none', color: TEXT.onLight, cursor: 'pointer', padding: '0.5rem' }}
            aria-label="메뉴 열기"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        )}
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: DARK.bg2, borderTop: `1px solid ${BORDER.bw}`, padding: '1rem 5vw 1.5rem' }}>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} style={{
              display: 'block',
              color: pathname === l.to ? BLUE._300 : TEXT.mutedDark,
              textDecoration: 'none',
              fontSize: '0.9rem',
              padding: '0.75rem 0',
              borderBottom: `1px solid ${BORDER.bw}`,
              fontFamily: F.sans,
            }}>{l.label}</Link>
          ))}
          <Link to="/contact" style={{
            display: 'block', marginTop: '1rem',
            background: `linear-gradient(135deg, ${BLUE._500}, ${BLUE._400})`,
            color: '#FFFFFF', fontWeight: 700,
            padding: '0.75rem 1.5rem', textDecoration: 'none',
            textAlign: 'center', fontFamily: F.sans, borderRadius: '4px',
          }}>무료 상담 신청</Link>
        </div>
      )}
    </nav>
  );
}

export { Logo };