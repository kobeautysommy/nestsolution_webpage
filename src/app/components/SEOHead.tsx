import { useEffect } from 'react';

export const SITE_URL = 'https://nestsolution.co.kr';

export interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  jsonLd?: object | object[];
}

function setMeta(attrs: Record<string, string>) {
  const selector = Object.entries(attrs)
    .filter(([k]) => k !== 'content')
    .map(([k, v]) => `[${k}="${CSS.escape(v)}"]`)
    .join('');
  let el = document.querySelector<HTMLMetaElement>(`meta${selector}`);
  if (!el) {
    el = document.createElement('meta');
    Object.entries(attrs)
      .filter(([k]) => k !== 'content')
      .forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute('content', attrs.content);
}

function setLink(rel: string, href: string, extra?: Record<string, string>) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"][href="${href}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    el.href = href;
    if (extra) Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

function setHreflang(hreflang: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = 'alternate';
    el.setAttribute('hreflang', hreflang);
    document.head.appendChild(el);
  }
  el.href = href;
}

function injectJsonLd(id: string, data: object | object[]) {
  const existingId = `jsonld-${id}`;
  let el = document.getElementById(existingId) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = existingId;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(Array.isArray(data) ? { '@context': 'https://schema.org', '@graph': data } : data);
}

function removeJsonLd(id: string) {
  document.getElementById(`jsonld-${id}`)?.remove();
}

export function SEOHead({ seo }: { seo: PageSEO }) {
  const {
    title,
    description,
    keywords,
    canonical,
    ogImage = `${SITE_URL}/og-image.png`,
    noindex = false,
    jsonLd,
  } = seo;

  const canonicalUrl = canonical ?? `${SITE_URL}${window.location.pathname}`;

  useEffect(() => {
    document.title = title;

    setMeta({ name: 'description', content: description });
    setMeta({ name: 'keywords', content: keywords });
    setMeta({ name: 'author', content: 'NestSolution (큐렛 주식회사)' });
    setMeta({ name: 'robots', content: noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' });
    setMeta({ name: 'googlebot', content: noindex ? 'noindex' : 'index, follow' });
    setMeta({ name: 'Yeti', content: noindex ? 'noindex' : 'index, follow' });

    // Canonical
    setCanonical(canonicalUrl);

    // hreflang
    setHreflang('ko', canonicalUrl);
    setHreflang('x-default', `${SITE_URL}/`);

    // Open Graph
    setMeta({ property: 'og:type', content: 'website' });
    setMeta({ property: 'og:locale', content: 'ko_KR' });
    setMeta({ property: 'og:site_name', content: '네스트솔루션' });
    setMeta({ property: 'og:title', content: title });
    setMeta({ property: 'og:description', content: description });
    setMeta({ property: 'og:url', content: canonicalUrl });
    setMeta({ property: 'og:image', content: ogImage });
    setMeta({ property: 'og:image:width', content: '1200' });
    setMeta({ property: 'og:image:height', content: '630' });
    setMeta({ property: 'og:image:alt', content: title });

    // Twitter Card
    setMeta({ name: 'twitter:card', content: 'summary_large_image' });
    setMeta({ name: 'twitter:title', content: title });
    setMeta({ name: 'twitter:description', content: description });
    setMeta({ name: 'twitter:image', content: ogImage });

    // 네이버 인증
    setMeta({ name: 'naver-site-verification', content: '930311f2339c80c19127df25b854460858d85e27' });

    // 지역
    setMeta({ name: 'geo.region', content: 'KR' });
    setMeta({ name: 'geo.placename', content: '대한민국' });

    // JSON-LD (페이지별)
    if (jsonLd) {
      injectJsonLd('page', jsonLd);
    } else {
      removeJsonLd('page');
    }
  }, [title, description, keywords, canonicalUrl, ogImage, noindex, jsonLd]);

  // preconnect는 index.html에 정적으로 있지만 폰트 등 동적 리소스 hint 추가
  useEffect(() => {
    setLink('preconnect', 'https://fonts.googleapis.com');
    setLink('preconnect', 'https://fonts.gstatic.com', { crossorigin: '' });
    setLink('dns-prefetch', 'https://fonts.googleapis.com');
  }, []);

  return null;
}
