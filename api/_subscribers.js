// 텔레그램 알림 구독자 목록 (Upstash Redis REST API)
// Vercel > Storage > Upstash Redis 를 프로젝트에 연결하면 아래 환경변수가 자동으로 생겨요.
import { createHash } from 'node:crypto';

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const KEY = 'telegram:subscribers';

async function redis(...cmd) {
  if (!URL_ || !TOKEN) return null;
  const r = await fetch(URL_, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error(`redis ${r.status}`);
  return (await r.json()).result;
}

export const storeReady = () => Boolean(URL_ && TOKEN);
export const addSubscriber = (id) => redis('SADD', KEY, String(id));
export const removeSubscriber = (id) => redis('SREM', KEY, String(id));
export const listSubscribers = async () => (await redis('SMEMBERS', KEY)) || [];

// 웹훅 요청이 진짜 텔레그램에서 왔는지 확인하는 값 (봇 토큰에서 만들어서 따로 설정할 필요 없음)
export const webhookSecret = (token) => createHash('sha256').update(`webhook:${token}`).digest('hex').slice(0, 48);
