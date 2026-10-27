/* ============================================================
   GitCI/CD Hero - git.js
   A faithful-enough, from-scratch Git engine that runs in the
   browser. It models commits, the index (staging area), the
   working tree, branches, tags, merges, rebases, remotes,
   stash, and the reflog — enough to teach and to grade missions.

   Public API:
     var repo = new GH.Repo();      // empty, un-initialised
     repo.writeFile(path, content)  // "edit a file" in the work tree
     repo.run('git add .')          // -> { out, err }
     repo.status(), repo.snapshot()
     GH.Git                         // the live repo used by the UI
   ============================================================ */
(function (GH) {
  'use strict';

  /* ---------- helpers ---------- */
  GH.sha7 = function (str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    var h2 = (h ^ (h >>> 13)) >>> 0;
    return (h.toString(16) + h2.toString(16)).slice(0, 7).padStart(7, '0');
  };
  function copy(o) { var r = {}; for (var k in o) if (o.hasOwnProperty(k)) r[k] = o[k]; return r; }
  function keys(o) { return Object.keys(o).sort(); }
  function same(a, b) { return a === b; }
  function globMatch(pattern, path) {
    if (pattern === '.' || pattern === '-A' || pattern === '--all') return true;
    if (pattern.indexOf('*') === -1) return pattern === path;
    var re = new RegExp('^' + pattern.split('*').map(function (s) { return s.replace(/[.+?^${}()|[\]\\]/g, '\\$&'); }).join('.*') + '$');
    return re.test(path);
  }

  /* unified-ish diff of two strings (line level, LCS) */
  function linesDiff(oldStr, newStr) {
    var a = (oldStr || '').split('\n'), b = (newStr || '').split('\n');
    var n = a.length, m = b.length;
    var dp = [];
    for (var i = 0; i <= n; i++) { dp.push(new Array(m + 1).fill(0)); }
    for (i = n - 1; i >= 0; i--) for (var j = m - 1; j >= 0; j--)
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    var out = []; i = 0; j = 0;
    while (i < n && j < m) {
      if (a[i] === b[j]) { out.push('  ' + a[i]); i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push('- ' + a[i]); i++; }
      else { out.push('+ ' + b[j]); j++; }
    }
    while (i < n) out.push('- ' + a[i++]);
    while (j < m) out.push('+ ' + b[j++]);
    return out;
  }
  GH.linesDiff = linesDiff;

  /* three-way merge of snapshots */
  function mergeTrees(base, ours, theirs) {
    var files = {}, conflicts = [];
    var all = {};
    [base, ours, theirs].forEach(function (t) { keys(t).forEach(function (k) { all[k] = 1; }); });
    Object.keys(all).forEach(function (path) {
      var b = base[path], o = ours[path], t = theirs[path];
      if (o === t) { if (o != null) files[path] = o; return; }
      if (b === o) { if (t != null) files[path] = t; else delete files[path]; return; }   // we didn't change it
      if (b === t) { if (o != null) files[path] = o; else delete files[path]; return; }   // they didn't change it
      // both changed differently -> conflict
      conflicts.push(path);
      files[path] = '<<<<<<< HEAD\n' + (o || '') + '\n=======\n' + (t || '') + '\n>>>>>>> incoming\n';
    });
    return { files: files, conflicts: conflicts };
  }

  /* ============================================================ */
  /* REPO                                                          */
  /* ============================================================ */
  function Repo() { this.initState(); }

  Repo.prototype.initState = function () {
    this.commits = {};
    this.branches = {};
    this.tags = {};
    this.head = { type: 'branch', name: 'main' };
    this.index = {};
    this.work = {};
    this.remote = null;
    this.remoteTracking = {};
    this.reflog = [];
    this.stashList = [];
    this.config = { name: 'You', email: 'you@example.com' };
    this.initialized = false;
    this.clock = 1700000000;
    this.mergeState = null;
    this.conflictPaths = [];
    this.detachedMsg = '';
    this.hooks = null;          // { preCommit(ctx), commitMsg(ctx) } — simulated .git/hooks
    this.submodules = {};       // path -> { url, sha }
  };

  /* ---------- low level ---------- */
  Repo.prototype.requireInit = function () {
    if (!this.initialized) throw new Error("fatal: not a git repository (or any of the parent directories): .git");
  };
  Repo.prototype.headCommit = function () { var s = this.headSha(); return s ? this.commits[s] : null; };
  Repo.prototype.headSha = function () {
    if (this.head.type === 'branch') return this.branches[this.head.name] || null;
    return this.head.sha;
  };
  Repo.prototype.headSnapshot = function () { var c = this.headCommit(); return c ? copy(c.files) : {}; };
  Repo.prototype.headRefName = function () {
    if (this.head.type === 'branch') return this.head.name;
    return 'HEAD detached at ' + (this.head.sha || '').slice(0, 7);
  };
  Repo.prototype.newCommit = function (parents, files, message) {
    this.clock++;
    var raw = parents.join(',') + '|' + message + '|' + this.clock + '|' + JSON.stringify(files);
    var sha = GH.sha7(raw + (this.shaSeq++).toString());
    this.commits[sha] = {
      sha: sha, parents: parents.slice(), files: copy(files), message: message,
      time: this.clock, author: this.config.name
    };
    return sha;
  };
  Repo.prototype.setHead = function (sha, action) {
    if (this.head.type === 'branch') this.branches[this.head.name] = sha;
    else this.head.sha = sha;
    this.reflog.unshift({ sha: sha, action: action, ref: this.headRefName(), time: this.clock++ });
    this.reflog = this.reflog.slice(0, 100);
  };
  Repo.prototype.writeFile = function (path, content) { this.work[path] = content; };
  Repo.prototype.deleteFile = function (path) { delete this.work[path]; delete this.index[path]; };
  Repo.prototype.isAncestor = function (a, b) {
    if (!a || !b) return false;
    var seen = {}, stack = [b];
    while (stack.length) {
      var s = stack.pop();
      if (s === a) return true;
      if (seen[s]) continue; seen[s] = 1;
      (this.commits[s] ? this.commits[s].parents : []).forEach(function (p) { stack.push(p); });
    }
    return false;
  };
  Repo.prototype.lca = function (a, b) {
    var anc = {}, stack = [a];
    while (stack.length) { var s = stack.pop(); if (anc[s] || !this.commits[s]) continue; anc[s] = 1; this.commits[s].parents.forEach(function (p) { stack.push(p); }); }
    var q = [b], seen = {};
    while (q.length) { var c = q.shift(); if (seen[c]) continue; seen[c] = 1; if (anc[c]) return c; (this.commits[c] ? this.commits[c].parents : []).forEach(function (p) { q.push(p); }); }
    return null;
  };
  Repo.prototype.resolve = function (ref) {
    if (!ref) return this.headSha();
    ref = ref.trim();
    if (ref === '@' || ref === 'HEAD') return this.headSha();
    var mRef = ref.match(/^(?:HEAD|@)@\{(\d+)\}$/);
    if (mRef) { var ri = parseInt(mRef[1], 10); return this.reflog[ri] ? (this.reflog[ri].sha || null) : null; }
    var m = ref.match(/^(.*?)(~{1,2}|\^)(\d*)$/);
    if (m) {
      var base = m[1] ? this.resolve(m[1]) : this.headSha();
      var n = m[3] ? parseInt(m[3], 10) : 1;
      var op = m[2];
      for (var i = 0; i < n; i++) {
        var c = this.commits[base]; if (!c) return null;
        if (op.charAt(0) === '~') base = c.parents[0];
        else base = c.parents[(m[3] ? n : 1) - 1] || c.parents[0];
      }
      return base || null;
    }
    if (this.branches[ref]) return this.branches[ref];
    if (this.tags[ref]) return this.tags[ref].sha || this.tags[ref];
    if (this.remoteTracking[ref]) return this.remoteTracking[ref];
    if (ref.indexOf('origin/') === 0 && this.remoteTracking[ref.slice(7)]) return this.remoteTracking[ref.slice(7)];
    if (this.commits[ref]) return ref;
    // prefix
    var found = Object.keys(this.commits).filter(function (s) { return s.indexOf(ref) === 0; });
    if (found.length === 1) return found[0];
    return null;
  };
  Repo.prototype.refDecorations = function (sha) {
    var d = [], self = this;
    Object.keys(this.branches).forEach(function (b) { if (self.branches[b] === sha) d.push({ label: b, type: 'branch' }); });
    if (this.head.type === 'branch' && this.branches[this.head.name] === sha) d.push({ label: 'HEAD -> ' + this.head.name, type: 'head' });
    if (this.head.type === 'commit' && this.head.sha === sha) d.push({ label: 'HEAD', type: 'head' });
    Object.keys(this.tags).forEach(function (t) { var ts = self.tags[t].sha || self.tags[t]; if (ts === sha) d.push({ label: 'tag: ' + t, type: 'tag' }); });
    Object.keys(this.remoteTracking).forEach(function (r) { if (self.remoteTracking[r] === sha) d.push({ label: r, type: 'remote' }); });
    return d;
  };

  /* ---------- status ---------- */
  Repo.prototype.status = function () {
    var base = this.headSnapshot();
    var staged = [], unstaged = [], untracked = [], conflicts = [];
    var self = this;
    keys(this.index).forEach(function (p) {
      if (!same(self.index[p], base[p])) {
        staged.push({ path: p, state: base[p] == null ? 'new file' : 'modified' });
      }
    });
    Object.keys(base).forEach(function (p) {
      if (!(p in self.index)) {
        if (self.conflictPaths.indexOf(p) === -1) staged.push({ path: p, state: 'deleted' });
      }
    });
    this.conflictPaths.forEach(function (p) { if (p in self.index) staged.push({ path: p, state: 'resolved' }); });
    // unstaged: index vs work
    keys(this.index).forEach(function (p) {
      if (!same(self.index[p], self.work[p])) unstaged.push({ path: p, state: self.work[p] == null ? 'deleted' : 'modified' });
    });
    keys(this.work).forEach(function (p) {
      if (!(p in self.index) && !(p in base)) untracked.push(p);
      else if (!(p in self.index) && (p in base) && self.conflictPaths.indexOf(p) === -1) {
        if (!same(self.work[p], base[p])) unstaged.push({ path: p, state: 'modified' });
      }
    });
    this.conflictPaths.forEach(function (p) { conflicts.push(p); });
    var ab = this.aheadBehind();
    return {
      branch: this.headRefName(), detached: this.head.type === 'commit',
      staged: staged, unstaged: unstaged, untracked: untracked, conflicts: conflicts,
      clean: !staged.length && !unstaged.length && !untracked.length && !conflicts.length,
      merging: !!this.mergeState, ahead: ab.ahead, behind: ab.behind, hasCommits: !!this.headSha()
    };
  };
  Repo.prototype.aheadBehind = function () {
    if (!this.remote || this.head.type !== 'branch') return { ahead: 0, behind: 0 };
    var up = this.remoteTracking['origin/' + this.head.name];
    var local = this.branches[this.head.name];
    if (!up || !local) return { ahead: 0, behind: 0 };
    function count(from, stop) {
      var seen = {}, stack = [from], n = 0;
      while (stack.length) { var s = stack.pop(); if (!s || s === stop || seen[s]) continue; seen[s] = 1; n++; (this.commits[s] ? this.commits[s].parents : []).forEach(function (p) { stack.push(p); }); }
      return n;
    }
    var cnt = count.bind(this);
    return { ahead: this.isAncestor(up, local) ? cnt(local, up) : 0, behind: this.isAncestor(local, up) ? cnt(up, local) : 0 };
  };

  /* ---------- staging ---------- */
  Repo.prototype.add = function (patterns) {
    var self = this;
    patterns.forEach(function (pat) {
      var matched = false;
      keys(self.work).forEach(function (p) {
        if (globMatch(pat, p)) { self.index[p] = self.work[p]; matched = true; if (self.conflictPaths.indexOf(p) !== -1) self.conflictPaths = self.conflictPaths.filter(function (x) { return x !== p; }); }
      });
      // deletions: a tracked file removed from the work tree
      keys(self.headSnapshot()).forEach(function (p) {
        if (globMatch(pat, p) && !(p in self.work) && (p in self.index)) { delete self.index[p]; matched = true; }
      });
      if (!matched && pat.indexOf('*') === -1 && pat !== '.' && pat !== '-A' && pat !== '--all') return;
    });
    return true;
  };

  /* ---------- commit ---------- */
  Repo.prototype.commit = function (message) {
    this.requireInit();
    if (!message) throw new Error('Aborting commit due to empty commit message.');
    var base = this.headSnapshot();
    var stagedChange = keys(this.index).some(function (p) { return !same(this.index[p], base[p]); }, this) ||
      Object.keys(base).some(function (p) { return !(p in this.index); }, this);
    if (!stagedChange && !this.mergeState) throw new Error('nothing added to commit but untracked files present (use "git add" to track)');
    // simulated git hooks
    if (this.hooks && this.hooks.preCommit) {
      var pc = this.hooks.preCommit({ files: this.index, repo: this });
      if (pc && pc.ok === false) throw new Error(pc.message || 'pre-commit hook failed');
    }
    if (this.hooks && this.hooks.commitMsg) {
      var cm = this.hooks.commitMsg({ message: message, repo: this });
      if (cm && cm.ok === false) throw new Error(cm.message || 'commit-msg hook failed');
    }
    var parents = this.headSha() ? [this.headSha()] : [];
    if (this.mergeState) { parents = [this.mergeState.ours, this.mergeState.theirs]; }
    var files = copy(this.index);
    var isMerge = !!this.mergeState;
    var sha = this.newCommit(parents, files, message);
    this.mergeState = null; this.conflictPaths = [];
    this.setHead(sha, 'commit: ' + message);
    return { sha: sha, isMerge: isMerge, parents: parents };
  };

  /* ---------- log ---------- */
  Repo.prototype.log = function (opts) {
    opts = opts || {};
    var sha = this.headSha();
    if (!sha) return [];
    var out = [], seen = {}, stack = [sha];
    while (stack.length) {
      var s = stack.shift();
      if (!s || seen[s]) continue; seen[s] = 1;
      out.push(this.commits[s]);
      (this.mergeState ? [] : []).concat(this.commits[s].parents).forEach(function (p) { stack.push(p); });
    }
    out.sort(function (a, b) { return b.time - a.time; });
    return opts.limit ? out.slice(0, opts.limit) : out;
  };

  /* ---------- branch ---------- */
  Repo.prototype.createBranch = function (name, at) {
    if (this.branches[name]) throw new Error("fatal: a branch named '" + name + "' already exists");
    var sha = at ? this.resolve(at) : this.headSha();
    if (!sha) throw new Error('fatal: not a valid object name: ' + (at || 'HEAD'));
    this.branches[name] = sha;
    return sha;
  };
  Repo.prototype.deleteBranch = function (name, force) {
    if (name === this.head.name) throw new Error("error: Cannot delete branch '" + name + "' checked out at");
    if (!this.branches[name]) throw new Error("error: branch '" + name + "' not found.");
    if (!force && !this.isAncestor(this.branches[name], this.headSha())) throw new Error("error: The branch '" + name + "' is not fully merged.");
    delete this.branches[name];
    return true;
  };

  /* ---------- checkout / switch ---------- */
  Repo.prototype.checkout = function (args) {
    this.requireInit();
    var self = this;
    var create = args.indexOf('-b') !== -1 || args.indexOf('-B') !== -1 || args.indexOf('-c') !== -1;
    var rest = args.filter(function (a) { return ['-b', '-B', '-c', '--orphan'].indexOf(a) === -1; });
    if (create) {
      var name = rest[0], start = rest[1];
      if (!name) throw new Error('fatal: branch name required');
      this.createBranch(name, start);
      this.head = { type: 'branch', name: name };
      this.writeTreeToWork();
      return { message: "Switched to a new branch '" + name + "'" };
    }
    var target = rest[0];
    if (!target) throw new Error('fatal: you must specify a branch or commit');
    // branch, tag, sha
    if (this.branches[target]) {
      this.head = { type: 'branch', name: target };
      this.writeTreeToWork();
      var ab = this.aheadBehind();
      var extra = ab.behind ? "\nYour branch is behind 'origin/" + target + "' by " + GH.plural(ab.behind, 'commit') + '.' : '';
      return { message: "Switched to branch '" + target + "'" + extra };
    }
    var sha = this.resolve(target);
    if (sha) {
      this.head = { type: 'commit', sha: sha };
      this.writeTreeToWork();
      return { message: 'Note: switching to ' + "'" + sha.slice(0, 7) + "'.\nYou are in 'detached HEAD' state." };
    }
    // otherwise treat it as a path to restore
    if (target in this.headSnapshot() || target in this.work || target === '.') {
      var snap = this.headSnapshot();
      if (target === '.') { this.writeTreeToWork(); return { message: '' }; }
      if (snap[target] != null) this.work[target] = snap[target]; else delete this.work[target];
      return { message: '' };
    }
    throw new Error("error: pathspec '" + target + "' did not match any file(s) known to git");
  };
  Repo.prototype.writeTreeToWork = function () {
    var snap = this.headSnapshot();
    this.work = copy(snap);
    this.index = copy(snap);
    this.conflictPaths = [];
  };

  /* ---------- merge ---------- */
  Repo.prototype.merge = function (name) {
    this.requireInit();
    var theirs = this.branches[name] || this.resolve(name);
    if (!theirs) throw new Error("merge: " + name + " - not something we can merge");
    var ours = this.headSha();
    if (!ours) { var ff = this.head.type === 'branch' ? this.head.name : null; this.writeTreeToWork(); return { message: 'Fast-forward' }; }
    if (this.isAncestor(theirs, ours)) return { message: 'Already up to date.' };
    if (this.isAncestor(ours, theirs)) {
      this.setHead(theirs, 'merge ' + name + ': Fast-forward');
      this.writeTreeToWork();
      return { message: 'Updating ' + ours.slice(0, 7) + '..' + theirs.slice(0, 7) + '\nFast-forward' };
    }
    var base = this.lca(ours, theirs);
    var res = mergeTrees(base ? this.commits[base].files : {}, this.commits[ours].files, this.commits[theirs].files);
    this.index = copy(res.files);
    this.work = copy(res.files);
    if (res.conflicts.length) {
      this.conflictPaths = res.conflicts.slice();
      this.mergeState = { type: 'merge', ours: ours, theirs: theirs, name: name };
      return { message: 'Auto-merging\nCONFLICT (content): Merge conflict in ' + res.conflicts.join(', ') + '\nAutomatic merge failed; fix conflicts and then commit the result.', conflict: true };
    }
    var msg = "Merge branch '" + name + "'";
    var sha = this.newCommit([ours, theirs], res.files, msg);
    this.mergeState = null;
    this.setHead(sha, 'merge ' + name);
    return { message: 'Merge made by the ort strategy.', sha: sha };
  };

  /* ---------- rebase (linear) ---------- */
  Repo.prototype.rebase = function (onto) {
    this.requireInit();
    var target = this.branches[onto] || this.resolve(onto);
    if (!target) throw new Error("fatal: invalid upstream '" + onto + "'");
    var ours = this.headSha();
    var base = this.lca(ours, target);
    var chain = [], seen = {}, s = ours;
    while (s && s !== base) { chain.unshift(s); seen[s] = 1; s = this.commits[s].parents[0]; }
    if (!chain.length) return { message: 'Current branch is up to date.' };
    this.head.type === 'branch';
    var branchName = this.head.type === 'branch' ? this.head.name : null;
    if (branchName) this.branches[branchName] = target;
    this.work = copy(this.commits[target].files); this.index = copy(this.commits[target].files);
    var applied = 0, conflicts = [];
    for (var i = 0; i < chain.length; i++) {
      var c = this.commits[chain[i]];
      var parentFiles = c.parents[0] ? this.commits[c.parents[0]].files : {};
      var cur = this.headSnapshot();
      var res = mergeTrees(parentFiles, cur, c.files);
      if (res.conflicts.length) { conflicts = conflicts.concat(res.conflicts); this.conflictPaths = res.conflicts.slice(); this.work = copy(res.files); this.index = copy(res.files); this.mergeState = { type: 'rebase', ours: this.headSha(), theirs: c.sha, name: onto }; return { message: 'CONFLICT while rebasing ' + c.sha.slice(0, 7) + ' — resolve and continue.', conflict: true }; }
      var sha = this.newCommit([this.headSha()], res.files, c.message);
      this.setHead(sha, 'rebase commit: ' + c.message);
      applied++;
    }
    return { message: 'Successfully rebased and updated refs/heads/' + (branchName || 'HEAD') + '.' };
  };

  /* ---------- reset / revert / cherry-pick ---------- */
  Repo.prototype.reset = function (mode, ref) {
    this.requireInit();
    var sha = this.resolve(ref);
    if (!sha) throw new Error("fatal: ambiguous argument '" + ref + "'");
    if (this.head.type === 'branch') this.branches[this.head.name] = sha; else this.head.sha = sha;
    this.reflog.unshift({ sha: sha, action: 'reset (' + mode + ')', ref: this.headRefName(), time: this.clock++ });
    if (mode === 'hard') { this.writeTreeToWork(); }
    else if (mode === 'mixed') { this.index = copy(this.commits[sha].files); }
    // soft: leave index and work alone
    return { message: '' };
  };
  Repo.prototype.revert = function (ref) {
    this.requireInit();
    var sha = this.resolve(ref);
    if (!sha) throw new Error("fatal: bad revision '" + ref + "'");
    var c = this.commits[sha];
    var parentFiles = c.parents[0] ? this.commits[c.parents[0]].files : {};
    var cur = this.headSnapshot();
    var res = mergeTrees(c.files, cur, parentFiles);   // undo c's change
    if (res.conflicts.length) { this.conflictPaths = res.conflicts; this.work = copy(res.files); this.index = copy(res.files); this.mergeState = { type: 'revert', ours: this.headSha(), theirs: c.parents[0], name: 'revert' }; return { message: 'CONFLICT reverting ' + sha.slice(0, 7), conflict: true }; }
    var news = this.newCommit([this.headSha()], res.files, "Revert \"" + c.message + "\"");
    this.setHead(news, 'revert ' + sha.slice(0, 7));
    return { message: '[' + (this.headRefName()) + ' ' + news.slice(0, 7) + '] Revert "' + c.message + '"', sha: news };
  };
  Repo.prototype.cherryPick = function (ref) {
    this.requireInit();
    var sha = this.resolve(ref);
    if (!sha) throw new Error("fatal: bad revision '" + ref + "'");
    var c = this.commits[sha];
    var parentFiles = c.parents[0] ? this.commits[c.parents[0]].files : {};
    var res = mergeTrees(parentFiles, this.headSnapshot(), c.files);
    if (res.conflicts.length) { this.conflictPaths = res.conflicts; this.work = copy(res.files); this.index = copy(res.files); this.mergeState = { type: 'cherry-pick', ours: this.headSha(), theirs: sha, name: 'cherry-pick' }; return { message: 'CONFLICT cherry-picking ' + sha.slice(0, 7), conflict: true }; }
    var news = this.newCommit([this.headSha()], res.files, c.message);
    this.setHead(news, 'cherry-pick ' + sha.slice(0, 7));
    return { message: '[' + this.headRefName() + ' ' + news.slice(0, 7) + '] ' + c.message, sha: news };
  };

  /* ---------- tags ---------- */
  Repo.prototype.tag = function (name, opts) {
    opts = opts || {};
    var sha = opts.at ? this.resolve(opts.at) : this.headSha();
    if (!sha) throw new Error('fatal: Failed to resolve HEAD');
    this.tags[name] = opts.annotated ? { sha: sha, message: opts.message || name, tagger: this.config.name } : { sha: sha };
    return sha;
  };

  /* ---------- remotes ---------- */
  Repo.prototype.remoteAdd = function (name, url) { this.remote = { name: name, url: url, branches: {} }; };
  Repo.prototype.push = function (args) {
    this.requireInit();
    if (!this.remote) throw new Error("fatal: No configured push destination.");
    var setUpstream = args.indexOf('-u') !== -1 || args.indexOf('--set-upstream') !== -1;
    var rest = args.filter(function (a) { return a.charAt(0) !== '-'; });
    var remoteName = rest[0] || this.remote.name;
    var branch = rest[1] || (this.head.type === 'branch' ? this.head.name : null);
    if (!branch) throw new Error('fatal: The current branch has no upstream branch.');
    var local = this.branches[branch];
    if (!local) throw new Error("error: src refspec " + branch + " does not match any");
    var upKey = remoteName + '/' + branch;
    var up = this.remoteTracking[upKey];
    if (up && !this.isAncestor(up, local)) throw new Error('! [rejected] ' + branch + ' -> ' + branch + ' (non-fast-forward)\nerror: failed to push some refs');
    this.remote.branches[branch] = local;
    this.remoteTracking[upKey] = local;
    return { message: 'To ' + (this.remote.url || 'origin') + '\n   ' + (up ? up.slice(0, 7) + '..' : '* [new branch] ') + local.slice(0, 7) + '  ' + branch + ' -> ' + branch };
  };
  Repo.prototype.fetch = function (args) {
    if (!this.remote) throw new Error('fatal: no remote repository specified.');
    var remoteName = (args.filter(function (a) { return a.charAt(0) !== '-'; })[0]) || this.remote.name;
    var changed = 0;
    var self = this;
    Object.keys(this.remote.branches).forEach(function (b) {
      var key = remoteName + '/' + b;
      if (self.remoteTracking[key] !== self.remote.branches[b]) { self.remoteTracking[key] = self.remote.branches[b]; changed++; }
    });
    return { message: 'From ' + (this.remote.url || remoteName) + '\n   * [fetch] ' + remoteName + '/* -> ' + remoteName + '/*' };
  };
  Repo.prototype.pull = function (args) {
    var remoteName = (args.filter(function (a) { return a.charAt(0) !== '-'; })[0]) || (this.remote ? this.remote.name : 'origin');
    var branch = args.filter(function (a) { return a.charAt(0) !== '-'; })[1] || (this.head.type === 'branch' ? this.head.name : 'master');
    this.fetch([remoteName]);
    var key = remoteName + '/' + branch;
    var theirs = this.remoteTracking[key];
    if (!theirs) throw new Error("fatal: couldn't find remote ref " + branch);
    var ours = this.headSha();
    if (this.isAncestor(theirs, ours)) return { message: 'Already up to date.' };
    if (this.isAncestor(ours, theirs)) { this.setHead(theirs, 'pull: fast-forward'); this.writeTreeToWork(); return { message: 'Updating ' + ours.slice(0, 7) + '..' + theirs.slice(0, 7) + '\nFast-forward' }; }
    // merge
    var base = this.lca(ours, theirs);
    var res = mergeTrees(base ? this.commits[base].files : {}, this.commits[ours].files, this.commits[theirs].files);
    this.index = copy(res.files); this.work = copy(res.files);
    if (res.conflicts.length) { this.conflictPaths = res.conflicts.slice(); this.mergeState = { type: 'merge', ours: ours, theirs: theirs, name: 'origin/' + branch }; return { message: 'CONFLICT in ' + res.conflicts.join(', '), conflict: true }; }
    var sha = this.newCommit([ours, theirs], res.files, "Merge branch '" + branch + "' of " + (this.remote.url || remoteName));
    this.setHead(sha, 'pull: merge');
    return { message: 'Merge made by the ort strategy.', sha: sha };
  };
  Repo.prototype.clone = function (url) {
    var preset = GH.CLONE_PRESETS[url] || GH.CLONE_PRESETS['default'];
    this.initState();
    this.initialized = true;
    this.remote = { name: 'origin', url: url, branches: {} };
    var self = this;
    var shaMap = {};
    preset.branches.forEach(function (b) {
      // build linear history for each branch
    });
    // Build commits for each preset commit definition
    preset.commits.forEach(function (c) {
      var parents = (c.parents || []).map(function (p) { return shaMap[p] || p; });
      var raw = parents.join(',') + '|' + c.message + '|' + (self.clock++) + '|' + JSON.stringify(c.files);
      var sha = GH.sha7(raw);
      self.commits[sha] = { sha: sha, parents: parents, files: copy(c.files), message: c.message, time: self.clock, author: 'maintainer' };
      shaMap[c.id] = sha;
    });
    preset.branches.forEach(function (b) { var sha = shaMap[b.at]; self.branches[b.name] = sha; self.remote.branches[b.name] = sha; self.remoteTracking['origin/' + b.name] = sha; });
    self.head = { type: 'branch', name: preset.head || 'main' };
    self.work = copy(self.commits[self.branches[self.head.name]].files);
    self.index = copy(self.work);
    return { message: "Cloning into 'project'...\nremote: Enumerating objects: done.\nReceiving objects: 100% done." };
  };

  /* ---------- stash ---------- */
  Repo.prototype.stash = function (args) {
    if (args[0] === 'list') return { list: this.stashList };
    if (args[0] === 'pop' || args[0] === 'apply') {
      if (!this.stashList.length) throw new Error('No stash entries found.');
      var st = args[0] === 'pop' ? this.stashList.shift() : this.stashList[0];
      this.index = copy(st.index); this.work = copy(st.work);
      return { message: 'Restored working directory' + (args[0] === 'pop' ? ' and dropped the stash' : '') + '.' };
    }
    if (args[0] === 'drop') { if (this.stashList.length) this.stashList.shift(); return { message: 'Dropped refs/stash' }; }
    var msg = args.join(' ').replace(/^push\s*/, '') || 'WIP on ' + this.headRefName();
    this.stashList.unshift({ index: copy(this.index), work: copy(this.work), message: msg, branch: this.headRefName() });
    this.writeTreeToWork();
    return { message: 'Saved working directory and index state ' + msg };
  };

  /* ---------- misc commands ---------- */
  Repo.prototype.showRef = function (ref) {
    var sha = this.resolve(ref) || this.headSha();
    return sha ? this.commits[sha] : null;
  };
  Repo.prototype.rm = function (paths, cached) {
    var self = this;
    paths.forEach(function (p) {
      if (cached) { delete self.index[p]; }
      else { delete self.work[p]; delete self.index[p]; }
    });
    return true;
  };
  Repo.prototype.mv = function (from, to) {
    if (this.work[from] == null) throw new Error("fatal: bad source, source=" + from);
    this.work[to] = this.work[from]; delete this.work[from];
    if (this.index[from] != null) { this.index[to] = this.index[from]; delete this.index[from]; }
    return true;
  };
  Repo.prototype.clean = function () {
    var self = this, base = this.headSnapshot(), n = 0;
    Object.keys(this.work).forEach(function (p) { if (!(p in self.index) && !(p in base)) { delete self.work[p]; n++; } });
    return n;
  };
  Repo.prototype.submodule = function (args) {
    this.submodules = this.submodules || {};
    var sub = args[0];
    if (sub === 'add') {
      var url = args[1], path = args[2] || (url || '').split('/').pop().replace(/\.git$/, '');
      if (!url || !path) throw new Error('usage: git submodule add <url> <path>');
      this.submodules[path] = { url: url, sha: GH.sha7(url) };
      var gm = Object.keys(this.submodules).map(function (p) {
        return '[submodule "' + p + '"]\n\tpath = ' + p + '\n\turl = ' + this.submodules[p].url + '\n';
      }, this).join('');
      this.writeFile('.gitmodules', gm);
      // record the submodule as a gitlink entry
      this.index['.gitmodules'] = gm;
      this.index[path] = 'Subproject commit ' + this.submodules[path].sha;
      return { message: "Adding existing repo at '" + path + "' to the index" };
    }
    if (sub === 'status') {
      return { message: Object.keys(this.submodules).map(function (p) { return ' ' + (this.submodules[p].sha || '').slice(0, 7) + ' ' + p + ' (' + this.submodules[p].url + ')'; }, this).join('\n') || '(no submodules)' };
    }
    if (sub === 'update' || sub === 'init') return { message: 'Submodule path(s) initialised/updated' };
    return { message: '' };
  };
  Repo.prototype.diff = function (staged) {
    var base = this.headSnapshot();
    var out = [];
    if (staged) {
      keys(this.index).forEach(function (p) {
        if (!same(this.index[p], base[p])) { out.push('--- a/' + p + '\n+++ b/' + p); out = out.concat(linesDiff(base[p], this.index[p])); }
      }, this);
    } else {
      keys(this.index).forEach(function (p) {
        if (!same(this.index[p], this.work[p])) { out.push('--- a/' + p + '\n+++ b/' + p); out = out.concat(linesDiff(this.index[p], this.work[p])); }
      }, this);
    }
    return out;
  };

  /* ============================================================ */
  /* COMMAND INTERPRETER                                           */
  /* ============================================================ */
  function tokenize(line) {
    var toks = [], re = /"([^"]*)"|'([^']*)'|(\S+)/g, m;
    while ((m = re.exec(line)) !== null) toks.push(m[1] != null ? m[1] : m[2] != null ? m[2] : m[3]);
    return toks;
  }
  GH.tokenize = tokenize;

  Repo.prototype.run = function (line) {
    line = String(line || '').trim();
    if (!line) return { out: '' };
    var toks = tokenize(line);
    var self = this;
    var cmd = toks[0] === 'git' ? toks[1] : toks[0];
    var rest = toks.slice(toks[0] === 'git' ? 2 : 1);
    try {
      switch (cmd) {
        case 'init': {
          this.initialized = true;
          if (!Object.keys(this.branches).length) this.branches[this.head.name] = null, delete this.branches[this.head.name];
          return { out: 'Initialized empty Git repository in /project/.git/' };
        }
        case 'status': return { out: this.statusText() };
        case 'add': {
          this.requireInit();
          if (!rest.length) throw new Error('Nothing specified, nothing added.');
          this.add(rest);
          return { out: '' };
        }
        case 'commit': {
          var mIdx = rest.indexOf('-m');
          var msg = mIdx !== -1 ? rest[mIdx + 1] : null;
          var all = rest.indexOf('-a') !== -1 || rest.indexOf('-am') !== -1 || rest.indexOf('-all') !== -1;
          var amend = rest.indexOf('--amend') !== -1;
          if (mIdx === -1 && rest.indexOf('-am') !== -1) { var ai = rest.indexOf('-am'); msg = rest[ai + 1]; all = true; }
          if (mIdx === -1 && rest.indexOf('-a') !== -1) { var ai2 = rest.indexOf('-a'); if (rest[ai2 + 1]) msg = rest[ai2 + 1]; }
          if (all) { var self2 = this; keys(this.work).forEach(function (p) { if (p in self2.headSnapshot()) self2.index[p] = self2.work[p]; }); }
          if (msg == null && this.mergeState === null && !amend) throw new Error('Aborting commit due to empty commit message.');
          if (amend) {
            // replace the tip commit: same parents, new message, index as the tree
            var tip = this.headSha();
            if (!tip) throw new Error('nothing to amend (no commits yet)');
            var old = this.commits[tip];
            var filesA = keys(this.index).length ? copy(this.index) : copy(old.files);
            var newMsg = msg != null ? msg : old.message;
            if (this.hooks && this.hooks.commitMsg) {
              var cmA = this.hooks.commitMsg({ message: newMsg, repo: this });
              if (cmA && cmA.ok === false) throw new Error(cmA.message || 'commit-msg hook failed');
            }
            var shaA = this.newCommit(old.parents, filesA, newMsg);
            this.setHead(shaA, 'commit (amend): ' + newMsg);
            this.index = copy(filesA);
            return { out: '[' + (this.head.type === 'branch' ? this.head.name : 'detached HEAD') + ' ' + shaA.slice(0, 7) + '] ' + newMsg + ' (amended)' };
          }
          var r = this.commit(msg || (this.mergeState ? 'Merged' : ''));
          var headName = this.head.type === 'branch' ? this.head.name : 'detached HEAD';
          return { out: '[' + headName + ' ' + r.sha.slice(0, 7) + (this.headSha() === r.sha && this.commits[r.sha].parents.length === 0 ? ' (root-commit)' : '') + '] ' + (msg || 'Merged') + '\n ' + Object.keys(this.commits[r.sha].files).length + ' file(s) changed' };
        }
        case 'log': return { out: this.logText(rest) };
        case 'diff': return { out: this.diff(rest.indexOf('--staged') !== -1 || rest.indexOf('--cached') !== -1).join('\n') || '(no changes)' };
        case 'branch': return { out: this.branchText(rest) };
        case 'checkout': case 'switch': { var o = this.checkout(rest); return { out: o.message }; }
        case 'restore': {
          this.requireInit();
          var stagedR = rest.indexOf('--staged') !== -1 || rest.indexOf('--cached') !== -1;
          var pathsR = rest.filter(function (a) { return a.charAt(0) !== '-'; });
          var snapR = this.headSnapshot();
          pathsR.forEach(function (p) {
            if (stagedR) { if (snapR[p] != null) self.index[p] = snapR[p]; else delete self.index[p]; }
            else if (self.index[p] != null) self.work[p] = self.index[p];
            else if (snapR[p] != null) self.work[p] = snapR[p];
            else delete self.work[p];
          });
          return { out: '' };
        }
        case 'merge': { var o2 = this.merge(rest[0]); return { out: o2.message, conflict: o2.conflict }; }
        case 'rebase': { var o3 = this.rebase(rest.filter(function (a) { return a.charAt(0) !== '-'; })[0]); return { out: o3.message, conflict: o3.conflict }; }
        case 'reset': { var mode = rest.indexOf('--hard') !== -1 ? 'hard' : rest.indexOf('--soft') !== -1 ? 'soft' : 'mixed'; var ref = rest.filter(function (a) { return a.charAt(0) !== '-'; })[0]; var o4 = this.reset(mode, ref); return { out: 'HEAD is now at ' + (this.headSha() || '').slice(0, 7) }; }
        case 'revert': { var o5 = this.revert(rest[0]); return { out: o5.message, conflict: o5.conflict }; }
        case 'cherry-pick': { var o6 = this.cherryPick(rest[0]); return { out: o6.message, conflict: o6.conflict }; }
        case 'tag': return { out: this.tagText(rest) };
        case 'remote': return { out: this.remoteText(rest) };
        case 'push': { var o7 = this.push(rest); return { out: o7.message }; }
        case 'fetch': { var o8 = this.fetch(rest); return { out: o8.message }; }
        case 'pull': { var o9 = this.pull(rest); return { out: o9.message, conflict: o9.conflict }; }
        case 'clone': { var o10 = this.clone(rest[0]); return { out: o10.message }; }
        case 'stash': { var o11 = this.stash(rest); return { out: o11.list ? this.stashText(o11.list) : o11.message }; }
        case 'reflog': return { out: this.reflogText() };
        case 'rm': { this.rm(rest.filter(function (a) { return a.charAt(0) !== '-'; }), rest.indexOf('--cached') !== -1); return { out: '' }; }
        case 'submodule': { var osub = this.submodule(rest); return { out: osub.message }; }
        case 'mv': { this.mv(rest[0], rest[1]); return { out: '' }; }
        case 'clean': { var n = this.clean(); return { out: 'Removed ' + GH.plural(n, 'untracked file') }; }
        case 'config': return { out: this.configText(rest) };
        case 'show': return { out: this.showText(rest[0]) };
        case 'blame': return { out: this.blameText(rest.filter(function (a) { return a.charAt(0) !== '-'; })[0]) };
        case 'help': return { out: 'GitCI/CD Hero supports: init status add commit (--amend) log diff branch checkout switch merge rebase reset revert cherry-pick tag remote push fetch pull clone stash reflog rm mv clean show blame config' };
        default: return { out: "git: '" + cmd + "' is not supported in this sandbox (or not a git command).", err: true };
      }
    } catch (e) {
      return { out: e.message || String(e), err: true };
    }
  };

  /* ---------- text renderers ---------- */
  Repo.prototype.statusText = function () {
    this.requireInit();
    var s = this.status();
    var L = [];
    L.push('On branch ' + s.branch);
    if (s.ahead) L.push("Your branch is ahead of 'origin' by " + GH.plural(s.ahead, 'commit') + '.');
    if (s.behind) L.push("Your branch is behind 'origin' by " + GH.plural(s.behind, 'commit') + '.');
    if (s.merging) L.push('You have unmerged paths. (fix conflicts and run "git commit")');
    if (!s.hasCommits) L.push('\nNo commits yet');
    L.push('');
    if (s.conflicts.length) {
      L.push('Unmerged paths:');
      s.conflicts.forEach(function (p) { L.push('        both modified:   ' + p); });
      L.push('');
    }
    if (s.staged.length) {
      L.push('Changes to be committed:');
      s.staged.forEach(function (x) { L.push('        ' + x.state + ':   ' + x.path); });
      L.push('');
    }
    if (s.unstaged.length) {
      L.push('Changes not staged for commit:');
      s.unstaged.forEach(function (x) { L.push('        ' + x.state + ':   ' + x.path); });
      L.push('');
    }
    if (s.untracked.length) {
      L.push('Untracked files:');
      s.untracked.forEach(function (p) { L.push('        ' + p); });
      L.push('');
    }
    if (s.clean && !s.merging) L.push('nothing to commit, working tree clean');
    return L.join('\n');
  };
  Repo.prototype.logText = function (args) {
    this.requireInit();
    var oneline = args.indexOf('--oneline') !== -1;
    var limit = null; var nIdx = args.indexOf('-n'); if (nIdx !== -1) limit = parseInt(args[nIdx + 1], 10);
    var commits = this.log({ limit: limit });
    if (!commits.length) return 'fatal: your current branch does not have any commits yet';
    var self = this;
    if (oneline) return commits.map(function (c) {
      var dec = self.refDecorations(c.sha).map(function (d) { return d.label; }).join(', ');
      return c.sha.slice(0, 7) + (dec ? ' (' + dec + ')' : '') + ' ' + c.message;
    }).join('\n');
    return commits.map(function (c) {
      var dec = self.refDecorations(c.sha);
      return 'commit ' + c.sha + ' (' + (dec.length ? dec.map(function (d) { return d.label; }).join(', ') : 'HEAD') + ')\nAuthor: ' + c.author + ' <' + self.config.email + '>\nDate:   ' + new Date(1700000000000 + c.time * 1000).toUTCString() + '\n\n    ' + c.message + '\n';
    }).join('\n');
  };
  Repo.prototype.branchText = function (args) {
    this.requireInit();
    var verbose = args.indexOf('-v') !== -1 || args.indexOf('-a') !== -1;
    if (args.indexOf('-d') !== -1 || args.indexOf('-D') !== -1) { var nm = args[args.indexOf('-d') !== -1 ? args.indexOf('-d') + 1 : args.indexOf('-D') + 1]; this.deleteBranch(nm, args.indexOf('-D') !== -1); return "Deleted branch " + nm; }
    var nameArg = args.filter(function (a) { return a.charAt(0) !== '-'; })[0];
    if (nameArg) { this.createBranch(nameArg); return ''; }
    var self = this;
    var lines = Object.keys(this.branches).sort().map(function (b) {
      var cur = self.head.type === 'branch' && self.head.name === b;
      return (cur ? '* ' : '  ') + b + (verbose ? ' ' + (self.branches[b] || '').slice(0, 7) + ' ' + (self.branches[b] ? self.commits[self.branches[b]].message : '') : '');
    });
    if (args.indexOf('-a') !== -1 || args.indexOf('-r') !== -1) Object.keys(this.remoteTracking).forEach(function (r) { lines.push('  remotes/' + r); });
    return lines.join('\n');
  };
  Repo.prototype.tagText = function (args) {
    if (args[0] === '-a') { var name = args[1], mi = args.indexOf('-m'); this.tag(name, { annotated: true, message: mi !== -1 ? args[mi + 1] : name }); return ''; }
    if (args[0] === '-l' || !args.length) return Object.keys(this.tags).sort().map(function (t) { return t; }).join('\n');
    this.tag(args[0]);
    return '';
  };
  Repo.prototype.remoteText = function (args) {
    if (args[0] === '-v') { return this.remote ? this.remote.name + '\t' + this.remote.url + ' (fetch)\n' + this.remote.name + '\t' + this.remote.url + ' (push)' : ''; }
    if (args[0] === 'add') { this.remoteAdd(args[1], args[2]); return ''; }
    if (args[0] === 'remove' || args[0] === 'rm') { this.remote = null; return ''; }
    return this.remote ? this.remote.name : '';
  };
  Repo.prototype.stashText = function (list) {
    if (!list.length) return '(no stash entries)';
    return list.map(function (s, i) { return 'stash@{' + i + '}: ' + s.message; }).join('\n');
  };
  Repo.prototype.reflogText = function () {
    return this.reflog.slice(0, 15).map(function (r, i) { return (r.sha || '').slice(0, 7) + ' HEAD@{' + i + '}: ' + r.action + ' (' + r.ref + ')'; }).join('\n') || '(reflog empty)';
  };
  Repo.prototype.configText = function (args) {
    if (args[0] === 'user.name' && args[1]) { this.config.name = args[1]; return ''; }
    if (args[0] === 'user.email' && args[1]) { this.config.email = args[1]; return ''; }
    if (args[0] === 'user.name') return this.config.name;
    if (args[0] === 'user.email') return this.config.email;
    return '';
  };
  Repo.prototype.showText = function (ref) {
    var sha = this.resolve(ref || 'HEAD') || this.headSha();
    if (!sha) return 'fatal: bad revision';
    var c = this.commits[sha];
    var parentFiles = c.parents[0] ? this.commits[c.parents[0]].files : {};
    var lines = ['commit ' + c.sha, 'Author: ' + c.author, '', '    ' + c.message, ''];
    keys(c.files).forEach(function (p) {
      if (parentFiles[p] !== c.files[p]) { lines.push('diff --git a/' + p + ' b/' + p); lines = lines.concat(linesDiff(parentFiles[p], c.files[p])); }
    });
    return lines.join('\n');
  };
  /* git blame <file> — attribute each line of the file to the commit that last
     changed it (the commit where the line was introduced relative to history). */
  Repo.prototype.blameText = function (path) {
    this.requireInit();
    if (!path) return 'usage: git blame <file>';
    var content = this.headSnapshot()[path];
    if (content == null && this.work[path] != null) content = this.work[path];
    if (content == null) return 'fatal: no such path \'' + path + '\' in HEAD';
    var fileLines = String(content).split('\n');
    var self = this;
    // collect commits reachable from HEAD, newest first
    var reach = [], seen = {}, stack = [this.headSha()];
    while (stack.length) {
      var s0 = stack.pop();
      if (!s0 || seen[s0]) continue;
      seen[s0] = 1;
      if (this.commits[s0]) { reach.push(this.commits[s0]); (this.commits[s0].parents || []).forEach(function (p) { stack.push(p); }); }
    }
    reach.sort(function (a, b) { return b.time - a.time; });
    var blame = {};
    reach.forEach(function (c) {
      var snap = c.files[path];
      if (snap == null) return;
      var mine = String(snap).split('\n');
      var parentSnap = c.parents[0] && self.commits[c.parents[0]] ? self.commits[c.parents[0]].files[path] : null;
      var parentLines = parentSnap == null ? [] : String(parentSnap).split('\n');
      // lines present here but NOT in the parent were introduced by this commit
      mine.forEach(function (ln) {
        if (!(ln in blame) && parentLines.indexOf(ln) === -1) blame[ln] = c;
      });
    });
    // anything still unattributed (e.g. identical lines everywhere) goes to the root
    var rootC = reach.length ? reach[reach.length - 1] : null;
    var out = fileLines.map(function (ln, i) {
      var c = blame[ln] || rootC;
      return (c ? c.sha.slice(0, 7) : '0000000') + ' (' + (c ? c.author : '?') + ' ' + (c ? c.message.slice(0, 22) : '?') + ') ' + (i + 1) + ') ' + ln;
    });
    return out.join('\n');
  };

  /* ---------- graph snapshot ---------- */
  Repo.prototype.snapshot = function () {
    var commits = this.log();
    var self = this;
    // lane assignment (swimlane)
    var lanes = [], assigned = {};
    commits.forEach(function (c) {
      var idx = lanes.indexOf(c.sha);
      if (idx === -1) { idx = lanes.length; lanes.push(c.sha); }
      assigned[c.sha] = idx;
      lanes[idx] = c.parents[0] || null;
      for (var i = 1; i < c.parents.length; i++) { if (lanes.indexOf(c.parents[i]) === -1) lanes.splice(idx + 1, 0, c.parents[i]); }
      for (var k = 0; k < lanes.length; k++) if (lanes[k] === null && k !== idx && assigned[lanes[k]] == null) { /* keep */ }
      lanes = lanes.filter(function (s, i) { return i === 0 || s !== null || lanes.indexOf(s) === i; });
    });
    return {
      commits: commits.map(function (c) { return { sha: c.sha, parents: c.parents, message: c.message, lane: assigned[c.sha] || 0, deco: self.refDecorations(c.sha), time: c.time }; }),
      head: this.headSha(), branch: this.headRefName(), initialized: this.initialized
    };
  };

  GH.Repo = Repo;
  GH.newRepo = function () { return new Repo(); };
  GH.Git = new Repo();

  /* ---------- clone presets ---------- */
  GH.CLONE_PRESETS = {
    default: {
      head: 'main',
      commits: [
        { id: 'c1', parents: [], message: 'Initial commit', files: { 'README.md': '# Project\n' } },
        { id: 'c2', parents: ['c1'], message: 'Add app', files: { 'README.md': '# Project\n', 'app.js': 'console.log("hi")\n' } },
        { id: 'c3', parents: ['c2'], message: 'Add tests', files: { 'README.md': '# Project\n', 'app.js': 'console.log("hi")\n', 'app.test.js': 'test()\n' } }
      ],
      branches: [{ name: 'main', at: 'c3' }]
    },
    'https://github.com/team/project.git': {
      head: 'main',
      commits: [
        { id: 'c1', parents: [], message: 'chore: initial commit', files: { 'README.md': '# Team Project\n', '.gitignore': 'node_modules\n' } },
        { id: 'c2', parents: ['c1'], message: 'feat: add API client', files: { 'README.md': '# Team Project\n', '.gitignore': 'node_modules\n', 'src/api.js': 'export function get() {}\n' } },
        { id: 'c3', parents: ['c2'], message: 'test: cover api client', files: { 'README.md': '# Team Project\n', '.gitignore': 'node_modules\n', 'src/api.js': 'export function get() {}\n', 'src/api.test.js': 'describe("get")\n' } },
        { id: 'c4', parents: ['c3'], message: 'ci: add workflow', files: { 'README.md': '# Team Project\n', '.gitignore': 'node_modules\n', 'src/api.js': 'export function get() {}\n', 'src/api.test.js': 'describe("get")\n', '.github/workflows/ci.yml': 'name: CI\non: [push]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm test\n' } }
      ],
      branches: [{ name: 'main', at: 'c4' }]
    }
  };
})(window.GH);
