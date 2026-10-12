/* ============================================================
   CODEWATCH — Missions 10–11 (specialization tracks)
   10. Operation Hidden Harbor  (GUARDIAN path — human trafficking)
   11. Operation Firebreak      (SENTINEL path — state-sponsored APT)
   ============================================================ */
'use strict';

var MISSIONS_D = [

/* ---------------------------------------------------------- */
{
  id: "m10",
  code: "OPERATION HIDDEN HARBOR",
  title: "Hidden Harbor",
  icon: "🚢",
  difficulty: 3,
  xp: 520,
  track: "guardian",
  tag: { en: "A labor-trafficking ring exploits the new arrivals.", es: "Una red de trata explota a los recién llegados.", ru: "Сеть торговли людьми эксплуатирует новоприбывших." },
  steps: [
    {
      type: "brief",
      title: "The Fictional Casa Deli Ring",
      body: [
        "Riverbend's Spanish-language news accounts keep boosting a 'help wanted' post: restaurant jobs, 'cama incluida' — bed included. Clean, warm, weekly pay. Immigrant families cheer it in the comments.",
        "But the missing-person desk has a name: LUZ R., 19, arrived eight weeks ago on that 'job referral'. Her family back home hasn't seen her face-on-camera in five weeks. Her last message to her aunt was short and wrong.",
        "Traffickers hunt with job ads, love promises, and family debts. Your partner desk is a fictionalized HSI human-trafficking group, and their rule never changes: VICTIMS FIRST — catch the network around the person, never the person around the network."
      ],
      callout: { style: "good", label: "THE VICTIM-CENTERED LAW", text: "In trafficking investigations the first responders are usually victim specialists, interpreters, shelter partners, and forensic interviewers — detectives come behind them. Anyone who could be a victim is treated as a victim until proven otherwise. No exceptions, no shortcuts." }
    },
    {
      type: "evidence",
      title: "Evidence Board",
      prompt: "Work the board. Three threads: the recruiting ad, the money trail, the missing-person file.",
      items: [
        { id: "h1", name: "Recruiting ad (ES)", icon: "📰",
          body: { lines: [
            { s: "¡Trabajo seguro! Restaurante nuevo necesita personal.", t: "Safe job! A new restaurant needs staff." },
            { s: "Cama y comida incluidas. Pago semanal en efectivo.", t: "Bed and food included. Weekly cash pay." },
            { s: "Solo necesitan tu identificación. No hagas muchas preguntas.", t: "You only need your ID. Don't ask too many questions." },
            { s: "Contáctame: Leo. Te recogemos el viernes.", t: "Contact me: Leo. We'll pick you up Friday." }
          ], note: "ANALYST NOTE: 'no questions', 'ID only', 'we pick you up' — mobility and documentation are the first things traffickers seize." } },
        { id: "h2", name: "Money trail (financial snapshot)", icon: "💰",
          body: "Weekly cash deposits → 3 accounts 'operadora deli' · then routine transfers to: bus depot, 2 storage units, a backstreet phone shop.\nWorker cards: wage deposits small, but monthly 'renta' deductions EXCEED wages — wages exist on paper, debts never close.\nPattern: wages = bait · renta = chain. Real modern slavery is on the ledger." },
        { id: "h3", name: "Missing-person file: LUZ R.", icon: "🧑",
          body: "Age 19 · arrived via job referral 8 weeks ago · last contact: text to aunt, then number changed · mother abroad reports: 'she sounded watched, told me not to call'.\nSMS to aunt (translated at desk): see next evidence step — it is the case's hinge.\nThe aunts' messages are in Spanish; your Language Desk handles them." }
      ]
    },
    {
      type: "translate",
      title: "Language Desk: Spanish",
      lang: "es",
      context: "Luz's messages to her aunt, recovered from the phone shop's backup service. Translate them like a victim-identity specialist:",
      lines: [
        { s: "Tía, dicen que todo está bien pero no me dejan salir del edificio.", t: "Auntie, they say everything is fine but they won't let me leave the building." },
        { s: "Me quitaron mi pasaporte 'para el trámite'.", t: "They took my passport 'for the paperwork'." },
        { s: "Si me preguntan, yo digo que estoy feliz y que trabajo en un restaurante.", t: "If anyone asks, I say I'm happy and I work at a restaurant." },
        { s: "No sé dónde estoy. El edificio tiene rejas y siempre hay luz encendida.", t: "I don't know where I am. The building has bars on the windows and the lights are always on." },
        { s: "Me pagan poco y me cobran 'renta' que nunca se acaba.", t: "They pay me little and charge me 'rent' that never ends." }
      ]
    },
    {
      type: "translate",
      title: "Language Desk: Russian",
      lang: "ru",
      context: "Intercepted ring Telegram channel, run by the coordinator 'Leo'. Your Russian lessons pay rent today:",
      lines: [
        { s: "Сегодня выезжаем за двумя из аэропорта. Документы забираем сразу.", t: "Today we go pick two up from the airport. Take their documents immediately." },
        { s: "Расписание: смена с 6 до 22, выходной — один день в месяц.", t: "Schedule: shifts 06:00 to 22:00, one day off per month." },
        { s: "Если спросят — все довольны. Никому не давать телефон.", t: "If anyone asks — everyone is happy. Give no one a phone." }
      ]
    },
    {
      type: "multi",
      title: "Trafficking Indicators",
      prompt: "Flag EVERY human-trafficking indicator present across the ad, the ledger, and Luz's messages.",
      options: [
        { k: "i1", label: "Confiscated identity documents ('me quitaron mi pasaporte')", why: "Document seizure destroys mobility and identity — a signature control method." },
        { k: "i2", label: "Restricted movement: 'won't let me leave the building', bars on windows", why: "Physical confinement or surveillance = restricted movement, a core indicator." },
        { k: "i3", label: "Debt manipulation: 'rent' that never ends, deductions exceeding pay", why: "Debt bondage ties victims to 'work off' obligations that never close." },
        { k: "i4", label: "Controlled communication: phone confiscated, scripted answers under duress", why: "Isolation from family + scripted 'I'm happy' = the fear-control pattern." },
        { k: "i5", label: "Recruitment by deception: job ad with 'no questions', 'we pick you up'", why: "Fraudulent recruitment is how trafficking starts — false promises, false freedom." },
        { k: "i6", label: "She receives cash every Friday, so she's clearly free", why: "Wages on paper are bait. Pay minus 'fees' that never end is bondage, not salary." },
        { k: "i7", label: "She had a phone, so she could call for help anytime", why: "One phone call that was intercepted and controlled is not access to help." }
      ],
      correct: ["i1", "i2", "i3", "i4", "i5"],
      explain: "Any ONE of these is a flicker. Two or more is a fire. Confiscated documents + confinement + debt + controlled comms + deceptive recruitment = classic labor-trafficking profile. Now act accordingly."
    },
    {
      type: "choice",
      title: "First Move",
      prompt: "You have Luz's messages, the ring's channel, and a general address (the storage units). What comes FIRST?",
      options: [
        { k: "a", label: "Protect Luz: connect her through a confidential channel to victim services, build a safety plan, verify her location quietly — while evidence is preserved under process.", correct: true,
          feedback: "Correct. The victim is the case. Victim services build trust, map the network from the inside, and keep her safe while subpoenas run in the background. In trafficking, patience with the victim is speed." },
        { k: "b", label: "Raid the restaurant kitchen tonight and grab everyone.", correct: false,
          feedback: "A premature raid scatters the ring, disperses victims who may be moved or threatened, and can sink the whole prosecution. Victims are located and safety-planned BEFORE arrests, not because of them." },
        { k: "c", label: "Call 'Leo' and fire him.", correct: false,
          feedback: "You don't know 'Leo' exists as a legal person, firing is a civil fantasy, and you'd tip the network — victims in other cities vanish overnight. This destroys evidence and lives." }
      ]
    },
    {
      type: "order",
      title: "The Operation Sequence",
      prompt: "Order the trafficking play from board to indictment.",
      items: [
        { k: "1", label: "Preserve evidence under process: financial, phone, IP, storage-unit logs" },
        { k: "2", label: "Reach Luz through a confidential channel; safety-plan; verify she is not in immediate danger" },
        { k: "3", label: "Coordinate extraction logistics: HSI, local police, shelter, interpreter, victim specialist" },
        { k: "4", label: "Extract Luz and connect ongoing services: medical, legal, T-visa certification support" },
        { k: "5", label: "Build the organizational case: subpoenas, financial tracing to the organizers behind 'Leo'" },
        { k: "6", label: "Arrest organizers; every arrest flanked by victim services" }
      ],
      correct: ["1", "2", "3", "4", "5", "6"],
      explain: "Preserve → protect → extract → serve → prosecute → arrest-with-support. Victim outcomes and case outcomes rise and fall together — that ordering is the professional model."
    },
    {
      type: "choice",
      title: "Extraction Day",
      prompt: "Extraction day. Two paths for the arrest window. Commanders pick the operation that protects the person AND the case:",
      options: [
        { k: "a", label: "Orchestrated extraction first: Luz walks out with victim specialists and an interpreter at 06:15 during shift change, before any arrest; she is then interviewed once, at a trusted setting, and offered shelter.", correct: true,
          feedback: "Correct. Extraction before arrest, support before interrogation, one interview, no cameras on her face. That is victim-centered law enforcement — it produces witnesses, not casualties." },
        { k: "b", label: "Simultaneous raid at the building, arrests and extraction together for maximum impact.", correct: false,
          feedback: "Risky and wrong-headed: victim-first means the victim controls the how and when. A raid can re-traumatize, and her main value is safety — not a news-cycle headline." },
        { k: "c", label: "Send Luz a bus ticket through a sympathetic coworker and let her escape on her own.", correct: false,
          feedback: "Uncoordinated 'escapes' put victims back in danger: she may be intercepted, the ring learns to tighten controls, and no services, shelter, or case protection follows her. Highly noble, completely wrong." }
      ]
    },
    {
      type: "debrief",
      title: "Hidden Harbor Complete",
      body: [
        "Luz walks out at 06:15. By 09:00 she is in a shelter with a trauma-informed interpreter, a health screening, and legal assistance pursuing trafficking-victim certification — she is treated as a survivor, never a suspect.",
        "Seventy-one hours later the 'Casa Deli' organizers — 'Leo', a financier, and a recruiter — are arrested on labor-trafficking charges. The storage units yield ten prepaid phones and the bus depot logs tie five prior recruitment cycles to the same network. Ten more victims are contacted from the recovered phone records; three accept services.",
        "Your Spanish surfaced the messages before the case had a name. Your Russian decoded the ring's shop talk. Victims are found by people who meet them where they live — in their language."
      ],
      notes: ["trafficking", "victim-centered"],
      tools: []
    }
  ]
},

/* ---------------------------------------------------------- */
{
  id: "m11",
  code: "OPERATION FIREBREAK",
  title: "Firebreak",
  icon: "🛰️",
  difficulty: 4,
  xp: 560,
  track: "sentinel",
  tag: { en: "An implant bleeds secrets from a defense contractor.", es: "Un implante drena secretos de un contratista de defensa.", ru: "Имплант высасывает секреты оборонного подрядчика." },
  steps: [
    {
      type: "brief",
      title: "The Quiet Burglar",
      body: [
        "Vulcan Dynamics — a fictional defense subcontractor, supplier of guidance components — calls at 06:00. One engineer's workstation has been talking to an unfamiliar CDN-hosted endpoint for three weeks, and files are being slowly staged into a hidden folder.",
        "No ransomware note. No encrypted drives. No demands. Just a quiet, patient burglar moving 60 kilobytes a day out of a building that designs parts for the homeland's defensive envelope.",
        "This is not a money crime. This is intelligence theft — an espionage operation inside the U.S. defense industrial base (the 'DIB'). Your partners: FBI CyWatch, CISA, and the DIB information-sharing council."
      ],
      callout: { style: "sens", label: "ESPIONAGE ≠ RANSOMWARE", text: "Criminals take everything and scream about it. Spies take a sliver, silently, for months, and leave the door fixed. The tell is patience, stealth, and collection — not encryption. You are looking for the quietest person in the building." }
    },
    {
      type: "evidence",
      title: "Evidence Board",
      prompt: "Three threads: the lure, the telemetry, the implant fingerprint.",
      items: [
        { id: "f1", name: "The lure email", icon: "📧",
          body: "Sender: 'AeroTech Summit 2026 <invite@aerotech-summit[.]org>'\nNo SPF record. Domain registered 11 days before the send.\nAttachment: register_now.pdf → actually a loader (PE32, low detection rate).\nOpened by senior engineer P. Reyes at 06/14 09:12 — beacons visible starting 06/14 21:40.\nNote: the same lure was later found in Spanish, aimed at the same firm's Tijuana plant: 'Confirmación de conferencia aeroespacial.' Someone runs a bilingual targeting shop." },
        { id: "f2", name: "Telemetry (DNS/egress)", icon: "📡",
          body: "WS-041 → c2.img-cdn[.]edge:443 · exact 7-minute heartbeat, clockwork.\nDNS: unusual TXT lookups to k1.8mx.tk every 7 minutes (one byte each — classic fast-flux choreography).\nStaging: files copied to ~/.cache/proj in small batches, renamed to .jpg.\nOutbound: 60 KB/day, steady, at 23:00–05:00 UTC sharp. Humans sleep; implants are punctual." },
        { id: "f3", name: "YARA hit — live memory", icon: "🧬",
          body: "Rule 'firebreak_mem' triggers on workstation memory: unique marker 'ТАЙМЕР=420'.\nPreceding traffic shows the implant persists IN MEMORY ONLY — nothing on disk survives a reboot run.\nAnalyst note: memory-resident, files-only-in-ram, night window = quiet-collection tradecraft. See translator next." }
      ]
    },
    {
      type: "translate",
      title: "Language Desk: Russian",
      lang: "ru",
      context: "Configuration strings carved out of the YARA-positive memory region. Your Russian lessons earn their keep:",
      lines: [
        { s: "ТАЙМЕР: 420 секунд", t: "TIMER: 420 seconds" },
        { s: "режим: тихо · сбор файлов", t: "mode: quiet · file collection" },
        { s: "активность только ночью: 23:00–05:00 UTC", t: "activity only at night: 23:00–05:00 UTC" },
        { s: "порт 443 — маскировка под обычный веб-трафик", t: "port 443 — masked as normal web traffic" },
        { s: "живёт только в памяти, на диске следов нет", t: "lives in memory only, leaves no traces on disk" }
      ]
    },
    {
      type: "choice",
      title: "Espionage or Cybercrime?",
      prompt: "Which read of the evidence explains what this operator IS?",
      options: [
        { k: "a", label: "Stealthy collection with no encryption or ransom, slow drip, memory-only, night schedule: intelligence theft by a disciplined operator — not a cash-grab crew.", correct: true,
          feedback: "Correct. Ransomware screams, this whispers. Stealth + patience + collection = espionage profile. That changes every downstream decision: CUI/controlled data handling, counterintelligence notifications, and who gets briefed." },
        { k: "b", label: "It's written in Cyrillic — so it's the work of one specific nation-state. Name them now.", correct: false,
          feedback: "Language is a fingerprint, not a confession. Any crew can type in Cyrillic (or rent a translator). Attribution needs infrastructure, tradecraft, and interagency corroboration — not an alphabet." },
        { k: "c", label: "Re-encrypt the whole workstation and reimage from backup tonight.", correct: false,
          feedback: "That's a hygiene reflex, not a response. You'd destroy the live memory that holds the only copy of this implant, and you'd learn nothing about what was taken or where it went. Evidence first, remediation second." }
      ]
    },
    {
      type: "terminal",
      title: "Memory Triage Workbench",
      banner: [
        "FIREBREAK ANALYSIS VM — attached to WS-041 live memory snapshot",
        "Preserved at 06:02 before any remediation. Chain of custody: sealed hash 9d3f...",
        "Commands: yara scan | strings mem | netstat beacon | hash sample | help"
      ],
      commands: [
        { in: "yara scan", out: ["firebreak_mem MATCH on region 0x7FF...820", "markers: 'ТАЙМЕР=420' · 'c2.img-cdn[.]edge' · 'операция тихо'", "VERDICT: implant confirmed in memory — fileless execution", "REAL WORLD: yara firebreak.yar memory_dump.raw — YARA is free and everywhere in the field."] },
        { in: "strings mem", out: ["extracted config strings (translated at desk):", "  timer=420s · mode: quiet collection · 23:00-05:00 UTC window", "  persistence: NONE on disk — scheduled task re-injects from DNS TXT", "  'гибрид' (hybrid): blends with browser TLS to edge CDN", "REAL WORLD: strings memory_dump.raw | grep -Ei 'http|port|timer'"] },
        { in: "netstat beacon", out: ["ws-041 active session → c2.img-cdn[.]edge:443", "cadence: 420s measured twice, clockwork", "sibling host ws-022 shows same TXT pattern — LATERAL MOVE DETECTED", "REAL WORLD: netstat -ano | findstr ESTABLISHED (Windows) · ss -tunap (Linux)"] },
        { in: "hash sample", out: ["SHA-256 (lure attachment): 77f3c9e1b2a0d51c8e4f6a9b3c0d2e1f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9a", "fileless loader hash (recovered via memory): e0d2c8b6a4f2e0d1c3b5a7f9e1d3c5b7a9f1e3d5c7b9a1f3d5e7b9c1a3f5e7", "SHARE BOTH — YARA fingerprints make every defense partner's hunt instant", "REAL WORLD: sha256sum lure.pdf — the same muscle as Skills Lab 01."] }
      ],
      goal: ["yara scan", "strings mem", "netstat beacon", "hash sample"]
    },
    {
      type: "multi",
      title: "Map the Kill Chain",
      prompt: "Select the cyber kill-chain stages SUPPORTED by the board evidence. (Defense teams map them so they know exactly where the operation is — and where to cut.)",
      options: [
        { k: "k1", label: "Reconnaissance: a lure tailored to senior engineers at defense guidance firms", why: "The email targeted the right person in the right role — that takes prior targeting work." },
        { k: "k2", label: "Delivery & exploitation: the register_now.pdf loader opened and executed", why: "Attachment → loader → execution. The beachhead." },
        { k: "k3", label: "Command & control / beaconing: 7-minute heartbeats to the CDN endpoint", why: "C2 keeps the operator's hand in via DNS/TLS tunnels." },
        { k: "k4", label: "Lateral movement: sibling host ws-022 exhibiting the same TXT pattern", why: "The switch to a second machine is exactly how espionage ops multiply." },
        { k: "k5", label: "Collection & exfiltration: staging folders + steady 60 KB/day outbound", why: "Slow, quiet theft is the payout — this op is 'in the cash register' as we watch." },
        { k: "k6", label: "Ransom demand & negotiation contacts", why: "No note, no demands, no negotiation. That is the spy's DISCLAIMER, not a stage." },
        { k: "k7", label: "Destruction of backups", why: "Espionage wants copies, not corpses; it hides in the shadows, it doesn't smash the lights." }
      ],
      correct: ["k1", "k2", "k3", "k4", "k5"],
      explain: "Recon → delivery → C2 → lateral → collect/exfil. Five stages present, zero ransom theater. The kill chain tells you where to cut: deny the C2 now, and the operation starves wherever else it landed."
    },
    {
      type: "choice",
      title: "Attribution Discipline",
      prompt: "An industry point-of-contact emails: 'We've got a confirmed nation behind the Lure — headline it, sponsors are asking.' What's the professional line?",
      options: [
        { k: "a", label: "Share indicators privately with cleared partners now; public/government attribution only after FBI + interagency corroboration. No headlines from an analyst's keyboard.", correct: true,
          feedback: "Correct. Private attribution to trusted partners is standard; public naming of a nation-state is a government decision made by designated authorities — announced with evidence that survives legal and diplomatic scrutiny." },
        { k: "b", label: "Publish the indicator list with a flag emoji on the firm's social feed.", correct: false,
          feedback: "Releasing raw indicators publicly tips the operator, burns the intel value, and may complicate a federal investigation and diplomatic posture. This is how good operations die in public." },
        { k: "c", label: "Confront the foreign consulate directly with your findings.", correct: false,
          feedback: "Absolutely not. You are not a diplomat, not a prosecutor, and a consulate is sovereign territory. This is FBI/Counterintelligence + State Department territory, not a talking shop." }
      ]
    },
    {
      type: "order",
      title: "Espionage Containment Sequence",
      prompt: "Order the response for a fileless, memory-resident espionage implant with a confirmed sibling.",
      items: [
        { k: "1", label: "Preserve volatile evidence: live memory, process lists, DNS logs" },
        { k: "2", label: "Cut the throat: block c2.img-cdn[.]edge and the TXT domain at egress NOW" },
        { k: "3", label: "Isolate affected hosts from new data; keep them for triage" },
        { k: "4", label: "Rotate credentials & token volumes across the plant" },
        { k: "5", label: "Notify partners: FBI CyWatch, CISA, DIB council — with your IOC package" },
        { k: "6", label: "Platform-wide hunt with YARA + DNS/journal review; eradicate on re-hit" }
      ],
      correct: ["1", "2", "3", "4", "5", "6"],
      explain: "Evidence first (you can't un-reboot RAM), sever C2 second (the operator loses the wheel), isolate third, rotate fourth, notify every authorized partner fifth, sweep the fleet sixth. Spies run quiet — you must run louder."
    },
    {
      type: "debrief",
      title: "Firebreak Complete",
      body: [
        "The CDN endpoint is cut at 06:47 — mid-beacon. WS-041's memory gets three weeks of quiet forensics. ws-022's intruder is identified before it ever staged a second payload.",
        "Vulcan's VPN logs show the C2's operator probing the Tijuana plant from the same staging infrastructure — your bilingual lure observation closes a second door nobody had opened yet.",
        "Six months later, the DIB council briefs: the same infrastructure was in two other firms' incident rooms. Your IOC package — hashes, YARA rules, the DNS choreography — turned three separate fires into one extinguished arsonist."
      ],
      notes: ["killchain", "attribution"],
      tools: []
    }
  ]
}
];