# PLAN.md — Spanish Learning App (English → Spanish, zero to fluency)

Checklist. Tick only after the phase checks pass in `node tests/run-all.js`.

Target: an English speaker goes from zero to C1 (professional proficiency), with a
Puerto Rico travel track and dialect tabs for regional slang.

## Phase 0 — Skeleton
- [x] Create directory structure and stub files (index.html, css, js modules, data, tests, tools)
- [x] Port the framework-free architecture (static ES modules, hash routing)

## Phase 1 — Test harness first [x]
- [x] `tests/run-all.js` runs: syntax check, import checker, data validators, unit tests, smoke test, optional E2E
- [x] `tools/check-imports.js` resolves every import/script/link path
- [x] `tests/data.test.js` validates letters, vocab, ids, references, Spanish/Latin fields, unit requirements, quiz answers
- [x] `tests/smoke.test.js` loads every view/game module and calls render against a DOM stub
- [x] E2E drives a real headless Chrome through every route, lesson quiz and game

## Phase 2 — Core engine [x]
- [x] Hash router with all views (including `#/dialects`)
- [x] state.js (XP, levels, streak, mastery, settings) with localStorage try/catch
- [x] srs.js 5-box Leitner with unit tests (demotion, due dates)
- [x] keyboard.js accent bar + normalization (accents/ñ/case/punctuation insensitive)

## Phase 3 — Alphabet & pronunciation [x]
- [x] 27 letters (A–Z plus Ñ) with name, sound, approximation, example, mnemonic; 4 groups
- [x] Interactive chart, exercises (letter-sound, flashcards, cognates, typing, reading drill)
- [x] Pronunciation guides (stress, vowels, b/v, silent h, c/z, g/j, rr, ll/y)

## Phase 4 — Curriculum (units built in parallel)
- [x] A1 units 1–10 (includes a Puerto Rico travel-survival unit)
- [x] A2 units 11–20
- [x] B1 units 21–30
- [x] B2 units 31–40
- [x] C1 units 41–48 (formal register, Caribbean Spanish, nuance, DLPT/OPI prep)
- [x] Content audit targets met or shortfalls documented in README

## Phase 5 — Practice games [x]
- [x] All 12 games (flashcards, MC both directions, typing, memory, scramble, fill-blank, gender/article drill, verb drill, por/para picker, dictation, speed round, hangman)
- [x] Latin-American focus (ustedes, no vosotros)

## Phase 6 — Reading, review, progress [x]
- [x] 20 graded reading texts (A1–B2) with tap-to-translate glossary, incl. Puerto Rico culture
- [x] SRS-driven daily review
- [x] Progress page (XP, level, streak, letters, words, lessons, accuracy, weak spots, badges)
- [x] Placement test on first visit

## Phase 7 — Dialects & regional slang [x]
- [x] `data/dialects.js` + `#/dialects` view: Puerto Rico, Mexico, Spain, Caribbean, Argentina, Colombia
- [x] Each region: accent notes, slang (with register), phrases, culture notes

## Phase 8 — Audio [x]
- [x] audio.js speechSynthesis es-ES with voice preference, slow rate, graceful fallback
- [x] #/audio-setup view with voice detection, test button, install instructions

## Phase 9 — Final hardening [x]
- [x] Full test run passes
- [x] `tools/audit-content.js` counts vs targets; gaps filled or documented
- [x] Spanish accuracy pass across levels
- [x] README complete
