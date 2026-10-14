/* ============================================================
   CSMath Hero - state.js
   All progression: XP, levels, per-skill mastery, realms,
   streaks, daily goal, achievements, settings, persistence.
   ============================================================ */
(function (MH) {
  'use strict';

  var KEY = 'csmathhero.save.v1';

  function blank() {
    return {
      version: 1,
      created: Date.now(),
      xp: 0,
      solved: 0,
      correct: 0,
      sessions: 0,
      skills: {},          // id -> { c, a, lvl, best, last }
      bosses: {},          // realmId -> { cleared, best }
      achievements: {},    // id -> timestamp
      streak: { count: 0, last: null, best: 0 },
      daily: { date: null, solved: 0, goal: 20 },
      challenge: { date: null, done: false },
      settings: { unlockAll: false, sound: true, timer: true, autoAdvance: false },
      mistakes: [],
      exams: [],
      drill: { best: 0, plays: 0, last: 0 },
      reviewDone: 0,
      path: 'full',
      log: []              // recent activity for the stats page
    };
  }

  MH.state = blank();

  MH.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(MH.state)); } catch (e) { /* private mode */ }
  };
  MH.load = function () {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        var data = JSON.parse(raw);
        MH.state = Object.assign(blank(), data);
        MH.state.settings = Object.assign(blank().settings, data.settings || {});
        MH.state.streak = Object.assign(blank().streak, data.streak || {});
        MH.state.daily = Object.assign(blank().daily, data.daily || {});
      }
    } catch (e) { MH.state = blank(); }
    MH.touchDaily();
    return MH.state;
  };
  MH.reset = function () {
    MH.state = blank();
    MH.save();
  };

  /* ---------- levels & titles ---------- */
  // XP needed to *reach* level n is 25*(n-1)*n  (50, 150, 300, 500, ...)
  MH.levelXP = function (n) { return 25 * (n - 1) * n; };
  MH.levelOf = function (xp) {
    var n = 1;
    while (MH.levelXP(n + 1) <= xp) n++;
    return n;
  };
  MH.levelProgress = function (xp) {
    var n = MH.levelOf(xp);
    var lo = MH.levelXP(n), hi = MH.levelXP(n + 1);
    return { level: n, into: xp - lo, span: hi - lo, pct: Math.round(((xp - lo) / (hi - lo)) * 100) };
  };
  var TITLES = [
    'Byte', 'Bit Wrangler', 'Loop Initiate', 'Variable Whisperer', 'Function Apprentice',
    'Proof Padawan', 'Matrix Adept', 'Recursion Ranger', 'Algorithm Alchemist',
    'Complexity Slayer', 'Theorem Hunter', 'Abstract Machine', 'Turing Complete',
    'Grandmaster of Computation', 'Zero to Hero'
  ];
  MH.titleFor = function (level) {
    var i = MH.clamp(Math.floor((level - 1) / 4), 0, TITLES.length - 1);
    return TITLES[i];
  };

  /* ---------- skills ---------- */
  MH.skillState = function (id) {
    if (!MH.state.skills[id]) MH.state.skills[id] = { c: 0, a: 0, lvl: 1, best: 1, last: null };
    return MH.state.skills[id];
  };
  MH.skillLevel = function (id) { return MH.skillState(id).lvl; };
  MH.stars = function (id) {
    var s = MH.state.skills[id];
    if (!s) return 0;
    // 5 stars = mastery. Each star needs 3 cumulative correct answers.
    return MH.clamp(Math.floor(s.c / 3), 0, 5);
  };
  MH.starsFor = function (correct) { return MH.clamp(Math.floor(correct / 3), 0, 5); };

  /* ---------- realms ---------- */
  MH.realmStars = function (realm) {
    return realm.skills.reduce(function (n, sk) { return n + MH.stars(sk.id); }, 0);
  };
  MH.realmMaxStars = function (realm) { return realm.skills.length * 5; };
  MH.realmPct = function (realm) {
    return Math.round((MH.realmStars(realm) / MH.realmMaxStars(realm)) * 100);
  };
  MH.realmUnlocked = function (realm, all) {
    if (MH.state.settings.unlockAll) return true;
    if (realm.index === 0) return true;
    var prev = all[realm.index - 1];
    if (!prev) return true;
    // Need at least a foothold in the previous realm: 3 stars or ~30% done.
    return MH.realmPct(prev) >= 30 || MH.realmPct(prev) >= 1 && MH.stars(prev.skills[0].id) >= 2;
  };

  /* ---------- daily / streak ---------- */
  MH.touchDaily = function () {
    var t = MH.todayKey();
    if (MH.state.daily.date !== t) {
      MH.state.daily.date = t;
      MH.state.daily.solved = 0;
      if (MH.state.streak.last) {
        var last = new Date(MH.state.streak.last + 'T00:00:00');
        var now = new Date(t + 'T00:00:00');
        var gap = Math.round((now - last) / 86400000);
        if (gap > 1) MH.state.streak.count = 0;
      }
    }
  };
  MH.recordSolved = function (wasCorrect) {
    MH.touchDaily();
    MH.state.solved++;
    MH.state.daily.solved++;
    if (wasCorrect) MH.state.correct++;
    var t = MH.todayKey();
    if (MH.state.streak.last !== t) {
      MH.state.streak.count++;
      MH.state.streak.last = t;
      MH.state.streak.best = Math.max(MH.state.streak.best, MH.state.streak.count);
    }
  };

  /* ---------- awarding XP ---------- */
  MH.award = function (amount, reason) {
    var before = MH.levelOf(MH.state.xp);
    MH.state.xp += amount;
    var after = MH.levelOf(MH.state.xp);
    MH.state.log.unshift({ t: Date.now(), xp: amount, reason: reason || '' });
    MH.state.log = MH.state.log.slice(0, 60);
    MH.save();
    return { levelUp: after > before, level: after, gained: amount };
  };

  MH.registerAnswer = function (skillId, wasCorrect, difficulty) {
    var s = MH.skillState(skillId);
    s.a++;
    if (wasCorrect) s.c++;
    s.last = Date.now();
    // Level 1..10 climbs with sustained success.
    var target = MH.clamp(1 + Math.floor(s.c / 3), 1, 10);
    if (target > s.lvl) s.lvl = target;
    s.best = Math.max(s.best, s.lvl);
    if (MH.srsUpdate) MH.srsUpdate(skillId, wasCorrect);
    return s;
  };

  /* ---------- achievements ---------- */
  MH.ACHIEVEMENTS = [
    { id: 'first', name: 'Hello, World', icon: '&#9679;', desc: 'Solve your first problem.', test: function (st) { return st.correct >= 1; } },
    { id: 'ten', name: 'Warmed Up', icon: '&#9889;', desc: 'Solve 10 problems correctly.', test: function (st) { return st.correct >= 10; } },
    { id: 'fifty', name: 'Grinder', icon: '&#9881;', desc: 'Solve 50 problems correctly.', test: function (st) { return st.correct >= 50; } },
    { id: 'twohundred', name: 'Relentless', icon: '&#9876;', desc: 'Solve 200 problems correctly.', test: function (st) { return st.correct >= 200; } },
    { id: 'streak3', name: 'Habit Formed', icon: '&#128293;', desc: 'Practice 3 days in a row.', test: function (st) { return st.streak.count >= 3; } },
    { id: 'streak7', name: 'Week of Proof', icon: '&#128293;', desc: 'Practice 7 days in a row.', test: function (st) { return st.streak.count >= 7; } },
    { id: 'daily', name: 'Daily Quota', icon: '&#127919;', desc: 'Hit a daily goal.', test: function (st) { return st.daily.solved >= st.daily.goal; } },
    { id: 'lvl5', name: 'Climbing', icon: '&#11014;', desc: 'Reach level 5.', test: function (st) { return MH.levelOf(st.xp) >= 5; } },
    { id: 'lvl10', name: 'Halfway Hero', icon: '&#11014;', desc: 'Reach level 10.', test: function (st) { return MH.levelOf(st.xp) >= 10; } },
    { id: 'lvl20', name: 'Asymptote', icon: '&#8734;', desc: 'Reach level 20.', test: function (st) { return MH.levelOf(st.xp) >= 20; } },
    { id: 'master1', name: 'Specialist', icon: '&#11088;', desc: 'Reach 5 stars in any skill.', test: function (st) { return Object.keys(st.skills).some(function (k) { return MH.stars(k) >= 5; }); } },
    { id: 'boss1', name: 'Realm Breaker', icon: '&#128081;', desc: 'Clear your first Realm Trial.', test: function (st) { return Object.keys(st.bosses).some(function (k) { return st.bosses[k].cleared; }); } },
    { id: 'bossAll', name: 'Completionist', icon: '&#127942;', desc: 'Clear every Realm Trial.', test: function (st) {
      return MH.CURRICULUM.realms.every(function (r) { return st.bosses[r.id] && st.bosses[r.id].cleared; });
    } },
    { id: 'perfect5', name: 'Flawless', icon: '&#128142;', desc: 'Finish a session with 100% accuracy (5+ problems).', test: function (st) { return st._lastPerfect; } },
    { id: 'scholar', name: 'Scholar', icon: '&#128218;', desc: 'Study 10 lessons.', test: function (st) { return MH.lessonsStudiedCount() >= 10; } },
    { id: 'autodidact', name: 'Autodidact', icon: '&#127891;', desc: 'Study 40 lessons.', test: function (st) { return MH.lessonsStudiedCount() >= 40; } },
    { id: 'curriculum', name: 'Curriculum Complete', icon: '&#127890;', desc: 'Study every lesson.', test: function (st) { return MH.lessonsStudiedCount() >= MH.ALL_SKILLS.length; } },
    { id: 'nightowl', name: 'Night Owl', icon: '&#127769;', desc: 'Study between midnight and 5am.', test: function () { var h = new Date().getHours(); return h >= 0 && h < 5; } },
    { id: 'bigo', name: 'O(1) Thinker', icon: '&#128200;', desc: '5-star an algorithms skill.', test: function (st) { return Object.keys(st.skills).some(function (k) { return k.indexOf('cs.') === 0 && MH.stars(k) >= 5; }); } },
    { id: 'proof', name: 'Q.E.D.', icon: '&#9633;', desc: '5-star a discrete-math skill.', test: function (st) { return Object.keys(st.skills).some(function (k) { return k.indexOf('dsc.') === 0 && MH.stars(k) >= 5; }); } },
    { id: 'challenge', name: 'Daily Devotee', icon: '&#128197;', desc: 'Complete a daily challenge.', test: function (st) { return !!(st.challenge && st.challenge.done); } },
    { id: 'drill', name: 'Quick Draw', icon: '&#9889;', desc: 'Score 20+ in a Lightning Round.', test: function (st) { return st.drill.best >= 20; } },
    { id: 'examtaker', name: 'Exam Ready', icon: '&#128221;', desc: 'Complete a mock exam.', test: function (st) { return st.exams.length >= 1; } },
    { id: 'examace', name: 'Distinction', icon: '&#127941;', desc: 'Score 90%+ on a mock exam.', test: function (st) { return st.exams.some(function (e) { return e.pct >= 90; }); } },
    { id: 'reviewer', name: 'Spaced Out', icon: '&#128257;', desc: 'Clear 20 problems in spaced review.', test: function (st) { return (st.reviewDone || 0) >= 20; } }
  ];

  MH.checkAchievements = function () {
    var fresh = [];
    MH.ACHIEVEMENTS.forEach(function (a) {
      if (MH.state.achievements[a.id]) return;
      var hit = false;
      try { hit = a.test(MH.state); } catch (e) { hit = false; }
      if (hit) {
        MH.state.achievements[a.id] = Date.now();
        fresh.push(a);
      }
    });
    if (fresh.length) MH.save();
    return fresh;
  };

  /* ---------- realm lookup ---------- */
  MH.realmOf = function (skillId) {
    var s = MH.skillById(skillId);
    if (!s) return null;
    for (var i = 0; i < MH.CURRICULUM.realms.length; i++) if (MH.CURRICULUM.realms[i].id === s.realm) return MH.CURRICULUM.realms[i];
    return null;
  };

  /* ---------- spaced repetition ----------
     Correct answers push a skill's next review further out (1,2,4,8,...60 days).
     A miss resets it to due-now so it comes back immediately. */
  MH.srsUpdate = function (skillId, wasCorrect) {
    var s = MH.skillState(skillId);
    if (wasCorrect) {
      s.ivl = Math.min(s.ivl ? s.ivl * 2 : 1, 60);
      s.due = Date.now() + s.ivl * 86400000;
    } else {
      s.ivl = 1;
      s.due = Date.now();          // due now
    }
    MH.save();
    return s;
  };
  MH.reviewDue = function (limit) {
    var now = Date.now();
    var out = MH.ALL_SKILLS.filter(function (sk) {
      var s = MH.state.skills[sk.id];
      if (!s || !s.due || s.c < 2) return false;         // need a little history first
      var realm = MH.realmOf(sk.id);
      if (realm && !MH.realmUnlocked(realm, MH.CURRICULUM.realms)) return false;
      return s.due <= now;
    });
    out.sort(function (a, b) { return (MH.state.skills[a.id].due) - (MH.state.skills[b.id].due); });
    return out.slice(0, limit || 12);
  };

  /* ---------- mistake notebook ---------- */
  MH.addMistake = function (p) {
    if (!p || !p.skill) return;
    MH.state.mistakes = MH.state.mistakes.filter(function (m) { return m.prompt !== p.prompt; });
    MH.state.mistakes.unshift({ id: MH.uid('m'), skill: p.skill, prompt: p.prompt, spec: p.answer, hint: p.hint, steps: p.steps, at: Date.now() });
    MH.state.mistakes = MH.state.mistakes.slice(0, 150);
    MH.save();
  };
  MH.clearMistakes = function () {
    MH.state.mistakes = [];
    MH.state._notebookCleared = true;
    MH.save();
  };

  /* ---------- daily challenge (deterministic per day) ---------- */
  MH.dailyChallenge = function () {
    var t = MH.todayKey();
    var seed = 2166136261;
    for (var i = 0; i < t.length; i++) { seed ^= t.charCodeAt(i); seed = (seed * 16777619) >>> 0; }
    var rng = MH.makeRng(seed);
    var pool = MH.ALL_SKILLS.filter(function (sk) {
      var realm = MH.realmOf(sk.id);
      return realm && MH.realmUnlocked(realm, MH.CURRICULUM.realms);
    });
    if (!pool.length) pool = MH.ALL_SKILLS.slice(0, 8);
    var pick = pool[Math.floor(rng() * pool.length)];
    var lvl = MH.clamp(2 + MH.stars(pick.id), 1, 10);
    var problems = [];
    for (var k = 0; k < 3; k++) { var p = MH.buildProblem(pick.id, lvl); if (p) problems.push(p); }
    return { date: t, skill: pick, problems: problems };
  };
  MH.dailyDone = function () { return MH.state.challenge.date === MH.todayKey() && MH.state.challenge.done; };
  MH.completeDaily = function () { MH.state.challenge = { date: MH.todayKey(), done: true }; MH.save(); };
})(window.MH);
