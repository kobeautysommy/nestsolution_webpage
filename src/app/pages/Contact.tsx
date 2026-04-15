import { useEffect } from 'react';
import { BLUE, TEXT, BORDER, DARK, LIGHT, F, accentGrad } from '../utils/colors';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SecLabel = ({ children }: { children: string }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '0.9rem' }}>
    <span style={{ width: 20, height: 1, background: BLUE._500, display: 'inline-block' }} />{children}
  </div>
);

const topics = [
  '🩺 CS 관리 및 직원 교육이 필요해요',
  '📣 마케팅으로 환자를 더 유입하고 싶어요',
  '📊 매출과 수익 구조를 개선하고 싶어요',
  '👥 직원 이직률이 높아 인력 관리가 어려워요',
  '🏥 전반적인 병원 운영을 개선하고 싶어요',
];

export function Contact() {
  useScrollAnimation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: LIGHT.bg0 }}>
      {/* Banner */}
      <div style={{ padding: '9rem 5vw 5rem', position: 'relative', overflow: 'hidden', background: LIGHT.bg1, borderBottom: `1px solid ${BORDER.light}` }}>
        <div style={{ position: 'absolute', inset: '-50%', backgroundImage: `linear-gradient(rgba(37,99,235,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.08) 1px,transparent 1px)`, backgroundSize: '70px 70px', animation: 'gMove 28s linear infinite' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
          <SecLabel>Contact</SecLabel>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: '1rem', color: TEXT.onLight }}>
            무료 상담<br /><span className="text-grad">신청하기</span>
          </h1>
          <p style={{ color: TEXT.mutedLight, fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 560, fontFamily: F.sans }}>원장님의 고민을 들려주세요. 17년 임상 경험으로 함께 해결책을 찾겠습니다. 상담은 항상 무료입니다.</p>
        </div>
      </div>

      {/* Contact Body */}
      <section style={{ padding: '6rem 5vw', background: LIGHT.bg0 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Left */}
          <div className="fu" style={{ flex: '1 1 400px', minWidth: 300 }}>
            <SecLabel>문의 방법</SecLabel>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.8rem', color: TEXT.onLight }}>편하신 방법으로<br />연락주세요</h2>
            <p style={{ color: TEXT.mutedLight, fontSize: '0.92rem', lineHeight: 1.85, marginBottom: '2.5rem', fontFamily: F.sans }}>카카오톡, 전화, 어떤 방법이든 환영합니다. 최대한 빠르게 연락드리겠습니다.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {[
                { icon: '💬', title: '카카오톡 채널 상담', sub: '@NestSolution — 빠른 답변 보장', href: 'http://pf.kakao.com/_HStBn', border: 'rgba(254,229,0,0.4)', bg: 'rgba(254,229,0,0.06)' },
                { icon: '📞', title: '전화 상담', sub: '010-3129-8248 / 010-9470-8248 · 평일 09:00 – 20:00', href: 'tel:010-3129-8248', border: BORDER.light, bg: BLUE.dim },
                { icon: '✉️', title: '이메일 문의', sub: 'nestsadvice@gmail.com', href: 'mailto:nestsadvice@gmail.com', border: BORDER.light, bg: 'transparent' },
              ].map((c, i) => (
                <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1.5rem 1.8rem',
                  background: c.bg, border: `1px solid ${c.border}`, textDecoration: 'none',
                  borderRadius: '8px', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = BLUE._400; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(37,99,235,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = c.border; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  <span style={{ fontSize: '2rem' }}>{c.icon}</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: TEXT.onLight, marginBottom: '0.2rem', fontFamily: F.sans }}>{c.title}</strong>
                    <span style={{ color: TEXT.mutedLight, fontSize: '0.82rem', fontFamily: F.sans }}>{c.sub}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Notes */}
            <div style={{ padding: '1.8rem', background: LIGHT.bg1, border: `1px solid ${BORDER.light}`, borderRadius: '8px' }}>
              <SecLabel>상담 전 참고사항</SecLabel>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {['첫 상담은 완전 무료입니다', '상담 후 계약 강요는 일절 없습니다', '병원 규모·진료과목 무관하게 상담 가능합니다', '상담 내용은 철저히 비밀이 보장됩니다'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: TEXT.mutedLight, fontSize: '0.87rem', lineHeight: 1.6, fontFamily: F.sans }}>
                    <span style={{ color: BLUE._500, flexShrink: 0 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right */}
          <div className="fu d2" style={{ flex: '1 1 400px', minWidth: 300, background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '2.5rem', borderRadius: '10px', boxShadow: '0 4px 24px rgba(37,99,235,0.08)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${BLUE._500},${BLUE._300})`, borderRadius: '10px 10px 0 0' }} />
            <SecLabel>자주 선택하는 상담 주제</SecLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
              {topics.map((t) => (
                <div key={t} style={{
                  padding: '1rem 1.2rem', border: `1px solid ${BORDER.light}`, cursor: 'pointer',
                  transition: 'all 0.2s', fontSize: '0.9rem', color: TEXT.onLight,
                  fontFamily: F.sans, borderRadius: '6px', background: LIGHT.bg0,
                }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BLUE._500; el.style.color = BLUE._500; el.style.background = BLUE.dim; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BORDER.light; el.style.color = TEXT.onLight; el.style.background = LIGHT.bg0; }}
                >{t}</div>
              ))}
            </div>
            <div style={{ padding: '1.5rem', background: BLUE.dim, borderLeft: `3px solid ${BLUE._500}`, borderRadius: '0 6px 6px 0' }}>
              <p style={{ color: TEXT.mutedLight, fontSize: '0.86rem', lineHeight: 1.75, fontFamily: F.sans }}>
                위 항목을 선택하신 후 카카오톡이나 전화로 연락주시면 더 빠르고 정확한 상담이 가능합니다. 어떤 고민이든 환영합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}