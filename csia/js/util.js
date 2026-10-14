/* ============================================================
   Cyber Aware - util.js
   Namespaced helpers: DOM, storage, formatting, toasts, RNG.
   Global namespace: window.CY
   ============================================================ */
window.CY = window.CY || {};

(function (CY) {
  'use strict';

  CY.qs = function (sel, root) { return (root || document).querySelector(sel); };
  CY.qsa = function (sel, root) { return [].slice.call((root || document).querySelectorAll(sel)); };
  CY.el = function (tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    });
    if (kids != null) [].concat(kids).forEach(function (c) { if (c != null) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  };
  CY.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  CY.clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  CY.uid = (function () { var i = 0; return function (p) { return (p || 'id') + (++i); }; })();

  /* inline formatting: `code` and **bold** */
  CY.m = function (s) {
    if (s == null) return '';
    s = String(s);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/--([^-]+)--/g, '<span class="em">$1</span>');
    return s;
  };
  CY.code = function (text, cls) { return '<pre class="codeblock ' + (cls || '') + '"><code>' + CY.esc(text) + '</code></pre>'; };

  CY.store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) { } }
  };

  CY.makeRng = function (seed) {
    var a = (seed >>> 0) || 1;
    function r() { a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }
    r.int = function (a2, b2) { return Math.floor(r() * (b2 - a2 + 1)) + a2; };
    r.pick = function (arr) { return arr[Math.floor(r() * arr.length)]; };
    r.shuffle = function (arr) { var a2 = arr.slice(); for (var i = a2.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a2[i]; a2[i] = a2[j]; a2[j] = t; } return a2; };
    return r;
  };

  CY.todayKey = function (d) { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  CY.fmtDate = function (ts) { try { return new Date(ts).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }); } catch (e) { return ''; } };
  CY.plural = function (n, s, p) { return n + ' ' + (n === 1 ? s : (p || s + 's')); };

  CY.toast = function (msg, kind) {
    var host = CY.qs('#toasts');
    if (!host) { host = CY.el('div', { id: 'toasts', class: 'toasts' }); document.body.appendChild(host); }
    var t = CY.el('div', { class: 'toast ' + (kind || ''), html: msg });
    host.appendChild(t);
    setTimeout(function () { t.classList.add('show'); }, 10);
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 300); }, 3600);
  };

  /* ---------- password strength (shared by widget + activity) ---------- */
  var COMMON = ['password', '123456', 'qwerty', 'letmein', 'welcome', 'admin', 'iloveyou', 'monkey', 'dragon', 'football', 'abc123', '111111', '12345678', 'sunshine', 'princess', 'passw0rd', 'p@ssw0rd', 'login', 'master'];
  CY.commonPassword = function (pw) {
    var p = String(pw).toLowerCase();
    if (COMMON.indexOf(p) !== -1) return true;
    // simple leet-normalisation
    var deleet = p.replace(/0/g, 'o').replace(/1/g, 'i').replace(/3/g, 'e').replace(/4/g, 'a').replace(/@/g, 'a').replace(/\$/g, 's').replace(/5/g, 's');
    return COMMON.indexOf(deleet) !== -1;
  };
  CY.passwordInfo = function (pw) {
    pw = String(pw || '');
    var lower = /[a-z]/.test(pw), upper = /[A-Z]/.test(pw), digit = /[0-9]/.test(pw), sym = /[^A-Za-z0-9]/.test(pw);
    var classes = [lower, upper, digit, sym].filter(Boolean).length;
    var pool = 0;
    if (lower) pool += 26; if (upper) pool += 26; if (digit) pool += 10; if (sym) pool += 33;
    if (pool === 0) pool = 1;
    var patterns = 0;
    if (/^[a-zA-Z]+$/.test(pw)) patterns += 1;
    if (/^\d+$/.test(pw)) patterns += 1;
    if (/(.)\1{2,}/.test(pw)) patterns += 1;                    // aaa
    if (/123|234|345|456|567|678|789|abc|qwe|asd|zxc/i.test(pw)) patterns += 1;
    if (COMMON.indexOf(pw.toLowerCase()) !== -1) patterns += 2;
    var bits = pw.length ? pw.length * Math.log2(pool) : 0;
    bits -= patterns * 8;                                        // penalise predictability
    bits = Math.max(0, bits);
    // guesses per second (offline attack on a fast hash)
    var rate = 1e10;
    var seconds = Math.pow(2, Math.min(bits, 200)) / rate / 2;
    var words = pw.trim().split(/[\s-]+/).filter(function (w) { return w.length > 1; });
    // score 0..4
    var score = 0;
    if (pw.length >= 8) score = 1;
    if (pw.length >= 12 && classes >= 2) score = 2;
    if (bits >= 60) score = 3;
    if (bits >= 80 && words.length >= 3) score = 4;
    if (CY.commonPassword(pw)) score = 0;
    if (pw.length < 8) score = Math.min(score, 1);
    return { length: pw.length, classes: classes, bits: Math.round(bits), seconds: seconds, score: score, common: CY.commonPassword(pw), words: words.length };
  };
  CY.crackTime = function (seconds) {
    if (seconds < 1) return 'instantly';
    var units = [['yr', 31536000], ['day', 86400], ['hour', 3600], ['min', 60], ['sec', 1]];
    for (var i = 0; i < units.length; i++) {
      var v = seconds / units[i][1];
      if (v >= 1) {
        if (units[i][0] === 'yr' && v > 1e6) return 'longer than the age of the universe';
        if (units[i][0] === 'yr' && v > 1000) return Math.round(v / 1000) + ' thousand years';
        return Math.round(v) + ' ' + units[i][0] + (Math.round(v) !== 1 && units[i][0] !== 'yr' ? 's' : '');
      }
    }
    return 'instantly';
  };
})(window.CY);
