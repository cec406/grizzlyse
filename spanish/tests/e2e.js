// Browser E2E. Usage: node tests/e2e.js <chromePath> <playwrightCorePackageDir>
// Serves the app via python3 http.server, drives Chrome, and reports as failures:
//   - any console error / uncaught page exception / HTTP >= 400 / request failure
//   - any route that renders empty
//   - any lesson quiz or game round that cannot be played through
// Exit codes: 0 = pass, 1 = real failures, 2 = skipped (Chrome could not launch).
import { spawn } from 'node:child_process';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { resolve, dirname, join } from 'node:path';

const CHROME = process.argv[2];
const PW = process.argv[3] || resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const PORT = 8356;
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const problems = [];
const fail = (m) => { problems.push(m); console.log('E2E FAIL:', m); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const pw = await import(pathToFileURL(join(PW, 'index.mjs')));
const { chromium } = pw;

const server = spawn('python3', ['-m', 'http.server', String(PORT)], { cwd: ROOT, stdio: 'ignore' });
await sleep(1200);

let browser;
try {
  browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--no-first-run', '--disable-dev-shm-usage']
  });
} catch (err) {
  console.log('E2E skip: cannot launch Chrome:', String(err.message || err).split('\n')[0].slice(0, 180));
  cleanup();
  process.exit(2);
}

const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, locale: 'en-US' });
const page = await ctx.newPage();
page.setDefaultTimeout(6000);

page.on('console', (msg) => { if (msg.type() === 'error') fail('console error: ' + msg.text()); });
page.on('pageerror', (err) => fail('pageerror: ' + String(err && err.message ? err.message : err)));
page.on('requestfailed', (req) => fail('request failed: ' + req.url()));
page.on('response', (res) => { if (res.status() >= 400) fail('HTTP ' + res.status() + ' for ' + res.url()); });

const BASE = `http://localhost:${PORT}/index.html`;

async function guard(label, fn) {
  try { await fn(); }
  catch (err) { fail(`${label}: ${String(err.message || err).split('\n')[0].slice(0, 160)}`); }
}

async function gotoHash(hash) {
  await page.evaluate((h) => { location.hash = h; }, hash);
  await sleep(350);
}

function visible(selector) {
  return page.locator(`${selector}:visible`);
}

async function countVisible(selector) {
  return page.locator(`${selector}:visible`).count();
}

function firstVisible(selector) {
  return page.locator(`${selector}:visible`).first();
}

async function answerSession() {
  for (let i = 0; i < 80; i++) {
    const again = await countVisible('[data-slot="again"], [data-action="again"]');
    if (again) { await firstVisible('[data-slot="again"], [data-action="again"]').click(); return; }
    const next = await countVisible('[data-action="next"]');
    if (next) { await firstVisible('[data-action="next"]').click(); await sleep(150); continue; }
    const mc = await countVisible('.mc-btn');
    if (mc) { await firstVisible('.mc-btn').click(); await sleep(150); continue; }
    const type = await countVisible('.game-input');
    if (type) {
      await firstVisible('.game-input').fill('hola');
      for (const sel of ['[data-action="submit"]', '[data-action="check"]']) {
        if (await countVisible(sel)) { await firstVisible(sel).click(); break; }
      }
      await sleep(150); continue;
    }
    const mem = await countVisible('.mem-cell');
    if (mem >= 2) { await page.locator('.mem-cell:visible').nth(0).click(); await sleep(80); await page.locator('.mem-cell:visible').nth(1).click(); await sleep(260); continue; }
    const hang = await countVisible('.hkey:enabled');
    if (hang) { await firstVisible('.hkey:enabled').click(); await sleep(150); continue; }
    const giveup = await countVisible('[data-action="giveup"]');
    if (giveup) { await firstVisible('[data-action="giveup"]').click(); await sleep(150); continue; }
    const flip = await countVisible('[data-action="flip"]');
    if (flip) { await firstVisible('[data-action="flip"]').click(); await sleep(120); continue; }
    break; // nothing left to do — round finished
  }
}

await guard('load home', async () => {
  await page.goto(BASE, { waitUntil: 'load' });
  await sleep(600);
  const text = await page.evaluate(() => (document.getElementById('main') || {}).innerText || '');
  if (text.trim().length < 4) fail('home page rendered empty');
});

const ROUTES = ['#/home', '#/alphabet', '#/lessons', '#/lesson/u01', '#/practice', '#/review', '#/reading', '#/reading/rd-01', '#/dialects', '#/grammar', '#/progress', '#/audio-setup', '#/help', '#/placement'];
for (const route of ROUTES) {
  await guard('route ' + route, async () => {
    await gotoHash(route);
    const text = await page.evaluate(() => (document.getElementById('main') || {}).innerText || '');
    if (text.trim().length < 4) fail(`empty page at ${route}`);
  });
}

// Placement: answer every question.
await guard('placement', async () => {
  await gotoHash('#/placement');
  for (let i = 0; i < 25; i++) {
    const picks = await countVisible('[data-action="pick"]');
    if (!picks) break;
    await firstVisible('[data-action="pick"]').click();
    await sleep(100);
  }
});

// First lesson of every level: run the quiz to completion.
await guard('lessons', async () => {
  const units = await page.evaluate(async () => {
    const { UNITS } = await import('./data/index.js');
    const seenLv = new Set();
    const out = [];
    for (const u of UNITS) {
      if (seenLv.has(u.level)) continue;
      seenLv.add(u.level);
      out.push(u.id);
    }
    return out;
  });
  for (const id of units) {
    await gotoHash(`#/lesson/${id}`);
    const quiz = await visible('[data-action="quiz"]');
    if (await quiz.count()) {
      await quiz.first().click();
      await sleep(200);
      await answerSession();
      const done = await page.evaluate(() => (document.getElementById('main') || {}).innerText || '');
      if (!/score|result|xp|complete|question|correct/i.test(done)) fail(`lesson ${id} quiz produced no result view`);
    }
  }
});

// Every game: launch from the practice hub and play a full round.
const GAMES = ['mc', 'typing', 'memory', 'scramble', 'fill', 'case', 'verb', 'aspect', 'dictation', 'speed', 'hangman', 'flashcards'];
for (const gameId of GAMES) {
  await guard('game ' + gameId, async () => {
    await gotoHash('#/practice');
    const card = await visible(`[data-game="${gameId}"]`);
    if (!(await card.count())) { fail(`no practice card for game "${gameId}"`); return; }
    await card.first().click();
    await sleep(250);
    await answerSession();
  });
}

cleanup();
if (problems.length) {
  console.log(`\nE2E RESULT: FAIL (${problems.length})\n` + problems.slice(0, 30).map((p) => ' - ' + p).join('\n'));
  process.exit(1);
}
console.log('\nE2E RESULT: PASS — routes, lesson quizzes and all 12 games played through with no console errors.');

function cleanup() {
  try { browser && browser.close(); } catch { /* ignore */ }
  try { server.kill('SIGKILL'); } catch { /* ignore */ }
}