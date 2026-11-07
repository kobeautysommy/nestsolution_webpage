import { createBrowserRouter, matchRoutes, Outlet, useLocation, type RouteObject } from 'react-router';
import { useEffect } from 'react';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SEOHead, SITE_URL, type PageSEO } from './components/SEOHead';

/* ─── 페이지별 SEO 설정 ──────────────────────────────────────────────────── */

export const SEO_MAP: Record<string, PageSEO> = {
  '/': {
    title: '병원 컨설팅·의원 컨설팅 전문 | 네스트솔루션',
    description: '병원컨설팅·의원컨설팅·개원컨설팅 전문 네스트솔루션. 물리치료사 출신 대표가 18년 현장 경험으로 CS·마케팅·경영 개선·인력 관리를 직접 실행합니다. 정형외과 월 매출 +185% 사례, 초기 상담 무료.',
    keywords: '병원컨설팅, 의원컨설팅, 개원컨설팅, 네스트솔루션, 병원마케팅, 병원경영전략, 병원CS, 병원CRM컨설팅, 병원인사조직관리, NestSolution',
    canonical: `${SITE_URL}/`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: '네스트솔루션 | 병원 컨설팅 마케팅 전문 기업',
        description: '네스트솔루션은 18년 임상 경험을 바탕으로 병·의원 마케팅, CS 관리, 경영 개선, 인력 관리를 지원하는 병원 컨설팅 전문 기업입니다.',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'ko-KR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', '.speakable'],
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
        ],
      },
    ],
  },

  '/pain': {
    title: '병원 경영 고민 해결 | 네스트솔루션 병원 컨설팅',
    description: '환자는 줄고 직원은 자주 바뀌고 매출은 제자리라면? 병·의원 원장님들이 가장 많이 겪는 경영 고민과 원인을 18년 현장 경험으로 짚어드립니다. 우리 병원 상황은 무료 상담으로 진단받으세요.',
    keywords: '병원 경영 고민, 병원 매출 감소, 병원 직원 관리, 의원 운영 어려움, 병원 컨설팅 필요, 병원 마케팅 어려움',
    canonical: `${SITE_URL}/pain`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/pain#webpage`,
        url: `${SITE_URL}/pain`,
        name: '병원 경영 고민 해결 | NestSolution',
        description: '병·의원 원장님의 경영 고민을 네스트솔루션이 함께 해결합니다.',
        inLanguage: 'ko-KR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.speakable'] },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '병원 경영 고민', item: `${SITE_URL}/pain` },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/pain#faqpage`,
        mainEntity: [
          { '@type': 'Question', name: '병원 컨설팅 비용이 얼마인가요?', acceptedAnswer: { '@type': 'Answer', text: '네스트솔루션은 초기 상담을 무료로 진행합니다. 컨설팅 비용은 병원 규모와 서비스 범위에 따라 맞춤 산정되며, 무료 상담 후 정확한 견적을 안내해드립니다.' } },
          { '@type': 'Question', name: '컨설팅 효과는 얼마나 빨리 나타나나요?', acceptedAnswer: { '@type': 'Answer', text: 'CS 개선은 1~2개월, 마케팅 성과는 2~3개월, 경영 구조 개선은 3~6개월 내 가시적인 변화가 나타납니다. 실제 사례에서 4~5개월 만에 매출이 150% 이상 성장한 병원도 있습니다.' } },
          { '@type': 'Question', name: '소규모 의원도 컨설팅 효과가 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네스트솔루션은 의원급(소규모) 병원을 전문으로 합니다. 원장 2인 체제 정형외과, 개원 3년차 내과 등 소규모 의원에서 매출 153~185% 성장 사례가 있습니다.' } },
          { '@type': 'Question', name: '컨설팅 기간은 얼마나 되나요?', acceptedAnswer: { '@type': 'Answer', text: '기본 컨설팅은 3~6개월 과정입니다. 서비스 범위에 따라 조정되며, 단기 집중 컨설팅(1~2개월)도 운영합니다.' } },
        ],
      },
    ],
  },

  '/services': {
    title: '병원 컨설팅 서비스 | CS관리·마케팅·경영개선·인력관리 | 네스트솔루션',
    description: '병원 CS 관리, 병원 마케팅(네이버 플레이스·블로그·광고), 경영 개선(수익 구조·청구 누락 분석), 인력 관리(채용·교육·SOP)까지. 의원급 병원을 위한 네스트솔루션의 현장 실행형 컨설팅 서비스입니다.',
    keywords: '개원컨설팅, 병원컨설팅, 병원마케팅, 병원경영전략, 병원인사조직관리, 병원CS, 병원CRM컨설팅, 의원컨설팅, 네스트솔루션',
    canonical: `${SITE_URL}/services`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/services#webpage`,
        url: `${SITE_URL}/services`,
        name: '병원 컨설팅 서비스 | 네스트솔루션',
        inLanguage: 'ko-KR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.speakable'] },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '서비스', item: `${SITE_URL}/services` },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/services#service-cs`,
        serviceType: 'CS 관리 컨설팅',
        name: '병원 CS 관리',
        description: '환자 경험 개선 및 재방문율 향상을 위한 병원 CS 관리 컨설팅',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: '대한민국' },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/services#service-marketing`,
        serviceType: '병원 마케팅 컨설팅',
        name: '병원 마케팅',
        description: '온·오프라인 병원 마케팅 전략 수립 및 실행 지원',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: '대한민국' },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/services#service-management`,
        serviceType: '병원 경영 개선 컨설팅',
        name: '병원 경영 개선',
        description: '수익성 분석 및 운영 효율화를 통한 병원 경영 개선',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: '대한민국' },
      },
      {
        '@type': 'Service',
        '@id': `${SITE_URL}/services#service-hr`,
        serviceType: '병원 인력 관리 컨설팅',
        name: '병원 인력 관리',
        description: '직원 교육, 채용, 조직 문화 개선을 위한 인력 관리 컨설팅',
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: '대한민국' },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/services#faqpage`,
        mainEntity: [
          { '@type': 'Question', name: '여러 서비스를 동시에 받을 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '가능합니다. CS 관리, 마케팅, 경영 개선, 인력 관리는 통합 패키지로 제공되며, 우선순위에 따라 단계적으로 또는 동시에 진행할 수 있습니다.' } },
          { '@type': 'Question', name: '병원 마케팅은 어떤 채널 중심으로 하나요?', acceptedAnswer: { '@type': 'Answer', text: '네이버 플레이스 최적화, 블로그 SEO, 네이버 파워링크 광고, 인스타그램 콘텐츠를 중심으로 진행합니다. 각 병원의 지역·진료과목에 맞춰 채널을 선택합니다.' } },
          { '@type': 'Question', name: 'CS 교육은 어떤 방식으로 진행되나요?', acceptedAnswer: { '@type': 'Answer', text: '현장 암행 진단 → 맞춤 매뉴얼 제작 → 롤플레이 기반 직원 교육(월 2~4회) → 지속 모니터링 순으로 진행됩니다. 단순 강의가 아닌 실전 체화 방식입니다.' } },
          { '@type': 'Question', name: '인력 관리 컨설팅에서 채용도 도와주나요?', acceptedAnswer: { '@type': 'Answer', text: '채용 기준 수립과 면접 프로세스 설계까지 지원합니다. 채용 후 온보딩·직무 교육 전 과정을 함께하며, 조직 문화 구축까지 지원합니다.' } },
        ],
      },
    ],
  },

  '/process': {
    title: '병원 컨설팅 과정 | 네스트솔루션 컨설팅 프로세스',
    description: '무료 상담부터 현장 진단, 전략 수립, 실행, 성과 측정까지. 보고서만 남기고 떠나는 컨설팅이 아니라 네스트솔루션이 병원 현장에서 함께 실행하는 단계별 컨설팅 과정을 소개합니다.',
    keywords: '병원 컨설팅 과정, 병원 컨설팅 절차, 의원 컨설팅 프로세스, 병원 컨설팅 단계, 컨설팅 방법론',
    canonical: `${SITE_URL}/process`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/process#webpage`,
        url: `${SITE_URL}/process`,
        name: '병원 컨설팅 과정 | 네스트솔루션',
        inLanguage: 'ko-KR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.speakable'] },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '컨설팅 과정', item: `${SITE_URL}/process` },
        ],
      },
      {
        '@type': 'HowTo',
        name: '네스트솔루션 병원 컨설팅 프로세스',
        description: '네스트솔루션의 단계별 병원 컨설팅 진행 과정',
        step: [
          { '@type': 'HowToStep', position: 1, name: '현황 진단', text: '병·의원의 현황을 정밀 분석하여 문제점을 파악합니다.' },
          { '@type': 'HowToStep', position: 2, name: '전략 수립', text: '진단 결과를 바탕으로 맞춤형 개선 전략을 수립합니다.' },
          { '@type': 'HowToStep', position: 3, name: '실행 지원', text: '전략 실행을 단계별로 지원하고 코칭합니다.' },
          { '@type': 'HowToStep', position: 4, name: '성과 측정', text: '지표를 측정하고 지속적으로 개선합니다.' },
        ],
      },
    ],
  },

  '/cases': {
    title: '병원 컨설팅 성공 사례 | 네스트솔루션 실적',
    description: '정형외과 월 매출 +185%, 신규 환자 +89%, 내과의원 재방문율 +55%. 네스트솔루션과 함께 매출·환자 수·직원 이직률을 개선한 병·의원의 실제 컨설팅 성과를 확인하세요.',
    keywords: '병원 컨설팅 성공 사례, 병원 매출 향상 사례, 의원 경영 개선 사례, 병원 마케팅 성과, 컨설팅 효과',
    canonical: `${SITE_URL}/cases`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/cases#webpage`,
        url: `${SITE_URL}/cases`,
        name: '병원 컨설팅 성공 사례 | 네스트솔루션',
        inLanguage: 'ko-KR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.speakable'] },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '성공 사례', item: `${SITE_URL}/cases` },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${SITE_URL}/cases#caselist`,
        name: '네스트솔루션 병원 컨설팅 성공 사례',
        description: '실제 병·의원 컨설팅을 통해 달성한 성과 사례 목록',
        numberOfItems: 3,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '정형외과 컨설팅 사례 (서울) — 월 매출 185% 성장, 신규 환자 89% 증가, 재방문율 74% 향상', url: `${SITE_URL}/cases#case01` },
          { '@type': 'ListItem', position: 2, name: '정형외과 컨설팅 사례 (경기도) — 월 매출 165% 성장, 신규 환자 76% 증가, 재방문율 61% 향상', url: `${SITE_URL}/cases#case02` },
          { '@type': 'ListItem', position: 3, name: '내과의원 컨설팅 사례 (경기도) — 월 매출 153% 성장, 행정 업무량 40% 감소, 재방문율 55% 향상', url: `${SITE_URL}/cases#case03` },
        ],
      },
    ],
  },

  '/about': {
    title: '대표 소개 | 네스트솔루션 병원 컨설팅 전문가',
    description: '물리치료사 출신, 18년 병원 현장 경험의 김상연 대표. 진료실과 접수대를 직접 겪어본 경험을 바탕으로 이론이 아닌 현장 실행 중심의 병원 컨설팅을 제공합니다.',
    keywords: '네스트솔루션 대표, 병원 컨설턴트, 병원 경영 전문가, 김상연 대표, 18년 임상 경험, 병원 컨설팅 전문가',
    canonical: `${SITE_URL}/about`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: '대표 소개 | 네스트솔루션',
        inLanguage: 'ko-KR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.speakable'] },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '대표 소개', item: `${SITE_URL}/about` },
        ],
      },
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/about#profilepage`,
        url: `${SITE_URL}/about`,
        mainEntity: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#founder`,
          name: '김상연',
          jobTitle: '대표이사',
          worksFor: { '@id': `${SITE_URL}/#organization` },
          description: '18년 임상 경험을 바탕으로 병·의원 컨설팅을 전문으로 하는 네스트솔루션 대표이사',
          knowsAbout: ['병원 컨설팅', '병원 마케팅', '의원 경영', 'CS 관리'],
        },
      },
    ],
  },

  '/profile': {
    title: '김상연 대표 프로필 | 네스트솔루션 병원 컨설팅',
    description: '네스트솔루션 김상연 대표 프로필. 물리치료사 출신 18년 임상 경력, CS·마케팅·경영 개선·인력 관리 전문 병원 컨설턴트. 경력, 자격, 상담 연락처를 한눈에 확인하세요.',
    keywords: '김상연, 네스트솔루션 대표, 병원 컨설턴트, 병원 컨설팅 전문가, 18년 임상 경력, 병원 CS 마케팅',
    canonical: `${SITE_URL}/profile`,
    ogImage: `${SITE_URL}/assets/OG-IMAGE.png`,
    jsonLd: [
      {
        '@type': 'ProfilePage',
        '@id': `${SITE_URL}/profile#webpage`,
        url: `${SITE_URL}/profile`,
        name: '김상연 대표 프로필 | 네스트솔루션',
        inLanguage: 'ko-KR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        mainEntity: {
          '@type': 'Person',
          '@id': `${SITE_URL}/#founder`,
          name: '김상연',
          jobTitle: '대표이사',
          worksFor: { '@id': `${SITE_URL}/#organization` },
          telephone: '010-3129-8248',
          email: 'nestsadvice@gmail.com',
          description: '18년 임상 경험 기반 병원 CS·마케팅·경영개선·인력관리 전문 컨설턴트',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '대표 프로필', item: `${SITE_URL}/profile` },
        ],
      },
    ],
  },

  '/contact': {
    title: '병원 컨설팅 무료 상담 신청 | 네스트솔루션',
    description: '병원 컨설팅 무료 상담 신청. 병원 상황을 남겨주시면 18년 현장 경험의 전문가가 마케팅·CS·경영·인력 문제를 진단하고 개선 방향을 안내해 드립니다. 평일 09:00–20:00.',
    keywords: '네스트솔루션 상담, 병원 컨설팅 상담, 무료 컨설팅 신청, 병원 마케팅 상담, 의원 컨설팅 문의',
    canonical: `${SITE_URL}/contact`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/contact#webpage`,
        url: `${SITE_URL}/contact`,
        name: '병원 컨설팅 무료 상담 신청 | 네스트솔루션',
        inLanguage: 'ko-KR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2', '.speakable'] },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '무료 상담', item: `${SITE_URL}/contact` },
        ],
      },
      {
        '@type': 'ContactPage',
        '@id': `${SITE_URL}/contact#contactpage`,
        url: `${SITE_URL}/contact`,
        name: '무료 상담 신청',
        description: '네스트솔루션 병원 컨설팅 무료 상담 신청 페이지',
      },
    ],
  },

  '/blog': {
    title: '블로그 | 네스트솔루션',
    description: '병원 개원·경영·마케팅·세무·인력 관리까지, 18년 병원 현장 경험의 네스트솔루션이 원장님께 필요한 실전 컨설팅 정보를 정리합니다.',
    keywords: '네스트솔루션 블로그, 병원 컨설팅 블로그, 병원 마케팅, 병원 경영',
    canonical: `${SITE_URL}/blog`,
  },
};

/* ─── Root Layout ────────────────────────────────────────────────────────── */
function Root() {
  const { pathname } = useLocation();
  // 블로그 글은 BlogPost가 글별 SEO를 직접 설정
  const isPost = pathname.startsWith('/blog/');
  const seo = SEO_MAP[pathname] ?? SEO_MAP['/'];

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div style={{ minHeight: '100vh', background: '#080f1e' }}>
      {!isPost && <SEOHead seo={seo} />}
      <Nav />
      <main style={{ paddingTop: 64 }}>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function NotFound() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#eef1f6', fontFamily: "'Noto Sans KR', sans-serif", flexDirection: 'column', gap: '1rem' }}>
      <div style={{ fontFamily: "'Bebas Neue', cursive", fontSize: '6rem', color: 'rgba(0,200,170,0.3)', lineHeight: 1 }}>404</div>
      <p style={{ color: '#7a8799' }}>페이지를 찾을 수 없습니다.</p>
    </div>
  );
}

// 라우트 lazy: 프리렌더(createStaticHandler)가 렌더 전에 페이지 모듈을 불러오므로 본문이 HTML에 포함됨
export const routeDefs: RouteObject[] = [
  {
    path: '/',
    Component: Root,
    children: [
      { index: true,         lazy: () => import('./pages/Home').then(m => ({ Component: m.Home })) },
      { path: 'pain',        lazy: () => import('./pages/Pain').then(m => ({ Component: m.Pain })) },
      { path: 'services',    lazy: () => import('./pages/Services').then(m => ({ Component: m.Services })) },
      { path: 'process',     lazy: () => import('./pages/Process').then(m => ({ Component: m.Process })) },
      { path: 'about',       lazy: () => import('./pages/About').then(m => ({ Component: m.About })) },
      { path: 'contact',     lazy: () => import('./pages/Contact').then(m => ({ Component: m.Contact })) },
      { path: 'cases',       lazy: () => import('./pages/Cases').then(m => ({ Component: m.Cases })) },
      { path: 'profile',     lazy: () => import('./pages/Profile').then(m => ({ Component: m.Profile })) },
      { path: 'blog',        lazy: () => import('./pages/Blog').then(m => ({ Component: m.Blog, loader: m.loader })) },
      { path: 'blog/:slug',  lazy: () => import('./pages/BlogPost').then(m => ({ Component: m.BlogPost, loader: m.loader })) },
      { path: '*',           Component: NotFound },
    ],
  },
];

/** 현재 URL의 lazy 페이지를 먼저 불러온 뒤 라우터 생성 — 프리렌더 HTML과 hydrate 결과가 일치하도록 */
export async function createAppRouter() {
  const matches = matchRoutes(routeDefs, window.location) ?? [];
  await Promise.all(matches.map(async ({ route }) => {
    if (typeof route.lazy !== 'function') return;
    Object.assign(route, await route.lazy(), { lazy: undefined });
  }));
  return createBrowserRouter(routeDefs);
}
