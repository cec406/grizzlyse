// Game registry: metadata + builders for every game in the pool.
import { buildMc, buildTyping, buildScramble, buildFill, buildCase, buildVerb, buildAspect, buildDictation, buildSpeed, hangmanWords } from './builders.js';
import { buildQuestion as memoryQuestion } from './memory.js';
import { buildQuestions as hangmanQuestions } from './hangman.js';

export const GAMES = [
  { id: 'flashcards', title: 'Flashcards', icon: '🗂', desc: 'See, recall, grade yourself — spaced repetition queue.', needs: 'words', mode: 'flashcards' },
  { id: 'mc', title: 'Multiple choice', icon: '🎯', desc: 'Both directions: English→Russian and Russian→English.', needs: 'words', build: (c) => buildMc({ ...c, direction: null }) },
  { id: 'typing', title: 'Typing challenge', icon: '⌨️', desc: 'Read the English, type the Russian word.', needs: 'words', build: buildTyping },
  { id: 'memory', title: 'Memory match', icon: '🧠', desc: 'Match Russian words to their meanings.', needs: 'words', build: (c) => memoryQuestion(c.pool, 6, c.rng) },
  { id: 'scramble', title: 'Scramble', icon: '🔀', desc: 'Unscramble letters and whole sentences.', needs: 'words+sentences', build: buildScramble },
  { id: 'fill', title: 'Fill the blank', icon: '✏️', desc: 'Complete the Russian sentence from context.', needs: 'sentences', build: buildFill },
  { id: 'case', title: 'Case drill', icon: '🧊', desc: 'Choose the right case ending for the grammar.', needs: 'drills', build: buildCase },
  { id: 'verb', title: 'Verb drill', icon: '🏃', desc: 'Conjugate Russian verbs like a native.', needs: 'drills', build: buildVerb },
  { id: 'aspect', title: 'Aspect picker', icon: '🔁', desc: 'Perfective or imperfective — which one fits?', needs: 'drills', build: buildAspect },
  { id: 'dictation', title: 'Dictation', icon: '📝', desc: 'Translate English sentences by typing Russian.', needs: 'sentences', build: buildDictation },
  { id: 'speed', title: 'Speed round', icon: '⏱', desc: 'Beat the clock and your high score.', needs: 'words', build: buildSpeed },
  { id: 'hangman', title: 'Hangman', icon: '🪢', desc: 'Guess the word before the figure is complete.', needs: 'words', build: (c) => hangmanQuestions(hangmanWords(c), c.rng) }
];

export function gameById(id) {
  return GAMES.find((g) => g.id === id);
}