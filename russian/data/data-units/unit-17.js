// Unit 17 — Travel and hotels. A2.
export const unit = {
  id: 'u17',
  level: 'A2',
  number: 17,
  title: 'Travel and hotels',
  titleRu: 'Путеше́ствие',
  story: 'Airport, passport, hotel, key. This unit gives you the words and phrases for a trip abroad: booking a room, checking in, and talking about where you are from and where you are going.',
  grammar: [
    {
      topic: 'Countries, where and where from',
      explanation: 'Where you are uses в + prepositional (в Росси́и). Where you are going uses в + accusative (в Росси́ю). Where you are from uses из + genitive (из Аме́рики).',
      table: [
        ['Country', 'In (where?)', 'To (where to?)', 'From'],
        ['Росси́я', 'в Росси́и', 'в Росси́ю', 'из Росси́и'],
        ['Аме́рика', 'в Аме́рике', 'в Аме́рику', 'из Аме́рики'],
        ['А́нглия', 'в А́нглии', 'в А́нглию', 'из А́нглии']
      ],
      examples: [
        { ru: 'Я из Аме́рики, а сейча́с я в Росси́и.', trans: 'ya iz Ameriki, a seychas ya v Rossii', en: 'I am from America, and now I am in Russia.' }
      ]
    },
    {
      topic: 'At the hotel',
      explanation: 'These phrases cover check-in and the room. У меня́ есть бронь means \"I have a booking\".',
      table: [
        ['Russian', 'English'],
        ['У меня́ есть бронь.', 'I have a booking.'],
        ['Мне ну́жен но́мер.', 'I need a room.'],
        ['Вот мой па́спорт.', 'Here is my passport.'],
        ['Где ключ?', 'Where is the key?'],
        ['Во ско́лько за́втрак?', 'What time is breakfast?']
      ],
      examples: [
        { ru: 'У меня́ есть бронь на две но́чи.', trans: 'u menya yest bron na dve nochi', en: 'I have a booking for two nights.' }
      ]
    },
    {
      topic: 'Nationalities',
      explanation: 'Nationalities are nouns and come in male/female pairs. Pay attention: \"he is English\" is different from \"she is English\".',
      table: [
        ['Country', 'He', 'She'],
        ['А́нглия', 'англича́нин', 'англича́нка'],
        ['Аме́рика', 'америка́нец', 'америка́нка'],
        ['Росси́я', 'ро́ссиянин / ру́сский', 'ру́сская']
      ],
      examples: [
        { ru: 'Он англича́нин, а она́ ру́сская.', trans: 'on anglichanin, a ona russkaya', en: 'He is English, and she is Russian.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u17-otel', ru: 'оте́ль', translit: 'otel', en: 'hotel', pos: 'noun', gender: 'm' },
    { id: 'u17-nomer', ru: 'но́мер', translit: 'nomer', en: 'room / number', pos: 'noun', gender: 'm' },
    { id: 'u17-bron', ru: 'бронь', translit: 'bron', en: 'booking', pos: 'noun', gender: 'f' },
    { id: 'u17-pasport', ru: 'па́спорт', translit: 'pasport', en: 'passport', pos: 'noun', gender: 'm' },
    { id: 'u17-bagazh', ru: 'бага́ж', translit: 'bagazh', en: 'luggage', pos: 'noun', gender: 'm' },
    { id: 'u17-rejs', ru: 'рейс', translit: 'reys', en: 'flight', pos: 'noun', gender: 'm' },
    { id: 'u17-strana', ru: 'страна́', translit: 'strana', en: 'country', pos: 'noun', gender: 'f' },
    { id: 'u17-rossiya', ru: 'Росси́я', translit: 'Rossiya', en: 'Russia', pos: 'noun', gender: 'f' },
    { id: 'u17-amerika', ru: 'Аме́рика', translit: 'Amerika', en: 'America', pos: 'noun', gender: 'f' },
    { id: 'u17-anglichanin', ru: 'англича́нин', translit: 'anglichanin', en: 'Englishman', pos: 'noun', gender: 'm' },
    { id: 'u17-klyuch', ru: 'ключ', translit: 'klyuch', en: 'key', pos: 'noun', gender: 'm' },
    { id: 'u17-samolet', ru: 'самолёт', translit: 'samolyot', en: 'airplane', pos: 'noun', gender: 'm' },
    { id: 'u17-aeroport', ru: 'аэропо́рт', translit: 'aeroport', en: 'airport', pos: 'noun', gender: 'm' },
    { id: 'u17-viza', ru: 'ви́за', translit: 'viza', en: 'visa', pos: 'noun', gender: 'f' },
    { id: 'u17-puteshestvovat', ru: 'путеше́ствовать', translit: 'puteshestvovat', en: 'to travel', pos: 'verb' },
    { id: 'u17-zhdat', ru: 'ждать', translit: 'zhdat', en: 'to wait', pos: 'verb' },
    { id: 'u17-noch', ru: 'ночь', translit: 'noch', en: 'night', pos: 'noun', gender: 'f' }
  ],
  phrases: [
    { id: 'p-u17-1', ru: 'У меня́ есть бронь.', trans: 'u menya yest bron', en: 'I have a booking.' },
    { id: 'p-u17-2', ru: 'Где мой но́мер?', trans: 'gde moy nomer?', en: 'Where is my room?' }
  ],
  sentences: [
    { ru: 'Я из Аме́рики.', translit: 'ya iz Ameriki', en: 'I am from America.', words: [{ id: 'u17-amerika', ru: 'Аме́рики', en: 'America' }] },
    { ru: 'Сейча́с я в Росси́и.', translit: 'seychas ya v Rossii', en: 'Now I am in Russia.', words: [{ id: 'u17-rossiya', ru: 'Росси́и', en: 'Russia' }] },
    { ru: 'У меня́ есть бронь в оте́ле.', translit: 'u menya yest bron v otele', en: 'I have a booking at the hotel.', words: [{ id: 'u17-bron', ru: 'бронь', en: 'booking' }, { id: 'u17-otel', ru: 'оте́ле', en: 'hotel' }] },
    { ru: 'Вот мой па́спорт и бага́ж.', translit: 'vot moy pasport i bagazh', en: 'Here is my passport and luggage.', words: [{ id: 'u17-pasport', ru: 'па́спорт', en: 'passport' }, { id: 'u17-bagazh', ru: 'бага́ж', en: 'luggage' }] },
    { ru: 'Мы ждём самолёт в аэропорту́.', translit: 'my zhdyom samolyot v aeroportu', en: 'We are waiting for the plane at the airport.', words: [{ id: 'u17-zhdat', ru: 'ждём', en: 'to wait' }, { id: 'u17-samolet', ru: 'самолёт', en: 'airplane' }, { id: 'u17-aeroport', ru: 'аэропорту́', en: 'airport' }] }
  ],
  dialogue: {
    title: 'В оте́ле (At the hotel)',
    lines: [
      { who: 'Администра́тор', ru: 'До́брый ве́чер! Чем могу́ помо́чь?', en: 'Good evening! How can I help?' },
      { who: 'Том', ru: 'У меня́ есть бронь. Моя́ фами́лия Смит.', en: 'I have a booking. My surname is Smith.' },
      { who: 'Администра́тор', ru: 'Ваш па́спорт, пожа́луйста. Номер триста два.', en: 'Your passport, please. Room three hundred two.' },
      { who: 'Том', ru: 'Спаси́бо. Где ключ и во ско́лько за́втрак?', en: 'Thank you. Where is the key and what time is breakfast?' },
      { who: 'Администра́тор', ru: 'Вот ключ. За́втрак в во́семь утра́.', en: 'Here is the key. Breakfast is at eight in the morning.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Как фами́лия го́стя?', options: ['Смит', 'Ивано́в', 'Бра́ун', 'Джонс'], answer: 'Смит' },
      { type: 'mc-ru', q: 'Како́й у него́ но́мер?', options: ['триста два', 'триста', 'два́дцать', 'двести'], answer: 'триста два' },
      { type: 'mc-ru', q: 'Во ско́лько за́втрак?', options: ['в во́семь', 'в се́мь', 'в де́вять', 'в де́сять'], answer: 'в во́семь' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «оте́ль»?', options: ['hotel', 'airport', 'room', 'key'], answer: 'hotel', ru: 'оте́ль' },
    { type: 'mc-en', q: 'Что зна́чит «па́спорт»?', options: ['passport', 'booking', 'luggage', 'visa'], answer: 'passport', ru: 'па́спорт' },
    { type: 'mc-ru', q: 'How do you say “key”?', options: ['ключ', 'бронь', 'но́мер', 'рейс'], answer: 'ключ', ru: 'ключ' },
    { type: 'mc-ru', q: '“airport” in Russian', options: ['аэропо́рт', 'оте́ль', 'вокза́л', 'рейс'], answer: 'аэропо́рт', ru: 'аэропо́рт' },
    { type: 'typing', q: 'Type “country” in Russian', answer: 'страна', accepts: ['страна́'], ru: 'страна́' },
    { type: 'typing', q: 'Type “night” in Russian', answer: 'ночь', accepts: [], ru: 'ночь' },
    { type: 'mc-en', q: 'Что зна́чит «бага́ж»?', options: ['luggage', 'passport', 'ticket', 'visa'], answer: 'luggage', ru: 'бага́ж' },
    { type: 'mc-ru', q: '“to travel” in Russian', options: ['путеше́ствовать', 'ждать', 'лете́ть', 'е́хать'], answer: 'путеше́ствовать', ru: 'путеше́ствовать' },
    { type: 'mc-en', q: 'Что зна́чит «бронь»?', options: ['booking', 'passport', 'luggage', 'key'], answer: 'booking', ru: 'бронь' },
    { type: 'mc-ru', q: 'Where are you from?', options: ['Отку́да ты?', 'Куда́ ты?', 'Где ты?', 'Кто ты?'], answer: 'Отку́да ты?', ru: 'Отку́да ты' },
    { type: 'typing', q: 'Type “flight” in Russian', answer: 'рейс', accepts: [], ru: 'рейс' },
    { type: 'mc-en', q: 'Что зна́чит «ви́за»?', options: ['visa', 'passport', 'booking', 'ticket'], answer: 'visa', ru: 'ви́за' }
  ],
  test: {
    title: 'Unit 17 test — Travel and hotels',
    questions: [
      { type: 'mc-ru', q: '“room” in Russian', options: ['но́мер', 'ключ', 'оте́ль', 'рейс'], answer: 'но́мер', ru: 'но́мер' },
      { type: 'mc-en', q: 'Что зна́чит «ждать»?', options: ['to wait', 'to travel', 'to fly', 'to leave'], answer: 'to wait', ru: 'ждать' },
      { type: 'typing', q: 'Type “hotel” in Russian', answer: 'отель', accepts: ['оте́ль'], ru: 'оте́ль' },
      { type: 'typing', q: 'Type “luggage” in Russian', answer: 'багаж', accepts: ['бага́ж'], ru: 'бага́ж' },
      { type: 'mc-ru', q: '“Russia” in Russian', options: ['Росси́я', 'Аме́рика', 'А́нглия', 'Евро́па'], answer: 'Росси́я', ru: 'Росси́я' },
      { type: 'mc-en', q: 'Что зна́чит «самолёт»?', options: ['airplane', 'airport', 'train', 'bus'], answer: 'airplane', ru: 'самолёт' },
      { type: 'mc-ru', q: 'Complete: Сейча́с я ___ Росси́и.', options: ['в', 'на', 'из', 'к'], answer: 'в', ru: 'в Росси́и' },
      { type: 'typing', q: 'Type “passport” in Russian', answer: 'паспорт', accepts: ['па́спорт'], ru: 'па́спорт' },
      { type: 'mc-en', q: 'Что зна́чит «англича́нин»?', options: ['Englishman', 'American', 'Russian', 'German'], answer: 'Englishman', ru: 'англича́нин' },
      { type: 'mc-ru', q: '“key” in Russian', options: ['ключ', 'бронь', 'но́мер', 'ви́за'], answer: 'ключ', ru: 'ключ' },
      { type: 'typing', q: 'Type “visa” in Russian', answer: 'виза', accepts: ['ви́за'], ru: 'ви́за' },
      { type: 'mc-en', q: 'Что зна́чит «аэропо́рт»?', options: ['airport', 'airplane', 'hotel', 'flight'], answer: 'airport', ru: 'аэропо́рт' }
    ]
  }
};
