/* =========================================================================
 * workers/runner.js — sandboxed execution for the Code Lab.
 *
 * Runs the player's function against the lesson's test cases inside a Web
 * Worker: no DOM, no window, and network access is deliberately blocked.
 * A watchdog kills runaway loops.
 * ========================================================================= */

self.fetch = () => Promise.reject(new Error('Network access is disabled in the Code Lab.'));
if (typeof XMLHttpRequest !== 'undefined') self.XMLHttpRequest = function () { throw new Error('Network disabled'); };

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (typeof a === 'object' && typeof b === 'object') {
    const ka = Object.keys(a).sort();
    const kb = Object.keys(b).sort();
    if (ka.length !== kb.length) return false;
    return ka.every((k, i) => k === kb[i] && deepEqual(a[k], b[k]));
  }
  return false;
}

function show(value) {
  if (typeof value === 'string') return JSON.stringify(value);
  try { return JSON.stringify(value); } catch { return String(value); }
}

self.onmessage = (event) => {
  const { code, functionName, tests } = event.data || {};
  const results = [];
  let fn;

  try {
    // eslint-disable-next-line no-new-func
    const factory = new Function(`"use strict";\n${code}\n; return typeof ${functionName} === 'function' ? ${functionName} : null;`);
    fn = factory();
    if (typeof fn !== 'function') throw new Error(`No function named ${functionName}() was found.`);
  } catch (err) {
    self.postMessage({ ok: false, error: String(err && err.message ? err.message : err), results: [] });
    return;
  }

  for (const test of tests) {
    const started = Date.now();
    try {
      const value = fn(...(test.args || []));
      if (value instanceof Promise) throw new Error('This exercise expects a normal value, not a Promise.');
      const pass = deepEqual(value, test.expected);
      results.push({
        name: test.name,
        pass,
        got: show(value),
        expected: show(test.expected),
        ms: Date.now() - started,
      });
    } catch (err) {
      results.push({
        name: test.name,
        pass: false,
        got: 'threw: ' + String(err && err.message ? err.message : err),
        expected: show(test.expected),
        ms: Date.now() - started,
      });
    }
  }

  self.postMessage({ ok: true, results });
};