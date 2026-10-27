// Alphabet practice exercises. Reuses the game runner + pure logic for scoring.
import { esc } from '../ui.js';
import { LETTERS } from '../../data/index.js';
import { COGNATES_DATA, SYLLABLES, READ_WORDS, READ_SENTENCES } from './alphabet-data.js';
import { sample, pickN, shuffle, eq, makeMc, makeType } from '../games/logic.js';
import { runGame } from '../games/runner.js';
import { addXp, recordActivity, recordAccuracy, markLetters, markWords } from '../state.js';
import { grade, newCard, summary } from '../srs.js';

const A_KEY = 'alpha-srs-v1';

function store(key, val) {
  try { globalThis.localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
}
function load(key) {
  try { const raw = globalThis.localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch { return null; }
}

let srsMap = null;

function getSrs() {
  if (!srsMap) {
    const stored = load(A_KEY);
    srsMap = new Map(Object.entries(stored || {}));
  }
  return srsMap;
}

function lettersFromQuestion(q) {
  if (!q) return [];
  if (q.alpha) return [q.alpha];
  const text = String((q.es || '') + ' ' + (q.en || '')).toUpperCase();
  return LETTERS.filter((l) => text.includes(l.upper) || text.includes(l.lower)).map((l) => l.upper + l.lower);
}

function runSession(target, game, questions, opts = {}) {
  const session = {
    gameId: game.id,
    difficulty: 'medium',
    speedMs: 0,
    questions,
    answers: [],
    timers: false
  };
  runGame(target, {
    game,
    session,
    onFeedback: (rec, q) => {
      const skill = 'alphabet-' + game.id;
      recordAccuracy(skill, rec.ok);
      addXp(rec.ok ? opts.xp || 5 : 0);
      if (rec.ok) markLetters(lettersFromQuestion(q));
      recordActivity();
    },
    onComplete: () => { if (srsMap) { const o = {}; srsMap.forEach((v, k) => { o[k] = v; }); store(A_KEY, o); } },
    again: () => runSession(target, game, questions, opts)
  });
}

// ---- Sound ↔ letter match (both directions) ----
export function soundExercise(target) {
  const qs = [];
  const pool = shuffle(LETTERS);
  for (const l of pool.slice(0, 8)) {
    const toLetter = Math.random() < 0.5;
    if (toLetter) {
      const opts = pickN(LETTERS, 3).map((x) => x.upper);
      qs.push(makeMc(`Which letter sounds like "${l.approx}"? (${esc(l.name)})`, l.upper, opts.filter((o) => o !== l.upper)));
    } else {
      const opts = pickN(LETTERS, 3).map((x) => x.approx);
      qs.push(makeMc(`How does «${l.upper}» sound in English?`, l.approx, opts.filter((o) => o !== l.approx)));
    }
    qs[qs.length - 1].es = l.example;
    qs[qs.length - 1].en = l.mnemonic;
    qs[qs.length - 1].alpha = l.upper + l.lower;
  }
  runSession(target, { id: 'alpha-sound', title: 'Sound match', icon: '🔤' }, qs, { xp: 4 });
}

// ---- Alphabet flashcards (SRS-graded) ----
export function flashExercise(target) {
  const srs = getSrs();
  const order = shuffle(LETTERS);
  let i = 0;
  let shown = false;
  const render = () => {
    if (i >= order.length) {
      const s = summary([...srs.values()]);
      target.innerHTML = `
        <div class="ex-done">
          <h3>Flashcards done!</h3>
          <p>In your long-term memory: <b>${s.learned}</b> of 27 letters.</p>
          <button type="button" class="primary" data-slot="again">Again</button>
        </div>`;
      const b = target.querySelector('[data-slot="again"]');
      if (b) b.addEventListener('click', () => { i = 0; shown = false; render(); });
      return;
    }
    const l = order[i];
    const card = srs.get(l.upper + l.lower) || newCard(l.upper + l.lower);
    target.innerHTML = `
      <div class="flashcard-big ${shown ? 'flipped' : ''}">
        <div class="fc-front">
          <span class="fcl">${l.upper} ${l.lower}</span>
          <span class="fcn">${esc(l.name)}</span>
          <button type="button" class="ghost" data-action="flip">Show answer</button>
        </div>
        <div class="fc-back">
          <span class="fce">${esc(l.example)} <button type="button" class="speak-link" data-speak="${esc(l.example)}">🔊</button></span>
          <span>${esc(l.gloss)} (${esc(l.trans)})</span>
          <span class="fcm">${esc(l.mnemonic)}</span>
        </div>
      </div>
      ${shown ? `
        <div class="grade-row">
          <button type="button" class="g-btn g-again" data-slot="again2">🔁 Again</button>
          <button type="button" class="g-btn g-hard" data-slot="hard">💪 Hard</button>
          <button type="button" class="g-btn g-good" data-slot="good">👍 Good</button>
          <button type="button" class="g-btn g-easy" data-slot="easy">⚡ Easy</button>
        </div>
        <p class="hint">Card ${i + 1} of ${order.length}</p>` : `<p class="hint">Card ${i + 1} of ${order.length} · tap "show answer"</p>`}`;
    const flip = target.querySelector('[data-action="flip"]');
    if (flip) flip.addEventListener('click', () => { shown = true; render(); });
    const targetSel = (sel, q) => {
      const b = target.querySelector(sel);
      if (b) b.addEventListener('click', () => {
        srs.set(l.upper + l.lower, grade(card, q));
        addXp(q >= 4 ? 4 : q >= 3 ? 2 : 0);
        recordActivity();
        markLetters([l.upper + l.lower]);
        recordAccuracy('alphabet-flash', q >= 3);
        shown = false; i++;
        render();
      });
    };
    targetSel('[data-slot="again2"]', 1);
    targetSel('[data-slot="hard"]', 3);
    targetSel('[data-slot="good"]', 4);
    targetSel('[data-slot="easy"]', 5);
  };
  render();
}

// ---- Read the word (cognates) ----
export function readExercise(target) {
  const qs = pickN(COGNATES_DATA, 8).map((c) => {
    const opts = pickN(COGNATES_DATA, 3).map((x) => x.en);
    const q = makeMc(`Read: «${c.es}» — what does it mean?`, c.en, opts.filter((o) => o !== c.en));
    q.es = c.es;
    q.en = c.en;
    return q;
  });
  runSession(target, { id: 'alpha-read', title: 'Read the word', icon: '👀' }, qs, { xp: 5 });
}

// ---- Typing drill ----
export function typeExercise(target) {
  const pool = [...COGNATES_DATA, ...[
    { es: 'mamá', en: 'mom' }, { es: 'papá', en: 'dad' }, { es: 'yo', en: 'I' },
    { es: 'tú', en: 'you' }, { es: 'no', en: 'no' }, { es: 'sí', en: 'yes' },
    { es: 'él', en: 'he' }, { es: 'ella', en: 'she' }
  ]];
  const qs = pickN(pool, 10).map((c) => {
    const q = makeType(`Type «${c.en}» in Spanish`, c.es);
    // makeType uses eq (accent-insensitive) already
    q.en = c.en;
    q.es = c.es;
    return q;
  });
  runSession(target, { id: 'alpha-type', title: 'Typing drill', icon: '⌨️' }, qs, { xp: 5 });
}

// ---- Reading drill: syllables → words → sentences ----
export function drillExercise(target) {
  const stages = [
    { label: 'Syllables', items: SYLLABLES, cols: 7 },
    { label: 'Words', items: READ_WORDS.map((w) => `${w.es} <i>${w.en}</i>`), cols: 5 },
    { label: 'Sentences', items: READ_SENTENCES.map((s) => `${s.es} <i>${s.en}</i>`), cols: 2 }
  ];
  let stage = 0;
  const renderStage = () => {
    const st = stages[stage];
    const items = Array.isArray(st.items) ? st.items : [];
    target.innerHTML = `
      <div class="drill">
        <div class="drill-head"><span class="pill">Stage ${stage + 1} of 3</span> <b>${esc(st.label)}</b></div>
        <div class="drill-shelf">
          ${items.map((it) => `<div class="drill-chip" data-speak="${esc(withStress(it))}">${it}</div>`).join('')}
        </div>
        <div class="btn-row">
          ${stage > 0 ? '<button type="button" class="ghost" data-action="prev">← Back</button>' : ''}
          ${stage < stages.length - 1 ? '<button type="button" class="primary" data-action="next">Next stage →</button>'
            : '<button type="button" class="primary" data-action="finish">Finish ✓</button>'}
        </div>
        <p class="hint">Read each item out loud, then tap 🔊 to check yourself. Tap the chip text to hear it.</p>
      </div>`;
    const mark = (sel, fn) => { const b = target.querySelector(sel); if (b) b.addEventListener('click', fn); };
    mark('[data-action="prev"]', () => { stage--; renderStage(); });
    mark('[data-action="next"]', () => { stage++; renderStage(); });
    mark('[data-action="finish"]', () => {
      markLetters(allLettersFrom(stages));

      addXp(10); recordActivity(); recordAccuracy('alphabet-drill', true);
      target.innerHTML = `<div class="ex-done"><h3>Reading drill complete!</h3><p>+10 XP. You can read real Spanish words now.</p><button type="button" class="primary" data-action="again">Do it again</button></div>`;
      const ag = target.querySelector('[data-action="again"]');
      if (ag) ag.addEventListener('click', () => { stage = 0; renderStage(); });
    });
  };
  renderStage();
}

function withStress(item) {
  if (item.includes('<i>')) return item.replace(/<i>.*?<\/i>/g, '');
  return item.replace(/<[^>]+>/g, '').trim();
}

function allLettersFrom(stages) {
  const chars = new Set();
  for (const st of stages) {
    const items = st.items || [];
    for (const it of items) {
      for (const ch of withStress(it)) if (/[a-zñáéíóúü]/i.test(ch)) chars.add(ch.toUpperCase());
    }
  }
  return [...chars];
}