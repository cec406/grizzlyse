/* ============================================================
   CSMath Hero - lesson.calculus.js
   Lessons for: Calculus + Discrete Math
   ============================================================ */
(function (MH) {
  'use strict';
  var L = MH.lesson;

  /* ---------------- CALCULUS ---------------- */

  L('cal.limits', {
    hook: 'A limit asks "where is this heading?" — the idea that lets us handle 0/0 and infinity without ever dividing by zero.',
    viz: 'functiongraph',
    s: [
      { h: 'Predicting, not arriving', b: [
        ['p', 'lim(x&rarr;a) f(x) is the value f approaches as x sneaks up on a — even if f(a) is undefined.'],
        ['ex', { q: 'lim(x&rarr;2) of (x&sup2; &minus; 4)/(x &minus; 2)', steps: ['Direct substitution gives 0/0 — undefined.', 'Factor: (x&minus;2)(x+2)/(x&minus;2)', 'Cancel: x + 2, so the limit is 2 + 2 = 4'], a: '4' }]
      ] },
      { h: 'Two quick rules', b: [
        ['f', '\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1'],
        ['f', '\\lim_{x\\to\\infty}\\frac{p x^n + \\dots}{q x^n + \\dots} = \\frac{p}{q}'],
        ['note', 'When you get 0/0 or &infin;/&infin;, L&rsquo;H&ocirc;pital says: differentiate the top and bottom separately and retry.']
      ] }
    ],
    f: ['0/0 &rarr; factor or L&rsquo;H&ocirc;pital', 'same-degree &rarr; ratio of leading coefficients'],
    tips: ['Try direct substitution first; only reach for algebra when it gives 0/0 or &infin;/&infin;.']
  });

  L('cal.derivpower', {
    hook: 'The derivative is an instantaneous rate of change — "how fast is this changing right now?" Gradient descent is nothing but derivatives.',
    viz: 'functiongraph',
    s: [
      { h: 'The power rule', b: [
        ['f', '\\frac{d}{dx} x^n = n x^{n-1}'],
        ['p', 'Bring the power down in front, then decrease it by one. Constants vanish; derivatives are linear.'],
        ['ex', { q: 'f(x) = 3x&sup4;. Find f&prime;(2).', steps: ['f&prime;(x) = 12x&sup3;', 'f&prime;(2) = 12(8) = 96'], a: '96' }]
      ] },
      { h: 'What it means', b: [
        ['p', 'f&prime;(a) is the slope of the tangent line to f at x = a. Positive &rarr; rising, negative &rarr; falling, zero &rarr; flat (a peak or valley).'],
        ['viz', 'functiongraph', { tangent: true }]
      ] }
    ],
    f: ['d/dx x&#8319; = n x^{n&minus;1}', 'f&prime;(a) = tangent slope'],
    tips: ['Rewrite roots as fractional powers before differentiating: &radic;x = x^{1/2}.']
  });

  L('cal.derivprod', {
    hook: 'When two changing quantities multiply, you cannot just multiply their derivatives — the product rule accounts for both changing at once.',
    s: [
      { h: 'Product and quotient rules', b: [
        ['f', "(uv)' = u'v + uv'"],
        ['f', "\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}"],
        ['ex', { q: 'f(x) = x&sup2;(x + 1). Find f&prime;(1).', steps: ['u = x&sup2;, v = x+1 &rarr; u&prime;=2x, v&prime;=1', "f&prime; = 2x(x+1) + x&sup2;(1)", 'f&prime;(1) = 2(2) + 1 = 5'], a: '5' }]
      ] },
      { h: 'Memory hooks', b: [
        ['list', ['Product: "first times derivative of second, plus second times derivative of first".', 'Quotient: "low d-high minus high d-low, over low squared".']]
      ] }
    ],
    f: ['(uv)&prime; = u&prime;v + uv&prime;', '(u/v)&prime; = (u&prime;v &minus; uv&prime;)/v&sup2;'],
    tips: ['Label u and v explicitly before you start.']
  });

  L('cal.chain', {
    hook: 'The chain rule differentiates composed functions — how a change ripples through a pipeline.',
    s: [
      { h: 'Outside times inside', b: [
        ['f', '\\frac{d}{dx} f(g(x)) = f\'(g(x)) \\cdot g\'(x)'],
        ['ex', { q: 'f(x) = (3x + 1)&sup2;. Find f&prime;(2).', steps: ['outside: 2(3x+1), inside: 3', 'f&prime; = 2(3x+1)(3) = 6(3x+1)', 'f&prime;(2) = 6(7) = 42'], a: '42' }]
      ] },
      { h: 'Dominoes', b: [
        ['note', 'In neural networks, backpropagation is the chain rule applied layer by layer: each layer multiplies in its local derivative.']
      ] }
    ],
    f: ['d/dx f(g(x)) = f&prime;(g(x))&middot;g&prime;(x)'],
    tips: ['Identify the inner function first, then treat it as a single unit.']
  });

  L('cal.tangent', {
    hook: 'The tangent line is the best straight-line approximation to a curve — the idea behind Newton&rsquo;s method and gradient descent.',
    viz: 'functiongraph',
    s: [
      { h: 'Point-slope tangent', b: [
        ['f', 'y = f(a) + f\'(a)(x - a)'],
        ['ex', { q: 'Tangent to f(x)=x&sup2; at x = 3. What is the slope?', steps: ['f&prime;(x) = 2x', 'f&prime;(3) = 6'], a: '6' }]
      ] },
      { h: 'Linear approximation', b: [
        ['p', 'Near x = a, f(x) &asymp; f(a) + f&prime;(a)(x &minus; a). This is how a computer approximates a complicated function with a cheap linear step.'],
        ['viz', 'functiongraph', { tangent: true, start: 1 }]
      ] }
    ],
    f: ['y = f(a) + f&prime;(a)(x &minus; a)', 'slope = f&prime;(a)'],
    tips: ['A tangent touches the curve at exactly one point near a — the slope there is the derivative.']
  });

  L('cal.optimize', {
    hook: 'Optimisation finds the best value — minimum cost, maximum profit, lowest loss. Gradients guide the search.',
    viz: 'functiongraph',
    s: [
      { h: 'Where the slope is zero', b: [
        ['p', 'At a smooth peak or valley the tangent is flat, so f&prime;(x) = 0. Solve that to find critical points.'],
        ['f', 'x^* = -\\frac{b}{2a}'],
        ['ex', { q: 'Minimum of f(x) = x&sup2; &minus; 6x + 5', steps: ['f&prime; = 2x &minus; 6 = 0', 'x = 3', 'f(3) = 9 &minus; 18 + 5 = &minus;4'], a: '&minus;4' }]
      ] },
      { h: 'Min or max?', b: [
        ['list', ['f&Prime; &gt; 0 &rarr; minimum (a valley).', 'f&Prime; &lt; 0 &rarr; maximum (a peak).']]
      ] }
    ],
    f: ['f&prime;(x) = 0 at critical points', 'f&Prime; decides min vs max'],
    tips: ['Gradient descent just walks the opposite way of the gradient until it stops moving.']
  });

  L('cal.integral', {
    hook: 'An integral accumulates — area under a curve. It is the total, the sum, the cost.',
    s: [
      { h: 'The fundamental theorem', b: [
        ['f', '\\int_a^b f(x)\\,dx = F(b) - F(a) \\quad \\text{where } F\' = f'],
        ['f', '\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C'],
        ['ex', { q: '&int;&#8320;&sup2; 3x&sup2; dx', steps: ['F(x) = x&sup3;', 'F(2) &minus; F(0) = 8 &minus; 0 = 8'], a: '8' }]
      ] },
      { h: 'Reverse the power rule', b: [
        ['p', 'Integration raises the power and divides by the new power — exactly the inverse of differentiating.'],
        ['note', 'A definite integral returns a number (area); an indefinite integral returns a function (plus C).']
      ] }
    ],
    f: ['&int;x&#8319;dx = x^{n+1}/(n+1)', '&int;&#8304;&#7497;f = F(b) &minus; F(a)'],
    tips: ['Find the antiderivative first, then subtract the endpoints.']
  });

  L('cal.series', {
    hook: 'Series are infinite sums. Their convergence decides whether an algorithm terminates and whether an engine is stable.',
    s: [
      { h: 'Geometric series', b: [
        ['f', 'S_n = a\\frac{1 - r^n}{1 - r}'],
        ['f', 'S_\\infty = \\frac{a}{1 - r} \\quad \\text{if } |r| < 1'],
        ['ex', { q: 'Sum of 8 + 4 + 2 + 1 + &hellip;', steps: ['a = 8, r = 1/2', 'S = 8/(1 &minus; 1/2) = 16'], a: '16' }]
      ] },
      { h: 'p-series convergence', b: [
        ['f', '\\sum \\frac{1}{n^p} \\text{ converges} \\iff p > 1'],
        ['note', 'The harmonic series (p = 1) diverges, which is why some naive algorithms never finish.']
      ] }
    ],
    f: ['S&infin; = a/(1&minus;r) for |r|&lt;1', '&sum;1/n^p converges iff p &gt; 1'],
    tips: ['Estimate |r| first — if it is &ge; 1, an infinite geometric series will not settle.']
  });

  /* ---------------- DISCRETE MATH ---------------- */

  L('dsc.sets', {
    hook: 'Sets are the data type of mathematics: collections with no order and no duplicates. Everything else is built from them.',
    viz: 'venn',
    s: [
      { h: 'The operations', b: [
        ['list', ['A &cup; B — union: everything in either set.', 'A &cap; B — intersection: only what is in both.', 'A&#772; — complement: everything not in A.', '|A| — cardinality: how many elements.']],
        ['ex', { q: 'A = {1,2,3}, B = {3,4}. |A &cap; B|?', steps: ['Shared elements: just 3', '|A &cap; B| = 1'], a: '1' }]
      ] },
      { h: 'Cardinality rule', b: [
        ['f', '|A \\cup B| = |A| + |B| - |A \\cap B|'],
        ['note', 'Counting the overlap twice and correcting is the seed of inclusion&ndash;exclusion.']
      ] }
    ],
    f: ['|A&cup;B| = |A|+|B|&minus;|A&cap;B|'],
    tips: ['List the elements out when sets are small; patterns become obvious.']
  });

  L('dsc.logic', {
    hook: 'Boolean logic is the algebra of truth — the same rules compiled into every if-statement and every circuit.',
    s: [
      { h: 'Truth tables', b: [
        ['table', { head: ['p', 'q', 'p&rarr;q', 'p&and;q', 'p&or;q'], rows: [['T', 'T', 'T', 'T', 'T'], ['T', 'F', 'F', 'F', 'T'], ['F', 'T', 'T', 'F', 'T'], ['F', 'F', 'T', 'F', 'F']] }],
        ['warn', 'p&rarr;q is false in exactly one row: when p is true and q is false.']
      ] },
      { h: 'Equivalent forms', b: [
        ['f', 'p \\to q \\equiv \\neg q \\to \\neg p'],
        ['p', 'The right side is the <b>contrapositive</b> — always equivalent to the original (unlike the converse).'],
        ['f', 'p \\to q \\equiv \\neg p \\lor q']
      ] }
    ],
    f: ['p&rarr;q &equiv; &not;p &or; q', 'p&rarr;q &equiv; &not;q&rarr;&not;p'],
    tips: ['A proof by contradiction is just the contrapositive in action.']
  });

  L('dsc.inclusionexcl', {
    hook: 'Inclusion&ndash;exclusion counts without double-counting — vital for hashing collisions, union sizes, and probability.',
    viz: 'venn',
    s: [
      { h: 'Correct for overlaps', b: [
        ['f', '|A \\cup B| = |A| + |B| - |A \\cap B|'],
        ['f', '|A \\cup B \\cup C| = \\sum|\\text{singles}| - \\sum|\\text{pairs}| + |\\text{triple}|'],
        ['ex', { q: '|A|=10, |B|=12, |A&cap;B|=4. Find |A&cup;B|.', steps: ['10 + 12 &minus; 4', '= 18'], a: '18' }]
      ] },
      { h: 'Why alternating signs', b: [
        ['note', 'Adding singles double-counts overlaps, so subtract pairs. That under-counts triple overlaps, so add the triple back. It alternates forever.']
      ] }
    ],
    f: ['|A&cup;B&cup;C| = &sum;|A| &minus; &sum;|A&cap;B| + |A&cap;B&cap;C|'],
    tips: ['Draw the Venn diagram and write each region&rsquo;s count in it before computing.']
  });

  L('dsc.combinatorics', {
    hook: 'Counting is how you know how big a search space is — before you waste time searching it.',
    s: [
      { h: 'Order matters, or not?', b: [
        ['f', 'P(n,r) = \\frac{n!}{(n-r)!}'],
        ['f', 'C(n,r) = \\frac{n!}{r!(n-r)!}'],
        ['p', 'Use <b>P</b> when order matters (passwords, rankings). Use <b>C</b> when it does not (poker hands, subsets).'],
        ['ex', { q: 'How many 3-person committees from 10 people?', steps: ['Order does not matter &rarr; C(10,3)', '= 10!/(3!7!) = 120'], a: '120' }]
      ] },
      { h: 'Pascal&rsquo;s triangle', b: [
        ['f', 'C(n,r) = C(n-1,r-1) + C(n-1,r)'],
        ['note', 'Every entry is the sum of the two above it — the recurrence behind dynamic programming for counting.']
      ] }
    ],
    f: ['P(n,r) = n!/(n&minus;r)!', 'C(n,r) = n!/(r!(n&minus;r)!)'],
    tips: ['Ask: "if I swap two chosen items, is it a different outcome?" If yes, it is a permutation.']
  });

  L('dsc.pigeonhole', {
    hook: 'With more pigeons than holes, some hole must be crowded. It sounds trivial and proves surprisingly deep facts.',
    s: [
      { h: 'The principle', b: [
        ['f', 'n \\text{ items in } m \\text{ boxes} \\Rightarrow \\text{some box has } \\ge \\lceil n/m \\rceil'],
        ['ex', { q: '13 people, 12 birth months. Guaranteed minimum sharing a month?', steps: ['&lceil;13/12&rceil; = 2'], a: '2' }]
      ] },
      { h: 'The classic result', b: [
        ['note', 'Among any 367 people, two share a birthday (366 possible birthdays). Pigeonhole guarantees a collision without finding it.']
      ] }
    ],
    f: ['guaranteed max &ge; &lceil;n/m&rceil;'],
    tips: ['Identify the "boxes" and the "pigeons" first — usually the trick is choosing what counts as a box.']
  });

  L('dsc.graphs', {
    hook: 'Graphs model networks: friends, roads, dependencies, the web. Graph theory asks what is possible and how cheaply.',
    viz: 'graphnet',
    s: [
      { h: 'Degrees and edges', b: [
        ['f', '\\sum \\deg(v) = 2 \\cdot |E|'],
        ['f', '|E(K_n)| = \\frac{n(n-1)}{2}'],
        ['ex', { q: 'How many edges in K&#8326;?', steps: ['6(6&minus;1)/2', '= 15'], a: '15' }]
      ] },
      { h: 'Euler paths', b: [
        ['list', ['A path using every edge exactly once exists iff 0 or 2 vertices have odd degree.', 'A cycle (start = end) needs all degrees even.']],
        ['note', 'The handshake lemma holds because each edge contributes 1 to two different vertices&rsquo; degrees.']
      ] }
    ],
    f: ['&sum;deg = 2|E|', 'K&#8345; has n(n&minus;1)/2 edges', 'Euler path: 0 or 2 odd-degree vertices'],
    tips: ['Count odd-degree vertices first — that single number decides Euler paths.']
  });

  L('dsc.recurrence', {
    hook: 'Recurrences describe recursive programs. Unrolling them is how you turn "T(n) = ..." into a growth rate.',
    s: [
      { h: 'Unrolling', b: [
        ['p', 'Write the recurrence out for smaller and smaller n until you see the pattern.'],
        ['ex', { q: 'T(1)=5, T(n)=T(n&minus;1)+5. Find T(n).', steps: ['Each step adds 5, applied n times.', 'T(n) = T(1) + (n&minus;1)&middot;5 = 5n'], a: '5n' }],
        ['ex', { q: 'T(1)=1, T(n)=2T(n&minus;1). Find T(4).', steps: ['T(2)=2, T(3)=4, T(4)=8', 'or T(n) = 2^{n&minus;1}'], a: '8' }]
      ] },
      { h: 'Divide & conquer shape', b: [
        ['f', 'T(n) = aT(n/b) + f(n)'],
        ['note', 'This is the shape merge sort and binary search take — see the Master Theorem in the algorithms realm.']
      ] }
    ],
    f: ['unroll until the pattern appears', 'T(n)=aT(n/b)+f(n)'],
    tips: ['Compute the first four terms by hand; the closed form usually reveals itself.']
  });

  L('dsc.divisibility', {
    hook: 'Modular arithmetic is clock arithmetic — the engine of hashing, checksums, and all of cryptography.',
    s: [
      { h: 'Congruence', b: [
        ['f', 'a \\equiv b \\pmod m \\iff m \\mid (a - b)'],
        ['p', 'a mod m is the remainder when a is divided by m. It always lands in 0 .. m&minus;1.'],
        ['ex', { q: '37 mod 5', steps: ['5 &times; 7 = 35', '37 &minus; 35 = 2'], a: '2' }]
      ] },
      { h: 'You can reduce early', b: [
        ['f', '(a \\cdot b) \\bmod m = ((a \\bmod m)(b \\bmod m)) \\bmod m'],
        ['note', 'Reducing at every step keeps numbers small — that is how modular exponentiation stays fast and how RSA works.']
      ] }
    ],
    f: ['a mod m in [0, m)', '(a&middot;b) mod m keeps numbers small'],
    tips: ['Reduce each factor first, then multiply, then reduce again.']
  });
})(window.MH);
