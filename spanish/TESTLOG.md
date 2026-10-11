TESTLOG.md — test history
Date: Sat Oct 10 2026

Each test run and each fix is recorded here. Format: date/time + what was run + result + fixes made.

## Phase 0
- 2026-10-10 04:00: set up environment (Node v24.15.0, playwright-core driver bundled, flatpak Chrome discovered). Skelton dirs/files created. PLAN.md Phase 0 ticked. No test run yet.

## Phase 1 setup
- 2026-10-10 04:05: Created test harness (run-all.js), smoke tests, data tests, engine tests, import checker, node-env/dom-stub, and E2E skeleton.
- 2026-10-10 04:25: Ran node --test (core: data+engine+smoke). Initial failures due to syntax/DOM setup; fixes applied (dom-stub global definition, engine.test adjustments, data.test syntax).
- 2026-10-10 04:35: Ran full harness. Syntax and import checks passed. Core tests: 28 passed, 0 failed. E2E skipped (browser launch path) — non-blocking per instructions.

## Phase 8 — Make it work + finish A1
- 2026-10-11: Full harness reported 3 failures to fix:
  - `tests/run-all.js` counted `node --test` results as "0 passed" because it used a
    sticky regex (`/✔/gy`). Fixed to `/✔/g` — now reports 28 passed.
  - `tests/e2e.js`: `visible()` / `firstVisible()` were declared `async`, so callers did
    `.click()` on a Promise → "click is not a function" for nearly every interaction.
    Made them synchronous (they return locators).
  - `js/games/runner.js`: a stray `bind(body, '[data-action="submit"]', null, true)` passed
    `null` as the click handler, throwing `fn is not a function` on every typing/dictation
    round (9 page errors in E2E). Removed the bad call and hardened `bind()` to ignore
    non-function handlers.
  - Hangman E2E hang: the test clicked the first `.hkey`, which is disabled after use,
    so Playwright waited forever. Fixed the driver to target `.hkey:enabled` (test bug,
    app was fine).
- Added `"type": "module"` to `package.json` (removes per-file ES-module warnings).
- Added the missing `tools/audit-content.js` (referenced by `npm run audit` / PLAN Phase 8).
- Added `README.md` (run instructions, layout, content status, adding-a-unit recipe).
- Built out the full **A1 curriculum**: units 2–10 (Who are you?, Numbers and age, Family,
  Food and drink, Home, Day and time, City and transport, Shopping, Weather and seasons),
  wired into `data/index.js`. 190 vocab words total; every unit passes the data validators.
- 2026-10-11: `node tests/run-all.js` → syntax (56 files) PASS, import checker PASS,
  unit tests 28/28 PASS, browser E2E PASS (all routes, lesson quiz, all 12 games, zero
  console errors). `node tools/audit-content.js` reports A1 complete; A2/B1/B2 planned and
  documented in README.

## Phase 8 — Finish the curriculum (A2 + B1 + B2)
- 2026-10-11: Authored and wired the full 44-unit curriculum and re-ran the whole harness:
  - **A2 units 11–22** written, wired into `data/index.js`, validators green. Topics: time
    and plans, directions/prepositions, past+future, food/restaurant, shops, weather,
    daily routine, clothes, work, hobbies, the weekend.
  - **B1 units 23–34** written and wired. Topics: aspect in depth, verbs of motion,
    comparatives, conditionals with `бы`, relative clauses (`кото́рый`), imperatives,
    opinions, career, health, travel/culture, media/internet, nature/environment.
  - **B2 units 35–44** written and wired. Topics: participles, gerunds, complex sentences,
    passive/-ся, abstract nouns, formal/business, society/politics, current events,
    idioms, nuance/particles.
  - Fixed two content slips during B2 writing: a mistyped dialogue question in unit-40
    (`приста́ть` → `присла́ть`) and a stray `'Вы' + 'боры'` string concatenation in a
    unit-41 test question (replaced with a plain literal).
  - 2026-10-11: `node tests/run-all.js` → syntax check (91 files) PASS, import checker
    PASS, unit tests 28/28 PASS, browser E2E PASS. Audit: A1 10/10, A2 12/12, B1 12/12,
    B2 10/10, 44/44 units, 773 vocab words, reading texts 8/20 target documented.
  - PLAN.md: A2/B1/B2 phases ticked. README content-status table updated to 44 units.

## Post-launch tweak — unlock the whole course
- 2026-10-11: Removed sequential unit gating so learners can open any area at any time
  (progress was already local-only and non-syncing, so hard locks just stood in the way).
  - `js/views/lessons.js`: dropped the `isUnlocked`/placement gating and the locked-row
    rendering (including the now-unused `placementInfo` import and `levelIndex` helper);
    every row is a link. Done-marks, per-level progress bars and the placement test remain.
  - `js/views/lesson.js`: reworded the completion banner ("See the course or continue…")
    since the next unit is no longer gated.
  - Practice games and Reading were already ungated; no change needed there.
  - 2026-10-11: `node tests/run-all.js` → syntax check (91 files) PASS, import checker
    PASS, unit tests 28/28 PASS, browser E2E PASS.

## Spanish port (English → Spanish, zero to C1)
- 2026-10-12: Cloned the framework-free architecture to `/home/cclark/projects/spanish`
  and rewrote it for Spanish. Highlights:
  - Rebranded schema/code (`ru`→`es`, `titleRu`→`titleEs`, `Russian`/`Cyrillic`→Spanish),
    brand **SpanishPod**, nav localized (Inicio, Alfabeto, Curso, Práct., Repaso, Lectura,
    Regiones, Gram., Progreso, Audio, Ayuda).
  - `data/letters.js`: 27 letters (A–Z + Ñ) in 4 groups; `data/pronunciation-guides.js`:
    8 Spanish guides (stress, vowels, b/v, silent h, c/z, g/j, rr, ll/y).
  - `js/keyboard.js`: accent bar (`á é í ó ú ü ñ`, `¿ ¡`) + accent/ñ/case/punctuation
    insensitive normalization; `js/audio.js`: `es-ES` voice preference (Mónica).
  - Games retitled for Spanish (Gender & articles, Verb drill, Por or para?); builders and
    hangman switched to the Spanish alphabet; grammar drills and 21 grammar topics rewritten.
  - Placement test rewritten (A1→C1); alphabet exercises rewritten; progress/help/home
    wording updated (27 letters, 48 units, C1).
  - 20 graded reading texts (A1–B2, 5 per level) incl. Puerto Rico culture.
  - **New Dialects feature**: `data/dialects.js` + `#/dialects` view with Puerto Rico,
    Mexico, Spain, the Caribbean, Argentina and Colombia (accent notes, slang with
    register, phrases, culture). Router, view registry and nav wired.
  - Curriculum extended to 48 units (A1 1–10, A2 11–20, B1 21–30, B2 31–40, C1 41–48),
    authored against `docs/UNIT-SPEC.md`; unit 10 is a Puerto Rico travel-survival unit.
  - Tests rewritten for Spanish: `data.test.js` (27-letter + A1–C1 validators, dialect
    checks), `engine.test.js` (accent normalization, `spanish-app-state-v1` key),
    `smoke.test.js` (14 views), `e2e.js` (Spanish typing + `#/dialects` route). Audit
    targets updated to 27 letters / 48 units / 20 texts.
  - Full harness run pending while the 48 unit files finish authoring.
  - 2026-10-12: All 48 unit files landed (units 02–21, 28–48 authored by parallel
    subagents; units 22–27 authored by hand after that subagent finished without
    writing its files). Every unit passes id/gender/gloss-substring/Spanish-only/
    no-Cyrillic and ≥12-vocab/≥4-sentence/≥10-quiz/≥10-test checks; global vocab ids
    unique across all units.
  - 2026-10-12: Full harness → **ALL CHECKS PASS**: syntax (97 files), import checker,
    unit tests 29/29, browser E2E PASS (14 routes + lesson quizzes + all 12 games in
    headless Chrome). `tools/audit-content.js --strict` → all targets met
    (27 letters, 48 units 10/10/10/10/8, 1125 vocab words, 20 reading texts, 12 games).
    Fixes along the way: engine.test expectation `AEIOUUN` (both Ú and Ü strip to U),
    `buildScramble` given sentences for its sentence-sort half, and `SPAN_RE` extended
    with U+2190–U+2193 for pronunciation-guide arrows (`→`).

## Phase 9 — Pre-deploy check + fun & audio pass
- 2026-10-12: Pre-GitHub-Pages review and a "make it fun, keep audio in" pass.
  - Added `js/fun.js` (no build, no assets): WebAudio **sound effects** (`play('correct'|
    'wrong'|'win'|'click')`), DOM/CSS **confetti**, Puerto-Rico-flavoured **level titles**,
    opt-out **auto-speak**, and `speakLines()` for reading lists aloud. All guarded so the
    app/tests run identically with the layer disabled.
  - New settings `sfx` / `autoSpeak` (default on) in `state.js`; toggles + test buttons
    (chime / buzz / fanfare / confetti) on the audio-setup page under "Fun & sound".
  - Wired into `games/runner.js` (chime/buzz per answer, auto-speak the Spanish, fanfare +
    confetti on a perfect run), `games/flashcards.js` (auto-speak on reveal, grade sounds),
    and `views/lesson.js` (fanfare + confetti on a passed unit test; **🔊 Escuchar todo**
    dialogue playback and **🔊 Leer en voz alta** reading playback).
  - Home & progress now show the fun level nickname; added 6 PR-themed badges
    (¡Wepa!, Coquí, Mofongo master, Parcha power, Boricua, Examen listo).
  - Fixed: `practice.js` level filter was missing **C1**; wired the previously dead
    "Practice weak words" button; corrected stale "zero→B2 / 20 badges" copy.
  - GitHub Pages prep: added `.nojekyll`; verified zero absolute asset paths, no hardcoded
    hosts, and no `fetch()` — hash routing + relative paths survive a project subpath.
  - 2026-10-12: `node tests/run-all.js` → **ALL CHECKS PASS**: syntax (98 files), import
    checker, unit tests 29/29, browser E2E PASS. `node tools/audit-content.js --strict` →
    all targets still met (27 letters, 48 units 10/10/10/10/8, 1125 vocab words, 20 texts,
    12 games).


