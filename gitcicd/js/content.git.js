/* ============================================================
   GitCI/CD Hero - content.git.js
   Track 1: Git Fundamentals
   Track 2: Collaboration & Recovery
   Track 3: Versioning theory & tooling
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

  /* ============================================================ */
  /* TRACK 1 - GIT FUNDAMENTALS                                    */
  /* ============================================================ */
  GH.track({
    id: 'fundamentals', name: 'Git Fundamentals', icon: '&#127793;', color: '#38bdf8',
    blurb: 'From "what is a commit" to branches, merges, and undoing mistakes.',
    chapters: [

      {
        id: 'g-intro', title: 'Version control in 60 seconds',
        lesson: {
          hook: 'Git is a time machine for your code. Every save is a labelled snapshot you can return to, compare, and share.',
          blocks: [
            ['p', 'A **version control system (VCS)** records the history of a project so you can see what changed, who changed it, and roll back when something breaks. Without one, you end up with files named `final_v2_REALLY_final.zip`.'],
            ['viz', 'states'],
            ['p', 'Git stores **snapshots**, not diffs. Each snapshot is a **commit** with a unique hash, a message, an author, and a pointer to its parent commit(s). Chains of commits form a **Directed Acyclic Graph** — the "history" you see in `git log`.'],
            ['list', [
              '**Distributed**: every clone is a full copy of the history, so you can commit offline.',
              '**Cheap branches**: a branch is a 41-byte pointer to a commit — that is why branching is instant.',
              '**Content-addressed**: a file’s hash depends on its contents, so Git can detect corruption.'
            ]],
            ['note', 'Git the tool (created 2005 by Linus Torvalds) is not the same as GitHub the hosting service. Git is local; GitHub/GitLab/Bitbucket host copies and add pull requests and CI/CD.']
          ]
        },
        mission: {
          id: 'g-intro-q', kind: 'quiz',
          brief: 'Warm up with a few quick questions.',
          questions: [
            { q: 'What does a Git commit store?', options: ['Only the lines you changed', 'A full snapshot of the tracked files at that moment', 'A compressed archive of the whole computer', 'A link to GitHub'], a: 1, why: 'Git stores a snapshot of the tree. It dedupes unchanged files internally, but conceptually each commit is a complete snapshot.' },
            { q: 'A branch in Git is…', options: ['A copy of all files', 'A folder', 'A movable pointer to a commit', 'A separate repository'], a: 2, why: 'Branches are just named pointers to commits — cheap and instant.' },
            { q: 'Git being "distributed" means:', options: ['It requires the internet', 'Every clone contains the full history', 'It syncs automatically', 'Only GitHub can use it'], a: 1, why: 'You get the whole history offline; remotes are just other copies.' }
          ]
        }
      },

      {
        id: 'g-first-repo', title: 'Your first repository',
        lesson: {
          hook: 'Three commands stand between an empty folder and a tracked project.',
          blocks: [
            ['p', '`git init` turns a folder into a repository by creating a hidden `.git` directory. Everything Git knows lives there.'],
            ['code', 'git init\ngit status\ngit add README.md\ngit commit -m "Initial commit"'],
            ['p', 'The workflow is always the same loop: **edit** a file → **stage** it with `git add` → **commit** it with a message.'],
            ['term', ['git status', 'On branch main\n\nNo commits yet\n\nUntracked files:\n        README.md\n\nnothing added to commit']],
            ['tip', 'Write commit messages in the imperative: "Add login form", not "Added stuff". Future you is the reader.']
          ]
        },
        mission: {
          id: 'g-first-repo-m', kind: 'git',
          brief: 'Initialise a repository and make your first commit. Create `README.md` with some text, stage it, and commit it.',
          setup: null,
          objectives: [
            { t: 'Repository is initialised', fn: function (g) { return g.initialized; } },
            { t: 'README.md is committed (tracked in history)', fn: function (g) { return g.headCommit() && ('README.md' in g.headCommit().files); } },
            { t: 'At least one commit exists', fn: function (g) { return Object.keys(g.commits).length >= 1; } }
          ],
          hint: 'Use the file editor to create README.md, then run `git init`, `git add .`, `git commit -m "Initial commit"`.'
        }
      },

      {
        id: 'g-staging', title: 'The staging area: choose what to commit',
        lesson: {
          hook: 'The staging area (the "index") is Git’s superpower: you decide exactly which changes make it into the next snapshot.',
          blocks: [
            ['viz', 'states'],
            ['p', '`git add <file>` copies the current contents of that file into the staging area. `git commit` then records everything staged.'],
            ['p', 'This lets you make one clean commit out of a messy afternoon: stage only the files that belong together.'],
            ['code', 'git add app.js          # stage one file\ngit add .               # stage everything\ngit status              # see what is staged vs not\ngit diff                # unstaged changes\ngit diff --staged       # staged changes'],
            ['warn', 'Editing a file **after** `git add` leaves a newer version unstaged. You would need to `git add` it again — `git status` shows this as both "to be committed" and "not staged".']
          ]
        },
        mission: {
          id: 'g-staging-m', kind: 'git',
          brief: 'Two files are waiting. Stage **only** `app.js` and commit it — leave `notes.txt` untracked.',
          setup: function (repo) { setup(repo, [['cmd', 'git init'], ['write', 'app.js', 'console.log("app");\n'], ['write', 'notes.txt', 'scratch notes\n']]); },
          objectives: [
            { t: 'app.js is committed', fn: function (g) { return g.headCommit() && ('app.js' in g.headCommit().files); } },
            { t: 'notes.txt is NOT committed', fn: function (g) { return g.headCommit() && !('notes.txt' in g.headCommit().files); } },
            { t: 'notes.txt is still on disk (untracked)', fn: function (g) { return 'notes.txt' in g.work; } }
          ],
          hint: 'Run `git add app.js` (not `git add .`), then `git commit -m "..."`.'
        }
      },

      {
        id: 'g-history', title: 'Reading history: log, diff, show',
        lesson: {
          hook: 'History is only useful if you can read it. These three commands are your microscope.',
          blocks: [
            ['p', '`git log` lists commits newest-first. `--oneline` is the tight view you will use daily.'],
            ['code', 'git log\ngit log --oneline\ngit log -n 5\ngit show <commit>     # message + the diff\ngit diff A B          # compare two commits'],
            ['p', '`git diff` answers "what changed?", and can compare any two states: working tree vs index, index vs HEAD, or two commits.'],
            ['term', ['git log --oneline', 'a1b2c3d (HEAD -> main) Add tests\n9f8e7d6 Add feature\n1122334 Initial commit']],
            ['tip', 'Add `--graph --decorate --oneline` aliases later; for now the built-in graph on this page shows the shape for you.']
          ]
        },
        mission: {
          id: 'g-history-m', kind: 'git',
          brief: 'Build a small history: create `a.txt`, commit; add `b.txt`, commit; modify `a.txt`, commit. Then inspect with `git log --oneline`.',
          setup: function (repo) { setup(repo, [['cmd', 'git init']]); },
          objectives: [
            { t: 'At least 3 commits exist', fn: function (g) { return Object.keys(g.commits).length >= 3; } },
            { t: 'a.txt is tracked', fn: function (g) { return 'a.txt' in g.headSnapshot(); } },
            { t: 'b.txt is tracked', fn: function (g) { return 'b.txt' in g.headSnapshot(); } }
          ],
          hint: 'Create/edit files in the editor, `git add`, `git commit -m "..."` each time.'
        }
      },

      {
        id: 'g-branching', title: 'Branching',
        lesson: {
          hook: 'A branch is a bookmark. Make one, work freely, and main stays safe.',
          blocks: [
            ['p', 'Creating a branch copies a pointer, not the files — it is instant no matter how big the project is.'],
            ['code', 'git branch                 # list branches\ngit switch -c feature      # create and switch\ngit switch main            # back to main\ngit branch -d feature      # delete when merged'],
            ['p', '`git switch` (newer) and `git checkout` (classic) both move you between branches. `switch` only does branches; `checkout` can also restore files, which is why `switch` is preferred for changing branches.'],
            ['viz', 'flow'],
            ['note', 'Commit on a branch and the branch pointer moves forward with you. `main` stays exactly where it was until you merge.']
          ]
        },
        mission: {
          id: 'g-branching-m', kind: 'git',
          brief: 'On a repo with one commit on `main`, create and switch to a branch `feature`, add a file `feature.txt`, commit it, then switch back to `main`.',
          setup: function (repo) { setup(repo, [['cmd', 'git init'], ['write', 'app.js', 'v1\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Initial commit"']]); },
          objectives: [
            { t: 'A branch named feature exists', fn: function (g) { return !!g.branches.feature; } },
            { t: 'feature has a commit that main does not', fn: function (g) { return g.branches.feature !== g.branches.main; } },
            { t: 'feature.txt is committed on feature', fn: function (g) { return !!(g.branches.feature && g.commits[g.branches.feature]) && ('feature.txt' in g.commits[g.branches.feature].files); } },
            { t: 'You are back on main', fn: function (g) { return g.head.type === 'branch' && g.head.name === 'main'; } }
          ],
          hint: '`git switch -c feature`, create feature.txt, add + commit, then `git switch main`.'
        }
      },

      {
        id: 'g-merging', title: 'Merging',
        lesson: {
          hook: 'Merging brings two lines of work back together — sometimes effortlessly, sometimes with a conflict to resolve.',
          blocks: [
            ['p', 'If `main` has not moved since you branched, Git can simply slide the pointer forward. That is a **fast-forward**.'],
            ['p', 'If both branches have new commits, Git performs a **three-way merge** using the common ancestor as the base, and creates a **merge commit** with two parents.'],
            ['code', 'git switch main\ngit merge feature          # fast-forward or 3-way\n# if conflicts:\n#   edit the files, git add them, then:\ngit commit                 # completes the merge'],
            ['viz', 'flow'],
            ['ex', {
              q: 'main has commit D, feature has C→E from the same base B. What kind of merge?',
              steps: ['Neither branch is an ancestor of the other (both moved).', 'Git uses B as the merge base.'], a: 'Three-way merge → a merge commit with parents D and E.'
            }]
          ]
        },
        mission: {
          id: 'g-merging-m', kind: 'git',
          brief: 'A feature branch with one commit is waiting. Merge it into `main` (this will fast-forward), then delete the branch.',
          setup: function (repo) {
            setup(repo, [['cmd', 'git init'], ['write', 'app.js', 'v1\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Initial commit"'],
              ['cmd', 'git switch -c feature'], ['write', 'feature.txt', 'new\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Add feature"'], ['cmd', 'git switch main']]);
          },
          objectives: [
            { t: 'main now contains feature.txt', fn: function (g) { return 'feature.txt' in g.headSnapshot(); } },
            { t: 'main and feature point at the same commit', fn: function (g) { return g.branches.main === g.branches.feature; } }
          ],
          hint: '`git merge feature` then optionally `git branch -d feature`.'
        }
      },

      {
        id: 'g-undo', title: 'Undoing: reset, revert, restore',
        lesson: {
          hook: 'Everyone breaks things. What matters is knowing which undo to reach for.',
          blocks: [
            ['table', { head: ['You want to…', 'Command', 'Rewrites history?'], rows: [
              ['discard unstaged edits in a file', 'git restore <file>', 'No'],
              ['unstage a file (keep edits)', 'git restore --staged <file>', 'No'],
              ['undo a commit, keep changes staged', 'git reset --soft HEAD~1', 'Yes (local)'],
              ['undo a commit, keep changes unstaged', 'git reset HEAD~1', 'Yes (local)'],
              ['nuke a commit and its changes', 'git reset --hard HEAD~1', 'Yes — dangerous'],
              ['undo a published commit', 'git revert <sha>', 'No — adds a new commit']
            ] }],
            ['warn', '`reset --hard` throws away work. It cannot be recovered with `git revert` — only via the reflog, and only for a while.'],
            ['note', 'Rule of thumb: `reset` for local, un-pushed mistakes; `revert` for anything already shared, because it never rewrites published history.']
          ]
        },
        mission: {
          id: 'g-undo-m', kind: 'git',
          brief: 'A bad commit is on `main` ("Add bug"). Undo it **without rewriting history** by reverting it, so the file it broke is restored.',
          setup: function (repo) { setup(repo, [['cmd', 'git init'], ['write', 'app.js', 'good\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Initial commit"'], ['write', 'app.js', 'BROKEN\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Add bug"']]); },
          objectives: [
            { t: 'A new commit was added (history not rewritten)', fn: function (g) { return Object.keys(g.commits).length >= 3; } },
            { t: 'app.js content is restored to "good"', fn: function (g) { return (g.headSnapshot()['app.js'] || '').indexOf('good') !== -1; } }
          ],
          hint: '`git log --oneline`, grab the bad commit’s hash, then `git revert <hash>`.'
        }
      },

      {
        id: 'g-tags', title: 'Tags: marking releases',
        lesson: {
          hook: 'Tags are permanent names for specific commits — the anchor points of every release.',
          blocks: [
            ['code', 'git tag                     # list tags\ngit tag v1.0.0              # lightweight\ngit tag -a v1.1.0 -m "Release 1.1"\ngit push origin v1.1.0      # tags are not pushed by default!'],
            ['p', 'Use **annotated** tags (`-a`) for releases: they store a message, date, and tagger. Lightweight tags are just a pointer.'],
            ['warn', 'A common trap: `git push` does **not** send your tags. Push them explicitly with `git push --tags` or a named tag.']
          ]
        },
        mission: {
          id: 'g-tags-m', kind: 'git',
          brief: 'Create an annotated tag `v1.0.0` with the message "First release".',
          setup: function (repo) { setup(repo, [['cmd', 'git init'], ['write', 'app.js', 'v1\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Initial commit"']]); },
          objectives: [{ t: 'Tag v1.0.0 exists', fn: function (g) { return !!g.tags['v1.0.0']; } }],
          hint: '`git tag -a v1.0.0 -m "First release"`'
        }
      }
    ]
  });

  /* ============================================================ */
  /* TRACK 2 - COLLABORATION & RECOVERY                            */
  /* ============================================================ */
  GH.track({
    id: 'collab', name: 'Collaboration & Recovery', icon: '&#129309;', color: '#a855f7',
    blurb: 'Remotes, pull requests, conflicts, rebase, stash, and rescuing lost work.',
    chapters: [

      {
        id: 'g-remotes', title: 'Remotes: clone, push, pull, fetch',
        lesson: {
          hook: 'A remote is just another copy of the repo on a server. Syncing is the whole game of collaboration.',
          blocks: [
            ['code', 'git clone <url>\ngit remote add origin <url>\ngit push -u origin main\ngit fetch origin         # download, do not merge\ngit pull                 # fetch + merge'],
            ['p', '`push` sends your commits to the remote. `fetch` downloads theirs into **remote-tracking branches** like `origin/main` without touching your work. `pull` = `fetch` + `merge`.'],
            ['note', 'Branches that only exist on the remote (origin/main) are read-only mirrors you can inspect and merge from.'],
            ['term', ['git push -u origin main', 'To https://github.com/team/project.git\n * [new branch]      main -> main\nbranch \'main\' set up to track \'origin/main\'.']]
          ]
        },
        mission: {
          id: 'g-remotes-m', kind: 'git',
          brief: 'Clone the team repository, make a commit, and push it. Then fetch to see everything is in sync.',
          setup: function (repo) { setup(repo, [['cmd', 'git clone https://github.com/team/project.git']]); },
          objectives: [
            { t: 'A remote named origin exists', fn: function (g) { return !!g.remote; } },
            { t: 'You are on main', fn: function (g) { return g.head.type === 'branch' && g.head.name === 'main'; } },
            { t: 'Local main was pushed to origin', fn: function (g) { return g.remote && g.remote.branches.main === g.branches.main && !!g.branches.main; } }
          ],
          hint: '`git clone <url>` already sets up origin. Edit a file, `git add`, `git commit`, then `git push origin main`.'
        }
      },

      {
        id: 'g-conflicts', title: 'Resolving merge conflicts',
        lesson: {
          hook: 'A conflict is not an error — it is Git politely refusing to guess which version you want.',
          blocks: [
            ['p', 'When both branches changed the same lines, Git stops and inserts markers:'],
            ['code', '<<<<<<< HEAD\nyour version\n=======\ntheir version\n>>>>>>> feature'],
            ['p', 'Your job: edit the file to the final content you want, delete the markers, `git add` the file, then `git commit` to finish the merge.'],
            ['code', 'git status                 # shows "both modified"\n# ... edit the file ...\ngit add app.js\ngit commit                 # completes the merge'],
            ['term', ['git merge feature', 'CONFLICT (content): Merge conflict in app.js\nAutomatic merge failed; fix conflicts and then commit the result.']],
            ['tip', 'You can also pick a side directly: `git checkout --ours app.js` or `--theirs`, then `git add`. Useful when one branch clearly wins.']
          ]
        },
        mission: {
          id: 'g-conflicts-m', kind: 'git',
          brief: 'Merge `feature` into `main`. A conflict will appear in `app.js`. Resolve it (keep both lines if you like), stage it, and commit.',
          setup: function (repo) {
            setup(repo, [['cmd', 'git init'], ['write', 'app.js', 'line1\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Initial commit"'],
              ['cmd', 'git switch -c feature'], ['write', 'app.js', 'line1\nfeature line\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Feature change"'],
              ['cmd', 'git switch main'], ['write', 'app.js', 'line1\nmain line\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Main change"']]);
          },
          objectives: [
            { t: 'The merge is committed (main has 2 parents in history)', fn: function (g) { return g.log().some(function (c) { return c.parents.length === 2; }); } },
            { t: 'No unresolved conflicts remain', fn: function (g) { return g.conflictPaths.length === 0 && !g.mergeState; } },
            { t: 'app.js has no conflict markers', fn: function (g) { return (g.headSnapshot()['app.js'] || '').indexOf('<<<<<<<') === -1; } }
          ],
          hint: '`git merge feature` → edit app.js to remove the `<<<<<<<`, `=======`, `>>>>>>>` lines → `git add app.js` → `git commit`.'
        }
      },

      {
        id: 'g-rebase', title: 'Rebase: a cleaner history',
        lesson: {
          hook: 'Rebase replays your commits on top of another branch, producing a straight line instead of a merge knot.',
          blocks: [
            ['p', '`git rebase main` takes the commits unique to your branch and re-applies them on top of `main`. Same changes, tidier history.'],
            ['code', 'git switch feature\ngit rebase main            # replay feature’s commits onto main\n# conflicts? fix, git add, then:\ngit rebase --continue'],
            ['table', { head: ['', 'merge', 'rebase'], rows: [
              ['History shape', 'keeps branch structure', 'linear'],
              ['Creates a commit?', 'yes (merge commit)', 'no — rewrites yours'],
              ['Safe on shared branches?', 'yes', 'no']
            ] }],
            ['warn', 'The golden rule: **never rebase commits you have already pushed and others may have pulled.** You are rewriting history.']
          ]
        },
        mission: {
          id: 'g-rebase-m', kind: 'git',
          brief: 'You are on `feature`, which is behind `main`. Rebase `feature` onto `main` so it sits on top with a linear history.',
          setup: function (repo) {
            setup(repo, [['cmd', 'git init'], ['write', 'app.js', 'v1\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Initial commit"'],
              ['cmd', 'git switch -c feature'], ['write', 'feature.txt', 'f\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Feature work"'],
              ['cmd', 'git switch main'], ['write', 'main.txt', 'm\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Main work"'], ['cmd', 'git switch feature']]);
          },
          objectives: [
            { t: 'feature is ahead of main by exactly its own commits', fn: function (g) { return g.branches.feature && g.isAncestor(g.branches.main, g.branches.feature); } },
            { t: 'feature has no merge commit (linear)', fn: function (g) { return !g.log().some(function (c) { return c.parents.length > 1; }); } }
          ],
          hint: '`git rebase main` (You are already on feature.)'
        }
      },

      {
        id: 'g-stash', title: 'Stash: park your work',
        lesson: {
          hook: 'Mid-change and need to switch branches? Stash tucks your work away safely.',
          blocks: [
            ['code', 'git stash             # save and clean the working tree\ngit stash list\ngit stash pop         # restore and remove from the list\ngit stash apply       # restore but keep it stashed\ngit stash drop'],
            ['p', 'Stash stores both your staged and unstaged changes, then resets the working tree to the last commit — handy before a `pull` or a quick hotfix.'],
            ['note', 'Stashes are local and easy to forget about. `git stash list` is your friend; leftover stashes are a common source of confusion.']
          ]
        },
        mission: {
          id: 'g-stash-m', kind: 'git',
          brief: 'You have uncommitted edits. Stash them, then pop them back so the edits return to the working tree.',
          setup: function (repo) {
            setup(repo, [['cmd', 'git init'], ['write', 'app.js', 'committed\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Initial commit"'], ['write', 'app.js', 'committed\nwork in progress\n']]);
          },
          objectives: [
            { t: 'The working tree edit is restored after popping', fn: function (g) { return (g.work['app.js'] || '').indexOf('work in progress') !== -1; } },
            { t: 'No stash entries remain', fn: function (g) { return g.stashList.length === 0; } }
          ],
          hint: '`git stash` then `git stash pop`.'
        }
      },

      {
        id: 'g-cherry', title: 'Cherry-pick & archaeology',
        lesson: {
          hook: 'Sometimes you want exactly one commit from somewhere else — or to find the commit that broke everything.',
          blocks: [
            ['p', '`git cherry-pick <sha>` copies a single commit onto your current branch. Perfect for backporting a hotfix.'],
            ['code', 'git cherry-pick a1b2c3d\ngit blame app.js          # who last changed each line\ngit bisect start          # binary-search for the bad commit'],
            ['p', '`git blame` annotates each line with its last commit. `git bisect` does a binary search through history to find the commit that introduced a bug — O(log n) checks.'],
            ['note', 'Cherry-picking duplicates a commit (a new hash). Overusing it scatters identical changes across the graph, so prefer merge/rebase for whole branches.']
          ]
        },
        mission: {
          id: 'g-cherry-m', kind: 'git',
          brief: 'On `main`, cherry-pick the commit that added `hotfix.txt` from the `release` branch (find its hash with `git log` first).',
          setup: function (repo) {
            setup(repo, [['cmd', 'git init'], ['write', 'app.js', 'v1\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Initial commit"'],
              ['cmd', 'git switch -c release'], ['write', 'hotfix.txt', 'critical fix\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Hotfix"'], ['cmd', 'git switch main']]);
          },
          objectives: [
            { t: 'hotfix.txt is on the current branch', fn: function (g) { return 'hotfix.txt' in g.headSnapshot(); } },
            { t: 'A cherry-picked commit exists (not a merge)', fn: function (g) { return g.log().some(function (c) { return (c.message || '').toLowerCase().indexOf('hotfix') !== -1; }); } }
          ],
          hint: '`git log --oneline release` to find the hash, then `git cherry-pick <sha>`.'
        }
      },

      {
        id: 'g-reflog', title: 'Recovering lost work with the reflog',
        lesson: {
          hook: 'Even a `reset --hard` is usually recoverable. Git almost never truly forgets.',
          blocks: [
            ['p', 'The **reflog** records every place HEAD has been for the last ~90 days. If you "lost" a commit, it is probably still in the reflog.'],
            ['code', 'git reflog                 # find the lost commit\ngit reset --hard HEAD@{1}  # jump back\ngit branch rescue <sha>    # or anchor it to a new branch'],
            ['term', ['git reflog', 'a1b2c3d HEAD@{0}: reset: moving to HEAD~1\n9f8e7d6 HEAD@{1}: commit: Add important feature']],
            ['note', 'This is why `reset --hard` is not the end of the world locally — but nothing recovers from a mistake you never committed. Commit often.']
          ]
        },
        mission: {
          id: 'g-reflog-m', kind: 'git',
          brief: 'You just ran `git reset --hard HEAD~1` and lost a commit. Use the reflog to bring `app.js` back to the lost version.',
          setup: function (repo) {
            setup(repo, [['cmd', 'git init'], ['write', 'app.js', 'v1\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Initial commit"'],
              ['write', 'app.js', 'v2 important\n'], ['cmd', 'git add .'], ['cmd', 'git commit -m "Important work"'], ['cmd', 'git reset --hard HEAD~1']]);
          },
          objectives: [
            { t: 'The lost "important" version is restored', fn: function (g) { return (g.headSnapshot()['app.js'] || '').indexOf('important') !== -1; } }
          ],
          hint: '`git reflog` to find the "Important work" entry, then `git reset --hard HEAD@{1}` (or the hash).'
        }
      }
    ]
  });

  /* ============================================================ */
  /* TRACK 3 - VERSIONING THEORY & TOOLING                         */
  /* ============================================================ */
  GH.track({
    id: 'theory', name: 'Versioning Theory & Tools', icon: '&#128218;', color: '#22d3ee',
    blurb: 'How Git works under the hood, branching strategies, and the wider ecosystem.',
    chapters: [
      {
        id: 't-guts', title: 'How Git actually works (objects & the DAG)',
        lesson: {
          hook: 'Peel back the layers and Git is beautifully simple: four object types in a content-addressed store.',
          blocks: [
            ['list', ['**blob** — file contents', '**tree** — a directory listing (names → blobs/trees)', '**commit** — a pointer to a tree + parent commits + metadata', '**tag** (annotated) — a named pointer with a message']],
            ['p', 'Each object is stored under a **SHA-1 hash** of its contents (`.git/objects`). Because the hash is derived from the content, identical content is stored once and any corruption changes the hash.'],
            ['p', 'A branch is a file containing one commit hash. HEAD is a file pointing at the current branch. That is the entire top-level model.'],
            ['code', 'git cat-file -p HEAD        # inspect a commit object\ngit hash-object file.txt    # the blob hash for a file'],
            ['note', 'The commit graph (the DAG) is why merges, rebases, and bisect all work: history is a graph, not a list.']
          ]
        },
        mission: {
          id: 't-guts-q', kind: 'quiz', brief: 'Check your understanding of Git internals.',
          questions: [
            { q: 'A Git blob is named by…', options: ['A random id', 'The SHA hash of its contents', 'Its filename', 'Its position in the tree'], a: 1, why: 'Content-addressing: the hash IS the content identity.' },
            { q: 'A branch is stored as…', options: ['A full copy of the files', 'A file containing a commit hash', 'A database table', 'A folder of commits'], a: 1, why: 'Just a pointer file under .git/refs.' },
            { q: 'Why is Git history a DAG?', options: ['To save space', 'Because commits can have multiple parents (merges)', 'Because it sorts alphabetically', 'Because of SHA-1'], a: 1, why: 'Merge commits have two parents, so it branches and rejoins — a directed acyclic graph.' }
          ]
        }
      },
      {
        id: 't-strategies', title: 'Branching strategies',
        lesson: {
          hook: 'How a team uses branches shapes its release cadence. There is no single right answer — only trade-offs.',
          blocks: [
            ['p', '**Trunk-based**: everyone commits to `main` (or short-lived branches merged within a day or two), protected by CI and feature flags. Fastest flow; needs strong automated tests.'],
            ['p', '**GitHub Flow**: `main` is always deployable; each change is a short-lived branch + pull request. Simple and popular.'],
            ['p', '**GitFlow**: long-lived `develop`, `release/*`, `hotfix/*` branches with structured releases. Powerful but heavy; best for versioned software with scheduled releases.'],
            ['table', { head: ['Strategy', 'Flow', 'Best for'], rows: [['Trunk-based', 'fast, continuous', 'web, CI/CD-heavy teams'], ['GitHub Flow', 'PR per change', 'most product teams'], ['GitFlow', 'structured releases', 'scheduled, versioned software']] }],
            ['note', 'Whatever you choose, protect `main`: require pull requests, passing CI, and at least one review before merge.']
          ]
        },
        mission: {
          id: 't-strategies-q', kind: 'quiz', brief: 'Strategy trade-offs.',
          questions: [
            { q: 'Trunk-based development works best when…', options: ['There are no tests', 'You have strong CI and can hide unfinished work behind flags', 'You release once a year', 'You never use branches'], a: 1, why: 'Continuous integration assumes changes are verified automatically.' },
            { q: 'Which strategy uses develop/release/hotfix branches?', options: ['GitHub Flow', 'Trunk-based', 'GitFlow', 'Forking'], a: 2, why: 'GitFlow’s defining feature.' },
            { q: 'A pull request is primarily…', options: ['A way to copy code', 'A request to review and merge a branch', 'A commit', 'A remote'], a: 1, why: 'It is a review + merge workflow, and the natural place for CI to run.' }
          ]
        }
      },
      {
        id: 't-tools', title: 'Monorepo vs polyrepo & the wider ecosystem',
        lesson: {
          hook: 'Git is the default, but knowing the alternatives and the CI/CD landscape makes you dangerous.',
          blocks: [
            ['p', 'A **monorepo** keeps many projects in one repository (Google, Meta). Easier atomic cross-project changes; harder to scale builds and permissions. A **polyrepo** splits them; simpler isolation, more coordination overhead.'],
            ['p', 'CI/CD tools you will meet: **GitHub Actions** (this course), **GitLab CI** (`.gitlab-ci.yml`), **Jenkins** (self-hosted, plugin-driven), **CircleCI**, **Azure Pipelines**, **Buildkite**. Concepts transfer directly even when YAML differs.'],
            ['p', 'Older/other VCS: **SVN** (centralised, sequential revisions), **Mercurial** (distributed, simpler), **Perforce** (large binaries/games). Git won the network effects.'],
            ['note', 'The mental model to keep: trigger → build → test → package → deploy → verify. Every tool is a different syntax for that same pipeline.']
          ]
        },
        mission: {
          id: 't-tools-q', kind: 'quiz', brief: 'Ecosystem check.',
          questions: [
            { q: 'A key advantage of a monorepo is…', options: ['Smaller clones always', 'Atomic changes across projects in one commit', 'No CI needed', 'Automatic security'], a: 1, why: 'One commit can update a library and all its consumers together.' },
            { q: 'GitLab CI pipelines are configured in…', options: ['.github/workflows', '.gitlab-ci.yml', 'Jenkinsfile', 'pipeline.json'], a: 1, why: 'GitLab uses .gitlab-ci.yml at the repo root.' },
            { q: 'Compared to Git, SVN is…', options: ['Distributed', 'Centralised with a single revision counter', 'Only for Linux', 'A CI tool'], a: 1, why: 'SVN is centralised; every commit bumps one global revision number.' }
          ]
        }
      }
    ]
  });
})(window.GH);
