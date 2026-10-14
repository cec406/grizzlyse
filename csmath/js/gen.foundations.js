/* ============================================================
   CSMath Hero - gen.foundations.js
   Realm: Foundations of Number
   ============================================================ */
(function (MH) {
  'use strict';
  var def = MH.def;

  /* ---- Integer arithmetic ---- */
  def('fnd.integers', function (r, lvl) {
    var hi = 6 + lvl * 3;
    var op = r.pick(['+', '-', '×', '÷']);
    var a, b, ans, sA, sB;
    if (lvl < 3) op = r.pick(['+', '-']);
    if (lvl >= 3 && op === '÷') {
      b = r.nonzero(2, 4 + lvl);
      ans = r.int(-(4 + lvl), 4 + lvl);
      a = b * ans;
    } else {
      a = r.int(-hi, hi); b = r.int(-hi, hi);
      if ((op === '+' || op === '-') && Math.abs(a) < 2) a += r.sign() * 3;
      if (op === '×') { a = r.int(-(2 + lvl), 2 + lvl); b = r.int(-(2 + lvl), 2 + lvl); }
    }
    var neg = function (n) { return n < 0 ? '&minus;' + Math.abs(n) : '' + n; };
    ans = op === '+' ? a + b : op === '-' ? a - b : op === '×' ? a * b : a / b;
    sA = neg(a); sB = neg(b);
    var text = op === '-' ? a + ' &minus; ' + sB : sA + ' ' + op + ' ' + sB;
    if (op === '-' && b < 0) text = a + ' &minus; (' + sB + ')';
    return {
      prompt: text + ' = ?',
      answer: { type: 'number', value: ans },
      hint: 'Same signs &rarr; positive. Different signs &rarr; negative. For subtraction, think "add the opposite".',
      steps: ['Rewrite the signed values.', 'Apply the rule for the operation.', 'Result: ' + ans]
    };
  });

  /* ---- Order of operations ---- */
  def('fnd.order', function (r, lvl) {
    var tpls = [
      function (a, b, c) { return { t: a + ' + ' + b + ' \\times ' + c, v: a + b * c }; },
      function (a, b, c) { return { t: '(' + a + ' + ' + b + ') \\times ' + c, v: (a + b) * c }; },
      function (a, b, c) { return { t: a + ' \\times ' + b + ' &minus; ' + c, v: a * b - c }; },
      function (a, b, c) { return { t: a + ' ' + '&minus; ' + b + ' \\times ' + c, v: a - b * c }; }
    ];
    if (lvl >= 3) tpls.push(function (a, b, c) { return { t: a + '^2 + ' + b + ' \\times ' + c, v: a * a + b * c }; });
    if (lvl >= 5) tpls.push(function (a, b, c) { return { t: b + ' \\times (' + c + ' + ' + a + ')^2', v: b * Math.pow(c + a, 2) }; });
    if (lvl >= 5) tpls.push(function (a, b, c) { return { t: a + ' + ' + b + ' \\times ' + c + ' &minus; ' + b, v: a + b * c - b }; });
    var hi = 4 + lvl;
    var p = r.pick(tpls)(r.int(2, hi), r.int(2, hi), r.int(2, hi));
    return {
      prompt: 'Evaluate: ' + MH.m(p.t),
      answer: { type: 'number', value: p.v },
      hint: 'PEMDAS &mdash; do parentheses and exponents, then &times;/&divide; left to right, then +/&minus;.',
      steps: ['Identify the operations and their precedence.', 'Evaluate the highest precedence first.', 'Result: ' + p.v]
    };
  });

  /* ---- Factors / GCD / LCM ---- */
  def('fnd.factors', function (r, lvl) {
    var mode = r.pick(lvl < 3 ? ['gcd', 'gcd', 'lcm'] : ['gcd', 'lcm', 'primes', 'largest']);
    var a = r.int(6, 12 + lvl * 8), b = r.int(6, 12 + lvl * 8);
    if (mode === 'gcd') {
      var g = MH.gcd(a, b);
      return { prompt: 'Find gcd(' + a + ', ' + b + ').', answer: { type: 'number', value: g },
        hint: 'Factor both numbers and multiply the shared primes, or use gcd(a,b) = gcd(b, a mod b).',
        steps: [a + ' = ' + MH.factorize(a).join(' × '), b + ' = ' + MH.factorize(b).join(' × '), 'gcd = ' + g] };
    }
    if (mode === 'lcm') {
      var L = MH.lcm(a, b);
      return { prompt: 'Find lcm(' + a + ', ' + b + ').', answer: { type: 'number', value: L },
        hint: 'lcm(a,b) = a·b / gcd(a,b).', steps: ['gcd = ' + MH.gcd(a, b), a + ' × ' + b + ' / gcd = ' + L] };
    }
    if (mode === 'primes') {
      var n = r.int(30, 60 + lvl * 12);
      var f = MH.factorize(n);
      return { prompt: 'How many prime factors does ' + n + ' have, counting multiplicity?', answer: { type: 'number', value: f.length },
        hint: 'Divide out the smallest primes repeatedly.', steps: [n + ' = ' + f.join(' × '), 'There are ' + f.length + ' prime factors.'] };
    }
    var big = r.int(40, 120);
    return { prompt: 'What is the largest prime factor of ' + big + '?', answer: { type: 'number', value: MH.factorize(big).pop() },
      hint: 'Trial-divide by primes until the quotient is prime.', steps: [big + ' = ' + MH.factorize(big).join(' × ')] };
  });

  /* ---- Fractions ---- */
  def('fnd.fractions', function (r, lvl) {
    var op = r.pick(lvl < 3 ? ['+', '-'] : ['+', '-', '×', '÷']);
    var b = r.int(2, 4 + lvl), d = r.int(2, 4 + lvl);
    var a = r.int(1, b * 2), c = r.int(1, d * 2);
    var n, den;
    if (op === '+') { n = a * d + c * b; den = b * d; }
    else if (op === '-') { n = a * d - c * b; den = b * d; }
    else if (op === '×') { n = a * c; den = b * d; }
    else { n = a * d; den = b * c; }
    if (n === 0) { a = a + 1; n = op === '-' ? a * d - c * b : n; }
    var f = MH.frac(n, den);
    var display = f.d === 1 ? String(f.n) : MH.m('\\frac{' + Math.abs(f.n) + '}{' + f.d + '}');
    if (f.n < 0) display = '&minus;' + display;
    return {
      prompt: 'Compute and simplify: ' + MH.m('\\frac{' + a + '}{' + b + '} ' + op + ' \\frac{' + c + '}{' + d + '}'),
      answer: { type: 'number', value: f.n / f.d, tol: 1e-9, display: display },
      hint: 'For +/&minus; use a common denominator. For &divide; multiply by the reciprocal.',
      steps: [op === '+' || op === '-' ? 'Common denominator: ' + b * d : 'Multiply numerators/denominators.',
        'Unsimplified: ' + n + '/' + den, 'Simplified: ' + f.n + '/' + f.d]
    };
  });

  /* ---- Decimals & percents ---- */
  def('fnd.decimals', function (r, lvl) {
    var mode = r.pick(['frac2dec', 'frac2pct', 'dec2pct', 'pct2dec']);
    if (mode === 'frac2dec') {
      var b = r.pick([2, 4, 5, 8, 10, 20, 25, 40, 50]); var a = r.int(1, b - 1);
      var f = MH.frac(a, b);
      return { prompt: 'Write ' + MH.m('\\frac{' + a + '}{' + b + '}') + ' as a decimal.',
        answer: { type: 'number', value: a / b, tol: 1e-9 },
        hint: 'Divide the numerator by the denominator.', steps: [a + ' ÷ ' + b + ' = ' + MH.nice(a / b, 4)] };
    }
    if (mode === 'dec2pct') {
      var x = r.int(1, 99) / 100;
      return { prompt: 'Write ' + x + ' as a percent.', answer: { type: 'number', value: x * 100 },
        hint: 'Multiply by 100 and add %.', steps: [x + ' × 100 = ' + MH.nice(x * 100, 2) + '%'] };
    }
    if (mode === 'pct2dec') {
      var p = r.int(1, 99);
      return { prompt: 'Write ' + p + '% as a decimal.', answer: { type: 'number', value: p / 100 },
        hint: 'Divide by 100.', steps: [p + '% = ' + p + '/100 = ' + MH.nice(p / 100, 4)] };
    }
    var b2 = r.pick([2, 4, 5, 10, 20, 25]); var a2 = r.int(1, b2 - 1);
    return { prompt: 'Write ' + MH.m('\\frac{' + a2 + '}{' + b2 + '}') + ' as a percent.',
      answer: { type: 'number', value: (a2 / b2) * 100 },
      hint: 'Decimal first, then &times;100.', steps: [a2 + '/' + b2 + ' = ' + MH.nice(a2 / b2, 4), '&times;100 = ' + MH.nice((a2 / b2) * 100, 2) + '%'] };
  });

  /* ---- Percent change ---- */
  def('fnd.percent', function (r, lvl) {
    var mode = r.pick(['of', 'change', 'markup', 'discount']);
    if (mode === 'of') {
      var p = r.pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75]); var n = r.int(4, 20 + lvl * 10) * 5;
      return { prompt: 'What is ' + p + '% of ' + n + '?', answer: { type: 'number', value: n * p / 100 },
        hint: 'Convert the percent to a decimal and multiply.', steps: [p + '% = ' + p / 100, p / 100 + ' × ' + n + ' = ' + n * p / 100] };
    }
    if (mode === 'change') {
      var old = r.int(4, 40) * 5, delta = r.int(1, 8) * 5 * r.sign();
      var nw = old + delta;
      if (nw <= 0) nw = old + Math.abs(delta);
      return { prompt: 'A value changes from ' + old + ' to ' + nw + '. What is the percent change? (include the sign)',
        answer: { type: 'number', value: ((nw - old) / old) * 100, tol: 1e-6 },
        hint: '(new &minus; old)/old × 100%.', steps: ['(' + nw + ' &minus; ' + old + ')/' + old + ' = ' + MH.nice((nw - old) / old, 4), '&times;100 = ' + MH.nice(((nw - old) / old) * 100, 2) + '%'] };
    }
    if (mode === 'markup') {
      var price = r.int(20, 200), pct = r.pick([10, 15, 20, 25, 30, 40, 50]);
      return { prompt: 'A $' + price + ' item is marked up by ' + pct + '%. What is the new price (in dollars)?',
        answer: { type: 'number', value: price * (1 + pct / 100), tol: 1e-6 },
        hint: 'Multiply by (1 + rate).', steps: ['Multiplier = 1 + ' + pct / 100 + ' = ' + (1 + pct / 100), price + ' × ' + (1 + pct / 100) + ' = ' + MH.nice(price * (1 + pct / 100), 2)] };
    }
    var pr2 = r.int(20, 200), pc = r.pick([10, 20, 25, 30, 40, 50]);
    return { prompt: 'A $' + pr2 + ' item is discounted ' + pc + '%. What is the sale price (in dollars)?',
      answer: { type: 'number', value: pr2 * (1 - pc / 100), tol: 1e-6 },
      hint: 'Multiply by (1 &minus; rate).', steps: ['Multiplier = 1 &minus; ' + pc / 100 + ' = ' + (1 - pc / 100), MH.nice(pr2 * (1 - pc / 100), 2)] };
  });

  /* ---- Exponents and roots ---- */
  def('fnd.exponents', function (r, lvl) {
    var mode = r.pick(lvl < 3 ? ['pow', 'sq'] : ['pow', 'sq', 'negexp', 'sqrt', 'cuberoot']);
    if (mode === 'pow') { var a = r.int(2, 3 + lvl), n = r.int(2, 3 + Math.floor(lvl / 2)); return { prompt: 'Compute ' + a + '^' + n + '.', answer: { type: 'number', value: Math.pow(a, n) }, hint: 'Multiply ' + a + ' by itself ' + n + ' times.', steps: [MH.m(a + '^' + n + ' = ' + Math.pow(a, n))] }; }
    if (mode === 'sq') { var b = r.int(4, 12 + lvl); return { prompt: 'Compute ' + b + '&sup2;.', answer: { type: 'number', value: b * b }, hint: 'Square = multiply by itself.', steps: [b + ' × ' + b + ' = ' + b * b] }; }
    if (mode === 'negexp') { var c = r.int(2, 4), n2 = r.int(1, 3); return { prompt: 'Compute ' + c + '^&minus;' + n2 + ' as a decimal.', answer: { type: 'number', value: Math.pow(c, -n2), tol: 1e-9 }, hint: 'a^{&minus;n} = 1/a^n.', steps: ['1/' + c + '^' + n2 + ' = 1/' + Math.pow(c, n2) + ' = ' + MH.nice(Math.pow(c, -n2), 5)] }; }
    if (mode === 'sqrt') { var k = r.int(2, 4 + lvl), s = k * k; return { prompt: 'Compute &radic;' + s + '.', answer: { type: 'number', value: k }, hint: 'What positive number squares to ' + s + '?', steps: [k + '² = ' + s] }; }
    var k2 = r.int(2, 5), cu = k2 * k2 * k2;
    return { prompt: 'Compute the cube root of ' + cu + '.', answer: { type: 'number', value: k2 }, hint: 'Find x with x³ = ' + cu + '.', steps: [k2 + '³ = ' + cu] };
  });

  /* ---- Scientific notation ---- */
  def('fnd.scinot', function (r, lvl) {
    var mode = r.pick(['to', 'from', 'mul', 'div']);
    function mant(a) { return MH.nice(a, 4); }
    if (mode === 'to') {
      var n = r.int(2, 9), e = r.int(3, 6 + lvl), v = n * Math.pow(10, e);
      return { prompt: 'Write ' + v.toLocaleString('en-US') + ' in scientific notation. Give the exponent of 10.', answer: { type: 'number', value: e, display: n + ' × 10' + MH.m('^' + e) },
        hint: 'Move the decimal so one non-zero digit remains; the exponent counts the moves.', steps: [v.toLocaleString('en-US') + ' = ' + n + ' × 10^' + e] };
    }
    if (mode === 'from') {
      var m = r.int(2, 9), e2 = r.int(2, 5 + lvl);
      return { prompt: 'Write ' + m + ' × 10^' + e2 + ' as an ordinary number.', answer: { type: 'number', value: m * Math.pow(10, e2) },
        hint: 'Append ' + e2 + ' zeros.', steps: ['= ' + (m * Math.pow(10, e2)).toLocaleString('en-US')] };
    }
    var a1 = r.int(2, 9), a2 = r.int(2, 9), e3 = r.int(1, 5);
    if (mode === 'mul') return { prompt: 'Compute (' + a1 + ' × 10^3)(' + a2 + ' × 10^' + e3 + ') &mdash; what is the exponent of 10 in the result?',
      answer: { type: 'number', value: 3 + e3, display: MH.nice(a1 * a2, 3) + ' × 10^' + (3 + e3) }, hint: 'Multiply mantissas, add exponents.', steps: ['Exponents add: 3 + ' + e3 + ' = ' + (3 + e3)] };
    return { prompt: 'Compute (' + (a1 * a2) + ' × 10^' + (3 + e3) + ') ÷ (' + a1 + ' × 10^3) &mdash; give the exponent of 10.',
      answer: { type: 'number', value: e3, display: a2 + ' × 10^' + e3 }, hint: 'Divide mantissas, subtract exponents.', steps: ['Exponents subtract: ' + (3 + e3) + ' &minus; 3 = ' + e3] };
  });
})(window.MH);
