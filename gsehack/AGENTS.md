# AGENTS.md

## What this is
**GRIZZLY_SE Cyber Range** — a single-file, dependency-free browser game that teaches beginner hacking
skills (password cracking, network recon, log forensics, steganography, SQL injection).
Everything lives in `index.html` (HTML + CSS + vanilla JS, no build step, no packages).
Host it by opening the file or dropping it on any static web server.

## Run / verify
- **Play locally:** open `index.html` in a browser, or `python3 -m http.server` and browse to it.
- **Tests:** `bash test/run.sh` — asserts all 26 checks across every mission.
- **Tests without gjs** (e.g. Windows): `node test/run.node.js` — same 26 checks,
  same pipeline, with a small GLib/timer shim backed by Node timers.

There is **no Node.js in this environment and no package manager**. Tests run under
**gjs** (SpiderMonkey) using the stub DOM in `test/prelude.js`. The runner extracts the
`<script>` block from `index.html`, disables the trailing `boot();`, concatenates the
prelude + game + `test/tests.js`, and runs it. Keep `test/` in sync when gameplay changes.

Quick syntax-only sanity check without a browser: extract the script and run `gjs` (it will
fail at runtime on DOM calls, but a `SyntaxError` means broken JS).

## Architecture (all inside index.html)
- `MISSIONS` — array of 5 mission objects. Each has `fs` (virtual files per mission),
  `commands` (mission-specific commands merged over the global ones), `brief()`, `hint(n)`,
  and `points`. `Game.current` points at the active mission.
- `COMMANDS` — global command registry. Every command is `{ desc, run(args, input) -> string[] | null }`.
  Returning an array prints it; returning `null` means it printed directly (used for
  animations/side effects). `CMDS_TABLE()` merges global + current-mission commands.
- `handleInput(raw)` — tokenizes, echoes, supports Unix-style pipes (`a | b | c`) for the
  text-processing commands (`grep/sort/uniq/wc/head/tail`). Pipeline commands must be
  synchronous; single commands may be `async` (they animate with `await sleep()`).
- `Game` — state machine: `startMission`, `completeMission`, `victory`, scoring, hints,
  achievements, `localStorage` save under key `grizzlyse.save`.
- Completing a mission sets `Game.awaitingNext`; the next mission starts on empty Enter
  or the `next` command. `completeMission` auto-triggers `victory()` after the 5th.

## Gotchas that have bitten before
- **Mission content lives in JS template literals. Never use a backtick inside them** — it
  silently terminates the string early and breaks the whole script. Command references in
  prose use single quotes instead. (Verified by `test/run.sh`.)
- The flag in Mission 4's `submit` literal must match exactly what `base64 -d` produces:
  `FLAG{m3t4d474_n3v3r_l13s}`.
- Audio only initializes after a user gesture (browser policy); `Audio.tone` is a safe no-op
  until then. Keep all DOM output funneled through `print`/`printLines` so the test stubs work.
- `MAX_SCORE` is computed inside `boot()`; tests set it manually because they disable boot.

## Style
- Match the existing CRT terminal aesthetic; colors come from CSS variables in `:root`.
- No comments in game code unless they carry real information (existing style).
- Keep it one file — portability is the point. Do not split `index.html` for new features.
