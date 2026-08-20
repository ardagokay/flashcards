# 🗂️ Flashcards by Arda Gökay — Vocabulary for TEDÜ EPE

TEDÜ EPE akademik kelime bankası (A2 → C1) için **bol animasyonlu flashcard çalışma sitesi** — ✨ Created by Arda Gökay.

İlerlemen **tarayıcının yerel deposunda (localStorage)** tutulur — her aygıtta kendi kaydınla devam edersin.

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

## 🚀 GitHub Pages'e Yükleme

```bash
# 1. GitHub'a yükle
git add .
git commit -m "Flashcards by Arda Gökay — GitHub Pages"
git push -u origin main

# 2. GitHub Pages'i aç (tek seferlik, repo sahibi):
#    GitHub > repo > Settings > Pages
#    Source: Deploy from a branch → Branch: main → / (root)
#    Site şu adreste yayına girer: https://ardagokay.github.io/flashcards/
```

> Not: GitHub Pages **statik** barındırır — sunucu tarafı yok. İlerleme yalnızca cihazında saklanır (localStorage); farklı cihazlar arası senkron yoktur.

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

## 📄 Veri Kaynağı

Kelime listesi `vocabluary.pdf` dosyasından `parse.js` ile çıkarılmıştır (161 kelime, 2702 satır). Veri `data.js` içindedir — kelime, tür, seviye, ilk Türkçe anlam, tüm anlamlar, diğer halleri, örnek cümle ve eş anlamlılar.

## 🗂️ Dosya Yapısı

```
index.html                 # Tek sayfa uygulama iskeleti
styles.css                 # Gece masası teması + animasyonlar
data.js                    # 161 kelime (otomatik üretilir: node parse.js)
app.js                     # Oyun motoru + yerel kayıt (localStorage)
parse.js                   # PDF → data.js dönüştürücü
tests/                     # verify.js, e2e.js, verify-flip-mode.mjs
```
