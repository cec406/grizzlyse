/* ============================================================
   Cyber Aware - tools/uitest.js
   Boots the real UI in jsdom: completes onboarding, renders every
   module, solves EVERY activity type, passes the assessment and
   checks the certificate + tool box.
   Usage: node tools/uitest.js
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = path.join(__dirname, '..');
const FILES = ['util', 'state', 'widgets', 'activities', 'content', 'content.core', 'content.advanced', 'ui', 'app'];
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { const msg = String(e.detail || e.message || e); if (/Not implemented/.test(msg)) return; errors.push('jsdomError: ' + msg); });
const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost/', virtualConsole: vc });
const { window } = dom;
window.onerror = (m) => errors.push('window.onerror: ' + m);
for (const f of FILES) { try { window.eval(fs.readFileSync(path.join(ROOT, 'js', f + '.js'), 'utf8')); } catch (e) { errors.push('LOAD ' + f + ': ' + e.message); } }

const CY = window.CY;
const $ = s => window.document.querySelector(s);
const $$ = s => Array.from(window.document.querySelectorAll(s));
if (!$('#view')) CY.App.boot();
function assert(c, m) { if (!c) errors.push('ASSERT: ' + m); }
function go(h) { window.location.hash = h; window.dispatchEvent(new window.Event('hashchange')); }
function click(sel) { const e = $(sel); if (e) e.click(); else errors.push('click missing: ' + sel); }

/* ---------- activity solvers ---------- */
function solveQuiz(root, act) {
  act.questions.forEach((q, i) => { const r = root.querySelector('input[name="q' + i + '"][value="' + q.a + '"]'); if (r) r.checked = true; });
  root.querySelector('#quiz-submit').click();
}
function solvePick(root, act) {
  act.items.forEach((it, i) => { if (it.correct) root.querySelector('.pick-box[data-i="' + i + '"]').click(); });
  root.querySelector('#pick-check').click();
}
function solveOrder(root, act) {
  let work = CY.makeRng(1234).shuffle(act.steps.slice());
  const correct = act.steps;
  for (let i = 0; i < correct.length; i++) {
    let j = work.indexOf(correct[i], i);
    while (j > i) {
      const b = root.querySelector('[data-up="' + j + '"]');
      b.click();
      const t = work[j]; work[j] = work[j - 1]; work[j - 1] = t;
      j--;
    }
  }
  root.querySelector('#order-check').click();
}
function solveMatch(root, act) {
  act.pairs.forEach((p, i) => {
    root.querySelector('.match-term[data-t="' + i + '"]').click();
    const d = Array.from(root.querySelectorAll('.match-def')).find(x => x.dataset.d === p[1]);
    d.click();
  });
  root.querySelector('#match-check').click();
}
function solveScenario(root, act) {
  function good(id) {
    const n = act.nodes[id];
    for (let i = 0; i < n.options.length; i++) {
      const o = n.options[i];
      if (o.outcome) { if (o.outcome.good) return [i]; }
      else { const sub = good(o.next); if (sub) return [i].concat(sub); }
    }
    return null;
  }
  const path = good(act.start);
  if (!path) { errors.push('no good scenario path'); return; }
  path.forEach(i => { const opts = root.querySelectorAll('.sc-opt'); opts[i].click(); });
}
function solvePassword(root, act) {
  const inp = root.querySelector('#pwd-in');
  inp.value = 'orange-ladder-seven-piano';
  inp.dispatchEvent(new window.Event('input', { bubbles: true }));
  root.querySelector('#pwd-check').click();
}
function solvePhish(root, act) {
  act.emails.forEach((em, i) => { root.querySelector('[data-i="' + i + '"][data-v="' + em.verdict + '"]').click(); });
  root.querySelector('#phish-check').click();
}
function solveActivity(root, act) {
  if (act.kind === 'quiz') return solveQuiz(root, act);
  if (act.kind === 'pick') return solvePick(root, act);
  if (act.kind === 'order') return solveOrder(root, act);
  if (act.kind === 'match') return solveMatch(root, act);
  if (act.kind === 'scenario') return solveScenario(root, act);
  if (act.kind === 'password') return solvePassword(root, act);
  if (act.kind === 'phish') return solvePhish(root, act);
  errors.push('unknown activity kind: ' + act.kind);
}

try {
  assert(CY && CY.App, 'CY.App exists');

  /* ---------- onboarding ---------- */
  go('#/home');
  assert($('#view').innerHTML.indexOf('Start training') !== -1, 'welcome screen shown when no name');
  assert(!!$('#welcome-name'), 'name field present');
  $('#welcome-name').value = 'Alex Morgan';
  click('#welcome-start');
  assert(CY.state.name === 'Alex Morgan', 'name saved');
  assert(window.location.hash === '#/tracks', 'onboarding leads to training');

  /* ---------- render every module & mount widgets ---------- */
  let vizFails = 0, modules = 0;
  CY.TRACKS.forEach(t => t.modules.forEach(m => {
    go('#/module/' + m.id);
    modules++;
    if ($('#view').innerHTML.length < 200) errors.push('module did not render: ' + m.id);
    $$('.viz-host').forEach(el => { if (el.innerHTML.indexOf('Tool unavailable') !== -1 || el.innerHTML.length < 10) { vizFails++; errors.push('viz failed in ' + m.id + ': ' + el.dataset.viz); } });
  }));
  assert(modules === CY.totalModules(), 'rendered all modules (' + modules + ')');
  assert(vizFails === 0, vizFails + ' widgets failed to mount');

  /* ---------- solve every activity ---------- */
  const byKind = {};
  CY.TRACKS.forEach(t => t.modules.forEach(m => {
    go('#/module/' + m.id);
    click('#act-start');
    const root = $('#act-root');
    assert(!!root, 'activity root rendered: ' + m.id);
    solveActivity(root, m.activity);
    byKind[m.activity.kind] = (byKind[m.activity.kind] || 0) + 1;
    if (!CY.moduleDone(m.id)) errors.push('module not completed after solving: ' + m.id + ' (' + m.activity.kind + ')');
  }));
  assert(CY.coreComplete(), 'core training complete');
  Object.keys(byKind).forEach(k => assert(byKind[k] >= 1, 'solved at least one ' + k));

  /* ---------- final assessment ---------- */
  go('#/assessment');
  assert(!!$('#assess-submit'), 'assessment rendered');
  CY.ASSESSMENT.questions.forEach((q, i) => { const r = $('input[name="A' + i + '"][value="' + q.a + '"]'); if (r) r.checked = true; });
  click('#assess-submit');
  assert(CY.state.assessment.best === 100, 'assessment scored 100%');
  assert(CY.state.assessment.passed, 'assessment passed');
  assert(CY.certificateEligible(), 'certificate now eligible');

  /* ---------- certificate ---------- */
  go('#/certificate');
  assert($('#view').innerHTML.indexOf('Certificate of Completion') !== -1, 'certificate renders');
  assert($('#view').innerHTML.indexOf('Alex Morgan') !== -1, 'certificate shows the learner name');
  assert($('#view').innerHTML.indexOf(CY.certCode()) !== -1, 'certificate shows verification code');

  /* ---------- tool box (all widgets) ---------- */
  go('#/tools');
  const toolCount = $$('.tool-item').length;
  assert(toolCount >= 8, 'tool box lists tools (' + toolCount + ')');
  for (let i = 0; i < toolCount; i++) {
    $$('.tool-item')[i].click();
    if (($('#tool-inner') || {}).innerHTML == null || $('#tool-inner').innerHTML.length < 20) errors.push('tool ' + i + ' rendered empty');
  }

  /* ---------- misc routes ---------- */
  ['#/tracks', '#/badges', '#/settings', '#/home'].forEach(h => { go(h); assert($('#view').innerHTML.length > 100, 'route renders: ' + h); });
  go('#/tracks');
  assert($('#view').innerHTML.indexOf('Security+') !== -1 && $('#view').innerHTML.indexOf('General Security Concepts') !== -1, 'Security+ coverage shown on the training page');

  /* ---------- progression ---------- */
  assert(CY.levelOf(CY.state.xp) >= 1, 'level computed');
  assert(Object.keys(CY.state.badges).length >= 3, 'badges awarded (' + Object.keys(CY.state.badges).length + ')');
} catch (e) {
  errors.push('RUNTIME: ' + (e && e.stack || e));
}

console.log('modules rendered:', CY.totalModules(), '| completed:', CY.coreProgress().done, '| xp:', CY.state.xp, '| badges:', Object.keys(CY.state.badges).length);
if (errors.length) {
  errors.slice(0, 40).forEach(e => console.log('  ' + e));
  console.log('UITEST FAILURES:', errors.length);
  process.exit(1);
} else {
  console.log('UI SMOKE TEST PASSED \u2713');
}
