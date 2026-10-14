/* ============================================================
   CSMath Hero - gen.prealgebra.js
   Realm: Pre-Algebra
   ============================================================ */
(function (MH) {
  'use strict';
  var def = MH.def;
  function neg(n) { return n < 0 ? '&minus;' + Math.abs(n) : '' + n; }

  /* ---- Evaluate expressions ---- */
  def('pre.evaluate', function (r, lvl) {
    var mode = r.pick(lvl < 3 ? ['linear', 'linear', 'quad'] : ['linear', 'quad', 'multi']);
    if (mode === 'quad') {
      var a = r.int(1, 3), b = r.int(-6, 6), c = r.int(-9, 9), x = r.int(-5, 5);
      var v = a * x * x + b * x + c;
      var expr = a + 'x&sup2; ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + 'x ' + (c >= 0 ? '+ ' + c : '&minus; ' + Math.abs(c));
      return { prompt: 'If x = ' + neg(x) + ', evaluate ' + expr + '.', answer: { type: 'number', value: v },
        hint: 'Substitute, then square before multiplying. (' + neg(x) + ')&sup2; is positive.',
        steps: [a + '(' + neg(x) + ')&sup2; ' + (b >= 0 ? '+' : '&minus;') + ' ' + Math.abs(b) + '(' + neg(x) + ') ' + (c >= 0 ? '+' : '&minus;') + ' ' + Math.abs(c), '= ' + v] };
    }
    if (mode === 'multi') {
      var a2 = r.int(2, 6), b2 = r.int(-6, 6), c2 = r.int(-9, 9), d2 = r.int(2, 5), x2 = r.int(-4, 4), y2 = r.int(-4, 4);
      var v2 = a2 * x2 - b2 * y2 + c2;
      return { prompt: 'If x = ' + neg(x2) + ' and y = ' + neg(y2) + ', evaluate ' + a2 + 'x &minus; (' + b2 + ')y + ' + c2 + '.',
        answer: { type: 'number', value: v2 }, hint: 'Substitute each value, then apply order of operations.',
        steps: [a2 + '(' + neg(x2) + ') &minus; (' + b2 + ')(' + neg(y2) + ') + ' + c2, '= ' + v2] };
    }
    var m = r.int(2, 9), k = r.int(-9, 9), x3 = r.int(-8, 8);
    return { prompt: 'If x = ' + neg(x3) + ', evaluate ' + m + 'x ' + (k >= 0 ? '+ ' + k : '&minus; ' + Math.abs(k)) + '.',
      answer: { type: 'number', value: m * x3 + k }, hint: 'Multiply first, then add.',
      steps: [m + ' × ' + neg(x3) + ' ' + (k >= 0 ? '+' : '&minus;') + ' ' + Math.abs(k) + ' = ' + (m * x3) + ' ' + (k >= 0 ? '+' : '&minus;') + ' ' + Math.abs(k), '= ' + (m * x3 + k)] };
  });

  /* ---- Combine like terms ---- */
  def('pre.liketerms', function (r, lvl) {
    var a = r.nonzero(-9, 9), b = r.nonzero(-9, 9), c = r.int(-9, 9), d = r.int(-9, 9);
    var m = lvl >= 5 ? r.nonzero(-5, 5) : 0;
    var xcoeff = a + b + 2 * m, konst = c + d;
    var expr = a + 'x ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + 'x ' + (c >= 0 ? '+ ' + c : '&minus; ' + Math.abs(c)) +
      (d >= 0 ? ' + ' + d : ' &minus; ' + Math.abs(d)) + (m ? (2 * m >= 0 ? ' + ' + (2 * m) + 'x' : ' &minus; ' + Math.abs(2 * m) + 'x') : '');
    return { prompt: 'Simplify by combining like terms: ' + expr + '. <br>What is the coefficient of x?',
      answer: { type: 'number', value: xcoeff }, hint: 'Add the x-coefficients together; add the constants together.',
      steps: ['x-coefficients: ' + a + ' + ' + b + (m ? ' + ' + 2 * m : '') + ' = ' + xcoeff,
        'constants: ' + c + ' + ' + d + ' = ' + konst, 'Result: ' + xcoeff + 'x ' + (konst >= 0 ? '+ ' + konst : '&minus; ' + Math.abs(konst))] };
  });

  /* ---- One-step equations ---- */
  def('pre.onestep', function (r, lvl) {
    var mode = r.pick(['add', 'sub', 'mul', 'div']);
    var x = r.nonzero(-9, 9), a, text, steps;
    if (mode === 'add') { a = r.nonzero(-12, 12); text = 'x ' + (a >= 0 ? '+ ' + a : '&minus; ' + Math.abs(a)) + ' = ' + (x + a); steps = ['Subtract ' + a + ' from both sides.', 'x = ' + (x + a) + (a >= 0 ? ' &minus; ' + a : ' + ' + Math.abs(a)) + ' = ' + x]; }
    else if (mode === 'sub') { a = r.nonzero(-12, 12); text = 'x &minus; ' + (a >= 0 ? a : '(' + a + ')') + ' = ' + (x - a); steps = ['Add ' + a + ' to both sides.', 'x = ' + x]; }
    else if (mode === 'mul') { a = r.nonzero(-9, 9); text = a + 'x = ' + (a * x); steps = ['Divide both sides by ' + a + '.', 'x = ' + (a * x) + '/' + a + ' = ' + x]; }
    else { a = r.int(2, 9); x = x * a; text = 'x/' + a + ' = ' + (x / a); steps = ['Multiply both sides by ' + a + '.', 'x = ' + (x / a) + ' × ' + a + ' = ' + x]; }
    return { prompt: 'Solve for x: ' + text, answer: { type: 'number', value: x },
      hint: 'Undo the operation using its inverse, applied to both sides.',
      steps: steps.concat(['x = ' + x]) };
  });

  /* ---- Two-step equations ---- */
  def('pre.twostep', function (r, lvl) {
    var a = r.nonzero(-9, 9), b = r.nonzero(-20, 20), x = r.nonzero(-10, 10);
    var c = a * x + b;
    return { prompt: 'Solve for x: ' + a + 'x ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + ' = ' + c,
      answer: { type: 'number', value: x },
      hint: 'Undo addition/subtraction first, then divide by the coefficient.',
      steps: ['Subtract ' + b + ': ' + a + 'x = ' + (c - b), 'Divide by ' + a + ': x = ' + x] };
  });

  /* ---- Distribute and solve ---- */
  def('pre.distribute', function (r, lvl) {
    if (r.chance(0.5)) {
      var a = r.int(2, 7), b = r.nonzero(-9, 9), x = r.nonzero(-8, 8), c = a * (x + b);
      return { prompt: 'Solve for x: ' + a + '(x ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + ') = ' + c,
        answer: { type: 'number', value: x },
        hint: 'Distribute, then isolate x (or divide both sides by ' + a + ' first).',
        steps: [a + 'x ' + (a * b >= 0 ? '+ ' + a * b : '&minus; ' + Math.abs(a * b)) + ' = ' + c, a + 'x = ' + (c - a * b), 'x = ' + x] };
    }
    var a2 = r.int(2, 6), x2 = r.nonzero(-8, 8), lhs = r.int(2, 5), b2 = r.int(-9, 9);
    var c2 = a2 * x2 + b2, d2 = lhs * x2;
    return { prompt: 'Solve for x: ' + a2 + 'x ' + (b2 >= 0 ? '+ ' + b2 : '&minus; ' + Math.abs(b2)) + ' = ' + lhs + 'x ' + (d2 >= 0 ? '+ ' + d2 : '&minus; ' + Math.abs(d2)),
      answer: { type: 'number', value: x2 },
      hint: 'Collect x-terms on one side and constants on the other.',
      steps: ['Move x-terms: ' + (a2 - lhs) + 'x ' + (b2 >= 0 ? '+ ' + b2 : '&minus; ' + Math.abs(b2)) + ' = ' + d2, 'x = ' + x2] };
  });

  /* ---- Inequalities (multiple choice) ---- */
  def('pre.inequality', function (r, lvl) {
    var flip = r.chance(0.5);
    var a = flip ? -r.int(2, 6) : r.int(2, 6);
    var x = r.int(-6, 6), b = r.int(-9, 9);
    var c = a * x + b;
    var op = r.pick(['&lt;', '&gt;']);
    var sign = a > 0 ? op : (op === '&lt;' ? '&gt;' : '&lt;');
    var sol = 'x ' + sign + ' ' + x;
    var wrongOp = 'x ' + (sign === '&lt;' ? '&gt;' : '&lt;') + ' ' + x;
    var wrongVal = 'x ' + sign + ' ' + (x + 1);
    var choices = [sol, wrongOp, wrongVal, 'no solution'];
    var text = a + 'x ' + (b >= 0 ? '+ ' + b : '&minus; ' + Math.abs(b)) + ' ' + op + ' ' + c;
    return { prompt: 'Solve the inequality: ' + text,
      answer: { type: 'choice', value: 0, choices: choices, display: sol },
      hint: 'Divide by ' + a + '. Because the divisor is ' + (a < 0 ? 'negative, FLIP the inequality sign.' : 'positive, the sign stays.'),
      steps: ['Move the constant: ' + a + 'x ' + op + ' ' + (c - b), 'Divide by ' + a + (a < 0 ? ' and flip: ' : ': ') + sol] };
  });

  /* ---- Ratios & proportions ---- */
  def('pre.ratio', function (r, lvl) {
    var a = r.int(2, 9), b = r.int(2, 9), k = r.int(2, 7);
    // a/b = x/(b*k)  -> x = a*k
    var x = a * k;
    if (r.chance(0.5)) return { prompt: 'Solve the proportion: ' + a + '/' + b + ' = x/' + (b * k), answer: { type: 'number', value: x },
      hint: 'Cross-multiply: a × ' + (b * k) + ' = b × x.', steps: [a + ' × ' + (b * k) + ' = ' + (a * b * k), 'x = ' + (a * b * k) + '/' + b + ' = ' + x] };
    return { prompt: 'A recipe uses ' + a + ' cups of flour for every ' + b + ' cups of sugar. With ' + (a * k) + ' cups of flour, how many cups of sugar are needed?',
      answer: { type: 'number', value: b * k }, hint: 'Set up a proportion and cross-multiply.', steps: [a + '/' + b + ' = ' + (a * k) + '/x', 'x = ' + b * k] };
  });

  /* ---- Slope between points ---- */
  def('pre.slope', function (r, lvl) {
    var x1 = r.int(-7, 7), x2 = r.nonzero(-7, 7), y1 = r.int(-9, 9), y2 = r.int(-9, 9);
    if (x1 === x2) x2 = x1 + r.nonzero(1, 5);
    var dy = y2 - y1, dx = x2 - x1;
    var f = MH.frac(dy, dx);
    var display = f.d === 1 ? neg(f.n) : (f.n < 0 ? '&minus;' : '') + MH.m('\\frac{' + Math.abs(f.n) + '}{' + f.d + '}');
    return { prompt: 'Find the slope of the line through (' + x1 + ', ' + neg(y1) + ') and (' + x2 + ', ' + neg(y2) + ').',
      answer: { type: 'number', value: dy / dx, tol: 1e-9, display: display },
      hint: 'm = (y&#8322; &minus; y&#8321;)/(x&#8322; &minus; x&#8321;).',
      steps: ['&Delta;y = ' + neg(y2) + ' &minus; (' + neg(y1) + ') = ' + dy, '&Delta;x = ' + x2 + ' &minus; ' + x1 + ' = ' + dx, 'm = ' + f.n + '/' + f.d] };
  });
})(window.MH);
