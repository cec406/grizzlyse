// Unit 36 — Gerunds. B2.
export const unit = {
  id: 'u36',
  level: 'B2',
  number: 36,
  title: 'Gerunds',
  titleRu: 'Дееприча́стие',
  story: 'A gerund is how Russian says while doing, having done. It lets you combine two actions by one subject into a single elegant sentence. This unit covers both the imperfective and perfective gerund.',
  grammar: [
    {
      topic: 'Imperfective gerund: simultaneous action',
      explanation: 'The imperfective gerund is formed with -ая/-я and describes an action happening at the same time as the main verb. Both actions must have the same subject.',
      table: [
        ['Infinitive', 'Gerund', 'English'],
        ['чита́ть', 'чита́я', 'while reading'],
        ['говори́ть', 'говоря́', 'while speaking'],
        ['де́лать', 'де́лая', 'while doing'],
        ['рабо́тать', 'рабо́тая', 'while working'],
        ['слу́шать', 'слу́шая', 'while listening']
      ],
      examples: [
        { ru: 'Чита́я кни́гу, я слу́шаю му́зыку.', trans: 'chitaya knigu, ya slushayu muzyku', en: 'While reading a book, I listen to music.' }
      ]
    },
    {
      topic: 'Perfective gerund: prior action',
      explanation: 'The perfective gerund is formed with -в/-вши and describes an action completed before the main verb. It is extremely common in written Russian.',
      table: [
        ['Infinitive', 'Gerund', 'English'],
        ['прочита́ть', 'прочита́в', 'having read'],
        ['сказа́ть', 'сказа́в', 'having said'],
        ['сде́лать', 'сде́лав', 'having done'],
        ['уви́деть', 'уви́дев', 'having seen'],
        ['прийти́', 'придя́', 'having come']
      ],
      examples: [
        { ru: 'Прочита́в письмо́, он позвони́л.', trans: 'prochitav pismo, on pozvonil', en: 'Having read the letter, he called.' }
      ]
    },
    {
      topic: 'The shared-subject rule',
      explanation: 'A gerund can only be used when the gerund and the main verb have the same subject. If the subjects differ, Russian uses a full clause instead.',
      table: [
        ['Correct', 'Wrong', 'Why'],
        ['Идя́ домо́й, я встре́тил дру́га.', 'Идя́ домо́й, начался́ дождь.', 'different subjects'],
        ['Отдохну́в, мы пошли́ гуля́ть.', 'Отдохну́в, она́ ушла́.', 'different subjects'],
        ['Слу́шая му́зыку, я рабо́таю.', '—', 'same subject "я"']
      ],
      examples: [
        { ru: 'Отдохну́в, мы пошли́ гуля́ть.', trans: 'otdokhnuv, my poshli gulyat', en: 'Having rested, we went for a walk.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u36-deeprichastie', ru: 'дееприча́стие', translit: 'deyeprichastiye', en: 'gerund', pos: 'noun', gender: 'n' },
    { id: 'u36-chitaya', ru: 'чита́я', translit: 'chitaya', en: 'while reading', pos: 'adverb' },
    { id: 'u36-chitav', ru: 'прочита́в', translit: 'prochitav', en: 'having read', pos: 'adverb' },
    { id: 'u36-delaya', ru: 'де́лая', translit: 'delaya', en: 'while doing', pos: 'adverb' },
    { id: 'u36-sdelav', ru: 'сде́лав', translit: 'sdelav', en: 'having done', pos: 'adverb' },
    { id: 'u36-govorya', ru: 'говоря́', translit: 'govorya', en: 'while speaking', pos: 'adverb' },
    { id: 'u36-skazav', ru: 'сказа́в', translit: 'skazav', en: 'having said', pos: 'adverb' },
    { id: 'u36-idya', ru: 'идя́', translit: 'idya', en: 'while going', pos: 'adverb' },
    { id: 'u36-pridya', ru: 'придя́', translit: 'pridya', en: 'having come', pos: 'adverb' },
    { id: 'u36-uvidev', ru: 'уви́дев', translit: 'uvidev', en: 'having seen', pos: 'adverb' },
    { id: 'u36-smotrya', ru: 'смотря́', translit: 'smotrya', en: 'while looking', pos: 'adverb' },
    { id: 'u36-dumaya', ru: 'ду́мая', translit: 'dumaya', en: 'while thinking', pos: 'adverb' },
    { id: 'u36-otdyhaya', ru: 'отдыха́я', translit: 'otdykhaya', en: 'while resting', pos: 'adverb' },
    { id: 'u36-nachinaya', ru: 'начина́я', translit: 'nachinaya', en: 'while beginning', pos: 'adverb' },
    { id: 'u36-rabotaya', ru: 'рабо́тая', translit: 'rabotaya', en: 'while working', pos: 'adverb' },
    { id: 'u36-slushaya', ru: 'слу́шая', translit: 'slushaya', en: 'while listening', pos: 'adverb' }
  ],
  phrases: [
    { id: 'p-u36-1', ru: 'Чита́я кни́гу, я слу́шаю му́зыку.', trans: 'chitaya knigu, ya slushayu muzyku', en: 'While reading a book, I listen to music.' },
    { id: 'p-u36-2', ru: 'Отдохну́в, мы пошли́ гуля́ть.', trans: 'otdokhnuv, my poshli gulyat', en: 'Having rested, we went for a walk.' }
  ],
  sentences: [
    { ru: 'Чита́я кни́гу, я слу́шаю му́зыку.', translit: 'chitaya knigu, ya slushayu muzyku', en: 'While reading a book, I listen to music.', words: [{ id: 'u36-chitaya', ru: 'Чита́я', en: 'while reading' }, { id: 'u36-slushaya', ru: 'слу́шаю', en: 'listening' }] },
    { ru: 'Прочита́в письмо́, он позвони́л.', translit: 'prochitav pismo, on pozvonil', en: 'Having read the letter, he called.', words: [{ id: 'u36-chitav', ru: 'Прочита́в', en: 'having read' }] },
    { ru: 'Рабо́тая до́ма, я отдыха́ю.', translit: 'rabotaya doma, ya otdykhayu', en: 'While working at home, I rest.', words: [{ id: 'u36-rabotaya', ru: 'Рабо́тая', en: 'while working' }, { id: 'u36-otdyhaya', ru: 'отдыха́ю', en: 'resting' }] },
    { ru: 'Уви́дев её, он улыбну́лся.', translit: 'uvidev yeyo, on ulybnulsya', en: 'Having seen her, he smiled.', words: [{ id: 'u36-uvidev', ru: 'Уви́дев', en: 'having seen' }] },
    { ru: 'Слу́шая му́зыку, мы гуля́ли.', translit: 'slushaya muzyku, my gulyali', en: 'Listening to music, we strolled.', words: [{ id: 'u36-slushaya', ru: 'Слу́шая', en: 'while listening' }] }
  ],
  dialogue: {
    title: 'На прогу́лке (On a walk)',
    lines: [
      { who: 'Мария', ru: 'Чем ты занима́ешься, слу́шая му́зыку?', en: 'What do you do while listening to music?' },
      { who: 'Том', ru: 'Обы́чно рабо́таю. А ты?', en: 'Usually I work. And you?' },
      { who: 'Мария', ru: 'Я люблю́ чита́ть, отдыха́я по́сле рабо́ты.', en: 'I like to read while resting after work.' },
      { who: 'Том', ru: 'Прочита́в кни́гу, я всегда́ де́лаю вы́воды.', en: 'Having read a book, I always draw conclusions.' },
      { who: 'Мария', ru: 'Интере́сно! А ду́мая о бу́дущем, ты мечта́ешь?', en: 'Interesting! And when thinking about the future, do you dream?' },
      { who: 'Том', ru: 'Коне́чно, всегда́.', en: 'Of course, always.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что Том де́лает, слу́шая му́зыку?', options: ['рабо́тает', 'чита́ет', 'спит', 'гуля́ет'], answer: 'рабо́тает' },
      { type: 'mc-ru', q: 'Что лю́бит Мари́я?', options: ['чита́ть, отдыха́я', 'рабо́тать', 'спать', 'пе́ть'], answer: 'чита́ть, отдыха́я' },
      { type: 'mc-ru', q: 'Что де́лает Том, прочита́в кни́гу?', options: ['де́лает вы́воды', 'спит', 'рабо́тает', 'гуля́ет'], answer: 'де́лает вы́воды' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «дееприча́стие»?', options: ['gerund', 'participle', 'adverb', 'infinitive'], answer: 'gerund', ru: 'дееприча́стие' },
    { type: 'mc-en', q: 'Что зна́чит «чита́я»?', options: ['while reading', 'having read', 'to read', 'reader'], answer: 'while reading', ru: 'чита́я' },
    { type: 'mc-ru', q: 'Perfective gerund of «прочита́ть»', options: ['прочита́в', 'чита́я', 'чита́ть', 'чита́ющий'], answer: 'прочита́в', ru: 'прочита́в' },
    { type: 'mc-ru', q: 'Imperfective gerund of «говори́ть»', options: ['говоря́', 'сказа́в', 'говори́ть', 'говоря́щий'], answer: 'говоря́', ru: 'говоря́' },
    { type: 'typing', q: 'Type “while doing” in Russian', answer: 'делая', accepts: ['де́лая'], ru: 'де́лая' },
    { type: 'typing', q: 'Type “having done” in Russian', answer: 'сделав', accepts: ['сде́лав'], ru: 'сде́лав' },
    { type: 'mc-en', q: 'Что зна́чит «уви́дев»?', options: ['having seen', 'seeing', 'to see', 'seen'], answer: 'having seen', ru: 'уви́дев' },
    { type: 'mc-ru', q: '“while working” in Russian', options: ['рабо́тая', 'сде́лав', 'рабо́тать', 'рабо́тающий'], answer: 'рабо́тая', ru: 'рабо́тая' },
    { type: 'mc-en', q: 'Что зна́чит «начина́я»?', options: ['while beginning', 'having begun', 'to begin', 'beginner'], answer: 'while beginning', ru: 'начина́я' },
    { type: 'mc-ru', q: 'Complete: ___ кни́гу, я слу́шаю му́зыку.', options: ['Чита́я', 'Прочита́в', 'Чита́ть', 'Чита́ю'], answer: 'Чита́я', ru: 'Чита́я' },
    { type: 'typing', q: 'Type “having come” in Russian', answer: 'придя', accepts: ['придя́'], ru: 'придя́' },
    { type: 'mc-en', q: 'Что зна́чит «слу́шая»?', options: ['while listening', 'having listened', 'to listen', 'listen!'], answer: 'while listening', ru: 'слу́шая' }
  ],
  test: {
    title: 'Unit 36 test — Gerunds',
    questions: [
      { type: 'mc-ru', q: 'Perfective gerund of «сказа́ть»', options: ['сказа́в', 'говоря́', 'сказа́ть', 'ска́занный'], answer: 'сказа́в', ru: 'сказа́в' },
      { type: 'mc-en', q: 'Что зна́чит «идя́»?', options: ['while going', 'having gone', 'to go', 'goer'], answer: 'while going', ru: 'идя́' },
      { type: 'typing', q: 'Type “having said” in Russian', answer: 'сказав', accepts: ['сказа́в'], ru: 'сказа́в' },
      { type: 'typing', q: 'Type “while listening” in Russian', answer: 'слушая', accepts: ['слу́шая'], ru: 'слу́шая' },
      { type: 'mc-ru', q: '“while thinking” in Russian', options: ['ду́мая', 'уви́дев', 'ду́мать', 'ду́мающий'], answer: 'ду́мая', ru: 'ду́мая' },
      { type: 'mc-en', q: 'Что зна́чит «отдыха́я»?', options: ['while resting', 'having rested', 'to rest', 'rest!'], answer: 'while resting', ru: 'отдыха́я' },
      { type: 'mc-ru', q: 'Complete: ___ письмо́, он позвони́л.', options: ['Прочита́в', 'Чита́я', 'Чита́ть', 'Чита́ю'], answer: 'Прочита́в', ru: 'Прочита́в' },
      { type: 'typing', q: 'Type “while speaking” in Russian', answer: 'говоря', accepts: ['говоря́'], ru: 'говоря́' },
      { type: 'mc-en', q: 'Что зна́чит «смотря́»?', options: ['while looking', 'having looked', 'to look', 'look!'], answer: 'while looking', ru: 'смотря́' },
      { type: 'mc-ru', q: '“having seen” in Russian', options: ['уви́дев', 'видя', 'ви́деть', 'уви́денный'], answer: 'уви́дев', ru: 'уви́дев' },
      { type: 'typing', q: 'Type “gerund” in Russian', answer: 'деепричастие', accepts: ['дееприча́стие'], ru: 'дееприча́стие' },
      { type: 'mc-en', q: 'Что зна́чит «начина́я»?', options: ['while beginning', 'having begun', 'to begin', 'beginning'], answer: 'while beginning', ru: 'начина́я' }
    ]
  }
};
