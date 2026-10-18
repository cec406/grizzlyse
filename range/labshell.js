/* ============================================================
   GRIZZLY LAB SHELL - injected lab chrome for the five apps
   Does not modify app logic. Reads each app's own local save.
   ============================================================ */

(function () {
  'use strict';

  // Never double-wrap inside the range hub / machine view.
  if (window.self !== window.top) return;

  // Keep automated UI tests and the app's own #smoke harness clean.
  // Add ?lab=1 to force the shell in a headless browser.
  var force = /[?&]lab=1(?:&|$)/.test(location.search);
  if (!force && (navigator.webdriver || /jsdom|HeadlessChrome/i.test(navigator.userAgent))) return;
  if (location.hash.indexOf('#smoke') === 0) return;

  var script = document.currentScript;
  var id = (script && script.dataset.machine) || '';
  var machine = window.rangeById ? rangeById(id) : null;
  if (!machine) return;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  var BOOTS = {
    compsci: ['mount /dev/zd0 ......................... OK', 'loader: bash 5.2 / pwsh 7 ............... OK', 'network: 10.10.10.0/24 (simulated) ....... OK'],
    gsehack: ['mount /dev/ghost0 ....................... OK', 'crypto loop / netfilter / keyring ........ OK', 'range uplink: 7 relays ................... OK'],
    cybercrime: ['mount /evidence (read-only) ............. OK', 'hashlib / metascope / polyglot ........... OK', 'feed: NCMEC / IC3 / CISA (fictional) ..... OK'],
    gitcicd: ['mount /repo ............................. OK', 'git engine / pipeline runner ............. OK', 'runner: local / no remote ................ OK'],
    csia: ['mount /awareness ........................ OK', 'phish corpus / mfa demo / hash lab ....... OK', 'certificate store ........................ OK']
  };

  function bootFlagKey() { return 'gl.boot.' + machine.id; }
  function booted() { try { return sessionStorage.getItem(bootFlagKey()) === '1'; } catch (e) { return false; } }
  function markBooted() { try { sessionStorage.setItem(bootFlagKey(), '1'); } catch (e) {} }

  function buildBoot() {
    var el = document.createElement('div');
    el.id = 'gl-boot';
    el.innerHTML =
      '<div class="gl-boot-inner">' +
        '<div class="gl-boot-brand"><span class="gl-boot-mark"><i></i><i></i><i></i><i></i></span>' +
          '<div><strong>GRIZZLY RANGE CONTROL</strong><small>' + esc(machine.code) + ' // ' + esc(machine.host) + ' // SYNTHETIC MACHINE</small></div>' +
        '</div>' +
        '<pre class="gl-boot-log" id="gl-boot-log"></pre>' +
        '<div class="gl-boot-bar"><i id="gl-boot-fill"></i></div>' +
        '<div class="gl-boot-foot"><span>UNCLASSIFIED // TRAINING SIMULATION</span><span class="spacer"></span><button class="gl-skip" id="gl-boot-skip">skip</button></div>' +
      '</div>';
    document.body.appendChild(el);

    var lines = [
      ['GRIZZLY LAB SHELL v1.0', 'head'],
      ['machine: ' + machine.code + '  ' + machine.name, 'dim'],
      ['operator: local  //  link: synthetic', 'dim'],
      ['']
    ].concat((BOOTS[machine.id] || []).map(function (l) { return [l, 'ok']; })).concat([
      ['restoring local operator save ........... ' + (localStorage.getItem(machine.key) ? 'FOUND' : 'NEW'), 'ok'],
      ['[ !! ] no external targets - training only', 'warn'],
      ['machine online. welcome, operator.', 'ok']
    ]);

    var out = $('#gl-boot-log');
    var n = 0;
    var finished = false;
    function step() {
      if (finished || !out || !out.isConnected) return;
      if (n < lines.length) {
        var line = lines[n++];
        var d = document.createElement('div');
        if (line[1]) d.className = line[1];
        d.textContent = line[0];
        out.appendChild(d);
        var fill = $('#gl-boot-fill');
        if (fill) fill.style.width = Math.round((n / lines.length) * 100) + '%';
        setTimeout(step, 115);
      } else {
        setTimeout(finish, 420);
      }
    }
    function finish() {
      if (finished) return;
      finished = true;
      markBooted();
      el.classList.add('gl-hide');
      setTimeout(function () { el.remove(); showTab(); }, 420);
    }
    $('#gl-boot-skip').addEventListener('click', function (e) { e.stopPropagation(); finish(); });
    el.addEventListener('click', finish);
    document.addEventListener('keydown', function escBoot(e) {
      if (!document.getElementById('gl-boot')) { document.removeEventListener('keydown', escBoot); return; }
      if (e.key === 'Enter' || e.key === 'Escape') { e.preventDefault(); finish(); }
    });
    setTimeout(step, 160);
  }

  function buildTab() {
    var tab = document.createElement('button');
    tab.id = 'gl-tab';
    tab.title = 'Open GRIZZLY LAB controls';
    tab.setAttribute('aria-label', 'Open GRIZZLY LAB controls');
    tab.innerHTML = '<i></i><b id="gl-tab-code">' + esc(machine.code) + '</b><span id="gl-tab-pct">0%</span>';
    tab.addEventListener('click', toggleDock);
    document.body.appendChild(tab);
    return tab;
  }

  function buildDock() {
    var dock = document.createElement('aside');
    dock.id = 'gl-dock';
    dock.setAttribute('aria-label', 'GRIZZLY LAB controls');
    dock.innerHTML =
      '<div class="gl-dock-head">' +
        '<span class="gl-mark">&gt;_</span>' +
        '<div><strong>GRIZZLY LAB</strong><small id="gl-dock-code">' + esc(machine.code) + ' &middot; ' + esc(machine.host) + '</small></div>' +
        '<span class="spacer"></span>' +
        '<button class="gl-x" id="gl-close" aria-label="Close lab dock">&#10005;</button>' +
      '</div>' +
      '<div class="gl-dock-body">' +
        '<div class="gl-code" id="gl-code">' + esc(machine.code) + '</div>' +
        '<div class="gl-name">' + esc(machine.name) + '</div>' +
        '<div class="gl-role">' + esc(machine.role) + '</div>' +
        '<div class="gl-prog"><i id="gl-fill"></i></div>' +
        '<div class="gl-row"><span id="gl-label">Not started</span><b id="gl-pct">0%</b></div>' +
        '<dl class="gl-kv">' +
          '<dt>XP / points</dt><dd id="gl-xp">0</dd>' +
          '<dt>Tracked</dt><dd id="gl-total">' + esc(machine.total + ' ' + machine.totalLabel) + '</dd>' +
          '<dt>Last seen</dt><dd id="gl-last">not opened</dd>' +
          '<dt>Save key</dt><dd title="' + esc(machine.key) + '">' + esc(machine.key) + '</dd>' +
        '</dl>' +
        '<div class="gl-brief"><b>Brief.</b> ' + esc(machine.brief) + '<br><span style="color:#e8c979">Next: ' + esc(machine.next) + '</span></div>' +
        '<div class="gl-label">Lab console</div>' +
        '<div class="gl-console">' +
          '<div class="gl-out" id="gl-out"></div>' +
          '<div class="gl-in"><span>&gt;</span><input id="gl-input" autocomplete="off" spellcheck="false" aria-label="Lab console input" placeholder="type help" /></div>' +
        '</div>' +
        '<div class="gl-label">Machine</div>' +
        '<div class="gl-actions">' +
          '<button class="gl-btn gold" id="gl-practice">Practice</button>' +
          '<button class="gl-btn" id="gl-hint">Hint</button>' +
          '<a class="gl-btn" href="../range/machine.html?m=' + esc(machine.id) + '">Lab view</a>' +
          '<a class="gl-btn" href="../range/index.html">Range home</a>' +
          '<button class="gl-btn danger" id="gl-reset">Reset progress</button>' +
          '<a class="gl-btn" href="../range/index.html#ops">Range Ops</a>' +
        '</div>' +
        '<div class="gl-note">Progress is read from this app\'s local save. The shell does not upload anything. Shortcut: <b>Ctrl+Shift+L</b>.</div>' +
      '</div>';
    document.body.appendChild(dock);
    return dock;
  }

  var tab, dock, isOpen = false;
  function showTab() { if (tab) tab.classList.remove('gl-hidden'); }
  function toggleDock() {
    isOpen = !isOpen;
    if (!dock) return;
    dock.classList.toggle('gl-open', isOpen);
    if (isOpen) {
      update();
      setTimeout(function () { var i = $('#gl-input'); if (i) i.focus(); }, 160);
    }
  }
  function closeDock() {
    isOpen = false;
    if (dock) dock.classList.remove('gl-open');
  }

  function whenLabel(date) {
    if (!date) return 'not opened';
    var days = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (days <= 0) return 'today';
    if (days === 1) return 'yesterday';
    return days + 'd ago';
  }

  function update() {
    if (!window.rangeRead) return;
    var p = rangeRead(machine);
    var last = rangeLastVisit ? rangeLastVisit(machine.id) : null;
    if (tab) {
      tab.style.setProperty('--gl-accent', machine.accent);
      $('#gl-tab-pct').textContent = p.pct + '%';
    }
    if (!dock) return;
    dock.style.setProperty('--gl-accent', machine.accent);
    $('#gl-fill').style.width = p.pct + '%';
    $('#gl-fill').style.background = machine.accent;
    $('#gl-label').textContent = p.label;
    $('#gl-pct').textContent = p.pct + '%';
    $('#gl-xp').textContent = (p.xp || 0).toLocaleString();
    $('#gl-last').textContent = whenLabel(last);
  }

  function log(text, cls) {
    var out = $('#gl-out');
    if (!out) return;
    var d = document.createElement('div');
    if (cls) d.className = cls;
    d.textContent = text;
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
    while (out.children.length > 80) out.removeChild(out.firstChild);
  }

  function run(raw) {
    var cmd = String(raw || '').trim();
    if (!cmd) return;
    log('operator@lab:~$ ' + cmd, 'p');
    var parts = cmd.split(/\s+/);
    var c = parts[0].toLowerCase();

    if (c === 'help' || c === '?') {
      log([
        'LAB SHELL COMMANDS',
        '  status            machine + progress',
        '  brief             mission brief and next step',
        '  hint              trigger the app hint control',
        '  lab               open this machine in the range lab view',
        '  range             open the operator desktop',
        '  reset             clear this app\'s local save',
        '  scan              re-read local progress',
        '  whoami | clear | close'
      ].join('\n'), 'dim');
      return;
    }
    if (c === 'clear') { var out = $('#gl-out'); if (out) out.innerHTML = ''; return; }
    if (c === 'close') { closeDock(); return; }
    if (c === 'whoami') { log('operator@range (local, synthetic)'); return; }
    if (c === 'status' || c === 'progress') {
      var p = rangeRead(machine);
      log('MACHINE  ' + machine.code + '  ' + machine.name, 'ok');
      log('ROLE     ' + machine.role);
      log('PROGRESS ' + p.pct + '%  (' + p.label + ')');
      log('DETAIL   ' + p.detail);
      log('XP       ' + (p.xp || 0));
      log('STORAGE  ' + machine.key, 'dim');
      return;
    }
    if (c === 'brief') {
      log(machine.brief);
      log('NEXT: ' + machine.next, 'ok');
      return;
    }
    if (c === 'hint') { triggerHint(); return; }
    if (c === 'lab') { location.href = '../range/machine.html?m=' + machine.id; return; }
    if (c === 'range' || c === 'home') { location.href = '../range/index.html'; return; }
    if (c === 'scan') { update(); log('local save re-read: ' + rangeRead(machine).pct + '%', 'ok'); return; }
    if (c === 'reset') {
      if (window.confirm('Reset ' + machine.name + ' progress? This clears ' + machine.key + ' from this browser.')) {
        if (window.rangeReset) rangeReset(machine.id);
        location.reload();
      }
      return;
    }
    log('unknown command: ' + c + ' (try help)', 'err');
  }

  function triggerPractice() {
    var label = window.rangePractice ? window.rangePractice(machine, document) : null;
    if (label) {
      log('practice mode: ' + label, 'ok');
      closeDock();
    } else {
      log('No sandbox control detected. Use the app\'s own Start/Sandbox button.', 'err');
    }
  }

  function triggerHint() {
    var candidates = [];
    var byId = ['#hintBtn', '#hint-btn', '[data-hint]', '[data-tcmd="help"]'];
    byId.forEach(function (sel) {
      var el = document.querySelector(sel);
      if (el) candidates.push(el);
    });
    // visible buttons that mention hint
    $$('button').forEach(function (b) {
      if (b.closest('#gl-dock') || b.closest('#gl-boot')) return;
      var t = (b.textContent || '').toLowerCase();
      if (t.indexOf('hint') >= 0 && b.offsetParent !== null) candidates.push(b);
    });
    var btn = candidates.filter(function (b) { return b.offsetParent !== null; })[0];
    if (btn) {
      btn.click();
      log('hint control triggered: ' + (btn.textContent || btn.id || 'button').trim().slice(0, 40), 'ok');
      return;
    }
    // terminal apps: send the hint command
    var input = document.querySelector('#cmd, #cmdline');
    if (input) {
      input.value = 'hint';
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
      log('sent "hint" to the machine terminal', 'ok');
      return;
    }
    log('No hint control detected. Use the app\'s own hint button.', 'err');
  }

  function buildAll() {
    if (booted()) showTab(); else buildBoot();
    tab = buildTab();
    tab.classList.add('gl-hidden');
    dock = buildDock();
    if (booted()) showTab();

    $('#gl-close').addEventListener('click', closeDock);
    $('#gl-reset').addEventListener('click', function () {
      if (window.confirm('Reset ' + machine.name + ' progress? This clears ' + machine.key + ' from this browser.')) {
        if (window.rangeReset) rangeReset(machine.id);
        location.reload();
      }
    });
    $('#gl-hint').addEventListener('click', triggerHint);
    $('#gl-practice').addEventListener('click', triggerPractice);

    var input = $('#gl-input');
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var v = input.value;
        input.value = '';
        run(v);
      }
    });

    log('GRIZZLY LAB SHELL v1.0', 'ok');
    log('machine ' + machine.code + ' ready. type help.', 'dim');
    log('', 'dim');

    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        toggleDock();
      } else if (e.key === 'Escape' && isOpen) {
        closeDock();
      }
    });

    window.addEventListener('storage', update);
    setInterval(update, 3000);
    if (window.rangeMarkVisit) rangeMarkVisit(machine.id);
    update();

    // If the app changes its save, refresh when the tab regains focus.
    document.addEventListener('visibilitychange', function () { if (!document.hidden) update(); });
  }

  function ready() {
    if (document.body) buildAll();
    else document.addEventListener('DOMContentLoaded', buildAll);
  }
  ready();
})();
