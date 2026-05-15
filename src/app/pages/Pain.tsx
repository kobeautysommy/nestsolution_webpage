import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { BLUE, TEXT, BORDER, DARK, LIGHT, F } from '../utils/colors';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SecLabel } from '../components/shared/SecLabel';
import { PageBanner } from '../components/shared/PageBanner';
import { CtaBand } from '../components/shared/CtaBand';
import { FaqAccordion } from '../components/shared/FaqAccordion';
import { BtnPrimary, BtnOutline } from '../components/shared/Buttons';
import { painFaq } from '../data/faq';
import { Link } from 'react-router';

function TestimonialsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement!;
    let W = parent.offsetWidth;
    let H = parent.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, W / H, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // ── Particles ──────────────────────────────────
    const N = 110;
    const pPos = new Float32Array(N * 3);
    const vels: [number, number, number][] = [];

    for (let i = 0; i < N; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 16;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      vels.push([
        (Math.random() - 0.5) * 0.013,
        (Math.random() - 0.5) * 0.009,
        (Math.random() - 0.5) * 0.006,
      ]);
    }

    const ptGeo = new THREE.BufferGeometry();
    const ptBuf = new THREE.BufferAttribute(pPos, 3);
    ptGeo.setAttribute('position', ptBuf);
    const ptMat = new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.09, transparent: true, opacity: 0.9 });
    scene.add(new THREE.Points(ptGeo, ptMat));

    // ── Lines ──────────────────────────────────────
    const MAX_L = 200;
    const lPos = new Float32Array(MAX_L * 6);
    const lGeo = new THREE.BufferGeometry();
    const lBuf = new THREE.BufferAttribute(lPos, 3);
    lGeo.setAttribute('position', lBuf);
    lGeo.setDrawRange(0, 0);
    const lMat = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.28 });
    const lineSegs = new THREE.LineSegments(lGeo, lMat);
    scene.add(lineSegs);

    const DIST_SQ = 3.0 * 3.0;
    let raf: number;
    let t = 0;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      t += 0.004;

      for (let i = 0; i < N; i++) {
        pPos[i * 3]     += vels[i][0];
        pPos[i * 3 + 1] += vels[i][1];
        pPos[i * 3 + 2] += vels[i][2];
        if (Math.abs(pPos[i * 3])     > 8)   vels[i][0] *= -1;
        if (Math.abs(pPos[i * 3 + 1]) > 4)   vels[i][1] *= -1;
        if (Math.abs(pPos[i * 3 + 2]) > 2.5) vels[i][2] *= -1;
      }
      ptBuf.needsUpdate = true;

      let li = 0;
      for (let i = 0; i < N && li < MAX_L; i++) {
        for (let j = i + 1; j < N && li < MAX_L; j++) {
          const dx = pPos[i*3]   - pPos[j*3];
          const dy = pPos[i*3+1] - pPos[j*3+1];
          const dz = pPos[i*3+2] - pPos[j*3+2];
          if (dx*dx + dy*dy + dz*dz < DIST_SQ) {
            lPos[li*6]   = pPos[i*3];   lPos[li*6+1] = pPos[i*3+1]; lPos[li*6+2] = pPos[i*3+2];
            lPos[li*6+3] = pPos[j*3];   lPos[li*6+4] = pPos[j*3+1]; lPos[li*6+5] = pPos[j*3+2];
            li++;
          }
        }
      }
      lGeo.setDrawRange(0, li * 2);
      lBuf.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.14) * 0.9;
      camera.position.y = Math.cos(t * 0.09) * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      W = parent.offsetWidth;
      H = parent.offsetHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      ptGeo.dispose();
      lGeo.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}

const painCards = [
  { icon: '📉', title: '환자가 계속 줄고 있어요', desc: '신규 환자 유입이 눈에 띄게 줄었습니다. 마케팅에 돈도 써봤는데 효과가 없고, 기존 환자들의 재방문율도 점점 낮아지고 있어요.', solution: '네스트솔루션의 마케팅 & CS 솔루션으로 해결' },
  { icon: '🤯', title: '진료 외 업무에 치여요', desc: '직원 관리, 보험 청구, 민원 응대, SNS 관리까지. 진료에 집중하고 싶은데 경영 업무에 치여 하루가 다 갑니다.', solution: '경영 개선 & 행정 시스템 구축으로 해결' },
  { icon: '👥', title: '직원이 자꾸 그만둬요', desc: '뽑으면 나가고, 또 뽑고, 또 나가고. 직원 교육도 제대로 못 하고, 서비스 품질도 들쭉날쭉합니다. 이직률이 너무 높습니다.', solution: '인력 관리 & 조직 문화 구축으로 해결' },
  { icon: '🏥', title: '옆 병원과 차별화가\n안 돼요', desc: '비슷한 진료과목, 비슷한 위치, 비슷한 가격. 환자에게 우리 병원을 선택해야 할 이유를 못 만들어주고 있어요.', solution: '브랜딩 & 마케팅 전략으로 해결' },
  { icon: '💸', title: '매출이 정체되어 있어요', desc: '환자 수는 비슷한데 매출이 늘지 않습니다. 수익 구조를 어떻게 개선해야 할지 모르겠어요. 청구 누락이 있는 건 아닌지 불안합니다.', solution: '수익 구조 분석 & 경영 컨설팅으로 해결' },
  { icon: '😟', title: '환자 불만·리뷰가\n걱정돼요', desc: '온라인 리뷰에 부정적인 내용이 올라오기 시작했습니다. CS를 어떻게 체계적으로 관리해야 할지 모르겠어요.', solution: 'CS 시스템 구축 & 직원 교육으로 해결' },
];

const testimonials = [
  { text: '"환자가 계속 줄어서 정말 막막했는데, 네스트솔루션과 함께하고 3개월 만에 신규 환자가 눈에 띄게 늘었습니다. 마케팅보다 CS가 먼저라는 걸 알게 됐어요."', meta: '정형외과 원장 · 서울 관악구' },
  { text: '"직원이 6개월 만에 3명이나 그만뒀는데, 인력 관리 컨설팅 후 1년째 팀이 안정적으로 유지되고 있어요. 직원 교육 시스템이 이렇게 중요한 줄 몰랐습니다."', meta: '내과 원장 · 경기도 성남' },
  { text: '"진료만 하느라 경영은 거의 손을 못 댔는데, 행정 시스템을 구축해주고 나서 퇴근 시간이 1시간 이상 빨라졌어요. 삶의 질이 달라졌습니다."', meta: '한의원 원장 · 인천 부평' },
];

export function Pain() {
  useScrollAnimation();

  return (
    <div style={{ background: LIGHT.bg0 }}>
      <PageBanner
        label="Pain Point"
        title={<>원장님,<br />이런 <span className="text-grad">고민</span> 있으신가요?</>}
        desc="혼자 해결하려 하지 마세요. 네스트솔루션이 함께 고민하고 함께 해결합니다. 17년 임상 경험으로 쌓은 현장의 지혜로, 원장님의 문제를 정확히 이해합니다."
      />

      {/* ── Pain cards — dark bg + floating orbs ── */}
      <section style={{ background: DARK.bg0, padding: '6rem 5vw', position: 'relative', overflow: 'hidden' }}>
        {/* animated grid */}
        <div style={{ position: 'absolute', inset: '-50%', backgroundImage: `linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)`, backgroundSize: '70px 70px', animation: 'gMove 28s linear infinite', pointerEvents: 'none' }} />
        {/* floating orbs */}
        <div style={{ position: 'absolute', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)', top: '-160px', left: '-120px', animation: 'floatOrbA 16s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(96,165,250,0.13) 0%, transparent 70%)', bottom: '-120px', right: '-80px', animation: 'floatOrbB 20s ease-in-out infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', top: '40%', right: '25%', animation: 'floatOrbC 24s ease-in-out infinite', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
          {painCards.map((c, i) => (
            <div key={i} className={`fu d${(i % 4) + 1}`} style={{ perspective: '1000px', height: '300px' }}>
              <div
                style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform 0.65s cubic-bezier(0.4,0.2,0.2,1)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'rotateY(180deg)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'rotateY(0deg)'; }}
              >
                {/* Front */}
                <div style={{
                  position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                  background: DARK.card, border: `1px solid ${BORDER.dark}`,
                  padding: '1.8rem 2.2rem 2.8rem', borderRadius: '10px', overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${BLUE._500},${BLUE._300})` }} />
                  <div style={{ fontFamily: F.bebas, fontSize: '3.5rem', color: 'rgba(59,130,246,0.12)', lineHeight: 0.85, marginBottom: '0.5rem' }}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '0.8rem', color: TEXT.onDark, fontFamily: F.sans, whiteSpace: 'pre-line' }}>{c.title}</h3>
                  <p style={{ color: TEXT.mutedDark, fontSize: '0.86rem', lineHeight: 1.8, fontFamily: F.sans }}>{c.desc}</p>
                </div>
                {/* Back */}
                <div style={{
                  position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: `linear-gradient(135deg,${BLUE._600},${BLUE._400})`,
                  border: `1px solid ${BLUE._400}`, borderRadius: '10px', padding: '1.8rem 2.2rem 3.2rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
                  boxShadow: '0 12px 36px rgba(37,99,235,0.3)',
                }}>
                  <div style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '0.9rem', fontFamily: F.sans }}>Solution</div>
                  <div style={{ fontFamily: F.bebas, fontSize: '3.5rem', color: 'rgba(255,255,255,0.12)', lineHeight: 0.85, marginBottom: '0.7rem' }}>{String(i + 1).padStart(2, '0')}</div>
                  <p style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 700, lineHeight: 1.7, fontFamily: F.sans, marginBottom: '1.6rem' }}>{c.solution}</p>
                  <div style={{ width: '2rem', height: '2px', background: 'rgba(255,255,255,0.4)', marginBottom: '1.2rem' }} />
                  <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', fontFamily: F.sans }}>자세한 내용은 무료 상담으로 →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Service chips bar ── */}
      <section style={{ background: DARK.bg1, padding: '2.5rem 5vw', borderTop: `1px solid ${BORDER.dark}`, borderBottom: `1px solid ${BORDER.dark}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.2rem' }}>
          <div>
            <p style={{ fontFamily: F.serif, fontSize: '1rem', fontWeight: 700, color: TEXT.onDark, marginBottom: '0.2rem' }}>어떤 서비스로 해결할 수 있을까요?</p>
            <p style={{ fontSize: '0.8rem', color: TEXT.mutedDark, fontFamily: F.sans }}>고민에 맞는 서비스를 바로 확인하세요</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['CS 관리', '마케팅', '경영 개선', '인력 관리'].map(s => (
              <Link key={s} to="/services" style={{
                fontSize: '0.78rem', border: `1px solid ${BLUE._400}`, color: BLUE._300,
                padding: '0.35rem 0.9rem', borderRadius: '20px', textDecoration: 'none',
                fontFamily: F.sans, whiteSpace: 'nowrap',
                transition: 'background 0.2s, color 0.2s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = BLUE._500; el.style.color = '#fff'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = BLUE._300; }}
              >{s} →</Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials — Three.js particle network ── */}
      <section style={{ padding: '6rem 5vw', position: 'relative', overflow: 'hidden', background: DARK.bg0 }}>
        <TestimonialsCanvas />
        <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="fu" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SecLabel center>Real Voice</SecLabel>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: TEXT.onDark }}>함께한 원장님들의 이야기</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.2rem' }}>
            {testimonials.map((t, i) => (
              <div key={i} className={`fu d${i + 1}`} style={{
                background: 'rgba(6,14,26,0.72)', backdropFilter: 'blur(12px)',
                border: `1px solid ${BORDER.dark}`, padding: '2rem',
                borderTop: `3px solid ${BLUE._400}`, borderRadius: '10px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.35)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.5)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.35)'; }}
              >
                <p style={{ color: TEXT.mutedDark, fontSize: '0.88rem', lineHeight: 1.85, marginBottom: '1.2rem', fontStyle: 'italic', fontFamily: F.sans }}>{t.text}</p>
                <div style={{ fontSize: '0.75rem', color: BLUE._300, letterSpacing: '0.06em', fontFamily: F.sans }}>{t.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ — light bg + animated grid ── */}
      <section style={{ background: LIGHT.bg0, padding: '6rem 5vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: '-50%', backgroundImage: `linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px)`, backgroundSize: '70px 70px', animation: 'gMove 32s linear infinite', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <SecLabel center>FAQ</SecLabel>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, color: TEXT.onLight }}>자주 묻는 질문</h2>
          </div>
          <FaqAccordion items={painFaq} />
        </div>
      </section>

      <CtaBand
        title="지금 바로 해결할 수 있습니다"
        desc="상담은 항상 무료입니다. 원장님의 고민을 들려주세요."
        secondaryCta={{ label: '서비스 보기', to: '/services' }}
        bgImage="https://internwise.s3.eu-west-2.amazonaws.com/uploads/230905090356898660.jpg"
      />
    </div>
  );
}
