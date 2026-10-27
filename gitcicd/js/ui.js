/* ============================================================
   GitCI/CD Hero - ui.js
   Router + all views: dashboard, tracks, chapter (lesson +
   mission), git terminal workspace, CI workflow workspace,
   sandboxes, cheat sheet, badges, settings.
   ============================================================ */
(function (GH) {
  'use strict';

  var App = GH.App = {};
  var root, viewEl;
  var ws = null;   // active workspace state

  /* ============================================================ */
  /* boot                                                          */
  /* ============================================================ */
  App.boot = function () {
    GH.load();
    root = GH.qs('#app');
    root.innerHTML =
      '<header class="topbar">' +
        '<div class="brand" id="brand"><span class="logo">&#9906;</span><b>GitCI/CD&nbsp;Hero</b></div>' +
        '<div class="hud" id="hud"></div>' +
      '</header>' +
      '<main id="view" class="view"></main>' +
      '<div id="toasts" class="toasts"></div>';
    viewEl = GH.qs('#view');
    GH.qs('#brand').addEventListener('click', function () { App.go('#/home'); });
    window.addEventListener('hashchange', App.route);
    App.route();
  };

  App.route = function () {
    var h = location.hash || '#/home';
    renderHUD();
    if (h.indexOf('#/chapter/') === 0) return App.viewChapter(h.slice(10));
    if (h.indexOf('#/track/') === 0) return App.viewTrack(h.slice(8));
    if (h === '#/tracks') return App.viewTracks();
    if (h === '#/capstone') return App.viewCapstone();
    if (h === '#/sandbox') return App.viewSandbox();
    if (h === '#/ci') return App.viewCiSandbox();
    if (h === '#/cheatsheet') return App.viewCheatsheet();
    if (h === '#/badges') return App.viewBadges();
    if (h === '#/settings') return App.viewSettings();
    return App.viewHome();
  };
  App.go = function (h) { if (location.hash === h) App.route(); else location.hash = h; window.scrollTo(0, 0); };

  /* ============================================================ */
  /* HUD                                                           */
  /* ============================================================ */
  function renderHUD() {
    var lp = GH.levelProgress(GH.state.xp);
    var hud = GH.qs('#hud');
    var doneCh = 0, totalCh = GH.totalChapters();
    GH.TRACKS.forEach(function (t) { doneCh += GH.trackProgress(t).done; });
    hud.innerHTML =
      '<div class="hud-item level" title="' + GH.esc(GH.titleFor(lp.level)) + '">' +
        '<span class="lv">Lv ' + lp.level + '</span>' +
        '<div class="xpbar"><i style="width:' + lp.pct + '%"></i></div>' +
        '<span class="xptext">' + lp.into + '/' + lp.span + ' XP</span>' +
      '</div>' +
      '<div class="hud-item">&#128293; <b>' + GH.state.streak.count + '</b></div>' +
      '<div class="hud-item">&#9989; <b>' + doneCh + '/' + totalCh + '</b></div>' +
      '<nav class="hud-nav">' +
        '<a href="#/home">Home</a><a href="#/tracks">Tracks</a><a href="#/sandbox">Git sandbox</a>' +
        '<a href="#/ci">CI sandbox</a><a href="#/capstone">Capstone</a><a href="#/cheatsheet">Cheatsheet</a><a href="#/badges">Badges</a>' +
      '</nav>';
  }

  function celebrate(levelUp, level, badges) {
    if (levelUp) GH.toast('&#11014; Level up! You are now level <b>' + level + '</b> &mdash; ' + GH.titleFor(level), 'good');
    (badges || []).forEach(function (b) { setTimeout(function () { GH.toast(b.icon + ' Badge: <b>' + b.name + '</b><br><small>' + b.desc + '</small>', 'badge'); }, 200); });
  }

  /* ============================================================ */
  /* HOME                                                          */
  /* ============================================================ */
  App.viewHome = function () {
    var lp = GH.levelProgress(GH.state.xp);
    var totalCh = GH.totalChapters(), doneCh = 0;
    GH.TRACKS.forEach(function (t) { doneCh += GH.trackProgress(t).done; });
    var pct = Math.round((doneCh / totalCh) * 100);
    var next = nextChapter();

    viewEl.innerHTML =
      '<section class="hero">' +
        '<div class="hero-main">' +
          '<p class="eyebrow">Zero to hero &middot; Git &rarr; CI/CD &rarr; DevSecOps</p>' +
          '<h1>' + GH.titleFor(lp.level) + '</h1>' +
          '<p class="muted">Level ' + lp.level + ' &middot; ' + GH.state.xp.toLocaleString('en-US') + ' XP &middot; ' +
            doneCh + '/' + totalCh + ' chapters complete &middot; ' + Object.keys(GH.state.badges).length + ' badges</p>' +
          '<div class="hero-actions">' +
            (next ? '<button class="btn primary big" id="btn-next">&#9654; Continue: ' + GH.esc(next.title) + '</button>' : '') +
            '<button class="btn big" id="btn-tracks">&#128218; All tracks</button>' +
            '<button class="btn" id="btn-sandbox">&#128421; Git sandbox</button>' +
            '<button class="btn" id="btn-ci">&#9881; CI playground</button>' +
            '<button class="btn" id="btn-capstone">&#127942; Capstone</button>' +
          '</div>' +
        '</div>' +
        '<div class="hero-side">' +
          '<div class="ring-wrap">' + ring(pct) + '<div class="ring-label"><b>' + pct + '%</b><small>complete</small></div></div>' +
          '<div class="mini-stats"><div><b>' + GH.state.streak.count + '</b><small>streak</small></div>' +
            '<div><b>' + doneCh + '</b><small>chapters</small></div>' +
            '<div><b>' + GH.state.streak.best + '</b><small>best</small></div></div>' +
        '</div>' +
      '</section>' +
      '<section class="section"><div class="section-head"><h2>Your tracks</h2><a href="#/tracks">open all &rarr;</a></div>' +
        '<div class="track-strip">' + GH.TRACKS.map(trackCard).join('') + '</div></section>' +
      '<section class="section"><div class="section-head"><h2>Recent activity</h2></div>' +
        (GH.state.log.length ? '<ul class="activity">' + GH.state.log.slice(0, 8).map(function (l) {
          return '<li><span class="xp-plus">+' + l.xp + ' XP</span> <span class="muted">' + GH.esc(l.reason) + '</span></li>'; }).join('') + '</ul>'
          : '<p class="muted">Nothing yet &mdash; open a track and start learning.</p>') +
      '</section>';

    if (next) GH.qs('#btn-next').onclick = function () { App.go('#/chapter/' + next.id); };
    GH.qs('#btn-tracks').onclick = function () { App.go('#/tracks'); };
    GH.qs('#btn-sandbox').onclick = function () { App.go('#/sandbox'); };
    GH.qs('#btn-ci').onclick = function () { App.go('#/ci'); };
    GH.qs('#btn-capstone').onclick = function () { App.go('#/capstone'); };
    bindTrackCards();
  };

  function ring(pct) {
    var size = 96, r = (size - 8) / 2, c = 2 * Math.PI * r, off = c * (1 - GH.clamp(pct, 0, 100) / 100);
    return '<svg class="ring" width="' + size + '" height="' + size + '">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke="rgba(255,255,255,.12)" stroke-width="6" fill="none"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke="url(#grad)" stroke-width="6" fill="none" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + off + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/></svg>';
  }
  function defs() { return '<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#38bdf8"/><stop offset="1" stop-color="#a855f7"/></linearGradient></defs></svg>'; }

  function trackCard(t) {
    var p = GH.trackProgress(t);
    return '<button class="track-card" data-track="' + t.id + '" style="--c:' + t.color + '">' +
      '<div class="tc-icon">' + t.icon + '</div><div class="tc-body"><b>' + t.name + '</b>' +
      '<small>' + t.blurb + '</small><div class="bar"><i style="width:' + p.pct + '%"></i></div>' +
      '<small class="muted">' + p.done + '/' + p.total + ' chapters</small></div></button>';
  }
  function bindTrackCards() {
    GH.qsa('.track-card').forEach(function (b) { b.onclick = function () { App.go('#/track/' + b.dataset.track); }; });
  }

  function nextChapter() {
    for (var i = 0; i < GH.TRACKS.length; i++) {
      var t = GH.TRACKS[i];
      for (var j = 0; j < t.chapters.length; j++) {
        var c = t.chapters[j];
        if (!GH.lessonDone(c.id) || (c.mission && !GH.missionDone(c.mission.id))) return c;
      }
    }
    return null;
  }

  /* ============================================================ */
  /* TRACKS / TRACK                                                */
  /* ============================================================ */
  App.viewTracks = function () {
    viewEl.innerHTML = defs() + '<section class="section"><div class="section-head"><h2>All tracks</h2></div>' +
      '<div class="track-strip big">' + GH.TRACKS.map(trackCard).join('') + '</div></section>';
    bindTrackCards();
  };

  App.viewTrack = function (id) {
    var t = GH.trackById(id);
    if (!t) return App.viewTracks();
    var p = GH.trackProgress(t);
    viewEl.innerHTML =
      '<section class="section"><a class="back" href="#/tracks">&larr; all tracks</a>' +
      '<div class="track-head" style="--c:' + t.color + '"><div class="tc-icon big">' + t.icon + '</div>' +
        '<div><h1>' + t.name + '</h1><p class="muted">' + t.blurb + '</p></div>' +
        '<div class="track-score">' + p.pct + '%<small>' + p.done + '/' + p.total + '</small></div></div>' +
      '<div class="chapter-list">' + t.chapters.map(function (c, i) {
        var ld = GH.lessonDone(c.id), md = !c.mission || GH.missionDone(c.mission.id);
        var complete = ld && md;
        return '<div class="chapter-row' + (complete ? ' done' : '') + '" data-ch="' + c.id + '">' +
          '<div class="cr-num">' + (i + 1) + '</div>' +
          '<div class="cr-body"><b>' + c.title + '</b><small class="muted">' + (c.mission ? missionKindLabel(c.mission) : 'lesson only') + '</small></div>' +
          '<div class="cr-badges">' + (ld ? '<span class="chip ok">&#128214; lesson</span>' : '<span class="chip">lesson</span>') +
            (c.mission ? (md ? '<span class="chip ok">&#10003; mission</span>' : '<span class="chip hot">mission</span>') : '') + '</div>' +
          '<div class="cr-go">&rarr;</div></div>';
      }).join('') + '</div></section>';
    GH.qsa('.chapter-row').forEach(function (r) { r.onclick = function () { App.go('#/chapter/' + r.dataset.ch); }; });
  };

  function missionKindLabel(m) {
    return m.kind === 'quiz' ? 'quiz' : m.kind === 'ci' ? 'CI/CD mission' : 'Git mission';
  }

  /* ============================================================ */
  /* CHAPTER (lesson + mission)                                    */
  /* ============================================================ */
  App.viewChapter = function (id) {
    var c = GH.chapterById(id);
    if (!c) return App.go('#/home');
    var t = GH.trackOfChapter(id) || { color: '#38bdf8', name: '' };
    var vizzes = [];
    var html = defs() +
      '<section class="chapter">' +
        '<a class="back" href="#/track/' + (t.id || '') + '">&larr; ' + GH.esc(t.name) + '</a>' +
        '<div class="chapter-hero" style="--c:' + t.color + '">' +
          '<span class="lesson-tag">Chapter</span><h1>' + c.title + '</h1>' +
          (c.lesson.hook ? '<p class="lesson-hook">' + GH.m(c.lesson.hook) + '</p>' : '') +
          '<div class="lesson-meta">' + (GH.lessonDone(c.id) ? '<span class="chip ok">&#128214; lesson read</span>' : '<span class="chip">lesson</span>') +
            (c.mission ? (GH.missionDone(c.mission.id) ? '<span class="chip ok">&#10003; mission complete</span>' : '<span class="chip hot">' + missionKindLabel(c.mission) + ' to do</span>') : '') +
          '</div>' +
        '</div>' +
        '<div class="lesson-body">' + (c.lesson.blocks || []).map(function (b) { return renderBlock(b, vizzes); }).join('') + '</div>' +
        '<div class="lesson-actions">' +
          '<button class="btn ' + (GH.lessonDone(c.id) ? '' : 'primary') + '" id="les-done">' + (GH.lessonDone(c.id) ? '&#10003; Lesson read' : '&#10003; Mark lesson read') + '</button>' +
          (c.mission ? '<button class="btn primary big" id="do-mission">&#9654; ' + (GH.missionDone(c.mission.id) ? 'Replay ' : 'Start ') + missionKindLabel(c.mission) + '</button>' : '') +
          '<a class="btn ghost" href="#/track/' + (t.id || '') + '">Back to track</a>' +
        '</div>' +
        (c.mission ? '<div id="missionzone"></div>' : '') +
      '</section>';
    viewEl.innerHTML = html;
    mountVizzes(vizzes);

    GH.qs('#les-done').onclick = function () {
      GH.markLesson(c.id);
      var b = GH.checkBadges();
      GH.toast('&#128214; Lesson marked read. +10 XP', 'good');
      celebrate(false, 0, b);
      App.viewChapter(id);
    };
    var dm = GH.qs('#do-mission');
    if (dm) dm.onclick = function () { App.renderMission(GH.qs('#missionzone'), c); };
  };

  function renderBlock(b, vizzes) {
    var t = b[0], v = b[1];
    switch (t) {
      case 'p': return '<p>' + GH.m(v) + '</p>';
      case 'code': return GH.code(v, 'codeblock');
      case 'yaml': return GH.code(v, 'yamlblock');
      case 'dockerfile': return GH.code(v, 'dockerblock');
      case 'list': return '<ul class="lesson-list">' + v.map(function (x) { return '<li>' + GH.m(x) + '</li>'; }).join('') + '</ul>';
      case 'note': return '<div class="callout note">' + GH.m(v) + '</div>';
      case 'warn': return '<div class="callout warn">&#9888;&#65039; ' + GH.m(v) + '</div>';
      case 'tip': return '<div class="callout tip">&#128161; ' + GH.m(v) + '</div>';
      case 'table': return '<div class="tablewrap"><table class="lesson-table"><thead><tr>' + v.head.map(function (h) { return '<th>' + GH.m(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        v.rows.map(function (r) { return '<tr>' + r.map(function (x) { return '<td>' + GH.m(x) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
      case 'term': return '<div class="term-snippet"><div class="term-cmd">$ ' + GH.esc(v[0]) + '</div><pre class="term-out">' + GH.colorize(v[1]) + '</pre></div>';
      case 'ex': return '<div class="example"><div class="ex-q"><span class="ex-tag">Walkthrough</span> ' + GH.m(v.q) + '</div>' +
        (v.steps ? '<ol class="steps">' + v.steps.map(function (s) { return '<li>' + GH.m(s) + '</li>'; }).join('') + '</ol>' : '') +
        '<div class="ex-a">' + GH.m(v.a || '') + '</div></div>';
      case 'viz':
        vizzes.push({ name: v, opts: b[2] || {} });
        return '<div class="viz-host" data-viz-idx="' + (vizzes.length - 1) + '"><div class="viz-loading">loading&hellip;</div></div>';
      default: return '';
    }
  }
  function mountVizzes(vizzes) {
    GH.qsa('.viz-host', viewEl).forEach(function (el) {
      var v = vizzes[+el.dataset.vizIdx];
      if (!v) return;
      if (v.name === 'states') GH.renderStates(el);
      else if (v.name === 'flow') GH.renderFlow(el);
      else if (v.name === 'graph') GH.renderGitGraph(el, GH.Git);
      else if (v.name === 'pipeline') {
        var run = GH.runWorkflow(GH.parseYaml(GH.WORKFLOW_TEMPLATES.buildtest), { event: 'push', branch: 'main', files: { 'package.json': '{"name":"app","scripts":{"build":"webpack","test":"jest"}}', 'src/app.test.js': 'test("ok",()=>{})' } });
        GH.renderPipeline(el, run);
      }
    });
  }

  /* ============================================================ */
  /* MISSION RUNNER                                                */
  /* ============================================================ */
  App.renderMission = function (zone, chapter) {
    var m = chapter.mission;
    if (!zone || !m) return;
    if (m.kind === 'quiz') return renderQuiz(zone, chapter, m);
    if (m.kind === 'ci') return renderCiMission(zone, chapter, m);
    return renderGitMission(zone, chapter, m);
  };

  /* ---------------------------------------------------------- */
  /* CAPSTONE                                                    */
  /* ---------------------------------------------------------- */
  App.viewCapstone = function () {
    var cp = GH.capstoneProgress();
    var allDone = GH.capstoneDone();
    viewEl.innerHTML = defs() +
      '<section class="section">' +
        '<a class="back" href="#/home">&larr; home</a>' +
        '<div class="capstone-hero">' +
          '<p class="eyebrow">Capstone &middot; prove it</p>' +
          '<h1>&#127942; Ship a production pipeline</h1>' +
          '<p class="muted">Two deliverables that exercise everything you have learned: repository hygiene, then a real build &rarr; test &rarr; scan &rarr; image &rarr; deploy pipeline. Finish both to earn the capstone badge.</p>' +
          '<div class="mini-stats"><div><b>' + cp.done + '/' + cp.total + '</b><small>deliverables done</small></div>' +
            '<div><b>' + (allDone ? '&#10003;' : '&hellip;') + '</b><small>status</small></div></div>' +
        '</div>' +
        GH.CAPSTONE.map(function (c) {
          var done = GH.missionDone(c.mission.id);
          return '<button class="cap-skill" data-cap="' + c.id + '">' +
            '<span class="cs-icon">' + c.icon + '</span>' +
            '<span style="text-align:left"><b>' + c.title + '</b><br><small class="muted">' + GH.m(c.brief) + '</small></span>' +
            '<span class="cs-tag chip ' + (done ? 'ok' : 'hot') + '">' + (done ? '&#10003; done' : 'to do') + '</span></button>';
        }).join('') +
        '<div id="cap-zone"></div>' +
        (allDone ? '<div class="cap-cert"><h2>&#127942; Capstone complete!</h2><p class="muted">You have run the full loop: version control, repository hygiene, and a secured CI/CD pipeline. That is a working DevSecOps toolkit.</p></div>' : '') +
      '</section>';

    function loadCapstone(id) {
      var c = GH.CAPSTONE.filter(function (x) { return x.id === id; })[0];
      if (c) App.renderMission(GH.qs('#cap-zone'), c);
      GH.qsa('[data-cap]').forEach(function (b) { b.classList.toggle('active', b.dataset.cap === id); });
    }
    GH.qsa('[data-cap]').forEach(function (b) { b.onclick = function () { loadCapstone(b.dataset.cap); }; });
    var first = GH.CAPSTONE.filter(function (c) { return !GH.missionDone(c.mission.id); })[0] || GH.CAPSTONE[0];
    if (first) loadCapstone(first.id);
  };

  /* ---------- Git mission ---------- */
  function renderGitMission(zone, chapter, m) {
    var repo = new GH.Repo();
    if (m.setup) m.setup(repo); else { repo.initialized = false; }
    GH.Git = repo;
    ws = { type: 'git', m: m, chapter: chapter };
    zone.innerHTML =
      '<section class="mission">' +
        '<div class="mission-head"><span class="mission-tag">' + missionKindLabel(m) + '</span><h2>' + chapter.title + '</h2>' +
          '<p class="muted">' + GH.m(m.brief) + '</p></div>' +
        '<div class="objectives" id="objectives"></div>' +
        '<div class="git-workspace">' +
          '<div class="terminal-panel">' +
            '<div class="panel-title">Terminal <button class="btn tiny ghost" id="term-clear">clear</button></div>' +
            '<div class="terminal" id="terminal"></div>' +
            '<form class="term-input" id="term-form"><span class="term-prompt" id="term-prompt"></span><input id="term-input" autocomplete="off" spellcheck="false" placeholder="type a git command\u2026" autofocus><button class="btn tiny primary" type="submit">Run</button></form>' +
          '</div>' +
          '<div class="side-panel">' +
            '<div class="panel-title">Repository <button class="btn tiny ghost" id="ws-reset">reset</button></div>' +
            '<div class="status-box" id="status-box"></div>' +
            '<div class="panel-title">Files <button class="btn tiny ghost" id="file-new">+ new</button></div>' +
            '<div class="file-list" id="file-list"></div>' +
            '<div class="editor" id="editor-wrap"></div>' +
            '<div class="panel-title">Commit graph</div>' +
            '<div class="graph-box" id="graph-box"></div>' +
          '</div>' +
        '</div>' +
        '<div class="mission-foot"><button class="btn ghost" id="m-hint">&#128161; Hint</button><span id="m-hint-text" class="muted small"></span></div>' +
      '</section>';

    setColor(zone, GH.trackOfChapter(chapter.id));
    var term = new Terminal(GH.qs('#terminal'), GH.qs('#term-form'), GH.qs('#term-input'), GH.qs('#term-prompt'));
    ws.term = term;
    GH.qs('#term-clear').onclick = function () { term.clear(); };
    GH.qs('#ws-reset').onclick = function () { renderGitMission(zone, chapter, m); };
    GH.qs('#file-new').onclick = function () { var n = prompt('New file name:', 'file.txt'); if (n) { repo.writeFile(n, ''); refreshGit(); } };
    GH.qs('#m-hint').onclick = function () { GH.qs('#m-hint-text').innerHTML = GH.m(m.hint || 'No hint — you can do it.'); };
    ws.refresh = function () { refreshGit(); };
    refreshGit();
    term.welcome('This is a live Git sandbox. Type real commands: git status, git add ., git commit -m "msg".');
  }

  function refreshGit() {
    if (!ws || ws.type !== 'git') return;
    var repo = GH.Git;
    updatePrompt();
    GH.qs('#status-box').innerHTML = statusHTML(repo);
    GH.qs('#file-list').innerHTML = Object.keys(repo.work).sort().map(function (p) {
      return '<button class="file-item" data-file="' + GH.esc(p) + '">&#128196; ' + GH.esc(p) + '</button>';
    }).join('') || '<p class="muted small">No files. Use "+ new" or git clone.</p>';
    GH.qsa('.file-item').forEach(function (b) {
      b.onclick = function () { openEditor(b.dataset.file); };
      if (ws.activeFile === b.dataset.file) b.classList.add('active');
    });
    if (ws.activeFile != null && repo.work[ws.activeFile] != null) openEditor(ws.activeFile, true);
    GH.renderGitGraph(GH.qs('#graph-box'), repo, { labelW: 180 });
    updateObjectives();
  }

  function openEditor(path, keep) {
    var repo = GH.Git;
    ws.activeFile = path;
    var wrap = GH.qs('#editor-wrap');
    var val = repo.work[path] != null ? repo.work[path] : '';
    if (!keep || wrap.dataset.file !== path) {
      wrap.dataset.file = path;
      wrap.innerHTML = '<div class="editor-head"><b>' + GH.esc(path) + '</b><span>' +
        '<button class="btn tiny" id="ed-save">Save</button> <button class="btn tiny danger" id="ed-del">Delete</button></span></div>' +
        '<textarea class="editor-area" id="ed-text" spellcheck="false"></textarea>';
      GH.qs('#ed-text').value = val;
      GH.qs('#ed-save').onclick = function () { repo.writeFile(path, GH.qs('#ed-text').value); GH.toast('Saved ' + path, 'good'); refreshGit(); };
      GH.qs('#ed-del').onclick = function () { repo.deleteFile(path); ws.activeFile = null; refreshGit(); };
    } else { GH.qs('#ed-text').value = val; }
  }

  function statusHTML(repo) {
    if (!repo.initialized) return '<p class="muted small">Not a git repository yet. Run <code>git init</code>.</p>';
    var s = repo.status();
    var h = '<div class="st-branch">&#127793; ' + GH.esc(s.branch) + (s.ahead ? ' &#8593;' + s.ahead : '') + (s.behind ? ' &#8595;' + s.behind : '') + '</div>';
    function group(title, arr, cls) { if (!arr.length) return ''; return '<div class="st-group"><span class="st-title ' + cls + '">' + title + '</span>' + arr.map(function (x) { return '<span class="st-file">' + GH.esc(x) + '</span>'; }).join('') + '</div>'; }
    h += group('staged', s.staged.map(function (x) { return x.state + ': ' + x.path; }), 'ok');
    h += group('unstaged', s.unstaged.map(function (x) { return x.state + ': ' + x.path; }), 'warn');
    h += group('untracked', s.untracked, 'muted');
    h += group('conflicts', s.conflicts, 'bad');
    if (s.clean && !s.merging) h += '<div class="st-clean">&#10003; working tree clean</div>';
    return h;
  }

  function updateObjectives() {
    var box = GH.qs('#objectives');
    if (!box || !ws || !ws.m || !ws.m.objectives) return;
    var repo = GH.Git;
    var allDone = true;
    box.innerHTML = ws.m.objectives.map(function (o) {
      var ok = false;
      try {
        if (ws.m.kind === 'ci') ok = o.fn(ws.wf || {}, ws.run, {});
        else ok = o.fn(repo);
      } catch (e) { ok = false; }
      if (!ok) allDone = false;
      return '<div class="obj ' + (ok ? 'ok' : '') + '"><span class="obj-mark">' + (ok ? '&#10003;' : '&#9675;') + '</span> ' + GH.m(o.t) + '</div>';
    }).join('');
    if (allDone && ws.m.__accomplished !== true) {
      ws.m.__accomplished = true;
      completeMission(ws.m, box);
    }
  }

  function completeMission(m, box) {
    GH.markMission(m.id);
    var badges = GH.checkBadges();
    renderHUD();
    GH.toast('&#127881; Mission complete! +30 XP', 'good');
    celebrate(false, 0, badges);
    var chapter = ws && ws.chapter;
    var banner = GH.el('div', { class: 'mission-complete', html: '&#127881; <b>Objectives complete!</b> Nice work. Explore freely or head to the next chapter.' });
    if (box && box.parentNode) box.parentNode.insertBefore(banner, box.nextSibling);
    // surface the actual next chapter so the flow continues without hunting
    var next = chapter ? nextAfter(chapter.id) : null;
    if (next) {
      var acts = GH.el('div', { class: 'fb-actions' });
      acts.appendChild(GH.el('button', { class: 'btn primary', html: 'Next: ' + GH.esc(next.title) + ' &rarr;', onclick: function () { App.go('#/chapter/' + next.id); } }));
      if (box && box.parentNode) box.parentNode.insertBefore(acts, box.nextSibling);
    }
  }

  /* the chapter immediately after <id> in registration order */
  function nextAfter(id) {
    var flat = [];
    GH.TRACKS.forEach(function (t) { t.chapters.forEach(function (c) { flat.push(c); }); });
    for (var i = 0; i < flat.length; i++) if (flat[i].id === id) return flat[i + 1] || null;
    return null;
  }

  /* ---------- CI mission ---------- */
  function renderCiMission(zone, chapter, m) {
    var text = m.starter || GH.WORKFLOW_TEMPLATES.empty;
    ws = { type: 'ci', m: m, chapter: chapter, text: text, run: null, wf: null };
    var t = GH.trackOfChapter(chapter.id);
    zone.innerHTML =
      '<section class="mission">' +
        '<div class="mission-head"><span class="mission-tag" style="--c:' + (t ? t.color : '#38bdf8') + '">' + missionKindLabel(m) + '</span><h2>' + chapter.title + '</h2>' +
          '<p class="muted">' + GH.m(m.brief) + '</p></div>' +
        '<div class="objectives" id="objectives"></div>' +
        '<div class="ci-workspace">' +
          '<div class="ci-editor">' +
            '<div class="panel-title">.github/workflows/ci.yml ' +
              '<span><button class="btn tiny" id="ci-validate">Validate</button> <button class="btn tiny primary" id="ci-run">&#9654; Run pipeline</button></span></div>' +
            '<textarea class="yaml-area" id="ci-text" spellcheck="false"></textarea>' +
            '<div class="ci-status" id="ci-status"></div>' +
          '</div>' +
          '<div class="ci-visual">' +
            '<div class="panel-title">Pipeline</div>' +
            '<div class="pipeline-box" id="pipeline-box"></div>' +
          '</div>' +
        '</div>' +
        '<div class="mission-foot"><button class="btn ghost" id="m-hint">&#128161; Hint</button>' +
          (m.solution ? '<button class="btn ghost" id="m-solution">Show solution</button>' : '') +
          '<span id="m-hint-text" class="muted small"></span></div>' +
      '</section>';
    var ta = GH.qs('#ci-text'); ta.value = text;
    ta.addEventListener('input', function () { ws.text = ta.value; });
    GH.qs('#ci-validate').onclick = function () { validateCI(); };
    GH.qs('#ci-run').onclick = function () { runCI(); };
    GH.qs('#m-hint').onclick = function () { GH.qs('#m-hint-text').innerHTML = GH.m(m.hint || ''); };
    var solBtn = GH.qs('#m-solution');
    if (solBtn) solBtn.onclick = function () { if (m.solution) { ta.value = m.solution; ws.text = m.solution; validateCI(); } };
    GH.renderPipeline(GH.qs('#pipeline-box'), null);
    updateObjectives();
  }

  function validateCI() {
    var status = GH.qs('#ci-status');
    try {
      var wf = GH.parseYaml(ws.text);
      ws.wf = wf;
      status.className = 'ci-status ok';
      status.innerHTML = '&#10003; YAML parsed — ' + Object.keys(wf.jobs || {}).length + ' job(s), trigger: ' + JSON.stringify(GH.parseYaml(ws.text).on != null ? 'set' : 'none');
      updateObjectives();
      return wf;
    } catch (e) {
      status.className = 'ci-status bad';
      status.innerHTML = '&#10007; YAML error: ' + GH.esc(e.message);
      return null;
    }
  }
  function runCI() {
    var wf = validateCI();
    if (!wf) return;
    var ctx = { event: ws.m.event || 'push', branch: ws.m.branch || 'main', files: ws.m.files || {}, changed: ws.m.changed || [] };
    var run = GH.runWorkflow(wf, ctx);
    ws.run = run; ws.lastRun = { wf: wf, run: run };
    GH.renderPipeline(GH.qs('#pipeline-box'), run);
    var status = GH.qs('#ci-status');
    status.className = 'ci-status ' + (run.ok ? 'ok' : 'bad');
    status.innerHTML = run.ok ? '&#10003; Pipeline passed' : '&#10007; Pipeline failed — check the steps below';
    updateObjectives();
  }

  /* ---------- Quiz ---------- */
  function renderQuiz(zone, chapter, m) {
    // shuffle option order so the answer position never gives it away
    m.questions.forEach(function (q) {
      var order = q.options.map(function (_, i) { return i; });
      for (var i = order.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = order[i]; order[i] = order[j]; order[j] = t; }
      var newA = order.indexOf(q.a);
      q.options = order.map(function (k) { return q.options[k]; });
      q.a = newA;
    });
    zone.innerHTML =
      '<section class="mission"><div class="mission-head"><span class="mission-tag">Quiz</span><h2>' + chapter.title + '</h2>' +
        '<p class="muted">' + GH.m(m.brief) + '</p></div>' +
        '<div class="quiz" id="quiz">' + m.questions.map(function (q, qi) {
          return '<div class="quiz-q" data-q="' + qi + '"><div class="qq-text">' + (qi + 1) + '. ' + GH.m(q.q) + '</div>' +
            '<div class="qq-opts">' + q.options.map(function (o, oi) {
              return '<label class="qq-opt"><input type="radio" name="q' + qi + '" value="' + oi + '"> <span>' + GH.m(o) + '</span></label>';
            }).join('') + '</div><div class="qq-why muted small" style="display:none"></div></div>';
        }).join('') + '</div>' +
        '<div class="fb-actions"><button class="btn primary" id="quiz-submit">Submit answers</button>' +
        '<button class="btn ghost" id="quiz-clear">Clear</button><span id="quiz-result" class="muted"></span></div></section>';
    GH.qs('#quiz-submit').onclick = function () { gradeQuiz(m); };
    GH.qs('#quiz-clear').onclick = function () { GH.qsa('input[type=radio]', zone).forEach(function (r) { r.checked = false; }); };
  }

  function gradeQuiz(m) {
    var answers = m.questions.map(function (q, i) {
      var el = GH.qs('input[name="q' + i + '"]:checked');
      return el ? parseInt(el.value, 10) : -1;
    });
    var res = GH.gradeQuiz(m, answers);
    m.questions.forEach(function (q, i) {
      var box = GH.qs('.quiz-q[data-q="' + i + '"]');
      var why = GH.qs('.qq-why', box);
      var correct = answers[i] === q.a;
      box.classList.toggle('right', correct); box.classList.toggle('wrong', !correct);
      why.style.display = 'block';
      why.innerHTML = (correct ? '&#10003; Correct. ' : '&#10007; Correct answer: <b>' + GH.m(q.options[q.a]) + '</b>. ') + GH.m(q.why);
      GH.qsa('.qq-opt', box).forEach(function (o, oi) { o.classList.toggle('is-correct', oi === q.a); });
    });
    GH.qs('#quiz-result').innerHTML = 'Score: <b>' + res.correct + '/' + res.total + '</b> (' + res.pct + '%)';
    GH.recordQuiz(m.id, res.pct);
    // 70% pass, with one miss tolerated on 3-question quizzes (2/3 = 67%)
    if (res.pct >= 70 || res.correct / res.total >= 0.66) {
      GH.markMission(m.id);
      var badges = GH.checkBadges();
      renderHUD();
      GH.toast('&#127881; Quiz passed with ' + res.pct + '%!', 'good');
      celebrate(false, 0, badges);
    }
  }

  /* ============================================================ */
  /* TERMINAL helper                                               */
  /* ============================================================ */
  function Terminal(el, form, input, promptEl) {
    this.el = el; this.form = form; this.input = input; this.promptEl = promptEl;
    this.history = []; this.cmdHistory = []; this.histIndex = 0;
    var self = this;
    form.onsubmit = function (e) {
      e.preventDefault();
      var cmd = self.input.value.trim();
      if (!cmd) return;
      self.run(cmd);
      self.input.value = '';
      self.histIndex = self.cmdHistory.length;
    };
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') { e.preventDefault(); if (self.histIndex > 0) { self.histIndex--; input.value = self.cmdHistory[self.histIndex] || ''; } }
      else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (self.histIndex < self.cmdHistory.length - 1) { self.histIndex++; input.value = self.cmdHistory[self.histIndex] || ''; }
        else { self.histIndex = self.cmdHistory.length; input.value = ''; }
      } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); self.clear(); }
    });
  }
  Terminal.prototype.render = function () {
    this.el.innerHTML = this.history.map(function (h) {
      return '<div class="term-line"><span class="prompt-sym">$</span> <span class="term-in">' + GH.esc(h.cmd) + '</span>' +
        (h.out ? '<pre class="term-out ' + (h.err ? 'err' : '') + '">' + GH.colorize(h.out) + '</pre>' : '') + '</div>';
    }).join('');
    this.el.scrollTop = this.el.scrollHeight;
  };
  Terminal.prototype.run = function (cmd) {
    this.cmdHistory.push(cmd);
    this.histIndex = this.cmdHistory.length;
    var r = GH.Git.run(cmd);
    this.history.push({ cmd: cmd, out: r.out, err: r.err });
    this.history = this.history.slice(-80);
    this.render();
    if (ws && ws.refresh) ws.refresh();
  };
  Terminal.prototype.clear = function () { this.history = []; this.render(); };
  Terminal.prototype.welcome = function (msg) { this.history.push({ cmd: '', out: msg }); this.render(); };

  function updatePrompt() {
    var p = GH.qs('#term-prompt'); if (!p) return;
    var repo = GH.Git;
    var branch = repo.head.type === 'branch' ? repo.head.name : 'detached';
    p.innerHTML = '<span class="p-user">you</span><span class="p-at">@</span><span class="p-host">gitcicd</span><span class="p-colon">:</span><span class="p-path">~/project</span>' +
      (repo.initialized ? ' <span class="p-branch">(' + GH.esc(branch) + ')</span>' : '') + ' <span class="p-sym">$</span>';
  }

  /* ============================================================ */
  /* FREE SANDBOXES                                                */
  /* ============================================================ */
  App.viewSandbox = function () {
    GH.Git = new GH.Repo();
    viewEl.innerHTML = defs() + '<section class="section"><div class="section-head"><h2>Git sandbox</h2>' +
      '<span><button class="btn tiny" id="sb-clone">Clone sample repo</button> <button class="btn tiny" id="sb-reset">Empty repo</button></span></div>' +
      '<p class="muted">A safe, disposable Git repository. Type real commands. Try <code>git init</code>, <code>git status</code>, <code>git add .</code>, <code>git commit -m "msg"</code>, <code>git log --oneline</code>, <code>git switch -c feature</code>.</p>' +
      '<div class="cmd-chips" id="cmd-chips">' + [
        'git status', 'git add .', 'git commit -m "msg"', 'git log --oneline', 'git diff',
        'git switch -c feature', 'git stash', 'git reflog', 'git branch -v'
      ].map(function (c) { return '<button class="chip-btn" data-cmd="' + GH.esc(c) + '">' + GH.esc(c) + '</button>'; }).join('') + '</div>' +
      '<div class="git-workspace">' +
        '<div class="terminal-panel"><div class="panel-title">Terminal</div><div class="terminal" id="terminal"></div>' +
          '<form class="term-input" id="term-form"><span class="term-prompt" id="term-prompt"></span><input id="term-input" autocomplete="off" spellcheck="false" placeholder="git &hellip;" autofocus><button class="btn tiny primary" type="submit">Run</button></form></div>' +
        '<div class="side-panel">' +
          '<div class="panel-title">Repository</div><div class="status-box" id="status-box"></div>' +
          '<div class="panel-title">Files <button class="btn tiny ghost" id="file-new">+ new</button></div><div class="file-list" id="file-list"></div>' +
          '<div class="editor" id="editor-wrap"></div>' +
          '<div class="panel-title">Commit graph</div><div class="graph-box" id="graph-box"></div>' +
        '</div>' +
      '</div></section>';
    ws = { type: 'git', m: { objectives: [] }, refresh: null };
    var term = new Terminal(GH.qs('#terminal'), GH.qs('#term-form'), GH.qs('#term-input'), GH.qs('#term-prompt'));
    ws.term = term;
    GH.qs('#file-new').onclick = function () { var n = prompt('New file name:', 'file.txt'); if (n) { GH.Git.writeFile(n, ''); refreshGit(); } };
    GH.qs('#sb-clone').onclick = function () { GH.Git.run('git clone https://github.com/team/project.git'); refreshGit(); };
    GH.qs('#sb-reset').onclick = function () { App.viewSandbox(); };
    GH.qsa('#cmd-chips .chip-btn').forEach(function (b) {
      b.onclick = function () { var i = GH.qs('#term-input'); i.value = b.dataset.cmd; i.focus(); };
    });
    ws.refresh = function () { refreshGit(); };
    refreshGit();
    term.welcome('Fresh empty repo. Start with: git init');
  };

  App.viewCiSandbox = function () {
    var text = GH.WORKFLOW_TEMPLATES.node;
    viewEl.innerHTML = '<section class="section"><div class="section-head"><h2>CI/CD playground</h2>' +
      '<span class="muted small">Template: <select id="tpl"><option value="empty">empty</option><option value="node" selected>node ci</option><option value="buildtest">build &amp; test</option><option value="matrix">matrix</option><option value="deploy">deploy</option></select></span></div>' +
      '<p class="muted">Edit a GitHub Actions workflow and run it against a simulated repo. Change the YAML and watch jobs, steps, matrix runs and artifacts appear.</p>' +
      '<div class="ci-workspace"><div class="ci-editor"><div class="panel-title">ci.yml <span><button class="btn tiny" id="ci-validate">Validate</button> <button class="btn tiny primary" id="ci-run">&#9654; Run pipeline</button></span></div>' +
        '<textarea class="yaml-area" id="ci-text" spellcheck="false"></textarea><div class="ci-status" id="ci-status"></div></div>' +
      '<div class="ci-visual"><div class="panel-title">Pipeline</div><div class="pipeline-box" id="pipeline-box"></div></div></div></section>';
    var ta = GH.qs('#ci-text'); ta.value = text;
    ws = { type: 'ci', m: { objectives: [], files: { 'package.json': '{"name":"app","scripts":{"test":"jest","build":"webpack"}}', 'src/app.js': 'export const x=1;', 'src/app.test.js': 'test("ok",()=>{})', 'deploy.sh': 'echo deploy' }, event: 'push', branch: 'main' }, text: text };
    ta.addEventListener('input', function () { ws.text = ta.value; });
    GH.qs('#tpl').onchange = function () { ta.value = GH.WORKFLOW_TEMPLATES[this.value]; ws.text = ta.value; };
    GH.qs('#ci-validate').onclick = function () { validateCI(); };
    GH.qs('#ci-run').onclick = function () { runCI(); };
    GH.renderPipeline(GH.qs('#pipeline-box'), null);
  };

  /* ============================================================ */
  /* CHEAT SHEET                                                   */
  /* ============================================================ */
  var CHEATS = [
    { h: 'Setup & basics', items: [['git init', 'create a repository'], ['git clone <url>', 'copy a remote repo'], ['git status', 'what is staged / changed'], ['git config user.name "X"', 'set your identity']] },
    { h: 'Staging & committing', items: [['git add <path>', 'stage a file'], ['git add .', 'stage everything'], ['git commit -m "msg"', 'record the staged snapshot'], ['git commit -am "msg"', 'stage tracked edits + commit'], ['git diff', 'unstaged changes'], ['git diff --staged', 'staged changes']] },
    { h: 'History', items: [['git log --oneline', 'compact history'], ['git show <sha>', 'a commit + its diff'], ['git blame <file>', 'who changed each line'], ['git reflog', 'everywhere HEAD has been']] },
    { h: 'Branching & merging', items: [['git switch -c <name>', 'create + switch'], ['git switch <name>', 'switch branches'], ['git merge <name>', 'merge into current'], ['git branch -d <name>', 'delete a merged branch']] },
    { h: 'Undoing', items: [['git restore <file>', 'discard edits'], ['git restore --staged <file>', 'unstage'], ['git reset --soft HEAD~1', 'undo commit, keep staged'], ['git reset --hard HEAD~1', 'discard commit + changes'], ['git revert <sha>', 'undo a shared commit safely'], ['git cherry-pick <sha>', 'copy one commit here']] },
    { h: 'Remotes', items: [['git remote add origin <url>', 'add a remote'], ['git push -u origin main', 'push + track'], ['git fetch', 'download without merging'], ['git pull', 'fetch + merge'], ['git push --tags', 'push tags']] },
    { h: 'Stash & rebase', items: [['git stash / pop', 'park / restore work'], ['git rebase main', 'replay onto main'], ['git rebase --continue', 'after fixing a conflict']] },
    { h: 'Advanced', items: [['git bisect start / good / bad', 'binary-search for the buggy commit'], ['git worktree add <dir> <branch>', 'work two branches at once'], ['git submodule add <url> <path>', 'nest another repository'], ['git submodule update --init', 'fetch submodule contents'], ['git lfs track "*.psd"', 'keep large files out of history'], ['git commit --no-verify', 'skip hooks (use sparingly)']] }
  ];

  App.viewCheatsheet = function () {
    viewEl.innerHTML = '<section class="section"><div class="section-head"><h2>Git cheat sheet</h2>' +
      '<input class="ansinput small" id="cheat-search" placeholder="search commands\u2026"></div>' +
      '<div id="cheat-body"></div></section>';
    function draw(q) {
      GH.qs('#cheat-body').innerHTML = CHEATS.map(function (g) {
        var items = g.items.filter(function (it) { return !q || (it[0] + ' ' + it[1]).toLowerCase().indexOf(q) !== -1; });
        if (!items.length) return '';
        return '<div class="cheat-group"><h3>' + g.h + '</h3>' + items.map(function (it) {
          return '<div class="cheat-row"><code>' + GH.esc(it[0]) + '</code><span class="muted">' + GH.esc(it[1]) + '</span></div>';
        }).join('') + '</div>';
      }).join('') || '<p class="muted">No matches.</p>';
    }
    draw('');
    GH.qs('#cheat-search').oninput = function () { draw(this.value.toLowerCase()); };
  };

  /* ============================================================ */
  /* BADGES / SETTINGS                                             */
  /* ============================================================ */
  App.viewBadges = function () {
    viewEl.innerHTML = '<section class="section"><div class="section-head"><h2>Badges</h2><span class="muted">' +
      Object.keys(GH.state.badges).length + ' of ' + GH.BADGES.length + ' unlocked</span></div>' +
      '<div class="badge-grid">' + GH.BADGES.map(function (b) {
        var got = !!GH.state.badges[b.id];
        return '<div class="badge' + (got ? ' got' : '') + '"><div class="b-icon">' + b.icon + '</div><b>' + b.name + '</b>' +
          '<small>' + b.desc + '</small>' + (got ? '<span class="muted tiny">earned ' + new Date(GH.state.badges[b.id]).toLocaleDateString() + '</span>' : '') + '</div>';
      }).join('') + '</div></section>';
  };

  App.viewSettings = function () {
    var s = GH.state.settings;
    viewEl.innerHTML = '<section class="section"><div class="section-head"><h2>Settings</h2></div>' +
      '<div class="settings-list">' +
        '<div class="setting-row"><span>Sound effects</span><button class="switch' + (s.sound ? ' on' : '') + '" data-toggle="sound"><i></i></button></div>' +
        '<div class="setting-row"><span>Export progress (JSON)</span><button class="btn" id="btn-export">&#11015; Export</button></div>' +
        '<div class="setting-row"><span>Import progress</span><span><button class="btn" id="btn-import">&#11014; Import</button><input type="file" id="import-file" accept=".json,application/json" style="display:none"></span></div>' +
        '<div class="setting-row"><span>Danger zone</span><button class="btn danger" id="btn-reset">Reset all progress</button></div>' +
      '</div></section>';
    GH.qsa('[data-toggle]').forEach(function (el) { el.onclick = function () { s[el.dataset.toggle] = !s[el.dataset.toggle]; GH.save(); App.viewSettings(); }; });
    GH.qs('#btn-export').onclick = function () {
      try {
        var blob = new Blob([JSON.stringify({ app: 'gitcicd-hero', state: GH.state })], { type: 'application/json' });
        var url = URL.createObjectURL(blob); var a = document.createElement('a');
        a.href = url; a.download = 'gitcicd-hero-' + GH.todayKey() + '.json'; document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
        GH.toast('Exported.', 'good');
      } catch (e) { GH.toast('Export failed.', 'bad'); }
    };
    GH.qs('#btn-import').onclick = function () { GH.qs('#import-file').click(); };
    GH.qs('#import-file').onchange = function (e) {
      var f = e.target.files && e.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () { try { var d = JSON.parse(r.result); GH.state = Object.assign(GH.state, d.state); GH.save(); renderHUD(); App.viewSettings(); GH.toast('Imported.', 'good'); } catch (err) { GH.toast('Bad file.', 'bad'); } };
      r.readAsText(f);
    };
    GH.qs('#btn-reset').onclick = function () { if (window.confirm('Erase all progress?')) { GH.reset(); renderHUD(); App.viewHome(); } };
  };

  /* ---------- color helper ---------- */
  function setColor(zone, track) { /* reserved */ void zone; void track; }

  /* expose for tests */
  App._internals = { Terminal: Terminal, nextChapter: nextChapter };
})(window.GH);
