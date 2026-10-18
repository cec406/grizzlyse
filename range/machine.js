/* ============================================================
   GRIZZLY RANGE - single-machine lab view
   ============================================================ */

(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  var params = new URLSearchParams(location.search);
  var m = rangeById(params.get('m')) || RANGE_MACHINES[0];
  var poll = null;

  function ring(pct, accent) {
    var r = 33, c = 2 * Math.PI * r;
    var off = c * (1 - Math.max(0, Math.min(100, pct)) / 100);
    return '<svg width="86" height="86" viewBox="0 0 86 86">' +
      '<circle cx="43" cy="43" r="' + r + '" fill="none" stroke="#1a2b37" stroke-width="7"/>' +
      '<circle cx="43" cy="43" r="' + r + '" fill="none" stroke="' + accent + '" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 43 43)"/>' +
      '<text x="43" y="47" text-anchor="middle" fill="#eef7fc" font-family="ui-monospace,monospace" font-size="16" font-weight="700">' + pct + '%</text>' +
    '</svg>';
  }

  function whenLabel(date) {
    if (!date) return 'not opened';
    var days = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (days <= 0) return 'today';
    if (days === 1) return 'yesterday';
    return days + ' days ago';
  }

  function update() {
    var p = rangeRead(m);
    var last = rangeLastVisit(m.id);
    $('#m-fill').style.width = p.pct + '%';
    $('#m-label').textContent = p.label;
    $('#m-pct').textContent = p.pct + '%';
    $('#m-ring').innerHTML = ring(p.pct, m.accent);
    $('#m-xp').textContent = (p.xp || 0).toLocaleString();
    $('#m-last').textContent = whenLabel(last);
    $('#m-total').textContent = (p.total || m.total) + ' ' + (m.totalLabel || 'modules');
    var others = $('#m-others');
    if (others) {
      others.innerHTML = RANGE_MACHINES.filter(function (x) { return x.id !== m.id; }).map(function (x) {
        var px = rangeRead(x);
        return '<a class="r-other" href="machine.html?m=' + x.id + '" style="--a:' + x.accent + '"><i></i>' + esc(x.name) + '<span>' + px.pct + '%</span></a>';
      }).join('');
    }
  }

  function boot() {
    document.title = m.name + ' // GRIZZLY RANGE';
    $('#m-code').textContent = m.code;
    $('#m-code2').textContent = m.code + ' / ' + m.host;
    $('#m-name').textContent = m.name;
    $('#m-title').textContent = m.name;
    $('#m-tagline').textContent = m.tagline;
    $('#m-brief').textContent = m.brief;
    $('#m-next').textContent = 'Next: ' + m.next;
    $('#m-role').textContent = m.role;
    $('#m-host').textContent = m.host;
    $('#m-stage-host').textContent = m.host + '.range.local';
    $('#m-foot-code').textContent = m.code;
    $('#m-scope').textContent = m.role;
    $('#m-direct').href = m.href;
    $('#m-frame').src = m.href;
    $('#m-frame').title = m.name;

    var sel = $('#m-select');
    sel.innerHTML = RANGE_MACHINES.map(function (x) {
      return '<option value="' + x.id + '"' + (x.id === m.id ? ' selected' : '') + '>' + esc(x.code + ' ' + x.name) + '</option>';
    }).join('');
    sel.addEventListener('change', function () { location.href = 'machine.html?m=' + sel.value; });

    rangeMarkVisit(m.id);
    update();
    poll = setInterval(update, 1500);
    document.addEventListener('visibilitychange', function () { if (!document.hidden) update(); });

    $('#m-reload').addEventListener('click', function () {
      var f = $('#m-frame');
      f.src = f.src;
      update();
    });

    function practiceNow() {
      var f = $('#m-frame');
      var tries = 0;
      function attempt() {
        tries++;
        var label = null;
        try { label = window.rangePractice ? window.rangePractice(m, f.contentDocument) : null; } catch (e) {}
        if (label) {
          var b = $('#m-practice');
          b.textContent = 'Practice: ' + label;
          setTimeout(function () { b.textContent = 'Practice'; }, 2200);
          return;
        }
        if (tries < 20) setTimeout(attempt, 300);
      }
      attempt();
    }
    $('#m-practice').addEventListener('click', practiceNow);
    if (params.get('practice') === '1') setTimeout(practiceNow, 900);

    $('#m-view').textContent = 'Copy lab link';
    $('#m-view').addEventListener('click', function () {
      var done = function () {
        var b = $('#m-view');
        b.textContent = 'Link copied';
        setTimeout(function () { b.textContent = 'Copy lab link'; }, 1800);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(location.href).then(done).catch(done);
      } else { done(); }
    });

    $('#m-reset').addEventListener('click', function () {
      var ov = document.createElement('div');
      ov.className = 'ov';
      ov.innerHTML = '<div class="dlg"><div class="dlg-h">Reset ' + esc(m.name) + '?</div>' +
        '<div class="dlg-b">This removes <code>' + esc(m.key) + '</code> from this browser. The training app itself is untouched.</div>' +
        '<div class="dlg-f"><button class="btn btn-sm btn-ghost" data-no>Cancel</button><button class="btn btn-sm btn-danger" data-yes>Reset progress</button></div></div>';
      document.body.appendChild(ov);
      ov.addEventListener('click', function (e) {
        if (e.target === ov || e.target.closest('[data-no]')) ov.remove();
        if (e.target.closest('[data-yes]')) {
          rangeReset(m.id);
          ov.remove();
          var f = $('#m-frame');
          f.src = f.src;
          update();
        }
      });
    });

    if (location.protocol === 'file:') {
      var note = document.createElement('div');
      note.className = 'r-note';
      note.style.color = '#e8c979';
      note.innerHTML = 'This machine loads in an iframe. If it stays blank, serve the repo over HTTP:<br><code>python -m http.server 8080</code>';
      $('.m-rail').appendChild(note);
    }
  }

  boot();
})();
