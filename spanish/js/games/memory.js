// Memory match: pair Spanish words with their English meanings.
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
    check: (u) => Array.isArray(u) && u.length === items.length,
    customRender(body, respond) {
      let first = null;
      let matched = new Array(items.length).fill(false);
      let locked = false;
      const cells = new Map();
      body.innerHTML = `<div class="mem-grid"></div>
        <div class="mem-status"></div>
        <button type="button" class="ghost" data-action="giveup">I give up</button>`;
      const grid = body.querySelector('.mem-grid');
      const status = body.querySelector('.mem-status');
      deck.forEach((c) => {
        const cell = document.createElement('button');
        cell.type = 'button';
        cell.className = 'mem-cell';
        cell.dataset.key = c.key;
        cell.dataset.word = c.word;
        cell.textContent = c.side === 'es' ? c.text : '';
        cell.dataset.side = c.side;
        grid.appendChild(cell);
        cells.set(c.key, cell);
      });
      const paint = () => {
        let found = 0;
        deck.forEach((c) => {
          const cell = cells.get(c.key);
          if (matched[c.word]) {
            cell.classList.add('matched');
            cell.textContent = c.text;
            found++;
          } else if (cell === first) {
            cell.classList.add('picked');
          } else {
            cell.classList.remove('picked');
            cell.textContent = '';
          }
        });
        status.textContent = `${found}/${items.length} pairs found`;
        if (found === items.length) respond(items.map((it) => it.id || it.es));
      };
      body.addEventListener('click', (e) => {
        const give = e.target.closest ? e.target.closest('[data-action="giveup"]') : null;
        if (give) { respond([]); return; }
        const cell = e.target.closest ? e.target.closest('.mem-cell') : null;
        if (!cell || locked) return;
        const word = Number(cell.dataset.word);
        if (matched[word]) return;
        if (!first) { first = cell; paint(); return; }
        if (first === cell) { first = null; paint(); return; }
        locked = true;
        if (first.dataset.word === cell.dataset.word) {
          matched[word] = true;
          first = null;
          locked = false;
          paint();
        } else {
          const f = first;
          first = null;
          const flasher = `body .mem-cell`; void flasher;
          setTimeout(() => { locked = false; paint(); }, 450);
          void f;
        }
      });
      paint();
    }
  };
}

export { esc };