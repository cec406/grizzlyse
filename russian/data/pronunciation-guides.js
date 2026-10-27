// Pronunciation guides used by the alphabet view. All Russian verified.
export const PRONUNCIATION_GUIDES = [
  {
    id: 'stress',
    title: 'Stress (ударе́ние)',
    intro: 'Russian stress is free and unpredictable — it can fall on any syllable and even move between forms of the same word. You must learn it with every word. Stressing the wrong syllable is bad; stressing nothing is worse, because unstressed vowels change.',
    points: [
      'Every multi-syllable word has exactly one stressed vowel; the rest are unstressed.',
      'In the dictionary, stress is shown: приве́т (privYET).',
      'Stress can move the sound: го́род (stress on the first о) but города́ (city).',
      'Write the stress mark on every word you learn — it is part of the word.'
    ],
    examples: [
      { ru: 'за́мок — замо́к', en: 'a castle / a lock — stress alone changes the word' },
      { ru: 'молоко́', en: 'milk — only the last о is clear and strong; the first two reduce to "a"' }
    ]
  },
  {
    id: 'hard-soft',
    title: 'Hard and soft pairs',
    intro: 'Almost every Russian consonant has a hard and a soft version (palatalized — pronounced with the tongue raised toward the palate, like English "n" in "new"). The letters after the consonant usually tell you which one it is.',
    points: [
      'Soft vowels Я, Ё, Ю, Е, И make the previous consonant soft: тя vs та.',
      'Hard vowels А, О, У, Э, Ы leave the consonant hard.',
      'The soft sign ь always softens the consonant before it: конь (koNY), банька (BA-ny-ka).',
      'The hard sign ъ separates and keeps the consonant hard: объе́кт (ob-YEKT).',
      'Ж, Ш, Ц are always hard; Ч, Щ, Й are always soft.'
    ],
    examples: [
      { ru: 'ма́ма', en: 'mother — м hard (ma)' },
      { ru: 'мя́со', en: 'meat — м soft (mya)' }
    ]
  },
  {
    id: 'vowels',
    title: 'The 10 vowels in pairs',
    intro: 'Ten vowels are really five sounds doubled: A/Я, О/Ё, У/Ю, Э/Е, Ы/И. The second of each pair both has a y-glide at the start of a word or after a vowel, and softens the consonant before it.',
    points: [
      'А → Я, О → Ё, У → Ю, Э → Е, Ы → И: the "soft" member.',
      'The pairs are easy to see in the alphabet table.',
      'Я after a consonant = soft consonant + а: пя́ть (pyat), five.',
      'И and ы are different letters with different sounds — never swap them (see ы below).'
    ],
    examples: [
      { ru: 'мал — мял', en: 'small — crumpled: hard м vs soft м, no y-glide after a consonant' },
      { ru: 'яблоко', en: 'apple: я at the start = "ya"' }
    ]
  },
  {
    id: 'reduction',
    title: 'Vowel reduction',
    intro: 'Unstressed vowels weaken. This is the single biggest reason beginners mishear Russian: the dictionary sound of a word is only true under stress.',
    points: [
      'Unstressed О sounds like a short А: молоко́ → ma-la-KO.',
      'Unstressed Е and Я sound close to И: неделя → ni-DYE-lya (approx).',
      'Hard-to-spell words become clear once you know where stress falls.',
      'Never change the spelling because of reduction — you spell what the stress says, not what you hear.'
    ],
    examples: [
      { ru: 'окно́', en: 'window — the first о is read as "a"' },
      { ru: 'говори́т', en: 'speaks — first о → a, and е/i weaken' }
    ]
  },
  {
    id: 'voicing',
    title: 'Voiced and voiceless consonants',
    intro: 'A voiced consonant at the end of a word turns into its voiceless twin, and voiced consonants before a voiceless one devoice too.',
    points: [
      'Paired sounds: Б/П, В/Ф, Г/К, Д/Т, Ж/Ш, З/С.',
      'At the end of a word, only the voiceless member is audible: хлеб → khlyep (the б says п).',
      'Before a voiceless consonant, the voiced one devoices: завтра → zahf-tra (в says ф).',
      'Before a voiced consonant the voiceless one can voice: просьба → proz-ba.'
    ],
    examples: [
      { ru: 'са́д = "сат"', en: 'garden — д is read as т at the end' },
      { ru: 'за́втра', en: 'tomorrow — в is read as ф' }
    ]
  },
  {
    id: 'cursive',
    title: 'Printed vs cursive',
    intro: 'Russians write by hand in cursive. Printed letters you learned are not what a note or a caption will show. Learn which printed letters change shape in cursive.',
    points: [
      'Т looks like a "cursive m" in handwriting; И looks like ё with one hump; Ш like three humps.',
      'These are the same letters — just different clothing.',
      'Letters with tails (ц, щ, ы, д) get a little hook in cursive.',
      'Don\'t panic: after learning to read print, cursive reads itself with practice.',
      'П, Т in handwriting: п is a two-legged n, т is an m-shaped letter.'
    ],
    examples: [
      { ru: 'т — и — ш — м', en: 'in cursive: т looks like тш, и like u with a loop, ш like 3 humps' }
    ]
  },
  {
    id: 'ye-soft',
    title: 'Ж, Ш, Ц, Ч, Щ and the vowel letters',
    intro: 'After the always-hard Ж Ш Ц you never write ы-influencing soft vowels that would soften them; actual spelling rules appear in units, but a heads-up now saves confusion.',
    points: [
      'After Ж Ш Ч Щ Ц, the letter ы is written и in most spellings: жить, шить, цирк. After К Г Х it stays ы: книга, ру́ки.',
      'After Ч and Щ, keep the vowels A, У (not Я, Ю) in many endings: часы, щука.',
      'These are spelling rules you learn gradually — trust the word, not the pronunciation guess.'
    ],
    examples: [
      { ru: 'жи-ши', en: 'with И' },
      { ru: 'чу-щу', en: 'with У' }
    ]
  }
];