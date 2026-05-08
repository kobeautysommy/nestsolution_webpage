import { Link } from 'react-router';
import { BLUE, F } from '../../utils/colors';
import { SecLabel } from './SecLabel';

interface CtaBandProps {
  title: React.ReactNode;
  desc: string;
  label?: string;
  secondaryCta?: { label: string; to: string };
}

export function CtaBand({ title, desc, label, secondaryCta }: CtaBandProps) {
  return (
    <div style={{
      padding: '6rem 5vw',
      background: `linear-gradient(135deg,${BLUE.ctaBg},${BLUE._600})`,
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      <div style={{ position: 'relative' }}>
        {label && <SecLabel center>{label}</SecLabel>}
        <h2 className="fu" style={{
          fontFamily: F.serif, fontSize: 'clamp(1.7rem,3.2vw,2.8rem)',
          fontWeight: 700, marginBottom: '0.9rem', color: '#FFFFFF',
        }}>{title}</h2>
        <p className="fu" style={{
          color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem',
          fontSize: '0.92rem', fontFamily: F.sans,
        }}>{desc}</p>
        <div className="fu" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/contact" style={{
            display: 'inline-flex', background: '#FFFFFF', color: BLUE._500,
            padding: '0.85rem 2rem', fontWeight: 700, fontSize: '0.87rem',
            textDecoration: 'none', borderRadius: '4px', fontFamily: F.sans,
          }}>무료 상담 신청 →</Link>
          {secondaryCta && (
            <Link to={secondaryCta.to} style={{
              display: 'inline-flex', border: '1.5px solid rgba(255,255,255,0.4)',
              color: '#FFFFFF', padding: '0.85rem 2rem', fontSize: '0.87rem',
              textDecoration: 'none', borderRadius: '4px', background: 'none', fontFamily: F.sans,
            }}>{secondaryCta.label}</Link>
          )}
        </div>
      </div>
    </div>
  );
}
