// Unit 21 — Hobbies and free time. A2.
export const unit = {
  id: 'u21',
  level: 'A2',
  number: 21,
  title: 'Hobbies and free time',
  titleRu: 'Хо́бби и досу́г',
  story: 'What do you do for fun? Russian has three handy patterns here: люби́ть + infinitive, игра́ть в (sports) or на (instruments), and увлека́ться + instrumental for your interests.',
  grammar: [
    {
      topic: 'люби́ть + infinitive',
      explanation: 'The simplest way to express a hobby. люби́ть means to love or like doing something. Its forms: люблю́, лю́бишь, лю́бит, лю́бим, лю́бите, лю́бят.',
      table: [
        ['Russian', 'English'],
        ['Я люблю́ чита́ть.', 'I like to read.'],
        ['Он лю́бит рисова́ть.', 'He likes to draw.'],
        ['Мы лю́бим путеше́ствовать.', 'We like to travel.'],
        ['Она́ лю́бит петь и танцева́ть.', 'She likes to sing and dance.']
      ],
      examples: [
        { ru: 'Я люблю́ слу́шать му́зыку.', trans: 'ya lyublyu slushat muzyku', en: 'I like listening to music.' }
      ]
    },
    {
      topic: 'игра́ть в / игра́ть на',
      explanation: 'For sports and games use игра́ть в + accusative. For musical instruments use игра́ть на + prepositional.',
      table: [
        ['Sport / game', 'Russian', 'Instrument', 'Russian'],
        ['football', 'игра́ть в футбо́л', 'guitar', 'игра́ть на гита́ре'],
        ['tennis', 'игра́ть в те́ннис', 'piano', 'игра́ть на пиани́но'],
        ['chess', 'игра́ть в ша́хматы', 'violin', 'игра́ть на скри́пке']
      ],
      examples: [
        { ru: 'Он игра́ет в футбо́л, а она́ — на гита́ре.', trans: 'on igrayet v futbol, a ona na gitare', en: 'He plays football, and she plays the guitar.' }
      ]
    },
    {
      topic: 'увлека́ться + instrumental',
      explanation: 'увлека́ться means to be interested in or into something, and takes the instrumental: увлека́ться фотогра́фией, спо́ртом, му́зыкой.',
      table: [
        ['Russian', 'English'],
        ['Я увлека́юсь фотогра́фией.', 'I am into photography.'],
        ['Он увлека́ется спо́ртом.', 'He is into sport.'],
        ['Она́ увлека́ется му́зыкой.', 'She is into music.'],
        ['Чем ты увлека́ешься?', 'What are you into?']
      ],
      examples: [
        { ru: 'Чем ты увлека́ешься? — Му́зыкой и рыба́лкой.', trans: 'chem ty uvlekayeshsya? muzykoy i rybalkoy', en: 'What are you into? — Music and fishing.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u21-hobbi', ru: 'хо́бби', translit: 'khobbi', en: 'hobby', pos: 'noun', gender: 'n' },
    { id: 'u21-sport', ru: 'спорт', translit: 'sport', en: 'sport', pos: 'noun', gender: 'm' },
    { id: 'u21-futbol', ru: 'футбо́л', translit: 'futbol', en: 'football', pos: 'noun', gender: 'm' },
    { id: 'u21-muzyka', ru: 'му́зыка', translit: 'muzyka', en: 'music', pos: 'noun', gender: 'f' },
    { id: 'u21-kniga', ru: 'кни́га', translit: 'kniga', en: 'book', pos: 'noun', gender: 'f' },
    { id: 'u21-rybalka', ru: 'рыба́лка', translit: 'rybalka', en: 'fishing', pos: 'noun', gender: 'f' },
    { id: 'u21-fotografiya', ru: 'фотогра́фия', translit: 'fotografiya', en: 'photography', pos: 'noun', gender: 'f' },
    { id: 'u21-kompyuter', ru: 'компью́тер', translit: 'kompyuter', en: 'computer', pos: 'noun', gender: 'm' },
    { id: 'u21-vremya', ru: 'вре́мя', translit: 'vremya', en: 'time', pos: 'noun', gender: 'n' },
    { id: 'u21-risovat', ru: 'рисова́ть', translit: 'risovat', en: 'to draw', pos: 'verb' },
    { id: 'u21-pet', ru: 'петь', translit: 'pet', en: 'to sing', pos: 'verb' },
    { id: 'u21-tantsevat', ru: 'танцева́ть', translit: 'tantsevat', en: 'to dance', pos: 'verb' },
    { id: 'u21-igrat', ru: 'игра́ть', translit: 'igrat', en: 'to play', pos: 'verb' },
    { id: 'u21-gulyat', ru: 'гуля́ть', translit: 'gulyat', en: 'to stroll', pos: 'verb' },
    { id: 'u21-lyubit', ru: 'люби́ть', translit: 'lyubit', en: 'to love / like', pos: 'verb' },
    { id: 'u21-uvlekat', ru: 'увлека́ться', translit: 'uvlekat·sya', en: 'to be into', pos: 'verb' },
    { id: 'u21-plavat', ru: 'пла́вать', translit: 'plavat', en: 'to swim', pos: 'verb' },
    { id: 'u21-svobodno', ru: 'свобо́дно', translit: 'svobodno', en: 'freely / free', pos: 'adverb' }
  ],
  phrases: [
    { id: 'p-u21-1', ru: 'Чем ты увлека́ешься?', trans: 'chem ty uvlekayeshsya?', en: 'What are you into?' },
    { id: 'p-u21-2', ru: 'В свобо́дное вре́мя…', trans: 'v svobodnoye vremya…', en: 'In my free time…' }
  ],
  sentences: [
    { ru: 'Я люблю́ чита́ть и рисова́ть.', translit: 'ya lyublyu chitat i risovat', en: 'I like to read and draw.', words: [{ id: 'u21-lyubit', ru: 'люблю́', en: 'to love / like' }, { id: 'u21-risovat', ru: 'рисова́ть', en: 'to draw' }] },
    { ru: 'Он игра́ет в футбо́л.', translit: 'on igrayet v futbol', en: 'He plays football.', words: [{ id: 'u21-igrat', ru: 'игра́ет', en: 'to play' }, { id: 'u21-futbol', ru: 'футбо́л', en: 'football' }] },
    { ru: 'Она́ увлека́ется фотогра́фией.', translit: 'ona uvlekayetsya fotografiyey', en: 'She is into photography.', words: [{ id: 'u21-uvlekat', ru: 'увлека́ется', en: 'to be into' }, { id: 'u21-fotografiya', ru: 'фотогра́фией', en: 'photography' }] },
    { ru: 'В свобо́дное вре́мя я слу́шаю му́зыку.', translit: 'v svobodnoye vremya ya slushayu muzyku', en: 'In my free time I listen to music.', words: [{ id: 'u21-svobodno', ru: 'свобо́дное', en: 'free' }, { id: 'u21-vremya', ru: 'вре́мя', en: 'time' }, { id: 'u21-muzyka', ru: 'му́зыку', en: 'music' }] },
    { ru: 'Мы танцу́ем и поём вме́сте.', translit: 'my tantsuyem i poyom vmeste', en: 'We dance and sing together.', words: [{ id: 'u21-tantsevat', ru: 'танцу́ем', en: 'to dance' }, { id: 'u21-pet', ru: 'поём', en: 'to sing' }] }
  ],
  dialogue: {
    title: 'Хо́бби (Hobbies)',
    lines: [
      { who: 'Мария', ru: 'Чем ты увлека́ешься в свобо́дное вре́мя?', en: 'What are you into in your free time?' },
      { who: 'Том', ru: 'Я люблю́ чита́ть и игра́ть в футбо́л.', en: 'I like to read and play football.' },
      { who: 'Мария', ru: 'А му́зыку лю́бишь?', en: 'And do you like music?' },
      { who: 'Том', ru: 'Да, о́чень. Я да́же игра́ю на гита́ре.', en: 'Yes, very much. I even play the guitar.' },
      { who: 'Мария', ru: 'Здо́рово! А я увлека́юсь фотогра́фией и рыба́лкой.', en: 'Great! And I am into photography and fishing.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что лю́бит Том?', options: ['чита́ть и футбо́л', 'му́зыку и рыба́лку', 'фотогра́фию', 'петь'], answer: 'чита́ть и футбо́л' },
      { type: 'mc-ru', q: 'На чём игра́ет Том?', options: ['на гита́ре', 'на пиани́но', 'на скри́пке', 'в футбо́л'], answer: 'на гита́ре' },
      { type: 'mc-ru', q: 'Чем увлека́ется Мари́я?', options: ['фотогра́фией и рыба́лкой', 'футбо́лом', 'му́зыкой', 'кни́гами'], answer: 'фотогра́фией и рыба́лкой' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «хо́бби»?', options: ['hobby', 'sport', 'music', 'book'], answer: 'hobby', ru: 'хо́бби' },
    { type: 'mc-en', q: 'Что зна́чит «спорт»?', options: ['sport', 'hobby', 'game', 'music'], answer: 'sport', ru: 'спорт' },
    { type: 'mc-ru', q: 'How do you say “to sing”?', options: ['петь', 'танцева́ть', 'игра́ть', 'рисова́ть'], answer: 'петь', ru: 'петь' },
    { type: 'mc-ru', q: '“to draw” in Russian', options: ['рисова́ть', 'петь', 'чита́ть', 'пла́вать'], answer: 'рисова́ть', ru: 'рисова́ть' },
    { type: 'typing', q: 'Type “music” in Russian', answer: 'музыка', accepts: ['му́зыка'], ru: 'му́зыка' },
    { type: 'typing', q: 'Type “football” in Russian', answer: 'футбол', accepts: ['футбо́л'], ru: 'футбо́л' },
    { type: 'mc-en', q: 'Что зна́чит «рыба́лка»?', options: ['fishing', 'photography', 'hobby', 'swimming'], answer: 'fishing', ru: 'рыба́лка' },
    { type: 'mc-ru', q: 'Complete: Я игра́ю ___ футбо́л.', options: ['в', 'на', 'с', 'без'], answer: 'в', ru: 'игра́ю в футбо́л' },
    { type: 'mc-en', q: 'Что зна́чит «увлека́ться»?', options: ['to be into', 'to play', 'to love', 'to swim'], answer: 'to be into', ru: 'увлека́ться' },
    { type: 'mc-ru', q: 'Complete: Я игра́ю ___ гита́ре.', options: ['на', 'в', 'с', 'без'], answer: 'на', ru: 'игра́ю на гита́ре' },
    { type: 'typing', q: 'Type “photography” in Russian', answer: 'фотография', accepts: ['фотогра́фия'], ru: 'фотогра́фия' },
    { type: 'mc-en', q: 'Что зна́чит «свобо́дно»?', options: ['freely / free', 'busy', 'always', 'never'], answer: 'freely / free', ru: 'свобо́дно' }
  ],
  test: {
    title: 'Unit 21 test — Hobbies and free time',
    questions: [
      { type: 'mc-ru', q: '“to dance” in Russian', options: ['танцева́ть', 'петь', 'игра́ть', 'гуля́ть'], answer: 'танцева́ть', ru: 'танцева́ть' },
      { type: 'mc-en', q: 'Что зна́чит «кни́га»?', options: ['book', 'music', 'hobby', 'computer'], answer: 'book', ru: 'кни́га' },
      { type: 'typing', q: 'Type “to play” in Russian', answer: 'играть', accepts: ['игра́ть'], ru: 'игра́ть' },
      { type: 'typing', q: 'Type “hobby” in Russian', answer: 'хобби', accepts: ['хо́бби'], ru: 'хо́бби' },
      { type: 'mc-ru', q: '“to swim” in Russian', options: ['пла́вать', 'петь', 'чита́ть', 'рисова́ть'], answer: 'пла́вать', ru: 'пла́вать' },
      { type: 'mc-en', q: 'Что зна́чит «люби́ть»?', options: ['to love / like', 'to want', 'to need', 'to know'], answer: 'to love / like', ru: 'люби́ть' },
      { type: 'mc-ru', q: 'Complete: Она́ игра́ет ___ пиани́но.', options: ['на', 'в', 'с', 'у'], answer: 'на', ru: 'на пиани́но' },
      { type: 'typing', q: 'Type “computer” in Russian', answer: 'компьютер', accepts: ['компью́тер'], ru: 'компью́тер' },
      { type: 'mc-en', q: 'Что зна́чит «фотогра́фия»?', options: ['photography', 'fishing', 'music', 'sport'], answer: 'photography', ru: 'фотогра́фия' },
      { type: 'mc-ru', q: '“time” in Russian', options: ['вре́мя', 'спорт', 'хо́бби', 'кни́га'], answer: 'вре́мя', ru: 'вре́мя' },
      { type: 'typing', q: 'Type “to stroll” in Russian', answer: 'гулять', accepts: ['гуля́ть'], ru: 'гуля́ть' },
      { type: 'mc-en', q: 'Что зна́чит «футбо́л»?', options: ['football', 'tennis', 'chess', 'hockey'], answer: 'football', ru: 'футбо́л' }
    ]
  }
};
