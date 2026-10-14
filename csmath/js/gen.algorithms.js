/* ============================================================
   CSMath Hero - gen.algorithms.js
   Realm: Algorithms & Complexity
   ============================================================ */
(function (MH) {
  'use strict';
  var def = MH.def;
  var ORDERS = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n&sup2;)', 'O(2&#8319;)'];

  /* ---- Big-O classification ---- */
  def('cs.bigo', function (r, lvl) {
    var templates = [
      { code: 'for i in 1..n:\\n    x += 1', best: 'O(n)', why: 'One loop over n items &rarr; linear.' },
      { code: 'x = a + b', best: 'O(1)', why: 'A fixed number of operations &rarr; constant.' },
      { code: 'for i in 1..n:\\n    for j in 1..n:\\n        x += 1', best: 'O(n&sup2;)', why: 'Nested loops over n &rarr; n·n.' },
      { code: 'while n > 1:\\n    n = n / 2', best: 'O(log n)', why: 'Halving each step &rarr; log&#8322;n iterations.' },
      { code: 'for i in 1..n:\\n    x += 1\\nfor j in 1..n:\\n    y += 1', best: 'O(n)', why: 'Sequential loops add: n + n = 2n &rarr; O(n).' },
      { code: 'for i in 1..n:\\n    while m > 1:\\n        m = m / 2', best: 'O(n log n)', why: 'A log loop inside a linear loop.' },
      { code: 'for i in 1..n:\\n    for j in 1..n:\\n        for k in 1..n:\\n            x += 1', best: 'O(n&sup3;)', why: 'Three nested loops.' }
    ];
    if (lvl < 4) templates = templates.slice(0, 4);
    var t = r.pick(templates);
    var correct = t.best;
    var pool = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n&sup2;)', 'O(n&sup3;)'];
    var choices = [correct];
    r.shuffle(pool).forEach(function (c) { if (choices.length < 4 && choices.indexOf(c) === -1) choices.push(c); });
    choices = r.shuffle(choices);
    return { prompt: 'What is the time complexity of this code?<pre>' + t.code.replace(/\\n/g, '\n') + '</pre>',
      answer: { type: 'choice', value: choices.indexOf(correct), choices: choices, display: correct },
      hint: 'Loops multiply when nested, add when sequential. Halving &rarr; log.',
      steps: [t.why] };
  });

  /* ---- Master theorem ---- */
  def('cs.master', function (r, lvl) {
    var a = r.pick([2, 3, 4, 8]), b = r.pick([2, 3, 4]);
    var exp = Math.log(a) / Math.log(b);
    // f(n) = n^p; choose p so we land in a nice case
    var p = r.pick([0, 1, 2, exp]);
    var tidy = Math.abs(p - Math.round(p)) < 1e-9;
    p = tidy ? Math.round(p) : exp;
    var fText = p === 0 ? '1' : 'n^' + (Math.abs(p - Math.round(p)) < 1e-9 ? Math.round(p) : p.toFixed(2));
    var result;
    if (Math.abs(p - exp) < 1e-9) result = '&Theta;(n^' + (Math.round(exp * 100) / 100) + ' log n)';
    else if (p < exp) result = '&Theta;(n^' + (Math.round(exp * 100) / 100) + ')';
    else result = '&Theta;(' + fText + ')';
    var pool = ['&Theta;(n^' + (Math.round(exp * 100) / 100) + ')', '&Theta;(n^' + (Math.round(exp * 100) / 100) + ' log n)', '&Theta;(' + fText + ')', '&Theta;(log n)'];
    var choices = [result];
    r.shuffle(pool).forEach(function (c) { if (choices.length < 4 && choices.indexOf(c) === -1) choices.push(c); });
    choices = r.shuffle(choices);
    return { prompt: 'Solve the recurrence T(n) = ' + a + 'T(n/' + b + ') + ' + fText + '.',
      answer: { type: 'choice', value: choices.indexOf(result), choices: choices, display: result },
      hint: 'Compare f(n) = ' + fText + ' with n^{log&#8320;a} = n^' + (Math.round(exp * 100) / 100) + '.',
      steps: ['log_' + b + '(' + a + ') = ' + (Math.round(exp * 100) / 100),
        'p = ' + p + (Math.abs(p - exp) < 1e-9 ? ' (equal) &rarr; extra log n factor' : p < exp ? ' &lt; exponent &rarr; the recursion dominates' : ' &gt; exponent &rarr; f(n) dominates'),
        'Result: ' + result] };
  });

  /* ---- Comparison counting ---- */
  def('cs.bubblesort', function (r, lvl) {
    var n = r.int(5, 20);
    var mode = r.pick(['bubble', 'merge']);
    if (mode === 'bubble') return { prompt: 'How many comparisons does bubble sort perform in the worst case on an array of ' + n + ' elements?',
      answer: { type: 'number', value: n * (n - 1) / 2 }, hint: 'It is ~n&sup2;/2: n(n&minus;1)/2 exactly.',
      steps: [n + '(' + n + ' &minus; 1)/2 = ' + (n * (n - 1) / 2)] };
    var L = Math.pow(2, Math.round(Math.log2(n)));
    return { prompt: 'Merge sort is ~n·log&#8322;n comparisons. Using n = ' + L + ', how many comparisons (rounded up)?',
      answer: { type: 'number', value: Math.ceil(L * Math.log2(L)) }, hint: 'n·log&#8322;n.',
      steps: [L + ' × log&#8322;' + L + ' = ' + L + ' × ' + Math.log2(L) + ' = ' + L * Math.log2(L)] };
  });

  /* ---- Binary search ---- */
  def('cs.binsearch', function (r, lvl) {
    var mode = r.pick(['steps', 'size']);
    if (mode === 'steps') {
      var n = Math.pow(2, r.int(4, 12));
      return { prompt: 'In the worst case, how many comparisons does binary search need on a sorted array of ' + n + ' elements?',
        answer: { type: 'number', value: Math.log2(n) }, hint: 'Each step halves the range &rarr; &lceil;log&#8322;n&rceil;.',
        steps: ['log&#8322;(' + n + ') = ' + Math.log2(n)] };
    }
    var k = r.int(3, 12);
    return { prompt: 'Binary search makes at most ' + k + ' comparisons. What is the largest array size it can handle?',
      answer: { type: 'number', value: Math.pow(2, k) - 1 }, hint: 'k comparisons handle up to 2^k &minus; 1 elements.',
      steps: ['2^' + k + ' &minus; 1 = ' + (Math.pow(2, k) - 1)] };
  });

  /* ---- Merge sort / divide & conquer ---- */
  def('cs.mergesort', function (r, lvl) {
    var n = Math.pow(2, r.int(3, 10));
    var mode = r.pick(['levels', 'work']);
    if (mode === 'levels') return { prompt: 'Merge sort splits n items until subarrays of size 1. For n = ' + n + ', how many levels of splitting are there?',
      answer: { type: 'number', value: Math.log2(n) }, hint: 'Each level halves; levels = log&#8322;n.',
      steps: ['log&#8322;(' + n + ') = ' + Math.log2(n)] };
    return { prompt: 'Merge sort does ' + n + ' total work per level over log&#8322;' + n + ' levels. What is the total work n·log&#8322;n?',
      answer: { type: 'number', value: n * Math.log2(n) }, hint: 'Multiply work per level by the number of levels.',
      steps: [n + ' × ' + Math.log2(n) + ' = ' + n * Math.log2(n)] };
  });

  /* ---- Dynamic programming ---- */
  def('cs.dpstates', function (r, lvl) {
    var mode = r.pick(['paths', 'fib', 'states']);
    function C(n, k) { return MH._C(n, k); }
    if (mode === 'paths') {
      var m = r.int(2, 6), n2 = r.int(2, 6);
      return { prompt: 'On an ' + m + '&times;' + n2 + ' grid you may only move right or down, from top-left to bottom-right. How many distinct paths are there?',
        answer: { type: 'number', value: C(m + n2 - 2, m - 1) }, hint: 'You take (m&minus;1) down and (n&minus;1) right moves in any order: C(m+n&minus;2, m&minus;1).',
        steps: ['Total moves = ' + (m + n2 - 2) + ', choose ' + (m - 1) + ' down-moves', 'C(' + (m + n2 - 2) + ',' + (m - 1) + ') = ' + C(m + n2 - 2, m - 1)] };
    }
    if (mode === 'fib') {
      var k = r.int(8, 20);
      var f = [0, 1]; for (var i = 2; i <= k; i++) f.push(f[i - 1] + f[i - 2]);
      return { prompt: 'Using the DP recurrence F(n) = F(n&minus;1) + F(n&minus;2) with F(0)=0, F(1)=1, what is F(' + k + ')?',
        answer: { type: 'number', value: f[k] }, hint: 'Build the table bottom-up.',
        steps: ['F(' + k + ') = ' + f[k]] };
    }
    var rows = r.int(2, 5), cols = r.int(2, 6);
    return { prompt: 'A DP solution fills a table with ' + rows + ' rows and ' + cols + ' columns, doing O(1) work in each cell. How many cells (states) are there?',
      answer: { type: 'number', value: rows * cols }, hint: 'Total time = states × work per state.',
      steps: [rows + ' × ' + cols + ' = ' + (rows * cols) + ' states &rarr; O(' + (rows * cols) + ') time'] };
  });

  /* ---- Growth ordering ---- */
  def('cs.growthcompare', function (r, lvl) {
    var a = r.pick(ORDERS), b = r.pick(ORDERS);
    while (a === b) b = r.pick(ORDERS);
    var ia = ORDERS.indexOf(a), ib = ORDERS.indexOf(b);
    var faster = ia < ib ? a : b;
    return { prompt: 'Which function grows more slowly (i.e. is a better algorithm) as n &rarr; &infin;: ' + a + ' or ' + b + '?',
      answer: { type: 'choice', value: faster === a ? 0 : 1, choices: [a, b], display: faster },
      hint: 'Remember the ladder: 1 &lt; log n &lt; n &lt; n log n &lt; n&sup2; &lt; 2&#8319;.',
      steps: ['Ordering: ' + ORDERS.join(' &lt; '), faster + ' grows more slowly.'] };
  });

  /* ---- Data structures ---- */
  def('cs.structures', function (r, lvl) {
    var ops = [
      { q: 'the average-case lookup in a hash map', a: 'O(1)', why: 'Hashing jumps straight to the bucket (amortised).' },
      { q: 'the worst-case lookup in a hash map (all collisions)', a: 'O(n)', why: 'Everything lands in one bucket.' },
      { q: 'search in a balanced binary search tree', a: 'O(log n)', why: 'The tree height is O(log n).' },
      { q: 'inserting into a binary heap', a: 'O(log n)', why: 'Sift up at most the height of the tree.' },
      { q: 'finding the minimum in a binary heap', a: 'O(1)', why: 'The min is stored at the root.' },
      { q: 'search in an unsorted array', a: 'O(n)', why: 'You must scan every element.' },
      { q: 'appending to a dynamic array (amortised)', a: 'O(1)', why: 'Doubling capacity spreads the copy cost out.' },
      { q: 'search in a sorted array with binary search', a: 'O(log n)', why: 'Halving each step.' },
      { q: 'popping from the front of a linked list given the head', a: 'O(1)', why: 'Just rewire the head pointer.' }
    ];
    var o = r.pick(ops);
    var pool = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n&sup2;)'];
    var choices = [o.a];
    r.shuffle(pool).forEach(function (c) { if (choices.length < 4 && choices.indexOf(c) === -1) choices.push(c); });
    choices = r.shuffle(choices);
    return { prompt: 'What is the time complexity of ' + o.q + '?',
      answer: { type: 'choice', value: choices.indexOf(o.a), choices: choices, display: o.a },
      hint: 'Think about how the structure stores data.', steps: [o.a + ': ' + o.why] };
  });
})(window.MH);
