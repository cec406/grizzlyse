// Spanish alphabet: 27 letters (A–Z plus Ñ).
// group: 1 = pure vowels, 2 = easy consonants, 3 = tricky consonants, 4 = Ñ.
export const LETTERS = [
  { upper: 'A', lower: 'a', name: 'a', nameT: 'ah', sound: 'a', approx: '"ah" as in "father"', example: 'agua', gloss: 'water', trans: 'AH-gwah', mnemonic: 'Always one clean sound: ah.', group: 1 },
  { upper: 'B', lower: 'b', name: 'be', nameT: 'beh', sound: 'b/v', approx: 'soft b that lets a little air through', example: 'bueno', gloss: 'good', trans: 'BWEH-noh', mnemonic: 'Softer than English b; between vowels it hums.', group: 3 },
  { upper: 'C', lower: 'c', name: 'ce', nameT: 'seh', sound: 's / k', approx: 's before e/i, k otherwise', example: 'casa', gloss: 'house', trans: 'KAH-sah', mnemonic: 'K in casa, s (or th) in cinco.', group: 3 },
  { upper: 'D', lower: 'd', name: 'de', nameT: 'deh', sound: 'd', approx: 'soft d with the tongue on the teeth', example: 'día', gloss: 'day', trans: 'DEE-ah', mnemonic: 'Tongue touches the teeth, not the ridge.', group: 3 },
  { upper: 'E', lower: 'e', name: 'e', nameT: 'eh', sound: 'e', approx: '"eh" as in "bed"', example: 'escuela', gloss: 'school', trans: 'es-KWEH-lah', mnemonic: 'Short and clean: eh.', group: 1 },
  { upper: 'F', lower: 'f', name: 'efe', nameT: 'EH-feh', sound: 'f', approx: '"f" as in "fire"', example: 'fácil', gloss: 'easy', trans: 'FAH-seel', mnemonic: 'Just like English f.', group: 2 },
  { upper: 'G', lower: 'g', name: 'ge', nameT: 'heh', sound: 'g / h', approx: 'hard g before a/o/u, raspy h before e/i', example: 'gato', gloss: 'cat', trans: 'GAH-toh', mnemonic: 'Gato has hard g; gente is a raspy h.', group: 3 },
  { upper: 'H', lower: 'h', name: 'hache', nameT: 'AH-cheh', sound: '(silent)', approx: 'always silent', example: 'hola', gloss: 'hello', trans: 'OH-lah', mnemonic: 'Never pronounced: hola starts with an o.', group: 3 },
  { upper: 'I', lower: 'i', name: 'i', nameT: 'ee', sound: 'i', approx: '"ee" as in "see"', example: 'isla', gloss: 'island', trans: 'EES-lah', mnemonic: 'Always ee, never eye.', group: 1 },
  { upper: 'J', lower: 'j', name: 'jota', nameT: 'HOH-tah', sound: 'h', approx: 'raspy h from the throat', example: 'jugo', gloss: 'juice', trans: 'HOO-goh', mnemonic: 'J sounds like a strong English h.', group: 3 },
  { upper: 'K', lower: 'k', name: 'ka', nameT: 'kah', sound: 'k', approx: '"k" as in "kilo"', example: 'kilo', gloss: 'kilo', trans: 'KEE-loh', mnemonic: 'Rare; only in borrowed words.', group: 2 },
  { upper: 'L', lower: 'l', name: 'ele', nameT: 'EH-leh', sound: 'l', approx: '"l" as in "love"', example: 'luna', gloss: 'moon', trans: 'LOO-nah', mnemonic: 'Like English l.', group: 2 },
  { upper: 'M', lower: 'm', name: 'eme', nameT: 'EH-meh', sound: 'm', approx: '"m" as in "mother"', example: 'mesa', gloss: 'table', trans: 'MEH-sah', mnemonic: 'Like English m.', group: 2 },
  { upper: 'N', lower: 'n', name: 'ene', nameT: 'EH-neh', sound: 'n', approx: '"n" as in "no"', example: 'noche', gloss: 'night', trans: 'NOH-cheh', mnemonic: 'Like English n.', group: 2 },
  { upper: 'Ñ', lower: 'ñ', name: 'eñe', nameT: 'EH-nyeh', sound: 'ny', approx: '"ny" as in "canyon"', example: 'niño', gloss: 'child', trans: 'NEE-nyoh', mnemonic: 'An n with a tilde: say ny.', group: 4 },
  { upper: 'O', lower: 'o', name: 'o', nameT: 'oh', sound: 'o', approx: '"oh" in "more", but shorter', example: 'ocho', gloss: 'eight', trans: 'OH-choh', mnemonic: 'Round and clean: oh.', group: 1 },
  { upper: 'P', lower: 'p', name: 'pe', nameT: 'peh', sound: 'p', approx: '"p" as in "spin"', example: 'pan', gloss: 'bread', trans: 'PAHN', mnemonic: 'Like English p, without the puff of air.', group: 2 },
  { upper: 'Q', lower: 'q', name: 'cu', nameT: 'koo', sound: 'k', approx: 'k, always with a silent u', example: 'queso', gloss: 'cheese', trans: 'KEH-soh', mnemonic: 'qu = k. The u stays silent.', group: 3 },
  { upper: 'R', lower: 'r', name: 'erre', nameT: 'EH-rreh', sound: 'r / rr', approx: 'a single tap, or a rolled trill', example: 'perro', gloss: 'dog', trans: 'PEH-rroh', mnemonic: 'One r taps; rr trills.', group: 3 },
  { upper: 'S', lower: 's', name: 'ese', nameT: 'EH-seh', sound: 's', approx: '"s" as in "sun"', example: 'sol', gloss: 'sun', trans: 'SOHL', mnemonic: 'Like English s.', group: 2 },
  { upper: 'T', lower: 't', name: 'te', nameT: 'teh', sound: 't', approx: 't with the tongue on the teeth', example: 'té', gloss: 'tea', trans: 'TEH', mnemonic: 'Tongue on the teeth, softer than English t.', group: 2 },
  { upper: 'U', lower: 'u', name: 'u', nameT: 'oo', sound: 'u', approx: '"oo" as in "boot"', example: 'uno', gloss: 'one', trans: 'OO-noh', mnemonic: 'Always oo; silent in que and gui.', group: 1 },
  { upper: 'V', lower: 'v', name: 'uve', nameT: 'OO-beh', sound: 'b/v', approx: 'the same soft sound as Spanish b', example: 'vaca', gloss: 'cow', trans: 'BAH-kah', mnemonic: 'V and B sound the same in Spanish.', group: 3 },
  { upper: 'W', lower: 'w', name: 'uve doble', nameT: 'OO-beh DOH-bleh', sound: 'w', approx: 'w, only in foreign words', example: 'wifi', gloss: 'wifi', trans: 'WEE-fee', mnemonic: 'Rare; borrowed words only.', group: 3 },
  { upper: 'X', lower: 'x', name: 'equis', nameT: 'EH-kees', sound: 'ks', approx: 'ks between vowels, s at the start', example: 'taxi', gloss: 'taxi', trans: 'TAHK-see', mnemonic: 'Like English x, with local variations.', group: 3 },
  { upper: 'Y', lower: 'y', name: 'ye', nameT: 'yeh', sound: 'y / ee', approx: 'y as in yes, or ee at the end', example: 'yo', gloss: 'I', trans: 'YOH', mnemonic: 'Consonant y, or ee at the end of a word.', group: 3 },
  { upper: 'Z', lower: 'z', name: 'zeta', nameT: 'SEH-tah', sound: 's', approx: 's in Latin America, th in Spain', example: 'zapato', gloss: 'shoe', trans: 'sah-PAH-toh', mnemonic: 'Sounds like s (or th in most of Spain).', group: 3 }
];

export const VOWELS = new Set('aeiouáéíóúü'.split(''));
export const HARDVOWELS = new Set();
export const SOFTVOWELS = new Set();
export const GROUP_NAMES = [
  'Pure vowels',
  'Easy consonants',
  'Tricky consonants',
  'The letter Ñ'
];
export const LETTER_GROUPS = [
  ['A', 'E', 'I', 'O', 'U'],
  ['F', 'K', 'L', 'M', 'N', 'P', 'S', 'T'],
  ['B', 'C', 'D', 'G', 'H', 'J', 'Q', 'R', 'V', 'W', 'X', 'Y', 'Z'],
  ['Ñ']
];

export function letterBy(value) {
  const v = value.toUpperCase();
  return LETTERS.find((l) => l.upper === v || l.lower === value);
}
