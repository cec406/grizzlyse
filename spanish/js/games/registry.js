// Game registry: metadata + builders for every game in the pool.
import { buildMc, buildTyping, buildScramble, buildFill, buildCase, buildVerb, buildAspect, buildDictation, buildSpeed, hangmanWords } from './builders.js';
import { buildQuestion as memoryQuestion } from './memory.js';
import { buildQuestions as hangmanQuestions } from './hangman.js';

export const GAMES = [
  { id: 'flashcards', title: 'Flashcards', icon: '🗂', desc: 'See, recall, grade yourself — spaced repetition queue.', needs: 'words', mode: 'flashcards' },
  { id: 'mc', title: 'Multiple choice', icon: '🎯', desc: 'Both directions: English→Spanish and Spanish→English.', needs: 'words', build: (c) => buildMc({ ...c, direction: null }) },
  { id: 'typing', title: 'Typing challenge', icon: '⌨️', desc: 'Read the English, type the Spanish word.', needs: 'words', build: buildTyping },
  { id: 'memory', title: 'Memory match', icon: '🧠', desc: 'Match Spanish words to their meanings.', needs: 'words', build: (c) => memoryQuestion(c.pool, 6, c.rng) },
  { id: 'scramble', title: 'Scramble', icon: '🔀', desc: 'Unscramble letters and whole sentences.', needs: 'words+sentences', build: buildScramble },
  { id: 'fill', title: 'Fill the blank', icon: '✏️', desc: 'Complete the Spanish sentence from context.', needs: 'sentences', build: buildFill },
  { id: 'case', title: 'Gender & articles', icon: '🧊', desc: 'Pick el / la / los / las so nouns agree.', needs: 'drills', build: buildCase },
  { id: 'verb', title: 'Verb drill', icon: '🏃', desc: 'Conjugate Spanish verbs like a native.', needs: 'drills', build: buildVerb },
  { id: 'aspect', title: 'Por or para?', icon: '🔁', desc: 'Pick the right preposition for the sentence.', needs: 'drills', build: buildAspect },
  { id: 'dictation', title: 'Dictation', icon: '📝', desc: 'Translate English sentences by typing Spanish.', needs: 'sentences', build: buildDictation },
  { id: 'speed', title: 'Speed round', icon: '⏱', desc: 'Beat the clock and your high score.', needs: 'words', build: buildSpeed },
  { id: 'hangman', title: 'Hangman', icon: '🪢', desc: 'Guess the word before the figure is complete.', needs: 'words', build: (c) => hangmanQuestions(hangmanWords(c), c.rng) }
];

export function gameById(id) {
  return GAMES.find((g) => g.id === id);
}