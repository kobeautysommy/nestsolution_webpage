import { useEffect } from 'react';

export function SEOHead() {
  useEffect(() => {
    document.title = 'NestSolution | 병·의원 컨설팅 전문 기업';

    const setMeta = (attrs: Record<string, string>) => {
      const selector = Object.entries(attrs)
        .filter(([k]) => k !== 'content')
        .map(([k, v]) => `[${k}="${v}"]`).join('');
      let el = document.querySelector<HTMLMetaElement>(`meta${selector}`);
      if (!el) {
        el = document.createElement('meta');
        Object.entries(attrs).filter(([k]) => k !== 'content').forEach(([k, v]) => el!.setAttribute(k, v));
        document.head.appendChild(el);
      }
      el.setAttribute('content', attrs.content);
    };

    setMeta({ name: 'description', content: 'NestSolution은 17년 임상 경험을 바탕으로 병·의원 CS 관리, 마케팅, 경영 개선, 인력 관리를 지원하는 컨설팅 전문 기업입니다.' });
    setMeta({ name: 'keywords', content: 'NestSolution, 병원 컨설팅, 의원 경영, CS 관리, 병원 마케팅, 인력 관리, 경영 개선' });
    setMeta({ name: 'author', content: 'NestSolution' });
    setMeta({ property: 'og:type', content: 'website' });
    setMeta({ property: 'og:title', content: 'NestSolution | 병·의원 컨설팅 전문 기업' });
    setMeta({ property: 'og:description', content: 'NestSolution은 17년 임상 경험을 바탕으로 병·의원 CS 관리, 마케팅, 경영 개선, 인력 관리를 지원하는 컨설팅 전문 기업입니다.' });
    setMeta({ property: 'og:site_name', content: 'NestSolution' });
    setMeta({ name: 'twitter:card', content: 'summary_large_image' });
    setMeta({ name: 'twitter:title', content: 'NestSolution | 병·의원 컨설팅 전문 기업' });
    setMeta({ name: 'twitter:description', content: 'NestSolution은 17년 임상 경험을 바탕으로 병·의원 CS 관리, 마케팅, 경영 개선, 인력 관리를 지원합니다.' });
    setMeta({ name: 'naver-site-verification', content: '930311f2339c80c19127df25b854460858d85e27' });
  }, []);

  return null;
}