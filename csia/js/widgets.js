/* ============================================================
   Cyber Aware - widgets.js
   Interactive visual components used in lessons and tools.
   Everything is SVG/HTML — offline, dependency-free.
   Each widget: CY.widget[name](rootElement, opts)
   ============================================================ */
(function (CY) {
  'use strict';
  CY.widget = {};

  function controls(html) { return '<div class="viz-controls">' + html + '</div>'; }
  function toggle(el, on, label) { return '<button class="switch' + (on ? ' on' : '') + '" data-v="' + el + '"><i></i></button>' + (label ? '<span class="viz-lab">' + label + '</span>' : ''); }

  /* --------------------------------------------------------- */
  /* CIA triad                                                  */
  /* --------------------------------------------------------- */
  CY.widget.ciatriad = function (root) {
    var st = { sel: null };
    var info = {
      Confidentiality: 'Only the right people can see the data. Broken by: a leaked file, an overshared link, a stolen laptop, a phishing reply.',
      Integrity: 'The data is accurate and unaltered. Broken by: a tampered invoice, a rogue edit, ransomware encrypting files, a man-in-the-middle changing a payment.',
      Availability: 'The data and systems are there when needed. Broken by: ransomware, a DDoS, a deleted database, a power cut, an employee disabling a control.'
    };
    function render() {
      root.innerHTML =
        '<div class="viz"><div class="tri-wrap">' +
          '<svg viewBox="0 0 360 300" class="viz-svg tri">' +
            '<circle cx="180" cy="105" r="78" fill="rgba(56,189,248,.18)" stroke="#38bdf8" class="tri-c ' + (st.sel === 'Confidentiality' ? 'on' : '') + '" data-k="Confidentiality"/>' +
            '<circle cx="125" cy="190" r="78" fill="rgba(168,85,247,.18)" stroke="#a855f7" class="tri-c ' + (st.sel === 'Integrity' ? 'on' : '') + '" data-k="Integrity"/>' +
            '<circle cx="235" cy="190" r="78" fill="rgba(52,211,153,.18)" stroke="#34d399" class="tri-c ' + (st.sel === 'Availability' ? 'on' : '') + '" data-k="Availability"/>' +
            '<text x="180" y="88" text-anchor="middle" fill="#bfe6ff" font-size="14" font-weight="700">Confidentiality</text>' +
            '<text x="105" y="212" text-anchor="middle" fill="#d8bcff" font-size="14" font-weight="700">Integrity</text>' +
            '<text x="258" y="212" text-anchor="middle" fill="#a6f0cf" font-size="14" font-weight="700">Availability</text>' +
            '<text x="180" y="168" text-anchor="middle" fill="#93a1c0" font-size="12">the "CIA" triad</text>' +
          '</svg>' +
        '</div>' +
        '<div class="tri-info">' + (st.sel ? '<b>' + st.sel + '</b><p>' + info[st.sel] + '</p>' : '<p class="muted">Tap each circle to see what it protects.</p>') + '</div>' +
        '<p class="viz-note">Security is not just secrecy. A encrypted file you cannot read (availability lost) or a clean backup with a wrong total (integrity lost) are both failures.</p></div>';
      CY.qsa('.tri-c', root).forEach(function (c) { c.onclick = function () { st.sel = st.sel === c.dataset.k ? null : c.dataset.k; render(); }; });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* Password lab                                               */
  /* --------------------------------------------------------- */
  CY.widget.passwordlab = function (root, opts) {
    opts = opts || {};
    var st = { pw: opts.start || '', user: opts.user || 'alex.morgan' };
    var LABELS = ['Very weak', 'Weak', 'Okay', 'Strong', 'Excellent'];
    var COLORS = ['#f87171', '#fb923c', '#fbbf24', '#34d399', '#22d3ee'];
    function render() {
      var info = CY.passwordInfo(st.pw);
      var suggestions = [];
      if (st.pw.length < 12) suggestions.push('Aim for at least 12&ndash;16 characters.');
      if (info.classes < 3) suggestions.push('Mix upper, lower, numbers and symbols.');
      if (info.common) suggestions.push('This is a well-known password &mdash; never use it.');
      if (info.words < 3 && st.pw.length < 16) suggestions.push('Three or four random words make a strong, memorable passphrase.');
      if (/\d{3,}|123|abc|qwe/i.test(st.pw)) suggestions.push('Avoid sequences and keyboard patterns.');
      if (!suggestions.length) suggestions.push('Great. Store it in a password manager (not your head or a note).');
      root.innerHTML =
        '<div class="viz pwd">' +
          '<div class="pwd-field"><input id="pwd-in" type="text" value="' + CY.esc(st.pw) + '" placeholder="Try a password\u2026" autocomplete="off" spellcheck="false">' +
            '<button class="btn tiny ghost" id="pwd-eye">' + (opts.mask ? 'show' : 'hide') + '</button></div>' +
          '<div class="pwd-meter"><i style="width:' + ((info.score + 1) * 20) + '%;background:' + COLORS[info.score] + '"></i></div>' +
          '<div class="pwd-row"><span class="pwd-verdict" style="color:' + COLORS[info.score] + '">' + LABELS[info.score] + '</span>' +
            '<span class="muted small">~' + info.bits + ' bits &middot; a fast attacker cracks this in <b>' + CY.crackTime(info.seconds) + '</b></span></div>' +
          '<ul class="tips-list">' + suggestions.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>' +
          '<p class="viz-note">Crack time is a rough estimate of an offline attack guessing billions of times a second. The point is the curve: every extra character multiplies the work.</p>' +
        '</div>';
      var inp = CY.qs('#pwd-in', root);
      inp.oninput = function () { st.pw = inp.value; var pos = inp.selectionStart; render(); var ni = CY.qs('#pwd-in', root); ni.focus(); ni.setSelectionRange(pos, pos); };
      CY.qs('#pwd-eye', root).onclick = function () { opts.mask = !opts.mask; var i = CY.qs('#pwd-in', root); i.type = opts.mask ? 'password' : 'text'; };
    }
    render();
    root._getPassword = function () { return st.pw; };
  };

  /* --------------------------------------------------------- */
  /* MFA demo                                                   */
  /* --------------------------------------------------------- */
  CY.widget.mfademo = function (root) {
    var st = { stolen: false, mfa: false };
    function render() {
      var blocked = st.mfa;
      root.innerHTML =
        '<div class="viz">' + controls(
            toggle('stolen', st.stolen, 'Attacker has your password') +
            toggle('mfa', st.mfa, 'MFA is enabled')) +
          '<div class="mfa-grid">' +
            '<div class="mfa-panel ' + (st.stolen && !st.mfa ? 'bad' : 'ok') + '">' +
              '<h4>Without MFA</h4>' +
              '<p class="muted small">Login: username + password</p>' +
              (st.stolen ? '<div class="mfa-out bad">&#128678; Attacker logs in with your stolen password. They are in.</div>' : '<div class="mfa-out ok">&#10003; Secure (until the password leaks).</div>') +
            '</div>' +
            '<div class="mfa-panel ' + (st.stolen && st.mfa ? 'ok' : '') + '">' +
              '<h4>With MFA</h4>' +
              '<p class="muted small">Login: username + password + <b>second factor</b></p>' +
              (st.stolen ? (st.mfa ? '<div class="mfa-out ok">&#10003; Password is correct, but the attacker lacks your phone / key. Blocked.</div>' : '<div class="mfa-out bad">MFA is off, so nothing stops them.</div>') : '<div class="mfa-out ok">&#128272; Two independent secrets &mdash; far harder to steal.</div>') +
            '</div>' +
          '</div>' +
          '<p class="viz-note">MFA is the single highest-value control you can switch on. Prefer an <b>app or hardware key</b> over SMS, which can be SIM-swapped.</p>' +
        '</div>';
      CY.qsa('[data-v]', root).forEach(function (el) { el.onclick = function () { st[el.dataset.v] = !st[el.dataset.v]; render(); }; });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* Phishing inbox explorer                                    */
  /* --------------------------------------------------------- */
  CY.emailHTML = function (em, opt) {
    opt = opt || {};
    var fromLine = em.from + (em.address ? ' &lt;' + CY.esc(em.address) + '&gt;' : '');
    return '<div class="email">' +
      '<div class="email-head">' +
        '<div class="eh-from" ' + (opt.interactive ? 'data-flag="from"' : '') + '><span class="eh-avatar">' + CY.esc((em.from || '?')[0]) + '</span>' + fromLine + '</div>' +
        '<div class="eh-subject">' + CY.m(em.subject) + '</div>' +
      '</div>' +
      '<div class="email-body">' + CY.m(em.body) + '</div>' +
      (em.link ? '<div class="email-link" ' + (opt.interactive ? 'data-flag="link"' : '') + '>&#128279; ' + CY.esc(em.link.text) + '</div>' : '') +
      (em.attachment ? '<div class="email-attach" ' + (opt.interactive ? 'data-flag="attach"' : '') + '>&#128206; ' + CY.esc(em.attachment) + '</div>' : '') +
      '</div>';
  };

  CY.widget.phishinbox = function (root, opts) {
    var emails = (opts && opts.emails) || [];
    if (!emails.length) { root.innerHTML = '<p class="muted small">No emails to inspect.</p>'; return; }
    var st = { open: 0, found: {} };
    function render() {
      var em = emails[st.open];
      var flags = em.flags || [];
      var foundCount = flags.filter(function (f, i) { return st.found[st.open + ':' + i]; }).length;
      root.innerHTML =
        '<div class="viz phish">' +
          '<div class="inbox-list">' + emails.map(function (e, i) {
            return '<button class="inbox-item' + (i === st.open ? ' active' : '') + (st.found[i + ':done'] ? ' done' : '') + '" data-i="' + i + '">' +
              '<b>' + CY.esc(e.from) + '</b><span class="muted">' + CY.esc(e.subject) + '</span></button>';
          }).join('') + '</div>' +
          '<div class="inbox-view">' + CY.emailHTML(em, { interactive: true }) +
            '<p class="viz-note">Click the sender, the link, or the attachment to reveal the red flags. Found ' + foundCount + ' of ' + flags.length + '.</p>' +
            '<ul class="flag-list">' + (em.hotspots || []).map(function (h) {
              return '<li class="' + (st.found[st.open + ':' + h.key] ? 'on' : '') + '">' + (st.found[st.open + ':' + h.key] ? '&#9888;&#65039; ' + CY.m(h.text) : '<span class="muted">&#9675; click "' + h.where + '" to inspect</span>') + '</li>';
            }).join('') + '</ul>' +
          '</div>' +
        '</div>';
      CY.qsa('.inbox-item', root).forEach(function (b) { b.onclick = function () { st.open = +b.dataset.i; render(); }; });
      CY.qsa('[data-flag]', root).forEach(function (b) {
        b.onclick = function () {
          var h = (em.hotspots || []).filter(function (x) { return x.key === b.dataset.flag; })[0];
          if (h) { st.found[st.open + ':' + h.key] = true; render(); }
        };
      });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* Link inspector                                             */
  /* --------------------------------------------------------- */
  CY.widget.linkinspector = function (root, opts) {
    var links = (opts && opts.links) || [
      { text: 'https://www.microsoft.com/security', real: 'https://www.microsoft.com/security', bad: false, why: 'Real domain and matching destination.' },
      { text: 'https://login.microsoftonline.com', real: 'https://micros0ft-login.co/rx9', bad: true, why: 'The visible text says Microsoft; the real host is micros0ft-login.co (a zero for the o).' },
      { text: 'https://yourbank.com', real: 'https://yourbank.com.secure-login.ru', bad: true, why: 'The real domain is secure-login.ru; yourbank.com is just a subdomain trick.' },
      { text: 'http://intranet-portal', real: 'http://intranet-portal', bad: true, why: 'Plain http at work for a login page is a red flag — no encryption.' }
    ];
    var st = { open: -1 };
    function render() {
      root.innerHTML =
        '<div class="viz"><ul class="link-list">' + links.map(function (l, i) {
          return '<li><button class="link-text" data-i="' + i + '">' + CY.esc(l.text) + '</button>' +
            (st.open === i ? '<div class="link-real">Real destination: <b class="' + (l.bad ? 'bad' : 'ok') + '">' + CY.esc(l.real) + '</b><p class="muted small">' + CY.m(l.why) + '</p></div>' : '') +
            '</li>';
        }).join('') + '</ul><p class="viz-note">The text you can click and the place it actually goes are different things. Always read the domain just before the first single slash.</p></div>';
      CY.qsa('.link-text', root).forEach(function (b) { b.onclick = function () { st.open = st.open === +b.dataset.i ? -1 : +b.dataset.i; render(); }; });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* Data classification sorter                                 */
  /* --------------------------------------------------------- */
  CY.widget.classify = function (root, opts) {
    var items = (opts && opts.items) || [];
    if (!items.length) { root.innerHTML = '<p class="muted small">No items to classify.</p>'; return; }
    var labels = ['Public', 'Internal', 'Confidential', 'Restricted'];
    var st = { choice: items.map(function () { return null; }), checked: false };
    var COLORS = { Public: '#34d399', Internal: '#38bdf8', Confidential: '#fbbf24', Restricted: '#f87171' };
    function render() {
      root.innerHTML =
        '<div class="viz"><ul class="class-list">' + items.map(function (it, i) {
          var ok = st.checked && st.choice[i] === it.answer;
          return '<li class="class-item ' + (st.checked ? (ok ? 'ok' : 'bad') : '') + '">' +
            '<span class="ci-text">' + CY.m(it.text) + '</span>' +
            '<span class="ci-btns">' + labels.map(function (L) {
              return '<button class="pill' + (st.choice[i] === L ? ' sel' : '') + '" data-i="' + i + '" data-l="' + L + '" style="--c:' + COLORS[L] + '">' + L + '</button>';
            }).join('') + '</span>' +
            (st.checked ? '<span class="ci-why muted small">' + (ok ? '&#10003; ' : '&#10007; Answer: <b>' + it.answer + '</b>. ') + CY.m(it.why) + '</span>' : '') +
            '</li>';
        }).join('') + '</ul>' +
          controls('<button class="btn tiny primary" data-check>Check answers</button>') +
          '<p class="viz-note">Data classification decides how it may be stored and shared. When unsure, ask before you share.</p></div>';
      CY.qsa('.pill', root).forEach(function (b) { b.onclick = function () { st.choice[+b.dataset.i] = b.dataset.l; render(); }; });
      CY.qs('[data-check]', root).onclick = function () { st.checked = true; render(); };
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* Public Wi-Fi / MITM                                        */
  /* --------------------------------------------------------- */
  CY.widget.wifi = function (root) {
    var st = { vpn: false, https: false };
    function render() {
      var safe = st.vpn || st.https;
      root.innerHTML =
        '<div class="viz">' + controls(toggle('vpn', st.vpn, 'VPN on') + toggle('https', st.https, 'HTTPS site')) +
          '<div class="wifi-diagram">' +
            '<div class="wf-node you">You</div>' +
            '<div class="wf-link ' + (safe ? 'ok' : 'bad') + '">' + (st.vpn ? '&#128274; encrypted tunnel' : '&#128225; open Wi-Fi') + '</div>' +
            '<div class="wf-node ap ' + (safe ? '' : 'bad') + '">' + (st.vpn ? 'VPN server' : 'Cafe hotspot') + '</div>' +
            '<div class="wf-link"></div>' +
            '<div class="wf-node net">Internet</div>' +
          '</div>' +
          '<div class="mitm ' + (safe ? 'ok' : 'bad') + '">' +
            (st.vpn ? '&#10003; The attacker on the network sees only encrypted traffic.'
              : st.https ? '&#10003; HTTPS protects this site, but other traffic (and metadata) is still exposed.'
              : '&#9888;&#65039; An attacker on the same Wi-Fi can read unencrypted traffic, capture logins, and redirect you to fake pages.') +
          '</div>' +
          '<p class="viz-note">On untrusted networks: use a VPN for work, look for the padlock, and never ignore a certificate warning.</p></div>';
      CY.qsa('[data-v]', root).forEach(function (el) { el.onclick = function () { st[el.dataset.v] = !st[el.dataset.v]; render(); }; });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* Incident response flow                                     */
  /* --------------------------------------------------------- */
  CY.widget.irflow = function (root) {
    var phases = [
      { k: 'Prepare', d: 'Know how to report before you need to. Save the security team contact. Keep devices patched.' },
      { k: 'Identify', d: 'Notice something odd: a strange login, a slow laptop, lost device, suspicious email you clicked.' },
      { k: 'Contain', d: 'Disconnect from the network, do not power off (evidence!), change passwords from a clean device.' },
      { k: 'Eradicate', d: 'Remove the threat with IT: wipe or reimage, revoke sessions, close the hole.' },
      { k: 'Recover', d: 'Restore from clean backups, verify systems, then return to normal work.' },
      { k: 'Learn', d: 'Post-incident review. What would have prevented it? Update the process.' }
    ];
    var st = { sel: 2 };
    function render() {
      root.innerHTML =
        '<div class="viz ir"><div class="ir-steps">' + phases.map(function (p, i) {
          return '<button class="ir-step' + (st.sel === i ? ' active' : '') + '" data-i="' + i + '"><span class="ir-num">' + (i + 1) + '</span><span>' + p.k + '</span></button>';
        }).join('') + '</div>' +
        '<div class="ir-info"><b>' + phases[st.sel].k + '</b><p>' + phases[st.sel].d + '</p></div>' +
        '<p class="viz-note">Your job in an incident is simple: <b>notice, contain, report fast, and never hide it.</b> Speed of reporting limits the damage.</p></div>';
      CY.qsa('.ir-step', root).forEach(function (b) { b.onclick = function () { st.sel = +b.dataset.i; render(); }; });
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* Hash vs encryption                                        */
  /* --------------------------------------------------------- */
  CY.widget.cryptodemo = function (root, opts) {
    var st = { text: (opts && opts.text) || 'Transfer $500' };
    function hash(s) {
      var h = 2166136261;
      for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
      var out = '';
      for (var k = 0; k < 4; k++) { h = Math.imul(h ^ (h >>> 13), 0x5bd1e995) >>> 0; out += h.toString(16).padStart(8, '0'); }
      return out.slice(0, 24);
    }
    function xorCipher(s, key) {
      key = key || 'KEY1';
      var out = '';
      for (var i = 0; i < s.length; i++) {
        var c = (s.charCodeAt(i) ^ key.charCodeAt(i % key.length)).toString(16).padStart(2, '0');
        out += c;
      }
      return out.toUpperCase();
    }
    function render() {
      root.innerHTML =
        '<div class="viz"><div class="crypto-input"><input id="cr-in" value="' + CY.esc(st.text) + '" spellcheck="false"></div>' +
          '<div class="crypto-grid">' +
            '<div class="crypto-box">' +
              '<h4>&#128273; Encryption (reversible)</h4>' +
              '<p class="muted small">Hides data. The right key gets it back.</p>' +
              '<div class="crypto-val">&rarr; ' + xorCipher(st.text) + '</div>' +
              '<div class="crypto-val back">&rarr; decrypts to "' + CY.esc(st.text) + '"</div>' +
            '</div>' +
            '<div class="crypto-box">' +
              '<h4>&#127869; Hashing (one-way)</h4>' +
              '<p class="muted small">Fingerprints data. You cannot reverse it.</p>' +
              '<div class="crypto-val hash">' + hash(st.text) + '</div>' +
              '<div class="crypto-val back">"Transfer $501" &rarr; ' + hash(st.text.replace('500', '501')) + ' <span class="muted">(completely different)</span></div>' +
            '</div>' +
          '</div>' +
          '<p class="viz-note">Passwords are <b>hashed</b>, never encrypted. Files and messages are <b>encrypted</b> so the right person can read them back. Change one character and the hash changes completely.</p></div>';
      var inp = CY.qs('#cr-in', root);
      inp.oninput = function () { st.text = inp.value; var pos = inp.selectionStart; render(); var ni = CY.qs('#cr-in', root); ni.focus(); ni.setSelectionRange(pos, pos); };
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* SQL injection demo (advanced)                              */
  /* --------------------------------------------------------- */
  CY.widget.sqlinject = function (root) {
    var st = { user: "admin' --" };
    function vulnerable(u) { return "SELECT * FROM users WHERE name = '" + u + "'"; }
    function safe(u) { return "SELECT * FROM users WHERE name = ?      -- param: [" + JSON.stringify(u) + "]"; }
    function breached(u) { return /['"]|--|;|\bOR\b\s+\d=\d/i.test(u); }
    function render() {
      var bad = breached(st.user);
      root.innerHTML =
        '<div class="viz"><div class="crypto-input"><input id="sq-in" value="' + CY.esc(st.user) + '" spellcheck="false" placeholder="Enter a username\u2026"></div>' +
          '<div class="crypto-grid">' +
            '<div class="crypto-box ' + (bad ? 'bad-box' : '') + '"><h4>String concatenation (vulnerable)</h4>' +
              '<pre class="codeblock small">' + CY.esc(vulnerable(st.user)) + '</pre>' +
              (bad ? '<div class="mfa-out bad">&#128678; The input became <b>code</b>. The query runs with attacker logic &mdash; data can leak, change, or be deleted.</div>' : '<div class="mfa-out ok">&#10003; Ordinary input, ordinary query &mdash; for now.</div>') +
            '</div>' +
            '<div class="crypto-box"><h4>Parameterised query (safe)</h4>' +
              '<pre class="codeblock small">' + CY.esc(safe(st.user)) + '</pre>' +
              '<div class="mfa-out ok">&#10003; The database treats the input as <b>data</b>, never as code. Try the same attack &mdash; nothing happens.</div>' +
            '</div>' +
          '</div>' +
          '<p class="viz-note">Try the classic payloads: <code>admin\' --</code>, <code>\' OR 1=1 --</code>, <code>\'; DROP TABLE users; --</code>. The fix is never to "filter bad characters" &mdash; it is to <b>separate code from data</b> with parameters.</p></div>';
      var inp = CY.qs('#sq-in', root);
      inp.oninput = function () { st.user = inp.value; var pos = inp.selectionStart; render(); var ni = CY.qs('#sq-in', root); ni.focus(); ni.setSelectionRange(pos, pos); };
    }
    render();
  };

  /* --------------------------------------------------------- */
  /* Mini ATT&CK matrix (advanced)                              */
  /* --------------------------------------------------------- */
  CY.widget.attackmatrix = function (root) {
    var tactics = [
      { k: 'Initial Access', e: 'Phishing, exposed VPN, stolen credentials.' },
      { k: 'Execution', e: 'Malicious macro, script, or command run on a host.' },
      { k: 'Persistence', e: 'Scheduled task or registry key so the attacker survives a reboot.' },
      { k: 'Privilege Escalation', e: 'From a normal user to admin, to reach more data.' },
      { k: 'Credential Access', e: 'Keylogging, dumped password hashes, MFA fatigue.' },
      { k: 'Lateral Movement', e: 'Hop from machine to machine across the network.' },
      { k: 'Exfiltration', e: 'Copy the data out &mdash; the part that actually hurts.' },
      { k: 'Impact', e: 'Ransomware, defacement, or destroyed backups.' }
    ];
    var st = { sel: 0 };
    function render() {
      root.innerHTML =
        '<div class="viz"><div class="matrix-grid">' + tactics.map(function (t, i) {
          return '<button class="matrix-cell' + (st.sel === i ? ' active' : '') + '" data-i="' + i + '">' + t.k + '</button>';
        }).join('') + '</div>' +
        '<div class="matrix-info"><b>' + tactics[st.sel].k + '</b><p>' + CY.m(tactics[st.sel].e) + '</p></div>' +
        '<p class="viz-note">Attackers chain these steps. Breaking <b>any</b> link stops the chain &mdash; which is why MFA, patching, and least privilege matter so much.</p></div>';
      CY.qsa('.matrix-cell', root).forEach(function (b) { b.onclick = function () { st.sel = +b.dataset.i; render(); }; });
    }
    render();
  };
})(window.CY);
