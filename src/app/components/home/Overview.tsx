import { useEffect, useRef } from 'react';
import { BLUE, TEXT, BORDER, DARK, F } from '../../utils/colors';
import { SecLabel } from '../shared/SecLabel';
import { BtnPrimary } from '../shared/Buttons';

const PULSE_D = `M13,345.056c0,0,181.559,0,197.824,0s19.235-37.914,30.394-37.33c14.786,0.774,9.689,48.615,27.664,48.615c16.654,0,18.426-155.599,20.173-171.027s8.672-6.88,8.672-0.023c0,6.857,3.016,188.349,4.718,210.105c1.251,15.993,8.25,11.16,9.542,1.028c1.311-10.285,4.058-74.211,17.194-74.211s4.376,22.844,25.92,22.844c10.696,0,226.399,0,226.399,0`;

const barData = [
  { h: '25%', v: '전', gold: false }, { h: '35%', v: '1M', gold: false },
  { h: '28%', v: '2M', gold: false }, { h: '45%', v: '3M', gold: false },
  { h: '40%', v: '4M', gold: false }, { h: '60%', v: '5M', gold: true },
  { h: '55%', v: '6M', gold: true },  { h: '75%', v: '7M→', gold: true },
];

const TRAIL_COUNT = 15;
const DURATION = 3500;

function usePulseAnim(
  svgRef:   { current: SVGSVGElement  | null },
  pulseRef: { current: SVGPathElement | null },
) {
  useEffect(() => {
    const svg   = svgRef.current;
    const pulse = pulseRef.current;
    if (!svg || !pulse) return;

    const L = pulse.getTotalLength();
    if (!L) return;
    const W = L * 0.03;

    // BL — draws the full line as cursor advances
    const bl = pulse.cloneNode(true) as SVGPathElement;
    bl.setAttribute('stroke-width', '3');
    bl.style.filter = 'none';
    svg.appendChild(bl);

    // trailing glow windows
    const trails: SVGPathElement[] = [];
    for (let i = 0; i < TRAIL_COUNT; i++) {
      const cl = pulse.cloneNode(true) as SVGPathElement;
      cl.setAttribute('stroke', `rgba(19,195,173,${((TRAIL_COUNT - i) * 0.04).toFixed(2)})`);
      cl.style.filter = 'none';
      svg.appendChild(cl);
      trails.push(cl);
    }

    pulse.style.filter = 'url(#ov-glow)';

    let t0 = 0, rafId = 0;

    const frame = (ts: number) => {
      if (!t0) t0 = ts;
      const elapsed = (ts - t0) % DURATION;
      const t = elapsed / DURATION;
      const pos = t * L;
      const alpha = t < 0.05 ? t / 0.05 : t > 0.9 ? Math.max(0, (1 - t) / 0.1) : 1;

      // glow cursor
      pulse.style.strokeDasharray = `${Math.max(1, L * 0.012)} ${L}`;
      pulse.style.strokeDashoffset = String(-pos);
      pulse.style.opacity          = String(alpha);

      // BL: draw from 0 → pos
      bl.style.strokeDasharray  = `${pos} ${L + 1}`;
      bl.style.strokeDashoffset = '0';
      const blA = alpha * (t > 0.57 ? Math.max(0.01, 0.05 * (1 - (t - 0.57) / 0.43)) : 0.05);
      bl.setAttribute('stroke', `rgba(0,255,223,${blA.toFixed(3)})`);
      bl.setAttribute('stroke-width', String(Math.max(4, 9 - Math.max(0, (t - 0.57) / 0.43) * 5).toFixed(1)));

      // trailing windows
      trails.forEach((tr, i) => {
        const te = elapsed - i * 40;
        if (te < 0) { tr.style.strokeDasharray = '0 9999'; return; }
        tr.style.strokeDasharray  = `${W} 9999`;
        tr.style.strokeDashoffset = String(-(te / DURATION) * L);
        tr.style.opacity          = String(alpha);
      });

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(rafId);
      [bl, ...trails].forEach(el => { try { el.parentNode?.removeChild(el); } catch { /**/ } });
    };
  }, [svgRef, pulseRef]);
}

export function Overview() {
  const svgRef   = useRef<SVGSVGElement>(null);
  const pulseRef = useRef<SVGPathElement>(null);
  usePulseAnim(svgRef, pulseRef);

  return (
    <section style={{ background: '#001919', padding: '6rem 5vw', position: 'relative', overflow: 'hidden' }}>

      {/* ── ECG full-section background ── */}
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.55, pointerEvents: 'none' }}
      >
        <defs>
          <pattern id="ov-grid" y="-7" width="50" height="50" patternUnits="userSpaceOnUse">
            <rect width="50" height="50" stroke="#003d3d" fill="none" />
          </pattern>
          <filter id="ov-glow" height="200%">
            <feGaussianBlur stdDeviation="10" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="600" height="600" fill="url(#ov-grid)" />
        <path
          ref={pulseRef}
          fill="none"
          stroke="#00ffdf"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          d={PULSE_D}
        />
      </svg>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '5rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>

        {/* Left column */}
        <div className="fu">
          <SecLabel>Our Approach</SecLabel>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, lineHeight: 1.35, marginBottom: '0.9rem', color: TEXT.onDark }}>
            목표 달성형 컨설팅으로<br />장기적 성장곡선을<br />만들어드립니다
          </h2>
          <p className="speakable" style={{ color: TEXT.mutedDark, lineHeight: 1.85, fontSize: '0.92rem', fontFamily: F.sans }}>
            네스트솔루션은 병원의 니즈와 현황을 정밀하게 파악하여, 원장님의 병원에만 맞는 완전 맞춤 전략을 수립합니다.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1.8rem' }}>
            {[
              { t: '탄탄한 운영 기반 구축', d: '지역 특성과 환자 데이터 분석으로 성공적인 시작을' },
              { t: '우리 병원 강점 강화',   d: '경쟁 병원과 확실히 차별되는 포지셔닝' },
              { t: '내부 시스템 완전 개선', d: 'CS, 인력, 운영 프로세스 전면 최적화' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 1.2rem', background: 'rgba(0,255,223,0.05)', border: `1px solid rgba(0,255,223,0.15)`, borderRadius: '4px' }}>
                <span style={{ color: '#00ffdf', fontSize: '1rem', flexShrink: 0, marginTop: '0.05rem' }}>✓</span>
                <div>
                  <strong style={{ fontSize: '0.88rem', display: 'block', marginBottom: '0.2rem', color: TEXT.onDark, fontFamily: F.sans }}>{item.t}</strong>
                  <p style={{ color: TEXT.mutedDark, fontSize: '0.79rem', lineHeight: 1.55, fontFamily: F.sans }}>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}><BtnPrimary to="/services">서비스 자세히 보기 →</BtnPrimary></div>
        </div>

        {/* Right column — chart card */}
        <div className="fu d2" style={{
          background: 'rgba(0,25,25,0.75)', border: `1px solid rgba(0,255,223,0.2)`,
          padding: '2.5rem', borderRadius: '8px',
          boxShadow: '0 4px 40px rgba(0,255,223,0.08)',
          backdropFilter: 'blur(8px)',
        }}>
          <div style={{ fontSize: '0.68rem', color: TEXT.mutedDark, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: F.sans }}>
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
                <linearGradient id="ov-barGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#00ffdf" />
                  <stop offset="100%" stopColor="#00b39e" />
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
                        fill={bar.gold ? '#00ffdf' : 'url(#ov-barGrad)'} rx="3"
                        style={{ transformOrigin: `${x + barWidth / 2}px 170px` }} />
                      <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fontSize="11"
                        fill={bar.gold ? '#00ffdf' : '#00c4a8'} fontFamily={F.sans} fontWeight="600">{bar.v}</text>
                    </g>
                  );
                });
              })()}
            </svg>
          </div>
          <div style={{ fontSize: '0.72rem', color: TEXT.mutedDark, textAlign: 'center', marginTop: '1rem', fontFamily: F.sans }}>✦ 평균 매출 성장 추이 (시뮬레이션)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '1.3rem' }}>
            {['CS개선', '신환↑', '재방문↑', '비용↓'].map(t => (
              <span key={t} style={{ fontSize: '0.67rem', letterSpacing: '0.06em', border: `1px solid rgba(0,255,223,0.25)`, color: '#00ffdf', padding: '0.25rem 0.7rem', borderRadius: '20px', fontFamily: F.sans }}>{t}</span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
