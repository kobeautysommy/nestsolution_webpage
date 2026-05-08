import { Link } from 'react-router';
import { BLUE, F } from '../../utils/colors';

interface BtnProps {
  children: React.ReactNode;
  to: string;
  onLight?: boolean;
}

export function BtnPrimary({ children, to }: BtnProps) {
  return (
    <Link to={to} style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      background: `linear-gradient(135deg,${BLUE._500},${BLUE._400})`,
      color: '#fff', padding: '0.85rem 2rem',
      fontWeight: 700, fontSize: '0.87rem', letterSpacing: '0.05em',
      textDecoration: 'none', fontFamily: F.sans, borderRadius: '4px',
      boxShadow: `0 4px 18px rgba(37,99,235,0.35)`,
    }}>{children}</Link>
  );
}

export function BtnOutline({ children, to, onLight }: BtnProps) {
  return (
    <Link to={to} style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      border: `1.5px solid ${onLight ? BLUE._500 : BLUE._300}`,
      color: onLight ? BLUE._500 : BLUE._300,
      padding: '0.85rem 2rem', fontSize: '0.87rem', letterSpacing: '0.05em',
      textDecoration: 'none', fontFamily: F.sans,
      borderRadius: '4px', background: 'none',
    }}>{children}</Link>
  );
}
