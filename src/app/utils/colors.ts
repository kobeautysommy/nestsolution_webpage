// ─── NestSolution Blue & White Design System ───────────────────────────────

// Dark section backgrounds (hero, banners, footer, CTAs)
export const DARK = {
  bg0:  '#04090F',   // deepest
  bg1:  '#060E1A',   // hero / banners
  bg2:  '#091424',   // footer
  card: '#0B1A30',   // cards on dark
};

// Light section backgrounds (content sections)
export const LIGHT = {
  bg0:  '#FFFFFF',   // pure white sections
  bg1:  '#EEF5FF',   // soft blue-tinted sections
  card: '#FFFFFF',   // cards on light
};

// Blue accent palette
export const BLUE = {
  _500: '#2563EB',            // primary blue
  _400: '#3B82F6',            // medium blue
  _300: '#60A5FA',            // light blue
  _200: '#BFDBFE',            // pale blue
  dim:  'rgba(37,99,235,0.10)',
  ctaBg:'#1E3A8A',            // rich blue for CTA bands
};

// Text colors
export const TEXT = {
  onDark:    '#F0F6FF',       // main text on dark bg
  mutedDark: '#8BA3C7',       // muted text on dark bg
  grayDark:  '#5B7A9D',       // subdued text on dark bg
  onLight:   '#0F1C2E',       // main text on light bg
  mutedLight:'#4B6A8A',       // muted text on light bg
};

// Borders
export const BORDER = {
  dark:  'rgba(59,130,246,0.18)',
  light: 'rgba(37,99,235,0.14)',
  bw:    'rgba(255,255,255,0.07)',
};

// Font families
export const F = {
  bebas: "'Bebas Neue', cursive",
  serif: "'Noto Serif KR', serif",
  sans:  "'Noto Sans KR', sans-serif",
};

// Accent gradient (blue → pale blue) — for LIGHT backgrounds
export const accentGrad: React.CSSProperties = {
  backgroundImage: `linear-gradient(125deg, ${BLUE._500} 20%, ${BLUE._300} 80%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

// Accent gradient for DARK backgrounds (light blue → white)
export const accentGradDark: React.CSSProperties = {
  backgroundImage: `linear-gradient(125deg, #93C5FD 20%, #FFFFFF 80%)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

// ─── Legacy compatibility aliases ─────────────────────────────────────────
export const N = {
  navy:      DARK.bg1,
  navyMid:   DARK.bg2,
  navyCard:  DARK.card,
  teal:      BLUE._500,
  tealDim:   BLUE.dim,
  gold:      BLUE._400,
  goldLight: BLUE._300,
  white:     TEXT.onDark,
  grayLight: TEXT.mutedDark,
  gray:      TEXT.grayDark,
  border:    BORDER.dark,
  bw:        BORDER.bw,
  // NEW
  whiteBg:   LIGHT.bg0,
  lightBg:   LIGHT.bg1,
  darkText:  TEXT.onLight,
  mutedText: TEXT.mutedLight,
  lightBorder: BORDER.light,
  ctaBg:     BLUE.ctaBg,
} as const;