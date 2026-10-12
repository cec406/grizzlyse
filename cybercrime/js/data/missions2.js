/* ============================================================
   CODEWATCH — Missions 4–6
   4. Operation Watchtower   (soldier OPSEC / foreign honeytrap)
   5. Operation Deadbolt     (hospital ransomware — Russian note)
   6. Operation Tin Shield   (grid / ICS intrusion — EMP prevention)
   ============================================================ */
'use strict';

var MISSIONS_B = [

/* ---------------------------------------------------------- */
{
  id: "m4",
  code: "OPERATION WATCHTOWER",
  title: "Watchtower",
  icon: "🗼",
  difficulty: 3,
  xp: 460,
  track: "sentinel",
  tag: { en: "A honeytrap is hunting a soldier's secrets.", es: "Un 'honeytrap' caza los secretos de un soldado.", ru: "Приманка охотится за секретами солдата." },
  steps: [
    {
      type: "brief",
      title: "Referral from Army Counterintelligence",
      body: [
        "Sergeant Dana Reyes (no relation to your Agent Reyes) is a signals specialist at fictional Fort Barrow. Army CI flagged her account after a dating-app profile 'Elena_92' started asking suspiciously precise questions.",
        "Dana is 26, fit, posts constantly — gym selfies with geotags on, barracks door tags, 'T-minus 90 days!' countdowns.",
        "Your job: reconstruct what a hostile service could already know from her public posts, read the intercepted tasking message, and fix the leak — without torching the counterintelligence operation."
      ],
      callout: { style: "good", label: "WHY SOLDIERS", text: "Foreign services rarely hack first. They browse first. Every geotagged jog is a map; every countdown is an order-of-battle clue. 'Save the soldier' usually means 'teach the soldier'." }
    },
    {
      type: "evidence",
      title: "Open-Source Sweep",
      prompt: "Reconstruct the enemy's picture of Dana from public posts. (OSINT: open-source intelligence — the adversary's favorite tool because it's free.)",
      items: [
        { id: "w1", name: "Post: gym selfie", icon: "📸",
          body: "Geotag: IRONFORGE FITNESS, 2.1 km from Fort Barrow north gate\nDevice: DTR-7X (unit-issued phone, geotags not disabled)\nVisible: unit patch, rank, formation PT shirt\nCaption: 'no days off before deployment szn 🔥'\nAn analyst reads: base vicinity, daily schedule, deploy pending." },
        { id: "w2", name: "Post: door photo", icon: "🚪",
          body: "Barracks door sign visible: 'SGT REYES — BLDG 44, RM 12'\nReflection in mirror: whiteboard with duty roster\nCaption: 'home for the next 6 weeks'\nAn analyst reads: home address inside the wire + a 6-week window when her unit likely moves." },
        { id: "w3", name: "Profile: 'Elena_92'", icon: "💬",
          body: "Dating app + 2 gaming platforms. Photos: generic tourist scenes, reverse-image search = stock library.\nBehavior: mirrors Dana's interests perfectly — TOO perfectly.\nQuestions asked: 'Will you be deployed by Christmas? Which unit handles comms for the brigade?'\nAssessment: NOT a real person. A persona — and you have a translator working on her handler's traffic." }
      ]
    },
    {
      type: "translate",
      title: "Language Desk: Russian",
      lang: "ru",
      context: "Signals intercept: 'Elena' receives instructions from a handler labeled 'K.'. Your Polyglot renders it:",
      lines: [
        { s: "Задача от 'К.'", t: "Tasking from 'K.'" },
        { s: "Продолжай общение с сержантом. Фото из зала с геотегом — хорошо.", t: "Keep communicating with the sergeant. Gym photos with a geotag — good." },
        { s: "Уточни дату отправки подразделения за границу.", t: "Confirm the unit's overseas departure date." },
        { s: "После успеха — перевод на счёт и приглашение в Прагу.", t: "After success — a transfer to your account and an invitation to Prague." },
        { s: "Не оставляй следов. Удали этот чат.", t: "Leave no traces. Delete this chat." }
      ]
    },
    {
      type: "choice",
      title: "What's Being Hunted",
      prompt: "Given the tasking and Dana's posts, what does the hostile service actually want?",
      options: [
        { k: "a", label: "The deployment window and communications-unit role of her brigade — operational readiness intelligence.", correct: true,
          feedback: "Correct. Individual soldiers rarely hold secrets; their TIMELINES and ROLES do. 'When does the unit move, and who runs its comms' is exactly what planners need. Her cute countdown posts were the collection plan." },
        { k: "b", label: "Her passwords, to hack the fort's servers.", correct: false,
          feedback: "Not the objective here. The tasking asks for dates and roles — human intelligence, not credential theft. (Though her password hygiene is its own conversation.)" },
        { k: "c", label: "Romance. She genuinely likes Dana.", correct: false,
          feedback: "The photos are stock. The questions are targeted. Handlers pay transfers on success. This is a professional collection operation wearing a dating app." }
      ]
    },
    {
      type: "choice",
      title: "Your Move",
      prompt: "You've confirmed the honeytrap. What's the right play?",
      options: [
        { k: "a", label: "Hand everything to Army counterintelligence and let THEM run the account. Brief Dana on OPSEC; let her keep chatting under CI guidance.", correct: true,
          feedback: "Correct. CI wants to keep 'Elena' alive — controlled engagement can map the handler network and feed disinformation. Killing the account now just makes the enemy open a new one you can't see." },
        { k: "b", label: "Block and report 'Elena' immediately — cut contact, protect Dana, done.", correct: false,
          feedback: "Understandable instinct, but it burns the operation and teaches the adversary nothing. Reports yes; uncoordinated blocking no." },
        { k: "c", label: "Message 'Elena' yourself pretending to be Dana, unmask the handler publicly.", correct: false,
          feedback: "That's impersonating a service member to a hostile intelligence service — a legal and diplomatic minefield, and it destroys CI's control of the channel. Never freelance against a state actor." }
      ]
    },
    {
      type: "order",
      title: "Dana's OPSEC Reset",
      prompt: "Order the OPSEC briefing points from MOST urgent to LAST.",
      items: [
        { k: "1", label: "Disable geotags on all devices — today" },
        { k: "2", label: "Scrub existing posts: no locations, no countdowns, no unit details" },
        { k: "3", label: "Audit tags: friends' posts can leak your schedule too" },
        { k: "4", label: "Pre-deployment blackout: no posting about dates, routes, or readiness" },
        { k: "5", label: "Report suspicious contacts to CI — never engage alone" }
      ],
      correct: ["1", "2", "3", "4", "5"],
      explain: "Stop NEW leaks first (geotags), then remove OLD ones, then close indirect leaks (tags), then institutionalize the blackout, and always route suspicious contacts to professionals."
    },
    {
      type: "debrief",
      title: "Watchtower Complete",
      body: [
        "Army CI keeps 'Elena' alive for eleven more weeks. Through the controlled channel they map two handler accounts and a coin-wallet used for 'success bonuses' — which later helps an allied service charge a recruiter.",
        "Dana's brigade deploys with no social-media breadcrumbs. She writes you a two-line note: 'My soldiers are safer because a stranger read my feed like a spy would. Thank you.'",
        "Lesson locked in: you don't defeat collection with firewalls alone. You defeat it with people who understand what they're publishing."
      ],
      notes: ["opsec", "social-engineering"],
      tools: ["osint"]
    }
  ]
},

/* ---------------------------------------------------------- */
{
  id: "m5",
  code: "OPERATION DEADBOLT",
  title: "Deadbolt",
  icon: "🏥",
  difficulty: 3,
  xp: 520,
  track: "sentinel",
  tag: { en: "Ransomware locks a hospital at 2:47 AM.", es: "Ransomware bloquea un hospital a las 2:47 a. m.", ru: "Шифровальщик заблокировал больницу в 2:47 ночи." },
  steps: [
    {
      type: "brief",
      title: "St. Aldric Medical, 02:47",
      body: [
        "The night nurse's workstation locks mid-chart. Then imaging. Then the pharmacy system. Monitors bloom with a black ransom note written in Russian.",
        "St. Aldric runs 340 beds, an ICU, and the region's stroke unit. Every minute offline is a clinical risk. The ER diverts ambulances at 03:05.",
        "You are the on-call cyber response analyst. A ransomware attack on a hospital is not an IT incident — it is a PATIENT SAFETY incident. Move accordingly."
      ],
      callout: { style: "sens", label: "HOSTILE COMMS", text: "The attackers signed their note 'KOLIBRI' — a fictional Russian-speaking ransomware crew for this game. Their note is in Russian; your translator will render it. (Real crews write in Russian routinely; the language desk exists for exactly this.)" }
    },
    {
      type: "translate",
      title: "The Ransom Note",
      lang: "ru",
      context: "Full-screen on every locked machine. Read it like an investigator, not a victim.",
      lines: [
        { s: "ВНИМАНИЕ! ВАШИ ФАЙЛЫ ЗАШИФРОВАНЫ.", t: "ATTENTION! YOUR FILES ARE ENCRYPTED." },
        { s: "Все базы данных и резервные копии на ваших серверах зашифрованы программой KOLIBRI.", t: "All databases and backups on your servers have been encrypted by the KOLIBRI program." },
        { s: "Не пытайтесь расшифровать файлы самостоятельно — данные будут повреждены навсегда.", t: "Do not attempt to decrypt the files yourself — the data will be corrupted forever." },
        { s: "Оплата: 14 биткоинов в течение 72 часов. После оплаты вы получите ключ восстановления.", t: "Payment: 14 bitcoins within 72 hours. After payment you will receive the recovery key." },
        { s: "Если вы обратитесь в полицию или к специалистам — мы опубликуем данные пациентов на нашем сайте.", t: "If you contact the police or specialists, we will publish patient data on our site." },
        { s: "Не медлите. Каждый час без оплаты повышает цену на один биткоин.", t: "Do not delay. Every hour without payment raises the price by one bitcoin." }
      ]
    },
    {
      type: "evidence",
      title: "What the Note Tells YOU",
      prompt: "Read the translated note again with an investigator's eye. What is real signal vs. theater?",
      items: [
        { id: "d1", name: "Threat analysis", icon: "🔍",
          body: "'All backups encrypted' — verify, don't believe. Attackers ALWAYS claim this; tape backups and offline copies routinely survive.\n'Police = we publish' — that's DOUBLE EXTORTION: steal data first, encrypt second, threaten leak. It means the data was likely ALREADY exfiltrated before encryption. Paying doesn't un-steal it.\n'Price rises hourly' — pure pressure theater. Deadline demands are negotiation bait, not physics." },
        { id: "d2", name: "BTC demand ledger", icon: "🪙",
          body: "Demand: 14 BTC (~$1.1M) to wallet 1Kolibri...x7f\nChainTrace later attributes the wallet to a cluster that received payments from 3 other U.S. hospitals in 18 months.\nNote: OFAC has sanctioned several ransomware crews and their facilitators. Paying a sanctioned entity can itself be a violation — and there is no guarantee of a working key. The U.S. government's position: report; do not pay; restore." },
        { id: "d3", name: "Clinical impact map", icon: "🩺",
          body: "ENCRYPTED: EHR database, imaging archive, pharmacy order queue, billing.\nSTILL LOCAL/OFFLINE: lab analyzers (standalone), infusion pumps (firmware local), paper downtime kits (printed monthly).\nLesson: hospitals survive ransomware when CLINICAL operations degrade gracefully — downtime kits, paper charting, manual med checks — while IT restores." }
      ]
    },
    {
      type: "choice",
      title: "First Command Decision",
      prompt: "03:12. You're on the bridge call with the CISO and the incident commander. First directive?",
      options: [
        { k: "a", label: "Isolate infected network segments NOW; keep powered, independent clinical devices running; spin up paper downtime procedures.", correct: true,
          feedback: "Correct. Containment by segmentation — not yanking every cable — keeps safe clinical systems alive while cutting the attacker's lateral paths. Downtime kits turn an IT outage into a survivable clinical hiccup." },
        { k: "b", label: "Power down the entire hospital network to stop encryption cold.", correct: false,
          feedback: "A hospital blackout also kills networked monitors, phones, and access systems — swapping a cyber problem for a patient-safety crisis. Segment; don't amputate." },
        { k: "c", label: "Open the ransom note's payment portal to 'keep the line open' while we think.", correct: false,
          feedback: "Contacting the attacker's portal is a negotiation step that comes — if ever — only after FBI engagement and sanctions screening, never on analyst initiative, and never as a reflex." }
      ]
    },
    {
      type: "order",
      title: "Incident Response Sequence",
      prompt: "Order the canonical IR phases for this incident.",
      items: [
        { k: "1", label: "Contain: segment network, cut attacker access, preserve memory/logs" },
        { k: "2", label: "Notify: FBI + CISA + state health authority (mandatory reporting)" },
        { k: "3", label: "Assess: find offline backups; verify they're pre-infection and unencrypted" },
        { k: "4", label: "Eradicate: remove persistence, patch entry vector (stolen VPN creds, no MFA)" },
        { k: "5", label: "Restore: rebuild clean, restore in clinical-priority order, watch for reinfection" }
      ],
      correct: ["1", "2", "3", "4", "5"],
      explain: "Contain → Notify → Assess → Eradicate → Restore. Notifying early is not weakness: the FBI has decrypted keys for some strains (that's how some hospitals recover for free), CISA shares indicators, and health authorities coordinate patient safety."
    },
    {
      type: "choice",
      title: "To Pay or Not to Pay",
      prompt: "The board convenes at 05:00. A board member says: 'Write the check. Fourteen bitcoin is nothing next to a life.' What's the professional position?",
      options: [
        { k: "a", label: "Don't pay. Engage FBI/CISA, restore from verified offline backups, screen any payment against OFAC sanctions, and treat data as already stolen.", correct: true,
          feedback: "Correct. Payment funds the next attack on the next hospital, may be illegal under sanctions, offers no guarantee, and doesn't return exfiltrated patient data — which is precisely what they threatened to leak. Prepared hospitals don't pay; they restore." },
        { k: "b", label: "Pay — patient safety trumps everything else.", correct: false,
          feedback: "It's a real dilemma and good people debate it — but the data shows payment rarely prevents leaks, funds criminal infrastructure (including groups linked to state interests), and may violate sanctions law. The system's answer is resilience, not ransom." },
        { k: "c", label: "Pay, but negotiate the price down to show fiscal responsibility.", correct: false,
          feedback: "Negotiating is a real, ugly last-resort activity handled by professional firms and the FBI — but it is never the plan. And 'negotiated' crews have shipped broken keys anyway." }
      ]
    },
    {
      type: "order",
      title: "Restore Order",
      prompt: "Backups verified clean. Order the restoration priority.",
      items: [
        { k: "1", label: "Clinical monitoring & life-safety systems (islanded, verify) " },
        { k: "2", label: "Pharmacy ordering — medication safety chain" },
        { k: "3", label: "EHR core — charts, labs, imaging feeds" },
        { k: "4", label: "Imaging archive (PACS) full history" },
        { k: "5", label: "Billing & administration — last, always" }
      ],
      correct: ["1", "2", "3", "4", "5"],
      explain: "Restore in order of clinical risk, not invoice size. Billing last isn't spite — it's triage. Every restoration decision is documented and communicated to clinicians."
    },
    {
      type: "debrief",
      title: "Deadbolt Complete",
      body: [
        "St. Aldric restores EHR core in 61 hours using offline tape backups the attackers claimed didn't exist. No ransom is paid. KOLIBRI's leak site publishes nothing from St. Aldric — because (ChainTrace confirms later) the exfiltration was blocked mid-copy by your segmentation call.",
        "The FBI ties the wallet to three prior hospital attacks. The entry vector — a hospital VPN without MFA — becomes a CISA alert read by 2,000 healthcare organizations.",
        "Reyes: 'You just watched a hospital refuse extortion and live. That's the endgame we train everyone toward. 3-2-1 backups, segmented networks, drilled downtime kits. Boring. Unbeatable.'"
      ],
      notes: ["ransomware", "backups", "crypto-trace"],
      tools: ["chaintrace"]
    }
  ]
},

/* ---------------------------------------------------------- */
{
  id: "m6",
  code: "OPERATION TIN SHIELD",
  title: "Tin Shield",
  icon: "⚡",
  difficulty: 4,
  xp: 560,
  track: "sentinel",
  tag: { en: "Someone is reaching into the power grid.", es: "Alguien mete las manos en la red eléctrica.", ru: "Кто-то залез в энергосеть." },
  steps: [
    {
      type: "brief",
      title: "The Valley Doesn't Get to Go Dark",
      body: [
        "CISA bulletin: the crew 'TALON' — fictional, Russian-speaking, ICS-focused — has been buying access to U.S. water and electric utilities. Tonight, one of your utility partners calls: breaker control HMI at Substation 7 logged in from an IP in a country it has no business meeting.",
        "Here's the terror of ICS: you don't need a bomb for an EMP-style event. Open the right breakers at the right substations in the right sequence and the grid cascades itself into regional blackout — hospitals, water pumps, airports, the valley's everything.",
        "Ukraine 2015 and 2016 proved it works: real attacks switched off real power for hundreds of thousands of people using nothing but keyboards and patience."
      ],
      callout: { style: "good", label: "IT vs OT", text: "Office IT cares about confidentiality first. Operational Technology (OT/ICS) cares about AVAILABILITY AND HUMAN SAFETY first — you cannot 'just reboot' a substation carrying a city. Different physics, different playbook." }
    },
    {
      type: "evidence",
      title: "Substation 7 — Control Room Telemetry",
      prompt: "The utility shares live control traffic. Read it like a grid operator.",
      items: [
        { id: "t1", name: "SCADA session log", icon: "🖥️",
          body: "02:51 VPN login: svc-monitor account (no MFA!) from AS-evergreen[.]vpn provider, exit IP abroad\n02:57 remote command: WRITE RTU-7B setpoint — breaker D12 → OPEN\n03:01 remote command: WRITE RTU-7C — relay firmware push (UNVERIFIED IMAGE)\n03:04 dispatcher console: alarm — 'D12 OPEN without switching order'\nThat is a hand reaching into the machine room of civilization." },
        { id: "t2", name: "Intercepted chatter", icon: "📡",
          body: "Encrypted channel, TALON team room. Your translator renders it — note the operational patience. Grid attacks are choreographed weeks in advance." },
        { id: "t3", name: "RTU firmware diff", icon: "🧩",
          body: "Pushed image vs vendor image: 3 differences\n1) Removes local 'manual-only' interlock on breaker control\n2) Adds backdoor listener on port 502 (Modbus TCP)\n3) Delays alarm reporting by 90 seconds — the gap they need\nVerdict: sabotage package designed to make manual intervention SLOW, not fast." }
      ]
    },
    {
      type: "translate",
      title: "Language Desk: Russian",
      lang: "ru",
      context: "TALON team-room traffic, rendered by Polyglot:",
      lines: [
        { s: "Хост доступен. Прошивка загружается на контроллер 7-B.", t: "Host is reachable. Firmware is uploading to controller 7-B." },
        { s: "После сигнала — разомкнуть линии и не отвечать на запросы диспетчера.", t: "On signal — open the lines and do not respond to dispatcher requests." },
        { s: "Задержка тревог на 90 секунд уже внутри. Этого хватит.", t: "The 90-second alarm delay is already inside. That will be enough." },
        { s: "Это будет громко. Вся долина без света.", t: "It will be loud. The whole valley dark." }
      ]
    },
    {
      type: "choice",
      title: "The 90-Second Window",
      prompt: "Firmware with an alarm-delay implant is loading on RTU-7C RIGHT NOW. The utility asks what to do first. Rules of ICS response: protect life safety, act locally, cut remote paths, keep the lights on.",
      options: [
        { k: "a", label: "Kill the remote-access path (VPN + vendor link) NOW; switch substation 7 to LOCAL MANUAL control; dispatch a technician to the RTU; then hunt the implant.", correct: true,
          feedback: "Correct — and the order matters. Cut remote reach (they're remote), go local manual (dispatchers drive breakers by hand with interlocks intact), boots on ground at the RTU, THEN forensics. Availability and safety first, evidence second, elegance last." },
        { k: "b", label: "Pull breaker D12's control fuses to physically isolate the substation segment.", correct: false,
          feedback: "Careful — pulling control mid-load can trip protective relays and cascade. In OT, the wrong 'isolation' IS the blackout. Manual control with interlocks is the professional move; fuses are an operator's decision, not yours." },
        { k: "c", label: "Wait for the firmware push to finish so you can capture the full implant for forensics.", correct: false,
          feedback: "That's an evidence-first mindset — and in ICS, evidence-first gets people hurt. Let the vendor provide a specimen later. A substation is not a sandbox." }
      ]
    },
    {
      type: "multi",
      title: "The Hardening List",
      prompt: "The valley stays up. Now build the after-action hardening plan. Select every CORRECT control.",
      options: [
        { k: "m", label: "MFA + dedicated jump hosts for all remote access to OT", why: "Their way in was a no-MFA service account through a consumer VPN provider. Close both doors." },
        { k: "d", label: "Allow-list outbound: RTUs and HMIs talk to nothing they don't need", why: "The implant beaconed out. Deny-by-default egress makes implants mute." },
        { k: "v", label: "Signed firmware only; verify images against vendor manifests", why: "The sabotage rode an unsigned 'update'. Signature checks are the vaccine." },
        { k: "s", label: "Physical inspection & local manual operation drills", why: "The last line of defense is a person at the panel who has PRACTICED. Ukraine's defenders reconnected lines by hand." },
        { k: "x", label: "Move SCADA to the cloud so it's 'harder to hack locally'", why: "Not as stated. Cloud can be done safely, but 'harder to hack' isn't automatic — it just moves the perimeter. Design first." },
        { k: "p", label: "Pay TALON to leave. Cheaper than a blackout.", why: "Extortion of critical infrastructure is a national security crime — and it never buys safety, only the next visit. Law enforcement and CISA are the path." }
      ],
      correct: ["m", "d", "v", "s"],
      explain: "OT security in one line: fewer remote paths, signed everything, deny-by-default, and humans drilled for manual operation. The grid survives on layers — technical AND human."
    },
    {
      type: "choice",
      title: "Attribution Discipline",
      prompt: "A cable pundit announces live: 'TALON is a Russian state program — war! The valley is under attack by Moscow!' You have partial evidence. What do you say on the record?",
      options: [
        { k: "a", label: "State facts: intrusion detected, contained, grid secure, joint investigation with CISA/FBI ongoing. No attribution until the evidence and the interagency process support it.", correct: true,
          feedback: "Correct. Attribution is a government-level judgment with legal and diplomatic consequences. Premature attribution can trigger escalation or expose sources and methods. Facts now; names when they're earned." },
        { k: "b", label: "Agree with the pundit — the note said 'the valley goes dark', obviously Russia.", correct: false,
          feedback: "Language fluency ≠ attribution. Any bilingual troll can write Cyrillic. Attribution needs infrastructure, tradecraft, and corroborated ownership — not vibes." },
        { k: "c", label: "Say nothing at all. Silence builds trust.", correct: false,
          feedback: "Silence during a grid scare is a vacuum — and panic fills vacuums. Communicate facts early and often; that's what steadies a region." }
      ]
    },
    {
      type: "debrief",
      title: "Tin Shield Complete",
      body: [
        "Substation 7 never opens breaker D12 in anger. The 90-second alarm gap becomes a 40-second manual override, executed by an operator who had drilled exactly this scenario three weeks ago.",
        "CISA publishes the TALON indicators — your firmware diff included — and three other utilities find and evict the same implant within the week.",
        "Okafor: 'No bombs, no drama. A city kept its lights because an analyst read a log at 03:01 and made the boring, correct call. Grid security is a habit, not a hero.'"
      ],
      notes: ["ics", "air-gap", "emp"],
      tools: []
    }
  ]
}
];
