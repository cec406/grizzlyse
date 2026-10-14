# GitCI/CD Hero

An all-inclusive, offline teaching app that takes you from **zero to hero** in
**Git → CI/CD → GitHub Actions → Containers → DevSecOps**.

No install, no server, no account. **Double-click `index.html` and start learning.**

It is not a slide deck. It runs two real engines in your browser:

- a **Git engine** — type actual `git` commands against a live repository with commits,
  branches, a staging area, a working tree, merges, rebases, remotes, stash and a reflog;
- a **CI/CD engine** — write real GitHub Actions YAML and *run* it against a simulated repo,
  watching jobs, steps, matrix builds and artifacts execute (and fail).

---

## What's inside

**8 tracks · 46 chapters · 46 missions** — every chapter is a short lesson followed by a
hands-on, auto-graded mission. Then a **capstone** to prove it.

| Track | You'll learn |
| --- | --- |
| **Git Fundamentals** | commits, the three trees, staging, history, branches, merging, undo, tags |
| **Collaboration & Recovery** | remotes/clone/push/pull, merge conflicts, rebase, stash, cherry-pick, the reflog |
| **Versioning Theory & Tools** | Git internals (objects & the DAG), branching strategies, monorepo vs polyrepo, the CI/CD landscape |
| **CI/CD Concepts & Pipelines** | what CI/CD is, pipeline anatomy, build+test jobs, gating with `needs`, artifacts, matrix, caching, secrets, deploy |
| **GitHub Actions** | triggers, jobs/runners/contexts, reusable workflows, and debugging a failing pipeline |
| **Containers & Deploy** | Dockerfile layers, multi-stage builds, build & push in CI, deployment targets |
| **DevSecOps** | shift-left security, supply chain & SBOM, SAST/DAST scanning, least privilege & OIDC, a hardening checklist |
| **Advanced Git & Monorepos** | hooks, Conventional Commits, submodules/subtrees, Git LFS, monorepo tooling, CI path filters, bisect & worktrees |

### Capstone — prove it

A dedicated **Capstone** page with two deliverables that exercise the whole flow:

- **Deliverable A — Repository hygiene** (Git): commit a real `.gitignore`, keep every commit
  in Conventional Commits format, branch and merge `feature/ci`, and tag a release — all
  graded against the live repository.
- **Deliverable B — Production pipeline** (CI/CD): build → test → security scan → container
  image → deploy, wired with `needs`, an artifact, and scoped `permissions` — and the whole
  run must pass green.

Finish both for the **Capstone Complete** badge.

### Three kinds of mission

- **Git missions** — a live sandbox with a **checklist of objectives that tick green as you
  work**. Solutions are graded by inspecting the real repository state.
- **CI/CD missions** — edit a workflow, hit **Run pipeline**, and watch the pipeline visualise.
- **Quizzes** — multiple choice with an explanation for every answer.

### Also included

- **Free Git sandbox** — a disposable repo with a terminal, file editor, live status panel and
  commit-graph visualiser.
- **Free CI/CD playground** — start from templates (node / build+test / matrix / deploy) and run.
- **Commit-graph visualiser**, the **three-trees** diagram, and branch/merge diagrams inside lessons.
- **Cheat sheet**, XP and levels with Git/DevOps titles, streaks, and 12 badges.
- Progress autosaves to `localStorage`, and can be exported/imported as JSON.

---

## How to use it

1. Open `index.html`.
2. Start with **Git Fundamentals → Chapter 1**, or jump to any track.
3. Read the lesson, then press **Start mission**. In a Git mission, type commands like:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git switch -c feature
   ```
   Create and edit files with the **+ new** button and the editor in the side panel.
4. Watch the **objectives**, **status panel** and **commit graph** update live.
5. In CI missions, edit the YAML and press **Run pipeline**, then **Validate**/**Run** to iterate.

### Supported Git commands in the sandbox

`init status add commit log diff branch checkout switch restore merge rebase reset revert
cherry-pick tag remote push fetch pull clone stash reflog rm mv clean submodule show config help`

Reference resolution supports `HEAD`, `HEAD~n`, `HEAD^n`, `HEAD@{n}`, branch names, tags,
`origin/x` and SHA prefixes. The engine also simulates **git hooks** (`pre-commit`,
`commit-msg`) and records **submodules**.

The terminal has an authentic prompt showing your branch, **↑/↓ command history**, and
colourised output (errors in red, diffs and success lines highlighted).

### Supported CI features

GitHub-Actions-style workflow YAML (a robust subset parser): `on:` triggers
(`push`, `pull_request`, `schedule`, `workflow_dispatch`) including **branch and path
filters**, `jobs`, `runs-on`, `steps` (`run:` and `uses:`), `needs`, `strategy.matrix`,
`env`, `with`, `permissions`, and block scalars (`run: |`). Recognised actions include
`actions/checkout`, `setup-node`, `actions/cache`, `upload/download-artifact`, `docker/*`,
`codeql-action` and `trivy-action`.

---

## Project layout

```
gitcicd/
├─ index.html            # loads everything; open this
├─ styles.css            # dark "developer terminal" theme
├─ package.json          # only for the optional dev tests
├─ js/
│  ├─ util.js            # DOM/storage/formatting/toast helpers
│  ├─ state.js           # XP, levels, badges, streaks, completion, persistence
│  ├─ git.js             # THE GIT ENGINE: model + command interpreter
│  ├─ graph.js           # SVG commit graph, three-trees and branch/merge diagrams
│  ├─ ci.js              # YAML subset parser + workflow runner + pipeline visualiser
│  ├─ content.js         # content registry + mission/quiz helpers
│  ├─ content.git.js     # Git fundamentals, collaboration, theory tracks
│  ├─ content.cicd.js    # CI/CD, GitHub Actions, containers, DevSecOps tracks
│  ├─ content.advanced.js# Advanced Git & Monorepos track
│  ├─ content.capstone.js# the two capstone deliverables
│  ├─ ui.js              # router, views, terminal, editor, mission runner
│  └─ app.js             # boot (with a friendly error screen)
└─ tools/
   ├─ selftest.js        # validates the Git engine, YAML, runner and all content
   └─ uitest.js          # boots the real UI in jsdom and solves missions
```

### Adding a chapter

Add an entry to a track in `js/content.git.js` or `js/content.cicd.js`:

```js
{
  id: 'my-chapter', title: 'My chapter',
  lesson: {
    hook: 'Why this matters in one sentence.',
    blocks: [
      ['p', 'A paragraph with `inline code`.'],
      ['code', 'git status\ngit add .'],
      ['list', ['**bold** point one', 'point two']],
      ['warn', 'A gotcha.'],
      ['viz', 'states']            // states | flow | graph | pipeline
    ]
  },
  mission: {
    id: 'my-chapter-m', kind: 'git', brief: 'What to do.',
    setup: function (repo) { repo.initialized = true; repo.run('git init'); repo.writeFile('a.txt', 'hi'); repo.run('git add .'); repo.run('git commit -m "c1"'); },
    objectives: [
      { t: 'a.txt is tracked', fn: function (g) { return 'a.txt' in g.headSnapshot(); } }
    ],
    hint: 'Run `git init`, then add and commit.'
  }
}
```

Lesson blocks: `p`, `code`, `yaml`, `dockerfile`, `list`, `note`, `warn`, `tip`, `table`,
`term`, `ex`, `viz`. Mission kinds: `git`, `ci`, `quiz`.

Then run `node tools/selftest.js` — it checks your lesson blocks, mission setup, objectives
and YAML.

---

## Tests

```bash
node tools/selftest.js           # engine + content validation (zero dependencies)
npm install && npm run test:ui   # optional: drives the real UI in jsdom
```

`selftest.js` asserts real Git behaviour (commit flow, fast-forward and three-way merges with
conflicts, revert/reset/cherry-pick/rebase, stash, reflog recovery, remotes, tags), validates
**git hooks and submodules**, validates the YAML parser and the workflow runner (passing and
failing pipelines, matrix expansion, **branch and path filters**), checks the **capstone
solution satisfies every objective**, and verifies that every chapter and mission is
well-formed and solvable.

`uitest.js` boots the real UI, renders **all 46 chapters**, and actually solves a Git mission,
a CI mission, a quiz **and both capstone deliverables** end to end, edits a file in the
sandbox, and confirms a failing pipeline is reported as failed.

---

## Suggested learning path

1. **Git Fundamentals** — do every mission. You cannot do CI/CD without Git.
2. **Collaboration & Recovery** — conflicts, rebase and reflog are the skills that separate
   people who are scared of Git from people who are not.
3. **Versioning Theory & Tools** — the mental models that make everything else stick.
4. **CI/CD Concepts & Pipelines** — build, test, gate, artifact, matrix, cache, deploy.
5. **GitHub Actions** — including the debugging mission; real work is mostly reading red logs.
6. **Containers & Deploy** — package it, ship it.
7. **DevSecOps** — then make it safe. Finish with the hardening checklist.
8. **Advanced Git & Monorepos** — hooks, submodules, LFS, and CI path filters for large repos.
9. **Capstone** — prove it: repository hygiene + a full production pipeline, green end to end.

Pass every mission and you will have genuinely operated the whole pipeline: the same
trigger → build → test → package → deploy → verify flow every professional team runs.

Good luck — go from zero to hero.
