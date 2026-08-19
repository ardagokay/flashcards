// Otomatik üretildi: parse.js çalıştırılarak oluşturuldu. El ile düzenlemeyin.
const VOCAB_DATA = [
 {
  "w": "accept",
  "pos": "verb",
  "lvl": "A2",
  "tr": "kabul etmek",
  "all": "kabul etmek, onaylamak",
  "means": [
   "kabul etmek",
   "onaylamak"
  ],
  "alt": [
   "onaylamak"
  ],
  "der": "acceptable (adj) - kabul edilebilir, acceptance (n) - kabul",
  "ex": "The university committee decided to accept her application for the scholarship.",
  "syn": []
 },
 {
  "w": "achieve",
  "pos": "verb",
  "lvl": "A2",
  "tr": "başarmak",
  "all": "başarmak, elde etmek",
  "means": [
   "başarmak",
   "elde etmek"
  ],
  "alt": [
   "elde etmek"
  ],
  "der": "achievement (n) - başarı, achievable (adj) - başarılabilir",
  "ex": "If you practice every day, you will achieve a high score on the exam.",
  "syn": []
 },
 {
  "w": "advice",
  "pos": "noun",
  "lvl": "A2",
  "tr": "tavsiye",
  "all": "tavsiye, öğüt",
  "means": [
   "tavsiye",
   "öğüt"
  ],
  "alt": [
   "öğüt"
  ],
  "der": "advise (v) - tavsiye vermek, advisable (adj) - tavsiye edilen",
  "ex": "The academic advisor gave helpful advice on choosing the right courses.",
  "syn": []
 },
 {
  "w": "affect",
  "pos": "verb",
  "lvl": "A2",
  "tr": "etkilemek",
  "all": "etkilemek, tesir etmek",
  "means": [
   "etkilemek",
   "tesir etmek"
  ],
  "alt": [
   "tesir etmek"
  ],
  "der": "affection (n) - sevgi/ilgi, affected (adj) - etkilenmiş",
  "ex": "Noise levels in the library can negatively affect your concentration.",
  "syn": []
 },
 {
  "w": "agree",
  "pos": "verb",
  "lvl": "A2",
  "tr": "aynı fikirde olmak",
  "all": "aynı fikirde olmak, anlaşmak",
  "means": [
   "aynı fikirde olmak",
   "anlaşmak"
  ],
  "alt": [
   "anlaşmak"
  ],
  "der": "agreement (n) - anlaşma, agreeable (adj) - uygun/hoş",
  "ex": "Both researchers agree that climate change requires urgent global action.",
  "syn": []
 },
 {
  "w": "allow",
  "pos": "verb",
  "lvl": "A2",
  "tr": "izin vermek",
  "all": "izin vermek, olanak sağlamak",
  "means": [
   "izin vermek",
   "olanak sağlamak"
  ],
  "alt": [
   "olanak sağlamak"
  ],
  "der": "allowance (n) - harçlık/izin, allowable (adj) - izin verilebilir",
  "ex": "Online portals allow students to access study materials at any time.",
  "syn": []
 },
 {
  "w": "ancient",
  "pos": "adj",
  "lvl": "A2",
  "tr": "antik",
  "all": "antik, çok eski",
  "means": [
   "antik",
   "çok eski"
  ],
  "alt": [
   "çok eski"
  ],
  "der": "ancients (n) - antik dönem insanları",
  "ex": "Archeologists discovered ancient artifacts buried deep beneath the city ruins.",
  "syn": []
 },
 {
  "w": "announce",
  "pos": "verb",
  "lvl": "A2",
  "tr": "duyurmak",
  "all": "duyurmak, ilan etmek",
  "means": [
   "duyurmak",
   "ilan etmek"
  ],
  "alt": [
   "ilan etmek"
  ],
  "der": "announcement (n) - duyuru, announcer (n) - spiker",
  "ex": "The director will announce the exam results on the official website tomorrow.",
  "syn": []
 },
 {
  "w": "appear",
  "pos": "verb",
  "lvl": "A2",
  "tr": "görünmek",
  "all": "görünmek, ortaya çıkmak",
  "means": [
   "görünmek",
   "ortaya çıkmak"
  ],
  "alt": [
   "ortaya çıkmak"
  ],
  "der": "appearance (n) - dış görünüş, disappear (v) - kaybolmak",
  "ex": "New technological tools appear in classrooms every single year.",
  "syn": []
 },
 {
  "w": "apply",
  "pos": "verb",
  "lvl": "A2",
  "tr": "başvurmak",
  "all": "başvurmak, uygulamak",
  "means": [
   "başvurmak",
   "uygulamak"
  ],
  "alt": [
   "uygulamak"
  ],
  "der": "application (n) - başvuru, applicant (n) - başvuran",
  "ex": "You must apply for a visa before traveling to international conferences.",
  "syn": []
 },
 {
  "w": "arrange",
  "pos": "verb",
  "lvl": "A2",
  "tr": "düzenlemek",
  "all": "düzenlemek, organize etmek",
  "means": [
   "düzenlemek",
   "organize etmek"
  ],
  "alt": [
   "organize etmek"
  ],
  "der": "arrangement (n) - düzenleme/plan",
  "ex": "The coordinator will arrange a weekly study group for new prep students.",
  "syn": []
 },
 {
  "w": "attract",
  "pos": "verb",
  "lvl": "A2",
  "tr": "çekmek",
  "all": "çekmek, cezbetmek",
  "means": [
   "çekmek",
   "cezbetmek"
  ],
  "alt": [
   "cezbetmek"
  ],
  "der": "attraction (n) - cazibe/ilgi, attractive (adj) - çekici",
  "ex": "The new research center aims to attract top scientists from around the world.",
  "syn": []
 },
 {
  "w": "avoid",
  "pos": "verb",
  "lvl": "A2",
  "tr": "kaçınmak",
  "all": "kaçınmak, uzak durmak",
  "means": [
   "kaçınmak",
   "uzak durmak"
  ],
  "alt": [
   "uzak durmak"
  ],
  "der": "avoidance (n) - kaçınma, avoidable (adj) - önlenebilir",
  "ex": "Students should avoid cramming all their revision into the final night.",
  "syn": []
 },
 {
  "w": "cause",
  "pos": "noun/verb",
  "lvl": "A2",
  "tr": "neden",
  "all": "neden, sebep / neden olmak",
  "means": [
   "neden",
   "sebep",
   "neden olmak"
  ],
  "alt": [
   "sebep",
   "neden olmak"
  ],
  "der": "causal (adj) - nedensel",
  "ex": "Heavy rainfall was the main cause of traffic delays this morning.",
  "syn": []
 },
 {
  "w": "describe",
  "pos": "verb",
  "lvl": "A2",
  "tr": "tanımlamak",
  "all": "tanımlamak, betimlemek",
  "means": [
   "tanımlamak",
   "betimlemek"
  ],
  "alt": [
   "betimlemek"
  ],
  "der": "description (n) - betimleme, descriptive (adj) - betimleyici",
  "ex": "In the speaking test, you will need to describe an image in detail.",
  "syn": []
 },
 {
  "w": "discover",
  "pos": "verb",
  "lvl": "A2",
  "tr": "keşfetmek",
  "all": "keşfetmek, bulmak",
  "means": [
   "keşfetmek",
   "bulmak"
  ],
  "alt": [
   "bulmak"
  ],
  "der": "discovery (n) - keşif, discoverer (n) - kaşif",
  "ex": "Biologists hope to discover new plant species in the rainforest.",
  "syn": []
 },
 {
  "w": "explain",
  "pos": "verb",
  "lvl": "A2",
  "tr": "açıklamak",
  "all": "açıklamak, izah etmek",
  "means": [
   "açıklamak",
   "izah etmek"
  ],
  "alt": [
   "izah etmek"
  ],
  "der": "explanation (n) - açıklama, explanatory (adj) - açıklayıcı",
  "ex": "The professor took thirty minutes to explain the complex physics formula.",
  "syn": []
 },
 {
  "w": "increase",
  "pos": "verb/noun",
  "lvl": "A2",
  "tr": "artmak",
  "all": "artmak, artırmak / artış",
  "means": [
   "artmak",
   "artırmak",
   "artış"
  ],
  "alt": [
   "artırmak",
   "artış"
  ],
  "der": "increasingly (adv) - giderek artan şekilde",
  "ex": "Renewable energy adoption will increase steadily over the next decade.",
  "syn": []
 },
 {
  "w": "protect",
  "pos": "verb",
  "lvl": "A2",
  "tr": "korumak",
  "all": "korumak, muhafaza etmek",
  "means": [
   "korumak",
   "muhafaza etmek"
  ],
  "alt": [
   "muhafaza etmek"
  ],
  "der": "protection (n) - koruma, protective (adj) - koruyucu",
  "ex": "Governments must pass legislation to protect endangered wildlife species.",
  "syn": []
 },
 {
  "w": "reduce",
  "pos": "verb",
  "lvl": "A2",
  "tr": "azaltmak",
  "all": "azaltmak, düşürmek",
  "means": [
   "azaltmak",
   "düşürmek"
  ],
  "alt": [
   "düşürmek"
  ],
  "der": "reduction (n) - azalma/indirim, reduced (adj) - azaltılmış",
  "ex": "Using energy-efficient bulbs helps reduce monthly electricity bills.",
  "syn": []
 },
 {
  "w": "accurate",
  "pos": "adj",
  "lvl": "B1",
  "tr": "doğru",
  "all": "doğru, kesin, hatasız",
  "means": [
   "doğru",
   "kesin",
   "hatasız"
  ],
  "alt": [
   "kesin",
   "hatasız"
  ],
  "der": "accurately (adv) - doğru şekilde, accuracy (n) - doğruluk",
  "ex": "Researchers need accurate measurements to produce valid scientific results.",
  "syn": []
 },
 {
  "w": "adapt",
  "pos": "verb",
  "lvl": "B1",
  "tr": "uyum sağlamak",
  "all": "uyum sağlamak, uyarlamak",
  "means": [
   "uyum sağlamak",
   "uyarlamak"
  ],
  "alt": [
   "uyarlamak"
  ],
  "der": "adaptation (n) - uyum, adaptable (adj) - uyum sağlayabilir",
  "ex": "Animals must adapt to changing climate conditions in order to survive.",
  "syn": []
 },
 {
  "w": "analyze",
  "pos": "verb",
  "lvl": "B1",
  "tr": "analiz etmek",
  "all": "analiz etmek, incelemek",
  "means": [
   "analiz etmek",
   "incelemek"
  ],
  "alt": [
   "incelemek"
  ],
  "der": "analysis (n) - analiz, analytical (adj) - analitik",
  "ex": "Data scientists must analyze the survey results before formulating conclusions.",
  "syn": []
 },
 {
  "w": "appreciate",
  "pos": "verb",
  "lvl": "B1",
  "tr": "takdir etmek",
  "all": "takdir etmek, değerini anlamak",
  "means": [
   "takdir etmek",
   "değerini anlamak"
  ],
  "alt": [
   "değerini anlamak"
  ],
  "der": "appreciation (n) - takdir, appreciative (adj) - minnettar",
  "ex": "Literary critics appreciate the author's nuanced approach to historical events.",
  "syn": []
 },
 {
  "w": "approach",
  "pos": "verb/noun",
  "lvl": "B1",
  "tr": "yaklaşmak",
  "all": "yaklaşmak / yaklaşım, yöntem",
  "means": [
   "yaklaşmak",
   "yaklaşım",
   "yöntem"
  ],
  "alt": [
   "yaklaşım",
   "yöntem"
  ],
  "der": "approachable (adj) - yaklaşılabilir",
  "ex": "The professor suggested an innovative approach to solving the complex equation.",
  "syn": []
 },
 {
  "w": "appropriate",
  "pos": "adj",
  "lvl": "B1",
  "tr": "uygun",
  "all": "uygun, yerinde, münasip",
  "means": [
   "uygun",
   "yerinde",
   "münasip"
  ],
  "alt": [
   "yerinde",
   "münasip"
  ],
  "der": "appropriately (adv) - uygun şekilde, appropriateness (n) - uygunluk",
  "ex": "Candidates must wear appropriate attire for formal academic presentations.",
  "syn": []
 },
 {
  "w": "assign",
  "pos": "verb",
  "lvl": "B1",
  "tr": "görevlendirmek",
  "all": "görevlendirmek, atamak",
  "means": [
   "görevlendirmek",
   "atamak"
  ],
  "alt": [
   "atamak"
  ],
  "der": "assignment (n) - ödev/görev",
  "ex": "The instructor will assign specific research topics to each group tomorrow.",
  "syn": []
 },
 {
  "w": "benefit",
  "pos": "verb/noun",
  "lvl": "B1",
  "tr": "faydalanmak",
  "all": "faydalanmak / yarar, fayda",
  "means": [
   "faydalanmak",
   "yarar",
   "fayda"
  ],
  "alt": [
   "yarar",
   "fayda"
  ],
  "der": "beneficial (adj) - faydalı, beneficiary (n) - hak sahibi",
  "ex": "Regular exercise offers numerous physical and mental health benefits to adults.",
  "syn": []
 },
 {
  "w": "bless",
  "pos": "verb",
  "lvl": "B1",
  "tr": "kutsamak",
  "all": "kutsamak, hayır dua etmek",
  "means": [
   "kutsamak",
   "hayır dua etmek"
  ],
  "alt": [
   "hayır dua etmek"
  ],
  "der": "blessed (adj) - kutsanmış, blessing (n) - lütuf/şans",
  "ex": "The elders would bless the community before embarking on any major harvest.",
  "syn": []
 },
 {
  "w": "brief",
  "pos": "adj/verb",
  "lvl": "B1",
  "tr": "kısa",
  "all": "kısa, özet / bilgilendirmek",
  "means": [
   "kısa",
   "özet",
   "bilgilendirmek"
  ],
  "alt": [
   "özet",
   "bilgilendirmek"
  ],
  "der": "briefly (adv) - kısaca, briefing (n) - bilgilendirme",
  "ex": "The presenter gave a brief overview of the project's strategic objectives.",
  "syn": []
 },
 {
  "w": "combine",
  "pos": "verb",
  "lvl": "B1",
  "tr": "birleştirmek",
  "all": "birleştirmek, bir araya getirmek",
  "means": [
   "birleştirmek",
   "bir araya getirmek"
  ],
  "alt": [
   "bir araya getirmek"
  ],
  "der": "combination (n) - kombinasyon, combined (adj) - birleşmiş",
  "ex": "Academic success requires a combination of talent, effort, and guidance.",
  "syn": []
 },
 {
  "w": "conclude",
  "pos": "verb",
  "lvl": "B1",
  "tr": "sonuçlandırmak",
  "all": "sonuçlandırmak, bitirmek",
  "means": [
   "sonuçlandırmak",
   "bitirmek"
  ],
  "alt": [
   "bitirmek"
  ],
  "der": "conclusion (n) - sonuç, conclusive (adj) - kesin",
  "ex": "The keynote speaker will conclude the conference with policy recommendations.",
  "syn": []
 },
 {
  "w": "confirm",
  "pos": "verb",
  "lvl": "B1",
  "tr": "onaylamak",
  "all": "onaylamak, doğrulamak",
  "means": [
   "onaylamak",
   "doğrulamak"
  ],
  "alt": [
   "doğrulamak"
  ],
  "der": "confirmation (n) - onay, confirmed (adj) - onaylanmış",
  "ex": "Recent clinical trials confirm the safety and efficacy of the new vaccine.",
  "syn": []
 },
 {
  "w": "consist",
  "pos": "verb",
  "lvl": "B1",
  "tr": "-den oluşmak",
  "all": "-den oluşmak, meydana gelmek",
  "means": [
   "-den oluşmak",
   "meydana gelmek"
  ],
  "alt": [
   "meydana gelmek"
  ],
  "der": "consistent (adj) - tutarlı, consistency (n) - tutarlılık",
  "ex": "The examination panel will consist of three independent academic reviewers.",
  "syn": []
 },
 {
  "w": "consume",
  "pos": "verb",
  "lvl": "B1",
  "tr": "tüketmek",
  "all": "tüketmek",
  "means": [
   "tüketmek"
  ],
  "alt": [],
  "der": "consumption (n) - tüketim, consumer (n) - tüketici",
  "ex": "Modern industrial cities consume vast quantities of electrical energy daily.",
  "syn": []
 },
 {
  "w": "deny",
  "pos": "verb",
  "lvl": "B1",
  "tr": "reddetmek",
  "all": "reddetmek, inkar etmek",
  "means": [
   "reddetmek",
   "inkar etmek"
  ],
  "alt": [
   "inkar etmek"
  ],
  "der": "denial (n) - inkar, undeniable (adj) - inkar edilemez",
  "ex": "The corporate spokesperson chose to deny all rumors regarding the upcoming layoff.",
  "syn": []
 },
 {
  "w": "expand",
  "pos": "verb",
  "lvl": "B1",
  "tr": "genişlemek",
  "all": "genişlemek, büyümek",
  "means": [
   "genişlemek",
   "büyümek"
  ],
  "alt": [
   "büyümek"
  ],
  "der": "expansion (n) - genişleme, expansive (adj) - geniş",
  "ex": "The research department intends to expand its laboratory facilities next year.",
  "syn": []
 },
 {
  "w": "highlight",
  "pos": "verb/noun",
  "lvl": "B1",
  "tr": "vurgulamak",
  "all": "vurgulamak / önemli nokta",
  "means": [
   "vurgulamak",
   "önemli nokta"
  ],
  "alt": [
   "önemli nokta"
  ],
  "der": "highlighted (adj) - vurgulanmış",
  "ex": "The report serves to highlight structural vulnerabilities in the economy.",
  "syn": []
 },
 {
  "w": "motivate",
  "pos": "verb",
  "lvl": "B1",
  "tr": "güdülemek",
  "all": "güdülemek, motive etmek",
  "means": [
   "güdülemek",
   "motive etmek"
  ],
  "alt": [
   "motive etmek"
  ],
  "der": "motivation (n) - motivasyon, motivational (adj) - özendirici",
  "ex": "Clear achievable targets help to motivate students throughout their studies.",
  "syn": []
 },
 {
  "w": "occur",
  "pos": "verb",
  "lvl": "B1",
  "tr": "meydana gelmek",
  "all": "meydana gelmek, olmak",
  "means": [
   "meydana gelmek",
   "olmak"
  ],
  "alt": [
   "olmak"
  ],
  "der": "occurrence (n) - olay, meydana geliş",
  "ex": "Tectonic earthquakes commonly occur along major oceanic geological faults.",
  "syn": []
 },
 {
  "w": "participate",
  "pos": "verb",
  "lvl": "B1",
  "tr": "katılmak",
  "all": "katılmak, iştirak etmek",
  "means": [
   "katılmak",
   "iştirak etmek"
  ],
  "alt": [
   "iştirak etmek"
  ],
  "der": "participation (n) - katılım, participant (n) - katılımcı",
  "ex": "Students are encouraged to participate in interactive seminar discussions.",
  "syn": []
 },
 {
  "w": "predict",
  "pos": "verb",
  "lvl": "B1",
  "tr": "tahmin etmek",
  "all": "tahmin etmek, öngörmek",
  "means": [
   "tahmin etmek",
   "öngörmek"
  ],
  "alt": [
   "öngörmek"
  ],
  "der": "prediction (n) - tahmin, predictable (adj) - tahmin edilebilir",
  "ex": "Meteorologists use advanced satellite radar to predict storm trajectories.",
  "syn": []
 },
 {
  "w": "provide",
  "pos": "verb",
  "lvl": "B1",
  "tr": "sağlamak",
  "all": "sağlamak, temin etmek",
  "means": [
   "sağlamak",
   "temin etmek"
  ],
  "alt": [
   "temin etmek"
  ],
  "der": "provision (n) - temin, provider (n) - sağlayıcı",
  "ex": "Academic digital archives provide free open access to research papers.",
  "syn": []
 },
 {
  "w": "reject",
  "pos": "verb",
  "lvl": "B1",
  "tr": "reddetmek",
  "all": "reddetmek, geri çevirmek",
  "means": [
   "reddetmek",
   "geri çevirmek"
  ],
  "alt": [
   "geri çevirmek"
  ],
  "der": "rejection (n) - ret, rejected (adj) - reddedilmiş",
  "ex": "The academic journal may reject papers that lack methodological rigor.",
  "syn": []
 },
 {
  "w": "rely",
  "pos": "verb",
  "lvl": "B1",
  "tr": "güvenmek",
  "all": "güvenmek, bel bağlamak",
  "means": [
   "güvenmek",
   "bel bağlamak"
  ],
  "alt": [
   "bel bağlamak"
  ],
  "der": "reliable (adj) - güvenilir, reliance (n) - bağımlılık/güven",
  "ex": "Modern economies heavily rely on continuous digital infrastructure.",
  "syn": []
 },
 {
  "w": "require",
  "pos": "verb",
  "lvl": "B1",
  "tr": "gerektirmek",
  "all": "gerektirmek, şart koşmak",
  "means": [
   "gerektirmek",
   "şart koşmak"
  ],
  "alt": [
   "şart koşmak"
  ],
  "der": "requirement (n) - gereksinim, required (adj) - gerekli",
  "ex": "Academic writing requires clarity, objective logic, and thorough evidence.",
  "syn": []
 },
 {
  "w": "rust",
  "pos": "verb/noun",
  "lvl": "B1",
  "tr": "paslanmak",
  "all": "paslanmak / pas",
  "means": [
   "paslanmak",
   "pas"
  ],
  "alt": [
   "pas"
  ],
  "der": "rusty (adj) - paslı",
  "ex": "Unprotected steel beams will rust rapidly when exposed to saltwater mist.",
  "syn": []
 },
 {
  "w": "submit",
  "pos": "verb",
  "lvl": "B1",
  "tr": "sunmak",
  "all": "sunmak, teslim etmek",
  "means": [
   "sunmak",
   "teslim etmek"
  ],
  "alt": [
   "teslim etmek"
  ],
  "der": "submission (n) - teslim/sunum",
  "ex": "Graduate applicants must submit their portfolios prior to the deadline.",
  "syn": []
 },
 {
  "w": "summarize",
  "pos": "verb",
  "lvl": "B1",
  "tr": "özetlemek",
  "all": "özetlemek",
  "means": [
   "özetlemek"
  ],
  "alt": [],
  "der": "summary (n) - özet",
  "ex": "In the final essay paragraph, you must summarize your main thesis points.",
  "syn": []
 },
 {
  "w": "tend",
  "pos": "verb",
  "lvl": "B1",
  "tr": "eğiliminde olmak",
  "all": "eğiliminde olmak, meyl etmek",
  "means": [
   "eğiliminde olmak",
   "meyl etmek"
  ],
  "alt": [
   "meyl etmek"
  ],
  "der": "tendency (n) - eğilim",
  "ex": "People tend to retain vivid emotional memories longer than mundane ones.",
  "syn": []
 },
 {
  "w": "abandon",
  "pos": "verb",
  "lvl": "B2",
  "tr": "terk etmek",
  "all": "terk etmek, vazgeçmek",
  "means": [
   "terk etmek",
   "vazgeçmek"
  ],
  "alt": [
   "vazgeçmek"
  ],
  "der": "abandoned (adj) - terk edilmiş, abandonment (n) - terk",
  "ex": "The scientists had to abandon their experiment due to harsh weather conditions.",
  "syn": []
 },
 {
  "w": "abolish",
  "pos": "verb",
  "lvl": "B2",
  "tr": "feshetmek",
  "all": "feshetmek, resmi olarak kaldırmak",
  "means": [
   "feshetmek",
   "resmi olarak kaldırmak"
  ],
  "alt": [
   "resmi olarak kaldırmak"
  ],
  "der": "abolished (adj) - kaldırılmış, abolition (n) - fesih",
  "ex": "The government decided to abolish the outdated tax system to spur growth.",
  "syn": []
 },
 {
  "w": "accommodate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "barındırmak",
  "all": "barındırmak, uyum sağlamak",
  "means": [
   "barındırmak",
   "uyum sağlamak"
  ],
  "alt": [
   "uyum sağlamak"
  ],
  "der": "accommodation (n) - konaklama, accommodating (adj) - yardımsever",
  "ex": "The new campus library can accommodate over two thousand students simultaneously.",
  "syn": []
 },
 {
  "w": "accumulate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "biriktirmek",
  "all": "biriktirmek, toplamak",
  "means": [
   "biriktirmek",
   "toplamak"
  ],
  "alt": [
   "toplamak"
  ],
  "der": "accumulation (n) - birikim, cumulative (adj) - birikimli",
  "ex": "Over time, toxic substances can accumulate in marine ecosystems.",
  "syn": []
 },
 {
  "w": "acquire",
  "pos": "verb",
  "lvl": "B2",
  "tr": "edinmek",
  "all": "edinmek, kazanmak, elde etmek",
  "means": [
   "edinmek",
   "kazanmak",
   "elde etmek"
  ],
  "alt": [
   "kazanmak",
   "elde etmek"
  ],
  "der": "acquisition (n) - edinim, acquired (adj) - edinilmiş",
  "ex": "Students can acquire advanced critical thinking skills through active debate.",
  "syn": []
 },
 {
  "w": "adequate",
  "pos": "adj",
  "lvl": "B2",
  "tr": "yeterli",
  "all": "yeterli, uygun",
  "means": [
   "yeterli",
   "uygun"
  ],
  "alt": [
   "uygun"
  ],
  "der": "adequately (adv) - yeterince, adequacy (n) - yeterlilik",
  "ex": "The current budget is not adequate to complete the entire urban project.",
  "syn": []
 },
 {
  "w": "advocate",
  "pos": "verb/noun",
  "lvl": "B2",
  "tr": "savunmak",
  "all": "savunmak / savunucu",
  "means": [
   "savunmak",
   "savunucu"
  ],
  "alt": [
   "savunucu"
  ],
  "der": "advocacy (n) - savunuculuk",
  "ex": "Environmentalists strongly advocate for renewable energy sources over fossil fuels.",
  "syn": []
 },
 {
  "w": "alter",
  "pos": "verb",
  "lvl": "B2",
  "tr": "değiştirmek",
  "all": "değiştirmek, başkalaştırmak",
  "means": [
   "değiştirmek",
   "başkalaştırmak"
  ],
  "alt": [
   "başkalaştırmak"
  ],
  "der": "alteration (n) - değişiklik, unaltered (adj) - değişmemiş",
  "ex": "Human industrial activities significantly alter natural habitats across the globe.",
  "syn": []
 },
 {
  "w": "anticipate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "öngörmek",
  "all": "öngörmek, tahmin etmek",
  "means": [
   "öngörmek",
   "tahmin etmek"
  ],
  "alt": [
   "tahmin etmek"
  ],
  "der": "anticipation (n) - beklenti, anticipated (adj) - öngörülen",
  "ex": "Economists anticipate a gradual recovery in the manufacturing sector next quarter.",
  "syn": []
 },
 {
  "w": "apparent",
  "pos": "adj",
  "lvl": "B2",
  "tr": "belirgin",
  "all": "belirgin, aşikâr, görünürde",
  "means": [
   "belirgin",
   "aşikâr",
   "görünürde"
  ],
  "alt": [
   "aşikâr",
   "görünürde"
  ],
  "der": "apparently (adv) - görünüşe göre",
  "ex": "It became apparent that the initial scientific hypothesis was partially flawed.",
  "syn": []
 },
 {
  "w": "assess",
  "pos": "verb",
  "lvl": "B2",
  "tr": "değerlendirmek",
  "all": "değerlendirmek, paha biçmek",
  "means": [
   "değerlendirmek",
   "paha biçmek"
  ],
  "alt": [
   "paha biçmek"
  ],
  "der": "assessment (n) - değerlendirme, assessor (n) - değerlendirici",
  "ex": "Teachers use weekly quizzes to assess individual student progress continuously.",
  "syn": []
 },
 {
  "w": "assume",
  "pos": "verb",
  "lvl": "B2",
  "tr": "varsaymak",
  "all": "varsaymak, üstlenmek",
  "means": [
   "varsaymak",
   "üstlenmek"
  ],
  "alt": [
   "üstlenmek"
  ],
  "der": "assumption (n) - varsayım, assumed (adj) - varsayılan",
  "ex": "We cannot simply assume that all participants have equal internet access.",
  "syn": []
 },
 {
  "w": "bias",
  "pos": "noun/verb",
  "lvl": "B2",
  "tr": "ön yargı",
  "all": "ön yargı, taraf tutma / yönlendirmek",
  "means": [
   "ön yargı",
   "taraf tutma",
   "yönlendirmek"
  ],
  "alt": [
   "taraf tutma",
   "yönlendirmek"
  ],
  "der": "biased (adj) - taraflı, unbiased (adj) - tarafsız",
  "ex": "Researchers must avoid personal bias during the data collection process.",
  "syn": []
 },
 {
  "w": "breakthrough",
  "pos": "noun",
  "lvl": "B2",
  "tr": "çığır açan gelişme",
  "all": "çığır açan gelişme, büyük buluş",
  "means": [
   "çığır açan gelişme",
   "büyük buluş"
  ],
  "alt": [
   "büyük buluş"
  ],
  "der": "break through (phr v) - engelleri aşmak",
  "ex": "Medical scientists achieved a major breakthrough in targeted cancer treatment.",
  "syn": []
 },
 {
  "w": "capture",
  "pos": "verb",
  "lvl": "B2",
  "tr": "yakalamak",
  "all": "yakalamak, yansıtmak",
  "means": [
   "yakalamak",
   "yansıtmak"
  ],
  "alt": [
   "yansıtmak"
  ],
  "der": "captive (n/adj) - tutsak, captivity (n) - tutsaklık",
  "ex": "The award-winning documentary manages to capture the raw beauty of wild habitats.",
  "syn": []
 },
 {
  "w": "clarify",
  "pos": "verb",
  "lvl": "B2",
  "tr": "açıklığa kavuşturmak",
  "all": "açıklığa kavuşturmak, netleştirmek",
  "means": [
   "açıklığa kavuşturmak",
   "netleştirmek"
  ],
  "alt": [
   "netleştirmek"
  ],
  "der": "clarification (n) - açıklama, clarity (n) - netlik",
  "ex": "Please clarify your previous statement regarding the annual budget allocation.",
  "syn": []
 },
 {
  "w": "collapse",
  "pos": "verb/noun",
  "lvl": "B2",
  "tr": "çökmek",
  "all": "çökmek, yıkılmak / çöküş",
  "means": [
   "çökmek",
   "yıkılmak",
   "çöküş"
  ],
  "alt": [
   "yıkılmak",
   "çöküş"
  ],
  "der": "collapsible (adj) - katlanabilir",
  "ex": "Unstable structures may collapse suddenly during a high-magnitude earthquake.",
  "syn": []
 },
 {
  "w": "commit",
  "pos": "verb",
  "lvl": "B2",
  "tr": "adamak",
  "all": "adamak, kararlı olmak, suç işlemek",
  "means": [
   "adamak",
   "kararlı olmak",
   "suç işlemek"
  ],
  "alt": [
   "kararlı olmak",
   "suç işlemek"
  ],
  "der": "commitment (n) - bağlılık, committed (adj) - kendini adamış",
  "ex": "Students must commit sufficient time to daily independent practice.",
  "syn": []
 },
 {
  "w": "conduct",
  "pos": "verb/noun",
  "lvl": "B2",
  "tr": "yürütmek",
  "all": "yürütmek, düzenlemek / davranış",
  "means": [
   "yürütmek",
   "düzenlemek",
   "davranış"
  ],
  "alt": [
   "düzenlemek",
   "davranış"
  ],
  "der": "conductor (n) - iletken/yönetici",
  "ex": "University professors conduct groundbreaking research in quantum computing.",
  "syn": []
 },
 {
  "w": "consequence",
  "pos": "noun",
  "lvl": "B2",
  "tr": "sonuç",
  "all": "sonuç, netice",
  "means": [
   "sonuç",
   "netice"
  ],
  "alt": [
   "netice"
  ],
  "der": "consequent (adj) - sonuç olarak ortaya çıkan, consequently (adv) - bu nedenle",
  "ex": "Failure to follow industrial safety protocols can lead to catastrophic consequences .",
  "syn": []
 },
 {
  "w": "considerable",
  "pos": "adj",
  "lvl": "B2",
  "tr": "kayda değer",
  "all": "kayda değer, önemli miktarda",
  "means": [
   "kayda değer",
   "önemli miktarda"
  ],
  "alt": [
   "önemli miktarda"
  ],
  "der": "considerably (adv) - oldukça",
  "ex": "Solar power production has grown considerably across Europe over the last decade.",
  "syn": []
 },
 {
  "w": "contribute",
  "pos": "verb",
  "lvl": "B2",
  "tr": "katkıda bulunmak",
  "all": "katkıda bulunmak, sebep olmak",
  "means": [
   "katkıda bulunmak",
   "sebep olmak"
  ],
  "alt": [
   "sebep olmak"
  ],
  "der": "contribution (n) - katkı, contributor (n) - katkı sağlayan",
  "ex": "Consistent daily study will contribute significantly to achieving higher test scores.",
  "syn": []
 },
 {
  "w": "crucial",
  "pos": "adj",
  "lvl": "B2",
  "tr": "çok önemli",
  "all": "çok önemli, kritik, hayati",
  "means": [
   "çok önemli",
   "kritik",
   "hayati"
  ],
  "alt": [
   "kritik",
   "hayati"
  ],
  "der": "crucially (adv) - kritik şekilde",
  "ex": "Clear and open communication is crucial for effective team management.",
  "syn": []
 },
 {
  "w": "decline",
  "pos": "verb/noun",
  "lvl": "B2",
  "tr": "düşmek",
  "all": "düşmek, reddetmek / azalış",
  "means": [
   "düşmek",
   "reddetmek",
   "azalış"
  ],
  "alt": [
   "reddetmek",
   "azalış"
  ],
  "der": "declined (adj) - azalmış",
  "ex": "Global fossil fuel reserves continue to decline at an unprecedented rate.",
  "syn": []
 },
 {
  "w": "demonstrate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "göstermek",
  "all": "göstermek, kanıtlamak",
  "means": [
   "göstermek",
   "kanıtlamak"
  ],
  "alt": [
   "kanıtlamak"
  ],
  "der": "demonstration (n) - gösteri, demonstrative (adj) - gösterici",
  "ex": "Laboratory experiments demonstrate how the chemical compound reacts under pressure.",
  "syn": []
 },
 {
  "w": "distinguish",
  "pos": "verb",
  "lvl": "B2",
  "tr": "ayırt etmek",
  "all": "ayırt etmek, ayırt edici olmak",
  "means": [
   "ayırt etmek",
   "ayırt edici olmak"
  ],
  "alt": [
   "ayırt edici olmak"
  ],
  "der": "distinction (n) - ayrım, distinctive (adj) - ayırt edici",
  "ex": "Critical readers must learn to distinguish between objective facts and opinions.",
  "syn": []
 },
 {
  "w": "dominate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "egemen olmak",
  "all": "egemen olmak, baskın gelmek",
  "means": [
   "egemen olmak",
   "baskın gelmek"
  ],
  "alt": [
   "baskın gelmek"
  ],
  "der": "dominance (n) - egemenlik, dominant (adj) - baskın",
  "ex": "Large technology firms continue to dominate global communication markets.",
  "syn": []
 },
 {
  "w": "draft",
  "pos": "noun/verb",
  "lvl": "B2",
  "tr": "taslak",
  "all": "taslak / taslak yazmak",
  "means": [
   "taslak",
   "taslak yazmak"
  ],
  "alt": [
   "taslak yazmak"
  ],
  "der": "drafter (n) - taslak hazırlayan",
  "ex": "Students should complete an initial draft before submitting their final thesis.",
  "syn": []
 },
 {
  "w": "dynamic",
  "pos": "adj/noun",
  "lvl": "B2",
  "tr": "dinamik",
  "all": "dinamik, sürekli değişen / dinamik",
  "means": [
   "dinamik",
   "sürekli değişen",
   "dinamik"
  ],
  "alt": [
   "sürekli değişen",
   "dinamik"
  ],
  "der": "dynamically (adv) - dinamik şekilde, dynamism (n) - dinamizm",
  "ex": "The global financial market is highly dynamic and subject to rapid shifts.",
  "syn": []
 },
 {
  "w": "eliminate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "elemek",
  "all": "elemek, ortadan kaldırmak",
  "means": [
   "elemek",
   "ortadan kaldırmak"
  ],
  "alt": [
   "ortadan kaldırmak"
  ],
  "der": "elimination (n) - eleme",
  "ex": "Improved sanitation protocols help to eliminate waterborne infectious diseases.",
  "syn": []
 },
 {
  "w": "emphasize",
  "pos": "verb",
  "lvl": "B2",
  "tr": "vurgulamak",
  "all": "vurgulamak, üzerinde durmak",
  "means": [
   "vurgulamak",
   "üzerinde durmak"
  ],
  "alt": [
   "üzerinde durmak"
  ],
  "der": "emphasis (n) - vurgu, emphatic (adj) - vurgulu",
  "ex": "Academic instructors always emphasize the necessity of proper citations.",
  "syn": []
 },
 {
  "w": "encounter",
  "pos": "verb/noun",
  "lvl": "B2",
  "tr": "karşılaşmak",
  "all": "karşılaşmak / karşılaşma",
  "means": [
   "karşılaşmak",
   "karşılaşma"
  ],
  "alt": [
   "karşılaşma"
  ],
  "der": "encountered (adj) - karşılaşılan",
  "ex": "Field researchers may encounter unforeseen environmental hazards during expeditions.",
  "syn": []
 },
 {
  "w": "enhance",
  "pos": "verb",
  "lvl": "B2",
  "tr": "geliştirmek",
  "all": "geliştirmek, artırmak, iyileştirmek",
  "means": [
   "geliştirmek",
   "artırmak",
   "iyileştirmek"
  ],
  "alt": [
   "artırmak",
   "iyileştirmek"
  ],
  "der": "enhancement (n) - geliştirme, enhanced (adj) - geliştirilmiş",
  "ex": "Modern graphics cards can enhance visual clarity in complex simulations.",
  "syn": []
 },
 {
  "w": "ensure",
  "pos": "verb",
  "lvl": "B2",
  "tr": "sağlamak",
  "all": "sağlamak, garantiye almak",
  "means": [
   "sağlamak",
   "garantiye almak"
  ],
  "alt": [
   "garantiye almak"
  ],
  "der": "ensured (adj) - garantilenmiş",
  "ex": "Rigorous quality control measures ensure that product standards remain high.",
  "syn": []
 },
 {
  "w": "establish",
  "pos": "verb",
  "lvl": "B2",
  "tr": "kurmak",
  "all": "kurmak, saptamak, kabul ettirmek",
  "means": [
   "kurmak",
   "saptamak",
   "kabul ettirmek"
  ],
  "alt": [
   "saptamak",
   "kabul ettirmek"
  ],
  "der": "establishment (n) - kuruluş, established (adj) - yerleşik",
  "ex": "The university aims to establish strategic partnerships with overseas institutions.",
  "syn": []
 },
 {
  "w": "evaluate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "değerlendirmek",
  "all": "değerlendirmek, analiz etmek",
  "means": [
   "değerlendirmek",
   "analiz etmek"
  ],
  "alt": [
   "analiz etmek"
  ],
  "der": "evaluation (n) - değerlendirme, evaluative (adj) - değerlendirmeli",
  "ex": "The academic committee will evaluate research grant proposals next month.",
  "syn": []
 },
 {
  "w": "evidence",
  "pos": "noun",
  "lvl": "B2",
  "tr": "kanıt",
  "all": "kanıt, delil",
  "means": [
   "kanıt",
   "delil"
  ],
  "alt": [
   "delil"
  ],
  "der": "evident (adj) - açık, evidently (adv) - görünürde",
  "ex": "DNA testing provided conclusive evidence that led to solving the case.",
  "syn": []
 },
 {
  "w": "exceed",
  "pos": "verb",
  "lvl": "B2",
  "tr": "aşmak",
  "all": "aşmak, sınırı geçmek",
  "means": [
   "aşmak",
   "sınırı geçmek"
  ],
  "alt": [
   "sınırı geçmek"
  ],
  "der": "excess (n) - fazlalık, excessive (adj) - aşırı",
  "ex": "This quarter's revenue is expected to exceed initial financial projections.",
  "syn": []
 },
 {
  "w": "exclude",
  "pos": "verb",
  "lvl": "B2",
  "tr": "hariç tutmak",
  "all": "hariç tutmak, dışlamak",
  "means": [
   "hariç tutmak",
   "dışlamak"
  ],
  "alt": [
   "dışlamak"
  ],
  "der": "exclusion (n) - dışlama, exclusive (adj) - özel",
  "ex": "Statistical models should not exclude outlier data without proper justification.",
  "syn": []
 },
 {
  "w": "expose",
  "pos": "verb",
  "lvl": "B2",
  "tr": "maruz bırakmak",
  "all": "maruz bırakmak, açığa çıkarmak",
  "means": [
   "maruz bırakmak",
   "açığa çıkarmak"
  ],
  "alt": [
   "açığa çıkarmak"
  ],
  "der": "exposure (n) - maruz kalma, exposed (adj) - maruz kalmış",
  "ex": "Prolonged exposure to ultraviolet radiation can permanently damage eyesight.",
  "syn": []
 },
 {
  "w": "fundamental",
  "pos": "adj",
  "lvl": "B2",
  "tr": "temel",
  "all": "temel, esas, köklü",
  "means": [
   "temel",
   "esas",
   "köklü"
  ],
  "alt": [
   "esas",
   "köklü"
  ],
  "der": "fundamentally (adv) - temelden",
  "ex": "Freedom of speech is a fundamental human right protected by law.",
  "syn": []
 },
 {
  "w": "generate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "üretmek",
  "all": "üretmek, oluşturmak",
  "means": [
   "üretmek",
   "oluşturmak"
  ],
  "alt": [
   "oluşturmak"
  ],
  "der": "generation (n) - üretim/nesil, generator (n) - jeneratör",
  "ex": "Wind offshore farms generate clean electricity without carbon emissions.",
  "syn": []
 },
 {
  "w": "grant",
  "pos": "verb/noun",
  "lvl": "B2",
  "tr": "vermek",
  "all": "vermek, bağışlamak / hibe, burs",
  "means": [
   "vermek",
   "bağışlamak",
   "hibe",
   "burs"
  ],
  "alt": [
   "bağışlamak",
   "hibe",
   "burs"
  ],
  "der": "granted (adj) - bağışlanmış",
  "ex": "The board voted to grant research funding to the biotechnology team.",
  "syn": []
 },
 {
  "w": "guarantee",
  "pos": "verb/noun",
  "lvl": "B2",
  "tr": "garanti etmek",
  "all": "garanti etmek / güvence",
  "means": [
   "garanti etmek",
   "güvence"
  ],
  "alt": [
   "güvence"
  ],
  "der": "guaranteed (adj) - garantili",
  "ex": "A prestigious degree alone does not guarantee immediate career success.",
  "syn": []
 },
 {
  "w": "hypothesis",
  "pos": "noun",
  "lvl": "B2",
  "tr": "hipotez",
  "all": "hipotez, varsayım",
  "means": [
   "hipotez",
   "varsayım"
  ],
  "alt": [
   "varsayım"
  ],
  "der": "hypothesize (v) - hipotez kurmak, hypothetical (adj) - varsayımsal",
  "ex": "Scientists designed experiments to test their primary hypothesis thoroughly.",
  "syn": []
 },
 {
  "w": "illustrate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "örneklemek",
  "all": "örneklemek, açıklamak, resimlemek",
  "means": [
   "örneklemek",
   "açıklamak",
   "resimlemek"
  ],
  "alt": [
   "açıklamak",
   "resimlemek"
  ],
  "der": "illustration (n) - örnekleme, illustrative (adj) - açıklayıcı",
  "ex": "Clear diagrams help to illustrate complex biological processes effectively.",
  "syn": []
 },
 {
  "w": "impact",
  "pos": "noun/verb",
  "lvl": "B2",
  "tr": "etki",
  "all": "etki, darbe / etkilemek",
  "means": [
   "etki",
   "darbe",
   "etkilemek"
  ],
  "alt": [
   "darbe",
   "etkilemek"
  ],
  "der": "impactful (adj) - etkili",
  "ex": "Climate volatility has a direct impact on agricultural productivity worldwide.",
  "syn": []
 },
 {
  "w": "implement",
  "pos": "verb/noun",
  "lvl": "B2",
  "tr": "uygulamak",
  "all": "uygulamak, yürürlüğe koymak / araç",
  "means": [
   "uygulamak",
   "yürürlüğe koymak",
   "araç"
  ],
  "alt": [
   "yürürlüğe koymak",
   "araç"
  ],
  "der": "implementation (n) - uygulama",
  "ex": "The municipal council will implement new recycling policies starting January.",
  "syn": []
 },
 {
  "w": "imply",
  "pos": "verb",
  "lvl": "B2",
  "tr": "ima etmek",
  "all": "ima etmek, anlamına gelmek",
  "means": [
   "ima etmek",
   "anlamına gelmek"
  ],
  "alt": [
   "anlamına gelmek"
  ],
  "der": "implication (n) - ima/çıkarım, implicit (adj) - örtük",
  "ex": "The survey results imply that consumers prefer sustainable product packaging.",
  "syn": []
 },
 {
  "w": "indicate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "göstermek",
  "all": "göstermek, işaret etmek",
  "means": [
   "göstermek",
   "işaret etmek"
  ],
  "alt": [
   "işaret etmek"
  ],
  "der": "indication (n) - gösterge, indicator (n) - gösterge",
  "ex": "Data patterns indicate a gradual rise in global surface temperatures.",
  "syn": []
 },
 {
  "w": "inevitable",
  "pos": "adj",
  "lvl": "B2",
  "tr": "kaçınılmaz",
  "all": "kaçınılmaz, çaresiz",
  "means": [
   "kaçınılmaz",
   "çaresiz"
  ],
  "alt": [
   "çaresiz"
  ],
  "der": "inevitably (adv) - kaçınılmaz şekilde",
  "ex": "Technological disruption is an inevitable consequence of modern innovation.",
  "syn": []
 },
 {
  "w": "infer",
  "pos": "verb",
  "lvl": "B2",
  "tr": "çıkarım yapmak",
  "all": "çıkarım yapmak, anlam çıkarmak",
  "means": [
   "çıkarım yapmak",
   "anlam çıkarmak"
  ],
  "alt": [
   "anlam çıkarmak"
  ],
  "der": "inference (n) - çıkarım, inferential (adj) - çıkarımsal",
  "ex": "Readers must infer the author's underlying perspective from contextual clues.",
  "syn": []
 },
 {
  "w": "initial",
  "pos": "adj/noun",
  "lvl": "B2",
  "tr": "ilk",
  "all": "ilk, başlangıçtaki / baş harf",
  "means": [
   "ilk",
   "başlangıçtaki",
   "baş harf"
  ],
  "alt": [
   "başlangıçtaki",
   "baş harf"
  ],
  "der": "initially (adv) - başlangıçta, initiate (v) - başlatmak",
  "ex": "The initial testing phase produced encouraging and highly promising data.",
  "syn": []
 },
 {
  "w": "innovate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "yenilik yapmak",
  "all": "yenilik yapmak, icat etmek",
  "means": [
   "yenilik yapmak",
   "icat etmek"
  ],
  "alt": [
   "icat etmek"
  ],
  "der": "innovation (n) - yenilik, innovative (adj) - yenilikçi",
  "ex": "Technology firms must innovate continuously to maintain market dominance.",
  "syn": []
 },
 {
  "w": "insight",
  "pos": "noun",
  "lvl": "B2",
  "tr": "derin kavrayış",
  "all": "derin kavrayış, içgörü",
  "means": [
   "derin kavrayış",
   "içgörü"
  ],
  "alt": [
   "içgörü"
  ],
  "der": "insightful (adj) - kavrayışlı",
  "ex": "Historical research provides valuable insight into human cultural evolution.",
  "syn": []
 },
 {
  "w": "inspect",
  "pos": "verb",
  "lvl": "B2",
  "tr": "denetlemek",
  "all": "denetlemek, incelemek",
  "means": [
   "denetlemek",
   "incelemek"
  ],
  "alt": [
   "incelemek"
  ],
  "der": "inspection (n) - denetim, inspector (n) - müfettiş",
  "ex": "Engineers arrive annually to inspect the structural stability of the bridge.",
  "syn": []
 },
 {
  "w": "integrate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "bütünleştirmek",
  "all": "bütünleştirmek, entegre etmek",
  "means": [
   "bütünleştirmek",
   "entegre etmek"
  ],
  "alt": [
   "entegre etmek"
  ],
  "der": "integration (n) - entegrasyon, integrated (adj) - entegre",
  "ex": "Schools aim to integrate digital interactive tools into daily curricula.",
  "syn": []
 },
 {
  "w": "interpret",
  "pos": "verb",
  "lvl": "B2",
  "tr": "yorumlamak",
  "all": "yorumlamak, çevirmek",
  "means": [
   "yorumlamak",
   "çevirmek"
  ],
  "alt": [
   "çevirmek"
  ],
  "der": "interpretation (n) - yorum, interpreter (n) - mütercim",
  "ex": "Scholars may interpret historical texts in diverse and conflicting ways.",
  "syn": []
 },
 {
  "w": "investigate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "araştırmak",
  "all": "araştırmak, soruşturmak",
  "means": [
   "araştırmak",
   "soruşturmak"
  ],
  "alt": [
   "soruşturmak"
  ],
  "der": "investigation (n) - araştırma, investigator (n) - araştırmacı",
  "ex": "Detectives continue to investigate the circumstances surrounding the robbery.",
  "syn": []
 },
 {
  "w": "isolate",
  "pos": "verb",
  "lvl": "B2",
  "tr": "soyutlamak",
  "all": "soyutlamak, izole etmek",
  "means": [
   "soyutlamak",
   "izole etmek"
  ],
  "alt": [
   "izole etmek"
  ],
  "der": "isolation (n) - izolasyon, isolated (adj) - izole",
  "ex": "Medical staff worked quickly to isolate infected patients in specialized wards.",
  "syn": []
 },
 {
  "w": "justify",
  "pos": "verb",
  "lvl": "B2",
  "tr": "haklı çıkarmak",
  "all": "haklı çıkarmak, savunmak",
  "means": [
   "haklı çıkarmak",
   "savunmak"
  ],
  "alt": [
   "savunmak"
  ],
  "der": "justification (n) - gerekçe, justifiable (adj) - savunulabilir",
  "ex": "The company must justify the price hike to maintain consumer trust.",
  "syn": []
 },
 {
  "w": "maintain",
  "pos": "verb",
  "lvl": "B2",
  "tr": "korumak",
  "all": "korumak, sürdürmek, iddia etmek",
  "means": [
   "korumak",
   "sürdürmek",
   "iddia etmek"
  ],
  "alt": [
   "sürdürmek",
   "iddia etmek"
  ],
  "der": "maintenance (n) - bakım/koruma",
  "ex": "It is essential to maintain strict quality control throughout manufacturing.",
  "syn": []
 },
 {
  "w": "modify",
  "pos": "verb",
  "lvl": "B2",
  "tr": "değiştirmek",
  "all": "değiştirmek, modifiye etmek",
  "means": [
   "değiştirmek",
   "modifiye etmek"
  ],
  "alt": [
   "modifiye etmek"
  ],
  "der": "modification (n) - değişiklik, modified (adj) - değiştirilmiş",
  "ex": "Biologists can modify plant genetics to improve crop drought resistance.",
  "syn": []
 },
 {
  "w": "monitor",
  "pos": "verb/noun",
  "lvl": "B2",
  "tr": "izlemek",
  "all": "izlemek, denetlemek / ekran",
  "means": [
   "izlemek",
   "denetlemek",
   "ekran"
  ],
  "alt": [
   "denetlemek",
   "ekran"
  ],
  "der": "monitoring (n) - takip/izleme",
  "ex": "Physicians carefully monitor critical patient vitals during intensive surgery.",
  "syn": []
 },
 {
  "w": "objective",
  "pos": "noun/adj",
  "lvl": "B2",
  "tr": "hedef",
  "all": "hedef / nesnel, tarafsız",
  "means": [
   "hedef",
   "nesnel",
   "tarafsız"
  ],
  "alt": [
   "nesnel",
   "tarafsız"
  ],
  "der": "objectively (adv) - nesnel olarak, objectivity (n) - nesnellik",
  "ex": "Researchers must remain objective when analyzing experimental outcomes.",
  "syn": []
 },
 {
  "w": "obtain",
  "pos": "verb",
  "lvl": "B2",
  "tr": "elde etmek",
  "all": "elde etmek, edinmek, temin etmek",
  "means": [
   "elde etmek",
   "edinmek",
   "temin etmek"
  ],
  "alt": [
   "edinmek",
   "temin etmek"
  ],
  "der": "obtainable (adj) - elde edilebilir",
  "ex": "Applicants need to obtain certified academic transcripts before applying.",
  "syn": []
 },
 {
  "w": "obstacle",
  "pos": "noun",
  "lvl": "B2",
  "tr": "engel",
  "all": "engel, mani",
  "means": [
   "engel",
   "mani"
  ],
  "alt": [
   "mani"
  ],
  "der": "overcome (v) - üstesinden gelmek",
  "ex": "Financial constraints were the main obstacle to expanding the community center.",
  "syn": []
 },
 {
  "w": "occupy",
  "pos": "verb",
  "lvl": "B2",
  "tr": "meşgul etmek",
  "all": "meşgul etmek, kaplamak, işgal etmek",
  "means": [
   "meşgul etmek",
   "kaplamak",
   "işgal etmek"
  ],
  "alt": [
   "kaplamak",
   "işgal etmek"
  ],
  "der": "occupation (n) - meslek/işgal, occupant (n) - sakini",
  "ex": "Research projects occupy the vast majority of graduate student time.",
  "syn": []
 },
 {
  "w": "oppose",
  "pos": "verb",
  "lvl": "B2",
  "tr": "karşı çıkmak",
  "all": "karşı çıkmak, muhalefet etmek",
  "means": [
   "karşı çıkmak",
   "muhalefet etmek"
  ],
  "alt": [
   "muhalefet etmek"
  ],
  "der": "opposition (n) - muhalefet, opposite (adj) - karşıt",
  "ex": "Local residents strongly oppose building a landfill near the residential area.",
  "syn": []
 },
 {
  "w": "outcome",
  "pos": "noun",
  "lvl": "B2",
  "tr": "sonuç",
  "all": "sonuç, netice",
  "means": [
   "sonuç",
   "netice"
  ],
  "alt": [
   "netice"
  ],
  "der": "incoming (adj) - gelen",
  "ex": "The final outcome of the negotiations satisfied both participating parties.",
  "syn": []
 },
 {
  "w": "overcome",
  "pos": "verb",
  "lvl": "B2",
  "tr": "üstesinden gelmek",
  "all": "üstesinden gelmek, yenmek",
  "means": [
   "üstesinden gelmek",
   "yenmek"
  ],
  "alt": [
   "yenmek"
  ],
  "der": "overcome (adj) - yenik düşmüş",
  "ex": "Persistence and strategy allow students to overcome exam stress effectively.",
  "syn": []
 },
 {
  "w": "perceive",
  "pos": "verb",
  "lvl": "B2",
  "tr": "algılamak",
  "all": "algılamak, kavramak",
  "means": [
   "algılamak",
   "kavramak"
  ],
  "alt": [
   "kavramak"
  ],
  "der": "perception (n) - algı, perceptive (adj) - algısı yüksek",
  "ex": "How citizens perceive economic risks influences their long-term savings.",
  "syn": []
 },
 {
  "w": "perspective",
  "pos": "noun",
  "lvl": "B2",
  "tr": "bakış açısı",
  "all": "bakış açısı, perspektif",
  "means": [
   "bakış açısı",
   "perspektif"
  ],
  "alt": [
   "perspektif"
  ],
  "der": "prospective (adj) - olası/müstakbel",
  "ex": "Studying abroad broadens a student's cultural and academic perspective .",
  "syn": []
 },
 {
  "w": "phenomenon",
  "pos": "noun",
  "lvl": "B2",
  "tr": "olgu",
  "all": "olgu, fenomen, doğa olayı",
  "means": [
   "olgu",
   "fenomen",
   "doğa olayı"
  ],
  "alt": [
   "fenomen",
   "doğa olayı"
  ],
  "der": "phenomenal (adj) - olağanüstü",
  "ex": "Global climate change is a complex phenomenon studied across multiple disciplines.",
  "syn": []
 },
 {
  "w": "preserve",
  "pos": "verb",
  "lvl": "B2",
  "tr": "korumak",
  "all": "korumak, muhafaza etmek",
  "means": [
   "korumak",
   "muhafaza etmek"
  ],
  "alt": [
   "muhafaza etmek"
  ],
  "der": "preservation (n) - koruma, preserved (adj) - korunmuş",
  "ex": "Historians work painstakingly to preserve ancient fragile documents.",
  "syn": []
 },
 {
  "w": "priority",
  "pos": "noun",
  "lvl": "B2",
  "tr": "öncelik",
  "all": "öncelik",
  "means": [
   "öncelik"
  ],
  "alt": [],
  "der": "prioritize (v) - önceliklendirmek",
  "ex": "Ensuring student safety remains the top priority for university leaders.",
  "syn": []
 },
 {
  "w": "proceed",
  "pos": "verb",
  "lvl": "B2",
  "tr": "ilerlemek",
  "all": "ilerlemek, devam etmek",
  "means": [
   "ilerlemek",
   "devam etmek"
  ],
  "alt": [
   "devam etmek"
  ],
  "der": "procedure (n) - prosedür, proceeding (n) - gidişat",
  "ex": "Following the brief announcement, the chairman agreed to proceed with voting.",
  "syn": []
 },
 {
  "w": "promote",
  "pos": "verb",
  "lvl": "B2",
  "tr": "teşvik etmek",
  "all": "teşvik etmek, terfi ettirmek",
  "means": [
   "teşvik etmek",
   "terfi ettirmek"
  ],
  "alt": [
   "terfi ettirmek"
  ],
  "der": "promotion (n) - terfi/teşvik, promotional (adj) - tanıtıcı",
  "ex": "Universities promote interdisciplinary research projects among faculties.",
  "syn": []
 },
 {
  "w": "proportion",
  "pos": "noun",
  "lvl": "B2",
  "tr": "oran",
  "all": "oran, orantı, pay",
  "means": [
   "oran",
   "orantı",
   "pay"
  ],
  "alt": [
   "orantı",
   "pay"
  ],
  "der": "proportional (adj) - orantılı, disproportionate (adj) - orantısız",
  "ex": "A significant proportion of international graduates secured immediate jobs.",
  "syn": []
 },
 {
  "w": "pursue",
  "pos": "verb",
  "lvl": "B2",
  "tr": "takip etmek",
  "all": "takip etmek, sürdürmek",
  "means": [
   "takip etmek",
   "sürdürmek"
  ],
  "alt": [
   "sürdürmek"
  ],
  "der": "pursuit (n) - takip/arama",
  "ex": "Many ambitious scholars decide to pursue post-doctoral studies abroad.",
  "syn": []
 },
 {
  "w": "reinforce",
  "pos": "verb",
  "lvl": "B2",
  "tr": "pekiştirmek",
  "all": "pekiştirmek, güçlendirmek",
  "means": [
   "pekiştirmek",
   "güçlendirmek"
  ],
  "alt": [
   "güçlendirmek"
  ],
  "der": "reinforcement (n) - pekiştirme",
  "ex": "Daily vocabulary revision will reinforce long-term memory retention.",
  "syn": []
 },
 {
  "w": "relevant",
  "pos": "adj",
  "lvl": "B2",
  "tr": "ilgili",
  "all": "ilgili, alakalı, konuya uygun",
  "means": [
   "ilgili",
   "alakalı",
   "konuya uygun"
  ],
  "alt": [
   "alakalı",
   "konuya uygun"
  ],
  "der": "relevance (n) - ilgi/alaka, irrelevant (adj) - ilgisiz",
  "ex": "Candidates must submit documents relevant to their formal application.",
  "syn": []
 },
 {
  "w": "resemble",
  "pos": "verb",
  "lvl": "B2",
  "tr": "benzemek",
  "all": "benzemek, andırmak",
  "means": [
   "benzemek",
   "andırmak"
  ],
  "alt": [
   "andırmak"
  ],
  "der": "resemblance (n) - benzerlik",
  "ex": "The newly synthesized compound closely resembles natural antibiotic enzymes.",
  "syn": []
 },
 {
  "w": "resist",
  "pos": "verb",
  "lvl": "B2",
  "tr": "direnmek",
  "all": "direnmek, karşı koymak",
  "means": [
   "direnmek",
   "karşı koymak"
  ],
  "alt": [
   "karşı koymak"
  ],
  "der": "resistance (n) - direnç, resistant (adj) - dirençli",
  "ex": "Certain mutated bacterial strains can resist common clinical antibiotics.",
  "syn": []
 },
 {
  "w": "resolve",
  "pos": "verb/noun",
  "lvl": "B2",
  "tr": "çözmek",
  "all": "çözmek, kararlaştırmak / azim",
  "means": [
   "çözmek",
   "kararlaştırmak",
   "azim"
  ],
  "alt": [
   "kararlaştırmak",
   "azim"
  ],
  "der": "resolution (n) - çözüm/karar",
  "ex": "Diplomats convened to resolve international trade friction peacefully.",
  "syn": []
 },
 {
  "w": "restrict",
  "pos": "verb",
  "lvl": "B2",
  "tr": "kısıtlamak",
  "all": "kısıtlamak, sınırlamak",
  "means": [
   "kısıtlamak",
   "sınırlamak"
  ],
  "alt": [
   "sınırlamak"
  ],
  "der": "restriction (n) - kısıtlama, restrictive (adj) - kısıtlayıcı",
  "ex": "Municipal codes restrict heavy freight vehicles from residential streets.",
  "syn": []
 },
 {
  "w": "reveal",
  "pos": "verb",
  "lvl": "B2",
  "tr": "açığa çıkarmak",
  "all": "açığa çıkarmak, ifşa etmek",
  "means": [
   "açığa çıkarmak",
   "ifşa etmek"
  ],
  "alt": [
   "ifşa etmek"
  ],
  "der": "revelation (n) - vahiy/ifşa, revealing (adj) - açıklayıcı",
  "ex": "The thorough audit did not reveal any financial irregularities.",
  "syn": []
 },
 {
  "w": "shift",
  "pos": "verb/noun",
  "lvl": "B2",
  "tr": "değiştirmek",
  "all": "değiştirmek, kaymak / değişim",
  "means": [
   "değiştirmek",
   "kaymak",
   "değişim"
  ],
  "alt": [
   "kaymak",
   "değişim"
  ],
  "der": "shifting (adj) - değişen",
  "ex": "There has been a gradual shift toward renewable energy investment worldwide.",
  "syn": []
 },
 {
  "w": "significant",
  "pos": "adj",
  "lvl": "B2",
  "tr": "önemli",
  "all": "önemli, anlamlı, kayda değer",
  "means": [
   "önemli",
   "anlamlı",
   "kayda değer"
  ],
  "alt": [
   "anlamlı",
   "kayda değer"
  ],
  "der": "significantly (adv) - önemli ölçüde, significance (n) - önem",
  "ex": "The research study found a significant correlation between exercise and health.",
  "syn": []
 },
 {
  "w": "substitute",
  "pos": "verb/noun",
  "lvl": "B2",
  "tr": "yerine geçmek",
  "all": "yerine geçmek, ikame etmek / yedek",
  "means": [
   "yerine geçmek",
   "ikame etmek",
   "yedek"
  ],
  "alt": [
   "ikame etmek",
   "yedek"
  ],
  "der": "substitution (n) - ikame",
  "ex": "Solar energy cannot completely substitute baseload power overnight.",
  "syn": []
 },
 {
  "w": "sufficient",
  "pos": "adj",
  "lvl": "B2",
  "tr": "yeterli",
  "all": "yeterli, kafi",
  "means": [
   "yeterli",
   "kafi"
  ],
  "alt": [
   "kafi"
  ],
  "der": "sufficiently (adv) - yeterince, sufficiency (n) - yeterlilik",
  "ex": "Make sure you allow sufficient time for revision before the final exam.",
  "syn": []
 },
 {
  "w": "transform",
  "pos": "verb",
  "lvl": "B2",
  "tr": "dönüştürmek",
  "all": "dönüştürmek, değiştirmek",
  "means": [
   "dönüştürmek",
   "değiştirmek"
  ],
  "alt": [
   "değiştirmek"
  ],
  "der": "transformation (n) - dönüşüm, transformative (adj) - dönüştürücü",
  "ex": "Artificial intelligence has the potential to transform global healthcare.",
  "syn": []
 },
 {
  "w": "ultimate",
  "pos": "adj",
  "lvl": "B2",
  "tr": "nihai",
  "all": "nihai, son, en büyük",
  "means": [
   "nihai",
   "son",
   "en büyük"
  ],
  "alt": [
   "son",
   "en büyük"
  ],
  "der": "ultimately (adv) - nihayetinde",
  "ex": "The ultimate objective of academic research is to advance human welfare.",
  "syn": []
 },
 {
  "w": "valid",
  "pos": "adj",
  "lvl": "B2",
  "tr": "geçerli",
  "all": "geçerli, mantıklı, doğru",
  "means": [
   "geçerli",
   "mantıklı",
   "doğru"
  ],
  "alt": [
   "mantıklı",
   "doğru"
  ],
  "der": "validate (v) - doğrulamak, validity (n) - geçerlilik",
  "ex": "You must present a valid student identification card to access the laboratory.",
  "syn": []
 },
 {
  "w": "vary",
  "pos": "verb",
  "lvl": "B2",
  "tr": "çeşitlilik göstermek",
  "all": "çeşitlilik göstermek, değişmek",
  "means": [
   "çeşitlilik göstermek",
   "değişmek"
  ],
  "alt": [
   "değişmek"
  ],
  "der": "various (adj) - çeşitli, variety (n) - çeşitlilik, variable (adj/n) - değişken",
  "ex": "Experimental results may vary depending on environmental temperature.",
  "syn": []
 },
 {
  "w": "attain",
  "pos": "verb",
  "lvl": "C1",
  "tr": "ulaşmak",
  "all": "ulaşmak, elde etmek, başarmak",
  "means": [
   "ulaşmak",
   "elde etmek",
   "başarmak"
  ],
  "alt": [
   "elde etmek",
   "başarmak"
  ],
  "der": "attainment (n) - elde etme, attainable (adj) - ulaşılabilir",
  "ex": "Hard work and discipline are essential to attain academic excellence.",
  "syn": []
 },
 {
  "w": "attribute",
  "pos": "verb/noun",
  "lvl": "C1",
  "tr": "bağlamak",
  "all": "bağlamak, atfetmek / özellik",
  "means": [
   "bağlamak",
   "atfetmek",
   "özellik"
  ],
  "alt": [
   "atfetmek",
   "özellik"
  ],
  "der": "attribution (n) - atıf, attributable (adj) - bağlanabilir",
  "ex": "Experts attribute recent economic growth to breakthrough technological innovation.",
  "syn": []
 },
 {
  "w": "coincide",
  "pos": "verb",
  "lvl": "C1",
  "tr": "çakışmak",
  "all": "çakışmak, aynı zamana denk gelmek",
  "means": [
   "çakışmak",
   "aynı zamana denk gelmek"
  ],
  "alt": [
   "aynı zamana denk gelmek"
  ],
  "der": "coincidence (n) - tesadüf, coincidental (adj) - tesadüfi",
  "ex": "The release of the economic report will coincide with the international summit.",
  "syn": []
 },
 {
  "w": "compensate",
  "pos": "verb",
  "lvl": "C1",
  "tr": "telafi etmek",
  "all": "telafi etmek, tazmin etmek",
  "means": [
   "telafi etmek",
   "tazmin etmek"
  ],
  "alt": [
   "tazmin etmek"
  ],
  "der": "compensation (n) - tazminat, compensatory (adj) - telafi edici",
  "ex": "The company offered financial rewards to compensate for the unexpected delay.",
  "syn": []
 },
 {
  "w": "compile",
  "pos": "verb",
  "lvl": "C1",
  "tr": "derlemek",
  "all": "derlemek, toplamak",
  "means": [
   "derlemek",
   "toplamak"
  ],
  "alt": [
   "toplamak"
  ],
  "der": "compilation (n) - derleme",
  "ex": "Researchers spent six months to compile historical data from ancient manuscripts.",
  "syn": []
 },
 {
  "w": "complement",
  "pos": "verb/noun",
  "lvl": "C1",
  "tr": "tamamlamak",
  "all": "tamamlamak / tamamlayıcı unsur",
  "means": [
   "tamamlamak",
   "tamamlayıcı unsur"
  ],
  "alt": [
   "tamamlayıcı unsur"
  ],
  "der": "complementary (adj) - tamamlayıcı",
  "ex": "Theoretical lectures should complement hands-on practical laboratory experience.",
  "syn": []
 },
 {
  "w": "comply",
  "pos": "verb",
  "lvl": "C1",
  "tr": "uymak",
  "all": "uymak, itaat etmek",
  "means": [
   "uymak",
   "itaat etmek"
  ],
  "alt": [
   "itaat etmek"
  ],
  "der": "compliance (n) - uyum, compliant (adj) - uyumlu",
  "ex": "All pharmaceutical trials must comply with rigorous international safety guidelines.",
  "syn": []
 },
 {
  "w": "comprehend",
  "pos": "verb",
  "lvl": "C1",
  "tr": "kavramak",
  "all": "kavramak, tam olarak anlamak",
  "means": [
   "kavramak",
   "tam olarak anlamak"
  ],
  "alt": [
   "tam olarak anlamak"
  ],
  "der": "comprehension (n) - kavrama, comprehensive (adj) - kapsamlı",
  "ex": "It is difficult to comprehend the immense physical scale of the universe.",
  "syn": []
 },
 {
  "w": "concede",
  "pos": "verb",
  "lvl": "C1",
  "tr": "kabullenmek",
  "all": "kabullenmek, mağlubiyeti kabul etmek",
  "means": [
   "kabullenmek",
   "mağlubiyeti kabul etmek"
  ],
  "alt": [
   "mağlubiyeti kabul etmek"
  ],
  "der": "concession (n) - taviz, kabullenme",
  "ex": "The politician had to concede defeat after all official votes were counted.",
  "syn": []
 },
 {
  "w": "conceive",
  "pos": "verb",
  "lvl": "C1",
  "tr": "tasarlamak",
  "all": "tasarlamak, hayal etmek, kavramak",
  "means": [
   "tasarlamak",
   "hayal etmek",
   "kavramak"
  ],
  "alt": [
   "hayal etmek",
   "kavramak"
  ],
  "der": "concept (n) - kavram, conception (n) - tasarım, conceivable (adj) - kavranabilir",
  "ex": "Architects conceive modern eco-friendly buildings that minimize energy loss.",
  "syn": []
 },
 {
  "w": "conform",
  "pos": "verb",
  "lvl": "C1",
  "tr": "uymak",
  "all": "uymak, uyum sağlamak",
  "means": [
   "uymak",
   "uyum sağlamak"
  ],
  "alt": [
   "uyum sağlamak"
  ],
  "der": "conformity (n) - uyum, conformed (adj) - uyarlanmış",
  "ex": "Individuals often conform to established societal norms and cultural traditions.",
  "syn": []
 },
 {
  "w": "consent",
  "pos": "noun/verb",
  "lvl": "C1",
  "tr": "rıza",
  "all": "rıza, onay / onay vermek",
  "means": [
   "rıza",
   "onay",
   "onay vermek"
  ],
  "alt": [
   "onay",
   "onay vermek"
  ],
  "der": "consensual (adj) - rızaya dayalı",
  "ex": "Patients must give informed consent before undergoing complex surgical procedures.",
  "syn": []
 },
 {
  "w": "constitute",
  "pos": "verb",
  "lvl": "C1",
  "tr": "oluşturmak",
  "all": "oluşturmak, teşkil etmek",
  "means": [
   "oluşturmak",
   "teşkil etmek"
  ],
  "alt": [
   "teşkil etmek"
  ],
  "der": "constitution (n) - anayasa/yapı, constitutional (adj) - anayasal",
  "ex": "Small businesses constitute nearly seventy percent of the total national workforce.",
  "syn": []
 },
 {
  "w": "constrain",
  "pos": "verb",
  "lvl": "C1",
  "tr": "kısıtlamak",
  "all": "kısıtlamak, engellemek",
  "means": [
   "kısıtlamak",
   "engellemek"
  ],
  "alt": [
   "engellemek"
  ],
  "der": "constraint (n) - kısıtlama, constrained (adj) - kısıtlı",
  "ex": "Strict budget limits severely constrain the total scope of urban development.",
  "syn": []
 },
 {
  "w": "contradict",
  "pos": "verb",
  "lvl": "C1",
  "tr": "çelişmek",
  "all": "çelişmek, aksini iddia etmek",
  "means": [
   "çelişmek",
   "aksini iddia etmek"
  ],
  "alt": [
   "aksini iddia etmek"
  ],
  "der": "contradiction (n) - çelişki, contradictory (adj) - çelişkili",
  "ex": "New scientific evidence appears to contradict long-held traditional theories.",
  "syn": []
 },
 {
  "w": "deduce",
  "pos": "verb",
  "lvl": "C1",
  "tr": "çıkarım yapmak",
  "all": "çıkarım yapmak, mantık yürütmek",
  "means": [
   "çıkarım yapmak",
   "mantık yürütmek"
  ],
  "alt": [
   "mantık yürütmek"
  ],
  "der": "deduction (n) - çıkarım, deductive (adj) - tümdengelimsel",
  "ex": "From the forensic evidence provided, investigators were able to deduce the truth.",
  "syn": []
 },
 {
  "w": "deteriorate",
  "pos": "verb",
  "lvl": "C1",
  "tr": "kötüleşmek",
  "all": "kötüleşmek, bozulmak",
  "means": [
   "kötüleşmek",
   "bozulmak"
  ],
  "alt": [
   "bozulmak"
  ],
  "der": "deterioration (n) - kötüleşme",
  "ex": "Urban air quality began to deteriorate rapidly following industrial expansion.",
  "syn": []
 },
 {
  "w": "diminish",
  "pos": "verb",
  "lvl": "C1",
  "tr": "azalmak",
  "all": "azalmak, eksiltmek",
  "means": [
   "azalmak",
   "eksiltmek"
  ],
  "alt": [
   "eksiltmek"
  ],
  "der": "diminished (adj) - azalmış",
  "ex": "Without regular upkeep, machine efficiency will diminish noticeably over time.",
  "syn": []
 },
 {
  "w": "facilitate",
  "pos": "verb",
  "lvl": "C1",
  "tr": "kolaylaştırmak",
  "all": "kolaylaştırmak, olanak sağlamak",
  "means": [
   "kolaylaştırmak",
   "olanak sağlamak"
  ],
  "alt": [
   "olanak sağlamak"
  ],
  "der": "facilitation (n) - kolaylaştırma, facilitator (n) - kolaylaştırıcı",
  "ex": "Online learning platforms help to facilitate interaction between remote students.",
  "syn": []
 },
 {
  "w": "fluctuate",
  "pos": "verb",
  "lvl": "C1",
  "tr": "dalgalanmak",
  "all": "dalgalanmak, inip çıkmak",
  "means": [
   "dalgalanmak",
   "inip çıkmak"
  ],
  "alt": [
   "inip çıkmak"
  ],
  "der": "fluctuation (n) - dalgalanma, fluctuating (adj) - dalgalı",
  "ex": "International crude oil prices fluctuate based on geopolitical tensions.",
  "syn": []
 },
 {
  "w": "foster",
  "pos": "verb",
  "lvl": "C1",
  "tr": "teşvik etmek",
  "all": "teşvik etmek, beslemek, geliştirmek",
  "means": [
   "teşvik etmek",
   "beslemek",
   "geliştirmek"
  ],
  "alt": [
   "beslemek",
   "geliştirmek"
  ],
  "der": "fostered (adj) - teşvik edilmiş",
  "ex": "Educational institutions strive to foster critical thinking and innovation.",
  "syn": []
 },
 {
  "w": "impose",
  "pos": "verb",
  "lvl": "C1",
  "tr": "zorla kabul ettirmek",
  "all": "zorla kabul ettirmek, uygulamaya koymak",
  "means": [
   "zorla kabul ettirmek",
   "uygulamaya koymak"
  ],
  "alt": [
   "uygulamaya koymak"
  ],
  "der": "imposition (n) - yükleme, imposing (adj) - heybetli",
  "ex": "Governments may impose strict tariffs on imported manufactured goods.",
  "syn": []
 },
 {
  "w": "incentive",
  "pos": "noun",
  "lvl": "C1",
  "tr": "teşvik",
  "all": "teşvik, güdü, özendirme",
  "means": [
   "teşvik",
   "güdü",
   "özendirme"
  ],
  "alt": [
   "güdü",
   "özendirme"
  ],
  "der": "incentivize (v) - teşvik etmek",
  "ex": "Financial bonuses act as a powerful incentive for workplace productivity.",
  "syn": []
 },
 {
  "w": "incorporate",
  "pos": "verb",
  "lvl": "C1",
  "tr": "dahil etmek",
  "all": "dahil etmek, bünyesine katmak",
  "means": [
   "dahil etmek",
   "bünyesine katmak"
  ],
  "alt": [
   "bünyesine katmak"
  ],
  "der": "incorporation (n) - birleşme, katılım",
  "ex": "Architects plan to incorporate solar panels into the residential design.",
  "syn": []
 },
 {
  "w": "infrastructure",
  "pos": "noun",
  "lvl": "C1",
  "tr": "altyapı",
  "all": "altyapı",
  "means": [
   "altyapı"
  ],
  "alt": [],
  "der": "infrastructural (adj) - altyapısal",
  "ex": "Developing nations require continuous investment in transport infrastructure .",
  "syn": []
 },
 {
  "w": "inhibit",
  "pos": "verb",
  "lvl": "C1",
  "tr": "engellemek",
  "all": "engellemek, dizginlemek, yavaşlatmak",
  "means": [
   "engellemek",
   "dizginlemek",
   "yavaşlatmak"
  ],
  "alt": [
   "dizginlemek",
   "yavaşlatmak"
  ],
  "der": "inhibition (n) - engel, inhibitor (n) - engelleyici",
  "ex": "Sub-zero temperatures can inhibit the cellular growth of organic matter.",
  "syn": []
 },
 {
  "w": "intensify",
  "pos": "verb",
  "lvl": "C1",
  "tr": "yoğunlaştırmak",
  "all": "yoğunlaştırmak, şiddetlenmek",
  "means": [
   "yoğunlaştırmak",
   "şiddetlenmek"
  ],
  "alt": [
   "şiddetlenmek"
  ],
  "der": "intensity (n) - yoğunluk, intensive (adj) - yoğun",
  "ex": "Competition among telecom companies will intensify over the next few years.",
  "syn": []
 },
 {
  "w": "intervene",
  "pos": "verb",
  "lvl": "C1",
  "tr": "müdahale etmek",
  "all": "müdahale etmek, araya girmek",
  "means": [
   "müdahale etmek",
   "araya girmek"
  ],
  "alt": [
   "araya girmek"
  ],
  "der": "intervention (n) - müdahale",
  "ex": "International organizations had to intervene to prevent humanitarian crises.",
  "syn": []
 },
 {
  "w": "manipulate",
  "pos": "verb",
  "lvl": "C1",
  "tr": "manipüle etmek",
  "all": "manipüle etmek, yönlendirmek",
  "means": [
   "manipüle etmek",
   "yönlendirmek"
  ],
  "alt": [
   "yönlendirmek"
  ],
  "der": "manipulation (n) - manipülasyon, manipulative (adj) - hileli",
  "ex": "Media channels should not manipulate public emotion using selective facts.",
  "syn": []
 },
 {
  "w": "neglect",
  "pos": "verb/noun",
  "lvl": "C1",
  "tr": "ihmal etmek",
  "all": "ihmal etmek / ihmal",
  "means": [
   "ihmal etmek",
   "ihmal"
  ],
  "alt": [
   "ihmal"
  ],
  "der": "neglected (adj) - ihmal edilmiş, negligent (adj) - ihmalkar",
  "ex": "Property owners should not neglect basic roof repairs before winter.",
  "syn": []
 },
 {
  "w": "persist",
  "pos": "verb",
  "lvl": "C1",
  "tr": "ısrar etmek",
  "all": "ısrar etmek, inatla sürmek",
  "means": [
   "ısrar etmek",
   "inatla sürmek"
  ],
  "alt": [
   "inatla sürmek"
  ],
  "der": "persistence (n) - kararlılık, persistent (adj) - sürekli",
  "ex": "If physical symptoms persist for over three days, seek professional medical care.",
  "syn": []
 },
 {
  "w": "predominant",
  "pos": "adj",
  "lvl": "C1",
  "tr": "baskın",
  "all": "baskın, hâkim, üstün",
  "means": [
   "baskın",
   "hâkim",
   "üstün"
  ],
  "alt": [
   "hâkim",
   "üstün"
  ],
  "der": "predominantly (adv) - çoğunlukla, predominance (n) - baskınlık",
  "ex": "Agriculture remains the predominant economic activity in rural provinces.",
  "syn": []
 },
 {
  "w": "prevail",
  "pos": "verb",
  "lvl": "C1",
  "tr": "üstün gelmek",
  "all": "üstün gelmek, hakim olmak",
  "means": [
   "üstün gelmek",
   "hakim olmak"
  ],
  "alt": [
   "hakim olmak"
  ],
  "der": "prevailing (adj) - yaygın, prevalence (n) - yaygınlık",
  "ex": "Truth and justice will ultimately prevail in any open democratic tribunal.",
  "syn": []
 },
 {
  "w": "rational",
  "pos": "adj",
  "lvl": "C1",
  "tr": "rasyonel",
  "all": "rasyonel, akılcı, mantıklı",
  "means": [
   "rasyonel",
   "akılcı",
   "mantıklı"
  ],
  "alt": [
   "akılcı",
   "mantıklı"
  ],
  "der": "rationally (adv) - mantıklıca, rationality (n) - rasyonellik",
  "ex": "Financial investors should make rational choices based on market data.",
  "syn": []
 },
 {
  "w": "reluctance",
  "pos": "noun",
  "lvl": "C1",
  "tr": "isteksizlik",
  "all": "isteksizlik, gönülsüzlük",
  "means": [
   "isteksizlik",
   "gönülsüzlük"
  ],
  "alt": [
   "gönülsüzlük"
  ],
  "der": "reluctant (adj) - isteksiz, reluctantly (adv) - istemeyerek",
  "ex": "The board expressed initial reluctance to change existing company policy.",
  "syn": []
 },
 {
  "w": "retain",
  "pos": "verb",
  "lvl": "C1",
  "tr": "elinde tutmak",
  "all": "elinde tutmak, muhafaza etmek",
  "means": [
   "elinde tutmak",
   "muhafaza etmek"
  ],
  "alt": [
   "muhafaza etmek"
  ],
  "der": "retention (n) - tutma, retentive (adj) - tutucu",
  "ex": "The tech company managed to retain its top software engineers successfully.",
  "syn": []
 },
 {
  "w": "revoke",
  "pos": "verb",
  "lvl": "C1",
  "tr": "iptal etmek",
  "all": "iptal etmek, yürürlükten kaldırmak",
  "means": [
   "iptal etmek",
   "yürürlükten kaldırmak"
  ],
  "alt": [
   "yürürlükten kaldırmak"
  ],
  "der": "revocation (n) - iptal",
  "ex": "Authorities have the right to revoke operational licenses upon safety breaches.",
  "syn": []
 },
 {
  "w": "rigid",
  "pos": "adj",
  "lvl": "C1",
  "tr": "katı",
  "all": "katı, sert, esnemez",
  "means": [
   "katı",
   "sert",
   "esnemez"
  ],
  "alt": [
   "sert",
   "esnemez"
  ],
  "der": "rigidity (n) - katılık, rigidly (adv) - katıca",
  "ex": "Educational systems should avoid rigid rules that suppress creative thinking.",
  "syn": []
 },
 {
  "w": "stimulate",
  "pos": "verb",
  "lvl": "C1",
  "tr": "uyarmak",
  "all": "uyarmak, teşvik etmek, canlandırmak",
  "means": [
   "uyarmak",
   "teşvik etmek",
   "canlandırmak"
  ],
  "alt": [
   "teşvik etmek",
   "canlandırmak"
  ],
  "der": "stimulation (n) - uyarım, stimulant (n) - uyarıcı",
  "ex": "Lower tax rates can stimulate domestic business investment significantly.",
  "syn": []
 },
 {
  "w": "substantial",
  "pos": "adj",
  "lvl": "C1",
  "tr": "büyük",
  "all": "büyük, kayda değer, önemli",
  "means": [
   "büyük",
   "kayda değer",
   "önemli"
  ],
  "alt": [
   "kayda değer",
   "önemli"
  ],
  "der": "substantially (adv) - büyük oranda",
  "ex": "Building the new university wing required a substantial investment.",
  "syn": []
 },
 {
  "w": "supplement",
  "pos": "verb/noun",
  "lvl": "C1",
  "tr": "takviye etmek",
  "all": "takviye etmek / ek, ilave",
  "means": [
   "takviye etmek",
   "ek",
   "ilave"
  ],
  "alt": [
   "ek",
   "ilave"
  ],
  "der": "supplementary (adj) - ek/tamamlayıcı",
  "ex": "Students can supplement classroom lectures with online digital modules.",
  "syn": []
 },
 {
  "w": "sustain",
  "pos": "verb",
  "lvl": "C1",
  "tr": "sürdürmek",
  "all": "sürdürmek, devam ettirmek, desteklemek",
  "means": [
   "sürdürmek",
   "devam ettirmek",
   "desteklemek"
  ],
  "alt": [
   "devam ettirmek",
   "desteklemek"
  ],
  "der": "sustainable (adj) - sürdürülebilir, sustainability (n) - sürdürülebilirlik",
  "ex": "Modern cities must adopt green practices to sustain growing populations.",
  "syn": []
 },
 {
  "w": "undergo",
  "pos": "verb",
  "lvl": "C1",
  "tr": "geçirmek",
  "all": "geçirmek, maruz kalmak, yaşamak",
  "means": [
   "geçirmek",
   "maruz kalmak",
   "yaşamak"
  ],
  "alt": [
   "maruz kalmak",
   "yaşamak"
  ],
  "der": "undergoing (adj) - geçirmekte olan",
  "ex": "The university facility will undergo extensive modern renovations this summer.",
  "syn": []
 },
 {
  "w": "unprecedented",
  "pos": "adj",
  "lvl": "C1",
  "tr": "emsalsiz",
  "all": "emsalsiz, eşi benzeri görülmemiş",
  "means": [
   "emsalsiz",
   "eşi benzeri görülmemiş"
  ],
  "alt": [
   "eşi benzeri görülmemiş"
  ],
  "der": "precedented (adj) - emsali olan",
  "ex": "The scientific discovery triggered an unprecedented wave of innovation.",
  "syn": []
 },
 {
  "w": "utilize",
  "pos": "verb",
  "lvl": "C1",
  "tr": "faydalanmak",
  "all": "faydalanmak, yararlanmak, kullanmak",
  "means": [
   "faydalanmak",
   "yararlanmak",
   "kullanmak"
  ],
  "alt": [
   "yararlanmak",
   "kullanmak"
  ],
  "der": "utilization (n) - kullanım",
  "ex": "Instructors should utilize interactive software to boost classroom engagement.",
  "syn": []
 },
 {
  "w": "violate",
  "pos": "verb",
  "lvl": "C1",
  "tr": "ihlal etmek",
  "all": "ihlal etmek, çiğnemek",
  "means": [
   "ihlal etmek",
   "çiğnemek"
  ],
  "alt": [
   "çiğnemek"
  ],
  "der": "violation (n) - ihlal, violator (n) - ihlal eden",
  "ex": "Corporations that violate environmental protection laws face severe fines.",
  "syn": []
 },
 {
  "w": "yield",
  "pos": "verb/noun",
  "lvl": "C1",
  "tr": "ürün vermek",
  "all": "ürün vermek, sağlamak / verim",
  "means": [
   "ürün vermek",
   "sağlamak",
   "verim"
  ],
  "alt": [
   "sağlamak",
   "verim"
  ],
  "der": "yielding (adj) - esnek/boyun eğen",
  "ex": "Advanced agricultural techniques yield higher crop outputs per hectare.",
  "syn": []
 }
];
