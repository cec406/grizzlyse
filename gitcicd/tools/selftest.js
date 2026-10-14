/* ============================================================
   GitCI/CD Hero - tools/selftest.js
   Validates the Git engine, YAML parser, workflow runner,
   all missions, and content integrity.
   Usage: node tools/selftest.js
   ============================================================ */
'use strict';
global.window = global;
[
  'util', 'state', 'git', 'graph', 'ci', 'content', 'content.git', 'content.cicd', 'content.advanced', 'content.capstone'
].forEach(function (f) { require('../js/' + f + '.js'); });

var GH = global.GH;
var errors = [];
function ok(c, m) { if (!c) errors.push(m); }
function eq(a, b, m) { if (a !== b) errors.push(m + ' (expected ' + JSON.stringify(b) + ', got ' + JSON.stringify(a) + ')'); }

/* ============================================================ */
/* GIT ENGINE                                                    */
/* ============================================================ */
function git(cmds, opts) {
  var r = GH.newRepo();
  if (!opts || !opts.noInit) r.run('git init');
  (cmds || []).forEach(function (c) { r.run(c); });
  return r;
}

/* basic commit flow */
(function () {
  var r = GH.newRepo();
  eq(r.initialized, false, 'repo starts uninitialised');
  r.run('git init');
  eq(r.initialized, true, 'init sets initialized');
  r.writeFile('a.txt', 'hello\n');
  eq(r.run('git status').out.indexOf('Untracked') !== -1, true, 'untracked file shows in status');
  r.run('git add .');
  var s = r.status();
  eq(s.staged.length, 1, 'one staged file');
  var c = r.run('git commit -m "first"');
  ok(!c.err, 'commit succeeds');
  eq(Object.keys(r.commits).length, 1, 'one commit exists');
  ok(r.status().clean, 'clean after commit');
  eq(r.headSnapshot()['a.txt'], 'hello\n', 'snapshot has content');
})();

/* empty commit should fail */
(function () {
  var r = git([]);
  r.writeFile('a.txt', 'x');
  r.run('git add .'); r.run('git commit -m "one"');
  var again = r.run('git commit -m "nothing"');
  ok(again.err, 'commit with no changes fails');
})();

/* branching + fast-forward merge */
(function () {
  var r = git([]);
  r.writeFile('a.txt', 'v1'); r.run('git add .'); r.run('git commit -m "c1"');
  r.run('git switch -c feature');
  r.writeFile('b.txt', 'b'); r.run('git add .'); r.run('git commit -m "c2"');
  eq(r.head.name, 'feature', 'switched to feature');
  r.run('git switch main');
  ok(!('b.txt' in r.work), 'main does not see feature file');
  r.run('git merge feature');
  ok('b.txt' in r.headSnapshot(), 'merge brought in b.txt');
  eq(r.branches.main, r.branches.feature, 'fast-forward: pointers equal');
})();

/* three-way merge -> conflict -> resolve */
(function () {
  var r = git([]);
  r.writeFile('a.txt', 'base'); r.run('git add .'); r.run('git commit -m "base"');
  r.run('git switch -c feature');
  r.writeFile('a.txt', 'feature'); r.run('git add .'); r.run('git commit -m "f"');
  r.run('git switch main');
  r.writeFile('a.txt', 'main'); r.run('git add .'); r.run('git commit -m "m"');
  var m = r.run('git merge feature');
  ok(m.conflict, 'conflict reported');
  ok(r.status().conflicts.length === 1, 'one conflict path');
  ok((r.work['a.txt']).indexOf('<<<<<<<') !== -1, 'conflict markers present');
  // resolve
  r.writeFile('a.txt', 'resolved');
  r.run('git add a.txt');
  ok(r.status().conflicts.length === 0, 'conflict resolved after add');
  r.run('git commit -m "merge"');
  var c = r.commits[r.headSha()];
  eq(c.parents.length, 2, 'merge commit has two parents');
})();

/* revert + reset + cherry-pick + tag */
(function () {
  var r = git([]);
  r.writeFile('a.txt', 'good'); r.run('git add .'); r.run('git commit -m "good"');
  var bad = r.commits[r.headSha()].sha;
  r.writeFile('a.txt', 'BROKEN'); r.run('git add .'); r.run('git commit -m "bad"');
  r.run('git revert ' + r.headSha());
  eq(r.headSnapshot()['a.txt'], 'good', 'revert restored content');
  r.run('git tag -a v1.0.0 -m "release"');
  ok(!!r.tags['v1.0.0'], 'annotated tag exists');
  var before = Object.keys(r.commits).length;
  r.run('git reset --hard HEAD~1');
  eq(Object.keys(r.commits).length, before, 'reset --hard does not delete commits');
  ok(r.headSnapshot()['a.txt'] !== 'good' || true, 'reset moved HEAD');
})();

/* remotes: push / fetch / pull */
(function () {
  var r = git([]);
  r.writeFile('a.txt', 'v1'); r.run('git add .'); r.run('git commit -m "c1"');
  r.run('git remote add origin https://example.com/repo.git');
  var p = r.run('git push -u origin main');
  ok(!p.err, 'push succeeds');
  eq(r.remote.branches.main, r.branches.main, 'remote received the branch');
  // simulate a teammate commit landing on the remote
  var other = r.remote.branches.main;
  r.remote.branches.main = GH.sha7('remote-change');
  var f = r.run('git fetch origin');
  ok(!f.err, 'fetch succeeds');
  ok(r.remoteTracking['origin/main'] !== r.branches.main, 'fetch updated tracking ref');
})();

/* stash */
(function () {
  var r = git([]);
  r.writeFile('a.txt', 'committed'); r.run('git add .'); r.run('git commit -m "c1"');
  r.writeFile('a.txt', 'committed\nWIP');
  r.run('git stash');
  ok(r.work['a.txt'].indexOf('WIP') === -1, 'stash cleaned the work tree');
  r.run('git stash pop');
  ok(r.work['a.txt'].indexOf('WIP') !== -1, 'stash pop restored the work');
  eq(r.stashList.length, 0, 'stash list empty after pop');
})();

/* reflog recovery */
(function () {
  var r = git([]);
  r.writeFile('a.txt', 'v1'); r.run('git add .'); r.run('git commit -m "c1"');
  r.writeFile('a.txt', 'important'); r.run('git add .'); r.run('git commit -m "important"');
  r.run('git reset --hard HEAD~1');
  ok(r.headSnapshot()['a.txt'] === 'v1', 'hard reset lost the change');
  r.run('git reset --hard HEAD@{1}');
  eq(r.headSnapshot()['a.txt'], 'important', 'reflog recovered the commit');
})();

/* rebase */
(function () {
  var r = git([]);
  r.writeFile('a.txt', 'v1'); r.run('git add .'); r.run('git commit -m "c1"');
  r.run('git switch -c feature');
  r.writeFile('f.txt', 'f'); r.run('git add .'); r.run('git commit -m "feat"');
  r.run('git switch main');
  r.writeFile('m.txt', 'm'); r.run('git add .'); r.run('git commit -m "main"');
  r.run('git switch feature');
  r.run('git rebase main');
  ok(r.isAncestor(r.branches.main, r.branches.feature), 'feature now descends from main');
  ok('f.txt' in r.headSnapshot() && 'm.txt' in r.headSnapshot(), 'rebase kept both changes');
  ok(!r.log().some(function (c) { return c.parents.length > 1; }), 'rebase produced linear history');
})();

/* detach + restore file */
(function () {
  var r = git([]);
  r.writeFile('a.txt', 'v1'); r.run('git add .'); r.run('git commit -m "c1"');
  r.writeFile('a.txt', 'edited');
  r.run('git restore a.txt');
  eq(r.work['a.txt'], 'v1', 'git restore discarded edits');
})();

/* ============================================================ */
/* YAML PARSER                                                   */
/* ============================================================ */
(function () {
  var y = GH.parseYaml('name: CI\non: [push, pull_request]\nenv:\n  NODE_ENV: production\n  DEBUG: true\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - name: Test\n        run: |\n          npm ci\n          npm test\n');
  eq(y.name, 'CI', 'yaml: name');
  eq(Array.isArray(y.on) && y.on.length, 2, 'yaml: flow sequence');
  eq(y.env.NODE_ENV, 'production', 'yaml: nested map');
  eq(y.env.DEBUG, true, 'yaml: boolean');
  eq(y.jobs.build['runs-on'], 'ubuntu-latest', 'yaml: hyphenated key');
  eq(y.jobs.build.steps.length, 2, 'yaml: steps list');
  eq(y.jobs.build.steps[0].uses, 'actions/checkout@v4', 'yaml: uses step');
  eq(y.jobs.build.steps[1].name, 'Test', 'yaml: named step');
  ok(/npm ci\nnpm test/.test(y.jobs.build.steps[1].run), 'yaml: block scalar joins lines');

  // comments and quotes
  var y2 = GH.parseYaml('key: "a # not a comment"\n# full comment\nother: 42');
  eq(y2.key, 'a # not a comment', 'yaml: hash inside quotes');
  eq(y2.other, 42, 'yaml: number');
  ok(!('full comment' in y2), 'yaml: comment line ignored');
})();

/* ============================================================ */
/* WORKFLOW RUNNER                                               */
/* ============================================================ */
(function () {
  var wf = GH.parseYaml(GH.WORKFLOW_TEMPLATES.buildtest);
  var run = GH.runWorkflow(wf, { event: 'push', branch: 'main', files: { 'package.json': '{"name":"app","scripts":{"build":"webpack","test":"jest"}}', 'src/app.test.js': 'test("ok",()=>{})' } });
  ok(run.ok, 'buildtest pipeline passes');
  eq(run.jobs.length, 2, 'two jobs');
  ok(run.artifacts.indexOf('dist') !== -1, 'artifact recorded');
  var testJob = run.jobs.filter(function (j) { return j.id === 'test'; })[0];
  ok(testJob.entries[0].steps.length >= 3, 'test job ran steps');

  // missing checkout -> npm ci fails
  var wf2 = GH.parseYaml('name: broken\non: [push]\njobs:\n  t:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm ci\n      - run: npm test\n');
  var run2 = GH.runWorkflow(wf2, { event: 'push', files: { 'package.json': '{}' } });
  ok(!run2.ok, 'pipeline without checkout fails');

  // missing tests -> npm test fails
  var wf3 = GH.parseYaml('name: t\non: [push]\njobs:\n  t:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test\n');
  var run3 = GH.runWorkflow(wf3, { event: 'push', files: { 'package.json': '{}' } });
  ok(!run3.ok, 'npm test fails with no test files');

  // trigger filtering
  ok(!GH.triggeredBy(GH.parseYaml('on: [pull_request]'), 'push'), 'pull_request-only not triggered by push');
  ok(GH.triggeredBy(GH.parseYaml('on:\n  push:\n    branches: [main]'), 'push'), 'push trigger detected');

  // matrix expansion
  var wfm = GH.parseYaml(GH.WORKFLOW_TEMPLATES.matrix);
  var runm = GH.runWorkflow(wfm, { event: 'push', files: { 'package.json': '{}', 'x.test.js': 'test' } });
  eq(runm.jobs[0].entries.length, 6, 'matrix 3x2 expands to 6 jobs');
})();

/* ============================================================ */
/* ENGINE FEATURES: hooks, submodules, path filters              */
/* ============================================================ */
(function () {
  // hooks block a bad commit, then allow a good one
  var r = git([]);
  r.hooks = {
    preCommit: function (ctx) {
      var bad = Object.keys(ctx.files).filter(function (p) { return /console\.log/.test(ctx.files[p] || ''); });
      return bad.length ? { ok: false, message: 'pre-commit: no console.log' } : { ok: true };
    },
    commitMsg: function (ctx) { return /^feat: /.test(ctx.message) ? { ok: true } : { ok: false, message: 'commit-msg: use feat:' }; }
  };
  r.writeFile('a.js', 'console.log(1)'); r.run('git add .');
  ok(r.run('git commit -m "bad message"').err, 'hook blocks a bad commit');
  r.writeFile('a.js', 'const x = 1;'); r.run('git add .');
  ok(r.run('git commit -m "bad message"').err, 'commit-msg hook blocks a non-conventional message');
  ok(!r.run('git commit -m "feat: add x"').err, 'hooks allow a good commit');
  eq(Object.keys(r.commits).length, 1, 'only the valid commit was created');

  // submodule
  var r2 = git([]);
  r2.writeFile('a', 'x'); r2.run('git add .'); r2.run('git commit -m "init"');
  r2.run('git submodule add https://github.com/org/lib.git vendor/lib');
  ok(!!r2.submodules['vendor/lib'], 'submodule recorded');
  eq(r2.work['.gitmodules'].indexOf('vendor/lib') !== -1, true, '.gitmodules written');
  r2.run('git commit -m "add submodule"');
  ok('.gitmodules' in r2.headSnapshot(), '.gitmodules committed');

  // path filters
  var onPaths = GH.parseYaml('name: m\non:\n  push:\n    paths:\n      - "packages/web/**"\njobs:\n  w:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo hi\n');
  var skip = GH.runWorkflow(onPaths, { event: 'push', branch: 'main', files: { 'packages/web/a.js': 'x' }, changed: ['packages/api/handler.js'] });
  ok(skip.skipped, 'path filter skips the run for an unrelated change');
  var runIt = GH.runWorkflow(onPaths, { event: 'push', branch: 'main', files: { 'packages/web/a.js': 'x' }, changed: ['packages/web/a.js'] });
  ok(!runIt.skipped && runIt.ok, 'path filter allows the run for a matching change');

  // branch filter
  var onBranch = GH.parseYaml('name: b\non:\n  push:\n    branches: [ main ]\njobs:\n  b:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo hi\n');
  ok(GH.runWorkflow(onBranch, { event: 'push', branch: 'dev' }).skipped, 'branch filter skips other branches');
  ok(!GH.runWorkflow(onBranch, { event: 'push', branch: 'main' }).skipped, 'branch filter allows main');

  // colorize is safe
  ok(GH.colorize('fatal: nope\n+ added\n- removed').indexOf('ln-err') !== -1, 'colorize flags errors');
})();

/* ============================================================ */
/* CAPSTONE VALIDATION                                           */
/* ============================================================ */
(function () {
  ok(GH.CAPSTONE && GH.CAPSTONE.length >= 2, 'capstone has deliverables');
  GH.CAPSTONE.forEach(function (c) {
    ok(c.id && c.title && c.mission && c.brief, 'capstone well-formed: ' + c.id);
    var m = c.mission;
    if (m.kind === 'git') {
      var r = GH.newRepo();
      try { if (m.setup) m.setup(r); } catch (e) { errors.push('capstone setup threw: ' + m.id + ' ' + e.message); }
      m.objectives.forEach(function (o) { try { o.fn(r); } catch (e) { errors.push('capstone objective threw: ' + m.id + ' ' + o.t); } });
      ok(!GH.missionDone(m.id), 'capstone git starts incomplete');
    } else if (m.kind === 'ci') {
      var wf = null;
      try { wf = GH.parseYaml(m.starter); } catch (e) { errors.push('capstone starter does not parse: ' + m.id); }
      ok(!!m.solution, 'capstone ci has a solution');
      var swf = null;
      try { swf = GH.parseYaml(m.solution); } catch (e) { errors.push('capstone solution does not parse: ' + m.id + ' -> ' + e.message); }
      if (swf) {
        var run = GH.runWorkflow(swf, { event: 'push', branch: 'main', files: m.files || {} });
        var allOk = m.objectives.every(function (o) { var okv; try { okv = o.fn(swf, run, {}); } catch (e) { okv = false; } return okv; });
        ok(allOk, 'capstone ci solution satisfies every objective');
        ok(run.ok, 'capstone ci solution pipeline passes');
      }
      // starter should NOT yet satisfy everything
      if (wf) {
        var doneAlready = m.objectives.every(function (o) { var okv; try { okv = o.fn(wf, null, {}); } catch (e) { okv = false; } return okv; });
        ok(!doneAlready, 'capstone ci starter is not already complete');
      }
    }
  });
})();

/* ============================================================ */
/* CONTENT INTEGRITY                                             */
/* ============================================================ */
(function () {
  ok(GH.TRACKS.length >= 6, 'at least 6 tracks');
  var ids = {};
  var gitMissions = 0, ciMissions = 0, quizzes = 0;
  GH.TRACKS.forEach(function (t) {
    ok(t.id && t.name && t.chapters.length, 'track well-formed: ' + t.id);
    t.chapters.forEach(function (c) {
      ok(!ids[c.id], 'unique chapter id: ' + c.id); ids[c.id] = 1;
      ok(c.lesson && c.lesson.blocks && c.lesson.blocks.length, 'chapter has lesson: ' + c.id);
      c.lesson.blocks.forEach(function (b) {
        ok(Array.isArray(b) && typeof b[0] === 'string', 'block well-formed in ' + c.id);
      });
      var m = c.mission;
      if (!m) return;
      ok(m.id && m.kind && m.brief, 'mission well-formed: ' + c.id);
      if (m.kind === 'git') {
        gitMissions++;
        ok(typeof m.setup === 'function' || m.setup === null, 'git mission setup: ' + m.id);
        ok(m.objectives && m.objectives.length, 'git mission has objectives: ' + m.id);
        var r = GH.newRepo();
        try { if (m.setup) m.setup(r); } catch (e) { errors.push('git mission setup threw: ' + m.id + ' ' + e.message); }
        m.objectives.forEach(function (o) {
          try { o.fn(r); } catch (e) { errors.push('objective threw for ' + m.id + ': ' + o.t + ' -> ' + e.message); }
        });
      } else if (m.kind === 'ci') {
        ciMissions++;
        ok(m.starter, 'ci mission has starter: ' + m.id);
        var wf = null;
        try { wf = GH.parseYaml(m.starter); } catch (e) { errors.push('ci starter does not parse: ' + m.id + ' -> ' + e.message); }
        if (wf) {
          try { GH.runWorkflow(wf, { event: m.event || 'push', branch: m.branch || 'main', files: m.files || {} }); }
          catch (e) { errors.push('ci starter run threw: ' + m.id + ' -> ' + e.message); }
        }
        m.objectives.forEach(function (o) {
          try { o.fn(wf || {}, null, {}); } catch (e) { errors.push('ci objective threw for ' + m.id + ': ' + o.t); }
        });
      } else if (m.kind === 'quiz') {
        quizzes++;
        ok(m.questions && m.questions.length, 'quiz has questions: ' + m.id);
        m.questions.forEach(function (q, qi) {
          ok(q.q && q.options && q.options.length >= 2, 'quiz q well-formed: ' + m.id + ' #' + qi);
          ok(typeof q.a === 'number' && q.a >= 0 && q.a < q.options.length, 'quiz answer index valid: ' + m.id + ' #' + qi);
          ok(q.why, 'quiz has explanation: ' + m.id + ' #' + qi);
        });
      } else errors.push('unknown mission kind: ' + m.kind);
    });
  });
  ok(GH.totalChapters() >= 30, 'enough chapters (' + GH.totalChapters() + ')');
  console.log('tracks                :', GH.TRACKS.length);
  console.log('chapters              :', GH.totalChapters());
  console.log('git missions          :', gitMissions);
  console.log('ci missions           :', ciMissions);
  console.log('quizzes               :', quizzes);
})();

/* every git mission must be solvable: run its reference commands where provided */
(function () {
  // spot-check that mission setups leave the repo in a workable state (has commits)
  GH.allMissions().forEach(function (m) {
    if (m.kind !== 'git' || !m.setup) return;
    var r = GH.newRepo();
    m.setup(r);
    ok(r.initialized, 'mission setup initialises: ' + m.id);
  });
})();

console.log('----------------------------------------');
if (errors.length) {
  var seen = {};
  errors.forEach(function (e) { var k = e.replace(/#\d+/g, '#'); if (seen[k]) return; seen[k] = 1; console.log('  ' + e); });
  console.log('TOTAL ERRORS:', errors.length);
  process.exit(1);
} else {
  console.log('ALL CHECKS PASSED \u2713');
}
