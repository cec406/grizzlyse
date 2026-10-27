// Unit 1 — Greetings & introductions. A1.
export const unit = {
  id: 'u01',
  level: 'A1',
  number: 1,
  title: 'Greetings & introductions',
  titleEs: '¡Hola!',
  story: 'You step off the plane in San Juan. A friendly voice says «¡Hola! ¿Cómo estás?». Your job in this unit: say hello at any hour, introduce yourself, ask how someone is, and be polite. These are the words you will use every single day of the trip.',
  grammar: [
    {
      topic: 'Greetings change with the clock',
      explanation: 'Spanish has three daytime greetings. Use buenos días until around noon, buenas tardes from noon until dark, and buenas noches in the evening and as a goodbye at night. The words literally mean good days, good afternoons, good nights.',
      table: [
        ['Spanish', 'When', 'English'],
        ['Buenos días', 'morning (until ~noon)', 'Good morning'],
        ['Buenas tardes', 'afternoon (noon until dark)', 'Good afternoon'],
        ['Buenas noches', 'evening and night', 'Good evening / Good night'],
        ['¡Hola!', 'any time, casual', 'Hi!']
      ],
      examples: [
        { es: 'Buenos días, señora.', trans: 'BWEH-nos DEE-as se-NYO-ra', en: 'Good morning, madam.' },
        { es: 'Buenas noches, hasta mañana.', trans: 'BWEH-nas NO-ches AS-ta ma-NYA-na', en: 'Good night, see you tomorrow.' }
      ]
    },
    {
      topic: 'tú and usted — two ways to say you',
      explanation: 'tú is for friends, family and people your age. usted is for strangers, older people, and anyone you want to show respect to. In Puerto Rico and Latin America, usted is used a lot. When in doubt, use usted.',
      table: [
        ['Situation', 'Use', 'Example'],
        ['A friend or classmate', 'tú', '¿Cómo estás?'],
        ['A stranger or elder', 'usted', '¿Cómo está usted?'],
        ['Two or more people', 'ustedes', '¿Cómo están ustedes?'],
        ['Saying goodbye (casual)', 'adiós / hasta luego', '¡Hasta luego!']
      ],
      examples: [
        { es: '¿Cómo estás, Marco?', trans: 'KOH-mo es-TAS MAR-ko', en: 'How are you, Marco? (informal)' },
        { es: '¿Cómo está usted?', trans: 'KOH-mo es-TA oos-TED', en: 'How are you? (polite)' }
      ]
    },
    {
      topic: 'Me llamo — my name is',
      explanation: 'To give your name, say Me llamo + name. It literally means I call myself. To ask someone else, say ¿Cómo te llamas? (informal) or ¿Cómo se llama? (polite). Respond with Mucho gusto, which means nice to meet you.',
      table: [
        ['Spanish', 'Person', 'English'],
        ['Me llamo Ana.', 'yo', 'My name is Ana.'],
        ['¿Cómo te llamas?', 'tú', 'What is your name? (informal)'],
        ['¿Cómo se llama?', 'usted', 'What is your name? (polite)'],
        ['Mucho gusto.', 'any', 'Nice to meet you.']
      ],
      examples: [
        { es: 'Me llamo Luis. Mucho gusto.', trans: 'meh YAH-mo LWEES MOO-cho GOOS-to', en: 'My name is Luis. Nice to meet you.' },
        { es: '¿Cómo se llama usted?', trans: 'KOH-mo se YAH-ma oos-TED', en: 'What is your name? (polite)' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u01-hola', es: 'hola', translit: 'OH-lah', en: 'hello / hi', pos: 'interjection' },
    { id: 'u01-buenosdias', es: 'buenos días', translit: 'BWEH-nos DEE-as', en: 'good morning', pos: 'phrase' },
    { id: 'u01-buenastardes', es: 'buenas tardes', translit: 'BWEH-nas TAR-des', en: 'good afternoon', pos: 'phrase' },
    { id: 'u01-buenasnoches', es: 'buenas noches', translit: 'BWEH-nas NO-ches', en: 'good evening / good night', pos: 'phrase' },
    { id: 'u01-adios', es: 'adiós', translit: 'ah-DYOS', en: 'goodbye', pos: 'interjection' },
    { id: 'u01-hastaluego', es: 'hasta luego', translit: 'AS-tah LWEH-go', en: 'see you later', pos: 'phrase' },
    { id: 'u01-gracias', es: 'gracias', translit: 'GRAH-syas', en: 'thank you', pos: 'interjection' },
    { id: 'u01-porfavor', es: 'por favor', translit: 'por fah-VOR', en: 'please', pos: 'phrase' },
    { id: 'u01-denada', es: 'de nada', translit: 'de NAH-dah', en: 'you are welcome', pos: 'phrase' },
    { id: 'u01-perdon', es: 'perdón', translit: 'per-DON', en: 'excuse me / sorry', pos: 'interjection' },
    { id: 'u01-si', es: 'sí', translit: 'see', en: 'yes', pos: 'particle' },
    { id: 'u01-no', es: 'no', translit: 'no', en: 'no', pos: 'particle' },
    { id: 'u01-comoestas', es: '¿cómo estás?', translit: 'KOH-mo es-TAS', en: 'how are you? (informal)', pos: 'phrase' },
    { id: 'u01-mellamo', es: 'me llamo', translit: 'meh YAH-mo', en: 'my name is', pos: 'phrase' },
    { id: 'u01-muchogusto', es: 'mucho gusto', translit: 'MOO-cho GOOS-to', en: 'nice to meet you', pos: 'phrase' },
    { id: 'u01-bien', es: 'bien', translit: 'byen', en: 'well / fine', pos: 'adverb' },
    { id: 'u01-mal', es: 'mal', translit: 'mal', en: 'bad / badly', pos: 'adverb' },
    { id: 'u01-yo', es: 'yo', translit: 'yoh', en: 'I', pos: 'pronoun' },
    { id: 'u01-tu', es: 'tú', translit: 'too', en: 'you (informal)', pos: 'pronoun' },
    { id: 'u01-usted', es: 'usted', translit: 'oos-TED', en: 'you (polite)', pos: 'pronoun' }
  ],
  phrases: [
    { id: 'p-u01-1', es: '¡Mucho gusto!', trans: 'MOO-cho GOOS-to', en: 'Pleased to meet you!' },
    { id: 'p-u01-2', es: '¿Y usted?', trans: 'ee oos-TED', en: 'And you? (polite)' },
    { id: 'p-u01-3', es: 'Más o menos.', trans: 'mas o MEH-nos', en: 'So-so. / More or less.' }
  ],
  sentences: [
    { es: '¡Hola! ¿Cómo estás?', translit: 'OH-lah KOH-mo es-TAS', en: 'Hi! How are you?', words: [{ id: 'u01-hola', es: 'Hola', en: 'hello' }, { id: 'u01-comoestas', es: '¿Cómo estás?', en: 'how are you' }] },
    { es: 'Me llamo Ana. Mucho gusto.', translit: 'meh YAH-mo AH-nah MOO-cho GOOS-to', en: 'My name is Ana. Nice to meet you.', words: [{ id: 'u01-mellamo', es: 'Me llamo', en: 'my name is' }, { id: 'u01-muchogusto', es: 'Mucho gusto', en: 'nice to meet you' }] },
    { es: 'Buenos días. ¿Cómo está usted?', translit: 'BWEH-nos DEE-as KOH-mo es-TA oos-TED', en: 'Good morning. How are you?', words: [{ id: 'u01-buenosdias', es: 'Buenos días', en: 'good morning' }, { id: 'u01-usted', es: 'usted', en: 'you (polite)' }] },
    { es: 'Bien, gracias. ¿Y tú?', translit: 'byen GRAH-syas ee too', en: 'Fine, thank you. And you?', words: [{ id: 'u01-bien', es: 'Bien', en: 'well' }, { id: 'u01-gracias', es: 'gracias', en: 'thank you' }, { id: 'u01-tu', es: 'tú', en: 'you (informal)' }] },
    { es: 'No, gracias. ¡Adiós!', translit: 'no GRAH-syas ah-DYOS', en: 'No, thank you. Goodbye!', words: [{ id: 'u01-no', es: 'No', en: 'no' }, { id: 'u01-gracias', es: 'gracias', en: 'thank you' }, { id: 'u01-adios', es: 'Adiós', en: 'goodbye' }] }
  ],
  dialogue: {
    title: 'En el aeropuerto (At the airport)',
    lines: [
      { who: 'Ana', es: '¡Hola! Buenos días.', en: 'Hi! Good morning.' },
      { who: 'Luis', es: 'Buenos días. Me llamo Luis. ¿Cómo se llama usted?', en: 'Good morning. My name is Luis. What is your name?' },
      { who: 'Ana', es: 'Me llamo Ana. Mucho gusto.', en: 'My name is Ana. Nice to meet you.' },
      { who: 'Luis', es: 'Mucho gusto. ¿Cómo está usted?', en: 'Nice to meet you. How are you?' },
      { who: 'Ana', es: 'Bien, gracias. ¿Y usted?', en: 'Fine, thank you. And you?' },
      { who: 'Luis', es: 'Muy bien. ¡Hasta luego!', en: 'Very well. See you later!' }
    ],
    questions: [
      { type: 'mc-en', q: '¿Cómo se llama el hombre?', options: ['Luis', 'Ana', 'Marco', 'Pedro'], answer: 'Luis' },
      { type: 'mc-en', q: '¿Cómo está Ana?', options: ['bien', 'mal', 'más o menos', 'muy mal'], answer: 'bien' },
      { type: 'mc-en', q: '¿Qué dice Luis al final?', options: ['¡Hasta luego!', '¡Hola!', '¡Gracias!', '¡Buenos días!'], answer: '¡Hasta luego!' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: '¿Qué significa «hola»?', options: ['hello', 'goodbye', 'please', 'thank you'], answer: 'hello', es: 'hola' },
    { type: 'mc-es', q: 'How do you say thank you?', options: ['gracias', 'por favor', 'adiós', 'hola'], answer: 'gracias', es: 'gracias' },
    { type: 'mc-es', q: 'Say good morning.', options: ['buenos días', 'buenas noches', 'hasta luego', 'perdón'], answer: 'buenos días', es: 'buenos días' },
    { type: 'mc-en', q: '¿Qué significa «adiós»?', options: ['goodbye', 'hello', 'yes', 'sorry'], answer: 'goodbye', es: 'adiós' },
    { type: 'mc-en', q: '¿Qué significa «me llamo»?', options: ['my name is', 'I am fine', 'see you later', 'excuse me'], answer: 'my name is', es: 'me llamo' },
    { type: 'typing', q: 'Type yes in Spanish', answer: 'si', accepts: ['sí'], es: 'sí' },
    { type: 'typing', q: 'Type please in Spanish (two words)', answer: 'por favor', accepts: [], es: 'por favor' },
    { type: 'mc-es', q: 'Say nice to meet you.', options: ['mucho gusto', 'de nada', 'perdón', 'bien'], answer: 'mucho gusto', es: 'mucho gusto' },
    { type: 'mc-en', q: '¿Qué significa «¿cómo estás?»?', options: ['how are you?', 'where are you?', 'who are you?', 'what is your name?'], answer: 'how are you?', es: '¿cómo estás?' },
    { type: 'mc-es', q: 'Say you are welcome.', options: ['de nada', 'por favor', 'gracias', 'adiós'], answer: 'de nada', es: 'de nada' },
    { type: 'mc-es', q: 'Which greeting suits the evening?', options: ['buenas noches', 'buenos días', 'buenas tardes', 'hola'], answer: 'buenas noches', es: 'buenas noches' },
    { type: 'mc-en', q: '¿Qué significa «usted»?', options: ['you (polite)', 'you (informal)', 'I', 'we'], answer: 'you (polite)', es: 'usted' }
  ],
  test: {
    title: 'Unit 1 test — Greetings',
    questions: [
      { type: 'mc-en', q: '¿Qué significa «buenos días»?', options: ['good morning', 'good night', 'goodbye', 'hello'], answer: 'good morning', es: 'buenos días' },
      { type: 'mc-es', q: 'Say goodbye.', options: ['adiós', 'hola', 'gracias', 'sí'], answer: 'adiós', es: 'adiós' },
      { type: 'mc-en', q: '¿Qué significa «mucho gusto»?', options: ['nice to meet you', 'you are welcome', 'excuse me', 'see you later'], answer: 'nice to meet you', es: 'mucho gusto' },
      { type: 'typing', q: 'Type hello in Spanish', answer: 'hola', accepts: [], es: 'hola' },
      { type: 'typing', q: 'Type no in Spanish', answer: 'no', accepts: [], es: 'no' },
      { type: 'mc-en', q: '¿Qué significa «hasta luego»?', options: ['see you later', 'good morning', 'please', 'well'], answer: 'see you later', es: 'hasta luego' },
      { type: 'mc-es', q: 'Say excuse me / sorry.', options: ['perdón', 'gracias', 'bien', 'usted'], answer: 'perdón', es: 'perdón' },
      { type: 'typing', q: 'Type my name is in Spanish (two words)', answer: 'me llamo', accepts: [], es: 'me llamo' },
      { type: 'mc-en', q: '¿Qué significa «bien»?', options: ['well / fine', 'bad', 'yes', 'no'], answer: 'well / fine', es: 'bien' },
      { type: 'mc-es', q: 'Which word means you (polite)?', options: ['usted', 'tú', 'yo', 'no'], answer: 'usted', es: 'usted' },
      { type: 'mc-en', q: '¿Qué significa «¿cómo estás?»?', options: ['how are you?', 'what is your name?', 'good afternoon', 'thank you'], answer: 'how are you?', es: '¿cómo estás?' },
      { type: 'mc-es', q: 'Say please (two words).', options: ['por favor', 'de nada', 'buenos días', 'adiós'], answer: 'por favor', es: 'por favor' }
    ]
  }
};
