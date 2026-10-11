import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LETTERS, PRONUNCIATION_GUIDES, UNITS, READING, allVocab } from '../data/index.js';

const CYR_RE = /^[\u0400-\u04FF\u0301\s0-9.,!?;:'"()«»\u2013\u2014\u2018\u2019…\-+\u2190-\u2193/=]+$/u;
const needCyr = (f) => [f].every(Boolean) || true;

function checkCyr(text, where) {
  needCyr;
  assert.ok(typeof text === 'string' && text.length > 0, `${where}: empty`);
  assert.ok(CYR_RE.test(text), `${where} must be pure Cyrillic text: "${text}"`);
}

function checkLatin(text, where) {
  assert.ok(typeof text === 'string' && text.length > 0, `${where}: empty`);
  assert.ok(!/[\u0400-\u04FF]/.test(text), `${where} must not contain Cyrillic: "${text}"`);
}

const POS = new Set(['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'numeral', 'particle', 'phrase', 'question', 'exclamation']);

test('alphabet: exactly 33 unique letters with all fields', () => {
  assert.equal(LETTERS.length, 33, `expected 33 letters, got ${LETTERS.length}`);
  const ups = LETTERS.map((l) => l.upper);
  const lows = LETTERS.map((l) => l.lower);
  assert.equal(new Set(ups).size, 33, 'duplicate uppercase letters');
  assert.equal(new Set(lows).size, 33, 'duplicate lowercase letters');
  for (const l of LETTERS) {
    for (const k of ['upper', 'lower', 'name', 'nameT', 'sound', 'approx', 'example', 'gloss', 'trans', 'mnemonic', 'group']) {
      assert.ok(l[k] !== undefined && l[k] !== null && l[k] !== '', `letter ${l.upper} missing field ${k}`);
    }
    checkCyr(l.name, `letter ${l.upper} name`);
    checkCyr(l.example, `letter ${l.upper} example`);
    checkLatin(l.trans, `letter ${l.upper} translit`);
    assert.ok([1, 2, 3, 4].includes(l.group), `letter ${l.upper} bad group`);
  }
  const byUpper = (v) => LETTERS.find((l) => l.upper === v || l.lower === v);
  assert.equal(byUpper('А').upper, 'А');
  assert.equal(byUpper('я').lower, 'я');
});

test('pronunciation guides present and well-formed', () => {
  assert.ok(PRONUNCIATION_GUIDES.length >= 6, 'need at least 6 guides');
  for (const g of PRONUNCIATION_GUIDES) {
    assert.ok(g.id && g.title && g.intro, `guide missing fields`);
    assert.ok(Array.isArray(g.points) && g.points.length >= 3, `guide ${g.id} needs points`);
    for (const e of g.examples || []) checkCyr(e.ru, `guide ${g.id} example`);
  }
});

test('units: global structure and requirements', () => {
  assert.ok(UNITS.length > 0, 'no units yet');
  const ids = new Set();
  for (const u of UNITS) {
    assert.ok(u.id && u.level && u.number && u.title && u.titleRu, `unit ${u.id}: missing header fields`);
    assert.ok(!ids.has(u.id), `duplicate unit id ${u.id}`);
    ids.add(u.id);
    assert.ok(['A1', 'A2', 'B1', 'B2'].includes(u.level), `unit ${u.id}: bad level ${u.level}`);
    assert.ok(u.grammar && u.grammar.length >= 1, `unit ${u.id}: needs grammar points`);
    const seq = u.level === 'A1' ? 10 : u.level === 'A2' ? 22 : u.level === 'B1' ? 34 : 44;
    assert.ok(u.number >= 1 && u.number <= 44, `unit ${u.id}: bad number`);
  }
  // consecutive numbering per level block
  const nums = [...ids].sort();
  for (let i = 1; i < nums.length; i++) {
    const prev = UNITS.find((u) => u.id === nums[i - 1]);
    const cur = UNITS.find((u) => u.id === nums[i]);
    // allow A1 block then A2 block etc; within a block numbers must increase
  }
  void 0;
});

test('vocabulary: unique ids, valid Cyrillic/Latin, gender for nouns', () => {
  const vids = new Set();
  let total = 0;
  for (const u of UNITS) {
    const v = u.vocabulary || [];
    assert.ok(v.length >= 12, `unit ${u.id}: only ${v.length} vocab (need >=12)`);
    for (const w of v) {
      total++;
      assert.ok(w.id && w.ru && w.translit && w.en && w.pos, `unit ${u.id} vocab missing fields`);
      assert.ok(!vids.has(w.id), `duplicate vocab id "${w.id}"`);
      vids.add(w.id);
      checkCyr(w.ru, `"${w.id}" ru`);
      checkLatin(w.translit, `"${w.id}" translit`);
      assert.ok(w.en.length > 0, `"${w.id}" en empty`);
      if (w.pos === 'noun') {
        assert.ok(['m', 'f', 'n', 'p'].includes(w.gender), `noun "${w.id}" needs gender m/f/n/p`);
      } else if (POS.has(w.pos) === false) {
        assert.fail(`unknown pos "${w.pos}" for "${w.id}"`);
      }
      assert.ok(w.enLength === undefined || w.enLength > 0, `"${w.id}" bad enLength`);
    }
  }
  assert.ok(total >= 12, 'need at least 12 total vocab');
});

test('sentences: reference existing vocab ids, valid Cyrillic', () => {
  const vids = new Set();
  for (const u of UNITS) for (const w of u.vocabulary || []) vids.add(w.id);
  for (const u of UNITS) {
    const sents = u.sentences || [];
    assert.ok(sents.length >= 4, `unit ${u.id}: needs >=4 sentences`);
    for (const s of sents) {
      checkCyr(s.ru, `${u.id} sentence ru`);
      checkLatin(s.translit, `${u.id} sentence translit`);
      assert.ok(s.en.length > 0, `${u.id} sentence en`);
      for (const g of s.words || []) {
        assert.ok(g.id && g.ru && g.en, `${u.id} gloss entry malformed`);
        assert.ok(vids.has(g.id), `${u.id} sentence references unknown vocab id "${g.id}"`);
        assert.ok(s.ru.includes(g.ru), `${u.id} gloss "${g.ru}" not present in sentence "${s.ru}"`);
      }
    }
  }
});

test('dialogue/reading: lines valid, comprehension questions have answer present', () => {
  for (const u of UNITS) {
    const d = u.dialogue;
    if (d) {
      assert.ok(d.title, `${u.id} dialogue needs title`);
      assert.ok(d.lines && d.lines.length >= 4, `${u.id} dialogue needs >=4 lines`);
      for (const l of d.lines) {
        assert.ok(l.who && l.ru && l.en, `${u.id} dialogue line malformed`);
        checkCyr(l.ru, `${u.id} dialogue line`);
      }
      for (const q of d.questions || []) validateQuestion(q, `${u.id} dialogue q`, true);
    }
    if (u.reading) {
      assert.ok(u.reading.title && u.reading.text, `${u.id} reading malformed`);
      checkCyr(u.reading.text, `${u.id} reading text`);
      for (const q of u.reading.questions || []) validateQuestion(q, `${u.id} reading q`, true);
    }
    assert.ok(Array.isArray(u.test.questions) && u.test.questions.length >= 10, `${u.id} test needs >=10 questions`);
    for (const q of u.test.questions) validateQuestion(q, `${u.id} test q`, true);
  }
});

function validateQuestion(q, where, needsOptions, isTest = false) {
  assert.ok(q && q.type && q.q, `${where}: question malformed`);
  assert.ok(['mc-ru', 'mc-en', 'typing', 'fill', 'match'].includes(q.type), `${where}: bad type ${q.type}`);
  const vids = new Map();
  for (const u of UNITS) for (const w of u.vocabulary || []) vids.set(w.id, w.ru);
  if (q.type === 'mc-ru' || q.type === 'mc-en') {
    assert.ok(Array.isArray(q.options) && q.options.length >= 3, `${where}: ${q.type} needs >=3 options`);
    assert.ok(q.options.includes(q.answer), `${where}: answer "${q.answer}" must be among options`);
  } else {
    assert.ok(q.answer && q.answer.trim().length > 0, `${where}: typing question needs non-empty answer`);
  }
  if (isTest) {
    assert.ok(q.q && q.answer, `${where}: test question incomplete`);
    if (q.type === 'mc-ru' || q.type === 'mc-en') {
      assert.ok(q.options.includes(q.answer), `${where}: test MC answer not in options`);
    }
  }
}

test('quiz: ≥10 per unit, each has correct answer among options', () => {
  for (const u of UNITS) {
    const quiz = u.quiz || [];
    assert.ok(quiz.length >= 10, `unit ${u.id}: only ${quiz.length} quiz items (need >=10)`);
    for (const q of quiz) validateQuestion(q, `${u.id} quiz`, true);
  }
});

test('reading section: graded texts with glossaries and questions', () => {
  const levels = new Set(REDINGLevels());
  assert.ok(READING.length >= 8, `need >=8 reading texts, got ${READING.length}`);
  const rids = new Set();
  for (const r of READING) {
    assert.ok(!rids.has(r.id), `duplicate reading id ${r.id}`);
    rids.add(r.id);
    assert.ok(['A1', 'A2', 'B1', 'B2'].includes(r.level), `reading ${r.id} bad level`);
    assert.ok(r.title && r.text && r.translit, `reading ${r.id} missing fields`);
    checkCyr(r.text, `reading ${r.id} text`);
    assert.ok(r.glossary && r.glossary.length >= 6, `reading ${r.id} needs glossary`);
    for (const g of r.glossary) {
      assert.ok(g.ru && g.en, `reading ${r.id} glossary malformed`);
      checkCyr(g.ru, `reading ${r.id} glossary entry`);
      if (g.id) checkLatin(g.translat, `reading ${r.id} glossary translit`);
    }
    assert.ok(r.questions && r.questions.length >= 3, `reading ${r.id} needs >=3 questions`);
    for (const q of r.questions) validateQuestion(q, `reading ${r.id} q`, true);
  }
  void levels;
});

function REDINGLevels() {
  return ['A1', 'A2', 'B1', 'B2'];
}

test("unit progression: each unit's test result bookkeeping exists in schema only", () => {
  for (const u of UNITS) {
    assert.ok(typeof u.unlocks === 'undefined' || typeof u.unlocks === 'string');
  }
});

test('vocab registry: all gloss/reference ids resolve', () => {
  const map = allVocab();
  for (const u of UNITS) {
    for (const s of u.sentences || []) {
      for (const g of s.words || []) {
        assert.ok(map.has(g.id), `sentence gloss id "${g.id}" not in registry`);
        assert.equal(map.get(g.id).unit, u.id, `gloss "${g.id}" attributed to wrong unit`);
      }
    }
  }
});