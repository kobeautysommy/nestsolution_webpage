import { SITE_URL, type PageSEO } from '../components/SEOHead';

// WordPress(FastComet) REST API — 블로그 글은 WP 관리자에서 작성·발행
const WP_API = 'https://nestsolu.jp4.fcomet.com/blog/wp-json/wp/v2';

export interface WpPost {
  id: number;
  slug: string;
  date: string;
  modified: string;   // ISO (UTC)
  title: string;      // HTML 엔티티 포함 가능
  excerpt: string;    // HTML
  content: string;    // HTML
  image?: string;
}

interface WpApiPost {
  id: number;
  slug: string;
  date_gmt: string;
  modified_gmt: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: { 'wp:featuredmedia'?: { source_url?: string }[] };
}

function toPost(p: WpApiPost): WpPost {
  return {
    id: p.id,
    slug: p.slug,
    date: `${p.date_gmt}Z`,
    modified: `${p.modified_gmt}Z`,
    title: p.title.rendered,
    excerpt: p.excerpt.rendered,
    content: p.content.rendered,
    image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url,
  };
}

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`WP API ${res.status}`);
  return res.json();
}

export async function fetchPosts(signal?: AbortSignal): Promise<WpPost[]> {
  const data = await getJson<WpApiPost[]>(
    `${WP_API}/posts?per_page=50&_embed=wp:featuredmedia`, signal,
  );
  return data.map(toPost);
}

export async function fetchPost(slug: string, signal?: AbortSignal): Promise<WpPost | null> {
  const data = await getJson<WpApiPost[]>(
    `${WP_API}/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia`, signal,
  );
  return data[0] ? toPost(data[0]) : null;
}

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', ndash: '–', mdash: '—', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', middot: '·' };

/** HTML → 순수 텍스트 (제목·요약 표시용). 프리렌더(서버)와 브라우저 결과가 같아야 hydrate 불일치가 없음 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) =>
      e[0] === '#' ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : Number(e.slice(1)))
        : ENTITIES[e.toLowerCase()] ?? m)
    .trim();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Seoul' });
}

/** 글별 SEO — 브라우저(SEOHead)와 프리렌더(prerender.js)가 같이 사용 */
export function postSEO(post: WpPost): PageSEO {
  const headline = stripHtml(post.title);
  const description = stripHtml(post.excerpt).replace(/\s+/g, ' ').replace(/\s*\[…\]$/, '').slice(0, 150);
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: `${headline} | 네스트솔루션 블로그`,
    description,
    keywords: '네스트솔루션 블로그, 병원 컨설팅, 병원 마케팅, 병원 경영',
    canonical: url,
    ogImage: post.image,
    jsonLd: [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline,
        description,
        url,
        mainEntityOfPage: url,
        datePublished: post.date,
        dateModified: post.modified,
        ...(post.image && { image: post.image }),
        author: { '@id': `${SITE_URL}/#founder` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'ko-KR',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '블로그', item: `${SITE_URL}/blog` },
          { '@type': 'ListItem', position: 3, name: headline, item: url },
        ],
      },
    ],
  };
}
