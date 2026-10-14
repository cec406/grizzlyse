# Cyber Aware

**Free, practical cybersecurity & information-assurance (IA) awareness training for employees** — the kind people actually finish, and sometimes enjoy.

No install, no sign-up, no server, no data leaves the browser. **Double-click `index.html` and start.**

It is a short, self-paced course: learn a bit, do something interactive, prove it, get a
certificate. The **core track takes about 45 minutes**; an optional **technical track** goes
deeper for IT, engineering and security-minded staff.

---

## Who it is for

- **Every employee** completes the **Core Training** track (10 short modules).
- **IT / engineering / technical staff** continue into the **Advanced / Technical** track.
- A manager can hand over the link and get back a printable certificate of completion.

## The training plan

1. **Core modules** — read a short module, then complete its activity.
2. **Final assessment** — 15 questions across everything; **80% to pass** (retake freely).
3. **Certificate** — unlocked once the core modules are done and the assessment is passed.

Progress and the learner's name are stored **only in the browser** (and can be exported/imported
as JSON).

## Modules

### Core Training (everyone)
| Module | You'll learn |
| --- | --- |
| **Why security is everyone's job** | The CIA triad, the real threat landscape, and your three jobs: spot it, avoid it, report it. |
| **Passwords & passphrases** | Why length beats complexity, passphrases, password managers, and the danger of reuse. |
| **Accounts & MFA** | Multi-factor authentication, factor strength, and the "MFA fatigue" attack. |
| **Phishing & social engineering** | Red-flag families, CEO fraud, lookalike domains, and how to report. |
| **Beyond email** | Vishing, smishing, pretexting, tailgating, and deepfakes — verify out-of-band. |
| **Safe browsing, malware & ransomware** | Fake updates, malicious attachments and links, USB drops, and what to do. |
| **Protecting data & privacy** | Classification (Public → Restricted), personal data law, safe sharing, clean desk. |
| **Devices, networks & remote work** | Screen locks, patching, public Wi-Fi and VPNs, lost devices, shadow IT. |
| **If something happens** | Incident response: report fast, contain, preserve evidence, never hide it. |
| **Policies, acceptable use & insider risk** | The policies to know, need-to-know access, and accidental insider risk. |

### Advanced / Technical
Cryptography essentials · Identity, access & zero trust · Cloud & container security ·
Secure development & OWASP basics · Vulnerabilities, patching & threat intel · Detection & response.

## Interactive tools (the fun part)

Every module has an interactive visual, and there is a **Tool box** of standalone playgrounds:

- **Password lab** — type a password and watch a live crack-time estimate.
- **Phishing inbox** — open emails and click the sender, link or attachment to reveal red flags.
- **Link inspector** — the text is not where it goes; find the real destination.
- **MFA demo** — toggle "attacker has your password" and see MFA save you.
- **Hash vs encryption** — one is reversible, one is not.
- **Public Wi-Fi / MITM** — what an attacker on the network can actually see.
- **Data classification sorter** — label data Public → Restricted.
- **Injection demo** (technical) — watch string concatenation become an attack, and parameters stop it.
- **Attack chain** (technical) — how attackers move from initial access to impact.

## Activity types

`quiz` (multiple choice with explanations) · `pick` (spot everything that is a red flag) ·
`order` (sequence the steps) · `match` (terms to meanings) · `scenario` (branching decisions
with consequences) · `password` (build a strong passphrase) · `phish` (triage an inbox).

## How this maps to CompTIA Security+

This is **awareness training, not a certification course** — but every module reinforces the
same foundational knowledge tested in Security+. Each module is tagged with the SY0-701 domain
it touches, and the training page shows the coverage:

| Domain | What the course covers | Modules |
| --- | --- | --- |
| **1 · General Security Concepts** | CIA triad, authentication, MFA, cryptography, hashing | 6 |
| **2 · Threats, Vulnerabilities & Mitigations** | Phishing, social engineering, malware, ransomware, injection | 5 |
| **3 · Security Architecture** | Devices, remote work, cloud & containers, secure design | 4 |
| **4 · Security Operations** | Incident response, detection, monitoring, reporting | 5 |
| **5 · Program Management & Oversight** | Policies, acceptable use, privacy law, insider risk | 3 |

## The completion certificate

After finishing the core modules and passing the assessment, the learner gets a **printable
completion certificate** with their name, the date, their score, modules completed, and a
reference code. It prints cleanly on A4 (or "Save as PDF"). It is deliberately labelled as an
**unofficial completion record** — useful for personal and organisational training, not an
accredited certification.

---

## Running & tests

```bash
# just open index.html in a browser, or:
node tools/selftest.js           # content + logic validation (no dependencies)
npm install && npm run test:ui   # optional: drives the whole UI in jsdom
```

`selftest.js` validates every module's lesson, every activity definition, the assessment bank,
password-strength logic and certificate eligibility.

`uitest.js` boots the real UI, completes onboarding, renders **all 16 modules**, solves
**every activity type**, passes the assessment at 100%, and checks the certificate and all
nine tools render — end to end.

---

## Project layout

```
csia/
├─ index.html            # loads everything; open this
├─ styles.css            # dark, friendly theme (+ print styles for the certificate)
├─ package.json          # only for the optional dev tests
├─ js/
│  ├─ util.js            # DOM/storage/formatting + password-strength logic
│  ├─ state.js           # name, XP, module progress, assessment, badges, certificate
│  ├─ widgets.js         # interactive visual components
│  ├─ activities.js      # quiz / pick / order / match / scenario / password / phish engine
│  ├─ content.js         # registry, lesson-block renderer, final assessment bank
│  ├─ content.core.js    # the 10 core modules
│  ├─ content.advanced.js# the 6 technical modules
│  ├─ ui.js              # router, views, module runner, tools, certificate
│  └─ app.js             # boot
└─ tools/
   ├─ selftest.js
   └─ uitest.js
```

### Adding a module

Add an entry to a track in `js/content.core.js` (or `content.advanced.js`):

```js
{
  id: 'my-module', title: 'My module', minutes: 4,
  lesson: { hook: 'One sentence on why this matters.',
    blocks: [
      ['p', 'A paragraph with `inline code`.'],
      ['list', ['**bold** point', 'another']],
      ['do', ['Do this', 'And this']],
      ['dont', ['Not this']],
      ['viz', 'passwordlab']          // any widget name
    ] },
  activity: { kind: 'quiz', questions: [{ q: '?', options: ['a','b','c'], a: 1, why: 'Because…' }] }
}
```

Lesson blocks: `p`, `list`, `note`, `warn`, `tip`, `danger`, `code`, `table`, `email`,
`do`, `dont`, `viz`. Then run `node tools/selftest.js`.

---

## Deploying to GitHub Pages

This is a plain static site — no build step, no server, no dependencies at runtime — so it
hosts on GitHub Pages as-is.

**Fastest route (recommended):**

1. Put this folder in a GitHub repository (if you are pushing from a terminal, the folder
   should be the repository **root**):
   ```bash
   git init
   git add .
   git commit -m "Cyber Aware training"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. That's it. The included workflow (`.github/workflows/deploy-pages.yml`) publishes the site on
   every push to `main`. Your URL will be `https://<you>.github.io/<repo>/`.

**No-Actions alternative:** set the Pages source to **Deploy from a branch → main → / (root)**.
The `.nojekyll` file is already there so Pages serves the files unchanged.

**If this site lives in a subfolder** of a bigger repo: in the workflow, change
`path: .` to `path: csia` (or whatever the folder is called).

Everything is client-side, so it also works on any static host (Netlify, Cloudflare Pages,
S3, an intranet share) — just upload the folder.

## Using it as a real training course

- **Host it**: it is just static files — drop the folder on any web server, SharePoint, or
  an intranet share and send the link.
- **Certificate**: learners enter their name, and if `window.print()` is used they can "Save as
  PDF". The certificate includes a verification code derived from their name and completion date.
- **No tracking by default**: everything is local. If you need records for compliance, export
  the JSON from Settings and collect it, or add your own LMS wrapper.

Stay safe out there. 🛡
