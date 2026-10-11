// Unit 38 — Passive and -ся verbs. B2.
export const unit = {
  id: 'u38',
  level: 'B2',
  number: 38,
  title: 'Passive and -ся',
  titleRu: 'Пасси́в и -ся',
  story: 'Russian often avoids a named doer: the house is being built, the shop opens at nine, this word is used everywhere. Many of these are -ся verbs. This unit teaches you to recognise and use them.',
  grammar: [
    {
      topic: 'The reflexive passive',
      explanation: 'Verbs with -ся often have a passive meaning: дом стро́ится (the house is being built), sometimes with an optional agent in the instrumental.',
      table: [
        ['-ся verb', 'Meaning', 'Example'],
        ['стро́ится', 'is being built', 'Дом стро́ится уже́ год.'],
        ['открыва́ется', 'opens / is opened', 'Магази́н открыва́ется в де́вять.'],
        ['продаётся', 'is sold', 'Кни́га продаётся везде́.'],
        ['испо́льзуется', 'is used', 'Сло́во ча́сто испо́льзуется.'],
        ['называ́ется', 'is called', 'Как э́то называ́ется?']
      ],
      examples: [
        { ru: 'Дом стро́ится уже́ год.', trans: 'dom stroitsya uzhe god', en: 'The house has been under construction for a year.' }
      ]
    },
    {
      topic: 'Impersonal and general -ся',
      explanation: 'Some -ся verbs have an impersonal, general meaning, describing what people do in general or how something is done.',
      table: [
        ['Russian', 'English'],
        ['Здесь не ку́рится.', 'One does not smoke here.'],
        ['Как говори́тся…', 'As they say…'],
        ['Э́то счита́ется нормо́й.', 'This is considered the norm.'],
        ['Так пи́шется э́то сло́во.', 'This is how this word is written.']
      ],
      examples: [
        { ru: 'Э́то счита́ется нормо́й.', trans: 'eta schitayetsya normoy', en: 'This is considered the norm.' }
      ]
    },
    {
      topic: 'Passive participle or -ся?',
      explanation: 'The short passive participle focuses on a completed result (дом постро́ен). The -ся verb focuses on the process (дом стро́ится). Choose by meaning.',
      table: [
        ['Result (participle)', 'Process (-ся)', 'English'],
        ['Дом постро́ен.', 'Дом стро́ится.', 'built / being built'],
        ['Письмо́ напи́сано.', 'Письмо́ пи́шется.', 'written / being written'],
        ['Зада́ча решена́.', 'Зада́ча реша́ется.', 'solved / being solved']
      ],
      examples: [
        { ru: 'Зада́ча уже́ решена́.', trans: 'zadacha uzhe reshena', en: 'The problem is already solved.' }
      ]
    }
  ],
  vocabulary: [
    { id: 'u38-passiv', ru: 'пасси́в', translit: 'passiv', en: 'passive', pos: 'noun', gender: 'm' },
    { id: 'u38-stroitsya', ru: 'стро́ится', translit: 'stroitsya', en: 'is being built', pos: 'verb' },
    { id: 'u38-otkryvaetsya', ru: 'открыва́ется', translit: 'otkryvayetsya', en: 'opens / is opened', pos: 'verb' },
    { id: 'u38-zakryvaetsya', ru: 'закрыва́ется', translit: 'zakryvayetsya', en: 'closes / is closed', pos: 'verb' },
    { id: 'u38-prodaetsya', ru: 'продаётся', translit: 'prodayotsya', en: 'is sold', pos: 'verb' },
    { id: 'u38-pokupaetsya', ru: 'покупа́ется', translit: 'pokupayetsya', en: 'is bought', pos: 'verb' },
    { id: 'u38-ispolzuetsya', ru: 'испо́льзуется', translit: 'ispolzuyetsya', en: 'is used', pos: 'verb' },
    { id: 'u38-nazyvaetsya', ru: 'называ́ется', translit: 'nazyvayetsya', en: 'is called', pos: 'verb' },
    { id: 'u38-schitaetsya', ru: 'счита́ется', translit: 'schitayetsya', en: 'is considered', pos: 'verb' },
    { id: 'u38-izuchaetsya', ru: 'изуча́ется', translit: 'izuchayetsya', en: 'is studied', pos: 'verb' },
    { id: 'u38-izdayotsya', ru: 'издаётся', translit: 'izdayotsya', en: 'is published', pos: 'verb' },
    { id: 'u38-remontiruetsya', ru: 'ремонти́руется', translit: 'remontiruyetsya', en: 'is being repaired', pos: 'verb' },
    { id: 'u38-pishetsya', ru: 'пи́шется', translit: 'pishetsya', en: 'is written', pos: 'verb' },
    { id: 'u38-govoritsya', ru: 'говори́тся', translit: 'govoritsya', en: 'is said', pos: 'verb' },
    { id: 'u38-reshaetsya', ru: 'реша́ется', translit: 'reshayetsya', en: 'is being solved', pos: 'verb' }
  ],
  phrases: [
    { id: 'p-u38-1', ru: 'Как э́то называ́ется?', trans: 'kak eta nazyvayetsya?', en: 'What is this called?' },
    { id: 'p-u38-2', ru: 'Здесь не ку́рится.', trans: 'zdes ne kuritsya', en: 'One does not smoke here.' }
  ],
  sentences: [
    { ru: 'Дом стро́ится уже́ год.', translit: 'dom stroitsya uzhe god', en: 'The house has been under construction for a year.', words: [{ id: 'u38-stroitsya', ru: 'стро́ится', en: 'is being built' }] },
    { ru: 'Магази́н открыва́ется в де́вять.', translit: 'magazin otkryvayetsya v devyat', en: 'The shop opens at nine.', words: [{ id: 'u38-otkryvaetsya', ru: 'открыва́ется', en: 'opens' }] },
    { ru: 'Э́та кни́га продаётся везде́.', translit: 'eta kniga prodayotsya vezde', en: 'This book is sold everywhere.', words: [{ id: 'u38-prodaetsya', ru: 'продаётся', en: 'is sold' }] },
    { ru: 'Э́то сло́во ча́сто испо́льзуется.', translit: 'eta slovo chasto ispolzuyetsya', en: 'This word is often used.', words: [{ id: 'u38-ispolzuetsya', ru: 'испо́льзуется', en: 'is used' }] },
    { ru: 'Как э́то называ́ется?', translit: 'kak eta nazyvayetsya?', en: 'What is this called?', words: [{ id: 'u38-nazyvaetsya', ru: 'называ́ется', en: 'is called' }] }
  ],
  dialogue: {
    title: 'Стро́йка (A building site)',
    lines: [
      { who: 'Мария', ru: 'Что здесь стро́ится?', en: 'What is being built here?' },
      { who: 'Том', ru: 'Говоря́т, здесь бу́дет но́вый магази́н.', en: 'They say there will be a new shop here.' },
      { who: 'Мария', ru: 'А когда́ он открыва́ется?', en: 'And when does it open?' },
      { who: 'Том', ru: 'То́чно не зна́ю. Дом ещё ремонти́руется.', en: 'I do not know exactly. The building is still being repaired.' },
      { who: 'Мария', ru: 'Как э́то называ́ется по-ру́сски?', en: 'What is this called in Russian?' },
      { who: 'Том', ru: 'Э́то называ́ется «стро́йка».', en: 'This is called a building site.' }
    ],
    questions: [
      { type: 'mc-ru', q: 'Что стро́ится?', options: ['магази́н', 'шко́ла', 'больни́ца', 'теа́тр'], answer: 'магази́н' },
      { type: 'mc-ru', q: 'Зна́ет ли Том то́чно, когда́ откро́ется?', options: ['нет', 'да', 'мо́жет быть', 'не сказа́л'], answer: 'нет' },
      { type: 'mc-ru', q: 'Как называ́ется э́то по-ру́сски?', options: ['стро́йка', 'магази́н', 'дом', 'рабо́та'], answer: 'стро́йка' }
    ]
  },
  quiz: [
    { type: 'mc-en', q: 'Что зна́чит «стро́ится»?', options: ['is being built', 'builds', 'will build', 'built'], answer: 'is being built', ru: 'стро́ится' },
    { type: 'mc-en', q: 'Что зна́чит «называ́ется»?', options: ['is called', 'calls', 'is named after', 'will call'], answer: 'is called', ru: 'называ́ется' },
    { type: 'mc-ru', q: '“is sold” in Russian', options: ['продаётся', 'покупа́ется', 'берётся', 'отдаётся'], answer: 'продаётся', ru: 'продаётся' },
    { type: 'mc-ru', q: '“is used” in Russian', options: ['испо́льзуется', 'изуча́ется', 'счита́ется', 'открыва́ется'], answer: 'испо́льзуется', ru: 'испо́льзуется' },
    { type: 'typing', q: 'Type “is being built” in Russian', answer: 'строится', accepts: ['стро́ится'], ru: 'стро́ится' },
    { type: 'typing', q: 'Type “is considered” in Russian', answer: 'считается', accepts: ['счита́ется'], ru: 'счита́ется' },
    { type: 'mc-en', q: 'Что зна́чит «открыва́ется»?', options: ['opens / is opened', 'closes', 'is sold', 'is written'], answer: 'opens / is opened', ru: 'открыва́ется' },
    { type: 'mc-ru', q: '“is studied” in Russian', options: ['изуча́ется', 'испо́льзуется', 'пи́шется', 'говори́тся'], answer: 'изуча́ется', ru: 'изуча́ется' },
    { type: 'mc-en', q: 'Что зна́чит «закрыва́ется»?', options: ['closes / is closed', 'opens', 'is built', 'is used'], answer: 'closes / is closed', ru: 'закрыва́ется' },
    { type: 'mc-ru', q: 'Complete: Дом ___ уже́ год.', options: ['стро́ится', 'стро́ит', 'постро́ен', 'стро́ить'], answer: 'стро́ится', ru: 'стро́ится' },
    { type: 'typing', q: 'Type “is published” in Russian', answer: 'издается', accepts: ['издаётся'], ru: 'издаётся' },
    { type: 'mc-en', q: 'Что зна́чит «реша́ется»?', options: ['is being solved', 'solves', 'will solve', 'solved'], answer: 'is being solved', ru: 'реша́ется' }
  ],
  test: {
    title: 'Unit 38 test — Passive and -ся',
    questions: [
      { type: 'mc-ru', q: '“is being repaired” in Russian', options: ['ремонти́руется', 'стро́ится', 'открыва́ется', 'пи́шется'], answer: 'ремонти́руется', ru: 'ремонти́руется' },
      { type: 'mc-en', q: 'Что зна́чит «пи́шется»?', options: ['is written', 'writes', 'will write', 'wrote'], answer: 'is written', ru: 'пи́шется' },
      { type: 'typing', q: 'Type “is called” in Russian', answer: 'называется', accepts: ['называ́ется'], ru: 'называ́ется' },
      { type: 'typing', q: 'Type “is sold” in Russian', answer: 'продается', accepts: ['продаётся'], ru: 'продаётся' },
      { type: 'mc-ru', q: '“is bought” in Russian', options: ['покупа́ется', 'продаётся', 'испо́льзуется', 'берётся'], answer: 'покупа́ется', ru: 'покупа́ется' },
      { type: 'mc-en', q: 'Что зна́чит «говори́тся»?', options: ['is said', 'says', 'will say', 'said'], answer: 'is said', ru: 'говори́тся' },
      { type: 'mc-ru', q: 'Complete: Кни́га ___ везде́.', options: ['продаётся', 'продаёт', 'продана́', 'прода́ть'], answer: 'продаётся', ru: 'продаётся' },
      { type: 'typing', q: 'Type “passive” in Russian', answer: 'пассив', accepts: ['пасси́в'], ru: 'пасси́в' },
      { type: 'mc-en', q: 'Что зна́чит «счита́ется»?', options: ['is considered', 'counts', 'will count', 'counted'], answer: 'is considered', ru: 'счита́ется' },
      { type: 'mc-ru', q: '“is published” in Russian', options: ['издаётся', 'пи́шется', 'говори́тся', 'чита́ется'], answer: 'издаётся', ru: 'издаётся' },
      { type: 'typing', q: 'Type “is used” in Russian', answer: 'используется', accepts: ['испо́льзуется'], ru: 'испо́льзуется' },
      { type: 'mc-en', q: 'Что зна́чит «стро́ится»?', options: ['is being built', 'built', 'will build', 'building'], answer: 'is being built', ru: 'стро́ится' }
    ]
  }
};
