import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
});
const page = await ctx.newPage();
let fails = 0;
const ok = (c, m) => { if (c) console.log('  ✓', m); else { fails++; console.error('  ✗', m); } };

await page.goto('http://localhost:4187/', { waitUntil: 'networkidle' });
await page.waitForTimeout(400);

ok(await page.evaluate(() => document.documentElement.classList.contains('mob')), 'html.mob sınıfı var (mobil tespit)');

const lvlCards = page.locator('#homeLevelGrid .level-card');
const count = await lvlCards.count();
ok(count === 5, '5 seviye kartı var');
const cardH = await lvlCards.first().evaluate(el => el.getBoundingClientRect().height);
ok(cardH >= 70, 'Seviye kartı mobilde yeterince büyük (h=' + Math.round(cardH) + 'px)');

const brandVisible = await page.locator('.brand-text').isVisible();
ok(!brandVisible, 'Mobilde marka metni gizli (ikon-only)');
const waVisible = await page.locator('#socialWhatsapp').isVisible();
ok(waVisible, 'WhatsApp ikonu görünür');
const waHref = await page.locator('#socialWhatsapp').getAttribute('href');
ok(waHref === 'https://wa.me/905383751633', 'WhatsApp linki: ' + waHref);
const igHref = await page.locator('#socialInstagram').getAttribute('href');
ok(igHref === 'https://instagram.com/ardagky01', 'Instagram linki: ' + igHref);

await page.click('.level-card[data-lvl="A2"]');
await page.waitForTimeout(300);
await page.click('.mode-card[data-mode="random"]');
await page.click('#btnStartMode');
await page.waitForTimeout(200);
await page.click('#btnBegin');
await page.waitForTimeout(600);

ok(await page.locator('#scrGame').isVisible(), 'Oyun ekranı görünür');
const interactPos = await page.locator('#interact').evaluate(el => {
  const r = el.getBoundingClientRect();
  return { top: r.top, bottom: r.bottom, vh: window.innerHeight };
});
ok(interactPos.bottom <= interactPos.vh + 2, 'Etkileşim barı ekran altında (bottom=' + Math.round(interactPos.bottom) + ' vh=' + interactPos.vh + ')');

ok(await page.locator('#btnSkip').isVisible(), 'Atla butonu görünür');
ok((await page.locator('#btnShowBack').count()) === 0, 'Arka yüze bak butonu kaldırıldı');
ok(await page.locator('#flashcard').isVisible(), 'Kart görünür');

console.log(fails ? `\n${fails} HATA` : '\nMobil düzen kontrolleri geçti ✅');
await browser.close();
process.exit(fails ? 1 : 0);
