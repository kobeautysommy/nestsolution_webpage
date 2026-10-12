import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { BLUE, TEXT, BORDER, DARK, LIGHT, F } from '../utils/colors';
import { fetchPost, stripHtml, formatDate, type WpPost } from '../utils/wpBlog';

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

function BackLink() {
  return (
    <Link to="/blog" style={{ fontFamily: F.sans, fontSize: '0.85rem', color: BLUE._500, textDecoration: 'none' }}>
      ← 블로그 목록
    </Link>
  );
}

export function BlogPost() {
  const { slug = '' } = useParams();
  const [post, setPost] = useState<WpPost | null | undefined>(undefined);

  useEffect(() => {
    const ctrl = new AbortController();
    setPost(undefined);
    fetchPost(slug, ctrl.signal)
      .then(setPost)
      .catch(() => { if (!ctrl.signal.aborted) setPost(null); });
    return () => ctrl.abort();
  }, [slug]);

  useEffect(() => {
    if (post) document.title = `${stripHtml(post.title)} | 네스트솔루션 블로그`;
  }, [post]);

  return (
    <div style={{ background: LIGHT.bg0 }}>
      <style>{contentCss}</style>
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
        {post === undefined && (
          <p style={{ fontFamily: F.sans, color: TEXT.mutedLight }}>불러오는 중…</p>
        )}
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
            <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: `1px solid ${BORDER.light}` }}>
              <BackLink />
            </div>
          </>
        )}
      </article>
    </div>
  );
}
