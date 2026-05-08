import { BLUE, TEXT, BORDER, LIGHT, F } from '../../utils/colors';
import { SecLabel } from '../shared/SecLabel';
import { BtnOutline } from '../shared/Buttons';

const painCards = [
  { icon: '📉', title: '환자가 줄고 있어요',       desc: '신규 환자 유입 감소,\n재방문율 하락.\n마케팅을 해봤는데 효과가 없어요.' },
  { icon: '🤯', title: '진료 외 업무가\n너무 많아요', desc: '직원 관리, 청구,\n민원까지.\n진료에 집중하고 싶은데 경영에 치고 있어요.' },
  { icon: '👥', title: '직원이 자꾸\n그만 둬요',      desc: '뽑으면 나가고, 또 뽑고.\n서비스 품질도\n들쭉날쭉합니다.' },
  { icon: '🏥', title: '옆 병원과 차별화가 안 돼요', desc: '비슷한 진료,\n비슷한 위치.\n우리 병원만의 이유가 없어요.' },
];

export function PainMini() {
  return (
    <section style={{ background: LIGHT.bg1, padding: '5rem 5vw' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="fu" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <SecLabel center onLight>Pain Point</SecLabel>
          <h2 style={{ fontFamily: F.serif, fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 700, color: TEXT.onLight }}>원장님, 이런 고민 있으신가요?</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1.2rem' }}>
          {painCards.map((c, i) => (
            <div key={i} className={`fu d${i + 1}`} style={{
              background: '#FFFFFF', border: `1px solid ${BORDER.light}`,
              padding: '2.2rem 1.8rem', position: 'relative', overflow: 'hidden',
              borderRadius: '6px', transition: 'all 0.3s',
              boxShadow: '0 2px 8px rgba(37,99,235,0.05)',
            }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BLUE._400; el.style.boxShadow = '0 8px 28px rgba(37,99,235,0.12)'; el.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = BORDER.light; el.style.boxShadow = '0 2px 8px rgba(37,99,235,0.05)'; el.style.transform = 'none'; }}
            >
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,${BLUE._500},${BLUE._300})` }} />
              <div style={{ fontFamily: F.bebas, fontSize: '2.8rem', color: BLUE.dim, lineHeight: 1, marginBottom: '0.7rem' }}>{String(i + 1).padStart(2, '0')}</div>
              <h3 style={{ fontSize: '0.97rem', fontWeight: 700, marginBottom: '0.6rem', color: TEXT.onLight, fontFamily: F.sans, whiteSpace: 'pre-line' }}>{c.title}</h3>
              <p style={{ color: TEXT.mutedLight, fontSize: '0.82rem', lineHeight: 1.75, fontFamily: F.sans, whiteSpace: 'pre-line' }}>{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="fu" style={{ textAlign: 'center', marginTop: '2rem' }}>
          <BtnOutline to="/pain" onLight>고민 더 보기 →</BtnOutline>
        </div>
      </div>
    </section>
  );
}
