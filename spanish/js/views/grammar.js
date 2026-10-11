// Grammar reference browser.
import { esc } from '../ui.js';
import { GRAMMAR_TOPICS } from '../../data/grammar-reference.js';

export function render() {
  return `
  <section class="grammar">
    <h1>Gramática <small>grammar reference</small></h1>
    <p class="lead">The full skeleton of Spanish grammar — studied gradually in the course, browsable here any time.</p>
    <nav class="g-nav">
      ${GRAMMAR_TOPICS.map((t) => `<a href="#grammar-${t.id}" data-jump="${t.id}"><span class="lk">${t.level}</span>${esc(t.title)}</a>`).join('')}
    </nav>
    ${GRAMMAR_TOPICS.map((t) => `
      <article class="gtopic" id="grammar-${t.id}">
        <div class="g-head"><h2>${esc(t.title)}</h2><span class="lk">${t.level}</span></div>
        <p>${esc(t.intro)}</p>
        ${t.table && t.table.length ? `<table class="gtable">${t.table.map((row, ri) =>
          `<tr>${row.map((c) => ri === 0 ? `<th>${esc(c)}</th>` : `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</table>` : ''}
        ${t.examples && t.examples.length ? `<div class="g-examples">${t.examples.map((e) => `
          <div class="g-ex"><span class="es">${esc(e.es)}</span> <i>${esc(e.en)}</i></div>`).join('')}</div>` : ''}
      </article>`).join('')}
  </section>`;
}

export function attach(root) {
  if (!root.addEventListener) return;
  root.addEventListener('click', (e) => {
    const a = e.target.closest ? e.target.closest('[data-jump]') : null;
    if (a) {
      e.preventDefault && e.preventDefault();
      const el = document.getElementById('grammar-' + a.getAttribute('data-jump'));
      if (el && el.scrollIntoView) el.scrollIntoView();
    }
  });
}