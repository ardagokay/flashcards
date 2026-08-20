/* ==========================================================================
   Kelime Destesi — Netlify Function: IP tabanlı ilerleme kaydı
   --------------------------------------------------------------------------
   - GET  → ziyaretçinin IP'sine ait kayıtlı durumu döndürür (veya boş şema)
   - PUT  → ziyaretçinin IP'sine ait durumu Blobs'a yazar
   - Bir IP'ye ait veri, o IP'den gelen her cihazda erişilebilir.
     (IP adresleri tutulmaz: key, IP'nin tuzlu SHA-256 karmasıdır.)
   --------------------------------------------------------------------------
   v2 API: export default async (req, context) — Netlify runtime Blobs
   context'ini (siteID, token, deployID, region) otomatik enjekte eder.
   ========================================================================== */
import { getStore } from '@netlify/blobs';
import crypto from 'crypto';

// Ortamda bir secret yoksa deterministik fallback (yalnızca local/üretim gizliliği için değil;
// amaç IP'yi düz metin olarak saklamamak).
const SALT = process.env.VOCAB_SALT || 'vocabdeck-local-salt';

function hashIp(ip) {
  return crypto.createHash('sha256').update(SALT + '|' + ip).digest('hex').slice(0, 32);
}

function getClientIp(req) {
  return (
    req.headers.get('x-nf-client-connection-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('client-ip') ||
    'unknown'
  );
}

const EMPTY = { v: 1, stats: {}, prefs: { auto: true, sound: true }, updated: 0 };

export default async (req) => {
  try {
    const store = getStore('vocabdeck');
    const key = 'ip_' + hashIp(getClientIp(req));
    const method = req.method || 'GET';

    if (method === 'PUT' || method === 'POST') {
      const body = await req.json().catch(() => ({}));
      const state = body.state && typeof body.state === 'object' ? body.state : EMPTY;
      const payload = JSON.stringify({ state, ts: Date.now() });
      await store.set(key, payload);
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: cors() });
    }

    // GET
    const raw = await store.get(key, { type: 'text' });
    const data = raw ? JSON.parse(raw) : { state: null, ts: 0 };
    if (!data.state || !data.state.stats) data.state = EMPTY;
    return new Response(JSON.stringify({ state: data.state, ts: data.ts || 0 }), { status: 200, headers: cors() });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'kv-fail' }), { status: 500, headers: cors() });
  }
};

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store'
  };
}
