/* ============================================================
   Cyber Aware - state.js
   Learner profile: name, XP, module progress, assessment,
   badges, streak, and certificate eligibility.
   ============================================================ */
(function (CY) {
  'use strict';

  var KEY = 'cyberaware.save.v1';

  function blank() {
    return {
      version: 1,
      name: '',
      created: Date.now(),
      xp: 0,
      modules: {},        // id -> { learned: ts, done: ts, best }
      assessment: { passed: false, best: 0, attempts: 0, ts: null },
      badges: {},
      streak: { count: 0, last: null, best: 0 },
      log: [],
      settings: { sound: true, audience: 'core' }
    };
  }

  CY.state = blank();

  CY.save = function () { CY.store.set(KEY, CY.state); };
  CY.load = function () {
    var d = CY.store.get(KEY, null);
    if (d) {
      CY.state = Object.assign(blank(), d);
      CY.state.streak = Object.assign(blank().streak, d.streak || {});
      CY.state.settings = Object.assign(blank().settings, d.settings || {});
      CY.state.assessment = Object.assign(blank().assessment, d.assessment || {});
    }
    return CY.state;
  };
  CY.reset = function () { CY.state = blank(); CY.save(); };

  /* ---------- levels ---------- */
  CY.levelXP = function (n) { return 60 * (n - 1) * n; };
  CY.levelOf = function (xp) { var n = 1; while (CY.levelXP(n + 1) <= xp) n++; return n; };
  CY.levelProgress = function (xp) {
    var n = CY.levelOf(xp), lo = CY.levelXP(n), hi = CY.levelXP(n + 1);
    return { level: n, into: xp - lo, span: hi - lo, pct: Math.round(((xp - lo) / (hi - lo)) * 100) };
  };
  var TITLES = ['Newcomer', 'Security Aware', 'Vigilant', 'Defender', 'Guardian', 'Cyber Champion'];
  CY.titleFor = function (level) { return TITLES[CY.clamp(Math.floor((level - 1) / 3), 0, TITLES.length - 1)]; };

  /* ---------- progress ---------- */
  CY.moduleState = function (id) { if (!CY.state.modules[id]) CY.state.modules[id] = {}; return CY.state.modules[id]; };
  CY.moduleLearned = function (id) { var m = CY.state.modules[id]; return !!(m && m.learned); };
  CY.moduleDone = function (id) { var m = CY.state.modules[id]; return !!(m && m.done); };

  CY.markLearned = function (id) {
    var m = CY.moduleState(id);
    if (!m.learned) { m.learned = Date.now(); CY.award(8, 'Studied: ' + id); }
    CY.save();
  };
  CY.markModuleDone = function (id) {
    var m = CY.moduleState(id);
    if (!m.done) { m.done = Date.now(); CY.award(25, 'Completed: ' + id); }
    CY.save();
  };

  CY.award = function (amount, reason) {
    var before = CY.levelOf(CY.state.xp);
    CY.state.xp += amount;
    var after = CY.levelOf(CY.state.xp);
    CY.state.log.unshift({ t: Date.now(), xp: amount, reason: reason || '' });
    CY.state.log = CY.state.log.slice(0, 60);
    CY.touchStreak();
    CY.save();
    return { levelUp: after > before, level: after };
  };
  CY.touchStreak = function () {
    var t = CY.todayKey();
    if (CY.state.streak.last !== t) {
      if (CY.state.streak.last) {
        var gap = Math.round((new Date(t + 'T00:00:00') - new Date(CY.state.streak.last + 'T00:00:00')) / 86400000);
        if (gap > 1) CY.state.streak.count = 0;
      }
      CY.state.streak.count++;
      CY.state.streak.last = t;
      CY.state.streak.best = Math.max(CY.state.streak.best, CY.state.streak.count);
    }
  };

  /* ---------- track / module completion ---------- */
  CY.trackProgress = function (track) {
    var total = track.modules.length, learned = 0, done = 0;
    track.modules.forEach(function (m) { if (CY.moduleLearned(m.id)) learned++; if (CY.moduleDone(m.id)) done++; });
    return { total: total, learned: learned, done: done, pct: total ? Math.round((done / total) * 100) : 0 };
  };
  CY.coreProgress = function () {
    var tr = CY.trackById('core');
    return tr ? CY.trackProgress(tr) : { total: 0, learned: 0, done: 0, pct: 0 };
  };
  CY.coreComplete = function () { var p = CY.coreProgress(); return p.total > 0 && p.done === p.total; };

  /* ---------- certificate ---------- */
  CY.certificateEligible = function () {
    return !!CY.state.name && CY.coreComplete() && CY.state.assessment.passed;
  };
  CY.certCode = function () {
    // deterministic-ish verification code from name + date
    var s = (CY.state.name || '') + (CY.state.assessment.ts || '');
    var h = 2166136261;
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return (h.toString(16).toUpperCase() + '000000').slice(0, 8);
  };

  /* ---------- badges ---------- */
  CY.BADGES = [
    { id: 'start', name: 'First Steps', icon: '&#128099;', desc: 'Study your first module.', test: function (s) { return Object.keys(s.modules).some(function (k) { return s.modules[k].learned; }); } },
    { id: 'phish', name: 'Phish Hunter', icon: '&#127907;', desc: 'Complete the phishing module.', test: function () { return CY.moduleDone('phishing'); } },
    { id: 'pass', name: 'Locked Down', icon: '&#128274;', desc: 'Complete the passwords module.', test: function () { return CY.moduleDone('passwords'); } },
    { id: 'mfa', name: 'Two-Factor Fan', icon: '&#128241;', desc: 'Complete the MFA module.', test: function () { return CY.moduleDone('mfa'); } },
    { id: 'half', name: 'Halfway There', icon: '&#127937;', desc: 'Complete half of the core training.', test: function () { var p = CY.coreProgress(); return p.total && p.done >= Math.ceil(p.total / 2); } },
    { id: 'core', name: 'Core Complete', icon: '&#127942;', desc: 'Finish every core module.', test: function () { return CY.coreComplete(); } },
    { id: 'certified', name: 'Certified Aware', icon: '&#128220;', desc: 'Earn your certificate.', test: function () { return CY.certificateEligible(); } },
    { id: 'adv', name: 'Technically Speaking', icon: '&#129520;', desc: 'Complete 3 advanced modules.', test: function () { var t = CY.trackById('advanced'); return t && t.modules.filter(function (m) { return CY.moduleDone(m.id); }).length >= 3; } },
    { id: 'ace', name: 'Ace', icon: '&#11088;', desc: 'Score 100% on the final assessment.', test: function (s) { return s.assessment.best >= 100; } },
    { id: 'streak3', name: 'Consistent', icon: '&#128293;', desc: 'Train 3 days in a row.', test: function (s) { return s.streak.count >= 3; } }
  ];
  CY.checkBadges = function () {
    var fresh = [];
    CY.BADGES.forEach(function (b) {
      if (CY.state.badges[b.id]) return;
      var hit = false; try { hit = b.test(CY.state); } catch (e) { hit = false; }
      if (hit) { CY.state.badges[b.id] = Date.now(); fresh.push(b); }
    });
    if (fresh.length) CY.save();
    return fresh;
  };
})(window.CY);
