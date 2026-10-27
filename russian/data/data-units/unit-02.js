// Unit 2 — Who are you? A1.
export const unit = {
  id: 'u02',
  level: 'A1',
  number: 2,
  title: 'Who are you?',
  titleRu: 'Кто ты?',
  story: 'You met someone at a party. Now you need the small toolkit of self-introduction: the pronouns я, ты, он, она́, the question «Кто ты?» and the phrase «Меня́ зову́т…». Ten minutes here and you can introduce anyone, including yourself.',
  grammar: [
    {
      topic: 'Personal pronouns',
      explanation: 'Six people, six words. Unlike English, он/она́/оно́ also mean "it" depending on the gender of the noun. вы does double duty: polite "you" for one person and "you all" for many.',
      table: [
        ['Russian', 'English', 'Note'],
        ['я', 'I', 'lowercase — except at the start of a sentence'],
        ['ты', 'you (one friend)', 'informal'],
        ['он', 'he / it (m)', 'masculine noun'],
        ['она́', 'she / it (f)', 'feminine noun'],
        ['оно́', 'it (n)', 'neuter noun'],
        ['мы', 'we', ''],
        ['вы', 'you (polite / plural)', 'use with strangers'],
        ['они́', 'they', 'any mixed group']
      ],
      examples: [
        { ru: 'Он мой друг.', trans: 'on moy drug', en: 'He is my friend.' },
        { ru: 'Они́ студе́нты.', trans: 'oni studenty', en: 'They are students.' }
      ]
    },
    {
      topic: 'Gender lives in the ending',
      explanation: 'You can guess a noun\'s gender from its last letters: consonant or -й = masculine, -а/-я = feminine, -о/-е = neuter. This is why ты and она́ change which pronoun you reach for.',
      table: [
        ['Ending', 'Gender', 'Example', 'Meaning'],
        ['consonant / -й', 'masculine', 'друг', 'friend (m)'],
        ['-а / -я', 'feminine', 'подру́га', 'friend (f)'],
        ['-о / -е', 'neuter', 'мо́ре', 'sea']
      ],
      examples: [
        { ru: 'Э́то мой друг.', trans: 'eta moy drug', en: 'This is my friend. (m)' },
        { ru: 'Э́то моя́ подру́га.', trans: 'eta moya podruga', en: 'This is my friend. (f)' }
      ]
    },
    {
      topic: 'Меня́ зову́т — "my name is"',
      explanation: 'Literally "they call me …". It never changes for gender: Меня́ зову́т И́ра. / Меня́ зову́т И́горь. To ask, say «Как тебя́ зову́т?» (informal) or «Как вас зову́т?» (polite).',
      table: [
        ['Russian', 'English'],
        ['Как тебя́ зову́т?', 'What is your name? (informal)'],
        ['Как вас зову́т?', 'What is your name? (polite)'],
        ['Меня́ зову́т…', 'My name is…']
      ],
      examples: [
        { ru: 'Как тебя́ зову́т? — Меня́ зову́т А́нна.', trans: 'kak tebya zavut? menya zavut Anna', en: 'What is your name? — My name is Anna.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u2-ya', ru: 'я', translit: 'ya', en: 'I', pos: 'pronoun' },
    { id: 'u2-ty', ru: 'ты', translit: 'ty', en: 'you (informal)', pos: 'pronoun' },
    { id: 'u2-on', ru: 'он', translit: 'on', en: 'he / it (m)', pos: 'pronoun' },
    { id: 'u2-ona', ru: 'она́', translit: 'ona', en: 'she / it (f)', pos: 'pronoun' },
    { id: 'u2-ono', ru: 'оно́', translit: 'ono', en: 'it (n)', pos: 'pronoun' },
    { id: 'u2-my', ru: 'мы', translit: 'my', en: 'we', pos: 'pronoun' },
    { id: 'u2-vy', ru: 'вы', translit: 'vy', en: 'you (polite / plural)', pos: 'pronoun' },
    { id: 'u2-oni', ru: 'они́', translit: 'oni', en: 'they', pos: 'pronoun' },
    { id: 'u2-kto', ru: 'кто', translit: 'kto', en: 'who', pos: 'question' },
    { id: 'u2-chto', ru: 'что', translit: 'chto', en: 'what', pos: 'question' },
    { id: 'u2-drug', ru: 'друг', translit: 'drug', en: 'friend (male)', pos: 'noun', gender: 'm' },
    { id: 'u2-podruga', ru: 'подру́га', translit: 'podruga', en: 'friend (female)', pos: 'noun', gender: 'f' },
    { id: 'u2-student', ru: 'студе́нт', translit: 'student', en: 'student (male)', pos: 'noun', gender: 'm' },
    { id: 'u2-studentka', ru: 'студе́нтка', translit: 'studentka', en: 'student (female)', pos: 'noun', gender: 'f' },
    { id: 'u2-chelovek', ru: 'челове́к', translit: 'chelovek', en: 'person / human', pos: 'noun', gender: 'm' },
    { id: 'u2-imya', ru: 'и́мя', translit: 'imya', en: 'first name', pos: 'noun', gender: 'n' },
    { id: 'u2-familiya', ru: 'фами́лия', translit: 'familiya', en: 'surname', pos: 'noun', gender: 'f' },
    { id: 'u2-zovut', ru: 'зову́т', translit: 'zavut', en: '(they) call', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u2-1', ru: 'О́чень прия́тно!', trans: 'ochen priyatno', en: 'Nice to meet you!' },
    { id: 'p-u2-2', ru: 'Как тебя́ зову́т?', trans: 'kak tebya zavut?', en: 'What is your name? (informal)' }
  ],
  sentences: [
    { ru: 'Кто ты?', translit: 'kto ty?', en: 'Who are you?', words: [{ id: 'u2-kto', ru: 'Кто', en: 'who' }, { id: 'u2-ty', ru: 'ты', en: 'you' }] },
    { ru: 'Меня́ зову́т И́горь.', translit: 'menya zavut Igor', en: 'My name is Igor.', words: [{ id: 'u2-zovut', ru: 'зову́т', en: '(they) call' }] },
    { ru: 'Он мой друг, а она́ моя́ подру́га.', translit: 'on moy drug, a ona moya podruga', en: 'He is my friend, and she is my friend.', words: [{ id: 'u2-on', ru: 'Он', en: 'he' }, { id: 'u2-drug', ru: 'друг', en: 'friend (m)' }, { id: 'u2-ona', ru: 'она́', en: 'she' }, { id: 'u2-podruga', ru: 'подру́га', en: 'friend (f)' }] },
    { ru: 'Мы студе́нты, они́ то́же студе́нты.', translit: 'my studenty, oni tozhe studenty', en: 'We are students, they are students too.', words: [{ id: 'u2-my', ru: 'Мы', en: 'we' }] },
    { ru: 'Как вас зову́т? — Анто́н.', translit: 'kak vas zavut? Anton', en: 'What is your name? — Anton.', words: [{ id: 'u2-zovut', ru: 'зову́т', en: '(they) call' }] }
  ],
  dialogue: {
    title: 'Знако́мство (Meeting someone)',
    lines: [
      { who: 'И́ра', ru: 'Приве́т! Как тебя́ зову́т?', en: 'Hi! What is your name?' },
      { who: 'Том', ru: 'Приве́т! Меня́ зову́т Том. А тебя́?', en: 'Hi! My name is Tom. And you?' },
      { who: 'И́ра', ru: 'Меня́ зову́т И́ра. О́чень прия́тно!', en: 'My name is Ira. Nice to meet you!' },
      { who: 'Том', ru: 'О́чень прия́тно! Кто э́то?', en: 'Nice to meet you! Who is this?' },
      { who: 'И́ра', ru: 'Э́то мой друг, он студе́нт.', en: 'This is my friend, he is a student.' },
      { who: 'Том', ru: 'А она́?', en: 'And she?' },
      { who: 'И́ра', ru: 'Она́ моя́ подру́га. Пока́!', en: 'She is my friend. Bye!' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Как зову́т но́вого знако́мого И́ры?', options: ['Том', 'Анто́н', 'И́горь', 'И́ра'], answer: 'Том' },
      { type: 'mc-ru', q: 'Кто тако́й друг И́ры?', options: ['студе́нт', 'учи́тель', 'врач', 'инжене́р'], answer: 'студе́нт' },
      { type: 'mc-ru', q: 'Кто она́?', options: ['подру́га', 'ма́ма', 'сестра́', 'студе́нтка'], answer: 'подру́га' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «подру́га»?', options: ['female friend', 'male friend', 'student', 'person'], answer: 'female friend', ru: 'подру́га' },
    { type: 'mc-en', q: 'Что зна́чит «мы»?', options: ['we', 'they', 'you', 'I'], answer: 'we', ru: 'мы' },
    { type: 'mc-ru', q: 'How do you say “she”?', options: ['она́', 'он', 'они́', 'оно́'], answer: 'она́', ru: 'она́' },
    { type: 'mc-ru', q: '“who” in Russian', options: ['кто', 'что', 'где', 'как'], answer: 'кто', ru: 'кто' },
    { type: 'typing', q: 'Type “I” in Russian', answer: 'я', accepts: [], ru: 'я' },
    { type: 'typing', q: 'Type “we” in Russian', answer: 'мы', accepts: [], ru: 'мы' },
    { type: 'mc-en', q: 'Что зна́чит «студе́нтка»?', options: ['female student', 'male student', 'teacher', 'friend'], answer: 'female student', ru: 'студе́нтка' },
    { type: 'mc-ru', q: '“you (polite)” in Russian', options: ['вы', 'ты', 'они́', 'мы'], answer: 'вы', ru: 'вы' },
    { type: 'mc-en', q: 'Что зна́чит «и́мя»?', options: ['first name', 'surname', 'friend', 'person'], answer: 'first name', ru: 'и́мя' },
    { type: 'mc-ru', q: '“they” in Russian', options: ['они́', 'мы', 'вы', 'она́'], answer: 'они́', ru: 'они́' },
    { type: 'typing', q: 'Type “who” in Russian', answer: 'кто', accepts: [], ru: 'кто' },
    { type: 'mc-en', q: 'Что зна́чит «челове́к»?', options: ['person', 'friend', 'name', 'student'], answer: 'person', ru: 'челове́к' }
  ],
  test: {
    title: 'Unit 2 test — Who are you?',
    questions: [
      { type: 'mc-ru', q: '“I” in Russian', options: ['я', 'мы', 'ты', 'вы'], answer: 'я', ru: 'я' },
      { type: 'mc-en', q: 'Что зна́чит «они́»?', options: ['they', 'we', 'you', 'he'], answer: 'they', ru: 'они́' },
      { type: 'mc-ru', q: '“he / it (m)”', options: ['он', 'она́', 'оно́', 'они́'], answer: 'он', ru: 'он' },
      { type: 'typing', q: 'Type “you (informal)” in Russian', answer: 'ты', accepts: [], ru: 'ты' },
      { type: 'typing', q: 'Type “what” in Russian', answer: 'что', accepts: [], ru: 'что' },
      { type: 'mc-en', q: 'Что зна́чит «друг»?', options: ['male friend', 'female friend', 'student', 'person'], answer: 'male friend', ru: 'друг' },
      { type: 'mc-ru', q: '“we” in Russian', options: ['мы', 'вы', 'они́', 'я'], answer: 'мы', ru: 'мы' },
      { type: 'mc-en', q: 'Что зна́чит «фами́лия»?', options: ['surname', 'first name', 'friend', 'student'], answer: 'surname', ru: 'фами́лия' },
      { type: 'typing', q: 'Type “friend (female)” in Russian', answer: 'подруга', accepts: ['подру́га'], ru: 'подру́га' },
      { type: 'mc-ru', q: '“they call”', options: ['зову́т', 'знать', 'читать', 'говорить'], answer: 'зову́т', ru: 'зову́т' },
      { type: 'mc-en', q: 'Что зна́чит «студе́нт»?', options: ['student (male)', 'student (female)', 'teacher', 'friend'], answer: 'student (male)', ru: 'студе́нт' },
      { type: 'typing', q: 'Type “it (n)” in Russian', answer: 'оно', accepts: ['оно́'], ru: 'оно́' }
    ]
  }
};
