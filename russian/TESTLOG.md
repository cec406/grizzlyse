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



## Phase 9 � Zero ? hero expansion
- 2026-10-14: Added a large searchable dictionary, a Russian keyboard trainer, a zero ? hero
  roadmap and a professional/technology Russian track.
  - `data/word-packs.js`: 9 themed packs, 440 words (kindergarten ? professional), each with
    Cyrillic + Latin transliteration + English + part of speech (gender for nouns).
  - `js/views/vocab.js` + route `#/vocab`: searchable English ? Russian ? transliteration
    dictionary (1,080+ unique entries after de-dup), level/pack/POS/learned filters, audio and
    a learned toggle feeding review.
  - `data/keyboard-layout.js` + `js/views/keyboard.js` + route `#/keyboard`: ?????? key map,
    finger colouring, per-key detail, Latin?Cyrillic keydown translation, a full reference
    table, and 8 graded touch-typing lessons with a live drill (per-character highlighting,
    next-key hint, accuracy/WPM).
  - `data/cyber.js` + `js/views/cyber.js` + route `#/cyber`: 6 professional/tech modules,
    126 terms & phrases and dialogues � language study only, no tradecraft.
  - `data/learning-path.js` + `js/views/path.js` + route `#/path`: kindergarten ? digital
    professional roadmap linking into the right content at each stage.
  - Router now supports `?query` params; all new views wired into the nav, home tiles and the
    view manifest.
- Fixes/improvements: `tests/run-all.js` now reports a missing Chrome as a non-fatal SKIP
  (matching the README) so `npm test` passes on a machine without the CI browser.
- Added `tests/extra.test.js` (6 tests) validating packs, pro track, keyboard map/lessons,
  roadmap and the lexicon builder; updated smoke + E2E route lists; audit reports new counts.
- 2026-10-14: `node tests/run-all.js` ? syntax check (100 files) PASS, import checker PASS,
  unit tests 34/34 PASS, browser E2E SKIPPED (no system Chrome). `node tools/audit-content.js`
  ? all targets met (9 packs/440 words, 6 modules/126 terms, 8 lessons, 6 roadmap stages).

## Phase 10 � Real-browser E2E on the dev machine (no installs)
- 2026-10-14: Replaced the Playwright/python E2E with a dependency-free browser smoke test
  (`tests/e2e.js`) that drives the machine's own Chrome/Edge via the DevTools protocol using
  Node's built-in WebSocket + fetch + http. `tests/run-all.js` now auto-detects Chrome/Edge on
  Windows and Linux.
- 2026-10-14: The new browser test immediately caught two real bugs that unit tests missed:
  1. **Games restarted at the final question.** `js/games/runner.js` `bind()` had a fallback
     that fired the *first* matching element when a click hit no match. When the last
     question's "See results" button was clicked, `finish()` rendered the results and, during
     the same event's bubbling, added a root "Play again" listener whose fallback immediately
     re-launched the game. Fixed by ignoring clicks on elements removed mid-event
     (`e.target.isConnected === false`) in `bind()`.
  2. **Stale view listeners on `#main`.** Alphabet and Keyboard both use `[data-tab]`; a
     handler from a previously visited view stayed attached and threw
     `TAB_RENDER[t] is not a function` when a different view's tab was clicked. Fixed in
     `js/app.js` by replacing `#main` with a clean clone on every navigation, dropping old
     listeners (and moving the shell marker to the parent container).
- 2026-10-14: `node tests/run-all.js` ? syntax (100 files) PASS, import checker PASS, unit
  tests 36/36 PASS, browser E2E PASS (17 routes, dictionary/keyboard/roadmap exercised, lesson
  quiz + game played, zero console/HTTP errors).
- Verified the app is GitHub-Pages-safe: no absolute paths; relative assets + hash routing work
  from a project subpath. README gained a Pages deployment section.
