/* ============================================================
   GitCI/CD Hero - content.advanced.js
   Track 8: Advanced Git & Monorepos
   Hooks, commit standards, submodules, LFS, monorepos, path
   filters, bisect & worktrees.
   ============================================================ */
(function (GH) {
  'use strict';

  function setup(repo, ops) {
    repo.initialized = true;
    ops.forEach(function (op) {
      if (op[0] === 'write') repo.writeFile(op[1], op[2]);
      else if (op[0] === 'del') repo.deleteFile(op[1]);
      else if (op[0] === 'cmd') repo.run(op[1]);
    });
  }
  function anyStep(wf, fn) { var out = false; Object.keys((wf && wf.jobs) || {}).forEach(function (k) { ((wf.jobs[k].steps) || []).forEach(function (s) { if (fn(s)) out = true; }); }); return out; }
  function uses(wf, re) { return anyStep(wf, function (s) { return s.uses && re.test(String(s.uses)); }); }
  function runsCmd(wf, re) { return anyStep(wf, function (s) { return s.run && re.test(String(s.run)); }); }
  function pushPaths(wf) { var on = wf && wf.on; if (on && typeof on === 'object') { var p = on.push; if (p && p.paths) return p.paths; } return null; }

  GH.track({
    id: 'advanced', name: 'Advanced Git & Monorepos', icon: '&#129520;', color: '#f472b6',
    blurb: 'Hooks, commit standards, submodules, LFS, monorepos and CI path filters.',
    chapters: [

      {
        id: 'adv-hooks', title: 'Git hooks: automate the rules',
        lesson: {
          hook: 'Hooks are scripts Git runs automatically at key moments — your team’s rules, enforced by the machine.',
          blocks: [
            ['p', 'Hooks live in `.git/hooks/` and fire on events. The everyday ones:'],
            ['list', [
              '**pre-commit** — runs before a commit is created; the place to lint, format, and block junk. Exit non-zero to abort.',
              '**commit-msg** — validates the message (e.g. enforce Conventional Commits).',
              '**pre-push** — runs tests before pushing to the remote.'
            ]],
            ['code', '#!/bin/sh\n# .git/hooks/pre-commit\nnpm run lint || exit 1\n\ngrep -r "console.log" src && { echo "remove debug logs"; exit 1; }'],
            ['warn', 'Hooks are local and not cloned by default. Share them with a tool like **Husky** (Node) or by committing scripts and setting `core.hooksPath`.'],
            ['note', 'The best hooks are fast. A pre-commit hook that takes 30 seconds will be bypassed with `--no-verify` within a week.']
          ]
        },
        mission: {
          id: 'adv-hooks-m', kind: 'git',
          brief: 'This repo has two hooks installed. The **pre-commit** hook blocks `console.log`, and the **commit-msg** hook requires Conventional Commits. Fix the file and make a passing commit.',
          setup: function (repo) {
            setup(repo, [['cmd', 'git init'], ['write', 'app.js', 'console.log("debug");\nfunction main() { return 1; }\n'], ['cmd', 'git add .']]);
            repo.hooks = {
              preCommit: function (ctx) {
                var bad = Object.keys(ctx.files).filter(function (p) { return /console\.log/.test(ctx.files[p] || ''); });
                return bad.length ? { ok: false, message: 'pre-commit: remove debug console.log from ' + bad.join(', ') + ' (or use git commit --no-verify)' } : { ok: true };
              },
              commitMsg: function (ctx) {
                return /^(feat|fix|chore|docs|test|ci|refactor|perf)(\(.+\))?: .+/.test(ctx.message)
                  ? { ok: true } : { ok: false, message: 'commit-msg: not Conventional Commits. Try "feat: add main function"' };
              }
            };
          },
          objectives: [
            { t: 'app.js is committed', fn: function (g) { return !!g.headCommit() && ('app.js' in g.headCommit().files); } },
            { t: 'No console.log remains', fn: function (g) { return !/console\.log/.test((g.headSnapshot()['app.js'] || '')); } },
            { t: 'Message follows Conventional Commits', fn: function (g) { var c = g.headCommit(); return !!c && /^(feat|fix|chore|docs|test|ci|refactor|perf)(\(.+\))?: .+/.test(c.message); } }
          ],
          hint: 'Edit app.js to delete the console.log line, `git add .`, then `git commit -m "feat: add main function"`.'
        }
      },

      {
        id: 'adv-conventional', title: 'Conventional Commits & change logs',
        lesson: {
          hook: 'A commit message format is a tiny contract that unlocks automated changelogs and semantic versioning.',
          blocks: [
            ['p', 'The **Conventional Commits** spec: `type(scope): description`, e.g.'],
            ['code', 'feat(auth): add OAuth login\nfix(api): handle null payload\ndocs: update README\nchore(deps): bump node\nBREAKING CHANGE: drops Node 16'],
            ['p', 'Because the type is machine-readable, tools can:'],
            ['list', ['Generate a **CHANGELOG.md** automatically.', 'Decide the next version: `feat` bumps minor, `fix` bumps patch, a `!` or `BREAKING CHANGE` bumps major.', 'Trigger releases from merges to main.']],
            ['note', 'One commit, one idea. A commit that “also fixes a typo” makes `git revert` and `git bisect` less precise.']
          ]
        },
        mission: {
          id: 'adv-conventional-q', kind: 'quiz', brief: 'Commit hygiene and conventions.',
          questions: [
            { q: 'Which message is Conventional Commits?', options: ['updated stuff', 'fix(api): handle null payload', 'WIP', 'Fixing things finally'], a: 1, why: 'type(scope): description.' },
            { q: 'A `feat:` commit typically triggers which semver bump?', options: ['major', 'minor', 'patch', 'none'], a: 1, why: 'New features bump the minor version.' },
            { q: 'Why keep commits small and focused?', options: ['They look nicer', 'Revert, bisect and review are all more precise', 'Git is faster', 'CI needs it'], a: 1, why: 'Small commits make history a reliable tool.' }
          ]
        }
      },

      {
        id: 'adv-submodules', title: 'Submodules & subtrees',
        lesson: {
          hook: 'Sometimes a project depends on another repo that must stay a repo. That is a submodule.',
          blocks: [
            ['p', 'A submodule is a full Git repository nested inside another, pinned to a specific commit. The parent records a **gitlink** (a commit hash), not the files.'],
            ['code', 'git submodule add https://github.com/org/lib.git vendor/lib\ngit clone --recurse-submodules <url>\ngit submodule update --init --recursive'],
            ['table', { head: ['', 'Submodule', 'Subtree'], rows: [['History', 'separate repo', 'copied into parent'], ['Update', 'explicit', 'normal pull'], ['Clone', 'needs --recurse', 'just works']] }],
            ['warn', 'A classic trap: after someone updates a submodule, you must `git submodule update` — otherwise you are on the old commit. The parent only stores a pointer.']
          ]
        },
        mission: {
          id: 'adv-submodules-m', kind: 'git',
          brief: 'Add the shared library at `https://github.com/org/lib.git` as a submodule under `vendor/lib`, then commit it.',
          setup: function (repo) { setup(repo, [['cmd', 'git init'], ['write', 'app.js', 'v1\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "chore: init"']]); },
          objectives: [
            { t: 'A submodule is registered', fn: function (g) { return !!g.submodules && Object.keys(g.submodules).length > 0; } },
            { t: '.gitmodules is committed', fn: function (g) { return '.gitmodules' in g.headSnapshot(); } }
          ],
          hint: '`git submodule add https://github.com/org/lib.git vendor/lib` then `git commit -m "chore: add lib submodule"`.'
        }
      },

      {
        id: 'adv-lfs', title: 'Large files & Git LFS',
        lesson: {
          hook: 'Git is built for text. Committing a 2 GB video will bloat every clone forever. LFS fixes that.',
          blocks: [
            ['p', '**Git LFS** (Large File Storage) stores big files outside the repository and keeps a small text pointer in Git.'],
            ['code', 'git lfs install\ngit lfs track "*.psd"\ngit add .gitattributes design.psd'],
            ['warn', 'Once a large blob is in history it stays in every clone. Removing it requires rewriting history (filter-repo) — painful. Track LFS *before* you commit big files.'],
            ['note', 'Rule of thumb: repo files that change often and are text → Git. Large binaries → LFS or an artifact store.']
          ]
        },
        mission: {
          id: 'adv-lfs-q', kind: 'quiz', brief: 'Large files.',
          questions: [
            { q: 'Git LFS stores big files…', options: ['In the commit', 'Outside the repo, with a pointer in Git', 'In a branch', 'In CI'], a: 1, why: 'The repo keeps a small pointer; the blob lives on the LFS server.' },
            { q: 'Why is committing a huge binary bad?', options: ['It is slow to type', 'It bloats every clone and stays in history forever', 'Git forbids it', 'It breaks CI'], a: 1, why: 'History is copied on every clone; big blobs never go away.' },
            { q: 'You should set up LFS tracking…', options: ['After committing the file', 'Before committing large files', 'Never', 'Only on GitHub'], a: 1, why: 'Retroactively removing blobs requires rewriting history.' }
          ]
        }
      },

      {
        id: 'adv-monorepo', title: 'Monorepos & build systems',
        lesson: {
          hook: 'One repository, many projects — powerful, but only if your tooling understands the graph.',
          blocks: [
            ['p', 'A **monorepo** keeps apps and libraries together. You get atomic cross-project changes and one CI setup, but builds and ownership get harder as it grows.'],
            ['list', [
              '**Nx / Turborepo** — task orchestration and caching for JS monorepos.',
              '**Bazel / Pants** — language-agnostic, hermetic, remote caching.',
              'Dependency graph + **affected** computation: only rebuild what changed.'
            ]],
            ['code', '# only test projects affected by the change\nturbo run test --filter=...[origin/main]'],
            ['note', 'The monorepo superpower is the **affected** graph: touch one package and CI runs only the dependents, not all 400 projects.']
          ]
        },
        mission: {
          id: 'adv-monorepo-q', kind: 'quiz', brief: 'Monorepo tooling.',
          questions: [
            { q: '“Affected” analysis lets CI…', options: ['Skip all tests', 'Run only the projects touched (and their dependents)', 'Deploy automatically', 'Ignore the repo'], a: 1, why: 'Use the dependency graph to run the minimum.' },
            { q: 'A big monorepo risk is…', options: ['Too many branches', 'Slow builds and tangled ownership without good tooling', 'No history', 'Git cannot handle it'], a: 1, why: 'Scale demands orchestration and clear code owners.' },
            { q: 'Turborepo/Nx primarily provide…', options: ['A database', 'Task caching and orchestration', 'A CI runner', 'A language'], a: 1, why: 'They schedule and cache tasks across packages.' }
          ]
        }
      },

      {
        id: 'adv-monorepo-ci', title: 'CI in a monorepo: path filters',
        lesson: {
          hook: 'Do not rebuild the world for a README typo. Scope your triggers.',
          blocks: [
            ['p', 'GitHub Actions can trigger only when specific paths change:'],
            ['yaml', 'on:\n  push:\n    paths:\n      - "packages/web/**"\n      - "!**/*.md"'],
            ['p', 'If no matching path changed, the workflow is **skipped** — saving runner minutes and keeping signal high.'],
            ['warn', 'Path filters are a blunt instrument for cross-package changes. For “run tests for everything affected”, prefer an orchestrator (`turbo`, `nx affected`) inside one workflow.']
          ]
        },
        mission: {
          id: 'adv-monorepo-ci-m', kind: 'ci',
          brief: 'Make the pipeline run **only** when `packages/web/**` changes. With the simulated change being in `packages/api/`, the run should be skipped — proving the filter works.',
          starter: 'name: Monorepo CI\non:\n  push:\n\njobs:\n  web:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test\n',
          files: { 'packages/web/package.json': '{"name":"web","scripts":{"test":"jest"}}', 'packages/web/src/app.test.js': 'test("ok",()=>{})', 'packages/api/handler.js': 'exports.x=1;' },
          event: 'push', branch: 'main', changed: ['packages/api/handler.js'],
          objectives: [
            { t: 'Workflow filters on packages/web/**', fn: function (w) { var p = pushPaths(w); return !!p && p.some(function (x) { return String(x).indexOf('packages/web') !== -1; }); } },
            { t: 'Pipeline is skipped when only packages/api changed', fn: function (w, run) { return !!run && run.skipped === true; } },
            { t: 'Workflow still runs the tests', fn: function (w) { return runsCmd(w, /npm (test|t)/); } }
          ],
          hint: 'Under `on.push` add a `paths:` list containing "packages/web/**". The simulated change touches packages/api, so the run should report "skipped".'
        }
      },

      {
        id: 'adv-bisect', title: 'Bisect & worktrees',
        lesson: {
          hook: 'Two power tools: one finds the commit that broke things, the other lets you work two branches at once.',
          blocks: [
            ['p', '**git bisect** binary-searches history for the commit that introduced a bug — O(log n) tests instead of checking every commit.'],
            ['code', 'git bisect start\ngit bisect bad                 # current is broken\ngit bisect good v1.0.0         # last known good\n# test, then mark each step:\ngit bisect good   # or: git bisect bad\ngit bisect reset'],
            ['p', '**git worktree** checks out another branch into a separate folder sharing the same repo — no stash, no switching.'],
            ['code', 'git worktree add ../hotfix hotfix-branch\n# fix the bug in ../hotfix without disturbing your current work'],
            ['note', 'Bisect is why small, single-purpose commits matter: each commit is a clean test point.']
          ]
        },
        mission: {
          id: 'adv-bisect-q', kind: 'quiz', brief: 'Bisect and worktrees.',
          questions: [
            { q: 'git bisect is efficient because it…', options: ['Runs all tests', 'Binary-searches the commit range', 'Rewrites history', 'Uses AI'], a: 1, why: 'It halves the suspect range each step.' },
            { q: 'git worktree lets you…', options: ['Delete branches', 'Check out another branch in a separate directory at the same time', 'Merge faster', 'Clone a repo'], a: 1, why: 'Multiple working directories share one repository.' },
            { q: 'Bisect works best when commits are…', options: ['Huge', 'Small and focused', 'Rebased', 'Tagged only'], a: 1, why: 'Each commit is a cleaner test point.' }
          ]
        }
      }
    ]
  });
})(window.GH);
