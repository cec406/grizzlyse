/* ============================================================
   CSMath Hero - gen.probability.js
   Realm: Probability & Statistics
   ============================================================ */
(function (MH) {
  'use strict';
  var def = MH.def;
  function C(n, k) { return MH._C(n, k); }
  function fr(n, d) { var f = MH.frac(n, d); return f.d === 1 ? String(f.n) : MH.m('\\frac{' + f.n + '}{' + f.d + '}'); }

  /* ---- Basic probability ---- */
  def('prb.basic', function (r, lvl) {
    var mode = r.pick(['dice', 'balls', 'cards']);
    if (mode === 'dice') {
      var want = r.int(1, 6), target = r.chance(0.5);
      if (target) return { prompt: 'A fair 6-sided die is rolled. What is P(rolling a ' + want + ')? (3 dp)',
        answer: { type: 'number', value: 1 / 6, tol: 0.002, display: '1/6' }, hint: 'One favourable outcome out of 6.',
        steps: ['P = 1/6 &asymp; 0.167'] };
      var n = r.int(1, 5);
      return { prompt: 'A fair 6-sided die is rolled. What is P(rolling a number greater than ' + n + ')? (3 dp)',
        answer: { type: 'number', value: (6 - n) / 6, tol: 0.002, display: fr(6 - n, 6) }, hint: 'Count favourable outcomes / 6.',
        steps: ['Favourable: ' + (6 - n) + ' of 6, P = ' + (6 - n) + '/6 &asymp; ' + MH.nice((6 - n) / 6, 3)] };
    }
    if (mode === 'balls') {
      var red = r.int(2, 9), blue = r.int(2, 9);
      var tot = red + blue, pick = r.pick(['red', 'blue']);
      var num = pick === 'red' ? red : blue;
      return { prompt: 'A bag has ' + red + ' red and ' + blue + ' blue balls. One is drawn at random. What is P(' + pick + ')? (3 dp)',
        answer: { type: 'number', value: num / tot, tol: 0.002, display: fr(num, tot) }, hint: 'favourable / total.',
        steps: [num + '/' + tot + ' &asymp; ' + MH.nice(num / tot, 3)] };
    }
    if (r.chance(0.5)) return { prompt: 'A card is drawn from a standard 52-card deck. What is P(a heart)? (3 dp)',
      answer: { type: 'number', value: 13 / 52, tol: 0.002, display: '1/4' }, hint: '13 hearts in 52 cards.',
      steps: ['13/52 = 1/4 = 0.25'] };
    var rank = r.pick(['aces', 'kings', 'sevens']), cnt = 4;
    return { prompt: 'A card is drawn from a standard 52-card deck. What is P(a ' + rank.slice(0, -1) + ')? (3 dp)',
      answer: { type: 'number', value: 4 / 52, tol: 0.002, display: '1/13' }, hint: 'There are 4 of each rank.',
      steps: ['4/52 = 1/13 &asymp; 0.077'] };
  });

  /* ---- Union & independence ---- */
  def('prb.union', function (r, lvl) {
    var pa = r.int(2, 8) / 10, pb = r.int(2, 8) / 10;
    // keep P(A∩B) legal: ≤ min(P(A),P(B)) and ≥ P(A)+P(B)−1 so P(A∪B) ≤ 1
    var lo = Math.max(1, Math.ceil((pa + pb - 1) * 10));
    var hi = Math.floor(Math.min(pa, pb) * 10);
    var pab = r.int(lo, hi) / 10;
    var mode = r.pick(['union', 'indep', 'complement']);
    if (mode === 'union') return { prompt: 'P(A) = ' + pa + ', P(B) = ' + pb + ', P(A&cap;B) = ' + pab + '. What is P(A&cup;B)?',
      answer: { type: 'number', value: MH.nice(pa + pb - pab, 6) }, hint: 'P(A&cup;B) = P(A) + P(B) &minus; P(A&cap;B).',
      steps: [pa + ' + ' + pb + ' &minus; ' + pab + ' = ' + MH.nice(pa + pb - pab, 4)] };
    if (mode === 'indep') return { prompt: 'A and B are independent, P(A) = ' + pa + ', P(B) = ' + pb + '. What is P(A&cap;B)?',
      answer: { type: 'number', value: MH.nice(pa * pb, 6) }, hint: 'Independent &rarr; multiply.',
      steps: [pa + ' × ' + pb + ' = ' + MH.nice(pa * pb, 6)] };
    return { prompt: 'P(A) = ' + pa + '. What is P(not A)?',
      answer: { type: 'number', value: MH.nice(1 - pa, 6) }, hint: 'P(not A) = 1 &minus; P(A).', steps: ['1 &minus; ' + pa + ' = ' + MH.nice(1 - pa, 4)] };
  });

  /* ---- Conditional & Bayes ---- */
  def('prb.conditional', function (r, lvl) {
    if (r.chance(0.5)) {
      var pab = r.pick([0.1, 0.2, 0.3, 0.4]), pb = r.pick([0.5, 0.8, 0.4]);
      return { prompt: 'P(A&cap;B) = ' + pab + ', P(B) = ' + pb + '. What is P(A|B)?',
        answer: { type: 'number', value: MH.nice(pab / pb, 6) }, hint: 'P(A|B) = P(A&cap;B)/P(B).',
        steps: [pab + ' / ' + pb + ' = ' + MH.nice(pab / pb, 4)] };
    }
    // Bayes with tidy numbers
    var prev = r.pick([0.01, 0.02, 0.05, 0.1]);
    var sens = r.pick([0.9, 0.95, 0.99]);
    var fpr = r.pick([0.05, 0.1]);
    var num = sens * prev;
    var den = num + fpr * (1 - prev);
    return { prompt: 'A disease affects ' + (prev * 100) + '% of people. A test is ' + (sens * 100) + '% sensitive and has a ' + (fpr * 100) + '% false-positive rate. Given a positive test, what is P(disease)? (3 dp)',
      answer: { type: 'number', value: MH.nice(num / den, 6), tol: 0.003 },
      hint: 'Bayes: P(D|+) = P(+|D)P(D) / [P(+|D)P(D) + P(+|&#172;D)P(&#172;D)].',
      steps: ['P(+|D)P(D) = ' + sens + ' × ' + prev + ' = ' + MH.nice(num, 4),
        'P(+|&#172;D)P(&#172;D) = ' + fpr + ' × ' + MH.nice(1 - prev, 3) + ' = ' + MH.nice(fpr * (1 - prev), 4),
        'P(D|+) = ' + MH.nice(num / den, 3)] };
  });

  /* ---- Counting probability ---- */
  def('prb.counting', function (r, lvl) {
    var red = r.int(3, 7), blue = r.int(3, 7), draw = 2;
    var tot = red + blue;
    var want = r.pick(['red', 'blue']);
    var num = want === 'red' ? C(red, draw) : C(blue, draw);
    var den = C(tot, draw);
    return { prompt: 'A bag has ' + red + ' red and ' + blue + ' blue balls. Two are drawn without replacement. What is P(both ' + want + ')? (3 dp)',
      answer: { type: 'number', value: MH.nice(num / den, 6), tol: 0.003 },
      hint: 'Use combinations: favourable pairs / total pairs.',
      steps: ['Total pairs C(' + tot + ',2) = ' + den, 'Favourable C(' + (want === 'red' ? red : blue) + ',2) = ' + num, 'P = ' + num + '/' + den + ' &asymp; ' + MH.nice(num / den, 3)] };
  });

  /* ---- Expected value ---- */
  def('prb.expected', function (r, lvl) {
    if (r.chance(0.5)) {
      var n = r.pick([6, 8, 10, 20]);
      var sum = n * (n + 1) / 2;
      return { prompt: 'What is the expected value of one roll of a fair ' + n + '-sided die (faces 1..' + n + ')?',
        answer: { type: 'number', value: sum / n }, hint: 'Mean = (1 + n)/2.',
        steps: ['E[X] = (1 + ' + n + ')/2 = ' + MH.nice(sum / n, 4)] };
    }
    // lottery-style with tidy probability sets (each sums to 1)
    var sets = [[0.2, 0.3, 0.5], [0.1, 0.4, 0.5], [0.25, 0.25, 0.5], [0.3, 0.3, 0.4], [0.1, 0.2, 0.7]];
    var probs = r.pick(sets);
    var vals = [r.int(1, 10), r.int(1, 10), r.int(1, 10)];
    var ev = vals[0] * probs[0] + vals[1] * probs[1] + vals[2] * probs[2];
    return { prompt: 'X takes values ' + vals[0] + ', ' + vals[1] + ', ' + vals[2] + ' with probabilities ' + probs.join(', ') + '. What is E[X]?',
      answer: { type: 'number', value: MH.nice(ev, 6) }, hint: 'E[X] = &sum; x·P(x).',
      steps: [vals[0] + '(' + probs[0] + ') + ' + vals[1] + '(' + probs[1] + ') + ' + vals[2] + '(' + probs[2] + ') = ' + MH.nice(ev, 4)] };
  });

  /* ---- Variance & SD ---- */
  def('prb.variance', function (r, lvl) {
    var data = [];
    for (var i = 0; i < 5; i++) data.push(r.int(1, 20));
    var mean = data.reduce(function (a, b) { return a + b; }, 0) / data.length;
    var ss = data.reduce(function (a, x) { return a + (x - mean) * (x - mean); }, 0);
    var sampleVar = ss / (data.length - 1);
    var popVar = ss / data.length;
    var ask = r.pick(['mean', 'var', 'sd', 'range']);
    if (ask === 'mean') return { prompt: 'Find the mean of { ' + data.join(', ') + ' }.',
      answer: { type: 'number', value: MH.nice(mean, 6) }, hint: 'Sum ÷ count.',
      steps: ['Sum = ' + data.reduce(function (a, b) { return a + b; }), 'Mean = ' + MH.nice(mean, 4)] };
    if (ask === 'range') return { prompt: 'Find the range of { ' + data.join(', ') + ' }.',
      answer: { type: 'number', value: Math.max.apply(null, data) - Math.min.apply(null, data) }, hint: 'Range = max &minus; min.',
      steps: [Math.max.apply(null, data) + ' &minus; ' + Math.min.apply(null, data) + ' = ' + (Math.max.apply(null, data) - Math.min.apply(null, data))] };
    if (ask === 'var') return { prompt: 'Find the population variance of { ' + data.join(', ') + ' }.',
      answer: { type: 'number', value: MH.nice(popVar, 6), tol: 0.01 }, hint: 'Average of squared deviations from the mean.',
      steps: ['mean = ' + MH.nice(mean, 3), '&sum;(x &minus; &mu;)&sup2; = ' + MH.nice(ss, 3), 'Var = ' + MH.nice(ss, 3) + '/' + data.length + ' = ' + MH.nice(popVar, 3)] };
    return { prompt: 'Find the population standard deviation of { ' + data.join(', ') + ' }. (2 dp)',
      answer: { type: 'number', value: MH.nice(Math.sqrt(popVar), 6), tol: 0.01 }, hint: 'SD = &radic;variance.',
      steps: ['Var = ' + MH.nice(popVar, 3), 'SD = ' + MH.nice(Math.sqrt(popVar), 3)] };
  });

  /* ---- Binomial ---- */
  def('prb.binomial', function (r, lvl) {
    var n = r.int(3, 8), p = r.pick([0.2, 0.25, 0.4, 0.5, 0.6, 0.75]), k = r.int(1, n - 1);
    var prob = C(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    if (r.chance(0.4)) {
      return { prompt: 'A binomial experiment has n = ' + n + ' trials with success probability p = ' + p + '. What is the expected number of successes?',
        answer: { type: 'number', value: MH.nice(n * p, 6) }, hint: 'Mean of a binomial = np.',
        steps: ['np = ' + n + ' × ' + p + ' = ' + MH.nice(n * p, 4)] };
    }
    return { prompt: 'X ~ Binomial(n = ' + n + ', p = ' + p + '). What is P(X = ' + k + ')? (4 dp)',
      answer: { type: 'number', value: MH.nice(prob, 8), tol: 0.0005 },
      hint: 'P(X=k) = C(n,k)·p^k·(1&minus;p)^{n&minus;k}.',
      steps: ['C(' + n + ',' + k + ') = ' + C(n, k),
        C(n, k) + ' × ' + p + '^' + k + ' × ' + (1 - p) + '^' + (n - k), '= ' + MH.nice(prob, 4)] };
  });

  /* ---- Normal & z-scores ---- */
  def('prb.normal', function (r, lvl) {
    var mode = r.pick(['z', 'empirical', 'inverse']);
    var mu = r.int(50, 100), sd = r.pick([5, 10, 15]);
    if (mode === 'z') { var x = mu + r.nonzero(-3, 3) * sd; return { prompt: 'A normal distribution has mean ' + mu + ' and SD ' + sd + '. What is the z-score of x = ' + x + '?',
      answer: { type: 'number', value: MH.nice((x - mu) / sd, 6) }, hint: 'z = (x &minus; &mu;)/&sigma;.',
      steps: ['(' + x + ' &minus; ' + mu + ')/' + sd + ' = ' + MH.nice((x - mu) / sd, 4)] }; }
    if (mode === 'inverse') { var z = r.pick([-2, -1, 1, 2, 3]); var xx = mu + z * sd;
      return { prompt: 'Mean = ' + mu + ', SD = ' + sd + '. What x-value has z-score ' + z + '?',
        answer: { type: 'number', value: xx }, hint: 'x = &mu; + z&sigma;.',
        steps: [mu + ' + (' + z + ')(' + sd + ') = ' + xx] }; }
    var k = r.pick([1, 2, 3]);
    var pct = k === 1 ? 68 : k === 2 ? 95 : 99.7;
    return { prompt: 'Using the empirical rule, what percent of a normal distribution lies within ' + k + ' standard deviation' + (k > 1 ? 's' : '') + ' of the mean?',
      answer: { type: 'number', value: pct, tol: 0.2 }, hint: '68 / 95 / 99.7 rule.',
      steps: ['Within ' + k + '&sigma; &asymp; ' + pct + '%'] };
  });
})(window.MH);
