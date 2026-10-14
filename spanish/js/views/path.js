// Zero → hero roadmap view.
import { esc } from '../ui.js';
import { PATH_STAGES } from '../../data/learning-path.js';
import { packById } from '../../data/word-packs.js';

function previewWords(packId, n = 6) {
  const pack = packId ? packById(packId) : null;
  if (!pack) return { pack: null, words: [] };
  return { pack, words: pack.words.slice(0, n) };
}

export function render() {
  return `
  <section class="path">
    <h1>Camino <small>Zero → hero roadmap</small></h1>
    <p class="lead">One straight road from a kindergartner reading their first letters to professional (C1) Spanish. Every stage links to exactly the content you need — take them in order, or jump to where you are.</p>
    <div class="path-timeline">
      ${PATH_STAGES.map((s, i) => `
        <div class="path-stage" data-stage="${esc(s.id)}">
          <div class="path-marker"><span class="path-dot">${esc(s.icon)}</span>${i < PATH_STAGES.length - 1 ? '<span class="path-line"></span>' : ''}</div>
          <div class="path-card">
            <div class="path-head">
              <span class="lk">${esc(s.level)}</span>
              <b>${esc(s.band)}</b>
              <span class="mini">${esc(s.ages)}</span>
            </div>
            <h2>${esc(s.title)} <small>${esc(s.titleEs)}</small></h2>
            <p>${esc(s.goal)}</p>
            ${stageWords(s)}
            <div class="path-links">
              ${(s.links || []).map((l) => `<a class="btn small" href="${esc(l.href)}">${esc(l.label)}</a>`).join('')}
            </div>
            <p class="path-milestone"><b>Milestone:</b> ${esc(s.milestone)}</p>
          </div>
        </div>`).join('')}
    </div>
    <div class="hint-box">
      <b>How to use it:</b> spend a little time every day. Learn new words in
      <a href="#/lessons">the course</a>, drill them in <a href="#/practice">games</a> and
      <a href="#/vocab">the dictionary</a>, keep your streak alive in <a href="#/review">daily review</a>,
      and train your accents in the <a href="#/keyboard">keyboard trainer</a>.
    </div>
  </section>`;
}

function stageWords(stage) {
  const { pack, words } = previewWords(stage.pack);
  if (!pack) return '';
  return `
  <div class="path-words">
    <div class="mini">Starter words from <b>${esc(pack.title)}</b> (${pack.words.length} in total):</div>
    <div class="path-word-row">
      ${words.map((w) => `<button type="button" class="path-word" data-speak="${esc(w.es)}">
        <span class="pw-es">${esc(w.es)} 🔊</span>
        <span class="pw-tr">${esc(w.translit)}</span>
        <span class="pw-en">${esc(w.en)}</span>
      </button>`).join('')}
    </div>
    <a class="mini" href="#/vocab?pack=${esc(pack.id)}">See all ${pack.words.length} words →</a>
  </div>`;
}

export function attach() { /* static */ }
