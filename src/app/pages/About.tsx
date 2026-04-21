import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { BLUE, TEXT, BORDER, DARK, LIGHT, F } from '../utils/colors';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import ceoImage from 'figma:asset/ae62b28424d5b4822b9943783b07e5feda5f99cc.png';

const SecLabel = ({ children, center }: { children: string; center?: boolean }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
    fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase',
    color: BLUE._500, marginBottom: '0.9rem',
    justifyContent: center ? 'center' : undefined,
  }}>
    <span style={{ width: 20, height: 1, background: BLUE._500, display: 'inline-block' }} />
    {children}
  </div>
);

const team = [
  { emoji: '💼', name: '행정 청구 전문가',  role: 'Admin & Billing Specialist',    desc: '병·의원 행정 및 운영 관리 전문가. 의료보험 청구·수익 최적화, 병원 마케팅 전략 수립 및 실행 경험 보유. "체계적인 운영이 곧 의료 서비스의 질을 결정한다."' },
  { emoji: '🦾', name: '물리치료 전문가',   role: 'Physical Therapist · 현장 전문', desc: '임상 현장 출신 물리치료사로 구성된 교육 팀. 실제 의원급 환경에서의 업무 흐름과 환자 응대를 직접 지도합니다.' },
  { emoji: '📋', name: '행정·CS 전문가',    role: 'Admin & CS · 시스템 구축',       desc: '간호조무사·행정직 출신 CS 전문가. 병원 접수부터 수납까지 모든 환자 접점을 직접 교육하고 매뉴얼을 구축합니다.' },
  { emoji: '💉', name: '간호 전문가',        role: 'Nursing Specialist · 환자 케어', desc: '간호사 출신 전문가로, 병·의원 환자 관리 프로세스 및 간호 업무 효율화를 지원합니다. 환자 안전과 만족도 향상에 집중합니다.' },
  { emoji: '📡', name: '방사선 전문가',      role: 'Radiology Specialist · 영상 관리', desc: '방사선사 출신으로 영상 검사 프로세스 최적화 및 장비 운영 효율화를 담당합니다. 정확한 검사와 환자 응대를 교육합니다.' },
];

/* ─── 반응형 훅 ─────────────────────────────────────────────────────────── */
function useBreakpoint() {
  const [w, setW] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1024));
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return { isMobile: w < 640, isTablet: w >= 640 && w < 1024 };
}

/* ─── 팀 카드 (터치·마우스 모두 지원 플립) ─────────────────────────────── */
function TeamCard({ t, delay }: { t: typeof team[0]; delay: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`fu d${delay}`}
      style={{ perspective: '1000px', height: 280 }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
    >
      <div style={{
        position: 'relative', width: '100%', height: '100%',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.55s',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        cursor: 'pointer',
      }}>
        {/* Front */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden',
          background: '#FFFFFF', border: `1px solid ${BORDER.light}`,
          padding: '1.8rem', textAlign: 'center', borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(37,99,235,0.05)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: `linear-gradient(135deg,${BLUE.dim},rgba(59,130,246,0.05))`,
            border: `2px solid ${BORDER.light}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.6rem', margin: '0 auto 1rem', flexShrink: 0,
          }}>{t.emoji}</div>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.25rem', color: TEXT.onLight, fontFamily: F.sans }}>{t.name}</h4>
          <div style={{ color: BLUE._500, fontSize: '0.68rem', letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: F.sans, lineHeight: 1.4 }}>{t.role}</div>
          <div style={{ marginTop: '0.8rem', fontSize: '0.65rem', color: TEXT.mutedLight, fontFamily: F.sans }}>탭하여 자세히 보기</div>
        </div>
        {/* Back */}
        <div style={{
          position: 'absolute', width: '100%', height: '100%',
          backfaceVisibility: 'hidden',
          background: '#FFFFFF', border: `1px solid ${BLUE._400}`,
          padding: '1.8rem', textAlign: 'center', borderRadius: '10px',
          boxShadow: '0 12px 32px rgba(37,99,235,0.24)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          transform: 'rotateY(180deg)',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}>
          <div style={{ fontSize: '1.8rem', marginBottom: '0.6rem', flexShrink: 0 }}>{t.emoji}</div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.6rem', color: TEXT.onLight, fontFamily: F.sans, flexShrink: 0 }}>{t.name}</h4>
          <p style={{ color: TEXT.mutedLight, fontSize: '0.78rem', lineHeight: 1.65, fontFamily: F.sans, overflow: 'hidden' }}>{t.desc}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── 메인 컴포넌트 ─────────────────────────────────────────────────────── */
export function About() {
  useScrollAnimation();
  const { isMobile, isTablet } = useBreakpoint();

  const sectionPad = isMobile ? '3.5rem 5vw' : '6rem 5vw';
  const cardPad    = isMobile ? '1.5rem' : '2.5rem';

  return (
    <div style={{ background: LIGHT.bg0 }}>

      {/* ── Banner: Leadership ────────────────────────────────────────── */}
      <div style={{
        padding: isMobile ? '5rem 5vw 2.5rem' : '9rem 5vw 5rem',
        position: 'relative', overflow: 'hidden',
        background: `linear-gradient(155deg,${DARK.bg1},${DARK.bg0})`,
        borderBottom: `1px solid ${BORDER.bw}`,
      }}>
        <div style={{
          position: 'absolute', inset: '-50%',
          backgroundImage: `linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)`,
          backgroundSize: '70px 70px', animation: 'gMove 28s linear infinite',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
          <SecLabel>Leadership</SecLabel>
          <h1 style={{
            fontFamily: F.serif,
            fontSize: isMobile ? '2rem' : 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700, lineHeight: 1.25, marginBottom: '0.8rem', color: TEXT.onDark,
          }}>
            전문 컨설턴트{isMobile ? ' ' : <br />}<span className="text-grad">소개</span>
          </h1>
          <p style={{ color: TEXT.mutedDark, fontSize: isMobile ? '0.88rem' : '0.95rem', lineHeight: 1.8, maxWidth: 560, fontFamily: F.sans }}>
            17년 이상의 임상 경험과 실제 병원 경영 현장에서 쌓은 노하우로,
            {isMobile ? ' ' : <br />}원장님의 병원을 함께 성장시킵니다.
          </p>
        </div>
      </div>

      {/* ── CEO ────────────────────────────────────────────────────────── */}
      <section style={{ background: LIGHT.bg0, padding: sectionPad }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid',
          /* 모바일·태블릿: 1열 / 데스크톱: 사진열 고정 + 정보열 */
          gridTemplateColumns: isMobile || isTablet ? '1fr' : 'minmax(260px, 340px) 1fr',
          gap: isMobile ? '2rem' : '4rem',
          alignItems: 'start',
        }}>

          {/* 사진 카드 */}
          <div className="fu">
            <div style={{
              position: 'relative',
              background: '#FFFFFF',
              border: `1px solid ${BORDER.light}`,
              padding: cardPad,
              textAlign: 'center',
              borderRadius: '12px',
              boxShadow: '0 4px 24px rgba(37,99,235,0.08)',
            }}>
              {/* 상단 포인트 바 */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 4,
                background: `linear-gradient(90deg,${BLUE._500},${BLUE._300})`,
                borderRadius: '12px 12px 0 0',
              }} />

              {/* ── 이미지: 모바일 원형 아바타 / 데스크톱 전체 포트레이트 ── */}
              {isMobile ? (
                <ImageWithFallback
                  src={ceoImage}
                  alt="김상연 NestSolution 대표"
                  style={{
                    width: 120, height: 120,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                    display: 'block',
                    margin: '0 auto 1.2rem',
                    border: `3px solid ${BLUE.dim}`,
                  }}
                />
              ) : (
                <ImageWithFallback
                  src={ceoImage}
                  alt="김상연 NestSolution 대표"
                  style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    marginBottom: '1.5rem',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              )}

              <div style={{ fontFamily: F.serif, fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.25rem', color: TEXT.onLight }}>김상연</div>
              <div style={{ color: BLUE._500, fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: F.sans }}>대표 · Medical Consultant</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginTop: '1rem' }}>
                {['물리치료사', '임상 17년+', '경영 컨설턴트'].map(b => (
                  <span key={b} style={{
                    fontSize: '0.68rem', letterSpacing: '0.03em',
                    border: `1.5px solid ${BLUE._500}`, color: BLUE._500,
                    padding: '0.2rem 0.75rem', borderRadius: '20px',
                    fontFamily: F.sans,
                    whiteSpace: 'nowrap',   /* ← 배지 텍스트 줄바꿈 방지 */
                  }}>{b}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 정보 영역 */}
          <div className="fu d2">

            {/* Quote */}
            <div style={{
              background: BLUE.dim,
              border: `1px solid ${BORDER.light}`,
              borderLeft: `4px solid ${BLUE._500}`,
              padding: isMobile ? '1.2rem 1.4rem' : '1.6rem 1.8rem',
              fontFamily: F.serif,
              fontSize: isMobile ? '0.9rem' : '1.05rem',
              lineHeight: 1.85, color: TEXT.onLight, fontStyle: 'italic',
              marginBottom: '2rem', borderRadius: '0 8px 8px 0',
            }}>
              "환자 중심 의료 서비스가 병·의원의 진정한 경쟁력이다.
              원장님이 진료에만 집중할 수 있는 환경, 우리가 만들겠습니다."
            </div>

            {/* 섹션 레이블 공통 스타일 */}
            {(() => {
              const sectionLabel = (text: string) => (
                <div style={{
                  fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                  color: BLUE._500, marginBottom: '1rem',
                  display: 'flex', alignItems: 'center', gap: '0.6rem',
                  fontFamily: F.sans, fontWeight: 700,
                }}>
                  {text}
                  <span style={{ flex: 1, height: 1, background: BORDER.light, display: 'inline-block', minWidth: 20 }} />
                </div>
              );

              return (
                <>
                  {/* 대표 철학 */}
                  <div style={{ marginBottom: '2rem' }}>
                    {sectionLabel('대표 철학')}
                    <p style={{ color: TEXT.mutedLight, fontSize: '0.88rem', lineHeight: 1.9, fontFamily: F.sans }}>
                      물리치료사로 17년 이상 의료 현장 최전선에서 일하며 깨달은 것이 있습니다.
                      좋은 진료를 하는 병원이 반드시 잘 되는 게 아니라는 것.
                      환자가 느끼는 병원의 가치는 진료실 밖에서도 만들어진다는 것입니다.
                      <br /><br />
                      네스트솔루션은 단순히 컨설팅 보고서를 납품하는 회사가 아닙니다.
                      원장님과 함께 고민하고, 현장에서 직접 실행하며, 결과가 나올 때까지 함께하는 파트너입니다.
                    </p>
                  </div>

                  {/* 경력 */}
                  <div style={{ marginBottom: '2rem' }}>
                    {sectionLabel('경력')}
                    {[
                      { year: '17년+', t: '물리치료사 임상 경력', d: '의료 현장 최전선에서 환자와 직접 소통하며 쌓은 실전 경험. 환자 심리와 의료 서비스의 본질을 깊이 이해합니다.' },
                      { year: '실적',  t: '전국 네트워크 지점 성장 주도', d: 'CS 강화, 동선 최적화, 마케팅 전략 개선을 통해 내원 환자 및 재방문율 증가, 직원 교육 시스템 구축을 실현했습니다.' },
                      { year: '현재',  t: 'NestSolution 대표 · 병·의원 경영 컨설턴트', d: 'CS 관리, 마케팅, 경영 개선, 인력 관리 전 영역에서 병·의원의 운영 최적화를 지원합니다.' },
                    ].map((c, i) => (
                      <div key={i} style={{
                        display: 'flex', gap: '1.2rem',
                        padding: '1.2rem 0',
                        borderBottom: `1px solid ${BORDER.light}`,
                        alignItems: 'flex-start',
                      }}>
                        <div style={{
                          fontFamily: F.sans, fontSize: '0.95rem', fontWeight: 700,
                          color: BLUE._500,
                          minWidth: 44, flexShrink: 0,
                          lineHeight: 1.4, paddingTop: '0.1rem',
                        }}>{c.year}</div>
                        <div>
                          <h4 style={{ fontSize: '0.88rem', fontWeight: 700, marginBottom: '0.25rem', color: TEXT.onLight, fontFamily: F.sans }}>{c.t}</h4>
                          <p style={{ color: TEXT.mutedLight, fontSize: '0.82rem', lineHeight: 1.6, fontFamily: F.sans }}>{c.d}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 주요 성과 */}
                  <div>
                    {sectionLabel('주요 성과')}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
                      gap: '0.8rem',
                    }}>
                      {[
                        { t: 'CS 시스템 구축',    d: '직원 교육 체계화로 환자 만족도 및 리뷰 점수 수직 상승' },
                        { t: '환자 유입 증가',    d: '전략적 마케팅으로 신규 환자 및 재방문율 동시 향상' },
                        { t: '운영 효율화',       d: '동선 최적화 및 행정 간소화로 불필요한 비용 절감' },
                        { t: '브랜드 인지도 확장', d: '지역 내 온·오프라인 통합 브랜드 포지셔닝 강화' },
                      ].map((a, i) => (
                        <div key={i} style={{
                          background: LIGHT.bg1, border: `1px solid ${BORDER.light}`,
                          padding: '1rem 1.1rem', borderRadius: '8px',
                        }}>
                          <strong style={{ display: 'block', fontSize: '0.78rem', color: BLUE._500, marginBottom: '0.25rem', fontFamily: F.sans }}>{a.t}</strong>
                          <p style={{ color: TEXT.mutedLight, fontSize: '0.78rem', lineHeight: 1.55, fontFamily: F.sans }}>{a.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ── Our Team ────────────────────────────────────────────────────── */}
      <section style={{ background: LIGHT.bg1, padding: sectionPad }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="fu" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <SecLabel center>Our Team</SecLabel>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', fontWeight: 700, color: TEXT.onLight }}>
              함께하는 전문가 팀
            </h2>
            <p style={{ color: TEXT.mutedLight, fontSize: '0.88rem', marginTop: '0.4rem', maxWidth: 520, margin: '0.4rem auto 0', fontFamily: F.sans }}>
              의원급 현장에서 실제로 일해온 전문가들이 상시 대기합니다
            </p>
            <p style={{ fontSize: '0.7rem', color: TEXT.mutedLight, marginTop: '0.4rem', fontFamily: F.sans }}>
              카드를 {isMobile ? '탭' : '클릭 또는 마우스 오버'}하여 자세히 보세요
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : isTablet
                ? 'repeat(2, 1fr)'
                : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}>
            {team.map((t, i) => (
              <TeamCard key={i} t={t} delay={Math.min(i + 1, 5)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <div style={{
        padding: sectionPad,
        background: `linear-gradient(135deg,${BLUE.ctaBg},#1E40AF)`,
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />
        <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto' }}>
          <h2 className="fu" style={{
            fontFamily: F.serif,
            fontSize: isMobile ? '1.5rem' : 'clamp(1.5rem, 3.2vw, 2.8rem)',
            fontWeight: 700, marginBottom: '0.8rem', color: '#FFFFFF',
          }}>
            원장님의 든든한 파트너가 되겠습니다
          </h2>
          <p className="fu" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2rem', fontSize: '0.9rem', fontFamily: F.sans }}>
            상담은 항상 무료입니다. 부담 없이 연락주세요.
          </p>
          <div className="fu">
            <Link to="/contact" style={{
              display: 'inline-flex',
              background: '#FFFFFF', color: BLUE._500,
              padding: '0.85rem 2rem', fontWeight: 700, fontSize: '0.87rem',
              textDecoration: 'none', borderRadius: '4px', fontFamily: F.sans,
            }}>
              무료 상담 신청 →
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
