import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { animate, stagger } from 'animejs';
import { BLUE, TEXT, BORDER, DARK, F } from '../utils/colors';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { Logo } from './Nav';

const COLS = 30;
const ROWS = 6;

function FooterWave() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const dots: HTMLDivElement[] = [];
    for (let i = 0; i < COLS * ROWS; i++) {
      const d = document.createElement('div');
      d.style.cssText = `
        width:3px; height:3px; border-radius:50%;
        background:rgba(96,165,250,0.55);
        will-change:transform,opacity;
      `;
      wrap.appendChild(d);
      dots.push(d);
    }

    const anim = animate(dots, {
      translateY: [-18, 18],
      opacity: [0.2, 0.8],
      delay: stagger(55, { grid: [COLS, ROWS], axis: 'x', from: 'first' }),
      duration: 1600,
      ease: 'inOutSine',
      loop: true,
      direction: 'alternate',
    });

    return () => {
      anim.revert();
      wrap.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'absolute',
        inset: 0,
        display: 'grid',
        gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        placeItems: 'center',
        padding: '0 2vw',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}

export function Footer() {
  const { isMobile } = useBreakpoint();

  return (
    <footer
      itemScope
      itemType="https://schema.org/WPFooter"
      style={{
        background: DARK.bg0,
        borderTop: `1px solid ${BORDER.dark}`,
        padding: '4rem 5vw 0',
        fontFamily: F.sans,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <FooterWave />

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>

          {/* Brand */}
          <div itemScope itemType="https://schema.org/Organization">
            <Logo />
            <p style={{ color: '#fff', fontSize: '0.78rem', marginTop: '0.8rem', lineHeight: 1.7 }}>
              <span itemProp="description">병·의원 컨설팅 전문 기업<br />17년+ 임상 경험 기반 솔루션</span>
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {['✔ 17년+ 임상 현장 경험', '✔ 병·의원 전문 컨설팅', '✔ 1:1 맞춤 솔루션'].map(t => (
                <span key={t} style={{ fontSize: '0.72rem', color: BLUE._400 }}>{t}</span>
              ))}
            </div>
          </div>

          {/* 사업자 정보 */}
          <div>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE._400, marginBottom: '1rem' }}>Contact</div>
            <address
              itemScope
              itemType="https://schema.org/Organization"
              style={{ fontStyle: 'normal', color: '#fff', fontSize: '0.78rem', lineHeight: 2 }}
            >
              <p><span style={{ color: BLUE._300 }}>회사</span>{' '}큐렛 주식회사</p>
              <p><span style={{ color: BLUE._300 }}>대표</span>{' '}
                <span itemProp="founder" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">김상연</span>
                </span>
              </p>
              <p><span style={{ color: BLUE._300 }}>전화</span>{' '}
                <a href="tel:010-3129-8248" itemProp="telephone" style={{ color: '#fff', textDecoration: 'none' }}>010-3129-8248</a>
                {' / '}
                <a href="tel:010-9470-8248" style={{ color: '#fff', textDecoration: 'none' }}>010-9470-8248</a>
              </p>
              <p><span style={{ color: BLUE._300 }}>이메일</span>{' '}
                <a href="mailto:nestsadvice@gmail.com" itemProp="email" style={{ color: '#fff', textDecoration: 'none' }}>nestsadvice@gmail.com</a>
              </p>
              <p><span style={{ color: BLUE._300 }}>운영</span> 평일 09:00 – 20:00</p>
              <p><span style={{ color: BLUE._300 }}>사업자</span>{' '}
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
                  style={{ color: '#fff', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s, transform 0.2s', display: 'inline-block' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = BLUE._300; el.style.transform = 'translateX(6px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = '#fff'; el.style.transform = 'translateX(0)'; }}
                >{l.label}</Link>
              ))}
            </div>
          </nav>

          {/* Quick Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE._400 }}>Quick Contact</div>
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
              {[
                { label: '📞 010-3129-8248', href: 'tel:010-3129-8248', aria: '전화 상담 010-3129-8248' },
                { label: '📞 010-9470-8248', href: 'tel:010-9470-8248', aria: '전화 상담 010-9470-8248' },
                { label: '💬 카카오톡 상담', href: 'http://pf.kakao.com/_HStBn', aria: '카카오톡 상담' },
              ].map(b => (
                <a key={b.href} href={b.href}
                  target={b.href.startsWith('http') ? '_blank' : undefined}
                  rel={b.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                  aria-label={b.aria}
                  style={{
                    flex: '1 1 140px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                    padding: '0.8rem', background: 'rgba(59,130,246,0.08)',
                    border: `1px solid ${BORDER.dark}`, textDecoration: 'none',
                    borderRadius: '8px', fontSize: '0.78rem', color: TEXT.onDark,
                    whiteSpace: 'nowrap', transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
                  }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(59,130,246,0.18)'; el.style.borderColor = BLUE._400; el.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(59,130,246,0.08)'; el.style.borderColor = BORDER.dark; el.style.transform = 'none'; }}
                >{b.label}</a>
              ))}
            </div>
          </div>

        </div>

        {/* 하단 저작권 */}
        <div style={{
          borderTop: `1px solid ${BORDER.dark}`,
          padding: '1.5rem 0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.73rem' }}>
            © 2025 NestSolution (큐렛 주식회사). All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.73rem' }}>
            병·의원 컨설팅 마케팅 전문 기업 | 사업자등록번호 850-87-01502
          </p>
        </div>

      </div>
    </footer>
  );
}
