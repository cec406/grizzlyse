# CODEWATCH — Cybercrime Investigator Training Sim

A fictional, browser-based training game where you play a digital forensics analyst
rising through the ranks of the (invented) **National Cyber Investigation Bureau** —
learning to be *the good guy* in cybercrime: tracing malware, catching fraud rings
the right way, protecting soldiers from fake online personas, refusing hospital ransomware,
defending the power grid, following crypto, and shutting down scam waves.

> **This is fiction.** Not affiliated with or endorsed by the FBI, DHS, CIA, CISA, NCMEC,
> or any real agency. All cases, gangs, and people are invented. Real investigations are
> conducted only by authorized professionals — never investigate on your own. The game
> includes a permanent **REPORT & GET HELP** panel with real hotlines (NCMEC CyberTipline,
> FBI IC3, CISA, 988, and more) in English, Spanish, and Russian.

## The campaign

Core path (both specializations start here):
1. 🎓 **Operation First Watch** — chain of custody, hashing, metadata, reporting matrix
2. 🐛 **Operation Cold Chain** — phishing, live response, static/dynamic analysis, IOCs

Then you choose a **specialization**, and the case files fork:

| 🕊️ GUARDIAN — protect the vulnerable | 🛰️ SENTINEL — defend the homeland |
|---|---|
| 3. 🤲 Helping Hand — fake-charity fraud wave | 4. 🗼 Watchtower — fake persona hunting a soldier |
| 8. 📞 Porch Light — Spanish-language scam wave | 5. 🏥 Deadbolt — hospital ransomware (Russian note) |
| **10. 💸 Easy Money — money-mule recruitment ring** (new) | 6. ⚡ Tin Shield — grid/EMP attack prevention |
|   | **11. 🛰️ Firebreak — Russian APT espionage implant** (new) |

Then both streams re-converge:
7. 👻 **Ghost Market** — dark markets, blockchain tracing, MLAT
9. 🛡️ **Operation Aegis** — capstone composite crisis
🎓 **Final Certification Exam** — pass to earn your certification and unlock the OTHER specialization in **Joint Task Force rotation**. Clear *both* streams to earn the **Dual Specialist** seal.

Besides that: XP with 8 ranks, **per-case performance stars** (replay for ★★★), **Quick Drills** (endless 5-question practice rounds, +15 XP per first-time correct), a **Case File Archive** to re-read closed cases, 8 unlockable forensic tools, a trilingual **Field Manual** (30 concepts with EN/ES/RU terms), 15 commendations, terminal easter eggs (try `whoami`, `hint`, `cat`), a printable certificate, and a built-in **Career Guide** mapping both forks to real agencies, certs, and paths.

## The Skills Lab — doing the real work

The in-game terminals (Cold Chain, Firebreak) now show the **real-world command** behind every simulated one. And the new **🧪 Skills Lab** (Field Office sidebar) takes you hands-on with **nine labs using the actual free tools** examiners use — on your own files, at home, +40 XP each:

`certutil`/`sha256sum` (hashing) · ExifTool (metadata) · email headers · Wireshark (packets) · `strings` (malware triage) · Linux/WSL (workbench) · **Autopsy** (disk forensics) · **Volatility 3** (memory forensics) · picoCTF/TryHackMe/CyberDefenders (free practice ranges).

Range rules enforced in-game and in real life: **only your own files, machines, and networks** — or platforms built for practice. That line is the difference between an examiner and a felon.

## Sound & atmosphere

Everything is procedural — **zero audio files, zero external assets**, stays lightweight on GitHub Pages:

- 🔊 **Sound design** (Settings → toggle): UI clicks, correct/wrong tones, achievement chimes, promotion fanfares, a mission-complete sting, terminal blips.
- 🌫️ **Ambient ops-room hum** (separate toggle): a low synthesised drone for long sessions.
- 🌧️ **Matrix code rain** backdrop that literally spells in all three case languages (Latin, Cyrillic, Spanish accents) — toggleable, paused when the tab is hidden.
- 🖥️ Optional **CRT scanlines + grid vignette**, an **NCIB boot sequence** on first load (click to skip), shimmering title wordmark, step transitions, pulsing CTAs, card hover float, a shining certificate seal.
- ♿ All motion honors `prefers-reduced-motion` automatically; everything defaults to tasteful and can be toned down in Settings.

## Languages (where they make sense)

- **UI** switchable between **English / Español / Русский** (top bar, auto-detected).
- **Evidence stays in its original language** — Spanish victim statements and scam scripts in the Guardian path; Russian ransom notes, APT config strings, and market listings in the Sentinel path. The in-game **Polyglot** translator reveals them line by line.
- **Your language skills are part of the story**: Spanish is your Guardian superpower; Russian is your Sentinel superpower. The Field Manual gives every concept its Spanish and Russian terms.

## Run it

Any static hosting works — no build step, no dependencies, no external requests.

**GitHub Pages**
1. Push this folder to a GitHub repository.
2. Repo → *Settings* → *Pages* → Source: `main` branch, `/ (root)`.
3. Open `https://<user>.github.io/<repo>/`.

**Any web server** — copy the folder to your webroot (nginx/Apache/whatever).

**Locally**
```bash
cd cybercrime
python3 -m http.server 8000
# open http://localhost:8000
```
(Opening `index.html` directly from disk also works in most browsers.)

Progress saves to `localStorage`; you can export/import a save from **Settings**.

## Project structure

```
index.html            entry point
css/style.css         theme (ops-console, CRT scanlines, print-ready certificate)
js/i18n.js            UI strings EN/ES/RU + t() helper
js/data/manual.js     Field Manual glossary (trilingual)
js/data/missions1.js  missions 1–3
js/data/missions2.js  missions 4–6
js/data/missions3.js  missions 7–9 + exam pool
js/data/missions4.js  missions 10–11 (Guardian & Sentinel tracks)
js/engine.js          state, progression, tracks, step renderers, scoring
js/app.js             screens, routing, exam, certificate, settings
```

## Design notes

- **Every wrong answer teaches.** Choices, sequencing drills, evidence boards,
  matching games, and a fake forensic terminal are built around feedback, not failure.
- **Ethics is the through-line**: warrants before searches, escalation before contact,
  "trained professionals only" for undercover work, no ransom payments, no vigilantism.
- Sensitive themes are handled at a strictly professional, non-graphic level —
  hashes, ledgers, and logs, never imagery — with kid-facing help resources attached.
- Threat-actor names, gangs, and incidents are fictional; techniques taught are
  conceptual and defensive in nature.
