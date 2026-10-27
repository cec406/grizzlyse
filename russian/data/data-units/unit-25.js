// Unit 25 — Comparing things. B1.
export const unit = {
  id: 'u25',
  level: 'B1',
  number: 25,
  title: 'Comparing things',
  titleRu: 'Сравне́ние',
  story: 'Better, worse, the biggest, just as good. Russian comparatives are short and regular once you learn a small set of irregulars. This unit also gives you the superlative and the patterns for equal comparison.',
  grammar: [
    {
      topic: 'The comparative',
      explanation: 'Most adjectives form the comparative with -ее (бы́стрый → быстре́е). A few very common ones are irregular and must be memorised. The comparative does not change for gender or number.',
      table: [
        ['Adjective', 'Comparative', 'English'],
        ['бы́стрый', 'быстре́е', 'faster'],
        ['интере́сный', 'интере́снее', 'more interesting'],
        ['хоро́ший', 'лу́чше', 'better'],
        ['плохо́й', 'ху́же', 'worse'],
        ['большо́й', 'бо́льше', 'bigger / more'],
        ['ма́ленький', 'ме́ньше', 'smaller / less']
      ],
      examples: [
        { ru: 'Э́та кни́га интере́снее.', trans: 'eta kniga interesneye', en: 'This book is more interesting.' }
      ]
    },
    {
      topic: 'чем or the genitive',
      explanation: 'To name the second item, either use чем + nominative, or drop чем and put the item in the genitive. Both are correct; чем is more explicit.',
      table: [
        ['With чем', 'Without чем', 'English'],
        ['бо́льше, чем Москва́', 'бо́льше Москвы́', 'bigger than Moscow'],
        ['лу́чше, чем я', 'лу́чше меня́', 'better than me'],
        ['ста́рше, чем он', 'ста́рше его́', 'older than him']
      ],
      examples: [
        { ru: 'Москва́ бо́льше, чем Каза́нь.', trans: 'Moskva bolshe chem Kazan', en: 'Moscow is bigger than Kazan.' },
        { ru: 'Он лу́чше меня́ игра́ет.', trans: 'on luchshe menya igrayet', en: 'He plays better than me.' }
      ]
    },
    {
      topic: 'The superlative with са́мый',
      explanation: 'The most common superlative is са́мый + adjective, and the adjective agrees with the noun: са́мый краси́вый го́род, са́мая краси́вая у́лица.',
      table: [
        ['Russian', 'English'],
        ['са́мый краси́вый', 'the most beautiful (m)'],
        ['са́мая краси́вая', 'the most beautiful (f)'],
        ['са́мый лу́чший', 'the best'],
        ['са́мый изве́стный', 'the most famous']
      ],
      examples: [
        { ru: 'Э́то са́мый краси́вый го́род.', trans: 'eta samy krasivy gorod', en: 'This is the most beautiful city.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u25-sravnivat', ru: 'сравни́вать', translit: 'sravnivat', en: 'to compare', pos: 'verb' },
    { id: 'u25-luchshe', ru: 'лу́чше', translit: 'luchshe', en: 'better', pos: 'adverb' },
    { id: 'u25-huzhe', ru: 'ху́же', translit: 'khuzhe', en: 'worse', pos: 'adverb' },
    { id: 'u25-bolshe', ru: 'бо́льше', translit: 'bolshe', en: 'bigger / more', pos: 'adverb' },
    { id: 'u25-menshe', ru: 'ме́ньше', translit: 'menshe', en: 'smaller / less', pos: 'adverb' },
    { id: 'u25-samyy', ru: 'са́мый', translit: 'samy', en: 'the most', pos: 'pronoun' },
    { id: 'u25-takoy', ru: 'тако́й', translit: 'takoy', en: 'such / so', pos: 'pronoun' },
    { id: 'u25-kak', ru: 'как', translit: 'kak', en: 'as / like', pos: 'conjunction' },
    { id: 'u25-chem', ru: 'чем', translit: 'chem', en: 'than', pos: 'conjunction' },
    { id: 'u25-bystry', ru: 'бы́стрый', translit: 'bystry', en: 'fast / quick', pos: 'adjective' },
    { id: 'u25-medlenny', ru: 'ме́дленный', translit: 'medlenny', en: 'slow', pos: 'adjective' },
    { id: 'u25-vysoky', ru: 'высо́кий', translit: 'vysoky', en: 'tall / high', pos: 'adjective' },
    { id: 'u25-nizky', ru: 'ни́зкий', translit: 'nizky', en: 'low / short', pos: 'adjective' },
    { id: 'u25-tyazhely', ru: 'тяжёлый', translit: 'tyazhyoly', en: 'heavy / hard', pos: 'adjective' },
    { id: 'u25-legky', ru: 'лёгкий', translit: 'lyogky', en: 'light / easy', pos: 'adjective' },
    { id: 'u25-interesny', ru: 'интере́сный', translit: 'interesny', en: 'interesting', pos: 'adjective' },
    { id: 'u25-odinakovy', ru: 'одина́ковый', translit: 'odinakovy', en: 'the same / identical', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u25-1', ru: 'Э́то лу́чше!', trans: 'eta luchshe!', en: 'This is better!' },
    { id: 'p-u25-2', ru: 'Так же хорошо́, как…', trans: 'tak zhe khorosho, kak…', en: 'As well as…' }
  ],
  sentences: [
    { ru: 'Москва́ бо́льше, чем Каза́нь.', translit: 'Moskva bolshe chem Kazan', en: 'Moscow is bigger than Kazan.', words: [{ id: 'u25-bolshe', ru: 'бо́льше', en: 'bigger' }, { id: 'u25-chem', ru: 'чем', en: 'than' }] },
    { ru: 'Э́та кни́га интере́снее, чем та.', translit: 'eta kniga interesneye chem ta', en: 'This book is more interesting than that one.', words: [{ id: 'u25-interesny', ru: 'интере́снее', en: 'interesting' }, { id: 'u25-chem', ru: 'чем', en: 'than' }] },
    { ru: 'Он лу́чше меня́ игра́ет.', translit: 'on luchshe menya igrayet', en: 'He plays better than me.', words: [{ id: 'u25-luchshe', ru: 'лу́чше', en: 'better' }] },
    { ru: 'Сего́дня пого́да ху́же, чем вчера́.', translit: 'segodnya pogoda khuzhe chem vchera', en: 'Today the weather is worse than yesterday.', words: [{ id: 'u25-huzhe', ru: 'ху́же', en: 'worse' }] },
    { ru: 'Э́то са́мый краси́вый го́род.', translit: 'eta samy krasivy gorod', en: 'This is the most beautiful city.', words: [{ id: 'u25-samyy', ru: 'са́мый', en: 'the most' }] }
  ],
  dialogue: {
    title: 'Како́й го́род лу́чше? (Which city is better?)',
    lines: [
      { who: 'Том', ru: 'Москва́ бо́льше, чем Петербу́рг?', en: 'Is Moscow bigger than Petersburg?' },
      { who: 'Мария', ru: 'Да, но Петербу́рг краси́вее.', en: 'Yes, but Petersburg is more beautiful.' },
      { who: 'Том', ru: 'А кли́мат?', en: 'And the climate?' },
      { who: 'Мария', ru: 'В Москве́ зима́ ху́же, чем в Петербу́рге.', en: 'In Moscow the winter is worse than in Petersburg.' },
      { who: 'Том', ru: 'Како́й го́род са́мый краси́вый в Росси́и?', en: 'Which city is the most beautiful in Russia?' },
      { who: 'Мария', ru: 'Говоря́т, что са́мый краси́вый — Петербу́рг.', en: 'They say the most beautiful is Petersburg.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Како́й го́род бо́льше?', options: ['Москва́', 'Петербу́рг', 'одина́ковые', 'Каза́нь'], answer: 'Москва́' },
      { type: 'mc-ru', q: 'Где зима́ ху́же?', options: ['в Москве́', 'в Петербу́рге', 'одина́ково', 'на ю́ге'], answer: 'в Москве́' },
      { type: 'mc-ru', q: 'Како́й го́род са́мый краси́вый?', options: ['Петербу́рг', 'Москва́', 'Каза́нь', 'Со́чи'], answer: 'Петербу́рг' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «лу́чше»?', options: ['better', 'worse', 'more', 'less'], answer: 'better', ru: 'лу́чше' },
    { type: 'mc-en', q: 'Что зна́чит «ху́же»?', options: ['worse', 'better', 'more', 'less'], answer: 'worse', ru: 'ху́же' },
    { type: 'mc-ru', q: 'Comparative of «бы́стрый»', options: ['быстре́е', 'ме́дленнее', 'бы́стро', 'бы́стрый'], answer: 'быстре́е', ru: 'быстре́е' },
    { type: 'mc-ru', q: 'Comparative of «хоро́ший»', options: ['лу́чше', 'хороше́е', 'бо́льше', 'ху́же'], answer: 'лу́чше', ru: 'лу́чше' },
    { type: 'typing', q: 'Type “than” in Russian', answer: 'чем', accepts: [], ru: 'чем' },
    { type: 'typing', q: 'Type “the most” in Russian', answer: 'самый', accepts: ['са́мый'], ru: 'са́мый' },
    { type: 'mc-en', q: 'Что зна́чит «бо́льше»?', options: ['bigger / more', 'smaller', 'better', 'worse'], answer: 'bigger / more', ru: 'бо́льше' },
    { type: 'mc-ru', q: '“heavy / hard” in Russian', options: ['тяжёлый', 'лёгкий', 'высо́кий', 'ни́зкий'], answer: 'тяжёлый', ru: 'тяжёлый' },
    { type: 'mc-en', q: 'Что зна́чит «одина́ковый»?', options: ['the same / identical', 'different', 'similar', 'equal in size'], answer: 'the same / identical', ru: 'одина́ковый' },
    { type: 'mc-ru', q: 'Complete: Он ___ меня́ (better).', options: ['лу́чше', 'ху́же', 'бо́льше', 'ме́ньше'], answer: 'лу́чше', ru: 'лу́чше меня́' },
    { type: 'typing', q: 'Type “to compare” in Russian', answer: 'сравнивать', accepts: ['сравни́вать'], ru: 'сравни́вать' },
    { type: 'mc-en', q: 'Что зна́чит «ме́ньше»?', options: ['smaller / less', 'bigger', 'better', 'worse'], answer: 'smaller / less', ru: 'ме́ньше' }
  ],
  test: {
    title: 'Unit 25 test — Comparing things',
    questions: [
      { type: 'mc-ru', q: 'Comparative of «плохо́й»', options: ['ху́же', 'пло́ше', 'лу́чше', 'ме́ньше'], answer: 'ху́же', ru: 'ху́же' },
      { type: 'mc-en', q: 'Что зна́чит «са́мый»?', options: ['the most', 'so', 'such', 'very'], answer: 'the most', ru: 'са́мый' },
      { type: 'typing', q: 'Type “better” in Russian', answer: 'лучше', accepts: ['лу́чше'], ru: 'лу́чше' },
      { type: 'typing', q: 'Type “worse” in Russian', answer: 'хуже', accepts: ['ху́же'], ru: 'ху́же' },
      { type: 'mc-ru', q: '“fast / quick” in Russian', options: ['бы́стрый', 'ме́дленный', 'высо́кий', 'лёгкий'], answer: 'бы́стрый', ru: 'бы́стрый' },
      { type: 'mc-en', q: 'Что зна́чит «лёгкий»?', options: ['light / easy', 'heavy', 'hard', 'soft'], answer: 'light / easy', ru: 'лёгкий' },
      { type: 'mc-ru', q: 'Complete: Она́ ___ его́ (better).', options: ['лу́чше', 'ху́же', 'бо́льше', 'са́мая'], answer: 'лу́чше', ru: 'лу́чше его́' },
      { type: 'typing', q: 'Type “interesting” in Russian', answer: 'интересный', accepts: ['интере́сный'], ru: 'интере́сный' },
      { type: 'mc-en', q: 'Что зна́чит «высо́кий»?', options: ['tall / high', 'low', 'wide', 'deep'], answer: 'tall / high', ru: 'высо́кий' },
      { type: 'mc-ru', q: '“slow” in Russian', options: ['ме́дленный', 'бы́стрый', 'ни́зкий', 'тяжёлый'], answer: 'ме́дленный', ru: 'ме́дленный' },
      { type: 'typing', q: 'Type “the same” in Russian', answer: 'одинаковый', accepts: ['одина́ковый'], ru: 'одина́ковый' },
      { type: 'mc-en', q: 'Что зна́чит «чем»?', options: ['than', 'as', 'what', 'that'], answer: 'than', ru: 'чем' }
    ]
  }
};
