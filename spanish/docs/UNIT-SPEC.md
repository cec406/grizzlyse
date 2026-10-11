# SpanishPod unit authoring spec

You are writing ONE OR MORE curriculum unit files for a Spanish learning app.
Follow this spec exactly. The canonical example is `data/data-units/unit-01.js` —
read it first and copy its shape.

## File shape

```js
// Unit N — <English title>. <LEVEL>.
export const unit = {
  id: 'uNN',                 // zero-padded unit number, e.g. u07
  level: 'A1',               // one of: A1 A2 B1 B2 C1
  number: NN,                // integer, matches the file number
  title: 'English title',
  titleEs: 'Título en español',
  story: '2-4 sentences, second person, concrete and motivating. Tie it to
          real life / travel / Puerto Rico where natural.',
  grammar: [ /* 2-4 points, each: */
    {
      topic: 'Short English label',
      explanation: 'Plain-English explanation for a teen beginner. 1-3 sentences.',
      table: [
        ['Header A', 'Header B', 'Header C'],   // first row is the header row
        ['...', '...', '...']
      ],
      examples: [
        { es: 'Frase en español.', trans: 'Pronunciation respelling', en: 'English.' }
      ]
    }
  ],
  vocabulary: [ /* >= 12 items */
    { id: 'uNN-word', es: 'palabra', translit: 'PAH-lah-brah', en: 'word', pos: 'noun', gender: 'f' }
  ],
  phrases: [ /* optional, 2-4 */
    { id: 'p-uNN-1', es: 'Frase hecha.', trans: 'FRAY-seh EH-chah', en: 'Set phrase.' }
  ],
  sentences: [ /* >= 4 items */
    { es: 'Frase completa en español.', translit: '...', en: 'English.',
      words: [ { id: 'uNN-word', es: 'palabra', en: 'word' } ] }
  ],
  dialogue: { /* REQUIRED */
    title: 'English label (Spanish label)',
    lines: [ /* >= 4 */ { who: 'Ana', es: 'Hola.', en: 'Hi.' } ],
    questions: [ /* >= 3 */ { type: 'mc-en', q: '¿Pregunta?', options: ['a','b','c','d'], answer: 'b' } ]
  },
  quiz: [ /* >= 10 */ { type: 'mc-en', q: '...', options: ['...'], answer: '...', es: 'palabra' } ],
  test: {
    title: 'Unit NN test — <title>',
    questions: [ /* >= 10, same shape as quiz */ ]
  }
};
```

## Hard rules (the test harness enforces these)

1. **No apostrophes** (`'`) inside any single-quoted JS string. Write "you are",
   "ma am", "don t" or rephrase. Never `'` or `\'` inside a string.
   Use `« »` for spoken quotes inside Spanish text if you need quotes.
2. **vocabulary ids are globally unique.** Prefix every id with the unit number:
   `u12-...`. Never reuse an id from another unit. Same for phrase ids `p-u12-1`.
3. **Sentences words must reference your own vocab ids**, and each gloss
   `words[].es` must appear **verbatim (same capitalisation)** as a substring of
   the sentence `es`. Example that works:
   `es: 'Me llamo Ana.'` + `words: [{ id:'u01-mellamo', es:'Me llamo', ... }]`.
   Do NOT put a gloss whose text is not literally present in the sentence.
4. **Nouns need `gender`**: `'m'` (el), `'f'` (la), or `'p'` (plural-only).
   Non-nouns must not use `noun`.
5. **`pos` must be one of:** noun, verb, adjective, adverb, pronoun, preposition,
   conjunction, interjection, numeral, particle, phrase, question, exclamation.
6. **question types:** only `mc-en`, `mc-es`, `typing`, `fill`, `match`.
   - `mc-en`: options are **English** meanings; answer is English.
   - `mc-es`: options are **Spanish**; answer is Spanish.
   - answer must be one of the options.
   - `typing`: needs non-empty `answer` (Spanish) and optionally `accepts: []`.
7. **Spanish text** may use: letters a-z, á é í ó ú ü ñ (upper or lower), digits,
   spaces, and `.,!?;:()«»"'-¿¡…`. It must NOT contain Cyrillic.
8. `translit` is an English-friendly pronunciation respelling in ASCII
   (e.g. `BWEH-nos DEE-as`). No accents, no Cyrillic.
9. Keep Spanish **accurate**. Verify accents, gender and verb forms. Prefer
   common, useful, real-world language over rare words.
10. Use **Latin-American / Puerto Rican Spanish**: use `ustedes` not `vosotros`,
    avoid `vosotros` verb forms, prefer vocabulary that works in the Caribbean.

## Style

- Audience: smart English-speaking teens (11-17) plus an adult aiming for the
  Army DLPT/OPI proficiency test. Keep it friendly, concrete, and never childish.
- Include Puerto Rico / travel flavour where it fits (food, places, culture).
- Pronunciation respelling: capitalise the stressed syllable, hyphenate, keep it
  readable: `moo-CHA-cho`. Use `ny` for ñ, `rr` for a trill, `y` for ll/y.
- Vary quiz questions: meaning (mc-en), production (mc-es), and typing.
