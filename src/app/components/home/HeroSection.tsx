import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { BLUE, TEXT, F } from '../../utils/colors';
import heroVideo from '../../../assets/hero_video.mp4';

function StatCard({ big, lbl, delay }: { big: string; lbl: string; delay: number }) {
  const match = big.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : '';

  const [count, setCount] = useState(0);
  const elRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;

      const speed = Math.max(30, target);
      const intervalMs = 1200 / speed;
      const inc = target / speed;
      let current = 0;

      const tick = () => {
        current = Math.min(current + inc, target);
        setCount(Math.ceil(current));
        if (current < target) setTimeout(tick, intervalMs);
      };
      setTimeout(tick, delay);
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, delay]);

  return (
    <div ref={elRef} style={{
      background: 'rgba(15,40,90,0.55)', backdropFilter: 'blur(12px)',
      border: `1px solid rgba(147,197,253,0.25)`, padding: '1.2rem 1.8rem',
      borderLeft: `3px solid ${BLUE._300}`, textAlign: 'right', minWidth: 155,
    }}>
      <div className="text-grad-dark" style={{ fontFamily: F.bebas, fontSize: '2.4rem', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: '0.65rem', color: TEXT.grayDark, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.2rem', fontFamily: F.sans }}>{lbl}</div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section style={{
      minHeight: 'auto', display: 'flex', alignItems: 'center',
      padding: '5cm 5vw', position: 'relative', overflow: 'hidden',
    }}>
      {/* video background */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', zIndex: 0,
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>
      {/* dark overlay for readability */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(155deg, rgba(6,13,31,0.72) 0%, rgba(11,26,58,0.62) 50%, rgba(17,34,82,0.55) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 740 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.7rem',
          fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase',
          color: '#FFFFFF', marginBottom: '1rem',
        }}>
          <span style={{ width: 28, height: 1, background: '#FFFFFF', display: 'inline-block' }} />
          병·의원 컨설팅 전문 기업 · 임상경험 17년+
        </div>
        <h1 style={{
          fontFamily: F.serif, fontSize: 'clamp(2.4rem,5vw,4.8rem)',
          fontWeight: 700, lineHeight: 1.2, marginBottom: '0.7rem', color: '#FFFFFF',
        }}>
          원장님은 <span className="text-grad-dark">연기자</span>,<br />
          저희는 <span className="text-grad-dark">연출자</span>입니다
        </h1>
        <p className="speakable" style={{ fontFamily: F.serif, fontSize: 'clamp(0.9rem,1.7vw,1.15rem)', color: '#FFFFFF', fontWeight: 300, letterSpacing: '0.05em', marginBottom: '0.8rem' }}>
          현장을 아는 사람만이 줄 수 있는 컨설팅
        </p>
        <p className="speakable" style={{ color: '#FFFFFF', lineHeight: 1.9, fontSize: '0.92rem', maxWidth: 510, marginBottom: '1.6rem', fontFamily: F.sans }}>
          CS 관리부터 마케팅, 경영 개선, 인력 관리까지
          — 이론이 아닌 17년 임상 실전으로 원장님의 병원을 함께 설계합니다.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link to="/contact" className="hero-btn-primary" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: `linear-gradient(135deg,${BLUE._500},${BLUE._400})`,
            color: '#fff', padding: '0.7rem 1.5rem',
            fontWeight: 700, fontSize: '0.87rem', letterSpacing: '0.05em',
            textDecoration: 'none', fontFamily: F.sans, borderRadius: '10px',
            boxShadow: `0 4px 18px rgba(37,99,235,0.35)`,
          }}>무료 상담 신청 →</Link>
          <a href="http://pf.kakao.com/_HStBn" target="_blank" rel="noreferrer" className="hero-btn-outline" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            border: `1.5px solid #FFFFFF`, color: '#FFFFFF',
            padding: '0.85rem 2rem', fontSize: '0.87rem', letterSpacing: '0.05em',
            textDecoration: 'none', fontFamily: F.sans,
            borderRadius: '10px', background: 'none',
          }}>카카오 상담</a>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="tel:010-3129-8248" className="hero-btn-tel" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#FFFFFF', fontSize: '0.85rem', textDecoration: 'none', fontFamily: F.sans }}>📞 010-3129-8248</a>
            <a href="tel:010-9470-8248" className="hero-btn-tel" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#FFFFFF', fontSize: '0.85rem', textDecoration: 'none', fontFamily: F.sans }}>📞 010-9470-8248</a>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex" style={{
        position: 'absolute', right: '5vw', top: '50%', transform: 'translateY(-50%)',
        zIndex: 2, flexDirection: 'column', gap: '1rem',
      }}>
        <StatCard big="17+" lbl="Years Clinical Exp." delay={0} />
        <StatCard big="4+"  lbl="Core Services"       delay={150} />
        <StatCard big="100%" lbl="Customized"         delay={300} />
      </div>

      <div style={{
        position: 'absolute', bottom: '3rem', left: '50%',
        transform: 'translateX(-50%)', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        color: TEXT.grayDark, fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase',
        animation: 'nestBounce 2s ease-in-out infinite', fontFamily: F.sans,
      }}>
        <span style={{ width: 1, height: 36, background: `linear-gradient(${BLUE._400},transparent)`, display: 'block' }} />
        scroll
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity: 0.7 }}>
          <path d="M2 4.5L7 9.5L12 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
