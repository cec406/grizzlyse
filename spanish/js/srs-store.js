// Bridge between games/results and the SRS queue + XP/badges in state.
import { newCard, grade, isDue, dueQueue, summary } from './srs.js';
import { getCard, setCard, allMastery, addXp, markWords, markPhrases, setBest, recordActivity, addBadge } from './state.js';

export function rememberWrong(id) {
  if (!id) return;
  const c = getCard(id) || newCard(id);
  const g = grade(c, 0);
  setCard(id, g);
  return g;
}

export function rememberRight(id, quality = 4) {
  if (!id) return;
  const c = getCard(id) || newCard(id);
  const g = grade(c, quality);
  setCard(id, g);
  return g;
}

export function reviewQueue(limit = 40) {
  const map = allMastery();
  const cards = Object.entries(map).map(([id, card]) => ({ id, ...card }));
  const queue = dueQueue(cards, Date.now(), limit);
  return { queue, summary: summary(cards) };
}

export function dueNow(limit = 40) {
  return reviewQueue(limit).queue;
}

export function wordLabel(id, set) {
  const w = set.get(id);
  return w ? { es: w.es !== undefined ? w.es : w.word.es, en: w.word.en, translit: w.word.translit || w.word.trans } : null;
}

export function weakest() {
  const map = allMastery();
  return Object.entries(map)
    .map(([id, card]) => ({ id, ...card }))
    .filter((c) => c.n > 0)
    .sort((a, b) => (b.lapses / Math.max(1, b.n)) - (a.lapses / Math.max(1, a.n)))
    .slice(0, 10);
}

export function applyResult(r, { gameId, unitId }) {
  addXp(r.xp);
  setBest(gameId, r.pct);
  recordActivity();
  if (r.perfect) addBadge('perfect-' + gameId);
  return r;
}

export function applyAnswer(rec, q) {
  // SRS + word learning on every answered item
  if (q && q.did) {
    if (rec.ok) {
      const id = q.did;
      const c = getCard(id) || newCard(id);
      setCard(id, grade(c, 4));
      markWords([id]);
      const w = getCard(id);
      if (w && w.box >= 3) { /* novel */ }
    } else {
      rememberWrong(q.did);
    }
  }
  if (q && q.pid) {
    if (rec.ok) markPhrases([q.pid]);
    else rememberWrong(q.pid);
  }
}

export function queueStats() {
  return summary(Object.values(allMastery()));
}