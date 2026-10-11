// Unit 11 — The past tense. A2.
export const unit = {
  id: 'u11',
  level: 'A2',
  number: 11,
  title: 'The past tense',
  titleRu: 'Про́шлое вре́мя',
  story: 'You want to tell someone what you did yesterday. In Russian the past tense is refreshingly regular: drop -ть and add -л, then match the speaker\'s gender. This unit gets you telling stories about the past in minutes.',
  grammar: [
    {
      topic: 'Building the past tense',
      explanation: 'Take the infinitive, drop -ть, and add -л. Then add a gender ending: masculine adds nothing, feminine adds -а, neuter adds -о, plural adds -и. The form agrees with the subject, not the object.',
      table: [
        ['Infinitive', 'm', 'f', 'n', 'plural'],
        ['чита́ть (read)', 'чита́л', 'чита́ла', 'чита́ло', 'чита́ли'],
        ['рабо́тать (work)', 'рабо́тал', 'рабо́тала', 'рабо́тало', 'рабо́тали'],
        ['смотре́ть (watch)', 'смотре́л', 'смотре́ла', 'смотре́ло', 'смотре́ли'],
        ['говори́ть (speak)', 'говори́л', 'говори́ла', 'говори́ло', 'говори́ли']
      ],
      examples: [
        { ru: 'Вчера́ я рабо́тал.', trans: 'vchera ya rabotal', en: 'Yesterday I worked. (male)' },
        { ru: 'Вчера́ она́ рабо́тала.', trans: 'vchera ona rabotala', en: 'Yesterday she worked.' }
      ]
    },
    {
      topic: 'был, была́, бы́ло, бы́ли',
      explanation: 'The past of \"to be\" works the same way. Russian almost never uses есть in the past, so \"I was at home\" is Я был до́ма. Use бы́ло for impersonal statements like Бы́ло хо́лодно.',
      table: [
        ['Person', 'Form', 'Example'],
        ['я (m)', 'был', 'Я был до́ма.'],
        ['я (f)', 'была́', 'Я была́ до́ма.'],
        ['он', 'был', 'Он был на рабо́те.'],
        ['она́', 'была́', 'Она́ была́ в па́рке.'],
        ['мы / вы / они́', 'бы́ли', 'Мы бы́ли в кино́.']
      ],
      examples: [
        { ru: 'Вчера́ бы́ло хо́лодно.', trans: 'vchera bylo kholodno', en: 'Yesterday it was cold.' },
        { ru: 'Где ты был?', trans: 'gde ty byl?', en: 'Where were you? (to a man)' }
      ]
    },
    {
      topic: 'Time markers that love the past',
      explanation: 'These little words set a story in the past. Put them at the start for emphasis or before the verb for a neutral tone.',
      table: [
        ['Russian', 'English'],
        ['вчера́', 'yesterday'],
        ['у́тром', 'in the morning'],
        ['ве́чером', 'in the evening'],
        ['на прошло́й неде́ле', 'last week'],
        ['неда́вно', 'recently']
      ],
      examples: [
        { ru: 'У́тром я пил ко́фе.', trans: 'utrom ya pil kofe', en: 'In the morning I drank coffee.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u11-byl', ru: 'был', translit: 'byl', en: 'was (m)', pos: 'verb' },
    { id: 'u11-rabotal', ru: 'рабо́тал', translit: 'rabotal', en: 'worked (m)', pos: 'verb' },
    { id: 'u11-chital', ru: 'чита́л', translit: 'chital', en: 'read (m, past)', pos: 'verb' },
    { id: 'u11-smotrel', ru: 'смотре́л', translit: 'smotrel', en: 'watched (m)', pos: 'verb' },
    { id: 'u11-gotovil', ru: 'гото́вил', translit: 'gotovil', en: 'cooked (m)', pos: 'verb' },
    { id: 'u11-gulyal', ru: 'гуля́л', translit: 'gulyal', en: 'walked / strolled (m)', pos: 'verb' },
    { id: 'u11-otdyhal', ru: 'отдыха́л', translit: 'otdykhal', en: 'rested (m)', pos: 'verb' },
    { id: 'u11-vstretil', ru: 'встре́тил', translit: 'vstretil', en: 'met (m)', pos: 'verb' },
    { id: 'u11-kupil', ru: 'купи́л', translit: 'kupil', en: 'bought (m)', pos: 'verb' },
    { id: 'u11-poshel', ru: 'пошёл', translit: 'poshyol', en: 'went (m, on foot)', pos: 'verb' },
    { id: 'u11-skazal', ru: 'сказа́л', translit: 'skazal', en: 'said (m)', pos: 'verb' },
    { id: 'u11-vchera', ru: 'вчера́', translit: 'vchera', en: 'yesterday', pos: 'adverb' },
    { id: 'u11-utrom', ru: 'у́тром', translit: 'utrom', en: 'in the morning', pos: 'adverb' },
    { id: 'u11-vecherom', ru: 'ве́чером', translit: 'vecherom', en: 'in the evening', pos: 'adverb' },
    { id: 'u11-rabota', ru: 'рабо́та', translit: 'rabota', en: 'work / job', pos: 'noun', gender: 'f' },
    { id: 'u11-film', ru: 'фильм', translit: 'film', en: 'film / movie', pos: 'noun', gender: 'm' },
    { id: 'u11-pismo', ru: 'письмо́', translit: 'pismo', en: 'letter', pos: 'noun', gender: 'n' },
    { id: 'u11-nedelya', ru: 'неде́ля', translit: 'nedelya', en: 'week', pos: 'noun', gender: 'f' }
  ],
  phrases: [
    { id: 'p-u11-1', ru: 'Как прошёл день?', trans: 'kak proshyol den?', en: 'How was your day?' },
    { id: 'p-u11-2', ru: 'Что ты де́лал вчера́?', trans: 'chto ty delal vchera?', en: 'What did you do yesterday?' }
  ],
  sentences: [
    { ru: 'Вчера́ я рабо́тал.', translit: 'vchera ya rabotal', en: 'Yesterday I worked.', words: [{ id: 'u11-vchera', ru: 'Вчера́', en: 'yesterday' }, { id: 'u11-rabotal', ru: 'рабо́тал', en: 'worked' }] },
    { ru: 'Она́ чита́ла кни́гу.', translit: 'ona chitala knigu', en: 'She was reading a book.', words: [{ id: 'u11-chital', ru: 'чита́ла', en: 'read' }] },
    { ru: 'Мы смотре́ли фильм.', translit: 'my smotreli film', en: 'We watched a film.', words: [{ id: 'u11-smotrel', ru: 'смотре́ли', en: 'watched' }, { id: 'u11-film', ru: 'фильм', en: 'film' }] },
    { ru: 'Он был на рабо́те.', translit: 'on byl na rabote', en: 'He was at work.', words: [{ id: 'u11-byl', ru: 'был', en: 'was' }, { id: 'u11-rabota', ru: 'рабо́те', en: 'work' }] },
    { ru: 'Я купи́л хлеб и написа́л письмо́.', translit: 'ya kupil khleb i napisal pismo', en: 'I bought bread and wrote a letter.', words: [{ id: 'u11-kupil', ru: 'купи́л', en: 'bought' }, { id: 'u11-pismo', ru: 'письмо́', en: 'letter' }] }
  ],
  dialogue: {
    title: 'Как прошёл день? (How was your day?)',
    lines: [
      { who: 'Мария', ru: 'Приве́т! Что ты де́лал вчера́?', en: 'Hi! What did you do yesterday?' },
      { who: 'Том', ru: 'У́тром я рабо́тал, пото́м гуля́л в па́рке.', en: 'In the morning I worked, then I walked in the park.' },
      { who: 'Мария', ru: 'А ве́чером?', en: 'And in the evening?' },
      { who: 'Том', ru: 'Смотре́л фильм и чита́л. А ты?', en: 'I watched a film and read. And you?' },
      { who: 'Мария', ru: 'Я была́ в теа́тре. Бы́ло о́чень интере́сно!', en: 'I was at the theatre. It was very interesting!' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что Том де́лал у́тром?', options: ['рабо́тал', 'гуля́л', 'чита́л', 'спал'], answer: 'рабо́тал' },
      { type: 'mc-ru', q: 'Где была́ Мари́я ве́чером?', options: ['в теа́тре', 'в па́рке', 'до́ма', 'на рабо́те'], answer: 'в теа́тре' },
      { type: 'mc-ru', q: 'Что Том смотре́л ве́чером?', options: ['фильм', 'футбо́л', 'но́вости', 'спекта́кль'], answer: 'фильм' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «вчера́»?', options: ['yesterday', 'today', 'tomorrow', 'now'], answer: 'yesterday', ru: 'вчера́' },
    { type: 'mc-en', q: 'Что зна́чит «рабо́тал»?', options: ['worked (m)', 'works', 'will work', 'working'], answer: 'worked (m)', ru: 'рабо́тал' },
    { type: 'mc-ru', q: 'Past tense of чита́ть for «она́»', options: ['чита́ла', 'чита́л', 'чита́ло', 'чита́ли'], answer: 'чита́ла', ru: 'чита́ла' },
    { type: 'mc-ru', q: '“to be” past for «мы»', options: ['бы́ли', 'был', 'была́', 'бы́ло'], answer: 'бы́ли', ru: 'бы́ли' },
    { type: 'typing', q: 'Type “yesterday” in Russian', answer: 'вчера', accepts: ['вчера́'], ru: 'вчера́' },
    { type: 'typing', q: 'Type “watched (m)” in Russian', answer: 'смотрел', accepts: ['смотре́л'], ru: 'смотре́л' },
    { type: 'mc-en', q: 'Что зна́чит «фильм»?', options: ['film', 'book', 'letter', 'park'], answer: 'film', ru: 'фильм' },
    { type: 'mc-ru', q: 'Past tense of говори́ть for «они́»', options: ['говори́ли', 'говори́л', 'говори́ла', 'говори́ло'], answer: 'говори́ли', ru: 'говори́ли' },
    { type: 'mc-en', q: 'Что зна́чит «письмо́»?', options: ['letter', 'film', 'week', 'work'], answer: 'letter', ru: 'письмо́' },
    { type: 'mc-ru', q: 'Complete: Вчера́ ___ хо́лодно.', options: ['бы́ло', 'был', 'была́', 'бы́ли'], answer: 'бы́ло', ru: 'бы́ло' },
    { type: 'typing', q: 'Type “in the evening” in Russian', answer: 'вечером', accepts: ['ве́чером'], ru: 'ве́чером' },
    { type: 'mc-en', q: 'Что зна́чит «неде́ля»?', options: ['week', 'day', 'month', 'year'], answer: 'week', ru: 'неде́ля' }
  ],
  test: {
    title: 'Unit 11 test — The past tense',
    questions: [
      { type: 'mc-ru', q: 'Past tense of рабо́тать for «я» (male)', options: ['рабо́тал', 'рабо́тала', 'рабо́тало', 'рабо́тали'], answer: 'рабо́тал', ru: 'рабо́тал' },
      { type: 'mc-en', q: 'Что зна́чит «был»?', options: ['was (m)', 'is', 'will be', 'were (f)'], answer: 'was (m)', ru: 'был' },
      { type: 'typing', q: 'Type “rested (m)” in Russian', answer: 'отдыхал', accepts: ['отдыха́л'], ru: 'отдыха́л' },
      { type: 'typing', q: 'Type “said (m)” in Russian', answer: 'сказал', accepts: ['сказа́л'], ru: 'сказа́л' },
      { type: 'mc-ru', q: '“met (m)” in Russian', options: ['встре́тил', 'купи́л', 'пошёл', 'гуля́л'], answer: 'встре́тил', ru: 'встре́тил' },
      { type: 'mc-en', q: 'Что зна́чит «купи́л»?', options: ['bought (m)', 'sold', 'found', 'took'], answer: 'bought (m)', ru: 'купи́л' },
      { type: 'mc-ru', q: 'Past of смотре́ть for «она́»', options: ['смотре́ла', 'смотре́л', 'смотре́ло', 'смотре́ли'], answer: 'смотре́ла', ru: 'смотре́ла' },
      { type: 'typing', q: 'Type “in the morning” in Russian', answer: 'утром', accepts: ['у́тром'], ru: 'у́тром' },
      { type: 'mc-en', q: 'Что зна́чит «рабо́та»?', options: ['work / job', 'week', 'letter', 'film'], answer: 'work / job', ru: 'рабо́та' },
      { type: 'mc-ru', q: '“went (m, on foot)” in Russian', options: ['пошёл', 'е́хал', 'ходи́л', 'лете́л'], answer: 'пошёл', ru: 'пошёл' },
      { type: 'typing', q: 'Type “cooked (m)” in Russian', answer: 'готовил', accepts: ['гото́вил'], ru: 'гото́вил' },
      { type: 'mc-en', q: 'Что зна́чит «гуля́л»?', options: ['walked / strolled (m)', 'ran', 'drove', 'flew'], answer: 'walked / strolled (m)', ru: 'гуля́л' }
    ]
  }
};
