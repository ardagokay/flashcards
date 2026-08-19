# 🗂️ Flashcards by Arda Gökay — Vocabulary for TEDÜ EPE

TEDÜ EPE akademik kelime bankası (A2 → C1) için **bol animasyonlu flashcard çalışma sitesi** — ✨ Created by Arda Gökay.

İlerlemen **IP adresinle senkronize** edilir: aynı ağdan girdiğinde her cihazda aynı yerden devam edersin.

## ✨ Özellikler

- **4 zorluk seviyesi:** A2 · B1 · B2 · C1 (+ karışık tüm seviyeler)
- **3 oyun modu:**
  - 🧠 **Akıllı Tekrar** — zorlandığın kelimeler daha sık karşına çıkar, doğru bildikçe hafifler
  - 🔀 **Rastgele** — tüm kelimeler karışık sırayla
  - ⌨️ **Yazma Modu** — Türkçe anlamı görüp İngilizce kelimeyi yazarsın
- **Akıllı bağlantılı şıklar** (rastgele değil): anlamdaşlar, yakın anlam kardeşleri, aynı tür ve kafa karıştırıcı komşular bir arada
- **Otomatik geçiş** ayarı: açıkken doğru bilince sonraki karta geçer; kapalıyken her cevapta arka yüzü inceleyebilirsin
- **Animasyonlar:** kartı alta gömme ("eldeki kartı destenin en altına koyma") + 3D arka yüz çevirme + konfeti + ses efektleri
- **İstatistikler & ustalık:** her kelime için doğru/yanlış geçmişi, seri, ustalık durumu

## 🚀 Netlify'a Yükleme

```bash
# 1. GitHub'a yükle
git init
git add .
git commit -m "Flashcards by Arda Gökay — v1"
git remote add origin https://github.com/KULLANICI-ADI/kelime-destesi.git
git push -u origin main

# 2. Netlify'da site kur
#    Build settings:  Build command: (boş)   Publish directory: .
#    Function desteği otomatik algılanır (netlify/functions/kv)
```

Netlify Function'un çalışması için **herhangi bir ayar gerekmez** — `@netlify/blobs` paketi `package.json`'da mevcut ve Netlify Build'de otomatik yüklenir.

İstersen ilerleme kaydını kişiselleştirmek için bir ortam değişkeni ekleyebilirsin:
`VOCAB_SALT` → IP karmasında kullanılan tuz (opsiyonel, varsayılan `vocabdeck-local-salt`).

## 🛠️ Yerel Çalıştırma

```bash
npm install
npm start        # http://localhost:3000
```

Testler:

```bash
npm test          # veri + sözdizimi + şık mantığı
npm run verify    # ayrıca şık üretici doğrulama
```

E2E testi (sunucu açıkken):

```bash
npx serve -l 4187 .
node tests/e2e.js
```

> Yerelde `.netlify/functions/kv` 404 döner — bu beklenen davranıştır, bulut senkronu yalnızca Netlify'da devreye girer (localStorage yedeği her ortamda çalışır).

## 📄 Veri Kaynağı

Kelime listesi `vocabluary.pdf` dosyasından `parse.js` ile çıkarılmıştır (161 kelime, 2702 satır). Veri `data.js` içindedir — kelime, tür, seviye, ilk Türkçe anlam, tüm anlamlar, diğer halleri, örnek cümle ve eş anlamlılar.

## 🗂️ Dosya Yapısı

```
index.html                 # Tek sayfa uygulama iskeleti
styles.css                 # Gece masası teması + animasyonlar
data.js                    # 161 kelime (otomatik üretilir: node parse.js)
app.js                     # Oyun motoru + IP senkronu
parse.js                   # PDF → data.js dönüştürücü
netlify/functions/kv.js    # IP tabanlı ilerleme API'si (Netlify Blobs)
netlify.toml               # Netlify yapılandırması
tests/                     # verify.js, choices-test.js, e2e.js
```
