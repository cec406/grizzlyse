// Unit 22 — The weekend. A2.
export const unit = {
  id: 'u22',
  level: 'A2',
  number: 22,
  title: 'The weekend',
  titleRu: 'Выходны́е',
  story: 'Time to put A2 together: tell a whole story about your weekend using the past tense and the sequencing words снача́ла, пото́м, наконе́ц. This unit is a consolidation of everything in A2.',
  grammar: [
    {
      topic: 'Sequencing a story',
      explanation: 'These connectives turn a list of events into a story. Put each at the start of a sentence or clause.',
      table: [
        ['Russian', 'English'],
        ['снача́ла', 'at first / first'],
        ['пото́м', 'then / later'],
        ['зате́м', 'then / next'],
        ['по́сле э́того', 'after that'],
        ['наконе́ц', 'finally / at last']
      ],
      examples: [
        { ru: 'Снача́ла мы за́втракали, пото́м гуля́ли, наконе́ц отдыха́ли.', trans: 'snachala my zavtrakali, potom gulyali, nakonets otdykhali', en: 'First we had breakfast, then we strolled, and finally we rested.' }
      ]
    },
    {
      topic: 'Past tense recap with aspect',
      explanation: 'Mix imperfective (the background, the process) and perfective (one completed act). This is how natives tell a short story.',
      table: [
        ['Imperfective (background)', 'Perfective (result)', 'English'],
        ['чита́л', 'прочита́л', 'was reading / read (finished)'],
        ['гото́вил', 'пригото́вил', 'was cooking / cooked'],
        ['смотре́л', 'посмотре́л', 'was watching / watched'],
        ['гуля́л', 'погуля́л', 'was strolling / went for a stroll']
      ],
      examples: [
        { ru: 'Я чита́л, пото́м прочита́л кни́гу и пошёл гуля́ть.', trans: 'ya chital, potom prochital knigu i poshyol gulyat', en: 'I was reading, then I finished the book and went out.' }
      ]
    },
    {
      topic: 'Asking about the weekend',
      explanation: 'The standard small-talk questions and answers.',
      table: [
        ['Russian', 'English'],
        ['Как ты провёл выходны́е?', 'How did you spend the weekend?'],
        ['Что ты де́лал в суббо́ту?', 'What did you do on Saturday?'],
        ['В воскресе́нье я отдыха́л.', 'On Sunday I rested.'],
        ['Бы́ло о́чень ве́село!', 'It was very fun!']
      ],
      examples: [
        { ru: 'Как ты провёл выходны́е? — Отли́чно!', trans: 'kak ty provyol vykhodnyye? otlichno', en: 'How was your weekend? — Great!' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u22-vyhodnye', ru: 'выходны́е', translit: 'vykhodnyye', en: 'weekend', pos: 'noun', gender: 'p' },
    { id: 'u22-subbota', ru: 'суббо́та', translit: 'subbota', en: 'Saturday', pos: 'noun', gender: 'f' },
    { id: 'u22-voskresene', ru: 'воскресе́нье', translit: 'voskresenye', en: 'Sunday', pos: 'noun', gender: 'n' },
    { id: 'u22-snachala', ru: 'снача́ла', translit: 'snachala', en: 'at first / first', pos: 'adverb' },
    { id: 'u22-potom', ru: 'пото́м', translit: 'potom', en: 'then / later', pos: 'adverb' },
    { id: 'u22-nakonets', ru: 'наконе́ц', translit: 'nakonets', en: 'finally', pos: 'adverb' },
    { id: 'u22-zavtrakat', ru: 'за́втракать', translit: 'zavtrakat', en: 'to have breakfast', pos: 'verb' },
    { id: 'u22-otdyhat', ru: 'отдыха́ть', translit: 'otdykhat', en: 'to rest', pos: 'verb' },
    { id: 'u22-veselitsya', ru: 'весели́ться', translit: 'veselit·sya', en: 'to have fun', pos: 'verb' },
    { id: 'u22-gotovit', ru: 'гото́вить', translit: 'gotovit', en: 'to cook', pos: 'verb' },
    { id: 'u22-posmotret', ru: 'посмотре́ть', translit: 'posmotret', en: 'to watch', pos: 'verb' },
    { id: 'u22-vstretitsya', ru: 'встре́титься', translit: 'vstretit·sya', en: 'to meet', pos: 'verb' },
    { id: 'u22-progulka', ru: 'прогу́лка', translit: 'progulka', en: 'walk / stroll', pos: 'noun', gender: 'f' },
    { id: 'u22-restoran', ru: 'рестора́н', translit: 'restoran', en: 'restaurant', pos: 'noun', gender: 'm' },
    { id: 'u22-gosti', ru: 'го́сти', translit: 'gosti', en: 'guests', pos: 'noun', gender: 'p' },
    { id: 'u22-pogoda', ru: 'пого́да', translit: 'pogoda', en: 'weather', pos: 'noun', gender: 'f' },
    { id: 'u22-domashniy', ru: 'дома́шний', translit: 'domashniy', en: 'home / domestic', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u22-1', ru: 'Как ты провёл выходны́е?', trans: 'kak ty provyol vykhodnyye?', en: 'How was your weekend?' },
    { id: 'p-u22-2', ru: 'Бы́ло о́чень ве́село!', trans: 'bylo ochen veselo!', en: 'It was very fun!' }
  ],
  sentences: [
    { ru: 'В суббо́ту я отдыха́л.', translit: 'v subbotu ya otdykhal', en: 'On Saturday I rested.', words: [{ id: 'u22-subbota', ru: 'суббо́ту', en: 'Saturday' }, { id: 'u22-otdyhat', ru: 'отдыха́л', en: 'to rest' }] },
    { ru: 'Снача́ла мы за́втракали, пото́м гуля́ли.', translit: 'snachala my zavtrakali, potom gulyali', en: 'First we had breakfast, then we strolled.', words: [{ id: 'u22-snachala', ru: 'Снача́ла', en: 'first' }, { id: 'u22-zavtrakat', ru: 'за́втракали', en: 'to have breakfast' }, { id: 'u22-potom', ru: 'пото́м', en: 'then' }] },
    { ru: 'На выходны́х мы бы́ли в рестора́не.', translit: 'na vykhodnykh my byli v restorane', en: 'At the weekend we were at a restaurant.', words: [{ id: 'u22-vyhodnye', ru: 'выходны́х', en: 'weekend' }, { id: 'u22-restoran', ru: 'рестора́не', en: 'restaurant' }] },
    { ru: 'Ве́чером смотре́ли фильм и весели́лись.', translit: 'vecherom smotreli film i veselilis', en: 'In the evening we watched a film and had fun.', words: [{ id: 'u22-veselitsya', ru: 'весели́лись', en: 'to have fun' }] },
    { ru: 'Наконе́ц я хорошо́ отдохну́л.', translit: 'nakonets ya khorosho otdokhnul', en: 'Finally I had a good rest.', words: [{ id: 'u22-nakonets', ru: 'Наконе́ц', en: 'finally' }] }
  ],
  dialogue: {
    title: 'После выходны́х (After the weekend)',
    lines: [
      { who: 'Мария', ru: 'Приве́т! Как ты провёл выходны́е?', en: 'Hi! How was your weekend?' },
      { who: 'Том', ru: 'Отли́чно! В суббо́ту я встреча́лся с друзья́ми.', en: 'Great! On Saturday I met up with friends.' },
      { who: 'Мария', ru: 'Что вы де́лали?', en: 'What did you do?' },
      { who: 'Том', ru: 'Снача́ла гуля́ли, пото́м у́жинали в рестора́не.', en: 'First we strolled, then we had dinner at a restaurant.' },
      { who: 'Мария', ru: 'А в воскресе́нье?', en: 'And on Sunday?' },
      { who: 'Том', ru: 'До́ма. Гото́вил, чита́л, отдыха́л. Бы́ло о́чень ве́село!', en: 'At home. I cooked, read and rested. It was very fun!' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что Том де́лал в суббо́ту?', options: ['встреча́лся с друзья́ми', 'рабо́тал', 'чита́л до́ма', 'спал'], answer: 'встреча́лся с друзья́ми' },
      { type: 'mc-ru', q: 'Где они́ у́жинали?', options: ['в рестора́не', 'до́ма', 'в кафе́', 'в па́рке'], answer: 'в рестора́не' },
      { type: 'mc-ru', q: 'Что Том де́лал в воскресе́нье?', options: ['гото́вил, чита́л, отдыха́л', 'гуля́л в па́рке', 'рабо́тал', 'игра́л в футбо́л'], answer: 'гото́вил, чита́л, отдыха́л' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «выходны́е»?', options: ['weekend', 'weekday', 'holiday', 'vacation'], answer: 'weekend', ru: 'выходны́е' },
    { type: 'mc-en', q: 'Что зна́чит «пото́м»?', options: ['then / later', 'before', 'never', 'always'], answer: 'then / later', ru: 'пото́м' },
    { type: 'mc-ru', q: 'How do you say “Saturday”?', options: ['суббо́та', 'воскресе́нье', 'пя́тница', 'среда́'], answer: 'суббо́та', ru: 'суббо́та' },
    { type: 'mc-ru', q: '“Sunday” in Russian', options: ['воскресе́нье', 'суббо́та', 'понеде́льник', 'четве́рг'], answer: 'воскресе́нье', ru: 'воскресе́нье' },
    { type: 'typing', q: 'Type “finally” in Russian', answer: 'наконец', accepts: ['наконе́ц'], ru: 'наконе́ц' },
    { type: 'typing', q: 'Type “first / at first” in Russian', answer: 'сначала', accepts: ['снача́ла'], ru: 'снача́ла' },
    { type: 'mc-en', q: 'Что зна́чит «за́втракать»?', options: ['to have breakfast', 'to have lunch', 'to have dinner', 'to cook'], answer: 'to have breakfast', ru: 'за́втракать' },
    { type: 'mc-ru', q: '“to rest” in Russian', options: ['отдыха́ть', 'рабо́тать', 'гуля́ть', 'чита́ть'], answer: 'отдыха́ть', ru: 'отдыха́ть' },
    { type: 'mc-en', q: 'Что зна́чит «весели́ться»?', options: ['to have fun', 'to rest', 'to meet', 'to cook'], answer: 'to have fun', ru: 'весели́ться' },
    { type: 'mc-ru', q: 'Complete: ___ мы за́втракали.', options: ['Снача́ла', 'Наконе́ц', 'Пото́м', 'По́сле'], answer: 'Снача́ла', ru: 'Снача́ла' },
    { type: 'typing', q: 'Type “restaurant” in Russian', answer: 'ресторан', accepts: ['рестора́н'], ru: 'рестора́н' },
    { type: 'mc-en', q: 'Что зна́чит «прогу́лка»?', options: ['walk / stroll', 'breakfast', 'guest', 'weather'], answer: 'walk / stroll', ru: 'прогу́лка' }
  ],
  test: {
    title: 'Unit 22 test — The weekend',
    questions: [
      { type: 'mc-ru', q: '“to cook” in Russian', options: ['гото́вить', 'отдыха́ть', 'весели́ться', 'смотре́ть'], answer: 'гото́вить', ru: 'гото́вить' },
      { type: 'mc-en', q: 'Что зна́чит «пого́да»?', options: ['weather', 'weekend', 'walk', 'restaurant'], answer: 'weather', ru: 'пого́да' },
      { type: 'typing', q: 'Type “weekend” in Russian', answer: 'выходные', accepts: ['выходны́е'], ru: 'выходны́е' },
      { type: 'typing', q: 'Type “Sunday” in Russian', answer: 'воскресенье', accepts: ['воскресе́нье'], ru: 'воскресе́нье' },
      { type: 'mc-ru', q: '“to watch” in Russian', options: ['посмотре́ть', 'гото́вить', 'встре́титься', 'отдыха́ть'], answer: 'посмотре́ть', ru: 'посмотре́ть' },
      { type: 'mc-en', q: 'Что зна́чит «го́сти»?', options: ['guests', 'friends', 'parents', 'children'], answer: 'guests', ru: 'го́сти' },
      { type: 'mc-ru', q: 'Complete: ___ я хорошо́ отдохну́л.', options: ['Наконе́ц', 'Снача́ла', 'Пото́м', 'По́сле'], answer: 'Наконе́ц', ru: 'Наконе́ц' },
      { type: 'typing', q: 'Type “Saturday” in Russian', answer: 'суббота', accepts: ['суббо́та'], ru: 'суббо́та' },
      { type: 'mc-en', q: 'Что зна́чит «отдыха́ть»?', options: ['to rest', 'to work', 'to walk', 'to cook'], answer: 'to rest', ru: 'отдыха́ть' },
      { type: 'mc-ru', q: '“to meet” in Russian', options: ['встре́титься', 'весели́ться', 'отдыха́ть', 'за́втракать'], answer: 'встре́титься', ru: 'встре́титься' },
      { type: 'typing', q: 'Type “then / later” in Russian', answer: 'потом', accepts: ['пото́м'], ru: 'пото́м' },
      { type: 'mc-en', q: 'Что зна́чит «дома́шний»?', options: ['home / domestic', 'foreign', 'new', 'old'], answer: 'home / domestic', ru: 'дома́шний' }
    ]
  }
};
