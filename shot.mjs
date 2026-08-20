import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4187/', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.screenshot({ path: 'desktop-home.png', fullPage: true });
// mobil
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
const mpage = await mctx.newPage();
await mpage.goto('http://localhost:4187/', { waitUntil: 'networkidle' });
await mpage.waitForTimeout(600);
await mpage.screenshot({ path: 'mobile-home.png', fullPage: true });
// mobil oyun
await mpage.click('.level-card[data-lvl="A2"]');
await mpage.waitForTimeout(300);
await mpage.click('.mode-card[data-mode="random"]');
await mpage.click('#btnStartMode');
await mpage.waitForTimeout(200);
await mpage.click('#btnBegin');
await mpage.waitForTimeout(700);
await mpage.screenshot({ path: 'mobile-game.png', fullPage: true });
await browser.close();
console.log('screenshots saved');
