// Tests for the added content: word packs, keyboard/accent trainer, professional track, roadmap.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { installNodeEnv } from './node-env.js';
import { install as installDom } from './dom-stub.js';

installNodeEnv();
installDom();

const SPAN_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s.,!?;:()«»"'\u2018\u2019\u201C\u201D¿¡…–—\-+/=]+$/u;
const POS = new Set(['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'numeral', 'particle', 'phrase', 'question', 'exclamation']);

function checkWord(w, where) {
  assert.ok(w.id && w.es && w.translit && w.en && w.pos, `${where}: missing fields`);
  assert.ok(!/[\u0400-\u04FF]/.test(w.es) && SPAN_RE.test(w.es), `${where}: es must be Spanish: "${w.es}"`);
  assert.ok(!/[\u0400-\u04FF]/.test(w.translit), `${where}: translit must be Latin: "${w.translit}"`);
  assert.ok(POS.has(w.pos), `${where}: bad pos "${w.pos}"`);
  if (w.pos === 'noun') assert.ok(['m', 'f', 'n', 'p'].includes(w.gender), `${where}: noun needs gender`);
}

test('word packs: structure, unique ids, valid words', async () => {
  const { WORD_PACKS, allPackWords } = await import('../data/word-packs.js');
  assert.ok(WORD_PACKS.length >= 8, `expected >=8 packs, got ${WORD_PACKS.length}`);
  const ids = new Set();
  for (const p of WORD_PACKS) {
    assert.ok(p.id && p.title && p.titleEs && p.stage && p.level && p.icon, `pack ${p.id} header`);
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
    assert.ok(m.id && m.title && m.titleEs && m.desc && m.level, `module ${m.id} header`);
    assert.ok(Array.isArray(m.terms) && m.terms.length >= 8, `module ${m.id} needs terms`);
    for (const t of m.terms) {
      assert.ok(SPAN_RE.test(t.es) && !/[\u0400-\u04FF]/.test(t.translit) && t.en, `term in ${m.id} malformed`);
    }
    for (const p of m.phrases || []) {
      assert.ok(SPAN_RE.test(p.es) && !/[\u0400-\u04FF]/.test(p.translit) && p.en, `phrase in ${m.id} malformed`);
    }
    if (m.dialogue) {
      assert.ok(m.dialogue.lines.length >= 4, `dialogue in ${m.id} too short`);
      for (const l of m.dialogue.lines) assert.ok(l.who && l.es && l.en, `dialogue line in ${m.id}`);
      for (const q of m.dialogue.questions || []) {
        assert.ok(q.type && q.q && q.answer, `dialogue question in ${m.id}`);
        assert.ok(q.options.includes(q.answer), `dialogue answer not in options in ${m.id}`);
      }
    }
  }
  assert.ok(allCyberTerms().length >= 60, 'expected a substantial professional glossary');
});

test('keyboard layout: all special characters documented; dead keys combine', async () => {
  const { SPECIAL_CHARS, ACCENT_ROWS, deadCombine, isDeadKey } = await import('../data/keyboard-layout.js');
  const chars = new Set(SPECIAL_CHARS.map((s) => s.ch));
  for (const ch of 'áéíóúüñÁÉÍÓÚÜÑ¿¡') assert.ok(chars.has(ch), `missing special char ${ch}`);
  for (const s of SPECIAL_CHARS) assert.ok(s.name && s.win && s.mac, `special ${s.ch} missing typing info`);
  assert.ok(ACCENT_ROWS.flat().includes('ñ') && ACCENT_ROWS.flat().includes('¿'));
  assert.equal(deadCombine("'", 'a'), 'á');
  assert.equal(deadCombine("'", 'A'), 'Á');
  assert.equal(deadCombine('"', 'u'), 'ü');
  assert.equal(deadCombine('~', 'n'), 'ñ');
  assert.equal(deadCombine('~', 'x'), null);
  assert.ok(isDeadKey("'") && isDeadKey('~') && !isDeadKey('a'));
});

test('keyboard lessons: non-empty, valid items', async () => {
  const { KEYBOARD_LESSONS } = await import('../data/keyboard-layout.js');
  assert.ok(KEYBOARD_LESSONS.length >= 6, `expected >=6 lessons, got ${KEYBOARD_LESSONS.length}`);
  for (const l of KEYBOARD_LESSONS) {
    assert.ok(l.id && l.title && l.icon && l.desc, `lesson ${l.id} header`);
    assert.ok(Array.isArray(l.items) && l.items.length >= 6, `lesson ${l.id} too short`);
    for (const it of l.items) assert.ok(typeof it === 'string' && it.length > 0, `lesson ${l.id} bad item`);
  }
});

test('roadmap: stages go from kindergarten to advanced', async () => {
  const { PATH_STAGES } = await import('../data/learning-path.js');
  assert.ok(PATH_STAGES.length >= 5, 'expected >=5 roadmap stages');
  assert.equal(PATH_STAGES[0].band.toLowerCase(), 'kindergarten');
  for (const s of PATH_STAGES) {
    assert.ok(s.id && s.band && s.title && s.titleEs && s.goal && s.milestone, `stage ${s.id} incomplete`);
    assert.ok(Array.isArray(s.links) && s.links.length >= 2, `stage ${s.id} needs links`);
    for (const l of s.links) assert.ok(l.label && /^#\//.test(l.href), `stage ${s.id} bad link`);
  }
});

test('lexicon builder combines units, packs and the professional track', async () => {
  const { buildLexicon } = await import('../js/views/vocab.js');
  const lex = buildLexicon();
  assert.ok(lex.length >= 900, `expected a large lexicon, got ${lex.length}`);
  const ids = new Set(lex.map((w) => w.id));
  assert.equal(ids.size, lex.length, 'lexicon contains duplicate ids');
  assert.ok(lex.some((w) => w.pack === 'pack-k-basics'), 'lexicon missing the kindergarten pack');
  assert.ok(lex.some((w) => /^cyber-/.test(w.pack)), 'lexicon missing the professional track');
});

test('lexicon pack tags match the dictionary filter values (regression)', async () => {
  const { buildLexicon } = await import('../js/views/vocab.js');
  const { WORD_PACKS } = await import('../data/word-packs.js');
  const { CYBER_MODULES } = await import('../data/cyber.js');
  const lex = buildLexicon();
  const tags = new Set(lex.map((w) => w.pack));
  for (const p of WORD_PACKS) assert.ok(tags.has('pack-' + p.id), `no lexicon entries tagged pack-${p.id}`);
  for (const m of CYBER_MODULES) assert.ok(tags.has('cyber-' + m.id), `no lexicon entries tagged cyber-${m.id}`);
  for (const p of WORD_PACKS) {
    assert.ok(lex.filter((w) => w.pack === 'pack-' + p.id).length > 0, `filtering pack-${p.id} returns no words`);
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
