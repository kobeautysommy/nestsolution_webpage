import { Link } from 'react-router';
import { BLUE, TEXT, BORDER, LIGHT, F } from '../utils/colors';
import { PageBanner } from '../components/shared/PageBanner';

export function Blog() {
  return (
    <div>
      <PageBanner
        label="Blog"
        title={<>네스트솔루션<br /><span className="text-grad">블로그</span></>}
        desc="병원 경영·마케팅·CS 현장의 인사이트를 전해드릴 예정입니다."
      />

      {/* ── 준비 중 안내 ─────────────────────────────────────── */}
      <section style={{ background: LIGHT.bg1, padding: '6rem 5vw' }}>
        <div style={{
          maxWidth: 640, margin: '0 auto', textAlign: 'center',
          background: LIGHT.card, border: `1px solid ${BORDER.light}`,
          borderRadius: 16, padding: 'clamp(2.5rem,6vw,4rem) clamp(1.5rem,5vw,3rem)',
        }}>
          <div style={{
            fontFamily: F.bebas, fontSize: '1rem', letterSpacing: '0.2em',
            color: BLUE._500, marginBottom: '1rem',
          }}>COMING SOON</div>
          <h2 style={{
            fontFamily: F.serif, fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700,
            color: TEXT.onLight, marginBottom: '1rem', lineHeight: 1.4,
          }}>아직 게시된 글이 없습니다</h2>
          <p style={{
            fontFamily: F.sans, fontSize: '0.95rem', lineHeight: 1.8,
            color: TEXT.mutedLight, marginBottom: '2.5rem',
          }}>
            유익한 콘텐츠를 준비하고 있습니다. 곧 찾아뵙겠습니다.<br />
            그동안 궁금하신 점은 무료 상담으로 문의해 주세요.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" style={{
              background: `linear-gradient(135deg, ${BLUE._500}, ${BLUE._400})`,
              color: '#FFFFFF', fontWeight: 700, fontFamily: F.sans, fontSize: '0.9rem',
              padding: '0.85rem 1.75rem', borderRadius: 8, textDecoration: 'none',
            }}>무료 상담 신청</Link>
            <Link to="/" style={{
              color: BLUE._500, fontWeight: 700, fontFamily: F.sans, fontSize: '0.9rem',
              padding: '0.85rem 1.75rem', borderRadius: 8, textDecoration: 'none',
              border: `1px solid ${BORDER.light}`,
            }}>홈으로</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
