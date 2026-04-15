import { Link } from 'react-router';
import { BLUE, TEXT, BORDER, DARK, LIGHT, F } from '../utils/colors';
import { Logo } from './Nav';

export function Footer() {
  return (
    <footer style={{ background: LIGHT.bg1, borderTop: `1px solid ${BORDER.light}`, padding: '4rem 5vw', fontFamily: F.sans }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '3rem', marginBottom: '2.5rem' }}>
          {/* Brand */}
          <div>
            <Logo />
            <p style={{ color: TEXT.mutedLight, fontSize: '0.78rem', marginTop: '0.8rem', lineHeight: 1.7 }}>
              병·의원 컨설팅 전문 기업<br />17년+ 임상 경험 기반 솔루션
            </p>
          </div>

          {/* Info */}
          <div>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE._400, marginBottom: '1rem' }}>Contact</div>
            <div style={{ color: TEXT.mutedLight, fontSize: '0.78rem', lineHeight: 2 }}>
              <p><span style={{ color: TEXT.grayDark }}>회사</span> 큐렛 주식회사</p>
              <p><span style={{ color: TEXT.grayDark }}>대표</span> 김상연</p>
              <p><span style={{ color: TEXT.grayDark }}>전화</span>{' '}
                <a href="tel:010-3129-8248" style={{ color: TEXT.mutedLight, textDecoration: 'none' }}>010-3129-8248</a>
                {' / '}
                <a href="tel:010-9470-8248" style={{ color: TEXT.mutedLight, textDecoration: 'none' }}>010-9470-8248</a>
              </p>
              <p><span style={{ color: TEXT.grayDark }}>이메일</span>{' '}
                <a href="mailto:nestsadvice@gmail.com" style={{ color: TEXT.mutedLight, textDecoration: 'none' }}>nestsadvice@gmail.com</a>
              </p>
              <p><span style={{ color: TEXT.grayDark }}>운영</span> 평일 09:00 – 20:00</p>
              <p><span style={{ color: TEXT.grayDark }}>사업자</span> 850-87-01502</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE._400, marginBottom: '1rem' }}>Menu</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: '고민', to: '/pain' },
                { label: '서비스', to: '/services' },
                { label: '컨설팅 과정', to: '/process' },
                { label: '성공 사례', to: '/cases' },
                { label: '대표 소개', to: '/about' },
                { label: '무료 상담', to: '/contact' },
              ].map(l => (
                <Link key={l.to} to={l.to} style={{ color: TEXT.mutedLight, fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = BLUE._500; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = TEXT.mutedLight; }}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', justifyContent: 'flex-start' }}>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE._400, marginBottom: '0.2rem' }}>Quick Contact</div>
            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'nowrap' }}>
              <a href="tel:010-3129-8248" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.9rem 1rem', background: BLUE.dim,
                border: `1px solid ${BORDER.light}`, textDecoration: 'none',
                borderRadius: '6px', fontSize: '0.82rem', color: TEXT.onLight, transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}>
                📞 010-3129-8248
              </a>
              <a href="tel:010-9470-8248" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.9rem 1rem', background: BLUE.dim,
                border: `1px solid ${BORDER.light}`, textDecoration: 'none',
                borderRadius: '6px', fontSize: '0.82rem', color: TEXT.onLight, transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}>
                📞 010-9470-8248
              </a>
              <a href="http://pf.kakao.com/_HStBn" target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                padding: '0.9rem 1rem', background: 'rgba(254,229,0,0.1)',
                border: '1px solid rgba(254,229,0,0.3)', textDecoration: 'none',
                borderRadius: '6px', fontSize: '0.82rem', color: TEXT.onLight, transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}>
                💬 카카오톡 상담
              </a>
            </div>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${BORDER.light}`, paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: TEXT.mutedLight, fontSize: '0.73rem' }}>© 2025 NestSolution. All rights reserved.</p>
          <p style={{ color: TEXT.mutedLight, fontSize: '0.73rem' }}>병·의원 경영 컨설팅 전문 기업</p>
        </div>
      </div>
    </footer>
  );
}