# NestSolution — 병원 컨설팅 마케팅 전문 기업

큐렛 주식회사의 공식 웹사이트. 17년 임상 경험 기반의 병·의원 컨설팅 전문 기업 NestSolution의 서비스 소개, 성공 사례, 대표 소개, 무료 상담 신청을 제공합니다.

## 기술 스택

- **프레임워크**: React 18 + Vite 6
- **라우팅**: React Router 7
- **스타일링**: Tailwind CSS 4 + shadcn/ui
- **배포**: Vercel (SPA 라우팅)

## 개발 환경 실행

```bash
npm install       # 의존성 설치
npm run dev       # 개발 서버 시작 (http://localhost:5173)
npm run build     # 프로덕션 빌드
```

## 페이지 구조

| 경로 | 페이지 | 설명 |
|---|---|---|
| `/` | 홈 | 메인 랜딩 페이지 |
| `/pain` | 병원 경영 고민 | 원장님 고민 공감 + CTA |
| `/services` | 컨설팅 서비스 | CS관리·마케팅·경영개선·인력관리 4대 서비스 |
| `/process` | 컨설팅 과정 | 단계별 컨설팅 프로세스 |
| `/cases` | 성공 사례 | 실제 컨설팅 성과 사례 |
| `/about` | 대표 소개 | CEO 프로필 및 전문성 |
| `/contact` | 무료 상담 신청 | 상담 신청 폼 |

---

## SEO 최적화 작업 내역 (2026-04-21)

타겟 키워드 **"병원 컨설팅 마케팅"** 검색 순위권 진입을 위한 기술적 SEO 9개 영역 전면 최적화.

### 1. 크롤링 인덱싱 제어

- `public/robots.txt` 신규 생성
- Google(Googlebot), 네이버(Yeti), Bing(Bingbot) 봇별 크롤링 정책 명시
- `Disallow: /*?*` 쿼리스트링 중복 인덱싱 차단
- `Sitemap:` 지시어로 sitemap.xml 연결

### 2. 사이트 구조 및 URL 설계

- 7개 페이지 모두 BreadcrumbList JSON-LD 적용 → 구글 검색 결과 경로 표시
- URL 구조는 기존 유지 (짧고 의미있는 경로)

### 3. 메타데이터 최적화

- `index.html` 타이포 수정 (`Nest Solutiuon` → `NestSolution`)
- 7개 페이지 각각 고유한 title / description / keywords 적용
- OG 태그 전체 세트 완성 (og:locale, og:image, og:image:alt 등)
- Twitter Card 태그 완성
- `og:locale: ko_KR` 추가

### 4. Canonical / 중복 제어

- `SEOHead.tsx`에서 페이지별 canonical 태그 자동 주입
- `index.html`에도 정적 기본 canonical 설정
- robots.txt 쿼리스트링 차단으로 URL 중복 방지

### 5. 콘텐츠 품질 및 검색 적합성

- 핵심 키워드 "병원 컨설팅 마케팅"을 title, description, keywords, JSON-LD에 일관 배치
- 각 페이지별 검색 의도에 맞는 롱테일 키워드 추가
- Footer 메뉴 레이블 SEO 친화적으로 개선 ("고민" → "병원 경영 고민" 등)

### 6. 구조화 데이터 (JSON-LD)

`index.html` (정적):
- `Organization` + `LocalBusiness` + `WebSite` 스키마

페이지별 (동적):

| 페이지 | 구조화 데이터 |
|---|---|
| 홈 | WebPage, BreadcrumbList |
| 서비스 | WebPage, BreadcrumbList, Service × 4 |
| 컨설팅 과정 | WebPage, BreadcrumbList, HowTo |
| 성공 사례 | WebPage, BreadcrumbList |
| 대표 소개 | WebPage, BreadcrumbList, ProfilePage, Person |
| 무료 상담 | WebPage, BreadcrumbList, ContactPage |
| 고민 | WebPage, BreadcrumbList |

### 7. 국제 SEO / hreflang

- `hreflang="ko"` + `hreflang="x-default"` 를 세 곳에 적용
  - `index.html` 정적 태그
  - `SEOHead.tsx` 동적 주입 (페이지 이동 시 자동 갱신)
  - `public/sitemap.xml` `<xhtml:link>` 태그

### 8. 성능 및 페이지 경험

- `vite.config.ts` 코드 스플리팅: `vendor-react` / `vendor-router` / `vendor-ui` / `vendor-charts` 별도 청크 분리
- CSS code splitting 활성화
- `assetsInlineLimit: 4096` — 4KB 이하 자산 인라인으로 HTTP 요청 감소
- `target: 'es2020'` — 모던 브라우저 최적화 빌드
- DNS prefetch + preconnect (Google Fonts)

### 9. E-E-A-T / YMYL 신뢰 신호

- `Footer.tsx`: Schema.org microdata (`Organization`, `Person`, `address`) 적용
- 사업자등록번호를 `taxID` itemProp으로 마크업
- 전문성 뱃지 추가 ("17년+ 임상 현장 경험", "병·의원 전문 컨설팅", "1:1 맞춤 솔루션")
- 각 페이지 JSON-LD에 `knowsAbout`, `worksFor`, `founder` 전문성 신호 삽입
- 외부 링크에 `rel="noreferrer noopener"` 보안 속성 추가

---

## 배포 전 체크리스트

- [ ] **도메인 확인**: `src/app/components/SEOHead.tsx`의 `SITE_URL = 'https://nestsolution.co.kr'`이 실제 도메인과 일치하는지 확인 (다를 경우 이 상수만 변경하면 canonical, hreflang, JSON-LD 전체 반영)
- [ ] **OG 이미지 추가**: `public/og-image.png` (1200×630) 파일 생성 후 추가
- [ ] **네이버 서치어드바이저**: `https://[도메인]/sitemap.xml` 수동 제출
- [ ] **구글 서치콘솔**: sitemap.xml 수동 제출

---

## 주요 파일

```
index.html                          # 정적 SEO 메타태그, JSON-LD, preconnect
public/
  robots.txt                        # 크롤링 제어
  sitemap.xml                       # URL 구조 + hreflang
src/app/
  components/
    SEOHead.tsx                     # 페이지별 동적 SEO 주입 컴포넌트
    Footer.tsx                      # Schema.org microdata + E-E-A-T 신호
  routes.tsx                        # 페이지별 SEO 설정 (SEO_MAP)
vite.config.ts                      # 빌드 최적화 (코드 스플리팅)
```
