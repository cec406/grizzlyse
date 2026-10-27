// Pure question builders for games. No DOM. Export per-game builder functions.
import { pickN, shuffle, sample, makeMc, makeType, wordsOf } from './logic.js';
import { VERB_DRILLS, ASPECT_DRILLS, CASE_DRILLS } from '../../data/grammar-drills.js';

function do11() { return Math.random() < 0.5; }

function withDid(q, item) {
  if (item && item.id) q.did = item.id;
  return q;
}

// Multiple choice, both directions (en→es / es→en).
export function buildMc({ pool, count, rng = Math.random, direction }) {
  const items = pickN(pool, count, rng);
  const allEn = pool.map((w) => w.en);
  const allRu = pool.map((w) => w.es);
  return items.map((item) => {
    const toRu = direction ? direction === 'es' : do11();
    let q;
    if (toRu) {
      const dist = pickN(allRu.filter((r) => r !== item.es), 3, rng);
      q = makeMc(`What does “${item.en}” mean in Spanish?`, item.es, dist, rng);
    } else {
      const dist = pickN(allEn.filter((r) => r !== item.en), 3, rng);
      q = makeMc(`What does «${item.es}» mean?`, item.en, dist, rng);
    }
    q.es = item.es; q.en = item.en; q.translit = item.translit;
    return withDid(q, item);
  });
}

// Typing (English → type Spanish).
export function buildTyping({ pool, count, rng = Math.random }) {
  return pickN(pool, count, rng).map((item) => {
    const q = makeType(`Type «${item.en}» in Spanish`, item.es, []);
    q.es = item.es; q.en = item.en; q.translit = item.translit;
    return withDid(q, item);
  });
}

// Scramble: letters of a word, or words of a sentence.
export function buildScramble({ pool, sentences, count, rng = Math.random }) {
  const out = [];
  const wordItems = pickN(pool.filter((w) => w.es.replace(/[^a-záéíóúüñ]/gi, '').length >= 4), Math.ceil(count / 2), rng);
  for (const item of wordItems) {
    const word = item.es;
    const letters = shuffle(word.split(''), rng);
    if (letters.join('') === word) letters.push(letters.shift()); // force a shuffle
    out.push({
      type: 'sort',
      prompt: `Rearrange the LETTERS to spell: “${item.en}”`,
      es: word,
      en: item.en,
      tokens: letters,
      correct: word,
      joinSep: '',
      check: (u) => Array.isArray(u) && u.join('') === word,
      did: item.id
    });
  }
  const sents = pickN(sentences || [], Math.ceil(count / 2), rng);
  for (const s of sents) {
    const words = wordsOf(s.es);
    if (words.length < 3) continue;
    out.push({
      type: 'sort',
      prompt: `Rearrange the WORDS to make: “${s.en}”`,
      es: s.es,
      en: s.en,
      tokens: shuffle(words, rng),
      correct: words.join(' '),
      joinSep: ' ',
      check: (u) => Array.isArray(u) && u.join(' ') === words.join(' ')
    });
  }
  return out.slice(0, count);
}

// Fill-in-the-blank from unit sentences.
function blankWholeWord(text, target) {
  const bare = String(target).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.,!?:;«»"'()…¡¿—–-]/g, '').toLowerCase();
  const parts = String(text).split(/(\s+)/);
  for (let i = 0; i < parts.length; i++) {
    const token = parts[i].normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.,!?:;«»"'()…¡¿—–-]/g, '').toLowerCase();
    if (token === bare) { parts[i] = '___'; return parts.join(''); }
  }
  return null;
}

export function buildFill({ sentences, pool, count, rng = Math.random }) {
  const normOpt = (x) => String(x).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const poolWords = (pool || []).map((w) => w.es);
  const out = [];
  const sents = shuffle(sentences || [], rng);
  for (const s of sents) {
    const glosses = (s.words || []).filter((g2) => /[a-záéíóúüñ]/i.test(g2.es));
    if (!glosses.length) continue;
    const g = glosses[Math.floor(rng() * glosses.length)];
    const blanked = blankWholeWord(s.es, g.es);
    if (!blanked) continue;
    const correct = g.es;
    const seen = new Set([normOpt(correct)]);
    const dist = [];
    for (const w of shuffle(sents.filter((s2) => s2 !== s).flatMap((s2) => (s2.words || []).map((x) => x.es)).concat(poolWords), rng)) {
      const n = normOpt(w);
      if (!n || seen.has(n)) continue;
      seen.add(n);
      dist.push(w);
      if (dist.length === 3) break;
    }
    if (dist.length < 2) continue;
    const q = {
      type: 'mc',
      prompt: `Complete: «${blanked}» <small>(${s.en})</small>`,
      options: shuffle([correct, ...dist], rng),
      correct,
      correctValue: correct,
      es: s.es,
      en: s.en,
      did: g.id,
      explain: `The missing word: ${g.es} — ${g.en}`
    };
    out.push(q);
    if (out.length >= count) break;
  }
  return out;
}

// Case/ending drill selector.
export function buildCase({ count, rng = Math.random }) {
  return pickN(CASE_DRILLS, count, rng).map((d) => ({
    type: 'mc',
    prompt: d.prompt,
    options: shuffle(d.options, rng),
    correct: d.correct,
    correctValue: d.correct,
    es: d.es,
    explain: d.explain
  }));
}

// Verb conjugation drill.
export function buildVerb({ count, rng = Math.random }) {
  return pickN(VERB_DRILLS, count, rng).map((d) => ({
    type: 'mc',
    prompt: d.context,
    options: shuffle(d.options, rng),
    correct: d.correct,
    correctValue: d.correct,
    es: d.es,
    explain: d.explain
  }));
}

// Aspect picker.
export function buildAspect({ count, rng = Math.random }) {
  return pickN(ASPECT_DRILLS, count, rng).map((d) => ({
    type: 'mc',
    prompt: d.context,
    options: shuffle(d.options, rng),
    correct: d.correct,
    correctValue: d.correct,
    es: d.es,
    explain: d.explain
  }));
}

// Dictation-by-reading: English sentence → type Spanish.
export function buildDictation({ sentences, pool, count, rng = Math.random }) {
  const list = sentences && sentences.length ? sentences : promotePool(pool);
  return pickN(list, count, rng).map((s) => {
    const q = makeType(`Translate by typing: “${s.en}”`, s.es, []);
    q.es = s.es;
    q.translit = s.translit || s.es;
    return q;
  });
}

function promotePool(pool) {
  return pool.slice(0, 5).map((w) => ({ es: w.es, en: w.en, translit: w.translit }));
}

// Speed round: MC with a per-question timer.
export function buildSpeed(ctx) {
  return buildMc(ctx).map((q) => ({ ...q, speed: true }));
}

// Hangman words come from the pool.
export function hangmanWords({ pool, count, rng = Math.random }) {
  // single words only — hangman has no space/punctuation keys
  return pickN(pool.filter((w) => /^[a-záéíóúüñ]{4,}$/i.test(w.es)), count, rng);
}