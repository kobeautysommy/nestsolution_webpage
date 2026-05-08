import { BLUE, TEXT, BORDER, LIGHT, F } from '../../utils/colors';
import { SecLabel } from '../shared/SecLabel';
import { BtnPrimary } from '../shared/Buttons';

const barData = [
  { h: '25%', v: '전', gold: false }, { h: '35%', v: '1M', gold: false },
  { h: '28%', v: '2M', gold: false }, { h: '45%', v: '3M', gold: false },
  { h: '40%', v: '4M', gold: false }, { h: '60%', v: '5M', gold: true },
  { h: '55%', v: '6M', gold: true },  { h: '75%', v: '7M→', gold: true },
];

export function Overview() {
  return (
    <section style={{ background: LIGHT.bg0, padding: '6rem 5vw' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '5rem', alignItems: 'center' }}>
        <div className="fu">
          <SecLabel onLight>Our Approach</SecLabel>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, lineHeight: 1.35, marginBottom: '0.9rem', color: TEXT.onLight }}>
            목표 달성형 컨설팅으로<br />장기적 성장곡선을<br />만들어드립니다
          </h2>
          <p className="speakable" style={{ color: TEXT.mutedLight, lineHeight: 1.85, fontSize: '0.92rem', fontFamily: F.sans }}>
            네스트솔루션은 병원의 니즈와 현황을 정밀하게 파악하여, 원장님의 병원에만 맞는 완전 맞춤 전략을 수립합니다.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.8rem' }}>
            {[
              { t: '탄탄한 운영 기반 구축', d: '지역 특성과 환자 데이터 분석으로 성공적인 시작을' },
              { t: '우리 병원 강점 강화',   d: '경쟁 병원과 확실히 차별되는 포지셔닝' },
              { t: '내부 시스템 완전 개선', d: 'CS, 인력, 운영 프로세스 전면 최적화' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 1.2rem', background: BLUE.dim, border: `1px solid ${BORDER.light}`, borderRadius: '4px' }}>
                <span style={{ color: BLUE._500, fontSize: '1rem', flexShrink: 0, marginTop: '0.05rem' }}>✓</span>
                <div>
                  <strong style={{ fontSize: '0.88rem', display: 'block', marginBottom: '0.2rem', color: TEXT.onLight, fontFamily: F.sans }}>{item.t}</strong>
                  <p style={{ color: TEXT.mutedLight, fontSize: '0.79rem', lineHeight: 1.55, fontFamily: F.sans }}>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}><BtnPrimary to="/services">서비스 자세히 보기 →</BtnPrimary></div>
        </div>

        <div className="fu d2" style={{
          background: '#FFFFFF', border: `1px solid ${BORDER.light}`,
          padding: '2.5rem', position: 'relative', borderRadius: '8px',
          boxShadow: '0 4px 24px rgba(37,99,235,0.08)',
        }}>
          <div style={{ fontSize: '0.68rem', color: TEXT.mutedLight, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: F.sans }}>
            매출 성장 시뮬레이션 (컨설팅 도입 후)
          </div>
          <div
            style={{ position: 'relative', height: 180, paddingTop: '1.4rem' }}
            ref={(el) => {
              if (!el || (el as HTMLElement & { _obsReady?: boolean })._obsReady) return;
              (el as HTMLElement & { _obsReady?: boolean })._obsReady = true;
              const bars = Array.from(el.querySelectorAll('[data-bar]')) as SVGRectElement[];
              if (!bars.length) return;
              bars.forEach(b => { b.style.transform = 'scaleY(0)'; b.style.opacity = '0'; });
              const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                  bars.forEach((b, i) => {
                    setTimeout(() => {
                      b.style.transition = 'all 0.6s cubic-bezier(0.34,1.2,0.64,1)';
                      b.style.transform = 'scaleY(1)';
                      b.style.opacity = '1';
                    }, i * 100);
                  });
                  obs.disconnect();
                }
              }, { threshold: 0.3 });
              obs.observe(el);
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 400 180" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
              <defs>
                <linearGradient id="barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={BLUE._400} />
                  <stop offset="100%" stopColor={BLUE._500} />
                </linearGradient>
              </defs>
              {(() => {
                const barWidth = 35;
                const spacing = (400 - barWidth * barData.length) / (barData.length + 1);
                return barData.map((bar, i) => {
                  const height = parseFloat(bar.h);
                  const barHeight = (height / 100) * 150;
                  const x = spacing + i * (barWidth + spacing);
                  const y = 180 - barHeight - 10;
                  return (
                    <g key={i}>
                      <rect data-bar x={x} y={y} width={barWidth} height={barHeight}
                        fill={bar.gold ? BLUE._400 : 'url(#barGrad)'} rx="3"
                        style={{ transformOrigin: `${x + barWidth / 2}px 170px` }} />
                      <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fontSize="11"
                        fill={bar.gold ? BLUE._400 : BLUE._500} fontFamily={F.sans} fontWeight="600">{bar.v}</text>
                    </g>
                  );
                });
              })()}
            </svg>
          </div>
          <div style={{ fontSize: '0.72rem', color: TEXT.mutedLight, textAlign: 'center', marginTop: '1rem', fontFamily: F.sans }}>✦ 평균 매출 성장 추이 (시뮬레이션)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.3rem' }}>
            {['CS개선', '신환↑', '재방문↑', '비용↓'].map(t => (
              <span key={t} style={{ fontSize: '0.67rem', letterSpacing: '0.06em', border: `1px solid ${BORDER.light}`, color: BLUE._500, padding: '0.25rem 0.7rem', borderRadius: '20px', fontFamily: F.sans }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
