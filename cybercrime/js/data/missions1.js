/* ============================================================
   CODEWATCH — Missions 1–3
   1. Operation First Watch   (academy / evidence basics)
   2. Operation Cold Chain    (malware outbreak response)
   3. Operation Night Light   (child exploitation desk)
   ============================================================ */
'use strict';

var MISSIONS_A = [

/* ---------------------------------------------------------- */
{
  id: "m1",
  code: "OPERATION FIRST WATCH",
  title: "First Watch",
  icon: "🎓",
  difficulty: 1,
  xp: 220,
  track: "core",
  tag: { en: "Academy: evidence, ethics, and who to call.", es: "Academia: evidencia, ética y a quién llamar.", ru: "Академия: улики, этика и кого вызывать." },
  steps: [
    {
      type: "brief",
      title: "Welcome to the Bureau",
      body: [
        "Congress just chartered a new agency: the National Cyber Investigation Bureau (NCIB) — a fictional bureau for this game. You are its newest hire.",
        "Your badge says DIGITAL FORENSICS ANALYST. Translation: you are the person who turns a hard drive, a chat log, or a router snapshot into something a prosecutor can hold.",
        "Your instructors — Special Agent Reyes (forensics) and Supervisory Analyst Okafor (cyber ops) — have one lesson before anything else: the good guy's edge is not hacking skills. It is DISCIPLINE."
      ],
      callout: { style: "good", label: "THE OATH YOU'LL LIVE BY", text: "We investigate only what we are authorized to investigate. We preserve evidence before we touch it. We work through warrants, prosecutors, and partners. We never become the criminal to catch one." }
    },
    {
      type: "choice",
      title: "The Oath",
      prompt: "A recruiter friend messages you: 'Forget the academy paperwork. I found the guy's Instagram — let's message him, scare him, see if he confesses.' You have no warrant, no authorization, nothing. What do you do?",
      options: [
        { k: "a", label: "Message him from a fake account. He might delete evidence — better scare him now.", correct: false,
          feedback: "That's vigilantism. Tipping off a suspect destroys evidence, warns accomplices, can taint every future prosecution — and it can be a crime itself. Trained officers never do this." },
        { k: "b", label: "Report the tip through official channels and document everything you legally received. Investigate only within your authorization.", correct: true,
          feedback: "Exactly right. The fastest way to lose a case is to act without authorization. Reporting through channels is what separates investigators from vigilantes — and it's what makes juries trust you." },
        { k: "c", label: "Ignore it entirely. Not your problem until a supervisor asks.", correct: false,
          feedback: "Doing nothing is also a failure. Good investigators escalate what they legally learn, then act within authority." }
      ]
    },
    {
      type: "order",
      title: "Chain of Custody Drill",
      prompt: "A courier hands you a sealed USB drive seized at a suspect's home. Arrange the FIRST steps of your chain of custody in the correct order.",
      items: [
        { k: "1", label: "Photograph the item as received (seals, labels, condition)" },
        { k: "2", label: "Log it: who, what, where, when — in the evidence register" },
        { k: "3", label: "Compute a forensic hash (SHA-256) of the media" },
        { k: "4", label: "Work only from a verified forensic copy — never the original" }
      ],
      correct: ["1", "2", "3", "4"],
      explain: "Photograph first (visual record), log second (human record), hash third (mathematical fingerprint), and NEVER work on originals — always on a verified copy. Skip any link and a defense attorney will call your whole case into question."
    },
    {
      type: "evidence",
      title: "Evidence Locker: The Duplicated Drive",
      prompt: "You need to know if the drive the courier seized matches the copy already in the lab. Inspect the items, then answer.",
      items: [
        { id: "e1", name: "HashLab report — original drive", icon: "🧾", tool: "hashlab",
          body: "SHA-256: 9f2c44a1e8b7d3055f1c0a9947be21d8e5a3c7f0b6d4e2a9183c5f7b0d2e4a6c\nSHA-1:   4ab19f33c2d8 (legacy, for legacy systems only)\nNote: identical files always produce identical SHA-256 hashes. Change one byte and the hash becomes unrecognizable." },
        { id: "e2", name: "HashLab report — lab copy", icon: "🧾", tool: "hashlab",
          body: "SHA-256: 9f2c44a1e8b7d3055f1c0a9947be21d8e5a3c7f0b6d4e2a9183c5f7b0d2e4a6c\nMATCH STATUS: identical to seized original.\nAnalyst note: hashing is how we prove 'this copy is EXACTLY the evidence' without ever opening the original." },
        { id: "e3", name: "MetaScope — document found on drive", icon: "📄", tool: "metascope",
          body: "File: budget_notes.docx\nAuthor: 'B. Carleton'  |  Last saved by: 'BC'\nCreated: 2025-11-02 23:41  |  Editing time: 412 min\nEmbedded path: C:/Users/fitcoach/Bureau/Documents/\nNote: metadata survived even after the suspect renamed the file 'grocery_list.docx'. Files lie; metadata doesn't." }
      ],
      quizPrompt: "Why do the two matching hashes matter legally?",
      options: [
        { k: "a", label: "They prove the lab copy is a bit-perfect duplicate of the seized original.", correct: true,
          feedback: "Yes. Matching hashes are the mathematical backbone of chain of custody: the analysis was performed on EXACTLY the evidence, not a look-alike." },
        { k: "b", label: "They prove the suspect is guilty.", correct: false,
          feedback: "Hashes prove nothing about guilt — they prove integrity of evidence. Guilt is built from many pieces." },
        { k: "c", label: "They prove the file was not modified by the suspect.", correct: false,
          feedback: "Not exactly — the two hashes match EACH OTHER (original vs copy). They say the copy is faithful, not who edited what or when." }
      ]
    },
    {
      type: "translate",
      title: "Language Desk: Spanish",
      lang: "es",
      context: "A walk-in witness, señora Carmen Díaz (64), speaks no English. She hands over a phone recording of a call that emptied her savings. Your Polyglot translator is authorized for exactly this.",
      lines: [
        { s: "Yo solo estaba revisando mi correo del banco cuando la pantalla se puso azul.", t: "I was just checking my bank email when the screen turned blue." },
        { s: "Apareció un aviso que decía: '¡Su computadora está infectada! Llame ahora al soporte técnico.'", t: "A warning appeared that said: 'Your computer is infected! Call technical support NOW.'" },
        { s: "Me llamó un hombre que dijo ser agente del gobierno. Me pidió comprar tarjetas de regalo.", t: "A man who said he was a government agent called me. He asked me to buy gift cards." },
        { s: "Tenía miedo. No le dije a mi familia hasta hoy.", t: "I was scared. I didn't tell my family until today." }
      ]
    },
    {
      type: "choice",
      title: "Read the Statement",
      prompt: "Based on señora Díaz's statement, what crime pattern are you looking at?",
      options: [
        { k: "a", label: "Tech-support / government-impersonation scam with gift-card payment", correct: true,
          feedback: "Correct. Fake 'infection' pop-up → fake government agent → gift cards. One of the most profitable scams in the world, and heavily reported in Spanish-speaking communities too." },
        { k: "b", label: "A genuine government investigation — the agent was real", correct: false,
          feedback: "No real government agency demands gift cards, ever. That single detail is a 100% scam indicator." },
        { k: "c", label: "A bank insider stealing from her account", correct: false,
          feedback: "Nothing in the statement points to the bank itself. The pop-up + caller + gift cards is the classic tech-support scam chain." }
      ]
    },
    {
      type: "match",
      title: "The Reporting Matrix",
      prompt: "Match each real-world situation to the correct first call. Memorize this — you will use it every case.",
      pairs: [
        { l: "Platform reports uploaded child-abuse file (hash match)", r: "NCMEC CyberTipline → ICAC task force" },
        { l: "Someone scams victims out of money online", r: "FBI IC3 (ic3.gov)" },
        { l: "Intrusion detected at a power substation", r: "CISA + sector partners" },
        { l: "Person in danger right now", r: "911 / local police immediately" }
      ],
      explain: "Reporting to the RIGHT door first shaves days off a response. Wrong door = lost time, and in some crimes, lost lives."
    },
    {
      type: "debrief",
      title: "First Watch Complete",
      body: [
        "Okafor reviews your file and nods once. 'You didn't touch the suspect, didn't touch the original, and you knew the right door to knock on. That's the whole job in miniature.'",
        "You are issued your first tools and the Bureau's language desk transfers you their Polyglot translator — half this city's witnesses don't speak English, and half the world's threat actors don't either."
      ],
      notes: ["chain-custody", "hashing", "metadata", "reporting-matrix"],
      tools: ["hashlab", "metascope", "polyglot"]
    }
  ]
},

/* ---------------------------------------------------------- */
{
  id: "m2",
  code: "OPERATION COLD CHAIN",
  title: "Cold Chain",
  icon: "🐛",
  difficulty: 2,
  xp: 420,
  track: "core",
  tag: { en: "Trace a worm outbreak through a city network.", es: "Rastrea un brote de gusano en la red de una ciudad.", ru: "Проследите вспышку червя по сети города." },
  steps: [
    {
      type: "brief",
      title: "2:14 AM — County IT Calls",
      body: [
        "The county's shared services network — libraries, permits, payroll — is melting down. Machines reboot themselves, files vanish, and something is calling home to the internet every 60 seconds.",
        "An intern opened an email attachment called 'Invoice_2026_SCAN.pdf' that was really an executable. One click. Now 400 machines are infected and counting.",
        "Reyes: 'New rule, rookie. From now on you think in INDICATORS — the fingerprints that let you find every infected machine in the dark.'"
      ],
      callout: { style: "sens", label: "LIVE INCIDENT RULES", text: "In a real response: preserve first, contain second, eradicate third, restore last. Order matters — skip a step and you either destroy evidence or lose the network." }
    },
    {
      type: "evidence",
      title: "Triage Board",
      prompt: "Inspect what county IT captured before you decide anything.",
      items: [
        { id: "c1", name: "Phishing email (headers)", icon: "📧", tool: "loglens",
          body: "From: County Billing <billing@county-gov-accounts.com>\nReply-To: collect.day.77@privatemail.to\nSPF check: FAIL (sending host not authorized)\nSubject: URGENT: invoice overdue — open scan\nNote: the domain is a look-alike ('county-gov-accounts'), Reply-To points to a throwaway, and SPF failed. Classic. Never trust what an email CLAIMS — trust its headers." },
        { id: "c2", name: "Attachment hash (HashLab)", icon: "🧾", tool: "hashlab",
          body: "File: Invoice_2026_SCAN.pdf  (actually PE32 executable)\nSHA-256: c77e01b4a29f33d1e6c8b2f0a45d9177e3c2b8a5f0d4e6c9b1a3f8d2e7c4b6a9\nClass: WORM — self-replicating, network spreading\nAnalyst name for this specimen: VELVETSNAP." },
        { id: "c3", name: "Firewall log — one infected host", icon: "🧯", tool: "loglens",
          body: "10.4.2.9 → vlx-update[.]net:443  EVERY 60 SECONDS, day and night\nThen: SMB sweep of 10.4.2.0/24 (every machine on its subnet)\nThen: SMB sweep of 10.4.5.0/24 (the next subnet)\nThat pattern is VELVETSNAP calling its C2 and crawling laterally." }
      ]
    },
    {
      type: "choice",
      title: "First Move",
      prompt: "Patient-zero machine 10.4.2.9 is in front of you, still running. First move?",
      options: [
        { k: "a", label: "Pull its network cable immediately, but leave the machine POWERED ON.", correct: true,
          feedback: "Correct — and subtle. Unplugging stops the spread, but powering off wipes RAM, which often holds the only unencrypted copy of malware keys, C2 addresses, and injected code. Live memory is gold." },
        { k: "b", label: "Shut it down right away before it does more damage.", correct: false,
          feedback: "Understandable — but a shutdown destroys volatile memory evidence. Disconnect the network, keep it running, capture RAM, then image." },
        { k: "c", label: "Leave it online and watch it spread to learn the behavior.", correct: false,
          feedback: "That's what a sandbox is for. Letting malware spread in production is how incidents become disasters — and it's a liability nightmare." }
      ]
    },
    {
      type: "terminal",
      title: "Forensic Workbench",
      banner: [
        "NCIB FORENSIC WORKBENCH v3.1 — isolated analysis VM",
        "Specimen loaded: VELVETSNAP sample (c77e01b4...)",
        "Sandbox network: INBOUND BLOCKED / outbound logging ON",
        "Type 'help' to list commands."
      ],
      commands: [
        { in: "hash sample", out: ["SHA-256: c77e01b4a29f33d1e6c8b2f0a45d9177e3c2b8a5f0d4e6c9b1a3f8d2e7c4b6a9", "MATCH: known worm family VELVETSNAP. One hash = block everywhere in minutes.", "REAL WORLD: sha256sum evidence.bin (Linux/mac) · certutil -hashfile evidence.bin SHA256 (Windows) — learn this one cold."] },
        { in: "strings sample", out: ["extracted strings:", "  http://vlx-update[.]net/gate.php        <-- C2 CHECK-IN", "  \\\\TARGET\\ADMIN$ ... copy self            <-- SMB SPREAD ROUTINE", "  schtasks /create /sc minute /mo 1        <-- persistence via scheduled task", "  note: PDF icon attached to EXE — deception by design", "REAL WORLD: strings Invoice_2026_SCAN.pdf | grep -i http — this exact command is free, real, and just found the C2."] },
        { in: "sandbox sample", out: ["running dynamic analysis in isolated sandbox...", "[00:05] beacon to vlx-update[.]net — handshake OK", "[00:10] enumerated ADMIN$ shares on test network", "[00:12] dropped copy to 2 hosts, registered persistence task", "VERDICT: worm, SMB self-propagation, 60s beacon — CONFIRMED", "REAL WORLD: public sandboxes (any.run, CAPE) or a FLARE-VM — detonate only in isolation, never your daily machine."] },
        { in: "help", out: ["commands: hash <sample> | strings <sample> | sandbox <sample> | clear"] }
      ],
      goal: ["hash sample", "strings sample", "sandbox sample"]
    },
    {
      type: "choice",
      title: "Two Sides of Analysis",
      prompt: "You examined the specimen without running it (strings, hash) AND ran it in a sandbox. What are those two approaches called?",
      options: [
        { k: "a", label: "Static analysis (no execution) and dynamic analysis (observed execution)", correct: true,
          feedback: "Exactly. Static finds what it IS; dynamic finds what it DOES. Sophisticated malware hides from one or the other — professionals always do both." },
        { k: "b", label: "Offline and online forensics", correct: false,
          feedback: "Close conceptually, but the standard terms are static (no run) and dynamic (run and watch)." },
        { k: "c", label: "Active and passive containment", correct: false,
          feedback: "Those are containment concepts, not analysis. Static = inspect without executing; dynamic = execute in isolation and observe." }
      ]
    },
    {
      type: "multi",
      title: "Build the IOC List",
      prompt: "Select every TRUE indicator of compromise for VELVETSNAP. These go out to every county agency and every defender in the state.",
      options: [
        { k: "h", label: "SHA-256 c77e01b4... (attachment)", why: "The file fingerprint — blockable everywhere." },
        { k: "d", label: "C2 domain vlx-update[.]net", why: "Its phone-home channel — cut it and the worm goes deaf." },
        { k: "b", label: "60-second beacon pattern to :443", why: "Behavioral signature — detectable even with a new C2 domain." },
        { k: "s", label: "SMB share-sweeping following the beacon", why: "Its lateral movement signature." },
        { k: "z", label: "File size of the attachment (412 KB)", why: "A size alone matches a million innocent files. It is not a reliable IOC on its own." },
        { k: "n", label: "The intern's name", why: "Blame is not an indicator. Systems over people — that's how defenders earn trust." }
      ],
      correct: ["h", "d", "b", "s"],
      explain: "Strong IOCs are precise and machine-readable: hashes, domains, IPs, and behavioral patterns. '412 KB file' and 'the intern did it' help nobody hunt anything."
    },
    {
      type: "order",
      title: "Containment Sequence",
      prompt: "VELVETSNAP is still spreading. Order the containment steps.",
      items: [
        { k: "1", label: "Cut the C2: sinkhole/block vlx-update[.]net at the perimeter" },
        { k: "2", label: "Isolate infected VLANs; wall off server subnets" },
        { k: "3", label: "Force credential resets (worm harvests passwords)" },
        { k: "4", label: "Wipe & reimage infected machines from known-good images" },
        { k: "5", label: "Restore data from offline backups; verify before reconnecting" }
      ],
      correct: ["1", "2", "3", "4", "5"],
      explain: "Cut its phone home first (kills remote control), then box in the spread, then rotate stolen credentials, then clean, then restore. Restoring into an unclean network just re-encrypts everything."
    },
    {
      type: "debrief",
      title: "Cold Chain Complete",
      body: [
        "By Friday the county network is clean. Your IOC list — hash, C2 domain, beacon cadence, SMB sweep — is distributed statewide, and two other counties detect and kill the same worm in minutes instead of days.",
        "Okafor: 'One click by one intern. Imagine if nobody had captured memory or shared the indicators. That's the difference an investigator makes.'"
      ],
      notes: ["ioc", "c2", "static-dynamic", "lateral-movement", "backups"],
      tools: ["loglens", "sandbox"]
    }
  ]
},

/* ---------------------------------------------------------- */
{
  id: "m3",
  code: "OPERATION NIGHT LIGHT",
  title: "Night Light",
  icon: "🕯️",
  difficulty: 3,
  xp: 520,
  track: "guardian",
  tag: { en: "Triage a cyber tip. Save a kid the right way.", es: "Procesa una alerta cibernética. Salva a un niño como se debe.", ru: "Разберите киберобращение. Спасите ребёнка правильно." },
  steps: [
    {
      type: "brief",
      title: "The Child Exploitation Desk",
      body: [
        "You are rotating into NCIB's Child Exploitation Desk, working alongside a real-world-style ICAC (Internet Crimes Against Children) task force. This is the heaviest work in the field — and the reason many of us joined.",
        "Tonight's queue contains a cyber tip: a social platform's automated system detected an uploaded file whose HASH matched a known-abuse hash list. No image content is in this room — only the fingerprint.",
        "You will never see the illicit material in this training, and that is correct procedure: analysts work from hashes, logs, and metadata. The goal is a rescue, not a spectacle."
      ],
      callout: { style: "sens", label: "CONTENT ADVISORY & GROUND RULES", text: "This case discusses child exploitation investigation at a professional, non-graphic level: no illicit content is ever shown or described. If this topic touches your real life — as a survivor, a parent, or someone struggling with illegal urges — the REPORT & GET HELP panel (top bar) lists real, confidential resources including Stop It Now." }
    },
    {
      type: "evidence",
      title: "Cyber Tip Triage",
      prompt: "The tip package has arrived. Work it.",
      items: [
        { id: "n1", name: "Cyber tip report (platform)", icon: "🧾",
          body: "Reporting provider: video platform (obligated reporter, 18 U.S.C. § 2258A)\nReason: uploaded file hash matched known-abuse hash list\nFile hash: 3b9d...a41 (PhotoDNA-style fingerprint + SHA-256)\nUpload time: 2026-09-30 21:14 UTC\nAccount: 'fitnesscoach_dan' — 2 prior tips, 1 unresolved\nTHIS REPORT DOES NOT CONTAIN THE MEDIA. Only fingerprints. That is by design." },
        { id: "n2", name: "Account snapshot", icon: "👤",
          body: "Alias: fitnesscoach_dan\nDisplay: 'Dan C. — Youth Fitness Coach, Riverbend'\nAge listed: 34 | Locates himself publicly: yes\nContacts: multiple accounts belonging to apparent minors\nPattern: builds trust with fitness/sports content, then invites kids to a private messaging app.\nSuspect: B. CARLETON — real identity corroborated by prior open case." },
        { id: "n3", name: "Upload log", icon: "🗓️",
          body: "2026-09-30 21:14 UTC — upload from IP 74.x.x.x (residential ISP, Riverbend)\n2026-09-28 20:02 UTC — chat invite sent to account 'K_marialuv' (listed age: 14)\n2026-09-27 — 'K' account created; friend requests to 3 other minor accounts\nDevice cluster: matches a laptop already identified in a 2025 NCIB case file." }
      ]
    },
    {
      type: "choice",
      title: "First Action",
      prompt: "It's 23:30. The suspect does not know the tip exists. What is your first action?",
      options: [
        { k: "a", label: "Escalate to the ICAC task force lead and open the case under legal process — platform subpoena next, warrant after.", correct: true,
          feedback: "Correct. Silence is your weapon. Escalate under legal process so every subsequent step stands up in court, and so victim-identification specialists start their work in parallel." },
        { k: "b", label: "Message 'fitnesscoach_dan' pretending to be a kid to see if he confesses.", correct: false,
          feedback: "Never. Untrained contact destroys cases: it tips evidence patterns, risks compromising the undercover officers already working this space, and can amount to entrapment. Only certified ICAC officers, under supervision and guidelines, ever engage suspects." },
        { k: "c", label: "Post his photo in a neighborhood watch group to warn parents.", correct: false,
          feedback: "Absolutely not. Public accusations against an un-arrested person can be defamation, can trigger evidence destruction, and have led innocent people to be harassed when misidentifications occur. The system is slow because it must be." }
      ]
    },
    {
      type: "multi",
      title: "Flag the Grooming Lines",
      prompt: "Below are lines from the suspect's chats with account 'K' (listed age 14). Flag EVERY grooming red flag an experienced ICAC analyst would mark. (Trained undercover officers later took over 'K'. You'll see.)",
      options: [
        { k: "f1", label: "'You're so mature for your age. Way older than 14 in here.' [head emoji]", why: "Age-distance flattery — normalizing adult/minor closeness. Classic first brick." },
        { k: "f2", label: "'Don't tell your mom about our chats. She'd get us both in trouble.'", why: "Secrecy — isolating the child from protectors is the core grooming move." },
        { k: "f3", label: "'New gaming headset is yours if you keep our streak going.'", why: "Gifts and reciprocity — creating debt and attachment." },
        { k: "f4", label: "'Let's move to this other app, it's more private. Delete this one.'", why: "Platform migration to less-moderated, less-discoverable channels." },
        { k: "f5", label: "'You can tell me anything. I'm basically your second family.'", why: "Pseudo-family bonding, positioning himself as the only understanding adult." },
        { k: "f6", label: "'What did you do at practice today?'", why: "This one is innocent small talk on its face. Training flags only manipulative patterns, not every message — over-flagging burns credibility and alerts offenders." }
      ],
      correct: ["f1", "f2", "f3", "f4", "f5"],
      explain: "Grooming is a pattern: flattery → isolation → secrecy → gifts → migration to private channels. Spotting the PATTERN is the skill. And note: 'K' was actually a trained ICAC undercover officer using a decoy persona — no child was ever in that chat. That is how modern stings protect kids: trained officers, strict guidelines, full recording."
    },
    {
      type: "translate",
      title: "Language Desk: Spanish",
      lang: "es",
      context: "The victim-identification unit locates a REAL child exploited by Carleton in an earlier series of events: Mariana V., 14, Riverbend. Her mother gives a statement in Spanish. Your translation may hold timeline gold.",
      lines: [
        { s: "Compré la tableta para Mariana en marzo, para la escuela.", t: "I bought the tablet for Mariana in March, for school." },
        { s: "Hace dos meses empezó a comportarse raro: cerraba la puerta y borraba el historial.", t: "Two months ago she started acting strange: she closed the door and cleared her history." },
        { s: "Un día vi un mensaje de 'Dan, el entrenador'. Decía que ella era muy madura y que nadie la entendía como él.", t: "One day I saw a message from 'Dan the coach'. It said she was very mature and that nobody understood her like he did." },
        { s: "Yo pensé que era un amigo de la escuela. No sabía que era un adulto.", t: "I thought he was a friend from school. I didn't know he was an adult." },
        { s: "Mariana tiene 14 años. Ella es mi vida entera. Por favor, ayúdenla.", t: "Mariana is 14. She is my whole life. Please help her." }
      ]
    },
    {
      type: "choice",
      title: "The Timeline",
      prompt: "The mother's statement gives you a corroborated timeline: tablet in March, behavior change two months ago, 'Coach Dan' visible in messages. What does this establish?",
      options: [
        { k: "a", label: "Independent corroboration linking Carleton's account to a real identified minor victim — with dates the defense can't easily explain away.", correct: true,
          feedback: "Exactly. A parent's observations + platform logs + prior case data triangulate. Corroboration from separate sources is what turns a tip into a case." },
        { k: "b", label: "Proof that Mariana is to blame for not telling her mother sooner.", correct: false,
          feedback: "Never. Victims are groomed precisely so they feel unable to tell. Blaming them is both cruel and investigation-naive — secrecy is the abuser's design, not the child's fault." },
        { k: "c", label: "Nothing — hearsay is useless in court.", correct: false,
          feedback: "It's not useless: it directs forensics to the right device, right months, right account. Much hearsay becomes admissible through the evidence it leads to." }
      ]
    },
    {
      type: "order",
      title: "The Legal Ladder",
      prompt: "Arrange the process from tip to arrest — the same ladder every U.S. child-exploitation case climbs.",
      items: [
        { k: "1", label: "Preserve: platform preserves data under legal hold" },
        { k: "2", label: "Subpoena: account records, payment info, IP history" },
        { k: "3", label: "Warrant: search home & seize devices (judge, probable cause)" },
        { k: "4", label: "Forensics: image devices, hash-match media, build timeline" },
        { k: "5", label: "Charging: prosecutor reviews; arrest; victim services engaged" }
      ],
      correct: ["1", "2", "3", "4", "5"],
      explain: "Preserve → subpoena → warrant → forensics → charges. Every rung creates admissible evidence. A single shortcut — searching before the warrant, contacting the suspect — can collapse everything and free a predator."
    },
    {
      type: "choice",
      title: "Mariana's Interview",
      prompt: "Mariana is found safe. An interview must happen. What does the professional model look like?",
      options: [
        { k: "a", label: "One recorded forensic interview at a Child Advocacy Center, by a trained specialist, with family support and therapy referrals.", correct: true,
          feedback: "Correct — the CAC model. One trauma-informed interview, recorded, so the child never has to relive it for every new adult in the system. Poor interviews re-traumatize victims AND hand defense attorneys 'tainted statement' arguments." },
        { k: "b", label: "Question her yourself, now, quickly — you need the facts for the warrant.", correct: false,
          feedback: "No. Untrained questioning can plant details, lead the child, and contaminate her testimony forever. Investigators wait for the specialists. Your discipline is part of her healing." },
        { k: "c", label: "Interview her at the suspect's house so she can point out evidence.", correct: false,
          feedback: "Never. The interview happens in a neutral, child-safe setting. Her safety and the integrity of her words both matter more than speed." }
      ]
    },
    {
      type: "debrief",
      title: "Night Light Complete",
      body: [
        "B. Carleton is arrested at 06:12 as he leaves for 'coach duty'. Devices are imaged; the hash matches end the defense's options; Mariana and her mother are connected with victim services that speak their language — literally.",
        "Case agent notes: 'The kid is safe because an analyst in a quiet room did boring, brilliant, patient work. Tell the next rookie that.'",
        "One more truth to carry: most exploitation never reaches a task force. Kids stay silent. If you ever meet one — your child, a student, a neighbor — the bravest thing you can teach them is that telling an adult is safe and that they are never, ever in trouble."
      ],
      notes: ["grooming", "ncmec", "forensic-interview", "legal-process"],
      tools: []
    }
  ]
}
];
