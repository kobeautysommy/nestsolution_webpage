import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
          }
        });
      },
      { threshold: 0.08 }
    );

    const els = document.querySelectorAll('.fu');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
