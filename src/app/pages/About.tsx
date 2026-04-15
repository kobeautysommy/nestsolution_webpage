import { useEffect } from 'react';
import { Link } from 'react-router';
import { BLUE, TEXT, BORDER, DARK, LIGHT, F, accentGrad } from '../utils/colors';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import ceoImage from 'figma:asset/ae62b28424d5b4822b9943783b07e5feda5f99cc.png';

const SecLabel = ({ children, center }: { children: string; center?: boolean }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '0.9rem', justifyContent: center ? 'center' : undefined }}>
    <span style={{ width: 20, height: 1, background: BLUE._500, display: 'inline-block' }} />{children}
  </div>
);

const team = [
  { emoji: '💼', name: '행정 청구 전문가', role: 'Admin & Billing Specialist', desc: '병·의원 행정 및 운영 관리 전문가. 의료보험 청구·수익 최적화, 병원 마케팅 전략 수립 및 실행 경험 보유. \"체계적인 운영이 곧 의료 서비스의 질을 결정한다.\"' },
  { emoji: '🦾', name: '물리치료 전문가', role: 'Physical Therapist · 현장 전문', desc: '임상 현장 출신 물리치료사로 구성된 교육 팀. 실제 의원급 환경에서의 업무 흐름과 환자 응대를 직접 지도합니다.' },
  { emoji: '📋', name: '행정·CS 전문가', role: 'Admin & CS · 시스템 구축', desc: '간호조무사·행정직 출신 CS 전문가. 병원 접수부터 수납까지 모든 환자 접점을 직접 교육하고 매뉴얼을 구축합니다.' },
  { emoji: '💉', name: '간호 전문가', role: 'Nursing Specialist · 환자 케어', desc: '간호사 출신 전문가로, 병·의원 환자 관리 프로세스 및 간호 업무 효율화를 지원합니다. 환자 안전과 만족도 향상에 집중합니다.' },
  { emoji: '📡', name: '방사선 전문가', role: 'Radiology Specialist · 영상 관리', desc: '방사선사 출신으로 영상 검사 프로세스 최적화 및 장비 운영 효율화를 담당합니다. 정확한 검사와 환자 응대를 교육합니다.' },
];

export function About() {
  useScrollAnimation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: LIGHT.bg0 }}>
      {/* Banner */}
      <div style={{ padding: '9rem 5vw 5rem', position: 'relative', overflow: 'hidden', background: `linear-gradient(155deg,${DARK.bg1},${DARK.bg0})`, borderBottom: `1px solid ${BORDER.bw}` }}>
        <div style={{ position: 'absolute', inset: '-50%', backgroundImage: `linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)`, backgroundSize: '70px 70px', animation: 'gMove 28s linear infinite' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
          <SecLabel>Leadership</SecLabel>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: '1rem', color: TEXT.onDark }}>
            전문 컨설턴트<br /><span className="text-grad">소개</span>
          </h1>
          <p style={{ color: TEXT.mutedDark, fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 560, fontFamily: F.sans }}>17년 이상의 임상 경험과 실제 병원 경영 현장에서 쌓은 노하우로,<br />원장님의 병원을 함께 성장시킵니다.</p>
        </div>
      </div>

      {/* CEO */}
      <section style={{ background: LIGHT.bg0, padding: '6rem 5vw' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '5rem', alignItems: 'start' }}>
          {/* Photo card */}
          <div className="fu">
            <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '2.5rem', textAlign: 'center', borderRadius: '12px', boxShadow: '0 4px 24px rgba(37,99,235,0.08)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${BLUE._500},${BLUE._300})`, borderRadius: '12px 12px 0 0' }} />
              <ImageWithFallback 
                src={ceoImage}
                alt="김상연 대표"
                style={{ width: '100%', aspectRatio: '3/4', marginBottom: '1.5rem', borderRadius: '8px', objectFit: 'cover' }}
              />
              <div style={{ fontFamily: F.serif, fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.3rem', color: TEXT.onLight }}>김상연</div>
              <div style={{ color: BLUE._500, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: F.sans }}>대표 · Medical Consultant</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginTop: '1.2rem' }}>
                {['물리치료사', '임상 17년+', '경영 컨설턴트'].map(b => (
                  <span key={b} style={{ fontSize: '0.7rem', letterSpacing: '0.04em', border: `1.5px solid ${BLUE._500}`, color: BLUE._500, padding: '0.22rem 0.8rem', borderRadius: '20px', fontFamily: F.sans }}>{b}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="fu d2">
            {/* Quote */}
            <div style={{ background: BLUE.dim, border: `1px solid ${BORDER.light}`, borderLeft: `4px solid ${BLUE._500}`, padding: '1.8rem 2rem', fontFamily: F.serif, fontSize: '1.05rem', lineHeight: 1.8, color: TEXT.onLight, fontStyle: 'italic', marginBottom: '2.5rem', borderRadius: '0 8px 8px 0' }}>
              "환자 중심 의료 서비스가 병·의원의 진정한 경쟁력이다.<br />원장님이 진료에만 집중할 수 있는 환경, 우리가 만들겠습니다."
            </div>

            {/* Philosophy */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: F.sans, fontWeight: 700 }}>
                대표 철학 <span style={{ flex: 1, height: 1, background: BORDER.light, display: 'inline-block' }} />
              </div>
              <p style={{ color: TEXT.mutedLight, fontSize: '0.9rem', lineHeight: 1.9, fontFamily: F.sans }}>
                물리치료사로 17년 이상 의료 현장 최전선에서 일하며 깨달은 것이 있습니다. 좋은 진료를 하는 병원이 반드시 잘 되는 게 아니라는 것. 환자가 느끼는 병원의 가치는 진료실 밖에서도 만들어진다는 것입니다.<br /><br />
                네스트솔루션은 단순히 컨설팅 보고서를 납품하는 회사가 아닙니다. 원장님과 함께 고민하고, 현장에서 직접 실행하며, 결과가 나올 때까지 함께하는 파트너입니다.
              </p>
            </div>

            {/* Career */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: F.sans, fontWeight: 700 }}>
                경력 <span style={{ flex: 1, height: 1, background: BORDER.light, display: 'inline-block' }} />
              </div>
              {[
                { year: '17년+', t: '물리치료사 임상 경력', d: '의료 현장 최전선에서 환자와 직접 소통하며 쌓은 실전 경험. 환자 심리와 의료 서비스의 본질을 깊이 이해합니다.' },
                { year: '실적', t: '전국반듯한 네트워크 지점 성장 주도', d: 'CS 강화, 동선 최적화, 마케팅 전략 개선을 통해 내원 환자 및 재방문율 증가, 직원 교육 시스템 구축, 브랜드 인지도 확장을 실현했습니다.' },
                { year: '현재', t: 'NestSolution 대표 · 병·의원 경영 컨설턴트', d: 'CS 관리, 마케팅, 경영 개선, 인력 관리 전 영역에서 병·의원의 운영 최적화를 지원합니다.' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem 0', borderBottom: `1px solid ${BORDER.light}` }}>
                  <div style={{ fontFamily: F.sans, fontSize: '1.2rem', color: BLUE._500, width: 60, flexShrink: 0, lineHeight: 1.3 }}>{c.year}</div>
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.3rem', color: TEXT.onLight, fontFamily: F.sans }}>{c.t}</h4>
                    <p style={{ color: TEXT.mutedLight, fontSize: '0.83rem', lineHeight: 1.6, fontFamily: F.sans }}>{c.d}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Key Results */}
            <div>
              <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: F.sans, fontWeight: 700 }}>
                주요 성과 <span style={{ flex: 1, height: 1, background: BORDER.light, display: 'inline-block' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {[
                  { t: 'CS 시스템 구축', d: '직원 교육 체계화로 환자 만족도 및 리뷰 점수 수직 상승' },
                  { t: '환자 유입 증가', d: '전략적 마케팅으로 신규 환자 및 재방문율 동시 향상' },
                  { t: '운영 효율화', d: '동선 최적화 및 행정 간소화로 불필요한 비용 절감' },
                  { t: '브랜드 인지도 확장', d: '지역 내 온·오프라인 통합 브랜드 포지셔닝 강화' },
                ].map((a, i) => (
                  <div key={i} style={{ background: LIGHT.bg1, border: `1px solid ${BORDER.light}`, padding: '1.2rem', borderRadius: '8px' }}>
                    <strong style={{ display: 'block', fontSize: '0.8rem', color: BLUE._500, letterSpacing: '0.04em', marginBottom: '0.35rem', fontFamily: F.sans }}>{a.t}</strong>
                    <p style={{ color: TEXT.mutedLight, fontSize: '0.8rem', lineHeight: 1.55, fontFamily: F.sans }}>{a.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ background: LIGHT.bg1, padding: '6rem 5vw' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="fu" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SecLabel center>Our Team</SecLabel>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: TEXT.onLight }}>함께하는 전문가 팀</h2>
            <p style={{ color: TEXT.mutedLight, fontSize: '0.92rem', marginTop: '0.5rem', maxWidth: 580, margin: '0.5rem auto 0', fontFamily: F.sans }}>의원급 현장에서 실제로 일해온 전문가들이 상시 대기합니다</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.5rem' }}>
            {team.map((t, i) => (
              <div key={i} className={`fu d${i + 1}`} style={{
                perspective: '1000px',
                height: '320px',
              }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.6s',
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'rotateY(180deg)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'rotateY(0deg)'; }}
                >
                  {/* Front */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: '#FFFFFF',
                    border: `1px solid ${BORDER.light}`,
                    padding: '2rem',
                    textAlign: 'center',
                    borderRadius: '10px',
                    boxShadow: '0 2px 8px rgba(37,99,235,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg,${BLUE.dim},rgba(59,130,246,0.05))`, border: `2px solid ${BORDER.light}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 1.2rem' }}>{t.emoji}</div>
                    <h4 style={{ fontSize: '0.97rem', fontWeight: 700, marginBottom: '0.2rem', color: TEXT.onLight, fontFamily: F.sans }}>{t.name}</h4>
                    <div style={{ color: BLUE._500, fontSize: '0.73rem', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: F.sans }}>{t.role}</div>
                  </div>
                  {/* Back */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backfaceVisibility: 'hidden',
                    background: '#FFFFFF',
                    border: `1px solid ${BLUE._400}`,
                    padding: '2rem',
                    textAlign: 'center',
                    borderRadius: '10px',
                    boxShadow: '0 12px 32px rgba(37,99,235,0.24)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'rotateY(180deg)',
                  }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t.emoji}</div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: TEXT.onLight, fontFamily: F.sans }}>{t.name}</h4>
                    <p style={{ color: TEXT.mutedLight, fontSize: '0.85rem', lineHeight: 1.7, fontFamily: F.sans }}>{t.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ padding: '6rem 5vw', background: `linear-gradient(135deg,${BLUE.ctaBg},#1E40AF)`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div style={{ position: 'relative' }}>
          <h2 className="fu" style={{ fontFamily: F.serif, fontSize: 'clamp(1.7rem,3.2vw,2.8rem)', fontWeight: 700, marginBottom: '0.9rem', color: '#FFFFFF' }}>원장님의 든든한 파트너가 되겠습니다</h2>
          <p className="fu" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '0.92rem', fontFamily: F.sans }}>상담은 항상 무료입니다. 부담 없이 연락주세요.</p>
          <div className="fu">
            <Link to="/contact" style={{ display: 'inline-flex', background: '#FFFFFF', color: BLUE._500, padding: '0.85rem 2rem', fontWeight: 700, fontSize: '0.87rem', textDecoration: 'none', borderRadius: '4px', fontFamily: F.sans }}>무료 상담 신청 →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}