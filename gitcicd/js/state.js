/* ============================================================
   GitCI/CD Hero - state.js
   Player profile: XP, levels, badges, streaks, completion.
   ============================================================ */
(function (GH) {
  'use strict';

  var KEY = 'gitcicd.hero.save.v1';

  function blank() {
    return {
      version: 1,
      created: Date.now(),
      xp: 0,
      lessons: {},        // lessonId -> timestamp
      missions: {},       // missionId -> timestamp
      quizzes: {},        // quizId -> { best, pct }
      badges: {},         // badgeId -> timestamp
      streak: { count: 0, last: null, best: 0 },
      daily: { date: null, done: false },
      settings: { sound: true, showAll: true },
      log: []
    };
  }

  GH.state = blank();

  GH.save = function () { GH.store.set(KEY, GH.state); };
  GH.load = function () {
    var d = GH.store.get(KEY, null);
    if (d) {
      GH.state = Object.assign(blank(), d);
      GH.state.streak = Object.assign(blank().streak, d.streak || {});
      GH.state.daily = Object.assign(blank().daily, d.daily || {});
      GH.state.settings = Object.assign(blank().settings, d.settings || {});
    }
    GH.touchDaily();
    return GH.state;
  };
  GH.reset = function () { GH.state = blank(); GH.save(); };

  /* ---------- levels ---------- */
  GH.levelXP = function (n) { return 80 * (n - 1) * n; };   // 160, 480, 960, ...
  GH.levelOf = function (xp) { var n = 1; while (GH.levelXP(n + 1) <= xp) n++; return n; };
  GH.levelProgress = function (xp) {
    var n = GH.levelOf(xp), lo = GH.levelXP(n), hi = GH.levelXP(n + 1);
    return { level: n, into: xp - lo, span: hi - lo, pct: Math.round(((xp - lo) / (hi - lo)) * 100) };
  };
  var TITLES = [
    'Curious', 'First Commit', 'Staging Area', 'Branch Rookie', 'Merge Apprentice',
    'Rebase Adept', 'Pipeline Builder', 'Workflow Engineer', 'Container Captain',
    'Release Engineer', 'Pipeline Architect', 'Security Champion',
    'DevSecOps Legend', 'Zero to Hero'
  ];
  GH.titleFor = function (level) { return TITLES[GH.clamp(Math.floor((level - 1) / 3), 0, TITLES.length - 1)]; };

  /* ---------- progress ---------- */
  GH.lessonDone = function (id) { return !!GH.state.lessons[id]; };
  GH.missionDone = function (id) { return !!GH.state.missions[id]; };
  GH.quizBest = function (id) { return GH.state.quizzes[id] ? GH.state.quizzes[id].pct : 0; };

  GH.markLesson = function (id) { if (!GH.state.lessons[id]) { GH.state.lessons[id] = Date.now(); GH.award(10, 'Lesson: ' + id); } };
  GH.markMission = function (id) {
    if (!GH.state.missions[id]) { GH.state.missions[id] = Date.now(); GH.award(30, 'Mission: ' + id); GH.recordActivity(); }
    GH.save();
  };
  GH.recordQuiz = function (id, pct) {
    var cur = GH.state.quizzes[id] || { best: 0, pct: 0 };
    cur.pct = Math.max(cur.pct, pct); cur.best = Math.max(cur.best, pct);
    GH.state.quizzes[id] = cur;
    if (pct >= 60) GH.award(Math.round(pct / 2), 'Quiz: ' + id);
    GH.recordActivity();
    GH.save();
  };

  /* ---------- xp / activity / daily ---------- */
  GH.award = function (amount, reason) {
    var before = GH.levelOf(GH.state.xp);
    GH.state.xp += amount;
    var after = GH.levelOf(GH.state.xp);
    GH.state.log.unshift({ t: Date.now(), xp: amount, reason: reason || '' });
    GH.state.log = GH.state.log.slice(0, 60);
    GH.save();
    return { levelUp: after > before, level: after };
  };
  GH.touchDaily = function () {
    var t = GH.todayKey();
    if (GH.state.daily.date !== t) {
      GH.state.daily.date = t; GH.state.daily.done = false;
      if (GH.state.streak.last) {
        var gap = Math.round((new Date(t + 'T00:00:00') - new Date(GH.state.streak.last + 'T00:00:00')) / 86400000);
        if (gap > 1) GH.state.streak.count = 0;
      }
    }
  };
  GH.recordActivity = function () {
    GH.touchDaily();
    var t = GH.todayKey();
    if (GH.state.streak.last !== t) {
      GH.state.streak.count++;
      GH.state.streak.last = t;
      GH.state.streak.best = Math.max(GH.state.streak.best, GH.state.streak.count);
    }
    GH.save();
  };

  /* ---------- badges ---------- */
  GH.BADGES = [
    { id: 'hello', name: 'Hello, Git', icon: '&#128075;', desc: 'Read your first lesson.', test: function (s) { return Object.keys(s.lessons).length >= 1; } },
    { id: 'commit', name: 'It&rsquo;s Alive', icon: '&#128190;', desc: 'Complete your first mission.', test: function (s) { return Object.keys(s.missions).length >= 1; } },
    { id: 'branchmaster', name: 'Branch Manager', icon: '&#127793;', desc: 'Finish 5 missions.', test: function (s) { return Object.keys(s.missions).length >= 5; } },
    { id: 'tenmissions', name: 'Committer', icon: '&#128221;', desc: 'Finish 10 missions.', test: function (s) { return Object.keys(s.missions).length >= 10; } },
    { id: 'twenty', name: 'Serial Shipper', icon: '&#128640;', desc: 'Finish 20 missions.', test: function (s) { return Object.keys(s.missions).length >= 20; } },
    { id: 'alllessons', name: 'Bookworm', icon: '&#128218;', desc: 'Read 20 lessons.', test: function (s) { return Object.keys(s.lessons).length >= 20; } },
    { id: 'quizace', name: 'Quiz Ace', icon: '&#127942;', desc: 'Score 100% on any quiz.', test: function (s) { return Object.keys(s.quizzes).some(function (k) { return s.quizzes[k].pct >= 100; }); } },
    { id: 'streak3', name: 'Habit Formed', icon: '&#128293;', desc: '3-day streak.', test: function (s) { return s.streak.count >= 3; } },
    { id: 'streak7', name: 'Week Strong', icon: '&#128293;', desc: '7-day streak.', test: function (s) { return s.streak.count >= 7; } },
    { id: 'lvl5', name: 'Rising', icon: '&#11014;', desc: 'Reach level 5.', test: function (s) { return GH.levelOf(s.xp) >= 5; } },
    { id: 'lvl10', name: 'Engineer', icon: '&#128736;', desc: 'Reach level 10.', test: function (s) { return GH.levelOf(s.xp) >= 10; } },
    { id: 'lvl15', name: 'Legend', icon: '&#127775;', desc: 'Reach level 15.', test: function (s) { return GH.levelOf(s.xp) >= 15; } },
    { id: 'capstone', name: 'Capstone Complete', icon: '&#127942;', desc: 'Finish both capstone deliverables.', test: function () { return GH.capstoneDone && GH.capstoneDone(); } },
    { id: 'allchapters', name: 'Completionist', icon: '&#128081;', desc: 'Finish every chapter and mission.', test: function () { return GH.TRACKS.every(function (t) { return GH.trackProgress(t).done === t.chapters.length; }); } }
  ];
  GH.checkBadges = function () {
    var fresh = [];
    GH.BADGES.forEach(function (b) {
      if (GH.state.badges[b.id]) return;
      var hit = false; try { hit = b.test(GH.state); } catch (e) { hit = false; }
      if (hit) { GH.state.badges[b.id] = Date.now(); fresh.push(b); }
    });
    if (fresh.length) GH.save();
    return fresh;
  };

  /* ---------- completion helpers ---------- */
  GH.trackProgress = function (track) {
    var total = track.chapters.length, lessons = 0, missions = 0, done = 0;
    track.chapters.forEach(function (c) {
      if (GH.lessonDone(c.id)) lessons++;
      if (!c.mission || GH.missionDone(c.mission.id)) missions++;
      if (GH.lessonDone(c.id) && (!c.mission || GH.missionDone(c.mission.id))) done++;
    });
    return { total: total, done: done, lessons: lessons, missionsDone: missions, pct: total ? Math.round((done / total) * 100) : 0 };
  };
})(window.GH);
