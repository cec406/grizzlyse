/* ============================================================
   CSMath Hero - gen.discrete.js
   Realm: Discrete Math
   ============================================================ */
(function (MH) {
  'use strict';
  var def = MH.def;
  function fact(n) { var v = 1; for (var i = 2; i <= n; i++) v *= i; return v; }
  function P(n, k) { return fact(n) / fact(n - k); }
  function C(n, k) { return fact(n) / (fact(k) * fact(n - k)); }
  MH._P = P; MH._C = C; MH._fact = fact;

  function drawSet(r, n, exclude) {
    var out = [];
    exclude = exclude || [];
    var guard = 0;
    while (out.length < n && guard++ < 200) {
      var v = r.int(1, 20);
      if (out.indexOf(v) === -1 && exclude.indexOf(v) === -1) out.push(v);
    }
    return out.sort(function (a, b) { return a - b; });
  }

  /* ---- Sets ---- */
  def('dsc.sets', function (r, lvl) {
    var A = drawSet(r, r.int(3, 5));
    var B;
    if (lvl >= 4) { var shared = A.slice(0, 2); B = shared.concat(drawSet(r, r.int(1, 3), shared)); }
    else B = drawSet(r, r.int(3, 5));
    var inter = A.filter(function (x) { return B.indexOf(x) !== -1; });
    var union = A.slice(); B.forEach(function (x) { if (union.indexOf(x) === -1) union.push(x); });
    var ask = r.pick(['union', 'inter']);
    return { prompt: 'A = {' + A.join(', ') + '}, B = {' + B.join(', ') + '}. What is |A ' + (ask === 'union' ? '&cup;' : '&cap;') + ' B|?',
      answer: { type: 'number', value: ask === 'union' ? union.length : inter.length },
      hint: 'Union combines all elements; intersection keeps only shared ones.',
      steps: [ask === 'union' ? 'A &cup; B = {' + union.join(', ') + '}' : 'A &cap; B = {' + inter.join(', ') + '}',
        'Size = ' + (ask === 'union' ? union.length : inter.length)] };
  });

  /* ---- Propositional logic (multiple choice) ---- */
  def('dsc.logic', function (r, lvl) {
    var mode = r.pick(['impl', 'equiv', 'demorgan']);
    if (mode === 'impl') {
      var pv = r.chance(0.5), qv = r.chance(0.5);
      var val = !(pv && !qv);
      return { prompt: 'If p is ' + pv + ' and q is ' + qv + ', what is the truth value of p &rarr; q?',
        answer: { type: 'choice', value: val ? 0 : 1, choices: ['True', 'False'], display: val ? 'True' : 'False' },
        hint: 'p&rarr;q is False only when p is True and q is False.',
        steps: ['p&rarr;q = &not;p &or; q = ' + val] };
    }
    if (mode === 'demorgan') {
      var correct = '&not;p &and; &not;q';
      var choices = ['&not;p &and; &not;q', '&not;p &or; &not;q', 'p &and; q', 'p &or; q'];
      return { prompt: 'Which expression is logically equivalent to &not;(p &or; q)?',
        answer: { type: 'choice', value: 0, choices: choices, display: correct },
        hint: 'De Morgan: push the negation in and swap &and;&harr;&or;.',
        steps: ['&not;(p &or; q) &equiv; &not;p &and; &not;q'] };
    }
    var correct2 = '&not;q &rarr; &not;p';
    var ch = ['&not;q &rarr; &not;p', '&not;p &rarr; &not;q', 'q &rarr; p', 'p &or; q'];
    return { prompt: 'What is the contrapositive of p &rarr; q?',
      answer: { type: 'choice', value: 0, choices: ch, display: correct2 },
      hint: 'The contrapositive flips and negates: it is logically equivalent to the original.',
      steps: ['p &rarr; q &equiv; &not;q &rarr; &not;p'] };
  });

  /* ---- Inclusion-exclusion ---- */
  def('dsc.inclusionexcl', function (r, lvl) {
    var a = r.int(10, 30), b = r.int(10, 30), c = r.int(10, 30);
    var ab = r.int(1, 8), bc = r.int(1, 8), ac = r.int(1, 8);
    var abc = r.int(0, Math.min(ab, bc, ac));
    var val = a + b + c - ab - bc - ac + abc;
    return { prompt: 'In a survey, |A| = ' + a + ', |B| = ' + b + ', |C| = ' + c + ', |A&cap;B| = ' + ab + ', |B&cap;C| = ' + bc + ', |A&cap;C| = ' + ac + ', |A&cap;B&cap;C| = ' + abc + '. How many are in at least one set (|A&cup;B&cup;C|)?',
      answer: { type: 'number', value: val },
      hint: 'Inclusion&ndash;exclusion: &sum;singles &minus; &sum;pairs + triple.',
      steps: ['(' + a + '+' + b + '+' + c + ') &minus; (' + ab + '+' + bc + '+' + ac + ') + ' + abc, '= ' + val] };
  });

  /* ---- Counting ---- */
  def('dsc.combinatorics', function (r, lvl) {
    var n = r.int(5, 12), k = r.int(2, 4);
    var mode = r.pick(['C', 'P']);
    var val = mode === 'C' ? C(n, k) : P(n, k);
    return { prompt: (mode === 'C'
        ? 'How many ways can you choose ' + k + ' items from ' + n + ' when order does not matter? (C(' + n + ',' + k + '))'
        : 'How many ways can you arrange ' + k + ' items chosen from ' + n + ' when order matters? (P(' + n + ',' + k + '))'),
      answer: { type: 'number', value: val },
      hint: mode === 'C' ? 'C(n,r) = n!/(r!(n&minus;r)!).' : 'P(n,r) = n!/(n&minus;r)!.',
      steps: [mode === 'C' ? n + '! / (' + k + '!·' + (n - k) + '!) = ' + val : n + '! / ' + (n - k) + '! = ' + val] };
  });

  /* ---- Pigeonhole ---- */
  def('dsc.pigeonhole', function (r, lvl) {
    var m = r.int(3, 12), k = r.int(2, 4);
    var n = m * (k - 1) + 1;
    if (r.chance(0.5)) return { prompt: 'There are ' + m + ' boxes. What is the minimum number of items needed to guarantee that some box holds at least ' + k + ' items?',
      answer: { type: 'number', value: n }, hint: 'With m(k&minus;1) items you can avoid it; one more forces it.',
      steps: [m + ' × (' + k + ' &minus; 1) + 1 = ' + n] };
    return { prompt: 'Distribute ' + n + ' items into ' + m + ' boxes. What is the guaranteed minimum number of items in the fullest box?',
      answer: { type: 'number', value: Math.ceil(n / m) }, hint: '&lceil;n/m&rceil;.',
      steps: ['&lceil;' + n + '/' + m + '&rceil; = ' + Math.ceil(n / m)] };
  });

  /* ---- Graph theory ---- */
  def('dsc.graphs', function (r, lvl) {
    var mode = r.pick(['kn', 'handshake', 'odd']);
    var n = r.int(4, 12);
    if (mode === 'kn') return { prompt: 'How many edges does the complete graph K_' + n + ' have?',
      answer: { type: 'number', value: n * (n - 1) / 2 }, hint: 'C(n,2) = n(n&minus;1)/2.',
      steps: [n + '(' + n + ' &minus; 1)/2 = ' + (n * (n - 1) / 2)] };
    if (mode === 'handshake') { var e = r.int(6, 30); return { prompt: 'A simple graph has ' + e + ' edges. What is the sum of all vertex degrees?',
      answer: { type: 'number', value: 2 * e }, hint: 'Handshake lemma: every edge contributes 2 to the degree sum.',
      steps: ['2 × ' + e + ' = ' + (2 * e)] }; }
    var ans = r.pick([0, 2, 4]);
    var yes = ans <= 2;
    return { prompt: 'A connected graph has exactly ' + ans + ' vertices of odd degree. Does an Euler path exist?',
      answer: { type: 'choice', value: yes ? 0 : 1, choices: ['yes', 'no'], display: yes ? 'yes' : 'no' },
      hint: 'An Euler path exists iff there are 0 or 2 odd-degree vertices.',
      steps: [ans + ' odd-degree vertices &rarr; ' + (yes ? 'yes, an Euler path exists.' : 'no, no Euler path exists.')] };
  });

  /* ---- Recurrences ---- */
  def('dsc.recurrence', function (r, lvl) {
    var c = r.int(2, 9), n = r.int(5, 20);
    if (r.chance(0.5)) {
      return { prompt: 'A process satisfies T(1) = ' + c + ' and T(n) = T(n&minus;1) + ' + c + '. What is T(' + n + ')?',
        answer: { type: 'number', value: c * n }, hint: 'Unroll: each step adds ' + c + ', applied ' + n + ' times.',
        steps: ['T(n) = T(1) + (n&minus;1)·' + c + ' = ' + c + ' + ' + (n - 1) + '·' + c + ' = ' + c * n] };
    }
    var a = r.pick([2, 3]), k = r.int(3, 6);
    return { prompt: 'A process satisfies T(1) = 1 and T(n) = ' + a + '·T(n&minus;1). What is T(' + k + ')?',
      answer: { type: 'number', value: Math.pow(a, k - 1) }, hint: 'This is geometric: T(n) = a^{n&minus;1}.',
      steps: ['T(' + k + ') = ' + a + '^' + (k - 1) + ' = ' + Math.pow(a, k - 1)] };
  });

  /* ---- Divisibility & modular ---- */
  def('dsc.divisibility', function (r, lvl) {
    var mode = r.pick(['mod', 'summod', 'prodmod']);
    var m = r.pick([3, 4, 5, 7, 9, 11]);
    if (mode === 'mod') { var a = r.int(20, 200); return { prompt: 'What is ' + a + ' mod ' + m + '?',
      answer: { type: 'number', value: a % m }, hint: 'Remainder after dividing ' + a + ' by ' + m + '.',
      steps: [m + ' × ' + Math.floor(a / m) + ' = ' + (m * Math.floor(a / m)) + ', remainder ' + (a % m)] }; }
    var x = r.int(10, 99), y = r.int(10, 99);
    if (mode === 'summod') return { prompt: 'What is (' + x + ' + ' + y + ') mod ' + m + '?',
      answer: { type: 'number', value: (x + y) % m }, hint: 'Add, then reduce mod ' + m + ' (you may reduce first too).',
      steps: [(x + y) + ' mod ' + m + ' = ' + ((x + y) % m)] };
    return { prompt: 'What is (' + x + ' × ' + y + ') mod ' + m + '?',
      answer: { type: 'number', value: (x * y) % m }, hint: '(a·b) mod m = ((a mod m)(b mod m)) mod m.',
      steps: [x + ' mod ' + m + ' = ' + (x % m) + ', ' + y + ' mod ' + m + ' = ' + (y % m),
        '(' + (x % m) + ' × ' + (y % m) + ') mod ' + m + ' = ' + ((x * y) % m)] };
  });
})(window.MH);
