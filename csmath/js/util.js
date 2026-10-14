/* ============================================================
   CSMath Hero - util.js
   Tiny namespaced utility belt: RNG, math helpers, and a
   mini-TeX formatter so problem text stays readable in source.
   ============================================================ */
window.MH = window.MH || {};

(function (MH) {
  'use strict';

  /* ---------- RNG (mulberry32): deterministic, seedable ---------- */
  MH.makeRng = function (seed) {
    var a = (seed >>> 0) || 1;
    function r() {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    r.int = function (min, max) { return Math.floor(r() * (max - min + 1)) + min; };
    r.pick = function (arr) { return arr[Math.floor(r() * arr.length)]; };
    r.chance = function (p) { return r() < p; };
    r.sign = function () { return r.chance(0.5) ? 1 : -1; };
    r.nonzero = function (min, max) { var v; do { v = r.int(min, max); } while (v === 0); return v; };
    r.shuffle = function (arr) {
      var a2 = arr.slice();
      for (var i = a2.length - 1; i > 0; i--) {
        var j = Math.floor(r() * (i + 1));
        var t = a2[i]; a2[i] = a2[j]; a2[j] = t;
      }
      return a2;
    };
    return r;
  };

  MH.seed = function () { return (Math.random() * 4294967296) >>> 0; };

  /* ---------- numbers ---------- */
  MH.gcd = function (a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { var t = b; b = a % b; a = t; }
    return a;
  };
  MH.lcm = function (a, b) { return Math.abs(a * b) / (MH.gcd(a, b) || 1); };
  MH.isPrime = function (n) {
    if (n < 2) return false;
    for (var i = 2; i * i <= n; i++) if (n % i === 0) return false;
    return true;
  };
  MH.factorize = function (n) {
    var out = [], m = Math.abs(n);
    for (var p = 2; p * p <= m; p++) while (m % p === 0) { out.push(p); m /= p; }
    if (m > 1) out.push(m);
    return out;
  };
  MH.frac = function (n, d) {
    if (d < 0) { n = -n; d = -d; }
    var g = MH.gcd(n, d) || 1;
    return { n: n / g, d: d / g };
  };
  MH.round = function (x, dp) { var f = Math.pow(10, dp || 0); return Math.round(x * f) / f; };
  MH.nice = function (x, dp) {
    if (dp === undefined) dp = 4;
    var v = MH.round(x, dp);
    if (Object.is(v, -0)) v = 0;
    return v;
  };
  MH.deg2rad = function (d) { return d * Math.PI / 180; };
  MH.rad2deg = function (r) { return r * 180 / Math.PI; };

  /* ---------- safe expression evaluator ----------
     Parses arithmetic without eval(). Supports:
       + - * / ^   parentheses   postfix factorial !
       numbers (decimals, scientific notation)
       constants: pi, e
       functions: sqrt abs floor ceil round exp ln log log(a,b)
                  sin cos tan (degree mode by default; MH._deg=false -> radians)
                  C(n,r) P(n,r) fact(n) mod(a,b)
     Returns a finite number, or null if it cannot be evaluated.
  */
  var DEG = true;
  MH._deg = DEG;
  function setDeg(on) { DEG = !!on; MH._deg = DEG; }
  MH.setDeg = setDeg;
  function fact(n) {
    if (typeof n !== 'number' || n < 0 || n !== Math.floor(n)) return NaN;
    var v = 1; for (var i = 2; i <= n; i++) v *= i; return v;
  }
  MH.fact = fact;
  function binom(n, r) { if (n !== Math.floor(n) || r !== Math.floor(r) || n < 0 || r < 0 || r > n) return NaN; return fact(n) / (fact(r) * fact(n - r)); }
  function perm(n, r) { if (n !== Math.floor(n) || r !== Math.floor(r) || n < 0 || r < 0 || r > n) return NaN; return fact(n) / fact(n - r); }

  MH.exprEval = function (str) {
    str = String(str).trim();
    if (!str) return null;
    var s = str, pos = 0, tok = null;
    var numPat = /^[0-9]/;
    function next() {
      while (pos < s.length && /\s/.test(s[pos])) pos++;
      if (pos >= s.length) { tok = null; return; }
      var c = s[pos];
      if (numPat.test(c) || (c === '.' && /[0-9]/.test(s[pos + 1] || ''))) {
        var start = pos;
        while (pos < s.length && /[0-9.]/.test(s[pos])) pos++;
        if ((s[pos] === 'e' || s[pos] === 'E')) {
          var save = pos; pos++;
          if (s[pos] === '+' || s[pos] === '-') pos++;
          if (/[0-9]/.test(s[pos] || '')) { while (pos < s.length && /[0-9]/.test(s[pos])) pos++; }
          else pos = save;
        }
        tok = { t: 'num', v: parseFloat(s.slice(start, pos)) };
        return;
      }
      if ('+-*/^(),!'.indexOf(c) !== -1) { tok = { t: c, v: c }; pos++; return; }
      if (/[A-Za-z]/.test(c)) {
        var st = pos;
        while (pos < s.length && /[A-Za-z]/.test(s[pos])) pos++;
        tok = { t: 'id', v: s.slice(st, pos).toLowerCase() };
        return;
      }
      throw new Error('bad token');
    }
    next();
    function expect(t) { if (tok && tok.t === t) { next(); return true; } return false; }
    function fail() { throw new Error('syntax'); }
    function trig(name, x) { var rad = DEG ? MH.deg2rad(x) : x; return name === 'sin' ? Math.sin(rad) : name === 'cos' ? Math.cos(rad) : Math.tan(rad); }
    function apply(name, args) {
      switch (name) {
        case 'sqrt': return Math.sqrt(args[0]);
        case 'abs': return Math.abs(args[0]);
        case 'floor': return Math.floor(args[0]);
        case 'ceil': return Math.ceil(args[0]);
        case 'round': return Math.round(args[0]);
        case 'exp': return Math.exp(args[0]);
        case 'ln': return Math.log(args[0]);
        case 'log': return args.length > 1 ? Math.log(args[0]) / Math.log(args[1]) : Math.log10(args[0]);
        case 'sin': case 'cos': case 'tan': return trig(name, args[0]);
        case 'c': return binom(args[0], args[1]);
        case 'p': return perm(args[0], args[1]);
        case 'fact': return fact(args[0]);
        case 'mod': return ((args[0] % args[1]) + args[1]) % args[1];
        default: return NaN;
      }
    }
    function parseExpr() {
      var left = parseTerm();
      while (tok && (tok.t === '+' || tok.t === '-')) {
        var op = tok.t; next(); var right = parseTerm();
        left = op === '+' ? left + right : left - right;
      }
      return left;
    }
    function parseTerm() {
      var left = parseUnary();
      while (tok && (tok.t === '*' || tok.t === '/')) {
        var op = tok.t; next(); var right = parseUnary();
        left = op === '*' ? left * right : left / right;
      }
      return left;
    }
    function parseUnary() {
      if (tok && tok.t === '-') { next(); return -parseUnary(); }
      if (tok && tok.t === '+') { next(); return parseUnary(); }
      return parsePower();
    }
    function parsePower() {
      var base = parsePostfix();
      if (tok && tok.t === '^') { next(); return Math.pow(base, parseUnary()); }
      return base;
    }
    function parsePostfix() {
      var v = parseAtom();
      while (tok && tok.t === '!') { next(); v = fact(v); }
      return v;
    }
    function parseAtom() {
      if (!tok) fail();
      if (tok.t === '(') { next(); var v = parseExpr(); if (!expect(')')) fail(); return v; }
      if (tok.t === 'num') { var n = tok.v; next(); return n; }
      if (tok.t === 'id') {
        var name = tok.v; next();
        if (name === 'pi') return Math.PI;
        if (name === 'e') return Math.E;
        if (expect('(')) {
          var args = [parseExpr()];
          while (tok && tok.t === ',') { next(); args.push(parseExpr()); }
          if (!expect(')')) fail();
          return apply(name, args);
        }
        fail();
      }
      fail();
    }
    try {
      var result = parseExpr();
      if (tok !== null) return null;
      if (typeof result !== 'number' || !isFinite(result)) return null;
      return result;
    } catch (e) { return null; }
  };

  /* ---------- mini-TeX formatter ----------
     Supports:  \frac{a}{b}  \sqrt{x}  \abs{x}  x^{2}  x_{i}
     Symbols:   \pm \le \ge \ne \cdot \times \div \to \infty \pi
                \theta \alpha \beta \lambda \mu \sigma \Sigma \sum
                \int \Delta \in \cup \cap \subseteq \emptyset \approx
                \lfloor \rfloor \lceil \rceil \forall \exists \neg
                \land \lor \oplus \circ \ldots \to \times
     Output is HTML, so DOM text wrappers are added by the UI layer.
  */
  var SYM = {
    '\\pm': '&plusmn;', '\\mp': '&#8723;', '\\le': '&le;', '\\ge': '&ge;',
    '\\ne': '&ne;', '\\cdot': '&middot;', '\\times': '&times;', '\\div': '&divide;',
    '\\to': '&rarr;', '\\infty': '&infin;', '\\pi': '&pi;', '\\theta': '&theta;',
    '\\alpha': '&alpha;', '\\beta': '&beta;', '\\lambda': '&lambda;', '\\mu': '&mu;',
    '\\sigma': '&sigma;', '\\Sigma': '&Sigma;', '\\sum': '&sum;', '\\int': '&int;',
    '\\Delta': '&Delta;', '\\delta': '&delta;', '\\in': '&isin;', '\\notin': '&notin;',
    '\\cup': '&cup;', '\\cap': '&cap;', '\\subseteq': '&sube;', '\\emptyset': '&#8709;',
    '\\approx': '&asymp;', '\\lfloor': '&lfloor;', '\\rfloor': '&rfloor;',
    '\\lceil': '&lceil;', '\\rceil': '&rceil;', '\\forall': '&forall;',
    '\\exists': '&exist;', '\\neg': '&not;', '\\land': '&and;', '\\lor': '&or;',
    '\\oplus': '&oplus;', '\\circ': '&compfn;', '\\ldots': '&hellip;',
    '\\cdotp': '&middot;', '\\epsilon': '&epsilon;', '\\varepsilon': '&epsilon;',
    '\\phi': '&phi;', '\\times10': '&times;10', '\\degree': '&deg;', '\\angle': '&ang;',
    '\\perp': '&perp;', '\\propto': '&prop;', '\\equiv': '&equiv;', '\\partial': '&part;'
  };

  function frac(a, b) {
    return '<span class="frac"><span class="frac-n">' + a + '</span>' +
      '<span class="frac-d">' + b + '</span></span>';
  }
  function sqrt(a) { return '<span class="sqrt">&radic;<span class="rad">' + a + '</span></span>'; }
  function abs(a) { return '|<span class="abs">' + a + '</span>|'; }

  MH.m = function (s) {
    if (s == null) return '';
    s = String(s);
    if (s.indexOf('\\') === -1) return s;
    for (var guard = 0; guard < 12; guard++) {
      var before = s;
      s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, function (_, a, b) { return frac(a, b); });
      s = s.replace(/\\sqrt\{([^{}]*)\}/g, function (_, a) { return sqrt(a); });
      s = s.replace(/\\abs\{([^{}]*)\}/g, function (_, a) { return abs(a); });
      if (s === before) break;
    }
    // super / subscripts
    s = s.replace(/\^\{([^{}]*)\}/g, '<sup>$1</sup>');
    s = s.replace(/_\{([^{}]*)\}/g, '<sub>$1</sub>');
    s = s.replace(/\^(-?[A-Za-z0-9+\-])/g, '<sup>$1</sup>');
    s = s.replace(/_([A-Za-z0-9])/g, '<sub>$1</sub>');
    // symbols
    Object.keys(SYM).forEach(function (k) {
      s = s.split(k).join(SYM[k]);
    });
    return s;
  };

  /* ---------- DOM helpers ---------- */
  MH.el = function (tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    });
    if (kids != null) [].concat(kids).forEach(function (c) {
      if (c == null) return;
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  };
  MH.qs = function (sel, root) { return (root || document).querySelector(sel); };
  MH.post = function (url, data) {
    // no-op placeholder kept for future telemetry; game is fully offline
    return void url, void data;
  };

  /* ---------- trivial sound engine (WebAudio blips, optional) ---------- */
  var AC = null;
  MH.blip = function (kind) {
    if (!MH.state || !MH.state.settings || !MH.state.settings.sound) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      var o = AC.createOscillator(), g = AC.createGain();
      var map = { ok: [660, 880], bad: [220, 160], up: [520, 660, 990], tap: [440, 440] };
      var seq = map[kind] || map.tap;
      o.type = kind === 'bad' ? 'sawtooth' : 'triangle';
      o.connect(g); g.connect(AC.destination);
      var t = AC.currentTime;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.09, t + 0.01);
      seq.forEach(function (f, i) { o.frequency.setValueAtTime(f, t + i * 0.07); });
      g.gain.exponentialRampToValueAtTime(0.0001, t + seq.length * 0.07 + 0.05);
      o.start(t); o.stop(t + seq.length * 0.07 + 0.08);
    } catch (e) { /* audio is best-effort */ }
  };

  /* ---------- misc ---------- */
  MH.todayKey = function (d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  MH.clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  MH.uid = (function () { var i = 0; return function (p) { return (p || 'id') + (++i); }; })();
})(window.MH);
