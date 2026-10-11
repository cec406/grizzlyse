// Unit 34 — Nature and the environment. B1.
export const unit = {
  id: 'u34',
  level: 'B1',
  number: 34,
  title: 'Nature and the environment',
  titleRu: 'Приро́да и эколо́гия',
  story: 'Forests, rivers, lakes, animals and pollution. This unit gives you the natural world and the language of protecting it, with the very useful construction до́лжен + infinitive.',
  grammar: [
    {
      topic: 'The natural world and its plurals',
      explanation: 'Most neuter nouns in -о take -а in the plural: о́зеро → озёра. A few, like не́бо, are irregular: не́бо → небеса́.',
      table: [
        ['Singular', 'Plural', 'English'],
        ['о́зеро', 'озёра', 'lake'],
        ['мо́ре', 'моря́', 'sea'],
        ['расте́ние', 'расте́ния', 'plant'],
        ['живо́тное', 'живо́тные', 'animal'],
        ['не́бо', 'небеса́', 'sky (irregular)']
      ],
      examples: [
        { ru: 'В Росси́и мно́го больши́х озёр.', trans: 'v Rossii mnogo bolshikh ozyor', en: 'There are many big lakes in Russia.' }
      ]
    },
    {
      topic: 'до́лжен + infinitive',
      explanation: 'To say that someone must do something, Russian uses до́лжен (m), должна́ (f), должно́ (n), должны́ (plural) plus an infinitive. The person is the subject.',
      table: [
        ['Russian', 'English'],
        ['Я до́лжен рабо́тать.', 'I must work. (man)'],
        ['Она́ должна́ отдыха́ть.', 'She must rest.'],
        ['Мы должны́ защища́ть приро́ду.', 'We must protect nature.'],
        ['Все должны́ бере́чь во́ду.', 'Everyone must save water.']
      ],
      examples: [
        { ru: 'Мы должны́ бере́чь приро́ду.', trans: 'my dolzhny berech prirodu', en: 'We must take care of nature.' }
      ]
    },
    {
      topic: 'Protecting the environment',
      explanation: 'защища́ть and охраня́ть both mean to protect or preserve and take the accusative. бере́чь means to take care of and also takes the accusative.',
      table: [
        ['Russian', 'English'],
        ['защища́ть приро́ду', 'to protect nature'],
        ['охраня́ть леса́', 'to preserve forests'],
        ['бере́чь во́ду', 'to save water'],
        ['бо́рьба с загрязне́нием', 'the fight against pollution']
      ],
      examples: [
        { ru: 'Ну́жно бере́чь зе́млю и во́ду.', trans: 'nuzhno berech zemlyu i vodu', en: 'We must save the land and the water.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u34-priroda', ru: 'приро́да', translit: 'priroda', en: 'nature', pos: 'noun', gender: 'f' },
    { id: 'u34-ekologiya', ru: 'эколо́гия', translit: 'ekologiya', en: 'ecology', pos: 'noun', gender: 'f' },
    { id: 'u34-zagryaznenie', ru: 'загрязне́ние', translit: 'zagryazneniye', en: 'pollution', pos: 'noun', gender: 'n' },
    { id: 'u34-musor', ru: 'му́сор', translit: 'musor', en: 'rubbish / litter', pos: 'noun', gender: 'm' },
    { id: 'u34-les', ru: 'лес', translit: 'les', en: 'forest', pos: 'noun', gender: 'm' },
    { id: 'u34-reka', ru: 'река́', translit: 'reka', en: 'river', pos: 'noun', gender: 'f' },
    { id: 'u34-ozero', ru: 'о́зеро', translit: 'ozero', en: 'lake', pos: 'noun', gender: 'n' },
    { id: 'u34-more', ru: 'мо́ре', translit: 'more', en: 'sea', pos: 'noun', gender: 'n' },
    { id: 'u34-nebo', ru: 'не́бо', translit: 'nebo', en: 'sky', pos: 'noun', gender: 'n' },
    { id: 'u34-zemlya', ru: 'земля́', translit: 'zemlya', en: 'earth / land', pos: 'noun', gender: 'f' },
    { id: 'u34-vozduh', ru: 'во́здух', translit: 'vozdukh', en: 'air', pos: 'noun', gender: 'm' },
    { id: 'u34-rastenie', ru: 'расте́ние', translit: 'rasteniye', en: 'plant', pos: 'noun', gender: 'n' },
    { id: 'u34-zhivotnoe', ru: 'живо́тное', translit: 'zhivotnoye', en: 'animal', pos: 'noun', gender: 'n' },
    { id: 'u34-zashchishchat', ru: 'защища́ть', translit: 'zashchishchat', en: 'to protect', pos: 'verb' },
    { id: 'u34-berech', ru: 'бере́чь', translit: 'berech', en: 'to take care of / save', pos: 'verb' },
    { id: 'u34-ohranyat', ru: 'охраня́ть', translit: 'okhranyat', en: 'to preserve / guard', pos: 'verb' },
    { id: 'u34-chistyy', ru: 'чи́стый', translit: 'chisty', en: 'clean', pos: 'adjective' },
    { id: 'u34-gryazny', ru: 'гря́зный', translit: 'gryazny', en: 'dirty', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u34-1', ru: 'Мы должны́ защища́ть приро́ду.', trans: 'my dolzhny zashchishchat prirodu', en: 'We must protect nature.' },
    { id: 'p-u34-2', ru: 'Здесь чи́стый во́здух.', trans: 'zdes chisty vozdukh', en: 'The air is clean here.' }
  ],
  sentences: [
    { ru: 'Мы должны́ защища́ть приро́ду.', translit: 'my dolzhny zashchishchat prirodu', en: 'We must protect nature.', words: [{ id: 'u34-zashchishchat', ru: 'защища́ть', en: 'to protect' }, { id: 'u34-priroda', ru: 'приро́ду', en: 'nature' }] },
    { ru: 'В ле́су чи́стый во́здух.', translit: 'v lesu chisty vozdukh', en: 'The air is clean in the forest.', words: [{ id: 'u34-les', ru: 'ле́су', en: 'forest' }, { id: 'u34-chistyy', ru: 'чи́стый', en: 'clean' }, { id: 'u34-vozduh', ru: 'во́здух', en: 'air' }] },
    { ru: 'Э́то о́зеро о́чень глубоко́е.', translit: 'eta ozero ochen glubokoye', en: 'This lake is very deep.', words: [{ id: 'u34-ozero', ru: 'о́зеро', en: 'lake' }] },
    { ru: 'Здесь мно́го му́сора.', translit: 'zdes mnogo musora', en: 'There is a lot of rubbish here.', words: [{ id: 'u34-musor', ru: 'му́сора', en: 'rubbish' }] },
    { ru: 'Ну́жно бере́чь зе́млю.', translit: 'nuzhno berech zemlyu', en: 'We need to take care of the earth.', words: [{ id: 'u34-berech', ru: 'бере́чь', en: 'to take care' }, { id: 'u34-zemlya', ru: 'зе́млю', en: 'earth' }] }
  ],
  dialogue: {
    title: 'Эколо́гия (Ecology)',
    lines: [
      { who: 'Мария', ru: 'Ты ви́дел, ско́лько му́сора в па́рке?', en: 'Did you see how much rubbish is in the park?' },
      { who: 'Том', ru: 'Да, э́то ужа́сно. Мы должны́ бере́чь приро́ду.', en: 'Yes, that is awful. We must take care of nature.' },
      { who: 'Мария', ru: 'Пра́вильно. Во́здух в го́роде гря́зный.', en: 'Right. The air in the city is dirty.' },
      { who: 'Том', ru: 'А в ле́су чи́стый во́здух и тишина́.', en: 'And in the forest the air is clean and it is quiet.' },
      { who: 'Мария', ru: 'Дава́й пое́дем на о́зеро в выходны́е!', en: 'Let us go to the lake at the weekend!' },
      { who: 'Том', ru: 'Отли́чная иде́я. Эколо́гия начина́ется с нас.', en: 'Great idea. Ecology starts with us.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что ви́дели в па́рке?', options: ['му́сор', 'цветы́', 'дере́вья', 'люде́й'], answer: 'му́сор' },
      { type: 'mc-ru', q: 'Како́й во́здух в го́роде?', options: ['гря́зный', 'чи́стый', 'све́жий', 'прохла́дный'], answer: 'гря́зный' },
      { type: 'mc-ru', q: 'Куда́ они́ пое́дут?', options: ['на о́зеро', 'в лес', 'на мо́ре', 'в го́ры'], answer: 'на о́зеро' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «приро́да»?', options: ['nature', 'ecology', 'weather', 'forest'], answer: 'nature', ru: 'приро́да' },
    { type: 'mc-en', q: 'Что зна́чит «лес»?', options: ['forest', 'river', 'lake', 'sea'], answer: 'forest', ru: 'лес' },
    { type: 'mc-ru', q: '“river” in Russian', options: ['река́', 'о́зеро', 'мо́ре', 'земля́'], answer: 'река́', ru: 'река́' },
    { type: 'mc-ru', q: '“lake” in Russian', options: ['о́зеро', 'река́', 'мо́ре', 'лес'], answer: 'о́зеро', ru: 'о́зеро' },
    { type: 'typing', q: 'Type “air” in Russian', answer: 'воздух', accepts: ['во́здух'], ru: 'во́здух' },
    { type: 'typing', q: 'Type “to protect” in Russian', answer: 'защищать', accepts: ['защища́ть'], ru: 'защища́ть' },
    { type: 'mc-en', q: 'Что зна́чит «му́сор»?', options: ['rubbish / litter', 'pollution', 'forest', 'air'], answer: 'rubbish / litter', ru: 'му́сор' },
    { type: 'mc-ru', q: '“clean” in Russian', options: ['чи́стый', 'гря́зный', 'све́жий', 'но́вый'], answer: 'чи́стый', ru: 'чи́стый' },
    { type: 'mc-en', q: 'Что зна́чит «бере́чь»?', options: ['to take care of / save', 'to protect', 'to guard', 'to love'], answer: 'to take care of / save', ru: 'бере́чь' },
    { type: 'mc-ru', q: 'Complete: Мы ___ защища́ть приро́ду.', options: ['должны́', 'до́лжен', 'должна́', 'должно́'], answer: 'должны́', ru: 'должны́' },
    { type: 'typing', q: 'Type “sea” in Russian', answer: 'море', accepts: ['мо́ре'], ru: 'мо́ре' },
    { type: 'mc-en', q: 'Что зна́чит «загрязне́ние»?', options: ['pollution', 'rubbish', 'ecology', 'nature'], answer: 'pollution', ru: 'загрязне́ние' }
  ],
  test: {
    title: 'Unit 34 test — Nature and the environment',
    questions: [
      { type: 'mc-ru', q: '“sky” in Russian', options: ['не́бо', 'земля́', 'во́здух', 'мо́ре'], answer: 'не́бо', ru: 'не́бо' },
      { type: 'mc-en', q: 'Что зна́чит «эколо́гия»?', options: ['ecology', 'nature', 'pollution', 'environment policy'], answer: 'ecology', ru: 'эколо́гия' },
      { type: 'typing', q: 'Type “forest” in Russian', answer: 'лес', accepts: [], ru: 'лес' },
      { type: 'typing', q: 'Type “nature” in Russian', answer: 'природа', accepts: ['приро́да'], ru: 'приро́да' },
      { type: 'mc-ru', q: '“animal” in Russian', options: ['живо́тное', 'расте́ние', 'де́рево', 'река́'], answer: 'живо́тное', ru: 'живо́тное' },
      { type: 'mc-en', q: 'Что зна́чит «охраня́ть»?', options: ['to preserve / guard', 'to dirty', 'to build', 'to use'], answer: 'to preserve / guard', ru: 'охраня́ть' },
      { type: 'mc-ru', q: 'Complete: Она́ ___ бере́чь во́ду.', options: ['должна́', 'до́лжен', 'должны́', 'должно́'], answer: 'должна́', ru: 'должна́' },
      { type: 'typing', q: 'Type “earth / land” in Russian', answer: 'земля', accepts: ['земля́'], ru: 'земля́' },
      { type: 'mc-en', q: 'Что зна́чит «гря́зный»?', options: ['dirty', 'clean', 'polluted', 'old'], answer: 'dirty', ru: 'гря́зный' },
      { type: 'mc-ru', q: '“plant” in Russian', options: ['расте́ние', 'живо́тное', 'цвето́к', 'де́рево'], answer: 'расте́ние', ru: 'расте́ние' },
      { type: 'typing', q: 'Type “to take care of” in Russian', answer: 'беречь', accepts: ['бере́чь'], ru: 'бере́чь' },
      { type: 'mc-en', q: 'Что зна́чит «защища́ть»?', options: ['to protect', 'to preserve', 'to save', 'to guard'], answer: 'to protect', ru: 'защища́ть' }
    ]
  }
};
