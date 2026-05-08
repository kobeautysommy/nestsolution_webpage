import { BLUE, TEXT, BORDER, DARK, LIGHT, F } from '../../utils/colors';
import { SecLabel } from './SecLabel';

interface PageBannerProps {
  label: string;
  title: React.ReactNode;
  desc: string;
  theme?: 'dark' | 'light';
}

export function PageBanner({ label, title, desc, theme = 'dark' }: PageBannerProps) {
  const isDark = theme === 'dark';
  return (
    <div style={{
      padding: '9rem 5vw 5rem', position: 'relative', overflow: 'hidden',
      background: isDark
        ? `linear-gradient(155deg,${DARK.bg1},${DARK.bg0})`
        : LIGHT.bg1,
      borderBottom: `1px solid ${isDark ? BORDER.bw : BORDER.light}`,
    }}>
      <div style={{
        position: 'absolute', inset: '-50%',
        backgroundImage: isDark
          ? `linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)`
          : `linear-gradient(rgba(37,99,235,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.08) 1px,transparent 1px)`,
        backgroundSize: '70px 70px', animation: 'gMove 28s linear infinite',
      }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
        <SecLabel>{label}</SecLabel>
        <h1 style={{
          fontFamily: F.serif, fontSize: 'clamp(2rem,4vw,3.5rem)',
          fontWeight: 700, lineHeight: 1.25, marginBottom: '1rem',
          color: isDark ? TEXT.onDark : TEXT.onLight,
        }}>{title}</h1>
        <p style={{
          color: isDark ? TEXT.mutedDark : TEXT.mutedLight,
          fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 560, fontFamily: F.sans,
        }}>{desc}</p>
      </div>
    </div>
  );
}
