/* tests/e2e.js — gerçek tarayıcıda uçtan uca akış testi (Playwright) */
import { chromium } from 'playwright';

const BASE = 'http://localhost:4187';
let fails = 0;
const ok = (c, m) => { if (c) console.log('  ✓', m); else { fails++; console.error('  ✗', m); } };

const browser = await chromium.launch();
const page = await browser.newPage();
const logs = [];
page.on('console', m => { if (m.type() === 'error') logs.push(m.text()); });
page.on('pageerror', e => logs.push('PAGEERROR: ' + e.message));

await page.goto(BASE, { waitUntil: 'networkidle' });

// 1) Ana sayfa — seviye kartları doğrudan ortada
ok(await page.locator('h1').first().isVisible(), 'Ana başlık görünür');
ok((await page.locator('#homeLevelGrid .level-card').count()) === 5, '5 seviye kartı (🔀+A2/B1/B2/C1)');
ok(await page.locator('#socialWhatsapp').isVisible(), 'WhatsApp butonu görünür');
ok(await page.locator('#socialInstagram').isVisible(), 'Instagram butonu görünür');
ok(await page.locator('#btnTheme').isVisible(), 'Tema butonu görünür');

// 2) Tema değiştirici
const themeBefore = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());
await page.click('#btnTheme');
await page.waitForTimeout(300);
const themeAfter = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());
ok(themeBefore !== themeAfter, 'Tema değişti (' + themeBefore + ' → ' + themeAfter + ')');

// 3) A2 seviye kartı → mod ekranı
await page.click('.level-card[data-lvl="A2"]');
await page.waitForTimeout(300);
ok(await page.locator('#scrMode').isVisible(), 'Mod ekranı görünür');
ok((await page.locator('.mode-card').count()) === 4, '4 oyun modu var');

// 4) Akıllı Tekrar seç → ayarlar
await page.click('.mode-card[data-mode="weighted"]');
ok(!(await page.locator('#btnStartMode').isDisabled()), 'Mod başla aktif');
await page.click('#btnStartMode');
await page.waitForTimeout(300);
ok(await page.locator('#scrSetup').isVisible(), 'Ayarlar ekranı görünür');

// Otomatik geçiş VARSYILAN KAPALI olmalı
ok(!(await page.locator('#optAutoAdvance').isChecked()), 'Otomatik geçiş varsayılan kapalı');

// 5) Oyun ekranı
await page.click('#btnBegin');
await page.waitForTimeout(500);
ok(await page.locator('#scrGame').isVisible(), 'Oyun ekranı görünür');
const word = await page.locator('#cardWord').textContent();
ok(word.length > 0, 'Kart kelimesi var: ' + word);
ok((await page.locator('.choice').count()) === 4, '4 şık üretildi');
// yazma kutusu GÖRÜNMEMELİ (bug #2 düzeltmesi)
ok(!(await page.locator('#writeBox').isVisible()), 'Yazma kutusu gizli (bug #2)');

// 6) Doğru şıkka tıklayıp otomatik geçişi test et (auto kapalı → sonraki kart butonu görünür)
const ch = page.locator('.choice');
const texts = [];
for (let i = 0; i < 4; i++) texts.push((await ch.nth(i).locator('.choice-text').textContent()).trim());
const wtr = await page.evaluate(() => {
  const w = VOCAB_DATA.find(e => e.w === document.querySelector('#cardWord').textContent);
  return w ? w.tr : null;
});
const word2 = await page.locator('#cardWord').textContent();
const correctIdx = texts.indexOf(wtr);
ok(correctIdx >= 0, 'Doğru şık bulundu: ' + wtr + ' → ' + JSON.stringify(texts));
await ch.nth(correctIdx).click();
await page.waitForTimeout(700);
// auto kapalı → #btnNext görünür olmalı
ok(await page.locator('#btnNext').isVisible(), 'Sonraki kart butonu görünür (auto kapalı)');
await page.click('#btnNext');
await page.waitForTimeout(900);
const nowWord = await page.locator('#cardWord').textContent();
ok(nowWord !== word2, 'Sonraki karta geçildi (' + word2 + ' → ' + nowWord + ')');

// 7) Yanlış şık → arka yüz otomatik döner, doğru cevap arka yüzde görünür
const ch2 = page.locator('.choice');
const texts2 = [];
for (let i = 0; i < 4; i++) texts2.push((await ch2.nth(i).locator('.choice-text').textContent()).trim());
const target2 = await page.evaluate(() => {
  const w = VOCAB_DATA.find(e => e.w === document.querySelector('#cardWord').textContent);
  return w ? w.tr : null;
});
const wrongIdx2 = texts2.findIndex(t => t !== target2);
await ch2.nth(wrongIdx2).click();
await page.waitForTimeout(1300);
ok(await page.locator('#cardStage').evaluate(el => el.classList.contains('is-reveal')), 'Yanlışta kart otomatik arka yüze döndü');
ok(await page.locator('#backTr').isVisible(), 'Arka yüz içeriği görünür');
ok((await page.locator('#backTr').textContent()).includes(target2), 'Arka yüzde doğru cevap görünür');
ok(await page.locator('#btnNext').isVisible(), 'Sonraki kart butonu görünür');
await page.click('#btnNext');
await page.waitForTimeout(800);
ok(await page.locator('#scrGame').isVisible(), 'Sonraki kart gösterildi');

// 8) Atla (cevapsız) — arka yüzü gösterir sonra geçer
await page.click('#btnSkip');
await page.waitForTimeout(300);
ok(await page.locator('#cardStage').evaluate(el => el.classList.contains('is-reveal')), 'Atla: arka yüz gösterildi');
// cevap verilmeden sonraki kart butonu görünmez (atla otomatik geçirir)
ok(!(await page.locator('#btnNext').isVisible()), 'Atla: sonraki kart butonu görünmez');
await page.waitForTimeout(1300);
const afterSkip = await page.locator('#cardWord').textContent();
ok(afterSkip.length > 0, 'Atla: sıradaki karta geçildi');

// 9) localStorage kaydı
const stats = await page.evaluate(() => JSON.parse(localStorage.getItem('vocabdeck_stats_v1') || '{}'));
const keys = Object.keys(stats);
ok(keys.length > 0, 'İstatistikler kaydedildi (' + keys.length + ' kayıt)');

// 10) Çıkış → istatistikler
await page.click('#btnQuitGame');
await page.waitForTimeout(200);
await page.click('#btnHomeStats');
await page.waitForTimeout(300);
ok((await page.locator('.stat-card').count()) === 4, '4 istatistik kartı var');

// 11) Yazma modu (bug #5: Türkçe karşılık da kabul edilmeli)
await page.click('#btnStatsStudy');
await page.waitForTimeout(300);
await page.click('.level-card[data-lvl="A2"]');
await page.waitForTimeout(300);
await page.click('.mode-card[data-mode="write"]');
await page.click('#btnStartMode');
await page.click('#btnBegin');
await page.waitForTimeout(400);
ok(await page.locator('#writeInput').isVisible(), 'Yazma girişi görünür');
// şıklar GÖRÜNMEMELİ (bug #2)
ok(!(await page.locator('#choices').isVisible()), 'Şıklar gizli (bug #2)');
// Türkçe karşılığı yaz (w.tr) — bug #5
const tr = await page.evaluate(() => VOCAB_DATA.find(e => e.w === document.querySelector('#cardWord').textContent).tr);
await page.fill('#writeInput', tr);
await page.click('#btnWriteSubmit');
await page.waitForTimeout(400);
ok((await page.locator('#writeInput').getAttribute('class')).includes('is-correct'), 'Türkçe karşılık kabul edildi (bug #5)');
// Ek anlam (w.alt) da kabul edilmeli — örn. kabul etmek → "onaylamak"
await page.click('#btnNext');
await page.waitForTimeout(800);
const altWord = await page.evaluate(() => {
  const w = VOCAB_DATA.find(e => e.w === document.querySelector('#cardWord').textContent);
  return w && w.alt && w.alt[0] ? w.alt[0] : null;
});
if (altWord) {
  await page.fill('#writeInput', altWord);
  await page.click('#btnWriteSubmit');
  await page.waitForTimeout(400);
  ok((await page.locator('#writeInput').getAttribute('class')).includes('is-correct'), 'Ek anlam kabul edildi (w.alt): ' + altWord);
} else {
  console.log('  (w.alt bulunamadı — bu kartta alt anlam yok, atlandı)');
}

// Yerelde function 404'ü beklenen (prod'da çalışır); favicon 404'ü de göz ardı edilebilir.
const realErrors = logs.filter(l =>
  !l.includes('/api/kv') &&
  !l.includes('favicon') &&
  !l.startsWith('Failed to load resource')
);
ok(realErrors.length === 0, 'Tarayıcı hatası yok' + (realErrors.length ? ': ' + realErrors[0] : ''));

console.log(fails ? `\n${fails} HATA` : '\nTüm E2E testleri geçti ✅');
await browser.close();
process.exit(fails ? 1 : 0);
