import { BLUE } from '../../utils/colors';

interface SecLabelProps {
  children: string;
  center?: boolean;
  onLight?: boolean;
}

export function SecLabel({ children, center, onLight }: SecLabelProps) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
      fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase',
      color: BLUE._500, marginBottom: '0.9rem',
      justifyContent: center ? 'center' : undefined,
    }}>
      <span style={{ width: 20, height: 1, background: BLUE._500, display: 'inline-block', flexShrink: 0 }} />
      {children}
    </div>
  );
}
