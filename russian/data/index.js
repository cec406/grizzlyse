// Central data registry. Add new unit imports here (in order).
import { LETTERS, VOWELS, HARDVOWELS, SOFTVOWELS, GROUP_NAMES, LETTER_GROUPS } from './letters.js';
import { PRONUNCIATION_GUIDES } from './pronunciation-guides.js';
import { unit as u01 } from './data-units/unit-01.js';
import { unit as u02 } from './data-units/unit-02.js';
import { unit as u03 } from './data-units/unit-03.js';
import { unit as u04 } from './data-units/unit-04.js';
import { unit as u05 } from './data-units/unit-05.js';
import { unit as u06 } from './data-units/unit-06.js';
import { unit as u07 } from './data-units/unit-07.js';
import { unit as u08 } from './data-units/unit-08.js';
import { unit as u09 } from './data-units/unit-09.js';
import { unit as u10 } from './data-units/unit-10.js';
import { unit as u11 } from './data-units/unit-11.js';
import { unit as u12 } from './data-units/unit-12.js';
import { unit as u13 } from './data-units/unit-13.js';
import { unit as u14 } from './data-units/unit-14.js';
import { unit as u15 } from './data-units/unit-15.js';
import { unit as u16 } from './data-units/unit-16.js';
import { unit as u17 } from './data-units/unit-17.js';
import { unit as u18 } from './data-units/unit-18.js';
import { unit as u19 } from './data-units/unit-19.js';
import { unit as u20 } from './data-units/unit-20.js';
import { unit as u21 } from './data-units/unit-21.js';
import { unit as u22 } from './data-units/unit-22.js';
import { unit as u23 } from './data-units/unit-23.js';
import { unit as u24 } from './data-units/unit-24.js';
import { unit as u25 } from './data-units/unit-25.js';
import { unit as u26 } from './data-units/unit-26.js';
import { unit as u27 } from './data-units/unit-27.js';
import { unit as u28 } from './data-units/unit-28.js';
import { unit as u29 } from './data-units/unit-29.js';
import { unit as u30 } from './data-units/unit-30.js';
import { unit as u31 } from './data-units/unit-31.js';
import { unit as u32 } from './data-units/unit-32.js';
import { unit as u33 } from './data-units/unit-33.js';
import { unit as u34 } from './data-units/unit-34.js';
import { unit as u35 } from './data-units/unit-35.js';
import { unit as u36 } from './data-units/unit-36.js';
import { unit as u37 } from './data-units/unit-37.js';
import { unit as u38 } from './data-units/unit-38.js';
import { unit as u39 } from './data-units/unit-39.js';
import { unit as u40 } from './data-units/unit-40.js';
import { unit as u41 } from './data-units/unit-41.js';
import { unit as u42 } from './data-units/unit-42.js';
import { unit as u43 } from './data-units/unit-43.js';
import { unit as u44 } from './data-units/unit-44.js';
import { READING_A } from './reading/texts-a1a2.js';
import { READING_B } from './reading/texts-b1b2.js';

export { LETTERS, VOWELS, HARDVOWELS, SOFTVOWELS, GROUP_NAMES, LETTER_GROUPS };
export { PRONUNCIATION_GUIDES };

// Units are imported in order and must be consecutive level blocks: A1, A2, B1, B2.
export const UNITS = [
  u01, u02, u03, u04, u05, u06, u07, u08, u09, u10,
  u11, u12, u13, u14, u15, u16, u17, u18,
  u19, u20, u21, u22,
  u23, u24, u25, u26,
  u27, u28, u29, u30,
  u31, u32, u33, u34,
  u35, u36, u37, u38,
  u39, u40, u41, u42,
  u43, u44
];

// Graded reading texts, ordered by level.
export const READING = [...READING_A, ...READING_B];

export function allVocab() {
  const map = new Map();
  const seen = new Set();
  for (const u of UNITS) {
    for (const w of u.vocabulary || []) {
      map.set(w.id, { word: w, unit: u.id });
      seen.add(w.id);
    }
    for (const s of u.sentences || []) {
      for (const g of s.words || []) {
        if (!seen.has(g.id) && g.id) {
          map.set(g.id, { word: { id: g.id, ru: g.ru, translit: g.trans, en: g.en, pos: 'phrase', isGloss: true }, unit: u.id });
          seen.add(g.id);
        }
      }
    }
    for (const p of u.phrases || []) {
      if (!seen.has(p.id) && p.id && !map.has(p.id)) {
        map.set(p.id, { word: { id: p.id, ru: p.ru, translit: p.trans, en: p.en, pos: 'phrase', isPhrase: true }, unit: u.id });
        seen.add(p.id);
      }
    }
  }
  for (const r of READING || []) {
    for (const g of r.glossary || []) {
      if (g.id && !seen.has(g.id) && !map.has(g.id)) {
        map.set(g.id, { word: { id: g.id, ru: g.ru, translit: g.trans, en: g.en, pos: 'phrase', isReading: true }, unit: r.id });
        seen.add(g.id);
      }
    }
  }
  return map;
}

export function wordById(id, map) {
  return (map || allVocab()).get(id);
}

export default { LETTERS, VOWELS, HARDVOWELS, SOFTVOWELS, GROUP_NAMES, LETTER_GROUPS, PRONUNCIATION_GUIDES, UNITS, READING };