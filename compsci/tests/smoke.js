/* =========================================================================
 * tests/smoke.js — automated browser test.
 *
 * Loaded only when the page URL ends in #smoke. It drives the real UI through
 * the window.ZeroDay API and prints a PASS/FAIL report over the page.
 *
 *   npm run serve      # then open http://localhost:8080/index.html#smoke
 * ========================================================================= */

const out = [];
let pass = 0;
let fail = 0;

const check = (name, fn) => {
  try {
    const detail = fn();
    pass++;
    out.push(`PASS  ${name}${detail ? '  — ' + detail : ''}`);
  } catch (e) {
    fail++;
    out.push(`FAIL  ${name}  — ${e.message}`);
  }
};
const assert = (cond, msg) => { if (!cond) throw new Error(msg); };
const termText = () => (document.getElementById('termBody') || {}).textContent || '';
if (!window.ZeroDay) {
  overlay(['the app module has not finished booting — run the test through the #smoke hook'], false);
  throw new Error('ZeroDay API missing');
}

const { MISSIONS } = await import('../js/content/missions.js');
const byId = (id) => MISSIONS.find((m) => m.id === id);

function overlay(lines, ok) {
  const box = document.createElement('pre');
  box.style.cssText = 'position:fixed;inset:0;z-index:9999;margin:0;padding:20px;overflow:auto;' +
    'background:#05080c;color:' + (ok ? '#4ade80' : '#f87171') +
    ';font:14px/1.5 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap';
  box.textContent = `${ok ? 'ALL PASS' : 'FAILURES'} — ${pass} passed, ${fail} failed\n\n` + lines.join('\n');
  document.body.appendChild(box);
}

try {
  ZeroDay.startMission(byId('hello-shell'));

  check('app booted', () => {
    assert(window.ZeroDay, 'the ZeroDay API is missing');
    return document.getElementById('missionTitle').textContent;
  });

  check('objectives rendered', () => {
    const n = document.querySelectorAll('#objectives .objective').length;
    assert(n >= 3, `only ${n} objectives`);
    return `${n} objectives`;
  });

  ZeroDay.runCommand('pwd');
  check('pwd runs', () => assert(termText().includes('/home/player'), 'no /home/player in the output'));
  ZeroDay.runCommand('ls');
  check('ls runs', () => assert(termText().includes('welcome.txt'), 'welcome.txt not listed'));
  ZeroDay.runCommand('cat welcome.txt');
  check('cat runs', () => assert(termText().includes('Welcome to ZeroDay Lab'), 'file text missing'));
  ZeroDay.runCommand('echo hello from the smoke test');
  check('echo runs', () => assert(termText().includes('hello from the smoke test')));

  check('objectives tick off', () => {
    const done = document.querySelectorAll('#objectives .objective.done').length;
    assert(done >= 4, `only ${done} of 4 ticked`);
    return `${done}/4 done · ${ZeroDay.state.xp} XP`;
  });
  check('XP shown in the header', () => {
    assert(ZeroDay.state.xp > 0, 'no XP awarded');
    return document.getElementById('xpText').textContent;
  });
  check('completion panel appears', () =>
    assert(!document.getElementById('missionComplete').hidden, 'completion panel is still hidden'));

  /* --- pipes and redirection --- */
  ZeroDay.startMission(byId('pipe-basics'));
  check('mission switch works', () =>
    assert(document.getElementById('missionTitle').textContent.includes('Pipes'), 'title did not update'));
  ZeroDay.runCommand('cat missions.log | grep ERROR | wc -l');
  check('three-stage pipeline works', () => {
    const lines = [...document.querySelectorAll('#termBody .line')].map((d) => d.textContent.trim());
    assert(lines.includes('2'), `no bare "2" line in: ${lines.slice(-6).join(' / ')}`);
    return 'grep | wc printed 2';
  });
  ZeroDay.runCommand('cat missions.log | grep ERROR > found.txt');
  check('redirection writes a file', () =>
    assert(ZeroDay.session.fs.readFile('/home/player/found.txt').includes('fuel valve'), 'file content wrong'));

  /* --- hint button --- */
  document.getElementById('hintBtn').click();
  check('hint reveals text', () => assert(!document.getElementById('hintBox').hidden, 'hint box still hidden'));

  /* --- Windows / PowerShell --- */
  ZeroDay.startMission(byId('powershell-basics'));
  check('PowerShell prompt', () =>
    assert(document.getElementById('prompt').textContent.includes('C:\\Users\\Player'), 'prompt is ' + document.getElementById('prompt').textContent));
  ZeroDay.runCommand('Get-ChildItem Documents');
  check('Get-ChildItem lists files', () =>
    assert(termText().includes('inventory.csv'), `file list missing; tail was: ${termText().slice(-120)}`));
  ZeroDay.runCommand('New-Item -ItemType Directory -Path Archive');
  ZeroDay.runCommand("Set-Content -Path Archive\\summary.txt -Value 'all done'");
  check('Set-Content writes a file', () => {
    assert(ZeroDay.session.fs.exists('/C:/Users/Player/Archive/summary.txt'), 'file not created');
    assert(ZeroDay.session.fs.readFile('/C:/Users/Player/Archive/summary.txt').includes('all done'), 'wrong content');
    return 'Archive\\summary.txt created';
  });
  ZeroDay.runCommand('Get-Content Documents\\inventory.csv | Select-String bolts');
  check('PowerShell pipeline filters', () => assert(termText().includes('bolts'), 'Select-String produced nothing'));

  /* --- password prompt (sudo) --- */
  ZeroDay.startMission(byId('privilege-escalation'));
  ZeroDay.runCommand('sudo cat /var/backups/flag.txt');
  check('sudo asks for a password', () =>
    assert(!document.getElementById('passwordRow').hidden, 'no password prompt appeared'));
  document.getElementById('passwordline').value = 'toor';
  document.getElementById('passwordline').dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
  check('sudo reads the protected file', () => assert(termText().includes('flag{'), 'flag was not printed'));
  check('password prompt hides again', () =>
    assert(document.getElementById('passwordRow').hidden, 'prompt stayed visible'));

  /* --- sandbox: network + ssh --- */
  ZeroDay.startSandbox();
  ZeroDay.runCommand('nmap 10.0.0.5');
  check('nmap finds open ports', () => assert(termText().includes('22/tcp'), 'no ports in the scan'));
  ZeroDay.runCommand('curl web.zer0day.lab/robots.txt');
  check('curl fetches a page', () => assert(termText().includes('Disallow'), 'robots.txt not fetched'));
  ZeroDay.session.shell.pendingPassword = 'hunter2';
  ZeroDay.runCommand('ssh developer@10.0.0.5');
  check('ssh logs into the lab host', () =>
    assert(ZeroDay.session.shell.hostName === 'dev.lab', 'host is ' + ZeroDay.session.shell.hostName));
  ZeroDay.runCommand('cat /etc/hostname');
  check('remote filesystem works', () => assert(termText().includes('dev.lab'), 'remote hostname not shown'));
  ZeroDay.runCommand('exit');
  check('exit returns to the local machine', () =>
    assert(ZeroDay.session.shell.hostName !== 'dev.lab', 'still logged in'));

  /* --- views --- */
  ZeroDay.showView('lab');
  check('code lab opens', () => {
    assert(!document.getElementById('modal').hidden, 'modal hidden');
    assert(document.querySelectorAll('#modalBody [data-lesson]').length >= 10, 'lesson cards missing');
  });
  ZeroDay.showView('ctf');
  check('CTF list opens', () =>
    assert(document.querySelectorAll('#modalBody [data-ctf]').length >= 5, 'CTF cards missing'));
  ZeroDay.showView('map');
  check('map opens', () =>
    assert(document.querySelectorAll('#modalBody [data-goto]').length >= 30, 'map entries missing'));
  ZeroDay.showView('awards');
  check('awards open', () =>
    assert(document.querySelectorAll('#modalBody .card').length >= 20, 'awards missing'));
  document.getElementById('modalClose').click();

  /* --- persistence --- */
  check('progress saved to localStorage', () => {
    const raw = localStorage.getItem('zer0day-academy-v1');
    assert(raw, 'nothing stored');
    const parsed = JSON.parse(raw);
    assert(parsed.missionsDone.includes('hello-shell'), 'completed mission not stored');
    return `${parsed.missionsDone.length} missions stored`;
  });
  /* --- CTF flow --- */
  const ctf = (await import('../js/content/ctf.js')).CTF_CHALLENGES[0];
  ZeroDay.startCtf(ctf);
  check('CTF starts', () => {
    assert(document.getElementById('flagInput'), 'no flag box');
    return document.getElementById('missionTitle').textContent;
  });
  document.getElementById('flagInput').value = 'flag{wrong}';
  document.getElementById('flagSubmit').click();
  check('wrong flag is rejected', () => assert(!ZeroDay.state.ctfSolved.includes(ctf.id), 'wrong flag counted as solved'));
  document.getElementById('flagInput').value = ctf.solution;
  document.getElementById('flagSubmit').click();
  check('correct flag is accepted', () => assert(ZeroDay.state.ctfSolved.includes(ctf.id), 'flag not recorded'));
  check('CTF hint button works', () => {
    document.getElementById('hintBtn').click();
    assert(!document.getElementById('hintBox').hidden, 'no hint shown');
  });

  /* --- mission completion → next mission --- */
  ZeroDay.startMission(byId('hello-shell'));
  ['pwd', 'ls', 'cat welcome.txt', 'echo done'].forEach((c) => ZeroDay.runCommand(c));
  const nextLabel = document.getElementById('nextMissionBtn').textContent;
  document.getElementById('nextMissionBtn').click();
  check('next mission button advances', () =>
    assert(document.getElementById('missionTitle').textContent !== 'Your First Terminal',
      `still on mission 1 (button said "${nextLabel}")`));

  /* --- the Code Lab sandbox worker --- */
  const workerResult = await new Promise((resolve) => {
    let worker;
    try {
      worker = new Worker('workers/runner.js');
    } catch (e) {
      resolve({ ok: false, error: 'worker unavailable: ' + e.message });
      return;
    }
    worker.onmessage = (event) => resolve(event.data);
    worker.postMessage({
      code: 'function greet(name) { return "Hello, " + name + "!"; }',
      functionName: 'greet',
      tests: [{ name: 'greets Ada', args: ['Ada'], expected: 'Hello, Ada!' }],
    });
  });
  check('code lab worker runs the tests', () => {
    assert(workerResult.ok, 'worker reported an error: ' + workerResult.error);
    assert(workerResult.results.length === 1, 'no results');
    assert(workerResult.results[0].pass, 'the test did not pass: ' + JSON.stringify(workerResult.results[0]));
    return 'greet("Ada") ran in a worker and passed';
  });
} catch (e) {
  fail++;
  out.push(`FAIL  suite crashed — ${e.message}\n${e.stack || ''}`);
}

const report = `${fail === 0 ? 'ALL PASS' : 'FAILURES'} — ${pass} passed, ${fail} failed\n\n` + out.join('\n');
overlay(out, fail === 0);
document.title = (fail === 0 ? 'PASS ' : 'FAIL ') + pass + '/' + (pass + fail);

/* If a test collector is listening, hand it the report (used by CI). */
if (location.search.includes('report')) {
  try { await fetch('/__result', { method: 'POST', body: report }); } catch (e) { /* no collector */ }
}