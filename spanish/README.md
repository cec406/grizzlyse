# SpanishPod — Learn Spanish from zero to fluency

A written-first, no-framework Spanish course for English speakers. Learn the 27-letter
alphabet, work through 48 graded units (A1 → C1), drill with 12 games, review with spaced
repetition, read graded texts with tap-to-translate glossaries, explore regional slang
from Puerto Rico, Mexico, Spain and beyond — and search a full English ⇄ Spanish
dictionary, train accented typing, and climb the zero → hero roadmap to professional Spanish.

Built for a family heading to Puerto Rico and for anyone training toward a Spanish
proficiency exam (Army DLPT / OPI). Uses **Latin-American Spanish** by default: `ustedes`,
never `vosotros`, with Puerto Rico flavour throughout.

No build step, no dependencies. Just modern browser ES modules.

---

## Quick start

The app uses ES modules, so it must be served over HTTP — opening `index.html` directly
from the file system (`file://`) will not work in most browsers.

```bash
# from the project root
python3 -m http.server 8000
# then open http://localhost:8000/
```

`package.json` includes a convenience script:

```bash
npm run serve        # runs: python3 -m http.server 8000
```

Then open <http://localhost:8000/>. Every page uses hash routing (`#/lessons`), so it also
works unmodified on GitHub Pages with no server config.

### If the page looks blank

1. Make sure you are on `http://localhost:...`, not `file:///...`.
2. Open the browser console — module scripts report load errors there.
3. Audio needs a Spanish voice installed on your OS; see the in-app **Audio setup** page
   (`#/audio-setup`) for instructions. Audio is optional — everything works silently.

### Fun & audio

Games and flashcards chime for right answers and buzz on misses, and **auto-speak** reads the
Spanish aloud as you check it. Perfect runs, passed unit tests and the audio-setup test button
throw confetti. Toggle sound effects and auto-speak any time in **Audio setup → Fun & sound**.
Lessons can read a whole dialogue (`🔊 Escuchar todo`) or reading text (`🔊 Leer en voz alta`)
line by line. Your level also gets a Puerto-Rico-flavoured nickname — from *Bebé en la isla*
to *Leyenda de la isla*.

---

## Testing

Everything is plain Node (no npm install required; `npm test` just calls the runner).

```bash
node tests/run-all.js        # full harness (recommended)
node --test                  # data + engine + smoke unit tests only
node tools/check-imports.js  # verify every import/script/link path resolves
node tools/audit-content.js  # content report vs PLAN targets
```

The harness runs, in order:

1. **Syntax check** — `node --check` on every `.js` file.
2. **Import checker** — every `import`, `<script src>` and `<link href>` resolves.
3. **Unit tests** (`node --test`) — data validators, engine logic, DOM-stub smoke tests,
   and the added-content tests (word packs, keyboard/accent map, pro track, roadmap, lexicon).
4. **Browser E2E** — starts a local static server and drives your installed **Chrome/Edge**
   through the DevTools protocol (Node's built-in WebSocket — **no Playwright, no npm
   install**). It loads every route, checks for console/page/HTTP errors, exercises the
   dictionary search + pack filters, the roadmap word previews and the accent drill, and
   plays a full lesson quiz and a practice game through to the results screen. If no
   Chrome/Edge is found the step is skipped (non-fatal).

Set `CHROME_PATH=/path/to/chrome` to point the E2E runner at a specific browser binary.

---

## Deploying to GitHub Pages

The app is a static site with no build step and uses **relative paths + hash routing**, so it
works from a project subpath (`https://<user>.github.io/<repo>/`) with no configuration.

1. Push this folder to your repository.
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch **`main`**, folder **`/ (root)`** (adjust the folder if this lives in a subfolder).
3. Open `https://<user>.github.io/<repo>/` in Chrome. Audio needs a Spanish voice installed —
   see the in-app **Audio setup** page.

---

## Project layout

```
index.html               single-page shell (loads js/app.js)
css/styles.css           all styles
data/
  index.js               central registry: UNITS, READING, DIALECTS, LETTERS, allVocab()
  letters.js             27 letters with name, sound, example, mnemonic, group
  pronunciation-guides.js  stress, vowels, b/v, silent h, c/z, g/j, rr, ll/y
  grammar-reference.js   grammar topics A1 → C1 (tables + examples)
  grammar-drills.js      verb / por-para / gender-article drills used by the games
  dialects.js            regional slang, accent notes and culture (Puerto Rico first)
  word-packs.js          themed vocabulary packs (425 words) that feed the dictionary
  keyboard-layout.js     accent/special-character map, dead keys, typing lessons
  cyber.js               professional & technology Spanish modules (language only)
  learning-path.js       zero → hero roadmap stages
  data-units/unit-NN.js  one file per curriculum unit (48 of them)
  reading/texts-*.js     graded reading texts with glossaries
js/
  app.js                 boot + chrome
  router.js              hash router (supports ?query params)
  state.js               XP, streak, mastery, settings (localStorage, guarded)
  srs.js                 spaced repetition (Leitner boxes)
  keyboard.js            accent bar + input normalization (accents/ñ/case/punctuation)
  audio.js               speechSynthesis es-ES with graceful fallback
  fun.js                 WebAudio sound effects, confetti, level titles, auto-speak
  ui.js                  DOM helpers
  views/                 one module per route (home, path, alphabet, keyboard, vocab,
                         cyber, lessons, lesson, practice, review, reading, dialects,
                         grammar, progress, audio-setup, help, placement)
  games/                 game registry, builders, pure logic, per-game renderers
tests/                   harness, unit tests, DOM stub, E2E driver
tools/                   import checker, content audit
```

### New sections

- **Dictionary (`#/vocab`)** — search the whole lexicon (units + packs + pro track, 1,300+
  unique words). Type English to get the Spanish word(s), type Spanish to get the meaning, or
  type the pronunciation respelling. Every entry has an audio button and a “learned” toggle.
- **Keyboard & accents (`#/keyboard`)** — how to type á é í ó ú ü ñ ¿ ¡ four different ways
  (Spanish dead keys, Windows Alt codes, macOS Option, in-app accent bar) plus graded
  accent/ñ/¿¡ typing drills. Dead keys are translated for you, so no setup is required.
- **Zero → hero path (`#/path`)** — the roadmap from kindergarten letters to C1 fluency,
  linking straight into the right content at each stage.
- **Pro & tech track (`#/cyber`)** — advanced workplace/technology Spanish: vocabulary,
  phrases and dialogues. Language study only.

### Adding a unit

1. Read `docs/UNIT-SPEC.md` and copy the shape of `data/data-units/unit-01.js`.
2. Create `data/data-units/unit-NN.js` exporting `{ unit }` with this shape:
   `id, level, number, title, titleEs, story, grammar[], vocabulary[], phrases[],
   sentences[], dialogue{}, quiz[], test{}`.
3. Import it in `data/index.js` and add it to `UNITS` in order.
4. Run `node --test` — the data validators enforce the minimums (≥12 vocab, ≥4 sentences,
   ≥10 quiz, ≥10 test questions, valid Spanish/translit, gloss ids that resolve).

---

## Content status

The current build ships all **48 units** (A1 → C1), 20 reading texts and 6 dialect regions,
and passes the full test harness.

| Area | Target | Shipped | Notes |
|------|-------:|--------:|-------|
| Alphabet | 27 | 27 | A–Z plus Ñ |
| Pronunciation guides | ≥6 | 8 | complete |
| A1 units | 10 | 10 | **complete** |
| A2 units | 10 | 10 | **complete** |
| B1 units | 10 | 10 | **complete** |
| B2 units | 10 | 10 | **complete** |
| C1 units | 8 | 8 | **complete** |
| Reading texts | 20 | 20 | A1×5, A2×5, B1×5, B2×5 |
| Grammar reference | ≥10 | 21 | spans A1–C1 |
| Verb/por-para/gender drills | — | 3 sets | span A1–C1 |
| Games | 12 | 12 | complete |
| Dialect regions | ≥4 | 6 | Puerto Rico first |
| Themed word packs | ≥8 | 9 | 425 words, kindergarten → professional |
| Keyboard typing lessons | ≥6 | 8 | accents/ñ/dieresis/¿¡/words/sentences/pro/speed |
| Pro & tech modules | ≥5 | 6 | terms & phrases (language only) |
| Roadmap stages | ≥5 | 6 | kindergarten → C1 fluency |

After de-duplication the searchable dictionary (`#/vocab`) holds **1,300+** unique entries.
Run `node tools/audit-content.js` for the live version of this table.

---

## Notes on Spanish accuracy

- Accents mark stress and a few sounds (`á é í ó ú ü ñ`); input is compared **accent- and
  ñ-insensitively**, so typing `cafe` for `café` or `nino` for `niño` also passes.
- Default register is **Latin-American / Puerto Rican**: `ustedes`, no `vosotros`; the
  `#/dialects` page covers Puerto Rico, Mexico, Spain, the Caribbean, Argentina and Colombia.
- The units were written as a solid first pass. Treat them as study material to be
  spot-checked by a native speaker before being considered fully authoritative.

## License

Private project.
