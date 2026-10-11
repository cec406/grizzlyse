// Progress: stats, accuracy, weak spots, achievements, export/import, reset.
import { esc } from '../ui.js';
import { loadState, addBadge, badges, levelProgress, exportStateJSON, importStateJSON, resetState } from '../state.js';
import { weakest, queueStats } from '../srs-store.js';
import { allVocab, UNITS } from '../../data/index.js';
import { href } from '../router.js';
import { levelTitle } from '../fun.js';

const ACHIEVEMENTS = [
  { id: 'first-lesson', title: 'First steps', desc: 'Complete your first lesson', test: (s) => s.lessonsCompleted.length >= 1 },
  { id: 'alphabet-master', title: 'Accent ninja', desc: 'Study all 27 letters', test: (s) => s.lettersLearned.length >= 27 },
  { id: 'word-50', title: 'First fifty', desc: 'Learn 50 words', test: (s) => s.wordsLearned.length >= 50 },
  { id: 'word-100', title: 'Centurion', desc: 'Learn 100 words', test: (s) => s.wordsLearned.length >= 100 },
  { id: 'word-250', title: 'Growing', desc: 'Learn 250 words', test: (s) => s.wordsLearned.length >= 250 },
  { id: 'word-500', title: 'Half thousand', desc: 'Learn 500 words', test: (s) => s.wordsLearned.length >= 500 },
  { id: 'word-1000', title: 'Millennium', desc: 'Learn 1000 words', test: (s) => s.wordsLearned.length >= 1000 },
  { id: 'three-units', title: 'Getting going', desc: 'Complete 3 units', test: (s) => s.lessonsCompleted.length >= 3 },
  { id: 'ten-units', title: 'A1 finished', desc: 'Complete 10 units', test: (s) => s.lessonsCompleted.length >= 10 },
  { id: 'twenty-units', title: 'A2 finished', desc: 'Complete 20 units', test: (s) => s.lessonsCompleted.length >= 20 },
  { id: 'thirty-units', title: 'B1 finished', desc: 'Complete 30 units', test: (s) => s.lessonsCompleted.length >= 30 },
  { id: 'forty-units', title: 'B2 finished', desc: 'Complete 40 units', test: (s) => s.lessonsCompleted.length >= 40 },
  { id: 'all-units', title: 'C1 graduate', desc: 'Complete all 48 units', test: (s) => s.lessonsCompleted.length >= 48 },
  { id: 'streak-3', title: 'Habit maker', desc: '3-day streak', test: (s) => s.streak >= 3 },
  { id: 'streak-7', title: 'Week warrior', desc: '7-day streak', test: (s) => s.streak >= 7 },
  { id: 'streak-30', title: 'Monthly machine', desc: '30-day streak', test: (s) => s.streak >= 30 },
  { id: 'game-10', title: 'Player', desc: 'Play 10 games', test: (s) => gameCount(s) >= 10 },
  { id: 'game-30', title: 'Gamer', desc: 'Play 30 games', test: (s) => gameCount(s) >= 30 },
  { id: 'review-50', title: 'Reviewer', desc: 'Review 50 cards', test: (s) => reviewCount(s) >= 50 },
  { id: 'perfect-run', title: 'Flawless', desc: 'Finish any game with 100%', test: (s) => Object.keys(s.skillBest).filter((k) => s.skillBest[k] === 100).length >= 1 },
  { id: 'placement', title: 'Placed', desc: 'Take the placement test', test: (s) => s.placementDone },
  { id: 'wepa', title: '¡Wepa!', desc: 'Play 5 different games', test: (s) => gameCount(s) >= 5 },
  { id: 'coqui', title: 'Coquí', desc: 'Reach level 4', test: (s) => levelProgress(s.xp || 0).level >= 4 },
  { id: 'mofongo', title: 'Mofongo master', desc: 'Learn 200 words', test: (s) => (s.wordsLearned || []).length >= 200 },
  { id: 'parcha', title: 'Parcha power', desc: 'Review 10 cards', test: (s) => reviewCount(s) >= 10 },
  { id: 'boricua', title: 'Boricua', desc: 'Finish the Puerto Rico units (10 & 42)', test: (s) => (s.lessonsCompleted || []).includes('u10') && (s.lessonsCompleted || []).includes('u42') },
  { id: 'examen', title: 'Examen listo', desc: 'Pass the Unit 47 proficiency exam', test: (s) => (s.lessonsCompleted || []).includes('u47') }
];

function gameCount(s) { return Object.keys(s.skillBest || {}).reduce((n, k) => n + Number((s.skillBest[k] || 0) > 0), 0); }
function reviewCount(s) {
  return Object.values(s.mastery || {}).reduce((n, c) => n + (c.n || 0), 0);
}

export function render() {
  const s = loadState();
  const lvl = levelProgress(s.xp);
  for (const a of ACHIEVEMENTS) if (a.test(s)) addBadge(a.id);
  const earned = badges();
  const weak = weakest();
  const vocab = allVocab();
  const qs = queueStats();
  const skills = Object.entries(s.accuracy).map(([k, v]) => ({ k, ok: v.ok, tot: v.tot, pct: Math.round((v.ok / Math.max(1, v.tot)) * 100) })).sort((a, b) => a.pct - b.pct);

  return `
  <section class="progress">
    <h1>Progreso <small>your progress</small></h1>
    <div class="stat-strip tall">
      <div class="stat-card">${esc(lvl.level)}<span>${esc(levelTitle(lvl.level))}</span></div>
      <div class="stat-card">${esc(lvl.pct)}%<span>to level ${esc(lvl.level + 1)}</span></div>
      <div class="stat-card">${esc(s.xp)}<span>XP</span></div>
      <div class="stat-card">${esc(s.streak)}<span>day streak</span></div>
      <div class="stat-card">${esc(s.lettersLearned.length)}<span>letters (of 27)</span></div>
      <div class="stat-card">${esc(s.wordsLearned.length)}<span>words learned</span></div>
      <div class="stat-card">${esc(s.lessonsCompleted.length)}<span>units done (of ${esc(UNITS.length)})</span></div>
      <div class="stat-card">${esc(qs.learned)}<span>SRS cards</span></div>
    </div>
    <div class="progress-bar" style="--f:${lvl.pct}%"><div class="progress-fill" style="width:${lvl.pct}%"></div></div>

    <h2 class="sec">Accuracy by skill</h2>
    ${skills.length
      ? `<div class="skill-grid">${skills.map((sk) => `
        <div class="skill-row"><span>${esc(sk.k)}</span><b>${sk.pct}%</b>
          <div class="progress slim"><div class="progress-fill ${sk.pct < 60 ? 'low' : ''}" style="width:${sk.pct}%"></div></div>
          <span class="mini">${sk.ok}/${sk.tot}</span></div>`).join('')}</div>`
      : '<p class="hint">Accuracy builds as you play games and take quizzes.</p>'}

    <h2 class="sec">Weak spots (most often missed)</h2>
    ${weak.length
      ? `<div class="weak-list">${weak.map((w) => {
        const v = vocab.get(w.id);
        const es = v ? v.es !== undefined ? v.es : v.word.es : w.id;
        const en = v ? v.word.en : w.id;
        return `<div class="weak-chip"><span class="es">${esc(es)}</span> — ${esc(en)} <span class="mini">${w.lapses}/${w.n} missed</span></div>`;
      }).join('')}</div>
      <a class="btn ghost" href="${href('review')}">▶ review now</a>`
      : '<p class="hint">No weak spots to report yet.</p>'}

    ${weak.length ? `<div class="weak-list"><button type="button" class="primary" data-action="go-review">Practice weak words</button></div>` : ''}

    <h2 class="sec">Achievements (${earned.length}/${ACHIEVEMENTS.length})</h2>
    <div class="badge-grid">
      ${ACHIEVEMENTS.map((a) => {
        const got = earned.includes(a.id);
        return `<div class="badge ${got ? '' : 'locked'}"><span class="b-ic">${got ? '🏅' : '🔒'}</span><b>${esc(a.title)}</b><span class="mini">${esc(a.desc)}</span></div>`;
      }).join('')}
    </div>

    <h2 class="sec">Your data</h2>
    <div class="data-tools">
      <button type="button" class="btn" data-action="export">⬇ Export progress (JSON)</button>
      <label class="btn">⬆ Import progress<input type="file" accept="application/json" data-action="import" style="display:none"></label>
      <button type="button" class="btn danger" data-action="reset">🗑 Reset all progress</button>
    </div>
    <div data-slot="msg"></div>
  </section>`;
}

export function attach(root) {
  if (!root.addEventListener) return;
  root.addEventListener('click', (e) => {
    const b = e.target.closest ? e.target.closest('[data-action]') : null;
    const action = b && b.getAttribute('data-action');
    const msg = root.querySelector('[data-slot="msg"]');
    const out = (html) => { if (msg) msg.innerHTML = html; };
    if (action === 'go-review') { location.hash = '#/review'; return; }
    if (action === 'export') {
      const blob = new Blob([exportStateJSON()], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'spanish-progress.json';
      a.click();
      URL.revokeObjectURL(url);
      out('<div class="banner ok-banner">Progress exported.</div>');
    } else if (action === 'import') {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            importStateJSON(String(reader.result));
            out('<div class="banner ok-banner">Progress imported. <button type="button" class="ghost" data-action="reload">Reload page</button></div>');
          } catch (err) {
            out(`<div class="banner warn">Import failed: ${esc(String(err.message))}</div>`);
          }
        };
        reader.readAsText(file);
        const rb = root.querySelector('[data-action="reload"]');
        if (rb) rb.addEventListener('click', () => location.reload());
      }
    } else if (action === 'reset') {
      if (window.confirm('Erase ALL progress? This cannot be undone.')) {
        resetState();
        location.hash = '#/home';
        location.reload();
      }
    }
  });
}