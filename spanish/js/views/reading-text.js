// Reading text: tap-to-translate + comprehension quiz.
import { esc } from '../ui.js';
import { READING } from '../../data/index.js';
import { href } from '../router.js';
import { runGame } from '../games/runner.js';
import { makeSession, shuffle, difficultyConf, eq } from '../games/logic.js';
import { applyAnswer, applyResult } from '../srs-store.js';
import { setCard, recordActivity } from '../state.js';
import { newCard } from '../srs.js';

function esWords(text) {
  return text.split(/\s+/).filter((w) => /[a-záéíóúüñ]/i.test(w));
}

export function render(params) {
  const r = READING.find((x) => x.id === params.textId) || READING[0];
  if (!r) return `<section class="reading-text"><h1>Not found</h1><a href="#/reading">← Back</a></section>`;
  const paragraphs = r.text.split('\n').filter((p) => p.trim());
  return `
  <section class="reading-text">
    <div class="rt-head"><a class="ghost" href="${href('reading')}">← All texts</a> <span class="chip">${r.level}</span></div>
    <h1>${esc(r.title)}</h1>
    ${r.byline ? `<p class="byline">${esc(r.byline)}</p>` : ''}
    <div class="rt-body" data-slot="rt">
      ${paragraphs.map((p) => `<p>${wordSpans(p, r)}</p>`).join('')}
    </div>
    <div class="gloss-pop" data-slot="gloss" hidden></div>
    <button type="button" class="primary" data-action="quiz">Comprehension quiz (${(r.questions || []).length} questions)</button>
    <div data-slot="runner"></div>
  </section>`;
}

function wordSpans(paragraph, r) {
  const gloss = new Map((r.glossary || []).map((g) => [g.es.toLowerCase(), g]));
  return paragraph.split(/(\s+)/).map((tok) => {
    if (!/^[a-záéíóúüñ]+/i.test(tok) || tok.includes('·')) return esc(tok);
    const clean = tok.replace(/[.!?,:;«»"'()…¡¿-]/g, '');
    const key = clean.toLowerCase();
    const g = gloss.get(key);
    if (g) {
      return `<button type="button" class="wrd" data-word="${esc(clean)}" data-id="${esc(g.id || (r.id + '-g' + (r.glossary || []).indexOf(g)))}">${esc(tok)}</button>`;
    }
    return esc(tok);
  }).join('');
}

export function attach(root, params) {
  if (!root.addEventListener) return;
  const r = READING.find((x) => x.id === params.textId) || READING[0];
  if (!r) return;
  const glossPop = root.querySelector('[data-slot="gloss"]');
  if (glossPop) {
    root.addEventListener('click', (e) => {
      const w = e.target.closest ? e.target.closest('[data-word]') : null;
      if (!w) return;
      const word = w.getAttribute('data-word');
      const id = w.getAttribute('data-id');
      const g = (r.glossary || []).find((x) => x.es.toLowerCase() === word.toLowerCase());
      if (!g) { glossPop.hidden = false; glossPop.innerHTML = `<span class="es">${esc(word)}</span> <i>not in this text's glossary</i>`; return; }
      glossPop.hidden = false;
      glossPop.innerHTML = `
        <span class="gp-word">${esc(g.es)}${esc(g.trans ? ` (${g.trans})` : '')} <b>${esc(g.en)}</b></span>
        ${id ? `<button type="button" class="ghost small" data-action="review-word" data-id="${esc(id)}">✅ add to review</button>` : ''}`;
      if (id) {
        const btn = glossPop.querySelector('[data-action="review-word"]');
        if (btn) btn.addEventListener('click', () => {
          setCard(id, newCard(id));
          btn.textContent = '✅ added';
        });
      }
      if (window.speak) window.speak(g.es);
    });
  }
  root.addEventListener('click', (e) => {
    const b = e.target.closest ? e.target.closest('[data-action="quiz"]') : null;
    if (!b) return;
    const slot = root.querySelector('[data-slot="runner"]');
    if (!slot) return;
    const questions = (r.questions || []).map((q) => qToRunner(q));
    const session = makeSession('reading-' + r.id, questions, difficultyConf('medium'), { timers: false });
    runGame(slot, {
      game: { id: 'reading-' + r.id, title: r.title + ' — comprehension', icon: '📖' },
      session,
      onFeedback: (rec, q) => applyAnswer(rec, q),
      onComplete: (res) => { applyResult(res, { gameId: 'reading-' + r.id, unitId: r.id }); recordActivity(); },
      again: () => { const b2 = root.querySelector('[data-action="quiz"]'); if (b2) b2.click(); }
    });
  });
}

function qToRunner(q) {
  if (q.type.startsWith('mc')) {
    return { type: 'mc', prompt: q.q, options: shuffle(q.options), correct: q.answer, correctValue: q.answer, es: q.es, en: q.answer };
  }
  const accepts = [q.answer, ...(q.accepts || [])];
  return { type: 'type', prompt: q.q, accepted: q.answer, accepts, correctValue: q.answer, check: (u) => accepts.some((a) => eq(u, a)), es: q.es, en: q.answer };
}

void esWords;