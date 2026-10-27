/* ============================================================
   Cyber Aware - ui.js
   Router + views: welcome, home, tracks, module (lesson +
   activity), tool box, final assessment, certificate, badges.
   ============================================================ */
(function (CY) {
  'use strict';

  var App = CY.App = {};
  var root, viewEl;
  var actState = null;

  App.boot = function () {
    CY.load();
    root = CY.qs('#app');
    root.innerHTML =
      '<header class="topbar">' +
        '<div class="brand" id="brand"><span class="logo">&#128737;</span><b>Cyber Aware</b>' +
          '<small class="brand-sub">free security &amp; information-assurance training</small></div>' +
        '<div class="hud" id="hud"></div>' +
      '</header>' +
      '<main id="view" class="view"></main>' +
      '<div id="toasts" class="toasts"></div>';
    viewEl = CY.qs('#view');
    CY.qs('#brand').addEventListener('click', function () { App.go('#/home'); });
    window.addEventListener('hashchange', App.route);
    App.route();
  };

  App.route = function () {
    var h = location.hash || '#/home';
    renderHUD();
    if (h.indexOf('#/module/') === 0) return App.viewModule(h.slice(9));
    if (h.indexOf('#/track/') === 0) return App.viewTrack(h.slice(8));
    if (h === '#/tracks') return App.viewTracks();
    if (h === '#/tools') return App.viewTools();
    if (h === '#/assessment') return App.viewAssessment();
    if (h === '#/certificate') return App.viewCertificate();
    if (h === '#/badges') return App.viewBadges();
    if (h === '#/settings') return App.viewSettings();
    return App.viewHome();
  };
  App.go = function (h) { if (location.hash === h) App.route(); else location.hash = h; window.scrollTo(0, 0); };

  /* ---------------- HUD ---------------- */
  function renderHUD() {
    var lp = CY.levelProgress(CY.state.xp);
    var core = CY.coreProgress();
    CY.qs('#hud').innerHTML =
      '<div class="hud-item level" title="' + CY.esc(CY.titleFor(lp.level)) + '">' +
        '<span class="lv">Lv ' + lp.level + '</span><div class="xpbar"><i style="width:' + lp.pct + '%"></i></div></div>' +
      '<div class="hud-item">&#128293; <b>' + CY.state.streak.count + '</b></div>' +
      '<div class="hud-item">&#128737; <b>' + core.done + '/' + core.total + '</b></div>' +
      '<nav class="hud-nav"><a href="#/home">Home</a><a href="#/tracks">Training</a><a href="#/tools">Tool box</a>' +
        '<a href="#/assessment">Assessment</a><a href="#/certificate">Certificate</a></nav>';
  }
  function celebrate(levelUp, level, badges) {
    if (levelUp) CY.toast('&#11014; Level up! You are now level <b>' + level + '</b> &mdash; ' + CY.titleFor(level), 'good');
    (badges || []).forEach(function (b) { setTimeout(function () { CY.toast(b.icon + ' Badge: <b>' + b.name + '</b>', 'badge'); }, 200); });
  }
  function ring(pct) {
    var size = 100, r = (size - 8) / 2, c = 2 * Math.PI * r, off = c * (1 - CY.clamp(pct, 0, 100) / 100);
    return '<svg class="ring" width="' + size + '" height="' + size + '">' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke="rgba(255,255,255,.12)" stroke-width="7" fill="none"/>' +
      '<circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" stroke="url(#grad)" stroke-width="7" fill="none" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + off + '" transform="rotate(-90 ' + size / 2 + ' ' + size / 2 + ')"/></svg>';
  }
  function defs() { return '<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="grad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#38bdf8"/><stop offset="1" stop-color="#a855f7"/></linearGradient></defs></svg>'; }

  /* ---------------- HOME ---------------- */
  App.viewHome = function () {
    var lp = CY.levelProgress(CY.state.xp);
    var core = CY.coreProgress();
    var next = nextCoreModule();
    var eligible = CY.certificateEligible();

    if (!CY.state.name) return welcomeScreen();

    viewEl.innerHTML = defs() +
      '<section class="hero">' +
        '<div class="hero-main">' +
          '<p class="eyebrow">Welcome back, ' + CY.esc(CY.state.name.split(' ')[0]) + '</p>' +
          '<h1>' + CY.titleFor(lp.level) + '</h1>' +
          '<p class="muted">Your free cybersecurity awareness training &middot; core track about ' + CY.coreMinutes() + ' minutes &middot; plus an optional technical track.</p>' +
          '<div class="hero-actions">' +
            (next ? '<button class="btn primary big" id="btn-next">&#9654; ' + (core.done ? 'Continue' : 'Start training') + ': ' + CY.esc(stripTags(next.title)) + '</button>'
                  : '<button class="btn primary big" id="btn-assess">&#128221; Take the final assessment</button>') +
            '<button class="btn big" id="btn-tracks">&#128218; All training</button>' +
            '<button class="btn" id="btn-tools">&#129520; Tool box</button>' +
            (eligible ? '<button class="btn" id="btn-cert">&#128220; Your certificate</button>' : '') +
          '</div>' +
          '<p class="muted small">Need ' + CY.ASSESSMENT.passPct + '% on the assessment to earn your certificate. ' + core.done + ' of ' + core.total + ' core modules complete.</p>' +
        '</div>' +
        '<div class="hero-side"><div class="ring-wrap">' + ring(core.pct) + '<div class="ring-label"><b>' + core.pct + '%</b><small>core training</small></div></div>' +
          '<div class="mini-stats"><div><b>' + CY.state.streak.count + '</b><small>day streak</small></div>' +
            '<div><b>' + Object.keys(CY.state.badges).length + '</b><small>badges</small></div>' +
            '<div><b>' + CY.state.xp + '</b><small>points</small></div></div></div>' +
      '</section>' +

      '<section class="section"><div class="section-head"><h2>Your training plan</h2></div>' +
        '<div class="plan-grid">' +
          planCard('1', 'Core modules', core.done + '/' + core.total + ' done', core.pct, 'Complete every module. Each is a 4&ndash;6 minute read plus a short activity.', '#/tracks', core.pct === 100) +
          planCard('2', 'Final assessment', CY.state.assessment.passed ? 'Passed &mdash; ' + CY.state.assessment.best + '%' : 'Not taken yet', CY.state.assessment.best, 'Fifteen questions across everything. ' + CY.ASSESSMENT.passPct + '% to pass.', '#/assessment', CY.state.assessment.passed) +
          planCard('3', 'Certificate', eligible ? 'Ready to print' : 'Locked', eligible ? 100 : 0, 'Finish the modules and pass the assessment to unlock it.', '#/certificate', eligible) +
        '</div></section>' +

      '<section class="section"><div class="section-head"><h2>Explore</h2></div>' +
        '<div class="track-strip">' + CY.TRACKS.map(trackCard).join('') + '</div></section>' +

      (CY.state.log.length ? '<section class="section"><div class="section-head"><h2>Recent activity</h2></div><ul class="activity">' +
        CY.state.log.slice(0, 6).map(function (l) { return '<li><span class="xp-plus">+' + l.xp + '</span> <span class="muted">' + CY.esc(stripTags(l.reason)) + '</span></li>'; }).join('') + '</ul></section>' : '');

    if (next) CY.qs('#btn-next').onclick = function () { App.go('#/module/' + next.id); };
    var ba = CY.qs('#btn-assess'); if (ba) ba.onclick = function () { App.go('#/assessment'); };
    CY.qs('#btn-tracks').onclick = function () { App.go('#/tracks'); };
    CY.qs('#btn-tools').onclick = function () { App.go('#/tools'); };
    var bc = CY.qs('#btn-cert'); if (bc) bc.onclick = function () { App.go('#/certificate'); };
    bindTrackCards();
  };

  function welcomeScreen() {
    viewEl.innerHTML = defs() +
      '<section class="hero welcome">' +
        '<div class="hero-main">' +
          '<p class="eyebrow">Free &middot; no sign-up &middot; about 40 minutes</p>' +
          '<h1>&#128737; Cyber Aware</h1>' +
          '<p class="big-p">A friendly, practical guide to staying safe online at work &mdash; phishing, passwords, data, devices, and what to do when something goes wrong. Built for everyone, not just IT.</p>' +
          '<label class="name-field"><span>Your name (used on your certificate)</span>' +
            '<input id="welcome-name" class="ansinput" placeholder="e.g. Alex Morgan" autofocus></label>' +
          '<div class="hero-actions"><button class="btn primary big" id="welcome-start">&#9654; Start training</button>' +
            '<button class="btn" id="welcome-tools">&#129520; Just explore the tools</button></div>' +
          '<p class="muted small">Your progress is stored only in this browser. Nothing is sent anywhere.</p>' +
        '</div>' +
      '</section>' +
      '<section class="section"><div class="section-head"><h2>What you will learn</h2></div>' +
        '<div class="learn-grid">' + [
          ['&#127907;', 'Spot phishing', 'Link tricks, urgency, CEO fraud, and how to report.'],
          ['&#128274;', 'Lock your accounts', 'Passphrases, password managers, and MFA.'],
          ['&#128451;', 'Protect data', 'Classification, privacy, and safe sharing.'],
          ['&#128421;', 'Work anywhere safely', 'Devices, public Wi-Fi, and remote work.'],
          ['&#128680;', 'Respond well', 'Reporting, containing, and learning from incidents.'],
          ['&#129520;', 'Advanced (optional)', 'Cryptography, zero trust, cloud, and secure coding.']
        ].map(function (x) { return '<div class="learn-card"><span class="lc-icon">' + x[0] + '</span><b>' + x[1] + '</b><small>' + x[2] + '</small></div>'; }).join('') + '</div></section>';
    CY.qs('#welcome-start').onclick = function () { saveName(); };
    CY.qs('#welcome-tools').onclick = function () { saveName(); App.go('#/tools'); };
    CY.qs('#welcome-name').onkeydown = function (e) { if (e.key === 'Enter') saveName(); };
    function saveName() {
      var n = (CY.qs('#welcome-name').value || '').trim();
      CY.state.name = n || 'Guest Learner';
      CY.save();
      renderHUD();
      CY.toast('Welcome, ' + CY.esc(CY.state.name.split(' ')[0]) + '! Let us build some habits. &#128737;', 'good');
      App.go('#/tracks');
    }
  }

  function planCard(n, title, status, pct, desc, href, done) {
    return '<button class="plan-card' + (done ? ' done' : '') + '" data-href="' + href + '">' +
      '<span class="pc-num">' + (done ? '&#10003;' : n) + '</span>' +
      '<span class="pc-body"><b>' + title + '</b> <span class="chip ' + (done ? 'ok' : '') + '">' + status + '</span>' +
        '<small>' + desc + '</small><div class="bar"><i style="width:' + pct + '%"></i></div></span></button>';
  }
  function trackCard(t) {
    var p = CY.trackProgress(t);
    return '<button class="track-card" data-track="' + t.id + '" style="--c:' + t.color + '">' +
      '<div class="tc-icon">' + t.icon + '</div><div class="tc-body"><b>' + t.name + '</b>' +
      '<small>' + t.blurb + '</small><div class="bar"><i style="width:' + p.pct + '%"></i></div>' +
      '<small class="muted">' + p.done + '/' + p.total + ' modules &middot; ' + (t.audience === 'advanced' ? 'technical' : 'everyone') + '</small></div></button>';
  }
  function bindTrackCards() {
    CY.qsa('.track-card').forEach(function (b) { b.onclick = function () { App.go('#/track/' + b.dataset.track); }; });
    CY.qsa('.plan-card').forEach(function (b) { b.onclick = function () { App.go(b.dataset.href); }; });
  }
  function nextCoreModule() {
    var ms = CY.coreModules();
    for (var i = 0; i < ms.length; i++) if (!CY.moduleDone(ms[i].id)) return ms[i];
    return null;
  }
  function stripTags(s) { return String(s == null ? '' : s).replace(/<[^>]+>/g, '').replace(/&#8217;/g, "'").replace(/&amp;/g, '&'); }

  /* ---------------- TRACKS ---------------- */
  function trackBlock(t) {
    var p = CY.trackProgress(t);
    return '<div class="track-block" style="--c:' + t.color + '">' +
      '<div class="tb-head"><span class="tc-icon">' + t.icon + '</span><div><h3>' + t.name + '</h3>' +
        '<p class="muted small">' + t.blurb + '</p></div><span class="tb-score">' + p.done + '/' + p.total + '</span></div>' +
      '<div class="module-list">' + t.modules.map(function (m, i) {
        var learned = CY.moduleLearned(m.id), done = CY.moduleDone(m.id);
        return '<button class="module-row' + (done ? ' done' : '') + '" data-m="' + m.id + '">' +
          '<span class="mr-num">' + (done ? '&#10003;' : (i + 1)) + '</span>' +
          '<span class="mr-body"><b>' + m.title + '</b><small class="muted">' + (m.minutes || 4) + ' min &middot; ' + kindLabel(m.activity) + spChips(m.id) + '</small></span>' +
          '<span class="mr-status">' + (learned ? '<span class="chip ok">&#128214;</span>' : '<span class="chip">read</span>') +
            (done ? '<span class="chip ok">&#10003; done</span>' : '') + '</span></button>';
      }).join('') + '</div></div>';
  }
  function bindModuleRows() { CY.qsa('.module-row').forEach(function (b) { b.onclick = function () { App.go('#/module/' + b.dataset.m); }; }); }

  App.viewTracks = function () {
    var cov = CY.spCoverage();
    viewEl.innerHTML = defs() + '<section class="section"><div class="section-head"><h2>Training</h2>' +
      '<span class="muted small">Everything is free and works offline.</span></div>' +
      CY.TRACKS.map(trackBlock).join('') + '</section>' +
      '<section class="section"><div class="sp-cover"><h3>&#127891; Built on the Security+ fundamentals</h3>' +
        '<p class="muted small">This is <b>awareness training</b>, not a certification course &mdash; but every module reinforces the same foundational knowledge tested in CompTIA Security+ (SY0-701). Domains covered:</p>' +
        '<div class="sp-rows">' + CY.SECPLUS.map(function (d) {
          return '<div class="sp-row"><span class="sp-num">' + d.n + '</span><span class="sp-name">' + d.name + '</span>' +
            '<span class="muted small">' + (cov[d.n] || 0) + ' modules</span></div>';
        }).join('') + '</div></div></section>';
    bindModuleRows();
  };

  App.viewTrack = function (id) {
    var t = CY.trackById(id);
    if (!t) return App.viewTracks();
    viewEl.innerHTML = defs() + '<section class="section"><a class="back" href="#/tracks">&larr; all training</a>' + trackBlock(t) + '</section>';
    bindModuleRows();
  };
  function kindLabel(a) { return !a ? 'lesson' : a.kind === 'quiz' ? 'quiz' : a.kind === 'scenario' ? 'scenario' : a.kind === 'order' ? 'activity' : a.kind === 'match' ? 'activity' : a.kind === 'pick' ? 'activity' : a.kind === 'phish' ? 'inbox drill' : a.kind === 'password' ? 'password lab' : 'activity'; }
  function spChips(id) { var a = CY.spFor(id); return a.length ? ' &middot; ' + a.map(function (n) { return 'Sec+ ' + n; }).join(', ') : ''; }

  /* ---------------- MODULE ---------------- */
  App.viewModule = function (id) {
    var m = CY.moduleById(id);
    if (!m) return App.go('#/tracks');
    var t = CY.trackOfModule(id) || { color: '#38bdf8', name: '' };
    actState = { module: m, done: false };
    CY._vizQueue = [];

    viewEl.innerHTML = defs() +
      '<section class="module">' +
        '<a class="back" href="#/track/' + (t.id || '') + '">&larr; ' + CY.esc(t.name) + '</a>' +
        (function () {
          // prev / next quick nav so learners never dead-end on a module page
          var ms = (t.modules || []), i = ms.map(function (x) { return x.id; }).indexOf(id);
          var prev = i > 0 ? ms[i - 1] : null, next = i > -1 && i < ms.length - 1 ? ms[i + 1] : null;
          if (!prev && !next) return '';
          return '<div class="module-nav">' +
            (prev ? '<a class="btn tiny ghost" href="#/module/' + prev.id + '">&larr; ' + stripTags(prev.title) + '</a>' : '<span></span>') +
            '<span class="muted small">' + (i + 1) + ' / ' + ms.length + '</span>' +
            (next ? '<a class="btn tiny ghost" href="#/module/' + next.id + '">' + stripTags(next.title) + ' &rarr;</a>' : '<span></span>') +
            '</div>';
        })() +
        '<div class="module-hero" style="--c:' + t.color + '">' +
          '<span class="lesson-tag">' + (t.audience === 'advanced' ? 'Advanced' : 'Core') + ' &middot; ' + (m.minutes || 4) + ' min</span>' +
          '<h1>' + m.title + '</h1>' +
          '<p class="lesson-hook">' + CY.m(m.lesson.hook) + '</p>' +
          '<div class="module-meta">' + CY.spFor(id).map(function (n) { return '<span class="chip">Security+ ' + n + ' &middot; ' + CY.spName(n) + '</span>'; }).join('') + '</div>' +
        '</div>' +
        '<div class="lesson-body">' + (m.lesson.blocks || []).map(CY.renderBlock).join('') + '</div>' +
        '<div class="lesson-actions">' +
          '<button class="btn ' + (CY.moduleLearned(id) ? '' : 'primary') + '" id="les-read">' + (CY.moduleLearned(id) ? '&#10003; Read' : '&#10003; Mark as read') + '</button>' +
          '<button class="btn primary big" id="act-start">' + (CY.moduleDone(id) ? 'Replay the ' : 'Start the ') + kindLabel(m.activity) + ' &rarr;</button>' +
        '</div>' +
        '<div id="activity-zone"></div>' +
      '</section>';

    mountVizzes();
    CY.qs('#les-read').onclick = function () { CY.markLearned(id); renderHUD(); CY.toast('&#128214; Marked as read.', 'good'); App.viewModule(id); };
    CY.qs('#act-start').onclick = function () { startActivity(id, m, t); };
  };

  function mountVizzes() {
    CY.qsa('.viz-host', viewEl).forEach(function (el) {
      var item = CY._vizQueue[+el.dataset.vizIdx];
      if (item && CY.widget[item.name]) { try { CY.widget[item.name](el, item.opts || {}); } catch (e) { el.innerHTML = '<p class="muted small">Tool unavailable.</p>'; } }
    });
  }

  function startActivity(id, m, t) {
    var zone = CY.qs('#activity-zone');
    zone.innerHTML = '<h2 class="act-title">Your turn</h2><div id="act-host"></div>';
    CY.renderActivity(CY.qs('#act-host'), m, m.activity, function (success, pct) {
      if (!success) { CY.toast('Not quite &mdash; have another go. The explanations are right there.', 'bad'); return; }
      CY.markLearned(id);
      CY.markModuleDone(id);
      var badges = CY.checkBadges();
      renderHUD();
      var next = nextModuleInTrack(t, id);
      var host = CY.qs('#act-host');
      var box = CY.el('div', { class: 'module-complete', html: '&#127881; <b>Module complete!</b> ' +
        (next ? 'Ready for <b>' + stripTags(next.title) + '</b>.' : 'That is the end of this track &mdash; nice.') });
      host.appendChild(box);
      var actions = CY.el('div', { class: 'fb-actions' });
      if (next) actions.appendChild(CY.el('button', { class: 'btn primary', html: 'Next: ' + stripTags(next.title) + ' &rarr;', onclick: function () { App.go('#/module/' + next.id); } }));
      else if (CY.coreComplete() && !CY.state.assessment.passed) actions.appendChild(CY.el('button', { class: 'btn primary', html: '&#128221; Take the final assessment', onclick: function () { App.go('#/assessment'); } }));
      actions.appendChild(CY.el('a', { class: 'btn ghost', href: '#/tracks', html: 'All training' }));
      host.appendChild(actions);
      CY.toast('&#9989; Completed: ' + stripTags(m.title), 'good');
      celebrate(false, 0, badges);
    });
  }
  function nextModuleInTrack(t, id) {
    var ms = t.modules, i = ms.map(function (x) { return x.id; }).indexOf(id);
    for (var j = i + 1; j < ms.length; j++) if (!CY.moduleDone(ms[j].id)) return ms[j];
    return null;
  }

  /* ---------------- TOOL BOX ---------------- */
  App.viewTools = function () {
    var tools = [
      { id: 'passwordlab', title: '&#128273; Password strength lab', sub: 'Test a passphrase and see how long it would take to crack.' },
      { id: 'linkinspector', title: '&#128279; Link inspector', sub: 'Can you tell where these links really go?' },
      { id: 'phishinbox', title: '&#127907; Phishing inbox', sub: 'Open an email and click to reveal the red flags.' },
      { id: 'mfa', title: '&#128241; MFA demo', sub: 'See why a stolen password is not enough with MFA on.' },
      { id: 'crypto', title: '&#128272; Hash vs encryption', sub: 'One is reversible, the other is not.' },
      { id: 'wifi', title: '&#128225; Public Wi-Fi', sub: 'What an attacker on the network can see.' },
      { id: 'classify', title: '&#128451; Classify the data', sub: 'Practice labelling data Public &rarr; Restricted.' },
      { id: 'sqlinject', title: '&#128187; Injection demo', sub: 'See why parameterised queries matter (technical).' },
      { id: 'attackmatrix', title: '&#9876; Attack chain', sub: 'How attackers move from access to impact (technical).' }
    ];
    viewEl.innerHTML = defs() + '<section class="section"><div class="section-head"><h2>Tool box</h2>' +
      '<span class="muted small">Play with the concepts. Nothing here is graded.</span></div>' +
      '<div class="tool-list">' + tools.map(function (t, i) {
        return '<button class="tool-item" data-tool="' + i + '"><b>' + t.title + '</b><small>' + t.sub + '</small></button>';
      }).join('') + '</div><div id="tool-zone"></div></section>';
    var SAMPLE = {
      classify: { items: [
        { text: 'The company&#8217;s public LinkedIn page', answer: 'Public', why: 'Published for anyone.' },
        { text: 'The internal org chart', answer: 'Internal', why: 'Fine inside the company; not for outsiders.' },
        { text: 'A signed customer contract', answer: 'Confidential', why: 'Commercially sensitive and personal to the customer.' },
        { text: 'A database of customer payment cards', answer: 'Restricted', why: 'Legally regulated (PCI) and highly sensitive.' }
      ] },
      links: null,
      phishinbox: { emails: [
        { from: 'Microsoft 365', address: 'no-reply@micros0ft.com', subject: 'Unusual sign-in activity', body: 'We detected a sign-in from a new device. Verify your account to keep access.', link: { text: 'https://micros0ft.com/verify' }, hotspots: [
          { key: 'from', where: 'sender address', text: 'The domain is **micros0ft.com** &mdash; a zero instead of the letter o.' },
          { key: 'link', where: 'the link', text: 'Points to a lookalike domain, not microsoft.com.' }
        ] },
        { from: 'Payroll', address: 'payroll@ourcompany.com', subject: 'Your payslip is ready', body: 'Log in via the HR portal you normally use to view it. No action needed here.', hotspots: [] }
      ] }
    };
    CY.qsa('.tool-item').forEach(function (b) {
      b.onclick = function () { openTool(+b.dataset.tool, SAMPLE, tools); };
    });
    openTool(0, SAMPLE, tools);
  };
  function openTool(i, SAMPLE, tools) {
    CY.qsa('.tool-item').forEach(function (x, j) { x.classList.toggle('active', i === j); });
    var zone = CY.qs('#tool-zone');
    zone.innerHTML = '<div class="tool-card"><h3>' + tools[i].title + '</h3><div id="tool-inner"></div></div>';
    var inner = CY.qs('#tool-inner');
    var id = tools[i].id;
    if (id === 'passwordlab') CY.widget.passwordlab(inner, { start: '' });
    else if (id === 'linkinspector') CY.widget.linkinspector(inner, { links: SAMPLE.links });
    else if (id === 'phishinbox') CY.widget.phishinbox(inner, SAMPLE.phishinbox);
    else if (id === 'mfa') CY.widget.mfademo(inner);
    else if (id === 'crypto') CY.widget.cryptodemo(inner, { text: 'Salary: 54000' });
    else if (id === 'wifi') CY.widget.wifi(inner);
    else if (id === 'classify') CY.widget.classify(inner, SAMPLE.classify);
    else if (id === 'sqlinject') CY.widget.sqlinject(inner);
    else if (id === 'attackmatrix') CY.widget.attackmatrix(inner);
  }

  /* ---------------- ASSESSMENT ---------------- */
  var assessDeck = null;   // shuffled per attempt so rote position-memory never helps
  App.viewAssessment = function () {
    var A = CY.ASSESSMENT;
    var rng = CY.makeRng((Math.random() * 1e9) | 0);
    var order = rng.shuffle(A.questions.map(function (_, i) { return i; }));
    assessDeck = order.map(function (qi) {
      var q = A.questions[qi];
      var idx = rng.shuffle(q.options.map(function (_, i) { return i; }));
      return { q: q.q, options: idx.map(function (i) { return q.options[i]; }), a: idx.indexOf(q.a), why: q.why };
    });
    viewEl.innerHTML = defs() +
      '<section class="section"><div class="section-head"><h2>' + A.title + '</h2>' +
        '<span class="muted small">Pass mark ' + A.passPct + '%</span></div>' +
        '<p class="muted">' + CY.m(A.intro) + '</p>' +
        (CY.state.assessment.best ? '<p class="muted small">Best score so far: <b>' + CY.state.assessment.best + '%</b> (' + CY.state.assessment.attempts + ' attempt' + (CY.state.assessment.attempts === 1 ? '' : 's') + ')</p>' : '') +
        '<div class="quiz">' + assessDeck.map(function (q, qi) {
          return '<div class="quiz-q" data-q="' + qi + '"><div class="qq-text">' + (qi + 1) + '. ' + CY.m(q.q) + '</div>' +
            '<div class="qq-opts">' + q.options.map(function (o, oi) { return '<label class="qq-opt"><input type="radio" name="A' + qi + '" value="' + oi + '"> <span>' + CY.m(o) + '</span></label>'; }).join('') + '</div>' +
            '<div class="qq-why muted small" style="display:none"></div></div>';
        }).join('') + '</div>' +
        '<div class="fb-actions"><button class="btn primary big" id="assess-submit">Submit assessment</button>' +
        '<span id="assess-result" class="muted"></span></div></section>';
    CY.qs('#assess-submit').onclick = submitAssessment;
  };
  function submitAssessment() {
    var A = CY.ASSESSMENT;
    var deck = assessDeck || A.questions;
    var answers = deck.map(function (q, i) { var e = CY.qs('input[name="A' + i + '"]:checked'); return e ? +e.value : -1; });
    var correct = 0;
    deck.forEach(function (q, i) {
      var box = CY.qs('.quiz-q[data-q="' + i + '"]');
      var ok = answers[i] === q.a; if (ok) correct++;
      box.classList.toggle('right', ok); box.classList.toggle('wrong', !ok);
      var why = CY.qs('.qq-why', box); why.style.display = 'block';
      why.innerHTML = (ok ? '&#10003; Correct. ' : '&#10007; Correct answer: <b>' + CY.m(q.options[q.a]) + '</b>. ') + CY.m(q.why);
      CY.qsa('.qq-opt', box).forEach(function (o, oi) { o.classList.toggle('is-correct', oi === q.a); });
    });
    var pct = Math.round((correct / deck.length) * 100);
    CY.state.assessment.attempts++;
    CY.state.assessment.best = Math.max(CY.state.assessment.best, pct);
    if (pct >= A.passPct) { CY.state.assessment.passed = true; CY.state.assessment.ts = Date.now(); CY.award(60, 'Assessment passed'); }
    var badges = CY.checkBadges();
    CY.save(); renderHUD();
    CY.qs('#assess-result').innerHTML = 'Score: <b>' + correct + '/' + deck.length + '</b> (' + pct + '%)';
    if (pct >= A.passPct) {
      CY.toast('&#127881; Passed with ' + pct + '%!', 'good');
      var box = CY.el('div', { class: 'module-complete', html: '&#128220; <b>Congratulations &mdash; you passed.</b> ' + (CY.certificateEligible() ? 'Your certificate is ready.' : 'Finish the core modules to unlock your certificate.') });
      CY.qs('#assess-result').parentNode.appendChild(box);
      var acts = CY.el('div', { class: 'fb-actions' });
      if (CY.certificateEligible()) acts.appendChild(CY.el('a', { class: 'btn primary', href: '#/certificate', html: '&#128220; View your certificate' }));
      acts.appendChild(CY.el('a', { class: 'btn ghost', href: '#/tracks', html: 'Back to training' }));
      CY.qs('#assess-result').parentNode.appendChild(acts);
    } else {
      CY.toast('Not passed yet &mdash; review the explanations and retake anytime.', 'bad');
    }
    celebrate(false, 0, badges);
  }

  /* ---------------- CERTIFICATE ---------------- */
  App.viewCertificate = function () {
    if (!CY.certificateEligible()) {
      viewEl.innerHTML = defs() + '<section class="section"><div class="section-head"><h2>Your certificate</h2></div>' +
        '<div class="locked">&#128274; <b>Not unlocked yet.</b><p class="muted">To earn your certificate you need to:' +
        '<ul class="lesson-list"><li>' + (CY.state.name ? '&#10003; ' : '') + 'Enter your name</li>' +
        '<li>' + (CY.coreComplete() ? '&#10003; ' : '') + 'Complete all ' + CY.coreProgress().total + ' core modules (' + CY.coreProgress().done + ' done)</li>' +
        '<li>' + (CY.state.assessment.passed ? '&#10003; ' : '') + 'Pass the final assessment with ' + CY.ASSESSMENT.passPct + '%+</li></ul></p>' +
        '<div class="fb-actions"><a class="btn primary" href="#/tracks">Continue training</a><a class="btn" href="#/assessment">Take the assessment</a></div></div></section>';
      return;
    }
    var date = CY.fmtDate(CY.state.assessment.ts || Date.now());
    var modules = CY.coreModules().length;
    viewEl.innerHTML = defs() +
      '<section class="section">' +
        '<div class="section-head"><h2>Completion certificate</h2>' +
          '<span><button class="btn tiny" id="cert-print">&#128424; Print / Save as PDF</button> <a class="btn tiny ghost" href="#/home">Done</a></span></div>' +
      '<div class="certificate" id="cert">' +
        '<div class="cert-sheet">' +
          '<div class="cert-frame">' +
          '<p class="cert-kicker">Certificate of Completion</p>' +
            '<h1 class="cert-title">Cybersecurity & Information Assurance</h1>' +
            '<p class="cert-line">Awareness Training Programme</p>' +
            '<p class="cert-award">is awarded to</p>' +
          '<p class="cert-name">' + CY.esc(CY.state.name) + '</p>' +
          '<p class="cert-sub">has successfully completed the <b>Cyber Aware</b> information assurance &amp; security awareness programme, covering phishing and social engineering, passwords and multi-factor authentication, data protection and privacy, device and network safety, and security incident response.</p>' +
          '<div class="cert-meta">' +
            '<div><small>Date</small><b>' + CY.esc(date) + '</b></div>' +
            '<div><small>Assessment</small><b>' + CY.state.assessment.best + '%</b></div>' +
            '<div><small>Modules</small><b>' + modules + ' of ' + modules + '</b></div>' +
            '<div><small>Reference</small><b>' + CY.certCode() + '</b></div>' +
          '</div>' +
          '<div class="cert-sign"><div class="cert-sig-line"></div><small>Cyber Aware &mdash; free security awareness training</small></div>' +
          '<div class="cert-seal">&#128737;</div>' +
          '<p class="cert-note">Completion record for personal and organisational training use &mdash; it is not an accredited certification.</p>' +
          '</div>' +
        '</div>' +
      '</div></section>';
    CY.qs('#cert-print').onclick = function () { window.print(); };
  };

  /* ---------------- BADGES / SETTINGS ---------------- */
  App.viewBadges = function () {
    viewEl.innerHTML = '<section class="section"><div class="section-head"><h2>Badges</h2>' +
      '<span class="muted">' + Object.keys(CY.state.badges).length + ' of ' + CY.BADGES.length + '</span></div>' +
      '<div class="badge-grid">' + CY.BADGES.map(function (b) {
        var got = !!CY.state.badges[b.id];
        return '<div class="badge' + (got ? ' got' : '') + '"><div class="b-icon">' + b.icon + '</div><b>' + b.name + '</b><small>' + b.desc + '</small></div>';
      }).join('') + '</div></section>';
  };
  App.viewSettings = function () {
    viewEl.innerHTML = '<section class="section"><div class="section-head"><h2>Settings</h2></div>' +
      '<div class="settings-list">' +
        '<div class="setting-row"><span>Your name (on the certificate)</span><input class="ansinput small" id="set-name" value="' + CY.esc(CY.state.name) + '"></div>' +
        '<div class="setting-row"><span>Export progress (JSON)</span><button class="btn" id="btn-export">&#11015; Export</button></div>' +
        '<div class="setting-row"><span>Import progress</span><span><button class="btn" id="btn-import">&#11014; Import</button><input type="file" id="import-file" accept=".json,application/json" style="display:none"></span></div>' +
        '<div class="setting-row"><span>Reset all progress</span><button class="btn danger" id="btn-reset">Reset</button></div>' +
      '</div></section>';
    CY.qs('#set-name').onchange = function () { CY.state.name = this.value.trim() || 'Guest Learner'; CY.save(); renderHUD(); CY.toast('Saved.', 'good'); };
    CY.qs('#btn-export').onclick = function () {
      try { var blob = new Blob([JSON.stringify({ app: 'cyberaware', state: CY.state })], { type: 'application/json' });
        var url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = 'cyberaware-' + CY.todayKey() + '.json';
        document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(url); }, 1000); CY.toast('Exported.', 'good'); }
      catch (e) { CY.toast('Export failed in this browser.', 'bad'); }
    };
    CY.qs('#btn-import').onclick = function () { CY.qs('#import-file').click(); };
    CY.qs('#import-file').onchange = function (e) {
      var f = e.target.files && e.target.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () { try { var d = JSON.parse(r.result); CY.state = Object.assign(CY.state, d.state); CY.save(); renderHUD(); App.viewSettings(); CY.toast('Imported.', 'good'); } catch (err) { CY.toast('Bad file.', 'bad'); } };
      r.readAsText(f);
    };
    CY.qs('#btn-reset').onclick = function () { if (window.confirm('Reset all progress?')) { CY.reset(); renderHUD(); App.viewHome(); } };
  };
})(window.CY);
