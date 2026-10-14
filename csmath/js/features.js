/* ============================================================
   CSMath Hero - features.js
   Super-teacher layer: guided learning paths, mock-exam builder,
   and the Lightning Round mental-math drill pool.
   ============================================================ */
(function (MH) {
  'use strict';

  /* ---------------------------------------------------------- */
  /* GUIDED LEARNING PATHS                                       */
  /* ---------------------------------------------------------- */
  var S_FND = ['fnd.integers', 'fnd.order', 'fnd.factors', 'fnd.fractions', 'fnd.decimals', 'fnd.percent', 'fnd.exponents', 'fnd.scinot'];
  var S_PRE = ['pre.evaluate', 'pre.liketerms', 'pre.onestep', 'pre.twostep', 'pre.distribute', 'pre.inequality', 'pre.ratio', 'pre.slope'];

  MH.PATHS = [
    {
      id: 'zero', name: 'Zero \u2192 Confident', icon: '&#127937;', color: '#38bdf8',
      blurb: 'Rebuild arithmetic and algebra from the ground up. Start here if maths feels rusty.',
      steps: S_FND.concat(S_PRE)
    },
    {
      id: 'algorithms', name: 'Zero \u2192 Algorithms', icon: '&#9203;', color: '#f43f5e',
      blurb: 'The maths that makes complexity and algorithm analysis click.',
      steps: ['alg.exponentlaws', 'alg.logs', 'fun.sequences', 'dsc.logic', 'dsc.sets', 'dsc.recurrence',
        'cs.bigo', 'cs.growthcompare', 'cs.master', 'cs.binsearch', 'cs.bubblesort', 'cs.mergesort',
        'cs.dpstates', 'cs.structures', 'dsc.combinatorics', 'dsc.graphs']
    },
    {
      id: 'ml', name: 'Zero \u2192 Machine Learning', icon: '&#129302;', color: '#a855f7',
      blurb: 'Linear algebra, calculus, and probability — the three pillars of ML.',
      steps: ['alg.slopeintercept', 'fun.evalfun', 'alg.systems', 'alg.quadratic', 'lin.vectorops',
        'lin.dotangle', 'lin.matmul', 'lin.determinant', 'lin.solve', 'lin.eigen',
        'cal.limits', 'cal.derivpower', 'cal.chain', 'cal.tangent', 'cal.optimize', 'cal.integral',
        'prb.basic', 'prb.conditional', 'prb.expected', 'prb.variance', 'prb.binomial', 'prb.normal']
    },
    {
      id: 'systems', name: 'Zero \u2192 Systems & Security', icon: '&#128274;', color: '#10b981',
      blurb: 'Binary, bits, modular arithmetic, and the logic that underpins crypto and low-level code.',
      steps: ['bits.binary', 'bits.hex', 'bits.bitwise', 'bits.shift', 'bits.twoscomp', 'bits.boolean',
        'bits.range', 'bits.euclid', 'bits.modpow', 'dsc.divisibility', 'dsc.logic', 'prb.basic',
        'prb.union', 'prb.conditional', 'cs.bigo', 'cs.structures']
    },
    {
      id: 'graphics', name: 'Zero \u2192 Graphics & Games', icon: '&#127918;', color: '#ec4899',
      blurb: 'Vectors, matrices, trigonometry, and the calculus behind motion and shading.',
      steps: ['trg.ratios', 'trg.special', 'trg.radians', 'trg.unitcircle', 'trg.pythident',
        'lin.vectorops', 'lin.dotangle', 'lin.matmul', 'lin.determinant', 'fun.evalfun',
        'alg.slopeintercept', 'cal.derivpower', 'cal.chain']
    },
    {
      id: 'discrete', name: 'Zero \u2192 Discrete Math', icon: '&#9679;', color: '#14b8a6',
      blurb: 'Sets, logic, counting, graphs, and proofs — the dialect of theoretical CS.',
      steps: ['dsc.sets', 'dsc.logic', 'dsc.inclusionexcl', 'dsc.combinatorics', 'dsc.pigeonhole',
        'dsc.graphs', 'dsc.recurrence', 'dsc.divisibility', 'alg.logs', 'fun.sequences', 'prb.counting']
    },
    {
      id: 'full', name: 'Full Masters Curriculum', icon: '&#127891;', color: '#eab308',
      blurb: 'Everything, in dependency order. The whole journey from zero to hero.',
      steps: null   // filled at the bottom = all skills in realm order
    }
  ];

  // the "full" path is simply every skill in curriculum order
  (function () {
    for (var i = 0; i < MH.PATHS.length; i++) {
      if (MH.PATHS[i].id === 'full') {
        MH.PATHS[i].steps = MH.ALL_SKILLS.map(function (s) { return s.id; });
      }
    }
  })();

  MH.getPath = function (id) {
    for (var i = 0; i < MH.PATHS.length; i++) if (MH.PATHS[i].id === id) return MH.PATHS[i];
    return MH.PATHS[MH.PATHS.length - 1];
  };

  // a step is "done" at 3 stars (a solid foothold), and the path is complete at 5.
  MH.pathProgress = function (path) {
    var done = 0, next = null, mastered = 0;
    path.steps.forEach(function (id) {
      var st = MH.stars(id);
      if (st >= 3) done++;
      if (st >= 5) mastered++;
      if (!next && st < 3) next = id;
    });
    return {
      done: done, total: path.steps.length, mastered: mastered,
      pct: path.steps.length ? Math.round((done / path.steps.length) * 100) : 0,
      next: next || path.steps[path.steps.length - 1]
    };
  };

  /* ---------------------------------------------------------- */
  /* MOCK EXAM BUILDER                                           */
  /* ---------------------------------------------------------- */
  MH.buildExam = function (opts) {
    opts = opts || {};
    var realmIds = opts.realmIds || MH.CURRICULUM.realms.filter(function (r) {
      return MH.realmUnlocked(r, MH.CURRICULUM.realms);
    }).map(function (r) { return r.id; });
    var pool = [];
    MH.CURRICULUM.realms.forEach(function (r) {
      if (realmIds.indexOf(r.id) === -1) return;
      r.skills.forEach(function (s) { pool.push(s.id); });
    });
    if (!pool.length) pool = MH.ALL_SKILLS.map(function (s) { return s.id; });
    var rng = MH.makeRng(MH.seed());
    var shuffled = rng.shuffle(pool);
    var count = Math.min(opts.count || 15, shuffled.length);
    var out = [];
    // spread across skills first, then allow repeats at higher difficulty
    for (var i = 0; i < count; i++) {
      var id = shuffled[i % shuffled.length];
      var lvl = MH.clamp((MH.skillLevel(id) || 1) + Math.floor(i / shuffled.length), 1, 10);
      var p = MH.buildProblem(id, lvl);
      if (p) out.push(p);
    }
    return out;
  };

  /* ---------------------------------------------------------- */
  /* LIGHTNING ROUND - mental-math fluency drill                 */
  /* ---------------------------------------------------------- */
  function q(prompt, value, hint, steps, accept, display) {
    return { prompt: prompt, answer: { type: 'number', value: value, display: display, desc: accept }, hint: hint, steps: steps || [prompt + ' = ' + (display || value)], level: 2 };
  }
  MH.DRILL = [
    function (r) { var a = r.int(6, 29), b = r.int(6, 29); return q(a + ' + ' + b, a + b, 'Add the tens, then the ones.'); },
    function (r) { var a = r.int(15, 60), b = r.int(4, 14); return q(a + ' &minus; ' + b, a - b, 'Subtract, or count up from ' + b + '.'); },
    function (r) { var a = r.int(3, 12), b = r.int(3, 12); return q(a + ' &times; ' + b, a * b, 'Recall your times tables.'); },
    function (r) { var a = r.int(4, 20); return q(a + '&sup2;', a * a, 'Square it.'); },
    function (r) { var n = r.int(2, 12); return q('2^' + n, Math.pow(2, n), 'Powers of two: 2,4,8,16,&hellip;'); },
    function (r) { var n = r.int(2, 12); return q('&radic;' + (n * n), n, 'What squares to this?'); },
    function (r) { var bits = r.int(4, 7), s = ''; for (var i = 0; i < bits; i++) s += r.int(0, 1); if (s[0] === '0') s = '1' + s.slice(1); return q(s + '&#8322; &rarr; decimal', parseInt(s, 2), 'Add the place values 1,2,4,8,&hellip;'); },
    function (r) { var n = r.int(5, 40); return { prompt: n + ' &rarr; binary', answer: { type: 'text', value: n.toString(2) }, hint: 'Divide by 2, read remainders bottom-up.', steps: [n + ' = ' + n.toString(2) + '&#8322;'], level: 2 }; },
    function (r) { var p = r.pick([10, 20, 25, 50, 5]); var w = r.pick([40, 60, 80, 120, 200]); return q(p + '% of ' + w, w * p / 100, 'Convert to a decimal and multiply.'); },
    function (r) { var m = r.pick([3, 4, 5, 7, 9]); var a = r.int(20, 90); return q(a + ' mod ' + m, a % m, 'Remainder after dividing by ' + m + '.'); },
    function (r) { var f = r.pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [1, 8], [1, 10]]); return q(f[0] + '/' + f[1] + ' as a decimal', f[0] / f[1], 'Divide the top by the bottom.'); },
    function (r) { var a = r.int(8, 20), b = r.int(8, 20); return q('gcd(' + a + ', ' + b + ')', MH.gcd(a, b), 'Shared factors.'); }
  ];
  MH.drillProblem = function () {
    var rng = MH.makeRng(MH.seed());
    return rng.pick(MH.DRILL)(rng);
  };

  /* ---------------------------------------------------------- */
  /* EXPORT / IMPORT                                             */
  /* ---------------------------------------------------------- */
  MH.exportProgress = function () {
    return JSON.stringify({ app: 'csmath-hero', version: 1, exported: Date.now(), state: MH.state }, null, 0);
  };
  MH.importProgress = function (text) {
    try {
      var data = JSON.parse(text);
      var st = data && data.state ? data.state : data;
      if (!st || typeof st !== 'object' || st.xp == null) return false;
      MH.state = Object.assign(MH.state, st);
      MH.save();
      return true;
    } catch (e) { return false; }
  };
})(window.MH);
