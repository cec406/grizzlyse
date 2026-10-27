// Unit 10 — Weather and seasons. A1.
export const unit = {
  id: 'u10',
  level: 'A1',
  number: 10,
  title: 'Weather and seasons',
  titleRu: 'Пого́да и времена́ го́да',
  story: 'Small talk in Russia very often starts with the weather — and there is plenty of it to talk about. Learn the seasons, the impersonal weather sentences («Хо́лодно», «Идёт дождь») and how adjectives agree with their nouns.',
  grammar: [
    {
      topic: 'Impersonal weather sentences',
      explanation: 'For weather, Russian often uses a single word with no "it": Хо́лодно = "It is cold". Past and future simply add было / бу́дет: Вчера́ бы́ло хо́лодно.',
      table: [
        ['Russian', 'English'],
        ['Сего́дня хо́лодно.', 'It is cold today.'],
        ['Сего́дня жа́рко.', 'It is hot today.'],
        ['Тепло́.', 'It is warm.'],
        ['Вчера́ бы́ло хо́лодно.', 'Yesterday it was cold.']
      ],
      examples: [
        { ru: 'Сего́дня о́чень хо́лодно.', trans: 'segodnya ochen kholodno', en: 'Today it is very cold.' }
      ]
    },
    {
      topic: 'Rain and snow use идёт',
      explanation: 'Russian says "rain goes" and "snow goes": Идёт дождь, Идёт снег. Do not translate "it is raining" word for word.',
      table: [
        ['Russian', 'English'],
        ['Идёт дождь.', 'It is raining.'],
        ['Идёт снег.', 'It is snowing.'],
        ['Ду́ет ве́тер.', 'The wind is blowing.']
      ],
      examples: [
        { ru: 'На у́лице идёт дождь.', trans: 'na ulitse idyot dozhd', en: 'It is raining outside.' }
      ]
    },
    {
      topic: 'Adjectives agree in gender and number',
      explanation: 'An adjective copies the noun: -ый/-ой (m), -ая (f), -ое (n), -ые (plural). Learn the four endings and you can describe almost anything.',
      table: [
        ['', 'm', 'f', 'n', 'plural'],
        ['warm', 'тёплый', 'тёплая', 'тёплое', 'тёплые'],
        ['cold', 'холо́дный', 'холо́дная', 'холо́дное', 'холо́дные'],
        ['good', 'хоро́ший', 'хоро́шая', 'хоро́шее', 'хоро́шие']
      ],
      examples: [
        { ru: 'Сего́дня тёплый день.', trans: 'segodnya tyoply den', en: 'Today is a warm day.' },
        { ru: 'Э́то хоро́шая пого́да.', trans: 'eta khoroshaya pogoda', en: 'This is good weather.' }
      ]
    },
    {
      topic: 'The four seasons and «when»',
      explanation: 'The seasons use the instrumental case as adverbs: зимо́й (in winter), весно́й, ле́том, о́сенью. They answer Когда́?',
      table: [
        ['Season', 'Russian', 'In that season'],
        ['winter', 'зима́', 'зимо́й'],
        ['spring', 'весна́', 'весно́й'],
        ['summer', 'ле́то', 'ле́том'],
        ['autumn', 'о́сень', 'о́сенью']
      ],
      examples: [
        { ru: 'Ле́том жа́рко, а зимо́й хо́лодно.', trans: 'letom zharko, a zimoy kholodno', en: 'In summer it is hot, and in winter it is cold.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u10-pogoda', ru: 'пого́да', translit: 'pogoda', en: 'weather', pos: 'noun', gender: 'f' },
    { id: 'u10-zima', ru: 'зима́', translit: 'zima', en: 'winter', pos: 'noun', gender: 'f' },
    { id: 'u10-vesna', ru: 'весна́', translit: 'vesna', en: 'spring', pos: 'noun', gender: 'f' },
    { id: 'u10-leto', ru: 'ле́то', translit: 'leto', en: 'summer', pos: 'noun', gender: 'n' },
    { id: 'u10-osen', ru: 'о́сень', translit: 'osen', en: 'autumn / fall', pos: 'noun', gender: 'f' },
    { id: 'u10-solntse', ru: 'со́лнце', translit: 'solntse', en: 'sun', pos: 'noun', gender: 'n' },
    { id: 'u10-dozhd', ru: 'дождь', translit: 'dozhd', en: 'rain', pos: 'noun', gender: 'm' },
    { id: 'u10-sneg', ru: 'снег', translit: 'sneg', en: 'snow', pos: 'noun', gender: 'm' },
    { id: 'u10-veter', ru: 'ве́тер', translit: 'veter', en: 'wind', pos: 'noun', gender: 'm' },
    { id: 'u10-teplo', ru: 'тепло́', translit: 'teplo', en: 'warm (it is warm)', pos: 'adverb' },
    { id: 'u10-holodno', ru: 'хо́лодно', translit: 'kholodno', en: 'cold (it is cold)', pos: 'adverb' },
    { id: 'u10-zharko', ru: 'жа́рко', translit: 'zharko', en: 'hot (it is hot)', pos: 'adverb' },
    { id: 'u10-moroz', ru: 'моро́з', translit: 'moroz', en: 'frost', pos: 'noun', gender: 'm' },
    { id: 'u10-gradus', ru: 'гра́дус', translit: 'gradus', en: 'degree', pos: 'noun', gender: 'm' },
    { id: 'u10-oblako', ru: 'о́блако', translit: 'oblako', en: 'cloud', pos: 'noun', gender: 'n' },
    { id: 'u10-solnechno', ru: 'со́лнечно', translit: 'solnechno', en: 'sunny', pos: 'adverb' },
    { id: 'u10-teply', ru: 'тёплый', translit: 'tyoply', en: 'warm (adj.)', pos: 'adjective' },
    { id: 'u10-holodny', ru: 'холо́дный', translit: 'kholodny', en: 'cold (adj.)', pos: 'adjective' },
    { id: 'u10-idet', ru: 'идёт', translit: 'idyot', en: 'goes (rain/snow)', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u10-1', ru: 'Кака́я сего́дня пого́да?', trans: 'kakaya segodnya pogoda?', en: 'What is the weather like today?' },
    { id: 'p-u10-2', ru: 'Хоро́шей пого́ды!', trans: 'khoroshey pogody!', en: 'Have a nice day! (lit. good weather)' }
  ],
  sentences: [
    { ru: 'Кака́я сего́дня пого́да?', translit: 'kakaya segodnya pogoda?', en: 'What is the weather like today?', words: [{ id: 'u10-pogoda', ru: 'пого́да', en: 'weather' }] },
    { ru: 'Сего́дня о́чень хо́лодно.', translit: 'segodnya ochen kholodno', en: 'It is very cold today.', words: [{ id: 'u10-holodno', ru: 'хо́лодно', en: 'cold' }] },
    { ru: 'Ле́том жа́рко, а зимо́й хо́лодно.', translit: 'letom zharko, a zimoy kholodno', en: 'In summer it is hot, and in winter it is cold.', words: [{ id: 'u10-leto', ru: 'Ле́том', en: 'summer' }, { id: 'u10-zharko', ru: 'жа́рко', en: 'hot' }, { id: 'u10-zima', ru: 'зимо́й', en: 'winter' }, { id: 'u10-holodno', ru: 'хо́лодно', en: 'cold' }] },
    { ru: 'Зимо́й идёт снег.', translit: 'zimoy idyot sneg', en: 'In winter it snows.', words: [{ id: 'u10-idet', ru: 'идёт', en: 'goes' }, { id: 'u10-sneg', ru: 'снег', en: 'snow' }] },
    { ru: 'Сейча́с идёт дождь.', translit: 'seychas idyot dozhd', en: 'It is raining now.', words: [{ id: 'u10-idet', ru: 'идёт', en: 'goes' }, { id: 'u10-dozhd', ru: 'дождь', en: 'rain' }] }
  ],
  dialogue: {
    title: 'О пого́де (Small talk about weather)',
    lines: [
      { who: 'Мария', ru: 'Кака́я сего́дня пого́да?', en: 'What is the weather like today?' },
      { who: 'Том', ru: 'Ужа́сно! Идёт дождь и ду́ет ве́тер.', en: 'Terrible! It is raining and the wind is blowing.' },
      { who: 'Мария', ru: 'А вчера́ бы́ло со́лнечно и тепло́.', en: 'And yesterday it was sunny and warm.' },
      { who: 'Том', ru: 'Да. Я люблю́ ле́то. А ты?', en: 'Yes. I love summer. And you?' },
      { who: 'Мария', ru: 'Я люблю́ о́сень. Ле́том сли́шком жа́рко.', en: 'I love autumn. In summer it is too hot.' },
      { who: 'Том', ru: 'А зимо́й?', en: 'And in winter?' },
      { who: 'Мария', ru: 'Зимо́й хо́лодно, но краси́во. Идёт снег!', en: 'In winter it is cold, but beautiful. It snows!' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Кака́я пого́да сего́дня?', options: ['идут дождь и ве́тер', 'со́лнечно', 'идёт снег', 'жа́рко'], answer: 'идут дождь и ве́тер' },
      { type: 'mc-ru', q: 'Како́е вре́мя го́да лю́бит Том?', options: ['ле́то', 'о́сень', 'зиму', 'весну́'], answer: 'ле́то' },
      { type: 'mc-ru', q: 'Почему́ Мари́я лю́бит о́сень?', options: ['ле́том сли́шком жа́рко', 'зимо́й хо́лодно', 'лю́бит снег', 'лю́бит дождь'], answer: 'ле́том сли́шком жа́рко' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «пого́да»?', options: ['weather', 'season', 'rain', 'sun'], answer: 'weather', ru: 'пого́да' },
    { type: 'mc-en', q: 'Что зна́чит «зима́»?', options: ['winter', 'summer', 'autumn', 'spring'], answer: 'winter', ru: 'зима́' },
    { type: 'mc-ru', q: 'How do you say “summer”?', options: ['ле́то', 'зима́', 'весна́', 'о́сень'], answer: 'ле́то', ru: 'ле́то' },
    { type: 'mc-ru', q: '“rain” in Russian', options: ['дождь', 'снег', 'ве́тер', 'со́лнце'], answer: 'дождь', ru: 'дождь' },
    { type: 'typing', q: 'Type “snow” in Russian', answer: 'снег', accepts: [], ru: 'снег' },
    { type: 'typing', q: 'Type “wind” in Russian', answer: 'ветер', accepts: ['ве́тер'], ru: 'ве́тер' },
    { type: 'mc-en', q: 'Что зна́чит «жа́рко»?', options: ['it is hot', 'it is cold', 'it is warm', 'it is windy'], answer: 'it is hot', ru: 'жа́рко' },
    { type: 'mc-ru', q: '“it is cold” in Russian', options: ['хо́лодно', 'жа́рко', 'тепло́', 'со́лнечно'], answer: 'хо́лодно', ru: 'хо́лодно' },
    { type: 'mc-en', q: 'Что зна́чит «о́сень»?', options: ['autumn', 'spring', 'summer', 'winter'], answer: 'autumn', ru: 'о́сень' },
    { type: 'mc-ru', q: 'Complete: ___ идёт дождь.', options: ['На у́лице', 'В у́лице', 'На у́лицу', 'У у́лицы'], answer: 'На у́лице', ru: 'На у́лице идёт дождь' },
    { type: 'typing', q: 'Type “sun” in Russian', answer: 'солнце', accepts: ['со́лнце'], ru: 'со́лнце' },
    { type: 'mc-en', q: 'Что зна́чит «весна́»?', options: ['spring', 'summer', 'autumn', 'winter'], answer: 'spring', ru: 'весна́' }
  ],
  test: {
    title: 'Unit 10 test — Weather and seasons',
    questions: [
      { type: 'mc-ru', q: '“autumn” in Russian', options: ['о́сень', 'весна́', 'зима́', 'ле́то'], answer: 'о́сень', ru: 'о́сень' },
      { type: 'mc-en', q: 'Что зна́чит «снег»?', options: ['snow', 'rain', 'ice', 'wind'], answer: 'snow', ru: 'снег' },
      { type: 'typing', q: 'Type “weather” in Russian', answer: 'погода', accepts: ['пого́да'], ru: 'пого́да' },
      { type: 'typing', q: 'Type “winter” in Russian', answer: 'зима', accepts: ['зима́'], ru: 'зима́' },
      { type: 'mc-ru', q: '“it is warm” in Russian', options: ['тепло́', 'хо́лодно', 'жа́рко', 'со́лнечно'], answer: 'тепло́', ru: 'тепло́' },
      { type: 'mc-en', q: 'Что зна́чит «моро́з»?', options: ['frost', 'rain', 'snow', 'heat'], answer: 'frost', ru: 'моро́з' },
      { type: 'mc-ru', q: 'Complete: Сего́дня ___ день (warm).', options: ['тёплый', 'тёплая', 'тёплое', 'тёплые'], answer: 'тёплый', ru: 'тёплый день' },
      { type: 'typing', q: 'Type “wind” in Russian', answer: 'ветер', accepts: ['ве́тер'], ru: 'ве́тер' },
      { type: 'mc-en', q: 'Что зна́чит «со́лнце»?', options: ['sun', 'cloud', 'sky', 'moon'], answer: 'sun', ru: 'со́лнце' },
      { type: 'mc-ru', q: '“cloud” in Russian', options: ['о́блако', 'со́лнце', 'снег', 'дождь'], answer: 'о́блако', ru: 'о́блако' },
      { type: 'typing', q: 'Type “summer” in Russian', answer: 'лето', accepts: ['ле́то'], ru: 'ле́то' },
      { type: 'mc-en', q: 'Что зна́чит «гра́дус»?', options: ['degree', 'frost', 'weather', 'season'], answer: 'degree', ru: 'гра́дус' }
    ]
  }
};
