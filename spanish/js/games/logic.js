// Pure game/scoring logic, DOM-free, unit-testable.

export const DIFFICULTIES = [
  { id: 'easy', label: 'Easy', count: 8, xp: 5, msPerQ: 20000 },
  { id: 'medium', label: 'Medium', count: 12, xp: 8, msPerQ: 15000 },
  { id: 'hard', label: 'Hard', count: 16, xp: 12, msPerQ: 10000 }
];

export function difficultyConf(id) {
  return DIFFICULTIES.find((d) => d.id === id) || DIFFICULTIES[1];
}

export function makeSession(gameId, questions, difficulty, opts = {}) {
  return {
    gameId,
    difficulty: difficulty.id,
    questions,
    answers: [],
    startedAt: Date.now(),
    speedMs: difficulty.msPerQ,
    timers: opts.timers !== false
  };
}

export function grade(q, user) {
  let ok = false;
  let accepted = null;
  if (q.check) {
    ok = q.check(user);
    accepted = q.correctValue;
  } else if (q.type === 'mc') {
    ok = user === q.correct;
    accepted = q.correct;
  } else if (q.type === 'sort') {
    const joined = (Array.isArray(user) ? user : []).join(' ');
    ok = joined === q.correct;
    accepted = q.correct;
  } else if (q.type === 'grid') {
    ok = Array.isArray(user) && JSON.stringify(user) === JSON.stringify(q.correct);
    accepted = String(q.correct.join(' '));
  }
  return { ok, accepted, correct: accepted };
}

export function answerRecord(q, user, graded, elapsedMs) {
  return {
    prompt: q.prompt || q.es || q.en,
    es: q.es,
    user: Array.isArray(user) ? user.join(' ') : (user == null ? '' : String(user)),
    correct: graded.accepted == null ? q.accepted : String(graded.accepted),
    ok: graded.ok,
    elapsedMs
  };
}

export function finishSession(session) {
  const okCount = session.answers.filter((a) => a.ok).length;
  const total = session.answers.length;
  const pct = total ? Math.round((okCount / total) * 100) : 0;
  const diff = difficultyConf(session.difficulty);
  const xp = xpFor(okCount, total, diff);
  const mistakes = session.answers.filter((a) => !a.ok);
  return { ok: okCount, total, pct, xp, mistakes, perfect: total > 0 && okCount === total };
}

export function xpFor(ok, total, diff) {
  if (total === 0) return 0;
  const base = Math.round(ok * diff.xp);
  const bonus = ok === total ? 5 : 0;
  return base + bonus;
}

export function accuracyLabel(pct) {
  if (pct >= 95) return 'Excellent';
  if (pct >= 80) return 'Good';
  if (pct >= 60) return 'Getting there';
  return 'Keep practicing';
}

export function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample(arr, rng = Math.random) {
  return arr[Math.floor(rng() * arr.length)];
}

export function pickN(arr, n, rng = Math.random) {
  return shuffle(arr, rng).slice(0, n);
}

export function normalize(s) {
  return String(s ?? '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip accents (á→a, ñ→n)
    .toLowerCase()
    .replace(/[.,!?:;«»"'()…¡¿-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function eq(a, b) {
  if (typeof a === 'string' || typeof b === 'string') return normalize(a) === normalize(b);
  return a === b;
}

export function makeMc(qText, correct, distractors, rng) {
  const options = shuffle([correct, ...distractors], rng);
  return { type: 'mc', prompt: qText, correct, correctValue: correct, options, check: (u) => u === correct };
}

export function makeType(qText, correct, accepts = []) {
  const list = [correct, ...accepts];
  return {
    type: 'type',
    prompt: qText,
    accepted: correct,
    accepts: list,
    correctValue: correct,
    check: (u) => list.some((a) => eq(u, a))
  };
}

export function wordsOf(es) {
  // splits a Spanish sentence into its words (used by scramble and fill)
  return String(es)
    .split(/\s+/)
    .filter(Boolean);
}