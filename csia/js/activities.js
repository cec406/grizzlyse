/* ============================================================
   Cyber Aware - activities.js
   Interactive activities that make up each module's "do" step:
     quiz      multiple choice with explanations
     pick      select every item that applies (spot the red flags)
     order     put the steps in the right sequence
     match     connect terms to definitions
     scenario  branching decision tree with consequences
     password  use the password lab to build a strong passphrase
     phish     triage an inbox: report or trust each email
   Each renderer calls onDone(success, pct, detail).
   ============================================================ */
(function (CY) {
  'use strict';

  CY.renderActivity = function (zone, module, act, onDone) {
    zone.innerHTML = '<div class="activity" id="act-root"></div>';
    var root = CY.qs('#act-root', zone);
    switch (act.kind) {
      case 'quiz': return quiz(root, act, onDone);
      case 'pick': return pick(root, act, onDone);
      case 'order': return order(root, act, onDone);
      case 'match': return match(root, act, onDone);
      case 'scenario': return scenario(root, act, onDone);
      case 'password': return password(root, act, onDone);
      case 'phish': return phish(root, act, onDone);
      default: root.innerHTML = '<p class="muted">Unknown activity.</p>';
    }
  };

  function banner(root, ok, html) {
    var b = CY.el('div', { class: 'act-result ' + (ok ? 'good' : 'bad'), html: html });
    root.appendChild(b);
  }

  /* ---------------- quiz ---------------- */
  function quiz(root, act, onDone) {
    // shuffle option order per attempt so position never gives the answer away
    var rng = CY.makeRng((Math.random() * 1e9) | 0);
    var qs = act.questions.map(function (q) {
      var idx = rng.shuffle(q.options.map(function (_, i) { return i; }));
      return { q: q.q, options: idx.map(function (i) { return q.options[i]; }), a: idx.indexOf(q.a), why: q.why };
    });
    root.innerHTML =
      '<div class="quiz">' + qs.map(function (q, qi) {
        return '<div class="quiz-q" data-q="' + qi + '"><div class="qq-text">' + (qi + 1) + '. ' + CY.m(q.q) + '</div>' +
          '<div class="qq-opts">' + q.options.map(function (o, oi) {
            return '<label class="qq-opt"><input type="radio" name="q' + qi + '" value="' + oi + '"> <span>' + CY.m(o) + '</span></label>';
          }).join('') + '</div><div class="qq-why muted small" style="display:none"></div></div>';
      }).join('') + '</div>' +
      '<div class="fb-actions"><button class="btn primary" id="quiz-submit">Check answers</button>' +
      '<button class="btn ghost" id="quiz-retry">Try again</button></div>';
    CY.qs('#quiz-submit', root).onclick = function () {
      var answers = qs.map(function (q, i) { var e = CY.qs('input[name="q' + i + '"]:checked', root); return e ? +e.value : -1; });
      var correct = 0;
      qs.forEach(function (q, i) {
        var box = CY.qs('.quiz-q[data-q="' + i + '"]', root);
        var ok = answers[i] === q.a; if (ok) correct++;
        box.classList.toggle('right', ok); box.classList.toggle('wrong', !ok);
        var why = CY.qs('.qq-why', box); why.style.display = 'block';
        why.innerHTML = (ok ? '&#10003; Correct. ' : '&#10007; Correct answer: <b>' + CY.m(q.options[q.a]) + '</b>. ') + CY.m(q.why);
        CY.qsa('.qq-opt', box).forEach(function (o, oi) { o.classList.toggle('is-correct', oi === q.a); });
      });
      var pct = Math.round((correct / qs.length) * 100), pass = act.pass || 70;
      banner(root, pct >= pass, 'Score: <b>' + correct + '/' + qs.length + '</b> (' + pct + '%)' + (pct >= pass ? ' &mdash; passed!' : ' &mdash; read the explanations and try again (need ' + pass + '%).'));
      onDone(pct >= pass, pct, { correct: correct, total: qs.length });
    };
    CY.qs('#quiz-retry', root).onclick = function () { quiz(root, act, onDone); };
  }

  /* ---------------- pick (spot the red flags) ---------------- */
  function pick(root, act, onDone) {
    var items = act.items;
    var sel = items.map(function () { return false; });
    var checked = false;
    function render(pct, ok) {
      root.innerHTML = '<p class="act-prompt">' + CY.m(act.prompt) + '</p>' +
        '<ul class="pick-list">' + items.map(function (it, i) {
          var state = checked ? (it.correct === sel[i] ? 'ok' : 'bad') : (sel[i] ? 'sel' : '');
          return '<li class="pick-item ' + state + '"><button class="pick-box" data-i="' + i + '">' + (sel[i] ? '&#10003;' : '') + '</button>' +
            '<span class="pi-text">' + CY.m(it.text) + '</span>' +
            (checked ? '<span class="pi-why muted small">' + it.why + '</span>' : '') + '</li>';
        }).join('') + '</ul>' +
        '<div class="fb-actions">' + (checked ? '' : '<button class="btn primary" id="pick-check">Check</button>') +
        '<button class="btn ghost" id="pick-reset">Reset</button></div>';
      if (!checked) {
        CY.qsa('.pick-box', root).forEach(function (b) { b.onclick = function () { sel[+b.dataset.i] = !sel[+b.dataset.i]; render(); }; });
        CY.qs('#pick-check', root).onclick = function () {
          checked = true;
          var right = items.filter(function (it, i) { return it.correct === sel[i]; }).length;
          var p = Math.round((right / items.length) * 100);
          render();
          banner(root, p >= (act.pass || 100), 'You got ' + right + '/' + items.length + ' right.' + (p >= (act.pass || 100) ? ' Nice eye!' : ' Review the highlighted items.'));
          onDone(p >= (act.pass || 100), p);
        };
      }
      CY.qs('#pick-reset', root).onclick = function () { sel = items.map(function () { return false; }); checked = false; render(); };
    }
    render();
  }

  /* ---------------- order (sequence) ---------------- */
  function order(root, act, onDone) {
    var rng = CY.makeRng(1234);
    var correctOrder = act.steps.slice();
    var work = rng.shuffle(act.steps.slice());
    var checked = false;
    function render() {
      root.innerHTML = '<p class="act-prompt">' + CY.m(act.prompt) + '</p>' +
        '<ul class="order-list">' + work.map(function (s, i) {
          var right = checked && s === correctOrder[i];
          return '<li class="order-item ' + (checked ? (right ? 'ok' : 'bad') : '') + '"><span class="oi-num">' + (i + 1) + '</span>' +
            '<span class="oi-text">' + CY.m(s) + '</span>' +
            '<span class="oi-move">' + (checked ? '' : '<button class="btn tiny ghost" data-up="' + i + '">&#8593;</button><button class="btn tiny ghost" data-dn="' + i + '">&#8595;</button>') + '</span></li>';
        }).join('') + '</ul>' +
        '<div class="fb-actions">' + (checked ? '' : '<button class="btn primary" id="order-check">Check order</button>') +
        '<button class="btn ghost" id="order-reset">Shuffle again</button></div>' +
        (checked ? '<p class="muted small">' + CY.m(act.why || '') + '</p>' : '');
      if (!checked) {
        CY.qsa('[data-up]', root).forEach(function (b) { b.onclick = function () { var i = +b.dataset.up; if (i > 0) { var t = work[i]; work[i] = work[i - 1]; work[i - 1] = t; render(); } }; });
        CY.qsa('[data-dn]', root).forEach(function (b) { b.onclick = function () { var i = +b.dataset.dn; if (i < work.length - 1) { var t = work[i]; work[i] = work[i + 1]; work[i + 1] = t; render(); } }; });
        CY.qs('#order-check', root).onclick = function () {
          checked = true;
          var right = work.filter(function (s, i) { return s === correctOrder[i]; }).length;
          var p = Math.round((right / work.length) * 100);
          render();
          banner(root, right === work.length, right === work.length ? 'Perfect sequence! &#127881;' : 'You placed ' + right + '/' + work.length + ' correctly.');
          onDone(right === work.length, p);
        };
      }
      CY.qs('#order-reset', root).onclick = function () { work = rng.shuffle(act.steps.slice()); checked = false; render(); };
    }
    render();
  }

  /* ---------------- match ---------------- */
  function match(root, act, onDone) {
    var terms = act.pairs.map(function (p) { return p[0]; });
    var defs = CY.makeRng(99).shuffle(act.pairs.map(function (p) { return p[1]; }));
    var assign = terms.map(function () { return null; });
    var selTerm = null, checked = false;
    function render() {
      root.innerHTML = '<p class="act-prompt">' + CY.m(act.prompt || 'Connect each term to its meaning.') + '</p>' +
        '<div class="match-grid">' +
          '<ul class="match-col">' + terms.map(function (t, i) {
            var p = act.pairs.filter(function (x) { return x[0] === t; })[0];
            var ok = checked && assign[i] === p[1];
            return '<li class="match-term ' + (selTerm === i ? 'sel' : '') + ' ' + (checked ? (ok ? 'ok' : 'bad') : '') + '" data-t="' + i + '"><b>' + CY.m(t) + '</b>' +
              (assign[i] ? '<small class="muted"> &rarr; ' + CY.esc(assign[i]) + '</small>' : '<small class="muted"> &rarr; click a definition</small>') + '</li>';
          }).join('') + '</ul>' +
          '<ul class="match-col">' + defs.map(function (d) {
            return '<li class="match-def" data-d="' + CY.esc(d) + '">' + CY.esc(d) + '</li>';
          }).join('') + '</ul>' +
        '</div>' +
        '<div class="fb-actions"><button class="btn primary" id="match-check">Check</button><button class="btn ghost" id="match-reset">Reset</button></div>';
      if (!checked) {
        CY.qsa('.match-term', root).forEach(function (li) { li.onclick = function () { selTerm = +li.dataset.t; render(); }; });
        CY.qsa('.match-def', root).forEach(function (li) { li.onclick = function () { if (selTerm != null) { assign[selTerm] = li.dataset.d; selTerm = null; render(); } }; });
        CY.qs('#match-check', root).onclick = function () {
          checked = true;
          var right = terms.filter(function (t, i) { var p = act.pairs.filter(function (x) { return x[0] === t; })[0]; return assign[i] === p[1]; }).length;
          render();
          banner(root, right === terms.length, right === terms.length ? 'All matched! &#127881;' : right + '/' + terms.length + ' correct.');
          onDone(right === terms.length, Math.round((right / terms.length) * 100));
        };
      }
      CY.qs('#match-reset', root).onclick = function () { assign = terms.map(function () { return null; }); checked = false; selTerm = null; render(); };
    }
    render();
  }

  /* ---------------- scenario ---------------- */
  function scenario(root, act, onDone) {
    var st = { node: act.start, score: 0, path: [], done: false };
    function render() {
      var node = act.nodes[st.node];
      if (!node) { st.done = true; return finish(); }
      root.innerHTML = '<div class="scenario">' +
        '<div class="sc-head">' + (act.title ? '<span class="sc-tag">' + CY.esc(act.title) + '</span>' : '') + '</div>' +
        '<div class="sc-text">' + CY.m(node.text) + '</div>' +
        '<div class="sc-options">' + (node.options || []).map(function (o, i) {
          return '<button class="sc-opt" data-i="' + i + '">' + CY.m(o.label) + '</button>';
        }).join('') + '</div>' +
        (node.tip ? '<p class="viz-note">' + CY.m(node.tip) + '</p>' : '') +
        '</div>';
      CY.qsa('.sc-opt', root).forEach(function (b) {
        b.onclick = function () {
          var o = node.options[+b.dataset.i];
          st.score += (o.score || 0);
          st.path.push(o.label);
          if (o.outcome) { st.node = null; st.outcome = o.outcome; finish(o); }
          else { st.node = o.next; render(); }
        };
      });
    }
    function finish(o) {
      var res = o || st.outcome || { text: 'Scenario complete.', good: st.score > 0 };
      var good = res.good != null ? res.good : st.score >= (act.pass || 1);
      root.innerHTML = '<div class="scenario done"><div class="sc-text">' + CY.m(res.text) + '</div>' +
        '<p class="muted small">Decisions: ' + st.path.map(function (p) { return CY.esc(p); }).join(' &rarr; ') + '</p>' +
        '<div class="fb-actions"><button class="btn ghost" id="sc-again">Try the scenario again</button></div></div>';
      banner(root, good, good ? '&#10003; Good judgement.' : '&#9888;&#65039; That choice would put the company at risk &mdash; see why above.');
      CY.qs('#sc-again', root).onclick = function () { st = { node: act.start, score: 0, path: [], done: false }; render(); };
      if (st.reported !== true) { st.reported = true; onDone(good, good ? 100 : 0); }
    }
    render();
  }

  /* ---------------- password ---------------- */
  function password(root, act, onDone) {
    var min = act.minScore || 3;
    root.innerHTML = '<p class="act-prompt">' + CY.m(act.prompt || 'Build a strong passphrase.') + '</p>' +
      '<div id="pwd-host"></div>' +
      '<div class="fb-actions"><button class="btn primary" id="pwd-check">Use this password</button></div>';
    CY.widget.passwordlab(CY.qs('#pwd-host', root), { start: act.start || '', mask: true });
    CY.qs('#pwd-check', root).onclick = function () {
      var pw = CY.qs('#pwd-host', root)._getPassword();
      var info = CY.passwordInfo(pw);
      var ok = info.score >= min && pw.length >= 12 && !info.common;
      if (ok) {
        banner(root, true, '&#10003; Strong passphrase (' + info.bits + ' bits &mdash; cracks in ' + CY.crackTime(info.seconds) + '). Store it in a password manager and reuse it nowhere.');
      } else {
        var tips = [];
        if (info.common) tips.push('it appears on every breach wordlist, so attackers try it first');
        if (pw.length < 12) tips.push('length matters more than cleverness &mdash; aim for 12+ characters (three random words is an easy way)');
        if (info.score < min) tips.push('it is too predictable &mdash; mixing words, numbers or symbols raises the crack cost');
        banner(root, false, '&#9888;&#65039; Not strong enough: ' + tips.join('; ') + '. Try again &mdash; a passphrase like three unrelated words works better than one mangled word.');
      }
      onDone(ok, ok ? 100 : 0, { bits: info.bits });
    };
  }

  /* ---------------- phish (inbox triage) ---------------- */
  function phish(root, act, onDone) {
    var emails = act.emails;
    var verdict = emails.map(function () { return null; });
    var checked = false;
    function render() {
      root.innerHTML = '<p class="act-prompt">' + CY.m(act.prompt || 'Decide: report as phishing, or trust it?') + '</p>' +
        emails.map(function (em, i) {
          var res = checked ? (verdict[i] === em.verdict ? 'ok' : 'bad') : '';
          return '<div class="phish-card ' + res + '">' + CY.emailHTML(em) +
            '<div class="phish-actions">' +
              '<button class="btn tiny ' + (verdict[i] === 'phish' ? 'primary' : '') + '" data-i="' + i + '" data-v="phish">&#128681; Report phishing</button>' +
              '<button class="btn tiny ' + (verdict[i] === 'safe' ? 'primary' : '') + '" data-i="' + i + '" data-v="safe">&#10003; Looks legitimate</button>' +
            '</div>' +
            (checked ? '<div class="phish-why ' + (verdict[i] === em.verdict ? 'ok' : 'bad') + '">' +
              (verdict[i] === em.verdict ? '&#10003; Correct. ' : '&#10007; Actually ' + em.verdict + '. ') + CY.m(em.why) +
              (em.flags ? '<ul class="tips-list">' + em.flags.map(function (f) { return '<li>' + CY.m(f) + '</li>'; }).join('') + '</ul>' : '') + '</div>' : '') +
            '</div>';
        }).join('') +
        '<div class="fb-actions">' + (checked ? '' : '<button class="btn primary" id="phish-check">Submit decisions</button>') + '<button class="btn ghost" id="phish-reset">Reset</button></div>';
      if (!checked) {
        CY.qsa('[data-v]', root).forEach(function (b) { b.onclick = function () { verdict[+b.dataset.i] = b.dataset.v; render(); }; });
        CY.qs('#phish-check', root).onclick = function () {
          checked = true;
          var right = emails.filter(function (em, i) { return verdict[i] === em.verdict; }).length;
          render();
          var p = Math.round((right / emails.length) * 100);
          banner(root, p >= (act.pass || 80), 'You triaged ' + right + '/' + emails.length + ' correctly.' + (p >= (act.pass || 80) ? ' Sharp instincts.' : ' Read the explanations below each email.'));
          onDone(p >= (act.pass || 80), p);
        };
      }
      CY.qs('#phish-reset', root).onclick = function () { verdict = emails.map(function () { return null; }); checked = false; render(); };
    }
    render();
  }
})(window.CY);
