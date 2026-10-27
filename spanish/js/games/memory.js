// Memory match: pair Spanish words with their English meanings.
// Spanish words stay face-up (you practise reading them); English meanings
// start hidden and only reveal when you pick them or the pair matches.
import { pickN, shuffle } from './logic.js';
import { esc } from '../ui.js';

export const ID = 'memory';

export function mod(pool, count, rng = Math.random) {
  return [buildQuestion(pool, count, rng)];
}

export function buildQuestion(pool, pairs = 6, rng = Math.random) {
  const items = pickN(pool, pairs, rng);
  const cards = items.flatMap((it, i) => [
    { key: `${i}-es`, word: i, side: 'es', text: it.es },
    { key: `${i}-en`, word: i, side: 'en', text: it.en }
  ]);
  const deck = shuffle(cards, rng);
  return {
    type: 'grid',
    prompt: 'Match each Spanish word with its English meaning. Pairs finish the round.',
    es: '',
    en: '',
    items,
    cards: deck,
    correctCount: items.length,
    correctValue: items.map((it) => it.es + ' = ' + it.en).join(' · '),
    check: (u) => Array.isArray(u) && u.length === items.length,
    customRender(body, respond) {
      let first = null;
      let matched = new Array(items.length).fill(false);
      let locked = false;
      let done = false;
      let revealed = false;
      const cells = new Map();
      body.innerHTML = `<div class="mem-grid"></div>
        <div class="mem-status" role="status" aria-live="polite"></div>
        <button type="button" class="ghost" data-action="giveup">I give up</button>`;
      const grid = body.querySelector('.mem-grid');
      const status = body.querySelector('.mem-status');
      const pairsFound = () => matched.filter(Boolean).length;
      deck.forEach((c) => {
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'mem-cell';
        cell.dataset.key = c.key;
        cell.dataset.word = c.word;
        cell.dataset.side = c.side;
        grid.appendChild(cell);
        cells.set(c.key, cell);
      });
      const paint = (peek) => {
        deck.forEach((c) => {
          const cell = cells.get(c.key);
          const isMatched = matched[c.word];
          const visible = isMatched || c.side === 'es' || cell === first || peek === true;
          cell.textContent = visible ? c.text : '?';
          cell.classList.toggle('matched', isMatched);
          cell.classList.toggle('picked', cell === first && !isMatched);
          cell.disabled = isMatched || done;
          cell.setAttribute('aria-label',
            c.side === 'es' ? 'Spanish word: ' + c.text
              : (visible ? 'English meaning: ' + c.text : 'Hidden English meaning'));
        });
        status.textContent = `${pairsFound()}/${items.length} pairs found`;
        if (!done && pairsFound() === items.length) {
          done = true;
          status.textContent = 'All pairs found!';
          respond(items.map((it) => it.id || it.es));
        }
      };
      body.addEventListener('click', (e) => {
        const give = e.target.closest ? e.target.closest('[data-action="giveup"]') : null;
        if (give) { if (!done) { done = true; respond([]); } return; }
        const cell = e.target.closest ? e.target.closest('.mem-cell') : null;
        if (!cell || locked || done) return;
        const word = Number(cell.dataset.word);
        if (matched[word]) return;
        if (!first) { first = cell; paint(); return; }
        if (first === cell) { first = null; paint(); return; }
        locked = true;
        if (Number(first.dataset.word) === word && first.dataset.side !== cell.dataset.side) {
          matched[word] = true;
          first = null;
          locked = false;
          paint();
        } else {
          status.textContent = 'No match — look at the English meaning and try again.';
          paint(true);
          setTimeout(() => { first = null; locked = false; paint(); }, 750);
        }
      });
      paint();
    }
  };
}

export { esc };
