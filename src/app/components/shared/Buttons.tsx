import { Link } from 'react-router';
import { BLUE, F } from '../../utils/colors';

interface BtnProps {
  children: React.ReactNode;
  to: string;
  onLight?: boolean;
}

export function BtnPrimary({ children, to }: BtnProps) {
  return (
    <Link to={to} className="hero-btn-primary" style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      background: `linear-gradient(135deg,${BLUE._500},${BLUE._400})`,
      color: '#fff', padding: '0.85rem 2rem',
      fontWeight: 700, fontSize: '0.87rem', letterSpacing: '0.05em',
      textDecoration: 'none', fontFamily: F.sans, borderRadius: '10px',
      boxShadow: `0 4px 18px rgba(37,99,235,0.35)`,
    }}>{children}</Link>
  );
}

export function BtnOutline({ children, to }: BtnProps) {
  return (
    <Link to={to} className="hero-btn-primary" style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
      background: `linear-gradient(135deg,${BLUE._500},${BLUE._400})`,
      color: '#fff', padding: '0.85rem 2rem',
      fontWeight: 700, fontSize: '0.87rem', letterSpacing: '0.05em',
      textDecoration: 'none', fontFamily: F.sans,
      borderRadius: '10px', boxShadow: `0 4px 18px rgba(37,99,235,0.35)`,
    }}>{children}</Link>
  );
}
