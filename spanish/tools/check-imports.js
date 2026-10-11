// Verifies every import path, script src, and link href resolves to a real file.
// Usage: node tools/check-imports.js  (exit code 0 = all good)

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, dirname, extname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SKIP_DIRS = new Set(['node_modules', '.git', '.opencode']);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const errors = [];

function checkPath(fromFile, spec, kind) {
  if (kind === 'html') {
    if (!spec || /^([a-z][a-z0-9+.-]*:|#|\/\/)/i.test(spec)) return; // URL scheme, fragment, protocol-relative
  } else if (!spec.startsWith('.')) {
    return; // import: bare specifiers are allowed here (none are used; keep lenient)
  }
  const target = resolve(dirname(fromFile), spec);
  if (!existsSync(target)) {
    errors.push(`${fromFile}: ${kind} "${spec}" -> missing file ${relative(ROOT, target)}`);
  }
}

// Only statements that begin a line are treated as imports, so import
// specifiers embedded inside string literals (e2e page.evaluate) are ignored.
const IMPORT_RE = /^\s*(?:import|export)\b[^"'`]*?["']([^"']+)["']/;

function check(file) {
  if (!['.js', '.html'].includes(extname(file))) return;
  const src = readFileSync(file, 'utf8');
  const lines = src.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*\*/.test(line) || /^\s*\/\//.test(line) || line.includes('@import')) continue;
    const re = new RegExp(IMPORT_RE.source);
    const m = re.exec(line);
    if (m) {
      const spec = m[1];
      if (spec.startsWith('node:')) continue;
      checkPath(file, spec, 'import');
    }
  }
  if (extname(file) === '.html') {
    const linkReults = [...src.matchAll(/(?:<script[^>]*\bsrc=|<link[^>]*\bhref=)["']([^"']+)["']/g)];
    for (const m of linkReults) checkPath(file, m[1], 'html');
  }
}

const all = walk(ROOT);
for (const f of all) check(f);

if (errors.length) {
  console.log('IMPORT CHECK: FAIL');
  for (const e of errors) console.log('  - ' + e);
  process.exit(1);
} else {
  console.log(`IMPORT CHECK: PASS (${all.filter((f) => extname(f) === '.js').length} js files scanned)`);
}