// Master test runner. Exit code 0 only when ALL passes.
import { execFileSync, spawnSync } from 'node:child_process';
import { readdirSync, statSync, readFileSync } from 'node:fs';
import { resolve, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const RED = '\x1b[31m';
const GRN = '\x1b[32m';
const YEL = '\x1b[33m';
const RST = '\x1b[0m';
const results = [];

function dirname(p) { return resolve(p, '..'); }

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git') continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function report(name, ok, note = '') {
  results.push({ name, ok, note });
  console.log(`${ok ? GRN + 'PASS' + RST : RED + 'FAIL' + RST}  ${name}${note ? ' — ' + note : ''}`);
}

// 1. Syntax check on every .js
function syntaxCheck() {
  const files = walk(ROOT).filter((f) => extname(f) === '.js');
  let bad = [];
  for (const f of files) {
    const r = spawnSync('node', ['--check', f], { encoding: 'utf8' });
    if (r.status !== 0) bad.push(`${f}: ${(r.stderr || '').trim() || 'syntax error'}`);
  }
  if (bad.length) {
    for (const b of bad.slice(0, 20)) console.log('    ' + b);
    report(`syntax check (${files.length} files)`, false, `${bad.length} file(s) failed`);
  } else {
    report(`syntax check (${files.length} files)`, true);
  }
}

// 2 & 4. tests via node --test (data, engine, smoke).
function runNodeTests() {
  const r = spawnSync('node', ['--test', '--test-reporter=spec'], { encoding: 'utf8', cwd: ROOT });
  const out = (r.stdout || '') + (r.stderr || '');
  const passCount = (out.match(/✔/g) || []).length;
  const failCount = (out.match(/✖/g) || []).length;
  report('node --test (data + engine + smoke)', r.status === 0, `${passCount} passed, ${failCount} failed`);
  if (r.status !== 0) {
    const interesting = out.split('\n').filter((l) => l.includes('✖') || /AssertionError/.test(l) || /Error:/.test(l));
    console.log('  ' + interesting.slice(0, 40).join('\n  '));
  }
}

// Run import checker as subprocess.
function importCheck() {
  const r = spawnSync('node', ['tools/check-imports.js'], { encoding: 'utf8', cwd: ROOT });
  const out = (r.stdout || '').trim();
  process.stdout.write('  ' + out.replace(/\n/g, '\n  ') + '\n');
  report('import checker', r.status === 0, r.status === 0 ? '' : 'see output above');
}

// 3. E2E (attempted; never fatal to the harness exit code).
function e2e() {
  // Requires a Chrome/Edge binary. The runner drives it via the DevTools protocol.
  const chrome = findChrome();
  if (!chrome) {
    report('browser E2E', true, 'SKIPPED — no Chrome/Edge found');
    return;
  }
  try {
    const st = execFileSync('node', ['tests/e2e.js', chrome], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], cwd: ROOT, timeout: 180000 });
    process.stdout.write('  ' + st.trim().replace(/\n/g, '\n  ') + '\n');
    report('browser E2E', true);
  } catch (err) {
    if (err.status === 2) {
      const first = String(err.stdout || '').trim().split('\n').slice(-1)[0] || 'Chrome could not launch';
      report('browser E2E', true, `SKIPPED — ${first.slice(0, 90)}`);
      return;
    }
    const msg = String(err.stdout || err.stderr || err.message || '').trim().split('\n').slice(-10).join('\n  ');
    report('browser E2E', false, msg || String(err.status));
  }
}

function safeExists(p) { try { return statSync(p).isFile(); } catch { return false; } }

// Locate a Chrome/Chromium/Edge binary: explicit env, then Windows installs, then Linux.
function findChrome() {
  if (process.env.CHROME_PATH && safeExists(process.env.CHROME_PATH)) return process.env.CHROME_PATH;
  const pf = process.env.ProgramFiles;
  const pf86 = process.env['ProgramFiles(x86)'];
  const local = process.env.LOCALAPPDATA;
  const candidates = [
    pf && join(pf, 'Google/Chrome/Application/chrome.exe'),
    pf86 && join(pf86, 'Google/Chrome/Application/chrome.exe'),
    local && join(local, 'Google/Chrome/Application/chrome.exe'),
    pf && join(pf, 'Microsoft/Edge/Application/msedge.exe'),
    pf86 && join(pf86, 'Microsoft/Edge/Application/msedge.exe'),
    '/var/lib/flatpak/app/com.google.Chrome/x86_64/stable/files/extra/chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/usr/local/bin/google-chrome'
  ].filter(Boolean);
  for (const c of candidates) if (safeExists(c)) return c;
  return null;
}

console.log('\n=== RussianPod test harness ===\n');
syntaxCheck();
importCheck();
runNodeTests();
e2e();

console.log('\n=== Summary ===');
const fails = results.filter((r) => !r.ok);
for (const r of results) console.log(`  ${r.ok ? GRN + '✔' + RST : RED + '✘' + RST} ${r.name}`);
console.log(`\n${fails.length === 0 ? GRN + 'ALL CHECKS PASS' + RST : RED + fails.length + ' CHECK(S) FAILED' + RST}\n`);
process.exit(fails.length === 0 ? 0 : 1);