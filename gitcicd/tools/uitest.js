/* ============================================================
   GitCI/CD Hero - tools/uitest.js
   Boots the real UI in jsdom, renders every chapter, and drives
   a git mission, a CI mission, a quiz, and the sandboxes.
   Usage: node tools/uitest.js
   ============================================================ */
'use strict';
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = path.join(__dirname, '..');
const FILES = ['util', 'state', 'git', 'graph', 'ci', 'content', 'content.git', 'content.cicd', 'content.advanced', 'content.capstone', 'ui', 'app'];

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push('jsdomError: ' + (e.detail || e.message)));

const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost/', virtualConsole: vc });
const { window } = dom;
window.onerror = (m) => errors.push('window.onerror: ' + m);
for (const f of FILES) {
  try { window.eval(fs.readFileSync(path.join(ROOT, 'js', f + '.js'), 'utf8')); }
  catch (e) { errors.push('LOAD ' + f + ': ' + e.message); }
}

const GH = window.GH;
const $ = (s) => window.document.querySelector(s);
const $$ = (s) => Array.from(window.document.querySelectorAll(s));
if (!$('#view')) GH.App.boot();
function assert(c, m) { if (!c) errors.push('ASSERT: ' + m); }
function go(h) { window.location.hash = h; window.dispatchEvent(new window.Event('hashchange')); }
function typeCmd(str) {
  const i = $('#term-input'); i.value = str;
  $('#term-form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
}

try {
  assert(GH && GH.App, 'GH.App exists');
  assert($('#view').innerHTML.length > 200, 'home renders');
  assert($('#hud').innerHTML.indexOf('Lv') !== -1, 'HUD renders');

  // routes
  ['#/tracks', '#/sandbox', '#/ci', '#/cheatsheet', '#/badges', '#/settings', '#/home'].forEach(h => {
    go(h); assert($('#view').innerHTML.length > 100, 'view renders: ' + h);
  });

  // every track page
  GH.TRACKS.forEach(t => { go('#/track/' + t.id); assert($('#view').innerHTML.length > 200 && $('#view').innerHTML.indexOf(t.chapters[0].title.replace(/&/g, '&amp;')) !== -1, 'track renders: ' + t.id); });

  // every chapter page + mission zone
  let chapters = 0;
  GH.TRACKS.forEach(t => t.chapters.forEach(c => {
    go('#/chapter/' + c.id);
    chapters++;
    if ($('#view').innerHTML.length < 200) errors.push('chapter did not render: ' + c.id);
    const dm = $('#do-mission');
    if (c.mission && dm) {
      dm.click();
      if ($('#missionzone').innerHTML.length < 50) errors.push('mission zone empty: ' + c.id);
    }
  }));
  assert(chapters === GH.totalChapters(), 'rendered all chapters (' + chapters + ')');

  // ---- solve a git mission end to end ----
  go('#/chapter/g-first-repo');
  $('#do-mission').click();
  assert($('#terminal') && $('#objectives'), 'git workspace rendered');
  typeCmd('git init');
  window.GH.Git.writeFile('README.md', '# My project\n');
  if (typeof window.GH.App._internals === 'undefined') { /* ok */ }
  GH.qs('#file-list'); // ensure exists
  typeCmd('git add .');
  typeCmd('git commit -m "Initial commit"');
  assert($('#terminal').innerHTML.indexOf('git commit') !== -1, 'terminal shows history');
  assert(GH.missionDone('g-first-repo-m'), 'git mission completed by solving it');
  assert($('#objectives').innerHTML.indexOf('obj ok') !== -1, 'objectives show as complete');

  // ---- editor: open a file, edit, save ----
  go('#/sandbox');
  $('#sb-clone').click();
  const fileBtn = $('#file-list .file-item');
  assert(!!fileBtn, 'cloned repo lists files');
  fileBtn.click();
  assert(!!$('#ed-text'), 'editor opened');
  $('#ed-text').value = '# Edited\n';
  $('#ed-save').click();
  assert(window.GH.Git.work[fileBtn.dataset.file] === '# Edited\n', 'editor save writes to work tree');

  // ---- CI mission ----
  go('#/chapter/ci-first');
  $('#do-mission').click();
  assert(!!$('#ci-text'), 'ci workspace rendered');
  $('#ci-text').value = 'name: CI\non: [push]\njobs:\n  hello:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo "hi"\n';
  const evt = new window.Event('input', { bubbles: true }); $('#ci-text').dispatchEvent(evt);
  $('#ci-run').click();
  assert($('#pipeline-box').innerHTML.indexOf('job-card') !== -1, 'pipeline rendered after run');
  assert($('#pipeline-box').innerHTML.indexOf('All jobs passed') !== -1, 'pipeline passed');
  assert(GH.missionDone('ci-first-m'), 'ci mission completed');

  // ---- quiz ----
  go('#/chapter/g-intro');
  $('#do-mission').click();
  const quiz = GH.chapterById('g-intro').mission;
  assert(!!$('.quiz'), 'quiz rendered');
  quiz.questions.forEach((q, i) => { const r = $('input[name="q' + i + '"][value="' + q.a + '"]'); if (r) r.checked = true; });
  $('#quiz-submit').click();
  assert($('#quiz-result').innerHTML.indexOf('100%') !== -1, 'quiz scored 100%');
  assert(GH.missionDone('g-intro-q'), 'quiz mission completed');

  // ---- CI sandbox: failing workflow should be reported as failed ----
  go('#/ci');
  $('#ci-text').value = 'name: t\non: [push]\njobs:\n  t:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: exit 1\n';
  $('#ci-text').dispatchEvent(new window.Event('input', { bubbles: true }));
  $('#ci-run').click();
  assert($('#ci-status').innerHTML.indexOf('failed') !== -1, 'sandbox detects failing pipeline');

  // ---- capstone: solve both deliverables through the UI ----
  go('#/capstone');
  assert($('#view').innerHTML.indexOf('Ship a production pipeline') !== -1, 'capstone renders');
  assert(GH.CAPSTONE.length >= 2, 'capstone has deliverables');

  // deliverable A (git): auto-loads first incomplete
  assert($('#terminal') && $('#term-prompt'), 'capstone git workspace + prompt rendered');
  assert($('#term-prompt').textContent.indexOf('you@gitcicd') !== -1 && $('#term-prompt').textContent.indexOf('main') !== -1, 'terminal prompt shows user@host (branch)');
  window.GH.Git.writeFile('.gitignore', 'node_modules/\n');
  typeCmd('git add .');
  typeCmd('git commit -m "chore: add gitignore"');
  typeCmd('git switch -c feature/ci');
  window.GH.Git.writeFile('ci.yml', 'name: CI\n');
  typeCmd('git add .');
  typeCmd('git commit -m "ci: add pipeline config"');
  typeCmd('git switch main');
  typeCmd('git merge feature/ci');
  window.GH.Git.writeFile('README.md', '# Project\n\nCI enabled.\n');
  typeCmd('git add .');
  typeCmd('git commit -m "docs: note CI"');
  typeCmd('git tag -a v1.0.0 -m "release"');
  assert(GH.missionDone('cap-git-m'), 'capstone deliverable A (git) completed');

  // deliverable B (ci): load it and run the reference solution
  GH.qsa('[data-cap]').forEach(b => { if (b.dataset.cap === 'cap-ci') b.click(); });
  assert(!!$('#ci-text'), 'capstone ci workspace rendered');
  const capCi = GH.CAPSTONE.filter(c => c.id === 'cap-ci')[0];
  $('#ci-text').value = capCi.mission.solution;
  $('#ci-text').dispatchEvent(new window.Event('input', { bubbles: true }));
  $('#ci-run').click();
  assert($('#pipeline-box').innerHTML.indexOf('All jobs passed') !== -1, 'capstone pipeline passes');
  assert(GH.missionDone('cap-ci-m'), 'capstone deliverable B (ci) completed');
  go('#/capstone');
  assert($('#view').innerHTML.indexOf('Capstone complete') !== -1, 'capstone certificate shown');

  // ---- progression ----
  assert(GH.capstoneDone(), 'capstoneDone() true');
  assert(GH.levelOf(GH.state.xp) >= 1, 'level computed');
  assert(Object.keys(GH.state.missions).length >= 5, 'multiple missions recorded');
} catch (e) {
  errors.push('RUNTIME: ' + (e && e.stack || e));
}

console.log('chapters rendered, missions done:', Object.keys(GH.state.missions).length, '| xp:', GH.state.xp);
if (errors.length) {
  errors.slice(0, 30).forEach(e => console.log('  ' + e));
  console.log('UITEST FAILURES:', errors.length);
  process.exit(1);
} else {
  console.log('UI SMOKE TEST PASSED \u2713');
}
