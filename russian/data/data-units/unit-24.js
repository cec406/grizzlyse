// Unit 24 — Verbs of motion. B1.
export const unit = {
  id: 'u24',
  level: 'B1',
  number: 24,
  title: 'Verbs of motion',
  titleRu: 'Глаго́лы движе́ния',
  story: 'Russian splits every verb of going into two: one direction (идти́, е́хать) and many directions (ходи́ть, е́здить). Once you feel this distinction, getting around becomes natural.',
  grammar: [
    {
      topic: 'One direction vs many',
      explanation: 'Unidirectional verbs describe a single trip happening now. Multidirectional verbs describe repeated trips, or general ability, or a round trip with a return.',
      table: [
        ['On foot', 'One way', 'Repeated / general'],
        ['', 'идти́', 'ходи́ть'],
        ['By vehicle', 'е́хать', 'е́здить'],
        ['By air', 'лете́ть', 'лета́ть'],
        ['In water', 'плыть', 'пла́вать']
      ],
      examples: [
        { ru: 'Сейча́с я иду́ домо́й.', trans: 'seychas ya idu domoy', en: 'Right now I am walking home.' },
        { ru: 'Я ча́сто хожу́ в кино́.', trans: 'ya chasto khozhku v kino', en: 'I often go to the cinema.' }
      ]
    },
    {
      topic: 'Here, there, home',
      explanation: 'Direction words pair with movement: сюда́ (here, to here), туда́ (there), домо́й (homewards), наза́д (back).',
      table: [
        ['Russian', 'English'],
        ['иди́ сюда́', 'come here'],
        ['иди́ туда́', 'go there'],
        ['я иду́ домо́й', 'I am going home'],
        ['он е́дет наза́д', 'he is going back']
      ],
      examples: [
        { ru: 'Иди́ сюда́!', trans: 'idi syuda!', en: 'Come here!' }
      ]
    },
    {
      topic: 'Prefixes that change the trip',
      explanation: 'Prefixes add direction and often make the verb perfective: при- (arrive), у- (leave), по- (set off), вы- (exit).',
      table: [
        ['Verb', 'Meaning'],
        ['прие́хать', 'to arrive (by vehicle)'],
        ['уе́хать', 'to leave (by vehicle)'],
        ['пое́хать', 'to set off (by vehicle)'],
        ['пойти́', 'to set off (on foot)'],
        ['привезти́', 'to bring (by vehicle)']
      ],
      examples: [
        { ru: 'Он прие́хал из Росси́и вчера́.', trans: 'on priyekhal iz Rossii vchera', en: 'He arrived from Russia yesterday.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u24-idti', ru: 'идти́', translit: 'idti', en: 'to go (on foot, one way)', pos: 'verb' },
    { id: 'u24-hodit', ru: 'ходи́ть', translit: 'khodit', en: 'to go (on foot, repeatedly)', pos: 'verb' },
    { id: 'u24-ehat', ru: 'е́хать', translit: 'yekhat', en: 'to go (by vehicle, one way)', pos: 'verb' },
    { id: 'u24-ezdit', ru: 'е́здить', translit: 'yezdit', en: 'to go (by vehicle, repeatedly)', pos: 'verb' },
    { id: 'u24-letet', ru: 'лете́ть', translit: 'letet', en: 'to fly (one way)', pos: 'verb' },
    { id: 'u24-letat', ru: 'лета́ть', translit: 'letat', en: 'to fly (repeatedly)', pos: 'verb' },
    { id: 'u24-plyt', ru: 'плыть', translit: 'plyt', en: 'to swim / sail (one way)', pos: 'verb' },
    { id: 'u24-plavat', ru: 'пла́вать', translit: 'plavat', en: 'to swim (repeatedly)', pos: 'verb' },
    { id: 'u24-nesti', ru: 'нести́', translit: 'nesti', en: 'to carry (on foot)', pos: 'verb' },
    { id: 'u24-vozit', ru: 'вози́ть', translit: 'vozit', en: 'to transport', pos: 'verb' },
    { id: 'u24-privezti', ru: 'привезти́', translit: 'privezti', en: 'to bring (by vehicle)', pos: 'verb' },
    { id: 'u24-priehat', ru: 'прие́хать', translit: 'priyekhat', en: 'to arrive (by vehicle)', pos: 'verb' },
    { id: 'u24-poekhat', ru: 'пое́хать', translit: 'poyekhat', en: 'to set off (by vehicle)', pos: 'verb' },
    { id: 'u24-poyti', ru: 'пойти́', translit: 'poyti', en: 'to set off (on foot)', pos: 'verb' },
    { id: 'u24-tuda', ru: 'туда́', translit: 'tuda', en: 'there (to there)', pos: 'adverb' },
    { id: 'u24-syuda', ru: 'сюда́', translit: 'syuda', en: 'here (to here)', pos: 'adverb' },
    { id: 'u24-domoy', ru: 'домо́й', translit: 'domoy', en: 'homewards', pos: 'adverb' },
    { id: 'u24-nazad', ru: 'наза́д', translit: 'nazad', en: 'back', pos: 'adverb' }
  ],
  phrases: [
    { id: 'p-u24-1', ru: 'Иди́ сюда́!', trans: 'idi syuda!', en: 'Come here!' },
    { id: 'p-u24-2', ru: 'Я иду́ домо́й.', trans: 'ya idu domoy', en: 'I am going home.' }
  ],
  sentences: [
    { ru: 'Я иду́ домо́й.', translit: 'ya idu domoy', en: 'I am going home.', words: [{ id: 'u24-idti', ru: 'иду́', en: 'to go' }, { id: 'u24-domoy', ru: 'домо́й', en: 'homewards' }] },
    { ru: 'Мы ча́сто хо́дим в кино́.', translit: 'my chasto khodim v kino', en: 'We often go to the cinema.', words: [{ id: 'u24-hodit', ru: 'хо́дим', en: 'to go repeatedly' }] },
    { ru: 'За́втра я е́ду в Москву́.', translit: 'zavtra ya yedu v Moskvu', en: 'Tomorrow I am going to Moscow.', words: [{ id: 'u24-ehat', ru: 'е́ду', en: 'to go by vehicle' }] },
    { ru: 'Он прие́хал из Росси́и.', translit: 'on priyekhal iz Rossii', en: 'He arrived from Russia.', words: [{ id: 'u24-priehat', ru: 'прие́хал', en: 'to arrive' }] },
    { ru: 'Пти́цы летя́т на юг.', translit: 'ptitsy letyat na yug', en: 'The birds are flying south.', words: [{ id: 'u24-letet', ru: 'летя́т', en: 'to fly' }] }
  ],
  dialogue: {
    title: 'Куда́ идти́? (Where to go?)',
    lines: [
      { who: 'Том', ru: 'Скажи́, как дое́хать до це́нтра?', en: 'Tell me, how do I get to the centre?' },
      { who: 'Мария', ru: 'Иди́ сюда́, я покажу́. Туда́ идёт авто́бус.', en: 'Come here, I will show you. A bus goes there.' },
      { who: 'Том', ru: 'А ты ча́сто е́здишь в центр?', en: 'And do you often go to the centre?' },
      { who: 'Мария', ru: 'Да, я хожу́ туда́ почти́ ка́ждый день.', en: 'Yes, I go there almost every day.' },
      { who: 'Том', ru: 'Спаси́бо! Ве́чером я пое́ду домо́й на авто́бусе.', en: 'Thank you! In the evening I will go home by bus.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Куда́ хо́чет Том?', options: ['в центр', 'домо́й', 'в кино́', 'на рабо́ту'], answer: 'в центр' },
      { type: 'mc-ru', q: 'Как ча́сто Мари́я хо́дит в центр?', options: ['почти́ ка́ждый день', 'ра́з в неде́лю', 'ре́дко', 'никогда́'], answer: 'почти́ ка́ждый день' },
      { type: 'mc-ru', q: 'На чём Том пое́дет домо́й?', options: ['на авто́бусе', 'на маши́не', 'на метро́', 'пешко́м'], answer: 'на авто́бусе' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «идти́»?', options: ['to go on foot (one way)', 'to go repeatedly', 'to drive', 'to fly'], answer: 'to go on foot (one way)', ru: 'идти́' },
    { type: 'mc-en', q: 'Что зна́чит «е́здить»?', options: ['to go by vehicle (repeatedly)', 'to go one way', 'to walk', 'to swim'], answer: 'to go by vehicle (repeatedly)', ru: 'е́здить' },
    { type: 'mc-ru', q: 'Repeated on foot', options: ['ходи́ть', 'идти́', 'е́хать', 'е́здить'], answer: 'ходи́ть', ru: 'ходи́ть' },
    { type: 'mc-ru', q: 'One-way by vehicle', options: ['е́хать', 'е́здить', 'идти́', 'ходи́ть'], answer: 'е́хать', ru: 'е́хать' },
    { type: 'typing', q: 'Type “homewards” in Russian', answer: 'домой', accepts: ['домо́й'], ru: 'домо́й' },
    { type: 'typing', q: 'Type “here (to here)” in Russian', answer: 'сюда', accepts: ['сюда́'], ru: 'сюда́' },
    { type: 'mc-en', q: 'Что зна́чит «прие́хать»?', options: ['to arrive (by vehicle)', 'to leave', 'to set off', 'to fly'], answer: 'to arrive (by vehicle)', ru: 'прие́хать' },
    { type: 'mc-ru', q: '“there (to there)” in Russian', options: ['туда́', 'сюда́', 'домо́й', 'наза́д'], answer: 'туда́', ru: 'туда́' },
    { type: 'mc-en', q: 'Что зна́чит «лете́ть»?', options: ['to fly (one way)', 'to fly repeatedly', 'to swim', 'to carry'], answer: 'to fly (one way)', ru: 'лете́ть' },
    { type: 'mc-ru', q: 'Complete: Я ___ в кино́ ка́ждый день.', options: ['хожу́', 'иду́', 'е́ду', 'лечу́'], answer: 'хожу́', ru: 'хожу́' },
    { type: 'typing', q: 'Type “to carry (on foot)” in Russian', answer: 'нести', accepts: ['нести́'], ru: 'нести́' },
    { type: 'mc-en', q: 'Что зна́чит «наза́д»?', options: ['back', 'forward', 'here', 'there'], answer: 'back', ru: 'наза́д' }
  ],
  test: {
    title: 'Unit 24 test — Verbs of motion',
    questions: [
      { type: 'mc-ru', q: 'One-way on foot', options: ['идти́', 'ходи́ть', 'е́хать', 'е́здить'], answer: 'идти́', ru: 'идти́' },
      { type: 'mc-en', q: 'Что зна́чит «е́хать»?', options: ['to go by vehicle (one way)', 'to go repeatedly', 'to walk', 'to fly'], answer: 'to go by vehicle (one way)', ru: 'е́хать' },
      { type: 'typing', q: 'Type “to go on foot (repeatedly)” in Russian', answer: 'ходить', accepts: ['ходи́ть'], ru: 'ходи́ть' },
      { type: 'typing', q: 'Type “to be going by vehicle (one way)” in Russian', answer: 'ехать', accepts: ['е́хать'], ru: 'е́хать' },
      { type: 'mc-ru', q: '“to set off (by vehicle)” in Russian', options: ['пое́хать', 'пойти́', 'прие́хать', 'уе́хать'], answer: 'пое́хать', ru: 'пое́хать' },
      { type: 'mc-en', q: 'Что зна́чит «плыть»?', options: ['to swim / sail (one way)', 'to swim repeatedly', 'to fly', 'to walk'], answer: 'to swim / sail (one way)', ru: 'плыть' },
      { type: 'mc-ru', q: 'Complete: Он ___ из Росси́и.', options: ['прие́хал', 'пое́хал', 'е́здил', 'иду́'], answer: 'прие́хал', ru: 'прие́хал' },
      { type: 'typing', q: 'Type “there (to there)” in Russian', answer: 'туда', accepts: ['туда́'], ru: 'туда́' },
      { type: 'mc-en', q: 'Что зна́чит «вози́ть»?', options: ['to transport', 'to carry on foot', 'to bring', 'to drive'], answer: 'to transport', ru: 'вози́ть' },
      { type: 'mc-ru', q: '“to fly (repeatedly)” in Russian', options: ['лета́ть', 'лете́ть', 'пла́вать', 'е́здить'], answer: 'лета́ть', ru: 'лета́ть' },
      { type: 'typing', q: 'Type “back” in Russian', answer: 'назад', accepts: ['наза́д'], ru: 'наза́д' },
      { type: 'mc-en', q: 'Что зна́чит «привезти́»?', options: ['to bring (by vehicle)', 'to take away', 'to carry', 'to send'], answer: 'to bring (by vehicle)', ru: 'привезти́' }
    ]
  }
};
