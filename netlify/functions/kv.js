/* ==========================================================================
   Kelime Destesi — Netlify Function: IP tabanlı ilerleme kaydı
   --------------------------------------------------------------------------
   - GET  → ziyaretçinin IP'sine ait kayıtlı durumu döndürür (veya boş şema)
   - PUT  → ziyaretçinin IP'sine ait durumu Blobs'a yazar
   - Bir IP'ye ait veri, o IP'den gelen her cihazda erişilebilir.
     (IP adresleri tutulmaz: key, IP'nin tuzlu SHA-256 karmasıdır.)
   ========================================================================== */
'use strict';

const { getStore } = require('@netlify/blobs');
const crypto = require('crypto');

// Ortamda bir secret yoksa deterministik fallback (yalnızca local/üretim gizliliği için değil;
// amaç IP'yi düz metin olarak saklamamak).
const SALT = process.env.VOCAB_SALT || 'vocabdeck-local-salt';

function hashIp(ip) {
  return crypto.createHash('sha256').update(SALT + '|' + ip).digest('hex').slice(0, 32);
}

function getClientIp(event) {
  return (
    event.headers['x-nf-client-connection-ip'] ||
    event.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    event.headers['client-ip'] ||
    'unknown'
  );
}

const EMPTY = { v: 1, stats: {}, prefs: { auto: true, sound: true }, updated: 0 };

exports.handler = async (event) => {
  try {
    const store = getStore({ name: 'vocabdeck' });
    const key = 'ip_' + hashIp(getClientIp(event));
    // POST = sendBeacon (beforeunload) → yazma; PUT = fetch → yazma
    const method = event.httpMethod || 'GET';

    if (method === 'PUT' || method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const state = body.state && typeof body.state === 'object' ? body.state : EMPTY;
      const payload = JSON.stringify({ state, ts: Date.now() });
      await store.set(key, payload);
      return { statusCode: 200, headers: cors(), body: JSON.stringify({ ok: true }) };
    }

    // GET
    const raw = await store.get(key, { type: 'text' });
    const data = raw ? JSON.parse(raw) : { state: null, ts: 0 };
    if (!data.state || !data.state.stats) data.state = EMPTY;
    return { statusCode: 200, headers: cors(), body: JSON.stringify({ state: data.state, ts: data.ts || 0 }) };
  } catch (e) {
    return { statusCode: 500, headers: cors(), body: JSON.stringify({ error: 'kv-fail' }) };
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
