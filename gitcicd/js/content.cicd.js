/* ============================================================
   GitCI/CD Hero - content.cicd.js
   Track 4: CI/CD Concepts & Pipelines
   Track 5: GitHub Actions
   Track 6: Containers & Deploy
   Track 7: DevSecOps
   ============================================================ */
(function (GH) {
  'use strict';

  /* ---------- CI mission helpers ---------- */
  function jobs(wf) { return (wf && wf.jobs) || {}; }
  function steps(wf, id) { var j = jobs(wf)[id]; return (j && j.steps) || []; }
  function allSteps(wf) { var out = []; Object.keys(jobs(wf)).forEach(function (k) { (jobs(wf)[k].steps || []).forEach(function (s) { out.push(s); }); }); return out; }
  function uses(wf, re) { return allSteps(wf).some(function (s) { return s.uses && re.test(String(s.uses)); }); }
  function runs(wf, re) { return allSteps(wf).some(function (s) { return s.run && re.test(String(s.run)); }); }
  function jobCount(wf) { return Object.keys(jobs(wf)).length; }
  function hasNeeds(wf, id) { return jobs(wf)[id] && jobs(wf)[id].needs != null; }
  function triggered(wf, ev) { return GH.triggeredBy(wf, ev); }

  GH.track({
    id: 'cicd', name: 'CI/CD Concepts & Pipelines', icon: '&#9881;', color: '#34d399',
    blurb: 'What CI/CD really means, then build real pipelines: test, artifact, matrix, cache, deploy.',
    chapters: [

      {
        id: 'ci-intro', title: 'What is CI/CD?',
        lesson: {
          hook: 'CI/CD is the assembly line of software: every change is automatically built, tested, and shipped.',
          blocks: [
            ['list', [
              '**Continuous Integration (CI)**: every push is merged into main and automatically built + tested. Catches integration bugs within minutes.',
              '**Continuous Delivery**: every build that passes is automatically deployed to a staging environment, ready for a one-click release.',
              '**Continuous Deployment**: passing builds go straight to production with no manual step.'
            ]],
            ['p', 'A **pipeline** is the sequence of jobs that make this happen: install → build → test → package → deploy → verify.'],
            ['p', 'The payoff is a fast feedback loop. Instead of discovering a bug at release time, you discover it 90 seconds after you push.'],
            ['note', 'CI/CD only works if the pipeline is trustworthy: flaky tests and red builds that are ignored destroy the whole benefit.']
          ]
        },
        mission: {
          id: 'ci-intro-q', kind: 'quiz', brief: 'CI/CD fundamentals.',
          questions: [
            { q: 'Continuous Integration primarily means…', options: ['Deploying on every commit', 'Automatically building and testing every change', 'Writing more tests', 'Using Git'], a: 1, why: 'CI = build + test on every change, giving fast feedback.' },
            { q: 'The difference between Continuous Delivery and Continuous Deployment is…', options: ['Speed', 'Delivery deploys to staging automatically; Deployment also goes to production automatically', 'Nothing', 'Delivery uses Docker'], a: 1, why: 'CD stops at a ready-to-release artifact; the extra step is production.' },
            { q: 'A "pipeline" is…', options: ['A Git branch', 'The ordered jobs that build, test, and deploy', 'A server', 'A YAML file only'], a: 1, why: 'It is the automated sequence from code to running software.' }
          ]
        }
      },

      {
        id: 'ci-anatomy', title: 'Anatomy of a pipeline',
        lesson: {
          hook: 'Workflows contain jobs; jobs contain steps; steps run on a fresh virtual machine called a runner.',
          blocks: [
            ['list', [
              '**Workflow** — a YAML file in `.github/workflows/`, triggered by an event.',
              '**Job** — a set of steps that run on one runner. Jobs run in parallel unless linked with `needs`.',
              '**Step** — either a shell command (`run:`) or a reusable action (`uses:`).',
              '**Runner** — a fresh VM (`ubuntu-latest`, `windows-latest`, `macos-latest`). Nothing persists between jobs by default.'
            ]],
            ['viz', 'pipeline'],
            ['warn', 'Because each job gets a **fresh** runner, a build made in one job is gone in the next unless you upload it as an **artifact**.'],
            ['note', 'The single most common beginner bug: forgetting `actions/checkout`. Without it, the runner starts empty — your code is not there.']
          ]
        },
        mission: {
          id: 'ci-anatomy-q', kind: 'quiz', brief: 'Pipeline anatomy.',
          questions: [
            { q: 'By default, jobs in a workflow…', options: ['Run one after another', 'Run in parallel', 'Share a filesystem', 'Are manual'], a: 1, why: 'Parallel unless linked by needs.' },
            { q: 'Files created by one job are available to the next job…', options: ['Automatically', 'Only if uploaded and downloaded as artifacts', 'Never', 'Via Git'], a: 1, why: 'Fresh runners mean you must pass files via artifacts.' },
            { q: '`uses: actions/checkout` does what?', options: ['Commits code', 'Checks out your repo onto the runner', 'Creates a PR', 'Runs tests'], a: 1, why: 'It clones the repo into the runner workspace so later steps can see files.' }
          ]
        }
      },

      {
        id: 'ci-first', title: 'Your first workflow',
        lesson: {
          hook: 'A workflow is just YAML: when to run, what machine, and the steps to take.',
          blocks: [
            ['p', 'Workflows live at `.github/workflows/*.yml`. The `on:` key lists the triggers, `jobs:` defines the work.'],
            ['yaml', 'name: CI\non: [push]\njobs:\n  hello:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo "Hello from CI"'],
            ['p', 'Push this file and GitHub starts a run within seconds. The editor below simulates exactly that.'],
            ['note', '`uses:` pulls a versioned action from the marketplace; `run:` executes shell commands. Both belong to a step.']
          ]
        },
        mission: {
          id: 'ci-first-m', kind: 'ci',
          brief: 'Write a workflow that triggers on push, checks out the repo, and echoes a message. Make it pass.',
          starter: 'name: CI\non:\n  push:\n\njobs:\n  hello:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo "starting"\n',
          files: { 'app.js': 'console.log("hi");\n' }, event: 'push', branch: 'main',
          objectives: [
            { t: 'Workflow triggers on push', fn: function (w, run) { return triggered(w, 'push'); } },
            { t: 'Uses actions/checkout', fn: function (w) { return uses(w, /actions\/checkout@/); } },
            { t: 'Contains a run step that echoes something', fn: function (w) { return runs(w, /echo/); } },
            { t: 'Pipeline runs successfully', fn: function (w, run) { return run && run.ok; } }
          ],
          hint: 'Add `- uses: actions/checkout@v4` before the run step, then click Run pipeline.'
        }
      },

      {
        id: 'ci-buildtest', title: 'Build & test job',
        lesson: {
          hook: 'The bread and butter of CI: install dependencies, run the tests, fail the build if anything is red.',
          blocks: [
            ['yaml', 'steps:\n  - uses: actions/checkout@v4\n  - uses: actions/setup-node@v4\n    with:\n      node-version: 20\n  - run: npm ci\n  - run: npm test'],
            ['p', '`actions/setup-node` pins the Node version so CI matches production. `npm ci` installs exactly what your lockfile says — reproducible, unlike `npm install`.'],
            ['warn', '`npm test` needs a test file to exist. If the repo has none, the step fails — which is exactly the signal you want before shipping.']
          ]
        },
        mission: {
          id: 'ci-buildtest-m', kind: 'ci',
          brief: 'Build a proper test pipeline: checkout, set up Node 20, install with npm ci, and run the tests. It must pass.',
          starter: 'name: Node CI\non: [push]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n',
          files: { 'package.json': '{\n  "name": "app",\n  "scripts": { "test": "jest" }\n}\n', 'src/app.test.js': 'test("works", () => {});\n', 'src/app.js': 'export const x = 1;\n' },
          event: 'push', branch: 'main',
          objectives: [
            { t: 'Sets up Node', fn: function (w) { return uses(w, /actions\/setup-node@/); } },
            { t: 'Installs dependencies with npm ci (or install)', fn: function (w) { return runs(w, /npm (ci|install|i)/); } },
            { t: 'Runs the tests', fn: function (w) { return runs(w, /npm (test|t)/); } },
            { t: 'Pipeline passes', fn: function (w, run) { return run && run.ok; } }
          ],
          hint: 'Add setup-node with a node-version, then `- run: npm ci` and `- run: npm test`.'
        }
      },

      {
        id: 'ci-gate', title: 'Gating with needs + artifacts',
        lesson: {
          hook: 'Jobs that depend on each other run in order. Artifacts carry build output between them.',
          blocks: [
            ['p', '`needs:` makes a job wait for another. If the dependency fails, the dependent job is skipped — that is how you stop a broken build from being deployed.'],
            ['yaml', 'jobs:\n  build:\n    steps:\n      - run: npm run build\n      - uses: actions/upload-artifact@v4\n        with:\n          name: dist\n          path: dist\n\n  deploy:\n    needs: build\n    steps:\n      - uses: actions/download-artifact@v4\n'],
            ['note', 'The `needs` graph is your safety net: build → test → deploy, each stage gated by the last.']
          ]
        },
        mission: {
          id: 'ci-gate-m', kind: 'ci',
          brief: 'Create two jobs: `build` that runs `npm run build`, and `deploy` that `needs: build`. Upload and download an artifact between them.',
          starter: 'name: Build & Deploy\non: [push]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - run: echo "deploying"\n',
          files: { 'package.json': '{\n  "name": "app",\n  "scripts": { "build": "webpack" }\n}\n', 'src/app.js': 'export const x = 1;\n' },
          event: 'push', branch: 'main',
          objectives: [
            { t: 'Two jobs exist', fn: function (w) { return jobCount(w) >= 2; } },
            { t: 'deploy declares needs: build', fn: function (w) { return hasNeeds(w, 'deploy'); } },
            { t: 'An artifact is uploaded', fn: function (w, run) { return uses(w, /upload-artifact@/) || (run && run.artifacts && run.artifacts.length); } },
            { t: 'Pipeline passes', fn: function (w, run) { return run && run.ok; } }
          ],
          hint: 'In deploy add `needs: build`. In build add `- run: npm run build` and an upload-artifact step.'
        }
      },

      {
        id: 'ci-matrix', title: 'Matrix builds',
        lesson: {
          hook: 'One definition, many combinations — test across OS and language versions at once.',
          blocks: [
            ['yaml', 'jobs:\n  test:\n    strategy:\n      matrix:\n        node: [18, 20, 22]\n        os: [ubuntu-latest, windows-latest]\n    runs-on: ${{ matrix.os }}\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test'],
            ['p', 'A matrix multiplies your jobs: 3 Node versions × 2 operating systems = 6 parallel runs. `matrix.*` values are available to the job.'],
            ['note', 'Add `fail-fast: false` under `strategy` to let all combinations finish even if one fails — very useful when diagnosing.']
          ]
        },
        mission: {
          id: 'ci-matrix-m', kind: 'ci',
          brief: 'Add a matrix over Node versions [18, 20, 22] to the test job, and make runs-on use the matrix OS. It must pass.',
          starter: 'name: Matrix\non: [push]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test\n',
          files: { 'package.json': '{\n  "name": "app",\n  "scripts": { "test": "jest" }\n}\n', 'src/app.test.js': 'test("ok", () => {});\n' },
          event: 'push', branch: 'main',
          objectives: [
            { t: 'A matrix strategy is defined', fn: function (w) { return !!(jobs(w).test && jobs(w).test.strategy && jobs(w).test.strategy.matrix); } },
            { t: 'Matrix expands to multiple entries', fn: function (w, run) { return run && run.jobs.some(function (j) { return j.entries.length > 1; }); } },
            { t: 'Pipeline passes', fn: function (w, run) { return run && run.ok; } }
          ],
          hint: 'Add strategy.matrix with node: [18, 20, 22] (and optionally os), then run it to watch the jobs multiply.'
        }
      },

      {
        id: 'ci-cache', title: 'Speeding up with caching',
        lesson: {
          hook: 'Downloading dependencies every run is wasteful. Cache them.',
          blocks: [
            ['yaml', '- uses: actions/cache@v4\n  with:\n    path: ~/.npm\n    key: ${{ runner.os }}-node-${{ hashFiles(\'**/package-lock.json\') }}'],
            ['p', 'The `key` must change when your dependencies change — hashing `package-lock.json` does exactly that. On a hit, dependencies are restored instead of re-downloaded.'],
            ['note', 'Cache is best-effort storage, not permanent. Never cache secrets.']
          ]
        },
        mission: {
          id: 'ci-cache-m', kind: 'ci',
          brief: 'Add a caching step keyed on the lockfile hash, then install and test. It should pass.',
          starter: 'name: Cached CI\non: [push]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test\n',
          files: { 'package.json': '{\n  "name": "app",\n  "scripts": { "test": "jest" }\n}\n', 'package-lock.json': '{ "lockfileVersion": 3 }\n', 'src/app.test.js': 'test("ok", () => {});\n' },
          event: 'push', branch: 'main',
          objectives: [
            { t: 'Uses actions/cache', fn: function (w) { return uses(w, /actions\/cache@/); } },
            { t: 'Cache key references the lockfile hash', fn: function (w) { return allSteps(w).some(function (s) { return s.uses && /cache@/.test(s.uses) && s.with && /hashFiles/.test(String(s.with.key || '')); }); } },
            { t: 'Pipeline passes', fn: function (w, run) { return run && run.ok; } }
          ],
          hint: 'Insert the actions/cache step before npm ci, using key: ${{ runner.os }}-node-${{ hashFiles(...) }}.'
        }
      },

      {
        id: 'ci-secrets', title: 'Environments, secrets & config',
        lesson: {
          hook: 'Pipelines need credentials — and credentials must never sit in your YAML.',
          blocks: [
            ['p', 'Store secrets in the repo/org settings; reference them as `${{ secrets.NAME }}`. GitHub masks them in logs.'],
            ['yaml', '- run: deploy\n  env:\n    API_KEY: ${{ secrets.API_KEY }}'],
            ['p', '**Environments** (e.g. `production`) add protection rules: required reviewers, wait timers, and environment-scoped secrets.'],
            ['warn', 'Never commit keys. Even deleting them later leaves them in history — rotate the key if it ever leaks.']
          ]
        },
        mission: {
          id: 'ci-secrets-q', kind: 'quiz', brief: 'Secrets and environments.',
          questions: [
            { q: 'Secrets should be referenced how?', options: ['Hard-coded in YAML', 'Via ${{ secrets.NAME }}', 'In a README', 'In a commit message'], a: 1, why: 'Secrets are injected at runtime and masked in logs.' },
            { q: 'A GitHub "environment" can add…', options: ['More RAM', 'Required reviewers and protection rules for deploys', 'Faster runners', 'Free storage'], a: 1, why: 'Environments gate deployments with approvals and scoped secrets.' },
            { q: 'If you accidentally commit a secret, you should…', options: ['Delete the file', 'Assume it is compromised and rotate the key', 'Ignore it', 'Rename the branch'], a: 1, why: 'History keeps it; only rotation makes it safe.' }
          ]
        }
      },

      {
        id: 'ci-deploy', title: 'Deploying from a pipeline',
        lesson: {
          hook: 'The final stage: after build and test pass, ship it — behind a gate.',
          blocks: [
            ['yaml', '  deploy:\n    needs: [build, test]\n    runs-on: ubuntu-latest\n    environment: production\n    steps:\n      - uses: actions/download-artifact@v4\n      - run: ./deploy.sh'],
            ['p', 'Deploy jobs should `needs` the jobs that verify the code, and usually target a protected `environment`.'],
            ['note', 'A rollback plan is part of deployment: know how to get back to the previous good artifact before you ship.']
          ]
        },
        mission: {
          id: 'ci-deploy-m', kind: 'ci',
          brief: 'Build, test, then deploy — where deploy needs both build and test. Make the whole pipeline pass.',
          starter: 'name: Deploy\non:\n  push:\n    branches: [ main ]\n\njobs:\n  build:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm run build\n\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm ci\n      - run: npm test\n\n  deploy:\n    runs-on: ubuntu-latest\n    steps:\n      - run: ./deploy.sh\n',
          files: { 'package.json': '{\n  "name": "app",\n  "scripts": { "build": "webpack", "test": "jest" }\n}\n', 'src/app.test.js': 'test("ok", () => {});\n', 'deploy.sh': '#!/bin/sh\necho deploying\n' },
          event: 'push', branch: 'main',
          objectives: [
            { t: 'Three jobs exist', fn: function (w) { return jobCount(w) >= 3; } },
            { t: 'deploy needs build and test', fn: function (w) { var n = jobs(w).deploy && jobs(w).deploy.needs; n = Array.isArray(n) ? n : [n]; return n.indexOf('build') !== -1 && n.indexOf('test') !== -1; } },
            { t: 'Pipeline passes', fn: function (w, run) { return run && run.ok; } }
          ],
          hint: 'Give deploy `needs: [build, test]`.'
        }
      }
    ]
  });

  GH.track({
    id: 'actions', name: 'GitHub Actions', icon: '&#9889;', color: '#f59e0b',
    blurb: 'Triggers, jobs, actions, reusable workflows, and debugging failing pipelines.',
    chapters: [
      {
        id: 'ac-triggers', title: 'Triggers: when should CI run?',
        lesson: {
          hook: 'The `on:` block decides everything about when your pipeline wakes up.',
          blocks: [
            ['yaml', 'on:\n  push:\n    branches: [ main ]\n  pull_request:\n  schedule:\n    - cron: "0 3 * * *"\n  workflow_dispatch:'],
            ['list', [
              '`push` — someone pushed to a branch.',
              '`pull_request` — a PR was opened/updated (run CI before merge!).',
              '`schedule` — cron syntax, for nightly jobs.',
              '`workflow_dispatch` — manual "Run workflow" button.',
              '`release`, `workflow_call`, `issues`, …'
            ]],
            ['note', 'Run CI on `pull_request`, not just `push`: it protects main from untested changes before they merge.']
          ]
        },
        mission: {
          id: 'ac-triggers-q', kind: 'quiz', brief: 'Triggers.',
          questions: [
            { q: 'To run CI before a change reaches main, trigger on…', options: ['push only', 'pull_request', 'schedule', 'release'], a: 1, why: 'The PR event runs checks on the proposed change.' },
            { q: '`workflow_dispatch` gives you…', options: ['A nightly run', 'A manual run button', 'A webhook', 'A tag'], a: 1, why: 'It enables manual triggering from the UI/API.' },
            { q: '`schedule` uses which syntax?', options: ['cron', 'regex', 'YAML', 'JSON'], a: 0, why: 'POSIX cron, e.g. "0 3 * * *" for 3am daily.' }
          ]
        }
      },
      {
        id: 'ac-jobs', title: 'Jobs, runners & contexts',
        lesson: {
          hook: 'Jobs fan out in parallel; `needs` lines them up; `${{ }}` injects runtime values.',
          blocks: [
            ['p', 'Choose a runner with `runs-on`. Access context values with `${{ github.ref }}`, `${{ matrix.os }}`, `${{ secrets.X }}`, `${{ needs.build.outputs.sha }}`.'],
            ['p', 'Pass data between jobs with job **outputs**, not files — files do not survive across runners.'],
            ['code', 'jobs:\n  a:\n    outputs:\n      sha: ${{ steps.s.outputs.sha }}\n  b:\n    needs: a\n    steps:\n      - run: echo ${{ needs.a.outputs.sha }}'],
            ['note', '`continue-on-error: true` lets a step fail without failing the job — useful for optional checks, dangerous if overused.']
          ]
        },
        mission: {
          id: 'ac-jobs-q', kind: 'quiz', brief: 'Jobs and contexts.',
          questions: [
            { q: 'How do two jobs share a value?', options: ['Write a file', 'Job outputs consumed via needs', 'Environment variables', 'Global variables'], a: 1, why: 'Jobs are separate runners; outputs + needs bridge them.' },
            { q: '`runs-on: ubuntu-latest` selects…', options: ['A branch', 'The runner image', 'A secret', 'A trigger'], a: 1, why: 'It picks the virtual machine the job runs on.' },
            { q: 'Jobs with no `needs` relationship run…', options: ['Sequentially', 'In parallel', 'Never', 'Alphabetically'], a: 1, why: 'They are independent and run concurrently.' }
          ]
        }
      },
      {
        id: 'ac-debug', title: 'Debugging a failing pipeline',
        lesson: {
          hook: 'A red build is information, not failure. Read the logs, find the first error, fix the cause.',
          blocks: [
            ['list', ['Open the failed job and look at the **first** red step — later errors are usually knock-on.', 'Common causes: missing `actions/checkout`, wrong Node version, missing dependency, a genuinely failing test, a typo in a path.']],
            ['warn', 'The classic: "Cannot find module" or "no such file" almost always means `actions/checkout` is missing, so the runner has an empty workspace.'],
            ['note', 'Reproduce locally with the same commands (`npm ci && npm test`) before blaming CI.']
          ]
        },
        mission: {
          id: 'ac-debug-m', kind: 'ci',
          brief: 'This pipeline is failing. Read the (simulated) failure, find the cause, and fix the workflow so it passes.',
          starter: 'name: Broken CI\non: [push]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n      - run: npm ci\n      - run: npm test\n',
          files: { 'package.json': '{\n  "name": "app",\n  "scripts": { "test": "jest" }\n}\n', 'src/app.test.js': 'test("ok", () => {});\n' },
          event: 'push', branch: 'main',
          objectives: [
            { t: 'The missing checkout step is added', fn: function (w) { return uses(w, /actions\/checkout@/); } },
            { t: 'Pipeline now passes', fn: function (w, run) { return run && run.ok; } }
          ],
          hint: 'The runner starts empty — the repo is never checked out, so npm cannot find package.json. Add `- uses: actions/checkout@v4` as the first step.'
        }
      },
      {
        id: 'ac-reuse', title: 'Reusable workflows & composite actions',
        lesson: {
          hook: 'Do not copy-paste YAML. Factor it out.',
          blocks: [
            ['p', 'A **reusable workflow** is a whole workflow called from another with `uses: org/repo/.github/workflows/x.yml@v1`, invoked via `workflow_call`.'],
            ['p', 'A **composite action** bundles several steps you can `uses:` inside a job — great for "set up our toolchain" boilerplate.'],
            ['yaml', 'on:\n  workflow_call:\n    inputs:\n      node: { type: string, default: "20" }\n    secrets:\n      token: { required: true }'],
            ['note', 'Marketplace actions are just repos with an `action.yml`. Vetting them (and pinning versions) is part of supply-chain security — see the DevSecOps track.']
          ]
        },
        mission: {
          id: 'ac-reuse-q', kind: 'quiz', brief: 'Reuse.',
          questions: [
            { q: 'A reusable workflow is invoked with…', options: ['run:', 'uses: <path>@<ref>', 'needs:', 'env:'], a: 1, why: 'You call it with uses, and it declares workflow_call.' },
            { q: 'A composite action groups…', options: ['Whole workflows', 'Several steps into one uses-able action', 'Runners', 'Secrets'], a: 1, why: 'Composite actions bundle steps.' },
            { q: 'Pinning an action to a commit SHA rather than a tag…', options: ['Is slower', 'Reduces supply-chain risk', 'Prevents caching', 'Is required'], a: 1, why: 'Tags can move; SHAs are immutable, blocking tag-hijack attacks.' }
          ]
        }
      }
    ]
  });

  GH.track({
    id: 'containers', name: 'Containers & Deploy', icon: '&#128230;', color: '#3b82f6',
    blurb: 'Docker basics, building images in CI, and where software actually gets deployed.',
    chapters: [
      {
        id: 'co-docker', title: 'Docker in 90 seconds',
        lesson: {
          hook: 'A container is a portable box holding your app and everything it needs to run.',
          blocks: [
            ['p', 'An **image** is a read-only template (built from a `Dockerfile`). A **container** is a running instance of an image. Think class vs object.'],
            ['dockerfile', 'FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]'],
            ['p', 'Each instruction adds a **layer**. Layers are cached, so ordering matters: copy `package.json` and install dependencies *before* copying your source, so code edits do not bust the dependency cache.'],
            ['list', ['`docker build -t app:v1 .` — build an image.', '`docker run -p 3000:3000 app:v1` — run it.', '`docker push` — upload to a registry (Docker Hub, GHCR).']]
          ]
        },
        mission: {
          id: 'co-docker-q', kind: 'quiz', brief: 'Docker fundamentals.',
          questions: [
            { q: 'The relationship between an image and a container is like…', options: ['Two containers', 'A class and an object', 'A branch and a commit', 'A file and a folder'], a: 1, why: 'An image is the template; a container is a running instance.' },
            { q: 'Why copy package.json before the source code?', options: ['It is faster to type', 'To keep the dependency layer cached when source changes', 'Docker requires it', 'To reduce image size'], a: 1, why: 'Layer caching: dependencies only reinstall when the manifest changes.' },
            { q: 'A registry stores…', options: ['Containers', 'Images', 'Dockerfiles', 'Volumes'], a: 1, why: 'Registries host images for pulling/pushing.' }
          ]
        }
      },
      {
        id: 'co-multistage', title: 'Multi-stage builds',
        lesson: {
          hook: 'Build with everything, ship only what you need — smaller, safer images.',
          blocks: [
            ['dockerfile', 'FROM node:20 AS build\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\n\nFROM nginx:alpine\nCOPY --from=build /app/dist /usr/share/nginx/html'],
            ['p', 'Only the final stage ends up in the image, so compilers, dev dependencies, and source are left behind.'],
            ['list', ['Smaller images → faster pulls and deploys.', 'Fewer tools in the image → smaller attack surface.', 'Never bake secrets into any layer.']]
          ]
        },
        mission: {
          id: 'co-multistage-q', kind: 'quiz', brief: 'Multi-stage.',
          questions: [
            { q: 'The main benefit of a multi-stage build is…', options: ['Faster CPU', 'A smaller, cleaner final image', 'Free hosting', 'More layers'], a: 1, why: 'Build artifacts are copied into a slim runtime image.' },
            { q: 'Dev dependencies and build tools should end up…', options: ['In the final image', 'Left behind in earlier stages', 'In secrets', 'In the registry'], a: 1, why: 'They are only needed to build, not to run.' },
            { q: 'Baking secrets into an image is dangerous because…', options: ['It is slow', 'Layers are stored and can be inspected', 'It breaks caching', 'Docker forbids it'], a: 1, why: 'Anyone who can pull the image can read the layers.' }
          ]
        }
      },
      {
        id: 'co-buildpush', title: 'Build & push an image in CI',
        lesson: {
          hook: 'The pipeline builds the container and pushes it to a registry, tagged by commit.',
          blocks: [
            ['yaml', '- uses: docker/login-action@v3\n  with:\n    registry: ghcr.io\n    username: ${{ github.actor }}\n    password: ${{ secrets.GITHUB_TOKEN }}\n- uses: docker/build-push-action@v6\n  with:\n    push: true\n    tags: ghcr.io/${{ github.repository }}:${{ github.sha }}'],
            ['p', 'Tag images by **commit SHA** (immutable) and optionally by semver. Never rely on `latest` for deploys.'],
            ['note', '`GITHUB_TOKEN` is a short-lived token GitHub issues to the run — use it instead of storing a personal access token.']
          ]
        },
        mission: {
          id: 'co-buildpush-m', kind: 'ci',
          brief: 'Add a job that logs in to the registry and builds & pushes an image. It must pass.',
          starter: 'name: Container\non:\n  push:\n    branches: [ main ]\n\njobs:\n  image:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo "build image"\n',
          files: { 'Dockerfile': 'FROM node:20-alpine\nCMD ["node","server.js"]\n', 'server.js': 'console.log("up");\n' },
          event: 'push', branch: 'main',
          objectives: [
            { t: 'Logs in to a registry', fn: function (w) { return uses(w, /docker\/login-action@/); } },
            { t: 'Builds and pushes an image', fn: function (w) { return uses(w, /docker\/build-push-action@/); } },
            { t: 'Pipeline passes', fn: function (w, run) { return run && run.ok; } }
          ],
          hint: 'Add `- uses: docker/login-action@v3` then `- uses: docker/build-push-action@v6`.'
        }
      },
      {
        id: 'co-deploytargets', title: 'Where does it get deployed?',
        lesson: {
          hook: 'The pipeline ends by putting the artifact somewhere users can reach.',
          blocks: [
            ['list', [
              '**Static hosting / GitHub Pages** — great for docs and SPAs.',
              '**Serverless** (Functions, Lambda, Cloud Run) — scale-to-zero.',
              '**VMs / VPS** — full control, you manage updates.',
              '**Kubernetes** — orchestrated containers; `kubectl apply` or Helm in the deploy job.',
              '**App platforms** (Vercel, Netlify, Fly, Render) — push-to-deploy with previews.'
            ]],
            ['p', 'Whichever you choose, the pattern is the same: build once, produce an immutable artifact, deploy that exact artifact to each environment (staging → production).'],
            ['note', 'Preview environments per pull request are a superpower: reviewers click a live URL for every change.']
          ]
        },
        mission: {
          id: 'co-deploytargets-q', kind: 'quiz', brief: 'Deploy targets.',
          questions: [
            { q: 'The golden deployment rule is…', options: ['Build once per environment', 'Build once, promote the same artifact', 'Rebuild on the server', 'Skip staging'], a: 1, why: 'Identical artifact everywhere eliminates "works on my machine" drift.' },
            { q: 'A Kubernetes deploy in CI typically uses…', options: ['npm publish', 'kubectl apply / helm', 'ftp', 'docker run only'], a: 1, why: 'Pipelines apply manifests or Helm charts to the cluster.' },
            { q: 'Preview environments are most useful for…', options: ['Production', 'Reviewing pull requests on a live URL', 'Billing', 'DNS'], a: 1, why: 'Each PR gets its own disposable deployment.' }
          ]
        }
      }
    ]
  });

  GH.track({
    id: 'devsecops', name: 'DevSecOps', icon: '&#128274;', color: '#ef4444',
    blurb: 'Shift security left: secrets, supply chain, scanning, and least privilege.',
    chapters: [
      {
        id: 'ds-shiftleft', title: 'Shifting security left',
        lesson: {
          hook: 'The cheapest place to fix a vulnerability is the commit that introduced it — not production.',
          blocks: [
            ['p', '**DevSecOps** weaves security into the same pipeline as tests: scan dependencies, scan code, scan containers, and gate deploys on the results.'],
            ['list', [
              'Secrets never in code — use the platform secret store, and rotate anything leaked.',
              'Dependencies: pin, audit, and auto-update (e.g. Dependabot).',
              'Static analysis (SAST) in CI; dynamic analysis (DAST) against staging.',
              'Container scanning for OS/library CVEs; sign images.',
              'Least privilege for tokens and cloud identity.'
            ]],
            ['note', 'Security findings that block merges get fixed. Findings in a PDF get ignored. Put the scanner in the pipeline.']
          ]
        },
        mission: {
          id: 'ds-shiftleft-q', kind: 'quiz', brief: 'DevSecOps principles.',
          questions: [
            { q: '“Shifting left” means…', options: ['Moving to the left of the screen', 'Finding security issues earlier, in the pipeline', 'Writing less code', 'Using the left branch'], a: 1, why: 'Earlier detection is cheaper and safer.' },
            { q: 'SAST analyses…', options: ['Running apps', 'Source code without running it', 'Networks', 'DNS'], a: 1, why: 'Static Application Security Testing inspects code.' },
            { q: 'DAST analyses…', options: ['Source code', 'A running application from the outside', 'Dockerfiles', 'Git history'], a: 1, why: 'Dynamic testing probes the running app.' }
          ]
        }
      },
      {
        id: 'ds-supply', title: 'Dependencies & the supply chain',
        lesson: {
          hook: 'Most of your code is other people’s code. Supply-chain attacks exploit exactly that.',
          blocks: [
            ['p', 'A **Software Bill of Materials (SBOM)** lists every dependency and version, so you can answer "are we affected?" in minutes when the next Log4Shell lands.'],
            ['list', ['Enable **Dependabot** (or Renovate) to open PRs for vulnerable/outdated deps.', 'Run `npm audit` / `pip-audit` / `trivy fs` in CI.', 'Pin GitHub Actions to a full commit SHA, not a movable tag.', 'Generate and store an SBOM per release.']],
            ['warn', 'The 2021 `event-stream` and 2024 `xz` incidents both show: a trusted dependency can turn malicious. Also a reason to keep dependency trees small.']
          ]
        },
        mission: {
          id: 'ds-supply-q', kind: 'quiz', brief: 'Supply chain.',
          questions: [
            { q: 'An SBOM tells you…', options: ['Your build time', 'Every component and version in your software', 'Who wrote each line', 'Your deploy target'], a: 1, why: 'It is the ingredient list for vulnerability response.' },
            { q: 'Pinning GitHub Actions to a SHA prevents…', options: ['Slow runs', 'A malicious tag move hijacking your pipeline', 'Caching', 'Logs'], a: 1, why: 'SHAs are immutable; tags are not.' },
            { q: 'Dependabot’s job is to…', options: ['Deploy code', 'Open PRs to update vulnerable dependencies', 'Run tests', 'Encrypt secrets'], a: 1, why: 'Automated dependency updates and alerts.' }
          ]
        }
      },
      {
        id: 'ds-scan', title: 'Adding scans to the pipeline',
        lesson: {
          hook: 'A scan that runs on every push turns security from a quarterly audit into a continuous habit.',
          blocks: [
            ['yaml', '- uses: github/codeql-action/init@v3\n  with:\n    languages: javascript\n- uses: github/codeql-action/analyze@v3\n\n- uses: aquasecurity/trivy-action@0.24.0\n  with:\n    scan-type: fs'],
            ['p', 'CodeQL does semantic static analysis; Trivy scans dependencies and container images for known CVEs. Both drop findings into the pull request.'],
            ['note', 'Start by making scans report (not block). Once you have a clean baseline, gate merges on new high-severity findings.']
          ]
        },
        mission: {
          id: 'ds-scan-m', kind: 'ci',
          brief: 'Add a CodeQL security-analysis step and a Trivy scan step to the pipeline, and make it pass.',
          starter: 'name: Security\non: [push]\n\njobs:\n  analyze:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: echo "scan"\n',
          files: { 'package.json': '{\n  "name": "app"\n}\n', 'src/app.js': 'export const x = 1;\n' },
          event: 'push', branch: 'main',
          objectives: [
            { t: 'CodeQL analysis is present', fn: function (w) { return uses(w, /codeql-action/); } },
            { t: 'A vulnerability scan (Trivy) is present', fn: function (w) { return uses(w, /trivy/); } },
            { t: 'Pipeline passes', fn: function (w, run) { return run && run.ok; } }
          ],
          hint: 'Add `- uses: github/codeql-action/init@v3` with an `analyze` step and `- uses: aquasecurity/trivy-action@0.24.0`.'
        }
      },
      {
        id: 'ds-leastpriv', title: 'Least privilege & OIDC',
        lesson: {
          hook: 'Your pipeline should hold the smallest, shortest-lived credentials that get the job done.',
          blocks: [
            ['p', 'By default `GITHUB_TOKEN` is powerful. Scope it down in the workflow:'],
            ['yaml', 'permissions:\n  contents: read\n  packages: write'],
            ['p', '**OIDC** lets CI assume a cloud role by presenting a short-lived signed token — no long-lived cloud secrets stored in GitHub at all. This is the modern best practice for AWS/GCP/Azure deploys.'],
            ['list', ['Grant per-workflow `permissions`.', 'Prefer OIDC over static cloud keys.', 'Scope secrets to environments.', 'Audit who can approve production deploys.']]
          ]
        },
        mission: {
          id: 'ds-leastpriv-q', kind: 'quiz', brief: 'Least privilege.',
          questions: [
            { q: 'The `permissions:` block lets you…', options: ['Add RAM', 'Scope GITHUB_TOKEN to only what is needed', 'Set secrets', 'Choose runners'], a: 1, why: 'Least privilege for the automatic token.' },
            { q: 'OIDC improves deployments because…', options: ['It is faster', 'It removes long-lived cloud secrets from stored config', 'It is free', 'It caches images'], a: 1, why: 'Short-lived, identity-based credentials replace static keys.' },
            { q: 'A good default for GITHUB_TOKEN in a test job is…', options: ['Read everything', 'contents: read', 'write-all', 'no permissions at all ever'], a: 1, why: 'Tests usually only need to read the repo.' }
          ]
        }
      },
      {
        id: 'ds-checklist', title: 'Pipeline hardening checklist',
        lesson: {
          hook: 'A short list that separates a hobby pipeline from a production-grade one.',
          blocks: [
            ['list', [
              'Pin third-party actions to a commit SHA.',
              'Scope `permissions:` per workflow; prefer OIDC for cloud auth.',
              'Never echo secrets; rely on mask-based redaction.',
              'Gate production deploys behind an `environment` with reviewers.',
              'Run dependency + container scans; fail on new high-severity issues.',
              'Protect `main`: required PR review + required status checks.',
              'Keep the pipeline fast (<10 min) so people actually wait for it.'
            ]],
            ['note', 'You have now covered the whole arc: version control → collaboration → CI/CD → containers → deploying → securing it. That is a working DevSecOps toolkit.']
          ]
        },
        mission: {
          id: 'ds-checklist-q', kind: 'quiz', brief: 'Final check.',
          questions: [
            { q: 'Required status checks on main ensure…', options: ['Faster merges', 'Untested code cannot be merged', 'Fewer branches', 'Free CI'], a: 1, why: 'Branch protection blocks merges until CI passes.' },
            { q: 'A pipeline should ideally stay under…', options: ['10 minutes', '2 hours', '1 day', 'it does not matter'], a: 0, why: 'Fast feedback is what makes CI adoption stick.' },
            { q: 'The safest way to give CI cloud access is…', options: ['A root API key in secrets', 'OIDC with a scoped role', 'A shared password', 'A personal token in the repo'], a: 1, why: 'Short-lived, scoped, and no static secret to leak.' }
          ]
        }
      }
    ]
  });

  /* expose helpers for the mission runner */
  GH.ciHelpers = { uses: uses, runs: runs, allSteps: allSteps, jobs: jobs, steps: steps, jobCount: jobCount, triggered: triggered };
})(window.GH);
