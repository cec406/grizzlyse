/* ============================================================
   CSMath Hero - tools/selftest.js
   Runs every problem generator across all difficulty levels and
   validates the output. Usage:  node tools/selftest.js
   ============================================================ */
'use strict';
global.window = global;

require('../js/util.js');
require('../js/state.js');
require('../js/problems.js');
require('../js/curriculum.js');
require('../js/viz.js');
require('../js/lessons.js');
require('../js/features.js');
[
  'gen.foundations', 'gen.prealgebra', 'gen.algebra', 'gen.functions', 'gen.trig',
  'gen.calculus', 'gen.discrete', 'gen.linalg', 'gen.probability', 'gen.algorithms', 'gen.cs',
  'lesson.foundations', 'lesson.algebra', 'lesson.calculus', 'lesson.linalg', 'lesson.cs'
].forEach(function (f) { require('../js/' + f + '.js'); });

var MH = window.MH;
var PER_LEVEL = 60;
var problems = [];
var errors = [];
var nulls = {};

MH.ALL_SKILLS.forEach(function (skill) {
  if (!MH.gen[skill.id]) { errors.push('MISSING GENERATOR: ' + skill.id); return; }
  for (var lvl = 1; lvl <= 10; lvl++) {
    for (var i = 0; i < PER_LEVEL / 10; i++) {
      var p;
      try { p = MH.gen[skill.id](MH.makeRng((lvl * 1013 + i * 7919 + skill.id.length) >>> 0), lvl); }
      catch (e) { errors.push('THREW in ' + skill.id + ' lvl ' + lvl + ': ' + e.message); return; }
      if (!p) { nulls[skill.id] = (nulls[skill.id] || 0) + 1; continue; }
      problems.push({ p: p, skill: skill.id, lvl: lvl });
      // validate answer
      var a = p.answer;
      if (!a || !a.type) { errors.push('BAD ANSWER SPEC: ' + skill.id); continue; }
      if (!p.prompt) errors.push('NO PROMPT: ' + skill.id);
      if (!p.hint) errors.push('NO HINT: ' + skill.id);
      if (!p.steps || !p.steps.length) errors.push('NO STEPS: ' + skill.id);
      if (a.type === 'number') {
        if (typeof a.value !== 'number' || !isFinite(a.value)) errors.push('NON-FINITE ANSWER: ' + skill.id + ' -> ' + a.value + ' | ' + p.prompt);
        else if (!MH.grade(a, String(a.value)).ok) errors.push('SELF-GRADE FAIL: ' + skill.id + ' expected ' + a.value);
      } else if (a.type === 'choice') {
        if (!a.choices || a.value < 0 || a.value >= a.choices.length) errors.push('BAD CHOICE INDEX: ' + skill.id + ' ' + a.value + '/' + (a.choices || []).length);
        var dup = a.choices.filter(function (c, i) { return a.choices.indexOf(c) !== i; });
        if (dup.length) errors.push('DUPLICATE CHOICES: ' + skill.id + ' -> ' + JSON.stringify(a.choices));
        if (!MH.grade(a, a.value).ok) errors.push('CHOICE SELF-GRADE FAIL: ' + skill.id);
      } else if (a.type === 'text') {
        if (!MH.grade(a, a.value).ok) errors.push('TEXT SELF-GRADE FAIL: ' + skill.id);
      }
      // rendering must not throw
      try { MH.m(p.prompt); MH.m(p.hint); (p.steps || []).forEach(MH.m); if (a.choices) a.choices.forEach(MH.m); }
      catch (e) { errors.push('RENDER THREW: ' + skill.id + ': ' + e.message); }
      // grading must reject garbage gracefully
      try { MH.grade(a, 'zzz'); MH.grade(a, ''); MH.grade(a, null); } catch (e) { errors.push('GRADE THREW: ' + skill.id); }
    }
  }
});

// ---- lessons ----
var BLOCK_TYPES = ['p', 'f', 'list', 'note', 'warn', 'ex', 'viz', 'table'];
var usedViz = {};
MH.ALL_SKILLS.forEach(function (skill) {
  var les = MH.getLesson(skill.id);
  if (!les) { errors.push('MISSING LESSON: ' + skill.id); return; }
  if (!les.hook) errors.push('lesson missing hook: ' + skill.id);
  if (les.viz) { usedViz[les.viz] = 1; if (!MH.viz[les.viz]) errors.push('lesson viz unknown: ' + skill.id + ' -> ' + les.viz); }
  if (!les.s || !les.s.length) errors.push('lesson has no sections: ' + skill.id);
  (les.s || []).forEach(function (sec, si) {
    if (!sec.h) errors.push('section missing heading: ' + skill.id + ' #' + si);
    if (!sec.b || !sec.b.length) errors.push('section has no blocks: ' + skill.id + ' #' + si);
    (sec.b || []).forEach(function (b) {
      if (!Array.isArray(b) || BLOCK_TYPES.indexOf(b[0]) === -1) { errors.push('bad block in ' + skill.id + ': ' + JSON.stringify(b)); return; }
      if (b[0] === 'viz') { usedViz[b[1]] = 1; if (!MH.viz[b[1]]) errors.push('block viz unknown: ' + skill.id + ' -> ' + b[1]); }
      if (b[0] === 'ex' && (!b[1] || !b[1].q)) errors.push('bad example in ' + skill.id);
      try { MH.m(b[1] && b[1].q || b[1] || ''); } catch (e) { errors.push('lesson render threw: ' + skill.id); }
    });
  });
  if (!les.f || !les.f.length) errors.push('lesson missing formula sheet: ' + skill.id);
  if (!les.tips || !les.tips.length) errors.push('lesson missing tips: ' + skill.id);
});
console.log('lessons validated     :', MH.ALL_SKILLS.length - errors.filter(function (e) { return e.indexOf('LESSON') !== -1; }).length);
console.log('visual widgets used   :', Object.keys(usedViz).sort().join(', '));

// every registered generator should map to a curriculum skill
Object.keys(MH.gen).forEach(function (id) {
  if (!MH.skillById(id)) errors.push('ORPHAN GENERATOR (no curriculum entry): ' + id);
});

// ---- expression evaluator ----
function near(a, b, tol) { return Math.abs(a - b) <= (tol == null ? 1e-9 : tol); }
var EXPR = [
  ['2+3*4', 14], ['(2+3)*4', 20], ['2^3^2', 512], ['-2^2', -4], ['7-2*3', 1],
  ['3/4', 0.75], ['1/3', 1 / 3], ['5!', 120], ['C(5,2)', 10], ['P(5,2)', 20],
  ['mod(17,5)', 2], ['log(100)', 2], ['ln(e)', 1], ['sqrt(2)^2', 2], ['2pi', null],
  ['abs(-7)', 7], ['10/0', null], ['2+', null], ['foo(2)', null], ['', null],
  ['sqrt(50)/2', Math.sqrt(50) / 2], ['fact(6)/2', 360], ['pi', Math.PI], ['e', Math.E],
  ['C(10,3)', 120], ['P(4,2)', 12], ['(-3)^2', 9], ['2^0.5', Math.sqrt(2)]
];
EXPR.forEach(function (ex) {
  var got = MH.exprEval(ex[0]);
  if (ex[1] === null) { if (got != null) errors.push('EXPR should fail: ' + ex[0] + ' got ' + got); }
  else if (got == null || !near(got, ex[1], 1e-9)) errors.push('EXPR mismatch: ' + ex[0] + ' expected ' + ex[1] + ' got ' + got);
});
// degree mode default; toggle to radians and back
if (!near(MH.exprEval('sin(30)'), 0.5, 1e-9)) errors.push('sin(30) in degrees should be 0.5');
MH.setDeg(false);
if (!near(MH.exprEval('sin(pi/2)'), 1, 1e-9)) errors.push('sin(pi/2) in radians should be 1');
MH.setDeg(true);

// ---- graders must accept typed expressions ----
var TYPED = [
  [0.75, '3/4'], [Math.sqrt(2), 'sqrt(2)', 0.01], [10, 'C(5,2)'], [8, '2^3'], [0.5, 'sin(30)'],
  [120, '5!'], [Math.PI, 'pi'], [37.5, '37.5%'], [0.25, '1 / 4'], [-4, '-2^2'], [1000, '1,000']
];
TYPED.forEach(function (t) {
  var spec = { type: 'number', value: t[0], tol: t[2] == null ? 1e-6 : t[2] };
  if (!MH.grade(spec, t[1]).ok) errors.push('GRADER rejected expression "' + t[1] + '" for ' + t[0]);
});

// ---- learning paths ----
MH.PATHS.forEach(function (p) {
  if (!p.steps || !p.steps.length) errors.push('path has no steps: ' + p.id);
  p.steps.forEach(function (id) { if (!MH.skillById(id)) errors.push('path ' + p.id + ' references unknown skill ' + id); });
  var pr = MH.pathProgress(p);
  if (pr.total !== p.steps.length) errors.push('pathProgress total mismatch: ' + p.id);
  if (pr.next && !MH.skillById(pr.next)) errors.push('path next is invalid: ' + p.id);
});
MH.ALL_SKILLS.forEach(function (s) {
  if (!MH.PATHS.some(function (p) { return p.steps.indexOf(s.id) !== -1; })) errors.push('skill appears in no path: ' + s.id);
});

// ---- lightning-round drill generators ----
for (var di = 0; di < 400; di++) {
  var d = MH.DRILL[di % MH.DRILL.length](MH.makeRng((di * 2654435761) >>> 0));
  if (!d || !d.prompt || !d.answer) { errors.push('bad drill problem #' + di); continue; }
  if (!MH.grade(d.answer, d.answer.value).ok) errors.push('drill self-grade failed: ' + d.prompt);
}

// ---- mock-exam builder ----
var exam = MH.buildExam({ realmIds: ['fnd', 'bits'], count: 12 });
if (exam.length !== 12) errors.push('buildExam returned ' + exam.length + ' of 12');
exam.forEach(function (p) { if (!p.prompt || !p.answer) errors.push('bad exam problem'); });

// ---- spaced repetition ----
MH.state.skills = {};
MH.srsUpdate('fnd.integers', true);
if (!(MH.state.skills['fnd.integers'].due > Date.now())) errors.push('correct answer should schedule a future review');
MH.srsUpdate('fnd.integers', false);
if (!(MH.state.skills['fnd.integers'].due <= Date.now() + 5)) errors.push('a miss should make the skill due now');
var sk = MH.state.skills['fnd.integers']; sk.c = 3; sk.due = Date.now() - 1000;
if (MH.reviewDue(99).indexOf(MH.skillById('fnd.integers')) === -1) errors.push('reviewDue should list an overdue practised skill');

// ---- daily challenge ----
var dc = MH.dailyChallenge();
if (!dc.problems.length) errors.push('daily challenge produced no problems');

// ---- export / import round trip ----
if (MH.importProgress(MH.exportProgress()) !== true) errors.push('importing our own export failed');
if (MH.importProgress('{"nope":1}') !== false) errors.push('import should reject junk');
if (MH.importProgress('not json at all') !== false) errors.push('import should reject non-JSON');

console.log('generators registered :', Object.keys(MH.gen).length);
console.log('curriculum skills      :', MH.ALL_SKILLS.length);
console.log('problems validated     :', problems.length);
console.log('null returns           :', JSON.stringify(nulls));
console.log('----------------------------------------');
if (errors.length) {
  var seen = {};
  errors.forEach(function (e) { var k = e.replace(/lvl \d+/g, '').replace(/\d+/g, '#'); if (!seen[k]) { seen[k] = 0; console.log('  ' + e); } seen[k]++; });
  console.log('TOTAL ERRORS:', errors.length);
  process.exit(1);
} else {
  console.log('ALL CHECKS PASSED \u2713');
}
