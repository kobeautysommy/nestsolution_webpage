
const contactItems = [
  { label: '휴대전화', value: '010-3129-8248',                    href: 'tel:010-3129-8248' },
  { label: '이메일',   value: 'nestsadvice@gmail.com',            href: 'mailto:nestsadvice@gmail.com' },
  { label: '홈페이지', value: 'nestsolution.co.kr',               href: 'https://nestsolution.co.kr' },
  { label: '주소',     value: '서울특별시 서초구 서운로 13 지하1층', href: 'https://map.naver.com/p/search/%EB%84%A4%EC%8A%A4%ED%8A%B8%EC%86%94%EB%A3%A8%EC%85%98/place/2033624447?placePath=%3Fbk_query%3D%25EB%2584%25A4%25EC%258A%25A4%25ED%258A%25B8%25EC%2586%2594%25EB%25A3%25A8%25EC%2585%2598%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue&placeSearchOption=bk_query%3D%25EB%2584%25A4%25EC%258A%25A4%25ED%258A%25B8%25EC%2586%2594%25EB%25A3%25A8%25EC%2585%2598%26entry%3Dpll%26fromNxList%3Dtrue%26originalQuery%3D%25EB%2584%25A4%25EC%258A%25A4%25ED%258A%25B8%25EC%2586%2594%25EB%25A3%25A8%25EC%2585%2598%26x%3D%26y%3D&searchType=place' },
];

export function Profile() {
  return (
    <div className="business-card-container">
      <div className="business-card-wrapper">

        {/* ── 프로필 헤더 ─────────────────────────────────────── */}
        <div className="profile-header">
          <div className="profile-image-container">
            <div className="profile-image">
              <img src="/assets/Image%20(Profile).png" alt="김상연 대표" />
            </div>
          </div>

          <img
            className="profile-logo"
            src="/assets/%EB%84%A4%EC%8A%A4%ED%8A%B8%20%EB%A1%9C%EA%B3%A0%201.png"
            alt="Nests"
          />

          <div className="profile-overlay">
            <div className="profile-info">
              <h1 className="profile-name">김상연</h1>
              <p className="profile-experience">17년 임상 경력</p>
              <p className="profile-company">네스트솔루션</p>
            </div>
            <div className="button-group">
              {['CS 관리', '마케팅', '경영 개선', '인력 관리'].map(tag => (
                <button key={tag} className="service-button">
                  <span className="service-button-text">{tag}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── 연락처 ──────────────────────────────────────────── */}
        <div className="contact-section">
          {contactItems.map(({ label, value, href }) => (
            <a
              key={label}
              className="contact-link"
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className="contact-label">{label}</span>
              <span className="contact-value">{value}</span>
              <img
                className="contact-arrow"
                src="/assets/%ED%99%94%EC%82%B4%ED%91%9C%20Icon.svg"
                alt=""
              />
            </a>
          ))}
        </div>

        {/* ── 소개 섹션 ────────────────────────────────────────── */}
        <div className="intro-section">
          <h2 className="intro-heading">병원 컨설팅 전문가 김상연입니다</h2>

          <ul className="intro-list">
            {[
              '18년 이상 임상 경력',
              'CS, 인력, 운영 프로세스 전면 최적화',
              '의원부터 병원까지 다양한 프로젝트 경험',
            ].map(item => (
              <li key={item} className="intro-list-item">{item}</li>
            ))}
          </ul>

          {/* 카카오톡 버튼 */}
          <a
            className="kakao-button"
            href="https://pf.kakao.com/_HStBn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="kakao-icon">
              <img src="/assets/kakao%20Icon%20(2).svg" alt="kakao" width={14} height={14} />
            </div>
            <span className="kakao-button-text">카카오톡 1:1 상담하기</span>
          </a>

          {/* 회사 소개 */}
          <div className="company-description">
            <h2 className="company-heading">
              네스트솔루션,{'\n'}당신의 병원을 든든하게 지킵니다.
            </h2>
            <p className="company-paragraph">
              네스트솔루션은 'High Performance'라는 가치 아래 고객님의 성공적인 병원을 지키기 위해 탄생했습니다.
            </p>
            <p className="company-paragraph">
              18년 임상 경험을 기반으로 원장님의 고민을 '진심으로' 이해합니다.
            </p>
            <p className="company-paragraph">
              획일적 패키지 대신 우리 병원만의 전략을 설계합니다.
            </p>
            <p className="company-paragraph">
              어떤 위험 앞에서도 흔들림 없는 병원 파트너가 되어 든든한 지원을 약속드립니다.
            </p>
          </div>

          {/* 주요 서비스 */}
          <div className="services-section">
            <div className="services-header">
              <div className="services-icon">
                <img src="/assets/check%20Icon.svg" alt="" width={10} height={10} />
              </div>
              <span className="services-title">주요 서비스</span>
            </div>
            <ul className="services-list">
              {[
                '유지보수 서비스: 안정적인 시스템 운영 지원',
                '맞춤형 컨설팅: 병원별 맞춤형 전략 수립',
                '시스템 구축: CS관리, 체계적 시스템 설계 및 구축',
              ].map(s => (
                <li key={s} className="services-list-item">{s}</li>
              ))}
            </ul>
          </div>

          <p className="company-paragraph">
            우리병원에 맞는 병원 솔루션, 전문 컨설턴트에게 상담해 보세요. 언제든 문의 주세요.
          </p>
          <h3 className="company-heading">우리병원에 맞는 솔루션을 찾아드립니다</h3>
        </div>

        {/* ── 비디오 섹션 ─────────────────────────────────────── */}
        <div className="video-section">
          <img src="/assets/Video.png" alt="네스트솔루션 소개" />
        </div>

      </div>
    </div>
  );
}
