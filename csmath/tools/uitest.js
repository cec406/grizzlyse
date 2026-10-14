/* ============================================================
   CSMath Hero - tools/uitest.js
   Boots the real UI in jsdom and drives a full session,
   a choice-based session, and a boss trial.
   Usage:  node tools/uitest.js
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = path.join(__dirname, '..');
const FILES = [
  'util', 'state', 'problems', 'curriculum', 'viz', 'lessons', 'features',
  'gen.foundations', 'gen.prealgebra', 'gen.algebra', 'gen.functions', 'gen.trig',
  'gen.calculus', 'gen.discrete', 'gen.linalg', 'gen.probability', 'gen.algorithms', 'gen.cs',
  'lesson.foundations', 'lesson.algebra', 'lesson.calculus', 'lesson.linalg', 'lesson.cs',
  'ui', 'app'
];

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push('jsdomError: ' + (e.detail || e.message)));
vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));

const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost/', virtualConsole: vc });
const { window } = dom;
window.onerror = (m) => errors.push('window.onerror: ' + m);

// execute the app's scripts in order, in the window context
for (const f of FILES) {
  const code = fs.readFileSync(path.join(ROOT, 'js', f + '.js'), 'utf8');
  try { window.eval(code); }
  catch (e) { errors.push('LOAD ' + f + ': ' + e.message); }
}

const MH = window.MH;
const $ = (s) => window.document.querySelector(s);

// the app boots on DOMContentLoaded; ensure it has run under jsdom
if (!window.document.querySelector('#view')) MH.App.boot();

function assert(cond, msg) { if (!cond) errors.push('ASSERT: ' + msg); }

try {
  // boot
  assert(MH && MH.App, 'MH.App exists');
  assert($('#view').innerHTML.length > 100, 'home view rendered');
  assert($('#hud').innerHTML.indexOf('Lv') !== -1, 'HUD rendered');

  // navigate routes
  ['#/map', '#/stats', '#/achievements', '#/codex', '#/settings', '#/realm/fnd', '#/home'].forEach(h => {
    window.location.hash = h;
    window.dispatchEvent(new window.Event('hashchange'));
    assert($('#view').innerHTML.length > 50, 'view rendered for ' + h);
  });

  // ---- render EVERY lesson and mount EVERY visual widget ----
  let lessonFails = 0, vizFails = 0, vizzesMounted = 0;
  MH.ALL_SKILLS.forEach(sk => {
    window.location.hash = '#/lesson/' + sk.id;
    window.dispatchEvent(new window.Event('hashchange'));
    if ($('#view').innerHTML.length < 200) { lessonFails++; errors.push('lesson did not render: ' + sk.id); }
    window.document.querySelectorAll('.viz-host').forEach(el => {
      if (el.querySelector('.viz-loading') || el.innerHTML.indexOf('loading') !== -1) { vizFails++; errors.push('viz did not mount in ' + sk.id + ': ' + el.dataset.vizIdx); }
      else vizzesMounted++;
    });
  });
  assert(lessonFails === 0, lessonFails + ' lessons failed to render');
  assert(vizFails === 0, vizFails + ' widgets failed to mount');
  assert(vizzesMounted >= 20, 'expected many widgets mounted, got ' + vizzesMounted);
  // interact with a widget (bit boxes) to make sure handlers work
  window.location.hash = '#/lesson/bits.binary';
  window.dispatchEvent(new window.Event('hashchange'));
  const bit = $('#view .bitbox');
  if (bit) { const before = $('#view .viz-readout').innerHTML; bit.click(); assert($('#view .viz-readout').innerHTML !== before, 'bitbox interaction updates readout'); }
  // mark a lesson learned and confirm it sticks
  window.location.hash = '#/lesson/fnd.integers';
  window.dispatchEvent(new window.Event('hashchange'));
  $('#les-done').click();
  assert(MH.lessonStudied('fnd.integers'), 'lesson marks as studied');
  assert(MH.lessonsStudiedCount() >= 1, 'lessonsStudiedCount counts');

  // ---- new mode views ----
  ['#/paths', '#/notebook', '#/exam'].forEach(h => {
    window.location.hash = h;
    window.dispatchEvent(new window.Event('hashchange'));
    assert($('#view').innerHTML.length > 100, 'view rendered for ' + h);
  });
  window.location.hash = '#/paths'; window.dispatchEvent(new window.Event('hashchange'));
  const useBtn = $('#view [data-use]');
  if (useBtn) { useBtn.click(); assert(MH.state.path === useBtn.dataset.use, 'path selection persists'); }

  // ---- export / import round trip ----
  assert(MH.exportProgress().length > 20, 'export produces JSON');
  assert(MH.importProgress(MH.exportProgress()) === true, 'import round trip works');

  // ---- mock exam runs synchronously to a report ----
  MH.App.startExam({ realmIds: ['fnd'], count: 5, minutes: 0 });
  let eg = 0;
  while (eg++ < 30) {
    const inp = $('#ansinput');
    if (inp) { inp.value = 'x'; $('#ansform').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })); }
    else if ($('.choice')) { $('.choice').click(); }
    if ($('#btn-again')) break;
  }
  assert($('#btn-again'), 'exam reached its report');
  assert(MH.state.exams.length >= 1, 'exam recorded in history');
  $('#btn-home').click();

  // ---- a wrong answer lands in the mistake notebook ----
  const beforeMistakes = MH.state.mistakes.length;
  MH.App.startSkill('fnd.integers');
  { const inp = $('#ansinput'); inp.value = 'not-a-number'; $('#ansform').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })); }
  assert(MH.state.mistakes.length > beforeMistakes, 'mistake notebook records a miss');
  if ($('#btn-next')) $('#btn-next').click();
  $('#overlay').classList.add('hidden');

  // ---- drive a numeric practice session to completion ----
  MH.App.startSkill('fnd.integers');
  // use the built-in calculator to build "sin(30)" and evaluate it
  if ($('#btn-calc')) {
    $('#btn-calc').click();
    assert(!$('#calcpanel').classList.contains('hidden'), 'calculator panel opens');
    const type = (t) => {
      const k = [...window.document.querySelectorAll('.calc-key')].find(b => b.dataset.t === t);
      if (k) k.click();
    };
    type('sin('); type('3'); type('0'); type(')'); type('eq');
    assert($('#ansinput').value === '0.5', '= evaluates the expression, got: ' + $('#ansinput').value);
    assert($('#calc-preview').innerHTML.indexOf('0.5') !== -1, 'live preview shows the result');
    $('#btn-calc').click(); // close
  }
  let guard = 0;
  let answered = 0;
  while ($('#overlay') && !$('#overlay').classList.contains('hidden') && guard++ < 40) {
    const inp = $('#ansinput');
    if (inp) {
      inp.value = '7';
      $('#ansform').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
      answered++;
    } else if ($('.choice')) {
      $('.choice').click(); answered++;
    }
    const next = $('#btn-next');
    if (next) next.click();
    else break;
    // if results screen, stop
    if ($('#btn-again')) break;
  }
  assert(answered > 0, 'answered at least one problem');
  assert($('#btn-again') || $('#btn-home'), 'session reached results screen');

  // ---- choice-based session (inequalities) ----
  $('#btn-home').click();
  MH.App.startSkill('pre.inequality');
  guard = 0;
  while ($('#overlay') && !$('#overlay').classList.contains('hidden') && guard++ < 40) {
    const c = $('.choice');
    if (c) c.click();
    const next = $('#btn-next');
    if (next) next.click(); else break;
    if ($('#btn-again')) break;
  }
  assert($('#btn-again'), 'choice session finished');
  $('#btn-home').click();

  // ---- boss trial ----
  MH.App.startBoss('fnd');
  guard = 0;
  while ($('#overlay') && !$('#overlay').classList.contains('hidden') && guard++ < 40) {
    const inp = $('#ansinput');
    if (inp) { inp.value = '1'; $('#ansform').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })); }
    else if ($('.choice')) { $('.choice').click(); }
    const next = $('#btn-next');
    if (next) next.click(); else break;
    if ($('#btn-again')) break;
  }
  assert($('#btn-again'), 'boss session finished');
  assert(MH.state.bosses.fnd, 'boss result recorded');

  // ---- progression sanity ----
  MH.App.startSkill('fnd.order');
  for (let i = 0; i < 25; i++) MH.registerAnswer('fnd.order', true, 3);
  assert(MH.skillLevel('fnd.order') > 1, 'skill levels up with correct answers');
  assert(MH.stars('fnd.order') === 5, 'stars cap at 5');
  assert(MH.levelOf(MH.state.xp) >= 1, 'level computed');
} catch (e) {
  errors.push('RUNTIME: ' + (e && e.stack || e));
}

console.log('assertions run, problems in state:', MH.state.solved);
if (errors.length) {
  errors.slice(0, 25).forEach(e => console.log('  ' + e));
  console.log('UITEST FAILURES:', errors.length);
  process.exit(1);
} else {
  console.log('UI SMOKE TEST PASSED \u2713');
}
