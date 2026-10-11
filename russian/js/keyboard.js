// On-screen Russian keyboard layout (standard ЙЦУКЕН) plus answer normalization.

export const KEY_ROWS = [
  ['Ё', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ'],
  ['Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э'],
  ['Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю']
];

export function allKeys() {
  return KEY_ROWS.flat();
}

export function stripStress(s) {
  return String(s).replace(/\u0301/g, '');
}

export function toLower(s) {
  return stripStress(String(s).toLowerCase()).trim();
}

export function normalizeYo(s) {
  return toLower(s).replace(/ё/g, 'е');
}

export function normalizeAnswer(s) {
  // Trim, lowercase, drop stress marks, unify ё -> е, collapse whitespace, drop punctuation.
  return normalizeYo(s)
    .replace(/[.,!?:;«»"'()…-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function answersEqual(user, correct, opts = {}) {
  const u = normalizeAnswer(user);
  const c = normalizeAnswer(correct);
  return u === c || u === normalizeYo(c);
}

export function onlyCyrillic(s) {
  return /^[\u0400-\u04FF\s]+$/.test(stripStress(String(s)).trim()) && stripStress(String(s)).trim().length > 0;
}

export function letterCountOf(s) {
  return stripStress(String(s)).replace(/[^\u0400-\u04FFёЁ]/g, '').length;
}