// Curriculum index: units by level. Nothing is locked — every unit is open.
import { esc } from '../ui.js';
import { UNITS } from '../../data/index.js';
import { lessonDone } from '../state.js';
import { href } from '../router.js';

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];
const LEVEL_INFO = {
  A1: 'Absolute beginner — alphabet, greetings, yourself, numbers, basics.',
  A2: 'Beginner — daily life: family, food, home, routine, city, travel.',
  B1: 'Intermediate — opinions, travel, work, health, abstract topics.',
  B2: 'Upper-intermediate — society, news, complex grammar, fluency.',
  C1: 'Advanced — register, dialect and nuance for real proficiency (DLPT/OPI).'
};

export function render() {
  const progress = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 };
  for (const u of UNITS) if (lessonDone(u.id)) progress[u.level] = (progress[u.level] || 0) + 1;
  let lastLevel = '';
  return `
  <section class="lessons">
    <h1>Curso <small>the course</small></h1>
    <p class="lead">48 units from «¡Hola!» to advanced C1, grouped A1 → C1. Nothing is locked — open any unit at any time, or follow the order for the smoothest path. Aimed at English speakers heading to Puerto Rico and anyone training for a Spanish proficiency exam.</p>
    ${LEVELS.map((lv) => {
      const list = UNITS.filter((u) => u.level === lv);
      const done = progress[lv] || 0;
      const bandPct = Math.round((done / list.length) * 100);
      const block = `
      <div class="level-block" data-level="${lv}">
        <div class="level-head">
          <span class="level-chip">${lv}</span>
          <div class="level-note">
            <b>${esc(LEVEL_INFO[lv])}</b>
            <div class="progress slim"><div class="progress-fill" style="width:${bandPct}%"></div></div>
            <span class="hint">${done}/${list.length} units complete</span>
          </div>
        </div>
        <div class="unit-list">
          ${list.map((u) => row(u)).join('')}
        </div>
      </div>`;
      lastLevel = lv;
      return block;
    }).join('')}
  </section>`;
}

function row(u) {
  const done = lessonDone(u.id);
  const chips = [];
  if (done) chips.push('<span class="done-tag">✓ done</span>');
  chips.push(`<span class="mini">${(u.vocabulary || []).length} words</span>`);
  chips.push(`<span class="mini">${(u.quiz || []).length} quiz items</span>`);
  return `
  <div class="unit-row">
    <div class="un-num">${u.number}</div>
    <div class="un-body">
      <a href="${href('lesson', { unitId: u.id })}"><b>${esc(u.title)}</b></a>
      <span class="un-es">${esc(u.titleEs)}</span>
      <div class="un-chips">${chips.join('')}</div>
    </div>
    ${done ? '<span class="done-tag">✓</span>' : '<a class="btn small" href="' + href('lesson', { unitId: u.id }) + '">Open</a>'}
  </div>`;
}

export function attach(root) {
  if (!root.addEventListener) return;
  root.addEventListener('click', (e) => {
    const b = e.target.closest ? e.target.closest('[data-level]') : null;
    void b;
  });
}