import { useEffect } from 'react';
import { Link } from 'react-router';
import { BLUE, TEXT, BORDER, DARK, LIGHT, F, accentGrad } from '../utils/colors';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const SecLabel = ({ children, center }: { children: string; center?: boolean }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '0.9rem', justifyContent: center ? 'center' : undefined }}>
    <span style={{ width: 20, height: 1, background: BLUE._500, display: 'inline-block' }} />{children}
  </div>
);

export function Cases() {
  useScrollAnimation();
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: LIGHT.bg0 }}>
      {/* Banner */}
      <div style={{ padding: '9rem 5vw 5rem', position: 'relative', overflow: 'hidden', background: `linear-gradient(155deg,${DARK.bg1},${DARK.bg0})`, borderBottom: `1px solid ${BORDER.bw}` }}>
        <div style={{ position: 'absolute', inset: '-50%', backgroundImage: `linear-gradient(rgba(59,130,246,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.04) 1px,transparent 1px)`, backgroundSize: '70px 70px', animation: 'gMove 28s linear infinite' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto' }}>
          <SecLabel>Success Cases</SecLabel>
          <h1 style={{ fontFamily: F.serif, fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 700, lineHeight: 1.25, marginBottom: '1rem', color: TEXT.onDark }}>
            실제 사례로<br /><span className="text-grad">증명합니다</span>
          </h1>
          <p style={{ color: TEXT.mutedDark, fontSize: '0.95rem', lineHeight: 1.8, fontFamily: F.sans, whiteSpace: 'nowrap' }}>정형외과, 내과 — 진료과목과 관계없이 네스트솔루션의 컨설팅은 실질적인 성장을 만들어냅니다.</p>
        </div>
      </div>

      {/* Case 01 */}
      <section style={{ padding: '6rem 5vw', background: LIGHT.bg0 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="fu" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: F.bebas, fontSize: '5rem', lineHeight: 1, color: BLUE.dim }}>01</div>
            <div>
              <SecLabel>Case Study</SecLabel>
              <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, marginBottom: '0.5rem', color: TEXT.onLight }}>
                ○○정형외과
              </h2>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {[
                  { label: '정형외과', blue: true },
                  { label: '서울', blue: false },
                  { label: '의원급 · 원장 4인', blue: false },
                ].map(b => (
                  <span key={b.label} style={{ fontSize: '0.72rem', letterSpacing: '0.08em', background: b.blue ? BLUE.dim : LIGHT.bg1, border: `1px solid ${b.blue ? BLUE._500 : BORDER.light}`, color: b.blue ? BLUE._500 : TEXT.mutedLight, padding: '0.25rem 0.8rem', borderRadius: '20px', fontFamily: F.sans }}>{b.label}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="fu" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: '1rem', marginBottom: '4rem' }}>
            {[
              { v: '↑185%', l: '월 매출 성장률' },
              { v: '↑89%',  l: '신규 환자 유입' },
              { v: '4.8★',  l: '소비자 만족도' },
              { v: '↑74%',  l: '재방문율' },
              { v: '↓71%',  l: '직원 이직률' },
            ].map(m => (
              <div key={m.l} style={{ background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '1.8rem 1rem', textAlign: 'center', borderRadius: '8px', boxShadow: '0 2px 8px rgba(37,99,235,0.06)' }}>
                <div className="text-grad" style={{ fontFamily: F.bebas, fontSize: '2.4rem', lineHeight: 1 }}>{m.v}</div>
                <div style={{ fontSize: '0.68rem', color: BLUE._500, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.5rem', fontFamily: F.sans }}>{m.l}</div>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="fu" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'start' }}>
            <div>
              {/* Before */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: TEXT.mutedLight, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: F.sans, fontWeight: 700 }}>
                  컨설팅 전 상황 <span style={{ flex: 1, height: 1, background: BORDER.light, display: 'inline-block' }} />
                </div>
                <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)', borderLeft: '3px solid rgba(239,68,68,0.4)', padding: '1.5rem 1.8rem', borderRadius: '0 8px 8px 0' }}>
                  <p style={{ color: TEXT.mutedLight, fontSize: '0.9rem', lineHeight: 1.85, fontFamily: F.sans }}>환자 수가 꾸준히 줄어들고, 신규 환자 유입 대비 재방문율이 낮았습니다. 직원 이직이 잦아 서비스 품질이 일관되지 않았고, 네이버 리뷰 평점은 3.6에 머물렀습니다. 마케팅에 광고비를 투입하고 있었지만 신환 전환율이 낮아 비용 대비 효율이 나오지 않는 상황이었습니다.</p>
                </div>
              </div>

              {/* Services Applied */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: F.sans, fontWeight: 700 }}>
                  적용 서비스 <span style={{ flex: 1, height: 1, background: BORDER.light, display: 'inline-block' }} />
                </div>
                {[
                  { icon: '🩺', t: 'CS 관리 — 환자 동선 전면 재설계', d: '접수·대기·진료·수납 전 구간 분석 후 불편 요소 제거. 직원 롤플레이 교육 8회 실시 및 CS 매뉴얼 제작.' },
                  { icon: '📣', t: '마케팅 — 네이버 SEO + 리뷰 관리', d: '네이버 플레이스 최적화, 블로그 SEO 전략 수립. 비효율 광고 채널 정리 후 전환율 높은 채널 집중 운영.' },
                  { icon: '👥', t: '인력 관리 — 교육 체계 & 동기부여', d: '물리치료사·행정직 직무별 교육 커리큘럼 수립, 성과 기반 인센티브 구조 도입.' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 1.2rem', background: BLUE.dim, border: `1px solid ${BORDER.light}`, marginBottom: '0.7rem', borderLeft: `3px solid ${BLUE._500}`, borderRadius: '0 6px 6px 0' }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
                    <div>
                      <strong style={{ fontSize: '0.87rem', display: 'block', marginBottom: '0.2rem', color: TEXT.onLight, fontFamily: F.sans }}>{s.t}</strong>
                      <p style={{ color: TEXT.mutedLight, fontSize: '0.81rem', lineHeight: 1.6, fontFamily: F.sans }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div style={{ background: LIGHT.bg1, border: `1px solid ${BORDER.light}`, borderLeft: `4px solid ${BLUE._500}`, padding: '1.6rem 2rem', borderRadius: '0 8px 8px 0' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '0.8rem', fontFamily: F.sans }}>원장님 한마디</div>
                <p style={{ fontFamily: F.serif, fontSize: '0.95rem', lineHeight: 1.85, color: TEXT.onLight, fontStyle: 'italic' }}>
                  "네스트솔루션과 함께하고 나서 병원 분위기 자체가 바뀌었습니다. 직원들이 스스로 환자를 챙기기 시작했고, 리뷰도 좋아졌어요. 무엇보다 제가 진료에만 집중할 수 있게 된 게 가장 큰 변화입니다."
                </p>
                <div style={{ fontSize: '0.75rem', color: BLUE._400, marginTop: '1rem', fontFamily: F.sans }}>○○정형외과 원장</div>
              </div>
            </div>

            {/* Chart */}
            <div>
              <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 20px rgba(37,99,235,0.07)' }}>
                <div style={{ fontSize: '0.68rem', color: TEXT.mutedLight, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem', fontFamily: F.sans }}>리뷰 평점 변화</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 140, marginBottom: '2rem' }}>
                  {[
                    { h: '37%', m: '컨설팅 전', before: true },
                    { h: '52%', m: '1개월', before: false },
                    { h: '48%', m: '2개월', before: false },
                    { h: '68%', m: '3개월', before: false },
                    { h: '62%', m: '4개월', before: false },
                    { h: '85%', m: '5개월', before: false },
                  ].map((b, i) => (
                    <div key={i} style={{ flex: 1, height: b.h, borderRadius: '4px 4px 0 0', position: 'relative', background: b.before ? 'rgba(100,116,139,0.3)' : `linear-gradient(180deg,${BLUE._500},${BLUE.dim})` }}>
                      <span style={{ position: 'absolute', bottom: '-1.5rem', left: '50%', transform: 'translateX(-50%)', fontSize: '0.58rem', color: TEXT.mutedLight, whiteSpace: 'nowrap', fontFamily: F.sans }}>{b.m}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginTop: '0.5rem' }}>
                  <span style={{ color: TEXT.mutedLight, fontFamily: F.sans }}>시작: ⭐ 3.6</span>
                  <span style={{ color: BLUE._500, fontWeight: 700, fontFamily: F.sans }}>현재: ⭐ 4.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case 02 — 정형외과 추가 사례 */}
      <section style={{ padding: '6rem 5vw', background: LIGHT.bg0 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="fu" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: F.bebas, fontSize: '5rem', lineHeight: 1, color: BLUE.dim }}>02</div>
            <div>
              <SecLabel>Case Study</SecLabel>
              <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, marginBottom: '0.5rem', color: TEXT.onLight }}>
                ○○정형외과
              </h2>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                {[
                  { label: '정형외과', blue: true },
                  { label: '경기도', blue: false },
                  { label: '의원급 · 원장 2인', blue: false },
                ].map(b => (
                  <span key={b.label} style={{ fontSize: '0.72rem', letterSpacing: '0.08em', background: b.blue ? BLUE.dim : LIGHT.bg1, border: `1px solid ${b.blue ? BLUE._500 : BORDER.light}`, color: b.blue ? BLUE._500 : TEXT.mutedLight, padding: '0.25rem 0.8rem', borderRadius: '20px', fontFamily: F.sans }}>{b.label}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="fu" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: '1rem', marginBottom: '4rem' }}>
            {[
              { v: '↑165%', l: '월 매출 성장률' },
              { v: '↑76%',  l: '신규 환자 유입' },
              { v: '4.7★',  l: '소비자 만족도' },
              { v: '↑61%',  l: '재방문율' },
              { v: '↓58%',  l: '직원 이직률' },
            ].map(m => (
              <div key={m.l} style={{ background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '1.8rem 1rem', textAlign: 'center', borderRadius: '8px', boxShadow: '0 2px 8px rgba(37,99,235,0.06)' }}>
                <div className="text-grad" style={{ fontFamily: F.bebas, fontSize: '2.4rem', lineHeight: 1 }}>{m.v}</div>
                <div style={{ fontSize: '0.68rem', color: BLUE._500, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.5rem', fontFamily: F.sans }}>{m.l}</div>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="fu" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'start' }}>
            <div>
              {/* Before */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: TEXT.mutedLight, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: F.sans, fontWeight: 700 }}>
                  컨설팅 전 상황 <span style={{ flex: 1, height: 1, background: BORDER.light, display: 'inline-block' }} />
                </div>
                <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)', borderLeft: '3px solid rgba(239,68,68,0.4)', padding: '1.5rem 1.8rem', borderRadius: '0 8px 8px 0' }}>
                  <p style={{ color: TEXT.mutedLight, fontSize: '0.9rem', lineHeight: 1.85, fontFamily: F.sans }}>원장 2인 체제였지만 진료 외 운영 전반이 체계화되어 있지 않아 비효율이 컸습니다. 직원 간 역할 분담이 불명확해 CS 품질이 들쭉날쭉했고, 네이버 플레이스 관리가 되지 않아 온라인 유입이 거의 없었습니다. 광고비는 매달 나가지만 신환 전환으로 이어지지 않아 원장님들의 피로도가 높았습니다.</p>
                </div>
              </div>

              {/* Services Applied */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: F.sans, fontWeight: 700 }}>
                  적용 서비스 <span style={{ flex: 1, height: 1, background: BORDER.light, display: 'inline-block' }} />
                </div>
                {[
                  { t: '경영 개선 — 원장 2인 역할 분리 & 운영 체계화', d: '두 원장의 진료 특성에 맞춰 역할을 구분하고, 행정·운영 업무 위임 구조를 설계해 진료 집중도를 높였습니다.' },
                  { t: '마케팅 — 네이버 플레이스 집중 최적화', d: '플레이스 키워드 전략 및 포스팅 루틴 구축, 광고 채널 재편으로 신환 유입 비용 대비 효율을 2.4배 향상.' },
                  { t: 'CS 관리 — 직원 역할 매뉴얼 & 서비스 표준화', d: '직무별 표준 응대 매뉴얼 제작 및 주기적 피드백 세션 운영으로 서비스 일관성 확보.' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 1.2rem', background: BLUE.dim, border: `1px solid ${BORDER.light}`, marginBottom: '0.7rem', borderLeft: `3px solid ${BLUE._500}`, borderRadius: '0 6px 6px 0' }}>
                    <div>
                      <strong style={{ fontSize: '0.87rem', display: 'block', marginBottom: '0.2rem', color: TEXT.onLight, fontFamily: F.sans }}>{s.t}</strong>
                      <p style={{ color: TEXT.mutedLight, fontSize: '0.81rem', lineHeight: 1.6, fontFamily: F.sans }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div style={{ background: LIGHT.bg1, border: `1px solid ${BORDER.light}`, borderLeft: `4px solid ${BLUE._500}`, padding: '1.6rem 2rem', borderRadius: '0 8px 8px 0' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '0.8rem', fontFamily: F.sans }}>원장님 한마디</div>
                <p style={{ fontFamily: F.serif, fontSize: '0.95rem', lineHeight: 1.85, color: TEXT.onLight, fontStyle: 'italic' }}>
                  "두 명이 같이 운영하다 보니 오히려 역할이 더 불분명했는데, 네스트솔루션이 체계를 잡아줬습니다. 지금은 제가 진료에만 집중하고, 운영은 팀이 돌아가는 구조가 됐어요."
                </p>
                <div style={{ fontSize: '0.75rem', color: BLUE._400, marginTop: '1rem', fontFamily: F.sans }}>○○정형외과 원장</div>
              </div>
            </div>

            {/* Chart */}
            <div>
              <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 20px rgba(37,99,235,0.07)' }}>
                <div style={{ fontSize: '0.68rem', color: TEXT.mutedLight, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem', fontFamily: F.sans }}>월 매출 성장 추이</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 140, marginBottom: '2rem' }}>
                  {[
                    { h: '40%', m: '컨설팅 전', before: true },
                    { h: '55%', m: '1개월', before: false },
                    { h: '50%', m: '2개월', before: false },
                    { h: '70%', m: '3개월', before: false },
                    { h: '65%', m: '4개월', before: false },
                    { h: '88%', m: '5개월', before: false },
                  ].map((b, i) => (
                    <div key={i} style={{ flex: 1, height: b.h, borderRadius: '4px 4px 0 0', position: 'relative', background: b.before ? 'rgba(100,116,139,0.3)' : `linear-gradient(180deg,${BLUE._500},${BLUE.dim})` }}>
                      <span style={{ position: 'absolute', bottom: '-1.5rem', left: '50%', transform: 'translateX(-50%)', fontSize: '0.58rem', color: TEXT.mutedLight, whiteSpace: 'nowrap', fontFamily: F.sans }}>{b.m}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginTop: '0.5rem' }}>
                  <span style={{ color: TEXT.mutedLight, fontFamily: F.sans }}>컨설팅 전 대비</span>
                  <span style={{ color: BLUE._500, fontWeight: 700, fontFamily: F.sans }}>+165% 성장</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case 03 — 내과 */}
      <section style={{ padding: '6rem 5vw', background: LIGHT.bg1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="fu" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: F.bebas, fontSize: '5rem', lineHeight: 1, color: BLUE.dim }}>03</div>
            <div>
              <SecLabel>Case Study</SecLabel>
              <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.4rem)', fontWeight: 700, marginBottom: '0.5rem', color: TEXT.onLight }}>
                ○○내과의원
              </h2>
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {['내과', '경기도', '경영개선 + CS관리 + 인력관리 · 4개월'].map(b => (
                  <span key={b} style={{ fontSize: '0.72rem', background: LIGHT.bg0, border: `1px solid ${BORDER.light}`, color: TEXT.mutedLight, padding: '0.25rem 0.8rem', borderRadius: '20px', fontFamily: F.sans }}>{b}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="fu" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: '1rem', marginBottom: '3rem' }}>
            {[{ v: '+153%', l: '월 매출 성장' }, { v: '4.9★', l: '소비자 만족도' }, { v: '↓40%', l: '행정 업무량' }, { v: '↑55%', l: '재방문율' }].map(m => (
              <div key={m.l} style={{ background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '1.8rem 1rem', textAlign: 'center', borderRadius: '8px', boxShadow: '0 2px 8px rgba(37,99,235,0.06)' }}>
                <div className="text-grad" style={{ fontFamily: F.bebas, fontSize: '2.4rem', lineHeight: 1 }}>{m.v}</div>
                <div style={{ fontSize: '0.68rem', color: BLUE._500, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.5rem', fontFamily: F.sans }}>{m.l}</div>
              </div>
            ))}
          </div>

          {/* Details */}
          <div className="fu" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '4rem', alignItems: 'start' }}>
            <div>
              {/* Before */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: TEXT.mutedLight, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: F.sans, fontWeight: 700 }}>
                  컨설팅 전 상황 <span style={{ flex: 1, height: 1, background: BORDER.light, display: 'inline-block' }} />
                </div>
                <div style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)', borderLeft: '3px solid rgba(239,68,68,0.4)', padding: '1.5rem 1.8rem', borderRadius: '0 8px 8px 0' }}>
                  <p style={{ color: TEXT.mutedLight, fontSize: '0.9rem', lineHeight: 1.85, fontFamily: F.sans }}>개원 3년차 내과의원으로, 원장님은 진료에만 집중하고 싶었지만 행정 업무와 경영 문제에 시간을 빼앗기고 있었습니다. 직원 교육 시스템이 없어 CS 품질이 들쭉날쭉했고, 환자 응대에 대한 불만 리뷰가 증가하고 있었습니다. 온라인 마케팅은 전혀 하지 않아 신환 유입이 거의 없었습니다.</p>
                </div>
              </div>

              {/* Services Applied */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', fontFamily: F.sans, fontWeight: 700 }}>
                  적용 서비스 <span style={{ flex: 1, height: 1, background: BORDER.light, display: 'inline-block' }} />
                </div>
                {[
                  { icon: '💼', t: '경영 개선 — 행정 업무 효율화 & 시스템화', d: '예약·청구·재고 관리 프로세스를 디지털화하여 행정 업무량을 40% 감소시키고 원장님의 진료 집중도를 높였습니다.' },
                  { icon: '🩺', t: 'CS 관리 — 환자 응대 매뉴얼 & 직원 교육', d: '접수부터 수납까지 전 과정 응대 매뉴얼 제작, 월 2회 직원 교육 세션 운영으로 서비스 품질 표준화.' },
                  { icon: '👥', t: '인력 관리 — 역할 재정의 & 동기부여 시스템', d: '직원별 명확한 역할 분담과 KPI 설정, 성과 기반 보상 체계 도입으로 팀 안정성과 업무 효율 향상.' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1rem 1.2rem', background: BLUE.dim, border: `1px solid ${BORDER.light}`, marginBottom: '0.7rem', borderLeft: `3px solid ${BLUE._500}`, borderRadius: '0 6px 6px 0' }}>
                    <span style={{ fontSize: '1rem', flexShrink: 0 }}>{s.icon}</span>
                    <div>
                      <strong style={{ fontSize: '0.87rem', display: 'block', marginBottom: '0.2rem', color: TEXT.onLight, fontFamily: F.sans }}>{s.t}</strong>
                      <p style={{ color: TEXT.mutedLight, fontSize: '0.81rem', lineHeight: 1.6, fontFamily: F.sans }}>{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div style={{ background: LIGHT.bg0, border: `1px solid ${BORDER.light}`, borderLeft: `4px solid ${BLUE._500}`, padding: '1.6rem 2rem', borderRadius: '0 8px 8px 0' }}>
                <div style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: BLUE._500, marginBottom: '0.8rem', fontFamily: F.sans }}>원장님 한마디</div>
                <p style={{ fontFamily: F.serif, fontSize: '0.95rem', lineHeight: 1.85, color: TEXT.onLight, fontStyle: 'italic' }}>
                  "경영이 뭔지 모른 채 진료만 했는데, 네스트솔루션이 제 병원의 숨은 문제점들을 모두 찾아줬습니다. 4개월 만에 이렇게 바뀔 수 있다는 게 놀라웠어요."
                </p>
                <div style={{ fontSize: '0.75rem', color: BLUE._400, marginTop: '1rem', fontFamily: F.sans }}>○○내과의원 원장</div>
              </div>
            </div>

            {/* Chart */}
            <div>
              <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '2rem', borderRadius: '10px', boxShadow: '0 4px 20px rgba(37,99,235,0.07)' }}>
                <div style={{ fontSize: '0.68rem', color: TEXT.mutedLight, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1.2rem', fontFamily: F.sans }}>월 매출 성장 추이</div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 140, marginBottom: '2rem' }}>
                  {[
                    { h: '35%', m: '컨설팅 전', before: true },
                    { h: '50%', m: '1개월', before: false },
                    { h: '45%', m: '2개월', before: false },
                    { h: '65%', m: '3개월', before: false },
                    { h: '82%', m: '4개월', before: false },
                  ].map((b, i) => (
                    <div key={i} style={{ flex: 1, height: b.h, borderRadius: '4px 4px 0 0', position: 'relative', background: b.before ? 'rgba(100,116,139,0.3)' : `linear-gradient(180deg,${BLUE._500},${BLUE.dim})` }}>
                      <span style={{ position: 'absolute', bottom: '-1.5rem', left: '50%', transform: 'translateX(-50%)', fontSize: '0.58rem', color: TEXT.mutedLight, whiteSpace: 'nowrap', fontFamily: F.sans }}>{b.m}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginTop: '0.5rem' }}>
                  <span style={{ color: TEXT.mutedLight, fontFamily: F.sans }}>컨설팅 전 대비</span>
                  <span style={{ color: BLUE._500, fontWeight: 700, fontFamily: F.sans }}>+153% 성장</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ padding: '6rem 5vw', background: `linear-gradient(135deg,${BLUE.ctaBg},#1E40AF)`, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div style={{ position: 'relative' }}>
          <SecLabel center>Next Story</SecLabel>
          <h2 className="fu" style={{ fontFamily: F.serif, fontSize: 'clamp(1.7rem,3.2vw,2.8rem)', fontWeight: 700, marginBottom: '0.9rem', color: '#FFFFFF' }}>다음 성공 사례의<br />주인공이 되세요</h2>
          <p className="fu" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '2.5rem', fontSize: '0.92rem', fontFamily: F.sans }}>진료과목, 규모 관계없이 성장시킵니다. 상담은 항상 무료입니다.</p>
          <div className="fu">
            <Link to="/contact" style={{ display: 'inline-flex', background: '#FFFFFF', color: BLUE._500, padding: '0.85rem 2rem', fontWeight: 700, fontSize: '0.87rem', textDecoration: 'none', borderRadius: '4px', fontFamily: F.sans }}>무료 상담 신청 →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}