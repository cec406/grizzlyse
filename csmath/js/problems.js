/* ============================================================
   CSMath Hero - problems.js
   The problem engine. Generators register themselves; the
   engine builds sessions, grades answers, and reads solutions.
   ============================================================ */
(function (MH) {
  'use strict';

  MH.gen = {};        // id -> function(rng, level) -> problem

  /* Register a generator. */
  MH.def = function (id, fn) { MH.gen[id] = fn; };

  /* ---------- answer normalisation & checking ---------- */
  function norm(s) {
    return String(s)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/\u2212/g, '-')     // unicode minus
      .replace(/×/g, '*').replace(/·/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/√\s*([0-9]+(?:\.[0-9]+)?|[a-z]+)/gi, 'sqrt($1)')   // √2 → sqrt(2), √x → sqrt(x)
      .replace(/√/g, 'sqrt(')
      .replace(/π/g, 'pi');
  }
  function stripThousands(s) {
    for (var i = 0; i < 4; i++) s = s.replace(/(\d),(\d{3})(?!\d)/g, '$1$2');
    return s;
  }
  function numOf(s) {
    s = String(s).trim().replace(/\u2212/g, '-');
    s = stripThousands(s);
    // a trailing % is treated as a unit on a percent answer ("25%" == 25)
    var perc = s.match(/^(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?)%$/i);
    if (perc) return parseFloat(perc[1]);
    // full arithmetic expression ("3/4", "sqrt(2)/2", "C(10,2)", "2^5", "sin(30)", ...)
    var ev = MH.exprEval(s);
    if (ev != null) return ev;
    return parseFloat(s);
  }

  /* Grade a raw user string against an answer spec.
     spec: { type: 'number'|'text'|'choice', value, tol, accept[], unit } */
  MH.grade = function (spec, raw) {
    if (raw == null || String(raw).trim() === '') return { ok: false, why: 'empty' };
    if (spec.type === 'choice') {
      return { ok: Number(raw) === Number(spec.value) };
    }
    if (spec.type === 'text') {
      var u = norm(raw);
      var pool = [spec.value].concat(spec.accept || []).map(norm);
      return { ok: pool.indexOf(u) !== -1 };
    }
    // number (default)
    var v = numOf(raw);
    if (isNaN(v)) return { ok: false, why: 'nan' };
    var tol = spec.tol == null ? (spec.abs != null ? spec.abs : 1e-6) : spec.tol;
    var ok = Math.abs(v - spec.value) <= Math.max(tol, Math.abs(spec.value) * 1e-9);
    return { ok: ok, got: v };
  };

  /* ---------- formatting the "expected" answer for display ---------- */
  MH.answerText = function (p) {
    var spec = p.answer;
    if (spec.type === 'choice') return spec.display != null ? spec.display : spec.choices[spec.value];
    if (spec.display != null) return spec.display;
    if (spec.type === 'number') {
      var v = spec.value;
      if (typeof v === 'number') {
        if (Math.abs(v - Math.round(v)) < 1e-9) return String(Math.round(v));
        return String(MH.nice(v, 4));
      }
    }
    return String(spec.value);
  };

  /* ---------- session building ---------- */
  MH.buildProblem = function (skillId, level) {
    var fn = MH.gen[skillId];
    if (!fn) return null;
    for (var tries = 0; tries < 20; tries++) {
      var rng = MH.makeRng(MH.seed());
      var p = fn(rng, level || 1);
      if (p && p.prompt) { p.skill = skillId; p.level = level || 1; return p; }
    }
    return null;
  };

  MH.buildSession = function (skillId, count, level) {
    count = count || 6;
    var out = [], seen = {};
    for (var i = 0; i < count; i++) {
      var p = MH.buildProblem(skillId, level);
      if (!p) break;
      var key = p.prompt;
      var guard = 0;
      while (seen[key] && guard++ < 8) { p = MH.buildProblem(skillId, level); key = p ? p.prompt : key; }
      if (p) { seen[p.prompt] = 1; out.push(p); }
    }
    return out;
  };

  MH.buildMixed = function (skillIds, count, levelFn) {
    var out = [];
    for (var i = 0; i < count; i++) {
      var id = skillIds[i % skillIds.length];
      var lvl = levelFn ? levelFn(id) : MH.skillLevel(id);
      var p = MH.buildProblem(id, lvl);
      if (p) out.push(p);
    }
    return out;
  };

  /* ---------- XP economy ---------- */
  MH.xpFor = function (p, correct, streak) {
    if (!correct) return 0;
    var base = 4 + p.level * 2;              // harder problems pay more
    var bonus = streak >= 5 ? 3 : streak >= 3 ? 1 : 0;
    return base + bonus;
  };

  /* ---------- weak-skill recommender (spaced practice) ---------- */
  MH.weakSkills = function (n) {
    var all = [];
    MH.CURRICULUM.realms.forEach(function (r) {
      if (!MH.realmUnlocked(r, MH.CURRICULUM.realms)) return;
      r.skills.forEach(function (sk) {
        var s = MH.state.skills[sk.id];
        var stars = MH.stars(sk.id);
        var recency = s && s.last ? (Date.now() - s.last) / 86400000 : 99;
        // low stars + long since practised = higher priority
        var score = (5 - stars) * 10 + Math.min(recency, 30);
        all.push({ id: sk.id, score: score, stars: stars });
      });
    });
    all.sort(function (a, b) { return b.score - a.score || Math.random() - 0.5; });
    return all.slice(0, n || 6).map(function (x) { return x.id; });
  };
})(window.MH);
