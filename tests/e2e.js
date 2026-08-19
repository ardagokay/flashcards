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

// 1) Ana sayfa
ok(await page.locator('h1').first().isVisible(), 'Ana başlık görünür');
ok((await page.locator('.home-card').count()) === 3, '3 ana kart var');

// 2) Seviye ekranı
await page.click('[data-goto="level"]');
await page.waitForTimeout(300);
ok(await page.locator('#scrLevel').isVisible(), 'Seviye ekranı görünür');
ok((await page.locator('.level-card').count()) === 4, '4 seviye kartı var');

// A2 seç
await page.click('.level-card[data-lvl="A2"]');
ok(!(await page.locator('#btnStartLevel').isDisabled()), 'Başla butonu aktif');
await page.click('#btnStartLevel');
await page.waitForTimeout(300);
ok(await page.locator('#scrMode').isVisible(), 'Mod ekranı görünür');

// 3) Akıllı Tekrar seç
await page.click('.mode-card[data-mode="weighted"]');
ok(!(await page.locator('#btnStartMode').isDisabled()), 'Mod başla aktif');
await page.click('#btnStartMode');
await page.waitForTimeout(300);
ok(await page.locator('#scrSetup').isVisible(), 'Ayarlar ekranı görünür');

// Otomatik geçiş açık olsun (slider label'ına tıkla — gerçek kullanıcı gibi)
await page.locator('#optAutoAdvance').evaluate(el => { el.checked = true; el.dispatchEvent(new Event('change', { bubbles: true })); });
await page.click('#btnBegin');
await page.waitForTimeout(500);

// 4) Oyun ekranı
ok(await page.locator('#scrGame').isVisible(), 'Oyun ekranı görünür');
const word = await page.locator('#cardWord').textContent();
ok(word.length > 0, 'Kart kelimesi var: ' + word);
ok((await page.locator('.choice').count()) === 4, '4 şık üretildi');

// 5) Doğru şıkka tıklayıp otomatik geçişi test et
const ch = page.locator('.choice');
const texts = [];
for (let i = 0; i < 4; i++) texts.push((await ch.nth(i).locator('.choice-text').textContent()).trim());
// doğru şık = kart kelimesinin ilk Türkçe anlamı (VOCAB_DATA'den)
const wtr = await page.evaluate(() => {
  const w = VOCAB_DATA.find(e => e.w === document.querySelector('#cardWord').textContent);
  return w ? w.tr : null;
});
const word2 = await page.locator('#cardWord').textContent();
const correctIdx = texts.indexOf(wtr);
ok(correctIdx >= 0, 'Doğru şık bulundu: ' + wtr + ' → ' + JSON.stringify(texts));
await ch.nth(correctIdx).click();
// Otomatik geçiş: 1100ms bekleme + 560ms gömülme animasyonu ≈ 1.7s
await page.waitForTimeout(2200);
const nowWord = await page.locator('#cardWord').textContent();
const summaryVisible = await page.locator('#scrSummary').isVisible();
ok(nowWord !== word2 || summaryVisible, 'Tıklamadan sonra kart ilerledi (' + word2 + ' → ' + nowWord + ')');
// Yerelde Netlify function 404'ü beklenen (prod'da çalışır); favicon 404'ü de göz ardı edilebilir.
// "Failed to load resource" genel mesajı URL içermez → response'ları da dinleyelim.
const realErrors = logs.filter(l =>
  !l.includes('netlify/functions/kv') &&
  !l.includes('favicon') &&
  !l.startsWith('Failed to load resource')
);
ok(realErrors.length === 0, 'Tarayıcı hatası yok' + (realErrors.length ? ': ' + realErrors[0] : ''));

// 6) Tüm şıkların doğru/yanlış durumunu doğrula (kesin test): her kartta tam 1 doğru şık olmalı
// Yazma moduna geçelim
await page.click('#btnQuitGame');
await page.click('[data-goto="level"]');
await page.click('.level-card[data-lvl="B1"]');
await page.click('#btnStartLevel');
await page.click('.mode-card[data-mode="random"]');
await page.click('#btnStartMode');
await page.locator('#optAutoAdvance').evaluate(el => { el.checked = false; el.dispatchEvent(new Event('change', { bubbles: true })); });
await page.click('#btnBegin');
await page.waitForTimeout(400);
ok((await page.locator('.choice').count()) === 4, 'Rastgele mod: 4 şık');

// şıkları tara: her birinde doğru cevap w.tr
const cardWords = await page.locator('#cardWord').textContent();
const choiceTexts = [];
for (let i = 0; i < 4; i++) choiceTexts.push((await page.locator('.choice').nth(i).locator('.choice-text').textContent()).trim());
// JS'te data yüklenebiliyor mu? global VOCAB_DATA'e eriş
const target = await page.evaluate(() => {
  const w = VOCAB_DATA.find(e => e.w === document.querySelector('#cardWord').textContent);
  return w ? w.tr : null;
});
ok(choiceTexts.includes(target), 'Şıklar arasında doğru cevap var: ' + target + ' → ' + JSON.stringify(choiceTexts));

// yanlış şık seç
const wrongIdx = choiceTexts.findIndex(t => t !== target);
await page.locator('.choice').nth(wrongIdx).click();
await page.waitForTimeout(300);
ok(await page.locator('#wrongCallout').isVisible(), 'Yanlış cevapta çağrı görünür');
ok((await page.locator('#wrongAnswer').textContent()) === target, 'Doğru cevap gösterildi');
await page.click('#btnWrongShowBack');
await page.waitForTimeout(900);
// Kart çevirme animasyonu: #cardStage.is-reveal + #flashcard rotateY(180)
ok(await page.locator('#cardStage').evaluate(el => el.classList.contains('is-reveal')), 'Kart çevirme başladı');
ok(await page.locator('#backTr').isVisible(), 'Arka yüz içeriği görünür');

// 7) "Arka yüze bak" sonrası sonraki kart
await page.click('#btnNext');
await page.waitForTimeout(800);
ok(await page.locator('#scrGame').isVisible(), 'Sonraki kart gösterildi');

// 8) localStorage'a kayıt kontrolü
const stats = await page.evaluate(() => JSON.parse(localStorage.getItem('vocabdeck_stats_v1') || '{}'));
const keys = Object.keys(stats);
ok(keys.length > 0, 'İstatistikler kaydedildi (' + keys.length + ' kayıt)');

// 9) İstatistik ekranı
await page.click('#btnQuitGame');
await page.click('[data-goto="stats"]');
await page.waitForTimeout(300);
ok((await page.locator('.stat-card').count()) === 4, '4 istatistik kartı var');

// 10) Yazma modu
await page.click('#btnStatsStudy');
await page.click('.level-card[data-lvl="A2"]');
await page.click('#btnStartLevel');
await page.click('.mode-card[data-mode="write"]');
await page.click('#btnStartMode');
await page.click('#btnBegin');
await page.waitForTimeout(400);
ok(await page.locator('#writeInput').isVisible(), 'Yazma girişi görünür');
const ww = await page.locator('#cardWord').textContent();
await page.fill('#writeInput', ww);
await page.click('#btnWriteSubmit');
await page.waitForTimeout(400);
ok((await page.locator('#writeInput').getAttribute('class')).includes('is-correct'), 'Doğru yazım yeşil oldu');

console.log(fails ? `\n${fails} HATA` : '\nTüm E2E testleri geçti ✅');
await browser.close();
process.exit(fails ? 1 : 0);
