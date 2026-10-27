// Home dashboard.
import { esc } from '../ui.js';
import { levelProgress, loadState, wordsLearned, lessonDone, placementInfo } from '../state.js';
import { href } from '../router.js';
import { UNITS } from '../../data/index.js';
import { levelTitle } from '../fun.js';

export function render() {
  const s = loadState();
  const lvl = levelProgress(s.xp);
  const placement = placementInfo();
  const done = s.lessonsCompleted.length;
  const total = UNITS.length;
  const START = { A1: 'u01', A2: 'u11', B1: 'u23', B2: 'u35' };
  const startIdx = Math.max(0, UNITS.findIndex((u) => u.id === (placement.level ? START[placement.level] : 'u01')));
  const next = UNITS.slice(startIdx).find((u) => !lessonDone(u.id)) || UNITS.find((u) => !lessonDone(u.id)) || UNITS[UNITS.length - 1];
  const words = wordsLearned().length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  return `
  <section class="home">
    ${placement.done ? '' : `
    <div class="banner placement-banner">
      <div>
        <strong>Don't know where to start?</strong>
        <p>Take a 2-minute placement test and start at exactly your level — or begin at the alphabet.</p>
      </div>
      <a class="btn primary" href="${href('placement')}">Take placement test</a>
    </div>`}
    <h1>Приве́т! Let's learn Russian.</h1>
    <p class="lead">A written-first, zero→B2 course with games, spaced repetition and reading.</p>
    <div class="stat-strip">
      <div class="stat-card">${esc(lvl.level)}<span>${esc(levelTitle(lvl.level))}</span></div>
      <div class="stat-card">${esc(s.xp)}<span>XP</span></div>
      <div class="stat-card">${esc(s.streak)}<span>day streak</span></div>
      <div class="stat-card">${esc(words)}<span>words learned</span></div>
      <div class="stat-card">${esc(done)}/${esc(total)}<span>units done</span></div>
    </div>
    <div class="home-cta">
      <a class="btn primary big" href="${href('lesson', next ? { unitId: next.id } : {})}">
        ${done ? 'Continue' : 'Start'} ${next ? esc(next.title) : ''} →
      </a>
      ${done === 0 ? '<a class="btn big" href="#/alphabet">Learn the alphabet</a>' : ''}
      <a class="btn big" href="#/practice">Practice games</a>
      ${pct > 0 ? `<div class="progress"><div class="progress-fill" style="width:${pct}%"></div></div>
      <p class="hint">${esc(done)} of ${esc(total)} units completed (${esc(pct)}%)</p>` : ''}
    </div>
    <div class="card-grid">
      <a class="tile" href="#/path"><span class="tile-ic">🗺</span><b>Zero → hero path</b><span>the full roadmap from kindergarten to pro</span></a>
      <a class="tile" href="#/alphabet"><span class="tile-ic">🔤</span><b>Alphabet</b><span>33 letters, sounds, reading groups</span></a>
      <a class="tile" href="#/keyboard"><span class="tile-ic">⌨️</span><b>Keyboard trainer</b><span>learn ЙЦУКЕН touch typing on your new keyboard</span></a>
      <a class="tile" href="#/lessons"><span class="tile-ic">📚</span><b>Course</b><span>${esc(total)} units from greetings to B2 topics</span></a>
      <a class="tile" href="#/vocab"><span class="tile-ic">📖</span><b>Dictionary</b><span>search every word — English → Russian, with audio</span></a>
      <a class="tile" href="#/practice"><span class="tile-ic">🎮</span><b>Games</b><span>12 games for every word you learn</span></a>
      <a class="tile" href="#/review"><span class="tile-ic">🔁</span><b>Daily review</b><span>spaced repetition with a smart queue</span></a>
      <a class="tile" href="#/reading"><span class="tile-ic">📰</span><b>Reading</b><span>graded texts with tap-to-translate</span></a>
      <a class="tile" href="#/grammar"><span class="tile-ic">📐</span><b>Grammar</b><span>from noun gender to B2 constructions</span></a>
      <a class="tile" href="#/cyber"><span class="tile-ic">🛡</span><b>Pro &amp; tech Russian</b><span>the advanced professional register</span></a>
      <a class="tile" href="#/progress"><span class="tile-ic">📈</span><b>Progress</b><span>stats, accuracy, 20 badges</span></a>
      <a class="tile" href="#/audio-setup"><span class="tile-ic">🔊</span><b>Audio setup</b><span>get a Russian voice working on your machine</span></a>
    </div>
  </section>`;
}

export function attach() { /* static */ }