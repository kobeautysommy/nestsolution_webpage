import { useEffect, useState } from 'react';

export function useBreakpoint() {
  const [w, setW] = useState<number | null>(null);
  useEffect(() => {
    setW(window.innerWidth);
    const fn = () => setW(window.innerWidth);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  const width = w ?? 1024;
  return { isMobile: width < 640, isTablet: width >= 640 && width < 1024 };
}
