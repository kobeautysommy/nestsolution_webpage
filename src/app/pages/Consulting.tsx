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
