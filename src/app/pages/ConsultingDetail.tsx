import { Link, useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { BLUE, TEXT, BORDER, LIGHT, F } from '../utils/colors';
import { PageBanner } from '../components/shared/PageBanner';
import { SecLabel } from '../components/shared/SecLabel';
import { CtaBand } from '../components/shared/CtaBand';
import { FaqAccordion } from '../components/shared/FaqAccordion';
import { SPECIALTIES, SPECIALTY_BY_SLUG, specialtyForTitle, type Specialty } from '../data/specialties';
import { fetchPosts, stripHtml, formatDate } from '../utils/wpBlog';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface RelatedPost { slug: string; title: string; date: string }

// 관련 블로그 글 — 진료과 키워드가 제목에 들어간 글, 없으면 특정 진료과 전용이 아닌 공통 주제 글
export async function loader({ params, request }: LoaderFunctionArgs) {
  const s = SPECIALTY_BY_SLUG[params.slug ?? ''];
  if (!s) return null;
  const posts = (await fetchPosts(request.signal).catch(() => []))
    .map((p): RelatedPost => ({ slug: p.slug, title: stripHtml(p.title), date: p.date }));
  const matched = posts.filter((p) => s.postKeywords.some((k) => p.title.includes(k)));
  const general = posts.filter((p) => !specialtyForTitle(p.title));
  return { slug: s.slug, related: (matched.length ? matched : general).slice(0, 4), matched: matched.length > 0 };
}

const section = (bg: string) => ({ background: bg, padding: '5rem 5vw' });
const inner = { maxWidth: 1080, margin: '0 auto' };
const h2 = { fontFamily: F.serif, fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, color: TEXT.onLight, lineHeight: 1.4, marginBottom: '2rem' } as const;
const card = { background: LIGHT.card, border: `1px solid ${BORDER.light}`, borderRadius: 12, padding: '1.5rem' } as const;
const grid = { display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))' } as const;

export function ConsultingDetail() {
  const data = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  useScrollAnimation(); // CtaBand의 .fu 요소 표시
  if (!data) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontFamily: F.sans }}>
        <p style={{ color: TEXT.mutedLight }}>페이지를 찾을 수 없습니다.</p>
        <Link to="/consulting" style={{ color: BLUE._500 }}>진료과별 컨설팅 보기</Link>
      </div>
    );
  }
  const { slug, related, matched } = data;
  const s: Specialty = SPECIALTY_BY_SLUG[slug];
  const others = SPECIALTIES.filter((o) => o.slug !== slug);

  return (
    <div style={{ background: LIGHT.bg0 }}>
      <PageBanner
        label={`${s.name} Consulting`}
        title={<>{s.name}<br /><span className="text-grad">컨설팅</span></>}
        desc={s.headline}
      />

      <section style={section(LIGHT.bg0)}>
        <div style={{ ...inner, maxWidth: 760 }}>
          <p className="speakable" style={{ fontFamily: F.sans, fontSize: '1rem', lineHeight: 1.9, color: TEXT.onLight, margin: 0 }}>{s.intro}</p>
        </div>
      </section>

      <section style={section(LIGHT.bg1)}>
        <div style={inner}>
          <SecLabel>Challenges</SecLabel>
          <h2 style={h2}>{s.name} 원장님들이 자주 겪는 경영 과제</h2>
          <div style={grid}>
            {s.challenges.map((c) => (
              <div key={c.t} style={card}>
                <h3 style={{ fontFamily: F.sans, fontSize: '1rem', fontWeight: 700, color: TEXT.onLight, margin: '0 0 0.5rem' }}>{c.t}</h3>
                <p style={{ fontFamily: F.sans, fontSize: '0.88rem', lineHeight: 1.75, color: TEXT.mutedLight, margin: 0 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={section(LIGHT.bg0)}>
        <div style={inner}>
          <SecLabel>How We Help</SecLabel>
          <h2 style={h2}>네스트솔루션의 {s.name} 컨설팅</h2>
          <div style={grid}>
            {s.solutions.map((x) => (
              <div key={x.t} style={{ ...card, borderTop: `3px solid ${BLUE._500}` }}>
                <div style={{ fontFamily: F.sans, fontSize: '0.75rem', color: BLUE._500, fontWeight: 700, marginBottom: '0.4rem' }}>{x.area}</div>
                <h3 style={{ fontFamily: F.sans, fontSize: '1rem', fontWeight: 700, color: TEXT.onLight, margin: '0 0 0.5rem' }}>{x.t}</h3>
                <p style={{ fontFamily: F.sans, fontSize: '0.88rem', lineHeight: 1.75, color: TEXT.mutedLight, margin: 0 }}>{x.d}</p>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: F.sans, fontSize: '0.88rem', color: TEXT.mutedLight, marginTop: '1.5rem' }}>
            진행 순서: 무료 상담 → 현장 진단 → 전략 수립 → 실행 → 성과 측정.{' '}
            <Link to="/process" style={{ color: BLUE._500, textDecoration: 'underline' }}>컨설팅 과정 자세히 보기</Link>
          </p>
        </div>
      </section>

      {s.cases && (
        <section style={section(LIGHT.bg1)}>
          <div style={inner}>
            <SecLabel>Results</SecLabel>
            <h2 style={h2}>{s.name} 실제 컨설팅 성과</h2>
            <div style={grid}>
              {s.cases.map((c) => (
                <div key={c.label} style={card}>
                  <h3 style={{ fontFamily: F.sans, fontSize: '0.95rem', fontWeight: 700, color: TEXT.onLight, margin: '0 0 0.9rem' }}>{c.label}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.4rem' }}>
                    {c.stats.map((st) => (
                      <li key={st} style={{ fontFamily: F.sans, fontSize: '0.92rem', color: BLUE._500, fontWeight: 700 }}>{st}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p style={{ fontFamily: F.sans, fontSize: '0.88rem', marginTop: '1.5rem' }}>
              <Link to="/cases" style={{ color: BLUE._500, textDecoration: 'underline' }}>전체 성공 사례 보기</Link>
            </p>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section style={section(s.cases ? LIGHT.bg0 : LIGHT.bg1)}>
          <div style={inner}>
            <SecLabel>Insights</SecLabel>
            <h2 style={h2}>{matched ? `${s.name} 경영 칼럼` : '병원 경영 칼럼'}</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.75rem' }}>
              {related.map((p) => (
                <li key={p.slug}>
                  <Link to={`/blog/${p.slug}`} style={{ ...card, display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', textDecoration: 'none', padding: '1.1rem 1.5rem' }}>
                    <span style={{ fontFamily: F.sans, fontWeight: 700, color: TEXT.onLight, fontSize: '0.95rem' }}>{p.title}</span>
                    <time dateTime={p.date} style={{ fontFamily: F.sans, fontSize: '0.8rem', color: TEXT.mutedLight }}>{formatDate(p.date)}</time>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section style={section(LIGHT.bg0)}>
        <div style={{ ...inner, maxWidth: 760 }}>
          <div style={{ textAlign: 'center' }}>
            <SecLabel center>FAQ</SecLabel>
            <h2 style={h2}>{s.name} 컨설팅 자주 묻는 질문</h2>
          </div>
          <FaqAccordion items={s.faq} />
        </div>
      </section>

      <section style={section(LIGHT.bg1)}>
        <div style={inner}>
          <h2 style={{ ...h2, fontSize: '1.1rem', marginBottom: '1rem' }}>다른 진료과 컨설팅</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {others.map((o) => (
              <Link key={o.slug} to={`/consulting/${o.slug}`} style={{
                fontFamily: F.sans, fontSize: '0.85rem', color: BLUE._500, textDecoration: 'none',
                border: `1px solid ${BORDER.light}`, borderRadius: 999, padding: '0.45rem 1rem', background: LIGHT.card,
              }}>{o.name} 컨설팅</Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title={`${s.name} 경영, 무엇부터 바꿔야 할까요?`}
        desc="병원 상황을 들려주시면 무료로 진단해 드립니다."
        secondaryCta={{ label: '서비스 보기', to: '/services' }}
        bgImage="/assets/cta-bg.webp"
      />
    </div>
  );
}
