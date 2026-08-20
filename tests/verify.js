/* tests/verify.js — veri + sözdizimi bütünlüğü kontrolü */
import { readFileSync } from 'fs';
import { execSync } from 'child_process';

let fails = 0;
const ok = (cond, msg) => {
  if (cond) console.log('  ✓', msg);
  else { fails++; console.error('  ✗', msg); }
};

console.log('1) Sözdizimi (node --check):');
for (const f of ['data.js', 'app.js']) {
  try { execSync(`node --check "${f}"`, { stdio: 'pipe' }); ok(true, f + ' geçerli'); }
  catch (e) { ok(false, f + ' SÖZDİZİM HATASI: ' + e.message); }
}

console.log('2) Veri bütünlüğü (data.js):');
const src = readFileSync('data.js', 'utf8');
const m = src.match(/VOCAB_DATA = (\[.*\]);/s);
ok(!!m, 'VOCAB_DATA bulundu');
const arr = JSON.parse(m[1]);
ok(arr.length > 0, arr.length + ' kelime var');
ok(arr.length === new Set(arr.map(e => e.w + '|' + e.lvl)).size, 'kelime+seviye tekrarsız');

const lvls = ['A2', 'B1', 'B2', 'C1'];
const counts = {};
for (const e of arr) {
  ok(lvls.includes(e.lvl), e.w + ' seviyesi geçerli: ' + e.lvl);
  counts[e.lvl] = (counts[e.lvl] || 0) + 1;
  ok(!!e.w && typeof e.w === 'string', e.w + ' kelime alanı var');
  ok(!!e.tr && e.tr.length > 0, e.w + ' Türkçe anlamı var');
  ok(!!e.ex && e.ex.length > 10, e.w + ' örnek cümlesi var');
  ok(!!e.pos, e.w + ' POS var');
}
console.log('  seviye dağılımı:', JSON.stringify(counts));

console.log('3) Şık üretici (akıllı bağlantılı şıklar):');
// buildChoices'ı izole çalıştır
const appSrc = readFileSync('app.js', 'utf8');
const matchFns = appSrc.match(/buildChoices\(w, pool\)\s*{[\s\S]*?\n  }/);
ok(!!matchFns, 'buildChoices fonksiyonu bulundu');

// Rastgelelik testi: 2000 kere şık üret, her seferinde 4 benzersiz şık ve 1 doğru cevap olmalı
let bad = 0, total = 0;
for (const w of arr) {
  const pool = arr.filter(x => x !== w);
  for (let t = 0; t < 20; t++) {
    total++;
    const { choices, correct } = evalChoiceBuilder(w, pool, arr, appSrc);
    if (!choices || choices.length !== 4) { bad++; continue; }
    if (new Set(choices).size !== 4) { bad++; }
    if (choices[correct] !== w.tr) { bad++; }
  }
}
ok(bad === 0, `${total} üretimde ${bad} sorun (hepsi 4 benzersiz + doğru cevap içeriyor)`);

function evalChoiceBuilder(w, pool, arr, appSrc) {
  // app.js'deki buildChoices + siblingGroup'u ayıkla ve bir sandbox'ta çalıştır
  const fn = appSrc.match(/buildChoices\(w, pool\)\s*\{[\s\S]*?\n  \}/)[0];
  const sg = appSrc.match(/siblingGroup\(w, pool\)\s*\{[\s\S]*?\n  \}/)[0];
  const local = {
    Math, Set, Array, shuffle: (a) => {
      const x = a.slice();
      for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; }
      return x;
    }
  };
  const build = new Function('w', 'pool', 'shuffle', `
    const self = { siblingGroup: function ${sg}\n  };
    const buildChoices = function ${fn}\n  ;
    return buildChoices.call(self, w, pool);
  `);
  return build(w, pool, local.shuffle);
}

if (fails) { console.error(`\n${fails} hata!`); process.exit(1); }
console.log('\nTüm kontroller başarılı ✅');
