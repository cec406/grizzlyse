// Unit 7 — Day and time. A1.
export const unit = {
  id: 'u07',
  level: 'A1',
  number: 7,
  title: 'Day and time',
  titleRu: 'День и вре́мя',
  story: 'Talk about your day: what time it is, when you get up, and what you do in the morning, afternoon and evening. This unit also gives you the present tense in full — the engine behind almost every Russian sentence you will ever say.',
  grammar: [
    {
      topic: 'Present tense: the two conjugations',
      explanation: 'Russian verbs change their ending for each person. Most verbs follow either the -е- pattern (чита́ть → чита́ю) or the -и- pattern (говори́ть → говорю́). Because the ending already shows the person, the pronoun is optional.',
      table: [
        ['Person', 'чита́ть (read)', 'говори́ть (speak)'],
        ['я', 'чита́ю', 'говорю́'],
        ['ты', 'чита́ешь', 'говори́шь'],
        ['он / она́', 'чита́ет', 'говори́т'],
        ['мы', 'чита́ем', 'говори́м'],
        ['вы', 'чита́ете', 'говори́те'],
        ['они́', 'чита́ют', 'говоря́т']
      ],
      examples: [
        { ru: 'Я чита́ю кни́гу.', trans: 'ya chitayu knigu', en: 'I am reading a book.' },
        { ru: 'Он хорошо́ говори́т по-ру́сски.', trans: 'on khorosho govorit po-russki', en: 'He speaks Russian well.' }
      ]
    },
    {
      topic: 'Time of day: у́тром, днём, ве́чером',
      explanation: 'To say "in the morning / afternoon / evening / at night", use these fixed adverbs. They are the natural answer to Когда́? ("When?").',
      table: [
        ['Russian', 'English'],
        ['у́тром', 'in the morning'],
        ['днём', 'in the afternoon'],
        ['ве́чером', 'in the evening'],
        ['но́чью', 'at night']
      ],
      examples: [
        { ru: 'У́тром я пью ко́фе.', trans: 'utrom ya pyu kofe', en: 'In the morning I drink coffee.' },
        { ru: 'Ве́чером он чита́ет.', trans: 'vecherom on chitayet', en: 'In the evening he reads.' }
      ]
    },
    {
      topic: 'Reflexive verbs with -ся',
      explanation: 'Verbs like встава́ть ("to get up") and просыпа́ться ("to wake up") end in -ся. They describe an action you do to yourself. After a vowel the ending is -сь (я учу́сь).',
      table: [
        ['Infinitive', 'я-form', 'Meaning'],
        ['просыпа́ться', 'просыпа́юсь', 'I wake up'],
        ['встава́ть', 'встаю́', 'I get up'],
        ['мыть', 'мо́ю', 'I wash'],
        ['учи́ться', 'учу́сь', 'I study']
      ],
      examples: [
        { ru: 'Я встаю́ ра́но.', trans: 'ya vstayu rano', en: 'I get up early.' }
      ]
    },
    {
      topic: 'Telling the time',
      explanation: 'Ask «Кото́рый час?». The answer uses часо́в after a number: де́вять часо́в = 9 o\'clock. Сейча́с means "right now".',
      table: [
        ['Russian', 'English'],
        ['Кото́рый час?', 'What time is it?'],
        ['Сейча́с де́вять часо́в.', 'It is nine o\'clock.'],
        ['полчаса́', 'half an hour'],
        ['мину́та', 'a minute']
      ],
      examples: [
        { ru: 'Кото́рый час? — Сейча́с два часа́.', trans: 'kotory chas? seychas dva chasa', en: 'What time is it? — It is two o\'clock.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u7-den', ru: 'день', translit: 'den', en: 'day', pos: 'noun', gender: 'm' },
    { id: 'u7-utro', ru: 'у́тро', translit: 'utro', en: 'morning', pos: 'noun', gender: 'n' },
    { id: 'u7-vecher', ru: 'ве́чер', translit: 'vecher', en: 'evening', pos: 'noun', gender: 'm' },
    { id: 'u7-noch', ru: 'ночь', translit: 'noch', en: 'night', pos: 'noun', gender: 'f' },
    { id: 'u7-chas', ru: 'час', translit: 'chas', en: 'hour / o\'clock', pos: 'noun', gender: 'm' },
    { id: 'u7-minuta', ru: 'мину́та', translit: 'minuta', en: 'minute', pos: 'noun', gender: 'f' },
    { id: 'u7-vremya', ru: 'вре́мя', translit: 'vremya', en: 'time', pos: 'noun', gender: 'n' },
    { id: 'u7-rano', ru: 'ра́но', translit: 'rano', en: 'early', pos: 'adverb' },
    { id: 'u7-pozdno', ru: 'по́здно', translit: 'pozdno', en: 'late', pos: 'adverb' },
    { id: 'u7-segodnya', ru: 'сего́дня', translit: 'segodnya', en: 'today', pos: 'adverb' },
    { id: 'u7-zavtra', ru: 'за́втра', translit: 'zavtra', en: 'tomorrow', pos: 'adverb' },
    { id: 'u7-vchera', ru: 'вчера́', translit: 'vchera', en: 'yesterday', pos: 'adverb' },
    { id: 'u7-seychas', ru: 'сейча́с', translit: 'seychas', en: 'now / right now', pos: 'adverb' },
    { id: 'u7-vstavat', ru: 'встава́ть', translit: 'vstavat', en: 'to get up', pos: 'verb' },
    { id: 'u7-rabotat', ru: 'рабо́тать', translit: 'rabotat', en: 'to work', pos: 'verb' },
    { id: 'u7-spat', ru: 'спать', translit: 'spat', en: 'to sleep', pos: 'verb' },
    { id: 'u7-chitat', ru: 'чита́ть', translit: 'chitat', en: 'to read', pos: 'verb' },
    { id: 'u7-govorit', ru: 'говори́ть', translit: 'govorit', en: 'to speak', pos: 'verb' },
    { id: 'u7-kotory', ru: 'кото́рый', translit: 'kotory', en: 'which / what (time)', pos: 'question' }
  ],
  phrases: [
    { id: 'p-u7-1', ru: 'Кото́рый час?', trans: 'kotory chas?', en: 'What time is it?' },
    { id: 'p-u7-2', ru: 'До́брое у́тро!', trans: 'dobroye utro!', en: 'Good morning!' }
  ],
  sentences: [
    { ru: 'Я встаю́ ра́но.', translit: 'ya vstayu rano', en: 'I get up early.', words: [{ id: 'u7-vstavat', ru: 'встаю́', en: 'to get up' }, { id: 'u7-rano', ru: 'ра́но', en: 'early' }] },
    { ru: 'У́тром я пью ко́фе.', translit: 'utrom ya pyu kofe', en: 'In the morning I drink coffee.', words: [{ id: 'u7-utro', ru: 'У́тром', en: 'morning' }] },
    { ru: 'Ве́чером он чита́ет.', translit: 'vecherom on chitayet', en: 'In the evening he reads.', words: [{ id: 'u7-vecher', ru: 'Ве́чером', en: 'evening' }, { id: 'u7-chitat', ru: 'чита́ет', en: 'to read' }] },
    { ru: 'Кото́рый час?', translit: 'kotory chas?', en: 'What time is it?', words: [{ id: 'u7-kotory', ru: 'Кото́рый', en: 'which' }, { id: 'u7-chas', ru: 'час', en: 'hour' }] },
    { ru: 'Сейча́с де́вять часо́в, я рабо́таю.', translit: 'seychas devyat chasov, ya rabotayu', en: 'It is nine o\'clock, I am working.', words: [{ id: 'u7-seychas', ru: 'Сейча́с', en: 'now' }, { id: 'u7-rabotat', ru: 'рабо́таю', en: 'to work' }] }
  ],
  dialogue: {
    title: 'У́тро То́ма (Tom\'s morning)',
    lines: [
      { who: 'Мария', ru: 'Кото́рый час?', en: 'What time is it?' },
      { who: 'Том', ru: 'Сейча́с семь часо́в утра́.', en: 'It is seven in the morning.' },
      { who: 'Мария', ru: 'Ты встаёшь ра́но! Что ты де́лаешь у́тром?', en: 'You get up early! What do you do in the morning?' },
      { who: 'Том', ru: 'Просыпа́юсь, пью ко́фе и чита́ю.', en: 'I wake up, drink coffee and read.' },
      { who: 'Мария', ru: 'А ве́чером?', en: 'And in the evening?' },
      { who: 'Том', ru: 'Рабо́таю, пото́м сплю. Я сплю но́чью.', en: 'I work, then I sleep. I sleep at night.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Ско́лько сейча́с вре́мени?', options: ['семь часо́в', 'де́вять часо́в', 'два часа́', 'де́сять часо́в'], answer: 'семь часо́в' },
      { type: 'mc-ru', q: 'Что Том де́лает у́тром?', options: ['пьёт ко́фе и чита́ет', 'рабо́тает', 'спит', 'смо́трит телеви́зор'], answer: 'пьёт ко́фе и чита́ет' },
      { type: 'mc-ru', q: 'Когда́ Том спит?', options: ['но́чью', 'у́тром', 'днём', 'ве́чером'], answer: 'но́чью' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «у́тро»?', options: ['morning', 'evening', 'night', 'day'], answer: 'morning', ru: 'у́тро' },
    { type: 'mc-en', q: 'Что зна́чит «вчера́»?', options: ['yesterday', 'today', 'tomorrow', 'now'], answer: 'yesterday', ru: 'вчера́' },
    { type: 'mc-ru', q: 'How do you say “today”?', options: ['сего́дня', 'за́втра', 'вчера́', 'сейча́с'], answer: 'сего́дня', ru: 'сего́дня' },
    { type: 'mc-ru', q: '“night” in Russian', options: ['ночь', 'день', 'ве́чер', 'у́тро'], answer: 'ночь', ru: 'ночь' },
    { type: 'typing', q: 'Type “to read” in Russian', answer: 'читать', accepts: ['чита́ть'], ru: 'чита́ть' },
    { type: 'typing', q: 'Type “to speak” in Russian', answer: 'говорить', accepts: ['говори́ть'], ru: 'говори́ть' },
    { type: 'mc-en', q: 'Что зна́чит «мину́та»?', options: ['minute', 'hour', 'day', 'time'], answer: 'minute', ru: 'мину́та' },
    { type: 'mc-ru', q: 'Present of чита́ть for «я»', options: ['чита́ю', 'чита́ешь', 'чита́ет', 'чита́ем'], answer: 'чита́ю', ru: 'чита́ю' },
    { type: 'mc-en', q: 'Что зна́чит «за́втра»?', options: ['tomorrow', 'today', 'yesterday', 'later'], answer: 'tomorrow', ru: 'за́втра' },
    { type: 'mc-ru', q: 'Present of говори́ть for «он»', options: ['говори́т', 'говори́шь', 'говорю́', 'говори́м'], answer: 'говори́т', ru: 'говори́т' },
    { type: 'typing', q: 'Type “to work” in Russian', answer: 'работать', accepts: ['рабо́тать'], ru: 'рабо́тать' },
    { type: 'mc-en', q: 'Что зна́чит «сейча́с»?', options: ['now', 'always', 'never', 'soon'], answer: 'now', ru: 'сейча́с' }
  ],
  test: {
    title: 'Unit 7 test — Day and time',
    questions: [
      { type: 'mc-ru', q: '“evening” in Russian', options: ['ве́чер', 'у́тро', 'день', 'ночь'], answer: 'ве́чер', ru: 'ве́чер' },
      { type: 'mc-en', q: 'Что зна́чит «день»?', options: ['day', 'night', 'morning', 'week'], answer: 'day', ru: 'день' },
      { type: 'typing', q: 'Type “to get up” in Russian', answer: 'вставать', accepts: ['встава́ть'], ru: 'встава́ть' },
      { type: 'typing', q: 'Type “early” in Russian', answer: 'рано', accepts: ['ра́но'], ru: 'ра́но' },
      { type: 'mc-ru', q: '“time” in Russian', options: ['вре́мя', 'час', 'мину́та', 'день'], answer: 'вре́мя', ru: 'вре́мя' },
      { type: 'mc-en', q: 'Что зна́чит «по́здно»?', options: ['late', 'early', 'long', 'slow'], answer: 'late', ru: 'по́здно' },
      { type: 'mc-ru', q: 'Present of чита́ть for «мы»', options: ['чита́ем', 'чита́ю', 'чита́ете', 'чита́ют'], answer: 'чита́ем', ru: 'чита́ем' },
      { type: 'typing', q: 'Type “to sleep” in Russian', answer: 'спать', accepts: [], ru: 'спать' },
      { type: 'mc-en', q: 'Что зна́чит «час»?', options: ['hour / o\'clock', 'minute', 'day', 'time'], answer: 'hour / o\'clock', ru: 'час' },
      { type: 'mc-ru', q: 'Present of говори́ть for «они́»', options: ['говоря́т', 'говори́т', 'говори́м', 'говори́те'], answer: 'говоря́т', ru: 'говоря́т' },
      { type: 'typing', q: 'Type “now” in Russian', answer: 'сейчас', accepts: ['сейча́с'], ru: 'сейча́с' },
      { type: 'mc-en', q: 'Что зна́чит «кото́рый час»?', options: ['what time is it', 'which day', 'what year', 'what date'], answer: 'what time is it', ru: 'кото́рый час' }
    ]
  }
};
