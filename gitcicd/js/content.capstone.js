/* ============================================================
   GitCI/CD Hero - content.capstone.js
   The capstone: two deliverables that prove you can operate the
   whole flow — repository hygiene and a production pipeline.
   ============================================================ */
(function (GH) {
  'use strict';

  function setup(repo, ops) {
    repo.initialized = true;
    ops.forEach(function (op) {
      if (op[0] === 'write') repo.writeFile(op[1], op[2]);
      else if (op[0] === 'cmd') repo.run(op[1]);
    });
  }
  function allSteps(wf) { var out = []; Object.keys((wf && wf.jobs) || {}).forEach(function (k) { ((wf.jobs[k].steps) || []).forEach(function (s) { out.push(s); }); }); return out; }
  function uses(wf, re) { return allSteps(wf).some(function (s) { return s.uses && re.test(String(s.uses)); }); }
  function runsCmd(wf, re) { return allSteps(wf).some(function (s) { return s.run && re.test(String(s.run)); }); }
  var CC = /^(feat|fix|chore|docs|test|ci|refactor|perf)(\(.+\))?: .+/;

  GH.CAPSTONE = [];

  GH.CAPSTONE.push({
    id: 'cap-git', title: 'Deliverable A — Repository hygiene', icon: '&#128295;',
    brief: 'Turn a scaffolded repo into a professional one: a real .gitignore, Conventional Commits throughout, a feature branch merged into main, and a release tag.',
    lesson: {
      hook: 'A tidy repository is a professional signature. This is the state every reviewer expects to find.',
      blocks: [['p', 'Work in the Git sandbox below. Use the file editor for `.gitignore` and the terminal for everything else.']]
    },
    mission: {
      id: 'cap-git-m', kind: 'git',
      brief: 'Add and commit a `.gitignore` (must ignore `node_modules`), create a `feature/ci` branch with a commit, merge it into `main`, keep **every** commit message in Conventional Commits format, and tag a release.',
      setup: function (repo) {
        setup(repo, [['cmd', 'git init'], ['write', 'README.md', '# Project\n'], ['write', 'app.js', 'function main() { return 1; }\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "chore: scaffold project"']]);
      },
      objectives: [
        { t: '.gitignore ignores node_modules (and is committed)', fn: function (g) { return /node_modules/.test(g.headSnapshot()['.gitignore'] || ''); } },
        { t: 'At least 4 commits exist', fn: function (g) { return Object.keys(g.commits).length >= 4; } },
        { t: 'Every commit message is Conventional Commits', fn: function (g) { return g.log().length > 0 && g.log().every(function (c) { return CC.test(c.message); }); } },
        { t: 'feature/ci was created and merged into main', fn: function (g) { return !!(g.branches['feature/ci'] && g.branches.main && g.isAncestor(g.branches['feature/ci'], g.branches.main)); } },
        { t: 'A release tag exists', fn: function (g) { return Object.keys(g.tags).length >= 1; } }
      ],
      hint: '`+ new` → create `.gitignore` with `node_modules/` → `git add . && git commit -m "chore: add gitignore"`. Then `git switch -c feature/ci`, edit a file, commit `feat: ...`, `git switch main`, `git merge feature/ci`, and `git tag -a v1.0.0 -m "release"`.'
    }
  });

  GH.CAPSTONE.push({
    id: 'cap-ci', title: 'Deliverable B — Production CI/CD pipeline', icon: '&#127959;',
    brief: 'Build the full pipeline: build → test → security scan → container image → deploy, wired with needs, an artifact, scoped permissions, and a whole run that passes green.',
    lesson: {
      hook: 'This is the pipeline a real team runs on every pull request. Build it once here and you can build it anywhere.',
      blocks: [['p', 'Edit the workflow below and press **Run pipeline**. Every objective must be green and the final run must pass.']]
    },
    mission: {
      id: 'cap-ci-m', kind: 'ci',
      brief: 'Complete the skeleton so that: it runs on push **and** pull_request; `build` checks out, sets up Node, installs, builds and uploads an artifact; `test` needs build and runs tests; `security` runs CodeQL and Trivy; `image` logs in and builds/pushes a container; `deploy` needs test and security; and permissions are scoped to `contents: read`.',
      starter:
        'name: Production Pipeline\non:\n  push:\n  pull_request:\n\npermissions:\n  contents: read\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test\n\n  security:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo "scan"\n\n  image:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo "image"\n\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - run: ./deploy.sh\n',
      solution:
        'name: Production Pipeline\non:\n  push:\n  pull_request:\n\npermissions:\n  contents: read\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm run build\n      - uses: actions/upload-artifact@v4\n        with:\n          name: dist\n          path: dist\n\n  test:\n    needs: build\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test\n\n  security:\n    needs: build\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: github/codeql-action/init@v3\n        with:\n          languages: javascript\n      - uses: github/codeql-action/analyze@v3\n      - uses: aquasecurity/trivy-action@0.24.0\n        with:\n          scan-type: fs\n\n  image:\n    needs: build\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: docker/login-action@v3\n        with:\n          registry: ghcr.io\n      - uses: docker/build-push-action@v6\n        with:\n          push: true\n\n  deploy:\n    needs: [test, security]\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/download-artifact@v4\n      - run: ./deploy.sh\n',
      files: {
        'package.json': '{\n  "name": "app",\n  "scripts": { "build": "webpack", "test": "jest" }\n}\n',
        'src/app.test.js': 'test("ok", () => {});\n',
        'src/app.js': 'export const x = 1;\n',
        'Dockerfile': 'FROM node:20-alpine\nCMD ["node","server.js"]\n',
        'deploy.sh': '#!/bin/sh\necho deploying\n'
      },
      event: 'push', branch: 'main',
      objectives: [
        { t: 'Runs on both push and pull_request', fn: function (w) { return GH.triggeredBy(w, 'push') && GH.triggeredBy(w, 'pull_request'); } },
        { t: 'build: checkout, setup-node, npm ci, npm run build, upload-artifact', fn: function (w) { var s = (w.jobs.build && w.jobs.build.steps) || []; var has = function (re) { return s.some(function (x) { return x.uses && re.test(x.uses); }); }; var cmd = function (re) { return s.some(function (x) { return x.run && re.test(x.run); }); }; return has(/checkout@/) && has(/setup-node@/) && cmd(/npm (ci|install|i)/) && cmd(/npm run build/) && has(/upload-artifact@/); } },
        { t: 'test: needs build and runs the tests', fn: function (w) { var j = w.jobs.test || {}; return j.needs != null && (Array.isArray(j.needs) ? j.needs : [j.needs]).indexOf('build') !== -1 && runsCmd(w, /npm (test|t)/); } },
        { t: 'security: CodeQL + Trivy scans', fn: function (w) { return uses(w, /codeql-action/) && uses(w, /trivy/); } },
        { t: 'image: docker login + build & push', fn: function (w) { return uses(w, /docker\/login-action@/) && uses(w, /docker\/build-push-action@/); } },
        { t: 'deploy: needs test and security', fn: function (w) { var j = w.jobs.deploy || {}; var n = Array.isArray(j.needs) ? j.needs : [j.needs]; return n.indexOf('test') !== -1 && n.indexOf('security') !== -1; } },
        { t: 'permissions scoped to contents: read', fn: function (w) { return !!(w.permissions && String(w.permissions.contents || w.permissions['contents']) === 'read'); } },
        { t: 'Whole pipeline runs green', fn: function (w, run) { return !!run && run.ok; } }
      ],
      hint: 'Fill in each job: add setup-node/upload-artifact to build; `needs: build` + npm ci/test to test; codeql init+analyze and trivy to security; docker login + build-push to image; `needs: [test, security]` to deploy. Then Run pipeline.'
    }
  });

  GH.capstoneDone = function () {
    return GH.CAPSTONE.every(function (c) { return GH.missionDone(c.mission.id); });
  };
  GH.capstoneProgress = function () {
    var done = GH.CAPSTONE.filter(function (c) { return GH.missionDone(c.mission.id); }).length;
    return { done: done, total: GH.CAPSTONE.length };
  };
})(window.GH);
