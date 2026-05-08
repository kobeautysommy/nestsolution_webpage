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
    <div style={{
      padding: '6rem 5vw', textAlign: 'center', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg,${BLUE.ctaBg},${BLUE._600})`,
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, background: 'radial-gradient(circle,rgba(59,130,246,0.15) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative' }}>
        <SecLabel center>Contact</SecLabel>
        <h2 className="fu" style={{ fontFamily: F.serif, fontSize: 'clamp(1.7rem,3.2vw,2.8rem)', fontWeight: 700, marginBottom: '0.9rem', color: '#FFFFFF' }}>상담은 항상 무료입니다</h2>
        <p className="fu" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '0.92rem', maxWidth: 500, margin: '0 auto 2.5rem', fontFamily: F.sans }}>
          원장님의 고민을 들려주세요.<br />17년 임상 경험으로 함께 해결책을 찾겠습니다.
        </p>
        <div className="fu" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', color: BLUE._500, padding: '0.85rem 2rem', fontWeight: 700, fontSize: '0.87rem', textDecoration: 'none', borderRadius: '4px', fontFamily: F.sans }}>무료 상담 신청 →</Link>
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid rgba(255,255,255,0.4)', color: '#FFFFFF', padding: '0.85rem 2rem', fontSize: '0.87rem', textDecoration: 'none', borderRadius: '4px', fontFamily: F.sans, background: 'none' }}>서비스 보기</Link>
        </div>
        <div className="fu" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>
          {[
            { icon: '💬', text: '카카오 상담', href: 'http://pf.kakao.com/_HStBn' },
            { icon: '📞', text: '010-3129-8248', href: 'tel:010-3129-8248' },
            { icon: '📞', text: '010-9470-8248', href: 'tel:010-9470-8248' },
            { icon: '🕐', text: '평일 09:00 – 20:00', href: '#' },
          ].map(c => (
            <div key={c.text} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
              <div style={{ width: 32, height: 32, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.82rem' }}>{c.icon}</div>
              <a href={c.href} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.84rem', textDecoration: 'none', fontFamily: F.sans }}>{c.text}</a>
            </div>
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
