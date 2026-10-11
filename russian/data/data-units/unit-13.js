// Unit 13 — Out and about. A2.
export const unit = {
  id: 'u13',
  level: 'A2',
  number: 13,
  title: 'Out and about',
  titleRu: 'В го́роде',
  story: 'A free afternoon in town: a museum, a café, a park, a bridge. This unit consolidates the two cases you meet most — accusative (where to) and prepositional (where) — while you talk about visiting places.',
  grammar: [
    {
      topic: 'Where to? Accusative after в/на',
      explanation: 'For movement towards a place use в/на + accusative. Feminine nouns in -а/-я change to -у/-ю: в шко́лу, в библиоте́ку. Masculine and neuter nouns usually do not change.',
      table: [
        ['Nominative', 'Where to?', 'Meaning'],
        ['музе́й', 'в музе́й', 'to the museum'],
        ['теа́тр', 'в теа́тр', 'to the theatre'],
        ['библиоте́ка', 'в библиоте́ку', 'to the library'],
        ['площа́дь', 'на пло́щадь', 'to the square'],
        ['кафе́', 'в кафе́', 'to the café']
      ],
      examples: [
        { ru: 'Мы идём в музе́й.', trans: 'my idyom v muzey', en: 'We are going to the museum.' },
        { ru: 'Она́ идёт в библиоте́ку.', trans: 'ona idyot v biblioteku', en: 'She is going to the library.' }
      ]
    },
    {
      topic: 'Where? Prepositional after в/на',
      explanation: 'For location use в/на + prepositional: museums, theatres and cafés take -е. Compare «в музе́й» (to) with «в музе́е» (at).',
      table: [
        ['Where to?', 'Where?', 'Meaning'],
        ['в музе́й', 'в музе́е', 'to / at the museum'],
        ['в теа́тр', 'в теа́тре', 'to / at the theatre'],
        ['на пло́щадь', 'на пло́щади', 'to / at the square'],
        ['в парк', 'в па́рке', 'to / at the park']
      ],
      examples: [
        { ru: 'Мы в музе́е.', trans: 'my v muzeye', en: 'We are at the museum.' },
        { ru: 'Он гуля́ет в па́рке.', trans: 'on gulyayet v parke', en: 'He is strolling in the park.' }
      ]
    },
    {
      topic: 'находи́ться — to be located',
      explanation: 'To say where something is, use находи́ться. It is a little bookish but very common in descriptions: Теа́тр нахо́дится в це́нтре.',
      table: [
        ['Russian', 'English'],
        ['Теа́тр нахо́дится в це́нтре.', 'The theatre is in the centre.'],
        ['Где нахо́дится музе́й?', 'Where is the museum located?'],
        ['Ря́дом с па́рком.', 'Next to the park.']
      ],
      examples: [
        { ru: 'Музе́й нахо́дится на пло́щади.', trans: 'muzey nakhoditsya na ploshchadi', en: 'The museum is on the square.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u13-muzey', ru: 'музе́й', translit: 'muzey', en: 'museum', pos: 'noun', gender: 'm' },
    { id: 'u13-teatr', ru: 'теа́тр', translit: 'teatr', en: 'theatre', pos: 'noun', gender: 'm' },
    { id: 'u13-kafe', ru: 'кафе́', translit: 'kafe', en: 'café', pos: 'noun', gender: 'n' },
    { id: 'u13-park', ru: 'парк', translit: 'park', en: 'park', pos: 'noun', gender: 'm' },
    { id: 'u13-centr', ru: 'центр', translit: 'tsentr', en: 'centre / downtown', pos: 'noun', gender: 'm' },
    { id: 'u13-ploshchad', ru: 'пло́щадь', translit: 'ploshchad', en: 'square (public place)', pos: 'noun', gender: 'f' },
    { id: 'u13-ugol', ru: 'у́гол', translit: 'ugol', en: 'corner', pos: 'noun', gender: 'm' },
    { id: 'u13-ulica', ru: 'у́лица', translit: 'ulitsa', en: 'street', pos: 'noun', gender: 'f' },
    { id: 'u13-most', ru: 'мост', translit: 'most', en: 'bridge', pos: 'noun', gender: 'm' },
    { id: 'u13-biblioteka', ru: 'библиоте́ка', translit: 'biblioteka', en: 'library', pos: 'noun', gender: 'f' },
    { id: 'u13-kinoteatr', ru: 'кинотеа́тр', translit: 'kinoteatr', en: 'cinema', pos: 'noun', gender: 'm' },
    { id: 'u13-magazin', ru: 'магази́н', translit: 'magazin', en: 'shop', pos: 'noun', gender: 'm' },
    { id: 'u13-bilet', ru: 'биле́т', translit: 'bilet', en: 'ticket', pos: 'noun', gender: 'm' },
    { id: 'u13-posetit', ru: 'посети́ть', translit: 'posetit', en: 'to visit', pos: 'verb' },
    { id: 'u13-gulyat', ru: 'гуля́ть', translit: 'gulyat', en: 'to stroll / walk', pos: 'verb' },
    { id: 'u13-nahoditsya', ru: 'находи́ться', translit: 'nakhoditsya', en: 'to be located', pos: 'verb' },
    { id: 'u13-ryadom', ru: 'ря́дом', translit: 'ryadom', en: 'nearby / next to', pos: 'adverb' }
  ],
  phrases: [
    { id: 'p-u13-1', ru: 'Где нахо́дится музе́й?', trans: 'gde nakhoditsya muzey?', en: 'Where is the museum?' },
    { id: 'p-u13-2', ru: 'Пойдём в кафе́!', trans: 'poydyom v kafe!', en: 'Let us go to the café!' }
  ],
  sentences: [
    { ru: 'Мы идём в музе́й.', translit: 'my idyom v muzey', en: 'We are going to the museum.', words: [{ id: 'u13-muzey', ru: 'музе́й', en: 'museum' }] },
    { ru: 'Он гуля́ет в па́рке.', translit: 'on gulyayet v parke', en: 'He is strolling in the park.', words: [{ id: 'u13-gulyat', ru: 'гуля́ет', en: 'to stroll' }, { id: 'u13-park', ru: 'па́рке', en: 'park' }] },
    { ru: 'Теа́тр нахо́дится в це́нтре.', translit: 'teatr nakhoditsya v tsentre', en: 'The theatre is in the centre.', words: [{ id: 'u13-teatr', ru: 'Теа́тр', en: 'theatre' }, { id: 'u13-nahoditsya', ru: 'нахо́дится', en: 'to be located' }, { id: 'u13-centr', ru: 'це́нтре', en: 'centre' }] },
    { ru: 'Я купи́л биле́т в кинотеа́тр.', translit: 'ya kupil bilet v kinoteatr', en: 'I bought a ticket to the cinema.', words: [{ id: 'u13-bilet', ru: 'биле́т', en: 'ticket' }, { id: 'u13-kinoteatr', ru: 'кинотеа́тр', en: 'cinema' }] },
    { ru: 'Библиоте́ка ря́дом с па́рком.', translit: 'biblioteka ryadom s parkom', en: 'The library is next to the park.', words: [{ id: 'u13-biblioteka', ru: 'Библиоте́ка', en: 'library' }, { id: 'u13-ryadom', ru: 'ря́дом', en: 'nearby' }] }
  ],
  dialogue: {
    title: 'Свобо́дный день (A free day)',
    lines: [
      { who: 'Том', ru: 'Что мы бу́дем де́лать сего́дня?', en: 'What will we do today?' },
      { who: 'Мария', ru: 'Пойдём в музе́й, пото́м в кафе́.', en: 'Let us go to the museum, then to the café.' },
      { who: 'Том', ru: 'А где музе́й?', en: 'And where is the museum?' },
      { who: 'Мария', ru: 'Он нахо́дится в це́нтре, на пло́щади.', en: 'It is in the centre, on the square.' },
      { who: 'Том', ru: 'Отли́чно, ку́пим биле́ты.', en: 'Great, we will buy tickets.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Куда́ они́ пойду́т?', options: ['в музе́й', 'в теа́тр', 'в парк', 'в библиоте́ку'], answer: 'в музе́й' },
      { type: 'mc-ru', q: 'Где нахо́дится музе́й?', options: ['в це́нтре', 'ря́дом с па́рком', 'на у́лице', 'у моста́'], answer: 'в це́нтре' },
      { type: 'mc-ru', q: 'Что они́ ку́пят?', options: ['биле́ты', 'кни́ги', 'цветы́', 'сувени́ры'], answer: 'биле́ты' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «музе́й»?', options: ['museum', 'theatre', 'library', 'park'], answer: 'museum', ru: 'музе́й' },
    { type: 'mc-en', q: 'Что зна́чит «пло́щадь»?', options: ['square', 'street', 'bridge', 'corner'], answer: 'square', ru: 'пло́щадь' },
    { type: 'mc-ru', q: 'How do you say “library”?', options: ['библиоте́ка', 'магази́н', 'кинотеа́тр', 'теа́тр'], answer: 'библиоте́ка', ru: 'библиоте́ка' },
    { type: 'mc-ru', q: '“bridge” in Russian', options: ['мост', 'у́гол', 'центр', 'парк'], answer: 'мост', ru: 'мост' },
    { type: 'typing', q: 'Type “park” in Russian', answer: 'парк', accepts: [], ru: 'парк' },
    { type: 'typing', q: 'Type “ticket” in Russian', answer: 'билет', accepts: ['биле́т'], ru: 'биле́т' },
    { type: 'mc-en', q: 'Что зна́чит «ря́дом»?', options: ['nearby / next to', 'far', 'left', 'right'], answer: 'nearby / next to', ru: 'ря́дом' },
    { type: 'mc-ru', q: '“to be located” in Russian', options: ['находи́ться', 'гуля́ть', 'посети́ть', 'идти́'], answer: 'находи́ться', ru: 'находи́ться' },
    { type: 'mc-en', q: 'Что зна́чит «центр»?', options: ['centre / downtown', 'square', 'street', 'corner'], answer: 'centre / downtown', ru: 'центр' },
    { type: 'mc-ru', q: 'Complete: Мы идём ___ музе́й.', options: ['в', 'на', 'у', 'из'], answer: 'в', ru: 'в музе́й' },
    { type: 'typing', q: 'Type “theatre” in Russian', answer: 'театр', accepts: ['теа́тр'], ru: 'теа́тр' },
    { type: 'mc-en', q: 'Что зна́чит «кинотеа́тр»?', options: ['cinema', 'theatre', 'museum', 'library'], answer: 'cinema', ru: 'кинотеа́тр' }
  ],
  test: {
    title: 'Unit 13 test — Out and about',
    questions: [
      { type: 'mc-ru', q: '“café” in Russian', options: ['кафе́', 'магази́н', 'мост', 'у́гол'], answer: 'кафе́', ru: 'кафе́' },
      { type: 'mc-en', q: 'Что зна́чит «у́лица»?', options: ['street', 'square', 'bridge', 'park'], answer: 'street', ru: 'у́лица' },
      { type: 'typing', q: 'Type “museum” in Russian', answer: 'музей', accepts: ['музе́й'], ru: 'музе́й' },
      { type: 'typing', q: 'Type “to stroll” in Russian', answer: 'гулять', accepts: ['гуля́ть'], ru: 'гуля́ть' },
      { type: 'mc-ru', q: '“corner” in Russian', options: ['у́гол', 'мост', 'центр', 'у́лица'], answer: 'у́гол', ru: 'у́гол' },
      { type: 'mc-en', q: 'Что зна́чит «посети́ть»?', options: ['to visit', 'to walk', 'to buy', 'to be located'], answer: 'to visit', ru: 'посети́ть' },
      { type: 'mc-ru', q: 'Complete: Мы ___ музе́е.', options: ['в', 'на', 'у', 'к'], answer: 'в', ru: 'в музе́е' },
      { type: 'typing', q: 'Type “square” in Russian', answer: 'площадь', accepts: ['пло́щадь'], ru: 'пло́щадь' },
      { type: 'mc-en', q: 'Что зна́чит «библиоте́ка»?', options: ['library', 'museum', 'shop', 'cinema'], answer: 'library', ru: 'библиоте́ка' },
      { type: 'mc-ru', q: '“shop” in Russian', options: ['магази́н', 'кафе́', 'теа́тр', 'парк'], answer: 'магази́н', ru: 'магази́н' },
      { type: 'typing', q: 'Type “bridge” in Russian', answer: 'мост', accepts: [], ru: 'мост' },
      { type: 'mc-en', q: 'Что зна́чит «находи́ться»?', options: ['to be located', 'to go', 'to visit', 'to stroll'], answer: 'to be located', ru: 'находи́ться' }
    ]
  }
};
