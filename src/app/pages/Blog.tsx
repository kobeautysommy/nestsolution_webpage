import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { BLUE, TEXT, BORDER, LIGHT, F } from '../utils/colors';
import { PageBanner } from '../components/shared/PageBanner';
import { fetchPosts, stripHtml, formatDate, type WpPost } from '../utils/wpBlog';

function ComingSoon() {
  return (
    <div style={{
      maxWidth: 640, margin: '0 auto', textAlign: 'center',
      background: LIGHT.card, border: `1px solid ${BORDER.light}`,
      borderRadius: 16, padding: 'clamp(2.5rem,6vw,4rem) clamp(1.5rem,5vw,3rem)',
    }}>
      <div style={{
        fontFamily: F.bebas, fontSize: '1rem', letterSpacing: '0.2em',
        color: BLUE._500, marginBottom: '1rem',
      }}>COMING SOON</div>
      <h2 style={{
        fontFamily: F.serif, fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700,
        color: TEXT.onLight, marginBottom: '1rem', lineHeight: 1.4,
      }}>아직 게시된 글이 없습니다</h2>
      <p style={{
        fontFamily: F.sans, fontSize: '0.95rem', lineHeight: 1.8,
        color: TEXT.mutedLight, marginBottom: '2.5rem',
      }}>
        유익한 콘텐츠를 준비하고 있습니다. 곧 찾아뵙겠습니다.<br />
        그동안 궁금하신 점은 무료 상담으로 문의해 주세요.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/contact" style={{
          background: `linear-gradient(135deg, ${BLUE._500}, ${BLUE._400})`,
          color: '#FFFFFF', fontWeight: 700, fontFamily: F.sans, fontSize: '0.9rem',
          padding: '0.85rem 1.75rem', borderRadius: 8, textDecoration: 'none',
        }}>무료 상담 신청</Link>
        <Link to="/" style={{
          color: BLUE._500, fontWeight: 700, fontFamily: F.sans, fontSize: '0.9rem',
          padding: '0.85rem 1.75rem', borderRadius: 8, textDecoration: 'none',
          border: `1px solid ${BORDER.light}`,
        }}>홈으로</Link>
      </div>
    </div>
  );
}

function PostCard({ post }: { post: WpPost }) {
  return (
    <Link to={`/blog/${post.slug}`} style={{
      display: 'flex', flexDirection: 'column', textDecoration: 'none',
      background: LIGHT.card, border: `1px solid ${BORDER.light}`,
      borderRadius: 12, overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(37,99,235,0.12)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ aspectRatio: '16 / 9', background: LIGHT.bg1, overflow: 'hidden' }}>
        {post.image && (
          <img src={post.image} alt="" loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        )}
      </div>
      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
        <time dateTime={post.date} style={{ fontFamily: F.sans, fontSize: '0.78rem', color: BLUE._500 }}>
          {formatDate(post.date)}
        </time>
        <h2 style={{
          fontFamily: F.serif, fontSize: '1.15rem', fontWeight: 700,
          color: TEXT.onLight, lineHeight: 1.45, margin: 0,
        }}>{stripHtml(post.title)}</h2>
        <p style={{
          fontFamily: F.sans, fontSize: '0.88rem', lineHeight: 1.7, color: TEXT.mutedLight, margin: 0,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>{stripHtml(post.excerpt)}</p>
      </div>
    </Link>
  );
}

export function Blog() {
  const [posts, setPosts] = useState<WpPost[] | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchPosts(ctrl.signal)
      .then(setPosts)
      .catch(() => { if (!ctrl.signal.aborted) setPosts([]); });
    return () => ctrl.abort();
  }, []);

  return (
    <div>
      <PageBanner
        label="Blog"
        title={<>네스트솔루션<br /><span className="text-grad">블로그</span></>}
        desc="병원 경영·마케팅·CS 현장의 인사이트를 전해드립니다."
      />

      <section style={{ background: LIGHT.bg1, padding: '6rem 5vw', minHeight: '40vh' }}>
        {posts === null ? (
          <p style={{ textAlign: 'center', fontFamily: F.sans, color: TEXT.mutedLight }}>불러오는 중…</p>
        ) : posts.length === 0 ? (
          <ComingSoon />
        ) : (
          <div style={{
            maxWidth: 1280, margin: '0 auto', display: 'grid', gap: '1.5rem',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
          }}>
            {posts.map(p => <PostCard key={p.id} post={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}
