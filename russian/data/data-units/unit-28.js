// Unit 28 — Requests and commands. B1.
export const unit = {
  id: 'u28',
  level: 'B1',
  number: 28,
  title: 'Requests and commands',
  titleRu: 'Про́сьбы и прика́зы',
  story: 'Give me the book, please. Do not speak so fast. Come here! Russian imperatives are short and very common. This unit also teaches you how to sound polite rather than rude.',
  grammar: [
    {
      topic: 'Making the imperative',
      explanation: 'The imperative is usually the stem plus -и, or the stem alone if it ends in a vowel, or stem plus -ь. Add -те for the polite or plural form.',
      table: [
        ['Infinitive', 'ты form', 'Вы form', 'English'],
        ['чита́ть', 'чита́й', 'чита́йте', 'read'],
        ['сказа́ть', 'скажи́', 'скажи́те', 'say'],
        ['идти́', 'иди́', 'иди́те', 'go'],
        ['смотре́ть', 'смотри́', 'смотри́те', 'look'],
        ['дать', 'дай', 'да́йте', 'give']
      ],
      examples: [
        { ru: 'Скажи́те, где метро́?', trans: 'skazhite, gde metro?', en: 'Tell me, where is the metro? (polite)' }
      ]
    },
    {
      topic: 'Negative commands',
      explanation: 'A negative command normally uses не + imperfective: Не говори́ так бы́стро. It sounds like a general instruction, not a one-off order.',
      table: [
        ['Russian', 'English'],
        ['Не говори́ так бы́стро.', 'Do not speak so fast.'],
        ['Не забудь позвони́ть.', 'Do not forget to call.'],
        ['Не волну́йтесь!', 'Do not worry! (polite)']
      ],
      examples: [
        { ru: 'Пожа́луйста, не говори́ так бы́стро.', trans: 'pozhaluysta, ne govori tak bystro', en: 'Please do not speak so fast.' }
      ]
    },
    {
      topic: 'Polite requests',
      explanation: 'To ask a favour politely, soften the imperative with пожа́луйста, use the conditional (Вы бы не могли́…?), or ask a question (Мо́жно…?).',
      table: [
        ['Russian', 'English'],
        ['Помоги́те мне, пожа́луйста.', 'Help me, please.'],
        ['Вы бы не могли́ помо́чь?', 'Could you please help?'],
        ['Мо́жно зада́ть вопро́с?', 'May I ask a question?'],
        ['Разреши́те спроси́ть.', 'Allow me to ask.']
      ],
      examples: [
        { ru: 'Вы бы не могли́ помо́чь мне?', trans: 'vy by ne mogli pomoch mne?', en: 'Could you please help me?' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u28-dai', ru: 'дай', translit: 'day', en: 'give (imperative)', pos: 'verb' },
    { id: 'u28-davai', ru: 'дава́й', translit: 'davay', en: 'come on / let us', pos: 'verb' },
    { id: 'u28-skazhi', ru: 'скажи́', translit: 'skazhi', en: 'say / tell (imperative)', pos: 'verb' },
    { id: 'u28-idi', ru: 'иди́', translit: 'idi', en: 'go (imperative)', pos: 'verb' },
    { id: 'u28-smotri', ru: 'смотри́', translit: 'smotri', en: 'look (imperative)', pos: 'verb' },
    { id: 'u28-slushai', ru: 'слу́шай', translit: 'slushay', en: 'listen (imperative)', pos: 'verb' },
    { id: 'u28-pozhaluista', ru: 'пожа́луйста', translit: 'pozhaluysta', en: 'please', pos: 'adverb' },
    { id: 'u28-prosti', ru: 'прости́', translit: 'prosti', en: 'forgive / sorry', pos: 'verb' },
    { id: 'u28-izvini', ru: 'извини́', translit: 'izvini', en: 'excuse me', pos: 'verb' },
    { id: 'u28-pomoch', ru: 'помо́чь', translit: 'pomoch', en: 'to help', pos: 'verb' },
    { id: 'u28-razreshit', ru: 'разреши́ть', translit: 'razreshit', en: 'to allow', pos: 'verb' },
    { id: 'u28-zapretit', ru: 'запрети́ть', translit: 'zapretit', en: 'to forbid', pos: 'verb' },
    { id: 'u28-sovet', ru: 'сове́т', translit: 'sovet', en: 'advice / council', pos: 'noun', gender: 'm' },
    { id: 'u28-prosba', ru: 'про́сьба', translit: 'prosba', en: 'request', pos: 'noun', gender: 'f' },
    { id: 'u28-prikaz', ru: 'прика́з', translit: 'prikaz', en: 'order / command', pos: 'noun', gender: 'm' },
    { id: 'u28-vezhlyvy', ru: 'ве́жливый', translit: 'vezhlivy', en: 'polite', pos: 'adjective' }
  ],
  phrases: [
    { id: 'p-u28-1', ru: 'Помоги́те мне, пожа́луйста.', trans: 'pomogite mne, pozhaluysta', en: 'Help me, please.' },
    { id: 'p-u28-2', ru: 'Не волну́йтесь!', trans: 'ne volnuytes!', en: 'Do not worry! (polite)' }
  ],
  sentences: [
    { ru: 'Дай мне, пожа́луйста, кни́гу.', translit: 'day mne, pozhaluysta, knigu', en: 'Give me the book, please.', words: [{ id: 'u28-dai', ru: 'Дай', en: 'give' }, { id: 'u28-pozhaluista', ru: 'пожа́луйста', en: 'please' }] },
    { ru: 'Скажи́, где метро́?', translit: 'skazhi, gde metro?', en: 'Tell me, where is the metro?', words: [{ id: 'u28-skazhi', ru: 'Скажи́', en: 'tell' }] },
    { ru: 'Иди́ сюда́!', translit: 'idi syuda!', en: 'Come here!', words: [{ id: 'u28-idi', ru: 'Иди́', en: 'go' }] },
    { ru: 'Помоги́ мне, пожа́луйста.', translit: 'pomogi mne, pozhaluysta', en: 'Help me, please.', words: [{ id: 'u28-pomoch', ru: 'Помоги́', en: 'to help' }, { id: 'u28-pozhaluista', ru: 'пожа́луйста', en: 'please' }] },
    { ru: 'Пожа́луйста, не говори́ так бы́стро.', translit: 'pozhaluysta, ne govori tak bystro', en: 'Please do not speak so fast.', words: [{ id: 'u28-pozhaluista', ru: 'Пожа́луйста', en: 'please' }] }
  ],
  dialogue: {
    title: 'На у́лице (In the street)',
    lines: [
      { who: 'Том', ru: 'Извини́те, вы бы не могли́ помо́чь?', en: 'Excuse me, could you please help?' },
      { who: 'Прохожий', ru: 'Коне́чно. Что случи́лось?', en: 'Of course. What happened?' },
      { who: 'Том', ru: 'Скажи́те, пожа́луйста, где метро́?', en: 'Tell me, please, where is the metro?' },
      { who: 'Прохожий', ru: 'Иди́те пря́мо, пото́м нале́во.', en: 'Go straight, then to the left.' },
      { who: 'Том', ru: 'Спаси́бо! И не говори́те так бы́стро, я иностра́нец.', en: 'Thank you! And do not speak so fast, I am a foreigner.' },
      { who: 'Прохожий', ru: 'Прости́те! Иди́те пря́мо, пото́м нале́во.', en: 'Sorry! Go straight, then to the left.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что ну́жно То́му?', options: ['помо́щь', 'де́ньги', 'биле́т', 'еда́'], answer: 'помо́щь' },
      { type: 'mc-ru', q: 'Куда́ идти́?', options: ['пря́мо, пото́м нале́во', 'напра́во', 'наза́д', 'вверх'], answer: 'пря́мо, пото́м нале́во' },
      { type: 'mc-ru', q: 'Кто Том?', options: ['иностра́нец', 'русский', 'учи́тель', 'води́тель'], answer: 'иностра́нец' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «пожа́луйста»?', options: ['please', 'thank you', 'sorry', 'hello'], answer: 'please', ru: 'пожа́луйста' },
    { type: 'mc-en', q: 'Что зна́чит «извини́»?', options: ['excuse me', 'thank you', 'please', 'goodbye'], answer: 'excuse me', ru: 'извини́' },
    { type: 'mc-ru', q: 'Imperative of «да́ть»', options: ['дай', 'да́йте', 'дал', 'дать'], answer: 'дай', ru: 'дай' },
    { type: 'mc-ru', q: 'Imperative of «сказа́ть» (ты)', options: ['скажи́', 'сказа́л', 'ска́жет', 'сказа́ть'], answer: 'скажи́', ru: 'скажи́' },
    { type: 'typing', q: 'Type “to help” in Russian', answer: 'помочь', accepts: ['помо́чь'], ru: 'помо́чь' },
    { type: 'typing', q: 'Type “listen (imperative)” in Russian', answer: 'слушай', accepts: ['слу́шай'], ru: 'слу́шай' },
    { type: 'mc-en', q: 'Что зна́чит «про́сьба»?', options: ['request', 'order', 'advice', 'question'], answer: 'request', ru: 'про́сьба' },
    { type: 'mc-ru', q: '“polite” in Russian', options: ['ве́жливый', 'гру́бый', 'до́брый', 'стро́гий'], answer: 'ве́жливый', ru: 'ве́жливый' },
    { type: 'mc-en', q: 'Что зна́чит «запрети́ть»?', options: ['to forbid', 'to allow', 'to ask', 'to order'], answer: 'to forbid', ru: 'запрети́ть' },
    { type: 'mc-ru', q: 'Complete politely: ___ мне, пожа́луйста, (give).', options: ['Да́йте', 'Дай', 'Дава́й', 'Даю́'], answer: 'Да́йте', ru: 'Да́йте' },
    { type: 'typing', q: 'Type “advice” in Russian', answer: 'совет', accepts: ['сове́т'], ru: 'сове́т' },
    { type: 'mc-en', q: 'Что зна́чит «прика́з»?', options: ['order / command', 'request', 'advice', 'promise'], answer: 'order / command', ru: 'прика́з' }
  ],
  test: {
    title: 'Unit 28 test — Requests and commands',
    questions: [
      { type: 'mc-ru', q: '“to allow” in Russian', options: ['разреши́ть', 'запрети́ть', 'помо́чь', 'спроси́ть'], answer: 'разреши́ть', ru: 'разреши́ть' },
      { type: 'mc-en', q: 'Что зна́чит «смотри́»?', options: ['look (imperative)', 'listen', 'go', 'give'], answer: 'look (imperative)', ru: 'смотри́' },
      { type: 'typing', q: 'Type “go (imperative)” in Russian', answer: 'иди', accepts: ['иди́'], ru: 'иди́' },
      { type: 'typing', q: 'Type “say (imperative)” in Russian', answer: 'скажи', accepts: ['скажи́'], ru: 'скажи́' },
      { type: 'mc-ru', q: '“forgive / sorry” in Russian', options: ['прости́', 'извини́', 'спаси́бо', 'пожа́луйста'], answer: 'прости́', ru: 'прости́' },
      { type: 'mc-en', q: 'Что зна́чит «дава́й»?', options: ['come on / let us', 'give', 'go', 'stop'], answer: 'come on / let us', ru: 'дава́й' },
      { type: 'mc-ru', q: 'Polite plural imperative of «иди́»', options: ['иди́те', 'иди́', 'иду́т', 'идти́'], answer: 'иди́те', ru: 'иди́те' },
      { type: 'typing', q: 'Type “please” in Russian', answer: 'пожалуйста', accepts: ['пожа́луйста'], ru: 'пожа́луйста' },
      { type: 'mc-en', q: 'Что зна́чит «сове́т»?', options: ['advice', 'request', 'order', 'answer'], answer: 'advice', ru: 'сове́т' },
      { type: 'mc-ru', q: '“to forbid” in Russian', options: ['запрети́ть', 'разреши́ть', 'помо́чь', 'слу́шать'], answer: 'запрети́ть', ru: 'запрети́ть' },
      { type: 'typing', q: 'Type “request” in Russian', answer: 'просьба', accepts: ['про́сьба'], ru: 'про́сьба' },
      { type: 'mc-en', q: 'Что зна́чит «прика́з»?', options: ['order / command', 'advice', 'request', 'question'], answer: 'order / command', ru: 'прика́з' }
    ]
  }
};
