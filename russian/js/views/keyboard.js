// Russian keyboard trainer: layout map, touch-typing lessons and a typing drill.
// Works whether the OS Russian layout is on (Cyrillic keydowns) or off
// (Latin keydowns are translated through the standard ЙЦУКЕН map).
import { esc } from '../ui.js';
import { LETTERS } from '../../data/index.js';
import { letterBy } from '../../data/letters.js';
import { FINGERS, KEY_ROWS_DATA, KEYBOARD_LESSONS, lessonById, usFromRu, fingerForRu, ruFromKeydown } from '../../data/keyboard-layout.js';
import { addXp, recordActivity, recordAccuracy } from '../state.js';

const TABS = ['layout', 'practice', 'reference'];

function letterFor(ru) {
  return letterBy(ru) || null;
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

export function render() {
  return `
  <section class="keyboard">
    <h1>Клавиату́ра <small>Russian keyboard trainer</small></h1>
    <p class="lead">A bought Russian keyboard only helps once your fingers know the ЙЦУКЕН layout. Learn which key is which, drill your touch typing, and test your speed. Your physical US keys are translated for you — no settings needed.</p>
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
    bindTab(content, t, renderTo);
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
      <b>ЙЦУКЕН</b> is the standard layout. On a US/ANSI keyboard the letter keys map like this —
      the big letter is what you get, the small letter is the physical key to press.
      Don’t look down: every key colour is a finger.
    </div>
    <div class="kbd-layout">
      ${KEY_ROWS_DATA.map((row) => `
        <div class="kbd-rowwrap">
          <div class="kbd-row">
            ${row.keys.map((k) => keyBtn(k)).join('')}
          </div>
          <span class="mini kbd-rownote">${esc(row.name)}</span>
        </div>`).join('')}
    </div>
    <div class="finger-legend">
      ${Object.entries(FINGERS).map(([id, f]) => `<span class="finger fng ${f.color}">${esc(f.short)} <i>${esc(f.label)}</i></span>`).join('')}
    </div>
    <details class="guide">
      <summary>Enable the Russian layout on your computer (so you can type it anywhere)</summary>
      <ul>
        <li><b>Windows:</b> Settings → Time &amp; Language → Language &amp; region → <b>Add a language</b> → Русский. Then switch with <kbd>Win</kbd>+<kbd>Space</kbd> or <kbd>Alt</kbd>+<kbd>Shift</kbd>. The taskbar shows RU.</li>
        <li><b>macOS:</b> System Settings → Keyboard → Input Sources → <b>+</b> → Russian (Phonetic is easiest for beginners; “Russian” is the standard ЙЦУКЕН). Switch with <kbd>Ctrl</kbd>+<kbd>Space</kbd>. The menu bar shows a flag.</li>
        <li><b>Linux:</b> Settings → Keyboard → Layouts → <b>+</b> → Russian (ЙЦУКЕН). Switch with your configured shortcut (often <kbd>Super</kbd>+<kbd>Space</kbd>).</li>
        <li><b>Android / iOS:</b> Settings → Languages/Keyboard → add the Russian keyboard, then swipe the spacebar to switch.</li>
      </ul>
      <p class="hint">The trainer works <b>either way</b>: if the Russian layout is off, your Latin key presses are translated to Russian for you; if it’s on, your Cyrillic key presses are accepted directly.</p>
    </details>
    <div data-slot="keydetail"></div>`,

  practice: () => `
    <div class="lesson-picker">
      ${KEYBOARD_LESSONS.map((l) => `<button type="button" class="chip" data-action="lesson" data-lesson="${l.id}">${esc(l.icon)} ${esc(l.title)}</button>`).join('')}
    </div>
    <p class="hint" data-slot="lesson-desc">Pick a lesson to begin.</p>
    <div data-slot="drill"></div>`,

  reference: () => `
    <p class="lead">Plain reference: every Cyrillic letter, the physical key that types it, the finger that owns it, and how it sounds.</p>
    <div class="ref-table-wrap">
      <table class="ref-table">
        <thead><tr><th>Letter</th><th>Key</th><th>Shift</th><th>Finger</th><th>Sound</th><th>Example</th><th>Audio</th></tr></thead>
        <tbody>
          ${LETTERS.map((l) => {
            const us = usFromRu(l.lower) || '—';
            const finger = fingerForRu(l.lower);
            const f = finger ? FINGERS[finger] : null;
            return `<tr>
              <td class="ref-letter">${esc(l.upper)} ${esc(l.lower)}</td>
              <td><kbd>${esc(us)}</kbd></td>
              <td><kbd>${esc(us === '—' ? '—' : us.toUpperCase())}</kbd></td>
              <td>${f ? `<span class="finger fng ${f.color}">${esc(f.short)}</span>` : '—'}</td>
              <td class="mini">${esc(l.approx)}</td>
              <td class="ru">${esc(l.example)} <i class="mini">${esc(l.gloss)}</i></td>
              <td><button type="button" class="ghost small" data-speak="${esc(l.example)}">🔊</button></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>`
};

function keyBtn(k) {
  const f = FINGERS[k.finger];
  const cls = ['kkey', f ? f.color : '', k.home ? 'home-key' : '', k.same ? 'same-key' : ''].filter(Boolean).join(' ');
  return `<button type="button" class="${cls}" data-action="key" data-ru="${esc(k.ru)}" title="Key ${esc(k.us)} → ${esc(k.ru)}">
    <span class="kkey-ru">${esc(k.ru)}</span>
    <span class="kkey-us">${esc(k.us)}</span>
  </button>`;
}

function keyDetail(k) {
  const l = letterFor(k.ru);
  const f = FINGERS[k.finger];
  return `
  <div class="key-detail">
    <div class="kd-head">
      <span class="kd-letter">${esc(k.upper)}${esc(k.ru)}</span>
      <div>
        <div><b>Physical key:</b> <kbd>${esc(k.us)}</kbd> (Shift → ${esc(k.upper)})</div>
        ${f ? `<div><b>Finger:</b> <span class="finger fng ${f.color}">${esc(f.short)} ${esc(f.label)}</span></div>` : ''}
      </div>
      <button type="button" class="ghost" data-speak="${esc(l ? l.example : k.ru)}">🔊 Hear it</button>
    </div>
    ${l ? `
      <div class="ld-row"><b>Name:</b> ${esc(l.name)} (${esc(l.nameT)})</div>
      <div class="ld-row"><b>Sound:</b> ${esc(l.approx)}</div>
      <div class="ld-row"><b>Example:</b> <span class="ru">${esc(l.example)}</span> — <i>${esc(l.gloss)}</i></div>
      <div class="ld-row"><b>Memory hook:</b> ${esc(l.mnemonic)}</div>` : ''}
  </div>`;
}

// ---------------------------------------------------------------------------
// Drill engine (pure-ish helpers + DOM wiring)
// ---------------------------------------------------------------------------

function charsOf(str) {
  return Array.from(str);
}

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
  for (let i = 0; i < b.length; i++) {
    if (b[i] !== t[i]) return i;
  }
  return -1;
}

function nextKeyChar(model) {
  if (model.done) return null;
  const t = charsOf(model.target);
  return t[model.buffer.length] || null;
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

function renderKeyboard(model) {
  const expect = nextKeyChar(model);
  return `<div class="kbd-layout compact">
    ${KEY_ROWS_DATA.map((row) => `<div class="kbd-row">${row.keys.map((k) => {
      const active = expect && expect.toLowerCase() === k.ru;
      const f = FINGERS[k.finger];
      return `<span class="kkey tiny ${f ? f.color : ''}${active ? ' expected' : ''}"><span class="kkey-ru">${esc(k.ru)}</span><span class="kkey-us">${esc(k.us)}</span></span>`;
    }).join('')}</div>`).join('')}
  </div>`;
}

function renderDrill(model) {
  const l = model.lesson;
  const progress = `${model.itemIndex + 1} / ${model.items.length}`;
  if (model.done) {
    return `
    <div class="drill">
      <div class="drill-head"><b>${esc(l.icon)} ${esc(l.title)}</b><span class="mini">${progress}</span></div>
      <div class="drill-complete">
        <div class="big-ok">✓ Гото́во!</div>
        <p>You typed <span class="ru">${esc(model.target)}</span> correctly.</p>
        <div class="btn-row">
          ${model.itemIndex < model.items.length - 1
            ? '<button type="button" class="primary" data-action="nextItem">Next →</button>'
            : '<button type="button" class="primary" data-action="restart">Finish &amp; restart ↻</button>'}
          <button type="button" class="btn" data-action="replay" data-speak="${esc(model.target)}">🔊 Hear it</button>
        </div>
      </div>
      ${renderScoreline(model)}
    </div>`;
  }
  return `
  <div class="drill">
    <div class="drill-head"><b>${esc(l.icon)} ${esc(l.title)}</b><span class="mini">${progress}</span></div>
    <div class="drill-target" aria-live="polite">${renderTarget(model)}</div>
    <div class="drill-capture" data-slot="capture" tabindex="0" role="textbox" aria-label="Typing area">
      ${model.buffer ? `<span class="cap-text">${esc(model.buffer)}</span>` : '<span class="cap-hint">Click here, then type. Latin keys are translated for you.</span>'}
    </div>
    ${renderKeyboard(model)}
    <div class="drill-help">
      <button type="button" class="btn small" data-action="backspace">⌫ Backspace</button>
      <button type="button" class="btn small" data-action="clear">Clear</button>
      <button type="button" class="btn small" data-action="hint">💡 Show key</button>
      ${model.wrongAt >= 0 ? '<span class="mini bad">A letter is wrong — fix it to continue.</span>' : '<span class="mini">Type with your real fingers, not your eyes.</span>'}
    </div>
    ${renderHint(model)}
    ${renderScoreline(model)}
  </div>`;
}

function renderHint(model) {
  const ch = nextKeyChar(model);
  if (!ch) return '';
  const us = usFromRu(ch);
  const f = FINGERS[fingerForRu(ch)];
  if (!us) return '';
  return `<p class="hint drill-hint" style="display:none">Next — press <kbd>${esc(us)}</kbd> (Shift for capitals) with your ${f ? esc(f.label.toLowerCase()) : 'finger'} → <span class="ru">${esc(ch)}</span></p>`;
}

function renderScoreline(model) {
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

function bindTab(root, tab, renderTo) {
  if (tab === 'layout') return bindLayout(root);
  if (tab === 'practice') return bindPractice(root);
  return undefined;
}

function bindLayout(root) {
  if (!root.addEventListener) return;
  root.addEventListener('click', (e) => {
    const b = e.target.closest ? e.target.closest('[data-action="key"]') : null;
    if (!b) return;
    const ru = b.getAttribute('data-ru');
    const k = KEY_ROWS_DATA.flatMap((r) => r.keys).find((x) => x.ru === ru);
    const det = root.querySelector && root.querySelector('[data-slot="keydetail"]');
    if (det && k) det.innerHTML = keyDetail(k);
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

  const desc = root.querySelector && root.querySelector('[data-slot="lesson-desc"]');

  const focusCapture = () => {
    const cap = slot.querySelector && slot.querySelector('[data-slot="capture"]');
    if (cap && cap.focus) try { cap.focus(); } catch { /* ignore */ }
  };

  const model = () => drillModel(lesson, itemIndex, buffer, stats, startedAt);
  const paint = () => { slot.innerHTML = renderDrill(model()); };

  const startLesson = (l) => {
    lesson = l; itemIndex = 0; buffer = ''; stats = { correct: 0, typed: 0 }; startedAt = 0; hintOn = false;
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
    if (e.ctrlKey || e.metaKey || e.altKey) return; // never swallow browser shortcuts
    const key = e.key;
    if (key === 'Backspace') { e.preventDefault(); backspace(); return; }
    if (key === 'Enter') {
      const m = model();
      if (m.done) { e.preventDefault(); advance(); }
      return;
    }
    if (key === 'Escape') { buffer = ''; paint(); focusCapture(); return; }
    if (key === ' ') { e.preventDefault(); typeChar(' '); return; }
    const ru = ruFromKeydown(key);
    if (ru) { e.preventDefault(); typeChar(ru); }
  };

  const advance = () => {
    if (itemIndex < lesson.items.length - 1) { itemIndex++; buffer = ''; paint(); focusCapture(); }
    else { finishLesson(); }
  };

  const finishLesson = () => {
    addXp(15); recordActivity(); recordAccuracy('keyboard', true, 1);
    const acc = stats.typed ? stats.correct / stats.typed : 1;
    slot.innerHTML = `
      <div class="drill">
        <div class="big-ok">🏁 ${esc(lesson.icon)} ${esc(lesson.title)} — complete!</div>
        <p>Accuracy <b>${Math.round(acc * 100)}%</b> across ${stats.typed} keystrokes.</p>
        <div class="btn-row"><button type="button" class="primary" data-action="restart">Practice again ↻</button></div>
      </div>`;
  };

  // Remove any handler from a previous visit, then install ours.
  if (activeKeyHandler && document && document.removeEventListener) {
    document.removeEventListener('keydown', activeKeyHandler);
  }
  activeKeyHandler = handleKeydown;
  if (document && document.addEventListener) document.addEventListener('keydown', activeKeyHandler);

  if (root.querySelectorAll) {
    root.querySelectorAll('[data-action="lesson"]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const l = lessonById(btn.getAttribute('data-lesson'));
        startLesson(l);
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
      else if (a === 'clear') { buffer = ''; paint(); focusCapture(); }
      else if (a === 'hint') { hintOn = !hintOn; const h = slot.querySelector && slot.querySelector('.drill-hint'); if (h) h.style.display = hintOn ? 'block' : 'none'; }
      else if (a === 'capture') focusCapture();
    });
  }

  startLesson(lesson);
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
