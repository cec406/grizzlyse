/* ============================================================
   CSMath Hero - gen.functions.js
   Realm: Functions
   ============================================================ */
(function (MH) {
  'use strict';
  var def = MH.def;
  function neg(n) { return n < 0 ? '&minus;' + Math.abs(n) : '' + n; }
  function signed(c, v) { return c === 0 ? '' : (c > 0 ? (v ? ' + ' : ' + ') : (v ? ' &minus; ' : ' &minus; ')) + (Math.abs(c) === 1 && v ? '' : Math.abs(c)) + (v || ''); }

  /* ---- Evaluate a function ---- */
  def('fun.evalfun', function (r, lvl) {
    var a = r.int(1, 3), b = r.nonzero(-6, 6), c = r.int(-9, 9), k = r.int(-5, 5);
    var body = a + 'x&sup2; ' + (b >= 0 ? '+ ' + b + 'x ' : '&minus; ' + Math.abs(b) + 'x ') + (c >= 0 ? '+ ' + c : '&minus; ' + Math.abs(c));
    var v = a * k * k + b * k + c;
    return { prompt: 'If f(x) = ' + body + ', find f(' + neg(k) + ').',
      answer: { type: 'number', value: v },
      hint: 'Substitute x = ' + neg(k) + ' everywhere, then evaluate. Remember (' + neg(k) + ')&sup2; is positive.',
      steps: ['f(' + neg(k) + ') = ' + a + '(' + neg(k) + ')&sup2; ' + (b >= 0 ? '+ ' : '&minus; ') + Math.abs(b) + '(' + neg(k) + ') ' + (c >= 0 ? '+ ' : '&minus; ') + Math.abs(c),
        '= ' + (a * k * k) + ' ' + (b * k >= 0 ? '+ ' : '&minus; ') + Math.abs(b * k) + ' ' + (c >= 0 ? '+ ' : '&minus; ') + Math.abs(c) + ' = ' + v] };
  });

  /* ---- Composition ---- */
  def('fun.composition', function (r, lvl) {
    var a = r.int(2, 5), b = r.nonzero(-6, 6), c = r.int(2, 5), d = r.nonzero(-6, 6), k = r.int(-4, 4);
    var g = c * k + d, v = a * g + b;
    return { prompt: 'f(x) = ' + a + 'x ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + ' and g(x) = ' + c + 'x ' + (d >= 0 ? '+ ' + d : '&minus; ' + Math.abs(d)) + '. Find (f&compfn;g)(' + neg(k) + ').',
      answer: { type: 'number', value: v },
      hint: '(f&compfn;g)(k) = f(g(k)): inner function first.',
      steps: ['g(' + neg(k) + ') = ' + c + '(' + neg(k) + ') ' + (d >= 0 ? '+ ' : '&minus; ') + Math.abs(d) + ' = ' + neg(g),
        'f(' + neg(g) + ') = ' + a + '(' + neg(g) + ') ' + (b >= 0 ? '+ ' : '&minus; ') + Math.abs(b) + ' = ' + v] };
  });

  /* ---- Inverse ---- */
  def('fun.inverse', function (r, lvl) {
    if (r.chance(0.4)) {
      var k0 = r.int(-5, 5), cube = k0 * k0 * k0, sh = r.int(-9, 9);
      return { prompt: 'f(x) = x&sup3; ' + (sh >= 0 ? '+ ' + sh : '&minus; ' + Math.abs(sh)) + '. Find f&#8315;&sup1;(' + (cube + sh) + ').',
        answer: { type: 'number', value: k0 }, hint: 'f&#8315;&sup1;(y) solves f(x) = y: undo the cube.',
        steps: ['x&sup3; ' + (sh >= 0 ? '+' : '&minus;') + ' ' + Math.abs(sh) + ' = ' + (cube + sh), 'x&sup3; = ' + cube, 'x = ' + k0] };
    }
    var a = r.int(2, 6), b = r.nonzero(-9, 9), x = r.int(-6, 6), y = a * x + b;
    return { prompt: 'f(x) = ' + a + 'x ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + '. Find f&#8315;&sup1;(' + y + ').',
      answer: { type: 'number', value: x },
      hint: 'Swap x and y then solve: x = ' + a + 'y ' + (b >= 0 ? '+' : '&minus;') + ' ' + Math.abs(b) + '.',
      steps: ['f&#8315;&sup1;(x) = (x ' + (b >= 0 ? '&minus; ' + b : '+ ' + Math.abs(b)) + ')/' + a, 'f&#8315;&sup1;(' + y + ') = (' + y + ' ' + (b >= 0 ? '&minus; ' + b : '+ ' + Math.abs(b)) + ')/' + a + ' = ' + x] };
  });

  /* ---- Domain (multiple choice) ---- */
  def('fun.domain', function (r, lvl) {
    var kind = r.pick(['div', 'sqrt', 'log', 'poly']);
    var a = r.int(1, 9);
    if (kind === 'div') return { prompt: 'What is the domain of f(x) = 1/(x &minus; ' + a + ')?',
      answer: { type: 'choice', value: 0, choices: ['x &ne; ' + a, 'x &gt; ' + a, 'x &ge; ' + a, 'all real numbers'], display: 'x &ne; ' + a },
      hint: 'A denominator can never be zero.', steps: ['x &minus; ' + a + ' &ne; 0 &rarr; x &ne; ' + a] };
    if (kind === 'sqrt') return { prompt: 'What is the domain of f(x) = &radic;(x &minus; ' + a + ')?',
      answer: { type: 'choice', value: 2, choices: ['x &ne; ' + a, 'x &gt; ' + a, 'x &ge; ' + a, 'all real numbers'], display: 'x &ge; ' + a },
      hint: 'Even roots need a non-negative radicand.', steps: ['x &minus; ' + a + ' &ge; 0 &rarr; x &ge; ' + a] };
    if (kind === 'log') return { prompt: 'What is the domain of f(x) = log(x &minus; ' + a + ')?',
      answer: { type: 'choice', value: 1, choices: ['x &ne; ' + a, 'x &gt; ' + a, 'x &ge; ' + a, 'all real numbers'], display: 'x &gt; ' + a },
      hint: 'A logarithm needs a strictly positive argument.', steps: ['x &minus; ' + a + ' &gt; 0 &rarr; x &gt; ' + a] };
    return { prompt: 'What is the domain of the polynomial f(x) = x&sup3; &minus; ' + a + 'x + 1?',
      answer: { type: 'choice', value: 3, choices: ['x &ne; ' + a, 'x &gt; ' + a, 'x &ge; 0', 'all real numbers'], display: 'all real numbers' },
      hint: 'Polynomials have no holes or restrictions.', steps: ['Every real x works.'] };
  });

  /* ---- Exponential growth / decay ---- */
  def('fun.expgrowth', function (r, lvl) {
    var mode = r.pick(['growth', 'half', 'double']);
    if (mode === 'double') {
      var p0 = r.pick([100, 200, 500, 1000]), h = r.int(1, 3), t = h * r.int(2, 4);
      var v = p0 * Math.pow(2, t / h);
      return { prompt: 'A population of ' + p0 + ' bacteria doubles every ' + h + ' hours. What is the population after ' + t + ' hours?',
        answer: { type: 'number', value: v }, hint: 'Doubling periods = t/h, then multiply by 2^k.',
        steps: ['k = ' + t + '/' + h + ' = ' + (t / h), p0 + ' × 2^' + (t / h) + ' = ' + v] };
    }
    if (mode === 'half') {
      var p1 = r.pick([80, 160, 320, 640]), h1 = r.int(1, 4), t1 = h1 * r.int(1, 3);
      var v1 = p1 / Math.pow(2, t1 / h1);
      return { prompt: 'A sample of ' + p1 + ' mg has a half-life of ' + h1 + ' hours. How many mg remain after ' + t1 + ' hours?',
        answer: { type: 'number', value: MH.nice(v1, 4) }, hint: 'Multiply by (1/2)^{t/h}.',
        steps: [p1 + ' × (1/2)^' + (t1 / h1) + ' = ' + MH.nice(v1, 4)] };
    }
    var A = r.pick([1000, 2000, 500]), rate = r.pick([5, 8, 10, 12]), yrs = r.int(2, 6);
    var v2 = A * Math.pow(1 + rate / 100, yrs);
    return { prompt: '$' + A + ' is invested at ' + rate + '% annual interest, compounded yearly. What is the value after ' + yrs + ' years (nearest dollar)?',
      answer: { type: 'number', value: Math.round(v2), tol: 1 }, hint: 'A(t) = A&#8320;(1+r)^t.',
      steps: [A + '(1 + ' + (rate / 100) + ')^' + yrs + ' = ' + MH.nice(v2, 2), '&asymp; $' + Math.round(v2)] };
  });

  /* ---- Sequences & series ---- */
  def('fun.sequences', function (r, lvl) {
    var mode = r.pick(lvl < 4 ? ['arithN', 'geoN'] : ['arithN', 'geoN', 'arithSum', 'geoSum']);
    var a1 = r.int(1, 9), d = r.nonzero(-9, 9), n = r.int(5, 20);
    if (mode === 'arithN') return { prompt: 'An arithmetic sequence starts at ' + a1 + ' with common difference ' + d + '. What is term ' + n + '?',
      answer: { type: 'number', value: a1 + (n - 1) * d }, hint: 'a&#8345; = a&#8321; + (n&minus;1)d.',
      steps: [a1 + ' + (' + n + ' &minus; 1)(' + d + ') = ' + (a1 + (n - 1) * d)] };
    if (mode === 'arithSum') return { prompt: 'An arithmetic sequence starts at ' + a1 + ' with common difference ' + d + '. What is the sum of the first ' + n + ' terms?',
      answer: { type: 'number', value: n * (2 * a1 + (n - 1) * d) / 2 }, hint: 'S&#8345; = n(a&#8321; + a&#8345;)/2.',
      steps: ['a&#8345; = ' + (a1 + (n - 1) * d), 'S&#8345; = ' + n + '(' + a1 + ' + ' + (a1 + (n - 1) * d) + ')/2 = ' + (n * (2 * a1 + (n - 1) * d) / 2)] };
    var rr = r.pick([2, 3]), a2 = r.int(1, 4), nn = r.int(3, 7);
    if (mode === 'geoN') return { prompt: 'A geometric sequence starts at ' + a2 + ' with common ratio ' + rr + '. What is term ' + nn + '?',
      answer: { type: 'number', value: a2 * Math.pow(rr, nn - 1) }, hint: 'a&#8345; = a&#8321;r^{n&minus;1}.',
      steps: [a2 + ' × ' + rr + '^' + (nn - 1) + ' = ' + (a2 * Math.pow(rr, nn - 1))] };
    var sum = a2 * (Math.pow(rr, nn) - 1) / (rr - 1);
    return { prompt: 'A geometric sequence starts at ' + a2 + ' with ratio ' + rr + '. What is the sum of the first ' + nn + ' terms?',
      answer: { type: 'number', value: sum }, hint: 'S&#8345; = a(r&#8319; &minus; 1)/(r &minus; 1) for r &ne; 1.',
      steps: [a2 + '(' + rr + '^' + nn + ' &minus; 1)/(' + rr + ' &minus; 1) = ' + a2 + '(' + Math.pow(rr, nn) + ' &minus; 1)/' + (rr - 1) + ' = ' + sum] };
  });
})(window.MH);
