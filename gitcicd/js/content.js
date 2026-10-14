/* ============================================================
   GitCI/CD Hero - content.js
   Content registry: tracks, chapters, missions, quizzes.
   The actual content lives in content.*.js and registers here.
   ============================================================ */
(function (GH) {
  'use strict';

  GH.TRACKS = [];
  GH.track = function (o) { GH.TRACKS.push(o); return o; };

  GH.chapterById = function (id) {
    for (var i = 0; i < GH.TRACKS.length; i++) {
      var t = GH.TRACKS[i];
      for (var j = 0; j < t.chapters.length; j++) if (t.chapters[j].id === id) return t.chapters[j];
    }
    return null;
  };
  GH.trackById = function (id) {
    for (var i = 0; i < GH.TRACKS.length; i++) if (GH.TRACKS[i].id === id) return GH.TRACKS[i];
    return null;
  };
  GH.trackOfChapter = function (id) {
    for (var i = 0; i < GH.TRACKS.length; i++) {
      var t = GH.TRACKS[i];
      for (var j = 0; j < t.chapters.length; j++) if (t.chapters[j].id === id) return t;
    }
    return null;
  };
  GH.allMissions = function () {
    var out = [];
    GH.TRACKS.forEach(function (t) { t.chapters.forEach(function (c) { if (c.mission) { out.push(c.mission); } }); });
    return out;
  };
  GH.totalChapters = function () {
    var n = 0; GH.TRACKS.forEach(function (t) { n += t.chapters.length; }); return n;
  };
  GH.totalMissions = function () { return GH.allMissions().length; };

  /* ---------- quiz grading ---------- */
  GH.gradeQuiz = function (mission, answers) {
    var correct = 0;
    mission.questions.forEach(function (q, i) { if (answers[i] === q.a) correct++; });
    return { correct: correct, total: mission.questions.length, pct: Math.round((correct / mission.questions.length) * 100) };
  };

  /* ---------- mission helpers (used by content and graders) ---------- */
  GH.gitHelpers = {
    branchExists: function (g, name) { return !!g.branches[name]; },
    onBranch: function (g, name) { return g.head.type === 'branch' && g.head.name === name; },
    commitCount: function (g) { return Object.keys(g.commits).length; },
    tracked: function (g, path) { return path in g.headSnapshot(); },
    clean: function (g) { var s = g.status(); return s.clean; },
    tagExists: function (g, name) { return !!g.tags[name]; },
    hasRemote: function (g) { return !!g.remote; },
    pushed: function (g, branch) { return !!(g.remote && g.remote.branches && g.remote.branches[branch]); },
    merged: function (g, branch) { return g.isAncestor(g.branches[branch], g.headSha ? g.headSha() : g.branches[g.head.name]); }
  };
})(window.GH);
