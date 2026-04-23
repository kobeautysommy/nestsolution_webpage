import { createBrowserRouter, Outlet, useLocation } from 'react-router';
import { useEffect } from 'react';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SEOHead, SITE_URL, type PageSEO } from './components/SEOHead';
import { Home } from './pages/Home';
import { Pain } from './pages/Pain';
import { Services } from './pages/Services';
import { Process } from './pages/Process';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Cases } from './pages/Cases';

/* ─── 페이지별 SEO 설정 ──────────────────────────────────────────────────── */

const SEO_MAP: Record<string, PageSEO> = {
  '/': {
    title: '병원 컨설팅·의원 컨설팅 전문 | 네스트솔루션',
    description: '개원·병원컨설팅·의원컨설팅 전문 기업 네스트솔루션. 17년 임상 경험 기반 마케팅·경영전략·CS·CRM.',
    keywords: '병원컨설팅, 의원컨설팅, 개원컨설팅, 네스트솔루션, 병원마케팅, 병원경영전략, 병원CS, 병원CRM컨설팅, 병원인사조직관리, NestSolution',
    canonical: `${SITE_URL}/`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: '네스트솔루션 | 병원 컨설팅 마케팅 전문 기업',
        description: '네스트솔루션은 17년 임상 경험을 바탕으로 병·의원 마케팅, CS 관리, 경영 개선, 인력 관리를 지원하는 병원 컨설팅 전문 기업입니다.',
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'ko-KR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${SITE_URL}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: `${SITE_URL}/` },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: '네스트솔루션 | 병원 컨설팅 마케팅 전문 기업',
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', '.speakable'],
        },
        inLanguage: 'ko-KR',
      },
    ],
  },

  '/pain': {
    title: '병원 경영 고민 해결 | 네스트솔루션 병원 컨설팅',
    description: '환자 감소·직원 이직·매출 정체, 병·의원 고민을 17년 경험으로 해결합니다. 무료 상담 신청.',
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
    description: '개원컨설팅·병원컨설팅·병원마케팅·경영전략·인사조직관리·병원CS·CRM. 17년 임상 경험 기반.',
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
    description: '네스트솔루션의 체계적인 병원 컨설팅 프로세스를 확인하세요. 진단 → 전략 수립 → 실행 → 성과 측정까지 단계별로 함께합니다.',
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
    description: '실제 병·의원 컨설팅 성공 사례를 확인하세요. 네스트솔루션과 함께 매출 향상, 환자 증가, 운영 효율화를 이룬 병원들의 이야기.',
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
      {
        '@type': 'Review',
        '@id': `${SITE_URL}/cases#review01`,
        itemReviewed: { '@id': `${SITE_URL}/#organization` },
        reviewBody: '네스트솔루션과 함께하고 나서 병원 분위기 자체가 바뀌었습니다. 직원들이 스스로 환자를 챙기기 시작했고, 리뷰도 좋아졌어요. 무엇보다 제가 진료에만 집중할 수 있게 된 게 가장 큰 변화입니다.',
        author: { '@type': 'Person', name: '○○정형외과 원장 (서울)' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        '@id': `${SITE_URL}/cases#review02`,
        itemReviewed: { '@id': `${SITE_URL}/#organization` },
        reviewBody: '두 명이 같이 운영하다 보니 오히려 역할이 더 불분명했는데, 네스트솔루션이 체계를 잡아줬습니다. 지금은 제가 진료에만 집중하고, 운영은 팀이 돌아가는 구조가 됐어요.',
        author: { '@type': 'Person', name: '○○정형외과 원장 (경기도)' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@type': 'Review',
        '@id': `${SITE_URL}/cases#review03`,
        itemReviewed: { '@id': `${SITE_URL}/#organization` },
        reviewBody: '경영이 뭔지 모른 채 진료만 했는데, 네스트솔루션이 제 병원의 숨은 문제점들을 모두 찾아줬습니다. 4개월 만에 이렇게 바뀔 수 있다는 게 놀라웠어요.',
        author: { '@type': 'Person', name: '○○내과의원 원장 (경기도)' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
    ],
  },

  '/about': {
    title: '대표 소개 | 네스트솔루션 병원 컨설팅 전문가',
    description: '17년 임상 경험 병원 컨설팅 전문가 김상연 대표. 현장 지식 기반 실질적 컨설팅을 제공합니다.',
    keywords: '네스트솔루션 대표, 병원 컨설턴트, 병원 경영 전문가, 김상연 대표, 17년 임상 경험, 병원 컨설팅 전문가',
    canonical: `${SITE_URL}/about`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: '대표 소개 | 네스트솔루션',
        inLanguage: 'ko-KR',
        isPartOf: { '@id': `${SITE_URL}/#website` },
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
          description: '17년 임상 경험을 바탕으로 병·의원 컨설팅을 전문으로 하는 네스트솔루션 대표이사',
          knowsAbout: ['병원 컨설팅', '병원 마케팅', '의원 경영', 'CS 관리'],
        },
      },
    ],
  },

  '/contact': {
    title: '병원 컨설팅 무료 상담 신청 | 네스트솔루션',
    description: '네스트솔루션 병원 컨설팅 무료 상담 신청. 17년 임상 경험 전문가가 마케팅·CS·경영 개선을 진단합니다.',
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
};

/* ─── Root Layout ────────────────────────────────────────────────────────── */
function Root() {
  const { pathname } = useLocation();
  const seo = SEO_MAP[pathname] ?? SEO_MAP['/'];

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div style={{ minHeight: '100vh', background: '#080f1e' }}>
      <SEOHead seo={seo} />
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

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true,         Component: Home },
      { path: 'pain',        Component: Pain },
      { path: 'services',    Component: Services },
      { path: 'process',     Component: Process },
      { path: 'about',       Component: About },
      { path: 'contact',     Component: Contact },
      { path: 'cases',       Component: Cases },
      { path: '*',           Component: NotFound },
    ],
  },
]);
