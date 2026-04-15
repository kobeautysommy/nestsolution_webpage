import { useEffect } from 'react';
import { Link } from 'react-router';
import { BLUE, TEXT, BORDER, DARK, LIGHT, F, accentGrad, accentGradDark } from '../utils/colors';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ServiceShowcase } from '../components/ServiceShowcase';
import { Partners } from '../components/Partners';

/* ─── Shared Atoms ───────────────────────────────────────────────────────── */
const SecLabel = ({ children, center, onLight }: { children: string; center?: boolean; onLight?: boolean }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
    fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase',
    color: BLUE._500, marginBottom: '0.9rem',
    justifyContent: center ? 'center' : undefined,
  }}>
    <span style={{ width: 20, height: 1, background: BLUE._500, display: 'inline-block', flexShrink: 0 }} />
    {children}
  </div>
);

const BtnPrimary = ({ children, to }: { children: React.ReactNode; to: string }) => (
  <Link to={to} style={{
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    background: `linear-gradient(135deg, ${BLUE._500}, ${BLUE._400})`,
    color: '#fff', padding: '0.7rem 1.5rem',
    fontWeight: 700, fontSize: '0.87rem', letterSpacing: '0.05em',
    textDecoration: 'none', fontFamily: F.sans, borderRadius: '4px',
    boxShadow: `0 4px 18px rgba(37,99,235,0.35)`,
    transition: 'all 0.25s',
  }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 28px rgba(37,99,235,0.45)'; }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'none'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 18px rgba(37,99,235,0.35)'; }}
  >{children}</Link>
);

const BtnOutline = ({ children, to, onLight }: { children: React.ReactNode; to: string; onLight?: boolean }) => (
  <Link to={to} style={{
    display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
    border: `1.5px solid ${onLight ? BLUE._500 : BLUE._300}`,
    color: onLight ? BLUE._500 : BLUE._300,
    padding: '0.85rem 2rem', fontSize: '0.87rem', letterSpacing: '0.05em',
    textDecoration: 'none', fontFamily: F.sans,
    borderRadius: '4px', background: 'none', transition: 'all 0.25s',
  }}
    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = BLUE.dim; }}
    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
  >{children}</Link>
);

/* ─── Hero ───────────────────────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section style={{
      minHeight: 'auto', display: 'flex', alignItems: 'center',
      padding: '5cm 5vw', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 60% 70% at 75% 45%, rgba(96,165,250,0.18) 0%, transparent 55%),
          radial-gradient(ellipse 45% 55% at 5% 85%, rgba(147,197,253,0.12) 0%, transparent 50%),
          linear-gradient(155deg, #3B5998 0%, #4A6FBD 45%, #5B8CE8 100%)`,
      }} />
      {/* Grid */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: '-50%',
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)`,
          backgroundSize: '70px 70px', animation: 'gMove 28s linear infinite',
        }} />
      </div>

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
        <p style={{ fontFamily: F.serif, fontSize: 'clamp(0.9rem,1.7vw,1.15rem)', color: '#FFFFFF', fontWeight: 300, letterSpacing: '0.05em', marginBottom: '0.8rem' }}>
          현장을 아는 사람만이 줄 수 있는 컨설팅
        </p>
        <p style={{ color: '#FFFFFF', lineHeight: 1.9, fontSize: '0.92rem', maxWidth: 510, marginBottom: '1.6rem', fontFamily: F.sans }}>
          CS 관리부터 마케팅, 경영 개선, 인력 관리까지<br />
          — 이론이 아닌 <strong style={{ color: '#FFFFFF' }}>17년 임상 실전</strong>으로 원장님의 병원을 함께 설계합니다.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: `linear-gradient(135deg, ${BLUE._500}, ${BLUE._400})`,
            color: '#fff', padding: '0.7rem 1.5rem',
            fontWeight: 700, fontSize: '0.87rem', letterSpacing: '0.05em',
            textDecoration: 'none', fontFamily: F.sans, borderRadius: '4px',
            boxShadow: `0 4px 18px rgba(37,99,235,0.35)`, transition: 'all 0.25s',
          }}>무료 상담 신청 →</Link>
          <a href="http://pf.kakao.com/_HStBn" target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            border: `1.5px solid #FFFFFF`,
            color: '#FFFFFF',
            padding: '0.85rem 2rem', fontSize: '0.87rem', letterSpacing: '0.05em',
            textDecoration: 'none', fontFamily: F.sans,
            borderRadius: '4px', background: 'none', transition: 'all 0.25s',
          }}>카카오 상담</a>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="tel:010-3129-8248" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: '#FFFFFF', fontSize: '0.85rem', textDecoration: 'none',
              fontFamily: F.sans, transition: 'all 0.2s',
            }}>📞 010-3129-8248</a>
            <a href="tel:010-9470-8248" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: '#FFFFFF', fontSize: '0.85rem', textDecoration: 'none',
              fontFamily: F.sans, transition: 'all 0.2s',
            }}>📞 010-9470-8248</a>
          </div>
        </div>
      </div>

      {/* Stat pills */}
      <div className="hidden lg:flex" style={{
        position: 'absolute', right: '5vw', top: '50%', transform: 'translateY(-50%)',
        zIndex: 2, flexDirection: 'column', gap: '1rem',
      }}>
        {[
          { big: '17+', lbl: 'Years Clinical Exp.' },
          { big: '4+',  lbl: 'Core Services' },
          { big: '100%',lbl: 'Customized' },
        ].map(s => (
          <div key={s.lbl} style={{
            background: 'rgba(15,40,90,0.55)', backdropFilter: 'blur(12px)',
            border: `1px solid rgba(147,197,253,0.25)`, padding: '1.2rem 1.8rem',
            borderLeft: `3px solid ${BLUE._300}`, textAlign: 'right', minWidth: 155,
          }}>
            <div className="text-grad-dark" style={{ fontFamily: F.bebas, fontSize: '2.4rem', lineHeight: 1 }}>{s.big}</div>
            <div style={{ fontSize: '0.65rem', color: TEXT.grayDark, letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.2rem', fontFamily: F.sans }}>{s.lbl}</div>
          </div>
        ))}
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
      </div>
    </section>
  );
}

/* ─── Pain Mini ─────────────────────────────────────────────────────────── */
const painCards = [
  { icon: '📉', title: '환자가 줄고 있어요',       desc: '신규 환자 유입 감소,\n재방문율 하락.\n마케팅을 해봤는데 효과가 없어요.' },
  { icon: '🤯', title: '진료 외 업무가\n너무 많아요', desc: '직원 관리, 청구,\n민원까지.\n진료에 집중하고 싶은데 경영에 치고 있어요.' },
  { icon: '👥', title: '직원이 자꾸\n그만 둬요',      desc: '뽑으면 나가고, 또 뽑고.\n서비스 품질도\n들쭉날쭉합니다.' },
  { icon: '🏥', title: '옆 병원과 차별화가 안 돼요', desc: '비슷한 진료,\n비슷한 위치.\n우리 병원만의 이유가 없어요.' },
];

function PainMini() {
  return (
    <section style={{ background: LIGHT.bg1, padding: '5rem 5vw' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="fu" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <SecLabel center onLight>Pain Point</SecLabel>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: TEXT.onLight }}>원장님, 이런 고민 있으신가요?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.2rem' }}>
          {painCards.map((c, i) => (
            <div key={i} className={`fu d${i + 1}`} style={{
              background: '#FFFFFF', border: `1px solid ${BORDER.light}`,
              padding: '2.2rem 1.8rem', position: 'relative', overflow: 'hidden',
              borderRadius: '6px', transition: 'all 0.3s',
              boxShadow: '0 2px 8px rgba(37,99,235,0.05)',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BLUE._400; el.style.boxShadow = '0 8px 28px rgba(37,99,235,0.12)'; el.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BORDER.light; el.style.boxShadow = '0 2px 8px rgba(37,99,235,0.05)'; el.style.transform = 'none'; }}
            >
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${BLUE._500},${BLUE._300})` }} />
              <div style={{ fontFamily: F.bebas, fontSize: '2.8rem', color: BLUE.dim, lineHeight: 1, marginBottom: '0.7rem' }}>{String(i + 1).padStart(2, '0')}</div>
              <h3 style={{ fontSize: '0.97rem', fontWeight: 700, marginBottom: '0.6rem', color: TEXT.onLight, fontFamily: F.sans, whiteSpace: 'pre-line' }}>{c.title}</h3>
              <p style={{ color: TEXT.mutedLight, fontSize: '0.82rem', lineHeight: 1.75, fontFamily: F.sans, whiteSpace: 'pre-line' }}>{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="fu" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <BtnOutline to="/pain" onLight>고민 더 보기 →</BtnOutline>
        </div>
      </div>
    </section>
  );
}

/* ─── Overview ──────────────────────────────────────────────────────────── */
const barData = [
  { h: '25%', v: '전', gold: false }, { h: '35%', v: '1M', gold: false },
  { h: '28%', v: '2M', gold: false }, { h: '45%', v: '3M', gold: false },
  { h: '40%', v: '4M', gold: false }, { h: '60%', v: '5M', gold: true },
  { h: '55%', v: '6M', gold: true },  { h: '75%', v: '7M→', gold: true },
];

function Overview() {
  return (
    <section style={{ background: LIGHT.bg0, padding: '6rem 5vw' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '5rem', alignItems: 'center' }}>
        <div className="fu">
          <SecLabel onLight>Our Approach</SecLabel>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, lineHeight: 1.35, marginBottom: '0.9rem', color: TEXT.onLight }}>
            목표 달성형 컨설팅으로<br />장기적 성장곡선을<br />만들어드립니다
          </h2>
          <p style={{ color: TEXT.mutedLight, lineHeight: 1.85, fontSize: '0.92rem', fontFamily: F.sans }}>
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

        {/* Chart */}
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

              // Initial state
              bars.forEach(b => { b.style.transform = 'scaleY(0)'; b.style.opacity = '0'; });

              const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                  // Animate bars
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

                return (
                  <>
                    {barData.map((bar, i) => {
                      const height = parseFloat(bar.h);
                      const barHeight = (height / 100) * 150;
                      const x = spacing + i * (barWidth + spacing);
                      const y = 180 - barHeight - 10;

                      return (
                        <g key={i}>
                          <rect
                            data-bar
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            fill={bar.gold ? BLUE._400 : 'url(#barGrad)'}
                            rx="3"
                            style={{ transformOrigin: `${x + barWidth / 2}px 170px` }}
                          />
                          <text
                            x={x + barWidth / 2}
                            y={y - 8}
                            textAnchor="middle"
                            fontSize="11"
                            fill={bar.gold ? BLUE._400 : BLUE._500}
                            fontFamily={F.sans}
                            fontWeight="600"
                          >
                            {bar.v}
                          </text>
                        </g>
                      );
                    })}
                  </>
                );
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

/* ─── Why Mini ──────────────────────────────────────────────────────────── */
const whyCards = [
  { icon: '🏥', t: '17년+ 임상 경험',     d: '교과서가 아닌 현장에서 배운 지식. 원장님 고민을 진짜로 이해합니다.' },
  { icon: '🎯', t: '100% 맞춤 솔루션',   d: '모든 병원은 다릅니다.\n획일적 패키지 대신\n우리 병원만의 전략을 설계합니다' },
  { icon: '⚡', t: '즉각 투입 가능한 팀', d: '물리치료사·간호조무사·행정직\n전문가가 상시 대기, 바로 현장에 투입 가능합니다.' },
];

function WhyMini() {
  return (
    <section style={{ background: LIGHT.bg1, padding: '6rem 5vw' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="fu" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <SecLabel center onLight>Why NestSolution</SecLabel>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: TEXT.onLight }}>왜 네스트솔루션인가?</h2>
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
          <BtnOutline to="/about" onLight>대표 소개 보기 →</BtnOutline>
        </div>
      </div>
    </section>
  );
}

/* ─── Cases Preview ─────────────────────────────────────────────────────── */
function CasesPreview() {
  const cards = [
    { dept: '🦴 정형외과', title: '○○외과', loc: 'CS관리 + 마케팅 + 인력관리 · 6개월', stats: [{ v: '+185%', l: '월 매출 성장' }, { v: '4.8★', l: '소비자 만족도' }, { v: '↓71%', l: '이직률' }] },
    { dept: '🦴 정형외과', title: '○○정형외과', loc: '경영개선 + 마케팅 + CS관리 · 5개월', stats: [{ v: '+165%', l: '월 매출 성장' }, { v: '4.7★', l: '소비자 만족도' }, { v: '↓58%', l: '이직률' }] },
    { dept: '🩺 내과', title: '○○내과의원', loc: '경영개선 + CS관리 + 인력관리 · 4개월', stats: [{ v: '+153%', l: '월 매출 성장' }, { v: '4.9★', l: '소비자 만족도' }, { v: '↓40%', l: '행정 업무량' }] },
  ];
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
              boxShadow: '0 2px 8px rgba(37,99,235,0.05)',
              display: 'block',
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
                    <strong className="text-grad" style={{ fontFamily: F.bebas, fontSize: '24px', display: 'block', lineHeight: 1.3, wordBreak: 'keep-all', overflow: 'visible', paddingTop: '0.1rem', paddingBottom: '0.1rem' }}>{s.v}</strong>
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

/* ─── CTA Band ──────────────────────────────────────────────────────────── */
function CtaBand() {
  return (
    <div style={{
      padding: '6rem 5vw', textAlign: 'center', position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, ${BLUE.ctaBg} 0%, #1E40AF 100%)`,
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
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#FFFFFF', color: BLUE._500, padding: '0.85rem 2rem', fontWeight: 700, fontSize: '0.87rem', textDecoration: 'none', borderRadius: '4px', fontFamily: F.sans, transition: 'all 0.2s' }}>무료 상담 신청 →</Link>
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

/* ─── Main ──────────────────────────────────────────────────────────────── */
export function Home() {
  useScrollAnimation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

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