// Spanish keyboard & accent trainer data.
//
// Spanish uses the standard Latin QWERTY keyboard; the things learners must
// master are the *accented* characters and inverted punctuation:
//   á é í ó ú  ü  ñ   Á É Í Ó Ú  Ü  Ñ   ¿ ¡
//
// This module gives: how to produce each one (Spanish dead keys, Windows Alt
// codes, macOS Option codes, or the in-app accent bar), dead-key combination
// logic for the typing drill, and graded typing lessons.

export const FINGERS = {
  'l-pinky': { label: 'Left pinky', short: 'L5', color: 'f-l5' },
  'l-ring': { label: 'Left ring', short: 'L4', color: 'f-l4' },
  'l-middle': { label: 'Left middle', short: 'L3', color: 'f-l3' },
  'l-index': { label: 'Left index', short: 'L2', color: 'f-l2' },
  'r-index': { label: 'Right index', short: 'R2', color: 'f-r2' },
  'r-middle': { label: 'Right middle', short: 'R3', color: 'f-r3' },
  'r-ring': { label: 'Right ring', short: 'R4', color: 'f-r4' },
  'r-pinky': { label: 'Right pinky', short: 'R5', color: 'f-r5' },
  space: { label: 'Thumbs', short: 'SP', color: 'f-sp' }
};

// The accent bar the app itself provides — click to insert.
export const ACCENT_ROWS = [
  ['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'],
  ['Á', 'É', 'Í', 'Ó', 'Ú', 'Ü', 'Ñ'],
  ['¿', '¡']
];

// Every special character, with the four reliable ways to produce it.
export const SPECIAL_CHARS = [
  { ch: 'á', name: 'a with acute', dead: "' + a", win: 'Alt+0225 or Alt+160', mac: 'Option+e, then a' },
  { ch: 'é', name: 'e with acute', dead: "' + e", win: 'Alt+0233 or Alt+130', mac: 'Option+e, then e' },
  { ch: 'í', name: 'i with acute', dead: "' + i", win: 'Alt+0237 or Alt+161', mac: 'Option+e, then i' },
  { ch: 'ó', name: 'o with acute', dead: "' + o", win: 'Alt+0243 or Alt+162', mac: 'Option+e, then o' },
  { ch: 'ú', name: 'u with acute', dead: "' + u", win: 'Alt+0250 or Alt+163', mac: 'Option+e, then u' },
  { ch: 'ü', name: 'u with diaeresis', dead: '" + u', win: 'Alt+0252 or Alt+129', mac: 'Option+u, then u' },
  { ch: 'ñ', name: 'eñe', dead: '~ + n', win: 'Alt+0241 or Alt+164', mac: 'Option+n, then n' },
  { ch: 'Á', name: 'A with acute', dead: "' + Shift+A", win: 'Alt+0193', mac: 'Option+e, then Shift+A' },
  { ch: 'É', name: 'E with acute', dead: "' + Shift+E", win: 'Alt+0201', mac: 'Option+e, then Shift+E' },
  { ch: 'Í', name: 'I with acute', dead: "' + Shift+I", win: 'Alt+0205', mac: 'Option+e, then Shift+I' },
  { ch: 'Ó', name: 'O with acute', dead: "' + Shift+O", win: 'Alt+0211', mac: 'Option+e, then Shift+O' },
  { ch: 'Ú', name: 'U with acute', dead: "' + Shift+U", win: 'Alt+0218', mac: 'Option+e, then Shift+U' },
  { ch: 'Ü', name: 'U with diaeresis', dead: '" + Shift+U', win: 'Alt+0220', mac: 'Option+u, then Shift+U' },
  { ch: 'Ñ', name: 'capital eñe', dead: '~ + Shift+N', win: 'Alt+0209', mac: 'Option+n, then Shift+N' },
  { ch: '¿', name: 'inverted question mark', dead: '—', win: 'Alt+0191 or Alt+168', mac: 'Option+Shift+?' },
  { ch: '¡', name: 'inverted exclamation mark', dead: '—', win: 'Alt+0161 or Alt+173', mac: 'Option+1' }
];

// Dead keys a learner can press before a vowel (works even on a US layout).
const DEAD_ACCENTS = {
  "'": 'acute',        // apostrophe  -> ´
  '´': 'acute',
  '"': 'diaeresis',    // shift+apostrophe -> ¨
  '¨': 'diaeresis',
  '~': 'tilde',        // -> ~
  '`': 'grave'
};

const COMBOS = {
  acute: { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú', A: 'Á', E: 'É', I: 'Í', O: 'Ó', U: 'Ú' },
  diaeresis: { u: 'ü', U: 'Ü' },
  tilde: { n: 'ñ', N: 'Ñ' },
  grave: { a: 'à', e: 'è', i: 'ì', o: 'ò', u: 'ù', A: 'À', E: 'È', I: 'Ì', O: 'Ò', U: 'Ù' }
};

export function isDeadKey(key) {
  return Object.prototype.hasOwnProperty.call(DEAD_ACCENTS, key);
}

// Combine a dead-key accent with a base letter, e.g. deadCombine("'", 'a') -> 'á'.
export function deadCombine(deadKey, base) {
  const accent = DEAD_ACCENTS[deadKey];
  if (!accent || !base) return null;
  return COMBOS[accent][base] || null;
}

// Characters that need the accent bar / special handling.
export function isSpecial(ch) {
  return /[áéíóúüñÁÉÍÓÚÜÑ¿¡]/.test(ch);
}

export function specialFor(ch) {
  return SPECIAL_CHARS.find((s) => s.ch === ch) || null;
}

// Graded typing drills. `items` are typed one at a time.
export const KEYBOARD_LESSONS = [
  {
    id: 'vocales', title: 'Accented vowels', icon: '´',
    desc: 'á é í ó ú — the most common accent. Type an accent (apostrophe) then the vowel.',
    items: ['á', 'é', 'í', 'ó', 'ú', 'á é í ó ú',
      'papá', 'mamá', 'café', 'sofá', 'aquí', 'allí',
      'música', 'pájaro', 'teléfono', 'número', 'fácil', 'también']
  },
  {
    id: 'ene', title: 'The letter ñ', icon: 'ñ',
    desc: 'ñ is its own letter, not an n with a squiggle. Try typing ~ then n.',
    items: ['ñ', 'ña ñe ñi ño ñu', 'niño', 'niña', 'año', 'mañana', 'español', 'señor',
      'montaña', 'piña', 'muñeca', 'pequeño', 'sueño', 'baño']
  },
  {
    id: 'dieresis', title: 'Dieresis ü', icon: 'ü',
    desc: 'The diaeresis makes a u that is actually pronounced. Type " then u.',
    items: ['ü', 'pingüino', 'vergüenza', 'cigüeña', 'güero', 'bilingüe']
  },
  {
    id: 'signos', title: 'Inverted punctuation', icon: '¿',
    desc: 'Spanish opens questions and exclamations: ¿…? and ¡…!',
    items: ['¿', '¡', '¿Qué?', '¿Cómo?', '¡Hola!', '¡Gracias!',
      '¿Cómo estás?', '¡Buenos días!', '¿Dónde está el baño?', '¡Qué bueno!']
  },
  {
    id: 'palabras', title: 'Everyday words', icon: '📖',
    desc: 'High-frequency words with accents — type them exactly.',
    items: ['día', 'sí', 'más', 'está', 'también', 'después', 'aquí', 'según',
      'país', 'raíz', 'corazón', 'canción', 'jardín', 'árbol', 'lápiz', 'débil']
  },
  {
    id: 'frases', title: 'Sentences', icon: '💬',
    desc: 'Real sentences with accents and inverted punctuation. Use the space bar.',
    items: ['¿Cómo te llamas?', 'Me llamo Ana.', '¿De dónde eres?', 'Soy de Puerto Rico.',
      '¡Mucho gusto!', '¿Dónde está la playa?', 'El niño está en la mañana.']
  },
  {
    id: 'pro', title: 'Tech & work', icon: '💻',
    desc: 'Professional and technology vocabulary with its accents.',
    items: ['contraseña', 'aplicación', 'versión', 'búsqueda', 'código',
      'reunión', 'presentación', 'información', 'gestión', 'análisis']
  },
  {
    id: 'speed', title: 'Speed test', icon: '⏱',
    desc: 'A mixed stream of everything. Accuracy above all.',
    items: ['español', 'mañana', 'corazón', 'pingüino', '¿cómo estás?',
      'número', 'país', 'café', 'montaña', 'también', '¡perfecto!']
  }
];

export function lessonById(id) {
  return KEYBOARD_LESSONS.find((l) => l.id === id) || KEYBOARD_LESSONS[0];
}
