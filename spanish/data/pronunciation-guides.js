// Pronunciation guides used by the alphabet view.
export const PRONUNCIATION_GUIDES = [
  {
    id: 'stress',
    title: 'Word stress',
    intro: 'Spanish words have one stressed syllable. There is a reliable rule, and a written accent (´) marks the exceptions. Get the stress right and you sound understandable immediately.',
    points: [
      'Words ending in a vowel, n or s stress the second-to-last syllable: casa → CA-sa.',
      'Words ending in any other consonant stress the last syllable: ciudad → ciu-DAD.',
      'A written accent marks any exception: café → ca-FÉ, teléfono → te-LÉ-fo-no.',
      'The accent also breaks up diphthongs: día is DÍ-a, two syllables, not one.'
    ],
    examples: [
      { es: 'casa → CA-sa', en: 'house — the default rule: second-to-last syllable' },
      { es: 'café → ca-FÉ', en: 'coffee — the accent marks the stressed final syllable' },
      { es: 'hablo / habló', en: 'I speak / he spoke — the accent alone changes the meaning' }
    ]
  },
  {
    id: 'vowels',
    title: 'Five pure vowels',
    intro: 'This is the single biggest win for English speakers. Spanish has just five vowel sounds, and they never glide into a second sound the way English vowels do.',
    points: [
      'a is always ah (father), e is always eh (bed), i is always ee (see).',
      'o is always oh (more, but shorter), u is always oo (boot).',
      'Never add a glide: no is a clean oh, not "oh-w".',
      'Every vowel is short and clear, whether stressed or not.'
    ],
    examples: [
      { es: 'no, sí, tú', en: 'no, yes, you — clean, short vowels' },
      { es: 'mesa → MEH-sah', en: 'table — both vowels are short and pure' }
    ]
  },
  {
    id: 'b-v',
    title: 'B and V are the same',
    intro: 'Spanish does not distinguish b and v in sound. Both are a soft b made by letting a little air escape between the lips.',
    points: [
      'b and v sound identical: vaca and baca are pronounced the same.',
      'At the start of a word it is a clear b: bueno, vaca.',
      'Between vowels it softens, almost a hum: la boca, la vaca.',
      'Spelling still distinguishes them — only the sound does not.'
    ],
    examples: [
      { es: 'vaca / baca', en: 'cow / (homophone) — identical pronunciation' },
      { es: 'nueve', en: 'nine — the v is soft, between vowels' }
    ]
  },
  {
    id: 'silent-h',
    title: 'H is always silent',
    intro: 'The letter h is never pronounced in Spanish. It is purely a spelling letter.',
    points: [
      'hola is pronounced OH-lah, with no h sound at all.',
      'hora, hospital, hotel all start with the vowel sound.',
      'Only the digraph ch is pronounced, and it sounds like the English ch in chair.'
    ],
    examples: [
      { es: 'hola → OH-lah', en: 'hello' },
      { es: 'hotel → oh-TEL', en: 'hotel' }
    ]
  },
  {
    id: 'c-z',
    title: 'C, Z and the seseo',
    intro: 'Before e or i, c sounds like an s in Latin America (the seseo) and like th in most of Spain. Everywhere else c is a hard k. Z always follows the same s/th pattern.',
    points: [
      'c + a, o, u = hard k: casa, cosa, cuna.',
      'c + e, i = s (Latin America) or th (Spain): cine, cerca.',
      'z = the same s/th sound: zapato, plaza.',
      'Choose one variety and stay consistent; both are correct.'
    ],
    examples: [
      { es: 'casa → KAH-sah', en: 'house — hard k' },
      { es: 'cine → SEE-neh / THEE-neh', en: 'cinema — s or th' },
      { es: 'zapato → sah-PAH-toh', en: 'shoe — s or th' }
    ]
  },
  {
    id: 'g-j',
    title: 'G and J',
    intro: 'Both letters can make a raspy h sound from the back of the throat, but g also has a hard g sound.',
    points: [
      'g + a, o, u = hard g: gato, gordo, gusto.',
      'g + e, i = raspy h, same as j: gente, girar.',
      'j is always the raspy h: jugo, jamón.',
      'gue and gui keep a hard g with a silent u: guitarra; güe and güi sound the u: vergüenza.'
    ],
    examples: [
      { es: 'gato → GAH-toh', en: 'cat — hard g' },
      { es: 'gente → HEN-teh', en: 'people — raspy h' },
      { es: 'jugo → HOO-goh', en: 'juice — j is raspy h' }
    ]
  },
  {
    id: 'rr',
    title: 'The R and the trill',
    intro: 'Spanish has two r sounds: a light single tap, and a rolled trill. The trill is written rr between vowels, or as a single r at the start of a word.',
    points: [
      'A single r between vowels is a light tap: pero.',
      'rr is a trill, several quick taps: perro.',
      'A single r at the beginning of a word also trills: rojo, ratón.',
      'pero (but) and perro (dog) differ only in this sound.'
    ],
    examples: [
      { es: 'pero / perro', en: 'but / dog — tap vs trill' },
      { es: 'rojo → RRO-hoh', en: 'red — initial r trills' }
    ]
  },
  {
    id: 'll-y',
    title: 'LL and Y',
    intro: 'The double l and the letter y most often share one sound, close to the English y in yes. In many regions both sound like a soft j or sh.',
    points: [
      'll sounds like y: llave → YAH-beh, calle → KAH-yeh.',
      'y as a consonant is the same sound: yo, ya, mayo.',
      'Some regions say a soft j (zh) or sh instead — both are accepted.',
      'At the end of a word y sounds like ee: rey → RREH-ee.'
    ],
    examples: [
      { es: 'llave → YAH-beh', en: 'key — ll as y' },
      { es: 'yo → YOH', en: 'I — y as y' },
      { es: 'rey → RREH-ee', en: 'king — final y as ee' }
    ]
  }
];
