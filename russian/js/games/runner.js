// Session driver shared by all games: question shell, feedback, results, timer.
import { KEY_ROWS } from '../keyboard.js';
import { esc } from '../ui.js';
import { finishSession, answerRecord, grade, difficultyConf } from './logic.js';
import { play, confetti, autoSpeak } from '../fun.js';

export function onSelectKeyboard(container, input) {
  const html = KEY_ROWS.map((row) =>
    `<div class="krow">${row.map((k) => `<button type="button" class="key" data-key="${k}">${k}</button>`).join('')}</div>`
  ).join('');
  container.innerHTML = `<div class="onkey">${html}</div>`;
  container.addEventListener('click', (e) => {
    const b = e.target.closest ? e.target.closest('[data-key]') : null;
    if (!b) return;
    const k = b.getAttribute('data-key');
    const pos = (input.selectionStart != null ? input.selectionStart : input.value.length);
    const end = (input.selectionEnd != null ? input.selectionEnd : pos);
    input.value = input.value.slice(0, pos) + k + input.value.slice(end);
    input.focus();
  });
}

export function runGame(root, cfg) {
  const { game, session, rng = Math.random, onComplete, again } = cfg;
  const { questions, speedMs } = session;
  const diff = difficultyConf(session.difficulty);
  let qIndex = 0;
  let scheduled = null;

  function clearT() { if (scheduled) { clearTimeout(scheduled); scheduled = null; } }

  function show(i) {
    clearT();
    if (i >= questions.length) { finish(); return; }
    qIndex = i;
    const q = questions[i];
    root.innerHTML = `
      <section class="game-shell">
        <div class="game-head">
          <span>${game.icon}</span>
          <strong>${esc(game.title)}</strong>
          <span class="pill">${esc(diff.label)}</span>
        </div>
        <div class="progress"><div class="progress-fill" style="width:${Math.round(((i + 1) / questions.length) * 100)}%"></div></div>
        <div class="game-prompt">${q.promptHtml || esc(q.prompt || '')}</div>
        <div class="game-body" data-slot="body"></div>
        <div class="feedback hidden" data-slot="fb" role="status" aria-live="polite">
          <button type="button" class="primary" data-action="next">Next →</button>
        </div>
      </section>`;
    const body = root.querySelector('[data-slot="body"]');
    const fb = root.querySelector('[data-slot="fb"]');
    renderBody(q, body, fb, i);
    if (session.timers && speedMs) {
      if (typeof window !== 'undefined') {
        scheduled = setTimeout(() => { if (root.innerHTML.includes('game-shell')) timedOut(q, i); }, speedMs);
      }
    }
  }

  function renderBody(q, body, fb, i) {
    if (q.customRender) return q.customRender(body, (val) => accept(q, val, i, fb));
    if (q.type === 'mc') {
      bind(body, '[data-action="mc"]', (el) => accept(q, el.getAttribute('data-value'), i, fb));
      body.innerHTML = `<div class="mc-grid">${q.options.map((o) =>
        `<button type="button" class="mc-btn" data-action="mc" data-value="${esc(o)}">${esc(o)}</button>`).join('')}</div>`;
    } else if (q.type === 'type') {
      body.innerHTML = `
        <div class="type-wrap">
          <input class="game-input" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Type in Russian…" data-slot="input">
          <div class="kbd" data-slot="kbd"></div>
          <button type="button" class="primary" data-action="submit">Check ✓</button>
        </div>`;
      const input = body.querySelector('[data-slot="input"]');
      onSelectKeyboard(body.querySelector('[data-slot="kbd"]'), input);
      input.focus();
      bind(body, '[data-action="submit"]', () => { if (input.value.trim()) accept(q, input.value, i, fb); });
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { if (input.value.trim()) accept(q, input.value, i, fb); } });
    } else if (q.type === 'sort') {
      renderSort(q, body, i, fb);
    } else if (q.type === 'grid') {
      q.customRender(body, i === qIndex ? (val, idx) => accept(q, val, idx, fb) : () => {});
    }
  }

  function renderSort(q, body, i, fb) {
    body.innerHTML = `
      <div class="sort-word">${esc(q.ru)}</div>
      <div class="sort-selected" data-slot="sel"></div>
      <div class="sort-tokens">${q.tokens.map((t, ti) =>
        `<button type="button" class="stok" data-action="tok" data-i="${ti}">${esc(t)}</button>`).join('')}</div>
      <button type="button" class="ghost" data-action="reset">↺ Reset</button>
      <button type="button" class="primary" data-action="check-sort">Check ✓</button>`;
    const selEl = body.querySelector('[data-slot="sel"]');
    const add = (idx) => { q._sel = q._sel.filter((x) => x !== idx); q._sel.push(idx); paint(); };
    const remove = (idx) => { q._sel = q._sel.filter((x) => x !== idx); paint(); };
    const paint = () => {
      const map = {};
      q._sel.forEach((idx, order) => { map[q.tokens[idx]] = order + 1; });
      selEl.innerHTML = q._sel.map((idx) => `<span class="picked" data-i="${idx}">${esc(q.tokens[idx])} ✕</span>`).join('')
        || '<span class="hint">Tap the words (or letters) in the right order.</span>';
      bind(selEl, '.picked', (el2) => remove(Number(el2.getAttribute('data-i'))));
      // refreshed each paint - bind works since we re-bind
    };
    q._sel = q._sel || [];
    paint();
    body.addEventListener('click', (e) => {
      const tok = e.target.closest ? e.target.closest('[data-action="tok"]') : null;
      if (tok) { add(Number(tok.getAttribute('data-i'))); return; }
      const reset = e.target.closest ? e.target.closest('[data-action="reset"]') : null;
      if (reset) { q._sel = []; paint(); return; }
      const chk = e.target.closest ? e.target.closest('[data-action="check-sort"]') : null;
      if (chk) accept(q, q._sel.map((x) => q.tokens[x]), i, fb);
    });
  }

  function accept(q, val, i, fb) {
    const graded = grade(q, val);
    const rec = answerRecord(q, val, graded, Date.now());
    rec.ok = graded.ok && val !== undefined;
    session.answers[i] = rec;
    if (cfg.onFeedback) cfg.onFeedback(rec, q);
    play(rec.ok ? 'correct' : 'wrong');
    if (q.ru) autoSpeak(q.ru);
    clearT();
    fb.classList.remove('hidden');
    const timed = val === undefined;
    const head = timed ? '⏱ Time out' : rec.ok ? 'Correct!' : 'Not quite';
    const face = rec.ok ? '✅' : timed ? '⏱' : '❌';
    const correctText = graded.accepted;
    const nextLabel = i === questions.length - 1 ? 'See results' : 'Next →';
    fb.innerHTML = `
      <div class="face">${face} ${head}</div>
      ${q.ru ? `<div class="show-answer"><span class="ru">${esc(q.ru)}</span> ${q.en ? `<span class="en">${esc(q.en)}</span>` : ''}</div>` : ''}
      ${!rec.ok && correctText ? `<div class="you-said">You: <b>${esc(rec.user == null || rec.user === '' ? '—' : rec.user)}</b> · Right: <b>${esc(correctText)}</b></div>` : ''}
      ${q.explain ? `<div class="explain">${esc(q.explain)}</div>` : ''}
      <button type="button" class="primary" data-action="next">${nextLabel}</button>`;
    bind(fb, '[data-action="next"]', () => show(i + 1));
  }

  function timedOut(q, i) {
    const fb = root.querySelector('[data-slot="fb"]');
    if (!fb) return;
    accept(q, undefined, i, fb);
  }

  function finish() {
    clearT();
    root.innerHTML = '';
    const r = finishSession(session);
    root.innerHTML = `
      <section class="results">
        <h2>${r.perfect ? '🏆 Perfect run!' : 'Results'}</h2>
        <div class="combo-count">${r.ok}/${r.total} correct · +${r.xp} XP</div>
        <div class="progress"><div class="progress-fill" style="width:${r.pct}%"></div></div>
        <p class="acc-label">${esc(acc(r.pct))}</p>
        ${r.mistakes.length ? `<div class="mistake-list"><h3>Review your mistakes</h3>${r.mistakes.map((m) =>
          `<div class="mistake"><div class="m-q">${esc(m.prompt)}</div><div class="m-a">You: <b>${esc(m.user || '—')}</b> · Right: <b>${esc(m.correct || '?')}</b></div></div>`).join('')}</div>` : '<p>No mistakes. <a href="#/review">Words go to your review queue for later.</a></p>'}
        <div class="btn-row">
          <button type="button" class="primary" data-action="again">Play again</button>
          <a class="btn ghost" href="#/practice">More games</a>
        </div>
      </section>`;
    if (r.perfect) { play('win'); confetti(root); }
    bind(root, '[data-action="again"]', () => { if (again) again(); else show(0); });
    if (onComplete) onComplete(r);
  }

  show(0);
}

function acc(pct) {
  if (pct >= 95) return 'Excellent';
  if (pct >= 80) return 'Good';
  if (pct >= 60) return 'Getting there';
  return 'Keep practicing';
}

// Tiny event binding that doesn't require querySelectorAll to be precise.
function bind(scope, sel, fn, once) {
  if (!scope || !scope.addEventListener || typeof fn !== 'function') return;
  const handler = (e) => {
    // Ignore clicks on elements that were removed during this same event
    // (e.g. a button replaced when the view re-rendered) — otherwise a stale
    // bubbling event could fire a just-added listener and restart the session.
    if (e.target && e.target.isConnected === false) return;
    const el = e.target && e.target.closest ? e.target.closest(sel) : null;
    if (el) fn(el, e);
    if (once) scope.removeEventListener('click', handler);
  };
  scope.addEventListener('click', handler);
}