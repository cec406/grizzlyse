// Spanish accents helper + answer normalization.
// Spanish uses the standard Latin keyboard, so learners only need a small
// on-screen "accent bar" for accented vowels, ñ and inverted punctuation.

export const KEY_ROWS = [
  ['á', 'é', 'í', 'ó', 'ú', 'ü', 'ñ'],
  ['Á', 'É', 'Í', 'Ó', 'Ú', 'Ü', 'Ñ'],
  ['¿', '¡']
];

export function allKeys() {
  return KEY_ROWS.flat();
}

// Remove diacritics for forgiving answer checks: á→a, é→e, í→i, ó→o, ú→u,
// ü→u, and ñ→n (learners often omit accents and the tilde). Case preserved.
export function stripAccents(s) {
  return String(s)
    .replace(/[áàäâ]/g, 'a').replace(/[ÁÀÄÂ]/g, 'A')
    .replace(/[éèëê]/g, 'e').replace(/[ÉÈËÊ]/g, 'E')
    .replace(/[íìïî]/g, 'i').replace(/[ÍÌÏÎ]/g, 'I')
    .replace(/[óòöô]/g, 'o').replace(/[ÓÒÖÔ]/g, 'O')
    .replace(/[úùüû]/g, 'u').replace(/[ÚÙÜÛ]/g, 'U')
    .replace(/[ñ]/g, 'n').replace(/[Ñ]/g, 'N');
}

export function toLower(s) {
  return stripAccents(String(s).toLowerCase()).trim();
}

export function normalizeAnswer(s) {
  // Trim, lowercase, drop accents, collapse whitespace, drop punctuation.
  return toLower(s)
    .replace(/[.,!?:;«»"'()…¡¿-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function answersEqual(user, correct) {
  return normalizeAnswer(user) === normalizeAnswer(correct);
}

// True when the string is made of Spanish letters (plus spaces).
export function looksSpanish(s) {
  const t = stripAccents(String(s)).trim();
  return /^[a-zñ\s]+$/i.test(t) && t.length > 0;
}

export function letterCountOf(s) {
  return stripAccents(String(s)).replace(/[^a-zñ]/gi, '').length;
}
