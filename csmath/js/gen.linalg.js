/* ============================================================
   CSMath Hero - gen.linalg.js
   Realm: Linear Algebra
   ============================================================ */
(function (MH) {
  'use strict';
  var def = MH.def;

  /* ---- Vector operations ---- */
  def('lin.vectorops', function (r, lvl) {
    var mode = r.pick(['add', 'mag', 'scale', 'sub']);
    var u = [r.int(-9, 9), r.int(-9, 9)], v = [r.int(-9, 9), r.int(-9, 9)];
    if (mode === 'add') { var w = [u[0] + v[0], u[1] + v[1]]; var i = r.int(0, 1);
      return { prompt: 'u = (' + u[0] + ', ' + u[1] + '), v = (' + v[0] + ', ' + v[1] + '). What is component ' + (i + 1) + ' of u + v?',
        answer: { type: 'number', value: w[i] }, hint: 'Add vectors componentwise.', steps: ['u + v = (' + w[0] + ', ' + w[1] + ')'] }; }
    if (mode === 'sub') { var w2 = [u[0] - v[0], u[1] - v[1]]; var i2 = r.int(0, 1);
      return { prompt: 'u = (' + u[0] + ', ' + u[1] + '), v = (' + v[0] + ', ' + v[1] + '). What is component ' + (i2 + 1) + ' of u &minus; v?',
        answer: { type: 'number', value: w2[i2] }, hint: 'Subtract componentwise.', steps: ['u &minus; v = (' + w2[0] + ', ' + w2[1] + ')'] }; }
    if (mode === 'scale') { var k = r.nonzero(-5, 5); var s = r.int(0, 1);
      return { prompt: 'u = (' + u[0] + ', ' + u[1] + '). What is component ' + (s + 1) + ' of ' + k + 'u?',
        answer: { type: 'number', value: k * u[s] }, hint: 'Scale each component by ' + k + '.', steps: [k + 'u = (' + k * u[0] + ', ' + k * u[1] + ')'] }; }
    var mag = Math.sqrt(u[0] * u[0] + u[1] * u[1]);
    return { prompt: 'What is the magnitude |u| of u = (' + u[0] + ', ' + u[1] + ')? (2 dp)',
      answer: { type: 'number', value: mag, tol: 0.01 }, hint: '|u| = &radic;(x&sup2; + y&sup2;).',
      steps: ['&radic;(' + u[0] * u[0] + ' + ' + u[1] * u[1] + ') = &radic;' + (u[0] * u[0] + u[1] * u[1]) + ' &asymp; ' + MH.nice(mag, 2)] };
  });

  /* ---- Dot product & angle ---- */
  def('lin.dotangle', function (r, lvl) {
    var mode = r.pick(['dot', 'perp', 'angle']);
    var u = [r.int(-6, 6), r.int(-6, 6)], v = [r.int(-6, 6), r.int(-6, 6)];
    if (u[0] === 0 && u[1] === 0) u[0] = 1;
    var dot = u[0] * v[0] + u[1] * v[1];
    if (mode === 'dot') return { prompt: 'u = (' + u[0] + ', ' + u[1] + '), v = (' + v[0] + ', ' + v[1] + '). Find u·v.',
      answer: { type: 'number', value: dot }, hint: 'Multiply matching components and add.',
      steps: [u[0] + '·' + v[0] + ' + ' + u[1] + '·' + v[1] + ' = ' + dot] };
    if (mode === 'perp') {
      var wantYes = r.chance(0.5);
      if (wantYes) v = [u[1], -u[0]];
      else { var guard = 0; do { v = [r.int(-6, 6), r.int(-6, 6)]; guard++; } while (u[0] * v[0] + u[1] * v[1] === 0 && guard < 30); }
      dot = u[0] * v[0] + u[1] * v[1];
      var yes = dot === 0;
      return { prompt: 'u = (' + u[0] + ', ' + u[1] + '), v = (' + v[0] + ', ' + v[1] + '). Are u and v perpendicular?',
        answer: { type: 'choice', value: yes ? 0 : 1, choices: ['yes', 'no'], display: yes ? 'yes' : 'no' },
        hint: 'Perpendicular &hArr; u·v = 0.', steps: ['u·v = ' + dot + ' &rarr; ' + (yes ? 'perpendicular' : 'not perpendicular')] };
    }
    // make a clean 3-4-5 style angle
    var au = Math.sqrt(u[0] * u[0] + u[1] * u[1]), av = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    var cosT = dot / (au * av);
    cosT = MH.clamp(cosT, -1, 1);
    var ang = MH.nice(MH.rad2deg(Math.acos(cosT)), 1);
    return { prompt: 'u = (' + u[0] + ', ' + u[1] + '), v = (' + v[0] + ', ' + v[1] + '). Find the angle between them in degrees (1 dp).',
      answer: { type: 'number', value: ang, tol: 0.3 }, hint: 'cos&theta; = u·v/(|u||v|).',
      steps: ['u·v = ' + dot, '|u| = ' + MH.nice(au, 3) + ', |v| = ' + MH.nice(av, 3), 'cos&theta; = ' + MH.nice(cosT, 4) + ' &rarr; &theta; &asymp; ' + ang + '&deg;'] };
  });

  /* ---- Matrix multiplication ---- */
  def('lin.matmul', function (r, lvl) {
    var A = [[r.int(-5, 5), r.int(-5, 5)], [r.int(-5, 5), r.int(-5, 5)]];
    var B = [[r.int(-5, 5), r.int(-5, 5)], [r.int(-5, 5), r.int(-5, 5)]];
    var C = [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
             [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
    var i = r.int(0, 1), j = r.int(0, 1);
    var mrow = ['[' + A[0].join(' ') + ']', '[' + A[1].join(' ') + ']'];
    var mrowB = ['[' + B[0].join(' ') + ']', '[' + B[1].join(' ') + ']'];
    return { prompt: 'A = ' + mrow[0] + mrow[1] + ', B = ' + mrowB[0] + mrowB[1] + '. What is entry (' + (i + 1) + ',' + (j + 1) + ') of AB (row ' + (i + 1) + ' of A · column ' + (j + 1) + ' of B)?',
      answer: { type: 'number', value: C[i][j] },
      hint: '(AB)&#8305;ⱼ = (row i of A)·(column j of B).',
      steps: ['column ' + (j + 1) + ' of B = (' + B[0][j] + ', ' + B[1][j] + ')',
        A[i][0] + '·' + B[0][j] + ' + ' + A[i][1] + '·' + B[1][j] + ' = ' + C[i][j]] };
  });

  /* ---- Determinants ---- */
  def('lin.determinant', function (r, lvl) {
    if (lvl >= 6 && r.chance(0.4)) {
      var m = [[r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)], [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)], [r.int(-4, 4), r.int(-4, 4), r.int(-4, 4)]];
      var det = m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) - m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
      return { prompt: 'Find the determinant of [' + m[0].join(' ') + '; ' + m[1].join(' ') + '; ' + m[2].join(' ') + '].',
        answer: { type: 'number', value: det }, hint: 'Expand along the first row with alternating signs.',
        steps: ['det = ' + m[0][0] + '(' + (m[1][1] * m[2][2] - m[1][2] * m[2][1]) + ') &minus; ' + m[0][1] + '(' + (m[1][0] * m[2][2] - m[1][2] * m[2][0]) + ') + ' + m[0][2] + '(' + (m[1][0] * m[2][1] - m[1][1] * m[2][0]) + ')',
          'det = ' + det] };
    }
    var a = r.int(-9, 9), b = r.int(-9, 9), c = r.int(-9, 9), d = r.int(-9, 9);
    return { prompt: 'Find the determinant of [' + a + ' ' + b + '; ' + c + ' ' + d + '].',
      answer: { type: 'number', value: a * d - b * c }, hint: '2&times;2 determinant = ad &minus; bc.',
      steps: ['(' + a + ')(' + d + ') &minus; (' + b + ')(' + c + ') = ' + (a * d) + ' &minus; ' + (b * c) + ' = ' + (a * d - b * c)] };
  });

  /* ---- Rank & nullity ---- */
  def('lin.solve', function (r, lvl) {
    var vars = r.int(3, 5), rank = r.int(1, Math.min(3, vars));
    if (r.chance(0.5)) {
      return { prompt: 'A 3&times;' + vars + ' matrix has rank ' + rank + '. What is its nullity? (Rank&ndash;Nullity theorem)',
        answer: { type: 'number', value: vars - rank }, hint: 'nullity = number of columns &minus; rank.',
        steps: [vars + ' &minus; ' + rank + ' = ' + (vars - rank)] };
    }
    var x = r.nonzero(-6, 6), y = r.nonzero(-6, 6);
    var a1 = r.nonzero(-4, 5), b1 = r.nonzero(-4, 5), a2 = r.nonzero(-4, 5), b2 = r.nonzero(-4, 5);
    if (a1 * b2 - a2 * b1 === 0) return null;
    var c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y;
    return { prompt: 'Solve by elimination:<br>' + a1 + 'x + ' + b1 + 'y = ' + c1 + '<br>' + a2 + 'x + ' + b2 + 'y = ' + c2 + '<br>Give x.',
      answer: { type: 'number', value: x },
      hint: 'Row-reduce (Gaussian elimination) then back-substitute.',
      steps: ['Multiply to match x-coefficients, subtract to eliminate x.',
        'Solve for y, then back-substitute: x = ' + x + ', y = ' + y] };
  });

  /* ---- Eigenvalues ---- */
  def('lin.eigen', function (r, lvl) {
    var l1 = r.nonzero(-6, 6), l2 = r.nonzero(-6, 6);
    var ask = r.pick(['larger', 'smaller', 'trace']);
    if (ask === 'trace') return { prompt: 'A 2&times;2 matrix has eigenvalues ' + l1 + ' and ' + l2 + '. What is its trace (sum of the diagonal)?',
      answer: { type: 'number', value: l1 + l2 }, hint: 'Trace = sum of eigenvalues = a + d.',
      steps: ['trace = ' + l1 + ' + ' + l2 + ' = ' + (l1 + l2)] };
    // half the time: a general matrix with those eigenvalues (b = ±1 keeps every entry an integer)
    if (r.chance(0.5)) {
      var tr = l1 + l2, det = l1 * l2;
      var a0 = r.int(-3, 3), b0 = r.chance(0.5) ? 1 : -1;
      var d0 = tr - a0;
      var c0 = (a0 * d0 - det) / b0;
      if (Math.abs(c0) <= 40) {
        var lo0 = Math.min(l1, l2), hi0 = Math.max(l1, l2);
        return { prompt: 'Find the ' + ask + ' eigenvalue of [' + a0 + ' ' + b0 + '; ' + c0 + ' ' + d0 + '].',
          answer: { type: 'number', value: ask === 'larger' ? hi0 : lo0 },
          hint: 'Solve det(A &minus; &lambda;I) = 0, i.e. &lambda;&sup2; &minus; (trace)&lambda; + det = 0.',
          steps: ['trace = ' + (a0 + d0) + ', det = ' + (a0 * d0 - b0 * c0),
            '&lambda;&sup2; &minus; ' + (a0 + d0) + '&lambda; + ' + (a0 * d0 - b0 * c0) + ' = (&lambda; &minus; ' + l1 + ')(&lambda; &minus; ' + l2 + ')',
            'Eigenvalues: ' + lo0 + ' and ' + hi0] };
      }
    }
    return eigenTriangular(r, l1, l2, ask);
  });

  function eigenTriangular(r, l1, l2, ask) {
    var b = r.chance(0.5) ? r.nonzero(-5, 5) : 0;
    var a = l1, d = l2, c = 0;
    var lo = Math.min(l1, l2), hi = Math.max(l1, l2);
    return { prompt: 'Find the ' + ask + ' eigenvalue of [' + a + ' ' + b + '; ' + c + ' ' + d + ']. (Hint: it is triangular.)',
      answer: { type: 'number', value: ask === 'larger' ? hi : lo },
      hint: 'The eigenvalues of a triangular matrix are its diagonal entries. Otherwise solve det(A &minus; &lambda;I) = 0.',
      steps: ['Solve &lambda;&sup2; &minus; (trace)&lambda; + det = 0', 'trace = ' + (a + d) + ', det = ' + (a * d - b * c),
        'Eigenvalues: ' + lo + ' and ' + hi] };
  }

  /* ---- Span & independence ---- */
  def('lin.independence', function (r, lvl) {
    var dependent = r.chance(0.5);
    var v1 = [r.int(-6, 6), r.int(-6, 6), r.int(-6, 6)];
    if (v1[0] === 0 && v1[1] === 0 && v1[2] === 0) v1[0] = 1;
    var k = r.nonzero(-4, 4);
    var v2;
    if (dependent) v2 = [k * v1[0], k * v1[1], k * v1[2]];
    else { v2 = [r.int(-6, 6), r.int(-6, 6), r.int(-6, 6)]; if (v2[0] * v1[1] - v2[1] * v1[0] === 0) v2[1] += 1; }
    return { prompt: 'Are v&#8321; = (' + v1.join(', ') + ') and v&#8322; = (' + v2.join(', ') + ') linearly independent?',
      answer: { type: 'choice', value: dependent ? 1 : 0, choices: ['yes', 'no'], display: dependent ? 'no' : 'yes' },
      hint: 'They are independent iff the only c&#8321;v&#8321; + c&#8322;v&#8322; = 0 is c&#8321; = c&#8322; = 0 (i.e. one is not a multiple of the other).',
      steps: [dependent ? 'v&#8322; = ' + k + '·v&#8321;, so they are dependent.' : 'Neither vector is a multiple of the other, so they are independent.'] };
  });
})(window.MH);
