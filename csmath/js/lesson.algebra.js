/* ============================================================
   CSMath Hero - lesson.algebra.js
   Lessons for: Algebra + Functions + Trigonometry
   ============================================================ */
(function (MH) {
  'use strict';
  var L = MH.lesson;

  /* ---------------- ALGEBRA ---------------- */

  L('alg.slopeintercept', {
    hook: 'y = mx + b is the single most useful equation in computing — regressions, ramps, interpolations, and camera motion all use it.',
    viz: 'functiongraph',
    s: [
      { h: 'Two numbers describe a whole line', b: [
        ['list', ['<b>m</b> is the slope (steepness).', '<b>b</b> is the y-intercept (where it crosses the y-axis).']],
        ['f', 'y = mx + b'],
        ['ex', { q: 'Line through (0, 3) with slope 2. Find y when x = 5.', steps: ['y = 2x + 3', 'y = 2(5) + 3', 'y = 13'], a: '13' }]
      ] },
      { h: 'Finding b from a point', b: [
        ['p', 'Substitute the point and rearrange:'],
        ['f', 'b = y &minus; mx'],
        ['note', 'Parallel lines share m. Perpendicular lines satisfy m&#8321;&middot;m&#8322; = &minus;1.']
      ] }
    ],
    f: ['y = mx + b', 'm = &Delta;y/&Delta;x', 'perpendicular: m&#8321;m&#8322; = &minus;1'],
    tips: ['Sketching two points on paper makes the slope sign obvious.']
  });

  L('alg.systems', {
    hook: 'Two equations, two unknowns. This is the smallest version of the linear systems that run graphics, ML fitting, and circuit analysis.',
    s: [
      { h: 'Elimination', b: [
        ['p', 'Scale one or both equations so a variable has matching coefficients, then add or subtract to make it vanish.'],
        ['ex', { q: 'Solve x + y = 10 and x &minus; y = 2', steps: ['Add the equations: 2x = 12', 'x = 6', 'Substitute back: 6 + y = 10 &rarr; y = 4'], a: 'x = 6, y = 4' }]
      ] },
      { h: 'Cramer&rsquo;s rule (the determinant view)', b: [
        ['p', 'For a&#8321;x + b&#8321;y = c&#8321; and a&#8322;x + b&#8322;y = c&#8322;:'],
        ['f', 'x = \\frac{c_1 b_2 - c_2 b_1}{a_1 b_2 - a_2 b_1}'],
        ['note', 'The denominator a&#8321;b&#8322; &minus; a&#8322;b&#8321; is the determinant. If it is 0, the lines are parallel and there is no unique solution.']
      ] }
    ],
    f: ['x = (c&#8321;b&#8322; &minus; c&#8322;b&#8321;) / D', 'D = a&#8321;b&#8322; &minus; a&#8322;b&#8321;'],
    tips: ['If D = 0, the system has either no solutions or infinitely many.']
  });

  L('alg.exponentlaws', {
    hook: 'Exponent laws tame huge numbers into tiny ones — essential for complexity analysis, hashing, and floating-point.',
    s: [
      { h: 'The three moves', b: [
        ['f', 'a^m \\cdot a^n = a^{m+n}'],
        ['f', '\\frac{a^m}{a^n} = a^{m-n}'],
        ['f', '(a^m)^n = a^{mn}'],
        ['ex', { q: 'Simplify (2&sup3;)&sup2; &times; 2&#8309;', steps: ['Power of a power: (2&sup3;)&sup2; = 2&#8310;', 'Multiply like bases: 2&#8310; &times; 2&#8309; = 2&#185;&#8309;', '= 32768'], a: '2&#185;&#8309;' }]
      ] },
      { h: 'Negative and fractional exponents', b: [
        ['f', 'a^{-n} = \\frac{1}{a^n} \\qquad a^{1/2} = \\sqrt{a}'],
        ['note', 'Fractional exponents are roots in disguise — that is why the rules still work.']
      ] }
    ],
    f: ['a^m a^n = a^{m+n}', '(a^m)^n = a^{mn}', 'a^{1/2} = &radic;a'],
    tips: ['When unsure, write a small example (like base 2) and verify the rule by hand.']
  });

  L('alg.polymul', {
    hook: 'Multiplying polynomials is convolution in disguise — the same operation behind signal processing and probability distributions.',
    s: [
      { h: 'FOIL', b: [
        ['p', 'For two binomials, multiply First, Outer, Inner, Last terms.'],
        ['f', '(x+a)(x+b) = x^2 + (a+b)x + ab'],
        ['ex', { q: 'Expand (x + 3)(x &minus; 5)', steps: ['x&sup2; + (&minus;5 + 3)x + (3)(&minus;5)', 'x&sup2; &minus; 2x &minus; 15'], a: 'x&sup2; &minus; 2x &minus; 15' }]
      ] },
      { h: 'Pattern recognition', b: [
        ['f', '(a+b)^2 = a^2 + 2ab + b^2'],
        ['f', '(a-b)(a+b) = a^2 - b^2'],
        ['note', 'The "difference of squares" trick is everywhere in algebra and factoring.']
      ] }
    ],
    f: ['(x+a)(x+b) = x&sup2; + (a+b)x + ab', '(a+b)&sup2; = a&sup2;+2ab+b&sup2;', '(a&minus;b)(a+b) = a&sup2;&minus;b&sup2;'],
    tips: ['Multiply slowly and line up like terms in a column.']
  });

  L('alg.factor', {
    hook: 'Factoring reverses expansion. Finding the roots of a polynomial is finding where a system hits zero.',
    s: [
      { h: 'Reverse FOIL', b: [
        ['p', 'For x&sup2; + bx + c, look for two numbers that <b>multiply</b> to c and <b>add</b> to b.'],
        ['f', 'x^2 + (p+q)x + pq = (x+p)(x+q)'],
        ['ex', { q: 'Factor x&sup2; &minus; x &minus; 12', steps: ['Need product &minus;12, sum &minus;1.', 'Numbers: &minus;4 and +3', '(x &minus; 4)(x + 3)'], a: '(x &minus; 4)(x + 3)' }]
      ] },
      { h: 'Roots = solutions', b: [
        ['p', 'If (x &minus; 4)(x + 3) = 0, then either x = 4 or x = &minus;3. A product is zero only when a factor is zero.']
      ] }
    ],
    f: ['roots of (x&minus;p)(x&minus;q) are p and q', 'sum of roots = &minus;b, product = c'],
    tips: ['List factor pairs of c first; it narrows the search fast.']
  });

  L('alg.quadratic', {
    hook: 'The quadratic formula solves any degree-2 equation in one shot — and its discriminant tells you how many answers exist before you compute them.',
    viz: 'functiongraph',
    s: [
      { h: 'The formula', b: [
        ['f', 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}'],
        ['p', 'For ax&sup2; + bx + c = 0, plug in a, b, and c.'],
        ['ex', { q: 'Solve x&sup2; &minus; 5x + 6 = 0', steps: ['a=1, b=&minus;5, c=6', 'discriminant = 25 &minus; 24 = 1', 'x = (5 &plusmn; 1)/2 &rarr; 3 or 2'], a: 'x = 2 or 3' }]
      ] },
      { h: 'The discriminant', b: [
        ['f', '\\Delta = b^2 - 4ac'],
        ['list', ['&Delta; &gt; 0: two real roots.', '&Delta; = 0: one repeated root.', '&Delta; &lt; 0: no real roots (complex pair).']]
      ] }
    ],
    f: ['x = (&minus;b &plusmn; &radic;&Delta;)/2a', '&Delta; = b&sup2; &minus; 4ac'],
    tips: ['Compute the discriminant first — it tells you if you should expect 0, 1, or 2 answers.']
  });

  L('alg.logs', {
    hook: 'Logarithms turn multiplication into addition — that is why they appear everywhere in complexity (log n) and in data structures like trees and heaps.',
    s: [
      { h: 'A log is an exponent', b: [
        ['p', 'log&#8320;(x) asks: "b to what power gives x?" So log&#8322;(8) = 3 because 2&sup3; = 8.'],
        ['f', '\\log_b(x) = y \\iff b^y = x']
      ] },
      { h: 'The laws', b: [
        ['f', '\\log(ab) = \\log a + \\log b'],
        ['f', '\\log(a^n) = n\\log a'],
        ['f', '\\log_b(a) = \\frac{\\log(a)}{\\log(b)}'],
        ['ex', { q: 'log&#8322;(32)', steps: ['32 = 2&#8309;', 'log&#8322;(32) = 5'], a: '5' }]
      ] },
      { h: 'Why CS loves logs', b: [
        ['note', 'Halving a problem each step (binary search, balanced trees) takes log&#8322;n steps. Doubling the data adds only one step.']
      ] }
    ],
    f: ['log&#8320;(ab) = log a + log b', 'log(a&#8319;) = n log a', 'change of base: log&#8320;a = ln a / ln b'],
    tips: ['Convert to exponential form whenever a log looks confusing.']
  });

  L('alg.radicals', {
    hook: 'Simplifying radicals keeps answers exact — the difference between &radic;50 and a long decimal.',
    s: [
      { h: 'Pull out perfect squares', b: [
        ['f', '\\sqrt{ab} = \\sqrt{a}\\sqrt{b}'],
        ['ex', { q: 'Simplify &radic;50', steps: ['50 = 25 &times; 2', '&radic;25 &times; &radic;2 = 5&radic;2'], a: '5&radic;2' }]
      ] },
      { h: 'Rationalising', b: [
        ['p', 'Multiply the top and bottom by the radical to move it out of the denominator:'],
        ['f', '\\frac{1}{\\sqrt{a}} = \\frac{\\sqrt{a}}{a}']
      ] }
    ],
    f: ['&radic;(ab) = &radic;a &middot; &radic;b', '1/&radic;a = &radic;a/a'],
    tips: ['Find the biggest perfect square that divides the number under the root.']
  });

  /* ---------------- FUNCTIONS ---------------- */

  L('fun.evalfun', {
    hook: 'A function is a reusable machine. Evaluating it is "calling" it with an input.',
    viz: 'functiongraph',
    s: [
      { h: 'Input &rarr; output', b: [
        ['p', 'Every x-value maps to exactly one f(x). To evaluate, substitute the number for x everywhere.'],
        ['ex', { q: 'f(x) = x&sup2; &minus; 3x, find f(4)', steps: ['4&sup2; &minus; 3(4)', '16 &minus; 12 = 4'], a: '4' }]
      ] },
      { h: 'Even and odd functions', b: [
        ['list', ['Even: f(&minus;x) = f(x) — symmetric about the y-axis (like x&sup2;).', 'Odd: f(&minus;x) = &minus;f(x) — symmetric about the origin (like x&sup3;).']]
      ] }
    ],
    f: ['f(a) = substitute a for x'],
    tips: ['Use parentheses when substituting negatives.']
  });

  L('fun.composition', {
    hook: 'Composition is chaining functions — the mathematical equivalent of f(g(x)) in one line of code.',
    s: [
      { h: 'Inside first', b: [
        ['f', '(f \\circ g)(x) = f(g(x))'],
        ['ex', { q: 'f(x) = 2x + 1, g(x) = x &minus; 3. Find f(g(5)).', steps: ['g(5) = 5 &minus; 3 = 2', 'f(2) = 2(2) + 1 = 5'], a: '5' }],
        ['warn', 'f(g(x)) is not usually the same as g(f(x)) — order matters, just like in code.']
      ] },
      { h: 'Composition as pipelines', b: [
        ['note', 'In functional programming, composing small pure functions is the whole design philosophy.']
      ] }
    ],
    f: ['(f&compfn;g)(x) = f(g(x))'],
    tips: ['Always compute the inner function to a single number first.']
  });

  L('fun.inverse', {
    hook: 'An inverse undoes a function — how you decrypt, reverse a transform, or solve for an input given an output.',
    s: [
      { h: 'Swap and solve', b: [
        ['p', 'To find f&#8315;&sup1;, write y = f(x), swap x and y, then solve for y.'],
        ['ex', { q: 'Inverse of f(x) = 2x + 6. Find f&#8315;&sup1;(10).', steps: ['y = 2x + 6 &rarr; swap: x = 2y + 6', 'y = (x &minus; 6)/2', 'f&#8315;&sup1;(10) = (10 &minus; 6)/2 = 2'], a: '2' }]
      ] },
      { h: 'The test', b: [
        ['f', 'f(f^{-1}(x)) = x'],
        ['note', 'Only one-to-one functions (passing the horizontal-line test) have inverses.']
      ] }
    ],
    f: ['swap x and y, then solve for y'],
    tips: ['Getting back the original input is proof your inverse is right.']
  });

  L('fun.domain', {
    hook: 'The domain is the set of legal inputs — the "validation rules" of a function.',
    s: [
      { h: 'Two restrictions to memorise', b: [
        ['list', ['<b>Denominators</b> can never be zero.', '<b>Even roots</b> need a non-negative inside.', '<b>Logs</b> need a strictly positive argument.']],
        ['ex', { q: 'Domain of f(x) = 1/(x &minus; 3)', steps: ['Denominator = 0 when x = 3', 'Everything else is allowed', 'x &ne; 3'], a: 'x &ne; 3' }]
      ] },
      { h: 'Reading the domain', b: [
        ['p', 'In interval notation, x &ge; 2 is [2, &infin;) and x &ne; 3 is (&minus;&infin;,3) &cup; (3,&infin;).']
      ] }
    ],
    f: ['no &divide;0', '&radic; needs &ge;0', 'log needs &gt;0'],
    tips: ['Scan for divisions, roots, and logs — those are the only things that restrict x.']
  });

  L('fun.expgrowth', {
    hook: 'Exponential growth and decay model populations, interest, radioactive decay, and even algorithm blow-ups.',
    s: [
      { h: 'The model', b: [
        ['f', 'A(t) = A_0 (1 + r)^t'],
        ['ex', { q: '$1000 at 10% yearly for 3 years', steps: ['A = 1000(1.10)&sup3;', '= 1000 &times; 1.331', '= 1331'], a: '$1331' }]
      ] },
      { h: 'Doubling and half-life', b: [
        ['f', 'A = A_0 \\cdot 2^{t/h} \\quad A = A_0 \\cdot (\\tfrac12)^{t/h}'],
        ['note', 'r &gt; 0 grows; &minus;1 &lt; r &lt; 0 decays. Compounding multiplies the growth.']
      ] }
    ],
    f: ['A = A&#8320;(1+r)^t', 'doubling: &times;2^{t/h}'],
    tips: ['Identify A&#8320; (start), r (rate), t (periods), then substitute.']
  });

  L('fun.sequences', {
    hook: 'Sequences model loops: how many steps, how much total work. Their sums are the closed forms behind algorithm analysis.',
    s: [
      { h: 'Arithmetic vs geometric', b: [
        ['f', 'a_n = a_1 + (n-1)d'],
        ['f', 'a_n = a_1 r^{n-1}'],
        ['ex', { q: '10th term of 3, 7, 11, &hellip;', steps: ['d = 4', 'a&#8321;&#8320; = 3 + 9(4) = 39'], a: '39' }]
      ] },
      { h: 'Sums', b: [
        ['f', 'S_n = \\frac{n(a_1 + a_n)}{2}'],
        ['f', 'S_n = a_1\\frac{r^n - 1}{r - 1}'],
        ['note', 'The arithmetic sum 1+2+&hellip;+n = n(n+1)/2 is the number of comparisons in bubble sort.']
      ] }
    ],
    f: ['arith: a&#8345; = a&#8321;+(n&minus;1)d', 'geo: a&#8345; = a&#8321;r^{n&minus;1}', 'arith sum = n(a&#8321;+a&#8345;)/2'],
    tips: ['Decide first whether the gap or the ratio is constant.']
  });

  /* ---------------- TRIGONOMETRY ---------------- */

  L('trg.ratios', {
    hook: 'Trigonometry is how computers rotate, aim, and render anything. It all starts with three ratios.',
    viz: 'righttriangle',
    s: [
      { h: 'SOH CAH TOA', b: [
        ['list', ['<b>S</b>in = <b>O</b>pposite / <b>H</b>ypotenuse', '<b>C</b>os = <b>A</b>djacent / <b>H</b>ypotenuse', '<b>T</b>an = <b>O</b>pposite / <b>A</b>djacent']],
        ['ex', { q: 'Right triangle with legs 3 and 4, hypotenuse 5. sin &theta; for the angle opposite 3?', steps: ['sin = opp/hyp', '= 3/5'], a: '3/5' }]
      ] },
      { h: 'Pythagoras underneath', b: [
        ['f', 'a^2 + b^2 = c^2'],
        ['note', 'These ratios never change if you scale the triangle — that is why they define angles.']
      ] }
    ],
    f: ['sin &theta; = opp/hyp', 'cos &theta; = adj/hyp', 'tan &theta; = opp/adj'],
    tips: ['Label the sides <i>relative to the angle</i> in the question before writing any ratio.']
  });

  L('trg.special', {
    hook: 'A handful of angles have exact values you should know cold — they fall out of two special triangles.',
    viz: 'unitcircle',
    s: [
      { h: 'The two triangles', b: [
        ['p', 'A 45&ndash;45&ndash;90 triangle has sides 1, 1, &radic;2. A 30&ndash;60&ndash;90 triangle has sides 1, &radic;3, 2.'],
        ['table', { head: ['&theta;', 'sin', 'cos', 'tan'], rows: [['30&deg;', '1/2', '&radic;3/2', '&radic;3/3'], ['45&deg;', '&radic;2/2', '&radic;2/2', '1'], ['60&deg;', '&radic;3/2', '1/2', '&radic;3']] }]
      ] },
      { h: 'The pattern', b: [
        ['note', 'sin goes &radic;1/2, &radic;2/2, &radic;3/2 for 30, 45, 60 — and cos is the same list reversed.']
      ] }
    ],
    f: ['sin30=&frac12;, sin45=&radic;2/2, sin60=&radic;3/2'],
    tips: ['Sketch the two special triangles; every exact value follows from them.']
  });

  L('trg.pythident', {
    hook: 'One identity links sine and cosine forever — the Pythagorean theorem in disguise.',
    viz: 'unitcircle',
    s: [
      { h: 'The identity', b: [
        ['f', '\\sin^2\\theta + \\cos^2\\theta = 1'],
        ['p', 'On the unit circle, sin and cos are the legs of a right triangle whose hypotenuse is 1. Pythagoras gives the identity directly.'],
        ['ex', { q: 'sin &theta; = 3/5. Find cos &theta; (positive).', steps: ['cos&sup2; = 1 &minus; 9/25 = 16/25', 'cos = 4/5'], a: '4/5' }]
      ] },
      { h: 'Companions', b: [
        ['f', '1 + \\tan^2\\theta = \\sec^2\\theta'],
        ['note', 'Divide the main identity by cos&sup2; to get this one.']
      ] }
    ],
    f: ['sin&sup2;&theta; + cos&sup2;&theta; = 1'],
    tips: ['Given one ratio, the identity gives you the other up to sign.']
  });

  L('trg.lawcos', {
    hook: 'Pythagoras only works for right triangles. The law of cosines fixes it for every triangle.',
    s: [
      { h: 'The formula', b: [
        ['f', 'c^2 = a^2 + b^2 - 2ab\\cos(C)'],
        ['p', 'When C = 90&deg;, cos(C) = 0 and it collapses back to Pythagoras.'],
        ['ex', { q: 'a = 5, b = 7, C = 60&deg;. Find c&sup2;.', steps: ['c&sup2; = 25 + 49 &minus; 2(5)(7)(0.5)', '= 74 &minus; 35 = 39', 'c &asymp; 6.24'], a: '39' }]
      ] },
      { h: 'The family', b: [
        ['f', '\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}'],
        ['note', 'Use the law of sines for angle&ndash;side pairs; the law of cosines when you have three sides or two sides and the included angle.']
      ] }
    ],
    f: ['c&sup2; = a&sup2; + b&sup2; &minus; 2ab cos C', 'a/sin A = b/sin B'],
    tips: ['If you have the included angle, reach for the law of cosines.']
  });

  L('trg.radians', {
    hook: 'Radians are the natural unit of angle — the only one where arc length, derivatives, and code (Math.sin) behave cleanly.',
    viz: 'unitcircle',
    s: [
      { h: 'The conversion', b: [
        ['f', '180\\degree = \\pi \\text{ radians}'],
        ['list', ['Degrees &rarr; radians: multiply by &pi;/180.', 'Radians &rarr; degrees: multiply by 180/&pi;.']],
        ['ex', { q: 'Convert 90&deg; to radians', steps: ['90 &times; &pi;/180 = &pi;/2'], a: '&pi;/2' }]
      ] },
      { h: 'Why radians', b: [
        ['note', 'In radians, the derivative of sin is exactly cos. In degrees you would carry a messy &pi;/180 factor everywhere.']
      ] }
    ],
    f: ['deg &rarr; rad: &times;&pi;/180', 'rad &rarr; deg: &times;180/&pi;'],
    tips: ['Memorise: 90&deg;=&pi;/2, 180&deg;=&pi;, 360&deg;=2&pi;.']
  });

  L('trg.unitcircle', {
    hook: 'The unit circle turns trigonometry into coordinates — and makes signs and radians visual.',
    viz: 'unitcircle',
    s: [
      { h: 'Coordinates are cos and sin', b: [
        ['f', '(x, y) = (\\cos\\theta, \\sin\\theta)'],
        ['p', 'At angle &theta; from the positive x-axis, the point on the unit circle has coordinates cos&theta; and sin&theta;.']
      ] },
      { h: 'ASTC — the sign map', b: [
        ['list', ['Quadrant I: <b>A</b>ll positive.', 'Quadrant II: <b>S</b>ine positive.', 'Quadrant III: <b>T</b>angent positive.', 'Quadrant IV: <b>C</b>osine positive.']],
        ['note', 'The reference angle is the acute angle to the x-axis; use it with the sign rule.']
      ] }
    ],
    f: ['(cos &theta;, sin &theta;)', 'ASTC'],
    tips: ['Draw the quadrant before deciding the sign of any trig value.']
  });
})(window.MH);
