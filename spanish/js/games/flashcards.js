// SRS-graded flashcards for vocabulary. Standalone controller (no runner).
import { esc, shuffle } from '../ui.js';
import { newCard, grade } from '../srs.js';
import { getCard, setCard, markWords, recordAccuracy, recordActivity, addXp, setBest } from '../state.js';
import { play, autoSpeak } from '../fun.js';

export const ID = 'flashcards';

export function runFlashcards(target, { pool, count, rng = Math.random }) {
  let order = shuffle(pool, rng).slice(0, count);
  let i = 0;
  let shown = false;
  let rewarded = false;
  const render = () => {
    if (i >= order.length) {
      if (!rewarded) {
        rewarded = true;
        addXp(order.length * 2);
        setBest('flashcards', order.length);
        recordActivity();
      }
      target.innerHTML = `
        <div class="ex-done">
          <h3>Flashcards complete!</h3>
          <p>+${order.length * 2} XP banked · cards are scheduled in your review queue.</p>
          <button type="button" class="primary" data-slot="again">Again (new order)</button>
        </div>`;
      const b = target.querySelector('[data-slot="again"]');
      if (b) b.addEventListener('click', () => { order = shuffle(pool, rng).slice(0, count); i = 0; shown = false; rewarded = false; render(); });
      return;
    }
    const w = order[i];
    const card = getCard(w.id) || newCard(w.id);
    target.innerHTML = `
      <div class="fc-word ${shown ? 'flipped' : ''}">
        ${shown
          ? `<div class="fc-back">
          <span class="es big">${esc(w.es)} <span class="trans">${esc(w.translit)}</span></span>
          <p>${esc(w.en)}</p>
          <button type="button" class="ghost" data-speak="${esc(w.es)}">🔊 Listen</button>
          <div class="grade-row">
            <button type="button" class="g-btn g-again" data-slot="again2">🔁 Again</button>
            <button type="button" class="g-btn g-hard" data-slot="hard">💪 Hard</button>
            <button type="button" class="g-btn g-good" data-slot="good">👍 Good</button>
            <button type="button" class="g-btn g-easy" data-slot="easy">⚡ Easy</button>
          </div></div>`
          : `<div class="fc-front">
          <span class="fcn">What is “<b>${esc(w.en)}</b>” in Spanish?</span>
          <button type="button" class="primary" data-slot="flip">Reveal word</button>
        </div>`}
      </div>
      <p class="hint">Card ${i + 1} of ${order.length} · tap Reveal, then grade yourself honestly.</p>`;
    const flip = target.querySelector('[data-slot="flip"]');
    if (flip) flip.addEventListener('click', () => { shown = true; render(); });
    if (shown) autoSpeak(w.es);
    const grades = [['[data-slot="again2"]', 1], ['[data-slot="hard"]', 3], ['[data-slot="good"]', 4], ['[data-slot="easy"]', 5]];
    for (const [sel, q] of grades) {
      const b = target.querySelector(sel);
      if (b) b.addEventListener('click', () => {
        play(q >= 3 ? 'correct' : 'wrong');
        setCard(w.id, grade(card, q));
        markWords([w.id]);
        recordAccuracy('flashcards', q >= 3);
        recordActivity();
        shown = false; i++;
        render();
      });
    }
  };
  render();
}
