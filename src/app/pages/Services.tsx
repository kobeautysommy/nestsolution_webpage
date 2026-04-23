import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { BLUE, TEXT, BORDER, DARK, LIGHT, F, accentGrad } from '../utils/colors';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { ServiceShowcase } from '../components/ServiceShowcase';

const BtnPrimary = ({ children, to }: { children: React.ReactNode; to: string }) => (
  <Link to={to} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: `linear-gradient(135deg,${BLUE._500},${BLUE._400})`, color: '#fff', padding: '0.85rem 2rem', fontWeight: 700, fontSize: '0.87rem', textDecoration: 'none', fontFamily: F.sans, borderRadius: '4px', boxShadow: '0 4px 18px rgba(37,99,235,0.35)' }}>{children}</Link>
);
const SecLabel = ({ children, center }: { children: string; center?: boolean }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '0.9rem', justifyContent: center ? 'center' : undefined }}>
    <span style={{ width: 20, height: 1, background: BLUE._500, display: 'inline-block' }} />{children}
  </div>
);

const serviceFaqItems = [
  { q: '여러 서비스를 동시에 받을 수 있나요?', a: '가능합니다. CS 관리, 마케팅, 경영 개선, 인력 관리는 통합 패키지로 제공되며, 우선순위에 따라 단계적으로 또는 동시에 진행할 수 있습니다.' },
  { q: '병원 마케팅은 어떤 채널 중심으로 하나요?', a: '네이버 플레이스 최적화, 블로그 SEO, 네이버 파워링크 광고, 인스타그램 콘텐츠를 중심으로 진행합니다. 각 병원의 지역·진료과목에 맞춰 채널을 선택합니다.' },
  { q: 'CS 교육은 어떤 방식으로 진행되나요?', a: '현장 암행 진단 → 맞춤 매뉴얼 제작 → 롤플레이 기반 직원 교육(월 2~4회) → 지속 모니터링 순으로 진행됩니다. 단순 강의가 아닌 실전 체화 방식입니다.' },
  { q: '인력 관리 컨설팅에서 채용도 도와주나요?', a: '채용 기준 수립과 면접 프로세스 설계까지 지원합니다. 채용 후 온보딩·직무 교육 전 과정을 함께하며, 조직 문화 구축까지 지원합니다.' },
];

function ServiceFaqAccordion({ items }: { items: typeof serviceFaqItems }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <dl style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
      {items.map((item, i) => (
        <div key={i} style={{ background: '#FFFFFF', border: `1px solid ${open === i ? BLUE._500 : BORDER.light}`, borderRadius: '8px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
          <dt>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.2rem 1.5rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}
            >
              <span style={{ fontFamily: F.sans, fontWeight: 700, fontSize: '0.92rem', color: TEXT.onLight, lineHeight: 1.4 }}>{item.q}</span>
              <span style={{ color: BLUE._500, fontSize: '1.1rem', flexShrink: 0, transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.25s', display: 'inline-block' }}>+</span>
            </button>
          </dt>
          <dd style={{ margin: 0, maxHeight: open === i ? '10rem' : 0, overflow: 'hidden', transition: 'max-height 0.3s ease' }}>
            <p style={{ fontFamily: F.sans, fontSize: '0.87rem', color: TEXT.mutedLight, lineHeight: 1.8, padding: '0 1.5rem 1.3rem', margin: 0 }}>{item.a}</p>
          </dd>
        </div>
      ))}
    </dl>
  );
}

const services = [
  {
    id: 'cs', label: 'CS 관리', secLabel: 'Service 01',
    title: '환자가 다시 찾는 병원을\n만드는 CS 관리',
    sub: '"첫 방문이 마지막이 되지 않도록"',
    desc: '단순한 친절 교육이 아닙니다. 환자가 문을 열고 들어오는 순간부터 나가는 순간까지, 모든 경험을 전략적으로 설계합니다. 17년 임상 경험으로 축적된 실제 환자 심리와 행동 패턴 기반으로 재방문율과 입소문을 동시에 높입니다.',
    details: [
      { icon: '', t: '환자 동선 완전 재설계', d: '접수→대기→진료→수납까지 모든 접점에서 불편함을 제거하고 감동 포인트를 심습니다.' },
      { icon: '', t: '직원 CS 교육\n시스템 구축', d: '일회성 교육이 아닌 지속 가능한 CS 문화를 만드는 체계적 커리큘럼. 롤플레이 기반 실전 교육.' },
      { icon: '', t: '전화 응대 &\n민원 처리 매뉴얼', d: '첫 전화부터 예약까지, 민원 상황 응대 매뉴얼을 실전 연습으로 완성합니다.' },
      { icon: '', t: '온라인 리뷰 관리 전략', d: '네이버·구글 리뷰 관리 전략으로 신규 환자의 선택 기준이 되는 평판을 쌓습니다.' },
    ],
    steps: [
      { n: '01', t: '현장 암행 진단', d: '실제 환자처럼 방문해 CS 현황을 객관적으로 분석합니다' },
      { n: '02', t: 'CS 매뉴얼 제작', d: '병원 특성에 맞는 상황별 응대 표준 매뉴얼을 제작합니다' },
      { n: '03', t: '직원 교육 실행', d: '롤플레이 기반 실전 교육 + 피드백으로 체화시킵니다' },
      { n: '04', t: '월별 모니터링', d: '리뷰, 재방문율, 직원 응대 품질을 지속 관리합니다' },
    ],
    results: [{ v: '↑40%', l: '재방문율 향상' }, { v: '4.8★', l: '평균 리뷰 점수' }, { v: '↓80%', l: '민원 감소' }, { v: '↑35%', l: '추천 비율' }],
  },
  {
    id: 'mkt', label: '마케팅', secLabel: 'Service 02',
    title: '환자가 스스로 찾아오는\n병원 마케팅 전략',
    sub: '"돈만 쓰는 광고는 그만, 효과로 말하는 마케팅"',
    desc: '무작정 광고비만 늘리는 방식과 다릅니다. 우리 병원의 강점을 정확히 파악하고, 우리 환자가 있는 채널에 집중합니다. 온·오프라인을 통합한 브랜드 마케팅으로 신환 유입과 재방문을 동시에 올립니다.',
    details: [
      { icon: '', t: '네이버 지역 검색 최적화', d: '네이버 플레이스·블로그 SEO 전략으로 우리 지역 환자 검색 상위 노출을 목표합니다.' },
      { icon: '', t: 'SNS & 콘텐츠 마케팅', d: '인스타그램·유튜브를 활용한 신뢰 기반 콘텐츠로 자연스러운 환자 유입을 만듭니다.' },
      { icon: '', t: '퍼포먼스 광고 운영', d: '네이버 파워링크·카카오 광고 전환율 중심으로 운영해 광고비 대비 효율을 극대화합니다.' },
      { icon: '', t: '병원 브랜드\n아이덴티티 구축', d: '경쟁 병원과 차별화되는 우리 병원만의 브랜드 스토리와 이미지를 구축합니다.' },
    ],
    steps: [
      { n: '01', t: '채널 효율 진단', d: '현재 마케팅 채널 효과 분석 및 낭비 요소 파악' },
      { n: '02', t: '브랜드 포지셔닝', d: '우리 병원의 핵심 경쟁력 정의 및 핵심 메시지 개발' },
      { n: '03', t: '채널별 전략 실행', d: '온·오프라인 통합 마케팅 순차 런칭' },
      { n: '04', t: '성과 측정 & 최적화', d: '월별 KPI 리포트 및 전략 고도화' },
    ],
    results: [{ v: '3배↑', l: '온라인 노출' }, { v: '↑60%', l: '신환 유입' }, { v: '↓30%', l: '광고 단가' }, { v: '2배↑', l: '리뷰 유입' }],
  },
  {
    id: 'mgmt', label: '경영 개선', secLabel: 'Service 03',
    title: '수익은 높이고\n비용은 낮추는 경영 개선',
    sub: '"진료만 잘해서는 부족합니다. 경영도 전략입니다"',
    desc: '의료기관의 수익 구조는 복잡합니다. 청구 누락, 비효율적 운영 동선, 과도한 고정비. 네스트솔루션은 17년 현장 경험으로 병원 경영의 숨은 빈틈을 찾아 실질적인 수익 개선을 만들어냅니다.',
    details: [
      { icon: '', t: '숨은 진료비 발굴', d: '청구 누락·미청구 항목 분석으로 기존 진료만으로도 수익을 높이는 방법을 찾습니다.' },
      { icon: '', t: '운영 동선 최적화', d: '환자 흐름과 직원 동선을 재설계해 대기시간을 줄이고 처리량을 극대화합니다.' },
      { icon: '', t: '행정·청구 시스템 구축', d: '별도 청구 직원 없이도 운영 가능한 체계적 행정 시스템을 설계합니다.' },
      { icon: '', t: '수익 구조 분석 & 개선', d: '매출·비용 구조 전반을 분석해 지속 가능한 수익성 향상 전략을 수립합니다.' },
    ],
    steps: [
      { n: '01', t: '수익 구조 전면 진단', d: '매출·비용·청구 데이터 심층 분석' },
      { n: '02', t: '개선 항목 우선순위 도출', d: '빠른 효과 vs 장기 효과 항목 분리' },
      { n: '03', t: '시스템 재구축', d: '행정·청구·운영 시스템 최적화 실행' },
      { n: '04', t: '정기 경영 리포트', d: '월별 KPI 지표 모니터링 및 전략 조정' },
    ],
    results: [{ v: '↑25%', l: '평균 수익' }, { v: '↓20%', l: '운영비 절감' }, { v: '↑90%', l: '청구 정확도' }, { v: '↓40%', l: '행정 업무량' }],
  },
  {
    id: 'hr', label: '인력 관리', secLabel: 'Service 04',
    title: '이직률은 낮추고\n팀 퀄리티는 높이는 인력 관리',
    sub: '"좋은 팀이 좋은 병원을 만듭니다"',
    desc: '물리치료사, 간호조무사, 행정직 — 의원급에서 실제로 필요한 인력을 직접 교육하고 관리합니다. 17년 임상 경험으로 의료 현장의 특수성을 정확히 이해하고, 채용부터 조직 문화 구축까지 전 과정을 지원합니다.',
    details: [
      { icon: '', t: '채용 전략 & 인재 선별', d: '우리 병원 문화에 맞는 인재를 선별하는 기준과 면접 프로세스를 설계합니다.' },
      { icon: '', t: '직무별 교육 커리큘럼', d: '물리치료사·간호조무사·행정직 각각의 직무에 맞는 맞춤 교육 프로그램을 제공합니다.' },
      { icon: '', t: '조직 문화 &\n동기부여 설계', d: '직원이 오래 머물고 싶은 병원 조직 문화를 설계하고 동기부여 시스템을 구축합니다.' },
      { icon: '', t: '인력 운영 매뉴얼 (SOP)', d: '원장님 없이도 돌아가는 표준 운영 절차서와 인력 관리 매뉴얼을 제작합니다.' },
    ],
    steps: [
      { n: '01', t: '인력 현황 진단', d: '직원 역량·이직 원인·조직 문화 분석' },
      { n: '02', t: '채용 & 온보딩 설계', d: '채용 기준·면접 프로세스·신입 적응 프로그램' },
      { n: '03', t: '직무 교육 실행', d: '직무별 맞춤 교육 + 멘토링 시스템 운영' },
      { n: '04', t: '성과 관리 & 동기부여', d: 'KPI 기반 평가 시스템 및 인센티브 설계' },
    ],
    results: [{ v: '↓65%', l: '이직률 감소' }, { v: '↑85%', l: '직원 만족도' }, { v: '↓50%', l: '채용 시간' }, { v: '↑45%', l: '서비스 품질' }],
  },
];

export function Services() {
  const [active, setActive] = useState('cs');
  useScrollAnimation();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const svc = services.find(s => s.id === active)!;

  return (
    <div style={{ background: LIGHT.bg0 }}>
      {/* Banner */}
      <div style={{ padding: '9rem 5vw 5rem', position: 'relative', overflow: 'hidden', background: `linear-gradient(155deg,${DARK.bg1},${DARK.bg0})`, borderBottom: `1px solid ${BORDER.bw}` }}>
        <div style={{ position: 'absolute', inset: '-50%', backgroundImage: `linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)`, backgroundSize: '70px 70px', animation: 'gMove 28s linear infinite' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
          <SecLabel>Core Services</SecLabel>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: '1rem', color: TEXT.onDark }}>
            네스트솔루션의<br /><span className="text-grad">핵심 서비스</span>
          </h1>
          <p style={{ color: TEXT.mutedDark, fontSize: '0.95rem', lineHeight: 1.8, maxWidth: 560, fontFamily: F.sans }}>CS 관리부터 마케팅, 경영 개선, 인력 관리까지 — 병·의원 운영의 모든 영역을 커버하는 종합 솔루션으로 실질적인 성과를 만들어냅니다.</p>
        </div>
      </div>

      {/* Tabs + Content */}
      <section style={{ padding: '6rem 5vw', background: LIGHT.bg0 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          {/* Tab bar */}
          <div className="fu" style={{ display: 'flex', gap: 0, borderBottom: `2px solid ${BORDER.light}`, marginBottom: '3.5rem', flexWrap: 'wrap' }}>
            {services.map(s => (
              <button key={s.id} onClick={() => setActive(s.id)} style={{
                padding: '0.9rem 1.8rem', fontSize: '0.82rem', letterSpacing: '0.05em',
                background: 'none', border: 'none',
                color: active === s.id ? BLUE._500 : TEXT.mutedLight,
                cursor: 'pointer',
                borderBottom: `3px solid ${active === s.id ? BLUE._500 : 'transparent'}`,
                marginBottom: -2, transition: 'all 0.25s', fontFamily: F.sans, fontWeight: active === s.id ? 700 : 400,
              }}>{s.label}</button>
            ))}
          </div>

          {/* Content */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: '4rem', alignItems: 'start' }}>
            <div className="fu">
              <SecLabel>{svc.secLabel}</SecLabel>
              <h3 style={{ fontFamily: F.serif, fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.8rem', color: TEXT.onLight }}>
                {svc.title.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && <br />}</span>)}
              </h3>
              <p style={{ color: BLUE._400, fontSize: '0.87rem', letterSpacing: '0.04em', marginBottom: '1.3rem', fontFamily: F.serif, fontStyle: 'italic' }}>{svc.sub}</p>
              <p style={{ color: TEXT.mutedLight, fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '2rem', fontFamily: F.sans }}>{svc.desc}</p>

              {/* Detail cards — 2열, 호버 시 설명 표시 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                {svc.details.map((d, i) => (
                  <div key={i}
                    style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: BLUE.dim, border: `1px solid ${BORDER.light}`, padding: '1rem 1.1rem', borderLeft: `3px solid ${BLUE._500}`, borderRadius: '4px', cursor: 'default', transition: 'all 0.25s', position: 'relative', overflow: 'hidden' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BLUE._400; el.style.background = '#EBF2FF'; el.style.boxShadow = '0 4px 16px rgba(37,99,235,0.1)'; const hint = el.querySelector('.detail-hint') as HTMLElement; if (hint) hint.style.maxHeight = '4rem'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BORDER.light; el.style.background = BLUE.dim; el.style.boxShadow = 'none'; const hint = el.querySelector('.detail-hint') as HTMLElement; if (hint) hint.style.maxHeight = '0'; }}
                  >
                    <strong style={{ fontSize: '0.82rem', color: TEXT.onLight, fontFamily: F.sans, lineHeight: 1.3, whiteSpace: 'pre-line' }}>{d.t}</strong>
                    <p className="detail-hint" style={{ color: TEXT.mutedLight, fontSize: '0.75rem', lineHeight: 1.55, fontFamily: F.sans, maxHeight: 0, overflow: 'hidden', transition: 'max-height 0.3s ease', margin: 0 }}>{d.d}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel */}
            <div className="fu d2" style={{ background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '2.5rem', position: 'sticky', top: '7rem', borderRadius: '8px', boxShadow: '0 4px 24px rgba(37,99,235,0.08)' }}>
              <div style={{ fontSize: '0.68rem', color: BLUE._500, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', fontFamily: F.sans, fontWeight: 700 }}>
                {active === 'cs' ? 'CS 개선 프로세스' : active === 'mkt' ? '마케팅 실행 프로세스' : active === 'mgmt' ? '경영 개선 프로세스' : '인력 관리 프로세스'}
              </div>
              {svc.steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1rem 0', borderBottom: i < svc.steps.length - 1 ? `1px solid ${BORDER.light}` : 'none', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: F.bebas, fontSize: '1.3rem', color: BLUE._500, width: 30, flexShrink: 0, lineHeight: 1.2 }}>{s.n}</div>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.87rem', color: TEXT.onLight, fontFamily: F.sans }}>{s.t}</strong>
                    <span style={{ color: TEXT.grayDark, fontSize: '0.76rem', lineHeight: 1.5, fontFamily: F.sans }}>{s.d}</span>
                  </div>
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginTop: '2rem' }}>
                {svc.results.map(r => (
                  <div key={r.l} style={{ background: LIGHT.bg1, padding: '1.1rem', textAlign: 'center', borderRadius: '6px', border: `1px solid ${BORDER.light}` }}>
                    <strong className="text-grad" style={{ display: 'block', fontFamily: F.sans, fontSize: '1.9rem', lineHeight: 1, fontWeight: 700 }}>{r.v}</strong>
                    <span style={{ fontSize: '0.69rem', color: TEXT.mutedLight, letterSpacing: '0.05em', fontFamily: F.sans }}>{r.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registered Trademarks */}
      <ServiceShowcase />

      {/* FAQ */}
      <section style={{ background: LIGHT.bg0, padding: '6rem 5vw' }}>
        <div style={{ maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <SecLabel center>FAQ</SecLabel>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, color: TEXT.onLight }}>자주 묻는 질문</h2>
          </div>
          <ServiceFaqAccordion items={serviceFaqItems} />
        </div>
      </section>

      {/* CTA */}
      <div style={{ padding: '6rem 5vw', background: `linear-gradient(135deg,${BLUE.ctaBg},#1E40AF)`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div style={{ position: 'relative' }}>
          <h2 className="fu" style={{ fontFamily: F.serif, fontSize: 'clamp(1.7rem,3.2vw,2.8rem)', fontWeight: 700, marginBottom: '0.9rem', color: '#FFFFFF' }}>어떤 서비스가 필요하신가요?</h2>
          <p className="fu" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '0.92rem', fontFamily: F.sans }}>무료 상담을 통해 우리 병원에 맞는 서비스를 찾아드립니다.</p>
          <div className="fu">
            <Link to="/contact" style={{ display: 'inline-flex', background: '#FFFFFF', color: BLUE._500, padding: '0.85rem 2rem', fontWeight: 700, fontSize: '0.87rem', textDecoration: 'none', borderRadius: '4px', fontFamily: F.sans }}>무료 상담 신청 →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}