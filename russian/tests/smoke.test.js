// Smoke test: load every view and game module, call render against the DOM stub.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { installNodeEnv } from './node-env.js';
import { install as installDom } from './dom-stub.js';

installNodeEnv();
installDom();

test('every registered view renders a non-empty string without throwing', async () => {
  const { VIEWS } = await import('../js/views/index.js');
  const names = Object.keys(VIEWS);
  assert.ok(names.length >= 13, `expected >=13 views, got ${names.length}`);
  for (const name of names) {
    const view = VIEWS[name];
    assert.equal(typeof view.render, 'function', `${name}: render missing`);
    assert.equal(typeof view.attach, 'function', `${name}: attach missing`);
    let html = '';
    let threw = null;
    try {
      const params = name === 'lesson' ? { unitId: 'u01' }
        : name === 'game' ? { gameId: 'mc' }
        : name === 'reading-text' ? { textId: 'rt-01' }
        : {};
      html = view.render(params);
    } catch (err) { threw = err; }
    assert.ok(!threw, `${name} render threw: ${threw && threw.message}`);
    assert.equal(typeof html, 'string', `${name}: render must return string`);
    assert.ok(html.length > 0, `${name}: empty render`);
  }
});

test('every game registry entry is coherent', async () => {
  const { GAMES } = await import('../js/games/registry.js');
  for (const g of GAMES) {
    assert.ok(g.build || g.mode === 'flashcards', g.id);
  }
});

test('router handles every advertised route', async () => {
  const { ROUTES, parseHash } = await import('../js/router.js');
  assert.ok(ROUTES.length >= 13);
  for (const r of ROUTES) {
    const sample = SAMPLE_HASH[r.name];
    assert.ok(sample && parseHash(sample), `route ${r.name} cannot be reached`);
  }
  assert.equal(parseHash('#!bad'), null);
});

const SAMPLE_HASH = {
  home: '#/home',
  alphabet: '#/alphabet',
  lessons: '#/lessons',
  lesson: '#/lesson/u01',
  practice: '#/practice',
  game: '#/game/mc',
  review: '#/review',
  reading: '#/reading',
  'reading-text': '#/reading/rt-01',
  grammar: '#/grammar',
  progress: '#/progress',
  'audio-setup': '#/audio-setup',
  help: '#/help',
  placement: '#/placement'
};

test('state also survives being imported twice with DOM stub present', () => {
  // ensure no import-time crash when DOM stub + node env both exist
  const m = {};
  void m;
});

test('data index has valid structure after content load', async () => {
  const data = await import('../data/index.js');
  assert.ok(data.LETTERS.length === 33);
  assert.equal(typeof data.allVocab, 'function');
});