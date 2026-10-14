/* ============================================================
   CSMath Hero - gen.trig.js
   Realm: Trigonometry
   ============================================================ */
(function (MH) {
  'use strict';
  var def = MH.def;
  function fr(n, d) {
    var f = MH.frac(n, d);
    if (f.d === 1) return String(f.n);
    return (f.n < 0 ? '&minus;' : '') + MH.m('\\frac{' + Math.abs(f.n) + '}{' + f.d + '}');
  }
  var TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41], [20, 21, 29]];

  /* ---- Right triangle ratios ---- */
  def('trg.ratios', function (r, lvl) {
    var t = r.pick(TRIPLES), opp = t[0], adj = t[1], hyp = t[2];
    if (r.chance(0.5)) { var s = opp; opp = adj; adj = s; }
    var fn = r.pick(['sin', 'cos', 'tan']);
    var n, d, label;
    if (fn === 'sin') { n = opp; d = hyp; label = 'opposite/hypotenuse'; }
    else if (fn === 'cos') { n = adj; d = hyp; label = 'adjacent/hypotenuse'; }
    else { n = opp; d = adj; label = 'opposite/adjacent'; }
    var f = MH.frac(n, d);
    return { prompt: 'A right triangle has legs ' + t[0] + ' and ' + t[1] + ' and hypotenuse ' + t[2] + '. Angle &theta; is opposite the side of length ' + (opp === t[0] || opp === t[1] ? opp : t[0]) + '. Find ' + fn + '(&theta;) as a simplified fraction (or decimal).',
      answer: { type: 'number', value: n / d, tol: 1e-9, display: fr(n, d) },
      hint: 'SOH-CAH-TOA: ' + fn + ' = ' + label + '.',
      steps: [fn + '(&theta;) = ' + n + '/' + d, 'Simplified: ' + f.n + '/' + f.d] };
  });

  /* ---- Special angles (multiple choice) ---- */
  def('trg.special', function (r, lvl) {
    var ang = r.pick([0, 30, 45, 60, 90]);
    var fn = r.pick(['sin', 'cos', 'tan']);
    var table = {
      'sin0': '0', 'sin30': '1/2', 'sin45': '&radic;2/2', 'sin60': '&radic;3/2', 'sin90': '1',
      'cos0': '1', 'cos30': '&radic;3/2', 'cos45': '&radic;2/2', 'cos60': '1/2', 'cos90': '0',
      'tan0': '0', 'tan30': '&radic;3/3', 'tan45': '1', 'tan60': '&radic;3', 'tan90': 'undefined'
    };
    var correct = table[fn + ang];
    var all = ['0', '1/2', '&radic;2/2', '&radic;3/2', '1', '&radic;3', '&radic;3/3', 'undefined'];
    var choices = [correct];
    r.shuffle(all).forEach(function (c) { if (choices.length < 4 && choices.indexOf(c) === -1) choices.push(c); });
    choices = r.shuffle(choices);
    return { prompt: 'What is ' + fn + '(' + ang + '&deg;) exactly?',
      answer: { type: 'choice', value: choices.indexOf(correct), choices: choices, display: correct },
      hint: 'Use the unit circle / special-angle triangles (45-45-90 and 30-60-90).',
      steps: ['From the unit circle, ' + fn + '(' + ang + '&deg;) = ' + correct] };
  });

  /* ---- Pythagorean identity ---- */
  def('trg.pythident', function (r, lvl) {
    var t = r.pick(TRIPLES), sinT = t[0] / t[2], cosT = t[1] / t[2];
    if (r.chance(0.5)) {
      return { prompt: 'In a right triangle, sin(&theta;) = ' + fr(t[0], t[2]) + '. Find cos(&theta;) (take the positive root).',
        answer: { type: 'number', value: cosT, tol: 1e-9, display: fr(t[1], t[2]) },
        hint: 'sin&sup2;&theta; + cos&sup2;&theta; = 1 &rarr; cos&theta; = &radic;(1 &minus; sin&sup2;&theta;).',
        steps: ['cos&sup2;&theta; = 1 &minus; (' + t[0] + '/' + t[2] + ')&sup2; = ' + fr(Math.round((t[2] * t[2] - t[0] * t[0])), t[2] * t[2]), 'cos&theta; = ' + fr(t[1], t[2])] };
    }
    return { prompt: 'If cos(&theta;) = ' + fr(t[1], t[2]) + ', find sin(&theta;) (positive root).',
      answer: { type: 'number', value: sinT, tol: 1e-9, display: fr(t[0], t[2]) },
      hint: 'sin&sup2;&theta; + cos&sup2;&theta; = 1.',
      steps: ['sin&sup2;&theta; = 1 &minus; (' + t[1] + '/' + t[2] + ')&sup2;', 'sin&theta; = ' + fr(t[0], t[2])] };
  });

  /* ---- Law of cosines ---- */
  def('trg.lawcos', function (r, lvl) {
    var a = r.int(3, 15), b = r.int(3, 15), C = r.pick([60, 90, 120, 45]);
    var c2 = a * a + b * b - 2 * a * b * Math.cos(MH.deg2rad(C));
    return { prompt: 'A triangle has sides a = ' + a + ', b = ' + b + ' and included angle C = ' + C + '&deg;. Find side c (2 dp).',
      answer: { type: 'number', value: Math.sqrt(c2), tol: 0.02 },
      hint: 'Law of cosines: c&sup2; = a&sup2; + b&sup2; &minus; 2ab·cos(C).',
      steps: ['c&sup2; = ' + a + '&sup2; + ' + b + '&sup2; &minus; 2(' + a + ')(' + b + ')cos' + C + '&deg;',
        'c&sup2; = ' + (a * a + b * b) + ' &minus; ' + MH.nice(2 * a * b * Math.cos(MH.deg2rad(C)), 3) + ' = ' + MH.nice(c2, 3),
        'c = ' + MH.nice(Math.sqrt(c2), 2)] };
  });

  /* ---- Radians ---- */
  def('trg.radians', function (r, lvl) {
    if (r.chance(0.5)) {
      var deg = r.pick([30, 45, 60, 90, 120, 135, 150, 180, 270, 360]);
      var coef = MH.frac(deg, 180);
      var display = coef.d === 1 ? (coef.n === 1 ? '&pi;' : coef.n + '&pi;') : MH.m('\\frac{' + coef.n + '&pi;}{' + coef.d + '}');
      return { prompt: 'Convert ' + deg + '&deg; to radians in the form k&pi;. What is k?',
        answer: { type: 'number', value: deg / 180, tol: 1e-9, display: display },
        hint: 'Multiply by &pi;/180.', steps: [deg + ' × &pi;/180 = ' + coef.n + '&pi;/' + coef.d] };
    }
    var k = r.pick([0.5, 1, 1.5, 2, 3]);
    var degrees = k * 180;
    return { prompt: 'Convert ' + (k === 0.5 ? '&pi;/2' : k + '&pi;') + ' radians to degrees.',
      answer: { type: 'number', value: degrees }, hint: 'Multiply by 180/&pi;.', steps: [k + ' × 180 = ' + degrees + '&deg;'] };
  });

  /* ---- Unit circle signs ---- */
  def('trg.unitcircle', function (r, lvl) {
    var quad = r.int(1, 4);
    var fn = r.pick(['sin', 'cos', 'tan']);
    var pos = { 1: { sin: true, cos: true, tan: true }, 2: { sin: true, cos: false, tan: false }, 3: { sin: false, cos: false, tan: true }, 4: { sin: false, cos: true, tan: false } }[quad];
    var correct = pos[fn] ? 'positive' : 'negative';
    return { prompt: 'An angle &theta; lies in Quadrant ' + ['I', 'II', 'III', 'IV'][quad - 1] + '. Is ' + fn + '(&theta;) positive or negative?',
      answer: { type: 'choice', value: pos[fn] ? 0 : 1, choices: ['positive', 'negative'], display: correct },
      hint: 'ASTC: All positive in I, Sin in II, Tan in III, Cos in IV.',
      steps: ['In Quadrant ' + ['I', 'II', 'III', 'IV'][quad - 1] + ', ' + fn + ' is ' + correct + '.'] };
  });
})(window.MH);
