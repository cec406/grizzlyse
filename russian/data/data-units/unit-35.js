// Unit 35 — Participles. B2.
export const unit = {
  id: 'u35',
  level: 'B2',
  number: 35,
  title: 'Participles',
  titleRu: 'Прича́стие',
  story: 'Participles let you compress two sentences into one and sound educated: the man reading a book, the letter written yesterday, the house built in 1900. This unit covers active and passive participles and their short forms.',
  grammar: [
    {
      topic: 'Active participles',
      explanation: 'Active participles describe the doer. Present active uses -ущий/-ющ (from the present stem); past active uses -вший (from the past stem). They are adjectives and agree in gender, number and case.',
      table: [
        ['Infinitive', 'Present active', 'Past active'],
        ['чита́ть', 'чита́ющий', 'чита́вший'],
        ['писа́ть', 'пи́шущий', 'писа́вший'],
        ['де́лать', 'де́лающий', 'де́лавший'],
        ['говори́ть', 'говоря́щий', 'говори́вший']
      ],
      examples: [
        { ru: ' Челове́к, чита́ющий кни́гу, — мой брат.', trans: 'chelovek, chitayushchiy knigu, moy brat', en: 'The man reading a book is my brother.' },
        { ru: 'Писа́тель, написа́вший рома́н, изве́стен.', trans: 'pisatel, napisavshiy roman, izvesten', en: 'The writer who wrote the novel is famous.' }
      ]
    },
    {
      topic: 'Passive participles',
      explanation: 'Passive participles describe the receiver. Present passive uses -емый/-имый; past passive uses -нный/-тый. They agree like adjectives.',
      table: [
        ['Infinitive', 'Present passive', 'Past passive'],
        ['чита́ть', 'чита́емый', 'прочи́танный'],
        ['писа́ть', '—', 'напи́санный'],
        ['де́лать', '—', 'сде́ланный'],
        ['стро́ить', 'стро́имый', 'постро́енный'],
        ['откры́ть', '—', 'откры́тый']
      ],
      examples: [
        { ru: 'Кни́га, напи́санная изве́стным писа́телем, о́чень интере́сна.', trans: 'kniga, napisannaya izvestnym pisatelem, ochen interesna', en: 'The book written by a famous writer is very interesting.' }
      ]
    },
    {
      topic: 'Short passive participles',
      explanation: 'The short form is used as a predicate, usually without a subject agent unless expressed with the instrumental. It agrees in gender and number but not in case.',
      table: [
        ['Russian', 'English'],
        ['Дом был постро́ен в про́шлом ве́ке.', 'The house was built last century.'],
        ['Э́та статья́ напи́сана на ру́сском языке́.', 'This article is written in Russian.'],
        ['Окно́ закры́то.', 'The window is closed.'],
        ['Две́ри откры́ты.', 'The doors are open.']
      ],
      examples: [
        { ru: 'Дом был постро́ен в про́шлом ве́ке.', trans: 'dom byl postroyen v proshlom veke', en: 'The house was built last century.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u35-prichastie', ru: 'прича́стие', translit: 'prichastiye', en: 'participle', pos: 'noun', gender: 'n' },
    { id: 'u35-chitayushchiy', ru: 'чита́ющий', translit: 'chitayushchiy', en: 'reading (active present)', pos: 'adjective' },
    { id: 'u35-chitavshiy', ru: 'чита́вший', translit: 'chitavshiy', en: 'who read (active past)', pos: 'adjective' },
    { id: 'u35-chitaemy', ru: 'чита́емый', translit: 'chitayemy', en: 'being read (passive present)', pos: 'adjective' },
    { id: 'u35-prochitanny', ru: 'прочи́танный', translit: 'prochitanny', en: 'read (passive past)', pos: 'adjective' },
    { id: 'u35-pishushchiy', ru: 'пи́шущий', translit: 'pishushchiy', en: 'writing (active present)', pos: 'adjective' },
    { id: 'u35-napisanny', ru: 'напи́санный', translit: 'napisanny', en: 'written (passive past)', pos: 'adjective' },
    { id: 'u35-delayushchiy', ru: 'де́лающий', translit: 'delayushchiy', en: 'doing (active present)', pos: 'adjective' },
    { id: 'u35-sdelanny', ru: 'сде́ланный', translit: 'sdelanny', en: 'done (passive past)', pos: 'adjective' },
    { id: 'u35-postroenny', ru: 'постро́енный', translit: 'postroyenny', en: 'built (passive past)', pos: 'adjective' },
    { id: 'u35-otkryty', ru: 'откры́тый', translit: 'otkryty', en: 'open / opened', pos: 'adjective' },
    { id: 'u35-zakryty', ru: 'закры́тый', translit: 'zakryty', en: 'closed', pos: 'adjective' },
    { id: 'u35-interesuyushchiy', ru: 'интересу́ющий', translit: 'interesuyushchiy', en: 'interesting (to someone)', pos: 'adjective' },
    { id: 'u35-izvestny', ru: 'изве́стный', translit: 'izvestny', en: 'well-known', pos: 'adjective' },
    { id: 'u35-tvorit', ru: 'твори́ть', translit: 'tvorit', en: 'to create', pos: 'verb' },
    { id: 'u35-sozdavat', ru: 'создава́ть', translit: 'sozdavat', en: 'to create / found', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u35-1', ru: 'Дом был постро́ен в про́шлом ве́ке.', trans: 'dom byl postroyen v proshlom veke', en: 'The house was built last century.' },
    { id: 'p-u35-2', ru: 'Окно́ закры́то.', trans: 'okno zakryto', en: 'The window is closed.' }
  ],
  sentences: [
    { ru: 'Челове́к, чита́ющий кни́гу, — э́то мой брат.', translit: 'chelovek, chitayushchiy knigu, eta moy brat', en: 'The man reading a book is my brother.', words: [{ id: 'u35-chitayushchiy', ru: 'чита́ющий', en: 'reading' }] },
    { ru: 'Кни́га, напи́санная изве́стным писа́телем, интере́сна.', translit: 'kniga, napisannaya izvestnym pisatelem, interesna', en: 'The book written by a famous writer is interesting.', words: [{ id: 'u35-napisanny', ru: 'напи́санная', en: 'written' }, { id: 'u35-izvestny', ru: 'изве́стным', en: 'well-known' }] },
    { ru: 'Дом был постро́ен в про́шлом ве́ке.', translit: 'dom byl postroyen v proshlom veke', en: 'The house was built last century.', words: [{ id: 'u35-postroenny', ru: 'постро́ен', en: 'built' }] },
    { ru: 'Э́та статья́ напи́сана на ру́сском языке́.', translit: 'eta statya napisana na russkom yazyke', en: 'This article is written in Russian.', words: [{ id: 'u35-napisanny', ru: 'напи́сана', en: 'written' }] },
    { ru: 'Откры́тая дверь и закры́тое окно́.', translit: 'otkrytaya dver i zakrytoye okno', en: 'An open door and a closed window.', words: [{ id: 'u35-otkryty', ru: 'Откры́тая', en: 'open' }, { id: 'u35-zakryty', ru: 'закры́тое', en: 'closed' }] }
  ],
  dialogue: {
    title: 'О прича́стиях (About participles)',
    lines: [
      { who: 'Мария', ru: 'Ты зна́ешь челове́ка, чита́ющего э́ту кни́гу?', en: 'Do you know the person reading this book?' },
      { who: 'Том', ru: 'Да, э́то студе́нт, изуча́ющий ру́сский язы́к.', en: 'Yes, that is a student studying Russian.' },
      { who: 'Мария', ru: 'А кни́га, напи́санная э́тим писа́телем, изве́стна?', en: 'And is the book written by this writer famous?' },
      { who: 'Том', ru: 'О́чень! Она́ была напи́сана мно́го лет наза́д.', en: 'Very! It was written many years ago.' },
      { who: 'Мария', ru: 'И переведена́ на мно́гие языки́?', en: 'And translated into many languages?' },
      { who: 'Том', ru: 'Да, коне́чно.', en: 'Yes, of course.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Кто челове́к, чита́ющий кни́гу?', options: ['студе́нт', 'учи́тель', 'писа́тель', 'гид'], answer: 'студе́нт' },
      { type: 'mc-ru', q: 'Что де́лает студе́нт?', options: ['изуча́ет ру́сский', 'пи́шет рома́н', 'рабо́тает', 'отдыха́ет'], answer: 'изуча́ет ру́сский' },
      { type: 'mc-ru', q: 'Когда́ была́ напи́сана кни́га?', options: ['мно́го лет наза́д', 'вчера́', 'в э́том году́', 'неда́вно'], answer: 'мно́го лет наза́д' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «прича́стие»?', options: ['participle', 'gerund', 'adjective', 'verb'], answer: 'participle', ru: 'прича́стие' },
    { type: 'mc-en', q: 'Что зна́чит «чита́ющий»?', options: ['reading (active present)', 'read', 'being read', 'reader'], answer: 'reading (active present)', ru: 'чита́ющий' },
    { type: 'mc-ru', q: 'Past passive of «написа́ть»', options: ['напи́санный', 'пи́шущий', 'писа́вший', 'написа́ть'], answer: 'напи́санный', ru: 'напи́санный' },
    { type: 'mc-ru', q: 'Present active of «чита́ть»', options: ['чита́ющий', 'чита́вший', 'чита́емый', 'прочи́танный'], answer: 'чита́ющий', ru: 'чита́ющий' },
    { type: 'typing', q: 'Type “participle” in Russian', answer: 'причастие', accepts: ['прича́стие'], ru: 'прича́стие' },
    { type: 'typing', q: 'Type “built (passive past)” in Russian', answer: 'построенный', accepts: ['постро́енный'], ru: 'постро́енный' },
    { type: 'mc-en', q: 'Что зна́чит «закры́тый»?', options: ['closed', 'open', 'locked', 'shut tight'], answer: 'closed', ru: 'закры́тый' },
    { type: 'mc-ru', q: '“done (passive past)” in Russian', options: ['сде́ланный', 'де́лающий', 'сде́лать', 'де́лаемый'], answer: 'сде́ланный', ru: 'сде́ланный' },
    { type: 'mc-en', q: 'Что зна́чит «откры́тый»?', options: ['open / opened', 'closed', 'wide', 'broken'], answer: 'open / opened', ru: 'откры́тый' },
    { type: 'mc-ru', q: 'Complete: Дом был ___ в про́шлом ве́ке.', options: ['постро́ен', 'постро́енный', 'стро́ит', 'стро́ится'], answer: 'постро́ен', ru: 'постро́ен' },
    { type: 'typing', q: 'Type “to create” in Russian', answer: 'творить', accepts: ['твори́ть'], ru: 'твори́ть' },
    { type: 'mc-en', q: 'Что зна́чит «изве́стный»?', options: ['well-known', 'interesting', 'unknown', 'new'], answer: 'well-known', ru: 'изве́стный' }
  ],
  test: {
    title: 'Unit 35 test — Participles',
    questions: [
      { type: 'mc-ru', q: 'Present active of «де́лать»', options: ['де́лающий', 'де́лавший', 'сде́ланный', 'де́лать'], answer: 'де́лающий', ru: 'де́лающий' },
      { type: 'mc-en', q: 'Что зна́чит «чита́вший»?', options: ['who read (active past)', 'reading now', 'being read', 'reader'], answer: 'who read (active past)', ru: 'чита́вший' },
      { type: 'typing', q: 'Type “written (passive past)” in Russian', answer: 'написанный', accepts: ['напи́санный'], ru: 'напи́санный' },
      { type: 'typing', q: 'Type “open / opened” in Russian', answer: 'открытый', accepts: ['откры́тый'], ru: 'откры́тый' },
      { type: 'mc-ru', q: '“being read (passive present)” in Russian', options: ['чита́емый', 'чита́ющий', 'чита́вший', 'прочи́танный'], answer: 'чита́емый', ru: 'чита́емый' },
      { type: 'mc-en', q: 'Что зна́чит «создава́ть»?', options: ['to create / found', 'to destroy', 'to write', 'to build'], answer: 'to create / found', ru: 'создава́ть' },
      { type: 'mc-ru', q: 'Complete: Окно́ ___.', options: ['закры́то', 'закры́тый', 'закрыва́ет', 'закры́ть'], answer: 'закры́то', ru: 'закры́то' },
      { type: 'typing', q: 'Type “participle” in Russian', answer: 'причастие', accepts: ['прича́стие'], ru: 'прича́стие' },
      { type: 'mc-en', q: 'Что зна́чит «интересу́ющий»?', options: ['interesting (to someone)', 'bored', 'interested in', 'curious'], answer: 'interesting (to someone)', ru: 'интересу́ющий' },
      { type: 'mc-ru', q: '“doing (active present)” in Russian', options: ['де́лающий', 'сде́ланный', 'де́лавший', 'де́лать'], answer: 'де́лающий', ru: 'де́лающий' },
      { type: 'typing', q: 'Type “writing (active present)” in Russian', answer: 'пишущий', accepts: ['пи́шущий'], ru: 'пи́шущий' },
      { type: 'mc-en', q: 'Что зна́чит «закры́тый»?', options: ['closed', 'open', 'empty', 'locked'], answer: 'closed', ru: 'закры́тый' }
    ]
  }
};
