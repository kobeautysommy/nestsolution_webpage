// 상담 신청 → 텔레그램 알림 (Vercel Serverless Function)
// 필요한 환경변수: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (Vercel 프로젝트 설정 > Environment Variables)

const clean = (v, max) => String(v ?? '').replace(/[<>]/g, '').trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

  // 봇 차단용 숨김 필드 — 사람이 채울 일 없음
  if (body.website) return res.status(200).json({ ok: true });

  const dept = clean(body.dept, 40);
  const hospital = clean(body.hospital, 60);
  const name = clean(body.name, 30);
  const phone = clean(body.phone, 20);
  const message = clean(body.message, 500);

  if (!dept || !name || !/^[0-9-+\s]{9,20}$/.test(phone) || body.agree !== true) {
    return res.status(400).json({ ok: false, error: 'invalid_input' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'not_configured' });
  }

  const time = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  const text = [
    '🔔 새 상담 신청',
    '',
    `진료과목: ${dept}`,
    ...(hospital ? [`병원명: ${hospital}`] : []),
    `성함: ${name}`,
    `연락처: ${phone}`,
    ...(message ? [`문의내용: ${message}`] : []),
    '',
    `접수: ${time}`,
  ].join('\n');

  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
    if (!r.ok) throw new Error(`telegram ${r.status}`);
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(502).json({ ok: false, error: 'send_failed' });
  }
}
