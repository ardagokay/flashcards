# 🗂️ Flashcards by Arda Gökay — Vocabulary for TEDÜ EPE

TEDÜ EPE akademik kelime bankası (A2 → C1) için **bol animasyonlu flashcard çalışma sitesi** — ✨ Created by Arda Gökay.

İlerlemen **IP adresinle senkronize** edilir: aynı ağdan girdiğinde her cihazda aynı yerden devam edersin.

## ✨ Özellikler

- **4 zorluk seviyesi:** A2 · B1 · B2 · C1 (+ karışık tüm seviyeler)
- **4 oyun modu:**
  - 🧠 **Akıllı Tekrar** — zorlandığın kelimeler daha sık karşına çıkar, doğru bildikçe hafifler
  - 🔀 **Rastgele** — tüm kelimeler karışık sırayla
  - ⌨️ **Yazma Modu** — Türkçe anlamı görüp İngilizce kelimeyi yazarsın
  - 🃏 **Hatırlama Modu** — şık yok, karta dokun → arka yüzü çevir, saf tekrar
- **Akıllı bağlantılı şıklar** (rastgele değil): anlamdaşlar, yakın anlam kardeşleri, aynı tür ve kafa karıştırıcı komşular bir arada
- **Otomatik geçiş** ayarı: açıkken doğru bilince sonraki karta geçer; kapalıyken her cevapta arka yüzü inceleyebilirsin
- **Animasyonlar:** kartı alta gömme ("eldeki kartı destenin en altına koyma") + 3D arka yüz çevirme + konfeti + ses efektleri
- **İstatistikler & ustalık:** her kelime için doğru/yanlış geçmişi, seri, ustalık durumu

## 🚀 Cloudflare Pages'e Yükleme

```bash
# 1. GitHub'a yükle
git add .
git commit -m "Flashcards by Arda Gökay — Cloudflare Pages"
git push -u origin main
```

# 2. Cloudflare Pages'da site kur
#    Dashboard > Workers & Pages > Create > Pages > Connect to Git
#    Repo: ardagokay/flashcards
#    Build command: (boş)     Output directory: (boş / kök dizin)

# 3. KV binding (IP senkronu için — tek seferlik):
#    npx wrangler login
#    npx wrangler kv namespace create VOCAB
#    → dönen id'yi şuraya yaz:
#      wrangler.toml → [[kv_namespaces]] id
#    Dashboard > Pages projesi > Settings > Functions > KV namespace bindings
#    → Variable name: VOCAB → yukarıdaki namespace'i seç

# 4. İsteğe bağlı: VOCAB_SALT değişkeni
#    Dashboard > Pages > Settings > Variables > Add: VOCAB_SALT = rastgele-uzun-metin
```

Pages Function (`/api/kv`) otomatik algılanır — `functions/api/kv.js`. IP, `CF-Connecting-IP` başlığından okunur ve tuzlu SHA-256 ile karma hâline getirilerek KV'da saklanır (düz IP saklanmaz).

## 🛠️ Yerel Çalıştırma

```bash
npm install
npm run dev        # wrangler pages dev . → http://localhost:8788
```

Testler:

```bash
npm test           # veri + sözdizimi + şık mantığı
npm run verify     # ayrıca şık üretici doğrulama
```

E2E testi (sunucu açıkken):

```bash
npx serve -l 4187 .
node tests/e2e.js
```

> Yerelde `/api/kv` 404 döner (wrangler dev ile function çalışır; düz serve ile 404) — bu beklenen davranıştır, bulut senkronu yalnızca Cloudflare'da devreye girer (localStorage yedeği her ortamda çalışır).

## 📄 Veri Kaynağı

Kelime listesi `vocabluary.pdf` dosyasından `parse.js` ile çıkarılmıştır (161 kelime, 2702 satır). Veri `data.js` içindedir — kelime, tür, seviye, ilk Türkçe anlam, tüm anlamlar, diğer halleri, örnek cümle ve eş anlamlılar.

## 🗂️ Dosya Yapısı

```
index.html                 # Tek sayfa uygulama iskeleti
styles.css                 # Gece masası teması + animasyonlar
data.js                    # 161 kelime (otomatik üretilir: node parse.js)
app.js                     # Oyun motoru + IP senkronu
parse.js                   # PDF → data.js dönüştürücü
functions/api/kv.js        # IP tabanlı ilerleme API'si (Cloudflare KV)
wrangler.toml              # Cloudflare Pages yapılandırması (KV binding)
_redirects                 # SPA fallback (bilinmeyen yollar → index.html)
tests/                     # verify.js, e2e.js, verify-flip-mode.mjs
```
