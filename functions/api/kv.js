/* ==========================================================================
   Kelime Destesi — Cloudflare Pages Function: IP tabanlı ilerleme kaydı
   --------------------------------------------------------------------------
   - GET  → ziyaretçinin IP'sine ait kayıtlı durumu döndürür (veya boş şema)
   - PUT  → ziyaretçinin IP'sine ait durumu KV'ya yazar
   - POST → sendBeacon (beforeunload) yazması
   - Bir IP'ye ait veri, o IP'den gelen her cihazda erişilebilir.
     (IP adresleri tutulmaz: key, IP'nin tuzlu SHA-256 karmasıdır.)
   --------------------------------------------------------------------------
   KV binding adı: VOCAB  → wrangler.toml veya Cloudflare Pages > Settings > Functions > KV bindings
   Rota: /api/kv  (Pages Functions varsayılanı: /api/kv → functions/api/kv.js)
   ========================================================================== */

// Ortamda secret yoksa deterministik fallback (IP'yi düz metin saklamamak içindir).
// Üretimde Cloudflare Pages > Settings > Variables > VOCAB_SALT ile güçlendirilebilir.
const SALT = globalThis.VOCAB_SALT || 'vocabdeck-local-salt';

async function sha256(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function getClientIp(request) {
  // Cloudflare: CF-Connecting-IP her zaman en güvenilir olanıdır (sahtelenemez)
  return (
    request.headers.get('CF-Connecting-IP') ||
    request.headers.get('x-nf-client-connection-ip') || // eski Netlify başlığı (uyumluluk)
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  );
}

const EMPTY = { v: 1, stats: {}, prefs: { auto: false, sound: true }, updated: 0 };

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, PUT, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store'
  };
}

export async function onRequestGet(context) {
  return handle(context, 'GET');
}

export async function onRequestPut(context) {
  return handle(context, 'PUT');
}

export async function onRequestPost(context) {
  return handle(context, 'POST');
}

export async function onRequestOptions(context) {
  return new Response(null, { status: 204, headers: cors() });
}

async function handle(context, method) {
  const { request, env } = context;
  try {
    const store = env.VOCAB;
    if (!store) throw new Error('VOCAB binding yok');
    const key = 'ip_' + (await sha256(SALT + '|' + getClientIp(request)));

    if (method === 'PUT' || method === 'POST') {
      const body = await request.json().catch(() => ({}));
      const state = body.state && typeof body.state === 'object' ? body.state : EMPTY;
      const payload = JSON.stringify({ state, ts: Date.now() });
      await store.put(key, payload);
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: cors() });
    }

    // GET
    const raw = await store.get(key);
    const data = raw ? JSON.parse(raw) : { state: null, ts: 0 };
    if (!data.state || !data.state.stats) data.state = EMPTY;
    return new Response(JSON.stringify({ state: data.state, ts: data.ts || 0 }), { status: 200, headers: cors() });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'kv-fail', detail: String(e && e.message || e) }), { status: 500, headers: cors() });
  }
}
