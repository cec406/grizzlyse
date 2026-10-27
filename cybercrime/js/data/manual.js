/* ============================================================
   CODEWATCH — Field Manual (glossary entries, trilingual)
   Unlocked as cases are completed.
   ============================================================ */
'use strict';

var MANUAL = [
  // --- Evidence & Law ---
  { id: "chain-custody", cat: "Evidence & Law", en: "Chain of Custody", es: "Cadena de custodia", ru: "Цепочка хранения улик",
    def: "The documented, unbroken record of who touched evidence, when, and why. One gap and a defense attorney can get everything thrown out." },
  { id: "hashing", cat: "Evidence & Law", en: "Hashing", es: "Hash (resumen criptográfico)", ru: "Хеширование",
    def: "A one-way fingerprint of a file (e.g. SHA-256). Identical files → identical hashes. Lets you prove a copy is exact without opening it." },
  { id: "metadata", cat: "Evidence & Law", en: "Metadata", es: "Metadatos", ru: "Метаданные",
    def: "Data about data: author names, device IDs, GPS coordinates, timestamps. Often reveals more than the file's contents." },
  { id: "legal-process", cat: "Evidence & Law", en: "Legal Process", es: "Proceso legal", ru: "Судебная процедура",
    def: "The ladder: preserve → subpoena (records) → search warrant (devices, premises) → court order. Skipping rungs destroys the case." },
  { id: "warrant", cat: "Evidence & Law", en: "Search Warrant", es: "Orden de allanamiento", ru: "Ордер на обыск",
    def: "A judge's written permission to search a specific place for specific things, based on probable cause. No warrant, no search — with narrow exceptions." },
  { id: "reporting-matrix", cat: "Evidence & Law", en: "Reporting Matrix", es: "Matriz de denuncia", ru: "Кому сообщать",
    def: "Child exploitation → NCMEC CyberTipline (US). Scams & fraud → FBI IC3. Infrastructure threats → CISA. Someone in danger right now → 911 / local police." },
  { id: "mlat", cat: "Evidence & Law", en: "MLAT", es: "Tratado de Asistencia Legal Mutua", ru: "Договор о взаимной правовой помощи",
    def: "Mutual Legal Assistance Treaty: the formal channel for cross-border evidence requests. Slow but powerful — and it makes seized assets stick." },

  // --- Malware & Networks ---
  { id: "malware", cat: "Malware & Networks", en: "Malware", es: "Software malicioso", ru: "Вредоносное ПО",
    def: "Software built to harm: viruses, worms, trojans, ransomware, spyware. Investigators classify it by behavior, not by filename." },
  { id: "ioc", cat: "Malware & Networks", en: "IOC (Indicator of Compromise)", es: "IOC (indicador de compromiso)", ru: "IOC (признак компрометации)",
    def: "Observable fingerprints of an attack: file hashes, malicious domains, C2 IPs, registry keys. Shared so defenders can hunt the same attack elsewhere." },
  { id: "c2", cat: "Malware & Networks", en: "C2 Server", es: "Servidor C2", ru: "C2-сервер",
    def: "Command & Control: the attacker's channel for issuing orders to infected machines. Cutting C2 is often the fastest containment move." },
  { id: "phishing", cat: "Malware & Networks", en: "Phishing", es: "Phishing / suplantación por correo", ru: "Фишинг",
    def: "Fraudulent messages impersonating trusted parties. Tell-tale signs: urgency, look-alike domains, mismatched Reply-To, failed SPF/DKIM." },
  { id: "static-dynamic", cat: "Malware & Networks", en: "Static vs Dynamic Analysis", es: "Análisis estático vs dinámico", ru: "Статический и динамический анализ",
    def: "Static = examine without running (hashes, strings, structure). Dynamic = run in an isolated sandbox and watch behavior. Good analysts use both." },
  { id: "lateral-movement", cat: "Malware & Networks", en: "Lateral Movement", es: "Movimiento lateral", ru: "Горизонтальное перемещение",
    def: "How attackers hop from one infected machine to others using stolen credentials. Finding patient zero is the start, not the finish." },
  { id: "backups", cat: "Malware & Networks", en: "3-2-1 Backups", es: "Copias 3-2-1", ru: "Правило 3-2-1",
    def: "3 copies of data, on 2 different media, with 1 offline/offsite. The single best ransomware insurance there is." },

  // --- Human Threats ---
  { id: "grooming", cat: "Human Threats", en: "Grooming Red Flags", es: "Señales de acoso (grooming)", ru: "Красные флаги «ухаживания»",
    def: "Isolating, flattery ('so mature'), secrecy ('our secret'), gifts, moving to private apps, pushing about photos, guilt. Trained officers — never citizens — handle contact." },
  { id: "ncmec", cat: "Human Threats", en: "NCMEC / ICAC", es: "NCMEC / ICAC", ru: "NCMEC / ICAC",
    def: "US National Center for Missing & Exploited Children runs the CyberTipline; ICAC task forces are the trained regional units that investigate. Child-safety work is a team sport." },
  { id: "forensic-interview", cat: "Human Threats", en: "Forensic Interview (CAC)", es: "Entrevista forense (CAC)", ru: "Экспертное интервью (CAC)",
    def: "Child interviews happen once, in a Child Advocacy Center, by trained specialists — trauma-informed, non-leading, recorded. Done wrong, interviews re-traumatize and taint evidence." },
  { id: "social-engineering", cat: "Human Threats", en: "Social Engineering", es: "Ingeniería social", ru: "Социальная инженерия",
    def: "Hacking humans instead of machines: fake personas, pretexting, urgency, authority claims. The defense is verification, not cleverness." },
  { id: "opsec", cat: "Human Threats", en: "OPSEC & Geotags", es: "OPSEC y geolocalización", ru: "ОПСБ и геотеги",
    def: "Operations security: never publish routines, locations, or schedules. Geotagged photos have burned deployments; metadata never forgets." },
  { id: "elder-fraud", cat: "Human Threats", en: "Elder Fraud", es: "Fraude a adultos mayores", ru: "Мошенничество против пожилых",
    def: "Scams targeting seniors: fake government agents, tech-support pop-ups, 'grandparent' emergencies. Red flags: urgency, cash/gift cards, secrecy." },
  { id: "wire-recall", cat: "Human Threats", en: "Wire Recall", es: "Recuperación de transferencia", ru: "Отзыв перевода",
    def: "If you call the bank within hours, a fraudulent wire may be frozen or recalled. Speed is everything — another reason victims must report fast." },

  // --- Infrastructure & Crypto ---
  { id: "ics", cat: "Infrastructure & Crypto", en: "ICS / SCADA", es: "ICS / SCADA", ru: "АСУ ТП / SCADA",
    def: "Industrial control systems run grids, water, and hospitals. Availability and human safety come first — you can't 'just reboot' a substation." },
  { id: "air-gap", cat: "Infrastructure & Crypto", en: "Air Gap", es: "Aislamiento de red", ru: "Физическое отделение (air gap)",
    def: "Physically isolating critical systems from the internet and office networks. Boring, effective, and constantly eroded by convenience." },
  { id: "ransomware", cat: "Infrastructure & Crypto", en: "Ransomware", es: "Ransomware / secuestro de datos", ru: "Программа-вымогатель",
    def: "Encrypts data and extorts payment, often threatening to leak stolen files ('double extortion'). Response: isolate, preserve, restore, report — don't pay." },
  { id: "emp", cat: "Infrastructure & Crypto", en: "EMP-style Impact", es: "Efecto tipo EMP", ru: "Последствия типа ЭМИ",
    def: "You don't need a bomb to cause EMP-like darkness: coordinated breaker tripping across substations cascades into regional blackout. That's why grid intrusions are treated as weapons." },
  { id: "crypto-trace", cat: "Infrastructure & Crypto", en: "Blockchain Tracing", es: "Rastreo en la cadena (blockchain)", ru: "Анализ блокчейна",
    def: "Every transaction is public and permanent. Investigators cluster addresses, follow funds, and unmask cash-out points at exchanges — where KYC laws bite." },
  { id: "mixer", cat: "Infrastructure & Crypto", en: "Mixer / Tumbler", es: "Mezclador (mixer)", ru: "Миксер",
    def: "A service that scrambles coin trails. It complicates tracing but never erases it — patterns, timing, and exchange records still tell the story." },

  // --- Guardian path ---
  { id: "money-mule", cat: "Human Threats", en: "Money Mule Red Flags", es: "Señales de mulas de dinero", ru: "Признаки денежных курьеров",
    def: "A 'job' that moves strangers' money through YOUR bank account. Red flags: keep-a-cut offers, prepaid phones, secrecy. Recruits are victims, not masterminds." },
  { id: "victim-centered", cat: "Human Threats", en: "Victim-Centered Response", es: "Enfoque centrado en la víctima", ru: "Подход с опорой на жертву",
    def: "Victims first: safety-plan before arrest, one trauma-informed interview, support (counseling, restitution, legal guidance) before prosecutorial convenience. Rescue and case success rise together." },

  // --- Sentinel path ---
  { id: "killchain", cat: "Malware & Networks", en: "Cyber Kill Chain", es: "Cadena de ataque cibernético", ru: "Цепочка атаки",
    def: "Recon → delivery → exploitation → C2/beaconing → lateral movement → action (exfiltration/destruction). Map it to know where you are — and where to cut." },
  { id: "attribution", cat: "Evidence & Law", en: "Attribution", es: "Atribución", ru: "Атрибуция",
    def: "The disciplined, government-level judgment of WHO is behind an attack. Language is a fingerprint, not a confession — attribution needs corroborated infrastructure, tradecraft, and partners." }
];
