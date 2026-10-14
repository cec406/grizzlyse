# RussianPod — Learn Russian from zero to hero

A written-first, no-framework Russian course for English speakers. Learn the 33-letter
alphabet, work through graded units, drill with 12 games, review with spaced repetition,
read graded texts with tap-to-translate glossaries, and — new — search a full
English ⇄ Russian dictionary, train touch typing on the Russian keyboard, and climb the
zero → hero roadmap all the way to professional/technical Russian.

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

Or with Node:

```bash
npx serve .          # if you have npx
```

`package.json` includes a convenience script:

```bash
npm run serve        # runs: python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

### If the page looks blank

1. Make sure you are on `http://localhost:...`, not `file:///...`.
2. Open the browser console — module scripts report load errors there.
3. Audio needs a Russian voice installed on your OS; see the in-app **Audio setup** page
   (`#/audio-setup`) for instructions. Audio is optional — everything works silently.

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
   and the added-content tests (word packs, keyboard map, pro track, roadmap, lexicon).
4. **Browser E2E** — starts a local static server and drives your installed **Chrome/Edge**
   through the DevTools protocol (Node's built-in WebSocket — **no Playwright, no npm
   install**). It loads every route, checks for console/page/HTTP errors, exercises the
   dictionary search + pack filters, the roadmap word previews and the keyboard drill, and
   plays a full lesson quiz and a practice game through to the results screen. If no
   Chrome/Edge is found the step is skipped (non-fatal).

Set `CHROME_PATH=/path/to/chrome` to point the E2E runner at a specific browser binary.

---

## Deploying to GitHub Pages

The app is a static site with no build step and uses **relative paths + hash routing**, so it
works from a project subpath (`https://<user>.github.io/<repo>/`) with no configuration.

1. Push this folder to your repository.
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch **`main`**, folder **`/ (root)`** (adjust the folder if this lives in a subfolder and
   set the Pages path accordingly).
3. Open `https://<user>.github.io/<repo>/` in Chrome. Audio needs a Russian voice installed —
   see the in-app **Audio setup** page.

---

## Project layout

```
index.html               single-page shell (loads js/app.js)
css/styles.css           all styles
data/
  index.js               central registry: UNITS, READING, LETTERS, allVocab()
  letters.js             33 letters with name, sound, example, mnemonic, group
  pronunciation-guides.js  stress, vowel reduction, voicing, hard/soft, cursive…
  grammar-reference.js   grammar topics A1 → B2 (tables + examples)
  grammar-drills.js      verb / aspect / case drills used by the games
  word-packs.js          themed vocabulary packs (440 words) that feed the dictionary
  keyboard-layout.js     ЙЦУКЕН key map, finger assignments, typing lessons
  cyber.js               professional & technology Russian modules (language only)
  learning-path.js       zero → hero roadmap stages
  data-units/unit-NN.js  one file per curriculum unit
  reading/texts-*.js     graded reading texts with glossaries
js/
  app.js                 boot + chrome
  router.js              hash router (supports ?query params)
  state.js               XP, streak, mastery, settings (localStorage, guarded)
  srs.js                 spaced repetition (Leitner boxes)
  keyboard.js            input normalization (ё=е, stress/case/trim) + on-screen keyboard
  audio.js               speechSynthesis ru-RU with graceful fallback
  ui.js                  DOM helpers
  views/                 one module per route (home, path, alphabet, keyboard, vocab,
                         cyber, lessons, lesson, practice, review, reading, grammar,
                         progress, audio-setup, help, placement)
  games/                 game registry, builders, pure logic, per-game renderers
tests/                   harness, unit tests, DOM stub, E2E driver
tools/                   import checker, content audit
```

### New sections

- **Dictionary (`#/vocab`)** — search the whole lexicon (units + packs + pro track, 1,080+
  unique words). Type English to get the Russian word(s), type Russian to get the meaning, or
  type the romanisation. Every entry has an audio button and a “learned” toggle that feeds review.
- **Keyboard trainer (`#/keyboard`)** — a visual ЙЦУКЕН layout, per-key finger colours, a
  full Latin↔Cyrillic reference table, and graded touch-typing drills. Latin key presses are
  translated to Russian for you, so it works whether or not the OS Russian layout is on.
- **Zero → hero path (`#/path`)** — the roadmap from kindergarten letters to professional
  reading, linking straight into the right content at each stage.
- **Pro & tech track (`#/cyber`)** — advanced workplace/technology Russian: vocabulary,
  phrases and dialogues. Language study only, no offensive tradecraft.

### Adding a unit

1. Create `data/data-units/unit-NN.js` exporting `{ unit }` with this shape:
   `id, level, number, title, titleRu, story, grammar[], vocabulary[], phrases[],
   sentences[], dialogue{}, quiz[], test{}`.
2. Import it in `data/index.js` and add it to `UNITS` in order.
3. Run `node --test` — the data validators enforce the minimums (≥12 vocab, ≥4 sentences,
   ≥10 quiz, ≥10 test questions, valid Cyrillic/translit, gloss ids that resolve).

---

## Content status

The interface advertises the full zero→B2 goal (44 units). The current build ships all
**44 units** (A1 → B2) and passes the full test harness.

| Area | Target | Shipped | Notes |
|------|-------:|--------:|-------|
| Alphabet | 33 | 33 | complete |
| Pronunciation guides | ≥6 | 7 | complete |
| A1 units | 10 | 10 | **complete** |
| A2 units | 12 | 12 | **complete** |
| B1 units | 12 | 12 | **complete** |
| B2 units | 10 | 10 | **complete** |
| Reading texts | 20 | 8 | A1×3, A2×2, B1×2, B2×1 |
| Grammar reference | ≥10 | 18 | spans A1–B2 |
| Verb/aspect/case drills | — | 24/10/16 | span A1–B2 |
| Games | 12 | 12 | complete |
| Themed word packs | ≥8 | 9 | 440 words, kindergarten → professional |
| Keyboard typing lessons | ≥6 | 8 | home/top/bottom/alphabet/words/phrases/pro/speed |
| Pro & tech modules | ≥5 | 6 | 126 terms & phrases (language only) |
| Roadmap stages | ≥5 | 6 | kindergarten → digital professional |

Total curriculum vocabulary: **773 words across 44 units**, plus **440** pack words and
**126** professional-track entries — after de-duplication the searchable dictionary
(`#/vocab`) holds **1,080+** unique entries. Run `node tools/audit-content.js` for the live
version of this table.

---

## Notes on Russian accuracy

- Stress is marked with a combining acute accent (U+0301), e.g. `приве́т`.
- Input is compared stress-insensitively and `ё` is treated as `е`, so learners are not
  punished for typing without accents.
- Unit 1 and the alphabet were written and reviewed against standard A1 usage; the later
  units received the same accuracy pass as they were written (stress marking, case usage,
  aspect and motion-verb selection). Treat them as a solid first pass to be spot-checked by
  a native speaker before being considered fully authoritative.

## License

Private project.
