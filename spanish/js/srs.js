// SRS: 6-review-box Leitner (boxes 1..6, box 0 = new/unlearned). Pure functions.

export const BOX_INTERVAL_DAYS = [1, 1, 2, 4, 7, 15, 30];
export const MAX_BOX = 6;

export function newCard(id, now = Date.now()) {
  return { id, box: 0, due: now, last: now, lapses: 0, ok: 0, n: 0, streak: 0 };
}

export function intervalDays(box) {
  const i = Math.max(0, Math.min(MAX_BOX, box));
  return BOX_INTERVAL_DAYS[i];
}

export function grade(card, quality, now = Date.now()) {
  const c = { ...card };
  c.n += 1;
  c.last = now;
  if (quality < 3) {
    c.lapses += 1;
    c.streak = 0;
    c.box = Math.max(1, c.box - 1);
  } else {
    c.ok += 1;
    c.streak += 1;
    c.box = Math.min(MAX_BOX, c.box + 1);
  }
  c.due = now + intervalDays(c.box) * 86400000;
  return c;
}

export function isDue(card, now = Date.now()) {
  return card.due <= now;
}

export function dueQueue(cards, now = Date.now(), limit = 30) {
  return cards
    .filter((c) => isDue(c, now))
    .sort((a, b) => a.due - b.due)
    .slice(0, limit);
}

export function mostDue(cards, now = Date.now(), k = 10) {
  return cards
    .filter((c) => c.n > 0)
    .sort((a, b) => {
      const da = isDue(a, now) ? 0 : 1;
      const db = isDue(b, now) ? 0 : 1;
      if (da !== db) return da - db;
      return a.due - b.due;
    })
    .slice(0, k);
}

export function summary(cards) {
  const buckets = [0, 0, 0, 0, 0, 0, 0];
  let due = 0;
  const now = Date.now();
  for (const c of cards) {
    if (c.box >= 1 && c.box <= MAX_BOX) buckets[c.box] += 1;
    if (c.box === 0) buckets[0] += 1;
    if (isDue(c, now)) due += 1;
  }
  return { total: cards.length, buckets, due, learned: cards.filter((c) => c.box > 0).length };
}

export function demote(card, now = Date.now()) {
  return grade(card, 0, now);
}