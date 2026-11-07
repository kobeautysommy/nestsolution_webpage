import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { BLUE, TEXT, BORDER, LIGHT, F } from '../utils/colors';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { SecLabel } from '../components/shared/SecLabel';
import { PageBanner } from '../components/shared/PageBanner';

const depts = [
  '정형외과', '내과', '이비인후과', '피부과', '성형외과', '치과',
  '한의원', '소아청소년과', '산부인과', '안과', '재활의학과', '기타',
];

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.85rem 1rem', border: `1px solid ${BORDER.light}`,
  borderRadius: '6px', fontSize: '0.9rem', fontFamily: F.sans, color: TEXT.onLight,
  background: LIGHT.bg0, outline: 'none', boxSizing: 'border-box',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.82rem', fontWeight: 700, color: TEXT.onLight,
  marginBottom: '0.45rem', fontFamily: F.sans,
};

export function Contact() {
  useScrollAnimation();
  const [dept, setDept] = useState('');
  const [hospital, setHospital] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [agree, setAgree] = useState(false);
  const [website, setWebsite] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const onPhone = (v: string) => {
    const d = v.replace(/\D/g, '').slice(0, 11);
    setPhone(d.length < 4 ? d : d.length < 8 ? `${d.slice(0, 3)}-${d.slice(3)}` : `${d.slice(0, 3)}-${d.slice(3, d.length - 4)}-${d.slice(-4)}`);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!dept) return toast.error('진료과목을 선택해 주세요.');
    if (!name.trim()) return toast.error('성함을 입력해 주세요.');
    if (phone.replace(/\D/g, '').length < 9) return toast.error('연락처를 정확히 입력해 주세요.');
    if (!agree) return toast.error('개인정보 수집·이용에 동의해 주세요.');
    setSending(true);
    try {
      const r = await fetch('/api/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dept, hospital, name, phone, message, agree, website }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setDone(true);
      toast.success('상담 신청이 접수되었습니다! 빠르게 연락드리겠습니다.');
    } catch {
      toast.error('전송에 실패했어요. 잠시 후 다시 시도하시거나 전화로 연락 주세요.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ background: LIGHT.bg0 }}>
      <PageBanner
        label="Contact"
        title={<>무료 상담<br /><span className="text-grad">신청하기</span></>}
        desc="원장님의 고민을 들려주세요. 18년 임상 경험으로 함께 해결책을 찾겠습니다. 상담은 항상 무료입니다."
        theme="light"
      />

      {/* Contact Body */}
      <section style={{ padding: '6rem 5vw', background: LIGHT.bg0 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: '3rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Left */}
          <div className="fu" style={{ flex: '1 1 400px', minWidth: 300 }}>
            <SecLabel>문의 방법</SecLabel>
            <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.4rem,2.5vw,2rem)', fontWeight: 700, lineHeight: 1.4, marginBottom: '0.8rem', color: TEXT.onLight }}>편하신 방법으로<br />연락주세요</h2>
            <p style={{ color: TEXT.mutedLight, fontSize: '0.92rem', lineHeight: 1.85, marginBottom: '2.5rem', fontFamily: F.sans }}>카카오톡, 전화, 어떤 방법이든 환영합니다. 최대한 빠르게 연락드리겠습니다.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {[
                { icon: '💬', title: '카카오톡 채널 상담', sub: '@NestSolution — 빠른 답변 보장', href: 'http://pf.kakao.com/_HStBn', border: 'rgba(254,229,0,0.4)', bg: 'rgba(254,229,0,0.06)' },
                { icon: '📞', title: '전화 상담', sub: '010-3129-8248 / 010-9470-8248 · 평일 09:00 – 20:00', href: 'tel:010-3129-8248', border: BORDER.light, bg: BLUE.dim },
                { icon: '✉️', title: '이메일 문의', sub: 'nestsadvice@gmail.com', href: 'mailto:nestsadvice@gmail.com', border: BORDER.light, bg: 'transparent' },
              ].map((c, i) => (
                <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '1.2rem', padding: '1.5rem 1.8rem',
                  background: c.bg, border: `1px solid ${c.border}`, textDecoration: 'none',
                  borderRadius: '8px', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = BLUE._400; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(37,99,235,0.12)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = c.border; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                >
                  <span style={{ fontSize: '2rem' }}>{c.icon}</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.95rem', color: TEXT.onLight, marginBottom: '0.2rem', fontFamily: F.sans }}>{c.title}</strong>
                    <span style={{ color: TEXT.mutedLight, fontSize: '0.82rem', fontFamily: F.sans }}>{c.sub}</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Notes */}
            <div style={{ padding: '1.8rem', background: LIGHT.bg1, border: `1px solid ${BORDER.light}`, borderRadius: '8px' }}>
              <SecLabel>상담 전 참고사항</SecLabel>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {['첫 상담은 완전 무료입니다', '상담 후 계약 강요는 일절 없습니다', '병원 규모·진료과목 무관하게 상담 가능합니다', '상담 내용은 철저히 비밀이 보장됩니다'].map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start', color: TEXT.mutedLight, fontSize: '0.87rem', lineHeight: 1.6, fontFamily: F.sans }}>
                    <span style={{ color: BLUE._500, flexShrink: 0 }}>✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right */}
          <div className="fu d2" style={{ flex: '1 1 400px', minWidth: 300 }}>
          <div style={{ background: '#FFFFFF', border: `1px solid ${BORDER.light}`, padding: '2.5rem', borderRadius: '10px', boxShadow: '0 4px 24px rgba(37,99,235,0.08)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg,${BLUE._500},${BLUE._300})`, borderRadius: '10px 10px 0 0' }} />
            <SecLabel>빠른 상담 신청</SecLabel>
            {done ? (
              <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', background: BLUE.dim, borderRadius: '8px' }}>
                <div style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>✅</div>
                <strong style={{ display: 'block', fontSize: '1.05rem', color: TEXT.onLight, marginBottom: '0.5rem', fontFamily: F.sans }}>상담 신청이 접수되었습니다</strong>
                <p style={{ color: TEXT.mutedLight, fontSize: '0.88rem', lineHeight: 1.75, fontFamily: F.sans }}>
                  남겨주신 연락처로 빠르게 연락드리겠습니다.<br />급하신 경우 010-3129-8248로 전화 주세요.
                </p>
              </div>
            ) : (
            <form onSubmit={onSubmit} noValidate>
              <span style={labelStyle}>진료과목 <span style={{ color: BLUE._500 }}>*</span></span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(104px, 1fr))', gap: '0.5rem', marginBottom: '1.5rem' }}>
                {depts.map((d) => {
                  const on = d === dept;
                  return (
                    <button key={d} type="button" onClick={() => setDept(d)} aria-pressed={on} style={{
                      padding: '0.7rem 0.4rem', border: `1px solid ${on ? BLUE._500 : BORDER.light}`, cursor: 'pointer',
                      transition: 'all 0.2s', fontSize: '0.86rem', fontWeight: on ? 700 : 400,
                      color: on ? '#FFFFFF' : TEXT.onLight, background: on ? BLUE._500 : LIGHT.bg0,
                      fontFamily: F.sans, borderRadius: '6px',
                    }}>{d}</button>
                  );
                })}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <label>
                  <span style={labelStyle}>성함 <span style={{ color: BLUE._500 }}>*</span></span>
                  <input style={inputStyle} value={name} onChange={e => setName(e.target.value)} maxLength={30} autoComplete="name" placeholder="홍길동" />
                </label>
                <label>
                  <span style={labelStyle}>연락처 <span style={{ color: BLUE._500 }}>*</span></span>
                  <input style={inputStyle} value={phone} onChange={e => onPhone(e.target.value)} inputMode="tel" autoComplete="tel" placeholder="010-0000-0000" />
                </label>
              </div>
              <label style={{ display: 'block', marginBottom: '1rem' }}>
                <span style={labelStyle}>병원명 <span style={{ color: TEXT.mutedLight, fontWeight: 400 }}>(선택)</span></span>
                <input style={inputStyle} value={hospital} onChange={e => setHospital(e.target.value)} maxLength={60} placeholder="개원 예정이시면 지역만 적어주셔도 돼요" />
              </label>
              <label style={{ display: 'block', marginBottom: '1.2rem' }}>
                <span style={labelStyle}>문의 내용 <span style={{ color: TEXT.mutedLight, fontWeight: 400 }}>(선택)</span></span>
                <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} value={message} onChange={e => setMessage(e.target.value)} maxLength={500} placeholder="CS, 마케팅, 인력 관리 등 고민을 편하게 적어주세요" />
              </label>
              {/* 봇 차단용 숨김 필드 */}
              <input type="text" value={website} onChange={e => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

              <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '1.5rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} style={{ marginTop: 4, accentColor: BLUE._500 }} />
                <span style={{ color: TEXT.mutedLight, fontSize: '0.8rem', lineHeight: 1.65, fontFamily: F.sans }}>
                  [필수] 개인정보 수집·이용에 동의합니다. (수집 항목: 성함, 연락처, 병원명 · 목적: 상담 연락 · 보유 기간: 상담 완료 후 1년)
                </span>
              </label>

              <button type="submit" disabled={sending} style={{
                width: '100%', padding: '1rem', border: 'none', borderRadius: '8px', cursor: sending ? 'wait' : 'pointer',
                background: `linear-gradient(135deg,${BLUE._500},${BLUE._400})`, color: '#fff',
                fontSize: '0.95rem', fontWeight: 700, fontFamily: F.sans, opacity: sending ? 0.7 : 1,
                boxShadow: '0 6px 20px rgba(37,99,235,0.3)',
              }}>{sending ? '전송 중…' : '무료 상담 신청하기 →'}</button>
              <p style={{ color: TEXT.mutedLight, fontSize: '0.78rem', textAlign: 'center', marginTop: '0.8rem', fontFamily: F.sans }}>
                평일 기준 당일 내 연락드립니다
              </p>
            </form>
            )}
          </div>

            {/* Manual PDF download */}
            <a href="/nest-solution-manual.pdf" download style={{
              display: 'flex', alignItems: 'center', gap: '1.2rem',
              marginTop: '1.5rem', padding: '1.8rem',
              background: '#FFFFFF', border: `1px solid ${BORDER.light}`,
              borderRadius: '10px', textDecoration: 'none', transition: 'all 0.2s',
              boxShadow: '0 4px 24px rgba(37,99,235,0.08)',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BLUE._400; el.style.boxShadow = '0 4px 16px rgba(37,99,235,0.12)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BORDER.light; el.style.boxShadow = '0 4px 24px rgba(37,99,235,0.08)'; }}
            >
              <span className="hidden lg:inline" style={{ fontSize: '2rem' }}>📄</span>
              <strong style={{ flex: 1, fontSize: '0.95rem', color: TEXT.onLight, fontFamily: F.sans }}>한눈에 보는 서비스 & 비용 (PDF)</strong>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0,
                background: `linear-gradient(135deg,${BLUE._500},${BLUE._400})`, color: '#fff',
                padding: '0.55rem 1.1rem', fontSize: '0.8rem', fontWeight: 700,
                letterSpacing: '0.03em', borderRadius: '8px', fontFamily: F.sans,
              }}>다운로드 ↓</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}