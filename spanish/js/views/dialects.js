// Regional Spanish browser: accent notes, slang, phrases and culture per region.
import { esc } from '../ui.js';
import { DIALECTS } from '../../data/index.js';
import { addXp, recordActivity } from '../state.js';

export function render() {
  return `
  <section class="dialects">
    <h1>Dialectos <small>Spanish around the world</small></h1>
    <p class="lead">One language, many voices. Pick a region to hear how it sounds, learn its slang, and see what makes it tick. Puerto Rico first — that is your trip.</p>
    <p class="hint">Slang is where a language relaxes: it is regional and often informal. Each entry says how it is used — check the note before trying it at school, at work, or with strangers.</p>
    <nav class="tabs region-tabs">
      ${DIALECTS.map((d, i) => `<button type="button" class="tab${i === 0 ? ' active' : ''}" data-action="region" data-region="${d.id}">${d.flag} ${esc(d.name)}</button>`).join('')}
    </nav>
    <div data-slot="content"></div>
  </section>`;
}

export function attach(root) {
  const content = root.querySelector('[data-slot="content"]');
  if (!content) return;
  const show = (id) => {
    const d = DIALECTS.find((x) => x.id === id) || DIALECTS[0];
    content.innerHTML = regionHtml(d);
    addXp(1);
    recordActivity();
  };
  if (root.addEventListener) {
    root.addEventListener('click', (e) => {
      const b = e.target.closest ? e.target.closest('[data-action="region"]') : null;
      if (!b) return;
      show(b.getAttribute('data-region'));
      if (root.querySelectorAll) {
        root.querySelectorAll('.region-tabs .tab').forEach((el) => el.classList.toggle('active', el === b));
      }
    });
  }
  show(DIALECTS[0].id);
}

function regionHtml(d) {
  return `
  <article class="region" id="region-${d.id}">
    <div class="region-head">
      <span class="region-flag">${d.flag}</span>
      <div>
        <h2>${esc(d.name)}</h2>
        <p class="region-tag">${esc(d.tagline)}</p>
      </div>
    </div>
    <p class="region-blurb">${esc(d.blurb)}</p>

    <h3 class="sec">How it sounds</h3>
    <ul class="region-list accent-list">
      ${d.accent.map((a) => `<li>${esc(a)}</li>`).join('')}
    </ul>

    <h3 class="sec">Slang you will hear</h3>
    <div class="slang-grid">
      ${d.slang.map((s) => `
        <div class="slang-card">
          <div class="slang-top"><b>${esc(s.es)}</b> <button type="button" class="speak-link" data-speak="${esc(s.es)}">🔊</button></div>
          <span class="slang-en">${esc(s.en)}</span>
          ${s.note ? `<span class="slang-note">${esc(s.note)}</span>` : ''}
        </div>`).join('')}
    </div>

    <h3 class="sec">Useful phrases</h3>
    <div class="guide-list">
      ${d.phrases.map((p) => `
        <div class="g-ex"><span class="es">${esc(p.es)}</span> <i>${esc(p.en)}</i> <button type="button" class="speak-link" data-speak="${esc(p.es)}">🔊</button></div>`).join('')}
    </div>

    <h3 class="sec">Culture notes</h3>
    <ul class="region-list">
      ${d.culture.map((c) => `<li>${esc(c)}</li>`).join('')}
    </ul>
  </article>`;
}
