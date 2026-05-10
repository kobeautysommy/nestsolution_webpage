import React from 'react';
import { BLUE, TEXT, BORDER, F } from '../utils/colors';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const contactItems = [
  { label: '휴대전화', value: '010-3129-8248',                    href: 'tel:010-3129-8248' },
  { label: '이메일',   value: 'nestsadvice@gmail.com',            href: 'mailto:nestsadvice@gmail.com' },
  { label: '홈페이지', value: 'nestsolution.co.kr',               href: 'https://nestsolution.co.kr' },
  { label: '주소',     value: '서울특별시 서초구 서운로 13 지하1층', href: 'https://map.naver.com/p/search/%EB%84%A4%EC%8A%A4%ED%8A%B8%EC%86%94%EB%A3%A8%EC%85%98/place/2033624447?placePath=%3Fbk_query%3D%25EB%2584%25A4%25EC%258A%25A4%25ED%258A%25B8%25EC%2586%2594%25EB%25A3%25A8%25EC%2585%2598%26entry%3Dpll%26from%3Dnx%26fromNxList%3Dtrue&placeSearchOption=bk_query%3D%25EB%2584%25A4%25EC%258A%25A4%25ED%258A%25B8%25EC%2586%2594%25EB%25A3%25A8%25EC%2585%2598%26entry%3Dpll%26fromNxList%3Dtrue%26originalQuery%3D%25EB%2584%25A4%25EC%258A%25A4%25ED%258A%25B8%25EC%2586%2594%25EB%25A3%25A8%25EC%2585%2598%26x%3D%26y%3D&searchType=place' },
];

const bullets = [
  '18년 이상 임상 경력',
  'CS, 인력, 운영 프로세스 전면 최적화',
  '의원부터 병원까지 다양한 프로젝트 경험',
];

const mainServices = [
  '유지보수 서비스: 안정적인 시스템 운영 지원',
  '맞춤형 컨설팅: 병원별 맞춤형 전략 수립',
  '시스템 구축: CS관리, 체계적 시스템 설계 및 구축',
];

const serviceRows = [
  { tag: 'CS 관리',   tagColor: '#2563EB', line1: '환자 동선 설계부터',     line2: '직원 CS 시스템 구축까지' },
  { tag: '마케팅',    tagColor: '#0E7490', line1: '네이버 부터 SNS까지',     line2: '병원 아이덴티티 구축!' },
  { tag: '경영 개선', tagColor: '#B45309', line1: '행정 청구 시스템 부터',   line2: '수익 구조 분석 개선 ok!' },
  { tag: '인력 관리', tagColor: '#6D28D9', line1: '매뉴얼부터 채용전략',     line2: '조직동기부여까지!' },
];

export function Profile() {
  useScrollAnimation();

  return (
    <div style={{ background: '#fff', maxWidth: 540, margin: '0 auto' }}>

      {/* ── 프로필 카드 ─────────────────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        background: 'linear-gradient(130deg, #B8CCE4 0%, #8AAEC8 45%, #5C7FA8 80%, #3D6090 100%)',
        padding: '2rem 1.5rem 1rem',
        overflow: 'hidden',
        minHeight: 230,
      }}>
        {/* 프로필 사진 */}
        <img
          src="/assets/Image%20(Profile).png"
          alt="김상연 대표"
          style={{
            position: 'absolute',
            right: 0, bottom: 0,
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            maskImage: 'linear-gradient(to left, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, black 50%, transparent 100%)',
          }}
        />

        {/* Nests 로고 */}
        <img
          src="/assets/%EB%84%A4%EC%8A%A4%ED%8A%B8%20%EB%A1%9C%EA%B3%A0%201.png"
          alt="Nests"
          style={{
            position: 'absolute', top: '1rem', right: '1.5rem',
            height: 28, opacity: 0.9,
          }}
        />

        {/* 이름 · 타이틀 */}
        <div style={{ position: 'relative', zIndex: 1, paddingBottom: '1.2rem' }}>
          <div style={{ fontFamily: F.serif, fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: '0.2rem' }}>
            김상연
          </div>
          <div style={{ fontFamily: F.sans, fontSize: '0.82rem', color: 'rgba(255,255,255,0.92)', lineHeight: 1.6 }}>
            17년 임상 경력
          </div>
          <div style={{ fontFamily: F.sans, fontSize: '0.82rem', color: 'rgba(255,255,255,0.92)', marginBottom: '1.4rem' }}>
            네스트솔루션
          </div>

          {/* 서비스 태그 */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {['CS 관리', '마케팅', '경영 개선', '인력 관리'].map(tag => (
              <span key={tag} style={{
                fontFamily: F.sans, fontSize: '0.72rem', fontWeight: 600,
                background: 'rgba(255,255,255,0.92)', color: '#1e3a6e',
                padding: '0.28rem 0.85rem', borderRadius: '20px',
                whiteSpace: 'nowrap',
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 연락처 목록 ─────────────────────────────────────────────────── */}
      <div style={{ background: '#fff' }}>
        {contactItems.map(({ label, value, href }) => {
          const inner = (
            <>
              <span style={{
                fontFamily: F.sans, fontSize: '0.82rem',
                color: TEXT.mutedLight, minWidth: 60, flexShrink: 0,
              }}>{label}</span>
              <span style={{
                fontFamily: F.sans, fontSize: '0.82rem',
                color: TEXT.onLight, flex: 1, textAlign: 'right', marginRight: '0.5rem',
              }}>{value}</span>
              <img
                src="/assets/%ED%99%94%EC%82%B4%ED%91%9C%20Icon.svg"
                alt=""
                style={{ width: 14, height: 14, flexShrink: 0, opacity: 0.5 }}
              />
            </>
          );
          const rowStyle: React.CSSProperties = {
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0.95rem 1.5rem',
            borderBottom: `1px solid ${BORDER.light}`,
            textDecoration: 'none',
          };
          return href ? (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={rowStyle}>
              {inner}
            </a>
          ) : (
            <div key={label} style={rowStyle}>{inner}</div>
          );
        })}
      </div>

      {/* ── 소개 · 카카오 버튼 ───────────────────────────────────────────── */}
      <div style={{ padding: '2rem 1.5rem', background: '#fff' }}>
        <h2 style={{
          fontFamily: F.serif, fontSize: '1.25rem', fontWeight: 700,
          color: TEXT.onLight, marginBottom: '1.1rem', lineHeight: 1.4,
        }}>
          병원 컨설팅 전문가 김상연입니다
        </h2>

        <ul style={{ padding: 0, margin: '0 0 1.6rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
          {bullets.map(b => (
            <li key={b} style={{
              display: 'flex', gap: '0.6rem',
              fontFamily: F.sans, fontSize: '0.88rem', color: TEXT.mutedLight, lineHeight: 1.6,
            }}>
              <span style={{ color: TEXT.onLight, flexShrink: 0 }}>•</span>
              {b}
            </li>
          ))}
        </ul>

        {/* 카카오 버튼 */}
        <a
          href="https://pf.kakao.com/_HStBn"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
            background: '#FEE500', color: '#3C1E1E',
            padding: '0.9rem 1rem', borderRadius: '8px',
            fontFamily: F.sans, fontWeight: 700, fontSize: '0.95rem',
            textDecoration: 'none', width: '100%', boxSizing: 'border-box',
          }}
        >
          <img
            src="/assets/kakao%20Icon%20(2).svg"
            alt="kakao"
            style={{ width: 24, height: 24 }}
          />
          카카오톡 1:1 상담하기
        </a>
      </div>

      {/* ── 네스트솔루션 소개 ────────────────────────────────────────────── */}
      <div style={{ padding: '2rem 1.5rem 2.5rem', background: '#fff', borderTop: `1px solid ${BORDER.light}` }}>
        <h2 style={{
          fontFamily: F.serif, fontSize: '1.25rem', fontWeight: 700,
          color: TEXT.onLight, marginBottom: '1rem', lineHeight: 1.5,
        }}>
          네스트솔루션,<br />당신의 병원을 든든하게 지킵니다.
        </h2>

        <p style={{ fontFamily: F.sans, fontSize: '0.87rem', color: TEXT.mutedLight, lineHeight: 1.85, marginBottom: '0.6rem' }}>
          네스트솔루션은 'High Performance'라는 가치 아래 고객님의 성공적인 병원을 지키기 위해 탄생했습니다.
        </p>
        <p style={{ fontFamily: F.sans, fontSize: '0.87rem', color: TEXT.mutedLight, lineHeight: 1.85, marginBottom: '0.6rem' }}>
          18년 임상 경험을 기반으로 원장님의 고민을 '진심으로' 이해합니다.
        </p>
        <p style={{ fontFamily: F.sans, fontSize: '0.87rem', color: TEXT.mutedLight, lineHeight: 1.85, marginBottom: '0.6rem' }}>
          획일적 패키지 대신 우리 병원만의 전략을 설계합니다.
        </p>
        <p style={{ fontFamily: F.sans, fontSize: '0.87rem', color: TEXT.mutedLight, lineHeight: 1.85, marginBottom: '1.5rem' }}>
          어떤 위험 앞에서도 흔들림 없는<br />병원 파트너가 되어 든든한 지원을 약속드립니다.
        </p>

        {/* 주요 서비스 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
          <img
            src="/assets/check%20Icon.svg"
            alt="check"
            style={{ width: 22, height: 22 }}
          />
          <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: '0.9rem', color: TEXT.onLight }}>
            주요 서비스
          </span>
        </div>

        <ul style={{ padding: 0, margin: '0 0 1.8rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {mainServices.map(s => (
            <li key={s} style={{
              display: 'flex', gap: '0.6rem',
              fontFamily: F.sans, fontSize: '0.85rem', color: TEXT.mutedLight, lineHeight: 1.65,
            }}>
              <span style={{ color: TEXT.onLight, flexShrink: 0 }}>•</span>
              {s}
            </li>
          ))}
        </ul>

        <p style={{ fontFamily: F.sans, fontSize: '0.87rem', color: TEXT.mutedLight, lineHeight: 1.85, marginBottom: '0.5rem' }}>
          우리병원에 맞는 병원 솔루션, 전문 컨설턴트에게 상담해 보세요. 언제든 문의 주세요.
        </p>
        <h3 style={{
          fontFamily: F.serif, fontSize: '1.1rem', fontWeight: 700,
          color: TEXT.onLight, marginTop: '0.4rem',
        }}>
          우리병원에 맞는 솔루션을 찾아드립니다
        </h3>
      </div>

      {/* ── NEST SOLUTION 배너 ──────────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(160deg, #060E1A 0%, #0B1D3A 50%, #060E1A 100%)',
        padding: '2.5rem 1.5rem 3rem',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            fontFamily: F.bebas,
            fontSize: '2.2rem', letterSpacing: '0.18em',
            color: BLUE._400, marginBottom: '0.4rem',
          }}>
            NEST SOLUTION
          </div>
          <div style={{
            fontFamily: F.serif, fontSize: '1.2rem', fontWeight: 700,
            color: '#fff',
          }}>
            우리 병원에 맞는 솔루션은?
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          {serviceRows.map(({ tag, tagColor, line1, line2 }) => (
            <div key={tag} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{
                fontFamily: F.sans, fontSize: '0.68rem', fontWeight: 700,
                color: tagColor, border: `1.5px solid ${tagColor}`,
                padding: '0.22rem 0.6rem', borderRadius: '4px',
                whiteSpace: 'nowrap', minWidth: 54, textAlign: 'center',
                flexShrink: 0,
              }}>{tag}</span>
              <div>
                <div style={{ fontFamily: F.sans, fontSize: '0.9rem', fontWeight: 700, color: '#fff', lineHeight: 1.45 }}>
                  {line1}
                </div>
                <div style={{ fontFamily: F.sans, fontSize: '0.87rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.45 }}>
                  {line2}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
