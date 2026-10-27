// Engine unit tests: state, srs, keyboard, router, game logic, builders.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { installNodeEnv } from './node-env.js';

installNodeEnv();

import {
  levelFromXp, levelProgress, nextStreak, loadState, saveState, resetState,
  addXp, recordActivity, recordAccuracy, accuracyPct, markLesson, lessonDone,
  markLetters, lettersLearned, markWords, wordsLearned, setPlacement, placementInfo,
  addBadge, badges, setBest, bestFor, setSettings, settings, getCard, setCard, allMastery,
  exportStateJSON, importStateJSON
} from '../js/state.js';

import {
  newCard, grade, isDue, dueQueue, intervalDays, demote, summary, mostDue
} from '../js/srs.js';

import {
  stripAccents, toLower, normalizeAnswer, answersEqual, looksSpanish, letterCountOf, KEY_ROWS, allKeys
} from '../js/keyboard.js';

import { parseHash, href } from '../js/router.js';

import {
  makeSession, grade as g, answerRecord, finishSession, xpFor, makeMc, makeType, eq, difficultyConf
} from '../js/games/logic.js';

import { buildMc, buildTyping, buildScramble, buildFill } from '../js/games/builders.js';

test('state: level curve', () => {
  assert.equal(levelFromXp(0), 1);
  assert.equal(levelFromXp(149), 1);
  assert.equal(levelFromXp(150), 2);
  assert.equal(levelFromXp(450), 3);
  const p = levelProgress(450);
  assert.equal(p.level, 3);
  assert.ok(p.pct >= 0 && p.pct <= 100);
});

test('state: streak logic incl. midnight break', () => {
  assert.equal(nextStreak(null, '2026-10-10', 0), 1);
  assert.equal(nextStreak('2026-10-10', '2026-10-10', 3), 3);
  assert.equal(nextStreak('2026-10-09', '2026-10-10', 5), 6);
  assert.equal(nextStreak('2026-10-08', '2026-10-10', 5), 1);
});

test('state: persistence + guard on missing localStorage', () => {
  resetState();
  addXp(10);
  const s1 = loadState();
  assert.equal(s1.xp, 10);
  const raw = globalThis.localStorage.getItem('spanish-app-state-v1');
  assert.ok(raw && JSON.parse(raw).xp === 10);
  resetState();
  const backup = globalThis.localStorage;
  globalThis.localStorage = undefined;
  resetState();
  assert.equal(loadState().xp, 0);
  addXp(5);
  assert.equal(loadState().xp, 5);
  globalThis.localStorage = backup;
});

test('state: activity, accuracy, words, placement, badges, mastery, import/export', () => {
  resetState();
  recordActivity('2026-10-10');
  recordActivity('2026-10-10');
  assert.equal(loadState().streak, 1);
  recordAccuracy('typing', true, 1);
  recordAccuracy('typing', false, 1);
  assert.equal(accuracyPct('typing'), 50);
  markLesson('u01');
  assert.ok(lessonDone('u01'));
  markLetters(['Aa', 'Ññ']);
  assert.deepEqual(lettersLearned(), ['Aa', 'Ññ']);
  markWords(['w1']);
  markWords(['w1']);
  assert.equal(wordsLearned().length, 1);
  setPlacement('A2');
  assert.deepEqual(placementInfo(), { done: true, level: 'A2' });
  addBadge('b1');
  assert.ok(badges().includes('b1'));
  setBest('mc', 80);
  setBest('mc', 60);
  assert.equal(bestFor('mc'), 80);
  setSettings({ audio: false });
  assert.equal(settings().audio, false);
  setCard('v1', { box: 2, due: 123 });
  assert.equal(getCard('v1').box, 2);
  assert.ok(allMastery().v1);
  const json = exportStateJSON();
  resetState();
  importStateJSON(json);
  assert.ok(getCard('v1'));
});

test('srs: boxes and due dates', () => {
  const now = 1_700_000_000_000;
  const c = newCard('x', now);
  assert.equal(c.box, 0);
  assert.ok(isDue(c, now));
  assert.equal(intervalDays(1), 1);
  assert.equal(intervalDays(5), 15);
  const g1 = grade(c, 5, now);
  assert.equal(g1.box, 1);
  assert.ok(!isDue(g1, now));
  assert.ok(isDue(g1, now + 86400000));
  const g2 = grade(g1, 4, now + 86400000);
  assert.equal(g2.box, 2);
  const dem = demote(g2, now + 2 * 86400000);
  assert.equal(dem.box, 1);
  assert.equal(dem.lapses, 1);
  const bad = grade(c, 0, now);
  assert.equal(bad.box, 1);
  const allGood = [1, 2, 3, 4, 5].reduce((c2) => grade(c2, 5, now + 999999), c);
  assert.equal(allGood.box, 5);
});

test('srs: dueQueue sorts and limits; demotion survives box 1', () => {
  const now = 0;
  const dueA = newCard('a', now);
  const dueB = newCard('b', now);
  const future = { ...newCard('c', now), due: 10_000 };
  const q = dueQueue([future, dueB, dueA], now, 30);
  assert.ok(q.includes(dueA) && q.includes(dueB));
  assert.ok(!q.includes(future));
  const capped = dueQueue([dueA, dueB, future], now, 1);
  assert.equal(capped.length, 1);
  const demoted = demote(grade(newCard('d', now), 5, now), now);
  assert.equal(demoted.box, 1);
  assert.equal(summary([]).total, 0);
});

test('srs: empty input edge — grade never returns non-card', () => {
  const c = newCard('z', 0);
  const r = grade(c, 2, 0);
  assert.equal(r.box >= 1 && r.box <= 5, true);
});

test('keyboard: accent-insensitive normalization', () => {
  assert.equal(stripAccents('café'), 'cafe');
  assert.equal(stripAccents('niño'), 'nino');
  assert.equal(stripAccents('ÁÉÍÓÚÜÑ'), 'AEIOUUN');
  assert.equal(toLower('Hola'), 'hola');
  assert.equal(normalizeAnswer('¡Hola!!'), 'hola');
  assert.equal(normalizeAnswer('  Café!  '), 'cafe');
  assert.equal(normalizeAnswer('¿Cómo estás?'), 'como estas');
  assert.ok(answersEqual('si', 'sí'));
  assert.ok(answersEqual('nino', 'niño'));
  assert.ok(answersEqual('Como Estas.', '¿cómo estás?'));
  assert.ok(!answersEqual('', 'hola'));
  assert.ok(!answersEqual('perro', 'pero'));
  assert.ok(looksSpanish('hola'));
  assert.ok(!looksSpanish('привет'));
  assert.equal(letterCountOf('niño!'), 4);
  assert.equal(allKeys().length, 16);
  assert.equal(KEY_ROWS.length, 3);
});

test('router: parse and href round-trips', () => {
  assert.deepEqual(parseHash('#/home'), { name: 'home', params: {} });
  assert.deepEqual(parseHash('#/lesson/u-01'), { name: 'lesson', params: { unitId: 'u-01' } });
  assert.deepEqual(parseHash('#/reading/rt-1'), { name: 'reading-text', params: { textId: 'rt-1' } });
  assert.deepEqual(parseHash('#/dialects'), { name: 'dialects', params: {} });
  assert.equal(parseHash('#/nope'), null);
  assert.equal(href('lesson', { unitId: 'u02' }), '#/lesson/u02');
  assert.equal(href('game', { gameId: 'mc' }), '#/game/mc');
  assert.equal(parseHash(href('game', { gameId: 'typing' })).name, 'game');
});

test('logic: sessions and scoring', () => {
  const diff = difficultyConf('medium');
  assert.equal(diff.count, 12);
  const q = makeMc('Q', 'hola', ['pero', 'casa'], Math.random);
  assert.ok(q.options.includes('hola'));
  const s = makeSession('mc', [q, q], diff);
  const r1 = g(q, 'hola');
  assert.ok(r1.ok);
  assert.ok(!g(q, 'pero').ok);
  s.answers.push(answerRecord(q, 'hola', r1, 10));
  s.answers.push(answerRecord(q, 'pero', { ok: false, accepted: 'hola' }, 20));
  const fin = finishSession(s);
  assert.equal(fin.ok, 1);
  assert.equal(fin.total, 2);
  assert.equal(fin.pct, 50);
  assert.equal(fin.mistakes.length, 1);
  assert.equal(xpFor(0, 2, diff), 0);
  assert.equal(xpFor(2, 2, diff), 2 * diff.xp + 5);
});

test('logic: typing eq is accent/case/ñ insensitive', () => {
  const t = makeType('Type', 'niño', []);
  assert.ok(t.check('nino'));
  assert.ok(t.check('NIÑO'));
  assert.ok(t.check('Niño!'));
  assert.ok(t.check('nino'));
  assert.ok(!t.check('perro'));
  assert.ok(eq('cómo estás', 'como estas'));
});

test('builders: mc/typing/fill produce valid questions', () => {
  const pool = [
    { id: 'a1', es: 'hola', translit: 'OH-lah', en: 'hello' },
    { id: 'a2', es: 'gracias', translit: 'GRAH-syas', en: 'thank you' },
    { id: 'a3', es: 'adiós', translit: 'ah-DYOS', en: 'goodbye' },
    { id: 'a4', es: 'sí', translit: 'see', en: 'yes' },
    { id: 'a5', es: 'no', translit: 'no', en: 'no' }
  ];
  const mcs = buildMc({ pool, count: 4 });
  assert.equal(mcs.length, 4);
  for (const m of mcs) assert.ok(m.options.includes(m.correct));
  const tys = buildTyping({ pool, count: 3 });
  for (const t of tys) assert.ok(t.check(pool.find((p) => p.id === t.did).es));
  const sentences = [{
    es: 'Hola, ¿cómo estás?',
    translit: 'OH-lah KOH-mo es-TAS',
    en: 'Hello, how are you?',
    words: [{ id: 'a1', es: 'Hola', en: 'hello' }]
  }];
  const fills = buildFill({ sentences, pool, count: 2 });
  assert.ok(fills.length >= 1);
  assert.ok(fills[0].options.includes(fills[0].correct));
  assert.equal(fills[0].did, 'a1');
  assert.equal(buildScramble({ pool, sentences, count: 2 }).length, 2);
  void answerRecord;
});

test('registry: all 12 games present', async () => {
  const { GAMES } = await import('../js/games/registry.js');
  assert.equal(GAMES.length, 12);
  for (const g of GAMES) {
    assert.ok(g.id && g.title && g.icon && g.desc);
  }
});
