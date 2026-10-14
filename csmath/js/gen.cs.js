/* ============================================================
   CSMath Hero - gen.cs.js
   Realm: CS Foundations (binary, bits, boolean, crypto)
   ============================================================ */
(function (MH) {
  'use strict';
  var def = MH.def;

  /* ---- Binary & decimal ---- */
  def('bits.binary', function (r, lvl) {
    if (r.chance(0.5)) {
      var n = r.int(3, 60 + lvl * 30);
      return { prompt: 'Convert ' + n + ' to binary (e.g. 1011).',
        answer: { type: 'text', value: n.toString(2) },
        hint: 'Repeatedly divide by 2 and read the remainders bottom-to-top, or sum place values 1,2,4,8,…',
        steps: [n + ' = ' + n.toString(2) + '&#8322;'] };
    }
    var bits = r.int(4, 8), s = '';
    for (var i = 0; i < bits; i++) s += r.int(0, 1);
    if (s[0] === '0') s = '1' + s.slice(1);
    return { prompt: 'Convert the binary number ' + s + '&#8322; to decimal.',
      answer: { type: 'number', value: parseInt(s, 2) },
      hint: 'Each position is a power of two: rightmost is 2&#8304;.',
      steps: ['Place values: ' + s.split('').reverse().map(function (b, i) { return b === '1' ? '2^' + i : null; }).filter(Boolean).join(' + '),
        '= ' + parseInt(s, 2)] };
  });

  /* ---- Hexadecimal ---- */
  def('bits.hex', function (r, lvl) {
    if (r.chance(0.5)) {
      var n = r.int(16, 4095);
      return { prompt: 'Convert ' + n + ' to hexadecimal (e.g. 1F).',
        answer: { type: 'text', value: n.toString(16).toUpperCase() },
        hint: 'Group binary into nibbles of 4 bits, each nibble is one hex digit (0&ndash;F).',
        steps: [n + ' = 0x' + n.toString(16).toUpperCase()] };
    }
    var v = (r.int(0, 15).toString(16) + r.int(0, 15).toString(16)).toUpperCase();
    return { prompt: 'Convert 0x' + v + ' to decimal.',
      answer: { type: 'number', value: parseInt(v, 16) },
      hint: 'Hex digits are 0&ndash;9 then A=10, B=11, C=12, D=13, E=14, F=15, weighted by 16^k.',
      steps: ['0x' + v + ' = ' + parseInt(v, 16)] };
  });

  /* ---- Bitwise operators ---- */
  def('bits.bitwise', function (r, lvl) {
    var a = r.int(0, 63), b = r.int(0, 63);
    var op = r.pick(['&', '|', '^']);
    var val = op === '&' ? (a & b) : op === '|' ? (a | b) : (a ^ b);
    return { prompt: 'Compute ' + a + ' ' + op + ' ' + b + ' (bitwise) in decimal.',
      answer: { type: 'number', value: val },
      hint: 'Line up the binary digits: AND keeps 1 only if both are 1; OR if either; XOR if they differ.',
      steps: [a + ' = ' + a.toString(2) + ', ' + b + ' = ' + b.toString(2),
        'Result = ' + val.toString(2) + '&#8322; = ' + val] };
  });

  /* ---- Shifts ---- */
  def('bits.shift', function (r, lvl) {
    var a = r.int(1, 40), k = r.int(1, 4);
    if (r.chance(0.5)) return { prompt: 'Compute ' + a + ' &lt;&lt; ' + k + ' in decimal.',
      answer: { type: 'number', value: a * Math.pow(2, k) }, hint: 'Left shift by k multiplies by 2^k.',
      steps: [a + ' × 2^' + k + ' = ' + a * Math.pow(2, k)] };
    return { prompt: 'Compute ' + a + ' &gt;&gt; ' + k + ' in decimal (integer division).',
      answer: { type: 'number', value: Math.floor(a / Math.pow(2, k)) }, hint: 'Right shift by k floors-divides by 2^k.',
      steps: ['&lfloor;' + a + ' / 2^' + k + '&rfloor; = &lfloor;' + MH.nice(a / Math.pow(2, k), 4) + '&rfloor; = ' + Math.floor(a / Math.pow(2, k))] };
  });

  /* ---- Two's complement ---- */
  def('bits.twoscomp', function (r, lvl) {
    var n = r.int(1, 127);
    if (r.chance(0.5)) {
      var u = 256 - n;
      return { prompt: 'Represent the value &minus;' + n + ' as an 8-bit two&rsquo;s complement pattern. What is that pattern as an unsigned decimal?',
        answer: { type: 'number', value: u },
        hint: 'Invert the bits of ' + n + ' and add 1 (equivalently 256 &minus; ' + n + ').',
        steps: [n + ' = ' + n.toString(2).padStart(8, '0'), 'invert: ' + (255 - n).toString(2).padStart(8, '0'), '+1 &rarr; ' + u.toString(2).padStart(8, '0') + ' = ' + u] };
    }
    var pattern = r.int(128, 255);
    return { prompt: 'The 8-bit pattern ' + pattern.toString(2).padStart(8, '0') + ' is a signed two&rsquo;s complement integer. What is its value?',
      answer: { type: 'number', value: pattern - 256 },
      hint: 'If the leading bit is 1, the value is pattern &minus; 256.',
      steps: [pattern + ' &minus; 256 = ' + (pattern - 256)] };
  });

  /* ---- Boolean algebra ---- */
  def('bits.boolean', function (r, lvl) {
    var mode = r.pick(['demorgan', 'absorb', 'distrib']);
    if (mode === 'demorgan') {
      var q = r.pick(['<br>&not;(p &and; q)', '<br>&not;(p &or; q)']);
      var correct = q.indexOf('&and;') !== -1 ? '&not;p &or; &not;q' : '&not;p &and; &not;q';
      var choices = ['&not;p &or; &not;q', '&not;p &and; &not;q', 'p &and; q', 'p &or; q'];
      return { prompt: 'Simplify using De Morgan&rsquo;s law: ' + q,
        answer: { type: 'choice', value: choices.indexOf(correct), choices: choices, display: correct },
        hint: 'Negating flips &and; &harr; &or; and distributes over the terms.',
        steps: ['De Morgan: ' + q.replace('<br>', '') + ' &equiv; ' + correct] };
    }
    if (mode === 'absorb') {
      return { prompt: 'Simplify p &or; (p &and; q) using the absorption law.',
        answer: { type: 'choice', value: 0, choices: ['p', 'q', 'p &and; q', 'true'], display: 'p' },
        hint: 'A term absorbed by a superset vanishes.', steps: ['p &or; (p &and; q) = p'] };
    }
    return { prompt: 'Simplify p &and; (p &or; q).',
      answer: { type: 'choice', value: 0, choices: ['p', 'q', 'p &or; q', 'false'], display: 'p' },
      hint: 'Anything ANDed with a superset containing it is itself.', steps: ['p &and; (p &or; q) = p'] };
  });

  /* ---- Modular exponentiation ---- */
  def('bits.modpow', function (r, lvl) {
    var a = r.int(2, 12), b = r.int(3, 30), m = r.pick([5, 7, 11, 13]);
    // compute with fast exponentiation
    function modpow(base, exp, mod) { var res = 1; base %= mod; while (exp > 0) { if (exp & 1) res = res * base % mod; base = base * base % mod; exp >>= 1; } return res; }
    var val = modpow(a, b, m);
    return { prompt: 'Compute ' + a + '^' + b + ' mod ' + m + ' (use fast exponentiation).',
      answer: { type: 'number', value: val },
      hint: 'Repeatedly square the base and halve the exponent, reducing mod ' + m + ' at every step.',
      steps: ['Repeated squaring: reduce ' + a + '^2, ' + a + '^4, ' + a + '^8, … mod ' + m + ' then combine by the binary digits of ' + b + '.',
        'Result: ' + val] };
  });

  /* ---- Euclidean algorithm ---- */
  def('bits.euclid', function (r, lvl) {
    var a = r.int(30, 200), b = r.int(30, 200);
    var hi = Math.max(a, b), lo = Math.min(a, b);
    var line = hi + ', ' + lo;
    var x = hi, y = lo, steps = [];
    while (y) { var q = Math.floor(x / y); steps.push(x + ' = ' + y + '·' + q + ' + ' + (x % y)); var t = x % y; x = y; y = t; }
    return { prompt: 'Use the Euclidean algorithm to find gcd(' + a + ', ' + b + ').',
      answer: { type: 'number', value: x },
      hint: 'gcd(a,b) = gcd(b, a mod b) until the remainder is 0.',
      steps: steps.concat(['gcd = ' + x]) };
  });

  /* ---- Integer ranges & overflow ---- */
  def('bits.range', function (r, lvl) {
    var n = r.pick([4, 8, 16]);
    var mode = r.pick(['unsigned', 'signedmax', 'signedmin', 'overflow']);
    if (mode === 'unsigned') return { prompt: 'How many distinct values can ' + n + ' bits represent (unsigned)?',
      answer: { type: 'number', value: Math.pow(2, n) }, hint: 'Values 0 .. 2^n &minus; 1 &rarr; 2^n of them.',
      steps: ['2^' + n + ' = ' + Math.pow(2, n)] };
    if (mode === 'signedmax') return { prompt: 'What is the largest value representable by a signed ' + n + '-bit two&rsquo;s complement integer?',
      answer: { type: 'number', value: Math.pow(2, n - 1) - 1 }, hint: 'Range is &minus;2^{n&minus;1} .. 2^{n&minus;1} &minus; 1.',
      steps: ['2^' + (n - 1) + ' &minus; 1 = ' + (Math.pow(2, n - 1) - 1)] };
    if (mode === 'signedmin') return { prompt: 'What is the smallest (most negative) value representable by a signed ' + n + '-bit two&rsquo;s complement integer?',
      answer: { type: 'number', value: -Math.pow(2, n - 1) }, hint: 'The low end is &minus;2^{n&minus;1}.',
      steps: ['&minus;2^' + (n - 1) + ' = ' + (-Math.pow(2, n - 1))] };
    var maxUnsigned = Math.pow(2, n) - 1;
    return { prompt: 'An unsigned ' + n + '-bit counter holds ' + maxUnsigned + ' and you add 1. What value does it hold (wrap-around)?',
      answer: { type: 'number', value: 0 }, hint: 'Overflow wraps modulo 2^n.',
      steps: ['(' + maxUnsigned + ' + 1) mod 2^' + n + ' = ' + Math.pow(2, n) + ' mod ' + Math.pow(2, n) + ' = 0'] };
  });
})(window.MH);
