import cert1 from 'figma:asset/3bd0a03e11b99ab2ea2d0436d2d7384c6f8bb5e0.png';
import cert2 from 'figma:asset/ee6505bc6cbdee7ad9b9267467459e8b7a0668e7.png';
import cert3 from 'figma:asset/ab287181c90bf9dbd8b7d858a0c931a495fdf0d8.png';
import { BLUE, TEXT, BORDER, F } from '../utils/colors';

const trademarks = [
  { image: cert1, alt: '상표등록증 제 40-2450285 호' },
  { image: cert2, alt: '상표등록증 제 40-2450306 호' },
  { image: cert3, alt: '상표등록증 제 40-2450317 호' },
];

export function ServiceShowcase() {
  return (
    <section id="trademark" className="py-16 md:py-20" style={{
      background: `linear-gradient(155deg, #1E3A8A 0%, #1E40AF 45%, #2563EB 100%)`,
      position: 'relative',
    }}>
      <div className="container mx-auto px-6">
        {/* Section label */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase',
          color: BLUE._300, marginBottom: '0.9rem',
        }}>
          <span style={{ width: 20, height: 1, background: BLUE._300, display: 'inline-block', flexShrink: 0 }} />
          Brand Identity
        </div>

        <h2 style={{
          fontFamily: F.serif,
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: TEXT.onDark,
          marginBottom: '0.8rem',
        }}>
          Registered Trademarks
        </h2>

        <p style={{
          fontSize: 'clamp(0.88rem, 1.8vw, 1rem)',
          fontWeight: 400,
          lineHeight: 1.85,
          fontFamily: F.sans,
          color: TEXT.mutedDark,
          marginBottom: '2.8rem',
          maxWidth: 560,
        }}>
          &ldquo;Nest Solution은{' '}
          <strong style={{ fontWeight: 700, color: TEXT.onDark }}>상표권을 보유</strong>한 고유 브랜드로,<br />
          <strong style={{ fontWeight: 700, color: TEXT.onDark }}>차별화된 가치</strong>와{' '}
          <strong style={{ fontWeight: 700, color: TEXT.onDark }}>정체성</strong>을 지킵니다.&rdquo;
        </p>

        {/* 상표등록증 3장 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {trademarks.map((tm, index) => (
            <div
              key={index}
              style={{
                overflow: 'hidden', borderRadius: '8px',
                border: `1px solid rgba(147,197,253,0.2)`,
                boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.35)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.25)'; }}
            >
              <img
                src={tm.image}
                alt={tm.alt}
                className="w-full h-full object-cover block"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}