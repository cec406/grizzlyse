// Hash router: pure route parsing + a small navigation helper.
// The DOM wiring lives in app.js so this module is unit-testable.

export const ROUTES = [
  { name: 'home', re: /^#\/home$/ },
  { name: 'path', re: /^#\/path$/ },
  { name: 'alphabet', re: /^#\/alphabet$/ },
  { name: 'keyboard', re: /^#\/keyboard$/ },
  { name: 'vocab', re: /^#\/vocab$/ },
  { name: 'cyber', re: /^#\/cyber$/ },
  { name: 'lessons', re: /^#\/lessons$/ },
  { name: 'lesson', re: /^#\/lesson\/([\w-]+)$/ },
  { name: 'practice', re: /^#\/practice$/ },
  { name: 'game', re: /^#\/game\/([\w-]+)$/ },
  { name: 'review', re: /^#\/review$/ },
  { name: 'reading', re: /^#\/reading$/ },
  { name: 'reading-text', re: /^#\/reading\/([\w-]+)$/ },
  { name: 'dialects', re: /^#\/dialects$/ },
  { name: 'grammar', re: /^#\/grammar$/ },
  { name: 'progress', re: /^#\/progress$/ },
  { name: 'audio-setup', re: /^#\/audio-setup$/ },
  { name: 'help', re: /^#\/help$/ },
  { name: 'placement', re: /^#\/placement$/ }
];

export const PARAMS_FOR = {
  lesson: ['unitId'],
  game: ['gameId'],
  'reading-text': ['textId']
};

function safeDecode(v) {
  try { return decodeURIComponent(v); } catch { return v; }
}

export function parseHash(hash) {
  let h = String(hash || '#/home');
  if (!h.startsWith('#')) return null;
  // Split off an optional ?query=string and expose it as params.
  let query = '';
  const qi = h.indexOf('?');
  if (qi >= 0) { query = h.slice(qi + 1); h = h.slice(0, qi); }
  for (const route of ROUTES) {
    const m = h.match(route.re);
    if (m) {
      const params = {};
      (PARAMS_FOR[route.name] || []).forEach((key, i) => {
        params[key] = m[i + 1] ? safeDecode(m[i + 1]) : undefined;
      });
      if (query) {
        for (const pair of query.split('&')) {
          if (!pair) continue;
          const eq = pair.indexOf('=');
          const k = eq >= 0 ? pair.slice(0, eq) : pair;
          const v = eq >= 0 ? pair.slice(eq + 1) : '';
          if (k) params[safeDecode(k)] = safeDecode(v);
        }
      }
      return { name: route.name, params };
    }
  }
  return null;
}

export function href(name, params) {
  const p = params || {};
  switch (name) {
    case 'home': return '#/home';
    case 'path': return '#/path';
    case 'keyboard': return '#/keyboard';
    case 'vocab': return '#/vocab';
    case 'cyber': return '#/cyber';
    case 'lesson': return `#/lesson/${p.unitId}`;
    case 'game': return `#/game/${p.gameId}`;
    case 'reading-text': return `#/reading/${p.textId}`;
    case 'alphabet': return '#/alphabet';
    case 'lessons': return '#/lessons';
    case 'practice': return '#/practice';
    case 'review': return '#/review';
    case 'reading': return '#/reading';
    case 'dialects': return '#/dialects';
    case 'grammar': return '#/grammar';
    case 'progress': return '#/progress';
    case 'audio-setup': return '#/audio-setup';
    case 'help': return '#/help';
    case 'placement': return '#/placement';
    default: return '#/home';
  }
}