// 텔레그램 봇 웹훅 — 누구든 봇에서 /start 를 누르면 상담 알림 구독, /stop 이면 해지
// GET /api/telegram?setup=1 을 한 번 열면 웹훅이 등록돼요.
import { addSubscriber, removeSubscriber, storeReady, webhookSecret } from './_subscribers.js';

const tg = (token, method, body) =>
  fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((r) => r.json());

export default async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return res.status(500).json({ ok: false, error: 'not_configured' });
  const secret = webhookSecret(token);

  if (req.method === 'GET') {
    if (req.query?.setup !== '1') return res.status(200).json({ ok: true, store: storeReady() });
    const url = `https://${req.headers.host}/api/telegram`;
    const r = await tg(token, 'setWebhook', { url, secret_token: secret, allowed_updates: ['message', 'my_chat_member'] });
    return res.status(200).json({ webhook: url, store: storeReady(), telegram: r });
  }

  if (req.method !== 'POST') return res.status(405).end();
  if (req.headers['x-telegram-bot-api-secret-token'] !== secret) return res.status(401).end();

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  try {
    // 봇을 그룹에 넣거나 빼면 자동 등록/해지
    const member = body.my_chat_member;
    if (member) {
      const status = member.new_chat_member?.status;
      if (['member', 'administrator'].includes(status)) await addSubscriber(member.chat.id);
      if (['left', 'kicked'].includes(status)) await removeSubscriber(member.chat.id);
      return res.status(200).json({ ok: true });
    }

    const msg = body.message;
    const text = (msg?.text || '').trim();
    if (!msg || !text.startsWith('/')) return res.status(200).json({ ok: true });

    const chatId = msg.chat.id;
    if (/^\/start\b/.test(text)) {
      await addSubscriber(chatId);
      await tg(token, 'sendMessage', {
        chat_id: chatId,
        text: '✅ 네스트솔루션 상담 알림이 등록되었습니다.\n새 상담 신청이 들어오면 여기로 알려드릴게요.\n\n알림을 끄려면 /stop 을 보내주세요.',
      });
    } else if (/^\/stop\b/.test(text)) {
      await removeSubscriber(chatId);
      await tg(token, 'sendMessage', { chat_id: chatId, text: '🔕 상담 알림이 해제되었습니다. 다시 받으려면 /start 를 보내주세요.' });
    }
  } catch (e) {
    console.error(e);
  }
  // 텔레그램이 같은 요청을 계속 재전송하지 않도록 항상 200
  return res.status(200).json({ ok: true });
}
