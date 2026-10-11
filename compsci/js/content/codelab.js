/* =========================================================================
 * content/codelab.js — programming exercises that run in your browser.
 *
 * Each lesson gives a starter function, a description and a set of test
 * cases. The player's code is executed in a sandboxed Web Worker (see
 * workers/runner.js) with a 3 second timeout.
 *
 * The solution field is only revealed after all tests pass.
 * ========================================================================= */

export const CODE_LESSONS = [
  {
    id: 'hello',
    functionName: 'greet',
    title: 'Say Hello',
    difficulty: 'Easy',
    order: 1,
    teaches: 'Functions, strings, the return keyword',
    brief: 'Write a function `greet(name)` that returns the string `"Hello, <name>!"`.',
    starter: `function greet(name) {
  // return a greeting
}
`,
    tests: [
      { name: 'greets Ada', args: ['Ada'], expected: 'Hello, Ada!' },
      { name: 'greets a number-ish name', args: ['Zero'], expected: 'Hello, Zero!' },
    ],
  },
  {
    id: 'sum',
    functionName: 'add',
    title: 'Sum of Two Numbers',
    difficulty: 'Easy',
    order: 2,
    teaches: 'Parameters, arithmetic, return',
    brief: 'Write `add(a, b)` that returns `a + b`.',
    starter: `function add(a, b) {
  // your code here
}
`,
    tests: [
      { name: 'adds 2 and 3', args: [2, 3], expected: 5 },
      { name: 'adds negative numbers', args: [-4, -6], expected: -10 },
    ],
  },
  {
    id: 'fizzbuzz',
    functionName: 'fizzbuzz',
    title: 'FizzBuzz',
    difficulty: 'Easy',
    order: 3,
    teaches: 'for loops, conditionals, modulo',
    brief: 'Return an array of strings for 1..n. Multiples of 3 become "Fizz", of 5 "Buzz", of both "FizzBuzz", everything else is the number as text.',
    starter: `function fizzbuzz(n) {
  // 1..n, following the rules
}
`,
    tests: [
      { name: 'first five', args: [5], expected: ['1', '2', 'Fizz', '4', 'Buzz'] },
      { name: 'up to fifteen', args: [15], expected: ['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz'] },
    ],
  },
  {
    id: 'is-palindrome',
    functionName: 'isPalindrome',
    title: 'Palindrome Check',
    difficulty: 'Easy',
    order: 4,
    teaches: 'String methods, indexOf, case handling',
    brief: 'Return true if the string reads the same backwards, ignoring case and spaces.',
    starter: `function isPalindrome(text) {
  // hint: text.toLowerCase().replace(/[^a-z0-9]/g, '')
}
`,
    tests: [
      { name: 'racecar', args: ['racecar'], expected: true },
      { name: 'A man a plan a canal Panama', args: ['A man a plan a canal Panama'], expected: true },
      { name: 'not a palindrome', args: ['hello'], expected: false },
    ],
  },
  {
    id: 'reverse',
    functionName: 'reverse',
    title: 'Reverse a String',
    difficulty: 'Easy',
    order: 5,
    teaches: 'Loops, string building',
    brief: 'Return the input string reversed.',
    starter: `function reverse(text) {
  // do not use .reverse(), it does not exist for strings — that is the lesson
}
`,
    tests: [
      { name: 'reverses hello', args: ['hello'], expected: 'olleh' },
      { name: 'handles empty string', args: [''], expected: '' },
    ],
  },
  {
    id: 'is-prime',
    functionName: 'isPrime',
    title: 'Prime Numbers',
    difficulty: 'Medium',
    order: 6,
    teaches: 'Modulo, early exit, O(√n) thinking',
    brief: 'Return true if n is a prime number (whole number greater than 1 with no smaller divisors).',
    starter: `function isPrime(n) {
  // think about divisors up to sqrt(n)
}
`,
    tests: [
      { name: '2 is prime', args: [2], expected: true },
      { name: '97 is prime', args: [97], expected: true },
      { name: '91 is not prime', args: [91], expected: false },
      { name: '1 is not prime', args: [1], expected: false },
    ],
  },
  {
    id: 'binary-search',
    functionName: 'binarySearch',
    title: 'Binary Search',
    difficulty: 'Medium',
    order: 7,
    teaches: 'Halving the problem — the core idea in computing',
    brief: 'Given a **sorted** array of numbers and a target, return the index of the target or -1. Do it by halving the search range, not by walking the whole array.',
    starter: `function binarySearch(sorted, target) {
  // low = 0, high = sorted.length - 1, and keep cutting the range in half
}
`,
    tests: [
      { name: 'found at the start', args: [[1, 3, 5, 7, 9], 1], expected: 0 },
      { name: 'found in the middle', args: [[1, 3, 5, 7, 9], 5], expected: 2 },
      { name: 'not found', args: [[1, 3, 5, 7, 9], 4], expected: -1 },
      { name: 'empty array', args: [[], 1], expected: -1 },
    ],
  },
  {
    id: 'dedupe',
    functionName: 'dedupe',
    title: 'Remove Duplicates',
    difficulty: 'Medium',
    order: 8,
    teaches: 'Sets, time complexity',
    brief: 'Return a new array with duplicates removed, keeping the first occurrence of each value in order.',
    starter: `function dedupe(list) {
  // a Set makes this O(n) instead of O(n²)
}
`,
    tests: [
      { name: 'removes repeats', args: [[1, 2, 2, 3, 1]], expected: [1, 2, 3] },
      { name: 'handles empty', args: [[]], expected: [] },
      { name: 'keeps order', args: [['a', 'b', 'a', 'c', 'b']], expected: ['a', 'b', 'c'] },
    ],
  },
  {
    id: 'anagram',
    functionName: 'isAnagram',
    title: 'Anagram Detector',
    difficulty: 'Medium',
    order: 9,
    teaches: 'Sorting, counting, object comparison',
    brief: 'Return true if the two strings are anagrams of each other (same letters, same counts).',
    starter: `function isAnagram(a, b) {
  // normalise case and spaces, then compare
}
`,
    tests: [
      { name: 'listen / silent', args: ['listen', 'silent'], expected: true },
      { name: 'hello / world', args: ['hello', 'world'], expected: false },
      { name: 'Dormitory / dirty room', args: ['Dormitory', 'dirty room'], expected: true },
    ],
  },
  {
    id: 'caesar',
    functionName: 'caesar',
    title: 'Caesar Cipher (Crypto Basics)',
    difficulty: 'Medium',
    order: 10,
    teaches: 'Character codes, modular arithmetic',
    brief: 'Return the text shifted forward by `n` letters in the alphabet, wrapping from z back to a.',
    starter: `function caesar(text, n) {
  // use char codes and modulo
}
`,
    tests: [
      { name: 'shifts abc', args: ['abc', 2], expected: 'cde' },
      { name: 'wraps around', args: ['xyz', 3], expected: 'abc' },
      { name: 'leaves spaces alone', args: ['a b', 1], expected: 'b c' },
    ],
  },
  {
    id: 'word-count',
    functionName: 'wordCount',
    title: 'Word Counter',
    difficulty: 'Medium',
    order: 11,
    teaches: 'Splitting, objects, iterating',
    brief: 'Return an object mapping each word to how many times it appears. Case sensitive.',
    starter: `function wordCount(text) {
  // split on whitespace and count
}
`,
    tests: [
      { name: 'counts duplicates', args: ['a b a'], expected: { a: 2, b: 1 } },
      { name: 'handles empty string', args: [''], expected: {} },
    ],
  },
  {
    id: 'longest-word',
    functionName: 'longestWord',
    title: 'Longest Word',
    difficulty: 'Medium',
    order: 12,
    teaches: 'reduce, comparison',
    brief: 'Return the longest word in the text. Ties: return the first one.',
    starter: `function longestWord(text) {
  // split, reduce, compare
}
`,
    tests: [
      { name: 'finds the longest', args: ['the quick brown fox'], expected: 'quick' },
      { name: 'handles a single word', args: ['hi'], expected: 'hi' },
    ],
  },
];

export const LESSON_BY_ID = Object.fromEntries(CODE_LESSONS.map((l) => [l.id, l]));