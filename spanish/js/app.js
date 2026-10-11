// Entry point: hash routing, shell chrome, global audio delegation.
import { parseHash } from './router.js';
import { viewFor } from './views/index.js';
import { speak } from './audio.js';
import { loadState } from './state.js';

window.speak = speak;

const NAV = [
  ['#/home', 'Inicio', 'Home'],
  ['#/alphabet', 'Alfabeto', 'Alphabet'],
  ['#/lessons', 'Curso', 'Course'],
  ['#/practice', 'Práct.', 'Practice'],
  ['#/review', 'Repaso', 'Review'],
  ['#/reading', 'Lectura', 'Reading'],
  ['#/dialects', 'Regiones', 'Dialects'],
  ['#/grammar', 'Gram.', 'Grammar'],
  ['#/progress', 'Progreso', 'Progress'],
  ['#/audio-setup', 'Audio', 'Audio'],
  ['#/help', 'Ayuda', 'Help']
];

function route() {
  const r = parseHash(location.hash);
  const view = viewFor(r ? r.name : 'home');
  const params = r ? r.params : {};
  const main = document.getElementById('main');
  if (!main) return;
  try {
    main.innerHTML = view.render(params);
    if (view.attach) view.attach(main, params);
    highlightNav(r ? r.name : 'home');
    window.scrollTo && window.scrollTo(0, 0);
  } catch (err) {
    console.error('view render error', err);
    main.innerHTML = `<section class="errpage"><h1>Something went wrong</h1><p>${String(err && err.message ? err.message : err)}</p><a href="#/home" class="btn primary">Back to home</a></section>`;
  }
}

function highlightNav(name) {
  const links = document.querySelectorAll('#nav a');
  const active = name === 'reading-text' ? 'reading' : name;
  links.forEach((a) => {
    const h = String(a.getAttribute('href') || '').slice(2);
    a.classList.toggle('active', h === active);
  });
}

function buildShell() {
  const app = document.getElementById('main');
  if (!app || app.dataset.shell) return;
  app.dataset.shell = '1';
  const navHtml = NAV.map(([h, es, en]) => `<a href="${h}" class="${h === '#/home' ? 'active' : ''}"><i>${es}</i><span>${en}</span></a>`).join('');
  const header = document.createElement('header');
  header.id = 'nav';
  header.innerHTML = `
    <div class="brand"><a href="#/home"><b>Es</b> SpanishPod</a></div>
    <nav>${navHtml}</nav>
    <div class="xp-chip" id="xp-chip"></div>`;
  app.parentNode.insertBefore(header, app);
}

function paintXp() {
  const s = loadState();
  const chip = document.getElementById('xp-chip');
  if (chip) chip.innerHTML = `<span title="XP">⭐ ${s.xp}</span><span title="streak">🔥 ${s.streak}</span>`;
}

export function start() {
  buildShell();
  paintXp();
  route();
  window.addEventListener('hashchange', () => {
    route();
    paintXp();
  });
  document.addEventListener('click', (e) => {
    const el = e.target && e.target.closest ? e.target.closest('[data-speak]') : null;
    if (el) {
      const txt = el.getAttribute('data-speak');
      if (txt) speak(txt, 1);
    }
  });
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
}

export { highlightNav };