import { useEffect, useRef, type RefObject } from 'react';
import { Link } from 'react-router';
import { BLUE, F } from '../../utils/colors';
import { SecLabel } from '../shared/SecLabel';

const painCards = [
  { icon: '📉', title: '환자가 줄고 있어요',       desc: '신규 환자 유입 감소,\n재방문율 하락.\n마케팅을 해봤는데 효과가 없어요.' },
  { icon: '🤯', title: '진료 외 업무가\n너무 많아요', desc: '직원 관리, 청구,\n민원까지.\n진료에 집중하고 싶은데 경영에 치고 있어요.' },
  { icon: '👥', title: '직원이 자꾸\n그만 둬요',      desc: '뽑으면 나가고, 또 뽑고.\n서비스 품질도\n들쭉날쭉합니다.' },
  { icon: '🏥', title: '옆 병원과 차별화가 안 돼요', desc: '비슷한 진료,\n비슷한 위치.\n우리 병원만의 이유가 없어요.' },
];

function useDotWaveCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = 0, h = 0, t = 0, rafId = 0;
    const SPACING = 42;

    const setSize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    setSize();
    window.addEventListener('resize', setSize);

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.016;
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const wave = Math.sin(c * 0.5 + r * 0.35 + t) * 0.5 + 0.5;
          const radius = 1.5 + wave * 2.8;
          const alpha  = 0.35 + wave * 0.65;
          ctx.beginPath();
          ctx.arc(c * SPACING, r * SPACING, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(10,25,90,${alpha.toFixed(3)})`;
          ctx.fill();
        }
      }
      rafId = requestAnimationFrame(frame);
    };

    frame();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', setSize); };
  }, [canvasRef]);
}

export function PainMini() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useDotWaveCanvas(canvasRef);

  return (
    <section style={{ background: 'linear-gradient(155deg,#060D1F 0%,#0B1A3A 100%)', padding: '5rem 5vw', position: 'relative', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.35, pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="fu" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <SecLabel center>Pain Point</SecLabel>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: '#FFFFFF' }}>원장님, 이런 고민 있으신가요?</h2>
        </div>
        <div className="pain-marquee-wrap" style={{ overflow: 'hidden', padding: '0.5rem 0 1rem' }}>
          <div className="pain-marquee-track">
            {[...painCards, ...painCards].map((c, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                padding: '2.2rem 1.8rem', position: 'relative', overflow: 'hidden',
                borderRadius: '15px', transition: 'all 0.3s', flexShrink: 0, width: 270,
                boxShadow: '0 2px 16px rgba(0,0,0,0.25)',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BLUE._400; el.style.boxShadow = '0 8px 32px rgba(37,99,235,0.3)'; el.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(255,255,255,0.12)'; el.style.boxShadow = '0 2px 16px rgba(0,0,0,0.25)'; el.style.transform = 'none'; }}
              >
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${BLUE._500},${BLUE._300})` }} />
                <div style={{ fontFamily: F.bebas, fontSize: '2.8rem', color: 'rgba(147,197,253,0.35)', lineHeight: 1, marginBottom: '0.7rem' }}>{String((i % painCards.length) + 1).padStart(2, '0')}</div>
                <h3 style={{ fontSize: '0.97rem', fontWeight: 700, marginBottom: '0.6rem', color: '#FFFFFF', fontFamily: F.sans, whiteSpace: 'pre-line' }}>{c.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.82rem', lineHeight: 1.75, fontFamily: F.sans, whiteSpace: 'pre-line' }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="fu" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/pain" className="hero-btn-primary" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: `linear-gradient(135deg,${BLUE._500},${BLUE._400})`,
            color: '#fff', padding: '0.85rem 2rem',
            fontWeight: 700, fontSize: '0.87rem', letterSpacing: '0.05em',
            textDecoration: 'none', fontFamily: F.sans, borderRadius: '10px',
            boxShadow: `0 4px 18px rgba(37,99,235,0.35)`,
          }}>고민 더 보기 →</Link>
        </div>
      </div>
    </section>
  );
}
