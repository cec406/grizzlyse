/* ============================================================
   CSMath Hero - curriculum.js
   The skill tree. Every skill id maps to a generator of the
   same name (registered in the gen.*.js files). `blurb` is the
   micro-theory shown in the Codex and as a hint.
   ============================================================ */
(function (MH) {
  'use strict';

  var R = [];

  function realm(o) { o.index = R.length; o.skills = o.skills; R.push(o); }

  realm({
    id: 'fnd', name: 'Foundations of Number', icon: '&#8734;', color: '#38bdf8',
    tagline: 'Arithmetic, fractions, powers, and the rules that never change.',
    skills: [
      { id: 'fnd.integers', name: 'Integer Arithmetic', blurb: 'Add, subtract, multiply and divide signed numbers. Same signs multiply to +, different signs to &minus;.' },
      { id: 'fnd.order', name: 'Order of Operations', blurb: 'PEMDAS: Parentheses, Exponents, Multiplication/Division (left&rarr;right), then Addition/Subtraction.' },
      { id: 'fnd.factors', name: 'Factors, GCD & LCM', blurb: 'Prime factorisation reveals the building blocks of a number. GCD = shared primes; LCM = union of primes.' },
      { id: 'fnd.fractions', name: 'Fractions', blurb: 'Add/subtract with a common denominator; multiply straight across; divide by multiplying by the reciprocal.' },
      { id: 'fnd.decimals', name: 'Decimals & Percents', blurb: 'Percent means "per hundred": 25% = 25/100 = 0.25. To convert fractions to decimals, divide.' },
      { id: 'fnd.percent', name: 'Percent Change', blurb: 'Percent change = (new &minus; old) / old &times; 100%. A 20% markup multiplies by 1.20.' },
      { id: 'fnd.exponents', name: 'Exponents & Roots', blurb: 'a^n = a&middot;a&middot;&hellip;&middot;a (n times). a^0 = 1, a^{-n} = 1/a^n, and &radic;(a&sup2;) = |a|.' },
      { id: 'fnd.scinot', name: 'Scientific Notation', blurb: 'Write x &times; 10^k with 1 &le; |x| &lt; 10. Multiplying adds exponents; dividing subtracts them.' }
    ]
  });

  realm({
    id: 'pre', name: 'Pre-Algebra', icon: '&#120499;', color: '#22d3ee',
    tagline: 'Letters enter the picture. Solve your first equations.',
    skills: [
      { id: 'pre.evaluate', name: 'Evaluate Expressions', blurb: 'Substitute values for variables, then follow order of operations. Watch negative signs when squaring.' },
      { id: 'pre.liketerms', name: 'Like Terms', blurb: 'Combine terms with identical variable parts: 3x + 5x = 8x. Constants combine with constants.' },
      { id: 'pre.onestep', name: 'One-Step Equations', blurb: 'Undo the operation on x by applying its inverse to both sides. x + 7 = 12 &rarr; subtract 7.' },
      { id: 'pre.twostep', name: 'Two-Step Equations', blurb: 'Undo addition/subtraction first, then multiplication/division: ax + b = c &rarr; x = (c &minus; b)/a.' },
      { id: 'pre.distribute', name: 'Distribute & Solve', blurb: 'a(b + c) = ab + ac. Expand, collect like terms, then isolate x.' },
      { id: 'pre.inequality', name: 'Inequalities', blurb: 'Solve like equations, but FLIP the inequality when multiplying or dividing by a negative.' },
      { id: 'pre.ratio', name: 'Ratios & Proportions', blurb: 'A proportion a/b = c/d is solved by cross-multiplying: ad = bc.' },
      { id: 'pre.slope', name: 'Slope Between Points', blurb: 'Slope m = (y&#8322; &minus; y&#8321;)/(x&#8322; &minus; x&#8321;) measures rise over run.' }
    ]
  });

  realm({
    id: 'alg', name: 'Algebra', icon: '&#120517;', color: '#6366f1',
    tagline: 'Linear systems, polynomials, quadratics, logs. The workhorse of CS.',
    skills: [
      { id: 'alg.slopeintercept', name: 'Lines', blurb: 'y = mx + b, where m is slope and b the y-intercept. Parallel &rarr; equal m; perpendicular &rarr; m&#8321;m&#8322; = &minus;1.' },
      { id: 'alg.systems', name: 'Linear Systems', blurb: 'Two equations, two unknowns. Eliminate one variable by adding scaled equations, then back-substitute.' },
      { id: 'alg.exponentlaws', name: 'Exponent Laws', blurb: 'a^m&middot;a^n = a^{m+n}; a^m/a^n = a^{m&minus;n}; (a^m)^n = a^{mn}; (ab)^n = a^n b^n.' },
      { id: 'alg.polymul', name: 'Polynomials', blurb: 'Multiply with FOIL/distribution. Degree of a product = sum of degrees.' },
      { id: 'alg.factor', name: 'Factoring Quadratics', blurb: 'For x&sup2; + bx + c find two numbers multiplying to c and adding to b: (x+p)(x+q).' },
      { id: 'alg.quadratic', name: 'Quadratic Formula', blurb: 'x = (&minus;b &plusmn; &radic;(b&sup2; &minus; 4ac)) / 2a. The discriminant b&sup2;&minus;4ac tells you how many real roots exist.' },
      { id: 'alg.logs', name: 'Logarithms', blurb: 'log&#8320;(a&middot;b) = log a + log b; log(a^n) = n&middot;log a; log&#8320;(a) answers "b to what power gives a?"' },
      { id: 'alg.radicals', name: 'Radicals', blurb: '&radic;(ab) = &radic;a&middot;&radic;b. Simplify by pulling out perfect squares: &radic;50 = 5&radic;2.' }
    ]
  });

  realm({
    id: 'fun', name: 'Functions', icon: '&#402;', color: '#a855f7',
    tagline: 'Machines that map inputs to outputs — the atoms of programs.',
    skills: [
      { id: 'fun.evalfun', name: 'Evaluate Functions', blurb: 'f(x) is a rule. f(3) means substitute 3 for every x. Watch signs with even powers.' },
      { id: 'fun.composition', name: 'Composition', blurb: '(f&compfn;g)(x) = f(g(x)): apply the inner function first, then the outer. Order matters.' },
      { id: 'fun.inverse', name: 'Inverse Functions', blurb: 'f&#8315;&sup1; undoes f. Find it by swapping x and y, then solving for y.' },
      { id: 'fun.domain', name: 'Domain', blurb: 'The legal inputs: no division by zero, and no even roots of negatives. log(x) needs x &gt; 0.' },
      { id: 'fun.expgrowth', name: 'Exponential Growth', blurb: 'A(t) = A&#8320;&middot;(1+r)^t doubles when the exponent hits a full period. Decay uses 0 &lt; 1+r &lt; 1.' },
      { id: 'fun.sequences', name: 'Sequences & Series', blurb: 'Arithmetic: a&#8345; = a&#8321; + (n&minus;1)d. Geometric: a&#8345; = a&#8321;r^{n&minus;1}. Sums are the closed forms behind loop analysis.' }
    ]
  });

  realm({
    id: 'trg', name: 'Trigonometry', icon: '&#8730;', color: '#ec4899',
    tagline: 'Angles, waves, rotations — and why circles show up in graphics.',
    skills: [
      { id: 'trg.ratios', name: 'Right-Triangle Ratios', blurb: 'SOH-CAH-TOA: sin = opp/hyp, cos = adj/hyp, tan = opp/adj.' },
      { id: 'trg.special', name: 'Special Angles', blurb: 'sin30&deg;=&#189;, sin45&deg;=&radic;2/2, sin60&deg;=&radic;3/2, and cos mirrors sin. tan45&deg;=1.' },
      { id: 'trg.pythident', name: 'Pythagorean Identity', blurb: 'sin&sup2;&theta; + cos&sup2;&theta; = 1. Also 1 + tan&sup2;&theta; = sec&sup2;&theta;.' },
      { id: 'trg.lawcos', name: 'Law of Cosines', blurb: 'c&sup2; = a&sup2; + b&sup2; &minus; 2ab&middot;cos(C). It is Pythagoras with an angle correction.' },
      { id: 'trg.radians', name: 'Radians', blurb: '180&deg; = &pi; radians. Convert with &pi;/180 (deg&rarr;rad) or 180/&pi; (rad&rarr;deg).' },
      { id: 'trg.unitcircle', name: 'Unit Circle', blurb: 'ASTC: All, Sine, Tangent, Cosine are positive in quadrants I&ndash;IV. cos&theta; is x, sin&theta; is y.' }
    ]
  });

  realm({
    id: 'cal', name: 'Calculus', icon: '&#8747;', color: '#f97316',
    tagline: 'Change and accumulation. The maths of gradients and cost functions.',
    skills: [
      { id: 'cal.limits', name: 'Limits', blurb: 'The value a function approaches. Factor to cancel 0/0, or use L&rsquo;H&ocirc;pital when you hit 0/0 or &infin;/&infin;.' },
      { id: 'cal.derivpower', name: 'Power Rule', blurb: 'd/dx x^n = n&middot;x^{n&minus;1}. Constants vanish; derivatives are linear.' },
      { id: 'cal.derivprod', name: 'Product & Quotient', blurb: '(uv)&prime; = u&prime;v + uv&prime;. (u/v)&prime; = (u&prime;v &minus; uv&prime;)/v&sup2;.' },
      { id: 'cal.chain', name: 'Chain Rule', blurb: 'd/dx f(g(x)) = f&prime;(g(x))&middot;g&prime;(x). The derivative of the outside times the inside.' },
      { id: 'cal.tangent', name: 'Tangent Lines', blurb: 'The tangent at x=a has slope f&prime;(a): y = f(a) + f&prime;(a)(x &minus; a).' },
      { id: 'cal.optimize', name: 'Optimisation', blurb: 'Set f&prime;(x) = 0 to find critical points; f&Prime; &gt; 0 is a minimum, f&Prime; &lt; 0 a maximum.' },
      { id: 'cal.integral', name: 'Definite Integrals', blurb: 'The fundamental theorem: &int;&#8320;&#8319; f = F(b) &minus; F(a) where F&prime; = f. Antiderivative of x^n is x^{n+1}/(n+1).' },
      { id: 'cal.series', name: 'Series', blurb: 'Geometric sum = a(1&minus;r&#8319;)/(1&minus;r); it converges when |r| &lt; 1. A p-series &sum;1/n^p converges iff p &gt; 1.' }
    ]
  });

  realm({
    id: 'dsc', name: 'Discrete Math', icon: '&#9679;', color: '#14b8a6',
    tagline: 'Sets, logic, counting, graphs — the dialect of proofs and CS theory.',
    skills: [
      { id: 'dsc.sets', name: 'Sets', blurb: 'A &cup; B = union, A &cap; B = intersection, complement is everything outside. |A &cup; B| = |A| + |B| &minus; |A &cap; B|.' },
      { id: 'dsc.logic', name: 'Propositional Logic', blurb: 'p&rarr;q is false only when p is true and q is false. Its contrapositive &not;q&rarr;&not;p is logically equivalent.' },
      { id: 'dsc.inclusionexcl', name: 'Inclusion&ndash;Exclusion', blurb: '|A &cup; B &cup; C| = &sum;|A| &minus; &sum;|A&cap;B| + |A&cap;B&cap;C|. Alternating over- and under-counts.' },
      { id: 'dsc.combinatorics', name: 'Counting', blurb: 'Permutations P(n,r) = n!/(n&minus;r)! order matters; combinations C(n,r) = n!/(r!(n&minus;r)!) it does not.' },
      { id: 'dsc.pigeonhole', name: 'Pigeonhole Principle', blurb: 'Put n items in m boxes: some box holds at least &lceil;n/m&rceil;. With n &gt; m, two share a box.' },
      { id: 'dsc.graphs', name: 'Graph Theory', blurb: 'Handshake lemma: &sum; degrees = 2&middot;edges. K&#8345; has n(n&minus;1)/2 edges. Euler path needs 0 or 2 odd-degree vertices.' },
      { id: 'dsc.recurrence', name: 'Recurrences', blurb: 'T(n) = aT(n/b) + f(n) is the shape of divide &amp; conquer. Unrolling reveals the growth.' },
      { id: 'dsc.divisibility', name: 'Divisibility & Modular', blurb: 'a &equiv; b (mod m) means m divides a&minus;b. Modular arithmetic wraps like a clock, which is why hashes work.' }
    ]
  });

  realm({
    id: 'lin', name: 'Linear Algebra', icon: '&#8862;', color: '#8b5cf6',
    tagline: 'Vectors and matrices: the native language of graphics, ML, and solvers.',
    skills: [
      { id: 'lin.vectorops', name: 'Vector Operations', blurb: 'Add componentwise; scale by a scalar. Magnitude |v| = &radic;(x&sup2;+y&sup2;+z&sup2;).' },
      { id: 'lin.dotangle', name: 'Dot Product & Angle', blurb: 'u&middot;v = |u||v|cos&theta;. Perpendicular &hArr; dot = 0. Projection uses the dot product too.' },
      { id: 'lin.matmul', name: 'Matrix Multiplication', blurb: '(AB)&#8321;ⱼ = row&#8321; of A &middot; columnⱼ of B. Inner dimensions must match: (m&times;n)(n&times;p) = m&times;p.' },
      { id: 'lin.determinant', name: 'Determinants', blurb: '2&times;2: ad &minus; bc. det = 0 &hArr; the matrix is singular (columns dependent). It scales area/volume.' },
      { id: 'lin.solve', name: 'Solving Systems', blurb: 'Gaussian elimination row-reduces to RREF. Rank = pivot count; nullity = #vars &minus; rank (Rank&ndash;Nullity).' },
      { id: 'lin.eigen', name: 'Eigenvalues', blurb: 'Av = &lambda;v. Find &lambda; from det(A &minus; &lambda;I) = 0, a quadratic for 2&times;2 matrices.' },
      { id: 'lin.independence', name: 'Span & Independence', blurb: 'Vectors are independent when the only solution to c&#8321;v&#8321;+&hellip;+c&#8345;v&#8345; = 0 is all c = 0. Otherwise one is redundant.' }
    ]
  });

  realm({
    id: 'prb', name: 'Probability & Statistics', icon: '&#9832;', color: '#eab308',
    tagline: 'Reasoning under uncertainty — central to ML, systems, and hashing.',
    skills: [
      { id: 'prb.basic', name: 'Basic Probability', blurb: 'P(E) = favourable / total, always in [0,1]. Complement: P(not E) = 1 &minus; P(E).' },
      { id: 'prb.union', name: 'Union & Independence', blurb: 'P(A&cup;B) = P(A)+P(B)&minus;P(A&cap;B). Independent events multiply: P(A&cap;B) = P(A)P(B).' },
      { id: 'prb.conditional', name: 'Conditional & Bayes', blurb: 'P(A|B) = P(A&cap;B)/P(B). Bayes: P(A|B) = P(B|A)P(A)/P(B). The idea behind spam filters.' },
      { id: 'prb.counting', name: 'Counting Probability', blurb: 'Combine combinatorics with probability. Draw without replacement &rarr; use combinations.' },
      { id: 'prb.expected', name: 'Expected Value', blurb: 'E[X] = &sum; x&middot;P(x). Expected value is linear: E[X+Y] = E[X]+E[Y] regardless of dependence.' },
      { id: 'prb.variance', name: 'Variance & SD', blurb: 'Var(X) = E[X&sup2;] &minus; (E[X])&sup2;; SD = &radic;Var. For a sample, divide the sum of squares by n&minus;1.' },
      { id: 'prb.binomial', name: 'Binomial Distribution', blurb: 'P(k successes) = C(n,k)&middot;p^k&middot;(1&minus;p)^{n&minus;k}. Mean np, variance np(1&minus;p).' },
      { id: 'prb.normal', name: 'Normal & z-scores', blurb: 'z = (x &minus; &mu;)/&sigma;. Empirical rule: ~68% within 1&sigma;, ~95% within 2&sigma;, ~99.7% within 3&sigma;.' }
    ]
  });

  realm({
    id: 'cs', name: 'Algorithms & Complexity', icon: '&#9203;', color: '#f43f5e',
    tagline: 'How cost grows. Big-O is the calculus of computer science.',
    skills: [
      { id: 'cs.bigo', name: 'Big-O Classification', blurb: 'Drop constants and lower-order terms. Loops multiply, sequential blocks add, halving gives log n.' },
      { id: 'cs.master', name: 'Master Theorem', blurb: 'T(n)=aT(n/b)+f(n). Compare f(n) with n^{log&#8320;a}: whichever dominates wins, ties get an extra log n.' },
      { id: 'cs.bubblesort', name: 'Comparison Counting', blurb: 'Bubble/insertion sort do ~n&sup2;/2 comparisons worst case; merge/quick sort average n&middot;log&#8322;n.' },
      { id: 'cs.binsearch', name: 'Binary Search', blurb: 'Halve the search space each step: &lceil;log&#8322;n&rceil; comparisons. Requires sorted input.' },
      { id: 'cs.mergesort', name: 'Divide & Conquer', blurb: 'Merge sort: T(n) = 2T(n/2) + n = &Theta;(n log n). Recurrences arise from "split, solve, combine".' },
      { id: 'cs.dpstates', name: 'Dynamic Programming', blurb: 'Overlapping subproblems + optimal substructure. Count states and transitions: total = states &times; work per state.' },
      { id: 'cs.growthcompare', name: 'Growth Ordering', blurb: '1 &lt; log n &lt; &radic;n &lt; n &lt; n log n &lt; n&sup2; &lt; 2^n &lt; n!. Know this ladder cold.' },
      { id: 'cs.structures', name: 'Data Structures', blurb: 'Hash map O(1) average, balanced BST O(log n), heap O(log n) insert / O(1) peek, unsorted array O(n) search.' }
    ]
  });

  realm({
    id: 'bits', name: 'CS Foundations', icon: '&#128268;', color: '#10b981',
    tagline: 'Binary, bits, boolean algebra, modular arithmetic, and crypto.',
    skills: [
      { id: 'bits.binary', name: 'Binary & Decimal', blurb: 'Positional base-2: 1011&#8322; = 8+0+2+1 = 11. Each place is a power of two.' },
      { id: 'bits.hex', name: 'Hexadecimal', blurb: 'Base 16, digits 0&ndash;9,A&ndash;F. One hex digit = exactly 4 bits, so it is a compact binary shorthand.' },
      { id: 'bits.bitwise', name: 'Bitwise Operators', blurb: 'AND (&amp;), OR (|), XOR (^). XOR is self-inverse: x ^ x = 0, which is how swap tricks and checksums work.' },
      { id: 'bits.shift', name: 'Shifts', blurb: 'x &lt;&lt; k multiplies by 2^k; x &gt;&gt; k is integer division by 2^k (floor). Bit tricks are O(1).' },
      { id: 'bits.twoscomp', name: "Two's Complement", blurb: 'Negate by inverting bits and adding 1. Bit 7 of a byte is the sign: range &minus;128..127 for int8.' },
      { id: 'bits.boolean', name: 'Boolean Algebra', blurb: "De Morgan: &not;(p&and;q) = &not;p&or;&not;q and vice versa. p&or;(p&and;q) = p (absorption). Simplifies circuits and conditions." },
      { id: 'bits.modpow', name: 'Modular Exponentiation', blurb: '(a&middot;b) mod m = ((a mod m)(b mod m)) mod m. Fast exponentiation squares and halves the exponent: O(log n).' },
      { id: 'bits.euclid', name: 'Euclidean Algorithm', blurb: 'gcd(a,b) = gcd(b, a mod b) until the remainder is 0. It also powers the modular inverse via extended Euclid.' },
      { id: 'bits.range', name: 'Integer Ranges', blurb: 'n bits give 2^n unsigned values (0..2^n&minus;1) or, signed, &minus;2^{n&minus;1}..2^{n&minus;1}&minus;1. Overflow wraps by modular arithmetic.' }
    ]
  });

  MH.CURRICULUM = { realms: R };

  /* flat lookups */
  MH.ALL_SKILLS = [];
  R.forEach(function (r) { r.skills.forEach(function (s) { s.realm = r.id; MH.ALL_SKILLS.push(s); }); });
  MH.skillById = function (id) {
    for (var i = 0; i < MH.ALL_SKILLS.length; i++) if (MH.ALL_SKILLS[i].id === id) return MH.ALL_SKILLS[i];
    return null;
  };
})(window.MH);
