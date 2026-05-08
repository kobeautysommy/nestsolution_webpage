import { BLUE, TEXT, BORDER, LIGHT, F } from '../utils/colors';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SecLabel } from '../components/shared/SecLabel';
import { PageBanner } from '../components/shared/PageBanner';
import { CtaBand } from '../components/shared/CtaBand';
import { FaqAccordion } from '../components/shared/FaqAccordion';
import { BtnPrimary, BtnOutline } from '../components/shared/Buttons';
import { painFaq } from '../data/faq';
import { Link } from 'react-router';

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

      <section style={{ background: LIGHT.bg0, padding: '6rem 5vw' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '1.5rem' }}>
          {painCards.map((c, i) => (
            <div key={i} className={`fu d${(i % 4) + 1}`} style={{ perspective: '1000px', height: '300px' }}>
              <div
                style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform 0.65s cubic-bezier(0.4,0.2,0.2,1)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'rotateY(180deg)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'rotateY(0deg)'; }}
              >
                <div style={{
                  position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                  background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '1.8rem 2.2rem 2.8rem',
                  borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(37,99,235,0.05)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                }}>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${BLUE._500},${BLUE._300})` }} />
                  <div style={{ fontFamily: F.bebas, fontSize: '3.5rem', color: BLUE.dim, lineHeight: 0.85, marginBottom: '0.5rem' }}>{String(i + 1).padStart(2, '0')}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '0.8rem', color: TEXT.onLight, fontFamily: F.sans, whiteSpace: 'pre-line' }}>{c.title}</h3>
                  <p style={{ color: TEXT.mutedLight, fontSize: '0.86rem', lineHeight: 1.8, fontFamily: F.sans }}>{c.desc}</p>
                </div>
                <div style={{
                  position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                  background: `linear-gradient(135deg,${BLUE._600},${BLUE._400})`,
                  border: `1px solid ${BLUE._400}`, borderRadius: '8px', padding: '1.8rem 2.2rem 3.2rem',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
                  boxShadow: '0 12px 36px rgba(37,99,235,0.25)',
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

      <section style={{ background: LIGHT.bg1, padding: '2.5rem 5vw' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.2rem' }}>
          <div>
            <p style={{ fontFamily: F.serif, fontSize: '1rem', fontWeight: 700, color: TEXT.onLight, marginBottom: '0.2rem' }}>어떤 서비스로 해결할 수 있을까요?</p>
            <p style={{ fontSize: '0.8rem', color: TEXT.mutedLight, fontFamily: F.sans }}>고민에 맞는 서비스를 바로 확인하세요</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {['CS 관리', '마케팅', '경영 개선', '인력 관리'].map(s => (
              <Link key={s} to="/services" style={{ fontSize: '0.78rem', border: `1px solid ${BLUE._500}`, color: BLUE._500, padding: '0.35rem 0.9rem', borderRadius: '20px', textDecoration: 'none', fontFamily: F.sans, whiteSpace: 'nowrap' }}>{s} →</Link>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: LIGHT.bg1, padding: '6rem 5vw' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="fu" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <SecLabel center>Real Voice</SecLabel>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: TEXT.onLight }}>함께한 원장님들의 이야기</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '1.2rem' }}>
            {testimonials.map((t, i) => (
              <div key={i} className={`fu d${i + 1}`} style={{ background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '2rem', borderTop: `3px solid ${BLUE._500}`, borderRadius: '8px', boxShadow: '0 2px 8px rgba(37,99,235,0.05)' }}>
                <p style={{ color: TEXT.mutedLight, fontSize: '0.88rem', lineHeight: 1.85, marginBottom: '1.2rem', fontStyle: 'italic', fontFamily: F.sans }}>{t.text}</p>
                <div style={{ fontSize: '0.75rem', color: BLUE._500, letterSpacing: '0.06em', fontFamily: F.sans }}>{t.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: LIGHT.bg0, padding: '6rem 5vw' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <SecLabel center>FAQ</SecLabel>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, color: TEXT.onLight }}>자주 묻는 질문</h2>
          </div>
          <FaqAccordion items={painFaq} />
        </div>
      </section>

      <CtaBand title="지금 바로 해결할 수 있습니다" desc="상담은 항상 무료입니다. 원장님의 고민을 들려주세요." secondaryCta={{ label: '서비스 보기', to: '/services' }} />
    </div>
  );
}
