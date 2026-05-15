import { BLUE, TEXT, BORDER, LIGHT, F } from '../../utils/colors';
import { SecLabel } from '../shared/SecLabel';
import { BtnOutline } from '../shared/Buttons';

const whyCards = [
  { icon: '🏥', t: '17년+ 임상 경험',     d: '교과서가 아닌 현장에서 배운 지식. 원장님 고민을 진짜로 이해합니다.' },
  { icon: '🎯', t: '100% 맞춤 솔루션',   d: '모든 병원은 다릅니다.\n획일적 패키지 대신\n우리 병원만의 전략을 설계합니다' },
  { icon: '⚡', t: '즉각 투입 가능한 팀', d: '물리치료사·간호조무사·행정직\n전문가가 상시 대기, 바로 현장에 투입 가능합니다.' },
];

export function WhyMini() {
  return (
    <section className="bg-slide" style={{
      padding: '6rem 5vw',
      position: 'relative',
      backgroundImage: `linear-gradient(rgba(4,9,15,0.72), rgba(4,9,15,0.72)),
        url(https://blog.udemy.com/wp-content/uploads/2014/04/shutterstock_100422550.jpg)`,
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="fu" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <SecLabel center>Why NestSolution</SecLabel>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: TEXT.onDark }}>왜 네스트솔루션인가?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.5rem' }}>
          {whyCards.map((c, i) => (
            <div key={i} className={`fu d${i + 1}`} style={{
              background: '#FFFFFF', border: `1px solid ${BORDER.light}`,
              padding: '2.2rem 1.8rem', borderRadius: '8px',
              position: 'relative', overflow: 'hidden', transition: 'all 0.3s',
              boxShadow: '0 2px 8px rgba(37,99,235,0.04)',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BLUE._400; el.style.boxShadow = '0 8px 32px rgba(37,99,235,0.14)'; el.style.transform = 'translateY(-5px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BORDER.light; el.style.boxShadow = '0 2px 8px rgba(37,99,235,0.04)'; el.style.transform = 'none'; }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${BLUE._500},${BLUE._300})` }} />
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: TEXT.onLight, fontFamily: F.sans }}>{c.t}</h3>
              <p style={{ color: TEXT.mutedLight, fontSize: '0.84rem', lineHeight: 1.7, fontFamily: F.sans, whiteSpace: 'pre-line' }}>{c.d}</p>
              <div style={{ fontFamily: F.bebas, fontSize: '3.5rem', color: BLUE.dim, position: 'absolute', bottom: '0.5rem', right: '1rem', lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</div>
            </div>
          ))}
        </div>
        <div className="fu" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <BtnOutline to="/about">대표 소개 보기 →</BtnOutline>
        </div>
      </div>
    </section>
  );
}
