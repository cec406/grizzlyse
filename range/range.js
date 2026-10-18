/* ============================================================
   GRIZZLY RANGE - workstation shell
   ============================================================ */

(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var SHELL_KEY = 'grizzlyrange.shell.v1';

  function loadShell() {
    try {
      var raw = localStorage.getItem(SHELL_KEY);
      if (raw) return Object.assign({ booted: false, signedIn: false, seenIntro: false }, JSON.parse(raw));
    } catch (e) {}
    return { booted: false, signedIn: false, seenIntro: false };
  }
  function saveShell() {
    try { localStorage.setItem(SHELL_KEY, JSON.stringify(S)); } catch (e) {}
  }
  var S = loadShell();

  function ico(name) {
    var I = {
      grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
      terminal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 4 3-4 3M13 15h4"/></svg>',
      pulse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>',
      book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/><path d="M8 7h8M8 11h6"/></svg>',
      server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="4" width="18" height="6" rx="1.5"/><rect x="3" y="14" width="18" height="6" rx="1.5"/><path d="M7 7h.01M7 17h.01M11 7h6M11 17h6"/></svg>',
      shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3 4 6v6c0 4.5 3.4 7.8 8 9 4.6-1.2 8-4.5 8-9V6l-8-3Z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
      branch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="7" r="2"/><path d="M6 7v10M8 9h5a4 4 0 0 0 4-4V9a4 4 0 0 0-4 4H8"/></svg>',
      globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9S9.5 5.5 12 3Z"/></svg>',
      play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>',
      refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6"/></svg>',
      external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 4h6v6M20 4l-9 9"/><path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/></svg>',
      menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
      ops: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 5h6M9 3h6v4H9z"/><path d="M7 5H5v16h14V5h-2"/><path d="m8.5 13 2 2 4.5-4.5"/></svg>'
    };
    return I[name] || I.grid;
  }

  /* ---------------- ui kit ---------------- */
  function toast(title, msg, kind) {
    var root = $('#toast-root');
    if (!root) return;
    var el = document.createElement('div');
    el.className = 'toast ' + (kind || '');
    el.innerHTML = '<b>' + esc(title) + '</b>' + (msg ? esc(msg) : '');
    root.appendChild(el);
    setTimeout(function () { el.style.opacity = '0'; el.style.transition = 'opacity .25s'; }, 4200);
    setTimeout(function () { el.remove(); }, 4600);
  }

  function modal(opts) {
    var root = $('#overlay-root');
    var wrap = document.createElement('div');
    wrap.className = 'overlay';
    wrap.innerHTML =
      '<div class="modal" ' + (opts.width ? 'style="width:min(' + opts.width + 'px,100%)"' : '') + ' role="dialog" aria-modal="true">' +
        '<div class="modal-head">' + (opts.title || '') + '<button class="icon-btn x" data-close aria-label="Close">&#10005;</button></div>' +
        '<div class="modal-body">' + (opts.body || '') + '</div>' +
        (opts.actions && opts.actions.length
          ? '<div class="modal-foot">' + opts.actions.map(function (a, i) {
              return '<button class="btn ' + (a.kind || '') + '" data-mact="' + i + '">' + esc(a.label) + '</button>';
            }).join('') + '</div>'
          : '') +
      '</div>';
    root.appendChild(wrap);
    function close() { wrap.remove(); document.removeEventListener('keydown', onKey); }
    function onKey(e) { if (e.key === 'Escape') close(); }
    document.addEventListener('keydown', onKey);
    wrap.addEventListener('click', function (e) {
      if (e.target === wrap || e.target.closest('[data-close]')) { close(); return; }
      var b = e.target.closest('[data-mact]');
      if (!b) return;
      var a = opts.actions[Number(b.dataset.mact)];
      if (a && a.onClick) { if (a.onClick(wrap) !== false) close(); }
      else close();
    });
    return { close: close, el: wrap };
  }

  function confirmBox(title, msg, label, kind) {
    return new Promise(function (resolve) {
      modal({
        title: title,
        body: '<p style="margin:0">' + msg + '</p>',
        actions: [
          { label: 'Cancel', kind: 'btn-ghost', onClick: function () { resolve(false); } },
          { label: label || 'Confirm', kind: kind || 'btn-gold', onClick: function () { resolve(true); } }
        ]
      });
    });
  }

  function whenLabel(date) {
    if (!date) return 'not opened yet';
    var days = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (days <= 0) return 'opened today';
    if (days === 1) return 'opened yesterday';
    return 'last opened ' + days + 'd ago';
  }

  /* ---------------- window manager ---------------- */
  var APPS = {};
  var Win = { open: [], z: 100, seq: 0 };

  /* ---------------- Range Ops ---------------- */
  var OPS_KEY = 'grizzlyrange.ops.v1';
  function loadOps() {
    try {
      var d = JSON.parse(localStorage.getItem(OPS_KEY) || '{}');
      return { done: d.done || {} };
    } catch (e) { return { done: {} }; }
  }
  function saveOps(st) {
    try { localStorage.setItem(OPS_KEY, JSON.stringify(st)); } catch (e) {}
  }
  function astate(id) { return window.rangeAppState ? rangeAppState(id) : null; }
  function compsciDid(id) {
    var s = astate('compsci');
    return !!(s && (s.missionsDone || []).indexOf(id) >= 0);
  }
  function gsCount(n) {
    var s = astate('gsehack');
    return !!(s && Object.keys(s.completed || {}).length >= n);
  }
  function gitCount(n) {
    var s = astate('gitcicd');
    return !!(s && Object.keys(s.missions || {}).length >= n);
  }
  function ccCount(n) {
    var s = astate('cybercrime');
    if (!s) return false;
    var m = s.missions || {};
    return Object.keys(m).filter(function (k) { return m[k] && m[k].doneOnce; }).length >= n;
  }
  function awareCount(n) {
    var s = astate('csia');
    if (!s) return false;
    var mods = s.modules || {};
    return Object.keys(mods).filter(function (k) { return mods[k] && mods[k].done; }).length >= n;
  }
  function awarePassed() {
    var s = astate('csia');
    return !!(s && s.assessment && s.assessment.passed);
  }
  function touched(n) {
    return rangeAll().filter(function (r) { return r.progress.pct > 0; }).length >= n;
  }

  var OPS = [
    { id: 'ZERO-01', machine: 'compsci', title: 'Get eyes on the box', points: 40,
      brief: 'You are handed a Linux training machine with no notes. Confirm where you are, list the home directory, read the welcome file, and prove you can chain a command.',
      criteria: [{ label: 'Complete "Your First Terminal" (hello-shell)', test: function () { return compsciDid('hello-shell'); } }] },
    { id: 'ZERO-02', machine: 'compsci', title: 'Lock the door', points: 55,
      brief: 'A deployment script is readable by everyone and executable by nobody. Fix permissions on your own lab box, then verify with a long listing.',
      criteria: [{ label: 'Complete "Permissions: rwx"', test: function () { return compsciDid('permissions'); } }] },
    { id: 'ZERO-03', machine: 'compsci', title: 'Read the logs', points: 65,
      brief: 'The web tier is noisy. Use the text tools to isolate the failing requests, count them, and write the finding down.',
      criteria: [{ label: 'Complete "Mission: Triage the Web Logs"', test: function () { return compsciDid('log-triage'); } }] },
    { id: 'GHOST-01', machine: 'gsehack', title: 'Make entry', points: 60,
      brief: 'Five enemy systems stand between you and the vault. Clear the first GSEHACK mission using only the terminal.',
      criteria: [{ label: 'Complete any GSEHACK mission', test: function () { return gsCount(1); } }] },
    { id: 'GHOST-02', machine: 'gsehack', title: 'Clear the range', points: 120,
      brief: 'Finish all five GSEHACK missions: password cracking, unauthorised access, recon, log forensics, stego, and injection.',
      criteria: [{ label: 'Complete all 5 GSEHACK missions', test: function () { return gsCount(5); } }] },
    { id: 'BUILD-01', machine: 'gitcicd', title: 'First commit', points: 45,
      brief: 'Initialize a repository, stage a real file, and commit it. The lab checks the live repository, not a quiz answer.',
      criteria: [{ label: 'Complete one GitCI/CD mission', test: function () { return gitCount(1); } }] },
    { id: 'BUILD-02', machine: 'gitcicd', title: 'Ship the change', points: 95,
      brief: 'Work through the first five GitCI/CD missions: staging, history, branches, merging, and a pipeline you can actually run.',
      criteria: [{ label: 'Complete 5 GitCI/CD missions', test: function () { return gitCount(5); } }] },
    { id: 'CASE-01', machine: 'cybercrime', title: 'Open a case file', points: 55,
      brief: 'Take the first CODEWATCH case. Preserve the evidence, hash it, and write the finding. This is the examiner mindset, not a checklist.',
      criteria: [{ label: 'Complete one CODEWATCH case', test: function () { return ccCount(1); } }] },
    { id: 'CASE-02', machine: 'cybercrime', title: 'Three files deep', points: 100,
      brief: 'Close three CODEWATCH cases. Read the evidence, make the call, and document the reasoning.',
      criteria: [{ label: 'Complete three CODEWATCH cases', test: function () { return ccCount(3); } }] },
    { id: 'AWARE-01', machine: 'csia', title: 'Spot the phish', points: 40,
      brief: 'Complete three Cyber Aware modules and their activities: phishing, passwords or MFA, and incident reporting.',
      criteria: [{ label: 'Complete 3 Cyber Aware modules', test: function () { return awareCount(3); } }] },
    { id: 'AWARE-02', machine: 'csia', title: 'Pass the assessment', points: 80,
      brief: 'Finish the Cyber Aware assessment with a passing score. Every operator still has to pass the human layer.',
      criteria: [{ label: 'Pass the Cyber Aware assessment', test: function () { return awarePassed(); } }] },
    { id: 'RANGE-01', machine: 'compsci', title: 'Cross-train', points: 75,
      brief: 'Touch at least three different machines. The range is not a single course; it is a habit of moving between disciplines.',
      criteria: [{ label: 'Make progress on 3 of the 5 machines', test: function () { return touched(3); } }] }
  ];

  APPS.ops = {
    id: 'ops', name: 'Range Ops', short: 'Range Ops', icon: 'ops', order: 5,
    width: 1080, height: 780,
    render: function (ctx) {
      var st = loadOps();
      var done = st.done;
      var filter = ctx.state.filter || 'open';
      var tasks = OPS.filter(function (t) {
        if (filter === 'done') return !!done[t.id];
        if (filter === 'all') return true;
        return !done[t.id];
      });
      var sel = OPS.filter(function (t) { return t.id === ctx.state.sel; })[0] || tasks[0] || OPS[0];
      var earned = OPS.reduce(function (a, t) { return a + (done[t.id] ? t.points : 0); }, 0);
      var total = OPS.reduce(function (a, t) { return a + t.points; }, 0);
      return '<div class="ops">' +
        '<div class="ops-side">' +
          '<div class="ops-head"><b>Range Ops</b><span>' + Object.keys(done).length + '/' + OPS.length + '</span></div>' +
          '<div class="ops-filters">' +
            '<button class="chip ' + (filter === 'open' ? 'on' : '') + '" data-a="filter" data-f="open">Open</button>' +
            '<button class="chip ' + (filter === 'done' ? 'on' : '') + '" data-a="filter" data-f="done">Done</button>' +
            '<button class="chip ' + (filter === 'all' ? 'on' : '') + '" data-a="filter" data-f="all">All</button>' +
          '</div>' +
          '<div class="ops-list">' + (tasks.length ? tasks.map(function (t) {
            var m = rangeById(t.machine);
            return '<button class="ops-item ' + (sel.id === t.id ? 'on' : '') + ' ' + (done[t.id] ? 'done' : '') + '" data-a="select" data-id="' + t.id + '">' +
              '<span class="oi-top"><span class="oi-code">' + t.id + '</span><span class="tag ' + (done[t.id] ? 'green' : 'grey') + '">' + (done[t.id] ? 'DONE' : t.points + ' pts') + '</span></span>' +
              '<span class="oi-title">' + esc(t.title) + '</span>' +
              '<span class="oi-sub" style="color:' + m.accent + '">' + esc(m.code) + ' ' + esc(m.short) + '</span>' +
            '</button>';
          }).join('') : '<div class="ops-empty">No work orders in this filter.</div>') + '</div>' +
          '<div class="ops-foot"><span>' + earned + ' / ' + total + ' pts</span><button class="gl-btn" data-a="reset">Reset ops</button></div>' +
        '</div>' +
        '<div class="ops-main">' +
          '<div class="ops-detail">' +
            '<div class="ops-eyebrow">WORK ORDER ' + sel.id + ' <span class="tag gold">' + sel.points + ' PTS</span> ' + (done[sel.id] ? '<span class="tag green">VALIDATED</span>' : '<span class="tag grey">OPEN</span>') + '</div>' +
            '<h1>' + esc(sel.title) + '</h1>' +
            '<div class="ops-machine">' + esc(rangeById(sel.machine).code) + ' &middot; ' + esc(rangeById(sel.machine).name) + ' &middot; ' + esc(rangeById(sel.machine).role) + '</div>' +
            '<p class="ops-brief">' + esc(sel.brief) + '</p>' +
            '<div class="ops-label">Acceptance criteria <span>live check</span></div>' +
            '<ul class="ops-crit">' + sel.criteria.map(function (c) {
              var ok = !!c.test();
              return '<li class="' + (ok ? 'ok' : 'bad') + '"><span class="oc-ico">' + (ok ? '&#10003;' : '&#10007;') + '</span><span>' + esc(c.label) + '</span></li>';
            }).join('') + '</ul>' +
            '<div class="ops-actions">' +
              '<button class="btn btn-gold" data-a="course">Open course</button>' +
              '<button class="btn" data-a="practice">Practice sandbox</button>' +
              '<button class="btn btn-ghost" data-a="validate">Validate work</button>' +
            '</div>' +
            '<div class="ops-note">Open course takes you to the machine where the graded work lives. Practice sandbox is free play - useful, but it does not complete the criteria. Validation reads the app\'s own local save.</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    },
    action: function (ctx, a, el) {
      var st = loadOps();
      if (a === 'filter') { ctx.state.filter = el.dataset.f; ctx.refresh(); return; }
      if (a === 'select') { ctx.state.sel = el.dataset.id; ctx.refresh(); return; }
      if (a === 'practice') {
        var pt = OPS.filter(function (t) { return t.id === (ctx.state.sel || OPS[0].id); })[0];
        if (pt) openMachine(pt.machine, { practice: true });
        return;
      }
      if (a === 'course') {
        var ct = OPS.filter(function (t) { return t.id === (ctx.state.sel || OPS[0].id); })[0];
        if (ct) openMachine(ct.machine, {});
        return;
      }
      if (a === 'validate') {
        var t = OPS.filter(function (x) { return x.id === (ctx.state.sel || OPS[0].id); })[0];
        if (!t) return;
        var results = t.criteria.map(function (c) { return { label: c.label, ok: !!c.test() }; });
        var ok = results.every(function (r) { return r.ok; });
        if (ok) {
          st.done[t.id] = { at: new Date().toISOString(), points: t.points };
          saveOps(st);
          renderAll();
          toast('Work order validated', t.id + ' +' + t.points + ' pts', 'good');
          ctx.refresh();
        } else {
          toast('Not yet', results.filter(function (r) { return !r.ok; }).length + ' criteria still open.', 'bad');
        }
        return;
      }
      if (a === 'reset') {
        confirmBox('Reset Range Ops?', 'This clears the work-order board only. Machine progress is untouched.', 'Reset board', 'btn-danger').then(function (ok) {
          if (!ok) return;
          saveOps({ done: {} });
          renderAll();
          ctx.refresh();
        });
      }
    }
  };

  function areaSize() {
    var el = $('#windows');
    return { w: el.clientWidth, h: el.clientHeight };
  }

  function createWindow(def, opts) {
    opts = opts || {};
    var existing = Win.open.filter(function (w) { return w.def.id === def.id; })[0];
    if (existing) {
      if (opts.state) Object.assign(existing.ctx.state, opts.state);
      existing.min = false;
      existing.el.classList.remove('min');
      existing.ctx.refresh();
      focusWin(existing);
      return existing;
    }

    var size = areaSize();
    var width = Math.min(opts.width || def.width || 900, size.w - 16);
    var height = Math.min(opts.height || def.height || 620, size.h - 10);
    var n = Win.open.length;
    var left = Math.max(8, Math.min(size.w - width - 8, Math.round((size.w - width) / 2) + (n % 4) * 24 - 30));
    var top = Math.max(3, Math.min(size.h - height - 6, Math.round((size.h - height) / 2) + (n % 4) * 18 - 28));

    var el = document.createElement('div');
    el.className = 'window';
    el.style.left = left + 'px';
    el.style.top = top + 'px';
    el.style.width = width + 'px';
    el.style.height = height + 'px';
    el.innerHTML =
      '<div class="titlebar">' +
        '<span class="ico">' + ico(def.icon || 'grid') + '</span>' +
        '<span class="name">' + esc(opts.title || def.name) + '</span>' +
        '<span class="sub">' + esc(opts.sub || def.sub || '') + '</span>' +
        '<div class="win-controls">' +
          '<button data-wc="min" title="Minimize"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M2 6h8"/></svg></button>' +
          '<button data-wc="max" title="Maximize"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="2.2" y="2.2" width="7.6" height="7.6"/></svg></button>' +
          '<button data-wc="close" class="close" title="Close"><svg viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6"><path d="m2.5 2.5 7 7M9.5 2.5l-7 7"/></svg></button>' +
        '</div>' +
      '</div>' +
      '<div class="window-body"></div>';
    $('#windows').appendChild(el);

    var rec = { id: 'w' + (++Win.seq), def: def, el: el, opts: opts, min: false, max: false, ctx: null };
    Win.open.push(rec);
    var body = $('.window-body', el);

    var ctx = {
      rec: rec,
      body: body,
      opts: opts,
      state: Object.assign({}, opts.state || {}),
      refresh: function () {
        if (ctx.state && ctx.state.timer) { clearInterval(ctx.state.timer); ctx.state.timer = null; }
        body.innerHTML = def.render ? def.render(ctx) : '';
        if (def.mount) def.mount(ctx);
      },
      close: function () { closeWin(rec); },
      toast: toast
    };
    rec.ctx = ctx;

    body.addEventListener('click', function (e) {
      var t = e.target.closest('[data-a]');
      if (!t || !def.action) return;
      e.preventDefault();
      def.action(ctx, t.dataset.a, t, e);
    });

    ctx.refresh();
    focusWin(rec);
    renderTaskbar();
    return rec;
  }

  function openApp(id, opts) {
    var def = APPS[id];
    if (!def) { toast('App not installed', id); return; }
    closeStart();
    return createWindow(def, opts);
  }

  function closeWin(rec) {
    if (rec.ctx && rec.ctx.state && rec.ctx.state.timer) clearInterval(rec.ctx.state.timer);
    var i = Win.open.indexOf(rec);
    if (i >= 0) Win.open.splice(i, 1);
    rec.el.remove();
    renderTaskbar();
    if (rec.def.id.indexOf('machine:') === 0) refreshProgressViews();
  }

  function refreshProgressViews() {
    renderIcons();
    Win.open.forEach(function (w) {
      if (w.def.id === 'bay' || w.def.id === 'status' || w.def.id === 'ops') w.ctx.refresh();
    });
    updateReadyChip();
  }
  function focusWin(rec) {
    Win.z += 1;
    rec.el.style.zIndex = Win.z;
    Win.open.forEach(function (w) { w.el.classList.toggle('focused', w === rec); });
    renderTaskbar();
  }
  function toggleMax(rec) {
    var el = rec.el;
    if (!rec.max) {
      rec.prev = { left: el.style.left, top: el.style.top, width: el.style.width, height: el.style.height };
      el.classList.add('max');
      rec.max = true;
    } else {
      el.classList.remove('max');
      if (rec.prev) { el.style.left = rec.prev.left; el.style.top = rec.prev.top; el.style.width = rec.prev.width; el.style.height = rec.prev.height; }
      rec.max = false;
    }
  }

  document.addEventListener('mousedown', function (e) {
    var win = e.target.closest('.window');
    if (!win) return;
    var rec = Win.open.filter(function (w) { return w.el === win; })[0];
    if (rec && !win.classList.contains('focused')) focusWin(rec);
  });
  document.addEventListener('click', function (e) {
    var wc = e.target.closest('[data-wc]');
    if (!wc) return;
    var rec = Win.open.filter(function (w) { return w.el === wc.closest('.window'); })[0];
    if (!rec) return;
    if (wc.dataset.wc === 'close') closeWin(rec);
    if (wc.dataset.wc === 'min') { rec.min = true; rec.el.classList.add('min'); renderTaskbar(); }
    if (wc.dataset.wc === 'max') toggleMax(rec);
  });

  var drag = null;
  document.addEventListener('pointerdown', function (e) {
    var bar = e.target.closest('.titlebar');
    if (!bar || e.target.closest('.win-controls')) return;
    var rec = Win.open.filter(function (w) { return w.el === bar.closest('.window'); })[0];
    if (!rec || rec.max) return;
    focusWin(rec);
    drag = { rec: rec, x: e.clientX, y: e.clientY, left: rec.el.offsetLeft, top: rec.el.offsetTop };
    bar.setPointerCapture(e.pointerId);
    document.body.style.cursor = 'grabbing';
  });
  document.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var el = drag.rec.el;
    var size = areaSize();
    el.style.left = Math.max(-el.offsetWidth + 120, Math.min(size.w - 90, drag.left + (e.clientX - drag.x))) + 'px';
    el.style.top = Math.max(0, Math.min(size.h - 40, drag.top + (e.clientY - drag.y))) + 'px';
  });
  document.addEventListener('pointerup', function () { drag = null; document.body.style.cursor = ''; });
  document.addEventListener('dblclick', function (e) {
    var bar = e.target.closest('.titlebar');
    if (!bar || e.target.closest('.win-controls')) return;
    var rec = Win.open.filter(function (w) { return w.el === bar.closest('.window'); })[0];
    if (rec) toggleMax(rec);
  });

  /* ---------------- machine windows ---------------- */
  function startPractice(ctx, m) {
    var frame = $('.mwin-frame iframe', ctx.body);
    if (!frame || !window.rangePractice) return;
    var tries = 0, done = false, started = false;
    function attempt() {
      if (done || !ctx.body.isConnected) return;
      tries++;
      var doc = null;
      try { doc = frame.contentDocument; } catch (e) {}
      if (doc && doc.readyState !== 'loading') {
        var label = window.rangePractice(m, doc);
        if (label) {
          done = true;
          toast('Practice mode', label + ' in ' + m.short, 'good');
          return;
        }
      }
      if (tries < 24) setTimeout(attempt, 250);
      else toast('Practice mode', 'Use the app\'s own sandbox or start control.', '');
    }
    function begin() {
      if (started) return;
      started = true;
      setTimeout(attempt, 1800);
    }
    if (frame.contentDocument && frame.contentDocument.readyState === 'complete') begin();
    frame.addEventListener('load', begin);
    setTimeout(begin, 2200);
  }

  function machineDef(m) {
    return {
      id: 'machine:' + m.id,
      name: m.name,
      icon: m.icon,
      width: 1260,
      height: 800,
      render: function (ctx) {
        var p = rangeRead(m);
        return '<div class="mwin">' +
          '<div class="mwin-bar">' +
            '<span class="code">' + esc(m.code) + ' / ' + esc(m.host) + '</span>' +
            '<span class="name">' + esc(m.name) + '</span>' +
            '<span class="tag green">online</span>' +
            '<span class="spacer"></span>' +
            '<button class="btn btn-xs btn-gold" data-a="practice">Practice</button>' +
            '<button class="btn btn-xs" data-a="reload">Reload</button>' +
            '<button class="btn btn-xs" data-a="view">Lab view</button>' +
            '<button class="btn btn-xs" data-a="direct">Direct</button>' +
            '<button class="btn btn-xs btn-danger" data-a="reset">Reset</button>' +
          '</div>' +
          '<div class="mwin-frame"><iframe src="' + esc(m.href) + '" title="' + esc(m.name) + '" loading="eager"></iframe></div>' +
          '<div class="mwin-foot">' +
            '<span>' + esc(m.role) + '</span>' +
            '<span class="p" data-prog="' + esc(m.id) + '">' + esc(p.label) + ' &middot; ' + esc(p.detail) + '</span>' +
            '<span class="spacer"></span>' +
            '<span>' + esc(m.code) + ' &middot; synthetic machine</span>' +
          '</div>' +
        '</div>';
      },
      mount: function (ctx) {
        var m2 = ctx.opts.machine;
        updateMachineProgress(m2);
        if (ctx.opts.practice) startPractice(ctx, m2);
        ctx.state.timer = setInterval(function () {
          if (!ctx.body.isConnected) { clearInterval(ctx.state.timer); return; }
          updateMachineProgress(m2);
        }, 1800);
      },
      action: function (ctx, a) {
        var m2 = ctx.opts.machine;
        var frame = $('.mwin-frame iframe', ctx.body);
        if (a === 'practice') { startPractice(ctx, m2); return; }
        if (a === 'reload' && frame) { frame.src = frame.src; toast('Machine reloaded', m2.name); }
        if (a === 'direct') window.open(m2.href, '_blank', 'noopener');
        if (a === 'view') window.open('machine.html?m=' + m2.id, '_blank', 'noopener');
        if (a === 'reset') {
          confirmBox('Reset ' + m2.name + '?', 'This clears <code>' + esc(m2.key) + '</code> from this browser. The lab content is not affected.', 'Reset progress', 'btn-danger').then(function (ok) {
            if (!ok) return;
            rangeReset(m2.id);
            if (frame) frame.src = frame.src;
            updateMachineProgress(m2);
            renderAll();
            refreshProgressViews();
            toast('Progress reset', m2.name, 'good');
          });
        }
      }
    };
  }

  function updateMachineProgress(m) {
    var node = $('[data-prog="' + m.id + '"]');
    if (!node) return;
    var p = rangeRead(m);
    node.innerHTML = esc(p.label) + ' &middot; ' + esc(p.detail) + ' &middot; ' + p.pct + '%';
  }

  function openMachine(id, opts) {
    opts = opts || {};
    var m = rangeById(id);
    if (!m) { toast('Unknown machine', id); return; }
    rangeMarkVisit(m.id);
    var def = machineDef(m);
    createWindow(def, { machine: m, width: 1260, height: 800, sub: m.code + ' / ' + m.host, practice: !!opts.practice });
    renderAll();
  }

  /* ---------------- machine bay ---------------- */
  function ringSvg(pct, accent) {
    var r = 30, c = 2 * Math.PI * r;
    var off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
    return '<svg width="74" height="74" viewBox="0 0 74 74">' +
      '<circle cx="37" cy="37" r="' + r + '" fill="none" stroke="#1d2d3a" stroke-width="7"/>' +
      '<circle cx="37" cy="37" r="' + r + '" fill="none" stroke="' + accent + '" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 37 37)"/>' +
      '<text x="37" y="41" text-anchor="middle" fill="#eaf3fa" font-family="ui-monospace,monospace" font-size="15" font-weight="700">' + pct + '%</text>' +
    '</svg>';
  }

  function machineCard(row) {
    var m = row.machine;
    var p = row.progress;
    return '<article class="machine" style="--a:' + m.accent + '">' +
      '<div class="machine-top">' +
        '<div class="m-ico">' + ico(m.icon) + '</div>' +
        '<div>' +
          '<div class="m-code">' + esc(m.code) + ' &middot; ' + esc(m.host) + '</div>' +
          '<div class="m-name">' + esc(m.name) + '</div>' +
          '<div class="m-role">' + esc(m.role) + '</div>' +
        '</div>' +
        '<div class="m-status"><span class="led"></span>ONLINE</div>' +
      '</div>' +
      '<div class="m-tag">' + esc(m.tagline) + '</div>' +
      '<div class="m-stats"><span>' + esc(p.label) + '</span><span>' + p.pct + '%</span></div>' +
      '<div class="m-prog"><i style="width:' + p.pct + '%"></i></div>' +
      '<div class="m-actions">' +
        '<button class="btn btn-sm btn-gold" data-a="practice" data-id="' + m.id + '">' + ico('play') + ' Practice</button>' +
        '<button class="btn btn-sm" data-a="boot" data-id="' + m.id + '">Course</button>' +
        '<button class="btn btn-sm btn-ghost icon" data-a="view" data-id="' + m.id + '" title="Lab view">' + ico('grid') + '</button>' +
        '<button class="btn btn-sm btn-ghost icon" data-a="direct" data-id="' + m.id + '" title="Open standalone">' + ico('external') + '</button>' +
      '</div>' +
      '<div class="m-empty">' + esc(p.detail) + ' &middot; ' + esc(whenLabel(row.last)) + '</div>' +
    '</article>';
  }

  APPS.bay = {
    id: 'bay', name: 'Machine Bay', short: 'Machine Bay', icon: 'grid', order: 10,
    width: 1080, height: 760,
    render: function () {
      var agg = rangeAggregate();
      var rows = agg.rows;
      var resume = rows.slice().sort(function (a, b) {
        if (a.last && b.last) return b.last - a.last;
        if (a.last) return -1;
        if (b.last) return 1;
        return b.progress.pct - a.progress.pct;
      })[0];
      var nextMachine = rows.filter(function (r) { return r.progress.pct < 100; })
        .sort(function (a, b) { return a.machine.code.localeCompare(b.machine.code); })[0] || resume;
      return '<div class="bay">' +
        '<div class="bay-hero">' +
          '<div>' + ringSvg(agg.pct, '#fbbf24') + '</div>' +
          '<div style="flex:1;min-width:200px">' +
            '<h1>Machine Bay</h1>' +
            '<p>Five training machines, one operator desktop. Boot a machine to work inside it; your progress stays in this browser. Nothing here touches a real network.</p>' +
            '<div class="bay-kpis">' +
              '<div class="kpi"><b>' + agg.modulesDone + '</b><span>items complete</span></div>' +
              '<div class="kpi"><b>' + rows.filter(function (r) { return r.progress.pct > 0; }).length + '/5</b><span>machines touched</span></div>' +
              '<div class="kpi"><b>' + agg.xp.toLocaleString() + '</b><span>total XP / points</span></div>' +
            '</div>' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:7px;min-width:176px">' +
            '<button class="btn btn-gold" data-a="resume" data-id="' + (nextMachine ? nextMachine.machine.id : '') + '">' + ico('play') + ' ' + (resume && resume.last ? 'Resume' : 'Start') + ': ' + esc(nextMachine ? nextMachine.machine.short : 'Machine Bay') + '</button>' +
            '<button class="btn btn-ghost" data-a="ops">Range Ops board</button>' +
            '<button class="btn btn-ghost" data-a="notes">Open field notes</button>' +
            '<button class="btn btn-ghost" data-a="refresh">' + ico('refresh') + ' Rescan progress</button>' +
          '</div>' +
        '</div>' +
        '<div class="row" style="margin:0 2px 10px"><span class="tag gold">RECOMMENDED PATH</span><span class="small muted">Foundations &rarr; terminal &rarr; forensics &rarr; delivery &rarr; awareness. Jump anywhere; the range does not lock you out.</span><span class="spacer"></span><span class="tiny dim">local saves only</span></div>' +
        '<div class="machine-grid">' + rows.map(machineCard).join('') +
          '<article class="machine" style="--a:#35d0ba">' +
            '<div class="machine-top">' +
              '<div class="m-ico">' + ico('book') + '</div>' +
              '<div><div class="m-code">RANGE / HANDBOOK</div><div class="m-name">Field Notes</div><div class="m-role">Operator handbook</div></div>' +
              '<div class="m-status"><span class="led"></span>READ ME</div>' +
            '</div>' +
            '<div class="m-tag">How the range works, the recommended route, local-save behavior, and the rules of the range.</div>' +
            '<div class="m-stats"><span>orientation</span><span>5 min</span></div>' +
            '<div class="m-prog"><i style="width:100%;background:#35d0ba"></i></div>' +
            '<div class="m-actions"><button class="btn btn-sm" data-a="notes">Open field notes</button><button class="btn btn-sm btn-ghost" data-a="console-note">Console help</button></div>' +
            '<div class="m-empty">Everything is synthetic. Progress never leaves this browser.</div>' +
          '</article>' +
        '</div>' +
      '</div>';
    },
    action: function (ctx, a, el) {
      var id = el && el.dataset ? el.dataset.id : '';
      var m = id ? rangeById(id) : null;
      if (a === 'practice' && m) { openMachine(m.id, { practice: true }); return; }
      if (a === 'boot' || a === 'resume') { if (m) openMachine(m.id); return; }
      if (a === 'view' && m) window.open('machine.html?m=' + m.id, '_blank', 'noopener');
      if (a === 'direct' && m) window.open(m.href, '_blank', 'noopener');
      if (a === 'ops') { openApp('ops'); return; }
      if (a === 'notes') { openApp('notes'); return; }
      if (a === 'console-note') { openApp('console'); return; }
      if (a === 'refresh') { ctx.refresh(); renderAll(); toast('Progress rescanned', 'Local saves re-read.', 'good'); return; }
      if (a === 'brief' && m) { modal({ title: m.code + ' &middot; ' + esc(m.name), body: '<p><b>' + esc(m.tagline) + '</b></p><p>' + esc(m.brief) + '</p><p class="tiny dim">Next: ' + esc(m.next) + '</p>', actions: [{ label: 'Boot machine', kind: 'btn-gold', onClick: function () { openMachine(m.id); } }, { label: 'Close', kind: 'btn-ghost' }] }); }
    }
  };

  /* ---------------- console ---------------- */
  function consoleTable(rows) {
    var head = 'CODE  MACHINE              PROGRESS  DETAIL';
    var out = [head, '----  -------------------  --------  ------------------------------------------'];
    rows.forEach(function (r) {
      var p = r.progress;
      out.push(
        (r.machine.code + '   ').slice(0, 6) +
        (r.machine.name + '                    ').slice(0, 21) +
        ('   ' + p.pct + '%').slice(-8) + '  ' +
        p.detail
      );
    });
    return out.join('\n');
  }

  APPS.console = {
    id: 'console', name: 'Operator Console', short: 'Console', icon: 'terminal', order: 20,
    width: 900, height: 570,
    render: function (ctx) {
      if (!ctx.state.lines) {
        ctx.state.lines = [
          { cls: 't-dim', text: 'GRIZZLY RANGE // operator console' },
          { cls: 't-dim', text: 'Type help for commands. Five machines are registered.' },
          { cls: '', text: '' }
        ];
        ctx.state.history = [];
        ctx.state.hindex = -1;
      }
      return '<div class="term">' +
        '<div class="term-out" id="console-out">' + ctx.state.lines.map(function (l) {
          return '<div class="t-line ' + (l.cls || '') + '">' + (l.html !== undefined ? l.html : esc(l.text)) + '</div>';
        }).join('') + '</div>' +
        '<div class="t-in"><span class="t-prompt">operator@range:~$</span><input id="console-input" autocomplete="off" spellcheck="false" aria-label="Operator console" /></div>' +
      '</div>';
    },
    mount: function (ctx) {
      var input = $('#console-input', ctx.body);
      var out = $('#console-out', ctx.body);
      if (!input) return;
      setTimeout(function () { input.focus(); out.scrollTop = out.scrollHeight; }, 30);
      ctx.body.addEventListener('click', function (e) { if (!e.target.closest('input')) setTimeout(function () { input.focus(); }, 0); });
      input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          var raw = input.value.trim();
          input.value = '';
          runConsole(ctx, raw, out);
        } else if (e.key === 'ArrowUp') {
          if (ctx.state.history.length) {
            ctx.state.hindex = ctx.state.hindex < 0 ? ctx.state.history.length - 1 : Math.max(0, ctx.state.hindex - 1);
            input.value = ctx.state.history[ctx.state.hindex] || '';
          }
          e.preventDefault();
        } else if (e.key === 'ArrowDown') {
          if (ctx.state.hindex >= 0) {
            ctx.state.hindex++;
            if (ctx.state.hindex >= ctx.state.history.length) { ctx.state.hindex = -1; input.value = ''; }
            else input.value = ctx.state.history[ctx.state.hindex];
          }
          e.preventDefault();
        }
      });
    }
  };

  function addConsole(ctx, out, text, cls) {
    var line = { text: text, cls: cls || '' };
    ctx.state.lines.push(line);
    if (ctx.state.lines.length > 500) ctx.state.lines.shift();
    var div = document.createElement('div');
    div.className = 't-line ' + (cls || '');
    div.textContent = text;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }

  function addConsoleHtml(ctx, out, html, cls) {
    ctx.state.lines.push({ html: html, cls: cls || '' });
    var div = document.createElement('div');
    div.className = 't-line ' + (cls || '');
    div.innerHTML = html;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }

  function runConsole(ctx, raw, out) {
    addConsoleHtml(ctx, out, '<span class="t-prompt">operator@range:~$</span> <span class="t-cmd">' + esc(raw) + '</span>');
    if (!raw) return;
    ctx.state.history.push(raw);
    ctx.state.hindex = -1;
    var parts = raw.split(/\s+/);
    var cmd = parts[0].toLowerCase();
    var arg = parts[1] || '';
    var rows = rangeAll();

    function table() {
      addConsole(ctx, out, '', '');
      addConsole(ctx, out, consoleTable(rows), 't-table');
      addConsole(ctx, out, '', '');
    }

    if (cmd === 'help' || cmd === '?') {
      addConsole(ctx, out, [
        'RANGE CONTROL COMMANDS',
        '  machines              list the five machines and progress',
        '  status                aggregate readiness',
        '  scan                  rescan local saves',
        '  launch <machine>      boot a machine window (aliases: open, boot)',
        '  brief <machine>       short mission brief',
        '  view <machine>        open the lab frame in a new tab',
        '  direct <machine>      open the app standalone',
        '  reset <machine> confirm   clear that machine\'s local save',
        '  whoami | date | site | clear | help',
        '',
        'MACHINE IDS: compsci, gsehack, cybercrime, gitcicd, csia'
      ].join('\n'), 't-dim');
      return;
    }
    if (cmd === 'clear' || cmd === 'cls') {
      ctx.state.lines = [];
      out.innerHTML = '';
      return;
    }
    if (cmd === 'machines' || cmd === 'ls') { table(); return; }
    if (cmd === 'scan') {
      addConsole(ctx, out, 'scanning local progress bus...', 't-dim');
      rows.forEach(function (r) { addConsole(ctx, out, '  [ok] ' + r.machine.code + ' ' + r.machine.host + ' -> ' + r.progress.pct + '%', 't-ok'); });
      table();
      return;
    }
    if (cmd === 'status' || cmd === 'progress') {
      var agg = rangeAggregate();
      addConsole(ctx, out, 'RANGE READINESS  ' + agg.pct + '%', 't-head');
      addConsole(ctx, out, '  items complete   : ' + agg.modulesDone + ' / ' + agg.total);
      addConsole(ctx, out, '  XP / points      : ' + agg.xp.toLocaleString());
      addConsole(ctx, out, '  machines touched : ' + rows.filter(function (r) { return r.progress.pct > 0; }).length + ' / 5');
      addConsole(ctx, out, '  storage          : localStorage (this browser only)', 't-dim');
      return;
    }
    if (cmd === 'launch' || cmd === 'open' || cmd === 'boot') {
      var m = rangeById(arg);
      if (!m) { addConsole(ctx, out, 'unknown machine: ' + (arg || '(none)'), 't-err'); return; }
      addConsole(ctx, out, 'booting ' + m.code + ' ' + m.name + '...', 't-ok');
      openMachine(m.id);
      return;
    }
    if (cmd === 'brief') {
      var bm = rangeById(arg);
      if (!bm) { addConsole(ctx, out, 'unknown machine: ' + (arg || '(none)'), 't-err'); return; }
      addConsole(ctx, out, bm.code + '  ' + bm.name + '  [' + bm.role + ']', 't-head');
      addConsole(ctx, out, bm.brief);
      addConsole(ctx, out, 'next: ' + bm.next, 't-warn');
      return;
    }
    if (cmd === 'view' || cmd === 'direct') {
      var vm = rangeById(arg);
      if (!vm) { addConsole(ctx, out, 'unknown machine: ' + (arg || '(none)'), 't-err'); return; }
      window.open(cmd === 'view' ? 'machine.html?m=' + vm.id : vm.href, '_blank', 'noopener');
      addConsole(ctx, out, 'opened ' + vm.name, 't-ok');
      return;
    }
    if (cmd === 'reset') {
      var rm = rangeById(arg);
      if (!rm) { addConsole(ctx, out, 'usage: reset <machine> confirm', 't-err'); return; }
      if (parts[2] !== 'confirm') { addConsole(ctx, out, 'this clears ' + rm.key + '. run: reset ' + rm.id + ' confirm', 't-warn'); return; }
      rangeReset(rm.id);
      addConsole(ctx, out, 'cleared ' + rm.name + ' local save', 't-ok');
      renderAll();
      return;
    }
    if (cmd === 'whoami') { addConsole(ctx, out, 'operator@range (local, synthetic)'); return; }
    if (cmd === 'date') { addConsole(ctx, out, new Date().toString()); return; }
    if (cmd === 'site') { window.open('../index.html', '_blank', 'noopener'); addConsole(ctx, out, 'opening grizzlyse.com', 't-ok'); return; }
    if (cmd === 'exit') { ctx.close(); return; }
    addConsole(ctx, out, 'command not found: ' + cmd + ' (try help)', 't-err');
  }

  /* ---------------- status ---------------- */
  APPS.status = {
    id: 'status', name: 'Range Status', short: 'Range Status', icon: 'pulse', order: 30,
    width: 1060, height: 660,
    render: function () {
      var agg = rangeAggregate();
      return '<div class="status-page">' +
        '<div class="status-head">' +
          '<div><h1>Range Status</h1><p>Progress is read directly from each machine\'s own local save. Nothing is uploaded.</p></div>' +
          '<span class="spacer"></span>' +
          '<button class="btn btn-sm" data-a="refresh">' + ico('refresh') + ' Rescan</button>' +
          '<button class="btn btn-sm btn-gold" data-a="ops">Range Ops</button>' +
          '<button class="btn btn-sm btn-ghost" data-a="bay">Machine Bay</button>' +
        '</div>' +
        '<div class="status-kpis">' +
          '<div class="skpi"><b>' + agg.pct + '%</b><span>range readiness</span><small>average across five machines</small></div>' +
          '<div class="skpi"><b>' + agg.modulesDone + '</b><span>items complete</span><small>of ' + agg.total + ' tracked</small></div>' +
          '<div class="skpi"><b>' + agg.xp.toLocaleString() + '</b><span>XP / points</span><small>self-reported by each app</small></div>' +
          '<div class="skpi"><b>' + agg.rows.filter(function (r) { return r.progress.pct > 0; }).length + '/5</b><span>machines touched</span><small>local saves found</small></div>' +
        '</div>' +
        '<div class="table-card"><div class="tbl-wrap"><table class="tbl status-table">' +
          '<thead><tr><th>Machine</th><th>Role</th><th>Progress</th><th>Detail</th><th>Last seen</th><th>Next</th><th></th></tr></thead><tbody>' +
          agg.rows.map(function (r) {
            var m = r.machine, p = r.progress;
            return '<tr class="clickable" data-a="boot" data-id="' + m.id + '">' +
              '<td><div class="status-machine"><span class="sm-dot" style="--a:' + m.accent + '"></span><div><div class="sm-name">' + esc(m.name) + '</div><div class="sm-code">' + esc(m.code) + ' / ' + esc(m.host) + '</div></div></div></td>' +
              '<td><span class="tag grey">' + esc(m.role) + '</span></td>' +
              '<td><span class="mini-bar" style="--a:' + m.accent + '"><i style="width:' + p.pct + '%"></i></span>' + p.pct + '%</td>' +
              '<td class="small">' + esc(p.label) + '<br><span class="tiny dim">' + esc(p.detail) + '</span></td>' +
              '<td class="tiny dim">' + esc(whenLabel(r.last)) + '</td>' +
              '<td class="small">' + esc(m.next) + '</td>' +
              '<td><button class="btn btn-xs btn-gold" data-a="practice" data-id="' + m.id + '">Practice</button> <button class="btn btn-xs btn-ghost" data-a="boot" data-id="' + m.id + '">Course</button></td>' +
            '</tr>';
          }).join('') +
        '</tbody></table></div></div>' +
        (function () {
          var next = agg.rows.filter(function (r) { return r.progress.pct < 100; })
            .sort(function (a, b) { return a.machine.code.localeCompare(b.machine.code); })[0] || agg.rows[0];
          return '<div class="grid2" style="margin-top:14px">' +
            '<div class="table-card pad">' +
              '<div class="tiny dim" style="text-transform:uppercase;letter-spacing:.11em;margin-bottom:7px">Recommended next</div>' +
              '<div style="font-size:14px;font-weight:650;color:' + next.machine.accent + '">' + esc(next.machine.code) + ' ' + esc(next.machine.name) + '</div>' +
              '<div class="small muted" style="margin:4px 0 10px">' + esc(next.machine.next) + '</div>' +
              '<button class="btn btn-sm btn-gold" data-a="boot" data-id="' + next.machine.id + '">Boot this machine</button>' +
            '</div>' +
            '<div class="table-card pad">' +
              '<div class="tiny dim" style="text-transform:uppercase;letter-spacing:.11em;margin-bottom:7px">Operator note</div>' +
              '<div class="small muted">The readiness number is a simple average of the five machines. It is a nudge, not a grade. Progress lives in each app\'s own local save; nothing is uploaded.</div>' +
            '</div>' +
          '</div>';
        })() +
        '<div class="row" style="margin-top:12px"><span class="hint tiny dim">Resetting a machine clears only that app\'s key in this browser.</span><span class="spacer"></span><button class="btn btn-xs btn-danger" data-a="reset-all">Reset all range progress</button></div>' +
      '</div>';
    },
    action: function (ctx, a, el) {
      var m = el && el.dataset ? rangeById(el.dataset.id || '') : null;
      if (a === 'practice' && m) { openMachine(m.id, { practice: true }); return; }
      if (a === 'boot' && m) { openMachine(m.id); return; }
      if (a === 'ops') { openApp('ops'); return; }
      if (a === 'bay') { openApp('bay'); return; }
      if (a === 'refresh') { ctx.refresh(); renderAll(); toast('Rescanned', 'Local saves re-read.', 'good'); return; }
      if (a === 'reset-all') {
        confirmBox('Reset all range progress?', 'This removes the local save for all five machines. It cannot be undone.', 'Reset everything', 'btn-danger').then(function (ok) {
          if (!ok) return;
          rangeResetAll();
          renderAll();
          refreshProgressViews();
          ctx.refresh();
          toast('Range reset', 'All five machine saves cleared.', 'bad');
        });
      }
    }
  };

  /* ---------------- notes ---------------- */
  APPS.notes = {
    id: 'notes', name: 'Field Notes', short: 'Field Notes', icon: 'book', order: 40,
    width: 940, height: 700,
    render: function () {
      return '<div class="notes"><div class="notes-body">' +
        '<div class="eyebrow">Operator handbook</div>' +
        '<h1>Welcome to the range</h1>' +
        '<p>This is a synthetic training network built from five browser machines. Each machine is the real training app: it keeps its own content, its own scoring, and its own save. The range gives you one place to boot them, see progress, and move between skills.</p>' +
        '<div class="callout info"><span class="ci">&#9656;</span><div><b>Nothing here touches a real network.</b> Every scan, target, case file, and repository in these machines is simulated or local to the browser. Progress never leaves this device.</div></div>' +
        '<h2>The five machines</h2>' +
        '<table><thead><tr><th>Machine</th><th>Role</th><th>What you practice</th></tr></thead><tbody>' +
          RANGE_MACHINES.map(function (m) {
            return '<tr><td><b style="color:' + m.accent + '">' + esc(m.name) + '</b><br><span class="tiny dim">' + esc(m.code) + '</span></td><td>' + esc(m.role) + '</td><td>' + esc(m.tagline) + '</td></tr>';
          }).join('') +
        '</tbody></table>' +
        '<h2>Recommended route</h2>' +
        '<ol>' +
          '<li><b>ZeroDay Academy</b> if you need terminal fluency: Linux, Windows, text tools, scripting, networking.</li>' +
          '<li><b>GSEHACK</b> to apply that in a five-mission operator range: recon, cracking, logs, stego, SQL injection.</li>' +
          '<li><b>CODEWATCH</b> to move from commands to investigations: evidence, hashing, malware triage, reporting.</li>' +
          '<li><b>GitCI/CD Hero</b> to learn how the code and infrastructure actually ship: Git, pipelines, containers, DevSecOps.</li>' +
          '<li><b>Cyber Aware</b> to cover the human layer every operator still has to pass: phishing, MFA, data handling, reporting.</li>' +
        '</ol>' +
        '<p>You do not have to follow the order. The bay shows what you have touched, and each machine is independent.</p>' +
        '<h2>How progress works</h2>' +
        '<p>The range reads the same <code>localStorage</code> saves the apps already write. It does not modify them. Resetting a machine from the range deletes that app\'s save key only.</p>' +
        '<pre>compsci    zer0day-academy-v1\ngsehack    grizzlyse.save\ncybercrime codewatch_save_v2\ngitcicd    gitcicd.hero.save.v1\ncsia       cyberaware.save.v1</pre>' +
        '<h2>Operator shortcuts</h2>' +
        '<ul>' +
          '<li><code>Ctrl</code> + <code>K</code> opens the operator console (in the range).</li>' +
          '<li>Double-click a window title bar to maximize it.</li>' +
          '<li>The READY chip in the taskbar opens Range Status.</li>' +
          '<li>The console accepts <code>machines</code>, <code>status</code>, <code>launch gsehack</code>, <code>brief cybercrime</code>, and <code>reset csia confirm</code>.</li>' +
        '</ul>' +
        '<h2>Rules of the range</h2>' +
        '<ul>' +
          '<li>Only practice on systems you own or have written authorization to test.</li>' +
          '<li>The fictional cases and targets stay fictional. Do not reuse the techniques on real people or systems.</li>' +
          '<li>If a real incident happens, report it through the proper channel. The CODEWATCH help panel lists real hotlines.</li>' +
          '<li>Keep your own notes. The range measures completion; it cannot measure understanding.</li>' +
        '</ul>' +
        '<div class="callout"><span class="ci">&#9656;</span><div><b>Start here:</b> boot <b>ZeroDay Academy</b> for foundations, or <b>GSEHACK</b> if you already live in a terminal. The bay resumes your last machine.</div></div>' +
        '<p class="tiny dim">GRIZZLY RANGE is part of grizzlyse.com. Built by Grizzly System Engineering, East Helena, Montana.</p>' +
      '</div></div>';
    },
    action: function (ctx, a, el) {
      var m = el && el.dataset ? rangeById(el.dataset.id || '') : null;
      if (a === 'boot' && m) openMachine(m.id);
    }
  };

  /* ---------------- shell chrome ---------------- */
  var DESKTOP = [
    { app: 'ops' }, { app: 'bay' }, { app: 'console' }, { app: 'status' }, { app: 'notes' }
  ];
  var PINS = ['ops', 'bay', 'console', 'status', 'notes'];

  function renderIcons() {
    var wrap = $('#icons');
    if (!wrap) return;
    var html = '';
    DESKTOP.forEach(function (d) {
      var a = APPS[d.app];
      html += '<button class="d-icon" data-open="' + a.id + '"><span class="tile">' + ico(a.icon) + '</span><span>' + esc(a.short) + '</span></button>';
    });
    RANGE_MACHINES.forEach(function (m) {
      var p = rangeRead(m);
      html += '<button class="d-icon" data-boot="' + m.id + '" title="Boot ' + esc(m.name) + '">' +
        '<span class="tile machine" style="--a:' + m.accent + '">' + ico(m.icon) + (p.pct > 0 ? '<span class="badge">' + p.pct + '</span>' : '') + '</span>' +
        '<span>' + esc(m.short) + '</span></button>';
    });
    wrap.innerHTML = html;
  }

  function renderTaskbar() {
    var pins = $('#pins');
    if (pins) {
      pins.innerHTML = PINS.map(function (id) {
        var a = APPS[id];
        return '<button class="pin" data-pin="' + id + '" title="' + esc(a.name) + '">' + ico(a.icon) + '<span class="dot"></span></button>';
      }).join('');
    }
    $$('#pins .pin').forEach(function (b) {
      b.classList.toggle('running', Win.open.some(function (w) { return w.def.id === b.dataset.pin; }));
      b.classList.toggle('active', Win.open.some(function (w) { return w.def.id === b.dataset.pin && w.el.classList.contains('focused'); }));
    });
    var tasks = $('#tasks');
    if (tasks) {
      tasks.innerHTML = Win.open.map(function (w) {
        return '<button class="task ' + (w.el.classList.contains('focused') && !w.min ? 'active' : '') + '" data-task="' + w.id + '">' + ico(w.def.icon) + '<span>' + esc(w.opts.title || w.def.name) + '</span></button>';
      }).join('');
    }
    updateReadyChip();
  }

  function updateReadyChip() {
    var agg = rangeAggregate();
    var fill = $('#ready-fill'), val = $('#ready-val');
    if (fill) fill.style.width = agg.pct + '%';
    if (val) val.textContent = agg.pct + '%';
    var chip = $('#ready-chip');
    if (chip) chip.title = 'Range readiness ' + agg.pct + '% - ' + agg.modulesDone + '/' + agg.total + ' items';
  }

  function renderAll() {
    renderIcons();
    renderTaskbar();
  }

  function renderStart() {
    var q = ($('#start-filter') ? $('#start-filter').value : '').toLowerCase();
    var apps = Object.keys(APPS).map(function (k) { return APPS[k]; })
      .filter(function (a) { return !q || (a.name + ' ' + a.short).toLowerCase().indexOf(q) >= 0; })
      .sort(function (a, b) { return (a.order || 50) - (b.order || 50); });
    var grid = $('#start-grid');
    if (grid) {
      grid.innerHTML = apps.map(function (a) {
        return '<button class="start-app" data-start-app="' + a.id + '"><span class="tile">' + ico(a.icon) + '</span><span>' + esc(a.short) + '</span></button>';
      }).join('') || '<div class="tiny dim" style="padding:8px">No matching apps.</div>';
    }
    var machines = RANGE_MACHINES.filter(function (m) { return !q || (m.name + ' ' + m.role).toLowerCase().indexOf(q) >= 0; });
    var chips = $('#start-machines');
    if (chips) {
      chips.innerHTML = machines.map(function (m) {
        return '<button class="machine-chip" data-start-machine="' + m.id + '"><i style="--a:' + m.accent + '"></i>' + esc(m.short) + '</button>';
      }).join('') || '<span class="tiny dim">No matching machines.</span>';
    }
  }

  function openStart() {
    renderStart();
    $('#start-menu').hidden = false;
    setTimeout(function () { var f = $('#start-filter'); if (f) f.focus(); }, 30);
  }
  function closeStart() { var m = $('#start-menu'); if (m) m.hidden = true; }

  /* ---------------- boot / lock ---------------- */
  function bootSequence() {
    if (S.booted) {
      $('#boot').style.display = 'none';
      if (S.signedIn) { $('#lock').hidden = true; enterDesktop(true); }
      else { $('#lock').hidden = false; }
      return;
    }
    var lines = [
      ['GRIZZLY RANGE CONTROL  v1.1', '', 140],
      ['[ OK ] mounting /range .........................', 'ok', 170],
      ['[ OK ] machine bus: 5 nodes registered .........', 'ok', 170],
      ['[ OK ] local progress bus connected ............', 'ok', 170],
      ['[ OK ] operator profile: local .................', 'ok', 170],
      ['[ !! ] synthetic link - no external targets .....', 'warn', 220],
      ['[ OK ] range ready .............................', 'ok', 240],
      ['', '', 120],
      ['AWAITING OPERATOR...', 'dim', 300]
    ];
    var out = $('#boot-log');
    var i = 0;
    function tick() {
      if (i < lines.length) {
        var line = lines[i++];
        var div = document.createElement('div');
        if (line[1]) div.className = line[1];
        div.textContent = line[0];
        out.appendChild(div);
        $('#boot-bar').style.width = Math.round((i / lines.length) * 100) + '%';
        setTimeout(tick, line[2] || 160);
      } else {
        setTimeout(function () {
          $('#boot').classList.add('hide');
          setTimeout(function () { $('#boot').style.display = 'none'; }, 500);
          $('#lock').hidden = false;
          S.booted = true;
          saveShell();
        }, 420);
      }
    }
    tick();
  }

  function enterDesktop(quiet) {
    $('#lock').hidden = true;
    $('#boot').style.display = 'none';
    S.signedIn = true;
    saveShell();
    renderAll();
    if (location.hash === '#ops') setTimeout(function () { openApp('ops'); }, 260);
    if (!S.seenIntro && !quiet) {
      S.seenIntro = true;
      saveShell();
      setTimeout(showIntro, 400);
    }
  }

  function showIntro() {
    modal({
      title: 'RANGE CONTROL // operator briefing',
      width: 660,
      body:
        '<p style="margin-top:0">You are signed in as <b>operator</b> on a synthetic training network. Five machines are online.</p>' +
        '<div class="stack" style="gap:10px">' +
          '<div class="row" style="align-items:flex-start"><span class="tag gold">1</span><div><b>Take a work order.</b><div class="tiny dim">Range Ops gives you a graded task, the machine to do it on, and a validate step. That is the lab loop.</div></div></div>' +
          '<div class="row" style="align-items:flex-start"><span class="tag gold">2</span><div><b>Practice or open the course.</b><div class="tiny dim">Practice drops you into the app\'s sandbox, Git playground, Tool box, or terminal. Open course goes to the mission that satisfies the work order.</div></div></div>' +
          '<div class="row" style="align-items:flex-start"><span class="tag gold">3</span><div><b>Use the operator console.</b><div class="tiny dim">Type <code>machines</code>, <code>status</code>, or <code>launch gsehack</code>. Ctrl+Shift+L opens the lab dock inside any app.</div></div></div>' +
        '</div>' +
        '<div class="callout" style="margin-top:14px"><span class="ci">&#9656;</span><div><b>Start here:</b> Range Ops. The first work order is terminal basics on ZeroDay Academy.</div></div>',
      actions: [
        { label: 'Open Range Ops', kind: 'btn-gold', onClick: function () { openApp('ops'); } },
        { label: 'Machine Bay', kind: 'btn-ghost', onClick: function () { openApp('bay'); } }
      ]
    });
  }

  function signOut() {
    S.signedIn = false;
    saveShell();
    closeStart();
    Win.open.slice().forEach(closeWin);
    $('#lock').hidden = false;
    setTimeout(function () { var b = $('#enter-range'); if (b) b.focus(); }, 100);
  }

  /* ---------------- clock ---------------- */
  function tickClock() {
    var d = new Date();
    var time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    var date = d.toLocaleDateString([], { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase();
    var lt = $('#lock-time'), ld = $('#lock-date');
    if (lt) lt.textContent = time;
    if (ld) ld.textContent = d.toLocaleDateString([], { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    var ct = $('#clock-time'), cd = $('#clock-date');
    if (ct) ct.textContent = time;
    if (cd) cd.textContent = date;
  }

  /* ---------------- events ---------------- */
  document.addEventListener('click', function (e) {
    var t;
    if ((t = e.target.closest('[data-open]'))) { openApp(t.dataset.open); return; }
    if ((t = e.target.closest('[data-boot]'))) { openMachine(t.dataset.boot); return; }
    if ((t = e.target.closest('[data-pin]'))) { openApp(t.dataset.pin); return; }
    if ((t = e.target.closest('[data-start-app]'))) { closeStart(); openApp(t.dataset.startApp); return; }
    if ((t = e.target.closest('[data-start-machine]'))) { closeStart(); openMachine(t.dataset.startMachine); return; }
    if ((t = e.target.closest('[data-task]'))) {
      var rec = Win.open.filter(function (w) { return w.id === t.dataset.task; })[0];
      if (rec) { rec.min = false; rec.el.classList.remove('min'); focusWin(rec); }
      renderTaskbar();
      return;
    }
    if (e.target.closest('#ready-chip')) { openApp('status'); return; }
    if (e.target.closest('#net-btn')) { toast('Range network', 'Five local machines. No external targets.', 'good'); return; }
  });

  $('#enter-range').addEventListener('click', function () { enterDesktop(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !$('#lock').hidden) enterDesktop();
    if (e.key === 'Escape') closeStart();
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (!$('#lock').hidden) return;
      openApp('console');
    }
  });

  $('#start-btn').addEventListener('click', function (e) {
    e.stopPropagation();
    var m = $('#start-menu');
    if (m.hidden) openStart(); else closeStart();
  });
  $('#start-filter').addEventListener('input', renderStart);
  document.addEventListener('click', function (e) {
    var m = $('#start-menu');
    if (!m || m.hidden) return;
    if (e.target.closest('#start-menu') || e.target.closest('#start-btn')) return;
    closeStart();
  });
  $('#signout').addEventListener('click', signOut);
  $('#show-desktop').addEventListener('click', function () {
    Win.open.forEach(function (w) { w.min = true; w.el.classList.add('min'); });
    renderTaskbar();
  });

  window.addEventListener('resize', function () {
    var size = areaSize();
    Win.open.forEach(function (rec) {
      if (rec.max) return;
      rec.el.style.left = Math.min(parseInt(rec.el.style.left) || 8, Math.max(8, size.w - 120)) + 'px';
      rec.el.style.top = Math.min(parseInt(rec.el.style.top) || 8, Math.max(3, size.h - 60)) + 'px';
      if (rec.el.offsetWidth > size.w - 16) rec.el.style.width = (size.w - 16) + 'px';
      if (rec.el.offsetHeight > size.h - 10) rec.el.style.height = (size.h - 10) + 'px';
    });
  });

  /* ---------------- init ---------------- */
  tickClock();
  setInterval(tickClock, 1000);
  setInterval(function () { if (S.signedIn) updateReadyChip(); }, 4000);
  bootSequence();
  setTimeout(function () { if (!$('#lock').hidden) { var b = $('#enter-range'); if (b) b.focus(); } }, 2600);
})();
