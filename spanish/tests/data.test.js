import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LETTERS, PRONUNCIATION_GUIDES, DIALECTS, UNITS, READING, allVocab } from '../data/index.js';

// Spanish text: Latin letters (with Spanish accents and ñ), digits and the
// punctuation this course uses. Cyrillic is explicitly rejected below.
const SPAN_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s.,!?;:()«»"'\u2018\u2019\u201C\u201D¿¡…–—\u2190-\u2193\-+/=]+$/u;

function checkSpanish(text, where) {
  assert.ok(typeof text === 'string' && text.length > 0, `${where}: empty`);
  assert.ok(!/[\u0400-\u04FF]/.test(text), `${where} must not contain Cyrillic: "${text}"`);
  assert.ok(SPAN_RE.test(text), `${where} must be Spanish text: "${text}"`);
}

// Pronunciation respellings and ids: any non-empty Latin string without Cyrillic.
function checkLatin(text, where) {
  assert.ok(typeof text === 'string' && text.length > 0, `${where}: empty`);
  assert.ok(!/[\u0400-\u04FF]/.test(text), `${where} must not contain Cyrillic: "${text}"`);
}

const POS = new Set(['noun', 'verb', 'adjective', 'adverb', 'pronoun', 'preposition', 'conjunction', 'interjection', 'numeral', 'particle', 'phrase', 'question', 'exclamation']);
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

test('alphabet: exactly 27 unique letters with all fields', () => {
  assert.equal(LETTERS.length, 27, `expected 27 letters, got ${LETTERS.length}`);
  const ups = LETTERS.map((l) => l.upper);
  const lows = LETTERS.map((l) => l.lower);
  assert.equal(new Set(ups).size, 27, 'duplicate uppercase letters');
  assert.equal(new Set(lows).size, 27, 'duplicate lowercase letters');
  for (const l of LETTERS) {
    for (const k of ['upper', 'lower', 'name', 'nameT', 'sound', 'approx', 'example', 'gloss', 'trans', 'mnemonic', 'group']) {
      assert.ok(l[k] !== undefined && l[k] !== null && l[k] !== '', `letter ${l.upper} missing field ${k}`);
    }
    checkSpanish(l.example, `letter ${l.upper} example`);
    checkLatin(l.trans, `letter ${l.upper} translit`);
    assert.ok([1, 2, 3, 4].includes(l.group), `letter ${l.upper} bad group`);
  }
  assert.ok(LETTERS.some((l) => l.upper === 'Ñ'), 'alphabet must include Ñ');
  const byUpper = (v) => LETTERS.find((l) => l.upper === v || l.lower === v);
  assert.equal(byUpper('A').upper, 'A');
  assert.equal(byUpper('ñ').lower, 'ñ');
});

test('pronunciation guides present and well-formed', () => {
  assert.ok(PRONUNCIATION_GUIDES.length >= 6, 'need at least 6 guides');
  for (const g of PRONUNCIATION_GUIDES) {
    assert.ok(g.id && g.title && g.intro, 'guide missing fields');
    assert.ok(Array.isArray(g.points) && g.points.length >= 3, `guide ${g.id} needs points`);
    for (const e of g.examples || []) checkSpanish(e.es, `guide ${g.id} example`);
  }
});

test('units: global structure and requirements', () => {
  assert.equal(UNITS.length, 48, `expected 48 units, got ${UNITS.length}`);
  const ids = new Set();
  const nums = new Set();
  for (const u of UNITS) {
    assert.ok(u.id && u.level && u.number && u.title && u.titleEs, `unit ${u.id}: missing header fields`);
    assert.ok(!ids.has(u.id), `duplicate unit id ${u.id}`);
    ids.add(u.id);
    assert.ok(!nums.has(u.number), `duplicate unit number ${u.number}`);
    nums.add(u.number);
    assert.ok(LEVELS.includes(u.level), `unit ${u.id}: bad level ${u.level}`);
    assert.ok(u.grammar && u.grammar.length >= 1, `unit ${u.id}: needs grammar points`);
    assert.ok(u.number >= 1 && u.number <= 48, `unit ${u.id}: bad number ${u.number}`);
  }
  for (let n = 1; n <= 48; n++) assert.ok(nums.has(n), `missing unit number ${n}`);
  assert.equal(UNITS.filter((u) => u.level === 'A1').length, 10);
  assert.equal(UNITS.filter((u) => u.level === 'A2').length, 10);
  assert.equal(UNITS.filter((u) => u.level === 'B1').length, 10);
  assert.equal(UNITS.filter((u) => u.level === 'B2').length, 10);
  assert.equal(UNITS.filter((u) => u.level === 'C1').length, 8);
});

test('vocabulary: unique ids, valid Spanish, gender for nouns', () => {
  const vids = new Set();
  let total = 0;
  for (const u of UNITS) {
    const v = u.vocabulary || [];
    assert.ok(v.length >= 12, `unit ${u.id}: only ${v.length} vocab (need >=12)`);
    for (const w of v) {
      total++;
      assert.ok(w.id && w.es && w.translit && w.en && w.pos, `unit ${u.id} vocab missing fields`);
      assert.ok(!vids.has(w.id), `duplicate vocab id "${w.id}"`);
      vids.add(w.id);
      checkSpanish(w.es, `"${w.id}" es`);
      checkLatin(w.translit, `"${w.id}" translit`);
      assert.ok(w.en.length > 0, `"${w.id}" en empty`);
      if (w.pos === 'noun') {
        assert.ok(['m', 'f', 'n', 'p'].includes(w.gender), `noun "${w.id}" needs gender m/f/p`);
      } else if (POS.has(w.pos) === false) {
        assert.fail(`unknown pos "${w.pos}" for "${w.id}"`);
      }
    }
  }
  assert.ok(total >= 12, 'need at least 12 total vocab');
});

test('sentences: reference existing vocab ids, valid Spanish', () => {
  const vids = new Set();
  for (const u of UNITS) for (const w of u.vocabulary || []) vids.add(w.id);
  for (const u of UNITS) {
    const sents = u.sentences || [];
    assert.ok(sents.length >= 4, `unit ${u.id}: needs >=4 sentences`);
    for (const s of sents) {
      checkSpanish(s.es, `${u.id} sentence es`);
      checkLatin(s.translit, `${u.id} sentence translit`);
      assert.ok(s.en.length > 0, `${u.id} sentence en`);
      for (const g of s.words || []) {
        assert.ok(g.id && g.es && g.en, `${u.id} gloss entry malformed`);
        assert.ok(vids.has(g.id), `${u.id} sentence references unknown vocab id "${g.id}"`);
        assert.ok(s.es.includes(g.es), `${u.id} gloss "${g.es}" not present in sentence "${s.es}"`);
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
      assert.ok(Array.isArray(d.questions) && d.questions.length >= 3, `${u.id} dialogue needs >=3 questions`);
      for (const l of d.lines) {
        assert.ok(l.who && l.es && l.en, `${u.id} dialogue line malformed`);
        checkSpanish(l.es, `${u.id} dialogue line`);
      }
      for (const q of d.questions) validateQuestion(q, `${u.id} dialogue q`, true);
    }
    if (u.reading) {
      assert.ok(u.reading.title && u.reading.text, `${u.id} reading malformed`);
      checkSpanish(u.reading.text, `${u.id} reading text`);
      for (const q of u.reading.questions || []) validateQuestion(q, `${u.id} reading q`, true);
    }
    assert.ok(Array.isArray(u.test.questions) && u.test.questions.length >= 10, `${u.id} test needs >=10 questions`);
    for (const q of u.test.questions) validateQuestion(q, `${u.id} test q`, true);
  }
});

function validateQuestion(q, where, needsOptions, isTest = false) {
  assert.ok(q && q.type && q.q, `${where}: question malformed`);
  assert.ok(['mc-es', 'mc-en', 'typing', 'fill', 'match'].includes(q.type), `${where}: bad type ${q.type}`);
  if (q.type === 'mc-es' || q.type === 'mc-en') {
    assert.ok(Array.isArray(q.options) && q.options.length >= 3, `${where}: ${q.type} needs >=3 options`);
    assert.ok(q.options.includes(q.answer), `${where}: answer "${q.answer}" must be among options`);
  } else {
    assert.ok(q.answer && q.answer.trim().length > 0, `${where}: typing question needs non-empty answer`);
  }
  if (isTest) {
    assert.ok(q.q && q.answer, `${where}: test question incomplete`);
    if (q.type === 'mc-es' || q.type === 'mc-en') {
      assert.ok(q.options.includes(q.answer), `${where}: test MC answer not in options`);
    }
  }
}

test('quiz: >=10 per unit, each has correct answer among options', () => {
  for (const u of UNITS) {
    const quiz = u.quiz || [];
    assert.ok(quiz.length >= 10, `unit ${u.id}: only ${quiz.length} quiz items (need >=10)`);
    for (const q of quiz) validateQuestion(q, `${u.id} quiz`, true);
  }
});

test('reading section: graded texts with glossaries and questions', () => {
  assert.ok(READING.length >= 20, `need >=20 reading texts, got ${READING.length}`);
  const rids = new Set();
  for (const r of READING) {
    assert.ok(!rids.has(r.id), `duplicate reading id ${r.id}`);
    rids.add(r.id);
    assert.ok(LEVELS.includes(r.level), `reading ${r.id} bad level`);
    assert.ok(r.title && r.titleEs && r.text && r.translit, `reading ${r.id} missing fields`);
    checkSpanish(r.text, `reading ${r.id} text`);
    checkLatin(r.translit, `reading ${r.id} translit`);
    assert.ok(r.glossary && r.glossary.length >= 6, `reading ${r.id} needs glossary`);
    for (const g of r.glossary) {
      assert.ok(g.es && g.en, `reading ${r.id} glossary malformed`);
      checkSpanish(g.es, `reading ${r.id} glossary entry`);
    }
    assert.ok(r.questions && r.questions.length >= 3, `reading ${r.id} needs >=3 questions`);
    for (const q of r.questions) validateQuestion(q, `reading ${r.id} q`, true);
  }
});

test('dialects: regions have accent notes, slang and phrases', () => {
  assert.ok(DIALECTS.length >= 4, `need >=4 dialect regions, got ${DIALECTS.length}`);
  const ids = new Set();
  for (const d of DIALECTS) {
    assert.ok(d.id && d.name && d.tagline && d.blurb, `dialect ${d.id} missing fields`);
    assert.ok(!ids.has(d.id), `duplicate dialect id ${d.id}`);
    ids.add(d.id);
    assert.ok(Array.isArray(d.accent) && d.accent.length >= 3, `dialect ${d.id} needs accent notes`);
    assert.ok(Array.isArray(d.slang) && d.slang.length >= 6, `dialect ${d.id} needs slang`);
    for (const s of d.slang) {
      assert.ok(s.es && s.en, `dialect ${d.id} slang entry malformed`);
      checkSpanish(s.es, `dialect ${d.id} slang`);
    }
    assert.ok(Array.isArray(d.phrases) && d.phrases.length >= 3, `dialect ${d.id} needs phrases`);
    for (const p of d.phrases) checkSpanish(p.es, `dialect ${d.id} phrase`);
    assert.ok(Array.isArray(d.culture) && d.culture.length >= 2, `dialect ${d.id} needs culture notes`);
  }
  assert.ok(DIALECTS.some((d) => d.id === 'pr'), 'dialects must include Puerto Rico');
});

test('unit progression: each unit test result bookkeeping exists in schema only', () => {
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
