/* ============================================================
   CODEWATCH — Missions 10–11 (specialization tracks)
   10. Operation Easy Money    (GUARDIAN path — money-mule recruitment)
   11. Operation Firebreak     (SENTINEL path — state-sponsored APT)
   ============================================================ */
'use strict';

var MISSIONS_D = [

/* ---------------------------------------------------------- */
{
  id: "m10",
  code: "OPERATION EASY MONEY",
  title: "Easy Money",
  icon: "💸",
  difficulty: 3,
  xp: 520,
  track: "guardian",
  tag: { en: "A 'summer job' is recruiting students as money mules.", es: "Un 'trabajo de verano' recluta estudiantes como mulas de dinero.", ru: "«Летняя работа» вербует студентов как курьеров денег." },
  steps: [
    {
      type: "brief",
      title: "The Mule Desk",
      body: [
        "Riverbend High's counselor sends a tip: three students came back from spring break flashing cash, and a 'Summer Remote Assistant' ad is circulating in the class group chats. No interview. No résumé. $500 a week, 'just use your bank account'.",
        "Here is the part that matters: the students are not suspects. Money-mule rings deliberately recruit teenagers because teens have clean bank accounts, small legal knowledge, and big summer plans. The recruiters know exactly what they are doing.",
        "Your partner desk is a fictionalized financial-crimes unit, and their rule never changes: VICTIMS FIRST — build the case around the network, and treat every recruit as a victim until the evidence says otherwise."
      ],
      callout: { style: "good", label: "THE VICTIM-CENTERED LAW", text: "In mule investigations the first responders are usually school liaisons, victim specialists, and bank fraud desks — detectives come behind them. A recruit who 'helped move money' is usually a kid who was deceived, then threatened. Anyone who could be a victim is treated as a victim until proven otherwise. No exceptions." }
    },
    {
      type: "evidence",
      title: "Evidence Board",
      prompt: "Work the board. Three threads: the recruiting ad, the money trail, the student file.",
      items: [
        { id: "h1", name: "Recruiting ad (from the group chat)", icon: "📰",
          body: "🌊 SUMMER REMOTE ASSISTANT — RIVERBEND ONLY 🌊\n• Work from your phone, 2 hrs/day\n• $500/week, first payment Friday\n• Requirements: your own bank account, a prepaid phone we send you\n• 'Don't discuss work details with family — client privacy.'\n• Apply: @easyhire_dan\nANALYST NOTE: 'use your bank account', 'we send you a phone', 'don't tell your family' — a job ad never needs your account or your silence. That is a mule pipeline in three bullet points." },
        { id: "h2", name: "Money trail (bank snapshot)", icon: "💰",
          body: "Pattern across 6 student accounts: deposits from strangers ($900–$2,400) → student keeps 8–10% → balance forwarded within hours to one consolidating account → onward to a crypto exchange.\nDeposit memos: 'invoice', 'consulting', 'family help' — none match any student's life.\nFlag: rapid in/out is the mule signature. Real wages sit; mule money runs." },
        { id: "h3", name: "Student file: DANY M., 16", icon: "🧑",
          body: "Reported to the counselor after a stranger's deposit bounced and his account froze.\nHis statement (written): 'They said it was a summer job. Then they said if I stop, they'll say I stole the money, because it came from my account.'\nHis account received $11,300 in 6 weeks. He kept $1,050.\nHis messages to a friend are in Spanish — your Language Desk handles them." }
      ]
    },
    {
      type: "translate",
      title: "Language Desk: Spanish",
      lang: "es",
      context: "Dany's messages to his friend, recovered with his permission. Read them like a victim-identity specialist:",
      lines: [
        { s: "Oye, ¿tú también recibiste el mensaje del trabajo de verano?", t: "Hey, did you get that summer job message too?" },
        { s: "Dijo que solo usara mi cuenta y me quedara con el 10%.", t: "It said I should just use my account and keep 10%." },
        { s: "Ahora me escriben de otro número y dicen que no puedo parar.", t: "Now they write me from another number and say I can't stop." },
        { s: "Tengo miedo de decírselo a mi mamá porque el dinero pasó por mi cuenta.", t: "I'm scared to tell my mom because the money went through my account." },
        { s: "¿Crees que me pueden meter en la cárcel? Yo solo necesitaba dinero para las clases.", t: "Do you think I could go to jail? I just needed money for classes." }
      ]
    },
    {
      type: "translate",
      title: "Language Desk: Russian",
      lang: "ru",
      context: "Intercepted coordinator chat, run by '@easyhire_dan'. Your Russian lessons pay rent today:",
      lines: [
        { s: "Сегодня подключаем двух новых. Счета проверяем сразу.", t: "Today we onboard two new ones. Check the accounts right away." },
        { s: "Процент им — 8. Говорим, что 10, они и так рады.", t: "Their cut is 8. Tell them 10 — they're happy anyway." },
        { s: "Если кто-то упирается — напомните про его счёт. Сами всё поймут.", t: "If anyone resists — remind them about their account. They'll figure it out." }
      ]
    },
    {
      type: "multi",
      title: "Mule-Recruitment Red Flags",
      prompt: "Flag EVERY money-mule recruitment red flag present in the ad, the ledger, and Dany's messages.",
      options: [
        { k: "i1", label: "'Just use your own bank account' as a job requirement", why: "No real employer needs your account. Your account moving money for strangers IS the job — and the crime." },
        { k: "i2", label: "'We send you a prepaid phone'", why: "Employer-issued burner devices keep recruits isolated and deniable — control equipment, not equipment." },
        { k: "i3", label: "'Don't discuss work details with family — client privacy'", why: "Enforced secrecy isolates recruits from the adults who would shut this down in one phone call." },
        { k: "i4", label: "Deposits that leave the account within hours", why: "Rapid pass-through is the mule signature. Real pay stays; stolen money runs." },
        { k: "i5", label: "'Keep 8–10%' of strangers' money", why: "Skimming a cut of moved money is laundering with a bonus — the recruit takes the legal risk for someone else's profit." },
        { k: "i6", label: "Threats after the recruit tries to stop ('we'll say YOU stole it')", why: "The fear-control pattern: deception first, then blackmail. Recruits become victims the moment they try to leave." },
        { k: "i7", label: "A weekend babysitting job posted by the school office", why: "A real job through a real institution, with real duties and no account access. Ordinary, safe, and correct to ignore." }
      ],
      correct: ["i1", "i2", "i3", "i4", "i5", "i6"],
      explain: "Any ONE of these is a flicker; several together are a pipeline. 'Your account + our money + tell no one' is the whole business model. Recruits are recruited BY the lesson most schools never teach — now you can."
    },
    {
      type: "choice",
      title: "First Move",
      prompt: "You have Dany's messages, the coordinator's chat, and six flagged accounts. What comes FIRST?",
      options: [
        { k: "a", label: "Protect the recruits: school liaison + victim services open a confidential channel, banks freeze further pass-through, and no student is disciplined while the case builds.", correct: true,
          feedback: "Correct. The recruits are the case. Kids who trust the process keep their phones, their chats, and their testimony — which is what actually convicts the coordinators." },
        { k: "b", label: "Suspend all six students and announce it at assembly to warn the school.", correct: false,
          feedback: "That punishes victims in public, teaches every other recruit to delete everything, and hands the ring its best recruiting pitch: 'cooperate and get expelled.'" },
        { k: "c", label: "Message '@easyhire_dan' pretending to be a student to get him to confess.", correct: false,
          feedback: "Never. Untrained contact tips the network, risks the controlled operation already running, and can amount to entrapment. Only certified officers under guidelines ever engage suspects." }
      ]
    },
    {
      type: "order",
      title: "The Operation Sequence",
      prompt: "Order the mule-case play from board to indictment.",
      items: [
        { k: "1", label: "Preserve evidence: the ad, the chats, the six account ledgers" },
        { k: "2", label: "Reach the recruits through the school liaison; explain their real legal position; stop the panic" },
        { k: "3", label: "Freeze pass-through at the banks; keep accounts open under subpoena" },
        { k: "4", label: "Coordinate support: victim services, counseling, and restitution guidance for the recruits" },
        { k: "5", label: "Build the organizational case: trace consolidation accounts to the coordinators behind '@easyhire_dan'" },
        { k: "6", label: "Arrest the organizers; every step flanked by school and victim services" }
      ],
      correct: ["1", "2", "3", "4", "5", "6"],
      explain: "Preserve → protect → freeze → support → build → arrest-with-support. Recruit outcomes and case outcomes rise and fall together — that ordering is the professional model."
    },
    {
      type: "choice",
      title: "Takedown Day",
      prompt: "Arrest day for the coordinator. Two windows. Commanders pick the one that protects the recruits AND the case:",
      options: [
        { k: "a", label: "Quiet morning arrest away from campus, after the bank freezes are confirmed, with the school liaison briefing the recruits the same day on what happens next.", correct: true,
          feedback: "Correct. Recruits learn the truth from a trusted adult, not from rumors. No sirens at a school, no public perp walk for kids — that is what victim-centered looks like on the calendar." },
        { k: "b", label: "Arrest him at the school gates at lunchtime for maximum deterrence.", correct: false,
          feedback: "Theater, not strategy: it re-traumatizes recruits in front of peers, and deterrence does not need an audience of minors." },
        { k: "c", label: "Wait a month so the ring 'forgets' about the students, then act.", correct: false,
          feedback: "Delay is not protection. Unfrozen accounts keep moving, recruits stay under threat, and evidence ages badly. Speed and support go together." }
      ]
    },
    {
      type: "debrief",
      title: "Easy Money Complete",
      body: [
        "The consolidation account links to two coordinators, both arrested 71 hours later. The six recruits keep clean records: they are documented as deceived victims, their restitution is handled through the banks, and Dany writes the counselor a two-line note: 'You made it okay to tell you.'",
        "The ad kept circulating for two more weeks — from a copycat. The school's new one-slide lesson ('a job that needs YOUR bank account is not a job') closes it in a day.",
        "Lesson locked in: mule recruiters hunt trust, not skills. A teen who knows the three red flags — your account, their money, tell no one — is a recruit the pipeline never gets."
      ],
      notes: ["victim-centered", "social-engineering", "money-mule", "legal-process"],
      tools: ["chaintrace"]
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