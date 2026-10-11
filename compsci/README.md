# ZeroDay Academy

**A complete computer science academy that runs entirely in your browser.**
Linux and Windows command lines, real programming practice, networking, and
authorised security — from your first `ls` to a full incident response.

No installs. No accounts. No tracking. No network calls. Everything runs on a
simulated machine built in JavaScript, so it is 100% safe to poke at.

---

## Try it

**Live:** open the GitHub Pages URL for this repo (Settings → Pages → your URL).

**Locally** (needs any static file server — ES modules do not work from `file://`):

```bash
npm run serve          # python3 -m http.server 8080
# then open http://localhost:8080
```

Any static host works: GitHub Pages, Netlify, Cloudflare Pages, S3, nginx, `serve`.

---

## What is inside

| Part | What you get |
|---|---|
| **9 chapters, 35 missions** | A guided path from `pwd` to incident response |
| **~70 bash commands** | Files, pipes, redirection, grep/sed/awk, find, permissions, cron, processes |
| **A bash interpreter** | Pipes, `>` `>>` `<` `2>&1`, `&&` `||`, variables, globs, command substitution, `$(( ))`, `for`, `while read`, `if/else`, shebang scripts |
| **Windows shells** | `cmd.exe` builtins plus 30+ PowerShell cmdlets and the object pipeline (`Where-Object`, `ForEach-Object`, `Select-Object`, …) |
| **A simulated network** | `ping`, `nmap`, `curl`, `dig`, `traceroute`, `ssh` — every host belongs to the lab |
| **Code Lab** | 12 exercises (FizzBuzz, binary search, Caesar cipher…) run in a sandboxed Web Worker |
| **6 CTF challenges** | Recon, web, crypto, forensics, lateral movement — all with written authorisation |
| **24 awards, XP and levels** | Progress saved in `localStorage` |
| **Free-play sandbox** | Your own machine, no objectives |

### Curriculum

1. **First Contact** — `pwd`, `ls`, `cd`, `cat`, `echo`, pipes
2. **Files & Permissions** — `cp`/`mv`/`rm`, globs, `chmod`, `chown`, dotfiles
3. **Text Power Tools** — `grep`, `sed`, `cut`, `awk`, `sort`/`uniq`/`wc`, log triage
4. **Scripting & Automation** — variables, `for`, `if`, scripts, `chmod +x`, cron
5. **Windows & PowerShell** — cmd basics, cmdlets, the object pipeline, event triage
6. **Networking** — IPs and ports, `nmap` recon, HTTP with `curl`, DNS with `dig`
7. **Security Fundamentals** — hashing, weak-password audits, brute-force analysis,
   web CTF, authorised SSH access, privilege escalation, responsible disclosure
8. **CS Foundations** — bits and number bases, complexity and algorithms
9. **Capstone** — a full incident: triage → scope → root cause → fix → report

---

## Safety and ethics

This game exists to teach people to **defend** systems and to work **with
authorisation**.

- Every machine in the game belongs to the simulation. Nothing scans, probes or
  connects to anything real.
- The security chapter starts with paperwork: every mission that involves
  reconnaissance or access begins by reading an authorisation note.
- The final security mission is about **responsible disclosure** — writing the
  report, not showing off.
- Nothing here teaches you to attack systems you do not own. Scanning, cracking
  or accessing someone else's machine without written permission is illegal in
  most countries and is the fastest way to lose a career.

The Code Lab worker also blocks `fetch` and `XMLHttpRequest`: student code cannot
phone home either.

---

## How it is built

No framework, no build step, no dependencies. Just ES modules.

```
index.html          the whole app shell
css/styles.css      one stylesheet
js/
  app.js            UI: terminal, missions, modals, XP
  shell.js          command engine: lexer, parser, pipelines, redirection
  script.js         small bash interpreter (for / while / if / shebang scripts)
  bash.js           the Linux command library
  windows.js        cmd.exe + PowerShell
  fs.js             the in-game filesystem with permissions
  hash.js           MD5 / SHA-1 / SHA-256 / Base64, pure JS
  net.js            the simulated lab network, HTTP, ssh
  util.js           lexer, path helpers, globbing, arithmetic
  content/
    missions.js     the curriculum (objectives, hints, checks)
    ctf.js          CTF challenges
    codelab.js      coding exercises and tests
    achievements.js badges and the XP curve
workers/runner.js   sandboxed execution for the Code Lab
tests/              automated tests
```

### The interesting bits

**Everything is simulated.** There is no `child_process` anywhere. The terminal
you see is a JavaScript interpreter for a shell language, writing to an
in-memory filesystem with real permission bits:

```js
const fs = VFS.fromSpec({ '/home/player/notes.txt': 'hello' });
const sh  = new BashShell({ fs, cwd: '/home/player' });
sh.run('cat notes.txt | grep -i hello | wc -l');   // → "1"
```

**Objectives are checked automatically** after every command, which is what
makes it feel like a tutor rather than a wall of text. Each objective is a
function over the live game state:

```js
{ id: 'grep', text: 'Find every ERROR line in server.log',
  hint: 'grep ERROR server.log',
  check: (vm, sh, fs) => vm.commands.some(c => /grep/.test(c.input) && c.out.includes('ERROR')) }
```

**Missions are data, not code paths.** Adding a chapter means adding an entry to
`js/content/missions.js`.

---

## Tests

```bash
npm test          # 161 engine + content tests in Node (no browser needed)
```

The Node suite covers the shell engine, the filesystem and permissions, the hash
implementations (against known vectors *and* Node's `crypto`), the network
simulation, and **every mission played through to completion**.

There is also a browser smoke test that drives the real UI:

```bash
npm run serve
# open http://localhost:8080/index.html#smoke
```

It plays through mission 1, pipelines, redirection, hints, PowerShell, a `sudo`
password prompt, `nmap`, `ssh`, the CTF flow and the Code Lab worker, then prints
a PASS/FAIL report on the page.

---

## Deploying to GitHub Pages

The repository is already Pages-ready (plain files, `.nojekyll` included).

```bash
git init
git add .
git commit -m "ZeroDay Academy"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

Then in the repo: **Settings → Pages → Source: Deploy from a branch → main /
(root)**. The included workflow (`.github/workflows/pages.yml`) runs the test
suite and publishes on every push; you can also just use the branch setting and
ignore it.

## Licence

MIT — see [LICENSE](LICENSE). Use it in a classroom, at a coding club, or on
your own. If you improve it, please keep the authorisation-first framing: the
lesson only works if people learn to ask permission before they touch anything.