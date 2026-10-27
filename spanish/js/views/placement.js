// Placement test: 14 MC questions climb from A1 to B2. Sets the starting level.
import { esc } from '../ui.js';
import { setPlacement, addXp, recordActivity, placementInfo } from '../state.js';
import { href } from '../router.js';

export const PLACEMENT_QUESTIONS = [
  { es: '¡Hola!', correct: 'Hello', options: ['Hello', 'Goodbye', 'Please', 'How are you?'] },
  { es: 'Me llamo Ana.', correct: 'My name is Ana', options: ['My name is Ana', 'I am from Ana', 'Ana calls me', 'My friend is Ana'] },
  { es: 'Vivo en Madrid.', correct: 'I live in Madrid', options: ['I live in Madrid', 'I visited Madrid', 'Madrid is big', 'I work in Madrid'] },
  { es: '¿Cuánto cuesta?', correct: 'How much is it?', options: ['How much is it?', 'What time is it?', 'How are you?', 'Where is it?'] },
  { es: 'Me levanto a las siete de la mañana.', correct: 'I get up at seven in the morning', options: ['I get up at seven in the morning', 'I go to bed at seven', 'I work until seven', 'I eat at seven'] },
  { es: 'Ayer compré pan.', correct: 'Yesterday I bought bread', options: ['Yesterday I bought bread', 'Yesterday I ate bread', 'I want bread', 'The bread is expensive'] },
  { es: 'Me gusta esta música.', correct: 'I like this music', options: ['I like this music', 'I am playing music', 'This music is new', 'I heard music'] },
  { es: 'Dice que llegará mañana.', correct: 'He says he will arrive tomorrow', options: ['He says he will arrive tomorrow', 'He says he arrived yesterday', 'He wants to arrive now', 'He likes arriving late'] },
  { es: 'Si tuviera tiempo, leería más.', correct: 'If I had time, I would read more', options: ['If I had time, I would read more', 'When I have time, I read', 'I read a lot at night', 'I have time to read'] },
  { es: 'El médico me dijo que trabajara menos.', correct: 'The doctor told me to work less', options: ['The doctor told me to work less', 'The doctor works less than me', 'The doctor does not work', 'I told the doctor to work'] },
  { es: 'Lleva diez años trabajando en un banco.', correct: 'She has worked at a bank for ten years', options: ['She has worked at a bank for ten years', 'She worked at a bank ten years ago', 'She will work at a bank', 'She works ten days a month'] },
  { es: 'A pesar de la lluvia, salimos a pasear.', correct: 'Despite the rain, we went for a walk', options: ['Despite the rain, we went for a walk', 'Because of the rain, we stayed in', 'The rain stopped, so we went out', 'We like walking in the rain'] },
  { es: 'Que yo sepa, ya se han ido.', correct: 'As far as I know, they have already left', options: ['As far as I know, they have already left', 'I know they will leave soon', 'They told me they left', 'As far as I know, they are here'] },
  { es: 'Habiendo leído el artículo, llamé al editor.', correct: 'Having read the article, I called the editor', options: ['Having read the article, I called the editor', 'I read the article the editor wrote', 'The editor read my article', 'I write articles for the editor'] }
];

const TARGET = {
  A1: { min: 0, note: 'Start at the alphabet and Unit 1 — solid fundamentals make everything easier.' },
  A2: { min: 4, note: 'You know the basics. Start at Unit 11 (A2) but don\'t skip alphabet practice.' },
  B1: { min: 8, note: 'You can handle everyday life. Start at Unit 21 (B1).' },
  B2: { min: 11, note: 'Strong! Start at Unit 31 (B2) and push into sophisticated topics.' }
};

export function resolveLevel(correct) {
  if (correct >= 11) return 'B2';
  if (correct >= 8) return 'B1';
  if (correct >= 4) return 'A2';
  return 'A1';
}

export function render() {
  return `
  <section class="placement">
    <h1>Pon a prueba tu nivel <small>placement test</small></h1>
    <p class="lead">14 sentences, no time limit. Read each Spanish sentence and pick its meaning. Start where you belong — or choose the alphabet yourself.</p>
    <div data-slot="seat"></div>
  </section>`;
}

export function attach(root) {
  const seat = root.querySelector('[data-slot="seat"]');
  if (!seat) return;
  let i = 0;
  let correct = 0;
  const missed = [];
  const q = PLACEMENT_QUESTIONS;
  const renderQ = () => {
    const cur = q[i];
    seat.innerHTML = `
      <div class="plq">
        <span class="pill">${i + 1} of ${q.length}</span>
        <div class="pl-ru"><span class="es">${esc(cur.es)}</span> <button type="button" class="speak-link" data-speak="${esc(cur.es)}">🔊</button></div>
        <p class="hint">What does it mean?</p>
        <div class="mc-grid">${shuffleOpts(cur, i).map((o) =>
          `<button type="button" class="mc-btn" data-action="pick" data-val="${esc(o)}">${esc(o)}</button>`).join('')}</div>
      </div>`;
  };
  const done = () => {
    const level = resolveLevel(correct);
    const t = TARGET[level];
    setPlacement(level);
    if (!placementInfo().done) addXp(correct * 2);
    recordActivity();
    const first = { A1: 'u01', A2: 'u11', B1: 'u21', B2: 'u31' }[level];
    seat.innerHTML = `
      <div class="ex-done">
        <h2>Your level: <span class="level-chip">${level}</span></h2>
        <p><b>${correct} of ${q.length}</b> correct. ${esc(t.note)}</p>
        ${missed.length ? `<details class="missed"><summary>Review ${missed.length} missed sentence(s)</summary><ul>${missed.map((m) => `<li><span class="es">${esc(m.es)}</span> — <b>${esc(m.correct)}</b></li>`).join('')}</ul></details>` : ''}
        <div class="btn-row">
          <a class="btn primary big" href="${href('lesson', { unitId: first })}">Start at ${level} →</a>
          <a class="btn big" href="#/alphabet">Start at the alphabet</a>
          <button type="button" class="btn" data-action="retake">Retake</button>
        </div>
      </div>`;
  };
  if (root.addEventListener) {
    root.addEventListener('click', (e) => {
      const rt = e.target.closest ? e.target.closest('[data-action="retake"]') : null;
      if (rt) { location.hash = '#/home'; setTimeout(() => { location.hash = '#/placement'; }, 0); return; }
      const b = e.target.closest ? e.target.closest('[data-action="pick"]') : null;
      if (b) {
        if (b.getAttribute('data-val') === curAnswer(q[i])) correct++;
        else missed.push(q[i]);
        i++;
        if (i >= q.length) done();
        else renderQ();
        if (i === q.length) erase(q, i);
      }
    });
  }
  renderQ();
}

function curAnswer(cur) { return cur.correct; }

function shuffleOpts(cur, seed) {
  const arr = cur.options.slice();
  const i0 = seed % arr.length;
  const i1 = (seed * 2 + 1) % arr.length;
  if (i0 !== i1) { [arr[i0], arr[i1]] = [arr[i1], arr[i0]]; }
  return arr;
}

function erase(q, i) { void q; void i; }
