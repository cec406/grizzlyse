/* ============================================================
   CODEWATCH — Missions 7–9 + Exam pool
   7. Operation Ghost Market  (dark market / crypto tracing)
   8. Operation Porch Light   (Spanish-language scam wave)
   9. Operation Aegis         (capstone crisis)
   ============================================================ */
'use strict';

var MISSIONS_C = [

/* ---------------------------------------------------------- */
{
  id: "m7",
  code: "OPERATION GHOST MARKET",
  title: "Ghost Market",
  icon: "👻",
  difficulty: 4,
  xp: 580,
  track: "core",
  tag: { en: "Follow the coins into a dark market.", es: "Sigue las monedas hasta un mercado oscuro.", ru: "Идите по монетам в чёрный рынок." },
  steps: [
    {
      type: "brief",
      title: "NIGHTBAZAAR",
      body: [
        "NIGHTBAZAAR is a fictional dark-web market where stolen data, access, and forged documents change hands. Real markets like it have sold the personal files of millions — schools, hospitals, defense contractors.",
        "A vendor signing 'КОБРА' ('COBRA') is listing access to a defense contractor's network. Your task: build the financial case. The blockchain never forgets — every coin is a breadcrumb.",
        "You are a certified undercover analyst. Which means: you may OBSERVE and PURCHASE AUTHORIZED SAMPLES under supervision. You may never facilitate violence, never fabricate evidence, never 'get creative' beyond your signed operational plan."
      ],
      callout: { style: "good", label: "WHY MONEY MATTERS", text: "Markets die; money survives. You can seize a server and the market reopens next week — but a traced, frozen, forfeited fortune follows a human through every alias they ever make." }
    },
    {
      type: "evidence",
      title: "Vendor Doxx — Intelligence Package",
      prompt: "Inspect the listing package. ('Гарант' = escrow; markets use it to keep both thieves honest.)",
      items: [
        { id: "g1", name: "Listing (RU)", icon: "🛒",
          body: "TRANSLATOR REQUIRED — the listing is in Russian, naturally." },
        { id: "g2", name: "Listing, translated", icon: "🌐",
          body: "FOR SALE: access to a defense contractor network (VPN + 2FA seed secrets).\nEscrow service ('garant'). Commission 5%.\nPayment in bitcoin only. Contact: @cobra_operator.\nVendor stats: 61 sales, 97% positive, member since 2024.\nANALYST NOTE: 'Access to X' listings are how ransomware crews SHOP. Somebody pays COBRA, and next month that contractor makes headline obituaries of its data." },
        { id: "g3", name: "Wallet: 1Cobra...8xq", icon: "🪙",
          body: "ChainTrace cluster: 'cobra-cashout-1'\nIN: 214 deposits from market escrow (garant wallet)\nOUT pattern: consolidates every 6 days → single output → mixer 'Koschei' (fictional)\nPost-mixer: dust-pattern correlation matches deposits at BitSevilla exchange (Sevilla, Spain — KYC jurisdiction).\nTHE PATTERN NEVER DIES. Mixers just make you work for it." }
      ]
    },
    {
      type: "translate",
      title: "Language Desk: Russian",
      lang: "ru",
      context: "The raw listing text, line by line:",
      lines: [
        { s: "Продажа: доступ к сети оборонного подрядчика (VPN + секреты 2FA).", t: "For sale: access to a defense contractor network (VPN + 2FA secrets)." },
        { s: "Гарант-сервис. Комиссия 5%.", t: "Escrow service. 5% commission." },
        { s: "Оплата только в биткоинах. Связь: @cobra_operator", t: "Payment in bitcoin only. Contact: @cobra_operator" },
        { s: "Работаю 2 года. Репутация — всё.", t: "Working for 2 years. Reputation is everything." }
      ]
    },
    {
      type: "order",
      title: "The Coin Trail",
      prompt: "Order the investigative chain from listing to courtroom.",
      items: [
        { k: "1", label: "Cluster the wallet: link Cobra's addresses by spending patterns" },
        { k: "2", label: "Trace outflows: consolidation → mixer → exchange deposits" },
        { k: "3", label: "Identify cash-out: exchange KYC names the human" },
        { k: "4", label: "MLAT: formal request to Spain for account records" },
        { k: "5", label: "Seizure warrant: freeze funds; indictment follows" }
      ],
      correct: ["1", "2", "3", "4", "5"],
      explain: "Cluster → trace → identify → MLAT → seize. Mixers slow this but never stop it: timing, amounts, and change-addresses stitch trails back together."
    },
    {
      type: "translate",
      title: "Language Desk: Spanish",
      lang: "es",
      context: "BitSevilla's compliance unit (Sevilla) responds to the MLAT request:",
      lines: [
        { s: "UNIDAD DE DELITOS INFORMÁTICOS — SEVILLA", t: "CYBERCRIME UNIT — SEVILLE" },
        { s: "Conforme al tratado de asistencia legal mutua, confirmamos el intercambio de información bancaria.", t: "Under the mutual legal assistance treaty, we confirm the exchange of banking information." },
        { s: "El cliente 'Erik M.' verificó su identidad con pasaporte español y recibió los fondos el 14 de octubre.", t: "The client 'Erik M.' verified his identity with a Spanish passport and received the funds on October 14." },
        { s: "Los fondos han sido congelados. Quedamos a la espera de la orden judicial para su entrega.", t: "The funds have been frozen. We await a court order for their release." }
      ]
    },
    {
      type: "choice",
      title: "The Undercover Line",
      prompt: "During the operation, @cobra_operator offers you (as your persona) a 'special bundle': access PLUS a decommissioned military drone unit's control keys. Your operational plan covers data-access purchases ONLY. What do you do?",
      options: [
        { k: "a", label: "Decline, break contact per protocol, and document the offer for the case agent — weapons-adjacent capability goes to the task force, not the wallet.", correct: true,
          feedback: "Correct. undercover work has bright lines. Buying weapons-adjacent capability could facilitate real-world harm — and no dataset is worth a life. The offer itself becomes evidence; the sale never happens." },
        { k: "b", label: "Buy it — inside info on drone systems is a career-making seizure.", correct: false,
          feedback: "No. Facilitating acquisition of a weapons capability crosses the line between investigator and accomplice. Evidence never justifies becoming the supply chain for harm." },
        { k: "c", label: "Stall and negotiate to keep him talking, but never confirm intent to buy.", correct: false,
          feedback: "Tempting, but unauthorized continued engagement on a NEW criminal line exceeds your signed plan. Undercover discipline means handing new leads to the case agent, not freelancing them." }
      ]
    },
    {
      type: "debrief",
      title: "Ghost Market Complete",
      body: [
        "Erik M. — the man behind КОБРА — is arrested in Valencia eight months later, trying to board a ferry with a new passport. 41 BTC frozen. His laptop holds the contractor access he never sold: the defense contractor patches in time. Crisis prevented.",
        "The MLAT paperwork took 14 weeks. It felt slow. It was also the reason everything stuck.",
        "Reyes: 'Dark markets feel like chaos. They're actually ledgers. Money remembers everything, and someday, somewhere, it testifies.'"
      ],
      notes: ["crypto-trace", "mixer", "mlat"],
      tools: []
    }
  ]
},

/* ---------------------------------------------------------- */
{
  id: "m8",
  code: "OPERATION PORCH LIGHT",
  title: "Porch Light",
  icon: "📞",
  difficulty: 2,
  xp: 440,
  track: "guardian",
  tag: { en: "A scam wave hunts abuela's savings.", es: "Una ola de estafas caza los ahorros de la abuela.", ru: "Волна мошенничества охотится за сбережениями абюэлы." },
  steps: [
    {
      type: "brief",
      title: "The Robocall Storm",
      body: [
        "Riverbend's Latino community is being hammered. Caller ID shows local numbers; the voices speak confident Spanish; the scripts impersonate the IRS, Medicare, and 'government support agents'.",
        "Doña Elena Vargas — the witness from your very first case — lost $28,400 of her retirement this week. She is one of 900+ complaints in 60 days.",
        "Most victims don't report: fear of the 'government', language barriers, shame. The scams WORK because they weaponize trust and isolation. Your weapons: pattern analysis, urgency, and community trust — in that order."
      ],
      callout: { style: "good", label: "CULTURAL COMPETENCE IS TACTICS", text: "Fraud teams that speak the victims' language and show up in their churches, mercados, and radio stations shut scam waves down faster than any warrant. Outreach is operations." }
    },
    {
      type: "translate",
      title: "Language Desk: Spanish",
      lang: "es",
      context: "Call recording #743 — 'Agente Ramírez' calls Doña Elena. (This exact script pattern was reported 214 times.)",
      lines: [
        { s: "AGENTE 'RAMÍREZ': Buenas tardes, ¿hablo con la señora Elena Vargas?", t: "AGENT 'RAMÍREZ': Good afternoon, am I speaking with Mrs. Elena Vargas?" },
        { s: "Detectamos actividades sospechosas en su cuenta bancaria. Usted es víctima de un robo.", t: "We detected suspicious activity in your bank account. You are a victim of theft." },
        { s: "Necesitamos proteger su dinero HOY MISMO. Retírelo en efectivo.", t: "We need to protect your money TODAY. Withdraw it in cash." },
        { s: "Un agente oficial pasará por su casa a recogerlo. No le diga a nadie: es una investigación secreta.", t: "An official agent will come to your house to collect it. Don't tell anyone: this is a secret investigation." },
        { s: "¿Sigue ahí, señora? No cuelgue. El tiempo corre en contra suya.", t: "Are you still there, ma'am? Don't hang up. Time is against you." }
      ]
    },
    {
      type: "multi",
      title: "Flag the Script",
      prompt: "Select every red flag in the 'Ramírez' script.",
      options: [
        { k: "r1", label: "Unsolicited call claiming to be a government agent", why: "Government agencies initiate by MAIL, and never handle ongoing cases by surprise phone calls." },
        { k: "r2", label: "Manufactured urgency: 'today', 'time is against you'", why: "Urgency exists to disable thinking. Legitimate deadlines come in writing." },
        { k: "r3", label: "Cash withdrawal + in-person courier pickup", why: "No government process collects cash door-to-door. Ever. This is the scam's signature." },
        { k: "r4", label: "Enforced secrecy: 'don't tell anyone'", why: "Isolation is the scam's oxygen. The moment a victim tells one person, the scam usually dies." },
        { k: "r5", label: "Stay on the line — control of the victim's attention", why: "Classic control tactic: never let the victim think, call the bank, or call family." },
        { k: "r6", label: "He greeted her politely and used her full name", why: "Data leaks sell names everywhere. Courtesy isn't evidence of legitimacy — it's camouflage." }
      ],
      correct: ["r1", "r2", "r3", "r4", "r5"],
      explain: "The script is a machine: authority + urgency + isolation + control. Break ANY link and it fails — which is exactly what community education does at scale."
    },
    {
      type: "choice",
      title: "Doña Elena's Money",
      prompt: "Elena wired the cash equivalent via transfer 9 hours ago. The scammer is arranging courier pickup tonight. What's the realistic rescue play?",
      options: [
        { k: "a", label: "Call her bank NOW to attempt a wire freeze/recall, place a fraud alert on the account, and get police to intercept the courier meeting.", correct: true,
          feedback: "Correct — and the clock is the whole game. Banks can freeze or recall transfers within hours; police can stop a cash courier in the act. After 24–72 hours, recovery odds collapse. Speed beats cleverness in fraud response." },
        { k: "b", label: "It's gone. Tell her gently to be more careful next time.", correct: false,
          feedback: "Never accept defeat that fast — and never dump shame on a victim. Hours-old transfers are frequently recoverable, and shame is why victims don't report the NEXT attempt." },
        { k: "c", label: "Have Elena meet the courier as planned but wearing a hidden camera.", correct: false,
          feedback: "Absolutely not. You never place a victim back into contact with offenders. Confrontations are for trained officers with plans, not civilians with cameras." }
      ]
    },
    {
      type: "order",
      title: "Takedown Sequence",
      prompt: "Order the campaign from complaint pile to prison term.",
      items: [
        { k: "1", label: "Aggregate complaints: cluster numbers, scripts, wire destinations" },
        { k: "2", label: "Subpoena the VoIP carrier behind the spoofed caller IDs" },
        { k: "3", label: "Coordinate with state AG + FTC: impound the call infrastructure" },
        { k: "4", label: "Trace the cash-out network: couriers, mule accounts, crypto off-ramps" },
        { k: "5", label: "Charges + bilingual community awareness blitz in parallel" }
      ],
      correct: ["1", "2", "3", "4", "5"],
      explain: "Scams are businesses: infrastructure up top, cash-out at the bottom, victims in between. You attack both ends and harden the middle with education — simultaneously, not sequentially."
    },
    {
      type: "choice",
      title: "The Awareness Campaign",
      prompt: "You have a modest budget and one month. Which outreach plan actually protects the community?",
      options: [
        { k: "a", label: "Bilingual radio + flyers at churches/mercados + 'verify by callback' training for elders + bank teller training to spot cash withdrawals for 'agents'.", correct: true,
          feedback: "Correct. Meet people where they already are, in their language, and arm BOTH ends: the elder AND the teller who sees the withdrawal happening. Interventions at the bank counter kill more scams than any PSA." },
        { k: "b", label: "One press conference in English at city hall.", correct: false,
          feedback: "Reaches neither the language nor the audience. Press conferences are for accountability, not for behavior change." },
        { k: "c", label: "An app that scans calls automatically and blocks them.", correct: false,
          feedback: "Helpful for some — but the most vulnerable elders won't install apps. Tech helps; human networks protect." }
      ]
    },
    {
      type: "debrief",
      title: "Porch Light Complete",
      body: [
        "The wire freeze lands: $19,200 of Elena's money recovered. The courier meeting ends with a 19-year-old 'money mule' in custody — a victim himself, recruited on a gaming chat. He cooperates; the call-farm's VoIP accounts go dark in a week.",
        "Six months later, bank tellers across Riverbend have stopped 40+ withdrawals with the training your team wrote. Doña Elena leads the church workshop herself, in Spanish, telling her story with a laugh and a lesson.",
        "Reyes: 'You wanted to catch cyber-criminals. Today you caught a whole business model. This case won't make the news. It made the neighborhood.'"
      ],
      notes: ["elder-fraud", "wire-recall"],
      tools: []
    }
  ]
},

/* ---------------------------------------------------------- */
{
  id: "m9",
  code: "OPERATION AEGIS",
  title: "Aegis",
  icon: "🛡️",
  difficulty: 5,
  xp: 720,
  track: "core",
  tag: { en: "Everything breaks at once. Hold the line.", es: "Todo se rompe a la vez. Resiste la línea.", ru: "Ломается всё сразу. Держите линию." },
  steps: [
    {
      type: "brief",
      title: "Monday, 07:14 — The Composite Attack",
      body: [
        "You are now Threat Response Commander — the analyst who runs the room. At 07:14, everything you have ever trained for arrives in one hour:",
        "① KOLIBRI ransomware detonates inside the county's utility bill-pay systems (your old friends are back). ② 'COBRA' listings spike: someone is selling 'county utility admin access' — it might be the SAME incident being monetized. ③ A social media amplifier account pushes a Russian-language panic post: 'Всю долину отключат от электричества — деньги из банкоматов забирайте сейчас' ('They'll cut the whole valley's power — take your money out of ATMs now').",
        "Three attacks. One goal: panic. Your job is not to fight everything at once — it's to prioritize life safety, sequence the response, and keep the public informed before the panic does it for you."
      ],
      callout: { style: "sens", label: "THE COMPOSITE PATTERN", text: "Real adversaries increasingly combine technical, financial, and psychological attacks — ransomware plus data-leak threats plus disinformation — because panic causes civilians to make the attacker's job easier (ATM runs, calling infected help desks, sharing panic). Recognizing the PATTERN is commander-level thinking." }
    },
    {
      type: "choice",
      title: "First Priority",
      prompt: "07:20. All three threats are live. What comes FIRST?",
      options: [
        { k: "a", label: "Life safety and continuity: trigger the utility's manual operations, contain the ransomware, get hospitals/911 systems verified isolated from the blast.", correct: true,
          feedback: "Correct. People first, systems second, narrative third. A commander's first hour is triage — everything else gets scheduled, not ignored, just sequenced." },
        { k: "b", label: "Kill the panic post — it's causing ATM runs already.", correct: false,
          feedback: "Important, but second. The post is asking people to protect money from a power cut that ISN'T happening. Contain the real threat and the fake threat loses its fuel." },
        { k: "c", label: "Trace who bought the 'utility access' listing — find the buyer before they act.", correct: false,
          feedback: "Valuable and urgent — but third. The listing is a symptom; the live intrusion is the disease. Hunt it during step two." }
      ]
    },
    {
      type: "multi",
      title: "Assemble the Coalition",
      prompt: "Select every entity that belongs on your bridge call in the first hour. (More than you'd think — and some you'd never expect.)",
      options: [
        { k: "f", label: "FBI field office (criminal + counterintelligence)", why: "The ransomware and the market listing are federal crimes; the FBI brings legal process and decryption intel." },
        { k: "c", label: "CISA (critical infrastructure coordination)", why: "Sector alerts, indicators, and the utility's regulators — in one call." },
        { k: "u", label: "The utility's own OT/IT leads + grid operator", why: "It's their network bleeding. Nobody restores power without them." },
        { k: "h", label: "County emergency management + hospitals", why: "Life-safety continuity: hospitals and 911 must know what's true NOW." },
        { k: "p", label: "Public information officer — bilingual", why: "The panic post is in Russian targeting a diverse valley. The counter-message must reach everyone in THEIR language, fast." },
        { k: "s", label: "Secret Service financial crimes task force", why: "The payment side: ransom negotiations, crypto flows, and the COBRA listing's finances cross into USSS jurisdiction." },
        { k: "z", label: "The panic account's owner, so you can 'talk them down'", why: "No. Influence accounts under adversarial control aren't negotiated with; they're reported to platforms and documented for attribution." }
      ],
      correct: ["f", "c", "u", "h", "p", "s"],
      explain: "Cyber crisis is a team sport: investigators, defenders, operators, medics, communicators, and financial crimes specialists on ONE bridge call. The commander's skill is convening them before hour two."
    },
    {
      type: "choice",
      title: "Public Messaging",
      prompt: "07:48. The panic post has 40,000 shares. The PIO asks what the official message should be. Choose:",
      options: [
        { k: "a", label: "Fast, bilingual, specific: 'Grid operations are normal. Bill systems are isolated and being restored. No action needed. Official updates at county.gov/.alert — and the panic post's claims are FALSE.'", correct: true,
          feedback: "Correct. Truth at the speed of rumor: acknowledge, reassure with specifics, give ONE official channel, and directly flag the false claim. Bilingual because the attack was bilingual — matching the adversary's language is defense, not politics." },
        { k: "b", label: "Say nothing until the investigation concludes — avoid speculation.", correct: false,
          feedback: "The investigation will take weeks; the panic is taking minutes. Silence doesn't avoid speculation, it hands the microphone to the attacker." },
        { k: "c", label: "Downplay: 'nothing is wrong here', even while ransomware burns.", correct: false,
          feedback: "When the truth lands — and it always lands — 'nothing is wrong' becomes its own scandal and every future alert gets ignored. Credibility is infrastructure too." }
      ]
    },
    {
      type: "evidence",
      title: "Lead Triage",
      prompt: "Three leads land on the commander's board at 08:15. Rank them: which do you resource FIRST?",
      items: [
        { id: "a1", name: "Lead A: 911 center backup power shows anomalies", icon: "🚨",
          body: "Backup generator controller for the 911 dispatch center is showing the SAME firmware-push pattern you saw at Substation 7. If 911 goes dark during a crisis day, people die. TALON's fingerprint, possibly. Or a coincidence. Either way it cannot wait." },
        { id: "a2", name: "Lead B: COBRA buyer identified", icon: "🛒",
          body: "The 'utility admin access' listing has a BUYER: wallet linked to a KOLIBRI affiliate. This connects the ransomware and the market listing — one composite operation. Intel gold, but no immediate life threat." },
        { id: "a3", name: "Lead C: panic account traced to a spam farm", icon: "📣",
          body: "The amplifier account posts panic scripts in Russian, Spanish, and English across 3 states. Its hosting provider is cooperative. Platform takedown possible within hours. Important — but not life-safety." }
      ],
      quizPrompt: "Resource priority, first to last?",
      options: [
        { k: "a", label: "A → C → B: life-safety anomaly first, panic-spreader second (fast, cheap kill), financial link third.", correct: true,
          feedback: "Exactly. Commander's triage: protect the thing that kills (911), then the thing that panics (disinfo, and a platform takedown is a 30-minute win), then the thing that pays (financial attribution for the long game)." },
        { k: "b", label: "B → A → C: follow the money, money explains everything.", correct: false,
          feedback: "Money explains the PAST. It doesn't keep 911 on the air. Commanders sequence by consequence, not curiosity." },
        { k: "c", label: "C → B → A: panic is the story the public sees — kill the narrative first.", correct: false,
          feedback: "Narratives cost PR; anomalies cost lives. If the 911 generator gets bricked during the takedown party, the story writes itself — badly." }
      ]
    },
    {
      type: "order",
      title: "The Aegis Sequence",
      prompt: "Write the final battle rhythm — order the response from 07:14 to full recovery.",
      items: [
        { k: "1", label: "Life safety: 911 backup verified; grid to manual ops; hospitals isolated & informed" },
        { k: "2", label: "Contain: segment ransomware; cut utility remote access; preserve evidence" },
        { k: "3", label: "Communicate: bilingual factual updates; one official channel; flag false posts" },
        { k: "4", label: "Coordinate: FBI + CISA + USSS bridge; platform takedown of panic farm" },
        { k: "5", label: "Attribute & follow: link KOLIBRI–COBRA buyer; wallets, warrants, weeks of patience" },
        { k: "6", label: "Restore & harden: rebuild, patch entry vector, drill the next Aegis" }
      ],
      correct: ["1", "2", "3", "4", "5", "6"],
      explain: "Life safety → containment → communication → coordination → attribution → restoration. Say it until it's reflex. It's the same shape as every incident you've ever worked — now at scale."
    },
    {
      type: "debrief",
      title: "Aegis Complete — Graduation",
      body: [
        "The valley keeps its power, its 911, and its calm. The panic post dies at 09:30, platform-takedown confirmed, mirrored by a bilingual county alert with 120,000 views and zero corrections needed.",
        "Eight months later, the KOLIBRI–COBRA buyer — a mid-level affiliate — is arrested at a border crossing because your team never stopped following the wallets. The defense contractor patches. The hospital stays ready. Doña Elena's tellers stop three more withdrawals that same month.",
        "Okafor closes your last academy file: 'Kid, you came in wanting to be the good guy in a bad world. Here's the secret nobody puts on the recruiting poster — the good guys win by being boring, prepared, lawful, and relentless. Every single day. Congratulations, Commander.'"
      ],
      notes: ["ics", "ransomware", "crypto-trace", "mlat"],
      tools: ["scada"]
    }
  ]
}
];

/* ------------------------------------------------------------
   FINAL EXAM POOL — 20 questions; 12 drawn at random
   ------------------------------------------------------------ */
var EXAM_POOL = [
  { q: "First action upon receiving a child-exploitation cyber tip?", opts: ["Contact the suspect to scare him", "Preserve data and escalate to the ICAC task force under legal process", "Post the suspect's photo publicly to warn parents", "Interview the child immediately"], correct: 1,
    why: "Preserve → escalate under legal process. Untrained contact tips offenders, taints evidence, and can entrap. Trained specialists do the rest." },
  { q: "Chain of custody: what comes FIRST with seized media?", opts: ["Hash it", "Photograph/document it as received, then log it", "Boot it to check contents", "Copy it to your workstation"], correct: 1,
    why: "Document → log → hash → copy. The record starts before any technical step." },
  { q: "Why hash evidence (e.g., SHA-256)?", opts: ["To prove a copy is bit-perfect", "To detect lies in interviews", "To encrypt files", "To compress archives"], correct: 0,
    why: "Identical files → identical hashes. It's the integrity backbone of forensic copies." },
  { q: "Phishing header tells: which is the STRONGEST sign of fraud?", opts: ["Formal wording", "Reply-To pointing to an unrelated throwaway domain + SPF fail", "PDF attachment", "Email sent at 9 AM"], correct: 1,
    why: "Headers don't lie like prose does. Mismatched Reply-To and failed authentication are machine-vergable red flags." },
  { q: "Live ransomware response begins with:", opts: ["Pay the ransom", "Power off everything immediately", "Isolate infected segments while keeping safe clinical/safety systems up", "Reformat all servers"], correct: 2,
    why: "Contain without amputation: segmentation protects life-safety systems while cutting attacker paths. Wiping also destroys evidence." },
  { q: "The professional position on paying ransomware crews:", opts: ["Always pay fast", "Negotiate hard then pay", "Don't pay: report (FBI/CISA), restore from verified offline backups, screen for OFAC sanctions", "Pay only in privacy coins"], correct: 2,
    why: "Payment funds crime, may violate sanctions, guarantees nothing, and doesn't return stolen data." },
  { q: "'3-2-1' backups mean:", opts: ["3 antivirus tools, 2 firewalls, 1 IT staff", "3 copies, 2 media types, 1 offline/offsite", "3 days, 2 hours, 1 minute RTO", "3 users, 2 admins, 1 owner"], correct: 1,
    why: "The offline copy is what defeats ransomware's 'we encrypted your backups too' bluff." },
  { q: "Static analysis is:", opts: ["Running malware in a sandbox", "Examining a specimen without executing it", "Monitoring network traffic", "Photographing devices"], correct: 1,
    why: "Static = no execution (hashes, strings, structure). Dynamic = execute in isolation and observe." },
  { q: "Which is a STRONG indicator of compromise (IOC)?", opts: ["File size 412 KB", "User is new at the company", "SHA-256 hash + C2 domain + 60s beacon pattern", "Email written in Spanish"], correct: 2,
    why: "Precise, machine-readable, behavioral indicators hunt. Sizes and demographics don't." },
  { q: "A soldier posts geotagged gym runs and a deployment countdown. Biggest risk?", opts: ["Embarrassment", "Ads", "Adversaries reconstruct base location and deployment timeline", "Slow phone"], correct: 2,
    why: "Geotag + schedule = operational readiness intelligence. This is how honeytraps and targeting start." },
  { q: "You confirm a honeytrap targeting a service member. You:", opts: ["Confront the persona publicly", "Hand it to counterintelligence; brief the member; let CI control the channel", "Block the account immediately everywhere", "Pose as the soldier to unmask the handler"], correct: 1,
    why: "Controlled engagement maps networks; freelancing burns them." },
  { q: "In ICS/OT environments, the FIRST priority is:", opts: ["Confidentiality of schematics", "Availability and human safety", "Aesthetic dashboards", "Email continuity"], correct: 1,
    why: "You can't reboot a substation carrying a city. OT plays by life-safety physics." },
  { q: "An 'EMP-style' grid attack via cyber means works by:", opts: ["Deleting Facebook pages", "Coordinated remote breaker tripping across substations causing cascade", "Sending angry emails", "Melting wires with lasers"], correct: 1,
    why: "Ukraine 2015/2016 proved keyboards can blackout regions. Defense: remote-access control, signed firmware, manual-operation drills." },
  { q: "Best anti-honeytrap defense for service members:", opts: ["Better pickup lines", "OPSEC: no geotags, no countdowns, report suspicious contacts to CI", "A second burner phone", "Using a VPN"], correct: 1,
    why: "Deny collection first; report second. Never engage adversary personas yourself." },
  { q: "Spanish-language 'government agent' scam script red flags:", opts: ["Polite greeting in Spanish", "Uses victim's full name", "Urgency + cash courier pickup + enforced secrecy", "Formal vocabulary"], correct: 2,
    why: "No real agency collects cash door-to-door or forbids you to tell family. Urgency+cash+secrecy = scam." },
  { q: "A fraud victim wired money 9 hours ago. Best move:", opts: ["Nothing — it's gone", "Call the bank NOW for freeze/recall + police intercept the courier", "Wait 72 hours to see", "Post the scammer's number online"], correct: 1,
    why: "Wire recall windows are hours, not days. Speed is the rescue." },
  { q: "Crypto tracing works because:", opts: ["Bitcoin is anonymous", "Blockchains are public ledgers and exchanges enforce KYC — trails end at named humans", "Police can edit the blockchain", "Mixers delete history"], correct: 1,
    why: "Clustering + exchange KYC + MLAT = real names behind wallets. Mixers slow, never erase." },
  { q: "Undercover cyber analyst receives an offer to buy weapons-adjacent access beyond the operation plan:", opts: ["Buy it — bigger case", "Decline, break contact per protocol, document for the case agent", "Negotiate for weeks", "Tip off the vendor"], correct: 1,
    why: "Bright lines exist so investigators never facilitate real-world harm. New leads go up the chain, never into your wallet." },
  { q: "A trauma-informed child victim interview means:", opts: ["Many interviews to verify consistency", "One recorded forensic interview at a Child Advocacy Center by a trained specialist", "Interview at the suspect's home", "Let the press ask her"], correct: 1,
    why: "The CAC model: once, recorded, specialist-led. Repeated or leading interviews re-traumatize and taint testimony." },
  { q: "During an incident, official public messaging should be:", opts: ["Silent until the investigation ends", "Fast, factual, bilingual, one official channel, flag false claims", "Optimistic downplaying", "Technical jargon only"], correct: 1,
    why: "Truth at the speed of rumor, in the languages the audience speaks. Panic fills silence." }
];
