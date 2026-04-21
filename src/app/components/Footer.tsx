import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { BLUE, TEXT, BORDER, LIGHT, F } from '../utils/colors';
import { Logo } from './Nav';

export function Footer() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <footer
      itemScope
      itemType="https://schema.org/WPFooter"
      style={{
        background: LIGHT.bg1,
        borderTop: `1px solid ${BORDER.light}`,
        /* body 섹션과 동일: 5vw 패딩을 outer에, maxWidth centering은 inner에서 */
        padding: '4rem 5vw',
        fontFamily: F.sans,
      }}
    >
      {/* body의 inner div와 동일한 구조 */}
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>

          {/* Brand + E-E-A-T 신뢰 신호 */}
          <div itemScope itemType="https://schema.org/Organization">
            <Logo />
            <p style={{ color: TEXT.mutedLight, fontSize: '0.78rem', marginTop: '0.8rem', lineHeight: 1.7 }}>
              <span itemProp="description">병·의원 컨설팅 전문 기업<br />17년+ 임상 경험 기반 솔루션</span>
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {[
                '✔ 17년+ 임상 현장 경험',
                '✔ 병·의원 전문 컨설팅',
                '✔ 1:1 맞춤 솔루션',
              ].map(t => (
                <span key={t} style={{ fontSize: '0.72rem', color: BLUE._400 }}>{t}</span>
              ))}
            </div>
          </div>

          {/* 사업자 정보 (E-E-A-T) */}
          <div>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE._400, marginBottom: '1rem' }}>Contact</div>
            <address
              itemScope
              itemType="https://schema.org/Organization"
              style={{ fontStyle: 'normal', color: TEXT.mutedLight, fontSize: '0.78rem', lineHeight: 2 }}
            >
              <p><span style={{ color: TEXT.grayDark }}>회사</span>{' '}<span itemProp="legalName">큐렛 주식회사</span></p>
              <p><span style={{ color: TEXT.grayDark }}>대표</span>{' '}
                <span itemProp="founder" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">김상연</span>
                </span>
              </p>
              <p><span style={{ color: TEXT.grayDark }}>전화</span>{' '}
                <a href="tel:010-3129-8248" itemProp="telephone" style={{ color: TEXT.mutedLight, textDecoration: 'none' }}>010-3129-8248</a>
                {' / '}
                <a href="tel:010-9470-8248" style={{ color: TEXT.mutedLight, textDecoration: 'none' }}>010-9470-8248</a>
              </p>
              <p><span style={{ color: TEXT.grayDark }}>이메일</span>{' '}
                <a href="mailto:nestsadvice@gmail.com" itemProp="email" style={{ color: TEXT.mutedLight, textDecoration: 'none' }}>nestsadvice@gmail.com</a>
              </p>
              <p><span style={{ color: TEXT.grayDark }}>운영</span> 평일 09:00 – 20:00</p>
              <p><span style={{ color: TEXT.grayDark }}>사업자</span>{' '}
                <span itemProp="taxID">850-87-01502</span>
              </p>
            </address>
          </div>

          {/* 메뉴 */}
          <nav aria-label="푸터 메뉴">
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE._400, marginBottom: '1rem' }}>Menu</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[
                { label: '병원 경영 고민', to: '/pain' },
                { label: '컨설팅 서비스', to: '/services' },
                { label: '컨설팅 과정',   to: '/process' },
                { label: '성공 사례',     to: '/cases' },
                { label: '대표 소개',     to: '/about' },
                { label: '무료 상담 신청', to: '/contact' },
              ].map(l => (
                <Link key={l.to} to={l.to}
                  style={{ color: TEXT.mutedLight, fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = BLUE._500; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = TEXT.mutedLight; }}
                >{l.label}</Link>
              ))}
            </div>
          </nav>

          {/* Quick Contact — 모바일에서 wrap */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE._400 }}>Quick Contact</div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              <a href="tel:010-3129-8248"
                aria-label="전화 상담 010-3129-8248"
                style={{
                  flex: '1 1 140px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  padding: '0.8rem 0.8rem', background: BLUE.dim,
                  border: `1px solid ${BORDER.light}`, textDecoration: 'none',
                  borderRadius: '6px', fontSize: '0.78rem', color: TEXT.onLight,
                  whiteSpace: 'nowrap',
                }}>
                📞 010-3129-8248
              </a>
              <a href="tel:010-9470-8248"
                aria-label="전화 상담 010-9470-8248"
                style={{
                  flex: '1 1 140px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  padding: '0.8rem 0.8rem', background: BLUE.dim,
                  border: `1px solid ${BORDER.light}`, textDecoration: 'none',
                  borderRadius: '6px', fontSize: '0.78rem', color: TEXT.onLight,
                  whiteSpace: 'nowrap',
                }}>
                📞 010-9470-8248
              </a>
              <a href="http://pf.kakao.com/_HStBn" target="_blank" rel="noreferrer noopener"
                aria-label="카카오톡 상담"
                style={{
                  flex: '1 1 140px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                  padding: '0.8rem 0.8rem', background: 'rgba(254,229,0,0.1)',
                  border: '1px solid rgba(254,229,0,0.3)', textDecoration: 'none',
                  borderRadius: '6px', fontSize: '0.78rem', color: TEXT.onLight,
                  whiteSpace: 'nowrap',
                }}>
                💬 카카오톡 상담
              </a>
            </div>
          </div>

        </div>

        {/* 하단 저작권 */}
        <div style={{
          borderTop: `1px solid ${BORDER.light}`,
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          <p style={{ color: TEXT.mutedLight, fontSize: '0.73rem' }}>
            © 2025 NestSolution (큐렛 주식회사). All rights reserved.
          </p>
          <p style={{ color: TEXT.mutedLight, fontSize: '0.73rem' }}>
            병·의원 컨설팅 마케팅 전문 기업 | 사업자등록번호 850-87-01502
          </p>
        </div>

      </div>
    </footer>
  );
}
