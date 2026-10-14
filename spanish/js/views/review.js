// Daily Review — SRS-driven flashcard queue (all mistakes land here).
import { esc } from '../ui.js';
import { allVocab } from '../../data/index.js';
import { allPackWords } from '../../data/word-packs.js';
import { allCyberTerms } from '../../data/cyber.js';
import { grade } from '../srs.js';
import { getCard, setCard, recordActivity, addXp, addBadge, recordAccuracy } from '../state.js';
import { reviewQueue } from '../srs-store.js';

export function render() {
  const { queue, summary } = reviewQueue();
  return `
  <section class="review">
    <h1>Repaso <small>daily review</small></h1>
    <p class="lead">Spaced repetition: cards you miss come back sooner, cards you know fade out. Do a few minutes every day.</p>
    <div class="stat-strip">
      <div class="stat-card">${esc(summary.due)}<span>due today</span></div>
      <div class="stat-card">${esc(summary.learned)}<span>learned</span></div>
      <div class="stat-card">${esc(summary.buckets[5] || 0)}<span>in long-term box</span></div>
    </div>
    <div data-slot="queue"></div>
    <div data-slot="session"></div>
  </section>`;
}

export function attach(root) {
  if (!root.addEventListener) return;
  const slot = root.querySelector('[data-slot="session"]');
  const queueSlot = root.querySelector('[data-slot="queue"]');
  const refresh = () => {
    const { queue, summary } = reviewQueue();
    queueSlot.innerHTML = queue.length
      ? `<div class="banner"><b>${queue.length} cards due now.</b> Words you missed in games, and words you haven\'t seen in a while.</div>`
      : `<div class="banner ok-banner"><b>Nothing due right now.</b> Words from games will appear here. Or practice more to build your queue.</div>`;
    void summary;
  };
  refresh();
  const { queue } = reviewQueue();
  if (queue.length && slot) startReview(slot, refresh);
}

function startReview(slot, refresh) {
  const { queue } = reviewQueue();
  if (!queue.length) {
    slot.innerHTML = `<div class="banner ok-banner"><b>All caught up!</b> 🎉 Nothing due right now.</div>`;
    return;
  }
  const cards = queue;
  const vocab = allVocab();
  // Resolve dictionary and professional-track words too, not just unit vocabulary.
  for (const w of allPackWords()) if (!vocab.has(w.id)) vocab.set(w.id, { word: w });
  for (const t of allCyberTerms()) if (t.id && !vocab.has(t.id)) vocab.set(t.id, { word: t });
  let i = 0;
  let shown = false;
  let answered = 0;
  let correct = 0;
  const doneCard = (card) => {
    const g = getCard(card.id);
    return g;
  };
  const render = () => {
    if (i >= cards.length) {
      slot.innerHTML = `
        <div class="ex-done">
          <h3>Review session complete!</h3>
          <div class="stat-strip">
            <div class="stat-card">${esc(correct)}<span>correct</span></div>
            <div class="stat-card">${esc(answered)}<span>answered</span></div>
            <div class="stat-card">+${esc(answered * 2)}<span>XP</span></div>
          </div>
          ${correct === answered ? '<p>Perfect! The whole queue was refreshed.</p>' : '<p>Cards you missed will come back very soon — that\'s the plan.</p>'}
          <button type="button" class="primary" data-action="again2">Review again</button>
        </div>`;
      const ag = slot.querySelector('[data-action="again2"]');
      if (ag) ag.addEventListener('click', () => { refresh(); startReview(slot, refresh); });
      return;
    }
    const entry = cards[i];
    const word = vocab.get(entry.id);
    if (!word) { i++; render(); return; }
    const w = word.word || word;
    const card = doneCard(entry) || entry;
    slot.innerHTML = `
      <div class="review-card">
        <div class="rc-top"><span class="pill">box ${card.box} · seen ${card.n}×</span></div>
        ${shown
          ? `<div class="rc-back">
              <div class="es big">${esc(w.es)} <span class="trans">${esc(w.translit || w.trans || '')}</span> <button type="button" class="speak-link" data-speak="${esc(w.es)}">🔊</button></div>
              <p>${esc(w.en)}</p>
              <div class="grade-row">
                <button type="button" class="g-btn g-again" data-action="g1">🔁 Again</button>
                <button type="button" class="g-btn g-hard" data-action="g3">💪 Hard</button>
                <button type="button" class="g-btn g-good" data-action="g4">👍 Good</button>
                <button type="button" class="g-btn g-easy" data-action="g5">⚡ Easy</button>
              </div>
            </div>`
          : `<div class="rc-front"><div class="fcn">What is “<b>${esc(w.en)}</b>”?</div><button type="button" class="primary" data-action="flip">Reveal</button></div>`}
      </div>
      <p class="hint">${i + 1} of ${cards.length}</p>`;
    const flip = slot.querySelector('[data-action="flip"]');
    if (flip) flip.addEventListener('click', () => { shown = true; render(); });
    ['g1', 'g3', 'g4', 'g5'].forEach((act) => {
      const el = slot.querySelector(`[data-action="${act}"]`);
      if (el) el.addEventListener('click', () => {
        const q = Number(act.slice(1));
        setCard(card.id, grade(card, q));
        answered++;
        if (q >= 3) correct++;
        recordAccuracy('review', q >= 3);
        recordActivity();
        addXp(q >= 3 ? 2 : 0);
        if (answered === cards.length) addBadge('review-marathon');
        shown = false; i++;
        render();
      });
    });
  };
  render();
  refresh();
}