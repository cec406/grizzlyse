// Unit 42 — News and current events. B2.
export const unit = {
  id: 'u42',
  level: 'B2',
  number: 42,
  title: 'News and current events',
  titleRu: 'Но́вости',
  story: 'Events, incidents, trends and forecasts. To follow the news in Russian you need a core set of nouns and the reporting verbs that hold a news story together. This unit delivers exactly that.',
  grammar: [
    {
      topic: 'Reporting what is said',
      explanation: 'News needs reporting verbs: сообща́ть (to report), заявля́ть (to state), отмеча́ть (to note). The common pattern is Сообща́ется, что… followed by a normal clause.',
      table: [
        ['Russian', 'English'],
        ['Сообща́ется, что рост продо́лжится.', 'It is reported that the growth will continue.'],
        ['Официа́льно заяви́ли о реше́нии.', 'They officially stated the decision.'],
        ['Как отмеча́ют эксперты…', 'As experts note…']
      ],
      examples: [
        { ru: 'Сообща́ется, что кри́зис зака́нчивается.', trans: 'soobshchayetsya, chto krizis zakanchivayetsya', en: 'It is reported that the crisis is ending.' }
      ]
    },
    {
      topic: 'Trends: рост and паде́ние',
      explanation: 'Trend language uses growth and fall: рост (growth) and паде́ние (fall) take the genitive of what is changing: рост экономи́ки, паде́ние цен.',
      table: [
        ['Russian', 'English'],
        ['рост экономи́ки', 'economic growth'],
        ['паде́ние цен', 'the fall of prices'],
        ['увеличе́ние дохо́да', 'an increase in income'],
        ['но́вая тенде́нция', 'a new tendency']
      ],
      examples: [
        { ru: 'Рост экономи́ки продолжа́ется.', trans: 'rost ekonomiki prodolzhayetsya', en: 'The economic growth continues.' }
      ]
    },
    {
      topic: 'Events and investigations',
      explanation: 'A newsworthy happening is собы́тие or происше́ствие; a checking process is прове́рка, and a deeper inquiry is рассле́дование. The short passive обнару́жен means was found or discovered.',
      table: [
        ['Russian', 'English'],
        ['ва́жное собы́тие', 'an important event'],
        ['происше́ствие в го́роде', 'an incident in the city'],
        ['прове́рка докуме́нтов', 'an inspection of documents'],
        ['рассле́дование продолжа́ется', 'the investigation continues'],
        ['обнару́жен неизве́стный объе́кт', 'an unknown object was found']
      ],
      examples: [
        { ru: 'Э́то собы́тие обсужда́ют все.', trans: 'eta sobytiye obsuzhdayut vse', en: 'Everyone is discussing this event.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u42-sobytie', ru: 'собы́тие', translit: 'sobytiye', en: 'event', pos: 'noun', gender: 'n' },
    { id: 'u42-proisshestvie', ru: 'происше́ствие', translit: 'proisshestviye', en: 'incident', pos: 'noun', gender: 'n' },
    { id: 'u42-situaciya', ru: 'ситуа́ция', translit: 'situatsiya', en: 'situation', pos: 'noun', gender: 'f' },
    { id: 'u42-krizis', ru: 'кри́зис', translit: 'krizis', en: 'crisis', pos: 'noun', gender: 'm' },
    { id: 'u42-rost', ru: 'рост', translit: 'rost', en: 'growth', pos: 'noun', gender: 'm' },
    { id: 'u42-padenie', ru: 'паде́ние', translit: 'padeniye', en: 'fall / decline', pos: 'noun', gender: 'n' },
    { id: 'u42-tendentsiya', ru: 'тенде́нция', translit: 'tendentsiya', en: 'tendency / trend', pos: 'noun', gender: 'f' },
    { id: 'u42-prognoz', ru: 'прогно́з', translit: 'prognoz', en: 'forecast', pos: 'noun', gender: 'm' },
    { id: 'u42-proverka', ru: 'прове́рка', translit: 'proverka', en: 'inspection / check', pos: 'noun', gender: 'f' },
    { id: 'u42-rassledovanie', ru: 'рассле́дование', translit: 'rassledovaniye', en: 'investigation', pos: 'noun', gender: 'n' },
    { id: 'u42-kommentariy', ru: 'коммента́рий', translit: 'kommentariy', en: 'comment', pos: 'noun', gender: 'm' },
    { id: 'u42-ekspert', ru: 'экспе́рт', translit: 'ekspert', en: 'expert', pos: 'noun', gender: 'm' },
    { id: 'u42-ofitsialny', ru: 'официа́льный', translit: 'ofitsialny', en: 'official', pos: 'adjective' },
    { id: 'u42-soobshchat', ru: 'сообща́ть', translit: 'soobshchat', en: 'to report', pos: 'verb' },
    { id: 'u42-vliyanie', ru: 'влия́ние', translit: 'vliyaniye', en: 'influence', pos: 'noun', gender: 'n' },
    { id: 'u42-dohody', ru: 'дохо́ды', translit: 'dokhody', en: 'income', pos: 'noun', gender: 'p' },
    { id: 'u42-prognoz-pogody', ru: 'прогно́з пого́ды', translit: 'prognoz pogody', en: 'weather forecast', pos: 'phrase' }
  ],
  phrases: [
    { id: 'p-u42-1', ru: 'Сообща́ется, что…', trans: 'soobshchayetsya, chto…', en: 'It is reported that…' },
    { id: 'p-u42-2', ru: 'Гла́вные новости сего́дня.', trans: 'glavnye novosti segodnya', en: 'The main news today.' }
  ],
  sentences: [
    { ru: 'Рост экономи́ки продолжа́ется.', translit: 'rost ekonomiki prodolzhayetsya', en: 'The growth of the economy continues.', words: [{ id: 'u42-rost', ru: 'Рост', en: 'growth' }] },
    { ru: 'Э́то собы́тие обсужда́ют все.', translit: 'eta sobytiye obsuzhdayut vse', en: 'Everyone is discussing this event.', words: [{ id: 'u42-sobytie', ru: 'собы́тие', en: 'event' }] },
    { ru: 'Кри́зис ещё не зака́нчивается.', translit: 'krizis eshcho ne zakanchivayetsya', en: 'The crisis is not over yet.', words: [{ id: 'u42-krizis', ru: 'Кри́зис', en: 'crisis' }] },
    { ru: 'Э́то была́ необы́чная ситуа́ция.', translit: 'eta byla neobychnaya situatsiya', en: 'It was an unusual situation.', words: [{ id: 'u42-situaciya', ru: 'ситуа́ция', en: 'situation' }] },
    { ru: 'Тенде́нция я́сна уже́ сейча́с.', translit: 'tendentsiya yasna uzhe seychas', en: 'The tendency is already clear now.', words: [{ id: 'u42-tendentsiya', ru: 'Тенде́нция', en: 'tendency' }] }
  ],
  dialogue: {
    title: 'Ве́черние но́вости (The evening news)',
    lines: [
      { who: 'Мария', ru: 'Что но́вого в но́востях?', en: 'What is new in the news?' },
      { who: 'Том', ru: 'Сообща́ется, что рост экономи́ки продолжа́ется.', en: 'It is reported that economic growth continues.' },
      { who: 'Мария', ru: 'А како́й прогно́з пого́ды?', en: 'And what is the weather forecast?' },
      { who: 'Том', ru: 'За́втра бу́дет дождь, как отмеча́ют эксперты.', en: 'Tomorrow it will rain, as experts note.' },
      { who: 'Мария', ru: 'А э́то происше́ствие в це́нтре?', en: 'And that incident in the centre?' },
      { who: 'Том', ru: 'Рассле́дование продолжа́ется, официа́льной информа́ции нет.', en: 'The investigation continues, there is no official information.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что сообща́ется об эконо́мике?', options: ['рост продолжа́ется', 'рост па́дает', 'кри́зис', 'нет новосте́й'], answer: 'рост продолжа́ется' },
      { type: 'mc-ru', q: 'Како́й прогно́з пого́ды?', options: ['дождь', 'снег', 'со́лнце', 'ветер'], answer: 'дождь' },
      { type: 'mc-ru', q: 'Что де́лают о происше́ствии?', options: ['рассле́дуют', 'скрыва́ют', 'забы́ли', 'ра́дуются'], answer: 'рассле́дуют' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «собы́тие»?', options: ['event', 'incident', 'situation', 'news'], answer: 'event', ru: 'собы́тие' },
    { type: 'mc-en', q: 'Что зна́чит «происше́ствие»?', options: ['incident', 'event', 'accident', 'story'], answer: 'incident', ru: 'происше́ствие' },
    { type: 'mc-ru', q: '“growth” in Russian', options: ['рост', 'паде́ние', 'кри́зис', 'прогно́з'], answer: 'рост', ru: 'рост' },
    { type: 'mc-ru', q: '“fall / decline” in Russian', options: ['паде́ние', 'рост', 'тенде́нция', 'ситуа́ция'], answer: 'паде́ние', ru: 'паде́ние' },
    { type: 'typing', q: 'Type “crisis” in Russian', answer: 'кризис', accepts: ['кри́зис'], ru: 'кри́зис' },
    { type: 'typing', q: 'Type “investigation” in Russian', answer: 'расследование', accepts: ['рассле́дование'], ru: 'рассле́дование' },
    { type: 'mc-en', q: 'Что зна́чит «тенде́нция»?', options: ['tendency / trend', 'forecast', 'situation', 'event'], answer: 'tendency / trend', ru: 'тенде́нция' },
    { type: 'mc-ru', q: '“official” in Russian', options: ['официа́льный', 'обще́ственный', 'гла́вный', 'но́вый'], answer: 'официа́льный', ru: 'официа́льный' },
    { type: 'mc-en', q: 'Что зна́чит «прогно́з»?', options: ['forecast', 'comment', 'expert', 'inspection'], answer: 'forecast', ru: 'прогно́з' },
    { type: 'mc-ru', q: 'Complete: Сообща́ется, ___ рост продолжа́ется.', options: ['что', 'как', 'е́сли', 'бы'], answer: 'что', ru: 'что' },
    { type: 'typing', q: 'Type “situation” in Russian', answer: 'ситуация', accepts: ['ситуа́ция'], ru: 'ситуа́ция' },
    { type: 'mc-en', q: 'Что зна́чит «влия́ние»?', options: ['influence', 'income', 'impact', 'change'], answer: 'influence', ru: 'влия́ние' }
  ],
  test: {
    title: 'Unit 42 test — News and current events',
    questions: [
      { type: 'mc-ru', q: '“inspection / check” in Russian', options: ['прове́рка', 'рассле́дование', 'происше́ствие', 'собы́тие'], answer: 'прове́рка', ru: 'прове́рка' },
      { type: 'mc-en', q: 'Что зна́чит «экспе́рт»?', options: ['expert', 'comment', 'official', 'reporter'], answer: 'expert', ru: 'экспе́рт' },
      { type: 'typing', q: 'Type “to report” in Russian', answer: 'сообщать', accepts: ['сообща́ть'], ru: 'сообща́ть' },
      { type: 'typing', q: 'Type “fall / decline” in Russian', answer: 'падение', accepts: ['паде́ние'], ru: 'паде́ние' },
      { type: 'mc-ru', q: '“income” in Russian', options: ['дохо́ды', 'рост', 'паде́ние', 'цены'], answer: 'дохо́ды', ru: 'дохо́ды' },
      { type: 'mc-en', q: 'Что зна́чит «коммента́рий»?', options: ['comment', 'report', 'opinion', 'news'], answer: 'comment', ru: 'коммента́рий' },
      { type: 'mc-ru', q: 'Complete: ___ экономи́ки продолжа́ется.', options: ['Рост', 'Паде́ние', 'Кри́зис', 'Прогно́з'], answer: 'Рост', ru: 'Рост' },
      { type: 'typing', q: 'Type “event” in Russian', answer: 'событие', accepts: ['собы́тие'], ru: 'собы́тие' },
      { type: 'mc-en', q: 'Что зна́чит «ситуа́ция»?', options: ['situation', 'event', 'incident', 'tendency'], answer: 'situation', ru: 'ситуа́ция' },
      { type: 'mc-ru', q: '“tendency” in Russian', options: ['тенде́нция', 'прогно́з', 'кри́зис', 'рост'], answer: 'тенде́нция', ru: 'тенде́нция' },
      { type: 'typing', q: 'Type “influence” in Russian', answer: 'влияние', accepts: ['влия́ние'], ru: 'влия́ние' },
      { type: 'mc-en', q: 'Что зна́чит «паде́ние»?', options: ['fall / decline', 'growth', 'crisis', 'change'], answer: 'fall / decline', ru: 'паде́ние' }
    ]
  }
};