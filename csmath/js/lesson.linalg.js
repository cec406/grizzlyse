/* ============================================================
   CSMath Hero - lesson.linalg.js
   Lessons for: Linear Algebra + Probability & Statistics
   ============================================================ */
(function (MH) {
  'use strict';
  var L = MH.lesson;

  /* ---------------- LINEAR ALGEBRA ---------------- */

  L('lin.vectorops', {
    hook: 'A vector is a list of numbers with a direction and a length. Positions, features, and gradients are all vectors.',
    s: [
      { h: 'Adding and scaling', b: [
        ['p', 'You add vectors componentwise and multiply them by scalars the same way.'],
        ['f', 'u + v = (u_1 + v_1, \\; u_2 + v_2)'],
        ['ex', { q: 'u = (3, &minus;1), v = (2, 5). Find u + v.', steps: ['(3+2, &minus;1+5)', '= (5, 4)'], a: '(5, 4)' }]
      ] },
      { h: 'Magnitude', b: [
        ['f', '|u| = \\sqrt{u_1^2 + u_2^2}'],
        ['p', 'This is Pythagoras in n dimensions — the length of the arrow.']
      ] }
    ],
    f: ['u+v componentwise', '|u| = &radic;(&sum;u&#8321;&sup2;)'],
    tips: ['Treat a vector as an arrow: tip-to-tail for addition, stretching for scaling.']
  });

  L('lin.dotangle', {
    hook: 'The dot product measures alignment. It powers similarity searches, projections, and the attention mechanism in modern AI.',
    s: [
      { h: 'The dot product', b: [
        ['f', 'u \\cdot v = u_1 v_1 + u_2 v_2'],
        ['ex', { q: 'u = (1, 2), v = (3, 4). u&middot;v?', steps: ['1&times;3 + 2&times;4', '= 11'], a: '11' }]
      ] },
      { h: 'Dot product and angle', b: [
        ['f', 'u \\cdot v = |u||v|\\cos\\theta'],
        ['list', ['Dot = 0 &rarr; perpendicular (orthogonal).', 'Dot &gt; 0 &rarr; angle &lt; 90&deg;.', 'Dot &lt; 0 &rarr; angle &gt; 90&deg;.']],
        ['note', 'Cosine similarity normalises this by the lengths, giving a pure measure of direction agreement from &minus;1 to 1.']
      ] }
    ],
    f: ['u&middot;v = |u||v|cos&theta;', 'perpendicular &hArr; u&middot;v = 0'],
    tips: ['Zero dot product is the fastest orthogonality test there is.']
  });

  L('lin.matmul', {
    hook: 'Matrix multiplication is how computers transform space — every rotation, scaling, and neural-network layer is one.',
    viz: 'matrixmult',
    s: [
      { h: 'Row times column', b: [
        ['f', '(AB)_{ij} = \\sum_k A_{ik} B_{kj}'],
        ['p', 'Entry (i,j) of the product is row i of A dotted with column j of B.'],
        ['ex', { q: 'Entry (1,1) for A = [[1,2],[3,4]], B = [[5,6],[7,8]]', steps: ['Row 1 of A = (1,2); column 1 of B = (5,7)', '1&times;5 + 2&times;7 = 19'], a: '19' }]
      ] },
      { h: 'Shape rule', b: [
        ['f', '(m \\times n)(n \\times p) = m \\times p'],
        ['warn', 'The inner dimensions must match. Matrix multiplication is not commutative: AB &ne; BA in general.']
      ] }
    ],
    f: ['(AB)&#8305;ⱼ = row&#8305;(A) &middot; colⱼ(B)', '(m&times;n)(n&times;p)=m&times;p'],
    tips: ['Say "row times column" out loud as you compute each entry.']
  });

  L('lin.determinant', {
    hook: 'The determinant tells you whether a transformation is reversible — and by how much it stretches area or volume.',
    viz: 'matrixmult',
    s: [
      { h: '2&times;2 case', b: [
        ['f', '\\det\\begin{pmatrix}a & b\\\\c & d\\end{pmatrix} = ad - bc'],
        ['ex', { q: 'det([[3,1],[2,4]])', steps: ['3&times;4 &minus; 1&times;2', '= 10'], a: '10' }]
      ] },
      { h: 'What zero means', b: [
        ['list', ['det = 0 &rarr; the matrix is <b>singular</b>: no inverse, columns dependent, it squashes space flat.', 'det &ne; 0 &rarr; invertible, a unique solution to Ax = b exists.']],
        ['note', 'The |det| is the factor by which areas (2D) or volumes (3D) scale.']
      ] }
    ],
    f: ['det = ad &minus; bc', 'det = 0 &hArr; not invertible'],
    tips: ['A zero determinant is the algebra signal for "these equations are redundant."']
  });

  L('lin.solve', {
    hook: 'Solving Ax = b is the heart of scientific computing, from graphics to simulations to least squares.',
    s: [
      { h: 'Gaussian elimination', b: [
        ['p', 'Row-reduce the augmented matrix to row-echelon form, then back-substitute. Legal moves: swap rows, scale a row, add a multiple of one row to another.'],
        ['ex', { q: '2x + y = 7, x &minus; y = 2. Find x.', steps: ['Add the equations: 3x = 9', 'x = 3'], a: '3' }]
      ] },
      { h: 'Rank and nullity', b: [
        ['f', '\\text{rank} + \\text{nullity} = \\text{number of columns}'],
        ['note', 'Rank = number of pivots = independent equations. Nullity = free variables = dimensions of the solution space.']
      ] }
    ],
    f: ['rank + nullity = #columns', 'row-reduce then back-substitute'],
    tips: ['Eliminate down the columns, then solve from the bottom up.']
  });

  L('lin.eigen', {
    hook: 'Eigenvectors are the directions a transformation leaves unchanged. Google&rsquo;s PageRank, PCA, and vibrations all run on them.',
    s: [
      { h: 'The definition', b: [
        ['f', 'A v = \\lambda v'],
        ['p', 'The matrix A scales the special vector v by the number &lambda; without rotating it.'],
        ['p', 'Find &lambda; from the characteristic equation:'],
        ['f', '\\det(A - \\lambda I) = 0']
      ] },
      { h: 'Triangular shortcut', b: [
        ['p', 'If the matrix is triangular (zeros below or above the diagonal), the eigenvalues are simply the diagonal entries.'],
        ['ex', { q: 'Eigenvalues of [[4, 2],[0, 3]]', steps: ['Triangular &rarr; eigenvalues on the diagonal', '4 and 3'], a: '4 and 3' }]
      ] }
    ],
    f: ['Av = &lambda;v', 'det(A &minus; &lambda;I) = 0', 'trace = &sum;&lambda;, det = &prod;&lambda;'],
    tips: ['Check: the eigenvalues should sum to the trace and multiply to the determinant.']
  });

  L('lin.independence', {
    hook: 'Independent vectors each add a new dimension. Dependent ones are redundant — the key to compressing data.',
    s: [
      { h: 'The test', b: [
        ['p', 'Vectors are linearly <b>independent</b> if the only way to get zero is the trivial way:'],
        ['f', 'c_1 v_1 + c_2 v_2 = 0 \\Rightarrow c_1 = c_2 = 0'],
        ['ex', { q: 'Are (1,2) and (2,4) independent?', steps: ['(2,4) = 2&times;(1,2)', 'One is a multiple of the other &rarr; dependent'], a: 'no' }]
      ] },
      { h: 'Span and basis', b: [
        ['list', ['<b>Span</b> = every vector reachable by combining them.', 'A <b>basis</b> is a set that is both independent and spanning.', 'In 2D you need exactly 2 independent vectors for a basis.']],
        ['note', 'Dependent columns are exactly why a matrix has a zero determinant.']
      ] }
    ],
    f: ['independent &hArr; no vector is a combo of the others', 'det &ne; 0 &hArr; columns independent'],
    tips: ['Check whether one vector is a scalar multiple (or combination) of the others.']
  });

  /* ---------------- PROBABILITY & STATISTICS ---------------- */

  L('prb.basic', {
    hook: 'Probability is the mathematics of uncertainty — and in CS, uncertainty is everywhere: hashing, retries, sampling, ML.',
    s: [
      { h: 'Counting favourable outcomes', b: [
        ['f', 'P(E) = \\frac{\\text{favourable}}{\\text{total}}'],
        ['p', 'P is always between 0 (impossible) and 1 (certain). As a percent, multiply by 100.'],
        ['ex', { q: 'P(rolling a 4 on a fair die)?', steps: ['One favourable side out of 6', '1/6 &asymp; 0.167'], a: '1/6' }]
      ] },
      { h: 'The complement', b: [
        ['f', 'P(\\text{not } E) = 1 - P(E)'],
        ['note', '"At least one" problems are almost always easier as 1 &minus; P(none).']
      ] }
    ],
    f: ['P = favourable/total', 'P(not E) = 1 &minus; P(E)'],
    tips: ['When a problem says "at least one", flip to the complement.']
  });

  L('prb.union', {
    hook: 'Combining events correctly avoids double-counting — the same logic as the set union rule.',
    viz: 'venn',
    s: [
      { h: 'Union and intersection', b: [
        ['f', 'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)'],
        ['f', 'P(A \\cap B) = P(A)P(B) \\quad \\text{(if independent)}'],
        ['ex', { q: 'P(A)=0.5, P(B)=0.4, P(A&cap;B)=0.1. Find P(A&cup;B).', steps: ['0.5 + 0.4 &minus; 0.1', '= 0.8'], a: '0.8' }]
      ] },
      { h: 'Independence', b: [
        ['p', 'Independent means one happening does not change the chance of the other. Then you simply multiply.'],
        ['warn', 'Mutually exclusive (cannot both happen) is <i>not</i> the same as independent.']
      ] }
    ],
    f: ['P(A&cup;B) = P(A)+P(B)&minus;P(A&cap;B)', 'independent &rarr; multiply'],
    tips: ['Ask whether the events can co-occur before using the union formula.']
  });

  L('prb.conditional', {
    hook: 'Conditional probability updates beliefs with evidence — the engine behind spam filters, medical tests, and Bayes.',
    s: [
      { h: 'Conditioning', b: [
        ['f', 'P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}'],
        ['p', 'means "the probability of A, given that we already know B happened" — so the world shrinks to B.'],
        ['ex', { q: 'P(A&cap;B)=0.2, P(B)=0.5. Find P(A|B).', steps: ['0.2 / 0.5', '= 0.4'], a: '0.4' }]
      ] },
      { h: 'Bayes&rsquo; theorem', b: [
        ['f', 'P(A \\mid B) = \\frac{P(B \\mid A)\\,P(A)}{P(B)}'],
        ['note', 'The base rate P(A) matters enormously. A 99% accurate test for a rare disease can still yield mostly false positives — the famous base-rate trap.']
      ] }
    ],
    f: ['P(A|B) = P(A&cap;B)/P(B)', 'Bayes: P(A|B) = P(B|A)P(A)/P(B)'],
    tips: ['Draw a tree of percentages when a Bayes problem feels tangled.']
  });

  L('prb.counting', {
    hook: 'Counting probability combines "how many total" with "how many favourable" — both are combinatorics problems.',
    s: [
      { h: 'Without replacement', b: [
        ['p', 'When you draw and do not put back, pairs are unordered, so use combinations for both the favourable count and the total.'],
        ['ex', { q: 'Bag with 5 red, 3 blue. P(both red drawing 2)?', steps: ['Total pairs C(8,2) = 28', 'Favourable C(5,2) = 10', '10/28 &asymp; 0.357'], a: '0.357' }]
      ] },
      { h: 'With replacement', b: [
        ['p', 'If you replace, draws are independent, so probabilities multiply directly — no combinations needed.']
      ] }
    ],
    f: ['without replacement &rarr; combinations', 'with replacement &rarr; multiply'],
    tips: ['Say "replacement or not?" before choosing your method.']
  });

  L('prb.expected', {
    hook: 'Expected value is the long-run average — the number you would bet on if you played forever.',
    s: [
      { h: 'Weighted average', b: [
        ['f', 'E[X] = \\sum x \\cdot P(x)'],
        ['ex', { q: 'Payoff 10 with P=0.2, payoff 0 with P=0.8', steps: ['10(0.2) + 0(0.8)', '= 2'], a: '2' }]
      ] },
      { h: 'Linearity', b: [
        ['f', 'E[X + Y] = E[X] + E[Y]'],
        ['note', 'This holds even when X and Y are dependent — a surprisingly powerful fact used everywhere in analysis.']
      ] }
    ],
    f: ['E[X] = &sum;x&middot;P(x)', 'E[X+Y] = E[X] + E[Y]'],
    tips: ['For a fair die, E = (1+n)/2 without any table.']
  });

  L('prb.variance', {
    hook: 'Variance measures spread — two systems can share a mean but be wildly different in reliability.',
    s: [
      { h: 'Spread around the mean', b: [
        ['f', '\\sigma^2 = \\frac{\\sum (x - \\mu)^2}{n}'],
        ['p', 'Square the deviations so plus and minus do not cancel, average them, then take the square root for the standard deviation.'],
        ['ex', { q: 'Variance of {2, 4, 6} (population)', steps: ['mean = 4', 'deviations &minus;2, 0, 2 &rarr; squares 4, 0, 4', 'sum 8 / 3 &asymp; 2.67'], a: '2.67' }]
      ] },
      { h: 'Sample vs population', b: [
        ['note', 'For a <b>sample</b>, divide by n&minus;1 (Bessel&rsquo;s correction) so it estimates the population spread without bias.']
      ] }
    ],
    f: ['Var = E[X&sup2;] &minus; (E[X])&sup2;', 'SD = &radic;Var', 'sample: divide by n&minus;1'],
    tips: ['Standard deviation is in the same units as the data, so report it, not the variance.']
  });

  L('prb.binomial', {
    hook: 'The binomial distribution counts successes in repeated yes/no trials — error rates, A/B tests, packet drops.',
    s: [
      { h: 'The formula', b: [
        ['f', 'P(X = k) = C(n,k)\\, p^k (1-p)^{n-k}'],
        ['list', ['Choose which k of the n trials succeed (C(n,k)).', 'Multiply the success probability k times.', 'Multiply the failure probability n&minus;k times.']],
        ['ex', { q: 'n=3, p=0.5, P(X=2)', steps: ['C(3,2) = 3', '3 &times; 0.5&sup2; &times; 0.5 = 0.375'], a: '0.375' }]
      ] },
      { h: 'Mean and spread', b: [
        ['f', '\\mu = np \\qquad \\sigma^2 = np(1-p)']
      ] }
    ],
    f: ['P(X=k) = C(n,k)p&#8342;(1&minus;p)^{n&minus;k}', 'mean = np'],
    tips: ['Each factor has a job: choose, succeed, fail.']
  });

  L('prb.normal', {
    hook: 'The bell curve appears whenever many small random effects add up — heights, errors, measurement noise.',
    viz: 'normalcurve',
    s: [
      { h: 'Standardising with z', b: [
        ['f', 'z = \\frac{x - \\mu}{\\sigma}'],
        ['p', 'A z-score says "how many standard deviations from the mean". z = 2 means two SDs above average.'],
        ['ex', { q: '&mu;=70, &sigma;=10, x=85. Find z.', steps: ['(85 &minus; 70)/10', '= 1.5'], a: '1.5' }]
      ] },
      { h: 'The empirical rule', b: [
        ['list', ['~68% of data lies within &plusmn;1&sigma;.', '~95% within &plusmn;2&sigma;.', '~99.7% within &plusmn;3&sigma;.']],
        ['note', 'Scores beyond &plusmn;3&sigma; are rare — that is why anomaly detection often uses this threshold.']
      ] }
    ],
    f: ['z = (x &minus; &mu;)/&sigma;', '68 / 95 / 99.7 rule'],
    tips: ['Convert to a z-score first; then all normal problems look the same.']
  });
})(window.MH);
