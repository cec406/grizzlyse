// Alphabet & pronunciation hub: chart, learning groups, exercises, guides.
import { esc } from '../ui.js';
import { LETTERS, PRONUNCIATION_GUIDES, LETTER_GROUPS, GROUP_NAMES } from '../../data/index.js';
import { letterBy } from '../../data/letters.js';
import { markLetters, addXp, recordActivity } from '../state.js';
import { soundExercise, flashExercise, readExercise, typeExercise, drillExercise } from './alphabet-exercises.js';

const TABS = ['chart', 'groups', 'exercises', 'guides'];
const EXERCISES = { sound: soundExercise, flash: flashExercise, read: readExercise, type: typeExercise, drill: drillExercise };

export function render() {
  return `
  <section class="alphabet">
    <h1>Алфави́т <small>the Russian alphabet</small></h1>
    <p class="lead">33 letters, no exceptions — just groups you already know, false friends that trick you, and shapes that are new.</p>
    <nav class="tabs">
      ${TABS.map((t) => `<button type="button" class="tab" data-action="tab" data-tab="${t}">${esc(cap(t))}</button>`).join('')}
    </nav>
    <div data-slot="content"></div>
  </section>`;
}

export function attach(root) {
  const content = root.querySelector('[data-slot="content"]');
  if (!content) return;
  const renderTo = (t) => {
    content.innerHTML = TAB_RENDER[t]();
    bindTabContent(content, t);
  };
  if (root.addEventListener) {
    root.addEventListener('click', (e) => {
      const b = e.target.closest ? e.target.closest('[data-tab]') : null;
      if (b) {
        renderTo(b.getAttribute('data-tab'));
        if (root.querySelectorAll) root.querySelectorAll('.tab').forEach((el) => el.classList.toggle('active', el === b));
      }
    });
  }
  renderTo('chart');
}

function bindTabContent(root, tab) {
  if (!root.addEventListener) return;
  root.addEventListener('click', (e) => {
    const b = e.target.closest ? e.target.closest('[data-action]') : null;
    const action = b && b.getAttribute('data-action');
    if (!action) return;
    if (action === 'letter') {
      const l = letterBy(b.getAttribute('data-letter'));
      const det = root.querySelector('[data-slot="detail"]');
      if (det) det.innerHTML = letterDetail(l);
      markLetters([l.upper + l.lower]);
    } else if (action === 'flush-letter') {
      const det = root.querySelector('[data-slot="detail"]');
      if (det) det.innerHTML = '';
    } else if (action === 'hear-all') {
      for (const l of LETTERS) if (window.speak) window.speak(l.example);
    } else if (action === 'mark-all') {
      markLetters(LETTERS.map((l) => l.upper + l.lower));
      addXp(15); recordActivity();
      if (b) b.textContent = 'Marked ✓';
    } else if (action.startsWith('ex-')) {
      const which = action.slice(3);
      const slot = root.querySelector('[data-slot="ex"]');
      if (slot && EXERCISES[which]) EXERCISES[which](slot);
    }
  });
}

const TAB_RENDER = {
  chart: () => `
    <div class="chart-toolbar">
      <div class="alpha-legend">
        <span><b class="lg lg1"></b> Like English (А К М О Т)</span>
        <span><b class="lg lg2"></b> False friends (В Е Н Р С У Х)</span>
        <span><b class="lg lg3"></b> New shapes</span>
        <span><b class="lg lg4"></b> Signs (Ъ Ь)</span>
      </div>
      <button type="button" class="ghost" data-action="hear-all">🔊 Read all</button>
    </div>
    <div class="letter-grid">
      ${LETTERS.map((l) => letterCard(l)).join('')}
    </div>
    <div data-slot="detail"></div>`,
  groups: () => `
    ${LETTER_GROUPS.map((g, gi) => `
      <div class="gstep">
        <h3>Step ${gi + 1}: ${esc(GROUP_NAMES[gi])}</h3>
        <div class="letter-grid small">${g.map((up) => { const l = letterBy(up); return l ? letterCard(l) : ''; }).join('')}</div>
      </div>`).join('')}
    <button type="button" class="primary" data-action="mark-all">Mark all 33 as seen</button>`,
  exercises: () => `
    <div class="ex-grid">
      <div class="ex-card"><h3>🔤 Sound ↔ letter match</h3><p>Both directions: hear a sound, find the letter, and back.</p><button type="button" class="primary" data-action="ex-sound">Start</button></div>
      <div class="ex-card"><h3>🗂 Alphabet flashcards</h3><p>Letter + example word, graded with spaced repetition.</p><button type="button" class="primary" data-action="ex-flash">Start</button></div>
      <div class="ex-card"><h3>👀 Read the word</h3><p>You already know these words — just read them in Cyrillic.</p><button type="button" class="primary" data-action="ex-read">Start</button></div>
      <div class="ex-card"><h3>⌨️ Typing drill</h3><p>Type Russian words with the on-screen keyboard.</p><button type="button" class="primary" data-action="ex-type">Start</button></div>
      <div class="ex-card wide"><h3>📖 Reading drill</h3><p>Syllables → words → sentences. Read aloud, then check with audio.</p><button type="button" class="primary" data-action="ex-drill">Start</button></div>
    </div>
    <div data-slot="ex"></div>`,
  guides: () => `<div class="guide-list">
    ${PRONUNCIATION_GUIDES.map((g) => `
      <details class="guide" ${g.id === 'stress' ? 'open' : ''}>
        <summary>${esc(g.title)}</summary>
        <p>${esc(g.intro)}</p>
        <ul>${g.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
        ${(g.examples || []).map((e) => `<div class="g-ex"><span class="ru">${esc(e.ru)}</span> <i>${esc(e.en)}</i></div>`).join('')}
      </details>`).join('')}
  </div>`
};

function letterCard(l) {
  return `
  <button type="button" class="lcard g${l.group}" data-action="letter" data-letter="${l.upper}">
    <span class="lbig">${l.upper}${l.lower}</span>
    <span class="lname">${esc(l.name)}</span>
    <span class="lsound">≈ ${esc(l.approx)}</span>
  </button>`;
}

function letterDetail(l) {
  return `
  <div class="letter-detail">
    <div class="ld-head">
      <span class="ld-letter">${l.upper} ${l.lower}</span>
      <span class="ld-name">${esc(l.name)}</span>
      <button type="button" class="ghost" data-action="hear-letter" data-speak="${esc(l.example)}">🔊</button>
    </div>
    <div class="ld-row"><b>Sound:</b> ${esc(l.approx)}</div>
    <div class="ld-row"><b>Example:</b> <span class="ru">${esc(l.example)}</span> <i>${esc(l.gloss)}</i> (${esc(l.trans)})</div>
    <div class="ld-row"><b>Mnemonic:</b> ${esc(l.mnemonic)}</div>
    <button type="button" class="ghost" data-action="flush-letter">Close ✕</button>
  </div>`;
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }