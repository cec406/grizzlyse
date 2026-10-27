#!/usr/bin/env node
/* Node.js port of test/run.sh — for machines without gjs (e.g. Windows).
 * Same pipeline: extract the <script> block from index.html, disable boot(),
 * concatenate prelude + game + tests, run. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const code = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const i = code.rfind ? code.rfind('boot();') : code.lastIndexOf('boot();');
const game = code.slice(0, i) + '/* boot disabled in tests */' + code.slice(i + 'boot();'.length);

/* GLib shim backed by real Node timers. Returns unique string ids (the prelude
 * keys its timer table by id), and maps them to real Timeout objects. */
const __timers = {};
const __origSetInterval = setInterval.bind(globalThis);
const __origClearInterval = clearInterval.bind(globalThis);
let __timerSeq = 0;
const GLib = {
  PRIORITY_DEFAULT: 0,
  SOURCE_REMOVE: false,
  SOURCE_CONTINUE: true,
  MainLoop: {
    new: () => ({
      run() {},
      /* gjs exits with the main loop; mirror that by killing every remaining
       * GLib-level timer so a finished suite can't be bitten by its watchdog. */
      quit() {
        for (const k of Object.keys(__timers)) { __origClearInterval(__timers[k]); delete __timers[k]; }
      },
    }),
  },
  timeout_add(_p, ms, fn) {
    const key = 'glibtimer' + (++__timerSeq);
    const wrap = () => { const again = fn(); if (again === GLib.SOURCE_CONTINUE) return; __origClearInterval(__timers[key]); delete __timers[key]; };
    __timers[key] = __origSetInterval(wrap, Math.max(1, ms | 0));
    return key;
  },
  source_remove(id) {
    const key = String(id);
    const t = __timers[key];
    if (t) { __origClearInterval(t); delete __timers[key]; }
    return true;
  },
};

globalThis.imports = { gi: { GLib } };
globalThis.printerr = (s) => process.stdout.write(String(s) + '\n');

const prelude = fs.readFileSync(path.join(root, 'test', 'prelude.js'), 'utf8');
const tests = fs.readFileSync(path.join(root, 'test', 'tests.js'), 'utf8');

const script = prelude + '\n' + game + '\n' + tests;
try {
  vm.runInThisContext(script, { filename: 'gsehack-suite.js' });
} catch (e) {
  console.error('SUITE CRASH:', e.stack || e);
  process.exit(1);
}

/* debug: is cleanup ever called? */
const origClear = globalThis.__clearAllTimers;
globalThis.__clearAllTimers = function () { console.error('[runner] __clearAllTimers called'); if (origClear) origClear(); };
process.on('beforeExit', (c) => console.error('[runner] beforeExit code=' + c));