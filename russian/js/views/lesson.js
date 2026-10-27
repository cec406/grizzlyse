// Single unit: story, grammar, vocabulary, phrases, sentences, dialogue/reading,
// quiz and unit test. Quiz/test share the game runner.
import { esc, cls } from '../ui.js';
import { UNITS } from '../../data/index.js';
import { lessonDone, markLesson, addXp, addBadge, setBest, recordActivity, placementInfo } from '../state.js';
import { href } from '../router.js';
import { runGame } from '../games/runner.js';
import { makeSession, shuffle, difficultyConf } from '../games/logic.js';
import { applyAnswer, applyResult } from '../srs-store.js';
import { play, confetti } from '../fun.js';

export function render(params) {
  const u = UNITS.find((x) => x.id === params.unitId) || UNITS[0];
  return `
  <section class="lesson">
    <div class="lesson-head">
      <span class="level-chip">${u.level}</span>
      <span class="pill">Unit ${u.number}</span>
      <h1>${esc(u.title)} <small>${esc(u.titleRu)}</small></h1>
    </div>
    ${lessonDone(u.id) ? '<div class="banner ok-banner">✓ Unit marked complete.</div>' : ''}

    <h2 class="sec">Story — why this matters</h2>
    <p class="story">${esc(u.story || '')}</p>

    <h2 class="sec">Grammar</h2>
    ${(u.grammar || []).map((g, gi) => `
      <details class="grammar-block" ${gi === 0 ? 'open' : ''}>
        <summary>${esc(g.topic)}</summary>
        <p>${esc(g.explanation)}</p>
        ${g.table && g.table.length ? `<table class="gtable">${g.table.map((row, ri) =>
          `<tr>${row.map((c) => ri === 0 ? `<th>${esc(c)}</th>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table>` : ''}
        ${(g.examples || []).map((ex) => `
          <div class="g-ex"><span class="ru">${esc(ex.ru)} <button type="button" class="speak-link" data-speak="${esc(ex.ru)}">🔊</button></span>
          <span class="trans">${esc(ex.trans || '')}</span> <i>${esc(ex.en)}</i></div>`).join('')}
      </details>`).join('')}

    <h2 class="sec">Vocabulary (${(u.vocabulary || []).length} words)</h2>
    <table class="vocab-table">
      <tr><th>Russian</th><th>Translit</th><th>English</th><th>Type</th></tr>
      ${(u.vocabulary || []).map((w) => `
        <tr>
          <td class="ru">${esc(w.ru)} <button type="button" class="speak-link" data-speak="${esc(w.ru)}">🔊</button></td>
          <td class="trans">${esc(w.translit)}</td>
          <td>${esc(w.en)}</td>
          <td>${esc(posLabel(w))}</td>
        </tr>`).join('')}
    </table>

    ${u.phrases && u.phrases.length ? `
    <h2 class="sec">Key phrases</h2>
    <ul class="phrase-list">${u.phrases.map((p) => `
      <li><span class="ru">${esc(p.ru)} <button type="button" class="speak-link" data-speak="${esc(p.ru)}">🔊</button></span>
      <span class="trans">${esc(p.trans)}</span> — ${esc(p.en)}</li>`).join('')}</ul>` : ''}

    <h2 class="sec">Example sentences</h2>
    <ul class="sentence-list">${(u.sentences || []).map((s) => `
      <li>
        <div class="ru">${esc(s.ru)} <button type="button" class="speak-link" data-speak="${esc(s.ru)}">🔊</button></div>
        <div class="trans">${esc(s.translit)}</div>
        <div class="en">${esc(s.en)}</div>
        <div class="gloss">
          ${(s.words || []).slice(0, 6).map((g) => `<span class="gl">${esc(g.ru)} — ${esc(g.en)}</span>`).join('')}
        </div>
      </li>`).join('')}</ul>

    ${u.dialogue ? `
    <h2 class="sec">Dialogue — ${esc(u.dialogue.title)}</h2>
    <div class="dialogue">
      ${u.dialogue.lines.map((ln) => `
        <div class="dl-line ${esc(ln.who)}">
          <span class="dl-who">${esc(ln.who)}:</span>
          <span class="ru">${esc(ln.ru)} <button type="button" class="speak-link" data-speak="${esc(ln.ru)}">🔊</button></span>
          <span class="en">${esc(ln.en)}</span>
        </div>`).join('')}
    </div>
    ${u.dialogue.questions && u.dialogue.questions.length ? `<div class="banner"><b>Comprehension:</b> ${(u.dialogue.questions || []).map((q) => esc(q.q)).join(' · ')}</div>` : ''}` : ''}

    ${u.reading ? `
    <h2 class="sec">Reading — ${esc(u.reading.title)}</h2>
    <div class="reading-text" data-slot="rt">
      ${esc(u.reading.text).split('\n').map((p) => `<p>${esc(p)}</p>`).join('')}
    </div>
    ${u.reading.questions && u.reading.questions.length ? `<div class="banner"><b>Comprehension:</b> ${(u.reading.questions || []).map((q) => esc(q.q)).join(' · ')}</div>` : ''}` : ''}

    <div class="lesson-actions">
      <button type="button" class="primary big" data-action="quiz">🎯 Practice quiz</button>
      <button type="button" class="primary big accent-2" data-action="test">📝 Unit test</button>
      <a class="btn ghost big" href="${href('practice')}">Practice games →</a>
    </div>
    <div data-slot="runner"></div>
  </section>`;
}

function posLabel(w) {
  return { noun: `noun (${w.gender})`, verb: 'verb', adjective: 'adj.', adverb: 'adv.', pronoun: 'pron.', numeral: 'num.', preposition: 'prep.', conjunction: 'conj.', interjection: 'int.', particle: 'part.' }[w.pos] || w.pos;
}

export function attach(root, params) {
  if (!root.addEventListener) return;
  const u = UNITS.find((x) => x.id === params.unitId) || UNITS[0];
  root.addEventListener('click', (e) => {
    const b = e.target.closest ? e.target.closest('[data-action]') : null;
    const action = b && b.getAttribute('data-action');
    if (action === 'quiz' || action === 'test') {
      const slot = root.querySelector('[data-slot="runner"]');
      if (!slot) return;
      const items = action === 'quiz' ? (u.quiz || []) : (u.test.questions || []);
      const game = { id: 'unit-' + action, title: action === 'quiz' ? u.title + ' quiz' : u.title + ' test', icon: action === 'quiz' ? '🎯' : '📝' };
      const questions = items.map((q) => toRunner(q));
      const session = makeSession(game.id, questions, difficultyConf('medium'), { timers: false });
      runGame(slot, {
        game,
        session,
        onFeedback: (rec, q) => applyAnswer(rec, q),
        onComplete: (r) => {
          applyResult(r, { gameId: game.id, unitId: u.id });
          if (action === 'test' && r.pct >= 70) {
            markLesson(u.id);
            addBadge('unit-' + u.id);
            play('win');
            confetti(slot);
            const idx = UNITS.findIndex((x) => x.id === u.id);
            const nu = UNITS[idx + 1];
            slot.innerHTML += `<div class="banner ok-banner"><b>Unit complete!</b> <a href="${href('lessons')}">See the course</a>${nu ? ` or <a href="${href('lesson', { unitId: nu.id })}">continue to Unit ${nu.number}: ${esc(nu.title)} →</a>` : '.'}</div>`;
          } else if (action === 'test') {
            slot.innerHTML += `<div class="banner warn"><b>You need 70%+ to pass the test.</b> Review the words you missed and try again.</div>`;
          }
          recordActivity();
          addXp(0);
        },
        again: () => { const btn = root.querySelector('[data-action="' + action + '"]'); if (btn) btn.click(); }
      });
    }
  });
  void lessonDone; void addXp; void setBest; void placementInfo; void cls;
}

function toRunner(q) {
  if (q.type === 'mc-ru' || q.type === 'mc-en') {
    return { type: 'mc', prompt: q.q, options: shuffle(q.options), correct: q.answer, correctValue: q.answer, ru: q.ru, en: q.answer, did: q.did, explain: q.what };
  }
  return {
    type: 'type',
    prompt: q.q,
    accepted: q.answer,
    accepts: q.accepts || [],
    check: (u2) => (q.accepts ? [q.answer, ...q.accepts] : [q.answer]).some((a) => normEq(u2, a)),
    ru: q.ru,
    en: q.answer,
    did: q.did
  };
}

function normEq(a, b) {
  const clean = (x) => String(x).replace(/\u0301/g, '').toLowerCase().replace(/ё/g, 'е')
    .replace(/[.,!?:;«»"'()…—–-]/g, '').replace(/\s+/g, ' ').trim();
  return clean(a) === clean(b);
}