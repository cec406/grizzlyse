/* ============================================================
   CSMath Hero - viz.js
   Interactive, dependency-free visual widgets used inside
   lessons. Everything is SVG/HTML so it works offline and in
   any environment (no <canvas>/getContext needed).

   Each widget is MH.viz[name](rootElement, opts) and renders
   itself into `root`, re-rendering on interaction.
   ============================================================ */
(function (MH) {
  'use strict';
  MH.viz = {};

  function controls(html) { return '<div class="viz-controls">' + html + '</div>'; }
  function range(name, min, max, val, step) {
    return '<label class="viz-ctl"><span>' + name + '</span>' +
      '<input type="range" data-v="' + name + '" min="' + min + '" max="' + max + '" step="' + (step || 1) + '" value="' + val + '"></label>';
  }
  function num(name, val, min, max) {
    return '<label class="viz-ctl"><span>' + name + '</span>' +
      '<input type="number" data-v="' + name + '" value="' + val + '"' + (min != null ? ' min="' + min + '" max="' + max + '"' : '') + '></label>';
  }
  function read(root, key) {
    var el = root.querySelector('[data-v="' + key + '"]');
    return el ? parseFloat(el.value) : 0;
  }

  /* --------------------------------------------------------- */
  /* 1. Number line - signed integer addition/subtraction       */
  /* --------------------------------------------------------- */
  MH.viz.numberline = function (root) {
    var st = { a: 3, b: -6, op: '+' };
    function draw() {
      var W = 620, H = 170, cx = W / 2, y = 100, span = 12, unit = (W - 60) / (span * 2);
      function X(n) { return cx + n * unit; }
      var ticks = '';
      for (var n = -span; n <= span; n++) {
        ticks += '<line x1="' + X(n) + '" y1="' + y + '" x2="' + X(n) + '" y2="' + (y + (n % 5 === 0 ? 12 : 6)) + '" stroke="#5b6b93" stroke-width="1"/>';
        if (n % 5 === 0 || n === 0) ticks += '<text x="' + X(n) + '" y="' + (y + 26) + '" fill="#93a1c0" font-size="11" text-anchor="middle">' + n + '</text>';
      }
      var res = st.op === '+' ? st.a + st.b : st.a - st.b;
      var end = st.op === '+' ? st.a + st.b : st.a - st.b;
      var mid = st.a + (st.op === '+' ? st.b : -st.b) / 2;
      var arcY = y - Math.min(70, 14 + Math.abs(st.b) * 5);
      var sa = X(st.a), se = X(end);
      var sweeps = end >= st.a ? 1 : 0;
      return '<div class="viz"><svg viewBox="0 0 ' + W + ' ' + H + '" class="viz-svg">' +
        '<line x1="' + X(-span) + '" y1="' + y + '" x2="' + X(span) + '" y2="' + y + '" stroke="#8ea2c8" stroke-width="2"/>' + ticks +
        '<path d="M' + sa + ' ' + (y - 12) + ' Q' + ((sa + se) / 2) + ' ' + arcY + ' ' + se + ' ' + (y - 12) + '" fill="none" stroke="#38bdf8" stroke-width="3" marker-end="url(#arw)"/>' +
        '<circle cx="' + sa + '" cy="' + (y - 12) + '" r="5" fill="#a855f7"/>' +
        '<text x="' + sa + '" y="' + (y - 20) + '" fill="#c9b3ff" font-size="13" text-anchor="middle">start ' + st.a + '</text>' +
        '<circle cx="' + se + '" cy="' + (y - 12) + '" r="5" fill="#38bdf8"/>' +
        '<text x="' + se + '" y="' + (y - 20) + '" fill="#8fd6ff" font-size="13" text-anchor="middle">' + res + '</text>' +
        '<defs><marker id="arw" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0 0 L6 3 L0 6 z" fill="#38bdf8"/></marker></defs>' +
        '<text x="20" y="26" fill="#e7ecf7" font-size="18" font-family="monospace">' +
          st.a + ' ' + st.op + ' (' + st.b + ') = ' + res + '</text>' +
        '</svg></div>' +
        controls(range('a', -10, 10, st.a) + range('b', -10, 10, st.b) +
          '<label class="viz-ctl"><span>operation</span><select data-v="op">' +
          '<option value="+"' + (st.op === '+' ? ' selected' : '') + '>add (+)</option>' +
          '<option value="-"' + (st.op === '-' ? ' selected' : '') + '>subtract (&minus;)</option></select></label>') +
        '<p class="viz-note">Subtracting a negative is the same as adding a positive: the arrow flips direction.</p>';
    }
    function render() {
      root.innerHTML = draw();
      root.querySelectorAll('[data-v]').forEach(function (el) {
        el.oninput = el.onchange = function () {
          if (el.dataset.v === 'op') st.op = el.value; else st[el.dataset.v] = parseFloat(el.value) || 0;
          render();
        };
      });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* 2. Fraction bars                                           */
  /* --------------------------------------------------------- */
  MH.viz.fractionbar = function (root) {
    var st = { n1: 1, d1: 3, n2: 1, d2: 4, op: '+' };
    function bar(n, d, color) {
      var cells = '';
      for (var i = 0; i < d; i++) {
        cells += '<div class="fcell' + (i < n ? ' on' : '') + '" style="--cc:' + color + '"></div>';
      }
      return '<div class="fbar" style="grid-template-columns:repeat(' + d + ',1fr)">' + cells + '</div>';
    }
    function render() {
      var r = MH.frac(st.op === '+' ? st.n1 * st.d2 + st.n2 * st.d1 : st.n1 * st.d2 - st.n2 * st.d1, st.d1 * st.d2);
      var val = MH.nice(r.n / r.d, 4);
      root.innerHTML =
        '<div class="viz">' +
          '<div class="frow"><span class="flabel">' + st.n1 + '/' + st.d1 + '</span>' + bar(st.n1, st.d1, '#38bdf8') + '</div>' +
          '<div class="frow"><span class="flabel">' + st.op + ' ' + st.n2 + '/' + st.d2 + '</span>' + bar(st.n2, st.d2, '#a855f7') + '</div>' +
          '<div class="fsep"></div>' +
          '<div class="frow"><span class="flabel">= ' + r.n + '/' + r.d + '</span>' + bar(Math.abs(r.n), r.d, '#34d399') + '</div>' +
          '<p class="viz-note">Common denominator = ' + st.d1 + '&times;' + st.d2 + ' = ' + (st.d1 * st.d2) +
            ' &rarr; ' + MH.nice(r.n / r.d, 4) + '</p>' +
        '</div>' +
        controls(num('n1', st.n1, 0, 12) + num('d1', st.d1, 1, 12) + num('n2', st.n2, 0, 12) + num('d2', st.d2, 1, 12) +
          '<label class="viz-ctl"><span>op</span><select data-v="op"><option value="+"' + (st.op === '+' ? ' selected' : '') + '>+</option><option value="-"' + (st.op === '-' ? ' selected' : '') + '>&minus;</option></select></label>');
      root.querySelectorAll('[data-v]').forEach(function (el) {
        el.oninput = el.onchange = function () { st[el.dataset.v] = el.value; render(); };
      });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* 3. Balance scale - solving equations                       */
  /* --------------------------------------------------------- */
  MH.viz.balance = function (root) {
    var st = { a: 3, b: 4, c: 16, step: 0 };
    function blocksHTML(side, n, cls) {
      var s = '';
      for (var i = 0; i < Math.max(0, n); i++) s += '<div class="blk ' + cls + '"></div>';
      return s;
    }
    function render() {
      var a = st.a, b = st.b, c = st.c;
      var lhsX = a, lhsC = b, rhs = c;
      var note = '';
      if (st.step >= 1) { lhsC = 0; rhs = c - b; note = 'Subtract ' + b + ' from both sides: ' + a + 'x = ' + rhs; }
      var x = st.a ? (c - st.b) / st.a : NaN;
      if (st.step >= 2) { note = 'Divide both sides by ' + a + ': x = ' + rhs + '/' + a + ' = ' + MH.nice(x, 4); }
      root.innerHTML =
        '<div class="viz"><div class="bal">' +
          '<div class="pan"><div class="pan-inner">' + blocksHTML('x', lhsX, 'xblk') + blocksHTML('1', lhsC, 'ublk') + '</div>' +
            '<small>' + a + 'x' + (lhsC ? ' + ' + lhsC : '') + (lhsC ? '' : '') + '</small></div>' +
          '<div class="post"></div>' +
          '<div class="pan right"><div class="pan-inner">' + blocksHTML('1', rhs, 'ublk') + '</div><small>' + rhs + '</small></div>' +
        '</div>' +
        '<p class="viz-note">' + (note || 'Keep the scale balanced: whatever you do to one side, do to the other.') + '</p></div>' +
        controls('<button class="btn tiny" data-act="sub">Subtract ' + b + '</button>' +
          '<button class="btn tiny" data-act="div">Divide by ' + a + '</button>' +
          '<button class="btn tiny" data-act="reset">Reset</button>' +
          num('a', st.a, 1, 6) + num('b', st.b, 0, 20) + num('c', st.c, 1, 40));
      root.querySelectorAll('[data-v]').forEach(function (el) {
        el.oninput = function () { st[el.dataset.v] = parseFloat(el.value) || 0; st.step = 0; render(); };
      });
      root.querySelectorAll('[data-act]').forEach(function (el) {
        el.onclick = function () {
          var a2 = el.dataset.act;
          if (a2 === 'sub') st.step = Math.max(st.step, 1);
          if (a2 === 'div') st.step = 2;
          if (a2 === 'reset') st.step = 0;
          render();
        };
      });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* 4. Function grapher (+ tangent line)                       */
  /* --------------------------------------------------------- */
  MH.viz.functiongraph = function (root, opts) {
    opts = opts || {};
    var presets = opts.presets || [
      { label: 'y = x', f: function (x) { return x; } },
      { label: 'y = x\u00B2', f: function (x) { return x * x; } },
      { label: 'y = x\u00B3 \u2212 3x', f: function (x) { return x * x * x - 3 * x; } },
      { label: 'y = sin(x)', f: function (x) { return Math.sin(x); } },
      { label: 'y = e^x', f: function (x) { return Math.exp(x); } },
      { label: 'y = 1/x', f: function (x) { return 1 / x; } }
    ];
    var st = { i: opts.start || 1, x0: 1, tangent: !!opts.tangent, xmin: -5, xmax: 5 };
    function render() {
      var W = 560, H = 360, pad = 34;
      var fn = presets[st.i].f;
      var ymin = -8, ymax = 8;
      function PX(x) { return pad + (x - st.xmin) / (st.xmax - st.xmin) * (W - 2 * pad); }
      function PY(y) { return H - pad - (y - ymin) / (ymax - ymin) * (H - 2 * pad); }
      var path = '', started = false;
      for (var x = st.xmin; x <= st.xmax; x += 0.04) {
        var y = fn(x);
        if (!isFinite(y) || y < ymin - 4 || y > ymax + 4) { started = false; continue; }
        path += (started ? ' L' : ' M') + PX(x).toFixed(1) + ' ' + PY(y).toFixed(1);
        started = true;
      }
      var grid = '';
      for (var gx = Math.ceil(st.xmin); gx <= st.xmax; gx++) grid += '<line x1="' + PX(gx) + '" y1="' + pad + '" x2="' + PX(gx) + '" y2="' + (H - pad) + '" stroke="rgba(255,255,255,.06)"/>';
      for (var gy = ymin; gy <= ymax; gy++) grid += '<line x1="' + pad + '" y1="' + PY(gy) + '" x2="' + (W - pad) + '" y2="' + PY(gy) + '" stroke="rgba(255,255,255,.06)"/>';
      grid += '<line x1="' + pad + '" y1="' + PY(0) + '" x2="' + (W - pad) + '" y2="' + PY(0) + '" stroke="#8ea2c8" stroke-width="1.5"/>';
      grid += '<line x1="' + PX(0) + '" y1="' + pad + '" x2="' + PX(0) + '" y2="' + (H - pad) + '" stroke="#8ea2c8" stroke-width="1.5"/>';
      var px = st.x0, py = fn(px);
      var dot = isFinite(py) ? '<circle cx="' + PX(px) + '" cy="' + PY(py) + '" r="6" fill="#38bdf8"/>' +
        '<text x="' + (PX(px) + 10) + '" y="' + (PY(py) - 10) + '" fill="#8fd6ff" font-size="13">(' + MH.nice(px, 2) + ', ' + MH.nice(py, 3) + ')</text>' : '';
      var tan = '';
      if (st.tangent && isFinite(py)) {
        var h = 0.0001, slope = (fn(px + h) - fn(px - h)) / (2 * h);
        tan = '<line x1="' + PX(px - 3) + '" y1="' + PY(py - 3 * slope) + '" x2="' + PX(px + 3) + '" y2="' + PY(py + 3 * slope) + '" stroke="#fbbf24" stroke-width="2.5"/>' +
          '<text x="12" y="20" fill="#fbbf24" font-size="13">slope &asymp; ' + MH.nice(slope, 3) + '</text>';
      }
      root.innerHTML =
        '<div class="viz"><svg viewBox="0 0 ' + W + ' ' + H + '" class="viz-svg">' + grid +
          '<path d="' + path + '" fill="none" stroke="#a855f7" stroke-width="3"/>' + tan + dot + '</svg></div>' +
        controls('<label class="viz-ctl"><span>function</span><select data-v="i">' +
            presets.map(function (p, i) { return '<option value="' + i + '"' + (i === st.i ? ' selected' : '') + '>' + p.label + '</option>'; }).join('') +
          '</select></label>' + range('x0', st.xmin, st.xmax, st.x0, 0.1) +
          (st.tangent ? '' : '')) +
        '<p class="viz-note">Drag x and watch the point slide along the curve' + (st.tangent ? '; the yellow line is the tangent whose slope is f&prime;(x).' : '.') + '</p>';
      root.querySelectorAll('[data-v]').forEach(function (el) {
        el.oninput = el.onchange = function () { if (el.dataset.v === 'i') st.i = parseInt(el.value, 10); else st.x0 = parseFloat(el.value); render(); };
      });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* 5. Unit circle                                             */
  /* --------------------------------------------------------- */
  MH.viz.unitcircle = function (root) {
    var st = { deg: 40 };
    function render() {
      var W = 380, H = 380, c = W / 2, R = 130;
      var rad = MH.deg2rad(st.deg);
      var x = Math.cos(rad), y = Math.sin(rad);
      var px = c + x * R, py = c - y * R;
      root.innerHTML =
        '<div class="viz"><svg viewBox="0 0 ' + W + ' ' + H + '" class="viz-svg">' +
          '<circle cx="' + c + '" cy="' + c + '" r="' + R + '" fill="none" stroke="#8ea2c8" stroke-width="2"/>' +
          '<line x1="' + c + '" y1="' + c + '" x2="' + (c + R) + '" y2="' + c + '" stroke="#8ea2c8"/>' +
          '<line x1="' + c + '" y1="' + c + '" x2="' + c + '" y2="' + (c - R) + '" stroke="#8ea2c8"/>' +
          '<line x1="' + c + '" y1="' + c + '" x2="' + px + '" y2="' + py + '" stroke="#38bdf8" stroke-width="3"/>' +
          '<line x1="' + px + '" y1="' + py + '" x2="' + px + '" y2="' + c + '" stroke="#34d399" stroke-width="3" stroke-dasharray="5 3"/>' +
          '<line x1="' + px + '" y1="' + c + '" x2="' + c + '" y2="' + c + '" stroke="#fbbf24" stroke-width="3" stroke-dasharray="5 3"/>' +
          '<circle cx="' + px + '" cy="' + py + '" r="6" fill="#fff"/>' +
          '<text x="' + (px + 8) + '" y="' + (py - 8) + '" fill="#fff" font-size="12">' + MH.nice(x, 3) + ', ' + MH.nice(y, 3) + '</text>' +
          '<text x="' + (c + R * 0.2) + '" y="' + (c - 6) + '" fill="#fbbf24" font-size="12">cos</text>' +
          '<text x="' + (px + 6) + '" y="' + (c - R * 0.15) + '" fill="#34d399" font-size="12">sin</text>' +
        '</svg></div>' +
        controls(range('deg', 0, 360, st.deg)) +
        '<p class="viz-note">cos&theta; = ' + MH.nice(x, 3) + ' (x), sin&theta; = ' + MH.nice(y, 3) + ' (y), &theta; = ' + st.deg + '&deg; = ' +
          MH.nice(MH.deg2rad(st.deg) / Math.PI, 3) + '&pi; rad. Note sin&sup2;+cos&sup2; = ' + MH.nice(x * x + y * y, 3) + '.</p>';
      root.querySelectorAll('[data-v]').forEach(function (el) { el.oninput = function () { st.deg = parseFloat(el.value); render(); }; });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* 6. Right triangle (SOH CAH TOA)                            */
  /* --------------------------------------------------------- */
  MH.viz.righttriangle = function (root) {
    var st = { deg: 35, hyp: 200 };
    function render() {
      var W = 420, H = 300, ox = 40, oy = H - 40;
      var rad = MH.deg2rad(st.deg);
      var adj = st.hyp * Math.cos(rad), opp = st.hyp * Math.sin(rad);
      var bx = ox + adj, by = oy - opp;
      var sin = Math.sin(rad), cos = Math.cos(rad), tan = Math.tan(rad);
      root.innerHTML =
        '<div class="viz"><svg viewBox="0 0 ' + W + ' ' + H + '" class="viz-svg">' +
          '<polygon points="' + ox + ',' + oy + ' ' + bx + ',' + oy + ' ' + bx + ',' + by + '" fill="rgba(56,189,248,.10)" stroke="#38bdf8" stroke-width="2"/>' +
          '<rect x="' + (bx - 14) + '" y="' + (oy - 14) + '" width="14" height="14" fill="none" stroke="#8ea2c8"/>' +
          '<path d="M' + (ox + 34) + ',' + oy + ' A 34 34 0 0 0 ' + (ox + 34 * Math.cos(rad)) + ',' + (oy - 34 * Math.sin(rad)) + '" fill="none" stroke="#fbbf24" stroke-width="2"/>' +
          '<text x="' + (ox + 42) + '" y="' + (oy - 12) + '" fill="#fbbf24" font-size="13">&theta;=' + st.deg + '&deg;</text>' +
          '<text x="' + ((ox + bx) / 2 - 28) + '" y="' + (oy + 20) + '" fill="#fbbf24" font-size="13">adjacent (cos)</text>' +
          '<text x="' + (bx + 6) + '" y="' + ((oy + by) / 2) + '" fill="#34d399" font-size="13">opposite (sin)</text>' +
          '<text x="' + ((ox + bx) / 2 - 34) + '" y="' + ((oy + by) / 2 - 8) + '" fill="#38bdf8" font-size="13">hypotenuse</text>' +
        '</svg></div>' +
        controls(range('deg', 5, 85, st.deg)) +
        '<div class="viz-readout">' +
          '<span>sin &theta; = opp/hyp = <b>' + MH.nice(sin, 3) + '</b></span>' +
          '<span>cos &theta; = adj/hyp = <b>' + MH.nice(cos, 3) + '</b></span>' +
          '<span>tan &theta; = opp/adj = <b>' + MH.nice(tan, 3) + '</b></span>' +
        '</div>' +
        '<p class="viz-note">SOH&ndash;CAH&ndash;TOA. sin&sup2;+cos&sup2; = ' + MH.nice(sin * sin + cos * cos, 3) + ' always.</p>';
      root.querySelectorAll('[data-v]').forEach(function (el) { el.oninput = function () { st.deg = parseFloat(el.value); render(); }; });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* 7. Bit boxes (binary / hex / two's complement)             */
  /* --------------------------------------------------------- */
  MH.viz.bitboxes = function (root, opts) {
    opts = opts || {};
    var n = opts.bits || 8;
    var st = { bits: [] };
    for (var i = 0; i < n; i++) st.bits.push(i % 3 === 0 ? 1 : 0);
    function render() {
      var val = parseInt(st.bits.join(''), 2);
      var signed = st.bits[0] ? val - Math.pow(2, n) : val;
      var boxes = st.bits.map(function (b, i) {
        var place = Math.pow(2, n - 1 - i);
        return '<button class="bitbox' + (b ? ' on' : '') + '" data-i="' + i + '">' +
          '<b>' + b + '</b><small>' + place + '</small></button>';
      }).join('');
      root.innerHTML =
        '<div class="viz"><div class="bitrow">' + boxes + '</div>' +
        '<div class="viz-readout">' +
          '<span>binary <b>' + st.bits.join('') + '</b></span>' +
          '<span>decimal <b>' + val + '</b></span>' +
          '<span>hex <b>0x' + val.toString(16).toUpperCase() + '</b></span>' +
          (n === 8 ? '<span>signed <b>' + signed + '</b></span>' : '') +
        '</div>' +
        '<p class="viz-note">Click bits to toggle. Each place is a power of two; the leftmost bit is the sign in two&rsquo;s complement.</p></div>';
      root.querySelectorAll('.bitbox').forEach(function (el) {
        el.onclick = function () { var i = +el.dataset.i; st.bits[i] = st.bits[i] ? 0 : 1; render(); };
      });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* 8. Matrix multiply (2x2)                                   */
  /* --------------------------------------------------------- */
  MH.viz.matrixmult = function (root) {
    var A = [[1, 2], [3, 4]], B = [[5, 6], [7, 8]];
    function grid(m, id) {
      return '<div class="mgrid">' + m.map(function (row, r) {
        return row.map(function (v, c) {
          return '<input class="mcell" data-m="' + id + '" data-r="' + r + '" data-c="' + c + '" type="number" value="' + v + '">';
        }).join('');
      }).join('') + '</div>';
    }
    function render() {
      var C = [[A[0][0] * B[0][0] + A[0][1] * B[1][0], A[0][0] * B[0][1] + A[0][1] * B[1][1]],
               [A[1][0] * B[0][0] + A[1][1] * B[1][0], A[1][0] * B[0][1] + A[1][1] * B[1][1]]];
      root.innerHTML =
        '<div class="viz mmul">' +
          '<div class="mm-side"><small>A</small>' + grid(A, 'A') + '</div>' +
          '<div class="mm-op">&times;</div>' +
          '<div class="mm-side"><small>B</small>' + grid(B, 'B') + '</div>' +
          '<div class="mm-op">=</div>' +
          '<div class="mm-side"><small>AB</small><div class="mgrid res">' + C.map(function (row) { return row.map(function (v) { return '<div class="mcell out">' + v + '</div>'; }).join(''); }).join('') + '</div></div>' +
        '</div>' +
        '<p class="viz-note">Entry (1,1) = row 1 of A &middot; column 1 of B = ' + A[0][0] + '&times;' + B[0][0] + ' + ' + A[0][1] + '&times;' + B[1][0] + ' = ' + C[0][0] + '. Edit any cell.</p>';
      root.querySelectorAll('.mcell[data-m]').forEach(function (el) {
        el.oninput = function () {
          var m = el.dataset.m === 'A' ? A : B;
          m[+el.dataset.r][+el.dataset.c] = parseFloat(el.value) || 0;
          var active = root.ownerDocument.activeElement === el;
          var key = el.dataset.m + el.dataset.r + el.dataset.c;
          render();
          if (active) { var again = root.querySelector('[data-m="' + el.dataset.m + '"][data-r="' + el.dataset.r + '"][data-c="' + el.dataset.c + '"]'); if (again) again.focus(); }
        };
      });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* 9. Venn / inclusion-exclusion                              */
  /* --------------------------------------------------------- */
  MH.viz.venn = function (root) {
    var st = { onlyA: 6, both: 4, onlyB: 5 };
    function render() {
      var A = st.onlyA + st.both, B = st.onlyB + st.both, U = st.onlyA + st.both + st.onlyB;
      root.innerHTML =
        '<div class="viz"><svg viewBox="0 0 420 240" class="viz-svg">' +
          '<rect x="10" y="10" width="400" height="220" rx="14" fill="none" stroke="rgba(255,255,255,.15)"/>' +
          '<circle cx="160" cy="120" r="80" fill="rgba(56,189,248,.16)" stroke="#38bdf8"/>' +
          '<circle cx="260" cy="120" r="80" fill="rgba(168,85,247,.16)" stroke="#a855f7"/>' +
          '<text x="110" y="126" fill="#8fd6ff" font-size="22" text-anchor="middle">' + st.onlyA + '</text>' +
          '<text x="210" y="126" fill="#fff" font-size="22" text-anchor="middle">' + st.both + '</text>' +
          '<text x="315" y="126" fill="#c9b3ff" font-size="22" text-anchor="middle">' + st.onlyB + '</text>' +
          '<text x="90" y="52" fill="#38bdf8" font-size="16">A</text>' +
          '<text x="330" y="52" fill="#a855f7" font-size="16">B</text>' +
        '</svg>' +
        '<div class="viz-readout">' +
          '<span>|A| = <b>' + A + '</b></span><span>|B| = <b>' + B + '</b></span>' +
          '<span>|A&cap;B| = <b>' + st.both + '</b></span><span>|A&cup;B| = <b>' + U + '</b></span>' +
        '</div>' +
        '<p class="viz-note">|A&cup;B| = |A| + |B| &minus; |A&cap;B| = ' + A + ' + ' + B + ' &minus; ' + st.both + ' = ' + U + '.</p></div>' +
        controls(num('onlyA', st.onlyA, 0, 30) + num('both', st.both, 0, 30) + num('onlyB', st.onlyB, 0, 30));
      root.querySelectorAll('[data-v]').forEach(function (el) { el.oninput = function () { st[el.dataset.v] = parseFloat(el.value) || 0; render(); }; });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* 10. Sorting bars (bubble-sort stepper)                     */
  /* --------------------------------------------------------- */
  MH.viz.sortbars = function (root) {
    var arr = [5, 2, 8, 1, 9, 3, 7, 4];
    var st = { comps: 0, i: 0, j: 0, hl: [-1, -1], done: false };
    function reset() {
      // genuinely shuffle: Fisher-Yates over 1..8, avoid the already-sorted deal
      do {
        arr = [1, 2, 3, 4, 5, 6, 7, 8];
        for (var k = arr.length - 1; k > 0; k--) {
          var m = Math.floor(Math.random() * (k + 1));
          var tmp = arr[k]; arr[k] = arr[m]; arr[m] = tmp;
        }
      } while (arr.every(function (v, i) { return v === i + 1; }));
      st = { comps: 0, i: 0, j: 0, hl: [-1, -1], done: false };
    }
    function step() {
      if (st.done) return;
      var n = arr.length;
      if (st.i >= n - 1) { st.done = true; st.hl = [-1, -1]; return; }
      if (st.j >= n - 1 - st.i) { st.i++; st.j = 0; if (st.i >= n - 1) { st.done = true; return; } }
      st.hl = [st.j, st.j + 1];
      st.comps++;
      if (arr[st.j] > arr[st.j + 1]) { var t = arr[st.j]; arr[st.j] = arr[st.j + 1]; arr[st.j + 1] = t; }
      st.j++;
    }
    function render() {
      var max = Math.max.apply(null, arr);
      var bars = arr.map(function (v, i) {
        var hl = st.hl.indexOf(i) !== -1;
        return '<div class="sbar' + (hl ? ' hl' : '') + '" style="height:' + (v / max * 100) + '%"><span>' + v + '</span></div>';
      }).join('');
      root.innerHTML =
        '<div class="viz"><div class="bars">' + bars + '</div>' +
        '<p class="viz-note">Comparisons so far: <b>' + st.comps + '</b>. Worst case for n=8 is n(n&minus;1)/2 = 28. ' +
          (st.done ? 'Sorted!' : 'Bubble sort swaps neighbours when they are out of order.') + '</p></div>' +
        controls('<button class="btn tiny" data-act="step">Next comparison</button>' +
          '<button class="btn tiny" data-act="run">Run to end</button>' +
          '<button class="btn tiny" data-act="reset">Shuffle back</button>');
      root.querySelectorAll('[data-act]').forEach(function (el) {
        el.onclick = function () {
          if (el.dataset.act === 'step') step();
          else if (el.dataset.act === 'run') { var g = 0; while (!st.done && g++ < 200) step(); }
          else reset();
          render();
        };
      });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* 11. Normal curve with z-score shading                      */
  /* --------------------------------------------------------- */
  MH.viz.normalcurve = function (root) {
    var st = { z: 1 };
    function erf(x) {
      var s = x < 0 ? -1 : 1; x = Math.abs(x);
      var a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
      var t = 1 / (1 + p * x);
      var y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
      return s * y;
    }
    function cdf(z) { return 0.5 * (1 + erf(z / Math.SQRT2)); }
    function render() {
      var W = 560, H = 260, pad = 24, y0 = H - 40, amp = 150;
      function PX(x) { return pad + (x + 4) / 8 * (W - 2 * pad); }
      function PY(y) { return y0 - y * amp; }
      var path = '', area = 'M' + PX(-4) + ' ' + y0;
      for (var x = -4; x <= 4; x += 0.05) {
        var y = Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI) * 2.5;
        path += (x === -4 ? 'M' : ' L') + PX(x).toFixed(1) + ' ' + PY(y).toFixed(1);
      }
      for (var xx = -4; xx <= st.z; xx += 0.05) {
        var yy = Math.exp(-xx * xx / 2) / Math.sqrt(2 * Math.PI) * 2.5;
        area += ' L' + PX(xx).toFixed(1) + ' ' + PY(yy).toFixed(1);
      }
      area += ' L' + PX(st.z).toFixed(1) + ' ' + y0 + ' Z';
      var pct = cdf(st.z) * 100;
      root.innerHTML =
        '<div class="viz"><svg viewBox="0 0 ' + W + ' ' + H + '" class="viz-svg">' +
          '<line x1="' + pad + '" y1="' + y0 + '" x2="' + (W - pad) + '" y2="' + y0 + '" stroke="#8ea2c8"/>' +
          '<path d="' + area + '" fill="rgba(56,189,248,.28)"/>' +
          '<path d="' + path + '" fill="none" stroke="#a855f7" stroke-width="2.5"/>' +
          '<line x1="' + PX(st.z) + '" y1="24" x2="' + PX(st.z) + '" y2="' + y0 + '" stroke="#38bdf8" stroke-dasharray="4 3"/>' +
          '<text x="' + (PX(st.z) + 6) + '" y="34" fill="#8fd6ff" font-size="13">z = ' + st.z + '</text>' +
          '<text x="' + (W / 2 - 24) + '" y="' + (y0 + 26) + '" fill="#93a1c0" font-size="11">0</text>' +
        '</svg></div>' +
        controls(range('z', -4, 4, st.z, 0.1)) +
        '<p class="viz-note">P(Z &lt; ' + st.z + ') &asymp; <b>' + MH.nice(pct, 1) + '%</b>. The empirical rule: 68% within &plusmn;1&sigma;, 95% within &plusmn;2&sigma;.</p>';
      root.querySelectorAll('[data-v]').forEach(function (el) { el.oninput = function () { st.z = parseFloat(el.value); render(); }; });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* 12. Graph networks (degree / edges / Euler)                */
  /* --------------------------------------------------------- */
  MH.viz.graphnet = function (root) {
    var presets = {
      path: { nodes: [['A', 60, 60], ['B', 170, 60], ['C', 280, 60], ['D', 390, 60]], edges: [[0, 1], [1, 2], [2, 3]] },
      cycle: { nodes: [['A', 100, 60], ['B', 300, 60], ['C', 300, 190], ['D', 100, 190]], edges: [[0, 1], [1, 2], [2, 3], [3, 0]] },
      complete: { nodes: [['A', 90, 60], ['B', 320, 60], ['C', 205, 200]], edges: [[0, 1], [1, 2], [0, 2]] }
    };
    var st = { key: 'path' };
    function render() {
      var g = presets[st.key];
      var deg = g.nodes.map(function () { return 0; });
      g.edges.forEach(function (e) { deg[e[0]]++; deg[e[1]]++; });
      var odd = deg.filter(function (d) { return d % 2 === 1; }).length;
      var lines = g.edges.map(function (e) {
        return '<line x1="' + g.nodes[e[0]][1] + '" y1="' + g.nodes[e[0]][2] + '" x2="' + g.nodes[e[1]][1] + '" y2="' + g.nodes[e[1]][2] + '" stroke="#8ea2c8" stroke-width="2.5"/>';
      }).join('');
      var nodes = g.nodes.map(function (nd, i) {
        return '<circle cx="' + nd[1] + '" cy="' + nd[2] + '" r="24" fill="#131c38" stroke="#38bdf8" stroke-width="2"/>' +
          '<text x="' + nd[1] + '" y="' + (nd[2] + 5) + '" fill="#e7ecf7" font-size="15" text-anchor="middle">' + nd[0] + '</text>' +
          '<text x="' + (nd[1] + 26) + '" y="' + (nd[2] - 14) + '" fill="#fbbf24" font-size="12">deg ' + deg[i] + '</text>';
      }).join('');
      root.innerHTML =
        '<div class="viz"><svg viewBox="0 0 420 240" class="viz-svg">' + lines + nodes + '</svg>' +
        '<div class="viz-readout">' +
          '<span>edges <b>' + g.edges.length + '</b></span>' +
          '<span>degree sum <b>' + deg.reduce(function (a, b) { return a + b; }, 0) + '</b> = 2&times;edges</span>' +
          '<span>odd-degree vertices <b>' + odd + '</b></span>' +
          '<span>Euler path <b>' + (odd === 0 || odd === 2 ? 'yes' : 'no') + '</b></span>' +
        '</div>' +
        '<p class="viz-note">Handshake lemma: the degrees always sum to twice the number of edges. An Euler path exists iff there are 0 or 2 odd-degree vertices.</p></div>' +
        controls('<label class="viz-ctl"><span>graph</span><select data-v="key">' +
          Object.keys(presets).map(function (k) { return '<option value="' + k + '"' + (k === st.key ? ' selected' : '') + '>' + k + '</option>'; }).join('') +
          '</select></label>');
      root.querySelectorAll('[data-v]').forEach(function (el) { el.onchange = function () { st.key = el.value; render(); }; });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* 13. Derivative / slope explorer (reuses graph style)        */
  /* --------------------------------------------------------- */
  MH.viz.slope = function (root) {
    var st = { x1: -2, y1: -1, x2: 3, y2: 4 };
    function render() {
      var W = 460, H = 340, pad = 30, min = -6, max = 6;
      function PX(x) { return pad + (x - min) / (max - min) * (W - 2 * pad); }
      function PY(y) { return H - pad - (y - min) / (max - min) * (H - 2 * pad); }
      var run = st.x2 - st.x1, rise = st.y2 - st.y1;
      var m = run === 0 ? NaN : rise / run;
      root.innerHTML =
        '<div class="viz"><svg viewBox="0 0 ' + W + ' ' + H + '" class="viz-svg">' +
          '<line x1="' + pad + '" y1="' + PY(0) + '" x2="' + (W - pad) + '" y2="' + PY(0) + '" stroke="#8ea2c8"/>' +
          '<line x1="' + PX(0) + '" y1="' + pad + '" x2="' + PX(0) + '" y2="' + (H - pad) + '" stroke="#8ea2c8"/>' +
          '<line x1="' + PX(st.x1) + '" y1="' + PY(st.y1) + '" x2="' + PX(st.x2) + '" y2="' + PY(st.y2) + '" stroke="#a855f7" stroke-width="3"/>' +
          '<line x1="' + PX(st.x1) + '" y1="' + PY(st.y2) + '" x2="' + PX(st.x2) + '" y2="' + PY(st.y2) + '" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4 3"/>' +
          '<line x1="' + PX(st.x1) + '" y1="' + PY(st.y1) + '" x2="' + PX(st.x1) + '" y2="' + PY(st.y2) + '" stroke="#34d399" stroke-width="2" stroke-dasharray="4 3"/>' +
          '<circle cx="' + PX(st.x1) + '" cy="' + PY(st.y1) + '" r="6" fill="#34d399"/>' +
          '<circle cx="' + PX(st.x2) + '" cy="' + PY(st.y2) + '" r="6" fill="#34d399"/>' +
          '<text x="' + ((PX(st.x1) + PX(st.x2)) / 2) + '" y="' + (PY(st.y2) - 8) + '" fill="#fbbf24" font-size="12" text-anchor="middle">run = ' + run + '</text>' +
          '<text x="' + (PX(st.x1) - 40) + '" y="' + ((PY(st.y1) + PY(st.y2)) / 2) + '" fill="#34d399" font-size="12">rise = ' + rise + '</text>' +
        '</svg>' +
        '<div class="viz-readout"><span>slope m = rise/run = <b>' + MH.nice(m, 3) + '</b></span></div>' +
        '<p class="viz-note">Slope is "rise over run". A horizontal line has slope 0; a vertical line is undefined.</p></div>' +
        controls(range('x1', min, max, st.x1) + range('y1', min, max, st.y1) + range('x2', min, max, st.x2) + range('y2', min, max, st.y2));
      root.querySelectorAll('[data-v]').forEach(function (el) { el.oninput = function () { st[el.dataset.v] = parseFloat(el.value); render(); }; });
    }
    render();
  };
})(window.MH);
