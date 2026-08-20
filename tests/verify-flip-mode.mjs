import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
let fails = 0;
const ok = (c, m) => { if (c) console.log('  ✓', m); else { fails++; console.error('  ✗', m); } };

await page.goto('http://localhost:4187/', { waitUntil: 'networkidle' });
await page.waitForTimeout(300);

// --- 1) Mod ekranında Hatırlama kartı var ve seçince açıklama çıkıyor ---
await page.click('.level-card[data-lvl="A2"]');
await page.waitForTimeout(200);
const modeCards = await page.locator('.mode-card').count();
ok(modeCards === 4, '4 mod kartı var (Akıllı/Rastgele/Yazma/Hatırlama)');
ok(await page.locator('.mode-card[data-mode="flip"]').isVisible(), 'Hatırlama modu kartı görünür');

await page.click('.mode-card[data-mode="flip"]');
await page.waitForTimeout(200);
ok(!(await page.locator('#modeNote').isHidden()), 'Mod açıklaması görünür (modeNote)');
const noteText = (await page.locator('#modeNote').textContent()).trim();
ok(noteText.includes('Nasıl çalışır') || noteText.length > 40, 'Açıklama metni dolu');
ok(await page.locator('#btnStartMode').isEnabled(), 'Başla butonu etkin');

// Rastgele moda geçince açıklama gizlenir
await page.click('.mode-card[data-mode="random"]');
await page.waitForTimeout(200);
ok(await page.locator('#modeNote').isHidden(), 'Rastgele modda açıklama gizli');

// Hatırlama moduna geri dön
await page.click('.mode-card[data-mode="flip"]');

// --- 2) Hazırlık ekranı: otomatik geçiş devre dışı + ipucu satırı ---
await page.click('#btnStartMode');
await page.waitForTimeout(200);
ok(await page.locator('#optAutoAdvance').isDisabled(), 'Hatırlama modunda otomatik geçiş devre dışı');
ok(!(await page.locator('#optAutoAdvance').isChecked()), 'Otomatik geçiş kapalı');
const setupInfo = (await page.locator('.setup-card').last().textContent()).trim();
ok(setupInfo.includes('ipucu') && setupInfo.includes('Sonraki kart'), 'Hatırlama modu ipucu satırı var');

// --- 3) Oyun: kart açık, şık yok, tıklayınca arka yüz dönüyor ---
await page.click('#btnBegin');
await page.waitForTimeout(600);
ok(await page.locator('#scrGame').isVisible(), 'Oyun ekranı görünür');
ok(await page.locator('#choices').isHidden(), 'Şık yok (choices gizli)');
ok(await page.locator('#writeBox').isHidden(), 'Yazma kutusu yok');
ok(await page.locator('#flipHint').isVisible(), 'Kart çevirme ipucu görünür');
ok(await page.locator('#btnNext').isHidden(), 'Ön yüzdeyken "Sonraki kart" gizli');
ok(await page.locator('#btnSkip').isVisible(), 'Atla görünür');

const frontWord = (await page.locator('#cardWord').textContent()).trim();
ok(frontWord.length > 0, 'Kartın ön yüzünde kelime var: ' + frontWord);

await page.click('#flashcard');
await page.waitForTimeout(800);
ok((await page.locator('#cardStage').getAttribute('class')).includes('is-reveal'), 'Karta tıklayınca arka yüz döndü');
ok(await page.locator('#btnNext').isVisible(), 'Arka yüzden sonra "Sonraki kart →" görünür');
ok(await page.locator('#btnSkip').isHidden(), 'Atla gizlendi');

const backWord = (await page.locator('#backWord').textContent()).trim();
ok(backWord === frontWord, 'Arka yüzde aynı kelime var');

// --- 4) İleri git → yeni kart ön yüzü ---
await page.click('#btnNext');
await page.waitForTimeout(800);
ok(!(await page.locator('#cardStage').getAttribute('class')).includes('is-reveal'), 'Sonraki kart ön yüzünde (reveal kalktı)');
ok(await page.locator('#flipHint').isVisible(), 'Yeni kartta ipucu geri geldi');
const frontWord2 = (await page.locator('#cardWord').textContent()).trim();
ok(frontWord2 !== frontWord, 'Başka bir kartın ön yüzü geldi: ' + frontWord2);

// --- 5) Atla: arka yüzü gösterir, otomatik geçmez ---
await page.click('#btnSkip');
await page.waitForTimeout(1300);
ok((await page.locator('#cardStage').getAttribute('class')).includes('is-reveal'), 'Atla → arka yüz açıldı');
ok(await page.locator('#btnNext').isVisible(), 'Atla sonrası "Sonraki kart →" görünür (otomatik geçmez)');

// --- 6) Seçim modunda atla: otomatik geçiş kapalıyken de arka yüz + sonraki kart ---
await page.click('#btnQuitGame');
await page.waitForTimeout(300);
await page.click('.level-card[data-lvl="A2"]');
await page.waitForTimeout(200);
await page.click('.mode-card[data-mode="random"]');
await page.click('#btnStartMode');
await page.waitForTimeout(200);
await page.click('#btnBegin');
await page.waitForTimeout(600);

const skipWord = (await page.locator('#cardWord').textContent()).trim();
ok(skipWord.length > 0, 'Yeni rastgele oyunda kart var: ' + skipWord);
await page.click('#btnSkip');
await page.waitForTimeout(1300);
ok((await page.locator('#cardStage').getAttribute('class')).includes('is-reveal'), 'Seçim modu atla → arka yüz açıldı');
ok(await page.locator('#btnNext').isVisible(), 'Seçim modu atla → "Sonraki kart →" görünür');
ok(await page.locator('#btnSkip').isHidden(), 'Atla artık gizli');
const sameWordAfterSkip = await page.evaluate(() => document.getElementById('cardWord').textContent.trim());
ok(sameWordAfterSkip === skipWord, 'Atla sonrası aynı kartın arkasında bekle');

await browser.close();
console.log(fails ? `\n${fails} HATA` : '\nTüm yeni akış kontrolleri geçti ✅');
process.exit(fails ? 1 : 0);
