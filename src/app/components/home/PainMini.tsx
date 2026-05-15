import { useEffect, useRef, type RefObject } from 'react';
import { Link } from 'react-router';
import { BLUE, TEXT, BORDER, LIGHT, F } from '../../utils/colors';
import { SecLabel } from '../shared/SecLabel';

const painCards = [
  { icon: '📉', title: '환자가 줄고 있어요',       desc: '신규 환자 유입 감소,\n재방문율 하락.\n마케팅을 해봤는데 효과가 없어요.' },
  { icon: '🤯', title: '진료 외 업무가\n너무 많아요', desc: '직원 관리, 청구,\n민원까지.\n진료에 집중하고 싶은데 경영에 치고 있어요.' },
  { icon: '👥', title: '직원이 자꾸\n그만 둬요',      desc: '뽑으면 나가고, 또 뽑고.\n서비스 품질도\n들쭉날쭉합니다.' },
  { icon: '🏥', title: '옆 병원과 차별화가 안 돼요', desc: '비슷한 진료,\n비슷한 위치.\n우리 병원만의 이유가 없어요.' },
];

function useSphereCanvas(canvasRef: RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const PI = Math.PI;
    const RADIUS = 180;
    const PERSPECTIVE = 250;
    const NEW_PER_FRAME = 10;
    const GROW = 200, WAIT = 50, SHRINK = 250;
    const COLOR = [59, 130, 246];
    const fVX = (2 * PI) / 2000;

    let w = 0, h = 0, cx = 0, cy = 0;
    let fAngle = 0, fSin = 0, fCos = 1;
    let rafId = 0;

    const setSize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
      cx = w / 2; cy = h / 2;
    };
    setSize();
    window.addEventListener('resize', setSize);

    interface P {
      x: number; y: number; z: number;
      vx: number; vy: number; vz: number;
      ax: number; ay: number; az: number;
      px: number; py: number; rz: number; rc: number;
      alpha: number;
      grow: number; wait: number; shrink: number;
      life: number; dead: boolean;
      prev: P | null; next: P | null;
    }

    const mk = (): P => ({
      x:0,y:0,z:0,vx:0,vy:0,vz:0,ax:0,ay:0,az:0,
      px:0,py:0,rz:0,rc:0,alpha:0,
      grow:0,wait:0,shrink:0,life:0,dead:false,prev:null,next:null,
    });

    const oRender: { first: P | null } = { first: null };
    const oBuffer: { first: P | null } = { first: null };

    for (let i = 0; i < 300; i++) {
      const p = mk();
      p.next = oBuffer.first;
      if (oBuffer.first) oBuffer.first.prev = p;
      oBuffer.first = p;
    }

    const swap = (p: P | null, src: { first: P | null }, dst: { first: P | null }): P => {
      if (p) {
        if (src.first === p) { src.first = p.next; if (p.next) p.next.prev = null; }
        else { if (p.prev) p.prev.next = p.next; if (p.next) p.next.prev = p.prev; }
      } else { p = mk(); }
      p.next = dst.first;
      if (dst.first) dst.first.prev = p;
      dst.first = p; p.prev = null;
      return p;
    };

    const r2 = () => 2 * Math.random() - 1;

    const init = (p: P) => {
      const a = Math.random() * PI * 2;
      const f = Math.acos(r2());
      p.x = RADIUS * Math.sin(f) * Math.cos(a);
      p.y = RADIUS * Math.sin(f) * Math.sin(a);
      p.z = RADIUS * Math.cos(f);
      p.vx = 0.001 * p.x; p.vy = 0.001 * p.y; p.vz = 0.001 * p.z;
      p.ax = 0; p.ay = 0; p.az = 0;
      p.alpha = 0; p.life = 0; p.dead = false;
      p.grow   = GROW   + r2() * (GROW   / 4);
      p.wait   = WAIT   + r2() * (WAIT   / 4);
      p.shrink = SHRINK + r2() * (SHRINK / 4);
    };

    const update = (p: P) => {
      if (p.life > p.grow + p.wait) {
        p.vx += p.ax + 0.1 * r2();
        p.vy += p.ay + 0.1 * r2();
        p.vz += p.az + 0.1 * r2();
        p.x += p.vx; p.y += p.vy; p.z += p.vz;
      }
      const rx = fCos * p.x + fSin * p.z;
      p.rz = -fSin * p.x + fCos * p.z;
      p.rc = Math.max(0.01, PERSPECTIVE / (PERSPECTIVE - p.rz));
      p.px = rx * p.rc + cx;
      p.py = p.y * p.rc + cy;
      p.life++;
      if      (p.life < p.grow)                       p.alpha = p.life / p.grow;
      else if (p.life < p.grow + p.wait)              p.alpha = 1;
      else if (p.life < p.grow + p.wait + p.shrink)   p.alpha = (p.grow + p.wait + p.shrink - p.life) / p.shrink;
      else                                             p.dead = true;
      if (p.dead) swap(p, oRender, oBuffer);
      p.alpha *= Math.min(1, Math.max(0.5, p.rz / RADIUS));
      p.alpha  = Math.min(1, Math.max(0, p.alpha));
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      let p = oRender.first;
      while (p) {
        ctx.fillStyle = `rgba(${COLOR.join(',')},${p.alpha.toFixed(4)})`;
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.rc, 0, 2 * PI);
        ctx.fill();
        p = p.next;
      }
    };

    const frame = () => {
      fAngle = (fAngle + fVX) % (2 * PI);
      fSin = Math.sin(fAngle); fCos = Math.cos(fAngle);
      let i = 0;
      while (i++ < NEW_PER_FRAME) { const p = swap(oBuffer.first, oBuffer, oRender); init(p); }
      let p = oRender.first;
      while (p) { const nx = p.next; update(p); p = nx; }
      render();
      rafId = requestAnimationFrame(frame);
    };

    frame();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', setSize); };
  }, [canvasRef]);
}

export function PainMini() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useSphereCanvas(canvasRef);

  return (
    <section style={{ background: LIGHT.bg1, padding: '5rem 5vw', position: 'relative', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity: 0.14, pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="fu" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <SecLabel center onLight>Pain Point</SecLabel>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: TEXT.onLight }}>원장님, 이런 고민 있으신가요?</h2>
        </div>
        <div className="pain-marquee-wrap" style={{ overflow: 'hidden', padding: '0.5rem 0 1rem' }}>
          <div className="pain-marquee-track">
            {[...painCards, ...painCards].map((c, i) => (
              <div key={i} style={{
                background: '#FFFFFF', border: `1px solid ${BORDER.light}`,
                padding: '2.2rem 1.8rem', position: 'relative', overflow: 'hidden',
                borderRadius: '15px', transition: 'all 0.3s', flexShrink: 0, width: 270,
                boxShadow: '0 2px 8px rgba(37,99,235,0.05)',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BLUE._400; el.style.boxShadow = '0 8px 28px rgba(37,99,235,0.12)'; el.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BORDER.light; el.style.boxShadow = '0 2px 8px rgba(37,99,235,0.05)'; el.style.transform = 'none'; }}
              >
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${BLUE._500},${BLUE._300})` }} />
                <div style={{ fontFamily: F.bebas, fontSize: '2.8rem', color: BLUE.dim, lineHeight: 1, marginBottom: '0.7rem' }}>{String((i % painCards.length) + 1).padStart(2, '0')}</div>
                <h3 style={{ fontSize: '0.97rem', fontWeight: 700, marginBottom: '0.6rem', color: TEXT.onLight, fontFamily: F.sans, whiteSpace: 'pre-line' }}>{c.title}</h3>
                <p style={{ color: TEXT.mutedLight, fontSize: '0.82rem', lineHeight: 1.75, fontFamily: F.sans, whiteSpace: 'pre-line' }}>{c.desc}</p>
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
