import { useState } from 'react';
import { BLUE, TEXT, BORDER, F } from '../../utils/colors';
import type { FaqItem } from '../../data/faq';

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <dl style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {items.map((item, i) => (
        <div key={i} style={{
          background: '#FFFFFF',
          border: `1px solid ${open === i ? BLUE._500 : BORDER.light}`,
          borderRadius: '8px', overflow: 'hidden', transition: 'border-color 0.2s',
        }}>
          <dt>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              style={{
                width: '100%', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: '1.2rem 1.5rem',
                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem',
              }}
            >
              <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: '0.92rem', color: TEXT.onLight, lineHeight: 1.4 }}>{item.q}</span>
              <span style={{
                color: BLUE._500, fontSize: '1.1rem', flexShrink: 0,
                transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s', display: 'inline-block',
              }}>+</span>
            </button>
          </dt>
          <dd style={{ margin: 0, maxHeight: open === i ? '10rem' : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
            <p style={{ fontFamily: F.sans, fontSize: '0.87rem', color: TEXT.mutedLight, lineHeight: 1.8, padding: '0 1.5rem 1.3rem', margin: 0 }}>{item.a}</p>
          </dd>
        </div>
      ))}
    </dl>
  );
}
