import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { BLUE, TEXT, BORDER, DARK, LIGHT, F, accentGrad } from '../utils/colors';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SecLabel = ({ children, center }: { children: string; center?: boolean }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '0.9rem', justifyContent: center ? 'center' : undefined }}>
    <span style={{ width: 20, height: 1, background: BLUE._500, display: 'inline-block' }} />{children}
  </div>
);

const steps = [
  { n: '01', t: '심층 분석 & 진단', d: '현장 방문, 직원 인터뷰, 데이터 분석으로 병원의 현재 상태를 정확히 파악합니다.' },
  { n: '02', t: '맞춤 전략 수립', d: '분석 결과를 바탕으로 원장님과 함께 목표를 설정하고 실행 전략을 설계합니다.' },
  { n: '03', t: '현장 실행 & 지원', d: '전략을 직접 현장에서 실행하고, 직원이 적응할 때까지 함께 지원합니다.' },
  { n: '04', t: '지속 모니터링', d: '월별 KPI 리포트와 피드백으로 성과를 지속 관리하며 함께 성장합니다.' },
];

const timeline = [
  { side: 'L', tag: 'Step 01 — 1~2주차', title: '현장 방문 & 초기 진단', desc: '암행 환자로 직접 방문해 CS를 체험하고, 직원 개별 인터뷰, 매출·청구 데이터 분석으로 병원의 현재를 객관적으로 파악합니다.', n: '01' },
  { side: 'R', tag: 'Step 01 — 2~3주차', title: '진단 리포트 & 전략 발표', desc: '분석 결과를 바탕으로 문제의 근본 원인을 정리하고, 우선순위별 개선 방향과 기대 효과를 원장님께 상세히 발표합니다.', n: '02' },
  { side: 'L', tag: 'Step 02 — 3~4주차', title: '맞춤 전략 수립 & 확정', desc: '원장님의 목표와 병원 특성에 완전히 맞는 실행 계획을 함께 수립합니다. KPI, 타임라인, 역할 분담까지 명확히 설정합니다.', n: '03' },
  { side: 'R', tag: 'Step 03 — 1~3개월', title: '현장 실행 & 직원 교육', desc: 'CS 매뉴얼 제작, 직원 교육, 마케팅 채널 세팅, 행정 시스템 구축 등을 단계적으로 실행합니다.', n: '04' },
  { side: 'L', tag: 'Step 04 — 월별 지속', title: '성과 측정 & 지속 개선', desc: '매월 KPI 리포트를 통해 성과를 측정하고, 시장 변화와 병원 상황에 맞게 전략을 지속 최적화합니다.', n: '05' },
];

const faqs = [
  { q: '컨설팅 기간은 얼마나 걸리나요?', a: '기본 컨설팅은 초기 진단 2~4주, 실행 단계 1~3개월로 구성됩니다. 이후 지속 모니터링은 월별로 진행됩니다.' },
  { q: '비용은 어떻게 되나요?', a: '병원 규모, 필요 서비스, 컨설팅 범위에 따라 맞춤 견적을 제공합니다. 첫 상담은 무료이며, 합리적인 비용을 제안드립니다.' },
  { q: '작은 의원도 컨설팅이 가능한가요?', a: '네, 가능합니다. 소규모 의원일수록 작은 변화가 큰 효과를 만들어냅니다. 규모에 맞는 현실적인 전략을 수립합니다.' },
  { q: '원장님이 바빠서 시간이 없어도 되나요?', a: '네, 주요 의사결정 미팅 외 대부분의 실행은 네스트솔루션 팀이 주도합니다. 바쁜 원장님도 무리 없이 진행할 수 있습니다.' },
  { q: '컨설팅 후 효과가 언제부터 나타나나요?', a: 'CS 교육의 경우 2~4주 내에 변화를 체감하고, 마케팅은 1~2개월 후, 경영 개선의 수익 효과는 3개월 이후 본격적으로 나타납니다.' },
];

export function Process() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useScrollAnimation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: LIGHT.bg0 }}>
      {/* Banner */}
      <div style={{ padding: '9rem 5vw 5rem', position: 'relative', overflow: 'hidden', background: `linear-gradient(155deg,${DARK.bg1},${DARK.bg0})`, borderBottom: `1px solid ${BORDER.bw}` }}>
        <div style={{ position: 'absolute', inset: '-50%', backgroundImage: `linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)`, backgroundSize: '70px 70px', animation: 'gMove 28s linear infinite' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
          <SecLabel>Process</SecLabel>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: '1rem', color: TEXT.onDark }}>
            네스트솔루션의<br /><span className="text-grad">컨설팅 과정</span>
          </h1>
          <p style={{ color: TEXT.mutedDark, fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 560, fontFamily: F.sans }}>체계적인 단계별 접근으로 확실한 변화를 만들어냅니다.<br />진단부터 실행, 모니터링까지 함께합니다.</p>
        </div>
      </div>

      {/* 4 Steps */}
      <section style={{ background: LIGHT.bg0, padding: '6rem 5vw' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="fu" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SecLabel center>Step Overview</SecLabel>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: TEXT.onLight }}>4단계 컨설팅 프로세스</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1.5rem' }}>
            {steps.map((s, i) => (
              <div key={i} className={`fu d${i + 1}`} style={{
                background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '2.5rem 1.8rem',
                textAlign: 'center', position: 'relative', overflow: 'hidden', borderRadius: '8px',
                transition: 'all 0.3s', boxShadow: '0 2px 8px rgba(37,99,235,0.05)',
              }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BLUE._400; el.style.boxShadow = '0 12px 36px rgba(37,99,235,0.14)'; el.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BORDER.light; el.style.boxShadow = '0 2px 8px rgba(37,99,235,0.05)'; el.style.transform = 'none'; }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${BLUE._500},${BLUE._300})` }} />
                <div className="text-grad" style={{ fontFamily: F.bebas, fontSize: '3rem', lineHeight: 1, marginBottom: '0.8rem' }}>{s.n}</div>
                <h3 style={{ fontSize: '0.97rem', fontWeight: 700, marginBottom: '0.6rem', color: TEXT.onLight, fontFamily: F.sans }}>{s.t}</h3>
                <p style={{ color: TEXT.mutedLight, fontSize: '0.82rem', lineHeight: 1.7, fontFamily: F.sans }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: LIGHT.bg1, padding: '6rem 5vw' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="fu" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <SecLabel center>Detail Process</SecLabel>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: TEXT.onLight }}>단계별 세부 진행 내용</h2>
          </div>
          <div style={{ position: 'relative', maxWidth: 860, margin: '0 auto' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: BORDER.light, transform: 'translateX(-50%)' }} className="hidden md:block" />
            {timeline.map((t, i) => (
              <div key={i} className={`fu d${(i % 3) + 1}`}>
                {/* 모바일 레이아웃 */}
                <div className="md:hidden" style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.8rem' }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#FFFFFF', border: `2px solid ${BLUE._500}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.bebas, fontSize: '1rem', color: BLUE._500, boxShadow: `0 0 0 4px ${BLUE.dim}`, flexShrink: 0 }}>{t.n}</div>
                    <div style={{ flex: 1, background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '1.2rem', borderLeft: `3px solid ${BLUE._500}`, borderRadius: '6px', boxShadow: '0 2px 8px rgba(37,99,235,0.06)' }}>
                      <div style={{ fontSize: '0.67rem', letterSpacing: '0.08em', color: BLUE._400, marginBottom: '0.5rem', textTransform: 'uppercase', fontFamily: F.sans }}>{t.tag}</div>
                      <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.4rem', color: BLUE._500, fontFamily: F.sans }}>{t.title}</h4>
                      <p style={{ color: TEXT.mutedLight, fontSize: '0.81rem', lineHeight: 1.7, fontFamily: F.sans }}>{t.desc}</p>
                    </div>
                  </div>
                </div>
                
                {/* 데스크탑 레이아웃 */}
                <div className="hidden md:grid" style={{ gridTemplateColumns: '1fr 52px 1fr', alignItems: 'start', marginBottom: '2.5rem' }}>
                  <div style={{ paddingRight: '2.5rem', textAlign: 'right' }}>
                    {t.side === 'L' && (
                      <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '1.6rem', borderRight: `3px solid ${BLUE._500}`, borderRadius: '6px', boxShadow: '0 2px 8px rgba(37,99,235,0.06)' }}>
                        <div style={{ fontSize: '0.67rem', letterSpacing: '0.08em', color: BLUE._400, marginBottom: '0.5rem', textTransform: 'uppercase', fontFamily: F.sans }}>{t.tag}</div>
                        <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.4rem', color: BLUE._500, fontFamily: F.sans }}>{t.title}</h4>
                        <p style={{ color: TEXT.mutedLight, fontSize: '0.81rem', lineHeight: 1.7, fontFamily: F.sans }}>{t.desc}</p>
                      </div>
                    )}
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#FFFFFF', border: `2px solid ${BLUE._500}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: F.bebas, fontSize: '1rem', color: BLUE._500, margin: '0 auto', position: 'relative', zIndex: 1, boxShadow: `0 0 0 4px ${BLUE.dim}` }}>{t.n}</div>
                  <div style={{ paddingLeft: '2.5rem' }}>
                    {t.side === 'R' && (
                      <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '1.6rem', borderLeft: `3px solid ${BLUE._400}`, borderRadius: '6px', boxShadow: '0 2px 8px rgba(37,99,235,0.06)' }}>
                        <div style={{ fontSize: '0.67rem', letterSpacing: '0.08em', color: BLUE._400, marginBottom: '0.5rem', textTransform: 'uppercase', fontFamily: F.sans }}>{t.tag}</div>
                        <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.4rem', color: BLUE._500, fontFamily: F.sans }}>{t.title}</h4>
                        <p style={{ color: TEXT.mutedLight, fontSize: '0.81rem', lineHeight: 1.7, fontFamily: F.sans }}>{t.desc}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: LIGHT.bg0, padding: '6rem 5vw' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="fu" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SecLabel center>FAQ</SecLabel>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: TEXT.onLight }}>자주 묻는 질문</h2>
          </div>
          <div className="fu" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: 800, margin: '0 auto' }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ background: '#FFFFFF', border: `1px solid ${openFaq === i ? BLUE._400 : BORDER.light}`, borderRadius: '8px', overflow: 'hidden', boxShadow: openFaq === i ? '0 4px 20px rgba(37,99,235,0.1)' : '0 1px 4px rgba(37,99,235,0.04)', transition: 'all 0.2s' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                  width: '100%', textAlign: 'left', background: 'none', border: 'none',
                  padding: '1.4rem 1.8rem', fontFamily: F.sans, fontSize: '0.95rem', fontWeight: 600,
                  color: openFaq === i ? BLUE._500 : TEXT.onLight, cursor: 'pointer',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
                }}>
                  {f.q}
                  <span style={{ color: BLUE._500, transition: 'transform 0.3s', transform: openFaq === i ? 'rotate(180deg)' : 'none', flexShrink: 0 }}>▼</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: '0 1.8rem 1.4rem', color: TEXT.mutedLight, fontSize: '0.88rem', lineHeight: 1.8, borderTop: `1px solid ${BORDER.light}`, fontFamily: F.sans }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ padding: '6rem 5vw', background: `linear-gradient(135deg,${BLUE.ctaBg},#1E40AF)`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div style={{ position: 'relative' }}>
          <h2 className="fu" style={{ fontFamily: F.serif, fontSize: 'clamp(1.7rem,3.2vw,2.8rem)', fontWeight: 700, marginBottom: '0.9rem', color: '#FFFFFF' }}>지금 시작하세요</h2>
          <p className="fu" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '0.92rem', fontFamily: F.sans }}>상담은 항상 무료입니다. 부담 없이 연락주세요.</p>
          <div className="fu">
            <Link to="/contact" style={{ display: 'inline-flex', background: '#FFFFFF', color: BLUE._500, padding: '0.85rem 2rem', fontWeight: 700, fontSize: '0.87rem', textDecoration: 'none', borderRadius: '4px', fontFamily: F.sans }}>무료 상담 신청 →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}