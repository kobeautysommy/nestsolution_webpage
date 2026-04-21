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
    title: 'NestSolution | 병원 컨설팅 마케팅 전문 기업',
    description: 'NestSolution은 17년 임상 경험을 바탕으로 병·의원 마케팅, CS 관리, 경영 개선, 인력 관리를 지원하는 병원 컨설팅 전문 기업입니다. 매출 향상과 운영 효율화를 함께 설계합니다.',
    keywords: '병원 컨설팅 마케팅, 병원 컨설팅, 의원 컨설팅, 병원 마케팅, 의원 마케팅, 병원 경영 컨설팅, CS 관리, 병원 인력 관리, NestSolution',
    canonical: `${SITE_URL}/`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: 'NestSolution | 병원 컨설팅 마케팅 전문 기업',
        description: 'NestSolution은 17년 임상 경험을 바탕으로 병·의원 마케팅, CS 관리, 경영 개선, 인력 관리를 지원하는 병원 컨설팅 전문 기업입니다.',
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
    ],
  },

  '/pain': {
    title: '병원 경영 고민 해결 | NestSolution 병원 컨설팅',
    description: '환자 감소, 직원 이직, 매출 정체… 병·의원 원장님의 고민을 NestSolution이 17년 경험으로 해결합니다. 병원 컨설팅 전문가와 무료 상담을 시작하세요.',
    keywords: '병원 경영 고민, 병원 매출 감소, 병원 직원 관리, 의원 운영 어려움, 병원 컨설팅 필요, 병원 마케팅 어려움',
    canonical: `${SITE_URL}/pain`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/pain#webpage`,
        url: `${SITE_URL}/pain`,
        name: '병원 경영 고민 해결 | NestSolution',
        description: '병·의원 원장님의 경영 고민을 NestSolution이 함께 해결합니다.',
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
    ],
  },

  '/services': {
    title: '병원 컨설팅 서비스 | CS관리·마케팅·경영개선·인력관리 | NestSolution',
    description: 'NestSolution의 4대 병원 컨설팅 서비스: CS 관리, 병원 마케팅, 경영 개선, 인력 관리. 17년 임상 경험 기반의 맞춤형 컨설팅으로 실질적인 매출 향상을 경험하세요.',
    keywords: '병원 CS 관리, 병원 마케팅 서비스, 병원 경영 개선, 병원 인력 관리, 의원 컨설팅 서비스, 병원 컨설팅 마케팅 전문',
    canonical: `${SITE_URL}/services`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/services#webpage`,
        url: `${SITE_URL}/services`,
        name: '병원 컨설팅 서비스 | NestSolution',
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
    ],
  },

  '/process': {
    title: '병원 컨설팅 과정 | NestSolution 컨설팅 프로세스',
    description: 'NestSolution의 체계적인 병원 컨설팅 프로세스를 확인하세요. 진단 → 전략 수립 → 실행 → 성과 측정까지 단계별로 함께합니다.',
    keywords: '병원 컨설팅 과정, 병원 컨설팅 절차, 의원 컨설팅 프로세스, 병원 컨설팅 단계, 컨설팅 방법론',
    canonical: `${SITE_URL}/process`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/process#webpage`,
        url: `${SITE_URL}/process`,
        name: '병원 컨설팅 과정 | NestSolution',
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
        name: 'NestSolution 병원 컨설팅 프로세스',
        description: 'NestSolution의 단계별 병원 컨설팅 진행 과정',
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
    title: '병원 컨설팅 성공 사례 | NestSolution 실적',
    description: '실제 병·의원 컨설팅 성공 사례를 확인하세요. NestSolution과 함께 매출 향상, 환자 증가, 운영 효율화를 이룬 병원들의 이야기.',
    keywords: '병원 컨설팅 성공 사례, 병원 매출 향상 사례, 의원 경영 개선 사례, 병원 마케팅 성과, 컨설팅 효과',
    canonical: `${SITE_URL}/cases`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/cases#webpage`,
        url: `${SITE_URL}/cases`,
        name: '병원 컨설팅 성공 사례 | NestSolution',
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
    ],
  },

  '/about': {
    title: '대표 소개 | NestSolution 병원 컨설팅 전문가',
    description: '17년 임상 경험의 병원 컨설팅 전문가 김상연 대표. 직접 경험한 병원 현장 지식으로 실질적인 컨설팅을 제공합니다. NestSolution의 전문성을 확인하세요.',
    keywords: '병원 컨설턴트, 병원 경영 전문가, 김상연 대표, NestSolution 대표, 17년 임상 경험, 병원 컨설팅 전문가',
    canonical: `${SITE_URL}/about`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/about#webpage`,
        url: `${SITE_URL}/about`,
        name: '대표 소개 | NestSolution',
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
          description: '17년 임상 경험을 바탕으로 병·의원 컨설팅을 전문으로 하는 NestSolution 대표이사',
          knowsAbout: ['병원 컨설팅', '병원 마케팅', '의원 경영', 'CS 관리'],
        },
      },
    ],
  },

  '/contact': {
    title: '병원 컨설팅 무료 상담 신청 | NestSolution',
    description: 'NestSolution 병원 컨설팅 무료 상담을 신청하세요. 17년 임상 경험의 전문가가 병원 마케팅, CS 관리, 경영 개선 방안을 직접 진단해 드립니다.',
    keywords: '병원 컨설팅 상담, 무료 컨설팅 신청, 병원 마케팅 상담, 의원 컨설팅 문의, NestSolution 연락처',
    canonical: `${SITE_URL}/contact`,
    jsonLd: [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}/contact#webpage`,
        url: `${SITE_URL}/contact`,
        name: '병원 컨설팅 무료 상담 신청 | NestSolution',
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
        description: 'NestSolution 병원 컨설팅 무료 상담 신청 페이지',
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
