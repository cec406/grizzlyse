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
