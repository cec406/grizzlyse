# PLAN.md — Russian Learning App (English → Russian, zero to B2)

Checklist. Tick only after the phase's checks pass in `node tests/run-all.js`.

## Phase 0 — Skeleton
- [x] Create directory structure and stub files (index.html, css, js modules, data, tests, tools)

## Phase 1 — Test harness first [x]
- [x] `tests/run-all.js` runs: syntax check, import checker, data validators, unit tests, smoke test, optional E2E
- [x] `tools/check-imports.js` resolves every import/script/link path
- [x] `tests/data.test.js` validates letters, vocab, ids, references, Cyrillic/Latin fields, unit requirements, quiz answers
- [x] `tests/smoke.test.js` loads every view/game module and calls render against a DOM stub
- [x] E2E attempted (playwright-core + system Chrome) or documented as skipped in TESTLOG.md

## Phase 2 — Core engine [x]
- [x] Hash router with all views
- [x] state.js (XP, levels, streak, mastery, settings) with localStorage try/catch
- [x] srs.js 5-box Leitner with unit tests (demotion, due dates)
- [x] keyboard.js normalization + on-screen keyboard, unit tests (ё=е, case, trim, stress strip, empty input)

## Phase 3 — Alphabet & pronunciation [x]
- [x] 33 letters with name, sound, approximation, example word, mnemonic; 4 learning groups + signs
- [x] Interactive chart, exercises (letter-sound, flashcards, read-the-word cognates, typing, reading drill)
- [x] Pronunciation guides (stress, vowel pairs, reduction, voicing, hard/soft, cursive)

## Phase 4 — Curriculum (units built one at a time)
- [x] A1 units 1–10 (each: self-review pass + TESTLOG entry)
- [x] A2 units 11–22
- [x] B1 units 23–34
- [x] B2 units 35–44
- [x] Content audit targets met or shortfalls documented in README

## Phase 5 — Practice games [x]
- [x] All games (flashcards, MC both directions, typing, memory, scramble, fill-blank, case drill, verb drill, aspect picker, dictation, speed round, hangman) with difficulty, results screen, scoring tests

## Phase 6 — Reading, review, progress [x]
- [x] Graded reading texts with tap-to-translate glossary
- [x] SRS-driven daily review
- [x] Progress page (XP, level, streak, letters, words, lessons, accuracy, weak spots, 20 badges)
- [x] Placement test on first visit

## Phase 7 — Audio [x]
- [x] audio.js speechSynthesis ru-RU, voiceschanged, slow rate, graceful fallback
- [x] #/audio-setup view with voice detection, test button, install instructions

## Phase 8 — Final hardening [x]
- [x] Full test run passes
- [x] `tools/audit-content.js` counts vs targets; gaps filled or documented
- [x] Code review pass (dead links, errors, handlers, localStorage, mobile)
- [x] Russian accuracy pass on A1/A2
- [x] README complete

## Phase 9 — Zero → hero expansion [x]
- [x] `data/word-packs.js`: 9 themed packs (440 words) with translit + audio ids, kindergarten → professional
- [x] `#/vocab` Searchable English ⇄ Russian dictionary with romanisation, audio, filters, learned tracking
- [x] `data/keyboard-layout.js`: ЙЦУКЕН map, finger assignments, Latin→Cyrillic translation, 8 typing lessons
- [x] `#/keyboard` Keyboard trainer: layout, per-key detail, touch-typing drill (live highlighting, stats), reference table
- [x] `data/cyber.js`: 6 professional/technology modules, 126 terms & phrases, dialogues (language only)
- [x] `#/cyber` Pro & tech track browser
- [x] `data/learning-path.js` + `#/path` zero → hero roadmap (kindergarten → digital professional)
- [x] Router supports `?query` params; new views wired into nav, home and view manifest
- [x] `tests/extra.test.js` validates all new content; smoke/E2E route lists updated
- [x] Full harness passes (`node tests/run-all.js`); audit reports all targets met

## Phase 10 — Real-browser testing & deployment [x]
- [x] `tests/e2e.js` rewritten to drive the machine's own Chrome/Edge via the DevTools protocol (Node built-ins only — no Playwright, no python, no npm install)
- [x] `tests/run-all.js` auto-detects Chrome/Edge on Windows and Linux; missing browser = non-fatal skip
- [x] Browser test covers: all routes render without console/page/HTTP errors, dictionary search + pack filters + deep links, roadmap word previews, keyboard drill translation, a full lesson quiz and a practice game
- [x] **Bug fix:** games auto-restarted at the final question (`runner.js` `bind()` fallback fired a just-added listener during event bubbling) — fixed with an `isConnected` guard
- [x] **Bug fix:** stale view listeners on `#main` collided across Alphabet/Keyboard tabs — fixed by giving every route a clean `#main` clone
- [x] Verified GitHub-Pages-safe (relative paths + hash routing); README deployment section added
- [x] Full harness passes incl. real browser E2E

