/* ============================================================
   CSMath Hero - gen.algebra.js
   Realm: Algebra
   ============================================================ */
(function (MH) {
  'use strict';
  var def = MH.def;
  function neg(n) { return n < 0 ? '&minus;' + Math.abs(n) : '' + n; }
  function fr(x, dp) { return MH.nice(x, dp == null ? 4 : dp); }

  /* ---- Lines: find b or slope ---- */
  def('alg.slopeintercept', function (r, lvl) {
    var m = r.nonzero(-5, 5), b = r.int(-9, 9);
    var x1 = r.int(-6, 6), x2 = x1 + r.nonzero(1, 5);
    var y1 = m * x1 + b, y2 = m * x2 + b;
    var mode = r.pick(lvl < 4 ? ['b', 'b'] : ['b', 'm', 'equation']);
    if (mode === 'm') return { prompt: 'Find the slope of the line through (' + x1 + ', ' + neg(y1) + ') and (' + x2 + ', ' + neg(y2) + ').',
      answer: { type: 'number', value: m }, hint: 'm = &Delta;y/&Delta;x.', steps: ['&Delta;y = ' + (y2 - y1) + ', &Delta;x = ' + (x2 - x1), 'm = ' + m] };
    if (mode === 'equation') {
      return { prompt: 'A line has slope ' + m + ' and passes through (' + x1 + ', ' + neg(y1) + '). What is its y-intercept b (in y = mx + b)?',
        answer: { type: 'number', value: b }, hint: 'Substitute the point into y = mx + b and solve for b.',
        steps: [neg(y1) + ' = ' + m + '(' + x1 + ') + b', 'b = ' + neg(y1) + ' &minus; ' + (m * x1) + ' = ' + b] };
    }
    return { prompt: 'Find the y-intercept of the line through (' + x1 + ', ' + neg(y1) + ') and (' + x2 + ', ' + neg(y2) + ').',
      answer: { type: 'number', value: b }, hint: 'Find the slope, then substitute one point.',
      steps: ['m = (' + neg(y2) + ' &minus; (' + neg(y1) + '))/(' + x2 + ' &minus; ' + x1 + ') = ' + m, 'b from y &minus; mx = ' + neg(y1) + ' &minus; ' + m + '(' + x1 + ') = ' + b] };
  });

  /* ---- Linear systems ---- */
  def('alg.systems', function (r, lvl) {
    var x = r.nonzero(-8, 8), y = r.nonzero(-8, 8);
    var a1 = r.nonzero(-4, 5), b1 = r.nonzero(-4, 5), a2 = r.nonzero(-4, 5), b2 = r.nonzero(-4, 5);
    if (a1 * b2 - a2 * b1 === 0) return null; // singular => rebuild
    var c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
    var ask = r.pick(['x', 'y']);
    return { prompt: 'Solve the system:<br>' + a1 + 'x ' + (b1 >= 0 ? '+ ' + b1 : '&minus; ' + Math.abs(b1)) + 'y = ' + c1 +
        '<br>' + a2 + 'x ' + (b2 >= 0 ? '+ ' + b2 : '&minus; ' + Math.abs(b2)) + 'y = ' + c2 + '<br>What is ' + ask + '?',
      answer: { type: 'number', value: ask === 'x' ? x : y },
      hint: 'Eliminate one variable by scaling an equation and adding. Determinant = ' + a1 + '·' + b2 + ' &minus; ' + a2 + '·' + b1 + '.',
      steps: ['The determinant is ' + (a1 * b2 - a2 * b1) + ' (nonzero &rarr; unique solution).',
        'Cramer: ' + ask + ' = ' + (ask === 'x' ? '(' + c1 + '·' + b2 + ' &minus; ' + c2 + '·' + b1 + ')/' + (a1 * b2 - a2 * b1) : '(' + a1 + '·' + c2 + ' &minus; ' + a2 + '·' + c1 + ')/' + (a1 * b2 - a2 * b1)),
        'Solution: x = ' + x + ', y = ' + y] };
  });

  /* ---- Exponent laws ---- */
  def('alg.exponentlaws', function (r, lvl) {
    var mode = r.pick(['mul', 'div', 'pow', 'value']);
    var base = r.int(2, 5), m = r.int(2, 6), n = r.int(2, 6);
    if (mode === 'mul') return { prompt: 'Simplify ' + base + '^' + m + ' × ' + base + '^' + n + '. Give the exponent (the power of ' + base + ').',
      answer: { type: 'number', value: m + n }, hint: 'a^m · a^n = a^{m+n}.', steps: ['Exponents add: ' + m + ' + ' + n + ' = ' + (m + n)] };
    if (mode === 'div') { if (m <= n) m = n + r.int(1, 4); return { prompt: 'Simplify ' + base + '^' + m + ' ÷ ' + base + '^' + n + '. Give the exponent.',
      answer: { type: 'number', value: m - n }, hint: 'a^m / a^n = a^{m&minus;n}.', steps: ['Exponents subtract: ' + m + ' &minus; ' + n + ' = ' + (m - n)] }; }
    if (mode === 'pow') return { prompt: 'Simplify (' + base + '^' + m + ')^' + n + '. Give the exponent.',
      answer: { type: 'number', value: m * n }, hint: '(a^m)^n = a^{mn}.', steps: ['Multiply: ' + m + ' × ' + n + ' = ' + (m * n)] };
    return { prompt: 'Evaluate ' + base + '^' + m + ' × ' + base + '^' + n + ' as a number.',
      answer: { type: 'number', value: Math.pow(base, m + n) }, hint: 'Add the exponents, then evaluate.',
      steps: [base + '^' + (m + n), '= ' + Math.pow(base, m + n)] };
  });

  /* ---- Polynomial multiplication ---- */
  def('alg.polymul', function (r, lvl) {
    var a = r.nonzero(-9, 9), b = r.nonzero(-9, 9);
    var mode = r.pick(['xcoef', 'const', 'expand']);
    if (mode === 'xcoef') return { prompt: 'Expand (x ' + (a >= 0 ? '+ ' + a : '&minus; ' + Math.abs(a)) + ')(x ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + '). What is the coefficient of x?',
      answer: { type: 'number', value: a + b }, hint: 'FOIL: the x-terms come from the outer and inner products.',
      steps: ['= x&sup2; + (' + a + ' + ' + b + ')x + ' + (a * b), 'coefficient of x is ' + (a + b)] };
    if (mode === 'const') return { prompt: 'Expand (x ' + (a >= 0 ? '+ ' + a : '&minus; ' + Math.abs(a)) + ')(x ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + '). What is the constant term?',
      answer: { type: 'number', value: a * b }, hint: 'The constant is the product of the last terms (the "L" in FOIL).',
      steps: ['= x&sup2; + ' + (a + b) + 'x + ' + (a * b)] };
    var m = r.int(2, 4), k = r.int(2, 5), c = r.nonzero(-6, 6);
    return { prompt: 'Expand (' + m + 'x + ' + k + ')(x + ' + c + '). What is the coefficient of x&sup2;?',
      answer: { type: 'number', value: m }, hint: 'Only the x·x products contribute to x&sup2;.', steps: ['x&sup2; terms: ' + m + 'x·x = ' + m + 'x&sup2;'] };
  });

  /* ---- Factoring quadratics ---- */
  def('alg.factor', function (r, lvl) {
    var p = r.nonzero(-9, 9), q = r.nonzero(-9, 9);
    var b = p + q, c = p * q;
    var mode = r.pick(['smaller', 'larger', 'sum']);
    if (mode === 'sum') return { prompt: 'For x&sup2; ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + 'x ' + (c >= 0 ? '+ ' + c : '&minus; ' + Math.abs(c)) + ' = 0, the roots are p and q. What is p + q?',
      answer: { type: 'number', value: -(b) }, hint: 'For x&sup2; + bx + c, the roots sum to &minus;b.', steps: ['p + q = ' + (-b)] };
    var lo = Math.min(p, q), hi = Math.max(p, q);
    return { prompt: 'Factor and solve: x&sup2; ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + 'x ' + (c >= 0 ? '+ ' + c : '&minus; ' + Math.abs(c)) + ' = 0. What is the ' + (mode === 'smaller' ? 'smaller' : 'larger') + ' root?',
      answer: { type: 'number', value: mode === 'smaller' ? lo : hi },
      hint: 'Find two numbers multiplying to ' + c + ' and adding to ' + b + '.',
      steps: ['p·q = ' + c + ' and p + q = ' + b, 'So p = ' + p + ', q = ' + q, '(x ' + (p >= 0 ? '&minus; ' + p : '+ ' + Math.abs(p)) + ')(x ' + (q >= 0 ? '&minus; ' + q : '+ ' + Math.abs(q)) + ') = 0',
        'Roots: ' + lo + ' and ' + hi] };
  });

  /* ---- Quadratic formula ---- */
  def('alg.quadratic', function (r, lvl) {
    var p = r.int(-9, 9), q = r.int(-9, 9), a = r.int(1, 3);
    while (p === 0) p = r.int(-9, 9);
    var b = -a * (p + q), c = a * p * q;
    var D = b * b - 4 * a * c;
    var mode = r.pick(lvl < 5 ? ['larger'] : ['larger', 'smaller', 'disc']);
    if (mode === 'disc') return { prompt: 'For ' + a + 'x&sup2; ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + 'x ' + (c >= 0 ? '+ ' + c : '&minus; ' + Math.abs(c)) + ' = 0, what is the discriminant b&sup2; &minus; 4ac?',
      answer: { type: 'number', value: D }, hint: 'b&sup2; &minus; 4ac decides 0/1/2 real roots.', steps: ['b&sup2; &minus; 4ac = ' + D + (D > 0 ? ' &rarr; two real roots' : D === 0 ? ' &rarr; one repeated root' : ' &rarr; no real roots')] };
    var lo = Math.min(p, q), hi = Math.max(p, q);
    return { prompt: 'Use the quadratic formula on ' + a + 'x&sup2; ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + 'x ' + (c >= 0 ? '+ ' + c : '&minus; ' + Math.abs(c)) + ' = 0. What is the ' + (mode === 'smaller' ? 'smaller' : 'larger') + ' root?',
      answer: { type: 'number', value: mode === 'smaller' ? lo : hi },
      hint: 'x = (&minus;b &plusmn; &radic;(b&sup2;&minus;4ac)) / 2a.',
      steps: ['Discriminant = ' + D, '&radic;D = ' + Math.sqrt(D), 'x = (' + (-b) + ' &plusmn; ' + Math.sqrt(D) + ')/' + (2 * a), 'Roots: ' + lo + ' and ' + hi] };
  });

  /* ---- Logarithms ---- */
  def('alg.logs', function (r, lvl) {
    var mode = r.pick(lvl < 4 ? ['eval', 'eval', 'laws'] : ['eval', 'laws', 'solve', 'change']);
    var b = r.pick([2, 3, 4, 5, 10]);
    if (mode === 'eval') { var n = r.int(1, 5); return { prompt: 'Evaluate log_' + b + '(' + Math.pow(b, n) + ').',
      answer: { type: 'number', value: n }, hint: 'Ask: "' + b + ' to what power gives ' + Math.pow(b, n) + '?"', steps: [b + '^' + n + ' = ' + Math.pow(b, n) + ' so the log is ' + n] }; }
    if (mode === 'solve') { var n2 = r.int(1, 4); var v = Math.pow(b, n2); return { prompt: 'Solve log_' + b + '(x) = ' + n2 + ' for x.',
      answer: { type: 'number', value: v }, hint: 'Rewrite in exponential form: x = ' + b + '^' + n2 + '.', steps: ['x = ' + b + '^' + n2 + ' = ' + v] }; }
    if (mode === 'change') { return { prompt: 'Evaluate log_' + b + '(1). (Any base.)', answer: { type: 'number', value: 0 },
      hint: 'Anything to the 0 power is 1.', steps: [b + '^0 = 1, so the log is 0'] }; }
    // laws: log a + log b
    var n4 = r.int(1, 4), n5 = r.int(1, 4);
    return { prompt: 'Given log_' + b + '(A) = ' + n4 + ' and log_' + b + '(B) = ' + n5 + ', what is log_' + b + '(A·B)?',
      answer: { type: 'number', value: n4 + n5 }, hint: 'log(AB) = log A + log B.', steps: ['= ' + n4 + ' + ' + n5 + ' = ' + (n4 + n5)] };
  });

  /* ---- Radicals ---- */
  def('alg.radicals', function (r, lvl) {
    var mode = r.pick(['simplify', 'mult', 'ratio']);
    var k = r.int(2, 6), m = r.pick([2, 3, 5, 6, 7, 10, 11]);
    if (mode === 'simplify') { var n = k * k * m; return { prompt: 'Simplify &radic;' + n + ' into the form k&radic;m. What is k (the outside factor)?',
      answer: { type: 'number', value: k }, hint: 'Pull out the largest perfect square factor.', steps: [n + ' = ' + (k * k) + ' × ' + m, '&radic;' + (k * k) + ' = ' + k, '&radic;' + n + ' = ' + k + '&radic;' + m] }; }
    if (mode === 'mult') { var a1 = r.int(2, 6), b1 = r.int(2, 6); return { prompt: 'Compute &radic;' + a1 + ' × &radic;' + b1 + ' as a decimal (2 dp).',
      answer: { type: 'number', value: Math.sqrt(a1 * b1), tol: 0.01 }, hint: '&radic;a·&radic;b = &radic;(ab).', steps: ['&radic;(' + a1 + '×' + b1 + ') = &radic;' + (a1 * b1) + ' &asymp; ' + fr(Math.sqrt(a1 * b1), 2)] }; }
    var c = r.int(3, 8), d = r.int(1, c - 1);
    return { prompt: 'Rationalise &radic;' + c + ' / &radic;' + d + '. Compute the value (3 dp).',
      answer: { type: 'number', value: Math.sqrt(c / d), tol: 0.002 }, hint: 'Multiply numerator and denominator by &radic;' + d + '.', steps: ['= &radic;(' + c + '/' + d + ') &asymp; ' + fr(Math.sqrt(c / d), 3)] };
  });
})(window.MH);
