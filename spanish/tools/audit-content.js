// Content audit: counts what exists vs the PLAN targets and prints a report.
// Usage:
//   node tools/audit-content.js           -> report, exit 0
//   node tools/audit-content.js --strict  -> exit 1 if any hard target is unmet
import { LETTERS, PRONUNCIATION_GUIDES, UNITS, READING } from '../data/index.js';
import { GRAMMAR_TOPICS } from '../data/grammar-reference.js';
import { GAMES } from '../js/games/registry.js';
import { VERB_DRILLS, ASPECT_DRILLS, CASE_DRILLS } from '../data/grammar-drills.js';

const strict = process.argv.includes('--strict');
const RED = '\x1b[31m';
const GRN = '\x1b[32m';
const YEL = '\x1b[33m';
const RST = '\x1b[0m';

// Targets from PLAN.md. A1 = units 1-10, A2 = 11-20, B1 = 21-30, B2 = 31-40, C1 = 41-48.
const UNIT_TARGETS = { A1: 10, A2: 10, B1: 10, B2: 10, C1: 8 };
const MIN_VOCAB = 12;
const MIN_SENTENCES = 4;
const MIN_QUIZ = 10;
const MIN_TEST = 10;
const READING_TARGET = 20;

let hardGaps = [];

function line(status, label, got, want) {
  const color = status === 'ok' ? GRN : status === 'warn' ? YEL : RED;
  const mark = status === 'ok' ? '✔' : status === 'warn' ? '•' : '✘';
  console.log(`  ${color}${mark}${RST} ${label.padEnd(30)} ${String(got).padStart(5)} / ${want}`);
}

console.log('\n=== SpanishPod content audit ===\n');

// --- Alphabet ---
console.log('Alphabet');
line(LETTERS.length === 27 ? 'ok' : 'bad', 'letters', LETTERS.length, 27);
if (LETTERS.length !== 27) hardGaps.push('alphabet');
line(PRONUNCIATION_GUIDES.length >= 6 ? 'ok' : 'bad', 'pronunciation guides', PRONUNCIATION_GUIDES.length, '>=6');
if (PRONUNCIATION_GUIDES.length < 6) hardGaps.push('pronunciation guides');

// --- Grammar reference ---
console.log('\nGrammar reference');
line(GRAMMAR_TOPICS.length >= 10 ? 'ok' : 'warn', 'grammar topics', GRAMMAR_TOPICS.length, '>=10');
line(VERB_DRILLS.length >= 10 ? 'ok' : 'warn', 'verb drills', VERB_DRILLS.length, '>=10');
line(ASPECT_DRILLS.length >= 8 ? 'ok' : 'warn', 'aspect drills', ASPECT_DRILLS.length, '>=8');
line(CASE_DRILLS.length >= 10 ? 'ok' : 'warn', 'case drills', CASE_DRILLS.length, '>=10');

// --- Curriculum ---
console.log('\nCurriculum');
const byLevel = { A1: [], A2: [], B1: [], B2: [], C1: [] };
for (const u of UNITS) (byLevel[u.level] ||= []).push(u);
for (const lv of ['A1', 'A2', 'B1', 'B2', 'C1']) {
  const got = byLevel[lv].length;
  const want = UNIT_TARGETS[lv];
  const status = got >= want ? 'ok' : got > 0 ? 'warn' : 'warn';
  line(status, `${lv} units`, got, want);
}
line(UNITS.length >= 1 ? 'ok' : 'bad', 'total units', UNITS.length, 48);

// Per-unit minimums.
let thin = [];
for (const u of UNITS) {
  const problems = [];
  if ((u.vocabulary || []).length < MIN_VOCAB) problems.push(`vocab ${(u.vocabulary || []).length}<${MIN_VOCAB}`);
  if ((u.sentences || []).length < MIN_SENTENCES) problems.push(`sentences ${(u.sentences || []).length}<${MIN_SENTENCES}`);
  if ((u.quiz || []).length < MIN_QUIZ) problems.push(`quiz ${(u.quiz || []).length}<${MIN_QUIZ}`);
  if (!u.test || (u.test.questions || []).length < MIN_TEST) problems.push(`test <${MIN_TEST}`);
  if (problems.length) thin.push(`${u.id}: ${problems.join(', ')}`);
}
if (thin.length) {
  console.log(`${YEL}  !${RST} units below minimum: ${thin.join(' | ')}`);
  hardGaps.push('per-unit minimums');
} else if (UNITS.length) {
  console.log(`${GRN}  ✔${RST} every unit meets vocab/sentence/quiz/test minimums`);
}

// --- Reading ---
console.log('\nReading');
const rByLevel = { A1: 0, A2: 0, B1: 0, B2: 0, C1: 0 };
for (const r of READING) rByLevel[r.level] = (rByLevel[r.level] || 0) + 1;
line(READING.length >= 20 ? 'ok' : 'bad', 'reading texts', READING.length, `>=20`);
if (READING.length < 20) hardGaps.push('reading texts');
console.log(`      by level: A1=${rByLevel.A1} A2=${rByLevel.A2} B1=${rByLevel.B1} B2=${rByLevel.B2} C1=${rByLevel.C1} (target ${READING_TARGET} total)`);

// --- Games ---
console.log('\nPractice games');
line(GAMES.length === 12 ? 'ok' : 'bad', 'registered games', GAMES.length, 12);
if (GAMES.length !== 12) hardGaps.push('games');

// --- Vocab total ---
const vocabTotal = UNITS.reduce((n, u) => n + (u.vocabulary || []).length, 0);
console.log(`\nTotal vocabulary: ${vocabTotal} words across ${UNITS.length} units.`);

// --- Summary ---
console.log('\n=== Summary ===');
const curriculumComplete = ['A1', 'A2', 'B1', 'B2', 'C1'].every((lv) => byLevel[lv].length >= UNIT_TARGETS[lv]);
if (curriculumComplete && !hardGaps.length) {
  console.log(`${GRN}All targets met.${RST}\n`);
} else {
  const missing = [];
  for (const lv of ['A1', 'A2', 'B1', 'B2', 'C1']) {
    const gap = UNIT_TARGETS[lv] - byLevel[lv].length;
    if (gap > 0) missing.push(`${lv} needs ${gap} more unit(s)`);
  }
  if (missing.length) console.log(`${YEL}Curriculum shortfall: ${missing.join('; ')}.${RST}`);
  if (hardGaps.length) console.log(`${RED}Hard gaps: ${hardGaps.join(', ')}.${RST}`);
  console.log('Documented in README.md (Content status).\n');
}

process.exit(strict && hardGaps.length ? 1 : 0);
