/* ============================================================
   CSMath Hero - ui.js
   Router, views, session runner, boss battles, and the
   character-sheet stats screen.
   ============================================================ */
(function (MH) {
  'use strict';

  var App = {};
  MH.App = App;

  var root, headerEl, headerStatsEl, viewEl, toastEl;
  var session = null;      // active practice/mixed session
  var timerHandle = null;

  /* ---------------------------------------------------------- */
  /* helpers                                                     */
  /* ---------------------------------------------------------- */
  function esc(s) { return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function stars(n) {
    var out = '';
    for (var i = 0; i < 5; i++) out += '<span class="star' + (i < n ? ' on' : '') + '">&#9733;</span>';
    return '<span class="stars">' + out + '</span>';
  }
  function pct(a, b) { return b ? Math.round((a / b) * 100) : 0; }
  function ring(p, size) {
    size = size || 56;
    var r = (size - 8) / 2, c = 2 * Math.PI * r;
    var off = c * (1 - MH.clamp(p, 0, 100) / 100);
    return '<svg class="ring" width="' + size + '" height="' + size + '">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke="rgba(255,255,255,.12)" stroke-width="6" fill="none"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke="url(#grad)" stroke-width="6" fill="none" stroke-linecap="round" ' +
      'stroke-dasharray="' + c + '" stroke-dashoffset="' + off + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/></svg>';
  }
  function defs() {
    return '<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="#38bdf8"/><stop offset="1" stop-color="#a855f7"/></linearGradient></defs></svg>';
  }

  /* ---------------------------------------------------------- */
  /* boot                                                        */
  /* ---------------------------------------------------------- */
  App.boot = function () {
    MH.load();
    root = MH.qs('#app');
    root.innerHTML =
      defs() +
      '<header class="topbar">' +
        '<div class="brand" id="brand"><span class="logo">&#8734;</span> <b>CSMath Hero</b></div>' +
        '<div class="hud" id="hud"></div>' +
      '</header>' +
      '<main id="view" class="view"></main>' +
      '<div id="toasts" class="toasts"></div>' +
      '<div id="overlay" class="overlay hidden"></div>';
    headerEl = MH.qs('#hud');
    viewEl = MH.qs('#view');
    toastEl = MH.qs('#toasts');
    MH.qs('#brand').addEventListener('click', function () { App.go('#/home'); });
    window.addEventListener('hashchange', App.route);
    App.route();
  };

  App.route = function () {
    var h = location.hash || '#/home';
    renderHUD();
    if (h.indexOf('#/skill/') === 0) {
      var sid = h.slice(8);
      App.go('#/map');
      setTimeout(function () { App.startSkill(sid); }, 60);
      return;
    }
    if (h.indexOf('#/lesson/') === 0) return App.viewLesson(h.slice(9));
    if (h === '#/paths') return App.viewPaths();
    if (h === '#/notebook') return App.viewNotebook();
    if (h === '#/exam') return App.viewExam();
    if (h === '#/map' || h === '') return App.viewMap();
    if (h === '#/stats') return App.viewStats();
    if (h === '#/achievements') return App.viewAchievements();
    if (h === '#/codex') return App.viewCodex();
    if (h === '#/settings') return App.viewSettings();
    if (h.indexOf('#/realm/') === 0) return App.viewRealm(h.slice(8));
    return App.viewHome();
  };
  App.go = function (h) {
    if (location.hash === h) App.route(); else location.hash = h;
    window.scrollTo(0, 0);
  };

  /* ---------------------------------------------------------- */
  /* HUD                                                         */
  /* ---------------------------------------------------------- */
  function renderHUD() {
    var lp = MH.levelProgress(MH.state.xp);
    var st = MH.state.streak;
    var today = MH.state.daily.solved, goal = MH.state.daily.goal;
    headerEl.innerHTML =
      '<div class="hud-item level" title="Level ' + lp.level + ' &mdash; ' + MH.titleFor(lp.level) + '">' +
        '<span class="lv">Lv ' + lp.level + '</span>' +
        '<div class="xpbar"><i style="width:' + lp.pct + '%"></i></div>' +
        '<span class="xptext">' + lp.into + '/' + lp.span + ' XP</span>' +
      '</div>' +
      '<div class="hud-item streak" title="Daily streak">&#128293; <b>' + st.count + '</b></div>' +
      '<div class="hud-item dailypill" title="Today\u2019s goal">&#127919; <b>' + today + '/' + goal + '</b></div>' +
      '<nav class="hud-nav">' +
        ['map|Map', 'stats|Stats', 'codex|Codex', 'achievements|Badges', 'settings|Settings'].map(function (x) {
          var p = x.split('|');
          return '<a href="#/' + (p[0] === 'map' ? 'map' : p[0]) + '">' + p[1] + '</a>';
        }).join('') +
      '</nav>';
  }

  function toast(msg, kind) {
    var t = MH.el('div', { class: 'toast ' + (kind || ''), html: msg });
    toastEl.appendChild(t);
    setTimeout(function () { t.classList.add('show'); }, 10);
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 300); }, 3200);
  }
  App.toast = toast;

  function celebrate(newBadges, levelUp, level) {
    if (levelUp) toast('&#11014; Level up! You are now level <b>' + level + '</b> &mdash; ' + MH.titleFor(level), 'good');
    (newBadges || []).forEach(function (b) {
      setTimeout(function () { toast(b.icon + ' Badge unlocked: <b>' + b.name + '</b><br><small>' + b.desc + '</small>', 'badge'); }, 200);
    });
  }

  function afterProgress() {
    var lvUp = false, lvl = 1;
    var fresh = MH.checkAchievements();
    return { fresh: fresh };
  }

  /* ---------------------------------------------------------- */
  /* HOME                                                        */
  /* ---------------------------------------------------------- */
  App.viewHome = function () {
    var lp = MH.levelProgress(MH.state.xp);
    var solved = MH.state.solved;
    var acc = solved ? Math.round((MH.state.correct / solved) * 100) : 0;
    var nextRealm = MH.CURRICULUM.realms.filter(function (r) { return MH.realmUnlocked(r, MH.CURRICULUM.realms); }).slice(-1)[0];
    var goalPct = pct(MH.state.daily.solved, MH.state.daily.goal);
    var weak = MH.weakSkills(4);
    var weakNames = weak.map(function (id) { var s = MH.skillById(id); return s ? s.name : id; });
    var lessonsDone = MH.lessonsStudiedCount();
    var path = MH.getPath(MH.state.path);
    var pp = MH.pathProgress(path);
    var nextSkill = null;
    for (var i = 0; i < path.steps.length; i++) { if (!MH.lessonStudied(path.steps[i])) { nextSkill = MH.skillById(path.steps[i]); break; } }
    if (!nextSkill) nextSkill = MH.skillById(pp.next) || MH.skillById(weak[0]) || MH.ALL_SKILLS[0];
    var dueCount = MH.reviewDue(99).length;
    var chalDone = MH.dailyDone();

    var modes = [
      { mode: 'daily', icon: '&#128197;', name: 'Daily Challenge', sub: chalDone ? '&#10003; done today' : '3 problems &middot; bonus XP', hot: !chalDone, color: '#eab308' },
      { mode: 'review', icon: '&#128257;', name: 'Spaced Review', sub: dueCount ? dueCount + ' due now' : 'nothing due yet', hot: dueCount > 0, color: '#38bdf8' },
      { mode: 'drill', icon: '&#9889;', name: 'Lightning Round', sub: '60s mental math &middot; best ' + MH.state.drill.best, hot: false, color: '#f97316' },
      { mode: 'exam', icon: '&#128221;', name: 'Mock Exam', sub: 'timed, no hints, report at the end', hot: false, color: '#f43f5e' },
      { mode: 'notebook', icon: '&#128211;', name: 'Mistake Notebook', sub: MH.state.mistakes.length + ' saved', hot: false, color: '#a855f7' },
      { mode: 'paths', icon: '&#127937;', name: 'Learning Paths', sub: path.icon + ' ' + path.name + ' &middot; ' + pp.pct + '%', hot: false, color: '#14b8a6' }
    ];

    viewEl.innerHTML =
      '<section class="hero">' +
        '<div class="hero-main">' +
          '<p class="eyebrow">Your training log</p>' +
          '<h1>' + MH.titleFor(lp.level) + '</h1>' +
          '<p class="muted">Level ' + lp.level + ' &middot; ' + MH.state.xp.toLocaleString('en-US') + ' XP &middot; ' +
            MH.state.correct + ' correct answers &middot; ' + acc + '% accuracy &middot; ' + lessonsDone + '/' + MH.ALL_SKILLS.length + ' lessons</p>' +
          '<div class="hero-actions">' +
            '<button class="btn primary big" id="btn-learn">&#128214; Learn: ' + nextSkill.name + '</button>' +
            '<button class="btn big" id="btn-continue">&#9654; Continue training</button>' +
            '<button class="btn" id="btn-map">&#128506; Skill map</button>' +
            '<button class="btn" id="btn-codex">&#128214; Codex</button>' +
          '</div>' +
          '<p class="muted small">Path: <b>' + path.icon + ' ' + path.name + '</b> &mdash; ' + pp.done + '/' + pp.total + ' steps done ' +
            '(<a href="#/paths">change path</a>)' +
            (weakNames.length ? ' &middot; review: ' + esc(weakNames.slice(0, 3).join(', ')) : '') + '</p>' +
        '</div>' +
        '<div class="hero-side">' +
          '<div class="ring-wrap">' + ring(goalPct, 96) +
            '<div class="ring-label"><b>' + MH.state.daily.solved + '</b><small>/ ' + MH.state.daily.goal + ' today</small></div></div>' +
          '<div class="mini-stats">' +
            '<div><b>' + MH.state.streak.count + '</b><small>day streak</small></div>' +
            '<div><b>' + MH.state.streak.best + '</b><small>best streak</small></div>' +
            '<div><b>' + Object.keys(MH.state.achievements).length + '</b><small>badges</small></div>' +
          '</div>' +
        '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><h2>Ways to train</h2></div>' +
        '<div class="mode-grid">' + modes.map(function (m) {
          return '<button class="mode-card' + (m.hot ? ' hot' : '') + '" data-mode="' + m.mode + '" style="--c:' + m.color + '">' +
            '<span class="mc-icon">' + m.icon + '</span>' +
            '<span class="mc-body"><b>' + m.name + '</b><small>' + m.sub + '</small></span></button>';
        }).join('') + '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><h2>Your realms</h2><a href="#/map">open full map &rarr;</a></div>' +
        '<div class="realm-strip">' + MH.CURRICULUM.realms.map(realmCard).join('') + '</div>' +
      '</section>' +

      '<section class="section">' +
        '<div class="section-head"><h2>Recent activity</h2></div>' +
        (MH.state.log.length
          ? '<ul class="activity">' + MH.state.log.slice(0, 8).map(function (l) {
              return '<li><span class="xp-plus">+' + l.xp + ' XP</span> <span class="muted">' + esc(l.reason) + '</span></li>';
            }).join('') + '</ul>'
          : '<p class="muted">No activity yet &mdash; solve a problem to begin.</p>') +
      '</section>';

    MH.qs('#btn-learn').onclick = function () { App.go('#/lesson/' + nextSkill.id); };
    MH.qs('#btn-continue').onclick = function () { App.startMixed(); };
    MH.qs('#btn-map').onclick = function () { App.go('#/map'); };
    MH.qs('#btn-codex').onclick = function () { App.go('#/codex'); };
    [].forEach.call(viewEl.querySelectorAll('.mode-card'), function (b) {
      b.onclick = function () { App.launchMode(b.dataset.mode); };
    });
    bindRealmCards();
  };

  App.launchMode = function (mode) {
    if (mode === 'daily') return App.startDaily();
    if (mode === 'review') return App.startReview();
    if (mode === 'drill') return App.startDrill();
    if (mode === 'exam') return App.go('#/exam');
    if (mode === 'notebook') return App.go('#/notebook');
    if (mode === 'paths') return App.go('#/paths');
  };

  function realmCard(r) {
    var unlocked = MH.realmUnlocked(r, MH.CURRICULUM.realms);
    var p = MH.realmPct(r);
    var boss = MH.state.bosses[r.id];
    return '<button class="realm-card' + (unlocked ? '' : ' locked') + '" data-realm="' + r.id + '" style="--c:' + r.color + '">' +
      '<div class="rc-icon">' + r.icon + '</div>' +
      '<div class="rc-body"><b>' + r.name + '</b><small>' + (unlocked ? r.tagline : 'Locked &mdash; make progress in the previous realm') + '</small>' +
        '<div class="bar"><i style="width:' + p + '%"></i></div>' +
        '<small class="muted">' + MH.realmStars(r) + '/' + MH.realmMaxStars(r) + ' stars' + (boss && boss.cleared ? ' &middot; &#128081; trial cleared' : '') + '</small></div>' +
      '</button>';
  }
  function bindRealmCards() {
    [].forEach.call(viewEl.querySelectorAll('.realm-card'), function (b) {
      b.onclick = function () {
        var r = MH.CURRICULUM.realms.filter(function (x) { return x.id === b.dataset.realm; })[0];
        if (!MH.realmUnlocked(r, MH.CURRICULUM.realms)) { toast('That realm is still locked.', 'bad'); return; }
        App.go('#/realm/' + r.id);
      };
    });
  }

  /* ---------------------------------------------------------- */
  /* MAP + REALM                                                */
  /* ---------------------------------------------------------- */
  App.viewMap = function () {
    viewEl.innerHTML = '<section class="section"><div class="section-head"><h2>Skill map</h2></div>' +
      '<div class="realm-strip big">' + MH.CURRICULUM.realms.map(realmCard).join('') + '</div></section>';
    bindRealmCards();
  };

  App.viewRealm = function (id) {
    var r = MH.CURRICULUM.realms.filter(function (x) { return x.id === id; })[0];
    if (!r) return App.viewMap();
    var boss = MH.state.bosses[r.id] || {};
    var unlockBoss = MH.realmPct(r) >= 40;
    viewEl.innerHTML =
      '<section class="section">' +
        '<a class="back" href="#/map">&larr; all realms</a>' +
        '<div class="realm-head" style="--c:' + r.color + '">' +
          '<div class="rc-icon big">' + r.icon + '</div>' +
          '<div><h1>' + r.name + '</h1><p class="muted">' + r.tagline + '</p></div>' +
          '<div class="realm-score">' + MH.realmStars(r) + '<small>/ ' + MH.realmMaxStars(r) + ' stars</small></div>' +
        '</div>' +
        '<div class="skill-grid">' + r.skills.map(function (s) {
          var st = MH.skillState(s.id);
          var studied = MH.lessonStudied(s.id);
          return '<div class="skill-card' + (studied ? '' : ' new') + '">' +
            '<div class="sc-top"><b>' + s.name + '</b>' + stars(MH.stars(s.id)) + '</div>' +
            '<small>' + s.blurb + '</small>' +
            '<div class="sc-foot"><span class="chip">Lv ' + st.lvl + '</span><span class="chip">' + st.c + ' correct</span>' +
              (studied ? '<span class="chip ok">&#10003; studied</span>' : '<span class="chip hot">new</span>') + '</div>' +
            '<div class="sc-actions">' +
              '<button class="btn tiny" data-learn="' + s.id + '">&#128214; Learn</button>' +
              '<button class="btn tiny primary" data-practice="' + s.id + '">&#9654; Practice</button>' +
            '</div>' +
            '</div>';
        }).join('') + '</div>' +
        '<div class="boss-zone ' + (unlockBoss ? '' : 'locked') + '">' +
          '<div><h3>&#128081; Realm Trial</h3><p class="muted">A timed gauntlet across this realm. 3 lives. Clear 8 of 10 to win. Unlocks at 40% realm completion.</p>' +
          (boss.best != null ? '<p class="muted small">Best: ' + boss.best + '/10</p>' : '') + '</div>' +
          '<button class="btn primary" id="btn-boss" ' + (unlockBoss ? '' : 'disabled') + '>Begin Trial</button>' +
        '</div>' +
      '</section>';
    [].forEach.call(viewEl.querySelectorAll('.skill-card'), function (b) {
      b.querySelector('[data-practice]').onclick = function (e) { e.stopPropagation(); App.startSkill(b.querySelector('[data-practice]').dataset.practice); };
      b.querySelector('[data-learn]').onclick = function (e) { e.stopPropagation(); App.go('#/lesson/' + b.querySelector('[data-learn]').dataset.learn); };
      b.onclick = function () { App.go('#/lesson/' + b.querySelector('[data-learn]').dataset.learn); };
    });
    var bb = MH.qs('#btn-boss');
    if (bb) bb.onclick = function () { App.startBoss(r.id); };
  };

  /* ---------------------------------------------------------- */
  /* built-in scientific calculator                              */
  /* ---------------------------------------------------------- */
  var CALC_KEYS = [
    ['AC', 'ac'], ['\u232B', 'del'], ['(', '('], [')', ')'], ['^', '^'],
    ['7', '7'], ['8', '8'], ['9', '9'], ['\u00F7', '/'], ['\u221A', 'sqrt('],
    ['4', '4'], ['5', '5'], ['6', '6'], ['\u00D7', '*'], ['\u03C0', 'pi'],
    ['1', '1'], ['2', '2'], ['3', '3'], ['\u2212', '-'], ['!', '!'],
    ['0', '0'], ['.', '.'], ['+', '+'], ['x\u00B2', '^2'], ['ln', 'ln('],
    ['sin', 'sin('], ['cos', 'cos('], ['tan', 'tan('], ['log', 'log('], ['C(', 'C('],
    ['P(', 'P('], ['DEG', 'deg'], ['=', 'eq']
  ];
  function calcMarkup() {
    return '<div class="calcpanel hidden" id="calcpanel">' +
      '<div class="calc-grid">' + CALC_KEYS.map(function (k) {
        return '<button type="button" class="calc-key' + (k[1] === 'ac' || k[1] === 'eq' ? ' accent' : '') + '" data-t="' + k[1] + '"' +
          (k[1] === 'deg' ? ' id="calc-deg"' : '') + '>' + k[0] + '</button>';
      }).join('') + '</div>' +
      '<p class="calc-help muted tiny">C(n,r) counts combinations, P(n,r) permutations. sin/cos/tan use degrees unless set to RAD.</p></div>';
  }
  function calcInsert(text) {
    var inp = MH.qs('#ansinput'); if (!inp) return;
    var start = inp.selectionStart != null ? inp.selectionStart : inp.value.length;
    var end = inp.selectionEnd != null ? inp.selectionEnd : start;
    inp.value = inp.value.slice(0, start) + text + inp.value.slice(end);
    var pos = start + text.length;
    inp.setSelectionRange(pos, pos);
    inp.focus();
    calcPreview();
  }
  function calcPreview() {
    var inp = MH.qs('#ansinput'); var pv = MH.qs('#calc-preview'); if (!inp || !pv) return;
    var v = inp.value.trim();
    if (!v) { pv.innerHTML = ''; return; }
    var ev = MH.exprEval(v);
    pv.innerHTML = ev != null ? '= <b>' + MH.nice(ev, 8) + '</b>' : '<span class="muted">\u2026 not a valid expression</span>';
  }
  function bindCalc(p) {
    var btn = MH.qs('#btn-calc'); if (!btn) return;
    btn.onclick = function () {
      var panel = MH.qs('#calcpanel');
      var open = panel.classList.toggle('hidden') === false;
      btn.classList.toggle('active', open);
    };
    [].forEach.call(MH.qs('#calcpanel').querySelectorAll('.calc-key'), function (b) {
      b.onclick = function () {
        var t = b.dataset.t;
        var inp = MH.qs('#ansinput'); if (!inp) return;
        if (t === 'ac') { inp.value = ''; calcPreview(); inp.focus(); }
        else if (t === 'del') {
          var st = inp.selectionStart != null ? inp.selectionStart : inp.value.length;
          inp.value = inp.value.slice(0, st - 1) + inp.value.slice(st);
          inp.setSelectionRange(st - 1, st - 1); inp.focus(); calcPreview();
        }
        else if (t === 'deg') {
          MH.setDeg(!MH._deg);
          b.textContent = MH._deg ? 'DEG' : 'RAD';
          b.classList.toggle('rad', !MH._deg);
          if (inp.value.trim()) calcPreview();
        }
        else if (t === 'eq') {
          var ev = MH.exprEval(inp.value);
          if (ev != null) { inp.value = String(MH.nice(ev, 10)); calcPreview(); }
          else calcPreview();
        }
        else calcInsert(t);
      };
    });
    var inp = MH.qs('#ansinput');
    inp.addEventListener('input', calcPreview);
  }

  /* ---------------------------------------------------------- */
  /* SESSION (practice, mixed, boss)                             */
  /* ---------------------------------------------------------- */
  function overlay() { return MH.qs('#overlay'); }
  function hideOverlay() { overlay().classList.add('hidden'); overlay().innerHTML = ''; if (timerHandle) { clearInterval(timerHandle); timerHandle = null; } }

  App.startSkill = function (skillId) {
    var s = MH.skillById(skillId);
    var lvl = MH.skillLevel(skillId);
    var problems = MH.buildSession(skillId, 6, lvl);
    begin({ mode: 'practice', title: s.name, skillId: skillId, problems: problems, level: lvl, lives: null, timePer: 0 });
  };

  App.startMixed = function () {
    var ids = MH.weakSkills(6);
    if (!ids.length) return;
    var problems = MH.buildMixed(ids, 8, function (id) { return MH.skillLevel(id); });
    begin({ mode: 'mixed', title: 'Adaptive review', skillId: null, problems: problems, level: 0, lives: null, timePer: 0 });
  };

  App.startBoss = function (realmId) {
    var r = MH.CURRICULUM.realms.filter(function (x) { return x.id === realmId; })[0];
    var pool = [];
    r.skills.forEach(function (s) { pool.push(s.id); });
    var problems = [];
    for (var i = 0; i < 10; i++) {
      var id = pool[i % pool.length];
      var p = MH.buildProblem(id, MH.skillLevel(id));
      if (p) problems.push(p);
    }
    begin({ mode: 'boss', title: r.name + ' Trial', realmId: realmId, problems: problems, level: 0, lives: 3, timePer: 25 });
  };

  App.startReview = function () {
    var ids = MH.reviewDue(12).map(function (s) { return s.id; });
    if (!ids.length) { toast('Nothing is due for review yet — practise a few skills first.', 'bad'); return; }
    var problems = MH.buildMixed(ids, 10, function (id) { return MH.skillLevel(id); });
    begin({ mode: 'review', title: 'Spaced review', skillId: null, problems: problems, level: 0 });
  };

  App.startDaily = function () {
    var c = MH.dailyChallenge();
    if (!c.problems.length) return;
    begin({ mode: 'daily', title: 'Daily Challenge', skillId: c.skill.id, problems: c.problems, level: 0 });
  };

  App.startDrill = function () {
    var problems = [];
    for (var i = 0; i < 200; i++) problems.push(MH.drillProblem());
    begin({
      mode: 'drill', title: 'Lightning Round', skillId: null, problems: problems, level: 0,
      instant: true, autoNext: true, globalTimer: true, totalSeconds: 60
    });
  };

  App.startExam = function (opts) {
    opts = opts || {};
    var problems = MH.buildExam(opts);
    if (!problems.length) { toast('No questions available for that selection.', 'bad'); return; }
    begin({
      mode: 'exam', title: 'Mock Exam', skillId: null, problems: problems, level: 0,
      instant: false, autoNext: true, globalTimer: !!opts.minutes, totalSeconds: (opts.minutes || 0) * 60,
      realmIds: opts.realmIds
    });
  };

  function begin(cfg) {
    session = {
      mode: cfg.mode, title: cfg.title, skillId: cfg.skillId, realmId: cfg.realmId,
      problems: cfg.problems, level: cfg.level, idx: 0, correct: 0, streak: 0, best: 0,
      lives: cfg.lives, timePer: cfg.timePer || 0, xp: 0, answered: [], startedAt: Date.now(),
      instant: cfg.instant !== false, autoNext: !!cfg.autoNext, globalTimer: !!cfg.globalTimer,
      totalSeconds: cfg.totalSeconds || 0, realmIds: cfg.realmIds || null, wrong: []
    };
    overlay().classList.remove('hidden');
    renderProblem();
    if (session.globalTimer && session.totalSeconds) startGlobalTimer(session.totalSeconds);
  }

  function startGlobalTimer(seconds) {
    if (timerHandle) { clearInterval(timerHandle); timerHandle = null; }
    var start = Date.now(), total = seconds * 1000;
    var fill = MH.qs('#timerfill');
    if (fill) fill.style.width = '100%';
    timerHandle = setInterval(function () {
      var left = Math.max(0, total - (Date.now() - start));
      var f = MH.qs('#timerfill');
      if (f) f.style.width = (left / total * 100) + '%';
      if (left <= 0) { clearInterval(timerHandle); timerHandle = null; finishSession(); }
    }, 100);
  }

  function sessionHeader() {
    var prog = pct(session.idx, session.problems.length);
    var lives = session.lives == null ? '' : '<div class="lives">' + Array.apply(null, Array(3)).map(function (_, i) {
      return '<span class="heart' + (i < session.lives ? ' on' : '') + '">&#10084;</span>';
    }).join('') + '</div>';
    return '<div class="ses-top">' +
      '<button class="btn ghost" id="btn-quit">&times; Quit</button>' +
      (session.skillId ? '<button class="btn ghost tiny" id="btn-lesson">&#128214; Lesson</button>' : '') +
      '<div class="ses-title">' + esc(session.title) + ' <span class="chip">' + (session.idx + 1) + ' / ' + session.problems.length + '</span></div>' +
      '<div class="ses-right">' + lives + '<span class="chip">&#10003; ' + session.correct + '</span><span class="chip">&#128293; ' + session.streak + '</span></div>' +
      '</div>' +
      '<div class="bar thin"><i style="width:' + prog + '%"></i></div>' +
      (session.timePer || session.globalTimer ? '<div class="timerbar"><i id="timerfill" style="width:100%"></i></div>' : '');
  }

  function renderProblem() {
    if (session.idx >= session.problems.length) {
      if (session.mode === 'drill') { for (var di = 0; di < 100; di++) session.problems.push(MH.drillProblem()); }
      else return finishSession();
    }
    var p = session.problems[session.idx];
    var isChoice = p.answer.type === 'choice';

    overlay().innerHTML =
      '<div class="sheet">' + sessionHeader() +
        '<div class="prob">' +
          '<div class="prob-level">difficulty ' + p.level + ' / 10</div>' +
          '<div class="prob-prompt">' + MH.m(p.prompt) + '</div>' +
          '<div id="inputzone">' + (isChoice
            ? '<div class="choices">' + p.answer.choices.map(function (c, i) {
                return '<button class="choice" data-i="' + i + '">' + MH.m(c) + '</button>';
              }).join('') + '</div>'
            : '<form id="ansform" class="ansform" autocomplete="off">' +
                '<input id="ansinput" class="ansinput" placeholder="Type your answer\u2026" inputmode="' +
                  (p.answer.type === 'number' ? 'decimal' : 'text') + '" autofocus>' +
                '<button class="btn primary" type="submit">Submit</button></form>') +
          '</div>' +
          (p.answer.type === 'number'
            ? '<div class="calc-toggle-row">' +
                '<button type="button" class="btn ghost tiny" id="btn-calc">&#129518; Calculator</button>' +
                '<div id="calc-preview" class="calc-preview"></div>' +
              '</div>' +
              calcMarkup()
            : '') +
          (session.mode === 'drill' ? '<div id="drill-flash" class="drill-flash"></div>' : '') +
          (session.mode === 'exam' ? '<div class="exam-note">Answer, then press Enter or Submit &mdash; all feedback and a full report come at the end.</div>' : '') +
          '<div id="feedback" class="feedback hidden"></div>' +
        '</div>' +
      '</div>';

    MH.qs('#btn-quit').onclick = quitConfirm;
    var lb = MH.qs('#btn-lesson');
    if (lb) lb.onclick = function () { var sid = session.skillId; hideOverlay(); App.go('#/lesson/' + sid); };

    if (isChoice) {
      [].forEach.call(overlay().querySelectorAll('.choice'), function (b) {
        b.onclick = function () { submit(b.dataset.i, b); };
      });
    } else {
      var form = MH.qs('#ansform');
      var inp = MH.qs('#ansinput');
      form.onsubmit = function (e) { e.preventDefault(); submit(inp.value, null); };
      setTimeout(function () { inp.focus(); }, 30);
      bindCalc(p);
    }
    if (!session.globalTimer) startTimer();
  }

  function startTimer() {
    if (timerHandle) { clearInterval(timerHandle); timerHandle = null; }
    if (!session.timePer) return;
    var total = session.timePer * 1000, start = Date.now();
    var fill = MH.qs('#timerfill');
    timerHandle = setInterval(function () {
      var left = Math.max(0, total - (Date.now() - start));
      var f = MH.qs('#timerfill');
      if (f) f.style.width = (left / total * 100) + '%';
      if (left <= 0) { clearInterval(timerHandle); timerHandle = null; submit(null, null, true); }
    }, 100);
  }

  function submit(raw, btn, timedOut) {
    var p = session.problems[session.idx];
    var res = MH.grade(p.answer, raw);
    var correct = res.ok;

    // register progress / retention
    if (p.skill) MH.registerAnswer(p.skill, correct, p.level);
    MH.recordSolved(correct);
    if (correct) {
      session.correct++; session.streak++;
      session.best = Math.max(session.best, session.streak);
      var gain = session.mode === 'drill' ? 1 : MH.xpFor(p, true, session.streak);
      session.xp += gain;
      var rr = MH.award(gain, p.skill ? ((MH.skillById(p.skill) || {}).name || session.title) : session.title);
      MH.blip('ok');
      session._levelUp = session._levelUp || rr.levelUp;
      session._newLevel = rr.level;
    } else {
      session.streak = 0;
      MH.blip('bad');
      if (session.lives != null) session.lives--;
      if (p.skill) MH.addMistake(p);
      session.wrong.push(p);
    }
    session.answered.push({ prompt: p.prompt, correct: correct, spec: p.answer, steps: p.steps, skill: p.skill });
    renderHUD();

    // ---- exam: silent, auto-advance ----
    if (session.mode === 'exam') {
      session.idx++;
      if (session.idx >= session.problems.length) return finishSession();
      return renderProblem();
    }

    // ---- drill: quick flash, auto-advance ----
    if (session.mode === 'drill') {
      var fl = MH.qs('#drill-flash');
      if (fl) { fl.className = 'drill-flash ' + (correct ? 'good' : 'bad'); fl.innerHTML = correct ? '&#10003;' : '&#10007; ' + MH.m(MH.answerText(p)); }
      var din = MH.qs('#ansinput'); if (din) din.disabled = true;
      var dsb = overlay().querySelector('.ansform .btn'); if (dsb) dsb.disabled = true;
      [].forEach.call(overlay().querySelectorAll('.choice'), function (b) { b.disabled = true; });
      setTimeout(function () {
        session.idx++;
        if (session.idx >= session.problems.length) { for (var z = 0; z < 100; z++) session.problems.push(MH.drillProblem()); }
        renderProblem();
      }, correct ? 250 : 850);
      return;
    }

    // ---- normal: lock input and show full feedback ----
    if (btn) {
      [].forEach.call(overlay().querySelectorAll('.choice'), function (b) { b.disabled = true; });
      btn.classList.add(correct ? 'right' : 'wrong');
      if (!correct) {
        var idx = String(p.answer.value);
        [].forEach.call(overlay().querySelectorAll('.choice'), function (b) {
          if (b.dataset.i === idx) b.classList.add('right');
        });
      }
    }
    var inp = MH.qs('#ansinput'); if (inp) inp.disabled = true;
    var sb = overlay().querySelector('.ansform .btn'); if (sb) sb.disabled = true;
    if (timerHandle && !session.globalTimer) { clearInterval(timerHandle); timerHandle = null; }

    var fb = MH.qs('#feedback');
    var gain2 = correct ? MH.xpFor(p, true, session.streak) : 0;
    fb.classList.remove('hidden');
    fb.innerHTML =
      '<div class="fb-head ' + (correct ? 'good' : 'bad') + '">' +
        (correct ? '&#10003; Correct!' : (timedOut ? '&#8987; Out of time' : '&#10007; Not quite')) +
        (correct ? ' <span class="xp-plus">+' + gain2 + ' XP</span>' : ' <span class="muted">Answer: ' + MH.m(MH.answerText(p)) + '</span>') +
      '</div>' +
      '<div class="fb-body">' +
        '<p><b>Hint:</b> ' + MH.m(p.hint) + '</p>' +
        '<ol class="steps">' + (p.steps || []).map(function (s) { return '<li>' + MH.m(s) + '</li>'; }).join('') + '</ol>' +
      '</div>' +
      '<div class="fb-actions"><button class="btn primary" id="btn-next">' +
        (session.idx + 1 >= session.problems.length ? 'See results' : 'Next problem') + ' &rarr;</button></div>';
    MH.qs('#btn-next').onclick = next;
    MH.qs('#btn-next').focus();
  }

  function next() {
    var lvUp = session._levelUp;
    if (lvUp) { celebrate([], true, session._newLevel); session._levelUp = false; }
    session.idx++;
    if (session.lives != null && session.lives <= 0) return finishSession();
    renderProblem();
  }

  function quitConfirm() {
    if (session.idx === 0 && !session.answered.length) { hideOverlay(); return; }
    if (window.confirm('Quit this session? Progress so far is kept.')) finishSession(true);
  }

  function finishSession(quit) {
    if (timerHandle) { clearInterval(timerHandle); timerHandle = null; }
    var total = session.answered.length;
    var correct = session.correct;
    var perfect = total >= 5 && correct === total;
    MH.state._lastPerfect = perfect;
    MH.state.sessions++;

    // mode-specific records
    if (session.mode === 'boss' && session.realmId) {
      var b = MH.state.bosses[session.realmId] || { cleared: false, best: 0 };
      b.best = Math.max(b.best || 0, correct);
      if (correct >= 8 && session.lives > 0) b.cleared = true;
      MH.state.bosses[session.realmId] = b;
    }
    if (session.mode === 'drill') {
      MH.state.drill.plays++;
      MH.state.drill.last = correct;
      if (correct > MH.state.drill.best) MH.state.drill.best = correct;
      if (correct >= 20) MH.award(5, 'Lightning bonus');
    }
    if (session.mode === 'review') MH.state.reviewDone = (MH.state.reviewDone || 0) + correct;
    if (session.mode === 'daily') MH.completeDaily();
    if (session.mode === 'exam') {
      var pct = total ? Math.round((correct / total) * 100) : 0;
      MH.state.exams.unshift({ at: Date.now(), correct: correct, total: total, pct: pct, realms: session.realmIds });
      MH.state.exams = MH.state.exams.slice(0, 20);
      if (pct >= 90) MH.award(15, 'Mock exam distinction');
      else if (pct >= 70) MH.award(8, 'Mock exam pass');
    }
    var fresh = MH.checkAchievements();
    MH.save();
    renderHUD();

    var acc = total ? Math.round((correct / total) * 100) : 0;
    var verdict = acc === 100 ? 'Flawless run!' : acc >= 80 ? 'Strong work.' : acc >= 50 ? 'Solid — review the misses.' : 'Keep going, the reps matter.';
    var cleared = session.mode === 'boss' && correct >= 8 && session.lives > 0;
    var heading = cleared ? '&#128081; Trial cleared!'
      : session.mode === 'drill' ? '&#9889; Lightning Round: ' + correct
      : session.mode === 'exam' ? '&#128221; Exam report: ' + acc + '%'
      : session.mode === 'daily' ? '&#128197; Daily challenge complete'
      : quit ? 'Session paused' : 'Session complete';
    if (session.mode === 'drill') verdict = correct >= 30 ? 'Lightning fast!' : correct >= 20 ? 'Sharp.' : correct >= 10 ? 'Warming up.' : 'Speed comes with reps.';
    if (session.mode === 'exam') verdict = acc >= 90 ? 'Distinction level.' : acc >= 70 ? 'A solid pass — check the misses.' : acc >= 50 ? 'Getting there — target the weak realms.' : 'Treat this as a diagnostic; review every miss below.';

    var wrongList = session.answered.filter(function (a) { return !a.correct; });

    overlay().innerHTML =
      '<div class="sheet result">' +
        '<h2>' + heading + '</h2>' +
        '<p class="muted">' + verdict + '</p>' +
        (session.mode === 'drill'
          ? '<div class="result-grid">' +
              '<div><b>' + correct + '</b><small>correct in 60s</small></div>' +
              '<div><b>' + MH.state.drill.best + '</b><small>personal best</small></div>' +
              '<div><b>' + session.xp + '</b><small>XP earned</small></div>' +
            '</div>'
          : '<div class="result-grid">' +
              '<div><b>' + correct + '/' + total + '</b><small>correct</small></div>' +
              '<div><b>' + acc + '%</b><small>accuracy</small></div>' +
              '<div><b>+' + session.xp + '</b><small>XP earned</small></div>' +
              '<div><b>' + session.best + '</b><small>best streak</small></div>' +
            '</div>') +
        (wrongList.length
          ? '<details class="review" open><summary>Review ' + wrongList.length + ' missed problem(s)</summary>' +
              wrongList.map(function (a) {
                return '<div class="review-item"><div class="rp">' + MH.m(a.prompt) + '</div>' +
                  (a.skill ? '<span class="chip">' + (MH.skillById(a.skill) || {}).name + '</span>' : '') +
                  '<div class="muted">Answer: ' + MH.m(MH.answerText({ answer: a.spec })) + '</div>' +
                  '<ol class="steps">' + (a.steps || []).map(function (s) { return '<li>' + MH.m(s) + '</li>'; }).join('') + '</ol></div>';
              }).join('') + '</details>'
          : '') +
        '<div class="fb-actions">' +
          '<button class="btn primary" id="btn-again">' +
            (session.mode === 'drill' ? 'Run it back' : session.mode === 'exam' ? 'New exam' : 'Practice again') + '</button>' +
          (session.skillId ? '<button class="btn" id="btn-lesson2">&#128214; Read the lesson</button>' : '') +
          '<button class="btn" id="btn-home">Back to the map</button>' +
        '</div>' +
      '</div>';

    celebrate(fresh, session._levelUp, session._newLevel);
    MH.qs('#btn-again').onclick = function () {
      hideOverlay();
      if (session.mode === 'boss') App.startBoss(session.realmId);
      else if (session.mode === 'mixed') App.startMixed();
      else if (session.mode === 'drill') App.startDrill();
      else if (session.mode === 'daily') App.startDaily();
      else if (session.mode === 'exam') App.go('#/exam');
      else App.startSkill(session.skillId);
    };
    var l2 = MH.qs('#btn-lesson2');
    if (l2) l2.onclick = function () { var sid = session.skillId; MH.markLessonStudied(sid); hideOverlay(); App.go('#/lesson/' + sid); };
    MH.qs('#btn-home').onclick = function () {
      hideOverlay();
      App.route();
    };
  }

  /* ---------------------------------------------------------- */
  /* STATS                                                       */
  /* ---------------------------------------------------------- */
  App.viewStats = function () {
    var solved = MH.state.solved, correct = MH.state.correct;
    var acc = solved ? Math.round((correct / solved) * 100) : 0;
    var lp = MH.levelProgress(MH.state.xp);
    var mastered = MH.ALL_SKILLS.filter(function (s) { return MH.stars(s.id) >= 5; }).length;

    viewEl.innerHTML =
      '<section class="section"><div class="section-head"><h2>Character sheet</h2></div>' +
        '<div class="stat-grid">' +
          stat(lp.level, 'level') + stat(MH.state.xp.toLocaleString('en-US'), 'total XP') +
          stat(correct, 'correct answers') + stat(acc + '%', 'accuracy') +
          stat(MH.state.streak.count, 'day streak') + stat(MH.state.sessions, 'sessions') +
          stat(mastered + ' / ' + MH.ALL_SKILLS.length, 'skills mastered') +
          stat(MH.lessonsStudiedCount() + ' / ' + MH.ALL_SKILLS.length, 'lessons studied') +
          stat(MH.state.drill.best, 'lightning best') +
          stat(MH.state.exams.length, 'mock exams') +
          stat(MH.state.reviewDone || 0, 'reviews cleared') +
          stat(Object.keys(MH.state.achievements).length + ' / ' + MH.ACHIEVEMENTS.length, 'badges') +
        '</div>' +
      '</section>' +
      '<section class="section"><div class="section-head"><h2>Realm progress</h2></div>' +
        MH.CURRICULUM.realms.map(function (r) {
          var p = MH.realmPct(r);
          return '<div class="progress-row"><span class="pr-name" style="color:' + r.color + '">' + r.icon + ' ' + r.name + '</span>' +
            '<div class="bar"><i style="width:' + p + '%"></i></div>' +
            '<span class="pr-val">' + MH.realmStars(r) + '/' + MH.realmMaxStars(r) + '</span></div>';
        }).join('') +
      '</section>' +
      '<section class="section"><div class="section-head"><h2>Skill mastery</h2></div>' +
        '<div class="mastery-list">' + MH.ALL_SKILLS.map(function (s) {
          return '<div class="mastery-row"><span>' + s.name + '</span>' + stars(MH.stars(s.id)) +
            '<span class="chip">Lv ' + MH.skillState(s.id).lvl + '</span></div>';
        }).join('') + '</div>' +
      '</section>';
  };
  function stat(v, label) { return '<div class="stat"><b>' + v + '</b><small>' + label + '</small></div>'; }

  /* ---------------------------------------------------------- */
  /* ACHIEVEMENTS                                                */
  /* ---------------------------------------------------------- */
  App.viewAchievements = function () {
    viewEl.innerHTML = '<section class="section"><div class="section-head"><h2>Badges</h2>' +
      '<span class="muted">' + Object.keys(MH.state.achievements).length + ' of ' + MH.ACHIEVEMENTS.length + ' unlocked</span></div>' +
      '<div class="badge-grid">' + MH.ACHIEVEMENTS.map(function (a) {
        var got = !!MH.state.achievements[a.id];
        return '<div class="badge' + (got ? ' got' : '') + '"><div class="b-icon">' + a.icon + '</div>' +
          '<b>' + a.name + '</b><small>' + a.desc + '</small>' +
          (got ? '<span class="muted tiny">earned ' + new Date(MH.state.achievements[a.id]).toLocaleDateString() + '</span>' : '') + '</div>';
      }).join('') + '</div></section>';
  };

  /* ---------------------------------------------------------- */
  /* LESSONS                                                     */
  /* ---------------------------------------------------------- */
  function renderBlock(b, vizzes) {
    var t = b[0], v = b[1];
    switch (t) {
      case 'p': return '<p>' + MH.m(v) + '</p>';
      case 'f': return '<div class="formula">' + MH.m(v) + '</div>';
      case 'list': return '<ul class="lesson-list">' + v.map(function (x) { return '<li>' + MH.m(x) + '</li>'; }).join('') + '</ul>';
      case 'note': return '<div class="callout note">' + MH.m(v) + '</div>';
      case 'warn': return '<div class="callout warn">&#9888;&#65039; ' + MH.m(v) + '</div>';
      case 'ex': return '<div class="example"><div class="ex-q"><span class="ex-tag">Worked example</span> ' + MH.m(v.q) + '</div>' +
        (v.steps && v.steps.length ? '<ol class="steps">' + v.steps.map(function (s) { return '<li>' + MH.m(s) + '</li>'; }).join('') + '</ol>' : '') +
        '<div class="ex-a">Answer: <b>' + MH.m(v.a || '') + '</b></div></div>';
      case 'table': return '<div class="tablewrap"><table class="lesson-table"><thead><tr>' +
        v.head.map(function (h) { return '<th>' + MH.m(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        v.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + MH.m(c) + '</td>'; }).join('') + '</tr>'; }).join('') +
        '</tbody></table></div>';
      case 'viz':
        vizzes.push({ name: v, opts: b[2] || {} });
        return '<div class="viz-host" data-viz-idx="' + (vizzes.length - 1) + '"><div class="viz-loading">loading visual&hellip;</div></div>';
      default: return '';
    }
  }

  function mountVizzes(root, vizzes) {
    [].forEach.call(root.querySelectorAll('.viz-host'), function (el) {
      var v = vizzes[+el.dataset.vizIdx];
      if (!v || !MH.viz[v.name]) return;
      try { MH.viz[v.name](el, v.opts); }
      catch (e) { el.innerHTML = '<p class="muted small">Visual unavailable.</p>'; }
    });
  }

  App.viewLesson = function (id) {
    var skill = MH.skillById(id);
    var les = MH.getLesson(id);
    if (!skill || !les) return App.go('#/map');
    var realm = MH.CURRICULUM.realms.filter(function (r) { return r.id === skill.realm; })[0] || { color: 'var(--accent)' };
    var vizzes = [];
    var studied = MH.lessonStudied(id);
    var st = MH.skillState(id);

    var html = '<section class="lesson">' +
      '<a class="back" href="#/realm/' + skill.realm + '">&larr; ' + realm.name + '</a>' +
      '<div class="lesson-hero" style="--c:' + realm.color + '">' +
        '<span class="lesson-tag">Lesson</span>' +
        '<h1>' + skill.name + '</h1>' +
        '<p class="lesson-hook">' + MH.m(les.hook) + '</p>' +
        '<div class="lesson-meta"><span class="chip">&#9733; ' + MH.stars(id) + ' mastery</span>' +
          '<span class="chip">Level ' + st.lvl + '</span>' +
          (studied ? '<span class="chip ok">&#10003; studied</span>' : '') + '</div>' +
      '</div>';

    if (les.viz) html += renderBlock(['viz', les.viz], vizzes);

    (les.s || []).forEach(function (sec) {
      html += '<div class="lesson-section"><h2>' + MH.m(sec.h) + '</h2>' +
        (sec.b || []).map(function (b) { return renderBlock(b, vizzes); }).join('') + '</div>';
    });

    if (les.f && les.f.length) {
      html += '<div class="lesson-section formulas"><h2>Formula sheet</h2><ul class="formula-list">' +
        les.f.map(function (f) { return '<li>' + MH.m(f) + '</li>'; }).join('') + '</ul></div>';
    }
    if (les.tips && les.tips.length) {
      html += '<div class="lesson-section"><h2>Study tips</h2><ul class="lesson-list tips">' +
        les.tips.map(function (t) { return '<li>' + MH.m(t) + '</li>'; }).join('') + '</ul></div>';
    }

    html += '<div class="lesson-actions">' +
      '<button class="btn primary big" id="les-practice">&#9654; Practice this skill</button>' +
      '<button class="btn" id="les-done">' + (studied ? '&#10003; Learned' : '&#10003; Mark as learned') + '</button>' +
      '<a class="btn ghost" href="#/map">Back to map</a>' +
      '</div></section>';

    viewEl.innerHTML = html;
    mountVizzes(viewEl, vizzes);

    MH.qs('#les-practice').onclick = function () { MH.markLessonStudied(id); App.startSkill(id); };
    MH.qs('#les-done').onclick = function () {
      MH.markLessonStudied(id);
      toast('&#128218; Lesson marked as learned.', 'good');
      App.viewLesson(id);
    };
  };

  /* ---------------------------------------------------------- */
  /* LEARNING PATHS                                              */
  /* ---------------------------------------------------------- */
  App.viewPaths = function () {
    var cur = MH.state.path;
    viewEl.innerHTML =
      '<section class="section">' +
        '<div class="section-head"><h2>Learning paths</h2><span class="muted small">Choose a goal &mdash; the home screen then guides you step by step.</span></div>' +
        '<div class="path-grid">' + MH.PATHS.map(function (p) {
          var pr = MH.pathProgress(p);
          var nx = MH.skillById(pr.next) || { name: '&mdash;', id: '' };
          return '<div class="path-card' + (p.id === cur ? ' sel' : '') + '" style="--c:' + p.color + '">' +
            '<div class="pc-head"><span class="pc-icon">' + p.icon + '</span><div><b>' + p.name + '</b><small>' + p.blurb + '</small></div></div>' +
            '<div class="bar"><i style="width:' + pr.pct + '%"></i></div>' +
            '<small class="muted">' + pr.done + '/' + pr.total + ' steps done &middot; ' + pr.mastered + ' mastered</small>' +
            (p.id === cur ? '<div class="pc-next">Next step: <a href="#/lesson/' + nx.id + '">' + nx.name + '</a></div>' : '') +
            '<div class="sc-actions">' +
              '<button class="btn tiny primary" data-use="' + p.id + '">' + (p.id === cur ? '&#10003; Current' : 'Use this path') + '</button>' +
              '<button class="btn tiny" data-go="' + pr.next + '">Continue &rarr;</button>' +
            '</div></div>';
        }).join('') + '</div>' +
      '</section>';
    [].forEach.call(viewEl.querySelectorAll('[data-use]'), function (b) {
      b.onclick = function () { MH.state.path = b.dataset.use; MH.save(); App.viewPaths(); toast('Path set: ' + MH.getPath(b.dataset.use).name, 'good'); };
    });
    [].forEach.call(viewEl.querySelectorAll('[data-go]'), function (b) {
      b.onclick = function () { App.go('#/lesson/' + b.dataset.go); };
    });
  };

  /* ---------------------------------------------------------- */
  /* MISTAKE NOTEBOOK                                            */
  /* ---------------------------------------------------------- */
  App.viewNotebook = function () {
    var ms = MH.state.mistakes;
    viewEl.innerHTML =
      '<section class="section">' +
        '<div class="section-head"><h2>Mistake notebook</h2>' +
          (ms.length ? '<button class="btn danger tiny" id="nb-clear">Clear all</button>' : '') + '</div>' +
        '<p class="muted">Every problem you miss is saved here automatically, with the full worked solution. Retry a skill to overwrite a mistake with success.</p>' +
        (ms.length ? ms.map(function (m) {
          var sk = MH.skillById(m.skill) || {};
          return '<div class="nb-item"><div class="nb-head"><span class="chip">' + sk.name + '</span>' +
            '<span class="muted tiny">' + new Date(m.at).toLocaleString() + '</span></div>' +
            '<div class="rp">' + MH.m(m.prompt) + '</div>' +
            '<div class="muted">Answer: ' + MH.m(MH.answerText({ answer: m.spec })) + '</div>' +
            '<ol class="steps">' + (m.steps || []).map(function (s) { return '<li>' + MH.m(s) + '</li>'; }).join('') + '</ol>' +
            '<div class="sc-actions">' +
              '<button class="btn tiny primary" data-retry="' + m.skill + '">Retry this skill</button>' +
              '<a class="btn tiny" href="#/lesson/' + m.skill + '">Read lesson</a>' +
            '</div></div>';
        }).join('') : '<p class="muted">Nothing here yet &mdash; excellent.</p>') +
      '</section>';
    var c = MH.qs('#nb-clear');
    if (c) c.onclick = function () { if (window.confirm('Clear the whole mistake notebook?')) { MH.clearMistakes(); App.viewNotebook(); } };
    [].forEach.call(viewEl.querySelectorAll('[data-retry]'), function (b) {
      b.onclick = function () { App.startSkill(b.dataset.retry); };
    });
  };

  /* ---------------------------------------------------------- */
  /* MOCK EXAM                                                   */
  /* ---------------------------------------------------------- */
  App.viewExam = function () {
    viewEl.innerHTML =
      '<section class="section">' +
        '<div class="section-head"><h2>Mock exam</h2></div>' +
        '<p class="muted">No hints, no instant feedback &mdash; just like a real test. You get a full report with worked solutions at the end.</p>' +
        '<div class="exam-config">' +
          '<div class="cfg-block"><h3>Realms to include</h3><div class="exam-realms">' +
            MH.CURRICULUM.realms.map(function (r) {
              var locked = !MH.realmUnlocked(r, MH.CURRICULUM.realms);
              return '<label class="exam-realm' + (locked ? ' locked' : '') + '">' +
                '<input type="checkbox" data-realm="' + r.id + '"' + (locked ? ' disabled' : '') + ' checked> ' +
                '<span style="color:' + r.color + '">' + r.icon + '</span> ' + r.name + '</label>';
            }).join('') + '</div></div>' +
          '<div class="cfg-block">' +
            '<h3>Length</h3><select id="ex-count"><option value="10">10 questions</option><option value="15" selected>15 questions</option><option value="20">20 questions</option><option value="30">30 questions</option></select>' +
            '<h3>Time limit</h3><select id="ex-time"><option value="0">No limit</option><option value="20">20 minutes</option><option value="30" selected>30 minutes</option><option value="45">45 minutes</option><option value="60">60 minutes</option></select>' +
            '<button class="btn primary big" id="ex-start">&#128221; Start exam</button>' +
          '</div>' +
        '</div>' +
        '<div class="section-head" style="margin-top:28px"><h2>Past exams</h2></div>' +
        (MH.state.exams.length
          ? '<ul class="activity">' + MH.state.exams.map(function (e) {
              return '<li><b>' + e.pct + '%</b> <span class="muted">' + e.correct + '/' + e.total + ' &middot; ' + new Date(e.at).toLocaleString() + '</span></li>';
            }).join('') + '</ul>'
          : '<p class="muted">No exams yet.</p>') +
      '</section>';
    MH.qs('#ex-start').onclick = function () {
      var ids = [].map.call(viewEl.querySelectorAll('input[data-realm]:checked'), function (c) { return c.dataset.realm; });
      if (!ids.length) { toast('Pick at least one realm.', 'bad'); return; }
      App.startExam({ realmIds: ids, count: parseInt(MH.qs('#ex-count').value, 10), minutes: parseInt(MH.qs('#ex-time').value, 10) });
    };
  };

  /* ---------------------------------------------------------- */
  /* CODEX                                                       */
  /* ---------------------------------------------------------- */
  App.viewCodex = function () {
    var q = (App._codexQuery || '').toLowerCase();
    viewEl.innerHTML =
      '<section class="section"><div class="section-head"><h2>Codex</h2>' +
        '<input id="codex-search" class="ansinput small" placeholder="Search formulas and topics\u2026" value="' + esc(App._codexQuery || '') + '"></div>' +
      MH.CURRICULUM.realms.map(function (r) {
        var skills = r.skills.filter(function (s) {
          return !q || (s.name + ' ' + s.blurb + ' ' + r.name).toLowerCase().indexOf(q) !== -1;
        });
        if (!skills.length) return '';
        return '<div class="codex-realm"><h3 style="color:' + r.color + '">' + r.icon + ' ' + r.name + '</h3>' +
          skills.map(function (s) {
            return '<div class="codex-item"><b>' + s.name + '</b><p>' + s.blurb + '</p>' +
              '<button class="btn tiny" data-practice="' + s.id + '">Practice &rarr;</button></div>';
          }).join('') + '</div>';
      }).join('') + '</section>';
    var si = MH.qs('#codex-search');
    si.oninput = function () { App._codexQuery = si.value; var pos = si.selectionStart; App.viewCodex(); var n = MH.qs('#codex-search'); n.focus(); n.setSelectionRange(pos, pos); };
    [].forEach.call(viewEl.querySelectorAll('[data-practice]'), function (b) {
      b.onclick = function () { App.startSkill(b.dataset.practice); };
    });
  };

  /* ---------------------------------------------------------- */
  /* SETTINGS                                                    */
  /* ---------------------------------------------------------- */
  App.viewSettings = function () {
    var s = MH.state.settings;
    viewEl.innerHTML =
      '<section class="section"><div class="section-head"><h2>Settings</h2></div>' +
        '<div class="settings-list">' +
          toggleRow('sound', 'Sound effects', s.sound) +
          toggleRow('timer', 'Boss-battle timer', s.timer) +
          toggleRow('unlockAll', 'Unlock every realm (free explore)', s.unlockAll) +
          '<div class="setting-row"><span>Daily goal (problems)</span>' +
            '<input id="goal" class="ansinput small" type="number" min="5" max="100" value="' + MH.state.daily.goal + '"></div>' +
          '<div class="setting-row"><span>Danger zone</span><button class="btn danger" id="btn-reset">Reset all progress</button></div>' +
          '<div class="setting-row"><span>Backup &mdash; export your progress to a file</span>' +
            '<span><button class="btn" id="btn-export">&#11015; Export</button> <button class="btn" id="btn-import">&#11014; Import</button>' +
            '<input type="file" id="import-file" accept="application/json,.json" style="display:none"></span></div>' +
        '</div>' +
      '</section>';
    MH.qs('#btn-export').onclick = function () {
      try {
        var blob = new Blob([MH.exportProgress()], { type: 'application/json' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = 'csmath-hero-' + MH.todayKey() + '.json';
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
        toast('Progress exported.', 'good');
      } catch (e) { toast('Export failed in this browser.', 'bad'); }
    };
    MH.qs('#btn-import').onclick = function () { MH.qs('#import-file').click(); };
    MH.qs('#import-file').onchange = function (e) {
      var f = e.target.files && e.target.files[0]; if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        if (MH.importProgress(reader.result)) { renderHUD(); App.viewSettings(); toast('Progress imported.', 'good'); }
        else toast('That file was not a CSMath Hero save.', 'bad');
      };
      reader.readAsText(f);
    };
    [].forEach.call(viewEl.querySelectorAll('[data-toggle]'), function (el) {
      el.onclick = function () { s[el.dataset.toggle] = !s[el.dataset.toggle]; MH.save(); App.viewSettings(); };
    });
    MH.qs('#goal').onchange = function () { MH.state.daily.goal = MH.clamp(parseInt(this.value, 10) || 20, 5, 100); MH.save(); renderHUD(); };
    MH.qs('#btn-reset').onclick = function () {
      if (window.confirm('Erase ALL progress, XP, and badges? This cannot be undone.')) {
        MH.reset(); renderHUD(); App.viewHome(); toast('Progress reset.', 'bad');
      }
    };
  };
  function toggleRow(key, label, on) {
    return '<div class="setting-row"><span>' + label + '</span>' +
      '<button class="switch' + (on ? ' on' : '') + '" data-toggle="' + key + '"><i></i></button></div>';
  }

  /* ---------------------------------------------------------- */
  /* keyboard shortcuts                                          */
  /* ---------------------------------------------------------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { if (!overlay().classList.contains('hidden')) quitConfirm(); }
    if (session && !overlay().classList.contains('hidden')) {
      if (e.key === 'Enter' && MH.qs('#btn-next') && document.activeElement === document.body) next();
      if (session.problems[session.idx] && session.problems[session.idx].answer.type === 'choice' && /^[1-4]$/.test(e.key)) {
        var b = overlay().querySelector('.choice[data-i="' + (parseInt(e.key, 10) - 1) + '"]');
        if (b && !b.disabled) b.click();
      }
    }
  });
})(window.MH);
