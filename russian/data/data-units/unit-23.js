// Unit 23 — Aspect in depth. B1.
export const unit = {
  id: 'u23',
  level: 'B1',
  number: 23,
  title: 'Aspect in depth',
  titleRu: 'Вид глаго́ла',
  story: 'Aspect is the soul of the Russian verb. Do you mean the process, the repetition, or one finished result? This unit teaches you to choose between the imperfective and the perfective with confidence.',
  grammar: [
    {
      topic: 'Two aspects, two meanings',
      explanation: 'The imperfective (несоверше́нный вид) names a process or a repeated habit. The perfective (соверше́нный вид) names one completed act with a result. The same event can be described either way depending on what you want to stress.',
      table: [
        ['Meaning', 'Imperfective', 'Perfective'],
        ['process / habit', 'Я чита́л кни́гу.', '—'],
        ['one finished act', '—', 'Я прочита́л кни́гу.'],
        ['yesterday, ongoing', 'Вчера́ я чита́л.', '—'],
        ['yesterday, finished', '—', 'Вчера́ я прочита́л.']
      ],
      examples: [
        { ru: 'Я чита́л, когда́ он позвони́л.', trans: 'ya chital, kogda on pozvonil', en: 'I was reading when he called.' },
        { ru: 'Я прочита́л э́ту кни́гу.', trans: 'ya prochital etu knigu', en: 'I have read this book.' }
      ]
    },
    {
      topic: 'How to spot an aspect pair',
      explanation: 'Most pairs are formed with a prefix (по-, про-, с-, на-) or by changing the suffix. Learn verbs in pairs from the start and you will save yourself years of guessing.',
      table: [
        ['Imperfective', 'Perfective', 'English'],
        ['де́лать', 'сде́лать', 'to do'],
        ['писа́ть', 'написа́ть', 'to write'],
        ['чита́ть', 'прочита́ть', 'to read'],
        ['смотре́ть', 'посмотре́ть', 'to watch'],
        ['говори́ть', 'сказа́ть', 'to say'],
        ['покупа́ть', 'купи́ть', 'to buy'],
        ['начина́ть', 'нача́ть', 'to begin']
      ],
      examples: [
        { ru: 'Он до́лго писа́л письмо́ и наконе́ц написа́л.', trans: 'on dolgo pisal pismo i nakonets napisal', en: 'He wrote the letter for a long time and finally finished it.' }
      ]
    },
    {
      topic: 'Adverbs that pick an aspect',
      explanation: 'Some adverbs almost force one aspect. всегда́ and иногда́ go with the imperfective; уже́ and вдруг prefer the perfective.',
      table: [
        ['Adverb', 'Aspect', 'Example'],
        ['всегда́', 'imperfective', 'Я всегда́ чита́ю ве́чером.'],
        ['иногда́', 'imperfective', 'Иногда́ он опа́здывает.'],
        ['уже́', 'perfective', 'Я уже́ прочита́л.'],
        ['до́лго', 'imperfective', 'Он до́лго ждал.']
      ],
      examples: [
        { ru: 'Мы уже́ посмотре́ли э́тот фильм.', trans: 'my uzhe posmotreli etot film', en: 'We have already watched this film.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u23-vid', ru: 'вид', translit: 'vid', en: 'aspect / view', pos: 'noun', gender: 'm' },
    { id: 'u23-sovershenny', ru: 'соверше́нный', translit: 'sovershenny', en: 'perfective / perfect', pos: 'adjective' },
    { id: 'u23-nesovershenny', ru: 'несоверше́нный', translit: 'nesovershenny', en: 'imperfective', pos: 'adjective' },
    { id: 'u23-delat', ru: 'де́лать', translit: 'delat', en: 'to do (imp.)', pos: 'verb' },
    { id: 'u23-sdelat', ru: 'сде́лать', translit: 'sdelat', en: 'to do (perf.)', pos: 'verb' },
    { id: 'u23-pisat', ru: 'писа́ть', translit: 'pisat', en: 'to write (imp.)', pos: 'verb' },
    { id: 'u23-napisat', ru: 'написа́ть', translit: 'napisat', en: 'to write (perf.)', pos: 'verb' },
    { id: 'u23-chitat', ru: 'чита́ть', translit: 'chitat', en: 'to read (imp.)', pos: 'verb' },
    { id: 'u23-prochitat', ru: 'прочита́ть', translit: 'prochitat', en: 'to read (perf.)', pos: 'verb' },
    { id: 'u23-smotret', ru: 'смотре́ть', translit: 'smotret', en: 'to watch (imp.)', pos: 'verb' },
    { id: 'u23-posmotret', ru: 'посмотре́ть', translit: 'posmotret', en: 'to watch (perf.)', pos: 'verb' },
    { id: 'u23-govorit', ru: 'говори́ть', translit: 'govorit', en: 'to speak (imp.)', pos: 'verb' },
    { id: 'u23-skazat', ru: 'сказа́ть', translit: 'skazat', en: 'to say (perf.)', pos: 'verb' },
    { id: 'u23-pokupat', ru: 'покупа́ть', translit: 'pokupat', en: 'to buy (imp.)', pos: 'verb' },
    { id: 'u23-kupit', ru: 'купи́ть', translit: 'kupit', en: 'to buy (perf.)', pos: 'verb' },
    { id: 'u23-vsegda', ru: 'всегда́', translit: 'vsegda', en: 'always', pos: 'adverb' },
    { id: 'u23-inogda', ru: 'иногда́', translit: 'inogda', en: 'sometimes', pos: 'adverb' },
    { id: 'u23-uzhe', ru: 'уже́', translit: 'uzhe', en: 'already', pos: 'adverb' },
    { id: 'u23-dolgo', ru: 'до́лго', translit: 'dolgo', en: 'for a long time', pos: 'adverb' }
  ],
  phrases: [
    { id: 'p-u23-1', ru: 'Что ты де́лал вчера́ ве́чером?', trans: 'chto ty delal vchera vecherom?', en: 'What were you doing yesterday evening?' },
    { id: 'p-u23-2', ru: 'Я уже́ сде́лал э́то.', trans: 'ya uzhe sdelal eta', en: 'I have already done this.' }
  ],
  sentences: [
    { ru: 'Я всегда́ чита́ю ве́чером.', translit: 'ya vsegda chitayu vecherom', en: 'I always read in the evening.', words: [{ id: 'u23-vsegda', ru: 'всегда́', en: 'always' }, { id: 'u23-chitat', ru: 'чита́ю', en: 'to read' }] },
    { ru: 'Вчера́ я прочита́л кни́гу.', translit: 'vchera ya prochital knigu', en: 'Yesterday I read (finished) a book.', words: [{ id: 'u23-prochitat', ru: 'прочита́л', en: 'to read (perf.)' }] },
    { ru: 'Мы уже́ посмотре́ли фильм.', translit: 'my uzhe posmotreli film', en: 'We have already watched the film.', words: [{ id: 'u23-uzhe', ru: 'уже́', en: 'already' }, { id: 'u23-posmotret', ru: 'посмотре́ли', en: 'to watch (perf.)' }] },
    { ru: 'Иногда́ он покупа́ет хлеб здесь.', translit: 'inogda on pokupayet khleb zdes', en: 'Sometimes he buys bread here.', words: [{ id: 'u23-inogda', ru: 'Иногда́', en: 'sometimes' }, { id: 'u23-pokupat', ru: 'покупа́ет', en: 'to buy (imp.)' }] },
    { ru: 'Он до́лго писа́л и наконе́ц написа́л письмо́.', translit: 'on dolgo pisal i nakonets napisal pismo', en: 'He wrote for a long time and finally wrote the letter.', words: [{ id: 'u23-dolgo', ru: 'до́лго', en: 'for a long time' }, { id: 'u23-pisat', ru: 'писа́л', en: 'to write (imp.)' }, { id: 'u23-napisat', ru: 'написа́л', en: 'to write (perf.)' }] }
  ],
  dialogue: {
    title: 'Про вид (About aspect)',
    lines: [
      { who: 'Мария', ru: 'Что ты де́лал вчера́ ве́чером?', en: 'What were you doing yesterday evening?' },
      { who: 'Том', ru: 'Я чита́л кни́гу, а пото́м прочита́л её до конца́.', en: 'I was reading a book, and then I read it to the end.' },
      { who: 'Мария', ru: 'Зна́чит, ты уже́ зна́ешь весь сюже́т?', en: 'So you already know the whole plot?' },
      { who: 'Том', ru: 'Да, уже́ зна́ю. А ты чита́ла э́ту кни́гу?', en: 'Yes, I already know it. And have you read this book?' },
      { who: 'Мария', ru: 'Нет, но я всегда́ чита́ю ве́чером.', en: 'No, but I always read in the evening.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что Том де́лал вчера́?', options: ['чита́л и прочита́л', 'писа́л', 'смотре́л фильм', 'рабо́тал'], answer: 'чита́л и прочита́л' },
      { type: 'mc-ru', q: 'Том зна́ет сюже́т?', options: ['да, уже́', 'нет', 'наполови́ну', 'не зна́ет'], answer: 'да, уже́' },
      { type: 'mc-ru', q: 'Когда́ Мари́я чита́ет?', options: ['ве́чером', 'у́тром', 'днём', 'но́чью'], answer: 'ве́чером' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «всегда́»?', options: ['always', 'never', 'sometimes', 'already'], answer: 'always', ru: 'всегда́' },
    { type: 'mc-en', q: 'Что зна́чит «уже́»?', options: ['already', 'still', 'yet', 'never'], answer: 'already', ru: 'уже́' },
    { type: 'mc-ru', q: 'Perfective of «чита́ть»', options: ['прочита́ть', 'чита́ть', 'почита́ть', 'чита́ю'], answer: 'прочита́ть', ru: 'прочита́ть' },
    { type: 'mc-ru', q: 'Perfective of «де́лать»', options: ['сде́лать', 'де́лать', 'поде́лать', 'де́лаю'], answer: 'сде́лать', ru: 'сде́лать' },
    { type: 'typing', q: 'Type “to write (imp.)” in Russian', answer: 'писать', accepts: ['писа́ть'], ru: 'писа́ть' },
    { type: 'typing', q: 'Type “to write (perf.)” in Russian', answer: 'написать', accepts: ['написа́ть'], ru: 'написа́ть' },
    { type: 'mc-en', q: 'Что зна́чит «иногда́»?', options: ['sometimes', 'always', 'never', 'often'], answer: 'sometimes', ru: 'иногда́' },
    { type: 'mc-ru', q: 'Which is perfective?', options: ['купи́ть', 'покупа́ть', 'покупа́ю', 'покупа́л'], answer: 'купи́ть', ru: 'купи́ть' },
    { type: 'mc-en', q: 'Что зна́чит «до́лго»?', options: ['for a long time', 'quickly', 'always', 'soon'], answer: 'for a long time', ru: 'до́лго' },
    { type: 'mc-ru', q: 'Complete: Я ___ кни́гу вчера́ (finished).', options: ['прочита́л', 'чита́л', 'чита́ю', 'чита́ть'], answer: 'прочита́л', ru: 'прочита́л' },
    { type: 'typing', q: 'Type “to speak (imp.)” in Russian', answer: 'говорить', accepts: ['говори́ть'], ru: 'говори́ть' },
    { type: 'mc-en', q: 'Что зна́чит «вид»?', options: ['aspect / view', 'kindness', 'sight', 'form'], answer: 'aspect / view', ru: 'вид' }
  ],
  test: {
    title: 'Unit 23 test — Aspect in depth',
    questions: [
      { type: 'mc-ru', q: 'Imperfective of «сказа́ть»', options: ['говори́ть', 'сказа́ть', 'поговори́ть', 'говори́л'], answer: 'говори́ть', ru: 'говори́ть' },
      { type: 'mc-en', q: 'Что зна́чит «соверше́нный»?', options: ['perfective', 'imperfective', 'complete', 'ideal'], answer: 'perfective', ru: 'соверше́нный' },
      { type: 'typing', q: 'Type “to watch (perf.)” in Russian', answer: 'посмотреть', accepts: ['посмотре́ть'], ru: 'посмотре́ть' },
      { type: 'typing', q: 'Type “always” in Russian', answer: 'всегда', accepts: ['всегда́'], ru: 'всегда́' },
      { type: 'mc-ru', q: 'Which adverb goes with the imperfective?', options: ['всегда́', 'вдруг', 'уже́', 'наконе́ц'], answer: 'всегда́', ru: 'всегда́' },
      { type: 'mc-en', q: 'Что зна́чит «несоверше́нный»?', options: ['imperfective', 'perfective', 'imperfect', 'incomplete'], answer: 'imperfective', ru: 'несоверше́нный' },
      { type: 'mc-ru', q: 'Complete: Он до́лго ___.', options: ['ждал', 'подожда́л', 'жду', 'ждать'], answer: 'ждал', ru: 'ждал' },
      { type: 'typing', q: 'Type “to buy (perf.)” in Russian', answer: 'купить', accepts: ['купи́ть'], ru: 'купи́ть' },
      { type: 'mc-en', q: 'Что зна́чит «покупа́ть»?', options: ['to buy (imp.)', 'to buy (perf.)', 'to sell', 'to pay'], answer: 'to buy (imp.)', ru: 'покупа́ть' },
      { type: 'mc-ru', q: '“already” in Russian', options: ['уже́', 'ещё', 'всегда́', 'иногда́'], answer: 'уже́', ru: 'уже́' },
      { type: 'typing', q: 'Type “to do (perf.)” in Russian', answer: 'сделать', accepts: ['сде́лать'], ru: 'сде́лать' },
      { type: 'mc-en', q: 'Что зна́чит «прочита́ть»?', options: ['to read (perf.)', 'to read (imp.)', 'to write', 'to watch'], answer: 'to read (perf.)', ru: 'прочита́ть' }
    ]
  }
};
