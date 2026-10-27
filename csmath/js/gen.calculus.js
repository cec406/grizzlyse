/* ============================================================
   CSMath Hero - gen.calculus.js
   Realm: Calculus
   ============================================================ */
(function (MH) {
  'use strict';
  var def = MH.def;
  function neg(n) { return n < 0 ? '&minus;' + Math.abs(n) : '' + n; }

  /* ---- Limits ---- */
  def('cal.limits', function (r, lvl) {
    var mode = r.pick(lvl < 4 ? ['poly', 'poly', 'inf'] : ['poly', 'factor', 'inf', 'hopital']);
    if (mode === 'poly') {
      var a = r.int(1, 4), b = r.int(-6, 6), c = r.int(-9, 9), k = r.int(-4, 4);
      return { prompt: 'Evaluate lim(x&rarr;' + neg(k) + ') of (' + a + 'x&sup2; ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + 'x ' + (c >= 0 ? '+ ' + c : '&minus; ' + Math.abs(c)) + ').',
        answer: { type: 'number', value: a * k * k + b * k + c },
        hint: 'Polynomials are continuous, so substitute directly.',
        steps: ['Substitute x = ' + neg(k) + ': ' + a + '(' + neg(k) + ')&sup2; + ' + b + '(' + neg(k) + ') + ' + c + ' = ' + (a * k * k + b * k + c)] };
    }
    if (mode === 'factor') {
      var root = r.nonzero(-6, 6), d = r.nonzero(-6, 6);
      var second = '(x ' + (d >= 0 ? '+ ' + d : '&minus; ' + Math.abs(d)) + ')';
      var first = '(x ' + (root >= 0 ? '&minus; ' + root : '+ ' + Math.abs(root)) + ')';
      var val = root + d;
      return { prompt: 'Evaluate lim(x&rarr;' + neg(root) + ') of ' + first + second + '/' + first + '.',
        answer: { type: 'number', value: val },
        hint: 'It is 0/0; cancel the common factor ' + first + ' first.',
        steps: ['Cancel ' + first + ': the expression becomes ' + second, 'Substitute x = ' + neg(root) + ': ' + neg(root) + ' + ' + neg(d) + ' = ' + val] };
    }
    if (mode === 'hopital') {
      var kk = r.int(2, 9);
      return { prompt: 'Evaluate lim(x&rarr;0) of sin(' + kk + 'x)/x.',
        answer: { type: 'number', value: kk, tol: 1e-9 },
        hint: '0/0 case &rarr; L&rsquo;H&ocirc;pital gives lim k·cos(kx)/1. (Or recall lim sin(u)/u = 1.)',
        steps: ['L&rsquo;H&ocirc;pital: d/dx sin(' + kk + 'x) = ' + kk + 'cos(' + kk + 'x), d/dx x = 1',
          'At x = 0: ' + kk + '·cos(0) = ' + kk] };
    }
    var p = r.int(1, 5), q = r.int(1, 5), c1 = r.nonzero(-9, 9), c2 = r.nonzero(-9, 9);
    return { prompt: 'Evaluate lim(x&rarr;&infin;) of (' + p + 'x&sup3; + ' + neg(c1) + ')/( ' + q + 'x&sup3; + ' + neg(c2) + ').',
      answer: { type: 'number', value: p / q, tol: 1e-9 },
      hint: 'Same degree &rarr; the limit is the ratio of leading coefficients.',
      steps: ['Degrees match, so the limit is ' + p + '/' + q + ' = ' + MH.nice(p / q, 4)] };
  });

  /* ---- Power rule ---- */
  def('cal.derivpower', function (r, lvl) {
    var a = r.int(1, 5), n = r.int(2, 4), k = r.int(-4, 4);
    var val = a * n * Math.pow(k, n - 1);
    return { prompt: 'If f(x) = ' + a + 'x^' + n + ', find f&prime;(' + neg(k) + ').',
      answer: { type: 'number', value: val },
      hint: 'd/dx (ax^n) = a·n·x^{n&minus;1}.',
      steps: ['f&prime;(x) = ' + (a * n) + 'x^' + (n - 1), 'f&prime;(' + neg(k) + ') = ' + (a * n) + '(' + neg(k) + ')^' + (n - 1) + ' = ' + val] };
  });

  /* ---- Product / quotient rule ---- */
  def('cal.derivprod', function (r, lvl) {
    var a = r.int(1, 5), b = r.nonzero(-9, 9), c = r.int(1, 5), d = r.nonzero(-9, 9), k = r.int(-3, 3);
    var u = a * k + b, up = a, v = c * k + d, vp = c;
    var val = up * v + u * vp;
    return { prompt: 'f(x) = (' + a + 'x ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + ')(' + c + 'x ' + (d >= 0 ? '+ ' + d : '&minus; ' + Math.abs(d)) + '). Find f&prime;(' + neg(k) + ').',
      answer: { type: 'number', value: val },
      hint: 'Product rule: (uv)&prime; = u&prime;v + uv&prime;.',
      steps: ['Let u = ' + a + 'x ' + (b >= 0 ? '+' + b : '&minus;' + Math.abs(b)) + ', v = ' + c + 'x ' + (d >= 0 ? '+' + d : '&minus;' + Math.abs(d)),
        'u&prime; = ' + up + ', v&prime; = ' + vp, 'f&prime;(' + neg(k) + ') = ' + up + '·' + neg(v) + ' + ' + neg(u) + '·' + vp + ' = ' + val] };
  });

  /* ---- Chain rule ---- */
  def('cal.chain', function (r, lvl) {
    var a = r.int(1, 4), b = r.nonzero(-6, 6), n = r.int(2, 4), k = r.int(-3, 3);
    var inner = a * k + b;
    var val = n * Math.pow(inner, n - 1) * a;
    return { prompt: 'f(x) = (' + a + 'x ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + ')^' + n + '. Find f&prime;(' + neg(k) + ').',
      answer: { type: 'number', value: val },
      hint: 'Chain rule: f&prime; = n(inner)^{n&minus;1} · inner&prime;.',
      steps: ['inner = ' + a + 'x ' + (b >= 0 ? '+' + b : '&minus;' + Math.abs(b)) + ', inner&prime; = ' + a,
        'f&prime;(x) = ' + n + '(' + inner + ')^{' + (n - 1) + '}·' + a, 'f&prime;(' + neg(k) + ') = ' + n + '·' + MH.nice(Math.pow(inner, n - 1), 3) + '·' + a + ' = ' + val] };
  });

  /* ---- Tangent lines ---- */
  def('cal.tangent', function (r, lvl) {
    var a = r.int(1, 4), n = r.int(2, 3), k = r.int(1, 4);
    var asked = r.pick(['slope', 'intercept']);
    var slope = a * n * Math.pow(k, n - 1);
    var fk = a * Math.pow(k, n);
    var b = fk - slope * k;
    if (asked === 'slope') return { prompt: 'Find the slope of the tangent line to f(x) = ' + a + 'x^' + n + ' at x = ' + k + '.',
      answer: { type: 'number', value: slope }, hint: 'Slope = f&prime;(' + k + ').',
      steps: ['f&prime;(x) = ' + (a * n) + 'x^' + (n - 1), 'f&prime;(' + k + ') = ' + slope] };
    return { prompt: 'Find the y-intercept b of the tangent line to f(x) = ' + a + 'x^' + n + ' at x = ' + k + '. (y = mx + b)',
      answer: { type: 'number', value: b },
      hint: 'Tangent: y = f(a) + f&prime;(a)(x &minus; a); rearrange for b.',
      steps: ['f(' + k + ') = ' + fk + ', f&prime;(' + k + ') = ' + slope, 'b = f(' + k + ') &minus; f&prime;(' + k + ')·' + k + ' = ' + b] };
  });

  /* ---- Optimisation ---- */
  def('cal.optimize', function (r, lvl) {
    var a = r.int(1, 5), b = r.nonzero(-12, 12), c = r.int(-20, 20);
    var xv = -b / (2 * a);
    var yv = a * xv * xv + b * xv + c;
    var mode = r.pick(['x', 'y']);
    if (mode === 'x') return { prompt: 'Find the x-value of the vertex (the extremum) of f(x) = ' + a + 'x&sup2; ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + 'x ' + (c >= 0 ? '+ ' + c : '&minus; ' + Math.abs(c)) + '.',
      answer: { type: 'number', value: xv, tol: 1e-4, display: MH.nice(xv, 4) }, hint: 'Set f&prime;(x) = 2ax + b = 0.',
      steps: ['2(' + a + ')x + ' + b + ' = 0', 'x = ' + MH.nice(xv, 4)] };
    return { prompt: 'Find the minimum or maximum value of f(x) = ' + a + 'x&sup2; ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + 'x ' + (c >= 0 ? '+ ' + c : '&minus; ' + Math.abs(c)) + '.',
      answer: { type: 'number', value: yv, tol: 1e-4, display: MH.nice(yv, 4) },
      hint: 'The extremum is at x = &minus;b/2a; substitute back.',
      steps: ['x* = &minus;b/2a = ' + MH.nice(xv, 4), 'f(x*) = ' + MH.nice(yv, 4), a > 0 ? 'a &gt; 0 so it is a minimum.' : 'a &lt; 0 so it is a maximum.'] };
  });

  /* ---- Definite integrals ---- */
  def('cal.integral', function (r, lvl) {
    var a = r.int(1, 4), n = r.int(1, 3), lo = r.int(0, 2), hi = lo + r.int(1, 4);
    function F(x) { return a * Math.pow(x, n + 1) / (n + 1); }
    var val = F(hi) - F(lo);
    return { prompt: 'Evaluate &int;' + lo + ' to ' + hi + ' of ' + a + 'x^' + n + ' dx.',
      answer: { type: 'number', value: MH.nice(val, 6) },
      hint: 'Antiderivative of ax^n is ax^{n+1}/(n+1); then F(hi) &minus; F(lo).',
      steps: ['F(x) = ' + a + 'x^' + (n + 1) + '/' + (n + 1), 'F(' + hi + ') = ' + MH.nice(F(hi), 4) + ', F(' + lo + ') = ' + MH.nice(F(lo), 4), '&int; = ' + MH.nice(val, 4)] };
  });

  /* ---- Series ---- */
  def('cal.series', function (r, lvl) {
    var mode = r.pick(['finite', 'infinite', 'p']);
    if (mode === 'finite') { var a1 = r.int(1, 9), rr = r.pick([2, 3]); var n = r.int(4, 8); var sum = a1 * (Math.pow(rr, n) - 1) / (rr - 1);
      return { prompt: 'Find the sum of the first ' + n + ' terms of the geometric series starting at ' + a1 + ' with ratio ' + rr + '.',
        answer: { type: 'number', value: sum }, hint: 'S = a(r&#8319; &minus; 1)/(r &minus; 1).',
        steps: [a1 + '(' + rr + '^' + n + ' &minus; 1)/(' + rr + ' &minus; 1) = ' + sum] }; }
    if (mode === 'infinite') { var a2 = r.int(2, 9), d = r.pick([2, 3, 4, 5]); var r2 = 1 / d; var s = a2 / (1 - r2);
      return { prompt: 'Find the sum of the infinite geometric series starting at ' + a2 + ' with ratio 1/' + d + '.',
        answer: { type: 'number', value: MH.nice(s, 6) }, hint: 'S = a/(1&minus;r) when |r| &lt; 1.',
        steps: ['r = 1/' + d + ' (|r| &lt; 1 so it converges)', a2 + '/(1 &minus; 1/' + d + ') = ' + MH.nice(s, 4)] }; }
    var p = r.pick([0.5, 1, 1.5, 2, 3]);
    var converge = p > 1;
    return { prompt: 'Does the p-series &sum; 1/n^' + p + ' converge or diverge?',
      answer: { type: 'choice', value: converge ? 0 : 1, choices: ['converges', 'diverges'], display: converge ? 'converges' : 'diverges' },
      hint: '&sum;1/n^p converges iff p &gt; 1.', steps: ['p = ' + p + (p > 1 ? ' &gt; 1 &rarr; converges.' : ' &le; 1 &rarr; diverges.')] };
  });
})(window.MH);
