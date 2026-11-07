import { Link } from 'react-router';
import { BLUE, TEXT, BORDER, LIGHT, F } from '../utils/colors';
import { PageBanner } from '../components/shared/PageBanner';
import { CtaBand } from '../components/shared/CtaBand';
import { SPECIALTIES } from '../data/specialties';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export function Consulting() {
  useScrollAnimation(); // CtaBand의 .fu 요소 표시
  return (
    <div style={{ background: LIGHT.bg0 }}>
      <PageBanner
        label="By Specialty"
        title={<>진료과별<br /><span className="text-grad">병원 컨설팅</span></>}
        desc="진료과마다 환자가 병원을 경험하는 방식과 경영의 병목이 다릅니다. 우리 병원 진료과에 맞춘 컨설팅을 확인하세요."
      />

      <section style={{ background: LIGHT.bg0, padding: '4.5rem 5vw 1rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', fontFamily: F.sans, fontSize: '1rem', lineHeight: 1.9, color: TEXT.onLight }}>
          <p className="speakable" style={{ margin: '0 0 1.25rem' }}>
            정형외과는 물리치료실에서, 치과는 상담실에서, 내과는 접수대에서 환자의 첫인상이 결정됩니다.
            같은 병원 컨설팅이라도 진료과마다 먼저 손봐야 할 곳이 다릅니다.
          </p>
          <p style={{ margin: 0 }}>
            네스트솔루션은 물리치료사 출신 김상연 대표가 18년간 병원 현장에서 쌓은 경험을 바탕으로,
            CS 관리·마케팅·경영 개선·인력 관리 네 영역을 진료과의 특성에 맞춰 설계하고 현장에서 함께 실행합니다.
            아래에서 우리 병원 진료과의 주요 경영 과제와 해결 방식을 확인해 보세요.
          </p>
        </div>
      </section>

      <section style={{ background: LIGHT.bg1, padding: '5rem 5vw' }}>
        <div style={{
          maxWidth: 1080, margin: '0 auto', display: 'grid', gap: '1rem',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))',
        }}>
          {SPECIALTIES.map((s) => (
            <Link key={s.slug} to={`/consulting/${s.slug}`} style={{
              display: 'flex', flexDirection: 'column', gap: '0.6rem', textDecoration: 'none',
              background: LIGHT.card, border: `1px solid ${BORDER.light}`, borderRadius: 12, padding: '1.75rem',
            }}>
              <h2 style={{ fontFamily: F.serif, fontSize: '1.3rem', fontWeight: 700, color: TEXT.onLight, margin: 0 }}>{s.name} 컨설팅</h2>
              <p style={{ fontFamily: F.sans, fontSize: '0.88rem', lineHeight: 1.7, color: TEXT.mutedLight, margin: 0, flex: 1 }}>{s.headline}</p>
              <span style={{ fontFamily: F.sans, fontSize: '0.85rem', fontWeight: 700, color: BLUE._500 }}>자세히 보기 →</span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="우리 병원 진료과가 목록에 없나요?"
        desc="의원급이라면 진료과와 관계없이 컨설팅이 가능합니다. 무료 상담으로 문의해 주세요."
        bgImage="/assets/cta-bg.webp"
      />
    </div>
  );
}
