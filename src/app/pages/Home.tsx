import { Link } from 'react-router';
import { BLUE, TEXT, F } from '../utils/colors';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { HeroSection } from '../components/home/HeroSection';
import { PainMini } from '../components/home/PainMini';
import { Overview } from '../components/home/Overview';
import { WhyMini } from '../components/home/WhyMini';
import { CasesPreview } from '../components/home/CasesPreview';
import { ServiceShowcase } from '../components/ServiceShowcase';
import { Partners } from '../components/Partners';
import { SecLabel } from '../components/shared/SecLabel';
import { LIGHT } from '../utils/colors';

function CtaBand() {
  return (
    <div className="bg-slide" style={{
      padding: '6rem 5vw', textAlign: 'center', position: 'relative', overflow: 'hidden',
      backgroundImage: `linear-gradient(rgba(10,20,60,0.78),rgba(10,20,60,0.78)), url(https://internwise.s3.eu-west-2.amazonaws.com/uploads/230905090356898660.jpg)`,
    }}>
      {/* grid overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: '60px 60px', pointerEvents: 'none' }} />
      <div style={{ position: 'relative' }}>
        <SecLabel center>Contact</SecLabel>
        <h2 className="fu" style={{ fontFamily: F.serif, fontSize: 'clamp(1.7rem,3.2vw,2.8rem)', fontWeight: 700, marginBottom: '0.9rem', color: '#FFFFFF' }}>상담은 항상 무료입니다</h2>
        <p className="fu" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '0.92rem', maxWidth: 500, margin: '0 auto 2.5rem', fontFamily: F.sans }}>
          원장님의 고민을 들려주세요.<br />17년 임상 경험으로 함께 해결책을 찾겠습니다.
        </p>
        <div className="fu" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" className="cta-btn-white" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', color: BLUE._500, padding: '0.85rem 2rem', fontWeight: 700, fontSize: '0.87rem', textDecoration: 'none', borderRadius: '10px', fontFamily: F.sans }}>무료 상담 신청 →</Link>
          <Link to="/services" className="cta-btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid rgba(255,255,255,0.4)', color: '#FFFFFF', padding: '0.85rem 2rem', fontSize: '0.87rem', textDecoration: 'none', borderRadius: '10px', fontFamily: F.sans, background: 'none' }}>서비스 보기</Link>
        </div>
        <div className="fu" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>
          {[
            { icon: '💬', text: '카카오 상담', href: 'http://pf.kakao.com/_HStBn' },
            { icon: '📞', text: '010-3129-8248', href: 'tel:010-3129-8248' },
            { icon: '📞', text: '010-9470-8248', href: 'tel:010-9470-8248' },
            { icon: '🕐', text: '평일 09:00 – 20:00', href: '#' },
          ].map(c => (
            <a
              key={c.text}
              href={c.href}
              className="cta-contact-item"
              style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none', borderRadius: '8px', padding: '0.4rem 0.6rem', transition: 'background 0.2s, transform 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.1)'; el.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.transform = 'none'; }}
            >
              <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem', flexShrink: 0, transition: 'background 0.2s, border-color 0.2s' }}>{c.icon}</div>
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.84rem', fontFamily: F.sans }}>{c.text}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Home() {
  useScrollAnimation();
  return (
    <div style={{ background: LIGHT.bg0 }}>
      <HeroSection />
      <PainMini />
      <Overview />
      <WhyMini />
      <CasesPreview />
      <ServiceShowcase />
      <Partners />
      <CtaBand />
    </div>
  );
}
