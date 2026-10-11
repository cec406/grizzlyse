// Unit 1 — Greetings. A1. All Russian reviewed for accuracy.
export const unit = {
  id: 'u01',
  level: 'A1',
  number: 1,
  title: 'Greetings',
  titleRu: 'Приве́тствия',
  story: 'You are in a Russian-speaking café. Someone smiles at you and says «Здра́вствуйте!». Your first job: say hello, introduce yourself, and ask how people are doing. That is this whole unit — the words Russians use every single day.',
  grammar: [
    {
      topic: '«To be» is silent',
      explanation: 'Russian has no «am / is / are» in the present tense. You just say two words: Я А́нна = "I [am] Anna". Don\'t add the verb — doing so marks you as a beginner.',
      table: [
        ['Russian', 'Word-for-word', 'English'],
        ['Я А́нна.', 'I Anna', 'I am Anna.'],
        ['Ты студе́нт.', 'You student', 'You are a student.'],
        ['Она́ до́ма.', 'She home / at home', 'She is at home.']
      ],
      examples: [
        { ru: 'Э́то Мари́я.', trans: 'eta Mariya', en: 'This is Maria.' },
        { ru: 'Я из Москвы́.', trans: 'ya iz Moskvi', en: 'I am from Moscow.' }
      ]
    },
    {
      topic: 'Вы and ты — formality',
      explanation: 'ты is for friends, family and children. вы is for strangers, elders and anyone in a professional setting. When in doubt, use вы. Greetings follow: «приве́т» is casual, «здра́вствуйте» is the safe all-purpose hello.',
      table: [
        ['Situation', 'Use', 'Example'],
        ['A friend walks in', 'ты / приве́т', 'Приве́т!'],
        ['Meeting your boss', 'вы / здра́вствуйте', 'Здра́вствуйте!'],
        ['Saying goodbye (casual)', 'по́ка', 'По́ка!'],
        ['Saying goodbye (formal)', 'до свида́ния', 'До свида́ния!']
      ],
      examples: [
        { ru: 'Как дела́?', trans: 'kak dela?', en: 'How are things? (informal)' },
        { ru: 'Спаси́бо, хорошо́. А у вас?', trans: 'spasibo khorosho a u vas?', en: 'Fine, thank you. And yours? (formal)' }
      ]
    },
    {
      topic: 'Words with gender hidden inside endings',
      explanation: 'Even names like Áнна end in -а, which is the classic feminine ending. You will meet noun gender properly in Unit 2, but start noticing endings now: -а usually = feminine, -о/-е = neuter, consonant = masculine.',
      table: [
        ['masculine (end: consonant)', 'feminine (end: -а/-я)', 'neuter (end: -о/-е)'],
        ['стол — table', 'кни́га — book', 'окно́ — window']
      ],
      examples: [
        { ru: 'Это сто́ит о́чень до́рого.', trans: 'eta stoit ochen dorogo', en: 'This is very expensive.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u1-privet', ru: 'приве́т', translit: 'privyet', en: 'hello (informal)', pos: 'interjection' },
    { id: 'u1-zdravstvuyte', ru: 'здра́вствуйте', translit: 'zdrastvuyte', en: 'hello (formal)', pos: 'interjection' },
    { id: 'u1-poka', ru: 'по́ка', translit: 'poka', en: 'bye (informal)', pos: 'interjection' },
    { id: 'u1-dosvidaniya', ru: 'до свида́ния', translit: 'do svidaniya', en: 'goodbye (formal)', pos: 'phrase' },
    { id: 'u1-spasibo', ru: 'спаси́бо', translit: 'spasibo', en: 'thank you', pos: 'interjection' },
    { id: 'u1-pozhaluysta', ru: 'пожа́луйста', translit: 'pozhaluysta', en: 'please / you’re welcome', pos: 'interjection' },
    { id: 'u1-da', ru: 'да', translit: 'da', en: 'yes', pos: 'particle' },
    { id: 'u1-net', ru: 'нет', translit: 'nyet', en: 'no', pos: 'particle' },
    { id: 'u1-izvinite', ru: 'извини́те', translit: 'izvinitye', en: 'excuse me / sorry', pos: 'interjection' },
    { id: 'u1-khorosho', ru: 'хорошо́', translit: 'khorosho', en: 'well / good', pos: 'adverb' },
    { id: 'u1-plokho', ru: 'пло́хо', translit: 'plokho', en: 'bad / badly', pos: 'adverb' },
    { id: 'u1-kakdela', ru: 'как дела́?', translit: 'kak dela?', en: 'how are things?', pos: 'phrase' },
    { id: 'u1-ya', ru: 'я', translit: 'ya', en: 'I', pos: 'pronoun' },
    { id: 'u1-ty', ru: 'ты', translit: 'ty', en: 'you (informal)', pos: 'pronoun' },
    { id: 'u1-menyazovut', ru: 'меня́ зову́т', translit: 'menya zavut', en: 'my name is', pos: 'phrase' },
    { id: 'u1-ochen', ru: 'о́чень', translit: 'ochen', en: 'very', pos: 'adverb' },
    { id: 'u1-rad', ru: 'рад', translit: 'rat', en: 'glad (masc.)', pos: 'adjective' },
    { id: 'u1-utro', ru: 'до́брое у́тро', translit: 'dobroye utro', en: 'good morning', pos: 'phrase' },
    { id: 'u1-den', ru: 'до́брый день', translit: 'dobriy den', en: 'good afternoon', pos: 'phrase' },
    { id: 'u1-vecher', ru: 'до́брый ве́чер', translit: 'dobriy vecher', en: 'good evening', pos: 'phrase' }
  ],
  phrases: [
    { id: 'p-u1-1', ru: 'О́чень прия́тно!', trans: 'ochen priyatno!', en: 'Pleased to meet you!' },
    { id: 'p-u1-2', ru: 'А у вас?', trans: 'a u vas?', en: 'And you? (formal)' },
    { id: 'p-u1-3', ru: 'Ничего́. Норма́льно.', trans: 'nichego. normalno.', en: 'Not bad. Fine.' }
  ],
  sentences: [
    { ru: 'Приве́т! Как дела́?', translit: 'privyet! kak dela?', en: 'Hi! How are you?', words: [{ id: 'u1-privet', ru: 'Приве́т', en: 'hello' }, { id: 'u1-kakdela', ru: 'Как дела́', en: 'how are things' }] },
    { ru: 'Здра́вствуйте! Меня́ зову́т А́нна.', translit: 'zdrastvuyte! menya zavut Anna.', en: 'Hello! My name is Anna.', words: [{ id: 'u1-zdravstvuyte', ru: 'Здра́вствуйте', en: 'hello' }, { id: 'u1-menyazovut', ru: 'Меня́ зову́т', en: 'my name is' }] },
    { ru: 'До́брое у́тро! Спаси́бо, хорошо́.', translit: 'dobroye utro! spasibo, khorosho.', en: 'Good morning! Fine, thank you.', words: [{ id: 'u1-utro', ru: 'До́брое у́тро', en: 'good morning' }, { id: 'u1-spasibo', ru: 'Спаси́бо', en: 'thank you' }, { id: 'u1-khorosho', ru: 'хорошо́', en: 'well' }] },
    { ru: 'Да. Нет, спаси́бо.', translit: 'da. nyet, spasibo.', en: 'Yes. No, thank you.', words: [{ id: 'u1-da', ru: 'Да', en: 'yes' }, { id: 'u1-net', ru: 'Нет', en: 'no' }, { id: 'u1-spasibo', ru: 'спаси́бо', en: 'thank you' }] },
    { ru: 'О́чень пло́хо. По́ка!', translit: 'ochen plokho. poka!', en: 'Very bad. Bye!', words: [{ id: 'u1-ochen', ru: 'О́чень', en: 'very' }, { id: 'u1-plokho', ru: 'пло́хо', en: 'bad' }, { id: 'u1-poka', ru: 'По́ка', en: 'bye' }] }
  ],
  dialogue: {
    title: 'В кафе́ (At the café)',
    lines: [
      { who: 'Анна', ru: 'Здра́вствуйте!', en: 'Hello!' },
      { who: 'Мария', ru: 'Здра́вствуйте! Меня́ зову́т Мари́я.', en: 'Hello! My name is Maria.' },
      { who: 'Анна', ru: 'О́чень прия́тно! Я А́нна. Как дела́?', en: 'Pleased to meet you! I am Anna. How are you?' },
      { who: 'Мария', ru: 'Спаси́бо, хорошо́. А у вас?', en: 'Fine, thank you. And you?' },
      { who: 'Анна', ru: 'То́же хорошо́. До́брый день!', en: 'Also fine. Good day!' },
      { who: 'Мария', ru: 'До́брый день! До свида́ния!', en: 'Good day! Goodbye!' }
    ],
    questions: [
      { type: 'mc-en', q: 'Как зовут подру́гу А́нны?', options: ['Мария', 'Анна', 'Елена', 'Иван'], answer: 'Мария' },
      { type: 'mc-en', q: 'Как дела́ у Мари́и?', options: ['хорошо́', 'пло́хо', 'норма́льно', 'о́чень пло́хо'], answer: 'хорошо́' },
      { type: 'mc-en', q: 'Что Мари́я говори́т в конце́?', options: ['До свида́ния!', 'Приве́т!', 'Спаси́бо!', 'Да!'], answer: 'До свида́ния!' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «приве́т»?', options: ['hello (informal)', 'goodbye (formal)', 'thank you', 'please'], answer: 'hello (informal)', ru: 'приве́т' },
    { type: 'mc-ru', q: 'How do you say “thank you”?', options: ['спаси́бо', 'по́ка', 'да', 'нет'], answer: 'спаси́бо', ru: 'спаси́бо' },
    { type: 'mc-ru', q: '“How are you?” in Russian', options: ['Как дела́?', 'До свида́ния!', 'Что э́то?', 'Меня́ зову́т…'], answer: 'Как дела́?', ru: 'Как дела́?' },
    { type: 'typing', q: 'Type “hello (informal)” in Russian', answer: 'привет', accepts: [], ru: 'приве́т' },
    { type: 'typing', q: 'Type “yes” in Russian', answer: 'да', accepts: [], ru: 'да' },
    { type: 'mc-en', q: 'Что зна́чит «до свида́ния»?', options: ['goodbye (formal)', 'good morning', 'yes', 'hello'], answer: 'goodbye (formal)', ru: 'до свида́ния' },
    { type: 'mc-ru', q: '“Please / you’re welcome”', options: ['пожа́луйста', 'извини́те', 'о́чень', 'до́брый день'], answer: 'пожа́луйста', ru: 'пожа́луйста' },
    { type: 'mc-en', q: 'Что зна́чит «хорошо́»?', options: ['well / good', 'badly', 'soon', 'yes'], answer: 'well / good', ru: 'хорошо́' },
    { type: 'typing', q: 'Type “no” in Russian', answer: 'нет', accepts: [], ru: 'нет' },
    { type: 'mc-ru', q: 'Which greeting suits a formal morning?', options: ['До́брое у́тро!', 'По́ка!', 'Пло́хо!', 'Тоже!'], answer: 'До́брое у́тро!', ru: 'До́брое у́тро!' }
  ],
  test: {
    title: 'Unit 1 test — Greetings',
    questions: [
      { type: 'mc-en', q: 'Что зна́чит «здра́вствуйте»?', options: ['hello (formal)', 'hello (informal)', 'bye', 'thanks'], answer: 'hello (formal)', ru: 'здра́вствуйте' },
      { type: 'mc-ru', q: '“goodbye (formal)”', options: ['до свида́ния', 'по́ка', 'приве́т', 'да'], answer: 'до свида́ния', ru: 'до свида́ния' },
      { type: 'mc-ru', q: '“excuse me / sorry”', options: ['извини́те', 'пожа́луйста', 'спаси́бо', 'хорошо́'], answer: 'извини́те', ru: 'извини́те' },
      { type: 'typing', q: 'Type “thank you” in Russian', answer: 'спасибо', accepts: [], ru: 'спаси́бо' },
      { type: 'typing', q: 'Type “you (informal)” in Russian', answer: 'ты', accepts: [], ru: 'ты' },
      { type: 'mc-en', q: 'Что зна́чит «по́ка»?', options: ['bye (informal)', 'good morning', 'please', 'no'], answer: 'bye (informal)', ru: 'по́ка' },
      { type: 'mc-ru', q: '“very” in Russian', options: ['о́чень', 'пло́хо', 'нет', 'рад'], answer: 'о́чень', ru: 'о́чень' },
      { type: 'typing', q: 'Type “how are things?” (three words)', answer: 'как дела', accepts: ['как дела?'], ru: 'как дела́?' },
      { type: 'mc-en', q: 'Что зна́чит «меня́ зову́т А́нна»?', options: ['My name is Anna', 'Anna is here', 'I like Anna', 'Call Anna'], answer: 'My name is Anna', ru: 'Меня́ зову́т А́нна' },
      { type: 'mc-ru', q: '“glad (masc.)”', options: ['рад', 'да', 'по́ка', 'нет'], answer: 'рад', ru: 'рад' }
    ]
  }
};