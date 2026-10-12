// WordPress(FastComet) REST API — 블로그 글은 WP 관리자에서 작성·발행
const WP_API = 'https://nestsolu.jp4.fcomet.com/blog/wp-json/wp/v2';

export interface WpPost {
  id: number;
  slug: string;
  date: string;
  title: string;      // HTML 엔티티 포함 가능
  excerpt: string;    // HTML
  content: string;    // HTML
  image?: string;
}

interface WpApiPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: { 'wp:featuredmedia'?: { source_url?: string }[] };
}

function toPost(p: WpApiPost): WpPost {
  return {
    id: p.id,
    slug: p.slug,
    date: p.date,
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

/** HTML → 순수 텍스트 (제목·요약 표시용) */
export function stripHtml(html: string): string {
  if (typeof document === 'undefined') return html.replace(/<[^>]*>/g, '');
  const el = document.createElement('div');
  el.innerHTML = html;
  return (el.textContent ?? '').trim();
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}
