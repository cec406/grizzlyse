/* Minimal test harness: node tests/run.js */
let passed = 0;
let failed = 0;
const failures = [];
let suite = '';

export function describe(name, fn) {
  suite = name;
  console.log('\n\x1b[1m' + name + '\x1b[0m');
  fn();
}

export function it(name, fn) {
  try {
    fn();
    passed++;
    console.log('  \x1b[32m✓\x1b[0m ' + name);
  } catch (e) {
    failed++;
    failures.push({ suite, name, error: e });
    console.log('  \x1b[31m✗\x1b[0m ' + name);
    console.log('    ' + (e && e.message ? e.message : e));
  }
}

export function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'assertion failed');
}

export function eq(actual, expected, msg) {
  const a = typeof actual === 'string' ? actual : JSON.stringify(actual);
  const b = typeof expected === 'string' ? expected : JSON.stringify(expected);
  if (a !== b) {
    throw new Error(`${msg ? msg + '\n' : ''}expected: ${JSON.stringify(b)}\nactual:   ${JSON.stringify(a)}`);
  }
}

export function contains(haystack, needle, msg) {
  if (!String(haystack).includes(needle)) {
    throw new Error(`${msg ? msg + '\n' : ''}expected output to contain ${JSON.stringify(needle)}\ngot: ${JSON.stringify(String(haystack).slice(0, 400))}`);
  }
}

export function notContains(haystack, needle, msg) {
  if (String(haystack).includes(needle)) {
    throw new Error(`${msg ? msg + '\n' : ''}expected output NOT to contain ${JSON.stringify(needle)}\ngot: ${JSON.stringify(String(haystack).slice(0, 400))}`);
  }
}

export function summary() {
  console.log('\n' + '─'.repeat(60));
  if (failed === 0) {
    console.log(`\x1b[32mAll ${passed} tests passed.\x1b[0m`);
  } else {
    console.log(`\x1b[31m${failed} failed\x1b[0m, \x1b[32m${passed} passed\x1b[0m`);
    for (const f of failures) {
      console.log(`\n  ${f.suite} → ${f.name}`);
      console.log('  ' + (f.error && f.error.stack ? f.error.stack.split('\n').slice(0, 4).join('\n  ') : f.error));
    }
  }
  return failed === 0;
}