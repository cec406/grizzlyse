/* ============================================================
   Cyber Aware - tools/selftest.js
   Validates content integrity, activity definitions, widget
   references, password logic and assessment/certificate logic.
   Usage: node tools/selftest.js
   ============================================================ */
'use strict';
global.window = global;
['util', 'state', 'content', 'content.core', 'content.advanced', 'activities'].forEach(function (f) {
  try { require('../js/' + f + '.js'); } catch (e) { console.log('LOAD ' + f + ': ' + e.message); process.exit(1); }
});
// widgets needs a DOM only when invoked; loading is safe
require('../js/widgets.js');

var CY = global.CY;
var errors = [];
function ok(c, m) { if (!c) errors.push(m); }

var ACT_KINDS = ['quiz', 'pick', 'order', 'match', 'scenario', 'password', 'phish'];
var VIZ_NAMES = [];

/* ---------------- tracks & modules ---------------- */
(function () {
  ok(CY.TRACKS.length >= 2, 'at least two tracks');
  var core = CY.trackById('core');
  ok(core && core.modules.length >= 8, 'core track has 8+ modules (has ' + (core ? core.modules.length : 0) + ')');
  var ids = {};
  CY.TRACKS.forEach(function (t) {
    ok(t.id && t.name && t.modules.length, 'track well-formed: ' + t.id);
    t.modules.forEach(function (m) {
      ok(!ids[m.id], 'unique module id: ' + m.id); ids[m.id] = 1;
      ok(m.title && m.lesson && m.lesson.hook, 'module has title+hook: ' + m.id);
      ok(m.lesson.blocks && m.lesson.blocks.length >= 3, 'module has lesson blocks: ' + m.id);
      m.lesson.blocks.forEach(function (b) {
        ok(Array.isArray(b) && typeof b[0] === 'string', 'block well-formed: ' + m.id);
        if (b[0] === 'viz') { ok(!!CY.widget[b[1]], 'viz exists: ' + m.id + ' -> ' + b[1]); VIZ_NAMES.push(b[1]); }
      });
      var a = m.activity;
      ok(a && ACT_KINDS.indexOf(a.kind) !== -1, 'activity kind valid: ' + m.id + ' -> ' + (a && a.kind));
      if (a && a.kind === 'quiz') {
        ok(a.questions && a.questions.length >= 2, 'quiz questions: ' + m.id);
        a.questions.forEach(function (q, i) {
          ok(q.q && q.options && q.options.length >= 2, 'quiz q well-formed: ' + m.id + ' #' + i);
          ok(typeof q.a === 'number' && q.a >= 0 && q.a < q.options.length, 'quiz answer index: ' + m.id + ' #' + i);
          ok(q.why, 'quiz explanation: ' + m.id + ' #' + i);
        });
      } else if (a && a.kind === 'pick') {
        ok(a.prompt && a.items && a.items.length >= 4, 'pick items: ' + m.id);
        ok(a.items.some(function (x) { return x.correct; }) && a.items.some(function (x) { return !x.correct; }), 'pick has correct+incorrect: ' + m.id);
        a.items.forEach(function (x) { ok(x.text && x.why, 'pick item text+why: ' + m.id); });
      } else if (a && a.kind === 'order') {
        ok(a.steps && a.steps.length >= 3, 'order steps: ' + m.id);
        ok(a.prompt, 'order prompt: ' + m.id);
      } else if (a && a.kind === 'match') {
        ok(a.pairs && a.pairs.length >= 3, 'match pairs: ' + m.id);
        a.pairs.forEach(function (p) { ok(p[0] && p[1], 'match pair: ' + m.id); });
      } else if (a && a.kind === 'scenario') {
        ok(a.nodes && a.nodes[a.start], 'scenario start node: ' + m.id);
        Object.keys(a.nodes).forEach(function (nid) {
          var n = a.nodes[nid];
          ok(n.text && n.options && n.options.length >= 2, 'scenario node: ' + m.id + '.' + nid);
          n.options.forEach(function (o) {
            ok(o.label && (o.next || o.outcome), 'scenario option: ' + m.id + '.' + nid);
            if (o.next) ok(!!a.nodes[o.next], 'scenario next target exists: ' + m.id + ' -> ' + o.next);
          });
        });
        ok(scenarioHasGoodPath(a), 'scenario has at least one good path: ' + m.id);
      } else if (a && a.kind === 'password') {
        ok(typeof a.minScore === 'number', 'password minScore: ' + m.id);
      } else if (a && a.kind === 'phish') {
        ok(a.emails && a.emails.length >= 3, 'phish emails: ' + m.id);
        ok(a.emails.some(function (e) { return e.verdict === 'phish'; }) && a.emails.some(function (e) { return e.verdict === 'safe'; }), 'phish has both verdicts: ' + m.id);
        a.emails.forEach(function (e) {
          ok(e.from && e.subject && e.body, 'phish email fields: ' + m.id);
          ok(e.verdict === 'phish' || e.verdict === 'safe', 'phish verdict valid: ' + m.id);
          ok(e.why, 'phish explanation: ' + m.id);
        });
      }
    });
  });
  console.log('tracks                :', CY.TRACKS.length);
  console.log('modules               :', CY.totalModules(), '(' + CY.totalMinutes() + ' min total)');

  // Security+ alignment
  ok(CY.SECPLUS.length === 5, 'five Security+ domains defined');
  CY.TRACKS.forEach(function (t) {
    t.modules.forEach(function (m) {
      var sp = CY.spFor(m.id);
      ok(sp.length >= 1, 'Security+ tag present: ' + m.id);
      sp.forEach(function (n) { ok(n >= 1 && n <= 5 && CY.spName(n), 'valid Security+ domain: ' + m.id + ' -> ' + n); });
    });
  });
  var cov = CY.spCoverage();
  ok(Object.keys(cov).length === 5, 'all five Security+ domains are covered');
  console.log('Security+ coverage    :', CY.SECPLUS.map(function (d) { return d.n + '=' + (cov[d.n] || 0); }).join(' '));
})();

function scenarioHasGoodPath(a) {
  function dfs(id) {
    var n = a.nodes[id]; if (!n) return false;
    return n.options.some(function (o) {
      if (o.outcome) return !!o.outcome.good;
      return dfs(o.next);
    });
  }
  return dfs(a.start);
}

/* ---------------- assessment ---------------- */
(function () {
  var A = CY.ASSESSMENT;
  ok(A && A.questions.length >= 10, 'assessment has 10+ questions');
  ok(A.passPct > 0 && A.passPct <= 100, 'assessment pass mark sane');
  A.questions.forEach(function (q, i) {
    ok(q.q && q.options.length >= 2, 'assessment q: #' + i);
    ok(typeof q.a === 'number' && q.a >= 0 && q.a < q.options.length, 'assessment answer index: #' + i);
    ok(q.why, 'assessment explanation: #' + i);
  });
  console.log('assessment questions  :', A.questions.length, '(pass ' + A.passPct + '%)');
})();

/* ---------------- widgets referenced exist ---------------- */
(function () {
  var uniq = {}; VIZ_NAMES.forEach(function (n) { uniq[n] = 1; });
  console.log('widgets used in lessons:', Object.keys(uniq).sort().join(', '));
  ok(Object.keys(uniq).length >= 6, 'lessons use several widgets');
})();

/* ---------------- password logic ---------------- */
(function () {
  var weak = CY.passwordInfo('password');
  ok(weak.common === true && weak.score === 0, 'common password detected as weakest');
  var short = CY.passwordInfo('Ab1!');
  ok(short.score <= 1, 'short password is weak');
  var strong = CY.passwordInfo('orange-ladder-seven-piano');
  ok(strong.score >= 3, 'long passphrase is strong (' + strong.score + ')');
  var mixed = CY.passwordInfo('Tr0ub4dour&3xplosion');
  ok(mixed.score >= 3, '16-char mixed password is strong');
  ok(CY.crackTime(1e12) === 'longer than the age of the universe' || /year/.test(CY.crackTime(1e12)), 'crack time formats large values');
  ok(CY.crackTime(0.4) === 'instantly', 'crack time formats tiny values');
  // increasing length increases strength
  ok(CY.passwordInfo('abcd1234!').bits < CY.passwordInfo('abcd1234!xyzQ7').bits, 'more length = more bits');
})();

/* ---------------- certificate logic ---------------- */
(function () {
  CY.reset();
  ok(!CY.certificateEligible(), 'not eligible without name/modules/pass');
  CY.state.name = 'Test User';
  ok(!CY.certificateEligible(), 'still not eligible without completion');
  CY.coreModules().forEach(function (m) { CY.state.modules[m.id] = { learned: 1, done: 1 }; });
  ok(CY.coreComplete(), 'coreComplete true when all done');
  ok(!CY.certificateEligible(), 'still not eligible without passing the assessment');
  CY.state.assessment.passed = true; CY.state.assessment.ts = Date.now();
  ok(CY.certificateEligible(), 'eligible with name + complete + passed');
  ok(/^[0-9A-F]{8}$/.test(CY.certCode()), 'verification code looks right: ' + CY.certCode());
  CY.reset();
})();

console.log('----------------------------------------');
if (errors.length) {
  var seen = {}; errors.forEach(function (e) { var k = e.replace(/#\d+/g, '#'); if (seen[k]) return; seen[k] = 1; console.log('  ' + e); });
  console.log('TOTAL ERRORS:', errors.length);
  process.exit(1);
} else {
  console.log('ALL CHECKS PASSED \u2713');
}
