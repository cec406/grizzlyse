/* ============================================================
   GitCI/CD Hero - util.js
   Namespaced helpers: DOM, storage, formatting, toasts, RNG.
   Global namespace: window.GH
   ============================================================ */
window.GH = window.GH || {};

(function (GH) {
  'use strict';

  /* ---------- DOM ---------- */
  GH.qs = function (sel, root) { return (root || document).querySelector(sel); };
  GH.qsa = function (sel, root) { return [].slice.call((root || document).querySelectorAll(sel)); };
  GH.el = function (tag, attrs, kids) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    });
    if (kids != null) [].concat(kids).forEach(function (c) {
      if (c == null) return;
      e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  };
  GH.esc = function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  GH.clamp = function (x, a, b) { return Math.max(a, Math.min(b, x)); };
  GH.uid = (function () { var i = 0; return function (p) { return (p || 'id') + (++i); }; })();

  /* ---------- inline formatting ----------
     Renders a small, safe subset of markup in lesson text:
       `code`  -> inline code span
       **bold**
     Everything else is treated as literal HTML authored by us. */
  GH.m = function (s) {
    if (s == null) return '';
    s = String(s);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    return s;
  };
  GH.code = function (text, cls) {
    return '<pre class="codeblock ' + (cls || '') + '"><code>' + GH.esc(text) + '</code></pre>';
  };

  /* Colourise git command output for the terminal. Returns HTML. */
  GH.colorize = function (text) {
    if (text == null) return '';
    return String(text).split('\n').map(function (line) {
      var cls = '';
      if (/^(fatal|error|CONFLICT|! \[rejected\]|Aborting|merge:|remote: error)/i.test(line)) cls = 'ln-err';
      else if (/^(Auto-merging|Automatic merge failed)/.test(line)) cls = 'ln-err';
      else if (/^\+/.test(line)) cls = 'ln-add';
      else if (/^- /.test(line)) cls = 'ln-del';
      else if (/^(Already up to date|Fast-forward|Updating |nothing to commit|Deleted branch|Switched to|Initialized empty|Cloning|On branch|Merge made|Successfully|To |Restored|Saved working|Dropped|Removed |Note: switching|Adding existing)/.test(line)) cls = 'ln-ok';
      return '<span class="' + cls + '">' + GH.esc(line) + '</span>';
    }).join('\n');
  };

  /* ---------- storage ---------- */
  GH.store = {
    get: function (k, d) {
      try { var v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); }
      catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; }
    },
    del: function (k) { try { localStorage.removeItem(k); } catch (e) {} }
  };

  /* ---------- RNG (seeded) ---------- */
  GH.makeRng = function (seed) {
    var a = (seed >>> 0) || 1;
    function r() {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    r.int = function (min, max) { return Math.floor(r() * (max - min + 1)) + min; };
    r.pick = function (arr) { return arr[Math.floor(r() * arr.length)]; };
    r.shuffle = function (arr) {
      var a2 = arr.slice();
      for (var i = a2.length - 1; i > 0; i--) { var j = Math.floor(r() * (i + 1)); var t = a2[i]; a2[i] = a2[j]; a2[j] = t; }
      return a2;
    };
    return r;
  };
  GH.seed = function () { return (Math.random() * 4294967296) >>> 0; };

  /* ---------- misc ---------- */
  GH.todayKey = function (d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  };
  GH.plural = function (n, s, p) { return n + ' ' + (n === 1 ? s : (p || s + 's')); };
  GH.bytes = function (n) {
    if (n < 1024) return n + ' B';
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + ' KB';
    return (n / 1048576).toFixed(1) + ' MB';
  };

  /* ---------- toasts ---------- */
  GH.toast = function (msg, kind) {
    var host = GH.qs('#toasts');
    if (!host) host = GH.el('div', { id: 'toasts', class: 'toasts' }, null), document.body.appendChild(host);
    var t = GH.el('div', { class: 'toast ' + (kind || ''), html: msg });
    host.appendChild(t);
    setTimeout(function () { t.classList.add('show'); }, 10);
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 300); }, 3400);
  };
})(window.GH);
