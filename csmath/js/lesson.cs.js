/* ============================================================
   CSMath Hero - lesson.cs.js
   Lessons for: Algorithms & Complexity + CS Foundations
   ============================================================ */
(function (MH) {
  'use strict';
  var L = MH.lesson;

  /* ---------------- ALGORITHMS & COMPLEXITY ---------------- */

  L('cs.bigo', {
    hook: 'Big-O is the calculus of computer science: it predicts how code behaves as data grows, without running it.',
    viz: 'functiongraph',
    s: [
      { h: 'Growth, not stopwatch', b: [
        ['p', 'Big-O describes how the number of operations grows with input size n. Constants and lower-order terms are dropped.'],
        ['list', ['A single loop over n &rarr; O(n).', 'Nested loops over n &rarr; O(n&sup2;).', 'Halving each step &rarr; O(log n).', 'Fixed work &rarr; O(1).']]
      ] },
      { h: 'How to read code', b: [
        ['list', ['Loops multiply when nested.', 'Sequential blocks add (n + n = 2n &rarr; O(n)).', 'Halving (n = n/2) gives log n iterations.', 'Recursion splits the work — see the Master Theorem.']],
        ['ex', { q: 'Two separate n-loops run one after the other. Big-O?', steps: ['n + n = 2n', 'Drop the constant &rarr; O(n)'], a: 'O(n)' }]
      ] }
    ],
    f: ['drop constants & lower terms', 'nested &rarr; multiply, sequential &rarr; add'],
    tips: ['Ask "if n doubles, how much more work?" — that intuition is Big-O.']
  });

  L('cs.master', {
    hook: 'The Master Theorem solves divide-and-conquer recurrences in one step — no unrolling required.',
    s: [
      { h: 'The form', b: [
        ['f', 'T(n) = aT(n/b) + f(n)'],
        ['p', 'a = how many subproblems, b = how much smaller each is, f(n) = the combine cost.']
      ] },
      { h: 'Compare the three cases', b: [
        ['list', ['If f(n) grows slower than n^{log&#8320;a}: the recursion dominates &rarr; &Theta;(n^{log&#8320;a}).', 'If they are equal: add a log &rarr; &Theta;(n^{log&#8320;a} log n).', 'If f(n) grows faster: use f(n).']],
        ['ex', { q: 'T(n) = 2T(n/2) + n', steps: ['log&#8322;2 = 1, so n^{log&#8320;a} = n', 'f(n) = n matches &rarr; add a log', '&Theta;(n log n) — merge sort!'], a: '&Theta;(n log n)' }]
      ] }
    ],
    f: ['compare f(n) with n^{log&#8320;a}'],
    tips: ['Merge sort and binary search are the two cases worth memorising.']
  });

  L('cs.bubblesort', {
    hook: 'Sorting is the canonical algorithm problem — and counting its comparisons teaches you to reason about cost.',
    viz: 'sortbars',
    s: [
      { h: 'Quadratic sorts', b: [
        ['f', '\\text{comparisons} = \\frac{n(n-1)}{2} = O(n^2)'],
        ['p', 'Bubble and insertion sort compare every pair in the worst case. For n = 1,000 that is about half a million comparisons.'],
        ['ex', { q: 'Worst-case comparisons for bubble sort with n = 10', steps: ['10(10&minus;1)/2', '= 45'], a: '45' }]
      ] },
      { h: 'The better idea', b: [
        ['p', 'Divide-and-conquer sorts (merge, quick, heap) get O(n log n) — dramatically better for large n.'],
        ['note', 'At n = 1,000,000: n&sup2; is ~10&#185;&sup2; operations; n log n is ~20,000,000. The gap is the whole game.']
      ] }
    ],
    f: ['bubble/insertion: n(n&minus;1)/2 = O(n&sup2;)', 'merge/quick average: O(n log n)'],
    tips: ['Always ask whether the input is sorted — it often unlocks a log-time solution.']
  });

  L('cs.binsearch', {
    hook: 'Binary search finds an item in a sorted list by halving the search space — the payoff of keeping data ordered.',
    s: [
      { h: 'Halving', b: [
        ['f', '\\text{steps} = \\lceil \\log_2 n \\rceil'],
        ['p', 'Each comparison throws away half the remaining elements, so a million items take only ~20 comparisons.'],
        ['ex', { q: 'Max steps for n = 1024', steps: ['log&#8322;1024 = 10', 'So 10 comparisons'], a: '10' }]
      ] },
      { h: 'The precondition', b: [
        ['warn', 'Binary search <b>requires</b> a sorted array. On unsorted data you must scan linearly, which is O(n).']
      ] }
    ],
    f: ['steps = &lceil;log&#8322;n&rceil;', 'requires sorted input'],
    tips: ['Unsorted and you need many searches? Sort once (O(n log n)) and search cheaply forever.']
  });

  L('cs.mergesort', {
    hook: 'Divide and conquer: split the problem, solve the pieces, combine the answers. The template for so much of CS.',
    s: [
      { h: 'The pattern', b: [
        ['list', ['<b>Divide</b>: split into subproblems.', '<b>Conquer</b>: solve each recursively.', '<b>Combine</b>: merge the results.']],
        ['f', 'T(n) = 2T(n/2) + n = \\Theta(n \\log n)']
      ] },
      { h: 'Why log n levels?', b: [
        ['p', 'Each level of recursion halves the size, so there are log&#8322;n levels. Each level does O(n) total work. Multiply &rarr; n log n.'],
        ['ex', { q: 'Levels of splitting for n = 64', steps: ['64 &rarr; 32 &rarr; 16 &rarr; 8 &rarr; 4 &rarr; 2 &rarr; 1', 'log&#8322;64 = 6 levels'], a: '6' }]
      ] }
    ],
    f: ['T(n)=2T(n/2)+n = &Theta;(n log n)', 'levels = log&#8322;n'],
    tips: ['Recurrences come straight from the divide/conquer/combine structure.']
  });

  L('cs.dpstates', {
    hook: 'Dynamic programming avoids recomputing overlapping subproblems — trading memory for speed.',
    s: [
      { h: 'The two ingredients', b: [
        ['list', ['<b>Optimal substructure</b>: the best answer is built from best sub-answers.', '<b>Overlapping subproblems</b>: the same subproblem recurs; cache it.']],
        ['f', '\\text{time} = \\text{number of states} \\times \\text{work per state}']
      ] },
      { h: 'Grid paths and Fibonacci', b: [
        ['p', 'On an m&times;n grid moving only right/down, paths = C(m+n&minus;2, m&minus;1). Fibonacci is the same recurrence computed bottom-up.'],
        ['ex', { q: 'Paths on a 2&times;3 grid moving right/down', steps: ['Total moves = 3, choose 1 down = C(3,1)', '= 3'], a: '3' }]
      ] }
    ],
    f: ['states &times; work per state', 'grid paths = C(m+n&minus;2, m&minus;1)'],
    tips: ['Write the recurrence first, then decide whether to memoise top-down or build bottom-up.']
  });

  L('cs.growthcompare', {
    hook: 'Knowing the growth ladder lets you pick the right algorithm in seconds.',
    viz: 'functiongraph',
    s: [
      { h: 'The ladder', b: [
        ['f', 'O(1) < O(\\log n) < O(n) < O(n \\log n) < O(n^2) < O(2^n) < O(n!)'],
        ['p', 'Memorise this order. Everything left of the arrow is "fast"; exponential and factorial are "only for tiny n".']
      ] },
      { h: 'Putting numbers to it', b: [
        ['table', { head: ['n', 'log&#8322;n', 'n log&#8322;n', 'n&sup2;', '2&#8319;'], rows: [['10', '3', '33', '100', '1,024'], ['100', '7', '664', '10,000', '~10&#179;&#8304;'], ['1,000', '10', '9,966', '10&#8310;', 'astronomical']] }],
        ['note', 'This is why NP-hard problems are solved approximately or on small instances.']
      ] }
    ],
    f: ['log n &lt; n &lt; n log n &lt; n&sup2; &lt; 2&#8319;'],
    tips: ['Compare two functions by their behaviour as n &rarr; &infin;, not at small n.']
  });

  L('cs.structures', {
    hook: 'Choosing the right data structure is choosing the right complexity before writing a line of code.',
    viz: 'graphnet',
    s: [
      { h: 'Operation costs', b: [
        ['table', { head: ['Structure', 'Search', 'Insert', 'Notes'], rows: [['Hash map', 'O(1) avg', 'O(1) avg', 'O(n) worst with collisions'], ['Balanced BST', 'O(log n)', 'O(log n)', 'keeps order'], ['Heap', 'O(n)', 'O(log n)', 'min at root'], ['Unsorted array', 'O(n)', 'O(1) append', 'cache friendly']] }]
      ] },
      { h: 'Pick by workload', b: [
        ['list', ['Need fast lookup by key? Hash map.', 'Need sorted order or range queries? Balanced BST.', 'Need the min/max repeatedly? Heap.', 'Tiny n? A plain array often wins on constants.']],
        ['note', 'Big-O ignores constants, but for small inputs constants can dominate.']
      ] }
    ],
    f: ['kind of access &rarr; kind of structure'],
    tips: ['Ask "what is my most frequent operation?" and optimise for that.']
  });

  /* ---------------- CS FOUNDATIONS ---------------- */

  L('bits.binary', {
    hook: 'Everything a computer stores is a pattern of bits. Positional base-2 is the whole story.',
    viz: 'bitboxes',
    s: [
      { h: 'Powers of two', b: [
        ['f', '1011_2 = 8 + 0 + 2 + 1 = 11'],
        ['p', 'Each position is a power of two, starting at 2&#8304; on the right: 1, 2, 4, 8, 16, 32, &hellip;'],
        ['ex', { q: 'Convert 101101&#8322; to decimal', steps: ['32 + 0 + 8 + 4 + 0 + 1', '= 45'], a: '45' }]
      ] },
      { h: 'Decimal to binary', b: [
        ['p', 'Divide by 2 repeatedly and read the remainders bottom-up — or subtract the largest powers of two that fit.'],
        ['ex', { q: 'Convert 26 to binary', steps: ['26 = 16 + 8 + 2', '&rarr; 11010&#8322;'], a: '11010' }]
      ] }
    ],
    f: ['place values: 1,2,4,8,16,&hellip;', '1 byte = 8 bits'],
    tips: ['Learn the first ten powers of two by heart.']
  });

  L('bits.hex', {
    hook: 'Hexadecimal is binary in disguise — one hex digit per four bits. That is why memory dumps and colours use it.',
    viz: 'bitboxes',
    s: [
      { h: 'Four bits per digit', b: [
        ['table', { head: ['Hex', 'Dec', 'Binary'], rows: [['A', '10', '1010'], ['B', '11', '1011'], ['F', '15', '1111'], ['10', '16', '1 0000']] }],
        ['p', 'Hex digits run 0&ndash;9 then A&ndash;F for the values 10 through 15.'],
        ['ex', { q: 'Convert 0x2F to decimal', steps: ['2 &times; 16 + 15', '= 47'], a: '47' }]
      ] },
      { h: 'Why it exists', b: [
        ['note', 'Group a long binary string into nibbles (4 bits) and each group becomes one hex digit: 11110101 = F5.']
      ] }
    ],
    f: ['1 hex digit = 4 bits', 'A=10 &hellip; F=15'],
    tips: ['Convert through binary when unsure: binary is the bridge between hex and decimal.']
  });

  L('bits.bitwise', {
    hook: 'Bitwise operators manipulate many flags at once — fast, compact, and used in every low-level system.',
    viz: 'bitboxes',
    s: [
      { h: 'The three operators', b: [
        ['list', ['<b>AND (&amp;)</b>: 1 only if both bits are 1 — used to test/mask flags.', '<b>OR (|)</b>: 1 if either bit is 1 — used to set flags.', '<b>XOR (^)</b>: 1 if the bits differ — used to toggle, and it is self-inverse.']],
        ['ex', { q: '12 XOR 10', steps: ['1100 XOR 1010', '= 0110 = 6'], a: '6' }]
      ] },
      { h: 'XOR magic', b: [
        ['f', 'x \\oplus x = 0 \\qquad x \\oplus 0 = x'],
        ['note', 'XOR is its own inverse, which is why it powers the swap trick and simple checksums.']
      ] }
    ],
    f: ['AND masks, OR sets, XOR toggles', 'x &oplus; x = 0'],
    tips: ['Write both numbers as binary, line up the columns, then apply the operator per column.']
  });

  L('bits.shift', {
    hook: 'Shifting is multiplying or dividing by powers of two at hardware speed.',
    viz: 'bitboxes',
    s: [
      { h: 'Left and right', b: [
        ['f', 'x \\ll k = x \\times 2^k'],
        ['f', 'x \\gg k = \\lfloor x / 2^k \\rfloor'],
        ['ex', { q: '13 &lt;&lt; 2', steps: ['13 &times; 2&sup2;', '= 52'], a: '52' }]
      ] },
      { h: 'Why bit shifts are used', b: [
        ['note', 'Compilers turn &times;2 and &divide;2 into shifts. They are O(1) and appear in fast hashing and graphics code.']
      ] }
    ],
    f: ['x&laquo;k = x&middot;2^k', 'x&raquo;k = &lfloor;x/2^k&rfloor;'],
    tips: ['Right shift floors — negative numbers round toward &minus;&infin;.']
  });

  L('bits.twoscomp', {
    hook: 'Two&rsquo;s complement lets one circuit add signed and unsigned numbers the same way — elegant and universal.',
    viz: 'bitboxes',
    s: [
      { h: 'Negate: flip and add one', b: [
        ['f', '-x = \\sim x + 1'],
        ['ex', { q: 'Represent &minus;5 in 8-bit two&rsquo;s complement', steps: ['5 = 0000 0101', 'invert &rarr; 1111 1010', '+1 &rarr; 1111 1011'], a: '1111 1011' }]
      ] },
      { h: 'The sign bit and ranges', b: [
        ['list', ['The leftmost bit is the sign: 0 = positive, 1 = negative.', '8-bit signed range: &minus;128 to 127.', '8-bit unsigned range: 0 to 255.']],
        ['note', 'Why is the range asymmetric? Because 0 counts as one pattern, leaving one extra negative value.']
      ] }
    ],
    f: ['&minus;x = ~x + 1', 'int8: &minus;128..127', 'uint8: 0..255'],
    tips: ['To read a set sign bit, the value is pattern &minus; 2^n.']
  });

  L('bits.boolean', {
    hook: 'Boolean algebra simplifies conditions and circuits — fewer gates, faster code.',
    s: [
      { h: 'The laws', b: [
        ['f', '\\neg(p \\land q) = \\neg p \\lor \\neg q'],
        ['f', '\\neg(p \\lor q) = \\neg p \\land \\neg q'],
        ['f', 'p \\lor (p \\land q) = p'],
        ['p', 'De Morgan pushes a negation inside and swaps AND&harr;OR. Absorption removes redundant terms.']
      ] },
      { h: 'Applied to code', b: [
        ['ex', { q: 'Simplify &not;(a &gt; 0 &and; b &gt; 0)', steps: ['De Morgan', '&rarr; a &le; 0 &or; b &le; 0'], a: 'a &le; 0 &or; b &le; 0' }],
        ['note', 'Compilers use exactly these identities to optimise your if-statements.']
      ] }
    ],
    f: ['De Morgan flips &and;&harr;&or;', 'p &or; (p &and; q) = p'],
    tips: ['When negating a condition, apply De Morgan to every term.']
  });

  L('bits.modpow', {
    hook: 'Fast modular exponentiation computes a^b mod m in O(log b) steps — the core of RSA and Diffie&ndash;Hellman.',
    s: [
      { h: 'Reduce as you go', b: [
        ['f', '(a \\cdot b) \\bmod m = ((a \\bmod m)(b \\bmod m)) \\bmod m'],
        ['p', 'Never compute the full power — it is astronomically large. Reduce at every multiplication instead.']
      ] },
      { h: 'Square and multiply', b: [
        ['list', ['Write the exponent in binary.', 'Repeatedly square the base (mod m).', 'Multiply in the powers where the binary digit is 1.']],
        ['ex', { q: '3&#8308; mod 5', steps: ['3&sup2; = 9 &equiv; 4', '3&#8308; = 4&sup2; = 16 &equiv; 1'], a: '1' }]
      ] }
    ],
    f: ['a^b mod m in O(log b)', 'square &amp; multiply'],
    tips: ['Reduce after every single multiplication to keep numbers small.']
  });

  L('bits.euclid', {
    hook: 'The oldest algorithm still in daily use finds the greatest common divisor — and modular inverses for cryptography.',
    s: [
      { h: 'Repeated remainders', b: [
        ['f', '\\gcd(a,b) = \\gcd(b, \\, a \\bmod b)'],
        ['ex', { q: 'gcd(48, 18)', steps: ['48 mod 18 = 12 &rarr; gcd(18,12)', '18 mod 12 = 6 &rarr; gcd(12,6)', '12 mod 6 = 0 &rarr; gcd = 6'], a: '6' }]
      ] },
      { h: 'Why it matters', b: [
        ['note', 'It terminates quickly (O(log n)) and, extended, computes the modular inverse — the missing ingredient in RSA.']
      ] }
    ],
    f: ['gcd(a,b) = gcd(b, a mod b)'],
    tips: ['Keep replacing the pair with (smaller, remainder) until the remainder is zero.']
  });

  L('bits.range', {
    hook: 'Knowing the exact range of an integer type is how you avoid overflow bugs — some are famously expensive.',
    viz: 'bitboxes',
    s: [
      { h: 'Counting patterns', b: [
        ['f', '\\text{unsigned } n\\text{ bits}: 2^n \\text{ values}'],
        ['f', '\\text{signed } n\\text{ bits}: -2^{n-1} \\text{ to } 2^{n-1}-1'],
        ['ex', { q: 'Largest signed 8-bit value?', steps: ['2&#8311; &minus; 1', '= 127'], a: '127' }]
      ] },
      { h: 'Overflow wraps', b: [
        ['p', 'Unsigned arithmetic is modular: max + 1 comes back to 0. Signed overflow is undefined behaviour in C, so never rely on it.'],
        ['warn', 'The Ariane 5 rocket was destroyed by an integer overflow in a 64-bit-to-16-bit conversion.']
      ] }
    ],
    f: ['unsigned: 0 .. 2&#8319;&minus;1', 'signed: &minus;2^{n&minus;1} .. 2^{n&minus;1}&minus;1'],
    tips: ['Memorise the int8/int16/int32/int64 ranges — you will debug against them eventually.']
  });
})(window.MH);
