// parse.js — vocabluary.pdf → data.js dönüştürücü
// raw.txt (pdfjs çıktısı, sayfa blokları, tab-ayrılmış tokenlar) okuyup yapılandırılmış kelime listesi üretir.
import { readFileSync, writeFileSync } from 'fs';

const raw = readFileSync('raw.txt', 'utf8');
const pageBlocks = raw.split(/=== PAGE \d+ ===\n/).filter(s => s.trim().length > 0);

const LEVELS = ['A2', 'B1', 'B2', 'C1'];
// (verb), (noun), (verb/noun), (adj/adv) … — bölüm başlıkları ve kelime girişlerinde
const POS_RE = /^\(([\w\/]+)\)$/;

function clean(t) { return t.replace(/\s+$/, ''); }

const entries = [];
let warnings = [];

for (const block of pageBlocks) {
  const tokens = block.split('\t').map(clean).filter(t => t.length > 0);
  let i = 0;
  while (i < tokens.length) {
    const t = tokens[i];
    const posM = tokens[i + 1] ? tokens[i + 1].match(POS_RE) : null;
    const lvlM = tokens[i + 2] ? tokens[i + 2].trim() : null;
    if (posM && LEVELS.includes(lvlM)) {
      // Kelime girişi başladı
      const word = t.trim();
      const pos = posM[1].toLowerCase();
      const lvl = lvlM;
      i += 3;
      // 🇹🇷 bayrağını atla
      if (tokens[i] && tokens[i].replace(/🇹|🇷/g, '').trim() === '') i++;
      // Türkçe karşılıklar (komut başına kadar)
      let trParts = [];
      while (i < tokens.length && !tokens[i].startsWith('Diğer Halleri') && !tokens[i].startsWith('Örnek Cümle')) {
        trParts.push(tokens[i]); i++;
      }
      const trFull = trParts.join(' ').trim();
      if (!trFull) warnings.push(`EX: ${word} (${lvl}) turkish yok`);
      // Diğer Halleri
      let der = '';
      if (tokens[i] && tokens[i].startsWith('Diğer Halleri')) {
        i++;
        if (i < tokens.length && !tokens[i].startsWith('Örnek Cümle')) { der = tokens[i]; i++; }
      }
      // Örnek Cümle
      let exParts = [];
      if (tokens[i] && tokens[i].startsWith('Örnek Cümle')) {
        i++;
        while (i < tokens.length) {
          const n = tokens[i];
          // Yeni bir kelime girişi başlıyorsa dur
          const nm = tokens[i + 1] ? tokens[i + 1].match(POS_RE) : null;
          const nl = tokens[i + 2] ? tokens[i + 2].trim() : null;
          if (nm && LEVELS.includes(nl)) break;
          // Footer / bölüm başlığı ise dur
          if (n.startsWith('Sayfa ') || /^PTE & TEDÜ EPE/.test(n) || /SEVİYESİ/.test(n)) break;
          exParts.push(n); i++;
        }
      }
      const ex = exParts.join(' ').trim();
      if (!ex) warnings.push(`EX: ${word} (${lvl}) ornek yok`);
      // Anlamları parçala: "bağlamak, atfetmek / özellik" → ["bağlamak", "atfetmek", "özellik"]
      const means = trFull.split(/[,/]/).map(s => s.trim()).filter(Boolean);
      // İlk anlam (kullanıcı isteği: pdfdeki türkçe karşılığının ilki — "bağlamak")
      const first = means[0] || trFull.split(',')[0].trim();
      // Alt anlamlar (arka yüzde "bağlamak, atfetmek, özellik" gösterimi için)
      const alt = means.slice(1);
      entries.push({ w: word, pos, lvl, tr: first, all: trFull, means, alt, der, ex, syn: [] });
      if (i >= tokens.length) break;
    } else {
      i++;
    }
  }
}

// Validasyonlar
const counts = {};
for (const e of entries) counts[e.lvl] = (counts[e.lvl] || 0) + 1;
const dupes = [];
const seen = new Set();
for (const e of entries) {
  const k = e.w.toLowerCase() + '|' + e.lvl;
  if (seen.has(k)) dupes.push(k);
  seen.add(k);
}

console.log('TOPLAM:', entries.length, counts);
console.log('UYARILAR:', warnings.length ? warnings.slice(0, 30) : 'yok');
console.log('AYNI KELIME+SEVIYE TEKRARI:', dupes.length ? dupes.slice(0, 20) : 'yok');
console.log('ÖRNEK İLK 8:');
for (const e of entries.slice(0, 8)) console.log(JSON.stringify(e));

// data.js olarak yaz
const js = '// Otomatik üretildi: parse.js çalıştırılarak oluşturuldu. El ile düzenlemeyin.\n' +
  'const VOCAB_DATA = ' + JSON.stringify(entries, null, 1) + ';\n';
writeFileSync('data.js', js, 'utf8');
console.log('data.js yazıldı,', entries.length, 'kelime');
