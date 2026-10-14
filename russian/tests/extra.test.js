// Tests for the added content: word packs, keyboard layout, professional track, roadmap.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { installNodeEnv } from './node-env.js';
import { install as installDom } from './dom-stub.js';

installNodeEnv();
installDom();

const CYR_RE = /^[\u0400-\u04FF\u0301\s0-9.,!?;:'"()«»\-–—…]+$/u;
const POS = new Set(['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'numeral', 'particle', 'phrase', 'question', 'exclamation']);

function checkWord(w, where) {
  assert.ok(w.id && w.ru && w.translit && w.en && w.pos, `${where}: missing fields`);
  assert.ok(CYR_RE.test(w.ru), `${where}: ru must be Cyrillic: "${w.ru}"`);
  assert.ok(!/[\u0400-\u04FF]/.test(w.translit), `${where}: translit must be Latin: "${w.translit}"`);
  assert.ok(POS.has(w.pos), `${where}: bad pos "${w.pos}"`);
  if (w.pos === 'noun') assert.ok(['m', 'f', 'n', 'p'].includes(w.gender), `${where}: noun needs gender`);
}

test('word packs: structure, unique ids, valid words', async () => {
  const { WORD_PACKS, allPackWords } = await import('../data/word-packs.js');
  assert.ok(WORD_PACKS.length >= 8, `expected >=8 packs, got ${WORD_PACKS.length}`);
  const ids = new Set();
  for (const p of WORD_PACKS) {
    assert.ok(p.id && p.title && p.titleRu && p.stage && p.level && p.icon, `pack ${p.id} header`);
    assert.ok(p.words.length >= 20, `pack ${p.id} too small (${p.words.length})`);
    for (const w of p.words) {
      checkWord(w, `pack ${p.id}/${w.id}`);
      assert.ok(!ids.has(w.id), `duplicate pack word id ${w.id}`);
      ids.add(w.id);
    }
  }
  const all = allPackWords();
  assert.ok(all.length >= 200, `expected >=200 pack words, got ${all.length}`);
  for (const w of all) assert.ok(w.pack && w.stage, `flattened word ${w.id} missing pack tags`);
});

test('professional track: terms, phrases and dialogues are well-formed', async () => {
  const { CYBER_MODULES, allCyberTerms } = await import('../data/cyber.js');
  assert.ok(CYBER_MODULES.length >= 5, `expected >=5 modules, got ${CYBER_MODULES.length}`);
  for (const m of CYBER_MODULES) {
    assert.ok(m.id && m.title && m.titleRu && m.desc && m.level, `module ${m.id} header`);
    assert.ok(Array.isArray(m.terms) && m.terms.length >= 10, `module ${m.id} needs terms`);
    for (const t of m.terms) {
      assert.ok(CYR_RE.test(t.ru) && !/[\u0400-\u04FF]/.test(t.translit) && t.en, `term in ${m.id} malformed`);
    }
    for (const p of m.phrases || []) {
      assert.ok(CYR_RE.test(p.ru) && !/[\u0400-\u04FF]/.test(p.translit) && p.en, `phrase in ${m.id} malformed`);
    }
    if (m.dialogue) {
      assert.ok(m.dialogue.lines.length >= 4, `dialogue in ${m.id} too short`);
      for (const l of m.dialogue.lines) assert.ok(l.who && l.ru && l.en, `dialogue line in ${m.id}`);
      for (const q of m.dialogue.questions || []) {
        assert.ok(q.type && q.q && q.answer, `dialogue question in ${m.id}`);
        assert.ok(q.options.includes(q.answer), `dialogue answer not in options in ${m.id}`);
      }
    }
  }
  assert.ok(allCyberTerms().length >= 60, 'expected a substantial professional glossary');
});

test('keyboard layout: every letter mapped exactly once with a valid finger', async () => {
  const { KEY_ROWS_DATA, ALL_KEYS, ruFromKeydown } = await import('../data/keyboard-layout.js');
  const ruKeys = ALL_KEYS.filter((k) => /[а-яё]/.test(k.ru));
  const ruSet = new Set(ruKeys.map((k) => k.ru));
  assert.equal(ruSet.size, 33, `expected 33 Russian letters mapped, got ${ruSet.size}`);
  const usSeen = new Set();
  for (const k of ALL_KEYS) {
    assert.ok(k.ru && k.us && k.upper && k.finger, `key ${k.ru} incomplete`);
    assert.ok(!usSeen.has(k.us), `US key ${k.us} mapped to two letters`);
    usSeen.add(k.us);
  }
  // Latin keydown translation round-trips for every letter.
  for (const k of ruKeys) {
    assert.equal(ruFromKeydown(k.us), k.ru, `us ${k.us} should yield ${k.ru}`);
    assert.equal(ruFromKeydown(k.upper), k.ru, `uppercase cyrillic should still find ${k.ru}`);
  }
});

test('keyboard lessons: non-empty, valid items', async () => {
  const { KEYBOARD_LESSONS } = await import('../data/keyboard-layout.js');
  assert.ok(KEYBOARD_LESSONS.length >= 6, `expected >=6 lessons, got ${KEYBOARD_LESSONS.length}`);
  for (const l of KEYBOARD_LESSONS) {
    assert.ok(l.id && l.title && l.icon && l.desc, `lesson ${l.id} header`);
    assert.ok(Array.isArray(l.items) && l.items.length >= 10, `lesson ${l.id} too short`);
    for (const it of l.items) assert.ok(typeof it === 'string' && it.length > 0, `lesson ${l.id} bad item`);
  }
});

test('roadmap: stages are ordered from kindergarten to professional', async () => {
  const { PATH_STAGES } = await import('../data/learning-path.js');
  assert.ok(PATH_STAGES.length >= 5, 'expected >=5 roadmap stages');
  assert.equal(PATH_STAGES[0].band.toLowerCase(), 'kindergarten');
  for (const s of PATH_STAGES) {
    assert.ok(s.id && s.band && s.title && s.titleRu && s.goal && s.milestone, `stage ${s.id} incomplete`);
    assert.ok(Array.isArray(s.links) && s.links.length >= 2, `stage ${s.id} needs links`);
    for (const l of s.links) assert.ok(l.label && /^#\//.test(l.href), `stage ${s.id} bad link`);
  }
});

test('lexicon builder combines units, packs and the professional track', async () => {
  const { buildLexicon } = await import('../js/views/vocab.js');
  const lex = buildLexicon();
  assert.ok(lex.length >= 1000, `expected a large lexicon, got ${lex.length}`);
  const byId = new Set(lex.map((w) => w.id));
  assert.equal(byId.size, lex.length, 'lexicon contains duplicate ids');
  assert.ok(lex.some((w) => w.pack === 'pack-k-basics'), 'lexicon missing the kindergarten pack');
  assert.ok(lex.some((w) => /^cyber-/.test(w.pack)), 'lexicon missing the professional track');
});

test('lexicon pack tags match the dictionary filter values (regression)', async () => {
  const { buildLexicon } = await import('../js/views/vocab.js');
  const { WORD_PACKS } = await import('../data/word-packs.js');
  const { CYBER_MODULES } = await import('../data/cyber.js');
  const lex = buildLexicon();
  const tags = new Set(lex.map((w) => w.pack));
  // Every pack option value the UI emits must match stored tags, or the filter shows nothing.
  for (const p of WORD_PACKS) {
    assert.ok(tags.has('pack-' + p.id), `no lexicon entries tagged pack-${p.id}`);
  }
  for (const m of CYBER_MODULES) {
    assert.ok(tags.has('cyber-' + m.id), `no lexicon entries tagged cyber-${m.id}`);
  }
  // A pack with words must yield results once filtered on its own tag.
  for (const p of WORD_PACKS) {
    const n = lex.filter((w) => w.pack === 'pack-' + p.id).length;
    assert.ok(n > 0, `filtering pack-${p.id} returns no words`);
  }
});

test('roadmap stages reference real word packs', async () => {
  const { PATH_STAGES } = await import('../data/learning-path.js');
  const { packById } = await import('../data/word-packs.js');
  for (const s of PATH_STAGES) {
    if (!s.pack) continue;
    const pack = packById(s.pack);
    assert.ok(pack, `stage ${s.id} references missing pack ${s.pack}`);
    assert.ok(pack.words.length >= 6, `stage ${s.id} pack too small to preview`);
  }
});
