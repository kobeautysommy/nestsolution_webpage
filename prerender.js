import { build } from 'vite';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const ROUTES = ['/', '/pain', '/services', '/process', '/about', '/contact', '/cases', '/profile'];
const SITE_URL = 'https://nestsolution.co.kr';
const ROOT = process.cwd();

// 함수 교체 방식으로 $기호 해석 문제 방지
const rep = (v) => () => v;

function injectSEO(template, seo, route) {
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
    const script = `  <script type="application/ld+json" id="jsonld-page">${JSON.stringify(data)}</script>`;
    html = html.replace('</head>', `${script}\n  </head>`);
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
  const { render, SEO_MAP } = await import(serverEntryUrl);

  for (const route of ROUTES) {
    process.stdout.write(`  ${route} ... `);

    let appHtml = '';
    try {
      appHtml = await render(route);
    } catch (err) {
      process.stdout.write(`⚠ 렌더 실패 (${err.message}) — 빈 HTML로 대체\n`);
    }

    const seo = SEO_MAP[route] ?? SEO_MAP['/'];
    let html = template.replace('<!--app-html-->', appHtml);
    html = injectSEO(html, seo, route);

    const outDir = route === '/' ? join(ROOT, 'dist') : join(ROOT, 'dist', route.slice(1));
    if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);
    console.log('✓');
  }

  console.log('\n✅ 프리렌더링 완료. dist/ 디렉토리에 정적 HTML 생성됨.');
}

main().catch((err) => {
  console.error('❌ 프리렌더링 실패:', err);
  process.exit(1);
});
