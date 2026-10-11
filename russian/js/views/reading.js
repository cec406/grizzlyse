// Reading section: graded texts index.
import { esc } from '../ui.js';
import { READING } from '../../data/index.js';
import { href } from '../router.js';

const LEVELS = ['A1', 'A2', 'B1', 'B2'];
const COLOR = { A1: 'chip', A2: 'chip c2', B1: 'chip c3', B2: 'chip c4' };

export function render() {
  return `
  <section class="reading-list">
    <h1>Чте́ние <small>reading</small></h1>
    <p class="lead">Graded texts from the armchair to the newspaper. Tap any word to translate it; tap ✅ to add it to your review queue.</p>
    ${LEVELS.map((lv) => {
      const list = READING.filter((r) => r.level === lv);
      if (!list.length) return `<div class="level-block" data-lv="${lv}"><h2>${esc(lv)}</h2><p class="hint">Texts coming soon.</p></div>`;
      return `
      <div class="level-block" data-lv="${lv}">
        <h2>${esc(lv)}</h2>
        <div class="read-grid">
          ${list.map((r) => `
            <a class="read-card" href="${href('reading-text', { textId: r.id })}">
              <span class="${COLOR[lv]}">${esc(lv)}</span>
              <b>${esc(r.title)}</b>
              <span class="mini">${(r.glossary || []).length} glossary words · ${esc(r.words !== undefined ? r.words : (r.text || '').split(/\s+/).length)} words</span>
            </a>`).join('')}
        </div>
      </div>`;
    }).join('')}
  </section>`;
}

export function attach() { /* static */ }