import { build } from 'vite';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROUTES = ['/', '/pain', '/services', '/process', '/about', '/contact', '/cases', '/profile', '/blog'];
const SITE_URL = 'https://nestsolution.co.kr';
const ROOT = process.cwd();
// IndexNow 키 — public/<key>.txt 와 같아야 함 (Bing·네이버 등에 변경 URL 즉시 알림)
const INDEXNOW_KEY = '7a1c5d13b1f9812cef14a1a33d2dc506';

// 함수 교체 방식으로 $기호 해석 문제 방지
const rep = (v) => () => v;

const sitemapEntries = (xml) => Object.fromEntries(
  [...xml.matchAll(/<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]*)<\/lastmod>)?/g)].map((m) => [m[1], m[2] ?? '']),
);

/** 프로덕션 빌드에서만: 라이브 사이트맵과 비교해 새로 생기거나 바뀌거나 사라진 URL을 IndexNow로 알림 */
async function pingIndexNow(sitemapXml) {
  if (process.env.VERCEL_ENV !== 'production') return;
  try {
    const keyLive = await fetch(`${SITE_URL}/${INDEXNOW_KEY}.txt`).then((r) => r.ok).catch(() => false);
    const live = keyLive ? sitemapEntries(await fetch(`${SITE_URL}/sitemap.xml`).then((r) => r.text())) : {};
    const next = sitemapEntries(sitemapXml);
    // 키가 아직 배포 전이면(첫 연동) 전체 URL 제출
    const urlList = [
      ...Object.keys(next).filter((u) => !keyLive || live[u] !== next[u]),
      ...Object.keys(live).filter((u) => !(u in next)),
    ];
    if (!urlList.length) return console.log('  IndexNow ... 변경된 URL 없음');
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify({ host: 'nestsolution.co.kr', key: INDEXNOW_KEY, keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`, urlList }),
    });
    console.log(`  IndexNow ... ${urlList.length}개 URL 제출 (HTTP ${res.status})`);
  } catch (err) {
    console.warn(`  ⚠ IndexNow 실패 (${err.message}) — 빌드는 계속`);
  }
}

// 블로그 글 제목·요약에 " < & 가 들어갈 수 있어 HTML 속성용으로 이스케이프
const esc = (v) => v && String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function injectSEO(template, rawSeo, route) {
  const seo = {
    ...rawSeo,
    title: esc(rawSeo.title),
    description: esc(rawSeo.description),
    keywords: esc(rawSeo.keywords),
    canonical: esc(rawSeo.canonical),
    ogImage: esc(rawSeo.ogImage),
  };
  const canonical = seo.canonical ?? `${SITE_URL}${route}`;
  let html = template;

  html = html.replace(/<title>[^<]*<\/title>/, rep(`<title>${seo.title}</title>`));

  html = html.replace(
    /(<meta name="description" content=")[^"]*/,
    rep(`<meta name="description" content="${seo.description}`)
  );
  if (seo.keywords) {
    html = html.replace(
      /(<meta name="keywords" content=")[^"]*/,
      rep(`<meta name="keywords" content="${seo.keywords}`)
    );
  }
  html = html.replace(
    /(<link rel="canonical" href=")[^"]*/,
    rep(`<link rel="canonical" href="${canonical}`)
  );
  html = html.replace(
    /(<link rel="alternate" hreflang="ko" href=")[^"]*/,
    rep(`<link rel="alternate" hreflang="ko" href="${canonical}`)
  );
  html = html.replace(
    /(<meta property="og:title" content=")[^"]*/,
    rep(`<meta property="og:title" content="${seo.title}`)
  );
  html = html.replace(
    /(<meta property="og:description" content=")[^"]*/,
    rep(`<meta property="og:description" content="${seo.description}`)
  );
  html = html.replace(
    /(<meta property="og:url" content=")[^"]*/,
    rep(`<meta property="og:url" content="${canonical}`)
  );
  html = html.replace(
    /(<meta name="twitter:title" content=")[^"]*/,
    rep(`<meta name="twitter:title" content="${seo.title}`)
  );
  html = html.replace(
    /(<meta name="twitter:description" content=")[^"]*/,
    rep(`<meta name="twitter:description" content="${seo.description}`)
  );

  // og:image / twitter:image 교체 (페이지별 이미지가 있을 때만)
  if (seo.ogImage) {
    html = html.replace(
      /(<meta property="og:image" content=")[^"]*/,
      rep(`<meta property="og:image" content="${seo.ogImage}`)
    );
    html = html.replace(
      /(<meta property="og:image:alt" content=")[^"]*/,
      rep(`<meta property="og:image:alt" content="${seo.title}`)
    );
    html = html.replace(
      /(<meta name="twitter:image" content=")[^"]*/,
      rep(`<meta name="twitter:image" content="${seo.ogImage}`)
    );
  }

  // 페이지별 JSON-LD 추가 (Organization/WebSite 기본 JSON-LD는 유지)
  if (seo.jsonLd) {
    const data = Array.isArray(seo.jsonLd)
      ? { '@context': 'https://schema.org', '@graph': seo.jsonLd }
      : seo.jsonLd;
    const script = `  <script type="application/ld+json" id="jsonld-page">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
    html = html.replace('</head>', `${script}\n  </head>`);
  }

  if (seo.noindex) {
    html = html
      .replace(/(<meta name="robots" content=")[^"]*/, rep('<meta name="robots" content="noindex, nofollow'))
      .replace(/(<meta name="googlebot" content=")[^"]*/, rep('<meta name="googlebot" content="noindex'))
      .replace(/(<meta name="Yeti" content=")[^"]*/, rep('<meta name="Yeti" content="noindex'));
  }

  return html;
}

async function main() {
  console.log('📦 클라이언트 빌드 중...');
  await build({ logLevel: 'warn' });

  console.log('📦 SSR 서버 번들 빌드 중...');
  process.env.PRERENDER_SSR = '1';
  await build({
    logLevel: 'warn',
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist/server',
      rollupOptions: {
        output: {
          entryFileNames: '[name].js',
          manualChunks: undefined,
        },
      },
    },
  });

  console.log('🚀 각 페이지 프리렌더링 중...');
  const template = readFileSync(join(ROOT, 'dist/index.html'), 'utf-8');
  const serverEntryUrl = pathToFileURL(join(ROOT, 'dist/server/entry-server.js')).href;
  const { render, SEO_MAP, fetchPosts, postSEO } = await import(serverEntryUrl);

  // WordPress 글 → /blog/<slug> 정적 페이지 (WP가 응답하지 않으면 글 페이지 없이 빌드 계속)
  let posts = [];
  try {
    posts = await fetchPosts();
  } catch (err) {
    console.warn(`  ⚠ WordPress 글 목록 불러오기 실패 (${err.message}) — 블로그 글 프리렌더 생략`);
  }
  const pages = [
    ...ROUTES.map((route) => ({ route, seo: SEO_MAP[route] ?? SEO_MAP['/'] })),
    ...posts.map((post) => ({ route: `/blog/${post.slug}`, seo: postSEO(post) })),
  ];

  for (const { route, seo } of pages) {
    process.stdout.write(`  ${decodeURIComponent(route)} ... `);

    let appHtml = '';
    try {
      appHtml = await render(route);
    } catch (err) {
      process.stdout.write(`⚠ 렌더 실패 (${err.message}) — 빈 HTML로 대체\n`);
    }

    let html = template.replace('<!--app-html-->', appHtml);
    html = injectSEO(html, seo, route);

    const outDir = route === '/' ? join(ROOT, 'dist') : join(ROOT, 'dist', decodeURIComponent(route.slice(1)));
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    console.log('✓');
  }

  // 빌드 이후 발행된 글용 셸 (vercel.json rewrite) — 브라우저에서 글을 불러와 렌더, 다음 빌드 때 정적 페이지로 대체됨
  writeFileSync(
    join(ROOT, 'dist', 'blog', '_post.html'),
    template
      .replace(/\s*<link rel="canonical"[^>]*\/>/, rep(''))
      .replace(/\s*<link rel="alternate" hreflang="ko"[^>]*\/>/, rep('')),
  );

  // 사이트맵에 블로그 글 추가
  if (posts.length) {
    const sitemapPath = join(ROOT, 'dist', 'sitemap.xml');
    const entries = posts.map((post) => {
      const loc = `${SITE_URL}/blog/${post.slug}`;
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        `    <lastmod>${post.modified}</lastmod>`,
        '    <changefreq>monthly</changefreq>',
        '    <priority>0.7</priority>',
        `    <xhtml:link rel="alternate" hreflang="ko" href="${loc}"/>`,
        '  </url>',
      ].join('\n');
    }).join('\n\n');
    const latest = posts.map((p) => p.modified).sort().at(-1);
    const sitemap = readFileSync(sitemapPath, 'utf-8')
      .replace(/(<loc>https:\/\/nestsolution\.co\.kr\/blog<\/loc>\s*<lastmod>)[^<]*/, rep(`<loc>${SITE_URL}/blog</loc>\n    <lastmod>${latest}`))
      .replace('</urlset>', rep(`  <!-- 블로그 글 (빌드 시 WordPress에서 자동 생성) -->\n${entries}\n\n</urlset>`));
    writeFileSync(sitemapPath, sitemap);
    console.log(`  sitemap.xml ... 블로그 글 ${posts.length}개 추가 ✓`);

    // llms.txt(AI용 회사 요약)에 블로그 글 목록 추가
    const llmsPath = join(ROOT, 'dist', 'llms.txt');
    const articles = posts.map((post) => {
      const { description } = postSEO(post);
      const title = postSEO(post).jsonLd[0].headline;
      return `- [${title}](${SITE_URL}/blog/${post.slug}) (${post.date.slice(0, 10)}): ${description}`;
    }).join('\n');
    const llms = readFileSync(llmsPath, 'utf-8')
      .replace(/updated \d{4}-\d{2}-\d{2}/, rep(`updated ${latest.slice(0, 10)}`))
      .trimEnd();
    writeFileSync(llmsPath, `${llms}\n\n## Blog Articles (병원 컨설팅 칼럼, 글쓴이: 김상연 대표)\n${articles}\n`);
    console.log(`  llms.txt ... 블로그 글 ${posts.length}개 추가 ✓`);
  }

  await pingIndexNow(readFileSync(join(ROOT, 'dist', 'sitemap.xml'), 'utf-8'));

  // 404 페이지 (Vercel이 매칭되지 않는 경로에 404 상태와 함께 서빙)
  process.stdout.write('  /404 ... ');
  let notFoundAppHtml = '';
  try {
    notFoundAppHtml = await render('/__not_found__');
  } catch {
    // 렌더 실패 시 빈 HTML
  }
  let html404 = template.replace('<!--app-html-->', notFoundAppHtml);
  html404 = injectSEO(html404, {
    title: '페이지를 찾을 수 없습니다 | 네스트솔루션',
    description: '요청하신 페이지를 찾을 수 없습니다. 네스트솔루션 홈으로 이동해 주세요.',
  }, '/404');
  html404 = html404
    .replace(/(<meta name="robots" content=")[^"]*/, rep('<meta name="robots" content="noindex, nofollow'))
    .replace(/(<meta name="googlebot" content=")[^"]*/, rep('<meta name="googlebot" content="noindex'))
    .replace(/(<meta name="Yeti" content=")[^"]*/, rep('<meta name="Yeti" content="noindex'))
    .replace(/\s*<link rel="canonical"[^>]*\/>/, rep(''))
    .replace(/\s*<link rel="alternate" hreflang="ko"[^>]*\/>/, rep(''))
    .replace(/\s*<link rel="alternate" hreflang="x-default"[^>]*\/>/, rep(''));
  writeFileSync(join(ROOT, 'dist', '404.html'), html404);
  console.log('✓');

  console.log('\n✅ 프리렌더링 완료. dist/ 디렉토리에 정적 HTML 생성됨.');
}

main().catch((err) => {
  console.error('❌ 프리렌더링 실패:', err);
  process.exit(1);
});
