// Progress state persisted in localStorage (always guarded). Pure functions separate.

const KEY = 'russian-app-state-v1';

export function levelFromXp(xp) {
  // 0 XP = level 1. Each level needs 150 more XP than the previous one.
  const x = Math.max(0, xp);
  const lvl = Math.floor((Math.sqrt(1 + (8 * x) / 150) - 1) / 2);
  return lvl + 1;
}

export function levelProgress(xp) {
  const lvl = levelFromXp(xp);
  const curBase = xpForLevel(lvl);
  const nextBase = xpForLevel(lvl + 1);
  return { level: lvl, into: xp - curBase, span: Math.max(1, nextBase - curBase), pct: Math.round(((xp - curBase) / Math.max(1, nextBase - curBase)) * 100) };
}

export function xpForLevel(level) {
  return 75 * level * (level - 1); // 0, 150, 450, 900, ...
}

export function nextStreak(lastDate, today, streak) {
  if (!lastDate) return 1;
  if (lastDate === today) return Math.max(1, streak);
  const [y, m, d] = lastDate.split('-').map(Number);
  const last = new Date(y, m - 1, d);
  const [ty, tm, td] = today.split('-').map(Number);
  const now = new Date(ty, tm - 1, td);
  const diff = Math.round((now - last) / 86400000);
  if (diff === 1) return streak + 1;
  return 1;
}

function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function defaultState() {
  return {
    xp: 0,
    streak: 0,
    lastDate: null,
    startedAt: Date.now(),
    placementDone: false,
    placementLevel: null,
    lessonsCompleted: [],
    lettersLearned: [],
    wordsLearned: [],
    phrasesLearned: [],
    accuracy: {}, // skill -> {ok, tot}
    skillBest: {}, // gameId -> best score
    badges: [],
    mastery: {},
    settings: { name: '', audio: true, speed: 0, showTranslit: true, levelFilter: 'all' }
  };
}

let cache = null;

export function loadState() {
  if (cache) return cache;
  let raw = null;
  try {
    raw = globalThis.localStorage && typeof globalThis.localStorage.getItem === 'function'
      ? globalThis.localStorage.getItem(KEY)
      : null;
  } catch { raw = null; }
  const parsed = safeParse(raw);
  cache = { ...defaultState(), ...(parsed || {}) };
  cache.settings = { ...defaultState().settings, ...(parsed && parsed.settings ? parsed.settings : {}) };
  return cache;
}

export function saveState() {
  const s = loadState();
  try {
    if (globalThis.localStorage && typeof globalThis.localStorage.setItem === 'function') {
      globalThis.localStorage.setItem(KEY, JSON.stringify(s));
    }
  } catch { /* storage full / private mode: keep in memory */ }
  return s;
}

function mutate(fn) {
  const s = loadState();
  fn(s);
  return saveState();
}

export function addXp(n) {
  mutate((s) => { s.xp += Math.max(0, n); });
  return { xp: loadState().xp };
}

export function recordActivity(today = todayKey()) {
  return mutate((s) => {
    if (s.lastDate !== today) {
      s.streak = nextStreak(s.lastDate, today, s.streak);
      s.lastDate = today;
    }
  });
}

export function recordAccuracy(skill, ok, n = 1) {
  return mutate((s) => {
    const a = (s.accuracy[skill] = s.accuracy[skill] || { ok: 0, tot: 0 });
    a.ok += ok ? n : 0;
    a.tot += n;
  });
}

export function accuracyPct(skill) {
  const a = loadState().accuracy[skill];
  return a && a.tot ? Math.round((a.ok / a.tot) * 100) : null;
}

export function allAccuracy() {
  return loadState().accuracy;
}

export function markLesson(unitId) {
  return mutate((s) => {
    if (!s.lessonsCompleted.includes(unitId)) s.lessonsCompleted.push(unitId);
  });
}

export function lessonDone(unitId) {
  return loadState().lessonsCompleted.includes(unitId);
}

export function markLetters(list) {
  return mutate((s) => {
    for (const l of list) if (!s.lettersLearned.includes(l)) s.lettersLearned.push(l);
  });
}

export function lettersLearned() {
  return loadState().lettersLearned;
}

export function markWords(list) {
  return mutate((s) => {
    for (const w of list) if (!s.wordsLearned.includes(w)) s.wordsLearned.push(w);
  });
}

export function wordsLearned() {
  return loadState().wordsLearned;
}

export function markPhrases(list) {
  return mutate((s) => {
    for (const p of list) if (!s.phrasesLearned.includes(p)) s.phrasesLearned.push(p);
  });
}

export function phrasesLearned() {
  return loadState().phrasesLearned;
}

export function setPlacement(level) {
  return mutate((s) => { s.placementDone = true; s.placementLevel = level; });
}

export function placementInfo() {
  const s = loadState();
  return { done: s.placementDone, level: s.placementLevel };
}

export function addBadge(id) {
  return mutate((s) => {
    if (!s.badges.includes(id)) s.badges.push(id);
  });
}

export function badges() {
  return loadState().badges;
}

export function setBest(gameId, score) {
  return mutate((s) => {
    s.skillBest[gameId] = Math.max(score, s.skillBest[gameId] || 0);
  });
}

export function bestFor(gameId) {
  return loadState().skillBest[gameId] || 0;
}

export function setSettings(patch) {
  return mutate((s) => { s.settings = { ...s.settings, ...patch }; });
}

export function settings() {
  return loadState().settings;
}

export function getCard(id) {
  return loadState().mastery[id] || null;
}

export function setCard(id, card) {
  return mutate((s) => {
    s.mastery = s.mastery || {};
    s.mastery[id] = card;
  });
}

export function allMastery() {
  return loadState().mastery || {};
}

export function subscribe(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}
const subscribers = new Set();

export function notifyChanged() {
  // called by views after state mutations that should re-render chrome
  for (const fn of subscribers) { try { fn(); } catch { /* ignore listener errors */ } }
}

export function exportStateJSON() {
  return JSON.stringify(loadState(), null, 2);
}

export function importStateJSON(text) {
  const parsed = safeParse(text);
  if (!parsed || typeof parsed !== 'object') throw new Error('Not valid JSON');
  cache = { ...defaultState(), ...parsed };
  saveState();
  return cache;
}

export function resetState() {
  try {
    if (globalThis.localStorage && typeof globalThis.localStorage.removeItem === 'function') {
      globalThis.localStorage.removeItem(KEY);
    }
  } catch { /* ignore */ }
  cache = null;
  return loadState();
}

function todayKey() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export { todayKey };