/* =========================================================================
 * app.js — the UI: terminal, missions, code lab, CTF, awards.
 * Everything below talks to the simulated world in js/. Nothing here touches
 * the player's computer, and nothing sends data anywhere.
 * ========================================================================= */

import { MISSIONS, CHAPTERS } from './content/missions.js';
import { CODE_LESSONS } from './content/codelab.js';
import { CTF_CHALLENGES } from './content/ctf.js';
import { ACHIEVEMENTS, evaluateAchievements, levelProgress } from './content/achievements.js';
import { VFS } from './fs.js';
import { BashShell } from './bash.js';
import { WinShell } from './windows.js';
import { winFromUnix } from './util.js';
import { DEFAULT_NET } from './net.js';

const $ = (sel) => {
  const el = document.querySelector(sel);
  if (!el) console.warn('ZeroDay: missing element ' + sel);
  return el;
};
const $$ = (sel) => Array.from(document.querySelectorAll(sel));
const STORE_KEY = 'zer0day-academy-v1';

/* =========================================================================
 * saved progress
 * ========================================================================= */

const defaultState = () => ({
  xp: 0,
  commandsRun: 0,
  commands: [],
  missionsDone: [],
  labsSolved: [],
  ctfSolved: [],
  achievements: [],
  currentMission: MISSIONS[0].id,
  hintsUsed: 0,
  started: Date.now(),
});

let state = defaultState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) state = Object.assign(defaultState(), JSON.parse(raw));
  } catch { state = defaultState(); }
}

function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch { /* private mode */ }
}

/* =========================================================================
 * the current session (mission, CTF or sandbox)
 * ========================================================================= */

let session = null;
let history = [];
let historyIndex = -1;
let pendingPasswordFor = null;

function newSession({ mode, mission, kind, cwd, fs, net, sudoPassword, credentials, title }) {
  const vm = {
    commands: [],
    flags: new Set(),
    killedPids: [],
    sudoPassword: sudoPassword || null,
    credentials: credentials || {},
    net: net || null,
    processes: null,
  };
  const ShellClass = kind === 'bash' ? BashShell : WinShell;
  const shell = new ShellClass({ fs, vm, kind, cwd, home: kind === 'bash' ? '/home/player' : '/C:/Users/Player' });
  session = {
    mode, mission: mission || null, shell, fs, vm,
    completed: new Set(), done: false, hints: 0, title,
  };
  history = [];
  historyIndex = -1;
  updatePrompt();
  $('#termTitle').textContent = `${title || 'session'} — ${kind === 'bash' ? 'bash' : kind === 'powershell' ? 'PowerShell' : 'cmd'}`;
  return session;
}

/* =========================================================================
 * terminal rendering
 * ========================================================================= */

function termBody() { return $('#termBody'); }

function clearTerminal() {
  termBody().innerHTML = '';
}

function print(text, cls = 'out') {
  if (text === undefined || text === null || text === '') return;
  const body = termBody();
  const lines = String(text).replace(/\u0000CLEAR\u0000/g, '').split('\n');
  for (const line of lines) {
    const div = document.createElement('div');
    div.className = 'line ' + cls;
    div.textContent = line === '' ? ' ' : line;
    body.appendChild(div);
  }
  body.scrollTop = body.scrollHeight;
}

function printHtml(html, cls = 'sys') {
  const body = termBody();
  const div = document.createElement('div');
  div.className = 'line ' + cls;
  div.innerHTML = html;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function promptText() {
  if (!session) return 'player@lab:~$';
  const sh = session.shell;
  if (sh.kind === 'powershell') return `PS ${winFromUnix(sh.cwd)}>`;
  if (sh.kind === 'cmd') return `${winFromUnix(sh.cwd)}>`;
  const host = sh.hostName ? `${sh.hostName}` : 'lab';
  return `player@${host}:${sh.cwd}$`;
}

function updatePrompt() {
  const raw = promptText();
  const el = $('#prompt');
  if (session && session.shell.kind === 'bash') {
    const idx = raw.lastIndexOf(':');
    el.innerHTML = `<span class="u">${escapeHtml(raw.slice(0, idx))}</span>${escapeHtml(raw.slice(idx))}`;
  } else {
    el.textContent = raw;
  }
}

function echoPrompt(input) {
  const raw = promptText();
  const body = termBody();
  const div = document.createElement('div');
  div.className = 'line echo';
  div.innerHTML = `<span class="p">${escapeHtml(raw)}</span> ${escapeHtml(input)}`;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* =========================================================================
 * running a command
 * ========================================================================= */

function runCommand(input) {
  if (!session) return;
  const text = String(input);
  echoPrompt(text);
  if (!text.trim()) return;
  history = history.filter((h) => h !== text);
  history.push(text);
  historyIndex = history.length;

  let result = session.shell.run(text);

  // a password was requested (sudo / ssh)
  if (typeof result.err === 'string' && result.err.includes('\u0000ASKPWD\u0000')) {
    result = { ...result, err: '' };
    pendingPasswordFor = text;
    $('#passwordRow').hidden = false;
    $('#passwordline').value = '';
    $('#passwordline').focus();
    print('Password: ', 'dimline');
    return;
  }

  handleMarkers(result, text);
}

function handleMarkers(result, input) {
  const out = String(result.out || '');
  const err = String(result.err || '');
  if (out.includes('\u0000CLEAR\u0000')) clearTerminal();
  if (out.includes('\u0000EXIT\u0000')) {
    printHtml('<span class="dimline">session closed. Use the buttons above to start something new.</span>', 'dimline');
    return;
  }
  if (out) print(out, 'out');
  if (err) print(err, 'err');
  record(input, result);
}

function record(input, result) {
  state.commandsRun++;
  state.commands.push(input);
  if (state.commands.length > 400) state.commands.shift();
  session.vm.commands.push({
    input,
    out: result.out || '',
    err: (result.err || '').replace(/\u0000ASKPWD\u0000/g, ''),
    code: result.code || 0,
  });
  saveState();
  updateStats();
  updateXp();
  if (session.mode === 'mission') checkObjectives();
  checkAwards();
}

function submitPassword(value) {
  const cmd = pendingPasswordFor;
  pendingPasswordFor = null;
  $('#passwordRow').hidden = true;
  if (!cmd) return;
  session.shell.pendingPassword = value;
  echoPrompt(cmd);
  let result = session.shell.run(cmd);
  session.shell.pendingPassword = null;
  if (typeof result.err === 'string' && result.err.includes('\u0000ASKPWD\u0000')) {
    result = { ...result, err: '' };
    print('Sorry, try again.', 'err');
    pendingPasswordFor = cmd;
    $('#passwordRow').hidden = false;
    $('#passwordline').focus();
    return;
  }
  handleMarkers(result, cmd);
}

/* =========================================================================
 * mission UI
 * ========================================================================= */

function currentMission() {
  return MISSIONS.find((m) => m.id === state.currentMission) || MISSIONS[0];
}

function isUnlocked(mission) {
  const index = MISSIONS.findIndex((m) => m.id === mission.id);
  if (index <= 0) return true;
  const previous = MISSIONS[index - 1];
  return state.missionsDone.includes(previous.id) || state.missionsDone.includes(mission.id);
}

function renderMissionList() {
  const list = $('#missionList');
  list.innerHTML = '';
  for (const chapter of CHAPTERS) {
    const missions = MISSIONS.filter((m) => m.chapter === chapter.id);
    const doneCount = missions.filter((m) => state.missionsDone.includes(m.id)).length;
    const head = document.createElement('div');
    head.className = 'chapter-head';
    head.innerHTML = `<span>${chapter.icon} Ch${chapter.id} · ${escapeHtml(chapter.title)}</span>
      <span class="badge">${doneCount}/${missions.length}</span>`;
    list.appendChild(head);

    for (const mission of missions) {
      const item = document.createElement('button');
      const done = state.missionsDone.includes(mission.id);
      const unlocked = isUnlocked(mission);
      item.className = 'mission-item' + (done ? ' done' : '') +
        (state.currentMission === mission.id && session?.mission?.id === mission.id ? ' current' : '') +
        (unlocked ? '' : ' locked');
      item.innerHTML = `<span class="dot">${done ? '✓' : unlocked ? '' : '🔒'}</span>
        <span><span class="num">${mission.chapter}.${mission.order}</span> ${escapeHtml(mission.title)}</span>`;
      item.addEventListener('click', () => {
        if (!unlocked) { toast('Locked', `Finish ${MISSIONS[MISSIONS.findIndex((m) => m.id === mission.id) - 1].title} first.`); return; }
        startMission(mission);
        if (window.innerWidth <= 820) $('#sidebar').classList.add('hidden');
      });
      list.appendChild(item);
    }
  }
}

function renderBrief() {
  const m = session.mission;
  if (!m) return;
  $('#missionEyebrow').textContent = session.mode === 'ctf'
    ? `CTF · ${m.category || 'Challenge'} · ${m.difficulty}`
    : `Chapter ${m.chapter} · Mission ${m.order}`;
  $('#missionTitle').textContent = session.mode === 'ctf' ? m.title : m.title;
  $('#missionBrief').innerHTML = markdownish(m.brief);
  $('#teach').innerHTML = (m.teach || []).map((t) => `<span>${escapeHtml(t)}</span>`).join('');
  if (session.mode === 'ctf') {
    $('#teach').innerHTML = `<span>${escapeHtml(m.difficulty)}</span><span>${escapeHtml(m.category || 'general')}</span><span>${m.points || 100} pts</span>`;
  }
  $('#hintBox').hidden = true;
  $('#missionComplete').hidden = true;
  $('#briefActions').hidden = session.mode !== 'mission';
  const submit = $('#submitFlagRow');
  if (submit) submit.remove();
  if (session.mode === 'ctf') addFlagSubmitter();
}

function addFlagSubmitter() {
  const row = document.createElement('div');
  row.className = 'flag-form';
  row.id = 'submitFlagRow';
  row.innerHTML = `<input id="flagInput" placeholder="flag{...}" aria-label="Submit the flag">
    <button class="primary-btn" id="flagSubmit">Submit flag</button>`;
  $('#brief').appendChild(row);
  $('#flagSubmit').addEventListener('click', submitFlag);
  $('#flagInput').addEventListener('keydown', (e) => { if (e.key === 'Enter') submitFlag(); });
}

function submitFlag() {
  if (!session || session.mode !== 'ctf') return;
  const value = ($('#flagInput').value || '').trim();
  const mission = session.mission;
  if (!value) return;
  if (value === mission.solution) {
    if (!state.ctfSolved.includes(mission.id)) {
      state.ctfSolved.push(mission.id);
      state.xp += 150;
      saveState();
      updateXp();
      checkAwards();
      toast('🚩 Flag captured!', `${mission.title} — +150 XP`);
    }
    printHtml(`<span class="flag">${escapeHtml(value)}</span> <span class="ok">— correct!</span>`, 'ok');
    $('#missionComplete').hidden = false;
    $('#completeText').textContent = 'You captured the flag. Pick another challenge from the CTF tab.';
  } else {
    printHtml('<span class="err">That is not the flag. Read the hints if you are stuck.</span>', 'err');
  }
  $('#flagInput').value = '';
}

function renderObjectives() {
  const box = $('#objectives');
  box.innerHTML = '';
  const m = session.mission;
  if (!m || session.mode !== 'mission') {
    box.innerHTML = '';
    return;
  }
  for (const o of m.objectives) {
    const done = session.completed.has(o.id);
    const el = document.createElement('div');
    el.className = 'objective' + (done ? ' done' : '');
    el.innerHTML = `<span class="mark">${done ? '✓' : '○'}</span>
      <span>${markdownInline(o.text)}</span>
      <span class="xpx">+${o.xp} XP</span>`;
    box.appendChild(el);
  }
}

function checkObjectives() {
  const m = session.mission;
  if (!m || session.mode !== 'mission') return;
  let all = true;
  for (const o of m.objectives) {
    let ok = false;
    try { ok = !!o.check(session.vm, session.shell, session.fs); } catch { ok = false; }
    if (ok && !session.completed.has(o.id)) {
      session.completed.add(o.id);
      state.xp += o.xp;
      printHtml(`<span class="ok">✓ Objective complete: ${escapeHtml(stripMarkdown(o.text))}</span>`, 'ok');
    }
    if (!ok) all = false;
  }
  renderObjectives();
  updateXp();
  saveState();
  if (all && !session.done) finishMission();
}

function finishMission() {
  session.done = true;
  const m = session.mission;
  if (!state.missionsDone.includes(m.id)) {
    state.missionsDone.push(m.id);
    saveState();
    renderMissionList();
  }
  $('#missionComplete').hidden = false;
  const next = MISSIONS[MISSIONS.findIndex((x) => x.id === m.id) + 1];
  $('#completeText').textContent = next
    ? `You finished "${m.title}". Next up: ${next.title}.`
    : `You finished "${m.title}" — that was the last mission. Try the CTF tab or the sandbox.`;
  $('#nextMissionBtn').textContent = next ? 'Next mission →' : 'Back to the map';
  printHtml('<span class="ok">🎉 Mission complete! Open the Map tab to see your progress.</span>', 'ok');
  checkAwards();
}

function showHint() {
  const m = session.mission;
  if (!m) return;
  const objectives = m.objectives || [];
  const remaining = objectives.filter((o) => !session.completed.has(o.id));
  if (session.mode === 'ctf') {
    const list = m.hints || [];
    const used = session.hints;
    if (used >= list.length) { toast('No more hints', 'You have used every hint for this challenge.'); return; }
    session.hints++;
    state.hintsUsed++;
    saveState();
    $('#hintBox').hidden = false;
    $('#hintBox').innerHTML = `<b>Hint ${used + 1}:</b> ${markdownish(list[used])}`;
    printHtml(`<span class="dimline">Hint ${used + 1} revealed — see the brief panel.</span>`, 'dimline');
    return;
  }
  if (session.mode !== 'mission') return;
  if (!remaining.length) { toast('Nothing to hint', 'Every objective is already done.'); return; }
  const target = remaining[0];
  session.hints++;
  state.hintsUsed++;
  saveState();
  $('#hintBox').hidden = false;
  $('#hintBox').innerHTML = `<b>Hint for “${escapeHtml(stripMarkdown(target.text))}”:</b> ${markdownInline(target.hint)}`;
  printHtml('<span class="dimline">Hint revealed — see the brief panel.</span>', 'dimline');
}

/* =========================================================================
 * starting things
 * ========================================================================= */

function startMission(mission, opts = {}) {
  state.currentMission = mission.id;
  saveState();
  const fs = VFS.fromSpec(mission.fs || {});
  newSession({
    mode: 'mission',
    mission,
    kind: mission.shell || 'bash',
    cwd: mission.cwd || (mission.shell === 'bash' ? '/home/player' : '/C:/Users/Player'),
    fs,
    net: mission.net || null,
    sudoPassword: mission.sudoPassword || null,
    credentials: mission.credentials || {},
    title: 'zer0day-lab',
  });
  showView('mission');
  renderBrief();
  renderObjectives();
  clearTerminal();
  greet(mission, opts.banner === true);
  renderMissionList();
  $('#cmdline').focus();
}

function startCtf(challenge) {
  const fs = VFS.fromSpec(challenge.fs || {});
  newSession({
    mode: 'ctf',
    mission: challenge,
    kind: challenge.shell || 'bash',
    cwd: '/home/player',
    fs,
    net: challenge.net || null,
    credentials: challenge.credentials || {},
    title: 'ctf',
  });
  closeModal();
  showView('mission');
  renderBrief();
  renderObjectives();
  clearTerminal();
  printHtml(`<span class="flag">${escapeHtml(challenge.category || 'CTF')}</span> — ${escapeHtml(challenge.difficulty)}`, 'sys');
  print(markdownToText(challenge.brief), 'out');
  print('Type `help` for commands. Submit the flag in the panel above when you find it.\n', 'dimline');
  $('#cmdline').focus();
}

function startSandbox() {
  const fs = VFS.fromSpec({
    '/home/player/': {},
    '/home/player/README.txt': 'This is the free-play sandbox. Nothing here is graded.\nTry: ls, cd /etc, nmap 10.0.0.5, curl web.zer0day.lab\n',
    '/home/player/practice/': {},
    '/home/player/practice/names.csv': 'ada,admin\ngrace,user\nalan,user\nkatherine,admin\n',
    '/home/player/practice/access.log': [
      '10.0.0.1 - - [01/Mar/2026:09:00:01] "GET / HTTP/1.1" 200 512',
      '10.0.0.42 - - [01/Mar/2026:09:04:11] "GET /admin HTTP/1.1" 404 233',
      '10.0.0.42 - - [01/Mar/2026:09:04:13] "POST /login HTTP/1.1" 401 120',
      '10.0.0.42 - - [01/Mar/2026:09:04:15] "POST /login HTTP/1.1" 401 120',
      '10.0.0.42 - - [01/Mar/2026:09:04:17] "POST /login HTTP/1.1" 401 120',
    ].join('\n') + '\n',
    '/etc/hostname': 'zer0day-lab\n',
    '/etc/os-release': 'NAME="ZeroDay Linux"\nVERSION="6.1 (training)"\n',
  });
  newSession({
    mode: 'sandbox',
    mission: {
      id: 'sandbox', title: 'Free-play sandbox', chapter: 0, order: 0,
      brief: `**Nothing here is graded.** This is your own machine to poke at.

Useful things to try:
- \`cd practice && cat access.log | sort | uniq -c\`
- \`nmap 10.0.0.5\` then \`ssh developer@10.0.0.5\` (password: hunter2)
- \`curl web.zer0day.lab/robots.txt\`
- \`help\` and \`man grep\` for the manual`,
      teach: ['No objectives, no pressure', 'Everything resets when you restart the page'],
    },
    kind: 'bash',
    cwd: '/home/player',
    fs,
    net: DEFAULT_NET,
    credentials: { '10.0.0.5': 'hunter2' },
    title: 'sandbox',
  });
  showView('mission');
  renderBrief();
  renderObjectives();
  clearTerminal();
  print('Welcome to the sandbox. Nothing you do here is graded.\n', 'sys');
  print('Try `ls`, `help`, or read README.txt.\n', 'dimline');
  $('#cmdline').focus();
}

const BANNER = [
  '  ####  #   # ####  ####  ####  #   # ####  ####   ####  #   # ####',
  '  #   # #   # #   # #   # #   # #   # #   # #   #  # # # # # #   #',
  '  ##### ##### #   # ####  #   # ##### #   # ####    #   ## ##  ####',
  '  #      #   # #   # #   # #   # #   # #   # #   #  #   #   #   #',
  '  #      #   # ####  #   # ####  #   # #   # ####  #### #   # ####',
  '',
  '        a hands-on computer science academy',
];

function printBanner() {
  print(BANNER.join('\n'), 'ok');
  print('Type help to list commands · ls to look around · the 💡 button gives a hint when you are stuck.\n', 'dimline');
}

function greet(mission, withBanner = false) {
  if (withBanner) printBanner();
  printHtml(`<span class="sys">${escapeHtml(mission.title)}</span>`, 'sys');
  print(markdownToText(mission.brief), 'out');
  if (mission.objectives) print(`\nObjectives: ${mission.objectives.length}. Type a command, or ask for a hint with the 💡 button.\n`, 'dimline');
  print('Type `help` to see every command this shell knows.\n', 'dimline');
}

/* =========================================================================
 * markdown-ish rendering (a very small subset, no dependencies)
 * ========================================================================= */

function markdownToText(md) {
  return String(md)
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '  • ')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

function markdownInline(text) {
  return escapeHtml(String(text))
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
}

function stripMarkdown(text) {
  return String(text).replace(/`/g, '').replace(/\*\*/g, '');
}

function markdownish(md) {
  const paragraphs = String(md).split(/\n{2,}/);
  return paragraphs.map((p) => {
    const lines = p.split('\n');
    if (lines.every((l) => /^\s*[-*]\s+/.test(l))) {
      return `<ul>${lines.map((l) => `<li>${markdownInline(l.replace(/^\s*[-*]\s+/, ''))}</li>`).join('')}</ul>`;
    }
    return `<p>${lines.map(markdownInline).join('<br>')}</p>`;
  }).join('');
}

/* =========================================================================
 * views: code lab, CTF list, map, awards, about
 * ========================================================================= */

function openModal(title, html) {
  $('#modalTitle').textContent = title;
  $('#modalBody').innerHTML = html;
  $('#modal').hidden = false;
}

function closeModal() { $('#modal').hidden = true; }

function showView(view) {
  if (view === 'mission') { closeModal(); return; }
  if (view === 'lab') renderLab();
  if (view === 'ctf') renderCtf();
  if (view === 'map') renderMap();
  if (view === 'awards') renderAwards();
  if (view === 'about') renderAbout();
  $$('.tab').forEach((t) => t.classList.toggle('active', t.dataset.view === view));
}

function renderLab(lessonId) {
  const done = state.labsSolved;
  if (!lessonId) {
    const cards = CODE_LESSONS.map((l) => `
      <button class="card ${done.includes(l.id) ? 'done' : ''}" data-lesson="${l.id}">
        <div class="card-title">${done.includes(l.id) ? '✓ ' : ''}${escapeHtml(l.title)}</div>
        <div class="card-sub">${escapeHtml(l.difficulty)} · ${escapeHtml(l.teaches || '')}</div>
      </button>`).join('');
    openModal('Code Lab — write real code', `
      <p class="dim">Write JavaScript that runs in a sandboxed worker right here in your browser.
      Your code is never uploaded anywhere. Pass every test to earn the XP.</p>
      <div class="grid" style="margin-top:14px">${cards}</div>`);
    $$('#modalBody [data-lesson]').forEach((btn) =>
      btn.addEventListener('click', () => renderLab(btn.dataset.lesson)));
    return;
  }

  const lesson = CODE_LESSONS.find((l) => l.id === lessonId) || CODE_LESSONS[0];
  openModal(lesson.title, `
    <p class="dim">${escapeHtml(lesson.brief)}</p>
    <div class="badge-row">
      <span class="badge-pill">${escapeHtml(lesson.difficulty)}</span>
      <span class="badge-pill">${escapeHtml(lesson.teaches || '')}</span>
      <span class="badge-pill">${lesson.tests.length} tests</span>
    </div>
    <textarea class="editor" id="codeEditor" spellcheck="false">${escapeHtml(lesson.starter)}</textarea>
    <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
      <button class="primary-btn" id="runCode">▶ Run tests</button>
      <button class="ghost-btn" id="resetCode">Reset starter</button>
      <button class="ghost-btn" id="solutionCode">Show solution</button>
    </div>
    <div class="test-list" id="testList"></div>
    <div class="hint-note" id="labNote">Your code must define a function called <code>${escapeHtml(lesson.functionName)}</code>.</div>
  `);

  $('#runCode').addEventListener('click', () => runLesson(lesson));
  $('#resetCode').addEventListener('click', () => { $('#codeEditor').value = lesson.starter; });
  $('#solutionCode').addEventListener('click', () => {
    if (!confirm('Show the solution? It is better to try first — that is where the learning happens.')) return;
    $('#codeEditor').value = SOLUTIONS[lesson.id] || lesson.starter;
  });
}

function runLesson(lesson) {
  const code = $('#codeEditor').value;
  const list = $('#testList');
  list.innerHTML = '<div class="test"><span class="mark">…</span> running in a sandbox worker…</div>';
  let worker;
  try {
    worker = new Worker('workers/runner.js');
  } catch {
    list.innerHTML = '<div class="test fail"><span class="mark">✗</span> This browser blocked the sandbox worker.</div>';
    return;
  }
  const timer = setTimeout(() => {
    worker.terminate();
    list.innerHTML = `<div class="test fail"><span class="mark">✗</span> Time out — an infinite loop? Check your loops.</div>`;
  }, 4000);

  worker.onmessage = (event) => {
    clearTimeout(timer);
    worker.terminate();
    const data = event.data || {};
    if (!data.ok) {
      list.innerHTML = `<div class="test fail"><span class="mark">✗</span> ${escapeHtml(data.error || 'Unknown error')}</div>`;
      return;
    }
    const allPass = data.results.every((r) => r.pass);
    list.innerHTML = data.results.map((r) => `
      <div class="test ${r.pass ? 'pass' : 'fail'}">
        <span class="mark">${r.pass ? '✓' : '✗'}</span>
        <span>${escapeHtml(r.name)}</span>
        <span class="detail">${r.pass ? escapeHtml(r.got) : `got ${escapeHtml(r.got)} · expected ${escapeHtml(r.expected)}`}</span>
      </div>`).join('');
    if (allPass && !state.labsSolved.includes(lesson.id)) {
      state.labsSolved.push(lesson.id);
      state.xp += 100;
      saveState();
      updateXp();
      updateStats();
      checkAwards();
      toast('✅ All tests pass', `${lesson.title} — +100 XP`);
    }
    if (allPass) printHtml('<span class="ok">Code Lab: all tests passed.</span>', 'ok');
  };

  worker.postMessage({ code, functionName: lesson.functionName || lesson.id, tests: lesson.tests });
}

const SOLUTIONS = {
  hello: `function greet(name) {\n  return "Hello, " + name + "!";\n}\n`,
  sum: `function add(a, b) {\n  return a + b;\n}\n`,
  fizzbuzz: `function fizzbuzz(n) {\n  const out = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) out.push("FizzBuzz");\n    else if (i % 3 === 0) out.push("Fizz");\n    else if (i % 5 === 0) out.push("Buzz");\n    else out.push(String(i));\n  }\n  return out;\n}\n`,
  'is-palindrome': `function isPalindrome(text) {\n  const clean = String(text).toLowerCase().replace(/[^a-z0-9]/g, "");\n  return clean === clean.split("").reverse().join("");\n}\n`,
  reverse: `function reverse(text) {\n  let out = "";\n  for (let i = text.length - 1; i >= 0; i--) out += text[i];\n  return out;\n}\n`,
  'is-prime': `function isPrime(n) {\n  if (n < 2) return false;\n  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;\n  return true;\n}\n`,
  'binary-search': `function binarySearch(sorted, target) {\n  let low = 0, high = sorted.length - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    if (sorted[mid] === target) return mid;\n    if (sorted[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}\n`,
  dedupe: `function dedupe(list) {\n  return [...new Set(list)];\n}\n`,
  anagram: `function isAnagram(a, b) {\n  const clean = (s) => s.toLowerCase().replace(/[^a-z]/g, "").split("").sort().join("");\n  return clean(a) === clean(b);\n}\n`,
  caesar: `function caesar(text, n) {\n  return text.replace(/[a-z]/gi, (ch) => {\n    const base = ch <= "Z" ? 65 : 97;\n    return String.fromCharCode(((ch.charCodeAt(0) - base + n) % 26 + 26) % 26 + base);\n  });\n}\n`,
  'word-count': `function wordCount(text) {\n  const out = {};\n  for (const word of text.split(/\\s+/).filter(Boolean)) out[word] = (out[word] || 0) + 1;\n  return out;\n}\n`,
  'longest-word': `function longestWord(text) {\n  return text.split(/\\s+/).filter(Boolean).reduce((a, b) => (b.length > a.length ? b : a), "");\n}\n`,
};

function renderCtf() {
  const cards = CTF_CHALLENGES.map((c) => {
    const solved = state.ctfSolved.includes(c.id);
    return `<button class="card ${solved ? 'done' : ''}" data-ctf="${c.id}">
      <div class="card-title">${solved ? '🚩 ' : ''}${escapeHtml(c.title)}</div>
      <div class="card-sub">${escapeHtml(c.difficulty)} · ${escapeHtml(c.category)} · ${c.points} pts</div>
    </button>`;
  }).join('');
  openModal('Capture The Flag', `
    <div class="callout"><b>Authorised targets only.</b> Every machine here belongs to this training
    simulation. Never scan, probe or attack anything you do not own or have written permission to test.</div>
    <p class="dim">Solve a challenge by finding its flag inside the simulated lab, then submit it in the
    mission panel. Hints are free — use them.</p>
    <div class="grid" style="margin-top:14px">${cards}</div>`);
  $$('#modalBody [data-ctf]').forEach((btn) =>
    btn.addEventListener('click', () => startCtf(CTF_CHALLENGES.find((c) => c.id === btn.dataset.ctf))));
}

function renderMap() {
  const blocks = CHAPTERS.map((c) => {
    const missions = MISSIONS.filter((m) => m.chapter === c.id);
    const done = missions.filter((m) => state.missionsDone.includes(m.id)).length;
    const xp = missions.reduce((sum, m) => sum + m.objectives.reduce((a, o) => a + o.xp, 0), 0);
    const items = missions.map((m) => {
      const complete = state.missionsDone.includes(m.id);
      const current = session?.mission?.id === m.id;
      return `<button class="mission-item ${complete ? 'done' : ''} ${current ? 'current' : ''}" data-goto="${m.id}">
        <span class="dot">${complete ? '✓' : ''}</span><span>${escapeHtml(m.title)}</span></button>`;
    }).join('');
    return `<div class="map-chapter">
      <h3>Ch${c.id} · ${escapeHtml(c.title)}</h3>
      <p>${escapeHtml(c.blurb)} — ${done}/${missions.length} done, ${xp} XP available</p>
      ${items}
    </div>`;
  }).join('');
  const totalXp = MISSIONS.reduce((sum, m) => sum + m.objectives.reduce((a, o) => a + o.xp, 0), 0);
  openModal('Your map', `
    <p class="dim">${state.missionsDone.length} of ${MISSIONS.length} missions complete
    · ${state.xp} XP earned · ${totalXp} XP available in the curriculum</p>
    <div style="margin-top:12px">${blocks}</div>`);
  $$('#modalBody [data-goto]').forEach((btn) =>
    btn.addEventListener('click', () => {
      const mission = MISSIONS.find((m) => m.id === btn.dataset.goto);
      if (!isUnlocked(mission)) { toast('Locked', 'Finish the earlier missions first.'); return; }
      closeModal();
      startMission(mission);
    }));
}

function renderAwards() {
  const items = ACHIEVEMENTS.map((a) => {
    const on = state.achievements.includes(a.id);
    return `<div class="card ${on ? 'done' : ''}" style="cursor:default">
      <div class="card-title">${on ? '🏅' : '🔒'} ${escapeHtml(a.title)}</div>
      <div class="card-sub">${escapeHtml(a.desc)} · ${a.xp} XP</div>
    </div>`;
  }).join('');
  openModal('Awards', `<div class="grid">${items}</div>`);
}

function renderAbout() {
  openModal('About ZeroDay Academy', `
    <div class="prose">
      <h3>What this is</h3>
      <p>A complete, self-contained computer science course that runs entirely in your browser.
      No installs, no accounts, no network calls. Everything you type happens inside a simulated
      machine built in JavaScript.</p>

      <h3>What you will learn</h3>
      <ul>
        <li><b>Linux</b> — files, permissions, pipes, redirection, grep/sed/awk, scripting, cron.</li>
        <li><b>Windows</b> — cmd.exe and PowerShell, including the object pipeline.</li>
        <li><b>Networking</b> — IP addresses, ports, HTTP, DNS, nmap-style reconnaissance.</li>
        <li><b>Computer science</b> — number bases, complexity, and 12 hands-on coding exercises.</li>
        <li><b>Security</b> — hashing, log analysis, CTFs, privilege escalation and responsible disclosure.</li>
      </ul>

      <div class="callout"><b>Authorisation first.</b> Every machine in this game belongs to the
      simulation. The security chapter is about defending systems and working with written permission.
      Scanning, cracking or attacking anything you do not own is illegal in most countries — and it is
      the wrong habit to build.</div>

      <h3>Getting the most out of it</h3>
      <ul>
        <li>Type commands yourself. Reading examples teaches far less than typing them.</li>
        <li>Use the hint button before you give up — hints explain the idea, not the answer.</li>
        <li>After each mission, try the same commands in a real terminal on your own computer.</li>
        <li>Miss a mission? Reset the lab from the sidebar and run it again.</li>
      </ul>

      <h3>Privacy</h3>
      <p>Progress is stored in your browser's localStorage only. There is no server, no telemetry and
      no network access from the game.</p>
    </div>`);
}

/* =========================================================================
 * progress, XP and awards
 * ========================================================================= */

function updateXp() {
  const { level, pct, toNext } = levelProgress(state.xp);
  $('#xpLevel').textContent = level;
  $('#xpBar').style.width = `${pct}%`;
  $('#xpText').textContent = `${state.xp} XP · ${toNext} to L${level + 1}`;
}

function updateStats() {
  $('#statMissions').textContent = `${state.missionsDone.length} / ${MISSIONS.length}`;
  $('#statCommands').textContent = state.commandsRun;
  $('#statCtf').textContent = state.ctfSolved.length;
  $('#statLab').textContent = state.labsSolved.length;
}

function checkAwards() {
  const fresh = evaluateAchievements(state, state.achievements);
  if (!fresh.length) return;
  for (const a of fresh) {
    state.achievements.push(a.id);
    state.xp += a.xp;
    toast(`🏅 ${a.title}`, `${a.desc} (+${a.xp} XP)`);
  }
  saveState();
  updateXp();
}

function toast(title, body) {
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = `<div class="t-title">${escapeHtml(title)}</div><div class="t-body">${escapeHtml(body)}</div>`;
  $('#toasts').appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .4s';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 400);
  }, 5200);
}

/* =========================================================================
 * tab completion
 * ========================================================================= */

function completeInput(value) {
  const parts = value.split(/\s+/);
  const last = parts[parts.length - 1] || '';
  const sh = session.shell;
  const dirMatch = last.match(/^(.*\/)?([^/]*)$/);
  const dirPart = dirMatch[1] || '';
  const stem = dirMatch[2] || '';
  let names = [];
  try {
    const dirPath = dirPart ? (dirPart.startsWith('/') || dirPart.startsWith('~') ? dirPart : sh.cwd + '/' + dirPart) : sh.cwd;
    const node = session.fs.node(dirPath);
    if (node && node.type === 'dir') {
      names = Object.values(node.children)
        .filter((n) => n.name.startsWith(stem))
        .map((n) => (n.type === 'dir' ? n.name + '/' : n.name));
    } else {
      names = sh.listCommands().map(([n]) => n).filter((n) => n.startsWith(stem));
    }
  } catch { names = []; }

  if (names.length === 0) return value;
  if (names.length === 1) {
    parts[parts.length - 1] = dirPart + names[0];
    return parts.join(' ');
  }
  print(names.join('  '), 'dimline');
  // complete the longest common prefix
  let prefix = names[0];
  for (const n of names) {
    while (!n.startsWith(prefix)) prefix = prefix.slice(0, -1);
  }
  if (prefix.length > stem.length) {
    parts[parts.length - 1] = dirPart + prefix;
    return parts.join(' ');
  }
  return value;
}

/* =========================================================================
 * wiring everything up
 * ========================================================================= */

function wire() {
  const input = $('#cmdline');

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const value = input.value;
      input.value = '';
      historyIndex = history.length;
      runCommand(value);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      historyIndex = Math.max(0, historyIndex - 1);
      input.value = history[historyIndex] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      historyIndex = Math.min(history.length, historyIndex + 1);
      input.value = history[historyIndex] || '';
    } else if (e.key === 'Tab') {
      e.preventDefault();
      input.value = completeInput(input.value);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      clearTerminal();
    } else if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      input.value = '';
      print('^C', 'dimline');
    }
  });

  $('#passwordline').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const value = $('#passwordline').value;
      $('#passwordline').value = '';
      submitPassword(value);
      input.focus();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$('#modal').hidden) closeModal();
    if (e.key === '/' && document.activeElement !== input && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      input.focus();
    }
  });

  $$('.tab').forEach((tab) => tab.addEventListener('click', () => showView(tab.dataset.view)));
  $('#modalClose').addEventListener('click', closeModal);
  $('#modal').addEventListener('click', (e) => { if (e.target === $('#modal')) closeModal(); });

  $('#hintBtn').addEventListener('click', showHint);
  $('#restartBtn').addEventListener('click', () => startMission(currentMission()));
  $('#skipBtn').addEventListener('click', () => {
    const index = MISSIONS.findIndex((m) => m.id === state.currentMission);
    const next = MISSIONS[index + 1];
    if (!next) { toast('End of the line', 'You have reached the last mission. Try the CTF tab.'); return; }
    if (!confirm(`Skip "${currentMission().title}" and start "${next.title}"?`)) return;
    startMission(next);
  });
  $('#nextMissionBtn').addEventListener('click', () => {
    const index = MISSIONS.findIndex((m) => m.id === state.currentMission);
    const next = MISSIONS[index + 1];
    if (next) startMission(next);
    else showView('map');
  });

  $('#sandboxBtn').addEventListener('click', startSandbox);
  $('#brandHome').addEventListener('click', () => showView('map'));
  $('#resetBtn').addEventListener('click', () => {
    if (!confirm('Reset all progress, XP and awards? This cannot be undone.')) return;
    state = defaultState();
    saveState();
    updateXp();
    updateStats();
    renderMissionList();
    startMission(MISSIONS[0]);
    toast('Progress reset', 'Back to the beginning.');
  });
  $('#toggleSidebar').addEventListener('click', () => $('#sidebar').classList.toggle('hidden'));

  $$('.tbtn').forEach((btn) => btn.addEventListener('click', () => {
    runCommand(btn.dataset.tcmd);
    input.focus();
  }));

  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 820 && !e.target.closest('#sidebar') && !e.target.closest('#toggleSidebar')) {
      $('#sidebar').classList.remove('hidden');
    }
  });
}

/* =========================================================================
 * boot
 * ========================================================================= */

function boot() {
  loadState();
  wire();
  updateXp();
  updateStats();
  renderMissionList();
  const mission = currentMission();
  const fresh = state.commandsRun === 0;
  startMission(mission, { banner: fresh });
  if (!fresh) print('Welcome back — your progress was saved in this browser.\n', 'dimline');

  // on a phone the curriculum list gets out of the way until it is asked for
  if (window.innerWidth <= 820) $('#sidebar').classList.add('hidden');

  // deep links: index.html#lab, #ctf, #map, #awards, #about
  const view = (location.hash || '').replace('#', '');
  if (['lab', 'ctf', 'map', 'awards', 'about'].includes(view)) showView(view);
}

/* A tiny public API. Handy for teachers writing tests, and used by the
   automated smoke test in tests/browser.html. */
window.ZeroDay = {
  runCommand,
  startMission,
  startCtf,
  startSandbox,
  showView,
  submitFlag,
  get state() { return state; },
  get session() { return session; },
  get mission() { return currentMission(); },
};

boot();