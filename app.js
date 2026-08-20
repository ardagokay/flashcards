/* ==========================================================================
   Flashcards by Arda Gökay — app.js
   Vocabulary for TEDÜ EPE — A2→C1 Flashcard Çalışma Uygulaması

   - 4 oyun modu: Akıllı Tekrar / Rastgele / Yazma / Hatırlama
   - Yerel ilerleme kaydı: localStorage (statik barındırma — GitHub Pages)
   - Kart geçiş animasyonu: "desteyi yığ, kartı alta göm" + 3D çevirme
   - Tema değiştirici (5 tema) + animasyonlu imza
   ========================================================================== */
'use strict';

/* ================= KÜÇÜK YARDIMCILAR ================= */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

const storage = {
  get(k, d) {
    try {
      const v = localStorage.getItem(k);
      return v == null ? d : JSON.parse(v);
    } catch { return d; }
  },
  set(k, v) {
    try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* dolu */ }
  },
  remove(k) {
    try { localStorage.removeItem(k); } catch { /* boş */ }
  }
};

/* ================= VERİ ================= */
const POS_TR = { verb: 'fiil', noun: 'isim', adj: 'sıfat', adv: 'zarf', phrase: 'ifade' };

/* ================= TEMALAR ================= */
const THEMES = [
  {
    id: 'night', name: 'Gece',
    bg: '#0b0e17', bg2: '#10141f',
    ink: '#e9edf6', inkDim: '#9aa3b8',
    accent: '#7c5cff', accent2: '#00d9a6', accent3: '#ffb020',
    danger: '#ff5c74', ok: '#2ed9a4',
    cardBg: '#fbf7ef', cardInk: '#1b2436',
    panelAlpha: '0.045', lineAlpha: '0.09'
  },
  {
    id: 'ocean', name: 'Okyanus',
    bg: '#04121f', bg2: '#07202e',
    ink: '#e3f2fd', inkDim: '#8fb3cc',
    accent: '#38bdf8', accent2: '#2dd4bf', accent3: '#fbbf24',
    danger: '#fb7185', ok: '#34d399',
    cardBg: '#f0f9ff', cardInk: '#0f2740',
    panelAlpha: '0.05', lineAlpha: '0.11'
  },
  {
    id: 'forest', name: 'Orman',
    bg: '#0a1410', bg2: '#0f1e17',
    ink: '#e8f5ec', inkDim: '#8faea0',
    accent: '#4ade80', accent2: '#2dd4bf', accent3: '#facc15',
    danger: '#f87171', ok: '#4ade80',
    cardBg: '#f2fbf5', cardInk: '#123324',
    panelAlpha: '0.05', lineAlpha: '0.11'
  },
  {
    id: 'sunset', name: 'Gün Batımı',
    bg: '#1a0f1e', bg2: '#241226',
    ink: '#fdf0f3', inkDim: '#c0a3b2',
    accent: '#f472b6', accent2: '#fb923c', accent3: '#fde047',
    danger: '#f87171', ok: '#4ade80',
    cardBg: '#fff5f7', cardInk: '#3d1224',
    panelAlpha: '0.05', lineAlpha: '0.11'
  },
  {
    id: 'midnight', name: 'Gece Yarısı',
    bg: '#07090f', bg2: '#0c1018',
    ink: '#e6e9f2', inkDim: '#8f99b3',
    accent: '#818cf8', accent2: '#22d3ee', accent3: '#fbbf24',
    danger: '#f43f5e', ok: '#10b981',
    cardBg: '#f8fafc', cardInk: '#111827',
    panelAlpha: '0.04', lineAlpha: '0.08'
  }
];
function posTr(pos) {
  return (pos || '').split('/').map(p => POS_TR[p] || p).join('/');
}

/* ================= SES ================= */
const Sounds = {
  enabled: true,
  _ctx: null,
  _audio(t, f, d, g) {
    const a = new AudioContext();
    const o = a.createOscillator();
    const gn = a.createGain();
    o.type = t; o.frequency.value = f;
    gn.gain.setValueAtTime(g, a.currentTime);
    gn.gain.exponentialRampToValueAtTime(0.001, a.currentTime + d);
    o.connect(gn); gn.connect(a.destination);
    o.start(); o.stop(a.currentTime + d);
    o.onended = () => a.close();
  },
  ok() { if (this.enabled) { try { this._audio('sine', 660, .18, .12); setTimeout(() => this._audio('sine', 880, .2, .1), 90); } catch {} } },
  wrong() { if (this.enabled) { try { this._audio('sawtooth', 220, .28, .08); } catch {} } },
  flip() { if (this.enabled) { try { this._audio('triangle', 520, .12, .06); } catch {} } },
  done() { if (this.enabled) { try { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => this._audio('sine', f, .3, .1), i * 120)); } catch {} } }
};

/* ================= YEREL KAYIT =================
   GitHub Pages'de backend yoktur — ilerleme yalnızca tarayıcının
   localStorage'ında tutulur (aygıt başına). "Bulut" senkronu kaldırıldı;
   rozet basitçe "kaydedildi" durumunu gösterir. */
const Cloud = {
  state: 'ok',
  KEY: 'vocabdeck_state_v1',

  init() {
    this.updateUI('kaydedildi');
  },

  // Debounce: oyun sırasında her cevapta değil, duraklamada kaydet
  async save(force) {
    if (!force) {
      clearTimeout(this._saveT);
      this._saveT = setTimeout(() => this.save(true), 2500);
      return;
    }
    storage.set('vocabdeck_state_v1', appState());
    this.state = 'ok';
    this.updateUI('kaydedildi');
  },

  updateUI(text) {
    const badge = $('#syncBadge');
    if (!badge) return;
    badge.classList.remove('hidden');
    badge.classList.remove('is-error', 'is-loading');
    if (this.state === 'error') badge.classList.add('is-error');
    if (this.state === 'loading') badge.classList.add('is-loading');
    $('#syncText').textContent = text;
  }
};

/* ================= UYGULAMA DURUMU ================= */
const DEFAULTS = {
  v: 1,
  stats: {},               // { 'accept|A2': {n:12, c:9, w:3, streak:2, mastered:true, mastery:3} }
  prefs: { auto: false, sound: true },  // otomatik geçiş varsayılan KAPALI
  updated: 0
};

function appState() {
  return {
    v: 1,
    stats: app.stats,
    prefs: app.prefs,
    updated: Date.now()
  };
}

/* ================= ANA UYGULAMA ================= */
const app = {
  screen: 'home',
  lvl: null,
  mode: null,
  cards: [],
  weights: new Map(),
  queue: [],
  pos: 0,
  ans: [],               // şık listesi
  cur: null,             // { w, pos, lvl, tr, alt, der, ex, means, syn }
  selected: null,        // { i, correct, ans }
  streak: 0,
  stats: {},
  prefs: { auto: false, sound: true },
  theme: 'night',
  statsDirty: false,
  busy: false,

  /* ---------- BAŞLANGIÇ ---------- */
  init() {
    this.stats = storage.get('vocabdeck_stats_v1', {});
    const prefs = storage.get('vocabdeck_prefs_v1', {});
    this.prefs = Object.assign({}, DEFAULTS.prefs, prefs);
    this.theme = storage.get('vocabdeck_theme_v1', 'night');

    this.cache = {};
    for (const w of VOCAB_DATA) {
      const key = w.w + '|' + w.lvl;
      this.cache[key] = w;
      if (!this.stats[key]) this.stats[key] = { n: 0, c: 0, w: 0, streak: 0, mastered: false, mastery: 0 };
    }
    // eski kayıtları temizle (veri setinde artık olmayanlar)
    for (const k of Object.keys(this.stats)) {
      if (!this.cache[k]) delete this.stats[k];
    }

    this.bind();
    this.applyPrefs();
    this.applyTheme();
    this.renderLevels();
    this.renderStats();
    this.show('home');

    Cloud.init();
  },

  /* ---------- OLAY BAĞLAMA ---------- */
  bind() {
    // Ekran geçişleri
    $$('[data-goto]').forEach(el => {
      el.addEventListener('click', () => this.show(el.dataset.goto));
    });
    $('#btnHome').addEventListener('click', () => this.show('home'));
    $('#btnQuitGame').addEventListener('click', () => this.quitGame());
    $('#btnReset').addEventListener('click', () => this.resetAll());

    // Ana ekran → istatistikler
    $('#btnHomeStats').addEventListener('click', () => this.show('stats'));
    $('#btnHomeStatsAcc').addEventListener('click', () => this.show('stats'));
    $('#btnHomeStatsSeen').addEventListener('click', () => this.show('stats'));

    // Mod seçimi
    $('#btnStartMode').addEventListener('click', () => this.startMode());
    $$('.mode-card').forEach(el => {
      el.addEventListener('click', () => {
        $$('.mode-card').forEach(e => e.classList.remove('is-selected'));
        el.classList.add('is-selected');
        this.mode = el.dataset.mode;
        $('#btnStartMode').disabled = false;
        this.renderModeNote();
      });
    });

    // Tema değiştirici
    $('#btnTheme').addEventListener('click', () => this.cycleTheme());

    // İletişim (Arda'nın gerçek adresleri)
    const wa = $('#socialWhatsapp');
    if (wa && wa.getAttribute('href') === 'https://wa.me/') {
      wa.href = 'https://wa.me/905383751633'; // Arda'nın WhatsApp numarası
    }
    const ig = $('#socialInstagram');
    if (ig && ig.getAttribute('href') === 'https://instagram.com/') {
      ig.href = 'https://instagram.com/ardagky01'; // Arda'nın Instagram kullanıcı adı
    }

    // Ayarlar
    $('#optAutoAdvance').addEventListener('change', e => {
      this.prefs.auto = e.target.checked; this.savePrefs();
    });
    $('#optSound').addEventListener('change', e => {
      this.prefs.sound = e.target.checked; Sounds.enabled = e.target.checked; this.savePrefs();
    });
    $('#btnSpeakSetup').addEventListener('click', () => this.speak('vocabulary'));

    $('#btnBegin').addEventListener('click', () => this.begin());

    // Oyun
    $('#btnSpeak').addEventListener('click', () => this.speakWord());
    $('#btnNext').addEventListener('click', () => this.nextCard());
    $('#btnSkip').addEventListener('click', () => this.skipCard());
    // Hatırlama modu: karta dokun → arka yüzü çevir
    $('#flashcard').addEventListener('click', () => this.flipCard());
    $('#btnWriteSubmit').addEventListener('click', () => this.checkWrite());
    $('#writeInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') { e.preventDefault(); this.checkWrite(); }
    });

    // Özet
    $('#btnRetry').addEventListener('click', () => this.begin());
    $('#btnStatsStudy').addEventListener('click', () => this.show('home'));

    // Klavye
    document.addEventListener('keydown', (e) => this.onKey(e));
  },

  /* ---------- EKRAN GEÇİŞİ ---------- */
  show(name) {
    this.screen = name;
    $$('.screen').forEach(s => { s.hidden = s.dataset.screen !== name; });
    window.scrollTo(0, 0);
    if (name === 'home') { this.renderLevels(); this.renderHomeStats(); }
    if (name === 'stats') this.renderStats();
    if (name === 'mode' && !this.lvl) this.lvl = 'all'; // güvenlik: seviye yoksa tümü
    if (name === 'game' && window.__computeCardH) requestAnimationFrame(window.__computeCardH);
  },

  /* Ana ekran üstündeki istatistik şeridi */
  renderHomeStats() {
    let mastered = 0, seen = 0, totalAns = 0, totalCorrect = 0;
    for (const k of Object.keys(this.stats)) {
      const st = this.stats[k];
      if (!st) continue;
      if (st.n > 0) seen++;
      if (st.mastered) mastered++;
      totalAns += st.n || 0;
      totalCorrect += st.c || 0;
    }
    const acc = totalAns ? Math.round((totalCorrect / totalAns) * 100) : 0;
    const set = (id, v) => { const el = $(id); if (el) el.textContent = v; };
    set('#hsMastered', mastered);
    set('#hsSeen', seen);
    set('#hsAccuracy', '%' + acc);
  },

  /* ---------- SEVİYE EKRANI (ana ekran) ---------- */
  renderLevels() {
    // Ana ekrandaki seviye ızgarası
    const grid = $('#homeLevelGrid');
    if (!grid) return;
    grid.innerHTML = '';
    const LEVELS = [
      { lvl: 'A2', label: 'A2', desc: 'Temel', emoji: '🌱' },
      { lvl: 'B1', label: 'B1', desc: 'Orta', emoji: '🌿' },
      { lvl: 'B2', label: 'B2', desc: 'Üst Orta', emoji: '🌳' },
      { lvl: 'C1', label: 'C1', desc: 'İleri', emoji: '🌲' }
    ];
    const totalWords = VOCAB_DATA.length;
    // Rastgele (tüm seviyeler) kartı başa ekle
    const allCard = document.createElement('button');
    allCard.className = 'level-card level-card--all';
    allCard.dataset.lvl = 'all';
    allCard.innerHTML = `
      <span class="level-badge all">🔀</span>
      <span class="level-count">${totalWords} kelime · Tüm seviyeler</span>
      <div class="level-mastery"><span>Karışık desteyle çalış</span></div>
    `;
    allCard.addEventListener('click', () => {
      this.pickLevel('all');
    });
    grid.appendChild(allCard);

    for (const L of LEVELS) {
      const words = VOCAB_DATA.filter(e => e.lvl === L.lvl);
      const st = this.levelStats(L.lvl);
      const card = document.createElement('button');
      card.className = 'level-card';
      card.dataset.lvl = L.lvl;
      card.innerHTML = `
        <span class="level-badge ${L.lvl.toLowerCase()}">${L.label}</span>
        <span class="level-count">${words.length} kelime · ${L.desc}</span>
        <div class="level-mastery">
          <span>${st.label}</span>
          <span class="bar"><i style="width:${st.pct}%"></i></span>
          <span>${st.masteredCount}/${words.length}</span>
        </div>
      `;
      card.addEventListener('click', () => this.pickLevel(L.lvl));
      grid.appendChild(card);
    }
  },

  /* Seviye seçildi → mod ekranına geç */
  pickLevel(lvl) {
    this.lvl = lvl;
    this.show('mode');
    this.renderModeSummary();
  },

  levelStats(lvl) {
    const words = VOCAB_DATA.filter(e => e.lvl === lvl);
    let mastered = 0;
    for (const w of words) {
      const st = this.stats[w.w + '|' + lvl];
      if (st && st.mastered) mastered++;
    }
    let label = 'Yeni';
    const pct = words.length ? Math.round((mastered / words.length) * 100) : 0;
    if (pct > 0 && pct < 50) label = 'Öğreniyor';
    else if (pct >= 50 && pct < 100) label = 'Tanıdık';
    else if (pct === 100) label = 'Usta ✓';
    return { mastered, label, pct, masteredCount: mastered };
  },

  /* ---------- MOD SEÇİMİ ---------- */
  startMode() {
    if (!this.mode || !this.lvl) return;
    this.show('setup');
    this.renderSetup();
  },

  /* Mod ekranında seçilen seviye özeti */
  renderModeSummary() {
    const el = $('#modeSummary');
    if (!el) return;
    const lvlName = this.lvl === 'all' ? 'Tüm seviyeler (Karışık)' : this.lvl;
    const count = this.lvl === 'all'
      ? VOCAB_DATA.length
      : VOCAB_DATA.filter(e => e.lvl === this.lvl).length;
    el.innerHTML = `<span class="ss-chip">📚 ${lvlName}</span><span class="ss-chip">🃏 ${count} kart</span>`;
  },

  /* Seçilen mod hakkında kısa açıklama (Hatırlama Modu'nun nasıl çalıştığını anlatır) */
  renderModeNote() {
    const el = $('#modeNote');
    if (!el) return;
    if (this.mode !== 'flip') { el.classList.add('hidden'); return; }
    el.classList.remove('hidden');
    el.innerHTML = `
      <strong>🃏 Hatırlama Modu nasıl çalışır?</strong><br>
      Şıklar ve doğruluk kontrolü yoktur — saf tekrar:
      <br><b>1.</b> Kartın ön yüzünde İngilizce kelimeyi görürsün; anlamını kafanda canlandır.
      <br><b>2.</b> Karta dokunduğunda arka yüz döner: Türkçe karşılıklar, türevler ve örnek cümle açılır.
      <br><b>3.</b> Arka yüzü inceledikten sonra <b>"Sonraki kart →"</b> ile yeni bir kelimenin ön yüzüne geçersin.
      <br>Bu modda doğru/yanlış kaydı tutulmaz; sadece kendini test eder, kelimeyi görerek hatırlarsın.
    `;
  },

  renderSetup() {
    const el = $('#setupSummary');
    const levelWords = this.lvl === 'all' ? VOCAB_DATA.length : VOCAB_DATA.filter(e => e.lvl === this.lvl).length;
    const modeName = {
      weighted: '🧠 Akıllı Tekrar',
      random: '🔀 Rastgele',
      write: '⌨️ Yazma Modu',
      flip: '🃏 Hatırlama Modu'
    }[this.mode];
    const lvlName = this.lvl === 'all' ? 'Tüm seviyeler' : this.lvl;
    el.innerHTML = `
      <span class="ss-chip">${modeName}</span>
      <span class="ss-chip">📚 ${lvlName}</span>
      <span class="ss-chip">🃏 ${levelWords} kart</span>
    `;
    // Hatırlama modunda otomatik geçiş uygulanmaz (her kartta önce arka yüz açılır)
    if (this.mode === 'flip') {
      $('#optAutoAdvance').disabled = true;
      $('#optAutoAdvance').checked = false;
    } else {
      $('#optAutoAdvance').disabled = false;
      $('#optAutoAdvance').checked = this.prefs.auto;
    }
    $('#optSound').checked = this.prefs.sound;
  },

  /* ---------- OYUNA BAŞLA ---------- */
  begin() {
    const words = this.lvl === 'all'
      ? VOCAB_DATA.slice()
      : VOCAB_DATA.filter(e => e.lvl === this.lvl);
    if (!words.length) return;

    this.cards = words;
    this.buildQueue();
    this.pos = 0;
    this.streak = 0;
    this.session = { correct: 0, wrong: 0, seen: 0 };
    this.show('game');
    this.renderCard();
  },

  buildQueue() {
    const words = this.cards;
    if (this.mode === 'random' || this.mode === 'write' || this.mode === 'flip') {
      this.queue = shuffle(words);
      this.weights = null;
      return;
    }
    // Akıllı Tekrar:
    //  - Her kelime bir kez görünür (taban).
    //  - Geçmişte yanlış yapılan (düşük doğruluk) kelimeler ekstra tekrarlarla öne çıkarılır.
    //  - Zaten "Usta" olanlar hafifletilir (kimi durumda 0 ekstra).
    const order = [];
    for (const w of words) {
      const st = this.stats[w.w + '|' + w.lvl];
      const acc = st && st.n ? st.c / st.n : 1;
      let extra = 0;
      if (st && st.mastered) extra = 0;
      else if (!st || st.n === 0) extra = 0;
      else if (acc < 0.5) extra = 2;
      else if (acc < 0.8) extra = 1;
      order.push({ w, extra });
    }
    // Taban sırası: karışık
    const base = shuffle(order);
    const queue = [];
    for (const o of base) queue.push(o.w);
    // Ekstraları serpiştir (yanlış yapılanları daha sık öne çıkar)
    const extraCards = [];
    for (const o of base) for (let i = 0; i < o.extra; i++) extraCards.push(o.w);
    const shuffledExtra = shuffle(extraCards);
    // Ekstraları belirli aralıklara yerleştir (başa yakın daha çok)
    let insertAt = Math.max(2, Math.round(queue.length / (extraCards.length + 1)));
    let eIdx = 0;
    for (let i = 1; i < queue.length && eIdx < shuffledExtra.length; i++) {
      if (i % insertAt === 0) {
        queue.splice(i, 0, shuffledExtra[eIdx]);
        eIdx++;
        insertAt = Math.max(2, Math.round(queue.length / (extraCards.length - eIdx + 1)));
      }
    }
    while (eIdx < shuffledExtra.length) { queue.push(shuffledExtra[eIdx]); eIdx++; }
    this.queue = queue;
    this.weights = null;
  },

  /* ---------- KART GÖSTER ---------- */
  renderCard() {
    if (this.pos >= this.queue.length) {
      this.finish();
      return;
    }
    const w = this.queue[this.pos];
    this.cur = w;
    this.selected = null;
    // Hatırlama modunda şık üretmeye gerek yok
    if (this.mode === 'flip') this.ans = null;
    else this.setupChoices();
    this.renderFront();
    this.resetInteract();
    if (window.__computeCardH) requestAnimationFrame(window.__computeCardH);

    // Kart giriş animasyonu
    const stage = $('#cardStage');
    stage.classList.remove('is-correct', 'is-reveal', 'is-bury');
    stage.classList.add('is-entering');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      stage.classList.remove('is-entering');
    }));

    // İlerleme
    const total = this.queue.length;
    $('#progressText').textContent = Math.min(this.pos + 1, total) + ' / ' + total;
    $('#progressFill').style.width = (this.pos / total * 100) + '%';
    $('#statCorrect').textContent = '✓ ' + (this.session ? this.session.correct : 0);
    $('#statWrong').textContent = '✗ ' + (this.session ? this.session.wrong : 0);
    $('#statStreak').textContent = '🔥 ' + this.streak;
  },

  setupChoices() {
    const w = this.cur;
    const pool = this.cards.filter(x => x.w + '|' + x.lvl !== w.w + '|' + w.lvl);
    const cho = this.buildChoices(w, pool);
    this.ans = cho;
  },

  buildChoices(w, pool) {
    const set = new Set();
    const list = [];
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    // 1) anlamdaş / aynı kelime ailesi (bağlantılı)
    const syn = w.syn || [];
    for (const s of syn) {
      if (list.length >= 3) break;
      const match = pool.find(x => x.w === s);
      if (match && match.tr !== w.tr && !set.has(match.tr)) { set.add(match.tr); list.push(match.tr); }
    }

    // 2) yakın anlam kardeşleri (aynı alan / anlam grubu)
    const siblings = this.siblingGroup(w, pool);
    for (const s of siblings) {
      if (list.length >= 3) break;
      if (s.tr !== w.tr && !set.has(s.tr)) { set.add(s.tr); list.push(s.tr); }
    }

    // 3) aynı pos (fiil ise fiil, isim ise isim) — tutarlı alternatifler
    const posPool = pool.filter(x => x.pos === w.pos && x.tr !== w.tr && !set.has(x.tr));
    for (const p of posPool) {
      if (list.length >= 3) break;
      set.add(p.tr); list.push(p.tr);
    }

    // 4) dolgu: tamamen farklı
    const rest = pool.filter(x => x.tr !== w.tr && !set.has(x.tr));
    while (list.length < 3 && rest.length) {
      const p = pick(rest);
      set.add(p.tr); list.push(p.tr);
      rest.splice(rest.indexOf(p), 1);
    }

    // Şıkları karıştır ve doğru cevabı rastgele bir konuma yerleştir
    const ans = shuffle(list);
    const correctIdx = Math.floor(Math.random() * 4);
    const final = [];
    let cIdx = -1;
    for (let i = 0; i < 4; i++) {
      if (i === correctIdx) { final.push(w.tr); cIdx = i; }
      else final.push(ans[i < correctIdx ? i : i - 1] || '???');
    }
    return { choices: final, correct: cIdx, w };
  },

  siblingGroup(w, pool) {
    // Aynı ilk harf + yakın anlam → yanlış ama kafa karıştırıcı adaylar
    const candidates = [];
    // 1) aynı baş harf
    const sameStart = pool.filter(x => x.w[0] === w.w[0] && x.pos === w.pos && x.tr !== w.tr);
    candidates.push(...sameStart);
    // 2) aynı pos + anlam yakınlığı (yüksek öncelik)
    const samePos = pool.filter(x => x.pos === w.pos && x.tr !== w.tr);
    // 3) aynı seviye
    const sameLvl = pool.filter(x => x.lvl === w.lvl && x.tr !== w.tr);
    candidates.push(...sameLvl);
    candidates.push(...samePos);
    // benzersizleştir, öncelik sırasını koru
    const seen = new Set(); const out = [];
    for (const c of candidates) {
      const k = c.tr;
      if (!seen.has(k)) { seen.add(k); out.push(c); }
    }
    return out;
  },

  renderFront() {
    const w = this.cur;
    $('#cardWord').textContent = w.w;
    $('#cardPos').textContent = '(' + posTr(w.pos) + ')';
    $('#cardLevel').textContent = w.lvl;
    $('#cardLevel').className = 'card-chip lvl-' + w.lvl.toLowerCase();
    // Hatırlama modunda kart çevrilebilir → ipucu ona göre
    $('#cardHint').textContent = this.mode === 'flip'
      ? '👆 anlamını hatırla, arka yüzü görmek için karta dokun'
      : '🔊 kelimeyi dinlemek için tıkla';

    // Arka yüz içeriği
    $('#backWord').textContent = w.w;
    $('#backLvl').textContent = w.lvl;
    $('#backTr').textContent = w.tr + (w.alt && w.alt.length ? ', ' + w.alt.join(', ') : '');
    $('#backDer').textContent = w.der || '';
    $('#backEx').textContent = w.ex || '';
  },

  resetInteract() {
    const w = this.cur;
    $('#interact').hidden = false;
    $('#writeBox').hidden = this.mode !== 'write';
    $('#choices').hidden = this.mode === 'write' || this.mode === 'flip';
    // Hatırlama modunda: şık/yazma yok, sadece "karta dokun → çevir" ipucu
    $('#flipHint').classList.toggle('hidden', this.mode !== 'flip');
    // "Atla" her zaman görünür; "Sonraki kart" yalnızca cevap sonrası
    $('#btnNext').classList.add('hidden');
    $('#btnNext').disabled = true;
    $('#btnSkip').classList.remove('hidden');
    $('#btnSkip').disabled = false;
    $('#wrongCallout').classList.add('hidden');
    $('#writeInput').value = '';
    $('#writeInput').classList.remove('is-correct', 'is-wrong');

    if (this.mode === 'write') {
      setTimeout(() => $('#writeInput').focus(), 200);
    } else if (this.mode !== 'flip') {
      const ch = $('#choices');
      ch.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      this.ans.choices.forEach((c, i) => {
        const b = document.createElement('button');
        b.className = 'choice';
        b.dataset.i = i;
        b.innerHTML = `
          <span class="choice-key">${letters[i]}</span>
          <span class="choice-text"></span>
          <span class="choice-state"></span>
        `;
        b.querySelector('.choice-text').textContent = c;
        b.addEventListener('click', () => this.selectChoice(i));
        ch.appendChild(b);
      });
    }
  },

  /* ---------- CEVAP ---------- */
  selectChoice(i) {
    if (this.busy || this.selected) return;
    const w = this.cur;
    const correct = i === this.ans.correct;
    this.selected = { i, correct };

    const btns = $$('#choices .choice');
    btns.forEach((b, bi) => {
      b.classList.add('is-disabled');
      if (bi === this.ans.correct) b.classList.add('is-correct');
      if (bi === i && !correct) b.classList.add('is-wrong');
      if (bi !== this.ans.correct && bi !== i) b.classList.add('is-dimmed');
      b.querySelector('.choice-state').textContent = bi === this.ans.correct ? '✓' : (bi === i && !correct ? '✗' : '');
    });

    this.record(correct);

    $('#btnSkip').classList.add('hidden');
    $('#btnSkip').disabled = true;

    if (correct) {
      // Doğru: kart direkt arka yüze döner → "Sonraki kart" çıkar
      Sounds.ok();
      const stage = $('#cardStage');
      stage.classList.add('is-correct');
      setTimeout(() => stage.classList.remove('is-correct'), 900);
      this.flipToBack();
      if (this.prefs.auto) {
        this.busy = true;
        setTimeout(() => { this.busy = false; this.nextCard(); }, 1500);
      } else {
        $('#btnNext').classList.remove('hidden');
        $('#btnNext').disabled = false;
        $('#btnNext').focus();
      }
    } else {
      // Yanlış: arka yüz döner → "Sonraki kart →" ile geç (atla gibi)
      Sounds.wrong();
      this.busy = true;
      setTimeout(() => {
        this.busy = false;
        this.flipToBack();
        $('#btnNext').classList.remove('hidden');
        $('#btnNext').disabled = false;
        $('#btnNext').focus();
      }, 1000);
    }
  },

  /* Arka yüzü çevir (animasyonlu) */
  flipToBack() {
    const stage = $('#cardStage');
    stage.classList.add('is-reveal');
    Sounds.flip();
  },

  /* ---------- YAZMA MODU ---------- */
  checkWrite() {
    if (this.busy || this.selected) return;
    const input = $('#writeInput');
    const val = input.value.trim().toLowerCase();
    if (!val) return;

    const w = this.cur;
    // Hem İngilizce kelime hem Türkçe karşılık kabul edilir (kullanıcı şıklardaki
    // doğru cevabı yazmayı deneyebilir). Türkçe karşılıklar küçük/ünlü uyumu
    // farklılıklarını tolere etmek için normalleştirilir.
    const norm = s => s.toLowerCase().replace(/\s+/g, ' ').trim();
    const accepted = [
      w.w.toLowerCase(),
      ...(w.altForms || []).map(s => s.toLowerCase()),
      norm(w.tr),
      ...(w.means || []).map(norm),
      ...(w.alt || []).map(norm)
    ];
    const correct = accepted.includes(norm(val));

    this.selected = { correct };

    $('#btnSkip').classList.add('hidden');
    $('#btnSkip').disabled = true;

    input.classList.add(correct ? 'is-correct' : 'is-wrong');
    if (!correct) {
      input.value = w.w;
      Sounds.wrong();
      this.record(false);
      this.busy = true;
      setTimeout(() => {
        this.busy = false;
        this.flipToBack();
        $('#btnNext').classList.remove('hidden');
        $('#btnNext').disabled = false;
        $('#btnNext').focus();
      }, 1000);
    } else {
      Sounds.ok();
      this.record(true);
      const stage = $('#cardStage');
      stage.classList.add('is-correct');
      setTimeout(() => stage.classList.remove('is-correct'), 900);
      this.flipToBack();
      if (this.prefs.auto) {
        this.busy = true;
        setTimeout(() => { this.busy = false; this.nextCard(); }, 1500);
      } else {
        $('#btnNext').classList.remove('hidden');
        $('#btnNext').disabled = false;
        $('#btnNext').focus();
      }
    }
  },

  record(correct) {
    const w = this.cur;
    const key = w.w + '|' + w.lvl;
    const st = this.stats[key];
    st.n++;
    if (correct) {
      st.c++;
      st.streak = (st.streak || 0) + 1;
      if (st.streak >= 2 && !st.mastered) {
        st.mastered = true;
        st.mastery = 3;
      }
      this.streak++;
    } else {
      st.w++;
      st.streak = 0;
      this.streak = 0;
    }
    this.session.correct += correct ? 1 : 0;
    this.session.wrong += correct ? 0 : 1;
    this.session.seen++;
    this.statsDirty = true;
    this.saveStats();
  },

  saveStats() {
    storage.set('vocabdeck_stats_v1', this.stats);
    if (this.statsDirty) {
      this.statsDirty = false;
      Cloud.save();
    }
  },

  reRender() {
    this.renderLevels();
    this.renderStats();
  },

  /* ---------- HATIRLAMA MODU: karta dokun → arka yüz ---------- */
  flipCard() {
    if (this.busy || this.selected || this.mode !== 'flip') return;
    this.selected = { flip: true };
    Sounds.flip();
    this.flipToBack();
    $('#btnSkip').classList.add('hidden');
    $('#btnSkip').disabled = true;
    $('#flipHint').classList.add('hidden');
    $('#btnNext').classList.remove('hidden');
    $('#btnNext').disabled = false;
    $('#btnNext').focus();
  },

  /* ---------- ATLA (önce arka yüz açılır, sonra "Sonraki kart →") ---------- */
  skipCard() {
    if (this.busy || this.selected) return;
    this.busy = true;
    this.selected = { skip: true };
    Sounds.flip();
    this.flipToBack();
    $('#btnSkip').classList.add('hidden');
    $('#btnSkip').disabled = true;
    // Arka yüz okunsun → "Sonraki kart →" ile geç
    setTimeout(() => {
      this.busy = false;
      $('#btnNext').classList.remove('hidden');
      $('#btnNext').disabled = false;
      $('#btnNext').focus();
    }, 1000);
  },

  /* ---------- SONRAKİ KART ---------- */
  nextCard() {
    if (this.busy) return;
    this.busy = true;

    // Arka yüzü kapat
    const stage = $('#cardStage');
    stage.classList.remove('is-reveal');

    // Gömülme animasyonu (kartı alta geçir)
    stage.classList.add('is-bury');
    setTimeout(() => {
      stage.classList.remove('is-bury');
      this.pos++;
      this.renderCard();
      this.busy = false;
    }, 560);
  },

  /* ---------- OTURUM BİTİŞİ ---------- */
  finish() {
    // Hatırlama modunda istatistik tutulmadığı için özet yerine doğrudan ana ekrana dön
    if (this.mode === 'flip') {
      this.toast('🃏 Çalışma bitti!');
      this.quitGame();
      return;
    }
    const stage = $('#cardStage');
    stage.classList.remove('is-correct', 'is-reveal', 'is-bury');
    this.renderSummary();
    this.show('summary');
    Sounds.done();
    this.spawnConfetti();
  },

  renderSummary() {
    const s = this.session;
    const total = s.correct + s.wrong;
    const acc = total ? Math.round((s.correct / total) * 100) : 0;
    $('#sumTotal').textContent = total;
    $('#sumCorrect').textContent = s.correct;
    $('#sumWrong').textContent = s.wrong;
    $('#sumAcc').textContent = '%' + acc;
    $('#ringPct').textContent = acc + '%';
    const R = 52, C = 2 * Math.PI * R;
    $('#ringFg').style.strokeDasharray = C;
    $('#ringFg').style.strokeDashoffset = C;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      $('#ringFg').style.strokeDashoffset = C * (1 - acc / 100);
    }));
    $('#summaryTitle').textContent = acc >= 80 ? 'Harika iş! 🌟' : (acc >= 60 ? 'Güzel çalışma! 👏' : 'Devam et! 💪');
  },

  spawnConfetti() {
    const wrap = $('#confetti');
    wrap.innerHTML = '';
    const colors = ['#7c5cff', '#00d9a6', '#ffb020', '#ff5c74', '#4cc9f0', '#f72585'];
    for (let i = 0; i < 80; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.setProperty('--cf-dur', (2.4 + Math.random() * 2.2) + 's');
      p.style.setProperty('--cf-delay', (Math.random() * 0.8) + 's');
      p.style.setProperty('--cf-ease', Math.random() > 0.5 ? 'linear' : 'cubic-bezier(.22,.61,.36,1)');
      wrap.appendChild(p);
    }
  },

  /* ---------- SIFIRLA / ÇIKIŞ ---------- */
  resetAll() {
    if (!confirm('Bu cihazdaki tüm ilerlemen (istatistikler ve tercihler) silinecek. Emin misin?')) return;
    storage.remove('vocabdeck_stats_v1');
    storage.remove('vocabdeck_prefs_v1');
    this.stats = {};
    this.prefs = Object.assign({}, DEFAULTS.prefs);
    this.savePrefs();
    Cloud.save();
    this.renderLevels();
    this.renderStats();
    this.toast('İlerleme sıfırlandı');
  },

  quitGame() {
    this.show('home');
  },

  /* ---------- İSTATİSTİK ---------- */
  renderStats() {
    const grid = $('#statsGrid');
    grid.innerHTML = '';
    const LEVELS = ['A2', 'B1', 'B2', 'C1'];
    for (const lvl of LEVELS) {
      const words = VOCAB_DATA.filter(e => e.lvl === lvl);
      let mastered = 0, seen = 0;
      for (const w of words) {
        const st = this.stats[w.w + '|' + lvl];
        if (st) {
          if (st.n > 0) seen++;
          if (st.mastered) mastered++;
        }
      }
      const pct = words.length ? Math.round((mastered / words.length) * 100) : 0;
      const card = document.createElement('div');
      card.className = 'stat-card';
      card.innerHTML = `
        <span class="sc-level ${lvl.toLowerCase()}" style="color:${this.lvlColor(lvl)}">${lvl}</span>
        <span class="sc-count">${words.length} kelime</span>
        <div class="sc-bar"><i style="width:${pct}%"></i></div>
        <span class="sc-mastery">${mastered}/${words.length} usta · ${seen} görüldü</span>
      `;
      grid.appendChild(card);
    }
  },

  lvlColor(lvl) {
    return { A2: '#8fd3ff', B1: '#7ce8c2', B2: '#ffd166', C1: '#ff8fb3' }[lvl] || '#fff';
  },

  /* ---------- KLAVYE ---------- */
  onKey(e) {
    if (this.screen !== 'game') return;
    if (e.key === 'Escape') { this.quitGame(); return; }
    if (this.mode === 'write') {
      if (e.key === 'Enter' && !this.busy && !this.selected) this.checkWrite();
      return;
    }
    // Hatırlama modu: karta dokun yerine Enter/Space ile çevir
    if (this.mode === 'flip') {
      if ((e.key === ' ' || e.key === 'Enter') && !this.busy) {
        e.preventDefault();
        if (this.selected) this.nextCard();
        else this.flipCard();
      }
      return;
    }
    // Seçim modu
    if (['a', 'b', 'c', 'd'].includes(e.key.toLowerCase())) {
      const idx = e.key.toLowerCase().charCodeAt(0) - 97;
      if (idx < this.ans.choices.length && !this.selected) this.selectChoice(idx);
    } else if (e.key === ' ' && this.selected && !this.busy) {
      e.preventDefault();
      this.nextCard();
    } else if (e.key === 'Enter' && this.selected && !this.busy && this.prefs.auto) {
      this.nextCard();
    } else if (e.key === 'f' && !this.selected) {
      this.skipCard();
    }
  },

  /* ---------- KONUŞMA ---------- */
  speak(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'en-US'; u.rate = 0.95;
      window.speechSynthesis.speak(u);
    } catch { /* destek yok */ }
  },

  speakWord() {
    if (this.cur) this.speak(this.cur.w);
  },

  /* ---------- TERCİHLER ---------- */
  applyPrefs() {
    Sounds.enabled = this.prefs.sound;
    $('#optAutoAdvance').checked = this.prefs.auto;
    $('#optAutoAdvance').disabled = this.mode === 'flip';
    $('#optSound').checked = this.prefs.sound;
  },

  /* ---------- TEMA ---------- */
  applyTheme() {
    const t = THEMES.find(x => x.id === this.theme) || THEMES[0];
    const r = document.documentElement;
    r.style.setProperty('--bg', t.bg);
    r.style.setProperty('--bg-2', t.bg2);
    r.style.setProperty('--ink', t.ink);
    r.style.setProperty('--ink-dim', t.inkDim);
    r.style.setProperty('--accent', t.accent);
    r.style.setProperty('--accent-2', t.accent2);
    r.style.setProperty('--accent-3', t.accent3);
    r.style.setProperty('--danger', t.danger);
    r.style.setProperty('--ok', t.ok);
    r.style.setProperty('--card-bg', t.cardBg);
    r.style.setProperty('--card-ink', t.cardInk);
    r.style.setProperty('--panel', 'rgba(255,255,255,' + t.panelAlpha + ')');
    r.style.setProperty('--line', 'rgba(255,255,255,' + t.lineAlpha + ')');
    r.style.setProperty('--card-ink-2', this.shade(t.cardInk, 0.55));
    // Üst bar / alt bar zemini temaya uyarlansın (sabit lacivert yerine)
    r.style.setProperty('--bg-tint', this.hexToRgba(t.bg, 0.78));
    // meta theme-color
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t.bg);
    storage.set('vocabdeck_theme_v1', t.id);
  },

  shade(hex, factor) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.round(((n >> 16) & 255) * factor);
    const g = Math.round(((n >> 8) & 255) * factor);
    const b = Math.round((n & 255) * factor);
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  },

  hexToRgba(hex, alpha) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  },

  cycleTheme() {
    const idx = THEMES.findIndex(x => x.id === this.theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    this.theme = next.id;
    this.applyTheme();
    this.toast('🎨 Tema: ' + next.name);
  },

  savePrefs() {
    storage.set('vocabdeck_prefs_v1', this.prefs);
    Cloud.save();
  },

  /* ---------- TOAST ---------- */
  toast(msg, isError) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.toggle('is-error', !!isError);
    t.classList.add('is-show');
    clearTimeout(this._toastT);
    this._toastT = setTimeout(() => t.classList.remove('is-show'), 2600);
  }
};

/* ================= MOBİL TESPİT + GÜVENLİ ALAN ================= */
(function detectMobile() {
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const isNarrow = window.matchMedia('(max-width: 640px)').matches;
  if (isNarrow || isTouch) document.documentElement.classList.add('mob');

  // iOS güvenli alanı (notch / home bar) — CSS değişkeni olarak ilet
  const setSafe = () => {
    const nav = window.visualViewport && window.visualViewport.height
      ? Math.max(0, window.innerHeight - window.visualViewport.height)
      : 0;
    document.documentElement.style.setProperty('--mob-nav-h', nav + 'px');
  };
  setSafe();
  window.addEventListener('resize', setSafe);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', setSafe);

  // Dinamik viewport (mobil adres çubuğu) için
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod|Android/i.test(ua)) {
    document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
    window.addEventListener('resize', () => {
      document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
    });
  }

  // ---- Mobil kart yüksekliği: şıklar kartı kapatmasın ----
  // Kartın maksimum yüksekliği = şık barının üst kenarı ile kartın üst kenarı arası.
  // Şık barı position:fixed olduğundan getBoundingClientRect ile gerçek konumlar ölçülür.
  window.__computeCardH = () => {
    if (!isNarrow) return; // sadece mobil dar düzen
    if (!$('#scrGame') || $('#scrGame').hidden) return;
    const bar = $('#interact');
    const stage = $('#cardStage');
    if (!bar || !stage) return;
    const h = bar.offsetHeight;
    if (!h) return; // şık barı henüz oluşmadı
    const barTop = bar.getBoundingClientRect().top;
    const stageTop = stage.getBoundingClientRect().top;
    const avail = barTop - stageTop - 4; // 4px nefes payı
    if (avail > 60) document.documentElement.style.setProperty('--card-max-h', Math.floor(avail) + 'px');
  };
  window.__computeCardH();
  window.addEventListener('resize', window.__computeCardH);
  if (window.visualViewport) window.visualViewport.addEventListener('resize', window.__computeCardH);
})();

/* ================= BAŞLAT ================= */
document.addEventListener('DOMContentLoaded', () => app.init());
