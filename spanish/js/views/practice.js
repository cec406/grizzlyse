// Practice hub: pick unit/level + difficulty, then launch any game.
import { esc } from '../ui.js';
import { UNITS } from '../../data/index.js';
import { settings, setSettings } from '../state.js';
import { GAMES, gameById } from '../games/registry.js';
import { runGame } from '../games/runner.js';
import { makeSession, difficultyConf } from '../games/logic.js';
import { runFlashcards } from '../games/flashcards.js';
import { applyAnswer, applyResult } from '../srs-store.js';

const LEVELS = ['all', 'A1', 'A2', 'B1', 'B2', 'C1'];

export function render(params) {
  const unitId = params.unitId || 'all';
  const s = settings();
  return `
  <section class="practice">
    <h1>Práctica <small>practice</small></h1>
    <p class="lead">Every game works with any unit or level. Each answer feeds your review queue; each wrong answer schedules a card.</p>
    <div class="practice-setup">
      <div class="setup-row">
        <label>Level</label>
        <div class="chips">
          ${LEVELS.map((lv) => `<button type="button" class="chip ${s.levelFilter === lv ? 'active' : ''}" data-set="level" data-val="${lv}">${lv === 'all' ? 'All levels' : esc(lv)}</button>`).join('')}
        </div>
      </div>
      <div class="setup-row">
        <label>Unit</label>
        <select data-set="unit">
          <option value="all">All unlocked words</option>
          ${UNITS.map((u) => `<option value="${u.id}" ${unitId === u.id ? 'selected' : ''}>${u.number}. ${esc(u.title)}</option>`).join('')}
        </select>
      </div>
      <div class="setup-row">
        <label>Difficulty</label>
        <div class="chips">
          ${['easy', 'medium', 'hard'].map((d) => `<button type="button" class="chip ${(s.difficulty || 'medium') === d ? 'active' : ''}" data-set="diff" data-val="${d}">${esc(difficultyConf(d).label)}</button>`).join('')}
        </div>
      </div>
      ${unitId !== 'all' ? `<p class="hint">Focused practice for unit ${esc(unitId)}.</p>` : ''}
    </div>
    <div class="game-grid">
      ${GAMES.map((g) => `
        <button type="button" class="game-card" data-action="game" data-game="${g.id}">
          <span class="game-ic">${g.icon}</span>
          <b>${esc(g.title)}</b>
          <span class="game-desc">${esc(g.desc)}</span>
          <span class="mini">${esc(g.needs)}</span>
        </button>`).join('')}
    </div>
    <div data-slot="runner"></div>
    <div class="hint-box">
      <p>💡 Cards from mistakes land in <a href="#/review">Daily Review</a>. Practice beats cramming — a little every day.</p>
    </div>
  </section>`;
}

export function attach(root, params) {
  if (!root.addEventListener) return;
  root.addEventListener('click', (e) => {
    const chip = e.target.closest ? e.target.closest('[data-set]') : null;
    if (chip && chip.tagName === 'BUTTON') {
      const set = chip.getAttribute('data-set');
      const val = chip.getAttribute('data-val');
      if (set === 'level') setSettings({ levelFilter: val });
      if (set === 'diff') setSettings({ difficulty: val });
      if (root.querySelectorAll) root.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c === chip));
      return;
    }
    if (chip && chip.tagName === 'SELECT') {
      setSettings({ unitFilter: chip.value });
      return;
    }
    const gb = e.target.closest ? e.target.closest('[data-game]') : null;
    if (gb) {
      const gameId = gb.getAttribute('data-game');
      const slot = root.querySelector('[data-slot="runner"]');
      if (slot) launch(gameId, params.unitId || settings().unitFilter || 'all', slot);
    }
  });
}

function launch(gameId, unitId, slot) {
  const game = gameById(gameId);
  const diff = difficultyConf(settings().difficulty || 'medium');
  const pool = poolFor(unitId);
  if (!pool.words.length && game.needs && game.needs.includes('words')) {
    slot.innerHTML = `<div class="banner warn">No words yet — <a href="#/lesson/u01">start Unit 1</a> first.</div>`;
    return;
  }
  if (game.mode === 'flashcards') {
    runFlashcards(slot, { pool: pool.words, count: diff.count });
    return;
  }
  const ctx = { pool: pool.words, sentences: pool.sentences, count: diff.count, level: null, rng: Math.random };
  let questions;
  try {
    questions = game.build(ctx);
  } catch (err) {
    slot.innerHTML = `<div class="banner warn">This game needs more content here — try a different unit or level. (${esc(err.message)})</div>`;
    return;
  }
  if (!questions || !questions.length) {
    slot.innerHTML = `<div class="banner warn">Not enough content for this game yet — try another unit.</div>`;
    return;
  }
  const session = makeSession(gameId, questions, diff, { timers: gameId === 'speed' });
  runGame(slot, {
    game,
    session,
    onFeedback: (rec, q) => applyAnswer(rec, q),
    onComplete: (r) => applyResult(r, { gameId, unitId }),
    again: () => launch(gameId, unitId, slot)
  });
}

export function poolFor(unitId) {
  const units = unitId && unitId !== 'all'
    ? UNITS.filter((u) => u.id === unitId)
    : UNITS.filter((u) => settings().levelFilter === 'all' || u.level === settings().levelFilter);
  const words = [];
  const seen = new Set();
  for (const u of units) {
    for (const w of u.vocabulary || []) {
      if (!seen.has(w.id)) { seen.add(w.id); words.push({ ...w, unit: u.id }); }
    }
  }
  const sentences = units.flatMap((u) => (u.sentences || []).map((s) => ({ ...s, unit: u.id })));
  return { words: poolFor.ready(words), sentences };
}
poolFor.ready = (w) => w;
export { GAMES };