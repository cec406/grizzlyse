/* ============================================================
   CSMath Hero - lesson.foundations.js
   Lessons for: Foundations of Number + Pre-Algebra
   ============================================================ */
(function (MH) {
  'use strict';
  var L = MH.lesson;

  /* ---------------- FOUNDATIONS ---------------- */

  L('fnd.integers', {
    hook: 'Every array index, memory offset, and scoreboard runs on signed integers. Master the sign rules once and they never bite you again.',
    viz: 'numberline',
    s: [
      { h: 'A negative number is a direction', b: [
        ['p', 'Think of the number line as a street. Positive numbers walk right, negative numbers walk left. <b>Adding</b> a negative walks you left; <b>subtracting</b> a negative flips you around and walks you right.'],
        ['f', 'a &minus; (&minus;b) = a + b'],
        ['p', 'That single identity explains most "why did the sign change?" moments in code.'],
        ['ex', { q: '7 &minus; (&minus;3) = ?', steps: ['Subtracting a negative = adding a positive.', '7 + 3 = 10'], a: '10' }]
      ] },
      { h: 'Multiplication and division: count the negatives', b: [
        ['f', '(+)(+) = +&nbsp;&nbsp;&nbsp;(+)(&minus;) = &minus;&nbsp;&nbsp;&nbsp;(&minus;)(&minus;) = +'],
        ['p', 'Two negatives cancel. An <b>even</b> number of negative factors gives a positive result; an <b>odd</b> number gives a negative one.'],
        ['ex', { q: '(&minus;2) &times; (&minus;3) &times; (&minus;1) = ?', steps: ['Three negatives &rarr; odd &rarr; result is negative.', '2 &times; 3 &times; 1 = 6, so the answer is &minus;6'], a: '&minus;6' }]
      ] },
      { h: 'Absolute value', b: [
        ['p', '<b>|x|</b> is the distance from zero, so it is never negative: |&minus;7| = 7 and |7| = 7. In code this is <code>Math.abs()</code>.'],
        ['warn', '|a + b| is <b>not</b> usually |a| + |b|. Test a = 5, b = &minus;3.']
      ] }
    ],
    f: ['a &minus; (&minus;b) = a + b', '(&minus;a)(&minus;b) = ab', '|x| = distance from 0'],
    tips: ['When a problem feels confusing, draw the number line and walk it.']
  });

  L('fnd.order', {
    hook: 'Order of operations is the grammar of mathematics. Get it wrong and two programmers reading the same line compute different numbers.',
    s: [
      { h: 'PEMDAS, left to right', b: [
        ['list', ['<b>P</b>arentheses first', '<b>E</b>xponents (powers/roots)', '<b>M</b>ultiplication and <b>D</b>ivision, left&rarr;right', '<b>A</b>ddition and <b>S</b>ubtraction, left&rarr;right']],
        ['warn', 'Mult/div are the <i>same</i> rank and so are add/sub. Do the leftmost first: 8 &divide; 4 &times; 2 = 4, not 1.']
      ] },
      { h: 'Worked slowly', b: [
        ['ex', { q: 'Evaluate 3 + 4 &times; 2&sup2;', steps: ['Exponent: 2&sup2; = 4', 'Multiply: 4 &times; 4 = 16', 'Add: 3 + 16 = 19'], a: '19' }],
        ['ex', { q: 'Evaluate (3 + 4) &times; 2&sup2;', steps: ['Parentheses: 3 + 4 = 7', 'Exponent: 2&sup2; = 4', 'Multiply: 7 &times; 4 = 28'], a: '28' }]
      ] },
      { h: 'Why CS cares', b: [
        ['note', 'Expression trees in compilers are evaluated exactly by these rules. A parser that gets precedence wrong miscompiles every formula.']
      ] }
    ],
    f: ['P &rarr; E &rarr; MD &rarr; AS'],
    tips: ['Underline one operation at a time and cross it out as you go.']
  });

  L('fnd.factors', {
    hook: 'Prime factorisation is the DNA of a number — and GCD/LCM show up in hashing, scheduling, and simplifying fractions.',
    s: [
      { h: 'Primes are the atoms', b: [
        ['p', 'A <b>prime</b> has exactly two factors (1 and itself). Every integer &gt; 1 factors uniquely into primes:'],
        ['f', '84 = 2 &times; 2 &times; 3 &times; 7'],
        ['p', 'To factor, divide out the smallest primes repeatedly.']
      ] },
      { h: 'GCD and LCM', b: [
        ['list', ['<b>GCD</b> (greatest common divisor) = multiply the <i>shared</i> prime factors.', '<b>LCM</b> (least common multiple) = the smallest number both divide into.']],
        ['f', 'gcd(a,b) &middot; lcm(a,b) = a &middot; b'],
        ['ex', { q: 'gcd(12, 18)', steps: ['12 = 2&sup2;&middot;3', '18 = 2&middot;3&sup2;', 'Shared = 2&middot;3 = 6'], a: '6' }]
      ] },
      { h: 'The Euclidean algorithm', b: [
        ['p', 'You do not need the factors at all! Repeatedly replace the larger number with the remainder:'],
        ['f', 'gcd(a, b) = gcd(b, a mod b)'],
        ['ex', { q: 'gcd(48, 18)', steps: ['gcd(48,18) = gcd(18, 48 mod 18 = 12)', 'gcd(18,12) = gcd(12,6)', 'gcd(12,6) = gcd(6,0) = 6'], a: '6' }],
        ['note', 'This runs in O(log n) and powers modular inverses in cryptography.']
      ] }
    ],
    f: ['lcm(a,b) = ab / gcd(a,b)', 'gcd(a,b) = gcd(b, a mod b)'],
    tips: ['Practise factoring numbers 2&ndash;100 until you can do it instantly.']
  });

  L('fnd.fractions', {
    hook: 'Fractions are exact. Floating point is not. Knowing both is why some CS grads avoid billion-dollar rounding bugs.',
    viz: 'fractionbar',
    s: [
      { h: 'Common denominator', b: [
        ['p', 'To add or subtract, rewrite both fractions with the same denominator, then combine the tops.'],
        ['f', '\\frac{a}{b} + \\frac{c}{d} = \\frac{ad + bc}{bd}'],
        ['ex', { q: '1/3 + 1/4', steps: ['Common denominator 12.', '1/3 = 4/12 and 1/4 = 3/12.', '4/12 + 3/12 = 7/12'], a: '7/12' }]
      ] },
      { h: 'Multiply and divide', b: [
        ['f', '\\frac{a}{b} \\times \\frac{c}{d} = \\frac{ac}{bd}'],
        ['f', '\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}'],
        ['note', 'Dividing is multiplying by the reciprocal — "flip and multiply".']
      ] },
      { h: 'Always simplify', b: [
        ['p', 'Divide the top and bottom by their GCD. 6/8 &rarr; divide by 2 &rarr; 3/4.']
      ] }
    ],
    f: ['simplify by gcd(top, bottom)', 'add &rarr; common denominator', 'divide &rarr; multiply by reciprocal'],
    tips: ['Keep answers as exact fractions unless the question asks for a decimal.']
  });

  L('fnd.decimals', {
    hook: 'Percent, decimal, and fraction are three views of the same number. Flipping between them is a daily CS task (rates, weights, probabilities).',
    viz: 'fractionbar',
    s: [
      { h: 'One number, three outfits', b: [
        ['table', { head: ['Fraction', 'Decimal', 'Percent'], rows: [['1/2', '0.5', '50%'], ['1/4', '0.25', '25%'], ['3/5', '0.6', '60%'], ['1/8', '0.125', '12.5%']] }],
        ['p', '<b>Percent</b> literally means "per hundred". 37% = 37/100 = 0.37.']
      ] },
      { h: 'Conversions', b: [
        ['list', ['Fraction &rarr; decimal: divide the top by the bottom.', 'Decimal &rarr; percent: multiply by 100.', 'Percent &rarr; decimal: divide by 100.']],
        ['ex', { q: 'Write 5/8 as a percent', steps: ['5 &divide; 8 = 0.625', '0.625 &times; 100 = 62.5'], a: '62.5%' }]
      ] }
    ],
    f: ['decimal = numerator &divide; denominator', 'percent = decimal &times; 100'],
    tips: ['Memorise the eighths and sixteenths — they appear constantly.']
  });

  L('fnd.percent', {
    hook: 'Every "20% off", "growth rate", and "learning rate" is the same two formulas.',
    s: [
      { h: 'Percent "of" a number', b: [
        ['f', 'part = rate &times; whole'],
        ['ex', { q: 'What is 15% of 80?', steps: ['15% = 0.15', '0.15 &times; 80 = 12'], a: '12' }]
      ] },
      { h: 'Percent change', b: [
        ['f', '\\text{change} = \\frac{new - old}{old} \\times 100\\%'],
        ['p', 'A result &gt; 0 is growth, &lt; 0 is decay. A <b>multiplier</b> does it in one step:'],
        ['f', 'new = old &times; (1 + r)'],
        ['ex', { q: 'A $50 item rises 20%', steps: ['multiplier = 1 + 0.20 = 1.20', '50 &times; 1.20 = 60'], a: '$60' }]
      ] },
      { h: 'Why multipliers matter', b: [
        ['note', 'Chaining multipliers is how compounding works: 1.05 &times; 1.05 = 1.1025, not 1.10.']
      ] }
    ],
    f: ['new = old &times; (1 + r)', 'r = (new &minus; old)/old'],
    tips: ['Translate "of" to &times; and "%" to &divide;100 and most word problems collapse.']
  });

  L('fnd.exponents', {
    hook: 'Powers are repeated multiplication, and they are where "exponential" in exponential growth comes from.',
    s: [
      { h: 'The rules come from counting factors', b: [
        ['f', 'a^m \\cdot a^n = a^{m+n}'],
        ['f', '\\frac{a^m}{a^n} = a^{m-n}'],
        ['f', '(a^m)^n = a^{mn}'],
        ['f', 'a^0 = 1 \\quad a^{-n} = \\frac{1}{a^n}'],
        ['p', 'Read a&sup3; as "three copies of a multiplied". The laws are just bookkeeping.']
      ] },
      { h: 'Roots undo powers', b: [
        ['f', '\\sqrt{a^2} = |a|'],
        ['warn', 'It is |a|, not a — because &radic; returns the non-negative root. &radic;((&minus;3)&sup2;) = 3.'],
        ['ex', { q: '2&sup3; &times; 2&sup2;', steps: ['Add the exponents: 3 + 2 = 5', '2&#8309; = 32'], a: '32' }]
      ] }
    ],
    f: ['a^m a^n = a^{m+n}', '(a^m)^n = a^{mn}', 'a^{-n} = 1/a^n'],
    tips: ['When stuck, expand the power into repeated multiplication and watch it cancel.']
  });

  L('fnd.scinot', {
    hook: 'Scientific notation is how every language and library represents huge and tiny numbers without losing track of the magnitude.',
    s: [
      { h: 'The form', b: [
        ['f', 'x \\times 10^k \\quad 1 \\le |x| < 10'],
        ['p', 'Move the decimal point so exactly one non-zero digit is in front. The exponent counts the moves — positive for big numbers, negative for small ones.'],
        ['ex', { q: 'Write 45,000 in scientific notation', steps: ['Move the point 4 places left: 4.5', 'Each move multiplies by 10, so the exponent is 4', '4.5 &times; 10&#8308;'], a: '4.5 &times; 10&#8308;' }]
      ] },
      { h: 'Multiplying and dividing', b: [
        ['list', ['Multiply &rarr; multiply the mantissas, <b>add</b> the exponents.', 'Divide &rarr; divide the mantissas, <b>subtract</b> the exponents.']],
        ['note', 'This is exactly how floating-point hardware stores numbers: a mantissa and an exponent.']
      ] }
    ],
    f: ['x &times; 10^k', 'multiply &rarr; add exponents', 'divide &rarr; subtract exponents'],
    tips: ['Count how many places you move the decimal point — that number is the exponent.']
  });

  /* ---------------- PRE-ALGEBRA ---------------- */

  L('pre.evaluate', {
    hook: 'A function is a machine: feed it a value, get a value back. Reading and evaluating expressions is how you "call" it.',
    s: [
      { h: 'Substitute, then compute', b: [
        ['p', 'Replacing a variable with a number is called <b>substituting</b>. Put the number in parentheses to keep signs safe.'],
        ['ex', { q: 'If x = &minus;4, evaluate 3x&sup2; &minus; 2x + 5', steps: ['3(&minus;4)&sup2; &minus; 2(&minus;4) + 5', '&minus;4 squared is 16 &rarr; 3&middot;16 = 48', '48 + 8 + 5 = 61'], a: '61' }],
        ['warn', '(&minus;4)&sup2; = 16 but &minus;4&sup2; = &minus;16. Parentheses matter!']
      ] },
      { h: 'Function notation', b: [
        ['p', 'f(x) = 3x&sup2; &minus; 2x + 5 means "the rule named f, applied to x". So f(&minus;4) is exactly the expression above.']
      ] }
    ],
    f: ['f(a) = substitute a for every x'],
    tips: ['Always substitute using parentheses — it prevents sign mistakes.']
  });

  L('pre.liketerms', {
    hook: 'Simplifying expressions is automatic code cleanup for algebra: fewer terms, same value.',
    s: [
      { h: 'Like terms have identical variable parts', b: [
        ['p', '3x and 5x are like terms (you can add them &rarr; 8x). 3x and 5x&sup2; are <i>not</i> — different powers.'],
        ['ex', { q: 'Simplify 4x + 7 + 2x &minus; 3', steps: ['Group x-terms: 4x + 2x = 6x', 'Group constants: 7 &minus; 3 = 4', '6x + 4'], a: '6x + 4' }]
      ] },
      { h: 'The coefficient is the count', b: [
        ['p', 'Think of x as an object. 4x + 2x means "four x\'s plus two x\'s" = six x\'s. The coefficient is just how many you have.']
      ] }
    ],
    f: ['ax + bx = (a+b)x'],
    tips: ['Rewrite the expression with boxes around like terms before combining.']
  });

  L('pre.onestep', {
    hook: 'Solving an equation is untying a knot: undo the operations in reverse, always keeping both sides equal.',
    viz: 'balance',
    s: [
      { h: 'The golden rule', b: [
        ['p', 'An equation is a balanced scale. Whatever you do to one side, do to the other.'],
        ['list', ['To undo +a, subtract a from both sides.', 'To undo &minus;a, add a to both sides.', 'To undo &times;a, divide both sides by a.', 'To undo &divide;a, multiply both sides by a.']]
      ] },
      { h: 'Inverse operations', b: [
        ['ex', { q: 'Solve x + 7 = 12', steps: ['Subtract 7 from both sides.', 'x = 12 &minus; 7 = 5'], a: 'x = 5' }],
        ['ex', { q: 'Solve 4x = 24', steps: ['Divide both sides by 4.', 'x = 6'], a: 'x = 6' }]
      ] }
    ],
    f: ['undo + with &minus;, and &times; with &divide;'],
    tips: ['Do the opposite of the operation that is "attached" to x.']
  });

  L('pre.twostep', {
    hook: 'Most real formulas are two-step. Undo them in reverse order, like taking off shoes before socks.',
    viz: 'balance',
    s: [
      { h: 'Reverse order', b: [
        ['p', 'In ax + b, the order of operations was multiply then add. To solve, reverse it: subtract b first, then divide by a.'],
        ['f', 'ax + b = c \\;\\Rightarrow\\; x = \\frac{c - b}{a}'],
        ['ex', { q: 'Solve 3x + 4 = 19', steps: ['Subtract 4: 3x = 15', 'Divide by 3: x = 5'], a: 'x = 5' }]
      ] },
      { h: 'Check your answer', b: [
        ['p', 'Substitute back: 3(5) + 4 = 19. If both sides match, you are right. This habit catches almost every slip.']
      ] }
    ],
    f: ['x = (c &minus; b)/a'],
    tips: ['Always plug your answer back into the original equation.']
  });

  L('pre.distribute', {
    hook: 'The distributive law lets you break parentheses — the algebra version of fanning out a multiplication.',
    viz: 'balance',
    s: [
      { h: 'Distribute', b: [
        ['f', 'a(b + c) = ab + ac'],
        ['p', 'Each term inside gets multiplied by the term outside.'],
        ['ex', { q: 'Solve 2(x + 3) = 14', steps: ['Distribute: 2x + 6 = 14', 'Subtract 6: 2x = 8', 'Divide by 2: x = 4'], a: 'x = 4' }]
      ] },
      { h: 'Or divide first', b: [
        ['p', 'If the outside number divides evenly, divide both sides first: 2(x+3)=14 &rarr; x+3=7 &rarr; x=4. Same answer, less work.']
      ] }
    ],
    f: ['a(b + c) = ab + ac', 'a(b &minus; c) = ab &minus; ac'],
    tips: ['Watch the sign when distributing a negative: &minus;2(x &minus; 3) = &minus;2x + 6.']
  });

  L('pre.inequality', {
    hook: 'Inequalities describe ranges — the bread and butter of bounds checks, loop conditions, and error tolerances.',
    viz: 'numberline',
    s: [
      { h: 'Solve like an equation', b: [
        ['p', 'Add, subtract, multiply, and divide both sides just as you would with "=", with one twist for negatives.'],
        ['warn', 'When you multiply or divide by a <b>negative</b> number, the inequality <b>flips</b>: &lt; becomes &gt;.'],
        ['ex', { q: 'Solve &minus;2x &lt; 8', steps: ['Divide by &minus;2 and flip the sign.', 'x &gt; &minus;4'], a: 'x &gt; &minus;4' }]
      ] },
      { h: 'Reading the symbols', b: [
        ['list', ['x &gt; 3 means all numbers greater than 3 (3 not included).', 'x &ge; 3 includes 3.', 'On a number line: &gt; is an open circle, &ge; a filled circle.']]
      ] }
    ],
    f: ['multiply/divide by a negative &rarr; flip the sign'],
    tips: ['A quick test: pick a number in your answer and check it in the original.']
  });

  L('pre.ratio', {
    hook: 'Ratios compare quantities; proportions say two ratios are equal. They scale recipes, resolutions, and map distances.',
    s: [
      { h: 'Proportions by cross-multiplying', b: [
        ['f', '\\frac{a}{b} = \\frac{c}{d} \\;\\Rightarrow\\; ad = bc'],
        ['ex', { q: 'Solve 3/4 = x/20', steps: ['Cross-multiply: 3 &times; 20 = 4 &times; x', '60 = 4x', 'x = 15'], a: 'x = 15' }]
      ] },
      { h: 'Unit rates', b: [
        ['p', 'A ratio like 60 miles / 2 hours simplifies to <b>30 miles per hour</b>. Reducing to "per 1" makes comparisons instant.']
      ] }
    ],
    f: ['a/b = c/d &rArr; ad = bc'],
    tips: ['If the units match on both sides of a proportion, the cross-multiplication is safe.']
  });

  L('pre.slope', {
    hook: 'Slope is "rise over run" — the rate of change. Every trend line, gradient, and derivative starts here.',
    viz: 'slope',
    s: [
      { h: 'Rise over run', b: [
        ['f', 'm = \\frac{y_2 - y_1}{x_2 - x_1}'],
        ['ex', { q: 'Slope through (1, 2) and (4, 11)', steps: ['&Delta;y = 11 &minus; 2 = 9', '&Delta;x = 4 &minus; 1 = 3', 'm = 9/3 = 3'], a: '3' }]
      ] },
      { h: 'What the sign means', b: [
        ['list', ['Positive slope: the line rises left-to-right.', 'Negative slope: it falls.', 'Zero slope: horizontal. Undefined slope: vertical.']]
      ] }
    ],
    f: ['m = &Delta;y / &Delta;x'],
    tips: ['Label the points as (x&#8321;, y&#8321;) and (x&#8322;, y&#8322;) so you never mix up the order.']
  });
})(window.MH);
