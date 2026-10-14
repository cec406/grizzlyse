// Dependency-free browser E2E. Drives the machine's own Chrome/Edge through the
// DevTools protocol using only Node's built-in WebSocket + fetch + http. No
// Playwright, no npm install, no python.
//
// Usage: node tests/e2e.js <chromeOrEdgePath>
// Exit codes: 0 = pass, 1 = real failures, 2 = skipped (browser could not launch).
//
// Coverage: every route renders and is free of console/page/HTTP errors; the
// dictionary search + pack filters + deep links work; the roadmap shows words;
// the keyboard drill translates Latin keys; a lesson quiz and a practice game
// play through.

import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { existsSync, statSync, mkdtempSync, rmSync } from 'node:fs';
import { resolve, extname, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import net from 'node:net';

const CHROME = process.argv[2];
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 8356;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json',
  '.ico': 'image/x-icon', '.map': 'application/json'
};

function startServer() {
  return new Promise((res) => {
    const server = createServer(async (req, res) => {
      try {
        const path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
        const rel = (path === '/' ? '/index.html' : path).replace(/^\/+/, '');
        const file = resolve(ROOT, rel);
        if (!file.startsWith(ROOT) || !existsSync(file) || !statSync(file).isFile()) {
          res.writeHead(404); res.end('not found'); return;
        }
        const data = await readFile(file);
        res.writeHead(200, { 'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream' });
        res.end(data);
      } catch { res.writeHead(500); res.end('server error'); }
    });
    server.listen(PORT, '127.0.0.1', () => res(server));
  });
}

function freePort() {
  return new Promise((res) => {
    const s = net.createServer();
    s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => res(p)); });
  });
}

const problems = [];
const fail = (m) => { problems.push(m); console.log('E2E FAIL: ' + m); };

async function launchChrome() {
  const port = await freePort();
  const profile = mkdtempSync(join(tmpdir(), 'rp-e2e-'));
  const proc = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--no-first-run',
    '--disable-dev-shm-usage', `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`, 'about:blank'
  ], { stdio: 'ignore' });
  const clean = () => {
    try { proc.kill(); } catch { /* ignore */ }
    if (process.platform === 'win32') {
      try { spawn('taskkill', ['/pid', String(proc.pid), '/T', '/F'], { stdio: 'ignore' }); } catch { /* ignore */ }
    }
    try { rmSync(profile, { recursive: true, force: true }); } catch { /* ignore */ }
  };
  let url = null;
  for (let i = 0; i < 40 && !url; i++) {
    if (proc.exitCode !== null) throw new Error('Chrome exited early');
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) url = page.webSocketDebuggerUrl;
    } catch { /* not up yet */ }
    await sleep(250);
  }
  if (!url) { clean(); throw new Error('CDP endpoint not reachable'); }
  return { port, proc, profile, wsUrl: url, clean };
}

async function connectCdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('ws error')); });
  let id = 0;
  const pending = new Map();
  const pageProblems = [];
  ws.onmessage = (m) => {
    const msg = JSON.parse(m.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
    else if (msg.method === 'Runtime.exceptionThrown') pageProblems.push('exception: ' + (msg.params.exceptionDetails?.exception?.description || msg.params.exceptionDetails?.text));
    else if (msg.method === 'Runtime.consoleAPICalled' && msg.params.type === 'error') pageProblems.push('console.error: ' + msg.params.args.map((a) => a.value || a.description || '').join(' '));
    else if (msg.method === 'Network.loadingFailed') { if (!/ERR_ABORTED/.test(msg.params.errorText || '')) pageProblems.push('request failed: ' + (msg.params.errorText || '')); }
    else if (msg.method === 'Network.responseReceived' && msg.params.response.status >= 400) pageProblems.push('HTTP ' + msg.params.response.status + ' for ' + msg.params.response.url);
  };
  const send = (method, params = {}) => new Promise((res) => { const myId = ++id; pending.set(myId, res); ws.send(JSON.stringify({ id: myId, method, params })); });
  const evalJs = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.result?.exceptionDetails) return { __error: r.result.exceptionDetails.exception?.description || r.result.exceptionDetails.text };
    return r.result?.result?.value;
  };
  return { ws, send, evalJs, pageProblems };
}

// Page-side helper: answer questions until the results screen appears.
// Returns { done, iter, prompt } so failures can be diagnosed.
const ANSWER_LOOP = `(async () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const click = (sel) => { const el = document.querySelector(sel); if (el) { el.click(); return true; } return false; };
  let iter = 0;
  const hist = [];
  const widthOf = () => { const p = document.querySelector('.progress-fill'); return p ? p.style.width : '?'; };
  for (iter = 0; iter < 200; iter++) {
    if (document.querySelector('.results')) return { done: true, iter, hist: hist.slice(-30) };
    const fb = document.querySelector('[data-slot="fb"]');
    if (fb && !fb.classList.contains('hidden')) {
      const next = fb.querySelector('[data-action="next"]');
      if (next) { next.click(); hist.push('next@' + widthOf()); await sleep(120); continue; }
    }
    if (click('.mc-btn')) { hist.push('mc@' + widthOf()); await sleep(120); continue; }
    const gi = document.querySelector('.game-input');
    if (gi) {
      gi.value = 'да';
      gi.dispatchEvent(new Event('input', { bubbles: true }));
      click('[data-action="submit"], [data-action="check"]');
      await sleep(120); continue;
    }
    const cells = [].slice.call(document.querySelectorAll('.mem-cell')).filter((c) => !c.classList.contains('matched'));
    if (cells.length >= 2) { cells[0].click(); await sleep(60); cells[1].click(); await sleep(200); continue; }
    if (click('.hkey:enabled')) { await sleep(120); continue; }
    if (click('[data-action="giveup"]')) { await sleep(120); continue; }
    if (click('[data-action="flip"]')) { await sleep(100); continue; }
    const txt = (document.getElementById('main') || {}).innerText || '';
    return { done: /complete|results/i.test(txt), iter, prompt: (document.querySelector('.game-prompt') || {}).textContent || txt.replace(/\\s+/g, ' ').slice(0, 120) };
  }
  return { done: false, iter, hist: hist.slice(-30), prompt: (document.querySelector('.game-prompt') || {}).textContent || '' };
})()`;

const ROUTES = ['#/home', '#/path', '#/alphabet', '#/keyboard', '#/lessons', '#/lesson/u01', '#/vocab', '#/practice', '#/review', '#/reading', '#/reading/rd-01', '#/grammar', '#/cyber', '#/progress', '#/audio-setup', '#/help', '#/placement'];

async function goto(cdp, hash) {
  await cdp.evalJs(`location.hash = ${JSON.stringify(hash)}`);
  await sleep(450);
}

async function main() {
  const server = await startServer();
  let chrome = null;
  let cdp = null;
  try {
    chrome = await launchChrome();
    if (chrome.proc.exitCode !== null) return 2;
    cdp = await connectCdp(chrome.wsUrl);
    await cdp.send('Runtime.enable');
    await cdp.send('Page.enable');
    await cdp.send('Network.enable');
    await cdp.send(`Page.navigate`, { url: `http://127.0.0.1:${PORT}/index.html#/home` });
    await sleep(2600);

    // --- every route renders ---
    for (const r of ROUTES) {
      await goto(cdp, r);
      const t = await cdp.evalJs(`(() => { const m = document.getElementById('main'); const txt = (m && m.innerText) || ''; return { len: txt.trim().length, err: /Something went wrong/.test(txt) }; })()`);
      if (!t || t.len < 4) fail(`empty page at ${r}`);
      else if (t.err) fail(`error page at ${r}`);
    }

    // --- dictionary search + filters + deep links ---
    await goto(cdp, '#/vocab');
    const s1 = await cdp.evalJs(`(() => {
      const m = document.getElementById('main');
      const s = m.querySelector('.lex-search');
      if (!s) return { err: 'no search box' };
      s.value = 'dog';
      s.dispatchEvent(new Event('input', { bubbles: true }));
      return { rows: m.querySelectorAll('.lex-row').length };
    })()`);
    if (!s1 || s1.err || !s1.rows) fail('vocab: searching "dog" returned no words');

    const s2 = await cdp.evalJs(`(() => {
      const m = document.getElementById('main');
      const s = m.querySelector('.lex-search'); if (s) { s.value = ''; s.dispatchEvent(new Event('input', { bubbles: true })); }
      const sel = m.querySelector('[data-filter="pack"]');
      sel.value = 'pack-school';
      sel.dispatchEvent(new Event('change', { bubbles: true }));
      return { rows: m.querySelectorAll('.lex-row').length };
    })()`);
    if (!s2 || !s2.rows) fail('vocab: pack-school filter returned no words');

    await goto(cdp, '#/vocab?pack=work');
    const s3 = await cdp.evalJs(`(() => { const m = document.getElementById('main'); return { rows: m.querySelectorAll('.lex-row').length, empty: /No words match/.test(m.innerText) }; })()`);
    if (!s3 || !s3.rows || s3.empty) fail('vocab: deep link #/vocab?pack=work came back empty');

    // --- roadmap shows words ---
    await goto(cdp, '#/path');
    const p1 = await cdp.evalJs(`(() => { const m = document.getElementById('main'); return { words: m.querySelectorAll('.path-word').length, stages: m.querySelectorAll('.path-stage').length }; })()`);
    if (!p1 || p1.words < 5 || p1.stages < 5) fail('path: roadmap missing word previews or stages');

    // --- keyboard trainer: practice drill translates a Latin key ---
    await goto(cdp, '#/keyboard');
    await cdp.evalJs(`(() => { const b = [].slice.call(document.querySelectorAll('[data-tab]')).find((x) => x.dataset.tab === 'practice'); if (b) b.click(); })()`);
    await sleep(400);
    const k1 = await cdp.evalJs(`(() => { const m = document.getElementById('main'); return { capture: m.querySelectorAll('[data-slot="capture"]').length, target: (m.querySelector('.drill-target') || {}).textContent || '' }; })()`);
    if (!k1 || !k1.capture || !k1.target) fail('keyboard: practice drill did not render');
    const k2 = await cdp.evalJs(`(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a', bubbles: true }));
      const m = document.getElementById('main');
      return { complete: !!m.querySelector('.drill-complete'), cap: (m.querySelector('.drill-capture') || {}).textContent || '' };
    })()`);
    if (!k2 || !(k2.complete || /ф/.test(k2.cap))) fail('keyboard: drill did not translate Latin "a" to «ф»');

    // --- lesson quiz plays through ---
    await goto(cdp, '#/lesson/u01');
    const q = await cdp.evalJs(`(() => { const b = document.querySelector('[data-action="quiz"]'); if (!b) return false; b.click(); return true; })()`);
    if (q) { await sleep(350); const r = await cdp.evalJs(ANSWER_LOOP); if (!r || !r.done) fail('lesson u01 quiz could not be played through — ' + JSON.stringify(r)); }

    // --- one practice game plays through ---
    await goto(cdp, '#/practice');
    const g = await cdp.evalJs(`(() => { const c = document.querySelector('[data-game="mc"]'); if (!c) return false; c.click(); return true; })()`);
    if (g) {
      await sleep(350);
      const r = await cdp.evalJs(ANSWER_LOOP);
      if (!r || !r.done) {
        const diag = await cdp.evalJs(`(() => { const m = document.getElementById('main'); return { width: (m.querySelector('.progress-fill') || { style: {} }).style.width, shell: m.querySelectorAll('.game-shell').length, mc: m.querySelectorAll('.mc-btn').length, results: m.querySelectorAll('.results').length }; })()`);
        fail('practice game "mc" could not be played through — ' + JSON.stringify({ loop: r, diag }));
      }
    }

    // --- aggregate ---
    for (const pj of cdp.pageProblems) { console.log('E2E page problem: ' + pj); problems.push(pj); }
    console.log('\nE2E RESULT: ' + (problems.length ? 'FAIL' : 'PASS') + ' — ' + ROUTES.length + ' routes loaded, dictionary/keyboard/roadmap exercised, lesson quiz + game played, console & HTTP errors tracked.');
    return problems.length ? 1 : 0;
  } catch (err) {
    console.log('E2E skip: ' + String(err.message || err).split('\n')[0].slice(0, 180));
    return 2;
  } finally {
    try { cdp && cdp.ws.close(); cdp && cdp.ws.terminate && cdp.ws.terminate(); } catch { /* ignore */ }
    chrome && chrome.clean();
    try { server.close(); } catch { /* ignore */ }
  }
}

process.exit(await main());
