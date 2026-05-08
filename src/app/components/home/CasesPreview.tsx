import { Link } from 'react-router';
import { BLUE, TEXT, BORDER, LIGHT, F } from '../../utils/colors';
import { SecLabel } from '../shared/SecLabel';
import { BtnOutline } from '../shared/Buttons';

const cards = [
  { dept: '🦴 정형외과', title: '○○외과', loc: 'CS관리 + 마케팅 + 인력관리 · 6개월', stats: [{ v: '+185%', l: '월 매출 성장' }, { v: '4.8★', l: '소비자 만족도' }, { v: '↓71%', l: '이직률' }] },
  { dept: '🦴 정형외과', title: '○○정형외과', loc: '경영개선 + 마케팅 + CS관리 · 5개월', stats: [{ v: '+165%', l: '월 매출 성장' }, { v: '4.7★', l: '소비자 만족도' }, { v: '↓58%', l: '이직률' }] },
  { dept: '🩺 내과', title: '○○내과의원', loc: '경영개선 + CS관리 + 인력관리 · 4개월', stats: [{ v: '+153%', l: '월 매출 성장' }, { v: '4.9★', l: '소비자 만족도' }, { v: '↓40%', l: '행정 업무량' }] },
];

export function CasesPreview() {
  return (
    <section style={{ background: LIGHT.bg0, padding: '6rem 5vw' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="fu" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <SecLabel center onLight>Success Cases</SecLabel>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: TEXT.onLight }}>진료과목 상관없이<br />성장시킵니다</h2>
          <p style={{ color: TEXT.mutedLight, fontSize: '0.92rem', marginTop: '0.5rem', fontFamily: F.sans }}>정형외과·내과 — 현재 보유한 실제 사례입니다.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
          {cards.map((c, i) => (
            <Link to="/cases" key={i} className={`fu d${i + 1}`} style={{
              background: '#FFFFFF', border: `1px solid ${BORDER.light}`,
              padding: '2.2rem', borderRadius: '8px',
              position: 'relative', overflow: 'hidden', transition: 'all 0.3s', textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(37,99,235,0.05)', display: 'block',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BLUE._400; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 12px 36px rgba(37,99,235,0.14)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BORDER.light; el.style.transform = 'none'; el.style.boxShadow = '0 2px 8px rgba(37,99,235,0.05)'; }}
            >
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${BLUE._500},${BLUE._300})` }} />
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '0.8rem', fontFamily: F.sans, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 14, height: 1, background: BLUE._500, display: 'inline-block' }} /> {c.dept}
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem', color: TEXT.onLight, fontFamily: F.sans }}>{c.title}</h3>
              <div style={{ fontSize: '0.75rem', color: TEXT.mutedLight, marginBottom: '1.3rem', fontFamily: F.sans }}>{c.loc}</div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {c.stats.map(s => (
                  <div key={s.l} style={{ minWidth: 0, flex: 1 }}>
                    <strong className="text-grad" style={{ fontFamily: F.bebas, fontSize: '24px', display: 'block', lineHeight: 1.3 }}>{s.v}</strong>
                    <span style={{ fontSize: '0.67rem', color: TEXT.mutedLight, fontFamily: F.sans, display: 'block', marginTop: '0.2rem' }}>{s.l}</span>
                  </div>
                ))}
              </div>
            </Link>
          ))}
        </div>
        <div className="fu" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <BtnOutline to="/cases" onLight>성공 사례 자세히 보기 →</BtnOutline>
        </div>
      </div>
    </section>
  );
}
