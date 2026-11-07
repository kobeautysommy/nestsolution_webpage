import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { BLUE, TEXT, BORDER, DARK, LIGHT, F } from '../utils/colors';
import { SEOHead, SITE_URL } from '../components/SEOHead';
import { fetchPost, postSEO, stripHtml, formatDate, type WpPost } from '../utils/wpBlog';

// 프리렌더 시 글 내용을 HTML에 포함 (브라우저 첫 로드는 hydrate 데이터 재사용)
export function loader({ params, request }: LoaderFunctionArgs): Promise<WpPost | null> {
  return fetchPost(params.slug ?? '', request.signal).catch(() => null);
}

// WP 본문 HTML 기본 타이포그래피
const contentCss = `
.wp-content { font-family: ${F.sans}; color: ${TEXT.onLight}; font-size: 1rem; line-height: 1.9; word-break: keep-all; }
.wp-content > * + * { margin-top: 1.25em; }
.wp-content h2, .wp-content h3, .wp-content h4 { font-family: ${F.serif}; font-weight: 700; line-height: 1.4; margin-top: 2em; }
.wp-content h2 { font-size: 1.5rem; } .wp-content h3 { font-size: 1.25rem; } .wp-content h4 { font-size: 1.1rem; }
.wp-content a { color: ${BLUE._500}; text-decoration: underline; }
.wp-content img, .wp-content video, .wp-content iframe { max-width: 100%; height: auto; border-radius: 8px; }
.wp-content ul, .wp-content ol { padding-left: 1.4em; }
.wp-content ul { list-style: disc; } .wp-content ol { list-style: decimal; }
.wp-content blockquote { border-left: 3px solid ${BLUE._400}; padding-left: 1em; color: ${TEXT.mutedLight}; }
.wp-content figure { margin: 0; } .wp-content figcaption { font-size: 0.8rem; color: ${TEXT.mutedLight}; text-align: center; }
.wp-content table { width: 100%; border-collapse: collapse; } .wp-content td, .wp-content th { border: 1px solid ${BORDER.light}; padding: 0.5em; }
`;

// 글쓴이 박스 — 독자·검색엔진·AI에 전문가(E-E-A-T) 신호, 회사 페이지로 내부 링크
function AuthorBox() {
  return (
    <div style={{
      marginTop: '4rem', display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap',
      background: LIGHT.card, border: `1px solid ${BORDER.light}`, borderRadius: 12, padding: '1.5rem',
    }}>
      <img src="/assets/profile-photo.png" alt="김상연 대표" width={72} height={72} loading="lazy"
        style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
      <div style={{ flex: '1 1 260px', fontFamily: F.sans }}>
        <div style={{ fontSize: '0.75rem', color: BLUE._500, marginBottom: '0.25rem' }}>글쓴이</div>
        <div style={{ fontWeight: 700, color: TEXT.onLight, marginBottom: '0.35rem' }}>김상연 · 네스트솔루션 대표</div>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: TEXT.mutedLight, margin: 0 }}>
          물리치료사 출신으로 17년 이상 병원 현장을 경험했습니다. 병·의원의 CS 관리, 마케팅, 경영 개선, 인력 관리를 현장 실행 방식으로 돕고 있습니다.{' '}
          <Link to="/about" style={{ color: BLUE._500 }}>대표 소개</Link> · <Link to="/cases" style={{ color: BLUE._500 }}>성공 사례</Link>
        </p>
      </div>
    </div>
  );
}

function ConsultCta() {
  return (
    <div style={{
      marginTop: '1.5rem', borderRadius: 12, padding: '2rem 1.5rem', textAlign: 'center',
      background: `linear-gradient(135deg,${BLUE.ctaBg},${BLUE._600})`, fontFamily: F.sans,
    }}>
      <p style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem', margin: '0 0 0.5rem' }}>
        우리 병원에도 적용할 수 있을까요?
      </p>
      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', margin: '0 0 1.5rem' }}>
        병원 상황을 들려주시면 무료로 진단해 드립니다.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/contact" style={{
          background: '#FFFFFF', color: BLUE._500, fontWeight: 700, fontSize: '0.88rem',
          padding: '0.8rem 1.6rem', borderRadius: 8, textDecoration: 'none',
        }}>무료 상담 신청 →</Link>
        <Link to="/services" style={{
          border: '1.5px solid rgba(255,255,255,0.4)', color: '#FFFFFF', fontSize: '0.88rem',
          padding: '0.8rem 1.6rem', borderRadius: 8, textDecoration: 'none',
        }}>서비스 보기</Link>
      </div>
    </div>
  );
}

function BackLink() {
  return (
    <Link to="/blog" style={{ fontFamily: F.sans, fontSize: '0.85rem', color: BLUE._500, textDecoration: 'none' }}>
      ← 블로그 목록
    </Link>
  );
}

export function BlogPost() {
  const post = useLoaderData() as WpPost | null;

  return (
    <div style={{ background: LIGHT.bg0 }}>
      <SEOHead seo={post ? postSEO(post) : {
        title: '글을 찾을 수 없습니다 | 네스트솔루션 블로그',
        description: '요청하신 글을 찾을 수 없습니다.',
        keywords: '',
        canonical: `${SITE_URL}/blog`,
        noindex: true,
      }} />
      <style dangerouslySetInnerHTML={{ __html: contentCss }} />
      <div style={{ background: `linear-gradient(155deg,${DARK.bg1},${DARK.bg0})`, padding: '8rem 5vw 4rem' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <Link to="/blog" style={{ fontFamily: F.sans, fontSize: '0.85rem', color: BLUE._300, textDecoration: 'none' }}>
            ← 블로그
          </Link>
          {post && (
            <>
              <h1 style={{
                fontFamily: F.serif, fontSize: 'clamp(1.6rem,3.5vw,2.6rem)', fontWeight: 700,
                color: TEXT.onDark, lineHeight: 1.35, margin: '1.25rem 0 1rem',
              }}>{stripHtml(post.title)}</h1>
              <time dateTime={post.date} style={{ fontFamily: F.sans, fontSize: '0.85rem', color: TEXT.mutedDark }}>
                {formatDate(post.date)}
              </time>
            </>
          )}
        </div>
      </div>

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '3.5rem 5vw 6rem' }}>
        {post === null && (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <p style={{ fontFamily: F.sans, color: TEXT.mutedLight, marginBottom: '1.5rem' }}>
              글을 찾을 수 없습니다.
            </p>
            <BackLink />
          </div>
        )}
        {post && (
          <>
            {post.image && (
              <img src={post.image} alt="" style={{ width: '100%', borderRadius: 12, marginBottom: '2.5rem', display: 'block' }} />
            )}
            <div className="wp-content" dangerouslySetInnerHTML={{ __html: post.content }} />
            <AuthorBox />
            <ConsultCta />
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: `1px solid ${BORDER.light}` }}>
              <BackLink />
            </div>
          </>
        )}
      </article>
    </div>
  );
}
