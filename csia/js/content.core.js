/* ============================================================
   Cyber Aware - content.core.js
   Core track: the training every employee completes.
   ============================================================ */
(function (CY) {
  'use strict';

  var PHISH_DEMO = { emails: [
    { from: 'IT Service Desk', address: 'it-support@company-helpdesk.com', subject: 'Your mailbox is full \u2014 click to expand',
      body: 'Your mailbox has exceeded its limit. <b>Click below to restore access</b> or incoming mail will be blocked.',
      link: { text: 'https://company-helpdesk.com/expand' },
      hotspots: [
        { key: 'from', where: 'the sender address', text: 'Not our organisation&#8217;s domain &mdash; it is **company-helpdesk.com**.' },
        { key: 'link', where: 'the link', text: 'Points to an unrelated site, not our IT portal.' }
      ] },
    { from: 'Procurement Team', address: 'procurement@ourcompany.com', subject: 'Purchase order confirmed',
      body: 'Thanks &mdash; your order is confirmed. Details are on the intranet as usual. No action needed.',
      hotspots: [] },
    { from: 'IT Admin', address: 'it-admin@micros0ft-support.net', subject: 'Re-validate your account now',
      body: 'Unusual activity was detected. You must re-validate your account within 2 hours.',
      link: { text: 'http://micros0ft-support.net/validate' },
      hotspots: [
        { key: 'from', where: 'the sender address', text: 'A lookalike domain &mdash; note the **0** instead of an o.' },
        { key: 'link', where: 'the link', text: 'Plain **http** and an unrelated domain.' }
      ] }
  ] };

  var CLASSIFY_DEMO = { items: [
    { text: 'The company&#8217;s published privacy policy', answer: 'Public', why: 'Written to be shared publicly.' },
    { text: 'The internal meeting notes', answer: 'Internal', why: 'Fine inside the company, not for outsiders.' },
    { text: 'A signed customer contract', answer: 'Confidential', why: 'Commercially sensitive and customer-specific.' },
    { text: 'A list of employee passport numbers', answer: 'Restricted', why: 'Highly sensitive personal data, legally protected.' }
  ] };

  CY.track({
    id: 'core', name: 'Core Training', icon: '&#128737;', color: '#38bdf8', audience: 'core',
    blurb: 'The essentials every employee needs. ~35&ndash;45 minutes, start to finish.',
    modules: [

      /* ---------------- 1 ---------------- */
      {
        id: 'why', title: 'Why security is everyone&#8217;s job', minutes: 4,
        lesson: {
          hook: 'Most breaches do not start with genius hacking. They start with an ordinary person having an ordinary day.',
          blocks: [
            ['p', 'You are the target. Attackers rarely break down the front door &mdash; they ask a friendly-looking email to be let in. Around **90% of successful attacks start with a human**, not a machine.'],
            ['viz', 'ciatriad'],
            ['p', 'Security protects three things, known as the **CIA triad**:'],
            ['list', ['**Confidentiality** &mdash; only the right people can see the data.', '**Integrity** &mdash; the data is correct and has not been tampered with.', '**Availability** &mdash; the systems and data are there when you need them.']],
            ['p', 'The most common ways real organisations get hit:'],
            ['list', ['**Phishing** and social engineering (by far the most common).', '**Stolen or weak passwords** and missing multi-factor authentication.', '**Unpatched software** with known holes.', '**Ransomware** encrypting files and demanding payment.', '**Data leaks** from sharing too widely or losing a device.']],
            ['note', 'Nobody expects you to be a security engineer. You are expected to do three things brilliantly: **spot it, avoid it, report it.** Everything in this training builds those habits.'],
            ['do', ['Pause before you click, reply, or share.', 'Treat urgent requests as suspicious by default.', 'Report anything odd &mdash; early reports are cheap, late ones are not.']]
          ]
        },
        activity: {
          kind: 'quiz', pass: 70,
          questions: [
            { q: 'What does the "Availability" part of the CIA triad protect?', options: ['That data is secret', 'That data is accurate', 'That systems and data are accessible when needed', 'That data is encrypted'], a: 2, why: 'Availability means the service and data are there when people need them &mdash; what ransomware destroys.' },
            { q: 'What is the most common way attackers get into organisations?', options: ['Physical break-in', 'Phishing and social engineering', 'Guessing the Wi-Fi password', 'Bribing staff'], a: 1, why: 'Human-targeted attacks (phishing, social engineering) dominate because they bypass technology.' },
            { q: 'Which is a realistic "attack" on Integrity?', options: ['Someone reads a private file', 'An invoice is altered to change a bank account number', 'The server goes offline', 'A laptop is lost'], a: 1, why: 'Changing data so it is wrong is an integrity attack.' }
          ]
        }
      },

      /* ---------------- 2 ---------------- */
      {
        id: 'passwords', title: 'Passwords &amp; passphrases', minutes: 5,
        lesson: {
          hook: 'Weak passwords are the front-door key left under the mat. Strong ones are free to create.',
          blocks: [
            ['p', 'Attackers do not sit and guess. They use tools that try **billions of combinations per second** against stolen password databases. What matters is **length** and **unpredictability**.'],
            ['viz', 'passwordlab'],
            ['p', 'The best password is a **passphrase**: three or four random words. It is long, memorable, and hard to crack.'],
            ['table', { head: ['Password', 'Why it fails'], rows: [
              ['Summer2024!', 'Predictable pattern + a year + a common word'],
              ['P@ssw0rd', 'A known password with letter-for-symbol swaps (tools know these)'],
              ['Company name', 'Trivially guessable from context'],
              ['orange-ladder-7-piano', 'Long, random, easy to remember &mdash; this is what to do']
            ] }],
            ['do', ['Use a passphrase of 3&ndash;4 random words, or 16+ mixed characters.', 'Use a **password manager** so you never reuse a password.', 'Never reuse your work password on other sites.', 'Turn on MFA wherever it is offered (next module).']],
            ['dont', ['Do not use names, birthdays, teams, or the word "password".', 'Do not reuse the same password across sites.', 'Do not share passwords &mdash; even with IT.', 'Do not store passwords in a plain note or spreadsheet.']],
            ['note', 'A data breach on some shopping site leaks the password you used there. If you reused it at work, it is now a work break-in. **Reuse is the real danger.**']
          ]
        },
        activity: {
          kind: 'password', minScore: 3,
          prompt: 'Create a strong passphrase you would actually use. It must reach "Strong" or better, be 12+ characters and not be a common password.',
          start: ''
        }
      },

      /* ---------------- 3 ---------------- */
      {
        id: 'mfa', title: 'Accounts &amp; multi-factor authentication', minutes: 4,
        lesson: {
          hook: 'MFA turns a stolen password from a break-in into a dead end.',
          blocks: [
            ['p', '**Multi-factor authentication (MFA)** asks for something you **know** (password) plus something you **have** (a phone, an app, a hardware key) or **are** (fingerprint).'],
            ['viz', 'mfademo'],
            ['p', 'Why it matters: attackers can steal a password from a breach, a phishing page, or a re-used site &mdash; but they usually cannot produce your second factor.'],
            ['table', { head: ['Second factor', 'Strength'], rows: [
              ['Hardware key (FIDO2 / passkey)', 'Strongest &mdash; phishing-resistant'],
              ['Authenticator app (TOTP)', 'Strong'],
              ['SMS code', 'Better than nothing, but can be SIM-swapped or intercepted'],
              ['Email code', 'Weak &mdash; often the same channel being attacked']
            ] }],
            ['warn', 'Watch for **MFA fatigue**: attackers who already have your password spam approval prompts hoping you tap "Approve". Never approve a login you did not start &mdash; report it instead.'],
            ['do', ['Turn on MFA for every work account &mdash; and your personal email and bank.', 'Prefer an authenticator app or hardware key over SMS.', 'Never approve an unexpected login prompt.']]
          ]
        },
        activity: {
          kind: 'quiz', pass: 70,
          questions: [
            { q: 'What does MFA add to a password?', options: ['A longer password', 'A second, independent proof of who you are', 'A backup password', 'A security question'], a: 1, why: 'Two independent factors &mdash; a stolen password alone is not enough.' },
            { q: 'Which second factor is strongest?', options: ['SMS code', 'Email code', 'A hardware security key / passkey', 'Your mother&#8217;s maiden name'], a: 2, why: 'Hardware keys and passkeys are phishing-resistant because the secret never leaves the device.' },
            { q: 'You get repeated MFA approval prompts you did not start. You should…', options: ['Approve one to stop them', 'Ignore and report it &mdash; someone has your password', 'Change your phone number', 'Turn MFA off'], a: 1, why: 'That is MFA fatigue. Report it and change your password; never approve.' }
          ]
        }
      },

      /* ---------------- 4 ---------------- */
      {
        id: 'phishing', title: 'Phishing &amp; social engineering', minutes: 6,
        lesson: {
          hook: 'The craftiest attacks look completely ordinary. Your job is a two-second pause and a suspicious eye.',
          blocks: [
            ['p', '**Phishing** is a message pretending to be someone you trust, designed to make you click, log in, pay, or share. It arrives by email, text (smishing), chat, or phone (vishing).'],
            ['p', 'The four red-flag families: **pressure**, **pretence**, **payload**, and **mismatch**.'],
            ['list', ['**Pressure** &mdash; urgency, threats, a deadline, secrecy.', '**Pretence** &mdash; a familiar brand, a boss, a colleague, a supplier.', '**Payload** &mdash; a link, an attachment, a payment request, a login.', '**Mismatch** &mdash; the sender address, link, grammar, or tone is subtly off.']],
            ['viz', 'phishinbox', PHISH_DEMO],
            ['p', 'The classic **CEO fraud**: an urgent, confidential request from the boss to pay a supplier or buy gift cards. The tone of authority is the whole trick.'],
            ['do', ['Check the **real sender address**, not the display name.', 'Read the **real link destination** before clicking (hover or long-press).', 'Verify unusual requests through a **separate, known channel** (a phone number you trust).', '**Report** suspicious messages &mdash; every report protects colleagues.']],
            ['dont', ['Do not click links or open unexpected attachments.', 'Do not let urgency rush you.', 'Do not reply, even to "unsubscribe" &mdash; that confirms your address.', 'Do not trust a familiar name or logo alone.']],
            ['danger', 'If you entered credentials on a phishing page: **change the password immediately**, turn on MFA if it is off, and report it. Speed is everything &mdash; minutes matter.']
          ]
        },
        activity: {
          kind: 'phish', pass: 80,
          prompt: 'Triage this inbox. For each message, decide whether to report it as phishing or trust it.',
          emails: [
            {
              from: 'IT Service Desk', address: 'it-helpdesk@company-mail-secure.com',
              subject: 'Action required: mailbox quota exceeded (48 hours)',
              body: 'Your mailbox has exceeded its storage limit. You must re-validate your account within 48 hours or incoming email will be blocked. <b>Click below to restore access.</b>',
              link: { text: 'https://company-mail-secure.com/restore' }, verdict: 'phish',
              why: 'A lookalike domain, a threat, and a deadline &mdash; all three classic pressure tactics.',
              flags: ['Sender domain is **company-mail-secure.com**, not our organisation.', 'Manufactured urgency ("48 hours").', 'Link goes to an unrelated host.']
            },
            {
              from: 'Accounts Payable', address: 'ap@ourcompany.com',
              subject: 'Reminder: internal policy update (no action needed)',
              body: 'This is an informational reminder that our travel expense policy was updated. No action is required. You can find the policy on the intranet.',
              verdict: 'safe',
              why: 'Correct internal domain, no link, no request, no urgency. Legitimate notices look like this.',
              flags: []
            },
            {
              from: 'Sarah Chen (CEO)', address: 'sarah.chen.ceo@gmail.com',
              subject: 'Quick confidential request',
              body: 'I am in back-to-back meetings and cannot talk. I need you to arrange payment to a new supplier today. Please keep this confidential. Reply for the details.',
              verdict: 'phish',
              why: 'Classic CEO fraud: personal email, secrecy, urgency, and a payment request.',
              flags: ['Free personal email for the CEO.', 'Asks for secrecy and speed.', 'Wants money moved &mdash; verify by phone.']
            },
            {
              from: 'HR Benefits Team', address: 'hr@ourcompany.com',
              subject: 'Your payslip is available',
              body: 'Your monthly payslip is now available in the HR portal you normally use. Log in via the portal in your bookmarks.',
              verdict: 'safe',
              why: 'Internal domain, no external link pushed, and it points you at a destination you already use.',
              flags: []
            }
          ]
        }
      },

      /* ---------------- 5 ---------------- */
      {
        id: 'social', title: 'Beyond email: vishing, pretexting &amp; deepfakes', minutes: 4,
        lesson: {
          hook: 'Attackers now call, text, and even clone voices. The defence is the same: verify, then act.',
          blocks: [
            ['list', ['**Vishing** &mdash; a phone call pretending to be IT, your bank, or a supplier.', '**Smishing** &mdash; a text with a link or a fake delivery notice.', '**Pretexting** &mdash; a made-up scenario to gain your trust or information.', '**Tailgating** &mdash; following you through a secure door with full hands.', '**Deepfakes** &mdash; cloned voices or video of someone you trust, asking for money or access.']],
            ['note', 'The phone is powerful because it feels personal and urgent, and there is no obvious "sender address" to check. Attackers count on you being polite.'],
            ['do', ['Verify identity through an **independent channel** &mdash; hang up and call back on a number you trust.', 'Be willing to say "I need to verify this before I proceed."', 'Challenge unexpected visitors &mdash; ask them to be escorted.', 'Treat "I am in a hurry, don&#8217;t verify" as an attack.']],
            ['tip', 'A deepfaked voice is convincing but cannot answer a question only the real person would know &mdash; or hop onto a video call you initiate. **Verify out-of-band.**']
          ]
        },
        activity: {
          kind: 'scenario', pass: 1, title: 'The urgent phone call',
          start: 'n1',
          nodes: {
            n1: { text: 'Your phone rings. The caller ID shows your IT department. "Hi, this is Dave from IT. We are seeing a virus on your laptop &mdash; I need to remote in right now to clean it. What is your login so I can fix it fast?"', options: [
              { label: 'Give Dave your username and password &mdash; IT can be trusted, right?', score: 0, outcome: { text: '&#128678; You just handed over your credentials. Real IT never needs your password. The attacker now has full access.', good: false } },
              { label: 'Say you will hang up and call the IT helpdesk on the number from the intranet to confirm.', score: 2, next: 'n2' },
              { label: 'Refuse and hang up immediately without saying anything.', score: 1, outcome: { text: 'Better &mdash; you did not hand anything over. But reporting it would protect your colleagues from the same call.', good: true } }
            ] },
            n2: { text: 'You call the real helpdesk. They confirm there is **no** ticket for your laptop and Dave does not work there. What now?', options: [
              { label: 'Report the call to the security team and move on.', score: 2, outcome: { text: '&#10003; Perfect. You verified out-of-band, avoided the trap, and reported it &mdash; protecting everyone else who gets the same call.', good: true } },
              { label: 'Call Dave back to give him a piece of your mind.', score: 0, outcome: { text: '&#9888;&#65039; Calling the attacker back reveals more information and wastes time. Report it instead.', good: false } }
            ] }
          }
        }
      },

      /* ---------------- 6 ---------------- */
      {
        id: 'browsing', title: 'Safe browsing, malware &amp; ransomware', minutes: 5,
        lesson: {
          hook: 'One click on the wrong thing can install software that locks every file you touch.',
          blocks: [
            ['p', '**Malware** is software designed to harm: viruses, spyware, keyloggers, and **ransomware**, which encrypts your files and demands payment.'],
            ['p', 'Most malware arrives by tricking you: a fake update, a "invoice.pdf.exe", a browser pop-up, a pirated download, or a malicious ad.'],
            ['viz', 'linkinspector'],
            ['p', 'When you open a page, the address bar tells the truth even when the page lies. Read the domain **just before the first single slash**.'],
            ['do', ['Only install software from official or approved sources.', 'Keep your OS, browser, and apps updated &mdash; updates patch attacks.', 'Keep work files in the approved cloud storage so they are backed up.', 'Report unexpected pop-ups, toolbars, or slow-downs to IT.']],
            ['dont', ['Do not install browser extensions or "cleaners" you did not ask for.', 'Do not enable macros in a document you did not expect.', 'Do not plug in found USB drives.', 'Do not disable anti-virus or firewalls to "make something work".']],
            ['danger', 'If you open a ransomware note: **do not pay, do not panic, and disconnect from the network.** Report immediately &mdash; fast isolation limits the spread.']
          ]
        },
        activity: {
          kind: 'pick', pass: 100,
          prompt: 'Tick every situation that should make you stop and report it.',
          items: [
            { text: 'A pop-up says your antivirus is out of date and to "click here to scan now".', correct: true, why: 'Fake update pop-ups are a top malware trick. Update through the real app.' },
            { text: 'An email attachment named `Invoice_2024.pdf.exe`.', correct: true, why: 'A double extension hides an executable. Never open it.' },
            { text: 'A document from a known colleague that you were expecting, asking you to enable macros.', correct: false, why: 'Expected and from a trusted source is normal &mdash; but if macros are unusual, ask first.' },
            { text: 'A USB stick labelled "Payroll" left in the car park.', correct: true, why: 'Never plug in found drives &mdash; hand them to security.' },
            { text: 'Your browser homepage changed by itself and there is a new toolbar.', correct: true, why: 'That is a sign of unwanted software. Report it to IT.' },
            { text: 'A software "crack" from a forum that unlocks a paid tool for free.', correct: true, why: 'Pirated software is a classic malware delivery route.' }
          ]
        }
      },

      /* ---------------- 7 ---------------- */
      {
        id: 'data', title: 'Protecting data &amp; privacy', minutes: 5,
        lesson: {
          hook: 'Data is the thing attackers actually want. How you store and share it is the last line of defence.',
          blocks: [
            ['p', 'Not all information is equal. Most organisations classify it, and the label decides how you may handle it.'],
            ['viz', 'classify', CLASSIFY_DEMO],
            ['table', { head: ['Class', 'Examples', 'Handling'], rows: [
              ['Public', 'Marketing, published policies', 'Can be shared freely'],
              ['Internal', 'Meeting notes, org charts', 'Keep inside the company'],
              ['Confidential', 'Customer data, contracts, source code', 'Need-to-know, approved systems only'],
              ['Restricted', 'Credentials, health/payment data, M&A', 'Strictly controlled, often legally regulated']
            ] }],
            ['p', '**Personal data** (names, addresses, ID numbers, health details) is protected by law such as GDPR/HIPAA. A leak is not just embarrassing &mdash; it can be a reportable breach with fines.'],
            ['do', ['Store and share work data only in approved, company-managed systems.', 'Share on a **need-to-know** basis &mdash; not "everyone in the building".', 'Check a file&#8217;s classification before you send it externally.', 'Lock your screen when you step away.']],
            ['dont', ['Do not email work data to your personal account to "work from home".', 'Do not use personal cloud storage or USB drives for confidential data.', 'Do not paste confidential data into public AI/chat tools.', 'Do not leave printed documents on desks or printers.']],
            ['note', 'The simplest test before sharing: **"Does this person genuinely need this, and am I using an approved system?"** If the answer is fuzzy, ask.']
          ]
        },
        activity: {
          kind: 'pick', pass: 100,
          prompt: 'Tick every action that would be a data-protection problem.',
          items: [
            { text: 'Emailing a customer list to your personal Gmail so you can work tonight.', correct: true, why: 'Confidential/personal data left the approved systems. A breach waiting to happen.' },
            { text: 'Sharing a public marketing brochure with a partner.', correct: false, why: 'Public data &mdash; that is exactly what it is for.' },
            { text: 'Pasting a spreadsheet of employee salaries into a public AI chatbot to summarise it.', correct: true, why: 'Confidential data into a public tool &mdash; it may be stored or reused.' },
            { text: 'Leaving a printed contract on the office printer for a colleague to collect later.', correct: true, why: 'Printed confidential data left unattended can be read or taken.' },
            { text: 'Using the company file-sharing link with the right permissions for a project team.', correct: false, why: 'Approved system, need-to-know audience &mdash; good practice.' },
            { text: 'Accessing a shared folder of HR records "just to have a look".', correct: true, why: 'Accessing data you do not need breaks need-to-know and least privilege.' }
          ]
        }
      },

      /* ---------------- 8 ---------------- */
      {
        id: 'device', title: 'Devices, networks &amp; remote work', minutes: 5,
        lesson: {
          hook: 'Your laptop, phone, and Wi-Fi are all doors. Keep them locked and know which ones are safe.',
          blocks: [
            ['p', 'Security follows you home. Working from a café, a hotel, or a train changes the risks &mdash; not the rules.'],
            ['viz', 'wifi'],
            ['do', ['Lock your screen every time you step away (Win+L / Ctrl+Cmd+Q).', 'Keep your OS, browser, and apps updated automatically.', 'Use the company VPN on untrusted networks.', 'Use disk encryption (usually on by default) and a screen lock / biometrics on every device.', 'Report a lost or stolen device **immediately** &mdash; it can be wiped remotely.']],
            ['dont', ['Do not use personal devices for work data unless BYOD is approved.', 'Do not disable the firewall, VPN, or antivirus.', 'Do not install unapproved "shadow IT" apps for work.', 'Do not leave a device visible in a car or unattended in public.']],
            ['note', '**Shadow IT** &mdash; using tools the company has not approved &mdash; is a growing risk. Convenience today can be a breach tomorrow. If you need a tool, ask IT.'],
            ['tip', 'Physical security is security too: lock your room, do not hold doors for strangers without a badge, and challenge anyone who is somewhere they should not be.']
          ]
        },
        activity: {
          kind: 'quiz', pass: 70,
          questions: [
            { q: 'You must join a work call from a hotel. The safest option is…', options: ['The open hotel Wi-Fi', 'Hotel Wi-Fi with the company VPN, or your phone hotspot', 'Any Wi-Fi, it does not matter', 'Ask a stranger for theirs'], a: 1, why: 'A VPN (or your own hotspot) protects you from others on the network.' },
            { q: 'You left your work laptop on a train. The first thing to do is…', options: ['Wait to see if it turns up', 'Report it immediately so it can be wiped and access revoked', 'Change your desktop wallpaper', 'Buy a new one'], a: 1, why: 'Fast reporting lets IT lock the account and remote-wipe the device.' },
            { q: 'Why is "shadow IT" risky?', options: ['It costs more', 'Unapproved tools may not meet security or privacy standards', 'It slows the network', 'It is illegal'], a: 1, why: 'If the company has not vetted it, your data may be unprotected or shared.' }
          ]
        }
      },

      /* ---------------- 9 ---------------- */
      {
        id: 'incident', title: 'If something happens: report &amp; respond', minutes: 4,
        lesson: {
          hook: 'Mistakes happen. What separates a small incident from a disaster is how fast you report it.',
          blocks: [
            ['p', 'You clicked a link. You sent data to the wrong person. You lost a device. Do not hide it &mdash; **the clock is the enemy**.'],
            ['viz', 'irflow'],
            ['p', 'What good looks like when you spot a problem:'],
            ['list', ['**Report immediately** to the security team / IT helpdesk &mdash; even if you are not sure.', '**Contain** if you can: disconnect from the network, do not keep using the machine.', '**Preserve** evidence: do not delete the email or power off &mdash; that destroys clues.', '**Change passwords** from a **different, trusted** device if you may have been compromised.']],
            ['warn', '**Never** try to fix it quietly, and never accept "let us keep it between us". Insecurity thrives in silence. Reporting is always the right call and is never punished.'],
            ['tip', 'Save the security contact in your phone now, while everything is calm. You will not have time to look it up during an incident.']
          ]
        },
        activity: {
          kind: 'order', pass: 100,
          prompt: 'You realise you just entered your work password on a suspicious page. Put the steps in the right order.',
          steps: [
            'Stop and do not enter anything else on that page',
            'Disconnect from the network if you suspect malware',
            'Change your password from a trusted device',
            'Report it to the security team straight away',
            'Watch for suspicious activity and follow IT&#8217;s guidance'
          ],
          why: 'Speed matters. Report first, and never hide it &mdash; the team can contain the damage much faster when they know.'
        }
      },

      /* ---------------- 10 ---------------- */
      {
        id: 'policy', title: 'Policies, acceptable use &amp; insider risk', minutes: 4,
        lesson: {
          hook: 'Policies are the company&#8217;s rules of the road &mdash; they exist so you never have to guess.',
          blocks: [
            ['p', 'Most organisations expect you to follow a handful of policies. Know that they exist and where to find them.'],
            ['list', ['**Acceptable Use** &mdash; what you may and may not do with company systems.', '**Data Protection / Privacy** &mdash; how personal data must be handled (GDPR, HIPAA, etc.).', '**Clean Desk & Screen Lock** &mdash; do not leave sensitive material where others can see it.', '**BYOD** &mdash; whether you may use personal devices, and the rules if so.', '**Incident Reporting** &mdash; how and where to report.']],
            ['p', '**Insider risk** is not only malicious. It is also well-meaning people who overshare, use unapproved tools, or ignore policy because they are busy. Both cause real breaches.'],
            ['table', { head: ['Situation', 'Right move'], rows: [
              ['You are asked to share data you are unsure about', 'Check classification; ask the data owner'],
              ['A colleague asks for your login "just this once"', 'Never share logins &mdash; request access properly'],
              ['You are leaving the company', 'Return devices and data, no personal copies'],
              ['A regulation-heavy request (health/payment data)', 'Follow the policy and involve compliance']
            ] }],
            ['note', 'Compliance is not paperwork for its own sake. GDPR, HIPAA, and PCI exist because mishandled data harms real people. Your habits are how the rules actually hold.']
          ]
        },
        activity: {
          kind: 'quiz', pass: 70,
          questions: [
            { q: 'A colleague asks to borrow your login "just for five minutes". You should…', options: ['Share it, they are trusted', 'Refuse and help them get their own access', 'Share it then change it', 'Write it down for them'], a: 1, why: 'Accounts are personal. Sharing breaks accountability and policy &mdash; request proper access instead.' },
            { q: 'Insider risk includes…', options: ['Only malicious employees', 'Also well-meaning staff who overshare or use unapproved tools', 'Only external attackers', 'Only after you leave'], a: 1, why: 'Accidental insider risk is often the bigger problem.' },
            { q: 'Handling data covered by HIPAA/GDPR correctly is…', options: ['Optional', 'The responsibility of the compliance team only', 'Everyone&#8217;s responsibility through good daily habits', 'Only for IT'], a: 2, why: 'Rules only work if daily habits follow them.' }
          ]
        }
      }
    ]
  });
})(window.CY);
