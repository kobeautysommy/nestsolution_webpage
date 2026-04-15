import topMarketing from 'figma:asset/83d97b515ada656ce423490e57780f5b84db4c75.png';
import medifull     from 'figma:asset/d4ddb9ac650bf4021ddd533cab8973635e1a12e0.png';
import ktNasmedia   from 'figma:asset/ee28ad20ebc8914cbd524a2092668505ddf17a68.png';
import hanilMedipia from 'figma:asset/98dbe47a4902728c9da76e84a2e0dc87a844096b.png';
import seegene      from 'figma:asset/46b491807a790178a3ecbad8c4493c7218c7d0cf.png';

import { BLUE, TEXT, F } from '../utils/colors';

const LOGOS = [
  { src: topMarketing, alt: 'T.O.P Marketing' },
  { src: medifull,     alt: 'Medifull' },
  { src: ktNasmedia,   alt: 'KT nasmedia' },
  { src: hanilMedipia, alt: '한일메디피아' },
  { src: seegene,      alt: 'Seegene Medical Foundation' },
];

const MARQUEE_ITEMS = [...LOGOS, ...LOGOS, ...LOGOS];

const BG = '#EEF5FF';   // light-blue section bg — logos' white areas blend in perfectly

export function Partners() {
  return (
    <section
      id="associate-vendor"
      className="overflow-hidden"
      style={{ background: BG, padding: '3rem 0', borderTop: '1px solid rgba(37,99,235,0.08)' }}
    >
      {/* Header */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 5vw', marginBottom: '2.5rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase',
          color: BLUE._500, marginBottom: '0.7rem', fontFamily: F.sans,
        }}>
          <span style={{ width: 20, height: 1, background: BLUE._500, display: 'inline-block' }} />
          Associate Vendor
        </div>
        <h2 style={{
          fontFamily: F.sans, fontSize: 'clamp(1.4rem,3vw,2rem)',
          fontWeight: 700, color: TEXT.onLight, letterSpacing: '-0.01em', lineHeight: 1,
        }}>
          함께하는 파트너사
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative w-full py-1">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to right, ${BG} 40%, transparent)` }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: `linear-gradient(to left, ${BG} 40%, transparent)` }}
        />

        <div
          className="flex items-center gap-0"
          style={{ animation: 'partners-marquee 26s linear infinite', width: 'max-content' }}
        >
          {MARQUEE_ITEMS.map((logo, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center"
              style={{ width: '300px', height: '108px', overflow: 'hidden' }}
            >
              <img
                src={logo.src}
                alt={i < LOGOS.length ? logo.alt : ''}
                aria-hidden={i >= LOGOS.length}
                className="w-full h-full object-contain"
                style={{
                  mixBlendMode: 'multiply',
                  opacity: 0.88,
                  transition: 'opacity 0.2s',
                  transform: 'scale(1.6)',
                  transformOrigin: 'center center',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.opacity = '1'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.88'; }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes partners-marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="partners-marquee"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}