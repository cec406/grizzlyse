// Hangman: guess a Spanish word letter by letter.
import { esc } from '../ui.js';

export const ID = 'hangman';

const STAGES = [
  '   \n   \n   \n   ',
  '___\n   |\n   |\n   |',
  '___\n|/  |\n|   |\n|  ',
  '___\n|/  |\n|   |\n|    o',
  '___\n|/  |\n|   |\n|   o\n|   |',
  '___\n|/  |\n|   |\n|   o\n|  /|\\',
  '___\n|/  |\n|   |\n|   o\n|  /|\\\n|  / \\'
];

export function buildQuestions(words, rng = Math.random) {
  return words.map((item) => {
    const word = item.es.toLowerCase()
      .replace(/[áàäâ]/g, 'a').replace(/[éèëê]/g, 'e').replace(/[íìïî]/g, 'i')
      .replace(/[óòöô]/g, 'o').replace(/[úùüû]/g, 'u');
    return {
      type: 'grid',
      prompt: `Guess the word: ${esc(item.en)} (${esc(item.translit)})`,
      es: word,
      en: item.en,
      did: item.id,
      check: (u) => u === word,
      customRender(body, respond) {
        const letters = word.split('');
        let wrong = 0;
        const guessed = new Set();
        const ALPHA = 'abcdefghijklmnñopqrstuvwxyz'.split('');
        const alphabet = rng() < 0 ? ALPHA : ALPHA;
        body.innerHTML = `
          <pre class="hangman">${STAGES[0]}</pre>
          <div class="hang-word"></div>
          <div class="hang-wrong"></div>
          <div class="hang-keys"></div>
          <button type="button" class="ghost" data-action="giveup">Give up</button>`;
        const stageEl = body.querySelector('.hangman');
        const wordEl = body.querySelector('.hang-word');
        const wrongEl = body.querySelector('.hang-wrong');
        const keysEl = body.querySelector('.hang-keys');
        keysEl.innerHTML = alphabet.map((ch) =>
          `<button type="button" class="hkey" data-ch="${ch}">${ch}</button>`).join('');
        const paint = () => {
          stageEl.textContent = STAGES[Math.min(wrong, STAGES.length - 1)];
          wordEl.innerHTML = letters.map((ch) => guessed.has(ch) ? `<span class="hg">${ch}</span>` : '<span class="hg u">_</span>').join('');
          wrongEl.textContent = wrong ? `Wrong: ${[...guessed].filter((g) => !letters.includes(g)).join(', ')}` : '';
          if (letters.every((ch) => guessed.has(ch))) respond(word);
          if (wrong >= 6) respond('');
        };
        body.addEventListener('click', (e) => {
          const give = e.target.closest ? e.target.closest('[data-action="giveup"]') : null;
          if (give) { respond(''); return; }
          const k = e.target.closest ? e.target.closest('[data-ch]') : null;
          if (!k || k.disabled) return;
          const ch = k.getAttribute('data-ch');
          k.disabled = true;
          k.classList.add('used');
          if (letters.includes(ch)) guessed.add(ch);
          else wrong++;
          paint();
        });
        paint();
      }
    };
  });
}