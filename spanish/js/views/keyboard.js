// Spanish keyboard & accent trainer: how to type á é í ó ú ü ñ ¿ ¡, touch-typing
// drills for them, and a full reference. Works whether the OS Spanish layout is
// on (you can type the accented character directly) or off (use a dead key:
// apostrophe+vowel, quote+u, tilde+n — or click the accent bar).
import { esc } from '../ui.js';
import { FINGERS, ACCENT_ROWS, SPECIAL_CHARS, KEYBOARD_LESSONS, lessonById, deadCombine, isDeadKey, isSpecial, specialFor } from '../../data/keyboard-layout.js';
import { addXp, recordActivity, recordAccuracy } from '../state.js';

const TABS = ['layout', 'practice', 'reference'];

const SAMPLES = {
  'á': 'papá', 'é': 'café', 'í': 'aquí', 'ó': 'canción', 'ú': 'música', 'ü': 'pingüino', 'ñ': 'niño',
  'Á': 'África', 'É': 'Él', 'Í': 'Índice', 'Ó': 'Óscar', 'Ú': 'Úrsula', 'Ü': 'pingüino', 'Ñ': 'Ñandú',
  '¿': '¿Qué tal?', '¡': '¡Hola!'
};

function sampleFor(ch) { return SAMPLES[ch] || ch; }

export function render() {
  return `
  <section class="keyboard">
    <h1>Teclado <small>Spanish keyboard &amp; accents</small></h1>
    <p class="lead">Spanish uses the same QWERTY letters — the skill is the <b>accents</b> (á é í ó ú), the <b>eñe</b> (ñ), the <b>dieresis</b> (ü) and inverted punctuation (¿ ¡). Learn where they are, then drill them. Dead keys are translated for you, so no settings are needed.</p>
    <nav class="tabs">
      ${TABS.map((t) => `<button type="button" class="tab" data-action="tab" data-tab="${t}">${esc(cap(t))}</button>`).join('')}
    </nav>
    <div data-slot="content"></div>
  </section>`;
}

export function attach(root) {
  const content = root.querySelector && root.querySelector('[data-slot="content"]');
  if (!content) return;
  const renderTo = (t) => {
    content.innerHTML = TAB_RENDER[t]();
    bindTab(content, t);
  };
  if (root.addEventListener) {
    root.addEventListener('click', (e) => {
      const b = e.target.closest ? e.target.closest('[data-tab]') : null;
      if (!b) return;
      renderTo(b.getAttribute('data-tab'));
      if (root.querySelectorAll) root.querySelectorAll('.tab').forEach((el) => el.classList.toggle('active', el === b));
    });
  }
  renderTo('layout');
}

const TAB_RENDER = {
  layout: () => `
    <div class="keyboard-note">
      <b>Four ways to type any accent.</b> Pick whichever suits your keyboard — the drill below accepts all of them.
    </div>
    <div class="accent-bar-demo">
      <div class="mini">App accent bar — tap to insert:</div>
      ${ACCENT_ROWS.map((row) => `<div class="kbd-row">${row.map((ch) => `<button type="button" class="kkey" data-action="accent" data-ch="${esc(ch)}"><span class="kkey-es">${esc(ch)}</span></button>`).join('')}</div>`).join('')}
    </div>
    <div class="sp-grid">
      ${SPECIAL_CHARS.filter((s) => 'áéíóúüñ¿¡'.includes(s.ch)).map((s) => `
        <div class="sp-card">
          <div class="sp-big">${esc(s.ch)}</div>
          <div class="mini">${esc(s.name)}</div>
          <div class="sp-way"><b>Dead key:</b> <kbd>${esc(s.dead)}</kbd></div>
          <div class="sp-way"><b>Windows:</b> <kbd>${esc(s.win)}</kbd></div>
          <div class="sp-way"><b>macOS:</b> <kbd>${esc(s.mac)}</kbd></div>
        </div>`).join('')}
    </div>
    <details class="guide">
      <summary>How the Spanish layout works on your computer</summary>
      <ul>
        <li><b>Spanish layout:</b> press an accent key (a dead key) then the vowel — <kbd>´</kbd> + <kbd>a</kbd> = á. ñ has its own key next to the L. ¿ and ¡ sit on the key right of the 0.</li>
        <li><b>US layout, no setup:</b> use <b>Windows Alt codes</b> or <b>macOS Option</b> codes, or the app accent bar above.</li>
        <li><b>Dead-key trick (this app):</b> type <kbd>'</kbd> then a vowel → á é í ó ú; <kbd>"</kbd> then u → ü; <kbd>~</kbd> then n → ñ.</li>
        <li><b>Phone:</b> hold the vowel key and choose the accented version; hold n for ñ.</li>
      </ul>
    </details>
    <div data-slot="keydetail"></div>`,

  practice: () => `
    <div class="lesson-picker">
      ${KEYBOARD_LESSONS.map((l) => `<button type="button" class="chip" data-action="lesson" data-lesson="${l.id}">${esc(l.icon)} ${esc(l.title)}</button>`).join('')}
    </div>
    <p class="hint" data-slot="lesson-desc">Pick a lesson to begin.</p>
    <div data-slot="drill"></div>`,

  reference: () => `
    <p class="lead">Every special character with all four ways to produce it.</p>
    <div class="ref-table-wrap">
      <table class="ref-table">
        <thead><tr><th>Char</th><th>Name</th><th>Dead key</th><th>Windows Alt</th><th>macOS</th><th>Example</th><th>Audio</th></tr></thead>
        <tbody>
          ${SPECIAL_CHARS.map((s) => `<tr>
            <td class="ref-letter">${esc(s.ch)}</td>
            <td class="mini">${esc(s.name)}</td>
            <td><kbd>${esc(s.dead)}</kbd></td>
            <td><kbd>${esc(s.win)}</kbd></td>
            <td><kbd>${esc(s.mac)}</kbd></td>
            <td class="es">${esc(sampleFor(s.ch))}</td>
            <td><button type="button" class="ghost small" data-speak="${esc(sampleFor(s.ch))}">🔊</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
};

function specialDetail(s) {
  return `
  <div class="key-detail">
    <div class="kd-head">
      <span class="kd-letter">${esc(s.ch)}</span>
      <div>
        <div><b>${esc(s.name)}</b></div>
        <div><b>Dead key:</b> <kbd>${esc(s.dead)}</kbd></div>
        <div><b>Windows:</b> <kbd>${esc(s.win)}</kbd> · <b>macOS:</b> <kbd>${esc(s.mac)}</kbd></div>
      </div>
      <button type="button" class="ghost" data-speak="${esc(sampleFor(s.ch))}">🔊 Example</button>
    </div>
    <div class="ld-row"><b>Example:</b> <span class="es">${esc(sampleFor(s.ch))}</span></div>
  </div>`;
}

// ---------------------------------------------------------------------------
// Drill engine
// ---------------------------------------------------------------------------

function charsOf(str) { return Array.from(str); }

function drillModel(lesson, itemIndex, buffer, stats, startedAt) {
  const items = lesson.items;
  const target = items[itemIndex] || '';
  const tchars = charsOf(target);
  const done = buffer.length >= tchars.length && buffer === target;
  const wrongAt = firstMismatch(buffer, target);
  const elapsed = startedAt ? (Date.now() - startedAt) / 1000 : 0;
  const wpm = elapsed > 3 ? Math.round((stats.correct / 5) / (elapsed / 60)) : 0;
  const acc = stats.typed ? Math.round((stats.correct / stats.typed) * 100) : 100;
  return { lesson, itemIndex, items, target, tchars, buffer, done, wrongAt, wpm, acc, stats };
}

function firstMismatch(buffer, target) {
  const b = charsOf(buffer);
  const t = charsOf(target);
  for (let i = 0; i < b.length; i++) if (b[i] !== t[i]) return i;
  return -1;
}

function nextChar(model) {
  if (model.done) return null;
  return charsOf(model.target)[model.buffer.length] || null;
}

function renderTarget(model) {
  const t = charsOf(model.target);
  const b = charsOf(model.buffer);
  return t.map((ch, i) => {
    let cls = 'dt-char';
    if (i < b.length) cls += b[i] === ch ? ' ok' : ' bad';
    else if (i === b.length) cls += ' at';
    const label = ch === ' ' ? '&nbsp;' : esc(ch);
    return `<span class="${cls}">${label}</span>`;
  }).join('');
}

function renderAccentBar(model) {
  const expect = nextChar(model);
  return `<div class="accent-bar-demo compact">
    ${ACCENT_ROWS.map((row) => `<div class="kbd-row">${row.map((ch) => {
      const active = expect === ch;
      return `<span class="kkey tiny${active ? ' expected' : ''}" data-ch="${esc(ch)}"><span class="kkey-es">${esc(ch)}</span></span>`;
    }).join('')}</div>`).join('')}
  </div>`;
}

function renderHint(model) {
  const ch = nextChar(model);
  if (!ch) return '';
  if (!isSpecial(ch)) return `<p class="hint drill-hint" style="display:none">Next: <span class="es">${esc(ch)}</span></p>`;
  const s = specialFor(ch);
  if (!s) return '';
  return `<p class="hint drill-hint" style="display:none">Next — <span class="es">${esc(ch)}</span>: press <kbd>${esc(s.dead)}</kbd> (or Windows <kbd>${esc(s.win)}</kbd>, or tap the bar).</p>`;
}

function renderDrill(model) {
  const l = model.lesson;
  const progress = `${model.itemIndex + 1} / ${model.items.length}`;
  if (model.done) {
    return `
    <div class="drill">
      <div class="drill-head"><b>${esc(l.icon)} ${esc(l.title)}</b><span class="mini">${progress}</span></div>
      <div class="drill-complete">
        <div class="big-ok">¡Muy bien! ✓</div>
        <p>You typed <span class="es">${esc(model.target)}</span> correctly.</p>
        <div class="btn-row">
          ${model.itemIndex < model.items.length - 1
            ? '<button type="button" class="primary" data-action="nextItem">Next →</button>'
            : '<button type="button" class="primary" data-action="restart">Finish &amp; restart ↻</button>'}
          <button type="button" class="btn" data-action="replay" data-speak="${esc(model.target)}">🔊 Hear it</button>
        </div>
      </div>
      ${scoreline(model)}
    </div>`;
  }
  return `
  <div class="drill">
    <div class="drill-head"><b>${esc(l.icon)} ${esc(l.title)}</b><span class="mini">${progress}</span></div>
    <div class="drill-target" aria-live="polite">${renderTarget(model)}</div>
    <div class="drill-capture" data-slot="capture" tabindex="0" role="textbox" aria-label="Typing area">
      ${model.buffer ? `<span class="cap-text">${esc(model.buffer)}</span>` : '<span class="cap-hint">Click here, then type. Accents can be typed with dead keys.</span>'}
    </div>
    ${renderAccentBar(model)}
    <div class="accent-click-row">
      ${ACCENT_ROWS.flat().map((ch) => `<button type="button" class="kkey tiny" data-action="accent" data-ch="${esc(ch)}">${esc(ch)}</button>`).join('')}
    </div>
    <div class="drill-help">
      <button type="button" class="btn small" data-action="backspace">⌫ Backspace</button>
      <button type="button" class="btn small" data-action="clear">Clear</button>
      <button type="button" class="btn small" data-action="hint">💡 Show key</button>
      ${model.wrongAt >= 0 ? '<span class="mini bad">A character is wrong — fix it to continue.</span>' : '<span class="mini">Accents matter here — type them on purpose.</span>'}
    </div>
    ${renderHint(model)}
    ${scoreline(model)}
  </div>`;
}

function scoreline(model) {
  return `<div class="drill-stats">
    <span class="mini">Accuracy <b>${model.acc}%</b></span>
    <span class="mini">Correct <b>${model.stats.correct}</b></span>
    <span class="mini">Speed <b>${model.wpm} wpm</b></span>
  </div>`;
}

// ---------------------------------------------------------------------------
// Tab binding
// ---------------------------------------------------------------------------

let activeKeyHandler = null;

function bindTab(root, tab) {
  if (tab === 'layout') return bindLayout(root);
  if (tab === 'practice') return bindPractice(root);
  return undefined;
}

function bindLayout(root) {
  if (!root.addEventListener) return;
  root.addEventListener('click', (e) => {
    const b = e.target.closest ? e.target.closest('[data-action="accent"]') : null;
    if (!b) return;
    const s = specialFor(b.getAttribute('data-ch'));
    const det = root.querySelector && root.querySelector('[data-slot="keydetail"]');
    if (det && s) det.innerHTML = specialDetail(s);
  });
}

function bindPractice(root) {
  const slot = root.querySelector && root.querySelector('[data-slot="drill"]');
  if (!slot) return;
  let lesson = KEYBOARD_LESSONS[0];
  let itemIndex = 0;
  let buffer = '';
  let stats = { correct: 0, typed: 0 };
  let startedAt = 0;
  let hintOn = false;
  let pendingDead = null;

  const desc = root.querySelector && root.querySelector('[data-slot="lesson-desc"]');

  const focusCapture = () => {
    const cap = slot.querySelector && slot.querySelector('[data-slot="capture"]');
    if (cap && cap.focus) try { cap.focus(); } catch { /* ignore */ }
  };

  const model = () => drillModel(lesson, itemIndex, buffer, stats, startedAt);
  const paint = () => { slot.innerHTML = renderDrill(model()); };

  const startLesson = (l) => {
    lesson = l; itemIndex = 0; buffer = ''; stats = { correct: 0, typed: 0 }; startedAt = 0; hintOn = false; pendingDead = null;
    if (desc) desc.textContent = l.desc;
    paint();
    focusCapture();
  };

  const typeChar = (ch) => {
    if (!startedAt) startedAt = Date.now();
    const expected = charsOf(model().target)[buffer.length];
    if (!expected) return;
    buffer += ch;
    stats.typed++;
    if (ch === expected) stats.correct++;
    paint();
    focusCapture();
  };

  const backspace = () => { if (buffer) { buffer = buffer.slice(0, -1); paint(); focusCapture(); } };

  const handleKeydown = (e) => {
    if (document && document.contains && !document.contains(slot)) {
      document.removeEventListener('keydown', activeKeyHandler);
      return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const key = e.key;
    if (key === 'Backspace') { e.preventDefault(); backspace(); return; }
    if (key === 'Enter') { const m = model(); if (m.done) { e.preventDefault(); advance(); } return; }
    if (key === 'Escape') { buffer = ''; pendingDead = null; paint(); focusCapture(); return; }
    if (key === ' ') { e.preventDefault(); pendingDead = null; typeChar(' '); return; }
    // Dead key: remember it, type the next letter with the accent.
    if (isDeadKey(key)) { e.preventDefault(); pendingDead = key; return; }
    if (pendingDead && key.length === 1) {
      const combined = deadCombine(pendingDead, key);
      pendingDead = null;
      if (combined) { e.preventDefault(); typeChar(combined); return; }
    }
    if (key.length === 1) { e.preventDefault(); typeChar(key); }
  };

  const advance = () => {
    if (itemIndex < lesson.items.length - 1) { itemIndex++; buffer = ''; paint(); focusCapture(); }
    else finishLesson();
  };

  const finishLesson = () => {
    addXp(15); recordActivity(); recordAccuracy('keyboard', true, 1);
    const acc = stats.typed ? stats.correct / stats.typed : 1;
    slot.innerHTML = `
      <div class="drill">
        <div class="big-ok">🏝 ${esc(lesson.icon)} ${esc(lesson.title)} — complete!</div>
        <p>Accuracy <b>${Math.round(acc * 100)}%</b> across ${stats.typed} keystrokes.</p>
        <div class="btn-row"><button type="button" class="primary" data-action="restart">Practice again ↻</button></div>
      </div>`;
  };

  if (activeKeyHandler && document && document.removeEventListener) document.removeEventListener('keydown', activeKeyHandler);
  activeKeyHandler = handleKeydown;
  if (document && document.addEventListener) document.addEventListener('keydown', activeKeyHandler);

  if (root.querySelectorAll) {
    root.querySelectorAll('[data-action="lesson"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        startLesson(lessonById(btn.getAttribute('data-lesson')));
        root.querySelectorAll('[data-action="lesson"]').forEach((b) => b.classList.toggle('active', b === btn));
      });
    });
  }
  if (root.addEventListener) {
    root.addEventListener('click', (e) => {
      const b = e.target.closest ? e.target.closest('[data-action]') : null;
      if (!b) return;
      const a = b.getAttribute('data-action');
      if (a === 'nextItem') advance();
      else if (a === 'restart') startLesson(lesson);
      else if (a === 'backspace') backspace();
      else if (a === 'clear') { buffer = ''; pendingDead = null; paint(); focusCapture(); }
      else if (a === 'hint') { hintOn = !hintOn; const h = slot.querySelector && slot.querySelector('.drill-hint'); if (h) h.style.display = hintOn ? 'block' : 'none'; }
      else if (a === 'accent') { const ch = b.getAttribute('data-ch'); if (ch) typeChar(ch); }
    });
  }

  startLesson(lesson);
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
