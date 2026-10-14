// Advanced track browser: professional & technology Spanish (language only).
import { esc } from '../ui.js';
import { CYBER_MODULES } from '../../data/cyber.js';
import { markWords, wordsLearned, addXp, recordActivity } from '../state.js';
import { rememberRight } from '../srs-store.js';

const GENDER = { m: 'masc.', f: 'fem.', n: 'neut.', p: 'plural' };

export function render() {
  const totalTerms = CYBER_MODULES.reduce((n, m) => n + (m.terms || []).length + (m.phrases || []).length, 0);
  return `
  <section class="cyber">
    <h1>Español profesional <small>professional &amp; tech Spanish</small></h1>
    <p class="lead">The advanced end of the roadmap: the formal, technical and workplace register. ${totalTerms} terms and phrases for reading technical Spanish and working with Spanish-speaking colleagues.</p>
    <div class="hint-box">
      <b>Scope:</b> this is language study only — vocabulary, phrases and workplace dialogue.
      It is here to build professional fluency, not to teach computer intrusions or tradecraft.
    </div>
    <nav class="g-nav">
      ${CYBER_MODULES.map((m) => `<a href="#cyb-${m.id}" data-jump="${m.id}"><span class="lk">${esc(m.level)}</span>${esc(m.icon)} ${esc(m.title)}</a>`).join('')}
    </nav>
    <p class="hint">Mark any word “learned” to add it to your daily spaced-repetition review.</p>
    ${CYBER_MODULES.map((m) => moduleHtml(m)).join('')}
  </section>`;
}

function moduleHtml(m) {
  return `
  <article class="cyb-module" id="cyb-${esc(m.id)}">
    <div class="g-head"><h2>${esc(m.icon)} ${esc(m.title)} <small>${esc(m.titleEs)}</small></h2><span class="lk">${esc(m.level)}</span></div>
    <p class="lead">${esc(m.desc)}</p>

    <h3>Vocabulary</h3>
    <div class="cyb-terms">
      ${(m.terms || []).map(termRow).join('')}
    </div>

    ${(m.phrases && m.phrases.length) ? `
      <h3>Phrases</h3>
      <ul class="phrase-list">
        ${m.phrases.map((p) => `<li>
          <button type="button" class="speak-link es" data-speak="${esc(p.es)}">${esc(p.es)} 🔊</button>
          <div class="trans">${esc(p.translit)}</div>
          <div class="hint">${esc(p.en)}</div>
        </li>`).join('')}
      </ul>` : ''}

    ${m.dialogue ? dialogueHtml(m) : ''}
  </article>`;
}

function termRow(t) {
  const learned = wordsLearned().includes(t.id || '');
  const gender = t.gender ? ` <span class="mini">${esc(GENDER[t.gender] || t.gender)}</span>` : '';
  return `
  <div class="cyb-term${learned ? ' learned' : ''}" data-id="${esc(t.id || '')}">
    <button type="button" class="lex-es" data-speak="${esc(t.es)}">${esc(t.es)} 🔊</button>
    <span class="trans">${esc(t.translit)}</span>
    <span class="cyb-en">${esc(t.en)}${gender}</span>
    ${t.id ? `<button type="button" class="btn small lex-learn" data-action="learn" data-id="${esc(t.id)}" ${learned ? 'disabled' : ''}>${learned ? '✓' : '+ learned'}</button>` : ''}
  </div>`;
}

function dialogueHtml(m) {
  const d = m.dialogue;
  return `
  <h3>Dialogue — ${esc(d.title)}</h3>
  <ul class="dialogue">
    ${d.lines.map((l) => `<li class="dl-line">
      <span class="dl-who">${esc(l.who)}</span>
      <button type="button" class="speak-link es" data-speak="${esc(l.es)}">${esc(l.es)} 🔊</button>
      <span class="trans">${esc(l.translit)}</span>
      <span class="hint">${esc(l.en)}</span>
    </li>`).join('')}
  </ul>
  ${(d.questions && d.questions.length) ? `<div class="cyb-questions">
    ${d.questions.map((q) => `<div class="cyb-q"><b>${esc(q.q)}</b>
      <details><summary>Show answer</summary><span class="ok">${esc(q.answer)}</span></details></div>`).join('')}
  </div>` : ''}`;
}

export function attach(root) {
  if (root.addEventListener) {
    root.addEventListener('click', (e) => {
      const jump = e.target.closest ? e.target.closest('[data-jump]') : null;
      if (jump) {
        e.preventDefault && e.preventDefault();
        const el = document.getElementById('cyb-' + jump.getAttribute('data-jump'));
        if (el && el.scrollIntoView) el.scrollIntoView();
        return;
      }
      const learn = e.target.closest ? e.target.closest('[data-action="learn"]') : null;
      if (learn) {
        const id = learn.getAttribute('data-id');
        markWords([id]);
        rememberRight(id, 3);
        addXp(2); recordActivity();
        learn.textContent = '✓'; learn.disabled = true;
        const r = learn.closest ? learn.closest('.cyb-term') : null;
        if (r && r.classList) r.classList.add('learned');
      }
    });
  }
}
