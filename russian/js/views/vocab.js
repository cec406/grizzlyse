// Vocabulary explorer: the whole searchable English ⇄ Russian lexicon.
// Search in English, Russian or transliteration; filter by level, pack and part of speech.
import { esc } from '../ui.js';
import { UNITS } from '../../data/index.js';
import { WORD_PACKS, allPackWords } from '../../data/word-packs.js';
import { CYBER_MODULES } from '../../data/cyber.js';
import { markWords, wordsLearned, addXp, recordActivity } from '../state.js';
import { rememberRight } from '../srs-store.js';
import { stripStress } from '../keyboard.js';

const LEVELS = ['all', 'A0', 'A1', 'A2', 'B1', 'B2'];
const POS_LABELS = {
  noun: 'noun', verb: 'verb', adjective: 'adjective', adverb: 'adverb',
  pronoun: 'pronoun', preposition: 'preposition', conjunction: 'conjunction',
  interjection: 'interjection', numeral: 'numeral', particle: 'particle',
  phrase: 'phrase', question: 'question', exclamation: 'exclamation'
};
const GENDER = { m: 'masc.', f: 'fem.', n: 'neut.', p: 'plural' };
const CHUNK = 120;

// Build the full lexicon once from every content source.
let CACHE = null;
export function buildLexicon() {
  if (CACHE) return CACHE;
  const map = new Map();
  const add = (w) => {
    if (!w || !w.ru || !w.id || !w.en) return;
    if (map.has(w.id)) return;
    map.set(w.id, {
      id: w.id,
      ru: w.ru,
      translit: w.translit || '',
      en: w.en,
      pos: w.pos || 'word',
      gender: w.gender || '',
      level: w.level || '',
      source: w.source || '',
      pack: w.pack || ''
    });
  };
  for (const u of UNITS) {
    for (const w of u.vocabulary || []) {
      add({ ...w, level: u.level, source: `Unit ${u.number} · ${u.title}`, pack: 'unit-' + u.id });
    }
  }
  for (const w of allPackWords()) {
    const pack = WORD_PACKS.find((p) => p.id === w.pack);
    add({ ...w, level: w.level, source: (pack ? pack.title : 'Word pack'), pack: 'pack-' + w.pack });
  }
  for (const m of CYBER_MODULES) {
    for (const t of m.terms || []) add({ ...t, level: m.level, source: m.title, pack: 'cyber-' + m.id });
  }
  // Drop entries that share an identical Russian word + English meaning (different sources).
  const seenKey = new Set();
  const out = [];
  for (const w of map.values()) {
    const key = stripStress(w.ru).toLowerCase() + '|' + w.en.toLowerCase();
    if (seenKey.has(key)) continue;
    seenKey.add(key);
    out.push(w);
  }
  CACHE = out;
  return CACHE;
}

function match(word, q) {
  if (!q) return true;
  const ru = stripStress(word.ru).toLowerCase();
  const en = word.en.toLowerCase();
  const tr = (word.translit || '').toLowerCase();
  return ru.includes(q) || en.includes(q) || tr.includes(q);
}

function filterList(filters) {
  const q = (filters.q || '').trim().toLowerCase();
  const learned = new Set(wordsLearned());
  return buildLexicon().filter((w) => {
    if (filters.level && filters.level !== 'all' && w.level !== filters.level) return false;
    if (filters.pack && filters.pack !== 'all' && w.pack !== filters.pack) return false;
    if (filters.pos && filters.pos !== 'all' && w.pos !== filters.pos) return false;
    if (filters.learned === 'yes' && !learned.has(w.id)) return false;
    if (filters.learned === 'no' && learned.has(w.id)) return false;
    if (!match(w, q)) return false;
    return true;
  });
}

function row(w) {
  const learned = wordsLearned().includes(w.id);
  const gender = w.gender ? ` <span class="mini">${esc(GENDER[w.gender] || w.gender)}</span>` : '';
  const lvl = w.level ? `<span class="lk">${esc(w.level)}</span>` : '';
  return `
  <div class="lex-row${learned ? ' learned' : ''}" data-id="${esc(w.id)}">
    <div class="lex-main">
      <button type="button" class="lex-ru" data-speak="${esc(stripStress(w.ru))}" title="Play audio">${esc(w.ru)} 🔊</button>
      <div class="lex-trans">${esc(w.translit)}</div>
      <div class="lex-en">${esc(w.en)}${gender}</div>
    </div>
    <div class="lex-side">
      ${lvl}
      <span class="mini lex-src">${esc(w.source)}</span>
      <span class="mini lex-pos">${esc(POS_LABELS[w.pos] || w.pos)}</span>
      <button type="button" class="btn small lex-learn" data-action="learn" data-id="${esc(w.id)}" ${learned ? 'disabled' : ''}>${learned ? '✓' : '+ learned'}</button>
    </div>
  </div>`;
}

function listHtml(filters, limit) {
  const list = filterList(filters);
  const shown = list.slice(0, limit);
  if (!list.length) return `<div class="hint-box">No words match. Try a different search or filter.</div>`;
  return `
    <p class="hint">${list.length} word${list.length === 1 ? '' : 's'} found${list.length > shown.length ? ` — showing first ${shown.length}` : ''}.</p>
    <div class="lex-list">${shown.map(row).join('')}</div>
    ${list.length > shown.length ? `<div class="btn-row"><button type="button" class="btn" data-action="more">Show ${Math.min(CHUNK, list.length - shown.length)} more</button></div>` : ''}`;
}

export function render(params = {}) {
  const initialPack = params.pack ? 'pack-' + params.pack : 'all';
  const packOptions = [
    `<option value="all">All sources</option>`,
    WORD_PACKS.map((p) => `<option value="pack-${p.id}" ${initialPack === 'pack-' + p.id ? 'selected' : ''}>${esc(p.icon)} ${esc(p.title)} (${p.words.length})</option>`).join(''),
    CYBER_MODULES.map((m) => `<option value="cyber-${m.id}" ${initialPack === 'cyber-' + m.id ? 'selected' : ''}>🛡 ${esc(m.title)}</option>`).join('')
  ].join('');
  const total = buildLexicon().length;
  return `
  <section class="lexicon">
    <h1>Слова́рь <small>vocabulary</small></h1>
    <p class="lead">Search the whole lexicon — ${total} words and phrases with romanisation and audio. <b>Type English to get the Russian word(s)</b>, type Russian to get the meaning, or type the romanisation.</p>
    <div class="lex-toolbar">
      <input type="search" class="lex-search" placeholder="Search English, Russian or transliteration…" autocomplete="off">
      <div class="lex-filters">
        <select data-filter="level">
          ${LEVELS.map((lv) => `<option value="${lv}">${lv === 'all' ? 'All levels' : esc(lv)}</option>`).join('')}
        </select>
        <select data-filter="pack">${packOptions}</select>
        <select data-filter="pos">
          <option value="all">All parts of speech</option>
          ${Object.keys(POS_LABELS).map((p) => `<option value="${p}">${esc(POS_LABELS[p])}</option>`).join('')}
        </select>
        <select data-filter="learned">
          <option value="all">Learned or not</option>
          <option value="yes">Only learned</option>
          <option value="no">Only not learned</option>
        </select>
      </div>
    </div>
    <div data-slot="list"></div>
  </section>`;
}

export function attach(root, params = {}) {
  const state = {
    q: '',
    level: 'all',
    pack: params.pack ? 'pack-' + params.pack : 'all',
    pos: 'all',
    learned: 'all',
    limit: CHUNK
  };
  const slot = root.querySelector ? root.querySelector('[data-slot="list"]') : null;
  if (!slot) return;
  const paint = (reset) => {
    if (reset) state.limit = CHUNK;
    slot.innerHTML = listHtml(state, state.limit);
  };
  paint(false);

  const search = root.querySelector ? root.querySelector('.lex-search') : null;
  if (search && search.addEventListener) {
    search.addEventListener('input', () => { state.q = search.value; paint(true); });
  }
  if (root.querySelectorAll) {
    root.querySelectorAll('[data-filter]').forEach((sel) => {
      sel.addEventListener('change', () => {
        state[sel.getAttribute('data-filter')] = sel.value;
        paint(true);
      });
    });
  }
  const select = root.querySelector ? root.querySelector('[data-filter="learned"]') : null;
  void select;
  if (root.addEventListener) {
    root.addEventListener('click', (e) => {
      const more = e.target.closest ? e.target.closest('[data-action="more"]') : null;
      if (more) { state.limit += CHUNK; paint(false); return; }
      const learn = e.target.closest ? e.target.closest('[data-action="learn"]') : null;
      if (learn) {
        const id = learn.getAttribute('data-id');
        markWords([id]);
        rememberRight(id, 3);
        addXp(2); recordActivity();
        learn.textContent = '✓'; learn.disabled = true;
        const r = learn.closest ? learn.closest('.lex-row') : null;
        if (r && r.classList) r.classList.add('learned');
      }
    });
  }
}
